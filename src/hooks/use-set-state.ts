import { useMemo, useState, useCallback } from 'react';

import { isEqual } from 'src/utils/helper';

// ----------------------------------------------------------------------

export function useSetState<T extends Record<string, any>>(initialState: T) {
  const [state, setState] = useState<T>(initialState);

  const canReset = !isEqual(state, initialState);

  const updateState = useCallback((update: Partial<T>) => {
    setState((prev) => ({ ...prev, ...update }));
  }, []);

  const setField = useCallback(
    <K extends keyof T>(name: K, value: T[K]) => {
      updateState({ [name]: value } as unknown as Partial<T>);
    },
    [updateState]
  );

  const onResetState = useCallback(() => {
    setState(initialState);
  }, [initialState]);

  return useMemo(
    () => ({
      state,
      setState: updateState,
      setField,
      onResetState,
      canReset,
    }),
    [state, updateState, setField, onResetState, canReset]
  );
}
