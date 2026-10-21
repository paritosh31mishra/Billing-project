import { useCallback, useEffect, useState } from "react";

const API = "https://billing-project.onrender.com";
const inputClass = "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100";
const Mybilling = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [bills, setBills] = useState([]);
  const [saving, setSaving] = useState(false);
  const loadBills = useCallback(() => fetch(`${API}/billing`).then((r) => r.json()).then((data) => setBills(Array.isArray(data) ? data.reverse() : [])).catch(() => setBills([])), []);
  const loadProducts = useCallback(() => fetch(`${API}/product`).then((r) => r.json()).then((data) => setProducts(Array.isArray(data) ? data.filter((item) => Number(item.qty) > 0) : [])).catch(() => setProducts([])), []);

  useEffect(() => {
    fetch(`${API}/customer/${localStorage.getItem("tokenid")}`).then((r) => r.json()).then((customerData) => {
      setCustomers(Array.isArray(customerData) ? customerData : []);
    }).catch(() => {});
    loadBills();
    loadProducts();
  }, [loadBills, loadProducts]);

  const customer = customers.find((item) => item._id === customerId);
  const product = products.find((item) => item._id === productId);
  const unitPrice = Number(product?.price || 0);
  const total = unitPrice * Number(quantity || 0);
  const saveBill = async () => {
    if (!customer || !product || !Number.isInteger(Number(quantity)) || Number(quantity) < 1 || Number(quantity) > product.qty) { window.alert("Choose a customer and an available product, then enter a quantity within available stock."); return; }
    setSaving(true);
    let billCreated = false;
    const bill = { productId: product._id, fullname: customer.name, email: customer.email, mobile: customer.mobile, city: customer.city, pincode: customer.pincode, address: customer.address, product: product.name, quantity: Number(quantity), price: unitPrice, total };
    try {
      const result = await fetch(`${API}/billing`, { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(bill) });
      const response = await result.json();
      if (!result.ok || response.error === "YES") {
        window.alert(response.message || "Could not generate the bill.");
        return;
      }
      billCreated = true;

      // If the deployed billing endpoint already returns a stock count, it has
      // applied the inventory change itself. Otherwise update/delete via Product API.
      const inventoryHandledByBillingApi = Number.isFinite(Number(response.remainingQty));
      const remainingQty = inventoryHandledByBillingApi
        ? Number(response.remainingQty)
        : Number(product.qty) - Number(quantity);
      if (!inventoryHandledByBillingApi) {
        const inventoryResponse = remainingQty > 0
          ? await fetch(`${API}/product/${product._id}`, {
              headers: { "Content-Type": "application/json" },
              method: "PUT",
              body: JSON.stringify({ name: product.name, price: product.price, qty: remainingQty, details: product.details }),
            })
          : await fetch(`${API}/product/${product._id}`, { method: "DELETE" });
        const inventoryResult = await inventoryResponse.json();
        if (!inventoryResponse.ok || inventoryResult.error === "YES" || /not exist/i.test(inventoryResult.message || "")) {
          throw new Error(inventoryResult.message || "The inventory update was rejected.");
        }
      }

      if (remainingQty === 0) {
        setProducts((current) => current.filter((item) => item._id !== product._id));
        setProductId("");
        setQuantity(1);
      } else {
        setProducts((current) => current.map((item) => item._id === product._id ? { ...item, qty: remainingQty } : item));
        setQuantity((current) => Math.min(Number(current), remainingQty));
      }
      window.alert("Bill generated and inventory updated.");
      await Promise.all([loadBills(), loadProducts()]);
    } catch (error) {
      await Promise.all([loadBills(), loadProducts()]);
      window.alert(billCreated
        ? `The bill was generated, but inventory could not be updated: ${error.message}`
        : `Could not generate the bill: ${error.message}`);
    }
    finally { setSaving(false); }
  };
  const columns = ["Customer", "Email", "Mobile", "City", "Product", "Price", "Qty", "Total"];
  return <main className="app-shell"><div className="mx-auto max-w-[1400px] px-5 sm:px-8"><div className="mb-7"><p className="text-xs font-bold uppercase tracking-[.2em] text-indigo-600">Billing</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Create an invoice</h1><p className="mt-2 text-sm text-slate-500">Choose a customer and a product to generate a bill.</p></div>
    <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8"><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"><label className="block text-sm font-semibold text-slate-700">Customer<select className={inputClass} value={customerId} onChange={(e) => setCustomerId(e.target.value)}><option value="">Select a customer</option>{customers.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}</select></label><label className="block text-sm font-semibold text-slate-700">Available product<select className={inputClass} value={productId} onChange={(e) => { setProductId(e.target.value); setQuantity(1); }}><option value="">{products.length ? "Select a product" : "No products in stock"}</option>{products.map((item) => <option key={item._id} value={item._id}>{item.name} · {item.qty} available</option>)}</select></label><label className="block text-sm font-semibold text-slate-700">Quantity{product && <span className="ml-1 font-normal text-slate-400">(up to {product.qty})</span>}<input min="1" max={product?.qty || 1} disabled={!product} type="number" className={`${inputClass} disabled:cursor-not-allowed disabled:opacity-50`} value={quantity} onChange={(e) => { const value = e.target.value; setQuantity(value === "" ? "" : Math.min(Number(value), product?.qty || 1)); }} /></label><div className="flex flex-col justify-end"><p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Unit price</p><p className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">₹{unitPrice.toLocaleString("en-IN")}</p></div></div>
      <div className="mt-7 flex flex-col justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center"><div><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Invoice total</p><p className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">₹{total.toLocaleString("en-IN")}</p></div><button disabled={saving || !product || !customer} onClick={saveBill} className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"><i className="fa-solid fa-file-invoice-dollar mr-2 text-xs" />{saving ? "Generating…" : "Generate bill"}</button></div>
    </section>
    <section className="mt-8"><div className="mb-4 flex items-end justify-between"><div><h2 className="text-lg font-semibold text-slate-900">Recent bills</h2><p className="mt-1 text-sm text-slate-500">Your latest generated invoices.</p></div><span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">{bills.length} total</span></div><div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"><div className="overflow-x-auto"><table className="min-w-full divide-y divide-slate-100 text-left"><thead className="bg-slate-50/80"><tr>{columns.map((title) => <th key={title} className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{bills.map((bill, index) => <tr key={bill._id || index} className="hover:bg-slate-50/70"><td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-800">{bill.name || bill.fullname}</td><td className="px-5 py-4 text-sm text-slate-500">{bill.email}</td><td className="px-5 py-4 text-sm text-slate-500">{bill.mobile}</td><td className="px-5 py-4 text-sm text-slate-500">{bill.city}</td><td className="px-5 py-4 text-sm text-slate-700">{bill.product}</td><td className="px-5 py-4 text-sm text-slate-500">₹{bill.price}</td><td className="px-5 py-4 text-sm text-slate-500">{bill.quantity}</td><td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-800">₹{bill.total}</td></tr>)}</tbody></table></div>{bills.length === 0 && <p className="px-5 py-12 text-center text-sm text-slate-500">No bills generated yet.</p>}</div></section>
  </div></main>;
};
export default Mybilling;
