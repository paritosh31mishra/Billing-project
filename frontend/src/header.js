import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  ["/", "Overview", "fa-chart-pie"],
  ["/allcustomer", "Customers", "fa-users"],
  ["/addcustomer", "Add customer", "fa-user-plus"],
  ["/productlist", "Products", "fa-box"],
  ["/addproduct", "Add product", "fa-circle-plus"],
  ["/billing", "Billing", "fa-receipt"],
];

const ProjectHeader = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-3.5 sm:px-8">
        <button onClick={() => navigate("/")} className="flex items-center gap-3 text-left">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"><i className="fa-solid fa-layer-group" /></span>
          <span><span className="block text-sm font-bold tracking-tight text-slate-900">BillingFlow</span><span className="block text-[10px] font-medium uppercase tracking-[.16em] text-slate-400">Business workspace</span></span>
        </button>
        <nav className="order-3 flex w-full items-center gap-1 overflow-x-auto pb-0.5 md:order-2 md:w-auto" aria-label="Main navigation">
          {navItems.map(([to, label, icon]) => <NavLink key={to} end={to === "/"} to={to} className={({ isActive }) => `flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${isActive ? "bg-indigo-50 text-indigo-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}><i className={`fa-solid ${icon} text-[11px]`} />{label}</NavLink>)}
        </nav>
        <div className="order-2 flex items-center gap-3 md:order-3">
          <div className="hidden text-right sm:block"><p className="text-xs font-semibold text-slate-800">{localStorage.getItem("myname") || "Workspace user"}</p><p className="text-[10px] text-slate-400">Administrator</p></div>
          <button onClick={logout} title="Sign out" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"><i className="fa-solid fa-arrow-right-from-bracket text-xs" /></button>
        </div>
      </div>
    </header>
  );
};

export default ProjectHeader;
