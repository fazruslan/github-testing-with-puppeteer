const puppeteer = require('puppeteer');
const expect = require('chai').expect

const testLogin = 'accfortest31';
const testPassword = '23march2022'

describe('Successfull authorization', () => {
    it('Should pass the authorization', async function()
    {
        const browser = await puppeteer.launch({ 
            headless: false, 
            slowMo: 50, 
            devtools: false
        })
        
        const expectedText = 'Learn Git and GitHub without any code!';

        const page = await browser.newPage()
        await page.goto('https://github.com/login')
        await page.type('#login_field', testLogin)
        await page.type('#password', testPassword)
        await page.click('[name="commit"]')
        await page.waitForNavigation()

        let [element] = await page.$x('//h3[@class="text-normal"]');
        let actualText = await page.evaluate(element => element.textContent, element);

        expect(expectedText).equal(actualText);

        await browser.close();
    })
})

describe('Incorrect password enter', () => {
    it('Should appear an error message', async function() 
    {
        const browser = await puppeteer.launch({ 
            headless: false, 
            slowMo: 50, 
            devtools: false
        })

        const expectedText = 'Incorrect username or password!';

        const page = await browser.newPage()
        await page.goto('https://github.com/login')
        await page.type('#login_field', testLogin)
        await page.type('#password', 'somethingincorrectpassword')
        await page.click('[name="commit"]')
        await page.waitForXPath('//div[@class="px-2"]')
        
        let [element] = await page.$x('//div[@class="px-2"]');
        let actualText = await page.evaluate(element => element.textContent, element);

        expect(expectedText).equal(actualText);

        await browser.close();
    })
})