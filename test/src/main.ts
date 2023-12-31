import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		bufferLogs: true
	})
	const configService = app.get(ConfigService)
	const port = configService.get('PORT')

	//
	const options = new DocumentBuilder()
		.setTitle('TagMe Seed')
		.setDescription('Seed of TagMe Applications')
		.setVersion('0.0.1') // This should be fetched from package.json
		.build()

	const document = SwaggerModule.createDocument(app, options)
	SwaggerModule.setup('api', app, document)
	await app.listen(port)
}

bootstrap()
