export class mc8_command {
    assemblerNotation_string: string;
    machineCommand_number: number;
    animationFunction_function: any;
    constructor(assemblerNotation_string: string, machineCommand_number: number, animationFunction_function: any) {
        this.assemblerNotation_string = assemblerNotation_string;
        this.machineCommand_number = machineCommand_number;
        this.animationFunction_function = animationFunction_function;
    }

    async runAnimation() {
        return this.animationFunction_function();
    }
}