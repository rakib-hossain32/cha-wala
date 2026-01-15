"use client";

import { useState, useEffect } from "react";
import Icon from "@/components/ui/AppIcon";

export default function AdminMenu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const limit = 8;
  
  const initialForm = {
    nameBengali: "",
    price: "",
    category: "চা",
    customCategory: "",
    descriptionBengali: "",
    imageUrl: "",
    discount: "0",
    specialTag: "",
    isSpecial: false,
    isPopular: false
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetchMenu(currentPage);
  }, [currentPage]);

  const fetchMenu = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/menu?page=${page}&limit=${limit}`);
      const data = await res.json();
      setItems(data.items || []);
      setTotalPages(data.totalPages || 1);
      setTotalItems(data.total || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const data = new FormData();
    data.append("image", file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=731ae3b103e5ee39787e7c3830702ea7`, {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setFormData(prev => ({ ...prev, imageUrl: result.data.url }));
      }
    } catch (err) {
      alert("ইমেজ আপলোড ব্যর্থ হয়েছে!");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = "/api/admin/menu";
    const method = editingItem ? "PUT" : "POST";
    
    const finalData = {
      ...formData,
      name: formData.nameBengali,
      description: formData.descriptionBengali,
      category: formData.category === "অন্যান্য" ? formData.customCategory : formData.category
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem ? { ...finalData, _id: editingItem._id } : finalData)
      });
      if (res.ok) {
        setShowModal(false);
        setEditingItem(null);
        setFormData(initialForm);
        setShowCustomCategory(false);
        fetchMenu(currentPage);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("আপনি কি নিশ্চিতভাবে এই আইটেমটি মুছে ফেলতে চান?")) return;
    try {
      await fetch(`/api/admin/menu?id=${id}`, { method: "DELETE" });
      fetchMenu(currentPage);
    } catch (err) {
      console.error(err);
    }
  };

  const categories = ["চা", "কফি", "ঠান্ডা পানীয়", "বিস্কুট", "নাস্তা", "মিষ্টি", "কেক", "অন্যান্য"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-bengali text-foreground">মেনু ম্যানেজমেন্ট</h1>
          <p className="text-sm text-muted-foreground font-bengali">নতুন আইটেম যোগ করুন এবং ইনভেন্টরি কন্ট্রোল করুন</p>
        </div>
        <button 
          onClick={() => { setEditingItem(null); setFormData(initialForm); setShowModal(true); setShowCustomCategory(false); }}
          className="bg-primary text-white px-6 py-3 rounded-2xl font-bengali font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20"
        >
          <Icon name="PlusCircleIcon" size={20} />
          আইটেম দিন
        </button>
      </div>

      {/* List Container */}
      <div className="bg-white rounded-[2rem] border border-border/50 shadow-sm overflow-hidden">
        {/* Mobile View: Cards */}
        <div className="md:hidden divide-y divide-border/20">
          {loading ? (
            <div className="p-8 text-center animate-pulse font-bengali text-muted-foreground">লোডিং...</div>
          ) : items.length === 0 ? (
            <div className="p-12 text-center font-bengali text-muted-foreground">কোনো আইটেম নেই</div>
          ) : (
            items.map((item: any) => (
              <div key={item._id} className="p-6 flex gap-6 hover:bg-primary/5 active:scale-[0.98] transition-all group relative">
                <div className="w-24 h-24 rounded-[1.5rem] bg-muted overflow-hidden shrink-0 border border-border/50 shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <img src={item.imageUrl || ""} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <h3 className="font-black font-bengali text-lg text-foreground group-hover:text-primary transition-colors">{item.nameBengali}</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xl font-black text-primary font-heading">৳{item.price}</span>
                    <span className="text-[10px] bg-muted px-3 py-1 rounded-full font-black uppercase tracking-wider">{item.category}</span>
                  </div>
                  {item.isSpecial && (
                    <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20 w-fit">
                      <Icon name="StarIcon" size={12} variant="solid" />
                      {item.specialTag || "স্পেশাল আইটেম"}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-3 justify-center">
                  <button onClick={() => { setEditingItem(item); setFormData(item); setShowModal(true); }} className="w-10 h-10 flex items-center justify-center text-primary bg-white shadow-sm border border-border/50 rounded-xl hover:bg-primary hover:text-white hover:scale-110 transition-all"><Icon name="PencilSquareIcon" size={20} /></button>
                  <button onClick={() => deleteItem(item._id)} className="w-10 h-10 flex items-center justify-center text-destructive bg-white shadow-sm border border-border/50 rounded-xl hover:bg-destructive hover:text-white hover:scale-110 transition-all"><Icon name="TrashIcon" size={20} /></button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block overflow-x-auto px-1">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-muted/30 border-b border-border/30">
                <th className="px-8 py-6 text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em] font-heading">আইটেম তথ্য</th>
                <th className="px-8 py-6 text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em] font-heading">ক্যাটাগরি</th>
                <th className="px-8 py-6 text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em] font-heading">মূল্য</th>
                <th className="px-8 py-6 text-right text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em] font-heading">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {loading ? (
                <tr><td colSpan={4} className="px-8 py-16 text-center animate-pulse font-bengali text-muted-foreground">আপনার মেনু লোড হচ্ছে...</td></tr>
              ) : items.map((item: any) => (
                <tr key={item._id} className="hover:bg-primary/[0.03] transition-all group cursor-default">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-[1.5rem] bg-muted overflow-hidden border border-border/50 shadow-sm group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary/10 transition-all duration-500">
                        <img src={item.imageUrl || ""} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-black font-bengali text-xl text-foreground group-hover:text-primary transition-colors">{item.nameBengali}</p>
                        {item.isSpecial && (
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20 w-fit">
                            <Icon name="StarIcon" size={10} variant="solid" />
                            {item.specialTag || "স্পেশাল আইটেম"}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-black text-muted-foreground bg-muted/50 px-4 py-1.5 rounded-full uppercase tracking-widest">{item.category}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="font-black font-heading text-2xl text-foreground">৳{item.price}</span>
                      {Number(item.discount) > 0 && (
                        <span className="text-[10px] font-bold text-success uppercase tracking-tighter">{item.discount}% ছাড়</span>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-3 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                      <button onClick={() => { setEditingItem(item); setFormData(item); setShowModal(true); }} className="w-12 h-12 flex items-center justify-center text-primary bg-white shadow-sm border border-border/50 rounded-2xl hover:bg-primary hover:text-white hover:shadow-lg active:scale-95 transition-all"><Icon name="PencilSquareIcon" size={22} /></button>
                      <button onClick={() => deleteItem(item._id)} className="w-12 h-12 flex items-center justify-center text-destructive bg-white shadow-sm border border-border/50 rounded-2xl hover:bg-destructive hover:text-white hover:shadow-lg active:scale-95 transition-all"><Icon name="TrashIcon" size={22} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white px-8 py-5 rounded-[2rem] border border-border/50 shadow-sm">
          <p className="text-sm font-bold font-bengali text-muted-foreground mr-4">
            পেজ <span className="text-primary">{currentPage}</span> / {totalPages} (মোট {totalItems} আইটেম)
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

      {/* Standard Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between bg-white sticky top-0 z-10">
              <h2 className="text-xl font-black font-bengali">{editingItem ? "আইটেম এডিট করুন" : "নতুন আইটেম যোগ করুন"}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-muted rounded-xl transition-colors">
                <Icon name="XMarkIcon" size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground mb-1 block font-bengali">ইমেজ ইউআরএল বা আপলোড</label>
                    <div className="relative group aspect-square md:aspect-video rounded-2xl bg-muted border-2 border-dashed border-border/50 flex flex-col items-center justify-center overflow-hidden">
                      {formData.imageUrl ? (
                        <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                      ) : (
                        <div className="text-center p-4">
                          <Icon name="CloudArrowUpIcon" size={32} className="mx-auto text-muted-foreground/30 mb-2" />
                          <p className="text-[10px] text-muted-foreground font-bengali">ছবি সিলেক্ট করুন</p>
                        </div>
                      )}
                      <input type="file" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                      {isUploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center"><div className="w-6 h-6 border-2 border-primary border-t-transparent animate-spin rounded-full"></div></div>}
                    </div>
                    <input 
                      value={formData.imageUrl} 
                      onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                      placeholder="সরাসরি লিঙ্ক দিন..."
                      className="w-full text-xs p-3 mt-2 rounded-xl border border-border/50 bg-muted/20 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground mb-1.5 block font-bengali">নাম (বাংলা)</label>
                    <input 
                      required
                      value={formData.nameBengali} 
                      onChange={e => setFormData({...formData, nameBengali: e.target.value})}
                      placeholder="আইটেমের নাম লিখুন"
                      className="w-full p-3 rounded-xl border border-border/50 bg-muted/20 focus:bg-white outline-none font-bengali"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground mb-1.5 block font-bengali">মূল্য (৳)</label>
                      <input 
                        required
                        type="number"
                        value={formData.price} 
                        onChange={e => setFormData({...formData, price: e.target.value})}
                        className="w-full p-3 rounded-xl border border-border/50 bg-muted/20 focus:bg-white outline-none font-heading font-black"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-muted-foreground mb-1.5 block font-bengali">ক্যাটাগরি</label>
                      <select 
                        value={formData.category} 
                        onChange={e => {
                          setFormData({...formData, category: e.target.value});
                          setShowCustomCategory(e.target.value === "অন্যান্য");
                        }}
                        className="w-full p-3 rounded-xl border border-border/50 bg-muted/20 outline-none font-bengali text-sm"
                      >
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  {showCustomCategory && (
                    <input 
                      placeholder="নতুন ক্যাটাগরি" 
                      value={formData.customCategory} 
                      onChange={e => setFormData({...formData, customCategory: e.target.value})}
                      className="w-full p-3 rounded-xl border border-primary/20 bg-primary/5 outline-none font-bengali text-sm"
                    />
                  )}
                  <div className="p-4 bg-muted/20 rounded-2xl space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold font-bengali text-muted-foreground">ডিসকাউন্ট (%)</label>
                      <span className="text-xs font-black text-primary">{formData.discount}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="90" step="5"
                      value={formData.discount} 
                      onChange={e => setFormData({...formData, discount: e.target.value})}
                      className="w-full accent-primary h-1.5"
                    />
                  </div>
                </div>
              </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                     <div className="flex items-center justify-between p-4 bg-primary/5 rounded-2xl">
                        <div className="flex items-center gap-3">
                           <Icon name="StarIcon" size={20} className="text-primary" />
                           <span className="text-sm font-bold font-bengali">স্পেশাল আইটেম</span>
                        </div>
                        <button 
                          type="button"
                          onClick={() => setFormData({...formData, isSpecial: !formData.isSpecial})}
                          className={`w-10 h-5 rounded-full transition-all relative ${formData.isSpecial ? 'bg-primary' : 'bg-gray-300'}`}
                        >
                          <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${formData.isSpecial ? 'left-5.5' : 'left-0.5'}`}></div>
                        </button>
                     </div>

                     <div className="flex items-center justify-between p-4 bg-orange-50 rounded-2xl">
                        <div className="flex items-center gap-3">
                           <Icon name="FireIcon" size={20} className="text-orange-500" />
                           <span className="text-sm font-bold font-bengali">জনপ্রিয় আইটেম</span>
                        </div>
                        <button 
                          type="button"
                          onClick={() => setFormData({...formData, isPopular: !formData.isPopular})}
                          className={`w-10 h-5 rounded-full transition-all relative ${formData.isPopular ? 'bg-orange-500' : 'bg-gray-300'}`}
                        >
                          <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${formData.isPopular ? 'left-5.5' : 'left-0.5'}`}></div>
                        </button>
                     </div>
                  </div>
                  {formData.isSpecial && (
                   <input 
                    placeholder="স্পেশাল ট্যাগ (যেমন: সেরা অফার)" 
                    value={formData.specialTag} 
                    onChange={e => setFormData({...formData, specialTag: e.target.value})}
                    className="w-full p-3 rounded-xl border border-primary/20 bg-white outline-none font-bengali text-sm"
                   />
                 )}

              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground font-bengali px-1">বিস্তারিত বিবরণ (বাংলা)</label>
                <textarea 
                  rows={3}
                  value={formData.descriptionBengali} 
                  onChange={e => setFormData({...formData, descriptionBengali: e.target.value})}
                  className="w-full p-4 rounded-2xl border border-border/50 bg-muted/20 focus:bg-white outline-none font-bengali text-sm"
                />
              </div>

              <div className="flex gap-4 pt-4 sticky bottom-0 bg-white shadow-[0_-20px_20px_rgba(255,255,255,0.8)]">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 border border-border/50 rounded-2xl font-bold font-bengali">বাতিল</button>
                <button type="submit" disabled={isUploading} className="flex-[2] py-4 bg-primary text-white rounded-2xl font-black font-bengali shadow-lg shadow-primary/20 active:scale-95 transition-all">
                  {editingItem ? "সেভ করুন" : "মেনুতে যুক্ত করুন"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
