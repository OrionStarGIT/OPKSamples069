/**
 Copyright (C) 2020 Beijing Kingsoft Internet Security Software Co., Ltd. and Beijing Orion Star Technology Co., Ltd
 Licensed under the Robot OS License Agreement (the "License").
 You may not use this file except in compliance with the License.
 You may obtain a copy of the License at  https://wiki.orionbase.cn/devguide/robot-osxu-ke-xie-yi.html
 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and limitations under the License.
 */

import { observable, action } from 'mobx';


export class DemoModel {

    @observable private infoText = 'ttttHello Robot!';
    @observable private nav_flag = false;
    @observable private poseName = '';
    @observable private index = 0;
    @observable private navText= '开始导航';

    @action
    public setInfoText(infoText: string) {
        console.log('DemoVoice Set info text : ' + infoText);
        this.infoText = infoText;
    }

    public getInfoText(): string {
        return this.infoText;
    }


    public getStartFlag(): boolean {
        console.log('设置true--------------------set 5');
        return this.nav_flag;
    }

    @action
    public setStartFlag(type: boolean) {
        console.log('设置true--------------------set 3');
        this.nav_flag = type;
    }

    @action
    public setPoints(poseName: string, index: number) {
        console.log('设置true--------------------set points' + poseName + '       ' + index);
        this.poseName = poseName;
        this.index = index;
    }

    public getPosName(): string {
        console.log('设置true--------------------get posname' + this.poseName);
        return this.poseName;
    }

    public getIndex(): number {
        console.log('设置true--------------------get index' + this.index);
        return this.index;
    }

    @action
    public setNavText(nav_text: string) {
        return this.navText = nav_text;
    }

    public getNavText(): string {
        return this.navText;
    }
}

export const demoModel = new DemoModel();
