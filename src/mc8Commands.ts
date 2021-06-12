import { commandAnimator } from "./animators/CommandAnimator";


class mc8_command {
    assemblerNotation: string;
    opCode: number;
    animationFunction: Function;
    constructor(assemblerNotation: string, machineCommand: number, animationFunction: any) {
        this.assemblerNotation = assemblerNotation;
        this.opCode = machineCommand;
        this.animationFunction = animationFunction;
    }

    async runAnimation() {
        return this.animationFunction();
    }
}

export const mc8Commands = [

    new mc8_command('MOV A, dat_8', 0b00111110, commandAnimator.movAdat_8),
    new mc8_command('MOV B, dat_8', 0b00000110, commandAnimator.movBdat_8),
    new mc8_command('MOV C, dat_8', 0b00001110, commandAnimator.movCdat_8),

    new mc8_command('2-Byte Befehl', 0b11011101, commandAnimator.twoByteIX),
    new mc8_command('MOV HL, dat_16', 0b00100001, commandAnimator.movHLdat_16),
    new mc8_command('MOV SP, dat_16', 0b00110001, commandAnimator.movSPdat_16),
    new mc8_command('MOV A, B', 0b01111000, commandAnimator.movAB),
    new mc8_command('MOV A, C', 0b01111001, commandAnimator.movAC),
    new mc8_command('MOV B, A', 0b01000111, commandAnimator.movBA),
    new mc8_command('MOV B, C', 0b01000001, commandAnimator.movBC),
    new mc8_command('MOV C, A', 0b01001111, commandAnimator.movCA),
    new mc8_command('MOV C, B', 0b01001000, commandAnimator.movCB),

    new mc8_command('MOV A, label', 0b00111010, commandAnimator.movALabel),
    new mc8_command('MOV label, A', 0b00110010, commandAnimator.movLabelA),
    new mc8_command('MOV HL, label', 0b00101010, commandAnimator.movHlLabel),
    new mc8_command('MOV label, HL', 0b00100010, commandAnimator.movLabelHl),
    new mc8_command('MOV A, [HL]', 0b01111110, commandAnimator.movAHl),
    new mc8_command('MOV [HL], A', 0b01110111, commandAnimator.movHlA),

    new mc8_command('PUSH', 0b11110101, commandAnimator.push),
    new mc8_command('POP', 0b11110001, commandAnimator.pop),
    new mc8_command('IN A, port', 0b11011011, commandAnimator.inA),
    new mc8_command('OUT port, A', 0b11010011, commandAnimator.outA),

    new mc8_command('INC A', 0b00111100, commandAnimator.incA),
    new mc8_command('INC B', 0b00000100, commandAnimator.incB),
    new mc8_command('INC C', 0b00001100, commandAnimator.incC),
    new mc8_command('INC HL', 0b00100011, commandAnimator.incHl),

    new mc8_command('DEC A', 0b00111101, commandAnimator.decA),
    new mc8_command('DEC B', 0b00000101, commandAnimator.decB),
    new mc8_command('DEC C', 0b00001101, commandAnimator.decC),
    new mc8_command('DEC HL', 0b00101011, commandAnimator.decHl),

    new mc8_command('ADD A', 0b10000111, commandAnimator.addA),
    new mc8_command('ADD B', 0b10000000, commandAnimator.addB),
    new mc8_command('ADD C', 0b10000001, commandAnimator.addC),
    new mc8_command('ADD dat_8', 0b11000110, commandAnimator.addDat_8),
    new mc8_command('ADD HL, BC', 0b00001001, commandAnimator.addHlBc),

    new mc8_command('SUB A', 0b10010111, commandAnimator.subA),
    new mc8_command('SUB B', 0b10010000, commandAnimator.subB),
    new mc8_command('SUB C', 0b10010001, commandAnimator.subC),
    new mc8_command('SUB dat_8', 0b11010110, commandAnimator.subDat_8),

    new mc8_command('AND A', 0b10100111, commandAnimator.andA),
    new mc8_command('AND B', 0b10100000, commandAnimator.andB),
    new mc8_command('AND C', 0b10100001, commandAnimator.andC),
    new mc8_command('AND dat_8', 0b11100110, commandAnimator.andDat_8),

    new mc8_command('OR A', 0b10110111, commandAnimator.orA),
    new mc8_command('OR B', 0b10110000, commandAnimator.orB),
    new mc8_command('OR C', 0b10110001, commandAnimator.orC),
    new mc8_command('OR dat_8', 0b11110110, commandAnimator.orDat_8),

    new mc8_command('XOR A', 0b10101111, commandAnimator.xorA),
    new mc8_command('XOR B', 0b10101000, commandAnimator.xorB),
    new mc8_command('XOR C', 0b10101001, commandAnimator.xorC),
    new mc8_command('XOR dat_8', 0b11101110, commandAnimator.xorDat_8),

    new mc8_command('2-Byte-Befehl', 0b11001011, commandAnimator.twoByteShift),

    new mc8_command('RCL', 0b00010111, commandAnimator.rcl),
    new mc8_command('ROL', 0b00000111, commandAnimator.rol),
    new mc8_command('RCR', 0b00011111, commandAnimator.rcr),
    new mc8_command('ROR', 0b00001111, commandAnimator.ror),

    new mc8_command('CP A', 0b10111111, commandAnimator.cpA),
    new mc8_command('CP B', 0b10111000, commandAnimator.cpB),
    new mc8_command('CP C', 0b10111001, commandAnimator.cpC),
    new mc8_command('CP dat_8', 0b11111110, commandAnimator.cpDat_8),

    new mc8_command('JPNZ label', 0b11000010, commandAnimator.jpnzLabel),
    new mc8_command('JPZ label', 0b11001010, commandAnimator.jpzLabel),

    new mc8_command('JPNC label', 0b11010010, commandAnimator.jpncLabel),
    new mc8_command('JPC label', 0b11011010, commandAnimator.jpcLabel),

    new mc8_command('JPNO label', 0b11100010, commandAnimator.jpnoLabel),
    new mc8_command('JPO label', 0b11101010, commandAnimator.jpoLabel),

    new mc8_command('JPNS label', 0b11110010, commandAnimator.jpnsLabel),
    new mc8_command('JPS label', 0b11111010, commandAnimator.jpsLabel),

    new mc8_command('JP label', 0b11000011, commandAnimator.jpLabel),

    new mc8_command('CALL label', 0b11001101, commandAnimator.callLabel),
    new mc8_command('RET', 0b11001001, commandAnimator.ret),

    new mc8_command('NOP', 0b00000000, commandAnimator.nop),
    new mc8_command('HALT', 0b01110110, commandAnimator.halt),
];