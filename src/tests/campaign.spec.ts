import { test } from '@playwright/test';
import { LoginModel } from '../pom/loginModel';
import {SidebarModel} from '../pom/sidebarModel';
import {TopBarModel} from '../pom/topBarModel';
import {validateEnvironment} from '../utils/urlHandler';
import {validateUsers} from '../utils/userHandler';
import { CommonModel } from '../pom/commonModel';
import { storeOwnerRoleValidation } from '../utils/rolesHandler';
import { brandsData } from '../data/brandsData';
import { CampaignModel } from '../pom/campaignModuleModel';

const users = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.brandNodeContentName));
const url: string = validateEnvironment();

  test(`Verify that all the elements in the campaign module are displayed properly when the module is loaded`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const campaignModel = new CampaignModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickCampaignsOptionMenu();
    
    await campaignModel.verifyThatTheSearchBarIsDisplayed();

    await campaignModel.verifyThatTheCampaignNameHeaderIsDisplayed();

    await campaignModel.verifyTheTextInCampaignNameHeader();

    await campaignModel.verifyTheCampaignNameHeaderNormalArrowDisplayed();

    await campaignModel.verifyTheVendorNameHeaderNormalArrowIsDisplayed();

    await campaignModel.verifyTheTextInVendorNameHeader();

    await campaignModel.verifyDateAddedHeaderIsVisisble();

    await campaignModel.verifyDateAddedHeaderNormalArrowIsVisible();

    await campaignModel.verifyTheTextInDateAddedHeader();

    await campaignModel.verifyStartDateHeaderIsVisible();

    await campaignModel.verifyStartDateLabelIsDisplayed();

    await campaignModel.verifyUploadedByHeaderIsVisible();

    await campaignModel.uploadedByHeaderNormalArrowIsVisible();

    await campaignModel.verifyUploadedByLabelIsDisplayed();
  });


  test(`Verify that the campaigns are sorted in ASC order when the Campaign Name header is clicked and the elements in the table are not sorted`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const campaignModel = new CampaignModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickCampaignsOptionMenu();

    await campaignModel.verifyThatTheCampaignNameHeaderIsDisplayed();

    await campaignModel.campaignNameHeader.click();

    await campaignModel.verifyThatTheCampaignNameHeaderAscArrowIsDisplayed();

    await campaignModel.verifyTheCampaignNameHeaderNormalArrowIsNotDisplayed();
  });


  test(`Verify that the campaigns are in DESC order when the Campaign Name header is clicked and the elements are in ASC order by the Campaign Name`, async ({ page }) => {

    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const campaignModel = new CampaignModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickCampaignsOptionMenu();

    await campaignModel.verifyThatTheCampaignNameHeaderIsDisplayed();

    await campaignModel.campaignNameHeader.click();

    await campaignModel.verifyThatTheCampaignNameHeaderAscArrowIsDisplayed();

    await campaignModel.verifyTheCampaignNameHeaderNormalArrowIsNotDisplayed();

    await campaignModel.campaignNameHeader.click();

    await campaignModel.verifyThatTheCampaignNameHeaderDescArrowIsDisplayed();
  });


  test(`Verify that the campaigns are sorted in ASC order by the Vendor Name when the Vendor Name header is clicked and the elements in the table are not sorted`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const campaignModel = new CampaignModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickCampaignsOptionMenu();

    await campaignModel.verifyTheVendorNameHeaderVisible();

    await campaignModel.vendorNameHeader.click();

    await campaignModel.verifyThatTheVendorNameHeaderAscArrowIsDisplayed();

    await campaignModel.verifyTheVendorNameHeaderNormalArrowIsNotDisplayed();
  });


  test(`Verify that the campaigns are in DESC order when the Vendor Name header is clicked and the elements are in ASC order by the Vendor Name header`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const campaignModel = new CampaignModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickCampaignsOptionMenu();

    await campaignModel.verifyTheVendorNameHeaderVisible();

    await campaignModel.vendorNameHeader.click();

    await campaignModel.verifyThatTheVendorNameHeaderAscArrowIsDisplayed();

    await campaignModel.verifyTheVendorNameHeaderNormalArrowIsNotDisplayed();

    await campaignModel.vendorNameHeader.click();

    await campaignModel.verifyThatTheVendorNameHeaderDescArrowIsDisplayed();
  });


  test(`Verify that the campaigns are sorted in ASC order by the Date Added when the Date Added header is clicked and the elements in the table are not sorted`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const campaignModel = new CampaignModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickCampaignsOptionMenu();

    await campaignModel.verifyDateAddedHeaderIsVisisble();

    await campaignModel.dateAddedHeader.click();

    await campaignModel.verifyThatTheDateAddedHeaderAscArrowIsDisplayed();

    await campaignModel.verifyTheDateAddedHeaderNormalArrowIsNotDisplayed();
  });


  test(`Verify that the campaigns are in DESC order when the Date Added header is clicked and the elements are in ASC order by the Date Added header`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const campaignModel = new CampaignModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickCampaignsOptionMenu();

    await campaignModel.verifyDateAddedHeaderIsVisisble();

    await campaignModel.dateAddedHeader.click();

    await campaignModel.verifyThatTheDateAddedHeaderAscArrowIsDisplayed();

    await campaignModel.verifyTheDateAddedHeaderNormalArrowIsNotDisplayed();

    await campaignModel.dateAddedHeader.click();

    await campaignModel.verifyThatThedateAddedHeaderDescArrowIsDisplayed();
  });


  test(`Verify that the campaigns are sorted in ASC order by the Start Date when the Start Date header is clicked and the elements in the table are not sorted`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const campaignModel = new CampaignModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickCampaignsOptionMenu();

    await campaignModel.verifyStartDateHeaderIsVisible();

    await campaignModel.startDateHeader.click();

    await campaignModel.verifyThatTheStartDateHeaderAscArrowIsDisplayed();

    await campaignModel.verifyTheStartDateHeaderNormalArrowIsNotDisplayed();
  });


  test(`Verify that the campaigns are in DESC order when the Start Date header is clicked and the elements are in ASC order by the Start Date header`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const campaignModel = new CampaignModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickCampaignsOptionMenu();

    await campaignModel.verifyStartDateHeaderIsVisible();

    await campaignModel.startDateHeader.click();

    await campaignModel.verifyThatTheStartDateHeaderAscArrowIsDisplayed();

    await campaignModel.verifyTheStartDateHeaderNormalArrowIsNotDisplayed();

    await campaignModel.startDateHeader.click();

    await campaignModel.verifyThatTheStartDateHeaderDescArrowIsDisplayed();
  });


  test(`Verify that the campaigns are sorted in ASC order by the Uploaded by when the Uploaded by header is clicked and the elements in the table are not sorted`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const campaignModel = new CampaignModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickCampaignsOptionMenu();

    await campaignModel.verifyUploadedByHeaderIsVisible();

    await campaignModel.uploadedByHeader.click();

    await campaignModel.verifyThatTheUploadByHeaderAscArrowIsDisplayed();

    await campaignModel.verifyTheUploadedByHeaderNormalArrowIsNotDisplayed();
  });


  test(`Verify that the campaigns are in DESC order when the Uploaded by header is clicked and the elements are in ASC order by the Uploaded by header`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const campaignModel = new CampaignModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickCampaignsOptionMenu();

    await campaignModel.verifyUploadedByHeaderIsVisible();

    await campaignModel.uploadedByHeader.click();

    await campaignModel.verifyThatTheUploadByHeaderAscArrowIsDisplayed();

    await campaignModel.verifyTheUploadedByHeaderNormalArrowIsNotDisplayed();

    await campaignModel.uploadedByHeader.click();

    await campaignModel.verifyThatTheUploadedByHeaderDescArrowIsDisplayed();
  });


  test(`Verify that when the Download Content header is clicked nothing happens`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const campaignModel = new CampaignModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickCampaignsOptionMenu();

    await campaignModel.verifyThatTheDownloadContentHeaderIsDisplayed();

    await campaignModel.downloadContentHeader.click();

    await campaignModel.verifyThatTheCampaignNameHeaderIsDisplayed();

    await campaignModel.verifyTheCampaignNameHeaderNormalArrowDisplayed();

    await campaignModel.verifyTheVendorNameHeaderVisible();

    await campaignModel.verifyTheVendorNameHeaderNormalArrowIsDisplayed();

    await campaignModel.verifyDateAddedHeaderIsVisisble();

    await campaignModel.verifyDateAddedHeaderNormalArrowIsVisible();

    await campaignModel.verifyStartDateHeaderIsVisible();

    await campaignModel.verifyStartDateHeaderNormalArrowIsVisible();

    await campaignModel.verifyUploadedByHeaderIsVisible();

    await campaignModel.verifyTheUploadedByHeaderNormalArrowIsDisplayed();

    await campaignModel.verifyThatTheDownloadContentHeaderIsDisplayed();
  });


  test(`Verify that when the Download working files header is clicked nothing happens`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const campaignModel = new CampaignModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickCampaignsOptionMenu();

    await campaignModel.verifyTheDownloadWorkingFilesHeaderIsDisplayed();

    await campaignModel.downloadWorkingFilesHeader.click();

    await campaignModel.verifyThatTheCampaignNameHeaderIsDisplayed();

    await campaignModel.verifyTheCampaignNameHeaderNormalArrowDisplayed();

    await campaignModel.verifyTheVendorNameHeaderVisible();

    await campaignModel.verifyTheVendorNameHeaderNormalArrowIsDisplayed();

    await campaignModel.verifyDateAddedHeaderIsVisisble();

    await campaignModel.verifyDateAddedHeaderNormalArrowIsVisible();

    await campaignModel.verifyStartDateHeaderIsVisible();

    await campaignModel.verifyStartDateHeaderNormalArrowIsVisible();

    await campaignModel.verifyUploadedByHeaderIsVisible();

    await campaignModel.verifyTheUploadedByHeaderNormalArrowIsDisplayed();

    await campaignModel.verifyThatTheDownloadContentHeaderIsDisplayed();
  });


  test(`Verify that when a row is clicked the campaign modal is displayed`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const campaignModel = new CampaignModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickCampaignsOptionMenu();

    await campaignModel.verifyThatTheCampaignTableIsDisplayed();

    await campaignModel.campaignTable.locator('tr').nth(1).click();

    await campaignModel.verifyThatTheCampaignModalIsDisplayed();
  });


  test(`Verify that the campaigns are filtered using the search campaigns bar`, async ({ page }) => {
    await page.goto(url);
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);
    const campaignModel = new CampaignModel(page);

    await loginModel.login(users[0].username, users[0].password);
    await topBarModel.selectBrand(brandsData.brandNodeContentName);
    await commonModel.waitUntilSpinnerDisappears();
    await sideBarModel.onClickCampaignsOptionMenu();

    await campaignModel.verifyThatTheSearchBarIsDisplayed();

    await campaignModel.searchBar.pressSequentially("this is a campaign");

    await campaignModel.rowsQuantity(1);
  });
