/**
 * Staffnest Solutions - Production Engine Configuration
 * Core Objectives: Max Smoothness, High Refresh Rate Intersections, Zero-Jank State Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    initPerformanceObserver();
    initScrollReveal();
    initActiveNavTracker();
    initTactileForms();
});

/**
 * 1. Intersection Observer Configuration (High FPS Viewport Reveal System)
 * Isolates DOM changes cleanly and relies purely on GPU composite triggers.
 */
function initScrollReveal() {
    const targetSections = document.querySelectorAll('section');
    
    const revealOptions = {
        root: null,
        threshold: 0.12, // Fires smoothly right as the box glides into sight
        rootMargin: "0px 0px -40px 0px"
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // requestAnimationFrame forces alignment with native hardware screen refresh loops
                requestAnimationFrame(() => {
                    entry.target.classList.add('reveal');
                });
                observer.unobserve(entry.target); // Deallocates resources once tracking completes
            }
        });
    }, revealOptions);

    targetSections.forEach(section => {
        sectionObserver.observe(section);
    });
}

/**
 * 2. High-Performance Navigation Dynamic Syncer
 * Updates current section active state using low-overhead coordinates.
 */
function initActiveNavTracker() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#main-nav a');

    window.addEventListener('scroll', () => {
        let currentSectionId = "";
        const scrollPosition = window.scrollY + 160; 

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        requestAnimationFrame(() => {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        });
    }, { passive: true }); // passive: true bypasses rendering-block mechanics completely
}

/**
 * 3. Tactile Feedback Matrix (Form Micro-Interactions)
 * Adds micro-animations to text selections and selection configurations.
 */
function initTactileForms() {
    const formElements = document.querySelectorAll('input, select');
    
    formElements.forEach(element => {
        element.addEventListener('focus', () => {
            requestAnimationFrame(() => {
                element.parentElement.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            });
        });

        // Instant background validation engine
        element.addEventListener('blur', () => {
            if (element.hasAttribute('required') && !element.value) {
                element.style.borderColor = 'rgba(239, 68, 68, 0.4)'; // Soft Luxury Warning Red
            } else if (element.value) {
                element.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            }
        });
    });
}

/**
 * 4. Structural Verification Matrix 
 * Diagnostic utility monitoring UI stability framework metrics.
 */
function initPerformanceObserver() {
    if (window.PerformanceObserver) {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.duration > 50) {
                    console.warn(`[Performance Alert] Long Task detected impacting UI threat vectors: ${entry.duration.toFixed(2)}ms`);
                }
            });
        });
        observer.observe({ entryTypes: ['longtask'] });
    }
}
/**
 * 5. High-Performance Accordion Mechanism
 * Uses programmatic calculation variables to toggle height transitions smoothly at 60fps.
 */
function initAccordionEngine() {
    const headers = document.querySelectorAll('.accordion-header');
    
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.parentElement;
            const isOpen = currentItem.classList.contains('active');
            
            // OPTIONAL MECHANISM: Auto-closes other open sections to keep the view completely clean
            const openSiblings = document.querySelectorAll('.accordion-item.active');
            openSiblings.forEach(sibling => {
                if(sibling !== currentItem) {
                    requestAnimationFrame(() => {
                        sibling.classList.remove('active');
                    });
                }
            });

            // Toggle selected element inside execution thread loop
            requestAnimationFrame(() => {
                if (isOpen) {
                    currentItem.classList.remove('active');
                } else {
                    currentItem.classList.add('active');
                }
            });
        });
    });
}

// Register initialization trigger securely inside root window runner
const baseRunner = initTactileForms;
initTactileForms = function() {
    baseRunner();
    initAccordionEngine();
};
/**
 * 6. LIVE PRODUCTION DATABASE CONNECTOR ENGINE
 * Routes form submissions seamlessly into the cloud database layers.
 */
