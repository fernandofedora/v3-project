import { Locator, Page, expect } from '@playwright/test';
import { SidebarOptionsEnum as SidebarOptions } from '../enums/sidebarOptions.enum';
import { CommonModel } from './commonModel';

export class SidebarModel {

    readonly page: Page;
    readonly commonModel: CommonModel;
    readonly mainWrapper: Locator;
    readonly dashboardOption: Locator;
    readonly brandsOption: Locator;
    readonly usersOption: Locator;
    readonly cardStylesOption: Locator;
    readonly campaignsOption: Locator;
    readonly categoriesOption: Locator;
    readonly contentOption: Locator;
    readonly schedulesOption: Locator;
    readonly recipesOption: Locator;
    readonly mediaOption: Locator;
    readonly pagesOption: Locator;
    readonly iconsHeadlinesOption: Locator;
    readonly importedContentOption: Locator;
    readonly storeGroupsOption: Locator;
    readonly sideMenuClosed: Locator;
    readonly sideMenuOpen: Locator;
    readonly cpgBrandsOption: Locator;
    readonly campaignBuilderOption: Locator;

    constructor (page: Page) {
        this.page = page;
        this.commonModel = new CommonModel(page);
        this.mainWrapper = page.getByText('ADMIN MENU');
        this.dashboardOption = page.locator('dh-menu ul>li>a').getByText(SidebarOptions.dashboard);
        this.brandsOption = page.locator('dh-menu ul>li>a').getByText(SidebarOptions.brands, {exact: true});
        this.usersOption = page.locator('dh-menu ul>li>a').getByText(SidebarOptions.users);
        this.cardStylesOption = page.locator('dh-menu ul>li>a').getByText(SidebarOptions.cardStyles);
        this.campaignsOption = page.locator('dh-menu ul>li>a').getByText(SidebarOptions.campaigns);
        this.categoriesOption = page.locator('dh-menu ul>li>a').getByText(SidebarOptions.categories);
        this.contentOption = page.locator('dh-menu ul>li>a').getByText(SidebarOptions.content, {exact: true});
        this.schedulesOption = page.locator('dh-menu ul>li>a').getByText(SidebarOptions.schedules);
        this.recipesOption = page.locator('dh-menu ul>li>a').getByText(SidebarOptions.recipes);
        this.mediaOption = page.locator('dh-menu ul>li>a').getByText(SidebarOptions.media, {exact: true}).nth(0);
        this.pagesOption = page.locator('dh-menu ul>li>a').getByText(SidebarOptions.pages);
        this.iconsHeadlinesOption = page.locator('dh-menu ul>li>a').getByText(SidebarOptions.iconsHeadlines);
        this.importedContentOption = page.locator('dh-menu ul>li>a').getByText(SidebarOptions.importedContent);
        this.storeGroupsOption = page.locator('dh-menu ul>li>a').getByText(SidebarOptions.storeGroups);
        this.cpgBrandsOption = page.locator('dh-menu ul>li>a').getByText(SidebarOptions.cpgBrands);
        this.sideMenuClosed = page.locator('dh-sidebar-menu');
        this.sideMenuOpen = page.locator('dh-sidebar-menu open');
        this.campaignBuilderOption = page.locator('dh-menu ul>li>a').getByText('Campaign Builder');
    }

    async onClickMenuOption() {
        await expect( async () => {
            await expect(this.mainWrapper).toBeVisible( {timeout:300} );
        }).toPass();

        await this.mainWrapper.click( {delay:400});
    }

    async onClickDashboardOptionMenu() {
        await this.onClickMenuOption();
        await this.dashboardOption.click();
        await this.commonModel.waitUntilSpinnerDisappears();
    }

    async onClickBrandOptionMenu() {
        await this.onClickMenuOption();
        await this.categoriesOption.hover();
        await this.categoriesOption.hover();
        await this.contentOption.hover();
        await this.schedulesOption.hover();
        await this.recipesOption.hover();
        await this.mediaOption.hover();
        await this.pagesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.pagesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.pagesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.brandsOption.click({ delay:300});
        await this.commonModel.waitUntilSpinnerDisappears();
    }

