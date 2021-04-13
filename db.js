const { Sequelize } = require('sequelize');
const tinyCode = require('./tinycode');
const cfg = require('./config')

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

    this.saveDb = async function (data) {
        let arr = await this.table.findAll({
            order: [
                ['id', 'DESC'],
            ],
            limit: 1
        });
        let id = 1;
        if(arr.length > 0) id = arr[0].id + 1;
        console.log('id: => ' + id);
        let code = tinyCode.code10to62(id.toString());

        const tObj = await this.table.create({
            id:id, 
            tinyCode: code, 
            tinyUrl: `http://${cfg.urlHost}/c/${code}`,
            originalUrl: data.originalUrl
        });
        console.log("DB ID: ", tObj.id);
        return tObj;
    }

    this.getList = async function () {
        let a = await this.table.findAll({
            order: [
                ['updatedAt', 'DESC'],
            ]
        });
        return  a;
    }

    this.deleteByTinyCode = async function (params) {
        let a= await this.table.destroy({
            where: {
                tinyCode: params.tinyCode
            }
        });
        return a;
    }

    this.getUrl = async function(params) {
        let a = await this.table.findOne({
            where: {
                tinyCode: params.tinyCode
            }
        })
        return a;
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