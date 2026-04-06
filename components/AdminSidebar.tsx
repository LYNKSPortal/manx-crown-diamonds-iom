'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, Upload, Settings, LayoutDashboard, LogOut } from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <div className={`
      flex h-screen w-64 flex-col bg-dark-purple
      fixed lg:relative z-40
      transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      {/* Logo */}
      <div className="flex h-20 items-center justify-center border-b border-white border-opacity-10 px-6">
        <img 
          src="/images/white-logo.png" 
          alt="Manx Crown Diamonds" 
          className="h-12"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-6">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`
                flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all
                ${active 
                  ? 'bg-antique-gold text-dark-purple shadow-lg' 
                  : 'text-white hover:bg-white hover:bg-opacity-10'
                }
              `}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-white border-opacity-10 p-3">
        <form action="/api/admin/logout" method="POST">
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white hover:bg-white hover:bg-opacity-10 transition-all"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
