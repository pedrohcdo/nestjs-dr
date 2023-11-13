import { InternalServerErrorException } from "@nestjs/common";
import { DependencyQualifiers } from "../providers";

export class DependencyQualifier {

    static qualifiers(): DependencyQualifiers {
        throw new InternalServerErrorException("Could not capture qualifiers, need to overwrite static function 'qualifiers()'")
    }
}
