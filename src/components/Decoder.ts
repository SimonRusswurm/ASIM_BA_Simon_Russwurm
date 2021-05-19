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
    private display: HTMLElement;
    private displayedNotification: string;
    private error: boolean;
    isRamAccess: boolean;
    isIoAccess: boolean;

    RAM: Ram;
    IO1: IO;
    IO2: IO;
    IO3: IO;
    
    constructor(ram: Ram, io1: IO, io2: IO, io3: IO) {
        this.write = getHtmlElement('wrValue_p');
        this.read = getHtmlElement('rdValue_p');
        this.memoryRequired = getHtmlElement('mValue_p');
        this.ioRequest = getHtmlElement('ioValue_p');
        this.WR = 1;
        this.RD = 1;
        this.M = 1;
        this.IO = 1;
        this.display = getHtmlElement('decDisplay_p');
        this.displayedNotification = '';
        this.error = false;
        this.isRamAccess = false;
        this.isIoAccess = false;

        this.RAM = ram;
        this.IO1 = io1;
        this.IO2 = io2;
        this.IO3 = io3;
    }

    update(wr: number, rd: number, m: number, io: number, address: number): void {
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

    readFromMemory(address: number){
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

    writeToMemory(address: number){
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

    readFromIo(address: number){
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

    writeToIo(address: number){
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

    updateDOM(): void {
        this.write.textContent = String(this.WR);
        this.read.textContent = String(this.RD);
        this.memoryRequired.textContent = String(this.M);
        this.ioRequest.textContent = String(this.IO);
        this.display.textContent = this.displayedNotification;
        if (this.isRamAccess || this.isIoAccess)
            this.display.classList.add('yellowBg');
        if (this.error) {
            this.display.classList.add('redBg');
            throw Error('Decoder error');
        }
    }

    resetDOM(): void {
        this.write.textContent = '';
        this.read.textContent = '';
        this.memoryRequired.textContent = '';
        this.ioRequest.textContent = '';
        this.display.textContent = '';
        this.displayedNotification = '';
        this.error = false;
        this.isRamAccess = false;
        this.isIoAccess = false;

        this.display.classList.remove('yellowBg');
        this.display.classList.remove('redBg');
    }
}