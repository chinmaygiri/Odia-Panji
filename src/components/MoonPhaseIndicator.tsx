import React from "react";
import { MoonPhaseType, MoonPhaseInfo, getUpcomingMoonEvents } from "../data/panchangData";
import { Moon, Sparkles, Eye, Info } from "lucide-react";

interface MoonPhaseGlyphProps {
  phase: MoonPhaseType;
  isSelected?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

// Convert numbers to Odia numerals
function toOdiaDigits(num: number | string): string {
  const odiaDigits = ["୦", "୧", "୨", "୩", "୪", "୫", "୬", "୭", "୮", "୯"];
  return String(num).replace(/[0-9]/g, (d) => odiaDigits[parseInt(d, 10)]);
}

/**
 * High-precision vector SVG representing the four lunar phases:
 * - new: Dark disc with delicate luminous rim (ଅମାବାସ୍ୟା)
 * - waxing: Right hemisphere / crescent illuminated (ଶୁକ୍ଳ ପକ୍ଷ)
 * - full: Radiant golden disc with soft crater detailing (ପୂର୍ଣ୍ଣିମା)
 * - waning: Left hemisphere / crescent illuminated (କୃଷ୍ଣ ପକ୍ଷ)
 */
export function MoonPhaseGlyph({ phase, isSelected = false, size = "sm", className = "" }: MoonPhaseGlyphProps) {
  const pixelSizes = {
    xs: 11,
    sm: 13,
    md: 18,
    lg: 32
  };
  const px = pixelSizes[size];

  // When day is selected (red background), use ultra-bright white/ivory for high contrast
  const illuminatedColor = isSelected ? "#FFFFFF" : "#F59E0B";
  const darkDiscColor = isSelected ? "rgba(0, 0, 0, 0.35)" : "currentColor";
  const rimStrokeColor = isSelected ? "rgba(255, 255, 255, 0.7)" : "#94A3B8";

  switch (phase) {
    case "full":
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 transition-transform duration-200 ${isSelected ? "scale-110 drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]" : "drop-shadow-[0_0_3px_rgba(245,158,11,0.5)]"} ${className}`}
        >
          <circle cx="12" cy="12" r="10" fill={isSelected ? "#FFFBEB" : "#FBBF24"} />
          {/* Subtle lunar maria / surface texture */}
          <circle cx="9.5" cy="8.5" r="2.2" fill={isSelected ? "#FEF3C7" : "#F59E0B"} opacity="0.65" />
          <circle cx="14" cy="14" r="3" fill={isSelected ? "#FEF3C7" : "#F59E0B"} opacity="0.55" />
          <circle cx="8" cy="14.5" r="1.5" fill={isSelected ? "#FEF3C7" : "#F59E0B"} opacity="0.5" />
          <circle cx="12" cy="12" r="10" stroke={isSelected ? "#FFFFFF" : "#D97706"} strokeWidth="1" opacity="0.8" />
        </svg>
      );

    case "new":
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 ${className}`}
        >
          {/* Dark silhouette of new moon with clean boundary stroke */}
          <circle
            cx="12"
            cy="12"
            r="9.5"
            fill={isSelected ? "rgba(30, 41, 59, 0.7)" : "#0F172A"}
            className="dark:fill-slate-900"
          />
          <circle
            cx="12"
            cy="12"
            r="9.5"
            stroke={rimStrokeColor}
            strokeWidth="1.5"
            strokeDasharray={isSelected ? "none" : "2 1.5"}
            opacity={isSelected ? "0.9" : "0.75"}
          />
        </svg>
      );

    case "waxing":
      // Right side illuminated (Shukla Paksha - growing light)
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 ${className}`}
        >
          {/* Base dark sphere */}
          <circle
            cx="12"
            cy="12"
            r="9.5"
            fill={darkDiscColor}
            className="text-slate-350 dark:text-slate-800"
            opacity={isSelected ? "0.4" : "0.85"}
          />
          {/* Illuminated Right Half / Waxing Crescent */}
          <path
            d="M 12 2.5 A 9.5 9.5 0 0 1 12 21.5 A 5 9.5 0 0 0 12 2.5 Z"
            fill={illuminatedColor}
          />
          <circle
            cx="12"
            cy="12"
            r="9.5"
            stroke={isSelected ? "rgba(255,255,255,0.4)" : "#CBD5E1"}
            className="dark:stroke-slate-700"
            strokeWidth="1"
            opacity="0.6"
          />
        </svg>
      );

    case "waning":
      // Left side illuminated (Krishna Paksha - waning light)
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 ${className}`}
        >
          {/* Base dark sphere */}
          <circle
            cx="12"
            cy="12"
            r="9.5"
            fill={darkDiscColor}
            className="text-slate-350 dark:text-slate-800"
            opacity={isSelected ? "0.4" : "0.85"}
          />
          {/* Illuminated Left Half / Waning Crescent */}
          <path
            d="M 12 2.5 A 9.5 9.5 0 0 0 12 21.5 A 5 9.5 0 0 1 12 2.5 Z"
            fill={illuminatedColor}
          />
          <circle
            cx="12"
            cy="12"
            r="9.5"
            stroke={isSelected ? "rgba(255,255,255,0.4)" : "#CBD5E1"}
            className="dark:stroke-slate-700"
            strokeWidth="1"
            opacity="0.6"
          />
        </svg>
      );
  }
}

interface MoonPhaseLegendProps {
  activeFilter: MoonPhaseType | null;
  onSelectFilter: (phase: MoonPhaseType | null) => void;
  counts?: { [key in MoonPhaseType]?: number };
}

