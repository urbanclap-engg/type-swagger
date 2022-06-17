import {Node, SyntaxKind} from "typescript";
import * as _ from 'lodash';
import {isNodeDecoratedWith} from "./utils";
import {getPathsDecoratedNode} from './path_builder';

const getSwaggerProperties = (sourceCode: Node) => {
    const pathsNode = getPathsDecoratedNode(sourceCode);
    const decorators = _.get(pathsNode, 'decorators');
    if (_.isEmpty(decorators)) {
        throw Error('swagger props not defined');
    }

    const versionNode = _.find(decorators, o => _.get(o, 'expression.expression.escapedText') === 'SwaggerVersion');
    const version = _.get(versionNode, 'expression.arguments.0.text');
    const basePathNode = _.find(decorators, o => _.get(o, 'expression.expression.escapedText') === 'BasePath');
    const basePath = _.get(basePathNode, 'expression.arguments.0.text');
    const InfoNode = _.find(decorators, o => _.get(o, 'expression.expression.escapedText') === 'Info');
    const properties = _.get(InfoNode, 'expression.arguments.0');
    if (properties.kind !== SyntaxKind.ObjectLiteralExpression) {
        throw Error('swagger info props not defined');
    } else {
        const infoProps = {};
        _.forEach(properties.properties, o => {
            if (o.kind === SyntaxKind.PropertyAssignment) {
                if (o.name.text) {
                    infoProps[o.name.text] = o.initializer.text;
                }else if (o.name.escapedText){
                    infoProps[o.name.escapedText] = o.initializer.text;
                }
            }
        });
        return {
            info: infoProps,
            version,
            basePath
        }
    }
}

export {
    getSwaggerProperties
}
