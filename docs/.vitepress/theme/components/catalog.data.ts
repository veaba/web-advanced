import fs from 'fs';
import path from 'path';
// import * as siteDataRef from 'vitepress/client/app/data';

// ignore path list
const IGNORE_PATH_LIST = ['public', '.vitepress', 'guide'];

// src dir
const SRC_DIR = 'docs';

export default {
  watch: './*.md',
  load(): CatalogItem[] {
    const srcDirAbsolute = path.join(process.cwd(), SRC_DIR); // absolute path
    return readDirList(srcDirAbsolute);
  },
};

// 定义结构
interface CatalogItem {
  title: string;
  path: string;
  children: CatalogItem[] | null;
  headers: APIHeader[];
}

/**
 * read dir list
 */
const readDirList = (srcDir: string) =>
  fs
    .readdirSync(srcDir)
    .filter((dir) => !IGNORE_PATH_LIST.includes(dir))
    .map((dir) => {
      const dirPath = path.join(srcDir, dir);
      if (!fs.statSync(dirPath).isDirectory()) return null;

      const children = fs.readdirSync(dirPath).flatMap((item) => scanItems(dir, dirPath, item));

      return {
        title: dir,
        path: `/${dir}`,
        children: children.length ? children : null,
        headers: [{ anchor: dirPath, text: dirPath }],
      };
    })
    .filter(Boolean) as CatalogItem[]; // Add type assertion here to fix the error

const scanItems = (parent: string, parentPath: string, item: string) => {
  const itemPath = path.join(parentPath, item);
  const stat = fs.statSync(itemPath);

  if (stat.isFile()) {
    return [createItem(parent, '', item, itemPath)];
    // return item === 'index.md' ? [] : [createItem(parent, '', item, itemPath)];
  }

  return fs.readdirSync(itemPath).flatMap((subItem) => {
    const subPath = path.join(itemPath, subItem);
    return fs.statSync(subPath).isFile()
      ? [createItem(parent, item, subItem, subPath)]
      : scanItems(parent, itemPath, subItem);
  });
};

const createItem = (parent: string, folder: string, file: string, path: string) => ({
  title: [folder, file.replace(/\.md$/, '')].filter(Boolean).join('/'),
  path: `/${[parent, folder, file.replace(/\.md$/, '')].filter(Boolean).join('/')}`,
  children: null,
  headers: parsePageHeaders(path),
});

// Interface defining the structure of a single header in the API
interface APIHeader {
  anchor: string;
  text: string;
}

// Cache for storing headers and their associated timestamps to avoid re-reading files
const headersCache = new Map<
  string,
  {
    headers: APIHeader[];
    timestamp: number;
  }
>();

// Utility function to parse headers from a markdown file at a given link
function parsePageHeaders(link: string): APIHeader[] {
  const fullPath = link; // Resolve the full file path
  const timestamp = fs.statSync(fullPath).mtimeMs; // Get the last modified timestamp of the file

  // Check if the file is cached and if its timestamp matches
  const cached = headersCache.get(fullPath);
  if (cached && timestamp === cached.timestamp) {
    return cached.headers; // Return cached headers if they're up-to-date
  }

  const mdText = fs.readFileSync(fullPath, 'utf-8'); // Read the markdown file
  const headers = extractHeadersFromMarkdown(mdText, fullPath); // Extract headers from the file content

  // Store the extracted headers along with the file's timestamp in the cache
  headersCache.set(fullPath, {
    timestamp,
    headers,
  });

  return headers;
}

// Helper function to extract all headers (h2) from markdown content
function extractHeadersFromMarkdown(mdText: string, fullPath: string): APIHeader[] {
  const h2s = mdText.match(/^## [^\n]+/gm); // Match all h2 headers (## header)
  const anchorRE = /\{#([^}]+)\}/; // Regular expression to match the anchor link in header (e.g. {#some-anchor})
  let headers: APIHeader[] = [];

  if (h2s) {
    // Process each h2 header and extract text and anchor
    headers = h2s.map((h) => {
      const text = cleanHeaderText(h, anchorRE); // Clean up header text
      const anchor = extractAnchor(h, anchorRE, text); // Extract or generate anchor
      return { text, anchor };
    });
  } else {
    const unixPath = path.normalize(fullPath);
    const unixPathReplace = unixPath.replace(/\\/g, '/');
    const mdFileName = unixPathReplace.replace(/^.*docs[\\/](.*)$/, '$1').replace(/\.md$/, '');

    const h1s = mdText.match(/^# [^\n]+/gm);
    const h1: string = h1s?.[0] || '';
    const text = cleanHeaderText(h1, anchorRE);
    const anchor = extractAnchor(h1, anchorRE, text);

    headers = [
      {
        text: anchor || mdFileName,
        anchor: anchor || mdText,
      },
    ];
  }

  return headers;
}

// Helper function to clean up header text (e.g., remove superscript, code formatting)
function cleanHeaderText(h: string, anchorRE: RegExp): string {
  return h
    .slice(2) // Remove the "##" part of the header
    .replace(/<sup class=.*/, '') // Remove superscript (e.g., <sup> tags)
    .replace(/\\</g, '<') // Decode escaped characters like \<
    .replace(/`([^`]+)`/g, '$1') // Remove inline code formatting (e.g., `code`)
    .replace(anchorRE, '') // Remove anchor tags (e.g., {#anchor})
    .trim(); // Trim leading/trailing whitespace
}

// Helper function to extract the anchor link from a header (or generate one if missing)
function extractAnchor(h: string, anchorRE: RegExp, text: string): string {
  const anchorMatch = h.match(anchorRE); // Match anchor if it exists
  return anchorMatch?.[1] ?? slugify(text); // If no anchor, generate one using slugify
}

// Utility function to generate a slug from a string (used for anchor links)
function slugify(text: string): string {
  return (
    text
      // Replace special characters and spaces with hyphens
      .replace(/[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g, '-')
      // Remove continuous separators
      .replace(/-{2,}/g, '-')
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, '')
      // Ensure it doesn't start with a number (e.g. #121)
      .replace(/^(\d)/, '_$1')
      // Convert to lowercase
      .toLowerCase()
  );
}
