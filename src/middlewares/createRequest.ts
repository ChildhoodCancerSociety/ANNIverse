"use client"

import { projectAuth } from "../firebase/config";

interface FetchOptions extends RequestInit {
    authRequired?: boolean,
    method?: string,
    headers?: Record<string, string>,
    body?: string | FormData,
}
const createRequest = async (opts: FetchOptions, url: string) =>{
    //gets the current users token
    const jwt = await projectAuth.currentUser?.getIdToken();

    if(!jwt && opts.authRequired){
        throw new Error("Auth Token Required");
    }

    return fetch(url,{
        method: opts.method,
        headers: {
            ...opts.headers,
            'Authorization': `Bearer ${jwt}`
        },
        body: opts.body && JSON.stringify(opts.body)
    });
}

module.exports = createRequest;