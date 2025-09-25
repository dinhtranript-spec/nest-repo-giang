import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { MessageService } from "../services/message.services";
import { CreateMessageDto } from "../dto/create-message.dto";
import { UpdateMessageDto } from "../dto/update-message.dto";
import { QueryMessageDto } from "../dto/query-message.dto";
import { Message } from "../entities/message.entity";
import { Controller, Put, Param, Query, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from "@nestjs/swagger";
import { ConditionMessageDto } from "../dto/condition-message.dto";

@Controller("message")
@ApiTags("Message")
export class MessageController extends BaseControllerFactory<Message>(
    Message,
    ConditionMessageDto,
    CreateMessageDto,
    UpdateMessageDto
) {
    constructor(private readonly messageService: MessageService) {
        super(messageService);
    }

    @Put("read/all")
    @ApiOperation({ summary: "Đánh dấu tất cả tin nhắn đã đọc" })
    async readAll() {
        try {
            // Lấy tất cả tin nhắn
            const messages = await this.messageService.getMany(
                { _id: { $exists: true } } as any,
                {}
            );
            
            // Cập nhật trạng thái từng tin nhắn
            for (const message of messages) {
                await this.messageService.updateById(
                    { _id: message._id } as any,
                    message._id,
                    { status: "READ", updateAt: new Date().toISOString() } as any
                );
            }
            
            return { statusCode: 204, message: "Đánh dấu đã đọc thành công" };
        } catch (error) {
            return { statusCode: 500, message: "Lỗi server", error: error.message };
        }
    }

    @Put("read/multiple")
    @ApiOperation({ summary: "Đánh dấu nhiều tin nhắn đã đọc" })
    @ApiQuery({ name: "ids", description: "Danh sách ID tin nhắn", type: [String] })
    async readMultiple(@Query("ids") ids: string[]) {
        try {
            for (const id of ids) {
                await this.messageService.updateById(
                    { _id: id } as any,
                    id,
                    { status: "READ", updateAt: new Date().toISOString() } as any
                );
            }
            return { statusCode: 204, message: "Đánh dấu đã đọc thành công" };
        } catch (error) {
            return { statusCode: 500, message: "Lỗi server", error: error.message };
        }
    }

    @Put("read/:id")
    @ApiOperation({ summary: "Đánh dấu tin nhắn đã đọc theo ID" })
    @ApiParam({ name: "id", description: "ID tin nhắn" })
    async read(@Param("id") id: string) {
        try {
            const message = await this.messageService.getById({ _id: id } as any, id);
            if (!message) {
                return { statusCode: 404, message: "Không tìm thấy tin nhắn" };
            }
            
            const updatedMessage = await this.messageService.updateById(
                { _id: id } as any,
                id,
                { status: "READ", updateAt: new Date().toISOString() } as any
            );
            
            return { statusCode: 200, data: updatedMessage };
        } catch (error) {
            return { statusCode: 500, message: "Lỗi server", error: error.message };
        }
    }

    @Put("forward/all")
    @ApiOperation({ summary: "Chuyển tiếp tất cả tin nhắn" })
    async forwardAll() {
        try {
            // Lấy tất cả tin nhắn
            const messages = await this.messageService.getMany(
                { _id: { $exists: true } } as any,
                {}
            );
            
            // Cập nhật trạng thái từng tin nhắn
            for (const message of messages) {
                await this.messageService.updateById(
                    { _id: message._id } as any,
                    message._id,
                    { status: "FORWARDED", updateAt: new Date().toISOString() } as any
                );
            }
            
            return { statusCode: 204, message: "Chuyển tiếp thành công" };
        } catch (error) {
            return { statusCode: 500, message: "Lỗi server", error: error.message };
        }
    }

    @Put("forward/multiple")
    @ApiOperation({ summary: "Chuyển tiếp nhiều tin nhắn" })
    @ApiQuery({ name: "ids", description: "Danh sách ID tin nhắn", type: [String] })
    async forwardMultiple(@Query("ids") ids: string[]) {
        try {
            for (const id of ids) {
                await this.messageService.updateById(
                    { _id: id } as any,
                    id,
                    { status: "FORWARDED", updateAt: new Date().toISOString() } as any
                );
            }
            return { statusCode: 204, message: "Chuyển tiếp thành công" };
        } catch (error) {
            return { statusCode: 500, message: "Lỗi server", error: error.message };
        }
    }

    @Put("forward/:id")
    @ApiOperation({ summary: "Chuyển tiếp tin nhắn theo ID" })
    @ApiParam({ name: "id", description: "ID tin nhắn" })
    async forward(@Param("id") id: string) {
        try {
            const message = await this.messageService.getById({ _id: id } as any, id);
            if (!message) {
                return { statusCode: 404, message: "Không tìm thấy tin nhắn" };
            }
            
            const updatedMessage = await this.messageService.updateById(
                { _id: id } as any,
                id,
                { status: "FORWARDED", updateAt: new Date().toISOString() } as any
            );
            
            return { statusCode: 200, data: updatedMessage };
        } catch (error) {
            return { statusCode: 500, message: "Lỗi server", error: error.message };
        }
    }
}