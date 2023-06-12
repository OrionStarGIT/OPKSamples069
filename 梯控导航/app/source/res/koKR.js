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
        '빰빠바바밤,다시 움직일 수 있습니다',
        '경로를 알려주시면 순찰 도우미 나서겠습니다'
    ],
    settings: '설정',
    opkChange: '앱 전환',
    meal: '서빙',
    welcomeText: '홍보',
    leading: '안내',
    desk: '테이블 서비스',
    toastSetTwoPlaceAtLeast: '최소 두개 위치를 설정하세요',
    toastNoAdvertRes: '현재 광고자원이 없습니다',
    faceSensitivityName: ['저', '중', '고'],
    labelCruiseSpeed: '순찰 속도 설정',
    titleBaseSettings: '기본 설정',
    titleAdvertSettings: '광고 방송 설정',
    titleAdvanceSettings: '고급 설정',
    labelSinglePicDuring: '사진 한 장의 표시 시간',
    labelAutoGoNextStation: '다음 장소로 자동 이동',
    suLabelAutoGoNextStation:
        '스위치를 비활성화하게 되면 수동으로 위치를 전환해야 합니다, 식기 되찾기 혹은 셀프용품 배분 시 사용 추천',
    labelTtsPlayInterval: '문자 방송 시간 간격',
    labelStationStayTime: '위치 체류 시간',
    labelSearchPerson: '동적 홍보',
    subLabelSearchPerson: '순찰 과정에 사람을 인식하면 홍보모드로 자동 전환',
    labelFaceSensitivity: '안면인식 정밀도',
    labelCruiseRoute: '순찰 경로 설정',
    tipCruiseSpeedSet: '값 제한범위는 0.1~0.85m/s이고，0.7m/s를 추천합니다',
    titleCruiseSpeedSet: '순찰 속도 (m/s)',
    toastCruiseSpeedOverOfRange: '속도는 값 제한범위를 초과했습니다',
    hintSinglePicDuring: '사진 한 장의 표시 시간을 입력하세요',
    tipSinglePicDuring:
        '"문자 방송+사진"식 광고에만 적용합니다，값 제한범위:10-300s',
    subTitleSinglePicDuring: '사진 한 장의 표시 시간 (s)',
    toastSinglePicDuringOverOfRange: '시간은 값 제한범위를 초과했습니다',
    hintTextPlayInterval: '문자 방송 시간 간격을 입력하세요',
    tipTextPlayInterval:
        '"문자 방송+사진"식 광고에만 적용합니다，값 제한범위:1-300s',
    subTitleTextPlayInterval: '문자 방송 시간 간격 (s)',
    toastTextPlayIntervalOverOfRange: '시간은 값 제한범위를 초과했습니다',
    hintStationStayTime: '체류 시간을 입력하세요,값 제한범위:1-1000s',
    tipStationStayTime: '위치 체류 시간',
    subTitleStationStayTime: '위치 체류 시간(s)',
    toastStationStayTimeOverOfRange: '시간은 값 제한범위를 초과했습니다',
    subLabelAutoGoNextStation:
        '스위치를 비활성화하게 되면 수동으로 위치를 전환해야 합니다, 식기 되찾기 혹은 셀프 용품 배분 시 사용 추천',
    titleCruiseMode: '순찰 모드',
    ttsCheckEstimate: '포지셔닝이 성공했는지 확인하세요',
    toastWillGoPosition: '%s로 가겠습니다',
    toastGoPosition: '%s로 이동 중',
    toastGoNextPosition: '다음 장소로 이동',
    toastCruiseHasPaused: '순찰이 일시 정지했습니다',
    buttonContinueCruise: '계속 순찰',
    buttonCancelCruise: '미션 완료',
    modeWelcome: '홍보모드',
    modeMeal: '서빙모드',
    modeAutoDesk: '테이블 서비스 모드',
    modeLeading: '안내모드',
    ttsAvoid: [
        '제가 갈 길을 막아주네요, 제 전면에 서 있지 마십시오',
        '로봇이 자니갈 수 있도록 잠시 비켜주시겠어요',
        '저 좀 지나갈 수 있게 잠시 비켜주시겠어요',
        '잠시 비켜주세요',
        '좀 비켜주시겠어요'
    ],
    ttsNavigationGlobalPathFailedPleaseEditMap:
        '목표위치에 도착할 수 없습니다,맵 표시를 점검하거나 로봇을 통행 가능 장소로 이동해주세요',
    ttsNavigationNotEstimate: '포지셔닝부터 하세요',
    ttsNavigationOutMap:
        '목표위치에 도착할 수 없습니다，맵 노이즈를 지우거나 다시 포지셔닝하세요',
    ttsNavigationUnReachable:
        '경로를 잃었습니다, 로봇을 근처의 위치코드로 밀어 다시 시도하세요',
    titleNavigationUnReachable: '경로를 잃었습니다',
    subTitleNavigationUnReachable:
        '로봇을 근처의 위치코드로 밀어 다시 시도하세요',
    errorCode: '에러 코드: ',
    buttonRetry: '다시 시도',
    ttsWheelStop:
        '로봇 바퀴가 불안정합니다.\n바퀴에 이물질이 걸리거나 혹은 과부하 상태인지 확인해 주세요.\n문제가 해결되면 “작업 다시 시작”버튼을 눌러주세요',
    titleWheelStop: '로봇 바퀴가 불안정합니다.',
    subTitleWheelStop:
        '바퀴에 이물질이 걸리거나 혹은 과부하 상태인지 확인해 주세요.\n문제가 해결되면 “작업 다시 시작”버튼을 눌러주세요.',
    buttonNoHandle: '나중에 처리',
    buttonRecovery: '작업 다시 시작',

    // todo
    titleStartCruise: '순찰 시작',
    toastCruiseRoutePointsUnReachable:
        '현재 순찰 경로에서 일부 위치에 도착할 수 없습니다, 미니 프로그램에서 설정하세요',
    toastCruiseNoRoute:
        '현재 순찰 경로를 설정하지 않았습니다,미니 프로그램에서 설정하세요.',
    ttsDelivery: '무료 반찬은 셀프입니다',
    buttonCancel: '취소',
    tipTextInput: '문자 내용을 입력하세요',
    toastTextInput: '내용을 입력하세요',
    buttonConfirm: '확인',
    titleCruiseRoute: '주행경로',
    buttonClearRoute: '경로 삭제',
    buttonSelectRoute: '탭해서 위치를 선택하세요',
    titleCruiseRouteWillAdd: '추가하세요',
    toastPasswordError: '잘못한 비밀번호',
    titlePleaseInputPassword: '비밀번호를 입력하세요',
    toastPasswordVerifyFailed: '비밀번호 수정 실패',
    titlePleaseUseQrCodeGetRoute:
        '위챗으로 스캔해서 미니 프로그램에서 경로를 설정하세요',
    avoidText: '지나갈 수 없습니다',
    avoidSubText: '잠시 비켜주세겠어요?'
};
