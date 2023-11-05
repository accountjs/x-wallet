// import { useCallback, useContext, useMemo, useState } from "react";
// import { ECDSAProvider, getRPCProviderOwner } from "@zerodev/sdk";
// import { NFT_Contract_Abi } from "../config/contractAbi";
// import { encodeFunctionData, parseEther, parseAbi } from "viem";
// import { ZeroDevWeb3Auth, ZeroDevWeb3AuthWithModal } from "@zerodev/web3auth";

// const contractAbi = NFT_Contract_Abi;
// const nftAddress = "0x34bE7f35132E97915633BC1fc020364EA5134863";
// const defaultProjectId = "fc514f35-ed25-4100-97e6-90dd298a5d64";

// export const useWallet = () => {
//   let ecdsaProvider;

//   const [ecdsaProvider_global, setEcdsaProvider_global] = useState(null);
//   const [account_address, setAccount_address] = useState("");
//   const [accountName, setAccountName] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isConnected, setIsConnected] = useState(false);

//   const setWallet = async (provider) => {
//     const ecdsaProvider = await ECDSAProvider.init({
//       projectId: defaultProjectId,
//       owner: getRPCProviderOwner(provider),
//     });
//     setAccount_address(await ecdsaProvider.getAddress());
//   };

//   const zeroDevWeb3Auth = useMemo(() => {
//     const instance = new ZeroDevWeb3AuthWithModal([defaultProjectId]);
//     instance.initialize({
//       onConnect: async () => {
//         setWallet(zeroDevWeb3Auth.provider);
//       },
//     });
//     return instance;
//   }, []);

//   const getaddress = async (handle) => {
//     const requestBody = JSON.stringify({
//       handle,
//     });
//     const response = await fetch(
//       "https://x-wallet-backend.vercel.app/api/getAddress",
//       {
//         method: "POST",
//         mode: "cors",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: requestBody,
//       }
//     );
//     return await response.json();
//   };

//   const getAddressById = async (id) => {
//     const requestBody = JSON.stringify({
//       id,
//     });
//     const response = await fetch(
//       "https://x-wallet-backend.vercel.app/api/getAddressById",
//       {
//         method: "POST",
//         mode: "cors",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: requestBody,
//       }
//     );
//     return await response.json();
//   };

//   const deploy = async (newOwner, id) => {
//     const requestBody = JSON.stringify({
//       newOwner: newOwner,
//       id: id,
//     });
//     const response = await fetch(
//       "https://x-wallet-backend.vercel.app/api/deploy",
//       {
//         method: "POST",
//         mode: "cors",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: requestBody,
//       }
//     );
//     return await response.json();
//   };

//   const login = useCallback(async () => {
//     setIsLoading(true);
//     console.log("twitter");

//     zeroDevWeb3Auth
//       .login()
//       .then((provider) => {
//         console.log("login", provider);
//         setWallet(provider);
//       })
//       .catch(console.log)
//       .finally(() => {});
//     // const res = await connectAsync({
//     //   connector: connector,
//     // });
//     // // 查询地址和owner
//     // const handle = await res.connector.web3Auth.getUserInfo();
//     // const owner = await res.connector.owner.getAddress();
//     // const id = handle["verifierId"].split("|")[1];
//     // console.log(handle);
//     // console.log(owner);
//     // console.log(id);

//     // // 查询accountaddress
//     // const req = await getAddressById(id);
//     // const userInfo = req["user_info"];
//     // const accountAddress = req["account_address"];
//     // console.log(userInfo);
//     // console.log("account_address:" + accountAddress);

//     // // 如果已经部署了就会抛出错误
//     // try {
//     //   const re = await deploy(owner, id);
//     //   console.log(re);
//     // } catch (err) {
//     //   console.log(err);
//     // }
//     // ecdsaProvider = await ECDSAProvider.init({
//     //   projectId: "fc514f35-ed25-4100-97e6-90dd298a5d64",
//     //   owner: getRPCProviderOwner(res.connector.web3Auth.provider),
//     //   opts: {
//     //     accountConfig: {
//     //       accountAddress: accountAddress,
//     //     },
//     //   },
//     // });
//     // //   console.log(ecdsaProvider);
//     // //   console.log(await ecdsaProvider.getAddress());
//     // // 设置全局ecdsaProvider

