//resize window
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
var containerAspectRatio_div = document.getElementById('containerAspectRatio_div');
var masterStyle_style = document.getElementById('masterStyle_style');
var resizeWindow = function () {
    console.log(window.innerHeight, window.screen.availHeight);
    if (window.innerHeight * 1.4375 > window.innerWidth) {
        containerAspectRatio_div.style.width = String(window.innerWidth) + "px";
        containerAspectRatio_div.style.height = String(window.innerWidth / 1.4375) + "px";
        masterStyle_style.innerHTML = "h1{font-size: 1.6vw;} p{font-size: 1.2vw;} h2{font-size: 3vw;} .h2mov{font-size: 3vw;} h3{font-size: 1vw;} h4{font-size: 2.5vw} .textareaFontSize{font-size: 1.4vw;}";
    }
    else {
        containerAspectRatio_div.style.width = String(window.innerHeight * 1.4375) + "px";
        containerAspectRatio_div.style.height = String(window.innerHeight) + "px";
        masterStyle_style.innerHTML = "h1{font-size: 2.3vh;} p{font-size: 1.725vh;} h2{font-size: 4.3125vh;} .h2mov{font-size: 4.3125vh;} h3{font-size: 1.4375vh;} h4{font-size: 3.59375vh} .textareaFontSize{font-size: 2.0125vh;}";
    }
};
window.addEventListener('DOMContentLoaded', function () {
    resizeWindow();
});
window.addEventListener('resize', function () {
    resizeWindow();
});
/***************************************** DOM_Selectors *********************************/
var mc8Container = document.querySelector(".mc8Container");
var assemblerCommand_p = document.getElementById('assemblerCommand_p');
var stepNumber_p = document.getElementById('stepNumber_p');
var stepDescription_p = document.getElementById('stepDescription_p');
var stepNumberBackground = document.getElementsByClassName('containerStepNumber')[0];
var registerArrow_div = document.getElementById('registerArrow_div');
var irArrow_div = document.getElementById('irArrow_div');
var movingFlagsArrow_div = document.getElementById('movingFlagsArrow_div');
var cFlagArrow_div = document.getElementById('cFlagArrow_div');
var checkJumpArrow_div = document.getElementById('checkJumpArrow_div');
var containerSettings_div = document.getElementById('containerSettings_div');
var movingFlags_div = document.getElementById('movingFlags_div');
var flags_DOM = document.getElementById('flags');
var yellowBgElement_div = document.getElementById('yellowBgElement_div');
var io1InputWindow_div = document.getElementById('io1InputWindow_div');
var io2InputWindow_div = document.getElementById('io2InputWindow_div');
var io3InputWindow_div = document.getElementById('io3InputWindow_div');
var io1Input_input = document.getElementById('io1Input_input');
var io2Input_input = document.getElementById('io2Input_input');
var io3Input_input = document.getElementById('io3Input_input');
var movingObject = document.getElementById('movingObject_h2');
var movingAlu1 = document.getElementById('movingAlu1_h2');
var movingAlu2 = document.getElementById('movingAlu2_h2');
var lastRomLabel_div = document.getElementById('lastRomLabel_div');
var lastRomLabel_p = document.getElementById('lastRomLabel_p');
var middleRamLabel_div = document.getElementById('middleRamLabel_div');
var middleRamLabel_p = document.getElementById('middleRamLabel_p');
/***************************************** conversion Hex/Int *********************************/
var convertHexToNumber = function (hex_string) {
    return parseInt(hex_string, 16);
};
var convertNumberToHex_4digits = function (number_dec) {
    var number_string = number_dec.toString(16);
    number_string = number_string.toUpperCase();
    var len = number_string.length;
    for (var i = 4; i > len; i--) {
        number_string = '0' + number_string;
    }
    return number_string;
};
var convertNumberToHex_2digits = function (number_dec) {
    var number_string = number_dec.toString(16);
    number_string = number_string.toUpperCase();
    var len = number_string.length;
    for (var i = 2; i > len; i--) {
        number_string = '0' + number_string;
    }
    return number_string;
};
var convertNumberToBinary_8digits = function (number_dec) {
    var str = (number_dec).toString(2);
    var len = str.length;
    if (len != 8) {
        for (var i = 0; i < 8 - len; i++) {
            str = '0' + str;
        }
    }
    str = str[0] + str[1] + str[2] + str[3] + ' ' + str[4] + str[5] + str[6] + str[7];
    return str;
};
var convertNumberToBinaryArray = function (number_dec) {
    var bin = convertNumberToBinary_8digits(number_dec).replace(' ', '');
    var buf = [];
    for (var i = 0; i < bin.length; i++) {
        buf.push(Number(bin[i]));
    }
    return buf;
};
var convertBinaryToNumber = function (binary_dec) {
    var str = '0b' + String(binary_dec);
    return Number(str);
};
var convertNumberToComplementOnTwo = function (number_dec) {
    if (number_dec > 127) {
        number_dec = number_dec - 256;
    }
    return number_dec;
};
var checkValidHex = function (input_string) {
    var allowedChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    var check = true;
    input_string = input_string.toUpperCase();
    for (var i = 0; i < input_string.length; i++) {
        for (var j = 0; j < allowedChar.length; j++) {
            if (input_string[i] === allowedChar[j]) {
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
    var withoutChecksum = 0;
    if (intelHexFormat_string.length > 2 + 4 + 2 + recordLength * 2) {
        withoutChecksum = 2;
    }
    for (var i = 0; i < 2 + 4 + 2 + recordLength * 2 + withoutChecksum; i = i + 2) {
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
/***************************************** ALU operations *********************************/
//sets the flags, 0 == don't set flag, 1 == setFlag
var setFlags = function (value_dec, result_bin_array, carry_bin_array, cFlag_dec, zFlag_dec, pFlag_dec, vFlag_dec, sFlag_dec) {
    //carry flag
    if (cFlag_dec) {
        FLAGS.c_dec = carry_bin_array[0];
    }
    else {
        FLAGS.c_dec = '-';
    }
    //zero flag
    if (zFlag_dec) {
        if (value_dec === 0)
            FLAGS.z_dec = 1;
        else
            FLAGS.z_dec = 0;
    }
    else {
        FLAGS.z_dec = '-';
    }
    //sing flag
    if (sFlag_dec) {
        FLAGS.s_dec = result_bin_array[0];
    }
    else {
        FLAGS.s_dec = '-';
    }
    //parity flag
    if (pFlag_dec) {
        var cnt = 0;
        for (var i = 0; i < result_bin_array.length; i++) {
            if (result_bin_array[i])
                cnt += 1;
        }
        if (cnt % 2 === 0)
            FLAGS.p_dec = 1;
        else
            FLAGS.p_dec = 0;
    }
    //overflow flag
    else if (vFlag_dec) {
        if ((carry_bin_array[0] === 1 && carry_bin_array[1] === 0) || (carry_bin_array[0] === 0 && carry_bin_array[1] === 1))
            FLAGS.p_dec = 1;
        else
            FLAGS.p_dec = 0;
    }
    else {
        FLAGS.p_dec = '-';
    }
};
var addBinary = function (value1_dec, value2_dec, ersatzAddition_boolean) {
    var value1_bin = convertNumberToBinaryArray(value1_dec);
    var value2_bin = convertNumberToBinaryArray(value2_dec);
    var carry_bin = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (ersatzAddition_boolean) {
        carry_bin[8] = 1;
        for (var i = 0; i < value2_bin.length; i++) {
            if (value2_bin[i] === 0)
                value2_bin[i] = 1;
            else
                value2_bin[i] = 0;
        }
    }
    var sum_bin = [0, 0, 0, 0, 0, 0, 0, 0];
    var sum_dec = 0;
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
    sum_dec = convertBinaryToNumber(sum_bin.join(''));
    //set Flags
    setFlags(sum_dec, sum_bin, carry_bin, 1, 1, 0, 1, 1);
    //if the addition was a replace-addition switch sign-flag
    if (ersatzAddition_boolean) {
        if (FLAGS.c_dec)
            FLAGS.c_dec = 0;
        else
            FLAGS.c_dec = 1;
    }
    return sum_dec;
};
var incBinary = function (value_dec) {
    var result_dec = addBinary(value_dec, 1, false);
    FLAGS.c_dec = '-';
    return result_dec;
};
var decBinary = function (value_dec) {
    var result_dec = addBinary(value_dec, 1, true);
    FLAGS.c_dec = '-';
    return result_dec;
};
var andBinary = function (value1_dec, value2_dec) {
    var value1_bin = convertNumberToBinaryArray(value1_dec);
    var value2_bin = convertNumberToBinaryArray(value2_dec);
    var result_bin = [0, 0, 0, 0, 0, 0, 0, 0];
    var result_dec = 0;
    for (var i = 8; i > 0; i--) {
        if (value1_bin[i - 1] && value2_bin[i - 1]) {
            result_bin[i - 1] = 1;
        }
    }
    result_dec = convertBinaryToNumber(result_bin.join(''));
    setFlags(result_dec, result_bin, [0], 1, 1, 1, 0, 1);
    return result_dec;
};
var orBinary = function (value1_dec, value2_dec) {
    var value1_bin = convertNumberToBinaryArray(value1_dec);
    var value2_bin = convertNumberToBinaryArray(value2_dec);
    var result_bin = [0, 0, 0, 0, 0, 0, 0, 0];
    var result_dec = 0;
    for (var i = 8; i > 0; i--) {
        if (value1_bin[i - 1] || value2_bin[i - 1]) {
            result_bin[i - 1] = 1;
        }
    }
    result_dec = convertBinaryToNumber(result_bin.join(''));
    setFlags(result_dec, result_bin, [0], 1, 1, 1, 0, 1);
    return result_dec;
};
var xorBinary = function (value1_dec, value2_dec) {
    var value1_bin = convertNumberToBinaryArray(value1_dec);
    var value2_bin = convertNumberToBinaryArray(value2_dec);
    var result_bin = [0, 0, 0, 0, 0, 0, 0, 0];
    var result_dec = 0;
    for (var i = 8; i > 0; i--) {
        if (value1_bin[i - 1] ^ value2_bin[i - 1]) {
            result_bin[i - 1] = 1;
        }
    }
    result_dec = convertBinaryToNumber(result_bin.join(''));
    setFlags(result_dec, result_bin, [0], 1, 1, 1, 0, 1);
    return result_dec;
};
var shlBinary = function (value_dec) {
    var value_bin = convertNumberToBinaryArray(value_dec);
    var result_dec = 0;
    var firstBit = value_bin[0];
    for (var i = 0; i < value_bin.length - 1; i++) {
        value_bin[i] = value_bin[i + 1];
    }
    value_bin[7] = 0;
    result_dec = convertBinaryToNumber(value_bin.join(''));
    setFlags(result_dec, value_bin, [firstBit], 1, 1, 1, 0, 1);
    return result_dec;
};
var shrBinary = function (value_dec) {
    var value_bin = convertNumberToBinaryArray(value_dec);
    var result_dec = 0;
    var lastBit = value_bin[7];
    for (var i = 7; i > 0; i--) {
        value_bin[i] = value_bin[i - 1];
    }
    value_bin[0] = 0;
    result_dec = convertBinaryToNumber(value_bin.join(''));
    setFlags(result_dec, value_bin, [lastBit], 1, 1, 1, 0, 1);
    return result_dec;
};
var rclBinary = function (value_dec) {
    var value_bin = convertNumberToBinaryArray(value_dec);
    var result_dec = 0;
    //save bit position 7 for setFlags ( [7,6,5,4,3,2,1,0])
    var carry_dec = value_bin[0];
    //shift all bits left
    for (var i = 0; i < value_bin.length - 1; i++) {
        value_bin[i] = value_bin[i + 1];
    }
    //write carry-flag in bit position 0 
    value_bin[7] = FLAGS.c_dec;
    result_dec = convertBinaryToNumber(value_bin.join(''));
    //set flags
    setFlags(result_dec, value_bin, [carry_dec], 1, 0, 0, 0, 0);
    return result_dec;
};
var rolBinary = function (value_dec) {
    var value_bin = convertNumberToBinaryArray(value_dec);
    var result_dec = 0;
    //save bit position 7 for setFlags [7,6,5,4,3,2,1,0]
    //                                  ^
    var carry_dec = value_bin[0];
    //shift all bits left
    for (var i = 0; i < value_bin.length - 1; i++) {
        value_bin[i] = value_bin[i + 1];
    }
    //write former bit 7 in bit position 0 
    value_bin[7] = carry_dec;
    result_dec = convertBinaryToNumber(value_bin.join(''));
    setFlags(result_dec, value_bin, [carry_dec], 1, 0, 0, 0, 0);
    return result_dec;
};
var rcrBinary = function (value_dec) {
    var value_bin = convertNumberToBinaryArray(value_dec);
    var result_dec = 0;
    //save bit position 0 for setFlags ([7,6,5,4,3,2,1,0])
    var carry_dec = value_bin[7];
    for (var i = 7; i > 0; i--) {
        value_bin[i] = value_bin[i - 1];
    }
    //write carry-flag into bit 7
    value_bin[0] = FLAGS.c_dec;
    result_dec = convertBinaryToNumber(value_bin.join(''));
    setFlags(result_dec, value_bin, [carry_dec], 1, 0, 0, 0, 0);
    return result_dec;
};
var rorBinary = function (value_dec) {
    var value_bin = convertNumberToBinaryArray(value_dec);
    var result_dec = 0;
    //save bit position 0 for setFlags ([7,6,5,4,3,2,1,0])
    var carry_dec = value_bin[7];
    for (var i = 7; i > 0; i--) {
        value_bin[i] = value_bin[i - 1];
    }
    //write former bit 0 into bit 7
    value_bin[0] = carry_dec;
    result_dec = convertBinaryToNumber(value_bin.join(''));
    setFlags(result_dec, value_bin, [carry_dec], 1, 0, 0, 0, 0);
    return result_dec;
};
/*************************************************************** Classes ***************************************************************/
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
    PlayStatus.prototype.getStatus = function () {
        if (this.completeExe)
            return 'completeExe';
        else if (this.rocketSpeed)
            return 'rocketSpeed';
        else if (this.noAnim)
            return 'noAnim';
    };
    PlayStatus.prototype.setPlay = function () {
        this.play = true;
        this.stop = false;
        this.pause = false;
    };
    PlayStatus.prototype.setPause = function () {
        this.play = false;
        this.stop = false;
        this.pause = true;
        this.completeExe = false;
        this.noAnim = false;
    };
    PlayStatus.prototype.setStop = function () {
        this.play = false;
        this.stop = true;
        this.pause = false;
        this.oneCommand = false;
        this.noAnim = false;
        this.completeExe = false;
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
    };
    PlayStatus.prototype.setRocketSpeed = function () {
        this.rocketSpeed = true;
    };
    PlayStatus.prototype.setSnailSpeed = function () {
        this.rocketSpeed = false;
    };
    return PlayStatus;
}());
/******************************* ROM/RAM *********************************** */
var Rom = /** @class */ (function () {
    function Rom() {
        this.breakpoints_array = this.initBreakpoints();
        this.dec_array = this.init_dec();
        this.init_DOM();
        this.startAddressRom_dec = 0;
        this.size_dec = 8192;
    }
    Rom.prototype.init_dec = function () {
        var buf_arr = [];
        for (var i = 0; i < 8192; i++) {
            buf_arr.push(255);
        }
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
        var buf_arr = [];
        for (var i = 0; i < 8192; i++) {
            buf_arr.push(0);
        }
        this.breakpoints_array = buf_arr;
        for (var i = 0; i < 224; i++) {
            try {
                document.getElementById('romElement' + String(i)).classList.remove('blueText');
            }
            catch (e) { }
        }
    };
    Rom.prototype.init_DOM = function () {
        var j = 0;
        //old 224
        for (var i = 0; i < 240; i++) {
            //create a romElement
            var romElement = document.createElement('p');
            romElement.classList.add('square1x1', 'positionAbsolute', 'centered');
            romElement.id = "romElement" + String(i);
            //after every 8th romElement -> new line should be filled
            if (!(i % 8) && i !== 0)
                j++;
            if (i >= 224) {
                romElement.id = "romElementVariable" + String(i - 224);
                romElement.textContent = '';
            }
            else {
                romElement.textContent = 'FF';
            }
            //define Position of romElement
            romElement.style.top = String(100 / 32 * (j + 2)) + "%";
            romElement.style.left = String(100 / 46 * ((i % 8) + 2)) + "%";
            //add romElement to body
            mc8Container.appendChild(romElement);
        }
        return true;
    };
    Rom.prototype.update = function () {
        this.resetBreakpoints();
        var buf_string = '';
        var linker_string = linkerFile_textarea.value.replace(/\r\n|\n|\r/gm, '');
        this.dec_array = this.init_dec();
        //update dec_arr
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
                    this.dec_array[address + j] = convertHexToNumber(linker_string[i + 9 + j * 2] + linker_string[i + 10 + j * 2]);
                }
            }
        }
        //update DOM        
        for (var i = 0; i < 224; i++) {
            buf_string = this.dec_array[i].toString(16).toUpperCase();
            if (buf_string.length === 1) //if number is smaller than 10 -->Bsp(0F) 
                buf_string = '0' + buf_string;
            document.getElementById("romElement" + String(i)).textContent = buf_string;
            //add blue if breakpoints is checked
            if (breakpointsCheckbox_input.checked && this.breakpoints_array[i]) {
                document.getElementById("romElement" + String(i)).classList.add('blueText');
            }
        }
    };
    Rom.prototype.updateVariableElements = function (address_dec) {
        if (convertNumberToHex_4digits(address_dec).slice(0, -1) !== lastRomLabel_p.textContent.slice(0, -1)) {
            if (address_dec > 223 && address_dec < 8192) {
                lastRomLabel_div.classList.remove('ellipses');
                lastRomLabel_p.textContent = convertNumberToHex_4digits(address_dec).slice(0, -1) + 'x';
                lastRomLabel_div.classList.add('lightYellowBg');
                address_dec = convertHexToNumber(convertNumberToHex_4digits(address_dec).slice(0, -1) + '0');
                for (var i = 0; i < 16; i++) {
                    document.getElementById("romElementVariable" + String(i)).textContent = convertNumberToHex_2digits(this.dec_array[address_dec + i]);
                }
            }
            else if (lastRomLabel_p.textContent !== '') {
                lastRomLabel_div.classList.add('ellipses');
                lastRomLabel_div.classList.remove('lightYellowBg');
                lastRomLabel_p.textContent = '';
                for (var i = 0; i < 16; i++) {
                    document.getElementById("romElementVariable" + String(i)).textContent = '';
                }
            }
        }
    };
    Rom.prototype.getValue = function (address_dec) {
        return this.dec_array[address_dec];
    };
    Rom.prototype.getElementId = function (position_dec) {
        if (position_dec === void 0) { position_dec = PC.value_dec; }
        if (position_dec > 223) {
            var lastValue_dec = convertHexToNumber(convertNumberToHex_4digits(position_dec)[3]);
            return document.getElementById('romElementVariable' + String(lastValue_dec)).id;
        }
        return document.getElementById('romElement' + String(position_dec)).id;
    };
    return Rom;
}());
var Ram = /** @class */ (function () {
    function Ram() {
        this.startAddressRam_dec = 8192;
        this.size_dec = 8192;
        this.dec_array = this.init_dec();
        this.init_DOM();
    }
    Ram.prototype.init_dec = function () {
        var buf_arr = [];
        for (var i = 0; i < 8192; i++)
            buf_arr.push(255);
        return buf_arr;
    };
    Ram.prototype.init_DOM = function () {
        var j = 0;
        for (var i = 0; i < 240; i++) {
            //create a ramElement (same CSS as romElement)
            var ramElement = document.createElement('p');
            ramElement.classList.add('square1x1', 'positionAbsolute', 'centered');
            if (i < 112) {
                ramElement.id = 'ramElement' + String(i);
                ramElement.textContent = 'FF';
            }
            else if (i > 127) {
                ramElement.id = 'ramElement' + String(i + 8192 - 240);
                ramElement.textContent = 'FF';
            }
            else {
                ramElement.id = "ramElementVariable" + String(i - 112);
                ramElement.textContent = '';
            }
            //after every 8th romElement -> new line should be filled
            if (!(i % 8) && i !== 0)
                j++;
            //define Position of romElement
            ramElement.style.top = String(100 / 32 * (j + 2)) + "%";
            ramElement.style.left = String(100 / 46 * ((i % 8) + 36)) + "%";
            //add romElement to body
            mc8Container.appendChild(ramElement);
        }
        return true;
    };
    Ram.prototype.reset = function () {
        for (var i = 0; i < this.dec_array.length; i++) {
            this.dec_array[i] = 255;
            if (i < 112) {
                document.getElementById('ramElement' + String(i)).textContent = 'FF';
            }
            if (i > 8192 - 113) {
                document.getElementById('ramElement' + String(i)).textContent = 'FF';
            }
        }
    };
    Ram.prototype.getValue = function (address_dec) {
        if (address_dec > 8191) {
            var x = Math.floor(address_dec / 8192);
            address_dec = address_dec - x * 8192;
        }
        return this.dec_array[address_dec];
    };
    Ram.prototype.getHexValue = function (address_dec) {
        return convertNumberToHex_2digits(this.dec_array[address_dec]);
    };
    Ram.prototype.update = function (address_dec, number_dec) {
        if (address_dec > 8191) {
            var x = Math.floor(address_dec / 8192);
            address_dec = address_dec - x * 8192;
        }
        this.dec_array[address_dec] = number_dec;
        if (address_dec < 112 || address_dec > 8191 - 112) {
            document.getElementById('ramElement' + String(address_dec)).textContent = convertNumberToHex_2digits(number_dec);
        }
        else {
            var buf = convertHexToNumber(convertNumberToHex_4digits(address_dec)[3]);
            document.getElementById("ramElementVariable" + String(buf)).textContent = convertNumberToHex_2digits(number_dec);
        }
    };
    Ram.prototype.updateVariableElements = function (address_dec) {
        var x = 0;
        if (address_dec > 8191) {
            x = Math.floor(address_dec / 8192);
            address_dec = address_dec - x * 8192;
        }
        if (convertNumberToHex_4digits(address_dec).slice(0, -1) !== middleRamLabel_p.textContent.slice(0, -1)) {
            if (address_dec > 111 && address_dec <= 8191 - 112) {
                middleRamLabel_div.classList.remove('ellipses');
                middleRamLabel_div.classList.add('lightYellowBg');
                middleRamLabel_p.textContent = convertNumberToHex_4digits(address_dec + x * 8192).slice(0, -1) + 'x';
                address_dec = convertHexToNumber(convertNumberToHex_4digits(address_dec).slice(0, -1) + '0');
                for (var i = 0; i < 16; i++) {
                    document.getElementById("ramElementVariable" + String(i)).textContent = convertNumberToHex_2digits(this.dec_array[address_dec + i]);
                }
            }
            else if (middleRamLabel_p.textContent !== '') {
                middleRamLabel_div.classList.add('ellipses');
                middleRamLabel_div.classList.remove('lightYellowBg');
                middleRamLabel_p.textContent = '';
                for (var i = 0; i < 16; i++) {
                    document.getElementById("ramElementVariable" + String(i)).textContent = '';
                }
            }
        }
    };
    Ram.prototype.getRamElementId = function (position_dec) {
        if (position_dec === void 0) { position_dec = 0; }
        if (position_dec > 8191) {
            var x = Math.floor(position_dec / 8192);
            position_dec = position_dec - x * 8192;
        }
        if (position_dec > 111 && position_dec < 8191 - 111) {
            var lastValue_dec = convertHexToNumber(convertNumberToHex_4digits(position_dec)[3]);
            return document.getElementById('ramElementVariable' + String(lastValue_dec)).id;
        }
        else
            return document.getElementById('ramElement' + String(position_dec)).id;
    };
    return Ram;
}());
/******************************* Register *********************************** */
var Register_x2 = /** @class */ (function () {
    function Register_x2(register_DOM) {
        this.domElement = register_DOM;
        this.value_dec = 0;
    }
    Register_x2.prototype.update = function (value_dec) {
        if (value_dec > 255)
            value_dec -= 256;
        if (value_dec < 0)
            value_dec = 255;
        this.value_dec = value_dec;
        this.domElement.textContent = convertNumberToHex_2digits(value_dec);
    };
    return Register_x2;
}());
var Register_x4 = /** @class */ (function () {
    function Register_x4(register_DOM) {
        this.value_dec = 0;
        this.domElement = register_DOM;
        this.hi_dec = 0;
        this.lo_dec = 0;
    }
    Register_x4.prototype.update = function (value_dec) {
        if (value_dec > 65535)
            value_dec -= 65536;
        if (value_dec < 0)
            value_dec = 65535;
        this.value_dec = value_dec;
        this.domElement.textContent = convertNumberToHex_4digits(value_dec);
        this.hi_dec = convertHexToNumber(this.domElement.textContent[0] + this.domElement.textContent[1]);
        this.lo_dec = convertHexToNumber(this.domElement.textContent[2] + this.domElement.textContent[3]);
    };
    Register_x4.prototype.update_lo = function (decimal_number) {
        var buf_string = this.domElement.textContent;
        this.lo_dec = decimal_number;
        this.domElement.textContent = buf_string[0] + buf_string[1] + convertNumberToHex_2digits(decimal_number);
        this.value_dec = convertHexToNumber(this.domElement.textContent);
    };
    Register_x4.prototype.update_hi = function (decimal_number) {
        var buf_string = this.domElement.textContent;
        this.hi_dec = decimal_number;
        this.domElement.textContent = convertNumberToHex_2digits(decimal_number) + buf_string[2] + buf_string[3];
        this.value_dec = convertHexToNumber(this.domElement.textContent);
    };
    return Register_x4;
}());
var Pc_class = /** @class */ (function (_super) {
    __extends(Pc_class, _super);
    function Pc_class(register_DOM) {
        return _super.call(this, register_DOM) || this;
    }
    Pc_class.prototype.update = function (value_dec) {
        if (value_dec > 65535)
            value_dec -= 65536;
        if (value_dec < 0)
            value_dec = 65535;
        this.value_dec = value_dec;
        this.domElement.textContent = convertNumberToHex_4digits(value_dec);
        this.hi_dec = convertHexToNumber(this.domElement.textContent[0] + this.domElement.textContent[1]);
        this.lo_dec = convertHexToNumber(this.domElement.textContent[2] + this.domElement.textContent[3]);
        updateRedRectangle(PC.value_dec);
        ROM.updateVariableElements(value_dec);
        if (this.value_dec > RAM.startAddressRam_dec)
            RAM.updateVariableElements(value_dec);
    };
    return Pc_class;
}(Register_x4));
var IO = /** @class */ (function (_super) {
    __extends(IO, _super);
    function IO(register_DOM, address_dec, io1IN_boolean) {
        var _this = _super.call(this, register_DOM) || this;
        _this.address_dec = address_dec;
        _this.ioMapped_boolean = true;
        _this.in_boolean = io1IN_boolean;
        return _this;
    }
    IO.prototype.updateAddress = function (address_dec, ioMapped_boolean) {
        this.address_dec = address_dec;
        this.ioMapped_boolean = ioMapped_boolean;
    };
    return IO;
}(Register_x2));
var Decoder = /** @class */ (function () {
    function Decoder(wr_DOM, rd_DOM, m_DOM, io_DOM, decDisplay_DOM) {
        this.wr_DOM = wr_DOM;
        this.rd_DOM = rd_DOM;
        this.m_DOM = m_DOM;
        this.io_DOM = io_DOM;
        this.WR = 1;
        this.RD = 1;
        this.M = 1;
        this.IO = 1;
        this.display_DOM = decDisplay_DOM;
        this.text_string = '';
        this.error = false;
        this.ramAccess = false;
        this.ioAccess = false;
    }
    Decoder.prototype.update = function (wr_dec, rd_dec, m_dec, io_dec, address_dec) {
        this.WR = wr_dec;
        this.RD = rd_dec;
        this.M = m_dec;
        this.IO = io_dec;
        //read from memory
        if (rd_dec === 0 && m_dec === 0) {
            this.ioAccess = false;
            if (address_dec < 8192) {
                this.text_string = 'Lese von ROM';
                this.ramAccess = false;
            }
            else if (address_dec >= RAM.startAddressRam_dec && address_dec < RAM.startAddressRam_dec + RAM.size_dec) {
                this.ramAccess = true;
                this.text_string = 'Lese von RAM';
            }
            else if (address_dec === IO1.address_dec) {
                this.ioAccess = true;
                if (IO1.in_boolean) {
                    this.text_string = 'Lese von IN1';
                }
                else {
                    this.text_string = 'Lese von OUT1';
                    this.error = true;
                }
            }
            else if (address_dec === IO2.address_dec) {
                this.ioAccess = true;
                if (IO2.in_boolean)
                    this.text_string = 'Lese von IN2';
                else {
                    this.text_string = 'Lese von OUT2';
                    this.error = true;
                }
            }
            else if (address_dec === IO3.address_dec) {
                this.ioAccess = true;
                if (IO3.in_boolean)
                    this.text_string = 'Lese von IN3';
                else {
                    this.text_string = 'Lese von OUT3';
                    this.error = true;
                }
            }
            else {
                this.ramAccess = false;
                this.text_string = 'Lese von ??? Adresse: ' + convertNumberToHex_2digits(address_dec);
                this.error = true;
            }
        }
        //write to memory
        else if (wr_dec === 0 && m_dec === 0) {
            this.ioAccess = false;
            if (address_dec < 8192) {
                this.ramAccess = false;
                this.text_string = 'Schreibe auf ROM';
                this.error = true;
            }
            else if (address_dec >= RAM.startAddressRam_dec && address_dec < RAM.startAddressRam_dec + RAM.size_dec) {
                this.ramAccess = true;
                this.text_string = 'Schreibe auf RAM';
            }
            else if (address_dec === IO1.address_dec) {
                this.ioAccess = true;
                if (!IO1.in_boolean) {
                    this.text_string = 'Schreibe auf OUT1';
                }
                else {
                    this.text_string = 'Schreibe auf IN1';
                    this.error = true;
                }
            }
            else if (address_dec === IO2.address_dec) {
                this.ioAccess = true;
                if (!IO2.in_boolean) {
                    this.text_string = 'Schreibe auf OUT2';
                }
                else {
                    this.text_string = 'Schreibe auf IN2';
                    this.error = true;
                }
            }
            else if (address_dec === IO3.address_dec) {
                this.ioAccess = true;
                if (!IO3.in_boolean) {
                    this.text_string = 'Schreibe auf OUT3';
                }
                else {
                    this.text_string = 'Schreibe auf IN3';
                    this.error = true;
                }
            }
            else {
                this.ramAccess = false;
                this.text_string = 'Schreibe auf ???\nAdresse: ' + convertNumberToHex_2digits(address_dec);
                this.error = true;
            }
        }
        //read IO
        else if (rd_dec === 0 && io_dec === 0) {
            this.ioAccess = true;
            if (IO1.address_dec === IO2.address_dec && IO1.address_dec === address_dec) {
                if (IO1.in_boolean) {
                    this.text_string = 'Lese von IN1';
                }
                else {
                    this.text_string = 'Lese von IN2';
                }
            }
            else if (IO1.address_dec === IO3.address_dec && IO1.address_dec === address_dec) {
                if (IO1.in_boolean) {
                    this.text_string = 'Lese von IN1';
                }
                else {
                    this.text_string = 'Lese von IN3';
                }
            }
            else if (IO2.address_dec === IO3.address_dec && IO2.address_dec === address_dec) {
                if (IO2.in_boolean) {
                    this.text_string = 'Lese von IN2';
                }
                else {
                    this.text_string = 'Lese von IN3';
                }
            }
            else if (address_dec === IO1.address_dec) {
                if (IO1.in_boolean) {
                    this.text_string = 'Lese von IN1';
                }
                else {
                    this.text_string = 'Lese von OUT1';
                    this.error = true;
                }
            }
            else if (address_dec === IO2.address_dec) {
                if (IO2.in_boolean)
                    this.text_string = 'Lese von IN2';
                else {
                    this.text_string = 'Lese von OUT2';
                    this.error = true;
                }
            }
            else if (address_dec === IO3.address_dec) {
                if (IO3.in_boolean)
                    this.text_string = 'Lese von IN3';
                else {
                    this.text_string = 'Lese von OUT3';
                    this.error = true;
                }
            }
            else {
                this.text_string = 'Lese von ??? Adresse: ' + convertNumberToHex_2digits(address_dec);
                this.error = true;
            }
        }
        //write IO
        else if (wr_dec === 0 && io_dec === 0) {
            this.ioAccess = true;
            if (IO1.address_dec === IO2.address_dec && IO1.address_dec === address_dec) {
                if (!IO1.in_boolean) {
                    this.text_string = 'Schreibe auf OUT1';
                }
                else {
                    this.text_string = 'Schreibe auf OUT2';
                }
            }
            else if (IO1.address_dec === IO3.address_dec && IO1.address_dec === address_dec) {
                if (!IO1.in_boolean) {
                    this.text_string = 'Schreibe auf OUT1';
                }
                else {
                    this.text_string = 'Schreibe auf OUT3';
                }
            }
            else if (IO2.address_dec === IO3.address_dec && IO2.address_dec === address_dec) {
                if (!IO2.in_boolean) {
                    this.text_string = 'Schreibe auf OUT2';
                }
                else {
                    this.text_string = 'Schreibe auf OUT3';
                }
            }
            else if (address_dec === IO1.address_dec) {
                if (!IO1.in_boolean) {
                    this.text_string = 'Schreibe auf OUT1';
                }
                else {
                    this.text_string = 'Schreibe auf IN1';
                    this.error = true;
                }
            }
            else if (address_dec === IO2.address_dec) {
                if (!IO2.in_boolean) {
                    this.text_string = 'Schreibe auf OUT2';
                }
                else {
                    this.text_string = 'Schreibe auf IN2';
                    this.error = true;
                }
            }
            else if (address_dec === IO3.address_dec) {
                if (!IO3.in_boolean) {
                    this.text_string = 'Schreibe auf OUT3';
                }
                else {
                    this.text_string = 'Schreibe auf IN3';
                    this.error = true;
                }
            }
            else {
                this.text_string = 'Schreibe auf ??? Adresse: ' + convertNumberToHex_2digits(address_dec);
                this.error = true;
            }
        }
    };
    Decoder.prototype.updateDOM = function () {
        this.wr_DOM.textContent = String(this.WR);
        this.rd_DOM.textContent = String(this.RD);
        this.m_DOM.textContent = String(this.M);
        this.io_DOM.textContent = String(this.IO);
        this.display_DOM.textContent = this.text_string;
        if (this.ramAccess || this.ioAccess)
            this.display_DOM.classList.add('yellowBg');
        if (this.error) {
            this.display_DOM.classList.add('redBg');
            throw Error('Decoder error');
        }
    };
    Decoder.prototype.resetDOM = function () {
        this.wr_DOM.textContent = '';
        this.rd_DOM.textContent = '';
        this.m_DOM.textContent = '';
        this.io_DOM.textContent = '';
        this.display_DOM.textContent = '';
        try {
            this.display_DOM.classList.remove('yellowBg');
        }
        catch (_a) { }
        try {
            this.display_DOM.classList.remove('redBg');
        }
        catch (_b) { }
    };
    return Decoder;
}());
/******************************* Flags *********************************** */
var Flags = /** @class */ (function () {
    function Flags(c_flag_DOM, z_flag_DOM, p_flag_DOM, s_flag_DOM) {
        this.c_dec = 0;
        this.z_dec = 0;
        this.p_dec = 0;
        this.s_dec = 0;
        this.c_DOM = c_flag_DOM;
        this.z_DOM = z_flag_DOM;
        this.p_DOM = p_flag_DOM;
        this.s_DOM = s_flag_DOM;
        this.value_dec = 0;
        this.domElement = flags_DOM;
    }
    Flags.prototype.update = function (value_dec) {
        var bin_array = convertNumberToBinaryArray(value_dec);
        this.c_dec = bin_array[7];
        this.z_dec = bin_array[5];
        this.p_dec = bin_array[1];
        this.s_dec = bin_array[0];
        this.updateDOM();
    };
    Flags.prototype.updateDec = function (cFlag_dec, zFlag_dec, pFlag_dec, sFlag_dec) {
        this.c_dec = cFlag_dec;
        this.z_dec = zFlag_dec;
        this.p_dec = pFlag_dec;
        this.s_dec = sFlag_dec;
    };
    Flags.prototype.updateDOM = function () {
        if (this.c_dec === '-')
            this.c_dec = 0;
        if (this.z_dec === '-')
            this.z_dec = 0;
        if (this.p_dec === '-')
            this.p_dec = 0;
        if (this.s_dec === '-')
            this.s_dec = 0;
        this.value_dec = convertBinaryToNumber([this.s_dec, this.p_dec, 0, 0, 0, this.z_dec, 0, this.c_dec].join(''));
        this.c_DOM.textContent = this.c_dec.toString();
        this.z_DOM.textContent = this.z_dec.toString();
        this.p_DOM.textContent = this.p_dec.toString();
        this.s_DOM.textContent = this.s_dec.toString();
    };
    return Flags;
}());
/******************************* mc8_command ********************************* */
var mc8_command = /** @class */ (function () {
    function mc8_command(assembler_notation_string, machineCommand_dec, bytes, flags_array, animationFunction) {
        this.assembler_notation_string = assembler_notation_string;
        this.machineCommand_dec = machineCommand_dec;
        this.bytes = bytes;
        this.flags_array = flags_array;
        this.animationFunction = animationFunction;
    }
    mc8_command.prototype.runAnimation = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.animationFunction()];
            });
        });
    };
    return mc8_command;
}());
//variables
var isFullscreen = false;
var ANIMATION_SPEED = 3;
var playStatus = new PlayStatus();
var IDLETIME = 400;
var NOANIMATIONIDLETIME = 30;
var FRAMES = 60;
//class variables
var IO1 = new IO(document.getElementById('io1RegisterValue_h2'), 0, true);
var IO2 = new IO(document.getElementById('io2RegisterValue_h2'), 1, false);
var IO3 = new IO(document.getElementById('io3RegisterValue_h2'), 2, true);
var A = new Register_x2(document.getElementById('aRegisterValue_h2'));
var B = new Register_x2(document.getElementById('bRegisterValue_h2'));
var C = new Register_x2(document.getElementById('cRegisterValue_h2'));
var IR = new Register_x2(document.getElementById('irRegisterValue_h2'));
var ALU1 = new Register_x2(document.getElementById('alu1RegisterValue_h2'));
var ALU2 = new Register_x2(document.getElementById('alu2RegisterValue_h2'));
var ALUOUT = new Register_x2(document.getElementById('aluOutRegisterValue_h2'));
var HL = new Register_x4(document.getElementById('hlRegisterValue_h2'));
var IX = new Register_x4(document.getElementById('ixRegisterValue_h2'));
var SP = new Register_x4(document.getElementById('spRegisterValue_h2'));
var PC = new Pc_class(document.getElementById('pcRegisterValue_h2'));
var ZR = new Register_x4(document.getElementById('zrRegisterValue_h2'));
var FLAGS = new Flags(document.getElementById('cFlagValue_p'), document.getElementById('zFlagValue_p'), document.getElementById('pFlagValue_p'), document.getElementById('sFlagValue_p'));
var ROM = new Rom();
var RAM = new Ram();
var DECODER = new Decoder(document.getElementById('wrValue_p'), document.getElementById('rdValue_p'), document.getElementById('mValue_p'), document.getElementById('ioValue_p'), document.getElementById('decDisplay_p'));
/***************************************** Hover popups *********************************/
var romLabel_h1 = document.getElementById('romLabel_h1');
romLabel_h1.addEventListener('mouseover', function () {
    document.getElementById('romLabelHover_div').classList.toggle('toggleGrid');
});
romLabel_h1.addEventListener('mouseleave', function () {
    document.getElementById('romLabelHover_div').classList.toggle('toggleGrid');
});
var ramLabel_h1 = document.getElementById('ramLabel_h1');
ramLabel_h1.addEventListener('mouseover', function () {
    document.getElementById('ramStartAddressHex_p').textContent = convertNumberToHex_4digits(RAM.startAddressRam_dec) + 'h';
    document.getElementById('ramStartAddressDec_p').textContent = String(RAM.startAddressRam_dec);
    document.getElementById('ramEndAddressHex_p').textContent = convertNumberToHex_4digits(RAM.startAddressRam_dec + 8192 - 1) + 'h';
    document.getElementById('ramEndAddressDec_p').textContent = String(RAM.startAddressRam_dec + 8192 - 1);
    document.getElementById('ramLabelHover_div').classList.toggle('toggleGrid');
});
ramLabel_h1.addEventListener('mouseleave', function () {
    document.getElementById('ramLabelHover_div').classList.toggle('toggleGrid');
});
var io1Label_h1 = document.getElementById('io1Label_h1');
var checkedRadioIoMap_input = document.querySelector('input[name="radioIoMap"]:checked');
io1Label_h1.addEventListener('mouseover', function () {
    document.getElementById('io1Map_p').textContent = checkedRadioIoMap_input.value;
    document.getElementById('io1AddressHover_p').textContent = convertNumberToHex_4digits(convertHexToNumber(io1Address_textarea.value)) + 'h';
    document.getElementById('io1ValueDec_p').textContent = IO1.value_dec + ' (' + convertNumberToComplementOnTwo(IO1.value_dec) + ')';
    document.getElementById('io1ValueBin_p').textContent = convertNumberToBinary_8digits(IO1.value_dec);
    document.getElementById('io1LabelHover_div').classList.toggle('toggleGrid');
});
io1Label_h1.addEventListener('mouseleave', function () {
    document.getElementById('io1LabelHover_div').classList.toggle('toggleGrid');
});
var io2Label_h1 = document.getElementById('io2Label_h1');
io2Label_h1.addEventListener('mouseover', function () {
    document.getElementById('io2Map_p').textContent = checkedRadioIoMap_input.value;
    document.getElementById('io2AddressHover_p').textContent = convertNumberToHex_4digits(convertHexToNumber(io2Address_textarea.value)) + 'h';
    document.getElementById('io2ValueDec_p').textContent = IO2.value_dec + ' (' + convertNumberToComplementOnTwo(IO2.value_dec) + ')';
    document.getElementById('io2ValueBin_p').textContent = convertNumberToBinary_8digits(IO2.value_dec);
    document.getElementById('io2LabelHover_div').classList.toggle('toggleGrid');
});
io2Label_h1.addEventListener('mouseleave', function () {
    document.getElementById('io2LabelHover_div').classList.toggle('toggleGrid');
});
var io3Label_h1 = document.getElementById('io3Label_h1');
io3Label_h1.addEventListener('mouseover', function () {
    document.getElementById('io3Map_p').textContent = checkedRadioIoMap_input.value;
    document.getElementById('io3AddressHover_p').textContent = convertNumberToHex_4digits(convertHexToNumber(io3Address_textarea.value)) + 'h';
    document.getElementById('io3ValueDec_p').textContent = IO3.value_dec + ' (' + convertNumberToComplementOnTwo(IO3.value_dec) + ')';
    document.getElementById('io3ValueBin_p').textContent = convertNumberToBinary_8digits(IO3.value_dec);
    document.getElementById('io3LabelHover_div').classList.toggle('toggleGrid');
});
io3Label_h1.addEventListener('mouseleave', function () {
    document.getElementById('io3LabelHover_div').classList.toggle('toggleGrid');
});
var aRegisterLabel_h1 = document.getElementById('aRegisterLabel_h1');
aRegisterLabel_h1.addEventListener('mouseover', function () {
    document.getElementById('aHoverValueDec_p').textContent = 'Dezimal: ' + A.value_dec + ' (' + convertNumberToComplementOnTwo(A.value_dec) + ')';
    document.getElementById('aHoverValueBin_p').textContent = 'Binär: ' + convertNumberToBinary_8digits(A.value_dec);
    document.getElementById('aLabelHover_div').classList.toggle('toggleGrid');
});
aRegisterLabel_h1.addEventListener('mouseleave', function () {
    document.getElementById('aLabelHover_div').classList.toggle('toggleGrid');
});
var bRegisterLabel_h1 = document.getElementById('bRegisterLabel_h1');
bRegisterLabel_h1.addEventListener('mouseover', function () {
    document.getElementById('bHoverValueDec_p').textContent = 'Dezimal: ' + B.value_dec + ' (' + convertNumberToComplementOnTwo(B.value_dec) + ')';
    document.getElementById('bHoverValueBin_p').textContent = 'Binär: ' + convertNumberToBinary_8digits(B.value_dec);
    document.getElementById('bLabelHover_div').classList.toggle('toggleGrid');
});
bRegisterLabel_h1.addEventListener('mouseleave', function () {
    document.getElementById('bLabelHover_div').classList.toggle('toggleGrid');
});
var cRegisterLabel_h1 = document.getElementById('cRegisterLabel_h1');
cRegisterLabel_h1.addEventListener('mouseover', function () {
    document.getElementById('cHoverValueDec_p').textContent = 'Dezimal: ' + C.value_dec + ' (' + convertNumberToComplementOnTwo(C.value_dec) + ')';
    document.getElementById('cHoverValueBin_p').textContent = 'Binär: ' + convertNumberToBinary_8digits(C.value_dec);
    document.getElementById('cLabelHover_div').classList.toggle('toggleGrid');
});
cRegisterLabel_h1.addEventListener('mouseleave', function () {
    document.getElementById('cLabelHover_div').classList.toggle('toggleGrid');
});
var hlRegisterLabel_h1 = document.getElementById('hlRegisterLabel_h1');
hlRegisterLabel_h1.addEventListener('mouseover', function () {
    document.getElementById('hlHoverValueDec_p').textContent = 'Dezimal: ' + HL.value_dec;
    document.getElementById('hlLabelHover_div').classList.toggle('toggleGrid');
});
hlRegisterLabel_h1.addEventListener('mouseleave', function () {
    document.getElementById('hlLabelHover_div').classList.toggle('toggleGrid');
});
var ixRegisterLabel_h1 = document.getElementById('ixRegisterLabel_h1');
ixRegisterLabel_h1.addEventListener('mouseover', function () {
    document.getElementById('ixHoverValueDec_p').textContent = 'Dezimal: ' + IX.value_dec;
    document.getElementById('ixLabelHover_div').classList.toggle('toggleGrid');
});
ixRegisterLabel_h1.addEventListener('mouseleave', function () {
    document.getElementById('ixLabelHover_div').classList.toggle('toggleGrid');
});
var spRegisterLabel_h1 = document.getElementById('spRegisterLabel_h1');
spRegisterLabel_h1.addEventListener('mouseover', function () {
    document.getElementById('spHoverValueDec_p').textContent = 'Dezimal: ' + SP.value_dec;
    document.getElementById('spLabelHover_div').classList.toggle('toggleGrid');
});
spRegisterLabel_h1.addEventListener('mouseleave', function () {
    document.getElementById('spLabelHover_div').classList.toggle('toggleGrid');
});
var pcRegisterLabel_h1 = document.getElementById('pcRegisterLabel_h1');
pcRegisterLabel_h1.addEventListener('mouseover', function () {
    document.getElementById('pcHoverValueDec_p').textContent = 'Dezimal: ' + PC.value_dec;
    document.getElementById('pcLabelHover_div').classList.toggle('toggleGrid');
});
pcRegisterLabel_h1.addEventListener('mouseleave', function () {
    document.getElementById('pcLabelHover_div').classList.toggle('toggleGrid');
});
var zrRegisterLabel_h1 = document.getElementById('zrRegisterLabel_h1');
zrRegisterLabel_h1.addEventListener('mouseover', function () {
    document.getElementById('zrHoverValueDec_p').textContent = 'Dezimal: ' + ZR.value_dec;
    document.getElementById('zrLabelHover_div').classList.toggle('toggleGrid');
});
zrRegisterLabel_h1.addEventListener('mouseleave', function () {
    document.getElementById('zrLabelHover_div').classList.toggle('toggleGrid');
});
var irRegisterLabel_h1 = document.getElementById('irRegisterLabel_h1');
irRegisterLabel_h1.addEventListener('mouseover', function () {
    document.getElementById('irHoverValueBin_p').textContent = 'Binär: ' + convertNumberToBinary_8digits(IR.value_dec);
    document.getElementById('irLabelHover_div').classList.toggle('toggleGrid');
});
irRegisterLabel_h1.addEventListener('mouseleave', function () {
    document.getElementById('irLabelHover_div').classList.toggle('toggleGrid');
});
var decoderLabel_h1 = document.getElementById('decoderLabel_h1');
decoderLabel_h1.addEventListener('mouseover', function () {
    document.getElementById('decoderHover_div').classList.toggle('toggleGrid');
});
decoderLabel_h1.addEventListener('mouseleave', function () {
    document.getElementById('decoderHover_div').classList.toggle('toggleGrid');
});
var cFlagLabel_h1 = document.getElementById('cFlagLabel_h1');
cFlagLabel_h1.addEventListener('mouseover', function () {
    document.getElementById('cFlagHover_div').classList.toggle('toggleGrid');
});
cFlagLabel_h1.addEventListener('mouseleave', function () {
    document.getElementById('cFlagHover_div').classList.toggle('toggleGrid');
});
var zFlagLabel_h1 = document.getElementById('zFlagLabel_h1');
zFlagLabel_h1.addEventListener('mouseover', function () {
    document.getElementById('zFlagHover_div').classList.toggle('toggleGrid');
});
zFlagLabel_h1.addEventListener('mouseleave', function () {
    document.getElementById('zFlagHover_div').classList.toggle('toggleGrid');
});
var pFlagLabel_h1 = document.getElementById('pFlagLabel_h1');
pFlagLabel_h1.addEventListener('mouseover', function () {
    document.getElementById('pFlagHover_div').classList.toggle('toggleGrid');
});
pFlagLabel_h1.addEventListener('mouseleave', function () {
    document.getElementById('pFlagHover_div').classList.toggle('toggleGrid');
});
var sFlagLabel_h1 = document.getElementById('sFlagLabel_h1');
sFlagLabel_h1.addEventListener('mouseover', function () {
    document.getElementById('sFlagHover_div').classList.toggle('toggleGrid');
});
sFlagLabel_h1.addEventListener('mouseleave', function () {
    document.getElementById('sFlagHover_div').classList.toggle('toggleGrid');
});
var wrLabel_h3 = document.getElementById('wrLabel_h3');
wrLabel_h3.addEventListener('mouseover', function () {
    document.getElementById('wrHover_div').classList.toggle('toggleGrid');
});
wrLabel_h3.addEventListener('mouseleave', function () {
    document.getElementById('wrHover_div').classList.toggle('toggleGrid');
});
var rdLabel_h3 = document.getElementById('rdLabel_h3');
rdLabel_h3.addEventListener('mouseover', function () {
    document.getElementById('rdHover_div').classList.toggle('toggleGrid');
});
rdLabel_h3.addEventListener('mouseleave', function () {
    document.getElementById('rdHover_div').classList.toggle('toggleGrid');
});
var mLabel_h3 = document.getElementById('mLabel_h3');
mLabel_h3.addEventListener('mouseover', function () {
    document.getElementById('mHover_div').classList.toggle('toggleGrid');
});
mLabel_h3.addEventListener('mouseleave', function () {
    document.getElementById('mHover_div').classList.toggle('toggleGrid');
});
var ioLabel_h3 = document.getElementById('ioLabel_h3');
ioLabel_h3.addEventListener('mouseover', function () {
    document.getElementById('ioHover_div').classList.toggle('toggleGrid');
});
ioLabel_h3.addEventListener('mouseleave', function () {
    document.getElementById('ioHover_div').classList.toggle('toggleGrid');
});
var play_button = document.getElementById('play_button');
play_button.addEventListener('mouseover', function () {
    document.getElementById('playHover_div').classList.toggle('toggleGrid');
});
play_button.addEventListener('mouseleave', function () {
    document.getElementById('playHover_div').classList.toggle('toggleGrid');
});
var pause_button = document.getElementById('pause_button');
pause_button.addEventListener('mouseover', function () {
    document.getElementById('pauseHover_div').classList.toggle('toggleGrid');
});
pause_button.addEventListener('mouseleave', function () {
    document.getElementById('pauseHover_div').classList.toggle('toggleGrid');
});
var stop_button = document.getElementById('stop_button');
stop_button.addEventListener('mouseover', function () {
    document.getElementById('stopHover_div').classList.toggle('toggleGrid');
});
stop_button.addEventListener('mouseleave', function () {
    document.getElementById('stopHover_div').classList.toggle('toggleGrid');
});
var slow_button = document.getElementById('slow_button');
slow_button.addEventListener('mouseover', function () {
    document.getElementById('slowHover_div').classList.toggle('toggleGrid');
});
slow_button.addEventListener('mouseleave', function () {
    document.getElementById('slowHover_div').classList.toggle('toggleGrid');
});
var fast_button = document.getElementById('fast_button');
fast_button.addEventListener('mouseover', function () {
    document.getElementById('fastHover_div').classList.toggle('toggleGrid');
});
fast_button.addEventListener('mouseleave', function () {
    document.getElementById('fastHover_div').classList.toggle('toggleGrid');
});
var decrease_button = document.getElementById('decrease_button');
decrease_button.addEventListener('mouseover', function () {
    document.getElementById('decreaseHover_div').classList.toggle('toggleGrid');
});
decrease_button.addEventListener('mouseleave', function () {
    document.getElementById('decreaseHover_div').classList.toggle('toggleGrid');
});
var increase_button = document.getElementById('increase_button');
increase_button.addEventListener('mouseover', function () {
    document.getElementById('increaseHover_div').classList.toggle('toggleGrid');
});
increase_button.addEventListener('mouseleave', function () {
    document.getElementById('increaseHover_div').classList.toggle('toggleGrid');
});
var oneCommand_button = document.getElementById('oneCommand_button');
oneCommand_button.addEventListener('mouseover', function () {
    document.getElementById('oneCommandHover_div').classList.toggle('toggleGrid');
});
oneCommand_button.addEventListener('mouseleave', function () {
    document.getElementById('oneCommandHover_div').classList.toggle('toggleGrid');
});
var singleStep_button = document.getElementById('singleStep_button');
singleStep_button.addEventListener('mouseover', function () {
    document.getElementById('singleStepHover_div').classList.toggle('toggleGrid');
});
singleStep_button.addEventListener('mouseleave', function () {
    document.getElementById('singleStepHover_div').classList.toggle('toggleGrid');
});
var fullCommand_button = document.getElementById('fullCommand_button');
fullCommand_button.addEventListener('mouseover', function () {
    document.getElementById('fullCommandHover_div').classList.toggle('toggleGrid');
});
fullCommand_button.addEventListener('mouseleave', function () {
    document.getElementById('fullCommandHover_div').classList.toggle('toggleGrid');
});
var settings_button = document.getElementById('settingsButton_button');
settings_button.addEventListener('mouseover', function () {
    document.getElementById('settingsButtonHover_div').classList.toggle('toggleGrid');
});
settings_button.addEventListener('mouseleave', function () {
    document.getElementById('settingsButtonHover_div').classList.toggle('toggleGrid');
});
var fullscreen_button = document.getElementById('fullscreenButton_button');
fullscreen_button.addEventListener('mouseover', function () {
    document.getElementById('fullscreenButtonHover_div').classList.toggle('toggleGrid');
});
fullscreen_button.addEventListener('mouseleave', function () {
    document.getElementById('fullscreenButtonHover_div').classList.toggle('toggleGrid');
});
var toggleTheme_button = document.getElementById('toggleTheme_button');
toggleTheme_button.addEventListener('mouseover', function () {
    document.getElementById('toggleThemeHover_div').classList.toggle('toggleGrid');
});
toggleTheme_button.addEventListener('mouseleave', function () {
    document.getElementById('toggleThemeHover_div').classList.toggle('toggleGrid');
});
/***************************************** settings functions *********************************/
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
var changeRamAddress_DOM = function (hex1_string, hex2_string) {
    var pEle = document.getElementsByClassName('RamAddressLabel');
    var str = ['0', '1', '2', '3', '4', '5', '6', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    RAM.startAddressRam_dec = convertHexToNumber(hex1_string + '00');
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
            changeRamAddress_DOM('20', '3F');
            break;
        case '4000':
            changeRamAddress_DOM('40', '5F');
            break;
        case '6000':
            changeRamAddress_DOM('60', '7F');
            break;
        case '8000':
            changeRamAddress_DOM('80', '9F');
            break;
        case 'A000':
            changeRamAddress_DOM('A0', 'BF');
            break;
        case 'C000':
            changeRamAddress_DOM('C0', 'DF');
            break;
        case 'E000':
            changeRamAddress_DOM('E0', 'FF');
            break;
        default:
            break;
    }
};
var setSettingsDependingOnProgram = function (ioMapped_boolean, io1IN_boolean, io2IN_boolean, io3IN_boolean, io1Address_hex, io2Address_hex, io3Address_hex, ramStartingAddress_hex) {
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
    io1Address_textarea.value = io1Address_hex;
    io2Address_textarea.value = io2Address_hex;
    io3Address_textarea.value = io3Address_hex;
    ramAddress_select.value = ramStartingAddress_hex;
    changeRamAddress();
};
var updateProgram = function () {
    switch (programSelection_select.value) {
        case 'own':
            linkerFile_textarea.value = 'Fügen Sie hier den Inhalt der vom Linker erzeugten .OBJ-Datei ein.\n(im Intel-HEX-Format)';
            setSettingsDependingOnProgram(true, true, false, true, '0000', '0001', '0002', '2000');
            break;
        case 'bsp1':
            linkerFile_textarea.value = ':0100000000ff\n:0100010000fe\n:0100020000fd\n:0100030000fc\n:0100040000fb\n:0100050000fa\n:0100060000f9\n:0100070000f8\n:0100080000f7\n:0100090000f6\n:01000a0000f5\n:01000b0000f4\n:01000c0000f3\n:01000d0000f2\n:01000e0000f1\n:01000f0000f0\n:0100100000ef\n:0100110000ee\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, true, '0000', '0001', '0002', '2000');
            break;
        case 'bsp2':
            linkerFile_textarea.value = ':010000003Cc3\n:010001003Cc2\n:010002003Cc1\n:0100030004f8\n:0100040004f7\n:010005000Cee\n:0100060023d6\n:010007008771\n:010008008770\n:010009008076\n:01000a008075\n:01000b008173\n:01000c008172\n:01000d003Db5\n:01000e003Db4\n:01000f0005eb\n:010010000De2\n:01001100905e\n:01001200905d\n:01001300915b\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, true, '0000', '0001', '0002', '2000');
            break;
        case 'bsp3':
            linkerFile_textarea.value = ':020000003E11af\n:020002000622d4\n:020004000E33b9\n:030006002155443d\n:01000900787e\n:01000a0041b4\n:01000b004Fa5\n:02000c003E664e\n:01000e0047aa\n:02000f003E773a\n:010011004F9f\n:020012003E8826\n:010014007675\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, true, '0000', '0001', '0002', '2000');
            break;
        case 'bsp4':
            linkerFile_textarea.value = ':04000000DD212211cb\n:02000400DD23fa\n:02000600DD23f8\n:02000800DD2Bee\n:03000a002144335b\n:01000d0023cf\n:01000e0023ce\n:03000f00310300ba\n:010012007677\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, true, '0000', '0001', '0002', '2000');
            break;
        case 'bsp5':
            linkerFile_textarea.value = ':020000003E11af\n:030002003200E0e9\n:0300050021332282\n:030008002201E0f2\n:04000b00DD2155445a\n:04000f00DD2203E00b\n:010013003Cb0\n:0100140023c8\n:02001500DD23e9\n:0100170047a1\n:030018003A00E0cb\n:03001b002A03E0d5\n:04001e00DD2A01E0f6\n:01e00000001f\n:01e00100001e\n:01e00200001d\n:01e00300001c\n:01e00400001b\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, true, '0000', '0001', '0002', 'E000');
            break;
        case 'bsp6':
            linkerFile_textarea.value = ':020000003E12ae\n:030002002150E0aa\n:0100050047b3\n:03000600324FE096\n:01000900876f\n:01000a004Fa6\n:03000b003250E090\n:01000e00876a\n:01000f007779\n:030010003A4FE084\n:0100130047a5\n:030014003A50E07f\n:010017004F99\n:010018007E69\n:010019007670\n:01e04f0000d0\n:01e0500000cf\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, true, '0000', '0001', '0002', 'E000');
            break;
        case 'bsp7':
            linkerFile_textarea.value = ':0300000031FFFFce\n:020003003EEEcf\n:020005000622d1\n:020007000E8861\n:010009008076\n:01000a00F500\n:01000b009163\n:01000c0047ac\n:01000d00F101\n:01000e008071\n:01000f00F5fb\n:01001000915e\n:0100110047a7\n:01001200F1fc\n:010013007676\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, true, '0000', '0001', '0002', 'E000');
            break;
        case 'bsp8':
            linkerFile_textarea.value = ':020000003E0Cb4\n:0100020047b6\n:020003003EC0fd\n:010005004Fab\n:01000600A059\n:030007003200E0e4\n:01000a00797c\n:01000b00B044\n:03000c003201E0de\n:02000f003E179a\n:0100110047a7\n:020012003E713d\n:01001400A843\n:0100150047a3\n:02001600CB27f6\n:02001800CB27f4\n:02001a00CB27f2\n:01001c00786b\n:01001d0007db\n:01001e0007da\n:01001f0007d9\n:010020007867\n:0100210017c7\n:0100220017c6\n:0100230017c5\n:010024007665\n:01e00000001f\n:01e00100001e\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, true, '0000', '0001', '0002', 'E000');
            break;
        case 'bsp9':
            linkerFile_textarea.value = ':020000003E20a0\n:020002000610e6\n:020004000E30bc\n:01000600BF3a\n:03000700CA0B0021\n:01000a003Cb9\n:01000b00B83c\n:03000c00F21000ef\n:01000f003Cb4\n:01001000B936\n:03001100FA1500dd\n:010014003Caf\n:010015008169\n:010016008762\n:03001700DA2300e9\n:01001a00875e\n:03001b00DA2300e5\n:01001e00875a\n:03001f00DA2300e1\n:010022008756\n:03002300C3000017\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, true, '0000', '0001', '0002', '2000');
            break;
        case 'bsp10':
            linkerFile_textarea.value = ':0300000031FFFFce\n:0300030021700069\n:010006007E7b\n:02000700D30321\n:0100090047af\n:01000a0023d2\n:02000b00DB0117\n:01000d004Fa3\n:01000e00B839\n:03000f00C2060026\n:010012007677\n:01007000008f\n:01007100107e\n:01007200206d\n:01007300305c\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, false, '0001', '0003', '0005', 'E000');
            break;
        case 'bsp11':
            linkerFile_textarea.value = ':0300000031FFFFce\n:030003003A00A020\n:0100060047b2\n:03000700CD4000e9\n:03000a003A00A019\n:01000d00B83a\n:03000e00CA030022\n:020040003E037d\n:010042003D80\n:03004300C24200b6\n:01004600C9f0\n:01a00000005f\n:01a00100005e\n:00000001FF';
            setSettingsDependingOnProgram(false, true, false, true, 'A000', 'A001', 'A002', 'E000');
            break;
        case 'bsp12':
            linkerFile_textarea.value = ':0300000031FFFFce\n:020003000E7776\n:02000500DB011d\n:01000700B93f\n:03000800CA1A0011\n:03000b00D214000c\n:03000e00CD3200f0\n:03001100C3170012\n:03001400CD3B00e1\n:03001700C305001e\n:03001a00CD4400d2\n:03001d00C3170006\n:020032003E008e\n:02003400D303f4\n:020036003E99f1\n:02003800D305ee\n:01003a00C9fc\n:02003b003E0085\n:02003d00D305e9\n:02003f003E99e8\n:02004100D303e7\n:01004300C9f3\n:020044003E007c\n:02004600D305e0\n:020048003E0078\n:02004a00D303de\n:01004c00C9ea\n:00000001FF';
            setSettingsDependingOnProgram(true, true, false, false, '0001', '0003', '0005', 'E000');
            break;
        case 'bsp13':
            linkerFile_textarea.value = ':0300000031FF3F8e\n:02000300DB0020\n:0100050047b3\n:02000600DB011c\n:03000800CD100018\n:02000b00D3021e\n:03000d00C303002a\n:020010000E04dc\n:02001200CB27fa\n:010014000Dde\n:03001500C2120014\n:020018000E04d4\n:02001a00CB27f2\n:03001c00D22000ef\n:01001f008060\n:010020000Dd2\n:03002100C21A0000\n:01002400C912\n:00000001FF';
            setSettingsDependingOnProgram(true, true, true, false, '0000', '0001', '0002', '2000');
            break;
        case 'bsp14':
            linkerFile_textarea.value = ':0300000031FF3F8e\n:02000300DB0020\n:020005000600f3\n:03000700CD0E001b\n:01000a00787d\n:02000b00D3021e\n:01000d00767c\n:01000e00F5fc\n:01000f003Db3\n:03001000CA16000d\n:03001300CD0E000f\n:01001600F1f8\n:010017008068\n:0100180047a0\n:01001900C91d\n:00000001FF';
            setSettingsDependingOnProgram(true, true, true, false, '0000', '0001', '0002', '2000');
            break;
        case 'bsp15':
            linkerFile_textarea.value = ':02000000DB0023\n:0300020032D007f2\n:02000500DB011d\n:0300070032D107ec\n:03000a00CDD60749\n:03000d003AD307dc\n:02001000D30219\n:03001200C3000028\n:0107d0000028\n:0107d1000027\n:0107d2000026\n:0107d3000025\n:0107d4000024\n:0107d5000023\n:0307d6003AD0070f\n:0107d90047d8\n:0307da003AD1070a\n:0107dd00809b\n:0307de0032D3070c\n:0107e100C94e\n:00000001FF';
            setSettingsDependingOnProgram(true, true, true, false, '0000', '0001', '0002', '2000');
            break;
        case 'bsp16':
            linkerFile_textarea.value = ':02000000DB0122\n:02000200FE0Fef\n:03000400C2000037\n:030007003A1600a6\n:01000a0047ae\n:03000b00211700ba\n:01000e007E73\n:02000f00D3021a\n:0100110023cb\n:0100120005e8\n:03001300C20E001a\n:0100160004e5\n:0100170007e1\n:010018000Dda\n:010019000Fd7\n:01001a00766f\n:00000001FF';
            setSettingsDependingOnProgram(true, true, true, false, '0000', '0001', '0002', '2000');
            break;
        case 'bsp17':
            linkerFile_textarea.value = ':02000000DB0122\n:02000200FE0Fef\n:03000400C2000037\n:030007002A1A00b2\n:01000a007E77\n:01000b0047ad\n:03000c002A1B00ac\n:01000f007E72\n:02001000D30219\n:0100120023ca\n:0100130005e7\n:03001400C20F0018\n:03001700C3000023\n:01001a0009dc\n:01001b0001e3\n:01001c0003e0\n:01001d0005dd\n:01001e0007da\n:01001f000Bd5\n:010020000Dd2\n:0100210011cd\n:0100220013ca\n:0100230017c5\n:00000001FF';
            setSettingsDependingOnProgram(true, true, true, false, '0000', '0001', '0002', '2000');
            break;
        case 'bsp18':
            linkerFile_textarea.value = ':0300000031FF3F8e\n:020003000E02eb\n:02000500DB001e\n:03000700320020a4\n:01000a00797c\n:03000b00CD5000d5\n:02000e00DB0015\n:030010003201209a\n:03001300CD4400d9\n:030016003A02208b\n:02001900FE00e7\n:03001b00CA3100e7\n:02001e003EABf7\n:02002000D30209\n:010022007964\n:03002300CD5000bd\n:020026003E0199\n:02002800D30201\n:01002a00795c\n:03002b00CD5000b5\n:03002e00C3050007\n:020031003E7619\n:02003300D302f6\n:010035007951\n:03003600CD5000aa\n:020039003E2364\n:02003b00D302ee\n:01003d007949\n:03003e00CD5000a2\n:03004100C30500f4\n:030044003A00205f\n:010047004F69\n:030048003A01205a\n:01004b009123\n:03004c003202205d\n:01004f00C9e7\n:020050000605a3\n:0100520005a8\n:03005300C2520096\n:010056003D6c\n:03005700C2500094\n:01005a00C9dc\n:0120000000df\n:0120010000de\n:0120020000dd\n:0120030000dc\n:0120040000db\n:00000001FF';
            setSettingsDependingOnProgram(true, true, true, false, '0000', '0001', '0002', '2000');
            break;
        case 'bsp19':
            linkerFile_textarea.value = ':020000003E00c0\n:020002000600f6\n:03000400211500c3\n:020007000E0Ddc\n:010009007E78\n:01000a008075\n:01000b0047ad\n:01000c0023d0\n:01000d000De5\n:03000e00C2090024\n:010011007876\n:02001200D30019\n:010014007675\n:0100150001e9\n:0100160002e7\n:0100170001e7\n:0100180002e5\n:0100190001e5\n:01001a0001e4\n:01001b0001e3\n:01001c0001e2\n:01001d0002e0\n:01001e0002df\n:01001f0001df\n:0100200002dd\n:0100210001dd\n:00000001FF';
            setSettingsDependingOnProgram(true, false, false, true, '0000', '0001', '0002', '2000');
            break;
        default:
            linkerFile_textarea.value = '';
            break;
    }
};
//update of the classes 
var updateIoClasses = function () {
    //IO-map
    if (radioIoMapped_input.checked) {
        IO1.ioMapped_boolean = true;
        IO2.ioMapped_boolean = true;
        IO3.ioMapped_boolean = true;
    }
    else {
        IO1.ioMapped_boolean = false;
        IO2.ioMapped_boolean = false;
        IO3.ioMapped_boolean = false;
    }
    //IO address and in-/output
    if (io1InputRadio_input.checked) {
        IO1.in_boolean = true;
        try {
            io1Arrow_div.classList.remove('ioArrowOUT');
        }
        catch (_a) { }
    }
    else {
        IO1.in_boolean = false;
        io1Arrow_div.classList.add('ioArrowOUT');
    }
    if (io2InputRadio_input.checked) {
        IO2.in_boolean = true;
        try {
            io2Arrow_div.classList.remove('ioArrowOUT');
        }
        catch (_b) { }
    }
    else {
        IO2.in_boolean = false;
        io2Arrow_div.classList.add('ioArrowOUT');
    }
    if (io3InputRadio_input.checked) {
        IO3.in_boolean = true;
        try {
            io3Arrow_div.classList.remove('ioArrowOUT');
        }
        catch (_c) { }
    }
    else {
        IO3.in_boolean = false;
        io3Arrow_div.classList.add('ioArrowOUT');
    }
    IO1.address_dec = convertHexToNumber(io1Address_textarea.value);
    IO2.address_dec = convertHexToNumber(io2Address_textarea.value);
    IO3.address_dec = convertHexToNumber(io3Address_textarea.value);
};
var saveSettings = function () {
    if (checkSettings()) {
        updateIoClasses();
        stopBtn(); //init
        ROM.update();
        RAM.reset();
        updateRedRectangle(0);
        toggleSettings();
        errorWindow_div.classList.remove('toggleGrid');
    }
};
// *****************************EventListeners*****************************/
programSelection_select.addEventListener('input', updateProgram);
radioIoMapped_input.addEventListener('change', updateIoClasses);
ramAddress_select.addEventListener('input', changeRamAddress);
io1InputRadio_input.addEventListener('change', updateIoClasses);
io1OutputRadio_input.addEventListener('change', updateIoClasses);
io2InputRadio_input.addEventListener('change', updateIoClasses);
io2OutputRadio_input.addEventListener('change', updateIoClasses);
io3InputRadio_input.addEventListener('change', updateIoClasses);
io3OutputRadio_input.addEventListener('change', updateIoClasses);
// *****************************errorWindow*****************************
var errorWindow_div = document.getElementById('errorWindow_div');
var errorMessage_textarea = document.getElementById('errorMessage_textarea');
var checkLinkerFile = function (errorMessage_string, count_dec) {
    var intelHexArray = linkerFile_textarea.value.split('\n');
    var noError = true;
    var recordLength = 0;
    var recordAddress = 0;
    var recordType = 0;
    var data = 0;
    var checksum = 0;
    for (var i = 0; i < intelHexArray.length; i++) {
        var record = intelHexArray[i].trim();
        if (record === '')
            continue;
        //check if line starts with :
        if (noError) {
            if (record[0] !== ':') {
                errorMessage_string += count_dec + ") Fehler in der Linker-Datei in Zeile " + (i + 1) + ":\nJede Zeile muss mit einem : beginnen.\n\n";
                count_dec++;
                noError = false;
            }
        }
        //check if line includes whitespace
        if (noError) {
            if (record.includes(' ')) {
                errorMessage_string += count_dec + ") Fehler in der Linker-Datei in Zeile " + (i + 1) + ":\nEs d\u00FCrfen keine Leerzeichen in einem Record vorhanden sein.\n\n";
                count_dec++;
                noError = false;
            }
        }
        //check record length
        if (noError) {
            if (!checkValidHex(record[1] + record[2])) {
                errorMessage_string += count_dec + ") Fehler in der Linker-Datei in Zeile " + (i + 1) + ": Recordl\u00E4nge " + (record[1] + record[2]) + " ist keine g\u00FCltige HEX-Zahl.\n\n";
                count_dec++;
                noError = false;
            }
            if (noError) {
                recordLength = convertHexToNumber(record[1] + record[2]);
                if (record.length < 1 + 2 + 4 + 2 + recordLength * 2 + 2) {
                    errorMessage_string += count_dec + ") Fehler in der Linker-Datei in Zeile " + (i + 1) + ": Recordl\u00E4nge " + (record[1] + record[2]) + " stimmt nicht mit der L\u00E4nge des Datensatzes \u00FCberein.\n\n";
                    count_dec++;
                    noError = false;
                }
            }
        }
        //check record address
        if (noError) {
            if (!checkValidHex(record[3] + record[4] + record[5] + record[6])) {
                errorMessage_string += count_dec + ") Fehler in der Linker-Datei in Zeile " + (i + 1) + ": Recordadresse " + (record[3] + record[4] + record[5] + record[6]) + " ist keine g\u00FCltige HEX-Zahl.\n\n";
                count_dec++;
                noError = false;
            }
            //TODO: check if bigger than 1999h ??
        }
        //check record type
        if (noError) {
            if (!checkValidHex(record[7] + record[8])) {
                errorMessage_string += count_dec + ") Fehler in der Linker-Datei in Zeile " + (i + 1) + ": Recordtyp " + (record[7] + record[8]) + " ist keine g\u00FCltige HEX-Zahl.\n\n";
                count_dec++;
                noError = false;
            }
            //check if type is a data-record
            if (noError) {
                if (recordLength === 0 && convertHexToNumber(record[7] + record[8]) === 0) {
                    errorMessage_string += count_dec + ") Fehler in der Linker-Datei in Zeile " + (i + 1) + ": Recordl\u00E4nge " + (record[1] + record[2]) + " muss f\u00FCr einen Daten-Recordtyp gr\u00F6\u00DFer als null sein.\n\n";
                    count_dec++;
                    noError = false;
                }
            }
            if (noError) {
                if (convertHexToNumber(record[7] + record[8]) > 1) {
                    errorMessage_string += count_dec + ") Fehler in der Linker-Datei in Zeile " + (i + 1) + ": Unbekannter Recordtyp " + (record[7] + record[8]) + ".\n                    \n\n";
                    count_dec++;
                    noError = false;
                }
            }
        }
        //check data
        if (noError) {
            recordLength = convertHexToNumber(record[1] + record[2]);
            for (var j = 0; j < recordLength * 2; j = j + 2) {
                if (!checkValidHex(record[9 + j] + record[10 + j])) {
                    errorMessage_string += count_dec + ") Fehler in der Linker-Datei in Zeile " + (i + 1) + ": Datenbyte " + (record[9 + j] + record[10 + j]) + " ist keine g\u00FCltige HEX-Zahl.\n\n";
                    count_dec++;
                    noError = false;
                }
            }
        }
        //check checksum
        if (noError) {
            if (!checkValidHex(record[9 + recordLength * 2] + record[10 + recordLength * 2])) {
                errorMessage_string += count_dec + ") Fehler in der Linker-Datei in Zeile " + (i + 1) + ": Checkumme " + (record[9 + recordLength * 2] + record[10 + recordLength * 2]) + " ist keine g\u00FCltige HEX-Zahl.\n\n";
                count_dec++;
                noError = false;
            }
            //TODO: check with new mc8assembler
            else if (calculateChecksum(record) !== '00') {
                errorMessage_string += count_dec + ") Fehler in der Linker-Datei in Zeile " + (i + 1) + ": Checkumme " + (record[9 + recordLength * 2] + record[10 + recordLength * 2]) + " ist nicht korrekt. Richtige Checksumme: " + calculateChecksum(record.slice(0, -2)) + "\n\n";
                noError = false;
            }
        }
    }
    return [errorMessage_string, count_dec];
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
    //check if inputs reside on same address
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
        if (convertHexToNumber(io1Address_textarea.value) >= RAM.startAddressRam_dec && convertHexToNumber(io1Address_textarea.value) < (RAM.startAddressRam_dec + 8192)) {
            errorMessage_string += count + ") Die Adresse " + io1Address_textarea.value + "h von IO1 liegt im Adressbereich des RAM. Bitte verwenden Sie eine andere Adresse f\u00FCr den IO-Baustein oder f\u00FCr das RAM.";
            count++;
        }
        if (convertHexToNumber(io2Address_textarea.value) >= RAM.startAddressRam_dec && convertHexToNumber(io2Address_textarea.value) < (RAM.startAddressRam_dec + 8192)) {
            errorMessage_string += count + ") Die Adresse " + io2Address_textarea.value + "h von IO2 liegt im Adressbereich des RAM. Bitte verwenden Sie eine andere Adresse f\u00FCr den IO-Baustein oder f\u00FCr das RAM.";
            count++;
        }
        if (convertHexToNumber(io3Address_textarea.value) >= RAM.startAddressRam_dec && convertHexToNumber(io3Address_textarea.value) < (RAM.startAddressRam_dec + 8192)) {
            errorMessage_string += count + ") Die Adresse " + io3Address_textarea.value + "h von IO3 liegt im Adressbereich des RAM. Bitte verwenden Sie eine andere Adresse f\u00FCr den IO-Baustein oder f\u00FCr das RAM.";
            count++;
        }
    }
    if (errorMessage_string === '')
        return true;
    errorWindow_div.classList.add('toggleGrid');
    errorMessage_textarea.textContent = errorMessage_string;
    return false;
};
/*********************************** bus system and path logic ************************************/
var Point = /** @class */ (function () {
    function Point(index, x, y, labelString, parent, childArray) {
        this.index = index;
        this.x = x;
        this.y = y;
        this.label = labelString;
        this.parent = parent;
        this.children = childArray;
    }
    Point.prototype.getParent = function () {
        return this.parent;
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
//returns the index/position of a fixPoint in the fixPoint-array
var getPointIndex = function (pointID_string) {
    for (var i = 0; i < fixPoints.length; i++) {
        if (fixPoints[i].label === pointID_string)
            return i;
    }
    return -1;
};
//returns the indices from Zero(ROM1) to the passed point index. 
var getIndexArrayZeroToPoint = function (pointIndex_dec) {
    var atoZero = [];
    while (true) {
        if (pointIndex_dec === 0) {
            atoZero.push(0);
            return atoZero.reverse();
        }
        else {
            atoZero.push(pointIndex_dec);
            pointIndex_dec = fixPoints[pointIndex_dec].getParent(); //Only parent indices are added to array
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
// The following three functions return a point-array
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
var getPointsAtoB = function (fixPointLabel_A_string, fixPointLabel_B_string) {
    var pointsAtoB = [];
    //The bus-system does not include rom- or ram-Elements.
    if (fixPointLabel_A_string.includes('romElement')) {
        pointsAtoB = getPointsAtoB('ROM1', fixPointLabel_B_string);
        pointsAtoB = romElementToROM1(fixPointLabel_A_string).concat(pointsAtoB);
        return pointsAtoB;
    }
    if (fixPointLabel_A_string.includes('ramElement')) {
        pointsAtoB = getPointsAtoB('RAM1', fixPointLabel_B_string);
        pointsAtoB = ramElementToRAM1(fixPointLabel_A_string).concat(pointsAtoB);
        return pointsAtoB;
    }
    if (fixPointLabel_B_string.includes('ramElement')) {
        pointsAtoB = getPointsAtoB(fixPointLabel_A_string, 'RAM1');
        pointsAtoB = pointsAtoB.concat(RAM2ToRamElement(fixPointLabel_B_string));
        return pointsAtoB;
    }
    pointsAtoB = getIndexArrayAtoB(getIndexArrayZeroToPoint(getPointIndex(fixPointLabel_A_string)), getIndexArrayZeroToPoint(getPointIndex(fixPointLabel_B_string)));
    //convert Index-Array to Point-Array
    for (var i = 0; i < pointsAtoB.length; i++) {
        pointsAtoB[i] = fixPoints[pointsAtoB[i]];
    }
    return pointsAtoB;
};
/*********************************** red rectangle ************************************/
// const create_RedRectangle = () => {
//     let redRectangle_p_p = document.getElementById('romElement0').cloneElement(true);
//     redRectangle_p_p.classList.add("borderBox");
//     redRectangle_p_p.id = "redRectangle_p";
//     redRectangle_p_p.style.borderColor = "#FF1930";
//     redRectangle_p_p.style.background = "#FCDEE1";
//     redRectangle_p_p.style.color = "Black";
//     mc8Container.appendChild(redRectangle_p_p);
//     return redRectangle_p_p;
// }
// const redRectangle_p = create_RedRectangle();
var redRectangle_p = document.getElementById('redRectangle_p');
var updateRedRectangle = function (PC_dec) {
    redRectangle_p.style.display = '';
    if (PC_dec < 224) {
        //should always be on the position the PC is pointing at
        var xPos = PC_dec % 8 + 2;
        var yPos = Math.floor(PC_dec / 8) + 2;
        redRectangle_p.textContent = convertNumberToHex_2digits(ROM.dec_array[PC_dec]);
        redRectangle_p.style.left = String(100 / 46 * (xPos)) + "%";
        redRectangle_p.style.top = String(100 / 32 * (yPos)) + "%";
        redRectangle_p.style.width = String(100 / 46 * 1) + "%";
        redRectangle_p.style.height = String(100 / 32 * 1) + "%";
    }
    else if (PC_dec < 8192) {
        var xPos = PC_dec % 8 + 2;
        var yPos = 0;
        var bigger7 = convertNumberToHex_4digits(PC_dec)[3];
        if (convertHexToNumber(bigger7) > 7)
            yPos = 1;
        redRectangle_p.textContent = convertNumberToHex_2digits(ROM.dec_array[PC_dec]);
        redRectangle_p.style.top = String(100 / 32 * (30 + yPos)) + "%";
        redRectangle_p.style.left = String(100 / 46 * (xPos)) + "%";
    }
    else if (PC_dec >= RAM.startAddressRam_dec && PC_dec < RAM.startAddressRam_dec + 112) {
        PC_dec = PC_dec - Math.floor(PC_dec / 8192) * 8192;
        var xPos = PC_dec % 8 + 36;
        var yPos = Math.floor(PC_dec / 8) + 2;
        redRectangle_p.textContent = convertNumberToHex_2digits(RAM.dec_array[PC_dec]);
        redRectangle_p.style.top = String(100 / 32 * (yPos)) + "%";
        redRectangle_p.style.width = String(100 / 46 * 1) + "%";
        redRectangle_p.style.height = String(100 / 32 * 1) + "%";
    }
    else if (PC_dec >= RAM.startAddressRam_dec + 112 && PC_dec < RAM.startAddressRam_dec + 8080) {
        PC_dec = PC_dec - Math.floor(PC_dec / 8192) * 8192;
        var xPos = PC_dec % 8 + 36;
        var yPos = 0;
        var bigger7 = convertNumberToHex_4digits(PC_dec)[3];
        if (convertHexToNumber(bigger7) > 7)
            yPos = 1;
        redRectangle_p.textContent = convertNumberToHex_2digits(RAM.dec_array[PC_dec]);
        redRectangle_p.style.left = String(100 / 46 * (xPos)) + "%";
        redRectangle_p.style.top = String(100 / 32 * (16 + yPos)) + "%";
    }
    else if (PC_dec >= RAM.startAddressRam_dec + 8080 && PC_dec < RAM.startAddressRam_dec + 8192) {
        PC_dec = PC_dec - Math.floor(PC_dec / 8192) * 8192;
        var xPos = PC_dec % 8 + 36;
        var yPos = Math.floor((PC_dec - 7952) / 8) + 2;
        redRectangle_p.textContent = convertNumberToHex_2digits(RAM.dec_array[PC_dec]);
        redRectangle_p.style.left = String(100 / 46 * (xPos)) + "%";
        redRectangle_p.style.top = String(100 / 32 * (yPos)) + "%";
        redRectangle_p.style.width = String(100 / 46 * 1) + "%";
        redRectangle_p.style.height = String(100 / 32 * 1) + "%";
    }
    else {
        redRectangle_p.style.display = 'none';
    }
};
updateRedRectangle(0);
/******************************************************* ANIMATION IMPLEMENTATION ********************************************************* */
/****************************************************************************************************************************************** */
/******************** basic functions ********************/
//Sleep functions for pausing Animation for a certain time
var sleepForMs = function (milliseconds) { return new Promise(function (resolve) { return setTimeout(resolve, milliseconds); }); };
//throws 'Stop pressed' error
var sleep = function (milliseconds) { return __awaiter(_this, void 0, void 0, function () {
    var count;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                count = milliseconds;
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
    //if playStatus.completeExe is not true, pause program when demanded. 
    if (!playStatus.completeExe) {
        //after the completion of an animation, check if program should be paused
        if (playStatus.noAnim || playStatus.oneCommand) {
            change_stepDescription('Prozessor angehalten');
            stepNumber_p.textContent = '0';
            playStatus.setPause();
            setButtonPressed();
        }
    }
};
//adds the next command to the runningProgram_array
var pushNextCommand = function () {
    for (var i = 0; i < mc8_commands_array.length; i++) {
        if (mc8_commands_array[i].machineCommand_dec === IR.value_dec)
            runningProgram.push(mc8_commands_array[i].animationFunction);
    }
    runningProgram.push(get_next_command);
    return;
};
//returns a register class, depending on the passed name
var getRegisterByName = function (register_string) {
    if (register_string === 'IO1')
        return IO1;
    else if (register_string === 'IO2')
        return IO2;
    else if (register_string === 'IO3')
        return IO3;
    else if (register_string === 'A')
        return A;
    else if (register_string === 'B')
        return B;
    else if (register_string === 'C')
        return C;
    else if (register_string === 'IR')
        return IR;
    else if (register_string === 'ALU1')
        return ALU1;
    else if (register_string === 'ALU2')
        return ALU2;
    else if (register_string === 'ALUOUT')
        return ALUOUT;
    else if (register_string === 'HL')
        return HL;
    else if (register_string === 'IX')
        return IX;
    else if (register_string === 'SP')
        return SP;
    else if (register_string === 'PC')
        return PC;
    else if (register_string === 'ZR')
        return ZR;
    else if (register_string === 'HL_lo')
        return HL;
    else if (register_string === 'HL_hi')
        return HL;
    else if (register_string === 'IX_lo')
        return IX;
    else if (register_string === 'IX_hi')
        return IX;
    else if (register_string === 'ZR_lo')
        return ZR;
    else if (register_string === 'ZR_hi')
        return ZR;
    else if (register_string === 'SP_lo')
        return SP;
    else if (register_string === 'SP_hi')
        return SP;
    else if (register_string === 'PC_lo')
        return PC;
    else if (register_string === 'PC_hi')
        return PC;
    else if (register_string === 'FLAGS')
        return FLAGS;
};
/********************************* instant changes/update changes *********************************/
//displays the description of the current Animation
var change_stepDescription = function (StringDescription) { return stepDescription_p.textContent = StringDescription; };
//increases the step number by 1
var increaseStepNumber = function () { return stepNumber_p.textContent = String(Number(stepNumber_p.textContent) + 1); };
//displays the the assembler notation. If the register IR contains a command which is not valid, the function returns false.
var change_assemblerCommand = function () {
    for (var i = 0; i < mc8_commands_array.length; i++) {
        if (mc8_commands_array[i].machineCommand_dec === IR.value_dec) {
            assemblerCommand_p.textContent = mc8_commands_array[i].assembler_notation_string;
            return true;
        }
    }
    assemblerCommand_p.textContent = 'Befehl unbekannt';
    return false;
};
/********************************************************* simple animations ************************************************************** */
/****************************************************************************************************************************************** */
//adds a yellow background to the passed DOM_Element
var add_yellow_background_for_IDLETIME = function (variable_DOM) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, checkPlayPressed()];
            case 1:
                _a.sent();
                if (!!playStatus.noAnim) return [3 /*break*/, 6];
                variable_DOM.classList.add('yellowBg');
                variable_DOM.style.color = '#222222';
                _a.label = 2;
            case 2:
                _a.trys.push([2, , 4, 5]);
                return [4 /*yield*/, sleepForIDLETIME()];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                variable_DOM.classList.remove('yellowBg');
                variable_DOM.style.color = '';
                return [7 /*endfinally*/];
            case 5: return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, sleepForNOANIMATIONIDLETIME()];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); };
//animation of all arrows
var addArrow = function (register_string) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, checkPlayPressed()];
            case 1:
                if (!(_a.sent())) {
                    return [2 /*return*/, false];
                }
                if (!!playStatus.noAnim) return [3 /*break*/, 60];
                if (!(register_string === 'PC')) return [3 /*break*/, 6];
                registerArrow_div.classList.add('PC_arrow');
                _a.label = 2;
            case 2:
                _a.trys.push([2, , 4, 5]);
                return [4 /*yield*/, sleepForIDLETIME()];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                registerArrow_div.classList.remove('PC_arrow');
                return [7 /*endfinally*/];
            case 5: return [3 /*break*/, 60];
            case 6:
                if (!(register_string === 'ZR')) return [3 /*break*/, 11];
                registerArrow_div.classList.add('ZR_arrow');
                _a.label = 7;
            case 7:
                _a.trys.push([7, , 9, 10]);
                return [4 /*yield*/, sleepForIDLETIME()];
            case 8:
                _a.sent();
                return [3 /*break*/, 10];
            case 9:
                registerArrow_div.classList.remove('ZR_arrow');
                return [7 /*endfinally*/];
            case 10: return [3 /*break*/, 60];
            case 11:
                if (!(register_string === 'HL')) return [3 /*break*/, 16];
                registerArrow_div.classList.add('HL_arrow');
                _a.label = 12;
            case 12:
                _a.trys.push([12, , 14, 15]);
                return [4 /*yield*/, sleepForIDLETIME()];
            case 13:
                _a.sent();
                return [3 /*break*/, 15];
            case 14:
                registerArrow_div.classList.remove('HL_arrow');
                return [7 /*endfinally*/];
            case 15: return [3 /*break*/, 60];
            case 16:
                if (!(register_string === 'IX')) return [3 /*break*/, 21];
                registerArrow_div.classList.add('IX_arrow');
                _a.label = 17;
            case 17:
                _a.trys.push([17, , 19, 20]);
                return [4 /*yield*/, sleepForIDLETIME()];
            case 18:
                _a.sent();
                return [3 /*break*/, 20];
            case 19:
                registerArrow_div.classList.remove('IX_arrow');
                return [7 /*endfinally*/];
            case 20: return [3 /*break*/, 60];
            case 21:
                if (!(register_string === 'SP')) return [3 /*break*/, 26];
                registerArrow_div.classList.add('SP_arrow');
                _a.label = 22;
            case 22:
                _a.trys.push([22, , 24, 25]);
                return [4 /*yield*/, sleepForIDLETIME()];
            case 23:
                _a.sent();
                return [3 /*break*/, 25];
            case 24:
                registerArrow_div.classList.remove('SP_arrow');
                return [7 /*endfinally*/];
            case 25: return [3 /*break*/, 60];
            case 26:
                if (!(register_string === 'IR')) return [3 /*break*/, 31];
                irArrow_div.classList.add('ir_arrow');
                _a.label = 27;
            case 27:
                _a.trys.push([27, , 29, 30]);
                return [4 /*yield*/, sleepForIDLETIME()];
            case 28:
                _a.sent();
                return [3 /*break*/, 30];
            case 29:
                irArrow_div.classList.remove('ir_arrow');
                return [7 /*endfinally*/];
            case 30: return [3 /*break*/, 60];
            case 31:
                if (!(register_string === 'FLAGS')) return [3 /*break*/, 36];
                movingFlagsArrow_div.classList.add('flags_arrow');
                _a.label = 32;
            case 32:
                _a.trys.push([32, , 34, 35]);
                return [4 /*yield*/, sleepForIDLETIME()];
            case 33:
                _a.sent();
                return [3 /*break*/, 35];
            case 34:
                movingFlagsArrow_div.classList.remove('flags_arrow');
                return [7 /*endfinally*/];
            case 35: return [3 /*break*/, 60];
            case 36:
                if (!(register_string === 'cFlag')) return [3 /*break*/, 41];
                cFlagArrow_div.classList.add('cFlag_arrow');
                FLAGS.c_DOM.classList.add('yellowBg', 'borderBox');
                _a.label = 37;
            case 37:
                _a.trys.push([37, , 39, 40]);
                return [4 /*yield*/, sleepForIDLETIME()];
            case 38:
                _a.sent();
                return [3 /*break*/, 40];
            case 39:
                cFlagArrow_div.classList.remove('cFlag_arrow');
                FLAGS.c_DOM.classList.remove('yellowBg', 'borderBox');
                return [7 /*endfinally*/];
            case 40: return [3 /*break*/, 60];
            case 41:
                if (!(register_string === 'jumpZ')) return [3 /*break*/, 46];
                checkJumpArrow_div.classList.add('jump_arrow');
                FLAGS.z_DOM.classList.add('yellowBg', 'borderBox');
                _a.label = 42;
            case 42:
                _a.trys.push([42, , 44, 45]);
                return [4 /*yield*/, sleepForIDLETIME()];
            case 43:
                _a.sent();
                return [3 /*break*/, 45];
            case 44:
                checkJumpArrow_div.classList.remove('jump_arrow');
                FLAGS.z_DOM.classList.remove('yellowBg', 'borderBox');
                return [7 /*endfinally*/];
            case 45: return [3 /*break*/, 60];
            case 46:
                if (!(register_string === 'jumpC')) return [3 /*break*/, 51];
                checkJumpArrow_div.classList.add('jump_arrow');
                FLAGS.c_DOM.classList.add('yellowBg', 'borderBox');
                _a.label = 47;
            case 47:
                _a.trys.push([47, , 49, 50]);
                return [4 /*yield*/, sleepForIDLETIME()];
            case 48:
                _a.sent();
                return [3 /*break*/, 50];
            case 49:
                checkJumpArrow_div.classList.remove('jump_arrow');
                FLAGS.c_DOM.classList.remove('yellowBg', 'borderBox');
                return [7 /*endfinally*/];
            case 50: return [3 /*break*/, 60];
            case 51:
                if (!(register_string === 'jumpS')) return [3 /*break*/, 56];
                checkJumpArrow_div.classList.add('jump_arrow');
                FLAGS.s_DOM.classList.add('yellowBg', 'borderBox');
                _a.label = 52;
            case 52:
                _a.trys.push([52, , 54, 55]);
                return [4 /*yield*/, sleepForIDLETIME()];
            case 53:
                _a.sent();
                return [3 /*break*/, 55];
            case 54:
                checkJumpArrow_div.classList.remove('jump_arrow');
                FLAGS.s_DOM.classList.remove('yellowBg', 'borderBox');
                return [7 /*endfinally*/];
            case 55: return [3 /*break*/, 60];
            case 56:
                if (!(register_string === 'jumpP')) return [3 /*break*/, 60];
                checkJumpArrow_div.classList.add('jump_arrow');
                FLAGS.p_DOM.classList.add('yellowBg', 'borderBox');
                _a.label = 57;
            case 57:
                _a.trys.push([57, , 59, 60]);
                return [4 /*yield*/, sleepForIDLETIME()];
            case 58:
                _a.sent();
                return [3 /*break*/, 60];
            case 59:
                checkJumpArrow_div.classList.remove('jump_arrow');
                FLAGS.p_DOM.classList.remove('yellowBg', 'borderBox');
                return [7 /*endfinally*/];
            case 60: return [2 /*return*/, true];
        }
    });
}); };
//animation of updating the description
var description_update = function (description_string) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, checkPlayPressed()];
            case 1:
                _a.sent();
                change_stepDescription(description_string);
                increaseStepNumber();
                return [4 /*yield*/, add_yellow_background_for_IDLETIME(stepNumberBackground)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
//animates the update of the assembler command, if the command is unknown the function throws an error and the execution gets terminated
var assemblerCommand_update = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, checkPlayPressed()];
            case 1:
                _a.sent();
                return [4 /*yield*/, add_yellow_background_for_IDLETIME(IR.domElement)];
            case 2:
                _a.sent();
                return [4 /*yield*/, addArrow('IR')];
            case 3:
                _a.sent();
                if (!change_assemblerCommand()) {
                    throw Error('Unknown command');
                }
                if (!!playStatus.noAnim) return [3 /*break*/, 5];
                return [4 /*yield*/, sleepForIDLETIME()];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };
