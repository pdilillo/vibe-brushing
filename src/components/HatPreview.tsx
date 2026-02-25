import { ALL_HATS } from '../data/hats';

interface HatPreviewProps {
  hatId: string;
  size: number;
}

export function HatPreview({ hatId, size }: HatPreviewProps) {
  const hat = ALL_HATS.find(h => h.id === hatId);
  
  if (!hat) {
    return null;
  }

  return (
    <img
      src={hat.imageUrl}
      alt={hat.name}
      width={size}
      height={size}
      style={{
        objectFit: 'contain',
        imageRendering: 'auto'
      }}
    />
  );
}
