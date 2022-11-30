const logger = {
	error: (error: Error): void => {
		if (process.env.NODE_ENV === 'test') {
			return ;
		}
		console.error(error)
	}
};
export default logger;