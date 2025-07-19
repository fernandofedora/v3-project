import {expect, Locator, Page} from '@playwright/test';
import { CommonModel } from '../pom/commonModel';
import { SidebarModel } from '../pom/sidebarModel';
import {v4 as uuidv4} from 'uuid';
import { ContentModel } from '../pom/contentModel';

export class Pagesmodel {

    readonly page: Page;
    readonly pagesCreateButton: Locator;
    readonly createPopUpPageNameField: Locator;
    readonly createPopUpPathField: Locator;
    readonly saveButton: Locator;
    readonly pagesTable: Locator;
    readonly yesButton: Locator;
    readonly noButton: Locator;
    readonly searchBar: Locator;
    readonly pageNameTakenMessage: Locator;
    readonly cancelButton: Locator;
    readonly categoryTable: Locator;
    readonly createAddPageButton: Locator;
    readonly pagesList: Locator;
    readonly pagesListDropdown: Locator;
    readonly newPageTabMenu: Locator;
    readonly createNewSubPageButtonTabMenu: Locator;
    readonly subpagesTable: Locator;
    readonly categoryCardDetail: Locator;
    readonly filterCategoryCardDetail: Locator;
    readonly categoryCardDetailItems: Locator;
    readonly newPageOptionAddPage: Locator;
    readonly contentTableSkeleton: Locator;
    readonly newSubPageOptionMenu: Locator;

    constructor(page: Page){
        this.page = page;
        this.pagesCreateButton = page.locator("div.dh-button.full-width.small");
        this.createPopUpPageNameField = page.locator("div input[formControlName='translation']");
        this.createPopUpPathField = page.locator("div input[formcontrolname='path']");
        this.saveButton = page.locator('button > span:text-is("Save")');
        this.pagesTable = page.locator('dh-detail-page div.dh-detail-page__no-content > p-table > div > div > table > tbody');
        this.yesButton = page.locator('button > span:text-is("Yes")');
        this.noButton = page.locator('button > span:text-is("No")');
        this.searchBar = page.locator('input[placeholder="Search Pages"]');
        this.pageNameTakenMessage = page.locator("app-error-messages li");
        this.cancelButton = page.locator('button > span:text-is("Cancel")');
        this.categoryTable = page.locator('table.p-datatable-table > tbody');
        this.createAddPageButton = page.locator('div.add-page-button');
        this.newPageOptionAddPage = page.locator('ul.p-menu-list li span:text-is("New Page")');
        this.pagesList = page.locator('div.page-panel div.selected-label-page');
        this.pagesListDropdown = page.locator('div.p-overlaypanel-content');
        this.newPageTabMenu = page.locator('p-tabmenu div.p-tabmenu-nav-content > ul > li[role="tab"]');
        this.createNewSubPageButtonTabMenu = page.locator('p-tabmenu div.dh-tab-sub-menu ul li[role="tab"]');
        this.subpagesTable = page.locator('dh-detail-page div.dh-detail-page__no-content > p-table > div > div > table table');
        this.categoryCardDetail = page.locator('div.p-dropdown-clearable');
        this.filterCategoryCardDetail = page.locator('input.p-dropdown-filter');
        this.categoryCardDetailItems = page.locator('.p-dropdown-item-group > span');
        this.contentTableSkeleton = page.locator('dh-detail-page div.dh-detail-page__content p-skeleton');
        this.newSubPageOptionMenu = page.locator('ul.p-menu-list li span:text-is("New Sub Page")');
    }

    /**
     * Verify that the created message is present
     * @param message 
     */
    async verifyCreatedAlertMessage(message: string) {
    
        const common = new CommonModel(this.page);

        await expect( async () => {
            await expect(common.snackbar).toBeVisible( {timeout:300} );
            let text = (await common.snackbar.innerText()).trim();
            expect(text).toContain(message);
        }).toPass();

    }

    /**
     * Verify the page is created and displayed in the pages table
     * @param title 
     */
    async verifyTheNewPageIsCreated(title: string){

        await expect( async () => {
            await expect(this.page.getByRole('row', { name: `${title}` })).toBeVisible( {timeout: 300} );
        }).toPass();
    }

