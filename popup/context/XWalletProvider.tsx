import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { NFT_Contract_Abi } from "~contractAbi.js";
import { encodeFunctionData, parseEther, parseAbi} from "viem";

import { ECDSAProvider, getRPCProviderOwner } from "@zerodev/sdk";
import { ZeroDevWeb3Auth } from "@zerodev/web3auth";
export const XWalletProviderContext = createContext(undefined);

const DEFAULT_PROJECT_ID = "c1148dbd-a7a2-44b1-be79-62a54c552287";
const NFT_CONTRACT_ABI = NFT_Contract_Abi;
const NFT_ADDRESS = "0x34bE7f35132E97915633BC1fc020364EA5134863";
const TRANSFER_FUNC_ABI = parseAbi([
  'function transfer(address recipient, uint256 amount) public',
]); // TODO: token ABI

const zeroDevWeb3AuthNoModal = new ZeroDevWeb3Auth([DEFAULT_PROJECT_ID]);

export interface UserInfo {
  username: string;
  twitterId: string;
  twitterName: string;
  ownerAddress: string;
  accountAddress: string;
}

export function XWalletProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [ecdsaProvider, setEcdsaProvider] = useState<ECDSAProvider | null>(
    null
  );
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: "",
    twitterId: "",
    twitterName: "",
    ownerAddress: "",
    accountAddress: "",
  });

  const zeroDevWeb3Auth = useMemo(() => {
    const instance = new ZeroDevWeb3Auth([DEFAULT_PROJECT_ID]);
    instance.initialize(
      {}, "twitter"
    );
    return instance;
  }, []);

  const login = useCallback(() => {
    setLoginLoading(true);
    zeroDevWeb3Auth
      .login("twitter")
      .then(async (provider) => {
        zeroDevWeb3Auth.getUserInfo().then(async (twitterHandle) => {
          let twitterId = twitterHandle.verifierId.match(/(\d+)/)[0];
          let twitterInfo = await getAddressById(twitterId);
          //console.log(twitterHandle, twitterInfo);
          let twitterName = twitterInfo?.user_info?.name ?? "";
          let username = twitterInfo?.user_info?.username ?? "";
          let accountAddress = twitterInfo?.account_address ?? "";
          let ownerAddress = await getRPCProviderOwner(provider).getAddress();

          // check account deployed
          try {
            const resp = await deployAccount(ownerAddress, twitterId);
            console.log("deploy", resp);
          } catch (e) {
            console.log(e);
          }

          // set userInfo
          let userInfo: UserInfo = {
            username,
            twitterId,
            twitterName,
            ownerAddress,
            accountAddress,
          };
          console.log("userInfo", userInfo);
          setUserInfo(userInfo);

          // set ecdsaProvider
          const ecdsaProvider = await ECDSAProvider.init({
            projectId: DEFAULT_PROJECT_ID,
            owner: getRPCProviderOwner(provider),
            opts: {
              accountConfig: {
                accountAddress,
              },
            },
          });
          setEcdsaProvider(ecdsaProvider);

          // set login
          setIsLogin(true);
        });
      })
      .catch(console.log)
      .finally(() => {
        setLoginLoading(false);
      });
  }, []);

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
        data: '0x',
        value: parseEther(value),
      });
      console.log("Send to", toAddress, "ETH", value, "hash", hash);
      return hash;
    }, [ecdsaProvider]);

  const sendERC20 = useCallback(
    async (tokenAddress, target, value) => {
      // check target
      let toAddress = await checkTarget(target);  
      const { hash } = await ecdsaProvider.sendUserOperation({
        target: tokenAddress,
        data: encodeFunctionData({
          abi: TRANSFER_FUNC_ABI,
          functionName: 'transfer',
          args: [toAddress, parseEther(value)],
        }),
      });
      console.log("Send to", toAddress, "Token", tokenAddress, "Value", value, "hash", hash);
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
        return repo['account_address'];
      }
  }

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
      value={{ userInfo, isLogin, login, loginLoading, mintNft, sendETH, sendERC20 }}
    >
      {children}
    </XWalletProviderContext.Provider>
  );
}
