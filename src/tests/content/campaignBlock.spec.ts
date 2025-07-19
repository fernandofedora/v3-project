import { expect, test } from '@playwright/test';
import { LoginModel } from '../../pom/loginModel';
import {SidebarModel} from '../../pom/sidebarModel';
import {TopBarModel} from '../../pom/topBarModel';
import { CommonModel } from '../../pom/commonModel';
import { ContentModel } from '../../pom/contentModel';
import {validateEnvironment} from '../../utils/urlHandler';
import {validateUsers} from '../../utils/userHandler';
import { storeOwnerRoleValidation } from '../../utils/rolesHandler';
import { brandsData } from '../../data/brandsData';
import { dealTypes } from '../../data/contentData';
import {v4 as uuidv4} from 'uuid';


const users = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.onlyContent));
const url: string = validateEnvironment();

test.describe.configure({ mode: 'serial' });

  test(`Verify that a Super Admin user can create a card with the campaign block deal type`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.campaignBlock + uniqueId).slice(0, 30);
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
    await contentModel.selectDealType(dealTypes.campaignBlock);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.campaignBlock, brandsData.onlyContent, 'Super Admin');

    await contentModel.deleteContentByName(title);
});

test(`Verify that a Super Admin user can create a campaign block at brand level`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.campaignBlock + uniqueId).slice(0, 30);
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
    await contentModel.selectDealType(dealTypes.campaignBlock);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.campaignBlock, brandsData.onlyContent, 'Super Admin');

    await contentModel.deleteContentByName(title);
    
});

test(`Verify that a Super Admin user can create a campaign block at subbrand level`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();
    await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, brandsData.subBrand);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.campaignBlock + uniqueId).slice(0, 30);
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
    await contentModel.selectDealType(dealTypes.campaignBlock);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.campaignBlock, brandsData.subBrandContent, 'Super Admin');

    await contentModel.deleteContentByName(title);
});

test(`Verify that a Super Admin user can create a campaign block at store level`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();
    await topBarModel.selectNodeStoreGroupChild(brandsData.storeContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.campaignBlock + uniqueId).slice(0, 30);
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
    await contentModel.selectDealType(dealTypes.campaignBlock);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.campaignBlock, brandsData.storeContent, 'Super Admin');

    await contentModel.deleteContentByName(title);
});

test(`Verify that an Admin user can not create a campaign block card`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(users[1].username, users[1].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.campaignBlock + uniqueId).slice(0, 30);
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
    await contentModel.getClassDealType(dealTypes.campaignBlock);
    
});

test(`Verify that a Store user can not create a campaign block card`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(users[2].username, users[2].password);
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.campaignBlock + uniqueId).slice(0, 30);
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
    await contentModel.getClassDealType(dealTypes.campaignBlock);
});

test(`Verify that a Super Admin user can edit a created campaign block`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    await test.setTimeout(180000);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.campaignBlock + uniqueId).slice(0, 30);
    const title2 = (dealTypes.campaignBlock + "edited" + uniqueId).slice(0, 30);

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
    await contentModel.selectDealType(dealTypes.campaignBlock);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.campaignBlock, brandsData.onlyContent, 'Super Admin');

    await contentModel.titleInput.clear();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title2);
    await contentModel.descriptionInput.clear();
    await contentModel.descriptionInput.click();
    await commonModel.inputTextInLocator(contentModel.descriptionInput, "This is a new description");
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await page.reload();
    await commonModel.setSearchValue(title2);
    let isVisible: boolean;
    for(let i = 0; i < 60; i++){
        isVisible = await contentModel.contentTable.locator(`tr:has-text("${title2}")`).isVisible();
        if(isVisible){
            break;
        }
        await contentModel.page.waitForTimeout(300);
    }
    await contentModel.contentTable.locator(`tr:has-text("${title2}")`).click();
    let titleText = await contentModel.titleInput.inputValue();
    let description = await contentModel.descriptionInput.inputValue();
    expect(titleText).toEqual(title2);
    expect(description).toEqual("This is a new description");

    await contentModel.deleteContentByName(title2);
});

test(`Verify that a Super Admin user can delete a created campaign block`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.campaignBlock + uniqueId).slice(0, 30);
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
    await contentModel.selectDealType(dealTypes.campaignBlock);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.campaignBlock, brandsData.onlyContent, 'Super Admin');

    await contentModel.deleteContentByName(title);

    await contentModel.verifyContentTableIsEmpty(title);
});


