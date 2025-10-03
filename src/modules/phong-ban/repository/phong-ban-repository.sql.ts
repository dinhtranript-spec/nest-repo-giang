import { InjectModel } from "@nestjs/sequelize";
import { PhongBanModel } from "../models/phong-ban.models";
import { PhongBan } from "../entities/phong-ban.entity";
import { PhongBanRepository } from "./phong-ban-repository.interface";
import { SqlRepository } from "@module/repository/sequelize/sql.repository";
import { NhanVienModel } from "../../nhan-vien/models/nhan-vien.models";
import { PageableDto } from "@common/dto/pageable.dto";
import { SqlUtil } from "@common/utils/sql.ulti";

export class PhongBanRepositorySql extends SqlRepository<PhongBan> implements PhongBanRepository {
    constructor(
        @InjectModel(PhongBanModel)
        private readonly phongBanModel: typeof PhongBanModel,
    ) {
        super(phongBanModel);
    }

    // Override methods to include related information
    async getById(id: string, options?: any) {
        const result = await this.phongBanModel.findByPk(id, {
            ...options
        });
        
        return result ? await this.transformResponse(result) : null;
    }

    async getOne(conditions: any, options?: any) {
        const result = await this.phongBanModel.findOne({
            where: conditions,
            ...options
        });
        
        return result ? await this.transformResponse(result) : null;
    }

    async getMany(conditions: any, options?: any) {
        const results = await this.phongBanModel.findAll({
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
            await this.phongBanModel
                .findAll({
                    where: SqlUtil.getCondition(conditions, query?.filters),
                    include,
                    attributes,
                    offset: query?.skip,
                    limit: query?.limit,
                    order: SqlUtil.getOrder(query?.sort),
                })
                .then((list) => Promise.all(list.map((row) => this.transformResponse(row)))),
            await this.phongBanModel.count({
                where: SqlUtil.getCondition(conditions, query?.filters),
                include: SqlUtil.getIncludeable(populate),
                transaction: query?.transaction,
                col: this.phongBanModel.primaryKeyAttribute,
                distinct: true,
            }),
        ]);
        
        return PageableDto.create(query, count, rows);
    }
    
    // Helper method to transform the response
    private async transformResponse(model: any) {
        const plainObject = model.get({ plain: true });
        
        // Transform danhSachNhanVien from array of IDs to array of objects with employee details
        if (plainObject.danhSachNhanVien && Array.isArray(plainObject.danhSachNhanVien) && plainObject.danhSachNhanVien.length > 0) {
            try {
                const nhanVienDetails = await NhanVienModel.findAll({
                    where: {
                        _id: plainObject.danhSachNhanVien
                    }
                });
                
                // Create a map for quick lookup
                const nhanVienMap = new Map();
                nhanVienDetails.forEach(nv => {
                    const nvData = nv.get({ plain: true });
                    nhanVienMap.set(nvData._id, nvData);
                });
                
                // Transform the array
                plainObject.danhSachNhanVien = plainObject.danhSachNhanVien.map((maNhanVien: string) => {
                    return nhanVienMap.get(maNhanVien) || maNhanVien;
                });
            } catch (error) {
                console.error('Error transforming danhSachNhanVien:', error);
                // If there's an error, keep the original array
            }
        }
        
        return plainObject;
    }
}
