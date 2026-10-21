import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import swal from "sweetalert";

const inputClass = "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100";
const NewCustomer = () => {
  const [name, pickName] = useState("");
  const [email, pickEmail] = useState("");
  const [mobile, pickMobile] = useState("");
  const [city, pickCity] = useState("");
  const [pincode, pickPincode] = useState("");
  const [address, pickAddress] = useState("");

  const save = async (event) => {
    event.preventDefault();
    toast("Saving customer…");
    const newdata = { fullname: name, emailid: email, mobileno: mobile, cityname: city, zipcode: pincode, fulladdress: address, tokenno: localStorage.getItem("tokenid") };
    try {
      const response = await fetch("https://billing-project.onrender.com/customer", { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(newdata) }).then((r) => r.json());
      if (response.error === "YES") swal(response.error, "", "warning");
      else { toast(response.message); window.location.href = "#/allcustomer"; }
    } catch { swal("Could not save customer", "Please check your connection and try again.", "error"); }
  };

  return <main className="app-shell"><ToastContainer /><div className="mx-auto max-w-3xl px-5 sm:px-8"><div className="mb-7"><p className="text-xs font-bold uppercase tracking-[.2em] text-indigo-600">Customers</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Add a customer</h1><p className="mt-2 text-sm text-slate-500">Save their contact details to your workspace.</p></div>
    <form onSubmit={save} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8"><h2 className="mb-6 text-base font-semibold text-slate-900">Customer details</h2><div className="grid gap-5 sm:grid-cols-2">
      {[["Name", name, pickName, "Full name", "text"], ["Email", email, pickEmail, "name@company.com", "email"], ["Mobile", mobile, pickMobile, "Phone number", "tel"], ["City", city, pickCity, "City", "text"], ["Pincode", pincode, pickPincode, "Postal code", "text"]].map(([label, value, update, placeholder, type]) => <label key={label} className="block text-sm font-semibold text-slate-700">{label}<input required className={inputClass} type={type} value={value} placeholder={placeholder} onChange={(e) => update(e.target.value)} /></label>)}
      <label className="block text-sm font-semibold text-slate-700 sm:col-span-2">Address<textarea required className={inputClass} rows={3} value={address} placeholder="Street, area, and any helpful details" onChange={(e) => pickAddress(e.target.value)} /></label>
    </div><div className="mt-7 flex justify-end border-t border-slate-100 pt-6"><button type="submit" className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"><i className="fa-solid fa-user-plus mr-2 text-xs" />Save customer</button></div></form>
  </div></main>;
};
export default NewCustomer;
