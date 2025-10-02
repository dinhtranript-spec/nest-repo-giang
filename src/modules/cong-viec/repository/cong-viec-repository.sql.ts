import { InjectModel } from "@nestjs/sequelize";
import { CongViecModel } from "../models/cong-viec.models";
import { CongViec } from "../entities/cong-viec.entity";
import { CongViecRepository } from "./cong-viec-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";
import { NhanVienModel } from "../../nhan-vien/models/nhan-vien.models";
import { PageableDto } from "@common/dto/pageable.dto";
import { SqlUtil } from "@common/utils/sql.ulti";

export class CongViecRepositorySql extends SqlRepository<CongViec> implements CongViecRepository {
    constructor(
        @InjectModel(CongViecModel)
        private readonly congViecModel: typeof CongViecModel,
    ) {
        super(congViecModel);
    }

    // Override methods to include related information
    async getById(id: string, options?: any) {
        const result = await this.congViecModel.findByPk(id, {
            ...options
        });
        
        return result ? await this.transformResponse(result) : null;
    }

    async getOne(conditions: any, options?: any) {
        const result = await this.congViecModel.findOne({
            where: conditions,
            ...options
        });
        
        return result ? await this.transformResponse(result) : null;
    }

    async getMany(conditions: any, options?: any) {
        const results = await this.congViecModel.findAll({
            where: conditions,
            ...options
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
            ...(SqlUtil.getIncludeable(populate) || [])
        ];
        const attributes = SqlUtil.getAttributes(query?.select, include);
        const [rows, count] = await Promise.all([
            await this.congViecModel
                .findAll({
                    where: SqlUtil.getCondition(conditions, query?.filters),
                    include,
                    attributes,
                    offset: query?.skip,
                    limit: query?.limit,
                    order: SqlUtil.getOrder(query?.sort),
                })
                .then((list) => Promise.all(list.map((row) => this.transformResponse(row)))),
            await this.congViecModel.count({
                where: SqlUtil.getCondition(conditions, query?.filters),
                include: SqlUtil.getIncludeable(populate),
                transaction: query?.transaction,
                col: this.congViecModel.primaryKeyAttribute,
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
