import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth, handleFirestoreError, OperationType } from "../firebase";
import {
  DayPanchang,
  Festival,
  RashiRashifal,
  getPanchangForDate as getGivenSeedPanchangForDate,
  festivalsData as givenFestivalsSeed,
  rashifalData as givenRashifalSeed,
} from "../data/panchangData";
import {
  OdiaMonthMapping,
  ODIA_MONTH_MAPPINGS as givenMonthMappingsSeed,
} from "../data/odiaMonthMapping";

// Verbatim validation constants synchronized with firebase-blueprint.json and firestore.rules
export const VALIDATION_CONSTRAINTS = {
  ID_PATTERN: /^[a-zA-Z0-9_\-]+$/,
  DATE_PATTERN: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
  MAX_ID_LEN: 128,
  MAX_DATE_LEN: 10,
  PANCHANG: {
    dayOfWeekEng: 20,
    dayOfWeekOdia: 30,
    solarDateOdia: 50,
    solarMonthOdia: 40,
    lunarMonthOdia: 40,
    pakshaOdia: 40,
    tithiOdia: 50,
    tithiEnd: 80,
    nakshatraOdia: 50,
    nakshatraEnd: 80,
    rashiOdia: 40,
    rashiEnd: 80,
    sunrise: 20,
    sunset: 20,
    sunriseOdia: 20,
    sunsetOdia: 20,
    dayLength: 20,
    yoginiStatus: 300,
    tarashuddhi: 400,
    chandrashuddhi: 300,
    ghatachandra: 300,
    mrutaByakti: 300,
    jataSisura: 300,
    rahukala: 100,
    kalabela: 100,
    barabela: 100,
    amrutaBela: 150,
    mahendraBela: 150,
    nisiddhaKhadya: 300,
    subhaKarma: 300,
    mishra: 300,
  },
  FESTIVAL: {
    nameOdia: 120,
    nameEng: 120,
    monthOdia: 50,
    tithi: 80,
    description: 1000,
    rituals: 1000,
    pitha: 200,
    significance: 400,
  },
  RASHIFAL: {
    nameOdia: 40,
    nameEng: 40,
    icon: 16,
    prediction: 1000,
    color: 20,
    luckyColor: 50,
  },
  MONTH_MAPPING: {
    gregorianMonthEng: 30,
    gregorianMonthOdia: 40,
    firstPartOdia: 60,
    firstPartEndDateOdia: 60,
    sankrantiOdia: 80,
    sankrantiDateOdia: 50,
    secondPartOdia: 60,
    secondPartStartDateOdia: 60,
    traditionalPanjiPeriod: 150,
    solarTransitionOdia: 100,
    lunarTransitionOdia: 100,
    detailDescriptionOdia: 400,
  },
};

function sanitizeString(value: string | undefined, maxLen: number): string {
  return String(value ?? "").trim().slice(0, maxLen);
}

// Convert Firestore PanchangDay document to DayPanchang interface
export function docToDayPanchang(data: Record<string, any>): DayPanchang {
  return {
    date: String(data.date || ""),
    dayOfWeekEng: String(data.dayOfWeekEng || ""),
    dayOfWeekOdia: String(data.dayOfWeekOdia || ""),
    solarDateOdia: String(data.solarDateOdia || ""),
    solarMonthOdia: String(data.solarMonthOdia || ""),
    solarDay: Number(data.solarDay || 1),
    lunarMonthOdia: String(data.lunarMonthOdia || ""),
    pakshaOdia: String(data.pakshaOdia || ""),
    tithiOdia: String(data.tithiOdia || ""),
    tithiEnd: String(data.tithiEnd || ""),
    nakshatraOdia: String(data.nakshatraOdia || ""),
    nakshatraEnd: String(data.nakshatraEnd || ""),
    rashiOdia: String(data.rashiOdia || ""),
    rashiEnd: String(data.rashiEnd || ""),
    sunrise: String(data.sunrise || ""),
    sunset: String(data.sunset || ""),
    sunriseOdia: String(data.sunriseOdia || ""),
    sunsetOdia: String(data.sunsetOdia || ""),
    dayLength: String(data.dayLength || ""),
    yoginiStatus: String(data.yoginiStatus || ""),
    tarashuddhi: String(data.tarashuddhi || ""),
    chandrashuddhi: String(data.chandrashuddhi || ""),
    ghatachandra: String(data.ghatachandra || ""),
    mrutaByakti: String(data.mrutaByakti || ""),
    jataSisura: String(data.jataSisura || ""),
    asubhaBela: {
      rahukala: String(data.rahukala || ""),
      kalabela: String(data.kalabela || ""),
      barabela: String(data.barabela || ""),
    },
    subhaBela: {
      amruta: String(data.amrutaBela || ""),
      mahendra: String(data.mahendraBela || ""),
    },
    nisiddhaKhadya: String(data.nisiddhaKhadya || ""),
    subhaKarma: String(data.subhaKarma || ""),
    mishra: String(data.mishra || ""),
  };
}

