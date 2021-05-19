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
    htmlElement: HTMLInputElement;
    allocatedIndex: number;

    constructor(allocatedIndex = -1){
        this.htmlElement = document.createElement('input');
        this.allocatedIndex = allocatedIndex;
    }

    setImmutableCellProperties(): void {
        this.htmlElement.value = 'FF';
        this.htmlElement.readOnly = true;
        this.htmlElement.maxLength = 2;
        this.htmlElement.classList.add('square1x1', 'positionAbsolute', 'centered', 'romElement');  
        this.htmlElement.id = `romElement${ID_COUNTER}`;
        ID_COUNTER++;
    }

    setVariableCellProperties(): void {
        this.htmlElement.value = '';
        this.htmlElement.readOnly = true;
        this.htmlElement.maxLength = 2;
        this.htmlElement.classList.add('square1x1', 'positionAbsolute', 'centered', 'romElement');  
        this.htmlElement.id = `romElementVariable${ID_COUNTER}`;
        ID_COUNTER++;
    }

    resetImmutableCellProperties(): void {
        this.htmlElement.value = 'FF';
        this.htmlElement.readOnly = true;
        this.htmlElement.classList.remove('blueText', 'breakpoint');
    }

    resetVariableCellProperties(): void {
        this.htmlElement.value = '';
        this.htmlElement.readOnly = true;
        this.htmlElement.classList.remove('blueText', 'breakpoint');
        this.allocatedIndex = -1;
    }

    update(value: number): void {
        this.htmlElement.value = convertNumberToHex_2digits(value);
    }

    
    
}

export class Rom {
    cellCount: number;
    integerCells: Array <number>;
    opCommandPositions: Array < boolean >;
    breakpointPositions: Array < boolean >;

    immutableHtmlCells: Array <HtmlCell>;
    variableHtmlCells: Array <HtmlCell>;
    immutableHtmlCellsCount: number;
    variableHtmlCellsCount: number;

    ID_COUNTER: number;

