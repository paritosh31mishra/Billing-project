import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API = "https://billing-project.onrender.com/product";
const Productlist = () => {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const loadProducts = () => fetch(API).then((response) => response.json()).then((data) => setProducts(Array.isArray(data) ? data : [])).catch(() => setProducts([]));
  useEffect(() => { loadProducts(); }, []);
  const removeProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try { const response = await fetch(`${API}/${id}`, { method: "DELETE" }).then((r) => r.json()); window.alert(response.message); loadProducts(); }
    catch { window.alert("Could not delete the product. Please try again."); }
  };
  const filtered = products.filter((product) => Number(product.qty) > 0 && (product.name || "").toLowerCase().includes(keyword.toLowerCase()));
  return <main className="app-shell"><div className="mx-auto max-w-[1280px] px-5 sm:px-8"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-indigo-600">Catalog</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Products <span className="text-slate-400">{products.length}</span></h1><p className="mt-2 text-sm text-slate-500">Manage the items and services you offer.</p></div><Link to="/addproduct" className="rounded-xl bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"><i className="fa-solid fa-plus mr-2 text-xs" />Add product</Link></div>
    <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"><div className="border-b border-slate-100 p-4"><div className="relative max-w-sm"><i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-400" /><input className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100" placeholder="Search products" value={keyword} onChange={(e) => setKeyword(e.target.value)} /></div></div>
      <div className="overflow-x-auto"><table className="min-w-full divide-y divide-slate-100 text-left"><thead className="bg-slate-50/80"><tr>{["Product", "Price", "Quantity", "Description", ""].map((title) => <th key={title} className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{filtered.map((product) => <tr key={product._id} className="transition hover:bg-slate-50/70"><td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-800">{product.name}</td><td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-700">₹{product.price}</td><td className="px-5 py-4 text-sm text-slate-500">{product.qty}</td><td className="max-w-sm truncate px-5 py-4 text-sm text-slate-500">{product.details}</td><td className="whitespace-nowrap px-5 py-4 text-right"><Link to={`/editproduct/${product._id}`} className="mr-3 text-sm font-semibold text-indigo-600 hover:text-indigo-800">Edit</Link><button onClick={() => removeProduct(product._id)} className="text-sm font-semibold text-rose-600 hover:text-rose-800">Delete</button></td></tr>)}</tbody></table></div>
      {filtered.length === 0 && <p className="px-5 py-12 text-center text-sm text-slate-500">{keyword ? "No products match that search." : "No products yet. Add your first product to get started."}</p>}
    </div></div></main>;
};
export default Productlist;
