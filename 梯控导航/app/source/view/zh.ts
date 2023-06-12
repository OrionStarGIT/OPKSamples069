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
import { BubbleView } from 'orionos-eve-core';
// import { ListView } from '../../biz/home/ListView';
// import { StandardView } from '../../biz/home/StandardView';
// import { CardView } from '../../biz/home/CardView';
// import { QueryLocationView } from '../../biz/leading/querylocation/ui/QueryLocationView';

export default {
    // standard: StandardView,
    // list: ListView,
    // card: CardView,
    // queryLocation: QueryLocationView,

    //LetterPlayer字幕显示最大字符数
    letterMaxChar: 9,

    //LetterPlayer字幕分割方式 - 'word' 单词分割  'char' 字符分割
    letterSplitMode: 'char',

    isShowBubble: true,
    showScreenTextView: true,

    isShowLetter: true,

    //图片路径
    // guideStart: require('../../../img/guide/img_guide_start.png'),
    // guideCurrent: require('../../../img/guide/img_guide_current.png'),
    // guideEnd: require('../../../img/guide/img_guide_end.png'),
    // hotImage: require('../../../img/guide/jjy_hot_img.png'),
    // popupPlay: require('../../../img/chat/popup_play_btn.png'),
    // popupStop: require('../../../img/chat/popup_stop_btn.png'),

    //小机器人动效文件
    // robotAnimation: require('../../../lottie/robot-data.json'),

    //首页title字符限制
    homeTitleLimit: 6
};
