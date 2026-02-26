import { useState, useEffect } from 'react';
import { Home } from './components/Home';
import { CameraCheck } from './components/CameraCheck';
import { BuddySelector } from './components/BuddySelector';
import { BrushingSession } from './components/BrushingSession';
import { ResultsScreen } from './components/ResultsScreen';
import { CaptureGame } from './components/CaptureGame';
import { PhotoReview } from './components/PhotoReview';
import { PhotoEditor } from './components/PhotoEditor';
import { Collection } from './components/Collection';
import { Settings } from './components/Settings';
import { ProfileSelect } from './components/ProfileSelect';
import { BuddyDebug } from './components/BuddyDebug';
import { GraphicsDebug } from './components/GraphicsDebug';
import { PhotoDebug } from './components/PhotoDebug';
import { getUserProgress, getCurrentProfileId, getProfile, addSession } from './services/database';
import { getSessionDurationSeconds } from './services/settings';
import type { GamePhase, UserProgress, ZoneProgress, Creature, Buddy, Region, UserProfile, BrushingSession as BrushingSessionType } from './types';

function App() {
  const [phase, setPhase] = useState<GamePhase>('profile-select');
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [selectedBuddy, setSelectedBuddy] = useState<Buddy | null>(null);
  const [sessionResults, setSessionResults] = useState<{
    cleaningPercentage: number;
    zoneProgress: ZoneProgress[];
    photos: string[];
    region: Region;
    creature: Creature | null;
  } | null>(null);
  const [capturedCreature, setCapturedCreature] = useState<Creature | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    checkExistingProfile();
  }, []);

  async function checkExistingProfile() {
    const profileId = getCurrentProfileId();
    if (profileId) {
      const profile = await getProfile(profileId);
      if (profile) {
        setCurrentProfile(profile);
        await loadUserProgress();
        setPhase('home');
        return;
      }
    }
    setPhase('profile-select');
  }

  async function handleProfileSelected(profile: UserProfile) {
    setCurrentProfile(profile);
    await loadUserProgress();
    setPhase('home');
  }

  function handleSwitchProfile() {
    setPhase('profile-select');
    setUserProgress(null);
    setCurrentProfile(null);
  }

  async function loadUserProgress() {
    try {
      const progress = await getUserProgress();
      setUserProgress(progress);
    } catch (err) {
      console.error('Failed to load user progress:', err);
      setPhase('profile-select');
    }
  }

  function handleStartBrushing() {
    setPhase('camera-check');
  }

  function handleCameraConfirmed() {
    setPhase('buddy-select');
  }

  function handleBuddySelected(buddy: Buddy | null) {
    setSelectedBuddy(buddy);
    setPhase('brushing');
  }

  async function handleBrushingComplete(results: {
    cleaningPercentage: number;
    zoneProgress: ZoneProgress[];
    photos: string[];
    region: Region;
    creature: Creature | null;
  }) {
    setSessionResults(results);
    setPhase('results');
    
    const session: BrushingSessionType = {
      id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      date: new Date(),
      duration: getSessionDurationSeconds(),
      cleaningPercentage: results.cleaningPercentage,
      zoneProgress: results.zoneProgress,
      photos: results.photos
    };
    
    try {
      await addSession(session);
      await loadUserProgress();
    } catch (err) {
      console.error('Failed to save session:', err);
    }
  }

  function handleResultsContinue() {
    setPhase('capture');
  }

  function handleCaptureDone(creature: Creature | null) {
    setCapturedCreature(creature);
    setPhase('photos');
  }

  function handlePhotoSelected(photo: string) {
    setSelectedPhoto(photo);
    setPhase('editor');
  }

  function handleEditorDone() {
    setSelectedPhoto(null);
    setPhase('home');
    loadUserProgress();
  }

  function handleGoHome() {
    setPhase('home');
    setSessionResults(null);
    setCapturedCreature(null);
    setSelectedPhoto(null);
    loadUserProgress();
  }

  function handleViewCollection() {
    setPhase('collection');
  }

  function handleViewSettings() {
    setPhase('settings');
  }

  function handleBuddyDebug() {
    setPhase('buddy-debug');
  }

  function handleGraphicsDebug() {
    setPhase('graphics-debug');
  }

  function handlePhotoDebug() {
    setPhase('photo-debug');
  }

  if (phase === 'profile-select') {
    return (
      <div className="h-full w-full overflow-hidden">
        <ProfileSelect onProfileSelected={handleProfileSelected} />
      </div>
    );
  }

  if (!userProgress || !currentProfile) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-2xl animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-hidden">
      {phase === 'home' && (
        <Home
          userProgress={userProgress}
          currentProfile={currentProfile}
          onStartBrushing={handleStartBrushing}
          onViewCollection={handleViewCollection}
          onViewSettings={handleViewSettings}
          onSwitchProfile={handleSwitchProfile}
        />
      )}
      
      {phase === 'settings' && (
        <Settings onBack={handleGoHome} onBuddyDebug={handleBuddyDebug} onGraphicsDebug={handleGraphicsDebug} onPhotoDebug={handlePhotoDebug} />
      )}
      
      {phase === 'camera-check' && (
        <CameraCheck
          onConfirm={handleCameraConfirmed}
          onCancel={handleGoHome}
        />
      )}
      
      {phase === 'buddy-select' && (
        <BuddySelector
          userProgress={userProgress}
          onSelect={handleBuddySelected}
          onBack={handleGoHome}
        />
      )}
      
      {phase === 'brushing' && (
        <BrushingSession
          selectedBuddy={selectedBuddy}
          capturedCreatureIds={userProgress.capturedCreatures.map(c => c.id)}
          onComplete={handleBrushingComplete}
          onCancel={handleGoHome}
        />
      )}
      
      {phase === 'results' && sessionResults && (
        <ResultsScreen
          cleaningPercentage={sessionResults.cleaningPercentage}
          zoneProgress={sessionResults.zoneProgress}
          onContinue={handleResultsContinue}
        />
      )}
      
      {phase === 'capture' && sessionResults && (
        <CaptureGame
          cleaningPercentage={sessionResults.cleaningPercentage}
          userProgress={userProgress}
          region={sessionResults.region}
          preSelectedCreature={sessionResults.creature}
          onComplete={handleCaptureDone}
        />
      )}
      
      {phase === 'photos' && sessionResults && (
        <PhotoReview
          photos={sessionResults.photos}
          capturedCreature={capturedCreature}
          onSelectPhoto={handlePhotoSelected}
          onSkip={handleGoHome}
        />
      )}
      
      {phase === 'editor' && selectedPhoto && (
        <PhotoEditor
          photo={selectedPhoto}
          capturedCreatures={
            capturedCreature && !userProgress.capturedCreatures.some(c => c.id === capturedCreature.id)
              ? [{ ...capturedCreature, capturedAt: new Date() }, ...userProgress.capturedCreatures]
              : userProgress.capturedCreatures
          }
          onDone={handleEditorDone}
          onBack={() => setPhase('photos')}
        />
      )}
      
      {phase === 'collection' && (
        <Collection
          userProgress={userProgress}
          onBack={handleGoHome}
        />
      )}
      
      {phase === 'buddy-debug' && (
        <BuddyDebug onBack={handleGoHome} />
      )}
      
      {phase === 'graphics-debug' && (
        <GraphicsDebug onBack={handleGoHome} />
      )}
      
      {phase === 'photo-debug' && (
        <PhotoDebug onBack={handleGoHome} />
      )}
    </div>
  );
}

export default App;
