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
    <div className="grid place-content-center" role="alert">
      <p>Something went wrong</p>
      <H2>{error.message}</H2>
      <Button onClick={() => resetErrorBoundary()}>Refresh Page</Button>
    </div>
  );
};

export default ErrorFallBack;
