"use client";

import { useState, useEffect } from "react";
import Icon from "@/components/ui/AppIcon";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, searchQuery]);

  const fetchUsers = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/management?type=users&page=${page}&limit=${limit}&q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setUsers(data.items || []);
      setTotalPages(data.totalPages || 1);
      setTotalUsers(data.total || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const deleteUser = async (id: string, email: string) => {
    if (email === 'rakibulhasanmd678@gmail.com') return alert("You cannot delete the master admin!");
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`/api/admin/management?type=users&id=${id}`, { method: "DELETE" });
      if (res.ok) fetchUsers(currentPage);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black font-bengali text-foreground mb-2">ইউজার লিস্ট</h1>
          <p className="text-muted-foreground font-bengali text-lg">ওয়েবসাইটের নিবন্ধিত ইউজারদের তালিকা পরিচালনা করুন</p>
        </div>
        
        <div className="relative group w-full md:w-96">
           <input 
             type="text" 
             placeholder="নাম বা ইমেইল দিয়ে খুঁজুন..." 
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
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-muted-foreground text-[10px] uppercase font-black tracking-widest font-heading bg-muted/40">
              <th className="px-8 py-6">ইউজার</th>
              <th className="px-8 py-6">ইমেইল</th>
              <th className="px-8 py-6 text-center">রোল</th>
              <th className="px-8 py-6 text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/10">
            {loading ? (
              [1, 2, 3, 4, 5].map(i => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={4} className="px-8 py-8">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-muted"></div>
                       <div className="h-4 bg-muted rounded w-48"></div>
                    </div>
                  </td>
                </tr>
              ))
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-8 py-32 text-center text-muted-foreground">
                  <Icon name="UserGroupIcon" size={48} className="mx-auto opacity-10 mb-4" />
                  <p className="font-bengali text-xl font-bold">কোনো ইউজার পাওয়া যায়নি</p>
                </td>
              </tr>
            ) : (
              users.map((user: any) => (
                <tr key={user._id} className="hover:bg-primary/[0.01] transition-all duration-300 group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary font-black overflow-hidden border border-primary/10 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                         {user.image ? <img src={user.image} alt="" className="w-full h-full object-cover" /> : user.name[0]}
                      </div>
                      <span className="font-black text-lg text-foreground font-bengali">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-black text-muted-foreground font-heading lowercase">{user.email}</td>
                  <td className="px-8 py-6 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all ${user.role === 'admin' ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm shadow-primary/10' : 'bg-muted/50 text-muted-foreground border border-border/50'}`}>
                      {user.role || 'user'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right text-black">
                    <button 
                      onClick={() => deleteUser(user._id, user.email)}
                      className="p-3 text-destructive hover:bg-destructive/5 rounded-2xl transition-all active:scale-90 group-hover:rotate-12 disabled:opacity-30 disabled:hover:bg-transparent"
                      disabled={user.email === 'rakibulhasanmd678@gmail.com'}
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white px-8 py-6 rounded-4xl border border-border/50 shadow-lg shadow-black/2 mt-8">
          <p className="text-sm font-bold font-bengali text-muted-foreground">
             মোট <span className="text-primary font-black">{totalUsers}</span> ইউজারের মধ্যে <span className="text-foreground capitalize">{limit * (currentPage - 1) + 1} - {Math.min(limit * currentPage, totalUsers)}</span> দেখানো হচ্ছে
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
