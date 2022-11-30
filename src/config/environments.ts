export enum ApplicationEnvironment {
  Production = 'Production',
  Development = 'Development',
}

export type CrossEnvironmentConfig<T> = Record<ApplicationEnvironment, T>;

export function isApplicationEnvironment(
  value: string
): value is ApplicationEnvironment {
  return ApplicationEnvironment.hasOwnProperty(value);
}

export let environment =
  (process.env.REACT_APP_ENVIRONMENT as ApplicationEnvironment) ||
  ApplicationEnvironment.Development;

if (!isApplicationEnvironment(environment)) {
  console.warn(
    `WARNING! Invalid application environment ${environment} provided; defaulting to Development...`
  );
  environment = ApplicationEnvironment.Development;
}

export const isProduction: boolean =
  environment === ApplicationEnvironment.Production;
export const isDevelopment: boolean =
  environment === ApplicationEnvironment.Development;