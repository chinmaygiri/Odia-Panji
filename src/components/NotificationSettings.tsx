import React, { useState, useEffect } from "react";
import { Bell, BellOff, Volume2, Sparkles, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NotificationAlert {
  id: string;
  title: string;
  body: string;
}

export default function NotificationSettings() {
  const [permission, setPermission] = useState<string>("default");
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [sankrantiAlerts, setSankrantiAlerts] = useState(true);
  const [purnimaAlerts, setPurnimaAlerts] = useState(true);
  
  // Simulated alerts state
  const [simulatedAlerts, setSimulatedAlerts] = useState<NotificationAlert[]>([]);

  useEffect(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestBrowserPermission = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications.");
      return;
    }
    const result = await Notification.requestPermission();
    setPermission(result);
  };

  const triggerSimulatedAlert = () => {
    const messages = [
      {
        title: "🔔 ପୁଶ୍ ସୂଚନା: ଓଡ଼ିଶା ଗଣପର୍ବ",
        body: "କାଲି ପବିତ୍ର ରଥଯାତ୍ରା! ଶ୍ରୀମନ୍ଦିରରେ ମହାପ୍ରଭୁଙ୍କ ପହଣ୍ଡି ବିଜେ ଓ ରଥଯାତ୍ରା ସୂଚୀ ଦେଖନ୍ତୁ।"
      },
      {
        title: "🔔 ପୁଶ୍ ସୂଚନା: ନିଷିଦ୍ଧ ଖାଦ୍ୟ ସତର୍କତା",
        body: "ଆଜି ଅଷ୍ଟମୀ ତିଥି ହେତୁ ପାଞ୍ଜି ଅନୁସାରେ ନଡ଼ିଆ ଖାଇବା ସମ୍ପୂର୍ଣ୍ଣ ନିଷିଦ୍ଧ ଅଟେ।"
      },
      {
        title: "🔔 ପୁଶ୍ ସୂଚନା: କାର୍ତ୍ତିକ ପୂର୍ଣ୍ଣିମା ସ୍ମାରକ",
        body: "ଆସନ୍ତାକାଲି ବୋଇତ ବନ୍ଦାଣ ଉତ୍ସବ! ଭୋର ସମୟର ଶୁଭ ମୁହୂର୍ତ୍ତରେ ନିଜ ବୋଇତ ଭସାନ୍ତୁ।"
      },
      {
        title: "🔔 ପୁଶ୍ ସୂଚନା: ପ୍ରଥମାଷ୍ଟମୀ ପର୍ବ",
        body: "ଆଜି ପବିତ୍ର ପ୍ରଥମାଷ୍ଟମୀ! ଆଜିର ପୋଢୁଆଁ ବିଧି ଓ ଏଣ୍ଡୁରି ପିଠାର ଶୁଭ ରୀତିନୀତି ପାଳନ୍ତୁ।"
      }
    ];

    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    const newAlert: NotificationAlert = {
      id: Date.now().toString(),
      title: randomMsg.title,
      body: randomMsg.body
    };

    // Play synthesized sound if enabled
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      console.log("Audio not allowed yet", e);
    }

    // Try showing real browser notification
    if (permission === "granted") {
      new Notification(randomMsg.title, {
        body: randomMsg.body,
        icon: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=128&h=128&q=80"
      });
    }

    // Always show on-screen simulated notification
    setSimulatedAlerts((prev) => [...prev, newAlert]);

    // Auto dismiss after 6 seconds
    setTimeout(() => {
      setSimulatedAlerts((prev) => prev.filter((a) => a.id !== newAlert.id));
    }, 6000);
  };

  return (
    <div id="notifications-settings-container" className="max-w-md mx-auto mt-6 bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200/40 dark:border-slate-800/80 transition-colors duration-200">
      
      {/* Title */}
      <h2 className="text-sm font-black text-slate-900 dark:text-slate-100 font-display mb-4 text-left flex items-center gap-2">
        <Bell className="w-5 h-5 text-red-600 dark:text-red-400 animate-swing" />
        ପର୍ବପର୍ବାଣୀ ପୁଶ୍ ନୋଟିଫିକେସନ୍ ସୂଚୀ
      </h2>

      {/* Description */}
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-sans leading-relaxed text-left mb-5">
        ଓଡ଼ିଶାର ସମସ୍ତ ମୁଖ୍ୟ ଓଷା, ବ୍ରତ, ମେଳଣ, ସଂକ୍ରାନ୍ତି ଏବଂ ପୂର୍ଣ୍ଣିମା ପୂର୍ବରୁ ସ୍ୱୟଂଚାଳିତ ଭାବେ ଆପଣଙ୍କ ମୋବାଇଲ କିମ୍ବା ଡେସ୍କଟପରେ ସୂଚନା ପ୍ରାପ୍ତ କରନ୍ତୁ।
      </p>

      {/* Browser permission card */}
      <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-4 border border-slate-150 dark:border-slate-800 text-left mb-5">
        <div className="flex justify-between items-start gap-3">
          <div>
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200">ସିଷ୍ଟମ ନୋଟିଫିକେସନ୍ ଅନୁମତି</h4>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-1 uppercase font-sans">
              Status: {permission === "granted" ? "granted (ଅନୁମତି ପ୍ରାପ୍ତ)" : permission === "denied" ? "denied" : "pending (ଅପେକ୍ଷା)"}
            </p>
          </div>
          {permission !== "granted" ? (
            <button
              onClick={requestBrowserPermission}
              className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-[10px] px-3.5 py-2 rounded-xl transition-all duration-200 cursor-pointer"
            >
              ଅନୁମତି ଦିଅନ୍ତୁ
            </button>
          ) : (
            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-xs bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-1.5 rounded-full border border-emerald-100 dark:border-emerald-900/40">
              <CheckCircle2 className="w-4 h-4" />
              <span>ସକ୍ରିୟ ଅଛି</span>
            </div>
          )}
        </div>
      </div>

      {/* Toggles list */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200">ମୁଖ୍ୟ ଓଷା ଓ ବ୍ରତ ସୂଚନା</h4>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-0.5">ସାବିତ୍ରୀ ବ୍ରତ, ପ୍ରଥମାଷ୍ଟମୀ ଆଦିର ସତର୍କତା</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={alertsEnabled}
              onChange={() => setAlertsEnabled(!alertsEnabled)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 dark:bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 dark:after:border-slate-650 after:border after:rounded-full after:h-5 after:width-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-left">
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200">ମାସିକ ସଂକ୍ରାନ୍ତି ସୂଚନା</h4>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-0.5">ସୌର ମାସ ପରିବର୍ତ୍ତନ ସମୟର ସତର୍କତା</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={sankrantiAlerts}
              onChange={() => setSankrantiAlerts(!sankrantiAlerts)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 dark:bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 dark:after:border-slate-650 after:border after:rounded-full after:h-5 after:width-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-left">
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200">ପୂର୍ଣ୍ଣିମା ଓ ଅମାବାସ୍ୟା ସୂଚନା</h4>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-0.5">ପාଞ୍ଜି ପୂଜା ଏବଂ ନିଷିଦ୍ଧ ଖାଦ୍ୟ ସତର୍କତା</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={purnimaAlerts}
              onChange={() => setPurnimaAlerts(!purnimaAlerts)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 dark:bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 dark:after:border-slate-650 after:border after:rounded-full after:h-5 after:width-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
          </label>
        </div>
      </div>

      {/* Notification Simulator trigger */}
      <button
        onClick={triggerSimulatedAlert}
        className="w-full bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-extrabold py-3 rounded-2xl text-xs tracking-wider flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-sm"
      >
        <Send className="w-4 h-4 text-orange-400 animate-pulse" />
        <span>ନୋଟିଫିକେସନ୍ ପରୀକ୍ଷା କରନ୍ତୁ (Test Alert)</span>
      </button>

      {/* Floating On-Screen Simulated System Alerts Container */}
      <div className="fixed top-4 left-4 right-4 z-50 flex flex-col gap-3 pointer-events-none max-w-sm mx-auto">
        <AnimatePresence>
          {simulatedAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-2xl p-4 shadow-xl text-left pointer-events-auto flex gap-3 items-start"
            >
              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white shrink-0 mt-0.5">
                <Volume2 className="w-4 h-4 animate-bounce" />
              </div>
              <div className="flex-1">
                <h5 className="text-xs font-black text-white flex items-center justify-between">
                  <span>{alert.title}</span>
                  <span className="text-[9px] text-slate-400 font-sans">NOW</span>
                </h5>
                <p className="text-[11px] font-semibold text-slate-300 leading-relaxed font-sans mt-1">
                  {alert.body}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
