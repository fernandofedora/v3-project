import { Locator, Page, expect } from '@playwright/test';
import { time } from 'console';
import moment, { Moment } from 'moment';

export class CampaignBuilderModel {

    readonly page: Page;
    readonly nodeImage: Locator;
    readonly nodeSelector: Locator;
    readonly changeLocationButton: Locator;
    readonly campaignBlockManagerHeader: Locator;
    readonly newCampaignButton: Locator;
    readonly campaignUtilitySideMenu: Locator;
    readonly campaignEditorLabel: Locator;
    readonly campaignTitleAccordeon: Locator;
    readonly dateRangeAccordeon: Locator;
    readonly mappingAccordeon: Locator;
    readonly oppmAccordeon: Locator;
    readonly approvalAccordeon: Locator;
    readonly searchBar: Locator;
    readonly campaignTitle: Locator;
    readonly campaignTitleIndicator: Locator;
    readonly campaignTitleIndicatorDirty: Locator;
    readonly startDateField: Locator;
    readonly startDateDateSelector: Locator;
    readonly endDateSelector: Locator;
    readonly deleteCampaignButton: Locator;
    readonly yesbutton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.nodeSelector = page.locator('div.dh-node-selector-wrapper div.dh-node-logo-info');
        this.nodeImage = page.locator('div.dh-node-logo img');
        this.changeLocationButton = page.getByText('Change Location');
        this.campaignBlockManagerHeader = page.getByRole('heading', { name: 'Campaign Block Manager' });
        this.newCampaignButton = page.locator('dh-button').filter({ hasText: 'New Campaign' }).locator('div').first();
        this.campaignUtilitySideMenu = page.locator('div').filter({ hasText: /^CAMPAIGN UTILITY$/ }).first();
        this.campaignEditorLabel = page.getByText('CAMPAIGN EDITOR');
        this.campaignTitleAccordeon = page.getByRole('button', { name: 'Campaign Title *' });
        this.dateRangeAccordeon = page.getByRole('button', { name: 'Date Range *' });
        this.mappingAccordeon = page.getByRole('button', { name: 'Mapping' });
        this.oppmAccordeon = page.getByRole('button', { name: 'OPPM' });
        this.approvalAccordeon = page.getByRole('button', { name: 'Approval' });
        this.searchBar = page.getByPlaceholder('Search');
        this.campaignTitle = page.getByLabel('Campaign Title *').getByRole('textbox');
        this.campaignTitleIndicator = page.getByRole('button', { name: 'Campaign Title *' }).locator('[class="header-change"]');
        this.campaignTitleIndicatorDirty = page.getByRole('button', { name: 'Campaign Title *' }).locator('[class="header-change dirty"]');
        this.startDateField = page.getByLabel('Starts Date');
        this.startDateDateSelector = page.locator('app-datetime-picker').filter({ hasText: 'Starts Date' }).locator('i');
        this.endDateSelector = page.locator('app-datetime-picker').filter({ hasText: 'End Date' }).locator('i');
        this.deleteCampaignButton = page.getByRole('button', { name: 'Delete Campaign' });
        this.yesbutton = page.getByRole('button', { name: 'Yes' });
    }

    async insertActualDate() {
        let date = new Date();
        let actualDate = moment(date);

        let day = actualDate.format('DD');
        let month = actualDate.format('MMMM');
        let year = actualDate.format('YYYY');

        await this.startDateDateSelector.click();
        await this.page.getByLabel('Choose month and year').click();
        await this.page.getByLabel(`${year}`).click();
        await this.page.getByLabel(`${month}`).click();
        await this.page.getByLabel(`${day}`).click();
        await this.page.getByRole('button', { name: 'Apply' }).click();

        return actualDate;
    }

    async insertEndDate(quantity: any, unit: any) {
        let date = new Date();
        let actualDate = moment(date);

        let futureDate = actualDate.add(quantity, unit);
        
        let day = actualDate.format('DD');
        let month = actualDate.format('MMMM');
        let year = actualDate.format('YYYY');

        await this.endDateSelector.click();
        await this.page.getByLabel('Choose month and year').click();
        await this.page.getByLabel(`${year}`).click();
        await this.page.getByLabel(`${month}`).click();
        await this.page.getByLabel(`${day}`).click();
        await this.page.getByRole('button', { name: 'Apply' }).click();

        return futureDate;
    }

    async verifyThatTheCampaignIsCreated(pageName: string, startDate: Moment, endDate: Moment){

        let startDateData = moment(startDate);
        let endDateData = moment(endDate);

        let startDatedayName = startDateData.format('dddd').substring(0, 3);
        let startDateMonthName = startDateData.format('MMMM').substring(0, 3);
        let startDateDay = startDateData.format('DD');

        let endDatedayName = endDateData.format('dddd').substring(0, 3);
        let endDateMonthName = endDateData.format('MMMM').substring(0, 3);
        let endDateDay = endDateData.format('DD');

        await expect( async () => {
            await expect(this.page.getByRole('cell', { name: `${pageName}`, exact: true })).toBeVisible( { timeout:300 } );
            await expect(this.page.getByRole('row', { name: `${pageName}`+ ' ' +`${startDatedayName}`+ ', ' + `${startDateMonthName}` + ' ' +`${startDateDay}`+ ' '+ `${endDatedayName}` + ', ' +`${endDateMonthName}`+ ' '+`${endDateDay}` }).getByLabel('In Progress')).toBeVisible( {timeout:300} );
            await expect(this.page.getByRole('row', { name: `${pageName}`+ ' ' +`${startDatedayName}`+ ', ' + `${startDateMonthName}` + ' ' +`${startDateDay}`+ ' '+ `${endDatedayName}` + ', ' +`${endDateMonthName}`+ ' '+`${endDateDay}` }).getByLabel('Live')).toBeVisible( {timeout:300} );
        }).toPass();
        
    }

    async verifyThatTheCampaignIsCreatedFuture(pageName: string, startDate: Moment, endDate: Moment){

        let startDateData = moment(startDate);
        let endDateData = moment(endDate);

        let startDatedayName = startDateData.format('dddd').substring(0, 3);
        let startDateMonthName = startDateData.format('MMMM').substring(0, 3);
        let startDateDay = startDateData.format('DD');

        let endDatedayName = endDateData.format('dddd').substring(0, 3);
        let endDateMonthName = endDateData.format('MMMM').substring(0, 3);
        let endDateDay = endDateData.format('DD');

        await expect( async () => {
            await expect(this.page.getByRole('cell', { name: `${pageName}`, exact: true })).toBeVisible( { timeout:300 } );
            await expect(this.page.getByRole('row', { name: `${pageName}`+ ' ' +`${startDatedayName}`+ ', ' + `${startDateMonthName}` + ' ' +`${startDateDay}`+ ' '+ `${endDatedayName}` + ', ' +`${endDateMonthName}`+ ' '+`${endDateDay}` }).getByLabel('In Progress')).toBeVisible( {timeout:300} );
            await expect(this.page.getByRole('row', { name: `${pageName}`+ ' ' +`${startDatedayName}`+ ', ' + `${startDateMonthName}` + ' ' +`${startDateDay}`+ ' '+ `${endDatedayName}` + ', ' +`${endDateMonthName}`+ ' '+`${endDateDay}` }).getByLabel('Upcoming')).toBeVisible( {timeout:300} );
        }).toPass();
        
    }

    async deleteCampaign( campaignName: string){
        await this.page.getByRole('cell', { name: `${campaignName}`, exact: true }).click( { delay:300 } );

        await this.approvalAccordeon.click( {delay: 200} );
        await expect( async () => {
            await this.deleteCampaignButton.click( {delay: 200} );
        }).toPass();
        await this.deleteCampaignButton.click( {delay: 200} );
        await this.yesbutton.click( {delay: 200} );

        await expect( async () => {
            await expect(this.page.getByRole('cell', { name: `${campaignName}`, exact: true })).not.toBeVisible( {timeout:300} );
        }).toPass();
        
    }

    async modifyStartDate(date: Moment, quantity: any, unit: any) {
        
        let actualDate = moment(date);

        let newDate = actualDate.add(quantity, unit);
        
        let day = actualDate.format('DD');
        let month = actualDate.format('MMMM');
        let year = actualDate.format('YYYY');

        await this.startDateDateSelector.click();
        await this.page.getByLabel('Choose month and year').click();
        await this.page.getByLabel(`${year}`).click();
        await this.page.getByLabel(`${month}`).click();
        await this.page.getByLabel(`${day}`).click();
        await this.page.getByRole('button', { name: 'Apply' }).click();

        return newDate;
    }

    
    async modifyEndDate(date: Moment, quantity: any, unit: any) {
        
        let actualDate = moment(date);

        let newDate = actualDate.add(quantity, unit);
        
        let day = actualDate.format('DD');
        let month = actualDate.format('MMMM');
        let year = actualDate.format('YYYY');

        await this.endDateSelector.click();
        await this.page.getByLabel('Choose month and year').click();
        await this.page.getByLabel(`${year}`).click();
        await this.page.getByLabel(`${month}`).click();
        await this.page.getByLabel(`${day}`).click();
        await this.page.getByRole('button', { name: 'Apply' }).click();

        return newDate;
    }
}