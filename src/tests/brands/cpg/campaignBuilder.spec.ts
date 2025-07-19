import { test, expect} from '@playwright/test';

import { storeOwnerRoleValidation } from '../../../utils/rolesHandler';
import { validateUsers } from '../../../utils/userHandler';
import { brandsData } from '../../../data/brandsData';
import { RolesEnum as Roles } from '../../../enums/roles.enum';

import { LoginModel } from '../../../pom/loginModel';
import {SidebarModel} from '../../../pom/sidebarModel';
import {validateEnvironment} from '../../../utils/urlHandler';
import { CommonModel } from '../../../pom/commonModel';
import { CampaignBuilderModel } from '../../../pom/campaignBuilderModel';
import {v4 as uuidv4} from 'uuid';

const url: string = validateEnvironment();
const users = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.brandNodeContentName));

test(`Verify that the super admin user has access to the Campaign builder module`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 1600});
  
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);
    const campaignBuilderModel = new CampaignBuilderModel(page);
    
    const credentials = users.find(e => e.role === Roles.superAdmin);
    await loginModel.login(credentials!.username, credentials!.password);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.clickCampaingBuilderOption();
    
    await expect( async () => {
        await expect(campaignBuilderModel.nodeImage).toBeVisible( {timeout:300} );
        await expect(campaignBuilderModel.changeLocationButton).toBeVisible( {timeout:300} );
        await expect(campaignBuilderModel.campaignBlockManagerHeader).toBeVisible(  {timeout:300} );
        await expect(campaignBuilderModel.newCampaignButton).toBeVisible(  {timeout:300} );
        await expect(campaignBuilderModel.campaignUtilitySideMenu).toBeVisible(  {timeout:300} );
    }).toPass();

    await expect( async () => {
        await campaignBuilderModel.campaignUtilitySideMenu.click();
    }).toPass();
    
    await expect(campaignBuilderModel.campaignEditorLabel).toBeVisible(  {timeout:300} );
    await expect(campaignBuilderModel.campaignTitleAccordeon).toBeVisible(  {timeout:300} );
    await expect(campaignBuilderModel.dateRangeAccordeon).toBeVisible(  {timeout:300} );
    await expect(campaignBuilderModel.dateRangeAccordeon).toBeVisible(  {timeout:300} );
    await expect(campaignBuilderModel.mappingAccordeon).toBeVisible(  {timeout:300} );
    await expect(campaignBuilderModel.oppmAccordeon).toBeVisible(  {timeout:300} );
    await expect(campaignBuilderModel.approvalAccordeon).toBeVisible(  {timeout:300} );
});

test(`Verify that the admin user has access to the Campaign builder module`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 1600});
    
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);
    const campaignBuilderModel = new CampaignBuilderModel(page);
  
    const credentials = users.find(e => e.role === Roles.superAdmin);
    await loginModel.login(credentials!.username, credentials!.password);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.clickCampaingBuilderOption();
    
    await expect( async () => {
        await expect(campaignBuilderModel.nodeImage).toBeVisible( {timeout:300} );
        await expect(campaignBuilderModel.changeLocationButton).toBeVisible( {timeout:300} );
        await expect(campaignBuilderModel.campaignBlockManagerHeader).toBeVisible(  {timeout:300} );
        await expect(campaignBuilderModel.newCampaignButton).toBeVisible(  {timeout:300} );
        await expect(campaignBuilderModel.campaignUtilitySideMenu).toBeVisible(  {timeout:300} );
    }).toPass();

    await expect( async () => {
        await campaignBuilderModel.campaignUtilitySideMenu.click();
    }).toPass();
    
    await expect(campaignBuilderModel.campaignEditorLabel).toBeVisible(  {timeout:300} );
    await expect(campaignBuilderModel.campaignTitleAccordeon).toBeVisible(  {timeout:300} );
    await expect(campaignBuilderModel.dateRangeAccordeon).toBeVisible(  {timeout:300} );
    await expect(campaignBuilderModel.dateRangeAccordeon).toBeVisible(  {timeout:300} );
    await expect(campaignBuilderModel.mappingAccordeon).toBeVisible(  {timeout:300} );
    await expect(campaignBuilderModel.oppmAccordeon).toBeVisible(  {timeout:300} );
    await expect(campaignBuilderModel.approvalAccordeon).toBeVisible(  {timeout:300} );
});

test(`Verify that the store owner user has not access to the Campaign builder module`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 1600});
    
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);
  
    const credentials = users.find(e => e.role === Roles.storeOwner);
    await loginModel.login(credentials!.username, credentials!.password);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.mainWrapper.click();

    await expect( async () => {
        await expect(sideBarModel.campaignBuilderOption).not.toBeVisible();
    }).toPass();
    
});

