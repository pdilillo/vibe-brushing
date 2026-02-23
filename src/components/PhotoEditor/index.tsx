import { useState, useRef, useCallback, useEffect } from 'react';
import { ALL_STICKERS, ALL_BACKGROUNDS } from '../../data/stickers';
import type { PlacedSticker, Background } from '../../types';
import { v4 as uuidv4 } from 'uuid';

interface PhotoEditorProps {
  photo: string;
  onDone: () => void;
  onBack: () => void;
}

interface DraggableSticker extends PlacedSticker {
  id: string;
  imageUrl: string;
}

export function PhotoEditor({ photo, onDone, onBack }: PhotoEditorProps) {
  const [placedStickers, setPlacedStickers] = useState<DraggableSticker[]>([]);
  const [selectedBackground, setSelectedBackground] = useState<Background>(ALL_BACKGROUNDS[0]);
  const [activeTab, setActiveTab] = useState<'stickers' | 'backgrounds'>('stickers');
  const [draggedSticker, setDraggedSticker] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleAddSticker = useCallback((sticker: typeof ALL_STICKERS[0]) => {
    const newSticker: DraggableSticker = {
      id: uuidv4(),
      stickerId: sticker.id,
      imageUrl: sticker.imageUrl,
      x: 50,
      y: 50,
      scale: 1,
      rotation: 0
    };
    setPlacedStickers(prev => [...prev, newSticker]);
  }, []);

  const handleDragStart = useCallback((stickerId: string) => {
    setDraggedSticker(stickerId);
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
      
      ctx.font = `${canvas.width / 8}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      placedStickers.forEach(sticker => {
        const x = (sticker.x / 100) * canvas.width;
        const y = (sticker.y / 100) * canvas.height;
        ctx.fillText(sticker.imageUrl, x, y);
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
    const handleMouseUp = () => setDraggedSticker(null);
    const handleTouchEnd = () => setDraggedSticker(null);
    
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

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
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-4 py-1 text-white bg-green-600 rounded-lg disabled:opacity-50"
        >
          {isSaving ? '...' : 'Save 💾'}
        </button>
      </div>
      
      <div 
        ref={canvasRef}
        className="flex-1 relative overflow-hidden m-3 rounded-2xl"
        style={{
          background: selectedBackground.imageUrl || 'transparent'
        }}
        onMouseMove={handleDrag}
        onTouchMove={handleDrag}
      >
        <img
          src={photo}
          alt="Your photo"
          className="w-full h-full object-contain"
          draggable={false}
        />
        
        {placedStickers.map(sticker => (
          <div
            key={sticker.id}
            className={`absolute cursor-move select-none ${
              draggedSticker === sticker.id ? 'scale-110 z-10' : ''
            }`}
            style={{
              left: `${sticker.x}%`,
              top: `${sticker.y}%`,
              transform: `translate(-50%, -50%) scale(${sticker.scale}) rotate(${sticker.rotation}deg)`,
              fontSize: '3rem',
              transition: draggedSticker === sticker.id ? 'none' : 'transform 0.1s'
            }}
            onMouseDown={() => handleDragStart(sticker.id)}
            onTouchStart={() => handleDragStart(sticker.id)}
            onDoubleClick={() => handleRemoveSticker(sticker.id)}
          >
            {sticker.imageUrl}
          </div>
        ))}
        
        {placedStickers.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/50 rounded-xl px-4 py-2 text-sm text-white text-center">
              Tap stickers below to add them!<br/>
              Double-tap to remove
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-purple-900/50 p-3">
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setActiveTab('stickers')}
            className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === 'stickers'
                ? 'bg-purple-600 text-white'
                : 'bg-purple-800/50 text-purple-300'
            }`}
          >
            Stickers ✨
          </button>
          <button
            onClick={() => setActiveTab('backgrounds')}
            className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === 'backgrounds'
                ? 'bg-purple-600 text-white'
                : 'bg-purple-800/50 text-purple-300'
            }`}
          >
            Backgrounds 🎨
          </button>
        </div>
        
        <div className="overflow-x-auto pb-2">
          {activeTab === 'stickers' ? (
            <div className="flex gap-2">
              {ALL_STICKERS.map(sticker => (
                <button
                  key={sticker.id}
                  onClick={() => handleAddSticker(sticker)}
                  className="w-12 h-12 flex-shrink-0 bg-purple-800/50 rounded-xl flex items-center justify-center text-2xl active:scale-95 transition-transform"
                >
                  {sticker.imageUrl}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex gap-2">
              {ALL_BACKGROUNDS.map(bg => (
                <button
                  key={bg.id}
                  onClick={() => setSelectedBackground(bg)}
                  className={`w-12 h-12 flex-shrink-0 rounded-xl transition-all ${
                    selectedBackground.id === bg.id
                      ? 'ring-2 ring-white scale-110'
                      : ''
                  }`}
                  style={{
                    background: bg.imageUrl || '#1E1B4B'
                  }}
                >
                  {!bg.imageUrl && <span className="text-xs">None</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
