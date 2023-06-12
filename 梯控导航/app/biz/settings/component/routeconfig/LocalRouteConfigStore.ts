
import { action, observable } from 'mobx';
import { timeStore } from '../../../store/TimeStore';
import { ElevatorFloor } from '../../../manager/bean/ElevatorFloor';
import { ElevatorPose } from '../../../manager/bean/ElevatorPose';
import { FeatureConfig } from '../../../../base/config/FeatureConfig';

const TAG = 'LocalRouteConfigStore';

export class LocalRouteConfigStore {
    @observable
    private state = {
        currentMapName: '',
        mapLocationList: new Array<string>(),
        isUseLocalCruiseRoute: false,
        useRouteNum: 0, //使用中的路线 0代表路线1 1代表路线2 依次类推
        useElevatorRouteNum: 0, //使用中的梯控路线 0代表路线1 1代表路线2 依次类推
        selectLocationList: new Array<string[]>(),
        selectElevatorLocationList: new Array<ElevatorPose[]>(),
        elevatorFloorList: new Array<ElevatorFloor>()
    };

    public getElevatorFloorList(): ElevatorFloor[] {
        return this.state.elevatorFloorList;
    }

    public setElevatorFloorList(posiList: ElevatorFloor[]) {
        console.log(TAG, 'tikong' + '-----15');
        this.state.elevatorFloorList = posiList;
    }

    @action
    public setIsUseLocalCruiseRoute(isUse: boolean) {
        this.state.isUseLocalCruiseRoute = isUse;
    }

    public getIsUseLocalCruiseRoute(): boolean {
        return this.state.isUseLocalCruiseRoute;
    }

    @action
    public setCurrentMapName(mapName: string) {
        this.state.currentMapName = mapName;
    }

    public getCurrentMapName(): string {
        return this.state.currentMapName;
    }

    @action
    public setLstMapLocation(value: string[]) {
        this.state.mapLocationList = value;
    }

    public getLstMapLocation(): string[] {
        return this.state.mapLocationList;
    }

    @action
    public setSelectMapLocation(value: string[][]) {
        this.state.selectLocationList = value;
    }

    @action
    public setSelectElevatorLocation(value: ElevatorPose[][]) {
        this.state.selectElevatorLocationList = value;
    }

    @action
    public pushItemToSelectMap(value: string, index: number) {
        this.state.selectLocationList[index].push(value);
    }

    @action
    public pushElevatorItemToSelectMap(value: ElevatorPose, index: number) {
        this.state.selectElevatorLocationList[index].push(value);
    }

    public getSelectElevatorLocation(): ElevatorPose[][] {
        return this.state.selectElevatorLocationList;
    }

    public getSelectMapLocation(): string[][] {
        return this.state.selectLocationList;
    }

    @action
    public setUseRouteNum(value: number) {
        if (value !== this.state.useRouteNum) {
            //巡航路线调整。重置消毒进度
            timeStore.resetDisinfectTime();
        }

        this.state.useRouteNum = value;
    }

    @action
    public setUseElevatorRouteNum(value: number) {
        if (value !== this.state.useElevatorRouteNum) {
            //巡航路线调整。重置消毒进度
            timeStore.resetDisinfectTime();
        }

        this.state.useElevatorRouteNum = value;
    }

    public getUseRouteNum(): number {
        return this.state.useRouteNum;
    }


    public getUseElevatorRouteNum(): number {
        return this.state.useElevatorRouteNum;
    }

    /**
     * 按照模式返回选择路线编号
     * @returns 
     */
    public getUseRouteNumByMode(): number {
        if(FeatureConfig.isElevatorControlEnabled()){
            return this.getUseElevatorRouteNum();
        }else{
            return this.getUseRouteNum();
        }
    }

}

export const localRouteConfigStore = new LocalRouteConfigStore();
