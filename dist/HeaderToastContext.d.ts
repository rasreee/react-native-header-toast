import React from 'react';
import { INotificationContext } from './types';
export declare const HeaderToastContext: React.Context<INotificationContext | undefined>;
export declare function useHeaderToast(): INotificationContext;
