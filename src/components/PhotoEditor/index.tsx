import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { ALL_BACKGROUNDS, getStickersForPhotoEditor } from '../../data/stickers';
import type { PlacedSticker, Background, CapturedCreature, Sticker } from '../../types';
import { v4 as uuidv4 } from 'uuid';

interface PhotoEditorProps {
  photo: string;
  capturedCreatures: CapturedCreature[];
  /** Sticker ids unlocked via streak prizes etc. */
  unlockedStickerIds?: string[];
  onDone: () => void;
  onBack: () => void;
  debugMode?: boolean;
}

interface DraggableSticker extends PlacedSticker {
  id: string;
  imageUrl: string;
  creatureId: string;
  /** Emoji sticker from sticker picker (not a creature PNG) */
  isEmoji?: boolean;
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
const STICKERS_PER_PAGE = 9;

export function PhotoEditor({
  photo,
  capturedCreatures,
  unlockedStickerIds = [],
  onDone,
  onBack,
  debugMode = false
}: PhotoEditorProps) {
  const [placedStickers, setPlacedStickers] = useState<DraggableSticker[]>([]);
  const [selectedBackground, setSelectedBackground] = useState<Background>(ALL_BACKGROUNDS[0]);
  const [draggedSticker, setDraggedSticker] = useState<string | null>(null);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  const [showStickerMenu, setShowStickerMenu] = useState(false);
  const [stickerMenuTab, setStickerMenuTab] = useState<'creatures' | 'emoji'>('creatures');
  const [stickerPickerPage, setStickerPickerPage] = useState(0);
  const [lastAddedCreatureId, setLastAddedCreatureId] = useState<string | null>(null);
  const [bombProgress, setBombProgress] = useState(0);
  const [isBombHolding, setIsBombHolding] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [explosionParticles, setExplosionParticles] = useState<Array<{ id: number; x: number; y: number; angle: number; emoji: string }>>([]);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);
  const [backgroundToast, setBackgroundToast] = useState<string | null>(null);
  const bombTimerRef = useRef<number | null>(null);
  const bombStartRef = useRef<number>(0);
  const toastTimerRef = useRef<number | null>(null);
  
  const maxStickers = debugMode ? 999 : MAX_STICKERS;

  const emojiStickersAvailable = useMemo(
    () => getStickersForPhotoEditor(unlockedStickerIds),
    [unlockedStickerIds]
  );

