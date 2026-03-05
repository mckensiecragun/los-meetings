import { useState, useRef, useEffect } from "react";
import { meetingDetails } from "../data/meetingDetails";

const TABS = ["Summary", "Actions", "Transcript", "Notes"];

// ── Fallback data (for any meeting without specific details) ─────────────────
const FALLBACK = {
  summary: [
    {
      heading: "Topics discussed",
      bullets: [
        "Parties reviewed the current status of the case and upcoming deadlines.",
        "Key outstanding issues were identified and assigned to team members for follow-up.",
      ],
    },
  ],
  transcript: [
    { speaker: 1, time: "0:00", text: "Let's get started. I want to make sure we cover all the key items before we wrap up." },
    { speaker: 2, time: "0:10", text: "Sounds good. I have a few things to add as well when we get to action items." },
  ],
  notes: [],
};

// ── Action cards ─────────────────────────────────────────────────────────────
function NoteCard({ onDismiss }) {
  return (
    <div className="action-card">
      <div className="action-card-header">
        <span className="action-badge action-badge--note">
          <span className="material-symbols-rounded" style={{fontSize: "14px"}}>description</span>
          Note
        </span>
        <button className="action-dismiss" onClick={onDismiss}>
          <span className="material-symbols-rounded" style={{fontSize: "16px"}}>close</span>
        </button>
      </div>
      <p className="action-card-body">
        <span className="action-label">Subject:</span> Settlement Negotiation meeting outcome
      </p>
      <p className="action-card-text">No agreement reached. All discussions were for settlement purposes only.</p>
      <div className="action-card-footer">
        <button className="action-edit-btn">
          <span className="material-symbols-rounded" style={{fontSize: "16px"}}>edit</span>
        </button>
        <button className="action-publish-btn">Publish</button>
      </div>
    </div>
  );
}

function TaskCard({ onDismiss }) {
  return (
    <div className="action-card">
      <div className="action-card-header">
        <span className="action-badge action-badge--task">
          <span className="material-symbols-rounded" style={{fontSize: "14px"}}>task_alt</span>
          Task
        </span>
        <span className="action-assignee">
          <span className="material-symbols-rounded" style={{fontSize: "14px"}}>person</span>
          Megan Smith
        </span>
        <button className="action-dismiss" onClick={onDismiss}>
          <span className="material-symbols-rounded" style={{fontSize: "16px"}}>close</span>
        </button>
      </div>
      <p className="action-card-text action-card-text--large">Follow up with client</p>
      <div className="action-due-row">
        <span className="action-due-label">Due</span>
        <span className="material-symbols-rounded" style={{fontSize: "14px"}}>calendar_today</span>
        <span className="action-due-date">2/10/2026</span>
      </div>
      <div className="action-card-footer">
        <button className="action-edit-btn">
          <span className="material-symbols-rounded" style={{fontSize: "16px"}}>edit</span>
        </button>
        <button className="action-publish-btn">Publish</button>
      </div>
    </div>
  );
}

