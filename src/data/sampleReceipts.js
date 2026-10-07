// Sample test receipts for reviewers and live demonstration
// Supports 1-click test drive without needing to find a real receipt file

export const SAMPLE_RECEIPTS = [
  {
    id: "sample-opay-failed-transfer",
    providerId: "opay",
    title: "OPay Failed NIP Interbank Transfer",
    subtitle: "₦45,000 debited · NIP session ID generated · Recipient never received funds",
    country: "NG",
    badge: "Most Common (Nigeria)",
    recommendedIssue: "debited_failed",
    extractedData: {
      provider: "OPay Nigeria",
      providerId: "opay",
      type: "NIP Interbank Transfer",
      amount: "45,000.00",
      currency: "NGN",
      datetime: "2026-10-06 14:32:18",
      reference: "100004241006143218009214",
      recipient: "CHUKWUEMEKA OBI (GTBank - 0248192031)",
      senderAccount: "0803***8192",
      status: "Successful (at OPay) / Not Credited at Destination",
      confidence: {
        provider: 0.99,
        type: 0.95,
        amount: 0.99,
        currency: 0.99,
        datetime: 0.98,
        reference: 0.99,
        recipient: 0.94,
        senderAccount: 0.91,
        status: 0.92
      }
    },
    narrative: "I initiated a transfer of ₦45,000 via my OPay app to Chukwuemeka Obi's GTBank account. The funds left my OPay balance instantly with Session ID 100004241006143218009214, but over 24 hours later, the beneficiary has not received the funds, and no reversal has taken place.",
    receiptVisual: {
      headerBg: "#00b875",
      headerText: "OPay Transaction Receipt",
      logoLabel: "OPay",
      amountFormatted: "₦45,000.00",
      statusText: "Successful Debit",
      items: [
        { label: "Transaction Type", value: "Bank Transfer (NIP)" },
        { label: "Beneficiary Name", value: "CHUKWUEMEKA OBI" },
        { label: "Beneficiary Bank", value: "Guaranty Trust Bank (GTBank)" },
        { label: "Account Number", value: "0248192031" },
        { label: "Session ID", value: "100004241006143218009214" },
        { label: "Transaction Ref", value: "OPAY-TX-20261006-89104" },
        { label: "Payment Date", value: "06 Oct 2026, 02:32 PM" },
        { label: "Sender Account", value: "803****192 (PAYCOM)" }
      ]
    }
  },
  {
    id: "sample-capitec-missing-eft",
    providerId: "capitec",
    title: "Capitec South Africa Missing Immediate EFT",
    subtitle: "R1,450.00 debited · Immediate payment fee charged · FNB beneficiary uncredited",
    country: "ZA",
    badge: "Popular (South Africa)",
    recommendedIssue: "reversal_not_received",
    extractedData: {
      provider: "Capitec Bank",
      providerId: "capitec",
      type: "Immediate Clearance EFT",
      amount: "1,450.00",
      currency: "ZAR",
      datetime: "2026-10-05 09:14:02",
      reference: "CAP-EFT-992147-ZA",
      recipient: "SIPHO NDLOVU (FNB - 62819204918)",
      senderAccount: "Account ending ***4810",
      status: "Processed / Beneficiary Query",
      confidence: {
        provider: 0.99,
        type: 0.96,
        amount: 0.99,
        currency: 0.99,
        datetime: 0.97,
        reference: 0.99,
        recipient: 0.95,
        senderAccount: 0.89,
        status: 0.90
      }
    },
    narrative: "An immediate clearing payment of R1,450 was debited from my Capitec savings account on 5 Oct 2026. The immediate clearance surcharge was debited, but First National Bank (recipient bank) confirms no inbound payment was received. Please issue an immediate recall and refund.",
    receiptVisual: {
      headerBg: "#007399",
      headerText: "Capitec Bank Proof of Payment",
      logoLabel: "Capitec",
      amountFormatted: "R 1,450.00",
      statusText: "Payment Executed",
      items: [
        { label: "Payment Type", value: "Immediate EFT Payment" },
        { label: "Beneficiary Name", value: "SIPHO NDLOVU" },
        { label: "Beneficiary Bank", value: "First National Bank (FNB)" },
        { label: "Beneficiary Account", value: "62819204918" },
        { label: "Payment Reference", value: "CAP-EFT-992147-ZA" },
        { label: "Clearing Type", value: "RTC (Real-Time Clearing)" },
        { label: "Date & Time", value: "05 Oct 2026, 09:14:02" },
        { label: "From Account", value: "Global One (ending 4810)" }
      ]
    }
  },
  {
    id: "sample-gtbank-double-charge",
    providerId: "gtbank",
    title: "GTBank POS Double Charge at Merchant",
    subtitle: "₦28,500 debited twice within 45 seconds · Supermarket POS Dispensation Error",
    country: "NG",
    badge: "Double Debit Issue",
    recommendedIssue: "double_charge",
    extractedData: {
      provider: "Guaranty Trust Bank (GTBank / GTCO)",
      providerId: "gtbank",
      type: "Mastercard POS Purchase",
      amount: "28,500.00",
      currency: "NGN",
      datetime: "2026-10-06 18:22:40",
      reference: "STAN: 481029 / RRN: 382910481920",
      recipient: "SPAR HYPERMARKET LEKKI",
      senderAccount: "Debit Card ***4192",
      status: "Duplicate Debited",
      confidence: {
        provider: 0.98,
        type: 0.94,
        amount: 0.99,
        currency: 0.99,
        datetime: 0.95,
        reference: 0.92,
        recipient: 0.93,
        senderAccount: 0.96,
        status: 0.88
      }
    },
    narrative: "I was debited twice (₦28,500 and ₦28,500) within 45 seconds at SPAR Lekki terminal. The cashier gave only one purchase receipt because the first tap printed an 'issuer timeout' error slip. Over 48 hours have elapsed without the automated reversal.",
    receiptVisual: {
      headerBg: "#dd4f05",
      headerText: "GTBank Debit Alert & POS Slip",
      logoLabel: "GTBank",
      amountFormatted: "₦28,500.00 (x2 Duplicate)",
      statusText: "Dispensation Error",
      items: [
        { label: "Channel", value: "POS Terminal (Interswitch)" },
        { label: "Merchant", value: "SPAR HYPERMARKET LEKKI" },
        { label: "Card Used", value: "Mastercard Classic (**** 4192)" },
        { label: "System Trace (STAN)", value: "481029 / 481030" },
        { label: "Terminal ID", value: "2031SPAR04" },
        { label: "Debit 1 Time", value: "18:22:15" },
        { label: "Debit 2 Time", value: "18:23:01" },
        { label: "Account Debited", value: "0123****90 (Savings)" }
      ]
    }
  },
  {
    id: "sample-kuda-paid-not-delivered",
    providerId: "kuda",
    title: "Kuda Bank Web Checkout Paid But Not Delivered",
    subtitle: "₦15,000 Paystack web debit · Merchant order cancelled · Reversal missing",
    country: "NG",
    badge: "Web Checkout Issue",
    recommendedIssue: "paid_not_delivered",
    extractedData: {
      provider: "Kuda Bank",
      providerId: "kuda",
      type: "Web Checkout / Debit Card",
      amount: "15,000.00",
      currency: "NGN",
      datetime: "2026-10-04 20:11:55",
      reference: "KUDA-WEB-77391024-PS",
      recipient: "PAYSTACK / CHOWDECK LAGOS",
      senderAccount: "Kuda Visa ending ***9921",
      status: "Successful / Order Cancelled",
      confidence: {
        provider: 0.99,
        type: 0.97,
        amount: 0.99,
        currency: 0.99,
        datetime: 0.98,
        reference: 0.96,
        recipient: 0.92,
        senderAccount: 0.95,
        status: 0.91
      }
    },
    narrative: "My Kuda account was debited ₦15,000 for a food order on Chowdeck via Paystack. The merchant website crashed at final confirmation and generated an order failed error. Chowdeck support confirmed funds were never settled to them and advised to dispute with Kuda.",
    receiptVisual: {
      headerBg: "#40196d",
      headerText: "Kuda Microfinance Bank Receipt",
      logoLabel: "Kuda",
      amountFormatted: "₦15,000.00",
      statusText: "Successful Debit",
      items: [
        { label: "Payment Category", value: "Card Web Checkout" },
        { label: "Merchant", value: "CHOWDECK / PAYSTACK" },
        { label: "Card", value: "Kuda Visa Card (ending 9921)" },
        { label: "Transaction ID", value: "KUDA-WEB-77391024-PS" },
        { label: "Date & Time", value: "04 Oct 2026, 08:11 PM" },
        { label: "Fee Charged", value: "₦0.00" },
        { label: "Account", value: "2001****32 (Kuda MFB)" }
      ]
    }
  },
  {
    id: "sample-moniepoint-card-declined",
    providerId: "moniepoint",
    title: "Moniepoint POS Failed Merchant Debit",
    subtitle: "₦32,000 debited at filling station · POS printed 'DECLINED' · Debited anyway",
    country: "NG",
    badge: "Merchant Terminal Issue",
    recommendedIssue: "debited_failed",
    extractedData: {
      provider: "Moniepoint MFB",
      providerId: "moniepoint",
      type: "Agency Banking POS Terminal",
      amount: "32,000.00",
      currency: "NGN",
      datetime: "2026-10-06 11:05:43",
      reference: "MNP-POS-8829104812",
      recipient: "TOTALENERGIES IKEJA STATION",
      senderAccount: "Debit Card ***1093",
      status: "Declined at Terminal / Debited at Switch",
      confidence: {
        provider: 0.99,
        type: 0.93,
        amount: 0.99,
        currency: 0.99,
        datetime: 0.96,
        reference: 0.94,
        recipient: 0.91,
        senderAccount: 0.88,
        status: 0.85
      }
    },
    narrative: "Attempted to pay ₦32,000 for fuel at TotalEnergies Ikeja using a Moniepoint POS terminal. The terminal displayed 'DECLINED / 96 SYSTEM MALFUNCTION' and printed a decline slip. However, my account was debited immediately with RRN 301928491829. Merchant refused to release fuel.",
    receiptVisual: {
      headerBg: "#034383",
      headerText: "Moniepoint POS Transaction Receipt",
      logoLabel: "Moniepoint",
      amountFormatted: "₦32,000.00",
      statusText: "Terminal Decline / Issuer Debit",
      items: [
        { label: "Terminal Model", value: "Moniepoint Smart POS v3" },
        { label: "Merchant Business", value: "TOTALENERGIES IKEJA" },
        { label: "RRN (Retrieval Ref)", value: "301928491829" },
        { label: "STAN", value: "009182" },
        { label: "Transaction Time", value: "06 Oct 2026, 11:05:43" },
        { label: "Response Code", value: "96 (System Malfunction)" },
        { label: "Customer Card", value: "Debit Card ending 1093" }
      ]
    }
  }
];

export const ISSUE_TYPES = [
  {
    id: "debited_failed",
    label: "Money deducted, but not delivered",
    emoji: "⚠️",
    description: "Your bank debited your account, but the recipient never received the money."
  },
  {
    id: "reversal_not_received",
    label: "Refund never arrived",
    emoji: "🔄",
    description: "The payment or POS transaction failed, but the bank never returned your money."
  },
  {
    id: "paid_not_delivered",
    label: "Paid, but goods/service not received",
    emoji: "📦",
    description: "You paid the seller or business, but they never provided what you paid for."
  },
  {
    id: "double_charge",
    label: "Charged twice (or more)",
    emoji: "🔁",
    description: "Your account was deducted multiple times for one single transfer or purchase."
  },
  {
    id: "unauthorised_transaction",
    label: "Unknown debit on my account",
    emoji: "🛡️",
    description: "Money was taken from your account without your permission or knowledge."
  },
  {
    id: "wrong_recipient",
    label: "Sent to wrong account / bank glitch",
    emoji: "🔀",
    description: "Money ended up in the wrong place because of an app, network, or bank error."
  }
];
