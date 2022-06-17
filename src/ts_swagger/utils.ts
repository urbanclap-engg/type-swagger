import {Node} from "typescript";
import * as _ from 'lodash';

const isNodeDecoratedWith = (node: Node, decoratorName: string): boolean => {
    const decorators = _.get(node, 'decorators');
    if (_.isEmpty(decorators)) {
        return false;
    }
    const filteredNode = _.find(decorators, o => _.get(o, 'expression.expression.escapedText') === decoratorName);
    return !!filteredNode;
}

export {
    isNodeDecoratedWith
}
