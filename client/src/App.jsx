import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import HomePage from "./Pages/HomePage";
import CartPage from "./Pages/user/CartPage.jsx";
import Checkout from "./Pages/user/checkout.jsx";
import CheckoutSuccess from "./Pages/user/checkoutSuccess.jsx";
import Tour from "./Pages/Tour.jsx";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Profile from "./Pages/user/Profile.jsx";

// Admin UI
import AdminLayout from "./Pages/admin/AdminLayout.jsx";
import AdminUsers from "./Pages/admin/AdminUsers.jsx";
import AdminTours from "./Pages/admin/AdminTours.jsx";
import AdminRoutes from "./components/routes/Admin"; // your guard


export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/destination/:slug" element={<Tour />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        {/* Cart / Checkout */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        

        {/* Profile */}
        <Route path="/user" element={<Profile />} />
        {/* If you also want /profile as alias, uncomment: */}
        {/* <Route path="/profile" element={<Profile />} /> */}

        {/* Admin (protected) */}
        <Route path="/admin" element={<AdminRoutes />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminUsers />} />          {/* /admin */}
            <Route path="users" element={<AdminUsers />} />   {/* /admin/users */}
            <Route path="tours" element={<AdminTours />} />   {/* /admin/tours */}
          </Route>
        </Route>
      </Routes>
    </>
  );
}
