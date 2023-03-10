import { BaseComponent, triggerManager, BaseComponentProps } from 'orionos-eve-core';
import React from 'react';
import { observer } from 'mobx-react';
import { ImageBackground, Text, View } from 'react-native';
import { DemoViewModel } from './DemoViewModel';
import { DemoVoice } from './DemoVoice';
import { DemoTrigger } from './DemoTrigger';
import { demoModel } from './DemoModel';

//注册trigger跳转，必须添加，否则trigger无效
triggerManager.addTrigger(new DemoTrigger());

/**
 * 功能UI界面
 */
@observer
export class DemoScreen extends BaseComponent<BaseComponentProps, DemoViewModel, DemoVoice> {

    public viewModel: DemoViewModel;

    public constructor(props: BaseComponentProps) {
        super(props);

        this.viewModel = new DemoViewModel();
        let voice = new DemoVoice(this.viewModel);
        //this.viewModel.showRecognition(true);

        //关联ViewModel及Voice的生命周期到当前界面上
        this.setViewModel(this.viewModel);
        this.setVoice(voice);
        global.recognition && global.recognition.setShow(true);
        global.recognition.setGuideShow(true);
    }

    public componentDidMount() {
        //重写界面的didMount，必须调用super
        super.componentDidMount();
    }

    public componentWillMount() {

    }

    public componentWillUnmount() {
        //重写界面的Unmount，必须调用super
        super.componentWillUnmount();
    }

    public render() {
        return (
            <View>
                <ImageBackground
                    style={{
                        width: '100%',
                        height: '100%',
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#FF0000FF"
                    }}
                    source={require('../../img/bg.png')}
                >
                <Text style={{ fontSize: 17, color: 'red' }}> {demoModel.getInfoText()}</Text>
                </ImageBackground>                
            </View>
        );

    }
}
