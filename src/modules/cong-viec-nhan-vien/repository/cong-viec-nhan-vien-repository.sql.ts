import { InjectModel } from "@nestjs/sequelize";
import { CongViecNhanVienModel } from "../models/cong-viec-nhan-vien.models";
import { CongViecNhanVien } from "../entities/cong-viec-nhan-vien.entity";
import { CongViecNhanVienRepository } from "./cong-viec-nhan-vien-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";
import { NhanVienModel } from "../../nhan-vien/models/nhan-vien.models";
import { CongViecModel } from "../../cong-viec/models/cong-viec.models";
import { KetQuaModel } from "../../ket-qua/models/ket-qua.models";
import { PageableDto } from "@common/dto/pageable.dto";
import { SqlUtil } from "@common/utils/sql.ulti";

export class CongViecNhanVienRepositorySql extends SqlRepository<CongViecNhanVien> implements CongViecNhanVienRepository {
    constructor(
        @InjectModel(CongViecNhanVienModel)
        private readonly congViecNhanVienModel: typeof CongViecNhanVienModel,
    ) {
        super(congViecNhanVienModel);
    }

    // Override methods to include related information
    async getById(id: string, options?: any) {
        const result = await this.congViecNhanVienModel.findByPk(id, {
            ...options,
            include: [
                {
                    model: NhanVienModel,
                    as: 'nhanVien'
                },
                {
                    model: CongViecModel,
                    as: 'congViec'
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
        const result = await this.congViecNhanVienModel.findOne({
            where: conditions,
            ...options,
            include: [
                {
                    model: NhanVienModel,
                    as: 'nhanVien'
                },
                {
                    model: CongViecModel,
                    as: 'congViec'
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
        const results = await this.congViecNhanVienModel.findAll({
            where: conditions,
            ...options,
            include: [
                {
                    model: NhanVienModel,
                    as: 'nhanVien'
                },
                {
                    model: CongViecModel,
                    as: 'congViec'
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
                model: NhanVienModel,
                as: 'nhanVien'
            },
            {
                model: CongViecModel,
                as: 'congViec'
            },
            {
                model: KetQuaModel,
                as: 'ketQua'
            }
        ];
        const attributes = SqlUtil.getAttributes(query?.select, include);
        const [rows, count] = await Promise.all([
            await this.congViecNhanVienModel
                .findAll({
                    where: SqlUtil.getCondition(conditions, query?.filters),
                    include,
                    attributes,
                    offset: query?.skip,
                    limit: query?.limit,
                    order: SqlUtil.getOrder(query?.sort),
                })
                .then((list) => list.map((row) => this.transformResponse(row))),
            await this.congViecNhanVienModel.count({
                where: SqlUtil.getCondition(conditions, query?.filters),
                include: SqlUtil.getIncludeable(populate),
                transaction: query?.transaction,
                col: this.congViecNhanVienModel.primaryKeyAttribute,
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
