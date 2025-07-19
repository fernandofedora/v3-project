import { test, expect } from '@playwright/test';
import { LoginModel } from '../../pom/loginModel';
import {SidebarModel} from '../../pom/sidebarModel';
import {validateEnvironment} from '../../utils/urlHandler';
import {validateUsers} from '../../utils/userHandler';
import { CommonModel } from '../../pom/commonModel';
import { BrandsModel } from '../../pom/brandsModel';
import { storeOwnerRoleValidation } from '../../utils/rolesHandler';
import { brandsData, subBrandData } from '../../data/brandsData';
import { NodesTypesEnum } from '../../enums/nodeTypes.enum';
import {v4 as uuidv4} from 'uuid';
import { TopBarModel } from '../../pom/topBarModel';

const users = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.brandNodeContentName));
const user = users[0];
const url: string = validateEnvironment();

  test.describe('Manage Brands - coupons integrations', () => {

    test.beforeEach(async ({ page }) => {
      test.setTimeout(180000); 
    });

    test.afterAll(async () => {
      test.setTimeout(2500);
    });

  test(`Verify if a new brand is created with valid data`, async ({ page }) => {
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);
    const brandsModel = new BrandsModel(page);

    await page.goto(url);
    await loginModel.login(user.username, user.password);
    await sideBarModel.onClickBrandOptionMenu();

    let brandName = brandsData.brandDefaultName.concat(uuidv4()).slice(0, 32);
    await brandsModel.createBrand(brandName, { dual: false });
    await commonModel.waitUntilSpinnerDisappears();
    await commonModel.setSearchValue(brandName);
    await brandsModel.hasBrandTableValues();

    await brandsModel.checkValueInBrandTable(brandName);

  });


  test(`Verify if alert appears when creating an existing Brand`, async ({ page }) => {
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);
    const brandsModel = new BrandsModel(page);

    await page.goto(url);
    await loginModel.login(user.username, user.password);
    await sideBarModel.onClickBrandOptionMenu();

    await brandsModel.createBrand(brandsData.brandNodeName, { dual: false });

    await commonModel.verifyAlertMessageVisible();
    expect(await commonModel.existAlert.nth(0).innerText()).toContain(brandsData.brandExist);
    expect(await commonModel.existAlert.nth(1).innerText()).toContain(brandsData.brandNameExist);

  });



  test(`Verify if a brand is edited successfully from the brand page`, async ({ page }) => {
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);
    const brandsModel = new BrandsModel(page);

    await page.goto(url);
    await loginModel.login(user.username, user.password);
    await sideBarModel.onClickBrandOptionMenu();

    let brandName = brandsData.brandDefaultName.concat(uuidv4()).slice(0, 32);
    await brandsModel.createBrand(brandName, { dual: false });
    await commonModel.waitUntilSpinnerDisappears();

    await commonModel.setSearchValue(brandName);
    await brandsModel.hasBrandTableValues();

    await brandsModel.editBrand(brandName);
    await commonModel.waitUntilSpinnerDisappears();

    // Validate message appears when brand is edited
    // This message expect can cause a false positive result due to server response time
    // await t.expect(common.snackBar.innerText).contains(brandsData.brandEditedSuccessfully);
    //await t.expect(isLoggerRequest(httpPetition.put)).ok();

    const brandName2 = brandName.concat('Edit');
    await brandsModel.checkValueInBrandTable(brandName2);
  });


  test(`Verify if alert appears when editing an existing Brand`, async ({ page }) => {
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);
    const brandsModel = new BrandsModel(page);

    await page.goto(url);
    await loginModel.login(user.username, user.password);
    await sideBarModel.onClickBrandOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    let brandName = brandsData.brandDefaultName.concat(uuidv4()).slice(0, 32);
    await brandsModel.createBrand(brandName, { dual: false });
    await commonModel.waitUntilSpinnerDisappears();

    await commonModel.setSearchValue(brandName);
    await brandsModel.hasBrandTableValues();
    await brandsModel.editBrand2(brandName);

    await commonModel.verifyAlertMessageVisible();
    expect(await commonModel.existAlert.nth(0).innerText()).toContain(brandsData.brandExist);
    expect(await commonModel.existAlert.nth(1).innerText()).toContain(brandsData.brandNameExist);
  });


  test(`Verify the validation of the required fields of the brand`, async ({ page }) => {

    page.setViewportSize({ width: 1000, height: 1000 });

    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);
    const brandsModel = new BrandsModel(page);

    await page.goto(url);
    await loginModel.login(user.username, user.password);
    await sideBarModel.onClickBrandOptionMenu();

    await commonModel.setSearchValue(brandsData.brandNodeName);
    await brandsModel.hasBrandTableValues();
    await brandsModel.goToManageNodes(brandsData.brandNodeName);
    await brandsModel.hasNodeTableValues(1);
    await brandsModel.openEditNodePopUp(brandsData.brandNodeName);
    await commonModel.waitUntilSpinnerDisappears();
    await brandsModel.hasNodeRequiredValues();

    await brandsModel.brandNameInput.click({delay:500});
    await brandsModel.brandNameInput.clear();


    await brandsModel.nodeSiteTitleInput.click({delay:500});
    await brandsModel.nodeSiteTitleInput.clear();

    await brandsModel.nodeSiteDescriptionInput.click({delay:500});
    await brandsModel.nodeSiteDescriptionInput.clear();

    await brandsModel.storeDisplayTextInput.click({delay:500});
    await brandsModel.storeDisplayTextInput.clear();

    await brandsModel.onClickNodeSaveButton();
    await commonModel.waitUntilSpinnerDisappears();
    await brandsModel.verifyAlertMessagesAreDisplayed();
    expect(await commonModel.existAlert.nth(0).innerText()).toContain(brandsData.nameRequired);
    expect(await commonModel.existAlert.nth(1).innerText()).toContain(brandsData.siteDescriptionRequired);
    expect(await commonModel.existAlert.nth(2).innerText()).toContain(brandsData.siteTitleRequired);
    expect(await commonModel.existAlert.nth(3).innerText()).toContain(brandsData.storeDisplayTextRequired);

    expect(await commonModel.fieldRequired.nth(0).innerText()).toContain(brandsData.fieldRequired);
    expect(await commonModel.fieldRequired.nth(1).innerText()).toContain(brandsData.fieldRequired);
    expect(await commonModel.fieldRequired.nth(2).innerText()).toContain(brandsData.fieldRequired);
  });


  test(`Verify that the manage node view in hierarchy view display the nodes for the required brand`, async ({ page }) => {
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);
    const brandsModel = new BrandsModel(page);
    const topMenu = new TopBarModel(page);

    await page.goto(url);
    await loginModel.login(user.username, user.password);
    await sideBarModel.onClickBrandOptionMenu();

    await commonModel.setSearchValue(brandsData.brandNodeName);
    await brandsModel.hasBrandTableValues();
    await brandsModel.goToManageNodes(brandsData.brandNodeName);
    await topMenu.selectBrand(brandsData.brandNodeName);
    await brandsModel.configureDefaultSubBrandNode(brandsData.brandNodeName, brandsData.subBrandName);
    await brandsModel.configureDefaultStoreNode(brandsData.brandNodeName, brandsData.storeBrandName, NodesTypesEnum.brand);
    await brandsModel.configureDefaultStoreNode(brandsData.subBrandName, brandsData.storeSubBrandName, NodesTypesEnum.subbrand);
    await brandsModel.hasNodeTableValues(3);

    await brandsModel.expandNodeInTable(brandsData.storeBrandName, brandsData.brandNodeName);
    await brandsModel.expandNodeInTable(brandsData.storeSubBrandName, brandsData.subBrandName);

    await brandsModel.checkNodeWithTypeInTable(brandsData.brandNodeName, brandsData.brand);
    await brandsModel.checkNodeWithTypeInTable(brandsData.storeBrandName, brandsData.store);
    await brandsModel.checkNodeWithTypeInTable(brandsData.subBrandName, brandsData.subBrand);
    await brandsModel.checkNodeWithTypeInTable(brandsData.storeSubBrandName, brandsData.store);

    const rowCount = await brandsModel.nodesTable.locator('tr').count();
    expect(rowCount).toBeGreaterThanOrEqual(1);
  });


  test(`Verify that a brand with dual language can be created and that when English is selected as the default language the Default tag appears in the fields to write strings in English`, async ({ page }) => {
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);
    const brandsModel = new BrandsModel(page);
    const topMenu = new TopBarModel(page);

    await page.goto(url);
    await loginModel.login(user.username, user.password);
    await sideBarModel.onClickBrandOptionMenu();

    let brandName =  brandsData.brandDefaultName.concat(uuidv4()).slice(0, 28);
    await brandsModel.createBrand(brandName, { dual: true, defaultLanguage: brandsData.englishLanguage });
    await commonModel.waitUntilSpinnerDisappears();
    await commonModel.setSearchValue(brandName);
    await brandsModel.hasBrandTableValues();
    await brandsModel.goToManageNodes(brandName);
    await brandsModel.hasNodeTableValues(1);
    await brandsModel.openEditNodePopUp(brandName);
    await commonModel.checkContentPopupVisible();
    
    await brandsModel.verifyThatNodeSiteTitleIsVisible();
    expect(await brandsModel.nodeSiteTitleInput.first().isVisible()).toBe(true);
    expect(await brandsModel.nodeSiteDescriptionInput.first().isVisible()).toBe(true);


    const siteTitleEnglishLabel = page.locator('app-edit-brand-form div:nth-child(1) app-translation-field:nth-child(4) div[formarrayname="translations"]:nth-child(1) span:nth-child(1)');
    const siteTitleDefaultLabel = page.locator('app-edit-brand-form div:nth-child(1) app-translation-field:nth-child(4) div[formarrayname="translations"]:nth-child(1) span:nth-child(3)');
    const siteTitleSpanishLabel = page.locator('app-edit-brand-form div:nth-child(1) app-translation-field:nth-child(4) div[formarrayname="translations"]:nth-child(2) span:nth-child(1)');

    // Site Title
    expect(await brandsModel.nodeSiteTitleInput.count()).toEqual(2);
    expect(await siteTitleEnglishLabel.innerText()).toEqual(brandsData.englishLanguage);
    expect(await siteTitleDefaultLabel.innerText()).toEqual(brandsData.default);
    expect(await siteTitleSpanishLabel.innerText()).toEqual(brandsData.spanishLanguage);


    const nodeSiteDescriptionInputEnglishLabel = page.locator('app-edit-brand-form div:nth-child(1) app-translation-field:nth-child(5) div[formarrayname="translations"]:nth-child(1) span:nth-child(1)');
    const nodeSiteDescriptionInputDefatultLabel = page.locator('app-edit-brand-form div:nth-child(1) app-translation-field:nth-child(5) div[formarrayname="translations"]:nth-child(1) span:nth-child(3)');
    const nodeSiteDescriptionInputSpanishLabel = page.locator('app-edit-brand-form div:nth-child(1) app-translation-field:nth-child(5) div[formarrayname="translations"]:nth-child(2) span:nth-child(1)');

    // Site Description
    expect(await brandsModel.nodeSiteDescriptionInput.count()).toEqual(2);
    expect(await nodeSiteDescriptionInputEnglishLabel.innerText()).toEqual(brandsData.englishLanguage);
    expect(await nodeSiteDescriptionInputDefatultLabel.innerText()).toEqual(brandsData.default);
    expect(await nodeSiteDescriptionInputSpanishLabel.innerText()).toEqual(brandsData.spanishLanguage);


    const storeDisplayTextInputEnglishLabel = page.locator('app-edit-brand-form > div:nth-child(2) > app-translation-field:nth-child(11) div[formarrayname="translations"]:nth-child(1) span:nth-child(1)');
    const storeDisplayTextInputDefaultLabel = page.locator('app-edit-brand-form > div:nth-child(2) > app-translation-field:nth-child(11) div[formarrayname="translations"]:nth-child(1) span:nth-child(3)');
    const storeDisplayTextInputSpanishLabel = page.locator('app-edit-brand-form > div:nth-child(2) > app-translation-field:nth-child(11) div[formarrayname="translations"]:nth-child(2) span:nth-child(1)');

    // Store Display Text
    expect(await brandsModel.storeDisplayTextInput.count()).toEqual(2);
    let storeField = page.locator('app-translation-field[formcontrolname="chooseStoreDisplayText"] > div > div:nth-child(2)');
    expect(await storeField.innerText()).toContain(brandsData.englishLanguage);
    expect(await storeField.innerText()).toContain(brandsData.default);
    expect(await storeField.innerText()).toContain(brandsData.spanishLanguage);


    const nodeDefaultPageNameInputEnglishLabel = page.locator('app-edit-brand-form > div:nth-child(2) > app-translation-field:nth-child(13) div[formarrayname="translations"]:nth-child(1) span:nth-child(1)');
    const nodeDefaultPageNameInputDefaultLabel = page.locator('app-edit-brand-form > div:nth-child(2) > app-translation-field:nth-child(13) div[formarrayname="translations"]:nth-child(1) span:nth-child(3)');
    const nodeDefaultPageNameInputSpanishLabel = page.locator('app-edit-brand-form > div:nth-child(2) > app-translation-field:nth-child(13) div[formarrayname="translations"]:nth-child(2) span:nth-child(1)');
    
    // Default Page Name
    expect(await brandsModel.nodeDefaultPageNameInput.count()).toEqual(2);
    let defaultPageName = page.locator('app-translation-field[formcontrolname="defaultPageName"] > div > div:nth-child(2)');
    expect(await defaultPageName.innerText()).toContain(brandsData.englishLanguage);
    expect(await defaultPageName.innerText()).toContain(brandsData.default);
    expect(await defaultPageName.innerText()).toContain(brandsData.spanishLanguage);


    const nodeCategoryPageNameInputEnglishLabel = page.locator('app-edit-brand-form > div:nth-child(2) > app-translation-field:nth-child(14) div[formarrayname="translations"]:nth-child(1) span:nth-child(1)');
    const nodeCategoryPageNameInputDefaultLabel = page.locator('app-edit-brand-form > div:nth-child(2) > app-translation-field:nth-child(14) div[formarrayname="translations"]:nth-child(1) span:nth-child(3)');
    const nodeCategoryPageNameInputSpanishLabel = page.locator('app-edit-brand-form > div:nth-child(2) > app-translation-field:nth-child(14) div[formarrayname="translations"]:nth-child(2) span:nth-child(1)');

    // Category Page Name
    expect(await brandsModel.nodeCategoryPageNameInput.count()).toEqual(2);
    let categoryPageNameFields = page.locator('app-translation-field[formcontrolname="categoryPageName"] > div > div:nth-child(2)');
    expect(await categoryPageNameFields.innerText()).toContain(brandsData.englishLanguage);
    expect(await categoryPageNameFields.innerText()).toContain(brandsData.default);
    expect(await categoryPageNameFields.innerText()).toContain(brandsData.spanishLanguage);
    await page.waitForTimeout(5000);
  });


  test(`Verify that the required field validations exist for the fields that receive the string for the default language English`, async ({ page }) => {
    page.setViewportSize({ width: 1000, height: 1000 });

    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);
    const brandsModel = new BrandsModel(page);
    const topMenu = new TopBarModel(page);

    await page.goto(url);
    await loginModel.login(user.username, user.password);
    await sideBarModel.onClickBrandOptionMenu();

    let brandName =  brandsData.brandDefaultName.concat(uuidv4()).slice(0, 28);
    await brandsModel.createBrand(brandName, { dual: true, defaultLanguage: brandsData.englishLanguage });
    await commonModel.waitUntilSpinnerDisappears();
    await commonModel.setSearchValue(brandName);
    await brandsModel.hasBrandTableValues();
    await brandsModel.goToManageNodes(brandName);
    await brandsModel.hasNodeTableValues(1);
    await brandsModel.openEditNodePopUp(brandName);
    await commonModel.checkContentPopupVisible();
    
    await brandsModel.verifyThatNodeSiteTitleIsVisible();
    expect(await brandsModel.nodeSiteTitleInput.first().isVisible()).toBe(true);
    expect(await brandsModel.nodeSiteDescriptionInput.first().isVisible()).toBe(true);

    await brandsModel.nodeSiteTitleInput.first().click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');

    await brandsModel.nodeSiteDescriptionInput.first().click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');

    await brandsModel.storeDisplayTextInput.first().click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');

    await brandsModel.onClickNodeSaveButton();

    expect(await commonModel.existAlert.nth(0).innerText()).toContain(brandsData.siteDescriptionRequired);
    expect(await commonModel.existAlert.nth(1).innerText()).toContain(brandsData.siteTitleRequired);
    expect(await commonModel.existAlert.nth(2).innerText()).toContain(brandsData.storeDisplayTextRequired);

    expect((await brandsModel.nodeSiteTitleInput.nth(0).getAttribute('class'))?.includes('wrong')).toBe(true);
    expect((await brandsModel.nodeSiteDescriptionInput.nth(0).getAttribute('class'))?.includes('wrong')).toBe(true);
    expect((await brandsModel.storeDisplayTextInput.nth(0).getAttribute('class'))?.includes('wrong')).toBe(true);

    expect(await commonModel.fieldRequired.nth(0).innerText()).toContain(brandsData.defaultTranslationRequired);
    expect(await commonModel.fieldRequired.nth(1).innerText()).toContain(brandsData.defaultTranslationRequired);
    expect(await commonModel.fieldRequired.nth(2).innerText()).toContain(brandsData.defaultTranslationRequired);
  });


  test(`Verify that it is possible to create a brand with dual language with the default language in English required fields`, async ({ page }) => {
    page.setViewportSize({ width: 1000, height: 1800 });

    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);
    const brandsModel = new BrandsModel(page);

    await page.goto(url);
    await loginModel.login(user.username, user.password);
    await sideBarModel.onClickBrandOptionMenu();

    let brandName =  brandsData.brandDefaultName.concat(uuidv4()).slice(0, 28);
    await brandsModel.createBrand(brandName, { dual: true, defaultLanguage: brandsData.englishLanguage });
    await commonModel.waitUntilSpinnerDisappears();
    await commonModel.setSearchValue(brandName);
    await brandsModel.hasBrandTableValues();
    await brandsModel.goToManageNodes(brandName);
    await brandsModel.hasNodeTableValues(1);
    await brandsModel.openEditNodePopUp(brandName);
    await brandsModel.hasLoadInputsManageNode();
    await commonModel.checkContentPopupVisible();
    
    
    expect(await brandsModel.nodeSiteTitleInput.first().isVisible()).toBe(true);
    expect(await brandsModel.nodeSiteDescriptionInput.first().isVisible()).toBe(true);

    const siteTitle = subBrandData.siteTitle + uuidv4();
    const siteDesc = subBrandData.siteDesc + uuidv4();
    const storeDisplay = subBrandData.storeDisplayText + uuidv4();
    await brandsModel.setNodeSiteTitle(siteTitle);
    await brandsModel.setNodeSiteDescription(siteDesc);
    await brandsModel.setStoreDisplayText(storeDisplay);
    await brandsModel.onClickNodeSaveButton();
    await commonModel.waitUntilSpinnerDisappears();

    await brandsModel.openEditNodePopUp(brandName);
    await commonModel.waitUntilSpinnerDisappears();
    await brandsModel.verifyThatTheTitleIsProperlyDisplayed(siteTitle);
    await page.waitForTimeout(1000);
    expect(await brandsModel.nodeSiteTitleInput.nth(0).inputValue()).toEqual(siteTitle);
    expect(await brandsModel.nodeSiteDescriptionInput.nth(0).inputValue()).toEqual(siteDesc);
    expect(await brandsModel.storeDisplayTextInput.nth(0).inputValue()).toEqual(storeDisplay);
  });


  test(`Verify that a brand with dual language can be created and that when Spanish is selected as the default language, the Default tag appears in the fields to write strings in Spanish`, async ({ page }) => {
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);
    const brandsModel = new BrandsModel(page);
    const topMenu = new TopBarModel(page);

    await page.goto(url);
    await loginModel.login(user.username, user.password);
    await sideBarModel.onClickBrandOptionMenu();

    let brandName =  brandsData.brandDefaultName.concat(uuidv4()).slice(0, 28);
    await brandsModel.createBrand(brandName, { dual: true, defaultLanguage: brandsData.spanishLanguage });
    await commonModel.waitUntilSpinnerDisappears();
    await commonModel.setSearchValue(brandName);
    await brandsModel.hasBrandTableValues();
    await brandsModel.goToManageNodes(brandName);
    await brandsModel.hasNodeTableValues(1);
    await brandsModel.openEditNodePopUp(brandName);
    await commonModel.checkContentPopupVisible();
    
    await brandsModel.verifyThatNodeSiteTitleIsVisible();
    expect(await brandsModel.nodeSiteTitleInput.first().isVisible()).toBe(true);
    expect(await brandsModel.nodeSiteDescriptionInput.first().isVisible()).toBe(true);


    const siteTitleEnglishLabel = page.locator('app-edit-brand-form div:nth-child(1) app-translation-field:nth-child(4) div[formarrayname="translations"]:nth-child(1) span:nth-child(1)');
    const siteTitleDefaultLabel = page.locator('app-edit-brand-form div:nth-child(1) app-translation-field:nth-child(4) div[formarrayname="translations"]:nth-child(2) span:nth-child(3)');
    const siteTitleSpanishLabel = page.locator('app-edit-brand-form div:nth-child(1) app-translation-field:nth-child(4) div[formarrayname="translations"]:nth-child(2) span:nth-child(1)');

    // Site Title
    expect(await brandsModel.nodeSiteTitleInput.count()).toEqual(2);
    expect(await siteTitleEnglishLabel.innerText()).toEqual(brandsData.englishLanguage);
    expect(await siteTitleDefaultLabel.innerText()).toEqual(brandsData.default);
    expect(await siteTitleSpanishLabel.innerText()).toEqual(brandsData.spanishLanguage);


    const nodeSiteDescriptionInputEnglishLabel = page.locator('app-edit-brand-form div:nth-child(1) app-translation-field:nth-child(5) div[formarrayname="translations"]:nth-child(1) span:nth-child(1)');
    const nodeSiteDescriptionInputDefatultLabel = page.locator('app-edit-brand-form div:nth-child(1) app-translation-field:nth-child(5) div[formarrayname="translations"]:nth-child(2) span:nth-child(3)');
    const nodeSiteDescriptionInputSpanishLabel = page.locator('app-edit-brand-form div:nth-child(1) app-translation-field:nth-child(5) div[formarrayname="translations"]:nth-child(2) span:nth-child(1)');

    // Site Description
    expect(await brandsModel.nodeSiteDescriptionInput.count()).toEqual(2);
    expect(await nodeSiteDescriptionInputEnglishLabel.innerText()).toEqual(brandsData.englishLanguage);
    expect(await nodeSiteDescriptionInputDefatultLabel.innerText()).toEqual(brandsData.default);
    expect(await nodeSiteDescriptionInputSpanishLabel.innerText()).toEqual(brandsData.spanishLanguage);


    const storeDisplayTextInputEnglishLabel = page.locator('app-edit-brand-form > div:nth-child(2) > app-translation-field:nth-child(11) div[formarrayname="translations"]:nth-child(1) span:nth-child(1)');
    const storeDisplayTextInputDefaultLabel = page.locator('app-edit-brand-form > div:nth-child(2) > app-translation-field:nth-child(11) div[formarrayname="translations"]:nth-child(2) span:nth-child(3)');
    const storeDisplayTextInputSpanishLabel = page.locator('app-edit-brand-form > div:nth-child(2) > app-translation-field:nth-child(11) div[formarrayname="translations"]:nth-child(2) span:nth-child(1)');

    // Store Display Text
    expect(await brandsModel.storeDisplayTextInput.count()).toEqual(2);
    let storeField = page.locator('app-translation-field[formcontrolname="chooseStoreDisplayText"] > div > div:nth-child(2)');
    expect(await storeField.innerText()).toContain(brandsData.englishLanguage);
    expect(await storeField.innerText()).toContain(brandsData.default);
    expect(await storeField.innerText()).toContain(brandsData.spanishLanguage);


    const nodeDefaultPageNameInputEnglishLabel = page.locator('app-edit-brand-form > div:nth-child(2) > app-translation-field:nth-child(13) div[formarrayname="translations"]:nth-child(1) span:nth-child(1)');
    const nodeDefaultPageNameInputDefaultLabel = page.locator('app-edit-brand-form > div:nth-child(2) > app-translation-field:nth-child(13) div[formarrayname="translations"]:nth-child(2) span:nth-child(3)');
    const nodeDefaultPageNameInputSpanishLabel = page.locator('app-edit-brand-form > div:nth-child(2) > app-translation-field:nth-child(13) div[formarrayname="translations"]:nth-child(2) span:nth-child(1)');
    
    // Default Page Name
    expect(await brandsModel.nodeDefaultPageNameInput.count()).toEqual(2);
    let defaultPageName = page.locator('app-translation-field[formcontrolname="defaultPageName"] > div > div:nth-child(2)');
    expect(await defaultPageName.innerText()).toContain(brandsData.englishLanguage);
    expect(await defaultPageName.innerText()).toContain(brandsData.default);
    expect(await defaultPageName.innerText()).toContain(brandsData.spanishLanguage);


    const nodeCategoryPageNameInputEnglishLabel = page.locator('app-edit-brand-form > div:nth-child(2) > app-translation-field:nth-child(14) div[formarrayname="translations"]:nth-child(1) span:nth-child(1)');
    const nodeCategoryPageNameInputDefaultLabel = page.locator('app-edit-brand-form > div:nth-child(2) > app-translation-field:nth-child(14) div[formarrayname="translations"]:nth-child(2) span:nth-child(3)');
    const nodeCategoryPageNameInputSpanishLabel = page.locator('app-edit-brand-form > div:nth-child(2) > app-translation-field:nth-child(14) div[formarrayname="translations"]:nth-child(2) span:nth-child(1)');

    // Category Page Name
    expect(await brandsModel.nodeCategoryPageNameInput.count()).toEqual(2);
    expect(await nodeCategoryPageNameInputEnglishLabel.innerText()).toEqual(brandsData.englishLanguage);
    expect(await nodeCategoryPageNameInputDefaultLabel.innerText()).toEqual(brandsData.default);
    expect(await nodeCategoryPageNameInputSpanishLabel.innerText()).toEqual(brandsData.spanishLanguage);
  });

  test(`Verify that the required field validations exist for the fields that receive the string for the default language Spanish`, async ({ page }) => {
    page.setViewportSize({ width: 1000, height: 1000 });

    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);
    const brandsModel = new BrandsModel(page);
    const topMenu = new TopBarModel(page);

    await page.goto(url);
    await loginModel.login(user.username, user.password);
    await sideBarModel.onClickBrandOptionMenu();

    let brandName =  brandsData.brandDefaultName.concat(uuidv4()).slice(0, 28);
    await brandsModel.createBrand(brandName, { dual: true, defaultLanguage: brandsData.spanishLanguage });
    await commonModel.waitUntilSpinnerDisappears();
    await commonModel.setSearchValue(brandName);
    await brandsModel.hasBrandTableValues();
    await brandsModel.goToManageNodes(brandName);
    await brandsModel.hasNodeTableValues(1);
    await brandsModel.openEditNodePopUp(brandName);
    await commonModel.checkContentPopupVisible();
    
    await brandsModel.verifyThatNodeSiteTitleIsVisible();
    expect(await brandsModel.nodeSiteTitleInput.first().isVisible()).toBe(true);
    expect(await brandsModel.nodeSiteDescriptionInput.first().isVisible()).toBe(true);

    await brandsModel.nodeSiteTitleInput.first().click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');

    await brandsModel.nodeSiteDescriptionInput.first().click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');

    await brandsModel.storeDisplayTextInput.first().click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');

    await brandsModel.onClickNodeSaveButton();

    expect(await commonModel.existAlert.nth(0).innerText()).toContain(brandsData.siteDescriptionRequired);
    expect(await commonModel.existAlert.nth(1).innerText()).toContain(brandsData.siteTitleRequired);
    expect(await commonModel.existAlert.nth(2).innerText()).toContain(brandsData.storeDisplayTextRequired);

    expect((await brandsModel.nodeSiteTitleInput.nth(1).getAttribute('class'))?.includes('wrong')).toBe(true);
    expect((await brandsModel.nodeSiteDescriptionInput.nth(1).getAttribute('class'))?.includes('wrong')).toBe(true);
    expect((await brandsModel.storeDisplayTextInput.nth(1).getAttribute('class'))?.includes('wrong')).toBe(true);

    expect(await commonModel.fieldRequired.nth(0).innerText()).toContain(brandsData.defaultTranslationRequired);
    expect(await commonModel.fieldRequired.nth(1).innerText()).toContain(brandsData.defaultTranslationRequired);
    expect(await commonModel.fieldRequired.nth(2).innerText()).toContain(brandsData.defaultTranslationRequired);
  });


  test(`Verify that it is possible to create a brand with dual language with the default language in Spanish required fields`, async ({ page }) => {
    page.setViewportSize({ width: 1000, height: 1800 });

    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);
    const brandsModel = new BrandsModel(page);
    const topMenu = new TopBarModel(page);

    await page.goto(url);
    await loginModel.login(user.username, user.password);
    await sideBarModel.onClickBrandOptionMenu();

    let brandName =  brandsData.brandDefaultName.concat(uuidv4()).slice(0, 28);
    await brandsModel.createBrand(brandName, { dual: true, defaultLanguage: brandsData.spanishLanguage });
    await commonModel.waitUntilSpinnerDisappears();
    await commonModel.setSearchValue(brandName);
    await brandsModel.hasBrandTableValues();
    await brandsModel.goToManageNodes(brandName);
    await brandsModel.hasNodeTableValues(1);
    await brandsModel.openEditNodePopUp(brandName);
    await brandsModel.hasLoadInputsManageNode();
    await commonModel.checkContentPopupVisible();
    
    
    expect(await brandsModel.nodeSiteTitleInput.first().isVisible()).toBe(true);
    expect(await brandsModel.nodeSiteDescriptionInput.first().isVisible()).toBe(true);

    const siteTitle = subBrandData.siteTitle + uuidv4();
    const siteDesc = subBrandData.siteDesc + uuidv4();
    const storeDisplay = subBrandData.storeDisplayText + uuidv4();
    await brandsModel.setNodeSiteTitle(siteTitle, 1);
    await brandsModel.setNodeSiteDescription(siteDesc, 1);
    await brandsModel.setStoreDisplayText(storeDisplay, 1);
    await brandsModel.onClickNodeSaveButton();
    await commonModel.waitUntilSpinnerDisappears();

    await brandsModel.openEditNodePopUp(brandName);
    await commonModel.waitUntilSpinnerDisappears();
    await brandsModel.verifyThatTheTitleIsProperlyDisplayed(siteTitle);
    expect(await brandsModel.nodeSiteTitleInput.nth(1).inputValue()).toEqual(siteTitle);
    expect(await brandsModel.nodeSiteDescriptionInput.nth(1).inputValue()).toEqual(siteDesc);
    expect(await brandsModel.storeDisplayTextInput.nth(1).inputValue()).toEqual(storeDisplay);
  });
  
});