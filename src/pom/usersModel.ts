import {expect, Locator, Page} from '@playwright/test';
import { CommonModel } from '../pom/commonModel';
import {v4 as uuidv4} from 'uuid';

export class Usersmodel {

    readonly page: Page;
    readonly sendInvitationBtn: Locator;
    readonly invitationEmailInput: Locator;
    readonly isSuperAdminSwitch: Locator;
    readonly isAdminSwitch: Locator;
    readonly sendButton: Locator;
    readonly manageInvitationsBtn: Locator;
    readonly invitationsTable: Locator;
    readonly yesButton: Locator;
    readonly usersTable: Locator;
    readonly errorMessage: Locator;
    readonly cancelButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.sendInvitationBtn = page.locator('div.dh-detail-page__wrapper dh-button>div.dh-button').filter({ hasText: 'Send invitation' });
        this.manageInvitationsBtn = page.locator('div.dh-detail-page__wrapper dh-button>div.dh-button').filter({ hasText: 'Manage Invitations' });
        this.invitationEmailInput = page.locator('mat-form-field input[formcontrolname="email"]');
        this.isSuperAdminSwitch = page.locator('form mat-slide-toggle[formcontrolname="superAdmin"]');
        this.isAdminSwitch = page.locator('form mat-slide-toggle[formcontrolname="admin"]');
        this.sendButton = page.locator('button > span:text-is("Send")');
        this.invitationsTable = page.locator('app-invitations table tbody');
        this.yesButton = page.locator('button > span:text-is("Yes")');
        this.usersTable = page.locator('app-users table tbody');
        this.errorMessage = page.locator('app-error-messages');
        this.cancelButton = page.locator('button > span:text-is("Cancel")');
    }

    /**
     * Creates an email and returns the new email
     * @returns 
     */
    async createEmail(){
        let id = uuidv4().slice(0, 30);
        let email = "user" + id +"@gmail.com"
        return email
    }

    /**
     * Creates an invitation to an email with all the permisions
     * @param email 
     */
    async sendInvitationWithAllPermissions(email: string){
        await expect(this.sendInvitationBtn).toBeVisible();
        await this.sendInvitationBtn.click();
        await this.invitationEmailInput.fill(email);
        await this.isSuperAdminSwitch.click();
        await this.isAdminSwitch.click();
        await this.sendButton.click();
    }


    /**
     * Delete an users invitation 
     * @param userEmail 
     */
    async deleteInvitation(userEmail: string){

        const common = new CommonModel(this.page);

        let isVisible: boolean;

        await this.verifyThatTheUsersTableIsVisible();
        await this.invitationsTable.getByRole('row', { name: `${userEmail}` }).getByTitle('Delete user invitation').click();
        await this.yesButton.click();
        await common.waitUntilSpinnerDisappears();

        for (let i = 0; i < 60; i++){
            isVisible = await this.invitationsTable.getByRole('row', { name: `${userEmail}` }).isVisible();
            if(!isVisible){
                break; 
            }

            await this.page.waitForTimeout(300);
        }

        expect(isVisible!).toBeFalsy();
    }


    /**
     * Verify that the delete alert message is displayed
     * @param userEmail 
     */
    async verifyDeletedInvitationMessageIsDisplayed(userEmail: string){
        const common = new CommonModel(this.page);

        let isSnackBarVisible: boolean;
        let text: string | undefined;

        for(let i = 0; i < 60; i++){
            isSnackBarVisible = await common.snackbar.last().isVisible();
            if(isSnackBarVisible){
                break;
            }

            await this.page.waitForTimeout(300);
        }
        
        expect(isSnackBarVisible!).toBeTruthy();
        for(let i = 0; i < 60; i++){
            text = (await common.snackbar.last().textContent())?.trim();
            if(text?.includes(userEmail)){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(text!).toEqual(`invitation for ${userEmail} was deleted successfully!`);
    }


    /**
     * Delete a specific user identify by the email
     * @param userEmail 
     */
    async deleteUserAccount(userEmail: string) {
        const common = new CommonModel(this.page);
        await expect(this.usersTable).toBeVisible();
        await this.usersTable.getByRole('row', { name: `${userEmail}` }).getByTitle('Delete user account').click();
        await this.yesButton.click();
        await common.waitUntilSpinnerDisappears();
        await expect(this.usersTable.getByRole('row', { name: `${userEmail}` })).not.toBeVisible();
    }


    /**
     * Creates an invitation to an email as super admin
     * @param email 
     */
    async sendInvitationAsSuperAdmin(email: string){

        await expect(async () => {
            await expect(this.sendInvitationBtn).toBeVisible( {timeout:300} );
            await this.sendInvitationBtn.click( {delay: 300});
        }).toPass();

        
        await this.invitationEmailInput.fill(email);
        await this.isSuperAdminSwitch.click();
        await this.sendButton.click(  {delay:300} );
    }

    /**
     * Verify that the delete alert message is displayed
     * @param userEmail 
     */
    async verifyInvitationSentMessageIsDisplayed(){

        const common = new CommonModel(this.page);

        await expect(async () => {
            await expect(common.snackbar).toBeVisible({timeout:300});
        }).toPass();

        let text = (await common.snackbar.textContent())?.trim();
        expect(text).toEqual(`Invitation sent!`);
    }

    /**
     * Verify the error message is displayed
     */
    async verifyErrorMessageIsDisplayed(){

        await expect(async () => {
            await expect(this.errorMessage.first()).toBeVisible({timeout:300});
        }).toPass();

        let errorMessage = await this.errorMessage.textContent();
        expect(errorMessage).toContain('Something went wrong.');
    }

    /**
     * This function verifies that the users table is visible
     */
    async verifyThatTheUsersTableIsVisible(){

        await expect(async () => {
            await expect(this.usersTable.first()).toBeVisible({timeout:300});
        }).toPass();
    }

    /**
     * This functions verify that the required rows are displayed
     * @param rows 
     */
    async verifyThatTableHasRows(rows: number){
        let rowCount: number;

        await expect(async () => {
            await expect(this.usersTable.first()).toBeVisible({timeout:300});
        }).toPass();

        for(let i = 0; i < 60; i++){
            rowCount = await this.usersTable.locator('tr').count();
            if(rowCount == rows){
                break;
            }
            await this.page.waitForTimeout(300);
        }
        expect(rows).toEqual(rowCount!);
    }

    /**
     * This function 
     * @param value 
     * @param index 
     */
    async checkUserSearchValue(value: string, index: number){
        let rowCount: number;
        let userExists =false;

        await expect(async () => {
            await expect(this.usersTable.first()).toBeVisible({timeout:300});
        }).toPass();

        await this.page.waitForTimeout(3000);

        rowCount = await this.usersTable.locator('tr').count();

        for(let i = 0; i < rowCount; i++) {
            let userText = await this.usersTable.locator('tr').nth(i).locator('td').nth(index).innerText();
            if(userText == value){
                userExists = true;
                break;
            }
        }
        expect(userExists).toBeTruthy();
    }

    async verifyThatTableIsNotDisplayed(){
        let usersTableVisible: boolean;
        let rowCount: number;

        for(let i = 0; i < 60; i++){
            usersTableVisible = await this.usersTable.isVisible();
            if(!usersTableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(usersTableVisible!).toBeFalsy();
    }
}