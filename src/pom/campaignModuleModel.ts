import {expect, Locator, Page} from '@playwright/test';

export class CampaignModel {

    readonly page: Page;
    readonly searchBar: Locator;
    readonly campaignNameHeader: Locator;
    readonly campaignNameHeaderNormalArrow: Locator;
    readonly campaignNameHeaderAscArrow: Locator;
    readonly campaignNameHeaderDescArrow: Locator;
    readonly vendorNameHeader: Locator;
    readonly vendorNameHeaderNormalArrow: Locator;
    readonly vendorNameHeaderAscArrow: Locator;
    readonly vendorNameHeaderDescArrow: Locator;
    readonly dateAddedHeader: Locator;
    readonly dateAddedHeaderNormalArrow: Locator;
    readonly dateAddedHeaderAscArrow: Locator;
    readonly dateAddedHeaderDescArrow: Locator;
    readonly startDateHeader: Locator;
    readonly startDateHeaderNormalArrow: Locator;
    readonly startDateHeaderAscArrow: Locator;
    readonly startDateHeaderDescArrow: Locator;
    readonly uploadedByHeader: Locator;
    readonly uploadedByHeaderNormalArrow: Locator;
    readonly uploadedByHeaderAscArrow: Locator;
    readonly uploadedByHeaderDescArrow: Locator;
    readonly downloadContentHeader: Locator;
    readonly downloadWorkingFilesHeader: Locator;
    readonly campaignTable: Locator;
    readonly campaignModal: Locator;

    constructor (page: Page) {
        this.page = page;
        this.searchBar = page.locator('div.p-inputgroup > input.p-inputtext.p-component');
        this.campaignNameHeader = page.locator('div.p-datatable-wrapper table thead tr th:nth-child(1)');
        this.campaignNameHeaderNormalArrow = page.locator('div.p-datatable-wrapper table thead tr th:nth-child(1)');
        this.campaignNameHeaderAscArrow = page.locator('div.p-datatable-wrapper table thead tr th:nth-child(1) i.p-sortable-column-icon.pi.pi-fw.pi-sort-amount-up-alt');
        this.campaignNameHeaderDescArrow = page.locator('div.p-datatable-wrapper table thead tr th:nth-child(1) i.p-sortable-column-icon.pi.pi-fw.pi-sort-amount-down');
        this.vendorNameHeader = page.locator('div.p-datatable-wrapper table thead tr th:nth-child(2)');
        this.vendorNameHeaderNormalArrow = page.locator('div.p-datatable-wrapper table thead tr th:nth-child(2) i.p-sortable-column-icon.pi.pi-fw.pi-sort-alt');
        this.vendorNameHeaderAscArrow = page.locator('div.p-datatable-wrapper table thead tr th:nth-child(2) i.p-sortable-column-icon.pi.pi-fw.pi-sort-amount-up-alt');
        this.vendorNameHeaderDescArrow = page.locator('div.p-datatable-wrapper table thead tr th:nth-child(2) i.p-sortable-column-icon.pi.pi-fw.pi-sort-amount-down');
        this.dateAddedHeader = page.locator('div.p-datatable-wrapper table thead tr th:nth-child(3)');
        this.dateAddedHeaderNormalArrow = page.locator('div.p-datatable-wrapper table thead tr th:nth-child(3) i.p-sortable-column-icon.pi.pi-fw.pi-sort-alt');
        this.dateAddedHeaderAscArrow = page.locator('div.p-datatable-wrapper table thead tr th:nth-child(3) i.p-sortable-column-icon.pi.pi-fw.pi-sort-amount-up-alt');
        this.dateAddedHeaderDescArrow = page.locator('div.p-datatable-wrapper table thead tr th:nth-child(3) i.p-sortable-column-icon.pi.pi-fw.pi-sort-amount-down');
        this.startDateHeader = page.locator('div.p-datatable-wrapper table thead tr th:nth-child(4)');
        this.startDateHeaderNormalArrow = page.locator('div.p-datatable-wrapper table thead tr th:nth-child(4) i.p-sortable-column-icon.pi.pi-fw.pi-sort-alt');
        this.startDateHeaderAscArrow = page.locator('div.p-datatable-wrapper table thead tr th:nth-child(4) i.p-sortable-column-icon.pi.pi-fw.pi-sort-amount-up-alt');
        this.startDateHeaderDescArrow = page.locator('div.p-datatable-wrapper table thead tr th:nth-child(4) i.p-sortable-column-icon.pi.pi-fw.pi-sort-amount-down');
        this.uploadedByHeader = page.locator('div.p-datatable-wrapper table thead tr th:nth-child(5)');
        this.uploadedByHeaderNormalArrow = page.locator('div.p-datatable-wrapper table thead tr th:nth-child(5) i.p-sortable-column-icon.pi.pi-fw.pi-sort-alt');
        this.uploadedByHeaderAscArrow = page.locator('div.p-datatable-wrapper table thead tr th:nth-child(5) i.p-sortable-column-icon.pi.pi-fw.pi-sort-amount-up-alt');
        this.uploadedByHeaderDescArrow = page.locator('div.p-datatable-wrapper table thead tr th:nth-child(5) i.p-sortable-column-icon.pi.pi-fw.pi-sort-amount-down');
        this.downloadContentHeader = page.locator('div.p-datatable-wrapper table thead tr th:nth-child(6)');
        this.downloadWorkingFilesHeader = page.locator('div.p-datatable-wrapper table thead tr th:nth-child(7)');
        this.campaignTable = page.locator('div.p-datatable-wrapper table');
        this.campaignModal = page.locator('mat-dialog-container');
    }


