import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Settings } from 'lucide-react';
import { Booking } from '../types';
import Logo from './Logo';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenMyBookings: () => void;
  activePage: string;
  onPageChange: (page: string) => void;
}

export default function Header({ onOpenBooking, onOpenMyBookings, activePage, onPageChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingsCount, setBookingsCount] = useState(0);

  const navItems = [
    { name: 'Home', page: 'home' },
    { name: 'Services', page: 'services' },
    { name: 'Industries', page: 'industries' },
    { name: 'Projects', page: 'projects' },
    { name: 'Careers', page: 'careers' },
    { name: 'FAQ & Insights', page: 'faq' },
    { name: 'Contact', page: 'contact' },
  ];

  const updateBookingsCount = () => {
    try {
      const saved = localStorage.getItem('super_cool_bookings');
      if (saved) {
        const bookings: Booking[] = JSON.parse(saved);
        setBookingsCount(bookings.length);
      } else {
        setBookingsCount(0);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    updateBookingsCount();
    window.addEventListener('storage_updated', updateBookingsCount);
    return () => {
      window.removeEventListener('storage_updated', updateBookingsCount);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onPageChange(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-white/90 backdrop-blur-md border-b border-ice-blue shadow-sm">
      {/* 24/7 HVAC Emergency Service Banner and Profile Downloader */}
      <div className="bg-[#002045] text-white py-2 px-6 border-b border-[#001c3d] text-[10px] sm:text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex-1 w-full overflow-hidden relative flex items-center min-w-0">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0 mr-2" />
            <div className="overflow-hidden w-full relative h-4 flex items-center">
              <div className="animate-marquee font-bold">
                <span className="text-[#F6AD55] tracking-wide">🚨 24/7 EMERGENCY SLA:</span>
                <span className="text-slate-200 font-sans mx-2">
                  Server Room Cooling & HVAC Breakdown priority dispatched NCR. Call{' '}
                  <a href="tel:+919906666452" className="underline font-bold hover:text-[#F6AD55]">
                    +91 99066 66452
                  </a>
                </span>
                <span className="mx-12 text-[#F6AD55] opacity-50">•</span>
                <span className="text-[#F6AD55] tracking-wide">🚨 24/7 EMERGENCY SLA:</span>
                <span className="text-slate-200 font-sans mx-2">
                  Server Room Cooling & HVAC Breakdown priority dispatched NCR. Call{' '}
                  <a href="tel:+919906666452" className="underline font-bold hover:text-[#F6AD55]">
                    +91 99066 66452
                  </a>
                </span>
                <span className="mx-12 text-[#F6AD55] opacity-50">•</span>
                <span className="text-[#F6AD55] tracking-wide">🚨 24/7 EMERGENCY SLA:</span>
                <span className="text-slate-200 font-sans mx-2">
                  Server Room Cooling & HVAC Breakdown priority dispatched NCR. Call{' '}
                  <a href="tel:+919906666452" className="underline font-bold hover:text-[#F6AD55]">
                    +91 99066 66452
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        {/* Brand Logo and Title */}
        <a 
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <Logo size={40} className="group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-extrabold text-[#002045] text-lg sm:text-xl font-sans tracking-tight">
            KD AC | Super Cool Projects
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={`#${item.page}`}
              onClick={(e) => handleNavClick(e, item.page)}
              className={`text-sm font-medium transition-all py-1 border-b-2 hover:text-[#1960a3] ${
                activePage === item.page
                  ? 'text-[#1960a3] border-[#1960a3] font-bold'
                  : 'text-slate-600 border-transparent hover:border-[#1960a3]/50'
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Right Corner Buttons */}
        <div className="flex items-center gap-3">
          {/* My Bookings Tracker */}
          <button
            onClick={onOpenMyBookings}
            className={`relative p-2 rounded-lg border text-slate-700 hover:text-[#1960a3] transition-all hover:bg-slate-50 flex items-center ${
              bookingsCount > 0 
                ? 'border-indigo-120 bg-indigo-50/50 text-[#1960a3]' 
                : 'border-slate-200'
            }`}
            title="View my active AC service appointments"
            id="my-bookings-trigger-btn"
          >
            <Calendar className="w-5 h-5" />
            {bookingsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white font-mono text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow-sm">
                {bookingsCount}
              </span>
            )}
          </button>

          <button 
            onClick={onOpenBooking}
            className="hidden sm:inline-block bg-[#002045] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#1a365d] active:scale-95 transition-all cursor-pointer"
            id="nav-get-estimate-btn"
          >
            Get Estimate
          </button>

          {/* Mobile Menu Icon Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden text-primary rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle-btn"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-lg px-6 py-4 space-y-4 shadow-xl">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={`#${item.page}`}
                onClick={(e) => handleNavClick(e, item.page)}
                className={`text-base font-semibold py-2 px-3 rounded-lg transition-all ${
                  activePage === item.page
                    ? 'text-[#1960a3] bg-ice-blue/20'
                    : 'text-slate-700 hover:text-[#1960a3] hover:bg-slate-50'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMyBookings();
              }}
              className="w-full py-2.5 border border-slate-200 rounded-lg text-slate-700 font-bold text-sm bg-slate-50 hover:bg-slate-100 text-center flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-slate-500" />
              Manage Bookings ({bookingsCount})
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 bg-[#002045] text-white rounded-lg font-bold text-sm hover:bg-[#1a365d] text-center"
            >
              Get Free Estimate
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
