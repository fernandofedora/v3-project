import { test, expect } from '@playwright/test';
import { LoginModel } from '../pom/loginModel';
import {SidebarModel} from '../pom/sidebarModel';
import {TopBarModel} from '../pom/topBarModel';
import {validateEnvironment} from '../utils/urlHandler';
import {validateUsers } from '../utils/userHandler';
import { CommonModel } from '../pom/commonModel';
import { rolesData } from '../data/usersData';
import { storeOwnerRoleValidation } from '../utils/rolesHandler';
import { brandsData } from '../data/brandsData';
import { sidebarData } from '../data/sideBarData';

const users = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.brandNodeName));
const url: string = validateEnvironment();

/**
 * Before running this script
 * You must create the following nodes
 * Brand: newBrand
 * SubBrand: NewSubBrand
 * Store (Brand Child): newStoreBrand
 * Store (SubBrand Child): newStoreSubBrand
 */

users.forEach(user =>{

  test(`Verify that when the option of the menu is selected it goes to the page required for the selected Brand '${user.role}'`, async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({width: 1600, height: 2000});
    const loginModel = new LoginModel(page);
    const sideBarModel = new SidebarModel(page);
    const topBarModel = new TopBarModel(page);
    const commonModel = new CommonModel(page);

    test.setTimeout(180000);
    await loginModel.login(user.username, user.password);
    if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { await topBarModel.selectBrand(brandsData.brandNodeName); }
    const allStores = 'All Stores';
    await page.waitForTimeout(3000);
    let brand = await topBarModel.selectBrandButton.locator('div div').innerText();
    let node = await topBarModel.nodeTitle.innerText();

    if(user.role == rolesData.superAdmin){
        //Verify that the Dashboard menu option is selected
        await sideBarModel.onClickDashboardOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        expect(node).toEqual(allStores);
        await commonModel.verifyThePageDetailTitle(sidebarData.dashboard);

        //Verify that the Brands menu option is selected
        await sideBarModel.onClickBrandOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        expect(node).toEqual(allStores);
        await commonModel.verifyThePageDetailTitle(sidebarData.brands);

        //Verify that the Users menu option is selected
        await sideBarModel.onClickUsersOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        expect(node).toEqual(allStores);
        await commonModel.verifyThePageDetailTitle(sidebarData.users);

        //Verify that the CardStyles menu option is selected
        await sideBarModel.onClickCardStylesOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        expect(node).toEqual(allStores);
        await commonModel.verifyThePageDetailTitle(sidebarData.cardStyles);

        //Verify that the Campaigns menu option is selected
        await sideBarModel.onClickCampaignsOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        expect(node).toEqual(allStores);
        await commonModel.verifyThePageDetailTitle(sidebarData.campaign);

    //Verify that the categories menu option is selected
    await sideBarModel.onClickCategoriesOptionMenu();
    expect(brand).toEqual(brandsData.brandNodeName);
    expect(node).toEqual(allStores);
    await commonModel.verifyThePageDetailTitle(sidebarData.categories);

    //Verify that the content menu option is selected
    await sideBarModel.onClickContentOptionMenu();
    expect(brand).toEqual(brandsData.brandNodeName);
    expect(node).toEqual(allStores);
    await commonModel.verifyThePageDetailTitle(sidebarData.content);

    //Verify that the schedules menu option is selected
    await sideBarModel.onClickSchedulesOptionMenu();
    expect(brand).toEqual(brandsData.brandNodeName);
    expect(node).toEqual(allStores);
    await commonModel.verifyThePageDetailTitle(sidebarData.schedules);

    //Verify that the recipes menu option is selected
    await sideBarModel.onClickRecipesOptionMenu();
    expect(brand).toEqual(brandsData.brandNodeName);
    expect(node).toEqual(allStores);
    await commonModel.verifyThePageDetailTitle(sidebarData.recipes);

    //Verify that the media menu option is selected
    await sideBarModel.onClickMediaOptionMenu();
    expect(brand).toEqual(brandsData.brandNodeName);
    expect(node).toEqual(allStores);
    await commonModel.verifyThePageDetailTitle(sidebarData.media);

    //Verify that the pages menu option is selected
    await sideBarModel.onClickPageOptionMenu();
    expect(brand).toEqual(brandsData.brandNodeName);
    expect(node).toEqual(allStores);
    await commonModel.verifyThePageDetailTitle(sidebarData.pages);

    //Verify that the imported content menu option is selected
    await sideBarModel.onClickImportedContentOptionMenu();
    expect(brand).toEqual(brandsData.brandNodeName);
    expect(node).toEqual(allStores);
    await commonModel.verifyThePageDetailTitle(sidebarData.importedContent);

    //Verify that the store groups menu option is selected
    await sideBarModel.onClickStoreGroupsOptionMenu();
    expect(brand).toEqual(brandsData.brandNodeName);
    expect(node).toEqual(allStores);
    await commonModel.verifyThePageDetailTitle(sidebarData.storeGroups);

    } else if(user.role == rolesData.admin){
        //Click to open Side menu
        await sideBarModel.onClickMenuOption();

        //Verify that the Dashboard menu option is displayed
        let dashboardOptionExists = await sideBarModel.dashboardOption.isVisible();
        expect(dashboardOptionExists).toBeTruthy();

        //Verify that the Brands menu option is not displayed
        let brandsOptionExists = await sideBarModel.brandsOption.isVisible();
        expect(brandsOptionExists).toBeFalsy();

        //Verify that the Users menu option is not displayed
        let usersOptionExists = await sideBarModel.usersOption.isVisible();
        expect(usersOptionExists).toBeFalsy();

        //Verify that the CardStyles menu option is not displayed
        let cardStylesOptionExists = await sideBarModel.cardStylesOption.isVisible();
        expect(cardStylesOptionExists).toBeFalsy();

        await sideBarModel.onClickMenuOption();

        //Verify that the Campaigns menu option is selected
        await sideBarModel.onClickCampaignsOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        expect(node).toEqual(allStores);
        await commonModel.verifyThePageDetailTitle(sidebarData.campaign);

        //Verify that the categories menu option is selected
        await sideBarModel.onClickCategoriesOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        expect(node).toEqual(allStores);
        await commonModel.verifyThePageDetailTitle(sidebarData.categories);

        //Verify that the content menu option is selected
        await sideBarModel.onClickContentOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        expect(node).toEqual(allStores);
        await commonModel.verifyThePageDetailTitle(sidebarData.content);

        //Verify that the schedules menu option is selected
        await sideBarModel.onClickSchedulesOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        expect(node).toEqual(allStores);
        await commonModel.verifyThePageDetailTitle(sidebarData.schedules);

        //Verify that the recipes menu option is selected
        await sideBarModel.onClickRecipesOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        expect(node).toEqual(allStores);
        await commonModel.verifyThePageDetailTitle(sidebarData.recipes);

        //Verify that the media menu option is selected
        await sideBarModel.onClickMediaOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        expect(node).toEqual(allStores);
        await commonModel.verifyThePageDetailTitle(sidebarData.media);

        //Verify that the pages menu option is selected
        await sideBarModel.onClickPageOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        expect(node).toEqual(allStores);
        await commonModel.verifyThePageDetailTitle(sidebarData.pages);

        //Verify that the imported content menu option is selected
        await sideBarModel.onClickImportedContentOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        expect(node).toEqual(allStores);
        await commonModel.verifyThePageDetailTitle(sidebarData.importedContent);

        //Verify that the store groups menu option is selected
        await sideBarModel.onClickStoreGroupsOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        expect(node).toEqual(allStores);
        await commonModel.verifyThePageDetailTitle(sidebarData.storeGroups);

    } else if(user.role == rolesData.storeOwner){
        await commonModel.waitAddContentButtonAppears();
        let brandSelected = brandsData.brandNodeName;

        expect(brand).toEqual(brandSelected);
        expect(node).not.toEqual(allStores);

        //Verify that the categories menu option is selected
        await sideBarModel.onClickCategoriesOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        expect(node).not.toEqual(allStores);
        await commonModel.verifyThePageDetailTitle(sidebarData.categories);

        //Verify that the categories menu option is selected
        await sideBarModel.onClickCategoriesOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        expect(node).not.toEqual(allStores);
        await commonModel.verifyThePageDetailTitle(sidebarData.categories);

        //Verify that the content menu option is selected
        await sideBarModel.onClickContentOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        expect(node).not.toEqual(allStores);
        await commonModel.verifyThePageDetailTitle(sidebarData.content);

        //Verify that the schedules menu option is selected
        await sideBarModel.onClickSchedulesOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        expect(node).not.toEqual(allStores);
        await commonModel.verifyThePageDetailTitle(sidebarData.schedules);

        //Verify that the recipes menu option is selected
        await sideBarModel.onClickRecipesOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        expect(node).not.toEqual(allStores);
        await commonModel.verifyThePageDetailTitle(sidebarData.recipes);

        //Verify that the media menu option is selected
        await sideBarModel.onClickMediaOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        expect(node).not.toEqual(allStores);
        await commonModel.verifyThePageDetailTitle(sidebarData.media);

        //Verify that the pages menu option is selected
        await sideBarModel.onClickPageOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        expect(node).not.toEqual(allStores);
        await commonModel.verifyThePageDetailTitle(sidebarData.pages);

        //Verify that the imported content menu option is selected
        await sideBarModel.onClickImportedContentOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        expect(node).not.toEqual(allStores);
        await commonModel.verifyThePageDetailTitle(sidebarData.importedContent);

    }

  });


    test(`Navigate the menu at the SubBrand level '${user.role}'`, async ({ page }) => {
        //await page.setViewportSize({width: 1600, height: 2000});
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);

        test.setTimeout(180000);
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
            await topBarModel.selectBrand(brandsData.brandNodeName);
            await commonModel.waitUntilSpinnerDisappears();
            await topBarModel.selectNodeBrandChild(brandsData.subBrandName, brandsData.subBrand);
            await commonModel.waitUntilSpinnerDisappears();
        }
        const allStores = 'All Stores';
        let brand = await topBarModel.selectBrandButton.locator('div div').innerText();
        let node = await topBarModel.nodeTitle.innerText();

        if(user.role == rolesData.superAdmin){
            //Verify that the Dashboard menu option is selected
            await sideBarModel.onClickDashboardOptionMenu();
            expect(brand).toEqual(brandsData.brandNodeName);
            expect(node).toEqual(brandsData.subBrandName);
            await commonModel.verifyThePageDetailTitle(sidebarData.dashboard);

            //Verify that the Brands menu option is selected
            await sideBarModel.onClickBrandOptionMenu();
            expect(brand).toEqual(brandsData.brandNodeName);
            expect(node).toEqual(brandsData.subBrandName);
            await commonModel.verifyThePageDetailTitle(sidebarData.brands);

            //Verify that the Users menu option is selected
            await sideBarModel.onClickUsersOptionMenu();
            expect(brand).toEqual(brandsData.brandNodeName);
            expect(node).toEqual(brandsData.subBrandName);
            await commonModel.verifyThePageDetailTitle(sidebarData.users);

            //Verify that the CardStyles menu option is selected
            await sideBarModel.onClickCardStylesOptionMenu();
            expect(brand).toEqual(brandsData.brandNodeName);
            expect(node).toEqual(brandsData.subBrandName);
            await commonModel.verifyThePageDetailTitle(sidebarData.cardStyles);

            //Verify that the Campaigns menu option is selected
            await sideBarModel.onClickCampaignsOptionMenu();
            expect(brand).toEqual(brandsData.brandNodeName);
            expect(node).toEqual(brandsData.subBrandName);
            await commonModel.verifyThePageDetailTitle(sidebarData.campaign);
        } else if(user.role == rolesData.admin){
            //Click to open Side menu
            await sideBarModel.onClickMenuOption();

            //Verify that the Dashboard menu option is not displayed
            let dashboardOptionExists = await sideBarModel.dashboardOption.isVisible();
            expect(dashboardOptionExists).toBeTruthy();

            //Verify that the Brands menu option is not displayed
            let brandsOptionExists = await sideBarModel.brandsOption.isVisible();
            expect(brandsOptionExists).toBeFalsy();

            //Verify that the Users menu option is not displayed
            let usersOptionExists = await sideBarModel.usersOption.isVisible();
            expect(usersOptionExists).toBeFalsy();

            //Verify that the CardStyles menu option is not displayed
            let cardStylesOptionExists = await sideBarModel.cardStylesOption.isVisible();
            expect(cardStylesOptionExists).toBeFalsy();

            await sideBarModel.onClickMenuOption();

            //Verify that the Campaigns menu option is selected
            await sideBarModel.onClickCampaignsOptionMenu();
            expect(brand).toEqual(brandsData.brandNodeName);
            expect(node).toEqual(brandsData.subBrandName);
            await commonModel.verifyThePageDetailTitle(sidebarData.campaign);

        } else if(user.role == rolesData.storeOwner){
            await commonModel.waitAddContentButtonAppears();

            expect(node).toEqual(brandsData.storeBrandName);
            
        }

        //Verify that the categories menu option is selected
        await sideBarModel.onClickCategoriesOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin){
            expect(node).toEqual(brandsData.subBrandName);
        }else{
            expect(node).not.toEqual("All Stores");
        }
        await commonModel.verifyThePageDetailTitle(sidebarData.categories);

        //Verify that the content menu option is selected
        await sideBarModel.onClickContentOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin){
            expect(node).toEqual(brandsData.subBrandName);
        }else{
            expect(node).not.toEqual("All Stores");
        }
        await commonModel.verifyThePageDetailTitle(sidebarData.content);

        //Verify that the schedules menu option is selected
        await sideBarModel.onClickSchedulesOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin){
            expect(node).toEqual(brandsData.subBrandName);
        }else{
            expect(node).not.toEqual("All Stores");
        }
        await commonModel.verifyThePageDetailTitle(sidebarData.schedules);

        //Verify that the recipes menu option is selected
        await sideBarModel.onClickRecipesOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin){
            expect(node).toEqual(brandsData.subBrandName);
        }else{
            expect(node).not.toEqual("All Stores");
        }
        await commonModel.verifyThePageDetailTitle(sidebarData.recipes);

        //Verify that the media menu option is selected
        await sideBarModel.onClickMediaOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin){
            expect(node).toEqual(brandsData.subBrandName);
        }else{
            expect(node).not.toEqual("All Stores");
        }
        await commonModel.verifyThePageDetailTitle(sidebarData.media);

        //Verify that the pages menu option is selected
        await sideBarModel.onClickPageOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin){
            expect(node).toEqual(brandsData.subBrandName);
        }else{
            expect(node).not.toEqual("All Stores");
        }
        await commonModel.verifyThePageDetailTitle(sidebarData.pages);

        //Verify that the imported content menu option is selected
        await sideBarModel.onClickImportedContentOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin){
            expect(node).toEqual(brandsData.subBrandName);
        }else{
            expect(node).not.toEqual("All Stores");
        }
        await commonModel.verifyThePageDetailTitle(sidebarData.importedContent);

        //Verify that the store groups menu option is selected
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin){
            await sideBarModel.onClickStoreGroupsOptionMenu();
        }
        expect(brand).toEqual(brandsData.brandNodeName);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin){
            expect(node).toEqual(brandsData.subBrandName);
        }else{
            expect(node).not.toEqual("All Stores");
        }
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin){
            await commonModel.verifyThePageDetailTitle(sidebarData.storeGroups);
        }
    });

    test(`Navigate on the menu at Store level '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);

        test.setTimeout(180000);
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
            await topBarModel.selectBrand(brandsData.brandNodeName);
            await commonModel.waitUntilSpinnerDisappears();
            await topBarModel.selectNodeBrandChild(brandsData.storeBrandName, brandsData.store);
            await commonModel.waitUntilSpinnerDisappears();
        }
        const allStores = 'All Stores';
        let brand = await topBarModel.selectBrandButton.locator('div div').innerText();
        let node = await topBarModel.nodeTitle.innerText();

        if(user.role == rolesData.superAdmin){
            //Verify that the Dashboard menu option is selected
            await sideBarModel.onClickDashboardOptionMenu();
            expect(brand).toEqual(brandsData.brandNodeName);
            expect(node).toEqual(brandsData.storeBrandName);
            await commonModel.verifyThePageDetailTitle(sidebarData.dashboard);

            //Verify that the Brands menu option is selected
            await sideBarModel.onClickBrandOptionMenu();
            expect(brand).toEqual(brandsData.brandNodeName);
            expect(node).toEqual(brandsData.storeBrandName);
            await commonModel.verifyThePageDetailTitle(sidebarData.brands);

            //Verify that the Users menu option is selected
            await sideBarModel.onClickUsersOptionMenu();
            expect(brand).toEqual(brandsData.brandNodeName);
            expect(node).toEqual(brandsData.storeBrandName);
            await commonModel.verifyThePageDetailTitle(sidebarData.users);

            //Verify that the CardStyles menu option is selected
            await sideBarModel.onClickCardStylesOptionMenu();
            expect(brand).toEqual(brandsData.brandNodeName);
            expect(node).toEqual(brandsData.storeBrandName);
            await commonModel.verifyThePageDetailTitle(sidebarData.cardStyles);

            //Verify that the Campaigns menu option is selected
            await sideBarModel.onClickCampaignsOptionMenu();
            expect(brand).toEqual(brandsData.brandNodeName);
            expect(node).toEqual(brandsData.storeBrandName);
            await commonModel.verifyThePageDetailTitle(sidebarData.campaign);
        } else if(user.role == rolesData.admin){
            //Click to open Side menu
            await sideBarModel.onClickMenuOption();

            //Verify that the Dashboard menu option is not displayed
            let dashboardOptionExists = await sideBarModel.dashboardOption.isVisible();
            expect(dashboardOptionExists).toBeTruthy();

            //Verify that the Brands menu option is not displayed
            let brandsOptionExists = await sideBarModel.brandsOption.isVisible();
            expect(brandsOptionExists).toBeFalsy();

            //Verify that the Users menu option is not displayed
            let usersOptionExists = await sideBarModel.usersOption.isVisible();
            expect(usersOptionExists).toBeFalsy();

            //Verify that the CardStyles menu option is not displayed
            let cardStylesOptionExists = await sideBarModel.cardStylesOption.isVisible();
            expect(cardStylesOptionExists).toBeFalsy();

            await sideBarModel.onClickMenuOption();

            //Verify that the Campaigns menu option is selected
            await sideBarModel.onClickCampaignsOptionMenu();
            expect(brand).toEqual(brandsData.brandNodeName);
            expect(node).toEqual(brandsData.storeBrandName);
            await commonModel.verifyThePageDetailTitle(sidebarData.campaign);

        } else if(user.role == rolesData.storeOwner){
            await commonModel.waitAddContentButtonAppears();
            expect(brand).toEqual(brandsData.brandNodeName);
            expect(node).not.toEqual("All Stores");
        }

        //Verify that the categories menu option is selected
        await sideBarModel.onClickCategoriesOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin){
            expect(node).toEqual(brandsData.storeBrandName);
        }else{
            expect(node).not.toEqual("All Stores");
        }
        await commonModel.verifyThePageDetailTitle(sidebarData.categories);

        //Verify that the content menu option is selected
        await sideBarModel.onClickContentOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin){
            expect(node).toEqual(brandsData.storeBrandName);
        }else{
            expect(node).not.toEqual("All Stores");
        }
        await commonModel.verifyThePageDetailTitle(sidebarData.content);

        //Verify that the schedules menu option is selected
        await sideBarModel.onClickSchedulesOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin){
            expect(node).toEqual(brandsData.storeBrandName);
        }else{
            expect(node).not.toEqual("All Stores");
        }
        await commonModel.verifyThePageDetailTitle(sidebarData.schedules);

        //Verify that the recipes menu option is selected
        await sideBarModel.onClickRecipesOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin){
            expect(node).toEqual(brandsData.storeBrandName);
        }else{
            expect(node).not.toEqual("All Stores");
        }
        await commonModel.verifyThePageDetailTitle(sidebarData.recipes);

        //Verify that the media menu option is selected
        await sideBarModel.onClickMediaOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin){
            expect(node).toEqual(brandsData.storeBrandName);
        }else{
            expect(node).not.toEqual("All Stores");
        }
        await commonModel.verifyThePageDetailTitle(sidebarData.media);

        //Verify that the pages menu option is selected
        await sideBarModel.onClickPageOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin){
            expect(node).toEqual(brandsData.storeBrandName);
        }else{
            expect(node).not.toEqual("All Stores");
        }
        await commonModel.verifyThePageDetailTitle(sidebarData.pages);

        //Verify that the imported content menu option is selected
        await sideBarModel.onClickImportedContentOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin){
            expect(node).toEqual(brandsData.storeBrandName);
        }else{
            expect(node).not.toEqual("All Stores");
        }
        await commonModel.verifyThePageDetailTitle(sidebarData.importedContent);
    });

    test(`Navigate on the menu at Store level SubBrand Child '${user.role}'`, async ({ page }) => {
        await page.goto(url);
        const loginModel = new LoginModel(page);
        const sideBarModel = new SidebarModel(page);
        const topBarModel = new TopBarModel(page);
        const commonModel = new CommonModel(page);

        test.setTimeout(180000);
        await loginModel.login(user.username, user.password);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin) { 
            await topBarModel.selectBrand(brandsData.brandNodeName);
            await commonModel.waitUntilSpinnerDisappears();
            await topBarModel.selectStoreSubbrandChild(brandsData.subBrandName, brandsData.storeSubBrandName, brandsData.subBrand);
            await commonModel.waitUntilSpinnerDisappears();
        }
        const allStores = 'All Stores';
        let brand = await topBarModel.selectBrandButton.locator('div div').innerText();
        let node = await topBarModel.nodeTitle.innerText();

        if(user.role == rolesData.superAdmin){
            //Verify that the Dashboard menu option is selected
            await sideBarModel.onClickDashboardOptionMenu();
            expect(brand).toEqual(brandsData.brandNodeName);
            expect(node).toEqual(brandsData.storeSubBrandName);
            await commonModel.verifyThePageDetailTitle(sidebarData.dashboard);

            //Verify that the Brands menu option is selected
            await sideBarModel.onClickBrandOptionMenu();
            expect(brand).toEqual(brandsData.brandNodeName);
            expect(node).toEqual(brandsData.storeSubBrandName);
            await commonModel.verifyThePageDetailTitle(sidebarData.brands);

            //Verify that the Users menu option is selected
            await sideBarModel.onClickUsersOptionMenu();
            expect(brand).toEqual(brandsData.brandNodeName);
            expect(node).toEqual(brandsData.storeSubBrandName);
            await commonModel.verifyThePageDetailTitle(sidebarData.users);

            //Verify that the CardStyles menu option is selected
            await sideBarModel.onClickCardStylesOptionMenu();
            expect(brand).toEqual(brandsData.brandNodeName);
            expect(node).toEqual(brandsData.storeSubBrandName);
            await commonModel.verifyThePageDetailTitle(sidebarData.cardStyles);

            //Verify that the Campaigns menu option is selected
            await sideBarModel.onClickCampaignsOptionMenu();
            expect(brand).toEqual(brandsData.brandNodeName);
            expect(node).toEqual(brandsData.storeSubBrandName);
            await commonModel.verifyThePageDetailTitle(sidebarData.campaign);
        } else if(user.role == rolesData.admin){
            //Click to open Side menu
            await sideBarModel.onClickMenuOption();

            //Verify that the Dashboard menu option is not displayed
            let dashboardOptionExists = await sideBarModel.dashboardOption.isVisible();
            expect(dashboardOptionExists).toBeTruthy();

            //Verify that the Brands menu option is not displayed
            let brandsOptionExists = await sideBarModel.brandsOption.isVisible();
            expect(brandsOptionExists).toBeFalsy();

            //Verify that the Users menu option is not displayed
            let usersOptionExists = await sideBarModel.usersOption.isVisible();
            expect(usersOptionExists).toBeFalsy();

            //Verify that the CardStyles menu option is not displayed
            let cardStylesOptionExists = await sideBarModel.cardStylesOption.isVisible();
            expect(cardStylesOptionExists).toBeFalsy();

            await sideBarModel.onClickMenuOption();

            //Verify that the Campaigns menu option is selected
            await sideBarModel.onClickCampaignsOptionMenu();
            expect(brand).toEqual(brandsData.brandNodeName);
            expect(node).toEqual(brandsData.storeSubBrandName);
            await commonModel.verifyThePageDetailTitle(sidebarData.campaign);

        } else if(user.role == rolesData.storeOwner){
            await commonModel.waitAddContentButtonAppears();
            expect(brand).toEqual(brandsData.brandNodeName);
            expect(node).not.toEqual("All Stores");
        }

        //Verify that the categories menu option is selected
        await sideBarModel.onClickCategoriesOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin){
            expect(node).toEqual(brandsData.storeSubBrandName);
        }else{
            expect(node).not.toEqual("All Stores");
        }
        await commonModel.verifyThePageDetailTitle(sidebarData.categories);

        //Verify that the content menu option is selected
        await sideBarModel.onClickContentOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin){
            expect(node).toEqual(brandsData.storeSubBrandName);
        }else{
            expect(node).not.toEqual("All Stores");
        }
        await commonModel.verifyThePageDetailTitle(sidebarData.content);

        //Verify that the schedules menu option is selected
        await sideBarModel.onClickSchedulesOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin){
            expect(node).toEqual(brandsData.storeSubBrandName);
        }else{
            expect(node).not.toEqual("All Stores");
        }
        await commonModel.verifyThePageDetailTitle(sidebarData.schedules);

        //Verify that the recipes menu option is selected
        await sideBarModel.onClickRecipesOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin){
            expect(node).toEqual(brandsData.storeSubBrandName);
        }else{
            expect(node).not.toEqual("All Stores");
        }
        await commonModel.verifyThePageDetailTitle(sidebarData.recipes);

        //Verify that the media menu option is selected
        await sideBarModel.onClickMediaOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin){
            expect(node).toEqual(brandsData.storeSubBrandName);
        }else{
            expect(node).not.toEqual("All Stores");
        }
        await commonModel.verifyThePageDetailTitle(sidebarData.media);

        //Verify that the pages menu option is selected
        await sideBarModel.onClickPageOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin){
            expect(node).toEqual(brandsData.storeSubBrandName);
        }else{
            expect(node).not.toEqual("All Stores");
        }
        await commonModel.verifyThePageDetailTitle(sidebarData.pages);

        //Verify that the imported content menu option is selected
        await sideBarModel.onClickImportedContentOptionMenu();
        expect(brand).toEqual(brandsData.brandNodeName);
        if(user.role == rolesData.superAdmin || user.role == rolesData.admin){
            expect(node).toEqual(brandsData.storeSubBrandName);
        }else{
            expect(node).not.toEqual("All Stores");
        }
        await commonModel.verifyThePageDetailTitle(sidebarData.importedContent);
    });

});

