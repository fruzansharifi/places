const Model = require('./model');
var dbConnection = require('./connection');

class Votes extends Model{
    // static tableName='votes'
    constructor() {
        super();
        this.tableName ='votes'

        this._fields = {
            vote:'',
            image_id:''
        }
    }

    set vote(vote){
        this._fields.vote = vote;
    }

    set imageId(id){
        this._fields.image_id = id;
    }

    static async select(fields, where = null)
    {
        
        var tableName = 'votes';
        var sql = "SELECT "+ fields +" FROM " + tableName;
        if(where)
            sql += ' WHERE ' + where;

        return await dbConnection(sql);

    }

    static async insert(fields, where = null)
    {
        var values = [];
        var columns = [];
        var tableName = 'votes';
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
module.exports = Votes;