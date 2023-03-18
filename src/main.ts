import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.setGlobalPrefix('/api');
    await app.listen(PORT, () => console.log(`Server started... \nPort: ${PORT}`));
}
start();
