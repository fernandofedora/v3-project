import {expect, Locator, Page} from '@playwright/test';
import { CommonModel } from '../pom/commonModel';
import { TopBarModel } from './topBarModel';
import { ContentModel } from './contentModel';
import { storeGroupMediaData } from '../data/storeGroupsData';
import { SidebarModel } from '../pom/sidebarModel';

export class StoreGroupsModel {

    readonly page: Page;
    readonly storeNameField: Locator;
    readonly addStoreGroupButton: Locator;
    readonly storeDescriptionField: Locator;
    readonly storeNotesField: Locator;
    readonly saveButton: Locator;
    readonly groupsTable: Locator;
    readonly yesButton: Locator;
    readonly noButton: Locator;
    readonly headerGroupTable: Locator;
    readonly uploadMediaButton: Locator;
    readonly closeButton: Locator;
    readonly addMediaUploadTable: Locator;
    readonly mediaUploadTable: Locator;
    readonly sidebarCloseButton: Locator;
    readonly storeGroupList: Locator;
    readonly appErrorMessages: Locator;
    readonly cancelButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.addStoreGroupButton = page.locator('dh-button').filter({ hasText: 'Add Group' });
        this.storeNameField = page.locator('mat-form-field input[formcontrolname="name"]');
        this.storeDescriptionField = page.locator('mat-form-field input[formcontrolname="description"]');
        this.storeNotesField = page.locator('mat-form-field textarea[formcontrolname="notes"]');
        this.saveButton = page.locator('button > span:text-is("Save")');
        this.groupsTable = page.locator('app-node-groups p-table table tbody');
        this.yesButton = page.locator('button > span:text-is("Yes")');
        this.noButton = page.locator('button > span:text-is("No")');
        this.headerGroupTable = page.locator('p-treetable table tbody');
        this.uploadMediaButton = page.locator('div[role="complementary"] div.dh-detail-page__wrapper dh-button>div.dh-button');
        this.closeButton = page.locator('button > span:text-is("Close")');
        this.addMediaUploadTable = page.locator('app-manage-media-content p-table table');
        this.mediaUploadTable = page.locator('p-sidebar .p-datatable-table');
        this.sidebarCloseButton = page.locator('.p-sidebar-close');
        this.storeGroupList = page.locator('app-stores-groups-list p-table table tbody');
        this.appErrorMessages = page.locator('app-error-messages');
        this.cancelButton = page.locator('button > span:text-is("Cancel")');
    }

    /**
     * Verify that the created message is present
     * @param message 
     */
    async verifyCreatedAlertMessage(message: string) {

        const common = new CommonModel(this.page);

        await expect(async () => {
            await expect(common.snackbar).toBeVisible( {timeout:300} );
        }).toPass();
        let text = await common.snackbar.textContent();
        expect(text).toContain(message);
    }

    /**
     * Verify that a specific group is created
     */
    async verifyTheGroupIsCreated(groupName: string){

        await expect(async () => {
            await expect(this.groupsTable.getByRole('row', { name: `${groupName}` })).toBeVisible( {timeout:300} );
        }).toPass();
        
    }

    /**
     * Delete group
     * @param title 
     */
    async deleteGroup(groupName: string){
        
        await expect(async () => {
            await expect(this.groupsTable.getByRole('row', { name: `${groupName}` })).toBeVisible( {timeout:300} );
        }).toPass();

        await this.groupsTable.getByRole('row', { name: `${groupName}` }).getByTitle('Delete Group').click();

        await expect(async () => {
            await expect(this.yesButton).toBeVisible({timeout:300});
        }).toPass();

        await this.yesButton.click();

        await expect(async () => {
            await expect(this.groupsTable.getByRole('row', { name: `${groupName}` })).not.toBeVisible( {timeout:300} );
        }).toPass();

        
    }

    async createStoreGroup(storeGroupDefaultName: string, storeGroupDefaultDescription: string, storeGroupDefaultNotes: string) {
        const common = new CommonModel(this.page);

        await expect(async () => {
            await expect(this.addStoreGroupButton).toBeVisible( {timeout:300} );
        }).toPass();
        
        await this.addStoreGroupButton.click();

        //Fill the from
        await this.storeNameField.fill(storeGroupDefaultName);
        await this.storeDescriptionField.fill(storeGroupDefaultDescription);
        await this.storeNotesField.fill(storeGroupDefaultNotes);

        //Click the save button
        await this.saveButton.click();
        await common.waitUntilSpinnerDisappears();

        //Verify the store group is created
        await expect(async () => {
            await expect(this.groupsTable.getByRole('row', { name: `${storeGroupDefaultName}` })).toBeVisible( {timeout:300} );
        }).toPass();
        
    }

    async getHeaderStoreGroupIndex(name: string ){
        let index: number| undefined;
        let topBar = new TopBarModel(this.page);
        await topBar.changeLocationButton.click();
        await expect(this.headerGroupTable).toBeVisible();
        await this.page.waitForTimeout(500);
        const rowCount = await this.headerGroupTable.locator('tr').count();
        for(let i = 0; i < rowCount; i++) {
            let columnText = await this.headerGroupTable.locator('tr').nth(i).locator('td').nth(0).textContent();
            let cleanColumnText = columnText?.trim();
            if(cleanColumnText === name){
                index = i;
                break;
            }
        }

        return index;
    }


    async getStoreGroupIndex(name: string ){
        let index: number| undefined;
        await expect(this.groupsTable).toBeVisible();
        await this.page.waitForTimeout(500);
        const rowCount = await this.groupsTable.locator('tr').count();
        for(let i = 0; i < rowCount; i++) {
            let columnText = await this.groupsTable.locator('tr').nth(i).locator('td').nth(0).textContent();
            let cleanColumnText = columnText?.trim();
            if(cleanColumnText === name){
                index = i;
                break;
            }
        }

        return index;
    }


    async createContentOnStoreGroup(i: number, contentDefaultTitle: string, contentDefaultDescription: string, contentDefaultStockImage: string) {
        const contentModel = new ContentModel(this.page);
        await this.headerGroupTable.locator("tr").nth(i).click();
        await contentModel.singleItemButton.click();

        //Fill the form
        await contentModel.hoverHeaders();
        await contentModel.titleInput.click();
        await contentModel.titleInput.fill(contentDefaultTitle);
        await contentModel.verifyTitleIsComplete(contentDefaultTitle);
        await contentModel.descriptionInput.fill("This is a description");
        await contentModel.categoryDropdown.click();
        //await contentModel.selectCategory(0);
        //await t.click(this.contentCardDropdown)
               //.click(this.contentCardOption.child().nth(-1));
        //await t.click(this.contentCustomSelectionButton);
        //await t.click(this.contentImageField)
               //.pressKey('ctrl+a delete')
               //.typeText(this.contentImageField, contentDefaultStockImage);

        //save
        //await t.click(this.contentSaveButton);

        // Validate message that appears when storeGroup is created
        // await t.expect(common.snackBar.innerText).contains(storeGroupsContentData.contentCreatedSuccessfully);

        //validate that the content is on the table
        //l/et contentChevronExists = this.contentChevron.exists;
        //let contentChevronVisible = this.contentChevron.visible;
        //await t.expect().ok( {timeout:20000} );
        //await t.expect().ok( {timeout:20000} );
        //const chevronCount = await this.contentChevron.count;
        //for(let i = 0; i < chevronCount; i++) {
            //await t.click(this.contentChevron.nth(i));
        //}
        //let names = [];
        //for(let i = 0; i < chevronCount; i++) {
            //names.push(await this.contentTable.nth(i).find("tr").nth(-1).child(2).innerText);
        //}

        //if we dont get a "chevron", that means that the brand is not in LPP mode, so we run this to get at least one name
        //if (chevronCount == 0) {
            //names.push(await this.contentTable.find("tr").nth(-1).child(2).innerText);
        //}

        //await t.expect(names.find(x => x === storeGroupsContentData.contentDefaultTitle)).ok();

        //return true;
    }

    async testMediaUpload(storeGroupName: string, image: string){

        const common = new CommonModel(this.page);

        await this.groupsTable.getByRole('row', { name: `${storeGroupName}` }).getByTitle('Manage your Media').click();

        await expect(this.uploadMediaButton).toBeVisible();
        await this.uploadMediaButton.click();

        let chooseImgInput = 'p-fileupload input[type="file"]';

        await this.page.setInputFiles(chooseImgInput, 'src/images/' + image);
    
        await common.waitUntilSpinnerDisappears();

        for(let i = 0; i < 40; i++){
            await this.page.waitForTimeout(300);
            let uploadedText = await this.addMediaUploadTable.locator('tr').locator('td').nth(1).textContent();
            let cleanedUploadedText= uploadedText?.trim();
            if(cleanedUploadedText == "File uploaded"){
                break;
            }
        }
        
        await this.closeButton.click();

        expect(await common.snackbar.textContent()).toContain(storeGroupMediaData.mediaCreatedSuccessfully);

        //Check if the store group is on the table
        expect(await this.mediaUploadTable.locator('tr').locator('td').nth(1).textContent()).toEqual(image);
    }

    async verifyDeletedAlertMessage(groupName: string){
        const common = new CommonModel(this.page);
        let snackBarVisible: boolean;
        for(let i = 0; i < 60; i++){
            snackBarVisible = await common.snackbar.isVisible();
            if(snackBarVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }
        
        let text = await common.snackbar.textContent();
        expect(text).toContain(groupName + ' was deleted successfully!');
    }

    async mapAllStores(storeGroupName: string){
        await this.groupsTable.getByRole('row', { name: `${storeGroupName}` }).getByTitle('Map Stores').click();
        await expect(this.storeGroupList).toBeVisible();

        let selectAllButtons = await this.storeGroupList.getByRole('cell', { name: 'Select all' }).count();
        for(let i = 0; i < selectAllButtons; i++){
            await this.storeGroupList.getByRole('cell', { name: 'Select all' }).nth(i).click();
        }

    }

    async validateOnlyOneGroupIsInTable(storeGroupName: string){
        await expect(this.groupsTable.getByRole('row', { name: `${storeGroupName}` })).toBeVisible();
        let storeGroupCount = await this.groupsTable.getByRole('row', { name: `${storeGroupName}` }).count();
        expect(storeGroupCount).toEqual(1);
    }

    async onClickMenuOption() {
        const sidebar = new SidebarModel(this.page); 

        let mainWrapperVisible: boolean;
        for(let i = 0; i < 80; i++){
            mainWrapperVisible = await sidebar.mainWrapper.isVisible();
            if(mainWrapperVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        
        await sidebar.mainWrapper.click({ delay: 300});
    }

    async verifyStoreGroupsOptionMenuNotVisible(){
        const sidebar = new SidebarModel(this.page);
        await this.onClickMenuOption();
        let menuOptionVisible: Boolean;

        for(let i = 0; i < 60; i++){
            menuOptionVisible = await sidebar.storeGroupsOption.isVisible();
            if(!menuOptionVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(menuOptionVisible!).toBeFalsy();
        
    }

    /**
     * This function verfies that the store group is not visible
     * @param name 
     */
    async verifyStoreGroupIsNotDisplayed(name: string){
        let nodeVisible: boolean;;

        for(let i = 0; i < 60; i++){
            nodeVisible = await this.groupsTable.locator('tr').filter({hasText: name}).isVisible();
            if(!nodeVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(nodeVisible!).toBeFalsy();
    }
}