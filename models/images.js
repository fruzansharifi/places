var Model = require('./model');
var dbConnection = require('./connection');

class Images extends Model{
    // static tableName='images'
    constructor(fields = null) {
        super();
        this.tableName ='images'

        if(fields){
            this._fields = {
                name: fields.name,
                place_id:fields.place_id,
                path: fields.path
            }
        }else{
            this._fields = {
                name:'',
                place_id:'',
                path:''
            }
        }
    }

    set name(name){
        this._fields.name = name;
    }

    set placeId(id){
        this._fields.place_id = id;
    }

    set path(path){
        this._fields.path = path;
    }

    static async select(fields, where = null)
    {
        
        var tableName = 'images';
        var sql = "SELECT "+ fields +" FROM " + tableName;
        if(where)
            sql += ' WHERE ' + where;

        return await dbConnection(sql);

    }

    static async insert(fields, where = null)
    {
        var values = [];
        var columns = [];
        var tableName = 'images';
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
module.exports = Images;