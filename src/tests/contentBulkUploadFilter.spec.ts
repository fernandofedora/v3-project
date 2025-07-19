import { test } from '@playwright/test';
import { LoginModel } from '../pom/loginModel';
import {SidebarModel} from '../pom/sidebarModel';
import {TopBarModel} from '../pom/topBarModel';
import { CommonModel } from '../pom/commonModel';
import { ContentModel } from '../pom/contentModel';
import {validateEnvironment} from '../utils/urlHandler';
import {validateUsers} from '../utils/userHandler';
import { storeOwnerRoleValidation } from '../utils/rolesHandler';
import { createExcelFileCategoryNotCreated, deleteFile } from '../utils/excelFilesCreator';
import { brandsData } from '../data/brandsData';
import { contentData } from '../data/contentData';
import { v4 as uuidv4 } from 'uuid';

const users = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.onlyContent));
const url: string = validateEnvironment();

test(`Verify that when a user creates new content in the bulk upload and the excel file contains multiple categories the exact names and quantity of the categories should be displayed in the category filter`, async ({ page }) => {
    test.setTimeout(150000);
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
    await sideBarModel.onClickContentOptionMenu();
    await common.waitUntilSpinnerDisappears();

    await contentModel.verifyDeleteButtonIsDisplayed();

    await contentModel.onClickBulkItemBtn();

    await contentModel.bulkSelectUpload(['src/images/A97.jpg'], contentModel.chooseButton);
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.uploadMedia);
    await contentModel.nextButton.click();
    await contentModel.checkBulkCurrentStep(contentData.selectDateRange);
    await contentModel.nextButton.click();
    await contentModel.bulkSelectUpload(['src/uploads/categories.xlsx'], contentModel.chooseButton);
    await contentModel.checkBulkCurrentStep(contentData.contentUpload);
    await common.waitUntilSpinnerDisappears();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.categoryManagement);
    await contentModel.categoryMessages.hover();
    await contentModel.nextButton.click();
    await common.waitUntilSpinnerDisappears();
    await contentModel.checkBulkCurrentStep(contentData.review);
    await contentModel.clickCategoryFilterButton();
    await contentModel.verifyCategoryMenuIsExpanded();
    await contentModel.countTheNumberOfCategories(4);
    await contentModel.verifyTheNameOfCategories();
  });


test(`Verify that when a user creates new content in the bulk upload and the excel file contains multiple categories and one category is mapped the exact names and quantity of the categories should be displayed in the category filter`, async ({ page }) => {
  test.setTimeout(150000);
  await page.goto(url);
  await page.setViewportSize({width: 1600, height: 3600});
  const loginModel = new LoginModel(page);
  const sideBarModel = new SidebarModel(page);
  const topBarModel = new TopBarModel(page);
  const contentModel = new ContentModel(page);
  const common = new CommonModel(page);

  const uniqueId = uuidv4();
  const title = ("Category" + uniqueId).slice(0, 30);

  await loginModel.login(users[0].username, users[0].password);
  await topBarModel.selectBrand(brandsData.onlyContent);
  await common.waitUntilSpinnerDisappears();
  await createExcelFileCategoryNotCreated('src/uploads/categories(created).xlsx', title);
  await sideBarModel.onClickContentOptionMenu();
  await common.waitUntilSpinnerDisappears();

  await contentModel.verifyDeleteButtonIsDisplayed();

  await contentModel.onClickBulkItemBtn();

  await contentModel.bulkSelectUpload(['src/images/A97.jpg'], contentModel.chooseButton);
  await common.waitUntilSpinnerDisappears();
  await contentModel.checkBulkCurrentStep(contentData.uploadMedia);
  await contentModel.nextButton.click();
  await contentModel.checkBulkCurrentStep(contentData.selectDateRange);
  await contentModel.nextButton.click();
  await contentModel.bulkSelectUpload(['src/uploads/categories(created).xlsx'], contentModel.chooseButton);
  await contentModel.checkBulkCurrentStep(contentData.contentUpload);
  await common.waitUntilSpinnerDisappears();
  await contentModel.nextButton.click();
  await common.waitUntilSpinnerDisappears();
  await contentModel.checkBulkCurrentStep(contentData.categoryManagement);
  await contentModel.clickCreateCategoryButton();
  await contentModel.nextButton.click();
  await common.waitUntilSpinnerDisappears();
  await deleteFile('src/uploads/categories(created).xlsx');
  await contentModel.checkBulkCurrentStep(contentData.review);
  await contentModel.clickCategoryFilterButton();
  await contentModel.verifyCategoryMenuIsExpanded();
  await contentModel.countTheNumberOfCategories(4);
  await contentModel.verifyTheNameOfCreatedCategories(title);
});

test(`Verify that when a user clicks only one option in the category filter only the categories with the category selected should be displayed`, async ({ page }) => {
  test.setTimeout(150000);
  await page.goto(url);
  await page.setViewportSize({width: 1600, height: 3600});
  const loginModel = new LoginModel(page);
  const sideBarModel = new SidebarModel(page);
  const topBarModel = new TopBarModel(page);
  const contentModel = new ContentModel(page);
  const common = new CommonModel(page);

  const uniqueId = uuidv4();
  const title = ("Category" + uniqueId).slice(0, 30);

  await loginModel.login(users[0].username, users[0].password);
  await topBarModel.selectBrand(brandsData.onlyContent);
  await common.waitUntilSpinnerDisappears();
  await sideBarModel.onClickContentOptionMenu();
  await common.waitUntilSpinnerDisappears();

  await contentModel.verifyDeleteButtonIsDisplayed();

  await contentModel.onClickBulkItemBtn();

  await contentModel.bulkSelectUpload(['src/images/A97.jpg'], contentModel.chooseButton);
  await common.waitUntilSpinnerDisappears();
  await contentModel.checkBulkCurrentStep(contentData.uploadMedia);
  await contentModel.nextButton.click();
  await contentModel.checkBulkCurrentStep(contentData.selectDateRange);
  await contentModel.nextButton.click();
  await contentModel.bulkSelectUpload(['src/uploads/categories.xlsx'], contentModel.chooseButton);
  await contentModel.checkBulkCurrentStep(contentData.contentUpload);
  await common.waitUntilSpinnerDisappears();
  await contentModel.nextButton.click();
  await common.waitUntilSpinnerDisappears();
  await contentModel.checkBulkCurrentStep(contentData.categoryManagement);
  await contentModel.nextButton.click();
  await common.waitUntilSpinnerDisappears();
  await contentModel.checkBulkCurrentStep(contentData.review);
  await contentModel.clickCategoryFilterButton();
  await contentModel.verifyCategoryMenuIsExpanded();
  await contentModel.countTheNumberOfCategories(4);
  await contentModel.selectOptionInCategoryFilter("Fruits");
  await contentModel.categoryFilterApplyButton.click();
  await common.waitUntilSpinnerDisappears();
  await contentModel.verifyCategoriesInTable("Fruits");
});