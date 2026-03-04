import { useState, useEffect, useRef } from "react";

const TABS = ["Summary", "Actions", "Transcript", "Notes"];

// Live transcript entries — times are recording-seconds when each entry begins
const LIVE_TRANSCRIPT = [
  { speaker: 1, time: "0:02", text: "Thanks for joining today. We're hoping to have a productive discussion and see whether there's a path toward resolution without further litigation." },
  { speaker: 2, time: "0:11", text: "Absolutely. We appreciate the opportunity to talk this through and understand your position more fully." },
  { speaker: 1, time: "0:20", text: "From our perspective, liability is well supported by the existing evidence, particularly the recent documentation produced in discovery. Based on that, we believe settlement at this stage makes sense for both sides." },
  { speaker: 2, time: "0:33", text: "We understand your view, though we continue to dispute liability. That said, we're open to discussing a resolution that avoids the cost and uncertainty of trial." },
  { speaker: 1, time: "0:45", text: "We're glad to hear that. Our client has authorized us to present an opening settlement figure, which we believe reflects the strength of our case and the damages sustained." },
  { speaker: 2, time: "0:56", text: "We'll consider any reasonable number. What figure does your client have in mind?" },
  { speaker: 1, time: "1:03", text: "Our client is prepared to settle for $875,000, which accounts for the documented damages and the significant risk your client faces at trial." },
  { speaker: 2, time: "1:13", text: "That's higher than we anticipated. We'll need to confer with our client before we can respond substantively." },
  { speaker: 1, time: "1:22", text: "We understand. We'd ask that you come back with a meaningful counter rather than a simple rejection. We believe there's a real path to resolution here." },
  { speaker: 2, time: "1:32", text: "Agreed. We'll review the materials and respond by end of week. Thank you for today." },
];

const CHARS_PER_SECOND = 20; // characters revealed per recording-second
const SPEAKER_DELAY    = 30; // seconds before speaker assignments appear

function parseEntrySeconds(timeStr) {
  const [m, s] = timeStr.split(":").map(Number);
  return m * 60 + s;
}

