import { getHtmlElement, addYellowBackgroundTo, sleepBetweenFrames, sleepForNOANIMATIONIDLETIME, pauseableSleep  } from "../utils";
import { Point, getPointsAtoB } from "../busLogic";
import { mc8Components } from "../components/Mc8Components";
import { convertNumberToHex_2digits, convertNumberToHex_4digits } from "../numberManipulations";
import { arrowAnimator } from "./ArrowAnimator";
import { registerAnimator } from "./RegisterAnimator";
import { Register_x4 } from "../components/RegisterClasses";
import { programStatus } from "../ProgramStatus";
import { ioAnimator } from "./IoAnimator";
import { animationWindow } from "../animationWindow";


class TransferAnimator {
    private movingObject: HTMLElement;
    private origin: string;
    private target: string;
    private valueToTransfer: number;
    private pointsFromOriginToTarget: Array<Point>;


    constructor(){
        this.movingObject = getHtmlElement('movingObject_h2');
        this.target = '';
        this.origin = '';
        this.pointsFromOriginToTarget = [];
        this.valueToTransfer = 0;
    }

    async transfer(origin: string, target: string, value = 0): Promise < any > {
        this.updateClassVariables(origin, target, value);
        this.updateMovingObjectValue();
        this.updateMovingObjectPosition(this.pointsFromOriginToTarget[0].x, this.pointsFromOriginToTarget[0].y);
        this.updateMovingObjectSize();
        

        if(programStatus.animationType_1){
            this.displayMovingObject();
            await this.transferType1();
        }
        else if(programStatus.animationType_2){
            this.displayMovingObject();
            await this.transferType2();
        }
        else if(programStatus.noAnimation)
            await this.animateOnlyDecoder();
        this.hideMovingObject();
        
    }

    private updateClassVariables(origin: string, target: string, value: number) {
        this.origin = origin;
        this.target = target;
        this.valueToTransfer = value;
        this.pointsFromOriginToTarget = getPointsAtoB(origin, target);
    }

    private updateMovingObjectValue(): void {
        let textContent: string;
    
        //convert value_number to hex_4digits if required
        if (this.valueToTransfer > 255 || this.origin === 'ROM2' || this.origin === 'RAM2' || this.origin === 'ZR' || this.origin === 'PC' || this.origin === 'IX' || this.origin === 'HL' || this.origin === 'SP')
            textContent = convertNumberToHex_4digits(this.valueToTransfer);
        else
            textContent = convertNumberToHex_2digits(this.valueToTransfer);
        
        this.movingObject.textContent = textContent;
    }

    private updateMovingObjectPosition(xCoordinate: number, yCoordinate: number): void {
        if(yCoordinate > 30)
            yCoordinate = 30;
        this.movingObject.style.top = `${100 / animationWindow.sectionsCountHeight * yCoordinate}%`;
        this.movingObject.style.left = `${100 / animationWindow.sectionsCountWidth * xCoordinate}%`;
    }

    private updateMovingObjectSize(): void {
        if (this.valueToTransfer > 255 || this.target === 'ROM2' || this.target === 'RAM2' || this.target === 'ZR' || this.target === 'PC' || this.target === 'IX' || this.target === 'HL' || this.target === 'SP')
            this.movingObject.classList.add('rectangle4x2');
        else
            this.movingObject.classList.remove('rectangle4x2');
    }

    private displayMovingObject(): void {
        this.movingObject.classList.add('displayGrid');
    }

    private hideMovingObject(): void {
        this.movingObject.classList.remove('displayGrid');
    }

    private async transferType1(): Promise < any > {
        for (let i = 0; i < this.pointsFromOriginToTarget.length; i = i+ programStatus.transferSpeed) {
            const currentPoint = this.pointsFromOriginToTarget[i];

            this.updateMovingObjectPosition(currentPoint.x,currentPoint.y);

            if(this.checkDisplayDecoder(currentPoint))
                mc8Components.DECODER.updateDOM();
            else if(!mc8Components.DECODER.isRamAccess && !mc8Components.DECODER.isIoAccess){

            }    
            // else
            //     mc8Components.DECODER.resetDOM();
            
            if(programStatus.noAnimation){
                this.hideMovingObject();
                return;
            }

            try {
                await sleepBetweenFrames();

            } catch (e) {
                this.hideMovingObject();
                // mc8Components.DECODER.resetDOM();
                throw e;
            }
        }
    }

