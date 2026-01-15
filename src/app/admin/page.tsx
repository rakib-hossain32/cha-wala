"use client";

import { useState, useEffect } from "react";
import Icon from "@/components/ui/AppIcon";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return <div className="animate-pulse space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-card rounded-3xl"></div>)}
    </div>
    <div className="h-64 bg-card rounded-3xl"></div>
  </div>;

  const statsCards = [
    { label: "মোট বিক্রি", value: `৳${data?.stats.totalSales}`, icon: "BanknotesIcon", color: "bg-green-500", text: "text-green-500" },
    { label: "মোট অর্ডার", value: data?.stats.totalOrders, icon: "ShoppingBagIcon", color: "bg-blue-500", text: "text-blue-500" },
    { label: "পেন্ডিং অর্ডার", value: data?.stats.pendingOrders, icon: "ClockIcon", color: "bg-orange-500", text: "text-orange-500" },
    { label: "মোট কাস্টমার", value: data?.stats.totalUsers, icon: "UserGroupIcon", color: "bg-purple-500", text: "text-purple-500" },
  ];

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black font-bengali text-foreground mb-1">ড্যাশবোর্ড ওভারভিউ</h1>
          <p className="text-muted-foreground font-bengali">আজকের ব্যবসার অবস্থা এক নজরে দেখুন</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-2xl border border-border/50 shadow-sm flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs font-bold font-heading text-muted-foreground uppercase tracking-wider">রিয়েল-টাইম ডাটা</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-4xl border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl ${stat.color}/10 flex items-center justify-center ${stat.text}`}>
                <Icon name={stat.icon as any} size={24} />
              </div>
              <span className="text-[10px] font-black text-green-500 bg-green-500/10 px-2 py-1 rounded-lg">+১২%</span>
            </div>
            <p className="text-sm font-bold font-bengali text-muted-foreground mb-1">{stat.label}</p>
            <h3 className="text-2xl font-black font-heading text-foreground">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Bottom Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-4xl border border-border/50 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-border/50 flex items-center justify-between">
            <h3 className="text-xl font-black font-bengali text-foreground">সাম্প্রতিক অর্ডার</h3>
            <button className="text-primary text-xs font-bold font-bengali hover:underline">সবগুলো দেখুন</button>
          </div>
          <div className="p-4">
            <table className="w-full text-left">
              <thead>
                <tr className="text-muted-foreground text-xs uppercase font-heading">
                  <th className="px-4 py-3">টোকেন</th>
                  <th className="px-4 py-3">কাস্টমার</th>
                  <th className="px-4 py-3">আইটেম</th>
                  <th className="px-4 py-3">পরিমাণ</th>
                  <th className="px-4 py-3">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {data?.recentOrders.map((order: any) => (
                  <tr key={order._id} className="group hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4 font-black font-heading text-sm">#{order.token}</td>
                    <td className="px-4 py-4">
                      <p className="font-bold text-sm font-bengali">{order.customerName}</p>
                      <p className="text-[10px] text-muted-foreground">{order.phone}</p>
                    </td>
                    <td className="px-4 py-4 text-xs font-bengali text-muted-foreground max-w-[150px] truncate">
                      {order.items.map((i:any) => i.nameBengali).join(", ")}
                    </td>
                    <td className="px-4 py-4 font-black text-primary text-sm">৳{order.totalAmount}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${
                        order.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 
                        order.status === 'Processing' ? 'bg-blue-500/10 text-blue-500' : 
                        'bg-orange-500/10 text-orange-500'
                      }`}>
                        {order.status === 'Pending' ? 'পেন্ডিং' : order.status === 'Completed' ? 'সম্পন্ন' : 'চলছে'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Popular Items */}
        <div className="space-y-8">
           <div className="bg-primary p-8 rounded-4xl text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
              <Icon name="ChatBubbleBottomCenterTextIcon" size={120} className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-black font-bengali mb-4 relative z-10">ইউজারদের কথা</h3>
              <p className="text-white/80 text-sm font-bengali mb-6 relative z-10">আপনার দোকানের রিভিউ এবং কাস্টমার সন্তুষ্টি চেক করুন।</p>
              <button className="bg-white text-primary px-6 py-2.5 rounded-xl font-bengali font-bold text-sm hover:scale-105 active:scale-95 transition-all relative z-10">
                রিভিউ দেখুন
              </button>
           </div>

           <div className="bg-white p-8 rounded-4xl border border-border/50 shadow-sm">
              <h3 className="text-lg font-black font-bengali text-foreground mb-4">পপ্যুলার আইটেম</h3>
              <div className="space-y-4">
                {[
                  { name: "দুধ চা", sales: 124, price: 40 },
                  { name: "মালাই চা", sales: 86, price: 60 },
                  { name: "চিকেন রোল", sales: 52, price: 60 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary border border-border/50">
                        <Icon name="StarIcon" size={18} variant="solid" />
                      </div>
                      <div>
                        <p className="font-bold text-sm font-bengali">{item.name}</p>
                        <p className="text-[10px] text-muted-foreground">{item.sales} বার অর্ডার হয়েছে</p>
                      </div>
                    </div>
                    <p className="font-black text-sm text-primary">৳{item.price}</p>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
