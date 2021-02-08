/**
 * Resizing logic*****************************************************************************************************
 * The ratio of the containerAspectRatio_div is defined with 46/32 = 1.4375
 */
const containerAspectRatio_div: HTMLElement = document.getElementById('containerAspectRatio_div');
const masterStyle_style: HTMLElement = document.getElementById('masterStyle_style');
let initialRatio_number: number = Math.round(window.innerWidth / window.innerHeight * 100) / 100;

const resizeWindow = (first_boolean: boolean): void => {
    const iH_number: number = window.innerHeight;
    const iW_number: number = window.innerWidth;
    const currentRatio_number: number = Math.round(iH_number / iW_number * 100) / 100;
    /**
        Function only resizes application when screenRatio changes.
        When the user is zooming, innerWidth and innerHeight will change but the ratio innerWidth/innerHeight stays the same.
    */
    if ((currentRatio_number !== initialRatio_number && iH_number > 200 && iW_number > 400) || first_boolean) {

        initialRatio_number = currentRatio_number;

        let pFontSize: number = 0;
        let h1FontSize: number = 0;
        let h2FontSize: number = 0;
        let h3FontSize: number = 0;
        let h4FontSize: number = 0;
        let textareaFontSize: number = 0;
        let borderSize: number = 0;
        let borderRadius: number = 0;
        let fontSize_string: string = '';
        let borderRadius_string: string = '';

        /**
         * If the application fills the entire width of the screen, the size of the application must also be calculated
         * using the width. And vice versa.
         */
        if (iH_number * 46 / 32 > iW_number) {
            containerAspectRatio_div.style.width = `${iW_number}px`;
            containerAspectRatio_div.style.height = `${iW_number/1.4375}px`;
            // containerAspectRatio_div.style.left = '0px';

            pFontSize = iW_number / 100 * 1.2;
            h1FontSize = iW_number / 100 * 1.6;
            h2FontSize = iW_number / 100 * 3;
            h3FontSize = iW_number / 100 * 1;
            h4FontSize = iW_number / 100 * 2.5;
            textareaFontSize = iW_number / 100 * 1.4;
            borderSize = iW_number / 100 * 0.01;
            borderRadius = iW_number / 100 * 0.7;
        } else {
            containerAspectRatio_div.style.width = `${iH_number*1.4375}px`;
            containerAspectRatio_div.style.height = `${iH_number}px`;
            // containerAspectRatio_div.style.left = String((window.innerWidth-height_number*1.4375)/2) + "px";

            pFontSize = iH_number / 100 * 1.2 * 1.4375;
            h1FontSize = iH_number / 100 * 1.6 * 1.4375;
            h2FontSize = iH_number / 100 * 3 * 1.4375;
            h3FontSize = iH_number / 100 * 1 * 1.4375;
            h4FontSize = iH_number / 100 * 2.5 * 1.4375;
            textareaFontSize = iH_number / 100 * 1.4 * 1.4375;
            borderSize = iH_number / 100 * 0.01 * 1.4375;
            borderRadius = iH_number / 100 * 0.7 * 1.4375;
        }
        fontSize_string =
            `p{font-size: ${pFontSize}px;}
                h1{font-size: ${h1FontSize}px;}
                h2{font-size: ${h2FontSize}px;}
                h3{font-size: ${h3FontSize}px;}
                h4{font-size: ${h4FontSize}px;}
                .textareaFontSize{font-size: ${textareaFontSize}px;}
                .inputFontSize{font-size: ${h2FontSize}px;}`;
        borderRadius_string =
            `.borderBox{border-width: ${borderSize}px;}
                .rounded{ border-radius: ${borderRadius}px;}
                .topLeft{border-top-left-radius: ${borderRadius}px;}
                .topRight{border-top-right-radius: ${borderRadius}px;}
                .bottomLeft{border-bottom-left-radius: ${borderRadius}px;}
                .bottomRight{border-bottom-right-radius: ${borderRadius}px;}
                .lightRounded{border-radius: ${borderRadius/2}px;}`;

        masterStyle_style.innerHTML = fontSize_string + borderRadius_string;
    }
}

window.addEventListener('DOMContentLoaded', function () {
    resizeWindow(true);
});

window.addEventListener('resize', function () {
    resizeWindow(false);
});

/***************************************************global Variables***************************************************/
let isFullscreen = false;
let settingsDisplayed_boolean = true;
let ioInputDisplayed_boolean = false;
let ANIMATION_SPEED = 3;
let IDLETIME = 400;
let NOANIMATIONIDLETIME = 30;
const FRAMES = 60;


/***************************************************DOM-selectors***************************************************/
const getHtmlElement = (id_string: string) => document.getElementById(id_string);
const mc8_div: HTMLElement = getHtmlElement('mc8_div');

//control unit
const assemblerCommand_p: HTMLElement = getHtmlElement('assemblerCommand_p');
const stepNumber_p: HTMLElement = getHtmlElement('stepNumber_p');
const stepDescription_p: HTMLElement = getHtmlElement('stepDescription_p');
const stepNumberBg_div: HTMLElement = getHtmlElement('stepNumberBg_div');

//arrows
const registerArrow_div: HTMLElement = getHtmlElement('registerArrow_div');
const irArrow_div: HTMLElement = getHtmlElement('irArrow_div');
const movingFlagsArrow_div: HTMLElement = getHtmlElement('movingFlagsArrow_div');
const cFlagArrow_div: HTMLElement = getHtmlElement('cFlagArrow_div');
const checkJumpArrow_div: HTMLElement = getHtmlElement('checkJumpArrow_div');

//io input pop ups
const io1InputWindow_div: HTMLElement = getHtmlElement('io1InputWindow_div');
const io2InputWindow_div: HTMLElement = getHtmlElement('io2InputWindow_div');
const io3InputWindow_div: HTMLElement = getHtmlElement('io3InputWindow_div');
const io1Input_input: HTMLElement = getHtmlElement('io1Input_input');
const io2Input_input: HTMLElement = getHtmlElement('io2Input_input');
const io3Input_input: HTMLElement = getHtmlElement('io3Input_input');

//moving elements
const movingObject_h2: HTMLElement = getHtmlElement('movingObject_h2');
const movingFlags_div: HTMLElement = getHtmlElement('movingFlags_div');
const movingAlu1: HTMLElement = getHtmlElement('movingAlu1_h2');
const movingAlu2: HTMLElement = getHtmlElement('movingAlu2_h2');

//yellow register background element
const yellowBgElement_div: HTMLElement = getHtmlElement('yellowBgElement_div');

//rom/ram variable memory blocks
const lastRomLabel_div: HTMLElement = document.getElementById('lastRomLabel_div');
const lastRomLabel_p: HTMLElement = document.getElementById('lastRomLabel_p');
const middleRamLabel_div: HTMLElement = document.getElementById('middleRamLabel_div');
const middleRamLabel_p: HTMLElement = document.getElementById('middleRamLabel_p');


/***************************************************basic functions***************************************************/
const convertHexToNumber = (hexValue_string: string): number => {
    return parseInt(hexValue_string, 16);
}

const convertNumberToHex_4digits = (value_number: number): string => {
    let str: string = value_number.toString(16);
    str = str.toUpperCase();
    const len: number = str.length;
    for (let i = 4; i > len; i--) {
        str = '0' + str;
    }
    return str;
}

const convertNumberToHex_2digits = (value_number: number): string => {
    let str: string = value_number.toString(16);
    str = str.toUpperCase();
    const len: number = str.length;
    for (let i = 2; i > len; i--) {
        str = '0' + str;
    }
    return str;
}

const convertNumberTo8DigitsBinaryString = (value_number: number): string => {

    let str: string = (value_number).toString(2);
    const len: number = str.length;
    if (len != 8) {
        for (let i = 0; i < 8 - len; i++) {
            str = '0' + str;
        }
    }
    str = str[0] + str[1] + str[2] + str[3] + ' ' + str[4] + str[5] + str[6] + str[7];
    return str;
}

const convertNumberToBinaryArray = (value_number: number): number[] => {
    const bin: string = convertNumberTo8DigitsBinaryString(value_number).replace(' ', '');
    let buf = [];
    for (let i = 0; i < bin.length; i++) {
        buf.push(Number(bin[i]));
    }
    return buf;
}

const convertBinaryToNumber = (binValue_string: string): number => {
    return Number(`0b${binValue_string}`);
}

const convertNumberToComplementOnTwo = (value_number: number): number => {
    if (value_number > 127) {
        value_number = value_number - 256;
    }
    return value_number;
}

const checkValidHex = (hexValue_string: string): boolean => {
    const allowedChar: Array < string > = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    let check: boolean = true;

    hexValue_string = hexValue_string.toUpperCase();
    for (let i = 0; i < hexValue_string.length; i++) {
        for (let j = 0; j < allowedChar.length; j++) {
            if (hexValue_string[i] === allowedChar[j]) {
                check = true;
                break;
            } else {
                check = false;
            }
        }
        if (!check)
            return false;
    }
    return true;
}

const calculateChecksum = (intelHexFormat_string: string): string => {
    intelHexFormat_string = intelHexFormat_string.replace(':', '');
    let sum: any = 0;
    const recordLength: number = convertHexToNumber(intelHexFormat_string[0] + intelHexFormat_string[1]);
    let checksumIncluded: number = 0;

    /**
     * IntelHexFormat:  :-03-0006-00-215544-3d (startCode-byteCount-Address-recordType-data-checksum)
     */
    if (intelHexFormat_string.length > 2 + 4 + 2 + recordLength * 2) {
        checksumIncluded = 2;
    }

    for (let i = 0; i < 2 + 4 + 2 + recordLength * 2 + checksumIncluded; i = i + 2) {
        sum += convertHexToNumber(intelHexFormat_string[i] + intelHexFormat_string[i + 1]);
    }

    sum = convertNumberToHex_4digits(sum);
    sum = convertHexToNumber(sum[2] + sum[3]);

    let bin_array: number[] = convertNumberToBinaryArray(Math.abs(sum));
    let one_array: number[] = [0, 0, 0, 0, 0, 0, 0, 1];
    let carry_array: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let sum_array: number[] = [0, 0, 0, 0, 0, 0, 0, 0];

    //invert bin_array
    for (let i = 0; i < bin_array.length; i++) {
        if (bin_array[i] === 1) {
            bin_array[i] = 0;
        } else
            bin_array[i] = 1;
    }

    //add one to bin_array
    for (let i = 8; i > 0; i--) {
        if (bin_array[i - 1] + one_array[i - 1] + carry_array[i] === 1) {
            carry_array[i - 1] = 0;
            sum_array[i - 1] = 1;
        } else if (bin_array[i - 1] + one_array[i - 1] + carry_array[i] === 2) {
            carry_array[i - 1] = 1;
            sum_array[i - 1] = 0;
        } else if (bin_array[i - 1] + one_array[i - 1] + carry_array[i] === 3) {
            carry_array[i - 1] = 1;
            sum_array[i - 1] = 1;
        }
    }

    sum = convertNumberToHex_2digits(convertBinaryToNumber(sum_array.join('')));
    return sum;
}

/*************************************************** ALU operations ***************************************************/

