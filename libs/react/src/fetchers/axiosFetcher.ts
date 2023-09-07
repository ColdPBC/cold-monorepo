import axios from 'axios';
import { set } from 'lodash';
import { useCookies } from '../hooks/useCookies';
import get from "lodash/get";

const baseURL = get(import.meta.env, 'VITE_API_BASE_URL', 'http://localhost:7001');

// path, method, data
export const axiosFetcher = (params: Array<string>) => {
    try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const {getCookieData} = useCookies();
        const cookie = getCookieData();

        const token = cookie ? cookie.accessToken : null;
        const user = cookie ? cookie.user : null;

        if(!token) throw new Error( `${user?.email} attempted to request data from ${params[0]} however a token was not found in the cookie.` );

        const config = {
            baseURL: baseURL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            method: 'GET',
        }

        if(params.length >= 1) {
            // Set Request Method
            set( config, 'method', params[1] );
            // Set Request Data
            if(params[2]) {
                set( config, 'data', params[2] );
            }
        } else {
            console.warn( 'method was not passed to the fetcher.  Defaulting to GET' );
        }

        if(params.length < 1) {
            throw new Error( 'no url path was passed to the fetcher.  This is required' );
        }

        return axios( params[0], config ).then( ( res ) => {
            return res.data;
        } ).catch( ( err ) => {
            return err;
        } );
    } catch (e) {
        console.error( e );
        return e;
    }
}
