import { Selector } from 'testcafe';

fixture `User Login`
    .page `http://www.blagajna.hr/pos/index.php`;

test('Login successful ', async t => {
    await t.click("input[type='submit']")
 
   const location = await t.eval(() => window.location);
 
   await t.expect(location.pathname).eql('/pos/index.php');
});


test('Login failed', async t => {
    const wrongPassword = "ason2irn32irn2oirn";
    
    await t
            .typeText(Selector('#pin'), wrongPassword)
            .click("input[type='submit']");
          
   const location = await t.eval(() => window.location);

   await t.expect(location.search).eql('?action=error');

   const borderColorLeft = Selector('#pin').getStyleProperty("border-left-color");
   await t.expect(borderColorLeft).eql("rgb(255, 0, 0)");
   
   const borderColorRight = Selector('#pin').getStyleProperty("border-right-color");
   await t.expect(borderColorLeft).eql("rgb(255, 0, 0)");
});


