//navigations

class NavigationController {
    constructor() {
        this.menuItems = document.querySelectorAll(".menu_item");
        this.activeIndex = 0;
        this.transitionDuration = 300;
        this.mediaQuery = window.matchMedia('(min-width: 768px)');
        this.profile = document.querySelector(".profile div");
        this.isCollapsed = false;
        this.isMobileMenuOpen = false;
        this.hamburgerBtn = document.getElementById('hamburger');
        this.lastScreenSize = this.mediaQuery.matches;
        
        // Bind methods
        this.setActiveItem = this.setActiveItem.bind(this);
        this.handleCollapse = this.handleCollapse.bind(this);
        
        // Make activeNav available globally
        window.activeNav = (index) => this.setActiveItem(index);
        
        this.setupEventListeners();
    }

    resetActiveStates() {
        this.menuItems.forEach(item => {
            item.classList.remove("activeNav", "sub_active", "active_list");
        });
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.handleResize());
        
        // Remove existing onclick attributes and add event listeners
        this.menuItems.forEach((item, index) => {
            item.removeAttribute('onclick');
            // Only add click event listener if it's not the collapse button on small screens
            if (!(index === 7 && !this.mediaQuery.matches)) {
                item.addEventListener('click', () => this.setActiveItem(index));
            }
        });
        
