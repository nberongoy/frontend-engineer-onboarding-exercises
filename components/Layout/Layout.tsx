import Footer from '@components/Footer';
import React, { FC } from 'react';
import Navigation from '../Navigation';

const Layout: FC = ({ children }) => {
  return (
    <div>
      <Navigation />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
