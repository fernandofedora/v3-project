import { test, expect } from '@playwright/test';
import { LoginModel } from '../../pom/loginModel';
import {SidebarModel} from '../../pom/sidebarModel';
import {TopBarModel} from '../../pom/topBarModel';
import { CommonModel } from '../../pom/commonModel';
import { BrandsModel } from '../../pom/brandsModel';
import { ContentModel } from '../../pom/contentModel';
import {validateEnvironment} from '../../utils/urlHandler';
import {validateUsers} from '../../utils/userHandler';
import { storeOwnerRoleValidation } from '../../utils/rolesHandler';
import { brandsData} from '../../data/brandsData';
import { rolesData } from '../../data/usersData';
import { dealTypes, amountOffType, contentData, contentBulkDataSA, contentBulkDataA, contentBulkDataSO } from '../../data/contentData';
import {v4 as uuidv4} from 'uuid';
import { RolesEnum as Roles } from '../../enums/roles.enum';


const users = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.onlyContent));
const url: string = validateEnvironment();

test.beforeEach(async ({ page }) => {
  test.setTimeout(120000);
});

users.forEach(user =>{

  test(`Create brand-level static agreement type content with required fields for a single language default language English CDL Active '${user.role}'`, async ({ page }) => {

    if (user.role == Roles.storeOwner) { return } 

    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);
    
    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
    await commonModel.waitUntilSpinnerDisappears();
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.static + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title);
    await contentModel.verifyTitleIsComplete(title);
    await commonModel.inputTextInLocator(contentModel.descriptionInput, "This is a description");
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.static);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.static, brandsData.onlyContent, user.role);

    await contentModel.deleteContentByName(title);
  });

  test(`Create fixed price deal type content at the brand level with required fields for a single language default languague english CDL Active '${user.role}'`, async ({ page }) => {

    if (user.role == Roles.storeOwner) { return } 

    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
    await commonModel.waitUntilSpinnerDisappears();
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.fixedPrice + uniqueId).slice(0, 40);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title);
    await contentModel.verifyTitleIsComplete(title);
    await commonModel.inputTextInLocator(contentModel.descriptionInput, "This is a description");
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.fixedPrice);
    await commonModel.inputTextInLocator(contentModel.priceField, '1');
    await commonModel.inputTextInLocator(contentModel.unitsField, 'pcs');
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.fixedPrice, brandsData.onlyContent, user.role);

    await contentModel.deleteContentByName(title);
  });

  test(`Create Buy X Get Y For Z deal type content at brand level with required fields for a single language default languague english CDL Active '${user.role}'`, async ({ page }) => {

    if (user.role == Roles.storeOwner) { return } 

    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
    await commonModel.waitUntilSpinnerDisappears();
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.bogo + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title);
    await contentModel.verifyTitleIsComplete(title);
    await commonModel.inputTextInLocator(contentModel.descriptionInput, "This is a description");
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.bogo);
    await commonModel.inputTextInLocator(contentModel.xField, "2");
    await commonModel.inputTextInLocator(contentModel.yField, "4");
    //await contentModel.zField.type('pcs',{delay: 100});
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.bogo, brandsData.onlyContent, user.role);

    await contentModel.deleteContentByName(title);
  });

  test(`Create # for Price deal type content at brand level with required fields for a single language default languague english CDL Active '${user.role}'`, async ({ page }) => {

    if (user.role == Roles.storeOwner) { return } 

    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
    await commonModel.waitUntilSpinnerDisappears();
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.numberForPrice + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title);
    await contentModel.verifyTitleIsComplete(title);
    await commonModel.inputTextInLocator(contentModel.descriptionInput, "This is a description");
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.numberForPrice);
    await commonModel.inputTextInLocator(contentModel.qtyField, "2");
    await commonModel.inputTextInLocator(contentModel.pField, "5.00");
    await commonModel.inputTextInLocator(contentModel.units2Field, "pcs");
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.numberForPrice, brandsData.onlyContent, user.role);

    await contentModel.deleteContentByName(title);
  });

  test(`Create Amount Off monetary deal type content at brand level with required fields for a single language default languague english CDL Active '${user.role}'`, async ({ page }) => {

    if (user.role == Roles.storeOwner) { return } 

    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
    await commonModel.waitUntilSpinnerDisappears();
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.amountOff + uniqueId).slice(0, 40);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title);
    await contentModel.verifyTitleIsComplete(title);
    await commonModel.inputTextInLocator(contentModel.descriptionInput, "This is a description");
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.amountOff);
    await commonModel.inputTextInLocator(contentModel.priceMonetaryField, "3.00");
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.amountOff, brandsData.onlyContent, user.role);

    await contentModel.deleteContentByName(title);
  });


  test(`Create Amount Off percent deal type content at brand level with required fields for a single language default languague english CDL Active '${user.role}'`, async ({ page }) => {

    if (user.role == Roles.storeOwner) { return } 

    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
    await commonModel.waitUntilSpinnerDisappears();
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.amountOff + uniqueId).slice(0, 40);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title);
    await contentModel.verifyTitleIsComplete(title);
    await commonModel.inputTextInLocator(contentModel.descriptionInput, "This is a description");
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.amountOff);
    await contentModel.amountOffDropdown.click();
    await contentModel.selectAmountOffType(amountOffType.percentage);
    await commonModel.inputTextInLocator(contentModel.priceMonetaryField, "3.00");
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.amountOff, brandsData.onlyContent, user.role);

    await contentModel.deleteContentByName(title);
  });


  test(`Create Vendor Coupon deal type content at brand level with required fields for a single language default languague english CDL Active '${user.role}'`, async ({ page }) => {

    if (user.role == Roles.storeOwner) { return } 

    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
    await commonModel.waitUntilSpinnerDisappears();
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.vendorCoupon + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.singleItemButton.waitFor();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title);
    await contentModel.verifyTitleIsComplete(title);
    await commonModel.inputTextInLocator(contentModel.descriptionInput, "This is a description");
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.vendorCoupon);
    await commonModel.inputTextInLocator(contentModel.upcField, contentData.upc);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.vendorCoupon, brandsData.onlyContent, user.role);

    await contentModel.deleteContentByName(title);
  });


  test(`Create Share Category deal type content at brand level with required fields for a single language default languague english CDL Active '${user.role}'`, async ({ page }) => {
    
    if (user.role == Roles.storeOwner) { return }

    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role== rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
    await commonModel.waitUntilSpinnerDisappears();
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.shareCategory + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.singleItemButton.waitFor();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title);
    await contentModel.verifyTitleIsComplete(title);
    await commonModel.inputTextInLocator(contentModel.descriptionInput, "This is a description");
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.shareCategory);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.shareCategory, brandsData.onlyContent, user.role);

    await contentModel.deleteContentByName(title);
  });


  test(`Create Recipe deal type content at brand level with required fields for a single language default languague english CDL Active '${user.role}'`, async ({ page }) => {
    
    if (user.role == Roles.storeOwner) { return } 
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
    await commonModel.waitUntilSpinnerDisappears();
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();
    await page.evaluate("document.body.style.scale='0.7'");
    await page.waitForTimeout(500);

    const uniqueId = uuidv4();

    const title = (dealTypes.recipe + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.singleItemButton.waitFor();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title);
    await contentModel.verifyTitleIsComplete(title);
    await commonModel.inputTextInLocator(contentModel.descriptionInput, "This is a description");
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.recipe);
    await contentModel.selectRecipe(0);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.recipe, brandsData.onlyContent, user.role);

    await contentModel.deleteContentByName(title);
  });

  test(`Verify you can create # / Price deal type content at brand level with required fields for a single language default languague english CDL Active '${user.role}'`, async ({ page }) => {
    
    if (user.role == Roles.storeOwner) { return } 
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);
    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent);
      await commonModel.waitUntilSpinnerDisappears();
     }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();
    const title = (dealTypes.numberSlashPrice + uniqueId).slice(0, 40);

    await contentModel.clickDealMenu();

    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    await contentModel.titleInput.click();
    await contentModel.titleInput.fill(title);

    await contentModel.dealDropdown.click();

    await contentModel.selectDealType(dealTypes.numberSlashPrice);
    await page.waitForTimeout(1000);
    await contentModel.qtyField.fill('2');
    await contentModel.pField.fill('5.00');
    await contentModel.units2Field.fill('pcs');
    await page.waitForTimeout(300);

    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);

    await contentModel.cardDetailLabel.click();

    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.numberSlashPrice, brandsData.onlyContent, user.role);

    await contentModel.deleteContentByName(title);
  });

  test(`Verify that you can create a content with Save Amount monetary deal type at brand level with required fields for a single language default language english CDL Active '${user.role}'`, async ({ page }) => {
    
    if (user.role == Roles.storeOwner) { return } 
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);

    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent);
      await commonModel.waitUntilSpinnerDisappears();
     }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();
    const title = (dealTypes.saveAmount + uniqueId).slice(0, 40);

    await contentModel.clickDealMenu();

    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    await contentModel.titleInput.click();
    await contentModel.titleInput.fill(title);

    await contentModel.dealDropdown.click();

    await contentModel.selectDealType(dealTypes.saveAmount);
    await page.waitForTimeout(1000);
    await contentModel.priceMonetaryField.fill('5.00');
    await page.waitForTimeout(300);

    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);

    await contentModel.cardDetailLabel.click();

    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);

    await contentModel.newContentIsCreated(title, dealTypes.saveAmount, brandsData.onlyContent, user.role);

    await contentModel.deleteContentByName(title);
  });

  test(`Verify that you can create a content with Save Amount percent deal type at brand level with required fields for a single language default language english CDL Active '${user.role}'`, async ({ page }) => {
    
    await page.goto(url);
    if (user.role == Roles.storeOwner) { return } 
    await page.setViewportSize({width: 1600, height: 800});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);

    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent);
      await commonModel.waitUntilSpinnerDisappears();
     }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();
    const title = (dealTypes.saveAmount + uniqueId).slice(0, 40);

    await contentModel.clickDealMenu();

    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    await contentModel.titleInput.click();
    await contentModel.titleInput.fill(title);

    await contentModel.dealDropdown.click();

    await contentModel.selectDealType(dealTypes.saveAmount);
    await page.waitForTimeout(1000);

    await contentModel.amountOffDropdownOptions.click();
    await contentModel.selectAmountOffType('Percent');

    await page.waitForTimeout(500);
    await contentModel.priceMonetaryField.fill('99');
    await page.waitForTimeout(300);

    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);

    await contentModel.cardDetailLabel.click();

    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);

    await contentModel.newContentIsCreated(title, dealTypes.saveAmount, brandsData.onlyContent, user.role);

    await contentModel.deleteContentByName(title);
  });

  test(`Verify that you can create a content with From X deal type at brand level with required fields for a single language default language english CDL Active '${user.role}'`, async ({ page }) => {
    
    await page.goto(url);
    if (user.role == Roles.storeOwner) { return } 
    await page.setViewportSize({width: 1600, height: 800});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);
    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent);
      await commonModel.waitUntilSpinnerDisappears();
     }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();
    const title = (dealTypes.fromX + uniqueId).slice(0, 40);

    await contentModel.clickDealMenu();

    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    await contentModel.titleInput.click();
    await contentModel.titleInput.fill(title);

    await contentModel.dealDropdown.click();

    await contentModel.selectDealType(dealTypes.fromX);

    await page.waitForTimeout(500);
    await contentModel.pField.fill('9.99');
    await page.waitForTimeout(300);

    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);

    await contentModel.cardDetailLabel.click();

    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);

    await contentModel.newContentIsCreated(title, dealTypes.fromX, brandsData.onlyContent, user.role);

    await contentModel.deleteContentByName(title);
  });

});

