
import {convertHexToNumber, checkValidHex, convertNumberToHex_2digits, convertNumberToHex_4digits} from './numberManipulations';
import {mc8Commands_array} from './index';
import {ProgramStatus} from './ProgramStatusClass';

const getHtmlElement = (id_string: string) => document.getElementById(id_string)!;

//rom/ram variable memory blocks
const lastRomLabel_div: HTMLElement = getHtmlElement('lastRomLabel_div');
const lastRomLabel_p: HTMLElement = getHtmlElement('lastRomLabel_p');
const breakpointHover_div: any = getHtmlElement('breakpointHover_div');
const breakpointsLabel_p: any = getHtmlElement('breakpointsLabel_p');
const mc8_div: HTMLElement = getHtmlElement('mc8_div');
const linkerFile_textarea: any = getHtmlElement('linkerFile_textarea');
const breakpointsCheckbox_input: any = getHtmlElement('breakpointsCheckbox_input');



export class Rom {
    breakpoints_array: Array < number > ;
    number_array: Array < number > ;
    startAddressRom_number: number;
    size_number: number;
    programStatus: ProgramStatus;

    constructor(programStatus_class: ProgramStatus) {
        this.breakpoints_array = this.initBreakpoints();
        this.number_array = this.initNumberArray();
        this.init_DOM();
        this.startAddressRom_number = 0;
        this.size_number = 8192;
        this.programStatus = programStatus_class;
    }

    initNumberArray(): number[] {
        let buf_arr = [];
        for (let i = 0; i < 8192; i++) {
            buf_arr.push(255);
        }
        this.number_array = buf_arr;
        return buf_arr;
    }
    initBreakpoints(): number[] {
        let buf_arr = [];
        for (let i = 0; i < 8192; i++) {
            buf_arr.push(0);
        }
        return buf_arr;
    }
    resetBreakpoints(): void {
        this.breakpoints_array = this.initBreakpoints();
        for (let i = 0; i < 224; i++) {
            getHtmlElement(`romElement${i}`).classList.remove('blueText', 'breakpoint');
            getHtmlElement(`romElement${i}`).removeEventListener('mouseover',function(){},);
        }
    }

    init_DOM(): void {
        let j = 0;

        for (var i = 0; i < 240; i++) {
            const romElement: any = document.createElement('input');
            romElement.classList.add('square1x1', 'positionAbsolute', 'centered', 'romElement');
            romElement.id = `romElement${i}`;
            romElement.maxLength = 2;
            romElement.readOnly = 'true';
            //after every 8th romElement -> new line should be filled
            if (!(i % 8) && i !== 0)
                j++;

            if (i >= 224) {
                romElement.id = `romElementVariable${i-224}`;
                romElement.value = '';
            } else {
                romElement.value = 'FF';
            }

            romElement.style.top = `${100/32*(j+2)}%`;
            romElement.style.left = `${100/50*((i%8)+2)}%`;

            //hover pop-ups                
            romElement.addEventListener('mouseover', function() {
                if(Array.from(romElement.classList).includes('blueText'))
                    breakpointHover_div.classList.add('displayGrid');
                breakpointHover_div.style.top = `${(Number(romElement.style.top.replace('%',''))*32/100+1)*100/32}%`;
                let check = true;

                for (let j = 0; j < mc8Commands_array.length; j++) {
                    
                    if (mc8Commands_array[j].machineCommand_number === convertHexToNumber(romElement.value)){
                        breakpointsLabel_p.textContent = (mc8Commands_array[j].assemblerNotation_string);
                        check = false;

                        if(convertHexToNumber(romElement.value) === 221){
                            const bufIdNumber = Number(romElement.id.replace('romElement',''));
                            let secondByte = convertHexToNumber((<HTMLInputElement>getHtmlElement(`romElement${bufIdNumber+1}`)).value);
                            switch (secondByte) {
                                case 33:
                                    breakpointsLabel_p.textContent = 'MOV IX, dat_16';
                                    break;

                                case 34:
                                    breakpointsLabel_p.textContent = 'MOV label, IX';
                                    break;

                                case 42:
                                    breakpointsLabel_p.textContent = 'MOV IX, label';
                                    break;

                                case 35:
                                    breakpointsLabel_p.textContent = 'INC IX';
                                    break;
                                
                                case 43:
                                    breakpointsLabel_p.textContent = 'DEC IX';
                                    break;

                                case 233:
                                    breakpointsLabel_p.textContent = 'JP [IX]';
                                    break;
                
                                default:
                                    breakpointsLabel_p.textContent = 'Unbekannt';
                                    break;
                            }
                        }
                        else if(convertHexToNumber(romElement.value) === 203){
                            const bufIdNumber = Number(romElement.id.replace('romElement',''));
                            let secondByte = convertHexToNumber((<HTMLInputElement>getHtmlElement(`romElement${bufIdNumber+1}`)).value);
                            switch (secondByte) {
    
                                case 39:
                                    breakpointsLabel_p.textContent = 'SHL';
                                    break;

                                case 63:
                                    breakpointsLabel_p.textContent = 'SHR';
                                    break;

                                default:
                                    breakpointsLabel_p.textContent = 'Unbekannt';
                                    break;
                            }
                        }
                    }          
                }

                if(check){
                    breakpointsLabel_p.textContent = 'Unbekannt';
                }
            });
            romElement.addEventListener('mouseleave', function () {
                breakpointHover_div.classList.remove('displayGrid');
            });

            mc8_div.appendChild(romElement);
        }
    }

