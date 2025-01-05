import { HomePage } from '@/types/home';
import Loader from '@/components/Loader';
import useGetQuery from '@/hooks/useGetQueryPublic';
import HomeCarousel from '@/components/home/HomeCarousel';
import { CreateResponse } from '@/types/api';
import { useRef } from 'react';

const Home = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isLoading, data } = useGetQuery<CreateResponse<HomePage>>({
    queryKey: 'home',
    endpoint: '/api/home/get'
  });

  function handleScroll() {
    if (!ref.current) return;

    ref.current.scrollIntoView({ behavior: 'smooth' });
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!data || !data.data) {
    throw new Error('Server error occurred. Please try again later.');
  }

  return (
    <div className="min-h-[100vh] space-y-8">
      <HomeCarousel
        handleScroll={handleScroll}
        carouselData={data.data.heroCarousel}
      />

      {/* <div ref={ref} className="flex items-center justify-center"></div> */}
    </div>
  );
};

export default Home;
