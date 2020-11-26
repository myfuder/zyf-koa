const {Controller} = require("../decorator")
@Controller("/")
class BaseController {
    constructor(option) {
        this.option = option
    }

    __before__(ctx, next){
        let req = ctx.request.body;
        console.log(ctx)
        // return {ddd:'dasdd'}
        // if(req.){
        //
        // }
    }
}

// module.exports = BaseController
export {BaseController}