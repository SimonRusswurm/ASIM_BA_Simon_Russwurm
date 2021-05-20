import { addYellowBackgroundTo, getHtmlElement, sleepForIDLETIME, sleepForNOANIMATIONIDLETIME } from "../utils";
import { mc8Components } from "../components/Mc8Components";
import { buttonController, pausingExecutionCheck } from "../buttonController";
import { programStatus } from "../ProgramStatus";
import { aluAnimator } from "./AluAnimator";
import { arrowAnimator } from "./ArrowAnimator";
import { controlUnitAnimator } from "./ControlUnitAnimator";
import { registerAnimator } from "./RegisterAnimator";
import { transferAnimator } from "./TransferAnimator";


const movingAlu2: HTMLElement = getHtmlElement('movingAlu2_h2');

const animateLoadAddressBytesInZr = async() => {
    await controlUnitAnimator.stepDescriptionUpdate('Hole das niederwertige Adressbyte');
    await transferAnimator.readFromMemoryInRegister('PC', 'ZR_lo');
    await registerAnimator.increasePcByOne();
    await controlUnitAnimator.stepDescriptionUpdate('Hole das höherwertige Adressbyte');
    await transferAnimator.readFromMemoryInRegister('PC', 'ZR_hi');
    await registerAnimator.increasePcByOne();
}


class CommandAnimator {

    constructor() {}

    async nop() {
        if (programStatus.noAnimation)
            await sleepForNOANIMATIONIDLETIME();
        else
            await sleepForIDLETIME();
        pausingExecutionCheck();
    }

    async halt() {
        mc8Components.CONTROL_UNIT.updateStepDescription('Prozessor angehalten');
        mc8Components.CONTROL_UNIT.stepNumber.textContent = '0';
        buttonController.pause();
        pausingExecutionCheck();
    }

    async movAdat_8() {
        await controlUnitAnimator.stepDescriptionUpdate('Hole den Parameter');
        await transferAnimator.readFromMemoryInRegister('PC', 'A');
        await registerAnimator.increasePcByOne();
        pausingExecutionCheck();
        return true;
    }

    async movBdat_8() {
        await controlUnitAnimator.stepDescriptionUpdate('Hole den Parameter');
        await transferAnimator.readFromMemoryInRegister('PC', 'B');
        await registerAnimator.increasePcByOne();
        pausingExecutionCheck();
        return true;
    }

    async movCdat_8() {
        await controlUnitAnimator.stepDescriptionUpdate('Hole den Parameter');
        await transferAnimator.readFromMemoryInRegister('PC', 'C');
        await registerAnimator.increasePcByOne();
        pausingExecutionCheck();
        return true;
    }

