import { useState, useRef, useCallback, useEffect } from 'react';
import { ALL_BACKGROUNDS } from '../../data/stickers';
import type { PlacedSticker, Background, CapturedCreature } from '../../types';
import { v4 as uuidv4 } from 'uuid';

interface PhotoEditorProps {
  photo: string;
  capturedCreatures: CapturedCreature[];
  onDone: () => void;
  onBack: () => void;
}

interface DraggableSticker extends PlacedSticker {
  id: string;
  imageUrl: string;
  creatureId: string;
}

const SIZE_PRESETS = [
  { label: 'S', scale: 0.75 },
  { label: 'M', scale: 1.0 },
  { label: 'L', scale: 1.5 },
  { label: 'XL', scale: 2.0 },
] as const;

const STICKER_BASE_SIZE = 80;
const BOMB_HOLD_DURATION = 2000;
const MAX_STICKERS = 30;
const STICKER_OFFSET = 5;

export function PhotoEditor({ photo, capturedCreatures, onDone, onBack }: PhotoEditorProps) {
  const [placedStickers, setPlacedStickers] = useState<DraggableSticker[]>([]);
  const [selectedBackground, setSelectedBackground] = useState<Background>(ALL_BACKGROUNDS[0]);
  const [draggedSticker, setDraggedSticker] = useState<string | null>(null);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  const [showStickerMenu, setShowStickerMenu] = useState(false);
  const [lastAddedCreatureId, setLastAddedCreatureId] = useState<string | null>(null);
  const [bombProgress, setBombProgress] = useState(0);
  const [isBombHolding, setIsBombHolding] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [explosionParticles, setExplosionParticles] = useState<Array<{ id: number; x: number; y: number; angle: number; emoji: string }>>([]);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);
  const bombTimerRef = useRef<number | null>(null);
  const bombStartRef = useRef<number>(0);

  const handleAddCreatureSticker = useCallback((creature: CapturedCreature) => {
    if (placedStickers.length >= MAX_STICKERS) {
      return;
    }
    
    const offsetIndex = placedStickers.length % 10;
    const baseX = 50 + (offsetIndex * STICKER_OFFSET) - (5 * STICKER_OFFSET / 2);
    const baseY = 50 + (offsetIndex * STICKER_OFFSET) - (5 * STICKER_OFFSET / 2);
    const x = Math.max(10, Math.min(90, baseX));
    const y = Math.max(10, Math.min(90, baseY));
    
    const newSticker: DraggableSticker = {
      id: uuidv4(),
      stickerId: creature.id,
      creatureId: creature.id,
      imageUrl: `${import.meta.env.BASE_URL}creatures/${creature.id}.png`,
      x,
      y,
      scale: 1,
      rotation: 0
    };
    setPlacedStickers(prev => [...prev, newSticker]);
    setLastAddedCreatureId(creature.id);
    setShowStickerMenu(false);
    setSelectedStickerId(newSticker.id);
  }, [placedStickers.length]);

  const handleDragStart = useCallback((stickerId: string, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setDraggedSticker(stickerId);
    setSelectedStickerId(stickerId);
  }, []);

  const handleDrag = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (!draggedSticker || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    let clientX: number, clientY: number;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    
    setPlacedStickers(prev => prev.map(s => 
      s.id === draggedSticker
        ? { ...s, x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) }
        : s
    ));
  }, [draggedSticker]);

  const handleRemoveSticker = useCallback((stickerId: string) => {
    setPlacedStickers(prev => prev.filter(s => s.id !== stickerId));
    if (selectedStickerId === stickerId) {
      setSelectedStickerId(null);
    }
  }, [selectedStickerId]);

  const handleCycleSize = useCallback((stickerId: string) => {
    setPlacedStickers(prev => prev.map(s => {
      if (s.id !== stickerId) return s;
      const currentIndex = SIZE_PRESETS.findIndex(p => Math.abs(p.scale - s.scale) < 0.01);
      const nextIndex = (currentIndex + 1) % SIZE_PRESETS.length;
      return { ...s, scale: SIZE_PRESETS[nextIndex].scale };
    }));
  }, []);

  const handleStickerClick = useCallback((stickerId: string, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setSelectedStickerId(stickerId);
  }, []);

  const handleCanvasClick = useCallback(() => {
    setSelectedStickerId(null);
  }, []);

  const handleCycleBackground = useCallback(() => {
    const currentIndex = ALL_BACKGROUNDS.findIndex(bg => bg.id === selectedBackground.id);
    const nextIndex = (currentIndex + 1) % ALL_BACKGROUNDS.length;
    setSelectedBackground(ALL_BACKGROUNDS[nextIndex]);
  }, [selectedBackground]);

  const handleCycleSelectedSize = useCallback(() => {
    if (selectedStickerId) {
      handleCycleSize(selectedStickerId);
    }
  }, [selectedStickerId, handleCycleSize]);

  const handleRotateSticker = useCallback((stickerId: string) => {
    setPlacedStickers(prev => prev.map(s => {
      if (s.id !== stickerId) return s;
      return { ...s, rotation: (s.rotation + 45) % 360 };
    }));
  }, []);

  const handleRotateSelectedSticker = useCallback(() => {
    if (selectedStickerId) {
      handleRotateSticker(selectedStickerId);
    }
  }, [selectedStickerId, handleRotateSticker]);

  const triggerExplosion = useCallback(() => {
    setIsExploding(true);
    setBombProgress(0);
    setIsBombHolding(false);
    
    const explosionEmojis = ['💥', '✨', '⭐', '🔥', '💫', '🌟', '⚡'];
    const particles = Array.from({ length: 16 }, (_, i) => ({
      id: i,
      x: 50,
      y: 50,
      angle: (i * 360) / 16,
      emoji: explosionEmojis[Math.floor(Math.random() * explosionEmojis.length)]
    }));
    setExplosionParticles(particles);
    
    setTimeout(() => {
      setPlacedStickers([]);
      setSelectedStickerId(null);
      setIsExploding(false);
      setExplosionParticles([]);
    }, 600);
  }, []);

  const handleClearAllStickers = useCallback(() => {
    triggerExplosion();
  }, [triggerExplosion]);

  const startBombHold = useCallback(() => {
    setIsBombHolding(true);
    bombStartRef.current = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - bombStartRef.current;
      const progress = Math.min(elapsed / BOMB_HOLD_DURATION, 1);
      setBombProgress(progress);
      
      if (progress >= 1) {
        handleClearAllStickers();
      } else {
        bombTimerRef.current = requestAnimationFrame(updateProgress);
      }
    };
    
    bombTimerRef.current = requestAnimationFrame(updateProgress);
  }, [handleClearAllStickers]);

  const endBombHold = useCallback(() => {
    setIsBombHolding(false);
    setBombProgress(0);
    if (bombTimerRef.current) {
      cancelAnimationFrame(bombTimerRef.current);
      bombTimerRef.current = null;
    }
  }, []);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = photo;
      });
      
      canvas.width = img.width;
      canvas.height = img.height;
      
      if (selectedBackground.imageUrl) {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      ctx.drawImage(img, 0, 0);
      
      const stickerSize = Math.min(canvas.width, canvas.height) / 4;
      
      const loadStickerImages = placedStickers.map(sticker => {
        return new Promise<{ sticker: DraggableSticker; img: HTMLImageElement }>((resolve, reject) => {
          const stickerImg = new Image();
          stickerImg.crossOrigin = 'anonymous';
          stickerImg.onload = () => resolve({ sticker, img: stickerImg });
          stickerImg.onerror = reject;
          stickerImg.src = sticker.imageUrl;
        });
      });
      
      const loadedStickers = await Promise.all(loadStickerImages);
      
      loadedStickers.forEach(({ sticker, img: stickerImg }) => {
        const x = (sticker.x / 100) * canvas.width;
        const y = (sticker.y / 100) * canvas.height;
        const size = stickerSize * sticker.scale;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((sticker.rotation * Math.PI) / 180);
        ctx.drawImage(stickerImg, -size / 2, -size / 2, size, size);
        ctx.restore();
      });
      
      const dataUrl = canvas.toDataURL('image/png');
      
      const link = document.createElement('a');
      link.download = `sparkle-brush-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      
      setTimeout(onDone, 500);
    } catch (error) {
      console.error('Failed to save image:', error);
      setIsSaving(false);
    }
  }, [photo, placedStickers, selectedBackground, onDone]);

  useEffect(() => {
    const handleMouseUp = () => {
      setDraggedSticker(null);
      endBombHold();
    };
    const handleTouchEnd = () => {
      setDraggedSticker(null);
      endBombHold();
    };
    
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleTouchEnd);
      if (bombTimerRef.current) {
        cancelAnimationFrame(bombTimerRef.current);
      }
    };
  }, [endBombHold]);

  const lastAddedCreature = capturedCreatures.find(c => c.id === lastAddedCreatureId);

  const handleAddLastCreature = useCallback(() => {
    if (lastAddedCreature) {
      handleAddCreatureSticker(lastAddedCreature);
    }
  }, [lastAddedCreature, handleAddCreatureSticker]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-3 bg-purple-900/50">
        <button
          onClick={onBack}
          className="px-3 py-1 text-purple-300 bg-purple-800/50 rounded-lg"
        >
          ← Back
        </button>
        <h1 className="text-lg font-bold">Decorate!</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowSkipConfirm(true)}
            disabled={isSaving}
            className="px-3 py-1 text-purple-300 bg-purple-800/50 rounded-lg disabled:opacity-50"
          >
            Skip
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-1 text-white bg-green-600 rounded-lg disabled:opacity-50"
          >
            {isSaving ? '...' : 'Save'}
          </button>
        </div>
      </div>
      
      <div 
        ref={canvasRef}
        className="flex-1 relative overflow-hidden m-3 rounded-2xl"
        style={{
          background: selectedBackground.imageUrl || 'transparent'
        }}
        onMouseMove={handleDrag}
        onTouchMove={handleDrag}
        onClick={handleCanvasClick}
      >
        <img
          src={photo}
          alt="Your photo"
          className="w-full h-full object-contain"
          draggable={false}
        />
        
        {placedStickers.map(sticker => {
          const isSelected = selectedStickerId === sticker.id;
          const isDragging = draggedSticker === sticker.id;
          
          return (
            <div
              key={sticker.id}
              className={`absolute cursor-move select-none ${
                isDragging ? 'z-20' : isSelected ? 'z-10' : ''
              }`}
              style={{
                left: `${sticker.x}%`,
                top: `${sticker.y}%`,
                transform: `translate(-50%, -50%)`,
                transition: isDragging ? 'none' : 'transform 0.1s'
              }}
              onMouseDown={(e) => handleDragStart(sticker.id, e)}
              onTouchStart={(e) => handleDragStart(sticker.id, e)}
              onClick={(e) => handleStickerClick(sticker.id, e)}
            >
              <div className="relative">
                <div
                  className={`relative ${isSelected ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-transparent rounded-lg' : ''}`}
                  style={{
                    transform: `scale(${sticker.scale}) rotate(${sticker.rotation}deg)`,
                    transition: isDragging ? 'none' : 'transform 0.15s'
                  }}
                >
                  <img
                    src={sticker.imageUrl}
                    alt="Sticker"
                    className="pointer-events-none"
                    style={{ width: STICKER_BASE_SIZE, height: STICKER_BASE_SIZE, objectFit: 'contain' }}
                    draggable={false}
                  />
                </div>
                {isSelected && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveSticker(sticker.id);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-sm shadow-lg hover:bg-red-500 active:scale-90 transition-transform"
                    style={{ transform: `scale(${1 / sticker.scale})` }}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          );
        })}
        
        {placedStickers.length === 0 && !showStickerMenu && !isExploding && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/50 rounded-xl px-4 py-2 text-sm text-white text-center">
              Tap the + button to add creature stickers!
            </div>
          </div>
        )}
        
        {isExploding && (
          <>
            <div className="absolute inset-0 bg-orange-500/30 animate-explosion-flash pointer-events-none z-30" />
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
              <div className="text-8xl animate-explosion-center">💥</div>
            </div>
            
            {explosionParticles.map(particle => (
              <div
                key={particle.id}
                className="absolute text-3xl pointer-events-none z-40 animate-explosion-particle"
                style={{
                  left: '50%',
                  top: '50%',
                  '--particle-angle': `${particle.angle}deg`,
                } as React.CSSProperties}
              >
                {particle.emoji}
              </div>
            ))}
          </>
        )}
      </div>
      
      <div className="bg-purple-900/50 p-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowStickerMenu(true)}
            disabled={placedStickers.length >= MAX_STICKERS}
            className={`w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center text-2xl active:scale-95 transition-transform shadow-lg ${
              placedStickers.length >= MAX_STICKERS 
                ? 'bg-gray-600 opacity-50 cursor-not-allowed' 
                : 'bg-purple-600'
            }`}
          >
            +
          </button>
          
          <button
            onClick={handleCycleBackground}
            className="h-12 flex-shrink-0 bg-purple-800/50 rounded-xl flex items-center gap-2 px-3 active:scale-95 transition-transform"
          >
            <div 
              className="w-8 h-8 rounded-lg border-2 border-white/30"
              style={{ background: selectedBackground.imageUrl || '#1E1B4B' }}
            />
            <span className="text-xs text-purple-200">{selectedBackground.name}</span>
          </button>
          
          {lastAddedCreature && placedStickers.length < MAX_STICKERS && (
            <button
              onClick={handleAddLastCreature}
              className="h-12 flex-shrink-0 bg-green-700/50 rounded-xl flex items-center gap-2 px-3 active:scale-95 transition-transform hover:bg-green-600/50"
            >
              <img
                src={`${import.meta.env.BASE_URL}creatures/${lastAddedCreature.id}.png`}
                alt={lastAddedCreature.name}
                className="w-8 h-8 object-contain"
              />
              <span className="text-xs text-green-200">+ Add</span>
            </button>
          )}
          
          <div className="flex-1" />
          
          {selectedStickerId && (
            <>
              <button
                onClick={handleCycleSelectedSize}
                className="w-12 h-12 flex-shrink-0 bg-blue-600 rounded-xl flex items-center justify-center active:scale-95 transition-transform shadow-lg"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </button>
              
              <button
                onClick={handleRotateSelectedSticker}
                className="w-12 h-12 flex-shrink-0 bg-orange-600 rounded-xl flex items-center justify-center active:scale-95 transition-transform shadow-lg"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12a9 9 0 1 1-9-9" />
                  <path d="M21 3v9h-9" />
                </svg>
              </button>
            </>
          )}
          
          <div className="flex-1" />
          
          {placedStickers.length > 0 && (
            <button
              onMouseDown={startBombHold}
              onTouchStart={startBombHold}
              onMouseUp={endBombHold}
              onTouchEnd={endBombHold}
              onMouseLeave={endBombHold}
              className={`w-14 h-14 flex-shrink-0 rounded-xl flex items-center justify-center text-2xl transition-all relative overflow-hidden ${
                isBombHolding 
                  ? 'bg-red-600 scale-105' 
                  : 'bg-red-900/70'
              }`}
              style={{
                animation: isBombHolding ? 'bomb-shake 0.1s infinite' : 'none'
              }}
            >
              <svg
                className="absolute inset-0 w-full h-full -rotate-90"
                viewBox="0 0 36 36"
              >
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="rgba(0, 0, 0, 0.3)"
                  strokeWidth="4"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${bombProgress * 94.2} 94.2`}
                  style={{ filter: 'drop-shadow(0 0 4px #fbbf24)' }}
                />
              </svg>
              
              {isBombHolding && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-lg drop-shadow-lg">
                    {Math.ceil((1 - bombProgress) * (BOMB_HOLD_DURATION / 1000))}
                  </span>
                </div>
              )}
              
              <span className={`relative z-10 transition-all ${
                isBombHolding ? 'scale-75 opacity-50' : ''
              }`}>
                💣
              </span>
              
              <style>{`
                @keyframes bomb-shake {
                  0%, 100% { transform: translateX(0); }
                  25% { transform: translateX(-2px) rotate(-2deg); }
                  75% { transform: translateX(2px) rotate(2deg); }
                }
                @keyframes explosion-flash {
                  0% { opacity: 0; }
                  20% { opacity: 1; }
                  100% { opacity: 0; }
                }
                @keyframes explosion-center {
                  0% { transform: scale(0) rotate(0deg); opacity: 1; }
                  50% { transform: scale(2) rotate(180deg); opacity: 1; }
                  100% { transform: scale(3) rotate(360deg); opacity: 0; }
                }
                @keyframes explosion-particle {
                  0% { 
                    transform: translate(-50%, -50%) rotate(var(--particle-angle)) translateX(0) scale(1);
                    opacity: 1;
                  }
                  100% { 
                    transform: translate(-50%, -50%) rotate(var(--particle-angle)) translateX(150px) scale(0);
                    opacity: 0;
                  }
                }
                .animate-explosion-flash {
                  animation: explosion-flash 0.6s ease-out forwards;
                }
                .animate-explosion-center {
                  animation: explosion-center 0.6s ease-out forwards;
                }
                .animate-explosion-particle {
                  animation: explosion-particle 0.6s ease-out forwards;
                }
              `}</style>
            </button>
          )}
        </div>
      </div>

      {showStickerMenu && (
        <div 
          className="absolute inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setShowStickerMenu(false)}
        >
          <div 
            className="bg-purple-900 rounded-2xl p-4 m-4 max-w-md max-h-[80vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Add Creature Sticker</h2>
              <button
                onClick={() => setShowStickerMenu(false)}
                className="w-8 h-8 bg-purple-800 rounded-full flex items-center justify-center text-purple-300 hover:bg-purple-700"
              >
                ✕
              </button>
            </div>
            
            {capturedCreatures.length === 0 ? (
              <div className="text-center py-8 text-purple-300">
                <p>No creatures captured yet!</p>
                <p className="text-sm mt-2">Complete brushing sessions to catch creatures.</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {capturedCreatures.map(creature => (
                  <button
                    key={creature.id}
                    onClick={() => handleAddCreatureSticker(creature)}
                    className="aspect-square bg-purple-800/50 rounded-xl p-2 flex flex-col items-center justify-center gap-1 hover:bg-purple-700/50 active:scale-95 transition-all"
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}creatures/${creature.id}.png`}
                      alt={creature.name}
                      className="w-16 h-16 object-contain"
                    />
                    <span className="text-xs text-purple-200 truncate w-full text-center">
                      {creature.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {showSkipConfirm && (
        <div 
          className="absolute inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setShowSkipConfirm(false)}
        >
          <div 
            className="bg-purple-900 rounded-2xl p-6 m-4 max-w-sm text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-2">Skip Decorating?</h2>
            <p className="text-purple-300 mb-6">
              Your photo won't be saved. Are you sure you want to skip?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSkipConfirm(false)}
                className="flex-1 py-3 bg-purple-800 rounded-xl font-semibold hover:bg-purple-700 active:scale-95 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowSkipConfirm(false);
                  onDone();
                }}
                className="flex-1 py-3 bg-red-600 rounded-xl font-semibold hover:bg-red-500 active:scale-95 transition-all"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
