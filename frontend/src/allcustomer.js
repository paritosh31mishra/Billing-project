import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    fetch(`https://billing-project.onrender.com/customer/${localStorage.getItem("tokenid")}`)
      .then((response) => response.json())
      .then((data) => setCustomers(Array.isArray(data) ? data : []))
      .catch(() => setCustomers([]));
  }, []);
  const filtered = customers.filter((customer) => (customer.name || "").toLowerCase().includes(keyword.toLowerCase()));
  return <main className="app-shell"><div className="mx-auto max-w-[1280px] px-5 sm:px-8"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-indigo-600">Directory</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Customers <span className="text-slate-400">{customers.length}</span></h1><p className="mt-2 text-sm text-slate-500">Keep your customer information close at hand.</p></div><Link to="/addcustomer" className="rounded-xl bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"><i className="fa-solid fa-plus mr-2 text-xs" />Add customer</Link></div>
    <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"><div className="border-b border-slate-100 p-4"><div className="relative max-w-sm"><i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-400" /><input className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100" placeholder="Search customers" value={keyword} onChange={(e) => setKeyword(e.target.value)} /></div></div>
      <div className="overflow-x-auto"><table className="min-w-full divide-y divide-slate-100 text-left"><thead className="bg-slate-50/80"><tr>{["Name", "Email", "Mobile", "City", "Pincode", "Address", ""].map((title) => <th key={title} className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{filtered.map((customer) => <tr key={customer._id} className="transition hover:bg-slate-50/70"><td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-800">{customer.name}</td><td className="px-5 py-4 text-sm text-slate-500">{customer.email}</td><td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">{customer.mobile}</td><td className="px-5 py-4 text-sm text-slate-500">{customer.city}</td><td className="px-5 py-4 text-sm text-slate-500">{customer.pincode}</td><td className="max-w-56 truncate px-5 py-4 text-sm text-slate-500">{customer.address}</td><td className="whitespace-nowrap px-5 py-4"><Link to={`/details/${customer._id}`} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">View <i className="fa-solid fa-arrow-right ml-1 text-[10px]" /></Link></td></tr>)}</tbody></table></div>
      {filtered.length === 0 && <p className="px-5 py-12 text-center text-sm text-slate-500">{keyword ? "No customers match that search." : "No customers yet. Add your first customer to get started."}</p>}
    </div></div></main>;
};
export default AllCustomer;
