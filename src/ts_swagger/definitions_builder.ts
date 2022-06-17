import * as _ from 'lodash';
import {Node, SyntaxKind} from "typescript";
import {getNonPathNodes} from "./path_builder";

const removeImportNodes = (nonPathNodes) => {
    return _.filter(nonPathNodes, n => n.kind !== SyntaxKind.ImportDeclaration)
}

const buildDefinitions = (sourceCode: Node, definitionGenerator: {getTypeDefinition: any }) => {
    const nonPathNodes = getNonPathNodes(sourceCode);
    const definitionNodes = removeImportNodes(nonPathNodes);
    let definitionsMap= {};
    const formattedDefintionsList = _.forEach(definitionNodes, node => {
        let definitionsList = [];
        const nodeName = _.get(node, 'name.escapedText');
        const generatedDefinition = definitionGenerator.getTypeDefinition(nodeName);
        if(!_.isEmpty(generatedDefinition.definitions)){
            _.forEach(generatedDefinition.definitions, (schema, name) =>{
                if (!definitionsMap[name]){
                    definitionsMap[name] = schema
                }
        });
        }
        const formattedDefinition = _.omit(generatedDefinition, ['$schema', 'definitions']);
        if (!definitionsMap[nodeName]){
            definitionsMap[nodeName] = formattedDefinition
        }
    });
    return _.map(definitionsMap, (schema, name) => ({
        name,
        definition: schema
    }))
}

export {
    buildDefinitions
}