test(`Verify that an Admin user can hide a created campaign block`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.campaignBlock + uniqueId).slice(0, 30);
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
    await contentModel.selectDealType(dealTypes.campaignBlock);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.campaignBlock, brandsData.onlyContent, 'Super Admin');
    await contentModel.visibleButton.click();
    await contentModel.verifyThatIsHidden();
    await contentModel.visibleButton.click();
    await contentModel.deleteContentByName(title);
});

test(`Verify that an Admin user can not edit a created campaign block`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.campaignBlock + uniqueId).slice(0, 30);
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
    await contentModel.selectDealType(dealTypes.campaignBlock);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.campaignBlock, brandsData.onlyContent, 'Super Admin');
    await contentModel.logoutButton.click();
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    await loginModel.login(users[1].username, users[1].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.campaignBlock, brandsData.onlyContent, 'Super Admin');
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.contentTable.locator(`tr:has-text("${title}")`).click();
    await contentModel.verifyTitleFieldIsDisabled();
    await contentModel.verifyDescriptionFieldIsDisabled();
    await contentModel.verifyThatWidthFieldIsDisabled();
    await contentModel.verifyThatHeightFieldIsDisabled();
    await contentModel.verifyThatDealTypeMenuIsDisabled();
    await contentModel.verifyThatCardStyleMenuIsDisabled();
    await contentModel.verifyThatUPCFieldIsDisabled();
    await contentModel.logoutButton.click();

    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();    

    await contentModel.deleteContentByName(title);
});

test(`Verify that an Admin user can not delete a created campaign block`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.campaignBlock + uniqueId).slice(0, 30);
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
    await contentModel.selectDealType(dealTypes.campaignBlock);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.campaignBlock, brandsData.onlyContent, 'Super Admin');
    await contentModel.logoutButton.click();

    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    await loginModel.login(users[1].username, users[1].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.campaignBlock, brandsData.onlyContent, 'Super Admin');
    await contentModel.deleteContentButton.click();
    await contentModel.verifyThatDeleteModalisNotVisible();
    await contentModel.logoutButton.click();

    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();    

    await contentModel.deleteContentByName(title);
});

test(`Verify that a Store user can not edit a created campaign block`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.campaignBlock + uniqueId).slice(0, 30);
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
    await contentModel.selectDealType(dealTypes.campaignBlock);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.campaignBlock, brandsData.onlyContent, 'Super Admin');
    await contentModel.logoutButton.click();
    
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    await loginModel.login(users[2].username, users[2].password);
    //await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.campaignBlock, brandsData.onlyContent, 'Super Admin');
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.contentTable.locator(`tr:has-text("${title}")`).click();
    await contentModel.verifyTitleFieldIsDisabled();
    await contentModel.verifyDescriptionFieldIsDisabled();
    await contentModel.verifyThatWidthFieldIsDisabled();
    await contentModel.verifyThatHeightFieldIsDisabled();
    await contentModel.verifyThatDealTypeMenuIsDisabled();
    await contentModel.verifyThatCardStyleMenuIsDisabled();
    await contentModel.verifyThatUPCFieldIsDisabled();
    await contentModel.logoutButton.click();

    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();    

    await contentModel.deleteContentByName(title);
});

test(`Verify that a Store user can not delete a created campaign block`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.campaignBlock + uniqueId).slice(0, 30);
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
    await contentModel.selectDealType(dealTypes.campaignBlock);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.campaignBlock, brandsData.onlyContent, 'Super Admin');
    await contentModel.logoutButton.click();

    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    await loginModel.login(users[2].username, users[2].password);
    //await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    //await sideBarModel.onClickContentOptionMenu();
    //await commonModel.waitUntilSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.campaignBlock, brandsData.onlyContent, 'Super Admin');
    await contentModel.deleteContentButton.click();
    await contentModel.verifyThatDeleteModalisNotVisible();
    await contentModel.logoutButton.click();

    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();    

    await contentModel.deleteContentByName(title);
});

test(`Verify that a Store user can hide a created campaign block`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.campaignBlock + uniqueId).slice(0, 30);
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
    await contentModel.selectDealType(dealTypes.campaignBlock);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.campaignBlock, brandsData.onlyContent, 'Super Admin');
    await contentModel.logoutButton.click();

    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    await loginModel.login(users[2].username, users[2].password);
    //await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    //await sideBarModel.onClickContentOptionMenu();
    //await commonModel.waitUntilSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await contentModel.newContentIsCreated(title, dealTypes.campaignBlock, brandsData.onlyContent, 'Super Admin');
    await contentModel.visibleButton.click();
    await contentModel.verifyThatIsNotHidden();
    await contentModel.logoutButton.click();

    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();    

    await contentModel.deleteContentByName(title);
});

