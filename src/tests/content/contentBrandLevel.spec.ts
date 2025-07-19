import { test } from '@playwright/test';
import { LoginModel } from '../../pom/loginModel';
import {SidebarModel} from '../../pom/sidebarModel';
import {TopBarModel} from '../../pom/topBarModel';
import { CommonModel } from '../../pom/commonModel';
import { BrandsModel } from '../../pom/brandsModel';
import { ContentModel } from '../../pom/contentModel';
import { CategoriesModel } from '../../pom/categoriesModel';
import {validateEnvironment} from '../../utils/urlHandler';
import {validateUsers} from '../../utils/userHandler';
import { storeOwnerRoleValidation } from '../../utils/rolesHandler';
import { brandsData, subBrandData, timezones} from '../../data/brandsData';
import { rolesData } from '../../data/usersData';
import { dealTypes, amountOffType, contentData, contentBulkDataSA, contentBulkDataA, contentBulkDataSO, contentBulkDataAdam, videoType } from '../../data/contentData';
import {v4 as uuidv4} from 'uuid';


const users = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.onlyContent));
const url: string = validateEnvironment();

test.afterAll(async () => {
  test.setTimeout(2500);
});

users.forEach(user =>{

  test(`Create brand-level static agreement type content with required fields for a single language default language English no-LPP '${user.role}'`, async ({ page }) => {
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
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.static, brandsData.onlyContent, user.role);

    await contentModel.deleteContentByName(title);
  });

  test(`Create fixed price deal type content at the brand level with required fields for a single language default languague english - no LPP '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    await test.setTimeout(120000);
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
    await commonModel.inputTextInLocator(contentModel.priceField, "1");
    await commonModel.inputTextInLocator(contentModel.unitsField, "pcs");
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.fixedPrice, brandsData.onlyContent, user.role);

    await contentModel.deleteContentByName(title);
  });

  test(`Create Buy X Get Y For Z deal type content at brand level with required fields for a single language default languague english - no LPP '${user.role}'`, async ({ page }) => {
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
    await commonModel.inputTextInLocator(contentModel.xField, '2');
    await commonModel.inputTextInLocator(contentModel.yField, '4');
    //await contentModel.zField.type('pcs',{delay: 100});
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.bogo, brandsData.onlyContent, user.role);

    await contentModel.deleteContentByName(title);
  });

  test(`Create # for Price deal type content at brand level with required fields for a single language default languague english - no LPP '${user.role}'`, async ({ page }) => {
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
    await commonModel.inputTextInLocator(contentModel.yField, '2');
    await commonModel.inputTextInLocator(contentModel.pField, '5.00');
    await commonModel.inputTextInLocator(contentModel.units2Field, 'pcs');
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.numberForPrice, brandsData.onlyContent, user.role);

    await contentModel.deleteContentByName(title);
  });

  test(`Create Amount Off monetary deal type content at brand level with required fields for a single language default languague english - no LPP '${user.role}'`, async ({ page }) => {
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
    await commonModel.inputTextInLocator(contentModel.priceMonetaryField, '3.00');
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.amountOff, brandsData.onlyContent, user.role);

    await contentModel.deleteContentByName(title);
  });


  test(`Create Amount Off percent deal type content at brand level with required fields for a single language default languague english - no LPP '${user.role}'`, async ({ page }) => {
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
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.amountOff, brandsData.onlyContent, user.role);

    await contentModel.deleteContentByName(title);
  });


  test(`Create Vendor Coupon deal type content at brand level with required fields for a single language default languague english - no LPP '${user.role}'`, async ({ page }) => {
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
    await contentModel.categoryDropdown.click();
    await commonModel.inputTextInLocator(contentModel.upcField, contentData.upc);
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.vendorCoupon, brandsData.onlyContent, user.role);

    await contentModel.deleteContentByName(title);
  });


  test(`Create Share Category deal type content at brand level with required fields for a single language default languague english - no LPP '${user.role}'`, async ({ page }) => {
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
    await contentModel.categoryDropdown .click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.shareCategory, brandsData.onlyContent, user.role);

    await contentModel.deleteContentByName(title);
  });


  test(`Create Recipe deal type content at brand level with required fields for a single language default languague english - no LPP '${user.role}'`, async ({ page }) => {
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
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.recipe, brandsData.onlyContent, user.role);

    await contentModel.deleteContentByName(title);
  });

  test(`Verify you can create # / Price deal type content at subbrand level with required fields for a single language default languague english - no LPP'${user.role}'`, async ({ page }) => {
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
    await contentModel.selectCategory(2);

    await contentModel.cardDetailLabel.click();

    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);

    await contentModel.newContentIsCreated(title, dealTypes.numberSlashPrice, brandsData.subBrandContent, user.role);

    await contentModel.deleteContentByName(title);
  });

  test(`Verify that you can create a content with Save Amount monetary deal type at subbrand level with required fields for a single language default language english - no LPP'${user.role}'`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);
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
    await contentModel.selectCategory(2);

    await contentModel.cardDetailLabel.click();

    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);

    await contentModel.newContentIsCreated(title, dealTypes.saveAmount, brandsData.subBrandContent, user.role);

    await contentModel.deleteContentByName(title);
  });

  test(`Verify that you can create a content with Save Amount percent deal type at subbrand level with required fields for a single language default language english - no LPP'${user.role}'`, async ({ page }) => {
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
    await contentModel.selectCategory(2);

    await contentModel.cardDetailLabel.click();

    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);

    await contentModel.newContentIsCreated(title, dealTypes.saveAmount, brandsData.subBrandContent, user.role);

    await contentModel.deleteContentByName(title);
  });

  test(`Verify that you can create a content with From X deal type at brand level with required fields for a single language default language english - no LPP'${user.role}'`, async ({ page }) => {
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
    await contentModel.selectCategory(2);

    await contentModel.cardDetailLabel.click();

    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);

    await contentModel.newContentIsCreated(title, dealTypes.fromX, brandsData.subBrandContent, user.role);

    await contentModel.deleteContentByName(title);
  });

});

