import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children, role }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar role={role} />
      
      {/* Main Content */}
      <main className="ml-64 p-6 bg-gray-50 overflow-y-auto">
  {children}
</main>

    </div>
  );
};

export default Layout;
