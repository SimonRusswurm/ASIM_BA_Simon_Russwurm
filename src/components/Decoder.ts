import { getHtmlElement } from "../utils";
import { Ram } from "./RAM";
import { IO } from "./RegisterClasses"

export class Decoder {
    private write: HTMLElement;
    private read: HTMLElement;
    private memoryRequired: HTMLElement;
    private ioRequest: HTMLElement;
    private WR: number;
    private RD: number;
    private M: number;
    private IO: number;
    private displayPanel: HTMLElement;
    private displayedNotification: string;
    private error: boolean;
    public isRamAccess: boolean;
    public isIoAccess: boolean;

    private RAM: Ram;
    private IO1: IO;
    private IO2: IO;
    private IO3: IO;
    
    constructor(ram: Ram, io1: IO, io2: IO, io3: IO) {
        this.write = getHtmlElement('wrValue_p');
        this.read = getHtmlElement('rdValue_p');
        this.memoryRequired = getHtmlElement('mValue_p');
        this.ioRequest = getHtmlElement('ioValue_p');
        this.WR = 1;
        this.RD = 1;
        this.M = 1;
        this.IO = 1;
        this.displayPanel = getHtmlElement('decDisplay_p');
        this.displayedNotification = '';
        this.error = false;
        this.isRamAccess = false;
        this.isIoAccess = false;

        this.RAM = ram;
        this.IO1 = io1;
        this.IO2 = io2;
        this.IO3 = io3;
    }

    public update(wr: number, rd: number, m: number, io: number, address: number): void {
        this.WR = wr;
        this.RD = rd;
        this.M = m;
        this.IO = io;

        if (rd === 0 && m === 0) {
            this.readFromMemory(address);
        }
        else if (wr === 0 && m === 0) {
            this.writeToMemory(address);
        }
        else if (rd === 0 && io === 0) {
            this.readFromIo(address);
        }
        else if (wr === 0 && io === 0) {
            this.writeToIo(address);
        }
    }

    private readFromMemory(address: number): void{
        this.isIoAccess = false;
        this.isRamAccess = false;

        if (address < 8192) {
            this.displayedNotification = 'Lese von ROM';
        } else if (address >= this.RAM.startAddress && address < this.RAM.startAddress + this.RAM.size) {
            this.isRamAccess = true;
            this.displayedNotification = 'Lese von RAM';
        } else if (address === this.IO1.address) {
            this.isIoAccess = true;
            if (this.IO1.isInput) {
                this.displayedNotification = 'Lese von IN1';
            } else {
                this.displayedNotification = 'Lese von OUT1';
                this.error = true;
            }
        } else if (address === this.IO2.address) {
            this.isIoAccess = true;
            if (this.IO2.isInput)
                this.displayedNotification = 'Lese von IN2';
            else {
                this.displayedNotification = 'Lese von OUT2';
                this.error = true;
            }
        } else if (address === this.IO3.address) {
            this.isIoAccess = true;
            if (this.IO3.isInput)
                this.displayedNotification = 'Lese von IN3';
            else {
                this.displayedNotification = 'Lese von OUT3';
                this.error = true;
            }
        } else {
            this.displayedNotification = 'Lese von ???';
            this.error = true;
        }

    }

    private writeToMemory(address: number): void{
        this.isIoAccess = false;
        this.isRamAccess = false;

        if (address < 8192) {
            this.displayedNotification = 'Schreibe auf ROM';
            this.error = true;
        } else if (address >= this.RAM.startAddress && address < this.RAM.startAddress + this.RAM.size) {
            this.isRamAccess = true;
            this.displayedNotification = 'Schreibe auf RAM';
        } else if (address === this.IO1.address) {
            this.isIoAccess = true;
            if (!this.IO1.isInput) {
                this.displayedNotification = 'Schreibe auf OUT1';
            } else {
                this.displayedNotification = 'Schreibe auf IN1';
                this.error = true;
            }
        } else if (address === this.IO2.address) {
            this.isIoAccess = true;
            if (!this.IO2.isInput) {
                this.displayedNotification = 'Schreibe auf OUT2';
            } else {
                this.displayedNotification = 'Schreibe auf IN2';
                this.error = true;
            }
        } else if (address === this.IO3.address) {
            this.isIoAccess = true;
            if (!this.IO3.isInput) {
                this.displayedNotification = 'Schreibe auf OUT3';
            } else {
                this.displayedNotification = 'Schreibe auf IN3';
                this.error = true;
            }
        } else {
            this.displayedNotification = 'Schreibe auf ???';
            this.error = true;
        }
    }

