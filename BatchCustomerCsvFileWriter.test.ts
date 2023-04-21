import { Customer } from "./customer";
import { BatchCustomerCsvFileWriter } from "./BatchCustomerCsvFileWriter";
import {assertBatchCustomerCsvFileWriter, createFileSystemWriterMock, createCustomerCsvFileWriterMock, createCustomer } from "./testHelpers";


describe("BatchCustomerCsvFileWriter", () => {
    describe('total customers less than batch size', () => {
        test('should generate one file when total customers less than batch size', () => {
            // Arrange
            const fileSystemWriter = createFileSystemWriterMock();
            const sut = new BatchCustomerCsvFileWriter(createCustomerCsvFileWriterMock(fileSystemWriter));
            const fileName = "customers1.csv";
            const customers: Customer[] = [createCustomer("John", "123456789"),createCustomer("Jane", "987654321"), createCustomer("Jack", "456789123")];
            
            const batchSize = 10;

            // Act
            sut.writeCustomersInBatches(fileName, customers, batchSize);

            // Assert
            expect(fileSystemWriter.writeLine).toHaveBeenCalledTimes(customers.length);
            customers.forEach((customer, index) => {
                assertBatchCustomerCsvFileWriter(fileSystemWriter, index, fileName, customer);
            });
        });
    });
    describe('total customers is equal to batch size', () => {
        test('should generate one file when total customers is equal to batch size', () => {
            // Arrange
            const fileSystemWriter = createFileSystemWriterMock();
            const sut = new BatchCustomerCsvFileWriter(createCustomerCsvFileWriterMock(fileSystemWriter));
            const fileName = "cust1.csv";
            const customers: Customer[] = [
                createCustomer("John", "123456789"),
                createCustomer("Jane", "987654321"),
                createCustomer("Jack", "456789123"),
                createCustomer("Jill", "123456789"),
                createCustomer("Jenny", "987654321"),
                createCustomer("Jasper", "456789123"),
                createCustomer("Jasmine", "123456789"),
                createCustomer("Jared", "987654321"),
                createCustomer("Jarod", "456789123"),
                createCustomer("Lola", "123456789"),
            ]
            const batchSize = 10;

            // Act
            sut.writeCustomersInBatches(fileName, customers, batchSize);

            // Assert
            expect(fileSystemWriter.writeLine).toHaveBeenCalledTimes(customers.length);
            customers.forEach((customer, index) => {
                assertBatchCustomerCsvFileWriter(fileSystemWriter, index, fileName, customer);
            });
        });
    });

    describe('total customers is greater than batch size and less than bacthSize multipled by 2 ', () => {
        test('should generate two files when total customers is greater than batch size and less than bacthSize multipled by 2', () => {
            // Arrange
            const fileSystemWriter = createFileSystemWriterMock();
            const sut = new BatchCustomerCsvFileWriter(createCustomerCsvFileWriterMock(fileSystemWriter));
            const customers: Customer[] = [
                createCustomer("John", "123456789"),
                createCustomer("Jane", "987654321"),
                createCustomer("Jack", "456789123"),
                createCustomer("Jill", "123456789"),
                createCustomer("Jenny", "987654321"),
                createCustomer("Jasper", "456789123"),
                createCustomer("Jasmine", "123456789"),
                createCustomer("Jared", "987654321"),
                createCustomer("Jarod", "456789123"),
                createCustomer("Lola", "123456789"),
                createCustomer("Jleo", "123456789"),
                createCustomer("Ced", "987654321"),
            ]
            const batchSize = 10;

            // Act
            sut.writeCustomersInBatches("customers.csv", customers, batchSize);

            // Assert
            expect(fileSystemWriter.writeLine).toHaveBeenCalledTimes(customers.length);
            customers.forEach((customer, index) => {
                const fileName = createFileName(index, batchSize);
               assertBatchCustomerCsvFileWriter(fileSystemWriter, index, fileName, customer);
            });

        });
    });

    describe('total customers is greater than batch size and greater than bacthSize multipled by 2 and less than batchSize multiplied by 3 ', () => {
        test('should generate three files when total customers is greater than batch size and greater than bacthSize multipled by 2 and less than batchSize multiplied by 3 ', () => {
            // Arrange
            const fileSystemWriter = createFileSystemWriterMock();
            const sut = new BatchCustomerCsvFileWriter(createCustomerCsvFileWriterMock(fileSystemWriter));
            const customers: Customer[] = [
                createCustomer("John", "123456789"),
                createCustomer("Jane", "987654321"),
                createCustomer("Jack", "456789123"),
                createCustomer("Jill", "123456789"),
                createCustomer("Jenny", "987654321"),
                createCustomer("Jasper", "456789123"),
                createCustomer("Jasmine", "123456789"),
                createCustomer("Jared", "987654321"),
                createCustomer("Jarod", "456789123"),
                createCustomer("Lola", "123456789"),
                createCustomer("Jleo", "123456789"),
                createCustomer("Ced", "987654321"),
                createCustomer("John", "123456789"),
                createCustomer("Jane", "987654321"),
                createCustomer("Jack", "456789123"),
                createCustomer("Jill", "123456789"),
                createCustomer("Jenny", "987654321"),
                createCustomer("Jasper", "456789123"),
                createCustomer("Jasmine", "123456789"),
                createCustomer("Jared", "987654321"),
                createCustomer("Jarod", "456789123"),
                createCustomer("Lola", "123456789"),
                createCustomer("Jleo", "123456789"),
                createCustomer("Ced", "987654321"),
            ]
            const batchSize = 10;

            // Act
            sut.writeCustomersInBatches("customers.csv", customers, batchSize);

            // Assert
            expect(fileSystemWriter.writeLine).toHaveBeenCalledTimes(customers.length);
            customers.forEach((customer, index) => {
               const fileName = createFileName(index, batchSize);
               assertBatchCustomerCsvFileWriter(fileSystemWriter, index, fileName, customer);
            });

        });
    
    });


        

});


function createFileName(index: number, bacthSize: number): string {
    const fileName = `customers${Math.floor(index / bacthSize) + 1}.csv`;
    return fileName;
}