test(`Verify that the circular start dates match the nodes circulars start day of week and time of day at brand level`, async ({ page }) => {
  await page.goto(url);
  await page.setViewportSize({width: 1600, height: 1600});
  const loginModel = new LoginModel(page);
  const sideBarModel = new SidebarModel(page);
  const topBarModel = new TopBarModel(page);
  const contentModel = new ContentModel(page);
  const common = new CommonModel(page);
  const brandModel = new BrandsModel(page);

  await loginModel.login(users[0].username, users[0].password);
  if(users[0].role == rolesData.superAdmin || users[0].role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
  await common.waitUntilSpinnerDisappears();
  await sideBarModel.onClickBrandOptionMenu();
  await common.waitUntilSpinnerDisappears();
  await page.waitForURL('**/admin/retail-brands');

  await brandModel.brandTableVisible();
  await common.setSearchValue(brandsData.onlyContent);
  await brandModel.brandTableShouldHasOneRow();

  await brandModel.goToManageNodes(brandsData.onlyContent);
  await brandModel.hasBrandHierarchyTableValues(2);
  await brandModel.openEditNodePopUp(brandsData.onlyContent);
  await brandModel.cancelButton.waitFor();
  await common.waitUntilSpinnerDisappears();

  await brandModel.storeCircularStartDayDropdown.first().waitFor();
  await brandModel.storeCircularStartDayDropdown.scrollIntoViewIfNeeded();
  const startDayValue = await brandModel.storeCircularStartDayDropdown.inputValue();
  const circularStartTime = await brandModel.storeCircularDayStartTimeInput.inputValue();
  const circularTimezone = await brandModel.circularTimezoneDropdown.locator('span > span').innerText();
  await brandModel.cancelButton.click();
  await brandModel.goToManageContentView(brandsData.onlyContent);

  await contentModel.checkTimesOnContentView(startDayValue, circularStartTime, circularTimezone);

});

  test(`Upload bulk content with a standard spreadsheet at brand level for a single language default languague english CDL Active 'Super Admin'`, async ({ page }) => {
    test.setTimeout(180000);
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const contentModel = new ContentModel(page);
    const common = new CommonModel(page);

    await loginModel.login(users[0].username, users[0].password);
    if(users[0].role == rolesData.superAdmin || users[0].role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
    await common.waitUntilSpinnerDisappears();
    if(users[0].role == rolesData.superAdmin || users[0].role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await common.waitUntilSpinnerDisappears();

    await contentModel.verifyDeleteButtonIsDisplayed();

    await contentModel.onClickBulkItemBtn();

    await contentModel.bulkSelectUpload(['src/images/A97.jpg'], contentModel.chooseButton);
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.uploadMedia);
    await contentModel.nextButton.click();
    await contentModel.checkBulkCurrentStep(contentData.selectDateRange);
    await contentModel.nextButton.click();
    if(users[0].role == rolesData.superAdmin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestSA.xlsx'], contentModel.chooseButton);
    }
    if(users[0].role == rolesData.admin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestA.xlsx'], contentModel.chooseButton);
    }
    if(users[0].role == rolesData.storeOwner){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestSO.xlsx'], contentModel.chooseButton);
    }
    await contentModel.checkBulkCurrentStep(contentData.contentUpload);
    await common.waitUntilSpinnerDisappears();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.categoryManagement);
    await contentModel.clickIgnoreButtonIfPresent();
    await contentModel.categoryMessages.hover();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.review);
    await common.waitUntilSpinnerDisappears();
    await contentModel.doneButton.click({delay:2000});
    await common.waitUntilSpinnerDisappears();
    await contentModel.waitContentSkeletonNotVisible();
    await contentModel.verifyCategoryIsDisplayed("Fruits");
    if(users[0].role == rolesData.superAdmin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSA.simple, brandsData.onlyContent);
      await contentModel.deleteAllContent(contentBulkDataSA.simple, brandsData.onlyContent);
    }
    if(users[0].role == rolesData.admin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataA.simple, brandsData.onlyContent);
      await contentModel.deleteAllContent(contentBulkDataA.simple, brandsData.onlyContent);
    }
    if(users[0].role == rolesData.storeOwner){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSO.simple, brandsData.storeContent);
      await contentModel.deleteAllContent(contentBulkDataSO.simple, brandsData.storeContent);
    }
  });

  test(`Upload bulk content with a standard spreadsheet at brand level for a single language default languague english CDL Active 'Admin'`, async ({ page }) => {
    test.setTimeout(180000);
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const contentModel = new ContentModel(page);
    const common = new CommonModel(page);

    await loginModel.login(users[1].username, users[1].password);
    if(users[1].role == rolesData.superAdmin || users[1].role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent2); }
    await common.waitUntilSpinnerDisappears();
    if(users[1].role == rolesData.superAdmin || users[1].role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await common.waitUntilSpinnerDisappears();

    await contentModel.verifyDeleteButtonIsDisplayed();

    await contentModel.onClickBulkItemBtn();

    await contentModel.bulkSelectUpload(['src/images/A97.jpg'], contentModel.chooseButton);
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.uploadMedia);
    await contentModel.nextButton.click();
    await contentModel.checkBulkCurrentStep(contentData.selectDateRange);
    await contentModel.nextButton.click();
    if(users[1].role == rolesData.superAdmin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestSA.xlsx'], contentModel.chooseButton);
    }
    if(users[1].role == rolesData.admin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestA.xlsx'], contentModel.chooseButton);
    }
    if(users[1].role == rolesData.storeOwner){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestSO.xlsx'], contentModel.chooseButton);
    }
    await contentModel.checkBulkCurrentStep(contentData.contentUpload);
    await common.waitUntilSpinnerDisappears();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.categoryManagement);
    await contentModel.clickIgnoreButtonIfPresent();
    await contentModel.categoryMessages.hover();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.review);
    await common.waitUntilSpinnerDisappears();
    await contentModel.doneButton.click({delay:2000});
    await common.waitUntilSpinnerDisappears();
    await contentModel.waitContentSkeletonNotVisible();
    await contentModel.verifyCategoryIsDisplayed("Fruits");
    if(users[1].role == rolesData.superAdmin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSA.simple, brandsData.onlyContent2);
      await contentModel.deleteAllContent(contentBulkDataSA.simple, brandsData.onlyContent2);
    }
    if(users[1].role == rolesData.admin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataA.simple, brandsData.onlyContent2);
      await contentModel.deleteAllContent(contentBulkDataA.simple, brandsData.onlyContent2);
    }
    if(users[1].role == rolesData.storeOwner){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSO.simple, brandsData.storeContent);
      await contentModel.deleteAllContent(contentBulkDataSO.simple, brandsData.storeContent);
    }
  });

  test(`Upload bulk content with a spreadsheet with optional fields at brand level for a single language default languague english CDL Active 'Super Admin'`, async ({ page }) => {
    test.setTimeout(180000);
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const contentModel = new ContentModel(page);
    const common = new CommonModel(page);

    await loginModel.login(users[0].username, users[0].password);
    if(users[0].role == rolesData.superAdmin || users[0].role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent3); }
    await common.waitUntilSpinnerDisappears();
    if(users[0].role == rolesData.superAdmin || users[0].role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await common.waitUntilSpinnerDisappears();

    await contentModel.verifyDeleteButtonIsDisplayed();

    await contentModel.onClickBulkItemBtn();

    await contentModel.bulkSelectUpload(['src/images/A97.jpg'], contentModel.chooseButton);
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.uploadMedia);
    await contentModel.nextButton.click();
    await contentModel.checkBulkCurrentStep(contentData.selectDateRange);
    await contentModel.nextButton.click();
    if(users[0].role == rolesData.superAdmin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestCompleteSA.xlsx'], contentModel.chooseButton);
    }
    if(users[0].role == rolesData.admin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestCompleteA.xlsx'], contentModel.chooseButton);
    }
    if(users[0].role == rolesData.storeOwner){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestCompleteSO.xlsx'], contentModel.chooseButton);
    }
    await contentModel.checkBulkCurrentStep(contentData.contentUpload);
    await common.waitUntilSpinnerDisappears();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.categoryManagement);
    await contentModel.clickIgnoreButtonIfPresent();
    await contentModel.categoryMessages.hover();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.review);
    await common.waitUntilSpinnerDisappears();
    await contentModel.doneButton.click({delay:2000});
    await common.waitUntilSpinnerDisappears();
    await contentModel.waitContentSkeletonNotVisible();
    await contentModel.verifyCategoryIsDisplayed("Fruits");
    if(users[0].role == rolesData.superAdmin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSA.full, brandsData.onlyContent3);
      await contentModel.deleteAllContent(contentBulkDataSA.full, brandsData.onlyContent3);
    }
    if(users[0].role == rolesData.admin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataA.full, brandsData.onlyContent3);
      await contentModel.deleteAllContent(contentBulkDataA.full, brandsData.onlyContent3);
    }
    if(users[0].role == rolesData.storeOwner){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSO.full, brandsData.storeContent);
      await contentModel.deleteAllContent(contentBulkDataSO.full, brandsData.storeContent);
    }
  });

  test(`Upload bulk content with a spreadsheet with optional fields at brand level for a single language default languague english CDL Active 'Admin'`, async ({ page }) => {
    test.setTimeout(180000);
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const contentModel = new ContentModel(page);
    const common = new CommonModel(page);

    await loginModel.login(users[1].username, users[1].password);
    if(users[1].role == rolesData.superAdmin || users[1].role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent4); }
    await common.waitUntilSpinnerDisappears();
    if(users[1].role == rolesData.superAdmin || users[1].role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await common.waitUntilSpinnerDisappears();

    await contentModel.verifyDeleteButtonIsDisplayed();

    await contentModel.onClickBulkItemBtn();

    await contentModel.bulkSelectUpload(['src/images/A97.jpg'], contentModel.chooseButton);
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.uploadMedia);
    await contentModel.nextButton.click();
    await contentModel.checkBulkCurrentStep(contentData.selectDateRange);
    await contentModel.nextButton.click();
    if(users[1].role == rolesData.superAdmin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestCompleteSA.xlsx'], contentModel.chooseButton);
    }
    if(users[1].role == rolesData.admin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestCompleteA.xlsx'], contentModel.chooseButton);
    }
    if(users[1].role == rolesData.storeOwner){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestCompleteSO.xlsx'], contentModel.chooseButton);
    }
    await contentModel.checkBulkCurrentStep(contentData.contentUpload);
    await common.waitUntilSpinnerDisappears();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.categoryManagement);
    await contentModel.clickIgnoreButtonIfPresent();
    await contentModel.categoryMessages.hover();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.review);
    await common.waitUntilSpinnerDisappears();
    await contentModel.doneButton.click({delay:2000});
    await common.waitUntilSpinnerDisappears();
    await contentModel.waitContentSkeletonNotVisible();
    await contentModel.verifyCategoryIsDisplayed("Fruits");
    if(users[1].role == rolesData.superAdmin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSA.full, brandsData.onlyContent);
      await contentModel.deleteAllContent(contentBulkDataSA.full, brandsData.onlyContent);
    }
    if(users[1].role == rolesData.admin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataA.full, brandsData.onlyContent);
      await contentModel.deleteAllContent(contentBulkDataA.full, brandsData.onlyContent);
    }
    if(users[1].role == rolesData.storeOwner){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSO.full, brandsData.storeContent);
      await contentModel.deleteAllContent(contentBulkDataSO.full, brandsData.storeContent);
    }
  });

