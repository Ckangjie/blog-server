let query = require('../mysql')
module.exports = {
    addMsg: async function (data) {
        let sql = 'insert into message(name,content) values(?,?)'
        let result = await query(sql, data)
        if(result){
            return true
        }
    }
}