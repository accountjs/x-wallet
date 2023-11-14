import React from 'react';
import Content from '~popup/components/Content';
import Footer from '~popup/components/Footer';
import Header from '~popup/components/Header';

const BasePageWrap = ({ children, isFooter = false }) => {
  // const defaultChildren = props.children;

  console.log(children, 'defaultchildren');

  return (
    <>
      <div className="flex flex-col">
        <Header />
        {children}
        {isFooter ? <Footer /> : null}
      </div>
    </>
  );
};

export default BasePageWrap;
