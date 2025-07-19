import { expect, Locator, Page } from '@playwright/test';
import { CommonModel } from './commonModel';
import { SidebarModel } from './sidebarModel';
import { mediaData } from '../data/mediaData';

export class MediaModel {

    readonly page: Page;
    readonly commonModel: CommonModel;
    readonly sidebarModel: SidebarModel;
    readonly mediaTable: Locator;
    readonly addMediaTable: Locator;
    readonly uploadBtn: Locator;
    readonly chooseImgInput: Locator;
    readonly addMediaPopupBtn: Locator;
    readonly tagsInput: Locator;
    readonly confirmBtn: Locator;
    readonly searchBar: Locator;
    readonly uploadFileArea: Locator;

    constructor (page: Page) {
        this.page = page;
        this.commonModel = new CommonModel(page);
        this.sidebarModel = new SidebarModel(page);
        this.mediaTable = page.locator('div.dh-detail-page__no-content table>tbody.p-datatable-tbody');
        this.addMediaTable = page.locator('app-new-media-dialog app-manage-media-content div.table-container table tbody');
        this.uploadBtn = page.locator('div.dh-detail-page__toolbar-actions-pane__no-content-view > dh-button');
        this.chooseImgInput = page.locator('p-fileupload span input[type="file"]');
        this.addMediaPopupBtn = page.locator('mat-dialog-actions>button');
        this.tagsInput = page.locator('li.p-chips-input-token input[placeholder="Write Tags"]');
        this.confirmBtn = page.locator('button.confirm-btn');
        this.searchBar = page.locator('div[class="p-inputgroup"] > input[type="text"]');
        this.uploadFileArea = page.locator('div.p-fileupload');
    }

    async uploadImage(imageUrl: string | string[]) {
        let exists = false;
        for (let i = 0; i <= 30 && !exists; i++) {
            await this.page.waitForTimeout(500);
            exists = await this.uploadBtn.isVisible();
        }
        if (!exists) {
            this.sidebarModel.onClickMediaOptionMenu();
        }

        await expect(this.uploadBtn).toBeVisible({ timeout: 10000 });
        await this.uploadBtn.click();
        await this.commonModel.waitUntilSpinnerDisappears();
        await expect(this.uploadFileArea).toBeVisible({ timeout: 10000 });
        await this.chooseImgInput.setInputFiles(imageUrl);
    }

    async onClickMediaCloseButton(){
        await this.addMediaPopupBtn.click();
    }

    /**
     * Click the action button on the media item required
     * @param name Media name item
     */
    async onClickDeleteMediaItem(name: string) {

        await expect(async () => {
            await expect(this.page.getByRole('row', { name: `${name}`})).toBeVisible({timeout:300});
        }).toPass();

        await this.page.getByRole('row', { name: `${name}`}).locator(`button[title="Delete Media"]`).click();
        await this.confirmBtn.click();

        await expect(async () => {
            await expect(this.page.getByRole('row', { name: `${name}`})).not.toBeVisible({timeout:300});
        }).toPass();
    }

    async setTags(tags: string) {
        await this.tagsInput.fill(tags);
        await this.page.keyboard.press('Enter');
    }

    async hasMediaTableValues() {

        await expect(async () => {
            await expect(this.mediaTable.first()).toBeVisible({timeout:300});
        }).toPass();

        await expect(async () => {
            let rowCount = await this.mediaTable.locator('tr').count();
            expect(rowCount!).toBeGreaterThan(0);
        }).toPass();

    }

