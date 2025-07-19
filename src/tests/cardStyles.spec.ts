import { test, expect } from '@playwright/test';
import { LoginModel } from '../pom/loginModel';
import {SidebarModel} from '../pom/sidebarModel';
import {TopBarModel} from '../pom/topBarModel';
import {validateEnvironment} from '../utils/urlHandler';
import {validateUsers} from '../utils/userHandler';
import { CommonModel } from '../pom/commonModel';
import { BrandsModel } from '../pom/brandsModel';
import { CardStylesModel } from '../pom/cardStylesModel';
import { storeOwnerRoleValidation } from '../utils/rolesHandler';
import { brandsData } from '../data/brandsData';
import { cardStyleData } from '../data/cardStylesData';
import {v4 as uuidv4} from 'uuid';
import { ContentModel } from '../pom/contentModel';

const users = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.brandNodeContentName));
const url: string = validateEnvironment();

  test.describe.configure({ mode: 'serial' });

  test(`Verify that it is possible to create a Card Style`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const cardStylesModel = new CardStylesModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickCardStylesOptionMenu();

    const title = ("Style Cards" + uuidv4()).slice(0, 30);

    await cardStylesModel.createCardButton.click();
    await cardStylesModel.waitNameFieldIsDisplayed();
    await commonModel.inputTextInLocator(cardStylesModel.nameInput, title);
    await commonModel.inputTextInLocator(cardStylesModel.valueInput, title);
    await cardStylesModel.saveButton.click();
    await commonModel.waitUntilSpinnerDisappears();

    await cardStylesModel.verifyCardStyleIsCreated(title);

    await cardStylesModel.deleteCardStyle(title);
    await commonModel.waitUntilSpinnerDisappears();
  });


  test(`Verify if it is possible to edit the name of the style card`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const cardStylesModel = new CardStylesModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickCardStylesOptionMenu();

    const title = ("Style Cards" + uuidv4()).slice(0, 30);

    await cardStylesModel.createCardButton.click( {delay:2000} );
    await cardStylesModel.waitNameFieldIsDisplayed();
    await commonModel.inputTextInLocator(cardStylesModel.nameInput, title);
    await commonModel.inputTextInLocator(cardStylesModel.valueInput, title);
    await cardStylesModel.saveButton.click();
    await commonModel.waitUntilSpinnerDisappears();
    await cardStylesModel.verifyThatSaveButtonIsNotDisplayed();

    await cardStylesModel.verifyCardStyleIsCreated(title);

    await cardStylesModel.clickEditButton(title);
    await cardStylesModel.waitNameFieldIsDisplayed();

    const editedTitle = title + 'edited';
    await cardStylesModel.nameInput.clear();
    await commonModel.inputTextInLocator(cardStylesModel.nameInput, editedTitle);
    await cardStylesModel.saveButton.click();
    await cardStylesModel.verifyThatSaveButtonIsNotDisplayed();

    await cardStylesModel.verifyCardStyleIsCreated(editedTitle);

    await cardStylesModel.deleteCardStyle(editedTitle);
    await commonModel.waitUntilSpinnerDisappears();
  });


  test(`Verify if it is possible to edit the value of the style card`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const cardStylesModel = new CardStylesModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickCardStylesOptionMenu();

    const title = ("Style Cards" + uuidv4()).slice(0, 30);

    await cardStylesModel.createCardButton.click();
    await cardStylesModel.waitNameFieldIsDisplayed();
    await commonModel.inputTextInLocator(cardStylesModel.nameInput, title);
    await commonModel.inputTextInLocator(cardStylesModel.valueInput, title);
    await cardStylesModel.saveButton.click();
    await commonModel.waitUntilSpinnerDisappears();

    await cardStylesModel.verifyCardStyleIsCreated(title);

    await cardStylesModel.clickEditButton(title);
    await cardStylesModel.waitNameFieldIsDisplayed();

    const editedTitle = title + 'edited';
    await cardStylesModel.valueInput.clear();
    await commonModel.inputTextInLocator(cardStylesModel.valueInput, editedTitle);
    await cardStylesModel.saveButton.click();
    await commonModel.waitUntilSpinnerDisappears();
    
    await cardStylesModel.verifyThatTheValueFieldUpdated(title, editedTitle);

    await cardStylesModel.deleteCardStyle(title);
    await commonModel.waitUntilSpinnerDisappears();
  });


  test(`Verify that it is not possible to create a card style by leaving the name field empty`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const cardStylesModel = new CardStylesModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickCardStylesOptionMenu();

    const title = ("Style Cards" + uuidv4()).slice(0, 30);

    await cardStylesModel.verifyThatCreateCardButtonIsVisible();
    await cardStylesModel.waitNameFieldIsDisplayed();
    await commonModel.inputTextInLocator(cardStylesModel.valueInput, title);
    await cardStylesModel.saveButton.click();
    await commonModel.waitUntilSpinnerDisappears();

    await cardStylesModel.verifyThatTheErrorMessageIsDisplayed(cardStyleData.nameRequired);
});


