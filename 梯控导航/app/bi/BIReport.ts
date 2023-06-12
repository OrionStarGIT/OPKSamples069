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

import { Reports } from 'orionos-eve-core';
import { v4 as uuid } from 'uuid';
import { ElevatorPose } from '../biz/manager/bean/ElevatorPose';

const TAG = 'ReportUtils';

export enum StartType {
    touchable = 1,
    voice = 2,
    countdown = 3,
    resume = 4
}

export enum DisinStartType {
    //     1- 到达点位开始雾化
    // 2 - 暂停(异常打断)后恢复-不生成新的 link_id
    // 3 - 定时开始
    nomalStart = 1, //常规开始雾化
    nomalVoiceStart = 2, //常规语音开始
    scheduleStart = 3, //定时开始
    resumeStart = 4 //暂停(异常打断)后恢复-不生成新的 link_id
}

export enum DisinEndType {
    // 1-人工结束
    // 2- 干烧
    // 3- 时间结束
    manualEnd = 1,
    dryEnd = 2,
    finishEnd = 3
}

/**
 * 设置修改后上报埋点
 */
export class OpkSettingsEvent {
    public readonly tableName = 'sc_restaurant_opk_setting';
    public ctime = Date.now();

    public type: string = '';
    public value: string = '';
    public opk_type: number = 3;

    public constructor(key: string, value: string = '') {
        this.type = key;
        this.value = value;
    }
}

/**
 * 开始消毒事件
 */
export class DisinfectStartEvent {
    public tableName: string = 'xd_robot_disinfection_start';

    //消毒id，同巡航id，一次消毒产生一个id，消毒结束后该id销毁;
    public disinfect_link_id: string = '';

    //开始方式
    public start_type: number = 1;

    //喷雾速率
    public spray_velocity: string = '';

    //行驶速度
    public speed: string = '';

    //消毒体积
    public volume: string = '';

    //预估消毒时长
    public duration: number = 0;

    //埋点时间
    public ctime: number = 0;
}

/**
 * 结束消毒事件
 */
export class DisinfectEndEvent {
    public tableName: string = 'xd_robot_disinfection_end';

    //消毒id，同巡航id，一次消毒产生一个id，消毒结束后该id销毁;
    public disinfect_link_id: string = '';

    //消毒时长
    public duration: number = 0;

    //消毒完成比例
    public finish_rate: string = '';

    //结束类型
    public end_type: number = 1;

    //埋点时间
    public ctime: number = 0;
}

/**
 * 干烧状态上报
 */
export class DisinfectDryStatusEvent {
    public tableName: string = 'xd_robot_disinfection_event';

    //消毒id，同巡航id，一次消毒产生一个id，消毒结束后该id销毁;
    public disinfect_link_id: string = '';

    //埋点时间
    public ctime: number = 0;
}

/**
 * 消毒进度上报
 */
export class DisinfectProgressEvent {
    public tableName: string = 'xd_robot_disinfection_progress';

    //消毒id，同巡航id，一次消毒产生一个id，消毒结束后该id销毁;
    public disinfect_link_id: string = '';

    //消毒进度，报百分比的数值
    public progress: string = '';

    //埋点时间
    public ctime: number = 0;
}

/**
 * 开始小食分发
 *小食分发开始的时候进行上报
 */
export class DeliveryStartEvent {
    public tableName?: string = 'sc_restaurant_snack_start';
    //	开始方式：1-点击开始
    public start_type?: number = 1;
    //	小食分发ID，一次小食分发任务生成一个唯一ID
    public snack_link_id?: string = '';
    //	小食分发路线点位数
    public snack_point_num: number = 0;
    //	小食分发路线点位详情；json
    public snack_point_names: string = '';
    //	小食分发速度:m/s
    public snack_speed: number = 0;
    //	小食分发点位停留时间：秒
    public snack_point_dwell_seconds: number = 0;
    //	小食分发语音播放类型：1、无，2、播放广告资源，3，播放TTS
    public snack_ad_type: number = 0;
    //	小食分发广告设置，配置JSON
    public snack_ad_setting: string = '';
    //	小食分发语音播放时间，隔多久播放
    public snack_ad_cycle_seconds: number = 0;
    //	唤醒ID，唤醒期间不变
    public wakeup_id?: string = '';
    //	TTS播放信息
    public tts_info?: string = '';
    // 是否自动去下一个点
    public start_mode: number = 1;
    //	埋点产生时的时间戳，毫秒
    public ctime?: number = 0;
}

