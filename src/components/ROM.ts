import { getHtmlElement } from "../utils";
import { convertHexToNumber, checkValidHex, convertNumberToHex_2digits, convertNumberToHex_4digits } from '../numberManipulations';
import { programStatus } from '../ProgramStatus';
import { mc8Commands } from '../mc8Commands';



//rom/ram variable memory blocks
const lastRomLabel_div: HTMLElement = getHtmlElement('lastRomLabel_div');
const lastRomLabel_p: HTMLElement = getHtmlElement('lastRomLabel_p');
const breakpointHover_div: HTMLElement = getHtmlElement('breakpointHover_div');
const breakpointsLabel_p: any = getHtmlElement('breakpointsLabel_p');
const mc8_div: HTMLElement = getHtmlElement('mc8_div');
const linkerFile_textarea: any = getHtmlElement('linkerFile_textarea');
const breakpointsCheckbox_input: HTMLInputElement = <HTMLInputElement>getHtmlElement('breakpointsCheckbox_input');

let ID_COUNTER = 0;

class HtmlCell{
    public htmlElement: HTMLInputElement;
    public allocatedIndex: number;

    constructor(allocatedIndex = -1){
        this.htmlElement = document.createElement('input');
        this.allocatedIndex = allocatedIndex;
    }

    public setImmutableCellProperties(): void {
        this.htmlElement.value = 'FF';
        this.htmlElement.readOnly = true;
        this.htmlElement.maxLength = 2;
        this.htmlElement.classList.add('square1x1', 'positionAbsolute', 'centered', 'romElement');  
        this.htmlElement.id = `romElement${ID_COUNTER}`;
        ID_COUNTER++;
    }

    public setVariableCellProperties(): void {
        this.htmlElement.value = '';
        this.htmlElement.readOnly = true;
        this.htmlElement.maxLength = 2;
        this.htmlElement.classList.add('square1x1', 'positionAbsolute', 'centered', 'romElement');  
        this.htmlElement.id = `romElementVariable${ID_COUNTER}`;
        ID_COUNTER++;
    }

    public resetImmutableCellProperties(): void {
        this.htmlElement.value = 'FF';
        this.htmlElement.readOnly = true;
        this.htmlElement.classList.remove('blueText', 'breakpoint');
    }

    public resetVariableCellProperties(): void {
        this.htmlElement.value = '';
        this.htmlElement.readOnly = true;
        this.htmlElement.classList.remove('blueText', 'breakpoint');
        this.allocatedIndex = -1;
    }

    public update(value: number): void {
        this.htmlElement.value = convertNumberToHex_2digits(value);
    }
}

export class Rom {
    private cellCount: number;
    private integerCells: Array <number>;
    private opCommandPositions: Array <boolean>;
    public breakpointPositions: Array <boolean>;
    private immutableHtmlCellsCount: number;
    private variableHtmlCellsCount: number;
    private immutableHtmlCells: Array <HtmlCell>;
    private variableHtmlCells: Array <HtmlCell>;

    constructor(){
        this.cellCount = 8192;
        this.integerCells = new Array(this.cellCount).fill(255);
        this.opCommandPositions = new Array(this.cellCount).fill(false);
        this.breakpointPositions = new Array(this.cellCount).fill(false);


        this.immutableHtmlCellsCount = 224;
        this.variableHtmlCellsCount = 16;
        
        this.immutableHtmlCells = this.createImmutableHtmlCells();
        this.variableHtmlCells = this.createVariableHtmlCells();
        this.appendCellsToDOM();
    }

    private appendCellsToDOM(){
        this.immutableHtmlCells.forEach(cell => {
            mc8_div.appendChild(cell.htmlElement);
        });
        this.variableHtmlCells.forEach(cell => {
            mc8_div.appendChild(cell.htmlElement);
        });
    }

    private createImmutableHtmlCells(): Array<HtmlCell>{
        const cellContainer: Array <HtmlCell> = [];

        for(let i= 0; i < this.immutableHtmlCellsCount; i++){
            const cell = new HtmlCell(i);
            cell.setImmutableCellProperties();
            cell.htmlElement.style.top = `${100/32*Math.floor(i/8+2)}%`;
            cell.htmlElement.style.left = `${100/50*((i%8)+2)}%`;
            this.addAllListenerToHtmlCell(cell);
            cellContainer.push(cell);
        }
        return cellContainer;
    }