//increases PC by one and animates it
var updatePC = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, checkPlayPressed()];
            case 1:
                _a.sent();
                PC.update(PC.value_dec + 1);
                return [4 /*yield*/, add_yellow_background_for_IDLETIME(PC.domElement)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
//updates and animates register/io with the passed value
var updateRegister_hex = function (registerName_string, value_dec) { return __awaiter(_this, void 0, void 0, function () {
    var reg;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, checkPlayPressed()];
            case 1:
                _a.sent();
                if (!registerName_string.includes('hi')) return [3 /*break*/, 3];
                return [4 /*yield*/, updateRegister_hex4_hi(getRegisterByName(registerName_string), value_dec)];
            case 2:
                _a.sent();
                return [3 /*break*/, 7];
            case 3:
                if (!registerName_string.includes('lo')) return [3 /*break*/, 5];
                return [4 /*yield*/, updateRegister_hex4_lo(getRegisterByName(registerName_string), value_dec)];
            case 4:
                _a.sent();
                return [3 /*break*/, 7];
            case 5:
                reg = getRegisterByName(registerName_string);
                reg.update(value_dec);
                //animate register update
                return [4 /*yield*/, add_yellow_background_for_IDLETIME(reg.domElement)];
            case 6:
                //animate register update
                _a.sent();
                _a.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); };
var updateRegister_hex4_hi = function (register_class, hex2_dec) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, checkPlayPressed()];
            case 1:
                _a.sent();
                //update register
                register_class.update_hi(hex2_dec);
                if (!!playStatus.noAnim) return [3 /*break*/, 5];
                yellowBgElement_div.style.top = register_class.domElement.offsetTop + 'px';
                yellowBgElement_div.style.left = String(100 / 46 * 14) + '%';
                yellowBgElement_div.classList.add('toggleGrid');
                _a.label = 2;
            case 2:
                _a.trys.push([2, , 4, 5]);
                return [4 /*yield*/, sleepForIDLETIME()];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                yellowBgElement_div.classList.remove('toggleGrid');
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
var updateRegister_hex4_lo = function (register_class, hex2_dec) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, checkPlayPressed()];
            case 1:
                _a.sent();
                //update register
                register_class.update_lo(hex2_dec);
                if (!!playStatus.noAnim) return [3 /*break*/, 5];
                yellowBgElement_div.style.top = register_class.domElement.offsetTop + 'px';
                yellowBgElement_div.style.left = String(100 / 46 * 16) + '%';
                yellowBgElement_div.classList.add('toggleGrid');
                _a.label = 2;
            case 2:
                _a.trys.push([2, , 4, 5]);
                return [4 /*yield*/, sleepForIDLETIME()];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                yellowBgElement_div.classList.remove('toggleGrid');
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
/******************************************************** complex animations ************************************************************** */
/****************************************************************************************************************************************** */
/************************************Moving Animations**************************************/
//calculates the coordinates between the fixPoints.
//At Speed 1, the movingObject updates every single coordinate
//At Speed 2, the movingObject updates every second coordinate...
//max Speed = 12 (update only fixPoints)
var calcIntermediatePositions = function (path, interPointsQuantity) {
    if (interPointsQuantity === void 0) { interPointsQuantity = 12; }
    var xPositions = [];
    var yPositions = [];
    var bufferX = [];
    var bufferY = [];
    var posDiff = 0;
    var reciprocal = 1 / interPointsQuantity;
    //iterate through path
    for (var j = 0; j < path.length - 1; j++) {
        //If path position is different to the next path position, calculate position difference
        //and add intermediate Points, depending on the position difference and direction.
        if (path[j].y !== path[j + 1].y) {
            posDiff = Math.abs((path[j + 1].y - path[j].y));
            for (var i = 0; i < interPointsQuantity * posDiff; i++) {
                if ((path[j + 1].y > path[j].y))
                    yPositions.push(path[j].y + reciprocal * (i + 1));
                else
                    yPositions.push(path[j].y - reciprocal * (i + 1));
                xPositions.push(path[j].x);
            }
        }
        if (path[j].x !== path[j + 1].x) {
            posDiff = Math.abs((path[j + 1].x - path[j].x));
            for (var i = 0; i < interPointsQuantity * posDiff; i++) {
                if ((path[j + 1].x > path[j].x))
                    xPositions.push(path[j].x + reciprocal * (i + 1));
                else
                    xPositions.push(path[j].x - reciprocal * (i + 1));
                yPositions.push(path[j].y);
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
//updates the position of the passed DOM_Object
var updatePosition = function (movingObject, x, y) {
    movingObject.style.top = String(100 / 32 * y) + "%";
    movingObject.style.left = String(100 / 46 * x) + "%";
};
//moves the movingObject to the starting position.
//updates the textContent, toggles visibility and adjusts the size
var updateMovingObj = function (aPath, hexValue_string) {
    updatePosition(movingObject, aPath[0].x, aPath[0].y);
    movingObject.textContent = hexValue_string;
    movingObject.classList.add('toggleGrid');
    if (aPath[0].label === 'PC' || aPath[0].label === 'ZR' || aPath[0].label === 'IX' || aPath[0].label === 'HL' || aPath[0].label === 'SP')
        movingObject.classList.add('rectangle4x2');
    else {
        try {
            movingObject.classList.remove('rectangle4x2');
        }
        catch (_a) { }
    }
    return movingObject;
};
var createGreyElement = function (i, xCoordinate, yCoordinate) {
    var ele = document.createElement('div');
    ele.style.position = 'absolute';
    ele.style.left = String(100 / 46 * (xCoordinate[i] + 0.5)) + '%';
    ele.style.top = String(100 / 32 * (yCoordinate[i] + 0.5)) + '%';
    ele.style.height = String(100 / 32 * 1) + '%';
    ele.style.width = String(100 / 46 * 1) + '%';
    ele.classList.add('pathElement', 'alignBg', 'rounded');
    return ele;
};
//animation without a movingObject
var createPaintedPath = function (path, fixPointLabel_A_string, fixPointLabel_B_string, startElement_DOM) { return __awaiter(_this, void 0, void 0, function () {
    var pathElements, coords, xCoordinate, yCoordinate, i, i, ele, reg, i, e_1, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pathElements = [];
                coords = calcIntermediatePositions(path, 2);
                xCoordinate = coords[0].flat(2);
                yCoordinate = coords[1].flat(2);
                //fixPoints of PC,ZR,... are too far to the left due to the size of 4x2 --> Painted path has to be moved right by 1
                if (fixPointLabel_A_string === 'PC' || fixPointLabel_A_string === 'ZR' || fixPointLabel_A_string === 'HL' || fixPointLabel_A_string === 'SP' || fixPointLabel_A_string === 'IX') {
                    for (i = 0; i < xCoordinate.length; i++) {
                        xCoordinate[i] += 1;
                    }
                    if (fixPointLabel_B_string === 'ROM2') {
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
                    ele = createGreyElement(i, xCoordinate, yCoordinate);
                    pathElements.push(ele);
                }
                reg = document.createElement('h2');
                reg.style.left = String(100 / 46 * (xCoordinate[xCoordinate.length - 1])) + '%';
                reg.style.top = String(100 / 32 * (yCoordinate[xCoordinate.length - 1])) + '%';
                reg.textContent = startElement_DOM.textContent;
                reg.classList.add('yellowBg', 'borderBox', 'square2x2', 'positionAbsolute', 'centered', 'rounded');
                if (fixPointLabel_A_string === 'PC' || fixPointLabel_A_string === 'ZR' || fixPointLabel_A_string === 'HL' || fixPointLabel_A_string === 'SP' || fixPointLabel_A_string === 'IX')
                    reg.classList.add('rectangle4x2');
                pathElements.push(reg);
                //add Elements to grid
                for (i = 0; i < pathElements.length; i++) {
                    mc8Container.appendChild(pathElements[i]);
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4 /*yield*/, sleep(2000 / ANIMATION_SPEED)];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3:
                e_1 = _a.sent();
                throw Error('Stop pressed');
            case 4:
                //remove 
                for (i = 0; i < pathElements.length; i++) {
                    pathElements[i].remove();
                }
                startElement_DOM.classList.remove('toggleGrid');
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
//animates the movement from on fixPoint to another one
var transfer = function (fixPointLabel_A_string, fixPointLabel_B_string, value_dec) {
    if (value_dec === void 0) { value_dec = 0; }
    return __awaiter(_this, void 0, void 0, function () {
        var startPointInCPU, endPointInCPU, path, value_string, movingObjectCoordinates, xCoordinate, yCoordinate, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, checkPlayPressed()];
                case 1:
                    _a.sent();
                    startPointInCPU = false;
                    endPointInCPU = false;
                    if (!!playStatus.noAnim) return [3 /*break*/, 8];
                    path = getPointsAtoB(fixPointLabel_A_string, fixPointLabel_B_string);
                    value_string = void 0;
                    //convert value_dec to hex_4digits if required
                    if (value_dec > 255 || fixPointLabel_B_string === 'ROM2' || fixPointLabel_B_string === 'RAM2' || fixPointLabel_B_string === 'ZR' || fixPointLabel_B_string === 'PC' || fixPointLabel_B_string === 'IX' || fixPointLabel_B_string === 'HL' || fixPointLabel_B_string === 'SP')
                        value_string = convertNumberToHex_4digits(value_dec);
                    else
                        value_string = convertNumberToHex_2digits(value_dec);
                    //update the moving Element
                    updateMovingObj(path, value_string);
                    movingObjectCoordinates = calcIntermediatePositions(path, 12);
                    xCoordinate = movingObjectCoordinates[0];
                    yCoordinate = movingObjectCoordinates[1];
                    //check if starting point is inside CPU
                    if (yCoordinate[0][0] < 24 && yCoordinate[0][0] > 3 && xCoordinate[0][0] > 9 && xCoordinate[0][0]) {
                        startPointInCPU = true;
                    }
                    if (yCoordinate[yCoordinate.length - 1][11] < 24 && yCoordinate[yCoordinate.length - 1][11] > 3 && xCoordinate[xCoordinate.length - 1][11] > 9 && xCoordinate[xCoordinate.length - 1][11]) {
                        endPointInCPU = true;
                    }
                    if (!playStatus.rocketSpeed) return [3 /*break*/, 3];
                    if (!startPointInCPU || !endPointInCPU)
                        DECODER.updateDOM();
                    return [4 /*yield*/, createPaintedPath(path, fixPointLabel_A_string, fixPointLabel_B_string, movingObject)];
                case 2:
                    _a.sent();
                    if (!DECODER.ramAccess && !DECODER.ioAccess) {
                        DECODER.resetDOM();
                    }
                    return [3 /*break*/, 7];
                case 3:
                    i = 0;
                    _a.label = 4;
                case 4:
                    if (!(i < movingObjectCoordinates[0].length)) return [3 /*break*/, 7];
                    //if singleStep is pressed during the animation, remove movingObject and jump out of function
                    if (playStatus.noAnim) {
                        movingObject.classList.remove('toggleGrid');
                        return [2 /*return*/, true];
                    }
                    //display decoder
                    if (startPointInCPU && (yCoordinate[i][0] > 23 || yCoordinate[i][0] < 3)) {
                        startPointInCPU = false;
                        DECODER.updateDOM();
                    }
                    if (!startPointInCPU && (yCoordinate[i][0] < 23 && yCoordinate[i][0] > 3)) {
                        startPointInCPU = true;
                        if (!DECODER.ramAccess && !DECODER.ioAccess)
                            DECODER.resetDOM();
                    }
                    //update position of the movingObject depending on the speed
                    return [4 /*yield*/, conditionalPositionUpdate(xCoordinate[i], yCoordinate[i], ANIMATION_SPEED, movingObject)];
                case 5:
                    //update position of the movingObject depending on the speed
                    _a.sent();
                    _a.label = 6;
                case 6:
                    i++;
                    return [3 /*break*/, 4];
                case 7:
                    //remove Element when transfer was successful 
                    movingObject.classList.remove('toggleGrid');
                    return [3 /*break*/, 10];
                case 8:
                    if (!startPointInCPU || !endPointInCPU)
                        DECODER.updateDOM();
                    return [4 /*yield*/, sleepForNOANIMATIONIDLETIME()];
                case 9:
                    _a.sent();
                    DECODER.resetDOM();
                    _a.label = 10;
                case 10: return [2 /*return*/];
            }
        });
    });
};
//updates the position of the movingObject depending on the speed(values: 1,2,3,4,6,12) => 12/values is always an integer
//e.g.  if the speed is 12 the position is only updated once(last coordinate of x12array)
//      if the speed is 3 the position is updated with every third coordinate,... 
var conditionalPositionUpdate = function (xCoordinate_x12array, yCoordinate_x12array, speed_dec, movingObject_DOM) { return __awaiter(_this, void 0, void 0, function () {
    var j, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                j = 0;
                _a.label = 1;
            case 1:
                if (!(j < xCoordinate_x12array.length / speed_dec)) return [3 /*break*/, 6];
                updatePosition(movingObject_DOM, xCoordinate_x12array[j * speed_dec], yCoordinate_x12array[j * speed_dec]);
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, sleep(1000 / FRAMES)];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                e_2 = _a.sent();
                //remove movingObject if 
                movingObject_DOM.classList.remove('toggleGrid');
                throw Error('Stop pressed');
            case 5:
                j++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/, true];
        }
    });
}); };
/************************************ALU animation**************************************/
//set text content of movingAluElements and display them
var setMovingAluElements = function (twoMovingAluElements_boolean) {
    movingAlu1.textContent = ALU1.domElement.textContent;
    movingAlu2.textContent = ALU2.domElement.textContent;
    movingAlu1.classList.add('toggleGrid');
    if (twoMovingAluElements_boolean)
        movingAlu2.classList.add('toggleGrid');
};
//reset position of movingAluElements
var resetMovingAluElements = function () {
    try {
        movingAlu1.classList.remove('toggleGrid');
        movingAlu2.classList.remove('toggleGrid');
    }
    catch (e) { }
    movingAlu1.style.top = String(100 / 32 * 6) + "%";
    movingAlu1.style.left = String(100 / 46 * 24) + "%";
    movingAlu2.style.top = String(100 / 32 * 6) + "%";
    movingAlu2.style.left = String(100 / 46 * 30) + "%";
};
resetMovingAluElements();
//animation of ALU-usage
var aluAnimation = function (aluOUT_dec, twoMovingAluElements_boolean, cFlag_boolean, saveToRegister_string) { return __awaiter(_this, void 0, void 0, function () {
    var xCoordinateAlu1, xCoordinateAlu2, yCoordinate, j, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!playStatus.noAnim) return [3 /*break*/, 11];
                xCoordinateAlu1 = [24];
                xCoordinateAlu2 = [30];
                yCoordinate = [6];
                for (j = 0; j < 30; j++) {
                    xCoordinateAlu1.push(xCoordinateAlu1[j] + 0.1);
                    xCoordinateAlu2.push(xCoordinateAlu2[j] - 0.1);
                    yCoordinate.push(yCoordinate[j] + 1 / 7.5);
                }
                setMovingAluElements(twoMovingAluElements_boolean);
                ALU1.domElement.textContent = '';
                ALU2.domElement.textContent = '';
                if (!cFlag_boolean) return [3 /*break*/, 2];
                return [4 /*yield*/, addArrow('cFlag')];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, , 9, 10]);
                return [4 /*yield*/, sleepForIDLETIME()];
            case 3:
                _a.sent();
                i = 0;
                _a.label = 4;
            case 4:
                if (!(i < xCoordinateAlu1.length)) return [3 /*break*/, 7];
                updatePosition(movingAlu1, xCoordinateAlu1[i], yCoordinate[i]);
                updatePosition(movingAlu2, xCoordinateAlu2[i], yCoordinate[i]);
                return [4 /*yield*/, sleep(1000 / FRAMES)];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                i++;
                return [3 /*break*/, 4];
            case 7:
                resetMovingAluElements();
                return [4 /*yield*/, updateRegister_hex('ALUOUT', aluOUT_dec)];
            case 8:
                _a.sent();
                return [3 /*break*/, 10];
            case 9:
                resetMovingAluElements();
                return [7 /*endfinally*/];
            case 10:
                ALUOUT.domElement.classList.add('yellowBg');
                return [3 /*break*/, 13];
            case 11: //noAnim
            return [4 /*yield*/, updateRegister_hex('ALUOUT', aluOUT_dec)];
            case 12:
                _a.sent();
                ALU1.domElement.textContent = '';
                ALU2.domElement.textContent = '';
                _a.label = 13;
            case 13:
                _a.trys.push([13, , 18, 19]);
                return [4 /*yield*/, description_update('Setze die Flags')];
            case 14:
                _a.sent();
                return [4 /*yield*/, setFlagsAnimation()];
            case 15:
                _a.sent();
                if (!saveToRegister_string) return [3 /*break*/, 17];
                return [4 /*yield*/, description_update('Speichere das Ergebnis')];
            case 16:
                _a.sent();
                _a.label = 17;
            case 17: return [3 /*break*/, 19];
            case 18:
                ALUOUT.domElement.classList.remove('yellowBg');
                ALUOUT.domElement.textContent = '';
                return [7 /*endfinally*/];
            case 19:
                if (!(saveToRegister_string !== '')) return [3 /*break*/, 22];
                return [4 /*yield*/, transfer('ALUOUT', saveToRegister_string, aluOUT_dec)];
            case 20:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex(saveToRegister_string, aluOUT_dec)];
            case 21:
                _a.sent();
                _a.label = 22;
            case 22: return [2 /*return*/];
        }
    });
}); };
var hlBcAnimation = function (aluOUT_dec, stepOne_boolean) { return __awaiter(_this, void 0, void 0, function () {
    var xCoordinateAlu1, xCoordinateAlu2, yCoordinate, j, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!playStatus.noAnim) return [3 /*break*/, 11];
                xCoordinateAlu1 = [24];
                xCoordinateAlu2 = [30];
                yCoordinate = [6];
                for (j = 0; j < 30; j++) {
                    xCoordinateAlu1.push(xCoordinateAlu1[j] + 0.1);
                    xCoordinateAlu2.push(xCoordinateAlu2[j] - 0.1);
                    yCoordinate.push(yCoordinate[j] + 1 / 7.5);
                }
                setMovingAluElements(true);
                ALU1.domElement.textContent = '';
                ALU2.domElement.textContent = '';
                if (!!stepOne_boolean) return [3 /*break*/, 2];
                return [4 /*yield*/, addArrow('cFlag')];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, , 9, 10]);
                return [4 /*yield*/, sleepForIDLETIME()];
            case 3:
                _a.sent();
                i = 0;
                _a.label = 4;
            case 4:
                if (!(i < xCoordinateAlu1.length)) return [3 /*break*/, 7];
                updatePosition(movingAlu1, xCoordinateAlu1[i], yCoordinate[i]);
                updatePosition(movingAlu2, xCoordinateAlu2[i], yCoordinate[i]);
                return [4 /*yield*/, sleep(1000 / FRAMES)];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                i++;
                return [3 /*break*/, 4];
            case 7:
                resetMovingAluElements();
                return [4 /*yield*/, updateRegister_hex('ALUOUT', aluOUT_dec)];
            case 8:
                _a.sent();
                return [3 /*break*/, 10];
            case 9:
                resetMovingAluElements();
                return [7 /*endfinally*/];
            case 10:
                ALUOUT.domElement.classList.add('yellowBg');
                return [3 /*break*/, 13];
            case 11: //noAnim
            return [4 /*yield*/, updateRegister_hex('ALUOUT', aluOUT_dec)];
            case 12:
                _a.sent();
                ALU1.domElement.textContent = '';
                ALU2.domElement.textContent = '';
                _a.label = 13;
            case 13:
                if (!stepOne_boolean) return [3 /*break*/, 22];
                _a.label = 14;
            case 14:
                _a.trys.push([14, , 18, 19]);
                return [4 /*yield*/, description_update('Setze Carry-Flag')];
            case 15:
                _a.sent();
                FLAGS.z_dec = '-';
                FLAGS.s_dec = '-';
                FLAGS.p_dec = '-';
                return [4 /*yield*/, setFlagsAnimation()];
            case 16:
                _a.sent();
                return [4 /*yield*/, description_update('Speichere das Ergebnis in L')];
            case 17:
                _a.sent();
                return [3 /*break*/, 19];
            case 18:
                ALUOUT.domElement.classList.remove('yellowBg');
                ALUOUT.domElement.textContent = '';
                return [7 /*endfinally*/];
            case 19: return [4 /*yield*/, transfer('ALUOUT', 'HL_lo', aluOUT_dec)];
            case 20:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('HL_lo', aluOUT_dec)];
            case 21:
                _a.sent();
                return [3 /*break*/, 30];
            case 22:
                _a.trys.push([22, , 26, 27]);
                return [4 /*yield*/, description_update('Setze Carry-Flag')];
            case 23:
                _a.sent();
                FLAGS.z_dec = '-';
                FLAGS.s_dec = '-';
                FLAGS.p_dec = '-';
                return [4 /*yield*/, setFlagsAnimation()];
            case 24:
                _a.sent();
                return [4 /*yield*/, description_update('Speichere das Ergebnis in H')];
            case 25:
                _a.sent();
                return [3 /*break*/, 27];
            case 26:
                ALUOUT.domElement.classList.remove('yellowBg');
                ALUOUT.domElement.textContent = '';
                return [7 /*endfinally*/];
            case 27: return [4 /*yield*/, transfer('ALUOUT', 'HL_hi', aluOUT_dec)];
            case 28:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('HL_hi', aluOUT_dec)];
            case 29:
                _a.sent();
                _a.label = 30;
            case 30: return [2 /*return*/];
        }
    });
}); };
//animation of setting flags
var setFlagsAnimation = function () { return __awaiter(_this, void 0, void 0, function () {
    var i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!playStatus.noAnim) return [3 /*break*/, 10];
                return [4 /*yield*/, addArrow('FLAGS')];
            case 1:
                _a.sent();
                movingFlags_div.children[0].textContent = FLAGS.c_dec;
                movingFlags_div.children[1].textContent = FLAGS.z_dec;
                movingFlags_div.children[2].textContent = FLAGS.p_dec;
                movingFlags_div.children[3].textContent = FLAGS.s_dec;
                movingFlags_div.classList.add('toggleGrid');
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
                movingFlags_div.style.top = String(100 / 32 * (8 - i / 20)) + '%';
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
                movingFlags_div.classList.remove('toggleGrid');
                movingFlags_div.style.top = String(100 / 32 * 8) + '%';
                return [7 /*endfinally*/];
            case 10:
                FLAGS.updateDOM();
                return [2 /*return*/];
        }
    });
}); };
var checkJumpAnimation = function (flag_string) { return __awaiter(_this, void 0, void 0, function () {
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
            case 1: return [4 /*yield*/, addArrow('jumpZ')];
            case 2:
                _b.sent();
                return [3 /*break*/, 10];
            case 3: return [4 /*yield*/, addArrow('jumpC')];
            case 4:
                _b.sent();
                return [3 /*break*/, 10];
            case 5: return [4 /*yield*/, addArrow('jumpS')];
            case 6:
                _b.sent();
                return [3 /*break*/, 10];
            case 7: return [4 /*yield*/, addArrow('jumpP')];
            case 8:
                _b.sent();
                return [3 /*break*/, 10];
            case 9: return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
var checkCorrectInput = function (input_string) {
    if (checkValidHex(input_string)) {
        if (input_string.length > 2) {
            return false;
        }
        return true;
    }
    return false;
};
//animation of IO-input
var changeIO = function (IOName_string) { return __awaiter(_this, void 0, void 0, function () {
    var IO_input_window_DOM, IO_input_DOM, check, playStatusBuffer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                check = true;
                playStatusBuffer = playStatus.getStatus();
                switch (IOName_string) {
                    case 'IO1':
                        IO_input_window_DOM = io1InputWindow_div;
                        IO_input_DOM = io1Input_input;
                        break;
                    case 'IO2':
                        IO_input_window_DOM = io2InputWindow_div;
                        IO_input_DOM = io2Input_input;
                        break;
                    case 'IO3':
                        IO_input_window_DOM = io3InputWindow_div;
                        IO_input_DOM = io3Input_input;
                        break;
                    default:
                        throw Error('Unknown IO');
                }
                IO_input_window_DOM.classList.add('toggleGrid');
                IO_input_DOM.focus();
                IO_input_DOM.select();
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
                if (IO_input_DOM.value === '')
                    IO_input_DOM.value = 'FF';
                if (checkCorrectInput(IO_input_DOM.value)) {
                    check = false;
                }
                else {
                    if (IOName_string === 'IO1') {
                        document.getElementById('io1InputInfo_p').textContent = 'Das ist keine gültige zweistellige Hex-Zahl. Verwenden Sie nur die Zahlen  0-9 und die Zeichen A-F!';
                    }
                    else if (IOName_string === 'IO2') {
                        document.getElementById('io2InputInfo_p').textContent = 'Das ist keine gültige zweistellige Hex-Zahl. Verwenden Sie nur die Zahlen  0-9 und die Zeichen A-F!';
                    }
                    else if (IOName_string === 'IO3') {
                        document.getElementById('io3InputInfo_p').textContent = 'Das ist keine gültige zweistellige Hex-Zahl. Verwenden Sie nur die Zahlen  0-9 und die Zeichen A-F!';
                    }
                }
                return [3 /*break*/, 2];
            case 4: return [3 /*break*/, 6];
            case 5:
                IO_input_window_DOM.classList.remove('toggleGrid');
                document.getElementById('io1InputInfo_p').textContent = 'Geben Sie eine zweistellige Hexadezimalzahl ein!';
                document.getElementById('io2InputInfo_p').textContent = 'Geben Sie eine zweistellige Hexadezimalzahl ein!';
                document.getElementById('io3InputInfo_p').textContent = 'Geben Sie eine zweistellige Hexadezimalzahl ein!';
                return [7 /*endfinally*/];
            case 6:
                if (playStatusBuffer === 'completeExe')
                    runCompleteExecution();
                else if (playStatusBuffer === 'rocketSpeed')
                    rocketSpeed_on();
                else if (playStatusBuffer === 'noAnim')
                    runNextSingleStep();
                return [4 /*yield*/, updateRegister_hex(IOName_string, convertHexToNumber(IO_input_DOM.value))];
            case 7:
                _a.sent();
                IO_input_DOM.value = '';
                return [2 /*return*/];
        }
    });
}); };
//reads a byte from the ROM or RAM. The addressRegister 
var readFromMemoryInRegister = function (addressRegister_x4_string, targetRegister_x2_string) { return __awaiter(_this, void 0, void 0, function () {
    var address_dec;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                address_dec = getRegisterByName(addressRegister_x4_string).value_dec;
                //update decoder without displaying  
                DECODER.update(1, 0, 0, 1, address_dec);
                return [4 /*yield*/, addArrow(addressRegister_x4_string)];
            case 1:
                _a.sent();
                if (!(address_dec < 8192)) return [3 /*break*/, 5];
                return [4 /*yield*/, transfer(addressRegister_x4_string, 'ROM2', address_dec)];
            case 2:
                _a.sent();
                return [4 /*yield*/, transfer(ROM.getElementId(address_dec), targetRegister_x2_string, ROM.getValue(address_dec))];
            case 3:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex(targetRegister_x2_string, ROM.getValue(address_dec))];
            case 4:
                _a.sent();
                return [3 /*break*/, 27];
            case 5:
                if (!(address_dec >= RAM.startAddressRam_dec && address_dec < RAM.startAddressRam_dec + RAM.size_dec)) return [3 /*break*/, 9];
                RAM.updateVariableElements(address_dec);
                return [4 /*yield*/, transfer(addressRegister_x4_string, 'RAM2', address_dec)];
            case 6:
                _a.sent();
                return [4 /*yield*/, transfer(RAM.getRamElementId(address_dec), targetRegister_x2_string, RAM.getValue(address_dec))];
            case 7:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex(targetRegister_x2_string, RAM.getValue(address_dec))];
            case 8:
                _a.sent();
                return [3 /*break*/, 27];
            case 9:
                if (!!IO1.ioMapped_boolean) return [3 /*break*/, 25];
                if (!(address_dec === IO1.address_dec)) return [3 /*break*/, 14];
                return [4 /*yield*/, transfer(addressRegister_x4_string, 'DEC_UPDATE', address_dec)];
            case 10:
                _a.sent();
                return [4 /*yield*/, changeIO('IO1')];
            case 11:
                _a.sent();
                return [4 /*yield*/, transfer('IO1', 'A', IO1.value_dec)];
            case 12:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('A', IO1.value_dec)];
            case 13:
                _a.sent();
                return [3 /*break*/, 24];
            case 14:
                if (!(address_dec === IO2.address_dec)) return [3 /*break*/, 19];
                return [4 /*yield*/, transfer(addressRegister_x4_string, 'DEC_UPDATE', address_dec)];
            case 15:
                _a.sent();
                return [4 /*yield*/, changeIO('IO2')];
            case 16:
                _a.sent();
                return [4 /*yield*/, transfer('IO2', 'A', IO2.value_dec)];
            case 17:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('A', IO2.value_dec)];
            case 18:
                _a.sent();
                return [3 /*break*/, 24];
            case 19:
                if (!(address_dec === IO3.address_dec)) return [3 /*break*/, 24];
                return [4 /*yield*/, transfer(addressRegister_x4_string, 'DEC_UPDATE', address_dec)];
            case 20:
                _a.sent();
                return [4 /*yield*/, changeIO('IO2')];
            case 21:
                _a.sent();
                return [4 /*yield*/, transfer('IO2', 'A', IO3.value_dec)];
            case 22:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('A', IO3.value_dec)];
            case 23:
                _a.sent();
                _a.label = 24;
            case 24: return [3 /*break*/, 27];
            case 25: 
            //The address of the addressRegister is unknown.
            //the following code wont be executed completely, because the decoder will interrupt execution
            return [4 /*yield*/, transfer(addressRegister_x4_string, 'RAM2', address_dec)];
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
var writeToMemoryFromRegister = function (addressRegister_x4_string, DataRegister_x2_string) { return __awaiter(_this, void 0, void 0, function () {
    var address_dec, register_x2_class, data_dec, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                address_dec = getRegisterByName(addressRegister_x4_string).value_dec;
                register_x2_class = getRegisterByName(DataRegister_x2_string);
                data_dec = register_x2_class.value_dec;
                if (DataRegister_x2_string.includes('hi'))
                    data_dec = register_x2_class.hi_dec;
                if (DataRegister_x2_string.includes('lo'))
                    data_dec = register_x2_class.lo_dec;
                //update decoder, without displaying it
                DECODER.update(0, 1, 0, 1, address_dec);
                return [4 /*yield*/, addArrow(addressRegister_x4_string)];
            case 1:
                _a.sent();
                if (!(address_dec < 8192)) return [3 /*break*/, 3];
                //wont be executed completely, because the decoder will interrupt execution 
                return [4 /*yield*/, transfer(addressRegister_x4_string, 'ROM2', address_dec)];
            case 2:
                //wont be executed completely, because the decoder will interrupt execution 
                _a.sent();
                return [3 /*break*/, 11];
            case 3:
                if (!(address_dec >= RAM.startAddressRam_dec && address_dec < RAM.startAddressRam_dec + RAM.size_dec)) return [3 /*break*/, 9];
                RAM.updateVariableElements(address_dec);
                return [4 /*yield*/, transfer(addressRegister_x4_string, 'RAM2', address_dec)];
            case 4:
                _a.sent();
                if (!playStatus.noAnim)
                    document.getElementById(RAM.getRamElementId(address_dec)).classList.add('yellowBg', 'borderBox');
                _a.label = 5;
            case 5:
                _a.trys.push([5, 7, , 8]);
                return [4 /*yield*/, transfer(DataRegister_x2_string, RAM.getRamElementId(address_dec), data_dec)];
            case 6:
                _a.sent();
                return [3 /*break*/, 8];
            case 7:
                e_3 = _a.sent();
                document.getElementById(RAM.getRamElementId(address_dec)).classList.remove('yellowBg', 'borderBox');
                throw e_3;
            case 8: return [3 /*break*/, 11];
            case 9: 
            //wont be executed completely, because the decoder will interrupt execution 
            return [4 /*yield*/, transfer(addressRegister_x4_string, 'RAM2', address_dec)];
            case 10:
                //wont be executed completely, because the decoder will interrupt execution 
                _a.sent();
                _a.label = 11;
            case 11:
                RAM.update(address_dec, data_dec);
                _a.label = 12;
            case 12:
                _a.trys.push([12, , 14, 15]);
                return [4 /*yield*/, add_yellow_background_for_IDLETIME(document.getElementById(RAM.getRamElementId(address_dec)))];
            case 13:
                _a.sent();
                return [3 /*break*/, 15];
            case 14:
                document.getElementById(RAM.getRamElementId(address_dec)).classList.remove('borderBox', 'yellowBg');
                DECODER.resetDOM();
                return [7 /*endfinally*/];
            case 15: return [2 /*return*/];
        }
    });
}); };
var readFromIo = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!IO1.ioMapped_boolean) return [3 /*break*/, 35];
                DECODER.update(1, 0, 1, 0, ZR.lo_dec);
                return [4 /*yield*/, transfer('ZR', 'DEC_UPDATE', ZR.lo_dec)];
            case 1:
                _a.sent();
                if (!(IO1.address_dec === IO2.address_dec)) return [3 /*break*/, 8];
                if (!!IO1.in_boolean) return [3 /*break*/, 4];
                return [4 /*yield*/, transfer('A', 'IO2', A.value_dec)];
            case 2:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('IO2', A.value_dec)];
            case 3:
                _a.sent();
                return [3 /*break*/, 7];
            case 4: return [4 /*yield*/, transfer('A', 'IO1', A.value_dec)];
            case 5:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('IO1', A.value_dec)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [3 /*break*/, 34];
            case 8:
                if (!(IO3.address_dec === IO2.address_dec)) return [3 /*break*/, 15];
                if (!!IO3.in_boolean) return [3 /*break*/, 11];
                return [4 /*yield*/, transfer('A', 'IO2', A.value_dec)];
            case 9:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('IO2', A.value_dec)];
            case 10:
                _a.sent();
                return [3 /*break*/, 14];
            case 11: return [4 /*yield*/, transfer('A', 'IO3', A.value_dec)];
            case 12:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('IO3', A.value_dec)];
            case 13:
                _a.sent();
                _a.label = 14;
            case 14: return [3 /*break*/, 34];
            case 15:
                if (!(IO1.address_dec === IO3.address_dec)) return [3 /*break*/, 22];
                if (!!IO1.in_boolean) return [3 /*break*/, 18];
                return [4 /*yield*/, transfer('A', 'IO3', A.value_dec)];
            case 16:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('IO3', A.value_dec)];
            case 17:
                _a.sent();
                return [3 /*break*/, 21];
            case 18: return [4 /*yield*/, transfer('A', 'IO1', A.value_dec)];
            case 19:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('IO1', A.value_dec)];
            case 20:
                _a.sent();
                _a.label = 21;
            case 21: return [3 /*break*/, 34];
            case 22:
                if (!(ZR.lo_dec === IO1.address_dec)) return [3 /*break*/, 26];
                return [4 /*yield*/, changeIO('IO1')];
            case 23:
                _a.sent();
                return [4 /*yield*/, transfer('IO1', 'A', IO1.value_dec)];
            case 24:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('A', IO1.value_dec)];
            case 25:
                _a.sent();
                return [3 /*break*/, 34];
            case 26:
                if (!(ZR.lo_dec === IO2.address_dec)) return [3 /*break*/, 30];
                return [4 /*yield*/, changeIO('IO2')];
            case 27:
                _a.sent();
                return [4 /*yield*/, transfer('IO2', 'A', IO2.value_dec)];
            case 28:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('A', IO2.value_dec)];
            case 29:
                _a.sent();
                return [3 /*break*/, 34];
            case 30:
                if (!(ZR.lo_dec === IO3.address_dec)) return [3 /*break*/, 34];
                return [4 /*yield*/, changeIO('IO3')];
            case 31:
                _a.sent();
                return [4 /*yield*/, transfer('IO3', 'A', IO3.value_dec)];
            case 32:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('A', IO3.value_dec)];
            case 33:
                _a.sent();
                _a.label = 34;
            case 34:
                DECODER.resetDOM();
                return [3 /*break*/, 70];
            case 35:
                DECODER.update(1, 0, 1, 0, ZR.value_dec);
                return [4 /*yield*/, transfer('ZR', 'DEC_UPDATE', ZR.value_dec)];
            case 36:
                _a.sent();
                if (!(IO1.address_dec === IO2.address_dec)) return [3 /*break*/, 43];
                if (!!IO1.in_boolean) return [3 /*break*/, 39];
                return [4 /*yield*/, transfer('A', 'IO2', A.value_dec)];
            case 37:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('IO2', A.value_dec)];
            case 38:
                _a.sent();
                return [3 /*break*/, 42];
            case 39: return [4 /*yield*/, transfer('A', 'IO1', A.value_dec)];
            case 40:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('IO1', A.value_dec)];
            case 41:
                _a.sent();
                _a.label = 42;
            case 42: return [3 /*break*/, 69];
            case 43:
                if (!(IO3.address_dec === IO2.address_dec)) return [3 /*break*/, 50];
                if (!!IO3.in_boolean) return [3 /*break*/, 46];
                return [4 /*yield*/, transfer('A', 'IO2', A.value_dec)];
            case 44:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('IO2', A.value_dec)];
            case 45:
                _a.sent();
                return [3 /*break*/, 49];
            case 46: return [4 /*yield*/, transfer('A', 'IO3', A.value_dec)];
            case 47:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('IO3', A.value_dec)];
            case 48:
                _a.sent();
                _a.label = 49;
            case 49: return [3 /*break*/, 69];
            case 50:
                if (!(IO1.address_dec === IO3.address_dec)) return [3 /*break*/, 57];
                if (!!IO1.in_boolean) return [3 /*break*/, 53];
                return [4 /*yield*/, transfer('A', 'IO3', A.value_dec)];
            case 51:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('IO3', A.value_dec)];
            case 52:
                _a.sent();
                return [3 /*break*/, 56];
            case 53: return [4 /*yield*/, transfer('A', 'IO1', A.value_dec)];
            case 54:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('IO1', A.value_dec)];
            case 55:
                _a.sent();
                _a.label = 56;
            case 56: return [3 /*break*/, 69];
            case 57:
                if (!(ZR.value_dec === IO1.address_dec)) return [3 /*break*/, 61];
                return [4 /*yield*/, changeIO('IO1')];
            case 58:
                _a.sent();
                return [4 /*yield*/, transfer('IO1', 'A', IO1.value_dec)];
            case 59:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('A', IO1.value_dec)];
            case 60:
                _a.sent();
                return [3 /*break*/, 69];
            case 61:
                if (!(ZR.value_dec === IO2.address_dec)) return [3 /*break*/, 65];
                return [4 /*yield*/, changeIO('IO2')];
            case 62:
                _a.sent();
                return [4 /*yield*/, transfer('IO2', 'A', IO2.value_dec)];
            case 63:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('A', IO2.value_dec)];
            case 64:
                _a.sent();
                return [3 /*break*/, 69];
            case 65:
                if (!(ZR.value_dec === IO3.address_dec)) return [3 /*break*/, 69];
                return [4 /*yield*/, changeIO('IO3')];
            case 66:
                _a.sent();
                return [4 /*yield*/, transfer('IO3', 'A', IO3.value_dec)];
            case 67:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('A', IO3.value_dec)];
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
var writeToIo = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                DECODER.update(0, 1, 1, 0, ZR.lo_dec);
                return [4 /*yield*/, transfer('ZR', 'DEC_UPDATE', ZR.lo_dec)];
            case 1:
                _a.sent();
                if (!(IO1.address_dec === IO2.address_dec)) return [3 /*break*/, 8];
                if (!IO1.in_boolean) return [3 /*break*/, 4];
                return [4 /*yield*/, transfer('A', 'IO2', A.value_dec)];
            case 2:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('IO2', A.value_dec)];
            case 3:
                _a.sent();
                return [3 /*break*/, 7];
            case 4: return [4 /*yield*/, transfer('A', 'IO1', A.value_dec)];
            case 5:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('IO1', A.value_dec)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [3 /*break*/, 31];
            case 8:
                if (!(IO3.address_dec === IO2.address_dec)) return [3 /*break*/, 15];
                if (!IO3.in_boolean) return [3 /*break*/, 11];
                return [4 /*yield*/, transfer('A', 'IO2', A.value_dec)];
            case 9:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('IO2', A.value_dec)];
            case 10:
                _a.sent();
                return [3 /*break*/, 14];
            case 11: return [4 /*yield*/, transfer('A', 'IO3', A.value_dec)];
            case 12:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('IO3', A.value_dec)];
            case 13:
                _a.sent();
                _a.label = 14;
            case 14: return [3 /*break*/, 31];
            case 15:
                if (!(IO1.address_dec === IO3.address_dec)) return [3 /*break*/, 22];
                if (!IO1.in_boolean) return [3 /*break*/, 18];
                return [4 /*yield*/, transfer('A', 'IO3', A.value_dec)];
            case 16:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('IO3', A.value_dec)];
            case 17:
                _a.sent();
                return [3 /*break*/, 21];
            case 18: return [4 /*yield*/, transfer('A', 'IO1', A.value_dec)];
            case 19:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('IO1', A.value_dec)];
            case 20:
                _a.sent();
                _a.label = 21;
            case 21: return [3 /*break*/, 31];
            case 22:
                if (!(ZR.lo_dec === IO1.address_dec)) return [3 /*break*/, 25];
                return [4 /*yield*/, transfer('A', 'IO1', A.value_dec)];
            case 23:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('IO1', A.value_dec)];
            case 24:
                _a.sent();
                return [3 /*break*/, 31];
            case 25:
                if (!(ZR.lo_dec === IO2.address_dec)) return [3 /*break*/, 28];
                return [4 /*yield*/, transfer('A', 'IO2', A.value_dec)];
            case 26:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('IO2', A.value_dec)];
            case 27:
                _a.sent();
                return [3 /*break*/, 31];
            case 28:
                if (!(ZR.lo_dec === IO3.address_dec)) return [3 /*break*/, 31];
                return [4 /*yield*/, transfer('A', 'IO3', A.value_dec)];
            case 29:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('IO3', A.value_dec)];
            case 30:
                _a.sent();
                _a.label = 31;
            case 31:
                DECODER.resetDOM();
                return [2 /*return*/];
        }
    });
}); };
//composition of animations which occurs often
var increasePC = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, description_update('Erhöhe Programmzähler um 1')];
            case 1:
                _a.sent();
                return [4 /*yield*/, addArrow('PC')];
            case 2:
                _a.sent();
                return [4 /*yield*/, updatePC()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var loadOperands = function (register1_string, register2_string) { return __awaiter(_this, void 0, void 0, function () {
    var reg1_class, reg2_class;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reg1_class = getRegisterByName(register1_string);
                reg2_class = getRegisterByName(register2_string);
                return [4 /*yield*/, description_update('Hole den 1. Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, transfer(register1_string, 'ALU1', reg1_class.value_dec)];
            case 2:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('ALU1', reg1_class.value_dec)];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Hole den 2. Operanden')];
            case 4:
                _a.sent();
                return [4 /*yield*/, transfer(register2_string, 'ALU2', reg2_class.value_dec)];
            case 5:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('ALU2', reg2_class.value_dec)];
            case 6:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var loadAddressBytesInZr = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, description_update('Hole das niederwertige Adressbyte')];
            case 1:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'ZR_lo')];
            case 2:
                _a.sent();
                return [4 /*yield*/, increasePC()];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Hole das höherwertige Adressbyte')];
            case 4:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'ZR_hi')];
            case 5:
                _a.sent();
                return [4 /*yield*/, increasePC()];
            case 6:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