    async onClickUsersOptionMenu() {
        await this.onClickMenuOption();
        await this.iconsHeadlinesOption.first().waitFor({ state: 'visible' })
        await this.iconsHeadlinesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.contentOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.mediaOption.hover();
        await this.importedContentOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.usersOption.click();
        await this.commonModel.waitUntilSpinnerDisappears();
    }

    async onClickCardStylesOptionMenu() {
        await this.onClickMenuOption();
        for(let i = 0; i < 40; i++){
            let isVisible = await this.cardStylesOption.isVisible();
            if(isVisible){
                break;
            }
            await this.page.waitForTimeout(200);
        }
        await this.categoriesOption.hover();
        await this.categoriesOption.hover();
        await this.contentOption.hover();
        await this.schedulesOption.hover();
        await this.recipesOption.hover();
        await this.mediaOption.hover();
        await this.pagesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.recipesOption.hover();
        await this.pagesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.recipesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.recipesOption.hover();
        await this.pagesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.cardStylesOption.click();
        await this.commonModel.waitUntilSpinnerDisappears();
    }

    async onClickCampaignsOptionMenu(){
        await this.onClickMenuOption();
        await this.recipesOption.first().waitFor({ state: 'visible' })
        await this.importedContentOption.hover();
        await this.pagesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.pagesOption.hover();
        await this.pagesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.recipesOption.first().waitFor({ state: 'visible' });
        await this.campaignsOption.click({force: true});
        await this.commonModel.waitUntilSpinnerDisappears();
    }

    async onClickCategoriesOptionMenu() {
        await this.onClickMenuOption();
        await this.importedContentOption.hover();
        await this.pagesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.pagesOption.hover();
        await this.pagesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.importedContentOption.hover();
        await this.pagesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.pagesOption.hover();
        await this.pagesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.categoriesOption.click( {delay:400} );
    }

    async onClickContentOptionMenu() {
        let validUrl: boolean;

        for(let i = 0; i < 30; i++){
            await this.onClickMenuOption();
            await this.categoriesOption.first().waitFor({ state: 'visible' })
            await this.categoriesOption.hover();
            await this.categoriesOption.hover();
            await this.contentOption.hover();
            await this.schedulesOption.hover();
            await this.recipesOption.hover();
            await this.mediaOption.hover();
            await this.pagesOption.hover();
            await this.iconsHeadlinesOption.hover();
            await this.importedContentOption.hover();
            await this.importedContentOption.hover();
            await this.pagesOption.hover();
            await this.iconsHeadlinesOption.hover();
            await this.importedContentOption.hover();
            await this.iconsHeadlinesOption.hover();
            await this.iconsHeadlinesOption.hover();
            await this.importedContentOption.hover();
            await this.iconsHeadlinesOption.hover();
            await this.pagesOption.hover();
            await this.iconsHeadlinesOption.hover();
            await this.importedContentOption.hover();
            await this.contentOption.first().waitFor({ state: 'visible' });
            await this.contentOption.click({force: true, delay: 400});
            await this.commonModel.waitUntilSpinnerDisappears();
            await this.page.waitForTimeout(500);
            let siteUrl = this.page.url();
            validUrl = siteUrl.includes('circular-builder');
            if(validUrl){
                break;
            }
        }
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState("networkidle");
    }

    async onClickSchedulesOptionMenu(){
        await this.onClickMenuOption();
        await this.categoriesOption.hover();
        await this.categoriesOption.hover();
        await this.contentOption.hover();
        await this.schedulesOption.hover();
        await this.recipesOption.hover();
        await this.mediaOption.hover();
        await this.pagesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.pagesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.pagesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.schedulesOption.click();
    }

    async onClickRecipesOptionMenu(){
        await this.onClickMenuOption();
        await this.importedContentOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.pagesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.pagesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.recipesOption.click({force: true});
        await this.commonModel.waitUntilSpinnerDisappears();
    }

    async onClickMediaOptionMenu(){
        await this.onClickMenuOption();
        await this.categoriesOption.hover();
        await this.categoriesOption.hover();
        await this.contentOption.hover();
        await this.schedulesOption.hover();
        await this.recipesOption.hover();
        await this.mediaOption.hover();
        await this.pagesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.pagesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.pagesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.mediaOption.click();
    }

