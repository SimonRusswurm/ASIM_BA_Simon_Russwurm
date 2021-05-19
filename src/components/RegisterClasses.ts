import { getHtmlElement } from '../utils';
import {convertBinaryToNumber, convertNumberToBinaryArray, convertNumberToHex_2digits, } from '../numberManipulations';
import {Ram} from './RAM';
import {Rom} from './ROM';

const redRectangle_p: HTMLElement = document.getElementById('redRectangle_p')!;

const updateRedRectangle = (PcIntegerValue: number): void => {
    if(PcIntegerValue > 8191){
        redRectangle_p.classList.add('displayNone');
        return;
    }

    redRectangle_p.classList.remove('displayNone');
    let xPos: number = calculateRedRectangleXPosition(PcIntegerValue);
    let yPos: number = calculateRedRectangleYPosition(PcIntegerValue);
    
    redRectangle_p.style.left = `${100/50*xPos}%`;
    redRectangle_p.style.top = `${100/32*yPos}%`;
}

const calculateRedRectangleXPosition = (PcIntegerValue: number): number => PcIntegerValue % 8 + 2;

const calculateRedRectangleYPosition = (PcIntegerValue: number): number => {
    let yPos = 0;

    if (PcIntegerValue < 224)
        yPos = Math.floor(PcIntegerValue / 8) + 2;
    else if (PcIntegerValue < 8192) {
        yPos = 30;
        if (PcIntegerValue % 16 > 7)
            yPos += 1;
    }
    return yPos;

}

export abstract class Register {
    htmlElement: HTMLElement;
    value: number;
    constructor(htmlElement: HTMLElement) {
        this.htmlElement = htmlElement;
        this.value = 0;
    }

    update(value: number): void {
        this.value = value;
        this.htmlElement.textContent = convertNumberToHex_2digits(value);
    }
}

export class Register_x2 extends Register {
    constructor(register: HTMLElement) {
        super(register);
    }

    update(value: number): void {
        if (value > 255)
            value = value - Math.floor(value/255)*255-1;
            // value = 0;
        if (value < 0)
            value = -Math.floor(value/255)*255 + 1 + value;
            // value = 255;
        this.value = value;
        this.htmlElement.textContent = convertNumberToHex_2digits(value);
    }
}

export class IO extends Register_x2 {
    address: number;
    ioMapped_boolean: boolean;
    isInput: boolean;

    constructor(register: HTMLElement, address: number, isInput: boolean) {
        super(register);
        this.address = address;
        this.ioMapped_boolean = true;
        this.isInput = isInput;
    }

    updateProperties(address: number, isIoMapped: boolean, isInput: boolean): void {
        this.address = address;
        this.ioMapped_boolean = isIoMapped;
        this.isInput = isInput;
    }
}

export class Register_x4 extends Register {
    backgroundHtmlElement: HTMLElement;
    hiValue: number;
    loValue: number;
    hiRegister: Register_x2;
    loRegister: Register_x2;

    constructor(background: HTMLElement, hiRegister: HTMLElement, loRegister: HTMLElement) {
        super(background);
        this.hiRegister = new Register_x2(hiRegister);
        this.loRegister = new Register_x2(loRegister);
        this.backgroundHtmlElement = background;
        this.hiValue = 0;
        this.loValue = 0;
    }

    update(value: number): void {
        if (value > 65535)
            value -= 65536;
        if (value < 0)
            value = 65535;
        this.value = value;
        this.loValue = value % 256;
        this.hiValue = (value - this.loValue) / 256;
        this.hiRegister.update(this.hiValue);
        this.loRegister.update(this.loValue);
    }
    updateLoByte(value: number): void {
        this.loValue = value;
        this.value = this.hiValue * 256 + this.loValue;
        this.loRegister.update(this.loValue);
    }

    updateHiByte(value: number): void {
        this.hiValue = value;
        this.value = this.hiValue * 256 + this.loValue;
        this.hiRegister.update(this.hiValue);
    }
}

export class Pc_class extends Register_x4 {
    ROM: Rom;
    RAM: Ram;
    constructor(register: HTMLElement, hiRegister: HTMLElement, loRegister: HTMLElement, rom: Rom, ram: Ram) {
        super(register, hiRegister, loRegister);
        this.ROM = rom;
        this.RAM = ram;
        this.update(0);
    }

    //override
    update(value: number): void {
        if (value > 65535)
            value -= 65536;
        if (value < 0)
            value = 65535;
        this.value = value;
        this.loValue = value % 256;
        this.hiValue = (value - this.loValue) / 256;
        this.hiRegister.update(this.hiValue);
        this.loRegister.update(this.loValue);

        updateRedRectangle(this.value);
        this.ROM.updateVariableHtmlCells(value);
        if (this.value > this.RAM.startAddress)
            this.RAM.updateVariableCells(value);
    }
}

export class Flags extends Register{
    cFlag: any;
    zFlag: any;
    pFlag: any;
    sFlag: any;
    c_htmlElement: HTMLElement;
    z_htmlElement: HTMLElement;
    p_htmlElement: HTMLElement;
    s_htmlElement: HTMLElement;
    

    constructor() {
        super(getHtmlElement('flagsContainer_div'));
        this.cFlag = 0;
        this.zFlag = 0;
        this.pFlag = 0;
        this.sFlag = 0;
        this.c_htmlElement = getHtmlElement('cFlagValue_p');
        this.z_htmlElement = getHtmlElement('zFlagValue_p');
        this.p_htmlElement = getHtmlElement('pFlagValue_p');
        this.s_htmlElement = getHtmlElement('sFlagValue_p');
        
    }

    update(value: number): void {
        let binaryArray = convertNumberToBinaryArray(value);
        this.cFlag = binaryArray[7];
        this.zFlag = binaryArray[5];
        this.pFlag = binaryArray[1];
        this.sFlag = binaryArray[0];
        this.updateDOM()
    }

    updateDec(cFlag: number, zFlag: number, pFlag: number, sFlag: number): void {
        this.cFlag = cFlag;
        this.zFlag = zFlag;
        this.pFlag = pFlag;
        this.sFlag = sFlag;
    }

    updateDOM(): void {
        if (this.cFlag === '-')
            this.cFlag = 0;
        if (this.zFlag === '-')
            this.zFlag = 0;
        if (this.pFlag === '-')
            this.pFlag = 0;
        if (this.sFlag === '-')
            this.sFlag = 0;
        this.value = convertBinaryToNumber([this.sFlag, this.pFlag, 0, 0, 0, this.zFlag, 0, this.cFlag].join(''));
        this.c_htmlElement.textContent = this.cFlag.toString();
        this.z_htmlElement.textContent = this.zFlag.toString();
        this.p_htmlElement.textContent = this.pFlag.toString();
        this.s_htmlElement.textContent = this.sFlag.toString();
    }
}