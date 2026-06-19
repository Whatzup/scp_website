import React, { useState } from 'react';
import { ARTICLES } from '../data';
import { Article } from '../types';
import { X, Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

export default function LatestTips() {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  return (
    <section className="py-20 bg-white border-b border-slate-100" id="reviews">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-secondary font-bold tracking-widest text-[#1960a3] uppercase text-xs sm:text-sm font-sans block">
              LATEST TIPS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary font-sans leading-tight">
              Stay informed with simple cooling advice
            </h2>
          </div>
          
          <button 
            onClick={() => setActiveArticle(ARTICLES[0])} // Preselect first as a teaser
            className="text-primary font-bold border-b-2 border-primary pb-1 hover:text-secondary hover:border-secondary transition-colors text-sm sm:text-base cursor-pointer hover:tracking-wide transition-all"
            id="view-all-articles-btn"
          >
            Read Top Advice
          </button>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <article 
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="group cursor-pointer flex flex-col justify-between space-y-4"
              id={`article-card-${article.id}`}
            >
              <div className="space-y-4">
                {/* Image panel with zoom scaling hover effect */}
                <div className="rounded-2xl overflow-hidden h-56 sm:h-60 border border-ice-blue relative">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt={article.title}
                    src={article.imageUrl}
                  />
                  <div className="absolute top-3 left-3 bg-[#002045]/90 text-[#BEE3F8] text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
                    {article.category}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-sans">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-primary text-base sm:text-lg leading-snug group-hover:text-secondary transition-colors font-sans">
                    {article.title}
                  </h3>
                  
                  <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                    {article.description}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1960a3] group-hover:underline">
                  Read Article
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Detail Drawer Modal */}
      {activeArticle && (
        <div className="fixed inset-0 bg-[#002045]/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl overflow-hidden shadow-2xl border border-ice-blue max-w-2xl w-full relative">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-2 rounded-full transition-colors z-10"
              id="close-article-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Banner Image */}
            <div className="h-56 sm:h-64 relative">
              <img 
                src={activeArticle.imageUrl} 
                className="w-full h-full object-cover" 
                alt={activeArticle.title} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="bg-cta-accent text-primary text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider font-mono">
                  {activeArticle.category}
                </span>
                <h4 className="text-white font-extrabold text-base sm:text-xl md:text-2xl font-sans mt-2 leading-tight">
                  {activeArticle.title}
                </h4>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 space-y-4 max-h-[350px] overflow-y-auto">
              <div className="flex items-center gap-4 text-xs text-slate-500 font-sans border-b border-slate-100 pb-3">
                <span className="flex items-center gap-1 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  Published {activeArticle.date}
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  Estimated: {activeArticle.readTime}
                </span>
              </div>

              {/* Render dynamic paragraph fields */}
              <div className="text-slate-700 text-xs sm:text-sm leading-relaxed space-y-4 font-sans whitespace-pre-line">
                {activeArticle.content}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-between items-center px-6">
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <BookOpen className="w-4 h-4 text-secondary" />
                Empowering Gurugram households
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-6 py-2 bg-[#002045] text-white rounded-lg font-bold text-xs hover:bg-slate-800 transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
