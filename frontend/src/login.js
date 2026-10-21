import { useState } from "react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const loginCheck = async (event) => {
    event.preventDefault();
    if (!email.trim() || !password) {
      setMessage("Enter your email and password to continue.");
      return;
    }

    setLoading(true);
    setMessage("Connecting to your workspace…");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 90000);
    try {
      const response = await fetch("https://billing-project.onrender.com/auth", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ email: email.trim(), password }),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("The sign-in service returned an error. Please try again.");
      const user = await response.json();
      if (user.status !== "SUCCESS") {
        setMessage("That email and password didn’t match. Please try again.");
        return;
      }
      localStorage.setItem("tokenid", user.token);
      localStorage.setItem("myname", user.fullname);
      localStorage.setItem("myrole", user.role);
      onLogin();
    } catch (error) {
      setMessage(error.name === "AbortError"
        ? "The service is taking longer than expected. Please try again in a moment."
        : "We couldn’t reach the sign-in service. Check your connection and try again.");
    } finally {
      window.clearTimeout(timeout);
      setLoading(false);
    }
  };

  return (
    <main className="fullpage flex items-center justify-center bg-slate-950 px-4 py-8 sm:px-8">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-indigo-950/25 lg:min-h-[650px] lg:grid-cols-2">
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-700 to-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[1px] border-white/10" />
          <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full border-[1px] border-white/10" />
          <div className="relative flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-xl"><i className="fa-solid fa-layer-group" /></span>
            <span className="text-sm font-bold tracking-wide">BILLING<span className="text-indigo-200">FLOW</span></span>
          </div>
          <div className="relative max-w-md">
            <p className="mb-5 text-xs font-bold uppercase tracking-[.25em] text-indigo-200">A clearer way to work</p>
            <h1 className="text-5xl font-semibold leading-[1.12] tracking-tight">Your business, beautifully in balance.</h1>
            <p className="mt-6 text-base leading-7 text-indigo-100/80">Bring customers, products and billing together in one calm, focused workspace.</p>
            <div className="mt-10 flex items-center gap-3 text-sm text-white/75"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-200"><i className="fa-solid fa-check" /></span> Everything you need, all in one place</div>
          </div>
          <p className="relative text-xs text-white/50">© 2026 Infocampus Logics</p>
        </section>

        <section className="flex items-center justify-center px-6 py-12 sm:px-12 lg:px-16">
          <div className="w-full max-w-md">
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white"><i className="fa-solid fa-layer-group" /></span>
              <span className="text-sm font-bold tracking-wide">BILLING<span className="text-indigo-600">FLOW</span></span>
            </div>
            <div className="mb-9">
              <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-indigo-600">Welcome back</p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Sign in to your account</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">Manage your customers and billing from one place.</p>
            </div>
            <form onSubmit={loginCheck} className="space-y-5">
              <label className="block text-sm font-semibold text-slate-700">Email address
                <span className="relative mt-2 block"><i className="fa-regular fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input autoComplete="username" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100" /></span>
              </label>
              <label className="block text-sm font-semibold text-slate-700">Password
                <span className="relative mt-2 block"><i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input autoComplete="current-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100" /></span>
              </label>
              {message && <p role="status" aria-live="polite" className={`rounded-xl px-4 py-3 text-sm leading-5 ${loading ? "bg-indigo-50 text-indigo-700" : "bg-amber-50 text-amber-800"}`}>{loading && <i className="fa-solid fa-circle-notch mr-2 animate-spin" />}{message}</p>}
              <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-wait disabled:opacity-70">{loading ? "Connecting…" : "Sign in"}<i className="fa-solid fa-arrow-right text-xs" /></button>
            </form>
            <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50/70 px-4 py-3.5">
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-700">Demo login</p>
              <p className="mt-2 text-sm text-slate-600">Email: <span className="font-semibold text-slate-800">admin@gmail.com</span></p>
              <p className="mt-1 text-sm text-slate-600">Password: <span className="font-semibold text-slate-800">123</span></p>
            </div>
            <div className="mt-8 border-t border-slate-100 pt-6"><p className="text-center text-xs leading-5 text-slate-400"><i className="fa-solid fa-shield-halved mr-1.5" />Your workspace is protected and secure</p></div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
