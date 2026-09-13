import { NavLink } from 'react-router';

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
      isActive
        ? 'bg-secondary text-white'
        : 'text-slate-300 hover:bg-white/5 hover:text-white'
    }`;

  return (
    <nav className="bg-primary shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 flex-wrap">
          <div className="flex items-center gap-2">
            <h1 className="text-white text-xl font-bold">Stock Pilot</h1>
          </div>
          <div className="flex gap-2">
            <NavLink to="/" className={linkClass} end>Dashboard</NavLink>
            <NavLink to="/products" className={linkClass}>Products</NavLink>
            <NavLink to="/sales" className={linkClass}>Sales</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;