import { expect, Locator, Page } from '@playwright/test';
import { CommonModel } from './commonModel';
import { headlinesAndIconsData } from '../data/headlinesAndIconsData';
import { ColumnHeadersEnum } from '../enums/columnHeaders.enum';

export class HeadlinesAndIconsModel {

    readonly page: Page;
    readonly commonModel: CommonModel;
    readonly iconsTable: Locator;
    readonly headlinesTable: Locator;
    readonly editHeadlineBtn: Locator;
    readonly deleteHeadlineBtn: Locator;
    readonly editIconBtn: Locator;
    readonly deleteIconBtn: Locator;
    readonly searchHeadlineInput: Locator;
    readonly searchIconInput: Locator;
    readonly editIconField: Locator;
    readonly cancelEditButton: Locator;
    readonly noButtonDeleteModal: Locator;
    readonly nameHeader: Locator;
    readonly upSortIconNameHeader: Locator;
    readonly downSortIconNameHeader: Locator;
    readonly upSortIconNodeHeader: Locator;
    readonly nodeHeader: Locator;
    readonly downSortIconNodeHeader: Locator;
    readonly dimensionsHeader: Locator;
    readonly upSortIconDimensionsHeader: Locator;
    readonly downSortIconDimensionsHeader: Locator;
    readonly textHeader: Locator;
    readonly upSortIconTextHeader: Locator;
    readonly headlinesNodeHeader: Locator;
    readonly upSortHeadlinesNodeHeader: Locator;
    readonly downSortHeadlinesNodeHeader: Locator;
    readonly downSortIconTextHeader: Locator;

    readonly headlinesSelect: Locator;
    readonly iconsSelect: Locator;
    readonly addNewBtn: Locator;
    readonly nameHeadlineInput: Locator;
    readonly nameIconInput: Locator;
    readonly uploadImageIcon: Locator;
    readonly chooseImgInput: Locator;
    readonly saveBtn: Locator;
    readonly cancelBtn: Locator;

    constructor (page: Page) {
        this.page = page;
        this.commonModel = new CommonModel(page);
        this.iconsTable = page.locator('p-table table tbody.p-scroller-content').nth(0);
        this.headlinesTable = page.locator('p-table table tbody.p-scroller-content').nth(1);
        this.editHeadlineBtn = page.locator('p-table').nth(1).locator(`button[icon='pi pi-pencil']`);
        this.deleteHeadlineBtn = page.locator('p-table').nth(1).locator(`button[icon='pi pi-trash']`);
        this.editIconBtn = page.locator('p-table').nth(0).locator(`button[icon='pi pi-pencil']`);
        this.deleteIconBtn = page.locator('p-table').nth(0).locator(`button[icon='pi pi-trash']`);
        this.searchHeadlineInput = page.locator('input[placeholder="Search Headlines"]');
        this.searchIconInput = page.locator('input[placeholder="Search Icons"]');
        this.editIconField = page.locator('input[formcontrolname="name"]');
        this.cancelEditButton = page.locator('dh-new-headline-dialog button.cancel-btn');
        this.noButtonDeleteModal = page.locator('button.cancel-btn');
        this.nameHeader = page.locator('div[id="icons-table"] p-table table thead tr th:nth-child(2)');
        this.upSortIconNameHeader = page.locator('div.dh-row div:nth-child(1) p-table table thead tr th:nth-child(2) i.pi-sort-amount-up-alt');
        this.downSortIconNameHeader = page.locator('div.dh-row div:nth-child(1) p-table table thead tr th:nth-child(2) i.pi-sort-amount-down');
        this.upSortIconNodeHeader = page.locator('div.dh-row div:nth-child(1) p-table table thead tr th:nth-child(3) i.pi-sort-amount-up-alt');
        this.nodeHeader = page.locator('div[id="icons-table"] p-table table thead tr th:nth-child(3)');
        this.downSortIconNodeHeader = page.locator('div.dh-row div:nth-child(1) p-table table thead tr th:nth-child(3) i.pi-sort-amount-down');
        this.dimensionsHeader = page.locator('div[id="icons-table"] p-table table thead tr th:nth-child(4)');
        this.upSortIconDimensionsHeader = page.locator('div.dh-row div:nth-child(1) p-table table thead tr th:nth-child(4) i.pi-sort-amount-up-alt');
        this.downSortIconDimensionsHeader = page.locator('div.dh-row div:nth-child(1) p-table table thead tr th:nth-child(4) i.pi-sort-amount-down');
        this.textHeader = page.locator('div[id="headlines-table"] p-table table thead tr th:nth-child(1)');
        this.upSortIconTextHeader = page.locator('div.dh-row div:nth-child(2) p-table table thead tr th:nth-child(1) i.pi-sort-amount-up-alt');
        this.headlinesNodeHeader = page.locator('div[id="headlines-table"] p-table table thead tr th:nth-child(2)');
        this.upSortHeadlinesNodeHeader = page.locator('div.dh-row div:nth-child(2) p-table table thead tr th:nth-child(2) i.pi-sort-amount-up-alt');
        this.downSortHeadlinesNodeHeader = page.locator('div.dh-row div:nth-child(2) p-table table thead tr th:nth-child(2) i.pi-sort-amount-down');
        this.downSortIconTextHeader = page.locator('div.dh-row div:nth-child(2) p-table table thead tr th:nth-child(1) i.pi-sort-amount-down');

        this.headlinesSelect = page.locator('app-headline-field-content div.p-multiselect-label-container');
        this.iconsSelect = page.locator('app-icon-mutilist-field div.p-multiselect-label-container');
        this.addNewBtn = page.locator('div.p-multiselect-footer>p-footer>dh-button');
        this.nameHeadlineInput = page.locator('app-translation-field[formcontrolname="name"] input[formcontrolname="translation"]');
        this.nameIconInput = page.locator('mat-form-field input[formcontrolname="name"]');
        this.uploadImageIcon = page.locator('button mat-icon[role="img"]');
        this.chooseImgInput = page.locator('p-fileupload input[type="file"]');
        this.saveBtn = page.locator('mat-dialog-container button[color="primary"]');
        this.cancelBtn = page.locator('button.cancel-btn');
    }

