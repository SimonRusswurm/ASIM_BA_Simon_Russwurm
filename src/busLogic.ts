import { getHtmlElement } from "./utils";

export class Point {
    x: number;
    y: number;

    constructor(xPosition: number, yPosition: number){
        this.x = xPosition;
        this.y = yPosition;
    }
}


export class fixPoint extends Point {
    index: number;
    label: string;
    parentIndex: number;

    constructor(index: number, parentIndex: number, xPosition: number, yPosition: number, label: string) {
        super(xPosition, yPosition);
        this.index = index;
        this.label = label;
        this.parentIndex = parentIndex;
    }

    getParent() {
        return this.parentIndex;
    }
}


const fixPoints = [
    new fixPoint( 0, -1, 10,  2, 'ROM1'),
    new fixPoint( 1,  0, 16,  2, ''),
    new fixPoint( 2,  1, 16,  0, ''),
    new fixPoint( 3,  2, 18,  0, 'IO1'),
    new fixPoint( 4,  1, 20,  2, ''),
    new fixPoint( 5,  4, 24,  2, ''),
    new fixPoint( 6,  5, 24,  0, ''),
    new fixPoint( 7,  6, 26,  0, 'IO2'),
    new fixPoint( 8,  5, 32,  2, ''),
    new fixPoint( 9,  8, 32,  0, ''),
    new fixPoint(10,  9, 34,  0, 'IO3'),
    new fixPoint(11,  8, 38,  2, 'RAM1'),
    new fixPoint(12,  4, 20,  4, ''),
    new fixPoint(13, 12, 26,  4, ''),
    new fixPoint(14, 13, 26,  6, 'ALU1'),
    new fixPoint(15, 13, 30,  4, ''),
    new fixPoint(16, 15, 30,  6, 'ALU2'),
    new fixPoint(17, 15, 34,  4, ''),
    new fixPoint(18, 17, 36,  4, ''),
    new fixPoint(19, 18, 36, 14, ''),
    new fixPoint(20, 19, 34, 14, 'IR'),
    new fixPoint(21, 17, 34, 12, ''),
    new fixPoint(22, 21, 28, 12, ''),
    new fixPoint(23, 22, 28, 10, 'ALUOUT'),
    new fixPoint(24, 12, 15,  4, ''),
    new fixPoint(25, 24, 15,  6, 'A'),
    new fixPoint(26, 25, 17,  6, 'FLAGS'),
    new fixPoint(27, 24, 12, 4, ''),
    new fixPoint(28, 27, 12, 15, ''),
    new fixPoint(29, 28, 16, 15, ''),
    new fixPoint(30, 29, 16, 14, 'IX_hi'),
    new fixPoint(31, 30, 16, 12, 'HL_hi'),
    new fixPoint(32, 31, 16, 10, 'B'),
    new fixPoint(33, 32, 18, 10, 'C'),
    new fixPoint(34, 29, 16, 16, 'SP_hi'),
    new fixPoint(35, 34, 16, 18, 'PC_hi'),
    new fixPoint(36, 35, 16, 20, 'ZR_hi'),
    new fixPoint(37, 29, 18, 15, ''),
    new fixPoint(38, 37, 18, 14, 'IX_lo'),
    new fixPoint(39, 38, 18, 12, 'HL_lo'),
    new fixPoint(40, 37, 18, 16, 'SP_lo'),
    new fixPoint(41, 40, 18, 18, 'PC_lo'),
    new fixPoint(42, 41, 18, 20, 'ZR_lo'),
    new fixPoint(43, 29, 16, 14, 'IX'),
    new fixPoint(44, 43, 16, 12, 'HL'),
    new fixPoint(45, 29, 16, 16, 'SP'),
    new fixPoint(46, 45, 16, 18, 'PC'),
    new fixPoint(47, 46, 16, 20, 'ZR'),
    new fixPoint(48, 47, 16, 23, 'DEC_UPDATE'),
    new fixPoint(49, 48, 16, 24, ''),
    new fixPoint(50, 49, 10, 24, 'ROM2'),
    new fixPoint(51, 49, 36, 24, 'RAM2'),
];


const getPointIndex = (pointLabel: string): number => {
    for (let i = 0; i < fixPoints.length; i++) {
        if (fixPoints[i].label === pointLabel)
            return i;
    }
    return -1;
}


