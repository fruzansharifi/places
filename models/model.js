var dbConnection = require('./connection');

class Model{
	// static tableName ='';
	constructor(){
		this.tableName = '';
		this._fields = {};
	}


	/* ----------------- static method ------------------- */
    static async query(sql){
		return await dbConnection(sql);
    }


	// static async select(fields, where = null)
	// {
		

	// 	var sql = "SELECT "+ fields +" FROM " + tableName;
	// 	if(where)
	// 		sql += ' WHERE ' + where;

	// 	return await dbConnection(sql);

	// }

	// static async insert(fields, where = null)
	// {
	// 	var values = [];
	// 	var columns = [];
	// 	for(var index in fields){
	// 		values.push("'"+fields[index]+"'");
	// 		columns.push(index);
	// 	}

	// 	values = values.join();
	// 	columns = columns.join();

	// 	var sql = "INSERT INTO `" + tableName + "` (" + columns + ") VALUES (" + values + ")";
	// 	if(where)
	// 		sql += where;

	// 	return await dbConnection(sql);

	// }

	static async findById(id){
		var where = ' id='+id;
		var model = await this.select("*", where);
		if(model.length)
			return model[0];
		return false;
	}

	static async all(){
		var models = await this.select('*');
		return models;
	}


	/*    --------------------- dynamic method ----------------- */
	async insert(fields, where = null)
	{
		var values = [];
		var columns = [];
		for(var index in fields){
			values.push("'"+fields[index]+"'");
			columns.push(index);
		}

		values = values.join();
		columns = columns.join();


		var sql = "INSERT INTO `" + this.tableName + "` (" + columns + ") VALUES (" + values + ")";
		console.log(sql);
		if(where)
			sql += where;

		return await dbConnection(sql);

	}

	async save(){
		try{
			this._InsertData =  await this.insert(this._fields);
			console.log(this._InsertData);
			if(this._InsertData.insertId)
				return this._InsertData.insertId
			return false;
		}
		catch(e){throw e}
	}


	/* -------- getters ----------- */
	get id(){
		return this._InsertData.insertId;
	}



}

module.exports = Model;