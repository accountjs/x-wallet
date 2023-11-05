import type {
  PlasmoCSConfig,
  PlasmoCSUIJSXContainer,
  PlasmoCSUIProps,
  PlasmoRender,
} from "plasmo";
import type { FC } from "react";
import { createRoot } from "react-dom/client";
import Popup from "~popup";

export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*"],
};

export const getRootContainer = () =>
  new Promise((resolve) => {
    const checkInterval = setInterval(() => {
      const mainDiv = document.querySelector(
        'div[data-testid="sidebarColumn"]'
      );
      if (!mainDiv) return;
      const rootContainerParent = mainDiv.querySelector(
        "div > div:nth-child(2) > div > div > div > div > div "
      );
      if (rootContainerParent) {
        clearInterval(checkInterval);
        const rootContainer = document.createElement("div");
        rootContainer.classList.add("plasmo-root-container");
        rootContainer.style.width = "350px";
        rootContainer.style.height = "370px";
        rootContainerParent.insertBefore(
          rootContainer,
          rootContainerParent.children[2]
        );
        resolve(rootContainer);
      }
    }, 137);
  });

const PlasmoOverlay: FC<PlasmoCSUIProps> = () => {
  return (
    <span
      style={{
        borderRadius: 4,
        background: "yellow",
        padding: 4,
        // position: "absolute",
        // transform: "translateY(-24px) translateX(42px)",
      }}
    >
      CSUI ROOT CONTAINER
    </span>
  );
};

export const render: PlasmoRender<PlasmoCSUIJSXContainer> = async ({
  createRootContainer,
}) => {
  const rootContainer = await createRootContainer();
  const root = createRoot(rootContainer);
  root.render(<Popup />);
};

export default PlasmoOverlay;
