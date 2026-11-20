import { NextResponse } from "next/server";
import { profiles, readDb, toPublic, writeDb } from "@/lib/db";

export async function POST(request) {
  try {
    const { profileId, action } = await request.json();

    if (!profileId || !["like", "pass"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid profile ID or action." },
        { status: 400 },
      );
    }

    const profile = profiles.find((item) => item.id === profileId);
    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found." },
        { status: 404 },
      );
    }

    const db = readDb();
    if (db.swipes.some((swipe) => swipe.profileId === profileId)) {
      return NextResponse.json(
        { error: "Already swiped on this profile." },
        { status: 409 },
      );
    }

    const at = new Date().toISOString();
    db.swipes.push({ profileId, action, at });

    const isMatch = action === "like" && profile.likesMe;
    if (isMatch) db.matches.push({ profileId, at });

    writeDb(db);

    return NextResponse.json({
      match: isMatch,
      profile: isMatch ? toPublic(profile) : null,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to process swipe." },
      { status: 500 },
    );
  }
}
