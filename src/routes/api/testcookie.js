// import cookie from 'cookie';
// import { add } from 'date-fns';

/**
 *
 * @param {*} request
 * @returns
 */
export async function get(request) {
	// const cookies = cookie.parse(request.headers.cookie || '');
	// console.log('cookies', cookies);

	// const res = await fetch('http://localhost/api/testapitoken', {
	// credentials: 'include'
	// });

	const res = await fetch('https://httpbin.org/cookies/set?ciccio=pasticcio&paolino=paperino', {
  	redirect: 'manual'
	});
  console.log(res.headers);
	
	const headers = res.headers;
  const resultBody = {};
	for (const headerPair of headers.entries()) {
		const headerName = headerPair[0];
		const headerValue = headerPair[1];
		resultBody[headerName] = headerValue;
	}

	const responseCookies = res.headers.raw()['set-cookie'];

	// const now = new Date();
	// const expireDate = add(now, { hours: 2 });

  resultBody['response_status'] = res.status; 
  resultBody['success'] = `success ${new Date().toUTCString()}`;

	return {
		status: 200,
		body: resultBody,
		headers: {
			'set-cookie': responseCookies
			// 'set-cookie': [
			// 	cookie.serialize('avalue', '123456789', {
			// 		maxAge: 7200,
			// 		expires: expireDate,
			// 		httpOnly: true,
			// 		secure: true,
			// 		sameSite: 'strict',
			// 		// domain: 'localhost',
			// 		path: '/'
			// 	}),
			// 	cookie.serialize('anothervalue', '987654321', {
			// 		maxAge: 7200,
			// 		expires: expireDate,
			// 		httpOnly: true,
			// 		secure: true,
			// 		sameSite: 'strict',
			// 		// domain: 'localhost',
			// 		path: '/'
			// 	})
			// ]
		}
	};
}
