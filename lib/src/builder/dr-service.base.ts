import { DependencyQualifiers } from "../providers";
import { InternalServerErrorException } from '@nestjs/common'

// Can't use abstract class :(
export class DependencyResolverService<T> {

    constructor(...args: any[]) { }

    static qualifiers(): DependencyQualifiers {
        throw new InternalServerErrorException('not impl. yet')
    }

    qualified(): T {
        throw new InternalServerErrorException('not impl. yet')
    }
}