import { getHtmlElement } from "./index";

export class Point {
    index: number;
    x: number;
    y: number;
    label: string;
    parentIndex: number;
    children: number[];

    constructor(index_number: number, parentIndex_number: number, x_number: number, y_number: number, label_string: string) {
        this.index = index_number;
        this.x = x_number;
        this.y = y_number;
        this.label = label_string;
        this.parentIndex = parentIndex_number;
        this.children = [];
    }

    getParent() {
        return this.parentIndex;
    }
}



const fixPoints = [
    new Point( 0, -1, 10,  2, 'ROM1'),
    new Point( 1,  0, 16,  2, ''),
    new Point( 2,  1, 16,  0, ''),
    new Point( 3,  2, 18,  0, 'IO1'),
    new Point( 4,  1, 20,  2, ''),
    new Point( 5,  4, 24,  2, ''),
    new Point( 6,  5, 24,  0, ''),
    new Point( 7,  6, 26,  0, 'IO2'),
    new Point( 8,  5, 32,  2, ''),
    new Point( 9,  8, 32,  0, ''),
    new Point(10,  9, 34,  0, 'IO3'),
    new Point(11,  8, 38,  2, 'RAM1'),
    new Point(12,  4, 20,  4, ''),
    new Point(13, 12, 26,  4, ''),
    new Point(14, 13, 26,  6, 'ALU1'),
    new Point(15, 13, 30,  4, ''),
    new Point(16, 15, 30,  6, 'ALU2'),
    new Point(17, 15, 34,  4, ''),
    new Point(18, 17, 36,  4, ''),
    new Point(19, 18, 36, 14, ''),
    new Point(20, 19, 34, 14, 'IR'),
    new Point(21, 17, 34, 12, ''),
    new Point(22, 21, 28, 12, ''),
    new Point(23, 22, 28, 10, 'ALUOUT'),
    new Point(24, 12, 15,  4, ''),
    new Point(25, 24, 15,  6, 'A'),
    new Point(26, 25, 17,  6, 'FLAGS'),
    new Point(27, 24, 12, 4, ''),
    new Point(28, 27, 12, 15, ''),
    new Point(29, 28, 16, 15, ''),
    new Point(30, 29, 16, 14, 'IX_hi'),
    new Point(31, 30, 16, 12, 'HL_hi'),
    new Point(32, 31, 16, 10, 'B'),
    new Point(33, 32, 18, 10, 'C'),
    new Point(34, 29, 16, 16, 'SP_hi'),
    new Point(35, 34, 16, 18, 'PC_hi'),
    new Point(36, 35, 16, 20, 'ZR_hi'),
    new Point(37, 29, 18, 15, ''),
    new Point(38, 37, 18, 14, 'IX_lo'),
    new Point(39, 38, 18, 12, 'HL_lo'),
    new Point(40, 37, 18, 16, 'SP_lo'),
    new Point(41, 40, 18, 18, 'PC_lo'),
    new Point(42, 41, 18, 20, 'ZR_lo'),
    new Point(43, 29, 16, 14, 'IX'),
    new Point(44, 43, 16, 12, 'HL'),
    new Point(45, 29, 16, 16, 'SP'),
    new Point(46, 45, 16, 18, 'PC'),
    new Point(47, 46, 16, 20, 'ZR'),
    new Point(48, 47, 16, 23, 'DEC_UPDATE'),
    new Point(49, 48, 16, 24, ''),
    new Point(50, 49, 10, 24, 'ROM2'),
    new Point(51, 49, 36, 24, 'RAM2'),
];

//returns the index/position of a fixPoint in the fixPoint-array
const getPointIndex = (pointID_string: string): number => {
    for (let i = 0; i < fixPoints.length; i++) {
        if (fixPoints[i].label === pointID_string)
            return i;
    }
    return -1;
}

//returns the indices from Zero(ROM1) to the passed point index. 
const getIndexArrayZeroToPoint = (pointIndex_number: number): number[] => {
    let atoZero = [];

    while (true) {
        if (pointIndex_number === 0) {
            atoZero.push(0);
            return atoZero.reverse();
        } else {
            atoZero.push(pointIndex_number);
            pointIndex_number = fixPoints[pointIndex_number].getParent();
        }
    }
}

//merges zeroToA_array and zeroToB_array to AtoB_array
const getIndexArrayAtoB = (zeroToA_array: number[], zeroToB_array: number[]): number[] => {
    const smallerArray = (zeroToA_array < zeroToB_array ? zeroToA_array.length : zeroToB_array.length);
    let AtoB = [];
    let buffer = 0;

    //find smallest common index and save in buffer;
    for (let i = 0; i < smallerArray; i++) {
        if (zeroToA_array[i] === zeroToB_array[i]) {
            buffer = zeroToA_array[i];
        }
    }
    //reverse indexArray zeroToA
    let aToZero_array = zeroToA_array.reverse();

    
    //add index to AtoB-array as long as the index is smaller than buffer
    for (let i = 0; i < aToZero_array.length; i++) {
        if (aToZero_array[i] > buffer)
            AtoB.push(aToZero_array[i]);
    }

    //add index to AtoB-array when index is equal or greater to buffer
    for (let i = 0; i < zeroToB_array.length; i++) {
        if (zeroToB_array[i] >= buffer)
            AtoB.push(zeroToB_array[i]);
    }
    return AtoB;
}

// rom- and ram-Elements are not fixPoints. Therefore they need to be handled separately.
const romElementToROM1 = (romElementID_string: string): Array < Point > => {
    let toROM1 = [];
    let romElement = getHtmlElement(romElementID_string);
    let rEx: any = romElement.style.left.replace('%', '');
    let rEy: any = romElement.style.top.replace('%', '');
    rEx = Math.round(Number(rEx) * 50 / 100);
    rEy = Math.round(Number(rEy) * 32 / 100);

    let romBetweenPoint = new Point(-1, 0, rEx, 2, '');
    let romPoint = new Point(-1, 0, rEx, rEy, '');

    toROM1.push(romPoint);
    toROM1.push(romBetweenPoint);
    return toROM1;
}

