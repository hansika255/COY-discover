
import fs from "fs";
import path from "path";

const people = [
  ["Aanya", "F", "Delhi - Miranda House"],
  ["Rohan", "M", "Gurgaon - Ashoka University"],
  ["Meera", "F", "Mumbai - St. Xavier's"],
  ["Kabir", "M", "Bangalore - PES University"],
  ["Ishita", "F", "Pune - Symbiosis"],
  ["Arjun", "M", "Chandigarh - Panjab University"],
  ["Tara", "F", "Delhi - LSR"],
  ["Vihaan", "M", "Noida - Amity"],
  ["Sanya", "F", "Jaipur - MNIT"],
  ["Dev", "M", "Delhi - DTU"],
  ["Riya", "F", "Hyderabad - IIIT-H"],
  ["Aarav", "M", "Chennai - SRM"],
  ["Kiara", "F", "Gurgaon - Manipal"],
  ["Ayaan", "M", "Delhi - St. Stephen's"],
  ["Diya", "F", "Kolkata - Presidency"],
  ["Reyansh", "M", "Bangalore - Christ University"],
  ["Navya", "F", "Amritsar - GNDU"],
  ["Karan", "M", "Ludhiana - PAU"],
  ["Pooja", "F", "Lucknow - Lucknow University"],
  ["Samar", "M", "Mumbai - NMIMS"],
  ["Anika", "F", "Delhi - Hindu College"],
  ["Yash", "M", "Pune - COEP"],
  ["Myra", "F", "Chandigarh - PEC"],
  ["Neil", "M", "Gurgaon - IMT"],
  ["Zoya", "F", "Bhopal - MANIT"],
  ["Aditya", "M", "Delhi - IIT Delhi"],
  ["Saanvi", "F", "Mumbai - Mithibai"],
  ["Ishaan", "M", "Bangalore - RV College"],
  ["Pari", "F", "Jaipur - Banasthali"],
  ["Veer", "M", "Noida - JIIT"],
  ["Nisha", "F", "Delhi - JNU"],
  ["Rudra", "M", "Chandigarh - Chitkara"],
];

const bios = [
  "Coffee first, conversations after.",
  "Weekend trekker, weekday overthinker.",
  "Will trade playlists for good food recs.",
  "Building things and breaking things.",
  "Looking for someone to explore new cafes with.",
  "Dog person. Sunsets. Bad puns.",
  "Always up for a spontaneous road trip.",
  "Bookworm with a gym membership I actually use.",
];

const interests = [
  "Travel", "Music", "Coding", "Movies",
  "Fitness", "Photography", "Cooking",
  "Reading", "Gaming", "Art", "Football", "Cafes",
];

const profiles = people.map(([name, gender, place], i) => ({
  id: `p${i + 1}`,
  name,
  age: 19 + ((i * 3) % 9),
  photo: `https://randomuser.me/api/portraits/${gender === "F" ? "women" : "men"}/${i + 10}.jpg`,
  bio: bios[i % bios.length],
  place,
  interests: [0, 4, 7].map(
    (k) => interests[(i + k) % interests.length]
  ),
  likesMe: i % 3 === 0,
}));

const dataPath = path.join(process.cwd(), "data", "profiles.json");

fs.writeFileSync(dataPath, JSON.stringify(profiles, null, 2));
fs.writeFileSync(path.join(process.cwd(), "data", "db.json"), JSON.stringify({ swipes: [], matches: [] }, null, 2));

console.log(`Successfully seeded ${profiles.length} profiles.`);
