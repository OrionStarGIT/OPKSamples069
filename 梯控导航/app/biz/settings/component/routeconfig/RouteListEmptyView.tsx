import * as React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewProps
} from 'react-native';
import I18n from '../../../../source/res/I18n';

const styles = StyleSheet.create({
    container: {
        minHeight: 70,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

interface RouteListEmptyViewProps extends ViewProps {
    onClick: () => void;
}

export class RouteListEmptyView extends React.Component<
    RouteListEmptyViewProps
> {
    public constructor(props: RouteListEmptyViewProps) {
        super(props);
    }

    public render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => {
                        this.props.onClick();
                    }}
                >
                    <View
                        style={{
                            width: 28,
                            height: 28,
                            borderRadius: 14,
                            backgroundColor: 'rgba(255,255,255,0.10)',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 5
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: '400',
                                color: 'white'
                            }}
                        >
                            +
                        </Text>
                    </View>
                    <Text
                        style={{
                            fontSize: 11,
                            color: 'white',
                            opacity: 0.7,
                            fontWeight: '400'
                        }}
                    >
                        {I18n.t('emptyCruiseRouteBtnTip')}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
