import { InjectModel } from "@nestjs/sequelize";
import { PhongBanNhanVienModel } from "../models/phong-ban-nhan-vien.models";
import { PhongBanNhanVien } from "../entities/phong-ban-nhan-vien.entity";
import { PhongBanNhanVienRepository } from "./phong-ban-nhan-vien-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";
import { PhongBanModel } from "../../phong-ban/models/phong-ban.models";
import { NhanVienModel } from "../../nhan-vien/models/nhan-vien.models";
import { ViTriModel } from "../../vi-tri/models/vi-tri.models";
import { PageableDto } from "@common/dto/pageable.dto";
import { SqlUtil } from "@common/utils/sql.ulti";

export class PhongBanNhanVienRepositorySql extends SqlRepository<PhongBanNhanVien> implements PhongBanNhanVienRepository {
    constructor(
        @InjectModel(PhongBanNhanVienModel)
        private readonly phongBanNhanVienModel: typeof PhongBanNhanVienModel,
    ) {
        super(phongBanNhanVienModel);
    }

    // Override methods to include related information
    async getById(id: string, options?: any) {
        const result = await this.phongBanNhanVienModel.findByPk(id, {
            ...options,
            include: [
                {
                    model: PhongBanModel,
                    as: 'phongBan'
                },
                {
                    model: NhanVienModel,
                    as: 'nhanVien'
                },
                {
                    model: ViTriModel,
                    as: 'viTri'
                }
            ]
        });
        
        return result ? this.transformResponse(result) : null;
    }

    async getOne(conditions: any, options?: any) {
        const result = await this.phongBanNhanVienModel.findOne({
            where: conditions,
            ...options,
            include: [
                {
                    model: PhongBanModel,
                    as: 'phongBan'
                },
                {
                    model: NhanVienModel,
                    as: 'nhanVien'
                },
                {
                    model: ViTriModel,
                    as: 'viTri'
                }
            ]
        });
        
        return result ? this.transformResponse(result) : null;
    }

    async getMany(conditions: any, options?: any) {
        const results = await this.phongBanNhanVienModel.findAll({
            where: conditions,
            ...options,
            include: [
                {
                    model: PhongBanModel,
                    as: 'phongBan'
                },
                {
                    model: NhanVienModel,
                    as: 'nhanVien'
                },
                {
                    model: ViTriModel,
                    as: 'viTri'
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
                model: PhongBanModel,
                as: 'phongBan'
            },
            {
                model: NhanVienModel,
                as: 'nhanVien'
            },
            {
                model: ViTriModel,
                as: 'viTri'
            }
        ];
        const attributes = SqlUtil.getAttributes(query?.select, include);
        const [rows, count] = await Promise.all([
            await this.phongBanNhanVienModel
                .findAll({
                    where: SqlUtil.getCondition(conditions, query?.filters),
                    include,
                    attributes,
                    offset: query?.skip,
                    limit: query?.limit,
                    order: SqlUtil.getOrder(query?.sort),
                })
                .then((list) => list.map((row) => this.transformResponse(row))),
            await this.phongBanNhanVienModel.count({
                where: SqlUtil.getCondition(conditions, query?.filters),
                include: SqlUtil.getIncludeable(populate),
                transaction: query?.transaction,
                col: this.phongBanNhanVienModel.primaryKeyAttribute,
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
