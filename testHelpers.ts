import { Customer } from "./customer";
import { FileSystemWriter } from "./file-writer-interface";
import { CustomerCsvFileWriter } from "./customer-csv-file-writer";
import { ICustomerCsvFileWriter } from "./customerCsvFileWriter-interface";


export function assertCustomerWrittenToCsvFile(fileName: string, customer: Customer, fileSystemWriter: FileSystemWriter) {
    expect(fileSystemWriter.writeLine).toBeCalledWith(fileName, `${customer.name},${customer.contactNumber}`);
}

export function createFileSystemWriterMock() : FileSystemWriter {
   return {
         writeLine: jest.fn()
   }
}

export function createCustomerCsvFileWriterMock(fileSystemWriter : FileSystemWriter) {
    return new CustomerCsvFileWriter(fileSystemWriter);
}

export function createCustomer (name: string, contactNumber: string) : Customer {
    return new Customer(name, contactNumber);
}

export function assertBatchCustomerCsvFileWriter( fileSystemWriter: FileSystemWriter, index:number, fileName: string, customer: Customer) {
    expect(fileSystemWriter.writeLine).toHaveBeenNthCalledWith(index + 1, fileName, `${customer.name},${customer.contactNumber}`);

}


export function createICustomerCsvFileWriterMock(): ICustomerCsvFileWriter {
    return {
        writeCustomers: jest.fn()
    };
}