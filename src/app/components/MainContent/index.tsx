import React from 'react';

type ContentProps = {
    children : React.ReactNode;
  }
const MainContent: React.FC<ContentProps> = ({ children }) => {
  return (
    <div className="w-3/4 h-screen">
      {children}
    </div>
  );
}

export default MainContent;