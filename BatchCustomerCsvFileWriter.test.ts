import { Customer } from "./customer";
import { FileSystemWriter } from "./file-writer-interface";
import { CustomerCsvFileWriter } from "./customer-csv-file-writer";
import { BatchCustomerCsvFileWriter } from "./BatchCustomerCsvFileWriter";


describe("BatchCustomerCsvFileWriter", () => {
    describe("no customer provided", () => {
        test('shoudl not generate any file when no customer provided', () => {
            // Arrange
            const fileSystemWriter :FileSystemWriter ={
                writeLine: jest.fn()
            }
            const sut = new BatchCustomerCsvFileWriter(new CustomerCsvFileWriter(fileSystemWriter));
            const fileName = "customers.csv";
            const customers: Customer[] = [];
            const batchSize = 10;

            // Act
            sut.writeCustomersInBatches(fileName, customers, batchSize);

            // Assert
            expect(fileSystemWriter.writeLine).not.toHaveBeenCalled();
            
        });
    });    
});

