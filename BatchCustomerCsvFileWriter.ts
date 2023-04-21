import { Customer } from "./customer";
import { CustomerCsvFileWriter } from "./customer-csv-file-writer";

export class BatchCustomerCsvFileWriter {
    constructor(private customerCsvFileWriter: CustomerCsvFileWriter) {}

    writeCustomersInBatches(fileName: string, customers: Customer[], batchSize: number) {
        batchSize= 10;

        if (customers.length <= batchSize) {
           this.customerCsvFileWriter.writeCustomers(fileName, customers);
        }
        // si le customers.length est plus grand que le batchSize mais inferieur a 2 fois le batchSize on doit créer 2 fichiers un fichier avec 10 customers et un fichier les customers restants
        else if (customers.length > batchSize && customers.length < batchSize * 2) {
            const firstBatch = customers.slice(0, batchSize);
            const secondBatch = customers.slice(batchSize);
            this.customerCsvFileWriter.writeCustomers("customers1.csv", firstBatch);
            this.customerCsvFileWriter.writeCustomers("customers2.csv", secondBatch);
        }
        // si le customers.length est plus grand que le batchSize mais inferieur a 3 fois le batchSize on doit créer 3 fichiers un fichier avec 10 customers, un fichier avec 10 customers et un fichier les customers restants
        else if (customers.length > batchSize && customers.length < batchSize * 3) {
            const firstBatch = customers.slice(0, batchSize);
            const secondBatch = customers.slice(batchSize, batchSize * 2);
            const thirdBatch = customers.slice(batchSize * 2);
            this.customerCsvFileWriter.writeCustomers("customers1.csv", firstBatch);
            this.customerCsvFileWriter.writeCustomers("customers2.csv", secondBatch);
            this.customerCsvFileWriter.writeCustomers("customers3.csv", thirdBatch);
        }

    }
};