        if (this.hamburgerBtn) {
            this.hamburgerBtn.addEventListener('click', () => this.toggleMobileMenu());
        }
    }

    toggleMobileMenu() {
        const elements = this.getElements();
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
        
        if (this.hamburgerBtn) {
            this.hamburgerBtn.innerHTML = this.isMobileMenuOpen 
                ? `<svg width="18" height="18" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.625 3.375L3.375 8.625" stroke="#334155" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M3.375 3.375L8.625 8.625" stroke="#334155" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                   </svg>`
                : `<svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1H4M17 1H8M17 11H14M1 11H10M1 6H17" stroke="#64748B" stroke-width="1.5" stroke-linecap="round"/>
                   </svg>`;
        }

        if (elements.sideNav) {
            elements.sideNav.classList.remove('slide_out', 'slide_in');
            if (this.isMobileMenuOpen) {
                elements.sideNav.classList.add('active_side_nav');
                this.applyActiveState(this.activeIndex);
            } else {
                elements.sideNav.classList.remove('active_side_nav');
                this.resetActiveStates();
                this.menuItems[this.activeIndex]?.classList.add("activeNav");
            }
        }
    }

    handleCollapse() {
        if (!this.mediaQuery.matches) return;
        
        const elements = this.getElements();
        this.isCollapsed = !this.isCollapsed;
        
        this.applyTransitions(elements);
        this.updateElementStates(elements, this.isCollapsed);
        
        // Reapply active state to current item
        this.resetActiveStates();
        this.applyActiveState(this.activeIndex);
    }

    getElements() {
        return {
            menuItems: document.querySelectorAll(".menu_item"),
            collapseIcon: document.querySelector(".collapse svg"),
            themeBtn: document.querySelector(".themeToggle_wrapper"),
            profile: document.querySelector(".profile"),
            profileInfo: document.querySelector(".profile div"),
            logo: document.querySelector(".logo svg"),
            sideNav: document.querySelector(".side_nav"),
            mainSvg: document.querySelectorAll(".mainsvg"),
            subSvg: document.querySelectorAll(".subsvg"),
            collapse: document.querySelector('.collapse')
        };
    }

    applyTransitions(elements) {
        const transition = `all ${this.transitionDuration}ms ease`;
        if (elements.logo) elements.logo.style.transition = transition;
        if (elements.profile) elements.profile.style.transition = transition;
        if (elements.profileInfo) elements.profileInfo.style.transition = transition;
        if (elements.collapseIcon) elements.collapseIcon.style.transition = "transform 0.3s ease";
        elements.menuItems.forEach(item => {
            item.style.transition = transition;
        });
    }

    updateElementStates(elements, isCollapsed) {
        if (!this.mediaQuery.matches) return;

        // Update navigation width
        if (elements.sideNav) {
            elements.sideNav.classList.toggle("slide_out", isCollapsed);
            elements.sideNav.classList.toggle("slide_in", !isCollapsed);
        }

        // Update SVG visibility
        elements.mainSvg.forEach(svg => {
            svg.style.display = isCollapsed ? "none" : "block";
        });
        elements.subSvg.forEach(svg => {
            svg.style.display = isCollapsed ? "block" : "none";
        });

        // Update menu items
        elements.menuItems.forEach((item, index) => {
            const textLabel = item.querySelector("span");
            if (index !== 7) { // Skip collapse button
                item.style.width = isCollapsed ? "32px" : "100%";
                item.classList.toggle("bug", isCollapsed);
                if (textLabel) {
                    textLabel.style.display = isCollapsed ? "none" : "block";
                }
            }
        });

        // Update other elements
        if (elements.logo) elements.logo.style.width = isCollapsed ? "60px" : "100px";
        if (elements.themeBtn) elements.themeBtn.style.display = isCollapsed ? "none" : "flex";
        if (elements.profile) elements.profile.style.width = isCollapsed ? "50px" : "100%";
        if (elements.profileInfo) elements.profileInfo.style.display = isCollapsed ? "none" : "block";
        if (elements.collapseIcon) {
            elements.collapseIcon.style.transform = isCollapsed ? "rotateY(-180deg)" : "none";
        }
        if (elements.collapse) elements.collapse.style.justifyContent = isCollapsed? 'center' : 'start'
    }

    setActiveItem(index) {
        // Don't process collapse button (index 7) on small screens
        if (index === 7 && !this.mediaQuery.matches) return;
    
        // Store the new active index before resetting states
        if (index !== 7) { // Don't update activeIndex for collapse button
            this.activeIndex = index;
            
            // Hide all sections first
            const allSections = document.querySelectorAll('.section');
            allSections.forEach(section => {
                section.style.display = 'none';
            });
    
            // Show the selected section
            let selectedSection;
            switch(index) {
                case 0:
                    selectedSection = document.querySelector('.dashboard.section');
                    break;
                case 1:
                    selectedSection = document.querySelector('.Events_board');
                    break;
                case 2:
                        selectedSection = document.querySelector('.speakers_board');
                        break;
                case 3:
                    selectedSection = document.querySelector('.Report_board');
                    break;
                case 4:
                        selectedSection = document.querySelector('.dashboard.section');
                    break;
                case 5:
                    selectedSection = document.querySelector('.messages_board');
                    break;
                    case 6:
                        selectedSection = document.querySelector('.settings_board');
                        break;
                    case 8:
                        selectedSection = document.querySelector('.profile_board');
                        break;
            }
    
            if (selectedSection) {
                selectedSection.style.display = 'flex';
            }
        }
    
        // Remove all active classes first
        this.resetActiveStates();
    
        if (index === 7) {
            // Collapse button clicked
            this.handleCollapse();
            // Re-apply active state to previously active item
            if (this.activeIndex !== 7) {
                this.applyActiveState(this.activeIndex);
            }
        } else {
            this.applyActiveState(index);
        }
    }

    applyActiveState(index) {
        const item = this.menuItems[index];
        if (!item) return;

        if (this.mediaQuery.matches) {
            // Large screen
            if (this.isCollapsed) {
                item.classList.add("sub_active");
            } else {
                item.classList.add("activeNav", "active_list");
            }
        } else {
            // Small screen
            if (this.isMobileMenuOpen) {
                item.classList.add("active_list");
            } else {
                item.classList.add("activeNav");
            }
        }
    }

    handleResize() {
        const currentScreenSize = this.mediaQuery.matches;
        
        // Check if screen size category has changed
        if (currentScreenSize !== this.lastScreenSize) {
            // Refresh the page when screen size category changes in either direction
            window.location.reload();
            return;
        }

        const elements = this.getElements();
    
        if (currentScreenSize) {
            if (elements.sideNav) {
                elements.sideNav.classList.remove('active_side_nav');
                elements.sideNav.style = '';
                
                if (this.isCollapsed) {
                    elements.sideNav.classList.add('slide_out');
                } else {
                    elements.sideNav.classList.add('slide_in');
                }
            }
            
            this.isMobileMenuOpen = false;
            
            if (this.hamburgerBtn) {
                this.hamburgerBtn.innerHTML = `<svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1H4M17 1H8M17 11H14M1 11H10M1 6H17" stroke="#64748B" stroke-width="1.5" stroke-linecap="round"/>
                </svg>`;
            }

            // Show collapse button on large screens
            if (elements.collapse) {
                elements.collapse.style.display = '';
            }

            this.updateElementStates(elements, this.isCollapsed);
        } else {
            if (elements.sideNav) {
                elements.sideNav.classList.remove('slide_in', 'slide_out');
            }
            
            elements.mainSvg.forEach(svg => svg.style.display = 'block');
            elements.subSvg.forEach(svg => svg.style.display = 'none');
            
            // Hide collapse button on small screens
            if (elements.collapse) {
                elements.collapse.style.display = 'none';
            }
        }
    
        this.resetActiveStates();
        this.applyActiveState(this.activeIndex);
    }

    init() {
        // Hide all sections except dashboard
        const allSections = document.querySelectorAll('.section');
        allSections.forEach(section => {
            section.style.display = 'none';
        });
        const dashboard = document.querySelector('.dashboard.section');
        if (dashboard) {
            dashboard.style.display = 'flex';
        }
    
        this.handleResize();
        this.setActiveItem(0); // Set home as active by default
    }
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
    window.navController = new NavigationController();
    window.navController.init();
});