users.forEach(user => {

  test(`Create subbrand-level static agreement type content with required fields for a single language default language English CDL Active '${user.role}'`, async ({ page }) => {

    if (user.role == Roles.storeOwner) { return } 
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const contentModel = new ContentModel(page);
    const commonModel = new CommonModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
     }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.static + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title);
    await contentModel.verifyTitleIsComplete(title);
    await commonModel.inputTextInLocator(contentModel.descriptionInput, "This is a description");
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.static);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.static, brandsData.subBrandContent, user.role);

    await contentModel.deleteContentByName(title);
  });


  test(`Create fixed price deal type content at the subbrand level with required fields for a single language default languague english CDL Active '${user.role}'`, async ({ page }) => {
    
    if (user.role == Roles.storeOwner) { return } 
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
     }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.fixedPrice + uniqueId).slice(0, 40);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title);
    await contentModel.verifyTitleIsComplete(title);
    await commonModel.inputTextInLocator(contentModel.descriptionInput, "This is a description");
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.fixedPrice);
    await commonModel.inputTextInLocator(contentModel.priceField, "1");
    await commonModel.inputTextInLocator(contentModel.unitsField, "pcs");
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.fixedPrice, brandsData.subBrandContent, user.role);

    await contentModel.deleteContentByName(title);
  });


  test(`Create Buy X Get Y For Z deal type content at subbrand level with required fields for a single language default languague english CDL Active '${user.role}'`, async ({ page }) => {
    
    if (user.role == Roles.storeOwner) { return } 
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
     }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.bogo + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title);
    await contentModel.verifyTitleIsComplete(title);
    await commonModel.inputTextInLocator(contentModel.descriptionInput, "This is a description");
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.bogo);
    await commonModel.inputTextInLocator(contentModel.xField, "2");
    await commonModel.inputTextInLocator(contentModel.yField, "4");
    //await contentModel.zField.type('pcs',{delay: 100});
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.bogo, brandsData.subBrandContent, user.role);

    await contentModel.deleteContentByName(title);
  });


  test(`Create # for Price deal type content at subbrand level with required fields for a single language default languague english CDL Active '${user.role}'`, async ({ page }) => {
    
    if (user.role == Roles.storeOwner) { return } 
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
     }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.numberForPrice + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title);
    await contentModel.verifyTitleIsComplete(title);
    await commonModel.inputTextInLocator(contentModel.descriptionInput, "This is a description");
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.numberForPrice);
    await commonModel.inputTextInLocator(contentModel.qtyField, "2");
    await commonModel.inputTextInLocator(contentModel.pField, "5.00");
    await commonModel.inputTextInLocator(contentModel.units2Field, "pcs");
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.numberForPrice, brandsData.subBrandContent, user.role);

    await contentModel.deleteContentByName(title);
  });


  test(`Create Amount Off monetary deal type content at subbrand level with required fields for a single language default languague english CDL Active '${user.role}'`, async ({ page }) => {
    
    if (user.role == Roles.storeOwner) { return } 
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      if(user.role == rolesData.admin){
        await topBarModel.selectBrand(brandsData.onlyContent);
        await commonModel.waitUntilSpinnerDisappears();
        await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, brandsData.subBrand);
        await commonModel.waitUntilSpinnerDisappears(); 
      }else{
        await topBarModel.selectBrand(brandsData.onlyContent);
        await commonModel.waitUntilSpinnerDisappears();
        await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, brandsData.subBrand);
        await commonModel.waitUntilSpinnerDisappears();
      }

     }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.amountOff + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title);
    await contentModel.verifyTitleIsComplete(title);
    await commonModel.inputTextInLocator(contentModel.descriptionInput, "This is a description");
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.amountOff);
    await commonModel.inputTextInLocator(contentModel.priceMonetaryField, "3.00");
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.amountOff, brandsData.subBrandContent, user.role);

    await contentModel.deleteContentByName(title);
  });


  test(`Create Amount Off percent deal type content at subbrand level with required fields for a single language default languague english CDL Active '${user.role}'`, async ({ page }) => {
    
    if (user.role == Roles.storeOwner) { return } 
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
     }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();
    await page.evaluate("document.body.style.scale='0.7'");

    const uniqueId = uuidv4();

    const title = (dealTypes.amountOff + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title);
    await contentModel.verifyTitleIsComplete(title);
    await commonModel.inputTextInLocator(contentModel.descriptionInput, "This is a description");
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.amountOff);
    await contentModel.amountOffDropdown.click();
    await contentModel.selectAmountOffType(amountOffType.percentage);
    await commonModel.inputTextInLocator(contentModel.priceMonetaryField, "3.00");
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.amountOff, brandsData.subBrandContent, user.role);

    await contentModel.deleteContentByName(title);
  });


  test(`Create Vendor Coupon deal type content at subbrand level with required fields for a single language default languague english CDL Active '${user.role}'`, async ({ page }) => {
    
    if (user.role == Roles.storeOwner) { return } 
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
     }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.vendorCoupon + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title);
    await contentModel.verifyTitleIsComplete(title);
    await commonModel.inputTextInLocator(contentModel.descriptionInput, "This is a description");
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.vendorCoupon);
    await contentModel.categoryDropdown.click();
    await commonModel.inputTextInLocator(contentModel.upcField, contentData.upc);
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.vendorCoupon, brandsData.subBrandContent, user.role);

    await contentModel.deleteContentByName(title);
  });


  test(`Create Share Category deal type content at subbrand level with required fields for a single language default languague english CDL Active '${user.role}'`, async ({ page }) => {
    
    if (user.role == Roles.storeOwner) { return } 
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
     }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.shareCategory + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title);
    await contentModel.verifyTitleIsComplete(title);
    await commonModel.inputTextInLocator(contentModel.descriptionInput, "This is a description");
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.shareCategory);
    await contentModel.categoryDropdown .click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.shareCategory, brandsData.subBrandContent, user.role);

    await contentModel.deleteContentByName(title);
  });


  test(`Create Recipe deal type content at subbrand level with required fields for a single language default languague english CDL Active '${user.role}'`, async ({ page }) => {
    
    if (user.role == Roles.storeOwner) { return } 
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
     }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();
    await page.evaluate("document.body.style.scale='0.7'");
    await page.waitForTimeout(500);

    const uniqueId = uuidv4();

    const title = (dealTypes.recipe + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.singleItemButton.waitFor();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title);
    await contentModel.verifyTitleIsComplete(title);
    await commonModel.inputTextInLocator(contentModel.descriptionInput, "This is a description");
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.recipe);
    await contentModel.selectRecipe(0);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.recipe, brandsData.subBrandContent, user.role);

    await contentModel.deleteContentByName(title);
  });

  test(`Verify you can create # / Price deal type content at subbrand level with required fields for a single language default languague english CDL Active '${user.role}'`, async ({ page }) => {
    
    if (user.role == Roles.storeOwner) { return } 
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);

    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
     }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();
    const title = (dealTypes.numberSlashPrice + uniqueId).slice(0, 40);

    await contentModel.clickDealMenu();

    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    await contentModel.titleInput.click();
    await contentModel.titleInput.fill(title);

    await contentModel.dealDropdown.click();

    await contentModel.selectDealType(dealTypes.numberSlashPrice);
    await page.waitForTimeout(1000);
    await contentModel.qtyField.fill('2');
    await contentModel.pField.fill('5.00');
    await contentModel.units2Field.fill('pcs');
    await page.waitForTimeout(300);

    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);

    await contentModel.cardDetailLabel.click();

    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);

    await contentModel.newContentIsCreated(title, dealTypes.numberSlashPrice, brandsData.subBrandContent, user.role);

    await contentModel.deleteContentByName(title);
  });

  test(`Verify that you can create a content with Save Amount monetary deal type at subbrand level with required fields for a single language default language english CDL Active '${user.role}'`, async ({ page }) => {
    
    if (user.role == Roles.storeOwner) { return } 
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);

    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
     }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();
    const title = (dealTypes.saveAmount + uniqueId).slice(0, 40);

    await contentModel.clickDealMenu();

    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    await contentModel.titleInput.click();
    await contentModel.titleInput.fill(title);

    await contentModel.dealDropdown.click();

    await contentModel.selectDealType(dealTypes.saveAmount);
    await page.waitForTimeout(1000);
    await contentModel.priceMonetaryField.fill('5.00');
    await page.waitForTimeout(300);

    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);

    await contentModel.cardDetailLabel.click();

    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);

    await contentModel.newContentIsCreated(title, dealTypes.saveAmount, brandsData.subBrandContent, user.role);

    await contentModel.deleteContentByName(title);
  });

  test(`Verify that you can create a content with Save Amount percent deal type at subbrand level with required fields for a single language default language english CDL Active '${user.role}'`, async ({ page }) => {
    
    if (user.role == Roles.storeOwner) { return } 
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 800});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);

    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
     }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();
    const title = (dealTypes.saveAmount + uniqueId).slice(0, 40);

    await contentModel.clickDealMenu();

    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    await contentModel.titleInput.click();
    await contentModel.titleInput.fill(title);

    await contentModel.dealDropdown.click();

    await contentModel.selectDealType(dealTypes.saveAmount);
    await page.waitForTimeout(1000);

    await contentModel.amountOffDropdownOptions.click();
    await contentModel.selectAmountOffType('Percent');

    await page.waitForTimeout(500);
    await contentModel.priceMonetaryField.fill('99');
    await page.waitForTimeout(300);

    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);

    await contentModel.cardDetailLabel.click();

    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);

    await contentModel.newContentIsCreated(title, dealTypes.saveAmount, brandsData.subBrandContent, user.role);

    await contentModel.deleteContentByName(title);
  });

  test(`Verify that you can create a content with From X deal type at subbrand level with required fields for a single language default language english CDL Active '${user.role}'`, async ({ page }) => {
    
    if (user.role == Roles.storeOwner) { return } 
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 800});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);

    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
     }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();
    const title = (dealTypes.fromX + uniqueId).slice(0, 40);

    await contentModel.clickDealMenu();

    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    await contentModel.titleInput.click();
    await contentModel.titleInput.fill(title);

    await contentModel.dealDropdown.click();

    await contentModel.selectDealType(dealTypes.fromX);

    await page.waitForTimeout(500);
    await contentModel.pField.fill('9.99');
    await page.waitForTimeout(300);

    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);

    await contentModel.cardDetailLabel.click();

    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);

    await contentModel.newContentIsCreated(title, dealTypes.fromX, brandsData.subBrandContent, user.role);

    await contentModel.deleteContentByName(title);
  });

});

