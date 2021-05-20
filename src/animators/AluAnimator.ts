import { getHtmlElement, sleepBetweenFrames, sleepForIDLETIME } from "../utils";
import { animationWindow } from "../animationWindow";
import { mc8Components } from "../components/Mc8Components";
import { programStatus } from "../ProgramStatus";
import { arrowAnimator } from "./ArrowAnimator";
import { controlUnitAnimator } from "./ControlUnitAnimator";
import { registerAnimator } from "./RegisterAnimator";
import { transferAnimator } from "./TransferAnimator";

class AluAnimator {
    private movingAluElement_1: HTMLElement;
    private movingAluElement_2: HTMLElement;
    private xCoordinatesElement_1: number[];
    private xCoordinatesElement_2: number[];
    private yCoordinates: number[];

    private movingFlags: HTMLElement;

    constructor(){
        this.movingAluElement_1 = getHtmlElement('movingAlu1_h2');
        this.movingAluElement_2 = getHtmlElement('movingAlu2_h2');
        this.xCoordinatesElement_1 = [];
        this.xCoordinatesElement_2 = [];
        this.yCoordinates = [];
        this.initCoordinates();
        this.resetMovingAluElements();

        this.movingFlags = getHtmlElement('movingFlags_div');
    }

    private initCoordinates(){
        const partialSteps = 40;
        this.xCoordinatesElement_1 = [26];
        this.xCoordinatesElement_2 = [30];
        this.yCoordinates = [6];
        for (let i = 1; i < partialSteps; i++) {
            this.xCoordinatesElement_1.push(this.xCoordinatesElement_1[i-1] + 2 / partialSteps);
            this.xCoordinatesElement_2.push(this.xCoordinatesElement_2[i-1] - 2 / partialSteps);
            this.yCoordinates.push(this.yCoordinates[i-1] + 4 / partialSteps);
        }
    }

    async loadOperands (register1: string, register2: string): Promise<any> {
        const reg1_class = mc8Components.getRegisterByName(register1);
        const reg2_class = mc8Components.getRegisterByName(register2);
    
        await controlUnitAnimator.stepDescriptionUpdate('Hole den 1. Operanden');
        await transferAnimator.transfer(register1, 'ALU1', reg1_class.value);
        await registerAnimator.registerUpdate('ALU1', reg1_class.value);
        await controlUnitAnimator.stepDescriptionUpdate('Hole den 2. Operanden');
        await transferAnimator.transfer(register2, 'ALU2', reg2_class.value);
        await registerAnimator.registerUpdate('ALU2', reg2_class.value);
    }

    async basicAnimation (result: number, twoMovingAluElements: boolean, displayCarryArrow: boolean, nameOfRegisterToSave: string): Promise<any> {
        if (programStatus.animationType_1 || programStatus.animationType_2) {    
            await this.moveAluElements(result, twoMovingAluElements, displayCarryArrow);
        } else { //noAnim
            await registerAnimator.registerUpdate('ALUOUT', result);
            mc8Components.ALU.operandRegister1.htmlElement.textContent = '';
            mc8Components.ALU.operandRegister2.htmlElement.textContent = '';
        }
    
        try {
            await controlUnitAnimator.stepDescriptionUpdate('Setze die Flags');
            await this.animateSetFlags();
            if (nameOfRegisterToSave)
                await controlUnitAnimator.stepDescriptionUpdate('Speichere das Ergebnis');
        } finally {
            mc8Components.ALU.resultRegister.htmlElement.classList.remove('yellowBg', 'borderBox');
            mc8Components.ALU.resultRegister.htmlElement.textContent = '';
        }
        if (nameOfRegisterToSave !== '') {
            await transferAnimator.transfer('ALUOUT', nameOfRegisterToSave, result);
            await registerAnimator.registerUpdate(nameOfRegisterToSave, result);
        }
    }

    private async moveAluElements(result: number, twoMovingAluElements: boolean, displayCarryArrow: boolean) {
        this.displayMovingAluElements(twoMovingAluElements);
    
        try {
            if (displayCarryArrow)
                await arrowAnimator.displayAluCarryArrow();

            await sleepForIDLETIME();

            for (let i = 0; i < this.xCoordinatesElement_1.length; i++) {
                this.updateMovingAlu1ElementPosition(this.xCoordinatesElement_1[i], this.yCoordinates[i]);
                this.updateMovingAlu2ElementPosition(this.xCoordinatesElement_2[i], this.yCoordinates[i]);
                await sleepBetweenFrames();
            }
            this.resetMovingAluElements();
            mc8Components.ALU.resultRegister.htmlElement.classList.add('borderBox');
            await registerAnimator.registerUpdate('ALUOUT', result);
        } finally {
            this.resetMovingAluElements();
        }
        mc8Components.ALU.resultRegister.htmlElement.classList.add('yellowBg');
    }

