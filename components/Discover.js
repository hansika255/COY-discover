
"use client";

import { useEffect, useState } from "react";
import SwipeCard from "./SwipeCard";

const ANIMATION_MS = 300;

const wait = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default function Discover({ onMatch }) {
  const [feed, setFeed] = useState(null);
  const [leaving, setLeaving] = useState(null);
  const [error, setError] = useState("");

  async function loadFeed() {
    try {
      setError("");

      const response = await fetch("/api/feed", { cache: "no-store" });

      if (!response.ok) {
        throw new Error("Unable to load profiles.");
      }

      const data = await response.json();
      setFeed(data);
    } catch (err) {
      setError(err.message);
      setFeed([]);
    }
  }

  useEffect(() => {
    loadFeed();
  }, []);

  async function decide(action) {
    if (leaving || !feed?.length) return;

    const profile = feed[0];
    setLeaving(action);

    try {
      const responsePromise = fetch("/api/swipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profileId: profile.id,
          action,
        }),
      });

      const [response] = await Promise.all([
        responsePromise,
        wait(ANIMATION_MS),
      ]);

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Swipe failed.");
      }

      setFeed((current) => current.slice(1));

      if (result.match) {
        onMatch(result.profile);
      }
    } catch (err) {
      setError(err.message);
      setLeaving(null);
      return;
    }

    setLeaving(null);
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "ArrowRight") decide("like");
      if (e.key === "ArrowLeft") decide("pass");
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  if (error) {
    return (
      <div className="empty">
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <button className="retry-btn" onClick={loadFeed}>
          Try again
        </button>
      </div>
    );
  }

  if (feed === null) {
    return <div className="empty">Loading profiles...</div>;
  }

  if (feed.length === 0) {
    return (
      <div className="empty">
        <div className="big">{"\u2726"}</div>
        <h2>You're all caught up!</h2>
        <p>No more profiles to discover right now.</p>
      </div>
    );
  }

  return (
    <div className="discover">
      <header className="discover-header">
        <h1>Discover</h1>
        <p>Find your next connection.</p>
      </header>

      <div className="deck">
        <SwipeCard
          key={feed[0].id}
          profile={feed[0]}
          leaving={leaving}
          onDecide={decide}
        />
      </div>

      <div className="actions">
        <button
          className="action-btn pass"
          onClick={() => decide("pass")}
          disabled={!!leaving}
          aria-label="Pass"
        >
          {"\u00D7"}
        </button>

        <button
          className="action-btn like"
          onClick={() => decide("like")}
          disabled={!!leaving}
          aria-label="Like"
        >
          {"\u2665"}
        </button>
      </div>
    </div>
  );
}
