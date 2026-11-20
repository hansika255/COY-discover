"use client";

import { useState } from "react";
import TabBar from "@/components/TabBar";
import Discover from "@/components/Discover";
import Matches from "@/components/Matches";
import MatchModal from "@/components/MatchModal";

export default function Page() {
  const [tab, setTab] = useState("discover");
  const [match, setMatch] = useState(null);

  return (
    <div className="app">
      <main className="content">
        {tab === "discover" && <Discover onMatch={setMatch} />}
        {tab === "matches" && <Matches />}
      </main>

      <TabBar active={tab} onChange={setTab} />

      {match && (
        <MatchModal
          profile={match}
          onClose={() => setMatch(null)}
          onViewMatches={() => {
            setMatch(null);
            setTab("matches");
          }}
        />
      )}
    </div>
  );
}
