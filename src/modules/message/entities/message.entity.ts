import { StrObjectId  } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { Entity } from "@module/repository";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsString, IsArray, IsOptional } from "class-validator";
import { HydratedDocument, Types } from "mongoose";

export type MessageDocument = HydratedDocument<Message>;

// Interface cho Organization để type safety
interface Organization {
    _id: string;
    name: string;
    // Thêm các trường khác nếu cần
}

@Schema({ collection: "_message", timestamps: true })
export class Message implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @EntityDefinition.field({ label: "title", required: true })
    @Prop({ name: "_title", type: String, required: true })
    title: string; 

    @IsString()
    @EntityDefinition.field({ label: "description", required: true })
    @Prop({ name: "_description", type: String, required: true })
    description: string; 

    @IsString()
    @IsOptional()
    @Prop({ name: "_content", type: String })
    content?: string; 

    @IsString()
    @IsOptional()
    @Prop({ name: "_status", type: String })
    status?: string; 

    @IsArray()
    @IsOptional()
    @Prop({ name: "_filePaths", type: [String] })
    filePaths?: string[];

    @Prop({ name: "_fromId", type: String, ref: 'Organization' })
    fromId: string;

    @Prop({ name: "_toId", type: String, ref: 'Organization' })
    toId: string;

    // Virtual populate fields - không cần @Prop decorator
    from?: Organization;
    to?: Organization;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

// Thêm virtual populate
MessageSchema.virtual('from', {
    ref: 'Organization',
    localField: '_fromId',
    foreignField: '_id',
    justOne: true
});

MessageSchema.virtual('to', {
    ref: 'Organization',
    localField: '_toId',
    foreignField: '_id',
    justOne: true
});

// Đảm bảo virtual fields được serialize
MessageSchema.set('toJSON', { virtuals: true });
MessageSchema.set('toObject', { virtuals: true }); 