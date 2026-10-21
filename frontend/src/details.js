import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Details = () => {
  const { customerid } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    fetch(`https://billing-project.onrender.com/customer/${customerid}`, { method: "PUT" })
      .then((response) => response.json()).then(setData).catch(() => setData({}));
  }, [customerid]);
  const fields = [["Email", data.email], ["Mobile", data.mobile], ["City", data.city], ["Pincode", data.pincode], ["Address", data.address]];
  return <main className="app-shell"><div className="mx-auto max-w-2xl px-5 sm:px-8"><Link to="/allcustomer" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"><i className="fa-solid fa-arrow-left mr-2 text-xs" />All customers</Link><div className="mb-6 mt-6"><p className="text-xs font-bold uppercase tracking-[.2em] text-indigo-600">Customer profile</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{data.name || "Customer details"}</h1></div><section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"><dl className="divide-y divide-slate-100">{fields.map(([label, value]) => <div key={label} className="grid gap-1 px-6 py-4 sm:grid-cols-[140px_1fr] sm:gap-5"><dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</dt><dd className="break-words text-sm text-slate-700">{value || "—"}</dd></div>)}</dl></section></div></main>;
};
export default Details;
