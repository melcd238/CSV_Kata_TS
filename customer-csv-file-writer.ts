import { FileSystemWriter } from "./file-writer-interface";
import { Customer } from "./customer";


export class CustomerCsvFileWriter {
   constructor(private fileSystemWriter: FileSystemWriter) { }

    writeCustomers(fileName: string, customers: Customer[]) {
        if (customers.length === 0) {
            throw new Error("No customer provided");
        }
        if(!fileName){
            throw new Error("No file name provided");
        }
        for (let index = 0; index < customers.length; index++) {
            const customer = customers[index];
            this.fileSystemWriter.writeLine(fileName,`${customer.name},${customer.contactNumber}`);
        }
    }
}