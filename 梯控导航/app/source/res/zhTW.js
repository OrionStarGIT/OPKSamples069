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
        '當當當,我又可以到處溜達啦',
        '給我一個路線,消毒小助手立刻上線'
    ],
    settings: '設定',
    opkChange: '應用切換',
    meal: '送餐',
    welcomeText: '攬客',
    leading: '領位',
    desk: '跑堂',
    plateRecycling: '回盤',
    toastSetTwoPlaceAtLeast: '請至少設定兩個位置點',
    toastNoAdvertRes: '暫時沒有廣告資源',
    faceSensitivityName: ['低', '中', '高'],
    labelCruiseSpeed: '消毒速度配置',
    titleBaseSettings: '基礎設定',
    titleAdvertSettings: '廣告播放設定',
    titleAdvanceSettings: '消毒高級设置',
    labelSinglePicDuring: '單張圖片展示時間',
    labelAutoGoNextStation: '自動去下一地點',
    suLabelAutoGoNextStation:
        '關閉開關，則需要手動切換點位，建議回收餐盤,、發放自助餐使用',
    labelTtsPlayInterval: '文字播報間隔時間',
    labelStationStayTime: '點位停止時間',
    labelSearchPerson: '動態攬客',
    subLabelSearchPerson: '消毒過程看到人時，會跳轉到攬客模式吸引顧客',
    labelFaceSensitivity: '識別靈敏度',
    labelCruiseRoute: '消毒路線配置',
    tipCruiseSpeedSet: '取值區間0.1~0.85m/s，建議速度0.7m/s',
    titleCruiseSpeedSet: '消毒速度配置（m/s）',
    toastCruiseSpeedOverOfRange: '速度超過取值範圍',
    hintSinglePicDuring: '請輸入單張圖片展示時間',
    tipSinglePicDuring: '僅針對“文字播報+圖片”類型的廣告生效，取值區間10-300s',
    subTitleSinglePicDuring: '單張圖片展示時間（s）',
    toastSinglePicDuringOverOfRange: '時間超過取值區間',
    hintTextPlayInterval: '請輸入文字播報間隔時間',
    tipTextPlayInterval: '僅針對“文字播報+圖片”類型的廣告生效，取值區間1-300s',
    subTitleTextPlayInterval: '文字播報間隔時間（s）',
    toastTextPlayIntervalOverOfRange: '時間超過取值區間',
    hintStationStayTime: '請輸入停止時間，取值區間1-1000s',
    tipStationStayTime: '點位停止時間',
    subTitleStationStayTime: '點位停止時間（s）',
    toastStationStayTimeOverOfRange: '時間超過取值區間',
    subLabelAutoGoNextStation:
        '關閉開關，則需要手動切換點位，建議回收餐盤、發放自助餐使用',
    titleCruiseMode: '消毒模式',
    ttsCheckEstimate: '請檢查是否定位成功',
    toastWillGoPosition: '即將前往%s',
    toastGoPosition: '正在前往%s',
    toastGoNextPosition: '去下個地點',
    toastCruiseHasPaused: '消毒已暫停',
    buttonContinueCruise: '繼續消毒',
    buttonCancelCruise: '結束任務',
    modeWelcome: '攬客模式',
    modeMeal: '送餐模式',
    modeAutoDesk: '跑堂模式',
    modeLeading: '領位模式',
    modePlate: '回盤模式',
    ttsAvoid: [
        '哎呀,你擋住我了,請不要站在我面前哦',
        '交通台提醒您,請記得給機器人讓路哦',
        '請讓我先過去吧',
        '請讓一下吧',
        '麻煩請您讓一下吧'
    ],
    deliveryAvoid: [
        '哎呀,我被擋住了,請幫忙給讓條路呀',
        '不好意思,請您讓一下,機器人來啦',
        '叮噹叮噹,機器人來啦',
        '親親,幫忙讓一下呀,機器人來啦',
        '請您不要太迷戀我,人家忙著呢',
        '英俊瀟灑的你,美麗迷人的你就讓一下我啦',
        '小可愛,不要擋在我前面惹,人家還要幹活啦',
        '讓一讓啦好不好嘛（ma4）,人家還要工作呢',
        '叮鈴（ling1）叮鈴（ling1）,機器人來咯,借過一下下',
        '帥氣美麗的哥哥姐姐,請讓一下下呀',
        '麻煩讓一下下啦,人家要遲到啦',
        '哥哥姐姐讓一下,等我下班再來找你玩吧',
        '客官,麻煩讓一下惹,我要過去咯',
        '小哥哥小姐姐,幫忙讓條路呀',
        '請讓一讓呀,寶寶有小情緒啦',
        '請讓一讓,人家只是個路過的寶寶嘿嘿',
        '求求你讓我過去吧,做個機器人太難了'
    ],
    ttsNavigationGlobalPathFailedPleaseEditMap:
        '目標點不可到達，請檢查地圖標注或把機器人推到可通行區域',
    ttsNavigationNotEstimate: '請先定位',
    ttsNavigationOutMap: '目標點不可到達，請擦除地圖噪點或重新定位',
    ttsNavigationUnReachable:
        '我找不到路啦，請將我推到附近的定位標籤下方重試吧',
    nav_waitTimeout_tts: '我在這裡已經等了太久了，請您幫幫我吧',
    // eslint-disable-next-line @typescript-eslint/camelcase
    warningTitle_waitTimeout: '多機等待超時',
    // eslint-disable-next-line @typescript-eslint/camelcase
    warningHint_waitTimeout: '其他機器人長時間未讓出通道',
    titleNavigationUnReachable: '找不到路啦',
    subTitleNavigationUnReachable: '請把我推到附近的定位標籤下方重試吧',
    errorCode: '錯誤碼：',
    buttonRetry: '重試',
    ttsWheelStop:
        '機器人輪子已多次遇到問題。\n請檢查輪子是否被雜物卡住或運送超載\n請您排除問題後，再點擊“恢復工作”。',
    titleWheelStop: '機器人輪子已多次遇到問題',
    subTitleWheelStop:
        '請檢查輪子是否被雜物卡住或運送超載\n請您排除問題後再點擊“恢復工作”',
    buttonNoHandle: '暫不處理',
    buttonRecovery: '恢復工作',
    // todo
    titleStartCruise: '開始消毒',
    toastCruiseRoutePointsUnReachable:
        '當前消毒路線中部分點位無法到達，請到小程式中重新配置哦',
    toastCruiseNoRoute: '當前沒有配置消毒路線，請到小程式中配置哦',
    ttsDelivery: '免費小食請自取',
    buttonCancel: '取消',
    tipTextInput: '請輸入文字內容',
    toastTextInput: '請輸入內容',
    buttonConfirm: '確定',
    titleCruiseRoute: '行駛路線',
    buttonClearRoute: '清空路線',
    buttonSelectRoute: '點擊選擇行駛點',
    titleCruiseRouteWillAdd: '待添加',
    toastPasswordError: '密碼錯誤',
    titlePleaseInputPassword: '請輸入密碼',
    toastPasswordVerifyFailed: '密碼校驗失敗',
    titlePleaseUseQrCodeGetRoute: '請用微信掃一掃，在小程式上配置路線',
    avoidText: '過不去啦',
    avoidSubText: '請給我讓條路吧',
    nav_multiRobotError_tts: '多機調度出現異常，請嘗試重啓或聯系售後人員',
    warningHint_multiRobotError: '請對此畫面拍照並聯系售後人員',
    warningTitle_multiRobotError: '多機調度出現異常',
    labelAdvertVolume: '消毒廣告音量',
    warningTitlePathInvalid: '我沒有找到巡線',
    warningSubTitlePathInvalid: '請繪制巡線並發布',
    warningTitleRobotOutOfPath: '我脫離巡線了',
    warningSubTitleRobotOutOfPath: '請把我推到巡線范圍內',
    waringTitleTargetOutOfPath: '目的地不在巡線范圍內',
    warningSubTitleTargetOutOfPath: '請檢查巡線並重新發布',
    labelCruiseVersion: '消毒版本',
    demoModalTitle: '演示設置',
    demoModalTips:
        '溫馨提示：定時消毒開啟後，導航避障時屏幕仍會繼續播放消毒廣告資源',
    timeCruiseSwitch: '定時消毒',
    cruiseStartTime: '消毒開始時間',
    inSituSwitch: '原地播報',
    mainScreenTitle: '我可以幫您做這些事',
    subTitleMainScreen1: '動態攬客',
    subTitleMainScreen2: '零食分發',
    subTitleMainScreen3: '循環回盤',
    toastCruiseNoLocalRoute: '沒有消毒路線，請在設置中進行配置。',
    incompleteLocalRoute: '消毒路線不完整，請在設置中修改',
    closeLocalCruiseRouteTips:
        '提醒：本地消毒路線已禁用，請到機器人管理平台配置消毒路線。',
    subLabelCruiseRoute: '可配置的本地消毒路線',
    useLocalCruiseRoute: '使用本地消毒路線',
    clearRoute: '刪除路線',
    configLocalCruiseRoute: '本地消毒路線配置',
    emptyCruiseRouteBtnTip: '添加消毒路線',
    selectCruisePos: '點擊選擇消毒點位',
    chargePoint: '回充點',
    chargePile: '充電樁',
    locationPoint: '定位點',
    meetingRoom: '會議室',
    cafeRoom: '咖啡廳',
    financeOffice: '財務室',
    bathroom: '洗手間'
};
