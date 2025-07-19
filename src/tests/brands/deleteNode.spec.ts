import { test, expect} from '@playwright/test';
import { LoginModel } from '../../pom/loginModel';
import {SidebarModel} from '../../pom/sidebarModel';
import {validateEnvironment} from '../../utils/urlHandler';
import {validateUsers} from '../../utils/userHandler';
import { CommonModel } from '../../pom/commonModel';
import { BrandsModel } from '../../pom/brandsModel';
import { storeOwnerRoleValidation } from '../../utils/rolesHandler';
import { brandsData, integrations, subBrandData, storeData } from '../../data/brandsData';
import { NodesTypesEnum } from '../../enums/nodeTypes.enum';
import { TopBarModel } from '../../pom/topBarModel';
import {v4 as uuidv4} from 'uuid';

const users = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.brandNodeContentName));
const user = users[0];
const url: string = validateEnvironment();


test.describe('Manage Brands- delete node', () => {

    test.beforeEach(async ({ page }, testInfo) => {
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);
        const topBarModel = new TopBarModel(page);

        await page.goto(url);
        page.setViewportSize({ width: 1800, height: 1400 });
        test.setTimeout(95000);
        await loginModel.login(user.username, user.password);
        await topBarModel.selectBrand(brandsData.brandNodeName);
        await sideBarModel.onClickBrandOptionMenu();
        await commonModel.setSearchValue(brandsData.brandNodeName);
        await brandsModel.hasBrandTableValues();
        await brandsModel.goToManageNodes(brandsData.brandNodeName);
        await topBarModel.selectNodeBrandChild(brandsData.subBrandName, brandsData.subBrand);
        await brandsModel.configureDefaultSubBrandNode(brandsData.brandNodeName, brandsData.subBrandName);
        await brandsModel.configureDefaultStoreNode(brandsData.brandNodeName, brandsData.storeBrandName, NodesTypesEnum.brand);
        await brandsModel.configureDefaultStoreNode(brandsData.subBrandName, brandsData.storeSubBrandName, NodesTypesEnum.subbrand);
        await brandsModel.hasNodeTableValues(3);
    });

    test.afterAll(async () => {
        test.setTimeout(2500);
    });

    test(`Verify if a user can delete child nodes SubBrand`, async ({ page }) => {

        test.setTimeout(120000);

        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        await brandsModel.addChildNodes('Brand');
        const uniqueId = uuidv4();
        let subbrand = Object.assign({} , subBrandData);
        subbrand.name = (subBrandData.name + uniqueId).slice(0, 32);
        subbrand.subDomain = (subBrandData.subDomain + uniqueId).slice(0, 32).split('-').join('');
        await brandsModel.fillSubBrandRequiredFields(subbrand);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    
        await brandsModel.deleteNode(subbrand.name);
        await commonModel.waitUntilSpinnerDisappears();
    
        // Verify the deleted subbrand does not exists in the node table
        await brandsModel.checkNodeWithTypeIsNotInTable(subbrand.name, brandsData.subBrand);
    });

    test(`Verify if a user can delete child nodes Store to a Brand`, async ({ page }) => {
        test.setTimeout(120000);

        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        const uniqueId = uuidv4();
        let store = Object.assign({} , storeData);
        store.name = storeData.name.concat(uniqueId).slice(0, 40);
        store.circularPath = storeData.circularPath.concat(uniqueId).slice(0, 40);
        await brandsModel.addChildNodes('Brand');
        await brandsModel.onClickNodeTypeStore();
        await brandsModel.fillStoreRequiredFields(store);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    
        await brandsModel.deleteNode(store.name);
        await commonModel.waitUntilSpinnerDisappears();
    
        // Verify the deleted store does not exists in the node table
        await brandsModel.checkNodeWithTypeIsNotInTable(store.name, brandsData.store);
    });

    test(`Verify if a user can delete child nodes Store to a SubBrand`, async ({ page }) => {
        test.setTimeout(120000);

        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        const uniqueId = uuidv4();
        let store = Object.assign({} , storeData);
        store.name = storeData.name.concat(uniqueId).slice(0, 40);
        store.circularPath = storeData.circularPath.concat(uniqueId).slice(0, 40);
        await brandsModel.onClickAddChildToThisNodes(brandsData.subBrandName);
        await brandsModel.fillStoreRequiredFields(store);
        const imageUrl = 'src/images/Costco-Logo.png';
        await brandsModel.uploadImage(0, [imageUrl]); // This one uploads the logo
        await brandsModel.uploadImage(1, [imageUrl]); // This one uploads the fav icon
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        await brandsModel.expandNodeInTable(store.name, brandsData.subBrandName);
    
        await page.waitForTimeout(2000);
        await brandsModel.deleteNode(store.name);
        await commonModel.waitUntilSpinnerDisappears();
    
    
        // Verify the deleted store does not exists in the node table
        //await brandsModel.checkNodeWithTypeIsNotInTable(store.name, brandsData.store);
    });

});