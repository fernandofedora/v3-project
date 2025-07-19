import { test, expect } from '@playwright/test';
import { LoginModel } from '../../pom/loginModel';
import { TopBarModel } from '../../pom/topBarModel';
import { CommonModel } from '../../pom/commonModel';
import { SidebarModel } from '../../pom/sidebarModel';
import { HeadlinesAndIconsModel } from '../../pom/headlinesAndIconsModel';
import { ContentModel } from '../../pom/contentModel';
import { brandsData } from '../../data/brandsData';
import { headlinesAndIconsData } from '../../data/headlinesAndIconsData';
import { RolesEnum as Roles } from '../../enums/roles.enum';
import { validateEnvironment } from '../../utils/urlHandler';
import { validateUsers } from '../../utils/userHandler';
import { storeOwnerRoleValidation } from '../../utils/rolesHandler';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const users = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.brandNodeContentName));
const url: string = validateEnvironment();

test.describe('Manage Icons and Headlines', () => {

  test.beforeEach(async ({ page }) => {
    test.setTimeout(90000);
    await page.goto(url, {waitUntil: "load"});
    await page.setViewportSize({width: 1000, height: 3600});
  });

  users.forEach(user => {

    test(`Verify that you can delete a previously created headline at brand level '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);
      const headlinesAndIconsModel = new HeadlinesAndIconsModel(page);
      const contentModel = new ContentModel(page);

      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) {
        await topBarModel.selectBrand(brandsData.brandNodeContentName);
        await sidebarModel.onClickContentOptionMenu();
        await contentModel.waitContentSkeletonNotVisible();
      }

      const headlineName = (headlinesAndIconsData.headlineName + uuidv4()).slice(0, 20);
      await contentModel.verifyDeleteButtonIsDisplayed();
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickHeadlinesMenu();
      await headlinesAndIconsModel.onClickHeadlinesField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameHeadline(headlineName);
      await headlinesAndIconsModel.onClickSaveBtn();
      await headlinesAndIconsModel.waitSnackBarIsNotVisible();
      await commonModel.waitUntilSpinnerDisappears();

      await sidebarModel.onClickIconsHeadlinesOptionMenu();
      await headlinesAndIconsModel.waitSnackBarIsNotVisible();
      await headlinesAndIconsModel.onClickHeadlineDeleteItem(headlineName);

      await headlinesAndIconsModel.verifySnackBarMessage(headlineName);

     await headlinesAndIconsModel.checkHeadlineInTable(headlineName, false);

    });

    test(`Verify that you can create a new headline with the name field and the translations field populated at the brand level '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);
      const headlinesAndIconsModel = new HeadlinesAndIconsModel(page);
      const contentModel = new ContentModel(page);

      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) {
        await topBarModel.selectBrand(brandsData.brandNodeContentName);
        await sidebarModel.onClickContentOptionMenu();
        await contentModel.waitContentSkeletonNotVisible();
      }

      const headlineName = (headlinesAndIconsData.headlineName + uuidv4()).slice(0, 20);
      await contentModel.verifyDeleteButtonIsDisplayed();
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickHeadlinesMenu();
      await headlinesAndIconsModel.onClickHeadlinesField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameHeadline(headlineName);
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickIconsHeadlinesOptionMenu();
      await headlinesAndIconsModel.checkHeadlineInTable(headlineName, true);

      await headlinesAndIconsModel.onClickHeadlineDeleteItem(headlineName);

      await headlinesAndIconsModel.checkHeadlineInTable(headlineName, false);
    });

    test(`Verify that the headline name can be edited at brand level '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);
      const headlinesAndIconsModel = new HeadlinesAndIconsModel(page);
      const contentModel = new ContentModel(page);

      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) {
        await topBarModel.selectBrand(brandsData.brandNodeContentName);
        await sidebarModel.onClickContentOptionMenu();
        await contentModel.waitContentSkeletonNotVisible();
      }

      let headlineName = (headlinesAndIconsData.headlineName + uuidv4()).slice(0, 20);
      await contentModel.verifyDeleteButtonIsDisplayed();
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickHeadlinesMenu();
      await headlinesAndIconsModel.onClickHeadlinesField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameHeadline(headlineName);
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickIconsHeadlinesOptionMenu();

      await headlinesAndIconsModel.onClickHeadlineEditItem(headlineName);
      headlineName += 'Edit';
      await headlinesAndIconsModel.setNameHeadline(headlineName);
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();

      await expect( async () => {
        await expect(commonModel.snackbar).toBeVisible( {timeout:300} );
        expect(((await commonModel.snackbar.innerText()).trim())).toEqual(headlinesAndIconsData.headlineEditedSuccessfully);
      }).toPass();
      
      await headlinesAndIconsModel.checkHeadlineInTable(headlineName, true);

      await headlinesAndIconsModel.onClickHeadlineDeleteItem(headlineName);

      await headlinesAndIconsModel.checkHeadlineInTable(headlineName, false);
    });

    test(`Verify that the results of a search are displayed when the search bar is populated with a valid name in the headlines table '${user.role}'`, async ({ page }) => {
      test.setTimeout(120000);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);
      const headlinesAndIconsModel = new HeadlinesAndIconsModel(page);
      const contentModel = new ContentModel(page);

      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) {
        await topBarModel.selectBrand(brandsData.brandNodeContentName);
        await sidebarModel.onClickContentOptionMenu();
        await contentModel.waitContentSkeletonNotVisible();
      }

      const headlineName = (headlinesAndIconsData.headlineName + uuidv4()).slice(0, 20);
      await contentModel.verifyDeleteButtonIsDisplayed();
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickHeadlinesMenu();
      await headlinesAndIconsModel.onClickHeadlinesField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameHeadline(headlineName);
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickIconsHeadlinesOptionMenu();

      await headlinesAndIconsModel.setHeadlineSearchValue(headlineName);
      await headlinesAndIconsModel.checkHeadlineInTable(headlineName, true);

      await headlinesAndIconsModel.onClickHeadlineDeleteItem(headlineName);

      await headlinesAndIconsModel.checkHeadlineInTable(headlineName, false);
    });

    test(`Verify that the results of a search are not displayed when the search bar is populated with an invalid name in the headlines table '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);
      const headlinesAndIconsModel = new HeadlinesAndIconsModel(page);
      const contentModel = new ContentModel(page);

      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) {
        await topBarModel.selectBrand(brandsData.brandNodeContentName);
        await sidebarModel.onClickContentOptionMenu();
        await contentModel.waitContentSkeletonNotVisible();
      }

      const headlineName = (headlinesAndIconsData.headlineName + uuidv4()).slice(0, 20);
      await contentModel.verifyDeleteButtonIsDisplayed();
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickHeadlinesMenu();
      await headlinesAndIconsModel.onClickHeadlinesField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameHeadline(headlineName);
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickIconsHeadlinesOptionMenu();

      await headlinesAndIconsModel.setHeadlineSearchValue('invalid');
      await headlinesAndIconsModel.checkHeadlineInTable(headlineName, false);
      expect(await headlinesAndIconsModel.headlinesTable.locator('tr').count()).toBeGreaterThanOrEqual(0);

      await headlinesAndIconsModel.searchHeadlineInput.click({delay:2000});
      await headlinesAndIconsModel.searchHeadlineInput.clear();
      await headlinesAndIconsModel.onClickHeadlineDeleteItem(headlineName);

      //await headlinesAndIconsModel.checkHeadlineInTable(headlineName, false);
    });

    test(`Verify that you can create a new icon with the name field and the logo field populated at the brand level '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);
      const headlinesAndIconsModel = new HeadlinesAndIconsModel(page);
      const contentModel = new ContentModel(page);

      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) {
        await topBarModel.selectBrand(brandsData.brandNodeContentName);
        await sidebarModel.onClickContentOptionMenu();
        await contentModel.waitContentSkeletonNotVisible();
      }

      const iconName = (headlinesAndIconsData.iconsName + uuidv4()).slice(0, 20);
      await contentModel.verifyDeleteButtonIsDisplayed();
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickMediaIconsMenu();
      await headlinesAndIconsModel.onClickIconsField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameIcon(iconName);
      await headlinesAndIconsModel.setLogoIcon(path.join(__dirname, '../../images/high_sugar.webp'));
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickIconsHeadlinesOptionMenu();
      await headlinesAndIconsModel.checkIconInTable(iconName, true);

      await headlinesAndIconsModel.onClickIconDeleteItem(iconName);

      await headlinesAndIconsModel.checkIconInTable(iconName, false);

    });

    test(`Verify that when the name field is empty the logo is not created at brand level '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);
      const headlinesAndIconsModel = new HeadlinesAndIconsModel(page);
      const contentModel = new ContentModel(page);

      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) {
        await topBarModel.selectBrand(brandsData.brandNodeContentName);
        await sidebarModel.onClickContentOptionMenu();
        await contentModel.waitContentSkeletonNotVisible();
      }

      const iconName = (headlinesAndIconsData.iconsName + uuidv4()).slice(0, 20);
      await contentModel.verifyDeleteButtonIsDisplayed();
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickMediaIconsMenu();
      await headlinesAndIconsModel.onClickIconsField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setLogoIcon(path.join(__dirname, '../../images/high_sugar.webp'));
      await headlinesAndIconsModel.onClickSaveBtn();
      //await commonModel.waitUntilSpinnerDisappears();

      await expect( async () => {
        await expect(commonModel.existAlert).toBeVisible( {timeout:300} );
        expect(((await commonModel.existAlert.innerText()).trim())).toEqual(headlinesAndIconsData.nameRequired);
      }).toPass();

      await headlinesAndIconsModel.onClickCancelButton();
      await sidebarModel.onClickIconsHeadlinesOptionMenu();
      await headlinesAndIconsModel.checkIconInTable(iconName, false);
    });

    test(`Verify that the icon name can be edited with the edit button from the icons table at the brand level '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);
      const headlinesAndIconsModel = new HeadlinesAndIconsModel(page);
      const contentModel = new ContentModel(page);

      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) {
        await topBarModel.selectBrand(brandsData.brandNodeContentName);
        await sidebarModel.onClickContentOptionMenu();
        await contentModel.waitContentSkeletonNotVisible();
      }

      let iconName = (headlinesAndIconsData.iconsName + uuidv4()).slice(0, 20);
      await contentModel.verifyDeleteButtonIsDisplayed();
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickMediaIconsMenu();
      await headlinesAndIconsModel.onClickIconsField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameIcon(iconName);
      await headlinesAndIconsModel.setLogoIcon(path.join(__dirname, '../../images/high_sugar.webp'));
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickIconsHeadlinesOptionMenu();

      await headlinesAndIconsModel.onClickIconEditItem(iconName);
      iconName += 'Edit';
      await headlinesAndIconsModel.setNameIcon(iconName);
      await headlinesAndIconsModel.onClickSaveBtn();
      //await commonModel.waitUntilSpinnerDisappears();

      await expect( async () => {
        await expect(commonModel.snackbar).toBeVisible( {timeout:300} );
        expect(((await commonModel.snackbar.innerText()).trim())).toEqual(headlinesAndIconsData.iconEditedSuccessfully);
      }).toPass();

      await headlinesAndIconsModel.checkIconInTable(iconName, true);

      await headlinesAndIconsModel.onClickIconDeleteItem(iconName);

      await headlinesAndIconsModel.checkIconInTable(iconName, false);
    });

    test(`Verify that the name is not edited when the name field is empty in the Edit Icon modal at brand level '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);
      const headlinesAndIconsModel = new HeadlinesAndIconsModel(page);
      const contentModel = new ContentModel(page);

      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) {
        await topBarModel.selectBrand(brandsData.brandNodeContentName);
        await sidebarModel.onClickContentOptionMenu();
        await contentModel.waitContentSkeletonNotVisible();
      }

      const iconName = (headlinesAndIconsData.iconsName + uuidv4()).slice(0, 20);
      await contentModel.verifyDeleteButtonIsDisplayed();
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickMediaIconsMenu();
      await headlinesAndIconsModel.onClickIconsField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameIcon(iconName);
      await headlinesAndIconsModel.setLogoIcon(path.join(__dirname, '../../images/high_sugar.webp'));
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickIconsHeadlinesOptionMenu();

      await sidebarModel.onClickIconsHeadlinesOptionMenu();
      await headlinesAndIconsModel.onClickIconEditItem(iconName);
      await headlinesAndIconsModel.nameIconInput.click();
      await headlinesAndIconsModel.nameIconInput.clear();
      await headlinesAndIconsModel.onClickSaveBtn();

      expect((await commonModel.existAlert.innerText()).includes(headlinesAndIconsData.nameRequired)).toBeTruthy();
      await headlinesAndIconsModel.onClickCancelButton();
      await headlinesAndIconsModel.onClickIconDeleteItem(iconName);

      await headlinesAndIconsModel.checkIconInTable(iconName, false);
    });

    test(`Verify that the icon is deleted when the delete button is clicked and the delete action is confirmed at the brand level '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);
      const headlinesAndIconsModel = new HeadlinesAndIconsModel(page);
      const contentModel = new ContentModel(page);

      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) {
        await topBarModel.selectBrand(brandsData.brandNodeContentName);
        await sidebarModel.onClickContentOptionMenu();
        await contentModel.waitContentSkeletonNotVisible();
      }

      const iconName = (headlinesAndIconsData.iconsName + uuidv4()).slice(0, 20);
      await contentModel.verifyDeleteButtonIsDisplayed();
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickMediaIconsMenu();
      await headlinesAndIconsModel.onClickIconsField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameIcon(iconName);
      await headlinesAndIconsModel.setLogoIcon(path.join(__dirname, '../../images/high_sugar.webp'));
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickIconsHeadlinesOptionMenu();

      await sidebarModel.onClickIconsHeadlinesOptionMenu();
      await headlinesAndIconsModel.onClickIconDeleteItem(iconName);
      await headlinesAndIconsModel.checkIconInTable(iconName, false);
    });

    test(`Verify that the results of a search are displayed when the search bar is populated with a valid name in the icons table '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);
      const headlinesAndIconsModel = new HeadlinesAndIconsModel(page);
      const contentModel = new ContentModel(page);

      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) {
        await topBarModel.selectBrand(brandsData.brandNodeContentName);
        await sidebarModel.onClickContentOptionMenu();
        await contentModel.waitContentSkeletonNotVisible();
      }

      const iconName = (headlinesAndIconsData.iconsName + uuidv4()).slice(0, 20);
      await contentModel.verifyDeleteButtonIsDisplayed();
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickMediaIconsMenu();
      await headlinesAndIconsModel.onClickIconsField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameIcon(iconName);
      await headlinesAndIconsModel.setLogoIcon(path.join(__dirname, '../../images/high_sugar.webp'));
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickIconsHeadlinesOptionMenu();

      await headlinesAndIconsModel.setIconSearchValue(iconName);
      await headlinesAndIconsModel.checkIconInTable(iconName, true);

      await headlinesAndIconsModel.onClickIconDeleteItem(iconName);

      await headlinesAndIconsModel.checkIconInTable(iconName, false);
    });

    test(`Verify that the results of a search are not displayed when the search bar is populated with an invalid name in the icons table '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);
      const headlinesAndIconsModel = new HeadlinesAndIconsModel(page);
      const contentModel = new ContentModel(page);

      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) {
        await topBarModel.selectBrand(brandsData.brandNodeContentName);
        await sidebarModel.onClickContentOptionMenu();
        await contentModel.waitContentSkeletonNotVisible();
      }

      const iconName = (headlinesAndIconsData.iconsName + uuidv4()).slice(0, 20);
      await contentModel.verifyDeleteButtonIsDisplayed();
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickMediaIconsMenu();
      await headlinesAndIconsModel.onClickIconsField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameIcon(iconName);
      await headlinesAndIconsModel.setLogoIcon(path.join(__dirname, '../../images/high_sugar.webp'));
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickIconsHeadlinesOptionMenu();

      await headlinesAndIconsModel.setIconSearchValue("invalid");
      await headlinesAndIconsModel.checkIconInTable(iconName, false);
      expect(await headlinesAndIconsModel.iconsTable.locator('tr').count()).toBeGreaterThanOrEqual(0);

      await headlinesAndIconsModel.searchIconInput.click();
      await headlinesAndIconsModel.searchIconInput.clear();
      await headlinesAndIconsModel.onClickIconDeleteItem(iconName);
      
      await headlinesAndIconsModel.checkIconInTable(iconName, false);
    });

  });

});
