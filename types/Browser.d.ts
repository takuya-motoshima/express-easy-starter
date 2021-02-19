export default class {
    /**
     * Returns browser information
     */
    static parse(ua: string): {
        platform: string;
        osName: string;
        osVersion: number | null;
        browserName: string;
    };
}
