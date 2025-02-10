
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-neutral-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/6622cfce-5249-418b-8f9d-557d3b82ec2c.png" 
                alt="ReactPrep Logo" 
                className="h-20 w-auto" // Increased height from h-16 to h-20
              />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-neutral-dark hover:text-primary transition-colors font-semibold text-lg">
              Home
            </Link>
            <Link to="/questions" className="text-neutral-dark hover:text-primary transition-colors font-semibold text-lg">
              Questions
            </Link>
            <Link to="/admin" className="text-neutral-dark hover:text-primary transition-colors font-semibold text-lg">
              Admin
            </Link>
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

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-light animate-fadeIn">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-neutral-dark hover:text-primary transition-colors font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/questions"
              className="block px-3 py-2 rounded-md text-neutral-dark hover:text-primary transition-colors font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Questions
            </Link>
            <Link
              to="/admin"
              className="block px-3 py-2 rounded-md text-neutral-dark hover:text-primary transition-colors font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
