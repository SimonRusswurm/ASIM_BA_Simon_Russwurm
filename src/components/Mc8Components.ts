import { getHtmlElement } from "../utils";
import { Ram } from "./RAM";
import { Flags, IO, ProgramCounter, Register, Register_x2, Register_x4 } from "./RegisterClasses";
import { Rom } from "./ROM";
import { Decoder } from "./Decoder";
import { Alu } from "./ALU"
import { ControlUnit } from "./controlUnit";

class Mc8Components {
    private static INSTANCE: Mc8Components;
    public ROM: Rom;
    public RAM: Ram;
    public IO1: IO;
    public IO2: IO;
    public IO3: IO;

    public FLAGS: Flags;
    public ALU: Alu;

    public CONTROL_UNIT: ControlUnit;

    public A: Register_x2;
    public B: Register_x2;
    public C: Register_x2;
    public HL: Register_x4;
    public IX: Register_x4;
    public SP: Register_x4;
    public ZR: Register_x4;
    public PC: Register_x4;

    public DECODER: Decoder;

    private constructor(){
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
        this.PC = new ProgramCounter(getHtmlElement('pcBackground_div'), getHtmlElement('pcRegisterValueHi_h2'), getHtmlElement('pcRegisterValueLo_h2'),this.ROM,this.RAM);
        
        this.DECODER = new Decoder(this.RAM, this.IO1, this.IO2, this.IO3);
    }

    public static getInstance(){
        if(!Mc8Components.INSTANCE){
            Mc8Components.INSTANCE = new Mc8Components();
        }
        return Mc8Components.INSTANCE;
    }

    public getRegisterBy(name: string): Register{
        name = name.replace('_lo', '').replace('_hi', '');
    
        switch (name) {
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
                throw new Error(`no such Register: ${name}`);
        }
    }

    public initComponents(): void{
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
        this.FLAGS.update(0);
        this.DECODER.resetDOM();
        this.RAM.updateVariableCells(0);
        this.ALU.operandRegister1.htmlElement.textContent = '';
        this.ALU.operandRegister2.htmlElement.textContent = '';
        this.ALU.resultRegister.htmlElement.textContent = '';
    }
}

export const mc8Components = Mc8Components.getInstance();