    async twoByteIX() {
        await controlUnitAnimator.stepDescriptionUpdate('Hole das 2. Byte des Befehls');
        await transferAnimator.readFromMemoryInRegister('PC', 'IR');
        await registerAnimator.increasePcByOne();
        await controlUnitAnimator.stepDescriptionUpdate('Erkenne den Befehl');
        await addYellowBackgroundTo(mc8Components.CONTROL_UNIT.IR.htmlElement);
        await arrowAnimator.displayIrArrow();


        if (mc8Components.CONTROL_UNIT.IR.value === 0b00100001) {
            mc8Components.CONTROL_UNIT.assemblerCommand.textContent = 'MOV IX, dat_16';
            if (!programStatus.noAnimation)
                await sleepForIDLETIME();
            await controlUnitAnimator.stepDescriptionUpdate('Hole das niederwertige Byte');
            await transferAnimator.readFromMemoryInRegister('PC', 'IX_lo');
            await registerAnimator.increasePcByOne();
            await controlUnitAnimator.stepDescriptionUpdate('Hole das höherwertige Byte');
            await transferAnimator.readFromMemoryInRegister('PC', 'IX_hi');
            await registerAnimator.increasePcByOne();
        } else if (mc8Components.CONTROL_UNIT.IR.value === 0b00101010) {
            mc8Components.CONTROL_UNIT.assemblerCommand.textContent = 'MOV IX, label';
            await animateLoadAddressBytesInZr();
            await controlUnitAnimator.stepDescriptionUpdate('Hole das niederwertige Byte');
            await transferAnimator.readFromMemoryInRegister('ZR', 'IX_lo');
            await controlUnitAnimator.stepDescriptionUpdate('Erhöhe die Adresse um 1');
            await arrowAnimator.displayRegisterArrow('ZR');
            await registerAnimator.registerUpdate('ZR', mc8Components.ZR.value + 1);
            await controlUnitAnimator.stepDescriptionUpdate('Hole das höherwertige Byte');
            await transferAnimator.readFromMemoryInRegister('ZR', 'IX_hi');
        } else if (mc8Components.CONTROL_UNIT.IR.value === 0b00100010) {
            mc8Components.CONTROL_UNIT.assemblerCommand.textContent = 'MOV label, IX';
            await animateLoadAddressBytesInZr();
            await controlUnitAnimator.stepDescriptionUpdate('Schreibe das niederwertige Byte');
            await transferAnimator.writeToMemoryFromRegister('ZR', 'IX_lo');
            await controlUnitAnimator.stepDescriptionUpdate('Erhöhe die Adresse um 1');
            await arrowAnimator.displayRegisterArrow('ZR');
            await registerAnimator.registerUpdate('ZR', mc8Components.ZR.value + 1);
            await controlUnitAnimator.stepDescriptionUpdate('Schreibe das höherwertige Byte');
            await transferAnimator.writeToMemoryFromRegister('ZR', 'IX_hi');
        } else if (mc8Components.CONTROL_UNIT.IR.value === 0b00100011) {
            mc8Components.CONTROL_UNIT.assemblerCommand.textContent = 'INC IX';
            await controlUnitAnimator.stepDescriptionUpdate('Erhöhe die Adresse um 1');
            await arrowAnimator.displayRegisterArrow('IX');
            await registerAnimator.registerUpdate('IX', mc8Components.IX.value + 1);
        } else if (mc8Components.CONTROL_UNIT.IR.value === 0b00101011) {
            mc8Components.CONTROL_UNIT.assemblerCommand.textContent = 'DEC IX';
            await controlUnitAnimator.stepDescriptionUpdate('Verringere die Adresse um 1');
            await arrowAnimator.displayRegisterArrow('IX');
            await registerAnimator.registerUpdate('IX', mc8Components.IX.value - 1);
        } else if (mc8Components.CONTROL_UNIT.IR.value === 0b11101001) {
            mc8Components.CONTROL_UNIT.assemblerCommand.textContent = 'JP [IX]';
            await controlUnitAnimator.stepDescriptionUpdate('Lade den Programmzähler');
            await transferAnimator.transfer('IX', 'PC', mc8Components.IX.value);
            await registerAnimator.registerUpdate('PC', mc8Components.IX.value);
        } else {
            await addYellowBackgroundTo(mc8Components.CONTROL_UNIT.IR.htmlElement);
            await arrowAnimator.displayIrArrow();
            mc8Components.CONTROL_UNIT.assemblerCommand.textContent = 'Befehl Unbekannt';
            throw Error('Unknown command');
        }

        pausingExecutionCheck();
        return true;
    }
    async movHLdat_16() {
        await controlUnitAnimator.stepDescriptionUpdate('Hole das niederwertige Byte');
        await transferAnimator.readFromMemoryInRegister('PC', 'HL_lo');
        await registerAnimator.increasePcByOne();
        await controlUnitAnimator.stepDescriptionUpdate('Hole das höherwertige Byte');
        await transferAnimator.readFromMemoryInRegister('PC', 'HL_hi');
        await registerAnimator.increasePcByOne();
        pausingExecutionCheck();
    }
    async movSPdat_16() {
        await controlUnitAnimator.stepDescriptionUpdate('Hole das niederwertige Byte');
        await transferAnimator.readFromMemoryInRegister('PC', 'SP_lo');
        await registerAnimator.increasePcByOne();
        await controlUnitAnimator.stepDescriptionUpdate('Hole das höherwertige Byte');
        await transferAnimator.readFromMemoryInRegister('PC', 'SP_hi');
        await registerAnimator.increasePcByOne();
        pausingExecutionCheck();
    }
    async movAB() {
        await controlUnitAnimator.stepDescriptionUpdate('Kopiere die Daten');
        await transferAnimator.transfer('B', 'A', mc8Components.B.value);
        await registerAnimator.registerUpdate('A', mc8Components.B.value);
        pausingExecutionCheck();
    }
    async movAC() {
        await controlUnitAnimator.stepDescriptionUpdate('Kopiere die Daten');
        await transferAnimator.transfer('C', 'A', mc8Components.C.value);
        await registerAnimator.registerUpdate('A', mc8Components.C.value);
        pausingExecutionCheck();
    }
    async movBA() {
        await controlUnitAnimator.stepDescriptionUpdate('Kopiere die Daten');
        await transferAnimator.transfer('A', 'B', mc8Components.A.value);
        await registerAnimator.registerUpdate('B', mc8Components.A.value);
        pausingExecutionCheck();
    }
    async movBC() {
        await controlUnitAnimator.stepDescriptionUpdate('Kopiere die Daten');
        await transferAnimator.transfer('C', 'B', mc8Components.C.value);
        await registerAnimator.registerUpdate('B', mc8Components.C.value);
        pausingExecutionCheck();
    }
    async movCA() {
        await controlUnitAnimator.stepDescriptionUpdate('Kopiere die Daten');
        await transferAnimator.transfer('A', 'C', mc8Components.A.value);
        await registerAnimator.registerUpdate('C', mc8Components.A.value);
        pausingExecutionCheck();
    }
    async movCB() {
        await controlUnitAnimator.stepDescriptionUpdate('Kopiere die Daten');
        await transferAnimator.transfer('B', 'C', mc8Components.B.value);
        await registerAnimator.registerUpdate('C', mc8Components.B.value);
        pausingExecutionCheck();
    }
    async movALabel() {
        await animateLoadAddressBytesInZr();
        await controlUnitAnimator.stepDescriptionUpdate('Hole die Daten');
        await transferAnimator.readFromMemoryInRegister('ZR', 'A');
        pausingExecutionCheck();
    }
    async movLabelA() {
        await animateLoadAddressBytesInZr();
        await controlUnitAnimator.stepDescriptionUpdate('Schreibe die Daten');
        await transferAnimator.writeToMemoryFromRegister('ZR', 'A');
        pausingExecutionCheck();
    }
    async movHlLabel() {
        await animateLoadAddressBytesInZr();
        await controlUnitAnimator.stepDescriptionUpdate('Hole das niederwertige Byte');
        await transferAnimator.readFromMemoryInRegister('ZR', 'HL_lo');

        await controlUnitAnimator.stepDescriptionUpdate('Erhöhe die Adresse um 1');
        await arrowAnimator.displayRegisterArrow('ZR');
        await registerAnimator.registerUpdate('ZR', mc8Components.ZR.value + 1);
        await controlUnitAnimator.stepDescriptionUpdate('Hole das höherwertige Byte');
        await transferAnimator.readFromMemoryInRegister('ZR', 'HL_hi');
        pausingExecutionCheck();
    }
    async movLabelHl() {
        await animateLoadAddressBytesInZr();
        await controlUnitAnimator.stepDescriptionUpdate('Schreibe das niederwertige Byte');
        await transferAnimator.writeToMemoryFromRegister('ZR', 'HL_lo');

        await controlUnitAnimator.stepDescriptionUpdate('Erhöhe die Adresse um 1');
        await arrowAnimator.displayRegisterArrow('ZR');
        await registerAnimator.registerUpdate('ZR', mc8Components.ZR.value + 1);
        await controlUnitAnimator.stepDescriptionUpdate('Schreibe das höherwertige Byte');
        await transferAnimator.writeToMemoryFromRegister('ZR', 'HL_hi');
        pausingExecutionCheck();
    }
    async movAHl() {
        await controlUnitAnimator.stepDescriptionUpdate('Hole die Daten');
        await transferAnimator.readFromMemoryInRegister('HL', 'A');
        pausingExecutionCheck();
    }
    async movHlA() {
        await controlUnitAnimator.stepDescriptionUpdate('Schreibe die Daten');
        await transferAnimator.writeToMemoryFromRegister('HL', 'A');
        pausingExecutionCheck();
    }
    async push() {
        await controlUnitAnimator.stepDescriptionUpdate('Erhöhe den Stackpointer um 1');
        await arrowAnimator.displayRegisterArrow('SP');
        await registerAnimator.registerUpdate('SP', mc8Components.SP.value - 1);
        await controlUnitAnimator.stepDescriptionUpdate('Schreibe den Akku');
        await transferAnimator.writeToMemoryFromRegister('SP', 'A');
        await controlUnitAnimator.stepDescriptionUpdate('Erhöhe den Stackpointer um 1');
        await arrowAnimator.displayRegisterArrow('SP');
        await registerAnimator.registerUpdate('SP', mc8Components.SP.value - 1);
        await controlUnitAnimator.stepDescriptionUpdate('Schreibe die Flags');
        await transferAnimator.writeToMemoryFromRegister('SP', 'FLAGS');
        pausingExecutionCheck();
    }
    async pop() {
        await controlUnitAnimator.stepDescriptionUpdate('Hole die Flags');
        await transferAnimator.readFromMemoryInRegister('SP', 'FLAGS');
        await controlUnitAnimator.stepDescriptionUpdate('Verringer den Stackpointer um 1');
        await arrowAnimator.displayRegisterArrow('SP');
        await registerAnimator.registerUpdate('SP', mc8Components.SP.value + 1);
        await controlUnitAnimator.stepDescriptionUpdate('Hole den Akku');
        await transferAnimator.readFromMemoryInRegister('SP', 'A');
        await controlUnitAnimator.stepDescriptionUpdate('Verringer den Stackpointer um 1');
        await arrowAnimator.displayRegisterArrow('SP');
        await registerAnimator.registerUpdate('SP', mc8Components.SP.value + 1);
        pausingExecutionCheck();
    }
    async inA() {
        await controlUnitAnimator.stepDescriptionUpdate('Hole das Adressbyte');
        await transferAnimator.readFromMemoryInRegister('PC', 'ZR_lo');
        await registerAnimator.increasePcByOne();
        await controlUnitAnimator.stepDescriptionUpdate('Hole die Daten');
        await transferAnimator.readFromIo();
        pausingExecutionCheck();
    }
    async outA() {
        await controlUnitAnimator.stepDescriptionUpdate('Hole das Adressbyte');
        await transferAnimator.readFromMemoryInRegister('PC', 'ZR_lo');
        await registerAnimator.increasePcByOne();
        await controlUnitAnimator.stepDescriptionUpdate('Schreibe die Daten');
        await transferAnimator.writeToIo();
        pausingExecutionCheck();
    }
    async incA() {
        await controlUnitAnimator.stepDescriptionUpdate('Hole den Operanden');
        await transferAnimator.transfer('A', 'ALU1', mc8Components.A.value);
        await registerAnimator.registerUpdate('ALU1', mc8Components.A.value);
        await controlUnitAnimator.stepDescriptionUpdate('Erhöhe den Operanden um 1');
        const result = mc8Components.ALU.incBinary(mc8Components.A.value);
        mc8Components.ALU.operandRegister2.update(1);
        movingAlu2.classList.remove('yellowBg');
        await aluAnimator.basicAnimation(result, true, false, 'A');
        movingAlu2.classList.add('yellowBg');
        pausingExecutionCheck();
    }
    async incB() {
        await controlUnitAnimator.stepDescriptionUpdate('Hole den Operanden');
        await transferAnimator.transfer('B', 'ALU1', mc8Components.B.value);
        await registerAnimator.registerUpdate('ALU1', mc8Components.B.value);
        await controlUnitAnimator.stepDescriptionUpdate('Erhöhe den Operanden um 1');
        const result = mc8Components.ALU.incBinary(mc8Components.B.value);
        mc8Components.ALU.operandRegister2.update(1);
        movingAlu2.classList.remove('yellowBg');
        await aluAnimator.basicAnimation(result, true, false, 'B');
        movingAlu2.classList.add('yellowBg');
        pausingExecutionCheck();
    }
    async incC() {
        await controlUnitAnimator.stepDescriptionUpdate('Hole den Operanden');
        await transferAnimator.transfer('C', 'ALU1', mc8Components.C.value);
        await registerAnimator.registerUpdate('ALU1', mc8Components.C.value);
        await controlUnitAnimator.stepDescriptionUpdate('Erhöhe den Operanden um 1');
        const result = mc8Components.ALU.incBinary(mc8Components.C.value);
        mc8Components.ALU.operandRegister2.update(1);
        movingAlu2.classList.remove('yellowBg');
        await aluAnimator.basicAnimation(result, true, false, 'C');
        movingAlu2.classList.add('yellowBg');
        pausingExecutionCheck();
    }
    async incHl() {
        await controlUnitAnimator.stepDescriptionUpdate('Erhöhe die Adresse um 1');
        await arrowAnimator.displayRegisterArrow('HL');
        await registerAnimator.registerUpdate('HL', mc8Components.HL.value + 1);
        pausingExecutionCheck();
    }
    async decA() {
        await controlUnitAnimator.stepDescriptionUpdate('Hole den Operanden');
        await transferAnimator.transfer('A', 'ALU1', mc8Components.A.value);
        await registerAnimator.registerUpdate('ALU1', mc8Components.A.value);
        await controlUnitAnimator.stepDescriptionUpdate('Verringere den Operanden um 1');
        const result = mc8Components.ALU.decBinary(mc8Components.A.value);
        mc8Components.ALU.operandRegister2.update(1);
        movingAlu2.classList.remove('yellowBg');
        await aluAnimator.basicAnimation(result, true, false, 'A');
        movingAlu2.classList.add('yellowBg');
        pausingExecutionCheck();
    }
    async decB() {
        await controlUnitAnimator.stepDescriptionUpdate('Hole den Operanden');
        await transferAnimator.transfer('B', 'ALU1', mc8Components.B.value);
        await registerAnimator.registerUpdate('ALU1', mc8Components.B.value);
        await controlUnitAnimator.stepDescriptionUpdate('Verringere den Operanden um 1');
        const result = mc8Components.ALU.decBinary(mc8Components.B.value);
        mc8Components.ALU.operandRegister2.update(1);
        movingAlu2.classList.remove('yellowBg');
        await aluAnimator.basicAnimation(result, true, false, 'B');
        movingAlu2.classList.add('yellowBg');
        pausingExecutionCheck();
    }
    async decC() {
        await controlUnitAnimator.stepDescriptionUpdate('Hole den Operanden');
        await transferAnimator.transfer('C', 'ALU1', mc8Components.C.value);
        await registerAnimator.registerUpdate('ALU1', mc8Components.C.value);
        await controlUnitAnimator.stepDescriptionUpdate('Verringere den Operanden um 1');
        const result = mc8Components.ALU.decBinary(mc8Components.C.value);
        mc8Components.ALU.operandRegister2.update(1);
        movingAlu2.classList.remove('yellowBg');
        await aluAnimator.basicAnimation(result, true, false, 'C');
        movingAlu2.classList.add('yellowBg');
        pausingExecutionCheck();
    }
    async decHl() {
        await controlUnitAnimator.stepDescriptionUpdate('Verringere die Adresse um 1');
        await arrowAnimator.displayRegisterArrow('HL');
        await registerAnimator.registerUpdate('HL', mc8Components.HL.value - 1);
        pausingExecutionCheck();
    }
    async addA() {
        await aluAnimator.loadOperands('A', 'A');
        await controlUnitAnimator.stepDescriptionUpdate('Addiere die Operanden');

        const result = mc8Components.ALU.addBinary(mc8Components.A.value, mc8Components.A.value, false);
        await aluAnimator.basicAnimation(result, true, false, 'A');
        pausingExecutionCheck();
    }
    async addB() {
        await aluAnimator.loadOperands('A', 'B');
        await controlUnitAnimator.stepDescriptionUpdate('Addiere die Operanden');

        const result = mc8Components.ALU.addBinary(mc8Components.A.value, mc8Components.B.value, false);
        await aluAnimator.basicAnimation(result, true, false, 'A');
        pausingExecutionCheck();
    }
    async addC() {
        await aluAnimator.loadOperands('A', 'C');
        await controlUnitAnimator.stepDescriptionUpdate('Addiere die Operanden');

        const result = mc8Components.ALU.addBinary(mc8Components.A.value, mc8Components.C.value, false);
        await aluAnimator.basicAnimation(result, true, false, 'A');
        pausingExecutionCheck();
    }
    async addDat_8() {
        await controlUnitAnimator.stepDescriptionUpdate('Hole den 1. Operanden');
        await transferAnimator.transfer('A', 'ALU1', mc8Components.A.value);
        await registerAnimator.registerUpdate('ALU1', mc8Components.A.value);
        await controlUnitAnimator.stepDescriptionUpdate('Hole den 2. Operanden');
        await transferAnimator.readFromMemoryInRegister('PC', 'ALU2');
        await registerAnimator.increasePcByOne();
        await controlUnitAnimator.stepDescriptionUpdate('Addiere die Operanden');

        const result = mc8Components.ALU.addBinary(mc8Components.A.value, mc8Components.ALU.operandRegister2.value, false);
        await aluAnimator.basicAnimation(result, true, false, 'A');
        pausingExecutionCheck();
    }
    async addHlBc() {
        await controlUnitAnimator.stepDescriptionUpdate('Hole das L-Register (HL_LO)');
        await transferAnimator.transfer('HL_lo', 'ALU1', mc8Components.HL.loValue);
        await registerAnimator.registerUpdate('ALU1', mc8Components.HL.loValue);
        await controlUnitAnimator.stepDescriptionUpdate('Hole das C-Register');
        await transferAnimator.transfer('C', 'ALU2', mc8Components.C.value);
        await registerAnimator.registerUpdate('ALU2', mc8Components.C.value);
        await controlUnitAnimator.stepDescriptionUpdate('Addiere die Operanden');

        let result = mc8Components.ALU.addBinary(mc8Components.HL.loValue, mc8Components.C.value, false);
        await aluAnimator.basicAnimation(result, true, false, 'HL_lo');
        // await aluAnimator.hlBcAddition(result, true);

        await controlUnitAnimator.stepDescriptionUpdate('Hole das H-Register (HL_HI)');
        await transferAnimator.transfer('HL_hi', 'ALU1', mc8Components.HL.hiValue);
        await registerAnimator.registerUpdate('ALU1', mc8Components.HL.hiValue);
        await controlUnitAnimator.stepDescriptionUpdate('Hole das B-Register');
        await transferAnimator.transfer('B', 'ALU2', mc8Components.B.value);
        await registerAnimator.registerUpdate('ALU2', mc8Components.B.value);
        await controlUnitAnimator.stepDescriptionUpdate('Addiere die Operanden');
        result = mc8Components.ALU.addBinary(mc8Components.HL.hiValue, mc8Components.B.value + mc8Components.FLAGS.cFlag, false);
        await aluAnimator.basicAnimation(result, true, true, 'HL_hi');
        // await aluAnimator.hlBcAddition(result, false);

        pausingExecutionCheck();
    }
    async subA() {
        await aluAnimator.loadOperands('A', 'A');
        await controlUnitAnimator.stepDescriptionUpdate('Subtrahiere die Operanden');

        const result = mc8Components.ALU.addBinary(mc8Components.A.value, mc8Components.A.value, true);
        await aluAnimator.basicAnimation(result, true, false, 'A');
        pausingExecutionCheck();
    }
    async subB() {
        await aluAnimator.loadOperands('A', 'B');
        await controlUnitAnimator.stepDescriptionUpdate('Subtrahiere die Operanden');

        const result = mc8Components.ALU.addBinary(mc8Components.A.value, mc8Components.B.value, true);
        await aluAnimator.basicAnimation(result, true, false, 'A');
        pausingExecutionCheck();
    }
    async subC() {
        await aluAnimator.loadOperands('A', 'C');
        await controlUnitAnimator.stepDescriptionUpdate('Subtrahiere die Operanden');

        const result = mc8Components.ALU.addBinary(mc8Components.A.value, mc8Components.C.value, true);
        await aluAnimator.basicAnimation(result, true, false, 'A');
        pausingExecutionCheck();
    }