const ramElementToRAM1 = (ramElementID_string: string): Array < Point > => {
    let toRAM1 = [];
    let ramElement = getHtmlElement(ramElementID_string);
    let rEx: any = ramElement.style.left.replace('%', '');
    let rEy: any = ramElement.style.top.replace('%', '');
    rEx = Math.round(Number(rEx) * 50 / 100);
    rEy = Math.round(Number(rEy) * 32 / 100);

    let romBetweenPoint = new Point(-1, 0, rEx, 2, '');
    let romPoint = new Point(-1, 0, rEx, rEy, '');

    toRAM1.push(romPoint);
    toRAM1.push(romBetweenPoint);
    return toRAM1;
}

const RAM2ToRamElement = (ramElementID_string: string): Array < Point > => {
    let toRamElement = [];
    const ramElement = getHtmlElement(ramElementID_string);
    let rEx: any = ramElement.style.left.replace('%', '');
    let rEy: any = ramElement.style.top.replace('%', '');
    rEx = Math.round(Number(rEx) * 50 / 100);
    rEy = Math.round(Number(rEy) * 32 / 100);

    let ramBetweenPoint = new Point(-1, 0, rEx, 2, '');
    let ramPoint = new Point(-1, 0, rEx, rEy, '');

    toRamElement.push(ramBetweenPoint);
    toRamElement.push(ramPoint);
    return toRamElement;
}

//returns the fixPoints to pass during the movement
export const getPointsAtoB = (fixPointLabelA_string: string, fixPointLabelB_string: string): Array < Point > => {
    let pointsAtoB: any = [];

    //The bus-system does not include rom- or ram-Elements.
    if (fixPointLabelA_string.includes('romElement')) {
        pointsAtoB = getPointsAtoB('ROM1', fixPointLabelB_string);
        pointsAtoB = romElementToROM1(fixPointLabelA_string).concat(pointsAtoB);
        return pointsAtoB;
    }
    if (fixPointLabelA_string.includes('ramElement')) {
        pointsAtoB = getPointsAtoB('RAM1', fixPointLabelB_string);
        pointsAtoB = ramElementToRAM1(fixPointLabelA_string).concat(pointsAtoB);
        return pointsAtoB;
    }
    if (fixPointLabelB_string.includes('ramElement')) {
        pointsAtoB = getPointsAtoB(fixPointLabelA_string, 'RAM1');
        pointsAtoB = pointsAtoB.concat(RAM2ToRamElement(fixPointLabelB_string));
        return pointsAtoB;
    }

    pointsAtoB = getIndexArrayAtoB(getIndexArrayZeroToPoint(getPointIndex(fixPointLabelA_string)),
        getIndexArrayZeroToPoint(getPointIndex(fixPointLabelB_string)));

    //convert Index-Array to Point-Array
    for (let i = 0; i < pointsAtoB.length; i++) {
        pointsAtoB[i] = fixPoints[pointsAtoB[i]];
    }
    // console.log(pointsAtoB);
    return pointsAtoB;
}

//calculates the coordinates between the fixPoints.
//At Speed 1, the movingObject updates every single coordinate
//At Speed 2, the movingObject updates every second coordinate...
//max Speed = 12 (update only fixPoints)
export const calcIntermediatePositions = (pointsAtoB_array: Array < Point > , interPointsQuantity = 12): number[][][] => {
    let xPositions = [];
    let yPositions = [];
    let bufferX: any = [];
    let bufferY: any = [];
    let posDiff = 0;
    const reciprocal = 1 / interPointsQuantity;

    //iterate through path
    for (let j = 0; j < pointsAtoB_array.length - 1; j++) {

        //If path position is different to the next path position, calculate position difference
        //and add intermediate Points, depending on the position difference and direction.
        if (pointsAtoB_array[j].y !== pointsAtoB_array[j + 1].y) {
            posDiff = Math.abs((pointsAtoB_array[j + 1].y - pointsAtoB_array[j].y));

            for (let i = 0; i < interPointsQuantity * posDiff; i++) {
                if ((pointsAtoB_array[j + 1].y > pointsAtoB_array[j].y))
                    yPositions.push(pointsAtoB_array[j].y + reciprocal * (i + 1));
                else
                    yPositions.push(pointsAtoB_array[j].y - reciprocal * (i + 1));

                xPositions.push(pointsAtoB_array[j].x);
            }
        }
        if (pointsAtoB_array[j].x !== pointsAtoB_array[j + 1].x) {
            posDiff = Math.abs((pointsAtoB_array[j + 1].x - pointsAtoB_array[j].x));

            for (let i = 0; i < interPointsQuantity * posDiff; i++) {
                if ((pointsAtoB_array[j + 1].x > pointsAtoB_array[j].x))
                    xPositions.push(pointsAtoB_array[j].x + reciprocal * (i + 1));
                else
                    xPositions.push(pointsAtoB_array[j].x - reciprocal * (i + 1));

                yPositions.push(pointsAtoB_array[j].y);
            }
        }
    }

    //create 2-dimensional array, which contains 12 coordinates per index
    for (let i = 0, k = -1; i < xPositions.length; i++) {
        if (i % interPointsQuantity === 0) {
            k++;
            bufferX[k] = [];
            bufferY[k] = [];
        }
        bufferX[k].push(xPositions[i]);
        bufferY[k].push(yPositions[i]);
    }
    return [bufferX, bufferY];
}