test(`Verify that the circular start dates match the nodes circulars start day of week and time of day at brand level`, async ({ page }) => {
  await page.goto(url);
  await page.setViewportSize({width: 1600, height: 3600});
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
  //await page.waitForURL('**/admin/brands');

  await brandModel.brandTableVisible();
  await common.setSearchValue(brandsData.onlyContent);
  await brandModel.brandTableShouldHasOneRow();

  await brandModel.goToManageNodes(brandsData.onlyContent);
  await brandModel.hasBrandHierarchyTableValues(3);
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

users.forEach(user => {

  test(`Upload bulk content with a standard spreadsheet at brand level for a single language default languague english - no LPP '${user.role}'`, async ({ page }) => {
    test.setTimeout(150000);
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const contentModel = new ContentModel(page);
    const common = new CommonModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
    await common.waitUntilSpinnerDisappears();
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await common.waitUntilSpinnerDisappears();

    await contentModel.verifyDeleteButtonIsDisplayed();

    await contentModel.onClickBulkItemBtn();

    await contentModel.bulkSelectUpload(['src/images/A97.jpg'], contentModel.chooseButton);
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.uploadMedia);
    await contentModel.nextButton.click();
    await contentModel.checkBulkCurrentStep(contentData.selectDateRange);
    await contentModel.nextButton.click();
    if(user.role == rolesData.superAdmin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestSA.xlsx'], contentModel.chooseButton);
    }
    if(user.role == rolesData.admin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestA.xlsx'], contentModel.chooseButton);
    }
    if(user.role == rolesData.storeOwner){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestSO.xlsx'], contentModel.chooseButton);
    }
    await contentModel.checkBulkCurrentStep(contentData.contentUpload);
    await common.waitUntilSpinnerDisappears();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.categoryManagement);
    await contentModel.categoryMessages.hover();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.review);
    await contentModel.doneButton.click();
    await common.waitUntilSpinnerDisappears();
    if(user.role == rolesData.superAdmin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSA.simple);
      await contentModel.deleteAllContent(contentBulkDataSA.simple);
    }
    if(user.role == rolesData.admin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataA.simple);
      await contentModel.deleteAllContent(contentBulkDataA.simple);
    }
    if(user.role == rolesData.storeOwner){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSO.simple);
      await contentModel.deleteAllContent(contentBulkDataSO.simple);
    }
  });


  test(`Upload bulk content with a spreadsheet with optional fields at brand level for a single language default languague english - no LPP '${user.role}'`, async ({ page }) => {
    test.setTimeout(150000);
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const contentModel = new ContentModel(page);
    const common = new CommonModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
    await common.waitUntilSpinnerDisappears();
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await common.waitUntilSpinnerDisappears();

    await contentModel.verifyDeleteButtonIsDisplayed();

    await contentModel.onClickBulkItemBtn();

    await contentModel.bulkSelectUpload(['src/images/A97.jpg'], contentModel.chooseButton);
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.uploadMedia);
    await contentModel.nextButton.click();
    await contentModel.checkBulkCurrentStep(contentData.selectDateRange);
    await contentModel.nextButton.click();
    if(user.role == rolesData.superAdmin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestCompleteSA.xlsx'], contentModel.chooseButton);
    }
    if(user.role == rolesData.admin){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestCompleteA.xlsx'], contentModel.chooseButton);
    }
    if(user.role == rolesData.storeOwner){
      await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestCompleteSO.xlsx'], contentModel.chooseButton);
    }
    await contentModel.checkBulkCurrentStep(contentData.contentUpload);
    await common.waitUntilSpinnerDisappears();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.categoryManagement);
    await contentModel.categoryMessages.hover();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.review);
    await contentModel.doneButton.click();
    await common.waitUntilSpinnerDisappears();
    if(user.role == rolesData.superAdmin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSA.full);
      await contentModel.deleteAllContent(contentBulkDataSA.full);
    }
    if(user.role == rolesData.admin){
      await contentModel.checkIfBulkLoadOk(contentBulkDataA.full);
      await contentModel.deleteAllContent(contentBulkDataA.full);
    }
    if(user.role == rolesData.storeOwner){
      await contentModel.checkIfBulkLoadOk(contentBulkDataSO.full);
      await contentModel.deleteAllContent(contentBulkDataSO.full);
    }
  });

  test(`Create static deal type content at the brand level with video media type and all fields for a single language default languague english - no LPP '${user.role}'`, async ({ page }) => {
    test.setTimeout(180000);
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
    await page.evaluate("document.body.style.scale='0.8'");
    
    const uniqueId = uuidv4();
  
    const title = (dealTypes.static + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.waitContentSkeletonNotVisible();
    await contentModel.onClickDatetimeItem(0);
    await contentModel.waitContentSkeletonNotVisible();
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
    await contentModel.styleCardDetailDropdown.click();
    await contentModel.selectCardDetailType("Standard");
    let cardStylesText = await contentModel.getCardStylesText();
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.video);
    await contentModel.setLength(2);
    await contentModel.setHeight(2);
    await contentModel.setVideoUrl(contentData.youtubeVideo);
    await contentModel.uploadImageLocation(['src/images/A97.jpg']);
    await contentModel.onClickDateRangeButton();
    const [startsOnDate, expiresDate] = await contentModel.getDateRangeData();
    await contentModel.setUpc(contentData.upc);
    await contentModel.selectHeadlines(0);
    let headlineText = await contentModel.getHeadlineText();
    await contentModel.selectIcons(0);
    let iconsText = await contentModel.getIconsText();
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    let categoryText = await contentModel.getCategoryText();
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.video, brandsData.onlyContent, user.role);

    await contentModel.selectContentItem(title);
    const values = {
        title: title,
        category: categoryText,
        dealType: dealTypes.video,
        contentData: contentData.video,
        videoType: videoType.youtube,
        videoId: contentData.youtubeVideo,
        length: '2', height: '2',
        cardStyle: cardStylesText,
        startsOnDate: startsOnDate,
        expiresDate: expiresDate,
        headlines: headlineText, icons: iconsText,
    }
    await contentModel.checkAllCardDetailValues(values);
  
    await contentModel.deleteContentByName(title);
  });


  test(`Create static deal type content at the brand level with image media type and all fields for a single language default languague english - no LPP '${user.role}'`, async ({ page }) => {
    test.setTimeout(180000);
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
    await page.evaluate("document.body.style.scale='0.9'");
    
    const uniqueId = uuidv4();
  
    const title = (dealTypes.static + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.waitContentSkeletonNotVisible();
    await contentModel.onClickDatetimeItem(0);
    await contentModel.waitContentSkeletonNotVisible();
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
    await contentModel.styleCardDetailDropdown.click();
    await contentModel.selectCardDetailType("Standard");
    let cardStylesText = await contentModel.getCardStylesText();
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.static);
    await contentModel.setLength(2);
    await contentModel.setHeight(2);
    //await contentModel.selectMediaType(contentData.image);
    await contentModel.uploadImageLocation(['src/images/A97.jpg']);
    await contentModel.onClickLinkButton();
    await contentModel.setClickLink(contentData.clickLink);
    await contentModel.onClickSubmitButton();
    await contentModel.onClickDateRangeButton();
    const [startsOnDate, expiresDate] = await contentModel.getDateRangeData();
    await contentModel.setUpc(contentData.upc);
    await contentModel.selectHeadlines(0);
    let headlineText = await contentModel.getHeadlineText();
    await contentModel.selectIcons(0);
    let iconsText = await contentModel.getIconsText();
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    let categoryText = await contentModel.getCategoryText();
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.static, brandsData.onlyContent, user.role);
  
    await contentModel.selectContentItem(title);
    const values = {
        title: title,
        category: categoryText,
        dealType: dealTypes.static,
        contentData: contentData.image,
        videoType: videoType.youtube,
        videoId: contentData.youtubeVideo,
        length: '2', height: '2',
        cardStyle: cardStylesText,
        startsOnDate: startsOnDate,
        expiresDate: expiresDate,
        headlines: headlineText, icons: iconsText,
    }
    await contentModel.checkAllCardDetailValues(values);
  
    await contentModel.deleteContentByName(title);
  });


  test(`Create fixed price deal type content at the brand level with all fields for a single language default languague english - no LPP '${user.role}'`, async ({ page }) => {
    test.setTimeout(180000);
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
    await page.evaluate("document.body.style.scale='0.9'");
    
    const uniqueId = uuidv4();
  
    const title = (dealTypes.fixedPrice + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.waitContentSkeletonNotVisible();
    await contentModel.onClickDatetimeItem(0);
    await contentModel.waitContentSkeletonNotVisible();
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
    await contentModel.styleCardDetailDropdown.click();
    await contentModel.selectCardDetailType("Standard");
    let cardStylesText = await contentModel.getCardStylesText();
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.fixedPrice);
    await contentModel.setPrice('10');
    await contentModel.setUnits('2');
    await contentModel.setLength(2);
    await contentModel.setHeight(2);
    await contentModel.uploadImageLocation(['src/images/A97.jpg']);
    await contentModel.onClickLinkButton();
    await contentModel.setClickLink(contentData.clickLink);
    await contentModel.onClickSubmitButton();
    await contentModel.onClickDateRangeButton();
    const [startsOnDate, expiresDate] = await contentModel.getDateRangeData();
    await contentModel.setUpc(contentData.upc);
    await contentModel.selectHeadlines(0);
    let headlineText = await contentModel.getHeadlineText();
    await contentModel.selectIcons(0);
    let iconsText = await contentModel.getIconsText();
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    let categoryText = await contentModel.getCategoryText();
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.fixedPrice, brandsData.onlyContent, user.role);
  
    await contentModel.selectContentItem(title);
    const values = {
        title: title,
        category: categoryText,
        dealType: dealTypes.fixedPrice,
        contentData: contentData.image,
        videoType: videoType.youtube,
        videoId: contentData.youtubeVideo,
        price: '10', units: '2',
        length: '2', height: '2',
        cardStyle: cardStylesText,
        startsOnDate: startsOnDate,
        expiresDate: expiresDate,
        headlines: headlineText, icons: iconsText,
    }
    await contentModel.checkAllCardDetailValues(values);
  
    await contentModel.deleteContentByName(title);
  });


  test(`Create Buy X Get Y For Z deal type content at brand level with all fields for a single language default languague english - no LPP '${user.role}'`, async ({ page }) => {
    test.setTimeout(180000);
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
    await page.evaluate("document.body.style.scale='0.9'");
    
    const uniqueId = uuidv4();
  
    const title = (dealTypes.bogo + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.waitContentSkeletonNotVisible();
    await contentModel.onClickDatetimeItem(0);
    await contentModel.waitContentSkeletonNotVisible();
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
    await contentModel.styleCardDetailDropdown.click();
    await contentModel.selectCardDetailType("Standard");
    let cardStylesText = await contentModel.getCardStylesText();
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.bogo);
    await contentModel.setQuantity('2');
    await contentModel.setGetQuantityPrice('5');
    await contentModel.setLength(2);
    await contentModel.setHeight(2);
    await contentModel.uploadImageLocation(['src/images/A97.jpg']);
    await contentModel.onClickLinkButton();
    await contentModel.setClickLink(contentData.clickLink);
    await contentModel.onClickSubmitButton();
    await contentModel.onClickDateRangeButton();
    const [startsOnDate, expiresDate] = await contentModel.getDateRangeData();
    await contentModel.setUpc(contentData.upc);
    await contentModel.selectHeadlines(0);
    let headlineText = await contentModel.getHeadlineText();
    await contentModel.selectIcons(0);
    let iconsText = await contentModel.getIconsText();
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    let categoryText = await contentModel.getCategoryText();
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.bogo, brandsData.onlyContent, user.role);
  
    await contentModel.selectContentItem(title);
    const values = {
        title: title,
        category: categoryText,
        dealType: dealTypes.bogo,
        contentData: 'Image',
        videoType: videoType.youtube,
        videoId: contentData.youtubeVideo,
        x: '2', y: '5', z:'FREE',
        length: '2', height: '2',
        cardStyle: cardStylesText,
        startsOnDate: startsOnDate,
        expiresDate: expiresDate,
        headlines: headlineText, icons: iconsText,
    }
    await contentModel.checkAllCardDetailValues(values);
  
    await contentModel.deleteContentByName(title);
  });


  test(`Create # for Price deal type content at brand level with all fields for a single language default languague english - no LPP '${user.role}'`, async ({ page }) => {
    test.setTimeout(180000);
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
    await page.evaluate("document.body.style.scale='0.9'");
    
    const uniqueId = uuidv4();
  
    const title = (dealTypes.numberForPrice + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.waitContentSkeletonNotVisible();
    await contentModel.onClickDatetimeItem(0);
    await contentModel.waitContentSkeletonNotVisible();
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
    await contentModel.styleCardDetailDropdown.click();
    await contentModel.selectCardDetailType("Standard");
    let cardStylesText = await contentModel.getCardStylesText();
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.numberForPrice);
    await contentModel.setQtyForPrice('2');
    await contentModel.setPriceForPrice('10');
    await contentModel.setUnitsForPrice('2');
    await contentModel.setLength(2);
    await contentModel.setHeight(2);
    await contentModel.uploadImageLocation(['src/images/A97.jpg']);
    await contentModel.onClickLinkButton();
    await contentModel.setClickLink(contentData.clickLink);
    await contentModel.onClickSubmitButton();
    await contentModel.onClickDateRangeButton();
    const [startsOnDate, expiresDate] = await contentModel.getDateRangeData();
    await contentModel.setUpc(contentData.upc);
    await contentModel.selectHeadlines(0);
    let headlineText = await contentModel.getHeadlineText();
    await contentModel.selectIcons(0);
    let iconsText = await contentModel.getIconsText();
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    let categoryText = await contentModel.getCategoryText();
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.numberForPrice, brandsData.onlyContent, user.role);
  
    await contentModel.selectContentItem(title);
    const values = {
        title: title,
        category: categoryText,
        dealType: dealTypes.numberForPrice,
        contentData: contentData.image,
        videoType: videoType.youtube,
        videoId: contentData.youtubeVideo,
        x: '2', y: '5', z:'FREE',
        length: '2', height: '2',
        cardStyle: cardStylesText,
        startsOnDate: startsOnDate,
        expiresDate: expiresDate,
        headlines: headlineText, icons: iconsText,
    }
    await contentModel.checkAllCardDetailValues(values);
  
    await contentModel.deleteContentByName(title);
  });


  test(`Create Amount Off monetary deal type content at brand level with all fields for a single language default languague english - no LPP '${user.role}'`, async ({ page }) => {
    test.setTimeout(180000);
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
    await page.evaluate("document.body.style.scale='0.9'");
    
    const uniqueId = uuidv4();
  
    const title = (dealTypes.amountOff + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.waitContentSkeletonNotVisible();
    await contentModel.onClickDatetimeItem(0);
    await contentModel.waitContentSkeletonNotVisible();
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
    await contentModel.styleCardDetailDropdown.click();
    await contentModel.selectCardDetailType("Standard");
    let cardStylesText = await contentModel.getCardStylesText();
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.amountOff);
    await contentModel.setPriceAmountOff('10.00');
    await contentModel.setLength(2);
    await contentModel.setHeight(2);
    await contentModel.uploadImageLocation(['src/images/A97.jpg']);
    await contentModel.onClickLinkButton();
    await contentModel.setClickLink(contentData.clickLink);
    await contentModel.onClickSubmitButton();
    await contentModel.onClickDateRangeButton();
    const [startsOnDate, expiresDate] = await contentModel.getDateRangeData();
    await contentModel.setUpc(contentData.upc);
    await contentModel.selectHeadlines(0);
    let headlineText = await contentModel.getHeadlineText();
    await contentModel.selectIcons(0);
    let iconsText = await contentModel.getIconsText();
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    let categoryText = await contentModel.getCategoryText();
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.amountOff, brandsData.onlyContent, user.role);
  
    await contentModel.selectContentItem(title);
    const values = {
        title: title,
        category: categoryText,
        dealType: dealTypes.amountOff,
        contentData: contentData.image,
        videoType: videoType.youtube,
        videoId: contentData.youtubeVideo,
        amountOffType: amountOffType.monetary,
        price: '10.00',
        length: '2', height: '2',
        cardStyle: cardStylesText,
        startsOnDate: startsOnDate,
        expiresDate: expiresDate,
        headlines: headlineText, icons: iconsText,
    }
    await contentModel.checkAllCardDetailValues(values);
  
    await contentModel.deleteContentByName(title);
  });


  test(`Create Amount Off percent deal type content at brand level with all fields for a single language default languague english - no LPP '${user.role}'`, async ({ page }) => {
    test.setTimeout(180000);
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
    await page.evaluate("document.body.style.scale='0.9'");
    
    const uniqueId = uuidv4();
  
    const title = (dealTypes.amountOff + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.waitContentSkeletonNotVisible();
    await contentModel.onClickDatetimeItem(0);
    await contentModel.waitContentSkeletonNotVisible();
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
    await contentModel.styleCardDetailDropdown.click();
    await contentModel.selectCardDetailType("Standard");
    let cardStylesText = await contentModel.getCardStylesText();
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.amountOff);
    await contentModel.verifyThatNoDropdownMenuIsNotDisplayed();
    await contentModel.selectDealTypeAmountOff(amountOffType.percentage);
    await contentModel.setPriceAmountOff('10.00');
    await contentModel.setLength(2);
    await contentModel.setHeight(2);
    await contentModel.uploadImageLocation(['src/images/A97.jpg']);
    await contentModel.onClickLinkButton();
    await contentModel.setClickLink(contentData.clickLink);
    await contentModel.onClickSubmitButton();
    await contentModel.onClickDateRangeButton();
    const [startsOnDate, expiresDate] = await contentModel.getDateRangeData();
    await contentModel.setUpc(contentData.upc);
    await contentModel.selectHeadlines(0);
    let headlineText = await contentModel.getHeadlineText();
    await contentModel.selectIcons(0);
    let iconsText = await contentModel.getIconsText();
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    let categoryText = await contentModel.getCategoryText();
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.amountOff, brandsData.onlyContent, user.role);
  
    await contentModel.selectContentItem(title);
    const values = {
      title: title,
      category: categoryText,
      dealType: dealTypes.amountOff,
      contentData: contentData.image,
      videoType: videoType.youtube,
      videoId: contentData.youtubeVideo,
      amountOffType: amountOffType.percentage,
      price: '10.00',
      length: '2', height: '2',
      cardStyle: cardStylesText,
      startsOnDate: startsOnDate,
      expiresDate: expiresDate,
      headlines: headlineText, icons: iconsText,
    }
    await contentModel.checkAllCardDetailValues(values);
  
    await contentModel.deleteContentByName(title);
  });


  test(`Create No Price deal type content at brand level with all fields for a single language default languague english - no LPP '${user.role}'`, async ({ page }) => {
    test.setTimeout(180000);
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
    await page.evaluate("document.body.style.scale='0.9'");
    
    const uniqueId = uuidv4();
  
    const title = (dealTypes.noPrice + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.waitContentSkeletonNotVisible();
    await contentModel.onClickDatetimeItem(0);
    await contentModel.waitContentSkeletonNotVisible();
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
    await contentModel.styleCardDetailDropdown.click();
    await contentModel.selectCardDetailType("Standard");
    let cardStylesText = await contentModel.getCardStylesText();
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.noPrice);
    await contentModel.setLength(2);
    await contentModel.setHeight(2);
    await contentModel.uploadImageLocation(['src/images/A97.jpg']);
    await contentModel.onClickLinkButton();
    await contentModel.setClickLink(contentData.clickLink);
    await contentModel.onClickSubmitButton();
    await contentModel.onClickDateRangeButton();
    const [startsOnDate, expiresDate] = await contentModel.getDateRangeData();
    await contentModel.setUpc(contentData.upc);
    await contentModel.selectHeadlines(0);
    let headlineText = await contentModel.getHeadlineText();
    await contentModel.selectIcons(0);
    let iconsText = await contentModel.getIconsText();
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    let categoryText = await contentModel.getCategoryText();
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.noPrice, brandsData.onlyContent, user.role);
  
    await contentModel.selectContentItem(title);
    const values = {
      title: title,
      category: categoryText,
      dealType: dealTypes.noPrice,
      contentData: contentData.image,
      videoType: videoType.youtube,
      videoId: contentData.youtubeVideo,
      length: '2', height: '2',
      cardStyle: cardStylesText,
      startsOnDate: startsOnDate,
      expiresDate: expiresDate,
      headlines: headlineText, icons: iconsText,
    }
    await contentModel.checkAllCardDetailValues(values);
  
    await contentModel.deleteContentByName(title);
  });


  test(`Create Vendor Coupon deal type content at brand level with all fields for a single language default languague english - no LPP '${user.role}'`, async ({ page }) => {
    test.setTimeout(180000);
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
    await page.evaluate("document.body.style.scale='0.9'");
    
    const uniqueId = uuidv4();
  
    const title = (dealTypes.vendorCoupon + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.waitContentSkeletonNotVisible();
    await contentModel.onClickDatetimeItem(0);
    await contentModel.waitContentSkeletonNotVisible();
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
    await contentModel.styleCardDetailDropdown.click();
    await contentModel.selectCardDetailType("Standard");
    let cardStylesText = await contentModel.getCardStylesText();
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.vendorCoupon);
    await contentModel.setLength(2);
    await contentModel.setHeight(2);
    await contentModel.uploadImageLocation(['src/images/A97.jpg']);
    await contentModel.onClickLinkButton();
    await contentModel.setClickLink(contentData.clickLink);
    await contentModel.onClickSubmitButton();
    await contentModel.onClickDateRangeButton();
    const [startsOnDate, expiresDate] = await contentModel.getDateRangeData();
    await contentModel.setUpc(contentData.upc);
    await contentModel.selectHeadlines(0);
    let headlineText = await contentModel.getHeadlineText();
    await contentModel.selectIcons(0);
    let iconsText = await contentModel.getIconsText();
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    let categoryText = await contentModel.getCategoryText();
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.vendorCoupon, brandsData.onlyContent, user.role);
  
    await contentModel.selectContentItem(title);
    const values = {
      title: title,
      category: categoryText,
      dealType: dealTypes.vendorCoupon,
      contentData: contentData.image,
      videoType: videoType.youtube,
      videoId: contentData.youtubeVideo,
      length: '2', height: '2',
      cardStyle: cardStylesText,
      startsOnDate: startsOnDate,
      expiresDate: expiresDate,
      headlines: headlineText, icons: iconsText,
    }
    await contentModel.checkAllCardDetailValues(values);
  
    await contentModel.deleteContentByName(title);
  });


  test(`Create Share Category deal type content at brand level with all fields for a single language default languague english - no LPP '${user.role}'`, async ({ page }) => {
    test.setTimeout(180000);
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
    await page.evaluate("document.body.style.scale='0.9'");
    
    const uniqueId = uuidv4();
  
    const title = (dealTypes.shareCategory + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.waitContentSkeletonNotVisible();
    await contentModel.onClickDatetimeItem(0);
    await contentModel.waitContentSkeletonNotVisible();
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
    await contentModel.styleCardDetailDropdown.click();
    await contentModel.selectCardDetailType("Standard");
    let cardStylesText = await contentModel.getCardStylesText();
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.shareCategory);
    await contentModel.setLength(2);
    await contentModel.setHeight(2);
    await contentModel.uploadImageLocation(['src/images/A97.jpg']);
    await contentModel.onClickLinkButton();
    await contentModel.setClickLink(contentData.clickLink);
    await contentModel.onClickSubmitButton();
    await contentModel.onClickDateRangeButton();
    const [startsOnDate, expiresDate] = await contentModel.getDateRangeData();
    await contentModel.setUpc(contentData.upc);
    await contentModel.selectHeadlines(0);
    let headlineText = await contentModel.getHeadlineText();
    await contentModel.selectIcons(0);
    let iconsText = await contentModel.getIconsText();
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    let categoryText = await contentModel.getCategoryText();
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.shareCategory, brandsData.onlyContent, user.role);
  
    await contentModel.selectContentItem(title);
    const values = {
      title: title,
      category: categoryText,
      dealType: dealTypes.shareCategory,
      contentData: contentData.image,
      videoType: videoType.youtube,
      videoId: contentData.youtubeVideo,
      length: '2', height: '2',
      cardStyle: cardStylesText,
      startsOnDate: startsOnDate,
      expiresDate: expiresDate,
      headlines: headlineText, icons: iconsText,
    }
    await contentModel.checkAllCardDetailValues(values);
  
    await contentModel.deleteContentByName(title);
  });


  test(`Create Recipe deal type content at brand level with all fields for a single language default languague english - no LPP '${user.role}'`, async ({ page }) => {
    test.setTimeout(180000);
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
    await page.evaluate("document.body.style.scale='0.9'");
    
    const uniqueId = uuidv4();
  
    const title = (dealTypes.recipe + uniqueId).slice(0, 30);
    await contentModel.verifyDeleteButtonIsDisplayed();
    await contentModel.waitContentSkeletonNotVisible();
    await contentModel.onClickDatetimeItem(0);
    await contentModel.waitContentSkeletonNotVisible();
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
    await contentModel.styleCardDetailDropdown.click();
    await contentModel.selectCardDetailType("Standard");
    let cardStylesText = await contentModel.getCardStylesText();
    await contentModel.dealDropdown.click();
    await contentModel.selectDealType(dealTypes.recipe);
    await contentModel.selectRecipe(0);
    const recipeSelected = await contentModel.recipeDropdown.locator('span.p-dropdown-label').innerText();
    await contentModel.setLength(2);
    await contentModel.setHeight(2);
    await contentModel.uploadImageLocation(['src/images/A97.jpg']);
    await contentModel.onClickLinkButton();
    await contentModel.setClickLink(contentData.clickLink);
    await contentModel.onClickSubmitButton();
    await contentModel.onClickDateRangeButton();
    const [startsOnDate, expiresDate] = await contentModel.getDateRangeData();
    await contentModel.setUpc(contentData.upc);
    await contentModel.selectHeadlines(0);
    let headlineText = await contentModel.getHeadlineText();
    await contentModel.selectIcons(0);
    let iconsText = await contentModel.getIconsText();
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    let categoryText = await contentModel.getCategoryText();
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.recipe, brandsData.onlyContent, user.role);
  
    await contentModel.selectContentItem(title);
    const values = {
      title: title,
      category: categoryText,
      dealType: dealTypes.recipe,
      contentData: contentData.image,
      videoType: videoType.youtube,
      videoId: contentData.youtubeVideo,
      recipeName: recipeSelected,
      length: '2', height: '2',
      cardStyle: cardStylesText,
      startsOnDate: startsOnDate,
      expiresDate: expiresDate,
      headlines: headlineText, icons: iconsText,
    }
    await contentModel.checkAllCardDetailValues(values);
  
    await contentModel.deleteContentByName(title);
  });

  test(`Create # / Price deal type card at brand level with all fields for a single language default language English - no LPP'${user.role}'`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 800});
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
    const title = (dealTypes.numberSlashPrice + uniqueId).slice(0, 40);

    await contentModel.clickDealMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();

    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    await contentModel.titleInput.click();
    await contentModel.titleInput.fill(title);

    await contentModel.descriptionInput.fill('card description');
    await contentModel.dateTextField.dblclick();
    await contentModel.dateTextField.fill('card date');

    await page.waitForTimeout(500);

    await contentModel.setLength(2);
    await contentModel.setHeight(3);
    
    await contentModel.dateRangeCardDetailBtn.click();
    await contentModel.startsOnInput.fill('2024-06-15, 12:00 AM');
    await contentModel.expiresInput.fill('2024-06-25, 11:59 PM');
    

    await contentModel.dealDropdown.click();

    await contentModel.selectDealType(dealTypes.numberSlashPrice);
    await page.waitForTimeout(500);
    await contentModel.qtyField.fill('2');
    await contentModel.pField.fill('5.00');
    await contentModel.units2Field.fill('pcs');
    await page.waitForTimeout(500);

    await contentModel.selectIcons(2);
    await contentModel.selectHeadlines(2);

    await contentModel.upcField.fill('123454321');
    await contentModel.styleCardDetailDropdown.click();
    await page.waitForTimeout(500);
    await page.locator('[aria-label="New Card Style"]').click();

    await contentModel.linkCardDetailBtn.click();
    await contentModel.clickLinkCardDetailInput.fill('https://www.youtube.com/');
    await contentModel.submitBtn.click();

    await contentModel.uploadImageLocation(['src/images/A97.jpg']);
    await contentModel.waitUntilContentSpinnerDisappears();

    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(2);

    await contentModel.cardDetailLabel.click();

    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);

    await contentModel.newContentIsCreated(title, dealTypes.numberSlashPrice, brandsData.onlyContent, user.role);

    await contentModel.deleteContentByName(title);
  });

  test(`Create Save Amount monetary deal type card at brand level with all fields for a single language default language English - no LPP'${user.role}'`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 800});
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
    const title = (dealTypes.saveAmount + uniqueId).slice(0, 40);

    await contentModel.clickDealMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();

    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    await contentModel.titleInput.click();
    await contentModel.titleInput.fill(title);

    await contentModel.descriptionInput.fill('card description');
    await contentModel.dateTextField.dblclick();
    await contentModel.dateTextField.fill('card date');

    await page.waitForTimeout(500);

    await contentModel.setLength(2);
    await contentModel.setHeight(3);
    
    await contentModel.dateRangeCardDetailBtn.click();
    await contentModel.startsOnInput.fill('2024-06-15, 12:00 AM');
    await contentModel.expiresInput.fill('2024-06-25, 11:59 PM');
    

    await contentModel.dealDropdown.click();

    await contentModel.selectDealType(dealTypes.saveAmount);
    await page.waitForTimeout(1000);
    await contentModel.priceMonetaryField.fill('5.00');
    await page.waitForTimeout(300);

    await contentModel.selectIcons(2);
    await contentModel.selectHeadlines(2);

    await contentModel.upcField.fill('123454321');
    await contentModel.styleCardDetailDropdown.click();
    await page.waitForTimeout(500);
    await page.locator('[aria-label="New Card Style"]').click();

    await contentModel.linkCardDetailBtn.click();
    await contentModel.clickLinkCardDetailInput.fill('https://www.youtube.com/');
    await contentModel.submitBtn.click();

    await contentModel.uploadImageLocation(['src/images/A97.jpg']);
    await contentModel.waitUntilContentSpinnerDisappears();

    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(2);

    await contentModel.cardDetailLabel.click();

    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);

    await contentModel.newContentIsCreated(title, dealTypes.saveAmount, brandsData.onlyContent, user.role);

    await contentModel.deleteContentByName(title);
  });

  test(`Create Save Amount percent deal type card at brand level with all fields for a single language default language English - no LPP'${user.role}'`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 800});
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
    const title = (dealTypes.saveAmount + uniqueId).slice(0, 40);

    await contentModel.clickDealMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();

    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    await contentModel.titleInput.click();
    await contentModel.titleInput.fill(title);

    await contentModel.descriptionInput.fill('card description');
    await contentModel.dateTextField.dblclick();
    await contentModel.dateTextField.fill('card date');

    await page.waitForTimeout(500);

    await contentModel.setLength(2);
    await contentModel.setHeight(3);
    
    await contentModel.dateRangeCardDetailBtn.click();
    await contentModel.startsOnInput.fill('2024-06-15, 12:00 AM');
    await contentModel.expiresInput.fill('2024-06-25, 11:59 PM');
    

    await contentModel.dealDropdown.click();

    await contentModel.selectDealType(dealTypes.saveAmount);
    await page.waitForTimeout(500);

    await contentModel.amountOffDropdownOptions.filter({ hasText: 'Monetary' }).click();
    await contentModel.selectAmountOffType('Percent');

    await page.waitForTimeout(500);
    await contentModel.priceMonetaryField.fill('99');
    await page.waitForTimeout(300);

    await contentModel.selectIcons(2);
    await contentModel.selectHeadlines(2);

    await contentModel.upcField.fill('123454321');
    await contentModel.styleCardDetailDropdown.click();
    await page.waitForTimeout(500);
    await page.locator('[aria-label="New Card Style"]').click();

    await contentModel.linkCardDetailBtn.click();
    await contentModel.clickLinkCardDetailInput.type('https://www.youtube.com/');
    await contentModel.submitBtn.click();

    await contentModel.uploadImageLocation(['src/images/A97.jpg']);
    await contentModel.waitUntilContentSpinnerDisappears();

    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(2);

    await contentModel.cardDetailLabel.click();

    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);

    await contentModel.newContentIsCreated(title, dealTypes.saveAmount, brandsData.onlyContent, user.role);

    await contentModel.deleteContentByName(title);
  });

  test(`Create From X deal type card at brand level with all fields for a single language default language English - no LPP'${user.role}'`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 800});
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
    const title = (dealTypes.fromX + uniqueId).slice(0, 40);

    await contentModel.clickDealMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();

    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    await contentModel.titleInput.click();
    await contentModel.titleInput.fill(title);

    await contentModel.descriptionInput.fill('card description');
    await contentModel.dateTextField.dblclick();
    await contentModel.dateTextField.fill('card date');

    await page.waitForTimeout(500);

    await contentModel.setLength(2);
    await contentModel.setHeight(3);
    
    await contentModel.dateRangeCardDetailBtn.click();
    await contentModel.startsOnInput.fill('2024-06-15, 12:00 AM');
    await contentModel.expiresInput.fill('2024-06-25, 11:59 PM');
    

    await contentModel.dealDropdown.click();

    await contentModel.selectDealType(dealTypes.fromX);

    await page.waitForTimeout(500);
    await contentModel.pField.fill('9.99');
    await page.waitForTimeout(300);

    await contentModel.selectIcons(2);
    await contentModel.selectHeadlines(2);

    await contentModel.upcField.fill('123454321');
    await contentModel.styleCardDetailDropdown.click();
    await page.waitForTimeout(500);
    await page.locator('[aria-label="New Card Style"]').click();

    await contentModel.linkCardDetailBtn.click();
    await contentModel.clickLinkCardDetailInput.fill('https://www.youtube.com/');
    await contentModel.submitBtn.click();

    await contentModel.uploadImageLocation(['src/images/A97.jpg']);
    await contentModel.waitUntilContentSpinnerDisappears();

    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(2);

    await contentModel.cardDetailLabel.click();

    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);

    await contentModel.newContentIsCreated(title, dealTypes.fromX, brandsData.onlyContent, user.role);

    await contentModel.deleteContentByName(title);
  });

});

