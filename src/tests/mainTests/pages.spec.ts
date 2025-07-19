import { test, expect } from '@playwright/test';
import { LoginModel } from '../../pom/loginModel';
import {SidebarModel} from '../../pom/sidebarModel';
import {TopBarModel} from '../../pom/topBarModel';
import {validateEnvironment} from '../../utils/urlHandler';
import {validateUsers} from '../../utils/userHandler';
import { CommonModel } from '../../pom/commonModel';
import { RolesEnum as rolesData } from '../../enums/roles.enum';
import { Pagesmodel } from '../../pom/pagesModel';
import { storeOwnerRoleValidation } from '../../utils/rolesHandler';
import { brandsData } from '../../data/brandsData';
import {v4 as uuidv4} from 'uuid';

const users = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.brandNodeContentName));
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
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
      
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickPageOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();

      const pageName = ("Page" + uniqueId).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);

      await pagesModel.verifyThatCreatePageButtonIsVisible();
      await pagesModel.pagesCreateButton.click();
      await pagesModel.verifyThatThePageNameFieldIsPresent();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();
      await commonModel.waitUntilSpinnerDisappears();
      await pagesModel.verifySaveButtonIsNotDisplayed();

      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");

      await pagesModel.verifyTheNewPageIsCreated(pageName);

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
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {
      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }

      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickPageOptionMenu();

    const uniqueId = uuidv4();
    const uniqueId2 = uuidv4();

    const pageName = ("Page" + uniqueId).slice(0, 30);
    const pathName = ("path" + uniqueId2).slice(0, 30);

    await pagesModel.verifyThatCreatePageButtonIsVisible();
    await pagesModel.pagesCreateButton.click();
    await pagesModel.verifyThatThePageNameFieldIsPresent();
    await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
    await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
    await pagesModel.saveButton.click();
    await commonModel.waitUntilSpinnerDisappears();
    await pagesModel.verifySaveButtonIsNotDisplayed();

    await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");

    await pagesModel.verifyTheNewPageIsCreated(pageName);

    await pagesModel.deletePage(pageName);

    await pagesModel.verifyDeletedAlertMessage(pageName);
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
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {
      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }

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

      await pagesModel.verifyThatCreatePageButtonIsVisible();
      await pagesModel.pagesCreateButton.click();
      await pagesModel.verifyThatThePageNameFieldIsPresent();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();
      await commonModel.waitUntilSpinnerDisappears();
      await pagesModel.verifySaveButtonIsNotDisplayed();

      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");

      await pagesModel.verifyTheNewPageIsCreated(pageName);

      await pagesModel.clickAddChildButton(pageName);

      await pagesModel.createPopUpPageNameField.type(subPageName);
      await pagesModel.createPopUpPathField.type(subPathName);
      await pagesModel.saveButton.click();
      await commonModel.waitUntilSpinnerDisappears();

      await pagesModel.clickExpandButton(pageName, subPageName);

      await pagesModel.verifyTheNewSubPageIsCreated(subPageName);

      await pagesModel.deletePage(pageName);
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
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {
      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }

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

      await pagesModel.verifyThatCreatePageButtonIsVisible();
      await pagesModel.pagesCreateButton.click();
      await pagesModel.verifyThatThePageNameFieldIsPresent();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();
      await commonModel.waitUntilSpinnerDisappears();
      await pagesModel.verifySaveButtonIsNotDisplayed();

      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");

      await pagesModel.verifyTheNewPageIsCreated(pageName);

      await pagesModel.clickAddChildButton(pageName);

      await pagesModel.createPopUpPageNameField.type(subPageName);
      await pagesModel.createPopUpPathField.type(subPathName);
      await pagesModel.saveButton.click();
      await commonModel.waitUntilSpinnerDisappears();

      await pagesModel.clickExpandButton(pageName, subPageName);

      await pagesModel.verifyTheNewSubPageIsCreated(subPageName);

      await pagesModel.deletePage(subPageName);

      await pagesModel.verifyDeletedAlertMessage(subPageName);

      await pagesModel.deletePage(pageName);
    }
  });

  //Subbrand

  test(`Verify that it is possible to add a new page at the subBrand level '${user.role}'`, async ({ page }) => {
    test.setTimeout(180000);
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
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandName, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickPageOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();

      const pageName = ("Page" + uniqueId).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);

      await pagesModel.verifyThatCreatePageButtonIsVisible();
      await pagesModel.pagesCreateButton.click();
      await pagesModel.verifyThatThePageNameFieldIsPresent();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();
      await commonModel.waitUntilSpinnerDisappears();
      await pagesModel.verifySaveButtonIsNotDisplayed();

      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");

      await pagesModel.verifyTheNewPageIsCreated(pageName);

      await pagesModel.deletePage(pageName);
    }
  });

  test(`Verify that it is possible to delete a page at the subBrand level '${user.role}'`, async ({ page }) => {
    test.setTimeout(120000);
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
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandName, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickPageOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();

      const pageName = ("Page" + uniqueId).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);

      await pagesModel.verifyThatCreatePageButtonIsVisible();
      await pagesModel.pagesCreateButton.click();
      await pagesModel.verifyThatThePageNameFieldIsPresent();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();
      await commonModel.waitUntilSpinnerDisappears();
      await pagesModel.verifySaveButtonIsNotDisplayed();

      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");

      await pagesModel.verifyTheNewPageIsCreated(pageName);

      await pagesModel.deletePage(pageName);

      await pagesModel.verifyDeletedAlertMessage(pageName);
    }
  });

  test(`Verify that it is possible to add a subpage at the subBrand level '${user.role}'`, async ({ page }) => {
    test.setTimeout(180000);
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
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandName, brandsData.subBrand);
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

      await pagesModel.verifyThatCreatePageButtonIsVisible();
      await pagesModel.pagesCreateButton.click();
      await pagesModel.verifyThatThePageNameFieldIsPresent();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();
      await pagesModel.verifySaveButtonIsNotDisplayed();
      await commonModel.waitUntilSpinnerDisappears();

      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");

      await pagesModel.verifyTheNewPageIsCreated(pageName);

      await pagesModel.clickAddChildButton(pageName);

      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, subPageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, subPathName);
      await pagesModel.saveButton.click();
      await pagesModel.verifySaveButtonIsNotDisplayed();
      await commonModel.waitUntilSpinnerDisappears();

      await pagesModel.clickExpandButton(pageName, subPathName);

      await pagesModel.verifyTheNewSubPageIsCreated(subPageName);

      await pagesModel.deletePage(pageName);
    }
  });

  test(`Verify that it is possible to delete a subpage at the subBrand '${user.role}'`, async ({ page }) => {
    test.setTimeout(240000);
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
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandName, brandsData.subBrand);
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

      await pagesModel.verifyThatCreatePageButtonIsVisible();
      await pagesModel.pagesCreateButton.click();
      await pagesModel.verifyThatThePageNameFieldIsPresent();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();
      await commonModel.waitUntilSpinnerDisappears();
      await pagesModel.verifySaveButtonIsNotDisplayed();

      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");

      await pagesModel.verifyTheNewPageIsCreated(pageName);

      await pagesModel.clickAddChildButton(pageName);

      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, subPageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, subPathName);
      await pagesModel.saveButton.click();
      await commonModel.waitUntilSpinnerDisappears();
      await pagesModel.verifySaveButtonIsNotDisplayed();

      await pagesModel.clickExpandButton(pageName, subPageName);

      await pagesModel.verifyTheNewSubPageIsCreated(subPageName);

      await pagesModel.deletePage(subPageName);

      await pagesModel.verifyDeletedAlertMessage(subPageName);

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
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {
      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandName, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickPageOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();
      const uniqueId3 = uuidv4();
      const uniqueId4 = uuidv4();

      const pageName = ("Page" + uniqueId).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);

      await pagesModel.verifyThatCreatePageButtonIsVisible();
      await pagesModel.pagesCreateButton.click();
      await pagesModel.verifyThatThePageNameFieldIsPresent();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();
      await commonModel.waitUntilSpinnerDisappears();
      await pagesModel.verifySaveButtonIsNotDisplayed();

      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");

      await pagesModel.verifyTheNewPageIsCreated(pageName);

      await commonModel.setSearchValue(pageName);

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
      await loginModel.login(user.username, user.password);
      await sideBarModel.onClickPageOptionMenu();
      await pagesModel.verifyThatCreatePageButtonIsNotPresent();
    } else {
      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandName, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickPageOptionMenu();

      const uniqueId = uuidv4();
      const uniqueId2 = uuidv4();

      const pageName = ("Page" + uniqueId).slice(0, 30);
      const pathName = ("path" + uniqueId2).slice(0, 30);


      await pagesModel.verifyThatCreatePageButtonIsVisible();
      await pagesModel.pagesCreateButton.click();
      await pagesModel.verifyThatThePageNameFieldIsPresent();
      await commonModel.inputTextInLocator(pagesModel.createPopUpPageNameField, pageName);
      await commonModel.inputTextInLocator(pagesModel.createPopUpPathField, pathName);
      await pagesModel.saveButton.click();
      await pagesModel.verifySaveButtonIsNotDisplayed();
      await commonModel.waitUntilSpinnerDisappears();

      await pagesModel.verifyCreatedAlertMessage("Page was created successfully!");

      await pagesModel.verifyTheNewPageIsCreated(pageName);

      await commonModel.setSearchValue('aaaaaaaaaaaaaa');

      await pagesModel.verifyTheNewPageIsNotCreated(pageName);

      await pagesModel.searchBar.click();
      await pagesModel.searchBar.clear();

      await pagesModel.deletePage(pageName);
      await pagesModel.verifyTheNewPageIsNotCreated(pageName);
    }
  });

});