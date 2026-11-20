"use client";

const TABS = [
  { id: "discover", label: "Discover", icon: "\u2661" },
  { id: "matches", label: "Matches", icon: "\u2728" },
];

export default function TabBar({ active, onChange }) {
  return (
    <nav className="tabbar" aria-label="Main navigation">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`tab ${active === tab.id ? "active" : ""}`}
          onClick={() => onChange(tab.id)}
        >
          <span className="tab-icon">{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
