import {
    convertHexToNumber,
    convertBinaryToNumber,
    convertNumberTo8DigitsBinaryString,
    convertNumberToBinaryArray,
    convertNumberToComplementOnTwo,
    convertNumberToHex_2digits,
    convertNumberToHex_4digits,
    checkValidHex,
    calculateChecksum} from './numberManipulations';

import {resizeWindow} from './resizeWindow';
import {Flags, Alu} from './AluAndFlagsClasses';
import {Register_x2, Register_x4, IO, Pc_class} from './RegisterClasses';
import {Ram} from './RamClass';
import {Decoder} from './DecoderClass';
import {calcIntermediatePositions, getPointsAtoB, Point} from './busLogic';
import {ProgramStatus} from './ProgramStatusClass';
import {mc8_command} from './mc8CommandClass';
import { Rom } from './RomClass';
import { saveSettings } from './settingsWindow';

export const getHtmlElement = (id_string: string) => document.getElementById(id_string)!;


/**resizing the window */
window.addEventListener('DOMContentLoaded', function () {
    resizeWindow(true);
    (<HTMLInputElement>getHtmlElement('breakpointsCheckbox_input')).checked = false;
});

window.addEventListener('resize', function () {
    resizeWindow(false);
});

/***************************************************global Variables***************************************************/

let ANIMATION_SPEED = 3; //Values can be 1,2,3,4,6,12
let IDLETIME = 500;
const NOANIMATIONIDLETIME = 15;
const FRAMES = 60;
const sectionsCountWidth = 50;
const sectionsCountHeight = 32;


/***************************************************DOM-selectors***************************************************/
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


/***************************************************  Class Variables ***************************************************/
const FLAGS = new Flags(getHtmlElement('cFlagValue_p'), getHtmlElement('zFlagValue_p'), getHtmlElement('pFlagValue_p'), getHtmlElement('sFlagValue_p'), getHtmlElement('flagsContainer_div'));
const ALU = new Alu(FLAGS);
export const programStatus = new ProgramStatus();
export const ROM = new Rom(programStatus);
export const RAM = new Ram();
export const IO1 = new IO(getHtmlElement('io1RegisterValue_h2'), 0, true);
export const IO2 = new IO(getHtmlElement('io2RegisterValue_h2'), 1, false);
export const IO3 = new IO(getHtmlElement('io3RegisterValue_h2'), 2, true);
export const A = new Register_x2(getHtmlElement('aRegisterValue_h2'));
export const B = new Register_x2(getHtmlElement('bRegisterValue_h2'));
export const C = new Register_x2(getHtmlElement('cRegisterValue_h2'));
export const IR = new Register_x2(getHtmlElement('irRegisterValue_h2'));
const ALU1 = new Register_x2(getHtmlElement('alu1RegisterValue_h2'));
const ALU2 = new Register_x2(getHtmlElement('alu2RegisterValue_h2'));
const ALUOUT = new Register_x2(getHtmlElement('aluOutRegisterValue_h2'));
export const HL = new Register_x4(getHtmlElement('hlBackground_div'), getHtmlElement('hlRegisterValueHi_h2'), getHtmlElement('hlRegisterValueLo_h2'));
export const IX = new Register_x4(getHtmlElement('ixBackground_div'), getHtmlElement('ixRegisterValueHi_h2'), getHtmlElement('ixRegisterValueLo_h2'));
export const SP = new Register_x4(getHtmlElement('spBackground_div'), getHtmlElement('spRegisterValueHi_h2'), getHtmlElement('spRegisterValueLo_h2'));
export const ZR = new Register_x4(getHtmlElement('spBackground_div'), getHtmlElement('zrRegisterValueHi_h2'), getHtmlElement('zrRegisterValueLo_h2'));
export const PC = new Pc_class(getHtmlElement('pcBackground_div'), getHtmlElement('pcRegisterValueHi_h2'), getHtmlElement('pcRegisterValueLo_h2'),ROM,RAM);
PC.update(0);

const DECODER = new Decoder(getHtmlElement('wrValue_p'), getHtmlElement('rdValue_p'), getHtmlElement('mValue_p'), getHtmlElement('ioValue_p'), getHtmlElement('decDisplay_p'), RAM, IO1, IO2, IO3);


/**
 * Rom Listeners
 */
const romElements_array: any = Array.from(document.getElementsByClassName('romElement'));

for (let i = 0; i < romElements_array.length; i++) {
    romElements_array[i].addEventListener('dblclick', function(){
        programStatus.romIsEdited = true;
        romElements_array[i].readOnly = '';
    }); 
    romElements_array[i].addEventListener('click', function(){
        const cList = Array.from(romElements_array[i].classList);
        if(cList.includes('blueText')){
            if(cList.includes('breakpoint'))
                romElements_array[i].classList.remove('breakpoint', 'borderBox');
            else
                romElements_array[i].classList.add('breakpoint', 'borderBox');
            
        }
    });
}

/**
 * Hover-Pop-Up Listeners
 * Note that the order of the html elements in index.html is important!
 */

const allH1Elements_h1: any = Array.from(document.getElementsByTagName('h1'));
const allH3Elements_h3: any = Array.from(document.getElementsByTagName('h3'));
const controlButtons_button: any = Array.from(document.querySelectorAll('.button'));
const hoverElements_htmlElements: any = allH1Elements_h1.concat(allH3Elements_h3).concat(controlButtons_button);
const hoverPopUps_htmlElements: any = document.getElementsByClassName('hoverElement');
const io1Address_textarea: HTMLTextAreaElement = <HTMLTextAreaElement>getHtmlElement('io1Address_textarea');
const io2Address_textarea: HTMLTextAreaElement = <HTMLTextAreaElement>getHtmlElement('io2Address_textarea');
const io3Address_textarea: HTMLTextAreaElement = <HTMLTextAreaElement>getHtmlElement('io3Address_textarea');

