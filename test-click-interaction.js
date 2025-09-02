// Test script to simulate clicking the "Get My Broker Match" button
// and verify the authentication flow works

const puppeteer = require('puppeteer');

async function testAuthFlow() {
    console.log('🚀 Starting authentication flow test...');
    
    try {
        // Launch browser
        const browser = await puppeteer.launch({
            headless: false, // Set to true for headless mode
            defaultViewport: { width: 1200, height: 800 }
        });
        
        const page = await browser.newPage();
        
        // Enable console logging
        page.on('console', msg => {
            console.log('PAGE LOG:', msg.text());
        });
        
        page.on('pageerror', error => {
            console.error('PAGE ERROR:', error.message);
        });
        
        // Navigate to the page
        console.log('📄 Navigating to homepage...');
        await page.goto('https://3000-iz06f1q0kw9r1svxgxaql-6532622b.e2b.dev', {
            waitUntil: 'networkidle0'
        });
        
        // Wait for the Smart Broker Recommendation System to initialize
        await page.waitForFunction(() => {
            return window.smartRecommendation !== undefined;
        }, { timeout: 10000 });
        
        console.log('✅ Smart Broker Recommendation System loaded');
        
        // Find and click the "Get My Broker Match" button
        console.log('🔍 Looking for "Get My Broker Match" button...');
        
        const button = await page.$('[data-action="broker-match"]');
        if (!button) {
            throw new Error('Could not find the "Get My Broker Match" button');
        }
        
        console.log('🖱️ Clicking "Get My Broker Match" button...');
        await button.click();
        
        // Wait for authentication check and widget to show
        await page.waitForTimeout(2000);
        
        // Check if the authentication prompt is shown
        const authPrompt = await page.$('#questionnaire-form h3');
        if (authPrompt) {
            const authText = await page.evaluate(el => el.textContent, authPrompt);
            console.log('🔐 Authentication prompt shown:', authText);
            
            if (authText.includes('Sign In Required')) {
                console.log('✅ SUCCESS: Authentication flow working correctly!');
                console.log('✅ Unauthenticated users are properly prompted to sign in');
            } else {
                console.log('❌ FAILURE: Expected "Sign In Required" but got:', authText);
            }
        } else {
            console.log('❌ FAILURE: No authentication prompt found');
        }
        
        // Check if widget is visible
        const widget = await page.$('#recommendation-widget');
        const isWidgetVisible = await page.evaluate(el => {
            return el && !el.classList.contains('hidden');
        }, widget);
        
        if (isWidgetVisible) {
            console.log('✅ Widget is properly displayed');
        } else {
            console.log('❌ Widget is not displayed');
        }
        
        // Keep browser open for manual inspection
        console.log('🔍 Keeping browser open for 30 seconds for manual inspection...');
        await page.waitForTimeout(30000);
        
        await browser.close();
        console.log('🏁 Test completed');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

testAuthFlow();