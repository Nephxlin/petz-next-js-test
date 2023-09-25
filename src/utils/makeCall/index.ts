import axios, { AxiosResponse  } from 'axios';

type ILocalUrls = '/scheduling/date' | '/scheduling/time' | '/'
type IPokeDexUrls = '/pokemon' | '/region' | '/location'
type IBaseService = 'local' | 'pokeDex'

type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface IServiceUrlsMap {
  local: ILocalUrls;
  pokeDex: IPokeDexUrls;
}

function getBaseUrl(baseService: IBaseService) {
  switch (baseService) {
    case 'local':
      return '/api'
    case 'pokeDex':
      return process.env.NEXT_PUBLIC_POKE_API_URL 
  }
}

export type IMakeCall<T extends IBaseService> = {
  baseService: T;
  url: IServiceUrlsMap[T];
  method: HttpMethods 
  data?: any
};


async function makeHttpCall<T extends IBaseService>({
  baseService,
  url,
  method,
  data,
}: IMakeCall<T>): Promise<AxiosResponse> {
  const baseUrl = getBaseUrl(baseService)
  const fullUrl = `${baseUrl}${url}`;

  try {
    const response = await axios.request({
      url: fullUrl,
      method,
      data,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export default makeHttpCall;