const getIndexArrayZeroToPoint = (pointIndex: number): number[] => {
    let arrayAtoZero = [];

    while (true) {
        if (pointIndex === 0) {
            arrayAtoZero.push(0);
            return arrayAtoZero.reverse();
        } else {
            arrayAtoZero.push(pointIndex);
            pointIndex = fixPoints[pointIndex].getParent();
        }
    }
}


const getIndexArrayAtoB = (arrayZeroToA: number[], arrayZeroToB: number[]): number[] => {
    const arrayAtoB = [];
    const highestCommonIndex = getHighestCommonIndex(arrayZeroToA,arrayZeroToB);

    let aToZero_array = arrayZeroToA.reverse();

    for (let i = 0; i < aToZero_array.length; i++) {
        if (aToZero_array[i] > highestCommonIndex)
            arrayAtoB.push(aToZero_array[i]);
    }

    for (let i = 0; i < arrayZeroToB.length; i++) {
        if (arrayZeroToB[i] >= highestCommonIndex)
            arrayAtoB.push(arrayZeroToB[i]);
    }

    return arrayAtoB;
}

const getHighestCommonIndex = (arrayZeroToA: number[], arrayZeroToB: number[]): number => {
    const smallestLength = (arrayZeroToA < arrayZeroToB ? arrayZeroToA.length : arrayZeroToB.length);
    let highestCommonIndex = 0;

    for (let i = 0; i < smallestLength; i++) {
        if (arrayZeroToA[i] === arrayZeroToB[i]) {
            highestCommonIndex = arrayZeroToA[i];
        }
    }
    return highestCommonIndex;
}



const romElementToROM1 = (romElementID: string): Array < fixPoint > => {
    let toROM1 = [];
    let romElement = getHtmlElement(romElementID);
    let rEx: any = romElement.style.left.replace('%', '');
    let rEy: any = romElement.style.top.replace('%', '');
    rEx = Math.round(Number(rEx) * 50 / 100);
    rEy = Math.round(Number(rEy) * 32 / 100);

    let romIntermediatePoint = new fixPoint(-1, 0, rEx, 2, '');
    let romPoint = new fixPoint(-1, 0, rEx, rEy, '');

    toROM1.push(romPoint);
    toROM1.push(romIntermediatePoint);
    return toROM1;
}

const ramElementToRAM1 = (ramElementID: string): Array < fixPoint > => {
    let toRAM1 = [];
    let ramElement = getHtmlElement(ramElementID);
    let rEx: any = ramElement.style.left.replace('%', '');
    let rEy: any = ramElement.style.top.replace('%', '');
    rEx = Math.round(Number(rEx) * 50 / 100);
    rEy = Math.round(Number(rEy) * 32 / 100);

    let ramIntermediatePoint = new fixPoint(-1, 0, rEx, 2, '');
    let romPoint = new fixPoint(-1, 0, rEx, rEy, '');

    toRAM1.push(romPoint);
    toRAM1.push(ramIntermediatePoint);
    return toRAM1;
}

const RAM2ToRamElement = (ramElementID_string: string): Array < fixPoint > => {
    let toRamElement = [];
    const ramElement = getHtmlElement(ramElementID_string);
    let rEx: any = ramElement.style.left.replace('%', '');
    let rEy: any = ramElement.style.top.replace('%', '');
    rEx = Math.round(Number(rEx) * 50 / 100);
    rEy = Math.round(Number(rEy) * 32 / 100);

    let ramBetweenPoint = new fixPoint(-1, 0, rEx, 2, '');
    let ramPoint = new fixPoint(-1, 0, rEx, rEy, '');

    toRamElement.push(ramBetweenPoint);
    toRamElement.push(ramPoint);
    return toRamElement;
}

//returns the fixPoints to pass during the movement
export const getFixPointsAtoB = (fixPointLabelA: string, fixPointLabelB: string): Array < fixPoint > => {
    let pointsAtoB: Array<fixPoint> = [];
    let indexBuffer: number[];

    if (fixPointLabelA.includes('romElement')) {
        pointsAtoB = getFixPointsAtoB('ROM1', fixPointLabelB);
        pointsAtoB = romElementToROM1(fixPointLabelA).concat(pointsAtoB);
        return pointsAtoB;
    }
    if (fixPointLabelA.includes('ramElement')) {
        pointsAtoB = getFixPointsAtoB('RAM1', fixPointLabelB);
        pointsAtoB = ramElementToRAM1(fixPointLabelA).concat(pointsAtoB);
        return pointsAtoB;
    }
    if (fixPointLabelB.includes('ramElement')) {
        pointsAtoB = getFixPointsAtoB(fixPointLabelA, 'RAM1');
        pointsAtoB = pointsAtoB.concat(RAM2ToRamElement(fixPointLabelB));
        return pointsAtoB;
    }

    indexBuffer = getIndexArrayAtoB(getIndexArrayZeroToPoint(getPointIndex(fixPointLabelA)),
        getIndexArrayZeroToPoint(getPointIndex(fixPointLabelB)));


    for (let i = 0; i < indexBuffer.length; i++) {
        pointsAtoB.push(fixPoints[indexBuffer[i]]);
    }
    return pointsAtoB;
}

