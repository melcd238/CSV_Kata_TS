import { FileSystemWriter } from "./file-system-interface";
import { Customer } from "./customer";


export class CustomerCsvFileWriter {
   constructor(private fileSystemWriter: FileSystemWriter) { }
}