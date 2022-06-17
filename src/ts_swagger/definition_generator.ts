import { resolve } from "path";
import * as _ from 'lodash';
import * as TJS from "typescript-json-schema";


const getGenerator = (filePath: string) => {
    const settings: TJS.PartialArgs = {
        required: true,
    };
    const compilerOptions: TJS.CompilerOptions = {};
    const program = TJS.getProgramFromFiles(
        [resolve(filePath)],
        compilerOptions
    );
    const generator = TJS.buildGenerator(program, settings);

    const getTypeDefinition = (typeName: string) => {
        return TJS.generateSchema(program, typeName, settings, [], generator)
    }
    return {
        getTypeDefinition
    };
}

export {
    getGenerator
}
