import { Inject } from "@nestjs/common"
import _ from "lodash"
import { DependencyQualifiers } from "./qualifier.types"

export const Resolve = (qualifiers: DependencyQualifiers): PropertyDecorator & ParameterDecorator => {

    //
    return (target: object, key: string | symbol | undefined, index?: number) => {
        console.log(">>>")
        console.log(target)
        console.log(key)
        console.log(index)
    };
}