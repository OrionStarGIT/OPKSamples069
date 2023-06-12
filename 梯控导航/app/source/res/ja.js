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
        '復活しました、私は再び歩き回ることができます',
        'ルート一つで、巡行すぐに開始できます'
    ],
    settings: '設定',
    opkChange: 'アプリ切り替え',
    meal: '配送',
    welcomeText: '接客',
    leading: '案内',
    desk: 'テーブルサービス',
    toastSetTwoPlaceAtLeast: '二つ以上の地点を設定してください',
    toastNoAdvertRes: '広告リソースがありません',
    faceSensitivityName: ['低い', '中', '高い'],
    labelCruiseSpeed: '巡行速度設定',
    titleBaseSettings: '基本設定',
    titleAdvertSettings: '広告放送設定',
    titleAdvanceSettings: '高級設定',
    labelSinglePicDuring: '一枚画像表示時間',
    labelAutoGoNextStation: '自動的に次の地点に行きます',
    suLabelAutoGoNextStation:
        'オフにすると、手動に地点切り替えの必要があります、皿を回収するか、あるいはおやつを配るときにお勧めします',
    labelTtsPlayInterval: 'テクスト放送時間間隔',
    labelStationStayTime: '地点待機時間',
    labelSearchPerson: 'ダイナミック接客',
    subLabelSearchPerson: '巡行中に人顔を認識したら、接客モードに切り替えます',
    labelFaceSensitivity: '人顔認識センシビリティ',
    labelCruiseRoute: '巡行ルート設定',
    tipCruiseSpeedSet: '範囲値0.1~0.85m/s，速度提案0.7m/s',
    titleCruiseSpeedSet: '消毒速度設定(m/s)',
    toastCruiseSpeedOverOfRange: 'スピードは範囲を超えました',
    hintSinglePicDuring: '一枚画像の表示時間を入力してください',
    tipSinglePicDuring:
        '「テクスト＋画像」タイプの広告のみ有効です、範囲値は10-300sです',
    subTitleSinglePicDuring: '一枚画像表示時間(s)',
    toastSinglePicDuringOverOfRange: '時間は範囲値を超えました',
    hintTextPlayInterval: 'テクスト放送時間間隔を入力してください',
    tipTextPlayInterval:
        '「テクスト＋画像」タイプの広告のみ有効です、範囲値は1-300sです',
    subTitleTextPlayInterval: 'テクスト放送時間間隔(s)',
    toastTextPlayIntervalOverOfRange: '時間は範囲値を超えました',
    hintStationStayTime: '地点待機時間を入力してください、範囲値1-1000s',
    tipStationStayTime: '地点待機時間',
    subTitleStationStayTime: '地点待機時間(s)',
    toastStationStayTimeOverOfRange: '時間は範囲値を超えました',
    subLabelAutoGoNextStation:
        'オフにすると、手動に地点切り替えの必要があります、皿を回収するか、あるいはおやつを配るときにお勧めします',
    titleCruiseMode: '巡行モード',
    ttsCheckEstimate: '測位状態を検査してください',
    toastWillGoPosition: '間もなく%sに行きます',
    toastGoPosition: '%sに行きます',
    toastGoNextPosition: '次の地点へ行く',
    toastCruiseHasPaused: '巡行一時停止中',
    buttonContinueCruise: '巡行続行',
    buttonCancelCruise: 'タスク終了',
    modeWelcome: '接客モード',
    modeMeal: '配送モード',
    modeAutoDesk: 'テーブルサービスモード',
    modeLeading: '案内モード',
    ttsAvoid: [
        '私は仕事がありますから、通らせていただけませんか？',
        '私は行かなくちゃいけないんです、遅刻しちゃいますから。',
        'お客様に好かれるのは嬉しいですが、今は仕事しなくちゃいけません。',
        'ロボットをいじめないで、私を行かせてください',
        'すみません、少し道を空けてくれませんか？'
    ],
    ttsNavigationGlobalPathFailedPleaseEditMap:
        '目的地は到着できません、マップのマークを検査するか、またはロボットを通行可能の場所に押してください',
    ttsNavigationNotEstimate: '先ずは測位してください',
    ttsNavigationOutMap:
        '目的地は到着できません、マップのノイズを消すか、または再測位してください',
    ttsNavigationUnReachable:
        '道に迷いました、近くのコードターゲットの下に押して再試行してください',
    titleNavigationUnReachable: '道に迷いました',
    subTitleNavigationUnReachable:
        '近くのコードターゲットの下に押して再試行してください',
    errorCode: 'エラーコード: ',
    buttonRetry: '再試行',
    ttsWheelStop:
        'ホイール異常です\nホイールが詰まっていないか、またはロボットが過負荷になっていないかを確認してください \n問題を解決した後、「仕事に戻る」をタップしてロボットを復元します',
    titleWheelStop: 'ホイール異常です',
    subTitleWheelStop:
        'ホイールが詰まっていないか、またはロボットが過負荷になっていないかを確認してください \n問題を解決した後、「仕事に戻る」をタップしてロボットを復元します',
    buttonNoHandle: '今は取り扱わない',
    buttonRecovery: '仕事に戻る',

    // todo
    titleStartCruise: '巡行開始',
    toastCruiseRoutePointsUnReachable:
        '現在のルートは一部の地点に到着できません、ミニプログラムで再設定してください',
    toastCruiseNoRoute:
        '現在ルートは設定されていません、ミニプログラムで設定してください',
    ttsDelivery: '無料お菓子を食べませんか？',
    buttonCancel: 'キャンセル',
    tipTextInput: 'テクスト内容を入力してください',
    toastTextInput: '内容を入力してください',
    buttonConfirm: '確認',
    titleCruiseRoute: 'ルート',
    buttonClearRoute: 'ルート消去',
    buttonSelectRoute: 'タップして行く先を選んでください',
    titleCruiseRouteWillAdd: '未追加',
    toastPasswordError: 'パスワード不正解です',
    titlePleaseInputPassword: 'パスワードを入力してください',
    toastPasswordVerifyFailed: 'パスワード認証失敗しました',
    titlePleaseUseQrCodeGetRoute:
        'WeChatでスキャンして、ミニプログラムでルートを設定してください',
    avoidText: '私は通りません',
    avoidSubText: 'ちょっと道を譲ってくれませんか'
};
