// Comprehensive Month-wise mapping of Odia Panji calendar to Gregorian calendar
// Shows exact English calendar dates on which each Odia month begins and ends in Odia text

export interface OdiaMonthMapping {
  monthIndex: number; // 0-11 (0 = January)
  gregorianMonthEng: string;
  gregorianMonthOdia: string;
  firstPartOdia: string;
  firstPartEndDateOdia: string;
  firstPartEndDay: number;
  sankrantiOdia: string;
  sankrantiDateOdia: string;
  secondPartOdia: string;
  secondPartStartDateOdia: string;
  secondPartStartDay: number;
  traditionalPanjiPeriod: string;
  solarTransitionOdia: string;
  lunarTransitionOdia: string;
  detailDescriptionOdia: string;
}

export const ODIA_MONTH_MAPPINGS: OdiaMonthMapping[] = [
  {
    monthIndex: 0,
    gregorianMonthEng: "January",
    gregorianMonthOdia: "ଜାନୁଆରୀ",
    firstPartOdia: "ଧନୁ (ପୌଷ)",
    firstPartEndDateOdia: "ଜାନୁଆରୀ ୧୪ ପର୍ଯ୍ୟନ୍ତ",
    firstPartEndDay: 14,
    sankrantiOdia: "ମକର ସଂକ୍ରାନ୍ତି",
    sankrantiDateOdia: "ଜାନୁଆରୀ ୧୪/୧୫",
    secondPartOdia: "ମକର (ମାଘ)",
    secondPartStartDateOdia: "ଜାନୁଆରୀ ୧୫ ରୁ ଆରମ୍ଭ",
    secondPartStartDay: 15,
    traditionalPanjiPeriod: "ଧନୁ(ପୌଷ)ଦି୧୭ନ ଠାରୁ ମକର(ମାଘ)ଦି୧୯ନ ପର୍ଯ୍ୟନ୍ତ",
    solarTransitionOdia: "ଧନୁ ରାଶିରୁ ମକର ରାଶି",
    lunarTransitionOdia: "ପୌଷ - ମାଘ",
    detailDescriptionOdia: "ଜାନୁଆରୀ ମାସରେ ଧନୁ (ପୌଷ) ପ୍ରାୟ ଜାନୁଆରୀ ୧୪ ପର୍ଯ୍ୟନ୍ତ ଚାଲେ ଏବଂ ମକର ସଂକ୍ରାନ୍ତି ସହିତ ମକର (ମାଘ) ଜାନୁଆରୀ ୧୫ ରୁ ଆରମ୍ଭ ହୁଏ।"
  },
  {
    monthIndex: 1,
    gregorianMonthEng: "February",
    gregorianMonthOdia: "ଫେବୃଆରୀ",
    firstPartOdia: "ମକର (ମାଘ)",
    firstPartEndDateOdia: "ଫେବୃଆରୀ ୧୩ ପର୍ଯ୍ୟନ୍ତ",
    firstPartEndDay: 13,
    sankrantiOdia: "କୁମ୍ଭ ସଂକ୍ରାନ୍ତି",
    sankrantiDateOdia: "ଫେବୃଆରୀ ୧୩/୧୪",
    secondPartOdia: "କୁମ୍ଭ (ଫାଲ୍ଗୁନ)",
    secondPartStartDateOdia: "ଫେବୃଆରୀ ୧୪ ରୁ ଆରମ୍ଭ",
    secondPartStartDay: 14,
    traditionalPanjiPeriod: "ମକର(ମାଘ)ଦି୨୦ନ ଠାରୁ କୁମ୍ଭ(ଫାଲ୍ଗୁନ)ଦି୧୬ନ ପର୍ଯ୍ୟନ୍ତ",
    solarTransitionOdia: "ମକର ରାଶିରୁ କୁମ୍ଭ ରାଶି",
    lunarTransitionOdia: "ମାଘ - ଫାଲ୍ଗୁନ",
    detailDescriptionOdia: "ଫେବୃଆରୀ ମାସରେ ମକର (ମାଘ) ପ୍ରାୟ ଫେବୃଆରୀ ୧୩ ପର୍ଯ୍ୟନ୍ତ ଚାଲେ ଏବଂ କୁମ୍ଭ ସଂକ୍ରାନ୍ତି ସହିତ କୁମ୍ଭ (ଫାଲ୍ଗୁନ) ଫେବୃଆରୀ ୧୪ ରୁ ଆରମ୍ଭ ହୁଏ।"
  },
  {
    monthIndex: 2,
    gregorianMonthEng: "March",
    gregorianMonthOdia: "ମାର୍ଚ୍ଚ",
    firstPartOdia: "କୁମ୍ଭ (ଫାଲ୍ଗୁନ)",
    firstPartEndDateOdia: "ମାର୍ଚ୍ଚ ୧୪ ପର୍ଯ୍ୟନ୍ତ",
    firstPartEndDay: 14,
    sankrantiOdia: "ମୀନ ସଂକ୍ରାନ୍ତି",
    sankrantiDateOdia: "ମାର୍ଚ୍ଚ ୧୪/୧୫",
    secondPartOdia: "ମୀନ (ଚୈତ୍ର)",
    secondPartStartDateOdia: "ମାର୍ଚ୍ଚ ୧୫ ରୁ ଆରମ୍ଭ",
    secondPartStartDay: 15,
    traditionalPanjiPeriod: "କୁମ୍ଭ(ଫାଲ୍ଗୁନ)ଦି୧୭ନ ଠାରୁ ମୀନ(ଚୈତ୍ର)ଦି୧୮ନ ପର୍ଯ୍ୟନ୍ତ",
    solarTransitionOdia: "କୁମ୍ଭ ରାଶିରୁ ମୀନ ରାଶି",
    lunarTransitionOdia: "ଫାଲ୍ଗୁନ - ଚୈତ୍ର",
    detailDescriptionOdia: "ମାର୍ଚ୍ଚ ମାସରେ କୁମ୍ଭ (ଫାଲ୍ଗୁନ) ପ୍ରାୟ ମାର୍ଚ୍ଚ ୧୪ ପର୍ଯ୍ୟନ୍ତ ଚାଲେ ଏବଂ ମୀନ ସଂକ୍ରାନ୍ତି ସହିତ ମୀନ (ଚୈତ୍ର) ମାର୍ଚ୍ଚ ୧୫ ରୁ ଆରମ୍ଭ ହୁଏ।"
  },
  {
    monthIndex: 3,
    gregorianMonthEng: "April",
    gregorianMonthOdia: "ଏପ୍ରିଲ୍",
    firstPartOdia: "ମୀନ (ଚୈତ୍ର)",
    firstPartEndDateOdia: "ଏପ୍ରିଲ୍ ୧୩ ପର୍ଯ୍ୟନ୍ତ",
    firstPartEndDay: 13,
    sankrantiOdia: "ମେଷ ସଂକ୍ରାନ୍ତି (ମହାବିଷୁବ / ପଣା ସଂକ୍ରାନ୍ତି)",
    sankrantiDateOdia: "ଏପ୍ରିଲ୍ ୧୪",
    secondPartOdia: "ମେଷ (ବୈଶାଖ / ଓଡ଼ିଆ ନବବର୍ଷ)",
    secondPartStartDateOdia: "ଏପ୍ରିଲ୍ ୧୪ ରୁ ଆରମ୍ଭ",
    secondPartStartDay: 14,
    traditionalPanjiPeriod: "ମୀନ(ଚୈତ୍ର)ଦି୧୯ନ ଠାରୁ ମେଷ(ବୈଶାଖ)ଦି୧୭ନ ପର୍ଯ୍ୟନ୍ତ",
    solarTransitionOdia: "ମୀନ ରାଶିରୁ ମେଷ ରାଶି",
    lunarTransitionOdia: "ଚୈତ୍ର - ବୈଶାଖ",
    detailDescriptionOdia: "ଏପ୍ରିଲ୍ ମାସରେ ମୀନ (ଚୈତ୍ର) ଏପ୍ରିଲ୍ ୧୩ ପର୍ଯ୍ୟନ୍ତ ଚାଲେ ଏବଂ ପଣା ସଂକ୍ରାନ୍ତି / ମେଷ ସଂକ୍ରାନ୍ତି ସହିତ ଓଡ଼ିଆ ନୂତନ ବର୍ଷ ବୈଶାଖ ମାସ ଏପ୍ରିଲ୍ ୧୪ ରୁ ଆରମ୍ଭ ହୁଏ।"
  },
  {
    monthIndex: 4,
    gregorianMonthEng: "May",
    gregorianMonthOdia: "ମେ",
    firstPartOdia: "ମେଷ (ବୈଶାଖ)",
    firstPartEndDateOdia: "ମେ ୧୪ ପର୍ଯ୍ୟନ୍ତ",
    firstPartEndDay: 14,
    sankrantiOdia: "ବୃଷ ସଂକ୍ରାନ୍ତି",
    sankrantiDateOdia: "ମେ ୧୪/୧୫",
    secondPartOdia: "ବୃଷ (ଜ୍ୟେଷ୍ଠ)",
    secondPartStartDateOdia: "ମେ ୧୫ ରୁ ଆରମ୍ଭ",
    secondPartStartDay: 15,
    traditionalPanjiPeriod: "ମେଷ(ବୈଶାଖ)ଦି୧୮ନ ଠାରୁ ବୃଷ(ଜ୍ୟେଷ୍ଠ)ଦି୧୭ନ ପର୍ଯ୍ୟନ୍ତ",
    solarTransitionOdia: "ମେଷ ରାଶିରୁ ବୃଷ ରାଶି",
    lunarTransitionOdia: "ବୈଶାଖ - ଜ୍ୟେଷ୍ଠ",
    detailDescriptionOdia: "ମେ ମାସରେ ମେଷ (ବୈଶାଖ) ପ୍ରାୟ ମେ ୧୪ ପର୍ଯ୍ୟନ୍ତ ଚାଲେ ଏବଂ ବୃଷ ସଂକ୍ରାନ୍ତି ସହିତ ବୃଷ (ଜ୍ୟେଷ୍ଠ) ମେ ୧୫ ରୁ ଆରମ୍ଭ ହୁଏ।"
  },
  {
    monthIndex: 5,
    gregorianMonthEng: "June",
    gregorianMonthOdia: "ଜୁନ୍",
    firstPartOdia: "ବୃଷ (ଜ୍ୟେଷ୍ଠ)",
    firstPartEndDateOdia: "ଜୁନ୍ ୧୪ ପର୍ଯ୍ୟନ୍ତ",
    firstPartEndDay: 14,
    sankrantiOdia: "ମିଥୁନ ସଂକ୍ରାନ୍ତି (ରଜ ସଂକ୍ରାନ୍ତି)",
    sankrantiDateOdia: "ଜୁନ୍ ୧୪/୧୫",
    secondPartOdia: "ମିଥୁନ (ଆଷାଢ଼)",
    secondPartStartDateOdia: "ଜୁନ୍ ୧୫ ରୁ ଆରମ୍ଭ",
    secondPartStartDay: 15,
    traditionalPanjiPeriod: "ବୃଷ(ଜ୍ୟେଷ୍ଠ)ଦି୧୮ନ ଠାରୁ ମିଥୁନ(ଆଷାଢ଼)ଦି୧୬ନ ପର୍ଯ୍ୟନ୍ତ",
    solarTransitionOdia: "ବୃଷ ରାଶିରୁ ମିଥୁନ ରାଶି",
    lunarTransitionOdia: "ଜ୍ୟେଷ୍ଠ - ଆଷାଢ଼",
    detailDescriptionOdia: "ଜୁନ୍ ମାସରେ ବୃଷ (ଜ୍ୟେଷ୍ଠ) ଜୁନ୍ ୧୪ ପର୍ଯ୍ୟନ୍ତ ଚାଲେ ଏବଂ ଓଡ଼ିଶାର ପ୍ରସିଦ୍ଧ ରଜ ସଂକ୍ରାନ୍ତି ସହିତ ମିଥୁନ (ଆଷାଢ଼) ଜୁନ୍ ୧୫ ରୁ ଆରମ୍ଭ ହୁଏ।"
  },
  {
    monthIndex: 6,
    gregorianMonthEng: "July",
    gregorianMonthOdia: "ଜୁଲାଇ",
    firstPartOdia: "ମିଥୁନ (ଆଷାଢ଼)",
    firstPartEndDateOdia: "ଜୁଲାଇ ୧୫ ପର୍ଯ୍ୟନ୍ତ",
    firstPartEndDay: 15,
    sankrantiOdia: "କର୍କଟ ସଂକ୍ରାନ୍ତି (ଦକ୍ଷିଣାୟନ ସଂକ୍ରାନ୍ତି)",
    sankrantiDateOdia: "ଜୁଲାଇ ୧୫/୧୬",
    secondPartOdia: "କର୍କଟ (ଶ୍ରାବଣ)",
    secondPartStartDateOdia: "ଜୁଲାଇ ୧୬ ରୁ ଆରମ୍ଭ",
    secondPartStartDay: 16,
    traditionalPanjiPeriod: "ମିଥୁନ(ଆଷାଢ଼)ଦି୧୭ନ ଠାରୁ କର୍କଟ(ଶ୍ରାବଣ)ଦି୧୬ନ ପର୍ଯ୍ୟନ୍ତ",
    solarTransitionOdia: "ମିଥୁନ ରାଶିରୁ କର୍କଟ ରାଶି",
    lunarTransitionOdia: "ଆଷାଢ଼ - ଶ୍ରାବଣ",
    detailDescriptionOdia: "ଜୁଲାଇ ମାସରେ ମିଥୁନ (ଆଷାଢ଼) ପ୍ରାୟ ଜୁଲାଇ ୧୫ ପର୍ଯ୍ୟନ୍ତ ଚାଲେ ଏବଂ କର୍କଟ ସଂକ୍ରାନ୍ତି ସହିତ ପବିତ୍ର କର୍କଟ (ଶ୍ରାବଣ) ଜୁଲାଇ ୧୬ ରୁ ଆରମ୍ଭ ହୁଏ।"
  },
  {
    monthIndex: 7,
    gregorianMonthEng: "August",
    gregorianMonthOdia: "ଅଗଷ୍ଟ",
    firstPartOdia: "କର୍କଟ (ଶ୍ରାବଣ)",
    firstPartEndDateOdia: "ଅଗଷ୍ଟ ୧୬ ପର୍ଯ୍ୟନ୍ତ",
    firstPartEndDay: 16,
    sankrantiOdia: "ସିଂହ ସଂକ୍ରାନ୍ତି",
    sankrantiDateOdia: "ଅଗଷ୍ଟ ୧୬/୧୭",
    secondPartOdia: "ସିଂହ (ଭାଦ୍ରବ)",
    secondPartStartDateOdia: "ଅଗଷ୍ଟ ୧୭ ରୁ ଆରମ୍ଭ",
    secondPartStartDay: 17,
    traditionalPanjiPeriod: "କର୍କଟ(ଶ୍ରାବଣ)ଦି୧୭ନ ଠାରୁ ସିଂହ(ଭାଦ୍ରବ)ଦି୧୫ନ ପର୍ଯ୍ୟନ୍ତ",
    solarTransitionOdia: "କର୍କଟ ରାଶିରୁ ସିଂହ ରାଶି",
    lunarTransitionOdia: "ଶ୍ରାବଣ - ଭାଦ୍ରବ",
    detailDescriptionOdia: "ଅଗଷ୍ଟ ମାସରେ କର୍କଟ (ଶ୍ରାବଣ) ପ୍ରାୟ ଅଗଷ୍ଟ ୧୬ ପର୍ଯ୍ୟନ୍ତ ଚାଲେ ଏବଂ ସିଂହ ସଂକ୍ରାନ୍ତି ସହିତ ସିଂହ (ଭାଦ୍ରବ) ଅଗଷ୍ଟ ୧୭ ରୁ ଆରମ୍ଭ ହୁଏ।"
  },
  {
    monthIndex: 8,
    gregorianMonthEng: "September",
    gregorianMonthOdia: "ସେପ୍ଟେମ୍ବର",
    firstPartOdia: "ସିଂହ (ଭାଦ୍ରବ)",
    firstPartEndDateOdia: "ସେପ୍ଟେମ୍ବର ୧୬ ପର୍ଯ୍ୟନ୍ତ",
    firstPartEndDay: 16,
    sankrantiOdia: "କନ୍ୟା ସଂକ୍ରାନ୍ତି",
    sankrantiDateOdia: "ସେପ୍ଟେମ୍ବର ୧୬/୧୭",
    secondPartOdia: "କନ୍ୟା (ଆଶ୍ୱିନ)",
    secondPartStartDateOdia: "ସେପ୍ଟେମ୍ବର ୧୭ ରୁ ଆରମ୍ଭ",
    secondPartStartDay: 17,
    traditionalPanjiPeriod: "ସିଂହ(ଭାଦ୍ରବ)ଦି୧୭ନ ଠାରୁ କନ୍ୟା(ଆଶ୍ୱିନ)ଦି୧୪ନ ପର୍ଯ୍ୟନ୍ତ",
    solarTransitionOdia: "ସିଂହ ରାଶିରୁ କନ୍ୟା ରାଶି",
    lunarTransitionOdia: "ଭାଦ୍ରବ - ଆଶ୍ୱିନ",
    detailDescriptionOdia: "ସେପ୍ଟେମ୍ବର ମାସରେ ସିଂହ (ଭାଦ୍ରବ) ପ୍ରାୟ ସେପ୍ଟେମ୍ବର ୧୬ ପର୍ଯ୍ୟନ୍ତ ଚାଲେ ଏବଂ କନ୍ୟା ସଂକ୍ରାନ୍ତି ସହିତ କନ୍ୟା (ଆଶ୍ୱିନ) ସେପ୍ଟେମ୍ବର ୧୭ ରୁ ଆରମ୍ଭ ହୁଏ।"
  },
  {
    monthIndex: 9,
    gregorianMonthEng: "October",
    gregorianMonthOdia: "ଅକ୍ଟୋବର",
    firstPartOdia: "କନ୍ୟା (ଆଶ୍ୱିନ)",
    firstPartEndDateOdia: "ଅକ୍ଟୋବର ୧୫ ପର୍ଯ୍ୟନ୍ତ",
    firstPartEndDay: 15,
    sankrantiOdia: "ତୁଳା ସଂକ୍ରାନ୍ତି (ଗର୍ଭଣା ସଂକ୍ରାନ୍ତି)",
    sankrantiDateOdia: "ଅକ୍ଟୋବର ୧୬/୧୭",
    secondPartOdia: "ତୁଳା (କାର୍ତ୍ତିକ)",
    secondPartStartDateOdia: "ଅକ୍ଟୋବର ୧୬ ରୁ ଆରମ୍ଭ",
    secondPartStartDay: 16,
    traditionalPanjiPeriod: "କନ୍ୟା(ଆଶ୍ୱିନ)ଦି୧୫ନ ଠାରୁ ତୁଳା(କାର୍ତ୍ତିକ)ଦି୧୬ନ ପର୍ଯ୍ୟନ୍ତ",
    solarTransitionOdia: "କନ୍ୟା ରାଶିରୁ ତୁଳା ରାଶି",
    lunarTransitionOdia: "ଆଶ୍ୱିନ - କାର୍ତ୍ତିକ",
    detailDescriptionOdia: "ଅକ୍ଟୋବର ମାସରେ ଆଶ୍ୱିନ (କନ୍ୟା) ପ୍ରାୟ ଅକ୍ଟୋବର ୧୫ ପର୍ଯ୍ୟନ୍ତ ଚାଲେ ଏବଂ ତୁଳା ସଂକ୍ରାନ୍ତି ସହିତ ପବିତ୍ର ତୁଳା (କାର୍ତ୍ତିକ) ଅକ୍ଟୋବର ୧୬ ରୁ ଆରମ୍ଭ ହୁଏ।"
  },
  {
    monthIndex: 10,
    gregorianMonthEng: "November",
    gregorianMonthOdia: "ନଭେମ୍ବର",
    firstPartOdia: "ତୁଳା (କାର୍ତ୍ତିକ)",
    firstPartEndDateOdia: "ନଭେମ୍ବର ୧୫ ପର୍ଯ୍ୟନ୍ତ",
    firstPartEndDay: 15,
    sankrantiOdia: "ବିଛା ସଂକ୍ରାନ୍ତି",
    sankrantiDateOdia: "ନଭେମ୍ବର ୧୫/୧୬",
    secondPartOdia: "ବିଛା (ମାର୍ଗଶୀର)",
    secondPartStartDateOdia: "ନଭେମ୍ବର ୧୬ ରୁ ଆରମ୍ଭ",
    secondPartStartDay: 16,
    traditionalPanjiPeriod: "ତୁଳା(କାର୍ତ୍ତିକ)ଦି୧୬ନ ଠାରୁ ବିଛା(ମାର୍ଗଶୀର)ଦି୧୫ନ ପର୍ଯ୍ୟନ୍ତ",
    solarTransitionOdia: "ତୁଳା ରାଶିରୁ ବିଛା ରାଶି",
    lunarTransitionOdia: "କାର୍ତ୍ତିକ - ମାର୍ଗଶୀର",
    detailDescriptionOdia: "ନଭେମ୍ବର ମାସରେ ତୁଳା (କାର୍ତ୍ତିକ) ପ୍ରାୟ ନଭେମ୍ବର ୧୫ ପର୍ଯ୍ୟନ୍ତ ଚାଲେ ଏବଂ ବିଛା ସଂକ୍ରାନ୍ତି ସହିତ ମାର୍ଗଶୀର (ବିଛା) ନଭେମ୍ବର ୧୬ ରୁ ଆରମ୍ଭ ହୁଏ।"
  },
  {
    monthIndex: 11,
    gregorianMonthEng: "December",
    gregorianMonthOdia: "ଡିସେମ୍ବର",
    firstPartOdia: "ବିଛା (ମାର୍ଗଶୀର)",
    firstPartEndDateOdia: "ଡିସେମ୍ବର ୧୫ ପର୍ଯ୍ୟନ୍ତ",
    firstPartEndDay: 15,
    sankrantiOdia: "ଧନୁ ସଂକ୍ରାନ୍ତି",
    sankrantiDateOdia: "ଡିସେମ୍ବର ୧୫/୧୬",
    secondPartOdia: "ଧନୁ (ପୌଷ)",
    secondPartStartDateOdia: "ଡିସେମ୍ବର ୧୬ ରୁ ଆରମ୍ଭ",
    secondPartStartDay: 16,
    traditionalPanjiPeriod: "ବିଛା(ମାର୍ଗଶୀର)ଦି୧୫ନ ଠାରୁ ଧନୁ(ପୌଷ)ଦି୧୬ନ ପର୍ଯ୍ୟନ୍ତ",
    solarTransitionOdia: "ବିଛା ରାଶିରୁ ଧନୁ ରାଶି",
    lunarTransitionOdia: "ମାର୍ଗଶୀର - ପୌଷ",
    detailDescriptionOdia: "ଡିସେମ୍ବର ମାସରେ ବିଛା (ମାର୍ଗଶୀର) ପ୍ରାୟ ଡିସେମ୍ବର ୧୫ ପର୍ଯ୍ୟନ୍ତ ଚାଲେ ଏବଂ ଧନୁ ସଂକ୍ରାନ୍ତି ସହିତ ଧନୁ (ପୌଷ) ଡିସେମ୍ବର ୧୬ ରୁ ଆରମ୍ଭ ହୁଏ।"
  }
];

export function getOdiaMonthMapping(monthIndex: number): OdiaMonthMapping {
  const normalizedIndex = ((monthIndex % 12) + 12) % 12;
  return ODIA_MONTH_MAPPINGS[normalizedIndex];
}
