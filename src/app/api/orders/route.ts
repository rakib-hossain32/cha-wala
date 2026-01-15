import { NextResponse } from 'next/server';
import { getDatabase } from "../../../lib/mongodb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const db = await getDatabase();
    const orders = await db.collection("orders").find({ email }).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(orders);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = await getDatabase();
    const body = await request.json();
    
    // Basic validation
    if (!body.customerName || !body.phone || !body.items || body.items.length === 0) {
        return NextResponse.json({ error: 'Missing required order details' }, { status: 400 });
    }

    // Generate unique token: CT + current year + random digits
    const token = `CT${new Date().getFullYear().toString().slice(-2)}${Math.floor(1000 + Math.random() * 9000)}`;

    const order = {
        token,
        customerName: body.customerName,
        phone: body.phone,
        email: body.email || "",
        address: body.address || "Takeaway",
        items: body.items,
        totalAmount: body.totalAmount,
        paymentMethod: body.paymentMethod || "Cash on Delivery",
        status: "Pending",
        createdAt: new Date()
    };

    const result = await db.collection("orders").insertOne(order);

    return NextResponse.json({ 
        success: true, 
        orderId: result.insertedId,
        token: token,
        order: order
    }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
