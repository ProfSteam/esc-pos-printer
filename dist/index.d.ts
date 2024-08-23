declare class Printer {
    private results;
    private printerName;
    private textSpecial;
    private textAsian;
    private key?;
    constructor(printerName?: string, config?: {
        textAsian?: boolean;
        textSpecial?: boolean;
        key?: string;
    });
    setPrinterName(printerName: string): void;
    /**
     *  add the key to remove watermark
     */
    setKey(key: string): void;
    /**
     * for more compatibility with asian characters compatible with some printers
     */
    setPrinterTextAsian(value: boolean): void;
    /**
     * the text rendered of this print instance is going to be printed as unicode
     */
    setPrinterTextSpecial(value: boolean): void;
    selectPrintMode(mode?: PrinterModes): void;
    /**
     * The `justifyCenter` function in TypeScript adds a command to the `results` array to center justify
     * text when printing.
     */
    justify(mode: JustifyModes): void;
    /**
     * The function `printBase64Image` adds a print action with a base64 image payload to a results array.
     * @param {string} imageBase64 - The `imageBase64` parameter in the `printBase64Image` function is a
     * string that represents an image encoded in Base64 format. This string contains the image data in a
     * format that can be easily transmitted and displayed.
     * @param {PrinterImagesModes} imageMode the imageMode (size)
     */
    printBase64Image(imageBase64: string, imageMode?: PrinterImagesModes): void;
    /**
     * The `text` function in TypeScript adds a text payload to an array of results.
     * @param {string} text - The `text` parameter in the `public text(text: string): void` function is a
     * string type parameter. This function takes a string input and pushes an object with the type
     * `PrinterActionsTypes.text` and the `text` payload into the `results` array.
     */
    text(text: string): void;
    /**
     *@param {string} value the value to print "ABC"
     *@param {BarcodeModes} mode barcode mode "BARCODE_CODE39" DEFAULT
     */
    barcode(value: string, mode?: BarcodeModes): void;
    /**
     *@param {string} value the value for the qr "ABC"
     *@param {number} size Pixel size to use. Must be 1-16 (default 3)
     *@param {QrModes} model qr model "QR_MODEL_2" DEFAULT
     */
    qrCode(value: string, size?: number, model?: QrModes): void;
    /**
     * The feed function in TypeScript adds a new item to the results array with a specified value and
     * type.
     * @param {number} value - The `value` parameter in the `feed` method represents the number of units to
     * feed in the printer. This value will be stored in the `payload` property of the object pushed into
     * the `results` array with the type `PrinterActionsTypes.feed`.
     */
    feed(value?: number): void;
    setEmphasis(value: boolean): void;
    cut(): void;
    pulse(): void;
    close(): void;
    print(): Promise<{
        success: boolean;
    }>;
    getPrinters(): Promise<string[] | []>;
}
export declare enum JustifyModes {
    justifyCenter = "justifyCenter",
    justifyLeft = "justifyLeft",
    justifyRight = "justifyRight"
}
export declare enum QrModes {
    QR_MODEL_1 = "QR_MODEL_1",
    QR_MODEL_2 = "QR_MODEL_2",
    QR_MICRO = "QR_MICRO"
}
export declare enum BarcodeModes {
    BARCODE_UPCA = "BARCODE_UPCA",
    BARCODE_UPCE = "BARCODE_UPCE",
    BARCODE_JAN13 = "BARCODE_JAN13",
    BARCODE_JAN8 = "BARCODE_JAN8",
    BARCODE_CODE39 = "BARCODE_CODE39",
    BARCODE_ITF = "BARCODE_ITF",
    BARCODE_CODABAR = "BARCODE_CODABAR"
}
export declare enum PrinterImagesModes {
    IMG_DEFAULT = "IMG_DEFAULT",
    IMG_DOUBLE_HEIGHT = "IMG_DOUBLE_HEIGHT",
    IMG_DOUBLE_WIDTH = "IMG_DOUBLE_WIDTH"
}
export declare enum PrinterModes {
    MODE_DOUBLE_WIDTH = "MODE_DOUBLE_WIDTH",
    MODE_DOUBLE_HEIGHT = "MODE_DOUBLE_HEIGHT",
    MODE_EMPHASIZED = "MODE_EMPHASIZED",
    MODE_FONT_A = "MODE_FONT_A",
    MODE_FONT_B = "MODE_FONT_B",
    MODE_UNDERLINE = "MODE_UNDERLINE"
}
export default Printer;
