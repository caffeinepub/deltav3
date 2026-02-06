import { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Search, Loader2, ExternalLink, AlertCircle } from 'lucide-react';
import { searchDuckDuckGo, type SearchResult } from '../lib/duckduckgo';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const searchResults = await searchDuckDuckGo(query);
      setResults(searchResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const openInDuckDuckGo = () => {
    const searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
    window.open(searchUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Search the Web</h2>
        <p className="text-muted-foreground">Powered by DuckDuckGo</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter your search query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 text-base"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading || !query.trim()} className="gap-2">
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search className="h-4 w-4" />
              Search
            </>
          )}
        </Button>
      </form>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            {query && (
              <Button variant="outline" size="sm" onClick={openInDuckDuckGo} className="ml-4 gap-2">
                Open in DuckDuckGo
                <ExternalLink className="h-3 w-3" />
              </Button>
            )}
          </AlertDescription>
        </Alert>
      )}

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {!isLoading && hasSearched && results.length === 0 && !error && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-center text-muted-foreground">
              No results found. Try a different search term.
            </p>
            <Button variant="outline" size="sm" onClick={openInDuckDuckGo} className="mt-4 gap-2">
              Search on DuckDuckGo
              <ExternalLink className="h-3 w-3" />
            </Button>
          </CardContent>
        </Card>
      )}

      {!isLoading && results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Found {results.length} results</p>
            <Button variant="outline" size="sm" onClick={openInDuckDuckGo} className="gap-2">
              View all on DuckDuckGo
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>

          {results.map((result, index) => (
            <div key={index}>
              <Card className="transition-all hover:border-primary/50 hover:shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      {result.title}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </CardTitle>
                  {result.url && (
                    <CardDescription className="break-all text-xs">{result.url}</CardDescription>
                  )}
                </CardHeader>
                {result.snippet && (
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">{result.snippet}</p>
                  </CardContent>
                )}
              </Card>
              {index < results.length - 1 && <Separator className="my-4" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
