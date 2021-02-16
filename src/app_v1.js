var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
/**
 * Resizing logic*****************************************************************************************************
 * The ratio of the containerAspectRatio_div is defined with 46/32 = 1.4375
 */
var containerAspectRatio_div = document.getElementById('containerAspectRatio_div');
var masterStyle_style = document.getElementById('masterStyle_style');
var initialRatio_number = Math.round(window.innerWidth / window.innerHeight * 100) / 100;
var resizeWindow = function (first_boolean) {
    var iH_number = window.innerHeight;
    var iW_number = window.innerWidth;
    var currentRatio_number = Math.round(iH_number / iW_number * 100) / 100;
    /**
        Function only resizes application when screenRatio changes.
        When the user is zooming, innerWidth and innerHeight will change but the ratio innerWidth/innerHeight stays the same.
    */
    if ((currentRatio_number !== initialRatio_number && iH_number > 200 && iW_number > 400) || first_boolean) {
        initialRatio_number = currentRatio_number;
        var pFontSize = 0;
        var h1FontSize = 0;
        var h2FontSize = 0;
        var h3FontSize = 0;
        var h4FontSize = 0;
        var textareaFontSize = 0;
        var borderSize = 0;
        var borderRadius = 0;
        var fontSize_string = '';
        var borderRadius_string = '';
        /**
         * If the application fills the entire width of the screen, the size of the application must also be calculated
         * using the width. And vice versa.
         */
        if (iH_number * 46 / 32 > iW_number) {
            containerAspectRatio_div.style.width = iW_number + "px";
            containerAspectRatio_div.style.height = iW_number / 1.4375 + "px";
            // containerAspectRatio_div.style.left = '0px';
            pFontSize = iW_number / 100 * 1.2;
            h1FontSize = iW_number / 100 * 1.4;
            h2FontSize = iW_number / 100 * 3;
            h3FontSize = iW_number / 100 * 1;
            h4FontSize = iW_number / 100 * 2.5;
            textareaFontSize = iW_number / 100 * 1.4;
            borderSize = iW_number / 100 * 0.01;
            borderRadius = iW_number / 100 * 0.7;
        }
        else {
            containerAspectRatio_div.style.width = iH_number * 1.4375 + "px";
            containerAspectRatio_div.style.height = iH_number + "px";
            // containerAspectRatio_div.style.left = String((window.innerWidth-height_number*1.4375)/2) + "px";
            pFontSize = iH_number / 100 * 1.2 * 1.4375;
            h1FontSize = iH_number / 100 * 1.4 * 1.4375;
            h2FontSize = iH_number / 100 * 3 * 1.4375;
            h3FontSize = iH_number / 100 * 1 * 1.4375;
            h4FontSize = iH_number / 100 * 2.5 * 1.4375;
            textareaFontSize = iH_number / 100 * 1.4 * 1.4375;
            borderSize = iH_number / 100 * 0.01 * 1.4375;
            borderRadius = iH_number / 100 * 0.7 * 1.4375;
        }
        fontSize_string =
            "p{font-size: " + pFontSize + "px;}\n                h1{font-size: " + h1FontSize + "px;}\n                h2{font-size: " + h2FontSize + "px;}\n                h3{font-size: " + h3FontSize + "px;}\n                h4{font-size: " + h4FontSize + "px;}\n                .textareaFontSize{font-size: " + textareaFontSize + "px;}\n                .inputFontSize{font-size: " + h2FontSize + "px;}\n                input.romElement{font-size: " + pFontSize + "px;}";
        borderRadius_string =
            ".borderBox{border-width: " + borderSize + "px;}\n                .rounded{ border-radius: " + borderRadius + "px;}\n                .topLeft{border-top-left-radius: " + borderRadius + "px;}\n                .topRight{border-top-right-radius: " + borderRadius + "px;}\n                .bottomLeft{border-bottom-left-radius: " + borderRadius + "px;}\n                .bottomRight{border-bottom-right-radius: " + borderRadius + "px;}\n                .lightRounded{border-radius: " + borderRadius / 2 + "px;}";
        masterStyle_style.innerHTML = fontSize_string + borderRadius_string;
    }
};
window.addEventListener('DOMContentLoaded', function () {
    resizeWindow(true);
});
window.addEventListener('resize', function () {
    resizeWindow(false);
});
/***************************************************global Variables***************************************************/
var isFullscreen = false;
var settingsDisplayed_boolean = true;
var ioInputDisplayed_boolean = false;
var editRom_boolean = false;
var ANIMATION_SPEED = 3;
var IDLETIME = 400;
var NOANIMATIONIDLETIME = 15;
var FRAMES = 60;
/***************************************************DOM-selectors***************************************************/
var getHtmlElement = function (id_string) { return document.getElementById(id_string); };
var mc8_div = getHtmlElement('mc8_div');
//control unit
var assemblerCommand_p = getHtmlElement('assemblerCommand_p');
var stepNumber_p = getHtmlElement('stepNumber_p');
var stepDescription_p = getHtmlElement('stepDescription_p');
var stepNumberBg_div = getHtmlElement('stepNumberBg_div');
//arrows
var registerArrow_div = getHtmlElement('registerArrow_div');
var irArrow_div = getHtmlElement('irArrow_div');
var movingFlagsArrow_div = getHtmlElement('movingFlagsArrow_div');
var cFlagArrow_div = getHtmlElement('cFlagArrow_div');
var checkJumpArrow_div = getHtmlElement('checkJumpArrow_div');
//io input pop ups
var io1InputWindow_div = getHtmlElement('io1InputWindow_div');
var io2InputWindow_div = getHtmlElement('io2InputWindow_div');
var io3InputWindow_div = getHtmlElement('io3InputWindow_div');
var io1Input_input = getHtmlElement('io1Input_input');
var io2Input_input = getHtmlElement('io2Input_input');
var io3Input_input = getHtmlElement('io3Input_input');
//moving elements
var movingObject_h2 = getHtmlElement('movingObject_h2');
var movingFlags_div = getHtmlElement('movingFlags_div');
var movingAlu1 = getHtmlElement('movingAlu1_h2');
var movingAlu2 = getHtmlElement('movingAlu2_h2');
//yellow register background element
var yellowBgElement_div = getHtmlElement('yellowBgElement_div');
//rom/ram variable memory blocks
var lastRomLabel_div = document.getElementById('lastRomLabel_div');
var lastRomLabel_p = document.getElementById('lastRomLabel_p');
var middleRamLabel_div = document.getElementById('middleRamLabel_div');
var middleRamLabel_p = document.getElementById('middleRamLabel_p');
/***************************************************basic functions***************************************************/
var convertHexToNumber = function (hexValue_string) {
    return parseInt(hexValue_string, 16);
};
var convertNumberToHex_4digits = function (value_number) {
    var str = value_number.toString(16);
    str = str.toUpperCase();
    var len = str.length;
    for (var i = 4; i > len; i--) {
        str = '0' + str;
    }
    return str;
};
var convertNumberToHex_2digits = function (value_number) {
    var str = value_number.toString(16);
    str = str.toUpperCase();
    var len = str.length;
    for (var i = 2; i > len; i--) {
        str = '0' + str;
    }
    return str;
};
var convertNumberTo8DigitsBinaryString = function (value_number) {
    var str = (value_number).toString(2);
    var len = str.length;
    if (len != 8) {
        for (var i = 0; i < 8 - len; i++) {
            str = '0' + str;
        }
    }
    str = str[0] + str[1] + str[2] + str[3] + ' ' + str[4] + str[5] + str[6] + str[7];
    return str;
};
var convertNumberToBinaryArray = function (value_number) {
    var bin = convertNumberTo8DigitsBinaryString(value_number).replace(' ', '');
    var buf = [];
    for (var i = 0; i < bin.length; i++) {
        buf.push(Number(bin[i]));
    }
    return buf;
};
var convertBinaryToNumber = function (binValue_string) {
    return Number("0b" + binValue_string);
};
var convertNumberToComplementOnTwo = function (value_number) {
    if (value_number > 127) {
        value_number = value_number - 256;
    }
    return value_number;
};
var checkValidHex = function (hexValue_string) {
    var allowedChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    var check = true;
    hexValue_string = hexValue_string.toUpperCase();
    for (var i = 0; i < hexValue_string.length; i++) {
        for (var j = 0; j < allowedChar.length; j++) {
            if (hexValue_string[i] === allowedChar[j]) {
                check = true;
                break;
            }
            else {
                check = false;
            }
        }
        if (!check)
            return false;
    }
    return true;
};
var calculateChecksum = function (intelHexFormat_string) {
    intelHexFormat_string = intelHexFormat_string.replace(':', '');
    var sum = 0;
    var recordLength = convertHexToNumber(intelHexFormat_string[0] + intelHexFormat_string[1]);
    var checksumIncluded = 0;
    /**
     * IntelHexFormat:  :-03-0006-00-215544-3d (startCode-byteCount-Address-recordType-data-checksum)
     */
    if (intelHexFormat_string.length > 2 + 4 + 2 + recordLength * 2) {
        checksumIncluded = 2;
    }
    for (var i = 0; i < 2 + 4 + 2 + recordLength * 2 + checksumIncluded; i = i + 2) {
        sum += convertHexToNumber(intelHexFormat_string[i] + intelHexFormat_string[i + 1]);
    }
    sum = convertNumberToHex_4digits(sum);
    sum = convertHexToNumber(sum[2] + sum[3]);
    var bin_array = convertNumberToBinaryArray(Math.abs(sum));
    var one_array = [0, 0, 0, 0, 0, 0, 0, 1];
    var carry_array = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var sum_array = [0, 0, 0, 0, 0, 0, 0, 0];
    //invert bin_array
    for (var i = 0; i < bin_array.length; i++) {
        if (bin_array[i] === 1) {
            bin_array[i] = 0;
        }
        else
            bin_array[i] = 1;
    }
    //add one to bin_array
    for (var i = 8; i > 0; i--) {
        if (bin_array[i - 1] + one_array[i - 1] + carry_array[i] === 1) {
            carry_array[i - 1] = 0;
            sum_array[i - 1] = 1;
        }
        else if (bin_array[i - 1] + one_array[i - 1] + carry_array[i] === 2) {
            carry_array[i - 1] = 1;
            sum_array[i - 1] = 0;
        }
        else if (bin_array[i - 1] + one_array[i - 1] + carry_array[i] === 3) {
            carry_array[i - 1] = 1;
            sum_array[i - 1] = 1;
        }
    }
    sum = convertNumberToHex_2digits(convertBinaryToNumber(sum_array.join('')));
    return sum;
};
/*************************************************** ALU operations ***************************************************/
var setFlags = function (value_number, binValue_array, binCarry_array, setC, setZ, setP, setV, setS) {
    //carry flag
    if (setC) {
        FLAGS.c_number = binCarry_array[0];
    }
    else {
        FLAGS.c_number = '-';
    }
    //zero flag
    if (setZ) {
        if (value_number === 0)
            FLAGS.z_number = 1;
        else
            FLAGS.z_number = 0;
    }
    else {
        FLAGS.z_number = '-';
    }
    //sing flag
    if (setS) {
        FLAGS.s_number = binValue_array[0];
    }
    else {
        FLAGS.s_number = '-';
    }
    //parity flag
    if (setP) {
        var cnt = 0;
        for (var i = 0; i < binValue_array.length; i++) {
            if (binValue_array[i])
                cnt += 1;
        }
        if (cnt % 2 === 0)
            FLAGS.p_number = 1;
        else
            FLAGS.p_number = 0;
    }
    //overflow flag
    else if (setV) {
        if ((binCarry_array[0] === 1 && binCarry_array[1] === 0) || (binCarry_array[0] === 0 && binCarry_array[1] === 1))
            FLAGS.p_number = 1;
        else
            FLAGS.p_number = 0;
    }
    else {
        FLAGS.p_number = '-';
    }
};
var addBinary = function (value1_number, value2_number, replacementAddition_boolean) {
    var value1_bin = convertNumberToBinaryArray(value1_number);
    var value2_bin = convertNumberToBinaryArray(value2_number);
    var carry_bin = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var sum_bin = [0, 0, 0, 0, 0, 0, 0, 0];
    var sum_number = 0;
    if (replacementAddition_boolean) {
        carry_bin[8] = 1;
        for (var i = 0; i < value2_bin.length; i++) {
            if (value2_bin[i] === 0)
                value2_bin[i] = 1;
            else
                value2_bin[i] = 0;
        }
    }
    for (var i = 8; i > 0; i--) {
        if (value1_bin[i - 1] + value2_bin[i - 1] + carry_bin[i] === 1) {
            carry_bin[i - 1] = 0;
            sum_bin[i - 1] = 1;
        }
        else if (value1_bin[i - 1] + value2_bin[i - 1] + carry_bin[i] === 2) {
            carry_bin[i - 1] = 1;
            sum_bin[i - 1] = 0;
        }
        else if (value1_bin[i - 1] + value2_bin[i - 1] + carry_bin[i] === 3) {
            carry_bin[i - 1] = 1;
            sum_bin[i - 1] = 1;
        }
    }
    sum_number = convertBinaryToNumber(sum_bin.join(''));
    //set Flags
    setFlags(sum_number, sum_bin, carry_bin, 1, 1, 0, 1, 1);
    //if the addition was a replace-addition switch sign-flag
    if (replacementAddition_boolean) {
        if (FLAGS.c_number)
            FLAGS.c_number = 0;
        else
            FLAGS.c_number = 1;
    }
    return sum_number;
};
var incBinary = function (value_number) {
    var result = addBinary(value_number, 1, false);
    FLAGS.c_number = '-';
    return result;
};
var decBinary = function (value_number) {
    var result = addBinary(value_number, 1, true);
    FLAGS.c_number = '-';
    return result;
};
var andBinary = function (value1_number, value2_number) {
    var value1_bin = convertNumberToBinaryArray(value1_number);
    var value2_bin = convertNumberToBinaryArray(value2_number);
    var result_bin = [0, 0, 0, 0, 0, 0, 0, 0];
    var result = 0;
    for (var i = 8; i > 0; i--) {
        if (value1_bin[i - 1] && value2_bin[i - 1]) {
            result_bin[i - 1] = 1;
        }
    }
    result = convertBinaryToNumber(result_bin.join(''));
    setFlags(result, result_bin, [0], 1, 1, 1, 0, 1);
    return result;
};
var orBinary = function (value1_number, value2_number) {
    var value1_bin = convertNumberToBinaryArray(value1_number);
    var value2_bin = convertNumberToBinaryArray(value2_number);
    var result_bin = [0, 0, 0, 0, 0, 0, 0, 0];
    var result = 0;
    for (var i = 8; i > 0; i--) {
        if (value1_bin[i - 1] || value2_bin[i - 1]) {
            result_bin[i - 1] = 1;
        }
    }
    result = convertBinaryToNumber(result_bin.join(''));
    setFlags(result, result_bin, [0], 1, 1, 1, 0, 1);
    return result;
};
var xorBinary = function (value1_number, value2_number) {
    var value1_bin = convertNumberToBinaryArray(value1_number);
    var value2_bin = convertNumberToBinaryArray(value2_number);
    var result_bin = [0, 0, 0, 0, 0, 0, 0, 0];
    var result = 0;
    for (var i = 8; i > 0; i--) {
        if (value1_bin[i - 1] ^ value2_bin[i - 1]) {
            result_bin[i - 1] = 1;
        }
    }
    result = convertBinaryToNumber(result_bin.join(''));
    setFlags(result, result_bin, [0], 1, 1, 1, 0, 1);
    return result;
};
var shlBinary = function (value_number) {
    var value_bin = convertNumberToBinaryArray(value_number);
    var result = 0;
    var firstBit = value_bin[0];
    for (var i = 0; i < value_bin.length - 1; i++) {
        value_bin[i] = value_bin[i + 1];
    }
    value_bin[7] = 0;
    result = convertBinaryToNumber(value_bin.join(''));
    setFlags(result, value_bin, [firstBit], 1, 1, 1, 0, 1);
    return result;
};
var shrBinary = function (value_number) {
    var value_bin = convertNumberToBinaryArray(value_number);
    var result = 0;
    var lastBit = value_bin[7];
    for (var i = 7; i > 0; i--) {
        value_bin[i] = value_bin[i - 1];
    }
    value_bin[0] = 0;
    result = convertBinaryToNumber(value_bin.join(''));
    setFlags(result, value_bin, [lastBit], 1, 1, 1, 0, 1);
    return result;
};
var rclBinary = function (value_number) {
    var value_bin = convertNumberToBinaryArray(value_number);
    var result = 0;
    //save bit position 7 for setFlags ( [7,6,5,4,3,2,1,0])
    var carry = value_bin[0];
    //shift all bits left
    for (var i = 0; i < value_bin.length - 1; i++) {
        value_bin[i] = value_bin[i + 1];
    }
    //write carry-flag in bit position 0 
    value_bin[7] = FLAGS.c_number;
    result = convertBinaryToNumber(value_bin.join(''));
    //set flags
    setFlags(result, value_bin, [carry], 1, 0, 0, 0, 0);
    return result;
};
var rolBinary = function (value_number) {
    var value_bin = convertNumberToBinaryArray(value_number);
    var result = 0;
    //save bit position 7 for setFlags [7,6,5,4,3,2,1,0]
    //                                  ^
    var carry = value_bin[0];
    //shift all bits left
    for (var i = 0; i < value_bin.length - 1; i++) {
        value_bin[i] = value_bin[i + 1];
    }
    //write former bit 7 in bit position 0 
    value_bin[7] = carry;
    result = convertBinaryToNumber(value_bin.join(''));
    setFlags(result, value_bin, [carry], 1, 0, 0, 0, 0);
    return result;
};
var rcrBinary = function (value_number) {
    var value_bin = convertNumberToBinaryArray(value_number);
    var result = 0;
    //save bit position 0 for setFlags ([7,6,5,4,3,2,1,0])
    var carry = value_bin[7];
    for (var i = 7; i > 0; i--) {
        value_bin[i] = value_bin[i - 1];
    }
    //write carry-flag into bit 7
    value_bin[0] = FLAGS.c_number;
    result = convertBinaryToNumber(value_bin.join(''));
    setFlags(result, value_bin, [carry], 1, 0, 0, 0, 0);
    return result;
};
var rorBinary = function (value_number) {
    var value_bin = convertNumberToBinaryArray(value_number);
    var result = 0;
    //save bit position 0 for setFlags ([7,6,5,4,3,2,1,0])
    var carry = value_bin[7];
    for (var i = 7; i > 0; i--) {
        value_bin[i] = value_bin[i - 1];
    }
    //write former bit 0 into bit 7
    value_bin[0] = carry;
    result = convertBinaryToNumber(value_bin.join(''));
    setFlags(result, value_bin, [carry], 1, 0, 0, 0, 0);
    return result;
};
/***************************************************Classes***************************************************/
var PlayStatus = /** @class */ (function () {
    function PlayStatus() {
        this.play = false;
        this.stop = true;
        this.pause = false;
        this.oneCommand = false;
        this.noAnim = false;
        this.completeExe = false;
        this.rocketSpeed = false;
    }
    PlayStatus.prototype.setPlay = function () {
        this.play = true;
        this.stop = false;
        this.pause = false;
    };
    PlayStatus.prototype.setPause = function () {
        this.play = false;
        this.stop = false;
        this.pause = true;
    };
    PlayStatus.prototype.setStop = function () {
        this.play = false;
        this.stop = true;
        this.pause = false;
    };
    PlayStatus.prototype.setOneCommand = function () {
        this.oneCommand = true;
    };
    PlayStatus.prototype.setCompleteExecution = function () {
        this.noAnim = true;
        this.completeExe = true;
    };
    PlayStatus.prototype.setNoAnimation = function () {
        this.noAnim = true;
        this.completeExe = false;
    };
    PlayStatus.prototype.setRocketSpeed = function () {
        this.rocketSpeed = true;
        this.noAnim = false;
        this.completeExe = false;
    };
    PlayStatus.prototype.setSnailSpeed = function () {
        this.rocketSpeed = false;
        this.noAnim = false;
        this.completeExe = false;
    };
    return PlayStatus;
}());
var Rom = /** @class */ (function () {
    function Rom() {
        this.breakpoints_array = this.initBreakpoints();
        this.number_array = this.initNumberArray();
        this.init_DOM();
        this.startAddressRom_number = 0;
        this.size_number = 8192;
    }
    Rom.prototype.initNumberArray = function () {
        var buf_arr = [];
        for (var i = 0; i < 8192; i++) {
            buf_arr.push(255);
        }
        this.number_array = buf_arr;
        return buf_arr;
    };
    Rom.prototype.initBreakpoints = function () {
        var buf_arr = [];
        for (var i = 0; i < 8192; i++) {
            buf_arr.push(0);
        }
        return buf_arr;
    };
    Rom.prototype.resetBreakpoints = function () {
        this.breakpoints_array = this.initBreakpoints();
        for (var i = 0; i < 224; i++) {
            document.getElementById("romElement" + i).classList.remove('blueText', 'breakpoint');
        }
    };
    Rom.prototype.init_DOM = function () {
        var j = 0;
        for (var i = 0; i < 240; i++) {
            var romElement = document.createElement('input');
            romElement.classList.add('square1x1', 'positionAbsolute', 'centered', 'romElement');
            romElement.id = "romElement" + i;
            romElement.maxLength = 2;
            romElement.readOnly = 'true';
            //after every 8th romElement -> new line should be filled
            if (!(i % 8) && i !== 0)
                j++;
            if (i >= 224) {
                romElement.id = "romElementVariable" + (i - 224);
                romElement.value = '';
            }
            else {
                romElement.value = 'FF';
            }
            romElement.style.top = 100 / 32 * (j + 2) + "%";
            romElement.style.left = 100 / 46 * ((i % 8) + 2) + "%";
            mc8_div.appendChild(romElement);
        }
    };
    Rom.prototype.updateNumberArrayFromDOM = function () {
        for (var i = 0; i < 224; i++) {
            var buf = document.getElementById("romElement" + i);
            if (checkValidHex(buf.value)) {
                this.number_array[i] = convertHexToNumber(document.getElementById("romElement" + i).value);
            }
            else {
                buf.value = convertNumberToHex_2digits(this.number_array[i]);
            }
        }
    };
    Rom.prototype.update = function () {
        this.resetBreakpoints();
        this.initNumberArray();
        var buf_string = '';
        var linker_string = linkerFile_textarea.value.replace(/\r\n|\n|\r/gm, '');
        //assuming the linkerFile is correct
        for (var i = 0; i < linker_string.length; i++) {
            if (linker_string[i] === ':') {
                if (linker_string[i + 8] === '1')
                    break;
                var length_1 = Number(linker_string[i + 2]);
                var address = convertHexToNumber(linker_string[i + 3] + linker_string[i + 4] + linker_string[i + 5] + linker_string[i + 6]);
                //load data
                for (var j = 0; j < length_1; j++) {
                    if (j === 0)
                        this.breakpoints_array[address + j] = 1;
                    this.number_array[address + j] = convertHexToNumber(linker_string[i + 9 + j * 2] + linker_string[i + 10 + j * 2]);
                }
            }
        }
        //update DOM        
        for (var i = 0; i < 224; i++) {
            buf_string = convertNumberToHex_2digits(this.number_array[i]);
            // document.getElementById(`romElement${i}`).textContent = buf_string;
            document.getElementById("romElement" + i).value = buf_string;
            if (breakpointsCheckbox_input.checked && this.breakpoints_array[i]) {
                document.getElementById("romElement" + i).classList.add('blueText');
            }
        }
    };
    Rom.prototype.updateVariableElements = function (address_number) {
        if (convertNumberToHex_4digits(address_number).slice(0, -1) !== lastRomLabel_p.textContent.slice(0, -1)) {
            if (address_number > 223 && address_number < 8192) {
                var lastXXX0Address = address_number - address_number % 16;
                lastRomLabel_div.classList.remove('ellipses');
                lastRomLabel_p.textContent = convertNumberToHex_4digits(address_number).slice(0, -1) + 'x';
                lastRomLabel_div.classList.add('lightYellowBg');
                for (var i = 0; i < 16; i++) {
                    document.getElementById("romElementVariable" + i).value = convertNumberToHex_2digits(this.number_array[lastXXX0Address + i]);
                }
            }
            else if (lastRomLabel_p.textContent !== '') {
                lastRomLabel_div.classList.add('ellipses');
                lastRomLabel_div.classList.remove('lightYellowBg');
                lastRomLabel_p.textContent = '';
                for (var i = 0; i < 16; i++) {
                    document.getElementById("romElementVariable" + i).value = '';
                }
            }
        }
    };
    Rom.prototype.getValue = function (address_number) {
        return this.number_array[address_number];
    };
    Rom.prototype.getElementId = function (address_number) {
        if (address_number === void 0) { address_number = PC.value_number; }
        if (address_number > 223) {
            return document.getElementById("romElementVariable" + address_number % 16).id;
        }
        return document.getElementById("romElement" + address_number).id;
    };
    return Rom;
}());
var Ram = /** @class */ (function () {
    function Ram() {
        this.startAddressRam_number = 8192;
        this.size_number = 8192;
        this.number_array = this.init_number();
        this.init_DOM();
    }
    Ram.prototype.init_number = function () {
        var buf_arr = [];
        for (var i = 0; i < 8192; i++)
            buf_arr.push(255);
        return buf_arr;
    };
    Ram.prototype.init_DOM = function () {
        var j = 0;
        for (var i = 0; i < 240; i++) {
            var ramElement = document.createElement('p');
            ramElement.classList.add('square1x1', 'positionAbsolute', 'centered');
            if (i < 112) {
                ramElement.id = "ramElement" + i;
                ramElement.textContent = 'FF';
            }
            else if (i > 127) {
                ramElement.id = "ramElement" + (i + 8192 - 240);
                ramElement.textContent = 'FF';
            }
            else {
                ramElement.id = "ramElementVariable" + (i - 112);
                ramElement.textContent = '';
            }
            if (!(i % 8) && i !== 0)
                j++;
            ramElement.style.top = 100 / 32 * (j + 2) + "%";
            ramElement.style.left = 100 / 46 * ((i % 8) + 36) + "%";
            mc8_div.appendChild(ramElement);
        }
    };
    Ram.prototype.reset = function () {
        for (var i = 0; i < this.number_array.length; i++) {
            this.number_array[i] = 255;
            if (i < 112) {
                document.getElementById("ramElement" + i).textContent = 'FF';
            }
            if (i > 8192 - 113) {
                document.getElementById("ramElement" + i).textContent = 'FF';
            }
        }
    };
    Ram.prototype.reduceToRange2000h = function (address_number) {
        return address_number - Math.floor(address_number / 8192) * 8192;
    };
    Ram.prototype.getValue = function (address_number) {
        return this.number_array[this.reduceToRange2000h(address_number)];
    };
    Ram.prototype.updateElement = function (address_number, value_number) {
        address_number = this.reduceToRange2000h(address_number);
        this.number_array[address_number] = value_number;
        if (address_number < 112 || address_number > 8191 - 112) {
            document.getElementById("ramElement" + address_number).textContent = convertNumberToHex_2digits(value_number);
        }
        else {
            document.getElementById("ramElementVariable" + address_number % 16).textContent = convertNumberToHex_2digits(value_number);
        }
    };
    Ram.prototype.updateVariableElements = function (address_number) {
        var reducedAddress = this.reduceToRange2000h(address_number);
        if (convertNumberToHex_4digits(reducedAddress).slice(0, -1) !== middleRamLabel_p.textContent.slice(0, -1)) {
            if (reducedAddress > 111 && reducedAddress <= 8191 - 112) {
                middleRamLabel_div.classList.remove('ellipses');
                middleRamLabel_div.classList.add('lightYellowBg');
                middleRamLabel_p.textContent = convertNumberToHex_4digits(address_number).slice(0, -1) + 'x';
                var lastXXX0Address = reducedAddress - reducedAddress % 16;
                for (var i = 0; i < 16; i++) {
                    document.getElementById("ramElementVariable" + i).textContent = convertNumberToHex_2digits(this.number_array[lastXXX0Address + i]);
                }
            }
            else if (middleRamLabel_p.textContent !== '') {
                middleRamLabel_div.classList.add('ellipses');
                middleRamLabel_div.classList.remove('lightYellowBg');
                middleRamLabel_p.textContent = '';
                for (var i = 0; i < 16; i++) {
                    document.getElementById("ramElementVariable" + i).textContent = '';
                }
            }
        }
    };
    Ram.prototype.getRamElementId = function (address_number) {
        if (address_number === void 0) { address_number = 0; }
        address_number = this.reduceToRange2000h(address_number);
        if (address_number > 111 && address_number < 8191 - 111) {
            return document.getElementById("ramElementVariable" + address_number % 16).id;
        }
        else
            return document.getElementById("ramElement" + address_number).id;
    };
    return Ram;
}());
var Register_x2 = /** @class */ (function () {
    function Register_x2(register_htmlElement) {
        this.htmlElement = register_htmlElement;
        this.value_number = 0;
    }
    Register_x2.prototype.update = function (value_number) {
        if (value_number > 255)
            value_number -= 256;
        if (value_number < 0)
            value_number = 255;
        this.value_number = value_number;
        this.htmlElement.textContent = convertNumberToHex_2digits(value_number);
    };
    return Register_x2;
}());
var IO = /** @class */ (function (_super) {
    __extends(IO, _super);
    function IO(register_htmlElement, address_number, io1IN_boolean) {
        var _this = _super.call(this, register_htmlElement) || this;
        _this.address_number = address_number;
        _this.ioMapped_boolean = true;
        _this.in_boolean = io1IN_boolean;
        return _this;
    }
    IO.prototype.updateProperties = function (address_number, ioMapped_boolean, isIn_boolean) {
        this.address_number = address_number;
        this.ioMapped_boolean = ioMapped_boolean;
        this.in_boolean = isIn_boolean;
    };
    return IO;
}(Register_x2));
var Register_x4 = /** @class */ (function () {
    function Register_x4(background_htmlElement, registerHi_htmlElement, registerLo_htmlElement) {
        this.hi_register = new Register_x2(registerHi_htmlElement);
        this.lo_register = new Register_x2(registerLo_htmlElement);
        this.backgroundHtmlElement = background_htmlElement;
        this.value_number = 0;
        this.hiValue_number = 0;
        this.loValue_number = 0;
    }
    Register_x4.prototype.update = function (value_number) {
        if (value_number > 65535)
            value_number -= 65536;
        if (value_number < 0)
            value_number = 65535;
        this.value_number = value_number;
        this.loValue_number = value_number % 256;
        this.hiValue_number = (value_number - this.loValue_number) / 256;
        this.hi_register.update(this.hiValue_number);
        this.lo_register.update(this.loValue_number);
    };
    Register_x4.prototype.updateLoByte = function (value_number) {
        this.loValue_number = value_number;
        this.value_number = this.hiValue_number * 256 + this.loValue_number;
        this.lo_register.update(this.loValue_number);
    };
    Register_x4.prototype.updateHiByte = function (value_number) {
        this.hiValue_number = value_number;
        this.value_number = this.hiValue_number * 256 + this.loValue_number;
        this.hi_register.update(this.hiValue_number);
    };
    return Register_x4;
}());
var Pc_class = /** @class */ (function (_super) {
    __extends(Pc_class, _super);
    function Pc_class(register_htmlElement, registerHi_htmlElement, registerLo_htmlElement) {
        return _super.call(this, register_htmlElement, registerHi_htmlElement, registerLo_htmlElement) || this;
    }
    //override
    Pc_class.prototype.update = function (value_number) {
        if (value_number > 65535)
            value_number -= 65536;
        if (value_number < 0)
            value_number = 65535;
        this.value_number = value_number;
        this.loValue_number = value_number % 256;
        this.hiValue_number = (value_number - this.loValue_number) / 256;
        this.hi_register.update(this.hiValue_number);
        this.lo_register.update(this.loValue_number);
        updateRedRectangle(PC.value_number);
        ROM.updateVariableElements(value_number);
        if (this.value_number > RAM.startAddressRam_number)
            RAM.updateVariableElements(value_number);
    };
    return Pc_class;
}(Register_x4));
var Decoder = /** @class */ (function () {
    function Decoder(wr_htmlElement, rd_htmlElement, m_htmlElement, io_htmlElement, decDisplay_htmlElement) {
        this.wr_htmlElement = wr_htmlElement;
        this.rd_htmlElement = rd_htmlElement;
        this.m_htmlElement = m_htmlElement;
        this.io_htmlElement = io_htmlElement;
        this.WR = 1;
        this.RD = 1;
        this.M = 1;
        this.IO = 1;
        this.display_htmlElement = decDisplay_htmlElement;
        this.text_string = '';
        this.error = false;
        this.isRamAccess = false;
        this.isIoAccess = false;
    }
    Decoder.prototype.update = function (wr_number, rd_number, m_number, io_number, address_number) {
        this.WR = wr_number;
        this.RD = rd_number;
        this.M = m_number;
        this.IO = io_number;
        //read from memory
        if (rd_number === 0 && m_number === 0) {
            this.isIoAccess = false;
            this.isRamAccess = false;
            if (address_number < 8192) {
                this.text_string = 'Lese von ROM';
            }
            else if (address_number >= RAM.startAddressRam_number && address_number < RAM.startAddressRam_number + RAM.size_number) {
                this.isRamAccess = true;
                this.text_string = 'Lese von RAM';
            }
            else if (address_number === IO1.address_number) {
                this.isIoAccess = true;
                if (IO1.in_boolean) {
                    this.text_string = 'Lese von IN1';
                }
                else {
                    this.text_string = 'Lese von OUT1';
                    this.error = true;
                }
            }
            else if (address_number === IO2.address_number) {
                this.isIoAccess = true;
                if (IO2.in_boolean)
                    this.text_string = 'Lese von IN2';
                else {
                    this.text_string = 'Lese von OUT2';
                    this.error = true;
                }
            }
            else if (address_number === IO3.address_number) {
                this.isIoAccess = true;
                if (IO3.in_boolean)
                    this.text_string = 'Lese von IN3';
                else {
                    this.text_string = 'Lese von OUT3';
                    this.error = true;
                }
            }
            else {
                this.text_string = 'Lese von ??? Adresse: ' + convertNumberToHex_2digits(address_number);
                this.error = true;
            }
        }
        //write to memory
        else if (wr_number === 0 && m_number === 0) {
            this.isIoAccess = false;
            this.isRamAccess = false;
            if (address_number < 8192) {
                this.text_string = 'Schreibe auf ROM';
                this.error = true;
            }
            else if (address_number >= RAM.startAddressRam_number && address_number < RAM.startAddressRam_number + RAM.size_number) {
                this.isRamAccess = true;
                this.text_string = 'Schreibe auf RAM';
            }
            else if (address_number === IO1.address_number) {
                this.isIoAccess = true;
                if (!IO1.in_boolean) {
                    this.text_string = 'Schreibe auf OUT1';
                }
                else {
                    this.text_string = 'Schreibe auf IN1';
                    this.error = true;
                }
            }
            else if (address_number === IO2.address_number) {
                this.isIoAccess = true;
                if (!IO2.in_boolean) {
                    this.text_string = 'Schreibe auf OUT2';
                }
                else {
                    this.text_string = 'Schreibe auf IN2';
                    this.error = true;
                }
            }
            else if (address_number === IO3.address_number) {
                this.isIoAccess = true;
                if (!IO3.in_boolean) {
                    this.text_string = 'Schreibe auf OUT3';
                }
                else {
                    this.text_string = 'Schreibe auf IN3';
                    this.error = true;
                }
            }
            else {
                this.text_string = 'Schreibe auf ???\nAdresse: ' + convertNumberToHex_2digits(address_number);
                this.error = true;
            }
        }
        //read IO
        else if (rd_number === 0 && io_number === 0) {
            this.isIoAccess = true;
            this.isRamAccess = false;
            if (IO1.address_number === IO2.address_number && IO1.address_number === address_number) {
                if (IO1.in_boolean) {
                    this.text_string = 'Lese von IN1';
                }
                else {
                    this.text_string = 'Lese von IN2';
                }
            }
            else if (IO1.address_number === IO3.address_number && IO1.address_number === address_number) {
                if (IO1.in_boolean) {
                    this.text_string = 'Lese von IN1';
                }
                else {
                    this.text_string = 'Lese von IN3';
                }
            }
            else if (IO2.address_number === IO3.address_number && IO2.address_number === address_number) {
                if (IO2.in_boolean) {
                    this.text_string = 'Lese von IN2';
                }
                else {
                    this.text_string = 'Lese von IN3';
                }
            }
            else if (address_number === IO1.address_number) {
                if (IO1.in_boolean) {
                    this.text_string = 'Lese von IN1';
                }
                else {
                    this.text_string = 'Lese von OUT1';
                    this.error = true;
                }
            }
            else if (address_number === IO2.address_number) {
                if (IO2.in_boolean)
                    this.text_string = 'Lese von IN2';
                else {
                    this.text_string = 'Lese von OUT2';
                    this.error = true;
                }
            }
            else if (address_number === IO3.address_number) {
                if (IO3.in_boolean)
                    this.text_string = 'Lese von IN3';
                else {
                    this.text_string = 'Lese von OUT3';
                    this.error = true;
                }
            }
            else {
                this.text_string = 'Lese von ??? Adresse: ' + convertNumberToHex_2digits(address_number);
                this.error = true;
            }
        }
        //write IO
        else if (wr_number === 0 && io_number === 0) {
            this.isIoAccess = true;
            this.isRamAccess = false;
            if (IO1.address_number === IO2.address_number && IO1.address_number === address_number) {
                if (!IO1.in_boolean) {
                    this.text_string = 'Schreibe auf OUT1';
                }
                else {
                    this.text_string = 'Schreibe auf OUT2';
                }
            }
            else if (IO1.address_number === IO3.address_number && IO1.address_number === address_number) {
                if (!IO1.in_boolean) {
                    this.text_string = 'Schreibe auf OUT1';
                }
                else {
                    this.text_string = 'Schreibe auf OUT3';
                }
            }
            else if (IO2.address_number === IO3.address_number && IO2.address_number === address_number) {
                if (!IO2.in_boolean) {
                    this.text_string = 'Schreibe auf OUT2';
                }
                else {
                    this.text_string = 'Schreibe auf OUT3';
                }
            }
            else if (address_number === IO1.address_number) {
                if (!IO1.in_boolean) {
                    this.text_string = 'Schreibe auf OUT1';
                }
                else {
                    this.text_string = 'Schreibe auf IN1';
                    this.error = true;
                }
            }
            else if (address_number === IO2.address_number) {
                if (!IO2.in_boolean) {
                    this.text_string = 'Schreibe auf OUT2';
                }
                else {
                    this.text_string = 'Schreibe auf IN2';
                    this.error = true;
                }
            }
            else if (address_number === IO3.address_number) {
                if (!IO3.in_boolean) {
                    this.text_string = 'Schreibe auf OUT3';
                }
                else {
                    this.text_string = 'Schreibe auf IN3';
                    this.error = true;
                }
            }
            else {
                this.text_string = 'Schreibe auf ??? Adresse: ' + convertNumberToHex_2digits(address_number);
                this.error = true;
            }
        }
    };
    Decoder.prototype.updateDOM = function () {
        this.wr_htmlElement.textContent = String(this.WR);
        this.rd_htmlElement.textContent = String(this.RD);
        this.m_htmlElement.textContent = String(this.M);
        this.io_htmlElement.textContent = String(this.IO);
        this.display_htmlElement.textContent = this.text_string;
        if (this.isRamAccess || this.isIoAccess)
            this.display_htmlElement.classList.add('yellowBg');
        if (this.error) {
            this.display_htmlElement.classList.add('redBg');
            throw Error('Decoder error');
        }
    };
    Decoder.prototype.resetDOM = function () {
        this.wr_htmlElement.textContent = '';
        this.rd_htmlElement.textContent = '';
        this.m_htmlElement.textContent = '';
        this.io_htmlElement.textContent = '';
        this.display_htmlElement.textContent = '';
        this.display_htmlElement.classList.remove('yellowBg');
        this.display_htmlElement.classList.remove('redBg');
    };
    return Decoder;
}());
var Flags = /** @class */ (function () {
    function Flags(cFlag_htmlElement, zFlag_htmlElement, pFlag_htmlElement, sFlag_htmlElement, containerFlags_htmlElement) {
        this.c_number = 0;
        this.z_number = 0;
        this.p_number = 0;
        this.s_number = 0;
        this.c_htmlElement = cFlag_htmlElement;
        this.z_htmlElement = zFlag_htmlElement;
        this.p_htmlElement = pFlag_htmlElement;
        this.s_htmlElement = sFlag_htmlElement;
        this.value_number = 0;
        this.htmlElement = containerFlags_htmlElement;
    }
    Flags.prototype.update = function (value_number) {
        var bin_array = convertNumberToBinaryArray(value_number);
        this.c_number = bin_array[7];
        this.z_number = bin_array[5];
        this.p_number = bin_array[1];
        this.s_number = bin_array[0];
        this.updateDOM();
    };
    Flags.prototype.updateDec = function (cFlag_number, zFlag_number, pFlag_number, sFlag_number) {
        this.c_number = cFlag_number;
        this.z_number = zFlag_number;
        this.p_number = pFlag_number;
        this.s_number = sFlag_number;
    };
    Flags.prototype.updateDOM = function () {
        if (this.c_number === '-')
            this.c_number = 0;
        if (this.z_number === '-')
            this.z_number = 0;
        if (this.p_number === '-')
            this.p_number = 0;
        if (this.s_number === '-')
            this.s_number = 0;
        this.value_number = convertBinaryToNumber([this.s_number, this.p_number, 0, 0, 0, this.z_number, 0, this.c_number].join(''));
        this.c_htmlElement.textContent = this.c_number.toString();
        this.z_htmlElement.textContent = this.z_number.toString();
        this.p_htmlElement.textContent = this.p_number.toString();
        this.s_htmlElement.textContent = this.s_number.toString();
    };
    return Flags;
}());
var Point = /** @class */ (function () {
    function Point(index_number, x_number, y_number, label_string, parentIndex_number, children_array) {
        this.index = index_number;
        this.x = x_number;
        this.y = y_number;
        this.label = label_string;
        this.parentIndex = parentIndex_number;
        this.children = children_array;
    }
    Point.prototype.getParent = function () {
        return this.parentIndex;
    };
    Point.prototype.getSmallerChild = function () {
        if (this.children.length === 0)
            return;
        return this.children[0];
    };
    Point.prototype.getGreaterChild = function () {
        if (this.children.length === 0)
            return;
        else
            return this.children[this.children.length - 1];
    };
    return Point;
}());
var mc8_command = /** @class */ (function () {
    function mc8_command(assemblerNotation_string, machineCommand_number, animationFunction_function) {
        this.assemblerNotation_string = assemblerNotation_string;
        this.machineCommand_number = machineCommand_number;
        this.animationFunction_function = animationFunction_function;
    }
    mc8_command.prototype.runAnimation = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.animationFunction_function()];
            });
        });
    };
    return mc8_command;
}());
/***************************************************class variables***************************************************/
var playStatus = new PlayStatus();
var IO1 = new IO(getHtmlElement('io1RegisterValue_h2'), 0, true);
var IO2 = new IO(getHtmlElement('io2RegisterValue_h2'), 1, false);
var IO3 = new IO(getHtmlElement('io3RegisterValue_h2'), 2, true);
var A = new Register_x2(getHtmlElement('aRegisterValue_h2'));
var B = new Register_x2(getHtmlElement('bRegisterValue_h2'));
var C = new Register_x2(getHtmlElement('cRegisterValue_h2'));
var IR = new Register_x2(getHtmlElement('irRegisterValue_h2'));
var ALU1 = new Register_x2(getHtmlElement('alu1RegisterValue_h2'));
var ALU2 = new Register_x2(getHtmlElement('alu2RegisterValue_h2'));
var ALUOUT = new Register_x2(getHtmlElement('aluOutRegisterValue_h2'));
var HL = new Register_x4(getHtmlElement('hlBackground_div'), getHtmlElement('hlRegisterValueHi_h2'), getHtmlElement('hlRegisterValueLo_h2'));
var IX = new Register_x4(getHtmlElement('ixBackground_div'), getHtmlElement('ixRegisterValueHi_h2'), getHtmlElement('ixRegisterValueLo_h2'));
var SP = new Register_x4(getHtmlElement('spBackground_div'), getHtmlElement('spRegisterValueHi_h2'), getHtmlElement('spRegisterValueLo_h2'));
var PC = new Pc_class(getHtmlElement('pcBackground_div'), getHtmlElement('pcRegisterValueHi_h2'), getHtmlElement('pcRegisterValueLo_h2'));
var ZR = new Register_x4(getHtmlElement('spBackground_div'), getHtmlElement('zrRegisterValueHi_h2'), getHtmlElement('zrRegisterValueLo_h2'));
var FLAGS = new Flags(getHtmlElement('cFlagValue_p'), getHtmlElement('zFlagValue_p'), getHtmlElement('pFlagValue_p'), getHtmlElement('sFlagValue_p'), getHtmlElement('flagsContainer_div'));
var ROM = new Rom();
var RAM = new Ram();
var DECODER = new Decoder(getHtmlElement('wrValue_p'), getHtmlElement('rdValue_p'), getHtmlElement('mValue_p'), getHtmlElement('ioValue_p'), getHtmlElement('decDisplay_p'));
var fixPoints = [
    new Point(0, 10, 2, 'ROM1', -1, [1]),
    new Point(1, 14, 2, '', 0, [2, 4]),
    new Point(2, 14, 0, '', 1, [3]),
    new Point(3, 16, 0, 'IO1', 2, []),
    new Point(4, 18, 2, '', 1, [5, 12]),
    new Point(5, 22, 2, '', 4, [6, 8]),
    new Point(6, 22, 0, '', 5, [7]),
    new Point(7, 24, 0, 'IO2', 6, []),
    new Point(8, 30, 2, '', 5, [9, 11]),
    new Point(9, 30, 0, '', 8, [10]),
    new Point(10, 32, 0, 'IO3', 9, []),
    new Point(11, 34, 2, 'RAM1', 8, []),
    new Point(12, 18, 4, '', 4, [13, 23]),
    new Point(13, 24, 4, '', 12, [14, 15]),
    new Point(14, 24, 6, 'ALU1', 13, []),
    new Point(15, 30, 4, '', 13, [16, 17]),
    new Point(16, 30, 6, 'ALU2', 15, []),
    new Point(17, 34, 4, '', 15, [18]),
    new Point(18, 34, 12, '', 17, [19, 21]),
    new Point(19, 27, 12, '', 18, [20]),
    new Point(20, 27, 10, 'ALUOUT', 19, []),
    new Point(21, 34, 14, '', 18, [22]),
    new Point(22, 32, 14, 'IR', 21, []),
    new Point(23, 13, 4, '', 12, [24, 25]),
    new Point(24, 13, 6, 'A', 23, [51]),
    new Point(25, 10, 4, '', 23, [26]),
    new Point(26, 10, 15, '', 25, [27]),
    new Point(27, 14, 15, '', 26, [28, 33]),
    new Point(28, 14, 14, 'IX', 27, [29]),
    new Point(29, 14, 12, 'HL', 28, [30]),
    new Point(30, 14, 10, '', 29, [31, 32]),
    new Point(31, 13, 10, 'B', 30, []),
    new Point(32, 15, 10, 'C', 30, []),
    new Point(33, 14, 16, 'SP', 27, [34]),
    new Point(34, 14, 18, 'PC', 33, [35]),
    new Point(35, 14, 20, 'ZR', 34, [36]),
    new Point(36, 14, 24, 'DEC_UPDATE', 35, [37, 38]),
    new Point(37, 10, 24, 'ROM2', 36, []),
    new Point(38, 28, 24, '', 36, [39, 40]),
    new Point(39, 28, 26, 'DEC', 38, []),
    new Point(40, 32, 24, 'RAM2', 38, []),
    new Point(41, 16, 12, 'HL_lo', 29, []),
    new Point(42, 16, 14, 'IX_lo', 28, []),
    new Point(43, 16, 16, 'SP_lo', 33, []),
    new Point(44, 16, 18, 'PC_lo', 34, []),
    new Point(45, 16, 20, 'ZR_lo', 35, []),
    new Point(46, 14, 12, 'HL_hi', 29, []),
    new Point(47, 14, 14, 'IX_hi', 28, []),
    new Point(48, 14, 16, 'SP_hi', 33, []),
    new Point(49, 14, 18, 'PC_hi', 34, []),
    new Point(50, 14, 20, 'ZR_hi', 35, []),
    new Point(51, 15, 6, 'FLAGS', 24, []),
];
var romElements_array = Array.from(document.getElementsByClassName('romElement'));
var _loop_1 = function (i) {
    romElements_array[i].addEventListener('dblclick', function () {
        editRom_boolean = true;
        romElements_array[i].readOnly = '';
    });
    romElements_array[i].addEventListener('click', function () {
        var cList = Array.from(romElements_array[i].classList);
        if (cList.includes('blueText')) {
            if (cList.includes('breakpoint'))
                romElements_array[i].classList.remove('breakpoint', 'borderBox');
            else
                romElements_array[i].classList.add('breakpoint', 'borderBox');
        }
    });
};
for (var i = 0; i < romElements_array.length; i++) {
    _loop_1(i);
}
/***************************************************hover popups***************************************************/
var allH1Elements_h1 = Array.from(document.getElementsByTagName('h1'));
var allH3Elements_h3 = Array.from(document.getElementsByTagName('h3'));
var controlButtons_button = Array.from(document.querySelectorAll('.button'));
var hoverElements_htmlElements = allH1Elements_h1.concat(allH3Elements_h3).concat(controlButtons_button);
var hoverPopUps_htmlElements = document.getElementsByClassName('hoverElement');
var updateHoverElements = function () {
    document.getElementById('ramStartAddressHex_p').textContent = convertNumberToHex_4digits(RAM.startAddressRam_number) + 'h';
    document.getElementById('ramStartAddressDec_p').textContent = String(RAM.startAddressRam_number);
    document.getElementById('ramEndAddressHex_p').textContent = convertNumberToHex_4digits(RAM.startAddressRam_number + 8192 - 1) + 'h';
    document.getElementById('ramEndAddressDec_p').textContent = String(RAM.startAddressRam_number + 8192 - 1);
    var checkedRadioIoMap_input = document.querySelector('input[name="radioIoMap"]:checked');
    document.getElementById('io1Map_p').textContent = checkedRadioIoMap_input.value;
    document.getElementById('io1AddressHover_p').textContent = convertNumberToHex_2digits(convertHexToNumber(io1Address_textarea.value)) + 'h';
    document.getElementById('io1ValueDec_p').textContent = IO1.value_number + ' (' + convertNumberToComplementOnTwo(IO1.value_number) + ')';
    document.getElementById('io1ValueBin_p').textContent = convertNumberTo8DigitsBinaryString(IO1.value_number);
    document.getElementById('io2Map_p').textContent = checkedRadioIoMap_input.value;
    document.getElementById('io2AddressHover_p').textContent = convertNumberToHex_2digits(convertHexToNumber(io2Address_textarea.value)) + 'h';
    document.getElementById('io2ValueDec_p').textContent = IO2.value_number + ' (' + convertNumberToComplementOnTwo(IO2.value_number) + ')';
    document.getElementById('io2ValueBin_p').textContent = convertNumberTo8DigitsBinaryString(IO2.value_number);
    document.getElementById('io3Map_p').textContent = checkedRadioIoMap_input.value;
    document.getElementById('io3AddressHover_p').textContent = convertNumberToHex_2digits(convertHexToNumber(io3Address_textarea.value)) + 'h';
    document.getElementById('io3ValueDec_p').textContent = IO3.value_number + ' (' + convertNumberToComplementOnTwo(IO3.value_number) + ')';
    document.getElementById('io3ValueBin_p').textContent = convertNumberTo8DigitsBinaryString(IO3.value_number);
    document.getElementById('aHoverValueDec_p').textContent = 'Dezimal: ' + A.value_number + ' (' + convertNumberToComplementOnTwo(A.value_number) + ')';
    document.getElementById('aHoverValueBin_p').textContent = 'Binär: ' + convertNumberTo8DigitsBinaryString(A.value_number);
    document.getElementById('bHoverValueDec_p').textContent = 'Dezimal: ' + B.value_number + ' (' + convertNumberToComplementOnTwo(B.value_number) + ')';
    document.getElementById('bHoverValueBin_p').textContent = 'Binär: ' + convertNumberTo8DigitsBinaryString(B.value_number);
    document.getElementById('cHoverValueDec_p').textContent = 'Dezimal: ' + C.value_number + ' (' + convertNumberToComplementOnTwo(C.value_number) + ')';
    document.getElementById('cHoverValueBin_p').textContent = 'Binär: ' + convertNumberTo8DigitsBinaryString(C.value_number);
    document.getElementById('hlHoverValueDec_p').textContent = 'Dezimal: ' + HL.value_number;
    document.getElementById('ixHoverValueDec_p').textContent = 'Dezimal: ' + IX.value_number;
    document.getElementById('spHoverValueDec_p').textContent = 'Dezimal: ' + SP.value_number;
    document.getElementById('pcHoverValueDec_p').textContent = 'Dezimal: ' + PC.value_number;
    document.getElementById('zrHoverValueDec_p').textContent = 'Dezimal: ' + ZR.value_number;
    document.getElementById('irHoverValueBin_p').textContent = 'Binär: ' + convertNumberTo8DigitsBinaryString(IR.value_number);
};
var _loop_2 = function (i) {
    hoverElements_htmlElements[i].addEventListener('mouseover', function () {
        updateHoverElements();
        hoverPopUps_htmlElements[i].classList.add('displayGrid');
    });
    hoverElements_htmlElements[i].addEventListener('mouseleave', function () {
        hoverPopUps_htmlElements[i].classList.remove('displayGrid');
    });
};
/**
 * Note that the order of the html elements in index.html is important!
 */
