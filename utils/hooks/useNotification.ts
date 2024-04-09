import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export interface StateNotification {
  data: any
  ok: boolean;
  success: string | null;
  error: string | null;
}

const useNotificationHook = (initialState: StateNotification) => {
  const [stateNotification, setStateNotification] = useState(initialState);

  useEffect(() => {
    if (stateNotification.error) {
      toast.error(stateNotification.error);
      setStateNotification({ ...stateNotification, error: null });
    }
    if (stateNotification.success) {
      toast.success(stateNotification.success);
      setStateNotification({ ...stateNotification, success: null });
    }

  }, [stateNotification]);

  const updateState = (initialData: StateNotification) => setStateNotification(initialData);

  return { stateNotification, updateState };
};

export default useNotificationHook;