test(`Verify that a Super Admin can move a campaign block in the circular`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    test.setTimeout(120000);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();
    const uniqueId2 = uuidv4();

    const title = (dealTypes.campaignBlock + uniqueId).slice(0, 30);
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
    await contentModel.selectDealType(dealTypes.campaignBlock);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.campaignBlock, brandsData.onlyContent, 'Super Admin');

    const title2 = (dealTypes.fixedPrice + uniqueId).slice(0, 30);
    await contentModel.sideBar.click();
    await contentModel.singleItemButton.click();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title2);
    await contentModel.verifyTitleIsComplete(title2);
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
    await commonModel.searchInput.clear();
    await commonModel.setSearchValue(title2);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title2, dealTypes.fixedPrice, brandsData.onlyContent, 'Super Admin');
    await commonModel.searchInput.clear();

    const title3 = (dealTypes.fixedPrice + uniqueId2).slice(0, 30);
    await contentModel.sideBar.click();
    await contentModel.singleItemButton.click();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title3);
    await contentModel.verifyTitleIsComplete(title3);
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
    await commonModel.searchInput.clear();
    await commonModel.setSearchValue(title3);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title3, dealTypes.fixedPrice, brandsData.onlyContent, 'Super Admin');
    await commonModel.searchInput.clear();

    await page.waitForTimeout(3000);
    await contentModel.contentTable.locator(`tr`).nth(0).locator('td').nth(2).click();
    await contentModel.contentTable.locator(`tr`).nth(0).locator('td').nth(2).dragTo(contentModel.contentTable.locator(`tr`).nth(2).locator('td').nth(2));

    let name = await contentModel.contentTable.locator(`tr`).nth(0).locator('td').nth(2).innerText();
    expect(name).not.toContain('Campaign Block');

    await contentModel.deleteContentByName(title);
    await contentModel.deleteContentByName(title2);
    await contentModel.deleteContentByName(title3);
});


test(`Verify that a Super Admin user can add new cards related to a campaign block card`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    test.setTimeout(120000);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.campaignBlock + uniqueId).slice(0, 30);
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
    await contentModel.selectDealType(dealTypes.campaignBlock);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.campaignBlock, brandsData.onlyContent, 'Super Admin');

    const title2 = (dealTypes.fixedPrice + uniqueId).slice(0, 30);
    await contentModel.sideBar.click();
    await contentModel.singleItemButton.click();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title2);
    await contentModel.verifyTitleIsComplete(title2);
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
    await commonModel.searchInput.clear();
    await commonModel.setSearchValue(title2);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title2, dealTypes.fixedPrice, brandsData.onlyContent, 'Super Admin');
    await commonModel.searchInput.clear();

    await contentModel.clickTheStackContentButtonFromASpecificCard(title);
    await contentModel.verifyThatTheCampaignBlockModalIsVisible();
    await contentModel.clickTheAddButtonFromCardInsidecampaingBlockBuilder(title2);
    await contentModel.verifyThatCardIsAddedToStackGroup(title2);
    await contentModel.doneButtonCampainBlockBuilder.click();
    await contentModel.verifyThatTheCampaignBlockModalIsNotVisible();
    await contentModel.verifyThatTheAddedCardIsNotDisplayed(title2);
    await contentModel.verifythatTheAddedCardIsDisplayedInStackedGroup(title, title2);

    await contentModel.deleteContentByName(title);
    await contentModel.deleteContentByName(title2);
});

