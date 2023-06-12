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

/**
 * 以下为中文简体文本字符信息
 * 默认为简体中文，以下文字信息分为两类，分开存储
 * 第一类：需要在其他语音的js文件内同步添加（需翻译）。
 * 第二类：不需要适配国际化文字信息（无需翻译）
 */
export default {
    intoTtsArray: [
        'I can walk around again now.',
        'I can start cruising soon after route is given.'
    ],
    settings: 'Settings',
    opkChange: 'Switch App',
    meal: 'Delivery',
    welcomeText: 'Greeting',
    leading: 'Leading',
    desk: 'Table Service',
    toastSetTwoPlaceAtLeast: 'Please set at least two spots',
    toastNoAdvertRes: 'No Advertisement Resource Now',
    faceSensitivityName: ['Low', 'Middle', 'High'],
    labelCruiseSpeed: 'Cruising Speed Settings',
    titleBaseSettings: 'Basic Settings',
    titleAdvertSettings: 'Advertisement Display Settings',
    titleAdvanceSettings: 'Advanced Settings',
    labelSinglePicDuring: 'Displaying Time for Single Picture',
    labelAutoGoNextStation: 'Go to Next Spot Automatically',
    suLabelAutoGoNextStation:
        'If you turn off, you have to switch spot manually. Suggested when recollecting dishes and giving out snacks',
    labelTtsPlayInterval: 'Text Broadcast Time Interval',
    labelStationStayTime: 'Stay Time at Spot',
    labelSearchPerson: 'Dynamic Greeting',
    subLabelSearchPerson:
        'Switch to Greeting Mode When See Person During Cruising',
    labelFaceSensitivity: 'Face Recognition Sensibility',
    labelCruiseRoute: 'Cruising Route Settings',
    tipCruiseSpeedSet: 'Range 0.1~0.85m/s, Suggestion 0.7m/s',
    titleCruiseSpeedSet: 'Cruising Speed Setting (m/s)',
    toastCruiseSpeedOverOfRange: 'Speed exceeds value range',
    hintSinglePicDuring: 'Please enter display time for single picture',
    tipSinglePicDuring:
        'Only for "Text Broadcast+Picture" Advertisement. Range 10-300s',
    subTitleSinglePicDuring: 'Display Time for Single Picture (s)',
    toastSinglePicDuringOverOfRange: 'Time exceeds value range',
    hintTextPlayInterval: 'Please enter text broadcast time interval',
    tipTextPlayInterval:
        'Only for "Text Broadcast+Picture" Advertisement. Range 1-300s',
    subTitleTextPlayInterval: 'Text Broadcast Time Interval(s)',
    toastTextPlayIntervalOverOfRange: 'Time exceeds value range',
    hintStationStayTime: 'Please enter stay time at spot. Range 1-1000s',
    tipStationStayTime: 'Stay Time at Spot',
    subTitleStationStayTime: 'Stay Time at Spot (s)',
    toastStationStayTimeOverOfRange: 'Time exceeds value range',
    subLabelAutoGoNextStation:
        'If you turn off, you have to switch spot manually. Suggested when recollecting dishes and giving out snacks',
    titleCruiseMode: 'Cruising Mode',
    ttsCheckEstimate: 'Please check whether positioning is successful',
    toastWillGoPosition: 'Heading to %s Next',
    toastGoPosition: 'Heading to %s',
    toastGoNextPosition: 'Go to Next Spot',
    toastCruiseHasPaused: 'Cruising Is Suspended',
    buttonContinueCruise: 'Continue Cruising',
    buttonCancelCruise: 'End Task',
    modeWelcome: 'Greeting Mode',
    modeMeal: 'Delivery Mode',
    modeAutoDesk: 'Table Service Mode',
    modeLeading: 'Leading Mode',
    ttsAvoid: [
        'Oops, I cannot go forward, could you please move a little bit so that I can pass.',
        'I know I am attractive, but I have to go.',
        'Please do not stand in front of me, I an working now. ',
        'I am about to be late, please let me do my work. ',
        'Hello,could you please make a way.'
    ],
    ttsNavigationGlobalPathFailedPleaseEditMap:
        'Destination is unable to arrive. Please check on the map or push the robot to passable place. ',
    ttsNavigationNotEstimate: 'Please reposition first',
    ttsNavigationOutMap:
        'Destination is unable to arrive. Please remove noises or reposition again',
    ttsNavigationUnReachable:
        'I cannot find my way. Please push me to place under any Coded Targets nearby to retry',
    titleNavigationUnReachable: 'I cannot find my way',
    subTitleNavigationUnReachable:
        'Please push me to place under any Coded Targets nearby to retry',
    errorCode: 'Error Code: ',
    buttonRetry: 'Retry',
    ttsWheelStop:
        'Wheel error occurs multiple times. \nPlease check whether the wheels are stuck or the robot is overloaded. \n Please tap Back to work after problem has been eliminated',
    titleWheelStop: 'Wheel error occurs multiple times.',
    subTitleWheelStop:
        'Please check whether the wheels are stuck or the robot is overloaded. \n Please tap Back to work after problem has been eliminated',
    buttonNoHandle: 'Not Now',
    buttonRecovery: 'Back to Work',

    // todo
    titleStartCruise: 'Start Cruising',
    toastCruiseRoutePointsUnReachable:
        'Spots in current cruising route is unable to arrive. Please set again in Mini Program',
    toastCruiseNoRoute:
        'No cruising map current. Please set in the Mini Program',
    ttsDelivery: 'Would you like some free snacks',
    buttonCancel: 'Cancel',
    tipTextInput: 'Please enter text content',
    toastTextInput: 'Please enter content',
    buttonConfirm: 'Confirm',
    titleCruiseRoute: 'Cruising Route',
    buttonClearRoute: 'Clear Route',
    buttonSelectRoute: 'Tap to select Spot',
    titleCruiseRouteWillAdd: 'Not Added',
    toastPasswordError: 'Password Incorrect',
    titlePleaseInputPassword: 'Please enter password',
    toastPasswordVerifyFailed: 'Password verification failed',
    titlePleaseUseQrCodeGetRoute:
        'Please scan using WeChat and set route in Mini Program.',
    avoidText: 'Way Is Occupied',
    avoidSubText: 'Could you please make way for me.',

    fullyAutomaticStart: '全自动开始',
    startButtonIsDry: '加液后，点这里',
    startButtonDryCheck: '请稍等',

    useRoute: '使用中的路线',
    route: '路线',
    localRoute: '编辑路线',
    routeNull: '空',
    nextStart: '即将执行',
    goToCharge: '我要去充电了',
    dryToCharge:'消毒液用完了，我要去充电了',
    isCharging:'正在充电',
    disinfectantNull: '消毒液用完了',
    disinfectantNullMsg: '请立即补充消毒液，然后点击“完成”',
    buttonKnow:'知道了',
    buttonComplete:'完成',

    goCharging:'正在前往充电桩',
    noPlan:'没有更多计划',
    planComplete:'消毒计划已完成',
    later:'最近',
    num:'个',
    plan:'计划',
    todayPlanAllComplete:'今日消毒计划已全部完成',
    stopChargingTts:'请先站在我的侧面，然后点击结束充电',
    stopChargingCountTts:'正在结束充电，请勿站在机器人前方'
};