test(`Verify that it is not possible to create a card style by leaving the value field empty`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const cardStylesModel = new CardStylesModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickCardStylesOptionMenu();

    const title = ("Style Cards" + uuidv4()).slice(0, 30);

    await cardStylesModel.createCardButton.click();
    await cardStylesModel.waitNameFieldIsDisplayed();
    await commonModel.inputTextInLocator(cardStylesModel.nameInput, title);
    await cardStylesModel.saveButton.click();
    await commonModel.waitUntilSpinnerDisappears();

    await cardStylesModel.verifyThatTheErrorMessageIsDisplayed(cardStyleData.valueRequired);
});


test(`Verify you can't create a style card with all empty fields`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const cardStylesModel = new CardStylesModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickCardStylesOptionMenu();

    const title = ("Style Cards" + uuidv4()).slice(0, 30);

    await cardStylesModel.createCardButton.click();
    await cardStylesModel.waitNameFieldIsDisplayed();
    await cardStylesModel.saveButton.click();
    await commonModel.waitUntilSpinnerDisappears();

    await cardStylesModel.verifyThatTheErrorMessagesAreDisplayed();
});


test(`Verify that a style card can be deleted`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const cardStylesModel = new CardStylesModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickCardStylesOptionMenu();

    const title = ("Style Cards" + uuidv4()).slice(0, 30);

    await cardStylesModel.createCardButton.click();
    await cardStylesModel.waitNameFieldIsDisplayed();
    await commonModel.inputTextInLocator(cardStylesModel.nameInput, title);
    await commonModel.inputTextInLocator(cardStylesModel.valueInput, title);
    await cardStylesModel.saveButton.click();
    await commonModel.waitUntilSpinnerDisappears();

    await cardStylesModel.verifyCreatedCardStyleMessageIsDisplayed();
    await cardStylesModel.verifyCardStyleIsCreated(title);

    await cardStylesModel.deleteCardStyle(title);
    await cardStylesModel.verifyCardStyleIsDeleted(title);
    await cardStylesModel.verifyDeletedCardStyleMessageIsDisplayed(title);
    await commonModel.waitUntilSpinnerDisappears();
  });


  test(`Verify that when typing the name of a card style on the search bar, the search filter shows as a result the card style that you typed on the search bar`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const cardStylesModel = new CardStylesModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickCardStylesOptionMenu();

    const title = ("Style Cards" + uuidv4()).slice(0, 30);

    await cardStylesModel.createCardButton.click();
    await cardStylesModel.waitNameFieldIsDisplayed();
    await commonModel.inputTextInLocator(cardStylesModel.nameInput, title);
    await commonModel.inputTextInLocator(cardStylesModel.valueInput, title);
    await cardStylesModel.saveButton.click();
    await commonModel.waitUntilSpinnerDisappears();

    await cardStylesModel.verifyCardStyleIsCreated(title);

    await commonModel.searchInput.pressSequentially(title);

    await cardStylesModel.verifyCardStyleIsCreated(title);

    await cardStylesModel.rowCount(1);

    await cardStylesModel.deleteCardStyle(title);
    await commonModel.waitUntilSpinnerDisappears();
 });

 test(`Verify that when canceling the delete function of a card style,the card remains in the table`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const cardStylesModel = new CardStylesModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickCardStylesOptionMenu();

    const title = ("Style Cards" + uuidv4()).slice(0, 30);

    await cardStylesModel.createCardButton.click();
    await cardStylesModel.waitNameFieldIsDisplayed();
    await commonModel.inputTextInLocator(cardStylesModel.nameInput, title);
    await commonModel.inputTextInLocator(cardStylesModel.valueInput, title);
    await cardStylesModel.saveButton.click();
    await commonModel.waitUntilSpinnerDisappears();

    await cardStylesModel.verifyCardStyleIsCreated(title);

    await cardStylesModel.cancelDeleteCardStyle(title);

    await cardStylesModel.verifyCardStyleIsCreated(title);
    await cardStylesModel.deleteCardStyle(title);
    await commonModel.waitUntilSpinnerDisappears();
 });


 test(`Verify that the 'default card style' option can be activated from the option to edit a card style`, async ({ page }) => {
  await page.goto(url);
  const loginModel = new LoginModel(page);
  const sideBarModel = new SidebarModel(page);
  const topBarModel = new TopBarModel(page);
  const commonModel = new CommonModel(page);
  const cardStylesModel = new CardStylesModel(page);

  await loginModel.login(users[0].username, users[0].password);
  await topBarModel.selectBrand(brandsData.brandNodeContentName);
  await commonModel.waitUntilSpinnerDisappears();
  await sideBarModel.onClickCardStylesOptionMenu();

  await cardStylesModel.ensureCardStyleRequiredExists('test');
  await commonModel.waitUntilSpinnerDisappears();
  await cardStylesModel.clickEditButton('test');
  let isChecked = await cardStylesModel.verifyTheTooglebuttonIsDisplayed();
  if(isChecked == "true"){
    await cardStylesModel.defaultCardStyleToggle.click();
    await cardStylesModel.saveButton.click();
    await cardStylesModel.verifyTheTooglebuttonIsDisplayed();
    await commonModel.waitUntilSpinnerDisappears();
    await cardStylesModel.clickEditButton('test');
  }

  let value = await cardStylesModel.verifyTheTooglebuttonIsDisplayed();
  expect(value).toBe("false");


  let isChecked2 = await cardStylesModel.verifyTheTooglebuttonIsDisplayed();
  if(isChecked2 == "false"){
    await cardStylesModel.defaultCardStyleToggle.click();
    await cardStylesModel.saveButton.click();
    await commonModel.waitUntilSpinnerDisappears();
  }

});


