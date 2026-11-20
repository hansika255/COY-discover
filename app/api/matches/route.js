import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { profiles, readDb, toPublic } from "@/lib/db";

export async function GET() {
  await headers();

  try {
    const { matches } = readDb();
    const result = matches
      .map((match) => {
        const profile = profiles.find((item) => item.id === match.profileId);
        return profile
          ? { ...toPublic(profile), matchedAt: match.at }
          : null;
      })
      .filter(Boolean)
      .reverse();

    return NextResponse.json(result, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to load matches." },
      { status: 500 },
    );
  }
}
