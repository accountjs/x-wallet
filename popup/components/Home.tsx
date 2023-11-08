import { Content } from "./Content";
import { Footer } from "./Footer";
import { Header } from "./Header";

export default function Home() {
  return (
    <>
      <div className="flex flex-col">
        <Header />
        <Content />
        <Footer />
      </div>
    </>
  );
}
