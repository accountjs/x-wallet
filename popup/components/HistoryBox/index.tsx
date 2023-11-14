import cn from "classnames";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useConfigStore } from "~popup/store";

interface HistoryItem {
  token: string;
  amount: string;
}

interface TimeItem {
  time: string;
  history: HistoryItem[];
}

function HistoryBox() {
  const [historyList, setHistoryList] = useState<TimeItem[]>([
    { time: "Nov 3, 2023", history: [{ token: "ETH", amount: "11" }] },
  ]);
  const { isShowMoney } = useConfigStore();
  const navigate = useNavigate();

  const toTransactionDetail = useCallback(() => {
    navigate("/transactionDetail");
  }, []);

  return (
    <div className="bg-[#E9E9E9] text-center px-5 py-4 h-[170px] relative rounded-b-2xl">
      {historyList.length === 0 ? (
        <div
          className={cn(
            "absolute bottom-2 left-4",
            "text-sm font-semibold cursor-pointer",
            "flex justify-center items-center",
            "h-10 w-[320px] px-6 py-2 mb-3 rounded-2xl bg-white opacity-30"
          )}>
          X-wallet support
        </div>
      ) : (
        <div>
          {historyList.map((item) => (
            <>
              <div className={cn("text-left text-[#979797] mb-3")}>
                {item.time}
              </div>
              {item.history.map((i) => (
                <div
                  key={i.token}
                  className={cn(
                    "text-sm font-semibold cursor-pointer",
                    "flex justify-between items-center",
                    "h-10 w-[100%] px-6 py-2 mb-3 rounded-2xl bg-white"
                  )}
                  onClick={(i) => toTransactionDetail()}>
                  <span>{i.token}</span>
                  <span
                    className={cn({
                      "text-[#4CBC17]": !!i.amount,
                      "text-[#B82929]": !i.amount,
                    })}>
                    {isShowMoney ? i.amount : "***"}
                  </span>
                </div>
              ))}
            </>
          ))}
        </div>
      )}
    </div>
  );
}

export default HistoryBox;
