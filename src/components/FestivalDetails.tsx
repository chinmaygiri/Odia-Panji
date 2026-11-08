import React, { useState } from "react";
import { festivalsData, Festival } from "../data/panchangData";
import { Calendar, ChevronRight, BookOpen, Sparkles, AlertCircle, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function FestivalDetails() {
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);

  return (
    <div id="festival-details-container" className="max-w-md mx-auto mt-6">
      <h2 className="text-lg font-black text-slate-950 dark:text-slate-100 font-display mb-4 text-left px-1 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-amber-500" />
        ଓଡ଼ିଶାର ବାର ମାସରେ ତେର ପର୍ବ
      </h2>

      {/* Grid of Festivals */}
      <div className="grid grid-cols-1 gap-3.5">
        {festivalsData.map((fest) => (
          <button
            key={fest.id}
            id={`fest-btn-${fest.id}`}
            onClick={() => setSelectedFestival(fest)}
            className="bg-white dark:bg-slate-900 rounded-3xl p-4 shadow-sm border border-slate-200/40 dark:border-slate-800/80 text-left flex justify-between items-center transition-all duration-200 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-750 cursor-pointer"
          >
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 rounded-2xl bg-orange-100 dark:bg-orange-950/40 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 font-display leading-snug">
                  {fest.nameOdia}
                </h3>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 font-sans tracking-wide uppercase mt-0.5">
                  ମାସ: {fest.monthOdia} • {fest.tithi}
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-550" />
          </button>
        ))}
      </div>

      {/* Detailed Slide-up Modal */}
      <AnimatePresence>
        {selectedFestival && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-end justify-center z-50 p-4">
            {/* Click outside to close */}
            <div
              className="absolute inset-0"
              onClick={() => setSelectedFestival(null)}
            ></div>

            {/* Modal Body */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 230 }}
              className="bg-white dark:bg-slate-900 w-full max-w-md rounded-t-[36px] p-6 shadow-2xl relative z-10 max-h-[85vh] overflow-y-auto"
            >
              {/* Drag indicator */}
              <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto mb-4"></div>

              {/* Header */}
              <div className="text-left mb-5">
                <div className="bg-orange-100 dark:bg-orange-950/40 text-orange-800 dark:text-orange-300 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full w-max mb-2">
                  {selectedFestival.monthOdia} • {selectedFestival.tithi}
                </div>
                <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 font-display">
                  {selectedFestival.nameOdia}
                </h2>
                <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wide mt-1">
                  {selectedFestival.nameEng}
                </h3>
              </div>

              {/* Description */}
              <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 rounded-2xl p-4 text-left text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed tracking-wide font-sans mb-5">
                <p>{selectedFestival.description}</p>
              </div>

              {/* Rituals list */}
              <div className="text-left mb-5">
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-orange-500" />
                  ମୁଖ୍ୟ ପୂଜା ବିଧି ଓ ରୀତିନୀତି (Rituals)
                </h4>
                <ul className="space-y-2">
                  {selectedFestival.rituals.map((ritual, idx) => (
                    <li
                      key={idx}
                      className="flex gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 font-sans items-start"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{ritual}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Special Pitha / Food */}
              <div className="bg-amber-50 dark:bg-amber-950/25 border border-amber-100 dark:border-amber-900/30 rounded-2xl p-4 text-left flex gap-3.5 items-center mb-5">
                <span className="text-3xl">🫓</span>
                <div>
                  <h5 className="text-[10px] font-extrabold text-amber-800 dark:text-amber-400 uppercase tracking-widest">
                    ସ୍ପେଶାଲ ପ୍ରସାଦ / ଓଡ଼ିଆ ପିଠା
                  </h5>
                  <p className="text-sm font-extrabold text-amber-950 dark:text-amber-200 mt-0.5">
                    {selectedFestival.pitha}
                  </p>
                </div>
              </div>

              {/* Cultural Significance */}
              <div className="text-left mb-6">
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                  ସାଂସ୍କୃତିକ ଗୁରୁତ୍ଵ (Cultural Value)
                </h4>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-350 font-sans leading-relaxed tracking-wide">
                  {selectedFestival.significance}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedFestival(null)}
                className="w-full bg-slate-900 dark:bg-slate-800 text-white font-extrabold py-3.5 rounded-2xl text-xs tracking-wider transition-all duration-200 hover:bg-slate-800 dark:hover:bg-slate-700 shadow-sm cursor-pointer"
              >
                ବନ୍ଦ କରନ୍ତୁ (Close)
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
