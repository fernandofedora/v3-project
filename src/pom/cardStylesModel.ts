import { Locator, Page, expect } from '@playwright/test';
import { CommonModel } from './commonModel';
import { cardStyleData } from '../data/cardStylesData';
import exp from 'constants';

export class CardStylesModel {
    
    readonly page: Page;
    readonly createCardButton: Locator;
    readonly nameInput: Locator;
    readonly valueInput: Locator;
    readonly saveButton: Locator;
    readonly cardStyleTable: Locator;
    readonly yesButton: Locator;
    readonly errorMessage: Locator;
    readonly noButton: Locator;
    readonly defaultCardStyleToggle: Locator;
    readonly cancelButton: Locator;
    readonly brandTable: Locator;
    readonly nodeCardStylesField: Locator;
    readonly cardStylesNodeMenu: Locator;
    
    

    constructor (page: Page) {
        this.page = page;
        this.createCardButton = page.locator('div.dh-detail-page__wrapper dh-button > div.dh-button');
        this.nameInput = page.locator('mat-dialog-container div input[formcontrolname="name"]');
        this.valueInput = page.locator('mat-dialog-container div input[formcontrolname="value"]');
        this.saveButton = page.locator('button > span:text-is("Save")');
        this.cardStyleTable = page.locator('p-table table tbody');
        this.yesButton = page.locator('button > span:text-is("Yes")');
        this.errorMessage = page.locator('app-error-messages');
        this.noButton = page.locator('button > span:text-is("No")');
        this.defaultCardStyleToggle = page.locator('mat-dialog-container mat-slide-toggle[formcontrolname="default"]');
        this.cancelButton = page.locator('button > span:text-is("Cancel")');
        this.brandTable = page.locator('p-table table tbody');
        this.nodeCardStylesField = page.locator('p-multiselect[formcontrolname="cardStyles"] > div');
        this.cardStylesNodeMenu = page.locator('div.ng-trigger-overlayContentAnimation div.p-multiselect-items-wrapper');
    }


