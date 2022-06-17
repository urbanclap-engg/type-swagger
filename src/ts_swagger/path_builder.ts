import {Node, SyntaxKind} from 'typescript';
import {isNodeDecoratedWith} from "./utils";
import * as _ from 'lodash';

const getPathsDecoratedNode = (sourceCode: Node) => {
    const pathsNode = _.find(_.get(sourceCode, 'statements'), o => isNodeDecoratedWith(o, 'paths'));
    if (_.isEmpty(pathsNode)){
        throw Error('paths interface not found');
    }
    return pathsNode;
}

const getNonPathNodes = (sourceCode: Node) => {
    return _.filter(_.get(sourceCode, 'statements'), o => !isNodeDecoratedWith(o, 'paths'));
}

const getPaths = (sourceCode: Node): PathBody[] => {
  const pathsNode = getPathsDecoratedNode(sourceCode);
  const paths = _.flatten(_.map(pathsNode.members, o => getPathBody(o)));
  return paths;
}

const getPathBody = (node: Node, pathPrefix: string = undefined): PathBody[] => {
  if (node.kind === SyntaxKind.PropertySignature){
    const nestedPathPrefix = pathPrefix? `${pathPrefix}/${_.get(node, 'name.escapedText')}`: _.get(node, 'name.escapedText');
    const childPaths = _.get(node, 'type.members');
    return _.flatten(_.map(childPaths, o => getPathBody(o, nestedPathPrefix)));
  } else {
    return [parseMethodSignature(node, pathPrefix)]
  }
}


const parseMethodSignature = (node: Node, pathPrefix: string = undefined): PathBody => {
  if(node.kind !== SyntaxKind.MethodSignature){
    throw Error('invalid method signature');
  }
  const name = _.get(node, 'name.escapedText');
  let responseRefName = _.get(node, 'type.typeName.escapedText');
  if (responseRefName === 'Promise'){
      responseRefName = _.get(node, 'type.typeArguments.0.typeName.escapedText');
  }
  const requestRefName = _.get(node, 'parameters.0.type.typeName.escapedText');
  return {
    pathString: pathPrefix? `/${pathPrefix}/${name}`:`/${name}`,
    inputDefinitionRef: requestRefName,
    outputDefinitionRef: responseRefName
  };
}

interface PathBody {
  pathString: string;
  inputDefinitionRef: string;
  outputDefinitionRef: string
}

export {
    getPaths,
    PathBody,
    getPathsDecoratedNode,
    getNonPathNodes
}
