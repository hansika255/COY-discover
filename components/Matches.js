"use client";

import { useEffect, useState } from "react";

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadMatches() {
    try {
      setError("");
      const response = await fetch("/api/matches", { cache: "no-store" });
      if (!response.ok) throw new Error("Could not load matches.");
      setMatches(await response.json());
    } catch (err) {
      setError(err.message || "Could not load matches.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMatches();
  }, []);

  if (loading) return <div className="empty">Loading matches...</div>;
  if (error) return <div className="empty">{error}</div>;

  return (
    <section className="matches-page">
      <header className="discover-header">
        <h1>Your Matches ✨</h1>
        <p>People who liked you back.</p>
      </header>
      {matches.length === 0 ? (
        <div className="empty">
          <div className="big">♡</div>
          <h2>No matches yet</h2>
          <p>Keep discovering. Your connection might be next!</p>
        </div>
      ) : (
        <div className="matches-grid">
          {matches.map((person) => (
            <article className="match-card" key={person.id}>
              <img src={person.photo} alt={person.name} />
              <div className="match-details">
                <h3>{person.name}, {person.age}</h3>
                <p>{person.place}</p>
                <span>It's a match! ♥</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
