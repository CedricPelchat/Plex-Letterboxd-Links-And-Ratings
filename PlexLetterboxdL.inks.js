//TODO: Account for alternative titles in letterboxd. It should look in those if the plex title is included.
//Edge cases:
//Unstoppable Family : has an alternative title on Letterboxd
//Vietnam: A Television History is a tv show logged as movie in Tmdb so doesn't get an icon
//Todd McFarlane's Spawn is the same, so I should not rely on tmdb
//Directors that are very unknown such as Clive Gordon don't get the icon, don't know why, maybe because they dont have birthdays
//Also those directors pages makes the script stop after getting the title for unknown reasons
//Pluto 2023 tv show doesn't get matched because there is already a film called pluto 2023. the url is pluto-2023-1, Same for Swarm 2023
//Awaken from Tom Lowe is 2018 on Letterboxd but 2021 on Plex so causes infinite loop
//SOLVED - Films that have both same year and name and one of them has no directors like Cargo 2006 and Cargo 2006 by Clive Gordon
//SOLVED - The Shining has a bug on letterboxd where the-shining-1980 links to the-shining-1997
//SOLVED - Mob Psycho 100 has 2 tv shows by the same director so one gets wrongly matched even tho they are 2016 and 2018.
//Letterboxd api will make all this obsolete so its not really worth the time.