    /**
     * Create default media item as a prerequisite for the test if it does not exists.
     * @param imageUrl
     */
    async checkTableRowCount(imageUrl: string) {
        let mediaTableVisible: boolean;
        for(let i = 0; i < 60; i++){
            mediaTableVisible = await this.mediaTable.locator('tr').first().isVisible();
            if(mediaTableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        await this.page.waitForTimeout(1000);

        const noImage = await this.mediaTable.locator('tr').nth(0).locator('td').nth(0).innerText();

        if (noImage === mediaData.noImagesFound) {
            await this.uploadImage(imageUrl);
            await this.commonModel.waitUntilSpinnerDisappears();
            await this.onClickMediaCloseButton();
        }
    }

    /**
     * Verify the media is uploaded in the add media modal
     * @param name
     * @param fileType
     */
    async checkMediaUploadedInTable(name: string, fileType: string) {

        let addMediaTableVisible: boolean;

        for(let i = 0; i < 60; i++){
            addMediaTableVisible = await this.addMediaTable.locator('tr').first().isVisible();
            if(addMediaTableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        const rowCount = await this.addMediaTable.locator('tr').count();
        let isFileUploaded = false;

        for(let i = 0; i < rowCount; i++) {
            const isNameExists = await this.addMediaTable.locator('tr').nth(i).locator('td').nth(0).innerText();
            const isUploaded = await this.addMediaTable.locator('tr').nth(i).locator('td').nth(1).innerText();
            const isTypeExists = await this.addMediaTable.locator('tr').nth(i).locator('td').nth(2).innerText();

            if (isNameExists === name && isUploaded.trim() === 'File uploaded' && isTypeExists.includes(fileType)) {
                isFileUploaded = true;
                break;
            }
        }
        expect(isFileUploaded).toBeTruthy();
    }

    async checkMediaInTable(name: string, fileType: string) {
        await this.page.waitForTimeout(1000);
        await expect(this.mediaTable).toBeEnabled({ timeout: 30000 });
        const rowCount = await this.mediaTable.locator('tr').count();
        let exists = false;

        for(let i = 0; i < rowCount; i++) {
            const isNameExists = await this.mediaTable.locator('tr').nth(i).locator('td').nth(1).innerText();
            const isTypeExists = await this.mediaTable.locator('tr').nth(i).locator('td').nth(2).innerText();

            if (isNameExists === name && isTypeExists.includes(fileType)) {
                exists = true;
                break;
            }

        }

        return exists;
    }

    async checkMediaInTableWithTags(name: string, fileType: string, tags: string) {

        await expect(async () => {
            await expect(this.mediaTable.first()).toBeVisible({timeout:300});
        }).toPass();

        let rowCount = await this.mediaTable.locator('tr').count();
        let exists = false;

        for(let i = 0; i < rowCount; i++) {
            const isNameExists = await this.mediaTable.locator('tr').nth(i).locator('td').nth(1).innerText();
            const isTypeExists = await this.mediaTable.locator('tr').nth(i).locator('td').nth(2).innerText();
            const isTagExists = await this.mediaTable.locator('tr').nth(i).locator('td').nth(5).innerText();

            if(isNameExists === name && isTypeExists.includes(fileType) && isTagExists === tags) {
                exists = true;
                break;
            }

        }

        return exists;
    }

    async checkMediaSearchValueInTable(name: string, fileType: string) {
        await this.page.waitForTimeout(5000);
        let tableVisible: boolean;
        let rowCount: number;
        let exists: boolean;
        exists = false;
        for(let i = 0; i < 60; i++){
            tableVisible = await this.mediaTable.locator('tr').first().isVisible();
            if(tableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        for(let i = 0; i < 90; i++){
            rowCount = await this.mediaTable.locator('tr').count();
            if(rowCount == 1){
                break;
            }
            await this.page.waitForTimeout(400);
        }

        rowCount = await this.mediaTable.locator('tr').count();

        for(let i = 0; i < rowCount; i++) {
            let isNameExists = await this.mediaTable.locator('tr').nth(i).locator('td').nth(1).innerText();
            let isTypeExists = await this.mediaTable.locator('tr').nth(i).locator('td').nth(2).innerText();
            if(isNameExists == name && isTypeExists.includes(fileType)){
                exists = true;
                break;
            }
            await this.page.waitForTimeout(300);
            expect(exists!).toBeTruthy();
        }
    }

    /**
     * Check if the last media record is deleted
     * @param name Media name item
     * @param createdAt Media created at date
     */
    async checkRowDelete(name: string, createdAt: string) {
        let mediaTableVisible: boolean;
        let mediaNameVisible: boolean;
        let mediaCreatedVisible: boolean;

        for(let i = 0; i < 60; i++){
            mediaTableVisible = await this.mediaTable.isVisible();
            if(mediaTableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        await expect(this.mediaTable).toBeVisible();

        let mediaName = this.mediaTable.locator('tr').nth(0).locator(`td:text("${name}")`);
        let mediaCreated = this.mediaTable.locator('tr').nth(0).locator(`td:text("${createdAt}")`);

        for(let i = 0; i < 90; i++){
            mediaNameVisible = await mediaName.isVisible();
            mediaCreatedVisible = await mediaCreated.isVisible();
            if(!mediaNameVisible && !mediaCreatedVisible){
                break;
            }
            await this.page.waitForTimeout(400);
        }
        expect(mediaNameVisible!).not.toBeTruthy();
        expect(mediaCreatedVisible!).not.toBeTruthy();
    }

    async waitUntilCloseBtnEnable() {
        let disable = true;
        for (let i = 0; i <= 30 && disable; i++) {
            await this.page.waitForTimeout(500);
            disable = await this.addMediaPopupBtn.isDisabled();
        }
        await this.page.waitForTimeout(500);
    }

    async hasMediaTableValuesMoreRows() {
        let mediaTableVisible: boolean;
        let rowCount: number;
        for(let i = 0; i < 80; i++){
            mediaTableVisible = await this.mediaTable.first().isVisible();
            if(mediaTableVisible){
                break;
            }
            await this.page.waitForTimeout(500);
        }
        for(let i = 0; i < 240; i++){
            rowCount = await this.mediaTable.locator('tr').count();
            if(rowCount > 2){
                break;
            }
            await this.page.waitForTimeout(1000);
        }

        expect(rowCount!).toBeGreaterThan(2);
    }

    /**
     * This function verifies if the url contains a specified string
     */
    async waitForUrlContains(site: string) {
        let urlContains: boolean;
        let url: string;

        for(let i = 0; i < 60; i++){
            url = this.page.url();
            if(url.includes(site)){
                break;
            }
            await this.page.waitForTimeout(400);
        }
    }

    async verifyAddMediaButtonIsNotDisplayed(){
        let addMediaPopupBtnVisible: boolean;

        for(let i = 0; i < 60; i++){
            addMediaPopupBtnVisible = await this.addMediaPopupBtn.isVisible();
            if(!addMediaPopupBtnVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(addMediaPopupBtnVisible!).toBeFalsy();
    }
}
