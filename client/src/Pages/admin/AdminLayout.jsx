import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  const link =
    "px-3 py-2 rounded-lg hover:bg-gray-100 transition text-sm font-medium";
  const active = "bg-blue-600 text-white hover:bg-blue-700";

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="flex gap-4 mb-6">
        <NavLink to="/admin/users" className={({isActive}) => isActive ? `${link} ${active}` : link}>Users</NavLink>
        <NavLink to="/admin/tours" className={({isActive}) => isActive ? `${link} ${active}` : link}>Tours</NavLink>
      </div>
      <Outlet />
    </div>
  );
}
