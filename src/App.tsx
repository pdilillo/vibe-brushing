import { useState, useEffect } from 'react';
import { Home } from './components/Home';
import { CameraCheck } from './components/CameraCheck';
import { HatSelector } from './components/HatSelector';
import { BrushingSession } from './components/BrushingSession';
import { ResultsScreen } from './components/ResultsScreen';
import { CaptureGame } from './components/CaptureGame';
import { PhotoReview } from './components/PhotoReview';
import { PhotoEditor } from './components/PhotoEditor';
import { Collection } from './components/Collection';
import { Settings } from './components/Settings';
import { ProfileSelect } from './components/ProfileSelect';
import { HatDebug } from './components/HatDebug';
import { GraphicsDebug } from './components/GraphicsDebug';
import { getUserProgress, getCurrentProfileId, getProfile } from './services/database';
import type { GamePhase, UserProgress, ZoneProgress, Creature, Hat, Region, UserProfile } from './types';

function App() {
  const [phase, setPhase] = useState<GamePhase>('profile-select');
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [selectedHat, setSelectedHat] = useState<Hat | null>(null);
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
    setPhase('hat-select');
  }

  function handleHatSelected(hat: Hat | null) {
    setSelectedHat(hat);
    setPhase('brushing');
  }

  function handleBrushingComplete(results: {
    cleaningPercentage: number;
    zoneProgress: ZoneProgress[];
    photos: string[];
    region: Region;
    creature: Creature | null;
  }) {
    setSessionResults(results);
    setPhase('results');
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

  function handleHatDebug() {
    setPhase('hat-debug');
  }

  function handleGraphicsDebug() {
    setPhase('graphics-debug');
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
        <Settings onBack={handleGoHome} onHatDebug={handleHatDebug} onGraphicsDebug={handleGraphicsDebug} />
      )}
      
      {phase === 'camera-check' && (
        <CameraCheck
          onConfirm={handleCameraConfirmed}
          onCancel={handleGoHome}
        />
      )}
      
      {phase === 'hat-select' && (
        <HatSelector
          userProgress={userProgress}
          onSelect={handleHatSelected}
          onBack={handleGoHome}
        />
      )}
      
      {phase === 'brushing' && (
        <BrushingSession
          selectedHat={selectedHat}
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
      
      {phase === 'hat-debug' && (
        <HatDebug onBack={handleGoHome} />
      )}
      
      {phase === 'graphics-debug' && (
        <GraphicsDebug onBack={handleGoHome} />
      )}
    </div>
  );
}

export default App;
