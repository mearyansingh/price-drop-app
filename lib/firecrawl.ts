import FirecrawlApp from "@mendable/firecrawl-js";

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

interface ScrapedProduct {
  productName: string;
  currentPrice: number;
  currencyCode?: string;
  productImageUrl?: string;
}

export async function scrapeProduct(url: string) {
  try {
    // Scrape a website:
    const result = await firecrawl.scrape(url, {
      formats: [{
        type: "json",
        prompt: "Extract the product name as 'productName', current price as a number as 'currentPrice', currency code (USD, EUR, etc) as 'currencyCode', and product image URL as 'productImageUrl' if available",
        schema: {
          type: "object",
          required: ["productName", "currentPrice"],
          properties: {
            productName: { type: "string" },
            currentPrice: { type: "number" },
            currencyCode: { type: "string" },
            productImageUrl: { type: "string" }
          },
        },
      }]
    });

    // Firecrawl returns data in result.extract
    const extractedData = result.json as ScrapedProduct;

    if (!extractedData || !extractedData.productName) {
      throw new Error("No data extracted from URL");
    }

    return extractedData;
  } catch (error) {
    console.error("Firecrawl scrape error:", error);
    throw new Error(`Failed to scrape product: ${error instanceof Error ? error.message : String(error)}`);
  }
}
