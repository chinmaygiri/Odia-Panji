import React, { useState } from "react";
import { DayPanchang } from "../data/panchangData";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Sparkles, Moon, HelpCircle, Utensils, Heart, Calendar, Compass, Star } from "lucide-react";

interface PanchangTabsProps {
  panchang: DayPanchang;
}

export default function PanchangTabs({ panchang }: PanchangTabsProps) {
  const [activeTab, setActiveTab] = useState<string>("tarashuddhi");

  const tabs = [
    { id: "yogini", label: "ଯୋଗିନୀ ସ୍ଥିତି ଓ ଦୂରଯାତ୍ରା", icon: Compass },
    { id: "tarashuddhi", label: "ତାରାଶୁଦ୍ଧି", icon: Star },
    { id: "chandrashuddhi", label: "ଚନ୍ଦ୍ର ଶୁଦ୍ଧି", icon: Moon },
    { id: "ghatachandra", label: "ଘାତଚନ୍ଦ୍ର", icon: Shield },
    { id: "mruta", label: "ଆଜି ମୃତବ୍ୟକ୍ତି ର", icon: HelpCircle },
    { id: "bibidha", label: "ବିବିଧ", icon: Sparkles },
    { id: "jata", label: "ଆଜି ଜାତ ଶିଶୁର", icon: Heart },
    { id: "asubhabela", label: "ଅଶୁଭବେଳା", icon: Shield },
    { id: "nisiddha", label: "ନିଷିଦ୍ଧ ଖାଦ୍ୟ", icon: Utensils },
    { id: "subhakarma", label: "ଶୁଭକର୍ମ", icon: Calendar },
    { id: "subhabela", label: "ଶୁଭବେଳା", icon: Sparkles },
  ];

  const getTabContent = () => {
    switch (activeTab) {
      case "yogini":
        return {
          title: "ଯୋଗିନୀ ସ୍ଥିତି ଓ ଦୂରଯାତ୍ରା (Yogini Position)",
          desc: panchang.yoginiStatus,
          color: "bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950/20 dark:text-amber-200 dark:border-amber-900/40"
        };
      case "tarashuddhi":
        return {
          title: "ତାରାଶୁଦ୍ଧି (Star Compatibility)",
          desc: panchang.tarashuddhi,
          color: "bg-red-50 text-red-900 border-red-200 dark:bg-red-950/20 dark:text-red-200 dark:border-red-900/40"
        };
      case "chandrashuddhi":
        return {
          title: "ଚନ୍ଦ୍ର ଶୁଦ୍ଧି (Moon Sign Benefaction)",
          desc: panchang.chandrashuddhi,
          color: "bg-sky-50 text-sky-900 border-sky-200 dark:bg-sky-950/20 dark:text-sky-200 dark:border-sky-900/40"
        };
      case "ghatachandra":
        return {
          title: "ଘାତଚନ୍ଦ୍ର (Inauspicious Moon Transit)",
          desc: panchang.ghatachandra,
          color: "bg-rose-50 text-rose-950 border-rose-200 dark:bg-rose-950/20 dark:text-rose-200 dark:border-rose-900/40"
        };
      case "mruta":
        return {
          title: "ଆଜି ମୃତବ୍ୟକ୍ତି ର (Death Dosha & Rituals)",
          desc: panchang.mrutaByakti,
          color: "bg-slate-50 text-slate-900 border-slate-200 dark:bg-slate-800/40 dark:text-slate-200 dark:border-slate-700/40"
        };
      case "bibidha":
        return {
          title: "ବିବିଧ ସୂଚନା (Miscellaneous)",
          desc: panchang.mishra,
          color: "bg-indigo-50 text-indigo-900 border-indigo-200 dark:bg-indigo-950/20 dark:text-indigo-200 dark:border-indigo-900/40"
        };
      case "jata":
        return {
          title: "ଆଜି ଜାତ ଶିଶୁର (Newborn Astrological Details)",
          desc: panchang.jataSisura,
          color: "bg-pink-50 text-pink-900 border-pink-200 dark:bg-pink-950/20 dark:text-pink-200 dark:border-pink-900/40"
        };
      case "asubhabela":
        return {
          title: "ଅଶୁଭବେଳା (Inauspicious Times)",
          desc: `• ରାହୁକାଳ: ${panchang.asubhaBela.rahukala}\n• କାଳବେଳା: ${panchang.asubhaBela.kalabela}\n• ବାରବେଳା: ${panchang.asubhaBela.barabela}\n\n*ଏହି ସମୟଗୁଡିକରେ କୌଣସି ଶୁଭ କାର୍ଯ୍ୟର ଶୁଭାରମ୍ଭ କରିବା ଅନୁଚିତ।`,
          color: "bg-neutral-50 text-neutral-900 border-neutral-200 dark:bg-slate-800/40 dark:text-slate-200 dark:border-slate-700/40"
        };
      case "nisiddha":
        return {
          title: "ନିଷିଦ୍ଧ ଖାଦ୍ୟ (Forbidden Food for Tithi)",
          desc: panchang.nisiddhaKhadya,
          color: "bg-orange-50 text-orange-950 border-orange-200 dark:bg-orange-950/20 dark:text-orange-200 dark:border-orange-900/40"
        };
      case "subhakarma":
        return {
          title: "ଶୁଭକର୍ମ (Auspicious Actions)",
          desc: panchang.subhaKarma,
          color: "bg-emerald-50 text-emerald-950 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-200 dark:border-emerald-900/40"
        };
      case "subhabela":
        return {
          title: "ଶୁଭବେଳା (Auspicious Times)",
          desc: `• ଅମୃତ ବେଳା: ${panchang.subhaBela.amruta}\n• ମାହେନ୍ଦ୍ର ବେଳା: ${panchang.subhaBela.mahendra}\n\n*ଏହି ସମୟରେ ଯାତ୍ରା କିମ୍ବା ନୂତନ ଶୁଭକର୍ମ ଅତ୍ୟନ୍ତ ମଙ୍ଗଳମୟ ହୋଇଥାଏ।`,
          color: "bg-teal-50 text-teal-950 border-teal-200 dark:bg-teal-950/20 dark:text-teal-200 dark:border-teal-900/40"
        };
      default:
        return { title: "", desc: "", color: "bg-slate-50 text-slate-900 border-slate-200 dark:bg-slate-800/40 dark:text-slate-200 dark:border-slate-700/40" };
    }
  };

  const content = getTabContent();

  return (
    <div id="panchang-tabs-container" className="max-w-md mx-auto mt-6 bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200/40 dark:border-slate-800/80 transition-colors duration-200">
      {/* Scrollable selectors list */}
      <div className="flex flex-wrap gap-2 justify-center mb-5">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              id={`tab-btn-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 border cursor-pointer ${
                isActive
                  ? "bg-red-600 border-red-600 text-white shadow-sm scale-102"
                  : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/70 dark:bg-slate-800 dark:border-slate-750 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Information display area with transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className={`rounded-2xl p-5 border text-left leading-relaxed font-sans shadow-inner ${content.color}`}
        >
          <div className="text-sm font-bold border-b border-current/10 pb-2 mb-3 tracking-wide flex items-center justify-between">
            <span>{content.title}</span>
            <span className="text-[10px] uppercase font-bold tracking-widest bg-current/10 px-2 py-0.5 rounded-full">
              ଓଡ଼ିଆ ପାଞ୍ଜି
            </span>
          </div>
          <p className="text-sm font-medium whitespace-pre-line leading-relaxed tracking-wide">
            {content.desc}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
