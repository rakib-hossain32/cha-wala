import { NextResponse } from 'next/server';
import { getDatabase } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions) as any;
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '8');
    const skip = (page - 1) * limit;

    const db = await getDatabase();
    const total = await db.collection("menu_items").countDocuments();
    const items = await db.collection("menu_items")
      .find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({ items, total, totalPages: Math.ceil(total / limit), currentPage: page });
  } catch (e) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions) as any;
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const db = await getDatabase();
    const body = await request.json();
    
    const item = {
      ...body,
      price: Number(body.price),
      createdAt: new Date(),
      updatedAt: new Date(),
      isAvailable: true
    };
    
    const result = await db.collection("menu_items").insertOne(item);
    return NextResponse.json({ ...item, _id: result.insertedId });
  } catch (e) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions) as any;
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const db = await getDatabase();
    const { _id, ...updateData } = await request.json();
    
    if (updateData.price) updateData.price = Number(updateData.price);
    updateData.updatedAt = new Date();

    await db.collection("menu_items").updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions) as any;
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const db = await getDatabase();
    await db.collection("menu_items").deleteOne({ _id: new ObjectId(id as string) });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