const setFlags = (value_number: number, binValue_array: number[], binCarry_array: number[], setC: number, setZ: number, setP: number, setV: number, setS: number): void => {

    //carry flag
    if (setC) {
        FLAGS.c_number = binCarry_array[0];
    } else {
        FLAGS.c_number = '-';
    }

    //zero flag
    if (setZ) {
        if (value_number === 0)
            FLAGS.z_number = 1;
        else
            FLAGS.z_number = 0;
    } else {
        FLAGS.z_number = '-';
    }

    //sing flag
    if (setS) {
        FLAGS.s_number = binValue_array[0];
    } else {
        FLAGS.s_number = '-';
    }

    //parity flag
    if (setP) {
        let cnt = 0;
        for (let i = 0; i < binValue_array.length; i++) {
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
    } else {
        FLAGS.p_number = '-';
    }
}

const addBinary = (value1_number: number, value2_number: number, replacementAddition_boolean: boolean): number => {
    let value1_bin: number[] = convertNumberToBinaryArray(value1_number);
    let value2_bin: number[] = convertNumberToBinaryArray(value2_number);
    let carry_bin: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let sum_bin: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
    let sum_number: number = 0;


    if (replacementAddition_boolean) {
        carry_bin[8] = 1;
        for (let i = 0; i < value2_bin.length; i++) {
            if (value2_bin[i] === 0)
                value2_bin[i] = 1;
            else
                value2_bin[i] = 0;
        }
    }


    for (let i = 8; i > 0; i--) {
        if (value1_bin[i - 1] + value2_bin[i - 1] + carry_bin[i] === 1) {
            carry_bin[i - 1] = 0;
            sum_bin[i - 1] = 1;
        } else if (value1_bin[i - 1] + value2_bin[i - 1] + carry_bin[i] === 2) {
            carry_bin[i - 1] = 1;
            sum_bin[i - 1] = 0;
        } else if (value1_bin[i - 1] + value2_bin[i - 1] + carry_bin[i] === 3) {
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
}

const incBinary = (value_number: number): number => {
    const result: number = addBinary(value_number, 1, false);
    FLAGS.c_number = '-';
    return result;
}

const decBinary = (value_number: number): number => {
    const result: number = addBinary(value_number, 1, true);
    FLAGS.c_number = '-';
    return result;
}

const andBinary = (value1_number: number, value2_number: number): number => {
    let value1_bin: number[] = convertNumberToBinaryArray(value1_number);
    let value2_bin: number[] = convertNumberToBinaryArray(value2_number);
    let result_bin: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
    let result: number = 0;


    for (let i = 8; i > 0; i--) {
        if (value1_bin[i - 1] && value2_bin[i - 1]) {
            result_bin[i - 1] = 1;
        }
    }

    result = convertBinaryToNumber(result_bin.join(''));

    setFlags(result, result_bin, [0], 1, 1, 1, 0, 1);

    return result;
}

const orBinary = (value1_number: number, value2_number: number): number => {
    let value1_bin: number[] = convertNumberToBinaryArray(value1_number);
    let value2_bin: number[] = convertNumberToBinaryArray(value2_number);
    let result_bin: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
    let result: number = 0;

    for (let i = 8; i > 0; i--) {
        if (value1_bin[i - 1] || value2_bin[i - 1]) {
            result_bin[i - 1] = 1;
        }
    }

    result = convertBinaryToNumber(result_bin.join(''));

    setFlags(result, result_bin, [0], 1, 1, 1, 0, 1);

    return result;
}

const xorBinary = (value1_number: number, value2_number: number): number => {
    let value1_bin: number[] = convertNumberToBinaryArray(value1_number);
    let value2_bin: number[] = convertNumberToBinaryArray(value2_number);
    let result_bin: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
    let result: number = 0;

    for (let i = 8; i > 0; i--) {
        if (value1_bin[i - 1] ^ value2_bin[i - 1]) {
            result_bin[i - 1] = 1;
        }
    }

    result = convertBinaryToNumber(result_bin.join(''));

    setFlags(result, result_bin, [0], 1, 1, 1, 0, 1);


    return result;
}

const shlBinary = (value_number: number): number => {
    let value_bin: number[] = convertNumberToBinaryArray(value_number);
    let result: number = 0;
    let firstBit: number = value_bin[0];

    for (let i = 0; i < value_bin.length - 1; i++) {
        value_bin[i] = value_bin[i + 1];
    }
    value_bin[7] = 0;

    result = convertBinaryToNumber(value_bin.join(''));

    setFlags(result, value_bin, [firstBit], 1, 1, 1, 0, 1);

    return result;
}

const shrBinary = (value_number: number): number => {
    let value_bin: number[] = convertNumberToBinaryArray(value_number);
    let result: number = 0;
    let lastBit: number = value_bin[7];

    for (let i = 7; i > 0; i--) {
        value_bin[i] = value_bin[i - 1];
    }
    value_bin[0] = 0;

    result = convertBinaryToNumber(value_bin.join(''));

    setFlags(result, value_bin, [lastBit], 1, 1, 1, 0, 1);

    return result;
}

const rclBinary = (value_number: number): number => {
    let value_bin: number[] = convertNumberToBinaryArray(value_number);
    let result: number = 0;

    //save bit position 7 for setFlags ( [7,6,5,4,3,2,1,0])
    let carry: number = value_bin[0];

    //shift all bits left
    for (let i = 0; i < value_bin.length - 1; i++) {
        value_bin[i] = value_bin[i + 1];
    }

    //write carry-flag in bit position 0 
    value_bin[7] = FLAGS.c_number;

    result = convertBinaryToNumber(value_bin.join(''));

    //set flags
    setFlags(result, value_bin, [carry], 1, 0, 0, 0, 0);

    return result;
}

const rolBinary = (value_number: number): number => {
    let value_bin: number[] = convertNumberToBinaryArray(value_number);
    let result: number = 0;

    //save bit position 7 for setFlags [7,6,5,4,3,2,1,0]
    //                                  ^
    let carry: number = value_bin[0];

    //shift all bits left
    for (let i = 0; i < value_bin.length - 1; i++) {
        value_bin[i] = value_bin[i + 1];
    }

    //write former bit 7 in bit position 0 
    value_bin[7] = carry;

    result = convertBinaryToNumber(value_bin.join(''));

    setFlags(result, value_bin, [carry], 1, 0, 0, 0, 0);

    return result;
}

const rcrBinary = (value_number: number): number => {
    let value_bin: number[] = convertNumberToBinaryArray(value_number);
    let result: number = 0;

    //save bit position 0 for setFlags ([7,6,5,4,3,2,1,0])
    let carry: number = value_bin[7];

    for (let i = 7; i > 0; i--) {
        value_bin[i] = value_bin[i - 1];
    }

    //write carry-flag into bit 7
    value_bin[0] = FLAGS.c_number;

    result = convertBinaryToNumber(value_bin.join(''));

    setFlags(result, value_bin, [carry], 1, 0, 0, 0, 0);

    return result;
}

const rorBinary = (value_number: number): number => {
    let value_bin: number[] = convertNumberToBinaryArray(value_number);
    let result: number = 0;

    //save bit position 0 for setFlags ([7,6,5,4,3,2,1,0])
    let carry: number = value_bin[7];

    for (let i = 7; i > 0; i--) {
        value_bin[i] = value_bin[i - 1];
    }

    //write former bit 0 into bit 7
    value_bin[0] = carry;

    result = convertBinaryToNumber(value_bin.join(''));

    setFlags(result, value_bin, [carry], 1, 0, 0, 0, 0);

    return result;
}
/***************************************************Classes***************************************************/
class PlayStatus {
    play: boolean;
    stop: boolean;
    pause: boolean;
    oneCommand: boolean;
    noAnim: boolean;
    completeExe: boolean;
    rocketSpeed: boolean;

    constructor() {
        this.play = false;
        this.stop = true;
        this.pause = false;
        this.oneCommand = false;
        this.noAnim = false;
        this.completeExe = false;
        this.rocketSpeed = false;
    }

    setPlay(): void {
        this.play = true;
        this.stop = false;
        this.pause = false;
    }

    setPause(): void {
        this.play = false;
        this.stop = false;
        this.pause = true;
    }

    setStop(): void {
        this.play = false;
        this.stop = true;
        this.pause = false;
    }
    setOneCommand(): void {
        this.oneCommand = true;
    }

    setCompleteExecution(): void {
        this.noAnim = true;
        this.completeExe = true;
    }

    setNoAnimation(): void {
        this.noAnim = true;
        this.completeExe = false;
    }

    setRocketSpeed(): void {
        this.rocketSpeed = true;
        this.noAnim = false;
        this.completeExe = false;
    }

    setSnailSpeed(): void {
        this.rocketSpeed = false;
        this.noAnim = false;
        this.completeExe = false;
    }
}
class Rom {
    breakpoints_array: Array < number > ;
    number_array: Array < number > ;
    startAddressRom_number: number;
    size_number: number;

    constructor() {
        this.breakpoints_array = this.initBreakpoints();
        this.number_array = this.initNumberArray();
        this.init_DOM();
        this.startAddressRom_number = 0;
        this.size_number = 8192;
    }

    initNumberArray(): number[] {
        let buf_arr = [];
        for (let i = 0; i < 8192; i++) {
            buf_arr.push(255);
        }
        this.number_array = buf_arr;
        return buf_arr;
    }
    initBreakpoints(): number[] {
        let buf_arr = [];
        for (let i = 0; i < 8192; i++) {
            buf_arr.push(0);
        }
        return buf_arr;
    }
    resetBreakpoints(): void {
        this.breakpoints_array = this.initBreakpoints();
        for (let i = 0; i < 224; i++) {
            document.getElementById(`romElement${i}`).classList.remove('blueText');
        }
    }

    init_DOM(): void {
        let j = 0;

        for (var i = 0; i < 240; i++) {
            const romElement: HTMLElement = document.createElement('p');
            romElement.classList.add('square1x1', 'positionAbsolute', 'centered');
            romElement.id = `romElement${i}`;

            //after every 8th romElement -> new line should be filled
            if (!(i % 8) && i !== 0)
                j++;

            if (i >= 224) {
                romElement.id = `romElementVariable${i-224}`;
                romElement.textContent = '';
            } else {
                romElement.textContent = 'FF';
            }

            romElement.style.top = `${100/32*(j+2)}%`;
            romElement.style.left = `${100/46*((i%8)+2)}%`;

            mc8_div.appendChild(romElement);
        }
    }

    update(): void {
        this.resetBreakpoints();
        this.initNumberArray();
        let buf_string = '';
        let linker_string = linkerFile_textarea.value.replace(/\r\n|\n|\r/gm, '');

        //assuming the linkerFile is correct
        for (let i = 0; i < linker_string.length; i++) {
            if (linker_string[i] === ':') {
                if (linker_string[i + 8] === '1')
                    break;
                let length = Number(linker_string[i + 2]);
                let address = convertHexToNumber(linker_string[i + 3] + linker_string[i + 4] + linker_string[i + 5] + linker_string[i + 6]);

                //load data
                for (let j = 0; j < length; j++) {
                    if (j === 0)
                        this.breakpoints_array[address + j] = 1;
                    this.number_array[address + j] = convertHexToNumber(linker_string[i + 9 + j * 2] + linker_string[i + 10 + j * 2]);
                }
            }
        }

        //update DOM        
        for (let i = 0; i < 224; i++) {
            buf_string = convertNumberToHex_2digits(this.number_array[i])
            document.getElementById(`romElement${i}`).textContent = buf_string;

            if (breakpointsCheckbox_input.checked && this.breakpoints_array[i]) {
                document.getElementById(`romElement${i}`).classList.add('blueText');
            }
        }
    }

    updateVariableElements(address_number: number): void {
        if (convertNumberToHex_4digits(address_number).slice(0, -1) !== lastRomLabel_p.textContent.slice(0, -1)) {
            if (address_number > 223 && address_number < 8192) {
                let lastXXX0Address: number = address_number - address_number % 16;

                lastRomLabel_div.classList.remove('ellipses');
                lastRomLabel_p.textContent = convertNumberToHex_4digits(address_number).slice(0, -1) + 'x';
                lastRomLabel_div.classList.add('lightYellowBg');


                for (let i = 0; i < 16; i++) {
                    document.getElementById(`romElementVariable${i}`).textContent = convertNumberToHex_2digits(this.number_array[lastXXX0Address + i]);
                }
            } else if (lastRomLabel_p.textContent !== '') {
                lastRomLabel_div.classList.add('ellipses');
                lastRomLabel_div.classList.remove('lightYellowBg');
                lastRomLabel_p.textContent = '';
                for (let i = 0; i < 16; i++) {
                    document.getElementById(`romElementVariable${i}`).textContent = '';
                }
            }
        }
    }

    getValue(address_number: number): number {
        return this.number_array[address_number];
    }

    getElementId(address_number = PC.value_number): string {
        if (address_number > 223) {
            return document.getElementById(`romElementVariable${address_number%16}`).id;
        }
        return document.getElementById(`romElement${address_number}`).id;
    }
}

class Ram {
    startAddressRam_number: number;
    size_number: number;
    number_array: Array < number > ;

    constructor() {
        this.startAddressRam_number = 8192;
        this.size_number = 8192;
        this.number_array = this.init_number();
        this.init_DOM();
    }

    init_number(): number[] {
        let buf_arr = [];
        for (let i = 0; i < 8192; i++)
            buf_arr.push(255);
        return buf_arr;
    }

    init_DOM(): void {
        let j = 0;
        for (var i = 0; i < 240; i++) {
            const ramElement = document.createElement('p');
            ramElement.classList.add('square1x1', 'positionAbsolute', 'centered');
            if (i < 112) {
                ramElement.id = `ramElement${i}`;
                ramElement.textContent = 'FF';
            } else if (i > 127) {
                ramElement.id = `ramElement${i+8192-240}`;
                ramElement.textContent = 'FF';
            } else {
                ramElement.id = `ramElementVariable${i-112}`;
                ramElement.textContent = '';
            }

            if (!(i % 8) && i !== 0)
                j++;

            ramElement.style.top = `${100/32*(j+2)}%`;
            ramElement.style.left = `${100/46*((i%8)+36)}%`;

            mc8_div.appendChild(ramElement);
        }
    }

    reset(): void {
        for (let i = 0; i < this.number_array.length; i++) {
            this.number_array[i] = 255;
            if (i < 112) {
                document.getElementById(`ramElement${i}`).textContent = 'FF';
            }
            if (i > 8192 - 113) {
                document.getElementById(`ramElement${i}`).textContent = 'FF';
            }
        }
    }

    reduceToRange2000h(address_number: number): number {
        return address_number - Math.floor(address_number / 8192) * 8192;
    }

    getValue(address_number: number): number {
        return this.number_array[this.reduceToRange2000h(address_number)];
    }

    updateElement(address_number: number, value_number: number): void {
        address_number = this.reduceToRange2000h(address_number);

        this.number_array[address_number] = value_number;
        if (address_number < 112 || address_number > 8191 - 112) {
            document.getElementById(`ramElement${address_number}`).textContent = convertNumberToHex_2digits(value_number);
        } else {
            document.getElementById(`ramElementVariable${address_number%16}`).textContent = convertNumberToHex_2digits(value_number);
        }
    }

    updateVariableElements(address_number: number): void {
        const reducedAddress = this.reduceToRange2000h(address_number);

        if (convertNumberToHex_4digits(reducedAddress).slice(0, -1) !== middleRamLabel_p.textContent.slice(0, -1)) {
            if (reducedAddress > 111 && reducedAddress <= 8191 - 112) {
                middleRamLabel_div.classList.remove('ellipses');
                middleRamLabel_div.classList.add('lightYellowBg');
                middleRamLabel_p.textContent = convertNumberToHex_4digits(address_number).slice(0, -1) + 'x';

                let lastXXX0Address: number = reducedAddress - reducedAddress % 16;
                for (let i = 0; i < 16; i++) {
                    document.getElementById(`ramElementVariable${i}`).textContent = convertNumberToHex_2digits(this.number_array[lastXXX0Address + i]);
                }
            } else if (middleRamLabel_p.textContent !== '') {
                middleRamLabel_div.classList.add('ellipses');
                middleRamLabel_div.classList.remove('lightYellowBg');
                middleRamLabel_p.textContent = '';
                for (let i = 0; i < 16; i++) {
                    document.getElementById(`ramElementVariable${i}`).textContent = '';
                }
            }
        }
    }

    getRamElementId(address_number: number = 0): string {
        address_number = this.reduceToRange2000h(address_number);

        if (address_number > 111 && address_number < 8191 - 111) {
            return document.getElementById(`ramElementVariable${address_number%16}`).id;
        } else
            return document.getElementById(`ramElement${address_number}`).id;
    }
}

class Register_x2 {
    htmlElement: HTMLElement;
    value_number: number;

    constructor(register_htmlElement: HTMLElement) {
        this.htmlElement = register_htmlElement;
        this.value_number = 0;
    }

    update(value_number: number): void {
        if (value_number > 255)
            value_number -= 256;
        if (value_number < 0)
            value_number = 255;
        this.value_number = value_number;
        this.htmlElement.textContent = convertNumberToHex_2digits(value_number);
    }
}
class IO extends Register_x2 {
    address_number: number;
    ioMapped_boolean: boolean;
    in_boolean: boolean;

    constructor(register_htmlElement: HTMLElement, address_number: number, io1IN_boolean: boolean) {
        super(register_htmlElement);
        this.address_number = address_number;
        this.ioMapped_boolean = true;
        this.in_boolean = io1IN_boolean;
    }

    updateProperties(address_number: number, ioMapped_boolean: boolean, isIn_boolean: boolean): void {
        this.address_number = address_number;
        this.ioMapped_boolean = ioMapped_boolean;
        this.in_boolean = isIn_boolean;
    }
}

class Register_x4 {
    value_number: number;
    backgroundHtmlElement: HTMLElement;
    hiValue_number: number;
    loValue_number: number;
    hi_register: Register_x2;
    lo_register: Register_x2;

    constructor(background_htmlElement: HTMLElement, registerHi_htmlElement: HTMLElement, registerLo_htmlElement: HTMLElement) {
        this.hi_register = new Register_x2(registerHi_htmlElement);
        this.lo_register = new Register_x2(registerLo_htmlElement);
        this.backgroundHtmlElement = background_htmlElement;
        this.value_number = 0;
        this.hiValue_number = 0;
        this.loValue_number = 0;
    }

    update(value_number: number): void {
        if (value_number > 65535)
            value_number -= 65536;
        if (value_number < 0)
            value_number = 65535;
        this.value_number = value_number;
        this.loValue_number = value_number % 256;
        this.hiValue_number = (value_number - this.loValue_number) / 256;
        this.hi_register.update(this.hiValue_number);
        this.lo_register.update(this.loValue_number);
    }
    updateLoByte(value_number: number): void {
        this.loValue_number = value_number;
        this.value_number = this.hiValue_number * 256 + this.loValue_number;
        this.lo_register.update(this.loValue_number);
    }

    updateHiByte(value_number: number): void {
        this.hiValue_number = value_number;
        this.value_number = this.hiValue_number * 256 + this.loValue_number;
        this.hi_register.update(this.hiValue_number);
    }
}

class Pc_class extends Register_x4 {
    constructor(register_htmlElement: HTMLElement, registerHi_htmlElement: HTMLElement, registerLo_htmlElement: HTMLElement) {
        super(register_htmlElement, registerHi_htmlElement, registerLo_htmlElement);
    }

    //override
    update(value_number: number): void {
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
    }
}

class Decoder {
    wr_htmlElement: HTMLElement;
    rd_htmlElement: HTMLElement;
    m_htmlElement: HTMLElement;
    io_htmlElement: HTMLElement;
    WR: number;
    RD: number;
    M: number;
    IO: number;
    display_htmlElement: HTMLElement;
    text_string: string;
    error: boolean;
    isRamAccess: boolean;
    isIoAccess: boolean;

    constructor(wr_htmlElement: HTMLElement, rd_htmlElement: HTMLElement, m_htmlElement: HTMLElement, io_htmlElement: HTMLElement, decDisplay_htmlElement: HTMLElement) {
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

    update(wr_number: number, rd_number: number, m_number: number, io_number: number, address_number: number): void {
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
            } else if (address_number >= RAM.startAddressRam_number && address_number < RAM.startAddressRam_number + RAM.size_number) {
                this.isRamAccess = true;
                this.text_string = 'Lese von RAM';
            } else if (address_number === IO1.address_number) {
                this.isIoAccess = true;
                if (IO1.in_boolean) {
                    this.text_string = 'Lese von IN1';
                } else {
                    this.text_string = 'Lese von OUT1';
                    this.error = true;
                }
            } else if (address_number === IO2.address_number) {
                this.isIoAccess = true;
                if (IO2.in_boolean)
                    this.text_string = 'Lese von IN2';
                else {
                    this.text_string = 'Lese von OUT2';
                    this.error = true;
                }
            } else if (address_number === IO3.address_number) {
                this.isIoAccess = true;
                if (IO3.in_boolean)
                    this.text_string = 'Lese von IN3';
                else {
                    this.text_string = 'Lese von OUT3';
                    this.error = true;
                }
            } else {
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
            } else if (address_number >= RAM.startAddressRam_number && address_number < RAM.startAddressRam_number + RAM.size_number) {
                this.isRamAccess = true;
                this.text_string = 'Schreibe auf RAM';
            } else if (address_number === IO1.address_number) {
                this.isIoAccess = true;
                if (!IO1.in_boolean) {
                    this.text_string = 'Schreibe auf OUT1';
                } else {
                    this.text_string = 'Schreibe auf IN1';
                    this.error = true;
                }
            } else if (address_number === IO2.address_number) {
                this.isIoAccess = true;
                if (!IO2.in_boolean) {
                    this.text_string = 'Schreibe auf OUT2';
                } else {
                    this.text_string = 'Schreibe auf IN2';
                    this.error = true;
                }
            } else if (address_number === IO3.address_number) {
                this.isIoAccess = true;
                if (!IO3.in_boolean) {
                    this.text_string = 'Schreibe auf OUT3';
                } else {
                    this.text_string = 'Schreibe auf IN3';
                    this.error = true;
                }
            } else {
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
                } else {
                    this.text_string = 'Lese von IN2';
                }
            } else if (IO1.address_number === IO3.address_number && IO1.address_number === address_number) {
                if (IO1.in_boolean) {
                    this.text_string = 'Lese von IN1';
                } else {
                    this.text_string = 'Lese von IN3';
                }
            } else if (IO2.address_number === IO3.address_number && IO2.address_number === address_number) {
                if (IO2.in_boolean) {
                    this.text_string = 'Lese von IN2';
                } else {
                    this.text_string = 'Lese von IN3';
                }
            } else if (address_number === IO1.address_number) {
                if (IO1.in_boolean) {
                    this.text_string = 'Lese von IN1';
                } else {
                    this.text_string = 'Lese von OUT1';
                    this.error = true;
                }
            } else if (address_number === IO2.address_number) {
                if (IO2.in_boolean)
                    this.text_string = 'Lese von IN2';
                else {
                    this.text_string = 'Lese von OUT2';
                    this.error = true;
                }
            } else if (address_number === IO3.address_number) {
                if (IO3.in_boolean)
                    this.text_string = 'Lese von IN3';
                else {
                    this.text_string = 'Lese von OUT3';
                    this.error = true;
                }
            } else {
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
                } else {
                    this.text_string = 'Schreibe auf OUT2';
                }
            } else if (IO1.address_number === IO3.address_number && IO1.address_number === address_number) {
                if (!IO1.in_boolean) {
                    this.text_string = 'Schreibe auf OUT1';
                } else {
                    this.text_string = 'Schreibe auf OUT3';
                }
            } else if (IO2.address_number === IO3.address_number && IO2.address_number === address_number) {
                if (!IO2.in_boolean) {
                    this.text_string = 'Schreibe auf OUT2';
                } else {
                    this.text_string = 'Schreibe auf OUT3';
                }
            } else if (address_number === IO1.address_number) {
                if (!IO1.in_boolean) {
                    this.text_string = 'Schreibe auf OUT1';
                } else {
                    this.text_string = 'Schreibe auf IN1';
                    this.error = true;
                }
            } else if (address_number === IO2.address_number) {
                if (!IO2.in_boolean) {
                    this.text_string = 'Schreibe auf OUT2';
                } else {
                    this.text_string = 'Schreibe auf IN2';
                    this.error = true;
                }
            } else if (address_number === IO3.address_number) {
                if (!IO3.in_boolean) {
                    this.text_string = 'Schreibe auf OUT3';
                } else {
                    this.text_string = 'Schreibe auf IN3';
                    this.error = true;
                }
            } else {
                this.text_string = 'Schreibe auf ??? Adresse: ' + convertNumberToHex_2digits(address_number);
                this.error = true;
            }
        }
    }

    updateDOM(): void {
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
    }

    resetDOM(): void {
        this.wr_htmlElement.textContent = '';
        this.rd_htmlElement.textContent = '';
        this.m_htmlElement.textContent = '';
        this.io_htmlElement.textContent = '';
        this.display_htmlElement.textContent = '';
        this.display_htmlElement.classList.remove('yellowBg');
        this.display_htmlElement.classList.remove('redBg');
    }
}
class Flags {
    c_number: any;
    z_number: any;
    p_number: any;
    s_number: any;
    c_htmlElement: HTMLElement;
    z_htmlElement: HTMLElement;
    p_htmlElement: HTMLElement;
    s_htmlElement: HTMLElement;
    value_number: number;
    htmlElement: HTMLElement;

    constructor(cFlag_htmlElement: HTMLElement, zFlag_htmlElement: HTMLElement, pFlag_htmlElement: HTMLElement, sFlag_htmlElement: HTMLElement, containerFlags_htmlElement: HTMLElement) {
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

    update(value_number: number): void {
        let bin_array = convertNumberToBinaryArray(value_number);
        this.c_number = bin_array[7];
        this.z_number = bin_array[5];
        this.p_number = bin_array[1];
        this.s_number = bin_array[0];
        this.updateDOM()
    }

    updateDec(cFlag_number: number, zFlag_number: number, pFlag_number: number, sFlag_number: number): void {
        this.c_number = cFlag_number;
        this.z_number = zFlag_number;
        this.p_number = pFlag_number;
        this.s_number = sFlag_number;
    }

    updateDOM(): void {
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
    }
}
class Point {
    index: number;
    x: number;
    y: number;
    label: string;
    parentIndex: number;
    children: number[];


