import React, { useState } from "react";
import { rashifalData, RashiRashifal } from "../data/panchangData";
import { Search, Sparkles, Star } from "lucide-react";

export default function RashifalView() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRashi = rashifalData.filter(
    (r) =>
      r.nameOdia.includes(searchTerm) ||
      r.nameEng.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="rashifal-view-container" className="max-w-md mx-auto mt-6">
      {/* Top Search bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200/40 dark:border-slate-800/85 mb-5 transition-colors duration-200">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            id="rashi-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ରାଶି ଖୋଜନ୍ତୁ... (e.g. ମେଷ, Aries)"
            className="w-full pl-9 pr-4 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-red-500 font-sans"
          />
        </div>
      </div>

      {/* Rashi cards list */}
      <div className="space-y-4">
        {filteredRashi.length > 0 ? (
          filteredRashi.map((rashi) => (
            <div
              key={rashi.id}
              id={`rashi-card-${rashi.id}`}
              className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200/30 dark:border-slate-800/80 flex gap-4 transition-all duration-300 hover:shadow-md hover:border-slate-300/40 dark:hover:border-slate-700/50"
            >
              {/* Left: Circular zodiac badge */}
              <div className="flex flex-col items-center justify-start">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-3xl text-white shadow-sm shrink-0 transition-transform duration-500 hover:rotate-12"
                  style={{ backgroundColor: rashi.color }}
                >
                  {rashi.icon}
                </div>
                <div className="text-sm font-black text-slate-800 dark:text-slate-200 font-display mt-2 leading-none">
                  {rashi.nameOdia}
                </div>
                <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider font-sans mt-0.5 uppercase">
                  {rashi.nameEng}
                </div>
              </div>

              {/* Right: Rashifal details */}
              <div className="flex-1 text-left flex flex-col justify-between">
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed tracking-wide font-sans mb-3">
                  {rashi.prediction}
                </p>
                
                {/* Lucky details */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                  <div className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>ଶୁଭ ସଂଖ୍ୟା: <strong className="text-slate-800 dark:text-slate-200 ml-0.5">{rashi.luckyNumber}</strong></span>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 text-red-500" />
                    <span>ଶୁଭ ରଙ୍ଗ: <strong className="text-slate-800 dark:text-slate-200 ml-0.5">{rashi.luckyColor}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 text-center border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-sans font-medium text-sm transition-colors duration-200">
            କୌଣସି ରାଶି ମିଳିଲା ନାହିଁ।
          </div>
        )}
      </div>
    </div>
  );
}
