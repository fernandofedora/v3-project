import {expect, Locator, Page} from '@playwright/test';

export class CommonModel {

    readonly page: Page;
    readonly searchBar: Locator; 
    readonly spinner: Locator;
    readonly searchInput: Locator;
    readonly existAlert: Locator;
    readonly snackbar: Locator;
    readonly fieldRequired: Locator;
    readonly contentPopup: Locator;
    readonly chooseMonthYearBtn: Locator;
    readonly calendarBody: Locator;
    readonly hourInput: Locator;
    readonly minuteInput: Locator;
    readonly dateTimePickerOkBtn: Locator;
    readonly confirmBtn: Locator;
    readonly cancelBtn: Locator;
    readonly detailPageTitle: Locator;
    readonly singleItemContentButton: Locator;
    readonly createContentPopUp: Locator;
    readonly addNewNodeGroup: Locator

    constructor (page: Page) {
        this.page = page;
        this.spinner = page.locator('mat-spinner.mat-spinner.mat-progress-spinner');
        this.searchInput = page.locator('div.content-header-wrapper input');
        this.existAlert = page.locator('app-alert ul > li');
        this.snackbar = page.locator('mat-snack-bar-container simple-snack-bar');
        this.fieldRequired = page.locator('small.p-error');
        this.contentPopup = page.locator('app-edit-node-group-dialog');
        this.addNewNodeGroup = page.locator('app-new-node-group-dialog');
        //this.contentPopup = page.locator('mat-dialog-container');
        this.chooseMonthYearBtn = page.locator('button[aria-label="Choose month and year"]');
        this.calendarBody = page.locator('div.mat-calendar-content tr > td span.mat-calendar-body-cell-content');
        this.hourInput = page.locator('input[formcontrolname="hour"]');
        this.minuteInput = page.locator('input[formcontrolname="minute"]');
        this.dateTimePickerOkBtn = page.locator('ngx-mat-datepicker-content > div:nth-child(2) > div:nth-child(3) > button.mat-primary');
        this.confirmBtn = page.locator('button.confirm-btn.mat-primary');
        this.cancelBtn = page.locator('button.cancel-btn');
        this.detailPageTitle = page.locator('dh-subheader h1');
        this.singleItemContentButton = page.locator('div > dh-button:nth-child(2)');
        this.createContentPopUp = page.locator('app-new-node-group-dialog');
    }

    async waitUntilSpinnerDisappears() {
        
        let isVisible: boolean;
        for (let i = 0; i < 60; i++) {
            isVisible = await this.spinner.isVisible();
            if(!isVisible){
                break;
            }
            await this.page.waitForTimeout(500);
        }
        expect(isVisible!).toBeFalsy();
    }

    async waitForSnackbarDissapear() {
        let exists = true;
        for (let i = 0; i <= 30 && exists; i++) {
            await this.page.waitForTimeout(500);
            exists = await this.snackbar.nth(0).isVisible();
        }
        await this.page.waitForTimeout(500);
    }

    /**
     * Search for a value in a table
     * @param value
     */
    async setSearchValue(value: string) {
        await expect( async () => {
            await expect(this.searchInput).toBeVisible( {timeout:300} )
        }).toPass();
        await this.searchInput.click();
        await this.searchInput.pressSequentially(value);
    }

    async waitUntilSnackBarDisappears() {
        let exists = true;
        for (let i = 0; i <= 30 && exists; i++) {
            await this.page.waitForTimeout(500);
            exists = await this.snackbar.isVisible();
        }
        await this.page.waitForTimeout(500);
    }

    /**
     * The format to select a date is yyyy-MMM-dd HH:mm
     * @param year
     * @param month
     * @param day
     * @param hour
     * @param minute
     */
    async selectDate(year: string, month: string, day: string, hour: string, minute: string) {
        await this.chooseMonthYearBtn.click();
        await this.calendarBody.getByText(year, { exact: true }).click();
        await this.calendarBody.getByText(month, { exact: true }).click();
        await this.calendarBody.getByText(day, { exact: true }).click();
        await this.hourInput.fill(hour);
        await this.minuteInput.fill(minute);
        await this.dateTimePickerOkBtn.click();
    }


