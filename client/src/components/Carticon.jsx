import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { countItems } from "../lib/cart";
import { FaShoppingCart } from "react-icons/fa";

export default function CartIcon() {
  const [count, setCount] = useState(countItems());

  useEffect(() => {
    const update = () => setCount(countItems());
    // update on load + whenever cart changes
    window.addEventListener("cart:updated", update);
    return () => window.removeEventListener("cart:updated", update);
  }, []);

  return (
    <Link to="/cart" className="relative inline-flex items-center">
      <FaShoppingCart className="text-xl" />
      {count > 0 && (
        <span
          className="absolute -top-2 -right-2 text-xs leading-none px-2 py-1 rounded-full bg-blue-600 text-white"
          aria-label={`${count} items in cart`}
        >
          {count}
        </span>
      )}
    </Link>
  );
}
