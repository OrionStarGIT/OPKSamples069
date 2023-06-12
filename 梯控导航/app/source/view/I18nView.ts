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

import en from './en';
import zh from './zh';
import I18n from '../res/I18n';

const lookup = function(locale: string) {
    let locales = [];
    locales.push(locale);
    // 'zh-TW' 'zh-GD'都按'zh-CN'来处理
    if (locale.startsWith('zh')) {
        locales.push('zh-CN');
    }
    let parts = locale.split('-');

    if (parts.length === 3) {
        locales.push([parts[0], parts[1]].join('-'));
        locales.push(parts[0]);
    } else if (parts.length === 2) {
        locales.push(parts[0]);
    }

    //全部找不到，默认中文 注释原因英文环境下还能播放中文广告
    //locales.push('zh');

    return locales;
};

const translations = {
    en: en,
    zh: zh
};

const I18nView = {
    t: function(res: string) {
        let locales = lookup(I18n.locale);
        while (locales.length) {
            let locale: any = locales.shift();
            let views = translations[locale];
            if (!views) {
                continue;
            }
            return views[res];
        }
    },

    locales: function() {
        return lookup(I18n.locale);
    },

    lookup(data: Map<string, any>) {
        let locales = I18nView.locales();
        console.log('I18nView locales ' + locales);
        while (locales.length) {
            let locale: any = locales.shift();
            locale = locale.replace('-', '_');
            if (data.has(locale)) {
                return data.get(locale);
            }
        }
    }
};

export default I18nView;
