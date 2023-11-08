import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useWallet } from "~popup/hooks/useWallet";
import { NFT_Contract_Abi } from "~contractAbi.js";
import { encodeFunctionData, parseEther, parseAbi, zeroAddress } from "viem";
import { ECDSAProvider, getRPCProviderOwner } from "@zerodev/sdk";
import { ZeroDevWeb3Auth } from "@zerodev/web3auth";
export const XWalletProviderContext = createContext(undefined);
// const contractAbi = NFT_Contract_Abi;
// const nftAddress = "0x34bE7f35132E97915633BC1fc020364EA5134863";
const defaultProjectId = "c1148dbd-a7a2-44b1-be79-62a54c552287";
const contractAbi = NFT_Contract_Abi;
const nftAddress = "0x34bE7f35132E97915633BC1fc020364EA5134863";

const zeroDevWeb3AuthNoModal = new ZeroDevWeb3Auth([defaultProjectId]);

export interface UserInfo {
  username: string;
  twitterHandle: string;
  handleName: string;
  ownerAddress: string;
  walletAddress: string;
}

export function XWalletProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [ecdsaProvider, setEcdsaProvider] = useState<ECDSAProvider | null>(
    null
  );
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: "",
    twitterHandle: "",
    handleName: "",
    ownerAddress: "",
    walletAddress: "",
  });

  const setWallet = async (provider: any) => {};

  const getaddress = async (handle: string) => {
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

  const zeroDevWeb3Auth = useMemo(() => {
    const instance = new ZeroDevWeb3Auth([defaultProjectId]);
    instance.initialize(
      {
        onConnect: async () => {
          setLoginLoading(true);
          setWallet(zeroDevWeb3Auth.provider);
          setLoginLoading(false);
        },
      },
      "twitter"
    );
    return instance;
  }, []);
  const deploy = async (newOwner, id) => {
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
  const login = useCallback(() => {
    setLoginLoading(true);
    zeroDevWeb3Auth
      .login("twitter")
      .then(async (provider) => {
        console.log("12353", provider);
        console.log("65432", zeroDevWeb3Auth);
        zeroDevWeb3Auth.getUserInfo().then(async (handle) => {
          let twitterHandle = handle.verifierId.match(/(\d+)/)[0];
          let twitter_info = await getAddressById(twitterHandle);
          let accountAddress = twitter_info?.account_address ?? "";
          let handleName = twitter_info?.user_info?.username ?? "";
          const ecdsaProvider = await ECDSAProvider.init({
            projectId: defaultProjectId,
            owner: getRPCProviderOwner(provider),
            opts: {
              accountConfig: {
                accountAddress: accountAddress,
              },
            },
          });
          let ownerAddress = await getRPCProviderOwner(provider).getAddress();
          try {
            const re = await deploy(ownerAddress, twitterHandle);
            console.log(re);
          } catch (err) {
            console.log(err);
          }
          let user_info: UserInfo = {
            username: handle.name,
            twitterHandle,
            handleName,
            ownerAddress,
            walletAddress: accountAddress,
          };
          console.log(user_info);
          setUserInfo(user_info);
          setIsLogin(true);
          setEcdsaProvider(ecdsaProvider);
        });
      })
      .catch(console.log)
      .finally(() => {
        setLoginLoading(false);
      });
  }, []);

  const mintNft = useCallback(async () => {
    const account_address = await ecdsaProvider.getAddress();
    const { hash } = await ecdsaProvider.sendUserOperation({
      target: nftAddress,
      data: encodeFunctionData({
        abi: contractAbi,
        functionName: "mint",
        args: [account_address],
      }),
    });
    return hash;
  }, [ecdsaProvider]);

  async function sendETH(): Promise<string> {
    return;
  }
  return (
    <XWalletProviderContext.Provider
      value={{ userInfo, isLogin, login, loginLoading, mintNft }}
    >
      {children}
    </XWalletProviderContext.Provider>
  );
}
