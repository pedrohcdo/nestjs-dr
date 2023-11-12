import { RModule } from "nestjs-dr";
import { GenericServiceConsumer } from "./generic-service.consumer";

@RModule({
    imports: [],
    providers: [GenericServiceConsumer],
})
export class GenericServiceModule { }