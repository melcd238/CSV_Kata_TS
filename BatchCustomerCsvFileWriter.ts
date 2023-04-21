import { Customer } from "./customer";
import { CustomerCsvFileWriter } from "./customer-csv-file-writer";

export class BatchCustomerCsvFileWriter {
    constructor(private customerCsvFileWriter: CustomerCsvFileWriter) {}

    writeCustomersInBatches(fileName: string, customers: Customer[], batchSize: number) {
        
    }
};