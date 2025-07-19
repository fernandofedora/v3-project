import { Locator, Page } from '@playwright/test';
import { CommonModel } from './commonModel';

export class LoginModel {

    readonly page: Page;
    readonly commonModel: CommonModel;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly submitButton: Locator;
    readonly forgotPasswordLink: Locator;
    readonly singUpLink: Locator;
    readonly resetMyPasswordButton: Locator;
    readonly emailLabel: Locator;
    readonly errorMessage: Locator;

    constructor (page: Page) {
        this.page = page;
        this.commonModel = new CommonModel(page);
        this.usernameField = page.locator('div.modal-content:nth-child(2) #signInFormUsername');
        this.passwordField = page.locator('div.modal-content:nth-child(2) #signInFormPassword');
        this.submitButton = page.locator(' div.modal-content:nth-child(2) input:text("Sign in")');
        this.forgotPasswordLink = page.locator('div.modal-content:nth-child(2) a:text("Forgot your password?")');
        this.singUpLink = page.locator('div.modal-content:nth-child(2) a:text("Sign up")');
        this.resetMyPasswordButton = page.locator('button:text("Reset my password")');
        this.emailLabel = page.locator('div.modal-content:nth-child(1) label:text("Email")');
        this.errorMessage = page.locator('#loginErrorMessage').nth(0);
    }

    async login(username: string, password: string) {
        await this.commonModel.verifyThatLocatorIsVisible(this.usernameField);
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.submitButton.click();
        await this.commonModel.waitUntilSpinnerDisappears();
    }
}
