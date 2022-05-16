const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require("fs")
// Just some constants
const LEETCODE_API_ENDPOINT = 'https://leetcode.com/graphql'
const ALL_QUESTION_QUERY = fs.readFileSync("query_allqData.txt","utf8")
const ALL_QUESTION_QUERY_MIN = fs.readFileSync("query_allq.txt","utf8")
const ALL_QUESTION_QUERY_MIN_ALT = fs.readFileSync("query_allq_Alt.txt","utf8")
const QUESTION_DATA_QUERY = fs.readFileSync("query_qData.txt","utf8")
const QUESTION_TAGS_QUERY = fs.readFileSync("query_qTags.txt","utf8")
const COMPANY_TAGS_QUERY = fs.readFileSync("query_compTag.txt","utf8")
//const cookie = 'cf_clearance=b6133f557944682b880aff12df9048bbd7de88af-1624349454-0-150; _ga=GA1.2.2145902584.1635679193; gr_user_id=6d40fe7b-a2c8-4338-9c69-fb4102dfd7c8; NEW_PROBLEMLIST_PAGE=1; __stripe_mid=6b19c0b4-e9c8-4c0e-b01f-70896500d12f6b6027; 87b5a3c3f1a55520_gr_last_sent_cs1=n361; __atuvc=17%7C13%2C23%7C14%2C4%7C15%2C4%7C16%2C4%7C17; 87b5a3c3f1a55520_gr_cs1=n361; csrftoken=TPt2dCdoFoihvhR7PRzzIQxehEpknKszAAZ5fSKqQs67PuyHl2haVSa9U4O7BOLH; messages="7ba78bf9ecd124dda5ffbc8956c9833c5efb0784$[[\"__json_message\"\0540\05425\054\"You have signed out.\"]\054[\"__json_message\"\0540\05425\054\"Successfully signed in as ACEpratap.\"]]"; LEETCODE_SESSION=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiMjYxMzczMCIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImFsbGF1dGguYWNjb3VudC5hdXRoX2JhY2tlbmRzLkF1dGhlbnRpY2F0aW9uQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6IjMzMGE4OWM4M2FlNTAxMDM4NzM1ZTQzYmM5OTRlYTg3MzYwMWY4MjEiLCJpZCI6MjYxMzczMCwiZW1haWwiOiJhYmhpbmF2Y2hhdWhhbjkwQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiQUNFcHJhdGFwIiwidXNlcl9zbHVnIjoiQUNFcHJhdGFwIiwiYXZhdGFyIjoiaHR0cHM6Ly9zMy11cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9zMy1sYy11cGxvYWQvYXNzZXRzL2RlZmF1bHRfYXZhdGFyLmpwZyIsInJlZnJlc2hlZF9hdCI6MTY1MjI5MDgzOSwiaXAiOiIxNjMuNTMuODYuMTg0IiwiaWRlbnRpdHkiOiJlZjY2ZDZmYzU4MGUzZTE5OWQ3ZWFmMDNiZmMxOWUyMSIsInNlc3Npb25faWQiOjIxNTU1NDUxLCJfc2Vzc2lvbl9leHBpcnkiOjEyMDk2MDB9.glK_XR3tp0ybm3qLmyMvQkL_-gwlLGfAyW8rKNALwWU; c_a_u=QUNFcHJhdGFw:1noqLp:HslO_NCdNfgrK9uDxrjaAyq_vUU; _dd_s=logs=1&id=e3e08bfd-ffc7-4aac-93d5-b400e748eae1&created=1652290782153&expire=1652292357975'
const cookie = 'cf_clearance=b6133f557944682b880aff12df9048bbd7de88af-1624349454-0-150; _ga=GA1.2.2145902584.1635679193; gr_user_id=6d40fe7b-a2c8-4338-9c69-fb4102dfd7c8; NEW_PROBLEMLIST_PAGE=1; __stripe_mid=6b19c0b4-e9c8-4c0e-b01f-70896500d12f6b6027; 87b5a3c3f1a55520_gr_last_sent_cs1=n361; __atuvc=17|13,23|14,4|15,4|16,4|17; 87b5a3c3f1a55520_gr_cs1=n361; csrftoken=8au2HRZHzMdIjYYftYvzQzrlMoGeuaSdMjaMig9qrIvjR26EhZ2kUrs5VZVM9n9l; messages="d5f2b25b5e9c1a9b88f4d2a637e37c562ca7c304$[[\"__json_message\"\0540\05425\054\"You have signed out.\"]\054[\"__json_message\"\0540\05425\054\"Successfully signed in as ACEpratap.\"]\054[\"__json_message\"\0540\05425\054\"You have signed out.\"]\054[\"__json_message\"\0540\05425\054\"Successfully signed in as n361.\"]\054[\"__json_message\"\0540\05425\054\"You have signed out.\"]\054[\"__json_message\"\0540\05425\054\"Successfully signed in as ACEpratap.\"]\054[\"__json_message\"\0540\05425\054\"You have signed out.\"]\054[\"__json_message\"\0540\05425\054\"Successfully signed in as n361.\"]\054[\"__json_message\"\0540\05425\054\"You have signed out.\"]\054[\"__json_message\"\0540\05425\054\"Successfully signed in as ACEpratap.\"]\054[\"__json_message\"\0540\05425\054\"You have signed out.\"]\054[\"__json_message\"\0540\05425\054\"Successfully signed in as n361.\"]\054[\"__json_message\"\0540\05425\054\"You have signed out.\"]\054[\"__json_message\"\0540\05425\054\"Successfully signed in as ACEpratap.\"]]"; LEETCODE_SESSION=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiMjYxMzczMCIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImFsbGF1dGguYWNjb3VudC5hdXRoX2JhY2tlbmRzLkF1dGhlbnRpY2F0aW9uQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6IjMzMGE4OWM4M2FlNTAxMDM4NzM1ZTQzYmM5OTRlYTg3MzYwMWY4MjEiLCJpZCI6MjYxMzczMCwiZW1haWwiOiJhYmhpbmF2Y2hhdWhhbjkwQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiQUNFcHJhdGFwIiwidXNlcl9zbHVnIjoiQUNFcHJhdGFwIiwiYXZhdGFyIjoiaHR0cHM6Ly9zMy11cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9zMy1sYy11cGxvYWQvYXNzZXRzL2RlZmF1bHRfYXZhdGFyLmpwZyIsInJlZnJlc2hlZF9hdCI6MTY1MjcyNDI1NywiaXAiOiIxNjMuNTMuODYuNjciLCJpZGVudGl0eSI6ImVmNjZkNmZjNTgwZTNlMTk5ZDdlYWYwM2JmYzE5ZTIxIiwic2Vzc2lvbl9pZCI6MjE3NjU5NzcsIl9zZXNzaW9uX2V4cGlyeSI6MTIwOTYwMH0.1X5QlLRaMvGLm-T1enciEzXChhkVwK3qgVDW0ise42U; _dd_s=logs=1&id=82cc324f-c191-4726-8781-7d73ecac245c&created=1652723230961&expire=1652725625910; c_a_u=QUNFcHJhdGFw:1nqfCQ:zwl60DOox_rTEEtXPaSxg4yU70s'
//const cookie = ''
const vars = {
	categorySlug: "",
	skip: 0,
	limit: 3000,
	filters: {},
}

