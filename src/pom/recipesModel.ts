import {expect, Locator, Page} from '@playwright/test';
import { CommonModel } from '../pom/commonModel';
import moment from 'moment';

export class Recipesmodel {

    readonly page: Page;
    readonly createRecipebutton: Locator;
    readonly nameField: Locator;
    readonly cookTimeField: Locator;
    readonly prepTimeField: Locator;
    readonly servesfield: Locator;
    readonly mediaTypeMenu: Locator;
    readonly mediaDropdownList: Locator;
    readonly selectImageButton: Locator;
    readonly saveImageButton: Locator;
    readonly saveRecipeButton: Locator;
    readonly recipeTable: Locator;
    readonly recipeReviewImg: Locator;
    readonly yesButton: Locator;
    readonly addNewInstructionButton: Locator;
    readonly noButton: Locator;
    readonly textAreaInstruction: Locator;
    readonly checkInstructionButton: Locator;
    readonly instructionsList: Locator;
    readonly notesHeader: Locator;
    readonly addNoteButton: Locator;
    readonly noteTextArea: Locator;
    readonly checkNoteButton: Locator;
    readonly noteField: Locator;
    readonly deleteNotebutton: Locator;
    readonly ingredientsHeader: Locator;
    readonly addNewIngredientButton: Locator;
    readonly ingredientTitleField: Locator;
    readonly ingredientDescriptionField: Locator;
    readonly ingredientQuantityField: Locator;
    readonly saveIngredientButton: Locator;
    readonly ingredientsTable: Locator;
    readonly mapAllButton: Locator;
    readonly storeMapTable: Locator;
    readonly mapToCardButtonOnIngredient: Locator;
    readonly dropdownDealTypeIngredient: Locator;
    readonly priceField: Locator;
    readonly unitsField: Locator;
    readonly imageLocationField: Locator;
    readonly linkField: Locator;
    readonly mediaSizeDropdownMenu: Locator;
    readonly cardStyleDropdownMenu: Locator;
    readonly cancelIngredientButton: Locator;
    readonly upcFieldIngredient: Locator;
    readonly uploadImageButton: Locator;
    readonly chooseImageButton: Locator;
    readonly saveImageButton2: Locator;
    readonly buyQuantityField: Locator;
    readonly getQuantityField: Locator;
    readonly getDealField: Locator;
    readonly buyForQuantityField: Locator;
    readonly expiresDateSwith: Locator;
    readonly startsOnField: Locator;
    readonly expiresField: Locator;
    readonly errorMessage: Locator;
    readonly videoIdField: Locator;
    readonly videoTypeMenu: Locator;
    readonly youTubeType: Locator;
    readonly vimeoType: Locator;
    readonly cancelInstructionButton: Locator;
    readonly cancelNoteButton: Locator;
    readonly ingredientTable: Locator;
    readonly titleRequiredErrorMessage: Locator;
    readonly quantityErrorMessage: Locator;
    readonly mapToCard: Locator;
    readonly mapToCardToogle: Locator;
    readonly dealTypeDropdown: Locator;
    readonly confirmDeleteActionButton: Locator;
    readonly cancelDeleteActionbutton: Locator;
    readonly forQuantityField: Locator;
    readonly forPriceField: Locator;
    readonly forUnitsField: Locator;
    readonly monetaryRadioButton: Locator;
    readonly amountOffInputField: Locator;
    readonly porcentRadioButton: Locator;
    readonly expiresDateField: Locator;
    readonly todayButton: Locator;
    readonly nextWeekButton: Locator;
    readonly resetButton: Locator;
    readonly confirmDeleteIngredientButton: Locator;
    readonly imageMediaField: Locator;
    readonly imageMediaRecipePreview: Locator;
    readonly storeToogleButton: Locator;
    readonly searchBar: Locator;
    readonly instructionField: Locator;
    readonly ingredientErrorMessage: Locator;
    readonly ingredientSearchBar: Locator;
    readonly recipePreviewContainer: Locator;
    readonly recipePreviewImage: Locator;
    readonly recipePreviewName: Locator;
    readonly closePreviewIcon: Locator;
    readonly mediaSizeDropdownOption: Locator;
    readonly manageMediaImageModal: Locator;

