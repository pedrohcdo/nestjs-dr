import { Module, DynamicModule, Type } from "@nestjs/common";
import { QualifierType } from "../providers/qualifier.types";
import { QualifierProviderFactory } from "../providers/resolve-factory";

@Module({})
export class DependencyResolutionQualifierModule {

    static qualifier(
        serviceResolverToken: Type,
        qualifier: QualifierType
    ): DynamicModule {
        const qualifierResolver = QualifierProviderFactory(serviceResolverToken.name, qualifier)
        return {
            module: DependencyResolutionQualifierModule,
            providers: [
                qualifierResolver
            ],
            exports: [
                qualifierResolver
            ],
            global: true
        }
    }
}