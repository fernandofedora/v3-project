import { Locator, Page, Selectors, expect } from '@playwright/test';
import { schedulesData } from '../data/schedulesData';
import { v4 as uuidv4 } from 'uuid';
import { CommonModel } from './commonModel';
import { SidebarModel } from './sidebarModel';
import { brandsData } from '../data/brandsData';
import { BrandsModel } from './brandsModel';
import moment from 'moment-timezone';
import { hasUncaughtExceptionCaptureCallback } from 'process';

export class SchedulesModel {

    readonly page: Page;
    readonly commonModel: CommonModel;
    readonly sidebarModel: SidebarModel;
    readonly brandsModel: BrandsModel;
    readonly schedulesTable: Locator;
    readonly cardSubtitle: Locator;
    readonly addScheduleBtn: Locator;
    readonly scheduleNameInput: Locator;
    readonly startDateInput: Locator;
    readonly categoriesTable: Locator;
    readonly saveBtn: Locator;
    readonly cancelBtn: Locator;
    readonly deleteConfirmnBtn: Locator;
    readonly undoBtn: Locator;
    readonly searchBar: Locator;
    readonly editButton: Locator;
    readonly editScheduleModal: Locator;
    readonly categoryListFirst: Locator;
    readonly categoryMenu: Locator;
    readonly moveToTop: Locator;
    readonly moveToBottom: Locator;
    readonly listHide: Locator;
    readonly categoryListPage: Locator;
    readonly categoryListSubPage: Locator;
    readonly sectionTableHeader: Locator;
    readonly categoryRowHeader: Locator;
    readonly applyButton: Locator;
    readonly addNewScheduleModal: Locator;

    constructor(page: Page) {
        this.page = page;
        this.commonModel = new CommonModel(page);
        this.sidebarModel = new SidebarModel(page);
        this.brandsModel = new BrandsModel(page);
        this.schedulesTable = page.locator('div.dh-detail-page__no-content table.p-datatable-table > tbody');
        this.cardSubtitle = page.locator('app-schedules > div:nth-child(3) p');
        this.addScheduleBtn = page.locator('dh-button').filter({ hasText: 'Add Schedule' })
        this.scheduleNameInput = page.locator('mat-form-field input[formcontrolname="name"]');
        this.startDateInput = page.locator('app-datetime-picker[controlname="startDate"] input');
        this.categoriesTable = page.locator('app-schedule-form p-table table > tbody').nth(0);
        this.saveBtn = page.locator('button.submit-btn.mat-primary span:nth-child(3)');
        this.cancelBtn = page.locator('button.cancel-btn');
        this.deleteConfirmnBtn = page.locator('button.confirm-btn');
        this.undoBtn = page.locator('span.date-container button mat-icon').getByText('undo');
        this.searchBar = page.locator('div.p-inputgroup > input');
        this.editButton = page.locator('button[title="Edit"]');
        this.editScheduleModal = page.locator('mat-dialog-container app-edit-schedule-dialog');
        this.categoryListFirst = page.locator('app-schedule-form p-table:nth-child(3) tbody');
        this.categoryMenu = page.locator('div.schedules-menu');
        this.moveToTop = page.locator('li[aria-label="Move To Top"]');
        this.moveToBottom = page.locator('li[aria-label="Move To Bottom"]');
        this.listHide = page.locator('div.schedules-menu li:nth-child(3) > div > a');
        this.categoryListPage = page.locator('app-schedule-form p-table:nth-child(4) tbody');
        this.categoryListSubPage = page.locator('app-schedule-form p-table:nth-child(6) tbody');
        this.sectionTableHeader = page.locator('dh-detail-page div.dh-detail-page__content p-accordion p-accordiontab span:nth-child(4)');
        this.categoryRowHeader = page.locator('dh-detail-page div.dh-detail-page__content p-accordion p-accordiontab');
        this.applyButton = page.locator('ngx-mat-datepicker-content div.mat-datepicker-actions button:nth-child(2)');
        this.addNewScheduleModal = page.locator('app-new-schedule-dialog');
    }

