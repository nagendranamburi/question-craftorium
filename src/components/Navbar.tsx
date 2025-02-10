
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Atom, Search } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Initialize searchQuery from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchQuery(params.get('search') || '');
  }, [location.search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Update URL params
    const params = new URLSearchParams(window.location.search);
    if (query) {
      params.set('search', query);
    } else {
      params.delete('search');
    }
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-neutral-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-1">
            <Link to="/" className="flex flex-col items-start">
              <div className="flex items-center gap-2">
                <Atom className="w-6 h-6 text-primary animate-spin-slow" />
                <span className="font-display text-xl font-bold">
                  <span className="text-primary">React</span>
                  <span className="text-neutral-darker">Prep</span>
                </span>
              </div>
              <span className="text-xs text-neutral-dark font-medium">- A Preparation Guide -</span>
            </Link>
          </div>

          <div className="flex-1 text-center hidden md:block">
            <span className="text-xl font-medium text-neutral-darker">Master Your Web Development Interview</span>
          </div>

          <div className="flex-1 flex justify-end items-center gap-4">
            {/* Search bar */}
            <div className="relative hidden md:block w-64">
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 pl-12 rounded-xl border border-neutral-light focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral" size={20} />
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-neutral-dark hover:text-primary transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-light animate-fadeIn">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="block px-3 py-2 text-center text-neutral-darker">
              Master Your Web Development Interview
            </div>
            {/* Mobile search bar */}
            <div className="relative px-3 py-2">
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 pl-12 rounded-xl border border-neutral-light focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
              />
              <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 text-neutral" size={20} />
            </div>
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-neutral-dark hover:text-primary transition-colors font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
