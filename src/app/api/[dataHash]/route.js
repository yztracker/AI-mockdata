import { NextResponse } from "next/server";
import { dataStore } from "../generate/route";

export async function GET(request, { params }) {
  const { dataHash } = params;

  console.log(`Received GET request for dataHash: ${dataHash}`);
  console.log(`Current dataStore keys: ${Array.from(dataStore.keys())}`);

  try {
    if (dataStore.has(dataHash)) {
      const { data, expirationTime } = dataStore.get(dataHash);
      if (Date.now() > expirationTime) {
        dataStore.delete(dataHash);
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