//README: The UI langauge should be english.
(function() {
    'use strict';
    //const letterboxdImg = 'data:image/png;base64,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';
    const letterboxdImg = 'https://www.google.com/s2/favicons?sz=64&domain=letterboxd.com';
    const globalParser = new DOMParser();
    var lastTitle = undefined;
    var lastYear = undefined;
    var lastDirector = undefined;
    var currentUrl = window.location.href;


    function checkForPageChange() {
        if (window.location.href !== currentUrl) {
            currentUrl = window.location.href;
    
            console.log('Page change detected, global state reset.');
            return true;
        }
        return false; 
    }

    function extractTitleAndYear() {
        const titleElement = document.querySelector('h1[data-testid="metadata-title"]');
        const yearElement = document.querySelector('span[data-testid="metadata-line1"]');

        if (titleElement) {
            const title = titleElement.textContent.trim() || titleElement.innerText.trim();
            if (title !== lastTitle) {
                lastTitle = title;
                console.log('The title is:', lastTitle);
            }
        } else {
            lastTitle = ''; // Reset if no title is found
        }

        if (yearElement) {
            const text = yearElement.textContent.trim() || yearElement.innerText.trim();
            const match = text.match(/\b\d{4}\b/);
            if (match && match[0] !== lastYear) {
                lastYear = match[0];
                console.log('The year is:', lastYear);
            }
        } else {
            lastYear = ''; // Reset if no year is found
        }
    }

    function extractDirectorFromPage() {
        const directedByText = 'Directed by';
        const spans = Array.from(document.querySelectorAll('span'));

        const directorSpan = spans.find(span => span.textContent.includes(directedByText));
        if (directorSpan) {
            const directorLink = directorSpan.parentElement.querySelector('a');
            if (directorLink) {
                const directorName = directorLink.textContent.trim();
                if (directorName && directorName !== lastDirector) {
                    lastDirector = directorName;
                    console.log('Director in Plex: ', lastDirector);
                }
            }
        } else {
            if (lastDirector !== undefined) {
                lastDirector = '';
                //console.log('The director has been reset.');
            }
        }
    }

    function checkLink(url) {
        return new Promise((resolve, reject) => {
            GM.xmlHttpRequest({
                method: 'HEAD',
                url: url,
                onload: function(response) {
                    if (response.status >= 200 && response.status < 300) {
                        resolve({url: url, status: response.status, accessible: true});
                    } else {
                        resolve({url: url, status: response.status, accessible: false});
                    }
                },
                onerror: function() {
                    reject(new Error(url + ' could not be reached or is blocked by CORS policy.'));
                }
            });
        });
    }

    function updateOrCreateLetterboxdIcon(link, rating) {
        let metadataElement = document.querySelector('div[data-testid="metadata-ratings"]');
        if (!metadataElement) {
            metadataElement = document.querySelector('div[data-testid="metadata-children"]');
        }

        const existingContainer = document.querySelector('.letterboxd-container');

        if (existingContainer) {
            existingContainer.querySelector('a').href = link;
            const ratingElement = existingContainer.querySelector('.letterboxd-rating');
            if (ratingElement) {
                ratingElement.textContent = rating;
            }
        } else if (metadataElement) {
            const container = document.createElement('div');
            container.classList.add('letterboxd-container');
            container.style.cssText = 'display: flex; align-items: center; gap: 8px;';

            const icon = document.createElement('img');
            icon.src = letterboxdImg;
            icon.alt = 'Letterboxd Icon';
            icon.style.cssText = 'width: 24px; height: 24px; cursor: pointer;';

            const ratingText = document.createElement('span');
            ratingText.classList.add('letterboxd-rating');
            ratingText.textContent = rating;
            ratingText.style.cssText = 'font-size: 14px;'; // Style as needed

            const linkElement = document.createElement('a');
            linkElement.href = link;
            linkElement.appendChild(icon);

            container.appendChild(linkElement);
            container.appendChild(ratingText);
            metadataElement.insertAdjacentElement('afterend', container);
        }
    }

    function buildDefaultLetterboxdUrl(title, year) {
        const normalizedTitle = title.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const titleSlug = normalizedTitle.trim().toLowerCase()
        .replace(/&/g, 'and')
        .replace(/-/g, ' ')
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-');
        const letterboxdBaseUrl = 'https://letterboxd.com/film/';
        return `${letterboxdBaseUrl}${titleSlug}-${year}/`;
    }

    function removeYearFromUrl(url) {
        const yearPattern = /-\d{4}(?=\/$)/;
        return url.replace(yearPattern, '');
    }

    function replaceFilmWithDirector(url) {
        return url.replace('film','director');
    }

    function addSuffixBeforeLastSlash(url, suffix) {
        return url.replace(/\/$/, `-${suffix}/`);
    }

    function buildLetterboxdUrl(title, year) {
        let defaultUrl = buildDefaultLetterboxdUrl(title, year);
        return checkLink(defaultUrl).then(result => {
            if (result.accessible) {
                console.log(result.url, 'is accessible, status:', result.status);
                return result.url;
            } else {
                console.log(result.url, 'is not accessible, status:', result.status);
                let yearRemovedUrl = removeYearFromUrl(result.url);
                console.log('Trying URL without year:', yearRemovedUrl);
                return checkLink(yearRemovedUrl).then(yearRemovedResult => {
                    if (yearRemovedResult.accessible) {
                        console.log(yearRemovedUrl, 'is accessible, status:', yearRemovedResult.status);
                        return yearRemovedUrl;
                    } else {
                        console.log(yearRemovedUrl, 'is not accessible, status:', yearRemovedResult.status);
                        let directorUrl = replaceFilmWithDirector(yearRemovedUrl);
                        console.log('Trying director URL:', directorUrl);
                        return checkLink(directorUrl).then(result =>{
                        if (result.accessible){
                            return directorUrl;
                        }else{
                            console.log(result.url, 'is not accessible, status:', result.status);
                        }
                        });
                    }
                });
            }
        }).catch(error => {
            console.error('Error after checking both film and year:', error.message);
            let newUrl = removeYearFromUrl(defaultUrl);
            return newUrl;
        });
    }

    function fetchLetterboxdPage(url) {
        return new Promise((resolve, reject) => {
            GM.xmlHttpRequest({
                method: 'GET',
                url: url,
                onload: function(response) {
                    if (response.status >= 200 && response.status < 300) {
                        try {
                            const doc = globalParser.parseFromString(response.responseText, "text/html");
                            resolve(doc);
                        } catch (parseError) {
                            reject(new Error('Error parsing Letterboxd page: ' + parseError.message));
                        }
                    } else {
                        reject(new Error('Failed to load Letterboxd page, status: ' + response.status));
                    }
                },
                onerror: function() {
                    reject(new Error('Network error while fetching Letterboxd page'));
                }
            });
        });
    }
    

    function roundToOneDecimal(numberString) {
        const number = parseFloat(numberString);
        return isNaN(number) ? null : (Math.round(number * 10) / 10).toFixed(1);
    }

    function extractRating(doc) {
        const ratingElement = doc.querySelector('meta[name="twitter:data2"]');
        if (ratingElement && ratingElement.content) {
            const match = ratingElement.getAttribute('content').match(/\b\d+\.\d{1,2}\b/);
            if (match) {
                return roundToOneDecimal(match[0]);
            }
        } else {
            console.log('Rating element not found.');
            return null;
        }
    }

    function extractYearFromMeta(doc) {
        const metaTag = doc.querySelector('meta[property="og:title"]');
        if (metaTag) {
            const content = metaTag.getAttribute('content');
            const yearMatch = content.match(/\b\d{4}\b/);
            if (yearMatch) {
                console.log('The year on Letterboxd is : ' + yearMatch[0]);
                return yearMatch[0];
            } else {
                console.log('Year not found in the html');
                return null;
            }
        } else {
            console.log('Meta tag not found in the html');
            return null;
        }
    }

    function extractDirectorFromMeta(doc) {
        const directorMetaTag = doc.querySelector('meta[name="twitter:data1"]');
        if (directorMetaTag && directorMetaTag.content) {
            console.log('The Director on Letterboxd is: ' + directorMetaTag.content);
            return directorMetaTag.content;
        } else {
            console.log('Director not found.');
            return undefined;
        }
    }


    function subtractYearFromUrl(url, lastYear) {
        const yearPattern = /-(\d{4})\/$/;
        const match = url.match(yearPattern);

        if (match) {
            const year = parseInt(match[1], 10) - 1;
            return url.replace(yearPattern, `-${year}/`);
        } else {
            const previousYear = parseInt(lastYear, 10) - 1;
            return url.replace(/\/$/, `-${previousYear}/`);
        }
    }

    async function checkPlexLetterboxdSeriesMismatch(doc, hasSeries) {
        if (hasSeries) {
            const isLetterboxdTvShow = doc.querySelector('a[href*="themoviedb.org/tv/"]') != null;
            if (!isLetterboxdTvShow) {
                console.log(`Plex categorized as a TV show but Letterboxd is on a movie or director page.`);
                console.log(`Icon creation aborted.`);
                return false;
            }
        }
        return true;
    }

    function isDirectorsPage(url) {
        return url.startsWith('https://letterboxd.com/director');
    }
    
    async function handleDirectorsPage(url) {
        if (isDirectorsPage(url)) {
            updateOrCreateLetterboxdIcon(url, 'Letterboxd');
            return true;
        }
        return false;
    }

    async function handleMismatch(url, yearInHtml, directorInHtml, doc, hasSeries) {
        if (yearInHtml != lastYear || (!directorInHtml.includes(lastDirector) && !hasSeries)) {
            console.log(`Either the year on Plex [${lastYear}] is different from the year on Letterboxd [${yearInHtml}] or ` +
            `The director on Plex [${lastDirector}] isn't one of the directors from Letterboxd [${directorInHtml}]`);
    
            if (!hasSeries && !directorInHtml.includes(lastDirector) && directorInHtml != undefined) {
                console.log(`This is not a tv show page.`);
                console.log(`The director on Plex [${lastDirector}] is different from the director on Letterboxd [${directorInHtml}]`);
                let subtractedYearUrl = subtractYearFromUrl(url, lastYear);
                console.log('Trying subtracted year url: ' + subtractedYearUrl);
                let result = await checkLink(subtractedYearUrl);
                if (result.accessible) {
                    console.log(subtractedYearUrl, 'Url with subtracted year is accessible, status:', result.status);
                    const newDoc = await fetchLetterboxdPage(subtractedYearUrl);
                    const newDirectorInHtml = extractDirectorFromMeta(newDoc);
    
                    if (newDirectorInHtml.includes(lastDirector)) {
                        return subtractedYearUrl;
                    } else {
                        console.log(`Director on Plex [${lastDirector}] doesn't match director on html [${newDirectorInHtml}]`);
                    }
                } else {
                    console.log(`Url with subtracted year is inaccessible`);
                }
    
                let urlWithoutYear = removeYearFromUrl(url);
                result = await checkLink(urlWithoutYear);
                if (result.accessible) {
                    console.log(`${result.url}, is accessible, status:, ${result.status}`);
                    console.log('Going back to url without year as fallback');
                    return urlWithoutYear;
                } else {
                    console.log(result.url, 'is not accessible, status:', result.status);
                    console.log('Icon creation aborted');
                    return null;
                }
            } else if ((parseInt(yearInHtml, 10) - 1 === parseInt(lastYear, 10)) || (parseInt(yearInHtml, 10) + 1 === parseInt(lastYear, 10))) {
                console.log(`Year from Plex [${lastYear}] has 1 year of difference with Letterboxd [${yearInHtml}]. Icon created`);
                const rating = extractRating(doc);
                updateOrCreateLetterboxdIcon(url, rating);
                return null;
            } else {
                console.log(`Year from Plex [${lastYear}] has more than 1 year of difference with Letterboxd [${yearInHtml}]. Icon creation aborted`);
                return null;
            }
        } else {
            if (hasSeries) {
                console.log(`Plex Tv show :[${lastTitle}], Year: [${lastYear}], and Letterboxd entry [${url}], Year: [${yearInHtml}] have the same year. Icon created.`);
            } else if (lastDirector == undefined || lastDirector == '') {
                console.log(`Plex film [${lastTitle}], Year: [${lastYear}], and Letterboxd entry [${url}], Year: [${yearInHtml}] have the same year. Icon created.`);
            } else {
                console.log(`Plex film [${lastTitle}], Year: [${lastYear}], Director: [${lastDirector}] and Letterboxd entry [${url}], Year: [${yearInHtml}], Director: [${directorInHtml}] have the same year and director. Icon created.`);
            }
            const rating = extractRating(doc);
            updateOrCreateLetterboxdIcon(url, rating);
            return null;
        }
    }
    
    async function processLetterboxdUrl(initialUrl) {
        let url = initialUrl;
        let shouldContinue = true;

        const hasSeries = document.querySelector('[title*="Season"]');
        while (shouldContinue) {
            try {
                const doc = await fetchLetterboxdPage(url);
                if (!await checkPlexLetterboxdSeriesMismatch(doc, hasSeries)) break;
                if (await handleDirectorsPage(url)) break;

                const yearInHtml = extractYearFromMeta(doc);
                const directorInHtml = extractDirectorFromMeta(doc);
                console.log('Director on Plex: ' + lastDirector);
                
                let newUrl = await handleMismatch(url, yearInHtml, directorInHtml, doc, hasSeries);
                if (newUrl === null) break;
                if (newUrl) {
                    url = newUrl;
                    continue;
                }
    
                console.log(`No conditions were matched. Icon creation aborted`);
                break;
            } catch (error) {
                console.error(`Error fetching or parsing Letterboxd page:, ${error}`);
                break;
            }
        }
    }

    

    // if(document.readyState === 'complete' || document.readyState === 'loaded' || document.readyState === 'interactive') {
        main(); // } else { document.addEventListener('DOMContentLoaded', main); }

    function main() {
        var lastProcessedTitle, lastProcessedYear, lastProcessedDirector;

    
        function observerCallback(mutationsList, observer) {
            if (checkForPageChange()) {
                setTimeout(() => {
                    observerCallback(mutationsList, observer);
                }, 300);
                return;
            }
                const isAlbumPage = document.querySelector('[class^="AlbumDisc"]');
                const isFullSeries = document.querySelector('[title*="Season 4"], [title*="Season 5"], [title*="Season 6"]');
    
                if (isAlbumPage || isFullSeries) {
                    return;
                }
                extractTitleAndYear();
                extractDirectorFromPage();
    
                if (lastTitle !== lastProcessedTitle || lastYear !== lastProcessedYear || lastDirector !== lastProcessedDirector ) {
                    lastProcessedTitle = lastTitle;
                    lastProcessedYear = lastYear;
                    lastProcessedDirector = lastDirector;
    
                    if (lastTitle && lastYear) {
                        buildLetterboxdUrl(lastTitle, lastYear).then(url => {
                            if (!url){
                                return;
                            }
                            processLetterboxdUrl(url, lastYear, lastDirector);
    
                        }).catch(error => {
                            console.error('Error building Letterboxd URL:', error);
                        });
                    }
                }
        }

    const observer = new MutationObserver(observerCallback);
    observer.observe(document.body, {
        childList: true,
        characterData: true,
        subtree: true
    });
}
})();