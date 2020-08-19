import {url_base} from "./../constants/api_url";
import axios from 'axios';

const api_url = url_base;

export const fetchRecord = async (idRecord,resource) => {

    try{
        const response = await axios({
            url:`${api_url}${resource}/${idRecord}`,
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });

        if(response) {
            return response.data;
        }
    }catch (e) {
        throw e;
    }
};

