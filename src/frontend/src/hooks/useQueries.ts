// This file is intentionally minimal as the backend has no methods.
// All search functionality is handled client-side via DuckDuckGo API.

import { useActor } from './useActor';

// Placeholder for future backend queries if needed
export function useBackendQueries() {
  const { actor, isFetching } = useActor();
  
  return {
    actor,
    isFetching,
  };
}
