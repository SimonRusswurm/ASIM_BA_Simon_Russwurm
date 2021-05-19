import { getHtmlElement, checkPlayPressed } from './utils';
import { resizeWindow } from './resizeWindow';
import { programStatus } from './ProgramStatus';
import { mc8Commands } from './mc8Commands';
import { mc8Components } from './components/Mc8Components';
import { controlUnitAnimator } from './animators/ControlUnitAnimator';
import { transferAnimator } from './animators/TransferAnimator';
import { registerAnimator } from './animators/RegisterAnimator';


window.addEventListener('DOMContentLoaded', function () {
    resizeWindow(true);
    (<HTMLInputElement>getHtmlElement('breakpointsCheckbox_input')).checked = true;
    (<HTMLTextAreaElement>getHtmlElement('linkerFile_textarea')).value = '';
});

window.addEventListener('resize', function () {
    resizeWindow(false);
});

export class globalVars {
    public static IDLE_TIME: number = 500;
    public static NO_ANIMATION_IDLE_TIME: number = 15;
}

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
        if (mc8Commands[i].machineCommand === mc8Components.CONTROL_UNIT.IR.value)
            commandsToBeProcessed.push(mc8Commands[i].animationFunction);
    }

    commandsToBeProcessed.push(loadNextCommand);
    return;
}

let commandsToBeProcessed: Array<Function> = [loadNextCommand];


export const resetAnimation = () => {
    commandsToBeProcessed = [loadNextCommand];
    mc8Components.initComponents();
    // movingObject_h2.classList.remove('displayGrid');
}


export const startAnimation = async (): Promise < any > => {
    let i = 0;
    while (true) {
        if (commandsToBeProcessed[i] === undefined) {
            return false;
        }
        try {
            await checkPlayPressed();
            await commandsToBeProcessed[i]();
        } catch (e) {
            if (!programStatus.reset) {
                programStatus.setPause();
            }
            console.error(e);
            return false;
        }
        i++;
    }
}