test(`Verify that the search field in the change location section should filter the created campaigns when is filled with a valid campaign name`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 1600});
  
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);
    const campaignBuilderModel = new CampaignBuilderModel(page);
    
    const credentials = users.find(e => e.role === Roles.superAdmin);
    await loginModel.login(credentials!.username, credentials!.password);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.clickCampaingBuilderOption();
    
    await expect( async () => {
        await campaignBuilderModel.changeLocationButton.click();
    }).toPass();

    await campaignBuilderModel.searchBar.fill('test');

    await expect( async () => {
        await expect(page.getByRole('cell', { name: 'test', exact: true})).toBeVisible( {timeout:300} );
        await expect(page.getByRole('cell', { name: 'test2', exact: true})).toBeVisible( {timeout:300} );
    }).toPass();
    
});

test(`Verify that the search field in the change location section should filter the created campaigns when is filled with an invalid campaign name`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 1600});
  
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);
    const campaignBuilderModel = new CampaignBuilderModel(page);
  
    const credentials = users.find(e => e.role === Roles.superAdmin);
    await loginModel.login(credentials!.username, credentials!.password);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.campaignBuilderOption.click();
    
    await expect( async () => {
        await campaignBuilderModel.changeLocationButton.click();
    }).toPass();

    await campaignBuilderModel.searchBar.fill('invalid');
    
    await expect( async () => {
        await expect(page.getByRole('row', { name: 'CPG Brand' }).getByRole('cell')).not.toBeVisible();
    }).toPass();
});

test(`Verify that when a CPG node is inactive the CPG Node is nos displayed in the change location list`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 1600});
  
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);
    const campaignBuilderModel = new CampaignBuilderModel(page);
    
    const credentials = users.find(e => e.role === Roles.superAdmin);
    await loginModel.login(credentials!.username, credentials!.password);
    await commonModel.waitUntilSpinnerDisappears();

    await sideBarModel.campaignBuilderOption.click();

    await expect( async () => {
        await campaignBuilderModel.changeLocationButton.click();
    }).toPass();

    await campaignBuilderModel.searchBar.fill('test3');

    await expect( async () => {
        await expect(page.getByRole('row', { name: 'CPG Brand' }).getByRole('cell')).not.toBeVisible();
    }).toPass();
});

test(`Verify that the super Admin can add a new campaign block in the Campaign Builder module`, async ({ page }) => {

    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 1600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);
    const campaignBuilderModel = new CampaignBuilderModel(page);

    const credentials = users.find(e => e.role === Roles.superAdmin);
    await loginModel.login(credentials!.username, credentials!.password);
    await commonModel.waitUntilSpinnerDisappears();

    await expect( async () => {
        await expect(campaignBuilderModel.nodeSelector).toBeVisible( {timeout: 300} );
    }).toPass();

    await sideBarModel.campaignBuilderOption.click();

    const uniqueId = uuidv4();

    const campaignName = ("Page" + uniqueId).slice(0, 30);

    await expect( async () => {
        await campaignBuilderModel.changeLocationButton.click();
    }).toPass();

    await campaignBuilderModel.searchBar.click( {delay: 500} );
    await campaignBuilderModel.searchBar.fill('test2');

    await page.getByRole('cell', { name: 'test2' }).click();

    await campaignBuilderModel.newCampaignButton.click();

    await expect( async () => {
        await expect(campaignBuilderModel.campaignTitleIndicator).toBeVisible( {timeout: 300} );
    }).toPass();

    await campaignBuilderModel.campaignTitle.click( {delay: 500} );
    await campaignBuilderModel.campaignTitle.pressSequentially(campaignName);

    await expect( async () => {
        await expect(campaignBuilderModel.campaignTitleIndicator).not.toBeVisible( {timeout: 300} );
        await expect(campaignBuilderModel.campaignTitleIndicatorDirty).toBeVisible( {timeout: 300} );
    }).toPass();

    await campaignBuilderModel.dateRangeAccordeon.click();
    let startDate = await campaignBuilderModel.insertActualDate();
    let endDate = await campaignBuilderModel.insertEndDate(1, "month");

    await campaignBuilderModel.verifyThatTheCampaignIsCreated(campaignName, startDate, endDate);
    await campaignBuilderModel.deleteCampaign(campaignName);
});

