import { useContext } from "react";
import { Button } from "~components/ui/button";
import { XWalletProviderContext } from "~popup/context";

export function MintButton() {
  const { mintNft } = useContext(XWalletProviderContext);
  return (
    <>
      <Button
        onClick={async () => {
          const res = await mintNft();
          console.log("mint res", res);
        }}
      >
        Mint
      </Button>
    </>
  );
}

export function SendETHButton(props: { target: string; value: string }) {
  const { sendETH } = useContext(XWalletProviderContext);
  return (
    <>
      <Button
        onClick={async () => {
          const res = await sendETH(props.target, props.value);
          console.log("send ETH res", res);
        }}
      >
        Send 0.001 ETH 
      </Button>
    </>
  );
}
