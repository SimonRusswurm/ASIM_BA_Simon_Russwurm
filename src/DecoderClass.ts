import { Ram } from "./RamClass";
import { IO } from "./RegisterClasses"

export class Decoder {
    wr_htmlElement: HTMLElement;
    rd_htmlElement: HTMLElement;
    m_htmlElement: HTMLElement;
    io_htmlElement: HTMLElement;
    WR: number;
    RD: number;
    M: number;
    IO: number;
    display_htmlElement: HTMLElement;
    text_string: string;
    error: boolean;
    isRamAccess: boolean;
    isIoAccess: boolean;

    RAM: Ram;
    IO1: IO;
    IO2: IO;
    IO3: IO;

    constructor(wr_htmlElement: HTMLElement, rd_htmlElement: HTMLElement, m_htmlElement: HTMLElement, io_htmlElement: HTMLElement, decDisplay_htmlElement: HTMLElement, ram_class: Ram, io1_class: IO, io2_class: IO, io3_class: IO) {
        this.wr_htmlElement = wr_htmlElement;
        this.rd_htmlElement = rd_htmlElement;
        this.m_htmlElement = m_htmlElement;
        this.io_htmlElement = io_htmlElement;
        this.WR = 1;
        this.RD = 1;
        this.M = 1;
        this.IO = 1;
        this.display_htmlElement = decDisplay_htmlElement;
        this.text_string = '';
        this.error = false;
        this.isRamAccess = false;
        this.isIoAccess = false;

        this.RAM = ram_class;
        this.IO1 = io1_class;
        this.IO2 = io2_class;
        this.IO3 = io3_class;
    }

