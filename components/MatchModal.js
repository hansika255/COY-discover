"use client";

export default function MatchModal({
  profile,
  onClose,
  onViewMatches,
}) {
  if (!profile) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="match-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="match-sparkle">✦</div>

        <h1>It's a Match!</h1>
        <p>You and {profile.name} liked each other.</p>

        <img
          className="match-photo"
          src={profile.photo}
          alt={profile.name}
        />

        <h2>{profile.name}, {profile.age}</h2>
        <p className="match-place">{profile.place}</p>

        <button
          className="view-matches-btn"
          onClick={onViewMatches}
        >
          View my matches
        </button>

        <button className="keep-discovering" onClick={onClose}>
          Keep discovering
        </button>
      </div>
    </div>
  );
}
