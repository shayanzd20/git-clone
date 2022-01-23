import axios from 'axios';

const URL_BASE = 'https://api.github.com';

/**
 * @description get user data from github api
 * @param {string} userName
 * @returns {object} - detail of user
 */

export async function getUserData(userName) {
	const response = await axios.get(`${URL_BASE}/users/${userName}`);
	return response;
}

/**
 * @description get user data from github api
 * @param {string} userName
 * @returns {array} - of repositories
 */
export async function getUserRepositories(userName) {
	const repositories = await axios.get(`${URL_BASE}/users/${userName}/repos`);
	return repositories;
}