const updateHoverElements = (): void => {
    getHtmlElement('ramStartAddressHex_p').textContent = convertNumberToHex_4digits(RAM.startAddressRam_number) + 'h';
    getHtmlElement('ramStartAddressDec_p').textContent = String(RAM.startAddressRam_number);
    getHtmlElement('ramEndAddressHex_p').textContent = convertNumberToHex_4digits(RAM.startAddressRam_number + 8192 - 1) + 'h';
    getHtmlElement('ramEndAddressDec_p').textContent = String(RAM.startAddressRam_number + 8192 - 1);

    const checkedRadioIoMap_input: any = document.querySelector('input[name="radioIoMap"]:checked');
    getHtmlElement('io1Map_p').textContent = checkedRadioIoMap_input.value;
    getHtmlElement('io1AddressHover_p').textContent = convertNumberToHex_2digits(convertHexToNumber(io1Address_textarea.value)) + 'h';
    getHtmlElement('io1ValueDec_p').textContent = IO1.value_number + ' (' + convertNumberToComplementOnTwo(IO1.value_number) + ')';
    getHtmlElement('io1ValueBin_p').textContent = convertNumberTo8DigitsBinaryString(IO1.value_number);

    getHtmlElement('io2Map_p').textContent = checkedRadioIoMap_input.value;
    getHtmlElement('io2AddressHover_p').textContent = convertNumberToHex_2digits(convertHexToNumber(io2Address_textarea.value)) + 'h';
    getHtmlElement('io2ValueDec_p').textContent = IO2.value_number + ' (' + convertNumberToComplementOnTwo(IO2.value_number) + ')';
    getHtmlElement('io2ValueBin_p').textContent = convertNumberTo8DigitsBinaryString(IO2.value_number);

    getHtmlElement('io3Map_p').textContent = checkedRadioIoMap_input.value;
    getHtmlElement('io3AddressHover_p').textContent = convertNumberToHex_2digits(convertHexToNumber(io3Address_textarea.value)) + 'h';
    getHtmlElement('io3ValueDec_p').textContent = IO3.value_number + ' (' + convertNumberToComplementOnTwo(IO3.value_number) + ')';
    getHtmlElement('io3ValueBin_p').textContent = convertNumberTo8DigitsBinaryString(IO3.value_number);

    getHtmlElement('aHoverValueDec_p').textContent = 'Dezimal: ' + A.value_number + ' (' + convertNumberToComplementOnTwo(A.value_number) + ')';
    getHtmlElement('aHoverValueBin_p').textContent = 'Binär: ' + convertNumberTo8DigitsBinaryString(A.value_number);

    getHtmlElement('bHoverValueDec_p').textContent = 'Dezimal: ' + B.value_number + ' (' + convertNumberToComplementOnTwo(B.value_number) + ')';
    getHtmlElement('bHoverValueBin_p').textContent = 'Binär: ' + convertNumberTo8DigitsBinaryString(B.value_number);

    getHtmlElement('cHoverValueDec_p').textContent = 'Dezimal: ' + C.value_number + ' (' + convertNumberToComplementOnTwo(C.value_number) + ')';
    getHtmlElement('cHoverValueBin_p').textContent = 'Binär: ' + convertNumberTo8DigitsBinaryString(C.value_number);

    getHtmlElement('hlHoverValueDec_p').textContent = 'Dezimal: ' + HL.value_number;
    getHtmlElement('ixHoverValueDec_p').textContent = 'Dezimal: ' + IX.value_number;
    getHtmlElement('spHoverValueDec_p').textContent = 'Dezimal: ' + SP.value_number;
    getHtmlElement('pcHoverValueDec_p').textContent = 'Dezimal: ' + PC.value_number;
    getHtmlElement('zrHoverValueDec_p').textContent = 'Dezimal: ' + ZR.value_number;

    getHtmlElement('irHoverValueBin_p').textContent = 'Binär: ' + convertNumberTo8DigitsBinaryString(IR.value_number);
}

 for (let i = 0; i < hoverElements_htmlElements.length; i++) {
    hoverElements_htmlElements[i].addEventListener('mouseover', function () {
        updateHoverElements();
        hoverPopUps_htmlElements[i].classList.add('displayGrid');
    });
    hoverElements_htmlElements[i].addEventListener('mouseleave', function () {
        hoverPopUps_htmlElements[i].classList.remove('displayGrid');
    });
}



/***************************************************implementation of the animations***************************************************/

/**
 * The following functions are basic functions, which are requiered often.  
 */

//Sleep functions for pausing Animation for a certain time
const sleepForMs = (milliseconds_number: number): Promise < any > => new Promise(resolve => setTimeout(resolve, milliseconds_number));

//throws 'Reset pressed' error
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


// function checks if play/pause/reset is pressed
const checkPlayPressed = async (): Promise < any > => {
    //if pause is pressed user will be caught in this loop till pressing play or reset
    while (true) {
        if (programStatus.play)
            return true;
        if (programStatus.reset)
            throw Error('Reset Pressed');

        console.log('waiting for user input');
        await sleepForMs(100);
    }
}

