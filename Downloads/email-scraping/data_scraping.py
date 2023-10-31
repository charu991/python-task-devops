import pandas as pd
from selenium import webdriver
from bs4 import BeautifulSoup
import requests
import time

links=[]
address=[]
place = []
landline=[]
Email= []
website=[]
all_url=[]
driver=webdriver.Chrome("/home/atul/Desktop/webscraping/chromedriver") #path of the Chromedriver
cities=[]


city="new+york"
cities=city.split("\n")

# professions="Restaurants+New+York,General+Practice+Medicine+New+York,Jewelry+Retailers+New+York,Marketing+Agencies+New+York,Doctors+&+Clinics+New+York,Investment+Services+New+York,Real+Estate+Agents+New+York,Salons+New+York,Company+directory+New+York".split(",")
professions="Restaurants+New+York".split(",")

for city in cities:
    for profession in professions:
        try:
            time.sleep(2)
            url="https://www.opendi.us/search?what="+str(profession)+"&where="+str(city)+"&searchtype=industry&submit=Search"
            driver.get(url)
            link_return = scraper(url,links)
            print(link_return)
            next_button=driver.find_elements_by_xpath('//*[@id="pagination-list"]/li/a')
        except:
            continue


for link in links:
    try:
        driver.get(link)
        time.sleep(2)
        try:
            address.append(driver.find_element_by_xpath('/html/body/div/div/div[1]/section[2]/div[1]/dl[1]/dd[1]/span').text)
        except:
            address.append(None)
        try:
            place.append(driver.find_element_by_xpath('/html/body/div/div/div[1]/section[2]/div[1]/dl[1]/dd[2]/div/span[1]').text)
        except:
            place.append(None)
        try:
            landline.append(driver.find_element_by_xpath('/html/body/div/div/div[1]/section[2]/div[1]/dl[2]/dd[1]/span').text)
        except:
            landline.append(None)
        try:
            Email.append(driver.find_element_by_xpath('/html/body/div/div/div[1]/section[2]/div[1]/dl[2]/dd[2]/a').text)
        except:   
            Email.append(None)
        try:   
            website.append(driver.find_element_by_xpath('/html/body/div/div/div[1]/section[2]/div[1]/dl[2]/dd[3]/a').text)
        except:  
            website.append(None)
    except:
        continue

print(address)
print(place)
print(landline)
print(Email)
print(website)
print(len(links))


df=pd.DataFrame({"Address":address,"Place":place,"Landline":landline,"Email":Email,"Website":website,"Links":links})
df.to_csv('all_New_York.csv')


def scraper(url,links):
    driver.get(url)
    data=driver.find_elements_by_xpath('//*[@id="serp-listing-wrapper"]/div/div/a')
    for link in data:
        href = link.get_attribute('href')
        links.append(href)
    return links