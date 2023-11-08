import { useContext } from "react";
import { Button } from "~components/ui/button";
import { XWalletProviderContext } from "~popup/context";

export function Content() {
  const { mintNft } = useContext(XWalletProviderContext);
  return (
    <>
      <Button
        onClick={async () => {
          console.log(await mintNft());
        }}
      >
        Mint
      </Button>
    </>
  );
}
