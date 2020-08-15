var Model = require('./model');
var dbConnection = require('./connection');

class Users extends Model{
	// static tableName='users'
	constructor(fields = null){
		super();
		this.tableName = 'users'
		if(fields)
		{
			this._fields = {
				username: fields.username,
				password: fields.password,
				email   : fields.email
			}
		}
		else{
			this._fields = {
				username:'',
				password:'',
				email	:''
			}
		}
	
	}

	static async findByEmail(email)
	{
		var where = ' email= \''+email+'\'';
		var user = await this.select('*', where);
		if(user.length)
			return user[0];
		return false;
	}




	set username(username)
	{
		// this._username = username;
		this._fields.username = username;
	}

	set email(email)
	{
		// this._email = email;
		this._fields.email = email;
	}

	set password(password){
		// this._password = password;
		this._fields.password = password;
	}

	static async select(fields, where = null)
	{
		
		var tableName = 'users';
		var sql = "SELECT "+ fields +" FROM " + tableName;
		if(where)
			sql += ' WHERE ' + where;

		return await dbConnection(sql);

	}

	static async insert(fields, where = null)
	{
		var values = [];
		var columns = [];
		var tableName = 'users';
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


module.exports = Users;