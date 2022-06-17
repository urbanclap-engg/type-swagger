import * as _ from 'lodash';
import {PathBody} from './path_builder';

function buildSwaggerPathsObject(paths: PathBody[]) {
  const pathsObject = {};
  _.forEach(paths, path => {
    pathsObject[path.pathString] = buildSinglePathObject(path);
  });
  return pathsObject;
}

function buildSinglePathObject(path: PathBody) {
  return {
    'post': {
      'summary': `api for ${path.pathString}`,
      'consumes': [
        'application/json'
      ],
      'parameters': [
        {
          'in': 'body',
          'name': 'body',
          'description': '',
          'required': true,
          'schema': {
            '$ref': `#/definitions/${path.inputDefinitionRef}`
          }
        }
      ],
      'responses': {
        '200': {
          'description': 'OK',
          'schema': {
            '$ref': `#/definitions/${path.outputDefinitionRef}`
          }
        }
      }
    }
  }
}

function buildSwaggerDefinitionObject(parsedDefinitions: { name: string; definition: Record<string, any> }[]) {
  const definitionsObject = {};
  _.forEach(parsedDefinitions, definition => {
    definitionsObject[definition.name] = definition.definition;
  });
  return definitionsObject;
}

export function buildSwaggerSchema(paths: PathBody[], parsedDefinitions: { name: string, definition: Record<string, any> }[], moduleProps?: { version: string, basePath: string, info: Record<string, string> }) {
  const swaggerPathsObj = buildSwaggerPathsObject(paths);
  const swaggerDefinitionObj = buildSwaggerDefinitionObject(parsedDefinitions);

  const schema = {
    'swagger': moduleProps.version,
    'basePath': moduleProps.basePath,
    'info': moduleProps.info,
    'paths': swaggerPathsObj,
    'definitions': swaggerDefinitionObj
  };
  return schema;
}

export {
    buildSwaggerPathsObject,
    buildSwaggerDefinitionObject
}
