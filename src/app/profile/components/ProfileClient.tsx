"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Icon from "../../../components/ui/AppIcon";
import AppImage from "../../../components/ui/AppImage";
import TokenDisplay from "../../order-fulfillment-center/components/TokenDisplay";

interface Order {
  _id: string;
  token: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  items: any[];
  totalAmount: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
  estimatedTime?: string;
}

interface Review {
  _id: string;
  productId: string | null;
  nameBengali: string;
  roleBengali: string;
  rating: number;
  testimonialBengali: string;
  date: string;
}

export default function ProfileClient({ user }: { user: any }) {
  const { data: session, update, status: sessionStatus } = useSession();
  const [activeTab, setActiveTab] = useState<"orders" | "reviews">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userData, setUserData] = useState<any>(null); // Real-time user data from API
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    image: "",
    imageType: "url"
  });
  const [isUpdating, setIsUpdating] = useState(false);

  // Sync edit form when userData changes
  useEffect(() => {
    if (userData) {
      setEditForm({
        name: userData.name || "",
        image: userData.image || "",
        imageType: userData.image?.startsWith("http") ? "url" : "file"
      });
    } else if (session?.user) {
        setEditForm({
            name: session.user.name || "",
            image: session.user.image || "",
            imageType: session.user.image?.startsWith("http") ? "url" : "file"
        });
    }
  }, [userData, session]);

  useEffect(() => {
    async function fetchData() {
      const email = session?.user?.email || user?.email;
      if (!email) return;
      
      try {
        setLoading(true);
        const [ordersRes, reviewsRes, userRes] = await Promise.all([
          fetch(`/api/orders?email=${encodeURIComponent(email)}`),
          fetch(`/api/testimonials?email=${encodeURIComponent(email)}`),
          fetch("/api/user")
        ]);

        if (ordersRes.ok) setOrders(await ordersRes.json());
        if (reviewsRes.ok) setReviews(await reviewsRes.json());
        if (userRes.ok) setUserData(await userRes.json());
      } catch (err) {
        console.error("Failed to fetch profile data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [session?.user?.email, user?.email]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedOrder) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedOrder]);

  const profileUser = userData || session?.user || user;

  const handleUpdateProfile = async () => {
    if (!editForm.name.trim()) return alert("নাম দিতে হবে");
    
    setIsUpdating(true);
    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editForm.name,
          image: editForm.image
        })
      });

      if (res.ok) {
        // Update local state first for instant feedback
        const updatedUser = { ...profileUser, name: editForm.name, image: editForm.image };
        setUserData(updatedUser);
        
        // Sync with NextAuth session if the data is small enough to fit in a cookie.
        const isImageLarge = editForm.image?.startsWith("data:") && editForm.image.length > 8000;
        
        try {
          await update({ 
            name: editForm.name, 
            image: isImageLarge ? (profileUser.image?.startsWith("http") ? profileUser.image : "") : editForm.image 
          });
        } catch (updateErr) {
          console.error("Session update failed", updateErr);
        }
        
        setIsEditing(false);
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
       console.error(error);
       alert("An error occurred");
    } finally {
      setIsUpdating(false);
    }
  };

  const [isImageUploading, setIsImageUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("ছবি ২ মেগাবাইটের কম হতে হবে");
      return;
    }

    setIsImageUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=731ae3b103e5ee39787e7c3830702ea7`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      
      if (data.success) {
        setEditForm(prev => ({ 
          ...prev, 
          image: data.data.url, 
          imageType: "file" 
        }));
      } else {
        alert("ইমেজ আপলোড ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
      }
    } catch (error) {
      console.error("ImgBB Upload Error:", error);
      alert("সার্ভার ত্রুটি, ইন্টারনেট কানেকশন চেক করুন।");
    } finally {
      setIsImageUploading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
      {/* Sidebar / User Info */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-card rounded-3xl border border-border/50 p-8 text-center shadow-xl">
          <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-6 flex items-center justify-center text-primary relative group">
             <div className="w-full h-full rounded-full border-2 border-primary/20 flex items-center justify-center overflow-hidden bg-muted/20">
                {isImageUploading ? (
                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                ) : isEditing && editForm.image ? (
                   <AppImage src={editForm.image} alt="Preview" className="w-full h-full object-cover" />
                ) : profileUser?.image ? (
                   <AppImage src={profileUser.image} alt={profileUser.name} className="w-full h-full object-cover" />
                ) : (
                   <Icon name="UserCircleIcon" size={64} variant="solid" />
                )}
             </div>
             {isEditing && !isImageUploading && (
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center cursor-pointer overflow-hidden">
                   <label className="w-full h-full flex items-center justify-center cursor-pointer">
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                      <Icon name="CameraIcon" size={24} className="text-white" />
                   </label>
                </div>
             )}
          </div>
          
          {isEditing ? (
             <div className="space-y-4 mb-6">
                 <div>
                    <label className="text-xs font-bold font-bengali text-muted-foreground block mb-1 text-left">নাম</label>
                    <input 
                       type="text" 
                       value={editForm.name} 
                       onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                       className="w-full px-3 py-2 rounded-xl border border-border/50 bg-background text-sm font-bengali focus:ring-2 focus:ring-primary outline-none"
                    />
                 </div>
                 
                 <div>
                    <label className="text-xs font-bold font-bengali text-muted-foreground block mb-1 text-left">প্রোফাইল ছবি</label>
                    <div className="flex gap-2 mb-2">
                       <button 
                          onClick={() => setEditForm({...editForm, imageType: "url"})}
                          className={`flex-1 py-1 text-xs rounded-lg border transition-all ${editForm.imageType === "url" ? "bg-primary text-white border-primary" : "bg-transparent border-border hover:bg-muted"}`}
                       >
                          URL
                       </button>
                       <button 
                          onClick={() => setEditForm({...editForm, imageType: "file"})}
                          className={`flex-1 py-1 text-xs rounded-lg border transition-all ${editForm.imageType === "file" ? "bg-primary text-white border-primary" : "bg-transparent border-border hover:bg-muted"}`}
                       >
                          Upload
                       </button>
                    </div>
                    
                    {editForm.imageType === "url" ? (
                       <input 
                          type="text" 
                          placeholder="Image URL"
                          value={editForm.image} 
                          onChange={(e) => setEditForm({...editForm, image: e.target.value})}
                          className="w-full px-3 py-2 rounded-xl border border-border/50 bg-background text-xs text-muted-foreground focus:ring-2 focus:ring-primary outline-none"
                       />
                    ) : (
                       <div className="w-full px-3 py-2 rounded-xl border border-dashed border-border/50 bg-muted/30 text-xs text-muted-foreground text-center cursor-pointer hover:bg-muted/50 transition-colors relative min-h-[40px] flex items-center justify-center">
                          {isImageUploading ? (
                             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                          ) : (
                             <>
                                <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageUpload} />
                                <span>ছবি সিলেক্ট করুন</span>
                             </>
                          )}
                       </div>
                    )}
                 </div>

                 <div className="flex gap-2 pt-2">
                    <button 
                       onClick={() => setIsEditing(false)}
                       className="flex-1 py-2 rounded-xl border border-border text-xs font-bold hover:bg-muted transition-colors"
                    >
                       বাতিল
                    </button>
                     <button 
                        onClick={handleUpdateProfile}
                        disabled={isUpdating || isImageUploading}
                        className="flex-1 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
                     >
                        {isUpdating ? "সেভ হচ্ছে..." : isImageUploading ? "আপলোড হচ্ছে..." : "সেভ করুন"}
                     </button>
                 </div>
             </div>
          ) : (
             <>
                <h2 className="font-bengali font-black text-2xl text-foreground mb-1">{profileUser?.name}</h2>
                <p className="text-muted-foreground text-sm mb-4 break-all px-2">{profileUser?.email}</p>
                <button 
                   onClick={() => setIsEditing(true)}
                   className="mb-6 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold hover:bg-primary hover:text-white transition-all inline-flex items-center gap-2"
                >
                   <Icon name="PencilSquareIcon" size={14} />
                   এডিট প্রোফাইল
                </button>
             </>
          )}
          
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/50">
             <div className="text-center">
                <p className="font-black text-2xl text-primary">{orders.length}</p>
                <p className="text-[10px] font-bengali text-muted-foreground uppercase">অর্ডার</p>
             </div>
             <div className="text-center">
                <p className="font-black text-2xl text-primary">{reviews.length}</p>
                <p className="text-[10px] font-bengali text-muted-foreground uppercase">রিভিউ</p>
             </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3 space-y-8">
         {/* Tabs */}
         <div className="flex bg-muted/30 p-1.5 rounded-2xl border border-border/50 w-fit">
            <button 
               onClick={() => setActiveTab("orders")}
               className={`px-8 py-3 rounded-xl font-bengali font-black transition-all ${activeTab === "orders" ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:bg-muted"}`}
            >
               অর্ডার ইতিহাস
            </button>
            <button 
               onClick={() => setActiveTab("reviews")}
               className={`px-8 py-3 rounded-xl font-bengali font-black transition-all ${activeTab === "reviews" ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:bg-muted"}`}
            >
               আমার রিভিউ
            </button>
         </div>

         {loading ? (
            <div className="space-y-4">
               {[1, 2, 3].map(i => <div key={i} className="h-24 bg-card animate-pulse rounded-2xl"></div>)}
            </div>
         ) : !userData && status !== "loading" ? (
            <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-xl text-destructive text-sm font-bengali text-center">
              সার্ভারের সাথে সংযোগ বিচ্ছিন্ন হয়েছে। দয়া করে আবার লগইন করুন।
            </div>
         ) : activeTab === "orders" ? (
            <div className="space-y-4">
               {orders.length === 0 ? (
                  <div className="bg-card/50 rounded-3xl border-2 border-dashed border-border p-12 text-center">
                     <Icon name="ShoppingBagIcon" size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                     <p className="font-bengali text-xl text-muted-foreground">এখনো কোনো অর্ডার করেননি</p>
                  </div>
               ) : (
                  orders.map(order => (
                     <div key={order._id} className="bg-card rounded-2xl border border-border/50 p-6 flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-primary/30 transition-all shadow-sm">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                              <Icon name="TicketIcon" size={24} />
                           </div>
                           <div>
                              <div className="flex items-center gap-2 mb-1">
                                 <h4 className="font-heading font-black text-lg">#{order.token}</h4>
                                 <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${order.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}`}>
                                    {order.status}
                                 </span>
                              </div>
                              <p className="text-xs text-muted-foreground font-bengali">
                                 {new Date(order.createdAt).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })}
                              </p>
                           </div>
                        </div>
                        
                        <div className="flex-1 text-center md:text-left px-4">
                           <p className="font-bengali text-sm text-foreground line-clamp-1">
                              {order.items.map(i => `${i.nameBengali} (x${i.quantity})`).join(", ")}
                           </p>
                           <p className="font-heading font-black text-primary">৳{order.totalAmount}</p>
                        </div>

                        <button 
                           onClick={() => setSelectedOrder(order)}
                           className="flex items-center gap-2 px-6 py-2.5 bg-muted hover:bg-primary hover:text-white rounded-xl font-bengali font-bold text-sm transition-all shadow-sm"
                        >
                           <Icon name="EyeIcon" size={18} />
                           ইনভয়েস দেখুন
                        </button>
                     </div>
                  ))
               )}
            </div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {reviews.length === 0 ? (
                  <div className="col-span-full bg-card/50 rounded-3xl border-2 border-dashed border-border p-12 text-center">
                     <Icon name="ChatBubbleBottomCenterTextIcon" size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                     <p className="font-bengali text-xl text-muted-foreground">এখনো কোনো রিভিউ দেননি</p>
                  </div>
               ) : (
                  reviews.map(review => (
                     <div key={review._id} className="bg-card rounded-2xl border border-border/50 p-6 space-y-4 hover:border-primary/30 transition-all shadow-sm">
                        <div className="flex justify-between items-start">
                           <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                 <Icon key={i} name="StarIcon" size={14} className={i < review.rating ? "text-warning" : "text-muted-foreground/20"} variant="solid" />
                              ))}
                           </div>
                           <span className="text-[10px] text-muted-foreground font-heading">{review.date}</span>
                        </div>
                        <p className="text-foreground font-bengali leading-relaxed italic line-clamp-3">"{review.testimonialBengali}"</p>
                        <div className="pt-4 border-t border-border/50 flex justify-between items-center text-xs font-bengali text-muted-foreground">
                           <span>পেশা: {review.roleBengali}</span>
                           <span className="bg-primary/5 px-2 py-0.5 rounded text-primary font-bold">ভেরিফাইড</span>
                        </div>
                     </div>
                  ))
               )}
            </div>
         )}
      </div>

      {/* Invoice Modal */}
      {selectedOrder && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden transform animate-in zoom-in-95 duration-300 flex flex-col max-h-[95vh]">
               <div className="p-4 flex justify-between items-center bg-muted/10 border-b border-border/20">
                  <h3 className="font-bengali font-bold text-lg text-primary px-4">অর্ডার ইনভয়েস</h3>
                  <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-muted rounded-full transition-colors">
                     <Icon name="XMarkIcon" size={24} />
                  </button>
               </div>
               <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4 custom-scrollbar bg-white">
                  <TokenDisplay 
                     tokenNumber={selectedOrder.token}
                     estimatedTime={selectedOrder.estimatedTime || "15 min"}
                     orderItems={selectedOrder.items}
                     totalAmount={selectedOrder.totalAmount}
                     paymentMethod={selectedOrder.paymentMethod}
                     customerName={selectedOrder.customerName}
                  />
                  <div className="h-8" /> {/* Extra space at bottom */}
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
