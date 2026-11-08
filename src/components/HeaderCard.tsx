import React from "react";
import { DayPanchang, getMoonPhaseInfo } from "../data/panchangData";
import { Sun, Sunset } from "lucide-react";
import { MoonPhaseGlyph } from "./MoonPhaseIndicator";

interface HeaderCardProps {
  panchang: DayPanchang;
}

export default function HeaderCard({ panchang }: HeaderCardProps) {
  // Extract month and date parts
  // e.g., panchang.date is "2025-07-03" -> "03 JUL"
  const dateObj = new Date(panchang.date);
  const dayStr = String(dateObj.getDate()).padStart(2, "0");
  const monthNamesEng = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const monthStr = monthNamesEng[dateObj.getMonth()];

  const moonInfo = getMoonPhaseInfo(panchang.date);

  return (
    <div id="panchang-header-card" className="bg-slate-100 dark:bg-slate-900/90 rounded-3xl p-5 shadow-sm border border-slate-200/60 dark:border-slate-800/80 max-w-md mx-auto transition-colors duration-200">
      {/* Top section: Day, Date, Lunar Detail in a balanced 3-column grid */}
      <div className="grid grid-cols-3 items-center gap-1 mb-4">
        {/* Left column: Day */}
        <div className="text-left flex flex-col justify-center">
          <div className="text-3xl font-black text-slate-850 dark:text-slate-100 tracking-tight font-display leading-none">
            {panchang.dayOfWeekOdia}
          </div>
          <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider font-sans mt-1.5 uppercase leading-none">
            {panchang.dayOfWeekEng}
          </div>
        </div>

        {/* Center column: Gregorian Date & Odia Month Date */}
        <div className="text-center flex flex-col justify-center border-l border-r border-slate-200/70 dark:border-slate-800/80 px-1">
          <div className="text-2xl font-black text-red-600 dark:text-red-400 tracking-tight font-display leading-none">
            {dayStr} {monthStr}
          </div>
          <div className="text-sm font-black text-slate-900 dark:text-slate-200 font-display mt-2 leading-none">
            {panchang.solarDateOdia}
          </div>
        </div>

        {/* Right column: Tithi & Paksha name with Moon Glyph */}
        <div className="text-right flex flex-col justify-center">
          <div className="flex items-center justify-end gap-1.5">
            <MoonPhaseGlyph phase={moonInfo.phase} size="xs" />
            <div className="text-sm font-black text-slate-800 dark:text-slate-200 font-display leading-none">
              {panchang.tithiOdia}
            </div>
          </div>
          <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 font-sans tracking-wide uppercase leading-none mt-1.5">
            {panchang.pakshaOdia} ({moonInfo.illumination}%)
          </div>
          <div className="text-[11px] font-bold text-red-600 dark:text-red-400 leading-tight mt-1.5">
            {panchang.nakshatraOdia}, {panchang.rashiOdia}
          </div>
        </div>
      </div>

      {/* Bottom section: Sunrise & Sunset times */}
      <div className="border-t border-slate-200/80 dark:border-slate-800/80 pt-3 grid grid-cols-2 gap-2.5 sm:gap-3 text-xs">
        <div 
          className="flex items-center gap-2.5 bg-gradient-to-br from-amber-50 to-orange-50/60 dark:from-amber-950/40 dark:to-orange-950/30 py-2 px-3 rounded-xl border border-amber-200/70 dark:border-amber-800/50 shadow-xs hover:border-amber-300 dark:hover:border-amber-700 transition-colors"
          title={panchang.dayLength ? `ସୌର ଦିବସ ଅବଧି: ${panchang.dayLength}` : undefined}
        >
          <div className="w-7 h-7 rounded-lg bg-amber-100/90 dark:bg-amber-900/60 flex items-center justify-center shrink-0 border border-amber-200 dark:border-amber-700/60 shadow-xs">
            <Sun className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex flex-col text-left leading-tight min-w-0">
            <span className="text-xs font-black text-amber-900 dark:text-amber-200 tracking-tight">{panchang.sunrise}</span>
            <span className="text-[10px] font-semibold text-amber-700/90 dark:text-amber-400/90 tracking-normal mt-0.5 truncate">ସୂର୍ଯ୍ୟୋଦୟ</span>
          </div>
        </div>
        <div 
          className="flex items-center gap-2.5 bg-gradient-to-br from-rose-50 to-pink-50/60 dark:from-rose-950/40 dark:to-pink-950/30 py-2 px-3 rounded-xl border border-rose-200/70 dark:border-rose-800/50 shadow-xs hover:border-rose-300 dark:hover:border-rose-700 transition-colors"
          title={panchang.dayLength ? `ସୌର ଦିବସ ଅବଧି: ${panchang.dayLength}` : undefined}
        >
          <div className="w-7 h-7 rounded-lg bg-rose-100/90 dark:bg-rose-900/60 flex items-center justify-center shrink-0 border border-rose-200 dark:border-rose-700/60 shadow-xs">
            <Sunset className="w-4 h-4 text-rose-600 dark:text-rose-400" />
          </div>
          <div className="flex flex-col text-left leading-tight min-w-0">
            <span className="text-xs font-black text-rose-900 dark:text-rose-200 tracking-tight">{panchang.sunset}</span>
            <span className="text-[10px] font-semibold text-rose-700/90 dark:text-rose-400/90 tracking-normal mt-0.5 truncate">ସୂର୍ଯ୍ୟାସ୍ତ</span>
          </div>
        </div>
      </div>
    </div>
  );
}

