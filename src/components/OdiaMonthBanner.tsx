import React from "react";
import { getOdiaMonthMapping } from "../data/odiaMonthMapping";

interface OdiaMonthBannerProps {
  currentMonthIndex: number; // 0-11
  currentYear?: number;
  onSelectMonth?: (monthIndex: number) => void;
}

export default function OdiaMonthBanner({
  currentMonthIndex,
}: OdiaMonthBannerProps) {
  const activeMapping = getOdiaMonthMapping(currentMonthIndex);

  return (
    <div className="mb-4">
      {/* Traditional Odia Panji Period Banner for Currently Navigated Month */}
      <div 
        id="odia-month-mapping-banner"
        className="bg-slate-300/50 dark:bg-slate-800/40 py-1.5 px-3 rounded-xl border border-slate-300/30 dark:border-slate-700/40 transition-colors shadow-2xs text-center"
      >
        <div className="text-[10px] sm:text-[11px] font-bold text-slate-600 dark:text-slate-400 font-sans leading-relaxed tracking-wide text-center">
          {activeMapping.traditionalPanjiPeriod}
        </div>
      </div>
    </div>
  );
}
