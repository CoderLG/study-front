import JsEncrypt from 'jsencrypt';

export function getRsaPassWord(password) {
	const jse = new JsEncrypt();
	jse.setPublicKey(`-----BEGIN PUBLIC KEY-----
	MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANbuVd2AW+xnDH82hNWFYjDWttKilGgt
	S+tVxBQF4POl7pkNccQNEfrklGsBvR1U4yjNhVeoLmO/Xd6WF0u0HsMCAwEAAQ==
	-----END PUBLIC KEY-----`);
	return jse.encrypt(password);
}

export function getRsaPassWord2(password) {
	const jse = new JsEncrypt();
	jse.setPublicKey(`-----BEGIN PUBLIC KEY-----
	MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANbuVd2AW+xnDH82hNWFYjDWttKilGgt
	S+tVxBQF4POl7pkNccQNEfrklGsBvR1U4yjNhVeoLmO/Xd6WF0u0HsMCAwEAAQ==
	-----END PUBLIC KEY-----`);
	return jse.encrypt(password);
}