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
    test("?", ()=>{
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
        sut.writeCustomers("",[customer]);
        // Assert
        expect(fileSystemWriter.writeLine).toHaveBeenCalledTimes(1);
        expect(fileSystemWriter.writeLine).toBeCalledWith("", "Peter Wiles,12345697123");

    });
});