    constructor(){
        this.ID_COUNTER = 0;
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

    appendCellsToDOM(){
        this.immutableHtmlCells.forEach(cell => {
            mc8_div.appendChild(cell.htmlElement);
        });
        this.variableHtmlCells.forEach(cell => {
            mc8_div.appendChild(cell.htmlElement);
        });
    }

    createImmutableHtmlCells(): Array<HtmlCell>{
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

    createVariableHtmlCells(): Array<HtmlCell>{
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

    addAllListenerToHtmlCell(cell: HtmlCell): void {
        this.addDoubleClickListenerTo(cell);
        this.addClickListenerTo(cell);
        this.addHoverListenersTo(cell);
    }

    addDoubleClickListenerTo(cell: HtmlCell): void{
        cell.htmlElement.addEventListener('dblclick', function(){
            if(cell.allocatedIndex !== -1){
                programStatus.romIsEdited = true;
                cell.htmlElement.readOnly = false;
            }
        });
    }

    addClickListenerTo(cell: HtmlCell): void{
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

    addHoverListenersTo(cell: HtmlCell): void{
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

    updateHoverInfoBoxFromIntegerCellAt(index: number){
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
            if(mc8Commands[i].machineCommand === this.integerCells[index]){
                breakpointsLabel_p.textContent = mc8Commands[i].assemblerNotation;
                return;
            } 
        }

        breakpointsLabel_p.textContent = 'Unbekannt';
    }

    updateHoverInfoBoxPosition(index: number){
        if(index >= this.immutableHtmlCellsCount)
            breakpointHover_div.style.top = `${(100/32)*27}%`;
        else if(index < this.immutableHtmlCellsCount/2)
            breakpointHover_div.style.top = `${100/32*Math.floor(index/8+2+1)}%`;
        else
            breakpointHover_div.style.top = `${100/32*Math.floor(index/8+2-3)}%`;
    }

    setTwoByteIxInfoText(index: number){
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

    setTwoByteShiftInfoText(index: number){
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

    loadCommandsFromLinkerFile(){
        this.resetCells();
        this.writeLinkerFileToIntegerCellsAndUpdateOpCommandPositions();
        this.updateImmutableHtmlCellsFromIntegerCells();
    }

    resetCells(): void {
        this.integerCells.fill(255);
        this.opCommandPositions.fill(false);
        this.breakpointPositions.fill(false);
       
        this.resetImmutableHtmlCells();
        this.resetVariableHtmlCells();
    }

    resetImmutableHtmlCells(){
        this.immutableHtmlCells.forEach(cell => {
            cell.resetImmutableCellProperties();
        });
    }

    resetVariableHtmlCells() {
        lastRomLabel_div.classList.add('ellipses');
        lastRomLabel_div.classList.remove('lightYellowBg');
        lastRomLabel_p.textContent = '';

        this.variableHtmlCells.forEach(cell => {
            cell.resetVariableCellProperties();
        });
    }

    writeLinkerFileToIntegerCellsAndUpdateOpCommandPositions(){
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

    updateImmutableHtmlCellsFromIntegerCells() {
        for (let i = 0; i < this.immutableHtmlCells.length; i++) {
            this.immutableHtmlCells[i].update(this.integerCells[i]);
            if (breakpointsCheckbox_input.checked && this.opCommandPositions[i])
                this.immutableHtmlCells[i].htmlElement.classList.add('blueText');           
        }
    }

    updateVariableHtmlCells(address: number): void {
        if (convertNumberToHex_4digits(address).slice(0, -1) !== lastRomLabel_p.textContent!.slice(0, -1)) {
            if (address >= this.immutableHtmlCellsCount && address < this.cellCount) {
                this.setVariableHtmlCellsDependingOn(address);
            } else if (lastRomLabel_p.textContent !== '') {
                this.resetVariableHtmlCells();
            }
        }
    }

    setVariableHtmlCellsDependingOn(address: number){
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

    updateIntegerCellsFromDOM() {
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

    getCellId(address: number): string {
        if(address >= this.immutableHtmlCellsCount){
            return this.variableHtmlCells[address%16].htmlElement.id;
        }

        return this.immutableHtmlCells[address].htmlElement.id;
    }

    getCellValue(address: number): number {
        return this.integerCells[address];
    }
}


// class RomOld {
//     cells: Array <RomCell>;
//     htmlCells: Array <HTMLInputElement>;
//     integerCells: Array < number >;
//     machineCommandPositions: Array < boolean >;
//     breakpointPositions: Array < boolean >;
//     cellCount: number;
//     fixedCellsCount: number;
//     visibleCellsCount: number;
//     variableCellsCount: number;
//     variableCellsStartAddress: number;
    
//     constructor(){
//         this.cells = this.makeRomCells();

//         this.visibleCellsCount = 240;
//         this.fixedCellsCount = 224;
//         this.variableCellsCount = 16;
//         this.cellCount = 8192;
//         this.variableCellsStartAddress = 224;
//         this.integerCells = new Array(this.cellCount).fill(255);
//         this.machineCommandPositions = new Array(this.fixedCellsCount).fill(false);
//         this.breakpointPositions = new Array(this.fixedCellsCount).fill(false);
//         this.htmlCells = this.createRomCells();
//         this.appendHtmlCellsToDOM();
//     }

//     makeRomCells(): Array<RomCell> {
//         const cellContainer: Array<RomCell> = [];

//         for(let i=0; i < this.visibleCellsCount; i++){
//             const romCell = new RomCell();

//             romCell.setPositionDependingOn(i);

//             if(i >= this.fixedCellsCount){
//                 romCell.isVariableCell = true;
//                 romCell.htmlElement.value = '';
//             }

//             cellContainer.push(romCell);
//         }

//         return cellContainer;
//     }

//     appendCellsToDOM(){
//         this.cells.forEach(element => {
//             mc8_div.appendChild(element.htmlElement);
//         });
//     }

    





//     createRomCells(): Array <HTMLInputElement> {
//         let rowCount = 0;
//         const cellContainer: Array<HTMLInputElement> = [];
        
//         for(let i=0; i< this.fixedCellsCount+this.variableCellsCount; i++){
//             const romCell: HTMLInputElement = document.createElement('input');

//             romCell.classList.add('square1x1', 'positionAbsolute', 'centered', 'romElement');
//             romCell.maxLength = 2;
//             romCell.readOnly = true;    
    
//             if (i >= this.fixedCellsCount) {
//                 romCell.id = `romElementVariable${i-this.fixedCellsCount}`;
//                 romCell.value = '';
//             } else {
//                 romCell.id = `romElement${i}`;
//                 romCell.value = 'FF';
//             }
            
//             if (!(i % 8) && i !== 0)
//                 rowCount++;
    
//             romCell.style.top = `${100/32*(rowCount+2)}%`;
//             romCell.style.left = `${100/50*((i%8)+2)}%`;

//             this.addEditableListeners(romCell, i);
//             cellContainer.push(romCell);
//         }
//         // console.log(cellContainer);
//         return cellContainer;        
//     }

//     addEditableListeners(romCell: HTMLInputElement, index: number): void {
//         const self = this;

//         romCell.addEventListener('dblclick', function(){
//             programStatus.romIsEdited = true;
//             romCell.readOnly = false;
//         });

//         romCell.addEventListener('click', function(){
//             if(self.machineCommandPositions[index]){
//                 if(self.breakpointPositions[index]){
//                     self.breakpointPositions[index] = false;
//                     romCell.classList.remove('breakpoint', 'borderBox');
//                 }
//                 else {
//                     self.breakpointPositions[index] = true;
//                     romCell.classList.add('breakpoint', 'borderBox');
//                 }
//             }
//         });
//     }

//     appendHtmlCellsToDOM(): void {
//         this.htmlCells.forEach(element => {
//             mc8_div.appendChild(element);
//         });
//     }

//     resetCells(): void {
//         this.integerCells.fill(255);
//         this.machineCommandPositions.fill(false);
//         this.breakpointPositions.fill(false);

//         this.htmlCells.forEach(element => {
//             element.value = '';
//             element.classList.remove('blueText', 'breakpoint');
//             element.removeEventListener('mouseover',function(){},);
//         });
//     }

//     addHoverListenerToCell(romCell: HTMLInputElement): void {
//         const self = this;
        
//         romCell.addEventListener('mouseover', function (){
//             self.displayHoverInformation(romCell);            
//         });

//     }
//     displayHoverInformation(romCell: HTMLInputElement): void {
//         // if()
//     }

//     addHoverListenersToCells(): void {
//         const self = this;
//         for(let i = 0; i < this.fixedCellsCount+this.variableCellsCount; i++){
//             this.htmlCells[i].addEventListener('mouseover', function(){
//                 self.updateAndDisplayHoverInfoBox(i);
//             });

//             this.htmlCells[i].addEventListener('mouseleave', function () {
//                 breakpointHover_div.classList.remove('displayGrid');
//             });
//         } 
//     }

//     removeListenersFromCells(): void {
//         const self = this;
//         for(let i = 0; i < this.fixedCellsCount+this.variableCellsCount; i++){
//             this.htmlCells[i].removeEventListener('mouseover', function(){
//                 self.updateAndDisplayHoverInfoBox(i);
//             });

//             this.htmlCells[i].removeEventListener('mouseleave', function () {
//                 breakpointHover_div.classList.remove('displayGrid');
//             });
//         }
//     }

//     updateAndDisplayHoverInfoBox(position: number): void {
//         if(position < this.fixedCellsCount)
//             this.updateHoverInfoText(position);
//         else    
//             this.updateHoverInfoText(this.variableCellsStartAddress+position-this.fixedCellsCount);
        

//         if(position < this.fixedCellsCount && this.machineCommandPositions[position]){
//             if(position < this.fixedCellsCount/2)
//                 breakpointHover_div.style.top = `${(Number(this.htmlCells[position].style.top.replace('%',''))*32/100+1)*100/32}%`;
//             else
//                 breakpointHover_div.style.top = `${(Number(this.htmlCells[position].style.top.replace('%',''))*32/100-3)*100/32}%`;
            
//             breakpointHover_div.classList.add('displayGrid');
//         }
//         else if(this.htmlCells[this.variableCellsCount].textContent !== ''){
//             breakpointHover_div.style.top = `${27*100/32}%`;
//             breakpointHover_div.classList.add('displayGrid');
//             console.log('TEST')
//         }
//     }

//     updateHoverInfoText(address: number): void {
//         if(this.integerCells[address] === 221){
//             this.setTwoByteIxInfoText(address);
//             return;
//         }

//         if(this.integerCells[address] === 203){
//             this.setTwoByteShiftInfoText(address);
//             return;
//         }

//         for(let i=0; i<mc8Commands.length; i++){
//             if(mc8Commands[i].machineCommand === this.integerCells[address]){
//                 breakpointsLabel_p.textContent = mc8Commands[i].assemblerNotation;
//                 return;
//             } 
//         }

//         breakpointsLabel_p.textContent = 'Unbekannt';
//         return;
//     }

//     setTwoByteIxInfoText(position: number){
//         switch (this.integerCells[position+1]) {
//             case 33:
//                 breakpointsLabel_p.textContent = 'MOV IX, dat_16';
//                 break;

//             case 34:
//                 breakpointsLabel_p.textContent = 'MOV label, IX';
//                 break;

//             case 42:
//                 breakpointsLabel_p.textContent = 'MOV IX, label';
//                 break;

//             case 35:
//                 breakpointsLabel_p.textContent = 'INC IX';
//                 break;
            
//             case 43:
//                 breakpointsLabel_p.textContent = 'DEC IX';
//                 break;

//             case 233:
//                 breakpointsLabel_p.textContent = 'JP [IX]';
//                 break;

//             default:
//                 breakpointsLabel_p.textContent = 'Unbekannt';
//                 break;
//         }
//     }

//     setTwoByteShiftInfoText(position: number){
//         switch (this.integerCells[position+1]) {
//             case 39:
//                 breakpointsLabel_p.textContent = 'SHL';
//                 break;

//             case 63:
//                 breakpointsLabel_p.textContent = 'SHR';
//                 break;

//             default:
//                 breakpointsLabel_p.textContent = 'Unbekannt';
//                 break;
//         }
//     }

//     loadCommandsFromLinkerFile(){
//         this.resetCells();
//         this.writeLinkerFileToCells();
//         this.updateDOM();
//     }

//     writeLinkerFileToCells(){
//         let linkerString = linkerFile_textarea.value.replace(/\r\n|\n|\r/gm, '');
//         let dataLength = 0;
//         let address = 0;
//         //assuming the linkerFile is correct --> file gets checked in settingWindow.ts
//         for (let i = 0; i < linkerString.length; i++) {
//             if (linkerString[i] === ':') {
//                 if (linkerString[i + 8] === '1')    //end of file
//                     break;
//                 dataLength = Number(linkerString[i + 2]);
//                 address = convertHexToNumber(linkerString[i + 3] + linkerString[i + 4] + linkerString[i + 5] + linkerString[i + 6]);
                
//                 this.machineCommandPositions[address] = true;
//                 for (let j = 0; j < dataLength; j++) {
//                     this.integerCells[address + j] = convertHexToNumber(linkerString[i + 9 + j * 2] + linkerString[i + 10 + j * 2]);
//                 }
//             }
//         }
//     }

//     updateDOM(){
//         for (let i = 0; i < this.fixedCellsCount; i++) {
//             this.htmlCells[i].value =  convertNumberToHex_2digits(this.integerCells[i]);
            
//             if (breakpointsCheckbox_input.checked && this.machineCommandPositions[i])
//                 this.htmlCells[i].classList.add('blueText');
//         }
//         if(breakpointsCheckbox_input.checked)
//             this.addHoverListenersToCells();
//     }

//     updateIntegerCellsFromDOM():void {
//         for (let i = 0; i < this.fixedCellsCount; i++) {
//             if(checkValidHex(this.htmlCells[i].value)){
//                 this.integerCells[i] = convertHexToNumber(this.htmlCells[i].value);
//             }
//             else{
//                 this.htmlCells[i].value = convertNumberToHex_2digits(this.integerCells[i]);
//                 programStatus.romIsEdited = false;
//             }
//         }
//     }

//     updateVariableElements(address: number): void {
//         if (convertNumberToHex_4digits(address).slice(0, -1) !== lastRomLabel_p.textContent!.slice(0, -1)) {
//             if (address > 223 && address < 8192) {
//                 this.addVariableCells(address);
//             } else if (lastRomLabel_p.textContent !== '') {
//                 this.removeVariableCells();
//             }
//         }
//     }

//     addVariableCells(address: number){
//         let lastXXX0Address: number = address - address % 16;

//         lastRomLabel_div.classList.remove('ellipses');
//         lastRomLabel_p.textContent = convertNumberToHex_4digits(address).slice(0, -1) + 'x';
//         lastRomLabel_div.classList.add('lightYellowBg');


//         for(let i=this.fixedCellsCount; i<this.fixedCellsCount+this.variableCellsCount; i++){
//             this.htmlCells[i].value = convertNumberToHex_2digits(this.integerCells[lastXXX0Address + i-this.fixedCellsCount]);

//             if (breakpointsCheckbox_input.checked && this.machineCommandPositions[lastXXX0Address + i-this.fixedCellsCount])
//                 this.htmlCells[i].classList.add('blueText');
//             else
//                 this.htmlCells[i].classList.remove('blueText');
//         }
//     }

//     removeVariableCells(){
//         lastRomLabel_div.classList.add('ellipses');
//         lastRomLabel_div.classList.remove('lightYellowBg');
//         lastRomLabel_p.textContent = '';
//         for(let i=this.fixedCellsCount; i<this.fixedCellsCount+this.variableCellsCount; i++){
//             this.htmlCells[i].value = '';
//         } 
//     }

//     getCellValue(address: number): number {
//         return this.integerCells[address];
//     }

//     getCellId(address: number): string {
//         if(address > this.fixedCellsCount){
//             return this.htmlCells[this.fixedCellsCount+address%16].id;
//         }

//         return this.htmlCells[address].id;
//     }
// }

// export class Rom2 {
//     breakpoints_array: Array < number > ;
//     number_array: Array < number > ;
//     startAddressRom_number: number;
//     size_number: number;
//     programStatus: ProgramStatus;

//     constructor(programStatus_class: ProgramStatus) {
//         this.breakpoints_array = this.initBreakpoints();
//         this.number_array = this.initNumberArray();
//         this.init_DOM();
//         this.startAddressRom_number = 0;
//         this.size_number = 8192;
//         this.programStatus = programStatus_class;
//     }

//     initNumberArray(): number[] {
//         let buf_arr = [];
//         for (let i = 0; i < 8192; i++) {
//             buf_arr.push(255);
//         }
//         this.number_array = buf_arr;
//         return buf_arr;
//     }
//     initBreakpoints(): number[] {
//         let buf_arr = [];
//         for (let i = 0; i < 8192; i++) {
//             buf_arr.push(0);
//         }
//         return buf_arr;
//     }
//     resetBreakpoints(): void {
//         this.breakpoints_array = this.initBreakpoints();
//         for (let i = 0; i < 224; i++) {
//             getHtmlElement(`romElement${i}`).classList.remove('blueText', 'breakpoint');
//             getHtmlElement(`romElement${i}`).removeEventListener('mouseover',function(){},);
//         }
//     }

//     init_DOM(): void {
//         let j = 0;

//         for (var i = 0; i < 240; i++) {
//             const romElement: any = document.createElement('input');
//             romElement.classList.add('square1x1', 'positionAbsolute', 'centered', 'romElement');
//             romElement.id = `romElement${i}`;
//             romElement.maxLength = 2;
//             romElement.readOnly = 'true';
//             //after every 8th romElement -> new line should be filled
//             if (!(i % 8) && i !== 0)
//                 j++;

//             if (i >= 224) {
//                 romElement.id = `romElementVariable${i-224}`;
//                 romElement.value = '';
//             } else {
//                 romElement.value = 'FF';
//             }

//             romElement.style.top = `${100/32*(j+2)}%`;
//             romElement.style.left = `${100/50*((i%8)+2)}%`;

//             //hover pop-ups                
//             romElement.addEventListener('mouseover', function() {
//                 if(Array.from(romElement.classList).includes('blueText'))
//                     breakpointHover_div.classList.add('displayGrid');
//                 breakpointHover_div.style.top = `${(Number(romElement.style.top.replace('%',''))*32/100+1)*100/32}%`;
//                 let check = true;

//                 for (let j = 0; j < mc8Commands.length; j++) {
                    
//                     if (mc8Commands[j].machineCommand === convertHexToNumber(romElement.value)){
//                         breakpointsLabel_p.textContent = (mc8Commands[j].assemblerNotation);
//                         check = false;

//                         if(convertHexToNumber(romElement.value) === 221){
//                             const bufIdNumber = Number(romElement.id.replace('romElement',''));
//                             let secondByte = convertHexToNumber((<HTMLInputElement>getHtmlElement(`romElement${bufIdNumber+1}`)).value);
//                             switch (secondByte) {
//                                 case 33:
//                                     breakpointsLabel_p.textContent = 'MOV IX, dat_16';
//                                     break;

//                                 case 34:
//                                     breakpointsLabel_p.textContent = 'MOV label, IX';
//                                     break;

//                                 case 42:
//                                     breakpointsLabel_p.textContent = 'MOV IX, label';
//                                     break;

//                                 case 35:
//                                     breakpointsLabel_p.textContent = 'INC IX';
//                                     break;
                                
//                                 case 43:
//                                     breakpointsLabel_p.textContent = 'DEC IX';
//                                     break;

//                                 case 233:
//                                     breakpointsLabel_p.textContent = 'JP [IX]';
//                                     break;
                
//                                 default:
//                                     breakpointsLabel_p.textContent = 'Unbekannt';
//                                     break;
//                             }
//                         }
//                         else if(convertHexToNumber(romElement.value) === 203){
//                             const bufIdNumber = Number(romElement.id.replace('romElement',''));
//                             let secondByte = convertHexToNumber((<HTMLInputElement>getHtmlElement(`romElement${bufIdNumber+1}`)).value);
//                             switch (secondByte) {
    
//                                 case 39:
//                                     breakpointsLabel_p.textContent = 'SHL';
//                                     break;

//                                 case 63:
//                                     breakpointsLabel_p.textContent = 'SHR';
//                                     break;

//                                 default:
//                                     breakpointsLabel_p.textContent = 'Unbekannt';
//                                     break;
//                             }
//                         }
//                     }          
//                 }

//                 if(check){
//                     breakpointsLabel_p.textContent = 'Unbekannt';
//                 }
//             });
//             romElement.addEventListener('mouseleave', function () {
//                 breakpointHover_div.classList.remove('displayGrid');
//             });

//             mc8_div.appendChild(romElement);
//         }
//     }

//     updateIntegerCellsFromDOM():void {
//         for (let i = 0; i < 224; i++) {
//             const buf: HTMLInputElement =  <HTMLInputElement>getHtmlElement(`romElement${i}`);

//             if(checkValidHex(buf.value)){
//                 this.number_array[i] = convertHexToNumber(buf.value);
//             }
//             else{
//                 buf.value = convertNumberToHex_2digits(this.number_array[i]);
//                 this.programStatus.romIsEdited = false;
//             }
//         }
//     }

//     loadCommandsFromLinkerFile(): void {
//         this.resetBreakpoints();
//         this.initNumberArray();
//         let buf_string = '';
//         let linker_string = linkerFile_textarea.value.replace(/\r\n|\n|\r/gm, '');

//         //assuming the linkerFile is correct
//         for (let i = 0; i < linker_string.length; i++) {
//             if (linker_string[i] === ':') {
//                 if (linker_string[i + 8] === '1')
//                     break;
//                 let length = Number(linker_string[i + 2]);
//                 let address = convertHexToNumber(linker_string[i + 3] + linker_string[i + 4] + linker_string[i + 5] + linker_string[i + 6]);

//                 //load data
//                 for (let j = 0; j < length; j++) {
//                     if (j === 0)
//                         this.breakpoints_array[address + j] = 1;
//                     this.number_array[address + j] = convertHexToNumber(linker_string[i + 9 + j * 2] + linker_string[i + 10 + j * 2]);
//                 }
//             }
//         }

//         //update DOM        
//         for (let i = 0; i < 224; i++) {
//             const romEle: HTMLInputElement = <HTMLInputElement>getHtmlElement(`romElement${i}`);
//             buf_string = convertNumberToHex_2digits(this.number_array[i]);
//             romEle.value = buf_string;


//             if (breakpointsCheckbox_input.checked && this.breakpoints_array[i]) {
//                 romEle.classList.add('blueText');

                
//             }
//         }
//     }

//     updateVariableElements(address: number): void {
//         if (convertNumberToHex_4digits(address).slice(0, -1) !== lastRomLabel_p.textContent!.slice(0, -1)) {
//             if (address > 223 && address < 8192) {
//                 let lastXXX0Address: number = address - address % 16;

//                 lastRomLabel_div.classList.remove('ellipses');
//                 lastRomLabel_p.textContent = convertNumberToHex_4digits(address).slice(0, -1) + 'x';
//                 lastRomLabel_div.classList.add('lightYellowBg');


//                 for (let i = 0; i < 16; i++) {
//                     (<HTMLInputElement>getHtmlElement(`romElementVariable${i}`)).value = convertNumberToHex_2digits(this.number_array[lastXXX0Address + i]);
//                 }
//             } else if (lastRomLabel_p.textContent !== '') {
//                 lastRomLabel_div.classList.add('ellipses');
//                 lastRomLabel_div.classList.remove('lightYellowBg');
//                 lastRomLabel_p.textContent = '';
//                 for (let i = 0; i < 16; i++) {
//                     (<HTMLInputElement>getHtmlElement(`romElementVariable${i}`)).value = '';
//                 }
//             }
//         }
//     }

//     getCellValue(address: number): number {
//         return this.number_array[address];
//     }

//     getCellId(address: number): string {
//         if (address > 223) {
//             return getHtmlElement(`romElementVariable${address%16}`).id;
//         }
//         return getHtmlElement(`romElement${address}`).id;
//     }
// }


