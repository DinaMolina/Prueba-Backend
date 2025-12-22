import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post('posts/:postId/')
  create(@Param('postId', ParseMongoIdPipe) postId: string, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(postId, createCommentDto);
  }

  @Get('posts/:postId/')
  findByPost(@Param('postId', ParseMongoIdPipe) postId: string) {
    return this.commentsService.findByPost(postId);
  }

  @Patch(':id')
  update(@Param('id', ParseMongoIdPipe) id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.commentsService.remove(id);
  }
}
