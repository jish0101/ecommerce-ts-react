import { Skeleton } from "../ui/skeleton"

type Props = {
  isError: boolean;
  isLoading: boolean;
  errorMessage?: string;
  fallBackMessaage?: string;
};

const CardFallback = ({isError, isLoading, errorMessage, fallBackMessaage}: Props) => {
  return (
    <div className="flex flex-col space-y-3 w-[250px]">
      {isLoading ? (
        <>
          <Skeleton className="h-[250px] w-[250px] rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[175px]" />
          </div>
        </>
      ) : isError ? errorMessage : fallBackMessaage}
    </div>
  )
}

export default CardFallback