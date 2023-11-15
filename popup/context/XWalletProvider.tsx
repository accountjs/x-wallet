import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { NFT_Contract_Abi } from "~contractAbi.js";
import { encodeFunctionData, parseEther, parseAbi } from "viem";
import { SecureStorage } from "@plasmohq/storage/secure";
import {
  ECDSAProvider,
  fixSignedData,
  getRPCProviderOwner,
} from "@zerodev/sdk";
import { ZeroDevWeb3Auth } from "@zerodev/web3auth";
import { useStorage } from "@plasmohq/storage/hook";
import { WALLET_ADAPTERS } from "@web3auth/base";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";

export const XWalletProviderContext = createContext(undefined);
const DEFAULT_PROJECT_ID = "c1148dbd-a7a2-44b1-be79-62a54c552287";
const NFT_CONTRACT_ABI = NFT_Contract_Abi;
const NFT_ADDRESS = "0x34bE7f35132E97915633BC1fc020364EA5134863";
const TRANSFER_FUNC_ABI = parseAbi([
  "function transfer(address recipient, uint256 amount) public",
]); // TODO: token ABI

const storage = new SecureStorage();
storage.setPassword("Xwallet");

export interface UserInfo {
  username: string;
  twitterId: string;
  twitterName: string;
  ownerAddress: string;
  accountAddress: string;
}
const chainConfig = {
  chainNamespace: "eip155",
  chainId: "0x1",
  rpcTarget: "https://rpc.ankr.com/eth",
  displayName: "Ethereum Mainnet",
  blockExplorer: "https://goerli.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
};

export function XWalletProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [userInfo, setUserInfo] = useStorage<UserInfo>("user-info");
  const [ecdsaProvider, setEcdsaProvider] = useState<ECDSAProvider | null>(
    null
  );
  const [web3auth, setWeb3auth] = useState<Web3AuthNoModal | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3AuthNoModal({
          clientId:
            "BIwT5GCxEqEm6Nm6_DtLcl3IMdR2SmqJJNUYhBX2v3J_vCIlyBCjokH5vD_95_-5iKDKygC-li7pCoh1coRTTi8",
          web3AuthNetwork: "sapphire_devnet",
          // @ts-ignore
          chainConfig,
        });
        const privateKeyProvider = new EthereumPrivateKeyProvider({
          config: { chainConfig },
        });

        const openloginAdapter = new OpenloginAdapter({
          privateKeyProvider,
        });
        web3auth.configureAdapter(openloginAdapter);
        await web3auth.init();
        setWeb3auth(web3auth);
      } catch (e) {
        console.error(e);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (!loginLoading && web3auth && web3auth.connected) {
      setIsLogin(true);
      (async () => {
        const userinfo = await web3auth.getUserInfo();
        let twitterId = userinfo.verifierId.match(/(\d+)/)[0];
        let twitterInfo = await getAddressById(twitterId);

        // console.log(userinfo, twitterInfo);
        let twitterName = twitterInfo?.user_info?.name ?? "";
        let username = twitterInfo?.user_info?.username ?? "";
        setUserInfo({
          username,
          twitterId,
          twitterName,
          ownerAddress: twitterInfo?.owner_address ?? "",
          accountAddress: twitterInfo?.account_address ?? "",
        });
        let accountAddress = twitterInfo?.account_address ?? "";
        let ownerAddress = await getRPCProviderOwner(
          web3auth.provider
        ).getAddress();
        try {
          const resp = await deployAccount(ownerAddress, twitterId);
          console.log("deploy", resp);
        } catch (e) {
          console.log(e);
        }
        const ecdsaProvider = await ECDSAProvider.init({
          projectId: DEFAULT_PROJECT_ID,
          owner: getRPCProviderOwner(web3auth.provider),
          opts: {
            accountConfig: {
              accountAddress,
            },
          },
        });
        setEcdsaProvider(ecdsaProvider);
      })();
    }
  }, [web3auth, loginLoading]);

  const login = useCallback(async () => {
    if (!web3auth) {
      return;
    }
    setLoginLoading(true);

    try {
      await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
        loginProvider: "twitter",
      });
    } catch (e) {
      // console.log(e);
    } finally {
      setLoginLoading(false);
    }
  }, [web3auth]);

  const mintNft = useCallback(async () => {
    const accountAddress = await ecdsaProvider.getAddress();
    const { hash } = await ecdsaProvider.sendUserOperation({
      target: NFT_ADDRESS,
      data: encodeFunctionData({
        abi: NFT_CONTRACT_ABI,
        functionName: "mint",
        args: [accountAddress],
      }),
    });
    console.log("Mint to", accountAddress, "hash", hash);
    return hash;
  }, [ecdsaProvider]);

  const sendETH = useCallback(
    async (target, value) => {
      // check target
      let toAddress = await checkTarget(target);
      const { hash } = await ecdsaProvider.sendUserOperation({
        target: toAddress,
        data: "0x",
        value: parseEther(value),
      });
      console.log("Send to", toAddress, "ETH", value, "hash", hash);
      return hash;
    },
    [ecdsaProvider]
  );

  const sendERC20 = useCallback(
    async (tokenAddress, target, value) => {
      // check target
      let toAddress = await checkTarget(target);
      const { hash } = await ecdsaProvider.sendUserOperation({
        target: tokenAddress,
        data: encodeFunctionData({
          abi: TRANSFER_FUNC_ABI,
          functionName: "transfer",
          args: [toAddress, parseEther(value)],
        }),
      });
      console.log(
        "Send to",
        toAddress,
        "Token",
        tokenAddress,
        "Value",
        value,
        "hash",
        hash
      );
      return hash;
    },
    [ecdsaProvider]
  );

  const checkTarget = async (target: string) => {
    const isEthereumAddress = /^0x[0-9a-fA-F]{40}$/.test(target);
    if (isEthereumAddress) {
      return target;
    } else {
      const repo = await getAddress(target);
      return repo["account_address"];
    }
  };

  const getAddress = async (handle: string) => {
    const requestBody = JSON.stringify({
      handle,
    });
    const response = await fetch(
      "https://x-wallet-backend.vercel.app/api/getAddress",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      }
    );
    return await response.json();
  };

  const getAddressById = async (id: string) => {
    const requestBody = JSON.stringify({
      id,
    });
    const response = await fetch(
      "https://x-wallet-backend.vercel.app/api/getAddressById",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      }
    );
    return await response.json();
  };

  const deployAccount = async (newOwner: `0x${string}`, id: string) => {
    const requestBody = JSON.stringify({
      newOwner: newOwner,
      id: id,
    });
    const response = await fetch(
      "https://x-wallet-backend.vercel.app/api/deploy",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      }
    );
    return await response.json();
  };

  return (
    <XWalletProviderContext.Provider
      value={{
        userInfo,
        isLogin,
        login,
        loginLoading,
        mintNft,
        sendETH,
        sendERC20,
      }}
    >
      {children}
    </XWalletProviderContext.Provider>
  );
}
