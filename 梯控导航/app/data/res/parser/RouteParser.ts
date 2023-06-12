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

import {
    UpdateData,
    ModuleData,
    ModuleDataParser,
    UpdateDataListener,
    DataCenterUtils
} from 'orionos-eve-core';
import * as _ from 'lodash';
import I18nView from '../../../source/view/I18nView';

export interface RouteConfig {
    name: string;
    config_id?: string;
    timestamp: number;
    version: string;
    lang: string;
    places: Place[];
    lines: Route[]; // v6.3 版本新增
}

export interface Route {
    name: string;
    selected: boolean;
    places: Place[];
}

export interface Place {
    pos_id: string;
    pos_name: string;
}

const TAG = 'RouteParser';

/**
 * 巡逻路线资源解析器
 */
export default class RouteParser extends ModuleData
    implements ModuleDataParser, UpdateDataListener {
    public static readonly KEY = 'module_ads_line_cfg';

    private readonly routeData: Map<string, RouteConfig[]>;

    private listener?: () => void;

    public constructor() {
        super(RouteParser.KEY);
        this.routeData = new Map();

        DataCenterUtils.getInstance().registerListener(this);
    }

    public componentWillUnmount() {
        DataCenterUtils.getInstance().unRegisterListener(this);
    }

    public getKey(): string {
        return RouteParser.KEY;
    }

    public getModuleCode(): string {
        return RouteParser.KEY;
    }

    public getValidRoute(): Place[] | undefined {
        let routeList = I18nView.lookup(this.routeData) as RouteConfig;
        console.log(TAG, routeList);
        if (routeList) {
            if (routeList.lines) {
                console.log(TAG, 'find router in lines');
                const line = routeList.lines.find(
                    (item): boolean => {
                        return item.selected;
                    }
                );
                if (line) {
                    return line.places;
                } else {
                    return routeList.lines[0].places;
                }
            } else {
                console.log(TAG, 'get router places');
                return routeList.places;
            }
        } else {
            return undefined;
        }
    }

    public async loadJson(json: any): Promise<ModuleData> {
        try {
            console.log(TAG, 'loadJson:' + JSON.stringify(json));
            this.routeData.clear();
            this.jsonData = _.isString(json) ? JSON.parse(json) : json;
            this.jsonData.forEach((value: any) => {
                if (!value.lang) {
                    value.lang = 'zh_CN';
                }
                this.routeData.set(value.lang, value);
            });
            this.notifyLoadSuccess();
            return this;
        } catch (e) {
            console.log(TAG, 'error: route', e.toString());
            throw new Error(e);
        }
    }

    public updateData(data: UpdateData): void {
        console.log(
            TAG,
            'Route UpdateDataListener:updateData: ' + data.moduleCode
        );
        if (data && data.moduleCode === RouteParser.KEY) {
            this.routeData.clear();
            DataCenterUtils.getInstance()
                .getModuleObject(data.moduleCode)
                .then(data => {
                    this.listener && this.listener();
                });
        }
    }

    /**
     * 设置数据变化监听
     *
     * @param listener
     */
    public setDataUpdate(listener: () => void) {
        this.listener = listener;
    }

    public preLoad(): void {}

    public reLoad(): void {}

    public endLoad(): void {}
}