    /**
     * Verify that the search bar is displayed
     */
    async verifyThatTheSearchBarIsDisplayed(){
        let searchBarVisible: boolean;
        for(let i = 0; i < 60; i++){
            searchBarVisible = await this.searchBar.isVisible();
            if(searchBarVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(searchBarVisible!).toBe(true);
    }


    /**
     * Verify that the campaign name header is displayed
     */
    async verifyThatTheCampaignNameHeaderIsDisplayed(){
        let campaignNameHeaderVisible: boolean;
        for(let i = 0; i < 60; i++){
            campaignNameHeaderVisible = await this.campaignNameHeader.isVisible();
            if(campaignNameHeaderVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(campaignNameHeaderVisible!).toBe(true);
    }

    /**
     * Verify that the campaign name text is displayed
     */
    async verifyTheTextInCampaignNameHeader(){
        let campaignNameHeaderText: string | null = await this.campaignNameHeader.textContent();
        let campaignNameHeadertextNoSpaces = campaignNameHeaderText?.trim();
        expect(campaignNameHeadertextNoSpaces).toEqual("Campaign Name");
    }

    /**
     * Verify that teh campaign name header normal arrow is displayed 
     */
    async verifyTheCampaignNameHeaderNormalArrowDisplayed(){
        let campaignNameHeaderSort: string | null;
        for(let i = 0; i < 60; i++){
            campaignNameHeaderSort = await this.campaignNameHeader.getAttribute('aria-sort');
            if(campaignNameHeaderSort){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(campaignNameHeaderSort!).toEqual('none');
    }


    /**
     * verify that the vendor name header is visible
     */
    async verifyTheVendorNameHeaderVisible(){
        let vendorNameHeaderVisible: boolean;
        for(let i = 0; i < 60; i++){
            vendorNameHeaderVisible = await this.vendorNameHeader.isVisible();
            if(vendorNameHeaderVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(vendorNameHeaderVisible!).toBe(true);
    }


    /**
     * verify that the vendor nmae header normal arrow is displayed
     */
    async verifyTheVendorNameHeaderNormalArrowIsDisplayed(){
        let vendorNameHeaderNormalSorted: string | null;
        for(let i = 0; i < 60; i++){
            vendorNameHeaderNormalSorted = await this.vendorNameHeader.getAttribute('aria-sort');
            if(vendorNameHeaderNormalSorted == 'none'){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(vendorNameHeaderNormalSorted!).toEqual('none');
    }


    /**
     * Verify the text in the vendor name
     */
    async verifyTheTextInVendorNameHeader(){
        let vendorNameHeaderText: string | null = await this.vendorNameHeader.textContent();
        let vendorNameHeaderTextNoSpaces = vendorNameHeaderText?.trim();
        expect(vendorNameHeaderTextNoSpaces).toEqual("Vendor Name");
    }


    /**
     * Verify date adeed header is visible
     */
    async verifyDateAddedHeaderIsVisisble(){
        let dateAddedHeaderVisible: boolean;
        for(let i = 0; i < 60; i++){
            dateAddedHeaderVisible = await this.dateAddedHeader.isVisible();
            if(dateAddedHeaderVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(dateAddedHeaderVisible!).toBe(true);
    }


    /**
     * Verify date added header normal arrow is visible
     */
    async verifyDateAddedHeaderNormalArrowIsVisible(){
        let dateAddedHeaderNormalSorted: string | null;
        for(let i = 0; i < 60; i++){
            dateAddedHeaderNormalSorted = await this.dateAddedHeader.getAttribute('aria-sort');
            if(dateAddedHeaderNormalSorted){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(dateAddedHeaderNormalSorted!).toEqual('none');
    }

    /**
     * Verify that the text in the date added heder is right
     */
    async verifyTheTextInDateAddedHeader(){
        let dateAddedHeaderText: string | null = await this.dateAddedHeader.textContent();
        let dateAddedHeaderTextNoSpaces = dateAddedHeaderText?.trim();
        expect(dateAddedHeaderTextNoSpaces).toEqual("Date Added");
    }


    /**
     * Verify that the start date header is visible
     */
    async verifyStartDateHeaderIsVisible(){
        let startDateHeaderVisible: boolean;
        for(let i = 0; i < 60; i++){
            startDateHeaderVisible = await this.startDateHeader.isVisible();
            if(startDateHeaderVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(startDateHeaderVisible!).toBe(true);
    }


    /**
     * varify that the sorted arrow is displayed in the start date header
     */
    async verifyStartDateHeaderNormalArrowIsVisible(){
        let startDateHeaderNormalArrow: string | null;
        for(let i = 0; i < 60; i++){
            startDateHeaderNormalArrow = await this.startDateHeader.getAttribute('aria-sort');
            if(startDateHeaderNormalArrow){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(startDateHeaderNormalArrow!).toEqual('none');
    }

    /**
     * Verify that the start date label is displayed
     */
    async verifyStartDateLabelIsDisplayed(){
        let startDateHeaderText: string | null = await this.startDateHeader.textContent();
        let startDateHeaderTextNoSpaces = startDateHeaderText?.trim();
        expect(startDateHeaderTextNoSpaces).toEqual("Start Date");
    }


    /**
     * Verify the uploaded by header is visible
     */
    async verifyUploadedByHeaderIsVisible(){
        let uploadedByHeaderVisible: boolean;
        for(let i = 0; i < 60; i++){
            uploadedByHeaderVisible = await this.uploadedByHeader.isVisible();
            if(uploadedByHeaderVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(uploadedByHeaderVisible!).toBe(true);
    }


    /**
     * Verify that the uploaded by header normal arrow is displayed
     */
    async uploadedByHeaderNormalArrowIsVisible(){
        let uploadedByHeaderNormalSorted: string | null;
        for(let i = 0; i < 60; i++){
            uploadedByHeaderNormalSorted = await this.uploadedByHeader.getAttribute('aria-sort');
            if(uploadedByHeaderNormalSorted){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(uploadedByHeaderNormalSorted!).toEqual('none');
    }

    /**
     * Verify that the uploaded by label is displayed
     */
    async verifyUploadedByLabelIsDisplayed(){
        let uploadedByHeaderText: string | null = await this.uploadedByHeader.textContent();
        let uploadedByHeaderTextNoSpaces = uploadedByHeaderText?.trim();
        expect(uploadedByHeaderTextNoSpaces).toEqual("Uploaded by");   
    }


    /**
     * Verify that the campaign name header asc arrow is displayed
     */
    async verifyThatTheCampaignNameHeaderAscArrowIsDisplayed(){
        let campaignNameHeaderAscArrow: string | null;
        for(let i = 0; i < 60; i++){
            campaignNameHeaderAscArrow = await this.campaignNameHeader.getAttribute('aria-sort');
            if(campaignNameHeaderAscArrow){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(campaignNameHeaderAscArrow!).toEqual('ascending');
    }

    /**
     * Verify that the campaign name header normal arrow is not displayed
     */
    async verifyTheCampaignNameHeaderNormalArrowIsNotDisplayed(){
        let campaignNameHeaderNormal: string | null;
        for(let i = 0; i < 60; i++){
            campaignNameHeaderNormal = await this.campaignNameHeader.getAttribute('aria-sort');
            if(!campaignNameHeaderNormal){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(campaignNameHeaderNormal!).not.toEqual('none');
    }

    /**
     * Verify that the campaign name header normal arrow is not displayed
     */
    async verifyThatTheCampaignNameHeaderDescArrowIsDisplayed(){
        let campaignNameHeaderDescArrow: string | null;
        for(let i = 0; i < 60; i++){
            campaignNameHeaderDescArrow = await this.campaignNameHeader.getAttribute('aria-sort');
            if(campaignNameHeaderDescArrow){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(campaignNameHeaderDescArrow!).toEqual('descending');
    }


    /**
     * Verify that the vendor name header asc arrow is displayed
     */
    async verifyThatTheVendorNameHeaderAscArrowIsDisplayed(){
        let vendorNameHeaderAscArrow: string | null;
        for(let i = 0; i < 60; i++){
            vendorNameHeaderAscArrow = await this.vendorNameHeader.getAttribute('aria-sort');
            if(vendorNameHeaderAscArrow){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(vendorNameHeaderAscArrow!).toEqual('ascending');
    }


    /**
     * Verify that the vendor name header normal arrow is not displayed
     */
    async verifyThatTheVendorNameHeaderDescArrowIsDisplayed(){
        let vendorNameHeaderDescArrow: string | null;
        for(let i = 0; i < 60; i++){
            vendorNameHeaderDescArrow = await this.vendorNameHeader.getAttribute('aria-sort');
            if(vendorNameHeaderDescArrow){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(vendorNameHeaderDescArrow!).toEqual('descending');
    }


    /**
     * Verify that the vendor name header normal arrow is not displayed
     */
    async verifyTheVendorNameHeaderNormalArrowIsNotDisplayed(){
        let vendorNameHeaderNormalArrowVisible: boolean;
        for(let i = 0; i < 60; i++){
            vendorNameHeaderNormalArrowVisible = await this.vendorNameHeaderNormalArrow.isVisible();
            if(!vendorNameHeaderNormalArrowVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(vendorNameHeaderNormalArrowVisible!).toBe(false);
    }


    /**
     * Verify that the date added header asc arrow is displayed
     */
    async verifyThatTheDateAddedHeaderAscArrowIsDisplayed(){
        let dateAddedHeaderAscArrow: string | null;
        for(let i = 0; i < 60; i++){
            dateAddedHeaderAscArrow = await this.dateAddedHeader.getAttribute('aria-sort');
            if(dateAddedHeaderAscArrow){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(dateAddedHeaderAscArrow!).toEqual('ascending');
    }


    /**
     * Verify that the vendor name header normal arrow is not displayed
     */
    async verifyTheDateAddedHeaderNormalArrowIsNotDisplayed(){
        let dateAddedHeaderNormalArrowVisible: boolean;
        for(let i = 0; i < 60; i++){
            dateAddedHeaderNormalArrowVisible = await this.dateAddedHeaderNormalArrow.isVisible();
            if(!dateAddedHeaderNormalArrowVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(dateAddedHeaderNormalArrowVisible!).toBe(false);
    }


    /**
     * Verify that the added date header normal DESC arrow is displayed
     */
    async verifyThatThedateAddedHeaderDescArrowIsDisplayed(){
        let dateAddedHeaderDescArrow: string | null;
        for(let i = 0; i < 60; i++){
            dateAddedHeaderDescArrow = await this.dateAddedHeader.getAttribute('aria-sort');
            if(dateAddedHeaderDescArrow){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(dateAddedHeaderDescArrow!).toEqual('descending');
    }


    /**
     * Verify that the start date header ASC arrow is displayed
     */
    async verifyThatTheStartDateHeaderAscArrowIsDisplayed(){
        let startDateHeaderAscArrow: string | null;
        for(let i = 0; i < 60; i++){
            startDateHeaderAscArrow = await this.startDateHeader.getAttribute('aria-sort');
            if(startDateHeaderAscArrow){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(startDateHeaderAscArrow!).toEqual('ascending');
    }


    /**
     * Verify the start date header normal arrow is not displayed
     */
    async verifyTheStartDateHeaderNormalArrowIsNotDisplayed(){
        let startDateHeaderNormalArrowVisible: boolean;
        for(let i = 0; i < 60; i++){
            startDateHeaderNormalArrowVisible = await this.startDateHeaderNormalArrow.isVisible();
            if(!startDateHeaderNormalArrowVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(startDateHeaderNormalArrowVisible!).toBe(false);
    }


    /**
     * Verify that the start date header DESC arrow is displayed
     */
    async verifyThatTheStartDateHeaderDescArrowIsDisplayed(){
        let startDateHeaderDescArrow: string | null;
        for(let i = 0; i < 60; i++){
            startDateHeaderDescArrow = await this.startDateHeader.getAttribute('aria-sort');
            if(startDateHeaderDescArrow){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(startDateHeaderDescArrow!).toEqual('descending');
    }


    /**
     * Verify that the start date header ASC arrow is displayed
     */
    async verifyThatTheUploadByHeaderAscArrowIsDisplayed(){
        let uploadedByHeaderAscArrow: string | null;
        for(let i = 0; i < 60; i++){
            uploadedByHeaderAscArrow = await this.uploadedByHeader.getAttribute('aria-sort');
            if(uploadedByHeaderAscArrow){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(uploadedByHeaderAscArrow!).toEqual('ascending');
    }


    /**
     * Verify the start date header normal arrow is not displayed
     */
    async verifyTheUploadedByHeaderNormalArrowIsNotDisplayed(){
        let uploadedByHeaderNormalArrowVisible: boolean;
        for(let i = 0; i < 60; i++){
            uploadedByHeaderNormalArrowVisible = await this.uploadedByHeaderNormalArrow.isVisible();
            if(!uploadedByHeaderNormalArrowVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(uploadedByHeaderNormalArrowVisible!).toBe(false);
    }


    /**
     * Verify that the Upload By header DESC arrow is displayed
     */
    async verifyThatTheUploadedByHeaderDescArrowIsDisplayed(){
        let uploadedByHeaderDescArrow: string | null;
        for(let i = 0; i < 60; i++){
            uploadedByHeaderDescArrow = await this.uploadedByHeader.getAttribute('aria-sort');
            if(uploadedByHeaderDescArrow){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(uploadedByHeaderDescArrow!).toEqual('descending');
    }


    /**
     * Verify that the campaign name header is displayed
     */
    async verifyThatTheDownloadContentHeaderIsDisplayed(){
        let downloadContentHeaderVisible: boolean;
        for(let i = 0; i < 60; i++){
            downloadContentHeaderVisible = await this.downloadContentHeader.isVisible();
            if(downloadContentHeaderVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(downloadContentHeaderVisible!).toBe(true);
    }


    /**
     * Verify the start date header normal arrow is not displayed
     */
    async verifyTheUploadedByHeaderNormalArrowIsDisplayed(){
        let uploadedByHeaderNormalArrow: string | null;
        for(let i = 0; i < 60; i++){
            uploadedByHeaderNormalArrow = await this.uploadedByHeader.getAttribute('aria-sort');
            if(uploadedByHeaderNormalArrow){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(uploadedByHeaderNormalArrow!).toEqual('none');
    }


    /**
     * Verify the start date header normal arrow is not displayed
     */
    async verifyTheDownloadWorkingFilesHeaderIsDisplayed(){
        let downloadWorkingFilesHeaderVisible: boolean;
        for(let i = 0; i < 60; i++){
            downloadWorkingFilesHeaderVisible = await this.downloadWorkingFilesHeader.isVisible();
            if(downloadWorkingFilesHeaderVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(downloadWorkingFilesHeaderVisible!).toBe(true);
    }


    /**
     * Verify that the campaigns table is displayed
     */
    async verifyThatTheCampaignTableIsDisplayed(){
        let campaignTableVisible: boolean;
        for(let i = 0; i < 60; i++){
            campaignTableVisible = await this.campaignTable.locator('tr').first().isVisible();
            if(campaignTableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(campaignTableVisible!).toBe(true);
    }

    /**
     * Verify that the campaigns table is displayed
     */
    async verifyThatTheCampaignModalIsDisplayed(){
        let campaignModalVisible: boolean;
        for(let i = 0; i < 60; i++){
            campaignModalVisible = await this.campaignModal.locator('tr').first().isVisible();
            if(campaignModalVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(campaignModalVisible!).toBe(true);
    }


    /**
     * Count the rows in the campaings table
     */
    async rowsQuantity(quantity: number){
        let campaignTableVisible: boolean;
        let tableRows: number;
        for(let i = 0; i < 60; i++){
            campaignTableVisible = await this.campaignTable.locator('tr').first().isVisible();
            if(campaignTableVisible){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        for(let i = 0; i < 60; i++){
            tableRows = await this.campaignTable.locator('tbody').locator('tr').count();
            if(tableRows == quantity){
                break;
            }
            await this.page.waitForTimeout(300);
        }

        expect(tableRows!).toEqual(quantity);
    }
}
