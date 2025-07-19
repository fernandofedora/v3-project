import { test, expect } from '@playwright/test';
import { LoginModel } from '../../pom/loginModel';
import { TopBarModel } from '../../pom/topBarModel';
import { CategoriesModel } from '../../pom/categoriesModel';
import { CommonModel } from '../../pom/commonModel';
import { SidebarModel } from '../../pom/sidebarModel';
import { brandsData } from '../../data/brandsData';
import { categoriesData } from '../../data/categoriesData';
import { RolesEnum as Roles } from '../../enums/roles.enum';
import { NodesTypesEnum } from '../../enums/nodeTypes.enum';
import { validateEnvironment } from '../../utils/urlHandler';
import { validateUsers } from '../../utils/userHandler';
import { storeOwnerRoleValidation } from '../../utils/rolesHandler';
import { rolesData } from '../../data/usersData';

const users = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.brandNodeContentName));
const url: string = validateEnvironment();

test.describe('Manage Categories', () => {

  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto(url);
  });

  users.forEach(user => {

    test(`Verify a new category is created successfully from brand level '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const categoriesModel = new CategoriesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      if(user.role == rolesData.storeOwner){ 
        await loginModel.login(user.username, user.password);
        await sidebarModel.onClickCategoriesOptionMenu();
        await categoriesModel.verifyThatCreateCategoryButtonIsNotVisible();
      } else {
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeName);
        await sidebarModel.onClickCategoriesOptionMenu();

        const categoryName = await categoriesModel.fillCategoryCreationForm();
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCategoryNameFieldIsNotDisplayed();

        await commonModel.setSearchValue(categoryName);
        await categoriesModel.hasCategoryTableValues(true);

        //await categoriesModel.deleteCategoryBrandLevel(categoryName);
        //await commonModel.waitUntilSpinnerDisappears();
      }
    });

    test(`Verify a category created at brand level is display on the table '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const categoriesModel = new CategoriesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      if(user.role == rolesData.storeOwner){ 
        await loginModel.login(user.username, user.password);
        await sidebarModel.onClickCategoriesOptionMenu();
        await categoriesModel.verifyThatCreateCategoryButtonIsNotVisible();
      } else {
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeName);
        await sidebarModel.onClickCategoriesOptionMenu();
        const categoryName = await categoriesModel.fillCategoryCreationForm();
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        await commonModel.setSearchValue(categoryName);
        await categoriesModel.hasCategoryTableValues(true);
        await expect(async ()=> {
          const exists = await categoriesModel.checkCategoryWithPageInTable(categoryName, categoriesData.browse);
          expect(exists).toBeTruthy();
        }).toPass();
    
      }
    });

    test(`Verify if alert appears when creating an existing Category at brand level '${user.role}'`, async ({ page })  => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const categoriesModel = new CategoriesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      if(user.role == rolesData.storeOwner){ 
        await loginModel.login(user.username, user.password);
        await sidebarModel.onClickCategoriesOptionMenu();
        await categoriesModel.verifyThatCreateCategoryButtonIsNotVisible();
      } else {
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeName);
        await sidebarModel.onClickCategoriesOptionMenu();
        const categoryName = await categoriesModel.fillCategoryCreationForm();
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.onClickCategoryCreateButton();
        await categoriesModel.setDefaultCategoryName(categoryName);
        await expect(categoriesModel.pageDropdown).toBeVisible();
        await categoriesModel.onClickCategorySaveButton();

        await categoriesModel.onClickCategorySaveButton();
        await categoriesModel.verifyTheAlertMessageIsVisible();
        await expect(async ()=>{
          const existingCategoryMsg = `There's already a category named "${categoryName}" in this page`;
          expect(await commonModel.existAlert.innerText()).toMatch(existingCategoryMsg);
        }).toPass();

        await categoriesModel.onClickCategoryCancelButton();
        await commonModel.setSearchValue(categoryName);
        await categoriesModel.hasCategoryTableValues(true);
      }
    });

    test.skip(`Verify category is deleted successfully from brand level '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const categoriesModel = new CategoriesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      if(user.role == rolesData.storeOwner){ 
        await loginModel.login(user.username, user.password);
        await sidebarModel.onClickCategoriesOptionMenu();
        await categoriesModel.verifyThatCreateCategoryButtonIsNotVisible();
      } else {
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeName);
        await sidebarModel.onClickCategoriesOptionMenu();
        const categoryName = await categoriesModel.fillCategoryCreationForm();
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        await commonModel.setSearchValue(categoryName);
        await categoriesModel.hasCategoryTableValues(true);

        //await categoriesModel.deleteCategoryBrandLevel(categoryName);
        //await commonModel.waitUntilSpinnerDisappears();
        //await categoriesModel.hasCategoryTableValues(false);
      }
    });

    test(`Verify a new category is created successfully from subbrand level '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const categoriesModel = new CategoriesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      if(user.role == rolesData.storeOwner){ 
        await loginModel.login(user.username, user.password);
        await sidebarModel.onClickCategoriesOptionMenu();
        await categoriesModel.verifyThatCreateCategoryButtonIsNotVisible();
      } else {
      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeName);
      await topBarModel.selectNodeBrandChild(brandsData.subBrandName, NodesTypesEnum.subbrand);
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickCategoriesOptionMenu();

        const categoryName = await categoriesModel.fillCategoryCreationForm();
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCategoryNameFieldIsNotDisplayed();

        await commonModel.setSearchValue(categoryName);
        await categoriesModel.hasCategoryTableValues(true);

      //await categoriesModel.deleteCategorySubBrandLevel(categoryName);
      //await commonModel.waitUntilSpinnerDisappears();
      }
    });

    test(`Verify a category created at subbrand level is display on the table '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const categoriesModel = new CategoriesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      if(user.role == rolesData.storeOwner){ 
        await loginModel.login(user.username, user.password);
        await sidebarModel.onClickCategoriesOptionMenu();
        await categoriesModel.verifyThatCreateCategoryButtonIsNotVisible();
      } else {
      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeName);
      await topBarModel.selectNodeBrandChild(brandsData.subBrandName, NodesTypesEnum.subbrand);
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickCategoriesOptionMenu();

        const categoryName = await categoriesModel.fillCategoryCreationForm();
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        await commonModel.setSearchValue(categoryName);
        await categoriesModel.hasCategoryTableValues(true);

        const exists = await categoriesModel.checkCategoryWithPageInTable(categoryName, categoriesData.browse);
        expect(exists).toBeTruthy();

      //await categoriesModel.deleteCategorySubBrandLevel(categoryName);
      //await commonModel.waitUntilSpinnerDisappears();
      }
    });

    test(`Verify if alert appears when creating an existing category at subbrand level '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const categoriesModel = new CategoriesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      if(user.role == rolesData.storeOwner){ 
        await loginModel.login(user.username, user.password);
        await sidebarModel.onClickCategoriesOptionMenu();
        await categoriesModel.verifyThatCreateCategoryButtonIsNotVisible();
      } else {
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeName);
        await topBarModel.selectNodeBrandChild(brandsData.subBrandName, NodesTypesEnum.subbrand);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        const categoryName = await categoriesModel.fillCategoryCreationForm();
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.onClickCategoryCreateButton();
        await categoriesModel.setDefaultCategoryName(categoryName);
        await expect(categoriesModel.pageDropdown).toBeVisible();
        await categoriesModel.onClickCategorySaveButton();

        await categoriesModel.verifyTheAlertMessageIsVisible();
        const existingCategoryMsg = `There's already a category named "${categoryName}" in this page`;
        expect((await commonModel.existAlert.innerText()).includes(existingCategoryMsg)).toBeTruthy();

        await categoriesModel.onClickCategoryCancelButton();
        await commonModel.setSearchValue(categoryName);
        await categoriesModel.hasCategoryTableValues(true);

        //await categoriesModel.deleteCategorySubBrandLevel(categoryName);
        //await commonModel.waitUntilSpinnerDisappears();
      }
    });

    test.skip(`Verify category is deleted successfully from subbrand level '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const categoriesModel = new CategoriesModel(page);
      const sidebarModel = new SidebarModel(page);
      const commonModel = new CommonModel(page);

      if(user.role == rolesData.storeOwner){ 
        await loginModel.login(user.username, user.password);
        await sidebarModel.onClickCategoriesOptionMenu();
        await categoriesModel.verifyThatCreateCategoryButtonIsNotVisible();
      } else {
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeName);
        await topBarModel.selectNodeBrandChild(brandsData.subBrandName, NodesTypesEnum.subbrand);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        const categoryName = await categoriesModel.fillCategoryCreationForm();
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        await commonModel.setSearchValue(categoryName);
        await categoriesModel.hasCategoryTableValues(true);
        await categoriesModel.deleteCategorySubBrandLevel(categoryName);
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.hasCategoryTableValues(false);
      }
    });

  });

});
