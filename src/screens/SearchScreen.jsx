import { useState, useEffect, useRef } from "react";
import { meetings as staticMeetings } from "../data/meetings";

function HighlightedText({ text, query }) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span className="search-highlight">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function SearchScreen({ savedMeetings = [], deletedMeetingIds = new Set(), onCancel, onMeetingView }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const allMeetings = [...savedMeetings, ...staticMeetings.filter((m) => !deletedMeetingIds.has(m.id))];

  const results = query.trim()
    ? allMeetings.filter(
        (m) =>
          m.title.toLowerCase().includes(query.toLowerCase()) ||
          m.case.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="search-screen">
      {/* Search bar */}
      <div className="search-bar-row">
        <div className="search-bar">
          <span className="material-symbols-rounded search-bar-icon">search</span>
          <input
            ref={inputRef}
            className="search-bar-input"
            type="text"
            placeholder="Search for a meeting"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />
          {query.length > 0 && (
            <button className="search-bar-clear" onClick={() => setQuery("")}>
              <span className="material-symbols-rounded" style={{ fontSize: "18px" }}>cancel</span>
            </button>
          )}
        </div>
        <button className="search-cancel-btn" onClick={onCancel}>Cancel</button>
      </div>

      {/* Results */}
      <div className="search-results">
        {results.map((meeting) => (
          <div
            key={meeting.id}
            className="meeting-card"
            style={{ cursor: "pointer" }}
            onClick={() => onMeetingView && onMeetingView(meeting.id)}
          >
            <h2 className="meeting-title">
              <HighlightedText text={meeting.title} query={query} />
            </h2>
            <p className="meeting-case">{meeting.case}</p>
            <div className="meeting-meta">
              <span className="meeting-date">{meeting.date}</span>
              <span className="meta-separator">|</span>
              <span className="meeting-duration">{meeting.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
