import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';
import { CarouselButtons } from './CarouselButtons';
import { HeroCarousel } from '@/types/home';

type Props = {
  cardHovered: boolean;
  carouselData: HeroCarousel[];
  cardHoverHandler: (hover: boolean) => void;
};

const HeroArea = ({ carouselData, cardHovered, cardHoverHandler }: Props) => {
  return (
    <Carousel
      className="relative"
      onMouseEnter={() => cardHoverHandler(true)}
      onMouseLeave={() => cardHoverHandler(false)}
    >
      <CarouselContent className="ml-0">
        {carouselData.map((carousel) => (
          <CarouselItem
            key={carousel._id}
            className="aspect-video w-full px-2 pl-0"
          >
            <img
              alt="carousel"
              src={carousel.imageLinks[0]}
              className="aspect-video w-full rounded-3xl object-cover object-center"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselButtons hovered={cardHovered} />
    </Carousel>
  );
};

export default HeroArea;
