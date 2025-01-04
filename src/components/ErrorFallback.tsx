import P from './typography/P';
import H2 from './typography/H2';
import { Button } from './ui/button';
import { FallbackProps } from 'react-error-boundary';

type Details =
  | {
      reason: 'imperative-api';
      args: any[];
    }
  | {
      reason: 'keys';
      prev: any[] | undefined;
      next: any[] | undefined;
    };

export function errorResetHandler(details: Details) {
  console.log('details', details);
  window.location.reload();
}

const ErrorFallBack = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div>
      <div
        className={`flex h-[50px] items-center justify-between p-3 md:h-[70px]`}
      >
        <a href="/">
          <img
            src={'/logo.svg'}
            className="mx-2 w-12 md:mx-10"
            loading="eager"
          />
        </a>
      </div>
      <div
        className="grid min-h-[calc(100vh-100px)] place-content-center gap-4"
        role="alert"
      >
        <H2>Oops!!</H2>
        <P>{error.message}</P>
        <Button className="mx-auto w-fit" onClick={() => resetErrorBoundary()}>
          Refresh
        </Button>
      </div>
    </div>
  );
};

export default ErrorFallBack;
