import SalesForm from '../components/SalesForm.jsx';
import SalesList from '../components/SalesList.jsx';

const SalesPage = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white drop-shadow-lg">Sales</h2>
        <p className="text-slate-200 mt-1 drop-shadow-md">Record and track your sales</p>
      </div>
      <SalesForm />
      <SalesList />
    </div>
  );
};

export default SalesPage;