/**
 * 小食分发点位到达
 * 小食分发到达点位进行上报
 */
export class DeliveryPointArriveEvent {
    public tableName?: string = 'sc_restaurant_snack_point_arrive';

    //	分发id，每次分发产生id，分发过程不变
    public snack_link_id?: string = '';
    //	到达点位名称
    public snack_point_name: string = '';
    //	唤醒ID，唤醒期间不变
    public wakeup_id?: string = '';
    //	TTS播放信息
    public tts_info?: string = '';
    //	埋点产生时的时间戳
    public ctime?: number = 0;
}

/**
 * 小食分发行为动作
 * 小食分发产生行为时上报
 */
export class DeliveryActionEvent {
    public tableName?: string = 'sc_restaurant_snack_action';
    //	分发id
    public snack_link_id?: string = '';
    //	唤醒ID，唤醒期间不变
    public wakeup_id?: string = '';
    //	操作类型：1. 退出小食分发， 2. 继续分发 3. 暂不处理 4. 点击去下个地点
    public snack_action_type: number = 0;
    /**
     * "操作子类型，11 正常退出 12  目标点无法到达退出  13-定位丢失 14-轮子过流保护
     * 15-出地图
     * 21 目标点无法到达继续配送 22 过流保护继续配送  31：过流保护暂不处理"
     */
    public snack_action_sub_type: number = 0;
    //	小食分发过程中的点位信息
    public snack_point_name: string = '';
    //	触发的TTS信息
    public tts_info?: string = '';
    //	埋点产生时的时间戳
    public ctime?: number = 0;
}

/**
 * 小食分发异常事件
 * 小食分发产生异常进行上报
 */
export class DeliveryInvalidEvent {
    public static EVENT_TYPE_DESTINATION_UNREACHABLE = 1;
    public static EVENT_TYPE_AVOID_START = 2;
    public static EVENT_TYPE_AVOID_END = 3;
    public static EVENT_TYPE_EMERGENCY = 4;
    public static EVENT_TYPE_PATH_PLANNING_FAILED = 5;
    public static EVENT_TYPE_OUT_MAP = 6;
    public static EVENT_TYPE_OTHER = 7;
    public static EVENT_TYPE_AVOID_CONTINUE = 8;
    public static EVENT_TYPE_OBSTACLES_AVOID = 9;
    public static EVENT_TYPE_NOT_ESTIMATE = 10;
    public static EVENT_TYPE_WHEEL_OVER_CURRENT_RUN_OUT = 11;
    public static EVENT_TYPE_MULTI_ROBOT_WAIT_TIMEOUT = 16;
    public static EVENT_TYPE_MULTI_ROBOT_ERROR = 17;
    public tableName?: string = 'sc_restaurant_snack_event';

    //	分发id
    public snack_link_id: string = '';
    //	唤醒ID，唤醒期间不变
    public wakeup_id: string = '';
    //	埋点产生时的时间戳
    public ctime: number = 0;
    //	产生该异常要前往的点位
    public snack_point_name: string = '';
    /**
     * "事件类型：
     * 1 - 目的地不可达  有tts  【目标点位不存在，不对应任何底盘事件】
     * 2 - 开始遇到障碍物  tts与8是一个  【局部路径规划异常；包含：LOCAL_GOAL_INVAILD:6，目标点被占用
     * LOCAL_PATH_FAILED:7，路径被占用】
     * 3 - 障碍物解除 无tts  有两种遇障，其中绕行是无解除的【当前RobotOs进行计算，1.5s未再报障碍物即解除】
     * 4 - 急停 无tts
     * 5 - 全局路径规划失败 tts与1相同 【PATH_FAILED：3，全局路径规划失败（地图搜索，地图上到目标点没有路，不一定无法解决）
     * GRAPH_SEARCHER_FAILED_ERROR：29，全局路径规划失败（巡线搜索，没有巡线的路径）这次导航不行了，重启可能恢复。机器人位置的问题
     * GRAPH_ROAD_INVALID_ERROR：30，没有设置路径（无巡线路线，没有画任何的线）】
     * 6 - 地图外 tts与1相同【全局路径规划异常，对应底盘上报事件：目前点无效/危险/巡线外，机器人在地图外/在巡线外】
     * 7 - 其他 （应该就是底盘定位异常日志） 无该状态
     * 8 - 持续避障 5s一次有障碍物持续上报 tts与2同一个【LOCAL_GOAL_INVAILD:6，目标点被占用
     * LOCAL_PATH_FAILED:7，路径被占用】
     * 9 - 没有开始，结束的避障（避停）【OBSTACLES_AVOID：12，主动的停止，人员路过的时候，避停（跟config有关）】
     * 10 - 未定位【没有定位，进行的上报。】
     * 11 - 尝试恢复过流保护达到最大次数(当前尝试5次)"
     */
    public snack_event_type: number = 0;
    //	触发的TTS信息
    public tts_info: string = '';
    //异常子类型：
    public snack_event_sub_type?: number;
}

