import cssText from 'data-text:~globals.css';
import type {
  PlasmoCSConfig,
  PlasmoCSUIJSXContainer,
  PlasmoCSUIProps,
  PlasmoGetInlineAnchor,
  PlasmoGetOverlayAnchor,
  PlasmoGetShadowHostId,
  PlasmoGetStyle,
  PlasmoRender,
} from 'plasmo';

import type { FC } from 'react';
import { createRoot } from 'react-dom/client';
import Popup from '~popup';
import styleText from 'data-text:../globals.css';
export const config: PlasmoCSConfig = {
  matches: ['https://twitter.com/*', 'https://www.baidu.com/*'],
};
export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement('style');
  style.textContent = styleText;
  return style;
};
export const getInlineAnchor: PlasmoGetInlineAnchor = async () =>
  // document.querySelector(
  //   "div[data-testid='sidebarColumn'] > div > div:nth-child(2) > div > div > div > div:nth-child(2)"
  // );
  document.querySelector("div[id='lg']");
// export const getRootContainer = async () =>
//   new Promise((resolve, reject) => {
//     const checkInterval = setInterval(() => {
//       const root = document.querySelector("#plasmo-root-container");
//       if (!root) {
//         const rootContainerParent = document.querySelector(
//           "div[data-testid='sidebarColumn'] > div > div:nth-child(2) > div > div > div"
//         );
//         if (rootContainerParent) {
//           const rootContainer = document.createElement("div");
//           rootContainer.id = "plasmo-root-container";
//           rootContainerParent.insertBefore(
//             rootContainer,
//             rootContainerParent.children[2]
//           );
//           console.log("plasmo-root-container", rootContainer);
//           resolve(rootContainer);
//         }
//       }
//     }, 1000);
//   });

// export const render: PlasmoRender<PlasmoCSUIJSXContainer> = async ({
//   anchor,
//   createRootContainer,
// }) => {
//   const rootContainer = await createRootContainer();
//   console.log("rootContainer", rootContainer);
//   const root = createRoot(rootContainer);
//   root.render(<Popup />);
// };
// export const getRootContainer = () =>
//   new Promise((resolve) => {
//     const checkInterval = setInterval(() => {
//       const root = document.querySelector(".plasmo-root-container");
//       if (root) resolve(root);
//       const rootContainerParent = document.querySelector(
//         'div[data-testid="sidebarColumn"] div > div:nth-child(2) > div > div > div'
//       );
//       console.log("rootContainerParent", rootContainerParent);
//       if (rootContainerParent && rootContainerParent.children.length >= 3) {
//         clearInterval(checkInterval);
//         const rootContainer = document.createElement("div");
//         rootContainer.classList.add("plasmo-root-container");
//         rootContainerParent.insertBefore(
//           rootContainer,
//           rootContainerParent.children[2]
//         );
//         resolve(rootContainer);
//       }
//     }, 137);
//   });

export default Popup;
