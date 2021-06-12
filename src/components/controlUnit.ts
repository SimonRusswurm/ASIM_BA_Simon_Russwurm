import { getHtmlElement } from "../utils";
import { mc8Commands } from "../mc8Commands";
import { Register_x2 } from "./RegisterClasses";


export class ControlUnit {
    public IR: Register_x2;
    public assemblerCommand: HTMLParagraphElement;
    public stepNumber: HTMLParagraphElement;
    public stepNumberBackground: HTMLDivElement;
    public stepDescription: HTMLParagraphElement;

    constructor(){
        this.IR = new Register_x2(getHtmlElement('irRegisterValue_h2'));
        this.assemblerCommand = <HTMLParagraphElement>getHtmlElement('assemblerCommand_p');
        this.stepNumber = <HTMLParagraphElement>getHtmlElement('stepNumber_p');
        this.stepNumberBackground = <HTMLDivElement>getHtmlElement('stepNumberBg_div');
        this.stepDescription = <HTMLParagraphElement>getHtmlElement('stepDescription_p');
    }

    public updateStepDescription(description: string): void{
        this.stepDescription.textContent = description;
    }

    public increaseStepNumber(): void {
        this.stepNumber.textContent = `${Number(this.stepNumber.textContent)+1}`;
    }

    public updateAssemblerCommand(): void {
        for (let i = 0; i < mc8Commands.length; i++) {
            if (mc8Commands[i].opCode === this.IR.value) {
                this.assemblerCommand.textContent = mc8Commands[i].assemblerNotation;
                return;
            }
        }
        this.assemblerCommand.textContent = 'Befehl unbekannt';
        this.assemblerCommand.parentElement!.style.backgroundColor = '#ff1930';
        throw Error('Unknown command');
    }

    public reset(): void {
        this.IR.update(0);
        this.stepNumber.textContent = '0';
        this.stepDescription.textContent = 'Prozessor angehalten';
        this.assemblerCommand.textContent = '';
    }
}