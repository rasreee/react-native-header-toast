import React, { useCallback, useState, useMemo, useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { HeaderToastContext } from './HeaderToastContext';
import ToastContent from './ToastContent';
export const HeaderToastProvider = ({ children }) => {
    const [current, setNotification] = useState();
    const [animatedValue] = useState(new Animated.Value(0));
    const hideTimer = useRef();
    const handleSetProps = useCallback((props) => {
        const { title, textColor = 'black', backgroundColor = 'white', autoClose = true, ...rest } = props;
        setNotification({ title, textColor, backgroundColor, autoClose, ...rest });
        startAnimation();
    }, []);
    const handleHide = useCallback(() => {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start(() => {
            setNotification(undefined);
        });
    }, [animatedValue]);
    const startAnimation = useCallback(() => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 400,
            useNativeDriver: false,
        }).start(() => {
            hideTimer.current = window.setTimeout(() => {
                handleHide();
            }, 2000);
        });
    }, []);
    const handleShow = useCallback((props) => {
        if (!current) {
            handleSetProps(props);
            const shouldStartAnimation = props.autoClose === undefined ? true : props.autoClose;
            shouldStartAnimation && startAnimation();
        }
    }, [animatedValue, current, handleHide]);
    const handlePress = useCallback(() => {
        if (current) {
            if (current.onPress) {
                current.onPress();
            }
            setNotification(undefined);
            clearTimeout(hideTimer.current);
        }
    }, [current]);
    useEffect(() => {
        return () => {
            clearTimeout(hideTimer.current);
        };
    }, [current]);
    const content = useMemo(() => {
        if (current) {
            const { onPress, ...rest } = current;
            return (<Animated.View style={{
                    ...{
                        transform: [
                            {
                                translateY: animatedValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 50],
                                }),
                            },
                        ],
                        opacity: animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1],
                        }),
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                    },
                }}>
          <ToastContent {...rest} onPress={handlePress}/>
        </Animated.View>);
        }
    }, [current, animatedValue, handlePress]);
    const style = [styles.container];
    if (current) {
        style.push(styles.containerShown);
    }
    return (<HeaderToastContext.Provider value={{
            show: handleShow,
            isShown: Boolean(current),
            hide: handleHide,
            onPress: handlePress,
            setProps: handleSetProps,
        }}>
      <View style={style}>{content}</View>
      {children}
    </HeaderToastContext.Provider>);
};
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 0,
        zIndex: 1000,
    },
    containerShown: {
        height: 80,
    },
});
