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
    describe('total customers is equal to batch size', () => {
        test('should generate one file when total customers is equal to batch size', () => {
            // Arrange
            const fileSystemWriter :FileSystemWriter ={
                writeLine: jest.fn()
            }
            const sut = new BatchCustomerCsvFileWriter(new CustomerCsvFileWriter(fileSystemWriter));
            const fileName = "customers2.csv";
            const customers: Customer[] = [
                new Customer("John", "123456789"),
                new Customer("Jane", "987654321"),
                new Customer("Jack", "456789123"),
                new Customer("Jill", "123456789"),
                new Customer("Jenny", "987654321"),
                new Customer("Jasper", "456789123"),
                new Customer("Jasmine", "123456789"),
                new Customer("Jared", "987654321"),
                new Customer("Jarod", "456789123"),
                new Customer ("Lola", "123456789"),
            ]
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

    describe('total customers is greater than batch size and less than bacthSize multipled by 2 ', () => {
        test('should generate two files when total customers is greater than batch size and less than bacthSize multipled by 2', () => {
            // Arrange
            const fileSystemWriter :FileSystemWriter ={
                writeLine: jest.fn()
            }
            const sut = new BatchCustomerCsvFileWriter(new CustomerCsvFileWriter(fileSystemWriter));
            const customers: Customer[] = [
                new Customer("John", "123456789"),
                new Customer("Jane", "987654321"),
                new Customer("Jack", "456789123"),
                new Customer("Jill", "123456789"),
                new Customer("Jenny", "987654321"),
                new Customer("Jasper", "456789123"),
                new Customer("Jasmine", "123456789"),
                new Customer("Jared", "987654321"),
                new Customer("Jarod", "456789123"),
                new Customer ("Lola", "123456789"),
                new Customer("Jleo", "123456789"),
                new Customer("Ced", "987654321"),
            ]
            const batchSize = 10;

            // Act
            sut.writeCustomersInBatches("customers.csv", customers, batchSize);

            // Assert
            expect(fileSystemWriter.writeLine).toHaveBeenCalledTimes(customers.length);
            customers.forEach((customer, index) => {
                const fileIndex = Math.floor(index / batchSize) + 1;
                const fileName = `customers${fileIndex}.csv`;
                expect(fileSystemWriter.writeLine).toHaveBeenNthCalledWith(index + 1, fileName, `${customer.name},${customer.contactNumber}`);
            });

        });
    });

        

});

