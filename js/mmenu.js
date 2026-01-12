  const isMobile = () => window.innerWidth < 640;

      // Flicker Fix: Ensure the panel is hidden immediately on load
      // Guard access in case the header (and `toggleDiv`) has not been injected yet.
      try {
        const _td = document.getElementById("toggleDiv");
        if (_td) _td.classList.add("smooth-hide");
      } catch (e) {
        // ignore if toggleDiv is not present yet
      }

      const initMmenu = () => {
        const navButtons = document.querySelectorAll(".nav-toggle-btn");
        const closeButton = document.getElementById("closeButton");
        const toggleDiv = document.getElementById("toggleDiv");
        const header = document.getElementById("header");
        const navLinkTitle = document.getElementById("nav-link-title");
        const mobileMenuButton = document.getElementById("mobile-menu-button");
        const mobileMenu = document.getElementById("mobile-menu");

        // New Anchor Point for Desktop Insertion (the full width container)
        const desktopInsertionAnchor = document.getElementById(
          "desktop-page-wrapper"
        );
        // The constraint element used to determine where to place the panel relative to page content
        const mainContentContainer = document.getElementById(
          "main-content-container"
        );

        const aboutContent = document.getElementById("about-content");
        const howitworkContent = document.getElementById("how-it-work-content");
        const tabbedContent = document.getElementById("tabbed-content");

        const tabButtons = document.querySelectorAll(".tab-btn");
        const tabPanes = document.querySelectorAll(".tab-pane");
        const tabContentWrapper = document.getElementById("tabContentWrapper");

        let isPanelOpen = false;
        let activeNavButton = null;

        // Define all colors associated with each tab (unchanged)
        // Keep color *text* settings but remove any background utilities so
        // tabs and the tab content wrapper remain white.
        // Remove colored text utilities; keep backgrounds empty. We'll
        // use 'spruce' for active elements and neutral gray for content.
        const COLORS = {
          tab1: { contentBg: '', buttonBg: '', contentText: '', titleText: '' },
          tab2: { contentBg: '', buttonBg: '', contentText: '', titleText: '' },
          tab3: { contentBg: '', buttonBg: '', contentText: '', titleText: '' },
          tab4: { contentBg: '', buttonBg: '', contentText: '', titleText: '' },
        };

        // Remove hover background classes to avoid any colored hover backgrounds
        const INACTIVE_HOVER_CLASSES = {
          tab1: "",
          tab2: "",
          tab3: "",
          tab4: "",
        };

        const ALL_BG_CLASSES = ['bg-indigo-50', 'bg-pink-50', 'bg-amber-50', 'bg-green-50'];
        const ALL_BUTTON_BG_CLASSES = [
          "bg-indigo-200",
          "bg-pink-200",
          "bg-amber-200",
          "bg-green-200",
        ];
        // Keep an array of colored text classes so we can remove them if present
        const ALL_TEXT_CLASSES = [
          "text-indigo-800",
          "text-pink-800",
          "text-amber-800",
          'text-green-800',
        ];
        const ALL_INACTIVE_CLASSES = ["text-gray-700", "hover:bg-gray-100"];

        // --- Arrow Helper ---
        const getArrow = (button) => {
          return button.querySelector(".arrow");
        };

        // --- Panel Visibility Functions ---
        const openDiv = (button) => {
          const linkName = button.getAttribute("data-link");
          const isAboutPanel = linkName === "About";

          // 1. Navigation Active State & Arrow Cleanup
          if (activeNavButton) {
            activeNavButton.classList.remove("nav-active");
            const prevArrow = getArrow(activeNavButton);
            if (prevArrow) prevArrow.classList.remove("rotated");
          }

          // 2. Dynamic Panel Movement (Mobile/Desktop) & Class Setup
          if (isMobile()) {
            // Mobile: Panel remains in normal flow (relative) to push content down
            button.parentNode.insertBefore(toggleDiv, button.nextSibling);
            // Ensure relative positioning and mobile styles
            toggleDiv.classList.add("relative", "border-x-0", "border-b-0");
            toggleDiv.classList.remove(
              "absolute",
              "top-0",
              "z-50",
              "mt-4",
              "sm:rounded-none",
              "sm:border-x-0",
              "border"
            );
          } else {
            // Desktop: Panel uses absolute positioning to overlay content
            if (toggleDiv.parentNode !== desktopInsertionAnchor) {
              desktopInsertionAnchor.insertBefore(
                toggleDiv,
                mainContentContainer
              );
            }
            // Apply ABOLUTE positioning to overlay content. top-0 aligns it exactly below the fixed header.
            toggleDiv.classList.add(
              "absolute",
              "top-14",
              "z-50",
              "sm:rounded-none",
              "sm:border-x-0",
              "border"
            );
            toggleDiv.classList.remove(
              "relative",
              "border-x-0",
              "border-b-0",
              "mt-4"
            );
          }

          // 3. Conditional Content Toggle
          if (isAboutPanel) {
            tabbedContent.classList.add("hidden");
            aboutContent.classList.remove("hidden");
             
          } else {
            aboutContent.classList.add("hidden");
            tabbedContent.classList.remove("hidden");
           
            openTab("tab1"); // Default to Tab 1 if content is tabbed
          }

          // 4. Navigation Active State & Arrow Update
          navLinkTitle.textContent = linkName;
          button.classList.add("nav-active");
          const currentArrow = getArrow(button);
          if (currentArrow) currentArrow.classList.add("rotated");
          activeNavButton = button;

          // 5. Show Panel
          toggleDiv.classList.add("smooth-show");
          toggleDiv.classList.remove("smooth-hide");
          isPanelOpen = true;
        };

        const closeDiv = (isManualClose = false) => {
          // Remove active state and rotation
          if (activeNavButton) {
            activeNavButton.classList.remove("nav-active");
            const arrow = getArrow(activeNavButton);
            if (arrow) arrow.classList.remove("rotated");
            activeNavButton = null;
          }

          // Hide Panel
          toggleDiv.classList.add("smooth-hide");
          toggleDiv.classList.remove("smooth-show");
          isPanelOpen = false;

          // Only close the mobile menu if the close trigger was NOT the internal close button or manual toggle.
          if (
            isMobile() &&
            !isManualClose &&
            !mobileMenu.classList.contains("hidden")
          ) {
            mobileMenu.classList.add("hidden");
          }
        };

        // --- Tab Switching Function (unchanged) ---
        const openTab = (tabId) => {
          const colorSet = COLORS[tabId];

          // 1. Clean up ALL tab buttons and set INACTIVE colored state
          tabButtons.forEach((btn) => {
            // Ensure any previously applied colored classes are removed
            btn.classList.remove(
              "tab-active",
              ...ALL_BUTTON_BG_CLASSES,
              ...ALL_BG_CLASSES,
              ...ALL_TEXT_CLASSES,
              'text-gray-700'
            );

            // Set inactive button label color to neutral gray
            btn.classList.add('text-gray-700');
          });

          // 2. Hide all tab content panes
          tabPanes.forEach((pane) => {
            pane.classList.add("hidden");
          });

          // 3. Clean up content wrapper colors and ensure it stays white
          tabContentWrapper.classList.remove(...ALL_BG_CLASSES);
          tabContentWrapper.classList.add('bg-white');

          // 4. Apply ACTIVE Button Colors
          const activeBtn = document.querySelector(
            `.tab-btn[data-tab="${tabId}"]`
          );
          if (activeBtn) {
            // Remove any previously applied text classes and neutral gray
            activeBtn.classList.remove(...ALL_TEXT_CLASSES, 'text-gray-700');
            // Keep active text color as 'spruce' only
            activeBtn.classList.add("spruce", "tab-active");
          }

          // 5. Do not apply any colored background to the content wrapper (keep white)
          tabContentWrapper.classList.add('bg-white');

          // 6. Show active tab pane and set dynamic text colors
          document.getElementById(tabId).classList.remove("hidden");

          // Update text color for content inside the tab pane
          const contentDiv = document.getElementById("tabContent");
          // remove any colored text classes and use neutral gray for content
          contentDiv.classList.remove(...ALL_TEXT_CLASSES);
          contentDiv.classList.add('text-gray-700');

          // Update the title color inside the tab pane
          const titleSpan = document.getElementById("nav-link-title");
          if (titleSpan) {
            titleSpan.classList.remove(...ALL_TEXT_CLASSES, 'text-gray-700');
            titleSpan.classList.add('spruce');
          }
        };

        // --- Event Listeners (mostly unchanged) ---
        mobileMenuButton.addEventListener("click", () => {
          mobileMenu.classList.toggle("hidden");
          if (isPanelOpen) {
            closeDiv(true);
          }
        });

        navButtons.forEach((button) => {
          button.addEventListener("click", (event) => {
            event.stopPropagation();

            if (isPanelOpen && activeNavButton === button) {
              closeDiv(true);
              return;
            }
            openDiv(button);
          });
        });

        closeButton.addEventListener("click", () => {
          closeDiv(true);
        });

        document.addEventListener("click", (event) => {
          if (isPanelOpen) {
            // Check if click target is outside the panel AND outside the header
            if (
              !toggleDiv.contains(event.target) &&
              !header.contains(event.target)
            ) {
              closeDiv(false);
            }
          }
        });

        tabButtons.forEach((button) => {
          button.addEventListener("click", () => {
            openTab(button.getAttribute("data-tab"));
          });
        });

        window.addEventListener("resize", () => {
          // Ensure the panel is correctly positioned on resize if changing from mobile to desktop view
          if (!isMobile() && toggleDiv.parentNode !== desktopInsertionAnchor) {
            closeDiv(true);
            desktopInsertionAnchor.insertBefore(
              toggleDiv,
              mainContentContainer
            );
            // Apply desktop overlay classes on resize if it needs to be moved back
            toggleDiv.classList.add(
              "absolute",
              "top-0",
              "z-50",
              "sm:rounded-none",
              "sm:border-x-0",
              "border"
            );
            toggleDiv.classList.remove(
              "relative",
              "border-x-0",
              "border-b-0",
              "mt-4"
            );
          }
        });
      };

      // Initialize immediately if DOM already loaded, otherwise wait for DOMContentLoaded
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMmenu);
      } else {
        initMmenu();
      }

      // End of mmenu.js
      // FAQ start here


        // End of FAQ.js
        // tab data for services page start here
  