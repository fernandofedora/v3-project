import { Locator, Page, expect } from '@playwright/test';
import { NodesTypesEnum } from '../enums/nodeTypes.enum';

export class TopBarModel {

    readonly page: Page;
    readonly logoutButton: Locator
    readonly changeLocationButton: Locator
    readonly nodeSelector: Locator;
    readonly brandTable: Locator;
    readonly selectBrandButton: Locator;
    readonly selectNodeButton: Locator;
    readonly nodeTitle: Locator;
    readonly tabElement: Locator;
    readonly brandTab: Locator;
    readonly nodeTab: Locator;
    readonly treeToggler: Locator;
    readonly nodePanelCloseButton: Locator;
    readonly brandPanelCloseButton: Locator;
    readonly showStoreGroupsSwitch: Locator;
    readonly arrowButton: Locator;
    readonly nodesTable: Locator;
    readonly closeButton: Locator;
    readonly searchBrandInput: Locator;
    readonly moduleSearchBar: Locator;

    constructor (page: Page) {
        this.page = page;
        this.logoutButton = page.locator('div:text("Logout")');
        this.changeLocationButton = page.locator('p:text("Change Location")');
        this.nodeSelector = page.locator('div.dh-node-selector-wrapper div.dh-node-logo-info');
        this.brandTable = page.locator('table tbody tr');
        this.selectBrandButton = page.locator("div.dh-node-logo");
        this.selectNodeButton = page.locator("div.dh-node-selector-clickable-label > p");
        this.nodeTitle = page.locator('div.dh-node-selector-title');
        this.tabElement = page.locator("tbody[class='p-datatable-tbody'] [tabindex='0']");
        this.brandTab = page.locator('div[role="complementary"] tbody.p-datatable-tbody');
        this.nodeTab = page.locator("div.dh-node-selector-content p-scroller tbody.p-treetable-tbody");
        this.treeToggler = page.locator('div.dh-node-selector-content button.p-treetable-toggler > i');
        this.nodePanelCloseButton = page.locator('div.dh-node-selector-clickable-label>p').getByText('Close');
        this.brandPanelCloseButton = page.locator('button.p-sidebar-close.p-sidebar-icon.p-link');
        this.showStoreGroupsSwitch = page.locator('div.dh-node-selector-content-wrapper.open p-inputswitch');
        this.nodesTable = page.locator('div[class="dh-node-selector-content-wrapper full ng-star-inserted open"] > div:nth-child(2) > p-treetable > div > div > div > div:nth-child(2) > table > tbody > tr > td:nth(0)');
        //this.nodesTable = page.locator('div[class="dh-node-selector-content-wrapper full ng-star-inserted open"] > div:nth-child(2) > p-treetable > div > div > div > div:nth-child(2) > table > tbody > tr > td');
        this.searchBrandInput = page.locator('div[role="complementary"] input');
        this.moduleSearchBar = page.locator('');
    }



    /**
     * Seelcts a node brand type
     * @param brandName 
     */
    async selectBrand(brandName: string) {

        await this.page.waitForLoadState("networkidle");
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState("networkidle");
        
        await expect( async () => {
            await expect(this.selectBrandButton).toBeVisible( {timeout:500} );
            let brandButtonVisible = await this.selectBrandButton.isVisible();
            expect(brandButtonVisible).toBeTruthy();
        }).toPass();

        await this.selectBrandButton.click( );

        await expect( async () => {
            await expect(this.searchBrandInput).toBeVisible( {timeout:300} );
        }).toPass();

        await this.searchBrandInput.fill(brandName);
        await this.brandTab.getByRole('cell', { name: brandName, exact: true }).click();

        await expect( async () => {
            await expect(this.page.getByText(`${brandName}`)).toBeVisible( {timeout:300} );
        }).toPass();

        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState("networkidle");
    }

