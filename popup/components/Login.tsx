import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "~components/ui/button";
import { useWallet } from "~popup/hooks/useWallet";
import { urlFormat } from "~popup/utils";

export default function Login() {
  const { login, address, loginLoading } = useWallet();
  const navigate = useNavigate();
  useEffect(() => {
    if (address) {
      console.log("address", address);
      navigate("/");
    }
  }, [address]);
  return (
    <>
      <div className="w-full h-full bg-[#F8FAF9] px-11 pt-24 rounded-[1.25rem]">
        <div className="flex flex-col items-center gap-14 ">
          <img
            className="w-36 h-24 object-contain"
            src={urlFormat("welcome-logo")}
          ></img>
          <Button
            className="w-full h-11 text-xl/[1.5125rem] rounded-[2.5rem]"
            onClick={() => {
              login();
            }}
          >
            {loginLoading ? "loading ..." : "connect to X-Wallet"}
          </Button>
          {address ? address : "Null"}
        </div>
      </div>
    </>
  );
}