    async subDat_8() {
        await controlUnitAnimator.stepDescriptionUpdate('Hole den 1. Operanden');
        await transferAnimator.transfer('A', 'ALU1', mc8Components.A.value);
        await registerAnimator.registerUpdate('ALU1', mc8Components.A.value);
        await controlUnitAnimator.stepDescriptionUpdate('Hole den 2. Operanden');
        await transferAnimator.readFromMemoryInRegister('PC', 'ALU2');
        await registerAnimator.increasePcByOne();
        await controlUnitAnimator.stepDescriptionUpdate('Subtrahiere die Operanden');

        const result = mc8Components.ALU.addBinary(mc8Components.A.value, mc8Components.ALU.operandRegister2.value, true);
        await aluAnimator.basicAnimation(result, true, false, 'A');
        pausingExecutionCheck();
    }

    async andA() {
        await aluAnimator.loadOperands('A', 'A');
        await controlUnitAnimator.stepDescriptionUpdate('OP1 AND OP2');

        const result = mc8Components.ALU.andBinary(mc8Components.A.value, mc8Components.A.value);
        await aluAnimator.basicAnimation(result, true, false, 'A');
        pausingExecutionCheck();
    }
    async andB() {
        await aluAnimator.loadOperands('A', 'B');
        await controlUnitAnimator.stepDescriptionUpdate('OP1 AND OP2');

        const result = mc8Components.ALU.andBinary(mc8Components.A.value, mc8Components.B.value);
        await aluAnimator.basicAnimation(result, true, false, 'A');
        pausingExecutionCheck();
    }

