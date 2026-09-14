import { useState } from 'react';
import { useInventory } from '../context/InventoryContext.jsx';

const SalesForm = () => {
  const { products, recordSale } = useInventory();
  const [form, setForm] = useState({ productId: '', quantity: 1 });

  const selected = products.find(p => p.id === parseInt(form.productId));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.productId) return alert('Select a product');
    recordSale(form);
    setForm({ productId: '', quantity: 1 });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <h3 className="text-lg font-bold text-primary mb-4">Record New Sale</h3>
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-slate-600 mb-1.5">
            Product
          </label>
          <select
            value={form.productId}
            onChange={(e) => setForm({ ...form, productId: e.target.value })}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
            required
          >
            <option value="">Select product...</option>
            {products.map(p => (
              <option key={p.id} value={p.id} disabled={p.quantity === 0}>
                {p.name} (Stock: {p.quantity}){p.quantity === 0 ? ' - Out of Stock' : ''}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full lg:w-40">
          <label className="block text-sm font-medium text-slate-600 mb-1.5">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            max={selected?.quantity || 999}
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) || 1 })}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            required
          />
          {selected && (
            <p className="text-xs text-slate-500 mt-1">Available: {selected.quantity}</p>
          )}
        </div>

        {selected && (
          <div className="px-5 py-2.5 bg-slate-100 rounded-lg font-bold text-primary whitespace-nowrap">
            Total: ${(selected.price * form.quantity).toFixed(2)}
          </div>
        )}

        <button
          type="submit"
          className="bg-accent text-white px-8 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
        >
          Record Sale
        </button>
      </form>
    </div>
  );
};

export default SalesForm;