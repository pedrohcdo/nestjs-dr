import { Inject } from "@nestjs/common"
import _ from "lodash"
import { DependencyQualifiers } from "./qualifier.types"

export const Resolve = () => Inject("DR_RESOLVER")