// ── Live transcript component ────────────────────────────────────────────────
function LiveTranscript({ seconds, paused }) {
  const speakersReady = seconds >= SPEAKER_DELAY;

  // Track the recording-second when each entry first became visible
  const entryAppearedAt = useRef({});
  LIVE_TRANSCRIPT.forEach((entry, i) => {
    if (seconds >= parseEntrySeconds(entry.time) && entryAppearedAt.current[i] === undefined) {
      entryAppearedAt.current[i] = seconds;
    }
  });

  const visibleEntries = LIVE_TRANSCRIPT.filter((_, i) => entryAppearedAt.current[i] !== undefined);
  const lastVisibleIdx  = visibleEntries.length > 0
    ? LIVE_TRANSCRIPT.indexOf(visibleEntries[visibleEntries.length - 1])
    : -1;

  return (
    <div className={`live-transcript${speakersReady ? "" : " live-transcript--anon"}`}>
      {LIVE_TRANSCRIPT.map((entry, i) => {
        if (entryAppearedAt.current[i] === undefined) return null;

        const appearedAt  = entryAppearedAt.current[i];
        const isLast      = i === lastVisibleIdx;
        const nextStart   = LIVE_TRANSCRIPT[i + 1] ? parseEntrySeconds(LIVE_TRANSCRIPT[i + 1].time) : Infinity;
        const fullyDone   = !isLast || seconds >= nextStart;

        let displayText;
        let isCurrent = false;

        if (fullyDone) {
          displayText = entry.text;
        } else {
          const elapsed    = seconds - appearedAt;
          const charsToShow = Math.min(elapsed * CHARS_PER_SECOND, entry.text.length);
          displayText = entry.text.slice(0, charsToShow);
          isCurrent   = charsToShow < entry.text.length;
        }

        return (
          <div key={i} className="transcript-entry">
            {/* Bubble — hidden via CSS in anon mode, fades in at 30 s */}
            <div className="transcript-speaker-bubble">{entry.speaker}</div>

            <div className="transcript-body">
              {/* Speaker meta — hidden via CSS in anon mode */}
              <div className="transcript-meta">
                <span className="transcript-speaker-name">Speaker {entry.speaker}</span>
                <span className="transcript-time">{entry.time}</span>
              </div>

              <p className="transcript-text">
                {displayText}
                {isCurrent && !paused && <span className="live-cursor" />}
              </p>
            </div>
          </div>
        );
      })}

      {/* Transcribing indicator */}
      <div className="transcribing-row">
        <span className="transcribing-spinner" />
        <span className="transcribing-text">Transcribing...</span>
      </div>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatTime(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");
  const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}

// ── Main screen ──────────────────────────────────────────────────────────────
export default function RecordingScreen({ meeting, seconds, paused, isProcessing, onPauseToggle, onBack, onEnd }) {
  const [activeTab, setActiveTab] = useState("Transcript");

  useEffect(() => {
    if (isProcessing) setActiveTab("Summary");
  }, [isProcessing]);

  return (
    <div className="recording-screen">
      <div className="recording-header">
        <button className="recording-back" onClick={onBack}>
          <span className="material-symbols-rounded" style={{fontSize: "24px"}}>chevron_left</span>
        </button>
        <h1 className="recording-title">{meeting?.name || "New Meeting"}</h1>
        <button className="recording-menu">
          <span className="material-symbols-rounded" style={{fontSize: "22px"}}>more_horiz</span>
        </button>
      </div>

      <div className="recording-meta">
        {meeting?.project && (
          <div className="recording-project">{meeting.project.name}</div>
        )}
        <div className="recording-status">
          {isProcessing ? (
            <span className="processing-dot" />
          ) : paused ? (
            <span className="material-symbols-rounded" style={{fontSize: "14px", color: "#8e8e93"}}>pause</span>
          ) : (
            <span className="recording-dot" />
          )}
          <span className="recording-label">
            {isProcessing ? "Processing..." : paused ? "Paused" : "Recording"}
          </span>
          {!isProcessing && (
            <>
              <span className="recording-sep">|</span>
              <span className="recording-timer">{formatTime(seconds)}</span>
            </>
          )}
        </div>
      </div>

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

      <div className="recording-content">
        {activeTab === "Transcript" && !isProcessing && (
          <LiveTranscript seconds={seconds} paused={paused} />
        )}
        {activeTab === "Transcript" && isProcessing && (
          <div className="transcribing-row transcribing-row--center">
            <span className="transcribing-spinner" />
            <span className="transcribing-text">Transcript is still processing</span>
          </div>
        )}
        {activeTab === "Summary" && (
          isProcessing ? (
            <div className="transcribing-row transcribing-row--center">
              <span className="transcribing-spinner" />
              <span className="transcribing-text">Meeting summary is still processing</span>
            </div>
          ) : (
            <p className="recording-placeholder">Summary will appear after the meeting ends</p>
          )
        )}
        {activeTab === "Actions" && (
          isProcessing ? (
            <div className="transcribing-row transcribing-row--center">
              <span className="transcribing-spinner" />
              <span className="transcribing-text">Suggested actions are still processing</span>
            </div>
          ) : (
            <p className="recording-placeholder">Action items will appear here</p>
          )
        )}
        {activeTab === "Notes" && (
          <p className="recording-placeholder">Add notes during the meeting</p>
        )}
      </div>

      {!isProcessing && (
        <div className="recording-bottom">
          <button className="btn-pause" onClick={onPauseToggle} disabled={isProcessing}>
            {paused ? (
              <>
                <span className="material-symbols-rounded" style={{fontSize: "18px"}}>mic</span>
                Resume
              </>
            ) : (
              <>
                <span className="material-symbols-rounded" style={{fontSize: "18px"}}>pause</span>
                Pause
              </>
            )}
          </button>
          <button className="btn-end" onClick={onEnd}>End</button>
        </div>
      )}
    </div>
  );
}
