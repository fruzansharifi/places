var Model = require('./model');
var dbConnection = require('./connection');

class Comments extends Model{
    // static tableName='comments'
    constructor() {
        super();
        this.tableName ='comments'

        this._fields = {
            comment:'',
            full_name:'',
            image_id:''
        }
    }

    set comment(comment){
        this._fields.comment = comment;
    }

    set fullName(full_name){
        this._fields.full_name = full_name;
    }

    set imageId(id){
        this._fields.image_id = id;
    }

    static async select(fields, where = null)
    {
        
        var tableName = 'comments';
        var sql = "SELECT "+ fields +" FROM " + tableName;
        if(where)
            sql += ' WHERE ' + where;

        return await dbConnection(sql);

    }

    static async insert(fields, where = null)
    {
        var values = [];
        var columns = [];
        var tableName = 'comments';
        for(var index in fields){
            values.push("'"+fields[index]+"'");
            columns.push(index);
        }

        values = values.join();
        columns = columns.join();

        var sql = "INSERT INTO `" + tableName + "` (" + columns + ") VALUES (" + values + ")";
        if(where)
            sql += where;

        return await dbConnection(sql);

    }
}
module.exports = Comments;