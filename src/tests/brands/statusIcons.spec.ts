import { test, expect} from '@playwright/test';
import { LoginModel } from '../../pom/loginModel';
import {SidebarModel} from '../../pom/sidebarModel';
import {validateEnvironment} from '../../utils/urlHandler';
import {validateUsers} from '../../utils/userHandler';
import { CommonModel } from '../../pom/commonModel';
import { BrandsModel } from '../../pom/brandsModel';
import { storeOwnerRoleValidation } from '../../utils/rolesHandler';
import { brandsData } from '../../data/brandsData';
import { NodesTypesEnum } from '../../enums/nodeTypes.enum';
import { TopBarModel } from '../../pom/topBarModel';

const users = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.brandNodeContentName));
const user = users[0];
const url: string = validateEnvironment();

/**
 * Before running this script
 * You must create the following nodes
 * Brand: newBrand
 * SubBrand: NewSubBrand
 * Store: newStoreBrand (newBrand child), newStoreSubBrand (NewSubBrand child)
 * StoreGroup: newStoreGroup with the stores listed above
 */

test.describe('Manage Brands - Status Icons', () => {

    test.beforeEach(async ({ page }, testInfo) => {
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        await page.goto(url);
        page.setViewportSize({ width: 1000, height: 1000 });
        await loginModel.login(user.username, user.password);
        await sideBarModel.onClickBrandOptionMenu();
        await commonModel.setSearchValue(brandsData.brandNodeName);
        await brandsModel.hasBrandTableValues();
        await brandsModel.goToManageNodes(brandsData.brandNodeName);
        await brandsModel.configureDefaultSubBrandNode(brandsData.brandNodeName, brandsData.subBrandName);
        await brandsModel.configureDefaultStoreNode(brandsData.brandNodeName, brandsData.storeBrandName, NodesTypesEnum.brand);
        await brandsModel.hasNodeTableValues(3);
    });

    test.afterAll(async () => {
        test.setTimeout(2500);
    });

    test(`Verify that the goLiveDate status icon for a brand node turns green when the go live option is set on a past date`, async ({ page }) => {
        test.setTimeout(180000);
        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();
    
        await brandsModel.onClickBrandGoLiveToogle(true);
        await brandsModel.nodeLiveDateInput.click();
        await commonModel.selectDate('2022', 'MAR', '1', '01', '00');

        await page.waitForTimeout(1000);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    
        await brandsModel.checkGoLiveValidation(brandsData.brandNodeName, true);

        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();

        //await brandsModel.onClickBrandGoLiveToogle(false);
        await commonModel.waitUntilSpinnerDisappears();
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    });


    test(`Verify that the goLiveDate status icon for a subBrand node turns green when the go live option is set on a past date`, async ({ page }) => {
        test.setTimeout(180000);

        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        await brandsModel.openEditNodePopUp(brandsData.subBrandName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.onClickStoresLinkedToogle(true);
        await brandsModel.hasNodeRequiredValues();
    
        await brandsModel.onClickGoLiveToogle(true);
        await brandsModel.nodeLiveDateInput.click({delay:2000});
        await commonModel.selectDate('2022', 'MAR', '1', '01', '00');

        await page.waitForTimeout(1000);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    
        await brandsModel.checkGoLiveValidation(brandsData.subBrandName, true);

        await brandsModel.openEditNodePopUp(brandsData.subBrandName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();

        await brandsModel.onClickGoLiveToogle(false);
        await commonModel.waitUntilSpinnerDisappears();
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    });


    test(`Verify that the goLiveDate status icon for a store node turns green when the go live option is set on a past date`, async ({ page }) => {
        test.setTimeout(180000);

        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        await brandsModel.openEditNodePopUp(brandsData.storeBrandName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeStoreRequiredValues();

        await brandsModel.onClickStoreGoLiveToogle(true);
        await brandsModel.nodeLiveDateInput.click();
        await commonModel.selectDate('2022', 'MAR', '1', '01', '00');

        await page.waitForTimeout(1000);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    
        await brandsModel.checkGoLiveValidation(brandsData.storeBrandName, true);

        await brandsModel.openEditNodePopUp(brandsData.storeBrandName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeStoreRequiredValues();

        await brandsModel.onClickStoreGoLiveToogle(false);
        await commonModel.waitUntilSpinnerDisappears();
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    });

    test(`Verify that the active status icon for a brand node turns green when the active flag is set to true`, async ({ page }) => {
        test.setTimeout(180000);

        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();
    
        await brandsModel.onClickBrandActiveToogle(true);

        await page.waitForTimeout(1000);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    
        await brandsModel.checkActiveFlag(brandsData.brandNodeName, true);

        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();

        await brandsModel.onClickBrandActiveToogle(false);
        await commonModel.waitUntilSpinnerDisappears();
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    });

    test(`Verify that the active status icon for a subBrand node turns green when the active flag is set to true`, async ({ page }) => {
        test.setTimeout(180000);

        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        await brandsModel.openEditNodePopUp(brandsData.subBrandName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();
    
        await brandsModel.onClickActiveToogle(true);

        await page.waitForTimeout(1000);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    
        await brandsModel.checkActiveFlag(brandsData.subBrandName, true);

        await brandsModel.openEditNodePopUp(brandsData.subBrandName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();

        await brandsModel.onClickActiveToogle(false);
        await commonModel.waitUntilSpinnerDisappears();
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    });

    test(`Verify that the active status icon for a store node turns green when the active flag is set to true`, async ({ page }) => {
        test.setTimeout(180000);

        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        await brandsModel.openEditNodePopUp(brandsData.storeBrandName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeStoreRequiredValues();
    
        await brandsModel.onClickStoreActiveToogle(true);
    
        await page.waitForTimeout(1000);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    
        await brandsModel.checkActiveFlag(brandsData.storeBrandName, true);

        await brandsModel.openEditNodePopUp(brandsData.storeBrandName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeStoreRequiredValues();

        await brandsModel.onClickStoreActiveToogle(false);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    });


    test(`Verify that the goLiveDate status icon for a brand node keeps red when the go live option is set on a future date`, async ({ page }) => {
        test.setTimeout(180000);

        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();
    
        await brandsModel.onClickBrandGoLiveToogle(true);
        await brandsModel.nodeLiveDateInput.click();
        await commonModel.selectDate('2028', 'MAR', '1', '01', '00');

        await page.waitForTimeout(1000);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    
        await brandsModel.checkGoLiveValidation(brandsData.brandNodeName, false);

        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();

        await brandsModel.onClickBrandGoLiveToogle(false);
        await commonModel.waitUntilSpinnerDisappears();
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    });

    test(`Verify that the goLiveDate status icon for a subBrand node keeps red when the go live option is set on a future date`, async ({ page }) => {
        test.setTimeout(180000);

        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        await brandsModel.openEditNodePopUp(brandsData.subBrandName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();
    
        await brandsModel.onClickGoLiveToogle(true);
        await brandsModel.nodeLiveDateInput.click();
        await commonModel.selectDate('2028', 'MAR', '1', '01', '00');

        await page.waitForTimeout(1000);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    
        await brandsModel.checkGoLiveValidation(brandsData.subBrandName, false);

        await brandsModel.openEditNodePopUp(brandsData.subBrandName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();

        await brandsModel.onClickGoLiveToogle(false);
        await commonModel.waitUntilSpinnerDisappears();
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    });

    test(`Verify that the goLiveDate status icon for a store node keeps red when the go live option is set on a future date`, async ({ page }) => {
        test.setTimeout(180000);

        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        await brandsModel.openEditNodePopUp(brandsData.storeBrandName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeStoreRequiredValues();

        await brandsModel.onClickStoreGoLiveToogle(true);
        await brandsModel.nodeLiveDateInput.click();
        await commonModel.selectDate('2028', 'MAR', '1', '01', '00');

        await page.waitForTimeout(1000);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    
        await brandsModel.checkGoLiveValidation(brandsData.storeBrandName, false);

        await brandsModel.openEditNodePopUp(brandsData.storeBrandName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeStoreRequiredValues();

        await brandsModel.onClickStoreGoLiveToogle(false);
        await commonModel.waitUntilSpinnerDisappears();
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
    });

    test(`Verify that the goLiveDate status icon for a brand node turns red when the go live option is disable`, async ({ page }) => {
        test.setTimeout(180000);

        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();
    
        await brandsModel.onClickBrandGoLiveToogle(true);
        await brandsModel.nodeLiveDateInput.click();
        await commonModel.selectDate('2022', 'MAR', '1', '01', '00');

        await page.waitForTimeout(1000);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();

        await brandsModel.onClickBrandGoLiveToogle(false);
        await commonModel.waitUntilSpinnerDisappears();
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        await brandsModel.checkGoLiveValidation(brandsData.brandNodeName, false);
        await commonModel.waitUntilSpinnerDisappears();
    });

    test(`Verify that the goLiveDate status icon for a subbrand node turns red when the go live option is disable`, async ({ page }) => {
        test.setTimeout(180000);

        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        await brandsModel.openEditNodePopUp(brandsData.subBrandName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();
    
        await brandsModel.onClickGoLiveToogle(true);
        await brandsModel.nodeLiveDateInput.click();
        await commonModel.selectDate('2022', 'MAR', '1', '01', '00');

        await page.waitForTimeout(1000);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        await brandsModel.openEditNodePopUp(brandsData.subBrandName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();

        await brandsModel.onClickGoLiveToogle(false);
        await commonModel.waitUntilSpinnerDisappears();
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        await brandsModel.checkGoLiveValidation(brandsData.subBrandName, false);
        await commonModel.waitUntilSpinnerDisappears();
    });


    test(`Verify that the goLiveDate status icon for a store node turns red when the go live option is disable`, async ({ page }) => {
        test.setTimeout(180000);

        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        await brandsModel.openEditNodePopUp(brandsData.storeBrandName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeStoreRequiredValues();
    
        await brandsModel.onClickStoreGoLiveToogle(true);
        await brandsModel.nodeLiveDateInput.click();
        await commonModel.selectDate('2022', 'MAR', '1', '01', '00');

        await page.waitForTimeout(1000);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        await brandsModel.openEditNodePopUp(brandsData.storeBrandName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeStoreRequiredValues();

        await brandsModel.onClickStoreGoLiveToogle(false);
        await commonModel.waitUntilSpinnerDisappears();
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        await brandsModel.checkGoLiveValidation(brandsData.storeBrandName, false);
        await commonModel.waitUntilSpinnerDisappears();
    });

    test(`Verify that the active status icon for a brand node turns red when the active flag is set to false`, async ({ page }) => {
        test.setTimeout(180000);

        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();
    
        await brandsModel.onClickBrandActiveToogle(true);

        await page.waitForTimeout(1000);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();

        await brandsModel.onClickBrandActiveToogle(false);
        await commonModel.waitUntilSpinnerDisappears();
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        await brandsModel.checkGoLiveValidation(brandsData.brandNodeName, false);
        await commonModel.waitUntilSpinnerDisappears();

    });

    test(`Verify that the active status icon for a subbrand node turns red when the active flag is set to false`, async ({ page }) => {
        test.setTimeout(180000);

        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        await brandsModel.openEditNodePopUp(brandsData.subBrandName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();
    
        await brandsModel.onClickActiveToogle(true);

        await page.waitForTimeout(1000);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        await brandsModel.openEditNodePopUp(brandsData.subBrandName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeRequiredValues();

        await brandsModel.onClickActiveToogle(false);
        await commonModel.waitUntilSpinnerDisappears();
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        await brandsModel.checkGoLiveValidation(brandsData.subBrandName, false);
        await commonModel.waitUntilSpinnerDisappears();

    });

    test(`Verify that the active status icon for a store node turns red when the active flag is set to false`, async ({ page }) => {
        test.setTimeout(180000);

        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        await brandsModel.openEditNodePopUp(brandsData.storeBrandName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeStoreRequiredValues();
    
        await brandsModel.onClickStoreActiveToogle(true);

        await page.waitForTimeout(1000);
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        await brandsModel.openEditNodePopUp(brandsData.storeBrandName);
        await commonModel.checkContentPopupVisible();
        await brandsModel.hasNodeStoreRequiredValues();

        await brandsModel.onClickStoreActiveToogle(false);
        await commonModel.waitUntilSpinnerDisappears();
        await brandsModel.onClickNodeSaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        await brandsModel.checkGoLiveValidation(brandsData.storeBrandName, false);
        await commonModel.waitUntilSpinnerDisappears();
    });

});