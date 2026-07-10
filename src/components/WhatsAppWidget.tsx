import React, { useState } from 'react';
import { X, MessageSquare, AlertTriangle, Calendar, Clipboard, HelpCircle, PhoneCall } from 'lucide-react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // preloaded messages formatted for WhatsApp link queries
  const phoneNumber = '919906666452'; // Diligent correct regional helpline number

  const presets = [
    {
      id: 'quote',
      label: '💬 Request Quote',
      text: 'Hello KD AC | Super Cool Projects! I would like to request a customized HVAC design and installation quote for my business building. Please share details regarding timeflows.',
      color: 'hover:bg-blue-50 border-slate-200'
    },
    {
      id: 'survey',
      label: '📅 Schedule Survey',
      text: 'Hello! I want to schedule a free site survey for ducting and VRV layouts at my facility address. Let me know available time intervals.',
      color: 'hover:bg-teal-50 border-slate-200'
    },
    {
      id: 'amc',
      label: '🛠️ AMC Inquiry',
      text: 'Hello KD AC | Super Cool Projects Team. I am interested in establishing an Annual Maintenance Contract for my offices to guarantee 0% cooling downtime. What are the tier plans?',
      color: 'hover:bg-indigo-50 border-slate-200'
    },
    {
      id: 'emergency',
      label: '🚨 Emergency Service',
      text: 'Hello! URGENT help needed. Our critical cooling has failed. Please dispatch a certified technician to our registered location immediately.',
      color: 'bg-red-50 hover:bg-red-100 border-red-200 text-red-750 font-bold'
    }
  ];

  const handlePresetClick = (msgText: string) => {
    setIsOpen(false);
    const encodedText = encodeURIComponent(msgText);
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    window.open(waUrl, '_blank', 'referrerPolicy=no-referrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      {/* Expanded Actions Popover Card */}
      {isOpen && (
        <div className="mb-4 bg-white rounded-2xl overflow-hidden shadow-2xl border border-emerald-100 max-w-[320px] w-full relative animate-pulse-slow font-sans text-slate-800">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-4 flex gap-3 items-center">
            {/* Pulsing Avatar element */}
            <div className="relative shrink-0">
              <span className="absolute inset-0 bg-white/20 rounded-full animate-ping"></span>
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1bdrsyP3qNjg4AJHWv-tpGUDS6UZtMGgH2gOzeBmKCY8XblMDvaG3Ld8trC1ShgnEnszzA_UZX2n9IWbG5FxX65tdrVaKnRWtrtVcBlGWB_YLhmMAEOZOZkLEG4MxpZO97spGOEYZ4TibFPlx2Y9ClUsCyYa7K8Pt7KxhVhkocAD7MMMFiSIU--_WJu1E5Xa27DHZoUDIyk6m36M5WdNlv3RRS-W2k6-6pxiMt2yCgeO9PIkioyRo7rDwkPLz5CNgWa69mte6mDvf"
                alt="Representative profile avatar" 
                className="w-10 h-10 rounded-full object-cover border border-emerald-400"
              />
            </div>
            <div>
              <h5 className="font-bold text-sm">Super Cool Support</h5>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] text-emerald-100 font-semibold font-mono">24/7 ONLINE ACCREDITATION</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-emerald-700 text-white transition-colors ml-auto"
              id="close-wa-widget"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 bg-emerald-500/5 border-b border-emerald-500/10 text-[11px] text-slate-600 text-center leading-snug">
            Select an urgent conversion preloaded pipeline option below to prefill WhatsApp:
          </div>

          {/* Preset trigger links list */}
          <div className="p-3 bg-white space-y-2">
            {presets.map((p) => (
              <button
                key={p.id}
                onClick={() => handlePresetClick(p.text)}
                className={`w-full text-left p-3.5 border rounded-xl text-xs transition-all flex justify-between items-center cursor-pointer group ${p.color}`}
              >
                <span>{p.label}</span>
                <span className="text-emerald-500 font-bold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  →
                </span>
              </button>
            ))}
          </div>

          {/* Footnotes */}
          <p className="text-center text-[9px] text-slate-400 py-2.5 bg-slate-50 border-t border-slate-100">
            Typically dispatches engineer within 90 minutes.
          </p>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-all font-sans cursor-pointer focus:outline-none shadow-2xl relative select-none animate-bounce"
        id="wa-trigger-fab-btn"
        title="Connect directly on WhatsApp"
      >
        {/* Pulsing indicator rings behind the green FAB */}
        <span className="absolute -inset-2.5 rounded-full bg-emerald-500/20 scale-105 animate-ping -z-10"></span>
        
        {isOpen ? (
          <X className="w-8 h-8 text-white" />
        ) : (
          <svg className="w-8 h-8 fill-white text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.528 2.017 14.058.99 11.432.99 6.002.99 1.577 5.36 1.574 10.792c-.001 1.67.447 3.298 1.298 4.718L1.875 21.8l6.45-1.688zM18.8 14.613c-.37-.184-2.181-1.063-2.518-1.185-.337-.123-.583-.184-.827.184-.244.368-.946 1.185-1.161 1.431-.215.245-.43.275-.8.092-.37-.184-1.562-.569-2.975-1.815-1.099-.968-1.84-2.162-2.056-2.53-.215-.37-.023-.57.162-.75.167-.162.37-.43.555-.645.185-.215.246-.368.37-.613.123-.245.062-.46-.03-.645-.093-.184-.827-1.963-1.133-2.699-.298-.711-.601-.617-.827-.629-.214-.012-.46-.012-.705-.012-.245 0-.645.092-.98.46-.337.368-1.288 1.231-1.288 3.003 0 1.772 1.302 3.483 1.488 3.731.186.246 2.565 3.869 6.19 5.411 2.22.946 3.076.993 3.902.87.67-.1 2.181-.88 2.487-1.731.307-.85.307-1.58.214-1.73-.092-.153-.337-.246-.707-.43z"/>
          </svg>
        )}
      </button>
    </div>
  );
}
