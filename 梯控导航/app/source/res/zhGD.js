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
    intoTtsArray: ['Hello Hello,我又可以周圍走喇', '比我一個路線,我就即刻上線'],
    settings: '設定',
    opkChange: '應用切換',
    meal: '送餐',
    welcomeText: '攬客',
    leading: '帶位',
    desk: '跑堂',
    plateRecycling: '回盤',
    toastSetTwoPlaceAtLeast: '請至少設定兩個位置點',
    toastNoAdvertRes: '暫時冇廣告資源啊',
    faceSensitivityName: ['低', '中', '高'],
    labelCruiseSpeed: '消毒速度配置',
    titleBaseSettings: '基礎設定',
    titleAdvertSettings: '廣告播放設定',
    titleAdvanceSettings: '消毒高級設定',
    labelSinglePicDuring: '單張圖片展示時間',
    labelAutoGoNextStation: '自動去下一地點',
    suLabelAutoGoNextStation:
        '關閉開關，需要手動切換點位，建議回收餐盤、發放自助餐使用',
    labelTtsPlayInterval: '文字報音間隔時間',
    labelStationStayTime: '點位停止時間',
    labelSearchPerson: '動態招客',
    subLabelSearchPerson: '消毒過程識別到人，會跳轉到攬客模式吸引客人啊',
    labelFaceSensitivity: '識別靈敏度',
    labelCruiseRoute: '消毒路線配置',
    tipCruiseSpeedSet: '取值區間0.1~0.85m/s，建議速度0.7m/s',
    titleCruiseSpeedSet: '消毒速度配置（m/s）',
    toastCruiseSpeedOverOfRange: '速度大過取值範圍',
    hintSinglePicDuring: '請輸入單張圖片展示時間',
    tipSinglePicDuring:
        '僅針對“文字播報同埋圖片”類型嘅廣告生效，取值區間10-300s',
    subTitleSinglePicDuring: '單張圖片展示時間（s）',
    toastSinglePicDuringOverOfRange: '時間大過取值區間',
    hintTextPlayInterval: '唔該輸入文字播報嘅間隔時間',
    tipTextPlayInterval:
        '僅針對“文字播報同埋圖片”類型噶廣告生效，取值區間1-300s',
    subTitleTextPlayInterval: '文字播報間隔時間（s）',
    toastTextPlayIntervalOverOfRange: '時間大過取值區間',
    hintStationStayTime: '請輸入停止時間，取值區間1-1000s',
    tipStationStayTime: '點位停止時間',
    subTitleStationStayTime: '點位停止時間（s）',
    toastStationStayTimeOverOfRange: '時間大過取值區間',
    subLabelAutoGoNextStation:
        '關閉開關，則需要手動切換點位，建議回收餐盤、發放自助餐使用',
    titleCruiseMode: '消毒模式',
    ttsCheckEstimate: '請檢查定位係咪成功',
    toastWillGoPosition: '即將前往%s',
    toastGoPosition: '正在前往%s',
    toastGoNextPosition: '去下個地點',
    toastCruiseHasPaused: '消毒已暫停',
    buttonContinueCruise: '繼續消毒',
    buttonCancelCruise: '任務結束',
    modeWelcome: '攬客模式',
    modeMeal: '送餐模式',
    modeAutoDesk: '跑堂模式',
    modeLeading: '帶位模式',
    modePlate: '回盤模式',
    ttsAvoid: [
        '哎呀,我被擋住左呀,唔該讓一讓比我丫',
        '唔好意思呀,唔該讓一讓,機械人嚟喇',
        '你冇睇錯呀,機械人嚟喇',
        '靚仔靚女,麻煩讓一下丫,機械人嚟喇',
        '我地遲d再傾丫,我做埋d野先啊'
    ],
    deliveryAvoid: [
        '哎呀,我被擋住左呀,唔該讓一讓比我丫',
        '唔好意思呀,唔該讓一讓,機械人嚟喇',
        '你冇睇錯呀,機械人嚟喇',
        '靚仔靚女,麻煩讓一下丫,機械人嚟喇',
        '我地遲d再傾丫,我做埋d野先啊',
        '靚仔靚女, 麻煩讓一下我丫',
        '比個位我行丫,人地仲要做野嫁,錫晒你呀',
        '唔好意思讓一讓唔該晒',
        '呠呠,機械人嚟喇,借一借過丫唔該',
        '滾水呀,麻煩讓一讓',
        '麻煩讓一讓丫,我遲到喇',
        '比個位我行丫,做完野再同你玩丫',
        '我要過去喇,麻煩讓一讓丫',
        '哥哥姐姐,幫忙讓一讓條路丫',
        '唔該讓一讓呀,我趕緊路呀',
        '唔該讓一讓丫,人地只是咁啱路過,仲做緊野嫁',
        '唔該你比我過去丫,無為要機械人難做丫'
    ],
    ttsNavigationGlobalPathFailedPleaseEditMap:
        '目標點去唔到啊，麻煩你檢查下地圖或者推我去行倒嘅地方丫',
    ttsNavigationNotEstimate: '請先定位',
    ttsNavigationOutMap:
        '目標地點過唔倒去啊，唔該你刪咗個地圖標識或者從新設置過丫',
    ttsNavigationUnReachable:
        '我揾唔到路啊，唔該幫我推到去附近嘅定位標籤下方再試下啦',
    nav_waitTimeout_tts: '我係呢度等左好耐喇，唔該你幫下我丫',
    // eslint-disable-next-line @typescript-eslint/camelcase
    warningTitle_waitTimeout: '多機等待超時',
    // eslint-disable-next-line @typescript-eslint/camelcase
    warningHint_waitTimeout: '其他機械人長時間未讓出通道',
    titleNavigationUnReachable: '我揾唔到路啊',
    subTitleNavigationUnReachable: '唔該幫我推到去附近嘅定位標籤下方再試下啦',
    errorCode: '錯誤碼：',
    buttonRetry: '從試',
    ttsWheelStop:
        '機械人嘅車轆已多次遇到問題。\n請檢查車轆是否被雜物卡住或運送超載\n請你排除問題之後，再點擊“恢復工作”。',
    titleWheelStop: '機械人嘅車轆已多次遇到問題',
    subTitleWheelStop:
        '請檢查車轆是否被雜物卡住或運送超載\n請你排除問題後再點擊“恢復工作”',
    buttonNoHandle: '暫時唔處理住',
    buttonRecovery: '恢復工作',
    // todo
    titleStartCruise: '開始消毒',
    toastCruiseRoutePointsUnReachable:
        '當前消毒路線中部分點位無法到達，請到小程式中從新配置哦',
    toastCruiseNoRoute: '當前沒有配置消毒路線，請到小程式中配置哦',
    ttsDelivery: '免費小食自己攞啊',
    buttonCancel: '取消',
    tipTextInput: '請輸入文字內容',
    toastTextInput: '請輸入內容',
    buttonConfirm: '確定',
    titleCruiseRoute: '行駛路線',
    buttonClearRoute: '清空路線',
    buttonSelectRoute: '點擊選擇行駛點',
    titleCruiseRouteWillAdd: '等待添加',
    toastPasswordError: '密碼錯誤',
    titlePleaseInputPassword: '請輸入密碼',
    toastPasswordVerifyFailed: '密碼校驗失敗',
    titlePleaseUseQrCodeGetRoute: '請用微信掃一掃，係小程式上面配置路線',
    avoidText: '過唔倒去呀',
    avoidSubText: '比條路我行丫',
    nav_multiRobotError_tts: '多機調度出現異常，請嘗試從啓或者聯絡售後人員',
    warningHint_multiRobotError: '請對此畫面拍照並聯絡售後人員',
    warningTitle_multiRobotError: '多機調度出現異常',
    labelAdvertVolume: '消毒廣告音量',
    warningTitlePathInvalid: '我搵唔到消毒路線呀',
    warningSubTitlePathInvalid: '請繪制消毒路線然後發布呀',
    warningTitleRobotOutOfPath: '我脫離左消毒路線呀',
    warningSubTitleRobotOutOfPath: '唔該將我推返去消毒路線嘅範圍裏面呀',
    waringTitleTargetOutOfPath: '目的地唔係消毒路線範圍裏面呀',
    warningSubTitleTargetOutOfPath: '請檢查消毒路線然後重新發布呀',
    labelCruiseVersion: '消毒版本',
    demoModalTitle: '演示設置',
    demoModalTips:
        '溫馨提示：定時消毒開啟後，導航避障時屏幕仍會繼續播放消毒廣告資源',
    timeCruiseSwitch: '定時消毒',
    cruiseStartTime: '消毒開始時間',
    inSituSwitch: '原地播報',
    mainScreenTitle: '我可以幫您做這些事',
    subTitleMainScreen1: '動態招客',
    subTitleMainScreen2: '零食分發',
    subTitleMainScreen3: '循環回盤',
    toastCruiseNoLocalRoute: '沒有消毒路線，請在設置中進行配置。',
    incompleteLocalRoute: '消毒路線不完整，請在設置中修改',
    closeLocalCruiseRouteTips:
        '提醒：本地消毒路線已禁用，請到機器人管理平台配置消毒路線。',
    subLabelCruiseRoute: '可配置本地消毒路線',
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
    bathroom: '洗手間',
    atomization_gear: '雾化档位设置',
    heigh_speed: '高速雾化',
    long_endurance: '长续航雾化'
};
