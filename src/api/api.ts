import axios, { AxiosRequestConfig } from 'axios';

const apiUrl = "https://api.cloudinary.com/v1_1/dplwazmlj/image/upload";
const instance = axios.create()



export const FileUpload = async (data: FormData, options: AxiosRequestConfig) => {


    try {
       console.log(instance.defaults.headers)
        return await instance.post(apiUrl, data, options)
    } catch (error) {
        throw error;
    }
}