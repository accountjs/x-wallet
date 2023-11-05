import { Button } from "~components/ui/button";
import { urlFormat } from "~popup/utils";

export default function Hero() {
  return (
    <>
      <div className="px-11 pt-24 bg-[#F8FAF9]">
        <div className="flex flex-col items-center gap-14 ">
          <img
            className="w-36 h-24 object-contain"
            src={urlFormat("welcome-logo")}
          ></img>
          <Button className="w-full h-11 text-xl/[1.5125rem] rounded-[2.5rem] ">
            connect to X-Wallet
          </Button>
        </div>
      </div>
    </>
  );
}