//theme.js
        // Theme toggle functionality
        const getPreferredTheme = () => {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                return savedTheme;
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        };

        const setTheme = (theme) => {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            document.querySelector('.theme-toggle').setAttribute('data-theme', theme);
        };

        // Initialize theme
        setTheme(getPreferredTheme());

        // Theme toggle button functionality
        const themeToggle = document.querySelector('.theme-toggle');
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', (e) => {
                setTheme(e.matches ? 'dark' : 'light');
            });


//summary,news&registration.js
async function fetchSummariesRegistrationNews(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        summarySection(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchSummariesRegistrationNews("https://event-management-server-ruddy.vercel.app/summaries");

function summarySection(summarys) {
    const summary = document.querySelector('.summary');
    const summaryWrapper = document.createElement('div');
    summaryWrapper.classList.add('summary_wrapper');
    summary.appendChild(summaryWrapper);

    summarys.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        let rateMarker = item.percentage !== '-5.0%'; // Check rate condition directly
        const color = rateMarker ? '#65DDB5' : '#F43F5E';

        // Conditional SVG markup based on rateMarker
        const arrowSvg = rateMarker 
            ? `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.5 7.16667V1.5H2.83333M8.33333 1.66667L1.5 8.5" stroke="#65DDB5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`
            :`<svg class="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.5 5.83333V11.5H5.83333M11.3333 11.3333L4.5 4.5" stroke="#F43F5E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`;

        card.innerHTML = `
            <div>
                <h3>${item.title}</h3>
                <svg class='info' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 8.66666V9.99999" stroke="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8.33329 5.99999C8.33329 6.18409 8.18405 6.33332 7.99996 6.33332C7.81586 6.33332 7.66663 6.18409 7.66663 5.99999C7.66663 5.81589 7.81586 5.66666 7.99996 5.66666C8.18405 5.66666 8.33329 5.81589 8.33329 5.99999Z" stroke="white"/>
                    <path d="M12.8333 7.99999C12.8333 10.6694 10.6693 12.8333 7.99996 12.8333C5.33058 12.8333 3.16663 10.6694 3.16663 7.99999C3.16663 5.33061 5.33058 3.16666 7.99996 3.16666C10.6693 3.16666 12.8333 5.33061 12.8333 7.99999Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div>
                <p>${item.rate}</p>
                ${arrowSvg}
                <span style="color: ${color}">${item.percentage}</span>
            </div>
        `;

        summaryWrapper.appendChild(card);
    });
}

async function fetchRegistrations(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        registrationStat(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchRegistrations("https://event-management-server-ruddy.vercel.app/registrations");

function registrationStat(registration) {
    const yAxis = document.getElementById('y_axis');
    const stat =document.getElementById('stat');
    let yAxisContent = '';

    // Generate HTML for y-axis labels
    for (let index = 10; index >= 0; index--) {
        if (index % 2 === 0) {
            yAxisContent += `<span>${index * 100}</span>`;
        }
    }

    // Set innerHTML with generated content
    yAxis.innerHTML = yAxisContent;

    const statistics = (height)=> {
        return ((height/1000) * 100);
    }

    registration.forEach(item => {
        const statWrapper = document.createElement('div');
        statWrapper.classList.add('stat_wrapper');

        statWrapper.innerHTML = `
            <div class="stat_bars"><span  style="height: ${statistics(item.height)}%;"></span></div>
            <span class="stat_month_lg">${item.monthLg}</span> <span class="stat_month_sm">${item.monthSm}</span>
        `

        stat.appendChild(statWrapper);
    })

}

async function fetchLatestNews(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        latestNews(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchLatestNews("https://event-management-server-ruddy.vercel.app/latest-news");

function latestNews(news) {
    const latestNewsContainer = document.querySelector('.slide_wrapper');
    const mainContainer = document.querySelector('.latest_news');
    const controller = document.createElement('div');
    controller.classList.add('controller');
    const paginationWrapper = document.createElement('div');
    paginationWrapper.classList.add('pagination_wrapper');

    controller.innerHTML = `
        <span id="prev">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="white"/>
                <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#E2E8F0"/>
                <path d="M12.625 10.375L10.875 12L12.625 13.625" stroke="#334155" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </span>
        <span id="next">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="white"/>
                <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#E2E8F0"/>
                <path d="M11.375 10.375L13.125 12L11.375 13.625" stroke="#334155" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </span>
    `;
    mainContainer.appendChild(controller);
    mainContainer.appendChild(paginationWrapper);

    // Add slides and mark the first slide as active initially
    news.forEach((item, index) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        if (index === 0) slide.classList.add('active');  // Set first slide as active

        slide.innerHTML = `
            <img class="news_image" src="${item.newsImg}" alt="News Image ${index + 1}">
            <h3>${item.newsHeadline}</h3>
            <p class="news_note">${item.newsNote}</p>
        `;
        const pagination = document.createElement('span');
        pagination.classList.add('carousel_pagination');
        paginationWrapper.appendChild(pagination);

        latestNewsContainer.appendChild(slide);
    });

    let activeIndex = 0;
    const slides = latestNewsContainer.querySelectorAll('.slide');
    const paginations = mainContainer.querySelectorAll('.carousel_pagination');

    function updateSlidePosition() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === activeIndex);  // Toggle active class for fade-in effect
        });
        paginations.forEach((pagin, index) => {
            pagin.style.opacity = index === activeIndex? '1': '0.3';
        })
        const containerWidth = latestNewsContainer.offsetWidth;
        latestNewsContainer.style.transform = `translateX(-${containerWidth * activeIndex}px)`;
    }

    function showNextSlide() {
        activeIndex = (activeIndex + 1) % news.length;
        updateSlidePosition();
    }

    function showPrevSlide() {
        activeIndex = (activeIndex - 1 + news.length) % news.length;
        updateSlidePosition();
    }

    document.querySelector('#next').addEventListener('click', showNextSlide);
    document.querySelector('#prev').addEventListener('click', showPrevSlide);

    updateSlidePosition();  // Initial call to set up the first slide
}




