import { InjectModel } from "@nestjs/sequelize";
import { DuAnModel } from "../models/du-an.models";
import { DuAn } from "../entities/du-an.entity";
import { DuAnRepository } from "./du-an-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";
import { LoaiDuAnModel } from "../../loai-du-an/models/loai-du-an.models";
import { PhongBanModel } from "../../phong-ban/models/phong-ban.models";
import { PageableDto } from "@common/dto/pageable.dto";
import { SqlUtil } from "@common/utils/sql.ulti";

export class DuAnRepositorySql extends SqlRepository<DuAn> implements DuAnRepository {
    constructor(
        @InjectModel(DuAnModel)
        private readonly duAnModel: typeof DuAnModel,
    ) {
        super(duAnModel);
    }

    // Override methods to include related information
    async getById(id: string, options?: any) {
        const result = await this.duAnModel.findByPk(id, {
            ...options,
            include: [
                {
                    model: LoaiDuAnModel,
                    as: 'loaiDuAn'
                },
                {
                    model: PhongBanModel,
                    as: 'phongBan'
                }
            ]
        });
        
        return result ? this.transformResponse(result) : null;
    }

    async getOne(conditions: any, options?: any) {
        const result = await this.duAnModel.findOne({
            where: conditions,
            ...options,
            include: [
                {
                    model: LoaiDuAnModel,
                    as: 'loaiDuAn'
                },
                {
                    model: PhongBanModel,
                    as: 'phongBan'
                }
            ]
        });
        
        return result ? this.transformResponse(result) : null;
    }

    async getMany(conditions: any, options?: any) {
        const results = await this.duAnModel.findAll({
            where: conditions,
            ...options,
            include: [
                {
                    model: LoaiDuAnModel,
                    as: 'loaiDuAn'
                },
                {
                    model: PhongBanModel,
                    as: 'phongBan'
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
                model: LoaiDuAnModel,
                as: 'loaiDuAn'
            },
            {
                model: PhongBanModel,
                as: 'phongBan'
            }
        ];
        const attributes = SqlUtil.getAttributes(query?.select, include);
        const [rows, count] = await Promise.all([
            await this.duAnModel
                .findAll({
                    where: SqlUtil.getCondition(conditions, query?.filters),
                    include,
                    attributes,
                    offset: query?.skip,
                    limit: query?.limit,
                    order: SqlUtil.getOrder(query?.sort),
                })
                .then((list) => list.map((row) => this.transformResponse(row))),
            await this.duAnModel.count({
                where: SqlUtil.getCondition(conditions, query?.filters),
                include: SqlUtil.getIncludeable(populate),
                transaction: query?.transaction,
                col: this.duAnModel.primaryKeyAttribute,
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
