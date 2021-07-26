import Footer from '@components/Footer';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import Navigation from '../Navigation';

const Layout: FC = ({ children }) => {
  const router = useRouter();

  const showFooter = ['/login', '/signup'].includes(router.pathname);

  return (
    <div>
      <Navigation />
      <div>{children}</div>
      {!showFooter ? <Footer /> : null}
    </div>
  );
};

export default Layout;
