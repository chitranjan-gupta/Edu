"use client";
import React from 'react'
import { scrapeAndStoreProduct } from '@/lib/actions';
import { scrape } from '@/lib/scraper';
import { FormEvent, useState } from 'react'

function Searchbar() {
    const [searchPrompt, setSearchPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        //await scrape("https://www.adda247.com/product-onlineliveclasses/3937/bank-maha-pack-ibps-sbi-rrb?examCategory=rbi-assistant&productId=4204")
        event.preventDefault();
        try {
            setIsLoading(true);
            scrape(searchPrompt)
            // Scrape the product page
            //const product = await scrapeAndStoreProduct(searchPrompt);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <form
            className="flex flex-wrap gap-4 mt-12"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                value={searchPrompt}
                onChange={(e) => setSearchPrompt(e.target.value)}
                placeholder="Enter product link"
                className="searchbar-input"
            />

            <button
                type="submit"
                className="searchbar-btn"
                disabled={searchPrompt === ''}
            >
                {isLoading ? 'Searching...' : 'Search'}
            </button>
        </form>
    )
}

export default Searchbar