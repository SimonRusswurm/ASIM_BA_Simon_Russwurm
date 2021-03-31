import {convertNumberToBinaryArray, convertBinaryToNumber, } from './numberManipulations';

export class Flags {
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

export class Alu {
    FLAGS: Flags;

    constructor(FLAGS_class: Flags){
        this.FLAGS = FLAGS_class;
    };

    setFlags(value_number: number, binValue_array: number[], binCarry_array: number[], setC: number, setZ: number, setP: number, setV: number, setS: number): void{

        //carry flag
        if (setC) {
            this.FLAGS.c_number = binCarry_array[0];
        } else {
            this.FLAGS.c_number = '-';
        }
    
        //zero flag
        if (setZ) {
            if (value_number === 0)
                this.FLAGS.z_number = 1;
            else
                this.FLAGS.z_number = 0;
        } else {
            this.FLAGS.z_number = '-';
        }
    
        //sing flag
        if (setS) {
            this.FLAGS.s_number = binValue_array[0];
        } else {
            this.FLAGS.s_number = '-';
        }
    
        //parity flag
        if (setP) {
            let cnt = 0;
            for (let i = 0; i < binValue_array.length; i++) {
                if (binValue_array[i])
                    cnt += 1;
            }
            if (cnt % 2 === 0)
                this.FLAGS.p_number = 1;
            else
                this.FLAGS.p_number = 0;
        }
        //overflow flag
        else if (setV) {
            if ((binCarry_array[0] === 1 && binCarry_array[1] === 0) || (binCarry_array[0] === 0 && binCarry_array[1] === 1))
                this.FLAGS.p_number = 1;
            else
                this.FLAGS.p_number = 0;
        } else {
            this.FLAGS.p_number = '-';
        }
    }

    addBinary(value1_number: number, value2_number: number, replacementAddition_boolean: boolean): number{
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
        this.setFlags(sum_number, sum_bin, carry_bin, 1, 1, 0, 1, 1);
    
        //if the addition was a replace-addition switch sign-flag
        if (replacementAddition_boolean) {
            if (this.FLAGS.c_number)
                this.FLAGS.c_number = 0;
            else
                this.FLAGS.c_number = 1;
        }
    
        return sum_number;
    }

    incBinary = (value_number: number): number => {
        const result: number = this.addBinary(value_number, 1, false);
        this.FLAGS.c_number = '-';
        return result;
    }

    decBinary(value_number: number): number {
        const result: number = this.addBinary(value_number, 1, true);
        this.FLAGS.c_number = '-';
        return result;
    }

    andBinary(value1_number: number, value2_number: number): number {
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
    
        this.setFlags(result, result_bin, [0], 1, 1, 1, 0, 1);
    
        return result;
    }

    orBinary(value1_number: number, value2_number: number): number {
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
    
        this.setFlags(result, result_bin, [0], 1, 1, 1, 0, 1);
    
        return result;
    }

    xorBinary(value1_number: number, value2_number: number): number {
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
    
        this.setFlags(result, result_bin, [0], 1, 1, 1, 0, 1);
    
    
        return result;
    }

    shlBinary(value_number: number): number {
        let value_bin: number[] = convertNumberToBinaryArray(value_number);
        let result: number = 0;
        let firstBit: number = value_bin[0];
    
        for (let i = 0; i < value_bin.length - 1; i++) {
            value_bin[i] = value_bin[i + 1];
        }
        value_bin[7] = 0;
    
        result = convertBinaryToNumber(value_bin.join(''));
    
        this.setFlags(result, value_bin, [firstBit], 1, 1, 1, 0, 1);
    
        return result;
    }

    shrBinary(value_number: number): number {
        let value_bin: number[] = convertNumberToBinaryArray(value_number);
        let result: number = 0;
        let lastBit: number = value_bin[7];
    
        for (let i = 7; i > 0; i--) {
            value_bin[i] = value_bin[i - 1];
        }
        value_bin[0] = 0;
    
        result = convertBinaryToNumber(value_bin.join(''));
    
        this.setFlags(result, value_bin, [lastBit], 1, 1, 1, 0, 1);
    
        return result;
    }

    rclBinary(value_number: number): number {
        let value_bin: number[] = convertNumberToBinaryArray(value_number);
        let result: number = 0;
    
        //save bit position 7 for setFlags ( [7,6,5,4,3,2,1,0])
        let carry: number = value_bin[0];
    
        //shift all bits left
        for (let i = 0; i < value_bin.length - 1; i++) {
            value_bin[i] = value_bin[i + 1];
        }
    
        //write carry-flag in bit position 0 
        value_bin[7] = this.FLAGS.c_number;
    
        result = convertBinaryToNumber(value_bin.join(''));
    
        //set flags
        this.setFlags(result, value_bin, [carry], 1, 0, 0, 0, 0);
    
        return result;
    }

    rolBinary(value_number: number): number {
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
    
        this.setFlags(result, value_bin, [carry], 1, 0, 0, 0, 0);
    
        return result;
    }

    rcrBinary(value_number: number): number {
        let value_bin: number[] = convertNumberToBinaryArray(value_number);
        let result: number = 0;
    
        //save bit position 0 for setFlags ([7,6,5,4,3,2,1,0])
        let carry: number = value_bin[7];
    
        for (let i = 7; i > 0; i--) {
            value_bin[i] = value_bin[i - 1];
        }
    
        //write carry-flag into bit 7
        value_bin[0] = this.FLAGS.c_number;
    
        result = convertBinaryToNumber(value_bin.join(''));
    
        this.setFlags(result, value_bin, [carry], 1, 0, 0, 0, 0);
    
        return result;
    }

    rorBinary(value_number: number): number {
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
    
        this.setFlags(result, value_bin, [carry], 1, 0, 0, 0, 0);
    
        return result;
    }  
}