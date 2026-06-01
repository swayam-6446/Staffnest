import sqlite3

def find_matches_for_hotel(hotel_id):
    conn = sqlite3.connect('staffnest_local.db')
    conn.row_factory = sqlite3.Row  # Enables accessing columns by name
    cursor = conn.cursor()
    
    # Fetch the specific hotel's staff requirements
    cursor.execute("SELECT * FROM employer_requirements WHERE id = ?", (hotel_id,))
    hotel = cursor.fetchone()
    
    if not hotel:
        print("Hotel requirement record not found.")
        return

    print(f"\n==================================================")
    print(f" MATCHMAKING MATRIX FOR: {hotel['organization_name']}")
    print(f" Contact: {hotel['contact_person']} | Ph: {hotel['phone']}")
    print(f"==================================================\n")
    
    # Dynamically extract columns that have a shortage greater than 0
    columns = [description[0] for description in cursor.description]
    
    shortages_found = False
    
    for col in columns:
        # We only care about columns starting with 'req_' where shortages exist
        if col.startswith('req_') and hotel[col] > 0:
            shortages_found = True
            required_count = hotel[col]
            
            # Map the technical column name back to the candidate text string
            # e.g., 'req_general_manager' -> 'General Manager'
            clean_position_name = col.replace('req_', '').replace('_', ' ').title()
            # Handle specific structural naming edge cases manually to align with your <select> values
            if clean_position_name == "Foa": clean_position_name = "Front Office Associate"
            if clean_position_name == "Fb Manager": clean_position_name = "FandB Manager"
            
            print(f"● Open Vacancy detected: {clean_position_name} (Needs: {required_count})")
            print(f"  Searching database for qualified candidates...")
            
            # Query candidates matching this role, prioritizing higher experience
            cursor.execute('''
                SELECT name, email, phone, experience_years, cv_path 
                FROM candidates 
                WHERE preferred_position = ? 
                ORDER BY experience_years DESC
            ''', (clean_position_name,))
            
            candidates = cursor.fetchall()
            
            if candidates:
                for idx, candidate in enumerate(candidates, 1):
                    print(f"    [{idx}] {candidate['name']} - Exp: {candidate['experience_years']} years")
                    print(f"        Contact: {candidate['phone']} | Email: {candidate['email']}")
                    print(f"        CV File Token Location: {candidate['cv_path']}")
            else:
                print("    ⚠️ No candidates matching this exact criteria currently in database.")
            print("-" * 50)
            
    if not shortages_found:
        print("This establishment currently has zero active staff shortage requirements listed.")
        
    conn.close()

if __name__ == '__main__':
    # Pass the primary key ID of the hotel you want to manually match from your dashboard
    # Example: Processing the very first registered hotel requirement row
    find_matches_for_hotel(1)