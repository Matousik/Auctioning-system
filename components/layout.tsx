import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto px-4">
      <header className="my-8">
        <Navbar />
      </header>
      <main>{children}</main>
      <footer className="my-8">
        {
          <p className="text-center text-gray-400">Created by Matouš Vondrák</p>
        }
      </footer>
    </div>
  );
};

export default Layout;