test(`Verify that when creating a new card style it is possible to activate the 'default' option`, async ({ page }) => {
  await page.goto(url);
  const loginModel = new LoginModel(page);
  const sideBarModel = new SidebarModel(page);
  const topBarModel = new TopBarModel(page);
  const commonModel = new CommonModel(page);
  const cardStylesModel = new CardStylesModel(page);

  await loginModel.login(users[0].username, users[0].password);
  await topBarModel.selectBrand(brandsData.brandNodeContentName);
  await commonModel.waitUntilSpinnerDisappears();
  await sideBarModel.onClickCardStylesOptionMenu();

  const title = ("Style Cards" + uuidv4()).slice(0, 30);

  await cardStylesModel.createCardButton.click();
  await cardStylesModel.waitNameFieldIsDisplayed();
  await commonModel.inputTextInLocator(cardStylesModel.nameInput, title);
  await commonModel.inputTextInLocator(cardStylesModel.valueInput, title);
  await cardStylesModel.defaultCardStyleToggle.click();
  await cardStylesModel.saveButton.click();
  await commonModel.waitUntilSpinnerDisappears();

  await cardStylesModel.clickEditButton(title);

  await cardStylesModel.verifyCardStyleIsCreated(title);
  let value = await cardStylesModel.verifyTheTooglebuttonIsDisplayed();
  expect(value).toBe("true");

  await cardStylesModel.cancelButton.click();
  await cardStylesModel.deleteCardStyle(title);
  await commonModel.waitUntilSpinnerDisappears();
});


