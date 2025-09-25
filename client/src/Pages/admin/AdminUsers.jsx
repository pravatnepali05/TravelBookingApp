import React, { useEffect, useState } from "react";
import { apiGet, apiJSON } from "../../lib/api";

export default function AdminUsers() {
  const [rows, setRows] = useState([]);
  const load = async () => {
    const data = await apiGet("/api/admin/users");
    setRows(data.users || []);
  };
  useEffect(() => { load(); }, []);

  const setRole = async (id, role) => {
    await apiJSON("PATCH", `/api/admin/users/${id}/role`, { role });
    await load();
  };
  const remove = async (id) => {
    if (!confirm("Delete this user?")) return;
    await apiJSON("DELETE", `/api/admin/users/${id}`);
    await load();
  };

  return (
    <div className="border rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left px-4 py-2">Name</th>
            <th className="text-left px-4 py-2">Email</th>
            <th className="text-left px-4 py-2">Role</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map(u => (
            <tr key={u._id} className="border-t">
              <td className="px-4 py-2">{u.name || "—"}</td>
              <td className="px-4 py-2">{u.email}</td>
              <td className="px-4 py-2">
                <span className="px-2 py-0.5 rounded bg-gray-100">{u.role}</span>
              </td>
              <td className="px-4 py-2 text-right space-x-2">
                {u.role !== "admin" ? (
                  <button onClick={() => setRole(u._id, "admin")}
                          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">
                    Make Admin
                  </button>
                ) : (
                  <button onClick={() => setRole(u._id, "user")}
                          className="px-3 py-1 rounded bg-amber-500 text-white hover:bg-amber-600">
                    Make User
                  </button>
                )}
                <button onClick={() => remove(u._id)}
                        className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700">
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td colSpan="4" className="px-4 py-6 text-center text-gray-500">No users.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
