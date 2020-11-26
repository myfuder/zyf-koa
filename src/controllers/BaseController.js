const {Controller} = require("../decorator")

// 这是中间件，可以统一给控制器做拦截

class BaseController {
    constructor(option) {
        this.option = option
    }

    __before__(ctx, next){
        let req = ctx.request.body;
        console.log(ctx)
        next()
        // return {ddd:'dasdd'}
        // if(req.){
        //
        // }
    }
}

// module.exports = BaseController
export {BaseController}