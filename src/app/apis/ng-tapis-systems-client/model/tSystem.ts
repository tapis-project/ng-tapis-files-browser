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
import { Credential } from './credential';
import { Capability } from './capability';


export interface TSystem { 
    id?: number;
    created?: string;
    updated?: string;
    tenant?: string;
    name?: string;
    description?: string;
    systemType?: TSystem.SystemTypeEnum;
    owner?: string;
    host?: string;
    enabled?: boolean;
    effectiveUserId?: string;
    defaultAccessMethod?: TSystem.DefaultAccessMethodEnum;
    accessCredential?: Credential;
    bucketName?: string;
    rootDir?: string;
    transferMethods?: Array<TSystem.TransferMethodsEnum>;
    port?: number;
    useProxy?: boolean;
    proxyHost?: string;
    proxyPort?: number;
    jobCanExec?: boolean;
    jobLocalWorkingDir?: string;
    jobLocalArchiveDir?: string;
    jobRemoteArchiveSystem?: string;
    jobRemoteArchiveDir?: string;
    jobCapabilities?: Array<Capability>;
    tags?: Array<string>;
    notes?: object;
}
export namespace TSystem {
    export type SystemTypeEnum = 'LINUX' | 'OBJECT_STORE';
    export const SystemTypeEnum = {
        LINUX: 'LINUX' as SystemTypeEnum,
        OBJECTSTORE: 'OBJECT_STORE' as SystemTypeEnum
    };
    export type DefaultAccessMethodEnum = 'PASSWORD' | 'PKI_KEYS' | 'ACCESS_KEY' | 'CERT';
    export const DefaultAccessMethodEnum = {
        PASSWORD: 'PASSWORD' as DefaultAccessMethodEnum,
        PKIKEYS: 'PKI_KEYS' as DefaultAccessMethodEnum,
        ACCESSKEY: 'ACCESS_KEY' as DefaultAccessMethodEnum,
        CERT: 'CERT' as DefaultAccessMethodEnum
    };
    export type TransferMethodsEnum = 'SFTP' | 'S3';
    export const TransferMethodsEnum = {
        SFTP: 'SFTP' as TransferMethodsEnum,
        S3: 'S3' as TransferMethodsEnum
    };
}

