"use client";

import Icon from "@/components/ui/AppIcon";

interface MenuTableProps {
  items: any[];
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  loading: boolean;
}

export default function MenuTable({ items, onEdit, onDelete, loading }: MenuTableProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-20 bg-gray-100 animate-pulse rounded-2xl w-full"></div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-20 text-center bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-100">
        <Icon name="InboxIcon" size={48} className="mx-auto text-gray-200 mb-4" />
        <p className="text-gray-400 font-bengali">মেনুতে কোনো আইটেম নেই</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-50">
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase font-heading tracking-widest">আইটেম</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase font-heading tracking-widest">ক্যাটাগরি</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase font-heading tracking-widest">মূল্য</th>
              <th className="px-6 py-4 text-right text-[10px] font-black text-gray-400 uppercase font-heading tracking-widest">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden border border-gray-100 shrink-0">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} className="w-full h-full object-cover" alt="" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <Icon name="PhotoIcon" size={20} />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 font-bengali text-sm">{item.nameBengali}</p>
                      {item.isSpecial && (
                        <span className="text-[10px] text-primary font-bold font-bengali">{item.specialTag || "স্পেশাল"}</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-black text-gray-500 bg-gray-100 px-3 py-1 rounded-full uppercase">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-black text-gray-900 font-heading">৳{item.price}</span>
                    {Number(item.discount) > 0 && (
                      <span className="text-[10px] text-emerald-500 font-bold">{item.discount}% ডিসকাউন্ট</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => onEdit(item)}
                      className="p-2.5 text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                    >
                      <Icon name="PencilSquareIcon" size={18} />
                    </button>
                    <button 
                      onClick={() => onDelete(item._id)}
                      className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                    >
                      <Icon name="TrashIcon" size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
