import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Phone, Check, RefreshCw, Trash2, ShieldAlert } from 'lucide-react';
import { Booking } from '../types';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNewBookingClick: () => void;
}

export default function MyBookingsModal({ isOpen, onClose, onNewBookingClick }: MyBookingsModalProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const loadBookings = () => {
    try {
      const saved = localStorage.getItem('super_cool_bookings');
      if (saved) {
        setBookings(JSON.parse(saved));
      } else {
        setBookings([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadBookings();
    }
  }, [isOpen]);

  // Listener for general storage changes
  useEffect(() => {
    window.addEventListener('storage_updated', loadBookings);
    return () => {
      window.removeEventListener('storage_updated', loadBookings);
    };
  }, []);

  const handleCancelBooking = (id: string) => {
    if (confirm('Are you sure you want to cancel this AC service appointment?')) {
      const updated = bookings.filter(b => b.id !== id);
      localStorage.setItem('super_cool_bookings', JSON.stringify(updated));
      setBookings(updated);
      window.dispatchEvent(new Event('storage_updated'));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-deep-navy/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl overflow-hidden high-depth relative border border-ice-blue">
        {/* Header */}
        <div className="bg-primary text-white p-6 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold font-sans">My Service Appointments</h3>
            <p className="text-sm text-ice-blue opacity-85">Manage your cooling engineer allocations</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-white transition-colors"
            id="close-mybookings-modal-btn"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* List of active bookings */}
        <div className="p-6 max-h-[450px] overflow-y-auto space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="mx-auto w-12 h-12 bg-ice-blue/20 flex items-center justify-center text-primary rounded-full">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-slate-800 text-lg">No Active Bookings</p>
                <p className="text-sm text-slate-500 max-w-sm mx-auto">
                  You do not have any pending cooling engineer bookings at this time.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onNewBookingClick();
                }}
                className="mt-2 px-6 py-2.5 bg-cta-accent text-primary font-bold text-sm rounded-lg hover:brightness-105 active:scale-95 transition-all"
                id="book-first-service-inside-modal-btn"
              >
                Schedule First Service
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                Active Bookings ({bookings.length})
              </p>
              {bookings.map((booking) => (
                <div 
                  key={booking.id}
                  className="p-4 rounded-xl border border-ice-blue bg-slate-50 relative flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-secondary transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary font-mono text-sm">
                        {booking.id}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#38B2AC]/15 text-[#38B2AC] flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        {booking.status}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-800 font-sans text-base">
                      {booking.serviceType}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-slate-500 font-sans">
                      <div>
                        <span className="font-medium text-slate-400">Date:</span> {booking.preferredDate}
                      </div>
                      <div>
                        <span className="font-medium text-slate-400">Slot:</span> {booking.preferredTime.split(' ')[0]}
                      </div>
                      <div>
                        <span className="font-medium text-slate-400">Contact:</span> {booking.name} ({booking.phone})
                      </div>
                    </div>
                    {booking.notes && (
                      <p className="text-xs italic bg-white border border-slate-100 p-2 rounded text-slate-500 mt-1 max-w-md">
                        "{booking.notes}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200">
                    <div className="text-right hidden lg:block mr-2">
                      <p className="text-[11px] text-slate-400">Technician Assigned</p>
                      <p className="text-xs font-semibold text-[#002045]">Kuldeep S. (Certified ID: 418)</p>
                    </div>
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      className="p-2 border border-red-200 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-1 text-xs font-bold w-full sm:w-auto"
                      title="Cancel Booking"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="sm:hidden">Cancel Visit</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex justify-between items-center px-6">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <ShieldAlert className="w-4 h-4 text-secondary shrink-0" />
            <span>Need to reschedule within 2 hours? Calling is recommended.</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 hover:bg-slate-200 rounded-lg text-slate-700 font-bold text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
