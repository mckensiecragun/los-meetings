import { useState } from "react";

const PAGE_COUNT = 24;

// Static meeting associations per page (for prototype)
const PAGE_MEETINGS = {
  1: [
    { id: 1, title: "Settlement Negotiation", case: "Sara Salazar", date: "1/14/2026", duration: "1h 47m" },
    { id: 2, title: "Mediation Prep", case: "Macy Johnson vs Thompson Corp", date: "1/10/2026", duration: "53m" },
  ],
  2: [
    { id: 3, title: "Witness Interview", case: "Williams v State Bank", date: "1/14/2026", duration: "1h 47m" },
  ],
  3: [
    { id: 4, title: "Pre-Trial Conference", case: "John Davis v Healthcare Systems", date: "1/14/2026", duration: "1h 47m" },
    { id: 5, title: "Discovery Review Meeting", case: "Williams v State Bank", date: "1/14/2026", duration: "1h 47m" },
  ],
  5: [
    { id: 6, title: "Deposition Prep", case: "John Davis v Healthcare Systems", date: "12/29/2025", duration: "1h 47m" },
  ],
  7: [
    { id: 7, title: "Settlement Negotiation", case: "Macy Johnson vs Thompson Corp", date: "1/14/2026", duration: "1h 47m" },
    { id: 8, title: "Conversation with Megan Brinkerhoff", case: "Macy Johnson vs Thompson Corp", date: "1/14/2026", duration: "1h 47m" },
  ],
};

export default function NotebookScreen({ onBack }) {
  const [query, setQuery] = useState("");
  const [selectedPage, setSelectedPage] = useState(null);

  if (selectedPage !== null) {
    const meetings = PAGE_MEETINGS[selectedPage] || [];
    return (
      <div className="notebook-detail-screen">
        {/* Header with close button */}
        <div className="notebook-detail-header">
          <button className="notebook-detail-close" onClick={() => setSelectedPage(null)}>
            <span className="material-symbols-rounded" style={{ fontSize: "22px" }}>close</span>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="notebook-detail-scroll">
          {/* Large page preview */}
          <div className="notebook-detail-page">
            <div className="notebook-detail-lines">
              {Array.from({ length: 22 }).map((_, i) => (
                <div key={i} className="notebook-detail-line" />
              ))}
            </div>
            <span className="notebook-detail-page-number">{selectedPage}</span>
          </div>

          {/* Meetings section */}
          <div className="notebook-detail-meetings">
            <h3 className="notebook-detail-meetings-title">
              Meetings ({meetings.length})
            </h3>
            {meetings.length === 0 ? (
              <p className="notebook-detail-no-meetings">No meetings linked to this page.</p>
            ) : (
              meetings.map((m, i) => (
                <div key={m.id}>
                  {i > 0 && <div className="notebook-detail-divider" />}
                  <div className="notebook-detail-meeting-item">
                    <span className="notebook-detail-meeting-title">{m.title}</span>
                    <span className="notebook-detail-meeting-case">{m.case}</span>
                    <span className="notebook-detail-meeting-meta">{m.date} · {m.duration}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="notebook-screen">

      {/* Nav */}
      <div className="notebook-nav">
        <button className="notebook-back" onClick={onBack}>
          <span className="material-symbols-rounded" style={{ fontSize: "28px" }}>chevron_left</span>
        </button>
        <h1 className="notebook-title">Filevine Smartpen</h1>
        <button className="notebook-settings">
          <span className="material-symbols-rounded" style={{ fontSize: "22px" }}>settings</span>
        </button>
      </div>

      {/* Search */}
      <div className="notebook-search-row">
        <div className="notebook-search-bar">
          <span className="material-symbols-rounded" style={{ fontSize: "20px", color: "#aaa" }}>search</span>
          <input
            className="notebook-search-input"
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      <div className="notebook-content">
        <h2 className="notebook-volume-title">Letter Ruled Vol 0</h2>
        <div className="notebook-grid">
          {Array.from({ length: PAGE_COUNT }, (_, i) => i + 1).map((page) => (
            <div key={page} className="notebook-page" onClick={() => setSelectedPage(page)}>
              <div className="notebook-page-lines">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="notebook-line" />
                ))}
              </div>
              <span className="notebook-page-number">{page}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
