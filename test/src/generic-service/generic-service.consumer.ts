import { Injectable, Scope } from '@nestjs/common'
import { RModule, Resolve } from 'nestjs-dr';
import { SampleQualifierService } from './qualifiers/sample-qualifier.service';
import { NumbQualifierService } from './qualifiers/numb-qualifier.service';

@Injectable({
    scope: Scope.TRANSIENT
})
export class GenericServiceConsumer {

    constructor(
        @Resolve({
            primary: SampleQualifierService,
            qualify_numb: NumbQualifierService
        }) private solution: GenericService
    ) { }

    execute(): string {
        return this.solution.execute()
    }
}