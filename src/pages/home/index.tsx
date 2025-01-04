import { HomePage } from '@/types/home';
import Loader from '@/components/Loader';
import useGetQuery from '@/hooks/useGetQueryPublic';
import HomeCarousel from '@/components/home/HomeCarousel';
import { CreateResponse } from '@/types/api';

const Home = () => {
  const { isLoading, data } = useGetQuery<CreateResponse<HomePage>>({
    queryKey: 'home',
    endpoint: '/api/home/get'
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!data || !data.data) {
    throw new Error('Server error occurred. Please try again later.');
  }

  return (
    <div className="h-[100vh] space-y-8 py-12">
      <HomeCarousel carouselData={data.data.heroCarousel} />
    </div>
  );
};

export default Home;
