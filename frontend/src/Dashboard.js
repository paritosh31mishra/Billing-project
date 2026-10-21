import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const API = "https://billing-project.onrender.com";
const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("tokenid");
    Promise.all([
      fetch(`${API}/customer/${token}`).then((r) => r.json()),
      fetch(`${API}/product`).then((r) => r.json()),
      fetch(`${API}/billing`).then((r) => r.json()),
    ]).then(([customerData, productData, billData]) => {
      setCustomers(Array.isArray(customerData) ? customerData : []);
      setProducts(Array.isArray(productData) ? productData : []);
      setBills(Array.isArray(billData) ? billData : []);
    }).catch(() => {});
  }, []);

  const stats = [
    { label: "Total customers", value: customers.length, icon: "fa-users", tone: "bg-violet-50 text-violet-600", to: "/allcustomer", hint: "View your customer list" },
    { label: "Products", value: products.length, icon: "fa-box", tone: "bg-sky-50 text-sky-600", to: "/productlist", hint: "Manage your catalog" },
    { label: "Bills generated", value: bills.length, icon: "fa-receipt", tone: "bg-emerald-50 text-emerald-600", to: "/billing", hint: "Review recent billing" },
  ];

  return <main className="app-shell"><div className="mx-auto max-w-[1280px] px-5 sm:px-8">
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-indigo-600">Workspace overview</p><h1 className="text-3xl font-semibold tracking-tight text-slate-900">Good to see you, {localStorage.getItem("myname")?.split(" ")[0] || "there"}.</h1><p className="mt-2 text-sm text-slate-500">Here’s what’s happening with your business today.</p></div><Link to="/billing" className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"><i className="fa-solid fa-plus text-xs" /> Create a bill</Link></div>
    <div className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{stats.map((stat) => <Link key={stat.label} to={stat.to} className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60"><div className="flex items-start justify-between"><span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.tone}`}><i className={`fa-solid ${stat.icon} text-lg`} /></span><i className="fa-solid fa-arrow-up-right-from-square text-xs text-slate-300 transition group-hover:text-indigo-500" /></div><p className="mt-7 text-sm font-medium text-slate-500">{stat.label}</p><p className="mt-1 text-4xl font-semibold tracking-tight text-slate-900">{stat.value}</p><p className="mt-2 text-xs text-slate-400">{stat.hint}</p></Link>)}</div>
    <section className="mt-7 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><div><h2 className="text-base font-semibold text-slate-900">Quick actions</h2><p className="mt-1 text-sm text-slate-500">Pick up where you left off.</p></div><span className="hidden h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 sm:flex"><i className="fa-solid fa-bolt" /></span></div><div className="mt-5 grid gap-3 sm:grid-cols-3">{[["Add a customer", "/addcustomer", "fa-user-plus"], ["Add a product", "/addproduct", "fa-box-open"], ["Open billing", "/billing", "fa-file-invoice-dollar"]].map(([label, to, icon]) => <Link key={to} to={to} className="flex items-center gap-3 rounded-xl border border-slate-100 p-4 text-sm font-semibold text-slate-700 transition hover:border-indigo-100 hover:bg-indigo-50/60 hover:text-indigo-700"><i className={`fa-solid ${icon} w-5 text-center text-indigo-500`} />{label}<i className="fa-solid fa-arrow-right ml-auto text-xs text-slate-300" /></Link>)}</div></section>
  </div></main>;
};
export default Dashboard;