test(`Verify that the default card styles appears to be selected when selecting a brand node`, async ({ page }) => {
  await page.goto(url);
  
  const loginModel = new LoginModel(page);
  const sideBarModel = new SidebarModel(page);
  const topBarModel = new TopBarModel(page);
  const commonModel = new CommonModel(page);
  const cardStylesModel = new CardStylesModel(page);

  await loginModel.login(users[0].username, users[0].password);
  await topBarModel.selectBrand(brandsData.brandNodeContentName);
  await commonModel.waitUntilSpinnerDisappears();
  await sideBarModel.onClickCardStylesOptionMenu();

  const defaultCardStyles = await cardStylesModel.getCardStyleWithDefaultValue();
  
  await sideBarModel.onClickBrandOptionMenu();
  await commonModel.setSearchValue(brandsData.brandNodeName);
  await cardStylesModel.hasBrandTableValues();
  await cardStylesModel.goToManageNodes(brandsData.brandNodeContentName);
  //await brandsModel.hasNodeTableValues(3);
  await cardStylesModel.openEditNodePopup(brandsData.brandNodeContentName);
  await cardStylesModel.verifyStyleCardsAreDisplayedForTheNode(defaultCardStyles);

  await page.waitForTimeout(6000);
});

test(`Verify that when selecting a new card style by default appears to be selected when creating a new node`, async ({ page }) => {
  await page.goto(url);
  const loginModel = new LoginModel(page);
  const sideBarModel = new SidebarModel(page);
  const topBarModel = new TopBarModel(page);
  const commonModel = new CommonModel(page);
  const cardStylesModel = new CardStylesModel(page);
  const brandsModel = new BrandsModel(page);

  await loginModel.login(users[0].username, users[0].password);
  await topBarModel.selectBrand(brandsData.brandNodeContentName);
  await commonModel.waitUntilSpinnerDisappears();
  await sideBarModel.onClickCardStylesOptionMenu();

  let notDefaultCardStyle = await cardStylesModel.getFirstNotDefaultCardStyle();
  
  const title = ("Style Cards" + uuidv4()).slice(0, 30);

  if(notDefaultCardStyle == undefined || notDefaultCardStyle == null){
    await sideBarModel.onClickCardStylesOptionMenu();
    await cardStylesModel.createCardButton.click();
    await commonModel.inputTextInLocator(cardStylesModel.nameInput, title);
    await commonModel.inputTextInLocator(cardStylesModel.valueInput, title);
    await cardStylesModel.saveButton.click();

    notDefaultCardStyle = {
        name: title, value: title
    }

  }

    await cardStylesModel.clickEditButton(notDefaultCardStyle.name);
    await cardStylesModel.defaultCardStyleToggle.click();
    await cardStylesModel.saveButton.click();

    const defaultCardStyles = await cardStylesModel.getCardStyleWithDefaultValue();
    await sideBarModel.onClickBrandOptionMenu();
    await commonModel.setSearchValue(brandsData.brandNodeContentName);
    await brandsModel.brandTableShouldHasOneRow();
    await brandsModel.goToManageNodes(brandsData.brandNodeContentName);
    await brandsModel.hasNodeTableValues(1);
    await brandsModel.addChildNodes('Brand');
    await commonModel.checkCreateContentPopupVisible();

    let cardStyleMenu = await brandsModel.waitCardStylesMenuVisible();
    let cardStyleDefault = "";
    for(let i = 0; i < 60; i++){
      cardStyleDefault = defaultCardStyles.length.toString();
      if(cardStyleMenu.includes(cardStyleDefault)){
        break;
      }
      await page.waitForTimeout(300);
    }
    expect(cardStyleMenu).toContain(cardStyleDefault);
    await brandsModel.onClickCardStylesField();

    for(let i = 0; i < defaultCardStyles.length; i++){
      let cardNameLabel = await brandsModel.multiSelectOptionsPanel.locator('li').nth(i).getAttribute('aria-label');
      let cardName = defaultCardStyles[i].name;
      expect(cardNameLabel).toEqual(cardName);
    }
    await brandsModel.onClickCardStylesField();
    await brandsModel.onClickNodeCancelButton();

    await sideBarModel.onClickCardStylesOptionMenu();
    await cardStylesModel.clickEditButton(notDefaultCardStyle.name);
    await cardStylesModel.defaultCardStyleToggle.click();
    await cardStylesModel.saveButton.click();
    await commonModel.waitUntilSpinnerDisappears();
});


