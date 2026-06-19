import React from 'react';
import { Mail, MapPin, Phone, ShieldCheck, Clock, Heart } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-primary text-white pt-16 pb-8 border-t border-slate-800" id="footer">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/10 pb-12 mb-8">
        
        {/* Column 1: Brand Info (col-span-4) */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2">
            <Logo size={36} />
            <span className="font-extrabold text-white text-lg tracking-tight font-sans">
              KD AC | Super Cool Projects
            </span>
          </div>
          <p className="text-ice-blue/80 text-xs sm:text-sm leading-relaxed max-w-sm">
            Professional air conditioning installation, deep chemical cleaning, and annual maintenance agreements. We serve homes, shops, and clinics across Gurugram with rapid turnaround speeds.
          </p>

          <div className="pt-2 flex items-center gap-2 text-xs text-cta-accent font-medium bg-white/5 p-3 rounded-lg border border-white/10 max-w-xs">
            <ShieldCheck className="w-5 h-5 text-cta-accent shrink-0" />
            <span>Certified ISO 9001:2015 HVAC Diagnostics</span>
          </div>
        </div>

        {/* Column 2: Cooling services (col-span-3) */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-white font-extrabold text-sm sm:text-base font-sans uppercase tracking-widest text-[#BEE3F8]">
            Cooling Specialists
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-ice-blue/80 font-sans">
            <li className="hover:text-cta-accent transition-colors"><a href="#services">Home AC Care</a></li>
            <li className="hover:text-cta-accent transition-colors"><a href="#services">Office AC Support</a></li>
            <li className="hover:text-cta-accent transition-colors"><a href="#services">MSME AMC Contracts</a></li>
            <li className="hover:text-cta-accent transition-colors"><a href="#contact">Emergency Repairs</a></li>
            <li className="hover:text-cta-accent transition-colors"><a href="#why-choose-us">Air Quality Cleanings</a></li>
          </ul>
        </div>

        {/* Column 3: Contacts & Location (col-span-3) */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-white font-extrabold text-sm sm:text-base font-sans uppercase tracking-widest text-[#BEE3F8]">
            Contact & Location
          </h4>
          <ul className="space-y-3 text-xs sm:text-sm text-ice-blue/80 font-sans">
            <li className="flex items-center gap-2 group">
              <Phone className="w-4 h-4 text-cta-accent shrink-0" />
              <a href="tel:+919906666452" className="group-hover:text-cta-accent transition-colors">
                +91 99066 66452
              </a>
            </li>
            <li className="flex items-center gap-2 group">
              <Mail className="w-4 h-4 text-cta-accent shrink-0" />
              <a href="mailto:book@supercool.in" className="group-hover:text-cta-accent transition-colors">
                book@supercool.in
              </a>
            </li>
            <li className="flex items-start gap-2 group">
              <MapPin className="w-4 h-4 text-cta-accent shrink-0 mt-0.5" />
              <a 
                href="https://maps.google.com/?q=Sector+49,+Sohna+Road,+Gurugram" 
                target="_blank" 
                rel="noreferrer"
                className="group-hover:text-cta-accent transition-colors hover:underline"
              >
                G-14, Sector 49, Sohna Road, Gurugram, Haryana - 122018
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Operating Hours (col-span-2) */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="text-white font-extrabold text-sm sm:text-base font-sans uppercase tracking-widest text-[#BEE3F8]">
            Operating Hours
          </h4>
          <div className="space-y-3.5 text-xs sm:text-sm text-ice-blue/80 font-sans">
            <div className="flex gap-2">
              <Clock className="w-4 h-4 text-cta-accent shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Mon - Sat</p>
                <p className="text-[11px] opacity-90">8:00 AM - 8:00 PM</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Clock className="w-4 h-4 text-cta-accent shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Sunday Emergencies</p>
                <p className="text-[11px] opacity-90">9:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Under copyright credentials and back to top actions */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-ice-blue/60 font-sans">
        <p className="text-center sm:text-left">
          © {currentYear} KD AC | Super Cool Projects. All trademark, copyrights and design patents reserved.
        </p>

        <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/5">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-[#F6AD55] fill-[#F6AD55]" />
          <span>for climate comfort in Gurugram</span>
        </div>

        <button 
          onClick={handleScrollToTop}
          className="text-white bg-white/10 px-4 py-1.5 rounded-lg text-[11px] font-bold hover:bg-white/20 hover:text-cta-accent transition-all cursor-pointer"
        >
          Scroll to Top ↑
        </button>
      </div>
    </footer>
  );
}