let events = [];
let filteredEvents = [];
let eventsPerPage = 10;
let currentPage = 1;

// Fetch events from API
async function fetchEvents() {
    try {
        const response = await fetch('https://event-management-server-ruddy.vercel.app/event');
        events = await response.json();
        filteredEvents = [...events];
        applyFilters();
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

// Filter events based on search, date, and status
function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const dateFilter = document.getElementById('dateFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    const sortOrder = document.getElementById('sortOrder').value;

    filteredEvents = events.filter(event => {
        const matchesSearch = event.name.toLowerCase().includes(searchTerm);
        const matchesDate = filterByDate(event.date, dateFilter);
        const eventDate = new Date(event.date);
        const now = new Date();
        const isUpcoming = eventDate > now;
        
        // Status filtering logic
        let matchesStatus = false;
        switch (statusFilter) {
            case 'all':
                matchesStatus = true;
                break;
            case 'upcoming':
                // Show future events that are not completed or in progress
                matchesStatus = isUpcoming && event.status !== 'Completed' && event.status !== 'In Progress';
                break;
            case 'Completed':
                matchesStatus = event.status === 'Completed';
                break;
            case 'In Progress':
                // Show all In Progress events regardless of date
                matchesStatus = event.status === 'In Progress';
                break;
            default:
                matchesStatus = event.status === statusFilter;
        }
        
        return matchesSearch && matchesStatus && matchesDate;
    });

    // Apply sorting
    sortEvents(sortOrder);

    // Update results info
    updateResultsInfo();

    // Reset to first page and render
    currentPage = 1;
    renderEvents();
    renderPagination();
}

// Filter events by date
function filterByDate(eventDate, filter) {
    if (filter === 'all') return true;

    const date = new Date(eventDate);
    const now = new Date();
    
    switch (filter) {
        case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return date >= weekAgo;
        case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            return date >= monthAgo;
        case 'year':
            const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
            return date >= yearAgo;
        default:
            return true;
    }
}

// Update results info
function updateResultsInfo() {
    const resultsInfo = document.getElementById('resultsInfo');
    resultsInfo.textContent = `Displaying ${filteredEvents.length} results`;
}

// Sort events
function sortEvents(order) {
    filteredEvents.sort((a, b) => {
        switch (order) {
            case 'recent':
                return new Date(b.date) - new Date(a.date);
            case 'asc':
                return a.name.localeCompare(b.name);
            case 'desc':
                return b.name.localeCompare(a.name);
            default:
                return 0;
        }
    });
}

// Render events table
function renderEvents() {
    const tbody = document.getElementById('eventsTableBody');
    tbody.innerHTML = '';

    const start = (currentPage - 1) * eventsPerPage;
    const end = Math.min(start + eventsPerPage, filteredEvents.length);
    const pageEvents = filteredEvents.slice(start, end);

    pageEvents.forEach((event, index) => {
        const eventDate = new Date(event.date);
        const now = new Date();
        let status = event.status;
        
        // Only override status to upcoming if it's not completed and not in progress
        if (eventDate > now && status !== 'Completed' && status !== 'In Progress') {
            status = 'upcoming';
        }

        const row = document.createElement('tr');
        row.setAttribute('data-id', index);
        row.classList.add('modalParent');
        row.innerHTML = `
            <td>${event.name}</td>
            <td>${formatDate(event.date)}</td>
            <td>${Array.isArray(event.speaker) ? event.speaker.join(', ') : event.speaker}</td>
            <td><span class="status-badge status-${status.toLowerCase().replace(' ', '')}">
            <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="3" cy="3" r="3"/>
            </svg>
             ${status}</span></td>
        `;
        tbody.appendChild(row);
    });
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
}

// Enhanced pagination function with exactly 4 visible page numbers
function renderPagination() {
    const pagination = document.getElementById('pagination');
    const pageCount = Math.ceil(filteredEvents.length / eventsPerPage);
    
    pagination.innerHTML = '';
    
    // Previous button
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&lt;';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderEvents();
            renderPagination();
        }
    });
    pagination.appendChild(prevButton);

    // Calculate which 4 pages to show
    let pages = [];
    if (pageCount <= 4) {
        // If 4 or fewer pages, show all
        pages = Array.from({length: pageCount}, (_, i) => i + 1);
    } else {
        if (currentPage <= 2) {
            // Near start: show first 4 pages
            pages = [1, 2, 3, 4];
        } else if (currentPage >= pageCount - 1) {
            // Near end: show last 4 pages
            pages = [pageCount - 3, pageCount - 2, pageCount - 1, pageCount];
        } else {
            // In middle: show current page and 3 adjacent
            pages = [currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
        }
    }

    // Add page buttons
    pages.forEach(pageNum => {
        const button = document.createElement('button');
        button.innerText = pageNum;
        button.classList.toggle('active', pageNum === currentPage);
        button.addEventListener('click', () => {
            currentPage = pageNum;
            renderEvents();
            renderPagination();
        });
        pagination.appendChild(button);
    });

    // Next button
    const nextButton = document.createElement('button');
    nextButton.innerHTML = '&gt;';
    nextButton.disabled = currentPage === pageCount;
    nextButton.addEventListener('click', () => {
        if (currentPage < pageCount) {
            currentPage++;
            renderEvents();
            renderPagination();
        }
    });
    pagination.appendChild(nextButton);
}