export enum OpkChangeType {
    DELIVERY = 1,
    WELCOME,
    DISTRIBUTION,
    LEADING
}

export default class BIReport {
    private static wakeupId: string = '';

    public static initWakeupId(): void {
        this.wakeupId = uuid();
    }

    private static currentTaskId: string = '';
    private static startType: StartType = StartType.touchable;
    private static disinStartType: DisinStartType = DisinStartType.nomalStart;

    public static initCurrentTaskId(type: StartType): void {
        this.currentTaskId = uuid();
        this.startType = type;
        console.log(TAG, 'start delivery', this.currentTaskId, type);
    }

    //初始化消毒任务
    public static initCurrentDisinfectTaskId(type: DisinStartType): void {
        this.currentTaskId = uuid();
        this.disinStartType = type;
        console.log(TAG, 'start disinfect', this.currentTaskId, type);
    }

    /**
     * 埋点描述：opk语音切换
     * type 切换方式：1-首页语音切换
     * opk_from 从哪个opk切换：1-递送 2-揽客 3-小食分发 4-领位
     * opk_to 切换到的opk：1-递送 2-揽客 3-小食分发 4-领位
     */
    public static opkChangeReport(opkTo: OpkChangeType) {
        Reports.reportMsg({
            //埋点名称
            tableName: 'sc_restaurant_opk_change',
            type: 1,
            opk_from: OpkChangeType.DISTRIBUTION,
            opk_to: opkTo,
            //当前时间戳
            ctime: Date.now()
        });
    }

    /**
     * 设置变动埋点上报
     * @param key
     * @param value
     */
    public static reportSettingsChange(key: string, value: string): void {
        const data = new OpkSettingsEvent(key, value);
        console.log(TAG, 'report settings change', data);
        Reports.reportMsg(data);
    }

    /**
     * 开始分发的事件上报
     * @param data 开始分发的信息
     */
    public static reportStartDelivery(data: DeliveryStartEvent): void {
        data.ctime = Date.now();
        data.wakeup_id = this.wakeupId;
        data.snack_link_id = this.currentTaskId;
        data.start_type = this.startType;
        data.tableName = new DeliveryStartEvent().tableName;
        console.log(TAG, 'report start', data);

        Reports.reportMsg(data);
    }

    /**
     * 开始消毒事件上报
     * @param data
     */
    public static reportStartDisinfect(data: DisinfectStartEvent): void {
        data.ctime = Date.now();
        data.disinfect_link_id = this.currentTaskId;
        if(data.start_type < DisinStartType.resumeStart){
            data.start_type = this.disinStartType;
        }
        data.tableName = new DisinfectStartEvent().tableName;
        console.log(TAG, 'reportStartDisinfect', data);

        Reports.reportMsg(data);
    }

    /**
     * 结束消毒事件上报
     * @param data
     */
    public static reportEndDisinfect(data: DisinfectEndEvent) {
        data.ctime = Date.now();
        data.disinfect_link_id = this.currentTaskId;
        data.tableName = new DisinfectEndEvent().tableName;
        console.log(TAG, 'reportEndDisinfect', data);

        Reports.reportMsg(data);
    }

    /**
     * 干烧状态上报
     * @param data
     */
    public static reportDisinfectDryStatus(data: DisinfectDryStatusEvent) {
        data.ctime = Date.now();
        data.disinfect_link_id = this.currentTaskId;

        console.log(TAG, 'reportDisinfectDryStatus', data);
        Reports.reportMsg(data);
    }

