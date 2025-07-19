import { apiUrl } from '../data/nodesData';

import dotenv from 'dotenv';
dotenv.config();

const urls = {
    automationUrl: process.env.AUTOMATION_URL_ENVIRONMENT,
    qaUrl: process.env.QA_URL_ENVIRONMENT,
    stagingUrl: process.env.STAGING_URL_ENVIRONMENT,
}


export function validateEnvironment() {
    let environmentValue: string = `${process.env.TEST_ENVIRONMENT}`;
    let url: string = "";
    switch(environmentValue) { 
        case environmentValue = "qa": { 
            url = `${urls.qaUrl}`
            break; 
        } 
        case environmentValue = "staging": { 
            url = `${urls.stagingUrl}`
            break; 
        }
        
        case environmentValue = "automation": { 
            url = `${urls.automationUrl}`
            break; 
        } 
        default: { 
            console.log("No valid environment only: qa, staging or automation");
           break; 
        }
    }

    return url;
    
}

export function validateAPIEnvironment() {
    let environmentValue: string = `${process.env.TEST_ENVIRONMENT}`;
    let apiUrlValue: string = "";
    switch(environmentValue) { 
        case environmentValue = "qa": { 
            apiUrlValue = `${apiUrl.qa}`
            break; 
        } 
        case environmentValue = "staging": { 
            apiUrlValue = `${apiUrl.staging}`
            break; 
        }
        
        case environmentValue = "automation": { 
            apiUrlValue = `${apiUrl.automation}`
            break; 
        } 
        default: { 
            console.log("No valid environment only: qa, staging or automation");
           break; 
        }
    }

    return apiUrlValue;

}