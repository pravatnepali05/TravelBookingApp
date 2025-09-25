import React, { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getCart, totalPrice, clearCart } from "../../lib/cart";
// import { addBooking } from "../../lib/bookings"; // no longer needed when using backend

export default function Checkout() {
  const navigate = useNavigate();
  const items = getCart();
  const total = useMemo(() => totalPrice(), [items]);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    paymentMethod: "card", // 'card' | 'cash'
    notes: "",
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!items.length) return alert("Cart is empty.");

    try {
      const res = await fetch("http://localhost:3000/api/bookings/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            title: i.title,
            price: i.price,
            qty: i.qty,
          })),
          customer: { fullName: form.fullName, email: form.email },
          paymentMethod: form.paymentMethod, // 'card' or 'cash'
          notes: form.notes,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Checkout failed");
      }

      // success -> clear cart & go to success page
      clearCart();
      navigate("/checkout/success");
    } catch (err) {
      console.error(err);
      alert("Checkout failed. Check server console for details.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {items.length === 0 ? (
        <div className="bg-gray-50 p-6 rounded-xl">
          <p>Your cart is empty.</p>
          <Link to="/" className="text-blue-600 underline mt-2 inline-block">
            ← Back to Home
          </Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Order summary */}
          <div className="border rounded-xl p-4">
            <h2 className="font-semibold mb-2">Order Summary</h2>
            <ul className="space-y-1 text-sm text-gray-700">
              {items.map((it) => (
                <li key={it.slug}>
                  {it.title} × {it.qty} — €{(it.price * it.qty).toFixed(2)}
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-3 font-semibold">
              <span>Total</span>
              <span>€{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Customer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Full Name</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={onChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>

          {/* Payment method */}
          <div className="border rounded-xl p-4">
            <h2 className="font-semibold mb-3">Payment Method</h2>
            <label className="flex items-center gap-2 mb-2">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={form.paymentMethod === "card"}
                onChange={onChange}
              />
              <span>Card</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={form.paymentMethod === "cash"}
                onChange={onChange}
              />
              <span>Pay on Arrival</span>
            </label>

            {form.paymentMethod === "card" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                <input
                  placeholder="Card Number (demo)"
                  className="border rounded-lg px-3 py-2 md:col-span-2"
                />
                <input placeholder="MM/YY" className="border rounded-lg px-3 py-2" />
                <input placeholder="CVC" className="border rounded-lg px-3 py-2" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">Notes (optional)</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={onChange}
              className="w-full border rounded-lg px-3 py-2"
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
          >
            Confirm & {form.paymentMethod === "cash" ? "Place Booking" : "Pay"}
          </button>
        </form>
      )}
    </div>
  );
}
