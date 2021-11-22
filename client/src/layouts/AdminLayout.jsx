import React from "react";
import Navbar from "../components/admin/Navbar";

function AdminLayout({ adminPage, children }) {
  return (
    <div>
      <Navbar adminPage={adminPage} />
      {children}
    </div>
  );
}

export default AdminLayout;
