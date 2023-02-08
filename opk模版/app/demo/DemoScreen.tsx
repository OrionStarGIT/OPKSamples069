import { BaseComponent, triggerManager, BaseComponentProps } from 'orionos-eve-core';
import React from 'react';
import { observer } from 'mobx-react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Button, ImageBackground } from 'react-native';
import { DemoViewModel } from './DemoViewModel';
import { DemoVoice } from './DemoVoice';
import { DemoTrigger } from './DemoTrigger';
import { demoModel } from './DemoModel';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f3eae8',
        // width: Dimensions.get( 'window').width,
        // height: Dimensions.get( 'window').height,
        width: 1200,
        height: 1920,
        opacity: 1
    },
    buttons: {
        width: 200,
        height: 30,
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 2.3,
        textAlign: 'center',
        textAlignVertical: 'center',
    }
});

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

        //关联ViewModel及Voice的生命周期到当前界面上
        this.setViewModel(this.viewModel);
        this.setVoice(voice);
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
            <>
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
                    <TouchableOpacity onPress={this.triggerWakeup}><Text style={styles.buttons}>Trigger to Home</Text></TouchableOpacity>
                </ImageBackground>
            </>
        );

    }

    public triggerWakeup = () => {
        this.viewModel.exit();
    }
}