test(`Verify that the circular start dates match the edited nodes circulars start day of week and time of day and timezone at brand level`, async ({ page }) => {
  await page.goto(url);
  await page.setViewportSize({width: 1600, height: 1600});
  const loginModel = new LoginModel(page);
  const sideBarModel = new SidebarModel(page);
  const topBarModel = new TopBarModel(page);
  const contentModel = new ContentModel(page);
  const commonModel = new CommonModel(page);
  const brandModel = new BrandsModel(page);

  await loginModel.login(users[0].username, users[0].password);
  if(users[0].role == rolesData.superAdmin || users[0].role == rolesData.admin) { 
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();
    await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, brandsData.subBrand);
    await commonModel.waitUntilSpinnerDisappears();
   }
  await commonModel.waitUntilSpinnerDisappears();
  await sideBarModel.onClickBrandOptionMenu();
  await commonModel.waitUntilSpinnerDisappears();
  //await page.waitForURL('**/admin/brands');
  await page.evaluate("document.body.style.scale='0.7'");

  await brandModel.brandTableVisible();
  await commonModel.setSearchValue(brandsData.onlyContent);
  await brandModel.brandTableShouldHasOneRow();

  await brandModel.goToManageNodes(brandsData.onlyContent);
  await brandModel.hasBrandHierarchyTableValues(3);
  await brandModel.openEditNodePopUp(brandsData.onlyContent);
  await brandModel.setNodeSiteTitle(subBrandData.name);
  await brandModel.setNodeSiteDescription(subBrandData.siteDesc);
  await brandModel.setStoreDisplayText(subBrandData.storeDisplayText);
  await brandModel.selectCircularStartDayOption('Wednesday');
  await brandModel.selectCircularDayStartTime('0815');
  await brandModel.selectCircularTimezone(timezones.mountain);
  await brandModel.hasNodeRequiredValues();
  await brandModel.onClickNodeSaveButton();
  await brandModel.cancelButton.waitFor();
  await commonModel.waitUntilSpinnerDisappears();

  await brandModel.openEditNodePopUp(brandsData.onlyContent);
  await brandModel.storeCircularStartDayDropdown.first().waitFor();
  await brandModel.storeCircularStartDayDropdown.scrollIntoViewIfNeeded();
  const startDayValue = await brandModel.storeCircularStartDayDropdown.inputValue();
  const circularStartTime = await brandModel.storeCircularDayStartTimeInput.inputValue();
  const circularTimezone = await brandModel.circularTimezoneDropdown.locator('span > span').innerText();
  await brandModel.cancelButton.click();
  await brandModel.goToManageContentView(brandsData.onlyContent);

  await contentModel.checkTimesOnContentView(startDayValue, circularStartTime, circularTimezone);
});

