import { DeviceEventEmitter, EmitterSubscription } from 'react-native';
import { CommandListener, RobotApi } from 'orionos-eve-core';
import { localRouteConfigStore } from './LocalRouteConfigStore';
import { LocalRouteUtils } from './LocalRouteUtils';
import { PlaceManager } from '../../../manager/PlaceManager';
import { FeatureConfig } from '../../../../base/config/FeatureConfig';
import { ElevatorPose } from '../../../../biz/manager/bean/ElevatorPose';
import { ElevatorFloor } from '../../../../biz/manager/bean/ElevatorFloor';

const TAG = 'LocalRouteManager';

export class LocalRouteManager {
    
    private static sInstance: LocalRouteManager = new LocalRouteManager();
    private static elevatorPlaceListLoadListener?: EmitterSubscription;

    private constructor() {}

    public static getInstance(): LocalRouteManager {
        return this.sInstance;
    }

    public init() {
        console.log(TAG, 'tikong' + '-----1');
        setTimeout(() => {
            PlaceManager.initMapList();
        }, 500);

        setTimeout(() => {
            this.initCurrentRouterData();
        }, 1500);

        LocalRouteUtils.getIsUseLocalRoute().then(isUseLocalRoute => {
            console.log(TAG, 'setIsUseLocalCruiseRoute : ' + isUseLocalRoute);
            localRouteConfigStore.setIsUseLocalCruiseRoute(isUseLocalRoute);
        });

        LocalRouteManager.elevatorPlaceListLoadListener = DeviceEventEmitter.addListener(PlaceManager.EVENT_LOAD_ELEVATOR_PLACE_LIST, (events) => {
            console.log(TAG, 'receive event load elevator place list');
            this.initElevatorRouterData();
            LocalRouteManager.elevatorPlaceListLoadListener?.remove();
        });
    }


    private initCurrentRouterData(){

        if(FeatureConfig.isElevatorControlEnabled()){
            //this.initElevatorRouterData();
        }else{
            this.getCurrentMapName();
        }
    }

    /**
     * 初始化梯控数据
     */
    private initElevatorRouterData(){

        this.getElevatorRouterNum();
        this.getCurrentUseElevatorSelectList();

    }


    private getCurrentMapName() {
        let action = new CommandListener();
        action.addListener(CommandListener.EVENT_RESULT, (msg: any) => {
            console.log(TAG, 'getMapName : ' + JSON.stringify(msg));
            if (msg && typeof msg !== 'undefined') {
                if (msg) {
                    let code = msg.result;
                    let mapName: string = msg.message;
                    if (
                        code == 1 &&
                        mapName &&
                        typeof mapName !== 'undefined' &&
                        mapName.length > 0
                    ) {
                        localRouteConfigStore.setCurrentMapName(mapName);
                        this.getCurrentUseSelectList(mapName);
                        this.getRouterNum();
                        return;
                    }
                }
            } else {
                console.log(TAG, 'current map is not exits');
            }
        });
        RobotApi.getMapName(action.getId());
    }

    /**
     * 获取当前的消毒路线
     */
    private async getCurrentUseSelectList(currentMap: string) {
        let result = await LocalRouteUtils.getRouterData(currentMap);
        console.log(TAG, 'getCurrentUseSelectList1111 result = ' + result);
        if (result) {
            try {
                let selectMapLocation = JSON.parse(result);
                localRouteConfigStore.setSelectMapLocation(selectMapLocation);
                this.checkMapList();
            } catch (error) {
                console.log(TAG, 'get current use router data error~');
            }
        }else{
            let selectMapLocation = [ [],[],[],[],[] ];
            localRouteConfigStore.setSelectMapLocation(selectMapLocation);
        }
    }

    /**
     * 获取当前的梯控消毒路线
     */
     private async getCurrentUseElevatorSelectList() {
        let result = await LocalRouteUtils.getElevatorRouterData();
        console.log(TAG, 'getCurrentUseElevatorSelectList result = ' + result);
        if (result) {
            try {
                let selectMapLocation = JSON.parse(result);
                localRouteConfigStore.setSelectElevatorLocation(selectMapLocation);
                this.checkElevatorMapList();
            } catch (error) {
                console.log(TAG, 'get current use router data error~');
            }
        }else{
            let selectMapLocation = [ [],[],[],[],[] ];
            localRouteConfigStore.setSelectElevatorLocation(selectMapLocation);
        }
    }