    async andC() {
        await aluAnimator.loadOperands('A', 'C');
        await controlUnitAnimator.stepDescriptionUpdate('OP1 AND OP2');

        const result = mc8Components.ALU.andBinary(mc8Components.A.value, mc8Components.C.value);
        await aluAnimator.basicAnimation(result, true, false, 'A');
        pausingExecutionCheck();
    }

    async andDat_8() {
        await controlUnitAnimator.stepDescriptionUpdate('Hole den 1. Operanden');
        await transferAnimator.transfer('A', 'ALU1', mc8Components.A.value);
        await registerAnimator.registerUpdate('ALU1', mc8Components.A.value);
        await controlUnitAnimator.stepDescriptionUpdate('Hole den 2. Operanden');
        await transferAnimator.readFromMemoryInRegister('PC', 'ALU2');
        await registerAnimator.increasePcByOne()
        await controlUnitAnimator.stepDescriptionUpdate('OP1 AND OP2');

        const result = mc8Components.ALU.andBinary(mc8Components.A.value, mc8Components.ALU.operandRegister2.value);
        await aluAnimator.basicAnimation(result, true, false, 'A');
        pausingExecutionCheck();
    }

    async orA() {
        await aluAnimator.loadOperands('A', 'A');
        await controlUnitAnimator.stepDescriptionUpdate('OP1 OR OP2');

        const result = mc8Components.ALU.orBinary(mc8Components.ALU.operandRegister1.value, mc8Components.ALU.operandRegister2.value);
        await aluAnimator.basicAnimation(result, true, false, 'A');
        pausingExecutionCheck();
    }