    constructor(page :Page){
        this.page = page;
        this.createRecipebutton = page.locator('dh-button').filter({ hasText: 'Create Recipe' });
        this.nameField = page.locator('input[placeholder = "Name"]');
        this.cookTimeField = page.locator('input[placeholder = "Cook Time"]');
        this.prepTimeField = page.locator('input[placeholder = "Prep Time"]');
        this.servesfield = page.locator('input[placeholder = "Serves"]');
        this.mediaTypeMenu = page.locator('#media-type-input');
        this.mediaDropdownList = page.locator('div.p-dropdown-items-wrapper li');
        this.selectImageButton = page.locator('button[aria-label="Select"]');
        this.saveImageButton = page.locator('mat-dialog-actions button > span:text-is("Save")');
        this.saveRecipeButton = page.locator('div.p-toolbar-group-right > button > span:text-is("Save")');
        this.recipeTable = page.locator('app-recipes > dh-detail-page > div > div:nth-child(2) > p-table table tbody:nth-child(2)');
        this.recipeReviewImg = page.locator('app-recipe-preview div.header-container img');
        this.yesButton = page.locator('button > span:text-is("Yes")');
        this.addNewInstructionButton = page.locator('app-reorderable-list-editor > div > button[color="primary"]');
        this.noButton = page.locator('button > span:text-is("No")');
        this.textAreaInstruction = page.locator('#edit-0');
        this.checkInstructionButton = page.locator('div.reorderable-list-editor-item__edit-form.ng-star-inserted > div > button:nth-child(1)');
        this.instructionsList = page.locator('div.cdk-drop-list.reorderable-list-editor');
        this.notesHeader = page.locator('div span:text-is("Notes")');
        this.addNoteButton = page.locator('mat-tab-body:nth-child(3) button.reorderable-list-editor__add-button');
        this.noteTextArea = page.locator('mat-tab-body:nth-child(3) textarea.reorderable-list-editor-item__text-area');
        this.checkNoteButton = page.locator('mat-tab-body:nth-child(3) div.reorderable-list-editor-item__edit-form button.mat-primary');
        this.noteField = page.locator('app-reorderable-list-editor div.reorderable-list-editor-item');
        this.deleteNotebutton = page.locator('app-reorderable-list-editor button.mat-warn');
        this.ingredientsHeader = page.locator('div span:text-is("Ingredients")');
        this.addNewIngredientButton = page.locator('#create-btn');
        this.ingredientTitleField = page.locator('input[formcontrolname="title"]');
        this.ingredientDescriptionField = page.locator('input[formcontrolname="description"]');
        this.ingredientQuantityField = page.locator('form > mat-form-field input[formcontrolname="quantity"]');
        this.saveIngredientButton = page.locator('app-recipe-ingredients-form button > span:text-is("Save")');
        this.ingredientsTable = page.locator('app-recipe-ingredients table tbody');
        this.mapAllButton = page.locator('button span:text-is("Map All")');
        this.storeMapTable = page.locator('app-recipe-stores-map table tbody');
        this.mapToCardButtonOnIngredient = page.locator('app-recipe-ingredients-form mat-slide-toggle button');
        this.dropdownDealTypeIngredient = page.locator('app-deal-form-control select');
        this.priceField = page.locator('app-deal-form-control input[formcontrolname~="price"]');
        this.unitsField = page.locator('input[placeholder~="Units"]');
        this.imageLocationField = page.locator('#media-path');
        this.linkField = page.locator('input[formcontrolname="clickHref"]');
        this.mediaSizeDropdownMenu = page.locator('p-dropdown[id="media-size-input"] > div > span');
        this.cardStyleDropdownMenu = page.locator('select[formcontrolname="cardStyleHash"]');
        this.upcFieldIngredient = page.locator('#upc-input');
        this.cancelIngredientButton = page.locator('button span:text-is("Cancel")');
        this.uploadImageButton = page.locator('span > i[aria-label="Select"]');
        this.chooseImageButton = page.locator('span[class="p-button-label"]');
        this.saveImageButton2 = page.locator('div[role="complementary"] button > span:text-is("Save")');
        this.buyQuantityField = page.locator('app-deal-form-control input[placeholder*="X - Buy Quantity"]');
        this.getQuantityField = page.locator('app-deal-form-control input[formcontrolname="getQuantity"]');
        this.getDealField = page.locator('app-deal-form-control input[formcontrolname="getDeal"]');
        this.buyForQuantityField = page.locator('app-deal-form-control input[placeholder*="Quantity"]');
        this.expiresDateSwith = page.locator('app-recipe-form mat-slide-toggle');
        this.startsOnField = page.locator('app-datetime-picker[label="Starts on"] input');
        this.expiresField = page.locator('app-datetime-picker[label="Expires"] input');
        this.errorMessage = page.locator('app-alert > ul > li');
        this.videoIdField = page.locator('#video-id-input');
        this.videoTypeMenu = page.locator('#vide-type-input');
        this.youTubeType = page.locator('li[aria-label="Youtube"]');
        this.vimeoType = page.locator('li[aria-label="Vimeo"]');
        this.cancelInstructionButton = page.locator('div.reorderable-list-editor-item__edit-form.ng-star-inserted > div > button:nth-child(2)');
        this.cancelNoteButton = page.locator('button[color="warn"]');
        this.ingredientTable = page.locator('app-recipe-ingredients tbody');
        this.titleRequiredErrorMessage = page.locator('app-error-messages ul');
        this.quantityErrorMessage = page.locator('app-error-messages li');
        this.mapToCard = page.locator('app-recipe-ingredients-form mat-slide-toggle[formcontrolname="mapToCard"] button');
        this.mapToCardToogle = page.locator('app-recipe-ingredients-form mat-slide-toggle[formcontrolname="mapToCard"] button');
        this.dealTypeDropdown = page.locator('app-deal-form-control > div > mat-form-field > div > div:nth-child(2) > div > select');
        this.confirmDeleteActionButton = page.locator('button.confirm-btn');
        this.cancelDeleteActionbutton = page.locator('button.cancel-btn');
        this.forQuantityField = page.locator('app-deal-form-control input[formcontrolname="quantity"]');
        this.forPriceField = page.locator('app-deal-form-control input[formcontrolname="price"]');
        this.forUnitsField = page.locator('app-deal-form-control input[formcontrolname="units"]');
        this.monetaryRadioButton = page.locator('mat-radio-button[value~="monetary"]');
        this.amountOffInputField = page.locator('app-deal-form-control input[formcontrolname*="price"]');
        this.porcentRadioButton = page.locator('mat-radio-button[value~="percent"]');
        this.expiresDateField = page.locator('app-datetime-picker:nth-child(2) input.p-inputtext.datepick-inputfield');
        this.todayButton = page.locator('button[title="Today"]');
        this.nextWeekButton = page.locator('button[title="Next week"]');
        this.resetButton = page.locator('button[title="Reset"]');
        this.confirmDeleteIngredientButton = page.locator('app-confirmation-dialog > div > button[class*="confirm-btn"]');
        this.imageMediaField = page.locator('app-input-dh-media input');
        this.imageMediaRecipePreview = page.locator('app-recipe-preview img');
        this.storeToogleButton = page.locator('tbody mat-slide-toggle');
        this.searchBar = page.locator('div.p-inputgroup input.p-inputtext.p-component');
        this.instructionField = page.locator('div[class*="cdk-drag reorderable-list-editor-item"]');
        this.ingredientErrorMessage = page.locator('app-error-messages > app-alert > ul > li');
        this.ingredientSearchBar = page.locator('input[placeholder="Search..."]');
        this.recipePreviewContainer = page.locator('div[role="complementary"]');
        this.recipePreviewImage = page.locator('div[role="complementary"] > div:nth-child(2) div[class=header-container] img');
        this.recipePreviewName = page.locator('div[role="complementary"] > div:nth-child(2) div[class=header-container] div');
        this.closePreviewIcon = page.locator('div[role="complementary"] button.p-sidebar-close');
        this.mediaSizeDropdownOption = page.locator('div.ng-trigger-overlayContentAnimation div.p-dropdown-items-wrapper ul p-dropdownitem li');
        this.manageMediaImageModal = page.locator('app-input-dh-media-dialog');
    }