    async onClickAddScheduleButton() {
        let addScheduleBtnVisible: boolean;
        for (let i = 0; i < 60; i++) {
            addScheduleBtnVisible = await this.addScheduleBtn.isVisible();

            if (addScheduleBtnVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.addScheduleBtn.click();
    }

    async setScheduleName(name: string) {
        this.verifyThatNamefieldIsVisible();
        await this.scheduleNameInput.fill(name);
    }

    async onClickScheduleSaveButton() {

        await expect(async () => {
            await this.saveBtn.click();
            await this.page.waitForTimeout(300);
        }).toPass();
    }

    async onClickScheduleCancelButton() {
        await this.cancelBtn.click();
    }

    async onClickScheduleDeleteButton(name: string) {
        await this.waitForScheduleRecordsToLoad();

        await expect( async () => {
            await expect(this.page.getByRole('row', { name: `${name}` })).toBeVisible( {timeout:300} );
        }).toPass();

        await expect( async () => {
            await this.page.getByRole('row', { name: `${name}` }).getByRole('button', { name: 'p' }).nth(1).click();
            await this.deleteConfirmnBtn.click();
        }).toPass();
    }

    async onClickScheduleEditButton(name: string) {
        await this.waitForScheduleRecordsToLoad();

        await expect( async () => {
            await expect(this.page.getByRole('row', { name: `${name}` })).toBeVisible( {timeout:300} );
        }).toPass();

        await expect( async () => {
            await this.page.getByRole('row', { name: `${name}` }).getByRole('button', { name: 'p' }).first().click();
        }).toPass();
        
    }

    async enableCategoryDividedLayout(brandName: string) {
        let cardSubtitleVisible: boolean;
        let countNovisible: number;
        countNovisible = 0;

        for (let i = 0; i < 60; i++) {
            cardSubtitleVisible = await this.cardSubtitle.isVisible();
            if (cardSubtitleVisible) {
                break;
            } else {
                countNovisible++;
                if (countNovisible == 8) {
                    break;
                }
            }
            await this.page.waitForTimeout(300);
        }
        if (cardSubtitleVisible!) {
            await this.sidebarModel.onClickBrandOptionMenu();
            await this.commonModel.setSearchValue(brandName);
            await this.brandsModel.brandTableShouldHasOneRow();
            await this.brandsModel.goToManageNodes(brandName);
            await this.brandsModel.hasNodeTableValues(3);
            await this.page.evaluate("document.body.style.scale='0.8'");
            await this.brandsModel.openEditNodePopUp(brandName);
            await this.commonModel.checkContentPopupVisible();
            await this.brandsModel.hasNodeRequiredValues();
            await this.brandsModel.onClickBrandCategoryDividedLayout(true);
            await this.brandsModel.onClickNodeSaveButton();
            await this.commonModel.waitUntilSpinnerDisappears();
            await this.brandsModel.waitBrandSaveButtonIsNotVisible();
            await this.sidebarModel.onClickSchedulesOptionMenu();
        }
    }

    /**
     * Get the timezone for the new schedule
     * @param timezone Timezone required
     * @returns The datetime with the required format
     */
    async getDatetimeFromClientHour(timezone: string) {
        const getCurrentTime = moment().tz(timezone);
        const remainder = getCurrentTime.minute() % 15;
        const dateTime = moment(getCurrentTime).subtract(remainder, "minutes").format("YYYY-MM-DD, h:mm A");

        return dateTime;
    }

    async dragElementDown(element1: Locator, element2: Locator) {
        await element1.hover();
        await element1.dragTo(element2);
        //await this.page.mouse.down();
        //await element2.hover();
        //await this.page.mouse.up();
    }

    /**
     * Reorder the categories for the schedule
     */
    async reorderCategories() {
        let firstCategoryAfter: string;
        let secondCategoryAfter: string;
        let firstCategoryBefore: string;
        let secondCategoryBefore: string;
        let categoriesTableVisible: boolean;

        await this.page.waitForTimeout(3000);

        for (let i = 0; i < 60; i++) {
            categoriesTableVisible = await this.categoriesTable.locator('tr').first().isVisible();
            if (categoriesTableVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
        let firstCategory: Locator;
        let secondCategory: Locator;
        let undoBtnVisible: boolean;

        firstCategory = this.categoriesTable.locator('tr').nth(0).locator('td').nth(0);
        secondCategory = this.categoriesTable.locator('tr').nth(1).locator('td').nth(0);

        firstCategoryBefore = await firstCategory.innerText();
        secondCategoryBefore = await secondCategory.innerText();

        await expect(async ()=> {
            await this.categoriesTable.locator('tr').nth(0).dragTo(this.categoriesTable.locator('tr').nth(2), {timeout:2000});
        }).toPass();
        

        //await this.dragElementDown(firstCategory, secondCategory);

        firstCategoryAfter = await firstCategory.innerText();

        for(let i = 0; i < 60; i++){
            undoBtnVisible = await this.undoBtn.isVisible();
            firstCategoryAfter = await firstCategory.innerText();
            if(undoBtnVisible || firstCategoryBefore != firstCategoryAfter){
                break;
            }
            await expect(async ()=> {
                await this.categoriesTable.locator('tr').nth(0).dragTo(this.categoriesTable.locator('tr').nth(2), {timeout:300});
            }).toPass();
            await this.page.waitForTimeout(300);
        }

        firstCategoryAfter = await firstCategory.innerText();
        secondCategoryAfter = await secondCategory.innerText();

        // We expect that the categories have been reordered
        expect(firstCategoryAfter!).not.toEqual(firstCategoryBefore);
        expect(secondCategoryAfter!).not.toEqual(secondCategoryBefore);

    }

    /**
     * Checks if a schedule and its end date exists in the table
     * @param name
     */
    async checkScheduleInTable(name: string) {

        await this.waitForScheduleRecordsToLoad();
        let exists = false;
        let position = 0;
        let rowCount = 0;
        let isVisible: boolean;

        for (let i = 0; i < 60; i++) {
            isVisible = await this.schedulesTable.locator("tr > td").filter({hasText: `${name}`}).isVisible();
            if (isVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(isVisible!).toBeTruthy();

        for (let i = 0; i < 60; i++) {
            rowCount = await this.schedulesTable.locator('tr').count();
            if (rowCount > 4) {
                break;
            }
            await this.page.waitForTimeout(300);
        }


        await this.page.waitForTimeout(2000);
        for (let i = 0; i < rowCount; i++) {
            const nameValue = await this.schedulesTable.locator('tr').nth(i).locator('td').nth(0).innerText();

            if (nameValue === name) {
                exists = true;
                position = i;
                break;
            }

        }

        return { exists: exists, position: position };
    }

    /**
     * @param years The amount of years in the future
     */
    async selectFutureStartDate(years: number) {
        const dateFormat = 'YYYY-MM-DD, hh:mm A';
        let dateTime = await this.getDatetimeFromClientHour('America/New_York');
        let futureYear = moment(dateTime, [dateFormat]).add(years, 'year').format('YYYY');
        let month = (moment(dateTime, [dateFormat]).format('MMM')).toUpperCase();
        let day = moment(dateTime, [dateFormat]).format('D');

        await this.startDateInput.click();
        await this.commonModel.selectDate(futureYear, month, day, '01', '00');
    }

    /**
     * Create a schedule in the future
     * @param years The amount of years in the future
     */
    async createSchedule(years: number) {
        await this.onClickAddScheduleButton();
        await this.verifyCategoryTableIsVisible();
        await this.selectFutureStartDate(years);
        const scheduleName = (schedulesData.initialDefaultName + uuidv4()).slice(0, 32);
        await this.verifyCategoryTableIsVisible();
        await this.setScheduleName(scheduleName);
        let startDateSchedule1 = await this.startDateInput.inputValue();
        const startDateFormatSchedule = moment(startDateSchedule1, ['YYYY-MM-DD, hh:mm A']).format('YYYY/MM/DD, hh:mm A');
        //await this.reorderCategories();
        await this.verifyApplyButtonIsNotVisible();
        await this.onClickScheduleSaveButton();
        await this.commonModel.waitUntilSpinnerDisappears();

        return { name: scheduleName, startDate: startDateFormatSchedule };
    }

    async waitForScheduleRecordsToLoad() {
    
        await expect( async () => {
            await expect(this.schedulesTable.locator('tr').last()).toBeVisible( {timeout:300} ); 
        }).toPass();
        
            
    }

    async verifyThatNamefieldIsVisible() {
        
        await expect( async () => {
            await expect(this.scheduleNameInput).toBeVisible( {timeout:300} );
        }).toPass();
        
    }

    async verifyThatSchedulesTableIsVisible() {

        await expect( async () =>{
            await expect(this.schedulesTable).toBeVisible( {timeout: 300} );
        }).toPass();

    }

    async verifyThatStartDateInputVisible() {

        let startDateInputVisible: boolean;
        for (let i = 0; i < 60; i++) {
            startDateInputVisible = await this.startDateInput.isVisible();
            if (startDateInputVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(startDateInputVisible!).toBeTruthy();
    }

    async verifyDateInputIsDisabled() {
        let startDateInputDisabled: boolean;
        for (let i = 0; i < 60; i++) {
            startDateInputDisabled = await this.startDateInput.isDisabled();
            if (startDateInputDisabled) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(startDateInputDisabled!).toBeTruthy();
    }


    async verifyDates(initial: string, date1: string, date2: string) {

        let firstSchedule: string;
        let secondSchedule: string;

        await this.verifyThatSchedulesTableIsVisible();

        await expect( async () => {
            firstSchedule = (await this.schedulesTable.locator('tr').nth(0).locator('td').nth(0).innerText()).trim();
            expect(firstSchedule!).toEqual(date1);
        }).toPass();
        
        await expect( async () => {
            secondSchedule = (await this.schedulesTable.locator('tr').nth(1).locator('td').nth(0).innerText()).trim();
            expect(secondSchedule!).toEqual(date2);
        }).toPass();

        //for(let i = 0; i < 60; i++){
        //initialSchedule = await this.schedulesTable.locator('tr').nth(2).locator('td').nth(0).innerText();
        //if(initialSchedule == initial){
        //console.log("son iguales");
        //break;
        //}

        //await this.page.waitForTimeout(300);
        //}

        //expect((initialSchedule!).includes(initial)).toBeTruthy();
    }


    /**
    * Checks if a schedule and its end date exists in the table
    * @param name
    */
    async checkScheduleIsNotInTable(name: string) {
        
        await this.waitForScheduleRecordsToLoad();

        await expect( async () => {
            await expect(this.page.getByRole('row', { name: `${name}` })).not.toBeVisible( {timeout:300} );
        }).toPass();
    }

    async verifyThatCDLMessageisDisplayed() {
        let messageIsVisible: boolean;
        let textMessage: string;

        for (let i = 0; i < 60; i++) {
            messageIsVisible = await this.cardSubtitle.isVisible();
            if (messageIsVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(messageIsVisible!).toBeTruthy();

        for (let i = 0; i < 60; i++) {
            textMessage = await this.cardSubtitle.innerText();

            if (textMessage.includes(schedulesData.cdlNotEnabledMsg)) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect((textMessage!).includes(schedulesData.cdlNotEnabledMsg)).toBeTruthy();
    }

    async fillSearchBar(name: string) {
        let isVisible: boolean;

        for (let i = 0; i < 60; i++) {
            isVisible = await this.searchBar.isVisible();
            if (isVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.searchBar.fill(name, {timeout:300});
    }

    async verifyQuantityOfRows(rows: number) {
        let tableVisible: boolean;
        let rowsCount: number

        for (let i = 0; i < 80; i++) {
            tableVisible = await this.schedulesTable.isVisible();
            if (tableVisible) {
                break;
            }
            await this.page.waitForTimeout(500);
        }

        expect(tableVisible!).toBeTruthy();

        for (let i = 0; i < 60; i++) {
            rowsCount = await this.schedulesTable.locator('tr').count();
            if (rowsCount == rows) {
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(rowsCount!).toEqual(rows);
    }

    async checkScheduleIsInTable(name: string) {
        let contentVisible: boolean;
        await this.waitForScheduleRecordsToLoad();

        for (let i = 0; i < 60; i++) {
            contentVisible = await this.schedulesTable.locator(`tr:has-text("${name}")`).isVisible();
            if (contentVisible) {
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(contentVisible!).toBeTruthy();
    }

    /**
     * This function clicks the edit button
     */
    async clickEditButton() {

        let isVisible: boolean;

        for (let i = 0; i < 60; i++) {
            isVisible = await this.editButton.nth(0).isVisible();
            if (isVisible) {
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(isVisible!).toBeTruthy();

        await this.editButton.click({ delay: 2000 });
    }

    /**
     * This function verifies that the edit schedule module is visible
     */
    async verifyThatEditScheduleModalIsVisible() {
        let isVisible: boolean;

        for (let i = 0; i < 60; i++) {
            isVisible = await this.editScheduleModal.isVisible();
            if (isVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(isVisible!).toBeTruthy();
    }

    async moveLastCategoryInTheListToTheTop() {
        let categoryListVisible: boolean;
        let menuVisible: boolean;
        let lastCategoryName: string;
        let firstCategoryName: string;

        for (let i = 0; i < 60; i++) {
            categoryListVisible = await this.categoryListFirst.isVisible();
            if (categoryListVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(categoryListVisible!).toBeTruthy();

        await this.categoryListFirst.locator('tr').last().isVisible();
        await this.categoryListFirst.locator('tr').last().scrollIntoViewIfNeeded();
        lastCategoryName = (await this.categoryListFirst.locator('tr').last().locator('td:nth-child(1)').innerText()).trim();
        await this.categoryListFirst.locator('tr').last().locator('button:nth-child(3)').click();

        for (let i = 0; i < 60; i++) {
            menuVisible = await this.categoryMenu.isVisible();
            if (menuVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(menuVisible!).toBeTruthy();

        await this.moveToTop.click({ delay: 2000 });

        await this.categoryListFirst.locator('tr').first().isVisible();
        await this.categoryListFirst.locator('tr').first().scrollIntoViewIfNeeded();
        for (let i = 0; i < 60; i++) {
            firstCategoryName = (await this.categoryListFirst.locator('tr').first().locator('td:nth-child(1)').innerText()).trim();
            if (firstCategoryName == lastCategoryName) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(firstCategoryName!).toEqual(lastCategoryName!);
    }

    async moveFirstCategoryInTheListToTheBottom() {
        let categoryListVisible: boolean;
        let menuVisible: boolean;
        let lastCategoryName: string;
        let firstCategoryName: string;

        for (let i = 0; i < 60; i++) {
            categoryListVisible = await this.categoryListFirst.isVisible();
            if (categoryListVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(categoryListVisible!).toBeTruthy();

        await this.categoryListFirst.locator('tr').first().isVisible();
        await this.categoryListFirst.locator('tr').first().scrollIntoViewIfNeeded();
        lastCategoryName = (await this.categoryListFirst.locator('tr').first().locator('td:nth-child(1)').innerText()).trim();
        await this.categoryListFirst.locator('tr').first().locator('button:nth-child(3)').click();

        for (let i = 0; i < 60; i++) {
            menuVisible = await this.categoryMenu.isVisible();
            if (menuVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(menuVisible!).toBeTruthy();

        await this.moveToBottom.click({ delay: 2000 });

        await this.categoryListFirst.locator('tr').last().isVisible();
        await this.categoryListFirst.locator('tr').last().scrollIntoViewIfNeeded();
        for (let i = 0; i < 60; i++) {
            firstCategoryName = (await this.categoryListFirst.locator('tr').last().locator('td:nth-child(1)').innerText()).trim();
            if (firstCategoryName == lastCategoryName) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(firstCategoryName!).toEqual(lastCategoryName!);
    }

    /**
     * This function click the hide button from the first category in the list
     */
    async hideFirstCategoryInTheList() {
        let categoryListVisible: boolean;
        let menuVisible: boolean;
        let categoryName: string;
        let rowClass: string | null;

        for (let i = 0; i < 60; i++) {
            categoryListVisible = await this.categoryListFirst.isVisible();
            if (categoryListVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(categoryListVisible!).toBeTruthy();

        await this.categoryListFirst.locator('tr').first().isVisible();
        await this.categoryListFirst.locator('tr').first().scrollIntoViewIfNeeded();
        categoryName = (await this.categoryListFirst.locator('tr').first().locator('td:nth-child(1)').innerText()).trim();
        await this.categoryListFirst.locator('tr').first().locator('button:nth-child(3)').click({ delay: 3000 });

        for (let i = 0; i < 60; i++) {
            menuVisible = await this.categoryMenu.isVisible();
            if (menuVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(menuVisible!).toBeTruthy();

        await this.listHide.click({ delay: 6000 });

        for (let i = 0; i < 60; i++) {
            rowClass = await this.categoryListFirst.locator('tr').first().getAttribute("class");
            if (rowClass?.includes('deleted-row')) {
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(rowClass!).toContain('deleted-row');
    }

    async unhideFirstCategoryInTheList() {
        let categoryListVisible: boolean;
        let menuVisible: boolean;
        let categoryName: string;
        let rowClass: string | null;

        for (let i = 0; i < 60; i++) {
            categoryListVisible = await this.categoryListFirst.isVisible();
            if (categoryListVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(categoryListVisible!).toBeTruthy();

        await this.categoryListFirst.locator('tr').first().isVisible();
        await this.categoryListFirst.locator('tr').first().scrollIntoViewIfNeeded();
        categoryName = (await this.categoryListFirst.locator('tr').first().locator('td:nth-child(1)').innerText()).trim();
        await this.categoryListFirst.locator('tr').first().locator('button:nth-child(3)').click({ delay: 3000 });

        for (let i = 0; i < 60; i++) {
            menuVisible = await this.categoryMenu.isVisible();
            if (menuVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(menuVisible!).toBeTruthy();

        await this.listHide.click({ delay: 4000 });

        for (let i = 0; i < 60; i++) {
            rowClass = await this.categoryListFirst.locator('tr').first().getAttribute("class");
            if (rowClass?.includes('p-element ng-star-inserted')) {
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(rowClass!).toContain('p-element ng-star-inserted');
    }

    async clickVisibilityButton() {
        let categoryListVisible: boolean;
        let menuVisible: boolean;
        let categoryName: string;
        let iconClass: string | null;

        for (let i = 0; i < 60; i++) {
            categoryListVisible = await this.categoryListFirst.isVisible();
            if (categoryListVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(categoryListVisible!).toBeTruthy();

        await this.categoryListFirst.locator('tr').first().isVisible();
        await this.categoryListFirst.locator('tr').first().scrollIntoViewIfNeeded();
        categoryName = (await this.categoryListFirst.locator('tr').first().locator('td:nth-child(1)').innerText()).trim();
        await this.categoryListFirst.locator('tr').first().locator('td:nth-child(2)').locator("button:nth-child(1)").click();

        for (let i = 0; i < 60; i++) {
            iconClass = await this.categoryListFirst.locator('tr').first().locator('td:nth-child(2)').locator("button:nth-child(1)").getAttribute("class");
            if (!iconClass?.includes("category-header-active")) {
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(iconClass!).not.toContain("category-header-active");
    }

    async clickNoVisibilityButton() {
        let categoryListVisible: boolean;
        let menuVisible: boolean;
        let categoryName: string;
        let iconClass: string | null;

        for (let i = 0; i < 60; i++) {
            categoryListVisible = await this.categoryListFirst.isVisible();
            if (categoryListVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(categoryListVisible!).toBeTruthy();

        await this.categoryListFirst.locator('tr').first().isVisible();
        await this.categoryListFirst.locator('tr').first().scrollIntoViewIfNeeded();
        categoryName = (await this.categoryListFirst.locator('tr').first().locator('td:nth-child(1)').innerText()).trim();
        await this.categoryListFirst.locator('tr').first().locator('td:nth-child(2)').locator("button:nth-child(1)").click();

        for (let i = 0; i < 60; i++) {
            iconClass = await this.categoryListFirst.locator('tr').first().locator('td:nth-child(2)').locator("button:nth-child(1)").getAttribute("class");
            if (iconClass?.includes("category-header-active")) {
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(iconClass!).toContain("category-header-active");
    }

    async clickBookmarksButton() {
        let categoryListVisible: boolean;
        let menuVisible: boolean;
        let categoryName: string;
        let iconClass: string | null;

        for (let i = 0; i < 60; i++) {
            categoryListVisible = await this.categoryListFirst.isVisible();
            if (categoryListVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(categoryListVisible!).toBeTruthy();

        await this.categoryListFirst.locator('tr').first().isVisible();
        await this.categoryListFirst.locator('tr').first().scrollIntoViewIfNeeded();
        categoryName = (await this.categoryListFirst.locator('tr').first().locator('td:nth-child(1)').innerText()).trim();
        await this.categoryListFirst.locator('tr').first().locator('td:nth-child(2)').locator("button:nth-child(2)").click();

        for (let i = 0; i < 60; i++) {
            iconClass = await this.categoryListFirst.locator('tr').first().locator('td:nth-child(2)').locator("button:nth-child(2)").getAttribute("class");
            if (!iconClass?.includes("category-header-active")) {
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(iconClass!).toContain("category-header-active");
    }

    async clickUnBookmarksButton() {
        let categoryListVisible: boolean;
        let menuVisible: boolean;
        let categoryName: string;
        let iconClass: string | null;

        for (let i = 0; i < 60; i++) {
            categoryListVisible = await this.categoryListFirst.isVisible();
            if (categoryListVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(categoryListVisible!).toBeTruthy();

        await this.categoryListFirst.locator('tr').first().isVisible();
        await this.categoryListFirst.locator('tr').first().scrollIntoViewIfNeeded();
        categoryName = (await this.categoryListFirst.locator('tr').first().locator('td:nth-child(1)').innerText()).trim();
        await this.categoryListFirst.locator('tr').first().locator('td:nth-child(2)').locator("button:nth-child(2)").click();

        for (let i = 0; i < 60; i++) {
            iconClass = await this.categoryListFirst.locator('tr').first().locator('td:nth-child(2)').locator("button:nth-child(2)").getAttribute("class");
            if (!iconClass?.includes("category-header-active")) {
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(iconClass!).not.toContain("category-header-active");
    }

    /**
    * @param years The amount of years in the future
    */
    async selectFutureStartDateAndHours(amount: number, type: string) {
        //const dateFormat = 'YYYY-MM-DD, hh:mm A';
        const dateFormat = moment().format('YYYY-MM-DD, hh:mm A');
        //let dateTime = await this.getDatetimeFromClientHour('America/New_York');
        let dateTime = new Date();

        let year: string = "";
        let month: string = "";
        let day: string = "";
        let hours: string = "";
        let minutes: string = "";

        switch (type) {
            case "year":
                year = moment().add(amount, 'year').format('YYYY');
                month = moment().format('MMM').toUpperCase();
                day = moment().format('D');
                hours = moment().format('HH');
                minutes = moment().format('mm');
                break;

            case "month":
                year = moment().format('YYYY');
                month = moment().add(amount, 'month').format('MMM').toUpperCase();
                day = moment().format('D');
                hours = moment().format('HH');
                minutes = moment().format('mm');
                break;

            case "day":
                year = moment().format('YYYY');
                month = moment().format('MMM').toUpperCase();
                day = moment().add(amount, 'day').format('D');
                hours = moment().format('HH');
                minutes = moment().format('mm');
                break;

            case "hours":
                year = moment().format('YYYY');
                month = moment().format('MMM').toUpperCase();
                day = moment().format('D');
                hours = moment().add(amount, 'hours').format('HH');
                minutes = moment().format('mm');
                break;

            case "minutes":
                year = moment().format('YYYY');
                month = moment().format('MMM').toUpperCase();
                day = moment().format('D');
                hours = moment().format('HH');
                minutes = moment().add(amount, 'minutes').format('mm');
                break;

        }
        await this.startDateInput.click();
        await this.commonModel.selectDate(year, month, day, hours, minutes);
    }

    async getNameActiveSchedule() {
        let schedulesTableVisible: boolean;
        let nameValue: string;
        nameValue = "";

        for (let i = 0; i < 80; i++) {
            schedulesTableVisible = await this.schedulesTable.isVisible();
            if (schedulesTableVisible) {
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(schedulesTableVisible!).toBeTruthy();

        for (let i = 0; i < 60; i++) {
            nameValue = await this.schedulesTable.locator('tr').nth(0).locator('td').nth(0).innerText();

            if (nameValue !== "") {
                break;
            }

            await this.page.waitForTimeout(300);
        }
        return nameValue!;

    }

    async verifyScheduleIsInactive(name: string) {
        let tableVisible: boolean;
        let editButtonVisible: boolean;
        let deleteButtonVisible: boolean;

        for (let i = 0; i < 60; i++) {
            tableVisible = await this.schedulesTable.locator(`tr:has-text("${name}")`).isVisible();
            if (tableVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(tableVisible!).toBeTruthy();

        for (let i = 0; i < 60; i++) {
            editButtonVisible = await this.schedulesTable.locator(`tr:has-text("${name}")`).locator("td:nth-child(4) > button:nth-child(1)").isVisible();
            if (!editButtonVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(editButtonVisible!).toBeFalsy();

        for (let i = 0; i < 60; i++) {
            deleteButtonVisible = await this.schedulesTable.locator(`tr:has-text("${name}")`).locator("td:nth-child(4) > button:nth-child(2)").isVisible();
            if (!deleteButtonVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(deleteButtonVisible!).toBeFalsy();
    }

    async clickDeleteButtonFromActiveSchedule() {
        let scheduleTableVisible: boolean;
        let editButtonVisible: boolean;
        let deleteButtonVisible: boolean;
        let scheduleActiveIsVisible: boolean;

        for (let i = 0; i < 60; i++) {
            scheduleTableVisible = await this.schedulesTable.last().isVisible();
            if (scheduleTableVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(scheduleTableVisible!).toBeTruthy();

        for (let i = 0; i < 60; i++) {
            editButtonVisible = await this.schedulesTable.locator(`tr:nth-child(1)`).locator("td:nth-child(4) > button:nth-child(1)").isVisible();
            if (editButtonVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(editButtonVisible!).toBeTruthy();

        for (let i = 0; i < 60; i++) {
            deleteButtonVisible = await this.schedulesTable.locator(`tr:nth-child(1)`).locator("td:nth-child(4) > button:nth-child(2)").isVisible();
            if (deleteButtonVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(deleteButtonVisible!).toBeTruthy();

        await this.schedulesTable.locator(`tr:nth-child(1)`).locator("td:nth-child(4) > button:nth-child(2)").click();
    }

    async verifyErrorMessage() {
        let snackBarVisible: boolean;
        let snackBarText: string;

        for (let i = 0; i < 60; i++) {
            snackBarVisible = await this.commonModel.snackbar.isVisible();
            if (snackBarVisible) {
                break;
            }

            await this.page.waitForTimeout(300);
        }

        snackBarText = await this.commonModel.snackbar.innerText();
        expect(snackBarText).toContain("You can't delete");
    }

    async verifyThatTheSchedulesButtonIsNotVisible() {

        await expect( async () => {
            await expect(this.schedulesTable.locator('tr').last()).toBeVisible( {timeout:300} ); 
        }).toPass();

        await expect( async () => {
            await expect(this.addScheduleBtn.locator('tr')).not.toBeVisible( {timeout:300} ); 
        }).toPass();

    }

    async verifyOptionsAreDisplayedInTheOptionsModal() {
        let categoryListVisible: boolean;
        let menuVisible: boolean;
        let moveTotopVisible: boolean;
        let moveToBottomVisible: boolean;
        let listHideVisible: boolean;
        let categoryName: string;

        for (let i = 0; i < 60; i++) {
            categoryListVisible = await this.categoryListFirst.isVisible();
            if (categoryListVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(categoryListVisible!).toBeTruthy();

        await this.categoryListFirst.locator('tr').first().isVisible();
        await this.categoryListFirst.locator('tr').first().scrollIntoViewIfNeeded();
        categoryName = (await this.categoryListFirst.locator('tr').first().locator('td:nth-child(1)').innerText()).trim();
        await this.categoryListFirst.locator('tr').first().locator('button:nth-child(3)').click();

        for (let i = 0; i < 60; i++) {
            menuVisible = await this.categoryMenu.isVisible();
            if (menuVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(menuVisible!).toBeTruthy();


        for (let i = 0; i < 60; i++) {
            moveTotopVisible = await this.categoryMenu.locator('div.schedules-menu ul > li > div:nth-child(1)').isVisible();
            moveToBottomVisible = await this.categoryMenu.locator('div.schedules-menu ul > li > div:nth-child(2)').isVisible();
            listHideVisible = await this.categoryMenu.locator('div.schedules-menu ul > li > div:nth-child(3)').isVisible();
            if (moveTotopVisible && moveToBottomVisible && listHideVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(moveTotopVisible!).toBeTruthy;
        expect(moveToBottomVisible!).toBeTruthy;
        expect(listHideVisible!).toBeTruthy;
    }

    async moveLastCategoryInTheListToTheTopPageSection() {
        let categoryListVisible: boolean;
        let menuVisible: boolean;
        let lastCategoryName: string;
        let firstCategoryName: string;

        for (let i = 0; i < 60; i++) {
            categoryListVisible = await this.categoryListPage.isVisible();
            if (categoryListVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(categoryListVisible!).toBeTruthy();

        await this.categoryListPage.locator('tr').last().isVisible();
        await this.categoryListPage.locator('tr').last().scrollIntoViewIfNeeded();
        lastCategoryName = (await this.categoryListPage.locator('tr').last().locator('td:nth-child(1)').innerText()).trim();
        await this.categoryListPage.locator('tr').last().locator('button:nth-child(3)').click();

        for (let i = 0; i < 60; i++) {
            menuVisible = await this.categoryMenu.isVisible();
            if (menuVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(menuVisible!).toBeTruthy();

        await this.moveToTop.click({ delay: 2000 });

        await this.categoryListPage.locator('tr').first().isVisible();
        await this.categoryListPage.locator('tr').first().scrollIntoViewIfNeeded();
        for (let i = 0; i < 60; i++) {
            firstCategoryName = (await this.categoryListPage.locator('tr').first().locator('td:nth-child(1)').innerText()).trim();
            if (firstCategoryName == lastCategoryName) {
               break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(firstCategoryName!).toEqual(lastCategoryName!);
    }

    async moveLastCategoryInTheListToTheTopSubPageSection() {
        let categoryListVisible: boolean;
        let menuVisible: boolean;
        let lastCategoryName: string;
        let firstCategoryName: string;

        for (let i = 0; i < 60; i++) {
            categoryListVisible = await this.categoryListSubPage.isVisible();
            if (categoryListVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(categoryListVisible!).toBeTruthy();

        await this.categoryListSubPage.locator('tr').last().isVisible();
        await this.categoryListSubPage.locator('tr').last().scrollIntoViewIfNeeded();
        lastCategoryName = (await this.categoryListSubPage.locator('tr').last().locator('td:nth-child(1)').innerText()).trim();
        await this.categoryListSubPage.locator('tr').last().locator('button:nth-child(3)').click();

        for (let i = 0; i < 60; i++) {
            menuVisible = await this.categoryMenu.isVisible();
            if (menuVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(menuVisible!).toBeTruthy();

        await this.moveToTop.click({ delay: 2000 });

        await this.categoryListSubPage.locator('tr').first().isVisible();
        await this.categoryListSubPage.locator('tr').first().scrollIntoViewIfNeeded();
        for (let i = 0; i < 60; i++) {
            firstCategoryName = (await this.categoryListSubPage.locator('tr').first().locator('td:nth-child(1)').innerText()).trim();
            if (firstCategoryName == lastCategoryName) {
               break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(firstCategoryName!).toEqual(lastCategoryName!);
    }

    async moveFirstCategoryInTheListToTheBottomPageSection() {
        let categoryListVisible: boolean;
        let menuVisible: boolean;
        let lastCategoryName: string;
        let firstCategoryName: string;

        for (let i = 0; i < 60; i++) {
            categoryListVisible = await this.categoryListPage.isVisible();
            if (categoryListVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(categoryListVisible!).toBeTruthy();

        await this.categoryListPage.locator('tr').first().isVisible();
        await this.categoryListPage.locator('tr').first().scrollIntoViewIfNeeded();
        lastCategoryName = (await this.categoryListPage.locator('tr').first().locator('td:nth-child(1)').innerText()).trim();
        await this.categoryListPage.locator('tr').first().locator('button:nth-child(3)').click();

        for (let i = 0; i < 60; i++) {
            menuVisible = await this.categoryMenu.isVisible();
            if (menuVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(menuVisible!).toBeTruthy();

        await this.moveToBottom.click({ delay: 2000 });

        await this.categoryListPage.locator('tr').last().isVisible();
        await this.categoryListPage.locator('tr').last().scrollIntoViewIfNeeded();
        for (let i = 0; i < 60; i++) {
            firstCategoryName = (await this.categoryListPage.locator('tr').last().locator('td:nth-child(1)').innerText()).trim();
            if (firstCategoryName == lastCategoryName) {
               break;
            }
            await this.page.waitForTimeout(300);
        }
        
        expect(firstCategoryName!).toEqual(lastCategoryName!);
    }

    async moveFirstCategoryInTheListToTheBottomSubPageSection() {
        let categoryListVisible: boolean;
        let menuVisible: boolean;
        let lastCategoryName: string;
        let firstCategoryName: string;

        for (let i = 0; i < 60; i++) {
            categoryListVisible = await this.categoryListSubPage.isVisible();
            if (categoryListVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(categoryListVisible!).toBeTruthy();

        await this.categoryListSubPage.locator('tr').first().isVisible();
        await this.categoryListSubPage.locator('tr').first().scrollIntoViewIfNeeded();
        lastCategoryName = (await this.categoryListSubPage.locator('tr').first().locator('td:nth-child(1)').innerText()).trim();
        await this.categoryListSubPage.locator('tr').first().locator('button:nth-child(3)').click();

        for (let i = 0; i < 60; i++) {
            menuVisible = await this.categoryMenu.isVisible();
            if (menuVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(menuVisible!).toBeTruthy();

        await this.moveToBottom.click({ delay: 2000 });

        await this.categoryListSubPage.locator('tr').last().isVisible();
        await this.categoryListSubPage.locator('tr').last().scrollIntoViewIfNeeded();
        for (let i = 0; i < 60; i++) {
            firstCategoryName = (await this.categoryListSubPage.locator('tr').last().locator('td:nth-child(1)').innerText()).trim();
            if (firstCategoryName == lastCategoryName) {
               break;
            }
            await this.page.waitForTimeout(300);
        }
        
        expect(firstCategoryName!).toEqual(lastCategoryName!);
    }

    async waitSaveButtonIsNotVisible(){
        let saveBtnVisible: boolean;

        for (let i = 0; i < 60; i++) {
            saveBtnVisible = await this.categoryListSubPage.isVisible();
            if (!saveBtnVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(saveBtnVisible!).toBeFalsy();
    }

    async verifyThatTheCategoryIsMovedAtTheBottomInTheCircularBuilder(categoryName: string){
        let sectionTableHeaderVisible: boolean;
        let sectionTableHeaderName: string;
        let index: number;

        for(let i = 0; i < 60; i++){
            sectionTableHeaderVisible = await this.sectionTableHeader.first().isVisible();
            if(sectionTableHeaderVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }
        
        expect(sectionTableHeaderVisible!).toBeTruthy();

        let categoryHeaderCount = await this.sectionTableHeader.count();
        
        for(let i = 0; i < categoryHeaderCount; i++){
            sectionTableHeaderName = (await this.sectionTableHeader.nth(i).innerText()).trim();
            if(sectionTableHeaderName == categoryName){
                index = i;
                break;
            }
        }
        
        expect(index!).toEqual(1);
        
    }

    async verifyThatTheCategoryIsMovedAtTheTopInTheCircularBuilder(categoryName: string){
        let sectionTableHeaderVisible: boolean;
        let sectionTableHeaderName: string;
        let index: number;

        for(let i = 0; i < 60; i++){
            sectionTableHeaderVisible = await this.sectionTableHeader.first().isVisible();
            if(sectionTableHeaderVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }
        
        expect(sectionTableHeaderVisible!).toBeTruthy();

        let categoryHeaderCount = await this.sectionTableHeader.count();
        
        for(let i = 0; i < categoryHeaderCount; i++){
            sectionTableHeaderName = (await this.sectionTableHeader.nth(i).innerText()).trim();
            if(sectionTableHeaderName == categoryName){
                index = i;
                break;
            }
        }
        
        expect(index!).toEqual(0);
        
    }

    async verifyThatTheCategoryHasHiddenIcon(categoryName: string){
        let sectionTableHeaderVisible: boolean;
        let sectionTableHeaderName: string;
        let index: number;
        let notVisibleIconVisible: boolean;

        for(let i = 0; i < 60; i++){
            sectionTableHeaderVisible = await this.categoryRowHeader.first().isVisible();
            if(sectionTableHeaderVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(sectionTableHeaderVisible!).toBeTruthy();

        let categoryHeaderCount = await this.categoryRowHeader.count();
        
        for(let i = 0; i < categoryHeaderCount; i++){
            sectionTableHeaderName = (await this.categoryRowHeader.nth(i).innerText()).trim();
            if(sectionTableHeaderName == categoryName){
                index = i;
                break;
            }
        }
        
        notVisibleIconVisible = await this.categoryRowHeader.nth(index!).locator('a > div > div > i').isVisible();

        expect(notVisibleIconVisible!).toBeTruthy();
    }

    /**
     * This function click the hide button from the first category in the list
     */
    async hideFirstPageCategoryInTheList() {
        let categoryListVisible: boolean;
        let menuVisible: boolean;
        let categoryName: string;
        let rowClass: string | null;

        for (let i = 0; i < 60; i++) {
            categoryListVisible = await this.categoryListPage.isVisible();
            if (categoryListVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(categoryListVisible!).toBeTruthy();

        await this.categoryListPage.locator('tr').first().isVisible();
        await this.categoryListPage.locator('tr').first().scrollIntoViewIfNeeded();
        categoryName = (await this.categoryListPage.locator('tr').first().locator('td:nth-child(1)').innerText()).trim();
        await this.categoryListPage.locator('tr').first().locator('button:nth-child(3)').click({ delay: 3000 });

        for (let i = 0; i < 60; i++) {
            menuVisible = await this.categoryMenu.isVisible();
            if (menuVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(menuVisible!).toBeTruthy();

        await this.listHide.click({ delay: 6000 });

        for (let i = 0; i < 60; i++) {
            rowClass = await this.categoryListPage.locator('tr').first().getAttribute("class");
            if (rowClass?.includes('deleted-row')) {
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(rowClass!).toContain('deleted-row');
    }
    
   
    async unhideFirstPageCategoryInTheList() {
        let categoryListVisible: boolean;
        let menuVisible: boolean;
        let categoryName: string;
        let rowClass: string | null;

        for (let i = 0; i < 60; i++) {
            categoryListVisible = await this.categoryListPage.isVisible();
            if (categoryListVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(categoryListVisible!).toBeTruthy();

        await this.categoryListPage.locator('tr').first().isVisible();
        await this.categoryListPage.locator('tr').first().scrollIntoViewIfNeeded();
        categoryName = (await this.categoryListPage.locator('tr').first().locator('td:nth-child(1)').innerText()).trim();
        await this.categoryListPage.locator('tr').first().locator('button:nth-child(3)').click({ delay: 3000 });

        for (let i = 0; i < 60; i++) {
            menuVisible = await this.categoryMenu.isVisible();
            if (menuVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(menuVisible!).toBeTruthy();

        await this.listHide.click({ delay: 4000 });

        for (let i = 0; i < 60; i++) {
            rowClass = await this.categoryListPage.locator('tr').first().getAttribute("class");
            if (rowClass?.includes('p-element ng-star-inserted')) {
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(rowClass!).toContain('p-element ng-star-inserted');
    }


    /**
     * This function click the hide button from the first category in the list
     */
    async hideFirstSubPageCategoryInTheList() {
        let categoryListVisible: boolean;
        let menuVisible: boolean;
        let categoryName: string;
        let rowClass: string | null;

        for (let i = 0; i < 60; i++) {
            categoryListVisible = await this.categoryListSubPage.isVisible();
            if (categoryListVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(categoryListVisible!).toBeTruthy();

        await this.categoryListSubPage.locator('tr').first().isVisible();
        await this.categoryListSubPage.locator('tr').first().scrollIntoViewIfNeeded();
        categoryName = (await this.categoryListSubPage.locator('tr').first().locator('td:nth-child(1)').innerText()).trim();
        await this.categoryListSubPage.locator('tr').first().locator('button:nth-child(3)').click({ delay: 3000 });

        for (let i = 0; i < 60; i++) {
            menuVisible = await this.categoryMenu.isVisible();
            if (menuVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(menuVisible!).toBeTruthy();

        await this.listHide.click({ delay: 6000 });

        for (let i = 0; i < 60; i++) {
            rowClass = await this.categoryListSubPage.locator('tr').first().getAttribute("class");
            if (rowClass?.includes('deleted-row')) {
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(rowClass!).toContain('deleted-row');
    }

    async unhideFirstSubPageCategoryInTheList() {
        let categoryListVisible: boolean;
        let menuVisible: boolean;
        let categoryName: string;
        let rowClass: string | null;

        for (let i = 0; i < 60; i++) {
            categoryListVisible = await this.categoryListSubPage.isVisible();
            if (categoryListVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(categoryListVisible!).toBeTruthy();

        await this.categoryListSubPage.locator('tr').first().isVisible();
        await this.categoryListSubPage.locator('tr').first().scrollIntoViewIfNeeded();
        categoryName = (await this.categoryListSubPage.locator('tr').first().locator('td:nth-child(1)').innerText()).trim();
        await this.categoryListSubPage.locator('tr').first().locator('button:nth-child(3)').click({ delay: 3000 });

        for (let i = 0; i < 60; i++) {
            menuVisible = await this.categoryMenu.isVisible();
            if (menuVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(menuVisible!).toBeTruthy();

        await this.listHide.click({ delay: 4000 });

        for (let i = 0; i < 60; i++) {
            rowClass = await this.categoryListSubPage.locator('tr').first().getAttribute("class");
            if (rowClass?.includes('p-element ng-star-inserted')) {
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(rowClass!).toContain('p-element ng-star-inserted');
    }


    async clickLastCategoryBookmarksButton() {
        let categoryListVisible: boolean;
        let menuVisible: boolean;
        let categoryName: string;
        let iconClass: string | null;

        for (let i = 0; i < 60; i++) {
            categoryListVisible = await this.categoryListFirst.isVisible();
            if (categoryListVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(categoryListVisible!).toBeTruthy();

        await this.categoryListFirst.locator('tr').last().isVisible();
        await this.categoryListFirst.locator('tr').last().scrollIntoViewIfNeeded();
        categoryName = (await this.categoryListFirst.locator('tr').last().locator('td:nth-child(1)').innerText()).trim();
        await this.categoryListFirst.locator('tr').last().locator('td:nth-child(2)').locator("button:nth-child(2)").click();

        for (let i = 0; i < 60; i++) {
            iconClass = await this.categoryListFirst.locator('tr').last().locator('td:nth-child(2)').locator("button:nth-child(2)").getAttribute("class");
            if (!iconClass?.includes("category-header-active")) {
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(iconClass!).toContain("category-header-active");
    }


    async clickLastPageCategoryPageBookmarksButton() {
        let categoryListVisible: boolean;
        let menuVisible: boolean;
        let categoryName: string;
        let iconClass: string | null;

        for (let i = 0; i < 60; i++) {
            categoryListVisible = await this.categoryListPage.isVisible();
            if (categoryListVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(categoryListVisible!).toBeTruthy();

        await this.categoryListPage.locator('tr').last().isVisible();
        await this.categoryListPage.locator('tr').last().scrollIntoViewIfNeeded();
        categoryName = (await this.categoryListPage.locator('tr').last().locator('td:nth-child(1)').innerText()).trim();
        await this.categoryListPage.locator('tr').last().locator('td:nth-child(2)').locator("button:nth-child(2)").click();

        for (let i = 0; i < 60; i++) {
            iconClass = await this.categoryListPage.locator('tr').last().locator('td:nth-child(2)').locator("button:nth-child(2)").getAttribute("class");
            if (!iconClass?.includes("category-header-active")) {
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(iconClass!).toContain("category-header-active");
    }

    async clickLastSubPageCategoryPageBookmarksButton() {
        let categoryListVisible: boolean;
        let menuVisible: boolean;
        let categoryName: string;
        let iconClass: string | null;

        for (let i = 0; i < 60; i++) {
            categoryListVisible = await this.categoryListSubPage.isVisible();
            if (categoryListVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(categoryListVisible!).toBeTruthy();

        await this.categoryListSubPage.locator('tr').last().isVisible();
        await this.categoryListSubPage.locator('tr').last().scrollIntoViewIfNeeded();
        categoryName = (await this.categoryListSubPage.locator('tr').last().locator('td:nth-child(1)').innerText()).trim();
        await this.categoryListSubPage.locator('tr').last().locator('td:nth-child(2)').locator("button:nth-child(2)").click();

        for (let i = 0; i < 60; i++) {
            iconClass = await this.categoryListSubPage.locator('tr').last().locator('td:nth-child(2)').locator("button:nth-child(2)").getAttribute("class");
            if (!iconClass?.includes("category-header-active")) {
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(iconClass!).toContain("category-header-active");
    }

    async clickFirstPageCategoryBookmarksButton() {
        let categoryListVisible: boolean;
        let menuVisible: boolean;
        let categoryName: string;
        let iconClass: string | null;

        for (let i = 0; i < 60; i++) {
            categoryListVisible = await this.categoryListPage.isVisible();
            if (categoryListVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(categoryListVisible!).toBeTruthy();

        await this.categoryListPage.locator('tr').first().isVisible();
        await this.categoryListPage.locator('tr').first().scrollIntoViewIfNeeded();
        categoryName = (await this.categoryListPage.locator('tr').first().locator('td:nth-child(1)').innerText()).trim();
        await this.categoryListPage.locator('tr').first().locator('td:nth-child(2)').locator("button:nth-child(2)").click();

        for (let i = 0; i < 60; i++) {
            iconClass = await this.categoryListPage.locator('tr').first().locator('td:nth-child(2)').locator("button:nth-child(2)").getAttribute("class");
            if (!iconClass?.includes("category-header-active")) {
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(iconClass!).toContain("category-header-active");
    }

    async clickFirstSubPageCategoryBookmarksButton() {
        let categoryListVisible: boolean;
        let menuVisible: boolean;
        let categoryName: string;
        let iconClass: string | null;

        for (let i = 0; i < 60; i++) {
            categoryListVisible = await this.categoryListSubPage.isVisible();
            if (categoryListVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(categoryListVisible!).toBeTruthy();

        await this.categoryListSubPage.locator('tr').first().isVisible();
        await this.categoryListSubPage.locator('tr').first().scrollIntoViewIfNeeded();
        categoryName = (await this.categoryListSubPage.locator('tr').first().locator('td:nth-child(1)').innerText()).trim();
        await this.categoryListSubPage.locator('tr').first().locator('td:nth-child(2)').locator("button:nth-child(2)").click();

        for (let i = 0; i < 60; i++) {
            iconClass = await this.categoryListSubPage.locator('tr').first().locator('td:nth-child(2)').locator("button:nth-child(2)").getAttribute("class");
            if (!iconClass?.includes("category-header-active")) {
                break;
            }

            await this.page.waitForTimeout(300);
        }

        expect(iconClass!).toContain("category-header-active");
    }

    async getLastCategoryName(){
        let categoryListVisible: boolean;
        let categoryName: string;

        for (let i = 0; i < 60; i++) {
            categoryListVisible = await this.categoryListFirst.isVisible();
            if (categoryListVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(categoryListVisible!).toBeTruthy();

        await this.categoryListFirst.locator('tr').last().isVisible();
        await this.categoryListFirst.locator('tr').last().scrollIntoViewIfNeeded();
        categoryName = (await this.categoryListFirst.locator('tr').last().locator('td:nth-child(1)').innerText()).trim();      

        return categoryName;
    }

    async getFirstCategoryName(){
        let categoryListVisible: boolean;
        let categoryName: string;

        for (let i = 0; i < 60; i++) {
            categoryListVisible = await this.categoryListFirst.isVisible();
            if (categoryListVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(categoryListVisible!).toBeTruthy();

        await this.categoryListFirst.locator('tr').first().isVisible();
        await this.categoryListFirst.locator('tr').first().scrollIntoViewIfNeeded();
        categoryName = (await this.categoryListFirst.locator('tr').first().locator('td:nth-child(1)').innerText()).trim();      

        return categoryName;
    }

    /**
     * this function verifies that the apply button is not visible
     */
    async verifyApplyButtonIsNotVisible(){
        let isVisible: boolean;

        for(let i = 0; i < 60; i++) {
            isVisible = await this.applyButton.isVisible();
            if(! isVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }
        
        expect(isVisible!).toBeFalsy();
    }

    /**
     * This function verifies that the category table is visible
     */
    async verifyCategoryTableIsVisible() {
        let categoriesTableVisible: boolean;
        for (let i = 0; i < 60; i++) {
            categoriesTableVisible = await this.categoriesTable.locator('tr').first().isVisible();
            if (categoriesTableVisible) {
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(categoriesTableVisible!).toBeTruthy();
    }

    /***
     * this function returns the value if the new schedule modal is visible
     */
    async verifyAddNewScheduleModalIsVisible(){
        let addNewScheduleModalVisible: Boolean;

        addNewScheduleModalVisible = await this.addNewScheduleModal.isVisible();

        return addNewScheduleModalVisible;
    }

    /**
     * This function clicks the save button in the edit schedule modal
     */
    async onClickEditScheduleSaveButton() {

        let modalVisible: boolean;

        for(let i = 0; i < 60; i++){
            modalVisible = await this.editScheduleModal.isVisible();
            if(modalVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }

        await this.saveBtn.click();
        for(let i = 0; i < 60; i++){
            modalVisible = await this.editScheduleModal.isVisible();
            if(!modalVisible){
                if(modalVisible){
                    await this.saveBtn.click(); 
                }
                break;    
            }

            await this.page.waitForTimeout(300);
        }

    }

    /**
     * This functtion verifies that the input date field is visible
     */
    async verifyScheduleNameFieldIsDisabled(){

        let startDateInputDisabled: boolean;

        for (let i = 0; i < 60; i++) {
            startDateInputDisabled = await this.startDateInput.isDisabled();
            if(startDateInputDisabled){
                break;
            }

            await this.page.waitForTimeout(300);
        }

        await expect(this.startDateInput).toBeDisabled();
    }      
    
    /**
     * This function verifies that the unod button is visible
     */
    async verifyUndoButtonIsVisible(){
        let undoBtnVisible: boolean;

        for(let i = 0; i < 60; i++) {
            undoBtnVisible = await this.undoBtn.isVisible();
            if(undoBtnVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await expect(this.undoBtn).toBeVisible();
    }
    

}