// Export to PDF function
function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Configure the table columns
    const columns = [
        { header: 'Event Name', dataKey: 'name' },
        { header: 'Date', dataKey: 'date' },
        { header: 'Speaker', dataKey: 'speaker' },
        { header: 'Status', dataKey: 'status' }
    ];

    // Prepare the data
    const data = filteredEvents.map(event => {
        const eventDate = new Date(event.date);
        const now = new Date();
        let status = event.status;
        
        // Only override status to upcoming if it's not completed and not in progress
        if (eventDate > now && status !== 'Completed' && status !== 'In Progress') {
            status = 'upcoming';
        }

        return {
            name: event.name,
            date: formatDate(event.date),
            speaker: Array.isArray(event.speaker) ? event.speaker.join(', ') : event.speaker,
            status: status
        };
    });

    // Add title
    doc.setFontSize(16);
    doc.text('Events History', 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 22);

    // Create the table
    doc.autoTable({
        columns,
        body: data,
        startY: 25,
        styles: { fontSize: 9 },
        headStyles: { fillColor: [58, 58, 58] },
        alternateRowStyles: { fillColor: [250, 250, 250] },
        rowPageBreak: 'avoid',
        theme: 'grid',
        columnStyles: {
            name: { cellWidth: 50 },
            date: { cellWidth: 30 },
            speaker: { cellWidth: 60 },
            status: { cellWidth: 30 }
        },
        didDrawPage: function(data) {
            // Add page number at the bottom
            doc.setFontSize(8);
            doc.text(
                `Page ${doc.internal.getCurrentPageInfo().pageNumber}`,
                data.settings.margin.left,
                doc.internal.pageSize.height - 10
            );
        }
    });

    // Save the PDF
    doc.save('events_history.pdf');
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners for all interactive elements
    document.getElementById('searchInput').addEventListener('input', applyFilters);
    document.getElementById('dateFilter').addEventListener('change', applyFilters);
    document.getElementById('statusFilter').addEventListener('change', applyFilters);
    document.getElementById('sortOrder').addEventListener('change', applyFilters);
    document.getElementById('exportBtn').addEventListener('click', exportToPDF);
    document.getElementById('rowsPerPage').addEventListener('change', (e) => {
        eventsPerPage = parseInt(e.target.value);
        currentPage = 1;
        renderEvents();
        renderPagination();
    });

    // Initial load
    fetchEvents();
});



