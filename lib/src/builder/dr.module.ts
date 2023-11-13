import { Module, DynamicModule, Type, ModuleMetadata, Provider } from "@nestjs/common";
import _ from "lodash";
import { ResolverProviderFactory } from "../providers";
import { DependencyResolverService } from "./dr-service.base";

export interface DependencyResolutionRegister extends Omit<ModuleMetadata, "providers"> {

    module?: Type<any>
    superModule?: DynamicModule
    providers?: (Provider | typeof DependencyResolverService)[]
}

@Module({})
export class DependencyResolutionWrapperModule {

    static wrap({
        module,
        controllers,
        imports,
        providers,
        exports,
        superModule
    }: DependencyResolutionRegister): DynamicModule {
        const resolvers: (typeof DependencyResolverService)[] = providers
            .filter((resolver) => typeof resolver === 'function' && (resolver as any)?.qualifiers && typeof (resolver as any).qualifiers === 'function') as (typeof DependencyResolverService)[]

        const resolverProviders = resolvers.map((resolver) => ResolverProviderFactory(resolver.name, resolver.qualifiers()))
        const qualifierDependencies: Type[] = resolvers.reduce(
            (dependencies: Type[], resolver: typeof DependencyResolverService): Type[] => {
                return [...dependencies, ...Object.values(resolver.qualifiers())]
            },
            []
        )

        const services: Type[] = [...resolvers, ...qualifierDependencies]

        // 
        superModule ||= {
            module: module || DependencyResolutionWrapperModule,
            controllers: [],
            imports: [],
            providers: [],
            exports: [],
            global: false
        }
        controllers = [...(controllers || []), ...(superModule.controllers || [])]
        imports = [...(imports || []), ...(superModule.imports || [])]
        providers = [...(providers || []), ...(superModule.providers || [])]
        exports = [...(exports || []), ...(superModule.exports || [])]

        //
        return {
            module: module || DependencyResolutionWrapperModule,
            controllers,
            imports,
            providers: [
                ...services,
                ...resolverProviders,
                ...providers
            ],
            exports: [
                ...services,
                ...exports
            ]
        }
    }
}

export function RModule(metadata: ModuleMetadata): ClassDecorator {
    const holder = DependencyResolutionWrapperModule.wrap(metadata)
    return Module({
        controllers: holder.controllers,
        imports: holder.imports,
        providers: holder.providers,
        exports: holder.exports
    })
};