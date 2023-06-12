import { BaseViewModel, ComponentErrorConst, ComponentEvent, ComponentResultConst, ComponentStatusConst, NavigationElevatorParam, emojiPlayerModel } from 'orionos-eve-core';
import { demoModel } from './DemoModel';
import { ElevatorPose } from '../biz/manager/bean/ElevatorPose';
import { localRouteConfigStore } from '../biz/settings/component/routeconfig/LocalRouteConfigStore';
import { LocalRouteUtils } from '../biz/settings/component/routeconfig/LocalRouteUtils';

const TAG = 'DemoViewModel';

/**
 * 业务逻辑
 */
export class DemoViewModel extends BaseViewModel {


    /**
     * 临时变量，记录当前路线最后一个元素
     */
    private lastSelectPoint: string = '';
    // private route: Route;
    private navigator: any;
    private nav_flag = false;
    public constructor(props: any) {
        //super参数为ViewModel与Trigger相互通信的标识，必须保证与Trigger的一致
        super('Disinfection');
        console.log(TAG,'constructor index11111111111111111');
        this.navigator = props.navigation;
        emojiPlayerModel.setShow(false);
        let params = this.navigator.state.params;
        // let index = params.index;
        // let route = params.route;

        // console.log(TAG,'constructor index: ' + index);
        // console.log(TAG,'constructor route: ' + route);

        // this.route = new Route(route, index);
    }

    public onStart() {

    }

    public onStop() {

    }

    public exit() {
        //发送消息到Trigger中，eventId为消息id, data为携带的数据
        this._apiTrigger(1001, '');
    }

    public showSpeechText(text: string) {
        console.log('DemoVoice : set ' + text);
        demoModel.setInfoText(text);
    }

    /**
     * 获取导航参数
     */
    public getNavigationElevatorParams(): NavigationElevatorParam {
        console.log('设置true--------------------set 6' + demoModel.getIndex() + '      ' + demoModel.getPosName());
        return new NavigationElevatorParam (
            demoModel.getIndex() + '',
            demoModel.getPosName()
        );
    }

    /**
     * 导航状态处理
     * @param event
     */
    public handleNaviStatus = (event?: ComponentEvent): boolean => {
        console.log(TAG, 'On navigation status update : ' + JSON.stringify(event));
        if (!(event && event.status)) {
            return false;
        }

        let subType = this.getEventSubType(event);
        switch (event.status) {
            case ComponentStatusConst.STATUS_NAVIGATION_AVOID_IMMEDIATELY:
                // this.reportInvalidEvent(DeliveryInvalidEvent.EVENT_TYPE_AVOID_START, subType);
                return true;

            case ComponentStatusConst.STATUS_START_NAVIGATION:
                // DanceOperation.playLightEffect(LIGHT_EFFECT_TYPE.LIGHT_EFFECT_NAVI_BREATH);
                // this.state.setState(State.CRUISING);
                return true;

            case ComponentStatusConst.STATUS_NAVIGATION_AVOID:
                // if (settingStore.getIsOpenDemoSwitch) {
                //     return true;
                // }
                //梯控导航，不处理传统的避障超时
                //this.handleAvoidingEvent(event, subType);
                return true;

            case ComponentStatusConst.STATUS_NAVIGATION_AVOID_START:
                // if (settingStore.getIsOpenDemoSwitch) {
                //     return true;
                // }
                // this.handleAvoidStartEvent();
                return true;

            case ComponentStatusConst.STATUS_NAVIGATION_AVOID_END:
                // if (settingStore.getIsOpenDemoSwitch) {
                //     return true;
                // }
                // this.handleAvoidEndEvent(event, subType);
                return true;

            case ComponentErrorConst.ERROR_NAVIGATION_ALREADY_IN_DESTINATION:
                // this.waitInPlace();
                return true;

            case ComponentStatusConst.STATUS_OBSTACLES_AVOID:
                // this.handleObstaclesEvent(event, subType);
                return true;

            case 32750004:
                //进电梯，到达电梯门
                // this.handleArriveElevatorDoor();
                return true;
            
            case 32750005:
                //进电梯，到达电梯中心，开始转向
                // this.handleArriveElevatorCenterAndStartTurn();
                return  true;
            case 32750023:
                //进电梯，到达电梯中心，转向完成    
                return true;
            case 32750008:
                //出电梯，到达电梯门
                // this.handleExitElevatorDoor();
                return true;
            
            case 32750026:
                //出电梯，离开电梯中心
                // this.handleLeaveElevatorCenter();
                return true;
            
            case 32750003:
                //进电梯，从电梯口去电梯中心
                // this.handleEnterElevator();
                return true;    

            default:
                return false;
        }
    };


    private getEventSubType(event: ComponentEvent) {
        let eventSubType = 0;
        if (event.extraData) {
            try {
                let extraData = JSON.parse(event.extraData);
                if (extraData.code) {
                    eventSubType = extraData.code;
                    console.log(TAG, ' onStatusUpdate code: ' + eventSubType);
                }
            } catch (e) {
                console.log(TAG, e);
            }
        }
        return eventSubType;
    }