    /**
     * Click a category for a new content
     * @param index 
     */
    async selectMediaType(type: string){
        let index = 0;
        const listItems = await this.mediaDropdownList.count();
        for(let i = 0; i < listItems; i++){
            let text = await this.mediaDropdownList.nth(i).textContent();
            if(text == type){
                index = i;
                break;
            }
        }

        await this.mediaDropdownList.nth(index).click();
    }


    async uploadRecipeImage(image: string[]){
        let chooseImgInput = 'p-fileupload input[type="file"]';
        await this.page.setInputFiles(chooseImgInput, image);
    }

    async verifyCreatedAlertMessage(message: string) {
        const common = new CommonModel(this.page);
        let isVisible: boolean;

        for(let i = 0; i < 60; i++){
            isVisible = await common.snackbar.isVisible();
            if(isVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        let text = await common.snackbar.textContent();
        expect(text).toContain(message);
    }

    async verifyTheNewRecipeIsCreated(title: string){
        let recipeTableVisible: boolean;
        let newRecipeVisible: boolean;

        for(let i = 0; i < 60; i++){
            recipeTableVisible = await this.recipeTable.isVisible();
            if(recipeTableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        for(let i = 0; i < 60; i++){
            newRecipeVisible = await this.recipeTable.locator(`tr td:text("${title}")`).isVisible();
            if(newRecipeVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
        expect(newRecipeVisible!).toBeTruthy();
    }

    async clickTheEditRecipe(title: string){
        let tableVisible: boolean;

        await this.page.waitForTimeout(2000);

        for(let i = 0; i < 60; i++){
            tableVisible = await this.recipeTable.locator('tr').locator(`button[title="Edit"]:right-of(td:text("${title}"))`).isVisible();
            if(tableVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }
        
        const editButton = this.recipeTable.locator('tr').locator(`button[title="Edit"]:right-of(td:text("${title}"))`);
        await editButton.click({delay:2000});
    }


    async verifyImageIspresent(){
        let srcText: string | null;
        let srcTextLenght: number | undefined;

        for(let i = 0; i < 60; i++){
            srcText = await this.recipeReviewImg.getAttribute('src');
            srcTextLenght = srcText?.length;
            if(srcText?.length != undefined || srcText?.length != 0){
                break;
            }

            await this.page.waitForTimeout(300);
        }
        
        expect(srcText!).not.toContain('assets/images/default-img.jpg');
    }

    async deleteRecipe(title: string){

        const common = new CommonModel(this.page);
        let newRecipeVisible: boolean;

        for(let i = 0; i < 60; i++){

            newRecipeVisible = await this.recipeTable.locator(`tr td:text("${title}")`).isVisible();
            if(newRecipeVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
        expect(newRecipeVisible!).toBeTruthy();
        
        const deleteButton = this.recipeTable.locator('tr').locator(`button[title="Delete"]:right-of(td:text-is("${title}"))`);
        await expect(deleteButton).toBeVisible();
        await deleteButton.click();
        await expect(this.yesButton).toBeVisible();
        await this.noButton.hover();
        await this.yesButton.hover();
        await this.noButton.hover();
        await this.yesButton.hover();
        await this.yesButton.click();
        await common.waitUntilSpinnerDisappears();
        let recipeVisible: boolean;
        for(let i = 0; i < 60; i++){
            recipeVisible = await this.recipeTable.locator('tr').locator(`td:text("${title}")`).isVisible();
            if(!recipeVisible){
                break;
            }
            await this.page.waitForTimeout(400);
        }
        
        expect(recipeVisible!).toBeFalsy();
    }

    async clickDeleteIngredientButton(title: string){
        await this.ingredientsTable.first().waitFor();
        const ingredientDeleteButton = this.ingredientsTable.locator('tr').locator(`button.delete-btn:right-of(td:text("${title}"))`);
        await expect(ingredientDeleteButton).toBeVisible();
        await ingredientDeleteButton.click();
        await this.yesButton.click();
        await expect(ingredientDeleteButton).not.toBeVisible();
    }

    async verifyDeletedAlertMessage(title: string) {
        const common = new CommonModel(this.page);
        for(let i = 0; i < 60; i++){
            let snackBarVisible = await common.snackbar.isHidden();
            if(snackBarVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
        let text = await common.snackbar.textContent();
        let message = title + " was deleted successfully!";
        expect(text).toStrictEqual(message);
    }

    async clickStoreGroupsButtonFromaRecipe(title: string){
        await this.recipeTable.first().waitFor();
        const mapStoreButton = this.recipeTable.locator('tr').locator(`button[title="Map Stores"]:right-of(td:text("${title}"))`);
        await expect(mapStoreButton).toBeVisible();
        mapStoreButton.click();
    }

    async clickFirstToogleMapButton(){
        const common = new CommonModel(this.page);
        await this.storeMapTable.first().waitFor();
        const toogleButton = this.storeMapTable.locator('tr').nth(0).locator('mat-slide-toggle');
        await common.waitUntilSpinnerDisappears();
        expect(toogleButton).toBeVisible();
        toogleButton.click();
    }

    async verifyTheFirstToogleIsActive(){
        await this.storeMapTable.first().waitFor();
        await this.page.waitForTimeout(1000);
        const toogleButtonActive = await this.storeMapTable.locator('tr').nth(0).locator('mat-slide-toggle').locator('button').getAttribute('aria-checked');
        expect(toogleButtonActive).toBeTruthy();
    }

    async verifyMapToCardIngredientIsActive(){
        await this.page.waitForTimeout(1000);
        const toogleButtonActive = await this.mapToCardButtonOnIngredient.getAttribute('aria-checked');
        expect(toogleButtonActive).toBeTruthy();
    }


    /**
     * Click a category for a new content
     * @param index 
     */
    async selectMediaSize(type: string){
        let index = 0;
        const listItems = await this.mediaDropdownList.count();
        for(let i = 0; i < listItems; i++){
            let text = await this.mediaDropdownList.nth(i).textContent();
            if(text == type){
                index = i;
                break;
            }
        }

        await this.mediaDropdownList.nth(index).click();
    }


    async clickEditButtonFromaRecipe(title: string){
        await this.ingredientsTable.first().waitFor();
        const ingredientEditButton = this.ingredientsTable.locator('tr').locator(`button.edit-btn:right-of(td:text("${title}"))`);
        await expect(ingredientEditButton).toBeVisible();
        ingredientEditButton.click();
    }

    async getStartDateAndExpiresDate(){
        let startDateData: string;
        let expireDateData: string;

        for(let i = 0; i < 60; i++){
            startDateData = await this.startsOnField.innerText();
            expireDateData = await this.expiresField.innerText();
            if(startDateData.length > 0 &&  expireDateData.length > 0){
                break;
            }
            await this.page.waitForTimeout(300);
        }
  
        return [startDateData!, expireDateData!]
    }

    /**
     * This function verify if the error message displayed is the expected message
     * @param {string} message message to be evaluated
     */
    async verifyErrorMessage(message: string){
        let errorMessageIsVisible: boolean;
        let text: string;

        for(let i = 0; i < 60; i++){
            errorMessageIsVisible = await this.errorMessage.isVisible();
            if(errorMessageIsVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
        for(let i = 0; i < 60; i++){
            text = (await this.errorMessage.innerText()).trim();
            if(text == message){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
        expect(text!).toEqual(message);
    }


    async doubleClickInstruction(text: string){
        await this.instructionsList.locator(`div:text-is("${text}")`).dblclick();
    }

    /**
     * This function performs a double click action using the text from a note to locate it inside the notes table
     * @param {string} text
     */
    async doubleClickNote(text: string){
    await this.noteField.locator(`span:text-is("${text}")`).dblclick();
    }

    /**
     * This function searches a note and verifies the note not exists in the notes table
     * @param {string} text text from a note
     */
    async verifyIfNoteNoExist(text: string){
        let noteIsVisible: boolean;

        for(let i = 0; i < 60; i++){
            noteIsVisible = await this.noteField.locator(`span:text-is("${text}")`).isVisible();
            if(!noteIsVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
        expect(noteIsVisible!).toBeFalsy();
    }


    /**
     * This function clicks the delete button from a note
     * @param {*} text text from a note
     */
    async clickDeleteNoteButton(text: string){
        await this.noteField.locator('button').click();
    }


    /**
     * This function clicks the edit button from a specific ingredient
     * @param {string} text
     */
    async clickIngredientEditButton(text: string){
        await this.ingredientTable.locator('tr').filter({hasText: `${text}`}).locator('td').locator('button.edit-btn').click();
    }

    async waitIngredientModalVisible(){
        let ingredientTitleFieldVisible: boolean;
        let ingredientDescriptionFieldVisible: boolean;
        let ingredientQuantityFieldVisible: boolean;
        for(let i = 0; i < 60; i++){
            ingredientTitleFieldVisible = await this.ingredientTitleField.isVisible()
            ingredientDescriptionFieldVisible = await this.ingredientDescriptionField.isVisible();
            ingredientQuantityFieldVisible = await this.ingredientQuantityField.isVisible();

            if(ingredientTitleFieldVisible && ingredientDescriptionFieldVisible && ingredientQuantityFieldVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }


    }

    /**
     * This function verifies that a specific ingredient is not in the ingredients table
     * @param {string} text
     */
    async verifyIngredientNotCreated(text: string){
        let ingredientTableRowVisible: boolean;

        for(let i = 0; i < 60; i++){
            ingredientTableRowVisible = await this.ingredientTable.locator('tr').filter({hasText: `${text}`}).isVisible();
            if(!ingredientTableRowVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(ingredientTableRowVisible!).toBeFalsy();

    }


    /**
     * This function verifies fi the title is required error message is displayed
     */
    async verifyTitleRequiredErrorMessageIsDisplayed(){
        let titleRequiredErrorMessageVisible: boolean;
        for(let i = 0; i < 60; i++){
            titleRequiredErrorMessageVisible = await this.titleRequiredErrorMessage.locator('li').isVisible();
            if(titleRequiredErrorMessageVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
        expect(await this.titleRequiredErrorMessage.innerText()).toEqual("Title is required.");
    }


    /**
     * This function verifies that a specific ingredient is not in the ingredients table
     * @param {string} text
     */
    async verifyIngredientCreated(text: string){
        let ingredientTableRowVisible: boolean;

        for(let i = 0; i < 60; i++){
            ingredientTableRowVisible = await this.ingredientTable.locator('tr').filter({hasText: `${text}`}).isVisible();
            if(ingredientTableRowVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(ingredientTableRowVisible!).toBeTruthy();

    }


    /**
     * This function verifies if the quantity error message is displayed
     */
    async verifyQuantityErrorMessageIsDisplayed(){
        let quantityErrorMessageVisible: boolean;

        for(let i = 0; i < 60; i++){
            quantityErrorMessageVisible = await this.quantityErrorMessage.isVisible();
            if(quantityErrorMessageVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(await this.quantityErrorMessage.innerText()).toEqual("Quantity is required.");
    }

    /**
     * This fucntion verifies that the deal type dropdown is visible 
     */
    async verifyDealTypeDropdownIsVisible(){
        let dealTypeDropdownVisible: boolean;

        for(let i = 0; i < 60; i++){
            dealTypeDropdownVisible = await this.dealTypeDropdown.isVisible();
            if(dealTypeDropdownVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(dealTypeDropdownVisible!).toBeTruthy();
    }

    /**
     * This function verifies that the price field is visible
     */
    async verifyPriceFieldIsVisible(){
        let priceFieldVisible: boolean;

        for(let i = 0; i < 60; i++){
            priceFieldVisible = await this.priceField.isVisible();
            if(priceFieldVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(priceFieldVisible!).toBeTruthy();
    }

    /**
     * This function verifies that the unis field is visible
     */
    async verifyUnitsFieldIsVisible(){
        let unitsFieldVisible: boolean;
        for(let i = 0; i < 60; i++){
            unitsFieldVisible = await this.unitsField.isVisible();
            if(unitsFieldVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(unitsFieldVisible!).toBeTruthy();
    }

    /**
     * This function verifies that the location field is visible
     */
    async verifyLocationFieldIsVisible(){
        let imageLocationFieldVisible: boolean;
        for(let i = 0; i < 60; i++){
            imageLocationFieldVisible = await this.imageLocationField.isVisible();
            if(imageLocationFieldVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(imageLocationFieldVisible!).toBeTruthy();
    }

    /**
     * This function verifies that the link field is visible
     */
    async verifyClickLinkFieldIsVisible(){
        let clickLinkFieldIsVisible: boolean;
        for(let i = 0; i < 60; i++){
            clickLinkFieldIsVisible = await this.linkField.isVisible();
            if(clickLinkFieldIsVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(clickLinkFieldIsVisible!).toBeTruthy();
    }

    /**
     * This function verifies that the media size dropdown is visible
     */
    async verifymediaSizeDropdownMenuIsVisible(){
        let mediaSizeDropdownMenuVisible: boolean;
        for(let i = 0; i < 60; i++){
            mediaSizeDropdownMenuVisible = await this.mediaSizeDropdownMenu.isVisible();
            if(mediaSizeDropdownMenuVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(mediaSizeDropdownMenuVisible!).toBeTruthy();
    }

    async verifycardStyleDropdownMenuIsVisible(){
        let cardStyleDropdownMenuVisible: boolean;

        for(let i = 0; i < 60; i++){
            cardStyleDropdownMenuVisible = await this.cardStyleDropdownMenu.isVisible();
            if(cardStyleDropdownMenuVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(cardStyleDropdownMenuVisible!).toBeTruthy();
    }

    /**
     * This function clicks the delete button from a specified ingredient
     * @param {string} text
     */
    async clickIngredientDeleteButton(text: string){
        await this.ingredientTable.locator('tr').filter({hasText: `${text}`}).locator('td').locator('button.delete-btn').click();
    }

    /**
     * This function verifies that the confirm delete action button is visisble and then clin on it
     */
    async clickConfirmDeleteActionButton(){
        let confirmDeleteActionButtonVisible: boolean;

        for(let i = 0; i < 60; i++){
            confirmDeleteActionButtonVisible = await this.confirmDeleteActionButton.isVisible();
            if(confirmDeleteActionButtonVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.confirmDeleteActionButton.click();
    }

    /**
     * This function verifies if an ingredient is deleted by the name
     * @param {string} text
     */
    async verifyIngredientDeleted(text: string){
        let ingredientTableVisible: boolean;

        for(let i = 0; i < 60; i++){
            ingredientTableVisible = await this.ingredientTable.locator('tr').filter({hasText: `${text}`}).isVisible();
            if(!ingredientTableVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(ingredientTableVisible!).toBeFalsy();
    }

    /**
     * This function clicks the delete button from a recipe
     */
    async clickDeleteButtonRecipe(title: string){
        let recipeTableVisible: boolean;
        let recipeVisible: boolean;
        for(let i = 0; i < 60; i++){
            recipeTableVisible = await this.recipeTable.isVisible();
            if(recipeTableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        await this.recipeTable.locator('tr').filter({hasText: `${title}`}).locator('button.p-button-danger').click()   
    }


    /**
     * This function verify if the error message displayed is the expected message
     * @param {string} message message to be evaluated
     */
    async verifyDeleteMessage(name: string){
        const commonModel = new CommonModel(this.page);

        let snackBarVisible: boolean;
        let fullText = name + " was deleted successfully!";

        for(let i = 0; i < 60; i++){
           snackBarVisible = await commonModel.snackbar.isVisible();
           if(snackBarVisible){
            break;
           }
           await this.page.waitForTimeout(300);
        }
        let text = await commonModel.snackbar.innerText();
        expect(text).toEqual(fullText);
    }

    /**
     * This function       
     * @param {*} label
     */
    async clickDealTypeDropdownOption(label: string){

        await this.dealTypeDropdown.selectOption({ label: `${label}` });
    }


    /**
     * This function finds if the dropdonw options menu is displayed and click the option by label text 
     * @param label 
     */
    async clickMediasizeDropdownOption(label: string){
        let mediaZiseDropdownOptionVisible: boolean;
        let mediaZiseDropdownSearchVisible: boolean;

        let mediaZiseDropdownSearchField: Locator;

        mediaZiseDropdownSearchField = this.page.locator("div.p-dropdown-filter-container input");

        for(let i = 0; i < 60; i++){
            mediaZiseDropdownSearchVisible = await mediaZiseDropdownSearchField.isVisible();
            if(mediaZiseDropdownSearchVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await mediaZiseDropdownSearchField.fill(label);

        for(let i = 0; i < 60; i++){
            mediaZiseDropdownOptionVisible = await this.mediaSizeDropdownOption.isVisible();
            if(mediaZiseDropdownOptionVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.mediaSizeDropdownOption.locator("span").filter({hasText: `${label}`}).click();
    }

    
    /**
     * This function verifies thta the media dropodn option is visible then clicks the selected option
     * @param text 
     */
    async clickCardStyleDropdownOption(label: string){
        await this.cardStyleDropdownMenu.selectOption({ label: `${label}` });
    }

    /**
     * This function click the edit button from an ingredient 
     * @param name 
     */
    async clickEditButtonFromAnIngredient(name: string){
        await this.ingredientTable.locator('tr').filter({hasText: `${name}`}).locator('button.edit-btn').click();
    }

    /**
     * This function verfies thta the field image is populated with the uploaded value
     * @param imageText1 
     * @param imageText2 
     */
    async validateImageField(imageText1: string, imageText2: string){
        expect(imageText1).toEqual(imageText2);
    }

    /**
     * This function searches a note and verifies the note exists in the notes table
     * @param {string} name text from a note
     */
    async verifyIfNoteExist(name: string){
        let elementExists = await this.noteField.locator('span').filter({hasText: `${name}`}).isVisible();
        expect(elementExists).toBeTruthy();
    }

    /**
     * This function selects a date in the past
     */
    async selectPastDate(days: number){
        let date = moment();
        date = date.subtract(days, "days");
        let modifiedDate = date.format("YYYY-MM-DD, hh:mm A");

        return modifiedDate;
    }

    /**
     * This function compare the expires date with actual date and verifies if is correct
     */
    async compareExpireDateToday(){
        let today = new Date().toISOString().split('T')[0];
        let expireFieldValue = await this.expiresField.inputValue();
        let expireFieldData = expireFieldValue.split(',');
        let expireDate = expireFieldData[0];
        expect(today).toEqual(expireDate);
    }

    /**
     * This function compare the expires date and verifies if is correct
     */
    async compareExpireDateOneWeekLater(){
        let today = new Date();
        today.setDate(today.getDate() + 7);
        let WeekDate = today.toISOString().split('T')[0];
        let expireFieldValue = await this.expiresField.inputValue();
        let expireFieldData = expireFieldValue.split(',');
        let expireDate = expireFieldData[0];
        expect(WeekDate).toEqual(expireDate);
    }

    /**
     * This function verifies thta the fields are empty
     */
    async compareExpireDateReset(){
        let expireFieldValue = await this.expiresField.inputValue();
        expect('').toEqual(expireFieldValue);
    }

    /**
     * Click the delete button from a recipe 
     * @param name 
     */
    async clickDeleteButtonFromIngredient(name){
        await this.ingredientTable.locator('tr').filter({hasText: `${name}`}).locator('button.delete-btn').click();
    }

    /**
     * Verify that the ingredient is not displayed in the ingredients table
     * @param name 
     */
    async verifyTheNewIngredientIsDeleted(name: string){
        let ingredientVisible: boolean;

        for(let i = 0; i < 60; i++){
            ingredientVisible = await this.ingredientTable.locator('tr').filter({hasText: `${name}`}).isVisible();
            if(!ingredientVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
        expect(ingredientVisible!).toBeFalsy();
        
    }

    /**
     * This function gets the text from the image field
     * @returns
     */
    async getTheTextFromImageField(){
        let imageTextField: string; 
        
        imageTextField = await this.imageMediaField.inputValue();

        return imageTextField;
    }

    /**
     * This function verifies that the image is displayed in the recipe preview
     */
    async verifyThatTheImageIsVisibleInPreviewRecipe(){
        let imageVisible: boolean;

        for(let i = 0; i < 60; i++){
            imageVisible = await this.imageMediaRecipePreview.isVisible();
            if(imageVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(imageVisible!).toBeTruthy();
    }

    /**
     * This function verifies that the 2 images are equal
     * @param image1 
     * @param image2 
     */
    async verifyIfTheImageIsEqual(image1: string, image2: string){
        let arrayImage1 = image1.split("/");
        let arrayImage2 = image2.split("/");

        expect(arrayImage1[4]).toEqual(arrayImage2[6]);
        
    }

    /**
     * This function verifies that the toogle button has the status active
     */
    async verifyTheToogleButtonIsActive(){
        let toogleStatus = await this.storeToogleButton.nth(0).locator('button').getAttribute('aria-checked');
        expect(toogleStatus).toBeTruthy();
    }

    /**
     * This function waits for the search bar is visible and thena clicks on it
     */
    async clickSearchBar(){
        let searchBarVisible: boolean;

        for(let i = 0; i < 60; i++){
            searchBarVisible = await this.searchBar.isVisible();
            if(searchBarVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.searchBar.click();
    }

    /**
     * This fucntion verifies that the instruction field is not visible
     */
    async verifyThatInstructionFieldIsNotVisible(){
        let instructionFieldIsVisible: boolean;

        for(let i = 0; i < 60; i++){
            instructionFieldIsVisible = await this.instructionField.isVisible();
            if(!instructionFieldIsVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(instructionFieldIsVisible!).toBeFalsy();
    }

    /**
     * This function verifies that the title is is required is visible
     */
    async verifyTheTitleIsRequiredMessageIsDisplayed(){
        let messageVisible: boolean;

        for(let i = 0; i < 60; i++){
            messageVisible = await this.ingredientErrorMessage.isVisible();
            if(messageVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
        let messageText = await this.ingredientErrorMessage.innerText();
        expect(messageText).toEqual('Title is required.');
    }

    /**
     * This function clicks the preview button from a recipe
     */
    async clickPreviewButtonRecipe(title: string){
        let buttonPreviewVisible: boolean;

        for(let i = 0; i < 60; i++){
            buttonPreviewVisible = await this.recipeTable.locator('tr').filter({hasText: `${title}`}).locator('button[icon="pi pi-eye"]').isVisible();
            if(buttonPreviewVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        await this.recipeTable.locator('tr').filter({hasText: `${title}`}).locator('button[icon="pi pi-eye"]').click();
    }

    /**
     * This function clicks the preview button from a recipe
     */
    async verifyRecipePreviewContainerIsVisible(){
        let previewContainerVisible: boolean;

        for(let i = 0; i < 60; i++){
            previewContainerVisible = await this.recipePreviewContainer.isVisible();
            if(previewContainerVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
        expect(previewContainerVisible!).toBeTruthy();
    }

    /**
     * This function verifies thta the name field is visible
     */
    async verifyRecipeTitleVisible(){
        let nameFieldVisible: boolean;

        for(let i = 0; i < 60; i++){
            nameFieldVisible = await this.nameField.isVisible();
            if(nameFieldVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(nameFieldVisible!).toBeTruthy();
    }

    /**
     * This function verifies that the save ingredient button is visible
     */
    async verifyThatSaveIngredientButtonIsVisible(){
        let saveIngredientButtonVisible: boolean;

        for(let i = 0; i < 60; i++){
            saveIngredientButtonVisible = await this.saveIngredientButton.isVisible();
            if(saveIngredientButtonVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(saveIngredientButtonVisible!).toBeTruthy();
    }

    /**
     * This function verifies that the cancel button is not displayed
     */
    async verifyTheCancelActionButtonButtonNotVisible(){
        let cancelDeleteActionbuttonVisible: boolean;

        for(let i = 0; i < 60; i++){
            cancelDeleteActionbuttonVisible = await this.cancelDeleteActionbutton.isVisible();
            if(!cancelDeleteActionbuttonVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }
        
    }


    /**
     * This function verifies that the name field is visible
     */
    async verifyNameFieldIsVisible(){
        let nameFieldVisible: boolean;

        for(let i = 0; i < 60; i++){
            nameFieldVisible = await this.nameField.isVisible();
            if(nameFieldVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(nameFieldVisible!).toBeTruthy();
    }

    async verifyThatMapToCardToogleIsActiveOrInactive(active: string){
        let value: string | null;
        if(active == "true"){
            for(let i = 0; i < 60; i++){
                value = await this.mapToCardToogle.getAttribute('aria-checked');
                if(value == active){
                    break;
                }
                await this.page.waitForTimeout(300);
            }
            expect(value!).toEqual('true');
        }
        if(active == "false"){
            for(let i = 0; i < 60; i++){
                value = await this.mapToCardToogle.getAttribute('aria-checked');
                if(value == active){
                    break;
                }
                await this.page.waitForTimeout(300);
            }
            expect(value!).toEqual('false');
        }

    }

    /**
     * This function verifies that the name input field is visible
     */
    async verifyThatTheFieldNameIsVisible(title: string){
        let isVisible: boolean;
        let name: string;

        for (let i = 0; i < 60; i++) {
            isVisible = await this.nameField.isVisible();
            if(isVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
        expect(isVisible!).toBeTruthy();

        for (let i = 0; i < 60; i++) {

            name = (await this.nameField.inputValue()).trim();
            if(name == title){
                break;
            }

            await this.page.waitForTimeout(300);
        }
        
        expect(name!).toEqual(title);
    }

    /**
     * This function verifies that the manage media modal is not displayed
     */
    async verifyThatManageMediaImageModalIsNotVisible(){
        let isVisible: boolean;

        for (let i = 0; i < 60; i++) {
            isVisible = await this.manageMediaImageModal.isVisible();
            if(!isVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(isVisible!).toBeFalsy();
    }


    async verifyIngredientIsAdded(){
        let ingredientVisible: boolean;

        for(let i = 0; i < 60; i++) {
            ingredientVisible = await this.ingredientTable.locator('tr').first().isVisible();
            if(ingredientVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(ingredientVisible!).toBeTruthy();
    }
    
    async verifyRecipeButtonIsVisible(){
        let isVisible: boolean;

        for(let i = 0; i < 60; i++){
            isVisible = await this.createRecipebutton.isVisible();
            if(isVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(isVisible!).toBeTruthy();
    }

}