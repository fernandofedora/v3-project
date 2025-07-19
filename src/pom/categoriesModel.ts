import { Locator, Page, expect } from '@playwright/test';
import { categoriesData } from '../data/categoriesData';
import { SidebarModel } from './sidebarModel';
import { CommonModel } from './commonModel';

import {v4 as uuidv4} from 'uuid';

export class CategoriesModel {

    readonly page: Page;
    readonly createBtn: Locator;
    readonly categoryNameInput: Locator;
    readonly categorySaveBtn: Locator;
    readonly cancelBtn: Locator;
    readonly categoryExistAlert: Locator;
    readonly snackBar: Locator;
    readonly categoryTable: Locator;
    readonly deleteBtn: Locator;
    readonly deleteConfirmnBtn: Locator;
    readonly pageDropdown: Locator;
    readonly pageDropdownOptions: Locator;
    readonly pageHeaderTable: Locator;
    readonly inputAddonCategoryModal: Locator;
    readonly editButton: Locator;
    readonly editModalpageDropdown: Locator;

    constructor (page: Page) {
        this.page = page;
        this.createBtn = page.locator('dh-button').filter({ hasText: 'Create Category' });
        this.categoryNameInput = page.locator('div input[formcontrolname="translation"]');
        this.categorySaveBtn = page.locator('div.mat-mdc-dialog-surface button.submit-btn');
        this.cancelBtn = page.locator('div.mat-mdc-dialog-surface button.cancel-btn');
        this.categoryExistAlert = page.locator('app-alert');
        this.snackBar = page.locator('simple-snack-bar.mat-simple-snackbar.ng-star-inserted > span');
        this.categoryTable = page.locator('table.p-datatable-table > tbody');
        this.deleteBtn = page.locator('button.p-button-rounded.p-button-danger.p-ripple.p-button.p-component.p-button-icon-only.ng-star-inserted');
        this.deleteConfirmnBtn = page.locator('button.mat-focus-indicator.confirm-btn.mat-flat-button.mat-button-base.mat-primary');
        this.pageDropdown = page.locator('app-new-content-categories-dialog p-dropdown');
        this.pageDropdownOptions = page.locator('ul[role="listbox"] > p-dropdownitem > li');
        this.pageHeaderTable = page.locator('table.p-datatable-table th[psortablecolumn="pageName"]');
        this.inputAddonCategoryModal = page.locator('app-new-content-categories-dialog app-error-messages ul li');
        this.editButton = page.locator('button.p-element.p-ripple.p-button-rounded.p-button-success.p-mr-2.p-button.p-component.p-button-icon-only.ng-star-inserted');
        this.editModalpageDropdown = page.locator('app-new-content-categories-dialog p-dropdown');
    }

