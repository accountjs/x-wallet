export const addressFormat = (address) => {
  return address
    ? `${address?.slice(0, 6)}
          ...
          ${address?.slice(-6)}`
    : "";
};

export const urlFormat = (url) =>
  "https://raw.githubusercontent.com/0xLukin/x-wallet-ethhangzhou/main/src/pages/Popup/assets/svg/" +
  url +
  ".png";
