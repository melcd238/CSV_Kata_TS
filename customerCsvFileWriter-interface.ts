import { Customer } from './customer';

export interface ICustomerCsvFileWriter {
    writeCustomers(fileName: string, customers: Customer[]): void;
}