import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Phone, FileText, CheckCircle2, Loader2, Clock, Landmark, Mail, Building2, MapPin, Layers, Coins } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data';
import { Booking } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory?: string;
}

export default function BookingModal({ isOpen, onClose, selectedCategory }: BookingModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [serviceType, setServiceType] = useState('commercial');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [siteAddress, setSiteAddress] = useState('');
  const [buildingType, setBuildingType] = useState('Corporate Offices');
  const [areaSqFt, setAreaSqFt] = useState('');
  const [preferredBrand, setPreferredBrand] = useState('Daikin');
  const [budget, setBudget] = useState('₹1 Lakh - ₹5 Lakh');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState<'Morning (9 AM - 12 PM)' | 'Afternoon (12 PM - 4 PM)' | 'Evening (4 PM - 8 PM)'>('Morning (9 AM - 12 PM)');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [successBooking, setSuccessBooking] = useState<any>(null);

  const buildingTypesList = [
    'Corporate Offices', 'IT Parks', 'Hospitals', 'Hotels', 
    'Schools', 'Colleges', 'Restaurants', 'Retail Stores', 
    'Warehouses', 'Factories', 'Data Centers', 'Luxury Residences'
  ];

  useEffect(() => {
    if (selectedCategory && isOpen) {
      if (['residential', 'commercial', 'industrial', 'amc'].includes(selectedCategory)) {
        setServiceType(selectedCategory);
      } else {
        // Find if any buildingType list option matches
        const matchedType = buildingTypesList.find(
          t => t.toLowerCase().includes(selectedCategory.toLowerCase()) || 
               selectedCategory.toLowerCase().includes(t.toLowerCase()) ||
               (selectedCategory === 'Schools' && t === 'Schools') ||
               (selectedCategory === 'Offices' && t === 'Corporate Offices') ||
               (selectedCategory === 'Residential Projects' && t === 'Luxury Residences')
        );
        if (matchedType) {
          setBuildingType(matchedType);
          if (matchedType.includes('Residences')) {
            setServiceType('residential');
          } else if (matchedType.includes('Factories') || matchedType.includes('Warehouses')) {
            setServiceType('industrial');
          } else {
            setServiceType('commercial');
          }
        }
      }
    }
  }, [selectedCategory, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !preferredDate || !email.trim()) return;

    setLoading(true);

    try {
      const selectedCatObj = SERVICE_CATEGORIES.find(cat => cat.id === serviceType);
      const briefReq = `Survey Date: ${preferredDate} (${preferredTime}). Preferred Brand: ${preferredBrand}. Budget: ${budget}. Notes: ${notes.trim()}`;

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: name.trim(),
          mobileNumber: phone.trim(),
          email: email.trim(),
          companyName: company.trim() || 'Individual Client',
          projectType: buildingType,
          requirementType: selectedCatObj ? selectedCatObj.name : 'Commercial HVAC Project',
          cityLocation: siteAddress.trim(),
          approximateArea: areaSqFt ? `${Number(areaSqFt).toLocaleString()} Sq Ft` : 'Not Specified',
          briefRequirement: briefReq,
          ctaUsed: 'Request Site Visit',
        }),
      });

      let data: any;
      try {
        const text = await response.text();
        data = JSON.parse(text);
      } catch (err) {
        throw new Error(
          `Vercel Server Connection Notice: Received non-JSON response (HTTP ${response.status}). This usually indicates your Database credential variables (e.g. SUPABASE_DATABASE_URL / DATABASE_URL) are NOT active. Please register environment variables inside Vercel Dashboard under Settings -> Environment Variables.`
        );
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit site survey request.');
      }

      // Format success booking matching local display requirements
      const newBooking = {
        id: 'B-' + data.lead.id,
        name: data.lead.fullName,
        company: data.lead.companyName || 'Individual Client',
        email: data.lead.email || '',
        phone: data.lead.mobileNumber.startsWith('+91') ? data.lead.mobileNumber : `+91 ${data.lead.mobileNumber}`,
        serviceType: data.lead.requirementType,
        preferredDate,
        preferredTime,
        siteAddress: data.lead.cityLocation,
        buildingType: data.lead.projectType,
        areaSqFt: data.lead.approximateArea,
        preferredBrand,
        budget,
        notes,
        status: data.lead.status,
        createdAt: data.lead.createdAt
      };

      // Save to localStorage too for historical self-service tracking in MyBookings
      const existingBookings = JSON.parse(localStorage.getItem('super_cool_bookings') || '[]');
      localStorage.setItem('super_cool_bookings', JSON.stringify([newBooking, ...existingBookings]));

      // Clean up & transition
      setSuccessBooking(newBooking);
      setStep(2);

      // Trigger custom storage event to refresh listing component if any
      window.dispatchEvent(new Event('storage_updated'));
    } catch (error: any) {
      console.error('Booking submission error:', error);
      alert(error.message || 'Connecting to backend database failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setSiteAddress('');
    setBuildingType('Corporate Offices');
    setAreaSqFt('');
    setPreferredBrand('Daikin');
    setBudget('₹1 Lakh - ₹5 Lakh');
    setPreferredDate('');
    setPreferredTime('Morning (9 AM - 12 PM)');
    setNotes('');
    setSuccessBooking(null);
    onClose();
  };

  const tomorrowStr = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="fixed inset-0 bg-[#0F172A]/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden high-depth relative border border-[#BEE3F8] my-8">
        {/* Header */}
        <div className="bg-[#002045] text-white p-6 flex justify-between items-center sm:px-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-[#002045] text-[10px] font-bold px-2 py-0.5 rounded">LEAD ENGAGEMENT</span>
              <span className="text-xs text-amber-300 font-semibold">PAN India Coverage</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-sans tracking-tight mt-1">Book Free Site Survey</h3>
            <p className="text-xs sm:text-sm text-[#BEE3F8] opacity-90 mt-0.5">Commercial • Industrial • High-End Residential HVAC Engineering RFP</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
            id="close-booking-modal-btn"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        {step === 1 ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[75vh] overflow-y-auto">
            
            {/* Quick Helper Badge */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-xs text-[#1960a3] flex items-start gap-2">
              <span className="font-bold">✨ Genuine Guarantees:</span>
              <span>We assign an ASHRAE/ISHRAE Certified Lead HVAC Design Engineer to review architectural layouts.</span>
            </div>

            {/* Section 1: Contact Details */}
            <div>
              <h4 className="text-sm font-bold text-[#002045] border-b border-gray-100 pb-1 mb-3">1. Proposer Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 tracking-wider mb-2">
                    CONTACT NAME *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="E.g. Rajesh Kumar"
                      className="w-full pl-9 pr-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-[#1960a3] focus:bg-white transition-all outline-none text-sm text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 tracking-wider mb-2">
                    COMPANY NAME (IF APPLICABLE)
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="E.g. ABC Tech Solutions"
                      className="w-full pl-9 pr-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-[#1960a3] focus:bg-white transition-all outline-none text-sm text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 tracking-wider mb-2">
                    BUSINESS EMAIL *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="E.g. rajesh@abccorporate.com"
                      className="w-full pl-9 pr-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-[#1960a3] focus:bg-white transition-all outline-none text-sm text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 tracking-wider mb-2">
                    MOBILE NUMBER *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 bg-slate-100 border border-r-0 border-slate-200 rounded-l-lg text-xs text-slate-600 font-semibold font-mono">
                      +91
                    </span>
                    <div className="relative flex-1">
                      <Phone className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="99066 66452"
                        className="w-full pl-9 pr-4 py-3 rounded-r-lg bg-slate-50 border border-slate-200 focus:border-[#1960a3] focus:bg-white transition-all outline-none text-sm text-slate-800"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Building Specs */}
            <div>
              <h4 className="text-sm font-bold text-[#002045] border-b border-gray-100 pb-1 mb-3">2. Facility & Scope Metrics</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 tracking-wider mb-2">
                    BUILDING / INDUSTRY TYPE *
                  </label>
                  <div className="relative">
                    <Landmark className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    <select
                      value={buildingType}
                      onChange={(e) => setBuildingType(e.target.value)}
                      className="w-full pl-9 pr-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-[#1960a3] focus:bg-white transition-all outline-none text-sm text-slate-800 appearance-none cursor-pointer font-sans"
                    >
                      {buildingTypesList.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 tracking-wider mb-2">
                    SITE AREA (ESTIMATED SQ FT)
                  </label>
                  <div className="relative">
                    <Layers className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      type="number"
                      value={areaSqFt}
                      onChange={(e) => setAreaSqFt(e.target.value)}
                      placeholder="E.g. 20000"
                      className="w-full pl-9 pr-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-[#1960a3] focus:bg-white transition-all outline-none text-sm text-slate-800"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 tracking-wider mb-2">
                    FULL SITE SITE ADDRESS *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <textarea
                      required
                      value={siteAddress}
                      onChange={(e) => setSiteAddress(e.target.value)}
                      placeholder="E.g. Sector-45, Golf Course Road near Metro Hub, Gurugram, Haryana"
                      rows={2}
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-[#1960a3] focus:bg-white transition-all outline-none text-sm text-slate-800"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Equipment Preferences */}
            <div>
              <h4 className="text-sm font-bold text-[#002045] border-b border-gray-100 pb-1 mb-3">3. Technology & Budgetary Plan</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 tracking-wider mb-2">
                    PREFERRED BRAND PARTNER
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Daikin', 'Voltas', 'Both / Flexible'].map((brand) => (
                      <button
                        key={brand}
                        type="button"
                        onClick={() => setPreferredBrand(brand)}
                        className={`py-2 text-center rounded-lg text-xs font-bold border transition-all ${
                          preferredBrand === brand
                            ? 'border-[#1960a3] bg-blue-50 text-[#1960a3]'
                            : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 tracking-wider mb-2">
                    TARGET BUDGET FRAME
                  </label>
                  <div className="relative">
                    <Coins className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full pl-9 pr-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-[#1960a3] focus:bg-white transition-all outline-none text-sm text-slate-800 appearance-none cursor-pointer"
                    >
                      <option value="Under ₹1 Lakh">Under ₹1 Lakh (Small/Split units)</option>
                      <option value="₹1 Lakh - ₹5 Lakh">₹1 Lakh - ₹5 Lakh (Ducted/Cassette)</option>
                      <option value="₹5 Lakh - ₹25 Lakh">₹5 Lakh - ₹25 Lakh (Multi VRV/VRF)</option>
                      <option value="Over ₹25 Lakh">Over ₹25 Lakh (Central Chiller/Heavy Plant)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 tracking-wider mb-2">
                    SURVEY DATE REQUESTED
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      type="date"
                      required
                      min={tomorrowStr()}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full pl-9 pr-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-[#1960a3] focus:bg-white transition-all outline-none text-sm text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 tracking-wider mb-2">
                    TIME SLOT ALLOCATION
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value as any)}
                      className="w-full pl-9 pr-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-[#1960a3] focus:bg-white transition-all outline-none text-sm text-slate-800 appearance-none cursor-pointer"
                    >
                      <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                      <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                      <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Project description notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 tracking-wider mb-2">
                PROJECT DETAIL OR SPECIFIC DESIGN REQUEST
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe your cooling requirements, specific room configurations, energy-saving target benchmarks or structural challenges..."
                  rows={3}
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-[#1960a3] focus:bg-white transition-all outline-none text-sm text-slate-800"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3.5 border border-slate-300 rounded-lg font-bold text-sm text-slate-700 hover:bg-slate-50 active:scale-95 transition-all text-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3.5 bg-amber-400 text-[#002045] rounded-l-lg rounded-r-lg font-extrabold text-sm hover:bg-amber-500 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                id="submit-booking-btn"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Engaging Design Office...
                  </>
                ) : (
                  'Book Free Site Survey'
                )}
              </button>
            </div>
            <p className="text-center text-[11px] text-slate-500">
              * By booking, you lock a guaranteed priority layout draft by certified HVAC engineers. Zero fees.
            </p>
          </form>
        ) : (
          <div className="p-8 text-center space-y-6 sm:px-12">
            <div className="mx-auto w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-extrabold text-[#002045]">Site Survey Locked !</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your B2B technical request was routed directly to our chief design officers. Here is your official service receipt:
              </p>
            </div>

            {/* Receipt Box */}
            {successBooking && (
              <div className="bg-[#BEE3F8]/20 border border-[#BEE3F8] rounded-xl p-5 text-left text-sm space-y-3 font-sans max-w-md mx-auto soft-depth">
                <div className="flex justify-between border-b border-dashed border-sky-200 pb-2">
                  <span className="font-semibold text-slate-500">REQUEST ID:</span>
                  <span className="font-extrabold font-mono text-[#002045]">{successBooking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Name / Co:</span>
                  <span className="font-bold text-slate-800">{successBooking.name} ({successBooking.company})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Industry:</span>
                  <span className="font-medium text-slate-800">{successBooking.buildingType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Site Area:</span>
                  <span className="font-mono text-slate-800 font-bold">{successBooking.areaSqFt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Spec Range:</span>
                  <span className="font-medium text-slate-800">{successBooking.preferredBrand} | {successBooking.budget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Proposed Survey:</span>
                  <span className="font-medium text-teal-700">
                    {successBooking.preferredDate} ({successBooking.preferredTime})
                  </span>
                </div>
                <div className="border-t border-sky-100 pt-2 mt-1">
                  <span className="text-slate-500 block text-xs">Site Destination:</span>
                  <p className="text-slate-700 text-xs mt-0.5 italic">
                    {successBooking.siteAddress}
                  </p>
                </div>
              </div>
            )}

            <p className="text-xs text-slate-500">
              A certified installation engineer will call your team shortly at <span className="font-bold text-[#002045]">{successBooking?.phone}</span> to request DWG coordinate drawings.
            </p>

            <button
              onClick={handleReset}
              className="px-8 py-3 bg-[#002045] text-white rounded-lg font-bold text-sm hover:bg-[#1960a3] active:scale-95 transition-all outline-none"
              id="confirm-booking-completed"
            >
              Close and View Portfolio
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
