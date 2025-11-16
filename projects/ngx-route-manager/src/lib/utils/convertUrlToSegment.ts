
// Type to extract static segments from a URL pattern
export type ExtractStaticSegments<T extends string> = T extends `${infer First}/${infer Rest}`
  ? First extends `:${string}`
    ? ExtractStaticSegments<Rest>
    : First | ExtractStaticSegments<Rest>
  : T extends `:${string}`
    ? never
    : T;

// Type to create an object type from union of strings
export type SegmentObject<T extends string> = {
  [K in T]: K;
};


/**
 * Extracts static segments from a URL pattern and returns them as a typed object
 * Types are automatically inferred from the URL pattern
 * @param url - The URL pattern to parse
 * @returns Object with extracted segments with automatic type inference
 */
export function urlToSegments<T extends string>(url: T): SegmentObject<ExtractStaticSegments<T>> {
  // Remove leading and trailing slashes
  const cleanUrl = url.replace(/^\/+|\/+$/g, '');
  
  // Split the URL into segments
  const segments = cleanUrl.split('/');
  
  // Initialize result object
  const result = {} as SegmentObject<ExtractStaticSegments<T>>;
  
  // Process each segment
  segments.forEach(segment => {
    // Skip dynamic segments (those starting with ':')
    if (segment.startsWith(':') || segment.trim().length == 0) {
      return;
    }

    if (!/^[a-zA-Z][a-zA-Z0-9-_]*$/.test(segment)) { throw new Error(`Segment '${segment}' must start with a letter and contain only letters, numbers, hyphens, or underscores in ${url}`) }
    
    // Add valid segments to result object
    (result as any)[segment] = segment;
  });
  
  return result;
}