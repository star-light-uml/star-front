export class Utils {
    public static getValue(str: string): number {
        if ( str == null) {
            return 0;
        }
        if (str.endsWith("px")) {
            str = str.substring(0, str.length - 2);
        }
        return +str;
    }
}
