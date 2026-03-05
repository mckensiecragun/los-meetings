import MeetingCard from "../components/MeetingCard";
import { meetings } from "../data/meetings";

function formatTime(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");
  const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export default function HomeScreen({ activeMeeting, seconds, paused, isProcessing, savedMeetings = [], deletedMeetingIds = new Set(), onActiveMeetingClick, onMeetingView, onSearchClick, onNotebookClick }) {
  return (
    <div className="screen-content">
      <header className="home-header">
        <h1 className="app-title">LO\S for Meetings</h1>
        <div className="header-actions">
          <button className="icon-btn" onClick={onSearchClick}>
            <span className="material-symbols-rounded" style={{fontSize: "22px"}}>search</span>
          </button>
          <button className="icon-btn" onClick={onNotebookClick}>
            <span className="material-symbols-rounded" style={{fontSize: "22px"}}>stylus_note</span>
          </button>
        </div>
      </header>

      <div className="meeting-list">
        {activeMeeting && (
          <button className="active-recording-card" onClick={onActiveMeetingClick}>
            <div className="active-recording-title">{activeMeeting.name || "New Meeting"}</div>
            <div className="active-recording-project">
              {activeMeeting.project ? activeMeeting.project.name : "Unassigned"}
            </div>
            <div className="active-recording-status">
              {isProcessing ? (
                <span className="processing-dot" />
              ) : paused ? (
                <span className="material-symbols-rounded" style={{fontSize: "14px", color: "#8e8e93"}}>pause</span>
              ) : (
                <span className="recording-dot" />
              )}
              <span className="active-recording-label">
                {isProcessing ? "Processing..." : paused ? "Paused" : "Recording"}
              </span>
              {!isProcessing && (
                <>
                  <span className="active-recording-sep">|</span>
                  <span className="active-recording-timer">{formatTime(seconds)}</span>
                </>
              )}
            </div>
          </button>
        )}

        {savedMeetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} onClick={() => onMeetingView(meeting.id)} />
        ))}

        {meetings.filter((m) => !deletedMeetingIds.has(m.id)).map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} onClick={() => onMeetingView(meeting.id)} />
        ))}
      </div>
    </div>
  );
}