    /**
     * Delete page
     * @param title 
     */
    async deletePage(title: string){

        const common = new CommonModel(this.page);

        await expect( async () => {
            await expect(this.pagesTable).toBeVisible( {timeout: 300} );
        }).toPass();

        
        let deleteButton = this.pagesTable.locator('tr').locator(`button[title="Delete Page"]:right-of(td:text-is("${title}"))`);
        
        await expect( async () => {
            await expect(deleteButton).toBeVisible( {timeout: 300} );
        }).toPass();

        await deleteButton.click();

        await expect( async () => {
            await expect(this.yesButton).toBeVisible( {timeout: 300} );
        }).toPass();
        
        await this.yesButton.click();
        
        const recipe = this.pagesTable.locator('tr').locator(`td:text("${title}")`);

        await expect( async () => {
            await expect(this.pagesTable.locator('tr').locator(`td:text("${title}")`)).not.toBeVisible( {timeout: 300} );
        }).toPass();
    }

    /**
     * Verify that the delete message is displayed
     * @param title 
     */
    async verifyDeletedAlertMessage(title: string) {
        const common = new CommonModel(this.page);

        await expect( async () => {
            await expect(common.snackbar.last()).toBeVisible( {timeout: 300} );
        }).toPass();

        await expect( async () => {
            let message = title + " was deleted successfully!";
            expect((await common.snackbar.last().innerText()).trim()).toEqual(message);
        }).toPass();
    }

    /**
     * Click the add child button from a page
     * @param title 
     */
    async clickAddChildButton(title: string){
        
        await expect( async () => {
            await expect(this.pagesTable.first()).toBeVisible( {timeout: 300} );
        }).toPass();
        
        const addChildButton = this.pagesTable.locator('tr').locator(`button[title="Add Child"]:right-of(td:text-is("${title}"))`);
        await addChildButton.click();
    }

    /**
     * click the expand button from a page
     * @param title 
     */
    async clickExpandButton(title: string, subPageName: string){
        
        await expect( async () => {
            await expect(this.pagesTable.first()).toBeVisible( {timeout: 300} );
        }).toPass();
        
        await expect( async () => {
            const leftButton = this.pagesTable.locator('tr').locator(`button > span.p-button-icon:left-of(td:text-is("${title}"))`);
            let subpageVisible = await this.pagesTable.locator('tr').locator(`td:text-is("${subPageName}")`).isVisible();
            await this.page.waitForTimeout(300);
            if(!subpageVisible){
                await leftButton.first().click();
            }
        }).toPass();


        
    }

    /**
     * Verify the page is created and displayed in the pages table
     * @param title 
     */
    async verifyTheNewSubPageIsCreated(title: string){

        await expect( async () => {
            await expect(this.pagesTable.first()).toBeVisible( {timeout: 300} );
        }).toPass();

        await expect( async () => {
            const newRecipe = this.pagesTable.locator(`tr td:text("${title}")`);
            await expect(newRecipe).toBeVisible();
        }).toPass();

    }

    /**
     * Verify the page is created and displayed in the pages table
     * @param title 
     */
    async verifyTheNewPageIsNotCreated(title: string){
            let newPageIsVisible: boolean;
            await this.page.waitForTimeout(300);
            for(let i = 0; i < 30; i++){
                newPageIsVisible = await this.page.getByText(`${title}`, {exact: true}).isVisible();
                if(!newPageIsVisible){
                    break;
                }
                await this.page.waitForTimeout(300);
            }
            expect(newPageIsVisible!).toBe(false);
    }

    //Verify if the page name already in use message is displayed
    async verifyThePageNameAlreadyTakenMessageDisplayed(){
        let message = "The default name is already in use";
        for(let i = 0; i < 40; i++){
            var messageIsVisible = await this.pageNameTakenMessage.isVisible();
            if(messageIsVisible){
                break;
            }
            await this.page.waitForTimeout(200);
        }
        expect(await this.pageNameTakenMessage.innerText()).toEqual(message);
    }