    async orB() {
        await aluAnimator.loadOperands('A', 'B');
        await controlUnitAnimator.stepDescriptionUpdate('OP1 OR OP2');

        const result = mc8Components.ALU.orBinary(mc8Components.ALU.operandRegister1.value, mc8Components.ALU.operandRegister2.value);
        await aluAnimator.basicAnimation(result, true, false, 'A');
        pausingExecutionCheck();
    }

    async orC() {
        await aluAnimator.loadOperands('A', 'C');
        await controlUnitAnimator.stepDescriptionUpdate('OP1 OR OP2');

        const result = mc8Components.ALU.orBinary(mc8Components.ALU.operandRegister1.value, mc8Components.ALU.operandRegister2.value);
        await aluAnimator.basicAnimation(result, true, false, 'A');
        pausingExecutionCheck();
    }

    async orDat_8() {
        await controlUnitAnimator.stepDescriptionUpdate('Hole den 1. Operanden');
        await transferAnimator.transfer('A', 'ALU1', mc8Components.A.value);
        await registerAnimator.registerUpdate('ALU1', mc8Components.A.value);
        await controlUnitAnimator.stepDescriptionUpdate('Hole den 2. Operanden');
        await transferAnimator.readFromMemoryInRegister('PC', 'ALU2');
        await registerAnimator.increasePcByOne();
        await controlUnitAnimator.stepDescriptionUpdate('OP1 OR OP2');

        const result = mc8Components.ALU.orBinary(mc8Components.ALU.operandRegister1.value, mc8Components.ALU.operandRegister2.value);
        await aluAnimator.basicAnimation(result, true, false, 'A');
        pausingExecutionCheck();
    }

