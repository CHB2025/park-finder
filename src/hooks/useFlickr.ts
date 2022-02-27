import { useCallback, useEffect, useState } from "react"

type FlickrResponse<T> = {
   [key: string]: T | string | number | undefined;
   stat: 'fail' | 'ok';
   code?: number;
   message?: string;
}

export function useFlickr<T>(
   endpoint: string,
   dataKey: 'person' | 'photos',
   params?: Record<string, string>
): [T | undefined, undefined | string] {

   const [data, setData] = useState<T>()
   const [error, setError] = useState<string>()
   //const [internalParams] = useState(params)

   const makeRequest = useCallback(async (params: URLSearchParams) => {
      const endpoint = 'https://www.flickr.com/services/rest/?';

      const response = await fetch(endpoint + params.toString()).catch((e) => setError(e.message));
      const data: FlickrResponse<T> = await response?.json()?.catch((e) => setError(e.message));
      if (data && data.stat === 'fail') {
         setError(data.message)
         setData(undefined)
         return;
      }

      console.log('Flickr Data', data)
      setData(data[dataKey] as T)
   }, [dataKey])

   useEffect(() => {
      const p = new URLSearchParams()
      p.append('method', endpoint)
      p.append('api_key', process.env.REACT_APP_FLICKR_API_KEY || '');
      p.append('format', 'json')
      p.append('nojsoncallback', '1')

      if (params) {
         Object.keys(params).forEach((key) => {
            p.append(key, params[key])
         })
      }
      makeRequest(p)

   }, [endpoint, JSON.stringify(params), makeRequest])

   return [data, error]
}