//     // setAccount_address(accountAddress);
//     // setAccountName(userInfo.username);
//     // setEcdsaProvider_global(ecdsaProvider);
//     // setIsConnected(true);
//     // localStorage.setItem("handleName", userInfo.username);
//     // localStorage.setItem("accountAddress", accountAddress);
//     // // sessionStorage.setItem('ecdsaProvider', JSON.stringify(ecdsaProvider));

//     // console.log(ecdsaProvider);
//     // setIsLoading(false);

//     // routerContext.routeTo('/home');

//     // 无gas mint test
//     //   await mintNft();
//     //   await sendETH('0xLuki 🥤', parseEther('0.001'));
//     //   await disConnect();

//     // routerContext.routeTo('/home');
//     // return userInfo.username;
//   }, [setAccountName]);

//   const mintNft = useCallback(async () => {
//     const account_address = await ecdsaProvider.getAddress();
//     // console.log(account_address);
//     const { hash } = await ecdsaProvider.sendUserOperation({
//       target: nftAddress,
//       data: encodeFunctionData({
//         abi: contractAbi,
//         functionName: "mint",
//         args: [account_address],
//       }),
//     });
//     return hash;
//   }, [ecdsaProvider]);

//   const sendETH = useCallback(
//     async (connector, targe, value) => {
//       const ecdsaProvider = await ECDSAProvider.init({
//         projectId: "fc514f35-ed25-4100-97e6-90dd298a5d64",
//         owner: getRPCProviderOwner(connector.web3Auth.provider),
//         opts: {
//           accountConfig: {
//             accountAddress: localStorage.getItem("accountAddress"),
//           },
//         },
//       });

//       console.log(ecdsaProvider);
//       // 检查 name 是否符合以太坊地址的格式
//       const isEthereumAddress = /^0x[0-9a-fA-F]{40}$/.test(targe);
//       let to_address;
//       if (isEthereumAddress) {
//         to_address = targe;
//       } else {
//         const repo = await getaddress(targe);
//         to_address = repo["account_address"];
//       }

//       console.log("to_address:" + to_address);
//       const { hash } = await ecdsaProvider.sendUserOperation({
//         target: to_address,
//         data: "0x",
//         value: parseEther(value),
//       });
//       console.log(hash);
//       return hash;
//     },
//     [ecdsaProvider]
//   );

//   const sendERC20 = useCallback(
//     async (connector, ERC20Contract, targe, value) => {
//       const ecdsaProvider = await ECDSAProvider.init({
//         projectId: "fc514f35-ed25-4100-97e6-90dd298a5d64",
//         owner: getRPCProviderOwner(connector.web3Auth.provider),
//         opts: {
//           accountConfig: {
//             accountAddress: localStorage.getItem("accountAddress"),
//           },
//         },
//       });

//       console.log(ecdsaProvider);
//       // 检查 name 是否符合以太坊地址的格式
//       const isEthereumAddress = /^0x[0-9a-fA-F]{40}$/.test(targe);
//       let to_address;
//       if (isEthereumAddress) {
//         to_address = targe;
//       } else {
//         const repo = await getaddress(targe);
//         to_address = repo["account_address"];
//       }

//       const contractABI = parseAbi([
//         "function transfer(address recipient, uint256 amount) public",
//       ]);
//       const userOp = {
//         target: ERC20Contract,
//         data: encodeFunctionData({
//           abi: contractABI,
//           functionName: "transfer",
//           args: [to_address, parseEther(value)],
//         }),
//       };
//       const { hash } = await ecdsaProvider.sendUserOperation([userOp]);
//       console.log(hash);
//       return hash;
//     },
//     [ecdsaProvider]
//   );

//   const disConnect = useCallback(async () => {
//     setIsConnected(false);
//     setEcdsaProvider_global(null);
//     setAccount_address("");
//     setIsLoading(false);
//     ecdsaProvider = null;
//     disconnected();
//     // console.log(account_address);
//     // ecdsaProvider.dis .then((res) => {
//     //   console.log(res);
//     // });
//   }, []);

//   return {
//     getaddress,
//     getAddressById,
//     login,
//     sendETH,
//     sendERC20,
//     mintNft,
//     ecdsaProvider_global,
//     account_address,
//     accountName,
//     isLoading,
//     setIsLoading,
//     // account_balance,
//     isConnected,
//     disConnect,
//     ecdsaProvider,
//   };
// };
