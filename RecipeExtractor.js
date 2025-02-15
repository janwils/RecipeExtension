// Accesses .env file for the API key
import 'dotenv/config'
// Open AI library to access chatgpt
import OpenAI from 'openai';
// Puppeteer library to scrape the website
import puppeteer from 'puppeteer';

// Function that scrapes a website
const scrapeWebsite = async (url) => {
    try {
        // Opens the puppeteer 
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        // Go to url
        await page.goto(url);

        // Select the body of the page and extract the text
        await page.waitForSelector('body'); 

        const pageContent = await page.evaluate(() => {
            return document.body.innerText;  
        });

        // Close the puppeteer browser
        await browser.close();
        
        return pageContent;
    } catch (error) {
        console.error("Error scraping the website:", error);
        return null;
    }
}

export const recipeExtractor = async (websiteURL) => {
    // Scrapes the website
    const websiteData = await scrapeWebsite(websiteURL)
    
    // Creates a new OpenAI client
    const client = new OpenAI({
        apiKey: process.env["OPEN_AI_KEY"],
    });

    // Calls chatgpt with the prompt and website data
    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: 'user', content: 'Give me the listed recipe in the text below. Do not give anything else such as notes or additional tips or any other sentence. Here is the text:' + websiteData }],
        response_format: {
          "type": "text"
        },
      });

      // Returns chatgpt's response
      return response.choices[0].message.content
}