    async setDefaultCategoryName(categoryName: string, index: number = 0) {
        let nameInputVisible: boolean;
        for(let i = 0; i < 60; i++){
            nameInputVisible = await this.categoryNameInput.nth(index).isVisible();
            if(nameInputVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(nameInputVisible!).toBeTruthy();
        await this.categoryNameInput.nth(index).clear();
        await this.categoryNameInput.nth(index).fill(categoryName);
    }

    async onClickCategorySaveButton() {
        await this.categorySaveBtn.click({delay:300});
    }

    async onClickCategoryCancelButton() {
        await this.cancelBtn.click({delay:300});
    }

    async onClickCategoryCreateButton() {
        await expect( async () => {
            await expect(this.categoryTable).toBeVisible( {timeout:300} );
            await expect(this.createBtn).toBeVisible( {timeout:300} );
        }).toPass();
        await this.createBtn.click();
    }

    async fillCategoryCreationForm(name?: string): Promise<string> {
        let nameCategory: string;

        if(name == undefined){
            const categoryName = (categoriesData.categoryDefaultNameEn + uuidv4()).slice(0, 15);
            await this.onClickCategoryCreateButton();
            await this.setDefaultCategoryName(categoryName);
            nameCategory = categoryName;

        } else{
            await this.onClickCategoryCreateButton();
            await this.setDefaultCategoryName(name);
            nameCategory= name;
        }


        return nameCategory;
    }

    async hasCategoryTableValues(hasValues: boolean) {

        await expect( async () => {
            await expect(this.categoryTable.locator('tr').last()).toBeVisible( {timeout:300} );
        }).toPass();

        if(hasValues){

            await expect( async () => {
                let rowCount = await this.categoryTable.locator('tr').count();
                expect(rowCount!).toEqual(1);
            }).toPass();

        } else{
            await expect( async () => {
                let rowCount = await this.categoryTable.locator('tr').count();
                expect(rowCount!).toEqual(0);
            }).toPass();
        }

    }

    async deleteCategoryBrandLevel(categoryName: string) {
        let categoryTableVisible: boolean;

        await this.page.waitForTimeout(1500);
        await expect(this.categoryTable).toBeEnabled();
        for(let i = 0; i < 60; i++){
            categoryTableVisible = await this.categoryTable.first().isVisible();
            if(categoryTableVisible){
                break;
            }            
            await this.page.waitForTimeout(300);
        }
        const rowCount = await this.categoryTable.locator('tr').count();

        for (let i = 0; i < rowCount; i++) {
            const columnText = await this.categoryTable.locator('tr').nth(i).locator('td').nth(0).innerText();
            if (columnText === categoryName) {
                await this.page.waitForTimeout(1000);
                await this.deleteBtn.nth(i).click();
                await this.deleteConfirmnBtn.click();
                break;
            }
        }
    }

    async deleteCategorySubBrandLevel(categoryName: string) {
        await this.page.waitForTimeout(1500);
        await expect(this.categoryTable).toBeEnabled();
        const rowCount = await this.categoryTable.locator('tr').count();
        let indexDeleteButton = 0;

        for (let i = 0; i < rowCount; i++) {
            const columnText = await this.categoryTable.locator('tr').nth(i).locator('td').nth(0).innerText();
            if (columnText === categoryName) {
                await this.deleteBtn.nth(indexDeleteButton).click();
                await this.deleteConfirmnBtn.click();
                break;
            }

            const isDeleteButton = await this.categoryTable.locator('tr').nth(i).locator('td').nth(3).locator('button[icon="pi pi-trash"]').isVisible();
            if(isDeleteButton) indexDeleteButton++;
        }
    }

    /**
     * Checks if a category exists with the page required
     * @param categoryName
     * @param pageName
     * @returns exists
     */
    async checkCategoryWithPageInTable(categoryName: string, pageName: string) {
        let rowCount: number;
        
        const commonModel = new CommonModel(this.page);

        commonModel.verifyThatLocatorIsVisible(this.categoryTable);

        for(let i = 0; i < 60; i++) {

            rowCount = await this.categoryTable.locator('tr').count();
            if(rowCount == 1){
                break;
            }

            await this.page.waitForTimeout(300);
        }
        

        let exists = false;

        for(let i = 0; i < rowCount!; i++) {
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
     * Verify thta the alert message is displayed
     */
    async verifyTheAlertMessageIsDisplayed(name: string){
        const commonModel = new CommonModel(this.page);

        let alertMessageVisible: boolean;
        let mensaje:string;

        for(let i = 0; i<60; i++){
            alertMessageVisible = await commonModel.existAlert.isVisible();
            if(alertMessageVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(alertMessageVisible!).toBeTruthy();

        
        mensaje = `There's already a category named "${name}" in this page`; 
        expect(await commonModel.existAlert.innerText()).toEqual(mensaje);

        await this.cancelBtn.click();

    }

    /**
     * Verify that a created category is not displayed on the categories table
     * @param categoryName 
     */
    async verifyThatTheCategoryIsNotDisplayed(categoryName: string){
        let categoryTableVisible: boolean;
        let categoryFound: boolean;

        for(let i = 0; i < 60; i++){
            categoryTableVisible = await this.categoryTable.isVisible();
            if(categoryTableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        

        const rowCount = await this.categoryTable.locator('tr').count();

        for (let i = 0; i < rowCount; i++) {
            const columnText = await this.categoryTable.locator('tr').nth(i).locator('td').nth(0).innerText();
            if (columnText === categoryName) {
                categoryFound = true;
                break;
            } else{
                categoryFound = false;
            }

            expect(categoryFound).toBeFalsy();
        }
    }

    /**
     * Verify that the error messages are displayed
     * @param message1 
     * @param message2 
     */
    async verifyThatTheRequiredErrorMessageIsDisplayed(message1: string, message2: string){
        const commonModel = new CommonModel(this.page);
        let errorMessageVisible: boolean;
        for(let i = 0; i < 60; i++){
            errorMessageVisible = await commonModel.existAlert.first().isVisible()
            if(errorMessageVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(await commonModel.existAlert.innerText()).toContain(message1);
        expect(await commonModel.fieldRequired.innerText()).toContain(message2);
    }

    /**
     * Open the pgae dropdown selection from the create category modal
     * @param index 
     */
    async setPageOption(index: number){
        await this.pageDropdown.click()
        await this.pageDropdownOptions.nth(index).click();
    }

    /**
     * get the page name from the dropdown menu in the category modal
     * @returns 
     */
    async getThePageName(){
        let pageDropdownVisible: boolean;
        let pageName: string;
        for(let i = 0; i < 60; i++){
            pageDropdownVisible = await this.pageDropdown.locator('span:nth-child(2)').isVisible();
            if(pageDropdownVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        pageName = await this.pageDropdown.locator('span:nth-child(2)').innerText();

        return pageName;
    }

    /**
     * Verify that the create category button is not displayed in the content module
     */
    async verifyThatCreateCategoryButtonIsNotDisplayed(){
        let createBtnVisible: boolean;
        for(let i = 0; i < 60; i++){
            createBtnVisible = await this.createBtn.isVisible();
            if(!createBtnVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(createBtnVisible!).toBeFalsy();
    }

    /**
     * Wait until the categoy name field is not displayed
     */
    async verifyThatCategoryNameFieldIsNotDisplayed(){

        await expect( async () => {
            await expect(this.categoryNameInput.first()).not.toBeVisible( {timeout:300} );
        }).toPass();
    }

    /**
     * Type the category name in the category name field from a dual language brand 
     * @param categoryName 
     * @param index 
     */
    async setDefaultCategoryNameDualLanguage(categoryName: string, index: number = 0) {
        let nameInputVisible: boolean;
        for(let i = 0; i < 60; i++){
            nameInputVisible = await this.categoryNameInput.nth(index).isVisible();
            if(nameInputVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(nameInputVisible!).toBeTruthy();
        await this.categoryNameInput.nth(index).clear();
        await this.categoryNameInput.nth(index).fill(categoryName);
    }

    /**
     * Verify that the categories table has no rows
     */
    async verifyCategoriesTableEmpty(){
        let categoryTableVisible: boolean;
        let categoryRows: number
        for (let i = 0; i < 70; i++) {
            categoryTableVisible = await this.categoryTable.locator('tr').first().isVisible();
            if (categoryTableVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        for (let i = 0; i < 70; i++) {
            categoryRows = await this.categoryTable.locator('tr').count();
            if (categoryRows == 0) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(categoryRows!).toEqual(0);
    }

    async onClickCategoryEditButton(categoryName: string){

        let categoryTableVisible: boolean;
        let rowCount:  number;
        for(let i = 0; i < 60; i++){
            categoryTableVisible = await this.categoryTable.locator('tr').first().isVisible();
            if(categoryTableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        rowCount = await this.categoryTable.locator('tr').count();
        for(let i = 0; i < rowCount; i++){
            const columnText = await this.categoryTable.locator('tr').nth(i).locator('td').nth(0).innerText();
            if (columnText === categoryName) {
                await this.editButton.nth(i).click();
                break;
            }
        }

    }

    /**
     * Wait for the create category button is not displayed
     */
    async verifyThatCreateCategoryIsNotDisplayed(){
        let createButtonVisible: boolean;
        for(let i = 0; i < 60; i++){
            createButtonVisible = await this.createBtn.isVisible();
            if(!createButtonVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(createButtonVisible!).toBeFalsy();
    }

    /**
     * Wait until the categoy name field is not displayed
     */
    async verifyThatCategoryNameFieldIsDisplayed(){
        let categoryNameInputVisible: boolean;
        for(let i = 0; i < 60; i++){
            categoryNameInputVisible = await this.categoryNameInput.first().isVisible();
            if(categoryNameInputVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(categoryNameInputVisible!).toBeTruthy();
    }


    /**
     * Verify that the created category message is displayed
     */
    async verifyThatThecratedCategoryMessageIsDisplayed(){
        const commonModel = new CommonModel(this.page);
        let messageVisible: boolean;
        for(let i = 0; i < 60; i++){
            messageVisible = await commonModel.snackbar.isVisible();
            if(messageVisible){
                break;
            }
        }
        expect(messageVisible!).toBeTruthy();

        expect(await commonModel.snackbar.innerText()).toContain(categoriesData.categoryCreatedSuccessfully);
    }

    /**
     * This fucntion verifies that the create category button is not visible
     */
    async verifyThatCreateCategoryButtonIsNotVisible(){

        await expect( async () => {
            await expect(this.createBtn).not.toBeVisible( {timeout:300} );
        }).toPass();
    }

    async ensureAtLeastOneBrowseCategoryExistsWithName(categoryName: string){
        let exists: boolean;
        exists = false;

        const commonModel = new CommonModel(this.page);
        const sideBar = new SidebarModel(this.page);
        await sideBar.onClickCategoriesOptionMenu();

        await expect(async () => {
            await expect(this.categoryTable).toBeVisible({timeout:300});
        }).toPass();
        
        let rowCount = await this.categoryTable.locator('tr').count();

        for(let i = 0; i < rowCount; i++){
            let text = await this.categoryTable.locator('tr').nth(i).locator('td:nth-child(1)').innerText();
            if(text.trim() == categoryName){
                exists = true;
                break;
            }
        }

        if(exists == false){
            await this.fillCategoryCreationForm(categoryName);
            await this.onClickCategorySaveButton();
            await commonModel.waitUntilSpinnerDisappears();
        }
    }

    /**
     * Verify thta the alert message is displayed
     */
    async verifyTheAlertMessageIsVisible(){
        const commonModel = new CommonModel(this.page);

        await expect(async () => {
            await expect(commonModel.existAlert).toBeVisible({timeout:300});
        }).toPass();
    }

}