for (var i = 0; i < hoverElements_htmlElements.length; i++) {
    _loop_2(i);
}
/***************************************************settings window***************************************************/
var containerSettings_div = document.getElementById('containerSettings_div');
var programSelection_select = document.getElementById('programSelection_select');
var linkerFile_textarea = document.getElementById('linkerFile_textarea');
var radioIoMapped_input = document.getElementById('radioIoMapped_input');
var radioMemoryMap_input = document.getElementById('radioMemoryMap_input');
var io1Address_textarea = document.getElementById('io1Address_textarea');
var io2Address_textarea = document.getElementById('io2Address_textarea');
var io3Address_textarea = document.getElementById('io3Address_textarea');
var io1InputRadio_input = document.getElementById('io1InputRadio_input');
var io2InputRadio_input = document.getElementById('io2InputRadio_input');
var io3InputRadio_input = document.getElementById('io3InputRadio_input');
var io1OutputRadio_input = document.getElementById('io1OutputRadio_input');
var io2OutputRadio_input = document.getElementById('io2OutputRadio_input');
var io3OutputRadio_input = document.getElementById('io3OutputRadio_input');
var io1Arrow_div = document.getElementById('io1Arrow_div');
var io2Arrow_div = document.getElementById('io2Arrow_div');
var io3Arrow_div = document.getElementById('io3Arrow_div');
var ramAddress_select = document.getElementById('ramAddress_select');
var breakpointsCheckbox_input = document.getElementById('breakpointsCheckbox_input');
var breakpointsCheckbox_div = document.getElementById('breakpointsCheckbox_div');
var errorWindow_div = document.getElementById('errorWindow_div');
var errorMessage_textarea = document.getElementById('errorMessage_textarea');
var speedSlider_input = document.getElementById('speedSlider_input');
var checkLinkerFile = function (errorMessage_string, count_number) {
    var intelHexArray = linkerFile_textarea.value.split('\n');
    var noError = true;
    var recordLength = 0;
    for (var i = 0; i < intelHexArray.length; i++) {
        var record = intelHexArray[i].trim();
        if (record === '')
            continue;
        //check if line starts with :
        if (noError) {
            if (record[0] !== ':') {
                errorMessage_string += count_number + ") Fehler in der Linker-Datei in Zeile " + (i + 1) + ":\nJede Zeile muss mit einem : beginnen.\n\n";
                count_number++;
                noError = false;
            }
        }
        //check if line includes whitespace
        if (noError) {
            if (record.includes(' ')) {
                errorMessage_string += count_number + ") Fehler in der Linker-Datei in Zeile " + (i + 1) + ":\nEs d\u00FCrfen keine Leerzeichen in einem Record vorhanden sein.\n\n";
                count_number++;
                noError = false;
            }
        }
        //check record length
        if (noError) {
            if (!checkValidHex(record[1] + record[2])) {
                errorMessage_string += count_number + ") Fehler in der Linker-Datei in Zeile " + (i + 1) + ": Recordl\u00E4nge " + (record[1] + record[2]) + " ist keine g\u00FCltige HEX-Zahl.\n\n";
                count_number++;
                noError = false;
            }
            if (noError) {
                recordLength = convertHexToNumber(record[1] + record[2]);
                if (record.length < 1 + 2 + 4 + 2 + recordLength * 2 + 2) {
                    errorMessage_string += count_number + ") Fehler in der Linker-Datei in Zeile " + (i + 1) + ": Recordl\u00E4nge " + (record[1] + record[2]) + " stimmt nicht mit der L\u00E4nge des Datensatzes \u00FCberein.\n\n";
                    count_number++;
                    noError = false;
                }
            }
        }
        //check record address
        if (noError) {
            if (!checkValidHex(record[3] + record[4] + record[5] + record[6])) {
                errorMessage_string += count_number + ") Fehler in der Linker-Datei in Zeile " + (i + 1) + ": Recordadresse " + (record[3] + record[4] + record[5] + record[6]) + " ist keine g\u00FCltige HEX-Zahl.\n\n";
                count_number++;
                noError = false;
            }
            //TODO: check if bigger than 1999h ??
        }
        //check record type
        if (noError) {
            if (!checkValidHex(record[7] + record[8])) {
                errorMessage_string += count_number + ") Fehler in der Linker-Datei in Zeile " + (i + 1) + ": Recordtyp " + (record[7] + record[8]) + " ist keine g\u00FCltige HEX-Zahl.\n\n";
                count_number++;
                noError = false;
            }
            //check if type is a data-record
            if (noError) {
                if (recordLength === 0 && convertHexToNumber(record[7] + record[8]) === 0) {
                    errorMessage_string += count_number + ") Fehler in der Linker-Datei in Zeile " + (i + 1) + ": Recordl\u00E4nge " + (record[1] + record[2]) + " muss f\u00FCr einen Daten-Recordtyp gr\u00F6\u00DFer als null sein.\n\n";
                    count_number++;
                    noError = false;
                }
            }
            if (noError) {
                if (convertHexToNumber(record[7] + record[8]) > 1) {
                    errorMessage_string += count_number + ") Fehler in der Linker-Datei in Zeile " + (i + 1) + ": Unbekannter Recordtyp " + (record[7] + record[8]) + ".\n                    \n\n";
                    count_number++;
                    noError = false;
                }
            }
        }
        //check data
        if (noError) {
            recordLength = convertHexToNumber(record[1] + record[2]);
            for (var j = 0; j < recordLength * 2; j = j + 2) {
                if (!checkValidHex(record[9 + j] + record[10 + j])) {
                    errorMessage_string += count_number + ") Fehler in der Linker-Datei in Zeile " + (i + 1) + ": Datenbyte " + (record[9 + j] + record[10 + j]) + " ist keine g\u00FCltige HEX-Zahl.\n\n";
                    count_number++;
                    noError = false;
                }
            }
        }
        //check checksum
        if (noError) {
            if (!checkValidHex(record[9 + recordLength * 2] + record[10 + recordLength * 2])) {
                errorMessage_string += count_number + ") Fehler in der Linker-Datei in Zeile " + (i + 1) + ": Checkumme " + (record[9 + recordLength * 2] + record[10 + recordLength * 2]) + " ist keine g\u00FCltige HEX-Zahl.\n\n";
                count_number++;
                noError = false;
            }
            //TODO: check with new mc8assembler
            else if (calculateChecksum(record) !== '00') {
                errorMessage_string += count_number + ") Fehler in der Linker-Datei in Zeile " + (i + 1) + ": Checkumme " + (record[9 + recordLength * 2] + record[10 + recordLength * 2]) + " ist nicht korrekt. Richtige Checksumme: " + calculateChecksum(record.slice(0, -2)) + "\n\n";
                noError = false;
            }
        }
    }
    return [errorMessage_string, count_number];
};
//checks if IOs and Ram were set correctly
var checkSettings = function () {
    var errorMessage_string = '';
    var count = 1;
    var buf = checkLinkerFile(errorMessage_string, count);
    errorMessage_string = buf[0];
    count = buf[1];
    if (io1Address_textarea.value === '')
        io1Address_textarea.value = '0000';
    if (io2Address_textarea.value === '')
        io2Address_textarea.value = '0000';
    if (io3Address_textarea.value === '')
        io3Address_textarea.value = '0000';
    //check if inputs are valid hex-numbers
    if (!checkValidHex(io1Address_textarea.value)) {
        errorMessage_string += count + ") Die Adresse " + io1Address_textarea.value + "h von IO1 ist keine g\u00FCltige HEX-Zahl. Bitte verwenden Sie nur die Ziffern 0-9 und die Zeichen A-F.\n        \n\n";
        count++;
    }
    if (!checkValidHex(io2Address_textarea.value)) {
        errorMessage_string += count + ") Die Adresse " + io2Address_textarea.value + "h von IO2 ist keine g\u00FCltige HEX-Zahl. Bitte verwenden Sie nur die Ziffern 0-9 und die Zeichen A-F.\n        \n\n";
        count++;
    }
    if (!checkValidHex(io3Address_textarea.value)) {
        errorMessage_string += count + ") Die Adresse " + io3Address_textarea.value + "h von IO3 ist keine g\u00FCltige HEX-Zahl. Bitte verwenden Sie nur die Ziffern 0-9 und die Zeichen A-F.\n        \n\n";
        count++;
    }
    //check if inputs reside on same address and are both inputs/outputs
    if ((convertHexToNumber(io1Address_textarea.value) === convertHexToNumber(io2Address_textarea.value)) && (io1InputRadio_input.checked === io2InputRadio_input.checked)) {
        errorMessage_string += count + ") IO1 und IO2 liegen auf der gleichen Adresse. Dies ist nur erlaubt, wenn es sich um einen Eingabe- und um einen Ausgabebaustein handelt.\n\n";
        count++;
    }
    if ((convertHexToNumber(io1Address_textarea.value) === convertHexToNumber(io3Address_textarea.value)) && (io1InputRadio_input.checked === io3InputRadio_input.checked)) {
        errorMessage_string += count + ") IO1 und IO3 liegen auf der gleichen Adresse. Dies ist nur erlaubt, wenn es sich um einen Eingabe- und um einen Ausgabebaustein handelt.\n\n";
        count++;
    }
    if ((convertHexToNumber(io2Address_textarea.value) === convertHexToNumber(io3Address_textarea.value)) && (io2InputRadio_input.checked === io3InputRadio_input.checked)) {
        errorMessage_string += count + ") IO2 und IO3 liegen auf der gleichen Adresse. Dies ist nur erlaubt, wenn es sich um einen Eingabe- und um einen Ausgabebaustein handelt.\n\n";
        count++;
    }
    if (radioIoMapped_input.checked) {
        //if io-mapped: check if inputs are to big
        if (convertHexToNumber(io1Address_textarea.value) > convertHexToNumber('FF')) {
            errorMessage_string += count + ") Die Adresse " + io1Address_textarea.value + "h von IO1 ist zu gro\u00DF. Bitte verwenden Sie bei IO-mapping 8-Bit Adressen (Wertebereich 00h bis FFh).\n\n";
            count++;
        }
        if (convertHexToNumber(io2Address_textarea.value) > convertHexToNumber('FF')) {
            errorMessage_string += count + ") Die Adresse " + io2Address_textarea.value + "h von IO2 ist zu gro\u00DF. Bitte verwenden Sie bei IO-mapping 8-Bit Adressen (Wertebereich 00h bis FFh).\n\n";
            count++;
        }
        if (convertHexToNumber(io3Address_textarea.value) > convertHexToNumber('FF')) {
            errorMessage_string += count + ") Die Adresse " + io3Address_textarea.value + "h von IO3 ist zu gro\u00DF. Bitte verwenden Sie bei IO-mapping 8-Bit Adressen (Wertebereich 00h bis FFh).\n\n";
            count++;
        }
    }
    else {
        //if memory-mapped: check if inputs are to big
        if (convertHexToNumber(io1Address_textarea.value) > convertHexToNumber('FFFF')) {
            errorMessage_string += count + ") Die Adresse " + io1Address_textarea.value + "h von IO1 ist zu gro\u00DF. Bitte verwenden Sie bei Memory-mapping 16-Bit Adressen (Wertebereich 0000h bis FFFFh).\n\n";
            count++;
        }
        if (convertHexToNumber(io2Address_textarea.value) > convertHexToNumber('FFFF')) {
            errorMessage_string += count + ") Die Adresse " + io2Address_textarea.value + "h von IO2 ist zu gro\u00DF. Bitte verwenden Sie bei Memory-mapping 16-Bit Adressen (Wertebereich 0000h bis FFFFh).\n\n";
            count++;
        }
        if (convertHexToNumber(io3Address_textarea.value) > convertHexToNumber('FFFF')) {
            errorMessage_string += count + ") Die Adresse " + io3Address_textarea.value + "h von IO3 ist zu gro\u00DF. Bitte verwenden Sie bei Memory-mapping 16-Bit Adressen (Wertebereich 0000h bis FFFFh).\n\n";
            count++;
        }
        //check if inputs reside on ram/rom address
        if (convertHexToNumber(io1Address_textarea.value) < convertHexToNumber('2000')) {
            errorMessage_string += count + ") Die Adresse " + io1Address_textarea.value + "h von IO1 liegt im Adressbereich des ROM. Bitte verwenden Sie eine andere Adresse.\n\n";
            count++;
        }
        if (convertHexToNumber(io2Address_textarea.value) < convertHexToNumber('2000')) {
            errorMessage_string += count + ") Die Adresse " + io2Address_textarea.value + "h von IO2 liegt im Adressbereich des ROM. Bitte verwenden Sie eine andere Adresse.\n\n";
            count++;
        }
        if (convertHexToNumber(io3Address_textarea.value) < convertHexToNumber('2000')) {
            errorMessage_string += count + ") Die Adresse " + io3Address_textarea.value + "h von IO3 liegt im Adressbereich des ROM. Bitte verwenden Sie eine andere Adresse.\n\n";
            count++;
        }
        if (convertHexToNumber(io1Address_textarea.value) >= RAM.startAddressRam_number && convertHexToNumber(io1Address_textarea.value) < (RAM.startAddressRam_number + 8192)) {
            errorMessage_string += count + ") Die Adresse " + io1Address_textarea.value + "h von IO1 liegt im Adressbereich des RAM. Bitte verwenden Sie eine andere Adresse f\u00FCr den IO-Baustein oder f\u00FCr das RAM.";
            count++;
        }
        if (convertHexToNumber(io2Address_textarea.value) >= RAM.startAddressRam_number && convertHexToNumber(io2Address_textarea.value) < (RAM.startAddressRam_number + 8192)) {
            errorMessage_string += count + ") Die Adresse " + io2Address_textarea.value + "h von IO2 liegt im Adressbereich des RAM. Bitte verwenden Sie eine andere Adresse f\u00FCr den IO-Baustein oder f\u00FCr das RAM.";
            count++;
        }
        if (convertHexToNumber(io3Address_textarea.value) >= RAM.startAddressRam_number && convertHexToNumber(io3Address_textarea.value) < (RAM.startAddressRam_number + 8192)) {
            errorMessage_string += count + ") Die Adresse " + io3Address_textarea.value + "h von IO3 liegt im Adressbereich des RAM. Bitte verwenden Sie eine andere Adresse f\u00FCr den IO-Baustein oder f\u00FCr das RAM.";
            count++;
        }
    }
    if (errorMessage_string === '')
        return true;
    errorWindow_div.classList.add('displayGrid');
    errorMessage_textarea.textContent = errorMessage_string;
    return false;
};
var changeRamAddressOnDOM = function (hex1_string, hex2_string) {
    var pEle = document.getElementsByClassName('RamAddressLabel');
    var str = ['0', '1', '2', '3', '4', '5', '6', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    RAM.startAddressRam_number = convertHexToNumber(hex1_string + '00');
    for (var i = 0; i < pEle.length; i++) {
        if (i < 7) {
            pEle[i].textContent = hex1_string + str[i] + 'x';
        }
        else if (i === 7) {
        }
        else {
            pEle[i].textContent = hex2_string + str[i - 1] + 'x';
        }
    }
};
var changeRamAddress = function () {
    switch (ramAddress_select.value) {
        case '2000':
            changeRamAddressOnDOM('20', '3F');
            break;
        case '4000':
            changeRamAddressOnDOM('40', '5F');
            break;
        case '6000':
            changeRamAddressOnDOM('60', '7F');
            break;
        case '8000':
            changeRamAddressOnDOM('80', '9F');
            break;
        case 'A000':
            changeRamAddressOnDOM('A0', 'BF');
            break;
        case 'C000':
            changeRamAddressOnDOM('C0', 'DF');
            break;
        case 'E000':
            changeRamAddressOnDOM('E0', 'FF');
            break;
        default:
            break;
    }
};
var setSettingsDependingOnProgram = function (ioMapped_boolean, io1IN_boolean, io2IN_boolean, io3IN_boolean, io1AddressHex_string, io2AddressHex_string, io3AddressHex_string, ramStartingAddressHex_string) {
    if (ioMapped_boolean) {
        radioIoMapped_input.checked = true;
    }
    else {
        radioMemoryMap_input.checked = true;
    }
    if (io1IN_boolean) {
        io1InputRadio_input.checked = true;
        io1Arrow_div.classList.remove('ioArrowOUT');
    }
    else {
        io1OutputRadio_input.checked = true;
        io1Arrow_div.classList.add('ioArrowOUT');
    }
    if (io2IN_boolean) {
        io2InputRadio_input.checked = true;
        io2Arrow_div.classList.remove('ioArrowOUT');
    }
    else {
        io2OutputRadio_input.checked = true;
        io2Arrow_div.classList.add('ioArrowOUT');
    }
    if (io3IN_boolean) {
        io3InputRadio_input.checked = true;
        io3Arrow_div.classList.remove('ioArrowOUT');
    }
    else {
        io3OutputRadio_input.checked = true;
        io3Arrow_div.classList.add('ioArrowOUT');
    }
    io1Address_textarea.value = io1AddressHex_string;
    io2Address_textarea.value = io2AddressHex_string;
    io3Address_textarea.value = io3AddressHex_string;
    ramAddress_select.value = ramStartingAddressHex_string;
    //change textContent of the custom selection
    for (var i = 0; i < ramAddress_select.children.length; i++) {
        if (ramAddress_select.children[i].value === ramStartingAddressHex_string) {
            ramSelection_p.textContent = ramAddress_select.children[i].textContent;
        }
    }
    changeRamAddress();
};
var updateProgram = function () {
    switch (programSelection_select.value) {
        case 'own':
            linkerFile_textarea.value = 'Fügen Sie hier den Inhalt der vom Linker erzeugten .OBJ-Datei ein.\n(im Intel-HEX-Format)';
            setSettingsDependingOnProgram(true, true, false, true, '00', '01', '02', '2000');
            break;
        case 'bsp1':
            linkerFile_textarea.value = ':0100000000ff\n:0100010000fe\n:0100020000fd\n:0100030000fc\n:0100040000fb\n:0100050000fa\n:0100060000f9\n:0100070000f8\n:0100080000f7\n:0100090000f6\n:01000a0000f5\n:01000b0000f4\n:01000c0000f3\n:01000d0000f2\n:01000e0000f1\n:01000f0000f0\n:0100100000ef\n:0100110000ee\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, true, '00', '01', '02', '2000');
            break;
        case 'bsp2':
            linkerFile_textarea.value = ':010000003Cc3\n:010001003Cc2\n:010002003Cc1\n:0100030004f8\n:0100040004f7\n:010005000Cee\n:0100060023d6\n:010007008771\n:010008008770\n:010009008076\n:01000a008075\n:01000b008173\n:01000c008172\n:01000d003Db5\n:01000e003Db4\n:01000f0005eb\n:010010000De2\n:01001100905e\n:01001200905d\n:01001300915b\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, true, '00', '01', '02', '2000');
            break;
        case 'bsp3':
            linkerFile_textarea.value = ':020000003E11af\n:020002000622d4\n:020004000E33b9\n:030006002155443d\n:01000900787e\n:01000a0041b4\n:01000b004Fa5\n:02000c003E664e\n:01000e0047aa\n:02000f003E773a\n:010011004F9f\n:020012003E8826\n:010014007675\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, true, '00', '01', '02', '2000');
            break;
        case 'bsp4':
            linkerFile_textarea.value = ':04000000DD212211cb\n:02000400DD23fa\n:02000600DD23f8\n:02000800DD2Bee\n:03000a002144335b\n:01000d0023cf\n:01000e0023ce\n:03000f00310300ba\n:010012007677\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, true, '00', '01', '02', '2000');
            break;
        case 'bsp5':
            linkerFile_textarea.value = ':020000003E11af\n:030002003200E0e9\n:0300050021332282\n:030008002201E0f2\n:04000b00DD2155445a\n:04000f00DD2203E00b\n:010013003Cb0\n:0100140023c8\n:02001500DD23e9\n:0100170047a1\n:030018003A00E0cb\n:03001b002A03E0d5\n:04001e00DD2A01E0f6\n:01e00000001f\n:01e00100001e\n:01e00200001d\n:01e00300001c\n:01e00400001b\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, true, '00', '01', '02', 'E000');
            break;
        case 'bsp6':
            linkerFile_textarea.value = ':020000003E12ae\n:030002002150E0aa\n:0100050047b3\n:03000600324FE096\n:01000900876f\n:01000a004Fa6\n:03000b003250E090\n:01000e00876a\n:01000f007779\n:030010003A4FE084\n:0100130047a5\n:030014003A50E07f\n:010017004F99\n:010018007E69\n:010019007670\n:01e04f0000d0\n:01e0500000cf\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, true, '00', '01', '02', 'E000');
            break;
        case 'bsp7':
            linkerFile_textarea.value = ':0300000031FFFFce\n:020003003EEEcf\n:020005000622d1\n:020007000E8861\n:010009008076\n:01000a00F500\n:01000b009163\n:01000c0047ac\n:01000d00F101\n:01000e008071\n:01000f00F5fb\n:01001000915e\n:0100110047a7\n:01001200F1fc\n:010013007676\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, true, '00', '01', '02', 'E000');
            break;
        case 'bsp8':
            linkerFile_textarea.value = ':020000003E0Cb4\n:0100020047b6\n:020003003EC0fd\n:010005004Fab\n:01000600A059\n:030007003200E0e4\n:01000a00797c\n:01000b00B044\n:03000c003201E0de\n:02000f003E179a\n:0100110047a7\n:020012003E713d\n:01001400A843\n:0100150047a3\n:02001600CB27f6\n:02001800CB27f4\n:02001a00CB27f2\n:01001c00786b\n:01001d0007db\n:01001e0007da\n:01001f0007d9\n:010020007867\n:0100210017c7\n:0100220017c6\n:0100230017c5\n:010024007665\n:01e00000001f\n:01e00100001e\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, true, '00', '01', '02', 'E000');
            break;
        case 'bsp9':
            linkerFile_textarea.value = ':020000003E20a0\n:020002000610e6\n:020004000E30bc\n:01000600BF3a\n:03000700CA0B0021\n:01000a003Cb9\n:01000b00B83c\n:03000c00F21000ef\n:01000f003Cb4\n:01001000B936\n:03001100FA1500dd\n:010014003Caf\n:010015008169\n:010016008762\n:03001700DA2300e9\n:01001a00875e\n:03001b00DA2300e5\n:01001e00875a\n:03001f00DA2300e1\n:010022008756\n:03002300C3000017\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, true, '00', '01', '02', '2000');
            break;
        case 'bsp10':
            linkerFile_textarea.value = ':0300000031FFFFce\n:0300030021700069\n:010006007E7b\n:02000700D30321\n:0100090047af\n:01000a0023d2\n:02000b00DB0117\n:01000d004Fa3\n:01000e00B839\n:03000f00C2060026\n:010012007677\n:01007000008f\n:01007100107e\n:01007200206d\n:01007300305c\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, false, '01', '03', '05', 'E000');
            break;
        case 'bsp11':
            linkerFile_textarea.value = ':0300000031FFFFce\n:030003003A00A020\n:0100060047b2\n:03000700CD4000e9\n:03000a003A00A019\n:01000d00B83a\n:03000e00CA030022\n:020040003E037d\n:010042003D80\n:03004300C24200b6\n:01004600C9f0\n:01a00000005f\n:01a00100005e\n:00000001FF';
            setSettingsDependingOnProgram(false, true, false, true, 'A000', 'A001', 'A002', 'E000');
            break;
        case 'bsp12':
            linkerFile_textarea.value = ':0300000031FFFFce\n:020003000E7776\n:02000500DB011d\n:01000700B93f\n:03000800CA1A0011\n:03000b00D214000c\n:03000e00CD3200f0\n:03001100C3170012\n:03001400CD3B00e1\n:03001700C305001e\n:03001a00CD4400d2\n:03001d00C3170006\n:020032003E008e\n:02003400D303f4\n:020036003E99f1\n:02003800D305ee\n:01003a00C9fc\n:02003b003E0085\n:02003d00D305e9\n:02003f003E99e8\n:02004100D303e7\n:01004300C9f3\n:020044003E007c\n:02004600D305e0\n:020048003E0078\n:02004a00D303de\n:01004c00C9ea\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, false, '01', '03', '05', 'E000');
            break;
        case 'bsp13':
            linkerFile_textarea.value = ':0300000031FF3F8e\n:02000300DB0020\n:0100050047b3\n:02000600DB011c\n:03000800CD100018\n:02000b00D3021e\n:03000d00C303002a\n:020010000E04dc\n:02001200CB27fa\n:010014000Dde\n:03001500C2120014\n:020018000E04d4\n:02001a00CB27f2\n:03001c00D22000ef\n:01001f008060\n:010020000Dd2\n:03002100C21A0000\n:01002400C912\n:00000001FF';
            setSettingsDependingOnProgram(true, true, true, false, '00', '01', '02', '2000');
            break;
        case 'bsp14':
            linkerFile_textarea.value = ':0300000031FF3F8e\n:02000300DB0020\n:020005000600f3\n:03000700CD0E001b\n:01000a00787d\n:02000b00D3021e\n:01000d00767c\n:01000e00F5fc\n:01000f003Db3\n:03001000CA16000d\n:03001300CD0E000f\n:01001600F1f8\n:010017008068\n:0100180047a0\n:01001900C91d\n:00000001FF';
            setSettingsDependingOnProgram(true, true, true, false, '00', '01', '02', '2000');
            break;
        case 'bsp15':
            linkerFile_textarea.value = ':02000000DB0023\n:0300020032D007f2\n:02000500DB011d\n:0300070032D107ec\n:03000a00CDD60749\n:03000d003AD307dc\n:02001000D30219\n:03001200C3000028\n:0107d0000028\n:0107d1000027\n:0107d2000026\n:0107d3000025\n:0107d4000024\n:0107d5000023\n:0307d6003AD0070f\n:0107d90047d8\n:0307da003AD1070a\n:0107dd00809b\n:0307de0032D3070c\n:0107e100C94e\n:00000001FF';
            setSettingsDependingOnProgram(true, true, true, false, '00', '01', '02', '2000');
            break;
        case 'bsp16':
            linkerFile_textarea.value = ':02000000DB0122\n:02000200FE0Fef\n:03000400C2000037\n:030007003A1600a6\n:01000a0047ae\n:03000b00211700ba\n:01000e007E73\n:02000f00D3021a\n:0100110023cb\n:0100120005e8\n:03001300C20E001a\n:0100160004e5\n:0100170007e1\n:010018000Dda\n:010019000Fd7\n:01001a00766f\n:00000001FF';
            setSettingsDependingOnProgram(true, true, true, false, '00', '01', '02', '2000');
            break;
        case 'bsp17':
            linkerFile_textarea.value = ':02000000DB0122\n:02000200FE0Fef\n:03000400C2000037\n:030007002A1A00b2\n:01000a007E77\n:01000b0047ad\n:03000c002A1B00ac\n:01000f007E72\n:02001000D30219\n:0100120023ca\n:0100130005e7\n:03001400C20F0018\n:03001700C3000023\n:01001a0009dc\n:01001b0001e3\n:01001c0003e0\n:01001d0005dd\n:01001e0007da\n:01001f000Bd5\n:010020000Dd2\n:0100210011cd\n:0100220013ca\n:0100230017c5\n:00000001FF';
            setSettingsDependingOnProgram(true, true, true, false, '00', '01', '02', '2000');
            break;
        case 'bsp18':
            linkerFile_textarea.value = ':0300000031FF3F8e\n:020003000E02eb\n:02000500DB001e\n:03000700320020a4\n:01000a00797c\n:03000b00CD5000d5\n:02000e00DB0015\n:030010003201209a\n:03001300CD4400d9\n:030016003A02208b\n:02001900FE00e7\n:03001b00CA3100e7\n:02001e003EABf7\n:02002000D30209\n:010022007964\n:03002300CD5000bd\n:020026003E0199\n:02002800D30201\n:01002a00795c\n:03002b00CD5000b5\n:03002e00C3050007\n:020031003E7619\n:02003300D302f6\n:010035007951\n:03003600CD5000aa\n:020039003E2364\n:02003b00D302ee\n:01003d007949\n:03003e00CD5000a2\n:03004100C30500f4\n:030044003A00205f\n:010047004F69\n:030048003A01205a\n:01004b009123\n:03004c003202205d\n:01004f00C9e7\n:020050000605a3\n:0100520005a8\n:03005300C2520096\n:010056003D6c\n:03005700C2500094\n:01005a00C9dc\n:0120000000df\n:0120010000de\n:0120020000dd\n:0120030000dc\n:0120040000db\n:00000001FF';
            setSettingsDependingOnProgram(true, true, true, false, '00', '01', '02', '2000');
            break;
        case 'bsp19':
            linkerFile_textarea.value = ':020000003E00c0\n:020002000600f6\n:03000400211500c3\n:020007000E0Ddc\n:010009007E78\n:01000a008075\n:01000b0047ad\n:01000c0023d0\n:01000d000De5\n:03000e00C2090024\n:010011007876\n:02001200D30019\n:010014007675\n:0100150001e9\n:0100160002e7\n:0100170001e7\n:0100180002e5\n:0100190001e5\n:01001a0001e4\n:01001b0001e3\n:01001c0001e2\n:01001d0002e0\n:01001e0002df\n:01001f0001df\n:0100200002dd\n:0100210001dd\n:00000001FF';
            setSettingsDependingOnProgram(true, false, false, true, '00', '01', '02', '2000');
            break;
        default:
            linkerFile_textarea.value = '';
            break;
    }
};
var updateIoClasses = function () {
    if (radioIoMapped_input.checked) {
        IO1.ioMapped_boolean = true;
        IO2.ioMapped_boolean = true;
        IO3.ioMapped_boolean = true;
        io1Address_textarea.maxLength = 2;
        io2Address_textarea.maxLength = 2;
        io3Address_textarea.maxLength = 2;
    }
    else {
        IO1.ioMapped_boolean = false;
        IO2.ioMapped_boolean = false;
        IO3.ioMapped_boolean = false;
        io1Address_textarea.maxLength = 4;
        io2Address_textarea.maxLength = 4;
        io3Address_textarea.maxLength = 4;
    }
    if (io1InputRadio_input.checked) {
        IO1.in_boolean = true;
        io1Arrow_div.classList.remove('ioArrowOUT');
    }
    else {
        IO1.in_boolean = false;
        io1Arrow_div.classList.add('ioArrowOUT');
    }
    if (io2InputRadio_input.checked) {
        IO2.in_boolean = true;
        io2Arrow_div.classList.remove('ioArrowOUT');
    }
    else {
        IO2.in_boolean = false;
        io2Arrow_div.classList.add('ioArrowOUT');
    }
    if (io3InputRadio_input.checked) {
        IO3.in_boolean = true;
        io3Arrow_div.classList.remove('ioArrowOUT');
    }
    else {
        IO3.in_boolean = false;
        io3Arrow_div.classList.add('ioArrowOUT');
    }
    IO1.address_number = convertHexToNumber(io1Address_textarea.value);
    IO2.address_number = convertHexToNumber(io2Address_textarea.value);
    IO3.address_number = convertHexToNumber(io3Address_textarea.value);
};
var saveSettings = function () {
    if (checkSettings()) {
        updateIoClasses();
        stopBtn(); //init
        ROM.update();
        RAM.reset();
        containerSettings_div.classList.remove('toggleDisplay');
        errorWindow_div.classList.remove('displayGrid');
        settingsDisplayed_boolean = false;
    }
};
/**
 * Custom select to work on all browsers without any differences
 */
var ramSelect_div = document.getElementById('ramSelect_div');
var ramSelection_p = document.getElementById('ramSelection_p');
var ramSelectOptions_div = document.getElementById('ramSelectOptions_div');
var programSelection_div = document.getElementById('programSelection_div');
var programSelection_p = document.getElementById('programSelection_p');
var programSelectionOptions_div = document.getElementById('programSelectionOptions_div');
var ramOptions = ramSelectOptions_div.children;
var programOptions = programSelectionOptions_div.children;
ramSelect_div.addEventListener('click', function () {
    ramSelectOptions_div.classList.add('displayGrid');
});
programSelection_div.addEventListener('click', function () {
    programSelectionOptions_div.classList.add('displayGrid');
});
document.addEventListener('mouseup', function () {
    ramSelectOptions_div.classList.remove('displayGrid');
    programSelectionOptions_div.classList.remove('displayGrid');
});
var _loop_3 = function (i) {
    ramOptions[i].addEventListener('click', function () {
        ramAddress_select.value = ramAddress_select.children[i].value;
        changeRamAddress();
        ramSelection_p.textContent = ramOptions[i].textContent;
        ramSelectOptions_div.classList.remove('displayGrid');
    });
};
for (var i = 0; i < ramOptions.length; i++) {
    _loop_3(i);
}
var _loop_4 = function (i) {
    programOptions[i].addEventListener('click', function () {
        programSelection_select.value = programSelection_select.children[i].value;
        updateProgram();
        programSelection_p.textContent = programOptions[i].textContent;
        programSelectionOptions_div.classList.remove('displayGrid');
    });
};
for (var i = 0; i < programOptions.length; i++) {
    _loop_4(i);
}
/**
 * EventListeners for IO radio buttons
 */
radioIoMapped_input.addEventListener('change', updateIoClasses);
radioMemoryMap_input.addEventListener('change', updateIoClasses);
io1InputRadio_input.addEventListener('change', updateIoClasses);
io1OutputRadio_input.addEventListener('change', updateIoClasses);
io2InputRadio_input.addEventListener('change', updateIoClasses);
io2OutputRadio_input.addEventListener('change', updateIoClasses);
io3InputRadio_input.addEventListener('change', updateIoClasses);
io3OutputRadio_input.addEventListener('change', updateIoClasses);
breakpointsCheckbox_div.addEventListener('click', function () {
    breakpointsCheckbox_div.classList.toggle('breakpointsMark');
    if (breakpointsCheckbox_input.checked)
        breakpointsCheckbox_input.checked = false;
    else
        breakpointsCheckbox_input.checked = true;
});
/***************************************************bus system and path logic***************************************************/
//returns the index/position of a fixPoint in the fixPoint-array
var getPointIndex = function (pointID_string) {
    for (var i = 0; i < fixPoints.length; i++) {
        if (fixPoints[i].label === pointID_string)
            return i;
    }
    return -1;
};
//returns the indices from Zero(ROM1) to the passed point index. 
var getIndexArrayZeroToPoint = function (pointIndex_number) {
    var atoZero = [];
    while (true) {
        if (pointIndex_number === 0) {
            atoZero.push(0);
            return atoZero.reverse();
        }
        else {
            atoZero.push(pointIndex_number);
            pointIndex_number = fixPoints[pointIndex_number].getParent();
        }
    }
};
//merges zeroToA_array and zeroToB_array to AtoB_array
var getIndexArrayAtoB = function (zeroToA_array, zeroToB_array) {
    var smallerArray = (zeroToA_array < zeroToB_array ? zeroToA_array.length : zeroToB_array.length);
    var AtoB = [];
    var buffer = 0;
    //find smallest common index and save in buffer;
    for (var i = 0; i < smallerArray; i++) {
        if (zeroToA_array[i] === zeroToB_array[i]) {
            buffer = zeroToA_array[i];
        }
    }
    //reverse indexArray zeroToA
    var aToZero_array = zeroToA_array.reverse();
    //add index to AtoB-array as long as the index is smaller than buffer
    for (var i = 0; i < aToZero_array.length; i++) {
        if (aToZero_array[i] > buffer)
            AtoB.push(aToZero_array[i]);
    }
    //add index to AtoB-array when index is equal or greater to buffer
    for (var i = 0; i < zeroToB_array.length; i++) {
        if (zeroToB_array[i] >= buffer)
            AtoB.push(zeroToB_array[i]);
    }
    return AtoB;
};
// rom- and ram-Elements are not fixPoints. Therefore they need to be handled separately.
var romElementToROM1 = function (romElementID_string) {
    var toROM1 = [];
    var romElement = document.getElementById(romElementID_string);
    var rEx = romElement.style.left.replace('%', '');
    var rEy = romElement.style.top.replace('%', '');
    rEx = Math.round(Number(rEx) * 46 / 100);
    rEy = Math.round(Number(rEy) * 32 / 100);
    var romBetweenPoint = new Point(-1, rEx, 2, '', 0, []);
    var romPoint = new Point(-1, rEx, rEy, '', 0, []);
    toROM1.push(romPoint);
    toROM1.push(romBetweenPoint);
    return toROM1;
};
var ramElementToRAM1 = function (ramElementID_string) {
    var toRAM1 = [];
    var ramElement = document.getElementById(ramElementID_string);
    var rEx = ramElement.style.left.replace('%', '');
    var rEy = ramElement.style.top.replace('%', '');
    rEx = Math.round(Number(rEx) * 46 / 100);
    rEy = Math.round(Number(rEy) * 32 / 100);
    var romBetweenPoint = new Point(-1, rEx, 2, '', 0, []);
    var romPoint = new Point(-1, rEx, rEy, '', 0, []);
    toRAM1.push(romPoint);
    toRAM1.push(romBetweenPoint);
    return toRAM1;
};
var RAM2ToRamElement = function (ramElementID_string) {
    var toRamElement = [];
    var ramElement = document.getElementById(ramElementID_string);
    var rEx = ramElement.style.left.replace('%', '');
    var rEy = ramElement.style.top.replace('%', '');
    rEx = Math.round(Number(rEx) * 46 / 100);
    rEy = Math.round(Number(rEy) * 32 / 100);
    var ramBetweenPoint = new Point(-1, rEx, 2, '', 0, []);
    var ramPoint = new Point(-1, rEx, rEy, '', 0, []);
    toRamElement.push(ramBetweenPoint);
    toRamElement.push(ramPoint);
    return toRamElement;
};
//returns the fixPoints to pass during the movement
var getPointsAtoB = function (fixPointLabelA_string, fixPointLabelB_string) {
    var pointsAtoB = [];
    //The bus-system does not include rom- or ram-Elements.
    if (fixPointLabelA_string.includes('romElement')) {
        pointsAtoB = getPointsAtoB('ROM1', fixPointLabelB_string);
        pointsAtoB = romElementToROM1(fixPointLabelA_string).concat(pointsAtoB);
        return pointsAtoB;
    }
    if (fixPointLabelA_string.includes('ramElement')) {
        pointsAtoB = getPointsAtoB('RAM1', fixPointLabelB_string);
        pointsAtoB = ramElementToRAM1(fixPointLabelA_string).concat(pointsAtoB);
        return pointsAtoB;
    }
    if (fixPointLabelB_string.includes('ramElement')) {
        pointsAtoB = getPointsAtoB(fixPointLabelA_string, 'RAM1');
        pointsAtoB = pointsAtoB.concat(RAM2ToRamElement(fixPointLabelB_string));
        return pointsAtoB;
    }
    pointsAtoB = getIndexArrayAtoB(getIndexArrayZeroToPoint(getPointIndex(fixPointLabelA_string)), getIndexArrayZeroToPoint(getPointIndex(fixPointLabelB_string)));
    //convert Index-Array to Point-Array
    for (var i = 0; i < pointsAtoB.length; i++) {
        pointsAtoB[i] = fixPoints[pointsAtoB[i]];
    }
    return pointsAtoB;
};
//calculates the coordinates between the fixPoints.
//At Speed 1, the movingObject updates every single coordinate
//At Speed 2, the movingObject updates every second coordinate...
//max Speed = 12 (update only fixPoints)
var calcIntermediatePositions = function (pointsAtoB_array, interPointsQuantity) {
    if (interPointsQuantity === void 0) { interPointsQuantity = 12; }
    var xPositions = [];
    var yPositions = [];
    var bufferX = [];
    var bufferY = [];
    var posDiff = 0;
    var reciprocal = 1 / interPointsQuantity;
    //iterate through path
    for (var j = 0; j < pointsAtoB_array.length - 1; j++) {
        //If path position is different to the next path position, calculate position difference
        //and add intermediate Points, depending on the position difference and direction.
        if (pointsAtoB_array[j].y !== pointsAtoB_array[j + 1].y) {
            posDiff = Math.abs((pointsAtoB_array[j + 1].y - pointsAtoB_array[j].y));
            for (var i = 0; i < interPointsQuantity * posDiff; i++) {
                if ((pointsAtoB_array[j + 1].y > pointsAtoB_array[j].y))
                    yPositions.push(pointsAtoB_array[j].y + reciprocal * (i + 1));
                else
                    yPositions.push(pointsAtoB_array[j].y - reciprocal * (i + 1));
                xPositions.push(pointsAtoB_array[j].x);
            }
        }
        if (pointsAtoB_array[j].x !== pointsAtoB_array[j + 1].x) {
            posDiff = Math.abs((pointsAtoB_array[j + 1].x - pointsAtoB_array[j].x));
            for (var i = 0; i < interPointsQuantity * posDiff; i++) {
                if ((pointsAtoB_array[j + 1].x > pointsAtoB_array[j].x))
                    xPositions.push(pointsAtoB_array[j].x + reciprocal * (i + 1));
                else
                    xPositions.push(pointsAtoB_array[j].x - reciprocal * (i + 1));
                yPositions.push(pointsAtoB_array[j].y);
            }
        }
    }
    //create 2-dimensional array, which contains 12 coordinates per index
    for (var i = 0, k = -1; i < xPositions.length; i++) {
        if (i % interPointsQuantity === 0) {
            k++;
            bufferX[k] = [];
            bufferY[k] = [];
        }
        bufferX[k].push(xPositions[i]);
        bufferY[k].push(yPositions[i]);
    }
    return [bufferX, bufferY];
};
/***************************************************red rectangle***************************************************/
var redRectangle_p = document.getElementById('redRectangle_p');
var updateRedRectangle = function (PC_number) {
    redRectangle_p.classList.remove('displayNone');
    var xPos = 0;
    var yPos = 0;
    if (PC_number < 224) {
        xPos = PC_number % 8 + 2;
        yPos = Math.floor(PC_number / 8) + 2;
    }
    //vaiable RomElements
    else if (PC_number < 8192) {
        xPos = PC_number % 8 + 2;
        yPos = 30;
        if (PC_number % 16 > 7)
            yPos += 1;
    }
    else if (PC_number >= RAM.startAddressRam_number && PC_number < RAM.startAddressRam_number + 112) {
        PC_number = RAM.reduceToRange2000h(PC_number);
        xPos = PC_number % 8 + 36;
        yPos = Math.floor(PC_number / 8) + 2;
    }
    //variable RamElements
    else if (PC_number >= RAM.startAddressRam_number + 112 && PC_number < RAM.startAddressRam_number + 8080) {
        PC_number = RAM.reduceToRange2000h(PC_number);
        xPos = PC_number % 8 + 36;
        yPos = 16;
        if (PC_number % 16 > 7)
            yPos += 1;
    }
    else if (PC_number >= RAM.startAddressRam_number + 8080 && PC_number < RAM.startAddressRam_number + 8192) {
        PC_number = RAM.reduceToRange2000h(PC_number);
        xPos = PC_number % 8 + 36;
        yPos = Math.floor((PC_number - 7952) / 8) + 2;
    }
    else {
        redRectangle_p.classList.add('displayNone');
    }
    redRectangle_p.style.left = 100 / 46 * xPos + "%";
    redRectangle_p.style.top = 100 / 32 * yPos + "%";
};
updateRedRectangle(0);
/***************************************************implementation of the animations***************************************************/
/**
 * The following functions are basic functions, which are requiered often.
 */
//Sleep functions for pausing Animation for a certain time
var sleepForMs = function (milliseconds_number) { return new Promise(function (resolve) { return setTimeout(resolve, milliseconds_number); }); };
//throws 'Stop pressed' error
var sleep = function (milliseconds_number) { return __awaiter(_this, void 0, void 0, function () {
    var count;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                count = milliseconds_number;
                _a.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 6];
                if (!(count < 10)) return [3 /*break*/, 2];
                return [2 /*return*/, true];
            case 2: return [4 /*yield*/, sleepForMs(10)];
            case 3:
                _a.sent();
                return [4 /*yield*/, checkPlayPressed()];
            case 4:
                _a.sent();
                count -= 10;
                _a.label = 5;
            case 5: return [3 /*break*/, 1];
            case 6: return [2 /*return*/];
        }
    });
}); };
var sleepForIDLETIME = function () { return sleep(IDLETIME); };
var sleepForNOANIMATIONIDLETIME = function () { return sleep(NOANIMATIONIDLETIME); };
// function checks if play/pause/stop is pressed
var checkPlayPressed = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!true) return [3 /*break*/, 2];
                if (playStatus.play)
                    return [2 /*return*/, true];
                if (playStatus.stop)
                    throw Error('Stop Pressed');
                console.log('waiting for user input');
                return [4 /*yield*/, sleepForMs(100)];
            case 1:
                _a.sent();
                return [3 /*break*/, 0];
            case 2: return [2 /*return*/];
        }
    });
}); };
//checks if completeExecution is true
var check_completeExecution = function () {
    var check = false;
    if (PC.value_number < 224) {
        if (Array.from(romElements_array[PC.value_number].classList).includes('breakpoint'))
            check = true;
    }
    //after the completion of an animation, check if program should be paused
    if (playStatus.oneCommand || check) {
        updateStepDescription('Prozessor angehalten');
        stepNumber_p.textContent = '0';
        play();
    }
};
//adds the next command to the runningProgram_array
var pushNextCommand = function () {
    for (var i = 0; i < mc8Commands_array.length; i++) {
        if (mc8Commands_array[i].machineCommand_number === IR.value_number)
            runningProgram.push(mc8Commands_array[i].animationFunction_function);
    }
    runningProgram.push(get_next_command);
    return;
};
var getRegisterByName = function (register_string) {
    register_string = register_string.replace('_lo', '').replace('_hi', '');
    switch (register_string) {
        case 'IO1':
            return IO1;
        case 'IO2':
            return IO2;
        case 'IO3':
            return IO3;
        case 'A':
            return A;
        case 'B':
            return B;
        case 'C':
            return C;
        case 'IR':
            return IR;
        case 'ALU1':
            return ALU1;
        case 'ALU2':
            return ALU2;
        case 'ALUOUT':
            return ALUOUT;
        case 'HL':
            return HL;
        case 'IX':
            return IX;
        case 'SP':
            return SP;
        case 'PC':
            return PC;
        case 'ZR':
            return ZR;
        case 'FLAGS':
            return FLAGS;
        default:
            return null;
    }
};
/**
 * The following functions cause instant textcontent changes on the DOM.
 */
