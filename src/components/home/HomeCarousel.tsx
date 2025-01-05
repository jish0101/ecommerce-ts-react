import { useState } from 'react';
import { HeroCarousel } from '@/types/home';
import HeroArea from './HeroArea';
import H1 from '../typography/H1';
import { Button } from '../ui/button';
import P from '../typography/P';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

type Props = {
  handleScroll: () => void;
  carouselData: HeroCarousel[];
};

const HomeCarousel = ({ carouselData, handleScroll }: Props) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  function handleHover(value: boolean) {
    setHovered(value);
  }

  return (
    <section className="grid h-[calc(100vh-70px)] place-content-center gap-12 md:grid-cols-2 md:gap-0">
      <HeroArea
        cardHovered={hovered}
        carouselData={carouselData}
        cardHoverHandler={handleHover}
      />
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <H1>Our featured products</H1>
        <P className="md:px-6 md:text-lg">
          Checkout our latest products and get the best deals on our featured
          items 💖
        </P>
        <Button onClick={() => navigate('/products')}>Browse more</Button>
      </div>
      <div className="flex items-center justify-center md:col-span-2">
        <Button
          size={'icon'}
          variant={'ghost'}
          onClick={handleScroll}
          className="mt-10 flex animate-bounce flex-col gap-0 rounded-full p-2"
        >
          <ChevronDown />
        </Button>
      </div>
    </section>
  );
};

export default HomeCarousel;
