// Test script to verify modal functionality
console.log('🔍 Starting modal functionality test...');

// Wait for page to load
window.addEventListener('load', async function() {
    console.log('📄 Page loaded, testing modal system...');
    
    // Test 1: Check if smartRecommendation object exists
    if (window.smartRecommendation) {
        console.log('✅ SmartBrokerRecommendation object found');
        
        // Test 2: Check if createAuthModal method exists
        if (typeof window.smartRecommendation.createAuthModal === 'function') {
            console.log('✅ createAuthModal method found');
            
            // Test 3: Try to create modal programmatically
            try {
                window.smartRecommendation.createAuthModal();
                console.log('✅ Modal created successfully');
                
                // Check if modal exists in DOM
                const modal = document.getElementById('auth-modal');
                if (modal) {
                    console.log('✅ Modal element found in DOM');
                    console.log('📏 Modal HTML:', modal.outerHTML.substring(0, 200) + '...');
                } else {
                    console.log('❌ Modal element not found in DOM');
                }
                
            } catch (error) {
                console.log('❌ Error creating modal:', error);
            }
        } else {
            console.log('❌ createAuthModal method not found');
        }
    } else {
        console.log('❌ SmartBrokerRecommendation object not found');
        console.log('🔍 Available on window:', Object.keys(window).filter(k => k.includes('smart') || k.includes('Smart')));
    }
    
    // Test 4: Check for "Get My Broker Match" buttons
    const brokerMatchButtons = document.querySelectorAll('[data-action="broker-match"]');
    console.log(`📊 Found ${brokerMatchButtons.length} "Get My Broker Match" buttons`);
    
    // Test 5: Check for header auth elements
    const signinContainer = document.getElementById('nav-auth-signin');
    const userContainer = document.getElementById('nav-auth-user');
    console.log('🔍 Header auth elements:');
    console.log('  Sign-in container:', signinContainer ? 'Found' : 'Not found');
    console.log('  User container:', userContainer ? 'Found' : 'Not found');
    
    // Test 6: Check auth status
    try {
        const response = await fetch('/api/auth/me', { credentials: 'include' });
        const authData = await response.json();
        console.log('🔐 Auth status:', authData);
        
        if (authData.authenticated) {
            console.log('👤 User is authenticated:', authData.user.name);
            // Should show user menu
            if (signinContainer && !signinContainer.classList.contains('hidden')) {
                console.log('⚠️ Warning: Sign-in container should be hidden for authenticated user');
            }
            if (userContainer && userContainer.classList.contains('hidden')) {
                console.log('⚠️ Warning: User container should be visible for authenticated user');
            }
        } else {
            console.log('👤 User is not authenticated');
            // Should show sign-in buttons
            if (signinContainer && signinContainer.classList.contains('hidden')) {
                console.log('⚠️ Warning: Sign-in container should be visible for non-authenticated user');
            }
            if (userContainer && !userContainer.classList.contains('hidden')) {
                console.log('⚠️ Warning: User container should be hidden for non-authenticated user');
            }
        }
    } catch (error) {
        console.log('❌ Error checking auth status:', error);
    }
    
    console.log('🏁 Modal functionality test completed');
});

// Test clicking "Get My Broker Match" button after 2 seconds
setTimeout(() => {
    console.log('🖱️ Testing "Get My Broker Match" button click...');
    const brokerMatchButton = document.querySelector('[data-action="broker-match"]');
    if (brokerMatchButton) {
        console.log('📍 Found broker match button, clicking...');
        brokerMatchButton.click();
        
        // Check if modal appeared
        setTimeout(() => {
            const modal = document.getElementById('auth-modal');
            if (modal) {
                console.log('✅ Modal appeared after button click');
            } else {
                console.log('❌ No modal appeared after button click');
            }
        }, 500);
    } else {
        console.log('❌ No broker match button found to click');
    }
}, 2000);

// Test clicking header sign-in button after 4 seconds
setTimeout(() => {
    console.log('🖱️ Testing header sign-in button click...');
    const headerSigninBtn = document.querySelector('#nav-auth-signin button');
    if (headerSigninBtn) {
        console.log('📍 Found header sign-in button, clicking...');
        headerSigninBtn.click();
        
        // Check if modal appeared
        setTimeout(() => {
            const modal = document.getElementById('auth-modal');
            if (modal) {
                console.log('✅ Modal appeared after header sign-in click');
            } else {
                console.log('❌ No modal appeared after header sign-in click');
            }
        }, 500);
    } else {
        console.log('❌ No header sign-in button found to click');
    }
}, 4000);