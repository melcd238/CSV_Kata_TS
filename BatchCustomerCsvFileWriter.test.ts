import { Customer } from "./customer";
import { FileSystemWriter } from "./file-writer-interface";
import { CustomerCsvFileWriter } from "./customer-csv-file-writer";
import { BatchCustomerCsvFileWriter } from "./BatchCustomerCsvFileWriter";


describe("BatchCustomerCsvFileWriter", () => {
    describe('total customers less than batch size', () => {
        test('should generate one file when total customers less than batch size', () => {
            // Arrange
            const fileSystemWriter :FileSystemWriter ={
                writeLine: jest.fn()
            }
            const sut = new BatchCustomerCsvFileWriter(new CustomerCsvFileWriter(fileSystemWriter));
            const fileName = "customers1.csv";
            const customers: Customer[] = [new Customer("John", "123456789"), new Customer("Jane", "987654321"), new Customer("Jack", "456789123")];
            const batchSize = 10;

            // Act
            sut.writeCustomersInBatches(fileName, customers, batchSize);

            // Assert
            expect(fileSystemWriter.writeLine).toHaveBeenCalledTimes(customers.length);
            customers.forEach((customer, index) => {
                expect(fileSystemWriter.writeLine).toHaveBeenNthCalledWith(index + 1, fileName, `${customer.name},${customer.contactNumber}`);
            });
        });
    });
    
});

