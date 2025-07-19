import { test, expect } from '@playwright/test';
import { LoginModel } from '../../pom/loginModel';
import { TopBarModel } from '../../pom/topBarModel';
import { ContentModel } from '../../pom/contentModel';
import { SidebarModel } from '../../pom/sidebarModel';
import { validateEnvironment } from '../../utils/urlHandler';
import { validateUsers } from '../../utils/userHandler';
import { storeOwnerRoleValidation  } from '../../utils/rolesHandler';
import { brandsData } from '../../data/brandsData';
import { RolesEnum } from '../../enums/roles.enum';

const users = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.brandNodeContentName));
const url: string = validateEnvironment();

test.describe('Manage Login', () => {

  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto(url);
  });

  users.forEach(user => {

    test(`Log in with correct credentials '${user.role}'`, async ({ page }) => {
      const loginModel = new LoginModel(page);
      const topBarModel = new TopBarModel(page);
      const contentModel = new ContentModel(page);
      const sidebarModel = new SidebarModel(page);

      await loginModel.login(user.username, user.password);

      if (user.role === RolesEnum.storeOwner) {
        await expect(contentModel.bulkItemBtn).toBeEnabled({ timeout: 10000 });
        await expect(contentModel.bulkItemBtn).toBeVisible({ timeout: 10000 });
      } else {
        await expect(sidebarModel.mainWrapper).toBeVisible();
        const url = page.url();
        expect(url.includes('admin/dashboard')).toBeTruthy();
        await expect(topBarModel.selectBrandButton).toBeEnabled({ timeout: 10000 });
        await expect(topBarModel.selectBrandButton).toBeVisible({ timeout: 10000 });
      }
    });

  });

  test(`Access the login and leave the fields empty`, async ({ page }) => {
    const loginModel = new LoginModel(page);
    const topBarModel = new TopBarModel(page);

    await loginModel.usernameField.click();
    await loginModel.passwordField.click();
    await loginModel.submitButton.click();

    await expect(loginModel.usernameField).toHaveValue('');
    await expect(loginModel.passwordField).toHaveValue('');

    const url = page.url();
    expect(url.includes('admin/dashboard')).toBeFalsy();
    await expect(topBarModel.selectBrandButton).not.toBeVisible();
  });

  test(`Access the login form with the Wrong Credentials`, async ({ page }) => {
    const loginModel = new LoginModel(page);

    await loginModel.login('john.doe@example.com', 'john.doe');
    await expect(loginModel.errorMessage).toBeEnabled();
    await expect(loginModel.errorMessage).toHaveText('Incorrect username or password.');
  });

});