var updateStepDescription = function (description_string) {
    stepDescription_p.textContent = description_string;
};
var increaseStepNumber = function () {
    stepNumber_p.textContent = "" + (Number(stepNumber_p.textContent) + 1);
};
//Displays the the assembler notation. If the register IR contains a command which is not valid, the function throws an error.
var updateAssemblerCommand = function () {
    for (var i = 0; i < mc8Commands_array.length; i++) {
        if (mc8Commands_array[i].machineCommand_number === IR.value_number) {
            assemblerCommand_p.textContent = mc8Commands_array[i].assemblerNotation_string;
            return;
        }
    }
    assemblerCommand_p.textContent = 'Befehl unbekannt';
    throw Error('Unknown command');
};
var updateRegister = function (register_class, value_number) {
    register_class.update(value_number);
};
var updateHiRegister = function (register_class, value_number) {
    register_class.updateHiByte(value_number);
};
var updateLoRegister = function (register_class, value_number) {
    register_class.updateLoByte(value_number);
};
/**
 * The following functions are responsible for small animations that occur over and over again.
 */
var addYellowBackgroundForIDLETIME = function (htmlElement_htmlElement) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, , 5, 6]);
                if (!!playStatus.noAnim) return [3 /*break*/, 2];
                htmlElement_htmlElement.classList.add('yellowBg');
                return [4 /*yield*/, sleepForIDLETIME()];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, sleepForNOANIMATIONIDLETIME()];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                htmlElement_htmlElement.classList.remove('yellowBg');
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); };
var animateArrow = function (arrow_string) { return __awaiter(_this, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!!playStatus.noAnim) return [3 /*break*/, 62];
                _a = arrow_string;
                switch (_a) {
                    case 'PC': return [3 /*break*/, 1];
                    case 'ZR': return [3 /*break*/, 6];
                    case 'HL': return [3 /*break*/, 11];
                    case 'IX': return [3 /*break*/, 16];
                    case 'SP': return [3 /*break*/, 21];
                    case 'IR': return [3 /*break*/, 26];
                    case 'FLAGS': return [3 /*break*/, 31];
                    case 'cFlag': return [3 /*break*/, 36];
                    case 'jumpZ': return [3 /*break*/, 41];
                    case 'jumpC': return [3 /*break*/, 46];
                    case 'jumpS': return [3 /*break*/, 51];
                    case 'jumpP': return [3 /*break*/, 56];
                }
                return [3 /*break*/, 61];
            case 1:
                registerArrow_div.classList.add('PC_arrow');
                _b.label = 2;
            case 2:
                _b.trys.push([2, , 4, 5]);
                return [4 /*yield*/, sleepForIDLETIME()];
            case 3:
                _b.sent();
                return [3 /*break*/, 5];
            case 4:
                registerArrow_div.classList.remove('PC_arrow');
                return [7 /*endfinally*/];
            case 5: return [3 /*break*/, 62];
            case 6:
                registerArrow_div.classList.add('ZR_arrow');
                _b.label = 7;
            case 7:
                _b.trys.push([7, , 9, 10]);
                return [4 /*yield*/, sleepForIDLETIME()];
            case 8:
                _b.sent();
                return [3 /*break*/, 10];
            case 9:
                registerArrow_div.classList.remove('ZR_arrow');
                return [7 /*endfinally*/];
            case 10: return [3 /*break*/, 62];
            case 11:
                registerArrow_div.classList.add('HL_arrow');
                _b.label = 12;
            case 12:
                _b.trys.push([12, , 14, 15]);
                return [4 /*yield*/, sleepForIDLETIME()];
            case 13:
                _b.sent();
                return [3 /*break*/, 15];
            case 14:
                registerArrow_div.classList.remove('HL_arrow');
                return [7 /*endfinally*/];
            case 15: return [3 /*break*/, 62];
            case 16:
                registerArrow_div.classList.add('IX_arrow');
                _b.label = 17;
            case 17:
                _b.trys.push([17, , 19, 20]);
                return [4 /*yield*/, sleepForIDLETIME()];
            case 18:
                _b.sent();
                return [3 /*break*/, 20];
            case 19:
                registerArrow_div.classList.remove('IX_arrow');
                return [7 /*endfinally*/];
            case 20: return [3 /*break*/, 62];
            case 21:
                registerArrow_div.classList.add('SP_arrow');
                _b.label = 22;
            case 22:
                _b.trys.push([22, , 24, 25]);
                return [4 /*yield*/, sleepForIDLETIME()];
            case 23:
                _b.sent();
                return [3 /*break*/, 25];
            case 24:
                registerArrow_div.classList.remove('SP_arrow');
                return [7 /*endfinally*/];
            case 25: return [3 /*break*/, 62];
            case 26:
                irArrow_div.classList.add('ir_arrow');
                _b.label = 27;
            case 27:
                _b.trys.push([27, , 29, 30]);
                return [4 /*yield*/, sleepForIDLETIME()];
            case 28:
                _b.sent();
                return [3 /*break*/, 30];
            case 29:
                irArrow_div.classList.remove('ir_arrow');
                return [7 /*endfinally*/];
            case 30: return [3 /*break*/, 62];
            case 31:
                movingFlagsArrow_div.classList.add('flags_arrow');
                _b.label = 32;
            case 32:
                _b.trys.push([32, , 34, 35]);
                return [4 /*yield*/, sleepForIDLETIME()];
            case 33:
                _b.sent();
                return [3 /*break*/, 35];
            case 34:
                movingFlagsArrow_div.classList.remove('flags_arrow');
                return [7 /*endfinally*/];
            case 35: return [3 /*break*/, 62];
            case 36:
                cFlagArrow_div.classList.add('cFlag_arrow');
                FLAGS.c_htmlElement.classList.add('yellowBg', 'borderBox');
                _b.label = 37;
            case 37:
                _b.trys.push([37, , 39, 40]);
                return [4 /*yield*/, sleepForIDLETIME()];
            case 38:
                _b.sent();
                return [3 /*break*/, 40];
            case 39:
                cFlagArrow_div.classList.remove('cFlag_arrow');
                FLAGS.c_htmlElement.classList.remove('yellowBg', 'borderBox');
                return [7 /*endfinally*/];
            case 40: return [3 /*break*/, 62];
            case 41:
                checkJumpArrow_div.classList.add('jump_arrow');
                FLAGS.z_htmlElement.classList.add('yellowBg', 'borderBox');
                _b.label = 42;
            case 42:
                _b.trys.push([42, , 44, 45]);
                return [4 /*yield*/, sleepForIDLETIME()];
            case 43:
                _b.sent();
                return [3 /*break*/, 45];
            case 44:
                checkJumpArrow_div.classList.remove('jump_arrow');
                FLAGS.z_htmlElement.classList.remove('yellowBg', 'borderBox');
                return [7 /*endfinally*/];
            case 45: return [3 /*break*/, 62];
            case 46:
                checkJumpArrow_div.classList.add('jump_arrow');
                FLAGS.c_htmlElement.classList.add('yellowBg', 'borderBox');
                _b.label = 47;
            case 47:
                _b.trys.push([47, , 49, 50]);
                return [4 /*yield*/, sleepForIDLETIME()];
            case 48:
                _b.sent();
                return [3 /*break*/, 50];
            case 49:
                checkJumpArrow_div.classList.remove('jump_arrow');
                FLAGS.c_htmlElement.classList.remove('yellowBg', 'borderBox');
                return [7 /*endfinally*/];
            case 50: return [3 /*break*/, 62];
            case 51:
                checkJumpArrow_div.classList.add('jump_arrow');
                FLAGS.s_htmlElement.classList.add('yellowBg', 'borderBox');
                _b.label = 52;
            case 52:
                _b.trys.push([52, , 54, 55]);
                return [4 /*yield*/, sleepForIDLETIME()];
            case 53:
                _b.sent();
                return [3 /*break*/, 55];
            case 54:
                checkJumpArrow_div.classList.remove('jump_arrow');
                FLAGS.s_htmlElement.classList.remove('yellowBg', 'borderBox');
                return [7 /*endfinally*/];
            case 55: return [3 /*break*/, 62];
            case 56:
                checkJumpArrow_div.classList.add('jump_arrow');
                FLAGS.p_htmlElement.classList.add('yellowBg', 'borderBox');
                _b.label = 57;
            case 57:
                _b.trys.push([57, , 59, 60]);
                return [4 /*yield*/, sleepForIDLETIME()];
            case 58:
                _b.sent();
                return [3 /*break*/, 60];
            case 59:
                checkJumpArrow_div.classList.remove('jump_arrow');
                FLAGS.p_htmlElement.classList.remove('yellowBg', 'borderBox');
                return [7 /*endfinally*/];
            case 60: return [3 /*break*/, 62];
            case 61: return [3 /*break*/, 62];
            case 62: return [2 /*return*/];
        }
    });
}); };
var animateStepDescriptionUpdate = function (description_string) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                updateStepDescription(description_string);
                increaseStepNumber();
                return [4 /*yield*/, addYellowBackgroundForIDLETIME(stepNumberBg_div)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var animateAssemlberCommandUpdate = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, addYellowBackgroundForIDLETIME(IR.htmlElement)];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateArrow('IR')];
            case 2:
                _a.sent();
                updateAssemblerCommand();
                if (!!playStatus.noAnim) return [3 /*break*/, 4];
                return [4 /*yield*/, sleepForIDLETIME()];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
