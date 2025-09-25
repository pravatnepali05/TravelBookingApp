import React from "react";
import { useAuth } from "../../context/UserContext"; 

export default function Profile() {
  const [auth] = useAuth();
  const user = auth?.user;

  if (!user) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-3">Profile</h1>
        <p className="text-gray-600 mb-4">You’re not signed in.</p>
        <Link
          to="/login"
          className="inline-block px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Sign In
        </Link>
      </div>
    );
  }

  const initials =
    (user.name || user.username || user.email || "U")
      .trim()
      .split(" ")
      .map((s) => s[0]?.toUpperCase())
      .slice(0, 2)
      .join("");

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <div className="border rounded-2xl p-5 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-semibold">
          {initials}
        </div>
        <div>
          <div className="text-lg font-semibold">
            {user.name || user.username || "Unnamed User"}
          </div>
          <div className="text-gray-600">{user.email}</div>
          {user.role && (
            <div className="text-sm mt-1">
              <span className="px-2 py-0.5 bg-gray-100 rounded-lg">
                Role: {user.role}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Extra info box (optional) */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border rounded-xl p-4">
          <div className="text-sm text-gray-500">Bookings</div>
          <div className="text-2xl font-bold">—</div>
        </div>
        <div className="border rounded-xl p-4">
          <div className="text-sm text-gray-500">Member since</div>
          <div className="text-2xl font-bold">
            {user.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "—"}
          </div>
        </div>
      </div>
    </div>
  );
}
