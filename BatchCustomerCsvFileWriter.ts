import { Customer } from "./customer";
import { CustomerCsvFileWriter } from "./customer-csv-file-writer";

export class BatchCustomerCsvFileWriter {
    constructor(private customerCsvFileWriter: CustomerCsvFileWriter) {}

    writeCustomersInBatches(fileName: string, customers: Customer[], batchSize: number) {
        batchSize= 10;
        
        if (customers.length < batchSize) {
           this.customerCsvFileWriter.writeCustomers(fileName, customers);
        }
    }
};