//calculates the coordinates between the fixPoints.
//At Speed 1, the movingObject updates every single coordinate
//At Speed 2, the movingObject updates every second coordinate...
//max Speed = 12 (update only fixPoints)

export const calcIntermediatePositions = (pointsAtoB: Array<fixPoint>, interPointsQuantity = 12): number[][][] => {
    let xPositions = [];
    let yPositions = [];
    let finalXCoordinates: any = [];
    let finalYCoordinates: any = [];
    let posDiff = 0;
    const reciprocal = 1 / interPointsQuantity;
    
    for (let j = 0; j < pointsAtoB.length-1; j++) {

        if (pointsAtoB[j].y !== pointsAtoB[j + 1].y) {
            posDiff = Math.abs((pointsAtoB[j + 1].y - pointsAtoB[j].y));

            for (let i = 0; i < interPointsQuantity * posDiff; i++) {
                if ((pointsAtoB[j + 1].y > pointsAtoB[j].y))
                    yPositions.push(pointsAtoB[j].y + reciprocal * (i + 1));
                else
                    yPositions.push(pointsAtoB[j].y - reciprocal * (i + 1));

                xPositions.push(pointsAtoB[j].x);
            }
        }
        if (pointsAtoB[j].x !== pointsAtoB[j + 1].x) {
            posDiff = Math.abs((pointsAtoB[j + 1].x - pointsAtoB[j].x));

            for (let i = 0; i < interPointsQuantity * posDiff; i++) {
                if ((pointsAtoB[j + 1].x > pointsAtoB[j].x))
                    xPositions.push(pointsAtoB[j].x + reciprocal * (i + 1));
                else
                    xPositions.push(pointsAtoB[j].x - reciprocal * (i + 1));

                yPositions.push(pointsAtoB[j].y);
            }
        }
    }

    //create 2-dimensional array, which contains 12 coordinates per index
    for (let i = 0, k = -1; i < xPositions.length; i++) {
        if (i % interPointsQuantity === 0) {
            k++;
            finalXCoordinates[k] = [];
            finalYCoordinates[k] = [];
        }
        finalXCoordinates[k].push(xPositions[i]);
        finalYCoordinates[k].push(yPositions[i]);
    }
    return [finalXCoordinates, finalYCoordinates];
}

export const getPointsAtoB = (fixPointLabelA: string, fixPointLabelB: string): Array < Point > => {
    const fixPoints: Array<fixPoint> = getFixPointsAtoB(fixPointLabelA, fixPointLabelB);
    let points: Array<Point> = [];

    
    for (let i = 0; i < fixPoints.length-1; i++) {
        points = points.concat(intermediatePositions(fixPoints[i], fixPoints[i+1]));
    }
    points = points.concat(fixPoints[fixPoints.length-1]);
    return points;
}

const intermediatePositions = (pointA: Point, pointB: Point, interPointsQuantity = 12): Array<Point> => {
    const points: Array<Point> = [];
    let pathDifference = 0;
    let newCoordinate = 0;
    const reciprocalQuantity = 1 / interPointsQuantity;

    points.push(pointA);
    if(pointA.x !== pointB.x){
        pathDifference = pointB.x - pointA.x;

        for (let i = 1; i < interPointsQuantity * Math.abs(pathDifference); i++) {
            if(pathDifference > 0)
                newCoordinate = pointA.x + reciprocalQuantity * (i);
            else
                newCoordinate = pointA.x - reciprocalQuantity * (i);
            
            points.push(new Point(newCoordinate, pointA.y));
        }
    }
    else{
        pathDifference = pointB.y - pointA.y;

        for (let i = 1; i < interPointsQuantity * Math.abs(pathDifference); i++) {
            if(pathDifference > 0)
                newCoordinate = pointA.y + reciprocalQuantity * (i);
            else
                newCoordinate = pointA.y - reciprocalQuantity * (i);
            
            points.push(new Point(pointA.x, newCoordinate));
        }
    }

    return points;
}