test(`Verify that an Admin user can add cards related to a campaign block`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    test.setTimeout(180000);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.campaignBlock + uniqueId).slice(0, 30);
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
    await contentModel.selectDealType(dealTypes.campaignBlock);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.campaignBlock, brandsData.onlyContent, 'Super Admin');
    await contentModel.logoutButton.click();

    await loginModel.login(users[1].username, users[1].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const title2 = (dealTypes.fixedPrice + uniqueId).slice(0, 30);
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title2);
    await contentModel.verifyTitleIsComplete(title2);
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
    await commonModel.searchInput.clear();
    await commonModel.setSearchValue(title2);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title2, dealTypes.fixedPrice, brandsData.onlyContent, 'Super Admin');
    await commonModel.searchInput.clear();

    await contentModel.clickTheStackContentButtonFromASpecificCard(title);
    await contentModel.verifyThatTheCampaignBlockModalIsVisible();
    await contentModel.clickTheAddButtonFromCardInsidecampaingBlockBuilder(title2);
    await contentModel.verifyThatCardIsAddedToStackGroup(title2);
    await contentModel.doneButtonCampainBlockBuilder.click();
    await contentModel.verifyThatTheCampaignBlockModalIsNotVisible();
    await contentModel.verifyThatTheAddedCardIsNotDisplayed(title2);
    await contentModel.verifythatTheAddedCardIsDisplayedInStackedGroup(title, title2);
    await contentModel.logoutButton.click();

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    await contentModel.deleteContentByName(title);
    await contentModel.deleteContentByName(title2);
});

test(`Verify that a Store user can add cards related to a campaign block`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    test.setTimeout(180000);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.campaignBlock + uniqueId).slice(0, 30);
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
    await contentModel.selectDealType(dealTypes.campaignBlock);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.campaignBlock, brandsData.onlyContent, 'Super Admin');
    await contentModel.logoutButton.click();

    await loginModel.login(users[2].username, users[2].password);
    //await topBarModel.selectBrand(brandsData.onlyContent);
    //await commonModel.waitUntilSpinnerDisappears();

    //await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const title2 = (dealTypes.fixedPrice + uniqueId).slice(0, 30);
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title2);
    await contentModel.verifyTitleIsComplete(title2);
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
    await commonModel.searchInput.clear();
    await commonModel.setSearchValue(title2);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title2, dealTypes.fixedPrice, brandsData.storeContent, 'Super Admin');
    await commonModel.searchInput.clear();

    await contentModel.clickTheStackContentButtonFromASpecificCard(title);
    await contentModel.verifyThatTheCampaignBlockModalIsVisible();
    await contentModel.clickTheAddButtonFromCardInsidecampaingBlockBuilder(title2);
    await contentModel.verifyThatCardIsAddedToStackGroup(title2);
    await contentModel.doneButtonCampainBlockBuilder.click();
    await contentModel.verifyThatTheCampaignBlockModalIsNotVisible();
    await contentModel.verifyThatTheAddedCardIsNotDisplayed(title2);
    await contentModel.verifythatTheAddedCardIsDisplayedInStackedGroup(title, title2);
    await contentModel.logoutButton.click();

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    await contentModel.deleteContentByName(title);
});

test(`Verify that a Super Admin user can edit cards in the campaign block`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    test.setTimeout(180000);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.campaignBlock + uniqueId).slice(0, 30);
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
    await contentModel.selectDealType(dealTypes.campaignBlock);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.campaignBlock, brandsData.onlyContent, 'Super Admin');

    const title2 = (dealTypes.fixedPrice + uniqueId).slice(0, 30);
    await contentModel.sideBar.click();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title2);
    await contentModel.verifyTitleIsComplete(title2);
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
    await commonModel.searchInput.clear();
    await commonModel.setSearchValue(title2);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title2, dealTypes.fixedPrice, brandsData.onlyContent, 'Super Admin');
    await commonModel.searchInput.clear();

    await contentModel.clickTheStackContentButtonFromASpecificCard(title);
    await contentModel.verifyThatTheCampaignBlockModalIsVisible();
    await contentModel.clickTheAddButtonFromCardInsidecampaingBlockBuilder(title2);
    await contentModel.verifyThatCardIsAddedToStackGroup(title2);
    await contentModel.doneButtonCampainBlockBuilder.click();
    await contentModel.verifyThatTheCampaignBlockModalIsNotVisible();
    await contentModel.verifyThatTheAddedCardIsNotDisplayed(title2);
    await contentModel.verifythatTheAddedCardIsDisplayedInStackedGroup(title, title2);
    let titleEdited2 = title2 + "edited";
    await contentModel.editCampaignBlockFields(titleEdited2, "This is a edited description");

    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();

    await contentModel.contentTable.locator(`tr:has-text("${title}")`).click();
    await contentModel.contentTable.locator(`tr:has-text("${titleEdited2}")`).click();

    await page.waitForTimeout(3000);

    let newTitle = await contentModel.titleInput.inputValue();
    let newDescripton = await contentModel.descriptionInput.inputValue();
    
    expect(newTitle).toEqual(titleEdited2);
    expect(newDescripton).toEqual("This is a edited description");
    await contentModel.deleteContentByName(title);
    await contentModel.deleteContentByName(titleEdited2);
});


