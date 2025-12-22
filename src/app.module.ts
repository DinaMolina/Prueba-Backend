import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';

@Module({
  imports: [PostsModule, CommentsModule, 
    MongooseModule.forRoot('mongodb+srv://user:1234@cluster0.yijiegz.mongodb.net/red_social'), CommonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
