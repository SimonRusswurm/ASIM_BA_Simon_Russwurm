import { getHtmlElement, checkPlayPressed } from './utils';
import { resizeWindow } from './resizeWindow';
import { mc8Commands } from './mc8Commands';
import { mc8Components } from './components/Mc8Components';
import { controlUnitAnimator } from './animators/ControlUnitAnimator';
import { transferAnimator } from './animators/TransferAnimator';
import { registerAnimator } from './animators/RegisterAnimator';
import { addHoverListeners } from './hoverPopUps';

window.addEventListener('DOMContentLoaded', function () {
    resizeWindow(true);
    (<HTMLInputElement>getHtmlElement('breakpointsCheckbox_input')).checked = true;
    (<HTMLTextAreaElement>getHtmlElement('linkerFile_textarea')).value = '';
});

window.addEventListener('resize', function () {
    resizeWindow(false);
});

addHoverListeners();



const loadNextCommand = async() => {
    mc8Components.CONTROL_UNIT.stepNumber.textContent = '0';
    mc8Components.CONTROL_UNIT.assemblerCommand.textContent = '';
    mc8Components.CONTROL_UNIT.IR.htmlElement.textContent = '';

    await controlUnitAnimator.stepDescriptionUpdate('Hole den nächsten Befehl');
    await transferAnimator.readFromMemoryInRegister('PC', 'IR');
    await registerAnimator.increasePcByOne();
    await controlUnitAnimator.stepDescriptionUpdate('Erkenne den Befehl');
    await controlUnitAnimator.assemblerCommandUpdate();
    pushNextCommand(); 
}

const pushNextCommand = () => {
    for (let i = 0; i < mc8Commands.length; i++) {
        if (mc8Commands[i].opCode === mc8Components.CONTROL_UNIT.IR.value)
            commandsToProcess.push(mc8Commands[i].animationFunction);
    }

    commandsToProcess.push(loadNextCommand);
    return;
}

let commandsToProcess: Array<Function> = [loadNextCommand];


export const resetAnimation = () => {
    commandsToProcess = [loadNextCommand];
    mc8Components.initComponents();
    // movingObject_h2.classList.remove('displayGrid');
}

export const startAnimation = async (): Promise < any > => {
    let i = 0;
    while (true) {
        try {
            await checkPlayPressed();
            await commandsToProcess[i]();
            if(commandsToProcess[i] !== loadNextCommand){
                trackedValues(window.trackedValues);
            }
        } catch (e) {
            return false;
        }
        i++;
    }
}


declare global{
    interface Window {
        getValues: Function;
        trackedValues:  Object;
    }
}

window.trackedValues = {
    A: [],
    B: [],
    C: [],
    HL: [],
    IX: [],
    SP: [],
    PC: [],
    ZR: [],
    IO1: [],
    IO2: [],
    IO3: [],
    C_Flag: [],
    OP_Flag: [],
    S_Flag: [],
    Z_Flag: []
}

const resetTrackedValues = (obj: any) => {
    obj.A = [];
    obj.B = [];
    obj.C = [];
    obj.HL = [];
    obj.IX = [];
    obj.SP = [];
    obj.PC = [];
    obj.ZR = [];
    obj.IO1 = [];
    obj.IO2 = [];
    obj.IO3 = [];
    obj.C_Flag = [];
    obj.OP_Flag = [];
    obj.S_Flag = [];
    obj.Z_Flag = [];
}

const trackedValues = (obj: any) => {
    obj.A.push(mc8Components.A.value);
    obj.B.push(mc8Components.B.value);
    obj.C.push(mc8Components.C.value);
    obj.HL.push(mc8Components.HL.value);
    obj.IX.push(mc8Components.IX.value);
    obj.SP.push(mc8Components.SP.value);
    obj.PC.push(mc8Components.PC.value);
    obj.ZR.push(mc8Components.ZR.value);
    obj.IO1.push(mc8Components.IO1.value);
    obj.IO2.push(mc8Components.IO2.value);
    obj.IO3.push(mc8Components.IO3.value);
    obj.C_Flag.push(mc8Components.FLAGS.cFlag);
    obj.OP_Flag.push(mc8Components.FLAGS.pFlag);
    obj.S_Flag.push(mc8Components.FLAGS.sFlag);
    obj.Z_Flag.push(mc8Components.FLAGS.zFlag);
}


window.getValues = () =>{
    const obj = {
        A: mc8Components.A.value,
        B: mc8Components.B.value,
        C: mc8Components.C.value,
        HL: mc8Components.HL.value,
        IX: mc8Components.IX.value,
        SP: mc8Components.SP.value,
        PC: mc8Components.PC.value,
        ZR: mc8Components.ZR.value,
        IO1: mc8Components.IO1.value,
        IO2: mc8Components.IO2.value,
        IO3: mc8Components.IO3.value,
        C_Flag: mc8Components.FLAGS.cFlag,
        OP_Flag: mc8Components.FLAGS.pFlag,
        S_Flag: mc8Components.FLAGS.sFlag,
        Z_Flag: mc8Components.FLAGS.zFlag,
        Ram: mc8Components.RAM.integerCells
    }

    return obj;
}