// Modal functionality
function createModal(event) {
    const modal = document.createElement('div');
    modal.className = 'event-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>${event.name}</h2>
            <p class="event-date">${formatDate(event.date)}</p>
            <p class="event-description">${event.description}</p>
            
            <div class="speakers-attendees">
                <div class="avatars">
                    ${Array.isArray(event.speaker) ? 
                        event.speaker.map(() => `
                            <div class="avatar-circle"></div>
                        `).join('') : 
                        '<div class="avatar-circle"></div>'
                    }
                </div>
                <p>${Array.isArray(event.speaker) ? event.speaker.length : 1} Guest Speakers</p>
                <p>${event.attendees || 0} Attendees</p>
            </div>
            
            <div class="modal-actions">
                <button class="close-btn">Close</button>
                <button class="delete-btn">Delete</button>
                <button class="mark-completed-btn">Mark as completed</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal handlers
    const closeX = modal.querySelector('.close-modal');
    const deleteBtn = modal.querySelector('.delete-btn');
    const markCompletedBtn = modal.querySelector('.mark-completed-btn');


    deleteBtn.onclick = async () => {
        try {
            const response = await fetch(`https://event-management-server-ruddy.vercel.app/event/${event.name}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                updateNotificationBadge();
                await fetchEvents();
                modal.remove();
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    markCompletedBtn.onclick = async () => {
        try {
            const response = await fetch(`https://event-management-server-ruddy.vercel.app/event/${event.name}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'Completed' })
            });
            
            if (response.ok) {
                await fetchEvents();
                modal.remove();
            }
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };
}

// Notification functionality
let notificationCount = 0;


// Create and update notification badge
function createNotificationBadge(notificationTab) {
    let badge = notificationTab.querySelector('.notification-badge');
    
    if (!badge) {
        badge = document.createElement('span');
        badge.className = 'notification-badge';
        notificationTab.appendChild(badge);
    }
    
    return badge;
}

// Update notification badge count and visibility
async function updateNotificationBadge() {
    try {
        const response = await fetch('https://event-management-server-ruddy.vercel.app/notifications');
        const notifications = await response.json();
        notificationCount = notifications.length;
        
        const notificationTab = document.querySelector('.notification');
        const badge = createNotificationBadge(notificationTab);
        
        // Update badge content and visibility
        badge.textContent = notificationCount;
        badge.style.display = 'inline-block';
        
        return notifications; // Return notifications for potential reuse
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return [];
    }
}

function createNotificationsPanel() {
    let panel = document.querySelector('.notifications-panel');
    if (panel) {
        panel.remove();
    }

    let notificationPanel = document.createElement('div');

    async function loadNotifications() {
        try {
            let response = await fetch('https://event-management-server-ruddy.vercel.app/notifications');
            let notifications = await response.json();
            
            notificationPanel.innerHTML = `
                <div class="notifications-header">
                    <h3>Notifications</h3>
                    <button class="close-notifications" aria-label="Close notifications">&times;</button>
                </div>
                <div class="notifications-list">
                    ${notifications.map(notification => `   
                        <div class="notification-item" data-id="${notification._id}">
                            <p>${notification.message}</p>
                            <div class="time_delete">
                                <span class="notification-time">${formatRelativeTime(notification.timestamp)}</span>
                                <button class="delete-notification-btn" title="Delete notification">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF3366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M3 6h18"></path>
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;

            let closeBtn = notificationPanel.querySelector('.close-notifications');
            if (closeBtn) {
                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    notificationPanel.remove();
                    // Only reset navigation to home when close button is clicked
                    if (window.navController) {
                        window.navController.setActiveItem(0);
                    }
                }, { once: true });
            }

            notificationPanel.addEventListener('click', async (e) => {
                let deleteBtn = e.target.closest('.delete-notification-btn');
                if (deleteBtn) {
                    e.stopPropagation();
                    let notificationItem = deleteBtn.closest('.notification-item');
                    let notificationId = notificationItem.dataset.id;
                    
                    try {
                        let response = await fetch(`https://event-management-server-ruddy.vercel.app/notifications/${notificationId}`, {
                            method: 'DELETE'
                        });
                        
                        if (response.ok) {
                            notificationItem.remove();
                            await updateNotificationBadge();
                            
                            let remainingNotifications = notificationPanel.querySelectorAll('.notification-item');
                            if (remainingNotifications.length === 0) {
                                notificationPanel.remove();
                                // Don't reset navigation when all notifications are deleted
                            }
                        }
                    } catch (error) {
                        console.error('Error deleting notification:', error);
                    }
                }
            });
        } catch (error) {
            console.error('Error loading notifications:', error);
        }
    }

    function handleOutsideClick(e) {
        if (!notificationPanel.contains(e.target) && !e.target.closest('.notification')) {
            notificationPanel.remove();
            document.removeEventListener('click', handleOutsideClick);
            // Don't reset navigation when clicking outside
        }
    }

    notificationPanel.className = 'notifications-panel';
    loadNotifications();
    document.body.appendChild(notificationPanel);
    
    setTimeout(() => {
        document.addEventListener('click', handleOutsideClick);
    }, 100);

    return notificationPanel;
}

