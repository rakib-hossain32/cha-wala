
import { NextResponse } from 'next/server';
import { getDatabase } from "../../../../lib/mongodb";
import { ObjectId } from 'mongodb';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const db = await getDatabase();
    const {id} = await params; 

    let query = {};
    if (ObjectId.isValid(id)) {
        query = { _id: new ObjectId(id) };
    } else {
        // Fallback for numeric IDs or other formats if needed
        // Assuming string IDs for now based on typical MongoDB usage or mapped IDs
         query = { _id: id };
    }
    
    // We might also need to check if it's a numeric ID stored as string or number
    // But standardizing on _id being ObjectId or string is safest for now.
    // If we used index+100 as fallback in the list, those won't work here easily unless we fetch all.
    // Let's assume real DB items have _id.

    const menuItem = await db.collection("menu_items").findOne(query);

    if (!menuItem) {
      return NextResponse.json({ error: 'Menu item not found' }, { status: 404 });
    }

    return NextResponse.json(menuItem);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