    private createVariableHtmlCells(): Array<HtmlCell>{
        const cellContainer: Array <HtmlCell> = [];

        for(let i = 0; i < this.variableHtmlCellsCount; i++){
            const cell = new HtmlCell();
            cell.setVariableCellProperties();
            cell.htmlElement.style.top = `${100/32*Math.floor(i/8+30)}%`;
            cell.htmlElement.style.left = `${100/50*((i%8)+2)}%`;
            this.addAllListenerToHtmlCell(cell);
            cellContainer.push(cell);
        }
        return cellContainer;
    }

    private addAllListenerToHtmlCell(cell: HtmlCell): void {
        this.addDoubleClickListenerTo(cell);
        this.addClickListenerTo(cell);
        this.addHoverListenersTo(cell);
    }

    private addDoubleClickListenerTo(cell: HtmlCell): void{
        cell.htmlElement.addEventListener('dblclick', function(){
            if(cell.allocatedIndex !== -1){
                programStatus.romIsEdited = true;
                cell.htmlElement.readOnly = false;
            }
        });
    }

    private addClickListenerTo(cell: HtmlCell): void{
        const self = this;
        cell.htmlElement.addEventListener('click', function(){
            if(self.opCommandPositions[cell.allocatedIndex] && breakpointsCheckbox_input.checked){
                if(self.breakpointPositions[cell.allocatedIndex]){
                    cell.htmlElement.classList.remove('breakpoint', 'borderBox');
                    self.breakpointPositions[cell.allocatedIndex] = false;
                }
                else {
                    cell.htmlElement.classList.add('breakpoint', 'borderBox');
                    self.breakpointPositions[cell.allocatedIndex] = true;
                }
            }
        });
    }

    private addHoverListenersTo(cell: HtmlCell): void{
        const self = this;
        cell.htmlElement.addEventListener('mouseover', function (){
            if(self.opCommandPositions[cell.allocatedIndex] && breakpointsCheckbox_input.checked){
                self.updateHoverInfoBoxFromIntegerCellAt(cell.allocatedIndex);
                breakpointHover_div.classList.add('displayGrid');
            }         
        });

        cell.htmlElement.addEventListener('mouseleave', function (){
            breakpointHover_div.classList.remove('displayGrid');      
        });
    }

    private updateHoverInfoBoxFromIntegerCellAt(index: number): void{
        this.updateHoverInfoBoxPosition(index);

        if(this.integerCells[index] === 221){
            this.setTwoByteIxInfoText(index);
            return;
        }

        if(this.integerCells[index] === 203){
            this.setTwoByteShiftInfoText(index);
            return;
        }

        for(let i=0; i<mc8Commands.length; i++){
            if(mc8Commands[i].opCode === this.integerCells[index]){
                breakpointsLabel_p.textContent = mc8Commands[i].assemblerNotation;
                return;
            } 
        }

        breakpointsLabel_p.textContent = 'Unbekannt';
    }

    private updateHoverInfoBoxPosition(index: number): void{
        if(index >= this.immutableHtmlCellsCount)
            breakpointHover_div.style.top = `${(100/32)*27}%`;
        else if(index < this.immutableHtmlCellsCount/2)
            breakpointHover_div.style.top = `${100/32*Math.floor(index/8+2+1)}%`;
        else
            breakpointHover_div.style.top = `${100/32*Math.floor(index/8+2-3)}%`;
    }

