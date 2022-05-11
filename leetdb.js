const {MongoClient} = require("mongodb")
const {fetchAllProblems,fetchProblemData} = require("./leetfetch")
const uri = "mongodb://localhost:27017"

async function connect() {
	const client = new MongoClient(uri)
	try {
		await client.connect()
		const db = client.db("leetdb")
		console.log(`connected to database ${db.databaseName}`)
		const slugMap = db.collection("slugMap")
		// const response  = await fetchAllProblems()
		// let total  = response.data.problemsetQuestionList.total
		// let problemList = response.data.problemsetQuestionList.questions

		// const insertManyresult = await slugMap.insertMany(problemList);
		// let ids = insertManyresult.insertedIds;
   		// console.log(`${insertManyresult.insertedCount} documents were inserted.`);
		const response  = await fetchProblemData("combination-sum-iii")
		console.log(response)
	}
	catch(ex){
		console.error(`Something bad happend ${ex}`)
	}
	finally {
		client.close()
	}
}
connect()