    async xorA() {
        await aluAnimator.loadOperands('A', 'A');
        await controlUnitAnimator.stepDescriptionUpdate('OP1 XOR OP2');

        const result = mc8Components.ALU.xorBinary(mc8Components.A.value, mc8Components.A.value);
        await aluAnimator.basicAnimation(result, true, false, 'A');
        pausingExecutionCheck();
    }

    async xorB() {
        await aluAnimator.loadOperands('A', 'B');
        await controlUnitAnimator.stepDescriptionUpdate('OP1 XOR OP2');

        const result = mc8Components.ALU.xorBinary(mc8Components.A.value, mc8Components.B.value);
        await aluAnimator.basicAnimation(result, true, false, 'A');
        pausingExecutionCheck();
    }

    async xorC() {
        await aluAnimator.loadOperands('A', 'C');
        await controlUnitAnimator.stepDescriptionUpdate('OP1 XOR OP2');

        const result = mc8Components.ALU.xorBinary(mc8Components.A.value, mc8Components.C.value);
        await aluAnimator.basicAnimation(result, true, false, 'A');
        pausingExecutionCheck();
    }

    async xorDat_8() {
        await controlUnitAnimator.stepDescriptionUpdate('Hole den 1. Operanden');
        await transferAnimator.transfer('A', 'ALU1', mc8Components.A.value);
        await registerAnimator.registerUpdate('ALU1', mc8Components.A.value);
        await controlUnitAnimator.stepDescriptionUpdate('Hole den 2. Operanden');
        await transferAnimator.readFromMemoryInRegister('PC', 'ALU2');
        await registerAnimator.increasePcByOne();
        await controlUnitAnimator.stepDescriptionUpdate('OP1 OR OP2');

        const result = mc8Components.ALU.xorBinary(mc8Components.ALU.operandRegister1.value, mc8Components.ALU.operandRegister2.value);
        await aluAnimator.basicAnimation(result, true, false, 'A');
        pausingExecutionCheck();
    }

    async twoByteShift() {
        await controlUnitAnimator.stepDescriptionUpdate('Hole das 2. Byte des Befehls');
        await transferAnimator.readFromMemoryInRegister('PC', 'IR');
        await registerAnimator.increasePcByOne();
        await controlUnitAnimator.stepDescriptionUpdate('Erkenne den Befehl');
        await addYellowBackgroundTo(mc8Components.CONTROL_UNIT.IR.htmlElement);


        if (mc8Components.CONTROL_UNIT.IR.value === 0b00100111) {
            await arrowAnimator.displayIrArrow();
            mc8Components.CONTROL_UNIT.assemblerCommand.textContent = 'SHL';
            if (!programStatus.noAnimation)
                await sleepForIDLETIME();
            await controlUnitAnimator.stepDescriptionUpdate('Hole den Operanden');
            await transferAnimator.transfer('A', 'ALU1', mc8Components.A.value);
            await registerAnimator.registerUpdate('ALU1', mc8Components.A.value);
            await controlUnitAnimator.stepDescriptionUpdate('Schiebe Operanden nach links');
            const result = mc8Components.ALU.shlBinary(mc8Components.A.value);
            await aluAnimator.basicAnimation(result, false, false, 'A');
        } else if (mc8Components.CONTROL_UNIT.IR.value === 0b00111111) {
            await arrowAnimator.displayIrArrow();
            mc8Components.CONTROL_UNIT.assemblerCommand.textContent = 'SHR';
            if (!programStatus.noAnimation)
                await sleepForIDLETIME();
            await controlUnitAnimator.stepDescriptionUpdate('Hole den Operanden');
            await transferAnimator.transfer('A', 'ALU1', mc8Components.A.value);
            await registerAnimator.registerUpdate('ALU1', mc8Components.A.value);
            await controlUnitAnimator.stepDescriptionUpdate('Schiebe Operanden nach rechts');
            const result = mc8Components.ALU.shrBinary(mc8Components.A.value);
            await aluAnimator.basicAnimation(result, false, false, 'A');
        } else {
            await addYellowBackgroundTo(mc8Components.CONTROL_UNIT.IR.htmlElement);
            await arrowAnimator.displayIrArrow();
            mc8Components.CONTROL_UNIT.assemblerCommand.textContent = 'Befehl Unbekannt';
            throw Error('Unknown command');
        }
        pausingExecutionCheck();
    }

    async rcl() {
        await controlUnitAnimator.stepDescriptionUpdate('Hole den Operanden');
        await transferAnimator.transfer('A', 'ALU1', mc8Components.A.value);
        await registerAnimator.registerUpdate('ALU1', mc8Components.A.value);
        await controlUnitAnimator.stepDescriptionUpdate('Rotiere Operand mit Carry-Flag nach links');
        const result = mc8Components.ALU.rclBinary(mc8Components.A.value);
        await aluAnimator.basicAnimation(result, false, true, 'A');
        pausingExecutionCheck();
    }

    async rol() {
        await controlUnitAnimator.stepDescriptionUpdate('Hole den Operanden');
        await transferAnimator.transfer('A', 'ALU1', mc8Components.A.value);
        await registerAnimator.registerUpdate('ALU1', mc8Components.A.value);
        await controlUnitAnimator.stepDescriptionUpdate('Rotiere Operand ohne Carry-Flag nach links');
        const result = mc8Components.ALU.rolBinary(mc8Components.A.value);
        await aluAnimator.basicAnimation(result, false, false, 'A');
        pausingExecutionCheck();
    }

