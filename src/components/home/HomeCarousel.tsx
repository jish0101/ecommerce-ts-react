import { useState } from 'react';
import { HeroCarousel } from '@/types/home';
import HeroArea from './HeroArea';
import H1 from '../typography/H1';
import { Button } from '../ui/button';
import P from '../typography/P';
import { useNavigate } from 'react-router-dom';

type Props = {
  carouselData: HeroCarousel[];
};

const HomeCarousel = ({ carouselData }: Props) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  function handleHover(value: boolean) {
    setHovered(value);
  }

  return (
    <section className="grid gap-12 md:grid-cols-2 md:gap-4">
      <HeroArea
        cardHovered={hovered}
        carouselData={carouselData}
        cardHoverHandler={handleHover}
      />
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <H1>Our Featured Products</H1>
        <P className="md:px-6 md:text-lg">
          Checkout our latest products and get the best deals on our featured
          items 💖
        </P>
        <Button onClick={() => navigate('/products')}>Browse more</Button>
      </div>
    </section>
  );
};

export default HomeCarousel;
