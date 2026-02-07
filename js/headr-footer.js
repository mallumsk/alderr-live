function loadComponent(id, file) {
    const placeholder = document.getElementById(id);
    const customLogo = placeholder ? placeholder.getAttribute('data-logo') : null;

    // Try fetching the requested file from the current directory, then climb up
    // the directory tree (../, ../../, ...) as a fallback for pages in subfolders.
    const buildCandidates = (name, maxDepth = 4) => {
        const candidates = [];
        let prefix = '';
        for (let i = 0; i <= maxDepth; i++) {
            candidates.push(prefix + name);
            prefix += '../';
        }
        return candidates;
    };

    const tryFetchSequential = (candidates) => {
        return candidates.reduce((prevPromise, path) => {
            return prevPromise.catch(() => {
                return fetch(path).then(resp => {
                    if (!resp.ok) return Promise.reject(new Error('Not found: ' + path));
                    return resp.text();
                });
            });
        }, Promise.reject());
    };

    const candidates = buildCandidates(file);

    tryFetchSequential(candidates)
        .then(data => {
            if (!placeholder) return;

            // Parse the returned HTML so we can extract only the header/footer fragment
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');

            // If the fetched document contains a <header>, use it (and mobile nav if present)
            const headerEl = doc.querySelector('header');
            const mobileNavEl = doc.getElementById('mobile-nav');

            if (headerEl) {
                placeholder.innerHTML = headerEl.outerHTML + (mobileNavEl ? mobileNavEl.outerHTML : '');
            } else {
                // fallback: insert the whole body
                placeholder.innerHTML = doc.body ? doc.body.innerHTML : data;
            }

            // --- 1. Logo Swap Logic ---
            if (customLogo) {
                const logoImg = placeholder.querySelector('#header-logo');
                if (logoImg) logoImg.src = customLogo;
            }

            // --- 2. Active Link Logic ---
            highlightActiveLink(placeholder);

            // --- 3. Copy stylesheet <link> elements into document.head (if any) ---
            try {
                const links = doc.querySelectorAll('link[rel="stylesheet"]');
                links.forEach(l => {
                    const href = l.getAttribute('href');
                    if (!href) return;
                    if (!document.querySelector(`link[href="${href}"]`)) {
                        const newLink = document.createElement('link');
                        newLink.rel = 'stylesheet';
                        newLink.href = href;
                        document.head.appendChild(newLink);
                    }
                });
            } catch (e) {
                // non-fatal
            }
            // --- 3b. Copy inline <style> tags from fetched head to document.head ---
            try {
                const styles = doc.querySelectorAll('style');
                styles.forEach(s => {
                    const css = s.textContent || '';
                    if (!css) return;
                    // Avoid duplicating identical style content
                    const exists = Array.from(document.head.querySelectorAll('style')).some(hs => hs.textContent === css);
                    if (!exists) {
                        const newStyle = document.createElement('style');
                        newStyle.textContent = css;
                        document.head.appendChild(newStyle);
                    }
                });
            } catch (e) {
                // non-fatal
            }

            // --- 4. Execute any scripts included in the fetched HTML ---
            // Scripts inside HTML inserted via innerHTML do not execute automatically.
            // Append scripts from the parsed document to the body (preserve order).
            try {
                const scripts = doc.querySelectorAll('script');

                scripts.forEach(s => {
                    if (s.src) {
                        const src = s.getAttribute('src');
                        if (!document.querySelector(`script[src="${src}"]`)) {
                            const newScript = document.createElement('script');
                            newScript.src = src;
                            newScript.async = false;
                            document.body.appendChild(newScript);
                        }
                    } else {
                        const inline = document.createElement('script');
                        inline.textContent = s.textContent;
                        document.body.appendChild(inline);
                    }
                });
            } catch (e) {
                console.error('Error executing embedded scripts:', e);
            }
        })
        .catch(error => console.error('Error loading component', file, error));
}

function highlightActiveLink(container) {
    // Get the current page name (e.g., "about.html")
    // If the path is empty or "/", default to "index.html"
    let currentPath = window.location.pathname.split("/").pop();
    if (currentPath === "") currentPath = "index.html";

    // Find all links inside the header
    const links = container.querySelectorAll('nav a');

    links.forEach(link => {
        // Get the link's filename (e.g., "about.html")
        const linkPath = link.getAttribute('href');

        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
}

loadComponent('header-placeholder', 'header.html');
loadComponent('footer-placeholder', 'footer.html');