    private async transferType2(): Promise < any > {
        let pathElements: Array<HTMLElement> = [];
        let addX = 0;

        if (this.checkDisplayDecoder())
            mc8Components.DECODER.updateDOM();

            if(this.pointsFromOriginToTarget[0].x === 16 && this.pointsFromOriginToTarget[this.pointsFromOriginToTarget.length-10].y === 24){
                addX = 1;
            }

            for (let i = this.pointsFromOriginToTarget.length-1; i > 0; i-=6) {
                if(this.pointsFromOriginToTarget[i].y < 30)
                    pathElements.push(this.createPathElement(this.pointsFromOriginToTarget[i].x + addX, this.pointsFromOriginToTarget[i].y));
            }

            pathElements.push(this.createLastPathElement());

            this.displayPath(pathElements);

            try {
                for(let i = 0; i < 10; i++){
                    await pauseableSleep(200 / programStatus.transferSpeed);
                    if(programStatus.noAnimation){
                        break;
                    }
                }                
            } finally {
                for (let i = 0; i < pathElements.length; i++) {
                    pathElements[i].remove();
                }
                this.hideMovingObject();
            }

        if (this.checkResetDecoder()) {
                mc8Components.DECODER.resetDOM();
        }
    }

    private checkDisplayDecoder(point?: Point): boolean {
        const originPoint = this.pointsFromOriginToTarget[0];
        const targetPoint = this.pointsFromOriginToTarget[this.pointsFromOriginToTarget.length-1];

        if(point !== undefined){
            if(!this.isInCpu(point))
                 return true;
            return false;            
        }
        if(this.isInCpu(originPoint) && !this.isInCpu(targetPoint))
            return true;
        return false;
    }

    private isInCpu(point: Point): boolean {
        if(point.y < 24 && point.y > 3 && point.x > 11 && point.x < 38)
            return true;
        return false;
    }
    
    private createPathElement(xCoordinate: number, yCoordinate: number): HTMLElement {
        let element = document.createElement('div');
        element.style.left = `${100/animationWindow.sectionsCountWidth*(xCoordinate+0.5)}%`;
        element.style.top = `${100/animationWindow.sectionsCountHeight*(yCoordinate+0.5)}%`;
        element.classList.add('positionAbsolute', 'square1x1', 'pathElement', 'alignBg', 'rounded');
        return element;
    }

    private createLastPathElement(): HTMLElement {
        let last = document.createElement('h2');
        let xCoordinate = this.pointsFromOriginToTarget[this.pointsFromOriginToTarget.length-1].x;
        let yCoordinate = this.pointsFromOriginToTarget[this.pointsFromOriginToTarget.length-1].y;

        if(yCoordinate > 30)
            yCoordinate = 30;

        last.style.left = `${100/animationWindow.sectionsCountWidth*xCoordinate}%`;
        last.style.top = `${100/animationWindow.sectionsCountHeight*yCoordinate}%`;
        last.textContent = this.movingObject.textContent;
        last.classList.add('yellowBg', 'borderBox', 'square2x2', 'positionAbsolute', 'centered', 'rounded');
        if (this.origin === 'PC' || this.origin === 'ZR' || this.origin === 'HL' || this.origin === 'SP' || this.origin === 'IX')
            last.classList.add('rectangle4x2');
        return last;
    }

    private displayPath(pathElements: Array<HTMLElement>): void {
        pathElements.forEach(element => {
            animationWindow.mc8_div.appendChild(element);            
        });
    }    

    private checkResetDecoder(): boolean {
        if(!mc8Components.DECODER.isRamAccess && !mc8Components.DECODER.isIoAccess)
            return false;
        return true;
    }

    private async animateOnlyDecoder(): Promise < any > {
        mc8Components.DECODER.updateDOM();
        try{
            await sleepForNOANIMATIONIDLETIME();
        }
        catch (e){
            mc8Components.DECODER.resetDOM();
            throw e;   
        }
        finally{
            mc8Components.DECODER.resetDOM();
        }
    }

