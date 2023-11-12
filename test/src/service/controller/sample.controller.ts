import { Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { SampleService } from '../service/sample.service'

@Controller('sample')
@UsePipes(new ValidationPipe({ transform: true }))
export class SampleController {

	constructor(private readonly sampleService: SampleService) { }

	@Post('sample')
	sample() {
		return this.sampleService.sample()
	}
}
