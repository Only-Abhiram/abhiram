// app/api/visitors/route.ts
// Required env vars:
//   MONGODB_URI  ← paste your MongoDB connection string here

import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

// Re-use the client across hot-reloads in dev
declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

async function getClient(): Promise<MongoClient> {
  if (global._mongoClient) return global._mongoClient;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not defined");

  const client = new MongoClient(uri);
  await client.connect();
  global._mongoClient = client;
  return client;
}

export async function POST() {
  try {
    const client = await getClient();
    const db = client.db("portfolio");          // change DB name if you like
    const col = db.collection("visitor_count");

    // Upsert a single counter document and return the new value
    const result = await col.findOneAndUpdate(
      { _id: "global" as unknown as never },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" }
    );

    const count = result?.count ?? 1;
    return NextResponse.json({ count });
  } catch (err) {
    console.error("[visitors]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Optional: GET to read without incrementing
export async function GET() {
  try {
    const client = await getClient();
    const db = client.db("portfolio");
    const col = db.collection("visitor_count");
    const doc = await col.findOne({ _id: "global" as unknown as never });
    return NextResponse.json({ count: doc?.count ?? 0 });
  } catch (err) {
    console.error("[visitors]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}