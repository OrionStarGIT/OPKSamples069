import React, { ReactElement } from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export function BaseContainer(
    props: ViewProps & { children: any; colors?: string[] }
): ReactElement {
    const { children, style, colors = ['#01277F', '#00A0F4'] } = props;
    return (
        <LinearGradient
            colors={colors}
            style={[StyleSheet.absoluteFillObject, style]}
        >
            {children}
        </LinearGradient>
    );
}
