import React, { useState, useEffect } from "react";
import HeaderCard from "./components/HeaderCard";
import OdiaMonthBanner from "./components/OdiaMonthBanner";
import PanchangTabs from "./components/PanchangTabs";
import RashifalView from "./components/RashifalView";
import FestivalDetails from "./components/FestivalDetails";
import NotificationSettings from "./components/NotificationSettings";
import AiAstroAssistant from "./components/AiAstroAssistant";
import { 
  getPanchangForDate, 
  festivalsData, 
  DayPanchang, 
  getMoonPhaseInfo, 
  MoonPhaseType 
} from "./data/panchangData";
import { 
  MoonPhaseGlyph, 
  MoonPhaseLegend, 
  MoonPhaseCard 
} from "./components/MoonPhaseIndicator";
import { 
  Calendar as CalendarIcon, 
  Sparkles, 
  Bell, 
  WifiOff, 
  Menu, 
  User, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Info,
  CheckCircle2,
  Heart,
  Globe,
  Sun,
  Moon
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Convert Gregorian number/string to beautiful Odia digits
function toOdiaDigits(num: number | string): string {
  const odiaDigits = ["୦", "୧", "୨", "୩", "୪", "୫", "୬", "୭", "୮", "୯"];
  return String(num)
    .split("")
    .map((char) => {
      const d = parseInt(char);
      return isNaN(d) ? char : odiaDigits[d];
    })
    .join("");
}

const odiaMonthsNames = [
  "ଜାନୁଆରୀ", "ଫେବୃଆରୀ", "ମାର୍ଚ୍ଚ", "ଏପ୍ରିଲ୍", "ମେ", "ଜୁନ୍",
  "ଜୁଲାଇ", "ଅଗଷ୍ଟ", "ସେପ୍ଟେମ୍ବର", "ଅକ୍ଟୋବର", "ନଭେମ୍ବର", "ଡିସେମ୍ବର"
];

const weekDaysEng = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const weekDaysOdia = ["ରବି", "ସୋମ", "ମଙ୍ଗଳ", "ବୁଧ", "ଗୁରୁ", "ଶୁକ୍ର", "ଶନି"];

export default function App() {
  const [currentView, setCurrentView] = useState<"panchang" | "festivals" | "ai_assistant" | "notifications">("panchang");
  
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("panchang-dark-mode");
      if (saved !== null) {
        return saved === "true";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("panchang-dark-mode", String(darkMode));
  }, [darkMode]);

  // Dynamically initialize with the actual current date
  const getTodayStr = () => {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const todayStr = getTodayStr();

  const [selectedDateStr, setSelectedDateStr] = useState<string>(todayStr);
  const [panchang, setPanchang] = useState<DayPanchang>(getPanchangForDate(todayStr));

  // Current calendar navigation month & year
  const [navDate, setNavDate] = useState<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), 1));

  // Quick sub-toggle for Tithi info vs Rashifal info in Panchang tab
  const [panchangSubTab, setPanchangSubTab] = useState<"tithi" | "rashifal">("tithi");

  // Filter or spotlight moon phase in calendar
  const [moonPhaseFilter, setMoonPhaseFilter] = useState<MoonPhaseType | null>(null);

  // Load selected date panchang
  useEffect(() => {
    setPanchang(getPanchangForDate(selectedDateStr));
  }, [selectedDateStr]);

  // Handle date change
  const handleDateSelect = (dateString: string) => {
    setSelectedDateStr(dateString);
  };

  // Month navigation helpers
  const handlePrevMonth = () => {
    setNavDate(new Date(navDate.getFullYear(), navDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setNavDate(new Date(navDate.getFullYear(), navDate.getMonth() + 1, 1));
  };

  // Calendar calculations
  const year = navDate.getFullYear();
  const month = navDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  // Create calendar grid items
  const calendarDays: { dateStr: string; dayNum: number; isCurrentMonth: boolean }[] = [];
  
  // Padding for previous month
  const prevMonthDays = new Date(year, month, 0).getDate();
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const dNum = prevMonthDays - i;
    const prevDate = new Date(year, month - 1, dNum);
    const dateStr = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, "0")}-${String(dNum).padStart(2, "0")}`;
    calendarDays.push({ dateStr, dayNum: dNum, isCurrentMonth: false });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
    calendarDays.push({ dateStr, dayNum: i, isCurrentMonth: true });
  }

  // Padding for next month to complete grid rows
  const remaining = 42 - calendarDays.length;
  for (let i = 1; i <= remaining; i++) {
    const nextDate = new Date(year, month + 1, i);
    const dateStr = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
    calendarDays.push({ dateStr, dayNum: i, isCurrentMonth: false });
  }

  // Calculate moon phase counts for current month
  const currentMonthDays = calendarDays.filter((d) => d.isCurrentMonth);
  const moonPhaseCounts: { [key in MoonPhaseType]?: number } = {
    new: 0,
    waxing: 0,
    full: 0,
    waning: 0
  };
  currentMonthDays.forEach((d) => {
    const info = getMoonPhaseInfo(d.dateStr);
    moonPhaseCounts[info.phase] = (moonPhaseCounts[info.phase] || 0) + 1;
  });

  // Get festival for any day if any
  const getFestivalForDay = (dateStr: string) => {
    return festivalsData.find((f) => f.date === dateStr);
  };

  const selectedFestival = getFestivalForDay(selectedDateStr);

  return (
    <div id="odia-panchang-app" className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center transition-colors duration-200">
      
      {/* Top Application Header */}
      <header className="w-full max-w-md bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800/80 sticky top-0 z-40 px-5 py-3.5 flex justify-between items-center shadow-sm transition-colors duration-200">
        <div className="flex items-center gap-2">
          <button id="menu-btn" className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition cursor-pointer text-slate-700 dark:text-slate-300">
            <Menu className="w-5 h-5" />
          </button>
          <div className="text-left">
            <h1 className="text-base font-black text-slate-900 dark:text-slate-100 font-display flex items-center gap-1 leading-none">
              ଓଡ଼ିଆ ପାଞ୍ଜି <span className="text-red-600 dark:text-red-500 text-xs font-bold font-sans">v1.2</span>
            </h1>
            <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
              Vedic Panji & Calendar
            </p>
          </div>
        </div>

        {/* Offline access status Badge */}
        <div className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-900/30 shadow-xs">
          <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-500 shrink-0" />
          <span className="text-[9px] font-black uppercase tracking-wider font-sans">
            Cached
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Dark Mode Toggle Button */}
          <button 
            id="dark-mode-toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition cursor-pointer text-slate-700 dark:text-slate-300"
            title="Toggle Dark/Light Mode"
          >
            {darkMode ? <Sun className="w-4.5 h-4.5 text-amber-500 animate-spin-slow" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          <button id="profile-btn" className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition cursor-pointer text-slate-700 dark:text-slate-300">
            <User className="w-4.5 h-4.5" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-md px-4 pt-4 pb-24 overflow-x-hidden">
        
        {/* Dynamic Navigation Views */}
        <AnimatePresence mode="wait">
          {currentView === "panchang" && (
            <motion.div
              key="panchang-view"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.18 }}
              className="space-y-5"
            >
              {/* Daily Header Card from Screenshot 1 & 2 */}
              <HeaderCard panchang={panchang} />

              {/* Integrated Calendar System Box from Screenshot 1 */}
              <div className="bg-slate-200 dark:bg-slate-900/90 rounded-[32px] p-5 border border-slate-300/40 dark:border-slate-800/80 shadow-sm text-center transition-colors duration-200">
                
                {/* Month Name and navigation */}
                <div className="flex justify-between items-center mb-4">
                  <button 
                    onClick={handlePrevMonth}
                    className="p-1.5 bg-white/80 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 rounded-full transition shadow-xs cursor-pointer text-slate-700 dark:text-slate-300"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <div className="font-extrabold text-lg text-slate-800 dark:text-slate-200 font-display">
                    {odiaMonthsNames[month]} {toOdiaDigits(year)}
                  </div>
                  <button 
                    onClick={handleNextMonth}
                    className="p-1.5 bg-white/80 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 rounded-full transition shadow-xs cursor-pointer text-slate-700 dark:text-slate-300"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Dynamic Odia Month Mapping Banner showing exact English calendar dates and Odia text */}
                <OdiaMonthBanner
                  currentMonthIndex={month}
                  currentYear={year}
                  onSelectMonth={(mIdx) => setNavDate(new Date(year, mIdx, 1))}
                />

                {/* Weekdays English/Odia Headers */}
                <div className="grid grid-cols-7 gap-1 mb-2.5">
                  {weekDaysEng.map((eng, idx) => (
                    <div 
                      key={eng}
                      className="flex flex-col items-center py-1 rounded-lg bg-white/90 dark:bg-slate-850 border border-white/40 dark:border-slate-800 shadow-xs transition-colors duration-200"
                    >
                      <span className={`text-[10px] font-black leading-none ${idx === 0 ? "text-red-600 dark:text-red-500" : idx === 6 ? "text-amber-600 dark:text-amber-550" : "text-slate-800 dark:text-slate-200"}`}>
                        {weekDaysOdia[idx]}
                      </span>
                      <span className="text-[8px] font-bold text-slate-400 dark:text-slate-500 tracking-wider font-sans mt-0.5 uppercase">
                        {eng}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((dayItem, idx) => {
                    const isSelected = selectedDateStr === dayItem.dateStr;
                    const hasFest = getFestivalForDay(dayItem.dateStr);
                    const dayObj = new Date(dayItem.dateStr);
                    const isSunday = dayObj.getDay() === 0;

                    // Fetch exact moon phase for this specific day
                    const moonInfo = getMoonPhaseInfo(dayItem.dateStr);
                    const isSpotlighted = moonPhaseFilter ? moonInfo.phase === moonPhaseFilter : false;

                    return (
                      <button
                        key={idx}
                        id={`calendar-day-${dayItem.dateStr}`}
                        onClick={() => handleDateSelect(dayItem.dateStr)}
                        title={`ତା ${toOdiaDigits(dayItem.dayNum)} ${odiaMonthsNames[dayObj.getMonth()]}: ${moonInfo.nameOdia} (${moonInfo.nameEng}) • ${toOdiaDigits(moonInfo.illumination)}% ଆଲୋକିତ${hasFest ? ` • ${hasFest.nameOdia}` : ""}`}
                        className={`aspect-square relative rounded-2xl flex flex-col items-center justify-between py-1 px-0.5 text-xs font-bold transition-all duration-150 cursor-pointer ${
                          !dayItem.isCurrentMonth
                            ? "text-slate-400 dark:text-slate-600 opacity-40 hover:bg-slate-300/30 dark:hover:bg-slate-800/30"
                            : isSelected
                            ? "bg-red-600 dark:bg-red-700 text-white shadow-md scale-105 ring-2 ring-red-400/50"
                            : isSpotlighted
                            ? "bg-amber-100 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 ring-2 ring-amber-500 scale-102"
                            : "hover:bg-slate-300/50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200"
                        }`}
                      >
                        {/* Moon Phase Glyph indicator at top of cell */}
                        <div className="flex items-center justify-center h-3.5 w-full">
                          <MoonPhaseGlyph
                            phase={moonInfo.phase}
                            isSelected={isSelected}
                            size="xs"
                          />
                        </div>

                        {/* Day Number in Odia Numerals */}
                        <span className={`text-[11px] font-black leading-none ${isSunday && !isSelected ? "text-red-600 dark:text-red-400" : ""}`}>
                          {toOdiaDigits(dayItem.dayNum)}
                        </span>

                        {/* Bottom indicator: Festival dot or special full/new moon marker */}
                        <div className="flex items-center justify-center h-2">
                          {hasFest ? (
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white" : "bg-red-600 dark:bg-red-500"} animate-pulse`}
                              title={hasFest.nameOdia}
                            />
                          ) : moonInfo.phase === "full" ? (
                            <span
                              className={`w-1 h-1 rounded-full ${isSelected ? "bg-amber-200" : "bg-amber-500"}`}
                              title="ପୂର୍ଣ୍ଣିମା (Full Moon)"
                            />
                          ) : moonInfo.phase === "new" ? (
                            <span
                              className={`w-1 h-1 rounded-full ${isSelected ? "bg-slate-300" : "bg-slate-500 dark:bg-slate-400"}`}
                              title="ଅମାବାସ୍ୟା (New Moon)"
                            />
                          ) : (
                            <span className="w-1 h-1" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Moon Phase Legend & Quick Spotlight Filter */}
                <MoonPhaseLegend
                  activeFilter={moonPhaseFilter}
                  onSelectFilter={setMoonPhaseFilter}
                  counts={moonPhaseCounts}
                />
              </div>

              {/* Dynamic Holiday/Festival display below calendar matching screenshot 1 */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/50 dark:border-slate-800/80 text-left transition-colors duration-200">
                <p className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-display flex items-center gap-1.5">
                  <span className="text-red-600 dark:text-red-400">ତା {toOdiaDigits(new Date(selectedDateStr).getDate())} {odiaMonthsNames[new Date(selectedDateStr).getMonth()]} :</span>
                  {selectedFestival ? (
                    <span className="text-red-600 dark:text-red-400">{selectedFestival.nameOdia}</span>
                  ) : (
                    <span className="text-slate-500 dark:text-slate-400">ଆଜି କୌଣସି ପାର୍ବପର୍ବାଣୀ ନାହିଁ।</span>
                  )}
                </p>
              </div>

              {/* Selected Day Moon Phase Details Card */}
              <MoonPhaseCard
                moonInfo={getMoonPhaseInfo(selectedDateStr)}
                selectedDateStr={selectedDateStr}
              />

              {/* Big Action Buttons from Screenshot 1 */}
              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={() => setPanchangSubTab("tithi")}
                  className={`w-full py-4 px-6 rounded-2xl text-sm font-black tracking-wider transition-all duration-200 cursor-pointer text-center shadow-sm ${
                    panchangSubTab === "tithi"
                      ? "bg-red-600 dark:bg-red-700 text-white hover:bg-red-700 dark:hover:bg-red-800"
                      : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  ଆଜିର ତିଥି (Tithi Details)
                </button>
                <button
                  onClick={() => setPanchangSubTab("rashifal")}
                  className={`w-full py-4 px-6 rounded-2xl text-sm font-black tracking-wider transition-all duration-200 cursor-pointer text-center shadow-sm ${
                    panchangSubTab === "rashifal"
                      ? "bg-red-600 dark:bg-red-700 text-white hover:bg-red-700 dark:hover:bg-red-800"
                      : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  ଆଜିର ରାଶିଫଳ (Rashifal)
                </button>
              </div>

              {/* Display either Panchang Tabs (Screenshot 2) or Rashifal view (Screenshot 3) */}
              <AnimatePresence mode="wait">
                {panchangSubTab === "tithi" ? (
                  <div key="tithi-tab">
                    <PanchangTabs panchang={panchang} />
                  </div>
                ) : (
                  <div key="rashifal-tab">
                    <RashifalView />
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {currentView === "festivals" && (
            <motion.div
              key="festivals-view"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.18 }}
            >
              <FestivalDetails />
            </motion.div>
          )}

          {currentView === "ai_assistant" && (
            <motion.div
              key="ai-assistant-view"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.18 }}
            >
              <AiAstroAssistant />
            </motion.div>
          )}

          {currentView === "notifications" && (
            <motion.div
              key="notifications-view"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.18 }}
            >
              <NotificationSettings />
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Bottom Floating Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 shadow-lg py-2.5 max-w-md mx-auto rounded-t-3xl flex justify-around transition-colors duration-200">
        
        <button
          onClick={() => setCurrentView("panchang")}
          className={`flex flex-col items-center gap-1 transition-all duration-200 cursor-pointer ${
            currentView === "panchang" ? "text-red-600 dark:text-red-500 scale-105" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
          }`}
        >
          <CalendarIcon className="w-5 h-5" />
          <span className="text-[10px] font-black">ପାଞ୍ଜି</span>
        </button>

        <button
          onClick={() => setCurrentView("festivals")}
          className={`flex flex-col items-center gap-1 transition-all duration-200 cursor-pointer ${
            currentView === "festivals" ? "text-red-600 dark:text-red-500 scale-105" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] font-black">ପର୍ବପର୍ବାଣୀ</span>
        </button>

        <button
          onClick={() => setCurrentView("ai_assistant")}
          className={`flex flex-col items-center gap-1 transition-all duration-200 cursor-pointer ${
            currentView === "ai_assistant" ? "text-red-600 dark:text-red-500 scale-105" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] font-black">AI ସାଥୀ</span>
        </button>

        <button
          onClick={() => setCurrentView("notifications")}
          className={`flex flex-col items-center gap-1 transition-all duration-200 cursor-pointer ${
            currentView === "notifications" ? "text-red-600 dark:text-red-500 scale-105" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
          }`}
        >
          <Bell className="w-5 h-5" />
          <span className="text-[10px] font-black">ନୋଟିଫିକେସନ୍</span>
        </button>

      </nav>
      
    </div>
  );
}