var animateRegisterUpdate = function (registerName_string, value_number) { return __awaiter(_this, void 0, void 0, function () {
    var reg;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reg = getRegisterByName(registerName_string);
                if (!registerName_string.includes('hi')) return [3 /*break*/, 2];
                reg.updateHiByte(value_number);
                return [4 /*yield*/, addYellowBackgroundForIDLETIME(reg.hi_register.htmlElement)];
            case 1:
                _a.sent();
                return [3 /*break*/, 8];
            case 2:
                if (!registerName_string.includes('lo')) return [3 /*break*/, 4];
                reg.updateLoByte(value_number);
                return [4 /*yield*/, addYellowBackgroundForIDLETIME(reg.lo_register.htmlElement)];
            case 3:
                _a.sent();
                return [3 /*break*/, 8];
            case 4:
                updateRegister(reg, value_number);
                if (!(reg instanceof Register_x4)) return [3 /*break*/, 6];
                addYellowBackgroundForIDLETIME(reg.hi_register.htmlElement);
                addYellowBackgroundForIDLETIME(reg.lo_register.htmlElement);
                return [4 /*yield*/, addYellowBackgroundForIDLETIME(reg.backgroundHtmlElement)];
            case 5:
                _a.sent();
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, addYellowBackgroundForIDLETIME(reg.htmlElement)];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); };
var animateIncreasePcByOne = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Erhöhe Programmzähler um 1')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateArrow('PC')];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('PC', PC.value_number + 1)];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
/**
 * Transfer animations
 */