/**
 * Interactive Moon Phase Legend Bar shown right with the calendar
 */
export function MoonPhaseLegend({ activeFilter, onSelectFilter, counts }: MoonPhaseLegendProps) {
  const phases: { id: MoonPhaseType; labelOdia: string; labelEng: string }[] = [
    { id: "new", labelOdia: "ଅମାବାସ୍ୟା", labelEng: "New" },
    { id: "waxing", labelOdia: "ଶୁକ୍ଳ ପକ୍ଷ", labelEng: "Waxing" },
    { id: "full", labelOdia: "ପୂର୍ଣ୍ଣିମା", labelEng: "Full" },
    { id: "waning", labelOdia: "କୃଷ୍ଣ ପକ୍ଷ", labelEng: "Waning" }
  ];

  return (
    <div className="mt-3 bg-white/80 dark:bg-slate-850/80 rounded-2xl p-2 border border-slate-200/60 dark:border-slate-800 shadow-xs transition-colors duration-200">
      <div className="flex items-center justify-between mb-1.5 px-1">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400 font-display">
          <Moon className="w-3 h-3 text-amber-500" />
          <span>ଚନ୍ଦ୍ର କଳା ସୂଚକ (Moon Phases)</span>
        </div>
        {activeFilter && (
          <button
            onClick={() => onSelectFilter(null)}
            className="text-[9px] font-black text-red-600 dark:text-red-400 hover:underline cursor-pointer"
          >
            Reset
          </button>
        )}
      </div>

      <div className="grid grid-cols-4 gap-1">
        {phases.map((p) => {
          const isSelected = activeFilter === p.id;
          const count = counts?.[p.id];

          return (
            <button
              key={p.id}
              onClick={() => onSelectFilter(isSelected ? null : p.id)}
              className={`flex flex-col items-center py-1 px-0.5 rounded-xl text-center transition-all cursor-pointer ${
                isSelected
                  ? "bg-red-500 text-white shadow-xs scale-102"
                  : "bg-white/90 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50"
              }`}
              title={`Click to spotlight ${p.labelEng} (${p.labelOdia})`}
            >
              <div className="flex items-center justify-center my-0.5">
                <MoonPhaseGlyph phase={p.id} isSelected={isSelected} size="xs" />
              </div>
              <span className="text-[9px] font-black leading-tight line-clamp-1">
                {p.labelOdia}
              </span>
              <span className={`text-[7px] font-bold font-sans uppercase tracking-tight ${isSelected ? "text-red-100" : "text-slate-400 dark:text-slate-500"}`}>
                {p.labelEng} {count !== undefined ? `(${toOdiaDigits(count)})` : ""}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface MoonPhaseCardProps {
  moonInfo: MoonPhaseInfo;
  selectedDateStr: string;
}

/**
 * Rich Card displaying detailed lunar mechanics for the selected day
 */
export function MoonPhaseCard({ moonInfo, selectedDateStr }: MoonPhaseCardProps) {
  const { nextPurnima, nextAmavasya } = getUpcomingMoonEvents(selectedDateStr);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/60 dark:border-slate-800 shadow-sm transition-colors duration-200 text-left">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-900/40">
            <MoonPhaseGlyph phase={moonInfo.phase} size="md" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-black text-slate-900 dark:text-slate-100 font-display">
                {moonInfo.nameOdia}
              </h3>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-amber-100/70 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300">
                {moonInfo.symbol}
              </span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 font-sans tracking-wide">
              {moonInfo.subPhaseEng} • {moonInfo.pakshaOdia}
            </p>
          </div>
        </div>

        {/* Illumination % Badge */}
        <div className="text-right">
          <span className="text-sm font-black text-amber-600 dark:text-amber-400 font-display">
            {toOdiaDigits(moonInfo.illumination)}%
          </span>
          <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">
            Illuminated
          </div>
        </div>
      </div>

      {/* Progress Bar of Moon Illumination */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mb-3 overflow-hidden">
        <div
          className="bg-amber-400 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${moonInfo.illumination}%` }}
        />
      </div>

      {/* Lunar Meta Stats */}
      <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-600 dark:text-slate-300 mb-3">
        <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
          <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
            ତିଥି / Tithi Phase
          </span>
          <strong className="text-[11px] font-black text-slate-850 dark:text-slate-200">
            {moonInfo.tithiOdia}
          </strong>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
          <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
            ଚନ୍ଦ୍ର ଆୟୁ / Moon Age
          </span>
          <strong className="text-[11px] font-black text-slate-850 dark:text-slate-200">
            {toOdiaDigits(moonInfo.ageInDays)} / ୨୯.୫ ଦିନ
          </strong>
        </div>
      </div>

      {/* Upcoming Moon Milestones */}
      <div className="flex items-center justify-between text-[10px] font-bold pt-2 border-t border-slate-100 dark:border-slate-800/70">
        <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
          <span>🌕 ପରବର୍ତ୍ତୀ ପୂର୍ଣ୍ଣିମା:</span>
          <span className="text-red-600 dark:text-red-400 font-extrabold font-sans">
            {nextPurnima ? `${toOdiaDigits(nextPurnima.daysAway)} ଦିନ ପରେ` : "ଆସୁଅଛି"}
          </span>
        </div>
        <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
          <span>🌑 ଅମାବାସ୍ୟା:</span>
          <span className="text-slate-800 dark:text-slate-200 font-extrabold font-sans">
            {nextAmavasya ? `${toOdiaDigits(nextAmavasya.daysAway)} ଦିନ ପରେ` : "ଆସୁଅଛି"}
          </span>
        </div>
      </div>
    </div>
  );
}
