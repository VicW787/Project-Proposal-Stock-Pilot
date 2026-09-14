import { useInventory } from "../context/InventoryContext";

const Dashboard = () => {
  const { totalProducts, totalValue, lowStock, totalSales } =
    useInventory();

  const stats = [
    {
      label: "Total Products",
      value: totalProducts,
      color: "bg-blue-50 text-blue-600",
      border: "border-blue-200",
    },
    {
      label: "Inventory Value",
      value: `$${totalValue.toFixed(2)}`,
      color: "bg-emerald-50 text-emerald-600",
      border: "border-emerald-200",
    },
    {
      label: "Low Stock Items",
      value: lowStock,
      color:
        lowStock > 0
          ? "bg-red-50 text-red-600"
          : "bg-emerald-50 text-emerald-600",
      border: lowStock > 0 ? "border-red-200" : "border-emerald-200",
    },
    {
      label: "Total Sales",
      value: totalSales,
      color: "bg-purple-50 text-purple-600",
      border: "border-purple-200",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-primary">Dashboard</h2>
        <p className="text-slate-500 mt-1">
          Overview of your business inventory
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border ${stat.border}`}
          >
            <p className="text-sm text-slate-500 uppercase tracking-wide font-medium">
              {stat.label}
            </p>
            <p className="text-3xl font-bold text-primary mt-2">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
