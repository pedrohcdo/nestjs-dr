import { Injectable } from "@nestjs/common"

@Injectable()
export class NumbQualifierService implements GenericService {

    execute(): string {
        return "Numb"
    }
}