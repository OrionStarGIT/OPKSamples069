import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { triggerManager } from 'orionos-eve-core';
import { MainScreen } from './main/MainScreen';
import { DemoScreen } from './demo/DemoScreen';

export const AppNavigator = createSwitchNavigator(
    {
        main: MainScreen,
        demo: DemoScreen,
    },
    {
        initialRouteName: 'main',
        mode: 'card',
        cardStyle: {
            backgroundColor: 'rgba(0,0,0,0)'
        },
        resetOnBlur: true,
        defaultNavigationOptions: ({ navigation }) => {
            triggerManager.setNavigation(navigation);
            const { routeName } = navigation.state;
            return {
                headerTransparent: true, // 控制透明
                headerTitleStyle: {
                    flex: 1, // 解决安卓机title不居中
                    textAlign: 'center', // 解决安卓机title不居中
                    fontSize: 15,
                    color: '#F7F7F7'
                },
                // header:()=>null,
                headerStyle: {
                    height: 38,
                    backgroundColor: '#f3f3f3'
                },
                gesturesEnabled: true,
                headerBackTitle: null
            };
        }
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;