test(`Verify that the circular start dates match the nodes circulars start day of week and time of day at subbrand level`, async ({ page }) => {
  await page.goto(url);
  await page.setViewportSize({width: 1600, height: 3600});
  const loginModel = new LoginModel(page);
  const sideBarModel = new SidebarModel(page);
  const topBarModel = new TopBarModel(page);
  const contentModel = new ContentModel(page);
  const common = new CommonModel(page);
  const brandModel = new BrandsModel(page);
  let brandTableVisible: boolean;

  await loginModel.login(users[0].username, users[0].password);
  if(users[0].role == rolesData.superAdmin || users[0].role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
  await common.waitUntilSpinnerDisappears();
  await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, brandsData.subBrand);
  await common.waitUntilSpinnerDisappears();
  await sideBarModel.onClickBrandOptionMenu();
  await common.waitUntilSpinnerDisappears();
  //await page.waitForURL('**/admin/brands');

  for(let i = 0; i < 60; i++){
    brandTableVisible = await brandModel.brandTable.isVisible();
    if(brandTableVisible){
      break;
    }
    await page.waitForTimeout(300);
  }

  expect(brandTableVisible!).toBeTruthy();
  
  await common.setSearchValue(brandsData.onlyContent);
  await brandModel.brandTableShouldHasOneRow();
  //await brandModel.hasBrandTableOneRow();

  await brandModel.goToManageNodes(brandsData.onlyContent);
  await brandModel.hasBrandHierarchyTableValues(2);
  await brandModel.openEditSubNodePopUp(brandsData.subBrandContent);
  await brandModel.cancelButton.waitFor({state: 'visible'});

  await brandModel.storeCircularStartDayDropdown.first().waitFor({state: 'visible'});
  await brandModel.storeCircularStartDayDropdown.scrollIntoViewIfNeeded();
  const startDayValue = await brandModel.storeCircularStartDayDropdown.inputValue();
  const circularStartTime = await brandModel.storeCircularDayStartTimeInput.inputValue();
  const circularTimezone = await brandModel.circularTimezoneDropdown.locator('span > span').innerText();
  await brandModel.cancelButton.click();
  await brandModel.goToManageContentViewSubbrand(brandsData.subBrandContent);

  await common.waitUntilSpinnerDisappears();
  await contentModel.checkTimesOnContentView(startDayValue, circularStartTime, circularTimezone);
});

  test(`Upload bulk content with a standard spreadsheet at subbrand level for a single language default languague english CDL Active 'Super Admin'`, async ({ page }) => {
    
    test.setTimeout(180000);
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 8000});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const contentModel = new ContentModel(page);
    const common = new CommonModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent2);
    await common.waitUntilSpinnerDisappears();
    await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, brandsData.subBrand);
    await common.waitUntilSpinnerDisappears(); 
    if(users[0].role == rolesData.superAdmin || users[0].role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await common.waitUntilSpinnerDisappears();

    await contentModel.deleteContentButton.waitFor();
    await expect(contentModel.deleteContentButton).toBeVisible();

    await contentModel.onClickBulkItemBtn();

    await contentModel.bulkSelectUpload(['src/images/A97.jpg'], contentModel.chooseButton);
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.uploadMedia);
    await contentModel.nextButton.click();
    await contentModel.checkBulkCurrentStep(contentData.selectDateRange);
    await contentModel.nextButton.click();
    if(users[0].role == rolesData.superAdmin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestSA.xlsx'], contentModel.chooseButton);
    }
    if(users[0].role == rolesData.admin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestA.xlsx'], contentModel.chooseButton);
    }
    if(users[0].role == rolesData.storeOwner){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestSO.xlsx'], contentModel.chooseButton);
    }
    await contentModel.checkBulkCurrentStep(contentData.contentUpload);
    await common.waitUntilSpinnerDisappears();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.categoryManagement);
    await contentModel.clickIgnoreButtonIfPresent();
    await contentModel.categoryMessages.hover();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.review);
    await common.waitUntilSpinnerDisappears();
    await contentModel.doneButton.click({delay:2000});
    await common.waitUntilSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("Fruits");
    if(users[0].role == rolesData.superAdmin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSA.simple, brandsData.subBrandContent);
      await contentModel.deleteAllContent(contentBulkDataSA.simple, brandsData.subBrandContent);
    }
    if(users[0].role == rolesData.admin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataA.simple, brandsData.subBrandContent);
      await contentModel.deleteAllContent(contentBulkDataA.simple, brandsData.subBrandContent);
    }
    if(users[0].role == rolesData.storeOwner){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSO.simple, brandsData.storeContent);
      await contentModel.deleteAllContent(contentBulkDataSO.simple,brandsData.storeContent);
    }
  });

  test(`Upload bulk content with a standard spreadsheet at subbrand level for a single language default languague english CDL Active 'Admin'`, async ({ page }) => {
    
    test.setTimeout(180000);
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 8000});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const contentModel = new ContentModel(page);
    const common = new CommonModel(page);

    await loginModel.login(users[1].username, users[1].password);
    await topBarModel.selectBrand(brandsData.onlyContent3);
    await common.waitUntilSpinnerDisappears();
    await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, brandsData.subBrand);
    await common.waitUntilSpinnerDisappears();

    if(users[1].role == rolesData.superAdmin || users[1].role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await common.waitUntilSpinnerDisappears();

    await contentModel.deleteContentButton.waitFor();
    await expect(contentModel.deleteContentButton).toBeVisible();

    await contentModel.onClickBulkItemBtn();

    await contentModel.bulkSelectUpload(['src/images/A97.jpg'], contentModel.chooseButton);
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.uploadMedia);
    await contentModel.nextButton.click();
    await contentModel.checkBulkCurrentStep(contentData.selectDateRange);
    await contentModel.nextButton.click();
    if(users[1].role == rolesData.superAdmin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestSA.xlsx'], contentModel.chooseButton);
    }
    if(users[1].role == rolesData.admin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestA.xlsx'], contentModel.chooseButton);
    }
    if(users[1].role == rolesData.storeOwner){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestSO.xlsx'], contentModel.chooseButton);
    }
    await contentModel.checkBulkCurrentStep(contentData.contentUpload);
    await common.waitUntilSpinnerDisappears();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.categoryManagement);
    await contentModel.clickIgnoreButtonIfPresent();
    await contentModel.categoryMessages.hover();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.review);
    await common.waitUntilSpinnerDisappears();
    await contentModel.doneButton.click({delay:2000});
    await common.waitUntilSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("Fruits");
    if(users[1].role == rolesData.superAdmin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSA.simple, brandsData.subBrandContent);
      await contentModel.deleteAllContent(contentBulkDataSA.simple, brandsData.subBrandContent);
    }
    if(users[1].role == rolesData.admin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataA.simple, brandsData.subBrandContent);
      await contentModel.deleteAllContent(contentBulkDataA.simple, brandsData.subBrandContent);
    }
    if(users[1].role == rolesData.storeOwner){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSO.simple, brandsData.storeContent);
      await contentModel.deleteAllContent(contentBulkDataSO.simple,brandsData.storeContent);
    }
  });


  test(`Upload bulk content with a spreadsheet with optional fields at subbrand level for a single language default languague english CDL Active 'Super Admin'`, async ({ page }) => {
    
    test.setTimeout(180000);
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const contentModel = new ContentModel(page);
    const common = new CommonModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await common.waitUntilSpinnerDisappears();
    await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, brandsData.subBrand);
    await common.waitUntilSpinnerDisappears(); 
    if(users[0].role == rolesData.superAdmin || users[0].role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await common.waitUntilSpinnerDisappears();

    await contentModel.deleteContentButton.waitFor();
    await expect(contentModel.deleteContentButton).toBeVisible();

    await contentModel.onClickBulkItemBtn();

    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.uploadMedia);
    await contentModel.nextButton.click();
    await contentModel.checkBulkCurrentStep(contentData.selectDateRange);
    await contentModel.nextButton.click();
    if(users[0].role == rolesData.superAdmin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestCompleteSA.xlsx'], contentModel.chooseButton);
    }
    if(users[0].role == rolesData.admin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestCompleteA.xlsx'], contentModel.chooseButton);
    }
    if(users[0].role == rolesData.storeOwner){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestCompleteSO.xlsx'], contentModel.chooseButton);
    }
    await contentModel.checkBulkCurrentStep(contentData.contentUpload);
    await common.waitUntilSpinnerDisappears();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.categoryManagement);
    await contentModel.clickIgnoreButtonIfPresent();
    await contentModel.categoryMessages.hover();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.review);
    await common.waitUntilSpinnerDisappears();
    await contentModel.doneButton.click({delay:2000});
    await common.waitUntilSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("Fruits");
    if(users[0].role == rolesData.superAdmin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSA.full,brandsData.subBrandContent);
      await contentModel.deleteAllContent(contentBulkDataSA.full,brandsData.subBrandContent);
    }
    if(users[0].role == rolesData.admin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataA.full,brandsData.subBrandContent);
      await contentModel.deleteAllContent(contentBulkDataA.full,brandsData.subBrandContent);
    }
    if(users[0].role == rolesData.storeOwner){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSO.full,brandsData.storeContent);
      await contentModel.deleteAllContent(contentBulkDataSO.full,brandsData.storeContent);
    }
  });

  test(`Upload bulk content with a spreadsheet with optional fields at subbrand level for a single language default languague english CDL Active 'Admin'`, async ({ page }) => {
    
    test.setTimeout(1800000);
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const contentModel = new ContentModel(page);
    const common = new CommonModel(page);

    await loginModel.login(users[1].username, users[1].password);
    await topBarModel.selectBrand(brandsData.onlyContent2);
    await common.waitUntilSpinnerDisappears();
    await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, brandsData.subBrand);
    await common.waitUntilSpinnerDisappears(); 
    if(users[1].role == rolesData.superAdmin || users[1].role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await common.waitUntilSpinnerDisappears();

    await contentModel.deleteContentButton.waitFor();
    await expect(contentModel.deleteContentButton).toBeVisible();

    await contentModel.onClickBulkItemBtn();

    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.uploadMedia);
    await contentModel.nextButton.click();
    await contentModel.checkBulkCurrentStep(contentData.selectDateRange);
    await contentModel.nextButton.click();
    if(users[1].role == rolesData.superAdmin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestCompleteSA.xlsx'], contentModel.chooseButton);
    }
    if(users[1].role == rolesData.admin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestCompleteA.xlsx'], contentModel.chooseButton);
    }
    if(users[1].role == rolesData.storeOwner){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestCompleteSO.xlsx'], contentModel.chooseButton);
    }
    await contentModel.checkBulkCurrentStep(contentData.contentUpload);
    await common.waitUntilSpinnerDisappears();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.categoryManagement);
    await contentModel.clickIgnoreButtonIfPresent();
    await contentModel.categoryMessages.hover();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.review);
    await common.waitUntilSpinnerDisappears();
    await contentModel.doneButton.click({delay:2000});
    await common.waitUntilSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("Fruits");
    if(users[1].role == rolesData.superAdmin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSA.full,brandsData.subBrandContent);
      await contentModel.deleteAllContent(contentBulkDataSA.full,brandsData.subBrandContent);
    }
    if(users[1].role == rolesData.admin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataA.full,brandsData.subBrandContent);
      await contentModel.deleteAllContent(contentBulkDataA.full,brandsData.subBrandContent);
    }
    if(users[1].role == rolesData.storeOwner){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSO.full,brandsData.storeContent);
      await contentModel.deleteAllContent(contentBulkDataSO.full,brandsData.storeContent);
    }
  });