    async rcr() {
        await controlUnitAnimator.stepDescriptionUpdate('Hole den Operanden');
        await transferAnimator.transfer('A', 'ALU1', mc8Components.A.value);
        await registerAnimator.registerUpdate('ALU1', mc8Components.A.value);
        await controlUnitAnimator.stepDescriptionUpdate('Rotiere Operand mit Carry-Flag nach rechts');
        const result = mc8Components.ALU.rcrBinary(mc8Components.A.value);
        await aluAnimator.basicAnimation(result, false, true, 'A');
        pausingExecutionCheck();
    }

    async ror() {
        await controlUnitAnimator.stepDescriptionUpdate('Hole den Operanden');
        await transferAnimator.transfer('A', 'ALU1', mc8Components.A.value);
        await registerAnimator.registerUpdate('ALU1', mc8Components.A.value);
        await controlUnitAnimator.stepDescriptionUpdate('Rotiere Operand ohne Carry-Flag nach rechts');
        const result = mc8Components.ALU.rorBinary(mc8Components.A.value);
        await aluAnimator.basicAnimation(result, false, false, 'A');
        pausingExecutionCheck();
    }

    async cpA() {
        await aluAnimator.loadOperands('A', 'A');
        await controlUnitAnimator.stepDescriptionUpdate('Vergleiche die Operanden');

        const result = mc8Components.ALU.addBinary(mc8Components.A.value, mc8Components.A.value, true);
        await aluAnimator.basicAnimation(result, true, false, '');
        pausingExecutionCheck();
    }

    async cpB() {
        await aluAnimator.loadOperands('A', 'B');
        await controlUnitAnimator.stepDescriptionUpdate('Vergleiche die Operanden');

        const result = mc8Components.ALU.addBinary(mc8Components.A.value, mc8Components.B.value, true);
        await aluAnimator.basicAnimation(result, true, false, '');
        pausingExecutionCheck();
    }

    async cpC() {
        await aluAnimator.loadOperands('A', 'C');
        await controlUnitAnimator.stepDescriptionUpdate('Vergleiche die Operanden');

        const result = mc8Components.ALU.addBinary(mc8Components.A.value, mc8Components.C.value, true);
        await aluAnimator.basicAnimation(result, true, false, '');
        pausingExecutionCheck();
    }

    async cpDat_8() {
        await controlUnitAnimator.stepDescriptionUpdate('Hole den 1. Operanden');
        await transferAnimator.transfer('A', 'ALU1', mc8Components.A.value);
        await registerAnimator.registerUpdate('ALU1', mc8Components.A.value);
        await controlUnitAnimator.stepDescriptionUpdate('Hole den 2. Operanden');
        await transferAnimator.readFromMemoryInRegister('PC', 'ALU2');
        await registerAnimator.increasePcByOne();
        await controlUnitAnimator.stepDescriptionUpdate('Vergleiche die Operanden');

        const result = mc8Components.ALU.addBinary(mc8Components.A.value, mc8Components.ALU.operandRegister2.value, true);
        await aluAnimator.basicAnimation(result, true, false, '');
        pausingExecutionCheck();
    }

    async jpnzLabel() {
        await animateLoadAddressBytesInZr();
        await controlUnitAnimator.stepDescriptionUpdate('Prüfe die Sprungbedingung');
        await arrowAnimator.displayJumpArrow('zFlag');

        //jump
        if (mc8Components.FLAGS.zFlag === 0) {
            await controlUnitAnimator.stepDescriptionUpdate('Lade den Programmzähler');
            await arrowAnimator.displayRegisterArrow('ZR');
            await transferAnimator.transfer('ZR', 'PC', mc8Components.ZR.value);
            await registerAnimator.registerUpdate('PC', mc8Components.ZR.value);

        }
        pausingExecutionCheck();
    }

    async jpzLabel() {
        await animateLoadAddressBytesInZr();
        await controlUnitAnimator.stepDescriptionUpdate('Prüfe die Sprungbedingung');
        await arrowAnimator.displayJumpArrow('zFlag');

        //jump
        if (mc8Components.FLAGS.zFlag === 1) {
            await controlUnitAnimator.stepDescriptionUpdate('Lade den Programmzähler');
            await arrowAnimator.displayRegisterArrow('ZR');
            await transferAnimator.transfer('ZR', 'PC', mc8Components.ZR.value);
            await registerAnimator.registerUpdate('PC', mc8Components.ZR.value);
        }
        pausingExecutionCheck();
    }

    async jpncLabel() {
        await animateLoadAddressBytesInZr();
        await controlUnitAnimator.stepDescriptionUpdate('Prüfe die Sprungbedingung');
        await arrowAnimator.displayJumpArrow('cFlag');

        //jump
        if (mc8Components.FLAGS.cFlag === 0) {
            await controlUnitAnimator.stepDescriptionUpdate('Lade den Programmzähler');
            await arrowAnimator.displayRegisterArrow('ZR');
            await transferAnimator.transfer('ZR', 'PC', mc8Components.ZR.value);
            await registerAnimator.registerUpdate('PC', mc8Components.ZR.value);
        }
        pausingExecutionCheck();
    }

    async jpcLabel() {
        await animateLoadAddressBytesInZr();
        await controlUnitAnimator.stepDescriptionUpdate('Prüfe die Sprungbedingung');
        await arrowAnimator.displayJumpArrow('cFlag');

        //jump
        if (mc8Components.FLAGS.cFlag === 1) {
            await controlUnitAnimator.stepDescriptionUpdate('Lade den Programmzähler');
            await arrowAnimator.displayRegisterArrow('ZR');
            await transferAnimator.transfer('ZR', 'PC', mc8Components.ZR.value);
            await registerAnimator.registerUpdate('PC', mc8Components.ZR.value);
        }
        pausingExecutionCheck();
    }

