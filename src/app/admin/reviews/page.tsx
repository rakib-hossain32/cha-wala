"use client";

import { useState, useEffect } from "react";
import Icon from "@/components/ui/AppIcon";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  const limit = 9;

  useEffect(() => {
    fetchReviews(currentPage);
  }, [currentPage, searchQuery]);

  const fetchReviews = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/management?type=testimonials&page=${page}&limit=${limit}&q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setReviews(data.items || []);
      setTotalPages(data.totalPages || 1);
      setTotalReviews(data.total || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const deleteReview = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      const res = await fetch(`/api/admin/management?type=testimonials&id=${id}`, { method: "DELETE" });
      if (res.ok) fetchReviews(currentPage);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black font-bengali text-foreground mb-2">রিভিউ মডারেশন</h1>
          <p className="text-muted-foreground font-bengali text-lg">ইউজারদের দেওয়া রিভিউগুলো পর্যালোচনা ও পরিচালনা করুন</p>
        </div>
        
        <div className="relative group w-full md:w-96">
           <input 
             type="text" 
             placeholder="রিভিউয়ার বা টেক্সট দিয়ে খুঁজুন..." 
             value={searchQuery}
             onChange={handleSearch}
             className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-border/30 bg-white focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none transition-all font-bengali text-lg shadow-sm"
           />
           <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 group-focus-within:text-primary transition-colors">
              <Icon name="MagnifyingGlassIcon" size={20} />
           </div>
        </div>
      </div>

      <div className="bg-white rounded-4xl border border-border/50 shadow-xl shadow-black/2 overflow-hidden min-h-[500px] relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-muted-foreground text-[10px] uppercase font-black tracking-widest font-heading bg-muted/40">
                <th className="px-8 py-6">রিভিউয়ার</th>
                <th className="px-8 py-6">রেটিং</th>
                <th className="px-8 py-6">রিভিউ মেসেজ</th>
                <th className="px-8 py-6 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/10">
              {loading ? (
                [1, 2, 3, 4, 5].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-8 py-8"><div className="h-4 bg-muted rounded w-48"></div></td>
                    <td className="px-8 py-8"><div className="h-4 bg-muted rounded w-24"></div></td>
                    <td className="px-8 py-8"><div className="h-4 bg-muted rounded w-full"></div></td>
                    <td className="px-8 py-8 text-right"><div className="h-10 w-10 bg-muted rounded-xl ml-auto"></div></td>
                  </tr>
                ))
              ) : reviews.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-32 text-center text-muted-foreground">
                    <Icon name="ChatBubbleLeftRightIcon" size={48} className="mx-auto opacity-10 mb-4" />
                    <p className="font-bengali text-xl font-bold">কোনো রিভিউ পাওয়া যায়নি</p>
                  </td>
                </tr>
              ) : (
                reviews.map((review: any) => (
                  <tr key={review._id} className="hover:bg-primary/1 transition-all duration-300 group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary font-black overflow-hidden border border-primary/10 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                           {review.image ? <img src={review.image} alt="" className="w-full h-full object-cover" /> : review.nameBengali[0]}
                        </div>
                        <div>
                          <p className="font-black text-lg font-bengali text-foreground leading-none mb-1">{review.nameBengali}</p>
                          <p className="text-[10px] font-bold text-primary/60 font-bengali">{review.roleBengali}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Icon key={i} name="StarIcon" size={14} className={i < review.rating ? "text-amber-400" : "text-muted-foreground/10"} variant="solid" />
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-bengali text-foreground/80 leading-relaxed italic line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                        "{review.testimonialBengali}"
                      </p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={() => deleteReview(review._id)}
                        className="p-3 text-destructive hover:bg-destructive/5 rounded-2xl transition-all active:scale-90 opacity-0 group-hover:opacity-100 group-hover:rotate-12"
                      >
                        <Icon name="TrashIcon" size={20} />
                      </button>
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white px-8 py-6 rounded-4xl border border-border/50 shadow-lg shadow-black/2 mt-12">
          <p className="text-sm font-bold font-bengali text-muted-foreground">
             মোট <span className="text-primary font-black">{totalReviews}</span> রিভিউয়ের মধ্যে <span className="text-foreground capitalize">{limit * (currentPage - 1) + 1} - {Math.min(limit * currentPage, totalReviews)}</span> দেখানো হচ্ছে
          </p>
          <div className="flex items-center gap-3">
             <button
               onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
               disabled={currentPage === 1 || loading}
               className="p-3 rounded-2xl border border-border/30 hover:bg-primary/5 hover:text-primary disabled:opacity-30 transition-all font-bengali font-black text-sm flex items-center gap-2 group"
             >
                <Icon name="ChevronLeftIcon" size={18} className="group-hover:-translate-x-1 transition-transform" />
                আগের পেজ
             </button>
             <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-xl font-heading font-black text-sm transition-all ${currentPage === i + 1 ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110' : 'hover:bg-muted text-muted-foreground'}`}
                  >
                    {i + 1}
                  </button>
                )).slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))}
             </div>
             <button
               onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
               disabled={currentPage === totalPages || loading}
               className="p-3 rounded-2xl border border-border/30 hover:bg-primary/5 hover:text-primary disabled:opacity-30 transition-all font-bengali font-black text-sm flex items-center gap-2 group"
             >
                পরের পেজ
                <Icon name="ChevronRightIcon" size={18} className="group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