const pausingExecutionCheck = (): void => {
    let check = false;
    
    if(PC.value_number < 224){
        if(Array.from(romElements_array[PC.value_number].classList).includes('breakpoint'))
            check = true;
    }

    //after the completion of an animation, check if program should be paused
    if (programStatus.singleSteps || check) {
        updateStepDescription('Prozessor angehalten');
        stepNumber_p.textContent = '0';
        play();
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

/**
 * The following functions are responsible for small animations that occur over and over again.
 */
const addYellowBackgroundForIDLETIME = async (htmlElement_htmlElement: HTMLElement): Promise < any > => {
    //If the sleep function throws an error the yellowBg must be removed.
    try {
        if (!programStatus.noAnimation) {
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
    if (!programStatus.noAnimation) {
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
    if (!programStatus.noAnimation)
        await sleepForIDLETIME();
}

const animateRegisterUpdate = async (registerName_string: string, value_number: number): Promise < any > => {
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
    movingObject_htmlElement.style.left = String(100 / sectionsCountWidth * x_number) + "%";
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
        ele.style.left = `${100/sectionsCountWidth*(xCoordinate[i]+0.5)}%`;
        ele.style.top = `${100/32*(yCoordinate[i]+0.5)}%`;
        ele.classList.add('positionAbsolute', 'square1x1', 'pathElement', 'alignBg', 'rounded');
        pathElements.push(ele);
    }

    //create last PathElement (hex-number)
    let last = document.createElement('h2');
    last.style.left = `${100/sectionsCountWidth*(xCoordinate[xCoordinate.length-1])}%`;
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
    if (!programStatus.noAnimation) {
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

        //Animationtype 2
        if (programStatus.animationType_2) {
            if (!originInCPU || !targetInCPU)
                DECODER.updateDOM();
            await animatePaintedPath(pointsAtoB, origin_string, target_string);
            if (!DECODER.isRamAccess && !DECODER.isIoAccess) {
                DECODER.resetDOM();
            }
        }
        //Animationtype 1
        else {
            //iterate through Coordinates
            for (let i = 0; i < movingObjectCoordinates[0].length; i++) {

                //if singleStep is pressed during the animation, remove movingObject and jump out of function
                if (programStatus.noAnimation) {
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
        await animateTransfer(addressRegister_string, 'ROM1', address_number);
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
        if (!programStatus.noAnimation)
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
        await animateTransfer(addressRegister_string, 'ROM1', address_number);
    }
    RAM.updateElement(address_number, data_number);
    try {
        await addYellowBackgroundForIDLETIME(getHtmlElement(RAM.getRamElementId(address_number)));
    } finally {
        getHtmlElement(RAM.getRamElementId(address_number)).classList.remove('borderBox', 'yellowBg');
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

    movingAlu1.style.top = `${100/sectionsCountHeight*6}%`;
    movingAlu1.style.left = `${100/sectionsCountWidth*26}%`;

    movingAlu2.style.top = `${100/sectionsCountHeight*6}%`;
    movingAlu2.style.left = `${100/sectionsCountWidth*30}%`;
}
resetMovingAluElements();

//animation of ALU-usage
const animateALU = async (aluOUT_number: number, twoMovingAluElements_boolean: boolean, cFlag_boolean: boolean, saveToRegister_string: string): Promise < any > => {
    if (!programStatus.noAnimation) {
        const xCoordinateAlu1 = [26]; //28
        const xCoordinateAlu2 = [30];
        const yCoordinate = [6];
        const speed = 40;
        for (let j = 0; j < speed; j++) {
            xCoordinateAlu1.push(xCoordinateAlu1[j] + 2/speed);
            xCoordinateAlu2.push(xCoordinateAlu2[j] - 2/speed);
            yCoordinate.push(yCoordinate[j] + 4/speed);
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
            ALUOUT.htmlElement.classList.add('borderBox');
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
        ALUOUT.htmlElement.classList.remove('yellowBg', 'borderBox');
        ALUOUT.htmlElement.textContent = '';
    }
    if (saveToRegister_string !== '') {
        await animateTransfer('ALUOUT', saveToRegister_string, aluOUT_number);
        await animateRegisterUpdate(saveToRegister_string, aluOUT_number);
    }
}

const animateHlBcAddition = async (aluOUT_number: number, stepOne_boolean: boolean): Promise < any > => {
    if (!programStatus.noAnimation) {
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
    if (!programStatus.noAnimation) {
        await animateArrow('FLAGS');
        movingFlags_div.children[0].textContent = FLAGS.c_number;
        movingFlags_div.children[1].textContent = FLAGS.p_number;
        movingFlags_div.children[2].textContent = FLAGS.s_number;
        movingFlags_div.children[3].textContent = FLAGS.z_number;
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

//animation of IO-input
const io1InputInfo_p: HTMLElement = getHtmlElement('io1InputInfo_p');
const io2InputInfo_p: HTMLElement = getHtmlElement('io2InputInfo_p');
const io3InputInfo_p: HTMLElement = getHtmlElement('io3InputInfo_p');

const animateIoUserInput = async (IoName_string: string): Promise < any > => {
    let ioInputWindow: HTMLElement;
    let ioInput: any;
    let check = true;
    programStatus.ioInputDisplayed = true;
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
            if (checkValidHex(ioInput.value)) {
                check = false;
            } else {
                if (IoName_string === 'IO1') {
                    io1InputInfo_p.classList.add('redBg');
                    io1InputInfo_p.textContent = 'Das ist keine gültige zweistellige Hex-Zahl. Verwenden Sie nur die Zahlen  0-9 und die Zeichen A-F!';
                } else if (IoName_string === 'IO2') {
                    io2InputInfo_p.classList.add('redBg');
                    io2InputInfo_p.textContent = 'Das ist keine gültige zweistellige Hex-Zahl. Verwenden Sie nur die Zahlen  0-9 und die Zeichen A-F!';
                } else if (IoName_string === 'IO3') {
                    io3InputInfo_p.classList.add('redBg');
                    io3InputInfo_p.textContent = 'Das ist keine gültige zweistellige Hex-Zahl. Verwenden Sie nur die Zahlen  0-9 und die Zeichen A-F!';
                }
            }
        }
    } finally {
        ioInputWindow.classList.remove('displayGrid');
        io1InputInfo_p.classList.remove('redBg');
        io2InputInfo_p.classList.remove('redBg');
        io3InputInfo_p.classList.remove('redBg');
        io1InputInfo_p.textContent = 'Geben Sie eine zweistellige Hexadezimalzahl ein!';
        getHtmlElement('io2InputInfo_p').textContent = 'Geben Sie eine zweistellige Hexadezimalzahl ein!';
        getHtmlElement('io3InputInfo_p').textContent = 'Geben Sie eine zweistellige Hexadezimalzahl ein!';
        programStatus.ioInputDisplayed = false;
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
    if (programStatus.noAnimation)
        await sleepForNOANIMATIONIDLETIME();
    else
        await sleepForIDLETIME();
    pausingExecutionCheck();
}

const halt = async () => {
    updateStepDescription('Prozessor angehalten');
    stepNumber_p.textContent = '0';
    pause();
    pausingExecutionCheck();
}

const movAdat_8 = async () => {
    await animateStepDescriptionUpdate('Hole den Parameter');
    await animateReadFromMemoryInRegister('PC', 'A');
    await animateIncreasePcByOne();
    pausingExecutionCheck();
    return true;

}

const movBdat_8 = async () => {
    await animateStepDescriptionUpdate('Hole den Parameter');
    await animateReadFromMemoryInRegister('PC', 'B');
    await animateIncreasePcByOne();
    pausingExecutionCheck();
    return true;
}

const movCdat_8 = async () => {
    await animateStepDescriptionUpdate('Hole den Parameter');
    await animateReadFromMemoryInRegister('PC', 'C');
    await animateIncreasePcByOne();
    pausingExecutionCheck();
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
        if (!programStatus.noAnimation)
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
        await animateStepDescriptionUpdate('Lade den Programmzähler');
        await animateTransfer('IX', 'PC', IX.value_number);
        await animateRegisterUpdate('PC', IX.value_number);
    } else {
        await addYellowBackgroundForIDLETIME(IR.htmlElement);
        await animateArrow('IR');
        assemblerCommand_p.textContent = 'Befehl Unbekannt';
        throw Error('Unknown command');
    }

    pausingExecutionCheck();
    return true;
}

const movHLdat_16 = async () => {
    await animateStepDescriptionUpdate('Hole das niederwertige Byte');
    await animateReadFromMemoryInRegister('PC', 'HL_lo');
    await animateIncreasePcByOne();
    await animateStepDescriptionUpdate('Hole das höherwertige Byte');
    await animateReadFromMemoryInRegister('PC', 'HL_hi');
    await animateIncreasePcByOne();
    pausingExecutionCheck();
}

const movSPdat_16 = async () => {
    await animateStepDescriptionUpdate('Hole das niederwertige Byte');
    await animateReadFromMemoryInRegister('PC', 'SP_lo');
    await animateIncreasePcByOne();
    await animateStepDescriptionUpdate('Hole das höherwertige Byte');
    await animateReadFromMemoryInRegister('PC', 'SP_hi');
    await animateIncreasePcByOne();
    pausingExecutionCheck();
}

const movAB = async () => {
    await animateStepDescriptionUpdate('Kopiere die Daten');
    await animateTransfer('B', 'A', B.value_number);
    await animateRegisterUpdate('A', B.value_number);
    pausingExecutionCheck();
}

const movAC = async () => {
    await animateStepDescriptionUpdate('Kopiere die Daten');
    await animateTransfer('C', 'A', C.value_number);
    await animateRegisterUpdate('A', C.value_number);
    pausingExecutionCheck();
}

const movBA = async () => {
    await animateStepDescriptionUpdate('Kopiere die Daten');
    await animateTransfer('A', 'B', A.value_number);
    await animateRegisterUpdate('B', A.value_number);
    pausingExecutionCheck();
}

const movBC = async () => {
    await animateStepDescriptionUpdate('Kopiere die Daten');
    await animateTransfer('C', 'B', C.value_number);
    await animateRegisterUpdate('B', C.value_number);
    pausingExecutionCheck();
}

const movCA = async () => {
    await animateStepDescriptionUpdate('Kopiere die Daten');
    await animateTransfer('A', 'C', A.value_number);
    await animateRegisterUpdate('C', A.value_number);
    pausingExecutionCheck();
}

const movCB = async () => {
    await animateStepDescriptionUpdate('Kopiere die Daten');
    await animateTransfer('B', 'C', B.value_number);
    await animateRegisterUpdate('C', B.value_number);
    pausingExecutionCheck();
}

const movALabel = async () => {
    await animateloadAddressBytesInZr();
    await animateStepDescriptionUpdate('Hole die Daten');
    await animateReadFromMemoryInRegister('ZR', 'A');
    pausingExecutionCheck();
}

const movLabelA = async () => {
    await animateloadAddressBytesInZr();
    await animateStepDescriptionUpdate('Schreibe die Daten');
    await animateWriteToMemoryFromRegister('ZR', 'A');
    pausingExecutionCheck();
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
    pausingExecutionCheck();
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
    pausingExecutionCheck();
}

const movAHl = async () => {
    await animateStepDescriptionUpdate('Hole die Daten');
    await animateReadFromMemoryInRegister('HL', 'A');
    pausingExecutionCheck();
}

const movHlA = async () => {
    await animateStepDescriptionUpdate('Schreibe die Daten');
    await animateWriteToMemoryFromRegister('HL', 'A');
    pausingExecutionCheck();
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
    pausingExecutionCheck();
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
    pausingExecutionCheck();
}

const inA = async () => {
    await animateStepDescriptionUpdate('Hole das Adressbyte');
    await animateReadFromMemoryInRegister('PC', 'ZR_lo');
    await animateIncreasePcByOne();
    await animateStepDescriptionUpdate('Hole die Daten');
    await animateReadFromIo();
    pausingExecutionCheck();
}

const outA = async () => {
    await animateStepDescriptionUpdate('Hole das Adressbyte');
    await animateReadFromMemoryInRegister('PC', 'ZR_lo');
    await animateIncreasePcByOne();
    await animateStepDescriptionUpdate('Schreibe die Daten');
    await animateWriteToIo();
    pausingExecutionCheck();
}

const incA = async () => {
    await animateStepDescriptionUpdate('Hole den Operanden');
    await animateTransfer('A', 'ALU1', A.value_number);
    await animateRegisterUpdate('ALU1', A.value_number);
    await animateStepDescriptionUpdate('Erhöhe den Operanden um 1');
    const result = ALU.incBinary(A.value_number);
    ALU2.update(1);
    movingAlu2.classList.remove('yellowBg');
    await animateALU(result, true, false, 'A');
    movingAlu2.classList.add('yellowBg');
    pausingExecutionCheck();
}

const incB = async () => {
    await animateStepDescriptionUpdate('Hole den Operanden');
    await animateTransfer('B', 'ALU1', B.value_number);
    await animateRegisterUpdate('ALU1', B.value_number);
    await animateStepDescriptionUpdate('Erhöhe den Operanden um 1');
    const result = ALU.incBinary(B.value_number);
    ALU2.update(1);
    movingAlu2.classList.remove('yellowBg');
    await animateALU(result, true, false, 'B');
    movingAlu2.classList.add('yellowBg');
    pausingExecutionCheck();
}

const incC = async () => {
    await animateStepDescriptionUpdate('Hole den Operanden');
    await animateTransfer('C', 'ALU1', C.value_number);
    await animateRegisterUpdate('ALU1', C.value_number);
    await animateStepDescriptionUpdate('Erhöhe den Operanden um 1');
    const result = ALU.incBinary(C.value_number);
    ALU2.update(1);
    movingAlu2.classList.remove('yellowBg');
    await animateALU(result, true, false, 'C');
    movingAlu2.classList.add('yellowBg');
    pausingExecutionCheck();
}

const incHl = async () => {
    await animateStepDescriptionUpdate('Erhöhe die Adresse um 1');
    await animateArrow('HL');
    await animateRegisterUpdate('HL', HL.value_number + 1);
    pausingExecutionCheck();
}
//incIX see twoByteIx

const decA = async () => {
    await animateStepDescriptionUpdate('Hole den Operanden');
    await animateTransfer('A', 'ALU1', A.value_number);
    await animateRegisterUpdate('ALU1', A.value_number);
    await animateStepDescriptionUpdate('Verringere den Operanden um 1');
    const result = ALU.decBinary(A.value_number);
    ALU2.update(1);
    movingAlu2.classList.remove('yellowBg');
    await animateALU(result, true, false, 'A');
    movingAlu2.classList.add('yellowBg');
    pausingExecutionCheck();
}

const decB = async () => {
    await animateStepDescriptionUpdate('Hole den Operanden');
    await animateTransfer('B', 'ALU1', B.value_number);
    await animateRegisterUpdate('ALU1', B.value_number);
    await animateStepDescriptionUpdate('Verringere den Operanden um 1');
    const result = ALU.decBinary(B.value_number);
    ALU2.update(1);
    movingAlu2.classList.remove('yellowBg');
    await animateALU(result, true, false, 'B');
    movingAlu2.classList.add('yellowBg');
    pausingExecutionCheck();
}

const decC = async () => {
    await animateStepDescriptionUpdate('Hole den Operanden');
    await animateTransfer('C', 'ALU1', C.value_number);
    await animateRegisterUpdate('ALU1', C.value_number);
    await animateStepDescriptionUpdate('Verringere den Operanden um 1');
    const result = ALU.decBinary(C.value_number);
    ALU2.update(1);
    movingAlu2.classList.remove('yellowBg');
    await animateALU(result, true, false, 'C');
    movingAlu2.classList.add('yellowBg');
    pausingExecutionCheck();
}

const decHl = async () => {
    await animateStepDescriptionUpdate('Verringere die Adresse um 1');
    await animateArrow('HL');
    await animateRegisterUpdate('HL', HL.value_number - 1);
    pausingExecutionCheck();
}

const addA = async () => {
    await animateloadOperands('A', 'A');
    await animateStepDescriptionUpdate('Addiere die Operanden');

    const result = ALU.addBinary(A.value_number, A.value_number, false);
    await animateALU(result, true, false, 'A');
    pausingExecutionCheck();
}

const addB = async () => {
    await animateloadOperands('A', 'B');
    await animateStepDescriptionUpdate('Addiere die Operanden');

    const result = ALU.addBinary(A.value_number, B.value_number, false);
    await animateALU(result, true, false, 'A');
    pausingExecutionCheck();
}

const addC = async () => {
    await animateloadOperands('A', 'C');
    await animateStepDescriptionUpdate('Addiere die Operanden');

    const result = ALU.addBinary(A.value_number, C.value_number, false);
    await animateALU(result, true, false, 'A');
    pausingExecutionCheck();
}

const addDat_8 = async () => {
    await animateStepDescriptionUpdate('Hole den 1. Operanden');
    await animateTransfer('A', 'ALU1', A.value_number);
    await animateRegisterUpdate('ALU1', A.value_number);
    await animateStepDescriptionUpdate('Hole den 2. Operanden');
    await animateReadFromMemoryInRegister('PC', 'ALU2');
    await animateIncreasePcByOne();
    await animateStepDescriptionUpdate('Addiere die Operanden');

    const result = ALU.addBinary(A.value_number, ALU2.value_number, false);
    await animateALU(result, true, false, 'A');
    pausingExecutionCheck();
}

const addHlBc = async () => {
    await animateStepDescriptionUpdate('Hole das L-Register (HL_LO)');
    await animateTransfer('HL_lo', 'ALU1', HL.loValue_number);
    await animateRegisterUpdate('ALU1', HL.loValue_number);
    await animateStepDescriptionUpdate('Hole das C-Register');
    await animateTransfer('C', 'ALU2', C.value_number);
    await animateRegisterUpdate('ALU2', C.value_number);
    await animateStepDescriptionUpdate('Addiere die Operanden');

    let result = ALU.addBinary(HL.loValue_number, C.value_number, false);
    await animateHlBcAddition(result, true);

    await animateStepDescriptionUpdate('Hole das H-Register (HL_HI)');
    await animateTransfer('HL_hi', 'ALU1', HL.hiValue_number);
    await animateRegisterUpdate('ALU1', HL.hiValue_number);
    await animateStepDescriptionUpdate('Hole das B-Register');
    await animateTransfer('B', 'ALU2', B.value_number);
    await animateRegisterUpdate('ALU2', B.value_number);
    await animateStepDescriptionUpdate('Addiere die Operanden');
    result = ALU.addBinary(HL.hiValue_number, B.value_number + FLAGS.c_number, false);
    await animateHlBcAddition(result, false);

    pausingExecutionCheck();
}

const subA = async () => {
    await animateloadOperands('A', 'A');
    await animateStepDescriptionUpdate('Subtrahiere die Operanden');

    const result = ALU.addBinary(A.value_number, A.value_number, true);
    await animateALU(result, true, false, 'A');
    pausingExecutionCheck();
}

const subB = async () => {
    await animateloadOperands('A', 'B');
    await animateStepDescriptionUpdate('Subtrahiere die Operanden');

    const result = ALU.addBinary(A.value_number, B.value_number, true);
    await animateALU(result, true, false, 'A');
    pausingExecutionCheck();
}

const subC = async () => {
    await animateloadOperands('A', 'C');
    await animateStepDescriptionUpdate('Subtrahiere die Operanden');

    const result = ALU.addBinary(A.value_number, C.value_number, true);
    await animateALU(result, true, false, 'A');
    pausingExecutionCheck();
}

const subDat_8 = async () => {
    await animateStepDescriptionUpdate('Hole den 1. Operanden');
    await animateTransfer('A', 'ALU1', A.value_number);
    await animateRegisterUpdate('ALU1', A.value_number);
    await animateStepDescriptionUpdate('Hole den 2. Operanden');
    await animateReadFromMemoryInRegister('PC', 'ALU2');
    await animateIncreasePcByOne();
    await animateStepDescriptionUpdate('Subtrahiere die Operanden');

    const result = ALU.addBinary(A.value_number, ALU2.value_number, true);
    await animateALU(result, true, false, 'A');
    pausingExecutionCheck();
}

const andA = async () => {
    await animateloadOperands('A', 'A');
    await animateStepDescriptionUpdate('OP1 AND OP2');

    const result = ALU.andBinary(A.value_number, A.value_number);
    await animateALU(result, true, false, 'A');
    pausingExecutionCheck();
}

const andB = async () => {
    await animateloadOperands('A', 'B');
    await animateStepDescriptionUpdate('OP1 AND OP2');

    const result = ALU.andBinary(A.value_number, B.value_number);
    await animateALU(result, true, false, 'A');
    pausingExecutionCheck();
}

const andC = async () => {
    await animateloadOperands('A', 'C');
    await animateStepDescriptionUpdate('OP1 AND OP2');

    const result = ALU.andBinary(A.value_number, C.value_number);
    await animateALU(result, true, false, 'A');
    pausingExecutionCheck();
}

const andDat_8 = async () => {
    await animateStepDescriptionUpdate('Hole den 1. Operanden');
    await animateTransfer('A', 'ALU1', A.value_number);
    await animateRegisterUpdate('ALU1', A.value_number);
    await animateStepDescriptionUpdate('Hole den 2. Operanden');
    await animateReadFromMemoryInRegister('PC', 'ALU2');
    await animateIncreasePcByOne()
    await animateStepDescriptionUpdate('OP1 AND OP2');

    const result = ALU.andBinary(A.value_number, ALU2.value_number);
    await animateALU(result, true, false, 'A');
    pausingExecutionCheck();
}

const orA = async () => {
    await animateloadOperands('A', 'A');
    await animateStepDescriptionUpdate('OP1 OR OP2');

    const result = ALU.orBinary(ALU1.value_number, ALU2.value_number);
    await animateALU(result, true, false, 'A');
    pausingExecutionCheck();
}

const orB = async () => {
    await animateloadOperands('A', 'B');
    await animateStepDescriptionUpdate('OP1 OR OP2');

    const result = ALU.orBinary(ALU1.value_number, ALU2.value_number);
    await animateALU(result, true, false, 'A');
    pausingExecutionCheck();
}

const orC = async () => {
    await animateloadOperands('A', 'C');
    await animateStepDescriptionUpdate('OP1 OR OP2');

    const result = ALU.orBinary(ALU1.value_number, ALU2.value_number);
    await animateALU(result, true, false, 'A');
    pausingExecutionCheck();
}

const orDat_8 = async () => {
    await animateStepDescriptionUpdate('Hole den 1. Operanden');
    await animateTransfer('A', 'ALU1', A.value_number);
    await animateRegisterUpdate('ALU1', A.value_number);
    await animateStepDescriptionUpdate('Hole den 2. Operanden');
    await animateReadFromMemoryInRegister('PC', 'ALU2');
    await animateIncreasePcByOne();
    await animateStepDescriptionUpdate('OP1 OR OP2');

    const result = ALU.orBinary(ALU1.value_number, ALU2.value_number);
    await animateALU(result, true, false, 'A');
    pausingExecutionCheck();
}

const xorA = async () => {
    await animateloadOperands('A', 'A');
    await animateStepDescriptionUpdate('OP1 XOR OP2');

    const result = ALU.xorBinary(A.value_number, A.value_number);
    await animateALU(result, true, false, 'A');
    pausingExecutionCheck();
}

const xorB = async () => {
    await animateloadOperands('A', 'B');
    await animateStepDescriptionUpdate('OP1 XOR OP2');

    const result = ALU.xorBinary(A.value_number, B.value_number);
    await animateALU(result, true, false, 'A');
    pausingExecutionCheck();
}

const xorC = async () => {
    await animateloadOperands('A', 'C');
    await animateStepDescriptionUpdate('OP1 XOR OP2');

    const result = ALU.xorBinary(A.value_number, C.value_number);
    await animateALU(result, true, false, 'A');
    pausingExecutionCheck();
}

const xorDat_8 = async () => {
    await animateStepDescriptionUpdate('Hole den 1. Operanden');
    await animateTransfer('A', 'ALU1', A.value_number);
    await animateRegisterUpdate('ALU1', A.value_number);
    await animateStepDescriptionUpdate('Hole den 2. Operanden');
    await animateReadFromMemoryInRegister('PC', 'ALU2');
    await animateIncreasePcByOne();
    await animateStepDescriptionUpdate('OP1 OR OP2');

    const result = ALU.xorBinary(ALU1.value_number, ALU2.value_number);
    await animateALU(result, true, false, 'A');
    pausingExecutionCheck();
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
        if (!programStatus.noAnimation)
            await sleepForIDLETIME();
        await animateStepDescriptionUpdate('Hole den Operanden');
        await animateTransfer('A', 'ALU1', A.value_number);
        await animateRegisterUpdate('ALU1', A.value_number);
        await animateStepDescriptionUpdate('Schiebe Operanden nach links');
        const result = ALU.shlBinary(A.value_number);
        await animateALU(result, false, false, 'A');
    } else if (IR.value_number === 0b00111111) {
        await animateArrow('IR');
        assemblerCommand_p.textContent = 'SHR';
        if (!programStatus.noAnimation)
            await sleepForIDLETIME();
        await animateStepDescriptionUpdate('Hole den Operanden');
        await animateTransfer('A', 'ALU1', A.value_number);
        await animateRegisterUpdate('ALU1', A.value_number);
        await animateStepDescriptionUpdate('Schiebe Operanden nach rechts');
        const result = ALU.shrBinary(A.value_number);
        await animateALU(result, false, false, 'A');
    } else {
        await addYellowBackgroundForIDLETIME(IR.htmlElement);
        await animateArrow('IR');
        assemblerCommand_p.textContent = 'Befehl Unbekannt';
        throw Error('Unknown command');
    }
    pausingExecutionCheck();
}

const rcl = async () => {
    await animateStepDescriptionUpdate('Hole den Operanden');
    await animateTransfer('A', 'ALU1', A.value_number);
    await animateRegisterUpdate('ALU1', A.value_number);
    await animateStepDescriptionUpdate('Rotiere Operand mit Carry-Flag nach links');
    const result = ALU.rclBinary(A.value_number);
    await animateALU(result, false, true, 'A');
    pausingExecutionCheck();
}

const rol = async () => {
    await animateStepDescriptionUpdate('Hole den Operanden');
    await animateTransfer('A', 'ALU1', A.value_number);
    await animateRegisterUpdate('ALU1', A.value_number);
    await animateStepDescriptionUpdate('Rotiere Operand ohne Carry-Flag nach links');
    const result = ALU.rolBinary(A.value_number);
    await animateALU(result, false, false, 'A');
    pausingExecutionCheck();
}

const rcr = async () => {
    await animateStepDescriptionUpdate('Hole den Operanden');
    await animateTransfer('A', 'ALU1', A.value_number);
    await animateRegisterUpdate('ALU1', A.value_number);
    await animateStepDescriptionUpdate('Rotiere Operand mit Carry-Flag nach rechts');
    const result = ALU.rcrBinary(A.value_number);
    await animateALU(result, false, true, 'A');
    pausingExecutionCheck();
}

const ror = async () => {
    await animateStepDescriptionUpdate('Hole den Operanden');
    await animateTransfer('A', 'ALU1', A.value_number);
    await animateRegisterUpdate('ALU1', A.value_number);
    await animateStepDescriptionUpdate('Rotiere Operand ohne Carry-Flag nach rechts');
    const result = ALU.rorBinary(A.value_number);
    await animateALU(result, false, false, 'A');
    pausingExecutionCheck();
}

const cpA = async () => {
    await animateloadOperands('A', 'A');
    await animateStepDescriptionUpdate('Vergleiche die Operanden');

    const result = ALU.addBinary(A.value_number, A.value_number, true);
    await animateALU(result, true, false, '');
    pausingExecutionCheck();
}

const cpB = async () => {
    await animateloadOperands('A', 'B');
    await animateStepDescriptionUpdate('Vergleiche die Operanden');

    const result = ALU.addBinary(A.value_number, B.value_number, true);
    await animateALU(result, true, false, '');
    pausingExecutionCheck();
}

const cpC = async () => {
    await animateloadOperands('A', 'C');
    await animateStepDescriptionUpdate('Vergleiche die Operanden');

    const result = ALU.addBinary(A.value_number, C.value_number, true);
    await animateALU(result, true, false, '');
    pausingExecutionCheck();
}

const cpDat_8 = async () => {
    await animateStepDescriptionUpdate('Hole den 1. Operanden');
    await animateTransfer('A', 'ALU1', A.value_number);
    await animateRegisterUpdate('ALU1', A.value_number);
    await animateStepDescriptionUpdate('Hole den 2. Operanden');
    await animateReadFromMemoryInRegister('PC', 'ALU2');
    await animateIncreasePcByOne();
    await animateStepDescriptionUpdate('Vergleiche die Operanden');

    const result = ALU.addBinary(A.value_number, ALU2.value_number, true);
    await animateALU(result, true, false, '');
    pausingExecutionCheck();
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
    pausingExecutionCheck();
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
    pausingExecutionCheck();
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
    pausingExecutionCheck();
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
    pausingExecutionCheck();
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
    pausingExecutionCheck();
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
    pausingExecutionCheck();
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
    pausingExecutionCheck();
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
    pausingExecutionCheck();
}

const jpLabel = async () => {
    await animateloadAddressBytesInZr();
    await animateStepDescriptionUpdate('Lade den Programmzähler');
    await animateArrow('ZR');
    await animateTransfer('ZR', 'PC', ZR.value_number);
    await animateRegisterUpdate('PC', ZR.value_number);
    pausingExecutionCheck();
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
    pausingExecutionCheck();
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
    pausingExecutionCheck();
}

export const mc8Commands_array = [

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
            if (!programStatus.reset) {
                programStatus.setPause();
            }

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
    movingAlu2.classList.add('yellowBg');


    stepNumber_p.textContent = '0';
    stepDescription_p.textContent = 'Prozessor angehalten';
    assemblerCommand_p.textContent = '';
    DECODER.display_htmlElement.textContent = '';
}

/***************************************************buttons***************************************************/
const play = () => {
    if (!programStatus.play) {
        programStatus.romIsEdited = false;
        if (programStatus.reset) { //only when reset is pressed(init), the program will be started anew  
            programStatus.setPlay();
            run_program();
        }
        programStatus.setPlay();
        controlButtons_button[0].classList.add('pause_button', 'buttonPressed');
    }
    else{
        programStatus.setPause();
        controlButtons_button[0].classList.remove('pause_button', 'buttonPressed');
    }
}

const pause = () => {
    programStatus.setPause();
    controlButtons_button[0].classList.remove('pause_button', 'buttonPressed');
}

export const reset = () => {
    programStatus.setReset();
    controlButtons_button[0].classList.remove('pause_button', 'buttonPressed');
    init();
}

const toggleSingleSteps = ():void => {
    if (programStatus.singleSteps) {
        programStatus.resetSingleSteps();
        controlButtons_button[5].classList.remove('buttonPressed', 'oneCommandPressed');
        return
    }
    
    programStatus.setSingleSteps();
    controlButtons_button[5].classList.add('buttonPressed', 'oneCommandPressed');
}

const enableAnimationType_1 = () => {
    programStatus.setAnimationType_1();
    controlButtons_button[2].classList.add('buttonPressed');
    controlButtons_button[3].classList.remove('buttonPressed');
    controlButtons_button[4].classList.remove('buttonPressed');
}

const enableAnimationType_2 = () => {
    programStatus.setAnimationType_2();
    controlButtons_button[3].classList.add('buttonPressed');
    controlButtons_button[2].classList.remove('buttonPressed');
    controlButtons_button[4].classList.remove('buttonPressed');
}

const enableNoAnimation = () => {
    programStatus.setNoAnimation();
    controlButtons_button[4].classList.add('buttonPressed');
    controlButtons_button[2].classList.remove('buttonPressed');
    controlButtons_button[3].classList.remove('buttonPressed');
}

const speedSlider_input: any = getHtmlElement('speedSlider_input');
speedSlider_input.oninput = function(){
    ANIMATION_SPEED = Number(speedSlider_input.value);
    IDLETIME = 500 - ANIMATION_SPEED*30;
    if (ANIMATION_SPEED === 5)
        ANIMATION_SPEED = 6;
    if (ANIMATION_SPEED === 6)
        ANIMATION_SPEED = 12;
    
};

const increaseSpeed = () => {
    speedSlider_input.stepUp();
    speedSlider_input.dispatchEvent(new Event('input'));
}

const decreaseSpeed = () => {
    speedSlider_input.stepDown();
    speedSlider_input.dispatchEvent(new Event('input'));
}

const containerSettings_div: any = getHtmlElement('containerSettings_div');
const openSettings = () => {
    containerSettings_div.classList.add('toggleDisplay');
    programStatus.settingsOpened = true;
}

openSettings();

const toggleTheme = () => {
    document.getElementsByTagName('body')[0].classList.toggle('black');
    getHtmlElement('toggleTheme_button').classList.toggle('light');
}


const doc: any = document.documentElement;

declare global {
    interface Document {
      mozCancelFullScreen?: () => Promise<void>;
      msExitFullscreen?: () => Promise<void>;
      webkitExitFullscreen?: () => Promise<void>;
      mozFullScreenElement?: Element;
      msFullscreenElement?: Element;
      webkitFullscreenElement?: Element;
    }
  
    interface HTMLElement {
      msRequestFullscreen?: () => Promise<void>;
      mozRequestFullscreen?: () => Promise<void>;
      webkitRequestFullscreen?: () => Promise<void>;
    }
}

const toggleFullscreen = () => {
    if (!programStatus.fullscreenOn) {
        if (doc.requestFullscreen) {
            doc.requestFullscreen();
        } else if (doc.webkitRequestFullscreen) {
            doc.webkitRequestFullscreen();
        } else if (doc.msRequestFullscreen) {
            doc.msRequestFullscreen();
        }
        programStatus.fullscreenOn = true;
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        programStatus.fullscreenOn = false;
    }
}

const openInfo = () => {
    getHtmlElement('infoWindow_div').classList.toggle('displayGrid');
}

const play_button = getHtmlElement('play_button');
const reset_button = getHtmlElement('reset_button');
const singleStep_button = getHtmlElement('singleStep_button');
const slow_button = getHtmlElement('slow_button');
const fast_button = getHtmlElement('fast_button');
const noAnimation_button = getHtmlElement('noAnimation_button');
const decrease_button = getHtmlElement('decrease_button');
const increase_button = getHtmlElement('increase_button');
const settingsButton_button = getHtmlElement('settingsButton_button');
const fullscreenButton_button = getHtmlElement('fullscreenButton_button');

const io1Input_button = getHtmlElement('io1Input_button');
const io2Input_button = getHtmlElement('io2Input_button');
const io3Input_button = getHtmlElement('io3Input_button');

const toggleTheme_button = getHtmlElement('toggleTheme_button');
const info_button = getHtmlElement('info_button');
const closeSettings_button = getHtmlElement('closeSettings_button');


play_button.addEventListener('click', play);
reset_button.addEventListener('click', reset);
singleStep_button.addEventListener('click', toggleSingleSteps);
slow_button.addEventListener('click', enableAnimationType_1);
fast_button.addEventListener('click', enableAnimationType_2);
noAnimation_button.addEventListener('click', enableNoAnimation);
decrease_button.addEventListener('click', decreaseSpeed);
increase_button.addEventListener('click', increaseSpeed);
settingsButton_button.addEventListener('click', openSettings);
fullscreenButton_button.addEventListener('click', toggleFullscreen);

io1Input_button.addEventListener('click', play);
io2Input_button.addEventListener('click', play);
io3Input_button.addEventListener('click', play);

toggleTheme_button.addEventListener('click', toggleTheme);
info_button.addEventListener('click', openInfo);
closeSettings_button.addEventListener('click', saveSettings);

document.addEventListener('keyup', function (e) {
    if(programStatus.romIsEdited){    
        if(e.code === 'Space' || e.code === 'Enter'){
            play();
        }
        ROM.updateNumberArrayFromDOM();
        return
    }

    if(programStatus.settingsOpened){
        if (e.code === 'Enter' || e.code === 'KeyS')
            saveSettings();
        return
    }

    if(programStatus.ioInputDisplayed){
        if (e.code === 'Enter')
            play();
        return
    }

    switch (e.code) {
        case 'Space':
            play();
            break;
        case 'KeyR':
            reset();
            break;

        case 'KeyT':
            toggleSingleSteps();
            break;

        case 'KeyY':
            enableAnimationType_1();
            break;

        case 'KeyZ':
            enableAnimationType_1();
            break;

        case 'KeyU':
            enableAnimationType_2();
            break;
        
        case 'KeyI':
            enableNoAnimation();
            break;

        case 'KeyS':
            openSettings();
            break;

        case 'KeyV':
            toggleFullscreen();
            break;

        case 'BracketRight':
            increaseSpeed();
            break;

        case 'Slash':
            decreaseSpeed();
            break;

        default:
            break;
    }
    return
});