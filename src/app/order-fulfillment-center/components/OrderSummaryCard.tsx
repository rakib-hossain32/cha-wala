
import Icon from "../../../components/ui/AppIcon";

interface CartItem {
  id: number | string;
  name: string;
  nameBengali: string;
  price: number;
  quantity: number;
}

interface OrderSummaryCardProps {
  items: CartItem[];
  totalAmount: number;
}

export default function OrderSummaryCard({
  items,
  totalAmount,
}: OrderSummaryCardProps) {
  return (
    <div className="bg-card rounded-4xl shadow-warm p-8 border border-primary/10 h-fit">
      <div className="flex items-center justify-between mb-8">
        <div>
            <h3 className="text-2xl font-bengali font-black text-foreground">
                আপনার অর্ডার
            </h3>
            <div className="h-1.5 w-12 bg-primary rounded-full mt-1"></div>
        </div>
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <Icon name="ShoppingCartIcon" size={24} />
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {items.length === 0 ? (
            <div className="text-center py-10 opacity-50">
                <Icon name="ShoppingBagIcon" size={48} className="mx-auto mb-2" />
                <p className="font-bengali">আপনার কার্টে কোনো আইটেম নেই</p>
            </div>
        ) : (
            items.map((item) => (
                <div
                    key={item.id}
                    className="flex justify-between items-center p-4 bg-muted/30 rounded-2xl border border-border/30 hover:border-primary/20 transition-all group"
                >
                    <div className="flex-1">
                        <p className="font-bengali font-extrabold text-foreground group-hover:text-primary transition-colors">
                            {item.nameBengali}
                        </p>
                        <p className="text-xs font-heading text-muted-foreground mt-1">
                            পরিমাণ: {item.quantity} × ৳{item.price}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-lg text-primary">
                            ৳{item.price * item.quantity}
                        </p>
                    </div>
                </div>
            ))
        )}
      </div>

      <div className="pt-6 border-t-2 border-dashed border-primary/20">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bengali font-bold text-muted-foreground">
            সাবটোটাল
          </span>
          <span className="font-bold text-foreground">
            ৳{totalAmount}
          </span>
        </div>
        <div className="flex justify-between items-center">
            <span className="text-xl font-bengali font-black text-foreground">
                সর্বমোট মূল্য
            </span>
            <span className="text-3xl font-black text-primary drop-shadow-sm">
                ৳{totalAmount}
            </span>
        </div>
      </div>
    </div>
  );
}
