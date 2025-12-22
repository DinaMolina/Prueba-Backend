import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Model, Types } from 'mongoose';
import { Post } from './entities/post.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<Post>
  ) {

  }
  async create(createPostDto: CreatePostDto) {
    const post = await this.postModel.create(createPostDto)
    return post;
  }
  async createMany(createPostDto: CreatePostDto[]) {
    const posts = await this.postModel.insertMany(createPostDto)
    return posts;
  }

  findAll() {
    return this.postModel.find().exec()
  }

  async findOne(id: string) {
    const objectId = new Types.ObjectId(id);
    const post = await this.postModel.findById(objectId).exec()
    if (!post) {
      throw new NotFoundException(`La publicación no fue encontrada`);
    }
    return post


  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const objectId = new Types.ObjectId(id);
    const updatePost = await this.postModel.findByIdAndUpdate(objectId, updatePostDto, { new: true })
    if (!updatePost) {
      throw new NotFoundException(`La publicación no fue encontrada`);
    }
    return updatePost

  }

  async remove(id: string) {
    
    const {deletedCount} = await this.postModel.deleteOne({_id: id}).exec()
    if (!deletedCount) {
      throw new NotFoundException(`La publicación no fue encontrada`);
    }
    return { deleted: true }
  }


}
