import time
from django.test import SimpleTestCase
from selenium import webdriver
from selenium.webdriver.common.by import By

class TestStartLearning(SimpleTestCase):
    APP_URL = "http://localhost:3000"
    TEST_USER_EMAIL = "runtas.j@gmail.com"
    TEST_USER_PASSWORD = "admin"
    TEST_LANG_NAME = "Engleski"
    TEST_DICT_NAME = "Engleski rjecnik"
    TEST_MODE = "Upit engleske riječi uz odabir hrvatskog prijevoda"
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

    
    def test_start_learning_first_mode(self):
        self.login(self.TEST_USER_EMAIL, self.TEST_USER_PASSWORD)

        #
        time.sleep(1)

        self.selenium_driver.find_element("xpath", "//button[text()='Customize learning']").click()
        self.selenium_driver.find_element("xpath", f"//button[text()='{self.TEST_LANG_NAME}']").click()
        self.selenium_driver.find_element("xpath", f"//button[text()='{self.TEST_DICT_NAME}']").click()
        self.selenium_driver.find_element("xpath", f"//button[text()='{self.TEST_MODE}']").click()
        self.selenium_driver.find_element("xpath", "//button[text()='START']").click()

        button_exists= len(self.selenium_driver.find_elements("xpath", "//button[text()='FINISH']"))

        time.sleep(self.PATIENCE)

        self.assertEqual(self.selenium_driver.current_url.__contains__("mode12Screen"), True)
        self.assertEquals(button_exists, True)