    //检查梯控消毒路线有效性(如果路线点位不存在，则清空对应消毒路线)
    private checkElevatorMapList() {

        console.log(TAG,'checkElevatorMapList');

        try {
            let selectElevatorLocation: ElevatorPose[] = localRouteConfigStore.getSelectElevatorLocation()[localRouteConfigStore.getUseElevatorRouteNum()];         
            for (let index in selectElevatorLocation) {
                if (!this.isPositionInElevatorMapList(selectElevatorLocation[index])) {
                    console.log(TAG, 'checkElevatorMapList set selectlist null');
                    localRouteConfigStore.getSelectElevatorLocation()[localRouteConfigStore.getUseElevatorRouteNum()] = [];
                    break;
                }
            }


        } catch (e) {
            console.log(TAG, 'checkElevatorMapList', e);    
        }

    }


    /**
     * 跨梯点位是否存在
     * @param position 
     * @returns 
     */
    private isPositionInElevatorMapList(position: ElevatorPose): boolean {

        let tempFloorList: ElevatorFloor;
        let tempPositon: ElevatorPose;

        if(localRouteConfigStore.getElevatorFloorList() && localRouteConfigStore.getElevatorFloorList().length > 0){

            for(let i=0; i<localRouteConfigStore.getElevatorFloorList().length;i++){

                tempFloorList = localRouteConfigStore.getElevatorFloorList()[i];

                if(tempFloorList.poseList && tempFloorList.poseList.length > 0){
                    for(let j=0;j<tempFloorList.poseList?.length;j++){
                        
                        tempPositon = tempFloorList.poseList[j];
                        if(tempPositon.poseName === position.poseName && 
                            tempPositon.floorIndex === position.floorIndex 
                                && tempPositon.floorAlias === position.floorAlias){
                                    console.log(TAG, position.floorIndex + '_' + position.poseName + ' exist In MapList!');
                                    return true;
                        }
                    }
                }
            }

        }else{
            console.log(TAG, 'getElevatorFloorList is Empty');    
        }
        console.log(TAG, position.floorIndex + '_' + position.poseName + ' not exist In MapList!');
        return false;

    }



    //如果有选中点不再地图中 则需要重新选择
    private checkMapList() {
        try {
            let selectMapLocation: string[] = localRouteConfigStore.getSelectMapLocation()[localRouteConfigStore.getUseRouteNum()];
            let lstMapLocation: string[] = localRouteConfigStore.getLstMapLocation();
            for (let index in selectMapLocation) {
                if (lstMapLocation.indexOf(selectMapLocation[index]) === -1) {
                    console.log(TAG, 'checkMapList set selectlist null');
                    localRouteConfigStore.getSelectMapLocation()[localRouteConfigStore.getUseRouteNum()] = [];
                    break;
                }
            }
        } catch (e) {
            console.log(TAG, 'checkMapList', e);
        }
    }
    //获取选中路线
    private getRouterNum(){
        LocalRouteUtils.getRouterNum(localRouteConfigStore.getCurrentMapName()).then(localRoutelNum => {
            console.log(TAG, 'setIsUseLocalCruiseRoute : ' + localRoutelNum);
            try{
                if(localRoutelNum && localRoutelNum.length > 0){
                    localRouteConfigStore.setUseRouteNum(Number.parseInt(localRoutelNum));
                }
            }catch (e) {
            }
        });
    }

    //获取梯控选中路线
    private getElevatorRouterNum(){
        LocalRouteUtils.getElevatorRouterNum().then(localRoutelNum => {
            console.log(TAG, 'getElevatorRouterNum : ' + localRoutelNum);
            try{
                if(localRoutelNum && localRoutelNum.length > 0){
                    localRouteConfigStore.setUseElevatorRouteNum(Number.parseInt(localRoutelNum));
                }
            }catch (e) {
            }
        });
    }

}
