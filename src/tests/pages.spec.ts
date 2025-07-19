import { test, expect } from '@playwright/test';
import { LoginModel } from '../pom/loginModel';
import {SidebarModel} from '../pom/sidebarModel';
import {TopBarModel} from '../pom/topBarModel';
import {validateEnvironment} from '../utils/urlHandler';
import {validateUsers, selectStoreOwner} from '../utils/userHandler';
import { CommonModel } from '../pom/commonModel';
import { rolesData } from '../data/usersData';
import { Pagesmodel } from '../pom/pagesModel';
import { storeOwnerRoleValidation } from '../utils/rolesHandler';
import { brandsData } from '../data/brandsData';
import {v4 as uuidv4} from 'uuid';

const users = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.onlyPages));
const url: string = validateEnvironment();

users.forEach(user =>{

  test(`Add Pages At Brand Node Level '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {
      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
      
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickPageOptionMenu();
  
      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();
  
      const pageName = ("Page" + uniqueId).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);
  
      await pagesModel.verifyThatCreatePageButtonIsPresent();
      await pagesModel.pagesCreateButton.click();
      await pagesModel.verifyThatThePageNameFieldIsPresent();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();
  
      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");
  
      await pagesModel.verifyTheNewPageIsCreated(pageName);
  
      await pagesModel.deletePage(pageName);
    }

  });


  test(`Add a SubPage At Brand Node Level '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER4_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {
    await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickPageOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();
      const uniqueId3 = uuidv4();
      const uniqueId4 = uuidv4();

      const pageName = ("Page" + uniqueId).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);

      const subPageName = ("Page" + uniqueId3).slice(0, 30);
      const subPathName = ("path" + uniqueId4).slice(0, 30);

      await pagesModel.verifyThatCreatePageButtonIsPresent();
      await pagesModel.pagesCreateButton.click();
      await pagesModel.verifyThatThePageNameFieldIsPresent();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();

      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");

      await pagesModel.verifyTheNewPageIsCreated(pageName);

      await pagesModel.clickAddChildButton(pageName);

      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, subPageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, subPathName);
      await pagesModel.saveButton.click();
      await commonModel.waitUntilSpinnerDisappears();

      await pagesModel.clickExpandButton(pageName, subPageName);

      await pagesModel.verifyTheNewSubPageIsCreated(subPageName);

      await pagesModel.deletePage(pageName);
    }
  });


  test(`Delete Pages At Brand Node Level '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER4_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {

      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickPageOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();

      const pageName = ("Page" + uniqueId).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);

      await pagesModel.verifyThatCreatePageButtonIsPresent();
      await pagesModel.pagesCreateButton.click();
      await pagesModel.verifyThatThePageNameFieldIsPresent();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();

      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");

      await pagesModel.verifyTheNewPageIsCreated(pageName);

      await pagesModel.deletePage(pageName);

      await pagesModel.verifyDeletedAlertMessage(pageName);
    }
  });


  test(`Delete SubPages At Brand Node Level '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER4_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {

      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickPageOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();
      const uniqueId3 = uuidv4();
      const uniqueId4 = uuidv4();

      const pageName = ("Page" + uniqueId).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);

      const subPageName = ("Page" + uniqueId3).slice(0, 30);
      const subPathName = ("path" + uniqueId4).slice(0, 30);

      await pagesModel.verifyThatCreatePageButtonIsPresent();
      await pagesModel.pagesCreateButton.click();
      await pagesModel.verifyThatThePageNameFieldIsPresent();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();

      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");

      await pagesModel.verifyTheNewPageIsCreated(pageName);

      await pagesModel.clickAddChildButton(pageName);

      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, subPageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, subPathName);
      await pagesModel.saveButton.click();
      await commonModel.waitUntilSpinnerDisappears();

      await pagesModel.clickExpandButton(pageName, subPageName);

      await pagesModel.verifyTheNewSubPageIsCreated(subPageName);

      await pagesModel.deletePage(subPageName);

      await pagesModel.verifyDeletedAlertMessage(subPageName);

      await pagesModel.deletePage(pageName);
    }
  });


  test(`The user performs a search using a valid page name '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER4_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {

      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickPageOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();

      const pageName = ("Page" + uniqueId).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);

      await pagesModel.verifyThatCreatePageButtonIsPresent();
      await pagesModel.pagesCreateButton.click();
      await pagesModel.verifyThatThePageNameFieldIsPresent();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();
      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");

      await commonModel.searchInput.pressSequentially(pageName);

      await pagesModel.verifyTheNewPageIsCreated(pageName);

      await pagesModel.deletePage(pageName);
    }
  });


  test(`The user performs a search using an invalid page name '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER4_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {

      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickPageOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();

      const pageName = ("Page" + uniqueId).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);

      await pagesModel.verifyThatCreatePageButtonIsPresent();
      await pagesModel.pagesCreateButton.click();
      await pagesModel.verifyThatThePageNameFieldIsPresent();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();
      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");
      await pagesModel.verifyTheNewPageIsCreated(pageName);
      await commonModel.waitUntilSpinnerDisappears();

      await commonModel.searchInput.pressSequentially('aaaaaaaaaaaaaa');

      await pagesModel.verifyTheNewPageIsNotCreated(pageName);

      await commonModel.searchInput.clear();

      await pagesModel.deletePage(pageName);
    }
  });


  test(`Create Pages at Brand Node Level with a name already on use '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER4_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {

      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickPageOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();
      const uniqueId3 = uuidv4();

      const pageName = ("Page" + uniqueId).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);
      const pathName2 = ("path" + uniqueId3).slice(0, 30);

      await pagesModel.verifyThatCreatePageButtonIsPresent();
      await pagesModel.pagesCreateButton.click();
      await pagesModel.verifyThatThePageNameFieldIsPresent();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();
      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");

      await commonModel.searchInput.pressSequentially(pageName);

      await pagesModel.verifyTheNewPageIsCreated(pageName);

      await pagesModel.pagesCreateButton.click();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName2);
      await pagesModel.saveButton.click();

      await pagesModel.verifyThePageNameAlreadyTakenMessageDisplayed();

      await pagesModel.cancelButton.click();

      await pagesModel.deletePage(pageName);
    }
  });


  test(`Create Pages at Brand Node Level with a path already on use '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER4_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {

      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickPageOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();
      const uniqueId3 = uuidv4();

      const pageName = ("Page" + uniqueId).slice(0, 30);
      const pageName2 = ("Page" + uniqueId3).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);
      const pathName2 = ("path" + uniqueId2).slice(0, 30);

      await pagesModel.verifyThatCreatePageButtonIsPresent();
      await pagesModel.pagesCreateButton.click();
      await pagesModel.verifyThatThePageNameFieldIsPresent();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();
      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");

      await commonModel.searchInput.pressSequentially(pageName);

      await pagesModel.verifyTheNewPageIsCreated(pageName);

      await pagesModel.pagesCreateButton.click();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName2);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();

      await pagesModel.verifyThePathNameAlreadyTakenMessageDisplayed();

      await pagesModel.cancelButton.click();

      await pagesModel.deletePage(pageName);
    }
  });


  test(`Verify that when a new page is created a new category is created by default with the page name at brand level '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER4_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {

      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickPageOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();

      const pageName = ("Page" + uniqueId).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);

      await pagesModel.verifyThatCreatePageButtonIsPresent();
      await pagesModel.pagesCreateButton.click();
      await pagesModel.verifyThatThePageNameFieldIsPresent();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();
      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");

      await pagesModel.verifyTheNewPageIsCreated(pageName);

      await sideBarModel.onClickCategoriesOptionMenu();

      await pagesModel.verifyTheCategoryIsCreated(pageName);

      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.deletePage(pageName);
    }
  });


  test(`Verify that a new page is created using the create page function in the content module at brand level '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER4_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {

      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickContentOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();

      const pageName = ("Page" + uniqueId).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);

      await pagesModel.waitContentSkeletonNotVisible();
      await pagesModel.clickAddPageInContentModule();
      await pagesModel.verifyThatThePageNameFieldIsPresent();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();
      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");
      await commonModel.waitUntilSpinnerDisappears();
      await pagesModel.waitContentSkeletonNotVisible();

      await pagesModel.verifyPageIsDisplayedOnTheList(pageName);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.deletePage(pageName);
    }
  });


  test(`Verify that when creating a page using the create page from content function the pages is displayed in the page module at brand level '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER4_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {

      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickContentOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();

      const pageName = ("Page" + uniqueId).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);

      await pagesModel.waitContentSkeletonNotVisible();
      await pagesModel.clickAddPageInContentModule();
      await pagesModel.verifyThatThePageNameFieldIsPresent();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();
      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");
      await commonModel.waitUntilSpinnerDisappears();
      await pagesModel.waitContentSkeletonNotVisible();


      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyTheNewPageIsCreated(pageName);
      await pagesModel.deletePage(pageName);
    }
  });


  test(`Verify that creating a page using the create page from content function also creates a category for that page at brand level '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER4_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {

      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickContentOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();

      const pageName = ("Page" + uniqueId).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);

      await pagesModel.waitContentSkeletonNotVisible();
      await pagesModel.clickAddPageInContentModule();
      await pagesModel.verifyThatThePageNameFieldIsPresent();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();
      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");
      await commonModel.waitUntilSpinnerDisappears();
      await pagesModel.waitContentSkeletonNotVisible();

      await pagesModel.waitPageNameFieldIsNotDisplayed();
      await sideBarModel.onClickCategoriesOptionMenu();
      await pagesModel.verifyTheCategoryIsCreated(pageName);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.deletePage(pageName);
    }
  });

  //Subbrand

  test(`Verify that it is possible to add a new page at the subBrand level '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER4_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {

      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
      await topBarModel.selectNodeBrandChild(brandsData.subBrandPages, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickPageOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();

      const pageName = ("Page" + uniqueId).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);

      await pagesModel.verifyThatCreatePageButtonIsPresent();
      await pagesModel.pagesCreateButton.click();
      await pagesModel.verifyThatThePageNameFieldIsPresent();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();

      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");

      await pagesModel.verifyTheNewPageIsCreated(pageName);

      await pagesModel.deletePage(pageName);
    }
  });


  test(`Verify that it is possible to delete a page at the subBrand level '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER4_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {

      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
      await topBarModel.selectNodeBrandChild(brandsData.subBrandPages, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickPageOptionMenu();

      //const uniqueId = uuidv4();
      //const uniqueId2 = uuidv4();

      //const pageName = ("Page" + uniqueId).slice(0, 30);
      //const pathName = ("path" + uniqueId2).slice(0, 30);

      //await pagesModel.verifyThatCreatePageButtonIsPresent();
      //await pagesModel.pagesCreateButton.click();
      //await pagesModel.verifyThatThePageNameFieldIsPresent();
      //await pagesModel.createPopUpPageNameField.type(pageName);
      //await pagesModel.createPopUpPathField.type(pathName);
      //await pagesModel.saveButton.click();

      //await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");

      //await pagesModel.verifyTheNewPageIsCreated(pageName);

      //await pagesModel.deletePage(pageName);

      //await pagesModel.verifyDeletedAlertMessage(pageName);
    }
  });

  test(`Verify that it is possible to add a subpage at the subBrand level '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER4_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {

      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
      await topBarModel.selectNodeBrandChild(brandsData.subBrandPages, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickPageOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();
      const uniqueId3 = uuidv4();
      const uniqueId4 = uuidv4();

      const pageName = ("Page" + uniqueId).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);

      const subPageName = ("Page" + uniqueId3).slice(0, 30);
      const subPathName = ("path" + uniqueId4).slice(0, 30);

      await pagesModel.verifyThatCreatePageButtonIsPresent();
      await pagesModel.pagesCreateButton.click();
      await pagesModel.verifyThatThePageNameFieldIsPresent();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();

      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");

      await pagesModel.verifyTheNewPageIsCreated(pageName);

      await pagesModel.clickAddChildButton(pageName);

      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, subPageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, subPathName);
      await pagesModel.saveButton.click();
      await commonModel.waitUntilSpinnerDisappears();

      await pagesModel.clickExpandButton(pageName, subPathName);

      await pagesModel.verifyTheNewSubPageIsCreated(subPageName);

      await pagesModel.deletePage(pageName);
    }
  });

  test(`Verify that it is possible to delete a subpage at the subBrand '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER4_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {

      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
      await topBarModel.selectNodeBrandChild(brandsData.subBrandPages, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickPageOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();
      const uniqueId3 = uuidv4();
      const uniqueId4 = uuidv4();

      const pageName = ("Page" + uniqueId).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);

      const subPageName = ("Page" + uniqueId3).slice(0, 30);
      const subPathName = ("path" + uniqueId4).slice(0, 30);

      await pagesModel.verifyThatCreatePageButtonIsPresent();
      await pagesModel.pagesCreateButton.click();
      await pagesModel.verifyThatThePageNameFieldIsPresent();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();

      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");
      await pagesModel.waitPageNameFieldIsNotDisplayed();

      await pagesModel.verifyTheNewPageIsCreated(pageName);

      await pagesModel.clickAddChildButton(pageName);

      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, subPageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, subPathName);
      await pagesModel.saveButton.click();
      await commonModel.waitUntilSpinnerDisappears();

      await pagesModel.clickExpandButton(pageName, subPageName);

      await pagesModel.verifyTheNewSubPageIsCreated(subPageName);

      await pagesModel.deletePage(subPageName);

      await pagesModel.verifyDeletedAlertMessage(subPageName);

      await pagesModel.deletePage(pageName);
    }
  });


  test(`Verify if is possible to create a page with a name already on use at subBrand level '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER4_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {

      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandPages, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickPageOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();
      const uniqueId3 = uuidv4();

      const pageName = ("Page" + uniqueId).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);
      const pathName2 = ("path" + uniqueId3).slice(0, 30);

      await pagesModel.verifyThatCreatePageButtonIsPresent();
      await pagesModel.pagesCreateButton.click();
      await pagesModel.verifyThatThePageNameFieldIsPresent();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();
      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");

      await commonModel.searchInput.pressSequentially(pageName);

      await pagesModel.verifyTheNewPageIsCreated(pageName);

      await pagesModel.pagesCreateButton.click();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName2);
      await pagesModel.saveButton.click();

      await pagesModel.verifyThePageNameAlreadyTakenMessageDisplayed();

      await pagesModel.cancelButton.click();

      await pagesModel.deletePage(pageName);
    }
  });


  test(`Verify if is possible to create a page with a path already on use at subBrand level '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER4_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {

      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandPages, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickPageOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();
      const uniqueId3 = uuidv4();

      const pageName = ("Page" + uniqueId).slice(0, 30);
      const pageName2 = ("Page" + uniqueId3).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);
      const pathName2 = ("path" + uniqueId2).slice(0, 30);

      await pagesModel.verifyThatCreatePageButtonIsPresent();
      await pagesModel.pagesCreateButton.click();
      await pagesModel.verifyThatThePageNameFieldIsPresent();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();
      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");

      await commonModel.searchInput.pressSequentially(pageName);

      await pagesModel.verifyTheNewPageIsCreated(pageName);

      await pagesModel.pagesCreateButton.click();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName2);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();

      await pagesModel.verifyThePathNameAlreadyTakenMessageDisplayed();

      await pagesModel.cancelButton.click();

      await pagesModel.deletePage(pageName);
    }
  });

  test(`The user performs a specific search on the search field with a valid page name at the subBrand level '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER4_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {

      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
      await topBarModel.selectNodeBrandChild(brandsData.subBrandPages, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickPageOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();
      const uniqueId3 = uuidv4();
      const uniqueId4 = uuidv4();

      const pageName = ("Page" + uniqueId).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);

      const subPageName = ("Page" + uniqueId3).slice(0, 30);
      const subPathName = ("path" + uniqueId4).slice(0, 30);

      await pagesModel.verifyThatCreatePageButtonIsPresent();
      await pagesModel.pagesCreateButton.click();
      await pagesModel.verifyThatThePageNameFieldIsPresent();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();

      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");

      await pagesModel.verifyTheNewPageIsCreated(pageName);

      await pagesModel.searchBar.pressSequentially(pageName);

      await pagesModel.verifyTheNewPageIsCreated(pageName);

      await pagesModel.deletePage(pageName);
    }
  });

  test(`The user performs a specific search on the search field with an invalid page name at the subBrand level '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER4_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {

      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandPages, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickPageOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();
      const uniqueId3 = uuidv4();
      const uniqueId4 = uuidv4();

      const pageName = ("Page" + uniqueId).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);

      const subPageName = ("Page" + uniqueId3).slice(0, 30);
      const subPathName = ("path" + uniqueId4).slice(0, 30);

      await pagesModel.verifyThatCreatePageButtonIsPresent();
      await pagesModel.pagesCreateButton.click();
      await pagesModel.verifyThatThePageNameFieldIsPresent();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();

      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");

      await pagesModel.verifyTheNewPageIsCreated(pageName);

      await pagesModel.searchBar.pressSequentially('aaaaaaaaaaaaaa');

      await pagesModel.verifyTheNewPageIsNotCreated(pageName);

      await pagesModel.searchBar.clear();

      await pagesModel.deletePage(pageName);
    }
  });


  test(`Verify that when a new page is created a new category is created by default with the page name at sub brand level '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER4_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {

      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandPages, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickPageOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();

      const pageName = ("Page" + uniqueId).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);

      await pagesModel.verifyThatCreatePageButtonIsPresent();
      await pagesModel.pagesCreateButton.click();
      await pagesModel.verifyThatThePageNameFieldIsPresent();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();
      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");

      await pagesModel.verifyTheNewPageIsCreated(pageName);

      await sideBarModel.onClickCategoriesOptionMenu();

      await pagesModel.verifyTheCategoryIsCreated(pageName);

      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.deletePage(pageName);
    }
  });


  test(`Verify that a new page is created using the create page function in the content module at sub brand level '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    test.setTimeout(120000);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER4_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {

      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandPages, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickContentOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();

      const pageName = ("Page" + uniqueId).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);

      await pagesModel.waitContentSkeletonNotVisible();
      await pagesModel.clickAddPageInContentModule();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();

      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");
      await commonModel.waitUntilSpinnerDisappears();
      await pagesModel.waitContentSkeletonNotVisible();

      await pagesModel.waitPageNameFieldIsNotDisplayed();
      await pagesModel.verifyPageIsDisplayedOnTheList(pageName);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.deletePage(pageName);
    }
  });


  test(`Verify that when creating a page using the create page from content function the pages is displayed in the page module at sub brand level '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER4_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {

      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandPages, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickContentOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();

      const pageName = ("Page" + uniqueId).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);

      await pagesModel.waitContentSkeletonNotVisible();
      await pagesModel.clickAddPageInContentModule();
      await pagesModel.verifyThatThePageNameFieldIsPresent();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();
      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");
      await commonModel.waitUntilSpinnerDisappears();
      await pagesModel.waitContentSkeletonNotVisible();

      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyTheNewPageIsCreated(pageName);
      await pagesModel.deletePage(pageName);
    }
  });


  test(`Verify that creating a page using the create page from content function also creates a category for that page at sub brand level '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER4_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {

      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandPages, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickContentOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();

      const pageName = ("Page" + uniqueId).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);

      await pagesModel.waitContentSkeletonNotVisible();
      await pagesModel.clickAddPageInContentModule();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();
      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");
      await commonModel.waitUntilSpinnerDisappears();
      await pagesModel.waitContentSkeletonNotVisible();

      await sideBarModel.onClickCategoriesOptionMenu();
      await pagesModel.verifyTheCategoryIsCreated(pageName);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.deletePage(pageName);
    }
  });


  test(`Verify that it is not possible to add a new page at the store level '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER4_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
    await commonModel.waitUntilSpinnerDisappears();
    await topBarModel.selectNodeStoreGroupChild(brandsData.storePages);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickPageOptionMenu();

    await pagesModel.verifyThatTheCreatePageButtonIsNotDisplayed();
    }

  });


  test(`Verify that it is possible to create a subPages using the create subPages function from the content module '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER4_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {
      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickContentOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();

      const subPageName = ("SubPage" + uniqueId).slice(0, 30);
      const subPathName = ("Path" + uniqueId2).slice(0, 30);


      await pagesModel.waitContentSkeletonNotVisible();
      await pagesModel.clickAddSubPageInContentModule();
      await pagesModel.verifyThatThePageNameFieldIsPresent();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, subPageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, subPathName);
      await pagesModel.saveButton.click();
      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");
      await commonModel.waitUntilSpinnerDisappears();
      await pagesModel.waitContentSkeletonNotVisible();

      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.clickExpandButton("NewPage", subPageName);
      await pagesModel.verifyTheNewPageIsCreated(subPageName);
      await pagesModel.deleteSubPage(subPageName);
    }
  });


  test(`Verify that when creating a subpage from the content it is also created in the page module '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER4_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {

      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickContentOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();

      const subPageName = ("SubPage" + uniqueId).slice(0, 30);
      const subPathName = ("Path" + uniqueId2).slice(0, 30);


      await pagesModel.waitContentSkeletonNotVisible();
      await pagesModel.clickAddSubPageInContentModule();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, subPageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, subPathName);
      await pagesModel.saveButton.click();
      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");
      await commonModel.waitUntilSpinnerDisappears();
      await pagesModel.waitContentSkeletonNotVisible();

      await pagesModel.verifyTheItemIsCreatedInThePageLIst(subPageName);

      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.clickExpandButton("NewPage", subPageName);
      await pagesModel.deleteSubPage(subPageName);
    }
  });


  test(`Verify that the category is created when the subpage is created from the content module '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER4_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {
      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickContentOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();

      const subPageName = ("SubPage" + uniqueId).slice(0, 30);
      const subPathName = ("Path" + uniqueId2).slice(0, 30);


      await pagesModel.waitContentSkeletonNotVisible();
      await pagesModel.clickAddSubPageInContentModule();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, subPageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, subPathName);
      await pagesModel.saveButton.click();
      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");
      await commonModel.waitUntilSpinnerDisappears();
      await pagesModel.waitContentSkeletonNotVisible();

      await pagesModel.verifyTheItemIsCreatedInThePageLIst(subPageName);

      await sideBarModel.onClickCategoriesOptionMenu();

      await pagesModel.checkCategoryWithPageInTable(subPageName, subPageName);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.clickExpandButton("NewPage", subPageName);
      await pagesModel.deleteSubPage(subPageName);
    }
  });



  test(`Verify that it is possible to create a subpage using the create subpage function from the content module at subbrand level '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    test.setTimeout(180000);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER4_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {

      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandPages, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickContentOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();

      const subPageName = ("SubPage" + uniqueId).slice(0, 30);
      const subPathName = ("Path" + uniqueId2).slice(0, 30);


      await pagesModel.waitContentSkeletonNotVisible();
      await pagesModel.clickAddSubPageInContentModule();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, subPageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, subPathName);
      await pagesModel.saveButton.click();
      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");
      await commonModel.waitUntilSpinnerDisappears();
      await pagesModel.waitContentSkeletonNotVisible();

      await pagesModel.waitPageNameFieldIsNotDisplayed();
      await pagesModel.verifyTheItemIsCreatedInThePageLIst(subPageName);

      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.clickExpandButton("NewPage", subPageName);
      await pagesModel.deleteSubPage(subPageName);
    }
  });


  test(`Verify that when creating a subpage from the content it is also created in the page module at subbrand module '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER4_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {

      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandPages, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickContentOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();

      const subPageName = ("SubPage" + uniqueId).slice(0, 30);
      const subPathName = ("Path" + uniqueId2).slice(0, 30);


      await pagesModel.waitContentSkeletonNotVisible();
      await pagesModel.clickAddSubPageInContentModule();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, subPageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, subPathName);
      await pagesModel.saveButton.click();
      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");
      await commonModel.waitUntilSpinnerDisappears();
      await pagesModel.waitContentSkeletonNotVisible();

      await pagesModel.waitPageNameFieldIsNotDisplayed();
      await pagesModel.verifyTheItemIsCreatedInThePageLIst(subPageName);

      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.clickExpandButton("NewPage", subPageName);
      await pagesModel.deleteSubPage(subPageName);
    }
  });


  test(`Verify that the category is created when the subpage is created in the content module at subbrand level '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER4_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {

      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandPages, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickContentOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();

      const subPageName = ("SubPage" + uniqueId).slice(0, 30);
      const subPathName = ("Path" + uniqueId2).slice(0, 30);


      await pagesModel.waitContentSkeletonNotVisible();
      await pagesModel.clickAddSubPageInContentModule();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, subPageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, subPathName);
      await pagesModel.saveButton.click();
      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");
      await commonModel.waitUntilSpinnerDisappears();
      await pagesModel.waitContentSkeletonNotVisible();
      await pagesModel.waitPageNameFieldIsNotDisplayed();
      
      await pagesModel.verifyTheItemIsCreatedInThePageLIst(subPageName);

      await sideBarModel.onClickCategoriesOptionMenu();

      await pagesModel.checkCategoryWithPageInTable(subPageName, subPageName);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.clickExpandButton("NewPage", subPageName);
      await pagesModel.deleteSubPage(subPageName);
    }
  });


  test(`Verify that when creating a page from the content page, the categories are added in card detail Brand '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER4_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER4_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await pagesModel.waitContentSkeletonVisible();
      await pagesModel.waitContentSkeletonNotVisible();
      await pagesModel.clickAddPageInContentModuleNotDisplayed();
    } else {

      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyPages); }
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickContentOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();

      const pageName = ("page" + uniqueId).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);

      await pagesModel.waitContentSkeletonNotVisible();
      await pagesModel.clickAddPageInContentModule();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();
      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");
      await commonModel.waitUntilSpinnerDisappears();
      await pagesModel.waitContentSkeletonNotVisible();

      await pagesModel.verifyPageIsDisplayedOnTheList(pageName);

      await pagesModel.categoryCardDetail.click();

      await pagesModel.filterCategoryCardDetail.pressSequentially(pageName);

      await pagesModel.verifyTheNewPageIsVisibleCardDetail(pageName);

      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.deletePage(pageName);
    }
  });


 /**
 * Start tests for translated english pages
 */
  test(`Verify an english page in page module can be created at dual language brand level default english '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {

      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeNameEn); }
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickPageOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();

      const pageName = ("page" + uniqueId).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);

      await pagesModel.verifyThatCreatePageButtonIsPresent();
      await pagesModel.pagesCreateButton.click();
      await pagesModel.setPageName(pageName);
      await pagesModel.setPagePath(pathName);
      await pagesModel.saveButton.click();
      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");
      await commonModel.waitUntilSpinnerDisappears();

      await pagesModel.verifyTheNewPageIsCreated(pageName);

      await pagesModel.deletePage(pageName);
    }
  });


  test(`Verify an english subpage in page module can be created at dual language brand level default english '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {

      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeNameEn); }
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickPageOptionMenu();
      await commonModel.waitUntilSpinnerDisappears();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();
      const uniqueId3 = uuidv4();
      const uniqueId4 = uuidv4();

      const pageName = ("Page" + uniqueId).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);

      const subPageName = ("Page" + uniqueId3).slice(0, 30);
      const subPathName = ("path" + uniqueId4).slice(0, 30);

      await pagesModel.verifyThatCreatePageButtonIsPresent();
      await pagesModel.pagesCreateButton.click();
      await pagesModel.setPageName(pageName);
      await pagesModel.setPagePath(pathName);
      await pagesModel.saveButton.click();

      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");

      await pagesModel.verifyTheNewPageIsCreated(pageName);

      await pagesModel.clickAddChildButton(pageName);

      await pagesModel.setPageName(subPageName);
      await pagesModel.setPagePath(subPathName);
      await pagesModel.saveButton.click();
      await commonModel.waitUntilSpinnerDisappears();

      await pagesModel.clickExpandButton(pageName, subPageName);

      await pagesModel.verifyTheNewSubPageIsCreated(subPageName);

      await pagesModel.deletePage(pageName);
    }
  });

  /**
  * End tests for translated english pages
  */


  /**
 * Start tests for translated spanish pages
 */
   test(`Verify a spanish page in page module can be created at dual language brand level default spanish '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);
    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER3_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER3_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {

      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeNameEs); }
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickPageOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();

      const pageName = ("page" + uniqueId).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);

      await pagesModel.verifyThatCreatePageButtonIsPresent();
      await pagesModel.pagesCreateButton.click();
      await pagesModel.setPageName(pageName);
      await pagesModel.setPagePath(pathName);
      await pagesModel.saveButton.click();
      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");
      await commonModel.waitUntilSpinnerDisappears();

      await pagesModel.verifyTheNewPageIsCreated(pageName);

      await pagesModel.deletePage(pageName);
    }
  });


  test(`Verify a spanish subpage in page module can be created at dual language brand level default spanish '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const pagesModel = new Pagesmodel(page);

    if(user.role == rolesData.storeOwner){ 
      user.username = `${process.env.AUTOMATION_STOREOWNER3_USERNAME}`
      user.password = `${process.env.AUTOMATION_STOREOWNER3_PASSWORD}`
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {

      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeNameEs); }
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickPageOptionMenu();
      await commonModel.waitUntilSpinnerDisappears();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();
      const uniqueId3 = uuidv4();
      const uniqueId4 = uuidv4();

      const pageName = ("Page" + uniqueId).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);

      const subPageName = ("Page" + uniqueId3).slice(0, 30);
      const subPathName = ("path" + uniqueId4).slice(0, 30);

      await pagesModel.verifyThatCreatePageButtonIsPresent();
      await pagesModel.pagesCreateButton.click();
      await pagesModel.setPageName(pageName);
      await pagesModel.setPagePath(pathName);
      await pagesModel.saveButton.click();

      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");

      await pagesModel.verifyTheNewPageIsCreated(pageName);

      await pagesModel.clickAddChildButton(pageName);

      await pagesModel.setPageName(subPageName);
      await pagesModel.setPagePath(subPathName);
      await pagesModel.saveButton.click();
      await commonModel.waitUntilSpinnerDisappears();

      await pagesModel.clickExpandButton(pageName, subPageName);

      await pagesModel.verifyTheNewSubPageIsCreated(subPageName);

      await pagesModel.deletePage(pageName);
    }
  });

});