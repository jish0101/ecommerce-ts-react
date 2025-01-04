'use client';

import { useEffect, useState } from 'react';
import { useCarousel } from '../ui/carousel';

type Props = {
  hovered?: boolean;
};

export const CarouselButtons = ({ hovered }: Props) => {
  const { api } = useCarousel();
  const [activeCarousel, setActiveCarousel] = useState(0);

  useEffect(() => {
    if (api && !hovered) {
      const list = api.scrollSnapList();
      const newIndex = (activeCarousel + 1) % list.length;
      const timer = setTimeout(() => {
        setActiveCarousel(newIndex);
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [activeCarousel, api, hovered]);

  useEffect(() => {
    if (!api) return;

    api.scrollTo(activeCarousel);
  }, [activeCarousel]);

  return (
    <div className="mt-4 flex w-full justify-center gap-2">
      {api
        ?.scrollSnapList()
        .map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveCarousel(idx)}
            className={`h-3 w-3 rounded-full transition-colors ${
              idx === activeCarousel
                ? 'bg-secondary outline outline-4 outline-secondary-foreground'
                : 'bg-secondary-foreground'
            }`}
          />
        ))}
    </div>
  );
};
