//SOLID
// Single Responsibility Principle
// Open Closed Principle
// Liskov Substitution Principle
// Interface Segregation Principle
// Dependency Inversion Principle

import { Customer } from './customer';
import { CustomerCsvFileWriter } from './customer-csv-file-writer';
import { FileSystemWriter } from './file-writer-interface';

describe('CustomerCsvFileWriter', () => {
    describe('no customers', () => {
        test('should throw an error when no customers are provided', () => {
        // Arrange
        const fileSystemWriter = createFileSystemWriterMock();
        const sut = createCustomerCsvFileWriterMock(fileSystemWriter);
        const fileName = "customers.csv";
        // Act
        const action = () => sut.writeCustomers(fileName,[]);
        // Assert
        expect(action).toThrowError("No customer provided");
        expect(fileSystemWriter.writeLine).not.toHaveBeenCalled();
        });
    });
    describe('no file name', () => {
        test('should throw an error when no file name is provided', () => {
        // Arrange
        const customer = createCustomer('John Smith', '45345697123');
        const fileSystemWriter = createFileSystemWriterMock();
        const sut = createCustomerCsvFileWriterMock(fileSystemWriter);
        const fileName = "";
        // Act
       const action = () => sut.writeCustomers(fileName,[customer]);
        // Assert
        expect(action).toThrowError("No file name provided");

        });
    });
    describe('one customer', () => {
        test.each([
            {customer: createCustomer("Peter Wiles","12345697123")},
            {customer: createCustomer("John Smith","45345697123")}
        ])("given customer $expected", ({customer})=>{
        // Arrange
        const fileSystemWriter = createFileSystemWriterMock();
        const sut = createCustomerCsvFileWriterMock(fileSystemWriter);
        const fileName = "customers.csv";
        // Act
        sut.writeCustomers(fileName,[customer]);
        // Assert
        expect(fileSystemWriter.writeLine).toHaveBeenCalledTimes(1);
        assertCustomerWrittenToCsvFile(fileName, customer, fileSystemWriter);

        });
   });

    describe('multiple customers', () => {
        test("should write all customers", ()=>{
        // Arrange
        const customers = [ createCustomer("Peter Wiles","12345697123"), createCustomer("John Smith","45345697123"), createCustomer("Mel Donati","55566697123")];
        const fileSystemWriter = createFileSystemWriterMock();
        const sut = createCustomerCsvFileWriterMock(fileSystemWriter);
        const fileName = "custs.csv"
        // Act
        sut.writeCustomers("custs.csv",customers);
        // Assert
        expect(fileSystemWriter.writeLine).toHaveBeenCalledTimes(3);
        for (const customer of customers) {
            assertCustomerWrittenToCsvFile(fileName, customer, fileSystemWriter);
        }
       });
   });
});

function assertCustomerWrittenToCsvFile(fileName: string, customer: Customer, fileSystemWriter: FileSystemWriter) {
    expect(fileSystemWriter.writeLine).toBeCalledWith(fileName, `${customer.name},${customer.contactNumber}`);
}

function createFileSystemWriterMock() : FileSystemWriter {
   return {
         writeLine: jest.fn()
   }
}

function createCustomerCsvFileWriterMock(fileSystemWriter : FileSystemWriter) {
    return new CustomerCsvFileWriter(fileSystemWriter);
}

function createCustomer (name: string, contactNumber: string) : Customer {
    return new Customer(name, contactNumber);
}