import { NextResponse } from 'next/server';
import { getDatabase } from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const token = searchParams.get('token');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const db = await getDatabase();
    
    let query: any = {};
    if (status && status !== 'All') query.status = status;
    if (token) query.token = { $regex: token, $options: 'i' };

    const total = await db.collection("orders").countDocuments(query);
    const orders = await db.collection("orders")
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      items: orders,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (e) {
    console.error("GET Orders Error:", e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { orderId, status } = await request.json();
    
    if (!orderId || !status) {
        return NextResponse.json({ error: 'Missing orderId or status' }, { status: 400 });
    }

    const db = await getDatabase();
    
    let objectId;
    try {
        objectId = new ObjectId(orderId);
    } catch (err) {
        return NextResponse.json({ error: 'Invalid orderId format' }, { status: 400 });
    }

    const result = await db.collection("orders").updateOne(
        { _id: objectId },
        { $set: { status } }
    );

    if (result.matchedCount === 0) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("PUT Order Status Error:", e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
