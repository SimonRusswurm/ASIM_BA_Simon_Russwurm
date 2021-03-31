import {convertNumberToHex_2digits, convertNumberToHex_4digits} from './numberManipulations'

const getHtmlElement = (id_string: string) => document.getElementById(id_string)!;


const middleRamLabel_div: HTMLElement = getHtmlElement('middleRamLabel_div');
const middleRamLabel_p: HTMLElement = getHtmlElement('middleRamLabel_p');

export class Ram {
    startAddressRam_number: number;
    size_number: number;
    number_array: Array < number > ;

    constructor() {
        this.startAddressRam_number = 8192;
        this.size_number = 8192;
        this.number_array = this.init_number();
        this.init_DOM();
    }

    init_number(): number[] {
        let buf_arr = [];
        for (let i = 0; i < 8192; i++)
            buf_arr.push(255);
        return buf_arr;
    }

    init_DOM(): void {
        let j = 0;
        for (var i = 0; i < 240; i++) {
            const ramElement = document.createElement('p');
            ramElement.classList.add('square1x1', 'positionAbsolute', 'centered');
            if (i < 112) {
                ramElement.id = `ramElement${i}`;
                ramElement.textContent = 'FF';
            } else if (i > 127) {
                ramElement.id = `ramElement${i+8192-240}`;
                ramElement.textContent = 'FF';
            } else {
                ramElement.id = `ramElementVariable${i-112}`;
                ramElement.textContent = '';
            }

            if (!(i % 8) && i !== 0)
                j++;

            ramElement.style.top = `${100/32*(j+2)}%`;
            ramElement.style.left = `${100/50*((i%8)+40)}%`;

            document.getElementById('mc8_div')!.appendChild(ramElement);
        }
    }

    reset(): void {
        for (let i = 0; i < this.number_array.length; i++) {
            this.number_array[i] = 255;
            if (i < 112) {
                getHtmlElement(`ramElement${i}`).textContent = 'FF';
            }
            if (i > 8192 - 113) {
                getHtmlElement(`ramElement${i}`).textContent = 'FF';
            }
        }
    }

    reduceToRange2000h(address_number: number): number {
        return address_number - Math.floor(address_number / 8192) * 8192;
    }

    getValue(address_number: number): number {
        return this.number_array[this.reduceToRange2000h(address_number)];
    }

    updateElement(address_number: number, value_number: number): void {
        address_number = this.reduceToRange2000h(address_number);

        this.number_array[address_number] = value_number;
        if (address_number < 112 || address_number > 8191 - 112) {
            getHtmlElement(`ramElement${address_number}`).textContent = convertNumberToHex_2digits(value_number);
        } else {
            getHtmlElement(`ramElementVariable${address_number%16}`).textContent = convertNumberToHex_2digits(value_number);
        }
    }

    updateVariableElements(address_number: number): void {
        const reducedAddress = this.reduceToRange2000h(address_number);

        if (convertNumberToHex_4digits(reducedAddress).slice(0, -1) !== middleRamLabel_p.textContent!.slice(0, -1)) {
            if (reducedAddress > 111 && reducedAddress <= 8191 - 112) {
                middleRamLabel_div.classList.remove('ellipses');
                middleRamLabel_div.classList.add('lightYellowBg');
                middleRamLabel_p.textContent = convertNumberToHex_4digits(address_number).slice(0, -1) + 'x';

                let lastXXX0Address: number = reducedAddress - reducedAddress % 16;
                for (let i = 0; i < 16; i++) {
                    getHtmlElement(`ramElementVariable${i}`).textContent = convertNumberToHex_2digits(this.number_array[lastXXX0Address + i]);
                }
            } else if (middleRamLabel_p.textContent !== '') {
                middleRamLabel_div.classList.add('ellipses');
                middleRamLabel_div.classList.remove('lightYellowBg');
                middleRamLabel_p.textContent = '';
                for (let i = 0; i < 16; i++) {
                    getHtmlElement(`ramElementVariable${i}`).textContent = '';
                }
            }
        }
    }

    getRamElementId(address_number: number = 0): string {
        address_number = this.reduceToRange2000h(address_number);

        if (address_number > 111 && address_number < 8191 - 111) {
            return getHtmlElement(`ramElementVariable${address_number%16}`).id;
        } else
            return getHtmlElement(`ramElement${address_number}`).id;
    }
}
