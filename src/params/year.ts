export const match = (param) => {
	try {
		const year = parseInt(param);
		return year > 2000 && year < 3000;
	} catch {
		return false;
	}
};