    /**
     *  Verify that the card name field is displayed
     */
    async waitNameFieldIsDisplayed(){
        let isVisible: boolean;

        for(let i = 0; i < 60; i++){
            isVisible = await this.nameInput.isVisible();
            if(isVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(isVisible!).toBe(true);
    }


    /**
     * Verify that the new card style is created and displayed
     */
    async verifyCardStyleIsCreated(name: string){
        let cardStyleVisible: boolean;

        for(let i = 0; i < 60; i++){
            cardStyleVisible = await this.cardStyleTable.locator('tr').filter({hasText: `${name}`}).isVisible();
            if(cardStyleVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(cardStyleVisible!).toBe(true);
    }

    /**
     * Delete a specific card style 
     * @param name 
     */
    async deleteCardStyle(name: string){
        await this.cardStyleTable.locator('tr').filter({hasText: `${name}`}).getByTitle('Delete Card Styles').click();
        await this.yesButton.click();
        await this.page.waitForTimeout(1000);
    }

    /**
     * Click the edit button from a specific card
     * @param name 
     */
    async clickEditButton(name: string | null){
        let nodeIsVisible: boolean;
        for(let i = 0; i < 60; i++){
            nodeIsVisible = await this.cardStyleTable.locator('tr').filter({hasText: `${name}`}).getByTitle('Edit Card Styles').isVisible();
            if(nodeIsVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.cardStyleTable.locator('tr').filter({hasText: `${name}`}).getByTitle('Edit Card Styles').click();
    }


    async verifyThatTheValueFieldUpdated(name: string, value: string){
        let cardStyleVisible: boolean;
        let text: string| null;
        for(let i = 0; i < 60; i++){
            cardStyleVisible = await this.cardStyleTable.locator('tr').filter({hasText: `${name}`}).isVisible();
            if(cardStyleVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(cardStyleVisible!).toBe(true);
        for(let i = 0; i < 60; i++){
            text = await this.cardStyleTable.locator('tr').filter({hasText: `${name}`}).locator('td:nth-child(2)').textContent();
            if(text == value){
                break
            }
            await this.page.waitForTimeout(300);
        }
        expect(text!).toEqual(value);

    }

    /**
     * Verify that the error message is displayed
     * @param message 
     */
    async verifyThatTheErrorMessageIsDisplayed(message: string){
        let errorMessageVisible: boolean;
        for(let i = 0; i < 60; i++){
            errorMessageVisible = await this.errorMessage.isVisible();
            if(errorMessageVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        let errormessageValue = await this.errorMessage.textContent();
        expect(errormessageValue).toEqual(message);
    }

    /**
     * Verify thta the both error messages are displayed
     */
    async verifyThatTheErrorMessagesAreDisplayed(){
        let errorMessageVisible: boolean;
        for(let i = 0; i < 60; i++){
            errorMessageVisible = await this.errorMessage.isVisible();
            if(errorMessageVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        let errormessageValue = await this.errorMessage.textContent();
        expect(errormessageValue).toContain('Name is required.');
        expect(errormessageValue).toContain('Value is required.');
    }


    /**
     * Verify that the new card style is created and displayed
     */
    async verifyCardStyleIsDeleted(name: string){
        let cardStyleVisible: boolean;

        for(let i = 0; i < 60; i++){
            cardStyleVisible = await this.cardStyleTable.locator('tr').filter({hasText: `${name}`}).isVisible();
            if(!cardStyleVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(cardStyleVisible!).toBe(false);
    }


    /**
     * Verify that the creaated card style message is displayed
     */
    async verifyCreatedCardStyleMessageIsDisplayed(){
        let snackBarVisible: boolean;

        const commonModel = new CommonModel(this.page);
        for(let i = 0; i < 60; i++){
            snackBarVisible = await commonModel.snackbar.isVisible();
            if(snackBarVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        let snackBarText = (await commonModel.snackbar.textContent())?.trim();
        expect(snackBarText).toEqual(cardStyleData.createdSuccessfullyMsg);
    }



    /**
     * Verify that the creaated card style message is displayed
     */
    async verifyDeletedCardStyleMessageIsDisplayed(title: string){
        let snackBarVisible: boolean;

        let message = title + " was deleted successfully!";
        const commonModel = new CommonModel(this.page);
        for(let i = 0; i < 60; i++){
            snackBarVisible = await commonModel.snackbar.isVisible();
            if(snackBarVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        let snackBarText = (await commonModel.snackbar.textContent())?.trim();
        expect(snackBarText).toEqual(message);
    }


    /**
     * Count the rows from the card style table
     * @param rowQuantity 
     */
    async rowCount(rowQuantity: number){
        let rowCount: number;
        for(let i = 0; i < 60; i++){
            rowCount = await this.cardStyleTable.locator('tr').count();
            if(rowCount == rowQuantity){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(rowCount!).toEqual(rowQuantity);
    }


    /**
     * Cancel delete action to a specific card style 
     * @param name 
     */
    async cancelDeleteCardStyle(name: string){
        let noButtonVisible: boolean;
        await this.cardStyleTable.locator('tr').filter({hasText: `${name}`}).getByTitle('Delete Card Styles').click();
        await this.noButton.click();
        for(let i = 0; i < 60; i++){
            noButtonVisible = await this.noButton.isVisible();
            if(!noButtonVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(noButtonVisible!).toBe(false);
    }


    /**
     * If the card style doesnt exist is created
     * @param name 
     */
    async ensureCardStyleRequiredExists(name: string){
        let styleVisible = false;
        let counter = 0;

        for(let i = 0; i < 60; i++){
            styleVisible = await this.cardStyleTable.locator("tr").locator("td:nth-child(1)").filter({hasText: `${name}`}).isVisible();
            if(styleVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
      

        if(!styleVisible){
            await this.createCardButton.click();
            await this.waitNameFieldIsDisplayed();
            await this.nameInput.fill(name);
            await this.valueInput.fill(name);
            await this.saveButton.click();
            await this.verifyThatSaveButtonIsNotDisplayed();
        }
    }


    /**
     * Verify the toogle button is displayed and get the value
     * @returns 
     */
    async verifyTheTooglebuttonIsDisplayed(){
        let toggleVisible: boolean;

        for(let i = 0; i < 60; i++){
            toggleVisible = await this.defaultCardStyleToggle.locator('button').isVisible();
            if(toggleVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
        let isChecked = await this.defaultCardStyleToggle.locator('button').getAttribute('aria-checked');
        return isChecked;
    }


    /**
     * Get all the values from the card styles tables
     * @returns 
     */
    async getCardStyleWithDefaultValue(){
        let cardStylesTableVisible: boolean;
        let cardStyles: {name: string | null, value:string | null}[] = [];

        for(let i = 0; i < 60; i++){
            cardStylesTableVisible = await this.cardStyleTable.first().isVisible();
            if(cardStylesTableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        let rowCount = await this.cardStyleTable.locator('tr').count();

        for(let i = 0; i < rowCount; i++) {
            let cardStyle = {
                name: await this.cardStyleTable.locator('tr').nth(i).locator('td').nth(0).textContent(),
                value: await this.cardStyleTable.locator('tr').nth(i).locator('td').nth(1).textContent()
            };
            cardStyles.push(cardStyle);
        }

        return cardStyles;
    }


    /**
     * verify that the brand table has values
     */
    async hasBrandTableValues(){
        let brandTableVisible: boolean;

        for(let i = 0; i< 60; i++ ){
            brandTableVisible = await this.brandTable.locator('tr').first().isVisible();
            if(brandTableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        const rowCount = await this.brandTable.locator('tr').count();
        expect(rowCount).toBeGreaterThan(0);
    }


    /**
     * Click the manage node button from a specfic brand 
     */
    async goToManageNodes(brandName: string){
        let brandVisible: boolean;

        for(let i = 0; i < 60; i++){
            brandVisible = await this.cardStyleTable.locator("tr").locator("td:nth-child(1)").getByText(`${brandName}`, {exact: true}).isVisible();
            if(brandVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.cardStyleTable.locator("tr").locator("td:nth-child(1)").getByText(`${brandName}`, {exact: true}).click();

    }

    /**
     * Click the edit node button 
     * @param nodeName 
     */
    async openEditNodePopup(nodeName: string){
        let brandVisible: boolean;
        for(let i = 0; i < 60; i++){
            brandVisible = await this.cardStyleTable.locator("tr").locator("td:nth-child(1)").getByText(`${nodeName}`, {exact: true}).isVisible();
            if(brandVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.page.getByTitle('Edit Brand Node').click();
    }


    async verifyStyleCardsAreDisplayedForTheNode(stylesCards: {name: string | null, value:string | null}[]){
        let styleCardMenuVisible: boolean;
        let cardStyleListNames = new Array();
        let cardStylesReceived = new Array();

        for(let i = 0; i < 60; i++){
            styleCardMenuVisible = await this.nodeCardStylesField.isVisible();
            if(styleCardMenuVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.nodeCardStylesField.click();
        await this.page.waitForTimeout(1000);
        for(let i = 0; i < 60; i++) {
            let isVisible = await this.cardStylesNodeMenu.locator('ul').locator('li').nth(0).isVisible();
            if(isVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        await this.page.waitForTimeout(2000);
        let cardStylesCount = await this.cardStylesNodeMenu.locator('ul').locator('li').count();

        for(let i = 0; i < cardStylesCount; i++){
            let cardStyleName = await this.cardStylesNodeMenu.locator('ul').locator('li').nth(i).textContent();
            cardStyleListNames.push(cardStyleName);
        }

        let cardStyleNameLenght = cardStyleListNames.length;
        let cardStylesCardsLenght = stylesCards.length;
        expect(cardStyleNameLenght).toBeLessThanOrEqual(cardStylesCardsLenght);
        stylesCards.forEach(function(obj){
            cardStylesReceived.push(obj.name);
        });

        for(let i = 0; i < cardStyleNameLenght; i++) {
            let name = cardStyleListNames[i];
            let name2 = cardStylesReceived[i];
            expect(name).toEqual(name2);
        }

    }


    async getFirstNotDefaultCardStyle(){
        let cardStyleVisible: boolean;
        for(let i = 0; i < 60; i++){
            cardStyleVisible = await this.cardStyleTable.locator('tr').first().isVisible();
            if(cardStyleVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        const rowCount = await this.cardStyleTable.locator('tr').count();
        let cardStyle: {name: string | null, value:string | null};

        for(let i = 0; i < rowCount; i++) {
            let isNotDefaultExists = await this.cardStyleTable.locator('tr').nth(i).locator('td').nth(2).textContent();
            if(isNotDefaultExists == "false"){
                cardStyle = {
                    name: await this.cardStyleTable.locator('tr').nth(i).locator('td').nth(0).textContent(),
                    value: await this.cardStyleTable.locator('tr').nth(i).locator('td').nth(1).textContent()
                };

            }
        }

        return cardStyle!;
    }

    async onClickNodeSaveButton(){
        await this.page.setViewportSize({ width: 1980, height: 1024 });
        await this.saveButton.scrollIntoViewIfNeeded();
        await this.saveButton.click();
    }


    async verifyThatCreateCardButtonIsVisible(){
        let createCardButtonVisible: boolean;

        for(let i = 0; i < 60; i++){
            createCardButtonVisible = await this.createCardButton.isVisible();
            if(createCardButtonVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.createCardButton.click();
    }

    async verifyThatSaveButtonIsNotDisplayed(){
        let isVisible: boolean;

        for(let i = 0; i < 60; i++){
            isVisible = await this.saveButton.isVisible();
            if (!isVisible) {
                break;
            }

            await this.page.waitForTimeout(300);
        }
        
        expect(isVisible!).toBeFalsy();
        
    }
}