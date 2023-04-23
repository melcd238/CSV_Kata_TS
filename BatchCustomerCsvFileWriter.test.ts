import { Customer } from "./customer";
import { BatchCustomerCsvFileWriter } from "./BatchCustomerCsvFileWriter";
import {assertBatchCustomerCsvFileWriter, createFileSystemWriterMock, createCustomerCsvFileWriterMock, createCustomer, generateCustomersArray} from "./testHelpers";


describe("BatchCustomerCsvFileWriter", () => {
    describe('total customers less than batch size', () => {
        test('should generate one file when total customers less than batch size', () => {
            // Arrange
            const fileSystemWriter = createFileSystemWriterMock();
            const customerCsvFileWriterMock = createCustomerCsvFileWriterMock(fileSystemWriter);
            const sut = new BatchCustomerCsvFileWriter(customerCsvFileWriterMock);
            const fileName = "customers1.csv";
            const customers: Customer[] = generateCustomersArray(5);
            
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
            const customerCsvFileWriterMock = createCustomerCsvFileWriterMock(fileSystemWriter);
            const sut = new BatchCustomerCsvFileWriter(customerCsvFileWriterMock);
            const fileName = "cust1.csv";
            const customers: Customer[] = generateCustomersArray(10);
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
            const customerCsvFileWriterMock = createCustomerCsvFileWriterMock(fileSystemWriter);
            const sut = new BatchCustomerCsvFileWriter(customerCsvFileWriterMock);
            const customers: Customer[] = generateCustomersArray(12)
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
            const customerCsvFileWriterMock = createCustomerCsvFileWriterMock(fileSystemWriter);
            const sut = new BatchCustomerCsvFileWriter(customerCsvFileWriterMock);
            const customers: Customer[] = generateCustomersArray(25);
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

    describe ('batchSize is now 15 000 and total customers is greater than 15 000 and less than 30 000', () => {
        test('should generate two files when batchSize is now 15 000 and total customers is greater than 15 000 and less than 30 000', () => {

            // Arrange
            const fileSystemWriter = createFileSystemWriterMock();
            const customerCsvFileWriterMock = createCustomerCsvFileWriterMock(fileSystemWriter);
            const sut = new BatchCustomerCsvFileWriter(customerCsvFileWriterMock);
            const customers: Customer[] = generateCustomersArray(20000);
            const batchSize = 15000;

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
    
    describe('duplicate customer', () => {
        test('should remove duplicate customer before writing to file', () => {

            // Arrange
            const fileSystemWriter = createFileSystemWriterMock();
            const customerCsvFileWriterMock = createCustomerCsvFileWriterMock(fileSystemWriter);
            const sut = new BatchCustomerCsvFileWriter(customerCsvFileWriterMock);
            const customers: Customer[] = [
                createCustomer("Customer1", "1234567891"),
                createCustomer("Customer1", "1234567891"),
                createCustomer("Customer2", "1234567892"),
                createCustomer("Customer3", "1234567893"),
                createCustomer("Customer4", "1234567894"),
            ]
            const batchSize = 10;
            const fileName = "customers.csv";
            // Act
            sut.writeCustomersInBatches(fileName, customers, batchSize);

            // Assert
            expect(fileSystemWriter.writeLine).toHaveBeenCalledTimes(4);
            const uniqueCustomers =removeDuplicateCustomers(customers);
            uniqueCustomers.forEach((customer, index) => {
            assertBatchCustomerCsvFileWriter(fileSystemWriter, index, fileName, customer);
            });
        });
    });
        

});


function createFileName(index: number, bacthSize: number): string {
    const fileName = `customers${Math.floor(index / bacthSize) + 1}.csv`;
    return fileName;
}

function removeDuplicateCustomers(customers: Customer[]): Customer[] {
    return customers.filter((customer, index, self) => {
        return self.findIndex(c => c.name === customer.name) === index;
    });
}