// client/src/Pages/admin/AdminTours.jsx
import React, { useEffect, useState } from "react";
import { apiGet, apiJSON, apiDelete } from "../../lib/api";

// Use the same images the homepage uses
import imgAU from "../../assets/dreamvacations/Australia.jpg";
import imgBR from "../../assets/dreamvacations/Brasil.jpg";
import imgJP from "../../assets/dreamvacations/Japan.jpeg";
import imgNP from "../../assets/dreamvacations/Nepal.jpg";

// These are the static homepage tours (just for viewing here)
const DEFAULT_TOURS = [
  { slug: "australia", title: "Australia", image: imgAU, description: "Sydney, Great Barrier Reef, Outback." },
  { slug: "brazil", title: "Brazil", image: imgBR, description: "Beaches, rainforest, lively culture." },
  { slug: "japan", title: "Japan", image: imgJP, description: "Tradition meets modernity." },
  { slug: "nepal", title: "Nepal", image: imgNP, description: "Himalayas & rich culture." },
];

const EMPTY = {
  title: "",
  description: "",
  price: 0,
  durationDays: 7,
  maxPersons: 10,
  images: [], // URLs only for now
};

export default function AdminTours() {
  const [mode, setMode] = useState("add"); // "add" | "list"
  const [form, setForm] = useState(EMPTY);
  const [rows, setRows] = useState([]); // backend tours
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      const data = await apiGet("/api/admin/tours");
      setRows(data.tours || []);
    } catch (e) {
      setErr(e.message || "Failed to load tours.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mode === "list") load();
  }, [mode]);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        durationDays: Number(form.durationDays),
        maxPersons: Number(form.maxPersons),
      };
      await apiJSON("POST", "/api/admin/tours", payload);
      setForm(EMPTY);
      alert("Tour created!");
      setMode("list"); // jump to list to show it
    } catch (e) {
      setErr(e.message || "Create failed.");
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this tour?")) return;
    try {
      await apiDelete(`/api/admin/tours/${id}`);
      await load();
      alert("Deleted");
    } catch (e) {
      setErr(e.message || "Delete failed.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-3">
        <button
          className={`px-4 py-2 rounded-lg ${mode === "add" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
          onClick={() => setMode("add")}
        >
          Add Tour
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${mode === "list" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
          onClick={() => setMode("list")}
        >
          See Tours
        </button>
      </div>

      {mode === "add" ? (
        // ADD FORM
        <form onSubmit={submit} className="max-w-2xl border rounded-xl p-4 space-y-3">
          <h2 className="text-lg font-semibold">Create Tour</h2>

          {err && <div className="text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded">{err}</div>}

          <input
            name="title"
            value={form.title}
            onChange={onChange}
            placeholder="Title (e.g. Nepal Highlights)"
            className="w-full border rounded px-3 py-2"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            placeholder="Description"
            rows={4}
            className="w-full border rounded px-3 py-2"
            required
          />
          <div className="grid grid-cols-3 gap-3">
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={onChange}
              placeholder="Price (€)"
              className="border rounded px-3 py-2"
              required
            />
            <input
              name="durationDays"
              type="number"
              value={form.durationDays}
              onChange={onChange}
              placeholder="Days"
              className="border rounded px-3 py-2"
              required
            />
            <input
              name="maxPersons"
              type="number"
              value={form.maxPersons}
              onChange={onChange}
              placeholder="Max persons"
              className="border rounded px-3 py-2"
            />
          </div>

          {/* Optional: comma separated URLs */}
          <input
            name="images"
            value={form.images.join(",")}
            onChange={(e) =>
              setForm({
                ...form,
                images: e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
            placeholder="Image URLs (comma-separated, optional)"
            className="w-full border rounded px-3 py-2"
          />

          <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
            Create
          </button>
        </form>
      ) : (
        // SEE TOURS
        <div className="space-y-8">
          {/* Static tours section */}
          <div>
            <h3 className="font-semibold mb-3">Homepage (static) tours</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {DEFAULT_TOURS.map((t) => (
                <div key={t.slug} className="border rounded-xl overflow-hidden">
                  <img src={t.image} alt={t.title} className="w-full h-40 object-cover" />
                  <div className="p-3">
                    <div className="font-semibold">{t.title}</div>
                    <div className="text-sm text-gray-600">{t.description}</div>
                    <div className="text-xs mt-2 text-gray-500">Source: static</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Backend tours */}
          <div>
            <h3 className="font-semibold mb-3">Custom tours (from backend)</h3>
            {loading ? (
              <div className="text-gray-600">Loading…</div>
            ) : rows.length === 0 ? (
              <div className="text-gray-500">No tours found.</div>
            ) : (
              <div className="overflow-x-auto border rounded-xl">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-2">Title</th>
                      <th className="text-left px-4 py-2">Price</th>
                      <th className="text-left px-4 py-2">Days</th>
                      <th className="text-left px-4 py-2">Max</th>
                      <th className="text-left px-4 py-2">Images</th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((t) => (
                      <tr key={t._id} className="border-t">
                        <td className="px-4 py-2">{t.title}</td>
                        <td className="px-4 py-2">€{Number(t.price).toFixed(2)}</td>
                        <td className="px-4 py-2">{t.durationDays ?? "—"}</td>
                        <td className="px-4 py-2">{t.maxPersons ?? "—"}</td>
                        <td className="px-4 py-2">
                          {Array.isArray(t.images) && t.images.length > 0 ? t.images.length : "—"}
                        </td>
                        <td className="px-4 py-2 text-right">
                          <button
                            onClick={() => remove(t._id)}
                            className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