function TimeEntryCard({ onDismiss }) {
  const [billable, setBillable] = useState(true);
  const [chargeable, setChargeable] = useState(false);
  return (
    <div className="action-card">
      {/* Header: badge + assignee + dismiss */}
      <div className="action-card-header">
        <span className="action-badge action-badge--time">
          <span className="material-symbols-rounded" style={{fontSize: "14px"}}>timer</span>
          Time entry
        </span>
        <span className="action-person-chip">
          <span className="material-symbols-rounded" style={{fontSize: "14px"}}>person</span>
          Megan Smith
        </span>
        <button className="action-dismiss" onClick={onDismiss}>
          <span className="material-symbols-rounded" style={{fontSize: "16px"}}>close</span>
        </button>
      </div>

      {/* Hours / Rate / Time code */}
      <div className="action-meta-row">
        <span><span className="action-meta-label">Hours:</span> 1.3</span>
        <span><span className="action-meta-label">Rate:</span> 100</span>
        <span><span className="action-meta-label">Time code:</span> Time code name</span>
      </div>

      {/* Meeting title */}
      <p className="action-card-text action-card-text--large">Settlement negotiation meeting</p>

      {/* Billable / Chargeable + actions */}
      <div className="action-check-footer">
        <div className="action-check-row">
          <button className="action-check-item" onClick={() => setBillable(b => !b)}>
            <span className="material-symbols-rounded" style={{fontSize: "16px", color: billable ? "#1c1c1e" : "#8e8e93"}}>
              {billable ? "check" : "close"}
            </span>
            Billable
          </button>
          <button className="action-check-item" onClick={() => setChargeable(c => !c)}>
            <span className="material-symbols-rounded" style={{fontSize: "16px", color: chargeable ? "#1c1c1e" : "#8e8e93"}}>
              {chargeable ? "check" : "close"}
            </span>
            Chargeable
          </button>
        </div>
        <div className="action-card-footer">
          <button className="action-edit-btn action-edit-btn--square">
            <span className="material-symbols-rounded" style={{fontSize: "16px"}}>edit</span>
          </button>
          <button className="action-publish-btn">Publish</button>
        </div>
      </div>
    </div>
  );
}

// ── Notes tab ────────────────────────────────────────────────────────────────
function NoteBadge({ type }) {
  const map = {
    typed:    { label: "Typed",        cls: "note-badge--typed" },
    image:    { label: "Image",        cls: "note-badge--image" },
    smartpen: { label: "Filevine pen", cls: "note-badge--smartpen" },
  };
  const { label, cls } = map[type];
  return <span className={`note-badge ${cls}`}>{label}</span>;
}

function SmartpenLines() {
  return (
    <div className="note-pen-page">
      <div className="note-pen-lines">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="note-pen-line" />
        ))}
      </div>
      <div className="note-pen-writing">
        <span className="note-pen-text" style={{ top: "10%", left: "5%" }}>Hey there, my name is Mckensie &</span>
        <span className="note-pen-text" style={{ top: "20%", left: "8%" }}>this is me writing a note.</span>
        <span className="note-pen-text" style={{ top: "38%", right: "8%", fontSize: "11px" }}>I wish this pen</span>
        <span className="note-pen-text" style={{ top: "46%", right: "4%", fontSize: "11px" }}>wrote darker</span>
        <span className="note-pen-text" style={{ top: "58%", left: "5%", fontSize: "12px" }}>This is me making an audio like while writing</span>
        <span className="note-pen-text" style={{ top: "68%", left: "5%", fontSize: "12px" }}>because I can't write &amp; say something different</span>
        <span className="note-pen-text" style={{ top: "77%", left: "5%", fontSize: "12px" }}>at the same time, you know?</span>
      </div>
    </div>
  );
}

