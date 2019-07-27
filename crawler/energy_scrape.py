from selenium import webdriver
import json
from selenium.webdriver.common.keys import Keys

def energy_scrape(appliance):
    elm = browser.find_elements_by_xpath(funky[appliance])
    browser.implicitly_wait(1)
    print(elm.get_attribute('href'))
    return


xPaths = {}
xPaths['fridge'] = '//*[@id="displayApplianceDiv"]/div[2]/div/div[1]/ul/li[1]/a'
xPaths['tv'] = '//*[@id="displayApplianceDiv"]/div[2]/div/div[1]/ul/li[2]/a'
xPaths['washer'] = '//*[@id="displayApplianceDiv"]/div[2]/div/div[1]/ul/li[3]/a'
xPaths['dishwasher'] = '//*[@id="displayApplianceDiv"]/div[2]/div/div[1]/ul/li[4]/a'
xPaths['airconditioner'] = '//*[@id="displayApplianceDiv"]/div[2]/div/div[1]/ul/li[5]/a[2]'
xPaths['dryer'] = '//*[@id="displayApplianceDiv"]/div[2]/div/div[1]/ul/li[6]/a'

browser = webdriver.Firefox()
browser.get('http://www.energyrating.gov.au/calculator?fbclid=IwAR3CSyVA_JHsG4wIUsvnilsBJici-SWw-uGmcyzTmYtwHMbgFC_i711KjjI')
energy_scrape('fridge')
