import { Customer } from "./customer";
import { ICustomerCsvFileWriter } from "./customerCsvFileWriter-interface";

export class BatchCustomerCsvFileWriter {
    constructor(private customerCsvFileWriter: ICustomerCsvFileWriter) {}

    writeCustomersInBatches(fileName: string, customers: Customer[], batchSize: number) {
       const uniqueCustomers = this.removeDuplicateCustomers(customers);
       const numberOfBatches = Math.ceil(uniqueCustomers.length / batchSize);
      


        for (let batchIndex = 0; batchIndex < numberOfBatches; batchIndex++) {
            const startIndex = batchIndex * batchSize;
            const endIndex = startIndex + batchSize;
            const currentBacth = uniqueCustomers.slice(startIndex, endIndex);
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

    private removeDuplicateCustomers(customers: Customer[]): Customer[] {
        return customers.filter((customer, index, self) => {
            return self.findIndex(c => c.name === customer.name) === index;
        });
    }

};