    private readFromIo(address: number): void{
        this.isIoAccess = true;
        this.isRamAccess = false;

        if (this.IO1.address === this.IO2.address && this.IO1.address === address) {
            if (this.IO1.isInput) {
                this.displayedNotification = 'Lese von IN1';
            } else {
                this.displayedNotification = 'Lese von IN2';
            }
        } else if (this.IO1.address === this.IO3.address && this.IO1.address === address) {
            if (this.IO1.isInput) {
                this.displayedNotification = 'Lese von IN1';
            } else {
                this.displayedNotification = 'Lese von IN3';
            }
        } else if (this.IO2.address === this.IO3.address && this.IO2.address === address) {
            if (this.IO2.isInput) {
                this.displayedNotification = 'Lese von IN2';
            } else {
                this.displayedNotification = 'Lese von IN3';
            }
        } else if (address === this.IO1.address) {
            if (this.IO1.isInput) {
                this.displayedNotification = 'Lese von IN1';
            } else {
                this.displayedNotification = 'Lese von OUT1';
                this.error = true;
            }
        } else if (address === this.IO2.address) {
            if (this.IO2.isInput)
                this.displayedNotification = 'Lese von IN2';
            else {
                this.displayedNotification = 'Lese von OUT2';
                this.error = true;
            }
        } else if (address === this.IO3.address) {
            if (this.IO3.isInput)
                this.displayedNotification = 'Lese von IN3';
            else {
                this.displayedNotification = 'Lese von OUT3';
                this.error = true;
            }
        } else {
            this.displayedNotification = 'Lese von ???';
            this.error = true;
        }
    }

    private writeToIo(address: number): void{
        this.isIoAccess = true;
        this.isRamAccess = false;

        if (this.IO1.address === this.IO2.address && this.IO1.address === address) {
            if (!this.IO1.isInput) {
                this.displayedNotification = 'Schreibe auf OUT1';
            } else {
                this.displayedNotification = 'Schreibe auf OUT2';
            }
        } else if (this.IO1.address === this.IO3.address && this.IO1.address === address) {
            if (!this.IO1.isInput) {
                this.displayedNotification = 'Schreibe auf OUT1';
            } else {
                this.displayedNotification = 'Schreibe auf OUT3';
            }
        } else if (this.IO2.address === this.IO3.address && this.IO2.address === address) {
            if (!this.IO2.isInput) {
                this.displayedNotification = 'Schreibe auf OUT2';
            } else {
                this.displayedNotification = 'Schreibe auf OUT3';
            }
        } else if (address === this.IO1.address) {
            if (!this.IO1.isInput) {
                this.displayedNotification = 'Schreibe auf OUT1';
            } else {
                this.displayedNotification = 'Schreibe auf IN1';
                this.error = true;
            }
        } else if (address === this.IO2.address) {
            if (!this.IO2.isInput) {
                this.displayedNotification = 'Schreibe auf OUT2';
            } else {
                this.displayedNotification = 'Schreibe auf IN2';
                this.error = true;
            }
        } else if (address === this.IO3.address) {
            if (!this.IO3.isInput) {
                this.displayedNotification = 'Schreibe auf OUT3';
            } else {
                this.displayedNotification = 'Schreibe auf IN3';
                this.error = true;
            }
        } else {
            this.displayedNotification = 'Schreibe auf ???';
            this.error = true;
        }
    }

    public updateDOM(): void {
        this.write.textContent = this.WR.toString();
        this.read.textContent = this.RD.toString();
        this.memoryRequired.textContent = this.M.toString();
        this.ioRequest.textContent = this.IO.toString();
        this.displayPanel.textContent = this.displayedNotification;
        if (this.isRamAccess || this.isIoAccess)
            this.displayPanel.classList.add('yellowBg');
        if (this.error) {
            this.displayPanel.classList.add('redBg');
            throw Error('Decoder error');
        }
    }

    public resetDOM(): void {
        this.write.textContent = '';
        this.read.textContent = '';
        this.memoryRequired.textContent = '';
        this.ioRequest.textContent = '';
        this.displayPanel.textContent = '';
        this.displayedNotification = '';
        this.error = false;
        this.isRamAccess = false;
        this.isIoAccess = false;

        this.displayPanel.classList.remove('yellowBg');
        this.displayPanel.classList.remove('redBg');
    }
}