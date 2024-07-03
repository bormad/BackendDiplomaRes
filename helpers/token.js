const jwt = require('jsonwebtoken');

const sign = 'testtest';

module.exports = {
	generateToken(data) {
		return jwt.sign(data, sign, { expiresIn: '30d' });
	},
	verify(token) {
		return jwt.verify(token, sign);
	}
};
