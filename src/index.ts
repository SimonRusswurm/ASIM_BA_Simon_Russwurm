import { getHtmlElement, checkPlayPressed } from './utils';
import { resizeWindow } from './resizeWindow';
import { programStatus } from './ProgramStatus';
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
        } catch (e) {
            // if (!programStatus.reset) {
            //     programStatus.setPause();
            // }
            // console.error(e);
            
            return false;
        }
        i++;
    }
}
