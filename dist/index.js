"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrinterModes = exports.PrinterImagesModes = exports.BarcodeModes = exports.QrModes = exports.JustifyModes = void 0;
class Printer {
    constructor(printerName, config) {
        var _a, _b;
        this.printerName = printerName !== null && printerName !== void 0 ? printerName : "";
        this.textSpecial = (_a = config === null || config === void 0 ? void 0 : config.textSpecial) !== null && _a !== void 0 ? _a : false;
        this.textAsian = (_b = config === null || config === void 0 ? void 0 : config.textAsian) !== null && _b !== void 0 ? _b : false;
        this.key = config === null || config === void 0 ? void 0 : config.key;
        this.results = [];
    }
    setPrinterName(printerName) {
        this.printerName = printerName;
    }
    /**
     *  add the key to remove watermark
     */
    setKey(key) {
        this.key = key;
    }
    /**
     * for more compatibility with asian characters compatible with some printers
     */
    setPrinterTextAsian(value) {
        this.textAsian = value;
    }
    /**
     * the text rendered of this print instance is going to be printed as unicode
     */
    setPrinterTextSpecial(value) {
        this.textSpecial = value;
    }
    // Method to select print mode based on the mode string
    selectPrintMode(mode) {
        this.results.push({
            type: PrinterActionsTypes.selectPrintMode,
            payload: mode !== null && mode !== void 0 ? mode : undefined,
        });
    }
    /**
     * The `justifyCenter` function in TypeScript adds a command to the `results` array to center justify
     * text when printing.
     */
    justify(mode) {
        this.results.push({
            type: PrinterActionsTypes.justify,
            payload: mode,
        });
    }
    /**
     * The function `printBase64Image` adds a print action with a base64 image payload to a results array.
     * @param {string} imageBase64 - The `imageBase64` parameter in the `printBase64Image` function is a
     * string that represents an image encoded in Base64 format. This string contains the image data in a
     * format that can be easily transmitted and displayed.
     * @param {PrinterImagesModes} imageMode the imageMode (size)
     */
    printBase64Image(imageBase64, imageMode) {
        this.results.push({
            type: PrinterActionsTypes.printBase64Image,
            payload: imageBase64,
            extraData: imageMode !== null && imageMode !== void 0 ? imageMode : PrinterImagesModes.IMG_DEFAULT,
        });
    }
    /**
     * The `text` function in TypeScript adds a text payload to an array of results.
     * @param {string} text - The `text` parameter in the `public text(text: string): void` function is a
     * string type parameter. This function takes a string input and pushes an object with the type
     * `PrinterActionsTypes.text` and the `text` payload into the `results` array.
     */
    text(text) {
        this.results.push({
            type: this.textAsian
                ? PrinterActionsTypes.textAsian
                : PrinterActionsTypes.text,
            payload: text,
        });
    }
    /**
     *@param {string} value the value to print "ABC"
     *@param {BarcodeModes} mode barcode mode "BARCODE_CODE39" DEFAULT
     */
    barcode(value, mode) {
        this.results.push({
            type: PrinterActionsTypes.barcode,
            payload: value,
            extraData: mode,
        });
    }
    /**
     *@param {string} value the value for the qr "ABC"
     *@param {number} size Pixel size to use. Must be 1-16 (default 3)
     *@param {QrModes} model qr model "QR_MODEL_2" DEFAULT
     */
    qrCode(value, size, model) {
        this.results.push({
            type: PrinterActionsTypes.qrCode,
            payload: {
                content: value,
                size: size !== null && size !== void 0 ? size : 3,
                model: model !== null && model !== void 0 ? model : QrModes.QR_MODEL_2,
            },
        });
    }
    /**
     * The feed function in TypeScript adds a new item to the results array with a specified value and
     * type.
     * @param {number} value - The `value` parameter in the `feed` method represents the number of units to
     * feed in the printer. This value will be stored in the `payload` property of the object pushed into
     * the `results` array with the type `PrinterActionsTypes.feed`.
     */
    feed(value) {
        this.results.push({
            type: PrinterActionsTypes.feed,
            payload: value !== null && value !== void 0 ? value : undefined,
        });
    }
    setEmphasis(value) {
        this.results.push({
            type: PrinterActionsTypes.setEmphasis,
            payload: value,
        });
    }
    cut() {
        this.results.push({
            type: PrinterActionsTypes.cut,
        });
    }
    pulse() {
        this.results.push({
            type: PrinterActionsTypes.pulse,
        });
    }
    close() {
        this.results.push({
            type: PrinterActionsTypes.close,
        });
    }
    print() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = "http://localhost:8000/print";
            try {
                const response = yield fetch(url, {
                    method: "POST",
                    body: JSON.stringify({
                        key: this.key,
                        printer: this.printerName,
                        payload: this.results,
                        textSpecial: this.textSpecial,
                    }),
                });
                if (!response.ok) {
                    throw new Error("Failed to print");
                }
                else {
                    return {
                        success: true,
                    };
                }
            }
            catch (error) {
                throw new Error("Failed to print");
            }
        });
    }
    getPrinters() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = "http://localhost:8000/printers";
            try {
                const response = yield fetch(url);
                if (!response.ok) {
                    throw new Error("Failed getting printer list");
                }
                else {
                    const printersData = yield response.json();
                    return printersData;
                }
            }
            catch (error) {
                throw new Error("Failed getting printer list");
            }
        });
    }
}
var PrinterActionsTypes;
(function (PrinterActionsTypes) {
    PrinterActionsTypes["qrCode"] = "qrCode";
    PrinterActionsTypes["barcode"] = "barcode";
    PrinterActionsTypes["print"] = "print";
    PrinterActionsTypes["commands"] = "commands";
    PrinterActionsTypes["text"] = "text";
    PrinterActionsTypes["textAsian"] = "textAsian";
    PrinterActionsTypes["justify"] = "justify";
    PrinterActionsTypes["printBase64Image"] = "printBase64Image";
    PrinterActionsTypes["selectPrintMode"] = "selectPrintMode";
    PrinterActionsTypes["cut"] = "cut";
    PrinterActionsTypes["setEmphasis"] = "setEmphasis";
    PrinterActionsTypes["feed"] = "feed";
    PrinterActionsTypes["pulse"] = "pulse";
    PrinterActionsTypes["close"] = "close";
})(PrinterActionsTypes || (PrinterActionsTypes = {}));
var JustifyModes;
(function (JustifyModes) {
    JustifyModes["justifyCenter"] = "justifyCenter";
    JustifyModes["justifyLeft"] = "justifyLeft";
    JustifyModes["justifyRight"] = "justifyRight";
})(JustifyModes || (exports.JustifyModes = JustifyModes = {}));
var QrModes;
(function (QrModes) {
    QrModes["QR_MODEL_1"] = "QR_MODEL_1";
    QrModes["QR_MODEL_2"] = "QR_MODEL_2";
    QrModes["QR_MICRO"] = "QR_MICRO";
})(QrModes || (exports.QrModes = QrModes = {}));
var BarcodeModes;
(function (BarcodeModes) {
    BarcodeModes["BARCODE_UPCA"] = "BARCODE_UPCA";
    BarcodeModes["BARCODE_UPCE"] = "BARCODE_UPCE";
    BarcodeModes["BARCODE_JAN13"] = "BARCODE_JAN13";
    BarcodeModes["BARCODE_JAN8"] = "BARCODE_JAN8";
    BarcodeModes["BARCODE_CODE39"] = "BARCODE_CODE39";
    BarcodeModes["BARCODE_ITF"] = "BARCODE_ITF";
    BarcodeModes["BARCODE_CODABAR"] = "BARCODE_CODABAR";
})(BarcodeModes || (exports.BarcodeModes = BarcodeModes = {}));
var PrinterImagesModes;
(function (PrinterImagesModes) {
    PrinterImagesModes["IMG_DEFAULT"] = "IMG_DEFAULT";
    PrinterImagesModes["IMG_DOUBLE_HEIGHT"] = "IMG_DOUBLE_HEIGHT";
    PrinterImagesModes["IMG_DOUBLE_WIDTH"] = "IMG_DOUBLE_WIDTH";
})(PrinterImagesModes || (exports.PrinterImagesModes = PrinterImagesModes = {}));
var PrinterModes;
(function (PrinterModes) {
    PrinterModes["MODE_DOUBLE_WIDTH"] = "MODE_DOUBLE_WIDTH";
    PrinterModes["MODE_DOUBLE_HEIGHT"] = "MODE_DOUBLE_HEIGHT";
    PrinterModes["MODE_EMPHASIZED"] = "MODE_EMPHASIZED";
    PrinterModes["MODE_FONT_A"] = "MODE_FONT_A";
    PrinterModes["MODE_FONT_B"] = "MODE_FONT_B";
    PrinterModes["MODE_UNDERLINE"] = "MODE_UNDERLINE";
})(PrinterModes || (exports.PrinterModes = PrinterModes = {}));
exports.default = Printer;
