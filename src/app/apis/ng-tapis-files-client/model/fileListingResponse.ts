/**
 * Tapis Files API
 * My API
 *
 * The version of the OpenAPI document: 0.0
 * Contact: cicsupport@tacc.utexas.edu
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { FileInfo } from './fileInfo';


export interface FileListingResponse { 
    status?: string;
    message?: string;
    result?: Array<FileInfo>;
    version?: string;
}
