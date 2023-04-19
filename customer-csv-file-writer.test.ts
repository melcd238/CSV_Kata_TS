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
    describe('one customer', () => {
        test.each([
            {customer: new Customer("Peter Wiles","12345697123"), expected :"Peter Wiles,12345697123"  },
            {customer: new Customer("John Smith","45345697123"), expected :"John Smith,45345697123"}
        ])("given customer $expected", ({customer, expected})=>{
        // Arrange
        const fileSystemWriter: FileSystemWriter = {
            writeLine: jest.fn()
        }
        const sut = new CustomerCsvFileWriter(fileSystemWriter);
        // Act
        sut.writeCustomers("customers.csv",[customer]);
        // Assert
        expect(fileSystemWriter.writeLine).toHaveBeenCalledTimes(1);
        expect(fileSystemWriter.writeLine).toBeCalledWith("customers.csv", expected);

        });
   });

    describe('multiple customers', () => {
        test("given two customers", ()=>{
        // Arrange
        const customers = [ new Customer("Peter Wiles","12345697123"), new Customer("John Smith","45345697123")];
        const fileSystemWriter: FileSystemWriter = {
            writeLine: jest.fn()
        }
        const sut = new CustomerCsvFileWriter(fileSystemWriter);
        // Act
        sut.writeCustomers("custs.csv",customers);
        // Assert
        expect(fileSystemWriter.writeLine).toHaveBeenCalledTimes(2);
        expect(fileSystemWriter.writeLine).toBeCalledWith("custs.csv", "Peter Wiles,12345697123");
        expect(fileSystemWriter.writeLine).toBeCalledWith("custs.csv", "John Smith,45345697123");
       });
   });
});