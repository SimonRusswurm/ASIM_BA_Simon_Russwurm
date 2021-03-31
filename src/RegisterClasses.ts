import {convertNumberToHex_2digits, } from './numberManipulations';
import {Ram} from './RamClass';
import {Rom} from './RomClass';

const redRectangle_p: HTMLElement = document.getElementById('redRectangle_p')!;


const updateRedRectangle = (PC_number: number, RAM: Ram): void => {
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
        xPos = PC_number % 8 + 40;
        yPos = Math.floor(PC_number / 8) + 2;

    }
    //variable RamElements
    else if (PC_number >= RAM.startAddressRam_number + 112 && PC_number < RAM.startAddressRam_number + 8080) {
        PC_number = RAM.reduceToRange2000h(PC_number);
        xPos = PC_number % 8 + 40;
        yPos = 16;
        if (PC_number % 16 > 7)
            yPos += 1;
    } else if (PC_number >= RAM.startAddressRam_number + 8080 && PC_number < RAM.startAddressRam_number + 8192) {
        PC_number = RAM.reduceToRange2000h(PC_number);
        xPos = PC_number % 8 + 40;
        yPos = Math.floor((PC_number - 7952) / 8) + 2;
    } else {
        redRectangle_p.classList.add('displayNone')
    }
    redRectangle_p.style.left = `${100/50*xPos}%`;
    redRectangle_p.style.top = `${100/32*yPos}%`;
}

export  class Register_x2 {
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

export class IO extends Register_x2 {
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

export class Register_x4 {
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

export class Pc_class extends Register_x4 {
    ROM: Rom;
    RAM: Ram;
    constructor(register_htmlElement: HTMLElement, registerHi_htmlElement: HTMLElement, registerLo_htmlElement: HTMLElement, ROM_class: Rom, RAM_class: Ram) {
        super(register_htmlElement, registerHi_htmlElement, registerLo_htmlElement);
        this.ROM = ROM_class;
        this.RAM = RAM_class;
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

        updateRedRectangle(this.value_number, this.RAM);
        this.ROM.updateVariableElements(value_number);
        if (this.value_number > this.RAM.startAddressRam_number)
            this.RAM.updateVariableElements(value_number);
    }
}