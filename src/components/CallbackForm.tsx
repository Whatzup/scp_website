import React, { useState } from 'react';
import { Phone, MessageSquare, Loader2, CheckCircle2, RefreshCw } from 'lucide-react';
import { CallbackRequest } from '../types';

export default function CallbackForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || phone.length !== 10) return;

    setLoading(true);

    // Simulate database write
    setTimeout(() => {
      const generatedId = 'CB-' + Math.floor(1000 + Math.random() * 9000);
      const newRequest: CallbackRequest = {
        id: generatedId,
        name,
        phone: `+91 ${phone}`,
        status: 'Pending',
        createdAt: new Date().toISOString()
      };

      try {
        const existing = JSON.parse(localStorage.getItem('super_cool_callbacks') || '[]');
        localStorage.setItem('super_cool_callbacks', JSON.stringify([newRequest, ...existing]));
      } catch (error) {
        console.error(error);
      }

      setTicketId(generatedId);
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setSuccess(false);
    setTicketId('');
  };

  return (
    <section className="pb-20 pt-8 bg-[#f7fafc]" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-ice-blue/20 rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 md:p-16 border border-ice-blue overflow-hidden relative">
          
          {/* Circular gradient backdrop decorations */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-cta-accent/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#1960a3]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center relative z-10">
            
            {/* Left Column: Direct Call details */}
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-primary font-sans leading-tight">
                Need expert help? Request a callback
              </h2>
              
              <p className="text-slate-600 text-sm sm:text-lg leading-relaxed max-w-md">
                Our local service coordinators are ready to help you schedule a visits within the next hour. No waiting, just rapid cooling relief.
              </p>

              <div className="space-y-4 pt-2">
                
                {/* Directly Calling Action */}
                <a 
                  href="tel:+919906666452"
                  className="flex items-center gap-4 p-3 rounded-xl border border-dashed border-ice-blue bg-white/50 hover:bg-white transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#002045] flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-sans">
                      CALL US DIRECTLY
                    </p>
                    <p className="font-sans font-extrabold text-lg sm:text-xl text-primary leading-none mt-1">
                      +91 99066 66452
                    </p>
                  </div>
                </a>

                {/* WhatsApp Chat Action */}
                <a 
                  href="https://wa.me/919906666452"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-3 rounded-xl border border-dashed border-[#38B2AC]/45 bg-[#38B2AC]/5 hover:bg-[#38B2AC]/10 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-success-teal flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-5 h-5 text-white fill-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#38B2AC] uppercase tracking-wider font-sans">
                      WHATSAPP US
                    </p>
                    <p className="font-sans font-extrabold text-lg sm:text-xl text-primary leading-none mt-1 flex items-center gap-1.5">
                      Chat Now <span className="text-xs font-semibold text-[#38B2AC] bg-[#38B2AC]/10 px-2 py-0.5 rounded-full">Online</span>
                    </p>
                  </div>
                </a>
                
              </div>
            </div>

            {/* Right Column: Callback form card */}
            <div className="bg-white p-6 sm:p-10 rounded-2.5xl soft-depth border border-ice-blue">
              {!success ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-[10px] font-bold text-[#002045] tracking-widest uppercase mb-2 font-sans">
                      YOUR FULL NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-ice-blue focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all outline-none text-sm text-slate-800 placeholder:text-slate-400 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#002045] tracking-widest uppercase mb-2 font-sans">
                      PHONE NUMBER
                    </label>
                    <div className="flex rounded-xl overflow-hidden border border-ice-blue focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/15 transition-all">
                      <span className="inline-flex items-center px-4 bg-slate-50 border-r border-ice-blue text-[#002045] font-bold text-sm select-none font-sans">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="Mobile number"
                        className="w-full px-4 py-3 bg-slate-50 outline-none text-sm text-slate-800 placeholder:text-slate-400 font-sans"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#0F172A] text-white py-4 rounded-xl font-bold text-sm sm:text-base hover:bg-primary transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    id="submit-callback-btn"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                        Generating Callback Code...
                      </>
                    ) : (
                      'Send Request'
                    )}
                  </button>

                  <p className="text-center text-[10px] text-slate-500 font-medium leading-relaxed font-sans">
                    By clicking send, you agree to our privacy policy and terms of service. We never share your data.
                  </p>
                </form>
              ) : (
                <div className="p-4 sm:p-6 text-center space-y-6">
                  <div className="mx-auto w-12 h-12 bg-[#38B2AC]/15 rounded-full flex items-center justify-center text-[#38B2AC]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-lg font-extrabold text-primary font-sans leading-none">
                      Request Registered!
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans max-w-xs mx-auto">
                      Hello <span className="font-bold text-[#002045]">{name}</span>, your calling coordinator is dialing your number <span className="font-semibold text-slate-700 font-mono">+91 {phone}</span> within approximately 5 minutes.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-dashed border-ice-blue p-3.5 rounded-lg text-left text-xs font-mono max-w-xs mx-auto space-y-1">
                    <div className="flex justify-between items-center text-slate-500 font-sans">
                      <span>TICKET STATUS:</span>
                      <span className="text-[#38B2AC] font-bold">DISPATCH QUEUED</span>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span>TICKET ID:</span>
                      <span className="font-bold text-[#002045]">{ticketId}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleReset}
                    className="mt-2 text-xs font-bold text-[#1960a3] hover:underline flex items-center gap-1 mx-auto cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Request another call
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
