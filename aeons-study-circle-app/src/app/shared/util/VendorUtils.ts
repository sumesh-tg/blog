export class VendorUtils {
    static possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890&$#@";
    public static makeRandom(lengthOfCode: number) {
        let text = "";
        for (let i = 0; i < lengthOfCode; i++) {
            text += this.possible.charAt(Math.floor(Math.random() * this.possible.length));
        }
        return text;
    }
}


