/*
 *  Copyright (C) 2017 OrionStar Technology Project
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

package com.example.myfirstapp.fragment;

import android.content.Context;
import android.os.RemoteException;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;

import androidx.fragment.app.Fragment;

//import com.ainirobot.base.analytics.utils.StringUtil;
//import com.ainirobot.coreservice.client.Definition;
//import com.ainirobot.coreservice.client.RobotApi;
//import com.ainirobot.coreservice.client.listener.ActionListener;
//import com.ainirobot.coreservice.client.listener.CommandListener;
//import com.ainirobot.coreservice.client.listener.Person;
//import com.ainirobot.coreservice.client.person.PersonApi;
//import com.ainirobot.coreservice.client.person.PersonListener;
//import com.ainirobot.coreservice.client.person.PersonUtils;
import com.ainirobot.lib.shadowopk.RobotMessengerManager;
import com.example.myfirstapp.LogTools;
import com.example.myfirstapp.R;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class VisionFragment extends BaseFragment {
    private static String TRACE_FACE = "traceFace";
    private static String STOP_TRACE_FACE = "stopTraceFace";

    @Override
    public View onCreateView(Context context) {
        View root = mInflater.inflate(R.layout.fragment_vision_layout,null,false);
        initViews(root);
        return root;
    }

    private String action = "";

    public void initViews(View root){
        Button traceFaceBtn = root.findViewById(R.id.trace_face_btn);
        Button stopTraceFaceBtn = root.findViewById(R.id.stop_trace_face_btn);
        traceFaceBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    /**
                     * ???????????????????????? tts ????????? opk demo ?????????????????????????????????????????? MRobotMessenger ???????????????
                     */
                    JSONObject json = new JSONObject();
                    json.put("command", "traceFace");
                    json.put("text", "trace face");
                    RobotMessengerManager.INSTANCE.triggerCommand(json.toString());
                    //RobotApi.getInstance().moveHead(reqId++, "relative", "relative", 0, -10, mMotionListener);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                //action = TRACE_FACE;
                //registerPersonListener();
            }
        });

        stopTraceFaceBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
            try {
                /**
                 * ???????????????????????? tts ????????? opk demo ?????????????????????????????????????????? MRobotMessenger ???????????????
                 */
                JSONObject json = new JSONObject();
                json.put("command", "stopTraceFace");
                json.put("text", "stop trace face");
                RobotMessengerManager.INSTANCE.triggerCommand(json.toString());
                //RobotApi.getInstance().moveHead(reqId++, "relative", "relative", 0, -10, mMotionListener);
            } catch (JSONException e) {
                e.printStackTrace();
            }
                //action = STOP_TRACE_FACE;
                //registerPersonListener();
            }
        });
    }

    /**
     *
     */
    private void registerPersonListener(){
        //PersonApi.getInstance().registerPersonListener(mListener);
    }

    int reqID = 0;
    /**
     * Use this to get all persons from robot visual ability
     * ????????????????????????????????????????????????????????????????????????????????????????????????
     */
    /*private PersonListener mListener = new PersonListener() {
        @Override
        public void personChanged() {
            super.personChanged();
            final List<Person> allFaceList = PersonApi.getInstance().getAllPersons();
            LogTools.info("Found faces,count:"+allFaceList.size());
            //get best person face to register
            //?????????????????????????????????
            final Person person = PersonUtils.getBestFace(allFaceList);
            if(person == null){
                LogTools.info("No good face found | ???????????????????????????????????????");
                return;
            }
            //stop find people
            //????????????
            PersonApi.getInstance().unregisterPersonListener(mListener);

            //get the face from network
            //??????????????????????????????
            RobotApi.getInstance().getPictureById(reqID++,person.getId(),1,new CommandListener(){
                @Override
                public void onResult(int result, String message) {
                    try {
                        JSONObject json = new JSONObject(message);
                        String status = json.optString("status");
                        //?????????????????? get picture success
                        if (Definition.RESPONSE_OK.equals(status)) {
                            JSONArray pictures = json.optJSONArray("pictures");
                            if (TextUtils.isEmpty(pictures.optString(0))) {
                                LogTools.info("No good face picture found | ???????????????????????????????????????");
                            }
                            else{
                                String picturePath = pictures.optString(0);
                                List<String> facePics = new ArrayList<>();
                                facePics.add(picturePath);

                                RobotApi.getInstance().getPersonInfoFromNet(reqID++, person.getUserId(), facePics, new CommandListener() {
                                    @Override
                                    public void onResult(int result, String message, String extraData) {
                                        try {
                                            JSONObject json = new JSONObject(message);
                                            JSONObject info = json.getJSONObject("data").getJSONObject("people");
                                            if(StringUtil.isNullOrEmpty(info.getString("user_id"))){
                                                LogTools.info("Person Unregister | gender:"+info.getString("gender"));
                                                if(action == REGISTER){
                                                    registerPerson(person);
                                                }
                                            }
                                            else{
                                                LogTools.info("Person Found:"+info.getString("name")+"|gender:"+info.getString("gender"));
                                            }
                                        } catch (JSONException | NullPointerException e) {
                                            e.printStackTrace();
                                        }
                                    }

                                    @Override
                                    public void onStatusUpdate(int status, String data, String extraData) {
                                        LogTools.info("status"+status+" | data:"+data +" | extraData" + extraData);
                                    }
                                });
                            }
                        }
                        else{
                            LogTools.info("Can not found best face picture");
                        }
                    } catch (JSONException | NullPointerException e) {
                        e.printStackTrace();
                    }
                }
            });
            reqID++;
        }
    };*/
    /*private void registerPerson(Person person){
        //Register People, replace personName to your own person name or guid
        //??????????????????personName?????????????????????????????????????????????GUID
        RobotApi.getInstance().startRegister(reqID,"Person"+reqID,20000,5,2,new ActionListener() {
            @Override
            public void onResult(int status, String response) throws RemoteException {
                if (Definition.RESULT_OK != status) {
                    //Register failed
                    //????????????
                    LogTools.info("Register failed:"+status+"|"+response);
                    return;
                }
                try {
                    JSONObject json = new JSONObject(response);
                    String remoteType = json.optString(Definition.REGISTER_REMOTE_TYPE);
                    String remoteName = json.optString(Definition.REGISTER_REMOTE_NAME);
                    if (Definition.REGISTER_REMOTE_SERVER_EXIST.equals(remoteType)) {
                        //user exists
                        //?????????????????????
                        LogTools.info("Register failed:user exists");
                    } else if (Definition.REGISTER_REMOTE_SERVER_NEW.equals(remoteType)) {
                        //register success
                        LogTools.info("Register success");
                        //?????????????????????
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });
    }*/

    /**
     * unregister
     * ????????????????????????
     */
    @Override
    public void onDestroyView() {
        super.onDestroyView();
        //PersonApi.getInstance().unregisterPersonListener(mListener);
    }

    public static Fragment newInstance() {
        return new com.example.myfirstapp.fragment.VisionFragment();
    }
}
