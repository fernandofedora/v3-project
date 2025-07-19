import { test, expect } from '@playwright/test';
import { LoginModel } from '../../pom/loginModel';
import {SidebarModel} from '../../pom/sidebarModel';
import { CommonModel } from '../../pom/commonModel';
import { BrandsModel } from '../../pom/brandsModel';
import {validateEnvironment} from '../../utils/urlHandler';
import {validateUsers} from '../../utils/userHandler';
import { storeOwnerRoleValidation } from '../../utils/rolesHandler';
import { brandsData, subBrandData } from '../../data/brandsData';
import { NodesTypesEnum } from '../../enums/nodeTypes.enum';
import {v4 as uuidv4} from 'uuid';
import { TopBarModel } from '../../pom/topBarModel';
import { rolesData } from '../../data/usersData';
import { ContentModel } from '../../pom/contentModel';

const users = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.brandNodeContentName));
const url: string = validateEnvironment();

test.beforeEach(async ({ page }) => {
  test.setTimeout(120000);
});


users.forEach(user =>{
  test(`Verify the when the user clicks the loyalty deals toggle the respective fields should be displayed in the edit brand modal '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 1600});

    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const brandsModel = new BrandsModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);
    if (user.role == rolesData.admin || user.role == rolesData.storeOwner) {
      if (user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
      await sideBarModel.BrandOptionMenuIsNotVisible();
    } else {

      await topBarModel.selectBrand(brandsData.onlyContent);
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickBrandOptionMenu();
      await commonModel.waitUntilSpinnerDisappears();
      await page.waitForURL('**/admin/retail-brands');
  
      await brandsModel.brandTableVisible();
      await commonModel.setSearchValue(brandsData.onlyContent);
      await brandsModel.brandTableShouldHasOneRow();
  
      await brandsModel.goToManageNodes(brandsData.onlyContent);
      await brandsModel.hasBrandHierarchyTableValues(2);
      await brandsModel.openEditNodePopUp(brandsData.onlyContent);
      await brandsModel.cancelButton.waitFor( {state: 'visible'} );
      await commonModel.waitUntilSpinnerDisappears();
  
      //Click the loyalty deals toogle
      await commonModel.verifyThatLocatorIsVisible(brandsModel.brandLoyaltyDeals);
      await brandsModel.onClickBrandLoyaltyDealsToogle(true);
  
      //await page.locator('div').filter({ hasText: /^Loyalty Deal Label$/ }).nth(2).isVisible();
      //await page.locator('div').filter({ hasText: /^Loyalty Deal Logo$/ }).isVisible();
      //await page.getByPlaceholder('Loyalty', { exact: true }).isVisible();
      await contentModel.loyaltyDealLabel.isVisible();
      await contentModel.loyaltyDealLogo.isVisible();
      await contentModel.loyaltyColor.isVisible();
      
    }

  });

  test(`Verify the when the user clicks the loyalty deals toggle the respective fields should be displayed in the create sub brand modal '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 1600});

    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const brandsModel = new BrandsModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);
    if (user.role == rolesData.admin || user.role == rolesData.storeOwner) {
      if (user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
      await sideBarModel.BrandOptionMenuIsNotVisible();
    } else {

      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickBrandOptionMenu();
      await commonModel.waitUntilSpinnerDisappears();
      await page.waitForURL('**/admin/retail-brands');

      await brandsModel.brandTableVisible();
      await commonModel.setSearchValue(brandsData.onlyContent);

      await brandsModel.brandTableShouldHasOneRow();
      await brandsModel.goToManageNodes(brandsData.onlyContent);
      await page.getByTitle('Add Child to this node').first().click();
      await commonModel.waitUntilSpinnerDisappears();

      //Click the loyalty deals toogle
      await commonModel.verifyThatLocatorIsVisible(brandsModel.nodeLoyaltyDealsToogle);
      await brandsModel.onClickNodeLoyaltyDealsToogle(true);

      //await page.locator('div').filter({ hasText: /^Loyalty Deal Label$/ }).nth(2).isEnabled();
      //await page.locator('div').filter({ hasText: /^Loyalty Deal Logo$/ }).isEnabled();
      //await page.getByPlaceholder('Loyalty', { exact: true }).isEnabled();

      await expect( async () => {
        await expect(brandsModel.loyaltyDealLabelField).toBeVisible( {timeout: 300} );
        await expect(brandsModel.loyaltyDealLogoField).toBeVisible( {timeout: 300} );
        await expect(brandsModel.loyaltyColorField).toBeVisible( {timeout: 300} );
      }).toPass();
    }

  });

  test(`Verify the when the user clicks the loyalty deals toggle the respective fields should be displayed in the edit sub brand modal '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 1600});

    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const common = new CommonModel(page);
    const brandModel = new BrandsModel(page);

    await loginModel.login(user.username, user.password);
    if (user.role == rolesData.admin || user.role == rolesData.storeOwner) {
      if (user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
      await sideBarModel.BrandOptionMenuIsNotVisible();
    } else {

      await common.waitUntilSpinnerDisappears();
      await sideBarModel.onClickBrandOptionMenu();
      await common.waitUntilSpinnerDisappears();
      await page.waitForURL('**/admin/retail-brands');

      await brandModel.brandTableVisible();
      await common.setSearchValue(brandsData.onlyContent);

      await brandModel.goToManageNodes(brandsData.onlyContent);
      await brandModel.hasBrandHierarchyTableValues(2);
      await brandModel.openEditNodePopUp(brandsData.subBrandContent);
      await brandModel.cancelButton.waitFor( {state:'visible'} );
      await common.waitUntilSpinnerDisappears();

      await page.getByLabel('Loyalty Deals').click();
      await page.waitForTimeout(500);

      //await page.locator('div').filter({ hasText: /^Loyalty Deal Label$/ }).nth(2).isEnabled();
      //await page.locator('div').filter({ hasText: /^Loyalty Deal Logo$/ }).isEnabled();
      //await page.getByPlaceholder('Loyalty', { exact: true }).isEnabled();

      await brandModel.loyaltyDealLabelField.isEnabled();
      await brandModel.loyaltyDealLogoField.isEnabled();
      await brandModel.loyaltyColorField.isEnabled();
    }

  });  

  test(`Verify that when the user tries to save the changes when editing a sub brand node and the loyalty fields are empty the errors message should be displayed '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 1600});

    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const common = new CommonModel(page);
    const brandModel = new BrandsModel(page);

    await loginModel.login(user.username, user.password);
    if (user.role == rolesData.admin || user.role == rolesData.storeOwner) {
      if (user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
      await sideBarModel.BrandOptionMenuIsNotVisible();
    } else {

      await common.waitUntilSpinnerDisappears();
      await sideBarModel.onClickBrandOptionMenu();
      await common.waitUntilSpinnerDisappears();
      await page.waitForURL('**/admin/retail-brands');

      await brandModel.brandTableVisible();
      await common.setSearchValue(brandsData.onlyContent);

      await brandModel.goToManageNodes(brandsData.onlyContent);
      await brandModel.hasBrandHierarchyTableValues(2);
      await brandModel.openEditNodePopUp(brandsData.subBrandContent);
      await brandModel.cancelButton.waitFor();
      await common.waitUntilSpinnerDisappears();

      //await page.getByLabel('Loyalty Deals').click();
      await brandModel.brandLoyaltyDeals.click();
      await page.waitForTimeout(500);

      //await page.getByRole('button', { name: 'Save' }).click();
      await brandModel.saveBtn.click();
      await page.waitForTimeout(300);

      //await page.getByText('Loyalty Deal Label is required').isEnabled();
      await brandModel.errorMessageLoyaltyDealLabelIsRequired.isEnabled();
      //await page.getByText('Loyalty Deal Color is required').isEnabled();
      await brandModel.errorMessageLoyaltyDealColorIsRequired.isEnabled();
    }

  });

  test(`Verify that when the user inputs an invalid hex value and clicks the save button the Loyalty Deal Color is not the correct format message is displayed in the edit brand modal '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 1600});

    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const brandModel = new BrandsModel(page);
    const brandsModel = new BrandsModel(page);

    await loginModel.login(user.username, user.password);
    if (user.role == rolesData.admin || user.role == rolesData.storeOwner) {
      if (user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
      await sideBarModel.BrandOptionMenuIsNotVisible();
    } else {

      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickBrandOptionMenu();
      await commonModel.waitUntilSpinnerDisappears();
      await page.waitForURL('**/admin/retail-brands');

      await brandModel.brandTableVisible();
      await commonModel.setSearchValue(brandsData.onlyContent);
      await brandModel.brandTableShouldHasOneRow();

      await brandModel.goToManageNodes(brandsData.onlyContent);
      await brandModel.hasBrandHierarchyTableValues(2);
      await brandModel.openEditNodePopUp(brandsData.onlyContent);
      await brandModel.cancelButton.waitFor( {state:'visible'} );
      await commonModel.waitUntilSpinnerDisappears();

       //Click the loyalty deals toogle
       await page.waitForTimeout(1000);
       await commonModel.verifyThatLocatorIsVisible(brandsModel.brandLoyaltyDeals);
       await brandsModel.onClickBrandLoyaltyDealsToogle(true);

      await brandModel.loyaltyColorField.fill('55555555');

      await brandModel.saveBtn.click( {delay:400} );

      await expect( async () => {
        await expect(page.getByText('Loyalty Deal Color is not the correct format.')).toBeVisible( {timeout:300} )
      }).toPass();
      

    }

  });

  test(`Verify that the changes are saved when the user saves the changes when editing a brand node and the loyalty fields are populated '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 800});
  
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const common = new CommonModel(page);
    const brandsModel = new BrandsModel(page);
  
    await loginModel.login(user.username, user.password);

    if (user.role == rolesData.admin || user.role == rolesData.storeOwner) {
      if (user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
      await sideBarModel.BrandOptionMenuIsNotVisible();
    } else {

      await common.waitUntilSpinnerDisappears();
      await sideBarModel.onClickBrandOptionMenu();
      await common.waitUntilSpinnerDisappears();
      await page.waitForURL('**/admin/retail-brands');
    
      await brandsModel.brandTableVisible();
      await common.setSearchValue(brandsData.onlyContent);
      await brandsModel.brandTableShouldHasOneRow();
    
      await brandsModel.goToManageNodes(brandsData.onlyContent);
      await brandsModel.hasBrandHierarchyTableValues(2);
      await brandsModel.openEditNodePopUp(brandsData.onlyContent);
      await brandsModel.cancelButton.waitFor( {state:'visible'} );
      await common.waitUntilSpinnerDisappears();
    
      //Click the loyalty deals toogle
      await brandsModel.onClickBrandLoyaltyDealsToogle(true);
      
      await brandsModel.verifyThatLoyaltyDealLabelFieldIsVisible();
      await brandsModel.verifyThatLoyaltyDealLogoFieldIsVisible();
      await brandsModel.verifyThatLoyaltyColorFieldIsVisible();

      await brandsModel.loyaltyDealLabelField.click();
      await brandsModel.loyaltyDealLabelField.fill('label');
      await brandsModel.loyaltyDealLogoField.click();
      await brandsModel.loyaltyDealLogoField.fill('logo');
      await page.getByPlaceholder('Loyalty', { exact: true }).fill('#b00b69');
    
      await page.getByRole('button', { name: 'Save' }).click( {delay:500} );
    
      await common.waitUntilSpinnerDisappears();
    
      await brandsModel.openEditNodePopUp(brandsData.onlyContent);
      await brandsModel.cancelButton.waitFor();
      await common.waitUntilSpinnerDisappears();
    
      await brandsModel.onClickBrandLoyaltyDealsToogle(false);
      await brandsModel.saveBtn.click( {delay:500} );
      await common.waitUntilSpinnerDisappears();
      await brandsModel.cancelButton.waitFor( {state:'hidden'} );
      await common.waitUntilSpinnerDisappears();
    }

  });

  test(`Verify that the changes are saved when the user saves the changes when creating a sub brand node and the loyalty fields are populated '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 800});
  
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const brandsModel = new BrandsModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);

    if (user.role == rolesData.admin || user.role == rolesData.storeOwner) {
      if (user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
      await sideBarModel.BrandOptionMenuIsNotVisible();
    } else {

      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickBrandOptionMenu();
      await commonModel.waitUntilSpinnerDisappears();
      await page.waitForURL('**/admin/retail-brands');
    
      await brandsModel.brandTableVisible();
      await commonModel.setSearchValue(brandsData.onlyContent);
      await brandsModel.brandTableShouldHasOneRow();
    
      await brandsModel.goToManageNodes(brandsData.onlyContent);
      await page.getByTitle('Add Child to this node').first().click();
      await commonModel.waitUntilSpinnerDisappears();
      
      const name = ("testt" + uuidv4()).slice(0, 32); //add a function to try to create a unique subdomain

      await brandsModel.brandNameInput.click();
      await brandsModel.brandNameInput.fill(name);

      const sub = ("testt" + uuidv4()).slice(0, 32); //add a function to try to create a unique subdomain
      await brandsModel.brandSubdomainInput.click();
      await brandsModel.brandSubdomainInput.fill(sub);

      //Click the loyalty deals toogle
      await page.waitForTimeout(1000);
      await commonModel.verifyThatLocatorIsVisible(brandsModel.nodeLoyaltyDealsToogle);
      await brandsModel.onClickNodeLoyaltyDealsToogle(true);
    
      await contentModel.loyaltyDealLabel.click();
      await contentModel.loyaltyDealLabel.pressSequentially('label'); // It is no longer recommended to use the "type" function for new playwright updates
      await contentModel.loyaltyDealLogo.click();
      await contentModel.loyaltyDealLogo.pressSequentially("logo")
      await contentModel.loyaltyColor.pressSequentially("#b00b69");

      await brandsModel.brandSaveBtn.click( {delay:500} );
      
    
      await commonModel.waitUntilSpinnerDisappears();

      await brandsModel.expandItemsInTable(0);
      await brandsModel.getNodeNameCoincidenceInTable(sub);
      await brandsModel.deleteNode(name);
      await commonModel.waitUntilSpinnerDisappears();
  
      await brandsModel.verifyNodeIsNotDisplayed(name);
      await commonModel.waitUntilSpinnerDisappears();
    }

  });

  test(`Verify that when the user tries to save the changes when editing a brand node and the loyalty fields are empty the errors message should be displayed '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const sideBarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);
      const brandsModel = new BrandsModel(page);
      const topBarModel = new TopBarModel(page);

      await page.goto(url);
      await page.setViewportSize({width: 1600, height: 800});

      await loginModel.login(user.username, user.password);

      if (user.role == rolesData.admin || user.role == rolesData.storeOwner) {
        if (user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
        await sideBarModel.BrandOptionMenuIsNotVisible();
      } else {

        await commonModel.waitUntilSpinnerDisappears();
        await sideBarModel.onClickBrandOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();
        await page.waitForURL('**/admin/retail-brands');

        await brandsModel.brandTableVisible();
        await commonModel.setSearchValue(brandsData.onlyContent);
        await brandsModel.brandTableShouldHasOneRow();
      
        await brandsModel.goToManageNodes(brandsData.onlyContent);
        await brandsModel.hasBrandHierarchyTableValues(2);
        await brandsModel.openEditNodePopUp(brandsData.onlyContent);
        await brandsModel.cancelButton.waitFor( {state:'visible'} );
        await commonModel.waitUntilSpinnerDisappears();

        //Click the loyalty deals toogle
        await commonModel.verifyThatLocatorIsVisible(brandsModel.brandLoyaltyDeals);
        await brandsModel.onClickBrandLoyaltyDealsToogle(false);
        await page.waitForTimeout(1000);
        await brandsModel.onClickBrandLoyaltyDealsToogle(true);

        await brandsModel.verifyThatLoyaltyDealLabelFieldIsVisible();
        await brandsModel.verifyThatLoyaltyDealLogoFieldIsVisible();
        await brandsModel.verifyThatLoyaltyColorFieldIsVisible();
        await brandsModel.loyaltyDealLabelField.clear();
        await brandsModel.loyaltyDealLogoField.clear();
        await brandsModel.loyaltyColorField.clear();

        //Click the save button
        await brandsModel.brandSaveBtn.click( {delay:1000} );

        //Verify errors message are displayed
        await brandsModel.verifyThatErrorMessageLoyaltyDealLabelIsRequiredIsVisible();
        await brandsModel.verifyThatErrorMessageLoyaltyDealColorIsRequiredIsVisible();
      }

  });

  test(`Verify that when the user tries to save the changes when creating a sub brand node and the loyalty fields are empty the errors message should be displayed '${user.role}'`, async ({ page }) => {
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);
    const brandsModel = new BrandsModel(page);
    const topBarModel = new TopBarModel(page);
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 800});

    await loginModel.login(user.username, user.password);

    if (user.role == rolesData.admin || user.role == rolesData.storeOwner) {
      if (user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
      await sideBarModel.BrandOptionMenuIsNotVisible();
    } else {
    
      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickBrandOptionMenu();
      await commonModel.waitUntilSpinnerDisappears();
      await page.waitForURL('**/admin/retail-brands');

      await brandsModel.brandTableVisible();
      await commonModel.setSearchValue(brandsData.onlyContent);
      await brandsModel.brandTableShouldHasOneRow();
      await brandsModel.goToManageNodes(brandsData.onlyContent);
      await brandsModel.hasBrandHierarchyTableValues(2);

      await page.getByTitle('Add Child to this node').first().click();
      await commonModel.checkCreateContentPopupVisible();
      await brandsModel.cancelButton.waitFor( {state:'visible'} );
      await commonModel.waitUntilSpinnerDisappears();
      
      const name = ("testt" + uuidv4()).slice(0, 32); //add a function to try to create a unique subdomain

      await brandsModel.brandNameInput.click();
      await brandsModel.brandNameInput.fill(name);

      const sub = ("testt" + uuidv4()).slice(0, 32); //add a function to try to create a unique subdomain
      await brandsModel.brandSubdomainInput.click();
      await brandsModel.brandSubdomainInput.fill(sub);
      
      //Click the loyalty deals toogle
      await page.waitForTimeout(1000);
      await commonModel.verifyThatLocatorIsVisible(brandsModel.nodeLoyaltyDealsToogle);
      await brandsModel.onClickNodeLoyaltyDealsToogle(true);
      
      await brandsModel.verifyThatLoyaltyDealLabelFieldIsVisible();
      await brandsModel.verifyThatLoyaltyDealLogoFieldIsVisible();
      await brandsModel.verifyThatLoyaltyColorFieldIsVisible();
      
      //Click the save button
      await brandsModel.brandSaveBtn.click();
      
      //Verify errors message are displayed
      await brandsModel.verifyThatErrorMessageLoyaltyDealLabelIsRequiredIsVisible();
      await brandsModel.verifyThatErrorMessageLoyaltyDealColorIsRequiredIsVisible();
    }
    
  });

  
  test(`Verify that the changes are saved when the user saves the changes when editing a sub brand node and the loyalty fields are populated '${user.role}'`, async ({ page }) => {
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);
    const brandsModel = new BrandsModel(page);
    const topBarModel = new TopBarModel(page);

    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 800});

    await loginModel.login(user.username, user.password);

    if (user.role == rolesData.admin || user.role == rolesData.storeOwner) {
      if (user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
      await sideBarModel.BrandOptionMenuIsNotVisible();
    } else {

      await commonModel.waitUntilSpinnerDisappears();
      await sideBarModel.onClickBrandOptionMenu();

      await commonModel.waitUntilSpinnerDisappears();
      await commonModel.setSearchValue(brandsData.brandNodeContentName);
      await brandsModel.hasBrandTableValues();
      await brandsModel.goToManageNodes(brandsData.brandNodeContentName);
      await brandsModel.hasNodeTableValues(1);
      await brandsModel.openEditNodePopUp(brandsData.subBrandContentName);
      await commonModel.checkContentPopupVisible();

      //Click the loyalty deals toogle
      await page.waitForTimeout(1000);
      await commonModel.verifyThatLocatorIsVisible(brandsModel.nodeLoyaltyDealsToogle);
      await brandsModel.onClickNodeLoyaltyDealsToogle(true);

      await brandsModel.verifyThatLoyaltyDealLabelFieldIsVisible();
      await brandsModel.verifyThatNodeLoyaltyColorFieldIsVisible();
      await brandsModel.verifyThatLoyaltyColorFieldIsVisible();

      // fill all the loyalty fields
      await brandsModel.loyaltyDealLabelField.fill("label");
      await brandsModel.nodeLoyaltyDealLogoField.pressSequentially("logo");
      await brandsModel.loyaltyColorField.fill("#696969");

      //Click the save button
      await brandsModel.brandSaveBtn.click({delay:2000});

      //OpenEdit node modal
      await brandsModel.waitBrandSaveButtonIsNotVisible();
      await brandsModel.openEditNodePopUp(brandsData.subBrandContentName);
      await commonModel.checkContentPopupVisible();

      let dealText = await brandsModel.loyaltyDealLabelField.inputValue();
      let logoText = await brandsModel.nodeLoyaltyDealLogoField.textContent();
      let colorText = await brandsModel.loyaltyColorField.inputValue();

      expect(dealText).toEqual("labellogo");
      expect(logoText).toEqual("Loyalty Deal Logo");
      expect(colorText).toEqual("#696969");

      //Click the loyalty deals toogle
      await page.waitForTimeout(1000);
      await commonModel.verifyThatLocatorIsVisible(brandsModel.nodeLoyaltyDealsToogle);
      await brandsModel.onClickNodeLoyaltyDealsToogle(false);

      //Click the save button
      await brandsModel.brandSaveBtn.click({delay:2000});
      await brandsModel.waitBrandSaveButtonIsNotVisible();
      await commonModel.waitUntilSpinnerDisappears();
    }
  });

});

