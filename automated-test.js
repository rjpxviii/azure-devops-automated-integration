describe('Homepage Tests', () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit('/');
    
    // Wait for any dynamic content to load
    cy.wait(1000);
  });

  it('should have the correct title', () => {
    // Check that the page title contains our app name
    cy.title().should('include', 'My Web Application');
  });

  it('should have navigation elements', () => {
    // Verify that the main navigation exists
    cy.get('nav').should('be.visible');
    
    // Check for common navigation links
    cy.get('nav').contains('Home').should('be.visible');
    cy.get('nav').contains('About').should('exist');
    cy.get('nav').contains('Contact').should('exist');
  });

  it('should load main content section', () => {
    // Verify that the main content area exists
    cy.get('main').should('be.visible');
    
    // Check for a heading within the main content
    cy.get('main h1').should('be.visible');
  });

  it('should display footer with copyright info', () => {
    // Verify footer exists
    cy.get('footer').should('be.visible');
    
    // Check for copyright information in the footer
    cy.get('footer').contains('Copyright').should('be.visible');
    cy.get('footer').contains(new Date().getFullYear().toString()).should('be.visible');
  });

  it('should have responsive design elements', () => {
    // Test for mobile responsiveness
    cy.viewport('iphone-x');
    cy.wait(500);
    
    // Mobile menu button should be visible on small screens
    cy.get('[data-testid="mobile-menu-button"]').should('be.visible');
    
    // Switch to desktop
    cy.viewport(1200, 800);
    cy.wait(500);
    
    // On desktop, menu items should be visible and mobile button hidden
    cy.get('[data-testid="desktop-menu"]').should('be.visible');
    cy.get('[data-testid="mobile-menu-button"]').should('not.be.visible');
  });
  
  it('should have functional search capability', () => {
    // Check for search input
    cy.get('[data-testid="search-input"]').should('be.visible');
    
    // Enter search term
    cy.get('[data-testid="search-input"]').type('test search');
    
    // Submit search
    cy.get('[data-testid="search-submit"]').click();
    
    // Results should appear
    cy.get('[data-testid="search-results"]').should('be.visible');
    
    // URL should contain search parameter
    cy.url().should('include', 'search=test%20search');
  });
  
  it('should load images correctly', () => {
    // Check all images have loaded properly
    cy.get('img').each(($img) => {
      // Check if image is visible and has src
      cy.wrap($img)
        .should('be.visible')
        .and(($img) => {
          // Check natural width (0 if image failed to load)
          expect($img[0].naturalWidth).to.be.greaterThan(0);
        });
    });
  });

  it('should have working contact form', () => {
    // Navigate to contact page
    cy.get('nav').contains('Contact').click();
    
    // Verify contact form appears
    cy.get('form[data-testid="contact-form"]').should('be.visible');
    
    // Fill out form
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('textarea[name="message"]').type('This is a test message');
    
    // Submit form
    cy.get('button[type="submit"]').click();
    
    // Verify success message appears
    cy.get('[data-testid="form-success-message"]').should('be.visible');
  });
});
