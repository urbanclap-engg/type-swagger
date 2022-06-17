import * as fs from 'fs';
import {getPaths} from './path_builder';
import {buildSwaggerSchema,} from './swagger_helper';
import {buildDefinitions} from "./definitions_builder";
import {getSwaggerProperties} from "./swagger_properties";
import {getGenerator} from "./definition_generator";

const ts = require('typescript');


export function buildSwaggerSchemaFromFilePath(filePath: string){
  const node = ts.createSourceFile(
    '',
    fs.readFileSync(filePath, 'utf8'),
    ts.ScriptTarget.Latest
  );
  const definitionGenerator = getGenerator(filePath);
  const sourceCode = node.getSourceFile();
  const paths = getPaths(sourceCode);
  const parsedDefinitions = buildDefinitions(sourceCode, definitionGenerator);
  return buildSwaggerSchema(paths, parsedDefinitions, getSwaggerProperties(sourceCode))
}

export function getPathsAndDefinitions(filePath: string) {
    const node = ts.createSourceFile(
        '',
        fs.readFileSync(filePath, 'utf8'),
        ts.ScriptTarget.Latest
    );
    const definitionGenerator = getGenerator(filePath);
    const sourceCode = node.getSourceFile();
    const paths = getPaths(sourceCode);
    const parsedDefinitions = buildDefinitions(sourceCode, definitionGenerator);

    return {
        paths,
        parsedDefinitions
    }
}
