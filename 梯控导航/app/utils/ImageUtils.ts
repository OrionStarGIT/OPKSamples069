import I18ns from '../source/res/I18ns';

export class ImageUtils {
    public static getImageURIByName(name: string): number {
        if (name === I18ns.meetingRoom) {
            return 1;
        } else if (name === I18ns.cafeRoom) {
            return 2;
        } else if (name === I18ns.financeOffice) {
            return 3;
        } else if (name === I18ns.bathroom) {
            return 4;
        } else {
            return 0;
        }
    }
}