    /**
     * Selects a node brand child on the node selector option
     * @param nodeName
     * @param type It can be _SubBrand_ or _Store_
     */
    async selectNodeBrandChild(nodeName: string, type: string){

        await expect( async () => {
            await expect(this.selectNodeButton).toBeVisible( {timeout:300} )
        }).toPass();

        await this.selectNodeButton.click();

        await expect( async () => {
            await expect(this.nodeTab.first()).toBeVisible( {timeout:300} )
        }).toPass();

        switch (type) {
            case NodesTypesEnum.brand:

                await expect( async () => {
                    await expect(this.nodeTab.getByText(nodeName, { exact: true })).toBeVisible( {timeout:300} )
                }).toPass();

                await this.nodeTab.getByText(nodeName, { exact: true }).click();
                break;

            case NodesTypesEnum.subbrand:

                await expect( async () => {
                    await expect(this.nodeTab.getByText(nodeName, { exact: true })).toBeVisible( {timeout:300} )
                }).toPass();

                await this.nodeTab.getByText(nodeName, { exact: true }).click();
                break;

            case NodesTypesEnum.store:
                
                await expect( async () => {
                    await expect(this.nodeTab.getByText(nodeName, { exact: true })).toBeVisible( {timeout:300} )
                }).toPass();

                await this.nodeTab.getByText(nodeName, { exact: true }).nth(1).click();
                break;
        }
    }
    


    /**
     * Selects a node brand child on the node selector option
     * @param nodeName
     */
    async selectNodeStoreChild(nodeName: string){

        await expect( async () => {
            await expect(this.selectNodeButton).toBeVisible( {timeout:300} )
        }).toPass();

        await this.selectNodeButton.click();

        await expect( async () => {
            await expect(this.nodeTab.getByRole('cell', { name: `${nodeName}`, exact: true })).toBeVisible( {timeout:300} )
        }).toPass();

        await this.nodeTab.getByRole('cell', { name: `${nodeName}`, exact: true }).click();
    }


    /**
     * Selects a node brand child on the node selector option
     * @param nodeName
     */
    async selectNodeStoreGroupChild(nodeName: string){

        await expect( async () => {
            await expect(this.selectNodeButton).toBeVisible( {timeout:300} );
        }).toPass();

        await this.selectNodeButton.click();
        
        await expect( async () => {
            await expect(this.nodeTab.locator('tr').first()).toBeVisible( {timeout:300} );
        }).toPass();

        await expect( async () => {
            await expect(this.page.getByRole('cell', { name: `${nodeName}` })).toBeVisible( {timeout:300} );
        }).toPass();

        await this.page.getByRole('cell', { name: `${nodeName}` }).click();
    }


    async selectStoreSubbrandChild(nodeName: string, storeSubBrand: string, type: string){
        let nodeTabVisible: boolean;
        let index: number;
        let rowCount: number;
        let arrowExpanded: string | null;
        let rowCount2: number;

        await expect( async () => {
            await expect(this.selectNodeButton).toBeVisible( {timeout:300} );
        }).toPass();

        await this.selectNodeButton.click();

        for(let i = 0; i < 80; i++){
            nodeTabVisible = await this.nodeTab.locator('tr').first().isVisible();
            if(nodeTabVisible){
                break;
            }
            await this.page.waitForTimeout(400);
        }
        await this.page.waitForTimeout(3000);

        rowCount = await this.nodeTab.locator('tr').count();
    
        for(let i = 0; i < rowCount; i++){
            let text = (await this.nodeTab.locator('tr').nth(i).locator('td:nth-child(1)').innerText()).trim();
            if(text == nodeName){
                index = i;
                break;
            }
        }

        arrowExpanded = await this.nodeTab.locator('tr').nth(index!).locator('td:nth-child(1)').locator('button').locator('i').getAttribute('class');
        let isNotExpanded = arrowExpanded?.includes('right');
        if(isNotExpanded){
            await this.nodeTab.locator('tr').nth(index!).locator('td:nth-child(1)').locator('button').locator('i').click();
        }

        do{
            rowCount2 = await this.nodeTab.locator('tr').count();
        }while(rowCount2 <= rowCount);

        rowCount2 = await this.nodeTab.locator('tr').count();
        
        for(let i = 0; i < rowCount2; i++){
            let text = await this.nodeTab.locator('tr').nth(i).locator('td:nth-child(1)').innerText();
            if(text == storeSubBrand){
                index = i;
                break;
            }
        }

        await this.nodeTab.locator('tr').nth(index!).locator('td:nth-child(1)').click();
    }
}
