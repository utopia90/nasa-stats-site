
describe('Meteorits Landing Main Page', () => {
  it('renders the page and checks for navigation functionality', () => {
   
 
    cy.visit('https://nasa-stats-site.vercel.app/'); 

  
      // Enter username
      cy.get('input[name="username"]').type('admin');
  
      // Enter password
      cy.get('input[name="password"]').type('asafe');
  
      // Submit the form
      cy.get('button[type="submit"]').click();
    
    // Check if the main dashboard title is rendered
    cy.contains('Dashboard')

    //Check if appears the buttons of the sidebar
    cy.get('button[value="0"]').should('exist');
    cy.get('button[value="1"]').should('exist');
    cy.get('button[value="toggle-theme"]').should('exist');


    // Check if the "Back" button is initially hidden
    cy.get('button[value="back"]').should('not.exist');

    // Click the "Forward" button and check if back button appears
    cy.get('button[value="forward"]').click();
    cy.get('button[value="back"]').should('be.visible');

  });
});