    async readFromMemoryInRegister(addressRegister: string, targetRegister: string): Promise < any >{

        const address = mc8Components.getRegisterBy(addressRegister).value;
    
        mc8Components.DECODER.update(1, 0, 0, 1, address);
        await arrowAnimator.displayRegisterArrow(addressRegister);
    
        //determine ROM or RAM or IOs
        if (address < 8192) {
            await this.transfer(addressRegister, 'ROM2', address);
            await this.transfer(mc8Components.ROM.getCellId(address), targetRegister, mc8Components.ROM.getCellValue(address));
            await registerAnimator.registerUpdate(targetRegister, mc8Components.ROM.getCellValue(address));
        }
        else if (address >= mc8Components.RAM.startAddress && address < mc8Components.RAM.startAddress + mc8Components.RAM.size) {
            mc8Components.RAM.updateVariableCells(address);
            await this.transfer(addressRegister, 'RAM2', address);
            await this.transfer(mc8Components.RAM.getRamElementId(address), targetRegister, mc8Components.RAM.getValueFrom(address));
            await registerAnimator.registerUpdate(targetRegister, mc8Components.RAM.getValueFrom(address));
        }
        else if (!mc8Components.IO1.isIoMapped) {
            if (address ===  mc8Components.IO1.address) {
                await this.transfer(addressRegister, 'DEC_UPDATE', address);
                await ioAnimator.animateIoUserInput('IO1');
                await this.transfer('IO1', 'A', mc8Components.IO1.value);
                await registerAnimator.registerUpdate('A', mc8Components.IO1.value);
            }
            else if (address === mc8Components.IO2.address) {
                await this.transfer(addressRegister, 'DEC_UPDATE', address);
                await ioAnimator.animateIoUserInput('IO2');
                await this.transfer('IO2', 'A', mc8Components.IO2.value);
                await registerAnimator.registerUpdate('A', mc8Components.IO2.value);
            }
            else if (address === mc8Components.IO3.address) {
                await this.transfer(addressRegister, 'DEC_UPDATE', address);
                await ioAnimator.animateIoUserInput('IO2');
                await this.transfer('IO2', 'A', mc8Components.IO3.value);
                await registerAnimator.registerUpdate('A', mc8Components.IO3.value);
            }
        }
        //Neither ROM or RAM  or IOs
        else {
            //The address of the addressRegister is unknown.
            //the following code wont be executed completely, because the decoder will interrupt execution
            await this.transfer(addressRegister, 'ROM2', address);
        }
        mc8Components.DECODER.resetDOM();
    }
    
    async writeToMemoryFromRegister(addressRegister: string, dataRegister: string): Promise < any >{
        let ramEle_htmlElement: HTMLElement;
    
        //get address
        const address_number = mc8Components.getRegisterBy(addressRegister).value;
    
        //get data
        const register_class = mc8Components.getRegisterBy(dataRegister);
        let data_number = register_class.value;
    
        if(register_class instanceof Register_x4){
            if (dataRegister.includes('hi'))
                data_number = (<Register_x4>register_class).hiValue;
            if (dataRegister.includes('lo'))
                data_number = (<Register_x4>register_class).loValue;
        }
        //update decoder, without displaying it
        mc8Components.DECODER.update(0, 1, 0, 1, address_number);
    
        await arrowAnimator.displayRegisterArrow(addressRegister);
    
        //determine ROM or RAM
        if (address_number < 8192) {
            //wont be executed completely, because the decoder will interrupt execution 
            await this.transfer(addressRegister, 'ROM2', address_number);
        } else if (address_number >= mc8Components.RAM.startAddress && address_number < mc8Components.RAM.startAddress + mc8Components.RAM.size) {
            ramEle_htmlElement = getHtmlElement(mc8Components.RAM.getRamElementId(address_number));
            mc8Components.RAM.updateVariableCells(address_number);
            await this.transfer(addressRegister, 'RAM2', address_number);
            if (!programStatus.noAnimation)
                ramEle_htmlElement.classList.add('yellowBg', 'borderBox');
            try {
                await this.transfer(dataRegister, mc8Components.RAM.getRamElementId(address_number), data_number);
            } catch (e) {
                ramEle_htmlElement.classList.remove('yellowBg', 'borderBox');
                throw e;
            }
        }
        //Neither ROM or RAM
        else {
            //wont be executed completely, because the decoder will interrupt execution 
            await this.transfer(addressRegister, 'ROM1', address_number);
        }
        mc8Components.RAM.updateElement(address_number, data_number);
        try {
            await addYellowBackgroundTo(getHtmlElement(mc8Components.RAM.getRamElementId(address_number)));
        } finally {
            getHtmlElement(mc8Components.RAM.getRamElementId(address_number)).classList.remove('borderBox', 'yellowBg');
            mc8Components.DECODER.resetDOM();
        }
    }

