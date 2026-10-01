const dataSource = require('../db/dataSource')
const CreditPackageEntity = require('../entities/creditPackage')

const isEmpty = (value)=>{
    return value === undefined || value === null
}

const isNotString = (value)=>{
    return typeof value !== 'string' || value.trim().length === 0
}

const isNotNumber = (value)=>{
    return typeof value !== 'number' || value < 0 || isNaN(value) || !Number.isInteger(value)
}

class CreditPackageController {

    static async getCreditPackages(req, res, next){
        const repo = dataSource.getRepository(CreditPackageEntity)
        try{
            const creditPackages = await repo.find()
            
            return res.status(200).json({ status: 'success', data: creditPackages})
        }catch(err){
            next(err)
        }
    }

    static async postCreditPackages(req, res, next){
        const repo = dataSource.getRepository(CreditPackageEntity)
        try{
            const { name, credit_amount, price } = req.body

            if( 
                isEmpty(name) || 
                isNotString(name) || 
                isEmpty(credit_amount) || 
                isNotNumber(credit_amount) || 
                isEmpty(price) || 
                isNotNumber(price)
            ){
                return res.status(400).json({ status: 'failed', message: '欄位未填寫正確'})
            }

            const existCreditPackages = await repo.findOne({ 
                where:{ name }
            })

            if(existCreditPackages){
                return res.status(400).json({ status: 'failed', message: '方案名稱已存在'})
            }

            const creditPackage = await repo.save({ name, credit_amount, price })
            
            return res.status(200).json({ status: 'success', data: creditPackage})
        }catch(err){
            next(err)
        }
    }

    static async deleteCreditPackage(req, res, next){
        const repo = dataSource.getRepository(CreditPackageEntity)
        try{
            const { id } = req.params

            if (!id) {
                return res.status(400).json({ status: 'failed', message: '缺少要移除的ID' })
            }

            // 直接刪除，delete 接受 id 或條件物件
            const result = await repo.delete(id)

            // affected === 0 代表資料庫裡根本沒有這筆 ID
            if (result.affected === 0) {
                return res.status(404).json({ status: 'failed', message: '找不到該筆方案資料' })
            }

            return res.status(200).json({ status: 'success', data: null })
        }catch(err){
            next(err)
        }
    }
}

module.exports = CreditPackageController 
