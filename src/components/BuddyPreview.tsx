import { ALL_BUDDIES } from '../data/buddies';

interface BuddyPreviewProps {
  buddyId: string;
  size: number;
}

export function BuddyPreview({ buddyId, size }: BuddyPreviewProps) {
  const buddy = ALL_BUDDIES.find(b => b.id === buddyId);
  
  if (!buddy) {
    return null;
  }

  return (
    <img
      src={buddy.imageUrl}
      alt={buddy.name}
      width={size}
      height={size}
      style={{
        objectFit: 'contain',
        imageRendering: 'auto'
      }}
    />
  );
}
