
const API_BASE = 'http://localhost:4028/api';

const menuItems = [
  {
    name: "Masala Chai",
    description: "Authentic spiced tea with cardamom, ginger, and cinnamon.",
    price: 3.50,
    category: "Chai",
    imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Samosa",
    description: "Crispy pastry filled with spiced potatoes and peas.",
    price: 2.00,
    category: "Snacks",
    imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Karak Tea",
    description: "Strong, creamy tea boiled to perfection.",
    price: 3.00,
    category: "Chai",
    imageUrl: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Gulab Jamun",
    description: "Sweet milk solids soaked in rose-flavored sugar syrup.",
    price: 4.50,
    category: "Sweets",
    imageUrl: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80"
  }
];

const galleryPosts = [
  {
    title: "Morning Vibes",
    imageUrl: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=800&q=80",
    author: "Rahul D."
  },
  {
    title: "Chai with Friends",
    imageUrl: "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&w=800&q=80",
    author: "Anita S."
  }
];

async function seed() {
  console.log("🌱 Starting seed...");

  // Seed Menu
  console.log("Seeding Menu Items...");
  for (const item of menuItems) {
    try {
      const res = await fetch(`${API_BASE}/menu`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      if (!res.ok) throw new Error(`Failed to add ${item.name}: ${res.statusText}`);
      console.log(`✅ Added ${item.name}`);
    } catch (e) {
      console.error(`❌ Error adding ${item.name}:`, e.message);
    }
  }

  // Seed Gallery
  console.log("Seeding Gallery Posts...");
  for (const post of galleryPosts) {
    try {
      const res = await fetch(`${API_BASE}/gallery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
      });
      if (!res.ok) throw new Error(`Failed to add ${post.title}: ${res.statusText}`);
      console.log(`✅ Added ${post.title}`);
    } catch (e) {
      console.error(`❌ Error adding ${post.title}:`, e.message);
    }
  }

  console.log("DONE! 🚀");
}

seed();