    /**
     * Delete headline record
     * @param name
     */
    async onClickHeadlineDeleteItem(name: string) {
        await this.waitHeadlinesRecordsToLoad();

        await expect( async () => {
            await expect(this.page.getByRole('row', { name: `${name}` }).getByTitle('Delete Headline')).toBeVisible( {timeout:300} );
        }).toPass();

        await this.page.getByRole('row', { name: `${name}` }).getByTitle('Delete Headline').click();
        
        await expect( async () => {
            await this.commonModel.onClickYesConfirmButton();
        }).toPass();

        await expect( async () => {
            await expect(this.commonModel.confirmBtn).not.toBeVisible( {timeout:300} );
            await expect(this.commonModel.snackbar).toBeVisible({timeout:300} );
            await expect(this.page.getByRole('row', { name: `${name}` })).not.toBeVisible( {timeout:300} );
        }).toPass();
    }

    /**
     * Delete icon record
     * @param name
     */
    async onClickIconDeleteItem(name: string, deleteIcon: boolean = true) {
        await this.waitIconsRecordsToLoad();
        const rowCount = await this.iconsTable.locator('tr').count();

        for (let i = 0; i < rowCount; i++) {
            const columnText = await this.iconsTable.locator('tr').nth(i).locator('td').nth(1).innerText();
            if (columnText === name) {
                await this.deleteIconBtn.nth(i).click();
                if (deleteIcon) {
                    await this.commonModel.onClickYesConfirmButton();
                    await this.commonModel.waitUntilSpinnerDisappears();
                }
                break;
            }
        }
    }

    /**
     * Click on the edit headline icon
     * @param name
     */
    async onClickHeadlineEditItem(name: string) {
        await this.waitHeadlinesRecordsToLoad();
        const rowCount = await this.headlinesTable.locator('tr').count();

        for (let i = 0; i < rowCount; i++) {
            const columnText = await this.headlinesTable.locator('tr').nth(i).locator('td').nth(0).innerText();
            if (columnText === name) {
                await this.editHeadlineBtn.nth(i).click();
                break;
            }
        }
    }

    /**
     * Click on the edit icon's icon
     * @param name
     */
    async onClickIconEditItem(name: string) {
        await this.waitIconsRecordsToLoad();
        const rowCount = await this.iconsTable.locator('tr').count();

        for (let i = 0; i < rowCount; i++) {
            const columnText = await this.iconsTable.locator('tr').nth(i).locator('td').nth(1).innerText();
            if (columnText === name) {
                await this.editIconBtn.nth(i).click();
                break;
            }
        }
    }

    /**
     * Check if a headline exists or not in the headlines table
     * @param name
     * @param exists
     */
    async checkHeadlineInTable(name: string, exists: boolean) {
        let headline = this.headlinesTable.getByText(name);
        let isVisible: boolean;

        if (exists) {
            for (let i = 0; i < 60; i++) {
                isVisible = await headline.isVisible();
                if(isVisible) {
                    break;
                }

                await this.page.waitForTimeout(300);
            }

            expect(isVisible!).toBeTruthy();

        } else if (!exists) {
            for (let i = 0; i < 60; i++) {
                isVisible = await headline.isVisible();
                if(!isVisible) {
                    break;
                }

                await this.page.waitForTimeout(300);
            }

            expect(isVisible!).toBeFalsy();

        }
    }

