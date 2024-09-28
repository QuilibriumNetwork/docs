import React from 'react';

// Highlights text in pink in Markdown
export default function HighlightPink({children, color}) {
    return (
        <span className="text-pink-400">
          {children}
        </span>
    );
}

