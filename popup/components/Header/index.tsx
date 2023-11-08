import { Button } from "~components/ui/button";
import { useWallet } from "../../hooks/useWallet";
import { TwitterName } from "./TwitterName";
import { urlFormat } from "~popup/utils";
import { useContext } from "react";
import { XWalletProviderContext } from "~popup/context";

export function Header() {
  const { userInfo } = useContext(XWalletProviderContext);
  return (
    <>
      <div>
        <div className=" flex justify-between items-center">
          <TwitterName handle={userInfo?.handleName ?? ""} />
          <div className="flex items-center">
            <Button> Send </Button>
            <img
              src={urlFormat("setting")}
              className="w-6 h-6 object-contain"
            ></img>
          </div>
        </div>
      </div>
    </>
  );
}