        /**
     * 导航结束事件处理
     * @param event
     */
        public handleNaviFinish = (event?: ComponentEvent): boolean => {
            console.log(TAG, 'On navigation finish : ' + JSON.stringify(event));
            if (!(event && event.status)) {
                return false;
            }
    
            // DanceOperation.playLightEffect(LIGHT_EFFECT_TYPE.LIGHT_EFFECT_BLUE_LIGHT);
    
            let subType = this.getEventSubType(event);
            switch (event.status) {
                case ComponentResultConst.RESULT_NAVIGATION_ARRIVED:
                    // this.handleNaviArrivedEvent(event);
                    return true;
    
                case ComponentErrorConst.ERROR_NAVIGATION_ALREADY_IN_DESTINATION:
                    // this.handleNaviArrivedEvent(event, false);
                    return true;
    
                case ComponentErrorConst.ERROR_PARAMS_PLACE_NAME_INVALID:
                case ComponentErrorConst.ERROR_DESTINATION_NOT_EXIST:
                case ComponentErrorConst.ERROR_DESTINATION_CAN_NOT_ARRIVE: //navigation moving time out
                case ComponentResultConst.RESULT_NAVIGATION_FAILURE:
                case ComponentErrorConst.ERROR_NAVIGATION_AVOID_TIMEOUT:
                case -32660015: //enter elevator failed    
                    // this.reportInvalidEvent(DeliveryInvalidEvent.EVENT_TYPE_DESTINATION_UNREACHABLE, subType);
                    // this.waitInPlace();
                    return true;
    
                case ComponentErrorConst.ERROR_NAVIGATION_GLOBAL_PATH_FAILED:
                    // this.reportInvalidEvent(DeliveryInvalidEvent.EVENT_TYPE_DESTINATION_UNREACHABLE,
                    //     subType, I18n.t('ttsNavigationGlobalPathFailedPleaseEditMap'));
                    // this.showNaviError(subType);
                    return true;
    
                case ComponentErrorConst.ERROR_NAVIGATION_RESET_ESTIMATE_FAIL:
                case ComponentErrorConst.ERROR_REQUEST_RES_BUSY:
                case ComponentErrorConst.ERROR_REQUEST_RES_FAILED:
                    // this.showNaviError(subType);
                    return true;
    
                case ComponentErrorConst.ERROR_NAVIGATION_OUT_MAP:
                    // this.reportInvalidEvent(DeliveryInvalidEvent.EVENT_TYPE_OUT_MAP, subType, I18n.t('ttsNavigationOutMap'));
                    // this.showNaviError(subType, true);
                    return true;
    
                case ComponentErrorConst.ERROR_NOT_ESTIMATE:
                    // this.handleNotEstimateEvent(subType);
                    return true;
    
                case ComponentErrorConst.ERROR_MULTI_ROBOT_WAITING_TIMEOUT:
                    // this.reportInvalidEvent(DeliveryInvalidEvent.EVENT_TYPE_MULTI_ROBOT_WAIT_TIMEOUT, subType, I18n.t('nav_waitTimeout_tts'));
                    // this.showNaviError(subType, false, true);
                    return true;
    
                case ComponentErrorConst.ERROR_MULTIPLE_MODE_ERROR:
                    // this.reportInvalidEvent(DeliveryInvalidEvent.EVENT_TYPE_MULTI_ROBOT_ERROR, subType, I18n.t('nav_multiRobotError_tts'));
                    // this.showNaviError(subType, false, false, true);
                    return true;
    
                case ComponentErrorConst.ERROR_WHEEL_OVER_CURRENT_RUN_OUT:
                    // this.handleRobotWheelError(subType);
                    return true;
                
                case -32660021:
                    //梯控多楼层导航，地图错误
                    // this.showNaviError(NavErrorConst.NAVI_ERROR_ELEVATOR_MAP_RONG);    
                    return true;    
                default:
                    // this.showNaviError(subType);
                    return false;
            }
        };

    /**
     *  添加点到选择消毒路线
     * @param elevatorPosi
     */
    public pushElevatorPointToSelectMap(elevatorPosi: ElevatorPose,index: number): void {
        this.clearAllElevatorSelect(index);
        let poseName = elevatorPosi.poseName;
        let floorIndex = elevatorPosi.floorIndex;
        console.log(
            TAG,
            'select selectMapLocation ' +
                localRouteConfigStore.getSelectElevatorLocation()[index].toString()
                + '         ' + 
                JSON.stringify(elevatorPosi) + '------------' + floorIndex + '=============' + poseName

        );
        
        if (this.lastSelectPoint !== poseName) {
            localRouteConfigStore.pushElevatorItemToSelectMap(elevatorPosi,index);
            this.lastSelectPoint = poseName;

            LocalRouteUtils.saveElevatorRouteData(localRouteConfigStore.getSelectElevatorLocation());
            demoModel.setPoints(poseName, elevatorPosi.floorIndex);
        }

    }

    /**
     * 清除当前梯控消毒路线
     */
    public clearAllElevatorSelect(index: number): void {
    
        console.log(TAG, 'clearAllElevatorSelect');
        
        if(localRouteConfigStore.getSelectElevatorLocation() && localRouteConfigStore.getSelectElevatorLocation().length > 0){
            localRouteConfigStore.getSelectElevatorLocation()[index] = [];
        }
        this.lastSelectPoint = '';
        
        LocalRouteUtils.saveRouteData(
            localRouteConfigStore.getCurrentMapName(),
            localRouteConfigStore.getSelectMapLocation()
        );

        LocalRouteUtils.saveElevatorRouteData(localRouteConfigStore.getSelectElevatorLocation());
        demoModel.setPoints('', 0);
    } 
    
    public getStartFlag() {
        console.log('设置true--------------------set 4');
        return demoModel.getStartFlag();
    }

    public setStartFlag() {
        console.log('设置true--------------------set 1');
        if (demoModel.getIndex() !== 0 || demoModel.getPosName() !== '') {
            if (demoModel.getNavText() == '开始导航') {
                demoModel.setNavText('导航中...');
                demoModel.setStartFlag(true);
            } else {
                demoModel.setNavText('开始导航');
                demoModel.setStartFlag(false);
            }
        }

        // this.startDelivery();
    }

    public getNavText() {
        return demoModel.getNavText();
    } 

}
