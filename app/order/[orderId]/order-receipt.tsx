'use client'
import type { Order } from ".prisma/client";
import { FaDownload } from "react-icons/fa";
import { formatPrice } from "@/utils/format-price";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef, useState } from "react";

interface OrderReceiptProps {
  order: Order;
  userEmail: string;
  userName: string;
}

const OrderReceipt: React.FC<OrderReceiptProps> = ({ order, userEmail, userName }) => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!receiptRef.current) return;
    
    setIsGenerating(true);
    try {
      // Wait for a moment to ensure styles are applied
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, imgWidth, imgHeight);
      pdf.save(`medimetics-order-${order.id}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className="absolute top-0 right-0 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition disabled:bg-blue-300"
        title="Download Receipt"
      >
        <FaDownload size={20} />
      </button>

      {/* Receipt template */}
      <div 
        ref={receiptRef} 
        className={isGenerating ? "fixed top-0 left-0 right-0 bg-white" : "hidden"}
        style={{ 
          width: '210mm', // A4 width
          padding: '20mm',
          fontFamily: 'Arial, sans-serif',
          zIndex: -1000
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Medimetics</h1>
          <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>Order Receipt</h2>
          <p style={{ color: '#666' }}>Order ID: {order.id}</p>
        </div>

        {/* Customer Details */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Customer Details</h3>
          <p>Name: {userName}</p>
          <p>Email: {userEmail}</p>
          <p>Phone: {order.address?.phone}</p>
        </div>

        {/* Products */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Order Items</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ddd' }}>
                <th style={{ textAlign: 'left', padding: '8px' }}>Item</th>
                <th style={{ textAlign: 'center', padding: '8px' }}>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '8px' }}>{item.name}</td>
                  <td style={{ textAlign: 'center', padding: '8px' }}>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Shipping Address */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Shipping Address</h3>
          <p>
            {order.address?.line1}, 
            {order.address?.line2 && `${order.address.line2},`} 
            {order.address?.city}, {order.address?.state}, {order.address?.postalCode}, {order.address?.country}
          </p>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', color: '#666', marginTop: '32px' }}>
          <p>Thank you for ordering from Medimetics!</p>
        </div>
      </div>
    </div>
  );
};

export default OrderReceipt; 