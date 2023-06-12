/**
 * 梯控地点类
 */
export class ElevatorPose {
    
    public poseName: string; //地点名

    public floorIndex: number;  //楼层序号

    public floorAlias: string; //楼层别名

    public constructor(poseName: string, floorIndex: number, floorAlias: string) {
        this.poseName = poseName;
        this.floorIndex = floorIndex;
        this.floorAlias = floorAlias;
    }

}