  const handleAddCreatureSticker = useCallback((creature: CapturedCreature) => {
    if (placedStickers.length >= maxStickers) {
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
  }, [placedStickers.length, maxStickers]);

  const handleAddEmojiSticker = useCallback((sticker: Sticker) => {
    if (placedStickers.length >= maxStickers) return;
    const offsetIndex = placedStickers.length % 10;
    const baseX = 50 + offsetIndex * STICKER_OFFSET - (5 * STICKER_OFFSET) / 2;
    const baseY = 50 + offsetIndex * STICKER_OFFSET - (5 * STICKER_OFFSET) / 2;
    const x = Math.max(10, Math.min(90, baseX));
    const y = Math.max(10, Math.min(90, baseY));
    const newSticker: DraggableSticker = {
      id: uuidv4(),
      stickerId: sticker.id,
      creatureId: '',
      imageUrl: sticker.imageUrl,
      isEmoji: true,
      x,
      y,
      scale: 1,
      rotation: 0
    };
    setPlacedStickers(prev => [...prev, newSticker]);
    setLastAddedCreatureId(null);
    setShowStickerMenu(false);
    setSelectedStickerId(newSticker.id);
  }, [placedStickers.length, maxStickers]);

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
    const newBackground = ALL_BACKGROUNDS[nextIndex];
    setSelectedBackground(newBackground);
    
    setBackgroundToast(newBackground.name);
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setBackgroundToast(null);
    }, 1500);
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

      for (const sticker of placedStickers) {
        const x = (sticker.x / 100) * canvas.width;
        const y = (sticker.y / 100) * canvas.height;
        const maxSize = stickerSize * sticker.scale;

        if (sticker.isEmoji) {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate((sticker.rotation * Math.PI) / 180);
          const fontSize = maxSize * 0.85;
          ctx.font = `${fontSize}px serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(sticker.imageUrl, 0, 0);
          ctx.restore();
          continue;
        }

        const stickerImg = await new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = sticker.imageUrl;
        });

        const natW = stickerImg.naturalWidth || 1;
        const natH = stickerImg.naturalHeight || 1;
        const scale = maxSize / Math.max(natW, natH);
        const drawWidth = natW * scale;
        const drawHeight = natH * scale;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((sticker.rotation * Math.PI) / 180);
        ctx.drawImage(stickerImg, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
        ctx.restore();
      }
      
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
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, [endBombHold]);

  const stickerPickerListLength =
    stickerMenuTab === 'creatures' ? capturedCreatures.length : emojiStickersAvailable.length;

  const stickerPickerTotalPages = Math.max(1, Math.ceil(stickerPickerListLength / STICKERS_PER_PAGE));

  useEffect(() => {
    if (!showStickerMenu) return;
    const maxIdx = stickerPickerTotalPages - 1;
    setStickerPickerPage(prev => (prev <= maxIdx ? prev : maxIdx));
  }, [showStickerMenu, stickerPickerTotalPages]);

  useEffect(() => {
    setStickerPickerPage(0);
  }, [stickerMenuTab]);

  const stepStickerPickerPage = useCallback(
    (delta: number) => {
      const total = Math.max(1, Math.ceil(stickerPickerListLength / STICKERS_PER_PAGE));
      setStickerPickerPage(prev => (prev + delta + total) % total);
    },
    [stickerPickerListLength]
  );

  const lastAddedCreature = capturedCreatures.find(c => c.id === lastAddedCreatureId);

  const stickerPickerSliceStart = stickerPickerPage * STICKERS_PER_PAGE;
  const paginatedCreatures = capturedCreatures.slice(
    stickerPickerSliceStart,
    stickerPickerSliceStart + STICKERS_PER_PAGE
  );
  const paginatedEmojiStickers = emojiStickersAvailable.slice(
    stickerPickerSliceStart,
    stickerPickerSliceStart + STICKERS_PER_PAGE
  );

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
                  {sticker.isEmoji ? (
                    <span
                      className="pointer-events-none flex items-center justify-center leading-none"
                      style={{
                        width: STICKER_BASE_SIZE,
                        height: STICKER_BASE_SIZE,
                        fontSize: STICKER_BASE_SIZE * 0.85
                      }}
                      role="img"
                      aria-hidden
                    >
                      {sticker.imageUrl}
                    </span>
                  ) : (
                    <img
                      src={sticker.imageUrl}
                      alt="Sticker"
                      className="pointer-events-none"
                      style={{ width: STICKER_BASE_SIZE, height: STICKER_BASE_SIZE, objectFit: 'contain' }}
                      draggable={false}
                    />
                  )}
                </div>
                {isSelected && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveSticker(sticker.id);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    className="absolute w-7 h-7 bg-red-600 rounded-full flex items-center justify-center text-white text-sm shadow-lg hover:bg-red-500 active:scale-90 transition-transform z-10"
                    style={{ 
                      top: `${-(STICKER_BASE_SIZE * sticker.scale) / 2 - 4}px`,
                      right: `${-(STICKER_BASE_SIZE * sticker.scale) / 2 - 4}px`,
                    }}
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
              Tap + to add creature or sparkle stickers!
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
        
        {backgroundToast && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-50 animate-toast-fade">
            <div className="bg-black/80 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              {backgroundToast}
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-purple-900/50 p-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowStickerMenu(true)}
            disabled={placedStickers.length >= maxStickers}
            className={`w-14 h-14 flex-shrink-0 rounded-xl flex items-center justify-center active:scale-95 transition-transform shadow-lg relative ${
              placedStickers.length >= maxStickers 
                ? 'bg-gray-600 opacity-50 cursor-not-allowed' 
                : 'bg-purple-600'
            }`}
          >
            {lastAddedCreature ? (
              <>
                <img
                  src={`${import.meta.env.BASE_URL}creatures/${lastAddedCreature.id}.png`}
                  alt={lastAddedCreature.name}
                  className="w-10 h-10 object-contain"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow">
                  +
                </div>
              </>
            ) : (
              <span className="text-2xl">+</span>
            )}
          </button>
          
          <button
            onClick={handleCycleBackground}
            className="w-12 h-12 flex-shrink-0 bg-purple-800/50 rounded-xl flex items-center justify-center active:scale-95 transition-transform"
          >
            <div 
              className="w-8 h-8 rounded-lg border-2 border-white/30"
              style={{ background: selectedBackground.imageUrl || '#1E1B4B' }}
            />
          </button>
          
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
                @keyframes toast-fade {
                  0% { opacity: 0; transform: translate(-50%, 10px); }
                  15% { opacity: 1; transform: translate(-50%, 0); }
                  85% { opacity: 1; transform: translate(-50%, 0); }
                  100% { opacity: 0; transform: translate(-50%, -10px); }
                }
                .animate-toast-fade {
                  animation: toast-fade 1.5s ease-in-out forwards;
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
            className="bg-purple-900 rounded-2xl p-4 m-4 max-w-md max-h-[80vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3 gap-2">
              <h2 className="text-xl font-bold">Add sticker</h2>
              <button
                onClick={() => setShowStickerMenu(false)}
                className="w-8 h-8 bg-purple-800 rounded-full flex items-center justify-center text-purple-300 hover:bg-purple-700"
              >
                ✕
              </button>
            </div>

            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => setStickerMenuTab('creatures')}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  stickerMenuTab === 'creatures'
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-800/50 text-purple-300'
                }`}
              >
                Creatures
              </button>
              <button
                type="button"
                onClick={() => setStickerMenuTab('emoji')}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  stickerMenuTab === 'emoji'
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-800/50 text-purple-300'
                }`}
              >
                Sparkle stickers
              </button>
            </div>

            {stickerMenuTab === 'creatures' && capturedCreatures.length === 0 ? (
              <div className="text-center py-8 text-purple-300">
                <p>No creatures captured yet!</p>
                <p className="text-sm mt-2">Complete brushing sessions to catch creatures.</p>
              </div>
            ) : stickerMenuTab === 'emoji' && emojiStickersAvailable.length === 0 ? (
              <div className="text-center py-8 text-purple-300">
                <p>No sparkle stickers yet.</p>
                <p className="text-sm mt-2">Complete a 7-day streak to earn some!</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => stepStickerPickerPage(-1)}
                    disabled={stickerPickerTotalPages <= 1}
                    className="min-w-[2.5rem] py-2 px-3 rounded-xl font-semibold text-purple-100 bg-purple-800 hover:bg-purple-700 active:scale-95 transition-all disabled:opacity-40 disabled:pointer-events-none"
                    aria-label="Previous sticker page"
                  >
                    ←
                  </button>
                  <span className="text-sm text-purple-200 tabular-nums min-w-[5.5rem] text-center">
                    {stickerPickerPage + 1} / {stickerPickerTotalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => stepStickerPickerPage(1)}
                    disabled={stickerPickerTotalPages <= 1}
                    className="min-w-[2.5rem] py-2 px-3 rounded-xl font-semibold text-purple-100 bg-purple-800 hover:bg-purple-700 active:scale-95 transition-all disabled:opacity-40 disabled:pointer-events-none"
                    aria-label="Next sticker page"
                  >
                    →
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {stickerMenuTab === 'creatures'
                    ? paginatedCreatures.map(creature => (
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
                      ))
                    : paginatedEmojiStickers.map(sticker => (
                        <button
                          key={sticker.id}
                          type="button"
                          onClick={() => handleAddEmojiSticker(sticker)}
                          className="aspect-square bg-purple-800/50 rounded-xl p-2 flex flex-col items-center justify-center gap-1 hover:bg-purple-700/50 active:scale-95 transition-all"
                        >
                          <span className="text-4xl leading-none" aria-hidden>
                            {sticker.imageUrl}
                          </span>
                          <span className="text-xs text-purple-200 truncate w-full text-center">
                            {sticker.name}
                          </span>
                        </button>
                      ))}
                </div>
              </>
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
