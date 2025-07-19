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


test.describe('Manage Brands - coupons integrations', () => {

    test.describe.configure({ mode: 'serial' });

    test.beforeEach(async ({ page }, testInfo) => {
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);
        const topBarModel = new TopBarModel(page);

        await page.goto(url);
        test.setTimeout(95000);
        page.setViewportSize({ width: 1800, height: 1400 });
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

    test(`Check all integration coupon options`, async ({ page }) => {
        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();
        await brandsModel.onClickBrandCouponToogle(true);
        await brandsModel.onClickBrandCouponsIntegrationDropdown();

        expect(await brandsModel.dropdownOptions.nth(1).innerText()).toContain(integrations.wakefern);
        expect(await brandsModel.dropdownOptions.nth(2).innerText()).toContain(integrations.appcard);
        expect(await brandsModel.dropdownOptions.nth(3).innerText()).toContain(integrations.inmar);
        expect(await brandsModel.dropdownOptions.nth(4).innerText()).toContain(integrations.birdzi);
    });


    test(`Verify a brand node can be edited with wakefern coupon integration`, async ({ page }) => {
        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();

        await brandsModel.onClickBrandCouponToogle(true);
        await brandsModel.selectCouponIntegration(integrations.wakefern);
        await brandsModel.setBanner('banner');
        await brandsModel.setStoreId('1010');
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await page.waitForTimeout(1000);
        await brandsModel.hasNodeRequiredValues();
        expect(await brandsModel.couponIntegrationDropdown.locator('span:nth-child(1) > span').innerText()).toEqual(integrations.wakefern);
        expect(await brandsModel.bannerInput.inputValue()).toEqual('banner');
        expect(await brandsModel.storeIdInput.inputValue()).toEqual('1010');

        await brandsModel.onClickCouponSupport(false);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    });


    test(`Verify a brand node can be edited with appcard coupon integration`, async ({ page }) => {
        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();

        await brandsModel.onClickBrandCouponToogle(true);
        await brandsModel.selectCouponIntegration(integrations.appcard);
        await brandsModel.setAppcardMerchantId('1010');
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();
        expect(await brandsModel.couponIntegrationDropdown.locator('span:nth-child(1) > span').innerText()).toEqual(integrations.appcard);
        expect(await brandsModel.appcardMerchantIdInput.inputValue()).toEqual('1010');

        await brandsModel.onClickCouponSupport(false);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    });

    test(`Verify a brand node can be edited with inmar coupon integration`, async ({ page }) => {
        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();

        await brandsModel.onClickBrandCouponToogle(true);
        await brandsModel.selectCouponIntegration(integrations.inmar);
        await brandsModel.setInmarRetailerId('retailerId');
        await brandsModel.setRegistrationUrl('www.registrationurl.com');
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();
        expect(await brandsModel.couponIntegrationDropdown.locator('span:nth-child(1) > span').innerText()).toEqual(integrations.inmar);
        expect(await brandsModel.inmarRetailerId.inputValue()).toEqual('retailerId');
        expect(await brandsModel.registrationUrl.inputValue()).toEqual('www.registrationurl.com');

        await brandsModel.onClickCouponSupport(false);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    });


    test(`Verify a subbrand node can be created with wakefern coupon integration`, async ({ page }) => {
        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        test.setTimeout(120000);
        const uniqueId = uuidv4();
        let subbrand = Object.assign({} , subBrandData);
        subbrand.name = (subBrandData.name + uniqueId).slice(0, 32);
        subbrand.subDomain = (subBrandData.subDomain + uniqueId).slice(0, 32).split('-').join('');

        await brandsModel.addChildNodes('Brand');
        await commonModel.checkCreateContentPopupVisible();
        await brandsModel.fillSubBrandRequiredFields(subbrand);


        await brandsModel.onClickBrandCouponToogle(true);
        await brandsModel.selectCouponIntegration(integrations.wakefern);
        await brandsModel.setBanner('banner');
        await brandsModel.setStoreId('1010');
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        await brandsModel.openEditNodePopUp(subbrand.name);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();
        expect(await brandsModel.couponIntegrationDropdown.locator('span:nth-child(1) > span').innerText()).toEqual(integrations.wakefern);
        expect(await brandsModel.bannerInput.inputValue()).toEqual('banner');
        expect(await brandsModel.storeIdInput.inputValue()).toEqual('1010');
        await brandsModel.onClickNodeCancelButton();

        await brandsModel.deleteNode(subbrand.name);
        await commonModel.waitUntilSpinnerDisappears();
    });


    test(`Verify a subbrand node can be created with appcard coupon integration`, async ({ page }) => {
        test.setTimeout(120000);
        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        const uniqueId = uuidv4();
        let subbrand = Object.assign({} , subBrandData);
        subbrand.name = (subBrandData.name + uniqueId).slice(0, 32);
        subbrand.subDomain = (subBrandData.subDomain + uniqueId).slice(0, 32).split('-').join('');

        await brandsModel.addChildNodes('Brand');
        await commonModel.checkCreateContentPopupVisible();
        await brandsModel.fillSubBrandRequiredFields(subbrand);


        await brandsModel.onClickBrandCouponToogle(true);
        await brandsModel.selectCouponIntegration(integrations.appcard);
        await brandsModel.setAppcardMerchantId('1010');
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        await brandsModel.openEditNodePopUp(subbrand.name);
        await page.waitForTimeout(1000);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();
        expect(await brandsModel.couponIntegrationDropdown.locator('span:nth-child(1) > span').innerText()).toEqual(integrations.appcard);
        expect(await brandsModel.appcardMerchantIdInput.inputValue()).toEqual('1010');
        await brandsModel.onClickNodeCancelButton();

        await brandsModel.deleteNode(subbrand.name);
        await commonModel.waitUntilSpinnerDisappears();
    });

    test(`Verify a subbrand node can be created with inmar coupon integration`, async ({ page }) => {
        test.setTimeout(120000);
        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        const uniqueId = uuidv4();
        let subbrand = Object.assign({} , subBrandData);
        subbrand.name = (subBrandData.name + uniqueId).slice(0, 32);
        subbrand.subDomain = (subBrandData.subDomain + uniqueId).slice(0, 32).split('-').join('');

        await brandsModel.addChildNodes('Brand');
        await commonModel.checkCreateContentPopupVisible();
        await brandsModel.fillSubBrandRequiredFields(subbrand);


        await brandsModel.onClickBrandCouponToogle(true);
        await brandsModel.selectCouponIntegration(integrations.inmar);
        await brandsModel.setInmarRetailerId('retailerId');
        await brandsModel.setRegistrationUrl('www.registrationurl.com');
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        await brandsModel.openEditNodePopUp(subbrand.name);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();
        expect(await brandsModel.couponIntegrationDropdown.locator('span:nth-child(1) > span').innerText()).toEqual(integrations.inmar);
        expect(await brandsModel.inmarRetailerId.inputValue()).toEqual('retailerId');
        expect(await brandsModel.registrationUrl.inputValue()).toEqual('www.registrationurl.com');
        await brandsModel.onClickNodeCancelButton();

        await brandsModel.deleteNode(subbrand.name);
        await commonModel.waitUntilSpinnerDisappears();
    });


    test(`Verify a store node brand child with wakefern coupon integration`, async ({ page }) => {
        test.setTimeout(120000);
        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();
    
        await brandsModel.onClickBrandCouponToogle(true);
        await page.waitForTimeout(1000);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        const uniqueId = uuidv4();
        let store = Object.assign({} , storeData);
        store.name = (store.name + uniqueId).slice(0, 32);
        store.circularPath = (store.circularPath + uniqueId).slice(0, 32).split('-').join('');

        await brandsModel.addChildNodes('Brand');
        await commonModel.checkCreateContentPopupVisible();
        await brandsModel.onClickNodeTypeStore();
        await brandsModel.fillStoreRequiredFields(store);


        await brandsModel.onClickCouponSupport(true);
        await brandsModel.selectCouponIntegration(integrations.wakefern);
        await brandsModel.setBanner('banner');
        await brandsModel.setStoreId('1010');
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        await brandsModel.openEditNodePopUp(store.name);
        await commonModel.waitUntilSpinnerDisappears();
        await brandsModel.checkRequiredValuesInStore(store);
        await brandsModel.verifyTheTheDropdownOptionIsDisplayed();
        expect(await brandsModel.couponIntegrationDropdown.locator('span:nth-child(1) > span').innerText()).toEqual(integrations.wakefern);
        expect(await brandsModel.bannerInput.inputValue()).toEqual('banner');
        expect(await brandsModel.storeIdInput.inputValue()).toEqual('1010');
        await brandsModel.onClickNodeCancelButton();

        await brandsModel.deleteNode(store.name);
        await commonModel.waitUntilSpinnerDisappears();
    });


    test(`Verify a store node brand child with appcard coupon integration`, async ({ page }) => {
        test.setTimeout(120000);
        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();
    
        await brandsModel.onClickBrandCouponToogle(true);
        await page.waitForTimeout(1000);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        const uniqueId = uuidv4();
        let store = Object.assign({} , storeData);
        store.name = (store.name + uniqueId).slice(0, 32);
        store.circularPath = (store.circularPath + uniqueId).slice(0, 32).split('-').join('');

        await brandsModel.addChildNodes('Brand');
        await commonModel.checkCreateContentPopupVisible();
        await brandsModel.onClickNodeTypeStore();
        await brandsModel.fillStoreRequiredFields(store);


        await brandsModel.onClickCouponSupport(true);
        await brandsModel.selectCouponIntegration(integrations.appcard);
        await brandsModel.setAppcardMerchantId('1010');
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        await brandsModel.openEditNodePopUp(store.name);
        await brandsModel.checkRequiredValuesInStore(store);
        expect(await brandsModel.couponIntegrationDropdown.locator('span:nth-child(1) > span').innerText()).toEqual(integrations.appcard);
        expect(await brandsModel.appcardMerchantIdInput.inputValue()).toEqual('1010');
        await brandsModel.onClickNodeCancelButton();

        await brandsModel.deleteNode(store.name);
        await commonModel.waitUntilSpinnerDisappears();
    });


    test(`Verify a store node brand child with inmar coupon integration`, async ({ page }) => {
        test.setTimeout(120000);
        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();
    
        await brandsModel.onClickBrandCouponToogle(true);
        await page.waitForTimeout(1000);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        const uniqueId = uuidv4();
        let store = Object.assign({} , storeData);
        store.name = (store.name + uniqueId).slice(0, 32);
        store.circularPath = (store.circularPath + uniqueId).slice(0, 32).split('-').join('');

        await brandsModel.addChildNodes('Brand');
        await commonModel.checkCreateContentPopupVisible();
        await brandsModel.onClickNodeTypeStore();
        await brandsModel.fillStoreRequiredFields(store);


        await brandsModel.onClickCouponSupport(true);
        await brandsModel.selectCouponIntegration(integrations.inmar);
        await brandsModel.setInmarRetailerId('retailerId');
        await brandsModel.setRegistrationUrl('www.registrationurl.com');
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        await brandsModel.openEditNodePopUp(store.name);
        await brandsModel.checkRequiredValuesInStore(store);
        expect(await brandsModel.couponIntegrationDropdown.locator('span:nth-child(1) > span').innerText()).toEqual(integrations.inmar);
        expect(await brandsModel.inmarRetailerId.inputValue()).toEqual('retailerId');
        expect(await brandsModel.registrationUrl.inputValue()).toEqual('www.registrationurl.com');
        await brandsModel.onClickNodeCancelButton();

        await brandsModel.deleteNode(store.name);
        await commonModel.waitUntilSpinnerDisappears();
    });


    test(`Verify that subbrand and store brand child has wakefern coupon integration inherited values from brand`, async ({ page }) => {
        test.setTimeout(120000);
        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();
        await brandsModel.onClickBrandCouponToogle(true);
        await brandsModel.selectCouponIntegration(integrations.wakefern);
        await brandsModel.setBanner('banner');
        await brandsModel.setStoreId('2020');
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        await brandsModel.addChildNodes('Brand');
        await commonModel.checkCreateContentPopupVisible();
    
        expect(await brandsModel.couponIntegrationDropdown.locator('span:nth-child(1) > span').innerText()).toEqual(integrations.wakefern);
        expect(await brandsModel.bannerInput.inputValue()).toEqual('banner');
        expect(await brandsModel.storeIdInput.inputValue()).toEqual('2020');
    
        await brandsModel.onClickNodeTypeStore();
    
        expect(await brandsModel.couponIntegrationDropdown.locator('span:nth-child(1) > span').innerText()).toEqual(integrations.wakefern);
        expect(await brandsModel.bannerInput.inputValue()).toEqual('banner');
        expect(await brandsModel.storeIdInput.inputValue()).toEqual('2020');

        await brandsModel.onClickNodeCancelButton();
        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.onClickCouponSupport(false);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    });


    test(`Verify that subbrand and store brand child has appcard coupon integration inherited values from brand`, async ({ page }) => {
        test.setTimeout(120000);
        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();
        await brandsModel.onClickBrandCouponToogle(true);
        await brandsModel.selectCouponIntegration(integrations.appcard);
        await brandsModel.setAppcardMerchantId('2020');
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        await brandsModel.addChildNodes('Brand');
        await commonModel.checkCreateContentPopupVisible();
    
        await page.waitForTimeout(4000);
        expect(await brandsModel.couponIntegrationDropdown.locator('span:nth-child(1) > span').innerText()).toEqual(integrations.appcard);
        expect(await brandsModel.appcardMerchantIdInput.inputValue()).toEqual('2020');
    
        await brandsModel.onClickNodeTypeStore();
        await commonModel.waitUntilSpinnerDisappears();
        await page.waitForTimeout(4000);
        expect(await brandsModel.couponIntegrationDropdown.locator('span:nth-child(1) > span').innerText()).toEqual(integrations.appcard);
        expect(await brandsModel.appcardMerchantIdInput.inputValue()).toEqual('2020');

        await brandsModel.onClickNodeCancelButton();
        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.onClickCouponSupport(false);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    });

    test(`Verify that subbrand and store brand child has inmar coupon integration inherited values from brand`, async ({ page }) => {
        test.setTimeout(120000);
        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();
        await brandsModel.onClickBrandCouponToogle(true);
        await brandsModel.selectCouponIntegration(integrations.inmar);
        await brandsModel.setInmarRetailerId('retailerId');
        await brandsModel.setRegistrationUrl('www.registrationurl.com');
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        await brandsModel.addChildNodes('Brand');
        await commonModel.checkCreateContentPopupVisible();
    
        expect(await brandsModel.couponIntegrationDropdown.locator('span:nth-child(1) > span').innerText()).toEqual(integrations.inmar);
        expect(await brandsModel.inmarRetailerId.inputValue()).toEqual('retailerId');
        expect(await brandsModel.registrationUrl.inputValue()).toEqual('www.registrationurl.com');
    
        await brandsModel.onClickNodeTypeStore();
    
        expect(await brandsModel.couponIntegrationDropdown.locator('span:nth-child(1) > span').innerText()).toEqual(integrations.inmar);
        expect(await brandsModel.inmarRetailerId.inputValue()).toEqual('retailerId');
        expect(await brandsModel.registrationUrl.inputValue()).toEqual('www.registrationurl.com');

        await brandsModel.onClickNodeCancelButton();
        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.onClickCouponSupport(false);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    });

    test(`Verify that subbrand and store subbrand child has wakefern coupon integration inherited values from brand`, async ({ page }) => {
        test.setTimeout(120000);
        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);
        
        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();
        await brandsModel.onClickBrandCouponToogle(true);
        await brandsModel.selectCouponIntegration(integrations.wakefern);
        await brandsModel.setBanner('banner');
        await brandsModel.setStoreId('2020');
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    
        await brandsModel.openEditNodePopUp(brandsData.subBrandName);
        await commonModel.checkContentPopupVisible();
        await page.waitForTimeout(4000);
        expect(await brandsModel.couponIntegrationDropdown.locator('span:nth-child(1) > span').innerText()).toEqual(integrations.wakefern);
        expect(await brandsModel.bannerInput.inputValue()).toEqual('banner');
        expect(await brandsModel.storeIdInput.inputValue()).toEqual('2020');
        await brandsModel.onClickNodeCancelButton();
    
        await brandsModel.onClickAddChildToThisNodes(brandsData.subBrandName);
        await commonModel.checkCreateContentPopupVisible();
        await page.waitForTimeout(4000);
        expect(await brandsModel.couponIntegrationDropdown.locator('span:nth-child(1) > span').innerText()).toEqual(integrations.wakefern);
        expect(await brandsModel.bannerInput.inputValue()).toEqual('banner');
        expect(await brandsModel.storeIdInput.inputValue()).toEqual('2020');

        await brandsModel.onClickNodeCancelButton();
        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.onClickCouponSupport(false);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    });


    test(`Verify that subbrand and store subbrand child has appcard coupon integration inherited values from brand`, async ({ page }) => {
        test.setTimeout(120000);
        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);
        
        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();
        await brandsModel.onClickBrandCouponToogle(true);
        await brandsModel.selectCouponIntegration(integrations.appcard);
        await brandsModel.setAppcardMerchantId('2020');
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    
        await brandsModel.openEditNodePopUp(brandsData.subBrandName);
        await commonModel.checkContentPopupVisible();
        expect(await brandsModel.couponIntegrationDropdown.locator('span:nth-child(1) > span').innerText()).toEqual(integrations.appcard);
        expect(await brandsModel.appcardMerchantIdInput.inputValue()).toEqual('2020');
        await brandsModel.onClickNodeCancelButton();
    
        await brandsModel.onClickAddChildToThisNodes(brandsData.subBrandName);
        expect(await brandsModel.couponIntegrationDropdown.locator('span:nth-child(1) > span').innerText()).toEqual(integrations.appcard);
        expect(await brandsModel.appcardMerchantIdInput.inputValue()).toEqual('2020');

        await brandsModel.onClickNodeCancelButton();
        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.onClickCouponSupport(false);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    });

    test(`Verify that subbrand and store subbrand child has inmar coupon integration inherited values from brand`, async ({ page }) => {
        test.setTimeout(120000);
        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);
        
        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();
        await brandsModel.onClickBrandCouponToogle(true);
        await brandsModel.selectCouponIntegration(integrations.inmar);
        await brandsModel.setInmarRetailerId('retailerId');
        await brandsModel.setRegistrationUrl('www.registrationurl.com');
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    
        await brandsModel.openEditNodePopUp(brandsData.subBrandName);
        await commonModel.checkContentPopupVisible();
        expect(await brandsModel.couponIntegrationDropdown.locator('span:nth-child(1) > span').innerText()).toEqual(integrations.inmar);
        expect(await brandsModel.inmarRetailerId.inputValue()).toEqual('retailerId');
        expect(await brandsModel.registrationUrl.inputValue()).toEqual('www.registrationurl.com');
        await brandsModel.onClickNodeCancelButton();
    
        await brandsModel.onClickAddChildToThisNodes(brandsData.subBrandName);
        expect(await brandsModel.couponIntegrationDropdown.locator('span:nth-child(1) > span').innerText()).toEqual(integrations.inmar);
        expect(await brandsModel.inmarRetailerId.inputValue()).toEqual('retailerId');
        expect(await brandsModel.registrationUrl.inputValue()).toEqual('www.registrationurl.com');

        await brandsModel.onClickNodeCancelButton();
        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.onClickCouponSupport(false);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    });

    test(`Verify the validation of the required fields of the appcard coupon integration`, async ({ page }) => {
        test.setTimeout(120000);
        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);
        
        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();
        await brandsModel.onClickBrandCouponToogle(true);
        await brandsModel.selectCouponIntegration(integrations.appcard);
        await brandsModel.onClickNodeSaveButton();
    
        expect(await commonModel.existAlert.innerText()).toContain(brandsData.couponAppcardMerchantIdRequired);
        expect((await brandsModel.appcardMerchantIdInput.getAttribute('class'))?.includes('invalid')).toBeTruthy();
    });


    test(`Verify the validation of the required fields of the inmar coupon integration`, async ({ page }) => {
        test.setTimeout(120000);
        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);
        
        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();
        await brandsModel.onClickBrandCouponToogle(true);
        await brandsModel.selectCouponIntegration(integrations.inmar);
        await brandsModel.registrationUrl.clear();
        await brandsModel.inmarRetailerId.clear();
        await brandsModel.onClickNodeSaveButton();
    
        expect(await commonModel.existAlert.nth(0).innerText()).toContain(brandsData.couponRetailerIdRequired);
        expect(await commonModel.existAlert.nth(1).innerText()).toContain(brandsData.couponRegistrationUrlRequired);
        expect((await brandsModel.inmarRetailerId.getAttribute('class'))?.includes('invalid')).toBeTruthy();
        expect((await brandsModel.registrationUrl.getAttribute('class'))?.includes('invalid')).toBeTruthy();
    });

});