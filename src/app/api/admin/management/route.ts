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
    const type = searchParams.get('type'); // 'testimonials' or 'users'
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const q = searchParams.get('q') || '';
    const skip = (page - 1) * limit;
    
    const db = await getDatabase();
    const collectionName = type === 'users' ? 'users' : 'testimonials';
    
    let query: any = {};
    if (q) {
      if (type === 'users') {
        query = {
          $or: [
            { name: { $regex: q, $options: 'i' } },
            { email: { $regex: q, $options: 'i' } }
          ]
        };
      } else {
        query = {
          $or: [
            { nameBengali: { $regex: q, $options: 'i' } },
            { testimonialBengali: { $regex: q, $options: 'i' } }
          ]
        };
      }
    }

    const total = await db.collection(collectionName).countDocuments(query);
    const items = await db.collection(collectionName)
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      items,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (e) {
    console.error(e);
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
    const type = searchParams.get('type'); // 'testimonials' or 'users'

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const db = await getDatabase();
    const collection = type === 'users' ? 'users' : 'testimonials';
    
    await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
