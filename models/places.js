var Model = require('./model');
var dbConnection = require('./connection');

class Places extends Model{
    // static tableName='place'

    constructor(fields = null) {
        super();
        this.tableName='places'

        if(fields)
        {
            this._fields = {
                title: fields.title,
                description : fields.description,
                address : fields.address,
                user_id : fields.user_id
            }
        }
        else
        {
            this._fields = {
                title:'',
                description: '',
                address : '',
                user_id : '',
            }
        }
    }


    set title(title){
        this._fields.title = title;
    }

    set description(desc){
        this._fields.description = desc;
    }

    set address(address){
        this._fields.address = address;
    }

    set userId(id){
        this._fields.user_id = id;
    }

    static async select(fields, where = null)
    {
        
        var tableName = 'places';
        var sql = "SELECT "+ fields +" FROM " + tableName;
        if(where)
            sql += ' WHERE ' + where;

        return await dbConnection(sql);

    }

    static async insert(fields, where = null)
    {
        var values = [];
        var columns = [];
        var tableName = 'places';
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

_fields = {
    title :'test',
    description : ' des dfasdf', 
    address : 'dlkfjdslf'
}
module.exports = Places;