    async onClickPageOptionMenu(){
        await this.onClickMenuOption();
        for(let i = 0; i < 60; i++){
            let isVisible = await this.pagesOption.isVisible();
            if(isVisible){
                break;
            }
            await this.page.waitForTimeout(400);
        }
        await this.contentOption.hover();
        await this.importedContentOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.pagesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.pagesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.pagesOption.click({force: true});
        await this.commonModel.waitUntilSpinnerDisappears();
    }

    async onClickIconsHeadlinesOptionMenu(){
        await this.onClickMenuOption();
        await this.importedContentOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.pagesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.iconsHeadlinesOption.click( {delay:400} );
        await this.commonModel.waitUntilSpinnerDisappears();
    }

    async onClickImportedContentOptionMenu(){
        await this.onClickMenuOption();
        await this.importedContentOption.click();
        await this.commonModel.waitUntilSpinnerDisappears();
    }

    async onClickStoreGroupsOptionMenu(){
        await this.onClickMenuOption();
        await this.importedContentOption.hover();
        await this.importedContentOption.hover();
        await this.contentOption.hover();
        await this.importedContentOption.hover();
        await this.importedContentOption.hover();
        await this.mediaOption.hover();
        await this.importedContentOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.storeGroupsOption.click();
        await this.commonModel.waitUntilSpinnerDisappears();
    }


    async onClickBrandOptionMenuStoreGroup() {
        await this.onClickMenuOption();
        await this.importedContentOption.hover();
        await this.importedContentOption.hover();
        await this.contentOption.hover();
        await this.importedContentOption.hover();
        await this.importedContentOption.hover();
        await this.mediaOption.hover();
        await this.importedContentOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.brandsOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.brandsOption.click({ delay:300});
        await this.commonModel.waitUntilSpinnerDisappears();
    }


    async onClickContentOptionMenuStoreGroup() {
        let validUrl: boolean;

        for(let i = 0; i < 30; i++){
            await this.onClickMenuOption();
            await this.iconsHeadlinesOption.first().waitFor({ state: 'visible' })
            await this.iconsHeadlinesOption.hover();
            await this.iconsHeadlinesOption.hover();
            await this.contentOption.hover();
            await this.iconsHeadlinesOption.hover();
            await this.iconsHeadlinesOption.hover();
            await this.mediaOption.hover();
            await this.importedContentOption.hover();
            await this.iconsHeadlinesOption.hover();
            await this.importedContentOption.hover();
            await this.iconsHeadlinesOption.hover();
            await this.importedContentOption.hover();
            await this.iconsHeadlinesOption.hover();
            await this.importedContentOption.hover();
            await this.iconsHeadlinesOption.hover();
            await this.iconsHeadlinesOption.hover();
            await this.importedContentOption.hover();
            await this.iconsHeadlinesOption.hover();
            await this.importedContentOption.hover();
            await this.iconsHeadlinesOption.hover();
            await this.importedContentOption.hover();
            await this.contentOption.first().waitFor({ state: 'visible' });
            await this.contentOption.click({force: true});
            await this.commonModel.waitUntilSpinnerDisappears();
            await this.page.waitForTimeout(500);
            let siteUrl = this.page.url();
            validUrl = siteUrl.includes('circular-builder');
            if(validUrl){
                break;
            }
        }
    }

    async onClickCPGBrandsOptionMenu(){
        await this.onClickMenuOption();
        await this.categoriesOption.hover();
        await this.categoriesOption.hover();
        await this.contentOption.hover();
        await this.schedulesOption.hover();
        await this.recipesOption.hover();
        await this.mediaOption.hover();
        await this.pagesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.recipesOption.hover();
        await this.pagesOption.hover();
        await this.iconsHeadlinesOption.hover();
        await this.importedContentOption.hover();
        await this.cpgBrandsOption.click();
        await this.commonModel.waitUntilSpinnerDisappears();
    }

    async BrandOptionMenuIsNotVisible() {
        await this.commonModel.waitUntilSpinnerDisappears();
        await this.onClickMenuOption();
        await this.commonModel.waitUntilSpinnerDisappears();
        await this.commonModel.verifyThatLocatorIsNotVisible(this.brandsOption);
        
    }

    async clickCampaingBuilderOption () {
        await expect( async () => {
            await this.campaignBuilderOption.click();
        }).toPass();
        
    }
}
