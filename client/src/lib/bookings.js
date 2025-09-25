const KEY = "bookings";

export const getBookings = () => {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
  catch { return []; }
};

export const addBooking = (booking) => {
  const all = getBookings();
  all.push(booking);
  localStorage.setItem(KEY, JSON.stringify(all));
};
