import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>
  ) { }
  create(postId: string, createCommentDto: CreateCommentDto) {
    const objectId = new Types.ObjectId(postId);
    const newComment = new this.commentModel({
      ...createCommentDto,
      postId: objectId,
    });
    return newComment.save();
  }

  async findByPost(postId: string) {
    const objectId = new Types.ObjectId(postId);
    const comments = await this.commentModel.find({postId: objectId}).exec();
    if (!comments) {
      throw new NotFoundException(`El comentario no fue encontrado`);
    }
    return comments
  }


  update(id: string, updateCommentDto: UpdateCommentDto) {
    const objectId = new Types.ObjectId(id);
    return this.commentModel.findByIdAndUpdate(objectId, updateCommentDto, { new: true });
  }

  async remove(id: string) {
    const { deletedCount } = await this.commentModel.deleteOne({ _id: id }).exec()
    if (!deletedCount) {
      throw new NotFoundException(`El comentario no fue encontrado`);
    }
    return { deleted: true }
  }
}
