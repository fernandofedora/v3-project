import { Locator, Page, expect } from '@playwright/test';

export class CPGBrandsModel {

    readonly page: Page;
    readonly createNewCPGBrandButton: Locator;
    readonly brandsTable: Locator;
    readonly nodeNameInput: Locator;
    readonly generalHeader: Locator;
    readonly configurationHeader: Locator;
    readonly logosHeadersHeader: Locator;
    readonly upperCancelButton: Locator;
    readonly downCancelButton: Locator;
    readonly upperSaveButton: Locator;
    readonly downSaveButton: Locator;
    readonly errorNameMessage: Locator;
    readonly typeDropdownMenu: Locator;
    readonly typeDropdownOption: Locator;
    readonly noteArea: Locator;
    readonly addressField: Locator;
    readonly cityField: Locator;
    readonly stateField: Locator;
    readonly zipField: Locator;
    readonly languageDrodpownMenu: Locator;
    readonly languageOptionDrodpownMenu: Locator;
    readonly defaultLanguageDropdownMenu: Locator;
    readonly createCPGBrandModal: Locator;
    readonly defaultThemeDropdownMenu: Locator;
    readonly defaultThemeDropdownOptionMenu: Locator;
    readonly cardStylesDropdownMenu: Locator;
    readonly activeStatusSwitch: Locator;
    readonly searchInput: Locator;
    readonly supportedLanguageOptions: Locator;

    constructor (page: Page) {
        this.page = page;
        this.createNewCPGBrandButton = page.locator('div.content-header-wrapper > div > div:nth-child(3) > dh-button');
        this.brandsTable = page.locator('div.dh-detail-page__no-content p-scroller tbody:nth-child(2)');
        this.nodeNameInput = page.locator('dh-gpc-brand-dialog input[formcontrolname="name"]');
        this.generalHeader = page.locator('dh-gpc-brand-dialog p-tabview > div > div > div > ul > li:nth-child(1)');
        this.configurationHeader = page.locator('dh-gpc-brand-dialog p-tabview > div > div > div > ul > li:nth-child(2)');
        this.logosHeadersHeader = page.locator('dh-gpc-brand-dialog p-tabview > div > div > div > ul > li:nth-child(3)');
        this.upperCancelButton = page.locator('dh-gpc-brand-dialog > div.row.cpg-header > div:nth-child(2) > p-button[label="Cancel"]');
        this.downCancelButton = page.locator('dh-gpc-brand-dialog > div.row.cpg-footer > div > p-button[label="Cancel"]');
        this.upperSaveButton = page.locator('dh-gpc-brand-dialog > div.row.cpg-header > div:nth-child(2) > p-button[label="Save"]');
        this.downSaveButton = page.locator('dh-gpc-brand-dialog > div.row.cpg-footer > div > p-button[label="Save"]');
        this.errorNameMessage = page.locator('div.dh-content main > dh-cpg-brands > div > p-messages');
        this.typeDropdownMenu = page.locator('dh-gpc-brand-dialog div.p-field.p-fluid p-dropdown');
        this.typeDropdownOption = page.locator('div.p-dropdown-items-wrapper > ul > p-dropdownitem');
        this.noteArea = page.locator('dh-gpc-brand-dialog textarea');
        this.addressField = page.locator('dh-gpc-brand-dialog input[formcontrolname="address1"]');
        this.cityField = page.locator('dh-gpc-brand-dialog input[formcontrolname="city"]');
        this.stateField = page.locator('dh-gpc-brand-dialog input[formcontrolname="state"]');
        this.zipField = page.locator('dh-gpc-brand-dialog input[formcontrolname="zip"]');
        this.languageDrodpownMenu = page.locator('dh-gpc-brand-dialog p-multiselect[formcontrolname="languages"]');
        this.languageOptionDrodpownMenu = page.locator('div.p-multiselect-items-wrapper > ul > p-multiselectitem');
        this.defaultLanguageDropdownMenu = page.locator('dh-gpc-brand-dialog p-dropdown[formcontrolname="defaultLanguage"]');
        this.createCPGBrandModal = page.locator('dh-gpc-brand-dialog');
        this.defaultThemeDropdownMenu = page.locator('dh-gpc-brand-dialog p-dropdown[formcontrolname="newTheme"]');
        this.defaultThemeDropdownOptionMenu = page.locator('div.p-dropdown-items-wrapper > ul > p-dropdownitem');
        this.cardStylesDropdownMenu = page.locator('dh-gpc-brand-dialog p-multiselect[formcontrolname="cardStyles"]');
        this.activeStatusSwitch = page.locator('dh-gpc-brand-dialog p-inputswitch > div > span');
        this.searchInput = page.locator('dh-cpg-brands div.content-header-wrapper > div > div:nth-child(2) > input');
        this.supportedLanguageOptions = page.locator('div.p-multiselect-panel.p-component.ng-star-inserted ul p-multiselectitem');
    }

