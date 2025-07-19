import { test, expect } from '@playwright/test';
import { LoginModel } from '../../pom/loginModel';
import {SidebarModel} from '../../pom/sidebarModel';
import {TopBarModel} from '../../pom/topBarModel';
import {validateEnvironment} from '../../utils/urlHandler';
import {validateUsers} from '../../utils/userHandler';
import { CommonModel } from '../../pom/commonModel';
import { rolesData } from '../../data/usersData';
import { storeOwnerRoleValidation } from '../../utils/rolesHandler';
import { brandsData } from '../../data/brandsData';
import {v4 as uuidv4} from 'uuid';
import { StoreGroupsModel } from '../../pom/storeGroupsModel';
import { storeGroupsData, storeGroupsContentData, storeGroupMediaData } from '../../data/storeGroupsData';

const users = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.brandNodeContentName));
const url: string = validateEnvironment();


users.forEach(user =>{

  test(`Create Store Group at the level of a brand node '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const storeGroup = new StoreGroupsModel(page);

    if(user.role == rolesData.storeOwner){ 
      await loginModel.login(user.username, user.password);
      await commonModel.waitUntilSpinnerDisappears();
      await storeGroup.verifyStoreGroupsOptionMenuNotVisible();
    } else {
      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickStoreGroupsOptionMenu();

      const uniqueId = uuidv4();

      const storeGroupName = ("Store Group" + uniqueId).slice(0, 30);

      await storeGroup.addStoreGroupButton.click();
      await commonModel.inputTextInLocator(storeGroup.storeNameField, storeGroupName);
      await commonModel.inputTextInLocator(storeGroup.storeDescriptionField, storeGroupsData.storeGroupDefaultDescription);
      await commonModel.inputTextInLocator(storeGroup.storeNotesField, storeGroupsData.storeGroupDefaultNotes);
      await storeGroup.saveButton.click();
      await commonModel.waitUntilSpinnerDisappears();

      await storeGroup.verifyTheGroupIsCreated(storeGroupName);

      await storeGroup.verifyCreatedAlertMessage('Group Added successfully!');

      await storeGroup.deleteGroup(storeGroupName);

      await storeGroup.verifyStoreGroupIsNotDisplayed(storeGroupName);
    }
  });

  test.skip(`Create content in a store group at the brand level '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const storeGroup = new StoreGroupsModel(page);

    if(user.role == rolesData.storeOwner){ 
      await loginModel.login(user.username, user.password);
      await commonModel.waitUntilSpinnerDisappears();
      await storeGroup.verifyStoreGroupsOptionMenuNotVisible();
    } else {
      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickStoreGroupsOptionMenu();

      const uniqueId = uuidv4();

      const storeGroupName = ("Store Group" + uniqueId).slice(0, 30);

      await storeGroup.createStoreGroup(storeGroupName, storeGroupsData.storeGroupDefaultDescription, storeGroupsData.storeGroupDefaultNotes);

      let index = await storeGroup.getHeaderStoreGroupIndex(storeGroupName);
      
      await storeGroup.createContentOnStoreGroup(index!, storeGroupsContentData.contentDefaultTitle, storeGroupsContentData.contentDefaultDescription, storeGroupsContentData.contentDefaultStockImage);

      await storeGroup.verifyTheGroupIsCreated(storeGroupName);

      await storeGroup.verifyCreatedAlertMessage('Group Added successfully!');

      await storeGroup.deleteGroup(storeGroupName);

      await storeGroup.verifyStoreGroupIsNotDisplayed(storeGroupName);

    }
  });

  test(`Add jpg image on StoreGroups in brand level '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const storeGroup = new StoreGroupsModel(page);

    if(user.role == rolesData.storeOwner){ 
      await loginModel.login(user.username, user.password);
      await commonModel.waitUntilSpinnerDisappears();
      await storeGroup.verifyStoreGroupsOptionMenuNotVisible();
    } else {
      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickStoreGroupsOptionMenu();

      const uniqueId = uuidv4();

      const storeGroupName = ("Store Group" + uniqueId).slice(0, 30);

      await storeGroup.createStoreGroup(storeGroupName, storeGroupsData.storeGroupDefaultDescription, storeGroupsData.storeGroupDefaultNotes);
      await commonModel.waitUntilSnackBarDisappears();

      await storeGroup.testMediaUpload(storeGroupName, storeGroupMediaData.testMediaJpg);

      await storeGroup.sidebarCloseButton.click();
      await storeGroup.deleteGroup(storeGroupName);

      await storeGroup.verifyStoreGroupIsNotDisplayed(storeGroupName);
    }
  });


  test(`Add png image on StoreGroups in brand level '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const storeGroup = new StoreGroupsModel(page);

    if(user.role == rolesData.storeOwner){ 
      await loginModel.login(user.username, user.password);
      await commonModel.waitUntilSpinnerDisappears();
      await storeGroup.verifyStoreGroupsOptionMenuNotVisible();
    } else {
      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickStoreGroupsOptionMenu();

      const uniqueId = uuidv4();

      const storeGroupName = ("Store Group" + uniqueId).slice(0, 30);

      await storeGroup.createStoreGroup(storeGroupName, storeGroupsData.storeGroupDefaultDescription, storeGroupsData.storeGroupDefaultNotes);
      await commonModel.waitUntilSnackBarDisappears();

      await storeGroup.testMediaUpload(storeGroupName, storeGroupMediaData.testMediaPng);

      await storeGroup.sidebarCloseButton.click();
      await storeGroup.deleteGroup(storeGroupName);

      await storeGroup.verifyStoreGroupIsNotDisplayed(storeGroupName);
    }
  });


  test(`Add gif image on StoreGroups in brand level '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const storeGroup = new StoreGroupsModel(page);

    if(user.role == rolesData.storeOwner){ 
      await loginModel.login(user.username, user.password);
      await commonModel.waitUntilSpinnerDisappears();
      await storeGroup.verifyStoreGroupsOptionMenuNotVisible();
    } else {
      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickStoreGroupsOptionMenu();

      const uniqueId = uuidv4();

      const storeGroupName = ("Store Group" + uniqueId).slice(0, 30);

      await storeGroup.createStoreGroup(storeGroupName, storeGroupsData.storeGroupDefaultDescription, storeGroupsData.storeGroupDefaultNotes);
      await commonModel.waitUntilSnackBarDisappears();

      await storeGroup.testMediaUpload(storeGroupName, storeGroupMediaData.testMediaGif);

      await storeGroup.sidebarCloseButton.click();
      await storeGroup.deleteGroup(storeGroupName);

      await storeGroup.verifyStoreGroupIsNotDisplayed(storeGroupName);
    }
  });

  test(`Delete a store group at the brand level '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const storeGroup = new StoreGroupsModel(page);

    if(user.role == rolesData.storeOwner){ 
      await loginModel.login(user.username, user.password);
      await commonModel.waitUntilSpinnerDisappears();
      await storeGroup.verifyStoreGroupsOptionMenuNotVisible();
    } else {
      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickStoreGroupsOptionMenu();

      const uniqueId = uuidv4();

      const storeGroupName = ("Store Group" + uniqueId).slice(0, 30);

      await storeGroup.createStoreGroup(storeGroupName, storeGroupsData.storeGroupDefaultDescription, storeGroupsData.storeGroupDefaultNotes);
      await commonModel.waitUntilSnackBarDisappears();

      await storeGroup.deleteGroup(storeGroupName);

      await storeGroup.verifyDeletedAlertMessage(storeGroupName);

      await storeGroup.verifyStoreGroupIsNotDisplayed(storeGroupName);
    }

  });

  test(`Map Stores under StoreGroups at Brand Node Level '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const storeGroup = new StoreGroupsModel(page);

    if(user.role == rolesData.storeOwner){ 
      await loginModel.login(user.username, user.password);
      await commonModel.waitUntilSpinnerDisappears();
      await storeGroup.verifyStoreGroupsOptionMenuNotVisible();
    } else {
      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickStoreGroupsOptionMenu();

      const uniqueId = uuidv4();

      const storeGroupName = ("Store Group" + uniqueId).slice(0, 30);

      await storeGroup.createStoreGroup(storeGroupName, storeGroupsData.storeGroupDefaultDescription, storeGroupsData.storeGroupDefaultNotes);
      await commonModel.waitUntilSnackBarDisappears();

      await storeGroup.mapAllStores(storeGroupName);

      await page.goBack()
      await storeGroup.deleteGroup(storeGroupName);

      await storeGroup.verifyStoreGroupIsNotDisplayed(storeGroupName);
    }
  });


  test(`Verify that a validation is shown when creating a store group with the same name brand level '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const storeGroup = new StoreGroupsModel(page);

    if(user.role == rolesData.storeOwner){ 
      await loginModel.login(user.username, user.password);
      await commonModel.waitUntilSpinnerDisappears();
      await storeGroup.verifyStoreGroupsOptionMenuNotVisible();
    } else {
      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickStoreGroupsOptionMenu();

      const uniqueId = uuidv4();

      const storeGroupName = ("Store Group" + uniqueId).slice(0, 30);

      await storeGroup.createStoreGroup(storeGroupName, storeGroupsData.storeGroupDefaultDescription, storeGroupsData.storeGroupDefaultNotes);
      await commonModel.waitUntilSnackBarDisappears();

      await storeGroup.addStoreGroupButton.click();
      await commonModel.inputTextInLocator(storeGroup.storeNameField, storeGroupName);
      await commonModel.inputTextInLocator(storeGroup.storeDescriptionField, storeGroupsData.storeGroupDefaultDescription);
      await commonModel.inputTextInLocator(storeGroup.storeNotesField, storeGroupsData.storeGroupDefaultNotes);
      await storeGroup.saveButton.click();
      
      await expect(storeGroup.appErrorMessages).toBeVisible();
      let errorMessage = await storeGroup.appErrorMessages.textContent();
      expect(errorMessage).toEqual('The name is already in use');

      await storeGroup.cancelButton.click();

      await storeGroup.validateOnlyOneGroupIsInTable(storeGroupName);

      await storeGroup.deleteGroup(storeGroupName);

      await storeGroup.verifyStoreGroupIsNotDisplayed(storeGroupName);
    }
  });

  test(`Verify that empty fields cannot be saved when creating a store group at Brand level '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const storeGroup = new StoreGroupsModel(page);

    if(user.role == rolesData.storeOwner){ 
      await loginModel.login(user.username, user.password);
      await commonModel.waitUntilSpinnerDisappears();
      await storeGroup.verifyStoreGroupsOptionMenuNotVisible();
    } else {
      await loginModel.login(user.username, user.password);
      if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeContentName); }
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickStoreGroupsOptionMenu();

      await storeGroup.addStoreGroupButton.click();

      await storeGroup.saveButton.click();

      await expect(storeGroup.appErrorMessages).toBeVisible();
      let errorMessage = await storeGroup.appErrorMessages.textContent();
      expect(errorMessage).toContain('Name is required');
      expect(errorMessage).toContain('Description is required');
    }
  });

});

