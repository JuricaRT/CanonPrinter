import time
from django.test import SimpleTestCase
from selenium import webdriver
from selenium.webdriver.common.by import By

class TestLogin(SimpleTestCase):
    APP_URL = "http://localhost:3000"
    TEST_USER_EMAIL = "runtas.j@gmail.com"
    TEST_USER_PASSWORD = "admin"
    TEST_LANG_NAME = "Engleski"
    TEST_DICT_NAME = "Engleski rjecnik"
    TEST_WORD_NAME = "notebooktest0871325"
    TEST_WORD_TRANSLATION = "biljeznica"
    TEST_WORD_DEFINITION = "ono u sto se pise"
    TEST_WORD_TYPE = "imenica"
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
    

    def test_add_word_to_dictionary(self):
        self.login(self.TEST_USER_EMAIL, self.TEST_USER_PASSWORD)
        
        self.selenium_driver.find_element(By.CSS_SELECTOR, "a[href='/modifyDictionaries']").click()

        self.selenium_driver.find_element("xpath", "//button[text()='Add word']").click()
        self.selenium_driver.find_element("xpath", f"//button[text()='{self.TEST_LANG_NAME}']").click()
        self.selenium_driver.find_element("xpath", f"//button[text()='{self.TEST_DICT_NAME}']").click()

        self.selenium_driver.find_element(By.NAME, "word").send_keys(self.TEST_WORD_NAME)
        self.selenium_driver.find_element(By.NAME, "translation").send_keys(self.TEST_WORD_TRANSLATION)
        self.selenium_driver.find_element(By.NAME, "definition").send_keys(self.TEST_WORD_DEFINITION)
        
        self.selenium_driver.find_element("xpath", f"//button[text()='{self.TEST_WORD_TYPE}']").click()
        self.selenium_driver.find_element("xpath", "//button[text()='Add']").click()
        self.selenium_driver.find_element("xpath", "//button[text()='Submit']").click()

        self.selenium_driver.find_element(By.CSS_SELECTOR, "a[href='/mainScreen']").click()
        
        #
        time.sleep(2)

        self.selenium_driver.find_element("xpath", "//button[text()='View dictionary']").click()

        #
        time.sleep(2)
        
        self.selenium_driver.find_element("xpath", f"//button[text()='{self.TEST_LANG_NAME}']").click()
        
        #
        time.sleep(2)
        
        self.selenium_driver.find_element("xpath", f"//button[text()='{self.TEST_DICT_NAME}']").click()

        elem = self.selenium_driver.find_element("xpath", f"//button[text()='{self.TEST_WORD_NAME}']")

        self.assertEquals(elem.text, self.TEST_WORD_NAME)

        time.sleep(self.PATIENCE)


        # remove test word
        elem.click()
        
        self.selenium_driver.find_element("xpath", "//button[text()='Delete']").click()
        self.selenium_driver.find_element("xpath", "//button[text()='Submit']").click()

        #
        time.sleep(2)

        