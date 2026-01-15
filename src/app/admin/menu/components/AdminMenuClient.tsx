"use client";

import { useState, useEffect } from "react";
import Icon from "@/components/ui/AppIcon";
import MenuTable from "./MenuTable";
import MenuModal from "./MenuModal";

export default function AdminMenuClient() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/menu");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (formData: any) => {
    const url = "/api/admin/menu";
    const method = editingItem ? "PUT" : "POST";
    const body = editingItem ? { ...formData, _id: editingItem._id } : formData;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        setShowModal(false);
        setEditingItem(null);
        fetchMenu();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("আপনি কি নিশ্চিতভাবে এই আইটেমটি মুছে ফেলতে চান?")) return;
    try {
      await fetch(`/api/admin/menu?id=${id}`, { method: "DELETE" });
      fetchMenu();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
        <div>
          <h1 className="text-2xl font-black font-bengali text-gray-900">মেনু ম্যানেজমেন্ট</h1>
          <p className="text-sm text-gray-500 font-bengali">নতুন আইটেম যোগ করুন এবং ইনভেন্টরি কন্ট্রোল করুন</p>
        </div>
        <button 
          onClick={() => { setEditingItem(null); setShowModal(true); }}
          className="bg-primary text-white px-6 py-3 rounded-2xl font-bengali font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          <Icon name="PlusCircleIcon" size={20} />
          আইটেম দিন
        </button>
      </div>

      {/* Main Table */}
      <MenuTable 
        items={items} 
        loading={loading} 
        onEdit={(item) => { setEditingItem(item); setShowModal(true); }}
        onDelete={deleteItem}
      />

      {/* Modal */}
      {showModal && (
        <MenuModal 
          isOpen={showModal}
          onClose={() => { setShowModal(false); setEditingItem(null); }}
          onSubmit={handleAction}
          initialData={editingItem}
        />
      )}
    </div>
  );
}
