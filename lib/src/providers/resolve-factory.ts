import { Provider } from '@nestjs/common'
import { QualifierType } from './qualifier.types'

export const QualifierProviderFactory = (
    serviceResolverToken: string,
    qualifier: QualifierType
): Provider => {

    return {
        provide: `DR_QUALIFIER_${serviceResolverToken}`,
        useValue: qualifier
    }
}
