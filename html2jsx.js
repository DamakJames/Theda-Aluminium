const fs = require('fs');

const inputFile = process.argv[2];
const outputFile = process.argv[3];
const componentName = process.argv[4] || 'Page';

let html = fs.readFileSync(inputFile, 'utf8');

// Extract main block
const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
if (!mainMatch) {
    console.error("No main tag found");
    process.exit(1);
}

let mainContent = `<main>\n${mainMatch[1]}\n</main>`;

// Basic HTML to JSX conversions
mainContent = mainContent.replace(/class=/g, 'className=');
mainContent = mainContent.replace(/for=/g, 'htmlFor=');
mainContent = mainContent.replace(/<!--[\s\S]*?-->/g, ''); // Remove comments

// Fix self closing tags (img, input, hr, br, etc if not already closed)
mainContent = mainContent.replace(/<img([^>]*?)(?<!\/)>/g, '<img$1 />');
mainContent = mainContent.replace(/<input([^>]*?)(?<!\/)>/g, '<input$1 />');
mainContent = mainContent.replace(/<hr([^>]*?)(?<!\/)>/g, '<hr$1 />');
mainContent = mainContent.replace(/<br([^>]*?)(?<!\/)>/g, '<br$1 />');

// Fix style attributes (basic regex for style="foo: bar; baz: qux")
mainContent = mainContent.replace(/style="([^"]*)"/g, (match, styleString) => {
    const rules = styleString.split(';').filter(r => r.trim().length > 0);
    const styleObj = {};
    rules.forEach(rule => {
        const parts = rule.split(':');
        if (parts.length === 2) {
            let key = parts[0].trim();
            // camelCase key
            key = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            let value = parts[1].trim();
            styleObj[key] = value;
        }
    });
    return `style={${JSON.stringify(styleObj)}}`;
});

// Since Next.js uses next/link and next/image ideally, we'll keep standard tags for now
// and just output a functional component.

const jsxFile = `"use client";

import React from 'react';
import Link from 'next/link';

export default function ${componentName}() {
  return (
    <>
      ${mainContent}
    </>
  );
}
`;

fs.writeFileSync(outputFile, jsxFile);
console.log(`Converted ${inputFile} to ${outputFile}`);
