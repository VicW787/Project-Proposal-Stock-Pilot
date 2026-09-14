import Navbar from './Navbar.jsx';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {children}
      </main>
      <footer className="bg-primary text-slate-400 text-center py-4">
        <p className="text-sm">Stock Pilot &copy; 2026 - Small Business Inventory System</p>
      </footer>
    </div>
  );
};

export default Layout;