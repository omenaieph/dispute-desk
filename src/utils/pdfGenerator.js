// Client-side PDF Complaint Generator using jsPDF
import { jsPDF } from "jspdf";
import { REGULATORY_AUTHORITIES } from "../data/providers";

export function generateDisputePDF({ dispute, complaint, provider }) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let cursorY = 22;

  const country = provider?.country || (dispute?.transactions?.[0]?.currency === "ZAR" ? "ZA" : "NG");
  const regulator = REGULATORY_AUTHORITIES[country];
  const primaryTx = dispute?.transactions?.[0] || {};
  const refCode = dispute?.id ? dispute.id.slice(0, 10).toUpperCase() : `DD-${Date.now().toString().slice(-6)}`;

  // Header Bar
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(margin, cursorY, contentWidth, 24, "F");

  // Header Brand & Title
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("DISPUTE DESK", margin + 6, cursorY + 11);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text("Formal Consumer Transaction Dispute Notice", margin + 6, cursorY + 18);

  // Reference Code Box (right aligned)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(52, 211, 153); // emerald-400
  doc.text(`CASE REF: ${refCode}`, pageWidth - margin - 6, cursorY + 11, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225);
  doc.text(`Generated: ${new Date().toLocaleDateString("en-GB")}`, pageWidth - margin - 6, cursorY + 18, { align: "right" });

  cursorY += 32;

  // Addressed To & CC
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text("ADDRESSED TO:", margin, cursorY);
  doc.text("REGULATORY COPY (CC):", margin + (contentWidth / 2), cursorY);
  cursorY += 5;

  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(provider?.name || primaryTx.provider || "Financial Institution", margin, cursorY);
  doc.text(regulator?.shortName || "Consumer Protection Directorate", margin + (contentWidth / 2), cursorY);
  cursorY += 4.5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  doc.text(`Email: ${provider?.supportEmail || "Support Department"}`, margin, cursorY);
  doc.text(`Email: ${regulator?.email || "Complaints Dept"}`, margin + (contentWidth / 2), cursorY);
  cursorY += 4.5;

  if (provider?.escalationEmail) {
    doc.text(`Escalations: ${provider.escalationEmail}`, margin, cursorY);
  } else {
    doc.text(`Channel: Formal Electronic Grievance`, margin, cursorY);
  }
  doc.text(`Statutory Mandate: ${regulator?.statutoryRef || "Consumer Act"}`, margin + (contentWidth / 2), cursorY);
  cursorY += 10;

  // Subject Box
  doc.setFillColor(241, 245, 249); // slate-100
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, cursorY, contentWidth, 14, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  const subjectText = complaint?.subject || `Formal Dispute: Unresolved Transaction ${primaryTx.reference || ""}`;
  const splitSubject = doc.splitTextToSize(subjectText, contentWidth - 8);
  doc.text(splitSubject, margin + 4, cursorY + 6);

  cursorY += 20;

  // Transaction Ledger Table
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(30, 41, 59);
  doc.text("TRANSACTION PARTICULARS", margin, cursorY);
  cursorY += 4;

  // Table header
  doc.setFillColor(226, 232, 240);
  doc.rect(margin, cursorY, contentWidth, 7, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text("DATE / TIME", margin + 3, cursorY + 4.5);
  doc.text("SESSION / REF ID", margin + 38, cursorY + 4.5);
  doc.text("TYPE / CHANNEL", margin + 85, cursorY + 4.5);
  doc.text("AMOUNT", margin + 125, cursorY + 4.5);
  doc.text("STATUS", margin + 150, cursorY + 4.5);

  cursorY += 7;

  // Table rows
  const txs = dispute?.transactions || [primaryTx];
  txs.forEach((tx) => {
    doc.setFillColor(255, 255, 255);
    doc.rect(margin, cursorY, contentWidth, 7, "F");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(30, 41, 59);

    doc.text((tx.datetime || "N/A").slice(0, 16), margin + 3, cursorY + 4.5);
    doc.text((tx.reference || "N/A").slice(0, 22), margin + 38, cursorY + 4.5);
    doc.text((tx.type || "Transfer").slice(0, 18), margin + 85, cursorY + 4.5);
    
    doc.setFont("helvetica", "bold");
    const curr = tx.currency || "NGN";
    const symbol = curr === "NGN" ? "NGN " : curr === "ZAR" ? "ZAR " : "$";
    doc.text(`${symbol}${tx.amount || "0.00"}`, margin + 125, cursorY + 4.5);

    doc.setFont("helvetica", "normal");
    doc.text((tx.status || "Failed").slice(0, 14), margin + 150, cursorY + 4.5);

    // bottom border
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, cursorY + 7, margin + contentWidth, cursorY + 7);
    cursorY += 7.5;
  });

  cursorY += 5;

  // Formal Body Text
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);

  const rawBody = complaint?.body || "";
  // Split into clean lines
  const bodyLines = doc.splitTextToSize(rawBody, contentWidth);

  // Print body lines with pagination if required
  for (let i = 0; i < bodyLines.length; i++) {
    if (cursorY > pageHeight - 30) {
      doc.addPage();
      cursorY = 20;
    }
    doc.text(bodyLines[i], margin, cursorY);
    cursorY += 4.2;
  }

  // Footer & Disclaimer
  cursorY = Math.max(cursorY + 6, pageHeight - 24);
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, cursorY, margin + contentWidth, cursorY);

  doc.setFont("helvetica", "italic");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text("Dispute Desk verification: Prepared under consumer protection directives. Client data masked in compliance with data privacy standards.", margin, cursorY + 4.5);
  doc.text(`Official Escalation Tracker ID: ${refCode} · https://disputedesk.app`, margin, cursorY + 8.5);

  const filename = `Dispute-Desk-${refCode}-${(provider?.id || "claim")}.pdf`;
  doc.save(filename);
}
