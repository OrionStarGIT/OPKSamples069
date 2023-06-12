/*
 * Copyright (C) 2017 OrionStar Technology Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { action, observable } from 'mobx';
import { DataUtils } from '../../utils/DataUtils';
import I18ns from '../../source/res/I18ns';
import { scheduleTaskStore } from './ScheduleTaskStore';

const TAG = 'TimeStore';

export class TimeStore {
    @observable
    private state = {
        showEstimatedTime: false, //显示预计用时
        totalEstimatedTime: 0, //预计用时，分钟数
        disinfectFinishTime: 0 //消毒时间.单位: 秒
    };

    /**
     * 获取消毒完成时间
     */
    public get disinfectFinishTime() {
        return this.state.disinfectFinishTime;
    }

    @action
    public setDisinfectFinishTime(time: number) {
        this.state.disinfectFinishTime = time;
    }

    @action
    public increaseDisinfectTime() {
        this.state.disinfectFinishTime += 1;
        DataUtils.saveDisinFinishTime(this.state.disinfectFinishTime);
    }

    public get isShowEstimatedTime(): boolean {
        return this.state.showEstimatedTime;
    }

    @action
    public setShowEstimatedTime(show: boolean) {
        this.state.showEstimatedTime = show;
    }

    @action
    public setTotalEstimatedTime(time: number) {
        this.state.totalEstimatedTime = time;
    }

    public get totalEstimatedTime(): number {
        return this.state.totalEstimatedTime;
    }

    public get totalEstimatedTimeIsZero(): boolean {
        return this.state.totalEstimatedTime === 0;
    }

    /**
     * 获取预估消毒时间，second
     */
    public get totalEstimatedTimeSecond(): number {
        return this.state.totalEstimatedTime * 60;
    }

    /**
     * 消毒百分比进度
     */
    public get disinTimePercentage(): number {
        let value = 0;

        if (scheduleTaskStore.isInScheduleMode) {
            value = this.disinTimePercentageSchedule;
        } else {
            value = this.disinTimePercentageNormal;
        }

        return value;
    }

    public get disinTimePercentageNormal(): number {
        let value = 0;

        if (
            this.state.disinfectFinishTime &&
            this.state.disinfectFinishTime > 0
        ) {
            let disinfectTime = this.state.disinfectFinishTime;
            if (disinfectTime && disinfectTime > 0) {
                let totalEstimatedTimeSec = this.state.totalEstimatedTime * 60;
                value = Math.ceil(
                    (disinfectTime / totalEstimatedTimeSec) * 100
                );
            }
        }

        console.log(
            TAG,
            'this.state.disinfectFinishTime: ' + this.state.disinfectFinishTime
        );

        return value;
    }

    public getCurDateStr(): string {
        let date = new Date();

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        return year + '-' + month + '-' + day;
    }

    public get disinTimePercentageSchedule(): number {
        let value = 0;

        if (scheduleTaskStore.getCurScheduleTask) {
            let disinfectTime = this.state.disinfectFinishTime;
            if (disinfectTime && disinfectTime > 0) {
                let totalTimeSec = scheduleTaskStore.curScheduleTaskTime;
                value = Math.ceil((disinfectTime / totalTimeSec) * 100);
            }
        }

        console.log(
            TAG,
            'this.state.disinfectFinishTime: ' + this.state.disinfectFinishTime
        );

        return value;
    }

    /**
     * 消毒剩余时间显示
     */
    public get disinRemainingTimeShow(): string {
        let result = '';

        if (scheduleTaskStore.isInScheduleMode) {
            result = this.disinRemainingTimeShowSchedule;
        } else {
            result = this.disinRemainingTimeShowNormal;
        }

        return result;
    }

    public get disinRemainingTimeShowNormal(): string {
        let result = '';
        let disinfectTimeMin = Math.floor(this.state.disinfectFinishTime / 60);
        let disinRemainingTime =
            this.state.totalEstimatedTime - disinfectTimeMin;

        if (disinRemainingTime > 60) {
            //剩余时间大于1小时
            let hour = Math.floor(disinRemainingTime / 60);
            let minute = disinRemainingTime - hour * 60;
            result = hour + I18ns.hour + minute + I18ns.minute;
        } else {
            //剩余时间小于1小时
            result = disinRemainingTime + I18ns.minute;
        }
        return result;
    }

    /**
     * 消毒剩余时间-计划任务
     */
    public get disinRemainingTimeShowSchedule(): string {
        let result = '';
        
        let disinfectTimeMin = Math.floor(this.state.disinfectFinishTime / 60);
        let disinRemainingTime =
            Math.ceil(scheduleTaskStore.curScheduleTaskTime / 60) -
            disinfectTimeMin;

        if(disinRemainingTime < 0){
            disinRemainingTime = 0;
        }    

        if (disinRemainingTime > 60) {
            //剩余时间大于1小时
            let hour = Math.floor(disinRemainingTime / 60);
            let minute = disinRemainingTime - hour * 60;
            result = hour + I18ns.hour + minute + I18ns.minute;
        } else {
            //剩余时间小于1小时
            result = disinRemainingTime + I18ns.minute;
        }
        return result;
    }

    /**
     * 重置消毒时间
     */
    @action
    public resetDisinfectTime() {
        console.log(TAG, 'resetDisinfectTime');
        this.state.disinfectFinishTime = 0;
        DataUtils.saveDisinFinishTime(0);
    }
}

export const timeStore = new TimeStore();
