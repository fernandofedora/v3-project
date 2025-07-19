import { test, expect } from '@playwright/test';
import { LoginModel } from '../../pom/loginModel';
import { SidebarModel } from '../../pom/sidebarModel';
import { validateEnvironment } from '../../utils/urlHandler';
import { validateUsers } from '../../utils/userHandler';
import { CommonModel } from '../../pom/commonModel';
import { BrandsModel } from '../../pom/brandsModel';
import { storeOwnerRoleValidation } from '../../utils/rolesHandler';
import { brandsData } from '../../data/brandsData';
import { NodesTypesEnum } from '../../enums/nodeTypes.enum';

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

test.describe('Manage Brands - PWA', () => {

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

    test(`Check the validation that it is not possible to save the empty form for pwa`, async ({ page }) => {
        test.setTimeout(180000);
        const commonModel = new CommonModel(page);
        const brandsModel = new BrandsModel(page);

        await brandsModel.onClickPwaConfigButton();
        await brandsModel.onClickNodeSaveButton();

        await commonModel.verifyAlertMessageVisible();
        expect(await commonModel.existAlert.nth(0).innerText()).toContain(brandsData.titleRequired);
        expect(await commonModel.existAlert.nth(1).innerText()).toContain(brandsData.imageHrefRequired);
        expect(await commonModel.existAlert.nth(2).innerText()).toContain(brandsData.popupBannerRequired);
        expect(await commonModel.existAlert.nth(3).innerText()).toContain(brandsData.image120Required);
        expect(await commonModel.existAlert.nth(4).innerText()).toContain(brandsData.image180Required);
        expect(await commonModel.existAlert.nth(5).innerText()).toContain(brandsData.image192Required);
        expect(await commonModel.existAlert.nth(6).innerText()).toContain(brandsData.image512Required);
    });

});
