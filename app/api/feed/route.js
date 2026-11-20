import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { profiles, readDb, toPublic } from "@/lib/db";

export async function GET() {
  await headers();

  try {
    const { swipes } = readDb();
    const swipedIds = new Set(swipes.map((swipe) => swipe.profileId));
    const feed = profiles
      .filter((profile) => !swipedIds.has(profile.id))
      .map(toPublic);

    return NextResponse.json(feed, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to load profiles." },
      { status: 500 },
    );
  }
}
