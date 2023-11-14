import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import cn from "classnames";
import { useState } from "react";
import TokensBox from "../TokensBox";
import NFTsBox from "../NFTsBox";
import HistoryBox from "../HistoryBox";

const TabsArr = ["Tokens", "NFTs", "History"];
export default function Content() {
  const [tabActive, setTabActive] = useState("Tokens");

  return (
    <Tabs defaultValue={tabActive} className="min-h-[170px]">
      <TabsList className="grid grid-cols-3">
        {TabsArr.map((i) => (
          <TabsTrigger
            key={i}
            className={cn(
              "rounded-t-3xl w-[100%] h-11 leading-[44px] text-base font-semibold",
              {
                "bg-[#E9E9E9]": tabActive === i,
                "text-[#000000]": tabActive === i,
                "bg-[#ECECEC]": tabActive !== i,
                "opacity-50": tabActive !== i,
                "text-[#BFBFBF]": tabActive !== i,
              }
            )}
            value={i}
            onClick={() => setTabActive(i)}>
            {i}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="Tokens">
        <TokensBox />
      </TabsContent>
      <TabsContent value="NFTs">
        <NFTsBox />
      </TabsContent>
      <TabsContent value="History">
        <HistoryBox />
      </TabsContent>
    </Tabs>
  );
}

// export function MintButton() {
//   const { mintNft } = useContext(XWalletProviderContext);
//   return (
//     <>
//       <Button
//         onClick={async () => {
//           const res = await mintNft();
//           console.log("mint res", res);
//         }}
//       >
//         Mint
//       </Button>
//     </>
//   );
// }

// export function SendETHButton(props: { target: string; value: string }) {
//   const { sendETH } = useContext(XWalletProviderContext);
//   return (
//     <>
//       <Button
//         onClick={async () => {
//           const res = await sendETH(props.target, props.value);
//           console.log("send ETH res", res);
//         }}
//       >
//         Send 0.001 ETH
//       </Button>
//     </>)
// }
