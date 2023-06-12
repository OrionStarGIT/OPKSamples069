/** @format */

import { AppRegistry } from 'react-native';
import App from './app/App';
import { LocalRouteManager } from './app/biz/settings/component/routeconfig/LocalRouteManager';
import { appid } from './package';
import { name as appName } from './app.json';
import AppDebug from './app/AppDebug';

//关闭其中某些yellow警告
console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.','source.uri should not be an empty string','Invalid props.style key'];
// 关闭全部yellow警告
console.disableYellowBox = true;

LocalRouteManager.getInstance().init();

//上线使用
AppRegistry.registerConfig([{
    appKey: 'Disinfection',
    component: () => App,
    intent: ['demonstrate_app&open'], //例如:'weather&get_weather'
    taskName: '梯控',
    appId: appid,
    priority: 1,
}]);