var updateMovingObjPosition = function (movingObject_htmlElement, x_number, y_number) {
    movingObject_htmlElement.style.top = String(100 / 32 * y_number) + "%";
    movingObject_htmlElement.style.left = String(100 / 46 * x_number) + "%";
};
var displayMovingObj = function (pointsAtoB_array, hexValue_string) {
    updateMovingObjPosition(movingObject_h2, pointsAtoB_array[0].x, pointsAtoB_array[0].y);
    movingObject_h2.textContent = hexValue_string;
    if (pointsAtoB_array[0].label === 'PC' || pointsAtoB_array[0].label === 'ZR' || pointsAtoB_array[0].label === 'IX' || pointsAtoB_array[0].label === 'HL' || pointsAtoB_array[0].label === 'SP')
        movingObject_h2.classList.add('rectangle4x2');
    else {
        movingObject_h2.classList.remove('rectangle4x2');
    }
    movingObject_h2.classList.add('displayGrid');
};
var animatePaintedPath = function (pointsAtoB_array, origin_string, target_string) { return __awaiter(_this, void 0, void 0, function () {
    var pathElements, coords, xCoordinate, yCoordinate, i, i, ele, last, i, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pathElements = [];
                coords = calcIntermediatePositions(pointsAtoB_array, 2);
                xCoordinate = coords[0].flat(2);
                yCoordinate = coords[1].flat(2);
                //fixPoints of PC,ZR,... are too far to the left due to the size of 4x2 --> Painted path has to be moved right by 1
                if (origin_string === 'PC' || origin_string === 'ZR' || origin_string === 'HL' || origin_string === 'SP' || origin_string === 'IX') {
                    for (i = 0; i < xCoordinate.length; i++) {
                        xCoordinate[i] += 1;
                    }
                    if (target_string === 'ROM2') {
                        xCoordinate.push(xCoordinate[xCoordinate.length - 1] - 1);
                        yCoordinate.push(yCoordinate[yCoordinate.length - 1]);
                    }
                    else {
                        xCoordinate.push(xCoordinate[xCoordinate.length - 1] - 1);
                        yCoordinate.push(yCoordinate[yCoordinate.length - 1]);
                    }
                }
                //create all PathElements
                for (i = xCoordinate.length - 1; i >= 0; i--) {
                    ele = document.createElement('div');
                    ele.style.left = 100 / 46 * (xCoordinate[i] + 0.5) + "%";
                    ele.style.top = 100 / 32 * (yCoordinate[i] + 0.5) + "%";
                    ele.classList.add('positionAbsolute', 'square1x1', 'pathElement', 'alignBg', 'rounded');
                    pathElements.push(ele);
                }
                last = document.createElement('h2');
                last.style.left = 100 / 46 * (xCoordinate[xCoordinate.length - 1]) + "%";
                last.style.top = 100 / 32 * (yCoordinate[yCoordinate.length - 1]) + "%";
                last.textContent = movingObject_h2.textContent;
                last.classList.add('yellowBg', 'borderBox', 'square2x2', 'positionAbsolute', 'centered', 'rounded');
                if (origin_string === 'PC' || origin_string === 'ZR' || origin_string === 'HL' || origin_string === 'SP' || origin_string === 'IX')
                    last.classList.add('rectangle4x2');
                pathElements.push(last);
                for (i = 0; i < pathElements.length; i++) {
                    mc8_div.appendChild(pathElements[i]);
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, , 3, 4]);
                return [4 /*yield*/, sleep(2000 / ANIMATION_SPEED)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                //remove 
                for (i = 0; i < pathElements.length; i++) {
                    pathElements[i].remove();
                }
                movingObject_h2.classList.remove('displayGrid');
                return [7 /*endfinally*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
//updates the position of the movingObject depending on the speed(values: 1,2,3,4,6,12) => 12/values is always an integer
//e.g.  if the speed is 12 the position is only updated once(last coordinate of x12array)
//      if the speed is 3 the position is updated with every third coordinate,... 
var conditionalPositionUpdate = function (xCoordinates_array, yCoordinates_array, speed_number, movObject_htmlElement) { return __awaiter(_this, void 0, void 0, function () {
    var j, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                j = 0;
                _a.label = 1;
            case 1:
                if (!(j < xCoordinates_array.length / speed_number)) return [3 /*break*/, 6];
                updateMovingObjPosition(movObject_htmlElement, xCoordinates_array[j * speed_number], yCoordinates_array[j * speed_number]);
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, sleep(1000 / FRAMES)];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                movingObject_h2.classList.remove('displayGrid');
                throw e_1;
            case 5:
                j++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/, true];
        }
    });
}); };
//animates the movement from on fixPoint to another one
var animateTransfer = function (origin_string, target_string, value_number) {
    if (value_number === void 0) { value_number = 0; }
    return __awaiter(_this, void 0, void 0, function () {
        var originInCPU, targetInCPU, alreadyReset, pointsAtoB, value_string, movingObjectCoordinates, xCoordinate, yCoordinate, lastPointY, lastPointX, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    originInCPU = false;
                    targetInCPU = false;
                    alreadyReset = false;
                    if (!!playStatus.noAnim) return [3 /*break*/, 7];
                    pointsAtoB = getPointsAtoB(origin_string, target_string);
                    value_string = void 0;
                    //convert value_number to hex_4digits if required
                    if (value_number > 255 || target_string === 'ROM2' || target_string === 'RAM2' || target_string === 'ZR' || target_string === 'PC' || target_string === 'IX' || target_string === 'HL' || target_string === 'SP')
                        value_string = convertNumberToHex_4digits(value_number);
                    else
                        value_string = convertNumberToHex_2digits(value_number);
                    //update the moving Element
                    displayMovingObj(pointsAtoB, value_string);
                    movingObjectCoordinates = calcIntermediatePositions(pointsAtoB, 12);
                    xCoordinate = movingObjectCoordinates[0];
                    yCoordinate = movingObjectCoordinates[1];
                    //check if origin is inside CPU
                    if (yCoordinate[0][0] < 24 && yCoordinate[0][0] > 3 && xCoordinate[0][0] > 9 && xCoordinate[0][0]) {
                        originInCPU = true;
                    }
                    lastPointY = yCoordinate[yCoordinate.length - 1][11];
                    lastPointX = xCoordinate[xCoordinate.length - 1][11];
                    if (lastPointY < 24 && lastPointY > 3 && lastPointX > 9 && lastPointX) {
                        targetInCPU = true;
                    }
                    if (!playStatus.rocketSpeed) return [3 /*break*/, 2];
                    if (!originInCPU || !targetInCPU)
                        DECODER.updateDOM();
                    return [4 /*yield*/, animatePaintedPath(pointsAtoB, origin_string, target_string)];
                case 1:
                    _a.sent();
                    if (!DECODER.isRamAccess && !DECODER.isIoAccess) {
                        DECODER.resetDOM();
                    }
                    return [3 /*break*/, 6];
                case 2:
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < movingObjectCoordinates[0].length)) return [3 /*break*/, 6];
                    //if singleStep is pressed during the animation, remove movingObject and jump out of function
                    if (playStatus.noAnim) {
                        movingObject_h2.classList.remove('displayGrid');
                        return [2 /*return*/, true];
                    }
                    //display decoder
                    if ((originInCPU && !targetInCPU) || (!originInCPU && targetInCPU)) {
                        if (yCoordinate[i][0] < 24 && yCoordinate[i][0] > 3 && xCoordinate[i][0] > 9 && xCoordinate[i][0]) {
                            if (!alreadyReset) {
                                if (!DECODER.isRamAccess && !DECODER.isIoAccess) {
                                    DECODER.resetDOM();
                                    alreadyReset = true;
                                }
                            }
                        }
                    }
                    if (originInCPU && (yCoordinate[i][0] > 23 || yCoordinate[i][0] < 3)) {
                        DECODER.updateDOM();
                    }
                    //update position of the movingObject depending on the speed
                    return [4 /*yield*/, conditionalPositionUpdate(xCoordinate[i], yCoordinate[i], ANIMATION_SPEED, movingObject_h2)];
                case 4:
                    //update position of the movingObject depending on the speed
                    _a.sent();
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 3];
                case 6:
                    //remove Element when transfer was successful 
                    movingObject_h2.classList.remove('displayGrid');
                    return [3 /*break*/, 9];
                case 7:
                    if (!originInCPU || !targetInCPU)
                        DECODER.updateDOM();
                    return [4 /*yield*/, sleepForNOANIMATIONIDLETIME()];
                case 8:
                    _a.sent();
                    DECODER.resetDOM();
                    _a.label = 9;
                case 9: return [2 /*return*/];
            }
        });
    });
};
//reads a byte from the ROM or RAM. The addressRegister 
var animateReadFromMemoryInRegister = function (addressRegister_string, targetRegister_string) { return __awaiter(_this, void 0, void 0, function () {
    var address_number;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                address_number = getRegisterByName(addressRegister_string).value_number;
                //update decoder without displaying  
                DECODER.update(1, 0, 0, 1, address_number);
                return [4 /*yield*/, animateArrow(addressRegister_string)];
            case 1:
                _a.sent();
                if (!(address_number < 8192)) return [3 /*break*/, 5];
                return [4 /*yield*/, animateTransfer(addressRegister_string, 'ROM2', address_number)];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateTransfer(ROM.getElementId(address_number), targetRegister_string, ROM.getValue(address_number))];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate(targetRegister_string, ROM.getValue(address_number))];
            case 4:
                _a.sent();
                return [3 /*break*/, 27];
            case 5:
                if (!(address_number >= RAM.startAddressRam_number && address_number < RAM.startAddressRam_number + RAM.size_number)) return [3 /*break*/, 9];
                RAM.updateVariableElements(address_number);
                return [4 /*yield*/, animateTransfer(addressRegister_string, 'RAM2', address_number)];
            case 6:
                _a.sent();
                return [4 /*yield*/, animateTransfer(RAM.getRamElementId(address_number), targetRegister_string, RAM.getValue(address_number))];
            case 7:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate(targetRegister_string, RAM.getValue(address_number))];
            case 8:
                _a.sent();
                return [3 /*break*/, 27];
            case 9:
                if (!!IO1.ioMapped_boolean) return [3 /*break*/, 25];
                if (!(address_number === IO1.address_number)) return [3 /*break*/, 14];
                return [4 /*yield*/, animateTransfer(addressRegister_string, 'DEC_UPDATE', address_number)];
            case 10:
                _a.sent();
                return [4 /*yield*/, animateIoUserInput('IO1')];
            case 11:
                _a.sent();
                return [4 /*yield*/, animateTransfer('IO1', 'A', IO1.value_number)];
            case 12:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('A', IO1.value_number)];
            case 13:
                _a.sent();
                return [3 /*break*/, 24];
            case 14:
                if (!(address_number === IO2.address_number)) return [3 /*break*/, 19];
                return [4 /*yield*/, animateTransfer(addressRegister_string, 'DEC_UPDATE', address_number)];
            case 15:
                _a.sent();
                return [4 /*yield*/, animateIoUserInput('IO2')];
            case 16:
                _a.sent();
                return [4 /*yield*/, animateTransfer('IO2', 'A', IO2.value_number)];
            case 17:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('A', IO2.value_number)];
            case 18:
                _a.sent();
                return [3 /*break*/, 24];
            case 19:
                if (!(address_number === IO3.address_number)) return [3 /*break*/, 24];
                return [4 /*yield*/, animateTransfer(addressRegister_string, 'DEC_UPDATE', address_number)];
            case 20:
                _a.sent();
                return [4 /*yield*/, animateIoUserInput('IO2')];
            case 21:
                _a.sent();
                return [4 /*yield*/, animateTransfer('IO2', 'A', IO3.value_number)];
            case 22:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('A', IO3.value_number)];
            case 23:
                _a.sent();
                _a.label = 24;
            case 24: return [3 /*break*/, 27];
            case 25: 
            //The address of the addressRegister is unknown.
            //the following code wont be executed completely, because the decoder will interrupt execution
            return [4 /*yield*/, animateTransfer(addressRegister_string, 'DEC_UPDATE', address_number)];
            case 26:
                //The address of the addressRegister is unknown.
                //the following code wont be executed completely, because the decoder will interrupt execution
                _a.sent();
                _a.label = 27;
            case 27:
                DECODER.resetDOM();
                return [2 /*return*/];
        }
    });
}); };
var animateWriteToMemoryFromRegister = function (addressRegister_string, dataRegister_string) { return __awaiter(_this, void 0, void 0, function () {
    var ramEle_htmlElement, address_number, register_class, data_number, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                address_number = getRegisterByName(addressRegister_string).value_number;
                register_class = getRegisterByName(dataRegister_string);
                data_number = register_class.value_number;
                if (dataRegister_string.includes('hi'))
                    data_number = register_class.hiValue_number;
                if (dataRegister_string.includes('lo'))
                    data_number = register_class.loValue_number;
                //update decoder, without displaying it
                DECODER.update(0, 1, 0, 1, address_number);
                return [4 /*yield*/, animateArrow(addressRegister_string)];
            case 1:
                _a.sent();
                if (!(address_number < 8192)) return [3 /*break*/, 3];
                //wont be executed completely, because the decoder will interrupt execution 
                return [4 /*yield*/, animateTransfer(addressRegister_string, 'ROM2', address_number)];
            case 2:
                //wont be executed completely, because the decoder will interrupt execution 
                _a.sent();
                return [3 /*break*/, 11];
            case 3:
                if (!(address_number >= RAM.startAddressRam_number && address_number < RAM.startAddressRam_number + RAM.size_number)) return [3 /*break*/, 9];
                ramEle_htmlElement = getHtmlElement(RAM.getRamElementId(address_number));
                RAM.updateVariableElements(address_number);
                return [4 /*yield*/, animateTransfer(addressRegister_string, 'RAM2', address_number)];
            case 4:
                _a.sent();
                if (!playStatus.noAnim)
                    ramEle_htmlElement.classList.add('yellowBg', 'borderBox');
                _a.label = 5;
            case 5:
                _a.trys.push([5, 7, , 8]);
                return [4 /*yield*/, animateTransfer(dataRegister_string, RAM.getRamElementId(address_number), data_number)];
            case 6:
                _a.sent();
                return [3 /*break*/, 8];
            case 7:
                e_2 = _a.sent();
                ramEle_htmlElement.classList.remove('yellowBg', 'borderBox');
                throw e_2;
            case 8: return [3 /*break*/, 11];
            case 9: 
            //wont be executed completely, because the decoder will interrupt execution 
            return [4 /*yield*/, animateTransfer(addressRegister_string, 'RAM2', address_number)];
            case 10:
                //wont be executed completely, because the decoder will interrupt execution 
                _a.sent();
                _a.label = 11;
            case 11:
                RAM.updateElement(address_number, data_number);
                _a.label = 12;
            case 12:
                _a.trys.push([12, , 14, 15]);
                return [4 /*yield*/, addYellowBackgroundForIDLETIME(document.getElementById(RAM.getRamElementId(address_number)))];
            case 13:
                _a.sent();
                return [3 /*break*/, 15];
            case 14:
                ramEle_htmlElement.classList.remove('borderBox', 'yellowBg');
                DECODER.resetDOM();
                return [7 /*endfinally*/];
            case 15: return [2 /*return*/];
        }
    });
}); };
/**
 * ALU animations
 */