    /**
     * This function verifies that the cpgbrand button is visible
     */
    async verifyThatTheCPGBrandButtonIsVisible(){
        let buttonIsVisible: boolean;

        for(let i = 0; i < 60; i++){
            buttonIsVisible = await this.createNewCPGBrandButton.isVisible();
            if(buttonIsVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(buttonIsVisible!).toBeTruthy();
    }

    /**
     * This function verifies that the brand table is visible
     */
    async verifyThatBrandTableIsVisible(){
        let tableVisible: boolean;

        for(let i = 0; i < 60; i++){
            tableVisible = await this.brandsTable.first().isVisible();
            if(tableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(tableVisible!).toBeTruthy
    }

    /**
     * This function clicks the node name input field
     */
    async clickNodeNameInput(){
        let inputVisible: boolean;

        for(let i = 0; i < 60; i++){
            inputVisible = await this.nodeNameInput.isVisible();
            if(inputVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(inputVisible!).toBeTruthy();
    }

    /**
     * This function populate the node name input field
     * @param text 
     */
    async populateNodeNameInputField(text: string){
        await this.nodeNameInput.fill(text);
    }

    /**
     * This fucntion verifies that the brand is created
     */
    async verifyThatTheCPGBrandIsCreated(brandName: string){
        let tableVisible: boolean;
        let rowCount: number;

        for(let i = 0; i < 60; i++){
            tableVisible = await this.brandsTable.locator('tr').locator(`td:text-is("${brandName}")`).isVisible();
            if(tableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(tableVisible!).toBeTruthy();
    }

    /**
     * This function verifies that the name error message is visible
     */
    async verifyErrorNameMessageIsDisplayed(){
        let messageVisible: boolean;

        for(let i = 0; i < 60; i++){
            messageVisible = await this.errorNameMessage.isVisible();
            if(messageVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(messageVisible!).toBeTruthy();

        let text = (await this.errorNameMessage.innerText()).trim();
        expect(text).toEqual('Name is required.');
    }

    /**
     * This fucntion click the type dropdown menu
     */
    async clickTypeDropdownMenu(){
        let menuVisible: Boolean;

        for(let i = 0; i < 60; i++){
            menuVisible = await this.typeDropdownMenu.isVisible();
            if(menuVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(menuVisible!).toBeTruthy();

        await this.typeDropdownMenu.click();
    }

    /**
     * This fucntion clicks the indicated option 
     * @param option 
     */
    async selectDropdownTypeOption(option: string){
        let optionVisible: Boolean;
        let index = 0;

        for(let i = 0; i < 60; i++){
            optionVisible = await this.typeDropdownOption.isVisible();
            if(optionVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(optionVisible!).toBeTruthy();

        let optionCount = await this.typeDropdownOption.count();

        for(let i = 0; i < optionCount; i++){
            let optionText = (await this.typeDropdownOption.nth(i).innerText()).trim();
            if(optionText == option){
                index = i;
                break;
            }

            await this.typeDropdownOption.nth(index).click();
        }
        
    }

    /**
     * This function populates the note area
     * @param text 
     */
    async fillNoteArea(text: string){

        await this.noteArea.click();
        await this.noteArea.fill(text);
    }

    /**
     * This function populates the address input
     * @param text 
     */
    async fillAddressInput(text: string){

        await this.addressField.click();
        await this.addressField.fill(text);
    }

    /**
     * This function fills the city field
     * @param text 
     */
    async fillCityField(text: string){

        await this.cityField.click();
        await this.cityField.fill(text);
    }

    /**
     * This function fills the state field
     * @param text 
     */
    async fillStateField(text: string){
        await this.stateField.click();
        await this.stateField.fill(text);
    }

    /**
     * This function fills the zip field
     * @param text 
     */
    async fillZipField(text: string){
        await this.zipField.click();
        await this.zipField.fill(text);
    }

    /**
     * This function clicks the languages dropdown menu
     */
    async clickLanguageDropdownMenu(){
        let menuVisible: boolean;

        for(let i = 0; i < 60; i++){
            menuVisible = await this.languageDrodpownMenu.isVisible();
            if(menuVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(menuVisible!).toBeTruthy();

        await this.languageDrodpownMenu.click();
    }

    /**
     * This fucntion clicks the indicated option 
     * @param option 
     */
    async selectDropdownLanguageOption(option: string){
        let optionVisible: Boolean;
        let index = 0;

        for(let i = 0; i < 60; i++){
            optionVisible = await this.languageOptionDrodpownMenu.first().isVisible();
            if(optionVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(optionVisible!).toBeTruthy();

        let optionCount = await this.languageOptionDrodpownMenu.count();

        for(let i = 0; i < optionCount; i++){
            let optionText = (await this.languageOptionDrodpownMenu.nth(i).innerText()).trim();
            if(optionText == option){
                index = i;
                break;
            }

            await this.languageOptionDrodpownMenu.nth(index).click();
        }
        
    }


    /**
     * This function clicks the languages dropdown menu
     */
      async clickDefaultLanguageDropdownMenu(){
        let menuVisible: boolean;

        for(let i = 0; i < 60; i++){
            menuVisible = await this.defaultLanguageDropdownMenu.isVisible();
            if(menuVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(menuVisible!).toBeTruthy();

        await this.defaultLanguageDropdownMenu.click();
    }

    /**
     * This function uploads an image
     * @param image 
     */
    async uploadRecipeImage(image: string[]){
        let chooseImgInput = 'p-fileupload input[type="file"]';
        await this.page.setInputFiles(chooseImgInput, image);
    }

    /**
     * This function click the default theme dropdown menu
     */
    async clickDefaultThemeDropdownMenu(){
        let menuVisible: boolean;

        for(let i = 0; i < 60; i++){
            menuVisible = await this.defaultThemeDropdownMenu.isVisible();
            if(menuVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(menuVisible!).toBeTruthy();

        await this.defaultThemeDropdownMenu.locator('div > span').click({delay:300});
    }

    /**
     * This function click the option from the default theme dropdown option menu
     * @param option 
     */
    async clickOptionDefaultThemeMenu(option: string){
        let optionVisible: Boolean;
        let index = 0;

        for(let i = 0; i < 60; i++){
            optionVisible = await this.defaultThemeDropdownOptionMenu.first().isVisible();
            if(optionVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(optionVisible!).toBeTruthy();

        await this.page.waitForTimeout(1000);
        let optionCount = await this.defaultThemeDropdownOptionMenu.count();
        optionCount = optionCount-1;
       for(let i = 0; i < optionCount; i++){
            let optionText = (await this.defaultThemeDropdownOptionMenu.nth(i).innerText()).trim();
            if(optionText == option){
                index = i;
                break;
            }
        }
        await this.defaultThemeDropdownOptionMenu.nth(index).locator('li').click({delay:300});
    }

    /**
     * This function click the styles card dropdown menu
     */
    async clickStylesCardsDropdownMenu(){
        let menuVisible: boolean;

        for(let i = 0; i < 60; i++){
            menuVisible = await this.cardStylesDropdownMenu.isVisible();
            if(menuVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(menuVisible!).toBeTruthy();

        await this.cardStylesDropdownMenu.click();
    }

    /**
     * This function verifies that the create brand modal is not displayed
     */
    async verifyThatTheCreateBrandModalIsNotDisplayed(){
        let isVisible: boolean;

        for(let i = 0; i < 60; i++){
            isVisible = await this.createCPGBrandModal.isVisible();
            if(!isVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(isVisible!).toBeFalsy();
    }

    /**
     * This fucntion verifies that the brand is created
     */
    async verifyThatTheCPGBrandIsNotCreated(brandName: string){
        let tableVisible: boolean;

        for(let i = 0; i < 60; i++){
            tableVisible = await this.brandsTable.locator('tr').locator(`td:text-is("${brandName}")`).isVisible();
            if(!tableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(tableVisible!).toBeFalsy();
    }

    async clickEditButtonFromABrand(brandName: string){
        let brandVisible: boolean;

        for(let i = 0; i < 60; i++){
            brandVisible = await this.brandsTable.locator('tr').locator(`td:text-is("${brandName}")`).isVisible();
            if(!brandVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(brandVisible!).toBeTruthy();

        await this.brandsTable.locator('tr').locator(`button[title="Edit brand"]:right-of(td:text-is("${brandName}"))`).click();

    }

    /**
     * This function verifies that the create brand modal is not displayed
     */
    async verifyThatTheCreateBrandModalIsDisplayed(){
        let isVisible: boolean;

        for(let i = 0; i < 60; i++){
            isVisible = await this.createCPGBrandModal.isVisible();
            if(isVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(isVisible!).toBeTruthy();
    }

    /**
     * This function verifies that the brand has active or inactive status
     */
    async verifyBrandHasInactiveStatus(status: string, brandName: string){
        let brandVisible: boolean;
        let textStatus: string;

        for(let i = 0; i < 60; i++){
            brandVisible = await this.brandsTable.locator('tr').locator(`td:text-is("${brandName}")`).isVisible();
            if(brandVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }
        
        expect(brandVisible!).toBeTruthy();

        if(status == "INACTIVE"){
            for(let i = 0; i < 60; i++){
                textStatus = (await this.brandsTable.locator('tr').filter({hasText: `${brandName}`}).locator('td:nth-child(3)').innerText()).trim();
                if(textStatus == "INACTIVE"){
                    break;
                }
                
                await this.page.waitForTimeout(300);
            }

            expect(textStatus!).toEqual(status);

        } else{
            for(let i = 0; i < 60; i++){
                textStatus = (await this.brandsTable.locator('tr').filter({hasText: `${brandName}`}).locator('td:nth-child(3)').innerText()).trim();
                if(textStatus == "ACTIVE"){
                    break;
                }
                
                await this.page.waitForTimeout(300);
            } 

            expect(textStatus!).toEqual(status);
        }

    }

    /**
     * This function fills the search bar
     */
    async fillTheSearchBar(text: string){
        let barVisible: boolean;

        for(let i = 0; i < 60; i++){
            barVisible = await this.searchInput.isVisible();
            if(barVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(barVisible!).toBeTruthy();

        await this.searchInput.click({delay: 200});

        await this.searchInput.fill(text, {timeout:500});
    }

    /**
     * This function verify that only the matching result is displayed
     */
    async verifyOnlyMatchingResultIsDisplayed(){
        let tableVisible: boolean;
        let rows: number;

        for(let i = 0; i < 60; i++){
            tableVisible = await this.brandsTable.locator('tr').last().isVisible();
            if(tableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        for(let i = 0; i < 60; i++){
            rows = await this.brandsTable.locator('tr').count();
            if(rows == 1){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(rows!).toEqual(1);
    }

    /**
     * This function verify that only the matching result is displayed
     */
    async verifyThatNoResultsAreDisplayed(){
        let tableVisible: boolean;
        let rows: number;

        for(let i = 0; i < 60; i++){
            tableVisible = await this.brandsTable.locator('tr').last().isVisible();
            if(tableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        for(let i = 0; i < 60; i++){
            rows = await this.brandsTable.locator('tr').count();
            if(rows == 0){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(rows!).toEqual(0);
    }

    /**
     * This function delete the input from the node name input field
     */
    async clearNameField(){
        let isVisible: boolean;

        for(let i = 0; i < 60; i++){
            isVisible = await this.nodeNameInput.isVisible();
            if(isVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }
        
        await this.nodeNameInput.clear();
    }

    /**
     * This function clears an input element
     */
    async clearFieldElement( locator: Locator){
        let element: Locator;
        let isVisible: Boolean;

        element = locator;

        for(let i = 0; i < 60; i++){
            isVisible = await element.isVisible();
            if(isVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await element.clear();
    }

    /**
     * This function clicks the indicated option
     * @param language 
     */
    async selectSupportedLanguage(language: string){
        let isVisible: boolean;
        let optionsCount: number;
        let index: number

        for(let i = 0; i < 60; i++){
            isVisible = await this.supportedLanguageOptions.last().isVisible();
            if(isVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        for(let i = 0; i < 60; i++){
            optionsCount = await this.supportedLanguageOptions.count();
            if(optionsCount > 1){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
        for(let i = 0; i < optionsCount!; i++ ){
            let optionLanguage = (await this.supportedLanguageOptions.nth(i).innerText()).trim();
            if(optionLanguage == language){
                index = i;
                break;
            }
        }
        await this.supportedLanguageOptions.nth(index!).locator('li').click({delay:300});
    }

    /**
     * This fucntion clicks he indicated card style
     * @param cardStyle 
     */
    async selectCardStyle(cardStyle: string){
        let isVisible: boolean;
        let optionsCount: number;
        let index: number

        for(let i = 0; i < 60; i++){
            isVisible = await this.supportedLanguageOptions.last().isVisible();
            if(isVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        for(let i = 0; i < 60; i++){
            optionsCount = await this.supportedLanguageOptions.count();
            if(optionsCount > 1){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
        for(let i = 0; i < optionsCount!; i++ ){
            let optionLanguage = (await this.supportedLanguageOptions.nth(i).innerText()).trim();
            if(optionLanguage == cardStyle){
                index = i;
                break;
            }
        }
        await this.supportedLanguageOptions.nth(index!).locator('li').click({delay:300});
    }

    /**
     * This function evaluates that a value is in a specific field
     * @param value 
     */
    async verifyFieldValue(value: string, element: Locator){
        let isVisible: boolean;

        for(let i = 0; i < 60; i++){
            isVisible = await element.isVisible();
            if(isVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(isVisible!).toBeTruthy();

        let text = (await element.inputValue()).trim();

        expect(text).toEqual(value);
    }

    /**
     * This function evaluates that a value is in a specific field
     * @param value 
     */
    async verifyDrodpowndValue(value: string, element: Locator){
        let isVisible: boolean;

        for(let i = 0; i < 60; i++){
            isVisible = await element.isVisible();
            if(isVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(isVisible!).toBeTruthy();

        let text = (await element.innerText()).trim();

        expect(text).toEqual(value);
    }

    /**
     * This function verifies that the create modal is not visible
     */
    async verifyThatCreateModalIsNotVisible(){
        let isVisible: boolean;

        for(let i = 0; i < 60; i++){
            isVisible = await this.createCPGBrandModal.isVisible();
            if(!isVisible){
                break;
            }
            await this.page.waitForTimeout(400);
        }
    }

    /**
     * This function scroll to top
     */
    async scrollUpIntoView(brandName: string, times: number){
        let i = 0;
        let locator: Locator;

        locator = this.brandsTable.locator(`td:text-is("${brandName}")`);

        while(await locator.isHidden()) {
            await this.brandsTable.click();
            await this.page.mouse.wheel(0, -300);
            i++;
            if (await locator.isVisible()) { return; }
            else if (i >= times) { return; }
        }
    }

    /**
     * This function scroll to down
     * @param brandName 
     * @param times 
     * @returns 
     */
    async scrollDownIntoView(brandName: string, times: number) {
        let i = 0;
        let locator: Locator;

        locator = this.brandsTable.locator(`td:text-is("${brandName}")`);

        while(await locator.isHidden()) {
            await this.brandsTable.click();
            await this.page.mouse.wheel(0, 300);
            i++;
            if (await locator.isVisible()) { return; }
            else if (i >= times) { return; }
        }
    }

    /**
     * This function types a string in the search bar
     * @param text 
     */
    async typeTextOnSearchBar(text: string){
        let searchInputVisible: boolean;

        for(let i = 0; i < 60; i++){
            searchInputVisible = await this.searchInput.isVisible();
            if(searchInputVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.searchInput.click({delay: 2000});
        await this.searchInput.clear();
        await this.searchInput.click({delay: 2000});

        let textS = new String(text);

        for(let i = 0; i < textS.length; i++){
            await this.page.keyboard.press(textS[i]);
            await this.page.waitForTimeout(100);
        }
    }

    /**
     *  This function 
     * @param quantity 
     */
    async countRowsTable(quantity: number){

        let tableVisible: boolean;
        let rowCount: number;

        for(let i = 0; i < 60; i++){
            tableVisible = await this.brandsTable.isVisible();
            if(tableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(tableVisible!).toBeTruthy();

        for(let i = 0; i < 60; i++){
            rowCount = await this.brandsTable.locator('tr').count();
            if(rowCount == quantity){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(rowCount!).toEqual(quantity);
    }
}