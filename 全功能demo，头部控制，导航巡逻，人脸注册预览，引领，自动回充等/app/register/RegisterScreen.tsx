/*
 *  Copyright (C) 2017 OrionStar Technology Project
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import React from 'react';
import {
    BaseComponent,
    BaseComponentProps,
    BaseVoice,
    RegisterComponent
} from 'orionos-eve-core';
import { observer } from 'mobx-react';
import { RegisterViewModel } from './RegisterViewModel';
import { RegisterView } from './RegisterView';

@observer
export class RegisterScreen
    extends BaseComponent<BaseComponentProps, RegisterViewModel, BaseVoice> {

    /**
     * 构造函数
     */
    public constructor(props: BaseComponentProps) {
        super(props);

        this.setViewModel(new RegisterViewModel());
    }

    /**
     * 执行
     */
    public render(): React.ReactNode {
        if (!this.viewModel) {
            return null;
        }
        return (
            <>
                {/*人脸注册，需要签了协议之后才可以使用，默认不可用*/}
                {this.viewModel.isRunning() ? (
                    <RegisterComponent
                        param={this.viewModel.getParam()}
                        onFinish={this.viewModel && this.viewModel.onFinish}/>
                ) : null}
                {/*界面*/}
                <RegisterView viewModel={this.viewModel}/>
            </>
        );
    }
}