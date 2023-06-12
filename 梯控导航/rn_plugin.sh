#!/bin/bash

#支持的参数：【无参】true platform extra opk push
# 参数          例子	            		释义
#【无参】	sh rn_plugin.sh			打出biz包
#true		sh rn_plugin.sh true		打出biz包，更新图片
#platform	sh rn_plugin.sh platform	打出platform包
#platform biz	sh rn_plugin.sh platform biz	同时打出platform包和biz包
#extra		sh rn_plugin.sh extra		更新extra目录下的资源文件
#opk		sh rn_plugin.sh opk		打出opk包
#push		sh rn_plugin.sh push		安装dist目录下的opk

if [ $# != 0 ]; then
	echo "传入的参数为：$*"
fi

#从ftp服务器批量下载config文件
function downloadConfig() {
	ftp -v -n 10.60.242.16<<EOF
	user zhuoyani zhuoyani
	binary
	cd /libinbin
	lcd $PWD
	prompt
	mget *
	bye
EOF
}

#获取 opk的appid
appid=''
appidPath=''
function getAppid(){
	key="appid"
	re="\"($key)\": \"([^\"]*)\""
	while read -r l;
	do
    		if [[ $l =~ $re ]]; then
        		name="${BASH_REMATCH[1]}"
        		value="${BASH_REMATCH[2]}"
			appid=$value
			appidPath="sdcard/robot/rndata/$appid"
			echo "appid = $appid"
    		fi
	done<$PWD/package.json
}
getAppid

#创建bundle_output文件夹
bundleOutputPath=$PWD/bundle_output
if [ ! -d "$bundleOutputPath" ]; then
 mkdir "$bundleOutputPath"
 echo "创建bundle_output目录"
fi

rnBundleResult=0
#打出platform bundle包,并且push到对应的目录下
function platformBundle() {
	echo pick platform bundle
	react-native bundle --platform android --dev false --entry-file ./config2.js --bundle-output ./bundle_output/platform.android.bundle --assets-dest ./bundle_output/res/ --config ./config1.js --verbose
	rnBundleResult=$?
	if (($rnBundleResult));then
		#本次执行失败
		echo generate platform bundle failed,please check your code
	else
		#本次执行成功
		platformPath=$PWD/bundle_output/platform.android.bundle
		adb push $platformPath $appidPath
	fi
}

#打出biz bundle包，并且push到对应的目录下
function bizBundle() {
	generateManifest
	echo pick biz bundle
	react-native bundle --platform android --dev false --entry-file ./index.js --bundle-output ./bundle_output/biz.android.bundle --assets-dest ./bundle_output/res/ --config ./config3.js
	rnBundleResult=$?
	if (($rnBundleResult));then
                #本次执行失败
                echo generate biz bundle failed,please check your code
        else
                #本次执行成功
        	bizPath=$PWD/bundle_output/biz.android.bundle
        	adb push $bizPath $appidPath
        fi

}

#替换appid对应目录的drawable-hdpi下的图片
function replaceImg() {
	adb shell rm "$appidPath/drawable-mdpi/*"
	imgDirPath=$PWD/bundle_output/res/drawable-mdpi/
	for file in ` ls $imgDirPath `
	do
		adb push $imgDirPath"/"$file "$appidPath/drawable-mdpi/"
	done
}

#替换appid对应目录的extra下的资源
function replaceExtraFile() {
	adb shell rm "$appidPath/extra/*"
	extraPath=$PWD/extraResource/
        for file in ` ls $extraPath `
        do
                adb push $extraPath"/"$file "$appidPath/extra/"
        done

}

#暂停
function get_char()
{
  SAVEDSTTY=`stty -g`
  stty -echo
  stty raw
  dd if=/dev/tty bs=1 count=1 2> /dev/null
  stty -raw
  stty echo
  stty $SAVEDSTTY
}

#判断是否打包成功，来决定要不要退出bash，重启rn进程
function finallyHandle() {
        if (($rnBundleResult)); then
                #打包失败
                echo '请按任意键继续...'
                get_char
        else
                #打包成功
                adb shell am force-stop com.ainirobot.moduleapp
                adb shell am start -n com.ainirobot.moduleapp/com.ainirobot.platform.react.EveActivity
                exit 1
        fi
}

#打opk包
function opk() {
	orionos-cli pack --multiBundle false --extraEnable true --type plugin  --buildVersion true
	rnBundleResult=$?
}

#把dist目录下的opk push到appid目录，并执行安装
function pushOpkInstall() {
	if [ ! -d "$PWD/dist" ]; then
		opk
	fi
	opkDirPath=$PWD/dist/
	for file in ` ls  $opkDirPath`
	do
		if echo "$file" | grep -q -E '\.opk$'; then
			opkPath="$opkDirPath$file"
			echo "opkPath=$opkPath"
			adb shell rm -r $appidPath
			adb push $opkPath sdcard/robot/rndata/
			adb shell am broadcast -a com.ainirobot.install.plugin --es path "sdcard/robot/rndata/$file" --es host "system_f46e7debff0c847f57474351787a6dfa"
			finallyHandle
		fi
	done

}

#第一次运行plugin opk，会生成common_manifest.txt文件
function generateManifest() {
	if [ ! -f "$PWD/common_manifest.txt" ]; then
        	react-native bundle --platform android --dev false --entry-file ./config2.js --bundle-output ./bundle_output/platform.android.bundle --assets-dest ./bundle_output/res/ --config ./config1.js --verbose
	else
        	echo common_manifest.txt exsit
	fi
}

#安装node_modules
function installNodeModules() {
	nodeModulesPath=$PWD/node_modules
	if [ ! -d $nodeModulesPath ]; then
		npm i
	fi
}

#如果config文件中有一个不存在，那么从ftp服务器下载
if [ ! -f "$PWD/config1.js" ] || [ ! -f "$PWD/config2.js" ] || [ ! -f "$PWD/config3.js" ]; then
	downloadConfig
	downloadResult=$?
	echo "download result=$downloadResult"
	if (($downloadResult)); then
		brew install inetutils
		brew install telnet
		brew link --overwrite inetutils
		downloadConfig
	fi
fi


installNodeModules
#判断参数，打出不同的bundle包
if [ $# = 0 ]; then
	# 无参，直接打出biz bundle
	bizBundle
else
	if [ $1 = "platform" ]; then
		platformBundle
		if [ $# = 2 ] && [ $2 = "biz" ]; then
			bizBundle
		fi
	elif [ $1 = "true" ]; then
		bizBundle
		if (($rnBundleResult)); then
			echo "biz failed, don't push img"
		else
			replaceImg
		fi
	elif [ $1 = "extra" ]; then
		replaceExtraFile
	elif [ $1 = "opk" ]; then
		opk
	elif [ $1 = "push" ]; then
		pushOpkInstall
	else
        	bizBundle
	fi

fi
finallyHandle

