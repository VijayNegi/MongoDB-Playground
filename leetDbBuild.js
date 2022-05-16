/* Script to setup DB with leetcode data
1. Setup DB
2. Fetch Company Tags and put in a collection
3. Fetch All Question data and put in a collection
4. For each Company tag (At least for few) pull question and put in a collection.
*/ 

const {MongoClient} = require("mongodb")
const {fetchAllProblems,fetchProblemData, fetchProblemsTags,fetchCompanyTag,fetchAllProblemsMin} = require("./leetfetch")
const uri = "mongodb://localhost:27017"

async function connect() {
	const client = new MongoClient(uri)
	try {

		await client.connect()
		const db = client.db("leetPre")
		console.log(`connected to database ${db.databaseName}`)
		
		await fillQuestionsData(db)

		await fillTagsData(db)

		await fillCompaniesData(db)
		
		//console.log(response)
	}
	catch(ex){
		console.error(`Something bad happend ${ex}`)
	}
	finally {
		client.close()
	}
}

async function fillQuestionsData(db){
	// Calling function should catch errors
	const slugMap = db.collection("problems")

	
	const maxp = 3000;
	const limit = 200;
	// looping from i = 1 to 5
	for (let i = 0; i < maxp; i+=limit) {
		const response  = await fetchAllProblems(i,limit)
		let total  = response.data.problemsetQuestionList.total

		let problemList = response.data.problemsetQuestionList.questions
		if(problemList.length == 0)
			break
		const insertManyresult = await slugMap.insertMany(problemList);
		console.log(`${insertManyresult.insertedCount} documents were inserted.`);
	}
}

async function fillTagsData(db){
	// Calling function should catch errors
	const companies = db.collection("companiesTags")
	const topic = db.collection("topicTags")
	const response  = await fetchProblemsTags()

	let topicList  = response.data.questionTopicTags.edges
	let companyList  = response.data.questionCompanyTags.edges
	for (one of topicList) {
		await topic.insertOne(one.node)
	}
	for (one of companyList) {
		await companies.insertOne(one.node)
	}
	console.log(`${topicList.length} topics were inserted.`);
	console.log(`${companyList.length} topics were inserted.`);
}

async function fillCompaniesData(db){
	// Calling function should catch errors
	let clist = ["google","amazon","facebook","apple","uber","rubrik","netflix"]
	for(comp of clist) {
		const pCollection = db.collection("freqData")
		const response  = await fetchCompanyTag(comp)
		await pCollection.insertOne({"company": comp,
										"frequencies":response.data.companyTag.frequencies
									})
		//const freq = JSON.parse(response.data.companyTag.frequencies);
		//const list = response.data.companyTag.questions
		// for (one of list) {
		// 	let id = one.questionId
		// 	await pCollection.insertOne({"questionId":id,
		// 								"freq":freq[id]
		// 							})
		// }
	}
	
	//let total  = response.data.problemsetQuestionList.total
	//let problemList = response.data.problemsetQuestionList.questions

	//const insertManyresult = await slugMap.insertMany(problemList);
	//let ids = insertManyresult.insertedIds;
	//console.log(`${insertManyresult.insertedCount} documents were inserted.`);
}

connect()
