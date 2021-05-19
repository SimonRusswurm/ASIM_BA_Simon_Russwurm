
import { sleepForIDLETIME } from "../utils";
import { programStatus } from "../ProgramStatus";
import { mc8Components } from "../components/Mc8Components";


const getHtmlElement = (id: string) => document.getElementById(id)!;
const registerArrow_div: HTMLElement = getHtmlElement('registerArrow_div');
const irArrow_div: HTMLElement = getHtmlElement('irArrow_div');
const movingFlagsArrow_div: HTMLElement = getHtmlElement('movingFlagsArrow_div');
const cFlagArrow_div: HTMLElement = getHtmlElement('cFlagArrow_div');
const checkJumpArrow_div: HTMLElement = getHtmlElement('checkJumpArrow_div');

class ArrowAnimator {

    constructor(){}

    async displayRegisterArrow(registerName: string): Promise <any> {
        const cssClassName = this.getCssClassNameOfArrowBy(registerName);
        if(!programStatus.noAnimation){
            registerArrow_div.classList.add(cssClassName);
            try {
                await sleepForIDLETIME();
            } finally {
                registerArrow_div.classList.remove(cssClassName);
            }
        }
    }

    private getCssClassNameOfArrowBy(registerName: string): string {
        switch (registerName) {
            case 'PC':
                return 'PC_arrow';
            case 'ZR':
                return 'ZR_arrow';
            case 'HL':
                return 'HL_arrow';
            case 'IX':
                return 'IX_arrow';
            case 'SP':
                return 'SP_arrow';
            default:
                return '';
        }
    }

    async displayIrArrow(): Promise <any> {
        if(!programStatus.noAnimation){
            irArrow_div.classList.add('ir_arrow');
            try {
                await sleepForIDLETIME();
            } finally {
                irArrow_div.classList.remove('ir_arrow');
            }
        }
    }

    async displaySetFlagsArrow(): Promise <any> {
        if(!programStatus.noAnimation){
            movingFlagsArrow_div.classList.add('flags_arrow');
            try {
                await sleepForIDLETIME();
            } finally {
                movingFlagsArrow_div.classList.remove('flags_arrow');
            }
        }
    }

    async displayAluCarryArrow(): Promise <any> {
        if(!programStatus.noAnimation){
            cFlagArrow_div.classList.add('cFlag_arrow');
            mc8Components.FLAGS.c_htmlElement.classList.add('yellowBg', 'borderBox');
            try {
                await sleepForIDLETIME();
            } finally {
                cFlagArrow_div.classList.remove('cFlag_arrow');
                mc8Components.FLAGS.c_htmlElement.classList.remove('yellowBg', 'borderBox');
            }
        }
    }

    async displayJumpArrow(flagName: string): Promise <any> {
        if(!programStatus.noAnimation){
            const flagHtmlElement = this.getFlagHtmlElementBy(flagName);
            checkJumpArrow_div.classList.add('jump_arrow');
            flagHtmlElement.classList.add('yellowBg', 'borderBox');
            try {
                await sleepForIDLETIME();
            } finally {
                checkJumpArrow_div.classList.remove('jump_arrow');
                flagHtmlElement.classList.remove('yellowBg', 'borderBox');
            }
        }
    }

    private getFlagHtmlElementBy(flagName: string): HTMLElement {
        switch (flagName) {
            case 'cFlag':
                return mc8Components.FLAGS.c_htmlElement;
            case 'zFlag':
                return mc8Components.FLAGS.z_htmlElement;
            case 'sFlag':
                return mc8Components.FLAGS.s_htmlElement;
            case 'pFlag':
                return mc8Components.FLAGS.p_htmlElement;        
            default:
                throw Error('No Such flagName');
        }
    }
}

export const arrowAnimator = new ArrowAnimator();