const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require("fs")
// Just some constants
const LEETCODE_API_ENDPOINT = 'https://leetcode.com/graphql'
const ALL_QUESTION_QUERY = fs.readFileSync("query_allq.txt","utf8")
const QUESTION_DATA_QUERY = fs.readFileSync("query_qData.txt","utf8")
const vars = {
	categorySlug: "",
	skip: 0,
	limit: 3000,
	filters: {},
}

const fetchAllProblems = async () => {
	console.log(`Fetching all LeetCode questions.`)

	const init = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ query: ALL_QUESTION_QUERY,
								variables: vars }),
	}
	console.log(init.body)
	const response = await fetch(LEETCODE_API_ENDPOINT, init)
	return response.json()
}

const fetchProblemData = async (questionSlug) => {
	console.log(`Fetching single question data.`)

	const init = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({  operationName: "questionData",
							 	variables: { titleSlug: questionSlug, },
								query: QUESTION_DATA_QUERY }),
	}
	console.log(init.body)
	const response = await fetch(LEETCODE_API_ENDPOINT, init)
	return response.json()
}

module.exports = {
    fetchAllProblems,
	fetchProblemData
}