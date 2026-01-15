
import { NextResponse } from 'next/server';
import { getDatabase } from "../../../lib/mongodb";

export async function GET() {
  try {
    const db = await getDatabase();
    const menuItems = await db.collection("menu_items").find({}).toArray();
    
    // Get review statistics for each product
    const reviewStats = await db.collection("testimonials").aggregate([
      { $match: { productId: { $exists: true, $ne: null } } },
      {
        $group: {
          _id: "$productId",
          reviewCount: { $sum: 1 },
          avgRating: { $avg: "$rating" }
        }
      }
    ]).toArray();

    const statsMap = reviewStats.reduce((acc: any, stat: any) => {
      acc[stat._id] = {
        reviewCount: stat.reviewCount,
        avgRating: Math.round(stat.avgRating * 10) / 10 // Round to 1 decimal
      };
      return acc;
    }, {});

    const itemsWithStats = menuItems.map(item => ({
      ...item,
      reviewCount: statsMap[item._id.toString()]?.reviewCount || 0,
      avgRating: statsMap[item._id.toString()]?.avgRating || 0
    }));

    return NextResponse.json(itemsWithStats);
  } catch (e) {
    console.error("Failed to fetch menu with stats:", e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = await getDatabase();
    const body = await request.json();
    
    // Basic validation
    if (!body.name || !body.price) {
        return NextResponse.json({ error: 'Name and price are required' }, { status: 400 });
    }

    const result = await db.collection("menu_items").insertOne({
        name: body.name,
        description: body.description || "",
        nameBengali: body.nameBengali || body.name,
        descriptionBengali: body.descriptionBengali || body.description,
        price: Number(body.price),
        category: body.category || "General",
        imageUrl: body.imageUrl || "",
        isAvailable: true,
        createdAt: new Date()
    });

    return NextResponse.json(result, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
