
const API_URL = 'http://localhost:4028/api/testimonials';

const testimonials = [
    {
      name: "Rajesh Patel",
      nameBengali: "রাজেশ প্যাটেল",
      role: "Regular Customer",
      roleBengali: "নিয়মিত গ্রাহক",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b2063027-1763295402790.png",
      rating: 5,
      testimonial: "The token system is brilliant! No more waiting in queues. The chai tastes exactly like my grandmother used to make.",
      testimonialBengali: "টোকেন সিস্টেম দুর্দান্ত! আর লাইনে অপেক্ষা করতে হয় না। চায়ের স্বাদ ঠিক আমার দাদির তৈরি চায়ের মতো।"
    },
    {
      name: "Meera Desai",
      nameBengali: "মীরা দেশাই",
      role: "Office Worker",
      roleBengali: "অফিস কর্মী",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fe9b5695-1763296011297.png",
      rating: 5,
      testimonial: "Perfect for my morning rush! Order online, pick up with token, and I am never late to work anymore.",
      testimonialBengali: "আমার সকালের তাড়াহুড়োর জন্য নিখুঁত! অনলাইনে অর্ডার করুন, টোকেন দিয়ে নিন, এবং আমি আর কখনও কাজে দেরি করি না।"
    },
    {
      name: "Arjun Malhotra",
      nameBengali: "অর্জুন মালহোত্রা",
      role: "Student",
      roleBengali: "ছাত্র",
      image: "https://images.unsplash.com/photo-1613683746628-a54a60277611",
      rating: 5,
      testimonial: "Best study spot! Great chai, fast service, and the community vibe is amazing.",
      testimonialBengali: "সেরা অধ্যয়ন স্থান! দুর্দান্ত চা, দ্রুত সেবা, এবং সম্প্রদায়ের পরিবেশ আশ্চর্যজনক।"
    }
];

async function seed() {
  console.log("🌱 Starting testimonial seed...");

  for (const item of testimonials) {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      if (!res.ok) throw new Error(`Failed to add testimonial from ${item.name}: ${res.statusText}`);
      console.log(`✅ Added testimonial from ${item.name}`);
    } catch (e) {
      console.error(`❌ Error adding testimonial from ${item.name}:`, e.message);
    }
  }

  console.log("DONE! 🚀");
}

seed();