    constructor(index_number: number, x_number: number, y_number: number, label_string: string, parentIndex_number: number, children_array: number[]) {
        this.index = index_number;
        this.x = x_number;
        this.y = y_number;
        this.label = label_string;
        this.parentIndex = parentIndex_number;
        this.children = children_array;
    }

    getParent() {
        return this.parentIndex;
    }

    getSmallerChild() {
        if (this.children.length === 0)
            return;
        return this.children[0];
    }
    getGreaterChild() {
        if (this.children.length === 0)
            return;
        else
            return this.children[this.children.length - 1];
    }

}
class mc8_command {
    assemblerNotation_string: string;
    machineCommand_number: number;
    animationFunction_function: any;
    constructor(assemblerNotation_string: string, machineCommand_number: number, animationFunction_function: any) {
        this.assemblerNotation_string = assemblerNotation_string;
        this.machineCommand_number = machineCommand_number;
        this.animationFunction_function = animationFunction_function;
    }

    async runAnimation() {
        return this.animationFunction_function();
    }
}

/***************************************************class variables***************************************************/
const playStatus = new PlayStatus();
const IO1 = new IO(getHtmlElement('io1RegisterValue_h2'), 0, true);
const IO2 = new IO(getHtmlElement('io2RegisterValue_h2'), 1, false);
const IO3 = new IO(getHtmlElement('io3RegisterValue_h2'), 2, true);
const A = new Register_x2(getHtmlElement('aRegisterValue_h2'));
const B = new Register_x2(getHtmlElement('bRegisterValue_h2'));
const C = new Register_x2(getHtmlElement('cRegisterValue_h2'));
const IR = new Register_x2(getHtmlElement('irRegisterValue_h2'));
const ALU1 = new Register_x2(getHtmlElement('alu1RegisterValue_h2'));
const ALU2 = new Register_x2(getHtmlElement('alu2RegisterValue_h2'));
const ALUOUT = new Register_x2(getHtmlElement('aluOutRegisterValue_h2'));
const HL = new Register_x4(getHtmlElement('hlBackground_div'), getHtmlElement('hlRegisterValueHi_h2'), getHtmlElement('hlRegisterValueLo_h2'));
const IX = new Register_x4(getHtmlElement('ixBackground_div'), getHtmlElement('ixRegisterValueHi_h2'), getHtmlElement('ixRegisterValueLo_h2'));
const SP = new Register_x4(getHtmlElement('spBackground_div'), getHtmlElement('spRegisterValueHi_h2'), getHtmlElement('spRegisterValueLo_h2'));
const PC = new Pc_class(getHtmlElement('pcBackground_div'), getHtmlElement('pcRegisterValueHi_h2'), getHtmlElement('pcRegisterValueLo_h2'));
const ZR = new Register_x4(getHtmlElement('spBackground_div'), getHtmlElement('zrRegisterValueHi_h2'), getHtmlElement('zrRegisterValueLo_h2'));
const FLAGS = new Flags(getHtmlElement('cFlagValue_p'), getHtmlElement('zFlagValue_p'), getHtmlElement('pFlagValue_p'), getHtmlElement('sFlagValue_p'), getHtmlElement('flagsContainer_div'));
const ROM = new Rom();
const RAM = new Ram();
const DECODER = new Decoder(getHtmlElement('wrValue_p'), getHtmlElement('rdValue_p'), getHtmlElement('mValue_p'), getHtmlElement('ioValue_p'), getHtmlElement('decDisplay_p'));
const fixPoints = [
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

/***************************************************hover popups***************************************************/
const allH1Elements_h1: any = Array.from(document.getElementsByTagName('h1'));
const allH3Elements_h3: any = Array.from(document.getElementsByTagName('h3'));
const controlButtons_button: any = Array.from(document.querySelectorAll('.button'));
const hoverElements_htmlElements: any = allH1Elements_h1.concat(allH3Elements_h3).concat(controlButtons_button);
const hoverPopUps_htmlElements: any = document.getElementsByClassName('hoverElement');

const updateHoverElements = (): void => {
    document.getElementById('ramStartAddressHex_p').textContent = convertNumberToHex_4digits(RAM.startAddressRam_number) + 'h';
    document.getElementById('ramStartAddressDec_p').textContent = String(RAM.startAddressRam_number);
    document.getElementById('ramEndAddressHex_p').textContent = convertNumberToHex_4digits(RAM.startAddressRam_number + 8192 - 1) + 'h';
    document.getElementById('ramEndAddressDec_p').textContent = String(RAM.startAddressRam_number + 8192 - 1);

    const checkedRadioIoMap_input: any = document.querySelector('input[name="radioIoMap"]:checked');
    document.getElementById('io1Map_p').textContent = checkedRadioIoMap_input.value;
    document.getElementById('io1AddressHover_p').textContent = convertNumberToHex_4digits(convertHexToNumber(io1Address_textarea.value)) + 'h';
    document.getElementById('io1ValueDec_p').textContent = IO1.value_number + ' (' + convertNumberToComplementOnTwo(IO1.value_number) + ')';
    document.getElementById('io1ValueBin_p').textContent = convertNumberTo8DigitsBinaryString(IO1.value_number);

    document.getElementById('io2Map_p').textContent = checkedRadioIoMap_input.value;
    document.getElementById('io2AddressHover_p').textContent = convertNumberToHex_4digits(convertHexToNumber(io2Address_textarea.value)) + 'h';
    document.getElementById('io2ValueDec_p').textContent = IO2.value_number + ' (' + convertNumberToComplementOnTwo(IO2.value_number) + ')';
    document.getElementById('io2ValueBin_p').textContent = convertNumberTo8DigitsBinaryString(IO2.value_number);

    document.getElementById('io3Map_p').textContent = checkedRadioIoMap_input.value;
    document.getElementById('io3AddressHover_p').textContent = convertNumberToHex_4digits(convertHexToNumber(io3Address_textarea.value)) + 'h';
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
}

/**
 * Note that the order of the html elements in index.html is important!
 */
for (let i = 0; i < hoverElements_htmlElements.length; i++) {
    hoverElements_htmlElements[i].addEventListener('mouseover', function () {
        updateHoverElements();
        hoverPopUps_htmlElements[i].classList.add('displayGrid');
    });
    hoverElements_htmlElements[i].addEventListener('mouseleave', function () {
        hoverPopUps_htmlElements[i].classList.remove('displayGrid');
    });
}

/***************************************************settings window***************************************************/

const containerSettings_div: any = document.getElementById('containerSettings_div');
const programSelection_select: any = document.getElementById('programSelection_select');
const linkerFile_textarea: any = document.getElementById('linkerFile_textarea');
const radioIoMapped_input: any = document.getElementById('radioIoMapped_input');
const radioMemoryMap_input: any = document.getElementById('radioMemoryMap_input');

const io1Address_textarea: any = document.getElementById('io1Address_textarea');
const io2Address_textarea: any = document.getElementById('io2Address_textarea');
const io3Address_textarea: any = document.getElementById('io3Address_textarea');

const io1InputRadio_input: any = document.getElementById('io1InputRadio_input');
const io2InputRadio_input: any = document.getElementById('io2InputRadio_input');
const io3InputRadio_input: any = document.getElementById('io3InputRadio_input');

const io1OutputRadio_input: any = document.getElementById('io1OutputRadio_input');
const io2OutputRadio_input: any = document.getElementById('io2OutputRadio_input');
const io3OutputRadio_input: any = document.getElementById('io3OutputRadio_input');

const io1Arrow_div: any = document.getElementById('io1Arrow_div');
const io2Arrow_div: any = document.getElementById('io2Arrow_div');
const io3Arrow_div: any = document.getElementById('io3Arrow_div');

const ramAddress_select: any = document.getElementById('ramAddress_select');
const breakpointsCheckbox_input: any = document.getElementById('breakpointsCheckbox_input');
const breakpointsCheckbox_div: any = document.getElementById('breakpointsCheckbox_div');

const errorWindow_div = document.getElementById('errorWindow_div');
const errorMessage_textarea = document.getElementById('errorMessage_textarea');

const checkLinkerFile = (errorMessage_string: string, count_number: number): Array < any > => {
    const intelHexArray = linkerFile_textarea.value.split('\n');
    let noError = true;
    let recordLength = 0;

    for (let i = 0; i < intelHexArray.length; i++) {
        const record = intelHexArray[i].trim();
        if (record === '')
            continue;

        //check if line starts with :
        if (noError) {
            if (record[0] !== ':') {
                errorMessage_string += `${count_number}) Fehler in der Linker-Datei in Zeile ${i+1}:\nJede Zeile muss mit einem : beginnen.\n\n`;
                count_number++;
                noError = false;
            }
        }

        //check if line includes whitespace
        if (noError) {
            if (record.includes(' ')) {
                errorMessage_string += `${count_number}) Fehler in der Linker-Datei in Zeile ${i+1}:\nEs dürfen keine Leerzeichen in einem Record vorhanden sein.\n\n`;
                count_number++;
                noError = false;
            }
        }

        //check record length
        if (noError) {
            if (!checkValidHex(record[1] + record[2])) {
                errorMessage_string += `${count_number}) Fehler in der Linker-Datei in Zeile ${i+1}: Recordlänge ${record[1]+record[2]} ist keine gültige HEX-Zahl.\n\n`;
                count_number++;
                noError = false;
            }
            if (noError) {
                recordLength = convertHexToNumber(record[1] + record[2]);
                if (record.length < 1 + 2 + 4 + 2 + recordLength * 2 + 2) {
                    errorMessage_string += `${count_number}) Fehler in der Linker-Datei in Zeile ${i+1}: Recordlänge ${record[1]+record[2]} stimmt nicht mit der Länge des Datensatzes überein.\n\n`;
                    count_number++;
                    noError = false;
                }
            }
        }
        //check record address
        if (noError) {
            if (!checkValidHex(record[3] + record[4] + record[5] + record[6])) {
                errorMessage_string += `${count_number}) Fehler in der Linker-Datei in Zeile ${i+1}: Recordadresse ${record[3]+record[4]+record[5]+record[6]} ist keine gültige HEX-Zahl.\n\n`;
                count_number++;
                noError = false;
            }
            //TODO: check if bigger than 1999h ??
        }
        //check record type
        if (noError) {
            if (!checkValidHex(record[7] + record[8])) {
                errorMessage_string += `${count_number}) Fehler in der Linker-Datei in Zeile ${i+1}: Recordtyp ${record[7]+record[8]} ist keine gültige HEX-Zahl.\n\n`;
                count_number++;
                noError = false;
            }
            //check if type is a data-record
            if (noError) {
                if (recordLength === 0 && convertHexToNumber(record[7] + record[8]) === 0) {
                    errorMessage_string += `${count_number}) Fehler in der Linker-Datei in Zeile ${i+1}: Recordlänge ${record[1]+record[2]} muss für einen Daten-Recordtyp größer als null sein.\n\n`;
                    count_number++;
                    noError = false;
                }
            }
            if (noError) {
                if (convertHexToNumber(record[7] + record[8]) > 1) {
                    errorMessage_string += `${count_number}) Fehler in der Linker-Datei in Zeile ${i+1}: Unbekannter Recordtyp ${record[7]+record[8]}.
                    \n\n`;
                    count_number++;
                    noError = false;
                }
            }
        }
        //check data
        if (noError) {
            recordLength = convertHexToNumber(record[1] + record[2]);
            for (let j = 0; j < recordLength * 2; j = j + 2) {
                if (!checkValidHex(record[9 + j] + record[10 + j])) {
                    errorMessage_string += `${count_number}) Fehler in der Linker-Datei in Zeile ${i+1}: Datenbyte ${record[9+j]+record[10+j]} ist keine gültige HEX-Zahl.\n\n`;
                    count_number++;
                    noError = false;
                }
            }
        }
        //check checksum
        if (noError) {
            if (!checkValidHex(record[9 + recordLength * 2] + record[10 + recordLength * 2])) {
                errorMessage_string += `${count_number}) Fehler in der Linker-Datei in Zeile ${i+1}: Checkumme ${record[9+recordLength*2]+record[10+recordLength*2]} ist keine gültige HEX-Zahl.\n\n`;
                count_number++;
                noError = false;
            }
            //TODO: check with new mc8assembler
            else if (calculateChecksum(record) !== '00') {
                errorMessage_string += `${count_number}) Fehler in der Linker-Datei in Zeile ${i+1}: Checkumme ${record[9+recordLength*2]+record[10+recordLength*2]} ist nicht korrekt. Richtige Checksumme: ${calculateChecksum(record.slice(0, -2))}\n\n`
                noError = false;
            }
        }
    }
    return [errorMessage_string, count_number];
}
//checks if IOs and Ram were set correctly
const checkSettings = (): boolean => {
    let errorMessage_string = '';
    let count = 1;
    const buf = checkLinkerFile(errorMessage_string, count);
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
        errorMessage_string += `${count}) Die Adresse ${io1Address_textarea.value}h von IO1 ist keine gültige HEX-Zahl. Bitte verwenden Sie nur die Ziffern 0-9 und die Zeichen A-F.
        \n\n`;
        count++;
    }
    if (!checkValidHex(io2Address_textarea.value)) {
        errorMessage_string += `${count}) Die Adresse ${io2Address_textarea.value}h von IO2 ist keine gültige HEX-Zahl. Bitte verwenden Sie nur die Ziffern 0-9 und die Zeichen A-F.
        \n\n`;
        count++;
    }
    if (!checkValidHex(io3Address_textarea.value)) {
        errorMessage_string += `${count}) Die Adresse ${io3Address_textarea.value}h von IO3 ist keine gültige HEX-Zahl. Bitte verwenden Sie nur die Ziffern 0-9 und die Zeichen A-F.
        \n\n`;
        count++;
    }

    //check if inputs reside on same address and are both inputs/outputs
    if ((convertHexToNumber(io1Address_textarea.value) === convertHexToNumber(io2Address_textarea.value)) && (io1InputRadio_input.checked === io2InputRadio_input.checked)) {
        errorMessage_string += `${count}) IO1 und IO2 liegen auf der gleichen Adresse. Dies ist nur erlaubt, wenn es sich um einen Eingabe- und um einen Ausgabebaustein handelt.\n\n`;
        count++;
    }
    if ((convertHexToNumber(io1Address_textarea.value) === convertHexToNumber(io3Address_textarea.value)) && (io1InputRadio_input.checked === io3InputRadio_input.checked)) {
        errorMessage_string += `${count}) IO1 und IO3 liegen auf der gleichen Adresse. Dies ist nur erlaubt, wenn es sich um einen Eingabe- und um einen Ausgabebaustein handelt.\n\n`;
        count++;
    }
    if ((convertHexToNumber(io2Address_textarea.value) === convertHexToNumber(io3Address_textarea.value)) && (io2InputRadio_input.checked === io3InputRadio_input.checked)) {
        errorMessage_string += `${count}) IO2 und IO3 liegen auf der gleichen Adresse. Dies ist nur erlaubt, wenn es sich um einen Eingabe- und um einen Ausgabebaustein handelt.\n\n`;
        count++;
    }


    if (radioIoMapped_input.checked) {
        //if io-mapped: check if inputs are to big
        if (convertHexToNumber(io1Address_textarea.value) > convertHexToNumber('FF')) {
            errorMessage_string += `${count}) Die Adresse ${io1Address_textarea.value}h von IO1 ist zu groß. Bitte verwenden Sie bei IO-mapping 8-Bit Adressen (Wertebereich 00h bis FFh).\n\n`;
            count++;
        }
        if (convertHexToNumber(io2Address_textarea.value) > convertHexToNumber('FF')) {
            errorMessage_string += `${count}) Die Adresse ${io2Address_textarea.value}h von IO2 ist zu groß. Bitte verwenden Sie bei IO-mapping 8-Bit Adressen (Wertebereich 00h bis FFh).\n\n`;
            count++;
        }
        if (convertHexToNumber(io3Address_textarea.value) > convertHexToNumber('FF')) {
            errorMessage_string += `${count}) Die Adresse ${io3Address_textarea.value}h von IO3 ist zu groß. Bitte verwenden Sie bei IO-mapping 8-Bit Adressen (Wertebereich 00h bis FFh).\n\n`;
            count++;
        }
    } else {
        //if memory-mapped: check if inputs are to big
        if (convertHexToNumber(io1Address_textarea.value) > convertHexToNumber('FFFF')) {
            errorMessage_string += `${count}) Die Adresse ${io1Address_textarea.value}h von IO1 ist zu groß. Bitte verwenden Sie bei Memory-mapping 16-Bit Adressen (Wertebereich 0000h bis FFFFh).\n\n`;
            count++;
        }
        if (convertHexToNumber(io2Address_textarea.value) > convertHexToNumber('FFFF')) {
            errorMessage_string += `${count}) Die Adresse ${io2Address_textarea.value}h von IO2 ist zu groß. Bitte verwenden Sie bei Memory-mapping 16-Bit Adressen (Wertebereich 0000h bis FFFFh).\n\n`;
            count++;
        }
        if (convertHexToNumber(io3Address_textarea.value) > convertHexToNumber('FFFF')) {
            errorMessage_string += `${count}) Die Adresse ${io3Address_textarea.value}h von IO3 ist zu groß. Bitte verwenden Sie bei Memory-mapping 16-Bit Adressen (Wertebereich 0000h bis FFFFh).\n\n`;
            count++;
        }

        //check if inputs reside on ram/rom address
        if (convertHexToNumber(io1Address_textarea.value) < convertHexToNumber('2000')) {
            errorMessage_string += `${count}) Die Adresse ${io1Address_textarea.value}h von IO1 liegt im Adressbereich des ROM. Bitte verwenden Sie eine andere Adresse.\n\n`;
            count++;
        }
        if (convertHexToNumber(io2Address_textarea.value) < convertHexToNumber('2000')) {
            errorMessage_string += `${count}) Die Adresse ${io2Address_textarea.value}h von IO2 liegt im Adressbereich des ROM. Bitte verwenden Sie eine andere Adresse.\n\n`;
            count++;
        }
        if (convertHexToNumber(io3Address_textarea.value) < convertHexToNumber('2000')) {
            errorMessage_string += `${count}) Die Adresse ${io3Address_textarea.value}h von IO3 liegt im Adressbereich des ROM. Bitte verwenden Sie eine andere Adresse.\n\n`;
            count++;
        }
        if (convertHexToNumber(io1Address_textarea.value) >= RAM.startAddressRam_number && convertHexToNumber(io1Address_textarea.value) < (RAM.startAddressRam_number + 8192)) {
            errorMessage_string += `${count}) Die Adresse ${io1Address_textarea.value}h von IO1 liegt im Adressbereich des RAM. Bitte verwenden Sie eine andere Adresse für den IO-Baustein oder für das RAM.`;
            count++;
        }
        if (convertHexToNumber(io2Address_textarea.value) >= RAM.startAddressRam_number && convertHexToNumber(io2Address_textarea.value) < (RAM.startAddressRam_number + 8192)) {
            errorMessage_string += `${count}) Die Adresse ${io2Address_textarea.value}h von IO2 liegt im Adressbereich des RAM. Bitte verwenden Sie eine andere Adresse für den IO-Baustein oder für das RAM.`;
            count++;
        }
        if (convertHexToNumber(io3Address_textarea.value) >= RAM.startAddressRam_number && convertHexToNumber(io3Address_textarea.value) < (RAM.startAddressRam_number + 8192)) {
            errorMessage_string += `${count}) Die Adresse ${io3Address_textarea.value}h von IO3 liegt im Adressbereich des RAM. Bitte verwenden Sie eine andere Adresse für den IO-Baustein oder für das RAM.`;
            count++;
        }
    }

    if (errorMessage_string === '')
        return true;

    errorWindow_div.classList.add('displayGrid');
    errorMessage_textarea.textContent = errorMessage_string;
    return false;
};

const changeRamAddressOnDOM = (hex1_string: string, hex2_string: string): void => {
    const pEle = document.getElementsByClassName('RamAddressLabel');
    const str = ['0', '1', '2', '3', '4', '5', '6', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    RAM.startAddressRam_number = convertHexToNumber(hex1_string + '00');
    for (let i = 0; i < pEle.length; i++) {
        if (i < 7) {
            pEle[i].textContent = hex1_string + str[i] + 'x';
        } else if (i === 7) {

        } else {
            pEle[i].textContent = hex2_string + str[i - 1] + 'x';
        }
    }
}

const changeRamAddress = () => {
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
}

const setSettingsDependingOnProgram = (ioMapped_boolean: boolean, io1IN_boolean: boolean, io2IN_boolean: boolean, io3IN_boolean: boolean, io1AddressHex_string: string, io2AddressHex_string: string, io3AddressHex_string: string, ramStartingAddressHex_string: string): void => {

    if (ioMapped_boolean) {
        radioIoMapped_input.checked = true;
    } else {
        radioMemoryMap_input.checked = true;
    }
    if (io1IN_boolean) {
        io1InputRadio_input.checked = true;
        io1Arrow_div.classList.remove('ioArrowOUT');
    } else {
        io1OutputRadio_input.checked = true;
        io1Arrow_div.classList.add('ioArrowOUT');
    }
    if (io2IN_boolean) {
        io2InputRadio_input.checked = true;
        io2Arrow_div.classList.remove('ioArrowOUT');
    } else {
        io2OutputRadio_input.checked = true;
        io2Arrow_div.classList.add('ioArrowOUT');
    }
    if (io3IN_boolean) {
        io3InputRadio_input.checked = true;
        io3Arrow_div.classList.remove('ioArrowOUT');
    } else {
        io3OutputRadio_input.checked = true;
        io3Arrow_div.classList.add('ioArrowOUT');
    }

    io1Address_textarea.value = io1AddressHex_string;
    io2Address_textarea.value = io2AddressHex_string;
    io3Address_textarea.value = io3AddressHex_string;
    ramAddress_select.value = ramStartingAddressHex_string;

    //change textContent of the custom selection
    for (let i = 0; i < ramAddress_select.children.length; i++) {
        if (ramAddress_select.children[i].value === ramStartingAddressHex_string) {
            ramSelection_p.textContent = ramAddress_select.children[i].textContent;
        }
    }
    changeRamAddress();
}

const updateProgram = (): void => {
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
}

const updateIoClasses = (): void => {
    if (radioIoMapped_input.checked) {
        IO1.ioMapped_boolean = true;
        IO2.ioMapped_boolean = true;
        IO3.ioMapped_boolean = true;
    } else {
        IO1.ioMapped_boolean = false;
        IO2.ioMapped_boolean = false;
        IO3.ioMapped_boolean = false;
    }

    if (io1InputRadio_input.checked) {
        IO1.in_boolean = true;
        io1Arrow_div.classList.remove('ioArrowOUT');
    } else {
        IO1.in_boolean = false;
        io1Arrow_div.classList.add('ioArrowOUT');
    }

    if (io2InputRadio_input.checked) {
        IO2.in_boolean = true;
        io2Arrow_div.classList.remove('ioArrowOUT');
    } else {
        IO2.in_boolean = false;
        io2Arrow_div.classList.add('ioArrowOUT');
    }

    if (io3InputRadio_input.checked) {
        IO3.in_boolean = true;
        io3Arrow_div.classList.remove('ioArrowOUT');
    } else {
        IO3.in_boolean = false;
        io3Arrow_div.classList.add('ioArrowOUT');
    }

    IO1.address_number = convertHexToNumber(io1Address_textarea.value);
    IO2.address_number = convertHexToNumber(io2Address_textarea.value);
    IO3.address_number = convertHexToNumber(io3Address_textarea.value);
}

const saveSettings = () => {
    if (checkSettings()) {
        updateIoClasses();
        stopBtn(); //init
        ROM.update();
        RAM.reset();
        containerSettings_div.classList.remove('toggleDisplay');
        errorWindow_div.classList.remove('displayGrid');
        settingsDisplayed_boolean = false;
    }
}

/**
 * Custom select to work on all browsers without any differences
 */
const ramSelect_div: HTMLElement = document.getElementById('ramSelect_div');
const ramSelection_p: HTMLElement = document.getElementById('ramSelection_p');
const ramSelectOptions_div: HTMLElement = document.getElementById('ramSelectOptions_div');

const programSelection_div: HTMLElement = document.getElementById('programSelection_div');
const programSelection_p: HTMLElement = document.getElementById('programSelection_p');
const programSelectionOptions_div: HTMLElement = document.getElementById('programSelectionOptions_div');

const ramOptions = ramSelectOptions_div.children;
const programOptions = programSelectionOptions_div.children;

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


for (let i = 0; i < ramOptions.length; i++) {
    ramOptions[i].addEventListener('click', function () {
        ramAddress_select.value = ramAddress_select.children[i].value;
        changeRamAddress();
        ramSelection_p.textContent = ramOptions[i].textContent;
        ramSelectOptions_div.classList.remove('displayGrid');
    });
}

for (let i = 0; i < programOptions.length; i++) {
    programOptions[i].addEventListener('click', function () {
        programSelection_select.value = programSelection_select.children[i].value;
        updateProgram();
        programSelection_p.textContent = programOptions[i].textContent;
        programSelectionOptions_div.classList.remove('displayGrid');
    });
}

/**
 * EventListeners for IO radio buttons
 */
radioIoMapped_input.addEventListener('change', updateIoClasses);

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
const getPointIndex = (pointID_string: string): number => {
    for (let i = 0; i < fixPoints.length; i++) {
        if (fixPoints[i].label === pointID_string)
            return i;
    }
    return -1;
}

//returns the indices from Zero(ROM1) to the passed point index. 
const getIndexArrayZeroToPoint = (pointIndex_number: number): number[] => {
    let atoZero = [];

    while (true) {
        if (pointIndex_number === 0) {
            atoZero.push(0);
            return atoZero.reverse();
        } else {
            atoZero.push(pointIndex_number);
            pointIndex_number = fixPoints[pointIndex_number].getParent();
        }
    }
}

//merges zeroToA_array and zeroToB_array to AtoB_array
const getIndexArrayAtoB = (zeroToA_array: number[], zeroToB_array: number[]): number[] => {
    const smallerArray = (zeroToA_array < zeroToB_array ? zeroToA_array.length : zeroToB_array.length);
    let AtoB = [];
    let buffer = 0;

    //find smallest common index and save in buffer;
    for (let i = 0; i < smallerArray; i++) {
        if (zeroToA_array[i] === zeroToB_array[i]) {
            buffer = zeroToA_array[i];
        }
    }

    //reverse indexArray zeroToA
    let aToZero_array = zeroToA_array.reverse();

    //add index to AtoB-array as long as the index is smaller than buffer
    for (let i = 0; i < aToZero_array.length; i++) {
        if (aToZero_array[i] > buffer)
            AtoB.push(aToZero_array[i]);
    }

    //add index to AtoB-array when index is equal or greater to buffer
    for (let i = 0; i < zeroToB_array.length; i++) {
        if (zeroToB_array[i] >= buffer)
            AtoB.push(zeroToB_array[i]);
    }

    return AtoB;
}

// rom- and ram-Elements are not fixPoints. Therefore they need to be handled separately.
const romElementToROM1 = (romElementID_string: string): Array < Point > => {
    let toROM1 = [];
    let romElement = document.getElementById(romElementID_string);
    let rEx: any = romElement.style.left.replace('%', '');
    let rEy: any = romElement.style.top.replace('%', '');
    rEx = Math.round(Number(rEx) * 46 / 100);
    rEy = Math.round(Number(rEy) * 32 / 100);

    let romBetweenPoint = new Point(-1, rEx, 2, '', 0, []);
    let romPoint = new Point(-1, rEx, rEy, '', 0, []);

    toROM1.push(romPoint);
    toROM1.push(romBetweenPoint);
    return toROM1;
}

const ramElementToRAM1 = (ramElementID_string: string): Array < Point > => {
    let toRAM1 = [];
    let ramElement = document.getElementById(ramElementID_string);
    let rEx: any = ramElement.style.left.replace('%', '');
    let rEy: any = ramElement.style.top.replace('%', '');
    rEx = Math.round(Number(rEx) * 46 / 100);
    rEy = Math.round(Number(rEy) * 32 / 100);

    let romBetweenPoint = new Point(-1, rEx, 2, '', 0, []);
    let romPoint = new Point(-1, rEx, rEy, '', 0, []);

    toRAM1.push(romPoint);
    toRAM1.push(romBetweenPoint);
    return toRAM1;
}

const RAM2ToRamElement = (ramElementID_string: string): Array < Point > => {
    let toRamElement = [];
    const ramElement = document.getElementById(ramElementID_string);
    let rEx: any = ramElement.style.left.replace('%', '');
    let rEy: any = ramElement.style.top.replace('%', '');
    rEx = Math.round(Number(rEx) * 46 / 100);
    rEy = Math.round(Number(rEy) * 32 / 100);

    let ramBetweenPoint = new Point(-1, rEx, 2, '', 0, []);
    let ramPoint = new Point(-1, rEx, rEy, '', 0, []);

    toRamElement.push(ramBetweenPoint);
    toRamElement.push(ramPoint);
    return toRamElement;
}

//returns the fixPoints to pass during the movement
const getPointsAtoB = (fixPointLabelA_string: string, fixPointLabelB_string: string): Array < Point > => {
    let pointsAtoB = [];

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

    pointsAtoB = getIndexArrayAtoB(getIndexArrayZeroToPoint(getPointIndex(fixPointLabelA_string)),
        getIndexArrayZeroToPoint(getPointIndex(fixPointLabelB_string)));

    //convert Index-Array to Point-Array
    for (let i = 0; i < pointsAtoB.length; i++) {
        pointsAtoB[i] = fixPoints[pointsAtoB[i]];
    }
    return pointsAtoB;
}

//calculates the coordinates between the fixPoints.
//At Speed 1, the movingObject updates every single coordinate
//At Speed 2, the movingObject updates every second coordinate...
//max Speed = 12 (update only fixPoints)
const calcIntermediatePositions = (pointsAtoB_array: Array < Point > , interPointsQuantity = 12): number[][][] => {
    let xPositions = [];
    let yPositions = [];
    let bufferX = [];
    let bufferY = [];
    let posDiff = 0;
    const reciprocal = 1 / interPointsQuantity;

    //iterate through path
    for (let j = 0; j < pointsAtoB_array.length - 1; j++) {

        //If path position is different to the next path position, calculate position difference
        //and add intermediate Points, depending on the position difference and direction.
        if (pointsAtoB_array[j].y !== pointsAtoB_array[j + 1].y) {
            posDiff = Math.abs((pointsAtoB_array[j + 1].y - pointsAtoB_array[j].y));

            for (let i = 0; i < interPointsQuantity * posDiff; i++) {
                if ((pointsAtoB_array[j + 1].y > pointsAtoB_array[j].y))
                    yPositions.push(pointsAtoB_array[j].y + reciprocal * (i + 1));
                else
                    yPositions.push(pointsAtoB_array[j].y - reciprocal * (i + 1));

                xPositions.push(pointsAtoB_array[j].x);
            }
        }
        if (pointsAtoB_array[j].x !== pointsAtoB_array[j + 1].x) {
            posDiff = Math.abs((pointsAtoB_array[j + 1].x - pointsAtoB_array[j].x));

            for (let i = 0; i < interPointsQuantity * posDiff; i++) {
                if ((pointsAtoB_array[j + 1].x > pointsAtoB_array[j].x))
                    xPositions.push(pointsAtoB_array[j].x + reciprocal * (i + 1));
                else
                    xPositions.push(pointsAtoB_array[j].x - reciprocal * (i + 1));

                yPositions.push(pointsAtoB_array[j].y);
            }
        }
    }

    //create 2-dimensional array, which contains 12 coordinates per index
    for (let i = 0, k = -1; i < xPositions.length; i++) {
        if (i % interPointsQuantity === 0) {
            k++;
            bufferX[k] = [];
            bufferY[k] = [];
        }
        bufferX[k].push(xPositions[i]);
        bufferY[k].push(yPositions[i]);
    }
    return [bufferX, bufferY];
}


/***************************************************red rectangle***************************************************/
const redRectangle_p: HTMLElement = document.getElementById('redRectangle_p');
const updateRedRectangle = (PC_number: number): void => {
    redRectangle_p.classList.remove('displayNone');
    let xPos: number = 0;
    let yPos: number = 0;
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
    } else if (PC_number >= RAM.startAddressRam_number && PC_number < RAM.startAddressRam_number + 112) {
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
    } else if (PC_number >= RAM.startAddressRam_number + 8080 && PC_number < RAM.startAddressRam_number + 8192) {
        PC_number = RAM.reduceToRange2000h(PC_number);
        xPos = PC_number % 8 + 36;
        yPos = Math.floor((PC_number - 7952) / 8) + 2;
    } else {
        redRectangle_p.classList.add('displayNone')
    }
    redRectangle_p.style.left = `${100/46*xPos}%`;
    redRectangle_p.style.top = `${100/32*yPos}%`;
}
updateRedRectangle(0);


/***************************************************implementation of the animations***************************************************/

/**
 * The following functions are basic functions, which are requiered often.  
 */

//Sleep functions for pausing Animation for a certain time
const sleepForMs = (milliseconds_number: number): Promise < any > => new Promise(resolve => setTimeout(resolve, milliseconds_number));

//throws 'Stop pressed' error
const sleep = async (milliseconds_number: number): Promise < any > => {
    let count = milliseconds_number;
    while (true) {
        if (count < 10) {
            return true;
        } else {
            await sleepForMs(10);
            await checkPlayPressed();
            count -= 10;
        }
    }
}

const sleepForIDLETIME = (): Promise < any > => sleep(IDLETIME);

const sleepForNOANIMATIONIDLETIME = (): Promise < any > => sleep(NOANIMATIONIDLETIME);


// function checks if play/pause/stop is pressed
const checkPlayPressed = async (): Promise < any > => {
    //if pause is pressed user will be caught in this loop till pressing play or stop
    while (true) {
        if (playStatus.play)
            return true;
        if (playStatus.stop)
            throw Error('Stop Pressed');

        console.log('waiting for user input');
        await sleepForMs(100);
    }
}

//checks if completeExecution is true
const check_completeExecution = (): void => {
    //if playStatus.completeExe is not true, pause program when demanded. 
    if (!playStatus.completeExe) {
        //after the completion of an animation, check if program should be paused
        if (playStatus.noAnim || playStatus.oneCommand) {
            updateStepDescription('Prozessor angehalten');
            stepNumber_p.textContent = '0';
            playStatus.setPause();
            setButtonsPressed();
        }
    }
}

//adds the next command to the runningProgram_array
const pushNextCommand = (): void => {
    for (let i = 0; i < mc8Commands_array.length; i++) {
        if (mc8Commands_array[i].machineCommand_number === IR.value_number)
            runningProgram.push(mc8Commands_array[i].animationFunction_function);
    }

    runningProgram.push(get_next_command);
    return;
}

const getRegisterByName = (register_string: string): any => {
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
}

/**
 * The following functions cause instant textcontent changes on the DOM.
 */
const updateStepDescription = (description_string: string): void => {
    stepDescription_p.textContent = description_string;
}

const increaseStepNumber = (): void => {
    stepNumber_p.textContent = `${Number(stepNumber_p.textContent)+1}`;
}

//Displays the the assembler notation. If the register IR contains a command which is not valid, the function throws an error.
const updateAssemblerCommand = (): void => {
    for (let i = 0; i < mc8Commands_array.length; i++) {
        if (mc8Commands_array[i].machineCommand_number === IR.value_number) {
            assemblerCommand_p.textContent = mc8Commands_array[i].assemblerNotation_string;
            return;
        }
    }
    assemblerCommand_p.textContent = 'Befehl unbekannt';
    throw Error('Unknown command');
}

const updateRegister = (register_class: any, value_number: number): void => {
    register_class.update(value_number);
}

const updateHiRegister = (register_class: any, value_number: number): void => {
    register_class.updateHiByte(value_number);
}

const updateLoRegister = (register_class: any, value_number: number): void => {
    register_class.updateLoByte(value_number);
}

/**
 * The following functions are responsible for small animations that occur over and over again.
 */
const addYellowBackgroundForIDLETIME = async (htmlElement_htmlElement: HTMLElement): Promise < any > => {
    //If the sleep function throws an error the yellowBg must be removed.
    try {
        if (!playStatus.noAnim) {
            htmlElement_htmlElement.classList.add('yellowBg');
            await sleepForIDLETIME();
        } else {
            await sleepForNOANIMATIONIDLETIME();
        }
    } finally {
        htmlElement_htmlElement.classList.remove('yellowBg');
    }
}

const animateArrow = async (arrow_string: string): Promise < any > => {
    if (!playStatus.noAnim) {
        switch (arrow_string) {
            case 'PC':
                registerArrow_div.classList.add('PC_arrow');
                try {
                    await sleepForIDLETIME();
                } finally {
                    registerArrow_div.classList.remove('PC_arrow');
                }
                break;

            case 'ZR':
                registerArrow_div.classList.add('ZR_arrow');
                try {
                    await sleepForIDLETIME();
                } finally {
                    registerArrow_div.classList.remove('ZR_arrow');
                }
                break;

            case 'HL':
                registerArrow_div.classList.add('HL_arrow');
                try {
                    await sleepForIDLETIME();
                } finally {
                    registerArrow_div.classList.remove('HL_arrow');
                }
                break;

            case 'IX':
                registerArrow_div.classList.add('IX_arrow');
                try {
                    await sleepForIDLETIME();
                } finally {
                    registerArrow_div.classList.remove('IX_arrow');
                }
                break;

            case 'SP':
                registerArrow_div.classList.add('SP_arrow');
                try {
                    await sleepForIDLETIME();
                } finally {
                    registerArrow_div.classList.remove('SP_arrow');
                }
                break;

            case 'IR':
                irArrow_div.classList.add('ir_arrow');
                try {
                    await sleepForIDLETIME();
                } finally {
                    irArrow_div.classList.remove('ir_arrow');
                }
                break;

            case 'FLAGS':
                movingFlagsArrow_div.classList.add('flags_arrow');
                try {
                    await sleepForIDLETIME();
                } finally {
                    movingFlagsArrow_div.classList.remove('flags_arrow');
                }
                break;

            case 'cFlag':
                cFlagArrow_div.classList.add('cFlag_arrow');
                FLAGS.c_htmlElement.classList.add('yellowBg', 'borderBox');
                try {
                    await sleepForIDLETIME();
                } finally {
                    cFlagArrow_div.classList.remove('cFlag_arrow');
                    FLAGS.c_htmlElement.classList.remove('yellowBg', 'borderBox');
                }
                break;

            case 'jumpZ':
                checkJumpArrow_div.classList.add('jump_arrow');
                FLAGS.z_htmlElement.classList.add('yellowBg', 'borderBox');
                try {
                    await sleepForIDLETIME();
                } finally {
                    checkJumpArrow_div.classList.remove('jump_arrow');
                    FLAGS.z_htmlElement.classList.remove('yellowBg', 'borderBox');
                }
                break;

            case 'jumpC':
                checkJumpArrow_div.classList.add('jump_arrow');
                FLAGS.c_htmlElement.classList.add('yellowBg', 'borderBox');
                try {
                    await sleepForIDLETIME();
                } finally {
                    checkJumpArrow_div.classList.remove('jump_arrow');
                    FLAGS.c_htmlElement.classList.remove('yellowBg', 'borderBox');
                }
                break;

            case 'jumpS':
                checkJumpArrow_div.classList.add('jump_arrow');
                FLAGS.s_htmlElement.classList.add('yellowBg', 'borderBox');
                try {
                    await sleepForIDLETIME();
                } finally {
                    checkJumpArrow_div.classList.remove('jump_arrow');
                    FLAGS.s_htmlElement.classList.remove('yellowBg', 'borderBox');
                }
                break;

            case 'jumpP':
                checkJumpArrow_div.classList.add('jump_arrow');
                FLAGS.p_htmlElement.classList.add('yellowBg', 'borderBox');
                try {
                    await sleepForIDLETIME();
                } finally {
                    checkJumpArrow_div.classList.remove('jump_arrow');
                    FLAGS.p_htmlElement.classList.remove('yellowBg', 'borderBox');
                }
                break;

            default:
                break;
        }
    }
}

const animateStepDescriptionUpdate = async (description_string: string): Promise < any > => {
    updateStepDescription(description_string);
    increaseStepNumber();
    await addYellowBackgroundForIDLETIME(stepNumberBg_div);
}

const animateAssemlberCommandUpdate = async (): Promise < any > => {
    await addYellowBackgroundForIDLETIME(IR.htmlElement);
    await animateArrow('IR');
    updateAssemblerCommand();
    if (!playStatus.noAnim)
        await sleepForIDLETIME();
}

const animateRegisterUpdate = async (registerName_string, value_number): Promise < any > => {
    const reg = getRegisterByName(registerName_string);

    if (registerName_string.includes('hi')) {
        reg.updateHiByte(value_number);
        await addYellowBackgroundForIDLETIME(reg.hi_register.htmlElement);
    } else if (registerName_string.includes('lo')) {
        reg.updateLoByte(value_number);
        await addYellowBackgroundForIDLETIME(reg.lo_register.htmlElement);
    } else {
        updateRegister(reg, value_number);

        if (reg instanceof Register_x4) {
            addYellowBackgroundForIDLETIME(reg.hi_register.htmlElement);
            addYellowBackgroundForIDLETIME(reg.lo_register.htmlElement);
            await addYellowBackgroundForIDLETIME(reg.backgroundHtmlElement);
        } else {
            await addYellowBackgroundForIDLETIME(reg.htmlElement);
        }
    }
}

const animateIncreasePcByOne = async (): Promise < any > => {
    await animateStepDescriptionUpdate('Erhöhe Programmzähler um 1');
    await animateArrow('PC');
    await animateRegisterUpdate('PC', PC.value_number + 1);
}

/**
 * Transfer animations
 */

const updateMovingObjPosition = (movingObject_htmlElement: HTMLElement, x_number: number, y_number: number): void => {
    movingObject_htmlElement.style.top = String(100 / 32 * y_number) + "%";
    movingObject_htmlElement.style.left = String(100 / 46 * x_number) + "%";
}

const displayMovingObj = (pointsAtoB_array: Array < Point > , hexValue_string: string): void => {
    updateMovingObjPosition(movingObject_h2, pointsAtoB_array[0].x, pointsAtoB_array[0].y);
    movingObject_h2.textContent = hexValue_string;

    if (pointsAtoB_array[0].label === 'PC' || pointsAtoB_array[0].label === 'ZR' || pointsAtoB_array[0].label === 'IX' || pointsAtoB_array[0].label === 'HL' || pointsAtoB_array[0].label === 'SP')
        movingObject_h2.classList.add('rectangle4x2');
    else {
        movingObject_h2.classList.remove('rectangle4x2');
    }
    movingObject_h2.classList.add('displayGrid');
}

const animatePaintedPath = async (pointsAtoB_array: Array < Point > , origin_string: string, target_string: string): Promise < any > => {
    let pathElements = [];
    const coords = calcIntermediatePositions(pointsAtoB_array, 2);
    const xCoordinate = coords[0].flat(2);
    const yCoordinate = coords[1].flat(2);

    //fixPoints of PC,ZR,... are too far to the left due to the size of 4x2 --> Painted path has to be moved right by 1
    if (origin_string === 'PC' || origin_string === 'ZR' || origin_string === 'HL' || origin_string === 'SP' || origin_string === 'IX') {
        for (let i = 0; i < xCoordinate.length; i++) {
            xCoordinate[i] += 1;
        }
        if (target_string === 'ROM2') {
            xCoordinate.push(xCoordinate[xCoordinate.length - 1] - 1);
            yCoordinate.push(yCoordinate[yCoordinate.length - 1]);
        } else {
            xCoordinate.push(xCoordinate[xCoordinate.length - 1] - 1);
            yCoordinate.push(yCoordinate[yCoordinate.length - 1]);
        }
    }

    //create all PathElements
    for (let i = xCoordinate.length - 1; i >= 0; i--) {
        let ele = document.createElement('div');
        ele.style.left = `${100/46*(xCoordinate[i]+0.5)}%`;
        ele.style.top = `${100/32*(yCoordinate[i]+0.5)}%`;
        ele.classList.add('positionAbsolute', 'square1x1', 'pathElement', 'alignBg', 'rounded');
        pathElements.push(ele);
    }

    //create last PathElement (hex-number)
    let last = document.createElement('h2');
    last.style.left = `${100/46*(xCoordinate[xCoordinate.length-1])}%`;
    last.style.top = `${100/32*(yCoordinate[yCoordinate.length-1])}%`;
    last.textContent = movingObject_h2.textContent;
    last.classList.add('yellowBg', 'borderBox', 'square2x2', 'positionAbsolute', 'centered', 'rounded');
    if (origin_string === 'PC' || origin_string === 'ZR' || origin_string === 'HL' || origin_string === 'SP' || origin_string === 'IX')
        last.classList.add('rectangle4x2');

    pathElements.push(last);

    for (let i = 0; i < pathElements.length; i++) {
        mc8_div.appendChild(pathElements[i]);
    }


    try {
        await sleep(2000 / ANIMATION_SPEED);
    } finally {
        //remove 
        for (let i = 0; i < pathElements.length; i++) {
            pathElements[i].remove();
        }
        movingObject_h2.classList.remove('displayGrid');
    }
}

//updates the position of the movingObject depending on the speed(values: 1,2,3,4,6,12) => 12/values is always an integer
//e.g.  if the speed is 12 the position is only updated once(last coordinate of x12array)
//      if the speed is 3 the position is updated with every third coordinate,... 
const conditionalPositionUpdate = async (xCoordinates_array: number[], yCoordinates_array: number[], speed_number: number, movObject_htmlElement: HTMLElement): Promise < any > => {
    for (let j = 0; j < xCoordinates_array.length / speed_number; j++) {
        updateMovingObjPosition(movObject_htmlElement, xCoordinates_array[j * speed_number], yCoordinates_array[j * speed_number]);

        try {
            await sleep(1000 / FRAMES);
        } catch (e) {
            movingObject_h2.classList.remove('displayGrid');
            throw e;
        }
    }
    return true;
}

//animates the movement from on fixPoint to another one
const animateTransfer = async (origin_string: string, target_string: string, value_number = 0): Promise < any > => {
    let originInCPU = false;
    let targetInCPU = false;
    let alreadyReset = false;

    //only execute when Animation is required
    if (!playStatus.noAnim) {
        const pointsAtoB = getPointsAtoB(origin_string, target_string);
        let value_string: string;

        //convert value_number to hex_4digits if required
        if (value_number > 255 || target_string === 'ROM2' || target_string === 'RAM2' || target_string === 'ZR' || target_string === 'PC' || target_string === 'IX' || target_string === 'HL' || target_string === 'SP')
            value_string = convertNumberToHex_4digits(value_number);
        else
            value_string = convertNumberToHex_2digits(value_number);

        //update the moving Element
        displayMovingObj(pointsAtoB, value_string);
        const movingObjectCoordinates = calcIntermediatePositions(pointsAtoB, 12);

        //xCoordinate is a 2-dimensional-array which contains 12 coordinates per index
        //[Array(12), ..., Array(12)]
        const xCoordinate = movingObjectCoordinates[0];
        const yCoordinate = movingObjectCoordinates[1];


        //check if origin is inside CPU
        if (yCoordinate[0][0] < 24 && yCoordinate[0][0] > 3 && xCoordinate[0][0] > 9 && xCoordinate[0][0]) {
            originInCPU = true;
        }

        //check if target is inside CPU
        const lastPointY = yCoordinate[yCoordinate.length - 1][11];
        const lastPointX = xCoordinate[xCoordinate.length - 1][11];
        if (lastPointY < 24 && lastPointY > 3 && lastPointX > 9 && lastPointX) {
            targetInCPU = true;
        }

        //rocket Animation
        if (playStatus.rocketSpeed) {
            if (!originInCPU || !targetInCPU)
                DECODER.updateDOM();
            await animatePaintedPath(pointsAtoB, origin_string, target_string);
            if (!DECODER.isRamAccess && !DECODER.isIoAccess) {
                DECODER.resetDOM();
            }
        }
        //slow Animation
        else {
            //iterate through Coordinates
            for (let i = 0; i < movingObjectCoordinates[0].length; i++) {

                //if singleStep is pressed during the animation, remove movingObject and jump out of function
                if (playStatus.noAnim) {
                    movingObject_h2.classList.remove('displayGrid');
                    return true;
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
                await conditionalPositionUpdate(xCoordinate[i], yCoordinate[i], ANIMATION_SPEED, movingObject_h2);

            }
        }
        //remove Element when transfer was successful 
        movingObject_h2.classList.remove('displayGrid');
    }
    //noAnim
    else {
        if (!originInCPU || !targetInCPU)
            DECODER.updateDOM();
        await sleepForNOANIMATIONIDLETIME();
        DECODER.resetDOM();
    }
}

//reads a byte from the ROM or RAM. The addressRegister 
const animateReadFromMemoryInRegister = async (addressRegister_string: string, targetRegister_string: string): Promise < any > => {
    //get the address
    const address_number = getRegisterByName(addressRegister_string).value_number;

    //update decoder without displaying  
    DECODER.update(1, 0, 0, 1, address_number);
    await animateArrow(addressRegister_string);

    //determine ROM or RAM or IOs
    if (address_number < 8192) {
        await animateTransfer(addressRegister_string, 'ROM2', address_number);
        await animateTransfer(ROM.getElementId(address_number), targetRegister_string, ROM.getValue(address_number));
        await animateRegisterUpdate(targetRegister_string, ROM.getValue(address_number));
    } else if (address_number >= RAM.startAddressRam_number && address_number < RAM.startAddressRam_number + RAM.size_number) {
        RAM.updateVariableElements(address_number);
        await animateTransfer(addressRegister_string, 'RAM2', address_number);
        await animateTransfer(RAM.getRamElementId(address_number), targetRegister_string, RAM.getValue(address_number));
        await animateRegisterUpdate(targetRegister_string, RAM.getValue(address_number));
    } else if (!IO1.ioMapped_boolean) {
        if (address_number === IO1.address_number) {
            await animateTransfer(addressRegister_string, 'DEC_UPDATE', address_number);
            await animateIoUserInput('IO1');
            await animateTransfer('IO1', 'A', IO1.value_number);
            await animateRegisterUpdate('A', IO1.value_number);
        } else if (address_number === IO2.address_number) {
            await animateTransfer(addressRegister_string, 'DEC_UPDATE', address_number);
            await animateIoUserInput('IO2');
            await animateTransfer('IO2', 'A', IO2.value_number);
            await animateRegisterUpdate('A', IO2.value_number);
        } else if (address_number === IO3.address_number) {
            await animateTransfer(addressRegister_string, 'DEC_UPDATE', address_number);
            await animateIoUserInput('IO2');
            await animateTransfer('IO2', 'A', IO3.value_number);
            await animateRegisterUpdate('A', IO3.value_number);
        }
    }
    //Neither ROM or RAM  or IOs
    else {
        //The address of the addressRegister is unknown.
        //the following code wont be executed completely, because the decoder will interrupt execution
        await animateTransfer(addressRegister_string, 'DEC_UPDATE', address_number);
    }
    DECODER.resetDOM();
}

const animateWriteToMemoryFromRegister = async (addressRegister_string: string, dataRegister_string: string): Promise < any > => {
    let ramEle_htmlElement: HTMLElement;

    //get address
    const address_number = getRegisterByName(addressRegister_string).value_number;

    //get data
    const register_class = getRegisterByName(dataRegister_string);
    let data_number = register_class.value_number;

    if (dataRegister_string.includes('hi'))
        data_number = register_class.hiValue_number;
    if (dataRegister_string.includes('lo'))
        data_number = register_class.loValue_number;

    //update decoder, without displaying it
    DECODER.update(0, 1, 0, 1, address_number);

    await animateArrow(addressRegister_string);

    //determine ROM or RAM
    if (address_number < 8192) {
        //wont be executed completely, because the decoder will interrupt execution 
        await animateTransfer(addressRegister_string, 'ROM2', address_number);
    } else if (address_number >= RAM.startAddressRam_number && address_number < RAM.startAddressRam_number + RAM.size_number) {
        ramEle_htmlElement = getHtmlElement(RAM.getRamElementId(address_number));
        RAM.updateVariableElements(address_number);
        await animateTransfer(addressRegister_string, 'RAM2', address_number);
        if (!playStatus.noAnim)
            ramEle_htmlElement.classList.add('yellowBg', 'borderBox');
        try {
            await animateTransfer(dataRegister_string, RAM.getRamElementId(address_number), data_number);
        } catch (e) {
            ramEle_htmlElement.classList.remove('yellowBg', 'borderBox');
            throw e;
        }
    }
    //Neither ROM or RAM
    else {
        //wont be executed completely, because the decoder will interrupt execution 
        await animateTransfer(addressRegister_string, 'RAM2', address_number);
    }
    RAM.updateElement(address_number, data_number);
    try {
        await addYellowBackgroundForIDLETIME(document.getElementById(RAM.getRamElementId(address_number)));
    } finally {
        ramEle_htmlElement.classList.remove('borderBox', 'yellowBg');
        DECODER.resetDOM();
    }
}

/**
 * ALU animations
 */
const setMovingAluElements = (twoMovingAluElements_boolean: boolean): void => {
    movingAlu1.textContent = ALU1.htmlElement.textContent;
    movingAlu2.textContent = ALU2.htmlElement.textContent;
    movingAlu1.classList.add('displayGrid');
    if (twoMovingAluElements_boolean)
        movingAlu2.classList.add('displayGrid');
}

const resetMovingAluElements = (): void => {
    movingAlu1.classList.remove('displayGrid');
    movingAlu2.classList.remove('displayGrid');

    movingAlu1.style.top = `${100/32*6}%`;
    movingAlu1.style.left = `${100/46*24}%`;

    movingAlu2.style.top = `${100/32*6}%`;
    movingAlu2.style.left = `${100/46*30}%`;
}
resetMovingAluElements();

//animation of ALU-usage
const animateALU = async (aluOUT_number: number, twoMovingAluElements_boolean: boolean, cFlag_boolean: boolean, saveToRegister_string: string): Promise < any > => {
    if (!playStatus.noAnim) {
        const xCoordinateAlu1 = [24];
        const xCoordinateAlu2 = [30];
        const yCoordinate = [6];
        for (let j = 0; j < 30; j++) {
            xCoordinateAlu1.push(xCoordinateAlu1[j] + 0.1);
            xCoordinateAlu2.push(xCoordinateAlu2[j] - 0.1);
            yCoordinate.push(yCoordinate[j] + 1 / 7.5);
        }

        setMovingAluElements(twoMovingAluElements_boolean);
        ALU1.htmlElement.textContent = '';
        ALU2.htmlElement.textContent = '';

        try {
            if (cFlag_boolean)
                await animateArrow('cFlag');

            await sleepForIDLETIME();

            for (let i = 0; i < xCoordinateAlu1.length; i++) {
                updateMovingObjPosition(movingAlu1, xCoordinateAlu1[i], yCoordinate[i]);
                updateMovingObjPosition(movingAlu2, xCoordinateAlu2[i], yCoordinate[i]);
                await sleep(1000 / FRAMES);
            }
            resetMovingAluElements();
            await animateRegisterUpdate('ALUOUT', aluOUT_number);
        } finally {
            resetMovingAluElements();
        }
        ALUOUT.htmlElement.classList.add('yellowBg');
    } else { //noAnim
        await animateRegisterUpdate('ALUOUT', aluOUT_number);
        ALU1.htmlElement.textContent = '';
        ALU2.htmlElement.textContent = '';
    }

    try {
        await animateStepDescriptionUpdate('Setze die Flags');
        await animateSetFlags();
        if (saveToRegister_string)
            await animateStepDescriptionUpdate('Speichere das Ergebnis');
    } finally {
        ALUOUT.htmlElement.classList.remove('yellowBg');
        ALUOUT.htmlElement.textContent = '';
    }
    if (saveToRegister_string !== '') {
        await animateTransfer('ALUOUT', saveToRegister_string, aluOUT_number);
        await animateRegisterUpdate(saveToRegister_string, aluOUT_number);
    }
}

const animateHlBcAddition = async (aluOUT_number: number, stepOne_boolean: boolean): Promise < any > => {
    if (!playStatus.noAnim) {
        const xCoordinateAlu1 = [24];
        const xCoordinateAlu2 = [30];
        const yCoordinate = [6];
        for (let j = 0; j < 30; j++) {
            xCoordinateAlu1.push(xCoordinateAlu1[j] + 0.1);
            xCoordinateAlu2.push(xCoordinateAlu2[j] - 0.1);
            yCoordinate.push(yCoordinate[j] + 1 / 7.5);
        }

        setMovingAluElements(true);
        ALU1.htmlElement.textContent = '';
        ALU2.htmlElement.textContent = '';

        try {
            if (!stepOne_boolean)
                await animateArrow('cFlag');
            await sleepForIDLETIME();

            for (let i = 0; i < xCoordinateAlu1.length; i++) {
                updateMovingObjPosition(movingAlu1, xCoordinateAlu1[i], yCoordinate[i]);
                updateMovingObjPosition(movingAlu2, xCoordinateAlu2[i], yCoordinate[i]);
                await sleep(1000 / FRAMES);
            }
            resetMovingAluElements();
            await animateRegisterUpdate('ALUOUT', aluOUT_number);
        } finally {
            resetMovingAluElements();
        }
        ALUOUT.htmlElement.classList.add('yellowBg');
    } else { //noAnim
        await animateRegisterUpdate('ALUOUT', aluOUT_number);
        ALU1.htmlElement.textContent = '';
        ALU2.htmlElement.textContent = '';
    }

    if (stepOne_boolean) {
        try {
            await animateStepDescriptionUpdate('Setze Carry-Flag');
            FLAGS.z_number = '-';
            FLAGS.s_number = '-';
            FLAGS.p_number = '-';
            await animateSetFlags();
            await animateStepDescriptionUpdate('Speichere das Ergebnis in L');
        } finally {
            ALUOUT.htmlElement.classList.remove('yellowBg');
            ALUOUT.htmlElement.textContent = '';
        }
        await animateTransfer('ALUOUT', 'HL_lo', aluOUT_number);
        await animateRegisterUpdate('HL_lo', aluOUT_number);
    } else {
        try {
            await animateStepDescriptionUpdate('Setze Carry-Flag');
            FLAGS.z_number = '-';
            FLAGS.s_number = '-';
            FLAGS.p_number = '-';
            await animateSetFlags();
            await animateStepDescriptionUpdate('Speichere das Ergebnis in H');
        } finally {
            ALUOUT.htmlElement.classList.remove('yellowBg');
            ALUOUT.htmlElement.textContent = '';
        }
        await animateTransfer('ALUOUT', 'HL_hi', aluOUT_number);
        await animateRegisterUpdate('HL_hi', aluOUT_number);
    }
}

//animation of setting flags
const animateSetFlags = async (): Promise < any > => {
    if (!playStatus.noAnim) {
        await animateArrow('FLAGS');
        movingFlags_div.children[0].textContent = FLAGS.c_number;
        movingFlags_div.children[1].textContent = FLAGS.z_number;
        movingFlags_div.children[2].textContent = FLAGS.p_number;
        movingFlags_div.children[3].textContent = FLAGS.s_number;
        movingFlags_div.classList.add('displayGrid');
        try {
            await sleepForIDLETIME();
            for (let i = 0; i < 21; i++) {
                movingFlags_div.style.top = `${100/32*(8-i/20)}%`;
                await sleep(1000 / FRAMES);
            }
            await sleepForIDLETIME();
        } finally {
            movingFlags_div.classList.remove('displayGrid');
            movingFlags_div.style.top = `${100/32*8}%`;
        }
    }
    FLAGS.updateDOM();
}

const animateCheckJump = async (flag_string: string): Promise < any > => {
    switch (flag_string) {
        case 'zFlag':
            await animateArrow('jumpZ');
            break;

        case 'cFlag':
            await animateArrow('jumpC');
            break;

        case 'sFlag':
            await animateArrow('jumpS');
            break;

        case 'pFlag':
            await animateArrow('jumpP');
            break;

        default:
            break;
    }
}

/**
 * IO animations
 */

const checkCorrectIoInput = (input_string: string): boolean => {
    if (checkValidHex(input_string)) {
        if (input_string.length > 2) {
            return false;
        }
        return true;
    }
    return false;
}

//animation of IO-input
const animateIoUserInput = async (IoName_string: string): Promise < any > => {
    let ioInputWindow: HTMLElement;
    let ioInput: any;
    let check = true;
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
    try {
        while (check) {
            pause();
            await checkPlayPressed();

            if (ioInput.value === '')
                ioInput.value = 'FF';
            if (checkCorrectIoInput(ioInput.value)) {
                check = false;
            } else {
                if (IoName_string === 'IO1') {
                    document.getElementById('io1InputInfo_p').textContent = 'Das ist keine gültige zweistellige Hex-Zahl. Verwenden Sie nur die Zahlen  0-9 und die Zeichen A-F!';
                } else if (IoName_string === 'IO2') {
                    document.getElementById('io2InputInfo_p').textContent = 'Das ist keine gültige zweistellige Hex-Zahl. Verwenden Sie nur die Zahlen  0-9 und die Zeichen A-F!';
                } else if (IoName_string === 'IO3') {
                    document.getElementById('io3InputInfo_p').textContent = 'Das ist keine gültige zweistellige Hex-Zahl. Verwenden Sie nur die Zahlen  0-9 und die Zeichen A-F!';
                }
            }
        }
    } finally {
        ioInputWindow.classList.remove('displayGrid');
        document.getElementById('io1InputInfo_p').textContent = 'Geben Sie eine zweistellige Hexadezimalzahl ein!';
        document.getElementById('io2InputInfo_p').textContent = 'Geben Sie eine zweistellige Hexadezimalzahl ein!';
        document.getElementById('io3InputInfo_p').textContent = 'Geben Sie eine zweistellige Hexadezimalzahl ein!';
        ioInputDisplayed_boolean = false;
    }


    await animateRegisterUpdate(IoName_string, convertHexToNumber(ioInput.value));
    ioInput.value = '';
}

const animateReadFromIo = async () => {
    if (IO1.ioMapped_boolean) {
        DECODER.update(1, 0, 1, 0, ZR.loValue_number);
        await animateTransfer('ZR', 'DEC_UPDATE', ZR.loValue_number);

        if (IO1.address_number === IO2.address_number) {
            if (!IO1.in_boolean) {
                await animateTransfer('A', 'IO2', A.value_number);
                await animateRegisterUpdate('IO2', A.value_number);
            } else {
                await animateTransfer('A', 'IO1', A.value_number);
                await animateRegisterUpdate('IO1', A.value_number);
            }
        } else if (IO3.address_number === IO2.address_number) {
            if (!IO3.in_boolean) {
                await animateTransfer('A', 'IO2', A.value_number);
                await animateRegisterUpdate('IO2', A.value_number);
            } else {
                await animateTransfer('A', 'IO3', A.value_number);
                await animateRegisterUpdate('IO3', A.value_number);
            }
        } else if (IO1.address_number === IO3.address_number) {
            if (!IO1.in_boolean) {
                await animateTransfer('A', 'IO3', A.value_number);
                await animateRegisterUpdate('IO3', A.value_number);
            } else {
                await animateTransfer('A', 'IO1', A.value_number);
                await animateRegisterUpdate('IO1', A.value_number);
            }
        } else if (ZR.loValue_number === IO1.address_number) {
            await animateIoUserInput('IO1');
            await animateTransfer('IO1', 'A', IO1.value_number);
            await animateRegisterUpdate('A', IO1.value_number);
        } else if (ZR.loValue_number === IO2.address_number) {
            await animateIoUserInput('IO2');
            await animateTransfer('IO2', 'A', IO2.value_number);
            await animateRegisterUpdate('A', IO2.value_number);
        } else if (ZR.loValue_number === IO3.address_number) {
            await animateIoUserInput('IO3');
            await animateTransfer('IO3', 'A', IO3.value_number);
            await animateRegisterUpdate('A', IO3.value_number);
        }
        DECODER.resetDOM();
    } else {
        DECODER.update(1, 0, 1, 0, ZR.value_number);
        await animateTransfer('ZR', 'DEC_UPDATE', ZR.value_number);

        if (IO1.address_number === IO2.address_number) {
            if (!IO1.in_boolean) {
                await animateTransfer('A', 'IO2', A.value_number);
                await animateRegisterUpdate('IO2', A.value_number);
            } else {
                await animateTransfer('A', 'IO1', A.value_number);
                await animateRegisterUpdate('IO1', A.value_number);
            }
        } else if (IO3.address_number === IO2.address_number) {
            if (!IO3.in_boolean) {
                await animateTransfer('A', 'IO2', A.value_number);
                await animateRegisterUpdate('IO2', A.value_number);
            } else {
                await animateTransfer('A', 'IO3', A.value_number);
                await animateRegisterUpdate('IO3', A.value_number);
            }
        } else if (IO1.address_number === IO3.address_number) {
            if (!IO1.in_boolean) {
                await animateTransfer('A', 'IO3', A.value_number);
                await animateRegisterUpdate('IO3', A.value_number);
            } else {
                await animateTransfer('A', 'IO1', A.value_number);
                await animateRegisterUpdate('IO1', A.value_number);
            }
        } else if (ZR.value_number === IO1.address_number) {
            await animateIoUserInput('IO1');
            await animateTransfer('IO1', 'A', IO1.value_number);
            await animateRegisterUpdate('A', IO1.value_number);
        } else if (ZR.value_number === IO2.address_number) {
            await animateIoUserInput('IO2');
            await animateTransfer('IO2', 'A', IO2.value_number);
            await animateRegisterUpdate('A', IO2.value_number);
        } else if (ZR.value_number === IO3.address_number) {
            await animateIoUserInput('IO3');
            await animateTransfer('IO3', 'A', IO3.value_number);
            await animateRegisterUpdate('A', IO3.value_number);
        }
        DECODER.resetDOM();
    }
}

const animateWriteToIo = async () => {

    DECODER.update(0, 1, 1, 0, ZR.loValue_number);
    await animateTransfer('ZR', 'DEC_UPDATE', ZR.loValue_number);

    if (IO1.address_number === IO2.address_number) {
        if (IO1.in_boolean) {
            await animateTransfer('A', 'IO2', A.value_number);
            await animateRegisterUpdate('IO2', A.value_number);
        } else {
            await animateTransfer('A', 'IO1', A.value_number);
            await animateRegisterUpdate('IO1', A.value_number);
        }
    } else if (IO3.address_number === IO2.address_number) {
        if (IO3.in_boolean) {
            await animateTransfer('A', 'IO2', A.value_number);
            await animateRegisterUpdate('IO2', A.value_number);
        } else {
            await animateTransfer('A', 'IO3', A.value_number);
            await animateRegisterUpdate('IO3', A.value_number);
        }
    } else if (IO1.address_number === IO3.address_number) {
        if (IO1.in_boolean) {
            await animateTransfer('A', 'IO3', A.value_number);
            await animateRegisterUpdate('IO3', A.value_number);
        } else {
            await animateTransfer('A', 'IO1', A.value_number);
            await animateRegisterUpdate('IO1', A.value_number);
        }
    } else if (ZR.loValue_number === IO1.address_number) {
        await animateTransfer('A', 'IO1', A.value_number);
        await animateRegisterUpdate('IO1', A.value_number);
    } else if (ZR.loValue_number === IO2.address_number) {
        await animateTransfer('A', 'IO2', A.value_number);
        await animateRegisterUpdate('IO2', A.value_number);
    } else if (ZR.loValue_number === IO3.address_number) {
        await animateTransfer('A', 'IO3', A.value_number);
        await animateRegisterUpdate('IO3', A.value_number);
    }
    DECODER.resetDOM();
}

/**
 * Composition of animations which occurs often
 */

const animateloadOperands = async (register1_string: string, register2_string: string): Promise < any > => {
    const reg1_class = getRegisterByName(register1_string);
    const reg2_class = getRegisterByName(register2_string);

    await animateStepDescriptionUpdate('Hole den 1. Operanden');
    await animateTransfer(register1_string, 'ALU1', reg1_class.value_number);
    await animateRegisterUpdate('ALU1', reg1_class.value_number);
    await animateStepDescriptionUpdate('Hole den 2. Operanden');
    await animateTransfer(register2_string, 'ALU2', reg2_class.value_number);
    await animateRegisterUpdate('ALU2', reg2_class.value_number);
}

const animateloadAddressBytesInZr = async (): Promise < any > => {
    await animateStepDescriptionUpdate('Hole das niederwertige Adressbyte');
    await animateReadFromMemoryInRegister('PC', 'ZR_lo');
    await animateIncreasePcByOne();
    await animateStepDescriptionUpdate('Hole das höherwertige Adressbyte');
    await animateReadFromMemoryInRegister('PC', 'ZR_hi');
    await animateIncreasePcByOne();
}

/**
 * Animation of the mc8-commands
 */
const get_next_command = async () => {
    stepNumber_p.textContent = '0';
    assemblerCommand_p.textContent = '';
    IR.htmlElement.textContent = '';

    await animateStepDescriptionUpdate('Hole den nächsten Befehl');
    await animateReadFromMemoryInRegister('PC', 'IR');
    await animateIncreasePcByOne();
    await animateStepDescriptionUpdate('Erkenne den Befehl');
    await animateAssemlberCommandUpdate();
    pushNextCommand();
    return true;

}

const nop = async () => {
    if (playStatus.noAnim)
        await sleepForNOANIMATIONIDLETIME();
    else
        await sleepForIDLETIME();
    check_completeExecution();
}

const halt = async () => {
    updateStepDescription('Prozessor angehalten');
    stepNumber_p.textContent = '0';
    pause();
    check_completeExecution();
}

const movAdat_8 = async () => {
    await animateStepDescriptionUpdate('Hole den Parameter');
    await animateReadFromMemoryInRegister('PC', 'A');
    await animateIncreasePcByOne();
    check_completeExecution();
    return true;

}

const movBdat_8 = async () => {
    await animateStepDescriptionUpdate('Hole den Parameter');
    await animateReadFromMemoryInRegister('PC', 'B');
    await animateIncreasePcByOne();
    check_completeExecution();
    return true;
}

const movCdat_8 = async () => {
    await animateStepDescriptionUpdate('Hole den Parameter');
    await animateReadFromMemoryInRegister('PC', 'C');
    await animateIncreasePcByOne();
    check_completeExecution();
    return true;
}

const twoByteIX = async () => {
    await animateStepDescriptionUpdate('Hole das 2. Byte des Befehls');
    await animateReadFromMemoryInRegister('PC', 'IR');
    await animateIncreasePcByOne();
    await animateStepDescriptionUpdate('Erkenne den Befehl');
    await addYellowBackgroundForIDLETIME(IR.htmlElement);
    await animateArrow('IR');


    if (IR.value_number === 0b00100001) {
        assemblerCommand_p.textContent = 'MOV IX, dat_16';
        if (!playStatus.noAnim)
            await sleepForIDLETIME();
        await animateStepDescriptionUpdate('Hole das niederwertige Byte');
        await animateReadFromMemoryInRegister('PC', 'IX_lo');
        await animateIncreasePcByOne();
        await animateStepDescriptionUpdate('Hole das höherwertige Byte');
        await animateReadFromMemoryInRegister('PC', 'IX_hi');
        await animateIncreasePcByOne();
    } else if (IR.value_number === 0b00101010) {
        assemblerCommand_p.textContent = 'MOV IX, label';
        await animateloadAddressBytesInZr();
        await animateStepDescriptionUpdate('Hole das niederwertige Byte');
        await animateReadFromMemoryInRegister('ZR', 'IX_lo');
        await animateStepDescriptionUpdate('Erhöhe die Adresse um 1');
        await animateArrow('ZR');
        await animateRegisterUpdate('ZR', ZR.value_number + 1);
        await animateStepDescriptionUpdate('Hole das höherwertige Byte');
        await animateReadFromMemoryInRegister('ZR', 'IX_hi');
    } else if (IR.value_number === 0b00100010) {
        assemblerCommand_p.textContent = 'MOV label, IX';
        await animateloadAddressBytesInZr();
        await animateStepDescriptionUpdate('Schreibe das niederwertige Byte');
        await animateWriteToMemoryFromRegister('ZR', 'IX_lo');
        await animateStepDescriptionUpdate('Erhöhe die Adresse um 1');
        await animateArrow('ZR');
        await animateRegisterUpdate('ZR', ZR.value_number + 1);
        await animateStepDescriptionUpdate('Schreibe das höherwertige Byte');
        await animateWriteToMemoryFromRegister('ZR', 'IX_hi');

    } else if (IR.value_number === 0b00100011) {
        assemblerCommand_p.textContent = 'INC IX';
        await animateStepDescriptionUpdate('Erhöhe die Adresse um 1');
        await animateArrow('IX');
        await animateRegisterUpdate('IX', IX.value_number + 1);
    } else if (IR.value_number === 0b00101011) {
        assemblerCommand_p.textContent = 'DEC IX';
        await animateStepDescriptionUpdate('Verringere die Adresse um 1');
        await animateArrow('IX');
        await animateRegisterUpdate('IX', IX.value_number - 1);
    } else if (IR.value_number === 0b11101001) {
        assemblerCommand_p.textContent = 'JP [IX]';

    }

    check_completeExecution();
    return true;
}

const movHLdat_16 = async () => {
    await animateStepDescriptionUpdate('Hole das niederwertige Byte');
    await animateReadFromMemoryInRegister('PC', 'HL_lo');
    await animateIncreasePcByOne();
    await animateStepDescriptionUpdate('Hole das höherwertige Byte');
    await animateReadFromMemoryInRegister('PC', 'HL_hi');
    await animateIncreasePcByOne();
    check_completeExecution();
}

const movSPdat_16 = async () => {
    await animateStepDescriptionUpdate('Hole das niederwertige Byte');
    await animateReadFromMemoryInRegister('PC', 'SP_lo');
    await animateIncreasePcByOne();
    await animateStepDescriptionUpdate('Hole das höherwertige Byte');
    await animateReadFromMemoryInRegister('PC', 'SP_hi');
    await animateIncreasePcByOne();
    check_completeExecution();
}

const movAB = async () => {
    await animateStepDescriptionUpdate('Kopiere die Daten');
    await animateTransfer('B', 'A', B.value_number);
    await animateRegisterUpdate('A', B.value_number);
    check_completeExecution();
}

const movAC = async () => {
    await animateStepDescriptionUpdate('Kopiere die Daten');
    await animateTransfer('C', 'A', C.value_number);
    await animateRegisterUpdate('A', C.value_number);
    check_completeExecution();
}

const movBA = async () => {
    await animateStepDescriptionUpdate('Kopiere die Daten');
    await animateTransfer('A', 'B', A.value_number);
    await animateRegisterUpdate('B', A.value_number);
    check_completeExecution();
}

const movBC = async () => {
    await animateStepDescriptionUpdate('Kopiere die Daten');
    await animateTransfer('C', 'B', C.value_number);
    await animateRegisterUpdate('B', C.value_number);
    check_completeExecution();
}

const movCA = async () => {
    await animateStepDescriptionUpdate('Kopiere die Daten');
    await animateTransfer('A', 'C', A.value_number);
    await animateRegisterUpdate('C', A.value_number);
    check_completeExecution();
}

const movCB = async () => {
    await animateStepDescriptionUpdate('Kopiere die Daten');
    await animateTransfer('B', 'C', B.value_number);
    await animateRegisterUpdate('C', B.value_number);
    check_completeExecution();
}

const movALabel = async () => {
    await animateloadAddressBytesInZr();
    await animateStepDescriptionUpdate('Hole die Daten');
    await animateReadFromMemoryInRegister('ZR', 'A');
    check_completeExecution();
}

const movLabelA = async () => {
    await animateloadAddressBytesInZr();
    await animateStepDescriptionUpdate('Schreibe die Daten');
    await animateWriteToMemoryFromRegister('ZR', 'A');
    check_completeExecution();
}

const movHlLabel = async () => {
    await animateloadAddressBytesInZr();
    await animateStepDescriptionUpdate('Hole das niederwertige Byte');
    await animateReadFromMemoryInRegister('ZR', 'HL_lo');

    await animateStepDescriptionUpdate('Erhöhe die Adresse um 1');
    await animateArrow('ZR');
    await animateRegisterUpdate('ZR', ZR.value_number + 1);
    await animateStepDescriptionUpdate('Hole das höherwertige Byte');
    await animateReadFromMemoryInRegister('ZR', 'HL_hi');
    check_completeExecution();
}

const movLabelHl = async () => {
    await animateloadAddressBytesInZr();
    await animateStepDescriptionUpdate('Schreibe das niederwertige Byte');
    await animateWriteToMemoryFromRegister('ZR', 'HL_lo');

    await animateStepDescriptionUpdate('Erhöhe die Adresse um 1');
    await animateArrow('ZR');
    await animateRegisterUpdate('ZR', ZR.value_number + 1);
    await animateStepDescriptionUpdate('Schreibe das höherwertige Byte');
    await animateWriteToMemoryFromRegister('ZR', 'HL_hi');
    check_completeExecution();
}

const movAHl = async () => {
    await animateStepDescriptionUpdate('Hole die Daten');
    await animateReadFromMemoryInRegister('HL', 'A');
    check_completeExecution();
}

const movHlA = async () => {
    await animateStepDescriptionUpdate('Schreibe die Daten');
    await animateWriteToMemoryFromRegister('HL', 'A');
    check_completeExecution();
}

const push = async () => {
    await animateStepDescriptionUpdate('Erhöhe den Stackpointer um 1');
    await animateArrow('SP');
    await animateRegisterUpdate('SP', SP.value_number - 1);
    await animateStepDescriptionUpdate('Schreibe den Akku');
    await animateWriteToMemoryFromRegister('SP', 'A');
    await animateStepDescriptionUpdate('Erhöhe den Stackpointer um 1');
    await animateArrow('SP');
    await animateRegisterUpdate('SP', SP.value_number - 1);
    await animateStepDescriptionUpdate('Schreibe die Flags');
    await animateWriteToMemoryFromRegister('SP', 'FLAGS');
    check_completeExecution();
}

const pop = async () => {
    await animateStepDescriptionUpdate('Hole die Flags');
    await animateReadFromMemoryInRegister('SP', 'FLAGS');
    await animateStepDescriptionUpdate('Verringer den Stackpointer um 1');
    await animateArrow('SP');
    await animateRegisterUpdate('SP', SP.value_number + 1);
    await animateStepDescriptionUpdate('Hole den Akku');
    await animateReadFromMemoryInRegister('SP', 'A');
    await animateStepDescriptionUpdate('Verringer den Stackpointer um 1');
    await animateArrow('SP');
    await animateRegisterUpdate('SP', SP.value_number + 1);
    check_completeExecution();
}

const inA = async () => {
    await animateStepDescriptionUpdate('Hole das Adressbyte');
    await animateReadFromMemoryInRegister('PC', 'ZR_lo');
    await animateIncreasePcByOne();
    await animateStepDescriptionUpdate('Hole die Daten');
    await animateReadFromIo();
    check_completeExecution();
}

const outA = async () => {
    await animateStepDescriptionUpdate('Hole das Adressbyte');
    await animateReadFromMemoryInRegister('PC', 'ZR_lo');
    await animateIncreasePcByOne();
    await animateStepDescriptionUpdate('Schreibe die Daten');
    await animateWriteToIo();
    check_completeExecution();
}

const incA = async () => {
    await animateStepDescriptionUpdate('Hole den Operanden');
    await animateTransfer('A', 'ALU1', A.value_number);
    await animateRegisterUpdate('ALU1', A.value_number);
    await animateStepDescriptionUpdate('Erhöhe den Operanden um 1');
    const result = incBinary(A.value_number);
    await animateALU(result, false, false, 'A');
    check_completeExecution();
}

const incB = async () => {
    await animateStepDescriptionUpdate('Hole den Operanden');
    await animateTransfer('B', 'ALU1', B.value_number);
    await animateRegisterUpdate('ALU1', B.value_number);
    await animateStepDescriptionUpdate('Erhöhe den Operanden um 1');
    const result = incBinary(B.value_number);
    await animateALU(result, false, false, 'B');
    check_completeExecution();
}

const incC = async () => {
    await animateStepDescriptionUpdate('Hole den Operanden');
    await animateTransfer('C', 'ALU1', C.value_number);
    await animateRegisterUpdate('ALU1', C.value_number);
    await animateStepDescriptionUpdate('Erhöhe den Operanden um 1');
    const result = incBinary(C.value_number);
    await animateALU(result, false, false, 'C');
    check_completeExecution();
}

const incHl = async () => {
    await animateStepDescriptionUpdate('Erhöhe die Adresse um 1');
    await animateArrow('HL');
    await animateRegisterUpdate('HL', HL.value_number + 1);
    check_completeExecution();
}
//incIX see twoByteIx

const decA = async () => {
    await animateStepDescriptionUpdate('Hole den Operanden');
    await animateTransfer('A', 'ALU1', A.value_number);
    await animateRegisterUpdate('ALU1', A.value_number);
    await animateStepDescriptionUpdate('Verringere den Operanden um 1');
    const result = decBinary(A.value_number);
    await animateALU(result, false, false, 'A');
    check_completeExecution();
}

const decB = async () => {
    await animateStepDescriptionUpdate('Hole den Operanden');
    await animateTransfer('B', 'ALU1', B.value_number);
    await animateRegisterUpdate('ALU1', B.value_number);
    await animateStepDescriptionUpdate('Verringere den Operanden um 1');
    const result = decBinary(B.value_number);
    await animateALU(result, false, false, 'B');
    check_completeExecution();
}

const decC = async () => {
    await animateStepDescriptionUpdate('Hole den Operanden');
    await animateTransfer('C', 'ALU1', C.value_number);
    await animateRegisterUpdate('ALU1', C.value_number);
    await animateStepDescriptionUpdate('Verringere den Operanden um 1');
    const result = decBinary(C.value_number);
    await animateALU(result, false, false, 'C');
    check_completeExecution();
}

const decHl = async () => {
    await animateStepDescriptionUpdate('Verringere die Adresse um 1');
    await animateArrow('HL');
    await animateRegisterUpdate('HL', HL.value_number - 1);
    check_completeExecution();
}

const addA = async () => {
    await animateloadOperands('A', 'A');
    await animateStepDescriptionUpdate('Addiere die Operanden');

    const result = addBinary(A.value_number, A.value_number, false);
    await animateALU(result, true, false, 'A');
    check_completeExecution();
}

const addB = async () => {
    await animateloadOperands('A', 'B');
    await animateStepDescriptionUpdate('Addiere die Operanden');

    const result = addBinary(A.value_number, B.value_number, false);
    await animateALU(result, true, false, 'A');
    check_completeExecution();
}

const addC = async () => {
    await animateloadOperands('A', 'C');
    await animateStepDescriptionUpdate('Addiere die Operanden');

    const result = addBinary(A.value_number, C.value_number, false);
    await animateALU(result, true, false, 'A');
    check_completeExecution();
}

const addDat_8 = async () => {
    await animateStepDescriptionUpdate('Hole den 1. Operanden');
    await animateTransfer('A', 'ALU1', A.value_number);
    await animateRegisterUpdate('ALU1', A.value_number);
    await animateStepDescriptionUpdate('Hole den 2. Operanden');
    await animateReadFromMemoryInRegister('PC', 'ALU2');
    await animateIncreasePcByOne();
    await animateStepDescriptionUpdate('Addiere die Operanden');

    const result = addBinary(A.value_number, ALU2.value_number, false);
    await animateALU(result, true, false, 'A');
    check_completeExecution();
}

const addHlBc = async () => {
    await animateStepDescriptionUpdate('Hole das L-Register (HL_LO)');
    await animateTransfer('HL_lo', 'ALU1', HL.loValue_number);
    await animateRegisterUpdate('ALU1', HL.loValue_number);
    await animateStepDescriptionUpdate('Hole das C-Register');
    await animateTransfer('C', 'ALU2', C.value_number);
    await animateRegisterUpdate('ALU2', C.value_number);
    await animateStepDescriptionUpdate('Addiere die Operanden');

    let result = addBinary(HL.loValue_number, C.value_number, false);
    await animateHlBcAddition(result, true);

    await animateStepDescriptionUpdate('Hole das H-Register (HL_HI)');
    await animateTransfer('HL_hi', 'ALU1', HL.hiValue_number);
    await animateRegisterUpdate('ALU1', HL.hiValue_number);
    await animateStepDescriptionUpdate('Hole das B-Register');
    await animateTransfer('B', 'ALU2', B.value_number);
    await animateRegisterUpdate('ALU2', B.value_number);
    await animateStepDescriptionUpdate('Addiere die Operanden');
    result = addBinary(HL.hiValue_number, B.value_number + FLAGS.c_number, false);
    await animateHlBcAddition(result, false);

    check_completeExecution();
}

const subA = async () => {
    await animateloadOperands('A', 'A');
    await animateStepDescriptionUpdate('Subtrahiere die Operanden');

    const result = addBinary(A.value_number, A.value_number, true);
    await animateALU(result, true, false, 'A');
    check_completeExecution();
}

const subB = async () => {
    await animateloadOperands('A', 'B');
    await animateStepDescriptionUpdate('Subtrahiere die Operanden');

    const result = addBinary(A.value_number, B.value_number, true);
    await animateALU(result, true, false, 'A');
    check_completeExecution();
}

const subC = async () => {
    await animateloadOperands('A', 'C');
    await animateStepDescriptionUpdate('Subtrahiere die Operanden');

    const result = addBinary(A.value_number, C.value_number, true);
    await animateALU(result, true, false, 'A');
    check_completeExecution();
}

const subDat_8 = async () => {
    await animateStepDescriptionUpdate('Hole den 1. Operanden');
    await animateTransfer('A', 'ALU1', A.value_number);
    await animateRegisterUpdate('ALU1', A.value_number);
    await animateStepDescriptionUpdate('Hole den 2. Operanden');
    await animateReadFromMemoryInRegister('PC', 'ALU2');
    await animateIncreasePcByOne();
    await animateStepDescriptionUpdate('Subtrahiere die Operanden');

    const result = addBinary(A.value_number, ALU2.value_number, true);
    await animateALU(result, true, false, 'A');
    check_completeExecution();
}

const andA = async () => {
    await animateloadOperands('A', 'A');
    await animateStepDescriptionUpdate('OP1 AND OP2');

    const result = andBinary(A.value_number, A.value_number);
    await animateALU(result, true, false, 'A');
    check_completeExecution();
}

const andB = async () => {
    await animateloadOperands('A', 'B');
    await animateStepDescriptionUpdate('OP1 AND OP2');

    const result = andBinary(A.value_number, B.value_number);
    await animateALU(result, true, false, 'A');
    check_completeExecution();
}

const andC = async () => {
    await animateloadOperands('A', 'C');
    await animateStepDescriptionUpdate('OP1 AND OP2');

    const result = andBinary(A.value_number, C.value_number);
    await animateALU(result, true, false, 'A');
    check_completeExecution();
}

const andDat_8 = async () => {
    await animateStepDescriptionUpdate('Hole den 1. Operanden');
    await animateTransfer('A', 'ALU1', A.value_number);
    await animateRegisterUpdate('ALU1', A.value_number);
    await animateStepDescriptionUpdate('Hole den 2. Operanden');
    await animateReadFromMemoryInRegister('PC', 'ALU2');
    await animateIncreasePcByOne()
    await animateStepDescriptionUpdate('OP1 AND OP2');

    const result = andBinary(A.value_number, ALU2.value_number);
    await animateALU(result, true, false, 'A');
    check_completeExecution();
}

const orA = async () => {
    await animateloadOperands('A', 'A');
    await animateStepDescriptionUpdate('OP1 OR OP2');

    const result = orBinary(ALU1.value_number, ALU2.value_number);
    await animateALU(result, true, false, 'A');
    check_completeExecution();
}

const orB = async () => {
    await animateloadOperands('A', 'B');
    await animateStepDescriptionUpdate('OP1 OR OP2');

    const result = orBinary(ALU1.value_number, ALU2.value_number);
    await animateALU(result, true, false, 'A');
    check_completeExecution();
}

const orC = async () => {
    await animateloadOperands('A', 'C');
    await animateStepDescriptionUpdate('OP1 OR OP2');

    const result = orBinary(ALU1.value_number, ALU2.value_number);
    await animateALU(result, true, false, 'A');
    check_completeExecution();
}

const orDat_8 = async () => {
    await animateStepDescriptionUpdate('Hole den 1. Operanden');
    await animateTransfer('A', 'ALU1', A.value_number);
    await animateRegisterUpdate('ALU1', A.value_number);
    await animateStepDescriptionUpdate('Hole den 2. Operanden');
    await animateReadFromMemoryInRegister('PC', 'ALU2');
    await animateIncreasePcByOne();
    await animateStepDescriptionUpdate('OP1 OR OP2');

    const result = orBinary(ALU1.value_number, ALU2.value_number);
    await animateALU(result, true, false, 'A');
    check_completeExecution();
}

const xorA = async () => {
    await animateloadOperands('A', 'A');
    await animateStepDescriptionUpdate('OP1 XOR OP2');

    const result = xorBinary(A.value_number, A.value_number);
    await animateALU(result, true, false, 'A');
    check_completeExecution();
}

const xorB = async () => {
    await animateloadOperands('A', 'B');
    await animateStepDescriptionUpdate('OP1 XOR OP2');

    const result = xorBinary(A.value_number, B.value_number);
    await animateALU(result, true, false, 'A');
    check_completeExecution();
}

const xorC = async () => {
    await animateloadOperands('A', 'C');
    await animateStepDescriptionUpdate('OP1 XOR OP2');

    const result = xorBinary(A.value_number, C.value_number);
    await animateALU(result, true, false, 'A');
    check_completeExecution();
}

const xorDat_8 = async () => {
    await animateStepDescriptionUpdate('Hole den 1. Operanden');
    await animateTransfer('A', 'ALU1', A.value_number);
    await animateRegisterUpdate('ALU1', A.value_number);
    await animateStepDescriptionUpdate('Hole den 2. Operanden');
    await animateReadFromMemoryInRegister('PC', 'ALU2');
    await animateIncreasePcByOne();
    await animateStepDescriptionUpdate('OP1 OR OP2');

    const result = xorBinary(ALU1.value_number, ALU2.value_number);
    await animateALU(result, true, false, 'A');
    check_completeExecution();
}

const twoByteShift = async () => {
    await animateStepDescriptionUpdate('Hole das 2. Byte des Befehls');
    await animateReadFromMemoryInRegister('PC', 'IR');
    await animateIncreasePcByOne();
    await animateStepDescriptionUpdate('Erkenne den Befehl');
    await addYellowBackgroundForIDLETIME(IR.htmlElement);


    if (IR.value_number === 0b00100111) {
        await animateArrow('IR');
        assemblerCommand_p.textContent = 'SHL';
        if (!playStatus.noAnim)
            await sleepForIDLETIME();
        await animateStepDescriptionUpdate('Hole den Operanden');
        await animateTransfer('A', 'ALU1', A.value_number);
        await animateRegisterUpdate('ALU1', A.value_number);
        await animateStepDescriptionUpdate('Schiebe Operanden nach links');
        const result = shlBinary(A.value_number);
        await animateALU(result, false, false, 'A');
    } else if (IR.value_number === 0b00111111) {
        await animateArrow('IR');
        assemblerCommand_p.textContent = 'SHR';
        if (!playStatus.noAnim)
            await sleepForIDLETIME();
        await animateStepDescriptionUpdate('Hole den Operanden');
        await animateTransfer('A', 'ALU1', A.value_number);
        await animateRegisterUpdate('ALU1', A.value_number);
        await animateStepDescriptionUpdate('Schiebe Operanden nach rechts');
        const result = shrBinary(A.value_number);
        await animateALU(result, false, false, 'A');
    }
    check_completeExecution();
}

const rcl = async () => {
    await animateStepDescriptionUpdate('Hole den Operanden');
    await animateTransfer('A', 'ALU1', A.value_number);
    await animateRegisterUpdate('ALU1', A.value_number);
    await animateStepDescriptionUpdate('Rotiere Operand mit Carry-Flag nach links');
    const result = rclBinary(A.value_number);
    await animateALU(result, false, true, 'A');
    check_completeExecution();
}

const rol = async () => {
    await animateStepDescriptionUpdate('Hole den Operanden');
    await animateTransfer('A', 'ALU1', A.value_number);
    await animateRegisterUpdate('ALU1', A.value_number);
    await animateStepDescriptionUpdate('Rotiere Operand ohne Carry-Flag nach links');
    const result = rolBinary(A.value_number);
    await animateALU(result, false, false, 'A');
    check_completeExecution();
}

const rcr = async () => {
    await animateStepDescriptionUpdate('Hole den Operanden');
    await animateTransfer('A', 'ALU1', A.value_number);
    await animateRegisterUpdate('ALU1', A.value_number);
    await animateStepDescriptionUpdate('Rotiere Operand mit Carry-Flag nach rechts');
    const result = rcrBinary(A.value_number);
    await animateALU(result, false, true, 'A');
    check_completeExecution();
}

const ror = async () => {
    await animateStepDescriptionUpdate('Hole den Operanden');
    await animateTransfer('A', 'ALU1', A.value_number);
    await animateRegisterUpdate('ALU1', A.value_number);
    await animateStepDescriptionUpdate('Rotiere Operand ohne Carry-Flag nach rechts');
    const result = rorBinary(A.value_number);
    await animateALU(result, false, false, 'A');
    check_completeExecution();
}

const cpA = async () => {
    await animateloadOperands('A', 'A');
    await animateStepDescriptionUpdate('Vergleiche die Operanden');

    const result = addBinary(A.value_number, A.value_number, true);
    await animateALU(result, true, false, '');
    check_completeExecution();
}

const cpB = async () => {
    await animateloadOperands('A', 'B');
    await animateStepDescriptionUpdate('Vergleiche die Operanden');

    const result = addBinary(A.value_number, B.value_number, true);
    await animateALU(result, true, false, '');
    check_completeExecution();
}

const cpC = async () => {
    await animateloadOperands('A', 'C');
    await animateStepDescriptionUpdate('Vergleiche die Operanden');

    const result = addBinary(A.value_number, C.value_number, true);
    await animateALU(result, true, false, '');
    check_completeExecution();
}

const cpDat_8 = async () => {
    await animateStepDescriptionUpdate('Hole den 1. Operanden');
    await animateTransfer('A', 'ALU1', A.value_number);
    await animateRegisterUpdate('ALU1', A.value_number);
    await animateStepDescriptionUpdate('Hole den 2. Operanden');
    await animateReadFromMemoryInRegister('PC', 'ALU2');
    await animateIncreasePcByOne();
    await animateStepDescriptionUpdate('Vergleiche die Operanden');

    const result = addBinary(A.value_number, ALU2.value_number, true);
    await animateALU(result, true, false, '');
    check_completeExecution();
}

const jpnzLabel = async () => {
    await animateloadAddressBytesInZr();
    await animateStepDescriptionUpdate('Prüfe die Sprungbedingung');
    await animateCheckJump('zFlag');

    //jump
    if (FLAGS.z_number === 0) {
        await animateStepDescriptionUpdate('Lade den Programmzähler');
        await animateArrow('ZR');
        await animateTransfer('ZR', 'PC', ZR.value_number);
        await animateRegisterUpdate('PC', ZR.value_number);

    }
    check_completeExecution();
}

const jpzLabel = async () => {
    await animateloadAddressBytesInZr();
    await animateStepDescriptionUpdate('Prüfe die Sprungbedingung');
    await animateCheckJump('zFlag');

    //jump
    if (FLAGS.z_number === 1) {
        await animateStepDescriptionUpdate('Lade den Programmzähler');
        await animateArrow('ZR');
        await animateTransfer('ZR', 'PC', ZR.value_number);
        await animateRegisterUpdate('PC', ZR.value_number);
    }
    check_completeExecution();
}

const jpncLabel = async () => {
    await animateloadAddressBytesInZr();
    await animateStepDescriptionUpdate('Prüfe die Sprungbedingung');
    await animateCheckJump('cFlag');

    //jump
    if (FLAGS.c_number === 0) {
        await animateStepDescriptionUpdate('Lade den Programmzähler');
        await animateArrow('ZR');
        await animateTransfer('ZR', 'PC', ZR.value_number);
        await animateRegisterUpdate('PC', ZR.value_number);
    }
    check_completeExecution();
}

const jpcLabel = async () => {
    await animateloadAddressBytesInZr();
    await animateStepDescriptionUpdate('Prüfe die Sprungbedingung');
    await animateCheckJump('cFlag');

    //jump
    if (FLAGS.c_number === 1) {
        await animateStepDescriptionUpdate('Lade den Programmzähler');
        await animateArrow('ZR');
        await animateTransfer('ZR', 'PC', ZR.value_number);
        await animateRegisterUpdate('PC', ZR.value_number);
    }
    check_completeExecution();
}

const jpnoLabel = async () => {
    await animateloadAddressBytesInZr();
    await animateStepDescriptionUpdate('Prüfe die Sprungbedingung');
    await animateCheckJump('pFlag');

    //jump
    if (FLAGS.p_number === 0) {
        await animateStepDescriptionUpdate('Lade den Programmzähler');
        await animateArrow('ZR');
        await animateTransfer('ZR', 'PC', ZR.value_number);
        await animateRegisterUpdate('PC', ZR.value_number);
    }
    check_completeExecution();
}

const jpoLabel = async () => {
    await animateloadAddressBytesInZr();
    await animateStepDescriptionUpdate('Prüfe die Sprungbedingung');
    await animateCheckJump('pFlag');

    //jump
    if (FLAGS.p_number === 1) {
        await animateStepDescriptionUpdate('Lade den Programmzähler');
        await animateArrow('ZR');
        await animateTransfer('ZR', 'PC', ZR.value_number);
        await animateRegisterUpdate('PC', ZR.value_number);
    }
    check_completeExecution();
}

const jpnsLabel = async () => {
    await animateloadAddressBytesInZr();
    await animateStepDescriptionUpdate('Prüfe die Sprungbedingung');
    await animateCheckJump('sFlag');

    //jump
    if (FLAGS.s_number === 0) {
        await animateStepDescriptionUpdate('Lade den Programmzähler');
        await animateArrow('ZR');
        await animateTransfer('ZR', 'PC', ZR.value_number);
        await animateRegisterUpdate('PC', ZR.value_number);
    }
    check_completeExecution();
}

const jpsLabel = async () => {
    await animateloadAddressBytesInZr();
    await animateStepDescriptionUpdate('Prüfe die Sprungbedingung');
    await animateCheckJump('sFlag');

    //jump
    if (FLAGS.s_number === 1) {
        await animateStepDescriptionUpdate('Lade den Programmzähler');
        await animateArrow('ZR');
        await animateTransfer('ZR', 'PC', ZR.value_number);
        await animateRegisterUpdate('PC', ZR.value_number);
    }
    check_completeExecution();
}

const jpLabel = async () => {
    await animateloadAddressBytesInZr();
    await animateStepDescriptionUpdate('Lade den Programmzähler');
    await animateArrow('ZR');
    await animateTransfer('ZR', 'PC', ZR.value_number);
    await animateRegisterUpdate('PC', ZR.value_number);
    check_completeExecution();
}

const callLabel = async () => {
    await animateloadAddressBytesInZr();
    await animateStepDescriptionUpdate('Erhöhe den Stackpointer um 1');
    await animateArrow('SP');
    await animateRegisterUpdate('SP', SP.value_number - 1);
    await animateStepDescriptionUpdate('Schreibe das HI-Byte des PC');
    await animateWriteToMemoryFromRegister('SP', 'PC_hi');
    await animateStepDescriptionUpdate('Erhöhe den Stackpointer um 1');
    await animateArrow('SP');
    await animateRegisterUpdate('SP', SP.value_number - 1);
    await animateStepDescriptionUpdate('Schreibe das LO-Byte des PC');
    await animateWriteToMemoryFromRegister('SP', 'PC_lo');
    await animateStepDescriptionUpdate('Lade den Programmzähler');
    await animateArrow('ZR');
    await animateTransfer('ZR', 'PC', ZR.value_number);
    await animateRegisterUpdate('PC', ZR.value_number);
    check_completeExecution();
}

const ret = async () => {
    await animateStepDescriptionUpdate('Hole das niederwertige Adressbyte');
    await animateReadFromMemoryInRegister('SP', 'ZR_lo');
    await animateStepDescriptionUpdate('Verringere den Stackpointer um 1');
    await animateArrow('SP');
    await animateRegisterUpdate('SP', SP.value_number + 1);
    await animateStepDescriptionUpdate('Hole das höherwertige Adressbyte');
    await animateReadFromMemoryInRegister('SP', 'ZR_hi');
    await animateStepDescriptionUpdate('Verringere den Stackpointer um 1');
    await animateArrow('SP');
    await animateRegisterUpdate('SP', SP.value_number + 1);
    await animateStepDescriptionUpdate('Lade den Programmzähler');
    await animateArrow('ZR');
    await animateTransfer('ZR', 'PC', ZR.value_number);
    await animateRegisterUpdate('PC', ZR.value_number);
    check_completeExecution();
}

const mc8Commands_array = [

    new mc8_command('MOV A, dat_8', 0b00111110, movAdat_8),
    new mc8_command('MOV B, dat_8', 0b00000110, movBdat_8),
    new mc8_command('MOV C, dat_8', 0b00001110, movCdat_8),

    new mc8_command('2-Byte Befehl', 0b11011101, twoByteIX),
    new mc8_command('MOV HL, dat_16', 0b00100001, movHLdat_16),
    new mc8_command('MOV SP, dat_16', 0b00110001, movSPdat_16),
    new mc8_command('MOV A, B', 0b01111000, movAB),
    new mc8_command('MOV A, C', 0b01111001, movAC),
    new mc8_command('MOV B, A', 0b01000111, movBA),
    new mc8_command('MOV B, C', 0b01000001, movBC),
    new mc8_command('MOV C, A', 0b01001111, movCA),
    new mc8_command('MOV C, B', 0b01001000, movCB),

    new mc8_command('MOV A, label', 0b00111010, movALabel),
    new mc8_command('MOV label, A', 0b00110010, movLabelA),
    new mc8_command('MOV HL, label', 0b00101010, movHlLabel),
    new mc8_command('MOV label, HL', 0b00100010, movLabelHl),
    new mc8_command('MOV A, [HL]', 0b01111110, movAHl),
    new mc8_command('MOV [HL], A', 0b01110111, movHlA),

    new mc8_command('PUSH', 0b11110101, push),
    new mc8_command('POP', 0b11110001, pop),
    new mc8_command('IN A, port', 0b11011011, inA),
    new mc8_command('OUT port, A', 0b11010011, outA),

    new mc8_command('INC A', 0b00111100, incA),
    new mc8_command('INC B', 0b00000100, incB),
    new mc8_command('INC C', 0b00001100, incC),
    new mc8_command('INC HL', 0b00100011, incHl),

    new mc8_command('DEC A', 0b00111101, decA),
    new mc8_command('DEC B', 0b00000101, decB),
    new mc8_command('DEC C', 0b00001101, decC),
    new mc8_command('DEC HL', 0b00101011, decHl),

    new mc8_command('ADD A', 0b10000111, addA),
    new mc8_command('ADD B', 0b10000000, addB),
    new mc8_command('ADD C', 0b10000001, addC),
    new mc8_command('ADD dat_8', 0b11000110, addDat_8),
    new mc8_command('ADD HL, BC', 0b00001001, addHlBc),

    new mc8_command('SUB A', 0b10010111, subA),
    new mc8_command('SUB B', 0b10010000, subB),
    new mc8_command('SUB C', 0b10010001, subC),
    new mc8_command('SUB dat_8', 0b11010110, subDat_8),

    new mc8_command('AND A', 0b10100111, andA),
    new mc8_command('AND B', 0b10100000, andB),
    new mc8_command('AND C', 0b10100001, andC),
    new mc8_command('AND dat_8', 0b11100110, andDat_8),

    new mc8_command('OR A', 0b10110111, orA),
    new mc8_command('OR B', 0b10110000, orB),
    new mc8_command('OR C', 0b10110001, orC),
    new mc8_command('OR dat_8', 0b11110110, orDat_8),

    new mc8_command('XOR A', 0b10101111, xorA),
    new mc8_command('XOR B', 0b10101000, xorB),
    new mc8_command('XOR C', 0b10101001, xorC),
    new mc8_command('XOR dat_8', 0b11101110, xorDat_8),

    new mc8_command('2-Byte-Befehl', 0b11001011, twoByteShift),

    new mc8_command('RCL', 0b00010111, rcl),
    new mc8_command('ROL', 0b00000111, rol),
    new mc8_command('RCR', 0b00011111, rcr),
    new mc8_command('ROR', 0b00001111, ror),

    new mc8_command('CP A', 0b10111111, cpA),
    new mc8_command('CP B', 0b10111000, cpB),
    new mc8_command('CP C', 0b10111001, cpC),
    new mc8_command('CP dat_8', 0b11111110, cpDat_8),

    new mc8_command('JPNZ label', 0b11000010, jpnzLabel),
    new mc8_command('JPZ label', 0b11001010, jpzLabel),

    new mc8_command('JPNC label', 0b11010010, jpncLabel),
    new mc8_command('JPC label', 0b11011010, jpcLabel),

    new mc8_command('JPNO label', 0b11100010, jpnoLabel),
    new mc8_command('JPO label', 0b11101010, jpoLabel),

    new mc8_command('JPNS label', 0b11110010, jpnsLabel),
    new mc8_command('JPS label', 0b11111010, jpsLabel),

    new mc8_command('JP label', 0b11000011, jpLabel),

    new mc8_command('CALL label', 0b11001101, callLabel),
    new mc8_command('RET', 0b11001001, ret),

    new mc8_command('NOP', 0b00000000, nop),
    new mc8_command('HALT', 0b01110110, halt),
];


/***************************************************main programm loop***************************************************/

let runningProgram: Array < Function > = [get_next_command];

const run_program = async (): Promise < any > => {
    let i = 0;
    while (true) {
        if (runningProgram[i] === undefined) {
            return false;
        }
        try {
            await checkPlayPressed();
            await runningProgram[i]();
        } catch (e) {
            if (!playStatus.stop) {
                playStatus.setPause();
            }

            setButtonsPressed();
            console.log('Error catched:');
            console.error(e);
            return false;
        }
        i++;
    }
}

const init = () => {
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


    stepNumber_p.textContent = '0';
    stepDescription_p.textContent = 'Prozessor angehalten';
    assemblerCommand_p.textContent = '';
    DECODER.display_htmlElement.textContent = '';
}

const setButtonsPressed = (): void => {
    if (playStatus.play) {
        controlButtons_button[0].classList.add('buttonPressed');
    } else {
        controlButtons_button[0].classList.remove('buttonPressed');
    }
    if (playStatus.pause) {
        controlButtons_button[1].classList.add('buttonPressed');
    } else {
        controlButtons_button[1].classList.remove('buttonPressed');
    }
    if (playStatus.stop) {
        controlButtons_button[2].classList.add('buttonPressed');
    } else {
        controlButtons_button[2].classList.remove('buttonPressed');
    }
    if (playStatus.rocketSpeed) {
        controlButtons_button[4].classList.add('buttonPressed');

        controlButtons_button[3].classList.remove('buttonPressed');
        controlButtons_button[5].classList.remove('buttonPressed');
        controlButtons_button[6].classList.remove('buttonPressed');
    }
    if (!playStatus.rocketSpeed) {
        controlButtons_button[3].classList.add('buttonPressed');

        controlButtons_button[4].classList.remove('buttonPressed');
        controlButtons_button[5].classList.remove('buttonPressed');
        controlButtons_button[6].classList.remove('buttonPressed');
    }
    if (playStatus.completeExe) {
        controlButtons_button[6].classList.add('buttonPressed');

        controlButtons_button[3].classList.remove('buttonPressed');
        controlButtons_button[4].classList.remove('buttonPressed');
        controlButtons_button[5].classList.remove('buttonPressed');
    }
    if (playStatus.noAnim && !playStatus.completeExe) {
        controlButtons_button[5].classList.add('buttonPressed');

        controlButtons_button[3].classList.remove('buttonPressed');
        controlButtons_button[4].classList.remove('buttonPressed');
        controlButtons_button[6].classList.remove('buttonPressed');
    }
    if (playStatus.oneCommand) {
        controlButtons_button[9].classList.add('buttonPressed');
    } else {
        controlButtons_button[9].classList.remove('buttonPressed');
    }
}
setButtonsPressed();

const play = () => {
    //only when stop is pressed(init), the program will be started anew  
    if (playStatus.stop) { //only when stop is pressed(init), the program will be started anew  
        playStatus.setPlay();
        run_program();
    }

    if (!playStatus.play) {
        playStatus.setPlay();
    }
    setButtonsPressed();
}

const pause = () => {
    if (!playStatus.stop)
        playStatus.setPause();
    setButtonsPressed();
}

const stopBtn = () => {
    playStatus.setStop();
    setButtonsPressed();
    init();
}

const increaseSpeed = () => {
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

const decreaseSpeed = () => {
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

const toggleTheme = () => {
    document.getElementsByTagName('html')[0].classList.toggle('black');
}

const rocketSpeed_on = () => {
    playStatus.setRocketSpeed();
    setButtonsPressed();
    play();
}

const snailSpeed_on = () => {
    playStatus.setSnailSpeed();
    setButtonsPressed();
    play();
}

const runOneCommand = () => {
    if (playStatus.oneCommand) {
        playStatus.oneCommand = false;
        setButtonsPressed();
    } else {
        playStatus.setOneCommand();
        setButtonsPressed();
    }
}

const runNextSingleStep = () => {
    playStatus.setNoAnimation();
    setButtonsPressed();
    play();
}

const runCompleteExecution = () => {
    playStatus.setCompleteExecution();
    setButtonsPressed();
    play();
}

const openSettings = () => {
    containerSettings_div.classList.add('toggleDisplay');
    settingsDisplayed_boolean = true;
}
openSettings();

const doc: any = document.documentElement;

const toggleFullscreen = () => {
    if (!isFullscreen) {
        if (doc.requestFullscreen) {
            doc.requestFullscreen();
        } else if (doc.webkitRequestFullscreen) {
            doc.webkitRequestFullscreen();
        } else if (doc.msRequestFullscreen) {
            doc.msRequestFullscreen();
        }
        isFullscreen = true;
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitexitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        isFullscreen = false;
    }
}

const openAssembler = () => {
    window.open('https://simonrusswurm.github.io/ASIM_Simulator/', '_blank');
}

const openInfo = () => {
    document.getElementById('infoWindow_div').classList.toggle('displayGrid');
}


document.addEventListener('keyup', function (e) {
    if (!settingsDisplayed_boolean && !ioInputDisplayed_boolean) {
        switch (e.code) {
            case 'Space':
                if (playStatus.play)
                    pause();
                else
                    play();
                break;

            case 'Enter':
                if (playStatus.play)
                    pause();
                else
                    play();
                break;

            case 'KeyR':
                stopBtn();
                break;

            case 'BracketRight':
                increaseSpeed();
                break;

            case 'Slash':
                decreaseSpeed();
                break;

            case 'KeyA':
                snailSpeed_on();
                break;

            case 'KeyS':
                rocketSpeed_on();
                break;

            case 'KeyD':
                runNextSingleStep();
                break;

            case 'KeyF':
                runCompleteExecution();
                break;

            case 'KeyT':
                runOneCommand();
                break;

            case 'KeyC':
                openSettings();
                break;

            case 'KeyV':
                toggleFullscreen();
                break;

            case 'KeyB':
                toggleTheme();
                break;

            default:
                break;
        }
    } else if (settingsDisplayed_boolean) {
        if (e.code === 'Enter' || e.code === 'KeyC')
            saveSettings();
    } else {
        if (e.code === 'Enter')
            play();
    }
});