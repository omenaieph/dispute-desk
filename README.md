# Dispute Desk

> **One-liner:** Turn a failed or missing African fintech transaction into a firm, correctly addressed complaint in under 60 seconds, then follow it through to resolution.

---

## 🏢 Company & Founder

- **Company:** Dispute Desk
- **Founder:** Ephraim Omenai ([ephraim@mydisputedesk.app](mailto:ephraim@mydisputedesk.app))
- **Founded:** September 2026
- **Operating Markets:** Nigeria & South Africa
- **Mission:** Empowering African consumers to resolve failed debits, missing interbank transfers, and unreversed card transactions by combining AI forensic receipt parsing with statutory banking regulation enforcement (CBN & NFOSA).

---

## 🌟 Overview

Across African fintech, failed debits, uncredited interbank transfers, POS dispensation errors, and missing reversals are rampant. Users often don't know:
1. The verified complaint inbox for their bank or neobank.
2. The exact session IDs or trace numbers required for interbank settlement investigation.
3. The statutory timeframe their financial provider is legally bound to respect.
4. How to escalate to financial regulators like the Central Bank of Nigeria (CBN) or the South African National Financial Ombud Scheme (NFOSA).

**Dispute Desk** uses **Claude Vision & Writing** to solve this in under 60 seconds.

---

## 🚀 Key Features

### F1: Receipt Upload & Claude Vision Extraction
- Upload screenshots, photos, or PDFs of bank receipts, debit alerts, or POS slips.
- Claude Vision extracts: `Provider`, `Transaction Type`, `Amount & Currency`, `Date & Time`, `Reference / Session ID / RRN`, `Recipient`, `Sender Account (Masked)`, and `Status`.
- **Confidence Scoring:** Fields with confidence < 0.8 are flagged in amber for user verification.
- **Reviewer 1-Click Test Drive:** Pre-loaded interactive sample receipts (OPay, GTBank, Capitec, Kuda, Moniepoint) allowing immediate end-to-end testing with zero friction.
- **Multi-receipt Support:** Combine multiple receipts into a single dispute dossier.

### F2: Issue Picker
- One-tap issue chips:
  - ⚠️ Debited but failed
  - 🔄 Reversal not received
  - 📦 Paid, service not delivered
  - 🔁 Double charge
  - 🛡️ Unauthorised transaction
  - 🔀 Wrong recipient / misrouted
- Optional free-text context note with quick prompt accelerators.

### F3: Statutory Complaint Generator
- **Tone Toggle:**
  - 🕊️ **Polite:** Courteous inquiry and standard 24-48h resolution request.
  - ⚖️ **Firm:** Formal demand citing statutory regulations (CBN Consumer Protection 2019 / SA Code of Banking Practice).
  - 🚨 **Final Notice:** Urgent ultimatum prior to formal regulatory petition.
- **Dispatch Channels:**
  - 📋 **Copy:** Clean formatted plaintext with subject and headers.
  - ✉️ **Open in Email App (`mailto:`):** Pre-encodes recipient, subject, and body.
  - 📄 **Formal PDF Download:** Client-side PDF generation using `jspdf` complete with letterhead, dispute ID barcode, and transaction schedule.

### F4: Verified Provider Directory
- 16 verified providers across **Nigeria** (OPay, Moniepoint, PalmPay, Kuda, GTBank, Zenith, Access, FirstBank, UBA, Stanbic) and **South Africa** (Capitec, FNB, TymeBank, Nedbank, Standard Bank, Discovery).
- Details verified support emails, escalation inboxes, WhatsApp support lines, in-app paths, and stated SLA windows.
- Cites statutory escalation paths:
  - 🇳🇬 **Nigeria:** CBN Consumer Protection Department (`cpd@cbn.gov.ng`).
  - 🇿🇦 **South Africa:** National Financial Ombud Scheme (`info@nfosa.co.za`).

### F5: Dispute Tracker & Regulatory Escalator
- Stored locally in `localStorage`.
- Real-time countdown clock to the provider's SLA resolution deadline.
- When an SLA is breached:
  - **One-Tap Follow-Up Draft:** Quotes original reference, date sent, and breach alert.
  - **One-Tap Regulatory Escalation:** Directly drafts an official consumer petition to CBN CPD or the SA Banking Ombud.

---

## 🔒 Privacy & Security Standards
- **Zero Server Storage:** Receipts are processed in-memory.
- **Account Number Masking:** Accounts and card numbers are strictly masked to the last 4 digits (e.g. `***8192` or `ending 4192`).
- **WCAG AA Compliant:** Accessible contrast, 44px+ tap targets, mobile-first responsive design.

---

## 🛠️ Tech Stack
- **Frontend:** React 19, Tailwind CSS v4, Vite
- **Icons & Documents:** Lucide React, jsPDF
- **AI Engine:** Anthropic Claude Messages API (Vision + Writing) with client-side fallback simulation for instant zero-config reviewer testing.

---

## 🏃 Getting Started Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.
