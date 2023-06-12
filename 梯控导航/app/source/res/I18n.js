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

I18n.t = I18n.translate;

export default I18n;
