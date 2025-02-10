
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Atom } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <span className="text-lg font-medium text-neutral-darker">Master Your Web Development Interview</span>
          </div>

          <div className="flex-1 flex justify-end">
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
