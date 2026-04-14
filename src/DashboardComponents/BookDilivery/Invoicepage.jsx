import React from "react";
import jsPDF from "jspdf";

const InvoicePage = ({ invoiceData, setInvoiceData }) => {
  if (!invoiceData) return null;

  const generateInvoicePDF = (d) => {
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

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[350px] shadow-xl">
        <h2 className="text-lg font-bold mb-3">Invoice Preview</h2>

        <p className="font-semibold">{invoiceData.productName}</p>
        <p className="text-sm">{invoiceData.customerName}</p>

        <div className="mt-2 text-sm">
          <p>₹ {invoiceData.price}</p>
          <p>Payment: {invoiceData.paymentStatus}</p>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => generateInvoicePDF(invoiceData)}
            className="flex-1 bg-green-600 text-white py-1 rounded"
          >
            Download
          </button>

          <button
            onClick={() => setInvoiceData(null)}
            className="flex-1 bg-gray-400 text-white py-1 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;