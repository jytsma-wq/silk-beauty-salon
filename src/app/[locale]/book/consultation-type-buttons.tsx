'use client';

import { Clock } from 'lucide-react';
import { useBookingStore } from '@/stores/booking-store';

interface ConsultationType {
  title: string;
  duration: string;
  description: string;
  bookingType: string;
}

interface ConsultationTypeButtonsProps {
  types: ConsultationType[];
}

export function ConsultationTypeButtons({ types }: ConsultationTypeButtonsProps) {
  const updateField = useBookingStore((state) => state.updateField);

  const handleClick = (title: string) => {
    updateField('service', title);
    const embed = document.getElementById('booking-embed');
    if (embed) {
      embed.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-4">
      {types.map((type) => (
        <button
          key={type.title}
          onClick={() => handleClick(type.title)}
          className="w-full flex items-start gap-3 py-4 border-t border-[#e8e4df] hover:border-[#b5453a] transition-colors text-left"
        >
          <Clock className="w-5 h-5 text-[#b5453a] shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-primary">{type.title}</h4>
            <p className="text-xs text-muted-foreground">{type.duration}</p>
            <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