    async setHeadlineSearchValue(value: string) {
        await this.commonModel.verifyThatLocatorIsVisible(this.searchHeadlineInput);
        await this.searchHeadlineInput.click();
        await this.searchHeadlineInput.pressSequentially(value, {delay:400});
    }

    async setIconSearchValue(value: string) {
        await this.commonModel.verifyThatLocatorIsVisible(this.searchHeadlineInput);
        await this.searchIconInput.click();
        await this.searchIconInput.pressSequentially(value, {delay:200});
    }

    /**
     * Check if an icon exists or not in the icons table
     * @param name
     * @param exists
     */
    async checkIconInTable(name: string, exists: boolean) {
        let icon: Locator;
        let iconVisible: boolean;
        icon = this.iconsTable.getByText(name);
        
        if (exists) {
            for(let i = 0; i < 60; i++) {
                iconVisible = await icon.isVisible();
                if(iconVisible){
                    break;
                }

                await this.page.waitForTimeout(300);
            }

            expect(iconVisible!).toBeTruthy();

        } else if(!exists) {
            for(let i = 0; i < 60; i++) {
                iconVisible = await icon.isVisible();
                if(!iconVisible){
                    break;
                }

                await this.page.waitForTimeout(300);
            }

            expect(iconVisible!).toBeFalsy();
        }
    }

    async onClickHeadlinesField() {

        await expect( async () => {
            await expect(this.headlinesSelect).toBeVisible( {timeout:300} );
        }).toPass();

        await this.headlinesSelect.click();
    }

