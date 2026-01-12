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

            // Insert the fetched HTML
            placeholder.innerHTML = data;

            // --- 1. Logo Swap Logic ---
            if (customLogo) {
                const logoImg = placeholder.querySelector('#header-logo');
                if (logoImg) logoImg.src = customLogo;
            }

            // --- 2. Active Link Logic ---
            highlightActiveLink(placeholder);

            // --- 3. Execute any scripts included in the fetched HTML ---
            // Scripts inside HTML inserted via innerHTML do not execute automatically.
            // Parse the returned HTML and append/run any <script> tags found.
            try {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                const scripts = doc.querySelectorAll('script');

                scripts.forEach(s => {
                    if (s.src) {
                        // Resolve the script src relative to the fetched path if it was relative
                        let src = s.src;
                        // Avoid re-adding the same external script if already present
                        if (!document.querySelector(`script[src="${src}"]`)) {
                            const newScript = document.createElement('script');
                            newScript.src = src;
                            newScript.async = false;
                            document.body.appendChild(newScript);
                        }
                    } else {
                        // Inline script: execute immediately
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