const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL_HERE";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_PUBLIC_KEY_HERE";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Handle Employer Form Submission
document.getElementById('employer-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Build JSON payload matching columns exactly
    const payload = {
        organization_name: formData.get('employer_organization_name'),
        contact_person: formData.get('employer_contact_name'),
        email: formData.get('employer_email'),
        phone: formData.get('employer_phone'),
        terms_accepted: formData.get('employer_terms_accept') === 'on',
        
        // Dynamic reading of all numeric fields from your dropdown sections
        req_general_manager: parseInt(formData.get('req_general_manager')) || 0,
        req_operation_manager: parseInt(formData.get('req_operation_manager')) || 0,
        req_hr_manager: parseInt(formData.get('req_hr_manager')) || 0,
        req_hr_associates: parseInt(formData.get('req_hr_associates')) || 0,
        req_finance_manager: parseInt(formData.get('req_finance_manager')) || 0,
        req_accounts_manager: parseInt(formData.get('req_accounts_manager')) || 0,
        req_cashier: parseInt(formData.get('req_cashier')) || 0,
        req_it_manager: parseInt(formData.get('req_it_manager')) || 0,
        req_store_manager: parseInt(formData.get('req_store_manager')) || 0,
        req_store_assistants: parseInt(formData.get('req_store_assistants')) || 0,
        req_sales_manager: parseInt(formData.get('req_sales_manager')) || 0,
        req_sales_executive: parseInt(formData.get('req_sales_executive')) || 0,
        req_front_office_manager: parseInt(formData.get('req_front_office_manager')) || 0,
        req_reservation_manager: parseInt(formData.get('req_reservation_manager')) || 0,
        req_guest_relation_executive: parseInt(formData.get('req_guest_relation_executive')) || 0,
        req_foa: parseInt(formData.get('req_foa')) || 0,
        req_banquet_manager: parseInt(formData.get('req_banquet_manager')) || 0,
        req_banquet_executive: parseInt(formData.get('req_banquet_executive')) || 0,
        req_banquet_associates: parseInt(formData.get('req_banquet_associates')) || 0,
        req_exec_chef: parseInt(formData.get('req_exec_chef')) || 0,
        req_chef: parseInt(formData.get('req_chef')) || 0,
        req_cdp_indian: parseInt(formData.get('req_cdp_indian')) || 0,
        req_cdp_chinese: parseInt(formData.get('req_cdp_chinese')) || 0,
        req_cdp_tandoor: parseInt(formData.get('req_cdp_tandoor')) || 0,
        req_cdp_continental: parseInt(formData.get('req_cdp_continental')) || 0,
        req_cdp_bengali: parseInt(formData.get('req_cdp_bengali')) || 0,
        req_cdp_others: parseInt(formData.get('req_cdp_others')) || 0,
        req_commi_1: parseInt(formData.get('req_commi_1')) || 0,
        req_commi_2: parseInt(formData.get('req_commi_2')) || 0,
        req_commi_3: parseInt(formData.get('req_commi_3')) || 0,
        req_pantry_chef: parseInt(formData.get('req_pantry_chef')) || 0,
        req_bakery_chef: parseInt(formData.get('req_bakery_chef')) || 0,
        req_kitchen_supervisor: parseInt(formData.get('req_kitchen_supervisor')) || 0,
        req_kst_supervisor: parseInt(formData.get('req_kst_supervisor')) || 0,
        req_kst: parseInt(formData.get('req_kst')) || 0,
        req_fb_manager: parseInt(formData.get('req_fb_manager')) || 0,
        req_fb_controller: parseInt(formData.get('req_fb_controller')) || 0,
        req_restaurant_manager: parseInt(formData.get('req_restaurant_manager')) || 0,
        req_bar_manager: parseInt(formData.get('req_bar_manager')) || 0,
        req_cafe_manager: parseInt(formData.get('req_cafe_manager')) || 0,
        req_bartender: parseInt(formData.get('req_bartender')) || 0,
        req_senior_steward_captain: parseInt(formData.get('req_senior_steward_captain')) || 0,
        req_steward: parseInt(formData.get('req_steward')) || 0,
        req_fb_associate: parseInt(formData.get('req_fb_associate')) || 0,
        req_executive_housekeeper: parseInt(formData.get('req_executive_housekeeper')) || 0,
        req_hk_supervisor: parseInt(formData.get('req_hk_supervisor')) || 0,
        req_floor_supervisor: parseInt(formData.get('req_floor_supervisor')) || 0,
        req_laundry_manager: parseInt(formData.get('req_laundry_manager')) || 0,
        req_hka: parseInt(formData.get('req_hka')) || 0,
        req_security_incharge: parseInt(formData.get('req_security_incharge')) || 0,
        req_security_personnel: parseInt(formData.get('req_security_personnel')) || 0,
        req_spa_gym_incharge: parseInt(formData.get('req_spa_gym_incharge')) || 0,
        req_driver: parseInt(formData.get('req_driver')) || 0,
        req_spa_attendants: parseInt(formData.get('req_spa_attendants')) || 0,
        req_gym_trainer: parseInt(formData.get('req_gym_trainer')) || 0
    };

    const { error } = await supabase.from('employer_requirements').insert([payload]);

    if (error) {
        alert("Submission failed: " + error.message);
    } else {
        alert("Staff requirements logged successfully into Staffnest Solutions cloud database!");
        e.target.reset();
    }
});

// Handle Candidate Form Submission
document.getElementById('candidate-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // For MVP clarity, we parse basic strings. File handling configuration goes to storage hooks next
    const payload = {
        name: formData.get('candidate_name'),
        email: formData.get('candidate_email'),
        phone: formData.get('candidate_phone'),
        preferred_position: formData.get('candidate_preferred_position'),
        experience_years: parseInt(formData.get('candidate_experience_years')) || 0,
        terms_accepted: formData.get('candidate_terms_accept') === 'on',
        cv_url: "Pending local upload sync protocol"
    };

    const { error } = await supabase.from('candidates').insert([payload]);

    if (error) {
        alert("Registration failed: " + error.message);
    } else {
        alert("Profile registered successfully! Welcome to Staffnest Solutions.");
        e.target.reset();
    }
});