test(`Verify that the super Admin can edit the campaign title in the Campaign Builder module`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 1600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);
    const campaignBuilderModel = new CampaignBuilderModel(page);

    const credentials = users.find(e => e.role === Roles.superAdmin);
    await loginModel.login(credentials!.username, credentials!.password);
    await commonModel.waitUntilSpinnerDisappears();

    await expect( async () => {
        await expect(campaignBuilderModel.nodeSelector).toBeVisible( {timeout: 300} );
    }).toPass();

    await sideBarModel.campaignBuilderOption.click();

    const uniqueId = uuidv4();

    const campaignName = ("Page" + uniqueId).slice(0, 30);

    await expect( async () => {
        await campaignBuilderModel.changeLocationButton.click();
    }).toPass();

    await campaignBuilderModel.searchBar.click( {delay: 500} );
    await campaignBuilderModel.searchBar.fill('test2');

    await page.getByRole('cell', { name: 'test2' }).click();

    await campaignBuilderModel.newCampaignButton.click();

    await expect( async () => {
        await expect(campaignBuilderModel.campaignTitleIndicator).toBeVisible( {timeout: 300} );
    }).toPass();

    await campaignBuilderModel.campaignTitle.click( {delay: 500} );
    await campaignBuilderModel.campaignTitle.pressSequentially(campaignName);

    await expect( async () => {
        await expect(campaignBuilderModel.campaignTitleIndicator).not.toBeVisible( {timeout: 300} );
        await expect(campaignBuilderModel.campaignTitleIndicatorDirty).toBeVisible( {timeout: 300} );
    }).toPass();

    await campaignBuilderModel.dateRangeAccordeon.click();
    let startDate = await campaignBuilderModel.insertActualDate();
    let endDate = await campaignBuilderModel.insertEndDate(1, "month");

    await campaignBuilderModel.verifyThatTheCampaignIsCreated(campaignName, startDate, endDate);

    const uniqueId2 = uuidv4();

    const campaignName2 = ("Page" + uniqueId2).slice(0, 30);
    await campaignBuilderModel.campaignTitle.click( {delay: 500} );
    await campaignBuilderModel.campaignTitle.clear();
    await campaignBuilderModel.campaignTitle.pressSequentially(campaignName2);
    await campaignBuilderModel.campaignEditorLabel.click();
    await campaignBuilderModel.campaignEditorLabel.click();

    await campaignBuilderModel.verifyThatTheCampaignIsCreated(campaignName2, startDate, endDate);
    await campaignBuilderModel.deleteCampaign(campaignName2);
});


test(`Verify that the super Admin can edit the start date with a valid start date that is not beyond the end date`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 1600});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const commonModel = new CommonModel(page);
    const campaignBuilderModel = new CampaignBuilderModel(page);

    const credentials = users.find(e => e.role === Roles.superAdmin);
    await loginModel.login(credentials!.username, credentials!.password);
    await commonModel.waitUntilSpinnerDisappears();

    await expect( async () => {
        await expect(campaignBuilderModel.nodeSelector).toBeVisible( {timeout: 300} );
    }).toPass();

    await sideBarModel.campaignBuilderOption.click();

    const uniqueId = uuidv4();

    const campaignName = ("Page" + uniqueId).slice(0, 30);

    await expect( async () => {
        await campaignBuilderModel.changeLocationButton.click();
    }).toPass();

    await campaignBuilderModel.searchBar.click( {delay: 500} );
    await campaignBuilderModel.searchBar.fill('test2');

    await page.getByRole('cell', { name: 'test2' }).click();

    await campaignBuilderModel.newCampaignButton.click();

    await expect( async () => {
        await expect(campaignBuilderModel.campaignTitleIndicator).toBeVisible( {timeout: 300} );
    }).toPass();

    await campaignBuilderModel.campaignTitle.click( {delay: 500} );
    await campaignBuilderModel.campaignTitle.pressSequentially(campaignName);

    await expect( async () => {
        await expect(campaignBuilderModel.campaignTitleIndicator).not.toBeVisible( {timeout: 300} );
        await expect(campaignBuilderModel.campaignTitleIndicatorDirty).toBeVisible( {timeout: 300} );
    }).toPass();

    await campaignBuilderModel.dateRangeAccordeon.click();
    let startDate = await campaignBuilderModel.insertActualDate();
    let endDate = await campaignBuilderModel.insertEndDate(1, "month");

    await campaignBuilderModel.verifyThatTheCampaignIsCreated(campaignName, startDate, endDate);

    let newStartDate = await campaignBuilderModel.modifyStartDate(startDate, 1, 'day');
    let newEndDate = await campaignBuilderModel.modifyEndDate(endDate, 1, 'day');
    await campaignBuilderModel.campaignEditorLabel.click();
    await campaignBuilderModel.campaignEditorLabel.click();

    await campaignBuilderModel.verifyThatTheCampaignIsCreatedFuture(campaignName, newStartDate, newEndDate);
    await campaignBuilderModel.deleteCampaign(campaignName);
});