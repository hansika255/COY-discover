
"use client";

import { useRef, useState } from "react";

const THRESHOLD = 100;

export default function SwipeCard({ profile, leaving, onDecide }) {
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const startPoint = useRef({ x: 0, y: 0 });

  function handlePointerDown(e) {
    if (leaving) return;

    e.currentTarget.setPointerCapture(e.pointerId);

    startPoint.current = {
      x: e.clientX,
      y: e.clientY,
    };

    setDragging(true);
  }

  function handlePointerMove(e) {
    if (!dragging) return;

    setDrag({
      x: e.clientX - startPoint.current.x,
      y: e.clientY - startPoint.current.y,
    });
  }

  function handlePointerUp() {
    if (!dragging) return;

    setDragging(false);

    if (drag.x > THRESHOLD) {
      onDecide("like");
    } else if (drag.x < -THRESHOLD) {
      onDecide("pass");
    } else {
      setDrag({ x: 0, y: 0 });
    }
  }

  const x = leaving
    ? leaving === "like" ? 500 : -500
    : drag.x;

  const opacity = (value) =>
    Math.min(Math.max(value, 0), 1);

  return (
    <div
      className="card"
      style={{
        transform: `translate(${x}px, ${drag.y}px) rotate(${x / 20}deg)`,
        transition: dragging ? "none" : "transform 0.3s ease",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <img
        src={profile.photo}
        alt={profile.name}
        draggable={false}
      />

      <div
        className="stamp like"
        style={{
          opacity: leaving ? Number(leaving === "like") : opacity(drag.x / THRESHOLD),
        }}
      >
        LIKE
      </div>

      <div
        className="stamp nope"
        style={{
          opacity: leaving ? Number(leaving === "pass") : opacity(-drag.x / THRESHOLD),
        }}
      >
        NOPE
      </div>

      <div className="card-info">
        <h2>{profile.name}, {profile.age}</h2>
        <p className="place">{"\uD83D\uDCCD"} {profile.place}</p>
        <p>{profile.bio}</p>

        <div className="chips">
          {profile.interests.map((interest) => (
            <span key={interest} className="chip">
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
