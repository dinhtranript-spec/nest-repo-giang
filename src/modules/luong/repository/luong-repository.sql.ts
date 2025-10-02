import { InjectModel } from "@nestjs/sequelize";
import { LuongModel } from "../models/luong.models";
import { Luong } from "../entities/luong.entity";
import { LuongRepository } from "./luong-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";
import { NhanVienModel } from "../../nhan-vien/models/nhan-vien.models";
import { BacLuongModel } from "../../bac-luong/models/bac-luong.models";
import { PageableDto } from "@common/dto/pageable.dto";
import { SqlUtil } from "@common/utils/sql.ulti";

export class LuongRepositorySql extends SqlRepository<Luong> implements LuongRepository {
    constructor(
        @InjectModel(LuongModel)
        private readonly luongModel: typeof LuongModel,
    ) {
        super(luongModel);
    }

    // Override methods to include related information
    async getById(id: string, options?: any) {
        const result = await this.luongModel.findByPk(id, {
            ...options,
            include: [
                {
                    model: NhanVienModel,
                    as: 'nhanVien'
                },
                {
                    model: BacLuongModel,
                    as: 'bacLuong'
                }
            ]
        });
        
        return result ? this.transformResponse(result) : null;
    }

    async getOne(conditions: any, options?: any) {
        const result = await this.luongModel.findOne({
            where: conditions,
            ...options,
            include: [
                {
                    model: NhanVienModel,
                    as: 'nhanVien'
                },
                {
                    model: BacLuongModel,
                    as: 'bacLuong'
                }
            ]
        });
        
        return result ? this.transformResponse(result) : null;
    }

    async getMany(conditions: any, options?: any) {
        const results = await this.luongModel.findAll({
            where: conditions,
            ...options,
            include: [
                {
                    model: NhanVienModel,
                    as: 'nhanVien'
                },
                {
                    model: BacLuongModel,
                    as: 'bacLuong'
                }
            ]
        });
        
        return results.map(result => this.transformResponse(result));
    }

    async getPage(conditions: any, query?: any) {
        // Use parent implementation but add include for related models
        conditions = conditions || {};
        const partitionCondition = this.getDataPartitionCondition(query);
        Object.assign(conditions, partitionCondition);
        const populate = query?.population;
        const include = [
            ...(SqlUtil.getIncludeable(populate) || []),
            {
                model: NhanVienModel,
                as: 'nhanVien'
            },
            {
                model: BacLuongModel,
                as: 'bacLuong'
            }
        ];
        const attributes = SqlUtil.getAttributes(query?.select, include);
        const [rows, count] = await Promise.all([
            await this.luongModel
                .findAll({
                    where: SqlUtil.getCondition(conditions, query?.filters),
                    include,
                    attributes,
                    offset: query?.skip,
                    limit: query?.limit,
                    order: SqlUtil.getOrder(query?.sort),
                })
                .then((list) => list.map((row) => this.transformResponse(row))),
            await this.luongModel.count({
                where: SqlUtil.getCondition(conditions, query?.filters),
                include: SqlUtil.getIncludeable(populate),
                transaction: query?.transaction,
                col: this.luongModel.primaryKeyAttribute,
                distinct: true,
            }),
        ]);
        
        return PageableDto.create(query, count, rows);
    }
    
    // Helper method to transform the response
    private transformResponse(model: any) {
        const plainObject = model.get({ plain: true });
        return plainObject;
    }
}
