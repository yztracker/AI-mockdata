import { NextResponse } from "next/server";
import { getData, deleteExpiredData } from "@/lib/db";

export async function GET(request, { params }) {
  const { dataHash } = params;

  console.log(`Received GET request for dataHash: ${dataHash}`);

  try {
    await deleteExpiredData(); // Delete expired data

    const result = await getData(dataHash);
    if (result) {
      const { data, expirationTime } = result;
      if (Date.now() > expirationTime) {
        console.log(`Data expired for hash: ${dataHash}`);
        return NextResponse.json({ error: "Data expired" }, { status: 404 });
      }
      console.log(`Data found for hash: ${dataHash}`);
      return NextResponse.json({ data, expirationTime });
    } else {
      console.log(`Data not found for hash: ${dataHash}`);
      return NextResponse.json({ error: "Data not found" }, { status: 404 });
    }
  } catch (error) {
    console.error(`Error processing request for hash: ${dataHash}`, error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
