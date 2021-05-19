import { getHtmlElement } from "../utils";
import { Ram } from "./RAM";
import { Flags, IO, Pc_class, Register, Register_x2, Register_x4 } from "./RegisterClasses";
import { Rom } from "./ROM";
import { Decoder } from "./Decoder";
import { Alu } from "./ALU"
import { ControlUnit } from "./controlUnit";

class Mc8Components {
    ROM: Rom;
    RAM: Ram;
    IO1: IO;
    IO2: IO;
    IO3: IO;

    FLAGS: Flags;
    ALU: Alu;

    CONTROL_UNIT: ControlUnit;

    A: Register_x2;
    B: Register_x2;
    C: Register_x2;

    HL: Register_x4;
    IX: Register_x4;
    SP: Register_x4;
    ZR: Register_x4;
    PC: Register_x4;

    DECODER: Decoder;

    constructor(){
        this.ROM = new Rom();
        this.RAM = new Ram();
    
        this.IO1 = new IO(getHtmlElement('io1RegisterValue_h2'), 0, true);
        this.IO2 = new IO(getHtmlElement('io2RegisterValue_h2'), 1, false);
        this.IO3 = new IO(getHtmlElement('io3RegisterValue_h2'), 2, true);
    
        this.FLAGS = new Flags();
        this.ALU = new Alu(this.FLAGS);
    
        this.CONTROL_UNIT = new ControlUnit();
    
        this.A = new Register_x2(getHtmlElement('aRegisterValue_h2'));
        this.B = new Register_x2(getHtmlElement('bRegisterValue_h2'));
        this.C = new Register_x2(getHtmlElement('cRegisterValue_h2'));
    
        this.HL = new Register_x4(getHtmlElement('hlBackground_div'), getHtmlElement('hlRegisterValueHi_h2'), getHtmlElement('hlRegisterValueLo_h2'));
        this.IX = new Register_x4(getHtmlElement('ixBackground_div'), getHtmlElement('ixRegisterValueHi_h2'), getHtmlElement('ixRegisterValueLo_h2'));
        this.SP = new Register_x4(getHtmlElement('spBackground_div'), getHtmlElement('spRegisterValueHi_h2'), getHtmlElement('spRegisterValueLo_h2'));
        this.ZR = new Register_x4(getHtmlElement('zrBackground_div'), getHtmlElement('zrRegisterValueHi_h2'), getHtmlElement('zrRegisterValueLo_h2'));
        this.PC = new Pc_class(getHtmlElement('pcBackground_div'), getHtmlElement('pcRegisterValueHi_h2'), getHtmlElement('pcRegisterValueLo_h2'),this.ROM,this.RAM);
        
        this.DECODER = new Decoder(this.RAM, this.IO1, this.IO2, this.IO3);
    }

    getRegisterByName(registerName: string): Register{
        registerName = registerName.replace('_lo', '').replace('_hi', '');
    
        switch (registerName) {
            case 'IO1':
                return this.IO1;
            case 'IO2':
                return this.IO2;
            case 'IO3':
                return this.IO3;
            case 'A':
                return this.A;
            case 'B':
                return this.B;
            case 'C':
                return this.C;
            case 'IR':
                return this.CONTROL_UNIT.IR;
            case 'ALU1':
                return this.ALU.operandRegister1;
            case 'ALU2':
                return this.ALU.operandRegister2;
            case 'ALUOUT':
                return this.ALU.resultRegister;
            case 'HL':
                return this.HL;
            case 'IX':
                return this.IX;
            case 'SP':
                return this.SP;
            case 'PC':
                return this.PC;
            case 'ZR':
                return this.ZR;
            case 'FLAGS':
                return this.FLAGS;
            default:
                throw new Error(`no such Register: ${registerName}`);
        }
    }

    initComponents() {
        this.IO1.update(255);
        this.IO2.update(255);
        this.IO3.update(255);
        this.A.update(0);
        this.B.update(0);
        this.C.update(0);
        this.HL.update(0);
        this.IX.update(0);
        this.SP.update(0);
        this.PC.update(0);
        this.ZR.update(0);
        this.CONTROL_UNIT.reset();
        this.FLAGS.updateDec(0, 0, 0, 0);
        this.FLAGS.updateDOM();
        this.DECODER.resetDOM();
        this.RAM.updateVariableCells(0);
        this.ALU.operandRegister1.htmlElement.textContent = '';
        this.ALU.operandRegister2.htmlElement.textContent = '';
        this.ALU.resultRegister.htmlElement.textContent = '';
    }
}

export const mc8Components = new Mc8Components();