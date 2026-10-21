import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import swal from "sweetalert";

const fieldClass = "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100";
const Addproduct = () => {
  const [name, pickName] = useState("");
  const [price, pickPrice] = useState("");
  const [qty, pickQty] = useState("");
  const [details, pickDetails] = useState("");
  const [saving, setSaving] = useState(false);

  const save = async (event) => {
    event.preventDefault();
    setSaving(true);
    const newdata = { pname: name, pprice: price, pqty: qty, pdetails: details, tokenno: localStorage.getItem("tokenid") };
    try {
      const result = await fetch("https://billing-project.onrender.com/product", { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(newdata) });
      const response = await result.json();
      if (!result.ok || response.error === "YES") swal("Could not save product", response.message || "Please check the product details and try again.", "warning");
      else { toast(response.message); window.location.href = "#/productlist"; }
    } catch { swal("Could not save product", "Please check your connection and try again.", "error"); }
    finally { setSaving(false); }
  };

  return <main className="app-shell"><ToastContainer /><div className="mx-auto max-w-3xl px-5 sm:px-8"><div className="mb-7"><p className="text-xs font-bold uppercase tracking-[.2em] text-indigo-600">Catalog</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Add a product</h1><p className="mt-2 text-sm text-slate-500">Add an item to your product catalog.</p></div>
    <form onSubmit={save} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8"><h2 className="mb-6 text-base font-semibold text-slate-900">Product details</h2><div className="grid gap-5 sm:grid-cols-2">
      <label className="block text-sm font-semibold text-slate-700 sm:col-span-2">Product name<input required className={fieldClass} type="text" value={name} placeholder="e.g. Studio consultation" onChange={(e) => pickName(e.target.value)} /></label>
      <label className="block text-sm font-semibold text-slate-700">Price<input required min="0" className={fieldClass} type="number" value={price} placeholder="0.00" onChange={(e) => pickPrice(e.target.value)} /></label>
      <label className="block text-sm font-semibold text-slate-700">Quantity<input required min="0" className={fieldClass} type="number" value={qty} placeholder="Available quantity" onChange={(e) => pickQty(e.target.value)} /></label>
      <label className="block text-sm font-semibold text-slate-700 sm:col-span-2">Description<textarea required className={fieldClass} rows={3} value={details} placeholder="Add a short description" onChange={(e) => pickDetails(e.target.value)} /></label>
    </div><div className="mt-7 flex justify-end border-t border-slate-100 pt-6"><button disabled={saving} type="submit" className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:opacity-60"><i className="fa-solid fa-plus mr-2 text-xs" />{saving ? "Saving…" : "Save product"}</button></div></form>
  </div></main>;
};
export default Addproduct;