    /**
     * 消毒进度上报
     * @param data
     */
    public static reportDisinfectProgress(data: DisinfectProgressEvent) {
        data.ctime = Date.now();
        data.disinfect_link_id = this.currentTaskId;

        console.log(TAG, 'reportDisinfectProgress', data);
        Reports.reportMsg(data);
    }

    /**
     * 消毒点位到达时的状态上报
     * @param data
     */
    public static reportArrivePoint(data: DeliveryPointArriveEvent): void {
        data.ctime = Date.now();
        data.wakeup_id = this.wakeupId;
        data.snack_link_id = this.currentTaskId;
        data.tableName = new DeliveryPointArriveEvent().tableName;
        console.log(TAG, 'report arrive point', data);
        Reports.reportMsg(data);
    }

    /**
     * 动作上报
     * @param data
     */
    public static reportAction(data: DeliveryActionEvent): void {
        data.ctime = Date.now();
        data.wakeup_id = this.wakeupId;
        data.snack_link_id = this.currentTaskId;
        data.tableName = new DeliveryActionEvent().tableName;
        console.log(TAG, 'report action', data);

        Reports.reportMsg(data);
    }

    public static reportActionSimple(
        type: number,
        subType: number,
        destination: string
    ): void {
        const event: DeliveryActionEvent = {
            snack_action_type: type,
            snack_action_sub_type: subType,
            snack_point_name: destination,
            tableName: new DeliveryActionEvent().tableName
        };

        this.reportAction(event);
    }

    public static reportActionSimpleByElevatorMode(
        type: number,
        subType: number,
        destination: ElevatorPose
    ): void {
        const event: DeliveryActionEvent = {
            snack_action_type: type,
            snack_action_sub_type: subType,
            snack_point_name: destination.poseName + '_' + destination.floorAlias,
            tableName: new DeliveryActionEvent().tableName
        };

        this.reportAction(event);
    }

    /**
     * 上报导航的异常事件
     *
     * @param type
     * @param destination
     * @param tts
     */
    public static reportInvalidEvent(
        type: number,
        destination: string,
        tts: string,
        subType: number
    ): void {
        const event: DeliveryInvalidEvent = {
            tableName: new DeliveryInvalidEvent().tableName,
            ctime: Date.now(),
            wakeup_id: this.wakeupId,
            snack_link_id: this.currentTaskId,
            snack_point_name: destination,
            snack_event_type: type,
            tts_info: tts,
            snack_event_sub_type: subType
        };
        console.log(TAG, 'report invalid event', event);

        Reports.reportMsg(event);
    }

    /**
     * 上报导航的异常事件
     *
     * @param type
     * @param destination
     * @param tts
     */
    public static reportInvalidEventByElevatorMode(
        type: number,
        destination: ElevatorPose,
        tts: string,
        subType: number
    ): void {
        const event: DeliveryInvalidEvent = {
            tableName: new DeliveryInvalidEvent().tableName,
            ctime: Date.now(),
            wakeup_id: this.wakeupId,
            snack_link_id: this.currentTaskId,
            snack_point_name: destination.poseName + '_' + destination.floorAlias,
            snack_event_type: type,
            tts_info: tts,
            snack_event_sub_type: subType
        };
        console.log(TAG, 'report invalid event', event);

        Reports.reportMsg(event);
    }


    /**
     * 埋点描述：静默重定位触发
     * */
    public static reportSilenceRelocationTrigger(
        relocationLinkId: string
    ): void {
        console.log(TAG, 'reportSilenceRelocationTrigger');

        Reports.reportMsg({
            //埋点名称
            tableName: 'sc_restaurant_silence_relocation_trigger',
            relocation_link_id: relocationLinkId,
            trigger_type: 1, // not location/location lost
            opk_type: 2, // snack
            //当前时间戳
            ctime: Date.now()
        });
    }

    /**
     * 埋点描述：静默重定位结果
     * */
    public static reportSilenceRelocationResult(
        relocationLinkId: string,
        resultType: number
    ): void {
        console.log(TAG, 'reportSilenceRelocationResult');
        Reports.reportMsg({
            //埋点名称
            tableName: 'sc_restaurant_silence_relocation_result',
            relocation_link_id: relocationLinkId,
            // 1: location success
            // 2: single location failed
            // 3: multiple location failed
            result_type: resultType,
            opk_type: 2, // snack
            //当前时间戳
            ctime: Date.now()
        });
    }
}