users.forEach(user => {

  test(`Create store level static agreement type content with required fields for a single language default language English CDL Active '${user.role}'`, async ({ page }) => {
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const contentModel = new ContentModel(page);
    const commonModel = new CommonModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeStoreGroupChild(brandsData.storeContent);
      await commonModel.waitUntilSpinnerDisappears();
     }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.static + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title);
    await contentModel.verifyTitleIsComplete(title);
    await commonModel.inputTextInLocator(contentModel.descriptionInput, "This is a description");
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.static);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.static, brandsData.storeContent, user.role);

    await contentModel.deleteContentByName(title);
  });


  test(`Create fixed price deal type content at the store level with required fields for a single language default languague english CDL Active '${user.role}'`, async ({ page }) => {
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeStoreGroupChild(brandsData.storeContent);
      await commonModel.waitUntilSpinnerDisappears();
     }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.fixedPrice + uniqueId).slice(0, 40);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title);
    await contentModel.verifyTitleIsComplete(title);
    await commonModel.inputTextInLocator(contentModel.descriptionInput, "This is a description");
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.fixedPrice);
    await commonModel.inputTextInLocator(contentModel.priceField, "1");
    await commonModel.inputTextInLocator(contentModel.unitsField, "pcs");
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.fixedPrice, brandsData.storeContent, user.role);

    await contentModel.deleteContentByName(title);
  });


  test(`Create Buy X Get Y For Z deal type content at store level with required fields for a single language default languague english CDL Active '${user.role}'`, async ({ page }) => {
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeStoreGroupChild(brandsData.storeContent);
      await commonModel.waitUntilSpinnerDisappears();
     }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.bogo + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title);
    await contentModel.verifyTitleIsComplete(title);
    await commonModel.inputTextInLocator(contentModel.descriptionInput, "This is a description");
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.bogo);
    await commonModel.inputTextInLocator(contentModel.xField, "2");
    await commonModel.inputTextInLocator(contentModel.yField, "4");
    //await contentModel.zField.type('pcs',{delay: 100});
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.bogo, brandsData.storeContent, user.role);

    await contentModel.deleteContentByName(title);
  });


  test(`Create # for Price deal type content at store level with required fields for a single language default languague english CDL Active '${user.role}'`, async ({ page }) => {
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeStoreGroupChild(brandsData.storeContent);
      await commonModel.waitUntilSpinnerDisappears();
     }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.numberForPrice + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title);
    await contentModel.verifyTitleIsComplete(title);
    await commonModel.inputTextInLocator(contentModel.descriptionInput, "This is a description");
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.numberForPrice);
    await commonModel.inputTextInLocator(contentModel.qtyField, "2");
    await commonModel.inputTextInLocator(contentModel.pField, "5.00");
    await commonModel.inputTextInLocator(contentModel.units2Field, "pcs");
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.numberForPrice, brandsData.storeContent, user.role);

    await contentModel.deleteContentByName(title);
  });


  test(`Create Amount Off monetary deal type content at store level with required fields for a single language default languague english CDL Active '${user.role}'`, async ({ page }) => {
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeStoreGroupChild(brandsData.storeContent);
      await commonModel.waitUntilSpinnerDisappears();
     }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.amountOff + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title);
    await contentModel.verifyTitleIsComplete(title);
    await commonModel.inputTextInLocator(contentModel.descriptionInput, "This is a description");
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.amountOff);
    await commonModel.inputTextInLocator(contentModel.priceMonetaryField, "3.00");
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.amountOff, brandsData.storeContent, user.role);

    await contentModel.deleteContentByName(title);
  });


  test(`Create Amount Off percent deal type content at store level with required fields for a single language default languague english CDL Active '${user.role}'`, async ({ page }) => {
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeStoreGroupChild(brandsData.storeContent);
      await commonModel.waitUntilSpinnerDisappears();
     }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();
    await page.evaluate("document.body.style.scale='0.7'");

    const uniqueId = uuidv4();

    const title = (dealTypes.amountOff + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title);
    await contentModel.verifyTitleIsComplete(title);
    await commonModel.inputTextInLocator(contentModel.descriptionInput, "This is a description");
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.amountOff);
    await contentModel.amountOffDropdown.click();
    await contentModel.selectAmountOffType(amountOffType.percentage);
    await commonModel.inputTextInLocator(contentModel.priceMonetaryField, "3.00");
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.amountOff, brandsData.storeContent, user.role);

    await contentModel.deleteContentByName(title);
  });


  test(`Create Vendor Coupon deal type content at store level with required fields for a single language default languague english CDL Active '${user.role}'`, async ({ page }) => {
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeStoreGroupChild(brandsData.storeContent);
      await commonModel.waitUntilSpinnerDisappears();
     }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.vendorCoupon + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title);
    await contentModel.verifyTitleIsComplete(title);
    await commonModel.inputTextInLocator(contentModel.descriptionInput, "This is a description");
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.vendorCoupon);
    await contentModel.categoryDropdown.click();
    await commonModel.inputTextInLocator(contentModel.upcField, contentData.upc);
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.vendorCoupon, brandsData.storeContent, user.role);

    await contentModel.deleteContentByName(title);
  });


  test(`Create Share Category deal type content at store level with required fields for a single language default languague english CDL Active '${user.role}'`, async ({ page }) => {
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeStoreGroupChild(brandsData.storeContent);
      await commonModel.waitUntilSpinnerDisappears();
     }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.shareCategory + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title);
    await contentModel.verifyTitleIsComplete(title);
    await commonModel.inputTextInLocator(contentModel.descriptionInput, "This is a description");
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.shareCategory);
    await contentModel.categoryDropdown .click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.shareCategory, brandsData.storeContent, user.role);

    await contentModel.deleteContentByName(title);
  });


  test(`Create Recipe deal type content at store level with required fields for a single language default languague english CDL Active '${user.role}'`, async ({ page }) => {
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeStoreGroupChild(brandsData.storeContent);
      await commonModel.waitUntilSpinnerDisappears();
     }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();
    await page.evaluate("document.body.style.scale='0.7'");
    await page.waitForTimeout(500);

    const uniqueId = uuidv4();

    const title = (dealTypes.recipe + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.singleItemButton.waitFor();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title);
    await contentModel.verifyTitleIsComplete(title);
    await commonModel.inputTextInLocator(contentModel.descriptionInput, "This is a description");
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.recipe);
    await contentModel.selectRecipe(0);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.recipe, brandsData.storeContent, user.role);

    await contentModel.deleteContentByName(title);
  });

  test(`Verify you can create # / Price deal type content at store level with required fields for a single language default languague english CDL Active '${user.role}'`, async ({ page }) => {
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);

    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeStoreGroupChild(brandsData.storeContent);
      await commonModel.waitUntilSpinnerDisappears();
     }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();
    const title = (dealTypes.numberSlashPrice + uniqueId).slice(0, 40);

    await contentModel.clickDealMenu();

    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    await contentModel.titleInput.click();
    await contentModel.titleInput.fill(title);

    await contentModel.dealDropdown.click();

    await contentModel.selectDealType(dealTypes.numberSlashPrice);
    await page.waitForTimeout(1000);
    await contentModel.qtyField.fill('2');
    await contentModel.pField.fill('5.00');
    await contentModel.units2Field.fill('pcs');
    await page.waitForTimeout(300);

    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);

    await contentModel.cardDetailLabel.click();

    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);

    await contentModel.newContentIsCreated(title, dealTypes.numberSlashPrice, brandsData.storeContent, user.role);

    await contentModel.deleteContentByName(title);
  });

  test(`Verify that you can create a content with Save Amount monetary deal type at store level with required fields for a single language default language english CDL Active '${user.role}'`, async ({ page }) => {
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);

    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeStoreGroupChild(brandsData.storeContent);
      await commonModel.waitUntilSpinnerDisappears();
     }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();
    const title = (dealTypes.saveAmount + uniqueId).slice(0, 40);

    await contentModel.clickDealMenu();

    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    await contentModel.titleInput.click();
    await contentModel.titleInput.fill(title);

    await contentModel.dealDropdown.click();

    await contentModel.selectDealType(dealTypes.saveAmount);
    await page.waitForTimeout(1000);
    await contentModel.priceMonetaryField.fill('5.00');
    await page.waitForTimeout(300);

    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);

    await contentModel.cardDetailLabel.click();

    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);

    await contentModel.newContentIsCreated(title, dealTypes.saveAmount, brandsData.storeContent, user.role);

    await contentModel.deleteContentByName(title);
  });

  test(`Verify that you can create a content with Save Amount percent deal type at store level with required fields for a single language default language english CDL Active '${user.role}'`, async ({ page }) => {
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 800});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);

    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeStoreGroupChild(brandsData.storeContent);
      await commonModel.waitUntilSpinnerDisappears();
     }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();
    const title = (dealTypes.saveAmount + uniqueId).slice(0, 40);

    await contentModel.clickDealMenu();

    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    await contentModel.titleInput.click();
    await contentModel.titleInput.fill(title);

    await contentModel.dealDropdown.click();

    await contentModel.selectDealType(dealTypes.saveAmount);
    await page.waitForTimeout(1000);

    await contentModel.amountOffDropdownOptions.click();
    await contentModel.selectAmountOffType('Percent');

    await page.waitForTimeout(500);
    await contentModel.priceMonetaryField.fill('99');
    await page.waitForTimeout(300);

    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);

    await contentModel.cardDetailLabel.click();

    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);

    await contentModel.newContentIsCreated(title, dealTypes.saveAmount, brandsData.storeContent, user.role);

    await contentModel.deleteContentByName(title);
  });

  test(`Verify that you can create a content with From X deal type at store level with required fields for a single language default language english CDL Active '${user.role}'`, async ({ page }) => {
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 800});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(user.username, user.password);

    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeStoreGroupChild(brandsData.storeContent);
      await commonModel.waitUntilSpinnerDisappears();
     }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();
    const title = (dealTypes.fromX + uniqueId).slice(0, 40);

    await contentModel.clickDealMenu();

    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    await contentModel.titleInput.click();
    await contentModel.titleInput.fill(title);

    await contentModel.dealDropdown.click();

    await contentModel.selectDealType(dealTypes.fromX);

    await page.waitForTimeout(500);
    await contentModel.pField.fill('9.99');
    await page.waitForTimeout(300);

    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);

    await contentModel.cardDetailLabel.click();

    await contentModel.waitUntilContentSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("home");
    await commonModel.setSearchValue(title);

    await contentModel.newContentIsCreated(title, dealTypes.fromX, brandsData.storeContent, user.role);

    await contentModel.deleteContentByName(title);
  });

});


  test(`Upload bulk content with a standard spreadsheet at store level for a single language default languague english CDL Active 'Super Admin'`, async ({ page }) => {
    
    test.setTimeout(240000);
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 8000});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const contentModel = new ContentModel(page);
    const common = new CommonModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent2);
    await common.waitUntilSpinnerDisappears();
    await topBarModel.selectNodeStoreGroupChild(brandsData.storeContent);
    await common.waitUntilSpinnerDisappears();

    if(users[0].role == rolesData.superAdmin || users[0].role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await common.waitUntilSpinnerDisappears();

    await contentModel.deleteContentButton.waitFor();
    await expect(contentModel.deleteContentButton).toBeVisible();

    await contentModel.onClickBulkItemBtn();

    await contentModel.bulkSelectUpload(['src/images/A97.jpg'], contentModel.chooseButton);
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.uploadMedia);
    await contentModel.nextButton.click();
    await contentModel.checkBulkCurrentStep(contentData.selectDateRange);
    await contentModel.nextButton.click();
    if(users[0].role == rolesData.superAdmin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestSA.xlsx'], contentModel.chooseButton);
    }
    if(users[0].role == rolesData.admin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestA.xlsx'], contentModel.chooseButton);
    }
    if(users[0].role == rolesData.storeOwner){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestSO.xlsx'], contentModel.chooseButton);
    }
    await contentModel.checkBulkCurrentStep(contentData.contentUpload);
    await common.waitUntilSpinnerDisappears();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.categoryManagement);
    await contentModel.clickIgnoreButtonIfPresent();
    await contentModel.categoryMessages.hover();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.review);
    await common.waitUntilSpinnerDisappears();
    await contentModel.doneButton.click({delay:2000});
    await common.waitUntilSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("Fruits");
    if(users[0].role == rolesData.superAdmin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSA.simple, brandsData.storeContent);
      await contentModel.deleteAllContent(contentBulkDataSA.simple, brandsData.storeContent);
    }
    if(users[0].role == rolesData.admin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataA.simple, brandsData.storeContent);
      await contentModel.deleteAllContent(contentBulkDataA.simple, brandsData.storeContent);
    }
    if(users[0].role == rolesData.storeOwner){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSO.simple, brandsData.storeContent);
      await contentModel.deleteAllContent(contentBulkDataSO.simple,brandsData.storeContent);
    }
  });

  test(`Upload bulk content with a standard spreadsheet at store level for a single language default languague english CDL Active 'Admin'`, async ({ page }) => {
    
    test.setTimeout(240000);
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 8000});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const contentModel = new ContentModel(page);
    const common = new CommonModel(page);

    await loginModel.login(users[1].username, users[1].password);
    await topBarModel.selectBrand(brandsData.onlyContent3);
    await common.waitUntilSpinnerDisappears();
    await topBarModel.selectNodeStoreGroupChild(brandsData.storeContent);
    await common.waitUntilSpinnerDisappears();

    if(users[1].role == rolesData.superAdmin || users[1].role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await common.waitUntilSpinnerDisappears();

    await contentModel.deleteContentButton.waitFor();
    await expect(contentModel.deleteContentButton).toBeVisible();

    await contentModel.onClickBulkItemBtn();

    await contentModel.bulkSelectUpload(['src/images/A97.jpg'], contentModel.chooseButton);
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.uploadMedia);
    await contentModel.nextButton.click();
    await contentModel.checkBulkCurrentStep(contentData.selectDateRange);
    await contentModel.nextButton.click();
    if(users[1].role == rolesData.superAdmin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestSA.xlsx'], contentModel.chooseButton);
    }
    if(users[1].role == rolesData.admin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestA.xlsx'], contentModel.chooseButton);
    }
    if(users[1].role == rolesData.storeOwner){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestSO.xlsx'], contentModel.chooseButton);
    }
    await contentModel.checkBulkCurrentStep(contentData.contentUpload);
    await common.waitUntilSpinnerDisappears();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.categoryManagement);
    await contentModel.clickIgnoreButtonIfPresent();
    await contentModel.categoryMessages.hover();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.review);
    await common.waitUntilSpinnerDisappears();
    await contentModel.doneButton.click({delay:2000});
    await common.waitUntilSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("Fruits");
    if(users[1].role == rolesData.superAdmin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSA.simple, brandsData.storeContent);
      await contentModel.deleteAllContent(contentBulkDataSA.simple, brandsData.storeContent);
    }
    if(users[1].role == rolesData.admin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataA.simple, brandsData.storeContent);
      await contentModel.deleteAllContent(contentBulkDataA.simple, brandsData.storeContent);
    }
    if(users[1].role == rolesData.storeOwner){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSO.simple, brandsData.storeContent);
      await contentModel.deleteAllContent(contentBulkDataSO.simple,brandsData.storeContent);
    }
  });

  test(`Upload bulk content with a standard spreadsheet at store level for a single language default languague english CDL Active 'Store Owner'`, async ({ page }) => {
    
    test.setTimeout(240000);
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 8000});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const contentModel = new ContentModel(page);
    const common = new CommonModel(page);

    await loginModel.login(users[2].username, users[2].password);
    await common.waitUntilSpinnerDisappears();

    if(users[2].role == rolesData.superAdmin || users[2].role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await common.waitUntilSpinnerDisappears();

    await contentModel.deleteContentButton.waitFor();
    await expect(contentModel.deleteContentButton).toBeVisible();

    await contentModel.onClickBulkItemBtn();

    await contentModel.bulkSelectUpload(['src/images/A97.jpg'], contentModel.chooseButton);
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.uploadMedia);
    await contentModel.nextButton.click();
    await contentModel.checkBulkCurrentStep(contentData.selectDateRange);
    await contentModel.nextButton.click();
    if(users[2].role == rolesData.superAdmin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestSA.xlsx'], contentModel.chooseButton);
    }
    if(users[2].role == rolesData.admin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestA.xlsx'], contentModel.chooseButton);
    }
    if(users[2].role == rolesData.storeOwner){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestSO.xlsx'], contentModel.chooseButton);
    }
    await contentModel.checkBulkCurrentStep(contentData.contentUpload);
    await common.waitUntilSpinnerDisappears();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.categoryManagement);
    await contentModel.clickIgnoreButtonIfPresent();
    await contentModel.categoryMessages.hover();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.review);
    await common.waitUntilSpinnerDisappears();
    await contentModel.doneButton.click({delay:2000});
    await common.waitUntilSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("Fruits");
    if(users[2].role == rolesData.superAdmin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSA.simple, brandsData.storeContent);
      await contentModel.deleteAllContent(contentBulkDataSA.simple, brandsData.storeContent);
    }
    if(users[2].role == rolesData.admin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataA.simple, brandsData.storeContent);
      await contentModel.deleteAllContent(contentBulkDataA.simple, brandsData.storeContent);
    }
    if(users[2].role == rolesData.storeOwner){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSO.simple, brandsData.storeContent);
      await contentModel.deleteAllContent(contentBulkDataSO.simple,brandsData.storeContent);
    }
  });


  test(`Upload bulk content with a spreadsheet with optional fields at store level for a single language default languague english CDL Active 'Super Admin'`, async ({ page }) => {
    
    test.setTimeout(240000);
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const contentModel = new ContentModel(page);
    const common = new CommonModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await common.waitUntilSpinnerDisappears();
    await topBarModel.selectNodeStoreGroupChild(brandsData.storeContent);
    await common.waitUntilSpinnerDisappears();

    if(users[0].role == rolesData.superAdmin || users[0].role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await common.waitUntilSpinnerDisappears();

    await contentModel.deleteContentButton.waitFor();
    await expect(contentModel.deleteContentButton).toBeVisible();

    await contentModel.onClickBulkItemBtn();

    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.uploadMedia);
    await contentModel.nextButton.click();
    await contentModel.checkBulkCurrentStep(contentData.selectDateRange);
    await contentModel.nextButton.click();
    if(users[0].role == rolesData.superAdmin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestCompleteSA.xlsx'], contentModel.chooseButton);
    }
    if(users[0].role == rolesData.admin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestCompleteA.xlsx'], contentModel.chooseButton);
    }
    if(users[0].role == rolesData.storeOwner){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestCompleteSO.xlsx'], contentModel.chooseButton);
    }
    await contentModel.checkBulkCurrentStep(contentData.contentUpload);
    await common.waitUntilSpinnerDisappears();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.categoryManagement);
    await contentModel.clickIgnoreButtonIfPresent();
    await contentModel.categoryMessages.hover();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.review);
    await common.waitUntilSpinnerDisappears();
    await contentModel.doneButton.click({delay:2000});
    await common.waitUntilSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("Fruits");
    if(users[0].role == rolesData.superAdmin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSA.full,brandsData.storeContent);
      await contentModel.deleteAllContent(contentBulkDataSA.full,brandsData.storeContent);
    }
    if(users[0].role == rolesData.admin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataA.full,brandsData.storeContent);
      await contentModel.deleteAllContent(contentBulkDataA.full,brandsData.storeContent);
    }
    if(users[0].role == rolesData.storeOwner){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSO.full,brandsData.storeContent);
      await contentModel.deleteAllContent(contentBulkDataSO.full,brandsData.storeContent);
    }
  });

  test(`Upload bulk content with a spreadsheet with optional fields at store level for a single language default languague english CDL Active 'Admin'`, async ({ page }) => {
    
    test.setTimeout(240000);
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const contentModel = new ContentModel(page);
    const common = new CommonModel(page);

    await loginModel.login(users[1].username, users[1].password);
    await topBarModel.selectBrand(brandsData.onlyContent2);
    await common.waitUntilSpinnerDisappears();
    await topBarModel.selectNodeStoreGroupChild(brandsData.storeContent);
    await common.waitUntilSpinnerDisappears(); 
    if(users[1].role == rolesData.superAdmin || users[1].role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await common.waitUntilSpinnerDisappears();

    await contentModel.deleteContentButton.waitFor();
    await expect(contentModel.deleteContentButton).toBeVisible();

    await contentModel.onClickBulkItemBtn();

    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.uploadMedia);
    await contentModel.nextButton.click();
    await contentModel.checkBulkCurrentStep(contentData.selectDateRange);
    await contentModel.nextButton.click();
    if(users[1].role == rolesData.superAdmin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestCompleteSA.xlsx'], contentModel.chooseButton);
    }
    if(users[1].role == rolesData.admin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestCompleteA.xlsx'], contentModel.chooseButton);
    }
    if(users[1].role == rolesData.storeOwner){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestCompleteSO.xlsx'], contentModel.chooseButton);
    }
    await contentModel.checkBulkCurrentStep(contentData.contentUpload);
    await common.waitUntilSpinnerDisappears();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.categoryManagement);
    await contentModel.clickIgnoreButtonIfPresent();
    await contentModel.categoryMessages.hover();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.review);
    await common.waitUntilSpinnerDisappears();
    await contentModel.doneButton.click({delay:2000});
    await common.waitUntilSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("Fruits");
    if(users[1].role == rolesData.superAdmin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSA.full,brandsData.storeContent);
      await contentModel.deleteAllContent(contentBulkDataSA.full,brandsData.storeContent);
    }
    if(users[1].role == rolesData.admin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataA.full,brandsData.storeContent);
      await contentModel.deleteAllContent(contentBulkDataA.full,brandsData.storeContent);
    }
    if(users[1].role == rolesData.storeOwner){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSO.full,brandsData.storeContent);
      await contentModel.deleteAllContent(contentBulkDataSO.full,brandsData.storeContent);
    }
  });

  test(`Upload bulk content with a spreadsheet with optional fields at store level for a single language default languague english CDL Active 'Store Owner'`, async ({ page }) => {
    
    test.setTimeout(240000);
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const contentModel = new ContentModel(page);
    const common = new CommonModel(page);

    await loginModel.login(users[2].username, users[2].password);

    await common.waitUntilSpinnerDisappears(); 
   
    if(users[2].role == rolesData.superAdmin || users[2].role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await common.waitUntilSpinnerDisappears();

    await contentModel.deleteContentButton.waitFor();
    await expect(contentModel.deleteContentButton).toBeVisible();

    await contentModel.onClickBulkItemBtn();

    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.uploadMedia);
    await contentModel.nextButton.click();
    await contentModel.checkBulkCurrentStep(contentData.selectDateRange);
    await contentModel.nextButton.click();
    if(users[2].role == rolesData.superAdmin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestCompleteSA.xlsx'], contentModel.chooseButton);
    }
    if(users[2].role == rolesData.admin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestCompleteA.xlsx'], contentModel.chooseButton);
    }
    if(users[2].role == rolesData.storeOwner){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestCompleteSO.xlsx'], contentModel.chooseButton);
    }
    await contentModel.checkBulkCurrentStep(contentData.contentUpload);
    await common.waitUntilSpinnerDisappears();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.categoryManagement);
    await contentModel.clickIgnoreButtonIfPresent();
    await contentModel.categoryMessages.hover();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.review);
    await common.waitUntilSpinnerDisappears();
    await contentModel.doneButton.click({delay:2000});
    await common.waitUntilSpinnerDisappears();
    await contentModel.verifyCategoryIsDisplayed("Fruits");
    if(users[2].role == rolesData.superAdmin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSA.full,brandsData.storeContent);
      await contentModel.deleteAllContent(contentBulkDataSA.full,brandsData.storeContent);
    }
    if(users[2].role == rolesData.admin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataA.full,brandsData.storeContent);
      await contentModel.deleteAllContent(contentBulkDataA.full,brandsData.storeContent);
    }
    if(users[2].role == rolesData.storeOwner){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSO.full,brandsData.storeContent);
      await contentModel.deleteAllContent(contentBulkDataSO.full,brandsData.storeContent);
    }
  });
