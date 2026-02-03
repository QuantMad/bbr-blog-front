import type { Post } from '@/models/PostModel';
import axios, { type AxiosResponse } from 'axios';

const API_ENDPOINT : string = "http://10.88.2.51:5027/api";

async function _Get(endpoint: string) : Promise<AxiosResponse<any, any, {}>> {
    return await axios.get(API_ENDPOINT + "/" + endpoint);
}

export async function GetPosts() : Promise<AxiosResponse<Post[]>> {
    return await _Get("blog");
}

export async function GetPost(id: number) : Promise<AxiosResponse<Post>> {
    return await _Get("blog/" + id.toString());
}