import { Module } from '@nestjs/common';
import { SampleController } from './controller/sample.controller';
import { SampleService } from './service/sample.service';
import { RModule, Qualifier } from 'nestjs-dr';
import { GenericServiceModule } from '../generic-service/generic-service.module';
import { GenericServiceConsumer } from '../generic-service/generic-service.consumer';

@RModule({
	imports: [
		Qualifier(GenericServiceModule, 'qualify_numb')
	],
	controllers: [SampleController],
	providers: [SampleService],
})
export class SampleModule { }
