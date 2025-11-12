/**
 * URL Sharing Utility
 * Handles code sharing via URL parameters
 */

import { ValidationError } from '../classes/CustomErrors.js';

export class URLSharingManager {
    constructor() {
        this.baseURL = window.location.origin + window.location.pathname;
    }

    /**
     * Create a shareable URL from code
     * Uses URL parameters with base64 encoding
     */
    createShareURL(html, css, js, snippetId = null) {
        const url = new URL(this.baseURL);

        if (snippetId) {
            // If snippet is saved to cloud, just share the ID
            url.searchParams.set('snippet', snippetId);
        } else {
            // Encode code directly in URL
            try {
                const codeData = {
                    html: html || '',
                    css: css || '',
                    js: js || ''
                };

                const encoded = this.encodeCode(codeData);
                url.searchParams.set('code', encoded);
            } catch (error) {
                throw new ValidationError('Code is too large to share via URL', 'code', { html, css, js });
            }
        }

        return url.toString();
    }

    /**
     * Load code from URL parameters
     */
    loadFromURL() {
        const urlParams = new URLSearchParams(window.location.search);

        // Check for snippet ID
        const snippetId = urlParams.get('snippet');
        if (snippetId) {
            return { type: 'snippet', snippetId };
        }

        // Check for encoded code
        const encodedCode = urlParams.get('code');
        if (encodedCode) {
            try {
                const decoded = this.decodeCode(encodedCode);
                return { type: 'code', ...decoded };
            } catch (error) {
                console.error('Failed to decode URL code:', error);
                return null;
            }
        }

        return null;
    }

    /**
     * Encode code to base64 URL-safe string
     */
    encodeCode(codeData) {
        const json = JSON.stringify(codeData);

        // Compress using LZW algorithm (simple implementation)
        const compressed = this.compress(json);

        // Base64 encode
        const base64 = btoa(compressed);

        // Make URL-safe
        return base64
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    /**
     * Decode base64 string to code
     */
    decodeCode(encoded) {
        try {
            // Restore base64 format
            let base64 = encoded
                .replace(/-/g, '+')
                .replace(/_/g, '/');

            // Add padding
            while (base64.length % 4) {
                base64 += '=';
            }

            // Decode base64
            const compressed = atob(base64);

            // Decompress
            const json = this.decompress(compressed);

            return JSON.parse(json);
        } catch (error) {
            throw new Error('Invalid encoded code: ' + error.message);
        }
    }

    /**
     * Simple LZW compression
     */
    compress(str) {
        const dict = new Map();
        let data = str.split('');
        let out = [];
        let currChar;
        let phrase = data[0];
        let code = 256;

        for (let i = 1; i < data.length; i++) {
            currChar = data[i];
            if (dict.has(phrase + currChar)) {
                phrase += currChar;
            } else {
                out.push(phrase.length > 1 ? dict.get(phrase) : phrase.charCodeAt(0));
                dict.set(phrase + currChar, code);
                code++;
                phrase = currChar;
            }
        }
        out.push(phrase.length > 1 ? dict.get(phrase) : phrase.charCodeAt(0));

        return String.fromCharCode(...out);
    }

    /**
     * Simple LZW decompression
     */
    decompress(str) {
        const dict = new Map();
        let data = str.split('').map(char => char.charCodeAt(0));
        let currChar = String.fromCharCode(data[0]);
        let oldPhrase = currChar;
        let out = [currChar];
        let code = 256;
        let phrase;

        for (let i = 1; i < data.length; i++) {
            let currCode = data[i];
            if (currCode < 256) {
                phrase = String.fromCharCode(currCode);
            } else {
                phrase = dict.get(currCode) || (oldPhrase + currChar);
            }
            out.push(phrase);
            currChar = phrase.charAt(0);
            dict.set(code, oldPhrase + currChar);
            code++;
            oldPhrase = phrase;
        }

        return out.join('');
    }

    /**
     * Clear URL parameters without page reload
     */
    clearURLParams() {
        const url = new URL(window.location);
        url.searchParams.delete('code');
        url.searchParams.delete('snippet');
        window.history.replaceState({}, '', url.toString());
    }

    /**
     * Copy URL to clipboard
     */
    async copyToClipboard(url) {
        try {
            await navigator.clipboard.writeText(url);
            return true;
        } catch (error) {
            // Fallback method
            return this.copyToClipboardFallback(url);
        }
    }

    copyToClipboardFallback(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();

        let success = false;
        try {
            success = document.execCommand('copy');
        } catch (error) {
            console.error('Fallback copy failed:', error);
        }

        document.body.removeChild(textarea);
        return success;
    }

    /**
     * Shorten URL using a URL shortening service
     * This is a placeholder - implement with your preferred service
     */
    async shortenURL(longURL) {
        // Example integration with a URL shortening API
        // Replace with actual service (bit.ly, tinyurl, etc.)

        try {
            // This is a placeholder - implement your actual API call
            console.log('URL shortening not implemented. Long URL:', longURL);
            return longURL;

            // Example implementation:
            /*
            const response = await fetch('https://api.shortening-service.com/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'YOUR_API_KEY'
                },
                body: JSON.stringify({ url: longURL })
            });

            const data = await response.json();
            return data.shortURL;
            */
        } catch (error) {
            console.error('Failed to shorten URL:', error);
            return longURL;
        }
    }

    /**
     * Get URL size in bytes
     */
    getURLSize(url) {
        return new Blob([url]).size;
    }

    /**
     * Check if URL is too long (>2000 chars is risky)
     */
    isURLTooLong(url) {
        return url.length > 2000;
    }

    /**
     * Generate a unique ID for snippets
     */
    generateSnippetId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}

export const urlSharing = new URLSharingManager();

export default urlSharing;
