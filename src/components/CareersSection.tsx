import React, { useState } from 'react';
import { Briefcase, Send, MapPin, ClipboardList, CheckCircle2, Loader2, UserPlus, FileSignature, X } from 'lucide-react';
import { CAREER_OPPORTUNITIES } from '../data';

export default function CareersSection() {
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [successApply, setSuccessApply] = useState(false);

  // Form Inputs
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('3 Years');
  const [skills, setSkills] = useState('');

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccessApply(true);
      
      // Reset after brief simulation transition
      setTimeout(() => {
        setName('');
        setPhone('');
        setEmail('');
        setExperience('3 Years');
        setSkills('');
        setSuccessApply(false);
        setSelectedRole(null);
      }, 4000);
    }, 1500);
  };

  return (
    <section className="py-20 bg-[#00132c] border-b border-[#000a18] text-white relative" id="careers-section">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,#002522,transparent_60%)] pointer-events-none opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16 space-y-4">
          <span className="bg-emerald-500/10 text-emerald-400 font-bold tracking-widest text-emerald-400 uppercase text-xs px-3 py-1 rounded-full border border-emerald-500/20 font-mono inline-block">
            ACCREDITED HR OPERATIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
            Careers in Thermal Infrastructure
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            "Why: Makes company appear highly structured, corporate-scaled, and institutionalized."
          </p>
          <div className="w-16 h-1 bg-emerald-400 mx-auto rounded"></div>
        </div>

        {/* 4 Columns Careers Layout */}
        <p className="text-[10px] font-mono text-slate-400 mb-2 text-center md:hidden flex items-center justify-center gap-1">
          <span>Swipe to check open vacancies</span>
          <span className="animate-pulse">→</span>
        </p>
        <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-thin snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6">
          {CAREER_OPPORTUNITIES.map((job) => (
            <div 
              key={job.id} 
              className="bg-[#000a18] border border-[#001c3d] p-6 rounded-2xl flex flex-col justify-between hover:border-emerald-500/20 transition-all group shadow-sm hover:shadow-xl min-w-[240px] w-[82vw] md:w-auto shrink-0 snap-center md:shrink"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-[#00132c]/65 p-2.5 rounded-xl border border-[#001c3d]/40">
                  <span className="text-[10px] font-bold font-mono tracking-wider text-emerald-400 uppercase block">
                    {job.type}
                  </span>
                  <span className="text-[9px] bg-[#001c3d] text-slate-400 px-2 py-0.5 rounded font-mono font-bold">
                    {job.location.split(',')[0]}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-extrabold tracking-tight text-white group-hover:text-emerald-400 transition-colors leading-tight">
                    {job.title}
                  </h3>
                  <span className="text-[10.5px] text-slate-400 font-mono block">Required Exp: <strong className="text-slate-200">{job.experience}</strong></span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div className="pt-6 border-t border-[#00132c] mt-6">
                <button
                  onClick={() => setSelectedRole(job)}
                  className="w-full py-2.5 text-center bg-[#00132c] hover:bg-[#001c3d] text-slate-200 hover:text-emerald-300 border border-[#001c3d] hover:border-emerald-500/20 rounded-xl font-bold text-xs transition-all cursor-pointer"
                  id={`apply-btn-${job.id}`}
                >
                  View Requirements & Apply
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Swipe Progress Track for Mobile */}
        <div className="flex md:hidden items-center justify-center gap-1.5 mt-2">
          <span className="text-[10px] font-mono text-slate-400">Swipe</span>
          <div className="w-16 h-1 rounded-full bg-slate-800 overflow-hidden relative">
            <div className="absolute top-0 left-0 bottom-0 bg-emerald-400 w-1/2 animate-[pulse_1.5s_infinite]" />
          </div>
          <span className="text-[10px] font-mono text-slate-400">to browse vacancies</span>
        </div>

      </div>

      {/* Career Application Slip Popup */}
      {selectedRole && (
        <div className="fixed inset-0 bg-[#0F172A]/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white text-slate-800 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl relative border border-emerald-100 my-8">
            {/* Header */}
            <div className="bg-[#002045] text-white p-6 flex justify-between items-center sm:px-8">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-4.5 h-4.5 text-emerald-400" />
                  <span className="text-[10px] font-bold font-mono text-emerald-300 uppercase tracking-widest leading-none">ACTIVE VACANCY RECRUITMENT</span>
                </div>
                <h4 className="text-lg font-black">{selectedRole.title}</h4>
                <p className="text-xs text-slate-300 font-mono">{selectedRole.type} | {selectedRole.location}</p>
              </div>
              <button
                onClick={() => setSelectedRole(null)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
                id="close-careers-modal"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Application Body */}
            {!successApply ? (
              <form onSubmit={handleApplySubmit} className="p-6 sm:p-8 space-y-5 max-h-[70vh] overflow-y-auto">
                {/* Requirements section */}
                <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">CRITICAL QUALIFICATION CRITERIA:</span>
                  <ul className="space-y-1.5 text-xs text-slate-600 leading-normal">
                    {selectedRole.requirements.map((reqStr: string, idx: number) => (
                      <li key={idx} className="flex gap-2 items-start pl-1">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{reqStr}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <h5 className="text-xs font-bold text-primary border-b pb-1">Submit Recruitment Form</h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="E.g. Gurpreet Singh"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#1960a3]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Your Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="E.g. gurpreet@hvacmail.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#1960a3]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0,10))}
                      placeholder="9906644210"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#1960a3] font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Field Experience *</label>
                    <select
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#1960a3] font-sans"
                    >
                      <option value="Under 2 Years">Under 2 Years (Junior ITI)</option>
                      <option value="2-4 Years">2-4 Years (Experienced Specialist)</option>
                      <option value="5-8 Years">5-8 Years (Acoustic Site Lead)</option>
                      <option value="Over 8 Years">Over 8 Years (ASHRAE Senior Designer)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Core HVAC Skills or Brands Covered</label>
                  <textarea
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="E.g. Experienced with high-pressure dry nitrogen leak detection, Daikin VRV commissioning catalogs, duct insulation, etc."
                    rows={2.5}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#1960a3]"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRole(null)}
                    className="flex-1 py-3 text-center border rounded-xl font-bold text-xs text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-extrabold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Validating Credentials...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Submit Interview Application
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-8 text-center space-y-6 sm:px-12 bg-emerald-50/20">
                <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-10 h-10 animate-pulse" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-xl font-black text-[#002045]">Application Registered!</h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Thanks <strong className="text-slate-900">{name}</strong>! Your HVAC qualifications have been indexed inside our human resources system.
                  </p>
                </div>

                {/* Receipt visual card */}
                <div className="bg-white border-2 border-dashed border-emerald-200 rounded-xl p-4 text-left text-xs font-mono space-y-1 max-w-sm mx-auto shadow-sm">
                  <div className="text-slate-400 text-[10px] pb-1 border-b mb-2 flex justify-between">
                    <span>INDEX ID: {Math.floor(10012 + Math.random() * 90000)}</span>
                    <span className="text-emerald-600 font-bold">ACTIVE</span>
                  </div>
                  <div><span className="font-bold">Applicant Email:</span> <span className="text-slate-700">{email}</span></div>
                  <div><span className="font-bold">Target Vacancy:</span> <span className="text-slate-700">{selectedRole.title}</span></div>
                  <div><span className="font-bold">Experience Range:</span> <span className="text-teal-700 font-bold">{experience}</span></div>
                  <div><span className="font-bold">Cell Contact:</span> <span className="text-slate-700">+91 {phone}</span></div>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Our talent acquisition team will call you at <strong className="text-slate-800 font-bold">+91 {phone}</strong> regarding schedule alignments for onsite practical silver-brazing trials.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
