import {Page, expect, test} from '@playwright/test';
import Ajv from 'ajv';
import {v4 as uuidv4} from 'uuid';

import { LoginModel } from '../../pom/loginModel';
import {validateEnvironment, validateAPIEnvironment} from '../../utils/urlHandler';
import {validateUsers} from '../../utils/userHandler';
import { storeOwnerRoleValidation } from '../../utils/rolesHandler';
import { brandsData } from '../../data/brandsData';
import { nodesData } from '../../data/nodesData';

const users = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.brandNodeContentName));
const url: string = validateEnvironment();
const apiUrl: string = validateAPIEnvironment();


async function getAPIToken(page: Page) {
    
    return page.waitForResponse(/\/oauth2\/token/);
}

async function getCategoryResponse(page: Page) {
    
    return page.waitForResponse(/\/gYPxb8Ya\/categories/);
}

users.forEach(user =>{

    test(`Add Pages At Brand Node Level API '${user.role}'`, async ({page, request})=> {

        const loginModel = new LoginModel(page);
        const ajv = new Ajv();

        await page.goto(url);
        await loginModel.login(user.username, user.password);

        const responsePromise = getAPIToken(page);
        
        const responseToken = await responsePromise;
        const data  = await responseToken.json();

        let accessToken = "Bearer " + data["access_token"];

        const uniqueId = uuidv4();
        let pageName = ("PageAPI" + uniqueId).slice(0, 30);
        let pathName = ("PathAPI" + uniqueId).slice(0, 30);

        let urlAPI: string = `https://${apiUrl}/api/v1/brands/${nodesData.newBrandContentHash}/nodes/${nodesData.brandNodeHash}/pages`;

        const response = await request.post( urlAPI, 
        {
            headers: {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en",
                "authorization": accessToken,
                "content-type": "application/json",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "Referer": "https://admin.canary.sale/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
                data: {"name":[{"languageCode":"EN","languageName":"English","translation": pageName,"default":true}], "path": pathName,"priority":""}
        });
        
        if(user.role == "Store Owner"){
            const responseJSON = await response.json();

            const valid = ajv.validate(require('../../schemas/notAuthorizedSchema.json'), responseJSON);
    
            // Output the errors text
            if (!valid) {
                console.error('AJV Validation Errors:', ajv.errorsText());
            }
            
            // If the JSON is valid, the variable is "true"
            expect(valid).toBe(true);
            expect(response.status()).toEqual(401);
        } else {
            const responseJSON = await response.json();

            const valid = ajv.validate(require('../../schemas/pagesCreationSchema.json'), responseJSON);
    
            // Output the errors text
            if (!valid) {
                console.error('AJV Validation Errors:', ajv.errorsText());
            }
            
            // If the JSON is valid, the variable is "true"
            expect(valid).toBe(true);
            expect(response.status()).toEqual(200);
    
            let pageId = responseJSON['hash'];
    
            const responseDelete = await request.delete(urlAPI + `/${pageId}`, {
                "headers": {
                    "accept": "application/json, text/plain, */*",
                    "accept-language": "en",
                    "authorization": accessToken,
                    "priority": "u=1, i",
                    "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"macOS\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                    "Referer": "https://admin.canary.sale/",
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                    },
                    data: null
            });
        }
 
    });


    test(`Verify that the user can delete pages at brand level API '${user.role}'`, async ({page, request})=> {

        const loginModel = new LoginModel(page);
        const ajv = new Ajv();

        await page.goto(url);
        await loginModel.login(user.username, user.password);

        const responsePromise = getAPIToken(page);
        
        const responseToken = await responsePromise;
        const data  = await responseToken.json();

        let accessToken = "Bearer " + data["access_token"];

        const uniqueId = uuidv4();
        let pageName = ("PageAPI" + uniqueId).slice(0, 30);
        let pathName = ("PathAPI" + uniqueId).slice(0, 30);

        let urlAPI: string = `https://${apiUrl}/api/v1/brands/${nodesData.newBrandContentHash}/nodes/${nodesData.brandNodeHash}/pages`;

        const response = await request.post( urlAPI, 
        {
            headers: {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en",
                "authorization": accessToken,
                "content-type": "application/json",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "Referer": "https://admin.canary.sale/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
                data: {"name":[{"languageCode":"EN","languageName":"English","translation": pageName,"default":true}], "path": pathName,"priority":""}
        });
        
        const responseJSON = await response.json();

        if(user.role == "Store Owner"){
            const responseJSON = await response.json();

            const valid = ajv.validate(require('../../schemas/notAuthorizedSchema.json'), responseJSON);
    
            // Output the errors text
            if (!valid) {
                console.error('AJV Validation Errors:', ajv.errorsText());
            }
            
            // If the JSON is valid, the variable is "true"
            expect(valid).toBe(true);
            expect(response.status()).toEqual(401);
        } else {

            let pageId = responseJSON['hash'];

            const responseDelete = await request.delete(urlAPI + `/${pageId}`, {
                "headers": {
                    "accept": "application/json, text/plain, */*",
                    "accept-language": "en",
                    "authorization": accessToken,
                    "priority": "u=1, i",
                    "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"macOS\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                    "Referer": "https://admin.canary.sale/",
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                    },
                    data: null
            });

            expect(responseDelete.status()).toEqual(204);
        }
    });

    test(`Verify that the user can add a subpage at brand level API '${user.role}'`, async ({page, request})=> {

        const loginModel = new LoginModel(page);
        const ajv = new Ajv();

        await page.goto(url);
        await loginModel.login(user.username, user.password);

        const responsePromise = getAPIToken(page);
        
        const responseToken = await responsePromise;
        const data  = await responseToken.json();

        let accessToken = "Bearer " + data["access_token"];

        const uniqueId = uuidv4();
        let pageName = ("PageAPI" + uniqueId).slice(0, 30);
        let pathName = ("PathAPI" + uniqueId).slice(0, 30);

        let urlAPI: string = `https://${apiUrl}/api/v1/brands/${nodesData.newBrandContentHash}/nodes/${nodesData.brandNodeHash}/pages`;

        const response = await request.post( urlAPI, 
        {
            headers: {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en",
                "authorization": accessToken,
                "content-type": "application/json",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "Referer": "https://admin.canary.sale/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
                data: {"name":[{"languageCode":"EN","languageName":"English","translation": pageName,"default":true}], "path": pathName,"priority":""}
        });
        
        const responseJSON = await response.json();

        if(user.role == "Store Owner"){
            const responseJSON = await response.json();

            const valid = ajv.validate(require('../../schemas/notAuthorizedSchema.json'), responseJSON);
    
            // Output the errors text
            if (!valid) {
                console.error('AJV Validation Errors:', ajv.errorsText());
            }
            
            // If the JSON is valid, the variable is "true"
            expect(valid).toBe(true);
            expect(response.status()).toEqual(401);
        } else {

            const valid = ajv.validate(require('../../schemas/pagesCreationSchema.json'), responseJSON);

            // Output the errors text
            if (!valid) {
                console.error('AJV Validation Errors:', ajv.errorsText());
            }
            
            // If the JSON is valid, the variable is "true"
            expect(valid).toBe(true);
            expect(response.status()).toEqual(200);

            let pageId = responseJSON['hash'];

            const uniqueId2 = uuidv4();
            let subPageName = ("SubPageAPI" + uniqueId2).slice(0, 30);
            let subPagePathName = ("SubPathAPI" + uniqueId2).slice(0, 30);

            const responseSubpage = await request.post( urlAPI +`/${pageId}`, 
                {
                    headers: {
                        "accept": "application/json, text/plain, */*",
                        "accept-language": "en",
                        "authorization": accessToken,
                        "content-type": "application/json",
                        "priority": "u=1, i",
                        "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": "\"macOS\"",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-site",
                        "Referer": "https://admin.canary.sale/",
                        "Referrer-Policy": "strict-origin-when-cross-origin"
                    },
                        data: {"name":[{"languageCode":"EN","languageName":"English","translation": subPageName,"default":true}], "path": subPagePathName,"priority":""}
                });

            const responseSubpageJSON = await responseSubpage.json();

            const valid2 = ajv.validate(require('../../schemas/pagesCreationSchema.json'), responseSubpageJSON);

            // Output the errors text
            if (!valid2) {
                console.error('AJV Validation Errors:', ajv.errorsText());
            }
            
            // If the JSON is valid, the variable is "true"
            expect(valid2).toBe(true);
            expect(response.status()).toEqual(200);

            let subPageId = responseSubpageJSON['hash'];

            const responseDeleteSubpage = await request.delete(urlAPI + `/${subPageId}`, {
                "headers": {
                    "accept": "application/json, text/plain, */*",
                    "accept-language": "en",
                    "authorization": accessToken,
                    "priority": "u=1, i",
                    "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"macOS\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                    "Referer": "https://admin.canary.sale/",
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                    },
                    data: null
            });

            const responseDeletePage = await request.delete(urlAPI + `/${pageId}`, {
                "headers": {
                    "accept": "application/json, text/plain, */*",
                    "accept-language": "en",
                    "authorization": accessToken,
                    "priority": "u=1, i",
                    "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"macOS\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                    "Referer": "https://admin.canary.sale/",
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                    },
                    data: null
            });

        }

    });

    test(`Verify that the user can delete a subpage at brand node level API '${user.role}'`, async ({page, request})=> {

        const loginModel = new LoginModel(page);
        const ajv = new Ajv();

        await page.goto(url);
        await loginModel.login(user.username, user.password);

        const responsePromise = getAPIToken(page);
        
        const responseToken = await responsePromise;
        const data  = await responseToken.json();

        let accessToken = "Bearer " + data["access_token"];

        const uniqueId = uuidv4();
        let pageName = ("PageAPI" + uniqueId).slice(0, 30);
        let pathName = ("PathAPI" + uniqueId).slice(0, 30);

        let urlAPI: string = `https://${apiUrl}/api/v1/brands/${nodesData.newBrandContentHash}/nodes/${nodesData.brandNodeHash}/pages`;

        const response = await request.post( urlAPI, 
        {
            headers: {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en",
                "authorization": accessToken,
                "content-type": "application/json",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "Referer": "https://admin.canary.sale/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
                data: {"name":[{"languageCode":"EN","languageName":"English","translation": pageName,"default":true}], "path": pathName,"priority":""}
        });

        if(user.role == "Store Owner"){
            const responseJSON = await response.json();

            const valid = ajv.validate(require('../../schemas/notAuthorizedSchema.json'), responseJSON);
    
            // Output the errors text
            if (!valid) {
                console.error('AJV Validation Errors:', ajv.errorsText());
            }
            
            // If the JSON is valid, the variable is "true"
            expect(valid).toBe(true);
            expect(response.status()).toEqual(401);
        } else {

            const responseJSON = await response.json();
            let pageId = responseJSON['hash'];

            const uniqueId2 = uuidv4();
            let subPageName = ("SubPageAPI" + uniqueId2).slice(0, 30);
            let subPagePathName = ("SubPathAPI" + uniqueId2).slice(0, 30);

            const responseSubpage = await request.post( urlAPI +`/${pageId}`, 
                {
                    headers: {
                        "accept": "application/json, text/plain, */*",
                        "accept-language": "en",
                        "authorization": accessToken,
                        "content-type": "application/json",
                        "priority": "u=1, i",
                        "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": "\"macOS\"",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-site",
                        "Referer": "https://admin.canary.sale/",
                        "Referrer-Policy": "strict-origin-when-cross-origin"
                    },
                        data: {"name":[{"languageCode":"EN","languageName":"English","translation": subPageName,"default":true}], "path": subPagePathName,"priority":""}
                });

            const responseSubpageJSON = await responseSubpage.json();
            

            let subPageId = responseSubpageJSON['hash'];

            const responseDeleteSubpage = await request.delete(urlAPI + `/${subPageId}`, {
                "headers": {
                    "accept": "application/json, text/plain, */*",
                    "accept-language": "en",
                    "authorization": accessToken,
                    "priority": "u=1, i",
                    "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"macOS\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                    "Referer": "https://admin.canary.sale/",
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                    },
                    data: null
            });

            expect(responseDeleteSubpage.status()).toEqual(204);

            const responseDeletePage = await request.delete(urlAPI + `/${pageId}`, {
                "headers": {
                    "accept": "application/json, text/plain, */*",
                    "accept-language": "en",
                    "authorization": accessToken,
                    "priority": "u=1, i",
                    "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"macOS\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                    "Referer": "https://admin.canary.sale/",
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                    },
                    data: null
            });

            expect(responseDeletePage.status()).toEqual(204);
        }

    });

    test(`Verify that the user can add a new page at subbrand level API '${user.role}'`, async ({page, request})=> {

        const loginModel = new LoginModel(page);
        const ajv = new Ajv();

        await page.goto(url);
        await loginModel.login(user.username, user.password);

        const responsePromise = getAPIToken(page);
        
        const responseToken = await responsePromise;
        const data  = await responseToken.json();

        let accessToken = "Bearer " + data["access_token"];

        const uniqueId = uuidv4();
        let pageName = ("PageAPI" + uniqueId).slice(0, 30);
        let pathName = ("PathAPI" + uniqueId).slice(0, 30);

        let urlAPI: string = `https://${apiUrl}/api/v1/brands/${nodesData.newBrandContentHash}/nodes/${nodesData.newSubBrandContent}/pages`;

        const response = await request.post( urlAPI, 
        {
            headers: {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en",
                "authorization": accessToken,
                "content-type": "application/json",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "Referer": "https://admin.canary.sale/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
                data: {"name":[{"languageCode":"EN","languageName":"English","translation": pageName,"default":true}], "path": pathName,"priority":""}
        });
        
        if(user.role == "Store Owner"){
            const responseJSON = await response.json();

            const valid = ajv.validate(require('../../schemas/notAuthorizedSchema.json'), responseJSON);
    
            // Output the errors text
            if (!valid) {
                console.error('AJV Validation Errors:', ajv.errorsText());
            }
            
            // If the JSON is valid, the variable is "true"
            expect(valid).toBe(true);
            expect(response.status()).toEqual(401);
        } else {

            const responseJSON = await response.json();

            const valid = ajv.validate(require('../../schemas/pagesCreationSchema.json'), responseJSON);

            // Output the errors text
            if (!valid) {
                console.error('AJV Validation Errors:', ajv.errorsText());
            }
            
            // If the JSON is valid, the variable is "true"
            expect(valid).toBe(true);
            expect(response.status()).toEqual(200);

            let pageId = responseJSON['hash'];

            const responseDelete = await request.delete(urlAPI + `/${pageId}`, {
                "headers": {
                    "accept": "application/json, text/plain, */*",
                    "accept-language": "en",
                    "authorization": accessToken,
                    "priority": "u=1, i",
                    "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"macOS\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                    "Referer": "https://admin.canary.sale/",
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                    },
                    data: null
            });
        }
    });

    test(`Verify that the user can delete a page at subbrand level API '${user.role}'`, async ({page, request})=> {

        const loginModel = new LoginModel(page);
        const ajv = new Ajv();

        await page.goto(url);
        await loginModel.login(user.username, user.password);

        const responsePromise = getAPIToken(page);
        
        const responseToken = await responsePromise;
        const data  = await responseToken.json();

        let accessToken = "Bearer " + data["access_token"];

        const uniqueId = uuidv4();
        let pageName = ("PageAPI" + uniqueId).slice(0, 30);
        let pathName = ("PathAPI" + uniqueId).slice(0, 30);

        let urlAPI: string = `https://${apiUrl}/api/v1/brands/${nodesData.newBrandContentHash}/nodes/${nodesData.newSubBrandContent}/pages`;

        const response = await request.post( urlAPI, 
        {
            headers: {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en",
                "authorization": accessToken,
                "content-type": "application/json",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "Referer": "https://admin.canary.sale/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
                data: {"name":[{"languageCode":"EN","languageName":"English","translation": pageName,"default":true}], "path": pathName,"priority":""}
        });
        
        if(user.role == "Store Owner"){
            const responseJSON = await response.json();

            const valid = ajv.validate(require('../../schemas/notAuthorizedSchema.json'), responseJSON);
    
            // Output the errors text
            if (!valid) {
                console.error('AJV Validation Errors:', ajv.errorsText());
            }
            
            // If the JSON is valid, the variable is "true"
            expect(valid).toBe(true);
            expect(response.status()).toEqual(401);
        } else {

            const responseJSON = await response.json();

            let pageId = responseJSON['hash'];

            const responseDelete = await request.delete(urlAPI + `/${pageId}`, {
                "headers": {
                    "accept": "application/json, text/plain, */*",
                    "accept-language": "en",
                    "authorization": accessToken,
                    "priority": "u=1, i",
                    "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"macOS\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                    "Referer": "https://admin.canary.sale/",
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                    },
                    data: null
            });

            expect(responseDelete.status()).toEqual(204);
        }    
    });

    test(`Verify that the user can add a subpage at sub brand level API '${user.role}'`, async ({page, request})=> {

        const loginModel = new LoginModel(page);
        const ajv = new Ajv();

        await page.goto(url);
        await loginModel.login(user.username, user.password);

        const responsePromise = getAPIToken(page);
        
        const responseToken = await responsePromise;
        const data  = await responseToken.json();

        let accessToken = "Bearer " + data["access_token"];

        const uniqueId = uuidv4();
        let pageName = ("PageAPI" + uniqueId).slice(0, 30);
        let pathName = ("PathAPI" + uniqueId).slice(0, 30);

        let urlAPI: string = `https://${apiUrl}/api/v1/brands/${nodesData.newBrandContentHash}/nodes/${nodesData.newSubBrandContent}/pages`;

        const response = await request.post( urlAPI, 
        {
            headers: {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en",
                "authorization": accessToken,
                "content-type": "application/json",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "Referer": "https://admin.canary.sale/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
                data: {"name":[{"languageCode":"EN","languageName":"English","translation": pageName,"default":true}], "path": pathName,"priority":""}
        });
        
        const responseJSON = await response.json();

        if(user.role == "Store Owner"){
            const responseJSON = await response.json();

            const valid = ajv.validate(require('../../schemas/notAuthorizedSchema.json'), responseJSON);
    
            // Output the errors text
            if (!valid) {
                console.error('AJV Validation Errors:', ajv.errorsText());
            }
            
            // If the JSON is valid, the variable is "true"
            expect(valid).toBe(true);
            expect(response.status()).toEqual(401);
        } else {

            const valid = ajv.validate(require('../../schemas/pagesCreationSchema.json'), responseJSON);

            // Output the errors text
            if (!valid) {
                console.error('AJV Validation Errors:', ajv.errorsText());
            }
            
            // If the JSON is valid, the variable is "true"
            expect(valid).toBe(true);
            expect(response.status()).toEqual(200);

            let pageId = responseJSON['hash'];

            const uniqueId2 = uuidv4();
            let subPageName = ("SubPageAPI" + uniqueId2).slice(0, 30);
            let subPagePathName = ("SubPathAPI" + uniqueId2).slice(0, 30);

            const responseSubpage = await request.post( urlAPI +`/${pageId}`, 
                {
                    headers: {
                        "accept": "application/json, text/plain, */*",
                        "accept-language": "en",
                        "authorization": accessToken,
                        "content-type": "application/json",
                        "priority": "u=1, i",
                        "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": "\"macOS\"",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-site",
                        "Referer": "https://admin.canary.sale/",
                        "Referrer-Policy": "strict-origin-when-cross-origin"
                    },
                        data: {"name":[{"languageCode":"EN","languageName":"English","translation": subPageName,"default":true}], "path": subPagePathName,"priority":""}
                });

            const responseSubpageJSON = await responseSubpage.json();

            const valid2 = ajv.validate(require('../../schemas/pagesCreationSchema.json'), responseSubpageJSON);

            // Output the errors text
            if (!valid2) {
                console.error('AJV Validation Errors:', ajv.errorsText());
            }
            
            // If the JSON is valid, the variable is "true"
            expect(valid2).toBe(true);
            expect(response.status()).toEqual(200);

            let subPageId = responseSubpageJSON['hash'];

            const responseDeleteSubpage = await request.delete(urlAPI + `/${subPageId}`, {
                "headers": {
                    "accept": "application/json, text/plain, */*",
                    "accept-language": "en",
                    "authorization": accessToken,
                    "priority": "u=1, i",
                    "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"macOS\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                    "Referer": "https://admin.canary.sale/",
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                    },
                    data: null
            });

            const responseDeletePage = await request.delete(urlAPI + `/${pageId}`, {
                "headers": {
                    "accept": "application/json, text/plain, */*",
                    "accept-language": "en",
                    "authorization": accessToken,
                    "priority": "u=1, i",
                    "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"macOS\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                    "Referer": "https://admin.canary.sale/",
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                    },
                    data: null
            });

        }

    });

    test(`Verify that it is possible to delete at subpage at sub brand level API '${user.role}'`, async ({page, request})=> {

        const loginModel = new LoginModel(page);
        const ajv = new Ajv();

        await page.goto(url);
        await loginModel.login(user.username, user.password);

        const responsePromise = getAPIToken(page);
        
        const responseToken = await responsePromise;
        const data  = await responseToken.json();

        let accessToken = "Bearer " + data["access_token"];

        const uniqueId = uuidv4();
        let pageName = ("PageAPI" + uniqueId).slice(0, 30);
        let pathName = ("PathAPI" + uniqueId).slice(0, 30);

        let urlAPI: string = `https://${apiUrl}/api/v1/brands/${nodesData.newBrandContentHash}/nodes/${nodesData.newSubBrandContent}/pages`;

        const response = await request.post( urlAPI, 
        {
            headers: {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en",
                "authorization": accessToken,
                "content-type": "application/json",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "Referer": "https://admin.canary.sale/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
                data: {"name":[{"languageCode":"EN","languageName":"English","translation": pageName,"default":true}], "path": pathName,"priority":""}
        });
        
        const responseJSON = await response.json();

        if(user.role == "Store Owner"){
            const responseJSON = await response.json();

            const valid = ajv.validate(require('../../schemas/notAuthorizedSchema.json'), responseJSON);
    
            // Output the errors text
            if (!valid) {
                console.error('AJV Validation Errors:', ajv.errorsText());
            }
            
            // If the JSON is valid, the variable is "true"
            expect(valid).toBe(true);
            expect(response.status()).toEqual(401);
        } else {

            let pageId = responseJSON['hash'];

            const uniqueId2 = uuidv4();
            let subPageName = ("SubPageAPI" + uniqueId2).slice(0, 30);
            let subPagePathName = ("SubPathAPI" + uniqueId2).slice(0, 30);

            const responseSubpage = await request.post( urlAPI +`/${pageId}`, 
                {
                    headers: {
                        "accept": "application/json, text/plain, */*",
                        "accept-language": "en",
                        "authorization": accessToken,
                        "content-type": "application/json",
                        "priority": "u=1, i",
                        "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": "\"macOS\"",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-site",
                        "Referer": "https://admin.canary.sale/",
                        "Referrer-Policy": "strict-origin-when-cross-origin"
                    },
                        data: {"name":[{"languageCode":"EN","languageName":"English","translation": subPageName,"default":true}], "path": subPagePathName,"priority":""}
                });

            const responseSubpageJSON = await responseSubpage.json();

            let subPageId = responseSubpageJSON['hash'];

            const responseDeleteSubpage = await request.delete(urlAPI + `/${subPageId}`, {
                "headers": {
                    "accept": "application/json, text/plain, */*",
                    "accept-language": "en",
                    "authorization": accessToken,
                    "priority": "u=1, i",
                    "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"macOS\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                    "Referer": "https://admin.canary.sale/",
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                    },
                    data: null
            });

            expect(responseDeleteSubpage.status()).toEqual(204);

            const responseDeletePage = await request.delete(urlAPI + `/${pageId}`, {
                "headers": {
                    "accept": "application/json, text/plain, */*",
                    "accept-language": "en",
                    "authorization": accessToken,
                    "priority": "u=1, i",
                    "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"macOS\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                    "Referer": "https://admin.canary.sale/",
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                    },
                    data: null
            });

            expect(responseDeletePage.status()).toEqual(204);
        }

    });

    test(`Verify that the user can not create a page with a name already on use API'${user.role}'`, async ({page, request})=> {

        const loginModel = new LoginModel(page);
        const ajv = new Ajv();

        await page.goto(url);
        await loginModel.login(user.username, user.password);

        const responsePromise = getAPIToken(page);
        
        const responseToken = await responsePromise;
        const data  = await responseToken.json();

        let accessToken = "Bearer " + data["access_token"];

        const uniqueId = uuidv4();
        let pageName = ("PageAPI" + uniqueId).slice(0, 30);
        let pathName = ("PathAPI" + uniqueId).slice(0, 30);
        const uniqueId2 = uuidv4();
        let pathName2 = ("PathAPI" + uniqueId2).slice(0, 30);

        let urlAPI: string = `https://${apiUrl}/api/v1/brands/${nodesData.newBrandContentHash}/nodes/${nodesData.brandNodeHash}/pages`;

        const response = await request.post( urlAPI, 
        {
            headers: {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en",
                "authorization": accessToken,
                "content-type": "application/json",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "Referer": "https://admin.canary.sale/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
                data: {"name":[{"languageCode":"EN","languageName":"English","translation": pageName,"default":true}], "path": pathName,"priority":""}
        });
        
        const responseJSON = await response.json();

        if(user.role == "Store Owner"){
            const responseJSON = await response.json();

            const valid = ajv.validate(require('../../schemas/notAuthorizedSchema.json'), responseJSON);
    
            // Output the errors text
            if (!valid) {
                console.error('AJV Validation Errors:', ajv.errorsText());
            }
            
            // If the JSON is valid, the variable is "true"
            expect(valid).toBe(true);
            expect(response.status()).toEqual(401);
        } else {

            let pageId = responseJSON['hash'];

            const valid = ajv.validate(require('../../schemas/pagesCreationSchema.json'), responseJSON);
    
            // Output the errors text
            if (!valid) {
                console.error('AJV Validation Errors:', ajv.errorsText());
            }
            
            // If the JSON is valid, the variable is "true"
            expect(valid).toBe(true);
            expect(response.status()).toEqual(200);

            const responseName = await request.post( urlAPI, 
                {
                    headers: {
                        "accept": "application/json, text/plain, */*",
                        "accept-language": "en",
                        "authorization": accessToken,
                        "content-type": "application/json",
                        "priority": "u=1, i",
                        "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": "\"macOS\"",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-site",
                        "Referer": "https://admin.canary.sale/",
                        "Referrer-Policy": "strict-origin-when-cross-origin"
                    },
                    data: {"name":[{"languageCode":"EN","languageName":"English","translation": pageName,"default":true}], "path": pathName2,"priority":""}
            });

            const responseNameJSON = await responseName.json();
            
            const validName = ajv.validate(require('../../schemas/defaultNameSchemaPages.json'), responseNameJSON);
    
            // Output the errors text
            if (!validName) {
                console.error('AJV Validation Errors:', ajv.errorsText());
            }
            
            // If the JSON is valid, the variable is "true"
            expect(validName).toBe(true);
            expect(responseName.status()).toEqual(422);

            const responseDelete = await request.delete(urlAPI + `/${pageId}`, {
                "headers": {
                    "accept": "application/json, text/plain, */*",
                    "accept-language": "en",
                    "authorization": accessToken,
                    "priority": "u=1, i",
                    "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"macOS\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                    "Referer": "https://admin.canary.sale/",
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                    },
                data: null
            });

        }

    });

    test(`Verify that when a new page is created a new category is created by default with the page name at brand level API '${user.role}'`, async ({page, request})=> {

        const loginModel = new LoginModel(page);
        const ajv = new Ajv();

        await page.goto(url);
        await loginModel.login(user.username, user.password);

        const responsePromise = getAPIToken(page);
        
        const responseToken = await responsePromise;
        const data  = await responseToken.json();

        let accessToken = "Bearer " + data["access_token"];

        const uniqueId = uuidv4();
        let pageName = ("PageAPI" + uniqueId).slice(0, 30);
        let pathName = ("PathAPI" + uniqueId).slice(0, 30);

        let urlAPI: string = `https://${apiUrl}/api/v1/brands/${nodesData.newBrandContentHash}/nodes/${nodesData.brandNodeHash}/pages`;

        const response = await request.post( urlAPI, 
        {
            headers: {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en",
                "authorization": accessToken,
                "content-type": "application/json",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "Referer": "https://admin.canary.sale/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
                data: {"name":[{"languageCode":"EN","languageName":"English","translation": pageName,"default":true}], "path": pathName,"priority":""}
        });
        
        const responseJSON = await response.json();

        if(user.role == "Store Owner"){
            const responseJSON = await response.json();

            const valid = ajv.validate(require('../../schemas/notAuthorizedSchema.json'), responseJSON);
    
            // Output the errors text
            if (!valid) {
                console.error('AJV Validation Errors:', ajv.errorsText());
            }
            
            // If the JSON is valid, the variable is "true"
            expect(valid).toBe(true);
            expect(response.status()).toEqual(401);
        } else {

            let pageId = responseJSON['hash'];

            const valid = ajv.validate(require('../../schemas/pagesCreationSchema.json'), responseJSON);
    
            // Output the errors text
            if (!valid) {
                console.error('AJV Validation Errors:', ajv.errorsText());
            }
            
            // If the JSON is valid, the variable is "true"
            expect(valid).toBe(true);
            expect(response.status()).toEqual(200);

            let urlCategoryAPI: string = `https://${apiUrl}/api/v1/brands/${nodesData.newBrandContentHash}/nodes/${nodesData.brandNodeHash}/categories`;

            const responseCategory = await request.post( urlCategoryAPI, 
                {
                    headers: {
                        "accept": "application/json, text/plain, */*",
                        "accept-language": "en",
                        "authorization": accessToken,
                        "content-type": "application/json",
                        "priority": "u=1, i",
                        "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": "\"macOS\"",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-site",
                        "Referer": "https://admin.canary.sale/",
                        "Referrer-Policy": "strict-origin-when-cross-origin"
                    },
                        data: { "name":[ { "languageCode": "EN", "translation": pageName } ], "path": pathName, "priority": "", "pageHash": "7ve3a0Yx" }
                });

                const responseCategoryJSON = await responseCategory.json();

                const validCategory = ajv.validate(require('../../schemas/categoryCreatedForPage.json'), responseCategoryJSON);
    
                // Output the errors text
                if (!validCategory) {
                    console.error('AJV Validation Errors:', ajv.errorsText());
                }
                
                // If the JSON is valid, the variable is "true"
                expect(validCategory).toBe(true);
                expect(responseCategory.status()).toEqual(200);


            const responseDelete = await request.delete(urlAPI + `/${pageId}`, {
                "headers": {
                    "accept": "application/json, text/plain, */*",
                    "accept-language": "en",
                    "authorization": accessToken,
                    "priority": "u=1, i",
                    "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"macOS\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                    "Referer": "https://admin.canary.sale/",
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                    },
                data: null
            });

        }

    });

});