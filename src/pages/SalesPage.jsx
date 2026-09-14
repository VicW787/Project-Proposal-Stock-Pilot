import SalesForm from '../components/SalesForm.jsx';
import SalesList from '../components/SalesList.jsx';

const SalesPage = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-primary">Sales</h2>
        <p className="text-slate-500 mt-1">Record and track your sales</p>
      </div>
      <SalesForm />
      <SalesList />
    </div>
  );
};

export default SalesPage;