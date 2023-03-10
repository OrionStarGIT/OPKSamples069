package com.example.myfirstapp.fragment;

import android.Manifest;
import android.content.Context;
import android.os.Bundle;
import android.os.Environment;
import android.text.TextUtils;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import androidx.fragment.app.Fragment;

//import com.ainirobot.coreservice.client.Definition;
//import com.ainirobot.coreservice.client.RobotApi;
//import com.ainirobot.coreservice.client.StatusListener;
//import com.ainirobot.coreservice.client.actionbean.PlaceBean;
//import com.ainirobot.coreservice.client.listener.ActionListener;
//import com.ainirobot.coreservice.client.listener.CommandListener;
import com.ainirobot.lib.shadowopk.RobotMessengerManager;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.JSONObject;
import com.example.myfirstapp.MainActivity;
import com.example.myfirstapp.R;
import com.example.myfirstapp.application.MRobotMessenger;
import com.example.myfirstapp.maputils.Constant;
import com.example.myfirstapp.maputils.DialogConfirm;
import com.example.myfirstapp.maputils.DialogUtils;
import com.example.myfirstapp.maputils.GlobalData;
import com.example.myfirstapp.maputils.MapppUtils;
import com.example.myfirstapp.maputils.Pose2d;
import com.example.myfirstapp.maputils.PoseBean;
import com.example.myfirstapp.maputils.RoverMap;
import com.example.myfirstapp.maputils.SpecialPlaceUtil;
import com.example.myfirstapp.view.MapView;
import com.google.gson.reflect.TypeToken;
import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;

public class NavFragment extends Fragment {

    private MapView mMapView;
    private final static String MAP_DIR = "/robot/map";
    private final static String ROBOT_MAP_DIR = Environment.getExternalStorageDirectory() + MAP_DIR;
    private final static String MAP_PGM = "pgm.zip";
    public static boolean isCreatingMap = false;
    private static final String TAG = "NavFragment";
    private TextView mBackView;
    private boolean mIsEstimate;
    private RoverMap mRoverMap;
    private String placeName1;
    private static NavFragment navfragment;
    private Context message;