test(`Verify that a Super Admin user can delete cards in the campaign block`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    test.setTimeout(180000);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.campaignBlock + uniqueId).slice(0, 30);
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
    await contentModel.selectDealType(dealTypes.campaignBlock);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.campaignBlock, brandsData.onlyContent, 'Super Admin');

    const title2 = (dealTypes.fixedPrice + uniqueId).slice(0, 30);
    await contentModel.sideBar.click();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title2);
    await contentModel.verifyTitleIsComplete(title2);
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
    await commonModel.searchInput.clear();
    await commonModel.setSearchValue(title2);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title2, dealTypes.fixedPrice, brandsData.onlyContent, 'Super Admin');
    await commonModel.searchInput.clear();

    await contentModel.clickTheStackContentButtonFromASpecificCard(title);
    await contentModel.verifyThatTheCampaignBlockModalIsVisible();
    await contentModel.clickTheAddButtonFromCardInsidecampaingBlockBuilder(title2);
    await contentModel.verifyThatCardIsAddedToStackGroup(title2);
    await contentModel.doneButtonCampainBlockBuilder.click();
    await contentModel.verifyThatTheCampaignBlockModalIsNotVisible();
    await contentModel.verifyThatTheAddedCardIsNotDisplayed(title2);
    await contentModel.verifythatTheAddedCardIsDisplayedInStackedGroup(title, title2);
    
    await contentModel.deleteContentByName(title2);

    await contentModel.verifyThatSpecificCardIsNotVisible(title2);

    await contentModel.deleteContentByName(title);

    await contentModel.verifyThatSpecificCardIsNotVisible(title);
    
});

test(`Verify that an Admin user cannot edit a card in a campaign block`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    test.setTimeout(180000);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.campaignBlock + uniqueId).slice(0, 30);
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
    await contentModel.selectDealType(dealTypes.campaignBlock);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.campaignBlock, brandsData.onlyContent, 'Super Admin');
    await contentModel.logoutButton.click();

    await loginModel.login(users[1].username, users[1].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const title2 = (dealTypes.fixedPrice + uniqueId).slice(0, 30);
    //await contentModel.sideBar.click();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title2);
    await contentModel.verifyTitleIsComplete(title2);
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
    await commonModel.searchInput.clear();
    await commonModel.setSearchValue(title2);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title2, dealTypes.fixedPrice, brandsData.onlyContent, 'Super Admin');
    await commonModel.searchInput.clear();

    await contentModel.clickTheStackContentButtonFromASpecificCard(title);
    await contentModel.verifyThatTheCampaignBlockModalIsVisible();
    await contentModel.clickTheAddButtonFromCardInsidecampaingBlockBuilder(title2);
    await contentModel.verifyThatCardIsAddedToStackGroup(title2);
    await contentModel.doneButtonCampainBlockBuilder.click();
    await contentModel.verifyThatTheCampaignBlockModalIsNotVisible();
    await contentModel.verifyThatTheAddedCardIsNotDisplayed(title2);
    await contentModel.verifythatTheAddedCardIsDisplayedInStackedGroup(title, title2);
    await contentModel.verifyTitleFieldIsDisabled();
    await contentModel.verifyDescriptionFieldIsDisabled();
    await contentModel.verifyThatWidthFieldIsDisabled();
    await contentModel.verifyThatHeightFieldIsDisabled();
    await contentModel.verifyThatDealTypeMenuIsDisabled();
    await contentModel.verifyThatCardStyleMenuIsDisabled();
    await contentModel.verifyThatUPCFieldIsDisabled();
    await contentModel.logoutButton.click();

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    await contentModel.deleteContentByName(title);
    await contentModel.deleteContentByName(title2);
});

