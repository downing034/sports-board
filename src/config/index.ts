import * as urls from 'config/urls';
import {
	ApplicationEnvironment,
	isProduction,
	isDevelopment
 } from 'config/environments';

export function getConfig() {
	return {
		...urls,
		isProduction,
		isDevelopment
	}
}

