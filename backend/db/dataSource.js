const { DataSource } = require('typeorm')
const dotenv = require('dotenv')

dotenv.config()

const SkillEntity = require('../entities/skill')
const CreditPackageEntity = require('../entities/creditPackage')
const UserEntity = require('../entities/user')

const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    username: process.env.DB_USERNAME || 'student',
    password: process.env.DB_PASSWORD || 'student666',
    database: process.env.DB_DATABASE || 'fitness',

    // ⚠️ 鐵律：synchronize 固定為 false，將 ORM 自動同步結構關閉，避免它動到正式資料；結構一律走 Migration
    synchronize: false,

    entities: [
        SkillEntity,
        CreditPackageEntity,
        UserEntity
    ],
    migrations: ['db/migrations/*.js'],
})

module.exports = dataSource