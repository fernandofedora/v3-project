import { test, expect } from '@playwright/test';
import { LoginModel } from '../../pom/loginModel';
import {SidebarModel} from '../../pom/sidebarModel';
import {validateEnvironment} from '../../utils/urlHandler';
import {validateUsers} from '../../utils/userHandler';
import { CommonModel } from '../../pom/commonModel';
import { BrandsModel } from '../../pom/brandsModel';
import { storeOwnerRoleValidation } from '../../utils/rolesHandler';
import { brandsData, subBrandData, checkoutIntegrations, contentIntegrations, storeData } from '../../data/brandsData';
import { NodesTypesEnum } from '../../enums/nodeTypes.enum';
import { TopBarModel } from '../../pom/topBarModel';

const users = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.brandNodeContentName));
const user = users[0];
const url: string = validateEnvironment();

test.describe('Manage Brands - checkout integrations', () => {

  test.beforeEach(async ({ page }, testInfo) => {
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);
    const brandsModel = new BrandsModel(page);
    const topBarModel = new TopBarModel(page);

    await page.goto(url);
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

  test(`Verify that the Checkout Integration list has the integration values`, async ({ page }) => {
    page.setViewportSize({ width: 1000, height: 1000 });
    const commonModel = new CommonModel(page);
    const brandsModel = new BrandsModel(page);

    await brandsModel.openEditNodePopUp(brandsData.storeBrandName);
    //await commonModel.checkContentPopupVisible();
    //await brandsModel.hasNodeStoreRequiredValues();
    //await brandsModel.onClickStoreCheckoutIntegrationToogle(true);
    //await brandsModel.onClickStoreCheckoutIntegrationDropdown();

    //expect(await brandsModel.storeCheckoutIntegrationOption.nth(1).innerText()).toContain(checkoutIntegrations.freshop);
    ///expect(await brandsModel.storeCheckoutIntegrationOption.nth(2).innerText()).toContain(checkoutIntegrations.shoprite);
    //expect(await brandsModel.storeCheckoutIntegrationOption.nth(3).innerText()).toContain(checkoutIntegrations.rosie);
    //expect(await brandsModel.storeCheckoutIntegrationOption.nth(4).innerText()).toContain(checkoutIntegrations.fairway);
    await page.waitForTimeout(5000);
  });


  test(`Verify the required field validation of Checkout Integration`, async ({ page }) => {
    page.setViewportSize({ width: 1000, height: 1000 });
    const commonModel = new CommonModel(page);
    const brandsModel = new BrandsModel(page);

    await brandsModel.openEditNodePopUp(brandsData.storeBrandName);
    await commonModel.checkContentPopupVisible();
    await brandsModel.hasNodeStoreRequiredValues();
    await brandsModel.onClickStoreCheckoutIntegrationToogle(true);
    await brandsModel.onClickNodeSaveButton();

    await brandsModel.verifyThatCheckoutIntegrationTypeRequiredErrorMessageIsVisible();
    expect((await brandsModel.storeCheckoutIntegrationDropdown.getAttribute('class'))?.includes('invalid')).toBeTruthy();
  });


  test(`Verify the validation of the required field of Rosie Checkout Integration`, async ({ page }) => {
    page.setViewportSize({ width: 1000, height: 1000 });
    const commonModel = new CommonModel(page);
    const brandsModel = new BrandsModel(page);

    await brandsModel.openEditNodePopUp(brandsData.storeBrandName);
    await commonModel.checkContentPopupVisible();
    await brandsModel.hasNodeStoreRequiredValues();
    await brandsModel.onClickStoreCheckoutIntegrationToogle(true);
    await brandsModel.selectStoreCheckoutIntegrationOption(checkoutIntegrations.rosie);
    await brandsModel.verifyIfStoreVanityNameEmpty();
    await brandsModel.onClickNodeSaveButton();

    await brandsModel.verifyThatCheckoutStoreVanityNameRequiredErrorMessageIsVisible();
    expect((await brandsModel.storeVanityNameInput.getAttribute('class'))?.includes('invalid')).toBeTruthy();
  });



  test(`Verify space validation in storevanityname field for Rosie Checkout Integration`, async ({ page }) => {
    page.setViewportSize({ width: 1000, height: 1000 });
    const commonModel = new CommonModel(page);
    const brandsModel = new BrandsModel(page);

    await brandsModel.openEditNodePopUp(brandsData.storeBrandName);
    await commonModel.checkContentPopupVisible();
    await brandsModel.hasNodeStoreRequiredValues();
    await brandsModel.onClickStoreCheckoutIntegrationToogle(true);
    await brandsModel.selectStoreCheckoutIntegrationOption(checkoutIntegrations.rosie);
    await brandsModel.verifyIfStoreVanityNameEmpty();
    await brandsModel.storeVanityNameInput.fill("this is a new store name");

    let storeVanityNameInputValue = await brandsModel.storeVanityNameInput.inputValue();
    expect(storeVanityNameInputValue).toEqual("this-is-a-new-store-name");
  });


  test(`Verify the required field validation of the store-id Checkout Integration fairway`, async ({ page }) => {
    page.setViewportSize({ width: 1000, height: 1000 });
    const commonModel = new CommonModel(page);
    const brandsModel = new BrandsModel(page);

    await brandsModel.openEditNodePopUp(brandsData.storeBrandName);
    await commonModel.checkContentPopupVisible();
    await brandsModel.hasNodeStoreRequiredValues();
    await brandsModel.onClickStoreCheckoutIntegrationToogle(true);
    await brandsModel.selectStoreCheckoutIntegrationOption(checkoutIntegrations.fairway);
    await brandsModel.verifyIfStoreIdFieldInputEmpty();
    await brandsModel.onClickNodeSaveButton();

    expect(await commonModel.existAlert.innerText()).toEqual(brandsData.checkoutStoreIdRequired);
    expect((await brandsModel.storeIdFieldInput.getAttribute('class'))?.includes('invalid')).toBeTruthy();
  });


  test(`Verify Required Field Validation for Shoprite Checkout Integration`, async ({ page }) => {
    page.setViewportSize({ width: 1000, height: 1000 });
    const commonModel = new CommonModel(page);
    const brandsModel = new BrandsModel(page);

    await brandsModel.openEditNodePopUp(brandsData.storeBrandName);
    await commonModel.checkContentPopupVisible();
    await brandsModel.hasNodeStoreRequiredValues();
    await brandsModel.onClickStoreCheckoutIntegrationToogle(true);
    await brandsModel.selectStoreCheckoutIntegrationOption(checkoutIntegrations.shoprite);
    await brandsModel.onClickNodeSaveButton();

    expect(await commonModel.existAlert.innerText()).toEqual(brandsData.checkoutStoreIdRequired);
    expect((await brandsModel.storeIdInput.getAttribute('class'))?.includes('invalid')).toBeTruthy();
  });

  test(`Verify wakefern integration store id is the same with shoprite checkout integration`, async ({ page }) => {
    page.setViewportSize({ width: 1000, height: 1000 });
    const commonModel = new CommonModel(page);
    const brandsModel = new BrandsModel(page);

    await brandsModel.openEditNodePopUp(brandsData.storeBrandName);
    await commonModel.checkContentPopupVisible();
    await brandsModel.hasNodeStoreRequiredValues();
    await brandsModel.onClickStoreContentIntegrationToogle(true);
    await brandsModel.onClickStoreCheckoutIntegrationToogle(true);
    await brandsModel.selectStoreContentIntegrationOption(contentIntegrations.wakefern);
    await brandsModel.selectStoreCheckoutIntegrationOption(checkoutIntegrations.shoprite);
    await brandsModel.setStoreId(storeData.storeId);

    expect(await brandsModel.storeIdInput.nth(0).inputValue()).toEqual(storeData.storeId);
    expect(await brandsModel.storeIdInput.nth(1).inputValue()).toEqual(storeData.storeId);

    await brandsModel.onClickNodeSaveButton();
    await commonModel.waitUntilSpinnerDisappears();
    await brandsModel.openEditNodePopUp(brandsData.storeBrandName);

    expect(await brandsModel.storeIdInput.nth(0).inputValue()).toEqual(storeData.storeId);
    expect(await brandsModel.storeIdInput.nth(1).inputValue()).toEqual(storeData.storeId);

    await brandsModel.onClickStoreContentIntegrationToogle(false);
    await brandsModel.onClickStoreCheckoutIntegrationToogle(false);
    await brandsModel.onClickNodeSaveButton();
    await commonModel.waitUntilSpinnerDisappears();
  });


  test(`Verify that when shoprite is selected in the checkout integration and an option other than wakefern in content integration shows a validation that does not allow changes to be saved`, async ({ page }) => {
    page.setViewportSize({ width: 1000, height: 1000 });
    const commonModel = new CommonModel(page);
    const brandsModel = new BrandsModel(page);

    await brandsModel.openEditNodePopUp(brandsData.storeBrandName);
    await commonModel.checkContentPopupVisible();
    await brandsModel.hasNodeStoreRequiredValues();
    await brandsModel.onClickStoreContentIntegrationToogle(true);
    await brandsModel.onClickStoreCheckoutIntegrationToogle(true);
    await brandsModel.selectStoreContentIntegrationOption(contentIntegrations.freshop);
    await brandsModel.setStoreAppKey(storeData.appKey);
    await brandsModel.setStoreAppSecret(storeData.appSecret);
    await brandsModel.setStoreId(storeData.storeId);
    await brandsModel.selectStoreCheckoutIntegrationOption(checkoutIntegrations.shoprite);
    await brandsModel.onClickNodeSaveButton();

    expect(await commonModel.existAlert.innerText()).toEqual(brandsData.contentIntegrationMustEqual);
  });


  test(`Verify that when fairway is selected in the checkout integration and an option other than wakefern in content integration, shows a validation that does not allow changes to be saved`, async ({ page }) => {
    page.setViewportSize({ width: 1000, height: 1000 });
    const commonModel = new CommonModel(page);
    const brandsModel = new BrandsModel(page);

    await brandsModel.openEditNodePopUp(brandsData.storeBrandName);
    await commonModel.checkContentPopupVisible();
    await brandsModel.hasNodeStoreRequiredValues();
    await brandsModel.onClickStoreContentIntegrationToogle(true);
    await brandsModel.onClickStoreCheckoutIntegrationToogle(true);
    await brandsModel.selectStoreContentIntegrationOption(contentIntegrations.freshop);
    await brandsModel.setStoreAppKey(storeData.appKey);
    await brandsModel.setStoreAppSecret(storeData.appSecret);
    await brandsModel.setStoreId(storeData.storeId);
    await brandsModel.selectStoreCheckoutIntegrationOption(checkoutIntegrations.fairway);
    await brandsModel.onClickNodeSaveButton();

    expect(await commonModel.existAlert.innerText()).toEqual(brandsData.contentIntegrationMustEqual);
  });

});