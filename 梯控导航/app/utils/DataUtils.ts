import { AsyncStorage } from 'react-native';
import { timeStore } from '../biz/store/TimeStore';
// import { DisinfectManager } from '../biz/manager/DisinfectManager';
// import { disinfectStore } from '../biz/store/DisinfectStore';

const KEY_DISINFECT_TIME = 'key_disinfect_time';

const TAG = 'Disinfect_DataUtils';

export class DataUtils {
    /**
     * 保存消毒时间
     */
    public static async saveDisinFinishTime(time: number) {
        try {
            await AsyncStorage.setItem(KEY_DISINFECT_TIME, time.toString());
            console.log(TAG, ' _save success: ' + time);
        } catch (error) {
            console.log(TAG, ' _save error: ' + error.message);
        }
    }

    /**
     * 加载数据
     */
    public static initData() {
        //加载已消毒时间
        AsyncStorage.getItem(KEY_DISINFECT_TIME).then(value => {
            console.log(TAG, 'initData KEY_DISINFECT_TIME: ' + value);

            if (value) {
                let time = parseInt(value);
                if (time && time > 0) {
                    timeStore.setDisinfectFinishTime(time);
                }
            }
        });

        //加载雾化器档位
        // let rank = DisinfectManager.getAtomizerRank();
        // console.log(TAG, 'initData Atomizer rank: ' + rank);
        // disinfectStore.setAtomizerRank(rank);

    }
}