var setMovingAluElements = function (twoMovingAluElements_boolean) {
    movingAlu1.textContent = ALU1.htmlElement.textContent;
    movingAlu2.textContent = ALU2.htmlElement.textContent;
    movingAlu1.classList.add('displayGrid');
    if (twoMovingAluElements_boolean)
        movingAlu2.classList.add('displayGrid');
};
var resetMovingAluElements = function () {
    movingAlu1.classList.remove('displayGrid');
    movingAlu2.classList.remove('displayGrid');
    movingAlu1.style.top = 100 / 32 * 6 + "%";
    movingAlu1.style.left = 100 / 46 * 24 + "%";
    movingAlu2.style.top = 100 / 32 * 6 + "%";
    movingAlu2.style.left = 100 / 46 * 30 + "%";
};
resetMovingAluElements();
//animation of ALU-usage
var animateALU = function (aluOUT_number, twoMovingAluElements_boolean, cFlag_boolean, saveToRegister_string) { return __awaiter(_this, void 0, void 0, function () {
    var xCoordinateAlu1, xCoordinateAlu2, yCoordinate, j, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!playStatus.noAnim) return [3 /*break*/, 12];
                xCoordinateAlu1 = [24];
                xCoordinateAlu2 = [30];
                yCoordinate = [6];
                for (j = 0; j < 30; j++) {
                    xCoordinateAlu1.push(xCoordinateAlu1[j] + 0.1);
                    xCoordinateAlu2.push(xCoordinateAlu2[j] - 0.1);
                    yCoordinate.push(yCoordinate[j] + 1 / 7.5);
                }
                setMovingAluElements(twoMovingAluElements_boolean);
                ALU1.htmlElement.textContent = '';
                ALU2.htmlElement.textContent = '';
                _a.label = 1;
            case 1:
                _a.trys.push([1, , 10, 11]);
                if (!cFlag_boolean) return [3 /*break*/, 3];
                return [4 /*yield*/, animateArrow('cFlag')];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [4 /*yield*/, sleepForIDLETIME()];
            case 4:
                _a.sent();
                i = 0;
                _a.label = 5;
            case 5:
                if (!(i < xCoordinateAlu1.length)) return [3 /*break*/, 8];
                updateMovingObjPosition(movingAlu1, xCoordinateAlu1[i], yCoordinate[i]);
                updateMovingObjPosition(movingAlu2, xCoordinateAlu2[i], yCoordinate[i]);
                return [4 /*yield*/, sleep(1000 / FRAMES)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                i++;
                return [3 /*break*/, 5];
            case 8:
                resetMovingAluElements();
                ALUOUT.htmlElement.classList.add('borderBox');
                return [4 /*yield*/, animateRegisterUpdate('ALUOUT', aluOUT_number)];
            case 9:
                _a.sent();
                return [3 /*break*/, 11];
            case 10:
                resetMovingAluElements();
                return [7 /*endfinally*/];
            case 11:
                ALUOUT.htmlElement.classList.add('yellowBg');
                return [3 /*break*/, 14];
            case 12: //noAnim
            return [4 /*yield*/, animateRegisterUpdate('ALUOUT', aluOUT_number)];
            case 13:
                _a.sent();
                ALU1.htmlElement.textContent = '';
                ALU2.htmlElement.textContent = '';
                _a.label = 14;
            case 14:
                _a.trys.push([14, , 19, 20]);
                return [4 /*yield*/, animateStepDescriptionUpdate('Setze die Flags')];
            case 15:
                _a.sent();
                return [4 /*yield*/, animateSetFlags()];
            case 16:
                _a.sent();
                if (!saveToRegister_string) return [3 /*break*/, 18];
                return [4 /*yield*/, animateStepDescriptionUpdate('Speichere das Ergebnis')];
            case 17:
                _a.sent();
                _a.label = 18;
            case 18: return [3 /*break*/, 20];
            case 19:
                ALUOUT.htmlElement.classList.remove('yellowBg', 'borderBox');
                ALUOUT.htmlElement.textContent = '';
                return [7 /*endfinally*/];
            case 20:
                if (!(saveToRegister_string !== '')) return [3 /*break*/, 23];
                return [4 /*yield*/, animateTransfer('ALUOUT', saveToRegister_string, aluOUT_number)];
            case 21:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate(saveToRegister_string, aluOUT_number)];
            case 22:
                _a.sent();
                _a.label = 23;
            case 23: return [2 /*return*/];
        }
    });
}); };
var animateHlBcAddition = function (aluOUT_number, stepOne_boolean) { return __awaiter(_this, void 0, void 0, function () {
    var xCoordinateAlu1, xCoordinateAlu2, yCoordinate, j, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!playStatus.noAnim) return [3 /*break*/, 12];
                xCoordinateAlu1 = [24];
                xCoordinateAlu2 = [30];
                yCoordinate = [6];
                for (j = 0; j < 30; j++) {
                    xCoordinateAlu1.push(xCoordinateAlu1[j] + 0.1);
                    xCoordinateAlu2.push(xCoordinateAlu2[j] - 0.1);
                    yCoordinate.push(yCoordinate[j] + 1 / 7.5);
                }
                setMovingAluElements(true);
                ALU1.htmlElement.textContent = '';
                ALU2.htmlElement.textContent = '';
                _a.label = 1;
            case 1:
                _a.trys.push([1, , 10, 11]);
                if (!!stepOne_boolean) return [3 /*break*/, 3];
                return [4 /*yield*/, animateArrow('cFlag')];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [4 /*yield*/, sleepForIDLETIME()];
            case 4:
                _a.sent();
                i = 0;
                _a.label = 5;
            case 5:
                if (!(i < xCoordinateAlu1.length)) return [3 /*break*/, 8];
                updateMovingObjPosition(movingAlu1, xCoordinateAlu1[i], yCoordinate[i]);
                updateMovingObjPosition(movingAlu2, xCoordinateAlu2[i], yCoordinate[i]);
                return [4 /*yield*/, sleep(1000 / FRAMES)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                i++;
                return [3 /*break*/, 5];
            case 8:
                resetMovingAluElements();
                return [4 /*yield*/, animateRegisterUpdate('ALUOUT', aluOUT_number)];
            case 9:
                _a.sent();
                return [3 /*break*/, 11];
            case 10:
                resetMovingAluElements();
                return [7 /*endfinally*/];
            case 11:
                ALUOUT.htmlElement.classList.add('yellowBg');
                return [3 /*break*/, 14];
            case 12: //noAnim
            return [4 /*yield*/, animateRegisterUpdate('ALUOUT', aluOUT_number)];
            case 13:
                _a.sent();
                ALU1.htmlElement.textContent = '';
                ALU2.htmlElement.textContent = '';
                _a.label = 14;
            case 14:
                if (!stepOne_boolean) return [3 /*break*/, 23];
                _a.label = 15;
            case 15:
                _a.trys.push([15, , 19, 20]);
                return [4 /*yield*/, animateStepDescriptionUpdate('Setze Carry-Flag')];
            case 16:
                _a.sent();
                FLAGS.z_number = '-';
                FLAGS.s_number = '-';
                FLAGS.p_number = '-';
                return [4 /*yield*/, animateSetFlags()];
            case 17:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Speichere das Ergebnis in L')];
            case 18:
                _a.sent();
                return [3 /*break*/, 20];
            case 19:
                ALUOUT.htmlElement.classList.remove('yellowBg');
                ALUOUT.htmlElement.textContent = '';
                return [7 /*endfinally*/];
            case 20: return [4 /*yield*/, animateTransfer('ALUOUT', 'HL_lo', aluOUT_number)];
            case 21:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('HL_lo', aluOUT_number)];
            case 22:
                _a.sent();
                return [3 /*break*/, 31];
            case 23:
                _a.trys.push([23, , 27, 28]);
                return [4 /*yield*/, animateStepDescriptionUpdate('Setze Carry-Flag')];
            case 24:
                _a.sent();
                FLAGS.z_number = '-';
                FLAGS.s_number = '-';
                FLAGS.p_number = '-';
                return [4 /*yield*/, animateSetFlags()];
            case 25:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Speichere das Ergebnis in H')];
            case 26:
                _a.sent();
                return [3 /*break*/, 28];
            case 27:
                ALUOUT.htmlElement.classList.remove('yellowBg');
                ALUOUT.htmlElement.textContent = '';
                return [7 /*endfinally*/];
            case 28: return [4 /*yield*/, animateTransfer('ALUOUT', 'HL_hi', aluOUT_number)];
            case 29:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('HL_hi', aluOUT_number)];
            case 30:
                _a.sent();
                _a.label = 31;
            case 31: return [2 /*return*/];
        }
    });
}); };
//animation of setting flags
var animateSetFlags = function () { return __awaiter(_this, void 0, void 0, function () {
    var i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!playStatus.noAnim) return [3 /*break*/, 10];
                return [4 /*yield*/, animateArrow('FLAGS')];
            case 1:
                _a.sent();
                movingFlags_div.children[0].textContent = FLAGS.c_number;
                movingFlags_div.children[1].textContent = FLAGS.z_number;
                movingFlags_div.children[2].textContent = FLAGS.p_number;
                movingFlags_div.children[3].textContent = FLAGS.s_number;
                movingFlags_div.classList.add('displayGrid');
                _a.label = 2;
            case 2:
                _a.trys.push([2, , 9, 10]);
                return [4 /*yield*/, sleepForIDLETIME()];
            case 3:
                _a.sent();
                i = 0;
                _a.label = 4;
            case 4:
                if (!(i < 21)) return [3 /*break*/, 7];
                movingFlags_div.style.top = 100 / 32 * (8 - i / 20) + "%";
                return [4 /*yield*/, sleep(1000 / FRAMES)];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                i++;
                return [3 /*break*/, 4];
            case 7: return [4 /*yield*/, sleepForIDLETIME()];
            case 8:
                _a.sent();
                return [3 /*break*/, 10];
            case 9:
                movingFlags_div.classList.remove('displayGrid');
                movingFlags_div.style.top = 100 / 32 * 8 + "%";
                return [7 /*endfinally*/];
            case 10:
                FLAGS.updateDOM();
                return [2 /*return*/];
        }
    });
}); };
var animateCheckJump = function (flag_string) { return __awaiter(_this, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = flag_string;
                switch (_a) {
                    case 'zFlag': return [3 /*break*/, 1];
                    case 'cFlag': return [3 /*break*/, 3];
                    case 'sFlag': return [3 /*break*/, 5];
                    case 'pFlag': return [3 /*break*/, 7];
                }
                return [3 /*break*/, 9];
            case 1: return [4 /*yield*/, animateArrow('jumpZ')];
            case 2:
                _b.sent();
                return [3 /*break*/, 10];
            case 3: return [4 /*yield*/, animateArrow('jumpC')];
            case 4:
                _b.sent();
                return [3 /*break*/, 10];
            case 5: return [4 /*yield*/, animateArrow('jumpS')];
            case 6:
                _b.sent();
                return [3 /*break*/, 10];
            case 7: return [4 /*yield*/, animateArrow('jumpP')];
            case 8:
                _b.sent();
                return [3 /*break*/, 10];
            case 9: return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
/**
 * IO animations
 */
var checkCorrectIoInput = function (input_string) {
    if (checkValidHex(input_string)) {
        if (input_string.length > 2) {
            return false;
        }
        return true;
    }
    return false;
};
//animation of IO-input
var animateIoUserInput = function (IoName_string) { return __awaiter(_this, void 0, void 0, function () {
    var ioInputWindow, ioInput, check;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                check = true;
                ioInputDisplayed_boolean = true;
                switch (IoName_string) {
                    case 'IO1':
                        ioInputWindow = io1InputWindow_div;
                        ioInput = io1Input_input;
                        break;
                    case 'IO2':
                        ioInputWindow = io2InputWindow_div;
                        ioInput = io2Input_input;
                        break;
                    case 'IO3':
                        ioInputWindow = io3InputWindow_div;
                        ioInput = io3Input_input;
                        break;
                    default:
                        throw Error('Unknown IO');
                }
                ioInputWindow.classList.add('displayGrid');
                ioInput.select();
                _a.label = 1;
            case 1:
                _a.trys.push([1, , 5, 6]);
                _a.label = 2;
            case 2:
                if (!check) return [3 /*break*/, 4];
                pause();
                return [4 /*yield*/, checkPlayPressed()];
            case 3:
                _a.sent();
                if (ioInput.value === '')
                    ioInput.value = 'FF';
                if (checkCorrectIoInput(ioInput.value)) {
                    check = false;
                }
                else {
                    if (IoName_string === 'IO1') {
                        document.getElementById('io1InputInfo_p').textContent = 'Das ist keine gültige zweistellige Hex-Zahl. Verwenden Sie nur die Zahlen  0-9 und die Zeichen A-F!';
                    }
                    else if (IoName_string === 'IO2') {
                        document.getElementById('io2InputInfo_p').textContent = 'Das ist keine gültige zweistellige Hex-Zahl. Verwenden Sie nur die Zahlen  0-9 und die Zeichen A-F!';
                    }
                    else if (IoName_string === 'IO3') {
                        document.getElementById('io3InputInfo_p').textContent = 'Das ist keine gültige zweistellige Hex-Zahl. Verwenden Sie nur die Zahlen  0-9 und die Zeichen A-F!';
                    }
                }
                return [3 /*break*/, 2];
            case 4: return [3 /*break*/, 6];
            case 5:
                ioInputWindow.classList.remove('displayGrid');
                document.getElementById('io1InputInfo_p').textContent = 'Geben Sie eine zweistellige Hexadezimalzahl ein!';
                document.getElementById('io2InputInfo_p').textContent = 'Geben Sie eine zweistellige Hexadezimalzahl ein!';
                document.getElementById('io3InputInfo_p').textContent = 'Geben Sie eine zweistellige Hexadezimalzahl ein!';
                ioInputDisplayed_boolean = false;
                return [7 /*endfinally*/];
            case 6: return [4 /*yield*/, animateRegisterUpdate(IoName_string, convertHexToNumber(ioInput.value))];
            case 7:
                _a.sent();
                ioInput.value = '';
                return [2 /*return*/];
        }
    });
}); };
var animateReadFromIo = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!IO1.ioMapped_boolean) return [3 /*break*/, 35];
                DECODER.update(1, 0, 1, 0, ZR.loValue_number);
                return [4 /*yield*/, animateTransfer('ZR', 'DEC_UPDATE', ZR.loValue_number)];
            case 1:
                _a.sent();
                if (!(IO1.address_number === IO2.address_number)) return [3 /*break*/, 8];
                if (!!IO1.in_boolean) return [3 /*break*/, 4];
                return [4 /*yield*/, animateTransfer('A', 'IO2', A.value_number)];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('IO2', A.value_number)];
            case 3:
                _a.sent();
                return [3 /*break*/, 7];
            case 4: return [4 /*yield*/, animateTransfer('A', 'IO1', A.value_number)];
            case 5:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('IO1', A.value_number)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [3 /*break*/, 34];
            case 8:
                if (!(IO3.address_number === IO2.address_number)) return [3 /*break*/, 15];
                if (!!IO3.in_boolean) return [3 /*break*/, 11];
                return [4 /*yield*/, animateTransfer('A', 'IO2', A.value_number)];
            case 9:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('IO2', A.value_number)];
            case 10:
                _a.sent();
                return [3 /*break*/, 14];
            case 11: return [4 /*yield*/, animateTransfer('A', 'IO3', A.value_number)];
            case 12:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('IO3', A.value_number)];
            case 13:
                _a.sent();
                _a.label = 14;
            case 14: return [3 /*break*/, 34];
            case 15:
                if (!(IO1.address_number === IO3.address_number)) return [3 /*break*/, 22];
                if (!!IO1.in_boolean) return [3 /*break*/, 18];
                return [4 /*yield*/, animateTransfer('A', 'IO3', A.value_number)];
            case 16:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('IO3', A.value_number)];
            case 17:
                _a.sent();
                return [3 /*break*/, 21];
            case 18: return [4 /*yield*/, animateTransfer('A', 'IO1', A.value_number)];
            case 19:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('IO1', A.value_number)];
            case 20:
                _a.sent();
                _a.label = 21;
            case 21: return [3 /*break*/, 34];
            case 22:
                if (!(ZR.loValue_number === IO1.address_number)) return [3 /*break*/, 26];
                return [4 /*yield*/, animateIoUserInput('IO1')];
            case 23:
                _a.sent();
                return [4 /*yield*/, animateTransfer('IO1', 'A', IO1.value_number)];
            case 24:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('A', IO1.value_number)];
            case 25:
                _a.sent();
                return [3 /*break*/, 34];
            case 26:
                if (!(ZR.loValue_number === IO2.address_number)) return [3 /*break*/, 30];
                return [4 /*yield*/, animateIoUserInput('IO2')];
            case 27:
                _a.sent();
                return [4 /*yield*/, animateTransfer('IO2', 'A', IO2.value_number)];
            case 28:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('A', IO2.value_number)];
            case 29:
                _a.sent();
                return [3 /*break*/, 34];
            case 30:
                if (!(ZR.loValue_number === IO3.address_number)) return [3 /*break*/, 34];
                return [4 /*yield*/, animateIoUserInput('IO3')];
            case 31:
                _a.sent();
                return [4 /*yield*/, animateTransfer('IO3', 'A', IO3.value_number)];
            case 32:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('A', IO3.value_number)];
            case 33:
                _a.sent();
                _a.label = 34;
            case 34:
                DECODER.resetDOM();
                return [3 /*break*/, 70];
            case 35:
                DECODER.update(1, 0, 1, 0, ZR.value_number);
                return [4 /*yield*/, animateTransfer('ZR', 'DEC_UPDATE', ZR.value_number)];
            case 36:
                _a.sent();
                if (!(IO1.address_number === IO2.address_number)) return [3 /*break*/, 43];
                if (!!IO1.in_boolean) return [3 /*break*/, 39];
                return [4 /*yield*/, animateTransfer('A', 'IO2', A.value_number)];
            case 37:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('IO2', A.value_number)];
            case 38:
                _a.sent();
                return [3 /*break*/, 42];
            case 39: return [4 /*yield*/, animateTransfer('A', 'IO1', A.value_number)];
            case 40:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('IO1', A.value_number)];
            case 41:
                _a.sent();
                _a.label = 42;
            case 42: return [3 /*break*/, 69];
            case 43:
                if (!(IO3.address_number === IO2.address_number)) return [3 /*break*/, 50];
                if (!!IO3.in_boolean) return [3 /*break*/, 46];
                return [4 /*yield*/, animateTransfer('A', 'IO2', A.value_number)];
            case 44:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('IO2', A.value_number)];
            case 45:
                _a.sent();
                return [3 /*break*/, 49];
            case 46: return [4 /*yield*/, animateTransfer('A', 'IO3', A.value_number)];
            case 47:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('IO3', A.value_number)];
            case 48:
                _a.sent();
                _a.label = 49;
            case 49: return [3 /*break*/, 69];
            case 50:
                if (!(IO1.address_number === IO3.address_number)) return [3 /*break*/, 57];
                if (!!IO1.in_boolean) return [3 /*break*/, 53];
                return [4 /*yield*/, animateTransfer('A', 'IO3', A.value_number)];
            case 51:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('IO3', A.value_number)];
            case 52:
                _a.sent();
                return [3 /*break*/, 56];
            case 53: return [4 /*yield*/, animateTransfer('A', 'IO1', A.value_number)];
            case 54:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('IO1', A.value_number)];
            case 55:
                _a.sent();
                _a.label = 56;
            case 56: return [3 /*break*/, 69];
            case 57:
                if (!(ZR.value_number === IO1.address_number)) return [3 /*break*/, 61];
                return [4 /*yield*/, animateIoUserInput('IO1')];
            case 58:
                _a.sent();
                return [4 /*yield*/, animateTransfer('IO1', 'A', IO1.value_number)];
            case 59:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('A', IO1.value_number)];
            case 60:
                _a.sent();
                return [3 /*break*/, 69];
            case 61:
                if (!(ZR.value_number === IO2.address_number)) return [3 /*break*/, 65];
                return [4 /*yield*/, animateIoUserInput('IO2')];
            case 62:
                _a.sent();
                return [4 /*yield*/, animateTransfer('IO2', 'A', IO2.value_number)];
            case 63:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('A', IO2.value_number)];
            case 64:
                _a.sent();
                return [3 /*break*/, 69];
            case 65:
                if (!(ZR.value_number === IO3.address_number)) return [3 /*break*/, 69];
                return [4 /*yield*/, animateIoUserInput('IO3')];
            case 66:
                _a.sent();
                return [4 /*yield*/, animateTransfer('IO3', 'A', IO3.value_number)];
            case 67:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('A', IO3.value_number)];
            case 68:
                _a.sent();
                _a.label = 69;
            case 69:
                DECODER.resetDOM();
                _a.label = 70;
            case 70: return [2 /*return*/];
        }
    });
}); };
var animateWriteToIo = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                DECODER.update(0, 1, 1, 0, ZR.loValue_number);
                return [4 /*yield*/, animateTransfer('ZR', 'DEC_UPDATE', ZR.loValue_number)];
            case 1:
                _a.sent();
                if (!(IO1.address_number === IO2.address_number)) return [3 /*break*/, 8];
                if (!IO1.in_boolean) return [3 /*break*/, 4];
                return [4 /*yield*/, animateTransfer('A', 'IO2', A.value_number)];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('IO2', A.value_number)];
            case 3:
                _a.sent();
                return [3 /*break*/, 7];
            case 4: return [4 /*yield*/, animateTransfer('A', 'IO1', A.value_number)];
            case 5:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('IO1', A.value_number)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [3 /*break*/, 31];
            case 8:
                if (!(IO3.address_number === IO2.address_number)) return [3 /*break*/, 15];
                if (!IO3.in_boolean) return [3 /*break*/, 11];
                return [4 /*yield*/, animateTransfer('A', 'IO2', A.value_number)];
            case 9:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('IO2', A.value_number)];
            case 10:
                _a.sent();
                return [3 /*break*/, 14];
            case 11: return [4 /*yield*/, animateTransfer('A', 'IO3', A.value_number)];
            case 12:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('IO3', A.value_number)];
            case 13:
                _a.sent();
                _a.label = 14;
            case 14: return [3 /*break*/, 31];
            case 15:
                if (!(IO1.address_number === IO3.address_number)) return [3 /*break*/, 22];
                if (!IO1.in_boolean) return [3 /*break*/, 18];
                return [4 /*yield*/, animateTransfer('A', 'IO3', A.value_number)];
            case 16:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('IO3', A.value_number)];
            case 17:
                _a.sent();
                return [3 /*break*/, 21];
            case 18: return [4 /*yield*/, animateTransfer('A', 'IO1', A.value_number)];
            case 19:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('IO1', A.value_number)];
            case 20:
                _a.sent();
                _a.label = 21;
            case 21: return [3 /*break*/, 31];
            case 22:
                if (!(ZR.loValue_number === IO1.address_number)) return [3 /*break*/, 25];
                return [4 /*yield*/, animateTransfer('A', 'IO1', A.value_number)];
            case 23:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('IO1', A.value_number)];
            case 24:
                _a.sent();
                return [3 /*break*/, 31];
            case 25:
                if (!(ZR.loValue_number === IO2.address_number)) return [3 /*break*/, 28];
                return [4 /*yield*/, animateTransfer('A', 'IO2', A.value_number)];
            case 26:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('IO2', A.value_number)];
            case 27:
                _a.sent();
                return [3 /*break*/, 31];
            case 28:
                if (!(ZR.loValue_number === IO3.address_number)) return [3 /*break*/, 31];
                return [4 /*yield*/, animateTransfer('A', 'IO3', A.value_number)];
            case 29:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('IO3', A.value_number)];
            case 30:
                _a.sent();
                _a.label = 31;
            case 31:
                DECODER.resetDOM();
                return [2 /*return*/];
        }
    });
}); };
/**
 * Composition of animations which occurs often
 */
