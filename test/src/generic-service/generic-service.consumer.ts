import { Injectable, Scope } from '@nestjs/common'
import { Resolve, DependencyResolver, RModule } from 'nestjs-dr';
import { SampleQualifierService } from './qualifiers/sample-qualifier.service';
import { NumbQualifierService } from './qualifiers/numb-qualifier.service';

@Injectable({
    scope: Scope.TRANSIENT
})
export class GenericServiceConsumer extends DependencyResolver {

    @Resolve({
        primary: SampleQualifierService,
        qualify_numb: NumbQualifierService
    }) private solution: GenericService

    execute(): string {
        return this.solution.execute()
    }
}

@RModule({
    imports: [],
    providers: [GenericServiceConsumer],
})
export class GenericServiceModule { }