    //Verify if the path name already in use message is displayed
    async verifyThePathNameAlreadyTakenMessageDisplayed(){
        let message = "The path is already in use";
        for(let i = 0; i < 60; i++){
            var messageIsVisible = await this.pageNameTakenMessage.isVisible();
            if(messageIsVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(await this.pageNameTakenMessage.innerText()).toEqual(message);
    }


    //Verify that the category is created
    async verifyTheCategoryIsCreated(title: string){
        let isVisible: boolean;
        let name: string | null;
        for(let i = 0; i < 60; i++){
            isVisible = await this.categoryTable.locator('tr').first().isVisible();
            if(isVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(isVisible!).toBe(true);

        let totalRows = await this.categoryTable.locator('tr').count();
        for(let i = 0; i < totalRows; i++){
            name = await this.categoryTable.locator('tr').nth(i).locator('td').nth(0).textContent();
            if(name == title){
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(name!).toEqual(title);
    }


    /**
     * Verify that the new created page is displayed on the page list on the content screen
     * @param name 
     */
    async verifyPageIsDisplayedOnTheList(name: string){

        let tabName: string | null;
        let pagesListVisible: boolean;
        let pagesListDropdownVisible: boolean;
        let newTabName: string | undefined;

        for(let i = 0; i < 70; i++){
            pagesListVisible = await this.pagesList.isVisible();
            if(pagesListVisible){
                break;
            }
            await this.page.waitForTimeout(500);
        }
        await this.pagesList.click( {delay:2000} );

        for(let i = 0; i < 70; i++){
            pagesListDropdownVisible = await this.pagesListDropdown.locator('div > div').first().isVisible();
            if(pagesListDropdownVisible){
               break;
            }
            await this.page.waitForTimeout(500);
        }

        let pagesListCount = await this.pagesListDropdown.locator('div > div').count();
        for(let i = 0; i < pagesListCount; i++){
            tabName = await this.pagesListDropdown.locator('div > div').nth(i).textContent();
            newTabName = tabName?.trim();
            if(newTabName == name){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(newTabName).toEqual(name);
    }


    /**
     * Verify that the create page button is not displayed
     */
    async verifyThatTheCreatePageButtonIsNotDisplayed(){

        let isVisible: boolean;

        for(let i = 0; i < 60; i++){
            isVisible = await this.pagesCreateButton.isVisible();
            if(!isVisible){
                break;
            }
            await this.page.waitForTimeout(300); 
        }

        expect(isVisible!).toBe(false);
    }


    /**
     * Click a page tab by especific name
     */
    async onClickPageTab(name: string){
        let isVisible: boolean;
        let index:  number;
        for(let i = 0; i < 80; i++){
            isVisible = await this.newPageTabMenu.first().isVisible();
            if(isVisible){
                break;
            }

            await this.page.waitForTimeout(400);
        }

        let pagesCount = await this.newPageTabMenu.count();
        for(let i = 0; i < pagesCount; i++){
            let textPageName = await this.newPageTabMenu.nth(i).textContent();
            if(textPageName == name){
                index = i;
                break;
            }
        }
        await this.newPageTabMenu.nth(index!).click();        
    }


    /**
     * Click the add a new sub page button
     */
    async onClickCreateSubPageButtonTabMenu(){
        let subpageButtonVisible: boolean;
        for(let i = 0; i < 60; i++){
            subpageButtonVisible = await this.createNewSubPageButtonTabMenu.filter({hasText: "+"}).isVisible();
            if(subpageButtonVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        await this.createNewSubPageButtonTabMenu.filter({hasText: "+"}).click();
    }


    /**
     * Click the add a new sub page button
     */
    async verifyTheItemIsCreatedInThePageLIst(name: string){
        let isVisible: boolean;
        let pageListButtonVisible: boolean; 
        for(let i = 0; i < 60; i++){
            pageListButtonVisible = await this.pagesList.isVisible();
            if(pageListButtonVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.pagesList.click( {delay:2000} );

        for(let i = 0; i < 70; i++){
            isVisible = await this.pagesListDropdown.filter({hasText: `${name}`}).isVisible();
            if(isVisible){
                break;
            }

            await this.page.waitForTimeout(500);

        }
        expect(isVisible!).toBe(true);
    }

    /**
     * Delete page
     * @param title 
     */
    async deleteSubPage(title: string){
        const common = new CommonModel(this.page);
        await this.subpagesTable.first().waitFor();
        const deleteButton = this.subpagesTable.locator('tr').locator(`button[title="Delete Page"]:right-of(td:text("${title}"))`);
        await expect(deleteButton).toBeVisible();
        await deleteButton.click();
        await expect(this.yesButton).toBeVisible();
        await this.noButton.hover();
        await this.yesButton.hover();
        await this.noButton.hover();
        await this.yesButton.hover();
        await this.yesButton.click();
        const recipe = this.pagesTable.locator('tr').locator(`td:text("${title}")`);
        await common.waitUntilSpinnerDisappears();
        await expect(recipe).not.toBeVisible();
    }

    /**
     * Verify that the create page button is displayed
     */
    async verifyThatCreatePageButtonIsPresent(){
        let isVisible: boolean;
        for(let i = 0; i < 70; i++){
            isVisible = await this.pagesCreateButton.filter({ hasText: 'Create Page' }).isVisible();
            if(isVisible){
                break;
            }
            await this.page.waitForTimeout(400);
        }
        expect(isVisible!).toBe(true);
    }


    /**
     * Checks if a category exists with the page required
     * @param categoryName
     * @param pageName
     * @returns exists
     */
    async checkCategoryWithPageInTable(categoryName: string, pageName: string) {
        await this.page.waitForTimeout(1500);
        await expect(this.categoryTable).toBeEnabled();
        const rowCount = await this.categoryTable.locator('tr').count();
        let exists = false;

        for(let i = 0; i < rowCount; i++) {
            const categoryValue = await this.categoryTable.locator('tr').nth(i).locator('td').nth(0).innerText();
            const pageValue = await this.categoryTable.locator('tr').nth(i).locator('td').nth(2).innerText();

            if(categoryValue === categoryName && pageValue === pageName) {
                exists = true;
                break;
            }

        }

        return exists;
    }


    /**
     * Verify that the category is displayed on the category card detail menu
     * @param name 
     */
    async verifyTheNewPageIsVisibleCardDetail(name: string){ // I know, this could improve
        let isVisible: boolean;
        for(let i = 0; i < 60; i++){
            isVisible = await this.categoryCardDetailItems.getByText(`${name}`, { exact: true }).isVisible();
            if(isVisible){
                break;
            }
            await this.page.waitForTimeout(200);
        }

        expect(isVisible!).toBe(true);
    }


    /**
     * Type the page name in the page name field with two languages
     * @param value 
     */
    async setPageName(value: string){
        await this.createPopUpPageNameField.nth(0).fill(value);
    }


    /**
     * Type the path inot the field with two languages
     * @param value 
     */
    async setPagePath(value: string){
        await this.createPopUpPathField.nth(0).fill(value);
    }


    /**
    * Verify that the create page button is displayed
    */
    async verifyThatThePageNameFieldIsPresent(){

        await expect( async () => {
            await expect(this.createPopUpPageNameField).toBeVisible( {timeout:300} );
        }).toPass();
    }


    /**
     * wait for add page button is displayed and the click on it
     */
    async clickAddPageInContentModule(){
        let pageButtonVisible: boolean;
        let newPageOptionAddPageVisible: boolean; 

        for(let i = 0; i < 60; i++){
            pageButtonVisible = await this.createAddPageButton.isVisible();
            if(pageButtonVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        await this.createAddPageButton.click();

        for(let i = 0; i < 60; i++){
            newPageOptionAddPageVisible = await this.newPageOptionAddPage.isVisible();
            if(newPageOptionAddPageVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.newPageOptionAddPage.click();
    }


    /**
     * Wait for the page name field is not displayed
     */
    async waitPageNameFieldIsNotDisplayed(){
        let pageNameInputVisible: boolean;

        for(let i = 0; i < 70; i++){
            pageNameInputVisible = await this.createPopUpPageNameField.isVisible();
            if(!pageNameInputVisible){
                break;
            }
            await this.page.waitForTimeout(400);
        }
    }

    async clickTheNewPageButtonTabMenu(){
        let createNewPageButtonVisible: boolean;

        for(let i = 0;  i < 80;  i++){
            createNewPageButtonVisible = await this.createAddPageButton.isVisible();
            if(createNewPageButtonVisible){
                break;
            }
            await this.page.waitForTimeout(400);
        }

        await this.createAddPageButton.click();
    }


    /**
     * Verify the save button is not displayed
     */
    async verifySaveButtonIsNotDisplayed(){
        await expect( async () => {
            await expect(this.saveButton).not.toBeVisible( {timeout:300} );
        }).toPass();
    }

    /**
     * 
     */
    async ensureAtLeastOnePageExists() {
        const sidebarModel = new SidebarModel(this.page);
        const commonModel = new CommonModel(this.page);
        await sidebarModel.onClickPageOptionMenu();

        let rowCount = await this.pagesTable.locator('tr').count();
        let retries = 5;

        while(rowCount === 0 && retries > 0) {
            rowCount = await this.pagesTable.locator('tr').count();
            retries--;
        }

        if (rowCount === 0) {
            const uniqueId = uuidv4();
            const uniqueId2 = uuidv4();
        
            const pageName = ("Page" + uniqueId).slice(0, 30);
            const pathName = ("path" + uniqueId2).slice(0, 30);

            await this.pagesCreateButton.click();
            await this.createPopUpPageNameField.nth(0).fill(pageName);
            await this.createPopUpPathField.fill(pathName);
            await this.saveButton.click();
            await commonModel.waitUntilSpinnerDisappears();
        }
    }


    /**
     * Verify that the content table skeleton is not displayed
     */
    async waitContentSkeletonNotVisible(){
        let contentSkeletonVisible: boolean;
        for(let i = 0; i < 60; i++){
            contentSkeletonVisible = await this.contentTableSkeleton.first().isVisible();
            if(!contentSkeletonVisible){
                break;
            }
            await this.page.waitForTimeout(500);
        }
    }


        /**
     * wait for add page button is displayed and the click on it
     */
    async clickAddSubPageInContentModule(){
        let subPageButtonVisible: boolean;
        let addPageVisible: boolean;
        let pageListButtonVisible: boolean;
        let pageListDropdownVisible: boolean;


        for(let i = 0; i < 70; i++){
            pageListButtonVisible = await this.pagesList.isVisible();
            if(pageListButtonVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.pagesList.click();

        for(let i = 0; i < 70; i++){
            pageListDropdownVisible = await this.pagesListDropdown.locator('div').first().isVisible();
            if(pageListDropdownVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.pagesListDropdown.locator('div').nth(2).click();
        

        for(let i = 0; i < 70; i++){
            addPageVisible = await this.createAddPageButton.isVisible();
            if(addPageVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        await this.createAddPageButton.click();

        for(let i = 0; i < 60; i++){
            subPageButtonVisible = await this.newSubPageOptionMenu.isVisible();
            if(subPageButtonVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.newSubPageOptionMenu.click();
    }


    /**
     * Verify that the create page button is displayed
     */
    async verifyThatCreatePageButtonIsNotPresent(){
        let isVisible: boolean;
        for(let i = 0; i < 70; i++){
            isVisible = await this.pagesCreateButton.filter({ hasText: 'Create Page' }).isVisible();
            if(!isVisible){
                break;
            }
            await this.page.waitForTimeout(400);
        }
        expect(isVisible!).toBe(false);
    }


    /**
     * wait for add page button is displayed and the click on it
     */
    async clickAddPageInContentModuleNotDisplayed(){
        let pageButtonVisible: boolean;

        for(let i = 0; i < 60; i++){
            pageButtonVisible = await this.createAddPageButton.isVisible();
            if(!pageButtonVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
        expect(pageButtonVisible!).toBeFalsy();
    }
    
    
    /**
     * Verify that the content table skeleton is not displayed
     */
    async waitContentSkeletonVisible(){
        
        await expect( async () => {
            await expect(this.contentTableSkeleton.first()).toBeVisible( {timeout:300} );
        }).toPass();
    }

    async verifyThatCreatePageButtonIsVisible(){

        await expect( async () => {
            await expect(this.pagesCreateButton).toBeVisible( {timeout:300} );
        }).toPass();
    }


    /**
     * 
     */
    async ensureAtLeastOnePageExistsBrandTwoLanguage() {
        const sidebarModel = new SidebarModel(this.page);
        const commonModel = new CommonModel(this.page);
        await sidebarModel.onClickPageOptionMenu();

        let rowCount = await this.pagesTable.locator('tr').count();
        let retries = 5;

        while(rowCount === 0 && retries > 0) {
            rowCount = await this.pagesTable.locator('tr').count();
            retries--;
        }

        if (rowCount === 0) {
            const uniqueId = uuidv4();
            const uniqueId2 = uuidv4();
        
            const pageName = ("Page" + uniqueId).slice(0, 30);
            const pathName = ("path" + uniqueId2).slice(0, 30);

            await this.pagesCreateButton.click();
            await this.createPopUpPageNameField.nth(0).fill(pageName);
            await this.createPopUpPathField.fill(pathName);
            await this.saveButton.click();
            await commonModel.waitUntilSpinnerDisappears();
        }
    }
}