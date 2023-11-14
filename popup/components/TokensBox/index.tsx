import cn from "classnames";
import { useState } from "react";
import { useConfigStore } from "~popup/store";

interface TokenItem {
  token: string;
  amount: string;
}

function TokensBox() {
  const [tokensList, setTokenList] = useState<TokenItem[]>([
    { token: "ETH", amount: "11" },
  ]);
  const { isShowMoney } = useConfigStore();

  return (
    <div className="bg-[#E9E9E9] text-center px-5 py-4 h-[170px] relative rounded-b-2xl">
      {tokensList.length === 0 ? (
        <div
          className={cn(
            "absolute bottom-2 left-4",
            "text-sm font-semibold cursor-pointer",
            "flex justify-center items-center",
            "h-10 w-[100%] px-6 py-2 mb-3 rounded-2xl bg-white opacity-30"
          )}>
          + Import Tokens
        </div>
      ) : (
        tokensList.map((i) => (
          <div
            key={i.token}
            className={cn(
              "text-sm font-semibold cursor-pointer",
              "flex justify-between items-center",
              "h-10 w-[320px] px-6 py-2 mb-3 rounded-2xl bg-white"
            )}>
            <span>{i.token}</span>
            <span>{isShowMoney ? <span>{i.amount}</span> : "***"}</span>
          </div>
        ))
      )}
    </div>
  );
}

export default TokensBox;