test(`Verify that an Admin user cannot delete a card in a campaign block`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    test.setTimeout(180000);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.campaignBlock + uniqueId).slice(0, 30);
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
    await contentModel.selectDealType(dealTypes.campaignBlock);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.campaignBlock, brandsData.onlyContent, 'Super Admin');
    await contentModel.logoutButton.click();

    await loginModel.login(users[1].username, users[1].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const title2 = (dealTypes.fixedPrice + uniqueId).slice(0, 30);
    //await contentModel.sideBar.click();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title2);
    await contentModel.verifyTitleIsComplete(title2);
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
    await commonModel.searchInput.clear();
    await commonModel.setSearchValue(title2);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title2, dealTypes.fixedPrice, brandsData.onlyContent, 'Super Admin');
    await commonModel.searchInput.clear();

    await contentModel.clickTheStackContentButtonFromASpecificCard(title);
    await contentModel.verifyThatTheCampaignBlockModalIsVisible();
    await contentModel.clickTheAddButtonFromCardInsidecampaingBlockBuilder(title2);
    await contentModel.verifyThatCardIsAddedToStackGroup(title2);
    await contentModel.doneButtonCampainBlockBuilder.click();
    await contentModel.verifyThatTheCampaignBlockModalIsNotVisible();
    await contentModel.verifyThatTheAddedCardIsNotDisplayed(title2);
    await contentModel.verifythatTheAddedCardIsDisplayedInStackedGroup(title, title2);

    await contentModel.contentTable.locator(`tr:has-text("${title2}")`).click();
    await contentModel.deleteContentButton.click();
    await contentModel.verifyThatDeleteModalisNotVisible();
    await contentModel.logoutButton.click();

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    await contentModel.deleteContentByName(title);
    await contentModel.deleteContentByName(title2);
});

test(`Verify that an Admin user can hide a card in a campaign block`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    test.setTimeout(180000);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.campaignBlock + uniqueId).slice(0, 30);
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
    await contentModel.selectDealType(dealTypes.campaignBlock);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.campaignBlock, brandsData.onlyContent, 'Super Admin');
    await contentModel.logoutButton.click();

    await loginModel.login(users[1].username, users[1].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const title2 = (dealTypes.fixedPrice + uniqueId).slice(0, 30);
    //await contentModel.sideBar.click();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title2);
    await contentModel.verifyTitleIsComplete(title2);
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
    await commonModel.searchInput.clear();
    await commonModel.setSearchValue(title2);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title2, dealTypes.fixedPrice, brandsData.onlyContent, 'Super Admin');
    await commonModel.searchInput.clear();

    await contentModel.clickTheStackContentButtonFromASpecificCard(title);
    await contentModel.verifyThatTheCampaignBlockModalIsVisible();
    await contentModel.clickTheAddButtonFromCardInsidecampaingBlockBuilder(title2);
    await contentModel.verifyThatCardIsAddedToStackGroup(title2);
    await contentModel.doneButtonCampainBlockBuilder.click();
    await contentModel.verifyThatTheCampaignBlockModalIsNotVisible();
    await contentModel.verifyThatTheAddedCardIsNotDisplayed(title2);
    await contentModel.verifythatTheAddedCardIsDisplayedInStackedGroup(title, title2);

    await contentModel.contentTable.locator(`tr:has-text("${title2}")`).click();
    await page.click('div.content-form-wrapper > div:nth-child(1) > div > div:nth-child(2)',{force: true});
    await contentModel.verifyThatIsNotHidden();
    await contentModel.logoutButton.click();

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    await contentModel.deleteContentByName(title);
    await contentModel.deleteContentByName(title2);
});

test(`Verify that a Store user cannot edit a card in a campaign block`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    test.setTimeout(180000);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.campaignBlock + uniqueId).slice(0, 30);
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
    await contentModel.selectDealType(dealTypes.campaignBlock);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.campaignBlock, brandsData.onlyContent, 'Super Admin');
    await contentModel.logoutButton.click();

    await loginModel.login(users[2].username, users[2].password);
    //await topBarModel.selectBrand(brandsData.onlyContent);
    //await commonModel.waitUntilSpinnerDisappears();

    //await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const title2 = (dealTypes.fixedPrice + uniqueId).slice(0, 30);
    //await contentModel.sideBar.click();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title2);
    await contentModel.verifyTitleIsComplete(title2);
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
    await commonModel.searchInput.clear();
    await commonModel.setSearchValue(title2);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title2, dealTypes.fixedPrice, brandsData.storeContent, 'Super Admin');
    await commonModel.searchInput.clear();

    await contentModel.clickTheStackContentButtonFromASpecificCard(title);
    await contentModel.verifyThatTheCampaignBlockModalIsVisible();
    await contentModel.clickTheAddButtonFromCardInsidecampaingBlockBuilder(title2);
    await contentModel.verifyThatCardIsAddedToStackGroup(title2);
    await contentModel.doneButtonCampainBlockBuilder.click();
    await contentModel.verifyThatTheCampaignBlockModalIsNotVisible();
    await contentModel.verifyThatTheAddedCardIsNotDisplayed(title2);
    await contentModel.verifythatTheAddedCardIsDisplayedInStackedGroup(title, title2);
    await contentModel.verifyTitleFieldIsDisabled();
    await contentModel.verifyDescriptionFieldIsDisabled();
    await contentModel.verifyThatWidthFieldIsDisabled();
    await contentModel.verifyThatHeightFieldIsDisabled();
    await contentModel.verifyThatDealTypeMenuIsDisabled();
    await contentModel.verifyThatCardStyleMenuIsDisabled();
    await contentModel.verifyThatUPCFieldIsDisabled();
    await contentModel.logoutButton.click();

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    await contentModel.deleteContentByName(title);
});

