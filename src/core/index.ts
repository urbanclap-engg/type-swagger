import * as _ from 'lodash';
import DtsGenerator from './dtsGenerator';
import { parseSchema } from './jsonSchema';
import ReferenceResolver from './referenceResolver';
import SchemaConvertor from './schemaConvertor';
import { TypeNameConvertor } from './typeNameConvertor';
import WriteProcessor, { WriteProcessorOptions } from './writeProcessor';
const ChangeCase = require('change-case');

export { DefaultTypeNameConvertor } from './typeNameConvertor';

export interface Options extends Partial<WriteProcessorOptions> {
    contents?: any[];
    inputUrls?: string[];
    typeNameConvertor?: TypeNameConvertor;
    namespaceName?: string;
    clientName?: string;
}

export interface DtsGeneratorBulkOptions {
    key: string;
    contents: any[];
}

export interface DtsGeneratorBulkOutput {
    key: string;
    filename?: string;
    fileContent?: string;
    error?: string
}

/*****
 * method to generate dts file from swagger schema
 * @param options
 */
export default async function dtsGenerator(options: Options): Promise<string> {
    const processor = new WriteProcessor(options);
    const resolver = new ReferenceResolver();
    const convertor = new SchemaConvertor(processor, options.typeNameConvertor, options.namespaceName);

    if (options.contents != null) {
        options.contents
            .map((content) => parseSchema(content))
            .forEach((schema) => resolver.registerSchema(schema));
    }
    if (options.inputUrls != null) {
        await Promise.all(options.inputUrls.map((url) => resolver.registerRemoteSchema(url)));
    }

    const generator = new DtsGenerator(resolver, convertor);
    return await generator.generate(options.clientName);
}

/********
 * accepts array of json schemas,
 * returns an array [{file_content, filename}]
 */
export async function bulkDtsGenerator(options: DtsGeneratorBulkOptions[]): Promise<DtsGeneratorBulkOutput[]> {
    let refString = "";
    let clientMapList = [];
    let output = [];
    await Promise.all(_.map(options, async (option: DtsGeneratorBulkOptions) => {
        try{
            const namespace = getNamespace(option.key);
            const content = await getClientFromSwaggerSchema(namespace, option.contents);
            refString+= getInterfaceFileReferencePath(option.key);
            clientMapList.push(generateClientAndKeyMapping(option.key, namespace));
            output.push({
                key: option.key,
                filename: `${option.key}.d.ts`,
                fileContent: wrapContentsInsideNamespace(content, namespace)
            });
        }catch (e) {
            output.push({
                key: option.key,
                error: "failed to generate schema"
            });
        }
    }));
    clientMapList.push(`\t[key:string]: any`);
    output.push({
        key: 'reference-file',
        filename: 'clients.d.ts',
        fileContent: buildReferenceFileContents(refString, clientMapList)
    });
    return output;
}

function wrapContentsInsideNamespace(content, namespace){
    content = `\n${content}`;
    content = content.replace(/(?:\n)/g, '\n\t');
    content = `declare namespace ${namespace} { ${content} \n}`;
    return content;
}

function generateClientAndKeyMapping(key, namespace) {
    return `\t"${key}": ${namespace}.${namespace}`;
}

function getInterfaceFileReferencePath(key) {
    return `/// <reference path=\"./${key}.d.ts\" />\n`;
}

function buildReferenceFileContents(refString, clientMapList) {
    return `${refString}\n type ClientMap = {\n ${clientMapList.join(',\n')}\n}`;
}

function getNamespace(key: string): string {
    return ChangeCase.pascalCase(key);
}

const getClientFromSwaggerSchema = async (namespace, schema) => {
    return await dtsGenerator({
        contents: schema,
        clientName: namespace
    });
};
