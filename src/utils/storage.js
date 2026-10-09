// LocalStorage Dispute Manager for Dispute Desk v1

const STORAGE_KEYS = {
  DISPUTES: "dispute_desk_cases_v1",
  SETTINGS: "dispute_desk_settings_v1",
  USER_PROFILE: "dispute_desk_profile_v1"
};

// Seed sample disputes so reviewers can instantly inspect the tracker and countdowns
export const SEED_DISPUTES = [
  {
    id: "dd-case-89210",
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(), // 36 hours ago
    sentAt: new Date(Date.now() - 34 * 3600 * 1000).toISOString(),
    // 48 hr SLA => 14 hours remaining
    deadlineAt: new Date(Date.now() + 14 * 3600 * 1000).toISOString(),
    status: "awaiting_reply",
    country: "NG",
    providerId: "opay",
    provider: {
      id: "opay",
      name: "OPay Nigeria",
      country: "NG",
      supportEmail: "support@opay-inc.com",
      escalationEmail: "disputes@opay-inc.com",
      slaHours: 48,
      slaLabel: "24 – 48 Hours"
    },
    transactions: [
      {
        provider: "OPay Nigeria",
        type: "NIP Interbank Transfer",
        amount: "45,000.00",
        currency: "NGN",
        datetime: "2026-10-06 14:32:18",
        reference: "100004241006143218009214",
        recipient: "CHUKWUEMEKA OBI (GTBank)",
        senderAccount: "0803***8192",
        status: "Debited / Not Received"
      }
    ],
    issueType: {
      id: "debited_failed",
      label: "Debited but failed"
    },
    extraNotes: "Debited ₦45,000 to beneficiary's GTBank. Recipient has not received funds after 24hrs.",
    tone: "firm",
    userName: "Adewale Adeleke",
    userEmail: "adewale.a@example.com",
    userPhone: "+234 803 555 0192",
    complaint: {
      subject: "FORMAL DISPUTE NOTICE: Debited but failed [₦45,000.00] — Session/Ref: 100004241006143218009214",
      body: `ATTENTION: DISPUTE RESOLUTION UNIT & CUSTOMER CARE\nOPAY NIGERIA\nSupport: support@opay-inc.com\n\nDear Sir / Madam,\n\nThis communication constitutes a formal dispute for an uncredited transfer.\n\nDISPUTE PARTICULARS:\n• Complainant: Adewale Adeleke\n• Channel: NIP Interbank Transfer\n• Disputed Amount: NGN 45,000.00\n• Session ID: 100004241006143218009214\n\nKindly investigate the switch logs and effect immediate reversal.`
    }
  },
  {
    id: "dd-case-74190",
    createdAt: new Date(Date.now() - 80 * 3600 * 1000).toISOString(), // 80 hours ago
    sentAt: new Date(Date.now() - 76 * 3600 * 1000).toISOString(),
    // Breached! 28 hours overdue
    deadlineAt: new Date(Date.now() - 28 * 3600 * 1000).toISOString(),
    status: "awaiting_reply",
    country: "NG",
    providerId: "gtbank",
    provider: {
      id: "gtbank",
      name: "Guaranty Trust Bank (GTBank / GTCO)",
      country: "NG",
      supportEmail: "complaints@gtbank.com",
      escalationEmail: "gtconnect@gtbank.com",
      slaHours: 48,
      slaLabel: "48 Hours"
    },
    transactions: [
      {
        provider: "Guaranty Trust Bank (GTBank)",
        type: "Mastercard POS Purchase",
        amount: "28,500.00",
        currency: "NGN",
        datetime: "2026-10-04 18:22:40",
        reference: "STAN: 481029",
        recipient: "SPAR HYPERMARKET LEKKI",
        senderAccount: "Debit Card ***4192",
        status: "Double Charge"
      }
    ],
    issueType: {
      id: "double_charge",
      label: "Double charge"
    },
    extraNotes: "Debited twice at supermarket POS terminal. Supermarket confirmed receipt for only 1 transaction.",
    tone: "firm",
    userName: "Fatima Aliyu",
    userEmail: "f.aliyu@example.com",
    userPhone: "+234 802 111 8844",
    complaint: {
      subject: "FORMAL DISPUTE NOTICE: Double charge [₦28,500.00] — Session/Ref: STAN: 481029",
      body: `ATTENTION: DISPUTE RESOLUTION UNIT, GTBANK\n\nDouble debit recorded at SPAR Lekki terminal. Reversal window exceeded.`
    }
  }
];

export function getStoredDisputes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DISPUTES);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    // If the only disputes are the legacy seed cases, clear them so users start fresh
    if (
      Array.isArray(parsed) &&
      parsed.length === 2 &&
      parsed.some((d) => d.id === "dd-case-89210") &&
      parsed.some((d) => d.id === "dd-case-74190")
    ) {
      localStorage.setItem(STORAGE_KEYS.DISPUTES, JSON.stringify([]));
      return [];
    }
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Error reading disputes from localStorage", err);
    return [];
  }
}

export function saveDispute(dispute) {
  try {
    const existing = getStoredDisputes();
    const index = existing.findIndex((d) => d.id === dispute.id);
    let updated;
    if (index >= 0) {
      updated = [...existing];
      updated[index] = { ...updated[index], ...dispute };
    } else {
      updated = [dispute, ...existing];
    }
    localStorage.setItem(STORAGE_KEYS.DISPUTES, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Error saving dispute", err);
    return [];
  }
}

export function deleteDispute(id) {
  try {
    const existing = getStoredDisputes();
    const updated = existing.filter((d) => d.id !== id);
    localStorage.setItem(STORAGE_KEYS.DISPUTES, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Error deleting dispute", err);
    return [];
  }
}

export function getStoredSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    const parsed = raw ? JSON.parse(raw) : {};
    return {
      apiKey: parsed.apiKey || (typeof import.meta !== "undefined" && import.meta.env?.VITE_ANTHROPIC_API_KEY) || "",
      country: parsed.country || "NG",
      proxyUrl: parsed.proxyUrl || ""
    };
  } catch {
    return {
      apiKey: (typeof import.meta !== "undefined" && import.meta.env?.VITE_ANTHROPIC_API_KEY) || "",
      country: "NG",
      proxyUrl: ""
    };
  }
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error("Error saving settings", e);
  }
}

export function getUserProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return raw ? JSON.parse(raw) : { name: "", email: "", phone: "" };
  } catch {
    return { name: "", email: "", phone: "" };
  }
}

export function saveUserProfile(profile) {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error("Error saving user profile", e);
  }
}
