const dataSource = require('../db/dataSource')
const SkillEntity = require('../entities/skill')

const isEmpty = (value)=>{
    return value === undefined || value === null
}

const isNotString = (value)=>{
    return typeof value !== 'string' || value.trim().length === 0
}

class SkillController {

    static async getSkills(req, res, next){
        const repo = dataSource.getRepository(SkillEntity)
        try{
            const skills = await repo.find({
                select: ['id', 'name'] // 依規格建議選取欄位
            })
            
            return res.status(200).json({ status: 'success', data: skills})
        }catch(err){
            next(err)
        }
    }

    static async postSkills(req, res, next){
        const repo = dataSource.getRepository(SkillEntity)
        try{
            const { name } = req.body

            if(isEmpty(name) || isNotString(name)){
                return res.status(400).json({ status: 'failed', message: '欄位未填寫正確'})
            }

            const existSkill = await repo.findOne({ 
                where:{ name }
            })

            if(existSkill){
                return res.status(400).json({ status: 'failed', message: '技能名稱已存在'})
            }

            const skill = await repo.save({ name })
            
            return res.status(200).json({ status: 'success', data: skill})
        }catch(err){
            next(err)
        }
    }

    static async deleteSkill(req, res, next){
        const repo = dataSource.getRepository(SkillEntity)
        try{
            const { id } = req.query

            if (!id) {
                return res.status(400).json({ status: 'failed', message: '缺少要移除的ID' })
            }

            // 直接刪除，delete 接受 id 或條件物件
            const result = await repo.delete(id)

            // affected === 0 代表資料庫裡根本沒有這筆 ID
            if (result.affected === 0) {
                return res.status(404).json({ status: 'failed', message: '找不到該筆技能資料' })
            }

            return res.status(200).json({ status: 'success', data: null })
        }catch(err){
            next(err)
        }
    }
}

module.exports = SkillController