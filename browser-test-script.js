// Paste this script into browser console at https://3000-iz06f1q0kw9r1svxgxaql-6532622b.e2b.dev
// to test the authentication flow

console.log('🔄 Starting authentication flow test...');

async function testAuthenticationFlow() {
    console.log('1️⃣ Testing authentication endpoint...');
    
    try {
        // Test the auth endpoint directly  
        const response = await fetch('/api/auth/me', {
            method: 'GET',
            credentials: 'include'
        });
        
        console.log('Response status:', response.status, response.statusText);
        
        if (response.ok) {
            const data = await response.json();
            console.log('Auth data:', data);
            
            if (data.authenticated === false) {
                console.log('✅ Correctly identified as unauthenticated');
            } else {
                console.log('❌ Unexpected: User appears authenticated');
            }
        }
    } catch (error) {
        console.error('❌ Auth endpoint error:', error);
    }
    
    console.log('\n2️⃣ Testing Smart Recommendation System...');
    
    // Check if the system is loaded
    if (typeof window.smartRecommendation !== 'undefined') {
        console.log('✅ Smart Recommendation System is loaded');
        
        // Test the authentication check method
        console.log('Testing checkAuthentication method...');
        const isAuth = await window.smartRecommendation.checkAuthentication();
        console.log('checkAuthentication result:', isAuth);
        
        if (isAuth === false) {
            console.log('✅ Authentication check working correctly');
        } else {
            console.log('❌ Authentication check failed - should return false');
        }
    } else {
        console.log('❌ Smart Recommendation System not loaded');
    }
    
    console.log('\n3️⃣ Simulating button click...');
    
    // Find the button
    const button = document.querySelector('[data-action="broker-match"]');
    if (button) {
        console.log('✅ Found "Get My Broker Match" button');
        
        // Simulate click
        console.log('🖱️ Simulating button click...');
        button.click();
        
        // Check if widget becomes visible
        setTimeout(() => {
            const widget = document.getElementById('recommendation-widget');
            if (widget && !widget.classList.contains('hidden')) {
                console.log('✅ Widget is now visible');
                
                // Check what's inside the widget
                const questionnaire = document.getElementById('questionnaire-form');
                if (questionnaire) {
                    const content = questionnaire.innerHTML;
                    if (content.includes('Sign In Required')) {
                        console.log('✅ SUCCESS: Authentication prompt is shown!');
                        console.log('🎉 The authentication flow is working correctly');
                    } else {
                        console.log('❌ FAILURE: Expected authentication prompt but got:', content.substring(0, 100) + '...');
                    }
                }
            } else {
                console.log('❌ Widget is not visible');
            }
        }, 2000);
        
    } else {
        console.log('❌ Could not find the button');
    }
}

// Run the test
testAuthenticationFlow();