import Footer from '@components/Footer';
import React, { FC } from 'react';
import Navigation from '../Navigation';

const Layout: FC = ({ children }) => {
  return (
    <>
      <Navigation />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
