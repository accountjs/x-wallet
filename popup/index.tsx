import { Web3Provider } from "./config/Web3Provider";
import { Route, Routes, MemoryRouter, Link } from "react-router-dom";
import "../globals.css";
import Hero from "./components/Hero";

function IndexPopup() {
  return (
    <Web3Provider>
      <MemoryRouter>
        <div className="h-[375px] w-[350px] font-semibold">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <div>sdfads</div>
                </>
              }
            />
            <Route path="/lazy" element={<>lazy</>} />
          </Routes>
        </div>
      </MemoryRouter>
    </Web3Provider>
  );
}

export default IndexPopup;