// Modify the notification tab click handler
document.addEventListener('DOMContentLoaded', () => {
    const notificationTab = document.querySelector('.notification');
    if (notificationTab) {
        notificationTab.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            const existingPanel = document.querySelector('.notifications-panel');
            
            if (existingPanel) {
                existingPanel.remove();
            } else {
                createNotificationsPanel();
            }
        });

        // Initialize notification badge
        updateNotificationBadge();
    }
});


function createOptionsMenu() {
    const optionsButton = document.querySelector('.optionalSetting');
    // Make the button container relative
    optionsButton.style.position = 'relative';
    
    const menu = document.createElement('div');
    menu.className = 'options-menu';
    menu.innerHTML = `
        <ul>
            <li class="default-option">Default</li>
            <li class="trash-option">Trash</li>
        </ul>
    `;
    
    let isTrashView = false;

    // Function to position the menu
    function positionMenu() {
        // Position the menu relative to its container
        menu.style.position = 'absolute';
        menu.style.top = '100%'; // Position below the button
        menu.style.left = '0';
    }

    optionsButton.onclick = (e) => {
        e.stopPropagation();
        const existingMenu = document.querySelector('.options-menu');
        
        if (existingMenu) {
            existingMenu.remove();
        } else {
            optionsButton.appendChild(menu); // Append to button instead of body
            positionMenu();
        }
    };

    menu.querySelector('.default-option').onclick = () => {
        isTrashView = false;
        fetchEvents();
        resetFilters();
        menu.remove();
    };

    menu.querySelector('.trash-option').onclick = async () => {
        isTrashView = true;
        try {
            const response = await fetch('https://event-management-server-ruddy.vercel.app/trash');
            const trashItems = await response.json();
            renderTrashView(trashItems);
            menu.remove();
        } catch (error) {
            console.error('Error fetching trash:', error);
        }
    };

    // Add styles to ensure menu appears above other elements
    menu.style.zIndex = '1000';

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !optionsButton.contains(e.target)) {
            menu.remove();
        }
    });

    // Add window resize handler to reposition menu if needed
    window.addEventListener('resize', () => {
        const existingMenu = document.querySelector('.options-menu');
        if (existingMenu) {
            positionMenu();
        }
    });
}

function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('dateFilter').value = 'all';
    document.getElementById('statusFilter').value = 'all';
    document.getElementById('sortOrder').value = 'original';
    applyFilters();
}

function renderTrashView(trashItems) {
    const tbody = document.getElementById('eventsTableBody');
    tbody.innerHTML = '';

    trashItems.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${formatDate(item.date)}</td>
            <td>${Array.isArray(item.speaker) ? item.speaker.join(', ') : item.speaker}</td>
            <td>
                <button class="restore-btn" data-name="${item.name}">Restore</button>
                <button class="permanent-delete-btn" data-name="${item.name}">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Add event listeners for restore and delete buttons
    tbody.querySelectorAll('.restore-btn').forEach(btn => {
        btn.onclick = async (e) => {
            const eventName = e.target.dataset.name;
            try {
                const response = await fetch(`https://event-management-server-ruddy.vercel.app/trash/${eventName}`);
                if (response.ok) {
                    await fetchEvents();
                }
            } catch (error) {
                console.error('Error restoring event:', error);
            }
        };
    });

    tbody.querySelectorAll('.permanent-delete-btn').forEach(btn => {
        btn.onclick = async (e) => {
            const eventName = e.target.dataset.name;
            if (confirm('Are you sure you want to permanently delete this event? This action cannot be undone.')) {
                try {
                    const response = await fetch(`https://event-management-server-ruddy.vercel.app/trash/${eventName}`, {
                        method: 'DELETE'
                    });
                    if (response.ok) {
                        await fetchEvents();
                        updateNotificationBadge();
                    }
                } catch (error) {
                    console.error('Error deleting event:', error);
                }
            }
        };
    });
}

// Helper function for formatting relative time
function formatRelativeTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

// Initialize features
document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers for event rows
    document.getElementById('eventsTableBody').addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        if (row) {
            const eventIndex = row.dataset.id;
            if (eventIndex !== undefined) {
                createModal(filteredEvents[eventIndex]);
            }
        }
    });

    // Initialize notifications
    const notificationTab = document.querySelector('.notification');
    notificationTab.addEventListener('click', () => {
        createNotificationsPanel();
    });
    updateNotificationBadge();

    // Initialize options menu
    createOptionsMenu();
});