    async readFromIo () {
        if (mc8Components.IO1.isIoMapped) {
            mc8Components.DECODER.update(1, 0, 1, 0, mc8Components.ZR.loValue);
            await transferAnimator.transfer('ZR', 'DEC_UPDATE', mc8Components.ZR.loValue);
    
            if (mc8Components.IO1.address === mc8Components.IO2.address) {
                if (!mc8Components.IO1.isInput) {
                    await transferAnimator.transfer('A', 'IO2', mc8Components.A.value);
                    await registerAnimator.registerUpdate('IO2', mc8Components.A.value);
                } else {
                    await transferAnimator.transfer('A', 'IO1', mc8Components.A.value);
                    await registerAnimator.registerUpdate('IO1', mc8Components.A.value);
                }
            } else if (mc8Components.IO3.address === mc8Components.IO2.address) {
                if (!mc8Components.IO3.isInput) {
                    await transferAnimator.transfer('A', 'IO2', mc8Components.A.value);
                    await registerAnimator.registerUpdate('IO2', mc8Components.A.value);
                } else {
                    await transferAnimator.transfer('A', 'IO3', mc8Components.A.value);
                    await registerAnimator.registerUpdate('IO3', mc8Components.A.value);
                }
            } else if (mc8Components.IO1.address === mc8Components.IO3.address) {
                if (!mc8Components.IO1.isInput) {
                    await transferAnimator.transfer('A', 'IO3', mc8Components.A.value);
                    await registerAnimator.registerUpdate('IO3', mc8Components.A.value);
                } else {
                    await transferAnimator.transfer('A', 'IO1', mc8Components.A.value);
                    await registerAnimator.registerUpdate('IO1', mc8Components.A.value);
                }
            } else if (mc8Components.ZR.loValue === mc8Components.IO1.address) {
                await ioAnimator.animateIoUserInput('IO1');
                await transferAnimator.transfer('IO1', 'A', mc8Components.IO1.value);
                await registerAnimator.registerUpdate('A', mc8Components.IO1.value);
            } else if (mc8Components.ZR.loValue === mc8Components.IO2.address) {
                await ioAnimator.animateIoUserInput('IO2');
                await transferAnimator.transfer('IO2', 'A', mc8Components.IO2.value);
                await registerAnimator.registerUpdate('A', mc8Components.IO2.value);
            } else if (mc8Components.ZR.loValue === mc8Components.IO3.address) {
                await ioAnimator.animateIoUserInput('IO3');
                await transferAnimator.transfer('IO3', 'A', mc8Components.IO3.value);
                await registerAnimator.registerUpdate('A', mc8Components.IO3.value);
            }
            mc8Components.DECODER.resetDOM();
        } else {
            mc8Components.DECODER.update(1, 0, 1, 0, mc8Components.ZR.value);
            await transferAnimator.transfer('ZR', 'DEC_UPDATE', mc8Components.ZR.value);
    
            if (mc8Components.IO1.address === mc8Components.IO2.address) {
                if (!mc8Components.IO1.isInput) {
                    await transferAnimator.transfer('A', 'IO2', mc8Components.A.value);
                    await registerAnimator.registerUpdate('IO2', mc8Components.A.value);
                } else {
                    await transferAnimator.transfer('A', 'IO1', mc8Components.A.value);
                    await registerAnimator.registerUpdate('IO1', mc8Components.A.value);
                }
            } else if (mc8Components.IO3.address === mc8Components.IO2.address) {
                if (!mc8Components.IO3.isInput) {
                    await transferAnimator.transfer('A', 'IO2', mc8Components.A.value);
                    await registerAnimator.registerUpdate('IO2', mc8Components.A.value);
                } else {
                    await transferAnimator.transfer('A', 'IO3', mc8Components.A.value);
                    await registerAnimator.registerUpdate('IO3', mc8Components.A.value);
                }
            } else if (mc8Components.IO1.address === mc8Components.IO3.address) {
                if (!mc8Components.IO1.isInput) {
                    await transferAnimator.transfer('A', 'IO3', mc8Components.A.value);
                    await registerAnimator.registerUpdate('IO3', mc8Components.A.value);
                } else {
                    await transferAnimator.transfer('A', 'IO1', mc8Components.A.value);
                    await registerAnimator.registerUpdate('IO1', mc8Components.A.value);
                }
            } else if (mc8Components.ZR.value === mc8Components.IO1.address) {
                await ioAnimator.animateIoUserInput('IO1');
                await transferAnimator.transfer('IO1', 'A', mc8Components.IO1.value);
                await registerAnimator.registerUpdate('A', mc8Components.IO1.value);
            } else if (mc8Components.ZR.value === mc8Components.IO2.address) {
                await ioAnimator.animateIoUserInput('IO2');
                await transferAnimator.transfer('IO2', 'A', mc8Components.IO2.value);
                await registerAnimator.registerUpdate('A', mc8Components.IO2.value);
            } else if (mc8Components.ZR.value === mc8Components.IO3.address) {
                await ioAnimator.animateIoUserInput('IO3');
                await transferAnimator.transfer('IO3', 'A', mc8Components.IO3.value);
                await registerAnimator.registerUpdate('A', mc8Components.IO3.value);
            }
            mc8Components.DECODER.resetDOM();
        }
    }