    async jpnoLabel() {
        await animateLoadAddressBytesInZr();
        await controlUnitAnimator.stepDescriptionUpdate('Prüfe die Sprungbedingung');
        await arrowAnimator.displayJumpArrow('pFlag');

        //jump
        if (mc8Components.FLAGS.pFlag === 0) {
            await controlUnitAnimator.stepDescriptionUpdate('Lade den Programmzähler');
            await arrowAnimator.displayRegisterArrow('ZR');
            await transferAnimator.transfer('ZR', 'PC', mc8Components.ZR.value);
            await registerAnimator.registerUpdate('PC', mc8Components.ZR.value);
        }
        pausingExecutionCheck();
    }

    async jpoLabel() {
        await animateLoadAddressBytesInZr();
        await controlUnitAnimator.stepDescriptionUpdate('Prüfe die Sprungbedingung');
        await arrowAnimator.displayJumpArrow('pFlag');

        //jump
        if (mc8Components.FLAGS.pFlag === 1) {
            await controlUnitAnimator.stepDescriptionUpdate('Lade den Programmzähler');
            await arrowAnimator.displayRegisterArrow('ZR');
            await transferAnimator.transfer('ZR', 'PC', mc8Components.ZR.value);
            await registerAnimator.registerUpdate('PC', mc8Components.ZR.value);
        }
        pausingExecutionCheck();
    }

    async jpnsLabel() {
        await animateLoadAddressBytesInZr();
        await controlUnitAnimator.stepDescriptionUpdate('Prüfe die Sprungbedingung');
        await arrowAnimator.displayJumpArrow('sFlag');

        //jump
        if (mc8Components.FLAGS.sFlag === 0) {
            await controlUnitAnimator.stepDescriptionUpdate('Lade den Programmzähler');
            await arrowAnimator.displayRegisterArrow('ZR');
            await transferAnimator.transfer('ZR', 'PC', mc8Components.ZR.value);
            await registerAnimator.registerUpdate('PC', mc8Components.ZR.value);
        }
        pausingExecutionCheck();
    }

    async jpsLabel() {
        await animateLoadAddressBytesInZr();
        await controlUnitAnimator.stepDescriptionUpdate('Prüfe die Sprungbedingung');
        await arrowAnimator.displayJumpArrow('sFlag');

        //jump
        if (mc8Components.FLAGS.sFlag === 1) {
            await controlUnitAnimator.stepDescriptionUpdate('Lade den Programmzähler');
            await arrowAnimator.displayRegisterArrow('ZR');
            await transferAnimator.transfer('ZR', 'PC', mc8Components.ZR.value);
            await registerAnimator.registerUpdate('PC', mc8Components.ZR.value);
        }
        pausingExecutionCheck();
    }

    async jpLabel() {
        await animateLoadAddressBytesInZr();
        await controlUnitAnimator.stepDescriptionUpdate('Lade den Programmzähler');
        await arrowAnimator.displayRegisterArrow('ZR');
        await transferAnimator.transfer('ZR', 'PC', mc8Components.ZR.value);
        await registerAnimator.registerUpdate('PC', mc8Components.ZR.value);
        pausingExecutionCheck();
    }

    async callLabel() {
        await animateLoadAddressBytesInZr();
        await controlUnitAnimator.stepDescriptionUpdate('Erhöhe den Stackpointer um 1');
        await arrowAnimator.displayRegisterArrow('SP');
        await registerAnimator.registerUpdate('SP', mc8Components.SP.value - 1);
        await controlUnitAnimator.stepDescriptionUpdate('Schreibe das HI-Byte des PC');
        await transferAnimator.writeToMemoryFromRegister('SP', 'PC_hi');
        await controlUnitAnimator.stepDescriptionUpdate('Erhöhe den Stackpointer um 1');
        await arrowAnimator.displayRegisterArrow('SP');
        await registerAnimator.registerUpdate('SP', mc8Components.SP.value - 1);
        await controlUnitAnimator.stepDescriptionUpdate('Schreibe das LO-Byte des PC');
        await transferAnimator.writeToMemoryFromRegister('SP', 'PC_lo');
        await controlUnitAnimator.stepDescriptionUpdate('Lade den Programmzähler');
        await arrowAnimator.displayRegisterArrow('ZR');
        await transferAnimator.transfer('ZR', 'PC', mc8Components.ZR.value);
        await registerAnimator.registerUpdate('PC', mc8Components.ZR.value);
        pausingExecutionCheck();
    }

    async ret() {
        await controlUnitAnimator.stepDescriptionUpdate('Hole das niederwertige Adressbyte');
        await transferAnimator.readFromMemoryInRegister('SP', 'ZR_lo');
        await controlUnitAnimator.stepDescriptionUpdate('Verringere den Stackpointer um 1');
        await arrowAnimator.displayRegisterArrow('SP');
        await registerAnimator.registerUpdate('SP', mc8Components.SP.value + 1);
        await controlUnitAnimator.stepDescriptionUpdate('Hole das höherwertige Adressbyte');
        await transferAnimator.readFromMemoryInRegister('SP', 'ZR_hi');
        await controlUnitAnimator.stepDescriptionUpdate('Verringere den Stackpointer um 1');
        await arrowAnimator.displayRegisterArrow('SP');
        await registerAnimator.registerUpdate('SP', mc8Components.SP.value + 1);
        await controlUnitAnimator.stepDescriptionUpdate('Lade den Programmzähler');
        await arrowAnimator.displayRegisterArrow('ZR');
        await transferAnimator.transfer('ZR', 'PC', mc8Components.ZR.value);
        await registerAnimator.registerUpdate('PC', mc8Components.ZR.value);
        pausingExecutionCheck();
    }
}

export const commandAnimator = new CommandAnimator();