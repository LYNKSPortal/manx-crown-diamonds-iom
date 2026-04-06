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

      {/* Full Page Mobile Menu */}
      <div
        className={`fixed inset-0 w-full h-full bg-dark-purple text-white z-[100] transform transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-lg transition-colors z-10"
          aria-label="Close menu"
        >
          <X className="w-8 h-8" />
        </button>

        <nav className="flex flex-col items-center justify-center w-full h-full space-y-8 px-6">
          {navItems.map((item) => {
            const isActive = currentPage === item.href;
            const isContactButton = item.label === 'Contact Us';

            if (isContactButton) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={toggleMenu}
                  className="bg-antique-gold text-white px-8 py-4 rounded-lg hover:bg-opacity-80 transition-all text-center font-semibold text-xl w-full max-w-xs"
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
                className={`text-3xl font-serif hover:text-antique-gold transition-colors ${
                  isActive ? 'text-antique-gold font-bold' : ''
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
