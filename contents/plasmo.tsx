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

import Popup from '~popup';
import styleText from 'data-text:../globals.css';
export const config: PlasmoCSConfig = {
  matches: ['https://twitter.com/*'],
  // matches: ["https://www.baidu.com/*"],
};
export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement('style');
  style.textContent = styleText;
  return style;
};
export const getInlineAnchor: PlasmoGetInlineAnchor = async () =>
  document.querySelector(
    "div[data-testid='sidebarColumn'] > div > div:nth-child(2) > div > div > div > div:nth-child(2)"
  );
// document.querySelector("div[id='lg']");

export default Popup;
