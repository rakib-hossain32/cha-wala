"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MenuCategory from "./MenuCategory";
import MenuItemCard from "./MenuItemCard";
import CartSummary from "./CartSummary";
import Icon from "@/components/ui/AppIcon";

interface MenuItem {
  id: number;
  name: string;
  nameBengali: string;
  description: string;
  descriptionBengali: string;
  price: number;
  image: string;
  alt: string;
  category: string;
  ingredients: string[];
  ingredientsBengali: string[];
  preparationTime: string;
  spiceLevel?: "mild" | "medium" | "hot";
  isVegetarian: boolean;
  isPopular?: boolean;
}

interface CartItem {
  id: number;
  name: string;
  nameBengali: string;
  price: number;
  quantity: number;
  image: string;
  alt: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Classic Masala Chai",
    nameBengali: "ক্লাসিক মসলা চা",
    description:
      "Traditional Bengali tea with aromatic spices, cardamom, ginger, and premium Assam tea leaves",
    descriptionBengali:
      "সুগন্ধি মসলা, এলাচ, আদা এবং প্রিমিয়াম আসাম চা পাতা দিয়ে তৈরি ঐতিহ্যবাহী বাংলা চা",
    price: 40,
    image:
      "https://img.rocket.new/generatedImages/rocket_gen_img_1edae3c66-1765129892610.png",
    alt: "Steaming cup of masala chai with visible spices and milk foam in traditional clay cup",
    category: "chai",
    ingredients: [
      "Assam Tea",
      "Milk",
      "Cardamom",
      "Ginger",
      "Cinnamon",
      "Sugar",
    ],
    ingredientsBengali: ["আসাম চা", "দুধ", "এলাচ", "আদা", "দারচিনি", "চিনি"],
    preparationTime: "5 min",
    spiceLevel: "medium",
    isVegetarian: true,
    isPopular: true,
  },
  {
    id: 2,
    name: "Adda Special Chai",
    nameBengali: "আড্ডা স্পেশাল চা",
    description:
      "Our signature blend with extra spices and a touch of jaggery for authentic Bengali flavor",
    descriptionBengali:
      "অতিরিক্ত মসলা এবং গুড়ের স্পর্শ সহ আমাদের বিশেষ মিশ্রণ খাঁটি বাংলা স্বাদের জন্য",
    price: 50,
    image: "https://images.unsplash.com/photo-1667237977239-0c6ba87f4d30",
    alt: "Special chai in decorative cup with steam rising, garnished with crushed spices on saucer",
    category: "chai",
    ingredients: [
      "Premium Tea",
      "Buffalo Milk",
      "Jaggery",
      "Special Spice Mix",
      "Saffron",
    ],
    ingredientsBengali: [
      "প্রিমিয়াম চা",
      "মহিষের দুধ",
      "গুড়",
      "বিশেষ মসলা মিশ্রণ",
      "জাফরান",
    ],
    preparationTime: "7 min",
    spiceLevel: "hot",
    isVegetarian: true,
    isPopular: true,
  },
  {
    id: 3,
    name: "Ginger Lemon Chai",
    nameBengali: "আদা লেবু চা",
    description:
      "Refreshing blend of strong ginger, fresh lemon, and honey for a zesty experience",
    descriptionBengali:
      "তীব্র আদা, তাজা লেবু এবং মধুর সতেজ মিশ্রণ একটি সুস্বাদু অভিজ্ঞতার জন্য",
    price: 45,
    image: "https://images.unsplash.com/photo-1583571559982-f0dd21cf0c50",
    alt: "Clear glass cup of ginger lemon tea with visible lemon slices and ginger pieces floating",
    category: "chai",
    ingredients: ["Green Tea", "Fresh Ginger", "Lemon", "Honey", "Mint"],
    ingredientsBengali: ["সবুজ চা", "তাজা আদা", "লেবু", "মধু", "পুদিনা"],
    preparationTime: "4 min",
    spiceLevel: "mild",
    isVegetarian: true,
  },
  {
    id: 4,
    name: "Cardamom Chai",
    nameBengali: "এলাচ চা",
    description:
      "Aromatic cardamom-infused tea with creamy milk and subtle sweetness",
    descriptionBengali:
      "সুগন্ধি এলাচ-মিশ্রিত চা ক্রিমি দুধ এবং সূক্ষ্ম মিষ্টতা সহ",
    price: 42,
    image: "https://images.unsplash.com/photo-1622043105847-3e344288056a",
    alt: "Cardamom chai in white ceramic cup with whole cardamom pods arranged beside it",
    category: "chai",
    ingredients: ["Black Tea", "Milk", "Green Cardamom", "Sugar"],
    ingredientsBengali: ["কালো চা", "দুধ", "সবুজ এলাচ", "চিনি"],
    preparationTime: "5 min",
    isVegetarian: true,
  },
  {
    id: 5,
    name: "Vegetable Samosa",
    nameBengali: "সবজি সমুসা",
    description:
      "Crispy golden triangles filled with spiced potatoes, peas, and aromatic herbs",
    descriptionBengali:
      "মসলাদার আলু, মটর এবং সুগন্ধি ভেষজ দিয়ে ভরা খাস্তা সোনালি ত্রিভুজ",
    price: 30,
    image: "https://images.unsplash.com/photo-1706092949227-52062b5eb190",
    alt: "Three golden brown crispy samosas on white plate with green chutney and tamarind sauce",
    category: "snacks",
    ingredients: ["Potato", "Peas", "Spices", "Wheat Flour", "Oil"],
    ingredientsBengali: ["আলু", "মটর", "মসলা", "গমের আটা", "তেল"],
    preparationTime: "2 min",
    spiceLevel: "medium",
    isVegetarian: true,
    isPopular: true,
  },
  {
    id: 6,
    name: "Onion Pakora",
    nameBengali: "পেঁয়াজ পাকোড়া",
    description:
      "Crispy fritters made with sliced onions, gram flour, and traditional spices",
    descriptionBengali:
      "কাটা পেঁয়াজ, ছোলার আটা এবং ঐতিহ্যবাহী মসলা দিয়ে তৈরি খাস্তা পাকোড়া",
    price: 25,
    image: "https://images.unsplash.com/photo-1615187986856-c09e9681547a",
    alt: "Plate of crispy golden onion pakoras with visible onion strands and green chutney",
    category: "snacks",
    ingredients: ["Onion", "Gram Flour", "Spices", "Coriander", "Oil"],
    ingredientsBengali: ["পেঁয়াজ", "ছোলার আটা", "মসলা", "ধনেপাতা", "তেল"],
    preparationTime: "3 min",
    spiceLevel: "medium",
    isVegetarian: true,
  },
  {
    id: 7,
    name: "Bread Pakora",
    nameBengali: "ব্রেড পাকোড়া",
    description:
      "Spiced potato filling between bread slices, coated in gram flour batter and deep-fried",
    descriptionBengali:
      "ব্রেড স্লাইসের মধ্যে মসলাদার আলুর ভরাট, ছোলার আটার প্রলেপ দিয়ে ভাজা",
    price: 35,
    image: "https://images.unsplash.com/photo-1732255490348-96b1cee931aa",
    alt: "Stack of golden bread pakoras cut diagonally showing potato filling with mint chutney",
    category: "snacks",
    ingredients: ["Bread", "Potato", "Gram Flour", "Spices", "Oil"],
    ingredientsBengali: ["ব্রেড", "আলু", "ছোলার আটা", "মসলা", "তেল"],
    preparationTime: "4 min",
    spiceLevel: "mild",
    isVegetarian: true,
    isPopular: true,
  },
  {
    id: 8,
    name: "Aloo Chop",
    nameBengali: "আলু চপ",
    description:
      "Bengali-style potato cutlets with spiced filling, coated in breadcrumbs",
    descriptionBengali:
      "মসলাদার ভরাট সহ বাংলা স্টাইলের আলু কাটলেট, ব্রেডক্রাম্বে মোড়ানো",
    price: 28,
    image: "https://images.unsplash.com/photo-1619803086719-ee9bab65be62",
    alt: "Round golden potato cutlets on banana leaf with red chili sauce drizzle",
    category: "snacks",
    ingredients: ["Potato", "Breadcrumbs", "Spices", "Coriander", "Oil"],
    ingredientsBengali: ["আলু", "ব্রেডক্রাম্ব", "মসলা", "ধনেপাতা", "তেল"],
    preparationTime: "3 min",
    spiceLevel: "medium",
    isVegetarian: true,
  },
  {
    id: 9,
    name: "Rasgulla",
    nameBengali: "রসগোল্লা",
    description:
      "Soft and spongy cottage cheese balls soaked in light sugar syrup",
    descriptionBengali: "হালকা চিনির সিরায় ভেজানো নরম এবং স্পঞ্জি ছানার বল",
    price: 40,
    image:
      "https://img.rocket.new/generatedImages/rocket_gen_img_19875ecb4-1765100244350.png",
    alt: "White spongy rasgulla balls in clear syrup in decorative silver bowl",
    category: "sweets",
    ingredients: ["Cottage Cheese", "Sugar", "Cardamom", "Rose Water"],
    ingredientsBengali: ["ছানা", "চিনি", "এলাচ", "গোলাপ জল"],
    preparationTime: "1 min",
    isVegetarian: true,
    isPopular: true,
  },
  {
    id: 10,
    name: "Sandesh",
    nameBengali: "সন্দেশ",
    description:
      "Traditional Bengali sweet made from fresh cottage cheese and sugar",
    descriptionBengali: "তাজা ছানা এবং চিনি দিয়ে তৈরি ঐতিহ্যবাহী বাংলা মিষ্টি",
    price: 35,
    image: "https://images.unsplash.com/photo-1708782343129-47b08cdc2329",
    alt: "Decorative white sandesh pieces with pistachio garnish arranged on brass plate",
    category: "sweets",
    ingredients: ["Cottage Cheese", "Sugar", "Cardamom", "Pistachio"],
    ingredientsBengali: ["ছানা", "চিনি", "এলাচ", "পেস্তা"],
    preparationTime: "1 min",
    isVegetarian: true,
  },
  {
    id: 11,
    name: "Mishti Doi",
    nameBengali: "মিষ্টি দই",
    description:
      "Sweet yogurt with caramelized flavor, served in traditional clay pots",
    descriptionBengali:
      "ক্যারামেলাইজড স্বাদের মিষ্টি দই, ঐতিহ্যবাহী মাটির পাত্রে পরিবেশিত",
    price: 45,
    image:
      "https://img.rocket.new/generatedImages/rocket_gen_img_1b8eb77d1-1766149429900.png",
    alt: "Clay pot filled with creamy caramel-colored mishti doi topped with saffron strands",
    category: "sweets",
    ingredients: ["Milk", "Yogurt Culture", "Jaggery", "Cardamom"],
    ingredientsBengali: ["দুধ", "দইয়ের সংস্কৃতি", "গুড়", "এলাচ"],
    preparationTime: "1 min",
    isVegetarian: true,
    isPopular: true,
  },
  {
    id: 12,
    name: "Gulab Jamun",
    nameBengali: "গোলাপ জামুন",
    description:
      "Deep-fried milk solid balls soaked in rose-flavored sugar syrup",
    descriptionBengali:
      "গোলাপ-স্বাদযুক্ত চিনির সিরায় ভেজানো গভীর ভাজা দুধের কঠিন বল",
    price: 38,
    image: "https://images.unsplash.com/photo-1584106540739-da89566ae9f3",
    alt: "Dark brown gulab jamun balls in rose syrup garnished with silver leaf in ceramic bowl",
    category: "sweets",
    ingredients: ["Milk Powder", "Flour", "Sugar", "Rose Water", "Cardamom"],
    ingredientsBengali: ["দুধের গুঁড়া", "আটা", "চিনি", "গোলাপ জল", "এলাচ"],
    preparationTime: "2 min",
    isVegetarian: true,
  },
];

