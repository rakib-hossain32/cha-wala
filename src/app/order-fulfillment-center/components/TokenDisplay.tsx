import { useRef, useState } from "react";
import Icon from "../../../components/ui/AppIcon";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import { saveAs } from "file-saver";

interface CartItem {
  id: number | string;
  name: string;
  nameBengali: string;
  price: number;
  quantity: number;
}

interface TokenDisplayProps {
  tokenNumber: string;
  estimatedTime: string;
  orderItems?: CartItem[];
  totalAmount?: number;
  paymentMethod?: string;
  customerName?: string;
}

export default function TokenDisplay({
  tokenNumber,
  estimatedTime,
  orderItems = [],
  totalAmount = 0,
  paymentMethod = "Cash on Delivery",
  customerName = "Customer"
}: TokenDisplayProps) {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadTicket = async () => {
    if (!ticketRef.current) return;
    setIsGenerating(true);
    try {
      const { toJpeg } = await import("html-to-image");
      const { jsPDF } = await import("jspdf");

      // JPEG is key for small size (100-200KB)
      // pixelRatio 2 is sharp enough for mobile/print without being heavy
      const dataUrl = await toJpeg(ticketRef.current, { 
        quality: 0.9, 
        pixelRatio: 2.5, 
        backgroundColor: '#ffffff'
      });

      const img = new Image();
      img.src = dataUrl;
      await new Promise((resolve) => (img.onload = resolve));

      const pdfWidth = 320;
      const pdfHeight = (img.height * pdfWidth) / img.width;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [pdfWidth, pdfHeight]
      });

      pdf.addImage(dataUrl, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`ChaWala-Token-${tokenNumber}.pdf`);
    } catch (error) {
      console.error("PDF generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    if (ticketRef.current) {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            const styles = Array.from(document.styleSheets)
                .map(sheet => {
                    try {
                        return Array.from(sheet.cssRules).map(rule => rule.cssText).join('');
                    } catch (e) { return ''; }
                }).join('');

            printWindow.document.write(`
                <html>
                    <head>
                        <title>Token - ${tokenNumber}</title>
                        <link rel="preconnect" href="https://fonts.googleapis.com">
                        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@400;700;900&display=swap" rel="stylesheet">
                        <style>
                            ${styles}
                            body { 
                                font-family: 'Noto Serif Bengali', serif;
                                margin: 0;
                                padding: 20px;
                                display: flex;
                                justify-content: center;
                                background: #f9fafb;
                                -webkit-print-color-adjust: exact !important;
                                print-color-adjust: exact !important;
                            }
                            #print-container {
                                width: 380px;
                            }
                            .bg-white { background-color: white !important; }
                        </style>
                    </head>
                    <body>
                        <div id="print-container">
                            ${ticketRef.current.outerHTML}
                        </div>
                        <script>
                            window.onload = function() {
                                setTimeout(() => {
                                    window.print();
                                    window.close();
                                }, 500);
                            }
                        </script>
                    </body>
                </html>
            `);
            printWindow.document.close();
        }
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-2 max-w-md mx-auto">
      {/* The Actual Ticket */}
      <div 
        ref={ticketRef}
        id="token-ticket-capture"
        className="w-full bg-white rounded-[2.5rem] overflow-hidden relative"
        style={{ 
          boxShadow: '0 25px 80px -20px rgba(139, 69, 19, 0.15)',
          border: '1px solid #f3f4f6',
          maxWidth: '380px'
        }}
      >
        {/* Decorative Top Edge */}
        <div className="h-2 w-full flex gap-1 px-4 absolute top-0 left-0">
           {Array.from({length: 20}).map((_, i) => (
             <div key={i} className="flex-1 h-3 rounded-b-full" style={{ backgroundColor: 'rgba(139, 69, 19, 0.1)' }}></div>
           ))}
        </div>

        {/* Premium Header - More Compact */}
        <div 
          id="token-header"
          className="pt-6 pb-4 px-6 text-center relative overflow-hidden"
          style={{ 
            background: 'linear-gradient(135deg, #7c2d12 0%, #a855f7 100%)',
          }}
        >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 blur-2xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full -ml-12 -mb-12 blur-xl" style={{ backgroundColor: 'rgba(168, 85, 247, 0.2)' }}></div>

            <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: '#ffffff33', border: '1px solid #ffffff4d' }}>
                    <Icon name="TicketIcon" size={16} style={{ color: '#ffffff' }} />
                </div>
                <h2 className="text-xl font-bengali font-black leading-tight mb-0.5" style={{ color: '#ffffff' }}>ডিজিটাল টোকেন</h2>
                <p className="text-[9px] uppercase font-bold" style={{ color: '#ffffffcc', letterSpacing: '0.2em' }}>Premium Cha Wala</p>
            </div>
        </div>

        {/* Token Number Section - More Compact */}
        <div className="py-4 px-8 relative bg-white">
            {/* Realistic Punch Holes */}
            <div id="punch-left" className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-gray-50 rounded-r-full border-y border-r border-gray-100"></div>
            <div id="punch-right" className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-gray-50 rounded-l-full border-y border-l border-gray-100"></div>
            
            {/* Dashed Separator */}
            <div id="token-separator" className="absolute top-1/2 left-8 right-8 border-t-2 border-dashed border-gray-200 -translate-y-1/2 z-0"></div>

            <div className="text-center relative z-10 flex flex-col items-center">
                <span className="text-[8px] font-black uppercase mb-2 px-3 py-0.5 rounded-full" style={{ color: '#8b4513', backgroundColor: '#fffcf5', border: '1px solid #fdf2d8', letterSpacing: '0.1em' }}>Order Identity</span>
                
                <h1 className="text-4xl font-black font-heading mb-2 leading-none bg-white px-2" style={{ color: '#8b4513', letterSpacing: '-0.05em' }}>
                    {tokenNumber}
                </h1>
                
                <div className="flex items-center justify-center gap-2">
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-[9px] font-black font-bengali" style={{ backgroundColor: '#fffbeb', color: '#b45309', border: '1px solid #fef3c7' }}>
                       <Icon name="ClockIcon" size={10} variant="solid" />
                       <span>{estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-[9px] font-black font-bengali" style={{ backgroundColor: '#ecfdf5', color: '#047857', border: '1px solid #d1fae5' }}>
                        <Icon name="CheckBadgeIcon" size={10} variant="solid" />
                        <span>{paymentMethod === "bKash" ? "বিকাশ" : "পেইড"}</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="px-8 py-1 bg-white" style={{ borderTop: '1px solid #f3f4f6' }}>
            <div className="flex items-center justify-between mb-2 text-[8px] font-black uppercase" style={{ color: '#9ca3af', letterSpacing: '0.1em' }}>
                <div className="h-px flex-1" style={{ backgroundColor: '#f3f4f6' }}></div>
                <span className="mx-3">Order Summary</span>
                <div className="h-px flex-1" style={{ backgroundColor: '#f3f4f6' }}></div>
            </div>

            <div className="space-y-2">
                {orderItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <span className="font-bengali font-bold text-sm leading-tight" style={{ color: '#111827' }}>{item.nameBengali}</span>
                            <span className="text-[9px] font-medium" style={{ color: '#9ca3af' }}>পরিমাণ: {item.quantity}</span>
                        </div>
                        <span className="font-heading font-black text-sm" style={{ color: '#111827' }}>৳{item.price * item.quantity}</span>
                    </div>
                ))}
            </div>

            {/* Total Card - More Compact */}
            <div className="rounded-xl p-3" style={{ backgroundColor: '#f9fafb', border: '1px solid #f3f4f6' }}>
                <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-bold mb-0.5" style={{ color: '#374151' }}>গ্রাহক: {customerName}</span>
                        <div className="flex items-center gap-2">
                             <span className="text-[8px] font-bold font-bengali px-2 py-0.5 rounded-full" style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>অর্ডার নিশ্চিত</span>
                             <span className="text-[9px] font-medium" style={{ color: '#9ca3af' }}>আবার আসবেন!</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="block text-[8px] font-black uppercase mb-0.5" style={{ color: '#8b4513', letterSpacing: '0.1em' }}>Net Payable</span>
                        <div className="text-2xl font-black font-heading leading-none" style={{ color: '#8b4513' }}>৳{totalAmount}</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Premium QR Code Section - Redesigned */}
        <div className="p-4 flex flex-col items-center gap-1 relative" style={{ backgroundColor: '#fafafa' }}>
            {/* Realistic Tear-off Effect */}
            <div className="w-full flex justify-center gap-1 -mt-6 mb-2">
                {Array.from({length: 16}).map((_, i) => (
                    <div key={i} className="w-6 h-4 rounded-full border shadow-inner" style={{ backgroundColor: '#fafafa', borderColor: '#f3f4f6' }}></div>
                ))}
            </div>

            <div className="relative group p-1 rounded-3xl bg-linear-to-tr from-[#7c2d12]/10 via-[#a855f7]/5 to-[#7c2d12]/10">
                <div className="relative p-4 bg-white rounded-2xl border border-white/80 shadow-md overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/20 to-transparent"></div>
                    <QRCodeSVG 
                        value={tokenNumber} 
                        size={70} 
                        level="H" 
                        fgColor="#2a1206"
                        includeMargin={false}
                    />
                </div>
                
                {/* Decorative Tech Corners */}
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary/30 rounded-tl-lg"></div>
                <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary/30 rounded-tr-lg"></div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-primary/30 rounded-bl-lg"></div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary/30 rounded-br-lg"></div>
                
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#7c2d12] text-white text-[7px] font-black px-3 py-1 rounded-full shadow-lg whitespace-nowrap flex items-center gap-1 border border-white/20">
                    <Icon name="ShieldCheckIcon" size={8} variant="solid" />
                    <span>SECURE VERIFICATION</span>
                </div>
            </div>
            
            <div className="text-center mt-3">
                <div className="flex items-center gap-2 mb-1.5 justify-center">
                    <div className="h-px w-6 bg-linear-to-r from-transparent to-gray-200"></div>
                    <p className="text-[10px] font-black uppercase text-primary" style={{ letterSpacing: '0.2em' }}>Scan to Verify</p>
                    <div className="h-px w-6 bg-linear-to-l from-transparent to-gray-200"></div>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-[9px] font-bold uppercase text-gray-400" style={{ letterSpacing: '0.4em' }}>CHA WALA</p>
                    <div className="flex items-center gap-2 mt-1">
                        <p className="text-[7px] font-bold text-gray-300">#{tokenNumber}</p>
                        <div className="w-1 h-1 rounded-full bg-gray-200"></div>
                        <p className="text-[7px] font-bold text-gray-300">{new Date().toLocaleTimeString('bn-BD')}</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Hidden QR for PDF */}
      <div style={{ display: 'none' }}>
        <QRCodeCanvas 
            id="hidden-qr-canvas"
            value={tokenNumber} 
            size={200}
            level="H"
        />
      </div>

      {/* Action Buttons - Beautifully Floating */}
      <div className=" space-x-3 md:space-x-10 mt-3">
          <button 
            onClick={downloadTicket}
            disabled={isGenerating}
            className={`group relative bg-primary text-white p-3 rounded-3xl font-bengali font-black text-lg shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:scale-95 transition-all overflow-hidden ${isGenerating ? 'opacity-70 outline-none' : ''}`}
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <div className="flex  items-center gap-2 relative z-10">
                {isGenerating ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
                ) : (
                  <Icon name="ArrowDownTrayIcon" size={24} />
                )}
                <span className="text-xs uppercase tracking-widest opacity-80 font-heading">
                  {isGenerating ? 'জেনারেট হচ্ছে...' : 'ডাউনলোড করুন'}
                </span>
            </div>
          </button>
          
          <button 
            onClick={handlePrint}
            className="group relative bg-white text-gray-900 border-2 border-gray-100 p-3 rounded-3xl font-bengali font-black text-lg shadow-xl hover:shadow-2xl hover:border-primary/20 hover:-translate-y-1 active:scale-95 transition-all"
          >
            <div className="flex items-center gap-2">
                <Icon name="PrinterIcon" size={24} className="text-primary" />
                <span className="text-xs uppercase tracking-widest text-gray-400 font-heading">প্রিন্ট করুন</span>
            </div>
          </button>
      </div>
      
      <div className="mt-8 flex items-center gap-3 px-6 py-3 rounded-2xl" style={{ backgroundColor: 'rgba(139, 69, 19, 0.05)', border: '1px solid rgba(139, 69, 19, 0.1)' }}>
        <div className="w-2 h-2 rounded-full bg-primary animate-ping"></div>
        <p className="text-primary font-bengali text-xs font-bold italic">
           আপনার চা প্রস্তুত হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন।
        </p>
      </div>
    </div>
  );
}