    async verifyAproveedAlertMessage(message: string){
        let snackBarVisible = true;
        for (let i = 0; i <= 60; i++) {
            snackBarVisible = await this.snackbar.isVisible();
            if(snackBarVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        let text = (await this.snackbar.textContent())?.trim();
        expect(text).toEqual(message);
        
    }

    async checkContentPopupVisible() {
        let contentPopUpVisible: boolean;
        let contentPopupEnable: boolean;
        for(let i = 0; i < 60; i++){
            contentPopUpVisible = await this.contentPopup.isVisible();
            contentPopupEnable = await this.contentPopup.isEnabled();
            if(contentPopUpVisible && contentPopupEnable){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
    }


    async verifyAlertMessageVisible(){

        let existAlertVisible: boolean;

        for(let i = 0; i < 60; i++){
            existAlertVisible = await this.existAlert.nth(0).isVisible();
            if(existAlertVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(existAlertVisible!).toBeTruthy();
    }

    async onClickYesConfirmButton() {
        await expect(this.confirmBtn).toBeEnabled({ timeout: 30000 });
        await this.confirmBtn.click();
    }

    async onClickNoCancelButton() {
        let cancelBtnVisible: boolean;

        for(let i = 0; i < 60; i++){
            cancelBtnVisible = await this.cancelBtn.isVisible();
            if(cancelBtnVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        await this.cancelBtn.click();
    }

    async verifyThePageDetailTitle(pageDetail: string){
        let option: string;

        for(let i = 0; i < 60; i++){
            option = (await this.detailPageTitle.innerText()).toLowerCase();;
            if(option.includes(pageDetail)){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(option!).toContain(pageDetail);
        
    }

    async waitAddContentButtonAppears(){
        let singleItemContentButtonVisible: boolean;
        for(let i = 0; i < 60; i++){
            singleItemContentButtonVisible = await this.singleItemContentButton.filter({ hasText: 'Single Item' }).isVisible();
            if(singleItemContentButtonVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
    }

    async checkCreateContentPopupVisible() {
        let contentPopUpVisible: boolean;
        let contentPopupEnable: boolean;
        for(let i = 0; i < 60; i++){
            contentPopUpVisible = await this.createContentPopUp.nth(0).isVisible();
            contentPopupEnable = await this.createContentPopUp.nth(0).isEnabled();
            if(contentPopUpVisible && contentPopupEnable){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
    }

    async verifyThatSearchBarIsVisible(){
        let isVisible: boolean;

        for(let i = 0; i < 60; i++){
            isVisible = await this.searchInput.isVisible();
            if(isVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(isVisible!).toBeTruthy();
    }

    /**
     * This function verifies if a locator is visible
     * @param locator 
     */
    async verifyThatLocatorIsVisible(locator: Locator){
        let isVisible: boolean;

        for(let i = 0; i < 60; i++){
            isVisible = await locator.isVisible();
            if(isVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(isVisible!).toBeTruthy();
    }

    /**
     * This function clicks a locator
     * @param locator 
     */
    async clickLocator(locator: Locator){
        
        await locator.click();
    }

    /**
     * This function fills text in the locator
     * @param locator 
     * @param value 
     */
    async inputTextInLocator(locator: Locator, value: string) {

        await expect( async () => {
            await expect(locator).toBeVisible( {timeout: 300} );
        }).toPass();

        await locator.pressSequentially(value, {delay:200});
        
    }

    /**
     * This function counts the elements
     * @param locator 
     * @returns 
     */
    async countElements(locator: Locator) {
        let quantity: number;
        quantity = 0;

        quantity = await locator.count();

        return quantity;
    }

        /**
     * This function verifies if a locator is not visible
     * @param locator 
     */
        async verifyThatLocatorIsNotVisible(locator: Locator){
            let isVisible: boolean;
    
            for(let i = 0; i < 60; i++){
                isVisible = await locator.isVisible();
                if(!isVisible){
                    break;
                }
    
                await this.page.waitForTimeout(300);
            }
    
            expect(isVisible!).toBeFalsy();
        }
}

