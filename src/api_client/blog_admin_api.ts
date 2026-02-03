import type { Post } from '@/models/PostModel';
import axios, { type AxiosResponse } from 'axios';

const API_ENDPOINT : string = "http://10.88.2.51:5027/api/admin/blog";

async function _Get(endpoint: string = "") : Promise<AxiosResponse<any, any, {}>> {
    let dest_endpoint : string = API_ENDPOINT;
    dest_endpoint += endpoint != "" ? "/" + endpoint : ""; 
    return await axios.get(dest_endpoint);
}

async function _Post(endpoint: string = "") : Promise<AxiosResponse<any, any, {}>> {
    let dest_endpoint : string = API_ENDPOINT;
    dest_endpoint += endpoint != "" ? "/" + endpoint : ""; 
    return await axios.post(dest_endpoint);
}

export async function GetPosts() : Promise<AxiosResponse<Post[]>> {
    return await _Get();
}

export async function GetPost(id: number) : Promise<AxiosResponse<Post>> {
    return await _Get(id.toString());
}

export async function Publish(id: number) : Promise<AxiosResponse<Post[]>> {
    return await _Post(id + "/publish");
}

export async function Unpublish(id: number) : Promise<AxiosResponse<Post[]>> {
    return await _Post(id + "/unpublish");
}

export async function EditPost(id: number, post: Post) : Promise<AxiosResponse<Post>> {
    return await axios.patch(API_ENDPOINT + "/" + id, post);
}

export async function CreatePost(post: Post) : Promise<AxiosResponse<Post>> {
    return await axios.post(API_ENDPOINT, post);
}

export async function MoveToBin(id: number) : Promise<AxiosResponse> {
    return await axios.delete(API_ENDPOINT + "/" + id);
}

export async function GetPostsInBin() : Promise<AxiosResponse<Post[]>> {
    return await _Get("bin");
}

export async function RestoreFromBin(id: number) : Promise<AxiosResponse<Post[]>> {
    return await _Post("bin/" + id);
}

export async function DeleteFromBin(id: number) : Promise<AxiosResponse> {
    return await axios.delete(API_ENDPOINT + "/bin/" + id);
}