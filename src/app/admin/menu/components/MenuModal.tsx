"use client";

import Icon from "@/components/ui/AppIcon";
import { useState } from "react";

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}

export default function MenuModal({ isOpen, onClose, onSubmit, initialData }: MenuModalProps) {
  const [formData, setFormData] = useState(initialData || {
    nameBengali: "",
    price: "",
    category: "চা",
    descriptionBengali: "",
    imageUrl: "",
    discount: "0",
    isSpecial: false,
    specialTag: "",
    isPopular: false
  });
  const [isUploading, setIsUploading] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [customCat, setCustomCat] = useState("");

  if (!isOpen) return null;

  const categories = ["চা", "কফি", "ঠান্ডা পানীয়", "নাস্তা", "মিষ্টি", "অন্যান্য"];

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const fd = new FormData();
    fd.append("image", file);
    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=731ae3b103e5ee39787e7c3830702ea7`, {
        method: "POST",
        body: fd
      });
      const data = await res.json();
      if (data.success) setFormData({ ...formData, imageUrl: data.data.url });
    } catch (err) {
      alert("আপলোড সমস্যা!");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      category: formData.category === "অন্যান্য" ? customCat : formData.category
    };
    onSubmit(finalData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
          <h2 className="text-xl font-black font-bengali text-primary">
            {initialData ? "আইটেম এডিট" : "নতুন আইটেম যোগ"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Icon name="XMarkIcon" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {/* Top Section: Image + Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-500 font-bengali">ইমেজ ইউআরএল বা ফাইল</label>
              <div className="relative group aspect-square md:aspect-video rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden">
                {formData.imageUrl ? (
                  <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <div className="text-center p-4">
                    <Icon name="CloudArrowUpIcon" size={32} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-[10px] text-gray-400 font-bengali">ক্লিক করে ছবি দিন</p>
                  </div>
                )}
                <input type="file" onChange={handleUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                {isUploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center"><div className="w-6 h-6 border-2 border-primary border-t-transparent animate-spin rounded-full"></div></div>}
              </div>
              <input 
                value={formData.imageUrl} 
                onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                placeholder="সরাসরি লিঙ্ক দিন..."
                className="w-full text-xs p-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white outline-none transition-all"
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 font-bengali mb-1.5 block">নাম (বাংলা)</label>
                <input 
                  required
                  value={formData.nameBengali} 
                  onChange={e => setFormData({...formData, nameBengali: e.target.value})}
                  placeholder="যেমন: মশলা চা"
                  className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-primary/30 outline-none transition-all font-bengali"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-500 font-bengali mb-1.5 block">মূল্য (৳)</label>
                  <input 
                    required
                    type="number"
                    value={formData.price} 
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white outline-none font-heading font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 font-bengali mb-1.5 block">ক্যাটাগরি</label>
                  <select 
                    value={formData.category} 
                    onChange={e => {
                      setFormData({...formData, category: e.target.value});
                      setShowCustom(e.target.value === "অন্যান্য");
                    }}
                    className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50 outline-none font-bengali text-sm"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              {showCustom && (
                <input 
                  placeholder="ক্যাটাগরির নাম লিখুন" 
                  value={customCat} 
                  onChange={e => setCustomCat(e.target.value)}
                  className="w-full p-3 rounded-xl border border-primary/20 bg-primary/5 outline-none font-bengali text-sm animate-in slide-in-from-top-2"
                />
              )}
            </div>
          </div>

          {/* Discount, Special & Popular */}
          <div className="bg-gray-50 rounded-2xl p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold font-bengali text-gray-600">ডিসকাউন্ট (%)</label>
                <span className="text-xs font-black text-primary">{formData.discount}%</span>
              </div>
              <input 
                type="range" min="0" max="90" step="5"
                value={formData.discount} 
                onChange={e => setFormData({...formData, discount: e.target.value})}
                className="w-full accent-primary h-1.5"
              />
            </div>
            
            <div className="space-y-3 border-l border-gray-200 md:pl-6 pl-0 border-l-0 md:border-l">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold font-bengali text-gray-600">স্পেশাল আইটেম?</label>
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, isSpecial: !formData.isSpecial})}
                  className={`w-10 h-5 rounded-full transition-all relative ${formData.isSpecial ? 'bg-primary' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${formData.isSpecial ? 'left-5.5' : 'left-0.5'}`}></div>
                </button>
              </div>
              {formData.isSpecial && (
                <input 
                  placeholder="ট্যাগ (সেরা চা)" 
                  value={formData.specialTag} 
                  onChange={e => setFormData({...formData, specialTag: e.target.value})}
                  className="w-full p-2.5 rounded-lg border border-gray-200 bg-white text-[10px] font-bengali outline-none"
                />
              )}
            </div>

            <div className="space-y-3 border-l border-gray-200 md:pl-6 pl-0 border-l-0 md:border-l">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold font-bengali text-gray-600">জনপ্রিয় আইটেম?</label>
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, isPopular: !formData.isPopular})}
                  className={`w-10 h-5 rounded-full transition-all relative ${formData.isPopular ? 'bg-orange-500' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${formData.isPopular ? 'left-5.5' : 'left-0.5'}`}></div>
                </button>
              </div>
              <p className="text-[10px] text-gray-400 font-bengali leading-tight">এটি দিলে হোমপেজের "জনপ্রিয় পছন্দসমূহ" সেকশনে দেখাবে।</p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 font-bengali block px-1">বিস্তারিত বিবরণ</label>
            <textarea 
              rows={3}
              value={formData.descriptionBengali} 
              onChange={e => setFormData({...formData, descriptionBengali: e.target.value})}
              placeholder="আইটেমটি সম্পর্কে কিছু লিখুন..."
              className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white outline-none transition-all font-bengali text-sm"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex gap-3 shrink-0">
          <button 
            type="button" 
            onClick={onClose}
            className="flex-1 py-3 text-sm font-bold font-bengali border border-gray-200 rounded-xl hover:bg-gray-100 transition-all"
          >
            বাতিল
          </button>
          <button 
            onClick={handleSubmit}
            disabled={isUploading}
            className="flex-[2] py-3 bg-primary text-white text-sm font-black font-bengali rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
          >
            {isUploading ? "আপলোড হচ্ছে..." : (initialData ? "সেভ করুন" : "মেনুতে দিন")}
          </button>
        </div>
      </div>
    </div>
  );
}
