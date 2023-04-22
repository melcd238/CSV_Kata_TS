import { Customer } from "./customer";
import { ICustomerCsvFileWriter } from "./customerCsvFileWriter-interface";

export class BatchCustomerCsvFileWriter {
    constructor(private customerCsvFileWriter: ICustomerCsvFileWriter) {}

    writeCustomersInBatches(fileName: string, customers: Customer[], batchSize: number) {
       const numberOfBatches = Math.ceil(customers.length / batchSize);

        for (let batchIndex = 0; batchIndex < numberOfBatches; batchIndex++) {
            const startIndex = batchIndex * batchSize;
            const endIndex = startIndex + batchSize;
            const currentBacth = customers.slice(startIndex, endIndex);
            const currentFileName =  this.generateFileName(fileName, batchIndex, numberOfBatches);
            this.customerCsvFileWriter.writeCustomers(currentFileName, currentBacth);
        }

    }
    private generateFileName(fileName: string, batchIndex: number, totalBatches: number): string {
        const fileBaseName = fileName.split('.').shift();
        if (totalBatches === 1 && batchIndex === 0) {
            return `${fileBaseName}.csv`;
        }
        return `${fileBaseName}${batchIndex + 1}.csv`;
    }
};