// Convert Firestore FestivalRecord document to Festival interface
export function docToFestival(data: Record<string, any>): Festival {
  const ritualsStr = String(data.rituals || "");
  return {
    id: String(data.id || ""),
    nameOdia: String(data.nameOdia || ""),
    nameEng: String(data.nameEng || ""),
    date: String(data.date || ""),
    monthOdia: String(data.monthOdia || ""),
    tithi: String(data.tithi || ""),
    description: String(data.description || ""),
    rituals: ritualsStr
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    pitha: String(data.pitha || ""),
    significance: String(data.significance || ""),
  };
}

// Convert Firestore RashifalRecord document to RashiRashifal interface
export function docToRashifal(data: Record<string, any>): RashiRashifal {
  return {
    id: String(data.id || ""),
    nameOdia: String(data.nameOdia || ""),
    nameEng: String(data.nameEng || ""),
    icon: String(data.icon || ""),
    prediction: String(data.prediction || ""),
    color: String(data.color || "#EF4444"),
    luckyNumber: Number(data.luckyNumber || 1),
    luckyColor: String(data.luckyColor || ""),
  };
}

// Convert Firestore MonthMappingRecord document to OdiaMonthMapping interface
export function docToMonthMapping(data: Record<string, any>): OdiaMonthMapping {
  return {
    monthIndex: Number(data.monthIndex ?? 0),
    gregorianMonthEng: String(data.gregorianMonthEng || ""),
    gregorianMonthOdia: String(data.gregorianMonthOdia || ""),
    firstPartOdia: String(data.firstPartOdia || ""),
    firstPartEndDateOdia: String(data.firstPartEndDateOdia || ""),
    firstPartEndDay: Number(data.firstPartEndDay || 14),
    sankrantiOdia: String(data.sankrantiOdia || ""),
    sankrantiDateOdia: String(data.sankrantiDateOdia || ""),
    secondPartOdia: String(data.secondPartOdia || ""),
    secondPartStartDateOdia: String(data.secondPartStartDateOdia || ""),
    secondPartStartDay: Number(data.secondPartStartDay || 15),
    traditionalPanjiPeriod: String(data.traditionalPanjiPeriod || ""),
    solarTransitionOdia: String(data.solarTransitionOdia || ""),
    lunarTransitionOdia: String(data.lunarTransitionOdia || ""),
    detailDescriptionOdia: String(data.detailDescriptionOdia || ""),
  };
}

