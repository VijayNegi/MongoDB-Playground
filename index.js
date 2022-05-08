// create the client class
const {MongoClient} = require("mongodb")
// const MongoClient = require("mongodb").MongoClient
const uri = "mongodb://localhost:27017"
connect();
async function connect() {
	const client = new MongoClient(uri)
	try {
		await client.connect()
		const db = client.db("test")
		console.log(`connected to database ${db.databaseName}`)
		const collections = await db.collections();
		// get the collections in the db
		collections.forEach(c=>console.log(c.collectionName))

		// get result
		const names = db.collection("names")
		const searchCursor = await names.find()
		//const searchCursor = await names.find({name:"vijay"})

		const result = await searchCursor.toArray()
		console.table(result)
		//result.forEach(r=> console.log(r))
		/*
		while( await searchCursor.hasNext()){
			console.log(await searchCursor.next())
		}
		*/

		// insert into the collection
		/*
		const insertCursor = await names.insertMany([
			{
				name: "bhairav",
				age: 65
			},
			{
				name: "bhagirathi",
				age: 54
			}
		])
		console.log(insertCursor.insertedCount )
		*/
		// Update content
		/*
		const updateCursor = await names.updateOne(
			{name: "vijay"},
			{"$set": {age: 31}}
		)
		console.log(updateCursor.modifiedCount)
		*/
	}
	catch(ex){
		console.error(`Something bad happend ${ex}`)
	}
	finally {
		client.close()
	}
}



