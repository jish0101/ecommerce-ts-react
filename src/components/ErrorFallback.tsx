import H1 from './typography/H1';
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
    <div role="alert">
      <p>Something went wrong:</p>
      <H1>{error.message}</H1>
      <Button onClick={() => resetErrorBoundary()}>Refresh Page</Button>
    </div>
  );
};

export default ErrorFallBack;
