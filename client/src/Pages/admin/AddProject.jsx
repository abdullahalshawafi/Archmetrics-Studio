import React, { useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";

function AdminProjects({ adminPage, setAdminPage }) {
  useEffect(() => {
    setAdminPage("projects");
  });

  return (
    <AdminLayout adminPage={adminPage}>
      <div className="m-5 p-5">
        <h1>Hello World</h1>
      </div>
    </AdminLayout>
  );
}

export default AdminProjects;
