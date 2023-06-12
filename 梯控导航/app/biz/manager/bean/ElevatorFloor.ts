import { ElevatorPose } from "./ElevatorPose";

/**
 * 梯控楼层类
 */
export class ElevatorFloor {

    public floorIndex: number;  //楼层序号

    public floorAlias: string; //楼层别名

    public poseList: ElevatorPose[] | undefined;

    public constructor(floorIndex: number, floorAlias: string, poseList?: ElevatorPose[]) {
        this.floorIndex = floorIndex;
        this.floorAlias = floorAlias;
        if(poseList){
            this.poseList = poseList;
        }
    }

    public setPoseList(poseList: ElevatorPose[]){
        this.poseList = poseList;
    }

}