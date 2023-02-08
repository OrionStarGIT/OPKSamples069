import { BaseComponent, triggerManager, BaseComponentProps } from 'orionos-eve-core';
import React from 'react';
import { Button, ImageBackground, Text, View } from 'react-native';
import { observer } from 'mobx-react';
import { MainViewModel } from './MainViewModel';
import { MainVoice } from './MainVoice';
import { mainModel } from './MainModel';

/**
 * 功能UI界面
 */
@observer
export class MainScreen extends BaseComponent<BaseComponentProps, MainViewModel, MainVoice> {

    public viewModel: MainViewModel;

    public constructor(props: BaseComponentProps) {
        super(props);

        console.log('MainScreen constructor');

        this.viewModel = new MainViewModel();
        let voice = new MainVoice(this.viewModel);

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
        console.log('MainScreen render');
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
                    <Text style={{ fontSize: 17, color: 'red'}}> {mainModel.getInfoText()}</Text>
                    <Button title={'跳转Demo'} onPress={this.showDemoScreen}/>
                </ImageBackground>

            </View>
        );

    }

    public showDemoScreen = () => {
        this.props.navigation.navigate('demo');
      };
}