test(`Verify that a Store user cannot delete a card in a campaign block`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    test.setTimeout(180000);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.campaignBlock + uniqueId).slice(0, 30);
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
    await contentModel.selectDealType(dealTypes.campaignBlock);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.campaignBlock, brandsData.onlyContent, 'Super Admin');
    await contentModel.logoutButton.click();

    await loginModel.login(users[2].username, users[2].password);
    //await topBarModel.selectBrand(brandsData.onlyContent);
    //await commonModel.waitUntilSpinnerDisappears();

    //await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const title2 = (dealTypes.fixedPrice + uniqueId).slice(0, 30);
    //await contentModel.sideBar.click();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title2);
    await contentModel.verifyTitleIsComplete(title2);
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
    await commonModel.searchInput.clear();
    await commonModel.setSearchValue(title2);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title2, dealTypes.fixedPrice, brandsData.storeContent, 'Super Admin');
    await commonModel.searchInput.clear();

    await contentModel.clickTheStackContentButtonFromASpecificCard(title);
    await contentModel.verifyThatTheCampaignBlockModalIsVisible();
    await contentModel.clickTheAddButtonFromCardInsidecampaingBlockBuilder(title2);
    await contentModel.verifyThatCardIsAddedToStackGroup(title2);
    await contentModel.doneButtonCampainBlockBuilder.click();
    await contentModel.verifyThatTheCampaignBlockModalIsNotVisible();
    await contentModel.verifyThatTheAddedCardIsNotDisplayed(title2);
    await page.waitForTimeout(2000);
    await contentModel.verifythatTheAddedCardIsDisplayedInStackedGroup(title, title2);

    await contentModel.contentTable.locator(`tr:has-text("${title2}")`).click();
    await contentModel.deleteContentButton.click();
    await contentModel.verifyThatDeleteModalisNotVisible();
    await contentModel.logoutButton.click();

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    await contentModel.deleteContentByName(title);
});

test(`Verify that a Store user can not hide a card in a campaign block`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    test.setTimeout(180000);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.campaignBlock + uniqueId).slice(0, 30);
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
    await contentModel.selectDealType(dealTypes.campaignBlock);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.campaignBlock, brandsData.onlyContent, 'Super Admin');
    await contentModel.logoutButton.click();

    await loginModel.login(users[2].username, users[2].password);
    //await topBarModel.selectBrand(brandsData.onlyContent);
    //await commonModel.waitUntilSpinnerDisappears();

    //await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const title2 = (dealTypes.fixedPrice + uniqueId).slice(0, 30);
    //await contentModel.sideBar.click();
    await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    await contentModel.clickDateRangeMenu();
    await contentModel.clickDealMenu();
    await contentModel.clickMediaIconsMenu();
    await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title2);
    await contentModel.verifyTitleIsComplete(title2);
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
    await commonModel.searchInput.clear();
    await commonModel.setSearchValue(title2);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title2, dealTypes.fixedPrice, brandsData.storeContent, 'Super Admin');
    await commonModel.searchInput.clear();

    await contentModel.clickTheStackContentButtonFromASpecificCard(title);
    await contentModel.verifyThatTheCampaignBlockModalIsVisible();
    await contentModel.clickTheAddButtonFromCardInsidecampaingBlockBuilder(title2);
    await contentModel.verifyThatCardIsAddedToStackGroup(title2);
    await contentModel.doneButtonCampainBlockBuilder.click();
    await contentModel.verifyThatTheCampaignBlockModalIsNotVisible();
    await contentModel.verifyThatTheAddedCardIsNotDisplayed(title2);
    await page.waitForTimeout(2000);
    await contentModel.verifythatTheAddedCardIsDisplayedInStackedGroup(title, title2);

    await contentModel.contentTable.locator(`tr:has-text("${title2}")`).click();
    await page.click('div.content-form-wrapper > div:nth-child(1) > div > div:nth-child(2)',{force: true});
    await contentModel.verifyThatIsNotHidden();
    await contentModel.logoutButton.click();

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    await contentModel.deleteContentByName(title);
});

