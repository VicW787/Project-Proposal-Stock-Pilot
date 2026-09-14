import { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import ProductForm from './ProductForm';

const ProductList = () => {
  const { products, updateProduct, deleteProduct} = useInventory();
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.category && p.category.toLowerCase().includes(search.toLowerCase()))
  );

  const startEdit = (p) => {
    setEditingId(p.id);
    setEditForm({
      name: p.name,
      price: p.price,
      quantity: p.quantity,
      category: p.category || ''
    });
  };

  const handleEdit = (id) => {
    updateProduct(id, editForm);
    setEditingId(null);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-primary">Products</h2>
        <p className="text-slate-500 mt-1">Manage your inventory items</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search products by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          <ProductForm />
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-100">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600 uppercase tracking-wide">Name</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600 uppercase tracking-wide">Category</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600 uppercase tracking-wide">Price</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600 uppercase tracking-wide">Quantity</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600 uppercase tracking-wide">Status</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-slate-400">
                    No products found
                  </td>
                </tr>
              )}
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    {editingId === p.id ? (
                      <input
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-2 py-1 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    ) : (
                      <span className="font-medium text-primary">{p.name}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {editingId === p.id ? (
                      <input
                        value={editForm.category}
                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        className="w-full px-2 py-1 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    ) : (
                      p.category || '—'
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {editingId === p.id ? (
                      <input
                        type="number"
                        step="0.01"
                        value={editForm.price}
                        onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                        className="w-24 px-2 py-1 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    ) : (
                      `$${p.price.toFixed(2)}`
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {editingId === p.id ? (
                      <input
                        type="number"
                        value={editForm.quantity}
                        onChange={(e) => setEditForm({ ...editForm, quantity: e.target.value })}
                        className="w-20 px-2 py-1 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    ) : (
                      p.quantity
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      p.quantity < 10
                        ? 'bg-red-50 text-red-600'
                        : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {p.quantity < 10 ? 'Low' : 'In Stock'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {editingId === p.id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(p.id)}
                          className="px-3 py-1 bg-primary text-white text-xs rounded-lg hover:bg-secondary transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-lg hover:bg-slate-200 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(p)}
                          className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="px-3 py-1 bg-red-50 text-red-600 text-xs rounded-lg hover:bg-red-100 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;