import type { ZoneProgress } from '../../types';
import { MOUTH_ZONES } from '../../services/motionDetector';

interface CartoonMouthProps {
  zoneProgress: ZoneProgress[];
  activeZones: string[];
}

const GUNK_COLORS = [
  '#9333EA', // purple
  '#22C55E', // green  
  '#F97316', // orange
  '#EC4899', // pink
  '#3B82F6', // blue
  '#EAB308', // yellow
];

export function CartoonMouth({ zoneProgress, activeZones }: CartoonMouthProps) {
  return (
    <div className="relative w-full max-w-xs mx-auto aspect-[4/3]">
      <svg viewBox="0 0 200 150" className="w-full h-full">
        <defs>
          <linearGradient id="lipGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#BE185D" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <ellipse cx="100" cy="80" rx="90" ry="60" fill="url(#lipGradient)" />
        
        <ellipse cx="100" cy="80" rx="75" ry="45" fill="#1a0a0a" />
        
        {MOUTH_ZONES.map((zone, index) => {
          const progress = zoneProgress.find(p => p.zoneId === zone.id);
          const cleaningProgress = progress?.cleaningProgress || 0;
          const isActive = activeZones.includes(zone.id);
          const gunkOpacity = Math.max(0, 1 - cleaningProgress / 100);
          
          const toothX = 30 + (index % 3) * 48;
          const toothY = index < 3 ? 50 : 90;
          
          return (
            <g key={zone.id}>
              <rect
                x={toothX}
                y={toothY}
                width="40"
                height="30"
                rx="5"
                fill={cleaningProgress >= 100 ? '#FAFAFA' : '#E5E5E5'}
                stroke={isActive ? '#FCD34D' : '#D4D4D4'}
                strokeWidth={isActive ? 3 : 1}
                filter={cleaningProgress >= 100 ? 'url(#glow)' : undefined}
                className={isActive ? 'animate-wiggle' : ''}
                style={{ transformOrigin: `${toothX + 20}px ${toothY + 15}px` }}
              />
              
              {cleaningProgress >= 100 && (
                <text
                  x={toothX + 20}
                  y={toothY + 20}
                  textAnchor="middle"
                  fontSize="16"
                  className="animate-sparkle"
                >
                  ✨
                </text>
              )}
              
              {gunkOpacity > 0 && (
                <g style={{ opacity: gunkOpacity, transition: 'opacity 0.3s' }}>
                  <circle
                    cx={toothX + 10}
                    cy={toothY + 10}
                    r="6"
                    fill={GUNK_COLORS[index]}
                    className={isActive ? 'animate-wiggle' : ''}
                  />
                  <circle
                    cx={toothX + 28}
                    cy={toothY + 8}
                    r="5"
                    fill={GUNK_COLORS[(index + 2) % 6]}
                  />
                  <circle
                    cx={toothX + 18}
                    cy={toothY + 22}
                    r="7"
                    fill={GUNK_COLORS[(index + 4) % 6]}
                  />
                  <ellipse
                    cx={toothX + 32}
                    cy={toothY + 20}
                    rx="4"
                    ry="5"
                    fill={GUNK_COLORS[(index + 1) % 6]}
                  />
                </g>
              )}
            </g>
          );
        })}
        
        <path
          d="M 30 75 Q 100 95 170 75"
          fill="none"
          stroke="#BE185D"
          strokeWidth="3"
        />
      </svg>
      
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-purple-300 whitespace-nowrap">
        Brush all the gunk away!
      </div>
    </div>
  );
}
