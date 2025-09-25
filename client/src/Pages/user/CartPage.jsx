import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCart, updateQty, removeItem, totalPrice } from "../../lib/cart";

export default function CartPage() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const refresh = () => setItems(getCart());

  useEffect(() => {
    refresh();
  }, []);

  const onQtyChange = (slug, qty) => {
    updateQty(slug, qty);
    refresh();
  };

  const onRemove = (slug) => {
    removeItem(slug);
    refresh();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {items.length === 0 ? (
        <div className="bg-gray-50 p-6 rounded-xl">
          <p>Your cart is empty.</p>
          <Link to="/" className="text-blue-600 underline mt-2 inline-block">
            ← Back to Home
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((it) => (
              <div key={it.slug} className="flex items-center justify-between border rounded-xl p-4">
                <div>
                  <div className="font-semibold">{it.title}</div>
                  <div className="text-sm text-gray-600">€{it.price} per person</div>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={it.qty}
                    onChange={(e) => onQtyChange(it.slug, e.target.value)}
                    className="border rounded-lg px-2 py-1"
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => onRemove(it.slug)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-6 border-t pt-4">
            <div className="text-lg">Total</div>
            <div className="text-2xl font-bold">€{totalPrice().toFixed(2)}</div>
          </div>

          <button
  onClick={() => navigate("/checkout")}
  className="mt-4 w-full px-4 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
>
  Proceed to Checkout
</button>

        </>
      )}
    </div>
  );
}
