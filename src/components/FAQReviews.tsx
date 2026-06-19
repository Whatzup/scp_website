import React, { useState, useEffect } from 'react';
import { Star, ChevronDown, ChevronRight, Plus, Check, MessageSquare, Award } from 'lucide-react';
import { FAQ_ITEMS, DEFAULT_REVIEWS } from '../data';
import { Review } from '../types';

export default function FAQReviews() {
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeFaqCategory, setActiveFaqCategory] = useState<'All' | 'Services' | 'Pricing' | 'Emergency' | 'Maintenance'>('All');
  
  // Write Review form states
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [serviceType, setServiceType] = useState('Home AC Care');
  const [formOpen, setFormOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  // Load reviews on render
  useEffect(() => {
    try {
      const saved = localStorage.getItem('super_cool_reviews');
      if (saved) {
        setReviews(JSON.parse(saved));
      } else {
        setReviews(DEFAULT_REVIEWS);
        localStorage.setItem('super_cool_reviews', JSON.stringify(DEFAULT_REVIEWS));
      }
    } catch (e) {
      setReviews(DEFAULT_REVIEWS);
    }
  }, []);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newReview: Review = {
      id: 'R-' + Math.floor(1000 + Math.random() * 9000),
      name,
      rating,
      comment,
      serviceType,
      date: new Date().toISOString().split('T')[0],
      isCustom: true
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('super_cool_reviews', JSON.stringify(updated));

    // Reset writing states
    setName('');
    setRating(5);
    setComment('');
    setFormOpen(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  // Dynamically compute global average score and total count!
  const totalReviewsCount = reviews.length;
  const averageRatingStr = (
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / (totalReviewsCount || 1)
  ).toFixed(1);

  const faqCategories = ['All', 'Services', 'Pricing', 'Emergency', 'Maintenance'];
  const filteredFaqs = activeFaqCategory === 'All' 
    ? FAQ_ITEMS 
    : FAQ_ITEMS.filter(faq => faq.category === activeFaqCategory);

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-100" id="faq">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Column: Interactive FAQ (col-span-7) */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-2">
            <span className="text-secondary font-bold tracking-widest text-[#1960a3] uppercase text-xs sm:text-sm font-sans block">
              HAVE QUESTIONS?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary font-sans leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-md leading-relaxed">
              Find answers to common questions about our cooling installation, emergency diagnostic calls, and MSME contracts.
            </p>
          </div>

          {/* FAQ Category Toggles */}
          <div className="flex flex-wrap gap-2">
            {faqCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFaqCategory(cat as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeFaqCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="bg-white border border-ice-blue rounded-xl overflow-hidden shadow-sm hover:border-[#1960a3] transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full text-left p-5 flex justify-between items-center gap-4 text-primary font-bold font-sans text-sm sm:text-base cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-500 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50 font-sans">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Dynamic Reviews Testimonials (col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="text-secondary font-bold tracking-widest text-[#1960a3] uppercase text-xs sm:text-sm font-sans block">
              CLIENT WORDS
            </span>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary font-sans leading-tight">
                Kind Reviews
              </h2>
              {/* Rating count pill */}
              <div className="bg-cta-accent text-primary text-xs font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-0.5 font-mono">
                ★ {averageRatingStr}
              </div>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Read real-world diagnostic reviews and feedback left by home and shop owners.
            </p>
          </div>

          {/* Big dynamic score banner */}
          <div className="bg-white/70 backdrop-blur border border-ice-blue rounded-2xl p-5 flex justify-between items-center shadow-sm">
            <div className="space-y-1">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">AVERAGE AUDIT RATING</p>
              <div className="flex items-center gap-1.5 pt-0.5">
                <span className="text-primary text-3xl font-extrabold font-mono">{averageRatingStr}</span>
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.round(Number(averageRatingStr)) ? 'fill-amber-500 text-amber-500' : 'text-slate-300'}`} 
                    />
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-400">Derived from {totalReviewsCount} cumulative feedbacks</p>
            </div>

            <button
              onClick={() => setFormOpen(!formOpen)}
              className="px-4 py-2.5 bg-primary hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-all shadow-md cursor-pointer flex items-center gap-1"
              id="add-review-toggle-btn"
            >
              <Plus className="w-4 h-4" />
              Write Review
            </button>
          </div>

          {/* Success message trigger */}
          {success && (
            <div className="bg-success-teal/15 border border-[#38B2AC] text-[#38B2AC] p-3 rounded-lg text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 stroke-[3px]" />
              Review added successfully! Thank you for the service feedback.
            </div>
          )}

          {/* Form to leave feedback */}
          {formOpen && (
            <form onSubmit={handleAddReview} className="bg-white border border-[#1960a3] p-5 rounded-2xl space-y-4 shadow-xl">
              <h4 className="text-sm font-bold text-[#002045] uppercase tracking-wider font-sans border-b border-slate-100 pb-2 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[#1960a3]" />
                Share Your Cooling Experience
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g. Neha S."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-[#1960a3] rounded-lg outline-none text-xs text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1">SERVICE AREA</label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-200 focus:border-[#1960a3] rounded-lg outline-none text-xs text-slate-700"
                  >
                    <option value="Home AC Care">Home AC Care</option>
                    <option value="Office Support">Office Support</option>
                    <option value="AMC For MSME">AMC For MSME</option>
                    <option value="General AC Repair">General AC Repair</option>
                  </select>
                </div>
              </div>

              {/* Star selector */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">SATISFACTION RATING</label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-6 h-6 ${s <= rating ? 'fill-amber-500 text-amber-500' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">FEEDBACK COMMENT</label>
                <textarea
                  required
                  rows={2}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Review how our engineers handled de-scaling or installation..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-[#1960a3] rounded-lg outline-none text-xs text-slate-800"
                />
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-500 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-primary text-white font-bold rounded-lg text-xs hover:bg-[#1a365d] active:scale-95 transition-all"
                >
                  Post Review
                </button>
              </div>
            </form>
          )}

          {/* Testimonial List with scroll containment */}
          <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
            {reviews.map((review) => (
              <div 
                key={review.id} 
                className="p-4 bg-white border border-ice-blue rounded-xl space-y-3 shadow-xs hover:border-secondary transition-colors"
              >
                <div className="flex justify-between items-start font-sans">
                  <div>
                    <p className="font-bold text-primary text-sm leading-none flex items-center gap-1">
                      {review.name}
                      {review.isCustom && (
                        <span className="text-[9px] bg-indigo-50 text-[#1960a3] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          User Posted
                        </span>
                      )}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Service: <span className="font-medium text-slate-500">{review.serviceType}</span>
                    </p>
                  </div>
                  
                  <div className="flex text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-amber-500 text-amber-500' : 'text-slate-200'}`} 
                      />
                    ))}
                  </div>
                </div>

                <p className="text-slate-600 text-xs leading-relaxed font-sans italic">
                  "{review.comment}"
                </p>

                <div className="flex justify-between items-center text-[9px] text-slate-400 font-sans pt-1 border-t border-slate-50">
                  <span className="flex items-center gap-1 uppercase">
                    <Award className="w-3 h-3 text-[#38B2AC] shrink-0" />
                    Verified Customer
                  </span>
                  <span>{review.date}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
