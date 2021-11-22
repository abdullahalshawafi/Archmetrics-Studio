import React from "react";
import Navbar from "../components/admin/Navbar";

function AdminLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default AdminLayout;
