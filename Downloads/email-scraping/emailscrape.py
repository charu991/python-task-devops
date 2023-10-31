import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import re
import time

# Initialize the WebDriver
driver = webdriver.Edge()

# Function to scrape links from the search page
def scrape_links(url, links):
    driver.get(url)
    data = driver.find_elements(By.XPATH, '//*[@id="serp-listing-wrapper"]/div/div/a')
  #  WebDriverWait(driver, 10).until(data)
    for link in data:
        href = link.get_attribute('href')
        links.append(href)
    return links

# Lists to store scraped data
links = []
address = []
place = []
landline = []
Email = []

# Define cities and professions
cities = ["new york","Houston","Brooklyn","San Diego","Atlanta","Austin","Jacksonville","San Jose","Houston","Las Vegas","Phoenix","San Francisco","Denver","Orlando","Chicago","San Antonio","Montgomery","Tampa","Tucson","Indianapolis","Los Angeles","Dallas","Philadelphia","Seattle","Charlotte","Louisville"]
professions = ["General Practice Medicine"]

# Iterate through cities and professions
for city in cities:
    for profession in professions:
        try:
            time.sleep(2)
            url = f"https://www.opendi.us/search?what={profession}&where={city}&searchtype=industry&submit=Search"
            driver.get(url)
            link_return = scrape_links(url, links)
            #print(link_return)
            next_button=driver.find_elements(By.XPATH,'//*[@id="pagination-list"]/li/a')
        except Exception as e:
            print("Error:", e)
            continue
        
email_pattern = r'mailto:(\S+)'

# Iterate through the links to extract details
for link in links:
    try:
        driver.get(link)
        time.sleep(2)

        # Extract Address
        try:
            address_element = driver.find_element(By.XPATH, '/html/body/div/div/div[1]/section[2]/div[1]/dl[1]/dd[1]/span')
            address.append(address_element.text)
            print(f"Address: {address_element.text}")
        except:
            address.append(None)

        # Extract Place
        try:
            place_elements = driver.find_elements(By.XPATH, '/html/body/div/div/div[1]/section[2]/div[1]/dl[1]/dd[2]')
            place_text = [element.text.split('\n')[0] for element in place_elements] 
            place.append(place_text)
            print(f"Place: {place_text}")
        except:
            place.append(None)

        # Extract Landline
        try:
            landline_elements = driver.find_elements(By.XPATH, '/html/body/div/div/div[1]/section[2]/div[1]/dl[2]/dd[1]')
            landline_text = [element.text for element in landline_elements]
            landline.append(landline_text)
            print(f"Landline: {landline_text}")
        except:
            landline.append(None)

        # Extract Email
        try:
            email_elements = driver.find_elements(By.XPATH, '/html/body/div/div/div[1]/section[2]/div[1]/dl[2]/dd[2]/a')
            email_href = [element.get_attribute('href') for element in email_elements]
            # Filter out URLs and keep only valid email addresses
            valid_emails = [re.match(email_pattern, email).group(1) for email in email_href if re.match(email_pattern, email)]
            Email.append(valid_emails)
            print(f"Email: {email_href}")
        except:
            Email.append(None)

    except Exception as e:
        print("Error:", e)
        continue

# Create a DataFrame and remove rows with null values
data_dict = {"Address": address, "Place": place, "Landline": landline, "Email": Email, "links": links}
df = pd.DataFrame(data_dict)
df = df.dropna()

# Save the DataFrame to a CSV file
df.to_csv('General_Practice_Medicine_all_over_USA.csv', index=False)

# Quit the WebDriver
driver.quit()
