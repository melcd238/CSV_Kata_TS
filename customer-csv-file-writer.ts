import { FileSystemWriter } from "./file-writer-interface";
import { Customer } from "./customer";


export class CustomerCsvFileWriter {
   constructor(private fileSystemWriter: FileSystemWriter) { }

    writeCustomers(fileName: string, customers: Customer[]) {
        this.validateFileName(fileName);
        this.validateCustomers(customers);
        
        for (let index = 0; index < customers.length; index++) {
            const customer = customers[index];
            this.fileSystemWriter.writeLine(fileName,`${customer.name},${customer.contactNumber}`);
        }
    }

    private validateCustomers(customers: Customer[]): void {
        if (customers.length === 0) {
            throw new Error("No customer provided");
        }
    }

    private validateFileName(fileName: string):void {
        if(!fileName){
            throw new Error("No file name provided");
        }
    }
}