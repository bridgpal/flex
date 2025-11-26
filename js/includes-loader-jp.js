/**
 * Includes Loader for Japanese (JP) page
 * This script loads HTML fragments from the 00_include directory
 */

(function() {
  'use strict';

  // List of include files to load for Japanese
  const includeFiles = [
    'installshield_jp.html',
    'installshieldexpress_jp.html',
    'flexera_jp.html',
    'fnms_jp.html'
  ];

  // Load placeholder listing
  function loadPlaceholder() {
    return fetch('/00_include/z-placeholder-listing.html')
      .then(response => response.text())
      .then(html => {
        const container = document.getElementById('placeholder-listing-container');
        if (container) {
          container.innerHTML = html;
        }
      })
      .catch(error => {
        console.error('Error loading placeholder:', error);
      });
  }

  // Load all include files
  function loadIncludes() {
    const includesContainer = document.getElementById('includes-container');
    if (!includesContainer) {
      console.error('Includes container not found');
      return;
    }

    // Load all includes in parallel
    const loadPromises = includeFiles.map(file => {
      return fetch(`/00_include/${file}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to load ${file}: ${response.status}`);
          }
          return response.text();
        })
        .catch(error => {
          console.error(`Error loading ${file}:`, error);
          return ''; // Return empty string on error
        });
    });

    // Wait for all includes to load
    Promise.all(loadPromises)
      .then(htmlContents => {
        // Combine all HTML content
        const combinedHtml = htmlContents.join('\n');
        includesContainer.innerHTML = combinedHtml;
        
        // Dispatch custom event to notify that includes are loaded
        const event = new CustomEvent('includesLoaded');
        document.dispatchEvent(event);
      })
      .catch(error => {
        console.error('Error loading includes:', error);
      });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      loadPlaceholder();
      loadIncludes();
    });
  } else {
    loadPlaceholder();
    loadIncludes();
  }
})();
