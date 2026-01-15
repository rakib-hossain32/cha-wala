"use client";

import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/AppIcon";
import { Html5Qrcode } from "html5-qrcode";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [searchToken, setSearchToken] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const limit = 10;

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when filters change
  }, [filter, searchToken]);

  useEffect(() => {
    fetchOrders();
  }, [filter, searchToken, currentPage]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      let url = `/api/admin/orders?page=${currentPage}&limit=${limit}&`;
      if (filter) url += `status=${filter}&`;
      if (searchToken) url += `token=${searchToken}&`;
      
      const res = await fetch(url);
      const data = await res.json();
      
      setOrders(Array.isArray(data.items) ? data.items : []);
      setTotalPages(data.totalPages || 1);
      setTotalItems(data.total || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus })
      });
      if (res.ok) {
        fetchOrders();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  // QR Scanner Logic - Modern Implementation
  useEffect(() => {
    let html5QrCode: Html5Qrcode | null = null;

    const startScanner = async () => {
      if (showScanner) {
        try {
          html5QrCode = new Html5Qrcode("qr-reader");
          scannerRef.current = html5QrCode;

          const config = { 
            fps: 10, 
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0 
          };

          await html5QrCode.start(
            { facingMode: "environment" }, 
            config, 
            (decodedText) => {
              // On Success
              setSearchToken(decodedText);
              stopScanner();
            },
            (errorMessage) => {
              // On Error - just ignore normal "no QR found" errors
            }
          );
        } catch (err) {
          console.error("Unable to start scanner", err);
        }
      }
    };

    const stopScanner = async () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        try {
          await scannerRef.current.stop();
          setShowScanner(false);
        } catch (err) {
          console.error("Unable to stop scanner", err);
        }
      }
    };

    if (showScanner) {
      startScanner();
    }

    return () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch(err => console.error("Error stopping scanner in cleanup", err));
      }
    };
  }, [showScanner]);

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black font-bengali text-foreground mb-2">অর্ডার কন্ট্রোল সেন্টার</h1>
          <p className="text-muted-foreground font-bengali text-lg">কাস্টমারদের অর্ডার এবং ডেলিভারি রিয়েল-টাইমে ম্যানেজ করুন</p>
        </div>
        
        <div className="flex bg-muted/40 p-1.5 rounded-2xl border border-border/50 shadow-inner">
          {["All", "Pending", "Processing", "Completed"].map((s) => (
             <button 
                key={s}
                onClick={() => setFilter(s === "All" ? "" : s)}
                className={`px-6 py-2.5 rounded-xl text-xs font-black font-heading transition-all duration-300 ${
                  (filter === s || (s === "All" && filter === "")) ? "bg-white shadow-md text-primary scale-[1.02]" : "text-muted-foreground hover:bg-white/50"
                }`}
             >
                {s === "All" ? "সবগুলো" : s === "Pending" ? "পেন্ডিং" : s === "Processing" ? "চলছে" : "সম্পন্ন"}
             </button>
          ))}
        </div>
      </div>

      {/* Search & QR Scanner Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 group">
           <input 
             type="text" 
             placeholder="টোকেন নম্বর দিয়ে খুঁজুন (যেমন: 1234)..." 
             value={searchToken}
             onChange={(e) => setSearchToken(e.target.value)}
             className="w-full pl-14 pr-6 py-5 rounded-3xl border-2 border-border/30 bg-white focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none transition-all font-heading font-black text-xl shadow-sm group-hover:border-border/50"
           />
           <div className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground/40 group-focus-within:text-primary transition-colors">
              <Icon name="TicketIcon" size={24} />
           </div>
           {searchToken && (
             <button 
               onClick={() => setSearchToken("")}
               className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-destructive p-1 rounded-full hover:bg-destructive/5 transition-all"
             >
                <Icon name="XMarkIcon" size={20} />
             </button>
           )}
        </div>
        <button 
          onClick={() => setShowScanner(true)}
          className="bg-primary text-white px-8 py-5 rounded-3xl font-bengali font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all group overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          <Icon name="QrCodeIcon" size={24} className="relative z-10" />
          <span className="relative z-10">QR স্ক্যান করুন</span>
        </button>
      </div>

      <div className="bg-white rounded-4xl border border-border/50 shadow-xl shadow-black/2 overflow-hidden min-h-[500px] relative">
        {loading && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-10 animate-in fade-in duration-300">
             <div className="flex flex-col items-center gap-4">
               <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent shadow-lg shadow-primary/20"></div>
               <p className="font-bengali font-bold text-muted-foreground animate-pulse">লোড হচ্ছে...</p>
             </div>
          </div>
        )}
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-muted-foreground text-[10px] uppercase font-black tracking-[0.2em] font-heading bg-muted/40">
                <th className="px-8 py-6">টোকেন ও ডেট</th>
                <th className="px-8 py-6">কাস্টমার ডিটেইলস</th>
                <th className="px-8 py-6">অর্ডার আইটেম</th>
                <th className="px-8 py-6 text-center">মোট টাকা</th>
                <th className="px-8 py-6">স্ট্যাটাস ও অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {orders.length === 0 && !loading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-32 text-center">
                    <div className="w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon name="InboxIcon" size={48} className="text-muted-foreground/20" />
                    </div>
                    <p className="font-bengali text-xl font-black text-muted-foreground">কোনো অর্ডার পাওয়া যায়নি</p>
                    <p className="text-sm text-muted-foreground/60 font-bengali mt-2">ফাইল রিলোড করুন অথবা অন্য ফিল্টার ব্যবহার করুন</p>
                  </td>
                </tr>
              ) : (
                orders.map((order: any) => (
                  <tr key={order._id} className="group hover:bg-primary/1 transition-all duration-300">
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
                          <Icon name="TicketIcon" size={28} />
                        </div>
                        <div>
                          <p className="font-black font-heading text-2xl text-primary leading-none mb-2">#{order.token}</p>
                          <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{new Date(order.createdAt).toLocaleString('bn-BD', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-8 font-bengali">
                      <p className="font-black text-lg text-foreground mb-1">{order.customerName}</p>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="PhoneIcon" size={12} />
                        <p className="text-sm font-bold">{order.phone}</p>
                      </div>
                    </td>
                    <td className="px-8 py-8 max-w-[250px]">
                       <div className="flex flex-wrap gap-2">
                          {order.items.map((item: any, idx: number) => (
                            <span key={idx} className="bg-muted/50 text-foreground px-3 py-1 rounded-xl text-xs font-bengali font-black border border-border/30 hover:bg-white transition-colors">
                              {item.nameBengali} <span className="text-primary ml-1">×{item.quantity}</span>
                            </span>
                          ))}
                       </div>
                    </td>
                    <td className="px-8 py-8 text-center">
                       <p className="font-black font-heading text-3xl text-foreground mb-1">৳{order.totalAmount}</p>
                       <span className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-tighter bg-muted px-2 py-0.5 rounded-full">{order.paymentMethod}</span>
                    </td>
                    <td className="px-8 py-8">
                       <div className="flex items-center gap-3">
                          <div className="relative">
                            <select 
                               value={order.status}
                               disabled={updatingId === order._id}
                               onChange={(e) => updateStatus(order._id, e.target.value)}
                               className={`pl-5 pr-10 py-3 rounded-2xl text-sm font-black font-bengali border-2 transition-all outline-none appearance-none cursor-pointer hover:shadow-lg active:scale-95 ${
                                  order.status === 'Completed' ? 'bg-emerald-500/5 text-emerald-600 border-emerald-500/20' : 
                                  order.status === 'Processing' ? 'bg-sky-500/5 text-sky-600 border-sky-500/20' : 
                                  order.status === 'Cancelled' ? 'bg-rose-500/5 text-rose-600 border-rose-500/20' :
                                  'bg-amber-500/5 text-amber-600 border-amber-500/20'
                               }`}
                            >
                               <option value="Pending">পেন্ডিং</option>
                               <option value="Processing">প্রসেসিং</option>
                               <option value="Completed">ডেলিভারড</option>
                               <option value="Cancelled">বাতিল</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                              <Icon name="ChevronDownIcon" size={16} />
                            </div>
                          </div>
                          
                          {updatingId === order._id && (
                            <div className="animate-spin rounded-full h-5 w-5 border-4 border-primary border-t-transparent shadow-sm"></div>
                          )}
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white px-8 py-5 rounded-4xl border border-border/50 shadow-sm">
          <p className="text-sm font-bold font-bengali text-muted-foreground mr-4">
            পেজ <span className="text-primary">{currentPage}</span> / {totalPages} (মোট {totalItems} অর্ডার)
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || loading}
              className="p-3 rounded-xl border border-border/50 hover:bg-primary/5 hover:text-primary disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground transition-all flex items-center gap-2 font-bengali font-bold text-sm"
            >
              <Icon name="ChevronLeftIcon" size={18} />
              আগেরটি
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || loading}
              className="p-3 rounded-xl border border-border/50 hover:bg-primary/5 hover:text-primary disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground transition-all flex items-center gap-2 font-bengali font-bold text-sm"
            >
              পরেরটি
              <Icon name="ChevronRightIcon" size={18} />
            </button>
          </div>
        </div>
      )}

      {/* QR Scanner Modal - Modern & Premium UI */}
      {showScanner && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-500">
           <div className="bg-white/5 border border-white/10 rounded-[3rem] w-full max-w-lg overflow-hidden relative shadow-2xl animate-in zoom-in-95 duration-300">
              
              {/* Header */}
              <div className="px-8 py-8 flex items-center justify-between text-white relative z-10">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
                        <Icon name="QrCodeIcon" size={24} className="text-primary" />
                    </div>
                    <div>
                       <h2 className="text-xl font-black font-bengali">অর্ডার স্ক্যানার</h2>
                       <p className="text-[10px] uppercase font-black tracking-widest text-primary/60">Modern Verification System</p>
                    </div>
                 </div>
                 <button 
                   onClick={() => setShowScanner(false)} 
                   className="p-4 hover:bg-white/10 rounded-2xl transition-all active:scale-90 group border border-white/5"
                 >
                    <Icon name="XMarkIcon" size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                 </button>
              </div>

              {/* Scanner Window */}
              <div className="p-8 pt-0 relative">
                 <div className="relative aspect-square overflow-hidden rounded-[2.5rem] border-2 border-white/10 bg-black/40 group">
                    
                    {/* The actually scanner video element */}
                    <div id="qr-reader" className="w-full h-full object-cover [&>video]:scale-[1.5] [&>video]:object-cover"></div>

                    {/* Custom Overlay - The "Modern" Look */}
                    <div className="absolute inset-0 pointer-events-none">
                        {/* Scanning Box Area */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[250px] h-[250px] relative">
                                {/* Corners */}
                                <div className="absolute -top-2 -left-2 w-10 h-10 border-t-4 border-l-4 border-primary rounded-tl-2xl"></div>
                                <div className="absolute -top-2 -right-2 w-10 h-10 border-t-4 border-r-4 border-primary rounded-tr-2xl"></div>
                                <div className="absolute -bottom-2 -left-2 w-10 h-10 border-b-4 border-l-4 border-primary rounded-bl-2xl"></div>
                                <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-4 border-r-4 border-primary rounded-br-2xl"></div>
                                
                                {/* Moving Laser Line */}
                                <div className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent animate-[scan_2s_ease-in-out_infinite]"></div>
                                
                                {/* Glow pulse */}
                                <div className="absolute inset-0 border border-primary/20 animate-pulse rounded-xl"></div>
                            </div>
                        </div>

                        {/* Darkened edges */}
                        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.6)]"></div>
                    </div>
                 </div>

                 <div className="mt-10 flex flex-col items-center gap-4 text-center">
                    <div className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                        <div className="w-2 h-2 rounded-full bg-primary animate-ping"></div>
                        <p className="text-white/60 font-bengali text-sm font-bold">ক্যামেরাটি কোডের সামনে ধরুন</p>
                    </div>
                    <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] font-heading">Powered by Cha Wala Systems v2.0</p>
                 </div>
              </div>

              {/* Style for the scan animation */}
              <style jsx>{`
                @keyframes scan {
                  0% { top: 0%; opacity: 0; }
                  20% { opacity: 1; }
                  80% { opacity: 1; }
                  100% { top: 100%; opacity: 0; }
                }
              `}</style>
           </div>
        </div>
      )}
    </div>
  );
}
