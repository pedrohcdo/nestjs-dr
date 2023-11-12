import { Injectable } from "@nestjs/common"
import { GenericServiceConsumer } from "test/src/generic-service/generic-service.consumer";

@Injectable()
export class SampleService {

    constructor(
        private readonly genericServiceConsumer: GenericServiceConsumer
    ) { }

    sample() {
        return this.genericServiceConsumer.execute()
    }
}