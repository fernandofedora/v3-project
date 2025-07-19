import { test, expect } from '@playwright/test';
import { LoginModel } from '../../pom/loginModel';
import {SidebarModel} from '../../pom/sidebarModel';
import {validateEnvironment} from '../../utils/urlHandler';
import {validateUsers} from '../../utils/userHandler';
import { NodesTypesEnum } from '../../enums/nodeTypes.enum';
import { CommonModel } from '../../pom/commonModel';
import { BrandsModel } from '../../pom/brandsModel';
import { storeOwnerRoleValidation } from '../../utils/rolesHandler';
import { brandsData, subBrandData, storeData } from '../../data/brandsData';
import {v4 as uuidv4} from 'uuid';
import path from 'path';

const users = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.brandNodeContentName));
const user = users[0];
const url: string = validateEnvironment();

test.describe('Manage Brands - add node', () => {

  test.beforeEach(async ({ page }) => {
    test.setTimeout(180000);
  });

  test.afterAll(async () => {
    test.setTimeout(2500);
  });

  test(`Verify if a user can add child nodes - SubBrand with required fields to a Brand`, async ({ page }) => {
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);
    const brandsModel = new BrandsModel(page);

    await page.goto(url);
    await page.setViewportSize({ width: 1000, height: 1000 });
    await loginModel.login(user.username, user.password);
    await sideBarModel.onClickBrandOptionMenu();
    await brandsModel.verifyThatTheBrandTableIsDisplayed();
    await commonModel.setSearchValue(brandsData.brandNodeName);
    await brandsModel.hasBrandTableValues();
    await brandsModel.goToManageNodes(brandsData.brandNodeName);
    await brandsModel.configureDefaultSubBrandNode(brandsData.brandNodeName, brandsData.subBrandName);
    await brandsModel.configureDefaultStoreNode(brandsData.brandNodeName, brandsData.storeBrandName, NodesTypesEnum.brand);
    await brandsModel.configureDefaultStoreNode(brandsData.subBrandName, brandsData.storeSubBrandName, NodesTypesEnum.subbrand);
    await brandsModel.hasNodeTableValues(3);

    const uniqueId = uuidv4();
    let subbrand = Object.assign({} , subBrandData);
    subbrand.name = (subBrandData.name + uniqueId).slice(0, 32);
    subbrand.subDomain = (subBrandData.subDomain + uniqueId).slice(0, 32).split('-').join('');

    await brandsModel.addChildNodes(NodesTypesEnum.brand);
    await commonModel.checkCreateContentPopupVisible();
    await brandsModel.fillSubBrandRequiredFields(subbrand);

    // System must be able to add nodes just as subbrand to the Brand, with the values provided.
    await expect(brandsModel.nodeNameInput).toHaveValue(subbrand.name, { timeout: 5000 });
    await expect(brandsModel.nodeCircularSubdomainInput).toHaveValue(subbrand.subDomain, { timeout: 5000 });
    await expect(brandsModel.nodeSiteTitleInput).toHaveValue(subbrand.siteTitle, { timeout: 5000 });
    await expect(brandsModel.nodeSiteDescriptionInput).toHaveValue(subbrand.siteDesc, { timeout: 5000 });
    await expect(brandsModel.storeDisplayTextInput).toHaveValue(subbrand.storeDisplayText, { timeout: 5000 });

    await brandsModel.onClickNodeSaveButton();
    await commonModel.waitUntilSpinnerDisappears();

    await brandsModel.expandItemsInTable(0);
    await brandsModel.getNodeNameCoincidenceInTable(subbrand.name);
    await brandsModel.deleteNode(subbrand.name);
    await commonModel.waitUntilSpinnerDisappears();

  });

  test(`Verify if a user can add child nodes - SubBrand with all fields to a Brand`, async ({ page }) => {
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);
    const brandsModel = new BrandsModel(page);

    await page.goto(url);
    await page.setViewportSize({ width: 1000, height: 1000 });
    await loginModel.login(user.username, user.password);
    await sideBarModel.onClickBrandOptionMenu();
    await brandsModel.verifyThatTheBrandTableIsDisplayed();
    await commonModel.setSearchValue(brandsData.brandNodeName);
    await brandsModel.hasBrandTableValues();
    await brandsModel.goToManageNodes(brandsData.brandNodeName);
    await brandsModel.configureDefaultSubBrandNode(brandsData.brandNodeName, brandsData.subBrandName);
    await brandsModel.configureDefaultStoreNode(brandsData.brandNodeName, brandsData.storeBrandName, NodesTypesEnum.brand);
    await brandsModel.configureDefaultStoreNode(brandsData.subBrandName, brandsData.storeSubBrandName, NodesTypesEnum.subbrand);
    await brandsModel.hasNodeTableValues(3);

    let subBrandName = await brandsModel.subBrandName()
    const uniqueId = uuidv4();
    let subbrand = Object.assign({} , subBrandData);
    subbrand.name = subBrandName;
    subbrand.subDomain = (subBrandData.subDomain + uniqueId).slice(0, 32).split('-').join('');

    await brandsModel.addChildNodes(NodesTypesEnum.brand);
    await commonModel.checkCreateContentPopupVisible();
    await brandsModel.fillSubBrandRequiredFields(subbrand);

    await brandsModel.nodeContentAdminDropdown.click();
    await brandsModel.nodeContentAdminOption.nth(1).click();

    await brandsModel.onClickCategoryDividedLayout(true);
    await brandsModel.onClickNationalFeatureDeals(true);

    await brandsModel.onClickCircularStartDayOption('Tuesday');
    await brandsModel.selectCircularDayStartTime('0815');

    await brandsModel.onClickRecipeToogle(true);

    await brandsModel.onClickCouponToogle(true);

    await brandsModel.onClickActiveToogle(true);

    await brandsModel.onClickHideCartToogle(true);

    await brandsModel.onClickDeferCartToogle(true);

    await brandsModel.onClickWarningThresholdToogle(true);

    await brandsModel.onSelectSupportedLanguages(brandsData.englishLanguage, true);
    await brandsModel.selectionDefaultLanguage(brandsData.englishLanguage)

    await brandsModel.nodeNotesTextArea.click();
    await brandsModel.nodeNotesTextArea.fill("this is a note");

    await brandsModel.uploadImage(0, ["src/images/masterchief helmet.jpg"]); // Logo Field
    await commonModel.waitUntilSpinnerDisappears();

    await brandsModel.uploadImage(1, ["src/images/masterchief.jpg"]); // How To Image Field
    await commonModel.waitUntilSpinnerDisappears();

    await brandsModel.uploadImage(2, ["src/images/masterchief2.jpg"]); // Kiosk Header Image Logo Field
    await commonModel.waitUntilSpinnerDisappears();

    await brandsModel.nodeYoutubeIdInput.click();
    await brandsModel.setHowToYoutubeId("You Tube id");

    await brandsModel.uploadImage(3, ["src/images/masterchief3.jpg"]); // Fav Icon Field
    await commonModel.waitUntilSpinnerDisappears();

    await brandsModel.storeLogoLinkInput.click();
    await brandsModel.storeLogoLinkInput.fill("Logo click field")

    await brandsModel.uploadImage(4, ["src/images/masterchief helmet.jpg"]); // Logo Click Link Field
    await commonModel.waitUntilSpinnerDisappears();

    await brandsModel.onClickStoresLinkedToogle(true);

    await brandsModel.nodeUIConfigInput.click();
    await brandsModel.setUiConfig(brandsData.nodeUiConfig);
    await brandsModel.setStoreDisplayText(subBrandData.storeDisplayText);
    await brandsModel.nodeThemeInput.click();
    await brandsModel.setTheme(brandsData.nodeTheme);
    await brandsModel.nodeDefaultPageNameInput.click();
    await brandsModel.setDefaultPageName(brandsData.nodeStartPage);
    await brandsModel.nodeCategoryPageNameInput.click();
    await brandsModel.setCategoryPageName(brandsData.nodeCategoryPage);
    await brandsModel.onClickGoLiveToogle(true);
    await brandsModel.nodeLiveDateInput.click();
    await commonModel.selectDate('2022', 'MAR', '1', '01', '00');

    expect(await brandsModel.nodeNameInput.inputValue()).toEqual(subbrand.name);
    expect(await brandsModel.nodeCircularSubdomainInput.inputValue()).toEqual(subbrand.subDomain);
    expect(await brandsModel.nodeSiteTitleInput.inputValue()).toEqual(subbrand.siteTitle);
    expect(await brandsModel.nodeSiteDescriptionInput.inputValue()).toEqual(subbrand.siteDesc);
    expect(await brandsModel.storeDisplayTextInput.inputValue()).toEqual(subbrand.storeDisplayText);
    expect(await brandsModel.nodeContentAdminDropdown.innerText()).not.toEqual("");
    expect(await brandsModel.nodeNotesTextArea.inputValue()).toEqual("this is a note");
    expect(await brandsModel.nodeCategoryDividedLayoutSwitch.locator("button").getAttribute("aria-checked")).toEqual("true");
    expect(await brandsModel.nodeNationalFeaturedDealsSwitch.locator("button").getAttribute("aria-checked")).toEqual("true");
    expect(await brandsModel.nodeRecipeSupportToogle.locator("button").getAttribute("aria-checked")).toEqual("true");
    expect(await brandsModel.nodeCouponSupportToogle.locator("button").getAttribute("aria-checked")).toEqual("true");
    expect(await brandsModel.nodeActiveToogle.locator("button").getAttribute("aria-checked")).toEqual("true");
    expect(await brandsModel.nodeHideCartSwitch.locator("button").getAttribute("aria-checked")).toEqual("true");

    await brandsModel.onClickNodeSaveButton();
    await commonModel.waitUntilSpinnerDisappears();
    await commonModel.verifyAproveedAlertMessage("Node Added successfully!")

    await brandsModel.expandItemsInTable(0);
    await brandsModel.getNodeNameCoincidenceInTable(subbrand.name);
    await brandsModel.deleteNode(subbrand.name);
    await commonModel.waitUntilSpinnerDisappears();
  });

  test(`Verify if a user can add child nodes 'Store' with required fields to a Brand`, async ({ page }) => {
    const loginModel = new LoginModel(page);
    const brandsModel = new BrandsModel(page);
    const sidebarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(url);
    await page.setViewportSize({ width: 1000, height: 1000 });
    await loginModel.login(user.username, user.password);
    await sidebarModel.onClickBrandOptionMenu();

    await commonModel.setSearchValue(brandsData.brandNodeName);
    await brandsModel.hasBrandTableValues();
    await brandsModel.goToManageNodes(brandsData.brandNodeName);
    await brandsModel.configureDefaultSubBrandNode(brandsData.brandNodeName, brandsData.subBrandName);
    await brandsModel.configureDefaultStoreNode(brandsData.brandNodeName, brandsData.storeBrandName, NodesTypesEnum.brand);
    await brandsModel.configureDefaultStoreNode(brandsData.subBrandName, brandsData.storeSubBrandName, NodesTypesEnum.subbrand);
    await brandsModel.hasNodeTableValues(3);

    const uniqueId = uuidv4();
    let store = Object.assign({} , storeData);
    store.name = (storeData.name + uniqueId).slice(0, 40);
    store.circularPath = (storeData.circularPath + uniqueId).slice(0, 40);

    await brandsModel.addChildNodes(NodesTypesEnum.brand);
    await commonModel.checkCreateContentPopupVisible();
    await brandsModel.onClickNodeTypeStore();
    await brandsModel.fillStoreRequiredFields(store);

    // System must be able to add nodes just as Stores to the Brand, with the values provided.
    await brandsModel.checkRequiredValuesInStore(store);
    await brandsModel.onClickNodeSaveButton();
    await commonModel.waitUntilSpinnerDisappears();

    await brandsModel.expandItemsInTable(0);
    await brandsModel.getNodeNameCoincidenceInTable(store.name);

    await page.evaluate("document.body.style.scale='0.8'");
    await brandsModel.onClickNodeEditButton(0);
    const brandSubdomain = await brandsModel.nodeCircularSubdomainInput.innerText();
    await brandsModel.onClickNodeCancelButton();

    await brandsModel.openEditNodePopUp(store.name);
    const storeSubdomain = await brandsModel.nodeCircularSubdomainInput.innerText();
    await brandsModel.onClickNodeCancelButton();

    // Verify that the store is created within its parent node
    const subdomain = brandSubdomain == storeSubdomain;
    expect(subdomain).toBeTruthy();

    await brandsModel.deleteNode(store.name);
    await commonModel.waitUntilSpinnerDisappears();
  });

  test(`Verify if a user can add child nodes - Store with all fields to a Brand`, async ({ page }) => {
    const loginModel = new LoginModel(page);
    const brandsModel = new BrandsModel(page);
    const sidebarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(url);
    await page.setViewportSize({ width: 1000, height: 1000 });
    await loginModel.login(user.username, user.password);
    await sidebarModel.onClickBrandOptionMenu();

    await commonModel.setSearchValue(brandsData.brandNodeName);
    await brandsModel.hasBrandTableValues();
    await brandsModel.goToManageNodes(brandsData.brandNodeName);
    await brandsModel.configureDefaultSubBrandNode(brandsData.brandNodeName, brandsData.subBrandName);
    await brandsModel.configureDefaultStoreNode(brandsData.brandNodeName, brandsData.storeBrandName, NodesTypesEnum.brand);
    await brandsModel.configureDefaultStoreNode(brandsData.subBrandName, brandsData.storeSubBrandName, NodesTypesEnum.subbrand);
    await brandsModel.hasNodeTableValues(3);

    const uniqueId = uuidv4();
    let store = Object.assign({} , storeData);
    store.name = (storeData.name + uniqueId).slice(0, 40);
    store.circularPath = (storeData.circularPath + uniqueId).slice(0, 40);

    await brandsModel.addChildNodes(NodesTypesEnum.brand);
    await commonModel.checkCreateContentPopupVisible();
    await brandsModel.onClickNodeTypeStore();
    await brandsModel.fillStoreAllFields(store);

    // System must be able to add nodes just as Stores to the Brand, with the values provided.
    await brandsModel.checkRequiredValuesInStore(store);
    await brandsModel.checkNotRequiredValuesInStore(store);
    await brandsModel.onClickNodeSaveButton();
    await commonModel.waitUntilSpinnerDisappears();

    await brandsModel.expandItemsInTable(0);
    await brandsModel.getNodeNameCoincidenceInTable(store.name);

    await page.evaluate("document.body.style.scale='0.8'");
    await brandsModel.onClickNodeEditButton(0);
    const brandSubdomain = await brandsModel.nodeCircularSubdomainInput.innerText();
    await brandsModel.onClickNodeCancelButton();

    await brandsModel.openEditNodePopUp(store.name);
    const storeSubdomain = await brandsModel.nodeCircularSubdomainInput.innerText();
    await brandsModel.onClickNodeCancelButton();

    // Verify that the store is created within its parent node
    const subdomain = brandSubdomain == storeSubdomain;
    expect(subdomain).toBeTruthy();

    await brandsModel.deleteNode(store.name);
    await commonModel.waitUntilSpinnerDisappears();
  });

  test(`Verify if a user can add child nodes - Store with required fields to a SubBrand`, async ({ page }) => {
    const loginModel = new LoginModel(page);
    const brandsModel = new BrandsModel(page);
    const sidebarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(url);
    await page.setViewportSize({ width: 1000, height: 1000 });
    await loginModel.login(user.username, user.password);
    await sidebarModel.onClickBrandOptionMenu();

    await commonModel.setSearchValue(brandsData.brandNodeName);
    await brandsModel.hasBrandTableValues();
    await brandsModel.goToManageNodes(brandsData.brandNodeName);
    await brandsModel.configureDefaultSubBrandNode(brandsData.brandNodeName, brandsData.subBrandName);
    await brandsModel.configureDefaultStoreNode(brandsData.brandNodeName, brandsData.storeBrandName, NodesTypesEnum.brand);
    await brandsModel.configureDefaultStoreNode(brandsData.subBrandName, brandsData.storeSubBrandName, NodesTypesEnum.subbrand);
    await brandsModel.hasNodeTableValues(3);

    const uniqueId = uuidv4();
    let store = Object.assign({} , storeData);
    store.name = (storeData.name + uniqueId).slice(0, 40);
    store.circularPath = (storeData.circularPath + uniqueId).slice(0, 40);

    await brandsModel.onClickAddChildToThisNodes(brandsData.subBrandName);
    await commonModel.checkCreateContentPopupVisible();
    await brandsModel.fillStoreRequiredFields2(store);
    const imageUrl = path.join(__dirname, '../../images/Costco-Logo.png');
    await brandsModel.uploadImage(0, [imageUrl]); // This one uploads the logo
    await brandsModel.uploadImage(1, [imageUrl]); // This one uploads the fav icon

    // System must be able to add nodes just as Stores to the Brand, with the values provided.
    await brandsModel.checkRequiredValuesInStore(store);
    await brandsModel.onClickNodeSaveButton();
    await commonModel.waitUntilSpinnerDisappears();

    await brandsModel.getNodeNameCoincidenceInTable(store.name);

    await page.evaluate("document.body.style.scale='0.8'");
    await brandsModel.openEditNodePopUp(brandsData.subBrandName);
    const subBrandSubdomain = await brandsModel.nodeCircularSubdomainInput.innerText();
    await brandsModel.onClickNodeCancelButton();

    await brandsModel.openEditNodePopUp(store.name);
    const storeSubdomain = await brandsModel.nodeCircularSubdomainInput.innerText();
    await brandsModel.onClickNodeCancelButton();

    // Verify that the store is created within its parent node
    const subdomain = subBrandSubdomain == storeSubdomain;
    expect(subdomain).toBeTruthy();

    await brandsModel.deleteNode(store.name);
    await commonModel.waitUntilSpinnerDisappears();
  });


  test(`Verify if a user can add child nodes - Store with all fields to a SubBrand`, async ({ page }) => {
    const loginModel = new LoginModel(page);
    const brandsModel = new BrandsModel(page);
    const sidebarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(url);
    await page.setViewportSize({ width: 1000, height: 1000 });
    await loginModel.login(user.username, user.password);
    await sidebarModel.onClickBrandOptionMenu();

    await commonModel.setSearchValue(brandsData.brandNodeName);
    await brandsModel.hasBrandTableValues();
    await brandsModel.goToManageNodes(brandsData.brandNodeName);
    await brandsModel.configureDefaultSubBrandNode(brandsData.brandNodeName, brandsData.subBrandName);
    await brandsModel.configureDefaultStoreNode(brandsData.brandNodeName, brandsData.storeBrandName, NodesTypesEnum.brand);
    await brandsModel.configureDefaultStoreNode(brandsData.subBrandName, brandsData.storeSubBrandName, NodesTypesEnum.subbrand);
    await brandsModel.hasNodeTableValues(3);

    const uniqueId = uuidv4();
    let store = Object.assign({} , storeData);
    store.name = (storeData.name + uniqueId).slice(0, 40);
    store.circularPath = (storeData.circularPath + uniqueId).slice(0, 40);

    await brandsModel.onClickAddChildToThisNodes(brandsData.subBrandName);
    await commonModel.checkCreateContentPopupVisible();
    await brandsModel.fillStoreAllFields(store);

    // System must be able to add nodes just as Stores to the Brand, with the values provided.
    await brandsModel.checkRequiredValuesInStore(store);
    await brandsModel.checkNotRequiredValuesInStore(store);
    await brandsModel.onClickNodeSaveButton();
    await commonModel.waitUntilSpinnerDisappears();

    await brandsModel.getNodeNameCoincidenceInTable(store.name);

    await page.evaluate("document.body.style.scale='0.8'");
    await brandsModel.openEditNodePopUp(brandsData.subBrandName);
    const subBrandSubdomain = await brandsModel.nodeCircularSubdomainInput.innerText();
    await brandsModel.onClickNodeCancelButton();

    await brandsModel.openEditNodePopUp(store.name);
    const storeSubdomain = await brandsModel.nodeCircularSubdomainInput.innerText();
    await brandsModel.onClickNodeCancelButton();

    // Verify that the store is created within its parent node
    const subdomain = subBrandSubdomain == storeSubdomain;
    expect(subdomain).toBeTruthy();

    await brandsModel.deleteNode(store.name);
    await commonModel.waitUntilSpinnerDisappears();
  });

});