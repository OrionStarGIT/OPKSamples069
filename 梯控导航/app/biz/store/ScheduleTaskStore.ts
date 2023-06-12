import { action, observable } from 'mobx';
import { ScheduleTask } from '../settings/plan/ScheduleTask';
import { timeStore } from './TimeStore';
import { FeatureConfig } from '../../base/config/FeatureConfig';

const TAG = 'ScheduleTaskStore';

export class ScheduleTaskStore {
    @observable
    private scheduleList: ScheduleTask[] = [];

    private curScheduleTask: ScheduleTask | undefined;

    @observable
    private inScheduleTaskWorking: boolean = false; //是否在计划任务中

    @observable
    private inScheduleMode: boolean = true; //是否是计划任务模式

    /**
     * 初始化测试数据
     */

    public get isInScheduleMode(): boolean {
        return this.inScheduleMode;
    }

    @action
    public setInScheduleMode(mode: boolean) {
        this.inScheduleMode = mode;
    }

    public get isInScheduleTaskWorking(): boolean {
        return this.inScheduleTaskWorking;
    }

    public getScheduleList(): ScheduleTask[] {
        return this.scheduleList;
    }

    public get getCurScheduleTask(): ScheduleTask | undefined {
        return this.curScheduleTask;
    }

    public getCurDateStr(): string {
        let date = new Date();

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        return year + '-' + month + '-' + day;
    }

    /**
     * 当前计划任务时长。单位：s
     */
    public get curScheduleTaskTime(): number {
        let value = 0;

        if (this.curScheduleTask) {
            let startTime = Date.parse(
                this.getCurDateStr() + ' ' + this.curScheduleTask.startTime
            );
            let endTime = Date.parse(
                this.getCurDateStr() + ' ' + this.curScheduleTask.endTIme
            );

            value = (endTime - startTime) / 1000;
        }

        return value;
    }

    @action
    public updateDisinfectTime() {

        let datetemp = new Date();
        let datestr = datetemp.toLocaleString('en-US', {
            timeZone: FeatureConfig.getTimeZone()
        });

        let date = new Date(datestr);
        
        let curTime = date.getTime();

        if (this.curScheduleTask) {
            let startTime = Date.parse(
                this.getCurDateStr() + ' ' + this.curScheduleTask.startTime
            );

            let time = (curTime - startTime) / 1000;
            console.log(TAG, 'updateDisinfectTime: ' + time);
            timeStore.setDisinfectFinishTime(time);
        }
    }

    @action
    public setScheduleList(list: ScheduleTask[]) {
        this.scheduleList = list;
    }

    public setCurScheduleTask(task: ScheduleTask | undefined) {
        this.curScheduleTask = task;
    }

    @action
    public setInScheduleTaskWorking(flag: boolean) {
        this.inScheduleTaskWorking = flag;
    }

    public clearCurScheduleTask() {
        this.curScheduleTask = undefined;
        this.inScheduleTaskWorking = false;
    }

    /**
     * 当前计划任务是否是定点消毒
     */
    public isCurScheduleTaskPointDisinfect(): boolean {
        if (this.curScheduleTask && this.curScheduleTask._isPointDisinfect) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 是否在计划任务启动时间段（距离启动任务1min中之内）
     */
    public isInScheduleTaskStartPeriod(): boolean {
        let result = false;
        let date = new Date();
        let curTime = date.getTime();

        if (this.curScheduleTask) {
            let startTime = Date.parse(
                this.getCurDateStr() + ' ' + this.curScheduleTask.startTime
            );

            let timeDiff = curTime - startTime;

            if (timeDiff <= 60 * 1000) {
                result = true;
            }
        }

        return result;
    }
}

export const scheduleTaskStore = new ScheduleTaskStore();
