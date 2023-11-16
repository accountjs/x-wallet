import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";

export default function Home() {
  return (
    <>
      <div className="flex flex-col border border-[#ECECEC] rounded-2xl">
        <Header isSend isNeedCopyAddress />
        <Content />
        {/* <Footer /> */}
        {/* <MintButton />
        <SendETHButton
          target="0x281FC8583FbEb10Ab6090783451f832C9E5d7B34"
          value="0.001"
        /> */}
      </div>
    </>
  );
}