function createModal(event) {
    const modal = document.createElement('div');
    modal.className = 'event-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-view">
                <h2>${event.name}</h2>
                <p class="event-date">${formatDate(event.date)}</p>
                <p class="event-description">${event.description}</p>
                
                <div class="speakers-attendees">
                    <div class="avatars">
                        ${Array.isArray(event.speaker) ? 
                            event.speaker.map(() => `
                                <div class="avatar-circle"></div>
                            `).join('') : 
                            '<div class="avatar-circle"></div>'
                        }
                    </div>
                    <p>${Array.isArray(event.speaker) ? event.speaker.length : 1} Guest Speakers</p>
                    <p>${event.attendees || 0} Attendees</p>
                </div>
                
                <div class="modal-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                    <button class="mark-completed-btn">Mark as completed</button>
                </div>
            </div>

            <div class="modal-edit-form" style="display: none;">
                <h2>Edit Event</h2>
                <form id="editEventForm">
                    <div class="form-group">
                        <label for="editName">Event Name</label>
                        <input type="text" id="editName" name="name" value="${event.name}" required>
                    </div>
                    <div class="form-group">
                        <label for="editDate">Date</label>
                        <input type="date" id="editDate" name="date" value="${formatDate(event.date)}" required>
                    </div>
                    <div class="form-group">
                        <label for="editLocation">Location</label>
                        <input type="text" id="editLocation" name="location" value="${event.location || ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="editDescription">Description</label>
                        <textarea id="editDescription" name="description" required>${event.description}</textarea>
                    </div>
                    <div class="form-group">
                        <label for="editSpeakers">Speakers (comma-separated)</label>
                        <input type="text" id="editSpeakers" name="speaker" 
                               value="${Array.isArray(event.speaker) ? event.speaker.join(', ') : event.speaker || ''}" 
                               required>
                    </div>
                    <div class="form-group">
                        <label for="editStatus">Status</label>
                        <select id="editStatus" name="status">
                            <option value="Upcoming" ${event.status === 'Upcoming' ? 'selected' : ''}>Upcoming</option>
                            <option value="In Progress" ${event.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                            <option value="Completed" ${event.status === 'Completed' ? 'selected' : ''}>Completed</option>
                        </select>
                    </div>
                    <div class="edit-form-actions">
                        <button type="button" class="cancel-edit-btn">Cancel</button>
                        <button type="submit" class="save-edit-btn">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal handlers
    const closeX = modal.querySelector('.close-modal');
    const deleteBtn = modal.querySelector('.delete-btn');
    const markCompletedBtn = modal.querySelector('.mark-completed-btn');
    const editBtn = modal.querySelector('.edit-btn');
    const cancelEditBtn = modal.querySelector('.cancel-edit-btn');
    const modalView = modal.querySelector('.modal-view');
    const modalEditForm = modal.querySelector('.modal-edit-form');
    const editForm = modal.querySelector('#editEventForm');

    // Close modal functionality

    // Close modal functionality
    const closeModal = () => {
        modal.remove();
    };

    
    closeX.onclick = closeModal;


    // Delete event handler
    deleteBtn.onclick = async () => {
        try {
            const response = await fetch(`https://event-management-server-ruddy.vercel.app/event/${event.name}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                updateNotificationBadge();
                await fetchEvents();
                modal.remove();
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    // Mark as completed handler
    markCompletedBtn.onclick = async () => {
        try {
            const response = await fetch(`https://event-management-server-ruddy.vercel.app/event/${event.name}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'Completed' })
            });
            
            if (response.ok) {
                await fetchEvents();
                modal.remove();
            }
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    // Edit button functionality
    editBtn.onclick = () => {
        modalView.style.display = 'none';
        modalEditForm.style.display = 'block';
    };

    // Cancel edit button
    cancelEditBtn.onclick = () => {
        modalView.style.display = 'block';
        modalEditForm.style.display = 'none';
    };

    // Edit form submission
    editForm.onsubmit = async (e) => {
        e.preventDefault();
        
        // Prepare form data
        const formData = {
            name: editForm.name.value,
            date: editForm.date.value,
            location: editForm.location.value,
            description: editForm.description.value,
            speaker: editForm.speaker.value.split(',').map(s => s.trim()),
            status: editForm.status.value
        };

        try {
            const response = await fetch(`https://event-management-server-ruddy.vercel.app/event/${event.name}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                await fetchEvents();
                modal.remove();
            } else {
                // Handle error response
                const errorData = await response.json();
                alert(`Error: ${errorData.error || 'Failed to update event'}`);
            }
        } catch (error) {
            console.error('Error updating event:', error);
            alert('Failed to update event. Please try again.');
        }
    };
}

