# Plex Enhanced: Letterboxd Ratings and Links Integration

## Overview
The Plex Letterboxd Link and Rating script is a Tampermonkey userscript that enhances the experience of Plex users by integrating Letterboxd ratings and links into the Plex film's page. This script fetches ratings and additional metadata from Letterboxd and displays them on Plex, providing a richer and more informative browsing experience for movie enthusiasts.  It handles 99% of films correctly, so you might not encounter any problems.

## Features
- **Letterboxd Rating Integration**: Displays the Letterboxd rating for movies directly on the Plex interface.
- **Direct Link to Letterboxd**: Provides a clickable icon that links to the film's Letterboxd page for further exploration and reviews.
- **Dynamic Content Update**: Updates information when navigating between titles within Plex.
- **Director-based Search**: Handles cases where films might not be found by title and year, using director information for a more accurate match.
- **Edge Case Handling**: Accounts for various edge cases like alternative titles, director mismatches, and differing release years.

## Installation
1. Install Tampermonkey extension for your browser.
2. Click on this [download URL](https://update.greasyfork.org/scripts/483420/Plex%20Letterboxd%20links.user.js) to open the script.
3. Tampermonkey should open a new tab or window with an installation prompt. Click "Install" to add the script to your Tampermonkey dashboard.

## Usage
Once installed, the script runs automatically on Plex web pages (`https://app.plex.tv/*`). When you open a film's page on Plex, the script:
- Extracts the film's title, release year, and director's name from Plex.
- Constructs a query to search for the film on Letterboxd.
- Fetches the film's rating from Letterboxd and integrates it into the Plex page.
- Adds a Letterboxd icon that links to the film's Letterboxd page.

## Configuration
No additional configuration is required after installation. The script operates with the default settings optimized for general use.

## Known Limitations and Edge Cases
- **Alternative Titles**: The script might not find the correct Letterboxd page if a film has a significantly different alternative title.
- **TV Shows**: Some TV shows logged as movies in TMDb might not be correctly identified.
- **Director Information**: Films by very obscure directors might not be matched accurately.
- **Year Mismatch**: Films with different release years on Plex and Letterboxd might cause discrepancies.
- **Duplicate Titles**: Films with identical titles and release years can result in incorrect matches.

## Contributions
This script is open for contributions and improvements. If you encounter an issue or have suggestions, please feel free to contribute to the repository or contact me.



