import { Injectable } from "@nestjs/common"

@Injectable()
export class SampleQualifierService implements GenericService {

    execute(): string {
        return "Sample"
    }
}