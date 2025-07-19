import { test, expect } from '@playwright/test';
import { LoginModel } from '../pom/loginModel';
import { TopBarModel } from '../pom/topBarModel';
import { CommonModel } from '../pom/commonModel';
import { SidebarModel } from '../pom/sidebarModel';
import { HeadlinesAndIconsModel } from '../pom/headlinesAndIconsModel';
import { ContentModel } from '../pom/contentModel';
import { brandsData } from '../data/brandsData';
import { headlinesAndIconsData } from '../data/headlinesAndIconsData';
import { RolesEnum as Roles } from '../enums/roles.enum';
import { ColumnHeadersEnum } from '../enums/columnHeaders.enum';
import { validateEnvironment } from '../utils/urlHandler';
import { validateUsers } from '../utils/userHandler';
import { storeOwnerRoleValidation } from '../utils/rolesHandler';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const users = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.brandNodeContentName));
const usersDataEn = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.brandNodeNameEn));
const url: string = validateEnvironment();

test.describe('Manage Icons and Headlines', () => {

  test.beforeEach(async ({ page }, testInfo) => {
    test.setTimeout(60000);
    await page.goto(url, { waitUntil: "load" });
    await page.setViewportSize({width: 1224, height: 1000});
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
      }

      const headlineName = (headlinesAndIconsData.headlineName + uuidv4()).slice(0, 15);
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickHeadlinesMenu();
      await headlinesAndIconsModel.onClickHeadlinesField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameHeadline(headlineName);
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();

      await sidebarModel.onClickIconsHeadlinesOptionMenu();
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
      }

      const headlineName = (headlinesAndIconsData.headlineName + uuidv4()).slice(0, 15);
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
      }

      let headlineName = (headlinesAndIconsData.headlineName + uuidv4()).slice(0, 15);
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

      expect((await commonModel.snackbar.nth(0).innerText()).includes(headlinesAndIconsData.headlineEditedSuccessfully)).toBeTruthy();
      await headlinesAndIconsModel.checkHeadlineInTable(headlineName, true);

      await headlinesAndIconsModel.onClickHeadlineDeleteItem(headlineName);

      await headlinesAndIconsModel.checkHeadlineInTable(headlineName, false);
    });

    test(`Verify that the results of a search are displayed when the search bar is populated with a valid name in the headlines table '${user.role}'`, async ({ page }) => {
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
      }

      const headlineName = (headlinesAndIconsData.headlineName + uuidv4()).slice(0, 15);
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
      }

      const headlineName = (headlinesAndIconsData.headlineName + uuidv4()).slice(0, 15);
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickHeadlinesMenu();
      await headlinesAndIconsModel.onClickHeadlinesField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameHeadline(headlineName);
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickIconsHeadlinesOptionMenu();

      await headlinesAndIconsModel.setHeadlineSearchValue('Invalid');
      await headlinesAndIconsModel.checkHeadlineInTable(headlineName, false);
      expect(await headlinesAndIconsModel.headlinesTable.locator('tr').count()).toBeGreaterThanOrEqual(0);

      await headlinesAndIconsModel.searchHeadlineInput.click();
      await headlinesAndIconsModel.searchHeadlineInput.clear();
      await headlinesAndIconsModel.onClickHeadlineDeleteItem(headlineName);
      await headlinesAndIconsModel.checkHeadlineInTable(headlineName, false);
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
      }

      const iconName = (headlinesAndIconsData.iconsName + uuidv4()).slice(0, 15);
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickMediaIconsMenu();
      await headlinesAndIconsModel.onClickIconsField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameIcon(iconName);
      await headlinesAndIconsModel.setLogoIcon(path.join(__dirname, '../images/high_sugar.webp'));
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
      }

      const iconName = (headlinesAndIconsData.iconsName + uuidv4()).slice(0, 15);
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickMediaIconsMenu();
      await headlinesAndIconsModel.onClickIconsField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setLogoIcon(path.join(__dirname, '../images/high_sugar.webp'));
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();

      expect((await commonModel.existAlert.innerText()).includes(headlinesAndIconsData.nameRequired)).toBeTruthy();

      await commonModel.onClickNoCancelButton();
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
      }

      let iconName = (headlinesAndIconsData.iconsName + uuidv4()).slice(0, 15);
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickMediaIconsMenu();
      await headlinesAndIconsModel.onClickIconsField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameIcon(iconName);
      await headlinesAndIconsModel.setLogoIcon(path.join(__dirname, '../images/high_sugar.webp'));
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickIconsHeadlinesOptionMenu();

      await headlinesAndIconsModel.onClickIconEditItem(iconName);
      iconName += 'Edit';
      await headlinesAndIconsModel.setNameIcon(iconName);
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();

      expect((await commonModel.snackbar.nth(0).innerText()).includes(headlinesAndIconsData.iconEditedSuccessfully)).toBeTruthy();
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
      }

      const iconName = (headlinesAndIconsData.iconsName + uuidv4()).slice(0, 15);
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickMediaIconsMenu();
      await headlinesAndIconsModel.onClickIconsField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameIcon(iconName);
      await headlinesAndIconsModel.setLogoIcon(path.join(__dirname, '../images/high_sugar.webp'));
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickIconsHeadlinesOptionMenu();

      await sidebarModel.onClickIconsHeadlinesOptionMenu();
      await headlinesAndIconsModel.onClickIconEditItem(iconName);
      await headlinesAndIconsModel.nameIconInput.click();
      await headlinesAndIconsModel.nameIconInput.clear();
      await headlinesAndIconsModel.onClickSaveBtn();

      expect((await commonModel.existAlert.innerText()).includes(headlinesAndIconsData.nameRequired)).toBeTruthy();
      await commonModel.onClickNoCancelButton();
      await headlinesAndIconsModel.onClickIconDeleteItem(iconName);
      await headlinesAndIconsModel.checkIconInTable(iconName, false);
    });

    test(`Verify that the icon name is not edited when the Cancel button is clicked in the Edit Icon modal at brand level '${user.role}'`, async ({ page }) => {
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
      }

      const iconName = (headlinesAndIconsData.iconsName + uuidv4()).slice(0, 15);
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickMediaIconsMenu();
      await headlinesAndIconsModel.onClickIconsField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameIcon(iconName);
      await headlinesAndIconsModel.setLogoIcon(path.join(__dirname, '../images/high_sugar.webp'));
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickIconsHeadlinesOptionMenu();

      await sidebarModel.onClickIconsHeadlinesOptionMenu();
      await headlinesAndIconsModel.onClickIconEditItem(iconName);
      const iconName2 = (headlinesAndIconsData.iconsName + uuidv4()).slice(0, 15);
      await headlinesAndIconsModel.setNameIcon(iconName2);
      await headlinesAndIconsModel.onClickCancelButton();

      await headlinesAndIconsModel.checkIconInTable(iconName, true);
      await headlinesAndIconsModel.checkIconInTable(iconName2, false);
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
      }

      const iconName = (headlinesAndIconsData.iconsName + uuidv4()).slice(0, 15);
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickMediaIconsMenu();
      await headlinesAndIconsModel.onClickIconsField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameIcon(iconName);
      await headlinesAndIconsModel.setLogoIcon(path.join(__dirname, '../images/high_sugar.webp'));
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickIconsHeadlinesOptionMenu();

      await sidebarModel.onClickIconsHeadlinesOptionMenu();
      await headlinesAndIconsModel.onClickIconDeleteItem(iconName);
      await headlinesAndIconsModel.checkIconInTable(iconName, false);
    });

    test(`Verify that the icon is not deleted when the delete button is clicked and the action is not confirmed at brand level '${user.role}'`, async ({ page }) => {
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
      }

      const iconName = (headlinesAndIconsData.iconsName + uuidv4()).slice(0, 15);
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickMediaIconsMenu();
      await headlinesAndIconsModel.onClickIconsField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameIcon(iconName);
      await headlinesAndIconsModel.setLogoIcon(path.join(__dirname, '../images/high_sugar.webp'));
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickIconsHeadlinesOptionMenu();
      await headlinesAndIconsModel.onClickIconDeleteItem(iconName, false);
      await headlinesAndIconsModel.onClickCancelButton();
      await headlinesAndIconsModel.checkIconInTable(iconName, true);
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
      }

      const iconName = (headlinesAndIconsData.iconsName + uuidv4()).slice(0, 15);
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickMediaIconsMenu();
      await headlinesAndIconsModel.onClickIconsField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameIcon(iconName);
      await headlinesAndIconsModel.setLogoIcon(path.join(__dirname, '../images/high_sugar.webp'));
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
      }

      const iconName = (headlinesAndIconsData.iconsName + uuidv4()).slice(0, 15);
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickMediaIconsMenu();
      await headlinesAndIconsModel.onClickIconsField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameIcon(iconName);
      await headlinesAndIconsModel.setLogoIcon(path.join(__dirname, '../images/high_sugar.webp'));
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickIconsHeadlinesOptionMenu();

      await headlinesAndIconsModel.setIconSearchValue('Invalid');
      await headlinesAndIconsModel.checkIconInTable(iconName, false);
      expect(await headlinesAndIconsModel.iconsTable.locator('tr').count()).toBeGreaterThanOrEqual(0);

      await headlinesAndIconsModel.searchIconInput.click();
      await headlinesAndIconsModel.searchIconInput.clear();
      await headlinesAndIconsModel.onClickIconDeleteItem(iconName);
      await headlinesAndIconsModel.checkIconInTable(iconName, false);
    });

    test(`Verify that the unordered list of icons should be ordered in ASC order by name when the name header is clicked '${user.role}'`, async ({ page }) => {
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
      }

      const iconName = (headlinesAndIconsData.iconsName + uuidv4()).slice(0, 15);
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickMediaIconsMenu();
      await headlinesAndIconsModel.onClickIconsField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameIcon(iconName);
      await headlinesAndIconsModel.setLogoIcon(path.join(__dirname, '../images/high_sugar.webp'));
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickIconsHeadlinesOptionMenu();

      let iconsList1 = await headlinesAndIconsModel.getElementsInIconsTable(ColumnHeadersEnum.name, true);
      await headlinesAndIconsModel.onClickHeaderName();
      let iconsList2 = await headlinesAndIconsModel.getElementsInIconsTable(ColumnHeadersEnum.name, false);
      await headlinesAndIconsModel.verifySortUpIconInIconsTable(ColumnHeadersEnum.name);
      await headlinesAndIconsModel.compareArrays(iconsList1, iconsList2);

      await headlinesAndIconsModel.onClickIconDeleteItem(iconName);
      await headlinesAndIconsModel.checkIconInTable(iconName, false);
    });

    test(`Verify that the list in ASC order by Name should be ordered in DESC order when the Name header is clicked '${user.role}'`, async ({ page }) => {
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
      }

      const iconName = (headlinesAndIconsData.iconsName + uuidv4()).slice(0, 15);
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickMediaIconsMenu();
      await headlinesAndIconsModel.onClickIconsField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameIcon(iconName);
      await headlinesAndIconsModel.setLogoIcon(path.join(__dirname, '../images/high_sugar.webp'));
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickIconsHeadlinesOptionMenu();

      let iconsList1 = await headlinesAndIconsModel.getElementsInIconsTable(ColumnHeadersEnum.name, false, true);
      await headlinesAndIconsModel.onClickHeaderName(); // Ascending
      await headlinesAndIconsModel.onClickHeaderName(); // Descending
      let iconsList2 = await headlinesAndIconsModel.getElementsInIconsTable(ColumnHeadersEnum.name);
      //await headlinesAndIconsModel.verifySortUpIconInIconsTable(ColumnHeadersEnum.name);
      await headlinesAndIconsModel.verifySortDownIconInIconsTable(ColumnHeadersEnum.name,);
      await headlinesAndIconsModel.compareArrays(iconsList1, iconsList2);

      await headlinesAndIconsModel.onClickIconDeleteItem(iconName);
      await headlinesAndIconsModel.checkIconInTable(iconName, false);
    });

    test(`Verify that the unordered list of icons should be ordered in ASC order by node when the node header is clicked '${user.role}'`, async ({ page }) => {
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
      }

      const iconName = (headlinesAndIconsData.iconsName + uuidv4()).slice(0, 15);
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickMediaIconsMenu();
      await headlinesAndIconsModel.onClickIconsField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameIcon(iconName);
      await headlinesAndIconsModel.setLogoIcon(path.join(__dirname, '../images/high_sugar.webp'));
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickIconsHeadlinesOptionMenu();

      let iconsList1 = await headlinesAndIconsModel.getElementsInIconsTable(ColumnHeadersEnum.node, true);
      await headlinesAndIconsModel.onClickHeaderNode();
      let iconsList2 = await headlinesAndIconsModel.getElementsInIconsTable(ColumnHeadersEnum.node, false);
      await headlinesAndIconsModel.verifySortUpIconInIconsTable(ColumnHeadersEnum.node);
      await headlinesAndIconsModel.compareArrays(iconsList1, iconsList2);

      await headlinesAndIconsModel.onClickIconDeleteItem(iconName);
      await headlinesAndIconsModel.checkIconInTable(iconName, false);
    });

    test(`Verify that the list in ASC order by Node should be ordered in DESC order when the Node header is clicked '${user.role}'`, async ({ page }) => {
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
      }

      const iconName = (headlinesAndIconsData.iconsName + uuidv4()).slice(0, 15);
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickMediaIconsMenu();
      await headlinesAndIconsModel.onClickIconsField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameIcon(iconName);
      await headlinesAndIconsModel.setLogoIcon(path.join(__dirname, '../images/high_sugar.webp'));
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickIconsHeadlinesOptionMenu();

      let iconsList1 = await headlinesAndIconsModel.getElementsInIconsTable(ColumnHeadersEnum.node, false, true);
      await headlinesAndIconsModel.onClickHeaderNode(); // Ascending
      await headlinesAndIconsModel.onClickHeaderNode(); // Descending
      let iconsList2 = await headlinesAndIconsModel.getElementsInIconsTable(ColumnHeadersEnum.node);
      //await headlinesAndIconsModel.verifySortUpIconInIconsTable(ColumnHeadersEnum.node, false);
      await headlinesAndIconsModel.verifySortDownIconInIconsTable(ColumnHeadersEnum.node);
      await headlinesAndIconsModel.compareArrays(iconsList1, iconsList2);

      await headlinesAndIconsModel.onClickIconDeleteItem(iconName);
      await headlinesAndIconsModel.checkIconInTable(iconName, false);
    });

    test(`Verify that the unordered list of icons should be ordered in ASC order by dimensions when the dimensions header is clicked '${user.role}'`, async ({ page }) => {
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
      }

      const iconName = (headlinesAndIconsData.iconsName + uuidv4()).slice(0, 15);
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickMediaIconsMenu();
      await headlinesAndIconsModel.onClickIconsField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameIcon(iconName);
      await headlinesAndIconsModel.setLogoIcon(path.join(__dirname, '../images/high_sugar.webp'));
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickIconsHeadlinesOptionMenu();

      let iconsList1 = await headlinesAndIconsModel.getElementsInIconsTable(ColumnHeadersEnum.dimensions, true);
      await headlinesAndIconsModel.onClickHeaderDimensions();
      let iconsList2 = await headlinesAndIconsModel.getElementsInIconsTable(ColumnHeadersEnum.dimensions, false);
      await headlinesAndIconsModel.verifySortUpIconInIconsTable(ColumnHeadersEnum.dimensions);
      await headlinesAndIconsModel.compareArrays(iconsList1, iconsList2);

      await headlinesAndIconsModel.onClickIconDeleteItem(iconName);
      await headlinesAndIconsModel.checkIconInTable(iconName, false);
    });

    test(`Verify that the list in ASC order by dimensions should be ordered in DESC order when the dimensions header is clicked '${user.role}'`, async ({ page }) => {
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
      }

      const iconName = (headlinesAndIconsData.iconsName + uuidv4()).slice(0, 15);
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickMediaIconsMenu();
      await headlinesAndIconsModel.onClickIconsField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameIcon(iconName);
      await headlinesAndIconsModel.setLogoIcon(path.join(__dirname, '../images/high_sugar.webp'));
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickIconsHeadlinesOptionMenu();

      let iconsList1 = await headlinesAndIconsModel.getElementsInIconsTable(ColumnHeadersEnum.dimensions, false, true);
      await headlinesAndIconsModel.onClickHeaderDimensions(); // Ascending
      await headlinesAndIconsModel.onClickHeaderDimensions(); // Descending
      let iconsList2 = await headlinesAndIconsModel.getElementsInIconsTable(ColumnHeadersEnum.dimensions);
      //await headlinesAndIconsModel.verifySortUpIconInIconsTable(ColumnHeadersEnum.dimensions);
      await headlinesAndIconsModel.verifySortDownIconInIconsTable(ColumnHeadersEnum.dimensions);
      await headlinesAndIconsModel.compareArrays(iconsList1, iconsList2);

      await headlinesAndIconsModel.onClickIconDeleteItem(iconName);
      await headlinesAndIconsModel.checkIconInTable(iconName, false);
    });

    test(`Verify that when the node header is clicked and the list is ordered in ASC order by name, the list should be ordered by name header in ASC order '${user.role}'`, async ({ page }) => {
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
      }

      const iconName = (headlinesAndIconsData.iconsName + uuidv4()).slice(0, 15);
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickMediaIconsMenu();
      await headlinesAndIconsModel.onClickIconsField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameIcon(iconName);
      await headlinesAndIconsModel.setLogoIcon(path.join(__dirname, '../images/high_sugar.webp'));
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickIconsHeadlinesOptionMenu();

      let iconsList1 = await headlinesAndIconsModel.getElementsInIconsTable(ColumnHeadersEnum.node, true);
      await headlinesAndIconsModel.onClickHeaderName();
      await headlinesAndIconsModel.verifySortUpIconInIconsTable(ColumnHeadersEnum.name);
      await headlinesAndIconsModel.onClickHeaderNode();
      let iconsList2 = await headlinesAndIconsModel.getElementsInIconsTable(ColumnHeadersEnum.node, true);
      //await headlinesAndIconsModel.verifySortUpIconInIconsTable(ColumnHeadersEnum.name);
      await headlinesAndIconsModel.verifySortUpIconInIconsTable(ColumnHeadersEnum.node);
      await headlinesAndIconsModel.compareArrays(iconsList1, iconsList2);

      await headlinesAndIconsModel.onClickIconDeleteItem(iconName);
      await headlinesAndIconsModel.checkIconInTable(iconName, false);
    });

    test(`Verify that when the dimensions header is clicked and the list is ordered in ASC order by name, the list should be ordered by dimensions in ASC order '${user.role}'`, async ({ page }) => {
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
      }

      const iconName = (headlinesAndIconsData.iconsName + uuidv4()).slice(0, 15);
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickMediaIconsMenu();
      await headlinesAndIconsModel.onClickIconsField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameIcon(iconName);
      await headlinesAndIconsModel.setLogoIcon(path.join(__dirname, '../images/high_sugar.webp'));
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickIconsHeadlinesOptionMenu();

      let iconsList1 = await headlinesAndIconsModel.getElementsInIconsTable(ColumnHeadersEnum.dimensions, true);
      await headlinesAndIconsModel.onClickHeaderName();
      await headlinesAndIconsModel.verifySortUpIconInIconsTable(ColumnHeadersEnum.name);
      await headlinesAndIconsModel.onClickHeaderDimensions();
      let iconsList2 = await headlinesAndIconsModel.getElementsInIconsTable(ColumnHeadersEnum.dimensions);
      await headlinesAndIconsModel.verifySortUpIconInIconsTable(ColumnHeadersEnum.dimensions);
      //await headlinesAndIconsModel.verifySortUpIconInIconsTable(ColumnHeadersEnum.name);
      await headlinesAndIconsModel.compareArrays(iconsList1, iconsList2);

      await headlinesAndIconsModel.onClickIconDeleteItem(iconName);
      await headlinesAndIconsModel.checkIconInTable(iconName, false);
    });

    test(`Verify that when the name header is clicked and the list is ordered in ASC order by dimensions, the list should be ordered by name in ASC order '${user.role}'`, async ({ page }) => {
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
      }

      const iconName = (headlinesAndIconsData.iconsName + uuidv4()).slice(0, 15);
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickMediaIconsMenu();
      await headlinesAndIconsModel.onClickIconsField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameIcon(iconName);
      await headlinesAndIconsModel.setLogoIcon(path.join(__dirname, '../images/high_sugar.webp'));
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickIconsHeadlinesOptionMenu();

      let iconsList1 = await headlinesAndIconsModel.getElementsInIconsTable(ColumnHeadersEnum.name, true);
      await headlinesAndIconsModel.onClickHeaderDimensions();
      await headlinesAndIconsModel.verifySortUpIconInIconsTable(ColumnHeadersEnum.dimensions);
      await headlinesAndIconsModel.onClickHeaderName();
      let iconsList2 = await headlinesAndIconsModel.getElementsInIconsTable(ColumnHeadersEnum.name);
      await headlinesAndIconsModel.verifySortUpIconInIconsTable(ColumnHeadersEnum.name);
      //await headlinesAndIconsModel.verifySortUpIconInIconsTable(ColumnHeadersEnum.node, false);
      //await headlinesAndIconsModel.verifySortUpIconInIconsTable(ColumnHeadersEnum.dimensions, false);
      await headlinesAndIconsModel.compareArrays(iconsList1, iconsList2);

      await headlinesAndIconsModel.onClickIconDeleteItem(iconName);
      await headlinesAndIconsModel.checkIconInTable(iconName, false);
    });

    test(`Verify that when the dimensions header is clicked and the list is ordered in ASC order by node, the list should be ordered by dimensions in ASC order '${user.role}'`, async ({ page }) => {
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
      }

      const iconName = (headlinesAndIconsData.iconsName + uuidv4()).slice(0, 15);
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickMediaIconsMenu();
      await headlinesAndIconsModel.onClickIconsField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameIcon(iconName);
      await headlinesAndIconsModel.setLogoIcon(path.join(__dirname, '../images/high_sugar.webp'));
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickIconsHeadlinesOptionMenu();

      let iconsList1 = await headlinesAndIconsModel.getElementsInIconsTable(ColumnHeadersEnum.dimensions, true);
      await headlinesAndIconsModel.onClickHeaderNode();
      await headlinesAndIconsModel.verifySortUpIconInIconsTable(ColumnHeadersEnum.node);
      await headlinesAndIconsModel.onClickHeaderDimensions();
      let iconsList2 = await headlinesAndIconsModel.getElementsInIconsTable(ColumnHeadersEnum.dimensions);
      await headlinesAndIconsModel.verifySortUpIconInIconsTable(ColumnHeadersEnum.dimensions);
      //await headlinesAndIconsModel.verifySortUpIconInIconsTable(ColumnHeadersEnum.node, false);
      await headlinesAndIconsModel.compareArrays(iconsList1, iconsList2);

      await headlinesAndIconsModel.onClickIconDeleteItem(iconName);
      await headlinesAndIconsModel.checkIconInTable(iconName, false);
    });

    test(`Verify that when the name header is clicked and the list is ordered in ASC order by node, the list should be ordered by node in ASC order '${user.role}'`, async ({ page }) => {
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
      }

      const iconName = (headlinesAndIconsData.iconsName + uuidv4()).slice(0, 15);
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickMediaIconsMenu();
      await headlinesAndIconsModel.onClickIconsField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameIcon(iconName);
      await headlinesAndIconsModel.setLogoIcon(path.join(__dirname, '../images/high_sugar.webp'));
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickIconsHeadlinesOptionMenu();

      let iconsList1 = await headlinesAndIconsModel.getElementsInIconsTable(ColumnHeadersEnum.node, true);
      await headlinesAndIconsModel.onClickHeaderName();
      await headlinesAndIconsModel.verifySortUpIconInIconsTable(ColumnHeadersEnum.name);
      await headlinesAndIconsModel.onClickHeaderNode();
      let iconsList2 = await headlinesAndIconsModel.getElementsInIconsTable(ColumnHeadersEnum.node);
      await headlinesAndIconsModel.verifySortUpIconInIconsTable(ColumnHeadersEnum.node);
      //await headlinesAndIconsModel.verifySortUpIconInIconsTable(ColumnHeadersEnum.name, false);
      await headlinesAndIconsModel.compareArrays(iconsList1, iconsList2);

      await headlinesAndIconsModel.onClickIconDeleteItem(iconName);
      await headlinesAndIconsModel.checkIconInTable(iconName, false);
    });

    test(`Verify that the unordered list of headlines should be ordered in ASC order by text when the text header is clicked '${user.role}'`, async ({ page }) => {
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
      }

      const headlineName = (headlinesAndIconsData.headlineName + uuidv4()).slice(0, 15);
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickHeadlinesMenu();
      await headlinesAndIconsModel.onClickHeadlinesField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameHeadline(headlineName);
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();

      await sidebarModel.onClickIconsHeadlinesOptionMenu();
      let headlinesList1 = await headlinesAndIconsModel.getElementsInHeadlinesTable(ColumnHeadersEnum.text, true);
      await headlinesAndIconsModel.onClickHeaderText();
      let headlinesList2 = await headlinesAndIconsModel.getElementsInHeadlinesTable(ColumnHeadersEnum.text);
      await headlinesAndIconsModel.verifySortUpIconInHeadlinesTable(ColumnHeadersEnum.text);
      await headlinesAndIconsModel.compareArrays(headlinesList1, headlinesList2);

      await headlinesAndIconsModel.onClickHeadlineDeleteItem(headlineName);
      await headlinesAndIconsModel.checkHeadlineInTable(headlineName, false);
    });

    test(`Verify that the unordered list of headlines should be ordered in ASC order by node when the node header is clicked '${user.role}'`, async ({ page }) => {
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
      }

      const headlineName = (headlinesAndIconsData.headlineName + uuidv4()).slice(0, 15);
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickHeadlinesMenu();
      await headlinesAndIconsModel.onClickHeadlinesField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameHeadline(headlineName);
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();

      await sidebarModel.onClickIconsHeadlinesOptionMenu();
      let headlinesList1 = await headlinesAndIconsModel.getElementsInHeadlinesTable(ColumnHeadersEnum.node, true);
      await headlinesAndIconsModel.onClickHeaderHeadlineNode();
      let headlinesList2 = await headlinesAndIconsModel.getElementsInHeadlinesTable(ColumnHeadersEnum.node);
      await headlinesAndIconsModel.verifySortUpIconInHeadlinesTable(ColumnHeadersEnum.node);
      await headlinesAndIconsModel.compareArrays(headlinesList1, headlinesList2);

      await headlinesAndIconsModel.onClickHeadlineDeleteItem(headlineName);
      await headlinesAndIconsModel.checkHeadlineInTable(headlineName, false);
    });

    test(`Verify that the list in ASC order by node should be ordered in DESC order when the node header is clicked in headlines table '${user.role}'`, async ({ page }) => {
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
      }

      const headlineName = (headlinesAndIconsData.headlineName + uuidv4()).slice(0, 15);
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickHeadlinesMenu();
      await headlinesAndIconsModel.onClickHeadlinesField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameHeadline(headlineName);
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();

      await sidebarModel.onClickIconsHeadlinesOptionMenu();
      let headlinesList1 = await headlinesAndIconsModel.getElementsInHeadlinesTable(ColumnHeadersEnum.node, false, true);
      await headlinesAndIconsModel.onClickHeaderHeadlineNode(); // Ascending
      await headlinesAndIconsModel.onClickHeaderHeadlineNode(); // Descending
      let headlinesList2 = await headlinesAndIconsModel.getElementsInHeadlinesTable(ColumnHeadersEnum.node);
      await headlinesAndIconsModel.verifySortDownIconInHeadlinesTable(ColumnHeadersEnum.node);
      await headlinesAndIconsModel.compareArrays(headlinesList1, headlinesList2);

      await headlinesAndIconsModel.onClickHeadlineDeleteItem(headlineName);
      await headlinesAndIconsModel.checkHeadlineInTable(headlineName, false);
    });

    test(`Verify that when the node header is clicked and the list is ordered in ASC order by text, the list should be ordered by node in ASC order '${user.role}'`, async ({ page }) => {
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
      }

      const headlineName = (headlinesAndIconsData.headlineName + uuidv4()).slice(0, 15);
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickHeadlinesMenu();
      await headlinesAndIconsModel.onClickHeadlinesField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameHeadline(headlineName);
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();

      await sidebarModel.onClickIconsHeadlinesOptionMenu();
      let headlinesList1 = await headlinesAndIconsModel.getElementsInHeadlinesTable(ColumnHeadersEnum.node, true);
      await headlinesAndIconsModel.onClickHeaderText();
      await headlinesAndIconsModel.verifySortUpIconInHeadlinesTable(ColumnHeadersEnum.text);
      await headlinesAndIconsModel.onClickHeaderHeadlineNode();
      let headlinesList2 = await headlinesAndIconsModel.getElementsInHeadlinesTable(ColumnHeadersEnum.node);
      await headlinesAndIconsModel.verifySortUpIconInHeadlinesTable(ColumnHeadersEnum.node);
      //await headlinesAndIconsModel.verifySortUpIconInHeadlinesTable(ColumnHeadersEnum.text, false);
      await headlinesAndIconsModel.compareArrays(headlinesList1, headlinesList2);

      await headlinesAndIconsModel.onClickHeadlineDeleteItem(headlineName);
      await headlinesAndIconsModel.checkHeadlineInTable(headlineName, false);
    });

    test(`Verify that when the text header is clicked and the list is ordered in ASC order by node, the list should be ordered by text in ASC order '${user.role}'`, async ({ page }) => {
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
      }

      const headlineName = (headlinesAndIconsData.headlineName + uuidv4()).slice(0, 15);
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickHeadlinesMenu();
      await headlinesAndIconsModel.onClickHeadlinesField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameHeadline(headlineName);
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();

      await sidebarModel.onClickIconsHeadlinesOptionMenu();
      let headlinesList1 = await headlinesAndIconsModel.getElementsInHeadlinesTable(ColumnHeadersEnum.text, true);
      await headlinesAndIconsModel.onClickHeaderHeadlineNode();
      await headlinesAndIconsModel.verifySortUpIconInHeadlinesTable(ColumnHeadersEnum.node);
      await headlinesAndIconsModel.onClickHeaderText();
      let headlinesList2 = await headlinesAndIconsModel.getElementsInHeadlinesTable(ColumnHeadersEnum.text);
      await headlinesAndIconsModel.verifySortUpIconInHeadlinesTable(ColumnHeadersEnum.text);
      //await headlinesAndIconsModel.verifySortUpIconInHeadlinesTable(ColumnHeadersEnum.node);
      await headlinesAndIconsModel.compareArrays(headlinesList1, headlinesList2);

      await headlinesAndIconsModel.onClickHeadlineDeleteItem(headlineName);
      await headlinesAndIconsModel.checkHeadlineInTable(headlineName, false);
    });

    test(`Verify that the list in ASC order by text should be ordered in DESC order when the text header is clicked '${user.role}'`, async ({ page }) => {
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
      }

      const headlineName = (headlinesAndIconsData.headlineName + uuidv4()).slice(0, 15);
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickHeadlinesMenu();
      await headlinesAndIconsModel.onClickHeadlinesField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameHeadline(headlineName);
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();

      await sidebarModel.onClickIconsHeadlinesOptionMenu();
      let headlinesList1 = await headlinesAndIconsModel.getElementsInHeadlinesTable(ColumnHeadersEnum.text, false, true);
      await headlinesAndIconsModel.onClickHeaderText(); // Ascending
      await headlinesAndIconsModel.onClickHeaderText(); // Descending
      let headlinesList2 = await headlinesAndIconsModel.getElementsInHeadlinesTable(ColumnHeadersEnum.text);
      await headlinesAndIconsModel.verifySortDownIconInHeadlinesTable(ColumnHeadersEnum.text);
      await headlinesAndIconsModel.compareArrays(headlinesList1, headlinesList2);

      await headlinesAndIconsModel.onClickHeadlineDeleteItem(headlineName);
      await headlinesAndIconsModel.checkHeadlineInTable(headlineName, false);
    });

    test(`Verify that when the name field is populated and the logo field is empty the new logo is not created at brand level '${user.role}'`, async ({ page }) => {
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
      }

      const iconName = (headlinesAndIconsData.iconsName + uuidv4()).slice(0, 15);
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickMediaIconsMenu();
      await headlinesAndIconsModel.onClickIconsField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameIcon(iconName);
      await headlinesAndIconsModel.onClickSaveBtn();

      expect((await commonModel.existAlert.innerText()).includes(headlinesAndIconsData.logoRequired)).toBeTruthy();

      await commonModel.onClickNoCancelButton();
      await sidebarModel.onClickIconsHeadlinesOptionMenu();
      await headlinesAndIconsModel.checkIconInTable(iconName, false);
    });

  });

  usersDataEn.forEach(user => {

    test(`Verify that you can create a new headline when the name field is populated and the spanish field is empty at the brand level '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);
      const headlinesAndIconsModel = new HeadlinesAndIconsModel(page);
      const contentModel = new ContentModel(page);

      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) {
        await topBarModel.selectBrand(brandsData.brandNodeNameEn);
        await sidebarModel.onClickContentOptionMenu();
      }

      const headlineName = (headlinesAndIconsData.headlineName + uuidv4()).slice(0, 15);
      await contentModel.onClickCardUtilityPanel();
      await contentModel.clickHeadlinesMenu();
      await headlinesAndIconsModel.onClickHeadlinesField();
      await headlinesAndIconsModel.onClickAddNewHeadlineOrIcon();
      await headlinesAndIconsModel.setNameHeadline(headlineName);
      await headlinesAndIconsModel.onClickSaveBtn();
      await commonModel.waitUntilSpinnerDisappears();
      expect((await commonModel.snackbar.nth(0).innerText()).includes(headlinesAndIconsData.headlineCreatedSuccessfully)).toBeTruthy();
      await sidebarModel.onClickIconsHeadlinesOptionMenu();
      await headlinesAndIconsModel.checkHeadlineInTable(headlineName, true);

      await headlinesAndIconsModel.onClickHeadlineDeleteItem(headlineName);
      await headlinesAndIconsModel.checkHeadlineInTable(headlineName, false);
    });

  });

});
