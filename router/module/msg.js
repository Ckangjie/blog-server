let msg = require('../../data/module/msg')
module.exports={
    async addMsg(req,res){
        let params =req.body
        let result = await msg.addMsg([params.name,params.content])
        if(result){
            res.json({
                status:200,
                message:'评论成功'
            })
        }
    },
}