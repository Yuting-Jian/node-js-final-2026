const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({
    name: 'User',
    tableName: 'USER',
    columns: {
        id: {
            primary: true,
            type: 'uuid',
            generated: 'uuid'
        },
        name: {
            type: 'varchar',
            length: 50,
            nullable: false
        },
        email: {
            type: 'varchar',
            length: 100,
            nullable: false,
            unique: true
        },
        password: {
            type: 'varchar',
            length: 16,
            nullable: false,
        },
        role: {
            type: 'varchar',
            length: 10,
            nullable: false,
            default: 'USER'
        },
        createdAt: {
            type: 'timestamp',
            createDate: true,
            nullable: false
        }

    }
})