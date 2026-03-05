import { useState, useEffect, useRef } from "react";
import HomeScreen from "./screens/HomeScreen";
import BottomNav from "./components/BottomNav";
import NewMeetingSheet from "./screens/NewMeetingSheet";
import ProjectPickerSheet from "./screens/ProjectPickerSheet";
import RecordingScreen from "./screens/RecordingScreen";
import PastMeetingScreen from "./screens/PastMeetingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SmartpenScreen from "./screens/SmartpenScreen";
import SearchScreen from "./screens/SearchScreen";
import NotebookScreen from "./screens/NotebookScreen";
import { meetings as staticMeetings } from "./data/meetings";
import "./App.css";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [activeMeeting, setActiveMeeting] = useState(null);
  const [showNewMeeting, setShowNewMeeting] = useState(false);
  const [showProjectPicker, setShowProjectPicker] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [savedMeetings, setSavedMeetings] = useState([]);
  const [viewingMeeting, setViewingMeeting] = useState(null);
  const [deletedMeetingIds, setDeletedMeetingIds] = useState(new Set());
  const [editingMeeting, setEditingMeeting] = useState(null);

  // Timer runs whenever there's an active meeting, not paused, and not processing
  useEffect(() => {
    if (!activeMeeting || paused || isProcessing) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [activeMeeting, paused, isProcessing]);

  // Tracks the pending 30-second processing timeout so it can be cancelled
  const processingTimerRef = useRef(null);

  // Hidden input focused synchronously on + tap so iOS opens the keyboard
  // before the sheet's real input mounts (autoFocus then inherits the open keyboard)
  const keyboardPrimerRef = useRef(null);

  function handlePlusClick() {
    keyboardPrimerRef.current?.focus();
    setShowNewMeeting(true);
  }

  function handleNewMeetingClose() {
    setShowNewMeeting(false);
    setShowProjectPicker(false);
    setSelectedProject(null);
  }

  function handleProjectSelect(project) {
    setSelectedProject(project);
    setShowProjectPicker(false);
  }

  function handleRecord(meetingName) {
    // Cancel any lingering post-processing timer from a previous recording
    if (processingTimerRef.current) {
      clearTimeout(processingTimerRef.current);
      processingTimerRef.current = null;
    }
    setActiveMeeting({ name: meetingName || "New Meeting", project: selectedProject });
    setSeconds(0);
    setPaused(false);
    setIsProcessing(false);
    setShowNewMeeting(false);
    setShowProjectPicker(false);
    setSelectedProject(null);
    setCurrentScreen("recording");
  }

  // Go back to home but keep recording alive
  function handleGoBack() {
    setCurrentScreen("home");
  }

  // End the recording — show processing state, then save and clear after delay
  function handleEndRecording() {
    const meetingSnapshot = activeMeeting;
    const secondsSnapshot = seconds;
    setIsProcessing(true);
    setPaused(false);
    setCurrentScreen("home");
    processingTimerRef.current = setTimeout(() => {
      processingTimerRef.current = null;
      const dur = secondsSnapshot;
      const h = Math.floor(dur / 3600);
      const m = Math.floor((dur % 3600) / 60);
      const durationStr = h > 0 ? `${h}h ${m}m` : `${m}m`;
      const dateStr = new Date().toLocaleDateString("en-US");
      setSavedMeetings((prev) => [
        {
          id: Date.now(),
          title: meetingSnapshot?.name || "New Meeting",
          case: meetingSnapshot?.project?.name || "Unassigned",
          date: dateStr,
          duration: durationStr,
          suggestedActions: 3,
          hasActivity: true,
          isNew: true,
        },
        ...prev,
      ]);
      setActiveMeeting(null);
      setIsProcessing(false);
      setSeconds(0);
    }, 30000);
  }

  function handleMeetingView(id) {
    const meeting = savedMeetings.find((m) => m.id === id) || staticMeetings.find((m) => m.id === id);
    setSavedMeetings((prev) =>
      prev.map((m) => (m.id === id ? { ...m, hasActivity: false, isNew: false } : m))
    );
    setViewingMeeting(meeting);
    setCurrentScreen("pastMeeting");
  }

  function handleDeleteMeeting(id) {
    const isStatic = staticMeetings.some((m) => m.id === id);
    if (isStatic) {
      setDeletedMeetingIds((prev) => new Set([...prev, id]));
    } else {
      setSavedMeetings((prev) => prev.filter((m) => m.id !== id));
    }
    setViewingMeeting(null);
    setCurrentScreen("home");
  }

  function handleOpenEditMeeting(meeting) {
    setSelectedProject(meeting.project ?? null);
    setEditingMeeting(meeting);
  }

  function handleEditMeetingClose() {
    setEditingMeeting(null);
    setSelectedProject(null);
  }

  function handleSaveMeeting(newName) {
    const updatedName = newName.trim() || editingMeeting.title;
    const updatedProject = selectedProject;
    setSavedMeetings((prev) =>
      prev.map((m) =>
        m.id === editingMeeting.id
          ? { ...m, title: updatedName, case: updatedProject?.name ?? m.case }
          : m
      )
    );
    setViewingMeeting((prev) => ({
      ...prev,
      title: updatedName,
      case: updatedProject?.name ?? prev.case,
      project: updatedProject,
    }));
    handleEditMeetingClose();
  }

  return (
    <div className="phone-frame">
      <div className="phone-screen">
        {currentScreen === "notebook" ? (
          <NotebookScreen onBack={() => setCurrentScreen("home")} />
        ) : currentScreen === "search" ? (
          <SearchScreen
            savedMeetings={savedMeetings}
            deletedMeetingIds={deletedMeetingIds}
            onCancel={() => setCurrentScreen("home")}
            onMeetingView={(id) => { handleMeetingView(id); }}
          />
        ) : currentScreen === "smartpen" ? (
          <SmartpenScreen onBack={() => setCurrentScreen("profile")} />
        ) : currentScreen === "pastMeeting" ? (
          <PastMeetingScreen
            meeting={viewingMeeting}
            onBack={() => { setCurrentScreen("home"); setViewingMeeting(null); }}
            onDelete={handleDeleteMeeting}
            onEdit={handleOpenEditMeeting}
          />
        ) : currentScreen === "recording" ? (
          <RecordingScreen
            meeting={activeMeeting}
            seconds={seconds}
            paused={paused}
            isProcessing={isProcessing}
            onPauseToggle={() => setPaused((p) => !p)}
            onBack={handleGoBack}
            onEnd={handleEndRecording}
          />
        ) : (
          <>
            {currentScreen === "profile" ? (
              <ProfileScreen onSmartpenClick={() => setCurrentScreen("smartpen")} />
            ) : (
              <HomeScreen
                activeMeeting={activeMeeting}
                seconds={seconds}
                paused={paused}
                isProcessing={isProcessing}
                savedMeetings={savedMeetings}
                deletedMeetingIds={deletedMeetingIds}
                onActiveMeetingClick={() => setCurrentScreen("recording")}
                onMeetingView={handleMeetingView}
                onSearchClick={() => setCurrentScreen("search")}
                onNotebookClick={() => setCurrentScreen("notebook")}
              />
            )}
            <BottomNav
              onPlusClick={handlePlusClick}
              activePage={currentScreen}
              activeMeeting={activeMeeting}
              seconds={seconds}
              paused={paused}
              isProcessing={isProcessing}
              onActiveMeetingClick={() => setCurrentScreen("recording")}
              onHomeClick={() => setCurrentScreen("home")}
              onProfileClick={() => setCurrentScreen("profile")}
            />

            {/* Keyboard primer: focused synchronously on + tap so iOS shows keyboard */}
            <input
              ref={keyboardPrimerRef}
              aria-hidden="true"
              tabIndex={-1}
              style={{
                position: "fixed", top: 0, left: 0,
                width: 0, height: 0, opacity: 0,
                fontSize: "16px", border: "none", outline: "none",
                pointerEvents: "none",
              }}
            />

          </>
        )}

        <NewMeetingSheet
          visible={showNewMeeting || editingMeeting !== null}
          mode={editingMeeting ? "edit" : "new"}
          initialName={editingMeeting?.title ?? ""}
          onClose={editingMeeting ? handleEditMeetingClose : handleNewMeetingClose}
          onRecord={handleRecord}
          onSave={handleSaveMeeting}
          selectedProject={selectedProject}
          onProjectFieldClick={() => setShowProjectPicker(true)}
          onClearProject={() => setSelectedProject(null)}
        />

        <ProjectPickerSheet
          visible={showProjectPicker}
          onClose={() => setShowProjectPicker(false)}
          onSelect={handleProjectSelect}
        />
      </div>
    </div>
  );
}
