import { DependencyQualifiers } from "nestjs-dr/providers";
import { DependencyResolutionHolder } from "./dr-service.holder";

export class DependencyResolutionBuilder<T> {

    constructor(private readonly qualifiers: DependencyQualifiers) { }

    build() {
        const drService = DependencyResolutionHolder(this.qualifiers)

    }
}