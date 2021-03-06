const {Controller,GET,POST} = require("../../decorator")
const {article} =  require('../../dao')
import {BaseController} from '../BaseController.js'
const middleFn = async (ctx,next)=>{
    // ctx.body =await "这是中间件...."
    console.log("dasdasd")
    await next();
}
@Controller("/")
class ArticleController extends BaseController{
    @GET("/active",[middleFn])
    async hello(ctx){
        // ctx.body = {
        //     code: 200,
        //     msg: 'success',
        // }
        return {code:300,msg:'success'}
        // return new Promise((resolve)=>{
        //     resolve({code:300,msg:'success'})
        // })
    }
    /**
     * 创建文章
     * @param ctx
     * @returns {Promise.<void>}
     */
    @POST("/article")
    async create(ctx) {
        // 接收客服端
        let req = ctx.request.body;
        if (req.title // 文章标题
            && req.author // 文章作者
            && req.content // 文章内容
            && req.category // 文章分类
        ) {
            try {
                // 创建文章模型
                const ret = await article.createArticle(req);
                // 把刚刚新建的文章ID查询文章详情，且返回新创建的文章信息
                const data = await article.getArticleDetail(ret.id);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '创建文章成功',
                    data
                }

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 200,
                    msg: '创建文章失败',
                    data: err
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '参数不齐全',
            }
        }

    }

    /**
     * 获取文章详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    @GET("/detail/:id")
     async detail(ctx) {
        let id = ctx.params.id;

        if (id) {
            try {
                // 查询文章详情模型
                let data = await article.getArticleDetail(id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '查询成功',
                    data
                }

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查询失败',
                    data
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '文章ID必须传'
            }
        }
    }
}
module.exports = ArticleController

// export {Controller}