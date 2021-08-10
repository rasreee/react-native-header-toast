import React from 'react';
interface Props {
    title: string;
    icon?: React.ReactElement<any>;
    message?: string;
    onPress: () => void;
    backgroundColor: string;
    textColor: string;
}
declare const ToastContent: ({ title, icon, message, onPress, backgroundColor, textColor, }: Props) => JSX.Element;
export default ToastContent;
