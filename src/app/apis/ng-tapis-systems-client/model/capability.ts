/**
 * Tapis Systems API
 * The Tapis Systems API provides for management of Tapis Systems including access and transfer methods, permissions and credentials.
 *
 * The version of the OpenAPI document: 0.1
 * Contact: cicsupport@tacc.utexas.edu
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface Capability { 
    category?: Capability.CategoryEnum;
    name?: string;
    value?: string;
}
export namespace Capability {
    export type CategoryEnum = 'SCHEDULER' | 'OS' | 'HARDWARE' | 'SOFTWARE' | 'JOB' | 'CONTAINER' | 'MISC' | 'CUSTOM';
    export const CategoryEnum = {
        SCHEDULER: 'SCHEDULER' as CategoryEnum,
        OS: 'OS' as CategoryEnum,
        HARDWARE: 'HARDWARE' as CategoryEnum,
        SOFTWARE: 'SOFTWARE' as CategoryEnum,
        JOB: 'JOB' as CategoryEnum,
        CONTAINER: 'CONTAINER' as CategoryEnum,
        MISC: 'MISC' as CategoryEnum,
        CUSTOM: 'CUSTOM' as CategoryEnum
    };
}

