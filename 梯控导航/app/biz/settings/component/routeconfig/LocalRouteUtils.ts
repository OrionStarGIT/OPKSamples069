import { AsyncStorage } from 'react-native';
import { AndroidSettings } from 'orionos-eve-core';

const TAG = 'disinfection-LocalRouteUtils';

export class LocalRouteUtils {
    private static readonly KEY_LOCAL_ROUTER_DATA = 'disinfection_key_local_router_data';
    private static readonly KEY_LOCAL_ELEVATOR_ROUTER_DATA = 'disinfection_key_local_elevator_router_data';
    private static readonly KEY_IS_USE_LOCAL_ROUTER = 'disinfection_key_is_use_local_router';
    private static readonly KEY_LOCAL_ROUTER_NUM = 'disinfection_key_local_router_num';
    private static readonly KEY_LOCAL_ELEVATOR_ROUTER_NUM = 'disinfection_key_local_elevator_router_num';


    // 设置消毒路线
    public static async saveRouteData(mapName: string, routeList: any) {
        let data = JSON.stringify(routeList);
        console.log(TAG, 'saveRouteData info:', data);

        await AsyncStorage.setItem(
            this.KEY_LOCAL_ROUTER_DATA + '_' + mapName,
            data
        );
    }

    //设置梯控消毒路线
    public static async saveElevatorRouteData(routeList: any) {
        let data = JSON.stringify(routeList);
        console.log(TAG, 'saveElevatorRouteData info:', data);

        await AsyncStorage.setItem(
            this.KEY_LOCAL_ELEVATOR_ROUTER_DATA,
            data
        );
    }
    
    //获取梯控消毒路线
    public static async getElevatorRouterData() {
        let result = await AsyncStorage.getItem(
            this.KEY_LOCAL_ELEVATOR_ROUTER_DATA
        );
        console.log(TAG, 'ElevatorRouter:', result);
        return result;
    }


    public static async getRouterData(mapName: string) {
        let result = await AsyncStorage.getItem(
            this.KEY_LOCAL_ROUTER_DATA + '_' + mapName
        );
        console.log(TAG, 'router:', result);
        return result;
    }

    public static setIsUseLocalRoute(use: boolean) {
        console.log(TAG, 'setIsUseLocalRoute:', use);
        AndroidSettings.putInt(this.KEY_IS_USE_LOCAL_ROUTER, use ? 1 : 0);
    }

    public static getIsUseLocalRoute(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            AndroidSettings.getIntByDefault(this.KEY_IS_USE_LOCAL_ROUTER, 0)
                .then(value => {
                    console.log(TAG, 'getIsUseLocalRoute:', value);
                    resolve(value === 1);
                })
                .catch(reason => {
                    reject(reason);
                });
        });
    }

    //使用中路线
    public static async saveRouteNum(mapName: string, index: number) {
        let num = index+ '';
        console.log(TAG, 'saveRouteNum mapName:', mapName,"num",num);
        await AsyncStorage.setItem(
            this.KEY_LOCAL_ROUTER_NUM + '_' + mapName,
            num
        );
    }

    //梯控使用中路线
    public static async saveElevatorRouteNum(index: number) {
        let num = index+ '';
        console.log(TAG, 'saveElevatorRouteNum num :' + num);
        await AsyncStorage.setItem(
            this.KEY_LOCAL_ELEVATOR_ROUTER_NUM,
            num
        );
    }

    public static async getRouterNum(mapName: string) {
        let result = await AsyncStorage.getItem(
            this.KEY_LOCAL_ROUTER_NUM + '_' + mapName
        );
        console.log(TAG, 'getRouterNum mapName:', mapName,"num",result);
        return result;
    }

    public static async getElevatorRouterNum() {
        let result = await AsyncStorage.getItem(
            this.KEY_LOCAL_ELEVATOR_ROUTER_NUM
        );
        console.log(TAG, 'getElevatorRouterNum num: ' + result);
        return result;
    }

}
