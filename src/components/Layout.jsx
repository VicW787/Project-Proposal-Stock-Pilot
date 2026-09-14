import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center bg-fixed"
     style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/DollarNoteBackgroundImage.jpg')" }}>
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