import { getHtmlElement, checkPlayPressed  } from "../utils";
import { programStatus } from "../ProgramStatus";
import { checkValidHex, convertHexToNumber } from "../numberManipulations";
import { registerAnimator } from "./RegisterAnimator";
import { buttonController } from "../buttonController";


const io2InputInfo_p: HTMLElement = getHtmlElement('io2InputInfo_p');
const io1InputInfo_p: HTMLElement = getHtmlElement('io1InputInfo_p');
const io3InputInfo_p: HTMLElement = getHtmlElement('io3InputInfo_p');
const io1InputWindow_div: HTMLElement = getHtmlElement('io1InputWindow_div');
const io2InputWindow_div: HTMLElement = getHtmlElement('io2InputWindow_div');
const io3InputWindow_div: HTMLElement = getHtmlElement('io3InputWindow_div');
const io1Input_input: HTMLElement = getHtmlElement('io1Input_input');
const io2Input_input: HTMLElement = getHtmlElement('io2Input_input');
const io3Input_input: HTMLElement = getHtmlElement('io3Input_input');

class IOAnimator {
    constructor(){}

    async animateIoUserInput(IoName: string): Promise < any >{
        let ioInputWindow: HTMLElement;
        let ioInput: any;
        let check = true;
        programStatus.ioInputDisplayed = true;
        switch (IoName) {
            case 'IO1':
                ioInputWindow = io1InputWindow_div;
                ioInput = io1Input_input;
                break;
            case 'IO2':
                ioInputWindow = io2InputWindow_div;
                ioInput = io2Input_input;
                break;
    
            case 'IO3':
                ioInputWindow = io3InputWindow_div;
                ioInput = io3Input_input;
                break;
    
            default:
                throw Error('Unknown IO');
        }
        ioInputWindow.classList.add('displayGrid');
        ioInput.select();
        try {
            while (check) {
                buttonController.pause();
                await checkPlayPressed();
    
                if (ioInput.value === '')
                    ioInput.value = 'FF';
                if (checkValidHex(ioInput.value)) {
                    check = false;
                } else {
                    if (IoName === 'IO1') {
                        io1InputInfo_p.classList.add('redBg');
                        io1InputInfo_p.textContent = 'Das ist keine gültige zweistellige Hex-Zahl. Verwenden Sie nur die Zahlen  0-9 und die Zeichen A-F!';
                    } else if (IoName === 'IO2') {
                        io2InputInfo_p.classList.add('redBg');
                        io2InputInfo_p.textContent = 'Das ist keine gültige zweistellige Hex-Zahl. Verwenden Sie nur die Zahlen  0-9 und die Zeichen A-F!';
                    } else if (IoName === 'IO3') {
                        io3InputInfo_p.classList.add('redBg');
                        io3InputInfo_p.textContent = 'Das ist keine gültige zweistellige Hex-Zahl. Verwenden Sie nur die Zahlen  0-9 und die Zeichen A-F!';
                    }
                }
            }
        } finally {
            ioInputWindow.classList.remove('displayGrid');
            io1InputInfo_p.classList.remove('redBg');
            io2InputInfo_p.classList.remove('redBg');
            io3InputInfo_p.classList.remove('redBg');
            io1InputInfo_p.textContent = 'Geben Sie eine zweistellige Hexadezimalzahl ein!';
            getHtmlElement('io2InputInfo_p').textContent = 'Geben Sie eine zweistellige Hexadezimalzahl ein!';
            getHtmlElement('io3InputInfo_p').textContent = 'Geben Sie eine zweistellige Hexadezimalzahl ein!';
            programStatus.ioInputDisplayed = false;
        }
    
        await registerAnimator.registerUpdate(IoName, convertHexToNumber(ioInput.value));
        ioInput.value = '';
    }
}

export const ioAnimator = new IOAnimator();