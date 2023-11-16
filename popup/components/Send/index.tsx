import { useState, useContext, useRef } from "react";
import cn from "classnames";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import qbrady_manga from "data-base64:~popup/assets/svg/qbrady_manga.png";

import { XWalletProviderContext } from "~popup/context";

import ArrowDown from "data-base64:~popup/assets/svg/arrow_down.svg";

const Send = () => {
  const [amount, setAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("matic"); // 默认币种
  const [targetAddress, setTargetAddress] = useState(""); // 显示目标地址
  const twitterRef = useRef<HTMLInputElement>(null);
  const { getAddress } = useContext(XWalletProviderContext);
  const handleChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    console.log(value, "Amount");
  };

  const handleCurrencyChange = (e) => {
    const currency = e.target.value;
    setSelectedCurrency(currency);
  };

  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, []);

  const handleTwitterBlur = async () => {
    const twitterUsername = twitterRef.current?.value;
    if (twitterUsername) {
      // 调用后台接口获取目标地址
      const response = await fetch(
        `/api/getAddress?twitter=${twitterUsername}`
      );
      if (response.ok) {
        const data = await response.json();
        const address = data.address;
        setTargetAddress(address);
      } else {
        console.error("Failed to fetch target address");
      }
    }
  };

  return (
    <div className="p-4 relative pb-6 h-[100%]">
      <div
        className={cn(
          "w-16 h-8 text-white bg-[#D9D9D9] cursor-pointer rounded-2xl",
          "flex justify-center items-center text-2xl font-bold"
        )}
        onClick={goBack}
      >
        ←
      </div>

      <div
        className={cn(
          "flex justify-between items-center",
          "h-12 rounded-2xl px-4 bg-[#E9E9E9] mb-2 mt-6"
        )}
      >
        Amount
        <input
          className={cn("h-[100%] w-[50%] bg-[#E9E9E9] text-right")}
          placeholder="Amount"
          style={{ outline: "none" }}
          value={amount}
          onChange={handleChange}
        />
        <select
          className={cn("h-[100%] w-[40%] bg-[#E9E9E9] text-right")}
          value={selectedCurrency}
          onChange={handleCurrencyChange}
        >
          <option value="matic">MATIC</option>
          <option value="eth">ETH</option>
          <option value="bnb">BNB</option>
        </select>
      </div>
      <div
        className={cn(
          "flex justify-between items-center relative",
          "h-12 rounded-2xl px-4 bg-[#E9E9E9]"
        )}
      >
        Twitter
        <input
          className={cn("h-[100%] w-[50%] bg-[#E9E9E9] text-right")}
          placeholder="name or handle"
          style={{ outline: "none" }}
          ref={twitterRef}
          onBlur={handleTwitterBlur} // 在失去焦点时调用获取目标地址的函数
        />
        <div
          className={cn(
            "absolute left-1/2 bottom-[-20px]",
            "px-2 py-1 bg-[#AEAFAE] rounded-xl text-white"
          )}
          style={{
            translate: "-50% 0",
          }}
        >
          ↓
        </div>
      </div>

      {targetAddress && (
        <div className="text-center text-sm mt-2">
          Target Address: {targetAddress}
        </div>
      )}
      <div className=" flex justify-start text-center text-sm mt-4">
        <div> Target Address: {targetAddress}</div>
      </div>
      <div
        className={cn(
          "absolute left-0 bottom-0",
          "w-[100%] h-12 text-center text-white  bg-black leading-[48px]",
          "rounded-b-3xl"
        )}
        onClick={handleTwitterBlur}
      >
        Send
      </div>
    </div>
  );
};

export default Send;
