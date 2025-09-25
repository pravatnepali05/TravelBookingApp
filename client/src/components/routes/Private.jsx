import { useState, useEffect } from 'react';
import { useAuth } from '../../context/UserContext';
import { Outlet,Navigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';

export default function PrivateRoutes() {
  const [ok, setOk] = useState(false);
  const [adminOk, setAdminOk] = useState(false);
  const [auth] = useAuth();

  // User authentication check
  useEffect(() => {
    const authcheck = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/auth/user-auth`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        setOk(res.data.ok);
      } catch (error) {
        console.log(error);
        setOk(false);
      }
    };
    if (auth?.token) {
      authcheck();
    }
  }, [auth?.token]);

  


  return ok ? <Outlet /> : <Spinner />;
}