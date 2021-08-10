import { ReactElement } from 'react';
export declare type NotificationPropOptions = {
    title: string;
    message?: string;
    textColor?: string;
    backgroundColor?: string;
    icon?: ReactElement<any>;
    autoClose?: boolean;
    onPress?: () => void;
};
export declare type NotificationProps = NotificationPropOptions & {
    textColor: string;
    backgroundColor: string;
};
export interface INotificationContext {
    show: (notification: NotificationPropOptions) => void;
    isShown: boolean;
    hide: () => void;
    onPress: () => void;
    setProps: (props: NotificationPropOptions) => void;
}
