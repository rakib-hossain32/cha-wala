
import { NextResponse } from 'next/server';
import { getDatabase } from '../../../lib/mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const email = searchParams.get('email');
    
    const db = await getDatabase();
    
    let query: any = {};
    if (email) {
      query.email = email;
    } else if (productId) {
      query.productId = productId;
    } else {
      // If no productId or email, show general site testimonials
      query = { $or: [{ productId: null }, { productId: { $exists: false } }] };
    }

    const testimonials = await db.collection("testimonials").find(query).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(testimonials);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = await getDatabase();
    const body = await request.json();

    if (!body.name || !body.testimonial) {
        return NextResponse.json({ error: 'Name and testimonial are required' }, { status: 400 });
    }

    const testimonial = {
        name: body.name,
        email: body.email || "", // Link to user account
        nameBengali: body.nameBengali || body.name,
        role: body.role || "Customer",
        roleBengali: body.roleBengali || body.role || "গ্রাহক",
        image: body.image || "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
        alt: body.name,
        rating: Number(body.rating) || 5,
        testimonial: body.testimonial,
        testimonialBengali: body.testimonialBengali || body.testimonial,
        productId: body.productId || null,
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date()
    };

    const result = await db.collection("testimonials").insertOne(testimonial);

    return NextResponse.json({ ...testimonial, _id: result.insertedId }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
