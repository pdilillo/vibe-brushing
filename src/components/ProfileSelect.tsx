import { useState, useEffect } from 'react';
import type { UserProfile, UserProgress } from '../types';
import { 
  getAllProfiles, 
  createProfile, 
  deleteProfile, 
  setCurrentProfileId,
  getUserProgress,
  migrateDefaultUser
} from '../services/database';

interface ProfileSelectProps {
  onProfileSelected: (profile: UserProfile) => void;
}

interface ProfileWithProgress extends UserProfile {
  progress?: UserProgress;
}

export function ProfileSelect({ onProfileSelected }: ProfileSelectProps) {
  const [profiles, setProfiles] = useState<ProfileWithProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    loadProfiles();
  }, []);

  async function loadProfiles() {
    setIsLoading(true);
    try {
      await migrateDefaultUser();
      
      const allProfiles = await getAllProfiles();
      
      const profilesWithProgress: ProfileWithProgress[] = await Promise.all(
        allProfiles.map(async (profile) => {
          try {
            const progress = await getUserProgress(profile.id);
            return { ...profile, progress };
          } catch {
            return profile;
          }
        })
      );
      
      setProfiles(profilesWithProgress);
    } catch (err) {
      console.error('Failed to load profiles:', err);
    }
    setIsLoading(false);
  }

  async function handleCreateProfile() {
    if (!newProfileName.trim()) return;
    
    try {
      const profile = await createProfile(newProfileName);
      setNewProfileName('');
      setIsCreating(false);
      await loadProfiles();
      handleSelectProfile(profile);
    } catch (err) {
      console.error('Failed to create profile:', err);
    }
  }

  function handleSelectProfile(profile: UserProfile) {
    setCurrentProfileId(profile.id);
    onProfileSelected(profile);
  }

  async function handleDeleteProfile(profileId: string) {
    try {
      await deleteProfile(profileId);
      setConfirmDelete(null);
      await loadProfiles();
    } catch (err) {
      console.error('Failed to delete profile:', err);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading profiles...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">✨🦷✨</div>
          <h1 className="text-3xl font-bold text-white mb-2">Sparkle Brush</h1>
          <p className="text-purple-200">Who's brushing today?</p>
        </div>

        <div className="space-y-4 mb-8">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
            >
              {confirmDelete === profile.id ? (
                <div className="flex flex-col items-center gap-3 py-2">
                  <p className="text-white text-center">Delete {profile.name}'s profile?</p>
                  <p className="text-red-300 text-sm text-center">This will delete all their creatures and progress!</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleDeleteProfile(profile.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setConfirmDelete(null)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg font-bold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleSelectProfile(profile)}
                    className="flex-1 flex items-center gap-4"
                  >
                    <div 
                      className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg"
                      style={{ backgroundColor: profile.avatarColor }}
                    >
                      {profile.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-white font-bold text-lg">{profile.name}</div>
                      {profile.progress && (
                        <div className="text-purple-200 text-sm flex gap-3">
                          <span>🔥 {profile.progress.currentStreak} streak</span>
                          <span>🐾 {profile.progress.capturedCreatures.length} creatures</span>
                        </div>
                      )}
                    </div>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmDelete(profile.id);
                    }}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                    aria-label="Delete profile"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {isCreating ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="mb-4">
              <label className="block text-purple-200 text-sm mb-2">Profile Name</label>
              <input
                type="text"
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
                placeholder="Enter name..."
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                autoFocus
                maxLength={20}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreateProfile();
                  if (e.key === 'Escape') setIsCreating(false);
                }}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCreateProfile}
                disabled={!newProfileName.trim()}
                className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Profile
              </button>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setNewProfileName('');
                }}
                className="px-4 py-3 bg-gray-500/50 text-white rounded-xl font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsCreating(true)}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-2"
          >
            <span className="text-2xl">+</span>
            <span>Add New Profile</span>
          </button>
        )}

        {profiles.length === 0 && !isCreating && (
          <div className="text-center mt-8 text-purple-200">
            <p>No profiles yet!</p>
            <p className="text-sm mt-1">Create a profile to start brushing</p>
          </div>
        )}
      </div>
    </div>
  );
}
