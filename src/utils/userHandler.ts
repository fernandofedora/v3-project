import dotenv from 'dotenv';
import { UserDto } from '../dto/user.dto';
import { RolesEnum } from '../enums/roles.enum';
import { brandsData } from '../data/brandsData';
dotenv.config();

export function validateUsers() {

    let users: UserDto[] = [];
    let environmentValue: string = `${process.env.TEST_ENVIRONMENT}`;

    switch(environmentValue) {
        case "qa": {
            users = [
                {
                    role: RolesEnum.superAdmin,
                    username:`${process.env.QA_SUPERADMIN_USERNAME}`,
                    password:`${process.env.QA_SUPERADMIN_PASSWORD}`,
                },
                {
                    role: RolesEnum.admin,
                    username:`${process.env.QA_ADMIN_USERNAME}`,
                    password:`${process.env.QA_ADMIN_PASSWORD}`
                },
                {
                    role: RolesEnum.storeOwner,
                    username:`${process.env.QA_STOREOWNER_USERNAME}`,
                    password:`${process.env.QA_STOREOWNER_PASSWORD}`
                },
                {
                    role: RolesEnum.storeOwner,
                    username:`${process.env.QA_STOREOWNER5_USERNAME}`,
                    password:`${process.env.QA_STOREOWNER5_PASSWORD}`,
                    node: brandsData.onlyContent
                },
            ]
            break;
        }
        case "staging": {
            users = [
                {
                    role: RolesEnum.superAdmin,
                    username:`${process.env.STAGING_SUPERADMIN_USERNAME}`,
                    password:`${process.env.STAGING_SUPERADMIN_PASSWORD}`
                },
                {
                    role: RolesEnum.admin,
                    username:`${process.env.STAGING_ADMIN_USERNAME}`,
                    password:`${process.env.STAGING_ADMIN_PASSWORD}`
                },
                {
                    role: RolesEnum.storeOwner,
                    username:`${process.env.STAGING_STOREOWNER4_USERNAME}`,
                    password:`${process.env.STAGING_STOREOWNER4_PASSWORD}`,
                    node: brandsData.onlyPages,
                },
                {
                    role: RolesEnum.storeOwner,
                    username:`${process.env.STAGING_STOREOWNER_USERNAME}`,
                    password:`${process.env.STAGING_STOREOWNER_PASSWORD}`,
                    node: brandsData.brandNodeContentName
                },
                {
                    role: RolesEnum.storeOwner,
                    username:`${process.env.STAGING_STOREOWNER5_USERNAME}`,
                    password:`${process.env.STAGING_STOREOWNER5_PASSWORD}`,
                    node: brandsData.onlyContent
                },
            ]
            break;
        }

        case "automation": {
            users = [
                {
                    role: RolesEnum.superAdmin,
                    username:`${process.env.AUTOMATION_SUPERADMIN_USERNAME}`,
                    password:`${process.env.AUTOMATION_SUPERADMIN_PASSWORD}`
                },
                {
                    role: RolesEnum.admin,
                    username:`${process.env.AUTOMATION_ADMIN_USERNAME}`,
                    password:`${process.env.AUTOMATION_ADMIN_PASSWORD}`
                },
                {
                    role: RolesEnum.storeOwner,
                    username:`${process.env.AUTOMATION_STOREOWNER_USERNAME}`,
                    password:`${process.env.AUTOMATION_STOREOWNER_PASSWORD}`,
                    node: brandsData.brandNodeContentName
                },
                {
                    role: RolesEnum.storeOwner,
                    username:`${process.env.AUTOMATION_STOREOWNER2_USERNAME}`,
                    password:`${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`,
                    node: brandsData.brandNodeNameEn
                },
                {
                    role: RolesEnum.storeOwner,
                    username:`${process.env.AUTOMATION_STOREOWNER3_USERNAME}`,
                    password:`${process.env.AUTOMATION_STOREOWNER3_PASSWORD}`,
                    node: brandsData.brandNodeNameEs
                },
                {
                    role: RolesEnum.storeOwner,
                    username:`${process.env.AUTOMATION_STOREOWNER5_USERNAME}`,
                    password:`${process.env.AUTOMATION_STOREOWNER5_PASSWORD}`,
                    node: brandsData.onlyContent
                },
                {
                    role: RolesEnum.storeOwner,
                    username:`${process.env.AUTOMATION_STOREOWNER7_USERNAME}`,
                    password:`${process.env.AUTOMATION_STOREOWNER7_PASSWORD}`,
                    node: brandsData.brandNodeName
                }
            ]
            break;
        }
        default: {
            console.log("No valid environment only: qa, staging or automation");
            break;
        }
    }

    return users;
}


export function selectStoreOwner(module: string){
    let username: string;
    let password: string;

    let environmentValue: string = `${process.env.TEST_ENVIRONMENT}`;

    if(environmentValue == 'automation' && module == 'pages' ){
        username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
        password = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
    }

    if(environmentValue == 'staging' && module == 'pages' ){
        username = `${process.env.STAGING_STOREOWNER4_USERNAME}`
        password = `${process.env.STAGING_STOREOWNER4_USERNAME}`
    }

    return [username!, password!] as const
}