test(`Verify that it is possible to select a card style from the list of card styles from new node`, async ({ page }) => {
  await page.setViewportSize({ width: 1000, height: 1000});
  await page.goto(url);
  const loginModel = new LoginModel(page);
  const sideBarModel = new SidebarModel(page);
  const topBarModel = new TopBarModel(page);
  const commonModel = new CommonModel(page);
  const cardStylesModel = new CardStylesModel(page);
  const brandsModel = new BrandsModel(page);

  await loginModel.login(users[0].username, users[0].password);
  await topBarModel.selectBrand(brandsData.brandNodeContentName);
  await commonModel.waitUntilSpinnerDisappears();
  await sideBarModel.onClickBrandOptionMenu();
  await commonModel.setSearchValue(brandsData.brandNodeContentName);
  await brandsModel.brandTableShouldHasOneRow();
  await brandsModel.goToManageNodes(brandsData.brandNodeContentName);
  await brandsModel.hasNodeTableValues(1);
  await cardStylesModel.openEditNodePopup(brandsData.brandNodeContentName);
  await brandsModel.onClickCardStylesField();
  await page.waitForTimeout(800);
  const cardStylesCount = await brandsModel.multiSelectOptionsPanel.locator('li').count();
  let cardStylesSelected :string[] = [];

  for(let i = 0; i < cardStylesCount; i++){
    let classOption = await brandsModel.multiSelectOptionsPanel.locator('li').nth(i).getAttribute('class');
    let isNotSelected = classOption?.includes('p-highlight');
      if(!isNotSelected){
          await brandsModel.multiSelectOptionsPanel.locator('li').nth(i).click();
          const cardStyleName = await brandsModel.multiSelectOptionsPanel.locator('li').nth(i).locator('span').nth(1).innerText();
          cardStylesSelected.push(cardStyleName);
      }
  }
  await brandsModel.onClickCardStylesField();
  await cardStylesModel.onClickNodeSaveButton();
  await commonModel.waitUntilSpinnerDisappears();
  await commonModel.waitForSnackbarDissapear();

  await brandsModel.openEditNodePopUp(brandsData.brandNodeContentName);
  await brandsModel.onClickCardStylesField();
  await page.waitForTimeout(800);
  for(let i = 0; i < cardStylesCount; i++){
      let cardName = await brandsModel.multiSelectOptionsPanel.locator('li').nth(i).getAttribute('aria-label');
      let classCard = await brandsModel.multiSelectOptionsPanel.locator('li').nth(i).getAttribute('class');
      let isNotSelected = classCard?.includes('p-highlight');
      if(cardName == cardStylesSelected[0]){
        break;
      }
      expect(isNotSelected).toBe(true);
  }
  await brandsModel.onClickCardStylesField();
  await brandsModel.onClickNodeCancelButton();
  await commonModel.waitUntilSpinnerDisappears();

  await brandsModel.openEditNodePopUp(brandsData.brandNodeContentName);
  await brandsModel.onClickCardStylesField();
  await page.waitForTimeout(800);
  for(let i = 0; i < cardStylesCount; i++){
      let cardName = await brandsModel.multiSelectOptionsPanel.locator('li').nth(i).getAttribute('aria-label');
      if(cardName == cardStylesSelected[0]){
        await brandsModel.multiSelectOptionsPanel.locator('li').nth(i).click();
      }
  }

  await brandsModel.onClickCardStylesField();
  await cardStylesModel.onClickNodeSaveButton();
  await commonModel.waitUntilSpinnerDisappears();
});