users.forEach(user =>{

  test.skip(`Verify that it is possible to create manual Static content No Price from the content bulk upload / Brand Level CDL off '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 2000});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);
    const categoriesModel = new CategoriesModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent); 
      await categoriesModel.ensureAtLeastOneBrowseCategoryExistsWithName('Fruits');
    }
    await commonModel.waitUntilSpinnerDisappears();
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    await contentModel.onClickBulkItemBtn();
    await contentModel.checkBulkCurrentStep(contentData.uploadMedia);
    await contentModel.nextButton.click();
    await contentModel.checkBulkCurrentStep(contentData.selectDateRange);
    await contentModel.nextButton.click();
    await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestCompleteSA.xlsx'], contentModel.chooseButton);
    await contentModel.checkBulkCurrentStep(contentData.contentUpload);
    await contentModel.nextButton.click();
    await commonModel.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.categoryManagement);
    await contentModel.categoryMessages.hover();
    await contentModel.nextButton.click();
    await commonModel.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.review);

    const uniqueId = uuidv4();
    const title = (dealTypes.static + uniqueId).slice(0, 40);
    await contentModel.onClickCreateContentBtn();
    await contentModel.verifyThatImageLoaderIsVisible();
    await contentModel.setTitleEditContent(title);
    await contentModel.selectCategoryEditContent();
    await contentModel.selectCategory(0);
    await contentModel.selectDealTypeEditContent(dealTypes.static);
    await contentModel.onClickSaveBtn();
    await commonModel.waitUntilSpinnerDisappears();
    await contentModel.verifyThatImageLoaderIsNotVisible();

    await contentModel.checkContentInBulkTable(title, 'static');
  });


  test.skip(`Verify that it is possible to create manual Fixed Price content from the content bulk upload / Brand Level CDL off '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 2000});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);
    const categoriesModel = new CategoriesModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent); 
      await categoriesModel.ensureAtLeastOneBrowseCategoryExistsWithName('Fruits');
    }
    await commonModel.waitUntilSpinnerDisappears();
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    await contentModel.onClickBulkItemBtn();
    await contentModel.checkBulkCurrentStep(contentData.uploadMedia);
    await contentModel.nextButton.click();
    await contentModel.checkBulkCurrentStep(contentData.selectDateRange);
    await contentModel.nextButton.click();
    await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestCompleteSA.xlsx'], contentModel.chooseButton);
    await contentModel.checkBulkCurrentStep(contentData.contentUpload);
    await contentModel.nextButton.click();
    await commonModel.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.categoryManagement);
    await contentModel.categoryMessages.hover();
    await contentModel.nextButton.click();
    await commonModel.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.review);

    const uniqueId = uuidv4();
    const title = (dealTypes.fixedPrice + uniqueId).slice(0, 40);
    await contentModel.onClickCreateContentBtn();
    await contentModel.verifyThatImageLoaderIsVisible();
    await contentModel.setTitleEditContent(title);
    await contentModel.selectCategoryEditContent(2);
    await contentModel.selectCategory(0);
    await contentModel.selectDealTypeEditContent(dealTypes.fixedPrice);
    await contentModel.editContentsetPrice('10.00');
    await contentModel.editContentsetUnits('2');
    await contentModel.onClickSaveBtn();
    await commonModel.waitUntilSpinnerDisappears();
    await contentModel.verifyThatImageLoaderIsNotVisible();

    await contentModel.checkContentInBulkTable(title, 'fixed');

  });

  test.skip(`Verify that it is possible to create manual Buy X Get Y For Z content from the content bulk upload / Brand Level CDL off '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 2000});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);
    const categoriesModel = new CategoriesModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent); 
      await commonModel.waitUntilSpinnerDisappears();
      await categoriesModel.ensureAtLeastOneBrowseCategoryExistsWithName('Fruits');
    }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    await contentModel.onClickBulkItemBtn();
    await contentModel.checkBulkCurrentStep(contentData.uploadMedia);
    await contentModel.nextButton.click();
    await contentModel.checkBulkCurrentStep(contentData.selectDateRange);
    await contentModel.nextButton.click();
    await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestCompleteSA.xlsx'], contentModel.chooseButton);
    await contentModel.checkBulkCurrentStep(contentData.contentUpload);
    await contentModel.nextButton.click();
    await commonModel.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.categoryManagement);
    await contentModel.categoryMessages.hover();
    await contentModel.nextButton.click();
    await commonModel.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.review);

    const uniqueId = uuidv4();
    const title = (dealTypes.bogo + uniqueId).slice(0, 40);
    await contentModel.onClickCreateContentBtn();
    await contentModel.verifyThatImageLoaderIsVisible();
    await contentModel.setTitleEditContent(title);
    await contentModel.selectCategoryEditContent(2);
    await contentModel.selectCategory(0);
    await contentModel.selectDealTypeEditContent(dealTypes.bogo);
    await contentModel.editContentBogoXInputSet('2');
    await contentModel.editContentBogoYInputSet('10.00');
    await contentModel.onClickSaveBtn();
    await commonModel.waitUntilSpinnerDisappears();
    await contentModel.verifyThatImageLoaderIsNotVisible();

    await contentModel.checkContentInBulkTable(title, 'bogo');
  });

  test.skip(`Verify that it is possible to create manual Vendor coupon content from the content bulk upload / Brand Level CDL off '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 2000});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);
    const categoriesModel = new CategoriesModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent); 
      await commonModel.waitUntilSpinnerDisappears();
      await categoriesModel.ensureAtLeastOneBrowseCategoryExistsWithName('Fruits');
    }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    await contentModel.onClickBulkItemBtn();
    await contentModel.checkBulkCurrentStep(contentData.uploadMedia);
    await contentModel.nextButton.click();
    await contentModel.checkBulkCurrentStep(contentData.selectDateRange);
    await contentModel.nextButton.click();
    await contentModel.bulkSelectUpload(['src/uploads/bulkUploadTestCompleteSA.xlsx'], contentModel.chooseButton);
    await contentModel.checkBulkCurrentStep(contentData.contentUpload);
    await contentModel.nextButton.click();
    await commonModel.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.categoryManagement);
    await contentModel.categoryMessages.hover();
    await contentModel.nextButton.click();
    await commonModel.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.review);

    const uniqueId = uuidv4();
    const title = (dealTypes.vendorCoupon + uniqueId).slice(0, 40);
    await contentModel.onClickCreateContentBtn();
    await contentModel.verifyThatImageLoaderIsVisible();
    await contentModel.setTitleEditContent(title);
    await contentModel.editContentUpcInputSet(contentData.upc);
    await contentModel.selectCategoryEditContent(2);
    await contentModel.selectCategory(0);
    await contentModel.selectDealTypeEditContent(dealTypes.vendorCoupon);
    await contentModel.onClickSaveBtn();
    await commonModel.waitUntilSpinnerDisappears();
    await contentModel.verifyThatImageLoaderIsNotVisible();

    await contentModel.checkContentInBulkTable(title, 'coupon-v2');
  });


  test(`Verify that it is not possible to upload content without a title in the content bulk upload '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 2000});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);
    const categoriesModel = new CategoriesModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent);
      await commonModel.waitUntilSpinnerDisappears();
      await categoriesModel.ensureAtLeastOneBrowseCategoryExistsWithName('Fruits');
    }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    await contentModel.onClickBulkItemBtn();
    await contentModel.checkBulkCurrentStep(contentData.uploadMedia);
    await contentModel.nextButton.click();
    await contentModel.checkBulkCurrentStep(contentData.selectDateRange);
    await contentModel.nextButton.click();
    await contentModel.bulkSelectUpload(['src/uploads/Adams20211029.xlsx'], contentModel.chooseButton);
    await contentModel.checkBulkCurrentStep(contentData.contentUpload);
    await contentModel.nextButton.click();
    await commonModel.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.categoryManagement);
    await contentModel.categoryMessages.hover();
    await contentModel.nextButton.click();
    await commonModel.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.review);
    await contentModel.doneButton.click();
    await commonModel.waitUntilSpinnerDisappears();

    await contentModel.verifyAlertMessageMissingTitleIsDisplayed();
  });


  test(`Verify that it is possible to create a content after obtaining the required title validation in the content bulk upload brand '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    test.setTimeout(240000);
    await page.setViewportSize({width: 1600, height: 5000});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);
    const categoriesModel = new CategoriesModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
      await topBarModel.selectBrand(brandsData.onlyContent); 
      await commonModel.waitUntilSpinnerDisappears();
      await categoriesModel.ensureAtLeastOneBrowseCategoryExistsWithName('Fruits');
    }
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await commonModel.waitUntilSpinnerDisappears();

    await contentModel.onClickBulkItemBtn();
    await contentModel.checkBulkCurrentStep(contentData.uploadMedia);
    await contentModel.nextButton.click();
    await contentModel.checkBulkCurrentStep(contentData.selectDateRange);
    await contentModel.nextButton.click();
    await contentModel.bulkSelectUpload(['src/uploads/Adams20211029.xlsx'], contentModel.chooseButton);
    await contentModel.checkBulkCurrentStep(contentData.contentUpload);
    await contentModel.nextButton.click();
    await commonModel.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.categoryManagement);
    await contentModel.categoryMessages.hover();
    await contentModel.nextButton.click();
    await commonModel.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.review);
    await contentModel.doneButton.click();
    await commonModel.waitUntilSpinnerDisappears();

    await contentModel.verifyAlertMessageMissingTitleIsDisplayed();

    const uniqueId = uuidv4();
    const title = (dealTypes.vendorCoupon + uniqueId).slice(0, 40);

    await contentModel.onClickHereToViewMissingField();
    await contentModel.setTitleEditContent(title);
    await contentModel.onClickSaveBtn();
    await contentModel.doneButton.click();
    await commonModel.waitUntilSpinnerDisappears();

    await contentModel.verifyThatManageContentTitleNotVisible();
    await contentModel.verifyThatTheCardDetailPanelVisible();
    await contentModel.newContentIsCreated(title, dealTypes.fixedPrice, brandsData.onlyContent, user.role);

    await contentModel.deleteAllContent(contentBulkDataAdam.Adam);
  });

  test(`Verify that it is possible to create icons for content brand '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 2000});
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

    let iconName = await contentModel.iconName();

    // open the create icon option
    await contentModel.clickMediaIconsMenu();

    //Click the icons select menu
    await contentModel.onClickIconsField();

    //Click the add new icon button
    await contentModel.onClickAddNewHeadlineOrIcon();

    //Fill the add new icon fields
    await contentModel.setNameIcon(iconName);
    await contentModel.uploadImageButton.click();

    // Upload the logo image
    await contentModel.uploadImage("src/images/high_sugar.webp");

    //Click the save button in the upload image modal
    await contentModel.onClickSaveBtn(1);

    //Click the save button in the Add New Icon modal
    await contentModel.onClickSaveBtn();
    await contentModel.waitIconMenuIsClosed();

    //Verify that the new icon is created
    await contentModel.onClickIconsField();
    await contentModel.findIconCreated(iconName);
  });

  test(`Verify that it is possible to create a Headline for content brand '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 2000});
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

    let headlineName = await contentModel.headlineName();

    await contentModel.waitContentSkeletonNotVisible();

    //Click the headlines menu
    await contentModel.clickHeadlinesMenu();

    //Click the icons select menu
    await contentModel.headlinesSelect.click();

    //Click the add new icon button
    await contentModel.onClickAddNewHeadlineOrIcon();

    //Fill the add new headline
    await contentModel.setNameHeadline(headlineName);

    //Click the save button in the add new headline modal
    await contentModel.onClickSaveBtn();

    //Verify that the new icon is created
    await contentModel.headlinesSelect.click();
    await contentModel.verifyTheHeadlineIsCreated(headlineName);
  });


  test(`Verify that it is not possible to save a headline with empty fields brand level '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 2000});
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

    let headlineName = await contentModel.headlineName();

    await contentModel.waitContentSkeletonNotVisible();

    //Click the headlines menu
    await contentModel.clickHeadlinesMenu();

    //Click the icons select menu
    await contentModel.headlinesSelect.click();

    //Click the add new icon button
    await contentModel.onClickAddNewHeadlineOrIcon();

    //Click the save button in the add new headline modal
    await contentModel.onClickSaveBtn();

    //Verify that the alert messaeg is displayed
    await contentModel.verifyThatThealertMessageHeadlineIsDisplayed();
  });


  test(`Verify the validation of the required field in the form to add new icons to the content '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 2000});
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

    let headlineName = await contentModel.headlineName();

    await contentModel.waitContentSkeletonNotVisible();

    //Open the create icon option
    await contentModel.clickMediaIconsMenu();

    //Click the icons select menu
    await contentModel.iconsSelect.click();

    //Click the add new icon button
    await contentModel.onClickAddNewHeadlineOrIcon();

    //Click the save button in the add new headline modal
    await contentModel.onClickSaveBtn();

    //Verify that the alert messaeg is displayed
    await contentModel.verifyThatThealertMessageIconIsDisplayed();
  });

});

