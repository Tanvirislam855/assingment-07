import { NavLink } from 'react-router-dom';
import { FaHome, FaHistory, FaChartBar } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', path: '/', icon: FaHome },
  { name: 'Timeline', path: '/timeline', icon: FaHistory },
  { name: 'Stats', path: '/stats', icon: FaChartBar },
];

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavLink to="/" className="flex items-center">
          <h2 className='text-3xl font-bold'>Keen<span className='text-3xl font-bold text-green-950'>Keeeper</span></h2>
            {/* <span className="text-2xl font-bold">Keen</span> */}
          </NavLink>
          <nav className="flex space-x-2 sm:space-x-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                         ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}