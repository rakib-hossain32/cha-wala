import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Icon from "../../../components/ui/AppIcon";

interface CheckoutFormProps {
  orderItems: any[];
  totalAmount: number;
  onOrderSuccess: (token: string, details: { paymentMethod: string; customerName: string }) => void;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  paymentMethod: string;
}

export default function CheckoutForm({ orderItems, totalAmount, onOrderSuccess }: CheckoutFormProps) {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    address: "",
    paymentMethod: "Cash on Delivery",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<any>({});

  // Auto-fill name if session exists
  useEffect(() => {
    if (status === "authenticated" && session?.user?.name && !formData.name) {
      setFormData(prev => ({ ...prev, name: session.user?.name || "" }));
    }
  }, [status, session, formData.name]);

  const validate = () => {
    const newErrors: any = {};
    if (!formData.name) newErrors.name = "নাম প্রয়োজন";
    if (!formData.phone) newErrors.phone = "ফোন নম্বর প্রয়োজন";
    else if (!/^[0-9]{11}$/.test(formData.phone)) newErrors.phone = "১১ ডিজিটের সঠিক নম্বর দিন";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.name,
          phone: formData.phone,
          email: session?.user?.email || formData.email,
          address: formData.address,
          items: orderItems,
          totalAmount: totalAmount,
          paymentMethod: formData.paymentMethod,
        }),
      });

      const data = await response.json();
      if (data.success) {
        onOrderSuccess(data.token, { paymentMethod: formData.paymentMethod, customerName: formData.name });
        // Clear cart
        localStorage.removeItem("chaOwalaCart");
      }
    } catch (error) {
      console.error("Order failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const paymentMethods = [
    { id: "Cash on Delivery", name: "ক্যাশ অন ডেলিভারি", icon: "BanknotesIcon", color: "bg-green-500" },
    { id: "bKash", name: "বিকাশ", icon: "CreditCardIcon", color: "bg-pink-600" },
    { id: "Card", name: "কার্ড পেমেন্ট", icon: "CreditCardIcon", color: "bg-blue-600" },
  ];

  if (status === "unauthenticated") {
    return (
      <div className="bg-card rounded-4xl shadow-warm p-8 border border-primary/10 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <Icon name="LockClosedIcon" size={40} className="text-primary" />
        </div>
        <h3 className="text-2xl font-bengali font-black text-foreground mb-4">
          লগইন প্রয়োজন
        </h3>
        <p className="text-muted-foreground mb-8 font-bengali max-w-xs mx-auto">
          অর্ডার এবং পেমেন্ট করতে আপনাকে অবশ্যই লগইন করতে হবে।
        </p>
        <Link 
          href="/login" 
          className="w-full bg-primary text-white py-4 rounded-2xl font-bengali font-bold text-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
        >
          <Icon name="ArrowLeftOnRectangleIcon" size={20} />
          লগইন পেজে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-4xl shadow-warm p-8 border border-primary/10">
      <h3 className="text-2xl font-bengali font-black text-foreground mb-6 flex items-center">
        <Icon name="DocumentCheckIcon" size={28} className="mr-3 text-primary" />
        আপনার তথ্য দিন
      </h3>
      
      <div className="mb-6 p-4 bg-primary/5 rounded-2xl border border-primary/10">
         <p className="text-sm font-bengali text-primary">
           শুভেচ্ছা <strong>{session?.user?.name}</strong>! আপনার পছন্দের চা অর্ডার শুরু করুন।
         </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bengali font-bold text-muted-foreground mb-2">আপনার নাম *</label>
            <input
              type="text"
              required
              className="w-full px-5 py-4 bg-background border border-border/50 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-bengali"
              placeholder="নাম লিখুন"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1 font-bengali">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-bengali font-bold text-muted-foreground mb-2">ফোন নম্বর *</label>
            <input
              type="tel"
              required
              className="w-full px-5 py-4 bg-background border border-border/50 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-heading"
              placeholder="01XXXXXXXXX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1 font-bengali">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bengali font-bold text-muted-foreground mb-2">ইমেইল (ঐচ্ছিক)</label>
          <input
            type="email"
            className="w-full px-5 py-4 bg-background border border-border/50 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-heading"
            placeholder="example@mail.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-bengali font-bold text-muted-foreground mb-2">ডেলিভারি ঠিকানা</label>
          <textarea
            rows={3}
            className="w-full px-5 py-4 bg-background border border-border/50 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none font-bengali"
            placeholder="ঠিকানা লিখুন (টেক-অওয়ে হলে খালি রাখুন)"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-bengali font-bold text-muted-foreground mb-4">পেমেন্ট পদ্ধতি পছন্দ করুন</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                className={`
                  relative p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center space-y-2
                  ${formData.paymentMethod === method.id 
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/5" 
                    : "border-border/50 hover:border-primary/30 bg-background"}
                `}
              >
                <div className={`w-10 h-10 rounded-full ${method.color} flex items-center justify-center text-white shadow-md`}>
                    <Icon name={method.icon as any} size={20} />
                </div>
                <span className="text-xs font-bengali font-bold">{method.name}</span>
                {formData.paymentMethod === method.id && (
                    <div className="absolute top-2 right-2">
                        <Icon name="CheckCircleIcon" size={16} className="text-primary" variant="solid" />
                    </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || orderItems.length === 0}
          className="w-full bg-primary text-white py-5 rounded-2xl font-bengali font-black text-xl shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <Icon name="ArrowPathIcon" size={24} className="animate-spin" />
          ) : (
            <>
              <Icon name="ShoppingBagIcon" size={24} />
              <span>অর্ডার সম্পন্ন করুন</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
