import { InjectModel } from "@nestjs/sequelize";
import { CongDoanNhanVienModel } from "../models/cong-doan-nhan-vien.models";
import { CongDoanNhanVien } from "../entities/cong-doan-nhan-vien.entity";
import { CongDoanNhanVienRepository } from "./cong-doan-nhan-vien-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";
import { DuAnModel } from "../../du-an/models/du-an.models";
import { CongDoanModel } from "../../cong-doan/models/cong-doan.models";
import { NhanVienModel } from "../../nhan-vien/models/nhan-vien.models";
import { KetQuaModel } from "../../ket-qua/models/ket-qua.models";
import { PageableDto } from "@common/dto/pageable.dto";
import { SqlUtil } from "@common/utils/sql.ulti";

export class CongDoanNhanVienRepositorySql extends SqlRepository<CongDoanNhanVien> implements CongDoanNhanVienRepository {
    constructor(
        @InjectModel(CongDoanNhanVienModel)
        private readonly congDoanNhanVienModel: typeof CongDoanNhanVienModel,
    ) {
        super(congDoanNhanVienModel);
    }

    // Override methods to include related information
    async getById(id: string, options?: any) {
        const result = await this.congDoanNhanVienModel.findByPk(id, {
            ...options,
            include: [
                {
                    model: DuAnModel,
                    as: 'duAn'
                },
                {
                    model: CongDoanModel,
                    as: 'congDoan'
                },
                {
                    model: NhanVienModel,
                    as: 'nhanVien'
                },
                {
                    model: KetQuaModel,
                    as: 'ketQua'
                }
            ]
        });
        
        return result ? this.transformResponse(result) : null;
    }

    async getOne(conditions: any, options?: any) {
        const result = await this.congDoanNhanVienModel.findOne({
            where: conditions,
            ...options,
            include: [
                {
                    model: DuAnModel,
                    as: 'duAn'
                },
                {
                    model: CongDoanModel,
                    as: 'congDoan'
                },
                {
                    model: NhanVienModel,
                    as: 'nhanVien'
                },
                {
                    model: KetQuaModel,
                    as: 'ketQua'
                }
            ]
        });
        
        return result ? this.transformResponse(result) : null;
    }

    async getMany(conditions: any, options?: any) {
        const results = await this.congDoanNhanVienModel.findAll({
            where: conditions,
            ...options,
            include: [
                {
                    model: DuAnModel,
                    as: 'duAn'
                },
                {
                    model: CongDoanModel,
                    as: 'congDoan'
                },
                {
                    model: NhanVienModel,
                    as: 'nhanVien'
                },
                {
                    model: KetQuaModel,
                    as: 'ketQua'
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
                model: DuAnModel,
                as: 'duAn'
            },
            {
                model: CongDoanModel,
                as: 'congDoan'
            },
            {
                model: NhanVienModel,
                as: 'nhanVien'
            },
            {
                model: KetQuaModel,
                as: 'ketQua'
            }
        ];
        const attributes = SqlUtil.getAttributes(query?.select, include);
        const [rows, count] = await Promise.all([
            await this.congDoanNhanVienModel
                .findAll({
                    where: SqlUtil.getCondition(conditions, query?.filters),
                    include,
                    attributes,
                    offset: query?.skip,
                    limit: query?.limit,
                    order: SqlUtil.getOrder(query?.sort),
                })
                .then((list) => list.map((row) => this.transformResponse(row))),
            await this.congDoanNhanVienModel.count({
                where: SqlUtil.getCondition(conditions, query?.filters),
                include: SqlUtil.getIncludeable(populate),
                transaction: query?.transaction,
                col: this.congDoanNhanVienModel.primaryKeyAttribute,
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
