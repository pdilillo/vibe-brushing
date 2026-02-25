import { useEffect, useState } from 'react';
import type { DebugInfo } from '../../services/motionDetector';

interface DebugOverlayProps {
  getDebugInfo: () => DebugInfo | null;
  containerWidth: number;
  containerHeight: number;
  videoWidth: number;
  videoHeight: number;
}

export function DebugOverlay({ 
  getDebugInfo, 
  containerWidth, 
  containerHeight,
  videoWidth,
  videoHeight 
}: DebugOverlayProps) {
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const info = getDebugInfo();
      setDebugInfo(info);
    }, 50);
    return () => clearInterval(interval);
  }, [getDebugInfo]);

  const scaleX = containerWidth / videoWidth;
  const scaleY = containerHeight / videoHeight;
  const scale = Math.min(scaleX, scaleY);

  const videoDisplayWidth = videoWidth * scale;
  const videoDisplayHeight = videoHeight * scale;
  const offsetX = (containerWidth - videoDisplayWidth) / 2;
  const offsetY = (containerHeight - videoDisplayHeight) / 2;

  const toScreenX = (videoX: number) => {
    const mirroredX = videoWidth - videoX;
    return offsetX + mirroredX * scale;
  };
  const toScreenY = (videoY: number) => offsetY + videoY * scale;

  if (!debugInfo) {
    return (
      <div className="absolute inset-0 pointer-events-none z-50">
        <div className="absolute top-2 left-2 bg-black/80 text-white text-xs p-2 rounded font-mono">
          <div className="font-bold text-yellow-400">DEBUG MODE</div>
          <div className="text-gray-400">Waiting for data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      <svg className="w-full h-full" style={{ overflow: 'visible' }}>
        {debugInfo.brushingRegion && (
          <rect
            x={toScreenX(debugInfo.brushingRegion.x + debugInfo.brushingRegion.width)}
            y={toScreenY(debugInfo.brushingRegion.y)}
            width={debugInfo.brushingRegion.width * scale}
            height={debugInfo.brushingRegion.height * scale}
            fill="rgba(0, 255, 0, 0.1)"
            stroke="#00ff00"
            strokeWidth="2"
            strokeDasharray="8,4"
          />
        )}

        {debugInfo.faceRegion && (
          <>
            <rect
              x={toScreenX(debugInfo.faceRegion.x + debugInfo.faceRegion.width / 2)}
              y={toScreenY(debugInfo.faceRegion.y)}
              width={debugInfo.faceRegion.width * scale}
              height={debugInfo.faceRegion.height * scale}
              fill="none"
              stroke="#ff6600"
              strokeWidth="2"
            />
            <rect
              x={toScreenX(debugInfo.faceRegion.x + debugInfo.faceRegion.width * 0.35)}
              y={toScreenY(debugInfo.faceRegion.y + debugInfo.faceRegion.height * 0.1)}
              width={debugInfo.faceRegion.width * 0.7 * scale}
              height={debugInfo.faceRegion.height * 0.5 * scale}
              fill="rgba(255, 0, 0, 0.3)"
              stroke="#ff0000"
              strokeWidth="1"
            />
          </>
        )}

        {debugInfo.zones.map((zone) => {
          const zoneX = zone.bounds.x * videoWidth;
          const zoneY = zone.bounds.y * videoHeight;
          const zoneW = zone.bounds.width * videoWidth;
          const zoneH = zone.bounds.height * videoHeight;
          
          return (
            <g key={zone.id}>
              <rect
                x={toScreenX(zoneX + zoneW)}
                y={toScreenY(zoneY)}
                width={zoneW * scale}
                height={zoneH * scale}
                fill={zone.hasMotion ? 'rgba(0, 255, 0, 0.35)' : 'rgba(100, 200, 255, 0.15)'}
                stroke={zone.hasMotion ? '#00ff00' : '#66ccff'}
                strokeWidth={zone.hasMotion ? 3 : 2}
                rx={8}
              />
              <text
                x={toScreenX(zoneX + zoneW / 2)}
                y={toScreenY(zoneY + zoneH / 2)}
                fill={zone.hasMotion ? '#00ff00' : '#ffffff'}
                fontSize="14"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="middle"
                style={{ textShadow: '0 0 4px black, 0 0 2px black' }}
              >
                {zone.hasMotion ? `BRUSHING ${zone.motionLevel.toFixed(0)}%` : 'Move toothbrush here'}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="absolute top-2 left-2 bg-black/90 text-white text-xs p-2 rounded font-mono max-w-[220px]">
        <div className="font-bold mb-1 text-yellow-400">DEBUG MODE</div>
        <div className={debugInfo.handMotionDetected ? 'text-green-400 font-bold text-sm' : 'text-gray-400'}>
          {debugInfo.handMotionDetected ? '✓ BRUSHING DETECTED' : '○ No motion'}
        </div>
        <div className="text-gray-300">Motion level: {debugInfo.frameMotionTotal.toFixed(0)}</div>
        {debugInfo.zones[0] && (
          <div className="text-gray-300">
            Zone motion: {debugInfo.zones[0].motionLevel.toFixed(1)}%
          </div>
        )}
        <div className="mt-1 pt-1 border-t border-gray-600 text-[10px] text-gray-400">
          <span className="text-cyan-400">Blue box</span> = detection zone<br/>
          <span className="text-orange-400">Orange</span> = face | <span className="text-red-400">Red</span> = ignored
        </div>
      </div>
    </div>
  );
}
