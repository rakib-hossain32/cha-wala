interface OrderItem {
  id: number;
  name: string;
  nameBengali: string;
  quantity: number;
  price: number;
}

interface OrderSummaryCardProps {
  items: OrderItem[];
  totalAmount: number;
}

export default function OrderSummaryCard({
  items,
  totalAmount,
}: OrderSummaryCardProps) {
  return (
    <div className="bg-card rounded-lg shadow-warm p-6 border border-border">
      <h3 className="text-xl font-bengali font-bold text-primary mb-4">
        আপনার অর্ডার
      </h3>
      <p className="text-sm font-heading text-muted-foreground mb-4">
        Your Order Summary
      </p>

      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center py-2 border-b border-border"
          >
            <div className="flex-1">
              <p className="font-bengali font-semibold text-foreground">
                {item.nameBengali}
              </p>
              <p className="text-sm font-heading text-muted-foreground">
                {item.name}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                Qty: {item.quantity}
              </p>
              <p className="font-semibold text-primary">
                ৳{item.price * item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t-2 border-primary">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bengali font-bold text-foreground">
            মোট মূল্য
          </span>
          <span className="text-2xl font-bold text-primary">
            ৳{totalAmount}
          </span>
        </div>
        <p className="text-sm font-heading text-muted-foreground text-right mt-1">
          Total Amount
        </p>
      </div>
    </div>
  );
}