    updateNumberArrayFromDOM():void {
        for (let i = 0; i < 224; i++) {
            const buf: HTMLInputElement =  <HTMLInputElement>getHtmlElement(`romElement${i}`);

            if(checkValidHex(buf.value)){
                this.number_array[i] = convertHexToNumber(buf.value);
            }
            else{
                buf.value = convertNumberToHex_2digits(this.number_array[i]);
                this.programStatus.romIsEdited = false;
            }
        }
    }

    update(): void {
        this.resetBreakpoints();
        this.initNumberArray();
        let buf_string = '';
        let linker_string = linkerFile_textarea.value.replace(/\r\n|\n|\r/gm, '');

        //assuming the linkerFile is correct
        for (let i = 0; i < linker_string.length; i++) {
            if (linker_string[i] === ':') {
                if (linker_string[i + 8] === '1')
                    break;
                let length = Number(linker_string[i + 2]);
                let address = convertHexToNumber(linker_string[i + 3] + linker_string[i + 4] + linker_string[i + 5] + linker_string[i + 6]);

                //load data
                for (let j = 0; j < length; j++) {
                    if (j === 0)
                        this.breakpoints_array[address + j] = 1;
                    this.number_array[address + j] = convertHexToNumber(linker_string[i + 9 + j * 2] + linker_string[i + 10 + j * 2]);
                }
            }
        }

        //update DOM        
        for (let i = 0; i < 224; i++) {
            const romEle: HTMLInputElement = <HTMLInputElement>getHtmlElement(`romElement${i}`);
            buf_string = convertNumberToHex_2digits(this.number_array[i]);
            romEle.value = buf_string;


            if (breakpointsCheckbox_input.checked && this.breakpoints_array[i]) {
                romEle.classList.add('blueText');

                
            }
        }
    }

    updateVariableElements(address_number: number): void {
        if (convertNumberToHex_4digits(address_number).slice(0, -1) !== lastRomLabel_p.textContent!.slice(0, -1)) {
            if (address_number > 223 && address_number < 8192) {
                let lastXXX0Address: number = address_number - address_number % 16;

                lastRomLabel_div.classList.remove('ellipses');
                lastRomLabel_p.textContent = convertNumberToHex_4digits(address_number).slice(0, -1) + 'x';
                lastRomLabel_div.classList.add('lightYellowBg');


                for (let i = 0; i < 16; i++) {
                    (<HTMLInputElement>getHtmlElement(`romElementVariable${i}`)).value = convertNumberToHex_2digits(this.number_array[lastXXX0Address + i]);
                }
            } else if (lastRomLabel_p.textContent !== '') {
                lastRomLabel_div.classList.add('ellipses');
                lastRomLabel_div.classList.remove('lightYellowBg');
                lastRomLabel_p.textContent = '';
                for (let i = 0; i < 16; i++) {
                    (<HTMLInputElement>getHtmlElement(`romElementVariable${i}`)).value = '';
                }
            }
        }
    }

    getValue(address_number: number): number {
        return this.number_array[address_number];
    }

    getElementId(address_number: number): string {
        if (address_number > 223) {
            return getHtmlElement(`romElementVariable${address_number%16}`).id;
        }
        return getHtmlElement(`romElement${address_number}`).id;
    }
}