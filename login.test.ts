import {Page,chromium} from 'playwright';
import './server';

describe('Login', () => {
  let page:Page;
  beforeAll(async () => {
    const browser = await chromium.launch();
    page = await browser.newPage();
  })

  //.... rest of the test case

  it('should display "Login" text on title', async () => {
    await page.goto('http://localhost:8080')
    const title = await page.title();
    expect(title).toContain('Login');
  });

 

  it('should successfully login', async () => {
    await page.goto('http://localhost:8080')
    await page.evaluate(()=>{
      const username = document.querySelector('[name=username]');
      const password = document.querySelector('[name=password]');
      if(username&& password){
        (username as HTMLInputElement).value = "jason@tecky.io";
        (password as HTMLInputElement).value = "1234";
      }
      const submit = document.querySelector('[type=submit]');
      if(submit){
        (submit as HTMLInputElement).click();
      }
    });
    const studentMain = await page.evaluate(()=>document.querySelector('#student-main'));
    expect(studentMain).toBeDefined();
  });


  //only text content now
  it.only('create memo', async () => {
    await page.goto('http://localhost:8080')
    await page.evaluate(()=>{
      const content = document.querySelector('[name=content]');
      //const password = document.querySelector('[name=password]');
      if(content){
        (content as HTMLInputElement).value = "HongKongAddOil";
        //(password as HTMLInputElement).value = "1234";
      }
      const submit = document.querySelector('[type=submit]');
      if(submit){
        (submit as HTMLInputElement).click();
      }
    });
    const studentMain = await page.evaluate(()=>alert("Success !!!"));
    expect(studentMain).toBeUndefined();
  });
})