    async writeToIo () {

        mc8Components.DECODER.update(0, 1, 1, 0, mc8Components.ZR.loValue);
        await transferAnimator.transfer('ZR', 'DEC_UPDATE', mc8Components.ZR.loValue);
    
        if (mc8Components.IO1.address === mc8Components.IO2.address) {
            if (mc8Components.IO1.isInput) {
                await transferAnimator.transfer('A', 'IO2', mc8Components.A.value);
                await registerAnimator.registerUpdate('IO2', mc8Components.A.value);
            } else {
                await transferAnimator.transfer('A', 'IO1', mc8Components.A.value);
                await registerAnimator.registerUpdate('IO1', mc8Components.A.value);
            }
        } else if (mc8Components.IO3.address === mc8Components.IO2.address) {
            if (mc8Components.IO3.isInput) {
                await transferAnimator.transfer('A', 'IO2', mc8Components.A.value);
                await registerAnimator.registerUpdate('IO2', mc8Components.A.value);
            } else {
                await transferAnimator.transfer('A', 'IO3', mc8Components.A.value);
                await registerAnimator.registerUpdate('IO3', mc8Components.A.value);
            }
        } else if (mc8Components.IO1.address === mc8Components.IO3.address) {
            if (mc8Components.IO1.isInput) {
                await transferAnimator.transfer('A', 'IO3', mc8Components.A.value);
                await registerAnimator.registerUpdate('IO3', mc8Components.A.value);
            } else {
                await transferAnimator.transfer('A', 'IO1', mc8Components.A.value);
                await registerAnimator.registerUpdate('IO1', mc8Components.A.value);
            }
        } else if (mc8Components.ZR.loValue === mc8Components.IO1.address) {
            await transferAnimator.transfer('A', 'IO1', mc8Components.A.value);
            await registerAnimator.registerUpdate('IO1', mc8Components.A.value);
        } else if (mc8Components.ZR.loValue === mc8Components.IO2.address) {
            await transferAnimator.transfer('A', 'IO2', mc8Components.A.value);
            await registerAnimator.registerUpdate('IO2', mc8Components.A.value);
        } else if (mc8Components.ZR.loValue === mc8Components.IO3.address) {
            await transferAnimator.transfer('A', 'IO3', mc8Components.A.value);
            await registerAnimator.registerUpdate('IO3', mc8Components.A.value);
        }
        mc8Components.DECODER.resetDOM();
    }    
}

export const transferAnimator = new TransferAnimator();