    async onClickIconsField() {
        let iconsSelectVisible: boolean;
        for(let i = 0; i < 60; i++){
            iconsSelectVisible = await this.iconsSelect.isVisible();
            if(iconsSelectVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        await this.iconsSelect.click();
    }

    /**
     * Click in _Add New Headline_ or _Add New Icon_ button
     */
    async onClickAddNewHeadlineOrIcon() {
        await expect( async () => {
            await expect(this.addNewBtn).toBeVisible( {timeout:300} );
        }).toPass();
        await this.addNewBtn.click( {delay:400} );
    }

    async onClickSaveBtn(index: number = 0){
        await this.page.waitForTimeout(400);
        let saveBtnVisible: boolean;
        for(let i = 0; i < 60; i++){
            saveBtnVisible = await this.saveBtn.nth(index).isVisible();
            if(saveBtnVisible){
                break;
            }
            await this.page.waitForTimeout(400);
        }
        await this.saveBtn.nth(index).click();
    }

    async onClickCancelButton() {
        await this.page.waitForTimeout(400);
        let cancelBtnVisible: boolean;
        for(let i = 0; i < 60; i++){
            cancelBtnVisible = await this.cancelBtn.isVisible();
            if(cancelBtnVisible){
                break;
            }
            await this.page.waitForTimeout(400);
        }
        await this.cancelBtn.click();
    }

    async setNameHeadline(value: string, index: number = 0) {
        
        await expect( async () => {
            await expect(this.nameHeadlineInput.nth(index)).toBeVisible( {timeout:300} );
        }).toPass();
        
        await this.nameHeadlineInput.nth(index).click( {delay:400} );
        await this.nameHeadlineInput.nth(index).pressSequentially(value, {delay:300});
    }

    async setNameIcon(value: string) {
        await this.page.waitForTimeout(400);
        let nameIconInputVisible: boolean;
        for(let i = 0; i < 60; i++){
            nameIconInputVisible = await this.nameIconInput.isVisible();
            if(nameIconInputVisible){
                break;
            }
            await this.page.waitForTimeout(400);
        }

        await this.nameIconInput.fill(value);
    }

    async setLogoIcon(imageUrl: string | string[]) {
        await this.page.waitForTimeout(500);
        await this.uploadImageIcon.click();
        await this.chooseImgInput.setInputFiles(imageUrl);
        await this.commonModel.waitUntilSpinnerDisappears();
        await this.onClickSaveBtn(1);
    }

    async getElementsInIconsTable(header: string, sort: boolean = false, sortDesc: boolean = false) {
        let index = 0;

        this.iconsTable.locator('tr').last();

        switch(header){
            case ColumnHeadersEnum.name:
                index = 1;
                break;
            case ColumnHeadersEnum.node:
                index = 2;
                break;
            case ColumnHeadersEnum.dimensions:
                index = 3;
                break;
        }

        let tableElements: string[] = [];

        await this.waitIconsRecordsToLoad();
        const rowCount = await this.iconsTable.locator('tr').count();

        for (let i = 0; i < rowCount; i++) {
            let iconName = (await this.iconsTable.locator('tr').nth(i).locator('td').nth(index).innerText()).trim();
            tableElements.push(String(iconName));
        }

        if (sort){
            tableElements = tableElements.sort(function(a, b) {
            return a.localeCompare(b)
            });
        
        }
        if (sortDesc) {
            tableElements = tableElements.sort(function(a, b) {
                return a.localeCompare(b)
                }).reverse();
        }

        return tableElements;
    }

    async getElementsInHeadlinesTable(header: string, sort: boolean = false, sortDesc: boolean = false) {
        let index = 0;

        switch(header){
            case ColumnHeadersEnum.text:
                index = 0;
                break;
            case ColumnHeadersEnum.node:
                index = 1;
                break;
        }

        let tableElements: string[] = [];

        await this.waitHeadlinesRecordsToLoad();
        const rowCount = await this.headlinesTable.locator('tr').count();

        for (let i = 0; i < rowCount; i++) {
            let headlinesName = await this.headlinesTable.locator('tr').nth(i).locator('td').nth(index).innerText();
            tableElements.push(headlinesName);
        }

        if (sort){
            tableElements = tableElements.sort(function(a, b) {
            return a.localeCompare(b)
            });
        
        }
        if (sortDesc) {
            tableElements = tableElements.sort(function(a, b) {
                return a.localeCompare(b)
                }).reverse();
        }

        return tableElements;
    }

    async verifySortUpIconInIconsTable(header: string) {
        if(header == "Name"){
            let value = await this.nameHeader.getAttribute('aria-sort');
            expect(value).toEqual('ascending');
        }

        if(header == "Node"){
            let value = await this.nodeHeader.getAttribute('aria-sort');
            expect(value).toEqual('ascending');
        }

        if(header == "Dimensions"){
            let value = await this.dimensionsHeader.getAttribute('aria-sort');
            expect(value).toEqual('ascending');
        }
     
    }

    async verifySortDownIconInIconsTable(header: string) {
        if(header == "Name"){
            let value = await this.nameHeader.getAttribute('aria-sort');
            expect(value).toEqual('descending');
        }

        if(header == "Node"){
            let value = await this.nodeHeader.getAttribute('aria-sort');
            expect(value).toEqual('descending');
        }

        if(header == "Dimensions"){
            let value = await this.dimensionsHeader.getAttribute('aria-sort');
            expect(value).toEqual('descending');
        }
    }

    async verifySortUpIconInHeadlinesTable(header: string) {
        if(header == "Text"){
            let value = await this.textHeader.getAttribute('aria-sort');
            expect(value).toEqual('ascending');
        }

        if(header == "Node"){
            let value = await this.headlinesNodeHeader.getAttribute('aria-sort');
            expect(value).toEqual('ascending');
        }
    }

    async verifySortDownIconInHeadlinesTable(header: string) {

        if(header == "Text"){
            let value = await this.textHeader.getAttribute('aria-sort');
            expect(value).toEqual('descending');
        }

        if(header == "Node"){
            let value = await this.headlinesNodeHeader.getAttribute('aria-sort');
            expect(value).toEqual('descending');
        }
    }

    async compareArrays(array1: string[], array2: string[]) {
        let comparison = array1.join() == array2.join();
        expect(comparison).toBeTruthy();
    }

    async onClickHeaderName() {
        await this.nameHeader.click({ delay: 0.5 });
    }

    async onClickHeaderNode() {
        await this.nodeHeader.click({ delay: 0.5 });
    }

    async onClickHeaderDimensions() {
        await this.dimensionsHeader.click({ delay: 0.5 });
    }

    async onClickHeaderText() {
        await this.textHeader.click({ delay: 0.5 });
    }

    async onClickHeaderHeadlineNode() {
        await this.headlinesNodeHeader.click({ delay: 0.5 });
    }

    async waitHeadlinesRecordsToLoad() {

        await expect( async () => {
            await expect(this.headlinesTable.locator('tr').last()).toBeVisible( {timeout:300} );
        }).toPass();

    }

    async waitIconsRecordsToLoad() {

        await expect( async () => {
            await expect(this.iconsTable.locator('tr').last()).toBeVisible( {timeout:300} );
        }).toPass();

    }

    async verifySnackBarMessage(headlineName: string){
        let commonModel = new CommonModel(this.page);

        await expect( async () => {
            await expect(commonModel.snackbar).toBeVisible( {timeout:300} );
        }).toPass();
        
        const deleteMsg = `'${headlineName}' ${headlinesAndIconsData.recordDeletedSuccessfully}`;

        await expect( async () => {
            expect((await commonModel.snackbar.innerText()).trim()).toEqual(deleteMsg);
        }).toPass();

        
    }


    async waitSnackBarIsNotVisible(){
        let commonModel = new CommonModel(this.page);

        await expect( async () => {
            await expect(commonModel.snackbar).not.toBeVisible( {timeout:300} );
        }).toPass();
    }
}
