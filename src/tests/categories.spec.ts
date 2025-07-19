import { test, expect } from '@playwright/test';
import { LoginModel } from '../pom/loginModel';
import { TopBarModel } from '../pom/topBarModel';
import { CategoriesModel } from '../pom/categoriesModel';
import { CommonModel } from '../pom/commonModel';
import { SidebarModel } from '../pom/sidebarModel';
import { brandsData } from '../data/brandsData';
import { categoriesData } from '../data/categoriesData';
import { RolesEnum as Roles } from '../enums/roles.enum';
import { validateEnvironment } from '../utils/urlHandler';
import { validateUsers } from '../utils/userHandler';
import { storeOwnerRoleValidation } from '../utils/rolesHandler';
import { Pagesmodel } from '../pom/pagesModel';
import { v4 as uuidv4 } from 'uuid';
import { rolesData } from '../data/usersData';


const users = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.brandNodeContentName));
const url: string = validateEnvironment();

test.describe('Manage Categories', () => {


  users.forEach(user => {
    test.beforeEach(async ({ page }) => {
      await page.goto(url);
      test.setTimeout(90 * 1000);
    });

    test(`Verify a new category is created successfully from brand level '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
  
      if(user.role == rolesData.storeOwner){
        await loginModel.login(user.username, user.password);
        await sidebarModel.onClickCategoriesOptionMenu();
        await categoriesModel.verifyThatCreateCategoryButtonIsNotVisible();
      } else {
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeName);
        await commonModel.waitUntilSpinnerDisappears();

        await sidebarModel.onClickCategoriesOptionMenu();
        const categoryName = await categoriesModel.fillCategoryCreationForm();
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        await categoriesModel.verifyThatCategoryNameFieldIsNotDisplayed();

        expect(await commonModel.snackbar.innerText()).toContain(categoriesData.categoryCreatedSuccessfully);
        await commonModel.setSearchValue(categoryName);
        await categoriesModel.hasCategoryTableValues(true);
        await commonModel.waitForSnackbarDissapear();
      }
    });

    test(`Verify a category created at brand level is display on the table '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);

      if(user.role == rolesData.storeOwner){
        await loginModel.login(user.username, user.password);
        await sidebarModel.onClickCategoriesOptionMenu();
        await categoriesModel.verifyThatCreateCategoryButtonIsNotVisible();
      } else {
      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeName);
      await commonModel.waitUntilSpinnerDisappears();

      await sidebarModel.onClickCategoriesOptionMenu();
      const categoryName = await categoriesModel.fillCategoryCreationForm();
      await categoriesModel.onClickCategorySaveButton();
      await commonModel.waitUntilSpinnerDisappears();
      await categoriesModel.verifyThatCategoryNameFieldIsNotDisplayed();

      await commonModel.setSearchValue(categoryName);
      await categoriesModel.hasCategoryTableValues(true);
      }
    });


    test(`Verify if alert appears when creating an existing Category at brand level '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);

      if(user.role == rolesData.storeOwner){
        await loginModel.login(user.username, user.password);
        await sidebarModel.onClickCategoriesOptionMenu();
        await categoriesModel.verifyThatCreateCategoryButtonIsNotVisible();
      } else {
      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeName);
      await commonModel.waitUntilSpinnerDisappears();

      await sidebarModel.onClickCategoriesOptionMenu();
      const categoryName = await categoriesModel.fillCategoryCreationForm();
      await categoriesModel.onClickCategorySaveButton();
      await commonModel.waitUntilSpinnerDisappears();
      await categoriesModel.verifyThatCategoryNameFieldIsNotDisplayed();

      await categoriesModel.onClickCategoryCreateButton();
      await categoriesModel.setDefaultCategoryName(categoryName);
      let dropdownExists = await categoriesModel.pageDropdown.isVisible();
      expect(dropdownExists).toBeTruthy();
      await categoriesModel.onClickCategorySaveButton();

      await categoriesModel.verifyTheAlertMessageIsDisplayed(categoryName);

      await commonModel.setSearchValue(categoryName);
      await categoriesModel.hasCategoryTableValues(true);
      }
    });


    test.skip(`Verify category is deleted successfully from brand level '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);

      if(user.role == rolesData.storeOwner){
        await loginModel.login(user.username, user.password);
        await sidebarModel.onClickCategoriesOptionMenu();
        await categoriesModel.verifyThatCreateCategoryButtonIsNotVisible();
      } else {
      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeName);
      await commonModel.waitUntilSpinnerDisappears();

      await sidebarModel.onClickCategoriesOptionMenu();
      const categoryName = await categoriesModel.fillCategoryCreationForm();
      let dropdownExists = await categoriesModel.pageDropdown.isVisible();
      expect(dropdownExists).toBeTruthy();
      await categoriesModel.onClickCategorySaveButton();
      await commonModel.waitUntilSpinnerDisappears();
      await categoriesModel.verifyThatCategoryNameFieldIsNotDisplayed();

      await categoriesModel.hasCategoryTableValues(true);
      }
    });


    test(`Verify that the category name is a required field, when the brand is configured in a single language English '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const commonModel = new CommonModel(page);

      if(user.role == rolesData.storeOwner){
        await loginModel.login(user.username, user.password);
        await sidebarModel.onClickCategoriesOptionMenu();
        await categoriesModel.verifyThatCreateCategoryButtonIsNotVisible();
      } else {
      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeName);
      await commonModel.waitUntilSpinnerDisappears();

      await sidebarModel.onClickCategoriesOptionMenu();

      await categoriesModel.onClickCategoryCreateButton();
      await page.waitForTimeout(2000);
      await categoriesModel.onClickCategorySaveButton();
      await commonModel.waitUntilSpinnerDisappears();

      await categoriesModel.verifyThatTheRequiredErrorMessageIsDisplayed(categoriesData.categoryNameRequired, categoriesData.fieldRequired);
      }
    });

    test(`Verify that the category can select a different page than the browse page in brand level '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const pagesModel = new Pagesmodel(page);
      const commonModel = new CommonModel(page);

      if(user.role == rolesData.storeOwner){
        await loginModel.login(user.username, user.password);
        await sidebarModel.onClickCategoriesOptionMenu();
        await categoriesModel.verifyThatCreateCategoryButtonIsNotVisible();
      } else {
      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeName);
      await commonModel.waitUntilSpinnerDisappears();
      await pagesModel.ensureAtLeastOnePageExists();
      await sidebarModel.onClickCategoriesOptionMenu();

      const categoryName = await categoriesModel.fillCategoryCreationForm();
      let dropdownExists = await categoriesModel.pageDropdown.isVisible();
      expect(dropdownExists).toBeTruthy();
      await categoriesModel.setPageOption(1);
      const pageName = await categoriesModel.getThePageName();
      await categoriesModel.onClickCategorySaveButton();
      await commonModel.waitUntilSpinnerDisappears();
      await categoriesModel.verifyThatCategoryNameFieldIsNotDisplayed();
      await commonModel.setSearchValue(categoryName);
      await categoriesModel.hasCategoryTableValues(true);

      // The category created must appear in the category table with its page assigned
      const exists = await categoriesModel.checkCategoryWithPageInTable(categoryName, pageName);
      expect(exists).toBeTruthy();
      //await categoriesModel.deleteCategoryBrandLevel(categoryName);
      //await commonModel.waitUntilSpinnerDisappears();
      }
    });

    /**
     * Ends tests for categories at brand level
     */

    /**
     * Starts tests for categories at subbrand level
     */

    test(`Verify a new category is created successfully from subbrand level '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
  
      if(user.role == rolesData.storeOwner){
        await loginModel.login(user.username, user.password);
        await sidebarModel.onClickCategoriesOptionMenu();
        await categoriesModel.verifyThatCreateCategoryButtonIsNotVisible();
      } else {
      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeName);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandName, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();

      await sidebarModel.onClickCategoriesOptionMenu();
      const categoryName = await categoriesModel.fillCategoryCreationForm();
      await categoriesModel.onClickCategorySaveButton();
      await commonModel.waitUntilSpinnerDisappears();
      await categoriesModel.verifyThatCategoryNameFieldIsNotDisplayed();

      await expect(categoriesModel.categoryNameInput).not.toBeVisible();

      expect(await commonModel.snackbar.innerText()).toContain(categoriesData.categoryCreatedSuccessfully);
      await commonModel.setSearchValue(categoryName);
      await categoriesModel.hasCategoryTableValues(true);
      //await categoriesModel.deleteCategoryBrandLevel(categoryName);
      //await commonModel.waitUntilSpinnerDisappears();
      }
    });

    test(`Verify a category created at subbrand level is display on the table '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);

      if(user.role == rolesData.storeOwner){
        await loginModel.login(user.username, user.password);
        await sidebarModel.onClickCategoriesOptionMenu();
        await categoriesModel.verifyThatCreateCategoryButtonIsNotVisible();
      } else {
      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeName);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandName, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();

      await sidebarModel.onClickCategoriesOptionMenu();
      const categoryName = await categoriesModel.fillCategoryCreationForm();
      await categoriesModel.onClickCategorySaveButton();
      await commonModel.waitUntilSpinnerDisappears();
      await categoriesModel.verifyThatCategoryNameFieldIsNotDisplayed();

      await expect(categoriesModel.categoryNameInput).not.toBeVisible();

      await commonModel.setSearchValue(categoryName);
      await categoriesModel.hasCategoryTableValues(true);
      //await categoriesModel.deleteCategoryBrandLevel(categoryName);
      //await commonModel.waitUntilSpinnerDisappears();
      }
    });


    test(`Verify if alert appears when creating an existing Category at subbrand level '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);

      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeName);
        await commonModel.waitUntilSpinnerDisappears();
        await topBarModel.selectNodeBrandChild(brandsData.subBrandName, brandsData.subBrand);
        await commonModel.waitUntilSpinnerDisappears();

        await sidebarModel.onClickCategoriesOptionMenu();
        const categoryName = await categoriesModel.fillCategoryCreationForm();
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        await categoriesModel.verifyThatCategoryNameFieldIsNotDisplayed();

        await categoriesModel.onClickCategoryCreateButton();
        await categoriesModel.setDefaultCategoryName(categoryName);
        let dropdownExists = await categoriesModel.pageDropdown.isVisible();
        expect(dropdownExists).toBeTruthy();
        await categoriesModel.onClickCategorySaveButton();

        await categoriesModel.verifyTheAlertMessageIsDisplayed(categoryName);

        await commonModel.setSearchValue(categoryName);
        await categoriesModel.hasCategoryTableValues(true);
        //await categoriesModel.deleteCategoryBrandLevel(categoryName);
        //await commonModel.waitUntilSpinnerDisappears();
      }
    });

    test.skip(`Verify category is deleted successfully from subbrand level '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);

      await page.goto(url);
      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeName);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandName, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();

      await sidebarModel.onClickCategoriesOptionMenu();
      const categoryName = await categoriesModel.fillCategoryCreationForm();
      await categoriesModel.onClickCategorySaveButton();
      await commonModel.waitUntilSpinnerDisappears();
      await categoriesModel.verifyThatCategoryNameFieldIsNotDisplayed();


      await commonModel.setSearchValue(categoryName);
      await categoriesModel.hasCategoryTableValues(true);
      //await categoriesModel.deleteCategoryBrandLevel(categoryName);
      //await commonModel.waitUntilSpinnerDisappears();

      //await categoriesModel.verifyThatTheCategoryIsNotDisplayed(categoryName);
    });

    test(`Verify that the category name is a required field, when the subbrand is configured in a single language English '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const commonModel = new CommonModel(page);

      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeName);
        await commonModel.waitUntilSpinnerDisappears();
        await topBarModel.selectNodeBrandChild(brandsData.subBrandName, brandsData.subBrand);
        await commonModel.waitUntilSpinnerDisappears();

        await sidebarModel.onClickCategoriesOptionMenu();

        await categoriesModel.onClickCategoryCreateButton();
        await page.waitForTimeout(2000);
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatTheRequiredErrorMessageIsDisplayed(categoriesData.categoryNameRequired, categoriesData.fieldRequired);
      }
    });

    test(`Verify that the category can select a different page than the browse page in Subbrand level '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const pagesModel = new Pagesmodel(page);
      const commonModel = new CommonModel(page);

      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeName);
        await commonModel.waitUntilSpinnerDisappears();
        await topBarModel.selectNodeBrandChild(brandsData.subBrandName, brandsData.subBrand);
        await commonModel.waitUntilSpinnerDisappears();
        await pagesModel.ensureAtLeastOnePageExists();
        await sidebarModel.onClickCategoriesOptionMenu();

        const categoryName = await categoriesModel.fillCategoryCreationForm();
        let dropdownExists = await categoriesModel.pageDropdown.isVisible();
        expect(dropdownExists).toBeTruthy();
        await categoriesModel.setPageOption(1);
        const pageName = await categoriesModel.getThePageName();
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        await categoriesModel.verifyThatCategoryNameFieldIsNotDisplayed();
        await commonModel.setSearchValue(categoryName);
        await categoriesModel.hasCategoryTableValues(true);

        // The category created must appear in the category table with its page assigned
        const exists = await categoriesModel.checkCategoryWithPageInTable(categoryName, pageName);
        expect(exists).toBeTruthy();
        //await categoriesModel.deleteCategoryBrandLevel(categoryName);
        //await commonModel.waitUntilSpinnerDisappears();
      }
    });

    /**
     * Ends tests for categories at subbrand level
     */

    /**
     * Starts tests for categories at store level
     */

    test(`Verify if the create button that enables the creation of a category is not display at store level '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const commonModel = new CommonModel(page);

      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeName);
        await commonModel.waitUntilSpinnerDisappears();
        await topBarModel.selectNodeBrandChild(brandsData.storeBrandName, brandsData.store);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
  
        await categoriesModel.verifyThatCreateCategoryButtonIsNotDisplayed();
      }
    });

    /**
     * Ends tests for categories at store level
     */

  });

  /**
 * Starts tests for translated english categories
 */

  users.forEach(user => {
    test(`Verify a new english category is created successfully from dual language brand level with default english language '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
  
      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEn);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();
        const categoryName = categoriesData.categoryDefaultNameEn + uuidv4();
        await categoriesModel.onClickCategoryCreateButton();
        await categoriesModel.setDefaultCategoryNameDualLanguage(categoryName, 0);
        let dropdownExists = await categoriesModel.pageDropdown.isVisible();
        expect(dropdownExists).toBeTruthy();
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        await categoriesModel.verifyThatCategoryNameFieldIsNotDisplayed();

        expect(await commonModel.snackbar.innerText()).toContain(categoriesData.categoryCreatedSuccessfully);
        await commonModel.setSearchValue(categoryName);
        await categoriesModel.hasCategoryTableValues(true);
        //await categoriesModel.deleteCategoryBrandLevel(categoryName);
        //await commonModel.waitUntilSpinnerDisappears();
      }
    });

    test(`Verify that the category name is a required field, when the brand is configured in dual language. Default English '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
  
      await page.goto(url);
      await page.setViewportSize({width: 1800, height: 1600});
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER5_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER5_PASSWORD}`

        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEn);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();

      }else{
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEn);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();
  
        await categoriesModel.onClickCategoryCreateButton();
        let dropdownExists = await categoriesModel.pageDropdown.isVisible();
        expect(dropdownExists).toBeTruthy();
        await page.waitForTimeout(2000);
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        
        expect(await categoriesModel.inputAddonCategoryModal.nth(0).innerText()).toContain("A translation for EN is required for \"name\"");
        expect(await categoriesModel.inputAddonCategoryModal.nth(1).innerText()).toContain("The default name field is required.");
        //expect(await categoriesModel.inputAddonCategoryModal.nth(2).innerText()).toContain(brandsData.spanishLanguage);
        expect((await categoriesModel.categoryNameInput.nth(0).getAttribute('class'))?.includes('wrong')).toBeTruthy();
        expect(await commonModel.existAlert.nth(0).innerText()).toContain(categoriesData.categoryNameEnRequired);
        expect(await commonModel.existAlert.nth(1).innerText()).toContain(categoriesData.categoryNameRequired);
        expect(await commonModel.fieldRequired.innerText()).toContain(categoriesData.defaultFieldRequired);
      }
 
    });

    test(`Verify if alert appears when creating an existing english category at dual language brand level default english '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
  
      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEn);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();
        const categoryName = categoriesData.categoryDefaultNameEn + uuidv4();
        await categoriesModel.onClickCategoryCreateButton();
        await categoriesModel.setDefaultCategoryNameDualLanguage(categoryName, 0);
        let dropdownExists = await categoriesModel.pageDropdown.isVisible();
        expect(dropdownExists).toBeTruthy();
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        await categoriesModel.verifyThatCategoryNameFieldIsNotDisplayed();

        await categoriesModel.onClickCategoryCreateButton();
        await categoriesModel.setDefaultCategoryNameDualLanguage(categoryName);
        let dropdownExists2 = categoriesModel.pageDropdown.isVisible();
        expect(dropdownExists2).toBeTruthy();
        await categoriesModel.onClickCategorySaveButton();

        expect(await commonModel.snackbar.innerText()).toContain(categoriesData.categoryCreatedSuccessfully);

        const existingCategoryMsg = `There's already a category named "${categoryName}" in this page`;
        expect(await commonModel.existAlert.innerText()).toContain(existingCategoryMsg);
        await categoriesModel.onClickCategoryCancelButton();

        await commonModel.setSearchValue(categoryName);
        //await categoriesModel.hasCategoryTableValues(true);
        //await categoriesModel.deleteCategoryBrandLevel(categoryName);
        //await commonModel.waitUntilSpinnerDisappears();
      }
    });

    test(`Verify a new english category is created successfully from dual language subbrand level with default english language '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
  
      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();

      } else{
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEn);
        await commonModel.waitUntilSpinnerDisappears();
        await topBarModel.selectNodeBrandChild(brandsData.subBrandNameEn, brandsData.subBrand);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();
        const categoryName = categoriesData.categoryDefaultNameEn + uuidv4();
        await categoriesModel.onClickCategoryCreateButton();
        await categoriesModel.setDefaultCategoryNameDualLanguage(categoryName, 0);
        let dropdownExists = await categoriesModel.pageDropdown.isVisible();
        expect(dropdownExists).toBeTruthy();
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        await categoriesModel.verifyThatCategoryNameFieldIsNotDisplayed();
  
        expect(await commonModel.snackbar.innerText()).toContain(categoriesData.categoryCreatedSuccessfully);
        await commonModel.setSearchValue(categoryName);
        await categoriesModel.hasCategoryTableValues(true);
        //await categoriesModel.deleteCategoryBrandLevel(categoryName);
        //await commonModel.waitUntilSpinnerDisappears();
      }

    });

    test(`Verify that the english category name is a required field, when the subbrand is configured in dual language. Default English '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
  
      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
      await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEn);
        await commonModel.waitUntilSpinnerDisappears();
        await topBarModel.selectNodeBrandChild(brandsData.subBrandNameEn, brandsData.subBrand);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.onClickCategoryCreateButton();
        let dropdownExists = await categoriesModel.pageDropdown.isVisible();
        expect(dropdownExists).toBeTruthy();
        await page.waitForTimeout(2000);
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        
        expect(await categoriesModel.inputAddonCategoryModal.nth(0).innerText()).toContain("A translation for EN is required for \"name\"");
        expect(await categoriesModel.inputAddonCategoryModal.nth(1).innerText()).toContain("The default name field is required.");
        //expect(await categoriesModel.inputAddonCategoryModal.nth(2).innerText()).toContain(brandsData.spanishLanguage);
        expect((await categoriesModel.categoryNameInput.nth(0).getAttribute('class'))?.includes('wrong')).toBeTruthy();
        expect(await commonModel.existAlert.nth(0).innerText()).toContain(categoriesData.categoryNameEnRequired);
        expect(await commonModel.existAlert.nth(1).innerText()).toContain(categoriesData.categoryNameRequired);
        expect(await commonModel.fieldRequired.innerText()).toContain(categoriesData.defaultFieldRequired);
      }
    });

    test(`Verify if alert appears when creating an existing english category at dual language subbrand level default english '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
  
      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEn);
        await commonModel.waitUntilSpinnerDisappears();
        await topBarModel.selectNodeBrandChild(brandsData.subBrandNameEn, brandsData.subBrand);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();
        const categoryName = categoriesData.categoryDefaultNameEn + uuidv4();
        await categoriesModel.onClickCategoryCreateButton();
        await categoriesModel.setDefaultCategoryNameDualLanguage(categoryName, 0);
        let dropdownExists = await categoriesModel.pageDropdown.isVisible();
        expect(dropdownExists).toBeTruthy();
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        await categoriesModel.verifyThatCategoryNameFieldIsNotDisplayed();
        await categoriesModel.verifyThatThecratedCategoryMessageIsDisplayed();

        await categoriesModel.onClickCategoryCreateButton();
        await categoriesModel.setDefaultCategoryNameDualLanguage(categoryName);
        let dropdownExists2 = categoriesModel.pageDropdown.isVisible();
        expect(dropdownExists2).toBeTruthy();
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        const existingCategoryMsg = `There's already a category named "${categoryName}" in this page`;
        expect(await commonModel.existAlert.innerText()).toContain(existingCategoryMsg);
        await categoriesModel.onClickCategoryCancelButton();

        await commonModel.setSearchValue(categoryName);
        await categoriesModel.hasCategoryTableValues(true);
        //await categoriesModel.deleteCategoryBrandLevel(categoryName);
        //await commonModel.waitUntilSpinnerDisappears();
      }
    });

    test(`Verify if the create button that enables the creation of a category is not display at dual language store level default english '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const commonModel = new CommonModel(page);

      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEn);
        await commonModel.waitUntilSpinnerDisappears();
        await topBarModel.selectNodeBrandChild(brandsData.storeBrandNameEn, brandsData.store);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();

        await categoriesModel.verifyThatCreateCategoryButtonIsNotDisplayed();
      }
    });

    test(`Verify that the english category can select a different page than the browse page at dual language brand level default english '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const pagesModel = new Pagesmodel(page);
      const commonModel = new CommonModel(page);

      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEn);
        await commonModel.waitUntilSpinnerDisappears();
        await pagesModel.ensureAtLeastOnePageExistsBrandTwoLanguage();
        await sidebarModel.onClickCategoriesOptionMenu();

        const categoryName = categoriesData.categoryDefaultNameEn + uuidv4();
        await categoriesModel.onClickCategoryCreateButton();
        await categoriesModel.setDefaultCategoryNameDualLanguage(categoryName, 0);
        await categoriesModel.setDefaultCategoryNameDualLanguage(categoriesData.categoryDefaultNameEs, 1);
        await categoriesModel.setPageOption(1);
        const pageName = await categoriesModel.pageDropdown.locator('span').nth(0).innerText();
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        await categoriesModel.verifyThatCategoryNameFieldIsNotDisplayed();
        await commonModel.setSearchValue(categoryName);
        await categoriesModel.hasCategoryTableValues(true);

        // The category created must appear in the category table with its page assigned
        const exists = await categoriesModel.checkCategoryWithPageInTable(categoryName, pageName);
        expect(exists).toBeTruthy();
        //await categoriesModel.deleteCategoryBrandLevel(categoryName);
        //await commonModel.waitUntilSpinnerDisappears();
      }

    });

    test(`Verify that the english category can select a different page than the browse page at dual language subbrand level default english '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const pagesModel = new Pagesmodel(page);
      const commonModel = new CommonModel(page);

      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEn);
        await commonModel.waitUntilSpinnerDisappears();
        await topBarModel.selectNodeBrandChild(brandsData.subBrandNameEn, brandsData.subBrand);
        await commonModel.waitUntilSpinnerDisappears();
        await pagesModel.ensureAtLeastOnePageExistsBrandTwoLanguage();
        await sidebarModel.onClickCategoriesOptionMenu();

        const categoryName = categoriesData.categoryDefaultNameEn + uuidv4();
        await categoriesModel.onClickCategoryCreateButton();
        await categoriesModel.setDefaultCategoryNameDualLanguage(categoryName, 0);
        await categoriesModel.setDefaultCategoryNameDualLanguage(categoriesData.categoryDefaultNameEs, 1);
        await categoriesModel.setPageOption(1);
        const pageName = await categoriesModel.pageDropdown.locator('span').nth(0).innerText();
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        await categoriesModel.verifyThatCategoryNameFieldIsNotDisplayed();
        await commonModel.setSearchValue(categoryName);
        await categoriesModel.hasCategoryTableValues(true);

        // The category created must appear in the category table with its page assigned
        const exists = await categoriesModel.checkCategoryWithPageInTable(categoryName, pageName);
        expect(exists).toBeTruthy();
        //await categoriesModel.deleteCategoryBrandLevel(categoryName);
        //await commonModel.waitUntilSpinnerDisappears();
      }
    });

    test.skip(`Verify english category is deleted successfully at dual language brand level '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);

      await page.goto(url);
      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEn);
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickCategoriesOptionMenu();

      const categoryName = categoriesData.categoryDefaultNameEn + uuidv4();
      await categoriesModel.onClickCategoryCreateButton();
      await categoriesModel.setDefaultCategoryNameDualLanguage(categoryName, 0);
      await categoriesModel.onClickCategorySaveButton();
      await commonModel.waitUntilSpinnerDisappears();
      await categoriesModel.verifyThatCategoryNameFieldIsNotDisplayed();


      await commonModel.setSearchValue(categoryName);
      await categoriesModel.hasCategoryTableValues(true);
      //await categoriesModel.deleteCategoryBrandLevel(categoryName);
      //await commonModel.waitUntilSpinnerDisappears();

      //await categoriesModel.verifyThatTheCategoryIsNotDisplayed(categoryName);
    });

    test(`Verify that is not possible to create only a spanish category at dual language brand level default english '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);

      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEn);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        
        const categoryName = categoriesData.categoryDefaultNameEs + uuidv4();
        await categoriesModel.onClickCategoryCreateButton();
        await categoriesModel.setDefaultCategoryNameDualLanguage(categoryName, 1);
        let dropdownExists = await categoriesModel.pageDropdown.isVisible();
        expect(dropdownExists).toBeTruthy();
        await page.waitForTimeout(2000);
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        expect(await commonModel.existAlert.nth(1).innerText()).toContain(categoriesData.categoryNameRequired);
        expect(await commonModel.fieldRequired.innerText()).toContain(categoriesData.defaultFieldRequired);
        await categoriesModel.onClickCategoryCancelButton();
        await commonModel.setSearchValue(categoryName);
        await categoriesModel.verifyCategoriesTableEmpty();
      }
    });


    test(`Verify that is not possible to create only a spanish category at dual language subbrand level default english '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);

      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEn);
        await commonModel.waitUntilSpinnerDisappears();
        await topBarModel.selectNodeBrandChild(brandsData.subBrandNameEn, brandsData.subBrand);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        
        const categoryName = categoriesData.categoryDefaultNameEs + uuidv4();
        await categoriesModel.onClickCategoryCreateButton();
        await categoriesModel.setDefaultCategoryNameDualLanguage(categoryName, 1);
        let dropdownExists = await categoriesModel.pageDropdown.isVisible();
        expect(dropdownExists).toBeTruthy();
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();


        expect(await commonModel.existAlert.nth(1).innerText()).toContain(categoriesData.categoryNameRequired);
        expect(await commonModel.fieldRequired.innerText()).toContain(categoriesData.defaultFieldRequired);
        await categoriesModel.onClickCategoryCancelButton();
        await commonModel.setSearchValue(categoryName);
        await categoriesModel.verifyCategoriesTableEmpty();
      }
    });


    test(`Verify that is possible to edit the spanish category in an english category at dual language brand level default english '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);

      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEn);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        
        const categoryName = categoriesData.categoryDefaultNameEn + uuidv4();
        await categoriesModel.onClickCategoryCreateButton();
        await categoriesModel.setDefaultCategoryName(categoryName);
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        await commonModel.setSearchValue(categoryName);
        await categoriesModel.hasCategoryTableValues(true);

        await categoriesModel.onClickCategoryEditButton(categoryName);
        const categoryNameEs = categoriesData.categoryDefaultNameEs + uuidv4();
        await categoriesModel.setDefaultCategoryName(categoryNameEs, 1);
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.onClickCategoryEditButton(categoryName);
        expect(await categoriesModel.categoryNameInput.nth(1).inputValue()).toEqual(categoryNameEs);
        await categoriesModel.onClickCategoryCancelButton();
        //await categoriesModel.deleteCategoryBrandLevel(categoryName);
        //await commonModel.waitUntilSpinnerDisappears();
      }
    });

    test(`Verify that is possible to edit the spanish category in an english category at dual language subbrand level default english '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);

      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEn);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandNameEn, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickCategoriesOptionMenu();
      
      const categoryName = categoriesData.categoryDefaultNameEn + uuidv4();
      await categoriesModel.onClickCategoryCreateButton();
      await categoriesModel.setDefaultCategoryName(categoryName);
      await categoriesModel.onClickCategorySaveButton();
      await commonModel.waitUntilSpinnerDisappears();

      await commonModel.setSearchValue(categoryName);
      await categoriesModel.hasCategoryTableValues(true);

      await categoriesModel.onClickCategoryEditButton(categoryName);
      const categoryNameEs = categoriesData.categoryDefaultNameEs + uuidv4();
      await categoriesModel.setDefaultCategoryName(categoryNameEs, 1);
      await categoriesModel.onClickCategorySaveButton();
      await commonModel.waitUntilSpinnerDisappears();

      await categoriesModel.onClickCategoryEditButton(categoryName);
      expect(await categoriesModel.categoryNameInput.nth(1).inputValue()).toEqual(categoryNameEs);
      await categoriesModel.onClickCategoryCancelButton();
      //await categoriesModel.deleteCategoryBrandLevel(categoryName);
      //await commonModel.waitUntilSpinnerDisappears();
      }
    });

    test(`Verify that is not possible to edit the required fields of an english category at dual language brand level default english '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);

      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEn);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        
        const categoryName = categoriesData.categoryDefaultNameEn + uuidv4();
        await categoriesModel.onClickCategoryCreateButton();
        await categoriesModel.setDefaultCategoryName(categoryName);
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        await commonModel.setSearchValue(categoryName);
        await categoriesModel.hasCategoryTableValues(true);

        await categoriesModel.onClickCategoryEditButton(categoryName);
        await categoriesModel.verifyThatCategoryNameFieldIsDisplayed();
        expect((await categoriesModel.categoryNameInput.nth(0).getAttribute('class'))?.includes('disable')).toBeTruthy();
        expect(categoriesModel.editModalpageDropdown.locator('div.p-dropdown').isDisabled).toBeTruthy();
        await categoriesModel.onClickCategoryCancelButton();
        //await categoriesModel.deleteCategoryBrandLevel(categoryName);
        //await commonModel.waitUntilSpinnerDisappears();
      }
    });

    test(`Verify that is not possible to edit the required fields of an english category at dual language subbrand level default english '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);

      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEn);
        await commonModel.waitUntilSpinnerDisappears();
        await topBarModel.selectNodeBrandChild(brandsData.subBrandNameEn, brandsData.subBrand);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        
        const categoryName = categoriesData.categoryDefaultNameEn + uuidv4();
        await categoriesModel.onClickCategoryCreateButton();
        await categoriesModel.setDefaultCategoryName(categoryName);
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        await commonModel.setSearchValue(categoryName);
        await categoriesModel.hasCategoryTableValues(true);

        await categoriesModel.onClickCategoryEditButton(categoryName);
        await categoriesModel.verifyThatCategoryNameFieldIsDisplayed();
        await page.waitForTimeout(1000);
        expect((await categoriesModel.categoryNameInput.nth(0).getAttribute('class'))?.includes('disable')).toBeTruthy();
        expect(categoriesModel.editModalpageDropdown.locator('div.p-dropdown').isDisabled).toBeTruthy();
        await categoriesModel.onClickCategoryCancelButton();
        //await categoriesModel.deleteCategoryBrandLevel(categoryName);
        //await commonModel.waitUntilSpinnerDisappears();
      }
    });

  });

  /**
   * Ends tests for translated english categories
   */

  /**
   * Starts tests for translated spanish categories
   */

  users.forEach(user => {
    test(`Verify a new spanish category is created successfully from dual language brand level with default spanish language '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
  
      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEs);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();
        const categoryName = categoriesData.categoryDefaultNameEs + uuidv4();
        await categoriesModel.onClickCategoryCreateButton();
        await categoriesModel.setDefaultCategoryNameDualLanguage(categoryName, 0);
        let dropdownExists = await categoriesModel.pageDropdown.isVisible();
        expect(dropdownExists).toBeTruthy();
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        await categoriesModel.verifyThatCategoryNameFieldIsNotDisplayed();

        expect(await commonModel.snackbar.innerText()).toContain(categoriesData.categoryCreatedSuccessfully);
        await commonModel.setSearchValue(categoryName);
        await categoriesModel.hasCategoryTableValues(true);
        //await categoriesModel.deleteCategoryBrandLevel(categoryName);
        //await commonModel.waitUntilSpinnerDisappears();
      }
    });

    test(`Verify that the spanish category name is a required field, when the brand is configured in dual language. Default Spanish '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
  
      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEs);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.onClickCategoryCreateButton();
        let dropdownExists = await categoriesModel.pageDropdown.isVisible();
        expect(dropdownExists).toBeTruthy();
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        
        expect(await categoriesModel.inputAddonCategoryModal.nth(0).innerText()).toContain("A translation for ES is required for \"name\"");
        expect(await categoriesModel.inputAddonCategoryModal.nth(1).innerText()).toContain("The default name field is required.");
        //expect(await categoriesModel.inputAddonCategoryModal.nth(2).innerText()).toContain(brandsData.englishLanguage);
        expect((await categoriesModel.categoryNameInput.nth(0).getAttribute('class'))?.includes('wrong')).toBeTruthy();
        expect(await commonModel.existAlert.nth(1).innerText()).toContain(categoriesData.categoryNameRequired);
        expect(await commonModel.fieldRequired.innerText()).toContain(categoriesData.defaultFieldRequired);
      }
    });

    test(`Verify if alert appears when creating an existing spanish category at dual language brand level default spanish '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
  
      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEs);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();
        const categoryName = categoriesData.categoryDefaultNameEs + uuidv4();
        await categoriesModel.onClickCategoryCreateButton();
        await categoriesModel.setDefaultCategoryNameDualLanguage(categoryName, 0);
        let dropdownExists = await categoriesModel.pageDropdown.isVisible();
        expect(dropdownExists).toBeTruthy();
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        await categoriesModel.verifyThatCategoryNameFieldIsNotDisplayed();

        await categoriesModel.onClickCategoryCreateButton();
        await categoriesModel.setDefaultCategoryNameDualLanguage(categoryName);
        let dropdownExists2 = categoriesModel.pageDropdown.isVisible();
        expect(dropdownExists2).toBeTruthy();
        await categoriesModel.onClickCategorySaveButton();
        expect(await commonModel.snackbar.innerText()).toContain(categoriesData.categoryCreatedSuccessfully);

        const existingCategoryMsg = `There's already a category named "${categoryName}" in this page`;
        expect(await commonModel.existAlert.innerText()).toContain(existingCategoryMsg);
        await categoriesModel.onClickCategoryCancelButton();

        await commonModel.setSearchValue(categoryName);
        await categoriesModel.hasCategoryTableValues(true);
        //await categoriesModel.deleteCategoryBrandLevel(categoryName);
        //await commonModel.waitUntilSpinnerDisappears();
      }
    });

    test(`Verify a new spanish category is created successfully from dual language subbrand level with default spanish language '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
  
      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEs);
        await commonModel.waitUntilSpinnerDisappears();
        await topBarModel.selectNodeBrandChild(brandsData.subBrandNameEs, brandsData.subBrand);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();
        const categoryName = categoriesData.categoryDefaultNameEs + uuidv4();
        await categoriesModel.onClickCategoryCreateButton();
        await categoriesModel.setDefaultCategoryNameDualLanguage(categoryName, 0);
        let dropdownExists = await categoriesModel.pageDropdown.isVisible();
        expect(dropdownExists).toBeTruthy();
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        await categoriesModel.verifyThatCategoryNameFieldIsNotDisplayed();

        expect(await commonModel.snackbar.innerText()).toContain(categoriesData.categoryCreatedSuccessfully);
        await commonModel.setSearchValue(categoryName);
        await categoriesModel.hasCategoryTableValues(true);
        //await categoriesModel.deleteCategoryBrandLevel(categoryName);
        //await commonModel.waitUntilSpinnerDisappears();
      }
    });

    test(`Verify that the spanish category name is a required field, when the subbrand is configured in dual language Default Spanish '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
  
      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEs);
        await commonModel.waitUntilSpinnerDisappears();
        await topBarModel.selectNodeBrandChild(brandsData.subBrandNameEs, brandsData.subBrand);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.onClickCategoryCreateButton();
        let dropdownExists = await categoriesModel.pageDropdown.isVisible();
        expect(dropdownExists).toBeTruthy();
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        
        expect(await categoriesModel.inputAddonCategoryModal.nth(0).innerText()).toContain("A translation for ES is required for \"name\"");
        expect(await categoriesModel.inputAddonCategoryModal.nth(1).innerText()).toContain("The default name field is required.");
        //expect(await categoriesModel.inputAddonCategoryModal.nth(2).innerText()).toContain(brandsData.englishLanguage);
        expect((await categoriesModel.categoryNameInput.nth(0).getAttribute('class'))?.includes('wrong')).toBeTruthy();
        expect(await commonModel.existAlert.nth(1).innerText()).toContain(categoriesData.categoryNameRequired);
        expect(await commonModel.fieldRequired.innerText()).toContain(categoriesData.defaultFieldRequired);
      }
    });

    test(`Verify if alert appears when creating an existing spanish category at dual language subbrand level default spanish '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
  
      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEs);
        await commonModel.waitUntilSpinnerDisappears();
        await topBarModel.selectNodeBrandChild(brandsData.subBrandNameEs, brandsData.subBrand);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();
        const categoryName = categoriesData.categoryDefaultNameEs + uuidv4();
        await categoriesModel.onClickCategoryCreateButton();
        await categoriesModel.setDefaultCategoryNameDualLanguage(categoryName, 0);
        let dropdownExists = await categoriesModel.pageDropdown.isVisible();
        expect(dropdownExists).toBeTruthy();
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        await categoriesModel.verifyThatCategoryNameFieldIsNotDisplayed();

        await categoriesModel.onClickCategoryCreateButton();
        await categoriesModel.setDefaultCategoryNameDualLanguage(categoryName);
        let dropdownExists2 = categoriesModel.pageDropdown.isVisible();
        expect(dropdownExists2).toBeTruthy();
        await categoriesModel.onClickCategorySaveButton();
        expect(await commonModel.snackbar.innerText()).toContain(categoriesData.categoryCreatedSuccessfully);

        const existingCategoryMsg = `There's already a category named "${categoryName}" in this page`;
        expect(await commonModel.existAlert.innerText()).toContain(existingCategoryMsg);
        await categoriesModel.onClickCategoryCancelButton();

        await commonModel.setSearchValue(categoryName);
        await categoriesModel.hasCategoryTableValues(true);
        //await categoriesModel.deleteCategoryBrandLevel(categoryName);
        //await commonModel.waitUntilSpinnerDisappears();
      }
    });

    test(`Verify if the create button that enables the creation of a category is not display at dual language store level default spanish '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const commonModel = new CommonModel(page);

      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEs);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.storeBrandNameEs, brandsData.store);
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickCategoriesOptionMenu();

      await categoriesModel.verifyThatCreateCategoryButtonIsNotDisplayed();
      }
    });

    test(`Verify that the spanish category can select a different page than the browse page at dual language brand level default spanish '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const pagesModel = new Pagesmodel(page);
      const commonModel = new CommonModel(page);

      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEs);
        await commonModel.waitUntilSpinnerDisappears();
        await pagesModel.ensureAtLeastOnePageExists();
        await sidebarModel.onClickCategoriesOptionMenu();

        const categoryName = categoriesData.categoryDefaultNameEs + uuidv4();
        await categoriesModel.onClickCategoryCreateButton();
        await categoriesModel.setDefaultCategoryNameDualLanguage(categoryName, 0);
        await categoriesModel.setDefaultCategoryNameDualLanguage(categoriesData.categoryDefaultNameEn, 1);
        await categoriesModel.setPageOption(1);
        const pageName = await categoriesModel.pageDropdown.locator('span').nth(0).innerText();
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();
        await categoriesModel.verifyThatCategoryNameFieldIsNotDisplayed();
        await commonModel.setSearchValue(categoryName);
        await categoriesModel.hasCategoryTableValues(true);

        // The category created must appear in the category table with its page assigned
        const exists = await categoriesModel.checkCategoryWithPageInTable(categoryName, pageName);
        expect(exists).toBeTruthy();
        //await categoriesModel.deleteCategoryBrandLevel(categoryName);
        //await commonModel.waitUntilSpinnerDisappears();
      }
    });

    test(`Verify that the spanish category can select a different page than the browse page at dual language subbrand level default spanish '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const pagesModel = new Pagesmodel(page);
      const commonModel = new CommonModel(page);

      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEs);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandNameEs, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
      await pagesModel.ensureAtLeastOnePageExists();
      await sidebarModel.onClickCategoriesOptionMenu();

      const categoryName = categoriesData.categoryDefaultNameEs + uuidv4();
      await categoriesModel.onClickCategoryCreateButton();
      await categoriesModel.setDefaultCategoryNameDualLanguage(categoryName, 0);
      await categoriesModel.setDefaultCategoryNameDualLanguage(categoriesData.categoryDefaultNameEn, 1);
      await categoriesModel.setPageOption(1);
      const pageName = await categoriesModel.pageDropdown.locator('span').nth(0).innerText();
      await categoriesModel.onClickCategorySaveButton();
      await commonModel.waitUntilSpinnerDisappears();
      await categoriesModel.verifyThatCategoryNameFieldIsNotDisplayed();
      await commonModel.setSearchValue(categoryName);
      await categoriesModel.hasCategoryTableValues(true);

      // The category created must appear in the category table with its page assigned
      const exists = await categoriesModel.checkCategoryWithPageInTable(categoryName, pageName);
      expect(exists).toBeTruthy();
      //await categoriesModel.deleteCategoryBrandLevel(categoryName);
      await commonModel.waitUntilSpinnerDisappears();
      }
    });

    test.skip(`Verify spanish category is deleted successfully at dual language brand level '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);

      await page.goto(url);
      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEs);
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickCategoriesOptionMenu();

      const categoryName = categoriesData.categoryDefaultNameEs + uuidv4();
      await categoriesModel.onClickCategoryCreateButton();
      await categoriesModel.setDefaultCategoryNameDualLanguage(categoryName, 0);
      await categoriesModel.onClickCategorySaveButton();
      await commonModel.waitUntilSpinnerDisappears();
      await categoriesModel.verifyThatCategoryNameFieldIsNotDisplayed();


      await commonModel.setSearchValue(categoryName);
      await categoriesModel.hasCategoryTableValues(true);
      //await categoriesModel.deleteCategoryBrandLevel(categoryName);
      //await commonModel.waitUntilSpinnerDisappears();

      await categoriesModel.verifyThatTheCategoryIsNotDisplayed(categoryName);
    });


    test.skip(`Verify spanish category is deleted successfully at dual language subbrand level '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);

      await page.goto(url);
      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEs);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandNameEs, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickCategoriesOptionMenu();

      const categoryName = categoriesData.categoryDefaultNameEs + uuidv4();
      await categoriesModel.onClickCategoryCreateButton();
      await categoriesModel.setDefaultCategoryNameDualLanguage(categoryName, 0);
      await categoriesModel.onClickCategorySaveButton();
      await commonModel.waitUntilSpinnerDisappears();
      await categoriesModel.verifyThatCategoryNameFieldIsNotDisplayed();


      await commonModel.setSearchValue(categoryName);
      await categoriesModel.hasCategoryTableValues(true);
      //await categoriesModel.deleteCategoryBrandLevel(categoryName);
      //await commonModel.waitUntilSpinnerDisappears();

      //await categoriesModel.verifyThatTheCategoryIsNotDisplayed(categoryName);
    });

    test(`Verify that is not possible to create only an english category at dual language brand level default spanish '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);

      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEs);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        
        const categoryName = categoriesData.categoryDefaultNameEn + uuidv4();
        await categoriesModel.onClickCategoryCreateButton();
        await categoriesModel.setDefaultCategoryNameDualLanguage(categoryName, 1);
        let dropdownExists = await categoriesModel.pageDropdown.isVisible();
        expect(dropdownExists).toBeTruthy();
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();

        expect(await commonModel.existAlert.nth(1).innerText()).toContain(categoriesData.categoryNameRequired);
        expect(await commonModel.fieldRequired.innerText()).toContain(categoriesData.defaultFieldRequired);
        await categoriesModel.onClickCategoryCancelButton();
        await commonModel.setSearchValue(categoryName);
        await categoriesModel.verifyCategoriesTableEmpty();
      }
    });


    test(`Verify that is not possible to create only an english category at dual language subbrand level default spanish '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);

      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
        await loginModel.login(user.username, user.password);
        if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEs);
        await commonModel.waitUntilSpinnerDisappears();
        await topBarModel.selectNodeBrandChild(brandsData.subBrandNameEs, brandsData.subBrand);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        
        const categoryName = categoriesData.categoryDefaultNameEn + uuidv4();
        await categoriesModel.onClickCategoryCreateButton();
        await categoriesModel.setDefaultCategoryNameDualLanguage(categoryName, 1);
        let dropdownExists = await categoriesModel.pageDropdown.isVisible();
        expect(dropdownExists).toBeTruthy();
        await categoriesModel.onClickCategorySaveButton();
        await commonModel.waitUntilSpinnerDisappears();


        expect(await commonModel.existAlert.nth(1).innerText()).toContain(categoriesData.categoryNameRequired);
        expect(await commonModel.fieldRequired.innerText()).toContain(categoriesData.defaultFieldRequired);
        await categoriesModel.onClickCategoryCancelButton();
        await commonModel.setSearchValue(categoryName);
        await categoriesModel.verifyCategoriesTableEmpty();
      }
    });


    test(`Verify that is possible to edit the english category in a spanish category at dual language brand level default spanish '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);

      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEs);
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickCategoriesOptionMenu();
      
      const categoryName = categoriesData.categoryDefaultNameEs + uuidv4();
      await categoriesModel.onClickCategoryCreateButton();
      await categoriesModel.setDefaultCategoryName(categoryName);
      await categoriesModel.onClickCategorySaveButton();
      await commonModel.waitUntilSpinnerDisappears();

      await commonModel.setSearchValue(categoryName);
      await categoriesModel.hasCategoryTableValues(true);

      await categoriesModel.onClickCategoryEditButton(categoryName);
      const categoryNameEs = categoriesData.categoryDefaultNameEn + uuidv4();
      await categoriesModel.setDefaultCategoryName(categoryNameEs, 1);
      await categoriesModel.onClickCategorySaveButton();
      await commonModel.waitUntilSpinnerDisappears();

      await categoriesModel.onClickCategoryEditButton(categoryName);
      expect(await categoriesModel.categoryNameInput.nth(1).inputValue()).toEqual(categoryNameEs);
      await categoriesModel.onClickCategoryCancelButton();
      //await categoriesModel.deleteCategoryBrandLevel(categoryName);
      //await commonModel.waitUntilSpinnerDisappears();
      }
    });

    test(`Verify that is possible to edit the english category in a spanish category at dual language subbrand level default spanish '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);

      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEs);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandNameEs, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickCategoriesOptionMenu();
      
      const categoryName = categoriesData.categoryDefaultNameEn + uuidv4();
      await categoriesModel.onClickCategoryCreateButton();
      await categoriesModel.setDefaultCategoryName(categoryName);
      await categoriesModel.onClickCategorySaveButton();
      await commonModel.waitUntilSpinnerDisappears();

      await commonModel.setSearchValue(categoryName);
      await categoriesModel.hasCategoryTableValues(true);

      await categoriesModel.onClickCategoryEditButton(categoryName);
      const categoryNameEs = categoriesData.categoryDefaultNameEs + uuidv4();
      await categoriesModel.setDefaultCategoryName(categoryNameEs, 1);
      await categoriesModel.onClickCategorySaveButton();
      await commonModel.waitUntilSpinnerDisappears();

      await categoriesModel.onClickCategoryEditButton(categoryName);
      expect(await categoriesModel.categoryNameInput.nth(1).inputValue()).toEqual(categoryNameEs);
      await categoriesModel.onClickCategoryCancelButton();
      //await categoriesModel.deleteCategoryBrandLevel(categoryName);
      //await commonModel.waitUntilSpinnerDisappears();
      }
    });

    test(`Verify that is not possible to edit the required fields of a spanish category at dual language brand level default spanish '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);

      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEs);
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickCategoriesOptionMenu();
      
      const categoryName = categoriesData.categoryDefaultNameEs + uuidv4();
      await categoriesModel.onClickCategoryCreateButton();
      await categoriesModel.setDefaultCategoryName(categoryName);
      await categoriesModel.onClickCategorySaveButton();
      await commonModel.waitUntilSpinnerDisappears();

      await commonModel.setSearchValue(categoryName);
      await categoriesModel.hasCategoryTableValues(true);

      await categoriesModel.onClickCategoryEditButton(categoryName);
      await categoriesModel.verifyThatCategoryNameFieldIsDisplayed();
      expect((await categoriesModel.categoryNameInput.nth(0).getAttribute('class'))?.includes('disable')).toBeTruthy();
      expect(categoriesModel.editModalpageDropdown.locator('div.p-dropdown').isDisabled).toBeTruthy();
      await categoriesModel.onClickCategoryCancelButton();
      //await categoriesModel.deleteCategoryBrandLevel(categoryName);
      //await commonModel.waitUntilSpinnerDisappears();
      }
    });

    test(`Verify that is not possible to edit the required fields of a spanish category at dual language subbrand level default spanish '${user.role}'`, async ({ page }) => {
      const categoriesModel = new CategoriesModel(page);
      const commonModel = new CommonModel(page);
      const sidebarModel = new SidebarModel(page);
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);

      await page.goto(url);
      if ( user.role == "Store Owner"){
        user.username = `${process.env.AUTOMATION_STOREOWNER2_USERNAME}`
        user.password = `${process.env.AUTOMATION_STOREOWNER2_PASSWORD}`

        await loginModel.login(user.username, user.password);
        await commonModel.waitUntilSpinnerDisappears();
        await sidebarModel.onClickCategoriesOptionMenu();
        await commonModel.waitUntilSpinnerDisappears();

        await categoriesModel.verifyThatCreateCategoryIsNotDisplayed();
        
      } else{
      await loginModel.login(user.username, user.password);
      if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.brandNodeNameEs);
      await commonModel.waitUntilSpinnerDisappears();
      await topBarModel.selectNodeBrandChild(brandsData.subBrandNameEs, brandsData.subBrand);
      await commonModel.waitUntilSpinnerDisappears();
      await sidebarModel.onClickCategoriesOptionMenu();
      
      const categoryName = categoriesData.categoryDefaultNameEs + uuidv4();
      await categoriesModel.onClickCategoryCreateButton();
      await categoriesModel.setDefaultCategoryName(categoryName);
      await categoriesModel.onClickCategorySaveButton();
      await commonModel.waitUntilSpinnerDisappears();

      await commonModel.setSearchValue(categoryName);
      await categoriesModel.hasCategoryTableValues(true);

      await categoriesModel.onClickCategoryEditButton(categoryName);
      await categoriesModel.verifyThatCategoryNameFieldIsDisplayed();
      expect((await categoriesModel.categoryNameInput.nth(0).getAttribute('class'))?.includes('disable')).toBeTruthy();
      expect(categoriesModel.editModalpageDropdown.locator('div.p-dropdown').isDisabled).toBeTruthy();
      await categoriesModel.onClickCategoryCancelButton();
      //await categoriesModel.deleteCategoryBrandLevel(categoryName);
      //await commonModel.waitUntilSpinnerDisappears();
      }
    });

  });

    /**
     * Ends tests for translated spanish categories
     */

});