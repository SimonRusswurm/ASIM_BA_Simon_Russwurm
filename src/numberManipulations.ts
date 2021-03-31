
export const convertHexToNumber = (hexValue_string: string): number => parseInt(hexValue_string, 16);

export const convertNumberToHex_4digits = (value_number: number): string => {
    let toReturn: string = value_number.toString(16);
    toReturn = toReturn.toUpperCase();
    const len: number = toReturn.length;
    for (let i = 4; i > len; i--) {
        toReturn = '0' + toReturn;
    }
    return toReturn;
}

export const convertNumberToHex_2digits = (value_number: number): string => {
    let toReturn: string = value_number.toString(16);
    toReturn = toReturn.toUpperCase();
    const len: number = toReturn.length;
    for (let i = 2; i > len; i--) {
        toReturn = '0' + toReturn;
    }
    return toReturn;
}

export const convertNumberTo8DigitsBinaryString = (value_number: number): string => {

    let toReturn: string = (value_number).toString(2);
    const len: number = toReturn.length;
    if (len != 8) {
        for (let i = 0; i < 8 - len; i++) {
            toReturn = '0' + toReturn;
        }
    }
    toReturn = toReturn[0] + toReturn[1] + toReturn[2] + toReturn[3] + ' ' + toReturn[4] + toReturn[5] + toReturn[6] + toReturn[7];
    return toReturn;
}

export const convertNumberToBinaryArray = (value_number: number): number[] => {
    const bin: string = convertNumberTo8DigitsBinaryString(value_number).replace(' ', '');
    let toReturn = [];
    for (let i = 0; i < bin.length; i++) {
        toReturn.push(Number(bin[i]));
    }
    return toReturn;
}

export const convertBinaryToNumber = (binValue_string: string): number => {
    return Number(`0b${binValue_string}`);
}

export const convertNumberToComplementOnTwo = (value_number: number): number => {
    if (value_number > 127) {
        value_number = value_number - 256;
    }
    return value_number;
}

export const checkValidHex = (hexValue_string: string): boolean => {
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

export const calculateChecksum = (intelHexFormat_string: string): string => {
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