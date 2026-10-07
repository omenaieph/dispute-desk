// Verified Directory of Banks & Fintechs in Nigeria and South Africa
// Sources: CBN Consumer Protection Guidelines, NFOSA / Ombudsman for Banking Services

export const REGULATORY_AUTHORITIES = {
  NG: {
    name: "Central Bank of Nigeria (CBN) — Consumer Protection Department",
    shortName: "CBN CPD",
    email: "cpd@cbn.gov.ng",
    secondaryEmail: "contactcbn@cbn.gov.ng",
    phone: "+234 700 225 5226",
    website: "https://www.cbn.gov.ng",
    portalUrl: "https://www.cbn.gov.ng/cpd/",
    slaRule: "CBN Circular on Failed Transactions: Immediate reversal for intra-bank, maximum 48-72 hours for inter-bank NIP transfers. Breach triggers statutory dispute investigation.",
    statutoryRef: "CBN Consumer Protection Regulations 2019 / Revised Sanctions Grid"
  },
  ZA: {
    name: "National Financial Ombud Scheme (NFOSA / Banking Ombud)",
    shortName: "NFO South Africa",
    email: "info@nfosa.co.za",
    secondaryEmail: "complaints@nfosa.co.za",
    phone: "0860 800 900 / +27 11 712 1800",
    website: "https://www.nfosa.co.za",
    portalUrl: "https://www.nfosa.co.za",
    slaRule: "Code of Banking Practice (South Africa): Financial institutions must resolve payment disputes within 20 business days (often 3-5 days for immediate clearing EFTs).",
    statutoryRef: "Financial Sector Regulation Act (FSRA) & SA Code of Banking Practice"
  }
};

