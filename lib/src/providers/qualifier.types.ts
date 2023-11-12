import { Type } from "@nestjs/common";
import _ from "lodash";

export type QualifierType = 'primary' | `qualify_${string}`

export type DependencyQualifiers = {

    [name in QualifierType]: Type
};
