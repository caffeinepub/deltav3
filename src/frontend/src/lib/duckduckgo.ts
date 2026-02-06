export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

/**
 * Search DuckDuckGo using their Instant Answer API.
 * Note: Due to CORS restrictions, this may not work in all browsers.
 * If it fails, the UI will provide a fallback to open DuckDuckGo directly.
 */
export async function searchDuckDuckGo(query: string): Promise<SearchResult[]> {
  if (!query.trim()) {
    return [];
  }

  try {
    // Try the Instant Answer API first
    const instantAnswerUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;
    
    const response = await fetch(instantAnswerUrl);
    
    if (!response.ok) {
      throw new Error('DuckDuckGo API request failed. Please try opening the search in a new tab.');
    }

    const data = await response.json();
    const results: SearchResult[] = [];

    // Extract Abstract if available
    if (data.Abstract && data.AbstractURL) {
      results.push({
        title: data.Heading || 'DuckDuckGo Instant Answer',
        url: data.AbstractURL,
        snippet: data.Abstract,
      });
    }

    // Extract Related Topics
    if (data.RelatedTopics && Array.isArray(data.RelatedTopics)) {
      for (const topic of data.RelatedTopics) {
        if (topic.Text && topic.FirstURL) {
          results.push({
            title: topic.Text.split(' - ')[0] || topic.Text,
            url: topic.FirstURL,
            snippet: topic.Text,
          });
        }
      }
    }

    // If no results, throw error to trigger fallback
    if (results.length === 0) {
      throw new Error(
        'No instant answers found. Click the button below to search on DuckDuckGo directly.'
      );
    }

    return results.slice(0, 10); // Limit to 10 results
  } catch (error) {
    // If CORS or any other error occurs, throw with helpful message
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(
        'Unable to fetch results due to browser restrictions. Click below to search on DuckDuckGo.'
      );
    }
    throw error;
  }
}
