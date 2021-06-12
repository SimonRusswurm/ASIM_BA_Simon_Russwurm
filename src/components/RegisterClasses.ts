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

export class Register {
    public htmlElement: HTMLElement;
    public value: number;

    constructor(htmlElement: HTMLElement) {
        this.htmlElement = htmlElement;
        this.value = 0;
    }

    public update(value: number): void {
        this.value = value;
        this.htmlElement.textContent = convertNumberToHex_2digits(value);
    }
}

export class Register_x2 extends Register {
    constructor(register: HTMLElement) {
        super(register);
    }

    public update(value: number): void {
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
    public address: number;
    public isIoMapped: boolean;
    public isInput: boolean;

    constructor(register: HTMLElement, address: number, isInput: boolean) {
        super(register);
        this.address = address;
        this.isIoMapped = true;
        this.isInput = isInput;
    }

    public updateProperties(address: number, isIoMapped: boolean, isInput: boolean): void {
        this.address = address;
        this.isIoMapped = isIoMapped;
        this.isInput = isInput;
    }
}

export class Register_x4 extends Register {
    public backgroundHtmlElement: HTMLElement;
    public hiValue: number;
    public loValue: number;
    public hiRegister: Register_x2;
    public loRegister: Register_x2;

    constructor(background: HTMLElement, hiRegister: HTMLElement, loRegister: HTMLElement) {
        super(background);
        this.hiRegister = new Register_x2(hiRegister);
        this.loRegister = new Register_x2(loRegister);
        this.backgroundHtmlElement = background;
        this.hiValue = 0;
        this.loValue = 0;
    }

    public update(value: number): void {
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
    public updateLoByte(value: number): void {
        this.loValue = value;
        this.value = this.hiValue * 256 + this.loValue;
        this.loRegister.update(this.loValue);
    }

    public updateHiByte(value: number): void {
        this.hiValue = value;
        this.value = this.hiValue * 256 + this.loValue;
        this.hiRegister.update(this.hiValue);
    }
}

export class ProgramCounter extends Register_x4 {
    private ROM: Rom;

    constructor(register: HTMLElement, hiRegister: HTMLElement, loRegister: HTMLElement, rom: Rom, ram: Ram) {
        super(register, hiRegister, loRegister);
        this.ROM = rom;
        this.update(0);
    }

    public update(value: number): void {
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
        // if (this.value > this.RAM.startAddress)
        //     this.RAM.updateVariableCells(value);
    }
}

export class Flags extends Register{
    public cFlag: any;
    public zFlag: any;
    public pFlag: any;
    public sFlag: any;
    public cHtml: HTMLElement;
    public zHtml: HTMLElement;
    public pHtml: HTMLElement;
    public sHtml: HTMLElement;
    

    constructor() {
        super(getHtmlElement('flagsContainer_div'));
        this.cFlag = 0;
        this.zFlag = 0;
        this.pFlag = 0;
        this.sFlag = 0;
        this.cHtml = getHtmlElement('cFlagValue_p');
        this.zHtml = getHtmlElement('zFlagValue_p');
        this.pHtml = getHtmlElement('pFlagValue_p');
        this.sHtml = getHtmlElement('sFlagValue_p');
        
    }

    public update(value: number): void {
        let binaryArray = convertNumberToBinaryArray(value);
        this.cFlag = binaryArray[7];
        this.zFlag = binaryArray[5];
        this.pFlag = binaryArray[1];
        this.sFlag = binaryArray[0];
        this.updateDOM();
    }

    public updateDOM(): void {
        if (this.cFlag === '-')
            this.cFlag = 0;
        if (this.zFlag === '-')
            this.zFlag = 0;
        if (this.pFlag === '-')
            this.pFlag = 0;
        if (this.sFlag === '-')
            this.sFlag = 0;
        this.value = convertBinaryToNumber([this.sFlag, this.pFlag, 0, 0, 0, this.zFlag, 0, this.cFlag].join(''));
        this.cHtml.textContent = this.cFlag.toString();
        this.zHtml.textContent = this.zFlag.toString();
        this.pHtml.textContent = this.pFlag.toString();
        this.sHtml.textContent = this.sFlag.toString();
    }
}