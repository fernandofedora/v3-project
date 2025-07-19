import { test, expect } from '@playwright/test';
import { LoginModel } from '../../pom/loginModel';
import { TopBarModel } from '../../pom/topBarModel';
import { BrandsModel } from '../../pom/brandsModel';
import { CommonModel } from '../../pom/commonModel';
import { SidebarModel } from '../../pom/sidebarModel';
import { brandsData, subBrandData, storeData } from '../../data/brandsData';
import { RolesEnum } from '../../enums/roles.enum';
import { NodesTypesEnum } from '../../enums/nodeTypes.enum';
import { StoreDto } from '../../dto/store.dto';
import { validateEnvironment } from '../../utils/urlHandler';
import { validateUsers } from '../../utils/userHandler';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const users = validateUsers().filter(user => user.role === RolesEnum.superAdmin);
const user = users[0];
const url: string = validateEnvironment();

test.describe('Manage Brands', () => {

  test.beforeEach(async ({ page }) => {
    test.setTimeout(130000);
    await page.goto(url);
  });

  test(`Verify if a new brand is created with valid data`, async ({ page }) => {
    await page.setViewportSize({width: 1600, height: 1600});
    const loginModel = new LoginModel(page);
    const brandsModel = new BrandsModel(page);
    const sidebarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);

    await loginModel.login(user.username, user.password);
    await sidebarModel.onClickBrandOptionMenu();

    const brandName = (brandsData.brandDefaultName + uuidv4()).slice(0, 32);
    await brandsModel.createBrand(brandName, { dual: false });
    await commonModel.waitUntilSpinnerDisappears();
    await commonModel.setSearchValue(brandName);
    await brandsModel.brandTableShouldHasOneRow();

    await brandsModel.checkValueInBrandTable(brandName);
  });

  test(`Verify if a brand is edited successfully from the brand page`, async ({ page }) => {
    await page.setViewportSize({width: 1600, height: 1600});
    const loginModel = new LoginModel(page);
    const brandsModel = new BrandsModel(page);
    const sidebarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);

    await loginModel.login(user.username, user.password);
    await sidebarModel.onClickBrandOptionMenu();

    const brandName = (brandsData.brandDefaultName + uuidv4()).slice(0, 32);
    await brandsModel.createBrand(brandName, { dual: false });
    await commonModel.waitUntilSpinnerDisappears();
    await commonModel.setSearchValue(brandName);
    await brandsModel.brandTableShouldHasOneRow();

    await brandsModel.editBrand(brandName);
    await commonModel.waitUntilSpinnerDisappears();

    const brandName2 = brandName + 'Edit';
    await brandsModel.checkValueInBrandTable(brandName2);
  });

  test(`Verify if a user can add child nodes 'SubBrand' with required fields to a Brand`, async ({ page }) => {
    await page.setViewportSize({width: 1600, height: 1600});
    const loginModel = new LoginModel(page);
    const brandsModel = new BrandsModel(page);
    const sidebarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);

    await loginModel.login(user.username, user.password);
    await sidebarModel.onClickBrandOptionMenu();

    await commonModel.setSearchValue(brandsData.brandNodeName);
    await brandsModel.brandTableShouldHasOneRow();
    await brandsModel.goToManageNodes(brandsData.brandNodeName);
    await brandsModel.configureDefaultSubBrandNode(brandsData.brandNodeName, brandsData.subBrandName);
    //// await brandsModel.configureDefaultStoreNode(brandsData.brandNodeName, brandsData.storeBrandName, NodesTypesEnum.brand);
    //// await brandsModel.configureDefaultStoreNode(brandsData.subBrandName, brandsData.storeSubBrandName, NodesTypesEnum.subbrand);
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

    await brandsModel.verifyNodeIsNotDisplayed(subbrand.name);
  });

  test(`Verify if a user can add child nodes 'SubBrand' with all fields to a Brand`, async ({ page }) => {
    await page.setViewportSize({width: 1600, height: 1600});
    const loginModel = new LoginModel(page);
    const brandsModel = new BrandsModel(page);
    const sidebarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);

    await loginModel.login(user.username, user.password);
    await sidebarModel.onClickBrandOptionMenu();

    await commonModel.setSearchValue(brandsData.brandNodeName);
    await brandsModel.brandTableShouldHasOneRow();
    await brandsModel.goToManageNodes(brandsData.brandNodeName);
    await brandsModel.configureDefaultSubBrandNode(brandsData.brandNodeName, brandsData.subBrandName);
    // await brandsModel.configureDefaultStoreNode(brandsData.brandNodeName, brandsData.storeBrandName, NodesTypesEnum.brand);
    // await brandsModel.configureDefaultStoreNode(brandsData.subBrandName, brandsData.storeSubBrandName, NodesTypesEnum.subbrand);
    await brandsModel.hasNodeTableValues(3);

    const uniqueId = uuidv4();
    let subbrand = Object.assign({} , subBrandData);
    subbrand.name = (subBrandData.name + uniqueId).slice(0, 32);
    subbrand.subDomain = (subBrandData.subDomain + uniqueId).slice(0, 32).split('-').join('');

    await brandsModel.addChildNodes(NodesTypesEnum.brand);
    await commonModel.checkCreateContentPopupVisible();
    await brandsModel.fillSubBrandRequiredFields(subbrand);

    await brandsModel.onClickContentAdminUser(1);
    await brandsModel.onClickCategoryDividedLayout(true);
    await brandsModel.onClickNationalFeatureDeals(true);
    await brandsModel.onClickCircularStartDayOption('Monday');
    await brandsModel.selectCircularDayStartTime('0815');

    await brandsModel.onClickRecipeToogle(true);
    await brandsModel.onClickCouponToogle(true);
    await brandsModel.onClickActiveToogle(true);
    await brandsModel.onClickHideCartToogle(true);
    await brandsModel.onClickDeferCartToogle(true);

    await brandsModel.onSelectSupportedLanguages(brandsData.englishLanguage, true);
    await brandsModel.selectionDefaultLanguage(brandsData.englishLanguage);

    await brandsModel.setNotes(storeData.notes);
    await brandsModel.uploadImage(0, path.join(__dirname, '../../images/masterchief helmet.jpg')); // Logo Field
    await brandsModel.uploadImage(1, path.join(__dirname, '../../images/masterchief.jpg')); // How To Image Field
    await brandsModel.uploadImage(2, path.join(__dirname, '../../images/masterchief2.jpg')); // Kiosk Header Image Logo Field
    await brandsModel.uploadImage(3, path.join(__dirname, '../../images/masterchief3.jpg')); // Fav Icon Field
    await brandsModel.uploadImage(4, path.join(__dirname, '../../images/masterchief helmet.jpg')); // Logo Click Link Field

    await brandsModel.setHowToYoutubeId(brandsData.howToYoutubeId);
    await brandsModel.setUiConfig(brandsData.nodeUiConfig)
    await brandsModel.setStoreDisplayText(subBrandData.storeDisplayText);
    await brandsModel.setTheme(brandsData.nodeTheme);
    await brandsModel.setDefaultPageName(brandsData.nodeStartPage);
    await brandsModel.setCategoryPageName(brandsData.nodeCategoryPage);

    await brandsModel.onClickStoresLinkedToogle(true);
    await brandsModel.onClickGoLiveToogle(true);
    await brandsModel.nodeLiveDateInput.click();
    await commonModel.selectDate('2022', 'MAR', '1', '01', '00');

    await expect(brandsModel.nodeNameInput).toHaveValue(subbrand.name, { timeout: 5000 });
    await expect(brandsModel.nodeCircularSubdomainInput).toHaveValue(subbrand.subDomain, { timeout: 5000 });
    await expect(brandsModel.nodeSiteTitleInput).toHaveValue(subbrand.siteTitle, { timeout: 5000 });
    await expect(brandsModel.nodeSiteDescriptionInput).toHaveValue(subbrand.siteDesc, { timeout: 5000 });
    await expect(brandsModel.storeDisplayTextInput).toHaveValue(subbrand.storeDisplayText, { timeout: 5000 });
    await expect(brandsModel.nodeNotesTextArea).toHaveValue(storeData.notes);

    const isCdlEnable = (await brandsModel.nodeCategoryDividedLayoutSwitch.locator('button').getAttribute('aria-checked'))?.includes('true');
    const isNationalFeaturedEnable = (await brandsModel.nodeNationalFeaturedDealsSwitch.locator('button').getAttribute('aria-checked'))?.includes('true');
    const isRecipeSupportEnable = (await brandsModel.nodeRecipeSupportToogle.locator('button').getAttribute('aria-checked'))?.includes('true');
    const isCouponSupportEnable = (await brandsModel.nodeCouponSupportToogle.locator('button').getAttribute('aria-checked'))?.includes('true');
    const isActiveEnable = (await brandsModel.nodeActiveToogle.locator('button').getAttribute('aria-checked'))?.includes('true');
    const isHideCartEnable = (await brandsModel.nodeHideCartSwitch.locator('button').getAttribute('aria-checked'))?.includes('true');
    const isDeferCartEnable = (await brandsModel.nodeDeferCartToogle.locator('button').getAttribute('aria-checked'))?.includes('true');
    const isWarningThresholdEnable = (await brandsModel.nodeWarningThresholdToogle.locator('button').getAttribute('aria-checked'))?.includes('true');
    expect(isCdlEnable).toBeTruthy();
    expect(isNationalFeaturedEnable).toBeTruthy();
    expect(isRecipeSupportEnable).toBeTruthy();
    expect(isCouponSupportEnable).toBeTruthy();
    expect(isActiveEnable).toBeTruthy();
    expect(isHideCartEnable).toBeTruthy();
    expect(isDeferCartEnable).toBeTruthy();
    expect(isWarningThresholdEnable).toBeTruthy();

    await brandsModel.onClickNodeSaveButton();
    await commonModel.waitUntilSpinnerDisappears();

    await brandsModel.expandItemsInTable(0);
    await brandsModel.getNodeNameCoincidenceInTable(subbrand.name);
    await brandsModel.deleteNode(subbrand.name);
    await commonModel.waitUntilSpinnerDisappears();

    await brandsModel.verifyNodeIsNotDisplayed(subbrand.name);
  });

  test(`Verify if a user can add child nodes 'Store' with required fields to a Brand`, async ({ page }) => {
    await page.setViewportSize({width: 1600, height: 1600});
    const loginModel = new LoginModel(page);
    const brandsModel = new BrandsModel(page);
    const sidebarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);

    await loginModel.login(user.username, user.password);
    await sidebarModel.onClickBrandOptionMenu();

    await commonModel.setSearchValue(brandsData.brandNodeName);
    await brandsModel.brandTableShouldHasOneRow();
    await brandsModel.goToManageNodes(brandsData.brandNodeName);
    await brandsModel.configureDefaultSubBrandNode(brandsData.brandNodeName, brandsData.subBrandName);
    await brandsModel.configureDefaultStoreNode(brandsData.brandNodeName, brandsData.storeBrandName, NodesTypesEnum.brand);
    // await brandsModel.configureDefaultStoreNode(brandsData.subBrandName, brandsData.storeSubBrandName, NodesTypesEnum.subbrand);
    await brandsModel.hasNodeTableValues(3);

    const uniqueId = uuidv4();
    let store: StoreDto = Object.assign({} , storeData);
    store.name = (storeData.name + uniqueId).slice(0, 40);
    store.circularPath = (storeData.circularPath + uniqueId).slice(0, 40);
    store.googlePlaceId = store.googlePlaceId[0];

    await brandsModel.addChildNodes(NodesTypesEnum.brand);
    await commonModel.checkCreateContentPopupVisible();
    await brandsModel.onClickNodeTypeStore();
    await brandsModel.fillStoreRequiredFields2(store);

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

    await brandsModel.verifyNodeIsNotDisplayed(store.name);
  });

  test(`Verify if a user can add child nodes 'Store' with required fields to a SubBrand`, async ({ page }) => {
    //await page.setViewportSize({width: 1600, height: 1600});
    const loginModel = new LoginModel(page);
    const brandsModel = new BrandsModel(page);
    const sidebarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);

    await loginModel.login(user.username, user.password);
    await sidebarModel.onClickBrandOptionMenu();

    await commonModel.setSearchValue(brandsData.brandNodeName);
    await brandsModel.brandTableShouldHasOneRow();
    await brandsModel.goToManageNodes(brandsData.brandNodeName);
    await brandsModel.configureDefaultSubBrandNode(brandsData.brandNodeName, brandsData.subBrandName);
    // await brandsModel.configureDefaultStoreNode(brandsData.brandNodeName, brandsData.storeBrandName, NodesTypesEnum.brand);
    await brandsModel.configureDefaultStoreNode(brandsData.subBrandName, brandsData.storeSubBrandName, NodesTypesEnum.subbrand);
    await brandsModel.hasNodeTableValues(3);

    const uniqueId = uuidv4();
    let store: StoreDto = Object.assign({} , storeData);
    store.name = (storeData.name + uniqueId).slice(0, 40);
    store.circularPath = (storeData.circularPath + uniqueId).slice(0, 40);
    store.googlePlaceId = store.googlePlaceId[1];

    await brandsModel.onClickAddChildToThisNodes(brandsData.subBrandName);
    await commonModel.checkCreateContentPopupVisible();
    await brandsModel.fillStoreRequiredFields3(store);
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

    await brandsModel.verifyNodeIsNotDisplayed(store.name);
  });

  test(`Verify a user can edit a brand node`, async ({ page }) => {
    //await page.setViewportSize({width: 1600, height: 1600});
    const loginModel = new LoginModel(page);
    const brandsModel = new BrandsModel(page);
    const sidebarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);

    await loginModel.login(user.username, user.password);
    await sidebarModel.onClickBrandOptionMenu();

    const brandName = (brandsData.brandDefaultName + uuidv4()).slice(0, 32);
    await brandsModel.createBrand(brandName, { dual: false });
    await commonModel.waitUntilSpinnerDisappears();
    await page.waitForTimeout(6000);
    await commonModel.setSearchValue(brandName);
    await brandsModel.brandTableShouldHasOneRow();
    await brandsModel.goToManageNodes(brandName);
    await brandsModel.hasNodeTableValues(1);
    await brandsModel.openEditNodePopUp(brandName);
    await brandsModel.hasLoadInputsManageNode();
    await brandsModel.setNodeSiteTitle(subBrandData.siteTitle);
    await brandsModel.setNodeSiteDescription(subBrandData.siteDesc);
    await brandsModel.onClickContentAdminUser(1);
    await brandsModel.onClickCircularStartDayOption('Monday');
    await brandsModel.selectCircularDayStartTime('0815');
    await brandsModel.onClickBrandCategoryDividedLayout(true);
    await brandsModel.onClickBrandNationalFeatureDeals(true);
    await brandsModel.onClickBrandRecipeToogle(true);
    await brandsModel.onClickBrandCouponToogle(true);
    await brandsModel.onClickBrandUnclippingSupportToogle(true);
    await brandsModel.onClickBrandActiveToogle(true);
    await brandsModel.onClickBrandHideCartToogle(true);
    await brandsModel.onClickBrandDeferCartToogle(true);
    await brandsModel.onClickBrandWarningThresholdToogle(true);
    await brandsModel.onClickBrandStoreSelectorRadiusToogle(true);
    await brandsModel.setMinimumContentThreshold('2');
    await brandsModel.setNotes(storeData.notes);

    const imageUrl = path.join(__dirname, '../../images/Costco-Logo.png');
    await brandsModel.uploadImage(0, [imageUrl]);
    await brandsModel.uploadImage(1, [imageUrl]);
    await brandsModel.uploadImage(2, [imageUrl]);
    await brandsModel.uploadImage(3, [imageUrl]);
    await brandsModel.uploadImage(4, [imageUrl]);
    await brandsModel.uploadImage(5, [imageUrl]);

    await brandsModel.setHowToYoutubeId(brandsData.howToYoutubeId);
    await brandsModel.setUiConfig(brandsData.nodeUiConfig)
    await brandsModel.setStoreDisplayText(subBrandData.storeDisplayText);
    await brandsModel.setTheme(brandsData.nodeTheme);
    await brandsModel.setDefaultPageName(brandsData.nodeStartPage);
    await brandsModel.setCategoryPageName(brandsData.nodeCategoryPage);
    await brandsModel.setLogoClickLink(storeData.logoLink);

    await brandsModel.onClickStoresLinkedToogle(true);
    await brandsModel.onClickBrandGoLiveToogle(true);
    await brandsModel.nodeLiveDateInput.click();
    await commonModel.selectDate('2022', 'MAR', '1', '01', '00');

    const adminUserValue = await brandsModel.nodeContentAdminDropdown.innerText();
    const circularStartDayValue = await brandsModel.nodeCircularStartDayDropdown.inputValue();
    const circularStartTimeValue = await brandsModel.storeCircularDayStartTimeInput.inputValue();
    const supportLanguages = await brandsModel.nodeSupportLanguagesField.innerText();
    const defaultLanguages = await brandsModel.nodeDefaultLanguageField.innerText();
    const liveDateValue = await brandsModel.nodeLiveDateInput.inputValue();

    await page.evaluate("document.body.style.scale='0.8'");
    await page.waitForTimeout(500);
    await brandsModel.onClickNodeSaveButton();
    await commonModel.waitUntilSpinnerDisappears();
    await brandsModel.openEditNodePopUp(brandName);

    await brandsModel.verifyThatElementsInEditNodePopUpAreVisible();
    await expect(brandsModel.nodeSiteTitleInput).toHaveValue(subBrandData.siteTitle, { timeout: 5000 });
    await expect(brandsModel.nodeSiteDescriptionInput).toHaveValue(subBrandData.siteDesc, { timeout: 5000 });
    await expect(brandsModel.storeDisplayTextInput).toHaveValue(subBrandData.storeDisplayText, { timeout: 5000 });
    await expect(brandsModel.nodeNotesTextArea).toHaveValue(storeData.notes, { timeout: 5000 });
    await expect(brandsModel.storeLogoLinkInput).toHaveValue(storeData.logoLink, { timeout: 5000 });
    await expect(brandsModel.nodeUIConfigInput).toHaveValue(brandsData.nodeUiConfig, { timeout: 5000 });
    await expect(brandsModel.nodeThemeInput).toHaveValue(brandsData.nodeTheme, { timeout: 5000 });
    await expect(brandsModel.nodeDefaultPageNameInput).toHaveValue(brandsData.nodeStartPage, { timeout: 5000 });
    await expect(brandsModel.nodeCategoryPageNameInput).toHaveValue(brandsData.nodeCategoryPage, { timeout: 5000 });

    const isCdlEnable = (await brandsModel.brandCategoryDividedLayoutSwitch.locator('button').getAttribute('aria-checked'))?.includes('true');
    const isNationalFeaturedEnable = (await brandsModel.brandNationalFeaturedDealsSwitch.locator('button').getAttribute('aria-checked'))?.includes('true');
    const isRecipeSupportEnable = (await brandsModel.brandRecipeSupportToogle.locator('button').getAttribute('aria-checked'))?.includes('true');
    const isCouponSupportEnable = (await brandsModel.brandCouponSupportToogle.locator('button').getAttribute('aria-checked'))?.includes('true');
    const isActiveEnable = (await brandsModel.brandActiveToogle.locator('button').getAttribute('aria-checked'))?.includes('true');
    const isHideCartEnable = (await brandsModel.brandHideCartSwitch.locator('button').getAttribute('aria-checked'))?.includes('true');
    const isDeferCartEnable = (await brandsModel.brandDeferCartToogle.locator('button').getAttribute('aria-checked'))?.includes('true');
    const isWarningThresholdEnable = (await brandsModel.brandWarningThresholdToogle.locator('button').getAttribute('aria-checked'))?.includes('true');
    const isStoreSelectRadiusEnabled = (await brandsModel.brandStoreSelectorRadiusToogle.locator('button').getAttribute('aria-checked'))?.includes('true');
    const unclippingSupportEnabled = (await brandsModel.brandUnclippingSupportToogle.locator('button').getAttribute('aria-checked'))?.includes('true');
    expect(isCdlEnable).toBeTruthy();
    expect(isNationalFeaturedEnable).toBeTruthy();
    expect(isRecipeSupportEnable).toBeTruthy();
    expect(isCouponSupportEnable).toBeTruthy();
    expect(isActiveEnable).toBeTruthy();
    expect(isHideCartEnable).toBeTruthy();
    expect(isDeferCartEnable).toBeTruthy();
    expect(isWarningThresholdEnable).toBeTruthy();
    expect(isStoreSelectRadiusEnabled).toBeTruthy();
    expect(unclippingSupportEnabled).toBeTruthy();

    const brand = brandName.toLowerCase();
    expect(await brandsModel.nodeLogoInput.inputValue()).toContain(brand);
    expect(await brandsModel.brandNationalContentBannerInput.inputValue()).toContain(brand);
    expect(await brandsModel.nodeHowToImgInput.inputValue()).toContain(brand);
    expect(await brandsModel.nodeKioskHeaderImgInput.inputValue()).toContain(brand);
    expect(await brandsModel.nodeFavIconInput.inputValue()).toContain(brand);
    expect(await brandsModel.printLogoInput.inputValue()).toContain(brand);
    await expect(async () => {
      expect((await brandsModel.nodeContentAdminDropdown.locator('span.mat-mdc-select-min-line').innerText())).toContain(adminUserValue);
    }).toPass();
    
    await expect(brandsModel.nodeCircularStartDayDropdown).toHaveValue(circularStartDayValue);
    await expect(brandsModel.storeCircularDayStartTimeInput).toHaveValue(circularStartTimeValue);
    expect((await brandsModel.nodeSupportLanguagesField.locator('div.p-multiselect-label').innerText())).toContain(supportLanguages);
    expect((await brandsModel.nodeDefaultLanguageField.locator('span.p-dropdown-label').innerText())).toContain(defaultLanguages);
    await expect(brandsModel.nodeLiveDateInput).toHaveValue(liveDateValue);
  });

  test(`Verify if a user can edit child nodes 'SubBrand' with required fields to a Brand`, async ({ page }) => {
    test.setTimeout(180000);
    await page.setViewportSize({width: 1600, height: 1600});
    const loginModel = new LoginModel(page);
    const brandsModel = new BrandsModel(page);
    const sidebarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);

    await loginModel.login(user.username, user.password);
    await sidebarModel.onClickBrandOptionMenu();

    await commonModel.setSearchValue(brandsData.brandNodeName);
    await brandsModel.brandTableShouldHasOneRow();
    await brandsModel.goToManageNodes(brandsData.brandNodeName);
    await brandsModel.configureDefaultSubBrandNode(brandsData.brandNodeName, brandsData.subBrandName);
    // await brandsModel.configureDefaultStoreNode(brandsData.brandNodeName, brandsData.storeBrandName, NodesTypesEnum.brand);
    // await brandsModel.configureDefaultStoreNode(brandsData.subBrandName, brandsData.storeSubBrandName, NodesTypesEnum.subbrand);
    await brandsModel.hasNodeTableValues(3);

    const uniqueId = uuidv4();
    let subbrand = Object.assign({} , subBrandData);
    subbrand.name = (subBrandData.name + uniqueId).slice(0, 28);
    subbrand.subDomain = (subBrandData.subDomain + uniqueId).slice(0, 28).split('-').join('');

    await brandsModel.addChildNodes(NodesTypesEnum.brand);
    await commonModel.checkCreateContentPopupVisible();
    await brandsModel.fillSubBrandRequiredFields(subbrand);
    await brandsModel.onClickNodeSaveButton();
    await commonModel.waitUntilSpinnerDisappears();

    await page.evaluate("document.body.style.scale='0.8'");
    await brandsModel.openEditNodePopUp(subbrand.name);
    const editConcat = "Edit";
    subbrand.name += editConcat;
    subbrand.subDomain += 'edit';
    subbrand.siteTitle += editConcat;
    subbrand.siteDesc += editConcat;
    subbrand.storeDisplayText += editConcat;
    await brandsModel.fillSubBrandRequiredFields(subbrand);
    await brandsModel.onClickNodeSaveButton();
    await commonModel.waitUntilSpinnerDisappears();

    await brandsModel.checkNodeWithTypeInTable(subbrand.name, NodesTypesEnum.subbrand)
    await brandsModel.openEditNodePopUp(subbrand.name);
    // System must be able to edit the subbrand with the values provided
    await expect(brandsModel.nodeNameInput).toHaveValue(subbrand.name, { timeout: 5000 });
    await expect(brandsModel.nodeCircularSubdomainInput).toHaveValue(subbrand.subDomain, { timeout: 5000 });
    await expect(brandsModel.nodeSiteTitleInput).toHaveValue(subbrand.siteTitle, { timeout: 5000 });
    await expect(brandsModel.nodeSiteDescriptionInput).toHaveValue(subbrand.siteDesc, { timeout: 5000 });
    await expect(brandsModel.storeDisplayTextInput).toHaveValue(subbrand.storeDisplayText, { timeout: 5000 });

    await brandsModel.onClickNodeCancelButton();
    await brandsModel.deleteNode(subbrand.name);
    await commonModel.waitUntilSpinnerDisappears();
    await brandsModel.verifyNodeIsNotDisplayed(subbrand.name);
  });

  test(`Verify if a user can edit child nodes 'Store' with required fields to a Brand`, async ({ page }) => {
    test.setTimeout(180000);
    await page.setViewportSize({width: 1600, height: 1600});
    const loginModel = new LoginModel(page);
    const brandsModel = new BrandsModel(page);
    const sidebarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);

    await loginModel.login(user.username, user.password);
    await sidebarModel.onClickBrandOptionMenu();

    await commonModel.setSearchValue(brandsData.brandNodeName);
    await brandsModel.brandTableShouldHasOneRow();
    await brandsModel.goToManageNodes(brandsData.brandNodeName);
    await brandsModel.configureDefaultSubBrandNode(brandsData.brandNodeName, brandsData.subBrandName);
    await brandsModel.configureDefaultStoreNode(brandsData.brandNodeName, brandsData.storeBrandName, NodesTypesEnum.brand);
    // await brandsModel.configureDefaultStoreNode(brandsData.subBrandName, brandsData.storeSubBrandName, NodesTypesEnum.subbrand);
    await brandsModel.hasNodeTableValues(3);

    const uniqueId = uuidv4();
    let store: StoreDto = Object.assign({} , storeData);
    store.name = (storeData.name + uniqueId).slice(0, 40);
    store.circularPath = (storeData.circularPath + uniqueId).slice(0, 40);
    store.googlePlaceId = store.googlePlaceId[2];

    await brandsModel.addChildNodes(NodesTypesEnum.brand);
    await commonModel.checkCreateContentPopupVisible();
    await brandsModel.onClickNodeTypeStore();
    await brandsModel.fillStoreRequiredFields(store);
    await brandsModel.onClickNodeSaveButton();
    await commonModel.waitUntilSpinnerDisappears();

    await page.evaluate("document.body.style.scale='0.8'");
    await brandsModel.openEditNodePopUp(store.name);
    const editConcat = 'Edit';
    store.name += editConcat;
    store.circularPath += editConcat;
    store.address += editConcat;
    store.city += editConcat;
    store.state += editConcat;
    store.zip += editConcat;
    store.phone = '(343) 328-7023';
    store.googleLocation += editConcat;
    store.title = editConcat;
    await brandsModel.fillStoreRequiredFields(store);
    await brandsModel.onClickNodeSaveButton();
    await commonModel.waitUntilSpinnerDisappears();

    await brandsModel.checkNodeWithTypeInTable(store.name, NodesTypesEnum.store);
    await brandsModel.openEditNodePopUp(store.name);
    //System must be able to edit the store with the values provided
    await brandsModel.checkRequiredValuesInStore(store);
    await brandsModel.onClickNodeCancelButton();
    await brandsModel.deleteNode(store.name);
    await commonModel.waitUntilSpinnerDisappears();
    await brandsModel.verifyNodeIsNotDisplayed(store.name);
  });

  test(`Verify if a user can edit child nodes 'Store' with required fields to a SubBrand`, async ({ page }) => {
    test.setTimeout(180000);
    await page.setViewportSize({width: 1600, height: 1600});
    const loginModel = new LoginModel(page);
    const brandsModel = new BrandsModel(page);
    const sidebarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);

    await loginModel.login(user.username, user.password);
    await sidebarModel.onClickBrandOptionMenu();

    await commonModel.setSearchValue(brandsData.brandNodeName);
    await brandsModel.brandTableShouldHasOneRow();
    await brandsModel.goToManageNodes(brandsData.brandNodeName);
    await brandsModel.configureDefaultSubBrandNode(brandsData.brandNodeName, brandsData.subBrandName);
    // await brandsModel.configureDefaultStoreNode(brandsData.brandNodeName, brandsData.storeBrandName, NodesTypesEnum.brand);
    await brandsModel.configureDefaultStoreNode(brandsData.subBrandName, brandsData.storeSubBrandName, NodesTypesEnum.subbrand);
    await brandsModel.hasNodeTableValues(3);

    const uniqueId = uuidv4();
    let store: StoreDto = Object.assign({} , storeData);
    store.name = (storeData.name + uniqueId).slice(0, 40);
    store.circularPath = (storeData.circularPath + uniqueId).slice(0, 40);
    store.googlePlaceId = store.googlePlaceId[3];

    await brandsModel.onClickAddChildToThisNodes(brandsData.subBrandName);
    await commonModel.checkCreateContentPopupVisible();
    await brandsModel.fillStoreRequiredFields(store);
    const imageUrl = path.join(__dirname, '../../images/Costco-Logo.png');
    await brandsModel.uploadImage(0, [imageUrl]); // This one uploads the logo
    await brandsModel.uploadImage(1, [imageUrl]); // This one uploads the fav icon
    await brandsModel.onClickNodeSaveButton();
    await commonModel.waitUntilSpinnerDisappears();

    await page.evaluate("document.body.style.scale='0.8'");
    await brandsModel.openEditNodePopUp(store.name);
    const editConcat = 'Edit';
    store.name += editConcat;
    store.circularPath += editConcat;
    store.address += editConcat;
    store.city += editConcat;
    store.state += editConcat;
    store.zip += editConcat;
    store.phone = '(343) 328-7023';
    store.googleLocation += editConcat;
    store.title = editConcat;
    await brandsModel.fillStoreRequiredFields(store);
    await brandsModel.onClickNodeSaveButton();
    await commonModel.waitUntilSpinnerDisappears();

    await brandsModel.checkNodeWithTypeInTable(store.name, NodesTypesEnum.store);
    await brandsModel.openEditNodePopUp(store.name);
    //System must be able to edit the store with the values provided
    await brandsModel.checkRequiredValuesInStore(store);
    await brandsModel.onClickNodeCancelButton();
    await brandsModel.deleteNode(store.name);
    await commonModel.waitUntilSpinnerDisappears();
    await brandsModel.verifyNodeIsNotDisplayed(store.name);
  });

});
