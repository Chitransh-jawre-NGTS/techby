import React from "react";
import jsPDF from "jspdf";

const InvoicePage = ({ invoiceData, setInvoiceData }) => {
  if (!invoiceData) return null;

  const generateInvoicePDF = (d) => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });

    // HEADER
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("TechBy Invoice", 40, 40);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice ID: ${d._id}`, 40, 60);
    doc.text(`Date: ${new Date(d.createdAt).toLocaleString()}`, 40, 75);

    doc.line(40, 85, 550, 85);

    // CUSTOMER INFO
    doc.setFont("helvetica", "bold");
    doc.text("Customer Details", 40, 110);

    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${d.customerName}`, 40, 130);
    doc.text(`Phone: ${d.customerPhone}`, 40, 145);
    doc.text(`City: ${d.city}`, 40, 160);
    doc.text(`Pickup Address: ${d.pickupAddress}`, 40, 175, { maxWidth: 250 });
    doc.text(`Delivery Address: ${d.deliveryAddress}`, 40, 195, { maxWidth: 250 });

    // PRODUCT INFO
    doc.setFont("helvetica", "bold");
    doc.text("Order Details", 40, 230);

    doc.setFont("helvetica", "normal");
    doc.text(`Product Name: ${d.productName}`, 40, 250);
    doc.text(`Product Size: ${d.productSize}`, 40, 265);
    doc.text(`Product ID: ${d.productId}`, 40, 280);
    doc.text(`Seller ID: ${d.sellerId}`, 40, 295);

    // PAYMENT INFO BOX
    doc.rect(350, 230, 200, 120);

    doc.text(`Amount: ₹${d.amount}`, 360, 255);
    doc.text(`Payment Type: ${d.paymentType}`, 360, 275);
    doc.text(`Status: ${d.status}`, 360, 295);

    doc.setFont("helvetica", "bold");
    doc.text("Thank you for shopping with TechBy!", 40, 350);

    doc.save(`TechBy_Invoice_${d._id}.pdf`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[380px] shadow-xl">

        <h2 className="text-lg font-bold mb-3">Invoice Preview</h2>

        <div className="text-sm space-y-1">
          <p><b>Product:</b> {invoiceData.productName}</p>
          <p><b>Customer:</b> {invoiceData.customerName}</p>
          <p><b>Phone:</b> {invoiceData.customerPhone}</p>
          <p><b>Amount:</b> ₹{invoiceData.amount}</p>
          <p><b>Status:</b> {invoiceData.status}</p>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => generateInvoicePDF(invoiceData)}
            className="flex-1 bg-green-600 text-white py-2 rounded"
          >
            Download
          </button>

          <button
            onClick={() => setInvoiceData(null)}
            className="flex-1 bg-gray-400 text-white py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;