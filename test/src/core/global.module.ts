import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import environment from '../config/environment.config';

import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { environmentSchema } from '../config/environment.schema';


//
const { NODE_ENV } = process.env;
const prod = !NODE_ENV || NODE_ENV === 'production';

@Global()
@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: !prod ? `./environment/${process.env.NODE_ENV}.env` : '',
			isGlobal: false,
			load: [environment],
			validationSchema: environmentSchema,
		})
	],

	providers: [],

	exports: [ConfigModule],
})
export class GlobalModule { }
