
import { addYellowBackgroundTo, getHtmlElement, sleepBetweenFrames, sleepForIDLETIME} from "../utils";
import { arrowAnimator } from "./ArrowAnimator";
import { programStatus } from "../ProgramStatus";
import { mc8Components } from "../components/Mc8Components";

export class ControlUnitAnimator {
    private stepNumberBackground_div: HTMLElement;

    constructor(){
        this.stepNumberBackground_div = getHtmlElement('stepNumberBg_div');
    }

    async stepDescriptionUpdate(description: string): Promise < any > {
        mc8Components.CONTROL_UNIT.updateStepDescription(description);
        mc8Components.CONTROL_UNIT.increaseStepNumber();
        await addYellowBackgroundTo(this.stepNumberBackground_div);
    }

    async assemblerCommandUpdate(): Promise < any > {
        await addYellowBackgroundTo(mc8Components.CONTROL_UNIT.IR.htmlElement);
        await arrowAnimator.displayIrArrow();
        mc8Components.CONTROL_UNIT.updateAssemblerCommand();
        if (!programStatus.noAnimation)
            await sleepForIDLETIME();
    } 
}

export const controlUnitAnimator = new ControlUnitAnimator();