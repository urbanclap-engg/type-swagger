import {buildSwaggerSchemaFromFilePath, getPathsAndDefinitions} from './schema_builder';
import {map} from 'lodash';
import {buildSwaggerPathsObject, buildSwaggerDefinitionObject} from "./swagger_helper";

const fs = require('fs');
const {argv} = require('yargs');

function runner() {
    const inputFilePath = argv.src;
    const outputFilePath = argv.dest;
    const onlyModify = argv.onlyModify;

    if (onlyModify) {
        const jsonSchema = fs.readFileSync(outputFilePath);
        let content = JSON.parse(jsonSchema);
        const {paths, parsedDefinitions} = getPathsAndDefinitions(inputFilePath);
        const newDefinitions = buildSwaggerDefinitionObject(parsedDefinitions);
        const newPaths = buildSwaggerPathsObject(paths);
        content.paths = {
            ...content.paths,
            ...newPaths
        };
        content.definitions = {
            ...content.definitions,
            ...newDefinitions
        };
        fs.writeFileSync(outputFilePath, JSON.stringify(content, null, 2));
    } else {
        const schema = buildSwaggerSchemaFromFilePath(inputFilePath);
        fs.writeFileSync(outputFilePath, JSON.stringify(schema, null, 2));
    }
}

runner();
