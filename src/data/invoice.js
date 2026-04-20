import jsPDF from "jspdf";

export const generateInvoice = (d) => {
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("TechBy", 40, 40);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Delivery Invoice", 40, 55);

  doc.text(`Invoice: ${d.invoiceId}`, 400, 40);
  doc.text(`Date: ${d.createdAt}`, 400, 55);

  doc.line(40, 65, 550, 65);

  doc.setFont("helvetica", "bold");
  doc.text("Bill To", 40, 90);

  doc.setFont("helvetica", "normal");
  doc.text(d.customerName, 40, 105);
  doc.text(`Phone: ${d.customerPhone}`, 40, 120);
  doc.text(`City: ${d.city}`, 40, 135);
  doc.text(d.deliveryAddress, 40, 150, { maxWidth: 250 });

  doc.setFont("helvetica", "bold");
  doc.text("Order", 40, 190);

  doc.setFont("helvetica", "normal");
  doc.text(`Product: ${d.productName}`, 40, 205);
  doc.text(`Size: ${d.productSize}`, 40, 220);
  doc.text(`Qty: 1`, 40, 235);

  doc.rect(350, 190, 200, 80);
  doc.text(`Price: ₹${d.price}`, 360, 220);
  doc.text(`Payment: ${d.paymentStatus}`, 360, 240);
  doc.text(`Status: ${d.status}`, 360, 260);

  doc.save(`TechBy_${d.invoiceId}.pdf`);
};