    private displayMovingAluElements (twoMovingAluElements: boolean): void {
        this.movingAluElement_1.textContent = mc8Components.ALU.operandRegister1.htmlElement.textContent;
        this.movingAluElement_2.textContent = mc8Components.ALU.operandRegister2.htmlElement.textContent;
        this.movingAluElement_1.classList.add('displayGrid');
        if (twoMovingAluElements)
            this.movingAluElement_2.classList.add('displayGrid');
        this.removeAluOperandRegisterText();
    }

    private resetMovingAluElements () {
        this.movingAluElement_1.classList.remove('displayGrid');
        this.movingAluElement_2.classList.remove('displayGrid');
    
        this.movingAluElement_1.style.top = `${100 / animationWindow.sectionsCountHeight * 6}%`;
        this.movingAluElement_1.style.left = `${100 / animationWindow.sectionsCountWidth * 26}%`;
    
        this.movingAluElement_2.style.top = `${100 / animationWindow.sectionsCountHeight * 6}%`;
        this.movingAluElement_2.style.left = `${100 / animationWindow.sectionsCountWidth * 30}%`;
    }

    private removeAluOperandRegisterText () {
        mc8Components.ALU.operandRegister1.htmlElement.textContent = '';
        mc8Components.ALU.operandRegister2.htmlElement.textContent = '';
    }

    private updateMovingAlu1ElementPosition (xCoordinate: number, yCoordinate: number) {
        this.movingAluElement_1.style.top = `${100 / animationWindow.sectionsCountHeight * yCoordinate}%`;
        this.movingAluElement_1.style.left = `${100 / animationWindow.sectionsCountWidth * xCoordinate}%`;
    }

    private updateMovingAlu2ElementPosition (xCoordinate: number, yCoordinate: number) {
        this.movingAluElement_2.style.top = `${100 / animationWindow.sectionsCountHeight * yCoordinate}%`;
        this.movingAluElement_2.style.left = `${100 / animationWindow.sectionsCountWidth * xCoordinate}%`;
    }

    private async animateSetFlags () {
        if (!programStatus.noAnimation) {
            await arrowAnimator.displaySetFlagsArrow();
            this.movingFlags.children[0].textContent = mc8Components.FLAGS.cFlag;
            this.movingFlags.children[1].textContent = mc8Components.FLAGS.pFlag;
            this.movingFlags.children[2].textContent = mc8Components.FLAGS.sFlag;
            this.movingFlags.children[3].textContent = mc8Components.FLAGS.zFlag;
            this.movingFlags.classList.add('displayGrid');
            try {
                await sleepForIDLETIME();
                for (let i = 0; i < 21; i++) {
                    this.movingFlags.style.top = `${100 / 32 * (8 - i / 20)}%`;
                    await sleepBetweenFrames();
                }
                await sleepForIDLETIME();
            } finally {
                this.movingFlags.classList.remove('displayGrid');
                this.movingFlags.style.top = `${100 / 32 * 8}%`;
            }
        }
        mc8Components.FLAGS.updateDOM();
    }

    // async hlBcAddition (result: number, stepOne: boolean) {
    //     if (programStatus.animationType_1 || programStatus.animationType_2) {    
    //         this.moveAluElements(result, true, true);
    //     } else { //noAnim
    //         await registerAnimator.registerUpdate('ALUOUT', result);
    //         mc8Components.ALU.operandRegister1.htmlElement.textContent = '';
    //         mc8Components.ALU.operandRegister2.htmlElement.textContent = '';
    //     }
    
    //     if (stepOne) {
    //         try {
    //             await controlUnitAnimator.stepDescriptionUpdate('Setze Carry-Flag');
    //             mc8Components.FLAGS.zFlag = '-';
    //             mc8Components.FLAGS.sFlag = '-';
    //             mc8Components.FLAGS.pFlag = '-';
    //             await this.animateSetFlags();
    //             await controlUnitAnimator.stepDescriptionUpdate('Speichere das Ergebnis in L');
    //         } finally {
    //             ALUOUT.htmlElement.classList.remove('yellowBg');
    //             ALUOUT.htmlElement.textContent = '';
    //         }
    //         await animateTransfer('ALUOUT', 'HL_lo', result);
    //         await animateRegisterUpdate('HL_lo', result);
    //     } else {
    //         try {
    //             await animateStepDescriptionUpdate('Setze Carry-Flag');
    //             mc8Components.FLAGS.zFlag = '-';
    //             mc8Components.FLAGS.sFlag = '-';
    //             mc8Components.FLAGS.pFlag = '-';
    //             await animateSetFlags();
    //             await animateStepDescriptionUpdate('Speichere das Ergebnis in H');
    //         } finally {
    //             ALUOUT.htmlElement.classList.remove('yellowBg');
    //             ALUOUT.htmlElement.textContent = '';
    //         }
    //         await animateTransfer('ALUOUT', 'HL_hi', result);
    //         await animateRegisterUpdate('HL_hi', result);
    //     }
    // }
}

export const aluAnimator = new AluAnimator();