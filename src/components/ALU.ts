import { getHtmlElement } from "../utils";
import { convertNumberToBinaryArray, convertBinaryToNumber, } from '../numberManipulations';
import { Flags, Register_x2 } from './RegisterClasses';

export class Alu {
    FLAGS: Flags;
    operandRegister1 = new Register_x2(getHtmlElement('alu1RegisterValue_h2'));
    operandRegister2 = new Register_x2(getHtmlElement('alu2RegisterValue_h2'));
    resultRegister = new Register_x2(getHtmlElement('aluOutRegisterValue_h2'));

    constructor(FLAGS_class: Flags){
        this.FLAGS = FLAGS_class;
    };

    setFlags(resultValue: number, binaryResult: number[], carryArray: number[], cFlag: number, zFlag: number, setP: number, vFlag: number, sFlag: number): void{

        //carry flag
        if (cFlag) {
            this.FLAGS.cFlag = carryArray[0];
        } else {
            this.FLAGS.cFlag = '-';
        }
    
        //zero flag
        if (zFlag) {
            if (resultValue === 0)
                this.FLAGS.zFlag = 1;
            else
                this.FLAGS.zFlag = 0;
        } else {
            this.FLAGS.zFlag = '-';
        }
    
        //sing flag
        if (sFlag) {
            this.FLAGS.sFlag = binaryResult[0];
        } else {
            this.FLAGS.sFlag = '-';
        }
    
        //parity flag
        if (setP) {
            let cnt = 0;
            for (let i = 0; i < binaryResult.length; i++) {
                if (binaryResult[i])
                    cnt += 1;
            }
            if (cnt % 2 === 0)
                this.FLAGS.pFlag = 1;
            else
                this.FLAGS.pFlag = 0;
        }
        //overflow flag
        else if (vFlag) {
            if ((carryArray[0] === 1 && carryArray[1] === 0) || (carryArray[0] === 0 && carryArray[1] === 1))
                this.FLAGS.pFlag = 1;
            else
                this.FLAGS.pFlag = 0;
        } else {
            this.FLAGS.pFlag = '-';
        }
    }

    invertBinaryArray(binaryArray: number[]): number[] {
        for (let i = 0; i < binaryArray.length; i++) {
            if (binaryArray[i] === 0)
                binaryArray[i] = 1;
            else
                binaryArray[i] = 0;
        }
        return binaryArray;
    }

    addThreeBinaryNumbers(number1: number, number2: number, number3: number): number[]{
        const sum = number1 + number2 + number3;
    
        if(sum === 0) return [0,0];
        if(sum === 1) return [1,0];
        if(sum === 2) return [0,1];
        if(sum === 3) return [1,1];
        throw Error('NoBinaryNumbers');
    }

    addBinary(firstSummand: number, secondSummand: number, isReplacementAddition: boolean): number{
        let firstSummandBinaryArray: number[] = convertNumberToBinaryArray(firstSummand);
        let secondSummandBinaryArray: number[] = convertNumberToBinaryArray(secondSummand);
        let carryBinaryArray: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        let sumBinaryArray: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
        let sum: number = 0;
    
    
        if (isReplacementAddition) {
            carryBinaryArray[8] = 1;
            secondSummandBinaryArray = this.invertBinaryArray(secondSummandBinaryArray);
        }
    
    
        for (let i = 8; i > 0; i--) {
            let result = this.addThreeBinaryNumbers(firstSummandBinaryArray[i - 1],secondSummandBinaryArray[i - 1],carryBinaryArray[i])
            sumBinaryArray[i - 1] = result[0];
            carryBinaryArray[i - 1] = result[1];
        }
    
        sum = convertBinaryToNumber(sumBinaryArray.join(''));
    
        this.setFlags(sum, sumBinaryArray, carryBinaryArray, 1, 1, 0, 1, 1);
    
        if (isReplacementAddition) {
            if (this.FLAGS.cFlag)
                this.FLAGS.cFlag = 0;
            else
                this.FLAGS.cFlag = 1;
        }
    
        return sum;
    }


    incBinary = (value: number): number => {
        const result: number = this.addBinary(value, 1, false);
        this.FLAGS.cFlag = '-';
        return result;
    }

    decBinary(value: number): number {
        const result: number = this.addBinary(value, 1, true);
        this.FLAGS.cFlag = '-';
        return result;
    }

    andBinary(value1: number, value2: number): number {
        let value1_bin: number[] = convertNumberToBinaryArray(value1);
        let value2_bin: number[] = convertNumberToBinaryArray(value2);
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

    orBinary(value1: number, value2: number): number {
        let value1_bin: number[] = convertNumberToBinaryArray(value1);
        let value2_bin: number[] = convertNumberToBinaryArray(value2);
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

    xorBinary(value1: number, value2: number): number {
        let value1_bin: number[] = convertNumberToBinaryArray(value1);
        let value2_bin: number[] = convertNumberToBinaryArray(value2);
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

    shlBinary(value: number): number {
        let value_bin: number[] = convertNumberToBinaryArray(value);
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

    shrBinary(value: number): number {
        let value_bin: number[] = convertNumberToBinaryArray(value);
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

    rclBinary(value: number): number {
        let value_bin: number[] = convertNumberToBinaryArray(value);
        let result: number = 0;
    
        //save bit position 7 for setFlags ( [7,6,5,4,3,2,1,0])
        let carry: number = value_bin[0];
    
        //shift all bits left
        for (let i = 0; i < value_bin.length - 1; i++) {
            value_bin[i] = value_bin[i + 1];
        }
    
        //write carry-flag in bit position 0 
        value_bin[7] = this.FLAGS.cFlag;
    
        result = convertBinaryToNumber(value_bin.join(''));
    
        //set flags
        this.setFlags(result, value_bin, [carry], 1, 0, 0, 0, 0);
    
        return result;
    }

    rolBinary(value: number): number {
        let value_bin: number[] = convertNumberToBinaryArray(value);
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

    rcrBinary(value: number): number {
        let value_bin: number[] = convertNumberToBinaryArray(value);
        let result: number = 0;
    
        //save bit position 0 for setFlags ([7,6,5,4,3,2,1,0])
        let carry: number = value_bin[7];
    
        for (let i = 7; i > 0; i--) {
            value_bin[i] = value_bin[i - 1];
        }
    
        //write carry-flag into bit 7
        value_bin[0] = this.FLAGS.cFlag;
    
        result = convertBinaryToNumber(value_bin.join(''));
    
        this.setFlags(result, value_bin, [carry], 1, 0, 0, 0, 0);
    
        return result;
    }

    rorBinary(value: number): number {
        let value_bin: number[] = convertNumberToBinaryArray(value);
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