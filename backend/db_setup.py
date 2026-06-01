import sqlite3

def init_database():
    # Connects to local file - creates it if it doesn't exist
    conn = sqlite3.connect('staffnest_local.db')
    cursor = conn.cursor()
    
    # 1. CANDIDATES TABLE
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS candidates (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            phone TEXT NOT NULL,
            preferred_position TEXT NOT NULL,
            experience_years INTEGER NOT NULL,
            photo_path TEXT,
            cv_path TEXT,
            registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            terms_accepted INTEGER NOT NULL CHECK (terms_accepted = 1)
        )
    ''')
    
    # 2. EMPLOYER REQUIREMENTS TABLE
    # Stores the organization data alongside individual counts for the 5 core departments
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS employer_requirements (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            organization_name TEXT NOT NULL,
            contact_person TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            
            -- 1. Management & Administration counts
            req_general_manager INTEGER DEFAULT 0,
            req_operation_manager INTEGER DEFAULT 0,
            req_hr_manager INTEGER DEFAULT 0,
            req_hr_associates INTEGER DEFAULT 0,
            req_finance_manager INTEGER DEFAULT 0,
            req_accounts_manager INTEGER DEFAULT 0,
            req_cashier INTEGER DEFAULT 0,
            req_it_manager INTEGER DEFAULT 0,
            req_store_manager INTEGER DEFAULT 0,
            req_store_assistants INTEGER DEFAULT 0,
            req_sales_manager INTEGER DEFAULT 0,
            req_sales_executive INTEGER DEFAULT 0,
            
            -- 2. Front Office & Guest Relations counts
            req_front_office_manager INTEGER DEFAULT 0,
            req_reservation_manager INTEGER DEFAULT 0,
            req_guest_relation_executive INTEGER DEFAULT 0,
            req_foa INTEGER DEFAULT 0,
            req_banquet_manager INTEGER DEFAULT 0,
            req_banquet_executive INTEGER DEFAULT 0,
            req_banquet_associates INTEGER DEFAULT 0,
            
            -- 3. Culinary / Kitchen counts
            req_exec_chef INTEGER DEFAULT 0,
            req_chef INTEGER DEFAULT 0,
            req_cdp_indian INTEGER DEFAULT 0,
            req_cdp_chinese INTEGER DEFAULT 0,
            req_cdp_tandoor INTEGER DEFAULT 0,
            req_cdp_continental INTEGER DEFAULT 0,
            req_cdp_bengali INTEGER DEFAULT 0,
            req_cdp_others INTEGER DEFAULT 0,
            req_commi_1 INTEGER DEFAULT 0,
            req_commi_2 INTEGER DEFAULT 0,
            req_commi_3 INTEGER DEFAULT 0,
            req_pantry_chef INTEGER DEFAULT 0,
            req_bakery_chef INTEGER DEFAULT 0,
            req_kitchen_supervisor INTEGER DEFAULT 0,
            req_kst_supervisor INTEGER DEFAULT 0,
            req_kst INTEGER DEFAULT 0,
            
            -- 4. Food & Beverage Service counts
            req_fb_manager INTEGER DEFAULT 0,
            req_fb_controller INTEGER DEFAULT 0,
            req_restaurant_manager INTEGER DEFAULT 0,
            req_bar_manager INTEGER DEFAULT 0,
            req_cafe_manager INTEGER DEFAULT 0,
            req_bartender INTEGER DEFAULT 0,
            req_senior_steward_captain INTEGER DEFAULT 0,
            req_steward INTEGER DEFAULT 0,
            req_fb_associate INTEGER DEFAULT 0,
            
            -- 5. Housekeeping, Security & Utility counts
            req_executive_housekeeper INTEGER DEFAULT 0,
            req_hk_supervisor INTEGER DEFAULT 0,
            req_floor_supervisor INTEGER DEFAULT 0,
            req_laundry_manager INTEGER DEFAULT 0,
            req_hka INTEGER DEFAULT 0,
            req_security_incharge INTEGER DEFAULT 0,
            req_security_personnel INTEGER DEFAULT 0,
            req_spa_gym_incharge INTEGER DEFAULT 0,
            req_driver INTEGER DEFAULT 0,
            req_spa_attendants INTEGER DEFAULT 0,
            req_gym_trainer INTEGER DEFAULT 0,
            
            submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            terms_accepted INTEGER NOT NULL CHECK (terms_accepted = 1)
        )
    ''')
    
    conn.commit()
    conn.close()
    print("Staffnest local SQLite database initialized successfully.")

if __name__ == '__main__':
    init_database()