// Build sanitized payload for PanchangDay
function buildPanchangPayload(panchang: DayPanchang, uid: string, isUpdate: boolean, existingCreatedAt?: any) {
  const C = VALIDATION_CONSTRAINTS.PANCHANG;
  const solarDayInt = Math.max(1, Math.min(32, Math.round(Number(panchang.solarDay) || 1)));
  const base = {
    date: sanitizeString(panchang.date, VALIDATION_CONSTRAINTS.MAX_DATE_LEN),
    dayOfWeekEng: sanitizeString(panchang.dayOfWeekEng, C.dayOfWeekEng),
    dayOfWeekOdia: sanitizeString(panchang.dayOfWeekOdia, C.dayOfWeekOdia),
    solarDateOdia: sanitizeString(panchang.solarDateOdia, C.solarDateOdia),
    solarMonthOdia: sanitizeString(panchang.solarMonthOdia, C.solarMonthOdia),
    solarDay: solarDayInt,
    lunarMonthOdia: sanitizeString(panchang.lunarMonthOdia, C.lunarMonthOdia),
    pakshaOdia: sanitizeString(panchang.pakshaOdia, C.pakshaOdia),
    tithiOdia: sanitizeString(panchang.tithiOdia, C.tithiOdia),
    tithiEnd: sanitizeString(panchang.tithiEnd, C.tithiEnd),
    nakshatraOdia: sanitizeString(panchang.nakshatraOdia, C.nakshatraOdia),
    nakshatraEnd: sanitizeString(panchang.nakshatraEnd, C.nakshatraEnd),
    rashiOdia: sanitizeString(panchang.rashiOdia, C.rashiOdia),
    rashiEnd: sanitizeString(panchang.rashiEnd, C.rashiEnd),
    sunrise: sanitizeString(panchang.sunrise, C.sunrise),
    sunset: sanitizeString(panchang.sunset, C.sunset),
    sunriseOdia: sanitizeString(panchang.sunriseOdia || panchang.sunrise, C.sunriseOdia),
    sunsetOdia: sanitizeString(panchang.sunsetOdia || panchang.sunset, C.sunsetOdia),
    dayLength: sanitizeString(panchang.dayLength || "12h 00m", C.dayLength),
    yoginiStatus: sanitizeString(panchang.yoginiStatus, C.yoginiStatus),
    tarashuddhi: sanitizeString(panchang.tarashuddhi, C.tarashuddhi),
    chandrashuddhi: sanitizeString(panchang.chandrashuddhi, C.chandrashuddhi),
    ghatachandra: sanitizeString(panchang.ghatachandra, C.ghatachandra),
    mrutaByakti: sanitizeString(panchang.mrutaByakti, C.mrutaByakti),
    jataSisura: sanitizeString(panchang.jataSisura, C.jataSisura),
    rahukala: sanitizeString(panchang.asubhaBela.rahukala, C.rahukala),
    kalabela: sanitizeString(panchang.asubhaBela.kalabela, C.kalabela),
    barabela: sanitizeString(panchang.asubhaBela.barabela, C.barabela),
    amrutaBela: sanitizeString(panchang.subhaBela.amruta, C.amrutaBela),
    mahendraBela: sanitizeString(panchang.subhaBela.mahendra, C.mahendraBela),
    nisiddhaKhadya: sanitizeString(panchang.nisiddhaKhadya, C.nisiddhaKhadya),
    subhaKarma: sanitizeString(panchang.subhaKarma, C.subhaKarma),
    mishra: sanitizeString(panchang.mishra, C.mishra),
    isPublic: true,
    updatedByUid: sanitizeString(uid, VALIDATION_CONSTRAINTS.MAX_ID_LEN),
    updatedAt: serverTimestamp(),
  };

  if (isUpdate && existingCreatedAt) {
    return { ...base, createdAt: existingCreatedAt };
  }
  return { ...base, createdAt: serverTimestamp() };
}

