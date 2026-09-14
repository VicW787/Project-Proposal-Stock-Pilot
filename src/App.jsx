import { Routes, Route } from 'react-router';
import { InventoryProvider } from './context/InventoryContext';
import Layout from './components/Layout.jsx';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import SalesPage from './pages/SalesPage';

const App = () => {
  return (
    <InventoryProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/sales" element={<SalesPage />} />
        </Routes>
      </Layout>
    </InventoryProvider>
  );
};

export default App;