test(`Verify that the fields to add coupons to the content are visible when the node has the option Coupon support / deal type fixed price - brands level active`, async ({ page }) => {
  await page.goto(url);
  await page.setViewportSize({width: 1200, height: 1600});
  const loginModel = new LoginModel(page);
  const sideBarModel = new SidebarModel(page);
  const topBarModel = new TopBarModel(page);
  const commonModel = new CommonModel(page);
  const contentModel = new ContentModel(page);
  const brandsModel = new BrandsModel(page);

  await loginModel.login(users[0].username, users[0].password);
  if(users[0].role == rolesData.superAdmin || users[0].role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
  await commonModel.waitUntilSpinnerDisappears();

  await sideBarModel.onClickBrandOptionMenu();
  await commonModel.setSearchValue(brandsData.onlyContent);
  await brandsModel.hasBrandTableValues();
  await brandsModel.goToManageNodes(brandsData.onlyContent);
  await brandsModel.hasNodeTableValues(3);
  await brandsModel.openEditNodePopUp(brandsData.onlyContent);
  await commonModel.checkContentPopupVisible();
  await brandsModel.hasNodeRequiredValues();
  await brandsModel.onClickBrandCouponToogle(true);
  await commonModel.waitUntilSpinnerDisappears();
  await brandsModel.onClickNodeSaveButton();
  await commonModel.waitUntilSpinnerDisappears();

  //Navigate to the content module
  await sideBarModel.onClickContentOptionMenu();

  //Coupons fields
  await contentModel.waitContentSkeletonNotVisible();
  await contentModel.singleItemButton.click();
  await contentModel.hoverHeaders();
  await contentModel.clickDealMenu();
  await contentModel.dealDropdown.click();
  await contentModel.selectDealType(dealTypes.fixedPrice);
  await contentModel.clickCouponsMenu();

  await contentModel.verifyThatCouponAmountOffFieldIsVisible();

  await contentModel.verifyThatCouponLimitFieldIsVisible();

  await contentModel.verifyThatCouponQuantityRequiredFieldIsVisible();

  await sideBarModel.onClickBrandOptionMenu();
  await commonModel.setSearchValue(brandsData.onlyContent);
  await brandsModel.hasBrandTableValues();
  await brandsModel.goToManageNodes(brandsData.onlyContent);
  await brandsModel.hasNodeTableValues(3);
  await brandsModel.openEditNodePopUp(brandsData.onlyContent);
  await commonModel.checkContentPopupVisible();
  await brandsModel.hasNodeRequiredValues();
  await brandsModel.onClickBrandCouponToogle(false);
  await brandsModel.onClickNodeSaveButton();
  await commonModel.waitUntilSpinnerDisappears();
});


test(`Verify that the fields to add coupons to the content are not visible when the node has not the option Coupon support / deal type fixed price`, async ({ page }) => {
  await page.goto(url);
  await page.setViewportSize({width: 1200, height: 1600});
  const loginModel = new LoginModel(page);
  const sideBarModel = new SidebarModel(page);
  const topBarModel = new TopBarModel(page);
  const commonModel = new CommonModel(page);
  const contentModel = new ContentModel(page);
  const brandsModel = new BrandsModel(page);

  await loginModel.login(users[0].username, users[0].password);
  if(users[0].role == rolesData.superAdmin || users[0].role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
  await commonModel.waitUntilSpinnerDisappears();
  if(users[0].role == rolesData.superAdmin || users[0].role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
  await commonModel.waitUntilSpinnerDisappears();

  await sideBarModel.onClickBrandOptionMenu();
  await commonModel.setSearchValue(brandsData.onlyContent);
  await brandsModel.hasBrandTableValues();
  await brandsModel.goToManageNodes(brandsData.onlyContent);
  await brandsModel.hasNodeTableValues(3);
  await brandsModel.openEditNodePopUp(brandsData.onlyContent);
  await commonModel.checkContentPopupVisible();
  await brandsModel.hasNodeRequiredValues();
  await brandsModel.onClickCouponSupport(false);
  await brandsModel.onClickNodeSaveButton();

  //Navigate to the content module
  await sideBarModel.onClickContentOptionMenu();

  //Coupons fields
  await contentModel.onClikSingleItemBtn();
  await contentModel.hoverHeaders();
  await contentModel.clickDealMenu();
  await contentModel.dealDropdown.click();
  await contentModel.selectDealType(dealTypes.fixedPrice);
  await contentModel.verifyCouponsMenuNotVisible();
});


test(`Verify that it is possible to create deal type fixed content with coupons fields brand - level`, async ({ page }) => {
  await page.goto(url);
  await page.setViewportSize({width: 1200, height: 1600});
  const loginModel = new LoginModel(page);
  const sideBarModel = new SidebarModel(page);
  const topBarModel = new TopBarModel(page);
  const commonModel = new CommonModel(page);
  const contentModel = new ContentModel(page);
  const brandsModel = new BrandsModel(page);

  await loginModel.login(users[0].username, users[0].password);
  if(users[0].role == rolesData.superAdmin || users[0].role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
  await commonModel.waitUntilSpinnerDisappears();
  if(users[0].role == rolesData.superAdmin || users[0].role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
  await commonModel.waitUntilSpinnerDisappears();

  await sideBarModel.onClickBrandOptionMenu();
  await commonModel.setSearchValue(brandsData.onlyContent);
  await brandsModel.hasBrandTableValues();
  await brandsModel.goToManageNodes(brandsData.onlyContent);
  await brandsModel.hasNodeTableValues(3);
  await brandsModel.openEditNodePopUp(brandsData.onlyContent);
  await commonModel.checkContentPopupVisible();
  await brandsModel.hasNodeRequiredValues();
  await brandsModel.onClickBrandCouponToogle(true);
  await brandsModel.onClickNodeSaveButton();

  //Navigate to the content module
  await sideBarModel.onClickContentOptionMenu();

  const uniqueId = uuidv4();

  const title = (dealTypes.static + uniqueId).slice(0, 30);

  // Fill the new card detail fields
  await contentModel.onClikSingleItemBtn();
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
  await contentModel.setPrice("3");
  await contentModel.setUnits("2");
  //await contentModel.clickCouponsMenu();
  await contentModel.couponAmountOffField.click();
  await commonModel.inputTextInLocator(contentModel.couponAmountOffField, "1");
  await contentModel.couponQuantityRequiredField.click();
  await commonModel.inputTextInLocator(contentModel.couponQuantityRequiredField, "1");
  await contentModel.couponLimitField.click();
  await commonModel.inputTextInLocator(contentModel.couponLimitField, "1");
  await contentModel.categoryDropdown.click();
  await contentModel.selectCategory(1);
  await contentModel.cardDetailLabel.click();
  await contentModel.cardDetailLabel.click();
  //await contentModel.singleItemButton.click();
  await contentModel.waitUntilContentSpinnerDisappears();
  await commonModel.setSearchValue(title);
  await contentModel.newContentIsCreated(title, dealTypes.fixedPrice, brandsData.onlyContent);

  await contentModel.deleteContentByName(title);

  await sideBarModel.onClickBrandOptionMenu();
  await commonModel.setSearchValue(brandsData.onlyContent);
  await brandsModel.hasBrandTableValues();
  await brandsModel.goToManageNodes(brandsData.onlyContent);
  await brandsModel.hasNodeTableValues(3);
  await brandsModel.openEditNodePopUp(brandsData.onlyContent);
  await commonModel.checkContentPopupVisible();
  await brandsModel.hasNodeRequiredValues();
  await brandsModel.onClickBrandCouponToogle(false);
  await brandsModel.onClickNodeSaveButton();
  await commonModel.waitUntilSpinnerDisappears();
});


test(`Verify that it is possible to create deal type #for price content with coupons fields brand - level`, async ({ page }) => {
  await page.goto(url);
  await page.setViewportSize({width: 1600, height: 2000});
  const loginModel = new LoginModel(page);
  const sideBarModel = new SidebarModel(page);
  const topBarModel = new TopBarModel(page);
  const commonModel = new CommonModel(page);
  const contentModel = new ContentModel(page);
  const brandsModel = new BrandsModel(page);

  await loginModel.login(users[0].username, users[0].password);
  if(users[0].role == rolesData.superAdmin || users[0].role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
  await commonModel.waitUntilSpinnerDisappears();
  if(users[0].role == rolesData.superAdmin || users[0].role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
  await commonModel.waitUntilSpinnerDisappears();

  await sideBarModel.onClickBrandOptionMenu();
  await commonModel.setSearchValue(brandsData.onlyContent);
  await brandsModel.hasBrandTableValues();
  await brandsModel.goToManageNodes(brandsData.onlyContent);
  await brandsModel.hasNodeTableValues(3);
  await brandsModel.openEditNodePopUp(brandsData.onlyContent);
  await commonModel.checkContentPopupVisible();
  await brandsModel.hasNodeRequiredValues();
  await brandsModel.onClickBrandCouponToogle(true);
  await brandsModel.onClickNodeSaveButton();

  //Navigate to the content module
  await sideBarModel.onClickContentOptionMenu();

  const uniqueId = uuidv4();

  const title = (dealTypes.static + uniqueId).slice(0, 30);

  // Fill the new card detail fields
  await contentModel.onClikSingleItemBtn();
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
  await contentModel.couponAmountOffField.click();
  await commonModel.inputTextInLocator(contentModel.couponAmountOffField, "1");
  await contentModel.couponQuantityRequiredField.click();
  await commonModel.inputTextInLocator(contentModel.couponQuantityRequiredField, "1");
  await contentModel.couponLimitField.click();
  await commonModel.inputTextInLocator(contentModel.couponLimitField, "1");
  await contentModel.categoryDropdown.click();
  await contentModel.selectCategory(1);
  await contentModel.cardDetailLabel.click();
  await contentModel.cardDetailLabel.click();
  //await contentModel.singleItemButton.click();
  await contentModel.waitUntilContentSpinnerDisappears();
  await commonModel.setSearchValue(title);
  await contentModel.newContentIsCreated(title, dealTypes.numberForPrice, brandsData.onlyContent);

  await contentModel.deleteContentByName(title);

  await sideBarModel.onClickBrandOptionMenu();
  await commonModel.setSearchValue(brandsData.onlyContent);
  await brandsModel.hasBrandTableValues();
  await brandsModel.goToManageNodes(brandsData.onlyContent);
  await brandsModel.hasNodeTableValues(3);
  await brandsModel.openEditNodePopUp(brandsData.onlyContent);
  await commonModel.checkContentPopupVisible();
  await brandsModel.hasNodeRequiredValues();
  await brandsModel.onClickBrandCouponToogle(false);
  await brandsModel.onClickNodeSaveButton();
  await commonModel.waitUntilSpinnerDisappears();
});


test(`Coupon fields must be visible when creating store groups content if Coupon support is enabled store-group / Brand`, async ({ page }) => {
  await page.goto(url);
  await page.setViewportSize({width: 1600, height: 2000});
  const loginModel = new LoginModel(page);
  const sideBarModel = new SidebarModel(page);
  const topBarModel = new TopBarModel(page);
  const commonModel = new CommonModel(page);
  const contentModel = new ContentModel(page);
  const brandsModel = new BrandsModel(page);

  await loginModel.login(users[0].username, users[0].password);
  if(users[0].role == rolesData.superAdmin || users[0].role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
  await commonModel.waitUntilSpinnerDisappears();
  if(users[0].role == rolesData.superAdmin || users[0].role == rolesData.admin) { await topBarModel.selectNodeStoreGroupChild("storeGroup"); }
  await commonModel.waitUntilSpinnerDisappears();
 if(users[0].role == rolesData.superAdmin || users[0].role == rolesData.admin) { await sideBarModel.onClickContentOptionMenuStoreGroup(); }
 await commonModel.waitUntilSpinnerDisappears();

  await sideBarModel.onClickBrandOptionMenuStoreGroup();
  await commonModel.setSearchValue(brandsData.onlyContent);
  await brandsModel.hasBrandTableValues();
  await brandsModel.goToManageNodes(brandsData.onlyContent);
  await brandsModel.hasNodeTableValues(3);
  await brandsModel.openEditNodePopUp(brandsData.onlyContent);
  await commonModel.checkContentPopupVisible();
  await brandsModel.hasNodeRequiredValues();
  await brandsModel.onClickBrandCouponToogle(true);
  await brandsModel.onClickNodeSaveButton();

  //Navigate to the content module
  await sideBarModel.onClickContentOptionMenuStoreGroup();

  //Coupons fields
  await contentModel.onClikSingleItemBtn();
  await contentModel.clickGeneralMenu();
  await contentModel.clickDealMenu();
  await contentModel.dealDropdown.click();
  await contentModel.selectDealType(dealTypes.fixedPrice);


  await contentModel.verifyThatCouponAmountOffFieldIsVisible();

  await contentModel.verifyThatCouponLimitFieldIsVisible();

  await contentModel.verifyThatCouponQuantityRequiredFieldIsVisible();

  await sideBarModel.onClickBrandOptionMenuStoreGroup();
  await commonModel.setSearchValue(brandsData.onlyContent);
  await brandsModel.hasBrandTableValues();
  await brandsModel.goToManageNodes(brandsData.onlyContent);
  await brandsModel.hasNodeTableValues(3);
  await brandsModel.openEditNodePopUp(brandsData.onlyContent);
  await commonModel.checkContentPopupVisible();
  await brandsModel.hasNodeRequiredValues();
  await brandsModel.onClickBrandCouponToogle(false);
  await brandsModel.onClickNodeSaveButton();
  await commonModel.waitUntilSpinnerDisappears();
});


test(`Coupon fields should not be visible when creating store group content if the Coupon support store-group / Brand option is not active`, async ({ page }) => {
  await page.goto(url);
  await page.setViewportSize({width: 1600, height: 2000});
  const loginModel = new LoginModel(page);
  const sideBarModel = new SidebarModel(page);
  const topBarModel = new TopBarModel(page);
  const commonModel = new CommonModel(page);
  const contentModel = new ContentModel(page);
  const brandsModel = new BrandsModel(page);

  await loginModel.login(users[0].username, users[0].password);
  if(users[0].role == rolesData.superAdmin || users[0].role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
  await commonModel.waitUntilSpinnerDisappears();
  if(users[0].role == rolesData.superAdmin || users[0].role == rolesData.admin) { await topBarModel.selectNodeStoreGroupChild("storeGroup"); }
  await commonModel.waitUntilSpinnerDisappears();
 if(users[0].role == rolesData.superAdmin || users[0].role == rolesData.admin) { await sideBarModel.onClickContentOptionMenuStoreGroup(); }
 await commonModel.waitUntilSpinnerDisappears();

  await sideBarModel.onClickBrandOptionMenuStoreGroup();
  await commonModel.setSearchValue(brandsData.onlyContent);
  await brandsModel.hasBrandTableValues();
  await brandsModel.goToManageNodes(brandsData.onlyContent);
  await brandsModel.hasNodeTableValues(3);
  await brandsModel.openEditNodePopUp(brandsData.onlyContent);
  await commonModel.checkContentPopupVisible();
  await brandsModel.hasNodeRequiredValues();
  await brandsModel.onClickBrandCouponToogle(false);
  await brandsModel.onClickNodeSaveButton();

  //Navigate to the content module
  await sideBarModel.onClickContentOptionMenuStoreGroup();

  //Coupons fields
  await contentModel.onClikSingleItemBtn();
  //await contentModel.clickGeneralMenu();
  await contentModel.clickDealMenu();
  await contentModel.dealDropdown.click();
  await contentModel.selectDealType(dealTypes.fixedPrice);

  await contentModel.verifyCouponsMenuNotVisible();
});


test(`Verify that the fields to add coupons to the content are visible when the node has the option Coupon support / deal type for price- brands level active`, async ({ page }) => {
  await page.goto(url);
  await page.setViewportSize({width: 1600, height: 2000});
  const loginModel = new LoginModel(page);
  const sideBarModel = new SidebarModel(page);
  const topBarModel = new TopBarModel(page);
  const commonModel = new CommonModel(page);
  const contentModel = new ContentModel(page);
  const brandsModel = new BrandsModel(page);

  await loginModel.login(users[0].username, users[0].password);
  if(users[0].role == rolesData.superAdmin || users[0].role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
  await commonModel.waitUntilSpinnerDisappears();
  if(users[0].role == rolesData.superAdmin || users[0].role == rolesData.admin) { await topBarModel.selectNodeStoreGroupChild("storeGroup"); }
  await commonModel.waitUntilSpinnerDisappears();
 if(users[0].role == rolesData.superAdmin || users[0].role == rolesData.admin) { await sideBarModel.onClickContentOptionMenuStoreGroup(); }
 await commonModel.waitUntilSpinnerDisappears();

  await sideBarModel.onClickBrandOptionMenuStoreGroup();
  await commonModel.setSearchValue(brandsData.onlyContent);
  await brandsModel.hasBrandTableValues();
  await brandsModel.goToManageNodes(brandsData.onlyContent);
  await brandsModel.hasNodeTableValues(3);
  await brandsModel.openEditNodePopUp(brandsData.onlyContent);
  await commonModel.checkContentPopupVisible();
  await brandsModel.hasNodeRequiredValues();
  await brandsModel.onClickBrandCouponToogle(false);
  await brandsModel.onClickNodeSaveButton();

  //Navigate to the content module
  await sideBarModel.onClickContentOptionMenuStoreGroup();

  //Coupons fields
  await contentModel.onClikSingleItemBtn();
  await contentModel.clickDealMenu();
  await contentModel.dealDropdown.click();
  await contentModel.selectDealType(dealTypes.fixedPrice);

  await contentModel.verifyThatCouponAmountOffFieldIsNotVisible();

  await contentModel.verifyThatCouponLimitFieldIsNotVisible();

  await contentModel.verifyThatCouponQuantityRequiredFieldIsNotVisible();
});


test.skip(`Verify that it is possible to add categories from the categories form in the content module Brand Level`, async ({ page }) => {
  await page.goto(url);
  await page.setViewportSize({width: 1600, height: 2000});
  const loginModel = new LoginModel(page);
  const sideBarModel = new SidebarModel(page);
  const topBarModel = new TopBarModel(page);
  const commonModel = new CommonModel(page);
  const contentModel = new ContentModel(page);
  const brandsModel = new BrandsModel(page);

  await loginModel.login(users[0].username, users[0].password);
  if(users[0].role == rolesData.superAdmin || users[0].role == rolesData.admin) { await topBarModel.selectBrand("brandCategory"); }
  await commonModel.waitUntilSpinnerDisappears();

  //Navigate to the content module
  await sideBarModel.onClickContentOptionMenu();

  //Click on add category from category side panel
  //await contentModel.addCategoryButton.click();

  //Fill create category form
  //t.ctx.headlineName = (contentData.headline + uuidv4()).slice(0, 20);
  //await t.typeText(content.categoryNameEnglishField, t.ctx.headlineName);
  //await t.typeText(content.categoryNameSpanishField, t.ctx.headlineName);
  //await t.click(content.saveBtn);
  
  //Verify the category is created in the side menu panel
  //await content.verifyThatTheCategoryisCreated(t.ctx.headlineName);

  //Navigate to the category
  //await sidebar.onClickCategoriesOptionMenu();

  //search the category
  //await t.typeText(common.searchInput, t.ctx.headlineName);

});

users.forEach(user =>{

  test(`New content should not be created when the quantity field is greater than 99 in the bulk upload section '${user.role}'`, async ({ page }) => {
    test.setTimeout(150000);
    await page.goto(url);
    //await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const contentModel = new ContentModel(page);
    const common = new CommonModel(page);

    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.onlyContent); }
    await common.waitUntilSpinnerDisappears();
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await sideBarModel.onClickContentOptionMenu(); }
    await common.waitUntilSpinnerDisappears();

    await contentModel.verifyDeleteButtonIsDisplayed();

    await contentModel.onClickBulkItemBtn();

    await contentModel.bulkSelectUpload(['src/images/A97.jpg'], contentModel.chooseButton);
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.uploadMedia);
    await contentModel.nextButton.click();
    await contentModel.checkBulkCurrentStep(contentData.selectDateRange);
    await contentModel.nextButton.click();
    await contentModel.bulkSelectUpload(['src/uploads/bulkUploadQuantity100.xlsx'], contentModel.chooseButton);
    await contentModel.checkBulkCurrentStep(contentData.contentUpload);
    await common.waitUntilSpinnerDisappears();
    await contentModel.nextButton.click();
    await contentModel.verifyErrorMessageIsVisible("Quantity must be lower than or equal to 99");
  });

  test(`New content should not be created when the quantity field is greater than 99 in the Single Card Editor section '${user.role}'`, async ({ page }) => {
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
    await commonModel.inputTextInLocator(contentModel.qtyField, "100");
    await commonModel.inputTextInLocator(contentModel.pField, "5.00");
    await commonModel.inputTextInLocator(contentModel.units2Field, "pcs");
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.clickErrorButton();
    await contentModel.verifyErrorMessage('"Quantity" should be a number between 0 and 99');
  });

});