test(`Verify that brand card styles can be viewed in content view`, async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 3600});
  await page.goto(url);
  const loginModel = new LoginModel(page);
  const sideBarModel = new SidebarModel(page);
  const topBarModel = new TopBarModel(page);
  const commonModel = new CommonModel(page);
  const cardStylesModel = new CardStylesModel(page);
  const brandsModel = new BrandsModel(page);
  const contentModel = new ContentModel(page);

  await loginModel.login(users[0].username, users[0].password);
  await topBarModel.selectBrand(brandsData.brandNodeContentName);
  await commonModel.waitUntilSpinnerDisappears();
  await sideBarModel.onClickBrandOptionMenu();
  await commonModel.setSearchValue(brandsData.brandNodeContentName);
  await brandsModel.brandTableShouldHasOneRow();
  await brandsModel.goToManageNodes(brandsData.brandNodeContentName);
  await brandsModel.hasNodeTableValues(1);
  await brandsModel.openEditNodePopUp(brandsData.brandNodeContentName);

  await brandsModel.onClickCardStylesField();
  const cardStylesCount = await brandsModel.multiSelectOptionsPanel.locator('li').count();
  let cardStylesSelected :string[] = [];

  for(let i = 0; i < cardStylesCount; i++){
    let classCard = await brandsModel.multiSelectOptionsPanel.locator('li').nth(i).getAttribute('class');
    let isNotSelected = classCard?.includes('p-highlight');
    const cardStyleName = await brandsModel.multiSelectOptionsPanel.locator('li').nth(i).getAttribute("aria-label");
    if(isNotSelected){
      cardStylesSelected.push(cardStyleName!);
    }
  }

  await brandsModel.onClickCardStylesField();
  await brandsModel.onClickNodeCancelButton();
  await commonModel.waitUntilSpinnerDisappears();

  await brandsModel.goToManageContentView(brandsData.brandNodeContentName);

  await contentModel.onClikSingleItemBtn();
  await contentModel.clickDealMenu();
  await contentModel.clickCardStylesMenuIfIsVisible();
  await contentModel.verifyThatTheStylesCardsAreDisplayed(cardStylesSelected);
});


test(`Verify that brand and subbrand card styles can be viewed in content view at subbrand level`, async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 3600});
  await page.goto(url);
  const loginModel = new LoginModel(page);
  const sideBarModel = new SidebarModel(page);
  const topBarModel = new TopBarModel(page);
  const commonModel = new CommonModel(page);
  const cardStylesModel = new CardStylesModel(page);
  const brandsModel = new BrandsModel(page);
  const contentModel = new ContentModel(page);

  await loginModel.login(users[0].username, users[0].password);
  await topBarModel.selectBrand(brandsData.brandNodeContentName);
  await commonModel.waitUntilSpinnerDisappears();
  await sideBarModel.onClickBrandOptionMenu();
  await commonModel.setSearchValue(brandsData.brandNodeContentName);
  await brandsModel.brandTableShouldHasOneRow();
  await brandsModel.goToManageNodes(brandsData.brandNodeContentName);
  await brandsModel.hasNodeTableValues(1);
  await brandsModel.openEditNodePopUp(brandsData.subBrandContentName);

  await brandsModel.onClickCardStylesField();
  await page.waitForTimeout(1000);
  const cardStylesCount = await brandsModel.multiSelectOptionsPanel.locator('li').count();
  let cardStylesSelected :string[] = [];

  for(let i = 0; i < cardStylesCount; i++){
    let classCard = await brandsModel.multiSelectOptionsPanel.locator('li').nth(i).getAttribute('class');
    let isNotSelected = classCard?.includes('p-highlight');
    const cardStyleName = await brandsModel.multiSelectOptionsPanel.locator('li').nth(i).getAttribute("aria-label");
    if(isNotSelected){
      cardStylesSelected.push(cardStyleName!);
    }
  }

  await brandsModel.onClickCardStylesField();
  await brandsModel.onClickNodeCancelButton();
  await commonModel.waitUntilSpinnerDisappears();

  await brandsModel.goToManageContentView(brandsData.brandNodeContentName);

  await contentModel.onClikSingleItemBtn();
  await contentModel.clickDealMenu();
  await contentModel.clickCardStylesMenuIfIsVisible();
  await contentModel.verifyThatTheStylesCardsAreDisplayed(cardStylesSelected);
});
