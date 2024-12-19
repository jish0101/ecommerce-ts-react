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
    <div>
      {isLoading ? 'Loading...' : isError ? errorMessage : fallBackMessaage}
    </div>
  );
};

export default Fallback;
