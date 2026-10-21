import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";

const fieldClass = "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100";
const Editproduct = () => {
  const { productid } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [details, setDetails] = useState("");
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    fetch(`https://billing-project.onrender.com/product/${productid}`).then((r) => r.json()).then((data) => {
      setName(data.name || ""); setPrice(data.price || ""); setQty(data.qty || ""); setDetails(data.details || "");
    }).catch(() => {});
  }, [productid]);
  const update = async (event) => {
    event.preventDefault(); setSaving(true);
    try {
      const response = await fetch(`https://billing-project.onrender.com/product/${productid}`, { headers: { "Content-Type": "application/json" }, method: "PUT", body: JSON.stringify({ name, price, qty, details }) }).then((r) => r.json());
      if (response.error === "YES") swal(response.message, "", "warning");
      else { toast("Product updated"); window.location.href = "#/productlist"; }
    } catch { swal("Could not update product", "Please check your connection and try again.", "error"); }
    finally { setSaving(false); }
  };
  return <main className="app-shell"><ToastContainer /><div className="mx-auto max-w-3xl px-5 sm:px-8"><Link to="/productlist" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"><i className="fa-solid fa-arrow-left mr-2 text-xs" />Products</Link><div className="mb-7 mt-6"><p className="text-xs font-bold uppercase tracking-[.2em] text-indigo-600">Catalog</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Edit product</h1></div>
    <form onSubmit={update} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8"><div className="grid gap-5 sm:grid-cols-2"><label className="block text-sm font-semibold text-slate-700 sm:col-span-2">Product name<input required className={fieldClass} value={name} onChange={(e) => setName(e.target.value)} /></label><label className="block text-sm font-semibold text-slate-700">Price<input required type="number" min="0" className={fieldClass} value={price} onChange={(e) => setPrice(e.target.value)} /></label><label className="block text-sm font-semibold text-slate-700">Quantity<input required type="number" min="0" className={fieldClass} value={qty} onChange={(e) => setQty(e.target.value)} /></label><label className="block text-sm font-semibold text-slate-700 sm:col-span-2">Description<textarea className={fieldClass} rows={3} value={details} onChange={(e) => setDetails(e.target.value)} /></label></div><div className="mt-7 flex justify-end border-t border-slate-100 pt-6"><button disabled={saving} type="submit" className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60">{saving ? "Saving…" : "Save changes"}</button></div></form>
  </div></main>;
};
export default Editproduct;
