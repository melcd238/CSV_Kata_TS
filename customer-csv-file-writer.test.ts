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
    test("given one customer that should be write to given file", ()=>{
        // Arrange
        const customer = new Customer(
            "Peter Wiles",
            "12345697123"
        )
        const fileSystemWriter: FileSystemWriter = {
            writeLine: jest.fn()
        }
        const sut = new CustomerCsvFileWriter(fileSystemWriter);
        // Act
        sut.writeCustomers("customers.csv",[customer]);
        // Assert
        expect(fileSystemWriter.writeLine).toHaveBeenCalledTimes(1);
        expect(fileSystemWriter.writeLine).toBeCalledWith("customers.csv", "Peter Wiles,12345697123");

    });
});