"use server";
import { logger } from "../logger"
import axios, { AxiosRequestConfig } from 'axios';
import * as cheerio from 'cheerio';
import { extractCurrency, extractDescription, extractPrice } from '../utils';

function BrightDataProxy() {
    // BrightData proxy configuration
    const username: string = String(process.env.BRIGHT_DATA_USERNAME);
    const password: string = String(process.env.BRIGHT_DATA_PASSWORD);
    const port: number = 22225;
    const session_id: number = (1000000 * Math.random()) | 0;

    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password: password,
        },
        host: 'brd.superproxy.io',
        port: port,
        rejectUnauthorized: false,
    }
    return options
}

export async function scrapeAmazonProduct(url: string) {
    if (!url) return;
    const parsedURL: URL = new URL(url);
    const hostname: string = parsedURL.hostname;
    if (
        !(hostname.includes('amazon.com') ||
            hostname.includes('amazon.') ||
            hostname.endsWith('amazon'))
    ) {
        return;
    }
    try {
        // Fetch the product page
        const response = await axios.get(url, BrightDataProxy());
        const $ = cheerio.load(response.data);

        // Extract the product title
        const title = $('#productTitle').text().trim();
        const currentPrice = extractPrice(
            $('.priceToPay span.a-price-whole'),
            $('.a.size.base.a-color-price'),
            $('.a-button-selected .a-color-base'),
        );

        const originalPrice = extractPrice(
            $('#priceblock_ourprice'),
            $('.a-price.a-text-price span.a-offscreen'),
            $('#listPrice'),
            $('#priceblock_dealprice'),
            $('.a-size-base.a-color-price')
        );

        const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';

        const images =
            $('#imgBlkFront').attr('data-a-dynamic-image') ||
            $('#landingImage').attr('data-a-dynamic-image') ||
            '{}'

        const imageUrls = Object.keys(JSON.parse(images));

        const currency = extractCurrency($('.a-price-symbol'))
        const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, "");

        const description = extractDescription($)

        // Construct data object with scraped information
        const data = {
            url,
            currency: currency || '$',
            image: imageUrls[0],
            title,
            currentPrice: Number(currentPrice) || Number(originalPrice),
            originalPrice: Number(originalPrice) || Number(currentPrice),
            priceHistory: [],
            discountRate: Number(discountRate),
            category: 'category',
            reviewsCount: 100,
            stars: 4.5,
            isOutOfStock: outOfStock,
            description,
            lowestPrice: Number(currentPrice) || Number(originalPrice),
            highestPrice: Number(originalPrice) || Number(currentPrice),
            averagePrice: Number(currentPrice) || Number(originalPrice),
        }

        return data;
    } catch (error: any) {
        throw new Error(`Failed to scrape the product: ${error.message}`);
    }
}

export async function scrapePWCourse(url: string) {
    if (!url) return;
    try {
        const response = await axios.get(url);
        //const response = await axios.get(url, options);
        const $ = cheerio.load(response.data);
        console.log($(".price-text").text())
    } catch (error: any) {
        throw new Error(`Failed to scrape product: ${error.message}`)
    }
}

export async function scrapeVedantu(url: string) {
    if (!url) return;
    try {
        const response = await axios.get(url);
        //const response = await axios.get(url, options);
        const $ = cheerio.load(response.data);
        console.log("Data")
        console.log($(".mr-4.wt-600.individualPlanCards_interFont__oBwj5.txt-14").text())
    } catch (error: any) {
        throw new Error(`Failed to scrape product: ${error.message}`)
    }
}

export async function scrapeByju(url: string) {
    if (!url) return;
    try {
        const response = await axios.get(url);
        //const response = await axios.get(url, options);
        const $ = cheerio.load(response.data);
        console.log("Data")
        console.log($(".price-item.price-item--regular").text())
    } catch (error: any) {
        throw new Error(`Failed to scrape product: ${error.message}`)
    }
}

export async function scrapeAdda247(url: string) {
    if (!url) return;
    try {
        const response = await axios.get(url);
        //const response = await axios.get(url, options);
        const $ = cheerio.load(response.data);
        console.log("Data")
        console.log($(".pdpOrignalPrice").text())
    } catch (error: any) {
        throw new Error(`Failed to scrape product: ${error.message}`)
    }
}

export async function scrape(url: string) {
    if (!url) return;
    try {
        const res = await axios.get(url)
        //const res = await axios.get(url, BrightDataProxy());
        //console.log(res.data)
        const $ = cheerio.load(res.data);
        console.log("Data")
        console.log($(".price-text--price-part--2npPm"))
    } catch (error: any) {
        logger.error(error);
        throw new Error(`Failed to scrape product: ${error.message}`);
    }
}