import { Module, DynamicModule, Type, ModuleMetadata, Provider } from "@nestjs/common";
import _ from "lodash";
import { ResolverProviderFactory } from "./providers/resolve.provider";

export interface DependencyResolutionRegister extends Omit<ModuleMetadata, "providers"> {
    module?: Type<any>
    superModule?: DynamicModule
    providers?: (Provider | Type)[]
}

@Module({})
export class DependencyResolutionModule {

    static holder({
        module,
        controllers,
        imports,
        providers,
        exports,
        superModule
    }: DependencyResolutionRegister): DynamicModule {
        const resolvers: Type[] = providers
            .filter((resolver) => typeof resolver === 'function' && (resolver as any)?.qualifiers && typeof (resolver as any).qualifiers === 'function') as Type[]

        const resolverProviders = resolvers.map((resolver) => ResolverProviderFactory(resolver.name, { primary: null }))
        const qualifierDependencies: Type[] = resolvers.reduce(
            (dependencies: Type[], resolver: Type): Type[] => {
                return [...dependencies, ...Object.values({} as Type)]
            },
            []
        )

        const services: Type[] = [...resolvers, ...qualifierDependencies]

        // 
        superModule ||= {
            module: module || DependencyResolutionModule,
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
            module: module || DependencyResolutionModule,
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
    const holder = DependencyResolutionModule.holder(metadata)
    return Module({
        controllers: holder.controllers,
        imports: holder.imports,
        providers: holder.providers,
        exports: holder.exports
    })
};