import { FileSystemWriter } from "./file-writer-interface";
import { Customer } from "./customer";


export class CustomerCsvFileWriter {
   constructor(private fileSystemWriter: FileSystemWriter) { }

    writeCustomers(fileName: string, customers: Customer[]) {
        this.fileSystemWriter.writeLine(fileName,`${customers[0].name},${customers[0].contactNumber}`);
    }
}