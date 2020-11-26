// const moment = require('moment');
import moment from 'moment'
class Model {
    constructor(sequelize,DataTypes) {
        this.article = sequelize.define('article', {
            // 文章ID
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: true,
                autoIncrement: true,
            },
            // 文章标题
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'title',
            },
            // 文章作者
            author: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'author'
            },
            // 文章内容
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'content'
            },
            // 文章分类
            category: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'category'
            },
            // 创建时间
            createdAt: {
                type: DataTypes.DATE,
                get() {
                    return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            // 更新时间
            updatedAt: {
                type: DataTypes.DATE,
                get() {
                    return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
                }
            }
        }, {
            // 如果为 true 则表的名称和 model 相同，即 user
            // 为 false MySQL创建的表名称会是复数 users
            // 如果指定的表名称本就是复数形式则不变
            freezeTableName: true
        })
        // 自动创建表
        this.article.sync({force: false});
    }
    /**
     * 创建文章模型
     * @param data
     * @returns {Promise<*>}
     */
    async createArticle(data) {
        return await this.article.create({
            title: data.title, // 文章标题
            author: data.author, // 文章作者
            content: data.content, // 文章内容
            category: data.category, // 文章分类
        })
    }

    /**
     * 查询取文章详情数据
     * @param id  文章ID
     * @returns {Promise<Model>}
     */
    async getArticleDetail(id) {
        return await this.article.findOne({
            where: {
                id,
            },
        })
    }
}
// export {Model}
module.exports = Model