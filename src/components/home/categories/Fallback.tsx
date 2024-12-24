import H4 from '@/components/typography/H4';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  isError: boolean;
  isLoading: boolean;
  errorMessage?: string;
  fallBackMessaage?: string;
};

const Fallback = ({
  isLoading,
  isError,
  fallBackMessaage = 'No data found',
  errorMessage = 'Server error'
}: Props) => {
  return (
    <div className="flex items-center gap-4">
      {isLoading ? (
        <>
          <H4 className="hidden lg:block">Filter by category</H4>
          <Skeleton className="h-8 w-[100px]" />
          <Skeleton className="h-8 w-[100px]" />
          <Skeleton className="h-8 w-[100px]" />
        </>
      ) : isError ? (
        errorMessage
      ) : (
        fallBackMessaage
      )}
    </div>
  );
};

export default Fallback;
