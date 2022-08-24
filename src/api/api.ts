import axios, { AxiosRequestConfig } from 'axios';

const apiUrl = "https://api.cloudinary.com/v1_1/dplwazmlj/image/upload";

export const FileUpload = async (data: File, options: AxiosRequestConfig) => {
    try {
        return await axios.post(apiUrl, data, options)
    } catch (error) {
        throw error;
    }
}