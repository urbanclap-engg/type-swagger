import {buildSwaggerSchemaFromFilePath} from './schema_builder';
import * as fs from 'fs';
// const fs = require('fs');

export function generateSwaggerSchema(inputFilePath: string, outputFilePath: string) {
    const schema = buildSwaggerSchemaFromFilePath(inputFilePath);
    fs.writeFileSync(outputFilePath, JSON.stringify(schema));
};