// Save or update a PanchangDay record in Firestore database
export async function savePanchangDayToDb(panchang: DayPanchang): Promise<void> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("ଡାଟାବେସରେ ତଥ୍ୟ ସଂରକ୍ଷଣ କରିବା ପାଇଁ ଦୟାକରି ପ୍ରଥମେ ଗୁଗୁଲ୍ (Google) ମାଧ୍ୟମରେ ଲগ୍-ଇନ୍ କରନ୍ତୁ।");
  }
  const dateStr = panchang.date;
  if (!VALIDATION_CONSTRAINTS.DATE_PATTERN.test(dateStr)) {
    throw new Error("Invalid date format. Expected YYYY-MM-DD.");
  }

  const docPath = `panchangDays/${dateStr}`;
  const docRef = doc(db, "panchangDays", dateStr);

  try {
    const existingSnap = await getDoc(docRef);
    if (existingSnap.exists()) {
      const payload = buildPanchangPayload(panchang, user.uid, true, existingSnap.data().createdAt);
      await updateDoc(docRef, payload);
    } else {
      const payload = buildPanchangPayload(panchang, user.uid, false);
      await setDoc(docRef, payload);
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

// Fetch a single date's Panchang from the Firestore database (falling back to given local database seed if not yet stored in cloud)
export async function fetchPanchangDayFromDb(
  dateStr: string
): Promise<{ panchang: DayPanchang; source: "firestore_db" | "given_local_db" }> {
  if (!VALIDATION_CONSTRAINTS.DATE_PATTERN.test(dateStr)) {
    return { panchang: getGivenSeedPanchangForDate(dateStr), source: "given_local_db" };
  }

  const docPath = `panchangDays/${dateStr}`;
  const docRef = doc(db, "panchangDays", dateStr);

  try {
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return {
        panchang: docToDayPanchang(snap.data()),
        source: "firestore_db",
      };
    }
  } catch (error) {
    // If document doesn't exist yet or permission check on missing non-public doc, fall back to given database seed
    console.warn("Using given database record for date:", dateStr);
  }

  const seedRecord = getGivenSeedPanchangForDate(dateStr);
  // If user is authenticated with verified email, automatically persist this date into the Firestore database
  if (auth.currentUser && auth.currentUser.emailVerified) {
    try {
      const payload = buildPanchangPayload(seedRecord, auth.currentUser.uid, false);
      await setDoc(docRef, payload);
      return { panchang: seedRecord, source: "firestore_db" };
    } catch (writeErr) {
      handleFirestoreError(writeErr, OperationType.CREATE, docPath);
    }
  }

  return {
    panchang: seedRecord,
    source: "given_local_db",
  };
}

// Save or update a Festival record in Firestore database
export async function saveFestivalToDb(festival: Festival): Promise<void> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("ଡାଟାବେସରେ ପର୍ବପର୍ବାଣୀ ସଂରକ୍ଷଣ କରିବା ପାଇଁ ଦୟାକରି ପ୍ରଥମେ ଲগ୍-ଇନ୍ କରନ୍ତୁ।");
  }
  const cleanId = sanitizeString(
    festival.id.replace(/[^a-zA-Z0-9_\-]/g, "_"),
    VALIDATION_CONSTRAINTS.MAX_ID_LEN
  );
  if (!VALIDATION_CONSTRAINTS.ID_PATTERN.test(cleanId)) {
    throw new Error("Invalid festival ID.");
  }

  const F = VALIDATION_CONSTRAINTS.FESTIVAL;
  const docPath = `festivals/${cleanId}`;
  const docRef = doc(db, "festivals", cleanId);

  try {
    const existingSnap = await getDoc(docRef);
    const base = {
      id: cleanId,
      nameOdia: sanitizeString(festival.nameOdia, F.nameOdia),
      nameEng: sanitizeString(festival.nameEng, F.nameEng),
      date: sanitizeString(festival.date, VALIDATION_CONSTRAINTS.MAX_DATE_LEN),
      monthOdia: sanitizeString(festival.monthOdia, F.monthOdia),
      tithi: sanitizeString(festival.tithi, F.tithi),
      description: sanitizeString(festival.description, F.description),
      rituals: sanitizeString(festival.rituals.join("\n"), F.rituals),
      pitha: sanitizeString(festival.pitha, F.pitha),
      significance: sanitizeString(festival.significance, F.significance),
      isPublic: true,
      updatedByUid: sanitizeString(user.uid, VALIDATION_CONSTRAINTS.MAX_ID_LEN),
      updatedAt: serverTimestamp(),
    };

    if (existingSnap.exists()) {
      await updateDoc(docRef, {
        ...base,
        createdAt: existingSnap.data().createdAt,
      });
    } else {
      await setDoc(docRef, {
        ...base,
        createdAt: serverTimestamp(),
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

// Delete a Festival record from Firestore database
export async function deleteFestivalFromDb(festivalId: string): Promise<void> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Please sign in to delete a festival record.");
  }
  const docPath = `festivals/${festivalId}`;
  try {
    await deleteDoc(doc(db, "festivals", festivalId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, docPath);
  }
}

// Save or update a Rashifal record in Firestore database
export async function saveRashifalToDb(rashi: RashiRashifal): Promise<void> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Please sign in to update Rashifal in the database.");
  }
  const cleanId = sanitizeString(
    rashi.id.replace(/[^a-zA-Z0-9_\-]/g, "_"),
    VALIDATION_CONSTRAINTS.MAX_ID_LEN
  );
  const R = VALIDATION_CONSTRAINTS.RASHIFAL;
  const docPath = `rashifals/${cleanId}`;
  const docRef = doc(db, "rashifals", cleanId);

  try {
    const existingSnap = await getDoc(docRef);
    const base = {
      id: cleanId,
      nameOdia: sanitizeString(rashi.nameOdia, R.nameOdia),
      nameEng: sanitizeString(rashi.nameEng, R.nameEng),
      icon: sanitizeString(rashi.icon, R.icon),
      prediction: sanitizeString(rashi.prediction, R.prediction),
      color: sanitizeString(rashi.color, R.color),
      luckyNumber: Math.max(1, Math.min(99, Math.round(Number(rashi.luckyNumber) || 1))),
      luckyColor: sanitizeString(rashi.luckyColor, R.luckyColor),
      isPublic: true,
      updatedByUid: sanitizeString(user.uid, VALIDATION_CONSTRAINTS.MAX_ID_LEN),
      updatedAt: serverTimestamp(),
    };

    if (existingSnap.exists()) {
      await updateDoc(docRef, {
        ...base,
        createdAt: existingSnap.data().createdAt,
      });
    } else {
      await setDoc(docRef, {
        ...base,
        createdAt: serverTimestamp(),
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

// Save or update a MonthMapping record in Firestore database
export async function saveMonthMappingToDb(mapping: OdiaMonthMapping): Promise<void> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Please sign in to update Month Mapping in the database.");
  }
  const monthIdx = Math.max(0, Math.min(11, Math.round(Number(mapping.monthIndex) || 0)));
  const docId = `month_${monthIdx}`;
  const M = VALIDATION_CONSTRAINTS.MONTH_MAPPING;
  const docPath = `monthMappings/${docId}`;
  const docRef = doc(db, "monthMappings", docId);

  try {
    const existingSnap = await getDoc(docRef);
    const base = {
      monthIndex: monthIdx,
      gregorianMonthEng: sanitizeString(mapping.gregorianMonthEng, M.gregorianMonthEng),
      gregorianMonthOdia: sanitizeString(mapping.gregorianMonthOdia, M.gregorianMonthOdia),
      firstPartOdia: sanitizeString(mapping.firstPartOdia, M.firstPartOdia),
      firstPartEndDateOdia: sanitizeString(mapping.firstPartEndDateOdia, M.firstPartEndDateOdia),
      firstPartEndDay: Math.max(1, Math.min(31, Math.round(Number(mapping.firstPartEndDay) || 14))),
      sankrantiOdia: sanitizeString(mapping.sankrantiOdia, M.sankrantiOdia),
      sankrantiDateOdia: sanitizeString(mapping.sankrantiDateOdia, M.sankrantiDateOdia),
      secondPartOdia: sanitizeString(mapping.secondPartOdia, M.secondPartOdia),
      secondPartStartDateOdia: sanitizeString(mapping.secondPartStartDateOdia, M.secondPartStartDateOdia),
      secondPartStartDay: Math.max(1, Math.min(31, Math.round(Number(mapping.secondPartStartDay) || 15))),
      traditionalPanjiPeriod: sanitizeString(mapping.traditionalPanjiPeriod, M.traditionalPanjiPeriod),
      solarTransitionOdia: sanitizeString(mapping.solarTransitionOdia, M.solarTransitionOdia),
      lunarTransitionOdia: sanitizeString(mapping.lunarTransitionOdia, M.lunarTransitionOdia),
      detailDescriptionOdia: sanitizeString(mapping.detailDescriptionOdia, M.detailDescriptionOdia),
      isPublic: true,
      updatedByUid: sanitizeString(user.uid, VALIDATION_CONSTRAINTS.MAX_ID_LEN),
      updatedAt: serverTimestamp(),
    };

    if (existingSnap.exists()) {
      await updateDoc(docRef, {
        ...base,
        createdAt: existingSnap.data().createdAt,
      });
    } else {
      await setDoc(docRef, {
        ...base,
        createdAt: serverTimestamp(),
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

// Subscribe to Festivals collection in Firestore database
export function subscribeToFestivals(
  onData: (festivals: Festival[], fromFirestore: boolean) => void
) {
  const path = "festivals";
  const q = query(collection(db, path), where("isPublic", "==", true));
  return onSnapshot(
    q,
    (snapshot) => {
      if (!snapshot.empty) {
        const list = snapshot.docs.map((d) => docToFestival(d.data()));
        list.sort((a, b) => a.date.localeCompare(b.date));
        onData(list, true);
      } else {
        onData(givenFestivalsSeed, false);
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

// Subscribe to Rashifals collection in Firestore database
export function subscribeToRashifals(
  onData: (rashifals: RashiRashifal[], fromFirestore: boolean) => void
) {
  const path = "rashifals";
  const q = query(collection(db, path), where("isPublic", "==", true));
  return onSnapshot(
    q,
    (snapshot) => {
      if (!snapshot.empty) {
        const order = givenRashifalSeed.map((r) => r.id);
        const list = snapshot.docs.map((d) => docToRashifal(d.data()));
        list.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
        onData(list, true);
      } else {
        onData(givenRashifalSeed, false);
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

// Subscribe to MonthMappings collection in Firestore database
export function subscribeToMonthMappings(
  onData: (mappings: OdiaMonthMapping[], fromFirestore: boolean) => void
) {
  const path = "monthMappings";
  const q = query(collection(db, path), where("isPublic", "==", true));
  return onSnapshot(
    q,
    (snapshot) => {
      if (!snapshot.empty) {
        const list = snapshot.docs.map((d) => docToMonthMapping(d.data()));
        list.sort((a, b) => a.monthIndex - b.monthIndex);
        onData(list, true);
      } else {
        onData(givenMonthMappingsSeed, false);
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

// Subscribe to PanchangDays collection count & cached map in Firestore database
export function subscribeToPanchangDays(
  onData: (daysMap: Record<string, DayPanchang>, count: number) => void
) {
  const path = "panchangDays";
  const q = query(collection(db, path), where("isPublic", "==", true));
  return onSnapshot(
    q,
    (snapshot) => {
      const map: Record<string, DayPanchang> = {};
      snapshot.docs.forEach((d) => {
        const item = docToDayPanchang(d.data());
        if (item.date) {
          map[item.date] = item;
        }
      });
      onData(map, snapshot.size);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

// Seed the entire given Odia Panchang dataset (Festivals, Rashifals, Month Mappings, and Current Month's Panchang Days) into Firestore
export async function seedGivenDatabaseToFirestore(
  year: number,
  monthZeroIndexed: number,
  onProgress?: (msg: string) => void
): Promise<{
  festivalsSeeded: number;
  rashifalsSeeded: number;
  monthsSeeded: number;
  daysSeeded: number;
}> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("ଡାଟାବେସ୍ ସିঙ্ক କରିବା ପାଇଁ ଦୟାକରି ପ୍ରଥମେ ଗୁଗୁଲ୍ (Google) ସାହାଯ୍ୟରେ ଲগ୍-ଇନ୍ କରନ୍ତୁ।");
  }

  onProgress?.("ପର୍ବପର୍ବାଣୀ (Festivals) ଡାଟାବେସରେ ସଂରକ୍ଷଣ ହେଉଛି...");
  for (const fest of givenFestivalsSeed) {
    await saveFestivalToDb(fest);
  }

  onProgress?.("ରାଶିଫଳ (Rashifal) ଡାଟାବେସରେ ସଂରକ୍ଷଣ ହେଉଛି...");
  for (const rashi of givenRashifalSeed) {
    await saveRashifalToDb(rashi);
  }

  onProgress?.("ଓଡ଼ିଆ ମାସ ସୂଚୀ (Month Mappings) ଡାଟାବେସରେ ସଂରକ୍ଷଣ ହେଉଛି...");
  for (const mapping of givenMonthMappingsSeed) {
    await saveMonthMappingToDb(mapping);
  }

  onProgress?.("ମାସିକ ଦୈନିକ ପାଞ୍ଜି (Daily Panchang) ଡାଟାବେସରେ ସଂରକ୍ଷଣ ହେଉଛି...");
  const daysInMonth = new Date(year, monthZeroIndexed + 1, 0).getDate();
  let daysCount = 0;
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(monthZeroIndexed + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const dayPanchang = getGivenSeedPanchangForDate(dateStr);
    await savePanchangDayToDb(dayPanchang);
    daysCount++;
  }

  return {
    festivalsSeeded: givenFestivalsSeed.length,
    rashifalsSeeded: givenRashifalSeed.length,
    monthsSeeded: givenMonthMappingsSeed.length,
    daysSeeded: daysCount,
  };
}