const categories = [
  { id: "all", name: "All Items", nameBengali: "সব আইটেম" },
  { id: "chai", name: "Chai", nameBengali: "চা" },
  { id: "snacks", name: "Snacks", nameBengali: "নাস্তা" },
  { id: "sweets", name: "Sweets", nameBengali: "মিষ্টি" },
];

export default function MenuInteractive() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("chaiTokenCart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("chaiTokenCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (item: MenuItem, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        return [
          ...prevItems,
          {
            id: item.id,
            name: item.name,
            nameBengali: item.nameBengali,
            price: item.price,
            quantity: quantity,
            image: item.image,
            alt: item.alt,
          },
        ];
      }
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      router.push("/order-fulfillment-center");
    }
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameBengali.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pt-20 pb-32 lg:pb-8">
      <div className="w-full px-4 lg:px-8 py-8">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="text-center mb-8">
            <h1 className="font-bengali font-bold text-4xl lg:text-5xl text-foreground mb-3">
              আমাদের মেনু
            </h1>
            <p className="font-heading text-xl text-muted-foreground">
              Explore Our Authentic Collection
            </p>
            <p className="font-bengali text-sm text-muted-foreground mt-2">
              খাঁটি স্বাদের সংগ্রহ অন্বেষণ করুন
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search menu items... / মেনু আইটেম খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary cultural-transition"
              />

              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Icon name="MagnifyingGlassIcon" size={20} />
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <MenuCategory
                key={category.id}
                category={category.name}
                categoryBengali={category.nameBengali}
                isActive={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              />
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="max-w-7xl mx-auto lg:pr-[25rem]">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <Icon
                name="MagnifyingGlassIcon"
                size={64}
                className="mx-auto text-muted-foreground mb-4"
              />
              <p className="font-bengali text-xl text-muted-foreground mb-2">
                কোন আইটেম পাওয়া যায়নি
              </p>
              <p className="font-heading text-muted-foreground">
                No items found matching your search
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sticky Cart Summary */}
      <CartSummary
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
