
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const PROFILES_PATH = path.join(DATA_DIR, "profiles.json");
const DB_PATH = path.join(DATA_DIR, "db.json");

export const profiles = JSON.parse(
  fs.readFileSync(PROFILES_PATH, "utf8")
);

export function readDb() {
  if (!fs.existsSync(DB_PATH)) {
    return { swipes: [], matches: [] };
  }

  return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
}

export function writeDb(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

export function toPublic(profile) {
  const { likesMe, ...publicProfile } = profile;
  return publicProfile;
}