    public static NavFragment getInstance() { return navfragment;};

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View root = inflater.inflate(R.layout.fragment_nav, null, false);
        requestPermissions(new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE}, 1);
        initView(root);
        addFragmentListener();
        return root;
    }

    private void addCurrentPositionListener() {
        try {
            /**
             * ???????????????????????? tts ????????? opk demo ?????????????????????????????????????????? MRobotMessenger ???????????????
             */
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("command", "currentPosition");
            map.put("text", "get the current position");
            RobotMessengerManager.INSTANCE.triggerCommand(JSON.toJSONString(map));
            Log.i("SHADOW_OPK", "onMessengerReady 4");
            MRobotMessenger.getInstance().setRobotCallback(new MRobotMessenger.RobotCallback() {
                @Override
                public void onResult(String result) {
                    Log.i("SHADOW_OPK", "??????callback??????addCurrentPositionListener: " + result);
                    mMapView.post(new Runnable() {
                        @Override
                        public void run() {
                            setCurrentPosition(result);
                        }
                    });

                }
            });
            //RobotApi.getInstance().moveHead(reqId++, "relative", "relative", 0, -10, mMotionListener);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private void setCurrentPosition(String result) {
        JSONObject jsonObj = JSON.parseObject(result);
        String mapName = jsonObj.getString("curMapName");
        if (mapName != "" && mapName != null) {
            /*
             * setOrigin
             * ???????????????????????????
             * Set the current position of the robot
             * */
            String poseStr = jsonObj.getString("pose");
            Log.i("SHADOW_OPK", "????????????????????????: " + poseStr + "   ????????????curMapName??????" + mapName);
            JSONObject poseObject = JSON.parseObject(poseStr);
            mMapView.setOrigin(MapppUtils.pose2PixelByRoverMap(this.mRoverMap, new Pose2d(poseObject.getDouble("px"),
                    poseObject.getDouble("py"),
                    poseObject.getDouble("theta"),
                    0)));
        }

    }

    private void addFragmentListener() {
        try {
            /**
             * ???????????????????????? tts ????????? opk demo ?????????????????????????????????????????? MRobotMessenger ???????????????
             */
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("command", "map");
            map.put("text", "get the map");
            RobotMessengerManager.INSTANCE.triggerCommand(JSON.toJSONString(map));
            Log.i("SHADOW_OPK", "onMessengerReady 41");
            MRobotMessenger.getInstance().setRobotCallback(new MRobotMessenger.RobotCallback() {
                @Override
                public void onResult(String result) {
                    Log.i("SHADOW_OPK", "??????callback??????addFragmentListener: " + result);
                    mMapView.post(new Runnable() {
                        @Override
                        public void run() {
                            getMap(result);
                        }
                    });

                }
            });
            //RobotApi.getInstance().moveHead(reqId++, "relative", "relative", 0, -10, mMotionListener);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private void setCurPose(String pose) {
    }

    private void initView(View root) {
        mMapView = root.findViewById(R.id.map_view);
        mBackView = root.findViewById(R.id.edit_back);
        /*
         * ?????????????????????
         * Get the current map name
         * */
/*        RobotApi.getInstance().getMapName(0, new CommandListener() {
            @Override
            public void onResult(int result, String message, String extraData) {
                super.onResult(result, message, extraData);
                if (!TextUtils.isEmpty(message)) {
                    //message???????????????
                    getMap(message);
                }
            }
        });*/

        mBackView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                stopNavigation();
                MainActivity.getInstance().switchFragment(MainFragment.newInstance());
            }
        });

        mMapView.setMode(MapView.MapMode.POINT);
        /*
         * ??????MapView??????????????????
         * registOnPlaceClickListener
         * */
        mMapView.registOnPlaceClickListener(mOnPlaceClickListener);
    }


    /*
     * getMap
     * ??????????????????
     * ???????????????????????????????????????????????????????????????????????????????????????
     * Get the current map
     * The map has current robot position information, direction coordinates and clickable navigation positions
     * */
    private void getMap(String result) {
        JSONObject jsonObj = JSON.parseObject(result);
        String mapName = jsonObj.getString("mapName");
        if (mapName != "") {
            String mapPath = ROBOT_MAP_DIR + File.separator + mapName + File.separator + MAP_PGM;
            this.mRoverMap = MapppUtils.loadMap(mapPath);
            if (this.mRoverMap != null) {
                mMapView.setBitmap(this.mRoverMap.bitmap);
                Log.d(TAG, "this.mRoverMap.res: " + this.mRoverMap.res);
                mMapView.setResolution(this.mRoverMap.res);
            } else {
                Log.d(TAG, "parse map fail");
            }
            GlobalData.getInstance().setEditMapData(mMapView, this.mRoverMap);

            /*
             * setOrigin
             * ???????????????????????????
             * Set the current position of the robot
             * */
/*            String poseStr = jsonObj.getString("pose");
            Log.i("SHADOW_OPK", "????????????????????????: " + poseStr);
            JSONObject poseObject = JSON.parseObject(poseStr);
            mMapView.setOrigin(MapppUtils.pose2PixelByRoverMap(this.mRoverMap, new Pose2d(poseObject.getDouble("px"),
                    poseObject.getDouble("py"),
                    poseObject.getDouble("theta"),
                    0)));*/

            this.addCurrentPositionListener();

            /*
             * setPoseBeans
             * ?????????????????????????????????
             * Set the position lists of the robot
             * */
            String poseBeanStr = jsonObj.getString("poseBeanList");
            Log.i("SHADOW_OPK", "poseBeanStr????????????: " + poseBeanStr);
            JSONArray array = JSON.parseArray(poseBeanStr);
            List<PoseBean> poseBeans = new ArrayList<>();
            int length=array.size();
            for(int i=0;i<length;i++){
                JSONObject oneObj = array.getJSONObject(i);
                String placeName = oneObj.getString("name");
                Double x = oneObj.getDouble("x");
                Double y = oneObj.getDouble("y");
                Double theta = oneObj.getDouble("theta");
                Log.i("SHADOW_OPK", "oneObj?????????: " + oneObj + "   ;X=???" + x + "   ;y=:" + y +"   ;theta=:" + theta);
                poseBeans.add(new PoseBean(placeName,
                        MapppUtils.pose2PixelByRoverMap(this.mRoverMap
                                , new Pose2d(x,
                                        y,
                                        theta,
                                        0))));
            }
            mMapView.setPoseBeans(poseBeans);
            GlobalData.getInstance().setPoseBeanList(poseBeans, true);
        }

        /*
         * getInternationalPlaceList
         * ?????????????????????
         * Get map location point
         * */
/*        List<PoseBean> poseBeans = new ArrayList<>();
        try {
            Gson gson = new Gson();
            List<PlaceBean> placeBeanList = gson.fromJson(message, new TypeToken<List<PlaceBean>>() {
            }.getType());
            for (PlaceBean placeBean : placeBeanList) {
                if (SpecialPlaceUtil.isChargingPoint(placeBean) ||
                        (RobotApi.getInstance().isChargePileExits() &&
                                SpecialPlaceUtil.isNavigatorPoint(
                                        Constant.NavigatorPoint.POINT2,
                                        placeBean))) {
                    continue;
                }
                String placename = placeBean.getPlaceName();
                if (null != placename) {
                    poseBeans.add(new PoseBean(placename,
                            MapppUtils.pose2PixelByRoverMap(mRoverMap
                                    , new Pose2d(placeBean.getPointX(),
                                            placeBean.getPointY(),
                                            placeBean.getPointTheta(),
                                            placeBean.getPlaceStatus()))));
                }

                *//*
                 * setOrigin
                 * ???????????????????????????
                 * Set the current position of the robot
                 * *//*
                mMapView.setOrigin(MapppUtils.pose2PixelByRoverMap(mRoverMap, new Pose2d(placeBean.getPointX(),
                        placeBean.getPointY(),
                        placeBean.getPointTheta(),
                        placeBean.getPlaceStatus())));
            }
            mMapView.setPoseBeans(poseBeans);
            GlobalData.getInstance().setPoseBeanList(poseBeans, true);
        } catch (Exception e) {
            e.printStackTrace();
        }*/
    }

    /*
     * OnPlaceClickListener
     * ???????????????????????????
     * Click on the map location to monitor
     * */
    MapView.OnPlaceClickListener mOnPlaceClickListener = new MapView.OnPlaceClickListener() {
        @Override
        public void onPlaceClick(final String placeName) {
            DialogUtils.showGoNavigation(getContext(), placeName,
                    new DialogConfirm.ConfirmCallBack() {
                        @Override
                        public void confirmClick() {
                            //placeName1 = placeName;
                            startNavigation(placeName);
                        }
                    }, new DialogConfirm.CancelBtnCallBack() {
                        @Override
                        public void cancelClick() {
                            Toast.makeText(getContext(), "????????????", Toast.LENGTH_SHORT).show();
                        }
                    });
        }
    };

    /**
     * startNavigation
     * ?????????????????????
     */
    public static void startNavigation(String placeName) {
        /**
         * ???????????????????????? tts ????????? opk demo ?????????????????????????????????????????? MRobotMessenger ???????????????
         */
        JSONObject params = new JSONObject();
        params.put("coordinate_deviation", 0.5); //?????????????????????????????????????????????????????????????????????0.5???
        params.put("moving_timeout_time", 20000); //???????????????????????????????????????20000??????????????????????????????????????????????????????
        params.put("max_avoid_count", 5); //?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????5???
        params.put("avoid_interval_time", 1000); //???????????????????????????????????????1000??????
        params.put("auto_reset_estimate", true); //??????????????????????????????????????????????????????????????????????????????true
        params.put("param_reset_estimate_count", 5); //??????????????????????????????5???
        params.put("get_distance_interval_time", 1000); //???????????????????????????????????????1000??????
        params.put("param_linear_speed", 0.3); //???????????????????????????????????????0.1-1.2 m/s
        params.put("param_angular_speed", 1); //???????????????????????????????????????0.2-1.8 rad/s???1rad=180??/???????? 57.3?????
        params.put("param_is_adjust_angle", true); //??????????????????????????????????????????????????????????????????????????????????????????true ???????????????false ????????????????????????????????????false
        params.put("param_is_need_avoid_notify_immediately", false); //?????????????????????????????????????????????false ???1.34.0???????????????
        params.put("param_destination_range", 0); //???????????????????????????????????????????????????????????????????????????0??????1.34.0????????????)

        JSONObject json = new JSONObject();
        json.put("command", "gotoMapSite");
        json.put("text", placeName);
        json.put("params", params);
        RobotMessengerManager.INSTANCE.triggerCommand(json.toString());
        //RobotApi.getInstance().startNavigation(0, placeName, 1.5, 10 * 1000, mNavigationListener);
    }

    /**
     * stopNavigation
     * ???????????????????????????
     */
    private void stopNavigation() {
        /**
         * ???????????????????????? tts ????????? opk demo ?????????????????????????????????????????? MRobotMessenger ???????????????
         */
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("command", "stopMapSite");
        map.put("text", "stop goto the map site");
        RobotMessengerManager.INSTANCE.triggerCommand(JSON.toJSONString(map));
        //RobotApi.getInstance().stopNavigation(0);
    }

    private boolean isCurrentMap() {
        return TextUtils.equals(placeName1,
                GlobalData.getInstance().getCurrentMapName());
    }

    @Override
    public void onStart() {
        super.onStart();
        if (isCurrentMap()) {
/*            RobotApi.getInstance().registerStatusListener(
                    Constant.CoreDef.POSE_LISTEN, mStatusPoseListener);

            mIsEstimate = RobotApi.getInstance().isRobotEstimate();
            RobotApi.getInstance().registerStatusListener(
                    Definition.STATUS_POSE_ESTIMATE, mEstimateStateListen);*/
        }
    }

    @Override
    public void onStop() {
        super.onStop();
        //RobotApi.getInstance().unregisterStatusListener(mStatusPoseListener);
        //RobotApi.getInstance().unregisterStatusListener(mEstimateStateListen);
    }

    /*private StatusListener mStatusPoseListener = new StatusListener() {
        long preTime = System.currentTimeMillis();

        @Override
        public void onStatusUpdate(String type, String value) {
            Pose2d pose2d = GsonUtil.fromJson(value, Pose2d.class);
            long curTime = System.currentTimeMillis();
            if (curTime - preTime > 2500) {
                preTime = curTime;
                Log.d(TAG, "onStatusUpdate. " + pose2d);
            }
            GlobalData.getInstance().setNewestLocation(pose2d);
            onMapPose2d(pose2d);
        }
    };*/

    private void onMapPose2d(final Pose2d pose2d) {
        if (null != mRoverMap) {
            if (mIsEstimate) {
                mMapView.setOrigin(MapppUtils.pose2PixelByRoverMap(mRoverMap, pose2d));
//                mMapView.setResolution(mRoverMap.res);
            }
        }
    }

    /*private StatusListener mEstimateStateListen = new StatusListener() {
        @Override
        public void onStatusUpdate(String type, final String data) {
            Log.d(TAG, "onStatusUpdate type = " + type + ", data = " + data);
            try {
                JSONObject jsonObject = new JSONObject(data);
                mIsEstimate = jsonObject.optBoolean("isPoseEstimate", false);
            } catch (Exception e) {
                mIsEstimate = false;
            }
            if (!mIsEstimate) {
                mMapView.setOrigin(null);
            }
        }
    };

    private static ActionListener mNavigationListener = new ActionListener() {

        @Override
        public void onResult(int status, String response) throws RemoteException {

            switch (status) {
                case Definition.RESULT_OK:
                    if ("true".equals(response)) {
                        LogTools.info("startNavigation result: " + status + "(Navigation success)" + " message: " + response);
                        LogTools.info("startNavigation result: " + status + "(????????????)" + " message: " + response);
                    } else {
                        LogTools.info("startNavigation result: " + status + "(Navigation failed)" + " message: " + response);
                        LogTools.info("startNavigation result: " + status + "(????????????)" + " message: " + response);
                    }
                    break;
                default:
                    break;
            }
        }

        @Override
        public void onError(int errorCode, String errorString) throws RemoteException {
            switch (errorCode) {
                case Definition.ERROR_NOT_ESTIMATE:
                    LogTools.info("onError result: " + errorCode + "(not estimate)" + " message: " + errorString);
                    LogTools.info("onError result: " + errorCode + "(???????????????)" + " message: " + errorString);
                    break;
                case Definition.ERROR_IN_DESTINATION:
                    LogTools.info("onError result: " + errorCode + "(in destination, no action)" + " message: " + errorString);
                    LogTools.info("onError result: " + errorCode + "(??????????????????????????????????????????)" + " message: " + errorString);
                    break;
                case Definition.ERROR_DESTINATION_NOT_EXIST:
                    LogTools.info("onError result: " + errorCode + "(destination not exist)" + " message: " + errorString);
                    LogTools.info("onError result: " + errorCode + "(????????????????????????)" + " message: " + errorString);
                    break;
                case Definition.ERROR_DESTINATION_CAN_NOT_ARRAIVE:
                    LogTools.info("onError result: " + errorCode + "(avoid timeout, can not arrive)" + " message: " + errorString);
                    LogTools.info("onError result: " + errorCode + "(?????????????????????????????????????????????????????????????????????)" + " message: " + errorString);
                    break;
                case Definition.ACTION_RESPONSE_ALREADY_RUN:
                    LogTools.info("onError result: " + errorCode + "(already started, please stop first)" + " message: " + errorString);
                    LogTools.info("onError result: " + errorCode + "(????????????????????????????????????????????????????????????)" + " message: " + errorString);
                    break;
                case Definition.ACTION_RESPONSE_REQUEST_RES_ERROR:
                    LogTools.info("onError result: " + errorCode + "(wheels are busy for other actions, please stop first)" + " message: " + errorString);
                    LogTools.info("onError result: " + errorCode + "(??????????????????????????????????????????????????????????????????????????????)" + " message: " + errorString);
                    break;
                default:
                    break;
            }
        }

        @Override
        public void onStatusUpdate(int status, String data) throws RemoteException {
            switch (status) {
                case Definition.STATUS_NAVI_AVOID:
                    LogTools.info("onStatusUpdate result: " + status + "(can not avoid obstacles)" + " message: " + data);
                    LogTools.info("onStatusUpdate result: " + status + "(????????????????????????????????????)" + " message: " + data);
                    break;
                case Definition.STATUS_NAVI_AVOID_END:
                    LogTools.info("onStatusUpdate result: " + status + "(Obstacle removed)" + " message: " + data);
                    LogTools.info("onStatusUpdate result: " + status + "(??????????????????)" + " message: " + data);
                    break;
                default:
                    break;
            }
        }
    };*/

    public static Fragment newInstance() {
        return new com.example.myfirstapp.fragment.NavFragment();
    }
}