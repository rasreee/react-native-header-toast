import React, {useContext} from 'react';
import {INotificationContext} from './types';

export const HeaderToastContext = React.createContext<
  INotificationContext | undefined
>(undefined);

export function useHeaderToast() {
  const context = useContext(HeaderToastContext);
  if (!context) {
    throw new Error(
      'Called useNotification outside of HeaderToastContext.',
    );
  }
  return context;
}
