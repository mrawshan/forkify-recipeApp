import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

// Loading timeout function
const timeout = function (s) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${s} second`));
		}, s * 1000);
	});
};

// Refectoring the getJSON and sendJSON methods
export const AJAX = async function (url, uploadData = undefined) {
	try {
		const fetchPro = uploadData
			? fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(uploadData),
			  })
			: fetch(url);

		const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
		const data = await res.json(); // Converting the results to json

		if (!res.ok) throw new Error(`${data.message} (${res.status})`);
		return data;
	} catch (err) {
		throw err;
	}
};

/*
// Get JSON function
export const getJSON = async function (url) {
	try {
		const fetchPro = fetch(url);
		const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
		const data = await res.json(); // Converting the results to json

		if (!res.ok) throw new Error(`${data.message} (${res.status})`);
		return data;
	} catch (err) {
		throw err; // Re throwing the error to model error handler
	}
};

// Sending JSON function
export const sendJSON = async function (url, uploadData) {
	try {
		const fetchPro = fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(uploadData),
		});

		const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
		const data = await res.json(); // Converting the results to json

		if (!res.ok) throw new Error(`${data.message} (${res.status})`);
		return data;
	} catch (err) {
		throw err; // Re throwing the error to model error handler
	}
};
*/