function NotesTab({ initialNotes }) {
  const [notes, setNotes] = useState(initialNotes);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const textareaRef = useRef(null);

  function submitNote() {
    if (!draft.trim()) { setTyping(false); return; }
    setNotes(prev => [
      { id: Date.now(), type: "typed", time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }), text: draft.trim() },
      ...prev,
    ]);
    setDraft("");
    setTyping(false);
  }

  function deleteNote(id) {
    setNotes(prev => prev.filter(n => n.id !== id));
  }

  return (
    <div className="notes-tab">
      {/* Action bar */}
      <div className="notes-action-bar">
        <button className="notes-action-btn" onClick={() => { setTyping(true); setTimeout(() => textareaRef.current?.focus(), 50); }}>
          <span className="material-symbols-rounded" style={{ fontSize: "18px" }}>format_paragraph</span>
          Type note
        </button>
        <button className="notes-action-btn">
          <span className="material-symbols-rounded" style={{ fontSize: "18px" }}>photo_camera</span>
          Upload Image
        </button>
      </div>

      {/* Inline type note input */}
      {typing && (
        <div className="note-compose">
          <textarea
            ref={textareaRef}
            className="note-compose-input"
            placeholder="Write your note…"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            rows={4}
          />
          <div className="note-compose-actions">
            <button className="note-compose-cancel" onClick={() => { setTyping(false); setDraft(""); }}>Cancel</button>
            <button className="note-compose-save" onClick={submitNote}>Save</button>
          </div>
        </div>
      )}

      {/* Notes list */}
      <div className="notes-list">
        {notes.map(note => (
          <div key={note.id} className="note-card">
            <div className="note-card-header">
              <NoteBadge type={note.type} />
              <span className="note-time">{note.time}</span>
              <div style={{ flex: 1 }} />
              <button className="note-icon-btn"><span className="material-symbols-rounded" style={{ fontSize: "18px" }}>edit</span></button>
              <button className="note-icon-btn" onClick={() => deleteNote(note.id)}><span className="material-symbols-rounded" style={{ fontSize: "18px" }}>delete</span></button>
            </div>

            {note.type === "typed" && (
              <p className="note-text">{note.text}</p>
            )}
            {note.type === "image" && (
              <div className="note-image-container">
                <img src="/note-image-sample.png" alt="Meeting note" className="note-image" />
              </div>
            )}
            {note.type === "smartpen" && (
              <SmartpenLines />
            )}
          </div>
        ))}

        {notes.length === 0 && (
          <p className="notes-empty">No notes added</p>
        )}
      </div>
    </div>
  );
}

// ── Audio playback player ─────────────────────────────────────────────────────
function parseDurationToSeconds(str) {
  if (!str) return 0;
  const h = str.match(/(\d+)h/);
  const m = str.match(/(\d+)m/);
  return (h ? parseInt(h[1]) * 3600 : 0) + (m ? parseInt(m[1]) * 60 : 0);
}