var animateloadOperands = function (register1_string, register2_string) { return __awaiter(_this, void 0, void 0, function () {
    var reg1_class, reg2_class;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reg1_class = getRegisterByName(register1_string);
                reg2_class = getRegisterByName(register2_string);
                return [4 /*yield*/, animateStepDescriptionUpdate('Hole den 1. Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateTransfer(register1_string, 'ALU1', reg1_class.value_number)];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('ALU1', reg1_class.value_number)];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Hole den 2. Operanden')];
            case 4:
                _a.sent();
                return [4 /*yield*/, animateTransfer(register2_string, 'ALU2', reg2_class.value_number)];
            case 5:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('ALU2', reg2_class.value_number)];
            case 6:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var animateloadAddressBytesInZr = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Hole das niederwertige Adressbyte')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('PC', 'ZR_lo')];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateIncreasePcByOne()];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Hole das höherwertige Adressbyte')];
            case 4:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('PC', 'ZR_hi')];
            case 5:
                _a.sent();
                return [4 /*yield*/, animateIncreasePcByOne()];
            case 6:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
/**
 * Animation of the mc8-commands
 */
var get_next_command = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                stepNumber_p.textContent = '0';
                assemblerCommand_p.textContent = '';
                IR.htmlElement.textContent = '';
                return [4 /*yield*/, animateStepDescriptionUpdate('Hole den nächsten Befehl')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('PC', 'IR')];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateIncreasePcByOne()];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Erkenne den Befehl')];
            case 4:
                _a.sent();
                return [4 /*yield*/, animateAssemlberCommandUpdate()];
            case 5:
                _a.sent();
                pushNextCommand();
                return [2 /*return*/, true];
        }
    });
}); };
var nop = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!playStatus.noAnim) return [3 /*break*/, 2];
                return [4 /*yield*/, sleepForNOANIMATIONIDLETIME()];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, sleepForIDLETIME()];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var halt = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        updateStepDescription('Prozessor angehalten');
        stepNumber_p.textContent = '0';
        pause();
        check_completeExecution();
        return [2 /*return*/];
    });
}); };
var movAdat_8 = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Hole den Parameter')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('PC', 'A')];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateIncreasePcByOne()];
            case 3:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/, true];
        }
    });
}); };
var movBdat_8 = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Hole den Parameter')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('PC', 'B')];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateIncreasePcByOne()];
            case 3:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/, true];
        }
    });
}); };
var movCdat_8 = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Hole den Parameter')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('PC', 'C')];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateIncreasePcByOne()];
            case 3:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/, true];
        }
    });
}); };
var twoByteIX = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Hole das 2. Byte des Befehls')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('PC', 'IR')];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateIncreasePcByOne()];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Erkenne den Befehl')];
            case 4:
                _a.sent();
                return [4 /*yield*/, addYellowBackgroundForIDLETIME(IR.htmlElement)];
            case 5:
                _a.sent();
                return [4 /*yield*/, animateArrow('IR')];
            case 6:
                _a.sent();
                if (!(IR.value_number === 33)) return [3 /*break*/, 15];
                assemblerCommand_p.textContent = 'MOV IX, dat_16';
                if (!!playStatus.noAnim) return [3 /*break*/, 8];
                return [4 /*yield*/, sleepForIDLETIME()];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8: return [4 /*yield*/, animateStepDescriptionUpdate('Hole das niederwertige Byte')];
            case 9:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('PC', 'IX_lo')];
            case 10:
                _a.sent();
                return [4 /*yield*/, animateIncreasePcByOne()];
            case 11:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Hole das höherwertige Byte')];
            case 12:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('PC', 'IX_hi')];
            case 13:
                _a.sent();
                return [4 /*yield*/, animateIncreasePcByOne()];
            case 14:
                _a.sent();
                return [3 /*break*/, 42];
            case 15:
                if (!(IR.value_number === 42)) return [3 /*break*/, 24];
                assemblerCommand_p.textContent = 'MOV IX, label';
                return [4 /*yield*/, animateloadAddressBytesInZr()];
            case 16:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Hole das niederwertige Byte')];
            case 17:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('ZR', 'IX_lo')];
            case 18:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Erhöhe die Adresse um 1')];
            case 19:
                _a.sent();
                return [4 /*yield*/, animateArrow('ZR')];
            case 20:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('ZR', ZR.value_number + 1)];
            case 21:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Hole das höherwertige Byte')];
            case 22:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('ZR', 'IX_hi')];
            case 23:
                _a.sent();
                return [3 /*break*/, 42];
            case 24:
                if (!(IR.value_number === 34)) return [3 /*break*/, 33];
                assemblerCommand_p.textContent = 'MOV label, IX';
                return [4 /*yield*/, animateloadAddressBytesInZr()];
            case 25:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Schreibe das niederwertige Byte')];
            case 26:
                _a.sent();
                return [4 /*yield*/, animateWriteToMemoryFromRegister('ZR', 'IX_lo')];
            case 27:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Erhöhe die Adresse um 1')];
            case 28:
                _a.sent();
                return [4 /*yield*/, animateArrow('ZR')];
            case 29:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('ZR', ZR.value_number + 1)];
            case 30:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Schreibe das höherwertige Byte')];
            case 31:
                _a.sent();
                return [4 /*yield*/, animateWriteToMemoryFromRegister('ZR', 'IX_hi')];
            case 32:
                _a.sent();
                return [3 /*break*/, 42];
            case 33:
                if (!(IR.value_number === 35)) return [3 /*break*/, 37];
                assemblerCommand_p.textContent = 'INC IX';
                return [4 /*yield*/, animateStepDescriptionUpdate('Erhöhe die Adresse um 1')];
            case 34:
                _a.sent();
                return [4 /*yield*/, animateArrow('IX')];
            case 35:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('IX', IX.value_number + 1)];
            case 36:
                _a.sent();
                return [3 /*break*/, 42];
            case 37:
                if (!(IR.value_number === 43)) return [3 /*break*/, 41];
                assemblerCommand_p.textContent = 'DEC IX';
                return [4 /*yield*/, animateStepDescriptionUpdate('Verringere die Adresse um 1')];
            case 38:
                _a.sent();
                return [4 /*yield*/, animateArrow('IX')];
            case 39:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('IX', IX.value_number - 1)];
            case 40:
                _a.sent();
                return [3 /*break*/, 42];
            case 41:
                if (IR.value_number === 233) {
                    assemblerCommand_p.textContent = 'JP [IX]';
                }
                _a.label = 42;
            case 42:
                check_completeExecution();
                return [2 /*return*/, true];
        }
    });
}); };
var movHLdat_16 = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Hole das niederwertige Byte')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('PC', 'HL_lo')];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateIncreasePcByOne()];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Hole das höherwertige Byte')];
            case 4:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('PC', 'HL_hi')];
            case 5:
                _a.sent();
                return [4 /*yield*/, animateIncreasePcByOne()];
            case 6:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var movSPdat_16 = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Hole das niederwertige Byte')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('PC', 'SP_lo')];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateIncreasePcByOne()];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Hole das höherwertige Byte')];
            case 4:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('PC', 'SP_hi')];
            case 5:
                _a.sent();
                return [4 /*yield*/, animateIncreasePcByOne()];
            case 6:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var movAB = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Kopiere die Daten')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateTransfer('B', 'A', B.value_number)];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('A', B.value_number)];
            case 3:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var movAC = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Kopiere die Daten')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateTransfer('C', 'A', C.value_number)];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('A', C.value_number)];
            case 3:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var movBA = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Kopiere die Daten')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateTransfer('A', 'B', A.value_number)];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('B', A.value_number)];
            case 3:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var movBC = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Kopiere die Daten')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateTransfer('C', 'B', C.value_number)];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('B', C.value_number)];
            case 3:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var movCA = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Kopiere die Daten')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateTransfer('A', 'C', A.value_number)];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('C', A.value_number)];
            case 3:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var movCB = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Kopiere die Daten')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateTransfer('B', 'C', B.value_number)];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('C', B.value_number)];
            case 3:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var movALabel = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadAddressBytesInZr()];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Hole die Daten')];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('ZR', 'A')];
            case 3:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var movLabelA = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadAddressBytesInZr()];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Schreibe die Daten')];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateWriteToMemoryFromRegister('ZR', 'A')];
            case 3:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var movHlLabel = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadAddressBytesInZr()];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Hole das niederwertige Byte')];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('ZR', 'HL_lo')];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Erhöhe die Adresse um 1')];
            case 4:
                _a.sent();
                return [4 /*yield*/, animateArrow('ZR')];
            case 5:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('ZR', ZR.value_number + 1)];
            case 6:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Hole das höherwertige Byte')];
            case 7:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('ZR', 'HL_hi')];
            case 8:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var movLabelHl = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadAddressBytesInZr()];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Schreibe das niederwertige Byte')];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateWriteToMemoryFromRegister('ZR', 'HL_lo')];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Erhöhe die Adresse um 1')];
            case 4:
                _a.sent();
                return [4 /*yield*/, animateArrow('ZR')];
            case 5:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('ZR', ZR.value_number + 1)];
            case 6:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Schreibe das höherwertige Byte')];
            case 7:
                _a.sent();
                return [4 /*yield*/, animateWriteToMemoryFromRegister('ZR', 'HL_hi')];
            case 8:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var movAHl = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Hole die Daten')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('HL', 'A')];
            case 2:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var movHlA = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Schreibe die Daten')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateWriteToMemoryFromRegister('HL', 'A')];
            case 2:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var push = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Erhöhe den Stackpointer um 1')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateArrow('SP')];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('SP', SP.value_number - 1)];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Schreibe den Akku')];
            case 4:
                _a.sent();
                return [4 /*yield*/, animateWriteToMemoryFromRegister('SP', 'A')];
            case 5:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Erhöhe den Stackpointer um 1')];
            case 6:
                _a.sent();
                return [4 /*yield*/, animateArrow('SP')];
            case 7:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('SP', SP.value_number - 1)];
            case 8:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Schreibe die Flags')];
            case 9:
                _a.sent();
                return [4 /*yield*/, animateWriteToMemoryFromRegister('SP', 'FLAGS')];
            case 10:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var pop = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Hole die Flags')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('SP', 'FLAGS')];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Verringer den Stackpointer um 1')];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateArrow('SP')];
            case 4:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('SP', SP.value_number + 1)];
            case 5:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Hole den Akku')];
            case 6:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('SP', 'A')];
            case 7:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Verringer den Stackpointer um 1')];
            case 8:
                _a.sent();
                return [4 /*yield*/, animateArrow('SP')];
            case 9:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('SP', SP.value_number + 1)];
            case 10:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var inA = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Hole das Adressbyte')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('PC', 'ZR_lo')];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateIncreasePcByOne()];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Hole die Daten')];
            case 4:
                _a.sent();
                return [4 /*yield*/, animateReadFromIo()];
            case 5:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var outA = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Hole das Adressbyte')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('PC', 'ZR_lo')];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateIncreasePcByOne()];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Schreibe die Daten')];
            case 4:
                _a.sent();
                return [4 /*yield*/, animateWriteToIo()];
            case 5:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var incA = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Hole den Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateTransfer('A', 'ALU1', A.value_number)];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('ALU1', A.value_number)];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Erhöhe den Operanden um 1')];
            case 4:
                _a.sent();
                result = incBinary(A.value_number);
                ALU2.update(1);
                movingAlu2.classList.remove('yellowBg');
                return [4 /*yield*/, animateALU(result, true, false, 'A')];
            case 5:
                _a.sent();
                movingAlu2.classList.add('yellowBg');
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var incB = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Hole den Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateTransfer('B', 'ALU1', B.value_number)];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('ALU1', B.value_number)];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Erhöhe den Operanden um 1')];
            case 4:
                _a.sent();
                result = incBinary(B.value_number);
                ALU2.update(1);
                movingAlu2.classList.remove('yellowBg');
                return [4 /*yield*/, animateALU(result, true, false, 'B')];
            case 5:
                _a.sent();
                movingAlu2.classList.add('yellowBg');
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var incC = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Hole den Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateTransfer('C', 'ALU1', C.value_number)];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('ALU1', C.value_number)];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Erhöhe den Operanden um 1')];
            case 4:
                _a.sent();
                result = incBinary(C.value_number);
                ALU2.update(1);
                movingAlu2.classList.remove('yellowBg');
                return [4 /*yield*/, animateALU(result, true, false, 'C')];
            case 5:
                _a.sent();
                movingAlu2.classList.add('yellowBg');
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var incHl = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Erhöhe die Adresse um 1')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateArrow('HL')];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('HL', HL.value_number + 1)];
            case 3:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