    update(wr_number: number, rd_number: number, m_number: number, io_number: number, address_number: number): void {
        this.WR = wr_number;
        this.RD = rd_number;
        this.M = m_number;
        this.IO = io_number;

        //read from memory
        if (rd_number === 0 && m_number === 0) {
            this.isIoAccess = false;
            this.isRamAccess = false;

            if (address_number < 8192) {
                this.text_string = 'Lese von ROM';
            } else if (address_number >= this.RAM.startAddressRam_number && address_number < this.RAM.startAddressRam_number + this.RAM.size_number) {
                this.isRamAccess = true;
                this.text_string = 'Lese von RAM';
            } else if (address_number === this.IO1.address_number) {
                this.isIoAccess = true;
                if (this.IO1.in_boolean) {
                    this.text_string = 'Lese von IN1';
                } else {
                    this.text_string = 'Lese von OUT1';
                    this.error = true;
                }
            } else if (address_number === this.IO2.address_number) {
                this.isIoAccess = true;
                if (this.IO2.in_boolean)
                    this.text_string = 'Lese von IN2';
                else {
                    this.text_string = 'Lese von OUT2';
                    this.error = true;
                }
            } else if (address_number === this.IO3.address_number) {
                this.isIoAccess = true;
                if (this.IO3.in_boolean)
                    this.text_string = 'Lese von IN3';
                else {
                    this.text_string = 'Lese von OUT3';
                    this.error = true;
                }
            } else {
                this.text_string = 'Lese von ???';
                this.error = true;
            }

        }
        //write to memory
        else if (wr_number === 0 && m_number === 0) {
            this.isIoAccess = false;
            this.isRamAccess = false;

            if (address_number < 8192) {
                this.text_string = 'Schreibe auf ROM';
                this.error = true;
            } else if (address_number >= this.RAM.startAddressRam_number && address_number < this.RAM.startAddressRam_number + this.RAM.size_number) {
                this.isRamAccess = true;
                this.text_string = 'Schreibe auf RAM';
            } else if (address_number === this.IO1.address_number) {
                this.isIoAccess = true;
                if (!this.IO1.in_boolean) {
                    this.text_string = 'Schreibe auf OUT1';
                } else {
                    this.text_string = 'Schreibe auf IN1';
                    this.error = true;
                }
            } else if (address_number === this.IO2.address_number) {
                this.isIoAccess = true;
                if (!this.IO2.in_boolean) {
                    this.text_string = 'Schreibe auf OUT2';
                } else {
                    this.text_string = 'Schreibe auf IN2';
                    this.error = true;
                }
            } else if (address_number === this.IO3.address_number) {
                this.isIoAccess = true;
                if (!this.IO3.in_boolean) {
                    this.text_string = 'Schreibe auf OUT3';
                } else {
                    this.text_string = 'Schreibe auf IN3';
                    this.error = true;
                }
            } else {
                this.text_string = 'Schreibe auf ???';
                this.error = true;
            }
        }
        //read IO
        else if (rd_number === 0 && io_number === 0) {
            this.isIoAccess = true;
            this.isRamAccess = false;

            if (this.IO1.address_number === this.IO2.address_number && this.IO1.address_number === address_number) {
                if (this.IO1.in_boolean) {
                    this.text_string = 'Lese von IN1';
                } else {
                    this.text_string = 'Lese von IN2';
                }
            } else if (this.IO1.address_number === this.IO3.address_number && this.IO1.address_number === address_number) {
                if (this.IO1.in_boolean) {
                    this.text_string = 'Lese von IN1';
                } else {
                    this.text_string = 'Lese von IN3';
                }
            } else if (this.IO2.address_number === this.IO3.address_number && this.IO2.address_number === address_number) {
                if (this.IO2.in_boolean) {
                    this.text_string = 'Lese von IN2';
                } else {
                    this.text_string = 'Lese von IN3';
                }
            } else if (address_number === this.IO1.address_number) {
                if (this.IO1.in_boolean) {
                    this.text_string = 'Lese von IN1';
                } else {
                    this.text_string = 'Lese von OUT1';
                    this.error = true;
                }
            } else if (address_number === this.IO2.address_number) {
                if (this.IO2.in_boolean)
                    this.text_string = 'Lese von IN2';
                else {
                    this.text_string = 'Lese von OUT2';
                    this.error = true;
                }
            } else if (address_number === this.IO3.address_number) {
                if (this.IO3.in_boolean)
                    this.text_string = 'Lese von IN3';
                else {
                    this.text_string = 'Lese von OUT3';
                    this.error = true;
                }
            } else {
                this.text_string = 'Lese von ???';
                this.error = true;
            }
        }
        //write IO
        else if (wr_number === 0 && io_number === 0) {
            this.isIoAccess = true;
            this.isRamAccess = false;

            if (this.IO1.address_number === this.IO2.address_number && this.IO1.address_number === address_number) {
                if (!this.IO1.in_boolean) {
                    this.text_string = 'Schreibe auf OUT1';
                } else {
                    this.text_string = 'Schreibe auf OUT2';
                }
            } else if (this.IO1.address_number === this.IO3.address_number && this.IO1.address_number === address_number) {
                if (!this.IO1.in_boolean) {
                    this.text_string = 'Schreibe auf OUT1';
                } else {
                    this.text_string = 'Schreibe auf OUT3';
                }
            } else if (this.IO2.address_number === this.IO3.address_number && this.IO2.address_number === address_number) {
                if (!this.IO2.in_boolean) {
                    this.text_string = 'Schreibe auf OUT2';
                } else {
                    this.text_string = 'Schreibe auf OUT3';
                }
            } else if (address_number === this.IO1.address_number) {
                if (!this.IO1.in_boolean) {
                    this.text_string = 'Schreibe auf OUT1';
                } else {
                    this.text_string = 'Schreibe auf IN1';
                    this.error = true;
                }
            } else if (address_number === this.IO2.address_number) {
                if (!this.IO2.in_boolean) {
                    this.text_string = 'Schreibe auf OUT2';
                } else {
                    this.text_string = 'Schreibe auf IN2';
                    this.error = true;
                }
            } else if (address_number === this.IO3.address_number) {
                if (!this.IO3.in_boolean) {
                    this.text_string = 'Schreibe auf OUT3';
                } else {
                    this.text_string = 'Schreibe auf IN3';
                    this.error = true;
                }
            } else {
                this.text_string = 'Schreibe auf ???';
                this.error = true;
            }
        }
    }

    updateDOM(): void {
        this.wr_htmlElement.textContent = String(this.WR);
        this.rd_htmlElement.textContent = String(this.RD);
        this.m_htmlElement.textContent = String(this.M);
        this.io_htmlElement.textContent = String(this.IO);
        this.display_htmlElement.textContent = this.text_string;
        if (this.isRamAccess || this.isIoAccess)
            this.display_htmlElement.classList.add('yellowBg');
        if (this.error) {
            this.display_htmlElement.classList.add('redBg');
            throw Error('Decoder error');
        }
    }

    resetDOM(): void {
        this.wr_htmlElement.textContent = '';
        this.rd_htmlElement.textContent = '';
        this.m_htmlElement.textContent = '';
        this.io_htmlElement.textContent = '';
        this.display_htmlElement.textContent = '';
        this.display_htmlElement.classList.remove('yellowBg');
        this.display_htmlElement.classList.remove('redBg');
    }
}