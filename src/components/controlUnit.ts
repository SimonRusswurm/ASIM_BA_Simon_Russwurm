import { getHtmlElement } from "../utils";
import { mc8Commands } from "../mc8Commands";
import { Register_x2 } from "./RegisterClasses";


export class ControlUnit {
    IR: Register_x2;
    assemblerCommand: HTMLParagraphElement;
    stepNumber: HTMLParagraphElement;
    stepNumberBackground: HTMLDivElement;
    stepDescription: HTMLParagraphElement;

    constructor(){
        this.IR = new Register_x2(getHtmlElement('irRegisterValue_h2'));
        this.assemblerCommand = <HTMLParagraphElement>getHtmlElement('assemblerCommand_p');
        this.stepNumber = <HTMLParagraphElement>getHtmlElement('stepNumber_p');
        this.stepNumberBackground = <HTMLDivElement>getHtmlElement('stepNumberBg_div');
        this.stepDescription = <HTMLParagraphElement>getHtmlElement('stepDescription_p');
    }

    updateStepDescription(description: string): void{
        this.stepDescription.textContent = description;
    }

    increaseStepNumber(): void {
        this.stepNumber.textContent = `${Number(this.stepNumber.textContent)+1}`;
    }

    updateAssemblerCommand(): void {
        for (let i = 0; i < mc8Commands.length; i++) {
            if (mc8Commands[i].machineCommand === this.IR.value) {
                this.assemblerCommand.textContent = mc8Commands[i].assemblerNotation;
                return;
            }
        }
        this.assemblerCommand.textContent = 'Befehl unbekannt';
        throw Error('Unknown command');
    }

    reset(): void {
        this.IR.update(0);
        this.stepNumber.textContent = '0';
        this.stepDescription.textContent = 'Prozessor angehalten';
        this.assemblerCommand.textContent = '';
    }
}