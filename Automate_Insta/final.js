let puppeteer = require("puppeteer");
let fs = require("fs");
let file = process.argv[2];
let search = process.argv[3];
// let message = process.argv[4];

(async function () {
    try {
        let data = await fs.promises.readFile(file);
        let { password, id } = JSON.parse(data);
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized", "--disable-notifications"]
        })
        // load page
        let tabs = await browser.pages()
        let insta = tabs[0]
        // let insta = await browser.newPage()
        await insta.goto("https://www.instagram.com/")
        // input userid
        await insta.waitForSelector("[name='username']")
        await insta.type("[name='username']", id, { delay: 100 })
        // input password
        await insta.waitForSelector("[name='password']")
        await insta.type("[name='password']", password, { delay: 100 })
        // click login
        await insta.click(".sqdOP.L3NKy.y3zKF")
        await insta.waitForNavigation({ waitUntil: "networkidle2" })

        //search
        await insta.click(".XTCLo.x3qfX")
        await insta.type(".XTCLo.x3qfX", search, { delay: 100 })
        await insta.waitFor(2000)
        await insta.keyboard.press('ArrowDown');
        await insta.keyboard.press('Enter');
        // await insta.waitForNavigation({ waitUntil: "networkidle2" })
        await insta.waitFor(3000);

        // follow
        await insta.waitFor(2000)
        await insta.click("._5f5mN.jIbKX._6VtSN.yZn4P", { waitUntil: "networkidle2" })
        await insta.waitFor(500)
        //return to home
        await insta.waitFor(1000);
        await insta.click("[aria-label='Home']")
        //Activity Feed
        await insta.waitFor(1000)
        await insta.click("._0ZPOP.kIKUG",{waitUntil:"networkidle2"})
        await insta.waitFor(1000)
        await insta.waitForSelector(".PUHRj.H_sJK");
        let elements = await insta.$$(".PUHRj.H_sJK.YFq-A")
        let len =elements.length
        //Extracting Activity
        await insta.evaluate(()=>{
        let arr = []
        for (let i = 0; i < len; i++) {
            //console.log(el3[i].innerText);
            arr.push(elements[i].innerText)
        }
        for (let j = 0; j < arr.length; j++) {
            console.log(arr[i]);
        }
        });
        //  select settings
        await insta.waitForSelector(".Fifk5 ._2dbep.qNELH.kIKUG")
        await insta.click(".Fifk5 ._2dbep.qNELH.kIKUG")
        await insta.waitForNavigation({ waitUntil: "networkidle2" })
        await insta.click(".wpO6b")
        await insta.waitFor(2000)
        // logout
        await insta.waitForSelector(".aOOlW.HoLwm");
        let elements1 = await insta.$$(".aOOlW.HoLwm")
        let element = elements1[8]
        await element.click()
        // close page
        await insta.waitFor(3000)
        await insta.close()

    } catch (err) {
        console.log(err)
    }
})();
