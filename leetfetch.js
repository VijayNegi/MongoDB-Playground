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
		headers: { 'Content-Type': 'application/json',
					'origin': 'https://leetcode.com',
					'referer': 'https://leetcode.com/',
					'cookie': 'cf_clearance=b6133f557944682b880aff12df9048bbd7de88af-1624349454-0-150; _ga=GA1.2.2145902584.1635679193; gr_user_id=6d40fe7b-a2c8-4338-9c69-fb4102dfd7c8; NEW_PROBLEMLIST_PAGE=1; __stripe_mid=6b19c0b4-e9c8-4c0e-b01f-70896500d12f6b6027; 87b5a3c3f1a55520_gr_last_sent_cs1=n361; csrftoken=1w28872a2alH1SyxpObLxuKSwcuDPkXibghXTX6T2Kl79jxackNSp4HR0ddyBlsi; __atuvc=17|13,23|14,4|15,4|16,4|17; 87b5a3c3f1a55520_gr_cs1=n361; LEETCODE_SESSION=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiMjgzNDYxOCIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImFsbGF1dGguYWNjb3VudC5hdXRoX2JhY2tlbmRzLkF1dGhlbnRpY2F0aW9uQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6Ijc4NDdhZTk5Y2ViOGYyZjcwNjI3ZTJjNjBhMjBkNDllNTU4YzBiZGYiLCJpZCI6MjgzNDYxOCwiZW1haWwiOiJhc3Ryby52aWpheUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Im4zNjEiLCJ1c2VyX3NsdWciOiJuMzYxIiwiYXZhdGFyIjoiaHR0cHM6Ly9hc3NldHMubGVldGNvZGUuY29tL3VzZXJzL2F2YXRhcnMvYXZhdGFyXzE2NDk1MTM4NTQucG5nIiwicmVmcmVzaGVkX2F0IjoxNjUyMTE4ODA3LCJpcCI6IjE2My41My44Ni4xODQiLCJpZGVudGl0eSI6IjkxOWIzY2MzZGRlODgxNzU4YzRhYTJjYmFmNjJmN2Y2IiwiX3Nlc3Npb25fZXhwaXJ5IjoxMjA5NjAwLCJzZXNzaW9uX2lkIjoxNzk3NTA2NSwiY29udmVyc2lvbl90YXJnZXRzIjp7IlJ4dGFWeEVLQVFSSEdVVlFTaGdYRlFNVVRCUUdBQndFRFF0QkZGZFhTbDhhSFZKUUZoc1hBZz09Ijp7InNlbmRfc2Vzc2lvbl9pZHMiOlsxODU3XSwiZW1haWwiOiJhc3Ryby52aWpheUBnbWFpbC5jb20ifSwiUnh0YVZ4RUtBUVJIRDFCY0RnTUxYUXNYVzAwQUhBWmRXa0FORmc9PSI6eyJzZW5kX3Nlc3Npb25faWRzIjpbMTg1N10sImVtYWlsIjoiYXN0cm8udmlqYXlAZ21haWwuY29tIn19fQ.CqRJE8ZBEcA9H5ox9bhQmh4Y6XJO06RzpXIiuCG3Z8c; c_a_u="bjM2MQ==:1noJFs:RY1Vr85Gh75HYa5ItOHSp_R5EmE"'
		 },
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