'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface MobileMenuProps {
  currentPage?: string;
}

export default function MobileMenu({ currentPage }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/sourcing', label: 'Sourcing' },
    { href: '/gift-cards', label: 'Gift Cards' },
    { href: '/contact', label: 'Contact Us' },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-dark-purple text-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-6">
          <button
            onClick={toggleMenu}
            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col px-6 space-y-4">
          {navItems.map((item) => {
            const isActive = currentPage === item.href;
            const isContactButton = item.label === 'Contact Us';

            if (isContactButton) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={toggleMenu}
                  className="bg-antique-gold text-white px-6 py-3 rounded-lg hover:bg-opacity-80 transition-all text-center font-semibold"
                >
                  {item.label}
                </a>
              );
            }

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={toggleMenu}
                className={`text-lg py-2 hover:text-antique-gold transition-colors ${
                  isActive ? 'text-antique-gold font-semibold' : ''
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
}
