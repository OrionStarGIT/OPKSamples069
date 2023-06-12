import * as React from 'react';
import { observer } from 'mobx-react';
import {
    Dimensions,
    FlatList,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewProps
} from 'react-native';
import { localRouteConfigStore } from './LocalRouteConfigStore';
import { ImageUtils } from '../../../../utils/ImageUtils';
import I18n from '../../../../source/res/I18n';
import { RouteListEmptyView } from './RouteListEmptyView';
import { BaseContainer } from '../../../../base/component/BaseContainerView';
import { ElevatorFloor } from '../../../manager/bean/ElevatorFloor';
import { ElevatorPose } from '../../../manager/bean/ElevatorPose';
import { CurSolicitElevatorRouteListView } from './CurSolicitElevatorRouteListView';
import { DemoViewModel } from '../../../../demo/DemoViewModel';

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height
    },
    clearView: {
        height: 26,
        paddingHorizontal: 6,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        backgroundColor: 'rgba(204,204,204,0.2)',
        borderRadius: 17
    },
    subTitleDesc: {
        color: 'white',
        fontSize: 11,
        opacity: 0.7,
        fontWeight: '400'
    }
});

const images = [
    require('../../../../../img/localroute/edit_map0.png'),
    require('../../../../../img/localroute/edit_map1.png'),
    require('../../../../../img/localroute/edit_map2.png'),
    require('../../../../../img/localroute/edit_map3.png'),
    require('../../../../../img/localroute/edit_map4.png')
];

const TAG = 'LocalElevatorSolicitRouteView';

interface LocalElevatorSolicitRouteViewProps extends ViewProps {
    index: number;
    visible: boolean;
    onBack: () => void;
    // viewModel: SettingsViewModel | undefined;
    viewModel: DemoViewModel | undefined;
}

/**
 * 梯控本地路线设置页面
 */
@observer
export class LocalElevatorSolicitRouteView extends React.Component<
    LocalElevatorSolicitRouteViewProps
> {
    public constructor(props: LocalElevatorSolicitRouteViewProps) {
        super(props);
        console.log(TAG, 'constructor');
    }

    public render(): React.ReactNode {
        console.log(TAG, 'render', this.props.index);
        return (
            <BaseContainer style={styles.container}>
                {this._localRouteConfigView()}
            </BaseContainer>
        );
    }

    private _localRouteConfigView(): React.ReactNode {
        let selectLength = 0;
        try {
            selectLength = localRouteConfigStore.getSelectElevatorLocation()[
                this.props.index
            ].length;
        } catch (e) {
            console.log('没有获取到梯控楼层与点位数据信息');
        }

        return (
            <View
                style={{
                    paddingHorizontal: 20,
                    marginTop: 17
                }}
            >
                <View style={{ width: '100%', minHeight: 75 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Text style={styles.subTitleDesc}>
                            {I18n.t('configLocalCruiseRoute')}
                        </Text>

                        <TouchableOpacity
                            style={styles.clearView}
                            onPress={() => {
                                this.props.viewModel &&
                                    this.props.viewModel.clearAllElevatorSelect(
                                        this.props.index
                                    );
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 11,
                                    color: '#FFFFFF',
                                    opacity: 0.5,
                                    fontWeight: '400'
                                }}
                            >
                                {I18n.t('clearRoute')}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {selectLength > 0 ? (
                        <CurSolicitElevatorRouteListView
                            routNum={this.props.index}
                        />
                    ) : (
                        <RouteListEmptyView onClick={() => {}} />
                    )}

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Text style={styles.subTitleDesc}>
                            {I18n.t('selectCruisePos')}
                        </Text>
                    </View>

                    <View style={{ width: '100%', minHeight: 70 }}>
                        <FlatList
                            style={{ width: '100%', height: 300 }}
                            horizontal={false}
                            showsHorizontalScrollIndicator={false}
                            data={localRouteConfigStore.getElevatorFloorList()}
                            renderItem={({ item, index }): any => {
                                return this.renderFloorItem(item, index);
                            }}
                            keyExtractor={(item, index) => String(index)}
                        />
                    </View>
                </View>

                <TouchableOpacity
                        onPress={(): void => {
                            this.props.viewModel&&this.props.viewModel.setStartFlag();
                        }}
                    >
                        <Text style={{
                            color: '#fff',
                            fontSize: 18
                        }}>
                        {this.props.viewModel&&this.props.viewModel.getNavText()}
                        </Text>
                    </TouchableOpacity>
            </View>
        );
    }

    private renderFloorItem = (
        item: ElevatorFloor,
        index: number
    ): React.ReactChild => {
        if (item.poseList !== undefined) {
            return (
                <View
                    style={{ flexDirection: 'row', justifyContent: 'center' }}
                >
                    <Text style={{ color: 'white', marginTop: 20 }}>
                        {item.floorAlias}
                    </Text>
                    <FlatList
                        style={{ width: '100%' }}
                        horizontal={true}
                        scrollEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        data={item.poseList}
                        renderItem={({ item, index }): any => {
                            return this.renderItem(item, index);
                        }}
                        keyExtractor={(item, index) => String(index)}
                    />
                </View>
            );
        } else {
            return <></>;
        }
    };

    private renderItem = (
        item: ElevatorPose,
        index: number
    ): React.ReactChild => {
        let posiName = item.poseName;

        let pos = ImageUtils.getImageURIByName(posiName);
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.viewModel &&
                        this.props.viewModel.pushElevatorPointToSelectMap(
                            item,
                            this.props.index
                        );
                }}
                style={{
                    margin: 11,
                    alignItems: 'center',
                    justifyContent: 'flex-start'
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
                        {posiName}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };
}