export const PROVIDERS = [
  // --- NIGERIA FINTECHS & BANKS ---
  {
    id: "opay",
    name: "OPay Nigeria",
    country: "NG",
    type: "Mobile Money & Payment Service Bank",
    supportEmail: "support@opay-inc.com",
    escalationEmail: "disputes@opay-inc.com",
    whatsapp: "+234 916 599 8936",
    phone: "0700 888 8328",
    inAppPath: "Me > Help Center > Transaction Issue > Submit Ticket",
    slaHours: 48,
    slaLabel: "24 – 48 Hours",
    regulator: "NG",
    logoText: "OPay",
    brandColor: "#00b875",
    tags: ["fintech", "popular", "neobank"]
  },
  {
    id: "moniepoint",
    name: "Moniepoint MFB",
    country: "NG",
    type: "Microfinance Bank & Merchant POS",
    supportEmail: "support@moniepoint.com",
    escalationEmail: "disputes@moniepoint.com",
    whatsapp: "+234 814 150 0017",
    phone: "01 888 9900",
    inAppPath: "Support > Report a Transaction > Select Session ID",
    slaHours: 48,
    slaLabel: "24 – 48 Hours",
    regulator: "NG",
    logoText: "Moniepoint",
    brandColor: "#034383",
    tags: ["fintech", "merchant", "pos"]
  },
  {
    id: "palmpay",
    name: "PalmPay",
    country: "NG",
    type: "Digital Payment Service",
    supportEmail: "support@palmpay.com",
    escalationEmail: "dispute@palmpay.com",
    whatsapp: "+234 1 888 6888",
    phone: "01 888 6888",
    inAppPath: "Account > Customer Service > Transfer Dispute",
    slaHours: 48,
    slaLabel: "24 – 48 Hours",
    regulator: "NG",
    logoText: "PalmPay",
    brandColor: "#6c2eb9",
    tags: ["fintech", "popular"]
  },
  {
    id: "kuda",
    name: "Kuda Bank",
    country: "NG",
    type: "Digital Bank (Kuda MFB)",
    supportEmail: "help@kuda.com",
    escalationEmail: "disputes@kuda.com",
    whatsapp: "+234 1 633 5832",
    phone: "0700 022 5583",
    inAppPath: "More > Help > Chat with us / Transaction Issue",
    slaHours: 48,
    slaLabel: "24 – 48 Hours",
    regulator: "NG",
    logoText: "Kuda",
    brandColor: "#40196d",
    tags: ["fintech", "neobank"]
  },
  {
    id: "gtbank",
    name: "Guaranty Trust Bank (GTBank / GTCO)",
    country: "NG",
    type: "Commercial Bank",
    supportEmail: "complaints@gtbank.com",
    escalationEmail: "gtconnect@gtbank.com",
    whatsapp: "+234 904 000 2900",
    phone: "0700 4826 66328",
    inAppPath: "GTWorld > Help > Log a Dispensation Issue",
    slaHours: 72,
    slaLabel: "48 – 72 Hours",
    regulator: "NG",
    logoText: "GTBank",
    brandColor: "#dd4f05",
    tags: ["bank", "tier1"]
  },
  {
    id: "zenith",
    name: "Zenith Bank",
    country: "NG",
    type: "Commercial Bank",
    supportEmail: "zenithdirect@zenithbank.com",
    escalationEmail: "complaints@zenithbank.com",
    whatsapp: "+234 704 000 4422",
    phone: "01 278 7000",
    inAppPath: "Zenith App > Help & Feedback > Dispensation Error Log",
    slaHours: 72,
    slaLabel: "48 – 72 Hours",
    regulator: "NG",
    logoText: "Zenith",
    brandColor: "#d9232a",
    tags: ["bank", "tier1"]
  },
  {
    id: "access",
    name: "Access Bank",
    country: "NG",
    type: "Commercial Bank",
    supportEmail: "contactcenter@accessbankplc.com",
    escalationEmail: "customercare@accessbankplc.com",
    whatsapp: "+234 909 902 2273",
    phone: "0700 300 0000",
    inAppPath: "AccessMore > Customer Care > Dispute Transaction",
    slaHours: 72,
    slaLabel: "48 – 72 Hours",
    regulator: "NG",
    logoText: "Access",
    brandColor: "#f78f1e",
    tags: ["bank", "tier1"]
  },
  {
    id: "firstbank",
    name: "FirstBank of Nigeria",
    country: "NG",
    type: "Commercial Bank",
    supportEmail: "firstcontact@firstbanknigeria.com",
    escalationEmail: "complaints@firstbanknigeria.com",
    whatsapp: "+234 812 690 0000",
    phone: "0700 3477 82668228",
    inAppPath: "FirstMobile > Services > Log Dispute",
    slaHours: 72,
    slaLabel: "48 – 72 Hours",
    regulator: "NG",
    logoText: "FirstBank",
    brandColor: "#003b64",
    tags: ["bank", "tier1"]
  },
  {
    id: "uba",
    name: "United Bank for Africa (UBA)",
    country: "NG",
    type: "Commercial Bank",
    supportEmail: "cfc@ubagroup.com",
    escalationEmail: "customercomplaints@ubagroup.com",
    whatsapp: "+234 903 000 0555",
    phone: "0700 2255 822",
    inAppPath: "UBA Mobile > Leo Assistant > Dispute Transaction",
    slaHours: 72,
    slaLabel: "48 – 72 Hours",
    regulator: "NG",
    logoText: "UBA",
    brandColor: "#d71920",
    tags: ["bank"]
  },
  {
    id: "stanbic_ng",
    name: "Stanbic IBTC Bank",
    country: "NG",
    type: "Commercial Bank",
    supportEmail: "customercarenigeria@stanbicibtc.com",
    escalationEmail: "complaintsunit@stanbicibtc.com",
    whatsapp: "+234 909 999 9830",
    phone: "0700 909 909 909",
    inAppPath: "Super App > Help > Dispute Failed Transfer",
    slaHours: 72,
    slaLabel: "48 – 72 Hours",
    regulator: "NG",
    logoText: "Stanbic",
    brandColor: "#0033a1",
    tags: ["bank"]
  },

  // --- SOUTH AFRICA BANKS & FINTECHS ---
  {
    id: "capitec",
    name: "Capitec Bank",
    country: "ZA",
    type: "Retail Bank",
    supportEmail: "ClientCare@capitecbank.co.za",
    escalationEmail: "Complaints@capitecbank.co.za",
    whatsapp: "+27 67 418 9565",
    phone: "0860 10 20 43",
    inAppPath: "Capitec App > Help > Chat to agent / Disputed Payment",
    slaHours: 48,
    slaLabel: "24 – 48 Hours",
    regulator: "ZA",
    logoText: "Capitec",
    brandColor: "#007399",
    tags: ["bank", "retail", "popular"]
  },
  {
    id: "fnb",
    name: "First National Bank (FNB)",
    country: "ZA",
    type: "Commercial Bank",
    supportEmail: "care@fnb.co.za",
    escalationEmail: "complaints@fnb.co.za",
    whatsapp: "+27 87 575 9406",
    phone: "087 575 9404",
    inAppPath: "FNB App > Secure Chat > Disputed Card/EFT Transaction",
    slaHours: 48,
    slaLabel: "24 – 48 Hours",
    regulator: "ZA",
    logoText: "FNB",
    brandColor: "#00a3ad",
    tags: ["bank", "tier1"]
  },
  {
    id: "tymebank",
    name: "TymeBank",
    country: "ZA",
    type: "Digital Bank",
    supportEmail: "service@tymebank.co.za",
    escalationEmail: "complaints@tymebank.co.za",
    whatsapp: "+27 86 099 9119",
    phone: "086 099 9119",
    inAppPath: "TymeBank App > Contact Us > Transaction Query",
    slaHours: 48,
    slaLabel: "24 – 48 Hours",
    regulator: "ZA",
    logoText: "TymeBank",
    brandColor: "#ff7900",
    tags: ["fintech", "neobank"]
  },
  {
    id: "standardbank_za",
    name: "Standard Bank South Africa",
    country: "ZA",
    type: "Commercial Bank",
    supportEmail: "complaints@standardbank.co.za",
    escalationEmail: "queries@standardbank.co.za",
    whatsapp: "+27 64 570 0829",
    phone: "0860 123 000",
    inAppPath: "Standard Bank App > Help > Disputed Debit Order / EFT",
    slaHours: 72,
    slaLabel: "48 – 72 Hours",
    regulator: "ZA",
    logoText: "Standard Bank",
    brandColor: "#0033a1",
    tags: ["bank", "tier1"]
  },
  {
    id: "nedbank",
    name: "Nedbank",
    country: "ZA",
    type: "Commercial Bank",
    supportEmail: "escalations@nedbank.co.za",
    escalationEmail: "complaints@nedbank.co.za",
    whatsapp: "+27 71 672 5590",
    phone: "0860 555 111",
    inAppPath: "Nedbank Money App > Help > Query a Transaction",
    slaHours: 72,
    slaLabel: "48 – 72 Hours",
    regulator: "ZA",
    logoText: "Nedbank",
    brandColor: "#006341",
    tags: ["bank"]
  },
  {
    id: "discovery",
    name: "Discovery Bank",
    country: "ZA",
    type: "Digital Commercial Bank",
    supportEmail: "bankcomplaints@discovery.bank",
    escalationEmail: "disputemanagement@discovery.bank",
    whatsapp: "+27 860 99 88 77",
    phone: "0800 07 96 97",
    inAppPath: "Discovery Bank App > Service > Dispute Transaction",
    slaHours: 48,
    slaLabel: "24 – 48 Hours",
    regulator: "ZA",
    logoText: "Discovery",
    brandColor: "#1d234a",
    tags: ["bank", "digital"]
  }
];

export function findProvider(query) {
  if (!query) return null;
  const q = query.toLowerCase().trim();
  return (
    PROVIDERS.find(
      (p) =>
        p.id === q ||
        p.name.toLowerCase().includes(q) ||
        p.supportEmail.toLowerCase().includes(q)
    ) || null
  );
}

export function getProvidersByCountry(countryCode) {
  if (!countryCode) return PROVIDERS;
  return PROVIDERS.filter((p) => p.country === countryCode);
}
