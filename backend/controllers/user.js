const dataSource = require('../db/dataSource')
const { isEmpty, isNotString } = require('../utils/validate')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET || 'secret'
const jwtExpiresIn = process.env.JWT_EXPIRES_DAY || '30d'

class UserController {
    static async postUserSignup (req, res, next){
        const repo = dataSource.getRepository('User')
        try{
            const {name, email, password} = req.body
            
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if( 
                isEmpty(name) || isNotString(name) || 
                isEmpty(email) || isNotString(email) || !emailRegex.test(email) ||
                isEmpty(password) || isNotString(password) || !passwordRegex.test(password)
            ){
                return res.status(400).json({ status: 'failed', message: '欄位未填寫正確'})
            }

            const isExist = await repo.exists({
                where: { email}
            })

            if(isExist){
                return res.status(400).json({ status: 'failed', message: '信箱已存在'})
            }

            const passwordHash = await bcrypt.hash(password, 10)
            await repo.save({ name, email, password: passwordHash })
            return res.status(201).json({ status: 'success', message: '創建成功'})

        }catch(err){
            next(err)
        }
    }

    static async postUserLogin (req, res, next){
        const repo = dataSource.getRepository('User')
        try{
            const {email, password} = req.body

            const user = await repo.findOne({
                where: { email}
            })
            
            if(!user){
                return res.status(400).json({ status: 'failed', message: '信箱或密碼錯誤'})
            }

            const isPasswordValid = await bcrypt.compare(password, user.password)

            if(!isPasswordValid){
                return res.status(400).json({ status: 'failed', message: '信箱或密碼錯誤'})
            }
            const expiresIn = parseInt(jwtExpiresIn) * 24 * 60 * 60
            const jwtPayload ={
                id: user.id,
                role: user.role,
                exp: expiresIn
            }

            const token = jwt.sign(jwtPayload, jwtSecret, { expiresIn });
            
            return res.status(201).json({ 
                status: 'success', 
                data: {
                    token,
                    user: {
                        name: user.name,
                    }
                }
            })

        }catch(err){
            next(err)
        }
    }

    static async getUserProfile (req, res, next){
        const repo = dataSource.getRepository('User')
        try{
            const { id } = req.user
            const user = await repo.findOne({
                select: { name: true, email: true },
                where: { id }
            })

            if(!user){
                return res.status(401).json({ status: 'failed', message: '查無此使用者'})
            }

            return res.status(200).json({ status: 'success', data: user})
           

        }catch(err){
            next(err)
        }
    }


}

module.exports = UserController