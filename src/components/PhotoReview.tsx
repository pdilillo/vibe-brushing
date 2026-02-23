import { CreatureArt } from './CreatureArt';
import type { Creature } from '../types';

interface PhotoReviewProps {
  photos: string[];
  capturedCreature: Creature | null;
  onSelectPhoto: (photo: string) => void;
  onSkip: () => void;
}

export function PhotoReview({ photos, capturedCreature, onSelectPhoto, onSkip }: PhotoReviewProps) {
  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="text-6xl mb-4">📷</div>
        <h1 className="text-2xl font-bold mb-2">No Photos</h1>
        <p className="text-purple-200 mb-6">
          No photos were captured during this session.
        </p>
        <button
          onClick={onSkip}
          className="px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-4">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold mb-1">Your Photos!</h1>
        <p className="text-purple-200 text-sm">
          Tap a photo to decorate it with stickers!
        </p>
        {capturedCreature && (
          <div className="mt-2 inline-flex items-center gap-2 bg-yellow-900/30 px-3 py-1 rounded-full">
            <CreatureArt creature={capturedCreature} size={24} animated={false} />
            <span className="text-sm text-yellow-300">New sticker unlocked!</span>
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3">
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => onSelectPhoto(photo)}
              className="aspect-[3/4] rounded-2xl overflow-hidden bg-purple-900/50 active:scale-95 transition-transform shadow-lg"
            >
              <img
                src={photo}
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
      
      <button
        onClick={onSkip}
        className="w-full mt-4 py-3 text-lg text-purple-300 bg-purple-800/50 rounded-xl"
      >
        Skip for now
      </button>
    </div>
  );
}