const fetchAllProblems = async (skip=0,limit=3000) => {
	console.log(`Fetching all LeetCode questions.`)
	let lvars = vars
	lvars.skip = skip
	lvars.limit = limit
	const init = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json',
					'origin': 'https://leetcode.com',
					'referer': 'https://leetcode.com/',
					'cookie': cookie
		 },
		body: JSON.stringify({ query: ALL_QUESTION_QUERY,
								variables: lvars }),
	}
	//console.log(init.body)
	const response = await fetch(LEETCODE_API_ENDPOINT, init)
	return response.json()
}

const fetchAllProblemsMin = async () => {
	console.log(`Fetching all LeetCode questions.`)

	const init = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json',
					'origin': 'https://leetcode.com',
					'referer': 'https://leetcode.com/',
					'cookie': cookie
		 },
		body: JSON.stringify({ query: ALL_QUESTION_QUERY_MIN,
								variables: vars }),
	}
	//console.log(init.body)
	const response = await fetch(LEETCODE_API_ENDPOINT, init)
	return response.json()
}

const fetchAllProblemsMin_Alt = async () => {
	console.log(`Fetching all LeetCode questions.`)

	const init = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json',
					'origin': 'https://leetcode.com',
					'referer': 'https://leetcode.com/',
					'cookie': cookie
		 },
		body: JSON.stringify({ query: ALL_QUESTION_QUERY_MIN_ALT,
								variables: vars }),
	}
	//console.log(init.body)
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
					'cookie': cookie
		 },
		body: JSON.stringify({  operationName: "questionData",
							 	variables: { titleSlug: questionSlug, },
								query: QUESTION_DATA_QUERY }),
	}
	//console.log(init.body)
	const response = await fetch(LEETCODE_API_ENDPOINT, init)
	return response.json()
}

const fetchProblemsTags = async () => {
	console.log(`Fetching All question Tags.`)

	const init = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json',
					'origin': 'https://leetcode.com',
					'referer': 'https://leetcode.com/',
					'cookie': cookie
		 },
		body: JSON.stringify({  operationName: "questionTags",
							 	variables: { skipCompanyTags: false, },
								query: QUESTION_TAGS_QUERY }),
	}
	//console.log(init.body)
	const response = await fetch(LEETCODE_API_ENDPOINT, init)
	return response.json()
/*
	const response = fs.readFileSync("response_allqTags.txt","utf8")
	return JSON.parse(response)
*/
}

const fetchCompanyTag = async (companySlug) => {
	console.log(`Fetching All company problmes with frequecies.`)

	const init = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json',
					'origin': 'https://leetcode.com',
					'referer': 'https://leetcode.com/',
					'cookie': cookie
		 },
		body: JSON.stringify({  operationName: "getCompanyTag",
							 	variables: { slug: companySlug, },
								query: COMPANY_TAGS_QUERY }),
	}
	//console.log(init.body)
	const response = await fetch(LEETCODE_API_ENDPOINT, init)
	return response.json()
/*
	const response = fs.readFileSync("response_compGoogle.txt","utf8")
	return JSON.parse(response)
*/
}

module.exports = {
    fetchAllProblems,
	fetchAllProblemsMin,
	fetchProblemData,
	fetchProblemsTags,
	fetchCompanyTag
}