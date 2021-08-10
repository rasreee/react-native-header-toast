import React, { useContext } from 'react';
export const HeaderToastContext = React.createContext(undefined);
export function useHeaderToast() {
    const context = useContext(HeaderToastContext);
    if (!context) {
        throw new Error('Called useNotification outside of HeaderToastContext.');
    }
    return context;
}
