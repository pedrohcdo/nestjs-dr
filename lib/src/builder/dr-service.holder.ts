import { Injectable, Scope } from '@nestjs/common'
import { DependencyQualifiers, Resolve } from '../providers';
import { DependencyResolverService } from './dr-service.base';

export const DependencyResolutionHolder = <T>(qualifiers: DependencyQualifiers): typeof DependencyResolverService<T> => {

    @Injectable({
        scope: Scope.TRANSIENT
    })
    class DependencyResolverServiceMixin extends DependencyResolverService<T> {

        constructor(
            @Resolve() private solution: T
        ) {
            super()
        }

        static qualifiers(): DependencyQualifiers {
            return qualifiers
        }

        qualified(): T {
            return this.solution
        }
    }

    //
    return DependencyResolverServiceMixin
}