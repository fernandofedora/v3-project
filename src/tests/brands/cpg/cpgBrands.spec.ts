import { test, expect } from '@playwright/test';
import { LoginModel } from '../../../pom/loginModel';
import {SidebarModel} from '../../../pom/sidebarModel';
import {validateEnvironment} from '../../../utils/urlHandler';
import {validateUsers} from '../../../utils/userHandler';
import { CPGBrandsModel } from '../../../pom/cpgBrandsModel';
import { storeOwnerRoleValidation } from '../../../utils/rolesHandler';
import { brandsData } from '../../../data/brandsData';
import {TopBarModel} from '../../../pom/topBarModel';
import {v4 as uuidv4} from 'uuid';
import path from 'path';
import { CommonModel } from '../../../pom/commonModel';

const users = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.brandNodeContentName));
const user = users[0];
const url: string = validateEnvironment();

test.describe('Manage Brands - add node', () => {

  test(`Verify that the super admin user can crate a new CPG brand with only the required fields populated`, async ({ page }) => {
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const cpgBrandsModel = new CPGBrandsModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(url);
    await page.setViewportSize({ width: 1600, height: 2000 });
    await loginModel.login(user.username, user.password);
    await topBarModel.selectBrand(brandsData.brandNodeName);
    await sideBarModel.onClickCPGBrandsOptionMenu();

    await cpgBrandsModel.verifyThatTheCPGBrandButtonIsVisible();
    await cpgBrandsModel.verifyThatBrandTableIsVisible();

    await cpgBrandsModel.createNewCPGBrandButton.click();
    await cpgBrandsModel.clickNodeNameInput();

    const uniqueId = uuidv4();
    const brandName = ("CPGBrands" + uniqueId).slice(0, 30);

    await cpgBrandsModel.populateNodeNameInputField(brandName);

    await cpgBrandsModel.downSaveButton.click({delay:300});
    await commonModel.waitUntilSpinnerDisappears();
    await cpgBrandsModel.typeTextOnSearchBar(brandName);
    await cpgBrandsModel.countRowsTable(1);
    await cpgBrandsModel.verifyThatTheCPGBrandIsCreated(brandName);
  });

  test(`Verify that the super admin user can not create a new CPG brand when the required field are empty`, async ({ page }) => {
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const cpgBrandsModel = new CPGBrandsModel(page);

    await page.goto(url);
    await page.setViewportSize({ width: 1600, height: 2000 });
    await loginModel.login(user.username, user.password);
    await topBarModel.selectBrand(brandsData.brandNodeName);
    await sideBarModel.onClickCPGBrandsOptionMenu();

    await cpgBrandsModel.verifyThatTheCPGBrandButtonIsVisible();
    await cpgBrandsModel.verifyThatBrandTableIsVisible();

    await cpgBrandsModel.createNewCPGBrandButton.click();
    await cpgBrandsModel.clickNodeNameInput();

    await cpgBrandsModel.downSaveButton.click({delay:300});

    await cpgBrandsModel.verifyErrorNameMessageIsDisplayed();
  });

  test(`Verify that the super admin user can create a new CPG brand when all fields are populated`, async ({ page }) => {
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const cpgBrandsModel = new CPGBrandsModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(url);
    await page.setViewportSize({ width: 1600, height: 1500 });
    await loginModel.login(user.username, user.password);
    await topBarModel.selectBrand(brandsData.brandNodeName);
    await sideBarModel.onClickCPGBrandsOptionMenu();

    await cpgBrandsModel.verifyThatTheCPGBrandButtonIsVisible();
    await cpgBrandsModel.verifyThatBrandTableIsVisible();

    await cpgBrandsModel.createNewCPGBrandButton.click();
    await cpgBrandsModel.clickNodeNameInput();

    const uniqueId = uuidv4();
    const brandName = ("CPGBrands" + uniqueId).slice(0, 30);

    await cpgBrandsModel.populateNodeNameInputField(brandName);

    await cpgBrandsModel.clickTypeDropdownMenu();
    await cpgBrandsModel.selectDropdownTypeOption("Brands");
    await cpgBrandsModel.fillNoteArea("This is a note");
    await cpgBrandsModel.fillAddressInput("address");
    await cpgBrandsModel.fillCityField("City");
    await cpgBrandsModel.fillStateField("State");
    await cpgBrandsModel.fillZipField("83000");
    await cpgBrandsModel.configurationHeader.click({delay:300});
    await cpgBrandsModel.clickLanguageDropdownMenu();
    //await cpgBrandsModel.selectDropdownLanguageOption("Spanish");
    await cpgBrandsModel.createCPGBrandModal.click();
    await cpgBrandsModel.clickDefaultLanguageDropdownMenu();
    await cpgBrandsModel.logosHeadersHeader.click();
    await cpgBrandsModel.uploadRecipeImage(["src/images/A47.jpg"]);
    await cpgBrandsModel.clickDefaultThemeDropdownMenu();
    await cpgBrandsModel.clickOptionDefaultThemeMenu('aci-albertsons');
    await cpgBrandsModel.clickStylesCardsDropdownMenu();
    await cpgBrandsModel.downSaveButton.click({delay:300});

    await commonModel.waitUntilSpinnerDisappears();
    await cpgBrandsModel.typeTextOnSearchBar(brandName);
    await cpgBrandsModel.countRowsTable(1);
    await cpgBrandsModel.verifyThatTheCPGBrandIsCreated(brandName);
  });

  test(`Verify that the super admin user can not create a new CPG brand when the cancel button is clicked`, async ({ page }) => {
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const cpgBrandsModel = new CPGBrandsModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(url);
    await page.setViewportSize({ width: 1600, height: 1500 });
    await loginModel.login(user.username, user.password);
    await topBarModel.selectBrand(brandsData.brandNodeName);
    await sideBarModel.onClickCPGBrandsOptionMenu();

    await cpgBrandsModel.verifyThatTheCPGBrandButtonIsVisible();
    await cpgBrandsModel.verifyThatBrandTableIsVisible();

    await cpgBrandsModel.createNewCPGBrandButton.click();
    await cpgBrandsModel.clickNodeNameInput();

    const uniqueId = uuidv4();
    const brandName = ("CPGBrands" + uniqueId).slice(0, 30);

    await cpgBrandsModel.populateNodeNameInputField(brandName);

    await cpgBrandsModel.downCancelButton.click();
    await commonModel.waitUntilSpinnerDisappears();
    await cpgBrandsModel.verifyThatTheCreateBrandModalIsNotDisplayed();
    await cpgBrandsModel.typeTextOnSearchBar(brandName);
    await cpgBrandsModel.countRowsTable(0);
    await cpgBrandsModel.verifyThatTheCPGBrandIsNotCreated(brandName);
    
  });

  test(`Verify that the super admin user can change the status to inactive of a created CPG brand`, async ({ page }) => {
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const cpgBrandsModel = new CPGBrandsModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(url);
    await page.setViewportSize({ width: 1600, height: 1500 });
    await loginModel.login(user.username, user.password);
    await topBarModel.selectBrand(brandsData.brandNodeName);
    await sideBarModel.onClickCPGBrandsOptionMenu();

    await cpgBrandsModel.verifyThatTheCPGBrandButtonIsVisible();
    await cpgBrandsModel.verifyThatBrandTableIsVisible();

    await cpgBrandsModel.createNewCPGBrandButton.click();
    await cpgBrandsModel.clickNodeNameInput();

    const uniqueId = uuidv4();
    const brandName = ("CPGBrands" + uniqueId).slice(0, 30);

    await cpgBrandsModel.populateNodeNameInputField(brandName);

    await cpgBrandsModel.downSaveButton.click({delay: 300});
    await commonModel.waitUntilSpinnerDisappears();
    await cpgBrandsModel.typeTextOnSearchBar(brandName);
    await cpgBrandsModel.countRowsTable(1);
    await cpgBrandsModel.verifyThatTheCPGBrandIsCreated(brandName);
    await cpgBrandsModel.clickEditButtonFromABrand(brandName);
    await cpgBrandsModel.verifyThatTheCreateBrandModalIsDisplayed();
    await cpgBrandsModel.activeStatusSwitch.click({delay:300});
    await cpgBrandsModel.downSaveButton.click({delay: 300});
    await commonModel.waitUntilSpinnerDisappears();
    await cpgBrandsModel.typeTextOnSearchBar(brandName);
    await cpgBrandsModel.countRowsTable(1);
    await cpgBrandsModel.verifyThatTheCPGBrandIsCreated(brandName);
    await cpgBrandsModel.verifyBrandHasInactiveStatus("INACTIVE", brandName);
    
  });

  test(`Verify that the super admin user can change the status to active from a created CPG brand with inactive status`, async ({ page }) => {
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const cpgBrandsModel = new CPGBrandsModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(url);
    await page.setViewportSize({ width: 1600, height: 1500 });
    await loginModel.login(user.username, user.password);
    await topBarModel.selectBrand(brandsData.brandNodeName);
    await sideBarModel.onClickCPGBrandsOptionMenu();

    await cpgBrandsModel.verifyThatTheCPGBrandButtonIsVisible();
    await cpgBrandsModel.verifyThatBrandTableIsVisible();

    await cpgBrandsModel.createNewCPGBrandButton.click();
    await cpgBrandsModel.clickNodeNameInput();

    const uniqueId = uuidv4();
    const brandName = ("CPGBrands" + uniqueId).slice(0, 30);

    await cpgBrandsModel.populateNodeNameInputField(brandName);

    await cpgBrandsModel.downSaveButton.click({delay: 300});
    await commonModel.waitUntilSpinnerDisappears();
    await cpgBrandsModel.typeTextOnSearchBar(brandName);
    await cpgBrandsModel.countRowsTable(1);
    await cpgBrandsModel.verifyThatTheCPGBrandIsCreated(brandName);

    await cpgBrandsModel.clickEditButtonFromABrand(brandName);
    await cpgBrandsModel.verifyThatTheCreateBrandModalIsDisplayed();
    await cpgBrandsModel.activeStatusSwitch.click({delay:300});
    await cpgBrandsModel.downSaveButton.click({delay: 300});
    await cpgBrandsModel.verifyBrandHasInactiveStatus("INACTIVE", brandName);
    await page.reload();

    await cpgBrandsModel.typeTextOnSearchBar(brandName);
    await cpgBrandsModel.countRowsTable(1);
    await cpgBrandsModel.verifyThatTheCPGBrandIsCreated(brandName);
    await cpgBrandsModel.clickEditButtonFromABrand(brandName);
    await cpgBrandsModel.verifyThatTheCreateBrandModalIsDisplayed();
    await cpgBrandsModel.activeStatusSwitch.click({delay:300});
    await cpgBrandsModel.downSaveButton.click({delay: 300});
    await cpgBrandsModel.typeTextOnSearchBar(brandName);
    await cpgBrandsModel.countRowsTable(1);
    await cpgBrandsModel.verifyThatTheCPGBrandIsCreated(brandName);
    await cpgBrandsModel.verifyBrandHasInactiveStatus("ACTIVE", brandName);
  });

  test(`Verify that the search bar is filtering the results when is populated with a valid name`, async ({ page }) => {
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const cpgBrandsModel = new CPGBrandsModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(url);
    await page.setViewportSize({ width: 1600, height: 1500 });
    await loginModel.login(user.username, user.password);
    await topBarModel.selectBrand(brandsData.brandNodeName);
    await sideBarModel.onClickCPGBrandsOptionMenu();

    await cpgBrandsModel.verifyThatTheCPGBrandButtonIsVisible();
    await cpgBrandsModel.verifyThatBrandTableIsVisible();

    await cpgBrandsModel.createNewCPGBrandButton.click();
    await cpgBrandsModel.clickNodeNameInput();

    const uniqueId = uuidv4();
    const brandName = ("CPGBrands" + uniqueId).slice(0, 30);

    await cpgBrandsModel.populateNodeNameInputField(brandName);

    await cpgBrandsModel.downSaveButton.click({delay: 300});
    await commonModel.waitUntilSpinnerDisappears();
    await cpgBrandsModel.typeTextOnSearchBar(brandName);
    await cpgBrandsModel.countRowsTable(1);
    await cpgBrandsModel.verifyThatTheCPGBrandIsCreated(brandName);

    await cpgBrandsModel.verifyOnlyMatchingResultIsDisplayed();
  });

  test(`Verify that the search bar is filtering the results when is populated with an invalid name`, async ({ page }) => {
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const cpgBrandsModel = new CPGBrandsModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(url);
    await page.setViewportSize({ width: 1600, height: 1500 });
    await loginModel.login(user.username, user.password);
    await topBarModel.selectBrand(brandsData.brandNodeName);
    await sideBarModel.onClickCPGBrandsOptionMenu();

    await cpgBrandsModel.verifyThatTheCPGBrandButtonIsVisible();
    await cpgBrandsModel.verifyThatBrandTableIsVisible();

    await cpgBrandsModel.createNewCPGBrandButton.click();
    await cpgBrandsModel.clickNodeNameInput();

    const uniqueId = uuidv4();
    const brandName = ("CPGBrands" + uniqueId).slice(0, 30);

    await cpgBrandsModel.populateNodeNameInputField(brandName);

    await cpgBrandsModel.downSaveButton.click({delay: 300});
    await commonModel.waitUntilSpinnerDisappears();
    await cpgBrandsModel.typeTextOnSearchBar(brandName);
    await cpgBrandsModel.countRowsTable(1);
    await cpgBrandsModel.verifyThatTheCPGBrandIsCreated(brandName);

    await cpgBrandsModel.typeTextOnSearchBar("aaaaaaaaaaaaaaaaaaaaaaaaa");

    await cpgBrandsModel.verifyThatNoResultsAreDisplayed();
  });

  test(`Verify that the super admin user should be able to cancel the edit action in a CPGBrand`, async ({ page }) => {
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const cpgBrandsModel = new CPGBrandsModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(url);
    await page.setViewportSize({ width: 1600, height: 1500 });
    await loginModel.login(user.username, user.password);
    await topBarModel.selectBrand(brandsData.brandNodeName);
    await sideBarModel.onClickCPGBrandsOptionMenu();

    await cpgBrandsModel.verifyThatTheCPGBrandButtonIsVisible();
    await cpgBrandsModel.verifyThatBrandTableIsVisible();

    await cpgBrandsModel.createNewCPGBrandButton.click();
    await cpgBrandsModel.clickNodeNameInput();

    const uniqueId = uuidv4();
    const brandName = ("CPGBrands" + uniqueId).slice(0, 30);

    await cpgBrandsModel.populateNodeNameInputField(brandName);

    await cpgBrandsModel.downSaveButton.click({delay: 300});
    await commonModel.waitUntilSpinnerDisappears();
    await cpgBrandsModel.typeTextOnSearchBar(brandName);
    await cpgBrandsModel.countRowsTable(1);
    await cpgBrandsModel.verifyThatTheCPGBrandIsCreated(brandName);

    await cpgBrandsModel.clickEditButtonFromABrand(brandName);

    await cpgBrandsModel.downCancelButton.click();
    await cpgBrandsModel.verifyThatTheCreateBrandModalIsNotDisplayed();
  });

  test(`Verify that the super admin user can edit the required fields from a created CPG Brand`, async ({ page }) => {
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const cpgBrandsModel = new CPGBrandsModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(url);
    await page.setViewportSize({ width: 1600, height: 1500 });
    await loginModel.login(user.username, user.password);
    await topBarModel.selectBrand(brandsData.brandNodeName);
    await sideBarModel.onClickCPGBrandsOptionMenu();

    await cpgBrandsModel.verifyThatTheCPGBrandButtonIsVisible();
    await cpgBrandsModel.verifyThatBrandTableIsVisible();

    await cpgBrandsModel.createNewCPGBrandButton.click();
    await cpgBrandsModel.clickNodeNameInput();

    const uniqueId = uuidv4();
    const brandName = ("CPGBrands" + uniqueId).slice(0, 30);

    await cpgBrandsModel.populateNodeNameInputField(brandName);

    await cpgBrandsModel.downSaveButton.click({delay: 300});
    await commonModel.waitUntilSpinnerDisappears();
    await cpgBrandsModel.typeTextOnSearchBar(brandName);
    await cpgBrandsModel.countRowsTable(1);
    await cpgBrandsModel.verifyThatTheCPGBrandIsCreated(brandName);

    await cpgBrandsModel.clickEditButtonFromABrand(brandName);

    const uniqueId2 = uuidv4();
    const brandName2 = ("CPGBrands" + uniqueId2).slice(0, 30);
    
    await cpgBrandsModel.clearNameField();
    await cpgBrandsModel.populateNodeNameInputField(brandName2);
    await cpgBrandsModel.downSaveButton.click({delay: 1000});

    await page.reload();
    await commonModel.waitUntilSpinnerDisappears();
    await cpgBrandsModel.typeTextOnSearchBar(brandName2);
    await cpgBrandsModel.countRowsTable(1);
    await cpgBrandsModel.verifyThatTheCPGBrandIsCreated(brandName2);
    
  });

  test(`Verify that the Super Admin user can edit all the fields in a created CPG Brand`, async ({ page }) => {
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const cpgBrandsModel = new CPGBrandsModel(page);
    const commonModel = new CommonModel(page);

    await page.goto(url);
    await page.setViewportSize({ width: 1600, height: 1000 });
    await loginModel.login(user.username, user.password);
    await topBarModel.selectBrand(brandsData.brandNodeName);
    await sideBarModel.onClickCPGBrandsOptionMenu();

    await cpgBrandsModel.verifyThatTheCPGBrandButtonIsVisible();
    await cpgBrandsModel.verifyThatBrandTableIsVisible();

    await cpgBrandsModel.createNewCPGBrandButton.click();
    await cpgBrandsModel.clickNodeNameInput();

    const uniqueId = uuidv4();
    const brandName = ("CPGBrands" + uniqueId).slice(0, 30);

    const uniqueId2 = uuidv4();
    const brandName2 = ("CPGBrands" + uniqueId2).slice(0, 30);

    await cpgBrandsModel.populateNodeNameInputField(brandName);

    await cpgBrandsModel.clickTypeDropdownMenu();
    await cpgBrandsModel.selectDropdownTypeOption("Brands");
    await cpgBrandsModel.fillNoteArea("This is a note");
    await cpgBrandsModel.fillAddressInput("address");
    await cpgBrandsModel.fillCityField("City");
    await cpgBrandsModel.fillStateField("State");
    await cpgBrandsModel.fillZipField("83000");
    await cpgBrandsModel.configurationHeader.click({delay:300});
    await cpgBrandsModel.clickLanguageDropdownMenu();
    await cpgBrandsModel.selectDropdownLanguageOption("Spanish");
    await cpgBrandsModel.createCPGBrandModal.click();
    await cpgBrandsModel.clickDefaultLanguageDropdownMenu();
    await cpgBrandsModel.logosHeadersHeader.click();
    await cpgBrandsModel.uploadRecipeImage(["src/images/A47.jpg"]);
    await cpgBrandsModel.clickDefaultThemeDropdownMenu();
    await cpgBrandsModel.clickOptionDefaultThemeMenu('aci-albertsons');
    await cpgBrandsModel.clickStylesCardsDropdownMenu();
    await cpgBrandsModel.downSaveButton.click({delay:300});
    await commonModel.waitUntilSpinnerDisappears();
    await cpgBrandsModel.typeTextOnSearchBar(brandName);
    await cpgBrandsModel.countRowsTable(1);
    await cpgBrandsModel.verifyThatTheCPGBrandIsCreated(brandName);

    await cpgBrandsModel.clickEditButtonFromABrand(brandName);
    await cpgBrandsModel.clearNameField();
    await cpgBrandsModel.populateNodeNameInputField(brandName2);
    await cpgBrandsModel.clickTypeDropdownMenu();
    await cpgBrandsModel.selectDropdownTypeOption("Brands");
    await cpgBrandsModel.clearFieldElement(cpgBrandsModel.noteArea);
    await cpgBrandsModel.fillNoteArea("This is an edited note");
    await cpgBrandsModel.clearFieldElement(cpgBrandsModel.addressField);
    await cpgBrandsModel.fillAddressInput("This is an edited address");
    await cpgBrandsModel.clearFieldElement(cpgBrandsModel.cityField);
    await cpgBrandsModel.fillCityField("Edited City");
    await cpgBrandsModel.clearFieldElement(cpgBrandsModel.stateField);
    await cpgBrandsModel.fillStateField("Edited State");
    await cpgBrandsModel.clearFieldElement(cpgBrandsModel.zipField);
    await cpgBrandsModel.fillZipField("83305");
    await cpgBrandsModel.configurationHeader.click();
    await cpgBrandsModel.clickLanguageDropdownMenu();
    await cpgBrandsModel.selectSupportedLanguage("Spanish");
    await cpgBrandsModel.createCPGBrandModal.click({delay: 300});
    await cpgBrandsModel.logosHeadersHeader.click();
    await cpgBrandsModel.uploadRecipeImage(["src/images/lemons.jpg"]);
    await cpgBrandsModel.clickDefaultThemeDropdownMenu();
    await cpgBrandsModel.clickOptionDefaultThemeMenu('coborns-cptlqr');
    await cpgBrandsModel.clickStylesCardsDropdownMenu();
    await cpgBrandsModel.selectCardStyle("Style Cards18d3640a-b1ea-4057-");
    await cpgBrandsModel.createCPGBrandModal.click({delay: 300});
    await cpgBrandsModel.downSaveButton.click({delay:300});
    await commonModel.waitUntilSpinnerDisappears();
    await cpgBrandsModel.verifyThatCreateModalIsNotVisible();
    await page.reload();
    await cpgBrandsModel.typeTextOnSearchBar(brandName2);
    await cpgBrandsModel.countRowsTable(1);
    await cpgBrandsModel.verifyThatTheCPGBrandIsCreated(brandName2);

    await cpgBrandsModel.clickEditButtonFromABrand(brandName2);
    await cpgBrandsModel.verifyFieldValue(brandName2, cpgBrandsModel.nodeNameInput);
    await cpgBrandsModel.verifyDrodpowndValue("Brand", cpgBrandsModel.typeDropdownMenu);
    await cpgBrandsModel.verifyFieldValue("This is an edited note", cpgBrandsModel.noteArea);
    await cpgBrandsModel.verifyFieldValue("This is an edited address", cpgBrandsModel.addressField);
    await cpgBrandsModel.verifyFieldValue("Edited City", cpgBrandsModel.cityField);
    await cpgBrandsModel.verifyFieldValue("Edited State", cpgBrandsModel.stateField);
    await cpgBrandsModel.verifyFieldValue("83305", cpgBrandsModel.zipField);
    await cpgBrandsModel.configurationHeader.click();
    await cpgBrandsModel.verifyDrodpowndValue("English, Spanish", cpgBrandsModel.languageDrodpownMenu.locator('div > div:nth-child(2) > div'));
    await cpgBrandsModel.verifyDrodpowndValue("English", cpgBrandsModel.defaultLanguageDropdownMenu);
    await cpgBrandsModel.logosHeadersHeader.click();
    await cpgBrandsModel.verifyDrodpowndValue("coborns-cptlqr", cpgBrandsModel.defaultThemeDropdownMenu);
    await cpgBrandsModel.verifyDrodpowndValue("4 Styles Selected", cpgBrandsModel.cardStylesDropdownMenu);
  });

});