import time
from django.test import SimpleTestCase
from selenium import webdriver
from selenium.webdriver.common.by import By

class TestEditPassword(SimpleTestCase):
    APP_URL = "http://localhost:3000"
    TEST_USER_EMAIL = "runtas.j@gmail.com"
    TEST_USER_PASSWORD = "admin"
    TEST_USER_NEW_PASSWORD = "novipassword123"
    IMPLICIT_WAIT_SECONDS = 10
    PATIENCE = 6

    def setUp(self):
        self.selenium_driver = webdriver.Chrome()
        self.selenium_driver.implicitly_wait(self.IMPLICIT_WAIT_SECONDS)


    def tearDown(self):
        self.selenium_driver.quit()


    def login(self, user_email, user_password):
        self.selenium_driver.get(self.APP_URL)

        self.selenium_driver.find_element(By.CSS_SELECTOR, "a[href='/login']").click()

        email_text_box = self.selenium_driver.find_element(By.NAME, "email")
        password_text_box = self.selenium_driver.find_element(By.NAME, "password")

        email_text_box.send_keys(user_email)
        password_text_box.send_keys(user_password)

        self.selenium_driver.find_element("xpath", "//button[text()='Log in']").click()

        time.sleep(self.PATIENCE)


    def test_edit_password_successful(self):
        self.login(self.TEST_USER_EMAIL, self.TEST_USER_PASSWORD)

        self.selenium_driver.find_element(By.CSS_SELECTOR, "a[href='/profileSettings']").click()

        password_text_box = self.selenium_driver.find_element(By.NAME, "password")
        confirm_password_text_box = self.selenium_driver.find_element(By.NAME, "c_password")

        password_text_box.send_keys(self.TEST_USER_NEW_PASSWORD)
        confirm_password_text_box.send_keys(self.TEST_USER_NEW_PASSWORD)

        self.selenium_driver.find_element("xpath", "//button[text()='Save Changes']").click()

        time.sleep(self.PATIENCE)

        self.selenium_driver.find_element("xpath", "//button[text()='Logout']").click()

        #
        time.sleep(1)

        self.login(self.TEST_USER_EMAIL, self.TEST_USER_NEW_PASSWORD)

        time.sleep(self.PATIENCE)

        self.assertEqual(self.selenium_driver.current_url.__contains__("mainScreen"), True)

        
        # restore password
        time.sleep(self.PATIENCE)

        self.login(self.TEST_USER_EMAIL, self.TEST_USER_NEW_PASSWORD)

        self.selenium_driver.find_element(By.CSS_SELECTOR, "a[href='/profileSettings']").click()
        
        self.selenium_driver.find_element(By.NAME, "password").send_keys(self.TEST_USER_PASSWORD)
        self.selenium_driver.find_element(By.NAME, "c_password").send_keys(self.TEST_USER_PASSWORD)
        
        self.selenium_driver.find_element("xpath", "//button[text()='Save Changes']").click()
        
        time.sleep(self.PATIENCE)

    
    def test_edit_password_unsuccessful(self):
        self.login(self.TEST_USER_EMAIL, self.TEST_USER_PASSWORD)
        
        self.selenium_driver.find_element(By.CSS_SELECTOR, "a[href='/profileSettings']").click()

        password_text_box = self.selenium_driver.find_element(By.NAME, "password")
        confirm_password_text_box = self.selenium_driver.find_element(By.NAME, "c_password")

        password_text_box.send_keys(self.TEST_USER_NEW_PASSWORD)
        confirm_password_text_box.send_keys("ovonijeistipasswordkojiovajprijepanemapromjenapassworda")

        self.selenium_driver.find_element("xpath", "//button[text()='Save Changes']").click()

        time.sleep(self.PATIENCE)

        self.assertEqual(self.selenium_driver.switch_to.alert.text, "Passwords do not match")