function fmtTime(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = Math.floor(secs % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

const SPEEDS = [1, 1.5, 2];

function TranscriptPlayer({ meeting }) {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [speedIdx, setSpeedIdx] = useState(0);
  const speed = SPEEDS[speedIdx];
  const total = parseDurationToSeconds(meeting?.duration) || 100;
  const pct = `${((elapsed / total) * 100).toFixed(1)}%`;

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setElapsed((e) => {
        if (e >= total) { setPlaying(false); return total; }
        return e + speed;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [playing, speed, total]);

  function skip(s) {
    setElapsed((e) => Math.max(0, Math.min(total, e + s)));
  }

  return (
    <div className="transcript-player">
      <input
        className="transcript-player-range"
        style={{ "--pct": pct }}
        type="range"
        min={0}
        max={total}
        value={elapsed}
        onChange={(e) => setElapsed(Number(e.target.value))}
      />
      <div className="transcript-player-controls">
        <button className="transcript-player-speed" onClick={() => setSpeedIdx((i) => (i + 1) % SPEEDS.length)}>
          {speed === 1 ? "1x" : `${speed}x`}
        </button>
        <button className="transcript-player-btn" onClick={() => skip(-5)}>
          <span className="material-symbols-rounded" style={{ fontSize: "26px" }}>replay_5</span>
        </button>
        <button className="transcript-player-play" onClick={() => setPlaying((p) => !p)}>
          <span className="material-symbols-rounded" style={{ fontSize: "24px", color: "#fff" }}>
            {playing ? "pause" : "play_arrow"}
          </span>
        </button>
        <button className="transcript-player-btn" onClick={() => skip(5)}>
          <span className="material-symbols-rounded" style={{ fontSize: "26px" }}>forward_5</span>
        </button>
        <span className="transcript-player-time">{fmtTime(elapsed)}</span>
      </div>
    </div>
  );
}

// ── Main screen ──────────────────────────────────────────────────────────────
export default function PastMeetingScreen({ meeting, onBack, onDelete, onEdit }) {
  const [activeTab, setActiveTab] = useState("Summary");
  const [actions, setActions] = useState(["note", "task", "time"]);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    function handleOutsideClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [menuOpen]);

  const details = meetingDetails[meeting?.id] || FALLBACK;

  function dismissAction(type) {
    setActions(prev => prev.filter(a => a !== type));
  }

  return (
    <div className="recording-screen">
      {/* Header */}
      <div className="recording-header">
        <button className="recording-back" onClick={onBack}>
          <span className="material-symbols-rounded" style={{fontSize: "24px"}}>chevron_left</span>
        </button>
        <h1 className="recording-title">{meeting?.title}</h1>
        <div className="recording-menu-wrapper" ref={menuRef}>
          <button className="recording-menu" onClick={() => setMenuOpen((o) => !o)}>
            <span className="material-symbols-rounded" style={{fontSize: "22px"}}>more_horiz</span>
          </button>
          {menuOpen && (
            <div className="meeting-dropdown">
              <button
                className="meeting-dropdown-item"
                onClick={() => { setMenuOpen(false); onEdit?.(meeting); }}
              >
                <span className="material-symbols-rounded" style={{fontSize: "18px"}}>edit</span>
                Edit details
              </button>
              <div className="meeting-dropdown-divider" />
              <button className="meeting-dropdown-item meeting-dropdown-item--disabled">
                <span className="material-symbols-rounded" style={{fontSize: "18px"}}>record_voice_over</span>
                Assign speakers
              </button>
              <div className="meeting-dropdown-divider" />
              <button
                className="meeting-dropdown-item meeting-dropdown-item--destructive"
                onClick={() => { setMenuOpen(false); onDelete?.(meeting?.id); }}
              >
                <span className="material-symbols-rounded" style={{fontSize: "18px"}}>delete</span>
                Delete meeting
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Meta */}
      <div className="recording-meta">
        <div className="recording-project">{meeting?.case}</div>
        <div className="recording-status">
          <span className="recording-label past-meeting-date">{meeting?.date} | {meeting?.duration}</span>
        </div>
      </div>

      {/* Tab bar */}
      <div className="recording-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`recording-tab${activeTab === tab ? " recording-tab--active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="recording-tab-line" />

      {/* Tab content */}
      <div className="recording-content recording-content--past">
        {activeTab === "Actions" && (
          <div className="actions-list">
            <button className="action-new-btn">
              <span className="material-symbols-rounded" style={{fontSize: "16px"}}>add</span>
              New
            </button>
            {actions.includes("note") && <NoteCard onDismiss={() => dismissAction("note")} />}
            {actions.includes("task") && <TaskCard onDismiss={() => dismissAction("task")} />}
            {actions.includes("time") && <TimeEntryCard onDismiss={() => dismissAction("time")} />}
          </div>
        )}

        {activeTab === "Summary" && (
          <div className="summary-content">
            {details.summary.map((section, i) => (
              <div key={i} className="summary-section">
                <h3 className="summary-heading">{section.heading}</h3>
                <ul className="summary-bullets">
                  {section.bullets.map((bullet, j) => (
                    <li key={j} className="summary-bullet">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Transcript" && (
          <div className="transcript-list">
            {details.transcript.map((entry, i) => (
              <div key={i} className="transcript-entry">
                <div className="transcript-speaker-bubble">{entry.speaker}</div>
                <div className="transcript-body">
                  <div className="transcript-meta">
                    <span className="transcript-speaker-name">Speaker {entry.speaker}</span>
                    <span className="transcript-time">{entry.time}</span>
                  </div>
                  <p className="transcript-text">{entry.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Notes" && <NotesTab key={meeting?.id} initialNotes={details.notes} />}
      </div>

      {activeTab === "Transcript" && <TranscriptPlayer meeting={meeting} />}
    </div>
  );
}