test(`Verify a campaign block is spread to the clients at the brand, sub brand y store levels`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    test.setTimeout(180000);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.campaignBlock + uniqueId).slice(0, 30);
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
    await contentModel.selectDealType(dealTypes.campaignBlock);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.campaignBlock, brandsData.onlyContent, 'Super Admin');
    await contentModel.verifyThatSpecificCardIsVisible(title);
    
    await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, brandsData.subBrand);
    await commonModel.waitUntilSpinnerDisappears();

    await contentModel.verifyThatSpecificCardIsVisible(title);

    await topBarModel.selectNodeStoreGroupChild(brandsData.storeContent);
    await commonModel.waitUntilSpinnerDisappears();

    await contentModel.verifyThatSpecificCardIsVisible(title);

    await topBarModel.selectNodeBrandChild(brandsData.onlyContent, brandsData.brand);
    await commonModel.waitUntilSpinnerDisappears();

    await contentModel.verifyThatSpecificCardIsVisible(title);

    await page.waitForTimeout(5000);

    await contentModel.deleteContentByName(title);
});

test(`Verify that a campaign block is displayed with father/son relationship and its elements in the content table`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 3600});
    test.setTimeout(180000);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const contentModel = new ContentModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.onlyContent);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.onClickContentOptionMenu();
    await commonModel.waitUntilSpinnerDisappears();

    const uniqueId = uuidv4();

    const title = (dealTypes.campaignBlock + uniqueId).slice(0, 30);
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
    await contentModel.selectDealType(dealTypes.campaignBlock);
    await contentModel.categoryDropdown.click();
    await contentModel.selectCategory(1);
    await contentModel.cardDetailLabel.click();
    await contentModel.cardDetailLabel.click();
    //await contentModel.singleItemButton.click();
    await contentModel.waitUntilContentSpinnerDisappears();
    await commonModel.setSearchValue(title);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title, dealTypes.campaignBlock, brandsData.onlyContent, 'Super Admin');
    await contentModel.verifyThatSpecificCardIsVisible(title);
    await commonModel.searchInput.clear();

    const title2 = (dealTypes.fixedPrice + uniqueId).slice(0, 30);
    //await contentModel.sideBar.click();
    //await contentModel.singleItemButton.click();
    await contentModel.hoverHeaders();
    //await contentModel.clickGeneralMenu();
    //await contentModel.clickDateRangeMenu();
    //await contentModel.clickDealMenu();
    //await contentModel.clickMediaIconsMenu();
    //await contentModel.clickHeadlinesMenu();
    await contentModel.titleInput.click();
    await commonModel.inputTextInLocator(contentModel.titleInput, title2);
    await contentModel.verifyTitleIsComplete(title2);
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
    await commonModel.searchInput.clear();
    await commonModel.setSearchValue(title2);
    await page.waitForTimeout(500);
    await contentModel.newContentIsCreated(title2, dealTypes.fixedPrice, brandsData.onlyContent, 'Super Admin');
    await commonModel.searchInput.clear();

    await contentModel.clickTheStackContentButtonFromASpecificCard(title);
    await contentModel.verifyThatTheCampaignBlockModalIsVisible();
    await contentModel.clickTheAddButtonFromCardInsidecampaingBlockBuilder(title2);
    await contentModel.verifyThatCardIsAddedToStackGroup(title2);
    await contentModel.doneButtonCampainBlockBuilder.click();
    await contentModel.verifyThatTheCampaignBlockModalIsNotVisible();
    await contentModel.verifyThatTheAddedCardIsNotDisplayed(title2);
    await contentModel.verifythatTheAddedCardIsDisplayedInStackedGroup(title, title2);

    await contentModel.verifyThatTitleIsVisible(title);
    await contentModel.verifyThatTheDaysAreVisible(title);
    await contentModel.verifyThatTheDealTypeVisible(title);
    await contentModel.verifyThatExpandButtonIsVisible(title);
    await contentModel.verifyThatTheOwnerFieldIsVisible(title);
    await contentModel.verifyThatTheSizeFieldIsVisible(title);

    await contentModel.deleteContentByName(title);
    await contentModel.deleteContentByName(title2);
});
    
