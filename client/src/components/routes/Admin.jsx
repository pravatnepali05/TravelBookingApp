import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { useAuth } from '../../context/UserContext';

export default function AdminRoutes() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  console.log("Auth state in AdminRoutes:", auth);
  console.log("Token from useAuth:", auth?.token);

  useEffect(() => {
    const adminCheck = async () => {
      try {
        console.log("Sending request to backend for admin check...");

        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/auth/admin-auth`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );

        console.log("Admin check response:", res.data);
        setOk(res.data.ok);
      } catch (error) {
        console.log("Error during admin check:", error);
        setOk(false);
      }
    };

    if (auth?.token) {
      adminCheck();
    } else {
      console.log("No token found. Admin check skipped.");
    }
  }, [auth?.token]);

  if (!auth?.token) return <Spinner />;
  if (!ok) return <div className="text-center text-red-600 mt-10">Unauthorized. Admins only.</div>;

  return <Outlet />;
}