//incIX see twoByteIx
var decA = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Hole den Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateTransfer('A', 'ALU1', A.value_number)];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('ALU1', A.value_number)];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Verringere den Operanden um 1')];
            case 4:
                _a.sent();
                result = decBinary(A.value_number);
                ALU2.update(1);
                movingAlu2.classList.remove('yellowBg');
                return [4 /*yield*/, animateALU(result, true, false, 'A')];
            case 5:
                _a.sent();
                movingAlu2.classList.add('yellowBg');
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var decB = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Hole den Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateTransfer('B', 'ALU1', B.value_number)];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('ALU1', B.value_number)];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Verringere den Operanden um 1')];
            case 4:
                _a.sent();
                result = decBinary(B.value_number);
                ALU2.update(1);
                movingAlu2.classList.remove('yellowBg');
                return [4 /*yield*/, animateALU(result, true, false, 'B')];
            case 5:
                _a.sent();
                movingAlu2.classList.add('yellowBg');
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var decC = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Hole den Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateTransfer('C', 'ALU1', C.value_number)];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('ALU1', C.value_number)];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Verringere den Operanden um 1')];
            case 4:
                _a.sent();
                result = decBinary(C.value_number);
                ALU2.update(1);
                movingAlu2.classList.remove('yellowBg');
                return [4 /*yield*/, animateALU(result, true, false, 'C')];
            case 5:
                _a.sent();
                movingAlu2.classList.add('yellowBg');
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var decHl = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Verringere die Adresse um 1')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateArrow('HL')];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('HL', HL.value_number - 1)];
            case 3:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var addA = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadOperands('A', 'A')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Addiere die Operanden')];
            case 2:
                _a.sent();
                result = addBinary(A.value_number, A.value_number, false);
                return [4 /*yield*/, animateALU(result, true, false, 'A')];
            case 3:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var addB = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadOperands('A', 'B')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Addiere die Operanden')];
            case 2:
                _a.sent();
                result = addBinary(A.value_number, B.value_number, false);
                return [4 /*yield*/, animateALU(result, true, false, 'A')];
            case 3:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var addC = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadOperands('A', 'C')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Addiere die Operanden')];
            case 2:
                _a.sent();
                result = addBinary(A.value_number, C.value_number, false);
                return [4 /*yield*/, animateALU(result, true, false, 'A')];
            case 3:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var addDat_8 = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Hole den 1. Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateTransfer('A', 'ALU1', A.value_number)];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('ALU1', A.value_number)];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Hole den 2. Operanden')];
            case 4:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('PC', 'ALU2')];
            case 5:
                _a.sent();
                return [4 /*yield*/, animateIncreasePcByOne()];
            case 6:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Addiere die Operanden')];
            case 7:
                _a.sent();
                result = addBinary(A.value_number, ALU2.value_number, false);
                return [4 /*yield*/, animateALU(result, true, false, 'A')];
            case 8:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var addHlBc = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Hole das L-Register (HL_LO)')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateTransfer('HL_lo', 'ALU1', HL.loValue_number)];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('ALU1', HL.loValue_number)];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Hole das C-Register')];
            case 4:
                _a.sent();
                return [4 /*yield*/, animateTransfer('C', 'ALU2', C.value_number)];
            case 5:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('ALU2', C.value_number)];
            case 6:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Addiere die Operanden')];
            case 7:
                _a.sent();
                result = addBinary(HL.loValue_number, C.value_number, false);
                return [4 /*yield*/, animateHlBcAddition(result, true)];
            case 8:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Hole das H-Register (HL_HI)')];
            case 9:
                _a.sent();
                return [4 /*yield*/, animateTransfer('HL_hi', 'ALU1', HL.hiValue_number)];
            case 10:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('ALU1', HL.hiValue_number)];
            case 11:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Hole das B-Register')];
            case 12:
                _a.sent();
                return [4 /*yield*/, animateTransfer('B', 'ALU2', B.value_number)];
            case 13:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('ALU2', B.value_number)];
            case 14:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Addiere die Operanden')];
            case 15:
                _a.sent();
                result = addBinary(HL.hiValue_number, B.value_number + FLAGS.c_number, false);
                return [4 /*yield*/, animateHlBcAddition(result, false)];
            case 16:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var subA = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadOperands('A', 'A')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Subtrahiere die Operanden')];
            case 2:
                _a.sent();
                result = addBinary(A.value_number, A.value_number, true);
                return [4 /*yield*/, animateALU(result, true, false, 'A')];
            case 3:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var subB = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadOperands('A', 'B')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Subtrahiere die Operanden')];
            case 2:
                _a.sent();
                result = addBinary(A.value_number, B.value_number, true);
                return [4 /*yield*/, animateALU(result, true, false, 'A')];
            case 3:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var subC = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadOperands('A', 'C')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Subtrahiere die Operanden')];
            case 2:
                _a.sent();
                result = addBinary(A.value_number, C.value_number, true);
                return [4 /*yield*/, animateALU(result, true, false, 'A')];
            case 3:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var subDat_8 = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Hole den 1. Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateTransfer('A', 'ALU1', A.value_number)];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('ALU1', A.value_number)];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Hole den 2. Operanden')];
            case 4:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('PC', 'ALU2')];
            case 5:
                _a.sent();
                return [4 /*yield*/, animateIncreasePcByOne()];
            case 6:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Subtrahiere die Operanden')];
            case 7:
                _a.sent();
                result = addBinary(A.value_number, ALU2.value_number, true);
                return [4 /*yield*/, animateALU(result, true, false, 'A')];
            case 8:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var andA = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadOperands('A', 'A')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('OP1 AND OP2')];
            case 2:
                _a.sent();
                result = andBinary(A.value_number, A.value_number);
                return [4 /*yield*/, animateALU(result, true, false, 'A')];
            case 3:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var andB = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadOperands('A', 'B')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('OP1 AND OP2')];
            case 2:
                _a.sent();
                result = andBinary(A.value_number, B.value_number);
                return [4 /*yield*/, animateALU(result, true, false, 'A')];
            case 3:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var andC = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadOperands('A', 'C')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('OP1 AND OP2')];
            case 2:
                _a.sent();
                result = andBinary(A.value_number, C.value_number);
                return [4 /*yield*/, animateALU(result, true, false, 'A')];
            case 3:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var andDat_8 = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Hole den 1. Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateTransfer('A', 'ALU1', A.value_number)];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('ALU1', A.value_number)];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Hole den 2. Operanden')];
            case 4:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('PC', 'ALU2')];
            case 5:
                _a.sent();
                return [4 /*yield*/, animateIncreasePcByOne()];
            case 6:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('OP1 AND OP2')];
            case 7:
                _a.sent();
                result = andBinary(A.value_number, ALU2.value_number);
                return [4 /*yield*/, animateALU(result, true, false, 'A')];
            case 8:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var orA = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadOperands('A', 'A')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('OP1 OR OP2')];
            case 2:
                _a.sent();
                result = orBinary(ALU1.value_number, ALU2.value_number);
                return [4 /*yield*/, animateALU(result, true, false, 'A')];
            case 3:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var orB = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadOperands('A', 'B')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('OP1 OR OP2')];
            case 2:
                _a.sent();
                result = orBinary(ALU1.value_number, ALU2.value_number);
                return [4 /*yield*/, animateALU(result, true, false, 'A')];
            case 3:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var orC = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadOperands('A', 'C')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('OP1 OR OP2')];
            case 2:
                _a.sent();
                result = orBinary(ALU1.value_number, ALU2.value_number);
                return [4 /*yield*/, animateALU(result, true, false, 'A')];
            case 3:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var orDat_8 = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Hole den 1. Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateTransfer('A', 'ALU1', A.value_number)];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('ALU1', A.value_number)];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Hole den 2. Operanden')];
            case 4:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('PC', 'ALU2')];
            case 5:
                _a.sent();
                return [4 /*yield*/, animateIncreasePcByOne()];
            case 6:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('OP1 OR OP2')];
            case 7:
                _a.sent();
                result = orBinary(ALU1.value_number, ALU2.value_number);
                return [4 /*yield*/, animateALU(result, true, false, 'A')];
            case 8:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var xorA = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadOperands('A', 'A')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('OP1 XOR OP2')];
            case 2:
                _a.sent();
                result = xorBinary(A.value_number, A.value_number);
                return [4 /*yield*/, animateALU(result, true, false, 'A')];
            case 3:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var xorB = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadOperands('A', 'B')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('OP1 XOR OP2')];
            case 2:
                _a.sent();
                result = xorBinary(A.value_number, B.value_number);
                return [4 /*yield*/, animateALU(result, true, false, 'A')];
            case 3:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var xorC = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadOperands('A', 'C')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('OP1 XOR OP2')];
            case 2:
                _a.sent();
                result = xorBinary(A.value_number, C.value_number);
                return [4 /*yield*/, animateALU(result, true, false, 'A')];
            case 3:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var xorDat_8 = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Hole den 1. Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateTransfer('A', 'ALU1', A.value_number)];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('ALU1', A.value_number)];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Hole den 2. Operanden')];
            case 4:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('PC', 'ALU2')];
            case 5:
                _a.sent();
                return [4 /*yield*/, animateIncreasePcByOne()];
            case 6:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('OP1 OR OP2')];
            case 7:
                _a.sent();
                result = xorBinary(ALU1.value_number, ALU2.value_number);
                return [4 /*yield*/, animateALU(result, true, false, 'A')];
            case 8:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var twoByteShift = function () { return __awaiter(_this, void 0, void 0, function () {
    var result, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Hole das 2. Byte des Befehls')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('PC', 'IR')];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateIncreasePcByOne()];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Erkenne den Befehl')];
            case 4:
                _a.sent();
                return [4 /*yield*/, addYellowBackgroundForIDLETIME(IR.htmlElement)];
            case 5:
                _a.sent();
                if (!(IR.value_number === 39)) return [3 /*break*/, 14];
                return [4 /*yield*/, animateArrow('IR')];
            case 6:
                _a.sent();
                assemblerCommand_p.textContent = 'SHL';
                if (!!playStatus.noAnim) return [3 /*break*/, 8];
                return [4 /*yield*/, sleepForIDLETIME()];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8: return [4 /*yield*/, animateStepDescriptionUpdate('Hole den Operanden')];
            case 9:
                _a.sent();
                return [4 /*yield*/, animateTransfer('A', 'ALU1', A.value_number)];
            case 10:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('ALU1', A.value_number)];
            case 11:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Schiebe Operanden nach links')];
            case 12:
                _a.sent();
                result = shlBinary(A.value_number);
                return [4 /*yield*/, animateALU(result, false, false, 'A')];
            case 13:
                _a.sent();
                return [3 /*break*/, 23];
            case 14:
                if (!(IR.value_number === 63)) return [3 /*break*/, 23];
                return [4 /*yield*/, animateArrow('IR')];
            case 15:
                _a.sent();
                assemblerCommand_p.textContent = 'SHR';
                if (!!playStatus.noAnim) return [3 /*break*/, 17];
                return [4 /*yield*/, sleepForIDLETIME()];
            case 16:
                _a.sent();
                _a.label = 17;
            case 17: return [4 /*yield*/, animateStepDescriptionUpdate('Hole den Operanden')];
            case 18:
                _a.sent();
                return [4 /*yield*/, animateTransfer('A', 'ALU1', A.value_number)];
            case 19:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('ALU1', A.value_number)];
            case 20:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Schiebe Operanden nach rechts')];
            case 21:
                _a.sent();
                result = shrBinary(A.value_number);
                return [4 /*yield*/, animateALU(result, false, false, 'A')];
            case 22:
                _a.sent();
                _a.label = 23;
            case 23:
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var rcl = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Hole den Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateTransfer('A', 'ALU1', A.value_number)];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('ALU1', A.value_number)];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Rotiere Operand mit Carry-Flag nach links')];
            case 4:
                _a.sent();
                result = rclBinary(A.value_number);
                return [4 /*yield*/, animateALU(result, false, true, 'A')];
            case 5:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var rol = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Hole den Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateTransfer('A', 'ALU1', A.value_number)];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('ALU1', A.value_number)];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Rotiere Operand ohne Carry-Flag nach links')];
            case 4:
                _a.sent();
                result = rolBinary(A.value_number);
                return [4 /*yield*/, animateALU(result, false, false, 'A')];
            case 5:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var rcr = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Hole den Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateTransfer('A', 'ALU1', A.value_number)];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('ALU1', A.value_number)];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Rotiere Operand mit Carry-Flag nach rechts')];
            case 4:
                _a.sent();
                result = rcrBinary(A.value_number);
                return [4 /*yield*/, animateALU(result, false, true, 'A')];
            case 5:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var ror = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Hole den Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateTransfer('A', 'ALU1', A.value_number)];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('ALU1', A.value_number)];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Rotiere Operand ohne Carry-Flag nach rechts')];
            case 4:
                _a.sent();
                result = rorBinary(A.value_number);
                return [4 /*yield*/, animateALU(result, false, false, 'A')];
            case 5:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var cpA = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadOperands('A', 'A')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Vergleiche die Operanden')];
            case 2:
                _a.sent();
                result = addBinary(A.value_number, A.value_number, true);
                return [4 /*yield*/, animateALU(result, true, false, '')];
            case 3:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var cpB = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadOperands('A', 'B')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Vergleiche die Operanden')];
            case 2:
                _a.sent();
                result = addBinary(A.value_number, B.value_number, true);
                return [4 /*yield*/, animateALU(result, true, false, '')];
            case 3:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var cpC = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadOperands('A', 'C')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Vergleiche die Operanden')];
            case 2:
                _a.sent();
                result = addBinary(A.value_number, C.value_number, true);
                return [4 /*yield*/, animateALU(result, true, false, '')];
            case 3:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var cpDat_8 = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Hole den 1. Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateTransfer('A', 'ALU1', A.value_number)];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('ALU1', A.value_number)];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Hole den 2. Operanden')];
            case 4:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('PC', 'ALU2')];
            case 5:
                _a.sent();
                return [4 /*yield*/, animateIncreasePcByOne()];
            case 6:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Vergleiche die Operanden')];
            case 7:
                _a.sent();
                result = addBinary(A.value_number, ALU2.value_number, true);
                return [4 /*yield*/, animateALU(result, true, false, '')];
            case 8:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var jpnzLabel = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadAddressBytesInZr()];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Prüfe die Sprungbedingung')];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateCheckJump('zFlag')];
            case 3:
                _a.sent();
                if (!(FLAGS.z_number === 0)) return [3 /*break*/, 8];
                return [4 /*yield*/, animateStepDescriptionUpdate('Lade den Programmzähler')];
            case 4:
                _a.sent();
                return [4 /*yield*/, animateArrow('ZR')];
            case 5:
                _a.sent();
                return [4 /*yield*/, animateTransfer('ZR', 'PC', ZR.value_number)];
            case 6:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('PC', ZR.value_number)];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8:
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var jpzLabel = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadAddressBytesInZr()];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Prüfe die Sprungbedingung')];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateCheckJump('zFlag')];
            case 3:
                _a.sent();
                if (!(FLAGS.z_number === 1)) return [3 /*break*/, 8];
                return [4 /*yield*/, animateStepDescriptionUpdate('Lade den Programmzähler')];
            case 4:
                _a.sent();
                return [4 /*yield*/, animateArrow('ZR')];
            case 5:
                _a.sent();
                return [4 /*yield*/, animateTransfer('ZR', 'PC', ZR.value_number)];
            case 6:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('PC', ZR.value_number)];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8:
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var jpncLabel = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadAddressBytesInZr()];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Prüfe die Sprungbedingung')];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateCheckJump('cFlag')];
            case 3:
                _a.sent();
                if (!(FLAGS.c_number === 0)) return [3 /*break*/, 8];
                return [4 /*yield*/, animateStepDescriptionUpdate('Lade den Programmzähler')];
            case 4:
                _a.sent();
                return [4 /*yield*/, animateArrow('ZR')];
            case 5:
                _a.sent();
                return [4 /*yield*/, animateTransfer('ZR', 'PC', ZR.value_number)];
            case 6:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('PC', ZR.value_number)];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8:
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var jpcLabel = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadAddressBytesInZr()];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Prüfe die Sprungbedingung')];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateCheckJump('cFlag')];
            case 3:
                _a.sent();
                if (!(FLAGS.c_number === 1)) return [3 /*break*/, 8];
                return [4 /*yield*/, animateStepDescriptionUpdate('Lade den Programmzähler')];
            case 4:
                _a.sent();
                return [4 /*yield*/, animateArrow('ZR')];
            case 5:
                _a.sent();
                return [4 /*yield*/, animateTransfer('ZR', 'PC', ZR.value_number)];
            case 6:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('PC', ZR.value_number)];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8:
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var jpnoLabel = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadAddressBytesInZr()];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Prüfe die Sprungbedingung')];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateCheckJump('pFlag')];
            case 3:
                _a.sent();
                if (!(FLAGS.p_number === 0)) return [3 /*break*/, 8];
                return [4 /*yield*/, animateStepDescriptionUpdate('Lade den Programmzähler')];
            case 4:
                _a.sent();
                return [4 /*yield*/, animateArrow('ZR')];
            case 5:
                _a.sent();
                return [4 /*yield*/, animateTransfer('ZR', 'PC', ZR.value_number)];
            case 6:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('PC', ZR.value_number)];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8:
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var jpoLabel = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadAddressBytesInZr()];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Prüfe die Sprungbedingung')];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateCheckJump('pFlag')];
            case 3:
                _a.sent();
                if (!(FLAGS.p_number === 1)) return [3 /*break*/, 8];
                return [4 /*yield*/, animateStepDescriptionUpdate('Lade den Programmzähler')];
            case 4:
                _a.sent();
                return [4 /*yield*/, animateArrow('ZR')];
            case 5:
                _a.sent();
                return [4 /*yield*/, animateTransfer('ZR', 'PC', ZR.value_number)];
            case 6:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('PC', ZR.value_number)];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8:
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var jpnsLabel = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadAddressBytesInZr()];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Prüfe die Sprungbedingung')];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateCheckJump('sFlag')];
            case 3:
                _a.sent();
                if (!(FLAGS.s_number === 0)) return [3 /*break*/, 8];
                return [4 /*yield*/, animateStepDescriptionUpdate('Lade den Programmzähler')];
            case 4:
                _a.sent();
                return [4 /*yield*/, animateArrow('ZR')];
            case 5:
                _a.sent();
                return [4 /*yield*/, animateTransfer('ZR', 'PC', ZR.value_number)];
            case 6:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('PC', ZR.value_number)];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8:
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var jpsLabel = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadAddressBytesInZr()];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Prüfe die Sprungbedingung')];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateCheckJump('sFlag')];
            case 3:
                _a.sent();
                if (!(FLAGS.s_number === 1)) return [3 /*break*/, 8];
                return [4 /*yield*/, animateStepDescriptionUpdate('Lade den Programmzähler')];
            case 4:
                _a.sent();
                return [4 /*yield*/, animateArrow('ZR')];
            case 5:
                _a.sent();
                return [4 /*yield*/, animateTransfer('ZR', 'PC', ZR.value_number)];
            case 6:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('PC', ZR.value_number)];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8:
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var jpLabel = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadAddressBytesInZr()];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Lade den Programmzähler')];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateArrow('ZR')];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateTransfer('ZR', 'PC', ZR.value_number)];
            case 4:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('PC', ZR.value_number)];
            case 5:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var callLabel = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateloadAddressBytesInZr()];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Erhöhe den Stackpointer um 1')];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateArrow('SP')];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('SP', SP.value_number - 1)];
            case 4:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Schreibe das HI-Byte des PC')];
            case 5:
                _a.sent();
                return [4 /*yield*/, animateWriteToMemoryFromRegister('SP', 'PC_hi')];
            case 6:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Erhöhe den Stackpointer um 1')];
            case 7:
                _a.sent();
                return [4 /*yield*/, animateArrow('SP')];
            case 8:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('SP', SP.value_number - 1)];
            case 9:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Schreibe das LO-Byte des PC')];
            case 10:
                _a.sent();
                return [4 /*yield*/, animateWriteToMemoryFromRegister('SP', 'PC_lo')];
            case 11:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Lade den Programmzähler')];
            case 12:
                _a.sent();
                return [4 /*yield*/, animateArrow('ZR')];
            case 13:
                _a.sent();
                return [4 /*yield*/, animateTransfer('ZR', 'PC', ZR.value_number)];
            case 14:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('PC', ZR.value_number)];
            case 15:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var ret = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animateStepDescriptionUpdate('Hole das niederwertige Adressbyte')];
            case 1:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('SP', 'ZR_lo')];
            case 2:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Verringere den Stackpointer um 1')];
            case 3:
                _a.sent();
                return [4 /*yield*/, animateArrow('SP')];
            case 4:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('SP', SP.value_number + 1)];
            case 5:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Hole das höherwertige Adressbyte')];
            case 6:
                _a.sent();
                return [4 /*yield*/, animateReadFromMemoryInRegister('SP', 'ZR_hi')];
            case 7:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Verringere den Stackpointer um 1')];
            case 8:
                _a.sent();
                return [4 /*yield*/, animateArrow('SP')];
            case 9:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('SP', SP.value_number + 1)];
            case 10:
                _a.sent();
                return [4 /*yield*/, animateStepDescriptionUpdate('Lade den Programmzähler')];
            case 11:
                _a.sent();
                return [4 /*yield*/, animateArrow('ZR')];
            case 12:
                _a.sent();
                return [4 /*yield*/, animateTransfer('ZR', 'PC', ZR.value_number)];
            case 13:
                _a.sent();
                return [4 /*yield*/, animateRegisterUpdate('PC', ZR.value_number)];
            case 14:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var mc8Commands_array = [
    new mc8_command('MOV A, dat_8', 62, movAdat_8),
    new mc8_command('MOV B, dat_8', 6, movBdat_8),
    new mc8_command('MOV C, dat_8', 14, movCdat_8),
    new mc8_command('2-Byte Befehl', 221, twoByteIX),
    new mc8_command('MOV HL, dat_16', 33, movHLdat_16),
    new mc8_command('MOV SP, dat_16', 49, movSPdat_16),
    new mc8_command('MOV A, B', 120, movAB),
    new mc8_command('MOV A, C', 121, movAC),
    new mc8_command('MOV B, A', 71, movBA),
    new mc8_command('MOV B, C', 65, movBC),
    new mc8_command('MOV C, A', 79, movCA),
    new mc8_command('MOV C, B', 72, movCB),
    new mc8_command('MOV A, label', 58, movALabel),
    new mc8_command('MOV label, A', 50, movLabelA),
    new mc8_command('MOV HL, label', 42, movHlLabel),
    new mc8_command('MOV label, HL', 34, movLabelHl),
    new mc8_command('MOV A, [HL]', 126, movAHl),
    new mc8_command('MOV [HL], A', 119, movHlA),
    new mc8_command('PUSH', 245, push),
    new mc8_command('POP', 241, pop),
    new mc8_command('IN A, port', 219, inA),
    new mc8_command('OUT port, A', 211, outA),
    new mc8_command('INC A', 60, incA),
    new mc8_command('INC B', 4, incB),
    new mc8_command('INC C', 12, incC),
    new mc8_command('INC HL', 35, incHl),
    new mc8_command('DEC A', 61, decA),
    new mc8_command('DEC B', 5, decB),
    new mc8_command('DEC C', 13, decC),
    new mc8_command('DEC HL', 43, decHl),
    new mc8_command('ADD A', 135, addA),
    new mc8_command('ADD B', 128, addB),
    new mc8_command('ADD C', 129, addC),
    new mc8_command('ADD dat_8', 198, addDat_8),
    new mc8_command('ADD HL, BC', 9, addHlBc),
    new mc8_command('SUB A', 151, subA),
    new mc8_command('SUB B', 144, subB),
    new mc8_command('SUB C', 145, subC),
    new mc8_command('SUB dat_8', 214, subDat_8),
    new mc8_command('AND A', 167, andA),
    new mc8_command('AND B', 160, andB),
    new mc8_command('AND C', 161, andC),
    new mc8_command('AND dat_8', 230, andDat_8),
    new mc8_command('OR A', 183, orA),
    new mc8_command('OR B', 176, orB),
    new mc8_command('OR C', 177, orC),
    new mc8_command('OR dat_8', 246, orDat_8),
    new mc8_command('XOR A', 175, xorA),
    new mc8_command('XOR B', 168, xorB),
    new mc8_command('XOR C', 169, xorC),
    new mc8_command('XOR dat_8', 238, xorDat_8),
    new mc8_command('2-Byte-Befehl', 203, twoByteShift),
    new mc8_command('RCL', 23, rcl),
    new mc8_command('ROL', 7, rol),
    new mc8_command('RCR', 31, rcr),
    new mc8_command('ROR', 15, ror),
    new mc8_command('CP A', 191, cpA),
    new mc8_command('CP B', 184, cpB),
    new mc8_command('CP C', 185, cpC),
    new mc8_command('CP dat_8', 254, cpDat_8),
    new mc8_command('JPNZ label', 194, jpnzLabel),
    new mc8_command('JPZ label', 202, jpzLabel),
    new mc8_command('JPNC label', 210, jpncLabel),
    new mc8_command('JPC label', 218, jpcLabel),
    new mc8_command('JPNO label', 226, jpnoLabel),
    new mc8_command('JPO label', 234, jpoLabel),
    new mc8_command('JPNS label', 242, jpnsLabel),
    new mc8_command('JPS label', 250, jpsLabel),
    new mc8_command('JP label', 195, jpLabel),
    new mc8_command('CALL label', 205, callLabel),
    new mc8_command('RET', 201, ret),
    new mc8_command('NOP', 0, nop),
    new mc8_command('HALT', 118, halt),
];
/***************************************************main programm loop***************************************************/
var runningProgram = [get_next_command];
var run_program = function () { return __awaiter(_this, void 0, void 0, function () {
    var i, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = 0;
                _a.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 7];
                if (runningProgram[i] === undefined) {
                    return [2 /*return*/, false];
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, checkPlayPressed()];
            case 3:
                _a.sent();
                return [4 /*yield*/, runningProgram[i]()];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                e_3 = _a.sent();
                if (!playStatus.stop) {
                    playStatus.setPause();
                }
                setButtonsPressed();
                console.log('Error catched:');
                console.error(e_3);
                return [2 /*return*/, false];
            case 6:
                i++;
                return [3 /*break*/, 1];
            case 7: return [2 /*return*/];
        }
    });
}); };
var init = function () {
    runningProgram = [get_next_command];
    IO1.update(255);
    IO2.update(255);
    IO3.update(255);
    A.update(0);
    B.update(0);
    C.update(0);
    HL.update(0);
    IX.update(0);
    SP.update(0);
    PC.update(0);
    ZR.update(0);
    IR.update(0);
    FLAGS.updateDec(0, 0, 0, 0);
    FLAGS.updateDOM();
    DECODER.resetDOM();
    RAM.updateVariableElements(0);
    DECODER.error = false;
    ALUOUT.htmlElement.textContent = '';
    ALU1.htmlElement.textContent = '';
    ALU2.htmlElement.textContent = '';
    movingObject_h2.classList.remove('displayGrid');
    movingObject_h2.classList.remove('displayGrid');
    movingAlu2.classList.add('yellowBg');
    stepNumber_p.textContent = '0';
    stepDescription_p.textContent = 'Prozessor angehalten';
    assemblerCommand_p.textContent = '';
    DECODER.display_htmlElement.textContent = '';
};
var setButtonsPressed = function () {
    // if (playStatus.play) {
    //     controlButtons_button[0].classList.add('buttonPressed');
    // } else {
    //     controlButtons_button[0].classList.remove('buttonPressed');
    // }
    // if (playStatus.pause) {
    //     controlButtons_button[1].classList.add('buttonPressed');
    // } else {
    //     controlButtons_button[1].classList.remove('buttonPressed');
    // }
    // if (playStatus.stop) {
    //     controlButtons_button[2].classList.add('buttonPressed');
    // } else {
    //     controlButtons_button[2].classList.remove('buttonPressed');
    // }
    // if (playStatus.rocketSpeed) {
    //     controlButtons_button[4].classList.add('buttonPressed');
    //     controlButtons_button[3].classList.remove('buttonPressed');
    //     controlButtons_button[5].classList.remove('buttonPressed');
    //     controlButtons_button[6].classList.remove('buttonPressed');
    // }
    // if (!playStatus.rocketSpeed) {
    //     controlButtons_button[3].classList.add('buttonPressed');
    //     controlButtons_button[4].classList.remove('buttonPressed');
    //     controlButtons_button[5].classList.remove('buttonPressed');
    //     controlButtons_button[6].classList.remove('buttonPressed');
    // }
    // if (playStatus.completeExe) {
    //     controlButtons_button[6].classList.add('buttonPressed');
    //     controlButtons_button[3].classList.remove('buttonPressed');
    //     controlButtons_button[4].classList.remove('buttonPressed');
    //     controlButtons_button[5].classList.remove('buttonPressed');
    // }
    // if (playStatus.noAnim && !playStatus.completeExe) {
    //     controlButtons_button[5].classList.add('buttonPressed');
    //     controlButtons_button[3].classList.remove('buttonPressed');
    //     controlButtons_button[4].classList.remove('buttonPressed');
    //     controlButtons_button[6].classList.remove('buttonPressed');
    // }
    // if (playStatus.oneCommand) {
    //     controlButtons_button[9].classList.add('buttonPressed');
    // } else {
    //     controlButtons_button[9].classList.remove('buttonPressed');
    // }
};
setButtonsPressed();
var play = function () {
    if (!playStatus.play) {
        if (playStatus.stop) { //only when stop is pressed(init), the program will be started anew  
            editRom_boolean = false;
            playStatus.setPlay();
            run_program();
        }
        playStatus.setPlay();
        controlButtons_button[0].classList.add('pause_button', 'buttonPressed');
    }
    else {
        playStatus.setPause();
        controlButtons_button[0].classList.remove('pause_button', 'buttonPressed');
    }
};
var pause = function () {
    playStatus.setPause();
    controlButtons_button[0].classList.remove('pause_button', 'buttonPressed');
};
var stopBtn = function () {
    playStatus.setStop();
    controlButtons_button[0].classList.remove('pause_button', 'buttonPressed');
    init();
};
speedSlider_input.oninput = function () {
    ANIMATION_SPEED = Number(speedSlider_input.value);
    IDLETIME = 400 - ANIMATION_SPEED * 30;
    if (ANIMATION_SPEED === 5)
        ANIMATION_SPEED = 6;
    if (ANIMATION_SPEED === 6)
        ANIMATION_SPEED = 12;
};
var increaseSpeed = function () {
    speedSlider_input.stepUp();
    speedSlider_input.dispatchEvent(new Event('input'));
};
var decreaseSpeed = function () {
    speedSlider_input.stepDown();
    speedSlider_input.dispatchEvent(new Event('input'));
};
var toggleTheme = function () {
    document.getElementsByTagName('html')[0].classList.toggle('black');
};
var snailSpeed_on = function () {
    playStatus.setSnailSpeed();
    controlButtons_button[2].classList.add('buttonPressed');
    controlButtons_button[3].classList.remove('buttonPressed');
    controlButtons_button[4].classList.remove('buttonPressed');
};
var rocketSpeed_on = function () {
    playStatus.setRocketSpeed();
    controlButtons_button[3].classList.add('buttonPressed');
    controlButtons_button[2].classList.remove('buttonPressed');
    controlButtons_button[4].classList.remove('buttonPressed');
};
var runCompleteExecution = function () {
    playStatus.setCompleteExecution();
    controlButtons_button[4].classList.add('buttonPressed');
    controlButtons_button[2].classList.remove('buttonPressed');
    controlButtons_button[3].classList.remove('buttonPressed');
};
var runOneCommand = function () {
    if (playStatus.oneCommand) {
        playStatus.oneCommand = false;
        controlButtons_button[5].classList.remove('buttonPressed');
    }
    else {
        playStatus.setOneCommand();
        controlButtons_button[5].classList.add('buttonPressed');
    }
};
var runNextSingleStep = function () {
    playStatus.setNoAnimation();
    setButtonsPressed();
};
var openSettings = function () {
    containerSettings_div.classList.add('toggleDisplay');
    settingsDisplayed_boolean = true;
};
openSettings();
var doc = document.documentElement;
var toggleFullscreen = function () {
    if (!isFullscreen) {
        if (doc.requestFullscreen) {
            doc.requestFullscreen();
        }
        else if (doc.webkitRequestFullscreen) {
            doc.webkitRequestFullscreen();
        }
        else if (doc.msRequestFullscreen) {
            doc.msRequestFullscreen();
        }
        isFullscreen = true;
    }
    else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.webkitExitFullscreen) {
            document.webkitexitFullscreen();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        isFullscreen = false;
    }
};
var openAssembler = function () {
    window.open('https://simonrusswurm.github.io/ASIM_Simulator/', '_blank');
};
var openInfo = function () {
    document.getElementById('infoWindow_div').classList.toggle('displayGrid');
};
document.addEventListener('keyup', function (e) {
    if (!settingsDisplayed_boolean && !ioInputDisplayed_boolean) {
        switch (e.code) {
            case 'Space':
                play();
                break;
            case 'BracketRight':
                increaseSpeed();
                break;
            case 'Slash':
                decreaseSpeed();
                break;
            case 'KeyB':
                toggleTheme();
                break;
            default:
                break;
        }
    }
    else if (settingsDisplayed_boolean) {
        if (e.code === 'Enter')
            saveSettings();
    }
    else {
        if (e.code === 'Enter')
            play();
    }
    if (editRom_boolean) {
        ROM.updateNumberArrayFromDOM();
    }
});
