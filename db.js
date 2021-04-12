const { Sequelize } = require('sequelize');

function db() {
    var self = this;

    this.initDb = async function () {
        const sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: './myurl_db.sqlite'
        });
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
            createTinyUrlTable(sequelize);
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    this.saveDb = function (data) {

    }

    this.getList = function () {
        return this.table.findAll({
            order: [
                // Will escape title and validate DESC against a list of valid direction parameters
                ['updatedAt', 'DESC'],
            ]
        });
    }

    this.deleteByTinyCode = function () {

    }
    // 创建表
    function createTinyUrlTable(sequelize) {
        let tinyUrl = sequelize.define('tinyurl', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            tinyCode: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            tinyUrl: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            originalUrl: {
                type: Sequelize.STRING,
                allowNull: false,
            }
        }, {// 告诉 sequelize 不需要自动将表名变成复数
            freezeTableName: true,
            // 自定义表名
            // tableName: 'student',
            // 需要自动创建 createAt / updateAt 这两个字段
            timestamps: true,
            // 指定索引
            indexes: [
                {
                    // 索引名称
                    name: 'idx_code',
                    // 索引字段名称
                    fields: ['tinycode'],
                }
            ]
        });
        tinyUrl.sync({ force: false }).then(function () {
            console.log("已创建数据表")
            self.table = tinyUrl;
        });
    }

    // 初始化数据库
    this.initDb();
}
var dbObj = null
if (!dbObj) dbObj = new db();
module.exports = dbObj