import { BaseComponent, triggerManager, BaseComponentProps, NlpPath, NavigationElevatorComponent } from 'orionos-eve-core';
import React from 'react';
import { observer } from 'mobx-react';
import { Text, View, StyleSheet} from 'react-native';
import { DemoViewModel } from './DemoViewModel';
import { DemoVoice } from './DemoVoice';
import { DemoTrigger } from './DemoTrigger';
import { demoModel } from './DemoModel';
import I18n from '../source/res/I18n';
import { LocalElevatorSolicitRouteView } from '../biz/settings/component/routeconfig/LocalElevatorSolicitRouteView';
import { localRouteConfigStore } from '../biz/settings/component/routeconfig/LocalRouteConfigStore';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f3eae8',
        // width: Dimensions.get( 'window').width,
        // height: Dimensions.get( 'window').height,
        width: 1200,
        height: 1920,
        opacity: 1
    },
    buttons: {
        width: 200,
        height: 30,
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 2.3,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    title: {
        fontSize: 8,
        color: 'white',
        marginTop: 7,
        marginBottom: 3,
        opacity: 0.7
    },
    itemTitle: {
        fontSize: 8,
        color: 'white',
        marginTop: 7,
        opacity: 0.7
    }
    
});

enum SettingType {
    LABEL,
    SWITCH,
    SLIDER
}

export enum SettingItem {
    SPEED,
    IMAGE_DURATION,
    TTS_INTERVAL,
    ADVERT_VOLUME,
    AUTO_GO_NEXT,
    STAY_TIME,
    WELCOME,
    FACE_SENSITIVITY,
    ROUTE,
    VERSION,
    FULLYAUTOMATICSTART,
    ATOMIZATION_GEAR
}

const data = [
    {
        title: I18n.t('labelCruiseRoute'),
        content: [
            {
                //巡逻路线配置
                id: SettingItem.ROUTE,
                type: SettingType.LABEL,
                label: I18n.t('labelCruiseRoute'),
                subLabel: I18n.t('subLabelCruiseRoute'),
                data: {
                    type: 'code',
                    tips: I18n.t('titlePleaseUseQrCodeGetRoute')
                }
            }
        ]
    },

];

//注册trigger跳转，必须添加，否则trigger无效
triggerManager.addTrigger(new DemoTrigger());

const TAG = 'SettingsScreen-DistributeFood';

/**
 * 功能UI界面
 */
@observer
export class DemoScreen extends BaseComponent<BaseComponentProps, DemoViewModel, DemoVoice> {

    private setRoutViewNum: number = 1;//当前编辑路线页面
    public viewModel: DemoViewModel;
    private autoStartCruiseMinutes: number | undefined;
    private isShowTimeFormat = false;
    /**
     * 开始消毒倒计时20s
     */
    private readonly DELIVERY_COUNTDOWN = 20;
    public constructor(props: BaseComponentProps) {
        super(props);
        this.viewModel = new DemoViewModel(props);
        let voice = new DemoVoice(this.viewModel);

        //关联ViewModel及Voice的生命周期到当前界面上
        this.setViewModel(this.viewModel);
        this.setVoice(voice);
    }

    public componentDidMount() {
        //重写界面的didMount，必须调用super
        super.componentDidMount();
    }
    

    public componentWillMount() {

    }

    public componentWillUnmount() {
        //重写界面的Unmount，必须调用super
        super.componentWillUnmount();
    }

    public render() {
        console.log('tikong'+'------end' + JSON.stringify(localRouteConfigStore.getElevatorFloorList()));
        //正常状态
        let startCruiseText = I18n.t('titleStartCruise');
        return (
            <View>
                <Text style={{ fontSize: 17, color: 'red' }}> {demoModel.getInfoText()}</Text>
                {/* {this.renderContent()} */}
                <LocalElevatorSolicitRouteView
                    index={this.setRoutViewNum}
                    visible={false}
                    viewModel={this.viewModel}
                    onBack={() => {
                        // this.setState({setLocalSolicitRouteVisible : false});
                        void(0);
                    }}
                />
                {   
                    (this.viewModel.getStartFlag() == true) ?
                        <NavigationElevatorComponent
                        param={this.viewModel&&this.viewModel.getNavigationElevatorParams()}
                        onStatusUpdate={this.viewModel&&this.viewModel.handleNaviStatus}
                        onFinish={this.viewModel&&this.viewModel.handleNaviFinish}
                    /> : <Text style={{width:1, color: 'red'}}>else</Text>
                }
            </View>
        );
    }

}
