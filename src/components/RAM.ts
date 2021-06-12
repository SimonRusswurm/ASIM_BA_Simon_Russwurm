import { getHtmlElement } from "../utils";
import { animationWindow } from "../animationWindow";
import { convertNumberToHex_2digits, convertNumberToHex_4digits } from "../numberManipulations";



export class Ram {
    public startAddress: number;
    public size: number;
    private firstVariableCellPosition: number;
    private lastVariableCellPosition: number;
    private integerCells: Array <number> ;
    private htmlCells: Array <HTMLParagraphElement>;
    private middleRamLabel_p: HTMLElement;
    private middleRamLabel_div: HTMLElement;

    constructor() {
        this.middleRamLabel_div = getHtmlElement('middleRamLabel_div');
        this.middleRamLabel_p = getHtmlElement('middleRamLabel_p');
        this.startAddress = 8192;
        this.size = 8192;
        this.firstVariableCellPosition = 112;
        this.lastVariableCellPosition = 127;
        this.integerCells = new Array(this.size).fill(255);
        this.htmlCells = this.createRamCells();
        this.appendHtmlCellsToDOM();
    }

    private createRamCells(): Array <HTMLParagraphElement> {
        let rowCount = 0;
        const cellContainer: Array<HTMLParagraphElement> = [];

        for (var i = 0; i < 240; i++) {
            const ramCell = document.createElement('p');
            ramCell.classList.add('square1x1', 'positionAbsolute', 'centered');
            if (i < this.firstVariableCellPosition) {
                ramCell.id = `ramElement${i}`;
                ramCell.textContent = 'FF';
            } else if (i > this.lastVariableCellPosition) {
                ramCell.id = `ramElement${i+this.size-1-this.firstVariableCellPosition-this.lastVariableCellPosition}`;
                ramCell.textContent = 'FF';
            } else {
                ramCell.id = `ramElementVariable${i-this.firstVariableCellPosition}`;
                ramCell.textContent = '';
            }

            if (!(i % 8) && i !== 0)
                rowCount++;

            ramCell.style.top = `${100/32*(rowCount+2)}%`;
            ramCell.style.left = `${100/50*((i%8)+40)}%`;

            cellContainer.push(ramCell);
        }
        return cellContainer;
    }

    private appendHtmlCellsToDOM(): void {
        this.htmlCells.forEach(element => {
            animationWindow.mc8_div.appendChild(element);
        });
    }

    private reduceToRange0to2000h(address: number): number {
        return address - Math.floor(address / 8192) * 8192;
    }

    public getValueFrom(address: number): number {
        return this.integerCells[this.reduceToRange0to2000h(address)];
    }

    public updateElement(address: number, value: number): void {
        address = this.reduceToRange0to2000h(address);

        this.integerCells[address] = value;

        if(address < this.firstVariableCellPosition){
            this.htmlCells[address].textContent = convertNumberToHex_2digits(value);
        }
        else if(address > this.size-1-112){
            const htmlCellAddress = address-this.size+1+this.firstVariableCellPosition+this.lastVariableCellPosition;
            this.htmlCells[htmlCellAddress].textContent = convertNumberToHex_2digits(value);
        }
        else{
            this.htmlCells[address%16+this.firstVariableCellPosition].textContent = convertNumberToHex_2digits(value);
        }
    }

    public updateVariableCells(address: number): void {
        const reducedAddress = this.reduceToRange0to2000h(address);

        if (convertNumberToHex_4digits(reducedAddress).slice(0, -1) !== this.middleRamLabel_p.textContent!.slice(0, -1)) {
            if (reducedAddress > 111 && reducedAddress <= 8191 - 112) {
                this.changeVariableRange(address);
            } else if (this.middleRamLabel_p.textContent !== '') {
                this.removeVariableCellsContent();
            }
        }
    }

    private changeVariableRange(address: number): void {
        const reducedAddress = this.reduceToRange0to2000h(address);

        this.middleRamLabel_div.classList.remove('ellipses');
        this.middleRamLabel_div.classList.add('lightYellowBg');
        this.middleRamLabel_p.textContent = convertNumberToHex_4digits(address).slice(0, -1) + 'x';

        let lastXXX0Address: number = reducedAddress - reducedAddress % 16;
        for (let i = 0; i < 16; i++) {
            this.htmlCells[this.firstVariableCellPosition+i].textContent = convertNumberToHex_2digits(this.integerCells[lastXXX0Address + i]);
        }
    }

    private removeVariableCellsContent(): void{
        this.middleRamLabel_div.classList.add('ellipses');
        this.middleRamLabel_div.classList.remove('lightYellowBg');
        this.middleRamLabel_p.textContent = '';
        for (let i = 0; i < 16; i++) {
            this.htmlCells[this.firstVariableCellPosition+i].textContent = '';
        }
    }

    public getRamElementId(address: number = 0): string {
        address = this.reduceToRange0to2000h(address);

        if(address < this.firstVariableCellPosition){
            return this.htmlCells[address].id;
        }
        else if(address > this.size-1-112){
            const htmlCellAddress = address-this.size+1+this.firstVariableCellPosition+this.lastVariableCellPosition;
            return this.htmlCells[htmlCellAddress].id;
        }
        else{
            return this.htmlCells[address%16+this.firstVariableCellPosition].id;
        }
    }

    public reset(): void {
        this.integerCells.fill(255);
        this.htmlCells.forEach((element,index) => {
            element.textContent = 'FF';
            if(index >= this.firstVariableCellPosition && index <= this.lastVariableCellPosition)
                element.textContent = '';       
        });
    }
}