    private setTwoByteIxInfoText(index: number): void{
        switch (this.integerCells[index+1]) {
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

    private setTwoByteShiftInfoText(index: number){
        switch (this.integerCells[index+1]) {
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

    public loadCommandsFromLinkerFile(): void{
        this.resetCells();
        this.writeLinkerFileToIntegerCells();
        this.updateImmutableHtmlCellsFromIntegerCells();
    }

    private resetCells(): void {
        this.integerCells.fill(255);
        this.opCommandPositions.fill(false);
        this.breakpointPositions.fill(false);
       
        this.resetImmutableHtmlCells();
        this.resetVariableHtmlCells();
    }

    private resetImmutableHtmlCells() :void{
        this.immutableHtmlCells.forEach(cell => {
            cell.resetImmutableCellProperties();
        });
    }

    private resetVariableHtmlCells(): void{
        lastRomLabel_div.classList.add('ellipses');
        lastRomLabel_div.classList.remove('lightYellowBg');
        lastRomLabel_p.textContent = '';

        this.variableHtmlCells.forEach(cell => {
            cell.resetVariableCellProperties();
        });
    }

    private writeLinkerFileToIntegerCells(): void{
        let linkerString = linkerFile_textarea.value.replace(/\r\n|\n|\r/gm, '');
        let dataLength = 0;
        let address = 0;

        //assuming the linkerFile is correct --> file gets checked in settingWindow.ts
        for (let i = 0; i < linkerString.length; i++) {
            if (linkerString[i] === ':') {
                if (linkerString[i + 8] === '1')    //end of file
                    break;
                dataLength = Number(linkerString[i + 2]);
                address = convertHexToNumber(linkerString[i + 3] + linkerString[i + 4] + linkerString[i + 5] + linkerString[i + 6]);
                
                if(address+dataLength > this.cellCount-1)
                    return;

                this.opCommandPositions[address] = true;
                for (let j = 0; j < dataLength; j++) {
                    this.integerCells[address + j] = convertHexToNumber(linkerString[i + 9 + j * 2] + linkerString[i + 10 + j * 2]);
                }
            }
        }
    }

    private updateImmutableHtmlCellsFromIntegerCells(): void{
        for (let i = 0; i < this.immutableHtmlCells.length; i++) {
            this.immutableHtmlCells[i].update(this.integerCells[i]);
            if (breakpointsCheckbox_input.checked && this.opCommandPositions[i])
                this.immutableHtmlCells[i].htmlElement.classList.add('blueText');           
        }
    }

    public updateVariableHtmlCells(address: number): void {
        if (convertNumberToHex_4digits(address).slice(0, -1) !== lastRomLabel_p.textContent!.slice(0, -1)) {
            if (address >= this.immutableHtmlCellsCount && address < this.cellCount) {
                this.setVariableHtmlCellsDependingOn(address);
            } else if (lastRomLabel_p.textContent !== '') {
                this.resetVariableHtmlCells();
            }
        }
    }

    private setVariableHtmlCellsDependingOn(address: number): void{
        const roundedAddress: number = address - address % 16;

        lastRomLabel_div.classList.remove('ellipses');
        lastRomLabel_p.textContent = convertNumberToHex_4digits(address).slice(0, -1) + 'x';
        lastRomLabel_div.classList.add('lightYellowBg');

        for (let i = 0; i < this.variableHtmlCells.length; i++) {
            this.variableHtmlCells[i].update(this.integerCells[roundedAddress+i])
            this.variableHtmlCells[i].allocatedIndex = roundedAddress+i;

            if (breakpointsCheckbox_input.checked && this.opCommandPositions[roundedAddress+i]){
                this.variableHtmlCells[i].htmlElement.classList.add('blueText');
                if(this.breakpointPositions[roundedAddress+i])
                    this.variableHtmlCells[i].htmlElement.classList.add('breakpoint', 'borderBox');
            }
            else{
                this.variableHtmlCells[i].htmlElement.classList.remove('blueText');
                this.variableHtmlCells[i].htmlElement.classList.remove('breakpoint', 'borderBox');
            }   
        }
    }

    public updateIntegerCellsFromDOM(): void{
        for (let i = 0; i < this.immutableHtmlCells.length; i++) {
            const newHexValue = this.immutableHtmlCells[i].htmlElement.value;

            if(checkValidHex(newHexValue)){
                this.integerCells[i] = convertHexToNumber(newHexValue);
            }
            else{
                this.immutableHtmlCells[i].htmlElement.value = convertNumberToHex_2digits(this.integerCells[i]);
                programStatus.romIsEdited = false;
            }
        }

        for (let i = 0; i < this.variableHtmlCells.length; i++) {
            const newHexValue = this.variableHtmlCells[i].htmlElement.value;
            const integerCellIndex = this.variableHtmlCells[i].allocatedIndex;

            if(checkValidHex(newHexValue)){
                this.integerCells[integerCellIndex] = convertHexToNumber(newHexValue);
            }
            else{
                this.variableHtmlCells[i].htmlElement.value = convertNumberToHex_2digits(this.integerCells[integerCellIndex]);
                programStatus.romIsEdited = false;
            }
        }
    }

    public getCellId(address: number): string {
        if(address >= this.immutableHtmlCellsCount){
            return this.variableHtmlCells[address%16].htmlElement.id;
        }

        return this.immutableHtmlCells[address].htmlElement.id;
    }

    public getCellValue(address: number): number {
        return this.integerCells[address];
    }
}