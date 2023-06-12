
export class ScheduleTask {

    public startTime: string;

    public endTIme: string;

    public routeId: string;

    public _isPointDisinfect: boolean;

    public pointWaitTime: number;

    public isShowDelete: boolean = false;

    public isDelete: boolean = false;

    /**
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @param routeId 路线
     * @param isPointDisinfect 是否定点消毒
     * @param pointWaitTIme 等待时间
     */
    public constructor(startTime: string, endTime: string, routeId: string, isPointDisinfect: boolean, pointWaitTIme: number){

        this.startTime = startTime;
        this.endTIme = endTime;
        this.routeId = routeId;
        this._isPointDisinfect = isPointDisinfect;
        this.pointWaitTime = pointWaitTIme;
        this.isShowDelete = false;
        this.isDelete = false;
    }
}