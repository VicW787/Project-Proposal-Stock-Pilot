import { useInventory } from '../context/InventoryContext.jsx';

const SalesList = () => {
  const { sales, deleteSale, loading } = useInventory();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-primary mb-4">Recent Sales</h3>

      {sales.length === 0 ? (
        <p className="text-center text-slate-400 py-12">No sales recorded yet</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-100">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600 uppercase tracking-wide">Date</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600 uppercase tracking-wide">Product</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600 uppercase tracking-wide">Qty</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600 uppercase tracking-wide">Total</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600 uppercase tracking-wide">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sales.map(s => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-slate-600">{s.date}</td>
                  <td className="px-4 py-3 font-medium text-primary">{s.productName}</td>
                  <td className="px-4 py-3 text-slate-600">{s.quantity}</td>
                  <td className="px-4 py-3 font-semibold text-accent">${s.total.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => deleteSale(s.id)}
                      className="px-3 py-1 bg-red-50 text-red-600 text-xs rounded-lg hover:bg-red-100 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SalesList;