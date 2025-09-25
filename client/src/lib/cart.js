// client/src/lib/cart.js
const KEY = "cart";

// ---- tiny event so UI (Navbar badge) can update live ----
const notify = () => {
  try {
    window.dispatchEvent(new Event("cart:updated"));
  } catch {
    // window may not exist in some environments; ignore
  }
};

// Read cart from localStorage
export const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
};

// Save cart to localStorage (+ notify listeners)
export const setCart = (items) => {
  localStorage.setItem(KEY, JSON.stringify(items));
  notify();
};

// Add an item (or increase qty if it exists)
export const addItem = (item) => {
  const cart = getCart();
  const found = cart.find((i) => i.slug === item.slug);
  if (found) {
    found.qty += item.qty || 1;
  } else {
    cart.push({ ...item, qty: item.qty || 1 });
  }
  setCart(cart); // will notify
};

// Remove an item
export const removeItem = (slug) => {
  setCart(getCart().filter((i) => i.slug !== slug)); // will notify
};

// Update quantity
export const updateQty = (slug, qty) => {
  const cart = getCart().map((i) =>
    i.slug === slug ? { ...i, qty: Number(qty) || 1 } : i
  );
  setCart(cart); // will notify
};

// Clear cart
export const clearCart = () => setCart([]); // will notify

// Calculate total price
export const totalPrice = () =>
  getCart().reduce((sum, i) => sum + (Number(i.price) || 0) * (Number(i.qty) || 0), 0);

// NEW: count total items (sum of qty)
export const countItems = () =>
  getCart().reduce((sum, i) => sum + (Number(i.qty) || 0), 0);
