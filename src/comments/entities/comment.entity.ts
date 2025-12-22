import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Post } from "src/posts/entities/post.entity";
@Schema()
export class Comment extends Document {
    @Prop({ type: Types.ObjectId, ref: 'Post', required: true })
    postId: Types.ObjectId;
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    email: string;
    @Prop({ required: true })
    body: string;
    @Prop({ default: Date.now })
    createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment)