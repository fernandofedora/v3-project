
import { test, expect } from '@playwright/test';
import { LoginModel } from '../../pom/loginModel';
import { TopBarModel } from '../../pom/topBarModel';
import { MediaModel } from '../../pom/mediaModel';
import { CommonModel } from '../../pom/commonModel';
import { SidebarModel } from '../../pom/sidebarModel';
import { brandsData } from '../../data/brandsData';
import { mediaData } from '../../data/mediaData';
import { RolesEnum as Roles } from '../../enums/roles.enum';
import { NodesTypesEnum } from '../../enums/nodeTypes.enum';
import { validateEnvironment } from '../../utils/urlHandler';
import { validateUsers } from '../../utils/userHandler';
import { storeOwnerRoleValidation } from '../../utils/rolesHandler';
import path from 'path';
import {v4 as uuidv4} from 'uuid';

const users = validateUsers().filter(user => storeOwnerRoleValidation(user, brandsData.onlyContent));
const url: string = validateEnvironment();

test.describe('Manage Media', () => {

    test.beforeEach(async ({ page }, testInfo) => {
        test.setTimeout(120000);
        await page.goto(url);
        await page.setViewportSize({width: 1200, height: 1200});
    });

    users.forEach(user => {

        test(`Verify that the system allow to upload JPG/JPEG media for a brand from upload button '${user.role}'`, async ({ page }) => {
            const loginModel = new LoginModel(page);
            const topBarModel = new TopBarModel(page);
            const mediaModel = new MediaModel(page);
            const sidebarModel = new SidebarModel(page);
            const commonModel = new CommonModel(page);

            if (user.role == Roles.storeOwner) { return } 
            await loginModel.login(user.username, user.password);

            await topBarModel.selectBrand(brandsData.onlyContent);
            await sidebarModel.onClickMediaOptionMenu();

            const uniqueId = uuidv4();
  
            const pageName = ("Media" + uniqueId).slice(0, 30);
            await mediaModel.uploadImage(path.join(__dirname, '../../images/A97.jpg'));
            await mediaModel.waitUntilCloseBtnEnable();
            await mediaModel.checkMediaUploadedInTable('A97.jpg', 'jpeg');
            await mediaModel.onClickMediaCloseButton();
            await expect(async () => {
                await expect(mediaModel.addMediaPopupBtn).not.toBeVisible({timeout:300});
            }).toPass();
            
            await commonModel.waitForSnackbarDissapear();
            await mediaModel.hasMediaTableValues();

            await commonModel.setSearchValue('A97.jpg');
            const exists = await mediaModel.checkMediaInTable('A97.jpg', 'jpeg');
            expect(exists).toBeTruthy();

            await mediaModel.onClickDeleteMediaItem('A97.jpg');
            await commonModel.waitUntilSpinnerDisappears();
            await commonModel.waitForSnackbarDissapear();
        });

        test(`Verify that the system allow to upload PNG media for a brand from upload button '${user.role}'`, async ({ page }) => {
            const loginModel = new LoginModel(page);
            const topBarModel = new TopBarModel(page);
            const mediaModel = new MediaModel(page);
            const sidebarModel = new SidebarModel(page);
            const commonModel = new CommonModel(page);

            if (user.role == Roles.storeOwner) { return } 
            await loginModel.login(user.username, user.password);

            await topBarModel.selectBrand(brandsData.onlyContent);
            await sidebarModel.onClickMediaOptionMenu();

            await mediaModel.uploadImage(path.join(__dirname, '../../images/A98.png'));
            await mediaModel.waitUntilCloseBtnEnable();
            await mediaModel.checkMediaUploadedInTable('A98.png', 'png');
            await mediaModel.onClickMediaCloseButton();
            await expect(async () => {
                await expect(mediaModel.addMediaPopupBtn).not.toBeVisible({timeout:300});
            }).toPass();
            await commonModel.waitForSnackbarDissapear();
            await mediaModel.hasMediaTableValues();

            const exists = await mediaModel.checkMediaInTable('A98.png', 'png');
            expect(exists).toBeTruthy();

            await commonModel.setSearchValue('A98.png');
            await mediaModel.onClickDeleteMediaItem('A98.png');
            await commonModel.waitUntilSpinnerDisappears();
            await commonModel.waitForSnackbarDissapear();
        });

        test(`Verify that the system allow to upload WEBP media for a brand from upload button '${user.role}'`, async ({ page }) => {
            const loginModel = new LoginModel(page);
            const topBarModel = new TopBarModel(page);
            const mediaModel = new MediaModel(page);
            const sidebarModel = new SidebarModel(page);
            const commonModel = new CommonModel(page);

            if (user.role == Roles.storeOwner) { return } 
            await loginModel.login(user.username, user.password);

            await topBarModel.selectBrand(brandsData.onlyContent);
            await sidebarModel.onClickMediaOptionMenu();

            await mediaModel.uploadImage(path.join(__dirname, '../../images/A24.webp'));
            await mediaModel.waitUntilCloseBtnEnable();
            await mediaModel.checkMediaUploadedInTable('A24.webp', 'webp');
            await mediaModel.onClickMediaCloseButton();
            await expect(async () => {
                await expect(mediaModel.addMediaPopupBtn).not.toBeVisible({timeout:300});
            }).toPass();
            await commonModel.waitForSnackbarDissapear();
            await mediaModel.hasMediaTableValues();

            const exists = await mediaModel.checkMediaInTable('A24.webp', 'webp');
            expect(exists).toBeTruthy();

            await commonModel.setSearchValue('A24.webp');
            await mediaModel.onClickDeleteMediaItem('A24.webp');
            await commonModel.waitUntilSpinnerDisappears();
            await commonModel.waitForSnackbarDissapear();
        });

        test(`Verify that the system allow to upload GIF media for a brand from upload button '${user.role}'`, async ({ page }) => {
            const loginModel = new LoginModel(page);
            const topBarModel = new TopBarModel(page);
            const mediaModel = new MediaModel(page);
            const sidebarModel = new SidebarModel(page);
            const commonModel = new CommonModel(page);

            if (user.role == Roles.storeOwner) { return } 
            await loginModel.login(user.username, user.password);

            await topBarModel.selectBrand(brandsData.onlyContent);
            await sidebarModel.onClickMediaOptionMenu();

            await mediaModel.uploadImage(path.join(__dirname, '../../images/rainbow.gif'));
            await mediaModel.waitUntilCloseBtnEnable();
            await mediaModel.checkMediaUploadedInTable('rainbow.gif', 'gif');
            await mediaModel.onClickMediaCloseButton();
            await expect(async () => {
                await expect(mediaModel.addMediaPopupBtn).not.toBeVisible({timeout:300});
            }).toPass();
            await commonModel.waitForSnackbarDissapear();
            await mediaModel.hasMediaTableValues();

            const exists = await mediaModel.checkMediaInTable('rainbow.gif', 'video/mp4');
            expect(exists).toBeTruthy();

            await commonModel.setSearchValue('rainbow.gif');
            await mediaModel.onClickDeleteMediaItem('rainbow.gif');
            await commonModel.waitUntilSpinnerDisappears();
            await commonModel.waitForSnackbarDissapear();
        });

        test(`Verify that the system allow to upload JPG media for a subbrand from upload button '${user.role}'`, async ({ page }) => {
            const loginModel = new LoginModel(page);
            const topBarModel = new TopBarModel(page);
            const mediaModel = new MediaModel(page);
            const sidebarModel = new SidebarModel(page);
            const commonModel = new CommonModel(page);

            if (user.role == Roles.storeOwner) { return } 
            await loginModel.login(user.username, user.password);

            await topBarModel.selectBrand(brandsData.onlyContent);
            await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, NodesTypesEnum.subbrand);
            await commonModel.waitUntilSpinnerDisappears();
            await sidebarModel.onClickMediaOptionMenu();

            await mediaModel.uploadImage(path.join(__dirname, '../../images/A13.jpg'));
            await mediaModel.waitUntilCloseBtnEnable();
            await mediaModel.checkMediaUploadedInTable('A13.jpg', 'jpeg');
            await mediaModel.onClickMediaCloseButton();
            await expect(async () => {
                await expect(mediaModel.addMediaPopupBtn).not.toBeVisible({timeout:300});
            }).toPass();
            await commonModel.waitForSnackbarDissapear();
            await mediaModel.hasMediaTableValues();

            const exists = await mediaModel.checkMediaInTable('A13.jpg', 'jpeg');
            expect(exists).toBeTruthy();

            await commonModel.setSearchValue('A13.jpg');
            await mediaModel.onClickDeleteMediaItem('A13.jpg');
            await commonModel.waitUntilSpinnerDisappears();
            await commonModel.waitForSnackbarDissapear();
        });

        test(`Verify that the system allow to upload PNG media for a subbrand from upload button '${user.role}'`, async ({ page }) => {
            const loginModel = new LoginModel(page);
            const topBarModel = new TopBarModel(page);
            const mediaModel = new MediaModel(page);
            const sidebarModel = new SidebarModel(page);
            const commonModel = new CommonModel(page);

            if (user.role == Roles.storeOwner) { return } 
            await loginModel.login(user.username, user.password);

            await topBarModel.selectBrand(brandsData.onlyContent);
            await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, NodesTypesEnum.subbrand);
            await commonModel.waitUntilSpinnerDisappears();
            await sidebarModel.onClickMediaOptionMenu();

            await mediaModel.uploadImage(path.join(__dirname, '../../images/A93.png'));
            await mediaModel.waitUntilCloseBtnEnable();
            await mediaModel.checkMediaUploadedInTable('A93.png', 'png');
            await mediaModel.onClickMediaCloseButton();
            await expect(async () => {
                await expect(mediaModel.addMediaPopupBtn).not.toBeVisible({timeout:300});
            }).toPass();
            await commonModel.waitForSnackbarDissapear();
            await mediaModel.hasMediaTableValues();

            const exists = await mediaModel.checkMediaInTable('A93.png', 'png');
            expect(exists).toBeTruthy();

            await commonModel.setSearchValue('A93.png');
            await mediaModel.onClickDeleteMediaItem('A93.png');
            await commonModel.waitUntilSpinnerDisappears();
            await commonModel.waitForSnackbarDissapear();
        });

        test(`Verify that the system allow to upload WEBP media for a subbrand from upload button '${user.role}'`, async ({ page }) => {
            const loginModel = new LoginModel(page);
            const topBarModel = new TopBarModel(page);
            const mediaModel = new MediaModel(page);
            const sidebarModel = new SidebarModel(page);
            const commonModel = new CommonModel(page);

            if (user.role == Roles.storeOwner) { return } 
            await loginModel.login(user.username, user.password);

            await topBarModel.selectBrand(brandsData.onlyContent);
            await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, NodesTypesEnum.subbrand);
            await commonModel.waitUntilSpinnerDisappears();
            await sidebarModel.onClickMediaOptionMenu();

            await mediaModel.uploadImage(path.join(__dirname, '../../images/A110.webp'));
            await mediaModel.waitUntilCloseBtnEnable();
            await mediaModel.checkMediaUploadedInTable('A110.webp', 'webp');
            await mediaModel.onClickMediaCloseButton();
            await expect(async () => {
                await expect(mediaModel.addMediaPopupBtn).not.toBeVisible({timeout:300});
            }).toPass();
            await commonModel.waitForSnackbarDissapear();
            await mediaModel.hasMediaTableValues();

            const exists = await mediaModel.checkMediaInTable('A110.webp', 'webp');
            expect(exists).toBeTruthy();

            await commonModel.setSearchValue('A110.webp');
            await mediaModel.onClickDeleteMediaItem('A110.webp');
            await commonModel.waitUntilSpinnerDisappears();
            await commonModel.waitForSnackbarDissapear();
        });

        test(`Verify that the system allow to upload GIF media for a subbrand from upload button '${user.role}'`, async ({ page }) => {
            const loginModel = new LoginModel(page);
            const topBarModel = new TopBarModel(page);
            const mediaModel = new MediaModel(page);
            const sidebarModel = new SidebarModel(page);
            const commonModel = new CommonModel(page);

            if (user.role == Roles.storeOwner) { return } 
            await loginModel.login(user.username, user.password);

            await topBarModel.selectBrand(brandsData.onlyContent);
            await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, NodesTypesEnum.subbrand);
            await commonModel.waitUntilSpinnerDisappears();
            await sidebarModel.onClickMediaOptionMenu();

            await mediaModel.uploadImage(path.join(__dirname, '../../images/hi.gif'));
            await mediaModel.waitUntilCloseBtnEnable();
            await mediaModel.checkMediaUploadedInTable('hi.gif', 'gif');
            await mediaModel.onClickMediaCloseButton();
            await expect(async () => {
                await expect(mediaModel.addMediaPopupBtn).not.toBeVisible({timeout:300});
            }).toPass();
            await commonModel.waitForSnackbarDissapear();
            await mediaModel.hasMediaTableValues();

            const exists = await mediaModel.checkMediaInTable('hi.gif', 'video/mp4');
            expect(exists).toBeTruthy();

            await commonModel.setSearchValue('hi.gif');
            await mediaModel.onClickDeleteMediaItem('hi.gif');
            await commonModel.waitUntilSpinnerDisappears();
            await commonModel.waitForSnackbarDissapear();
        });

        test(`Verify that the system allow to upload JPG media for a store from upload button Brands stores '${user.role}'`, async ({ page }) => {
            const loginModel = new LoginModel(page);
            const topBarModel = new TopBarModel(page);
            const mediaModel = new MediaModel(page);
            const sidebarModel = new SidebarModel(page);
            const commonModel = new CommonModel(page);

            await loginModel.login(user.username, user.password);
            if (user.role != Roles.storeOwner) {
                await topBarModel.selectBrand(brandsData.onlyContent);
                await commonModel.waitUntilSpinnerDisappears();
                await topBarModel.selectNodeStoreGroupChild(brandsData.storeContent);
                await commonModel.waitUntilSpinnerDisappears();
            }
            
            await sidebarModel.onClickMediaOptionMenu();

            await mediaModel.uploadImage(path.join(__dirname, '../../images/A47.jpg'));
            await mediaModel.waitUntilCloseBtnEnable();
            await mediaModel.checkMediaUploadedInTable('A47.jpg', 'jpeg');
            await mediaModel.onClickMediaCloseButton();
            await expect(async () => {
                await expect(mediaModel.addMediaPopupBtn).not.toBeVisible({timeout:300});
            }).toPass();
            await commonModel.waitForSnackbarDissapear();
            await mediaModel.hasMediaTableValues();

            const exists = await mediaModel.checkMediaInTable('A47.jpg', 'jpeg');
            expect(exists).toBeTruthy();

            await commonModel.setSearchValue('A47.jpg');
            await mediaModel.onClickDeleteMediaItem('A47.jpg');
            await commonModel.waitUntilSpinnerDisappears();
            await commonModel.waitForSnackbarDissapear();
        });

        test(`Verify that the system allow to upload PNG media for a store from upload button Brands stores '${user.role}'`, async ({ page }) => {
            const loginModel = new LoginModel(page);
            const topBarModel = new TopBarModel(page);
            const mediaModel = new MediaModel(page);
            const sidebarModel = new SidebarModel(page);
            const commonModel = new CommonModel(page);

            await loginModel.login(user.username, user.password);
            if (user.role != Roles.storeOwner) {
                await topBarModel.selectBrand(brandsData.onlyContent);
                await commonModel.waitUntilSpinnerDisappears();
                await topBarModel.selectNodeStoreGroupChild(brandsData.storeContent);
                await commonModel.waitUntilSpinnerDisappears();
            }

            await sidebarModel.onClickMediaOptionMenu();

            await mediaModel.uploadImage(path.join(__dirname, '../../images/avocados.png'));
            await mediaModel.waitUntilCloseBtnEnable();
            await mediaModel.checkMediaUploadedInTable('avocados.png', 'png');
            await mediaModel.onClickMediaCloseButton();
            await expect(async () => {
                await expect(mediaModel.addMediaPopupBtn).not.toBeVisible({timeout:300});
            }).toPass();
            await commonModel.waitForSnackbarDissapear();
            await mediaModel.hasMediaTableValues();

            const exists = await mediaModel.checkMediaInTable('avocados.png', 'png');
            expect(exists).toBeTruthy();

            await commonModel.setSearchValue('avocados.png');
            await mediaModel.onClickDeleteMediaItem('avocados.png');
            await commonModel.waitUntilSpinnerDisappears();
            await commonModel.waitForSnackbarDissapear();
        });

        test(`Verify that the system allow to upload WEBP media for a store from upload button Brands stores '${user.role}'`, async ({ page }) => {
            const loginModel = new LoginModel(page);
            const topBarModel = new TopBarModel(page);
            const mediaModel = new MediaModel(page);
            const sidebarModel = new SidebarModel(page);
            const commonModel = new CommonModel(page);

            await loginModel.login(user.username, user.password);
            if (user.role != Roles.storeOwner) {
                await topBarModel.selectBrand(brandsData.onlyContent);
                await commonModel.waitUntilSpinnerDisappears();
                await topBarModel.selectNodeStoreGroupChild(brandsData.storeContent);
                await commonModel.waitUntilSpinnerDisappears();
            }
            
            await sidebarModel.onClickMediaOptionMenu();

            await mediaModel.uploadImage(path.join(__dirname, '../../images/food.webp'));
            await mediaModel.waitUntilCloseBtnEnable();
            await mediaModel.checkMediaUploadedInTable('food.webp', 'webp');
            await mediaModel.onClickMediaCloseButton();
            await expect(async () => {
                await expect(mediaModel.addMediaPopupBtn).not.toBeVisible({timeout:300});
            }).toPass();
            await commonModel.waitForSnackbarDissapear();
            await mediaModel.hasMediaTableValues();

            const exists = await mediaModel.checkMediaInTable('food.webp', 'webp');
            expect(exists).toBeTruthy();

            await commonModel.setSearchValue('food.webp');
            await mediaModel.onClickDeleteMediaItem('food.webp');
            await commonModel.waitUntilSpinnerDisappears();
            await commonModel.waitForSnackbarDissapear();
        });

        test(`Verify that the system allow to upload GIF media for a store from upload button Brands stores '${user.role}'`, async ({ page }) => {
            const loginModel = new LoginModel(page);
            const topBarModel = new TopBarModel(page);
            const mediaModel = new MediaModel(page);
            const sidebarModel = new SidebarModel(page);
            const commonModel = new CommonModel(page);

            await loginModel.login(user.username, user.password);
            if (user.role != Roles.storeOwner) {
                await topBarModel.selectBrand(brandsData.onlyContent);
                await commonModel.waitUntilSpinnerDisappears();
                await topBarModel.selectNodeStoreGroupChild(brandsData.storeContent);
                await commonModel.waitUntilSpinnerDisappears();
            }

            await sidebarModel.onClickMediaOptionMenu();

            await mediaModel.uploadImage(path.join(__dirname, '../../images/rainbow2.gif'));
            await mediaModel.waitUntilCloseBtnEnable();
            await mediaModel.checkMediaUploadedInTable('rainbow2.gif', 'gif');
            await mediaModel.onClickMediaCloseButton();
            await expect(async () => {
                await expect(mediaModel.addMediaPopupBtn).not.toBeVisible({timeout:300});
            }).toPass();
            await commonModel.waitForSnackbarDissapear();
            await mediaModel.hasMediaTableValues();

            const exists = await mediaModel.checkMediaInTable('rainbow2.gif', 'video/mp4');
            expect(exists).toBeTruthy();

            await commonModel.setSearchValue('rainbow2.gif');
            await mediaModel.onClickDeleteMediaItem('rainbow2.gif');
            await commonModel.waitUntilSpinnerDisappears();
            await commonModel.waitForSnackbarDissapear();
        });

        test(`Verify that the system allow to upload JPG media with tags for a brand from upload button '${user.role}'`, async ({ page }) => {
            const loginModel = new LoginModel(page);
            const topBarModel = new TopBarModel(page);
            const mediaModel = new MediaModel(page);
            const sidebarModel = new SidebarModel(page);
            const commonModel = new CommonModel(page);

            if (user.role == Roles.storeOwner) { return } 
            await loginModel.login(user.username, user.password);

            await topBarModel.selectBrand(brandsData.onlyContent);
            await sidebarModel.onClickMediaOptionMenu();

            await mediaModel.uploadImage(path.join(__dirname, '../../images/A97.jpg'));
            await mediaModel.waitUntilCloseBtnEnable();
            await mediaModel.checkMediaUploadedInTable('A97.jpg', 'jpeg');
            await mediaModel.setTags(mediaData.brandTag);
            await commonModel.waitUntilSpinnerDisappears();
            await mediaModel.onClickMediaCloseButton();
            await expect(async () => {
                await expect(mediaModel.addMediaPopupBtn).not.toBeVisible({timeout:300});
            }).toPass();
            await commonModel.waitForSnackbarDissapear();
            await mediaModel.hasMediaTableValues();

            const exists = await mediaModel.checkMediaInTableWithTags('A97.jpg', 'jpeg', mediaData.brandTag);
            expect(exists).toBeTruthy();

            await commonModel.setSearchValue('A97.jpg');
            await mediaModel.onClickDeleteMediaItem('A97.jpg');
            await commonModel.waitUntilSpinnerDisappears();
            await commonModel.waitForSnackbarDissapear();
        });

        test(`Verify that the system allow to upload PNG media with tags for a brand from upload button '${user.role}'`, async ({ page }) => {
            const loginModel = new LoginModel(page);
            const topBarModel = new TopBarModel(page);
            const mediaModel = new MediaModel(page);
            const sidebarModel = new SidebarModel(page);
            const commonModel = new CommonModel(page);

            if (user.role == Roles.storeOwner) { return } 
            await loginModel.login(user.username, user.password);

            await topBarModel.selectBrand(brandsData.onlyContent);
            await sidebarModel.onClickMediaOptionMenu();

            await mediaModel.uploadImage(path.join(__dirname, '../../images/A98.png'));
            await mediaModel.waitUntilCloseBtnEnable();
            await mediaModel.checkMediaUploadedInTable('A98.png', 'png');
            await mediaModel.setTags(mediaData.brandTag);
            await commonModel.waitUntilSpinnerDisappears();
            await mediaModel.onClickMediaCloseButton();
            await expect(async () => {
                await expect(mediaModel.addMediaPopupBtn).not.toBeVisible({timeout:300});
            }).toPass();
            await commonModel.waitForSnackbarDissapear();
            await mediaModel.hasMediaTableValues();

            const exists = await mediaModel.checkMediaInTableWithTags('A98.png', 'png', mediaData.brandTag);
            expect(exists).toBeTruthy();

            await commonModel.setSearchValue('A98.png');
            await mediaModel.onClickDeleteMediaItem('A98.png');
            await commonModel.waitUntilSpinnerDisappears();
            await commonModel.waitForSnackbarDissapear();
        });

        test(`Verify that the system allow to upload WEBP media with tags for a brand from upload button '${user.role}'`, async ({ page }) => {
            const loginModel = new LoginModel(page);
            const topBarModel = new TopBarModel(page);
            const mediaModel = new MediaModel(page);
            const sidebarModel = new SidebarModel(page);
            const commonModel = new CommonModel(page);

            if (user.role == Roles.storeOwner) { return } 
            await loginModel.login(user.username, user.password);

            await topBarModel.selectBrand(brandsData.onlyContent);
            await sidebarModel.onClickMediaOptionMenu();

            await mediaModel.uploadImage(path.join(__dirname, '../../images/A24.webp'));
            await mediaModel.waitUntilCloseBtnEnable();
            await mediaModel.checkMediaUploadedInTable('A24.webp', 'webp');
            await mediaModel.setTags(mediaData.brandTag);
            await commonModel.waitUntilSpinnerDisappears();
            await mediaModel.onClickMediaCloseButton();
            await expect(async () => {
                await expect(mediaModel.addMediaPopupBtn).not.toBeVisible({timeout:300});
            }).toPass();
            await commonModel.waitForSnackbarDissapear();
            await mediaModel.hasMediaTableValues();

            const exists = await mediaModel.checkMediaInTableWithTags('A24.webp', 'webp', mediaData.brandTag);
            expect(exists).toBeTruthy();

            await commonModel.setSearchValue('A24.webp');
            await mediaModel.onClickDeleteMediaItem('A24.webp');
            await commonModel.waitUntilSpinnerDisappears();
            await commonModel.waitForSnackbarDissapear();
        });

        test(`Verify that the system allow to upload GIF media with tags for a brand from upload button '${user.role}'`, async ({ page }) => {
            const loginModel = new LoginModel(page);
            const topBarModel = new TopBarModel(page);
            const mediaModel = new MediaModel(page);
            const sidebarModel = new SidebarModel(page);
            const commonModel = new CommonModel(page);

            if (user.role == Roles.storeOwner) { return } 
            await loginModel.login(user.username, user.password);

            await topBarModel.selectBrand(brandsData.onlyContent);
            await sidebarModel.onClickMediaOptionMenu();

            await mediaModel.uploadImage(path.join(__dirname, '../../images/rainbow.gif'));
            await mediaModel.waitUntilCloseBtnEnable();
            await mediaModel.checkMediaUploadedInTable('rainbow.gif', 'image/gif');
            await mediaModel.setTags(mediaData.brandTag);
            await commonModel.waitUntilSpinnerDisappears();
            await mediaModel.onClickMediaCloseButton();
            await expect(async () => {
                await expect(mediaModel.addMediaPopupBtn).not.toBeVisible({timeout:300});
            }).toPass();
            await commonModel.waitForSnackbarDissapear();
            await mediaModel.hasMediaTableValues();

            const exists = await mediaModel.checkMediaInTableWithTags('rainbow.gif', 'video/mp4', mediaData.brandTag);
            expect(exists).toBeTruthy();

            await commonModel.setSearchValue('rainbow.gif');
            await mediaModel.onClickDeleteMediaItem('rainbow.gif');
            await commonModel.waitUntilSpinnerDisappears();
            await commonModel.waitForSnackbarDissapear();
        });

        test(`Verify that the system allow to upload JPG media with tags for a subbrand from upload button '${user.role}'`, async ({ page }) => {
            const loginModel = new LoginModel(page);
            const topBarModel = new TopBarModel(page);
            const mediaModel = new MediaModel(page);
            const sidebarModel = new SidebarModel(page);
            const commonModel = new CommonModel(page);

            if (user.role == Roles.storeOwner) { return } 
            await loginModel.login(user.username, user.password);

            await topBarModel.selectBrand(brandsData.onlyContent);
            if (user.role != Roles.storeOwner) {await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, NodesTypesEnum.subbrand);}
            await commonModel.waitUntilSpinnerDisappears();
            await sidebarModel.onClickMediaOptionMenu();

            await mediaModel.uploadImage(path.join(__dirname, '../../images/A13.jpg'));
            await mediaModel.waitUntilCloseBtnEnable();
            await mediaModel.checkMediaUploadedInTable('A13.jpg', 'jpeg');
            await mediaModel.setTags(mediaData.subBrandTag);
            await commonModel.waitUntilSpinnerDisappears();
            await mediaModel.onClickMediaCloseButton();
            await expect(async () => {
                await expect(mediaModel.addMediaPopupBtn).not.toBeVisible({timeout:300});
            }).toPass();
            await commonModel.waitForSnackbarDissapear();
            await mediaModel.hasMediaTableValues();

            const exists = await mediaModel.checkMediaInTableWithTags('A13.jpg', 'jpeg', mediaData.subBrandTag);
            expect(exists).toBeTruthy();

            await commonModel.setSearchValue('A13.jpg');
            await mediaModel.onClickDeleteMediaItem('A13.jpg');
            await commonModel.waitUntilSpinnerDisappears();
            await commonModel.waitForSnackbarDissapear();
        });

        test(`Verify that the system allow to upload PNG media with tags for a subbrand from upload button '${user.role}'`, async ({ page }) => {
            const loginModel = new LoginModel(page);
            const topBarModel = new TopBarModel(page);
            const mediaModel = new MediaModel(page);
            const sidebarModel = new SidebarModel(page);
            const commonModel = new CommonModel(page);

            if (user.role == Roles.storeOwner) { return } 
            await loginModel.login(user.username, user.password);

            await topBarModel.selectBrand(brandsData.onlyContent);
            if (user.role != Roles.storeOwner) {await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, NodesTypesEnum.subbrand);}
            await commonModel.waitUntilSpinnerDisappears();
            await sidebarModel.onClickMediaOptionMenu();

            await mediaModel.uploadImage(path.join(__dirname, '../../images/A93.png'));
            await mediaModel.waitUntilCloseBtnEnable();
            await mediaModel.checkMediaUploadedInTable('A93.png', 'png');
            await mediaModel.setTags(mediaData.subBrandTag);
            await commonModel.waitUntilSpinnerDisappears();
            await mediaModel.onClickMediaCloseButton();
            await expect(async () => {
                await expect(mediaModel.addMediaPopupBtn).not.toBeVisible({timeout:300});
            }).toPass();
            await commonModel.waitForSnackbarDissapear();
            await mediaModel.hasMediaTableValues();

            const exists = await mediaModel.checkMediaInTableWithTags('A93.png', 'png', mediaData.subBrandTag);
            expect(exists).toBeTruthy();

            await commonModel.setSearchValue('A93.png');
            await mediaModel.onClickDeleteMediaItem('A93.png');
            await commonModel.waitUntilSpinnerDisappears();
            await commonModel.waitForSnackbarDissapear();
        });

        test(`Verify that the system allow to upload WEBP media with tags for a subbrand from upload button '${user.role}'`, async ({ page }) => {
            const loginModel = new LoginModel(page);
            const topBarModel = new TopBarModel(page);
            const mediaModel = new MediaModel(page);
            const sidebarModel = new SidebarModel(page);
            const commonModel = new CommonModel(page);

            if (user.role == Roles.storeOwner) { return } 
            await loginModel.login(user.username, user.password);

            await topBarModel.selectBrand(brandsData.onlyContent);
            if (user.role != Roles.storeOwner) {await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, NodesTypesEnum.subbrand);}
            await commonModel.waitUntilSpinnerDisappears();
            await sidebarModel.onClickMediaOptionMenu();

            await mediaModel.uploadImage(path.join(__dirname, '../../images/A110.webp'));
            await mediaModel.waitUntilCloseBtnEnable();
            await mediaModel.checkMediaUploadedInTable('A110.webp', 'webp');
            await mediaModel.setTags(mediaData.subBrandTag);
            await commonModel.waitUntilSpinnerDisappears();
            await mediaModel.onClickMediaCloseButton();
            await expect(async () => {
                await expect(mediaModel.addMediaPopupBtn).not.toBeVisible({timeout:300});
            }).toPass();
            await commonModel.waitForSnackbarDissapear();
            await mediaModel.hasMediaTableValues();

            const exists = await mediaModel.checkMediaInTableWithTags('A110.webp', 'webp', mediaData.subBrandTag);
            expect(exists).toBeTruthy();

            await commonModel.setSearchValue('A110.webp');
            await mediaModel.onClickDeleteMediaItem('A110.webp');
            await commonModel.waitUntilSpinnerDisappears();
            await commonModel.waitForSnackbarDissapear();
        });

        test(`Verify that the system allow to upload GIF media with tags for a subbrand from upload button '${user.role}'`, async ({ page }) => {
            const loginModel = new LoginModel(page);
            const topBarModel = new TopBarModel(page);
            const mediaModel = new MediaModel(page);
            const sidebarModel = new SidebarModel(page);
            const commonModel = new CommonModel(page);

            if (user.role == Roles.storeOwner) { return } 
            await loginModel.login(user.username, user.password);

            await topBarModel.selectBrand(brandsData.onlyContent);
            if (user.role != Roles.storeOwner) {await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, NodesTypesEnum.subbrand);}
            await commonModel.waitUntilSpinnerDisappears();
            await sidebarModel.onClickMediaOptionMenu();

            await mediaModel.uploadImage(path.join(__dirname, '../../images/hi.gif'));
            await mediaModel.waitUntilCloseBtnEnable();
            await mediaModel.checkMediaUploadedInTable('hi.gif', 'gif');
            await mediaModel.setTags(mediaData.subBrandTag);
            await commonModel.waitUntilSpinnerDisappears();
            await mediaModel.onClickMediaCloseButton();
            await expect(async () => {
                await expect(mediaModel.addMediaPopupBtn).not.toBeVisible({timeout:300});
            }).toPass();
            await commonModel.waitForSnackbarDissapear();
            await mediaModel.hasMediaTableValues();

            const exists = await mediaModel.checkMediaInTableWithTags('hi.gif', 'video/mp4', mediaData.subBrandTag);
            expect(exists).toBeTruthy();

            await commonModel.setSearchValue('hi.gif');
            await mediaModel.onClickDeleteMediaItem('hi.gif');
            await commonModel.waitUntilSpinnerDisappears();
            await commonModel.waitForSnackbarDissapear();
        });

        test(`Verify that the system allow to upload media JPG type with tags for a store from upload button Brands stores '${user.role}'`, async ({ page }) => {
            const loginModel = new LoginModel(page);
            const topBarModel = new TopBarModel(page);
            const mediaModel = new MediaModel(page);
            const sidebarModel = new SidebarModel(page);
            const commonModel = new CommonModel(page);

            await loginModel.login(user.username, user.password);
            if (user.role != Roles.storeOwner) {
                await topBarModel.selectBrand(brandsData.onlyContent);
                await commonModel.waitUntilSpinnerDisappears();
                await topBarModel.selectNodeStoreGroupChild(brandsData.storeContent);
                await commonModel.waitUntilSpinnerDisappears();
            }
            await sidebarModel.onClickMediaOptionMenu();

            await mediaModel.uploadImage(path.join(__dirname, '../../images/A47.jpg'));
            await mediaModel.waitUntilCloseBtnEnable();
            await mediaModel.checkMediaUploadedInTable('A47.jpg', 'jpeg');
            await mediaModel.setTags(mediaData.storeTag);
            await commonModel.waitUntilSpinnerDisappears();
            await mediaModel.onClickMediaCloseButton();
            await expect(async () => {
                await expect(mediaModel.addMediaPopupBtn).not.toBeVisible({timeout:300});
            }).toPass();
            await commonModel.waitForSnackbarDissapear();
            await mediaModel.hasMediaTableValues();

            const exists = await mediaModel.checkMediaInTableWithTags('A47.jpg', 'jpeg', mediaData.storeTag);
            expect(exists).toBeTruthy();

            await commonModel.setSearchValue('A47.jpg');
            await mediaModel.onClickDeleteMediaItem('A47.jpg');
            await commonModel.waitUntilSpinnerDisappears();
            await commonModel.waitForSnackbarDissapear();
        });

        test(`Verify that the system allow to upload media PNG type with tags for a store from upload button Brands stores '${user.role}'`, async ({ page }) => {
            const loginModel = new LoginModel(page);
            const topBarModel = new TopBarModel(page);
            const mediaModel = new MediaModel(page);
            const sidebarModel = new SidebarModel(page);
            const commonModel = new CommonModel(page);

            await loginModel.login(user.username, user.password);
            if (user.role != Roles.storeOwner) {
                await topBarModel.selectBrand(brandsData.onlyContent);
                await commonModel.waitUntilSpinnerDisappears();
                await topBarModel.selectNodeStoreGroupChild(brandsData.storeContent);
                await commonModel.waitUntilSpinnerDisappears();
            }
            await sidebarModel.onClickMediaOptionMenu();

            await mediaModel.uploadImage(path.join(__dirname, '../../images/avocados.png'));
            await mediaModel.waitUntilCloseBtnEnable();
            await mediaModel.checkMediaUploadedInTable('avocados.png', 'png');
            await mediaModel.setTags(mediaData.storeTag);
            await commonModel.waitUntilSpinnerDisappears();
            await mediaModel.onClickMediaCloseButton();
            await expect(async () => {
                await expect(mediaModel.addMediaPopupBtn).not.toBeVisible({timeout:300});
            }).toPass();
            await commonModel.waitForSnackbarDissapear();
            await mediaModel.hasMediaTableValues();

            const exists = await mediaModel.checkMediaInTableWithTags('avocados.png', 'png', mediaData.storeTag);
            expect(exists).toBeTruthy();

            await commonModel.setSearchValue('avocados.png');
            await mediaModel.onClickDeleteMediaItem('avocados.png');
            await commonModel.waitUntilSpinnerDisappears();
            await commonModel.waitForSnackbarDissapear();
        });

        test(`Verify that the system allow to upload media WEBP type with tags for a store from upload button Brands stores '${user.role}'`, async ({ page }) => {
            const loginModel = new LoginModel(page);
            const topBarModel = new TopBarModel(page);
            const mediaModel = new MediaModel(page);
            const sidebarModel = new SidebarModel(page);
            const commonModel = new CommonModel(page);

            await loginModel.login(user.username, user.password);
            if (user.role != Roles.storeOwner) {
                await topBarModel.selectBrand(brandsData.onlyContent);
                await commonModel.waitUntilSpinnerDisappears();
                await topBarModel.selectNodeStoreGroupChild(brandsData.storeContent);
                await commonModel.waitUntilSpinnerDisappears();
            }
            await sidebarModel.onClickMediaOptionMenu();

            await mediaModel.uploadImage(path.join(__dirname, '../../images/food.webp'));
            await mediaModel.waitUntilCloseBtnEnable();
            await mediaModel.checkMediaUploadedInTable('food.webp', 'webp');
            await mediaModel.setTags(mediaData.storeTag);
            await commonModel.waitUntilSpinnerDisappears();
            await mediaModel.onClickMediaCloseButton();
            await expect(async () => {
                await expect(mediaModel.addMediaPopupBtn).not.toBeVisible({timeout:300});
            }).toPass();
            await commonModel.waitForSnackbarDissapear();
            await mediaModel.hasMediaTableValues();

            const exists = await mediaModel.checkMediaInTableWithTags('food.webp', 'webp', mediaData.storeTag);
            expect(exists).toBeTruthy();

            await commonModel.setSearchValue('food.webp');
            await mediaModel.onClickDeleteMediaItem('food.webp');
            await commonModel.waitUntilSpinnerDisappears();
            await commonModel.waitForSnackbarDissapear();
        });

        test(`Verify that the system allow to upload media GIF type with tags for a store from upload button Brands stores '${user.role}'`, async ({ page }) => {
            const loginModel = new LoginModel(page);
            const topBarModel = new TopBarModel(page);
            const mediaModel = new MediaModel(page);
            const sidebarModel = new SidebarModel(page);
            const commonModel = new CommonModel(page);

            await loginModel.login(user.username, user.password);
            if (user.role != Roles.storeOwner) {
                await topBarModel.selectBrand(brandsData.onlyContent);
                await commonModel.waitUntilSpinnerDisappears();
                await topBarModel.selectNodeStoreGroupChild(brandsData.storeContent);
                await commonModel.waitUntilSpinnerDisappears();
            }
            await commonModel.waitUntilSpinnerDisappears();
            await sidebarModel.onClickMediaOptionMenu();

            await mediaModel.uploadImage(path.join(__dirname, '../../images/rainbow2.gif'));
            await mediaModel.waitUntilCloseBtnEnable();
            await mediaModel.checkMediaUploadedInTable('rainbow2.gif', 'gif');
            await mediaModel.setTags(mediaData.storeTag);
            await commonModel.waitUntilSpinnerDisappears();
            await mediaModel.onClickMediaCloseButton();
            await expect(async () => {
                await expect(mediaModel.addMediaPopupBtn).not.toBeVisible({timeout:300});
            }).toPass();
            await commonModel.waitForSnackbarDissapear();
            await mediaModel.hasMediaTableValues();

            const exists = await mediaModel.checkMediaInTableWithTags('rainbow2.gif', 'video/mp4', mediaData.storeTag);
            expect(exists).toBeTruthy();

            await commonModel.setSearchValue('rainbow2.gif');
            await mediaModel.onClickDeleteMediaItem('rainbow2.gif');
            await commonModel.waitUntilSpinnerDisappears();
            await commonModel.waitForSnackbarDissapear();
        });

        test(`Verify that the search input for media works at brand level '${user.role}'`, async ({ page }) => {
            const loginModel = new LoginModel(page);
            const topBarModel = new TopBarModel(page);
            const mediaModel = new MediaModel(page);
            const sidebarModel = new SidebarModel(page);
            const commonModel = new CommonModel(page);

            if (user.role == Roles.storeOwner) { return } 
            await loginModel.login(user.username, user.password);

            await topBarModel.selectBrand(brandsData.onlyContent);
            await sidebarModel.onClickMediaOptionMenu();

            await mediaModel.uploadImage(path.join(__dirname, '../../images/A97.jpg'));
            await mediaModel.waitUntilCloseBtnEnable();
            await mediaModel.checkMediaUploadedInTable('A97.jpg', 'jpeg');
            await mediaModel.setTags(mediaData.storeTag);
            await commonModel.waitUntilSpinnerDisappears();
            await mediaModel.onClickMediaCloseButton();
            await expect(async () => {
                await expect(mediaModel.addMediaPopupBtn).not.toBeVisible({timeout:300});
            }).toPass();
            await commonModel.waitForSnackbarDissapear();
            await commonModel.setSearchValue('A97');
            await mediaModel.hasMediaTableValues();

            await mediaModel.checkMediaSearchValueInTable('A97.jpg', 'jpeg');

            await mediaModel.onClickDeleteMediaItem('A97.jpg');
            await commonModel.waitUntilSpinnerDisappears();
            await commonModel.waitForSnackbarDissapear();

        });

        test(`Verify that the search input for media works at subbrand level '${user.role}'`, async ({ page }) => {
            const loginModel = new LoginModel(page);
            const topBarModel = new TopBarModel(page);
            const mediaModel = new MediaModel(page);
            const sidebarModel = new SidebarModel(page);
            const commonModel = new CommonModel(page);

            if (user.role == Roles.storeOwner) { return } 
            await loginModel.login(user.username, user.password);

            await topBarModel.selectBrand(brandsData.onlyContent);
            await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, NodesTypesEnum.subbrand);
            
            
            await commonModel.waitUntilSpinnerDisappears();
            await sidebarModel.onClickMediaOptionMenu();

            await mediaModel.uploadImage(path.join(__dirname, '../../images/A13.jpg'));
            await mediaModel.waitUntilCloseBtnEnable();
            await mediaModel.checkMediaUploadedInTable('A13.jpg', 'jpeg');
            await mediaModel.setTags(mediaData.storeTag);
            await commonModel.waitUntilSpinnerDisappears();
            await mediaModel.onClickMediaCloseButton();
            await expect(async () => {
                await expect(mediaModel.addMediaPopupBtn).not.toBeVisible({timeout:300});
            }).toPass();
            await commonModel.waitForSnackbarDissapear();
            await commonModel.setSearchValue('A13');
            await mediaModel.hasMediaTableValues();

            await mediaModel.checkMediaSearchValueInTable('A13.jpg', 'jpeg');

            await mediaModel.onClickDeleteMediaItem('A13.jpg');
            await commonModel.waitUntilSpinnerDisappears();
            await commonModel.waitForSnackbarDissapear();

        });

        test(`Verify that the search input for media works at store level '${user.role}'`, async ({ page }) => {
            const loginModel = new LoginModel(page);
            const topBarModel = new TopBarModel(page);
            const mediaModel = new MediaModel(page);
            const sidebarModel = new SidebarModel(page);
            const commonModel = new CommonModel(page);

            await loginModel.login(user.username, user.password);
            if (user.role != Roles.storeOwner) await topBarModel.selectBrand(brandsData.onlyContent);
            await commonModel.waitUntilSpinnerDisappears();
            if (user.role != Roles.storeOwner) {await topBarModel.selectNodeStoreChild(brandsData.storeContent);}
            await commonModel.waitUntilSpinnerDisappears();
            await sidebarModel.onClickMediaOptionMenu();

            await mediaModel.uploadImage(path.join(__dirname, '../../images/A47.jpg'));
            await mediaModel.waitUntilCloseBtnEnable();
            await mediaModel.checkMediaUploadedInTable('A47.jpg', 'jpeg');
            await mediaModel.setTags(mediaData.storeTag);
            await commonModel.waitUntilSpinnerDisappears();
            await mediaModel.onClickMediaCloseButton();
            await expect(async () => {
                await expect(mediaModel.addMediaPopupBtn).not.toBeVisible({timeout:300});
            }).toPass();
            await commonModel.waitForSnackbarDissapear();
            await commonModel.setSearchValue('A47');
            await mediaModel.hasMediaTableValues();

            await mediaModel.checkMediaSearchValueInTable('A47.jpg', 'image/jpeg');

            await mediaModel.onClickDeleteMediaItem('A47.jpg');
            await commonModel.waitUntilSpinnerDisappears();
            await commonModel.waitForSnackbarDissapear();
        });

        // ! Temporarily skip delete media item test cases until the media item is displayed in the table
        test(`Verify a media item can be deleted at brand level '${user.role}'`, async ({ page }) => {
            const loginModel = new LoginModel(page);
            const topBarModel = new TopBarModel(page);
            const mediaModel = new MediaModel(page);
            const sidebarModel = new SidebarModel(page);
            const commonModel = new CommonModel(page);

            if (user.role == Roles.storeOwner) { return } 
            await loginModel.login(user.username, user.password);

            await topBarModel.selectBrand(brandsData.onlyContent);
            await sidebarModel.onClickMediaOptionMenu();

            await mediaModel.uploadImage(path.join(__dirname, '../../images/A98.png'));
            await mediaModel.waitUntilCloseBtnEnable();
            await mediaModel.checkMediaUploadedInTable('A98.png', 'png');
            await commonModel.waitForSnackbarDissapear();
            await mediaModel.onClickMediaCloseButton();
            await expect(async () => {
                await expect(mediaModel.addMediaPopupBtn).not.toBeVisible({timeout:300});
            }).toPass();
            await commonModel.waitForSnackbarDissapear();
            await mediaModel.hasMediaTableValues();
            const exists = await mediaModel.checkMediaInTable('A98.png', 'png');
            expect(exists).toBeTruthy();

            const createdAt = await mediaModel.mediaTable.locator('tr').nth(0).locator('td').nth(6).innerText();

            await commonModel.setSearchValue('A98.png');
            await mediaModel.onClickDeleteMediaItem('A98.png');
            await commonModel.waitUntilSpinnerDisappears();
            await commonModel.waitForSnackbarDissapear();
        });

        test(`Verify a media item can be deleted at subbrand level '${user.role}'`, async ({ page }) => {
            const loginModel = new LoginModel(page);
            const topBarModel = new TopBarModel(page);
            const mediaModel = new MediaModel(page);
            const sidebarModel = new SidebarModel(page);
            const commonModel = new CommonModel(page);

            if (user.role == Roles.storeOwner) { return } 
            await loginModel.login(user.username, user.password);

            await topBarModel.selectBrand(brandsData.onlyContent);
            await topBarModel.selectNodeBrandChild(brandsData.subBrandContent, NodesTypesEnum.subbrand);
            
            await commonModel.waitUntilSpinnerDisappears();
            await sidebarModel.onClickMediaOptionMenu();

            await mediaModel.uploadImage(path.join(__dirname, '../../images/A93.png'));
            await mediaModel.waitUntilCloseBtnEnable();
            await mediaModel.checkMediaUploadedInTable('A93.png', 'png');
            await mediaModel.onClickMediaCloseButton();
            await expect(async () => {
                await expect(mediaModel.addMediaPopupBtn).not.toBeVisible({timeout:300});
            }).toPass();
            await commonModel.waitForSnackbarDissapear();
            await mediaModel.hasMediaTableValues();
            
            const exists = await mediaModel.checkMediaInTable('A93.png', 'png');
            expect(exists).toBeTruthy();

            const createdAt = await mediaModel.mediaTable.locator('tr').nth(0).locator('td').nth(6).innerText();

            await commonModel.setSearchValue('A93.png');
            await mediaModel.onClickDeleteMediaItem('A93.png');
            await commonModel.waitUntilSpinnerDisappears();
            await commonModel.waitForSnackbarDissapear();
        });

        test(`Verify a media item can be deleted at store level '${user.role}'`, async ({ page }) => {
            const loginModel = new LoginModel(page);
            const topBarModel = new TopBarModel(page);
            const mediaModel = new MediaModel(page);
            const sidebarModel = new SidebarModel(page);
            const commonModel = new CommonModel(page);

            await loginModel.login(user.username, user.password);
            if (user.role != Roles.storeOwner) {
                await topBarModel.selectBrand(brandsData.onlyContent);
                await commonModel.waitUntilSpinnerDisappears();
                await topBarModel.selectNodeStoreGroupChild(brandsData.storeContent);
                await commonModel.waitUntilSpinnerDisappears();
            }
            await sidebarModel.onClickMediaOptionMenu();

            await mediaModel.uploadImage(path.join(__dirname, '../../images/avocados.png'));
            await mediaModel.waitUntilCloseBtnEnable();
            await mediaModel.checkMediaUploadedInTable('avocados.png', 'png');
            await mediaModel.onClickMediaCloseButton();
            await expect(async () => {
                await expect(mediaModel.addMediaPopupBtn).not.toBeVisible({timeout:300});
            }).toPass();
            await commonModel.waitForSnackbarDissapear();
            await mediaModel.hasMediaTableValues();
            const exists = await mediaModel.checkMediaInTable('avocados.png', 'png');
            expect(exists).toBeTruthy();
            const createdAt = await mediaModel.mediaTable.locator('tr').nth(0).locator('td').nth(6).innerText();

            await commonModel.setSearchValue('avocados.png');
            await mediaModel.onClickDeleteMediaItem('avocados.png');
            await commonModel.waitUntilSpinnerDisappears();
            await commonModel.waitForSnackbarDissapear();
        });
    });
});