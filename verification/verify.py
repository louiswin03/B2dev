from playwright.sync_api import sync_playwright

def verify_site():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # 1. Homepage
        print("Navigating to Homepage...")
        page = browser.new_page(viewport={"width": 1280, "height": 720})
        page.goto("http://localhost:3000")
        page.wait_for_selector("text=Propulsez votre activité")
        page.wait_for_timeout(1000)
        page.screenshot(path="verification/1_homepage.png")
        
        # 2. About - Direct Navigation to avoid click issues
        print("Navigating to About...")
        page.goto("http://localhost:3000/apropos")
        page.wait_for_selector("text=L'excellence technique")
        page.wait_for_timeout(1000)
        page.screenshot(path="verification/2_about.png")

        # 3. Portfolio - Direct Navigation
        print("Navigating to Portfolio...")
        page.goto("http://localhost:3000/realisations")
        page.wait_for_selector("text=Nos Réalisations")
        page.wait_for_timeout(1000)
        page.screenshot(path="verification/3_portfolio.png")

        # 4. Services - Direct Navigation
        print("Navigating to Services...")
        page.goto("http://localhost:3000/services")
        page.wait_for_selector("text=Nos Offres & Tarifs")
        page.wait_for_timeout(1000)
        page.screenshot(path="verification/4_services.png")

        # 5. Contact - Direct Navigation
        print("Navigating to Contact...")
        page.goto("http://localhost:3000/contact")
        page.wait_for_selector("text=Contactez-nous")
        page.wait_for_timeout(1000)
        page.screenshot(path="verification/5_contact.png")

        browser.close()
        print("Verification complete.")

if __name__ == "__main__":
    verify_site()
