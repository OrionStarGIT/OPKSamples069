import * as React from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewProps
} from 'react-native';
import { localRouteConfigStore } from './LocalRouteConfigStore';
import { ImageUtils } from '../../../../utils/ImageUtils';
import { ElevatorPose } from '../../../manager/bean/ElevatorPose';

const Display = require('react-native-display').default;
const images = [
    require('../../../../../img/localroute/edit_map0.png'),
    require('../../../../../img/localroute/edit_map1.png'),
    require('../../../../../img/localroute/edit_map2.png'),
    require('../../../../../img/localroute/edit_map3.png'),
    require('../../../../../img/localroute/edit_map4.png')
];

interface CurSolicitElevatorRouteListViewProps extends ViewProps {
    onItemClick?: () => void;
    routNum: number;
}

/**
 * 梯控选择路线列表
 */
export class CurSolicitElevatorRouteListView extends React.Component<
    CurSolicitElevatorRouteListViewProps
> {
    public constructor(props: CurSolicitElevatorRouteListViewProps) {
        super(props);
    }

    public render(): React.ReactNode {
        return (
            <View style={{ width: '100%', minHeight: 75 }}>
                <FlatList
                    style={{ width: '100%' }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={localRouteConfigStore.getSelectElevatorLocation()[this.props.routNum]}
                    renderItem={({ item, index }): any => {
                        return this.renderItem2(item, index);
                    }}
                    keyExtractor={(item, index) => String(index)}
                />
            </View>
        );
    }

    private renderItem2 = (item: ElevatorPose, index: number): React.ReactChild => {
        
        let pos = ImageUtils.getImageURIByName(item.poseName);
        let posiNameShow = item.poseName + '-' + item.floorAlias;

        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-start'
                }}
            >
                <Display enable={index !== 0}>
                    <Image
                        style={{
                            width: 15,
                            height: 20,
                            marginTop: 15,
                            marginLeft: 2
                        }}
                        source={require('../../../../../img/localroute/map_next_arrow.png')}
                    />
                </Display>

                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        this.props.onItemClick && this.props.onItemClick();
                    }}
                    style={{
                        marginLeft: 8,
                        marginBottom: 8,
                        marginTop: 10,
                        justifyContent: 'center'
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <Image
                            style={{ width: 30, height: 30, marginBottom: 7 }}
                            source={images[pos]}
                        />
                        <Text
                            style={{
                                color: 'rgba(255,255,255,0.50);',
                                fontSize: 8,
                                lineHeight: 12,
                                fontWeight: '400',
                                textAlign: 'center',
                                maxWidth: 40
                            }}
                            numberOfLines={2}
                            ellipsizeMode={'tail'}
                        >
                            {posiNameShow}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };
}
