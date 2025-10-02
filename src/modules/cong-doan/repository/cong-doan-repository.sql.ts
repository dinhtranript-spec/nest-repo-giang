import { InjectModel } from "@nestjs/sequelize";
import { CongDoanModel } from "../models/cong-doan.models";
import { CongDoan } from "../entities/cong-doan.entity";
import { CongDoanRepository } from "./cong-doan-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";
import { DuAnModel } from "../../du-an/models/du-an.models";
import { KetQuaModel } from "../../ket-qua/models/ket-qua.models";
import { NhanVienModel } from "../../nhan-vien/models/nhan-vien.models";
import { PageableDto } from "@common/dto/pageable.dto";
import { SqlUtil } from "@common/utils/sql.ulti";

export class CongDoanRepositorySql extends SqlRepository<CongDoan> implements CongDoanRepository {
    constructor(
        @InjectModel(CongDoanModel)
        private readonly congDoanModel: typeof CongDoanModel,
    ) {
        super(congDoanModel);
    }

    // Override methods to include related information
    async getById(id: string, options?: any) {
        const result = await this.congDoanModel.findByPk(id, {
            ...options,
            include: [
                {
                    model: DuAnModel,
                    as: 'duAn'
                },
                {
                    model: KetQuaModel,
                    as: 'ketQua'
                }
            ]
        });
        
        return result ? await this.transformResponse(result) : null;
    }

    async getOne(conditions: any, options?: any) {
        const result = await this.congDoanModel.findOne({
            where: conditions,
            ...options,
            include: [
                {
                    model: DuAnModel,
                    as: 'duAn'
                },
                {
                    model: KetQuaModel,
                    as: 'ketQua'
                }
            ]
        });
        
        return result ? await this.transformResponse(result) : null;
    }

    async getMany(conditions: any, options?: any) {
        const results = await this.congDoanModel.findAll({
            where: conditions,
            ...options,
            include: [
                {
                    model: DuAnModel,
                    as: 'duAn'
                },
                {
                    model: KetQuaModel,
                    as: 'ketQua'
                }
            ]
        });
        
        return Promise.all(results.map(result => this.transformResponse(result)));
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
                model: KetQuaModel,
                as: 'ketQua'
            }
        ];
        const attributes = SqlUtil.getAttributes(query?.select, include);
        const [rows, count] = await Promise.all([
            await this.congDoanModel
                .findAll({
                    where: SqlUtil.getCondition(conditions, query?.filters),
                    include,
                    attributes,
                    offset: query?.skip,
                    limit: query?.limit,
                    order: SqlUtil.getOrder(query?.sort),
                })
                .then((list) => Promise.all(list.map((row) => this.transformResponse(row)))),
            await this.congDoanModel.count({
                where: SqlUtil.getCondition(conditions, query?.filters),
                include: SqlUtil.getIncludeable(populate),
                transaction: query?.transaction,
                col: this.congDoanModel.primaryKeyAttribute,
                distinct: true,
            }),
        ]);
        
        return PageableDto.create(query, count, rows);
    }
    
    // Helper method to transform the response
    private async transformResponse(model: any) {
        const plainObject = model.get({ plain: true });
        
        // Transform danhSachNhanVien from array of IDs to array of objects with employee details
        if (plainObject.danhSachNhanVien && Array.isArray(plainObject.danhSachNhanVien)) {
            const nhanVienDetails = await NhanVienModel.findAll({
                where: {
                    _id: plainObject.danhSachNhanVien
                }
            });
            
            // Create a map for quick lookup
            const nhanVienMap = new Map();
            nhanVienDetails.forEach(nv => {
                nhanVienMap.set(nv._id, nv.get({ plain: true }));
            });
            
            // Transform the array
            plainObject.danhSachNhanVien = plainObject.danhSachNhanVien.map((maNhanVien: string) => {
                return nhanVienMap.get(maNhanVien) || maNhanVien;
            });
        }
        
        return plainObject;
    }
}
