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

import I18n from 'react-native-i18n';
import en from './en';
import zhCN from './zhCN';
import koKR from './koKR';
import ja from './ja';
import zhTW from './zhTW';
import zhGD from './zhGD';

// I18n.defaultLocale = 'zh-CN';

I18n.fallbacks = true;

I18n.defaultLocale = 'zh-CN';

I18n.translations = {
    en: en,
    'zh-CN': zhCN,
    ko: koKR,
    ja: ja,
    'zh-TW': zhTW,
    'zh-GD': zhGD
};

export default {
    locale: I18n.locale,
    settings: I18n.t('settings'),
    opkChange: I18n.t('opkChange'),
    meal: I18n.t('meal'),
    welcomeText: I18n.t('welcomeText'),
    leading: I18n.t('leading'),
    desk: I18n.t('desk'),
    plateRecycling: I18n.t('plateRecycling'),
    warningTitlePathInvalid: I18n.t('warningTitlePathInvalid'),
    warningSubTitlePathInvalid: I18n.t('warningSubTitlePathInvalid'),
    warningTitleRobotOutOfPath: I18n.t('warningTitleRobotOutOfPath'),
    warningSubTitleRobotOutOfPath: I18n.t('warningSubTitleRobotOutOfPath'),
    waringTitleTargetOutOfPath: I18n.t('waringTitleTargetOutOfPath'),
    warningSubTitleTargetOutOfPath: I18n.t('warningSubTitleTargetOutOfPath'),
    chargePoint: I18n.t('chargePoint'),
    chargePile: I18n.t('chargePile'),
    locationPoint: I18n.t('locationPoint'),
    elevatorCenterPoint: I18n.t('elevatorCenterPoint'),
    elevatorGatePoint: I18n.t('elevatorGatePoint'),
    meetingRoom: I18n.t('meetingRoom'),
    cafeRoom: I18n.t('cafeRoom'),
    financeOffice: I18n.t('financeOffice'),
    bathroom: I18n.t('financeOffice'),
    estimatedTime: I18n.t('estimatedTime'),
    hour: I18n.t('hour'),
    minute: I18n.t('minute'),
    disinfecting: I18n.t('disinfecting'),
    remainingTime: I18n.t('remainingTime'),
    progress: I18n.t('progress'),
    onDisinfecting: I18n.t('onDisinfecting'),
    gocharging: I18n.t('gocharging'),
    atomization_gear: I18n.t('atomization_gear'),
    heigh_speed: I18n.t('heigh_speed'),
    long_endurance: I18n.t('long_endurance'),
    onStatusChecking: I18n.t('onStatusChecking'),
    stopCharging: I18n.t('stopCharging'),
    goToCharge: I18n.t('goToCharge'),
    dryToCharge: I18n.t('dryToCharge'),
    disinfectionPlan: I18n.t('disinfectionPlan'),
    useDisinfectionPlan: I18n.t('useDisinfectionPlan'),
    manage: I18n.t('manage'),
    add: I18n.t('add'),
    delete: I18n.t('delete'),
    editPlan: I18n.t('editPlan'),
    buttonCancel: I18n.t('buttonCancel'),
    buttonConfirm: I18n.t('buttonConfirm'),
    starTime: I18n.t('starTime'),
    endTime: I18n.t('endTime'),
    xdRoute: I18n.t('xdRoute'),
    pleaseSelect: I18n.t('pleaseSelect'),
    route: I18n.t('route'),
    routeNull: I18n.t('routeNull'),
    fixedPointDisinfection: I18n.t('fixedPointDisinfection'),
    fixedPointDisinfectionTip: I18n.t('fixedPointDisinfectionTip'),
    close: I18n.t('close'),
    open: I18n.t('open'),
    FixedPointResidenceTime: I18n.t('FixedPointResidenceTime'),
    disinfectionTip1: I18n.t('disinfectionTip1'),
    disinfectionTip2: I18n.t('disinfectionTip2'),
    disinfectionTip3: I18n.t('disinfectionTip3'),
    disinfectionTip4: I18n.t('disinfectionTip4'),
    save: I18n.t('save'),
    selectTimeTip: I18n.t('selectTimeTip'),
    routeTip: I18n.t('routeTip'),
    everyday: I18n.t('everyday'),
    stopChargingTts: I18n.t('stopChargingTts'),
    inputTip: I18n.t('inputTip'),
    inputError: I18n.t('inputError'),
    starTimeIllegal: I18n.t('starTimeIllegal'),
    endTimeIllegal: I18n.t('endTimeIllegal'),
    timeConflict: I18n.t('timeConflict'),
    remaining: I18n.t('remaining'),
    chargingTts: I18n.t('chargingTts'),
    stopChargingToast: I18n.t('stopChargingToast'),
    noScheduleTaskWorking: I18n.t('noScheduleTaskWorking'),
    gearModalList: I18n.t('gearModalList'),
    fullGearModalList: I18n.t('fullGearModalList'),
    startChargingTts: I18n.t('startChargingTts'),
    getOutElevatorTts: I18n.t('getOutElevatorTts'),
    enterElevatorTts: I18n.t('enterElevatorTts'),
    warningSubtitleNavElevatorMapRong: I18n.t('warningSubtitleNavElevatorMapRong'),
    arriveElevatorCenterTurnTts: I18n.t('arriveElevatorCenterTurnTts')

};