/********************************** command animations ****************************** */
var get_next_command = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                stepNumber_p.textContent = '0';
                assemblerCommand_p.textContent = '';
                IR.domElement.textContent = '';
                return [4 /*yield*/, description_update('Hole den nächsten Befehl')];
            case 1:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'IR')];
            case 2:
                _a.sent();
                return [4 /*yield*/, increasePC()];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Erkenne den Befehl')];
            case 4:
                _a.sent();
                return [4 /*yield*/, assemblerCommand_update()];
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
        switch (_a.label) {
            case 0: return [4 /*yield*/, description_update('Prozessor angehalten')];
            case 1:
                _a.sent();
                pause();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var movAdat_8 = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, description_update('Hole den Parameter')];
            case 1:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'A')];
            case 2:
                _a.sent();
                return [4 /*yield*/, increasePC()];
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
            case 0: return [4 /*yield*/, description_update('Hole den Parameter')];
            case 1:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'B')];
            case 2:
                _a.sent();
                return [4 /*yield*/, increasePC()];
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
            case 0: return [4 /*yield*/, description_update('Hole den Parameter')];
            case 1:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'C')];
            case 2:
                _a.sent();
                return [4 /*yield*/, increasePC()];
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
            case 0: return [4 /*yield*/, description_update('Hole das 2. Byte des Befehls')];
            case 1:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'IR')];
            case 2:
                _a.sent();
                return [4 /*yield*/, increasePC()];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Erkenne den Befehl')];
            case 4:
                _a.sent();
                return [4 /*yield*/, add_yellow_background_for_IDLETIME(IR.domElement)];
            case 5:
                _a.sent();
                return [4 /*yield*/, addArrow('IR')];
            case 6:
                _a.sent();
                if (!(IR.value_dec === 33)) return [3 /*break*/, 15];
                assemblerCommand_p.textContent = 'MOV IX, dat_16';
                if (!!playStatus.noAnim) return [3 /*break*/, 8];
                return [4 /*yield*/, sleepForIDLETIME()];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8: return [4 /*yield*/, description_update('Hole das niederwertige Byte')];
            case 9:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'IX_lo')];
            case 10:
                _a.sent();
                return [4 /*yield*/, increasePC()];
            case 11:
                _a.sent();
                return [4 /*yield*/, description_update('Hole das höherwertige Byte')];
            case 12:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'IX_hi')];
            case 13:
                _a.sent();
                return [4 /*yield*/, increasePC()];
            case 14:
                _a.sent();
                return [3 /*break*/, 52];
            case 15:
                if (!(IR.value_dec === 42)) return [3 /*break*/, 29];
                assemblerCommand_p.textContent = 'MOV IX, label';
                return [4 /*yield*/, description_update('Hole das niederwertige Adressbyte')];
            case 16:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'ZR_lo')];
            case 17:
                _a.sent();
                return [4 /*yield*/, increasePC()];
            case 18:
                _a.sent();
                return [4 /*yield*/, description_update('Hole das höherwertige Adressbyte')];
            case 19:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'ZR_hi')];
            case 20:
                _a.sent();
                return [4 /*yield*/, increasePC()];
            case 21:
                _a.sent();
                return [4 /*yield*/, description_update('Hole das niederwertige Byte')];
            case 22:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('ZR', 'IX_lo')];
            case 23:
                _a.sent();
                return [4 /*yield*/, description_update('Erhöhe die Adresse um 1')];
            case 24:
                _a.sent();
                return [4 /*yield*/, addArrow('ZR')];
            case 25:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('ZR', ZR.value_dec + 1)];
            case 26:
                _a.sent();
                return [4 /*yield*/, description_update('Hole das höherwertige Byte')];
            case 27:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('ZR', 'IX_hi')];
            case 28:
                _a.sent();
                return [3 /*break*/, 52];
            case 29:
                if (!(IR.value_dec === 34)) return [3 /*break*/, 43];
                assemblerCommand_p.textContent = 'MOV label, IX';
                return [4 /*yield*/, description_update('Hole das niederwertige Adressbyte')];
            case 30:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'ZR_lo')];
            case 31:
                _a.sent();
                return [4 /*yield*/, increasePC()];
            case 32:
                _a.sent();
                return [4 /*yield*/, description_update('Hole das höherwertige Adressbyte')];
            case 33:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'ZR_hi')];
            case 34:
                _a.sent();
                return [4 /*yield*/, increasePC()];
            case 35:
                _a.sent();
                return [4 /*yield*/, description_update('Schreibe das niederwertige Byte')];
            case 36:
                _a.sent();
                return [4 /*yield*/, writeToMemoryFromRegister('ZR', 'IX_lo')];
            case 37:
                _a.sent();
                return [4 /*yield*/, description_update('Erhöhe die Adresse um 1')];
            case 38:
                _a.sent();
                return [4 /*yield*/, addArrow('ZR')];
            case 39:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('ZR', ZR.value_dec + 1)];
            case 40:
                _a.sent();
                return [4 /*yield*/, description_update('Schreibe das höherwertige Byte')];
            case 41:
                _a.sent();
                return [4 /*yield*/, writeToMemoryFromRegister('ZR', 'IX_hi')];
            case 42:
                _a.sent();
                return [3 /*break*/, 52];
            case 43:
                if (!(IR.value_dec === 35)) return [3 /*break*/, 47];
                assemblerCommand_p.textContent = 'INC IX';
                return [4 /*yield*/, description_update('Erhöhe die Adresse um 1')];
            case 44:
                _a.sent();
                return [4 /*yield*/, addArrow('IX')];
            case 45:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('IX', IX.value_dec + 1)];
            case 46:
                _a.sent();
                return [3 /*break*/, 52];
            case 47:
                if (!(IR.value_dec === 43)) return [3 /*break*/, 51];
                assemblerCommand_p.textContent = 'DEC IX';
                return [4 /*yield*/, description_update('Verringere die Adresse um 1')];
            case 48:
                _a.sent();
                return [4 /*yield*/, addArrow('IX')];
            case 49:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('IX', IX.value_dec - 1)];
            case 50:
                _a.sent();
                return [3 /*break*/, 52];
            case 51:
                if (IR.value_dec === 233) {
                    assemblerCommand_p.textContent = 'JP [IX]';
                }
                _a.label = 52;
            case 52:
                check_completeExecution();
                return [2 /*return*/, true];
        }
    });
}); };
var movHLdat_16 = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, description_update('Hole das niederwertige Byte')];
            case 1:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'HL_lo')];
            case 2:
                _a.sent();
                return [4 /*yield*/, increasePC()];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Hole das höherwertige Byte')];
            case 4:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'HL_hi')];
            case 5:
                _a.sent();
                return [4 /*yield*/, increasePC()];
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
            case 0: return [4 /*yield*/, description_update('Hole das niederwertige Byte')];
            case 1:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'SP_lo')];
            case 2:
                _a.sent();
                return [4 /*yield*/, increasePC()];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Hole das höherwertige Byte')];
            case 4:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'SP_hi')];
            case 5:
                _a.sent();
                return [4 /*yield*/, increasePC()];
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
            case 0: return [4 /*yield*/, description_update('Kopiere die Daten')];
            case 1:
                _a.sent();
                return [4 /*yield*/, transfer('B', 'A', B.value_dec)];
            case 2:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('A', B.value_dec)];
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
            case 0: return [4 /*yield*/, description_update('Kopiere die Daten')];
            case 1:
                _a.sent();
                return [4 /*yield*/, transfer('C', 'A', C.value_dec)];
            case 2:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('A', C.value_dec)];
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
            case 0: return [4 /*yield*/, description_update('Kopiere die Daten')];
            case 1:
                _a.sent();
                return [4 /*yield*/, transfer('A', 'B', A.value_dec)];
            case 2:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('B', A.value_dec)];
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
            case 0: return [4 /*yield*/, description_update('Kopiere die Daten')];
            case 1:
                _a.sent();
                return [4 /*yield*/, transfer('C', 'B', C.value_dec)];
            case 2:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('B', C.value_dec)];
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
            case 0: return [4 /*yield*/, description_update('Kopiere die Daten')];
            case 1:
                _a.sent();
                return [4 /*yield*/, transfer('A', 'C', A.value_dec)];
            case 2:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('C', A.value_dec)];
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
            case 0: return [4 /*yield*/, description_update('Kopiere die Daten')];
            case 1:
                _a.sent();
                return [4 /*yield*/, transfer('B', 'C', B.value_dec)];
            case 2:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('C', B.value_dec)];
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
            case 0: return [4 /*yield*/, description_update('Hole das niederwertige Adressbyte')];
            case 1:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'ZR_lo')];
            case 2:
                _a.sent();
                return [4 /*yield*/, increasePC()];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Hole das höherwertige Adressbyte')];
            case 4:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'ZR_hi')];
            case 5:
                _a.sent();
                return [4 /*yield*/, increasePC()];
            case 6:
                _a.sent();
                return [4 /*yield*/, description_update('Hole die Daten')];
            case 7:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('ZR', 'A')];
            case 8:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var movLabelA = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, description_update('Hole das niederwertige Adressbyte')];
            case 1:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'ZR_lo')];
            case 2:
                _a.sent();
                return [4 /*yield*/, increasePC()];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Hole das höherwertige Adressbyte')];
            case 4:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'ZR_hi')];
            case 5:
                _a.sent();
                return [4 /*yield*/, increasePC()];
            case 6:
                _a.sent();
                return [4 /*yield*/, description_update('Schreibe die Daten')];
            case 7:
                _a.sent();
                return [4 /*yield*/, writeToMemoryFromRegister('ZR', 'A')];
            case 8:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var movHlLabel = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, description_update('Hole das niederwertige Adressbyte')];
            case 1:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'ZR_lo')];
            case 2:
                _a.sent();
                return [4 /*yield*/, increasePC()];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Hole das höherwertige Adressbyte')];
            case 4:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'ZR_hi')];
            case 5:
                _a.sent();
                return [4 /*yield*/, increasePC()];
            case 6:
                _a.sent();
                return [4 /*yield*/, description_update('Hole das niederwertige Byte')];
            case 7:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('ZR', 'HL_lo')];
            case 8:
                _a.sent();
                return [4 /*yield*/, description_update('Erhöhe die Adresse um 1')];
            case 9:
                _a.sent();
                return [4 /*yield*/, addArrow('ZR')];
            case 10:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('ZR', ZR.value_dec + 1)];
            case 11:
                _a.sent();
                return [4 /*yield*/, description_update('Hole das höherwertige Byte')];
            case 12:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('ZR', 'HL_hi')];
            case 13:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var movLabelHl = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, description_update('Hole das niederwertige Adressbyte')];
            case 1:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'ZR_lo')];
            case 2:
                _a.sent();
                return [4 /*yield*/, increasePC()];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Hole das höherwertige Adressbyte')];
            case 4:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'ZR_hi')];
            case 5:
                _a.sent();
                return [4 /*yield*/, increasePC()];
            case 6:
                _a.sent();
                return [4 /*yield*/, description_update('Schreibe das niederwertige Byte')];
            case 7:
                _a.sent();
                return [4 /*yield*/, writeToMemoryFromRegister('ZR', 'HL_lo')];
            case 8:
                _a.sent();
                return [4 /*yield*/, description_update('Erhöhe die Adresse um 1')];
            case 9:
                _a.sent();
                return [4 /*yield*/, addArrow('ZR')];
            case 10:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('ZR', ZR.value_dec + 1)];
            case 11:
                _a.sent();
                return [4 /*yield*/, description_update('Schreibe das höherwertige Byte')];
            case 12:
                _a.sent();
                return [4 /*yield*/, writeToMemoryFromRegister('ZR', 'HL_hi')];
            case 13:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var movAHl = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, description_update('Hole die Daten')];
            case 1:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('HL', 'A')];
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
            case 0: return [4 /*yield*/, description_update('Schreibe die Daten')];
            case 1:
                _a.sent();
                return [4 /*yield*/, writeToMemoryFromRegister('HL', 'A')];
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
            case 0: return [4 /*yield*/, description_update('Erhöhe den Stackpointer um 1')];
            case 1:
                _a.sent();
                return [4 /*yield*/, addArrow('SP')];
            case 2:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('SP', SP.value_dec - 1)];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Schreibe den Akku')];
            case 4:
                _a.sent();
                return [4 /*yield*/, writeToMemoryFromRegister('SP', 'A')];
            case 5:
                _a.sent();
                return [4 /*yield*/, description_update('Erhöhe den Stackpointer um 1')];
            case 6:
                _a.sent();
                return [4 /*yield*/, addArrow('SP')];
            case 7:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('SP', SP.value_dec - 1)];
            case 8:
                _a.sent();
                return [4 /*yield*/, description_update('Schreibe die Flags')];
            case 9:
                _a.sent();
                return [4 /*yield*/, writeToMemoryFromRegister('SP', 'FLAGS')];
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
            case 0: return [4 /*yield*/, description_update('Hole die Flags')];
            case 1:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('SP', 'FLAGS')];
            case 2:
                _a.sent();
                return [4 /*yield*/, description_update('Verringer den Stackpointer um 1')];
            case 3:
                _a.sent();
                return [4 /*yield*/, addArrow('SP')];
            case 4:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('SP', SP.value_dec + 1)];
            case 5:
                _a.sent();
                return [4 /*yield*/, description_update('Hole den Akku')];
            case 6:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('SP', 'A')];
            case 7:
                _a.sent();
                return [4 /*yield*/, description_update('Verringer den Stackpointer um 1')];
            case 8:
                _a.sent();
                return [4 /*yield*/, addArrow('SP')];
            case 9:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('SP', SP.value_dec + 1)];
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
            case 0: return [4 /*yield*/, description_update('Hole das Adressbyte')];
            case 1:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'ZR_lo')];
            case 2:
                _a.sent();
                return [4 /*yield*/, increasePC()];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Hole die Daten')];
            case 4:
                _a.sent();
                return [4 /*yield*/, readFromIo()];
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
            case 0: return [4 /*yield*/, description_update('Hole das Adressbyte')];
            case 1:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'ZR_lo')];
            case 2:
                _a.sent();
                return [4 /*yield*/, increasePC()];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Schreibe die Daten')];
            case 4:
                _a.sent();
                return [4 /*yield*/, writeToIo()];
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
            case 0: return [4 /*yield*/, description_update('Hole den Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, transfer('A', 'ALU1', A.value_dec)];
            case 2:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('ALU1', A.value_dec)];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Erhöhe den Operanden um 1')];
            case 4:
                _a.sent();
                result = incBinary(A.value_dec);
                return [4 /*yield*/, aluAnimation(result, false, false, 'A')];
            case 5:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var incB = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, description_update('Hole den Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, transfer('B', 'ALU1', B.value_dec)];
            case 2:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('ALU1', B.value_dec)];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Erhöhe den Operanden um 1')];
            case 4:
                _a.sent();
                result = incBinary(B.value_dec);
                return [4 /*yield*/, aluAnimation(result, false, false, 'B')];
            case 5:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var incC = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, description_update('Hole den Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, transfer('C', 'ALU1', C.value_dec)];
            case 2:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('ALU1', C.value_dec)];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Erhöhe den Operanden um 1')];
            case 4:
                _a.sent();
                result = incBinary(C.value_dec);
                return [4 /*yield*/, aluAnimation(result, false, false, 'C')];
            case 5:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var incHl = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, description_update('Erhöhe die Adresse um 1')];
            case 1:
                _a.sent();
                return [4 /*yield*/, addArrow('HL')];
            case 2:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('HL', HL.value_dec + 1)];
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
            case 0: return [4 /*yield*/, description_update('Hole den Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, transfer('A', 'ALU1', A.value_dec)];
            case 2:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('ALU1', A.value_dec)];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Verringere den Operanden um 1')];
            case 4:
                _a.sent();
                result = decBinary(A.value_dec);
                return [4 /*yield*/, aluAnimation(result, false, false, 'A')];
            case 5:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var decB = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, description_update('Hole den Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, transfer('B', 'ALU1', B.value_dec)];
            case 2:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('ALU1', B.value_dec)];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Verringere den Operanden um 1')];
            case 4:
                _a.sent();
                result = decBinary(B.value_dec);
                return [4 /*yield*/, aluAnimation(result, false, false, 'B')];
            case 5:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var decC = function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, description_update('Hole den Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, transfer('C', 'ALU1', C.value_dec)];
            case 2:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('ALU1', C.value_dec)];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Verringere den Operanden um 1')];
            case 4:
                _a.sent();
                result = decBinary(C.value_dec);
                return [4 /*yield*/, aluAnimation(result, false, false, 'C')];
            case 5:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var decHl = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, description_update('Verringere die Adresse um 1')];
            case 1:
                _a.sent();
                return [4 /*yield*/, addArrow('HL')];
            case 2:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('HL', HL.value_dec - 1)];
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
            case 0: return [4 /*yield*/, loadOperands('A', 'A')];
            case 1:
                _a.sent();
                return [4 /*yield*/, description_update('Addiere die Operanden')];
            case 2:
                _a.sent();
                result = addBinary(A.value_dec, A.value_dec, false);
                return [4 /*yield*/, aluAnimation(result, true, false, 'A')];
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
            case 0: return [4 /*yield*/, loadOperands('A', 'B')];
            case 1:
                _a.sent();
                return [4 /*yield*/, description_update('Addiere die Operanden')];
            case 2:
                _a.sent();
                result = addBinary(A.value_dec, B.value_dec, false);
                return [4 /*yield*/, aluAnimation(result, true, false, 'A')];
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
            case 0: return [4 /*yield*/, loadOperands('A', 'C')];
            case 1:
                _a.sent();
                return [4 /*yield*/, description_update('Addiere die Operanden')];
            case 2:
                _a.sent();
                result = addBinary(A.value_dec, C.value_dec, false);
                return [4 /*yield*/, aluAnimation(result, true, false, 'A')];
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
            case 0: return [4 /*yield*/, description_update('Hole den 1. Operator')];
            case 1:
                _a.sent();
                return [4 /*yield*/, transfer('A', 'ALU1', A.value_dec)];
            case 2:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('ALU1', A.value_dec)];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Hole den 2. Operator')];
            case 4:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'ALU2')];
            case 5:
                _a.sent();
                return [4 /*yield*/, increasePC()];
            case 6:
                _a.sent();
                return [4 /*yield*/, description_update('Addiere die Operanden')];
            case 7:
                _a.sent();
                result = addBinary(A.value_dec, ALU2.value_dec, false);
                return [4 /*yield*/, aluAnimation(result, true, false, 'A')];
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
            case 0: return [4 /*yield*/, description_update('Hole das L-Register (HL_LO')];
            case 1:
                _a.sent();
                return [4 /*yield*/, transfer('HL_lo', 'ALU1', HL.lo_dec)];
            case 2:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('ALU1', HL.lo_dec)];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Hole das C-Register')];
            case 4:
                _a.sent();
                return [4 /*yield*/, transfer('C', 'ALU2', C.value_dec)];
            case 5:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('ALU2', C.value_dec)];
            case 6:
                _a.sent();
                return [4 /*yield*/, description_update('Addiere die Operanden')];
            case 7:
                _a.sent();
                result = addBinary(HL.lo_dec, C.value_dec, false);
                return [4 /*yield*/, hlBcAnimation(result, true)];
            case 8:
                _a.sent();
                return [4 /*yield*/, description_update('Hole das H-Register (HL_HI')];
            case 9:
                _a.sent();
                return [4 /*yield*/, transfer('HL_hi', 'ALU1', HL.hi_dec)];
            case 10:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('ALU1', HL.hi_dec)];
            case 11:
                _a.sent();
                return [4 /*yield*/, description_update('Hole das B-Register')];
            case 12:
                _a.sent();
                return [4 /*yield*/, transfer('B', 'ALU2', B.value_dec)];
            case 13:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('ALU2', B.value_dec)];
            case 14:
                _a.sent();
                return [4 /*yield*/, description_update('Addiere die Operanden')];
            case 15:
                _a.sent();
                result = addBinary(HL.hi_dec, B.value_dec + FLAGS.c_dec, false);
                return [4 /*yield*/, hlBcAnimation(result, false)];
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
            case 0: return [4 /*yield*/, loadOperands('A', 'A')];
            case 1:
                _a.sent();
                return [4 /*yield*/, description_update('Subtrahiere die Operanden')];
            case 2:
                _a.sent();
                result = addBinary(A.value_dec, A.value_dec, true);
                return [4 /*yield*/, aluAnimation(result, true, false, 'A')];
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
            case 0: return [4 /*yield*/, loadOperands('A', 'B')];
            case 1:
                _a.sent();
                return [4 /*yield*/, description_update('Subtrahiere die Operanden')];
            case 2:
                _a.sent();
                result = addBinary(A.value_dec, B.value_dec, true);
                return [4 /*yield*/, aluAnimation(result, true, false, 'A')];
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
            case 0: return [4 /*yield*/, loadOperands('A', 'C')];
            case 1:
                _a.sent();
                return [4 /*yield*/, description_update('Subtrahiere die Operanden')];
            case 2:
                _a.sent();
                result = addBinary(A.value_dec, C.value_dec, true);
                return [4 /*yield*/, aluAnimation(result, true, false, 'A')];
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
            case 0: return [4 /*yield*/, description_update('Hole den 1. Operator')];
            case 1:
                _a.sent();
                return [4 /*yield*/, transfer('A', 'ALU1', A.value_dec)];
            case 2:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('ALU1', A.value_dec)];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Hole den 2. Operator')];
            case 4:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'ALU2')];
            case 5:
                _a.sent();
                return [4 /*yield*/, increasePC()];
            case 6:
                _a.sent();
                return [4 /*yield*/, description_update('Subtrahiere die Operanden')];
            case 7:
                _a.sent();
                result = addBinary(A.value_dec, ALU2.value_dec, true);
                return [4 /*yield*/, aluAnimation(result, true, false, 'A')];
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
            case 0: return [4 /*yield*/, loadOperands('A', 'A')];
            case 1:
                _a.sent();
                return [4 /*yield*/, description_update('OP1 AND OP2')];
            case 2:
                _a.sent();
                result = andBinary(A.value_dec, A.value_dec);
                return [4 /*yield*/, aluAnimation(result, true, false, 'A')];
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
            case 0: return [4 /*yield*/, loadOperands('A', 'B')];
            case 1:
                _a.sent();
                return [4 /*yield*/, description_update('OP1 AND OP2')];
            case 2:
                _a.sent();
                result = andBinary(A.value_dec, B.value_dec);
                return [4 /*yield*/, aluAnimation(result, true, false, 'A')];
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
            case 0: return [4 /*yield*/, loadOperands('A', 'C')];
            case 1:
                _a.sent();
                return [4 /*yield*/, description_update('OP1 AND OP2')];
            case 2:
                _a.sent();
                result = andBinary(A.value_dec, C.value_dec);
                return [4 /*yield*/, aluAnimation(result, true, false, 'A')];
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
            case 0: return [4 /*yield*/, description_update('Hole den 1. Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, transfer('A', 'ALU1', A.value_dec)];
            case 2:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('ALU1', A.value_dec)];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Hole den 2. Operanden')];
            case 4:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'ALU2')];
            case 5:
                _a.sent();
                return [4 /*yield*/, increasePC()];
            case 6:
                _a.sent();
                return [4 /*yield*/, description_update('OP1 AND OP2')];
            case 7:
                _a.sent();
                result = andBinary(A.value_dec, ALU2.value_dec);
                return [4 /*yield*/, aluAnimation(result, true, false, 'A')];
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
            case 0: return [4 /*yield*/, loadOperands('A', 'A')];
            case 1:
                _a.sent();
                return [4 /*yield*/, description_update('OP1 OR OP2')];
            case 2:
                _a.sent();
                result = orBinary(ALU1.value_dec, ALU2.value_dec);
                return [4 /*yield*/, aluAnimation(result, true, false, 'A')];
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
            case 0: return [4 /*yield*/, loadOperands('A', 'B')];
            case 1:
                _a.sent();
                return [4 /*yield*/, description_update('OP1 OR OP2')];
            case 2:
                _a.sent();
                result = orBinary(ALU1.value_dec, ALU2.value_dec);
                return [4 /*yield*/, aluAnimation(result, true, false, 'A')];
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
            case 0: return [4 /*yield*/, loadOperands('A', 'C')];
            case 1:
                _a.sent();
                return [4 /*yield*/, description_update('OP1 OR OP2')];
            case 2:
                _a.sent();
                result = orBinary(ALU1.value_dec, ALU2.value_dec);
                return [4 /*yield*/, aluAnimation(result, true, false, 'A')];
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
            case 0: return [4 /*yield*/, description_update('Hole den 1. Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, transfer('A', 'ALU1', A.value_dec)];
            case 2:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('ALU1', A.value_dec)];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Hole den 2. Operanden')];
            case 4:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'ALU2')];
            case 5:
                _a.sent();
                return [4 /*yield*/, increasePC()];
            case 6:
                _a.sent();
                return [4 /*yield*/, description_update('OP1 OR OP2')];
            case 7:
                _a.sent();
                result = orBinary(ALU1.value_dec, ALU2.value_dec);
                return [4 /*yield*/, aluAnimation(result, true, false, 'A')];
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
            case 0: return [4 /*yield*/, loadOperands('A', 'A')];
            case 1:
                _a.sent();
                return [4 /*yield*/, description_update('OP1 XOR OP2')];
            case 2:
                _a.sent();
                result = xorBinary(A.value_dec, A.value_dec);
                return [4 /*yield*/, aluAnimation(result, true, false, 'A')];
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
            case 0: return [4 /*yield*/, loadOperands('A', 'B')];
            case 1:
                _a.sent();
                return [4 /*yield*/, description_update('OP1 XOR OP2')];
            case 2:
                _a.sent();
                result = xorBinary(A.value_dec, B.value_dec);
                return [4 /*yield*/, aluAnimation(result, true, false, 'A')];
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
            case 0: return [4 /*yield*/, loadOperands('A', 'C')];
            case 1:
                _a.sent();
                return [4 /*yield*/, description_update('OP1 XOR OP2')];
            case 2:
                _a.sent();
                result = xorBinary(A.value_dec, C.value_dec);
                return [4 /*yield*/, aluAnimation(result, true, false, 'A')];
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
            case 0: return [4 /*yield*/, description_update('Hole den 1. Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, transfer('A', 'ALU1', A.value_dec)];
            case 2:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('ALU1', A.value_dec)];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Hole den 2. Operanden')];
            case 4:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'ALU2')];
            case 5:
                _a.sent();
                return [4 /*yield*/, increasePC()];
            case 6:
                _a.sent();
                return [4 /*yield*/, description_update('OP1 OR OP2')];
            case 7:
                _a.sent();
                result = xorBinary(ALU1.value_dec, ALU2.value_dec);
                return [4 /*yield*/, aluAnimation(result, true, false, 'A')];
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
            case 0: return [4 /*yield*/, description_update('Hole das 2. Byte des Befehls')];
            case 1:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'IR')];
            case 2:
                _a.sent();
                return [4 /*yield*/, increasePC()];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Erkenne den Befehl')];
            case 4:
                _a.sent();
                return [4 /*yield*/, add_yellow_background_for_IDLETIME(IR.domElement)];
            case 5:
                _a.sent();
                if (!(IR.value_dec === 39)) return [3 /*break*/, 14];
                return [4 /*yield*/, addArrow('IR')];
            case 6:
                _a.sent();
                assemblerCommand_p.textContent = 'SHL';
                if (!!playStatus.noAnim) return [3 /*break*/, 8];
                return [4 /*yield*/, sleepForIDLETIME()];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8: return [4 /*yield*/, description_update('Hole den Operanden')];
            case 9:
                _a.sent();
                return [4 /*yield*/, transfer('A', 'ALU1', A.value_dec)];
            case 10:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('ALU1', A.value_dec)];
            case 11:
                _a.sent();
                return [4 /*yield*/, description_update('Schiebe Operanden nach links')];
            case 12:
                _a.sent();
                result = shlBinary(A.value_dec);
                return [4 /*yield*/, aluAnimation(result, false, false, 'A')];
            case 13:
                _a.sent();
                return [3 /*break*/, 23];
            case 14:
                if (!(IR.value_dec === 63)) return [3 /*break*/, 23];
                return [4 /*yield*/, addArrow('IR')];
            case 15:
                _a.sent();
                assemblerCommand_p.textContent = 'SHR';
                if (!!playStatus.noAnim) return [3 /*break*/, 17];
                return [4 /*yield*/, sleepForIDLETIME()];
            case 16:
                _a.sent();
                _a.label = 17;
            case 17: return [4 /*yield*/, description_update('Hole den Operanden')];
            case 18:
                _a.sent();
                return [4 /*yield*/, transfer('A', 'ALU1', A.value_dec)];
            case 19:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('ALU1', A.value_dec)];
            case 20:
                _a.sent();
                return [4 /*yield*/, description_update('Schiebe Operanden nach rechts')];
            case 21:
                _a.sent();
                result = shrBinary(A.value_dec);
                return [4 /*yield*/, aluAnimation(result, false, false, 'A')];
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
            case 0: return [4 /*yield*/, description_update('Hole den Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, transfer('A', 'ALU1', A.value_dec)];
            case 2:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('ALU1', A.value_dec)];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Rotiere Operand mit Carry-Flag nach links')];
            case 4:
                _a.sent();
                result = rclBinary(A.value_dec);
                return [4 /*yield*/, aluAnimation(result, false, true, 'A')];
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
            case 0: return [4 /*yield*/, description_update('Hole den Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, transfer('A', 'ALU1', A.value_dec)];
            case 2:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('ALU1', A.value_dec)];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Rotiere Operand ohne Carry-Flag nach links')];
            case 4:
                _a.sent();
                result = rolBinary(A.value_dec);
                return [4 /*yield*/, aluAnimation(result, false, false, 'A')];
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
            case 0: return [4 /*yield*/, description_update('Hole den Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, transfer('A', 'ALU1', A.value_dec)];
            case 2:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('ALU1', A.value_dec)];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Rotiere Operand mit Carry-Flag nach rechts')];
            case 4:
                _a.sent();
                result = rcrBinary(A.value_dec);
                return [4 /*yield*/, aluAnimation(result, false, true, 'A')];
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
            case 0: return [4 /*yield*/, description_update('Hole den Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, transfer('A', 'ALU1', A.value_dec)];
            case 2:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('ALU1', A.value_dec)];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Rotiere Operand ohne Carry-Flag nach rechts')];
            case 4:
                _a.sent();
                result = rorBinary(A.value_dec);
                return [4 /*yield*/, aluAnimation(result, false, false, 'A')];
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
            case 0: return [4 /*yield*/, loadOperands('A', 'A')];
            case 1:
                _a.sent();
                return [4 /*yield*/, description_update('Vergleiche die Operanden')];
            case 2:
                _a.sent();
                result = addBinary(A.value_dec, A.value_dec, true);
                return [4 /*yield*/, aluAnimation(result, true, false, '')];
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
            case 0: return [4 /*yield*/, loadOperands('A', 'B')];
            case 1:
                _a.sent();
                return [4 /*yield*/, description_update('Vergleiche die Operanden')];
            case 2:
                _a.sent();
                result = addBinary(A.value_dec, B.value_dec, true);
                return [4 /*yield*/, aluAnimation(result, true, false, '')];
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
            case 0: return [4 /*yield*/, loadOperands('A', 'C')];
            case 1:
                _a.sent();
                return [4 /*yield*/, description_update('Vergleiche die Operanden')];
            case 2:
                _a.sent();
                result = addBinary(A.value_dec, C.value_dec, true);
                return [4 /*yield*/, aluAnimation(result, true, false, '')];
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
            case 0: return [4 /*yield*/, description_update('Hole den 1. Operanden')];
            case 1:
                _a.sent();
                return [4 /*yield*/, transfer('A', 'ALU1', A.value_dec)];
            case 2:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('ALU1', A.value_dec)];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Hole den 2. Operanden')];
            case 4:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'ALU2')];
            case 5:
                _a.sent();
                return [4 /*yield*/, increasePC()];
            case 6:
                _a.sent();
                return [4 /*yield*/, description_update('Vergleiche die Operanden')];
            case 7:
                _a.sent();
                result = addBinary(A.value_dec, ALU2.value_dec, true);
                return [4 /*yield*/, aluAnimation(result, true, false, '')];
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
            case 0: return [4 /*yield*/, loadAddressBytesInZr()];
            case 1:
                _a.sent();
                return [4 /*yield*/, description_update('Prüfe die Sprungbedingung')];
            case 2:
                _a.sent();
                return [4 /*yield*/, checkJumpAnimation('zFlag')];
            case 3:
                _a.sent();
                if (!(FLAGS.z_dec === 0)) return [3 /*break*/, 8];
                return [4 /*yield*/, description_update('Lade den Programmzähler')];
            case 4:
                _a.sent();
                return [4 /*yield*/, addArrow('ZR')];
            case 5:
                _a.sent();
                return [4 /*yield*/, transfer('ZR', 'PC', ZR.value_dec)];
            case 6:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('PC', ZR.value_dec)];
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
            case 0: return [4 /*yield*/, loadAddressBytesInZr()];
            case 1:
                _a.sent();
                return [4 /*yield*/, description_update('Prüfe die Sprungbedingung')];
            case 2:
                _a.sent();
                return [4 /*yield*/, checkJumpAnimation('zFlag')];
            case 3:
                _a.sent();
                if (!(FLAGS.z_dec === 1)) return [3 /*break*/, 8];
                return [4 /*yield*/, description_update('Lade den Programmzähler')];
            case 4:
                _a.sent();
                return [4 /*yield*/, addArrow('ZR')];
            case 5:
                _a.sent();
                return [4 /*yield*/, transfer('ZR', 'PC', ZR.value_dec)];
            case 6:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('PC', ZR.value_dec)];
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
            case 0: return [4 /*yield*/, loadAddressBytesInZr()];
            case 1:
                _a.sent();
                return [4 /*yield*/, description_update('Prüfe die Sprungbedingung')];
            case 2:
                _a.sent();
                return [4 /*yield*/, checkJumpAnimation('cFlag')];
            case 3:
                _a.sent();
                if (!(FLAGS.c_dec === 0)) return [3 /*break*/, 8];
                return [4 /*yield*/, description_update('Lade den Programmzähler')];
            case 4:
                _a.sent();
                return [4 /*yield*/, addArrow('ZR')];
            case 5:
                _a.sent();
                return [4 /*yield*/, transfer('ZR', 'PC', ZR.value_dec)];
            case 6:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('PC', ZR.value_dec)];
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
            case 0: return [4 /*yield*/, loadAddressBytesInZr()];
            case 1:
                _a.sent();
                return [4 /*yield*/, description_update('Prüfe die Sprungbedingung')];
            case 2:
                _a.sent();
                return [4 /*yield*/, checkJumpAnimation('cFlag')];
            case 3:
                _a.sent();
                if (!(FLAGS.c_dec === 1)) return [3 /*break*/, 8];
                return [4 /*yield*/, description_update('Lade den Programmzähler')];
            case 4:
                _a.sent();
                return [4 /*yield*/, addArrow('ZR')];
            case 5:
                _a.sent();
                return [4 /*yield*/, transfer('ZR', 'PC', ZR.value_dec)];
            case 6:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('PC', ZR.value_dec)];
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
            case 0: return [4 /*yield*/, loadAddressBytesInZr()];
            case 1:
                _a.sent();
                return [4 /*yield*/, description_update('Prüfe die Sprungbedingung')];
            case 2:
                _a.sent();
                return [4 /*yield*/, checkJumpAnimation('pFlag')];
            case 3:
                _a.sent();
                if (!(FLAGS.p_dec === 0)) return [3 /*break*/, 8];
                return [4 /*yield*/, description_update('Lade den Programmzähler')];
            case 4:
                _a.sent();
                return [4 /*yield*/, addArrow('ZR')];
            case 5:
                _a.sent();
                return [4 /*yield*/, transfer('ZR', 'PC', ZR.value_dec)];
            case 6:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('PC', ZR.value_dec)];
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
            case 0: return [4 /*yield*/, loadAddressBytesInZr()];
            case 1:
                _a.sent();
                return [4 /*yield*/, description_update('Prüfe die Sprungbedingung')];
            case 2:
                _a.sent();
                return [4 /*yield*/, checkJumpAnimation('pFlag')];
            case 3:
                _a.sent();
                if (!(FLAGS.p_dec === 1)) return [3 /*break*/, 8];
                return [4 /*yield*/, description_update('Lade den Programmzähler')];
            case 4:
                _a.sent();
                return [4 /*yield*/, addArrow('ZR')];
            case 5:
                _a.sent();
                return [4 /*yield*/, transfer('ZR', 'PC', ZR.value_dec)];
            case 6:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('PC', ZR.value_dec)];
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
            case 0: return [4 /*yield*/, loadAddressBytesInZr()];
            case 1:
                _a.sent();
                return [4 /*yield*/, description_update('Prüfe die Sprungbedingung')];
            case 2:
                _a.sent();
                return [4 /*yield*/, checkJumpAnimation('sFlag')];
            case 3:
                _a.sent();
                if (!(FLAGS.s_dec === 0)) return [3 /*break*/, 8];
                return [4 /*yield*/, description_update('Lade den Programmzähler')];
            case 4:
                _a.sent();
                return [4 /*yield*/, addArrow('ZR')];
            case 5:
                _a.sent();
                return [4 /*yield*/, transfer('ZR', 'PC', ZR.value_dec)];
            case 6:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('PC', ZR.value_dec)];
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
            case 0: return [4 /*yield*/, loadAddressBytesInZr()];
            case 1:
                _a.sent();
                return [4 /*yield*/, description_update('Prüfe die Sprungbedingung')];
            case 2:
                _a.sent();
                return [4 /*yield*/, checkJumpAnimation('sFlag')];
            case 3:
                _a.sent();
                if (!(FLAGS.s_dec === 1)) return [3 /*break*/, 8];
                return [4 /*yield*/, description_update('Lade den Programmzähler')];
            case 4:
                _a.sent();
                return [4 /*yield*/, addArrow('ZR')];
            case 5:
                _a.sent();
                return [4 /*yield*/, transfer('ZR', 'PC', ZR.value_dec)];
            case 6:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('PC', ZR.value_dec)];
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
            case 0: return [4 /*yield*/, loadAddressBytesInZr()];
            case 1:
                _a.sent();
                return [4 /*yield*/, description_update('Lade den Programmzähler')];
            case 2:
                _a.sent();
                return [4 /*yield*/, addArrow('ZR')];
            case 3:
                _a.sent();
                return [4 /*yield*/, transfer('ZR', 'PC', ZR.value_dec)];
            case 4:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('PC', ZR.value_dec)];
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
            case 0: return [4 /*yield*/, description_update('Hole das niederwertige Adressbyte')];
            case 1:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'ZR_lo')];
            case 2:
                _a.sent();
                return [4 /*yield*/, increasePC()];
            case 3:
                _a.sent();
                return [4 /*yield*/, description_update('Hole das höherwertige Adressbyte')];
            case 4:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('PC', 'ZR_hi')];
            case 5:
                _a.sent();
                return [4 /*yield*/, increasePC()];
            case 6:
                _a.sent();
                return [4 /*yield*/, description_update('Erhöhe den Stackpointer um 1')];
            case 7:
                _a.sent();
                return [4 /*yield*/, addArrow('SP')];
            case 8:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('SP', SP.value_dec - 1)];
            case 9:
                _a.sent();
                return [4 /*yield*/, description_update('Schreibe das HI-Byte des PC')];
            case 10:
                _a.sent();
                return [4 /*yield*/, writeToMemoryFromRegister('SP', 'PC_hi')];
            case 11:
                _a.sent();
                return [4 /*yield*/, description_update('Erhöhe den Stackpointer um 1')];
            case 12:
                _a.sent();
                return [4 /*yield*/, addArrow('SP')];
            case 13:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('SP', SP.value_dec - 1)];
            case 14:
                _a.sent();
                return [4 /*yield*/, description_update('Schreibe das LO-Byte des PC')];
            case 15:
                _a.sent();
                return [4 /*yield*/, writeToMemoryFromRegister('SP', 'PC_lo')];
            case 16:
                _a.sent();
                return [4 /*yield*/, description_update('Lade den Programmzähler')];
            case 17:
                _a.sent();
                return [4 /*yield*/, addArrow('ZR')];
            case 18:
                _a.sent();
                return [4 /*yield*/, transfer('ZR', 'PC', ZR.value_dec)];
            case 19:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('PC', ZR.value_dec)];
            case 20:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var ret = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, description_update('Hole das niederwertige Adressbyte')];
            case 1:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('SP', 'ZR_lo')];
            case 2:
                _a.sent();
                return [4 /*yield*/, description_update('Verringere den Stackpointer um 1')];
            case 3:
                _a.sent();
                return [4 /*yield*/, addArrow('SP')];
            case 4:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('SP', SP.value_dec + 1)];
            case 5:
                _a.sent();
                return [4 /*yield*/, description_update('Hole das höherwertige Adressbyte')];
            case 6:
                _a.sent();
                return [4 /*yield*/, readFromMemoryInRegister('SP', 'ZR_hi')];
            case 7:
                _a.sent();
                return [4 /*yield*/, description_update('Verringere den Stackpointer um 1')];
            case 8:
                _a.sent();
                return [4 /*yield*/, addArrow('SP')];
            case 9:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('SP', SP.value_dec + 1)];
            case 10:
                _a.sent();
                return [4 /*yield*/, description_update('Lade den Programmzähler')];
            case 11:
                _a.sent();
                return [4 /*yield*/, addArrow('ZR')];
            case 12:
                _a.sent();
                return [4 /*yield*/, transfer('ZR', 'PC', ZR.value_dec)];
            case 13:
                _a.sent();
                return [4 /*yield*/, updateRegister_hex('PC', ZR.value_dec)];
            case 14:
                _a.sent();
                check_completeExecution();
                return [2 /*return*/];
        }
    });
}); };
var runningProgram = [get_next_command];
var run_program = function () { return __awaiter(_this, void 0, void 0, function () {
    var i, e_4;
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
                e_4 = _a.sent();
                if (!playStatus.stop) {
                    playStatus.setPause();
                }
                setButtonPressed();
                console.log('In catch:');
                console.error(e_4);
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
    ALUOUT.domElement.textContent = '';
    ALU1.domElement.textContent = '';
    ALU2.domElement.textContent = '';
    try {
        movingObject.classList.remove('toggleGrid');
    }
    catch (_a) { }
    try {
        movingObject.classList.remove('toggleGrid');
    }
    catch (_b) { }
    stepNumber_p.textContent = '0';
    stepDescription_p.textContent = 'Prozessor angehalten';
    assemblerCommand_p.textContent = '';
    DECODER.display_DOM.textContent = '';
};
/********************************** button functions ****************************** */
var setButtonPressed = function () {
    if (playStatus.play) {
        play_button.classList.add('buttonPressed');
    }
    else {
        try {
            play_button.classList.remove('buttonPressed');
        }
        catch (_a) { }
    }
    if (playStatus.pause) {
        pause_button.classList.add('buttonPressed');
    }
    else {
        try {
            pause_button.classList.remove('buttonPressed');
        }
        catch (_b) { }
    }
    if (playStatus.stop) {
        stop_button.classList.add('buttonPressed');
    }
    else {
        try {
            stop_button.classList.remove('buttonPressed');
        }
        catch (_c) { }
    }
    if (playStatus.rocketSpeed) {
        fast_button.classList.add('buttonPressed');
        try {
            slow_button.classList.remove('buttonPressed');
        }
        catch (_d) { }
    }
    else {
        slow_button.classList.add('buttonPressed');
        try {
            fast_button.classList.remove('buttonPressed');
        }
        catch (_e) { }
    }
    if (playStatus.oneCommand) {
        oneCommand_button.classList.add('buttonPressed');
    }
    else {
        try {
            oneCommand_button.classList.remove('buttonPressed');
        }
        catch (_f) { }
    }
    if (playStatus.completeExe) {
        fullCommand_button.classList.add('buttonPressed');
    }
    else {
        try {
            fullCommand_button.classList.remove('buttonPressed');
        }
        catch (_g) { }
    }
    if (playStatus.noAnim && !playStatus.completeExe) {
        singleStep_button.classList.add('buttonPressed');
    }
    else {
        try {
            singleStep_button.classList.remove('buttonPressed');
        }
        catch (_h) { }
    }
};
setButtonPressed();
function play() {
    //only when stop is pressed(init), the program will be started anew  
    if (playStatus.stop) { //only when stop is pressed(init), the program will be started anew  
        playStatus.setPlay();
        run_program();
    }
    if (!playStatus.play) {
        playStatus.setPlay();
        setButtonPressed();
    }
}
function pause() {
    if (!playStatus.stop)
        playStatus.setPause();
    setButtonPressed();
}
function stopBtn() {
    playStatus.setStop();
    setButtonPressed();
    init();
}
function increaseSpeed() {
    if (ANIMATION_SPEED < 12) {
        ANIMATION_SPEED += 1;
        IDLETIME -= 50;
        NOANIMATIONIDLETIME -= 5;
    }
    if (ANIMATION_SPEED === 5)
        ANIMATION_SPEED = 6;
    if (ANIMATION_SPEED === 7)
        ANIMATION_SPEED = 12;
}
function decreaseSpeed() {
    if (ANIMATION_SPEED > 1) {
        ANIMATION_SPEED -= 1;
        IDLETIME += 50;
        NOANIMATIONIDLETIME += 5;
    }
    if (ANIMATION_SPEED === 11)
        ANIMATION_SPEED = 6;
    if (ANIMATION_SPEED === 5)
        ANIMATION_SPEED = 4;
}
function toggleTheme() {
    document.getElementsByTagName('html')[0].classList.toggle('black');
}
var rocketSpeed_on = function () {
    playStatus.setRocketSpeed();
    setButtonPressed();
};
var snailSpeed_on = function () {
    playStatus.setSnailSpeed();
    setButtonPressed();
};
var runOneCommand = function () {
    if (playStatus.oneCommand) {
        playStatus.oneCommand = false;
        setButtonPressed();
    }
    else {
        playStatus.setOneCommand();
        setButtonPressed();
        // play();
    }
};
var runNextSingleStep = function () {
    playStatus.setNoAnimation();
    setButtonPressed();
    play();
};
var runCompleteExecution = function () {
    playStatus.setCompleteExecution();
    setButtonPressed();
    play();
};
var toggleSettings = function () {
    containerSettings_div.classList.toggle('toggleDisplay');
};
toggleSettings();
var toggleFullscreen = function () {
    if (!isFullscreen) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        }
        else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        }
        else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
        isFullscreen = true;
    }
    else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
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
    document.getElementById('infoWindow_div').classList.toggle('toggleGrid');
};
/******************************* mc8_commands *********************************** */
//overflowflag = 1, parityflag = 2;
var mc8_commands_array = [
    new mc8_command('MOV A, dat_8', 62, 2, [0, 0, 0, 0], movAdat_8),
    new mc8_command('MOV B, dat_8', 6, 2, [0, 0, 0, 0], movBdat_8),
    new mc8_command('MOV C, dat_8', 14, 2, [0, 0, 0, 0], movCdat_8),
    new mc8_command('2-Byte Befehl', 221, 4, [0, 0, 0, 0], twoByteIX),
    new mc8_command('MOV HL, dat_16', 33, 3, [0, 0, 0, 0], movHLdat_16),
    new mc8_command('MOV SP, dat_16', 49, 3, [0, 0, 0, 0], movSPdat_16),
    new mc8_command('MOV A, B', 120, 1, [0, 0, 0, 0], movAB),
    new mc8_command('MOV A, C', 121, 1, [0, 0, 0, 0], movAC),
    new mc8_command('MOV B, A', 71, 1, [0, 0, 0, 0], movBA),
    new mc8_command('MOV B, C', 65, 1, [0, 0, 0, 0], movBC),
    new mc8_command('MOV C, A', 79, 1, [0, 0, 0, 0], movCA),
    new mc8_command('MOV C, B', 72, 1, [0, 0, 0, 0], movCB),
    new mc8_command('MOV A, label', 58, 3, [0, 0, 0, 0], movALabel),
    new mc8_command('MOV label, A', 50, 3, [0, 0, 0, 0], movLabelA),
    new mc8_command('MOV HL, label', 42, 3, [0, 0, 0, 0], movHlLabel),
    new mc8_command('MOV label, HL', 34, 3, [0, 0, 0, 0], movLabelHl),
    new mc8_command('MOV A, [HL]', 126, 1, [0, 0, 0, 0], movAHl),
    new mc8_command('MOV [HL], A', 119, 1, [0, 0, 0, 0], movHlA),
    new mc8_command('PUSH', 245, 1, [0, 0, 0, 0], push),
    new mc8_command('POP', 241, 1, [0, 0, 0, 0], pop),
    new mc8_command('IN A, port', 219, 2, [0, 0, 0, 0], inA),
    new mc8_command('OUT port, A', 211, 2, [0, 0, 0, 0], outA),
    new mc8_command('INC A', 60, 1, [0, 1, 1, 1], incA),
    new mc8_command('INC B', 4, 1, [0, 1, 1, 1], incB),
    new mc8_command('INC C', 12, 1, [0, 1, 1, 1], incC),
    new mc8_command('INC HL', 35, 1, [0, 0, 0, 0], incHl),
    new mc8_command('DEC A', 61, 1, [0, 1, 1, 1], decA),
    new mc8_command('DEC B', 5, 1, [0, 1, 1, 1], decB),
    new mc8_command('DEC C', 13, 1, [0, 1, 1, 1], decC),
    new mc8_command('DEC HL', 43, 1, [0, 0, 0, 0], decHl),
    new mc8_command('ADD A', 135, 1, [1, 1, 1, 1], addA),
    new mc8_command('ADD B', 128, 1, [1, 1, 1, 1], addB),
    new mc8_command('ADD C', 129, 1, [1, 1, 1, 1], addC),
    new mc8_command('ADD dat_8', 198, 2, [1, 1, 1, 1], addDat_8),
    new mc8_command('ADD HL, BC', 9, 1, [1, 0, 0, 0], addHlBc),
    new mc8_command('SUB A', 151, 1, [1, 1, 1, 1], subA),
    new mc8_command('SUB B', 144, 1, [1, 1, 1, 1], subB),
    new mc8_command('SUB C', 145, 1, [1, 1, 1, 1], subC),
    new mc8_command('SUB dat_8', 214, 2, [1, 1, 1, 1], subDat_8),
    new mc8_command('AND A', 167, 1, [1, 1, 2, 1], andA),
    new mc8_command('AND B', 160, 1, [1, 1, 2, 1], andB),
    new mc8_command('AND C', 161, 1, [1, 1, 2, 1], andC),
    new mc8_command('AND dat_8', 230, 2, [1, 1, 2, 1], andDat_8),
    new mc8_command('OR A', 183, 1, [1, 1, 2, 1], orA),
    new mc8_command('OR B', 176, 1, [1, 1, 2, 1], orB),
    new mc8_command('OR C', 177, 1, [1, 1, 2, 1], orC),
    new mc8_command('OR dat_8', 246, 2, [1, 1, 2, 1], orDat_8),
    new mc8_command('XOR A', 175, 1, [1, 1, 2, 1], xorA),
    new mc8_command('XOR B', 168, 1, [1, 1, 2, 1], xorB),
    new mc8_command('XOR C', 169, 1, [1, 1, 2, 1], xorC),
    new mc8_command('XOR dat_8', 238, 2, [1, 1, 2, 1], xorDat_8),
    new mc8_command('2-Byte-Befehl', 203, 2, [1, 1, 2, 1], twoByteShift),
    new mc8_command('RCL', 23, 1, [1, 0, 0, 0], rcl),
    new mc8_command('ROL', 7, 1, [1, 0, 0, 0], rol),
    new mc8_command('RCR', 31, 1, [1, 0, 0, 0], rcr),
    new mc8_command('ROR', 15, 1, [1, 0, 0, 0], ror),
    new mc8_command('CP A', 191, 1, [1, 1, 1, 1], cpA),
    new mc8_command('CP B', 184, 1, [1, 1, 1, 1], cpB),
    new mc8_command('CP C', 185, 1, [1, 1, 1, 1], cpC),
    new mc8_command('CP dat_8', 254, 2, [1, 1, 1, 1], cpDat_8),
    new mc8_command('JPNZ label', 194, 3, [0, 0, 0, 0], jpnzLabel),
    new mc8_command('JPZ label', 202, 3, [0, 0, 0, 0], jpzLabel),
    new mc8_command('JPNC label', 210, 3, [0, 0, 0, 0], jpncLabel),
    new mc8_command('JPC label', 218, 3, [0, 0, 0, 0], jpcLabel),
    new mc8_command('JPNO label', 226, 3, [0, 0, 0, 0], jpnoLabel),
    new mc8_command('JPO label', 234, 3, [0, 0, 0, 0], jpoLabel),
    new mc8_command('JPNS label', 242, 3, [0, 0, 0, 0], jpnsLabel),
    new mc8_command('JPS label', 250, 3, [0, 0, 0, 0], jpsLabel),
    new mc8_command('JP label', 195, 3, [0, 0, 0, 0], jpLabel),
    new mc8_command('CALL label', 205, 3, [0, 0, 0, 0], callLabel),
    new mc8_command('RET', 201, 3, [0, 0, 0, 0], ret),
    new mc8_command('NOP', 0, 1, [0, 0, 0, 0], nop),
    new mc8_command('HALT', 118, 1, [0, 0, 0, 0], halt),
];
