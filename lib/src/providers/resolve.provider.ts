import { InternalServerErrorException, Provider, Type, Inject } from "@nestjs/common"
import _ from "lodash"
import { DependencyQualifiers, QualifierType } from "./qualifier.types"


export const ResolverProviderFactory = (
    serviceResolverToken: string,
    qualifiers: DependencyQualifiers
): Provider => {
    if (!qualifiers['primary'])
        throw new InternalServerErrorException('It was not possible to register the dependencies in the DependencyResolutionModule, it is necessary to have a primary service.')

    // To maintain the order
    const dependenciesRelation: string[] = []
    const dependencies: Type[] = []
    for (let qualifier in qualifiers) {
        dependenciesRelation.push(qualifier)
        dependencies.push(qualifiers[qualifier])
    }

    return {
        provide: `DR_RESOLVER`,
        useFactory: (qualifier: QualifierType, ...dependencies: any[]) => {
            if (_.isNil(qualifier))
                return dependencies[dependenciesRelation.findIndex((dq) => dq === 'primary')]
            return dependencies[dependenciesRelation.findIndex((dq) => dq === qualifier)]
        },
        inject: [
            {
                token: `DR_QUALIFIER_${serviceResolverToken}`,
                optional: true
            },
            ...dependencies
        ]
    }
}

