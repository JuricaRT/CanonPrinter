import time
from django.test import SimpleTestCase
from selenium import webdriver
from selenium.webdriver.common.by import By

class TestLogin(SimpleTestCase):
    APP_URL = "http://localhost:3000"
    TEST_USER_EMAIL = "runtas.j@gmail.com"
    TEST_USER_PASSWORD = "admin"
    IMPLICIT_WAIT_SECONDS = 10
    PATIENCE = 6

    
    def setUp(self):
        self.selenium_driver = webdriver.Chrome()
        self.selenium_driver.implicitly_wait(self.IMPLICIT_WAIT_SECONDS)
    

    def tearDown(self):
        self.selenium_driver.quit()
    

    def test_successful_login(self):
        self.selenium_driver.get(self.APP_URL)

        self.selenium_driver.find_element(By.CSS_SELECTOR, "a[href='/login']").click()

        email_text_box = self.selenium_driver.find_element(By.NAME, "email")
        password_text_box = self.selenium_driver.find_element(By.NAME, "password")

        email_text_box.send_keys(self.TEST_USER_EMAIL)
        password_text_box.send_keys(self.TEST_USER_PASSWORD)

        self.selenium_driver.find_element("xpath", "//button[text()='Log in']").click()

        time.sleep(self.PATIENCE)

        self.assertEqual(self.selenium_driver.current_url.__contains__("mainScreen"), True)
    

    def test_unsuccessful_login(self):
        self.selenium_driver.get(self.APP_URL)

        self.selenium_driver.find_element(By.CSS_SELECTOR, "a[href='/login']").click()

        email_text_box = self.selenium_driver.find_element(By.NAME, "email")
        password_text_box = self.selenium_driver.find_element(By.NAME, "password")
        
        email_text_box.send_keys(self.TEST_USER_EMAIL)
        password_text_box.send_keys("thisiswrongpassworddontsetthispassworditiswrong")

        self.selenium_driver.find_element("xpath", "//button[text()='Log in']").click()

        time.sleep(self.PATIENCE)

        self.assertEqual(self.selenium_driver.switch_to.alert.text, "Invalid email or password")

