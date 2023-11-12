import { Type } from "@nestjs/common";
import { DependencyResolutionQualifierModule } from "./resolution.module";
import { QualifierType } from "../providers/qualifier.types";

export const Primary = (serviceResolverToken: Type) => DependencyResolutionQualifierModule.qualifier(serviceResolverToken, 'primary')
export const Qualifier = (serviceResolverToken: Type, qualifier: QualifierType) => DependencyResolutionQualifierModule.qualifier(serviceResolverToken, qualifier)