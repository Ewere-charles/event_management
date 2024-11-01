class NavigationController{constructor(){this.menuItems=document.querySelectorAll(".menu_item"),this.activeIndex=0,this.transitionDuration=300,this.mediaQuery=window.matchMedia("(min-width: 768px)"),this.profile=document.querySelector(".profile div"),this.isCollapsed=!1,this.isMobileMenuOpen=!1,this.hamburgerBtn=document.getElementById("hamburger"),this.lastScreenSize=this.mediaQuery.matches,this.setActiveItem=this.setActiveItem.bind(this),this.handleCollapse=this.handleCollapse.bind(this),window.activeNav=e=>this.setActiveItem(e),this.setupEventListeners()}resetActiveStates(){this.menuItems.forEach(e=>{e.classList.remove("activeNav","sub_active","active_list")})}setupEventListeners(){window.addEventListener("resize",()=>this.handleResize()),this.menuItems.forEach((e,t)=>{e.removeAttribute("onclick"),(7!==t||this.mediaQuery.matches)&&e.addEventListener("click",()=>this.setActiveItem(t))}),this.hamburgerBtn&&this.hamburgerBtn.addEventListener("click",()=>this.toggleMobileMenu())}toggleMobileMenu(){let e=this.getElements();this.isMobileMenuOpen=!this.isMobileMenuOpen,this.hamburgerBtn&&(this.hamburgerBtn.innerHTML=this.isMobileMenuOpen?`<svg width="18" height="18" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.625 3.375L3.375 8.625" stroke="#334155" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M3.375 3.375L8.625 8.625" stroke="#334155" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
   </svg>`:`<svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1H4M17 1H8M17 11H14M1 11H10M1 6H17" stroke="#64748B" stroke-width="1.5" stroke-linecap="round"/>
   </svg>`),e.sideNav&&(e.sideNav.classList.remove("slide_out","slide_in"),this.isMobileMenuOpen?(e.sideNav.classList.add("active_side_nav"),this.applyActiveState(this.activeIndex)):(e.sideNav.classList.remove("active_side_nav"),this.resetActiveStates(),this.menuItems[this.activeIndex]?.classList.add("activeNav")))}handleCollapse(){if(!this.mediaQuery.matches)return;let e=this.getElements();this.isCollapsed=!this.isCollapsed,this.applyTransitions(e),this.updateElementStates(e,this.isCollapsed),this.resetActiveStates(),this.applyActiveState(this.activeIndex)}getElements(){return{menuItems:document.querySelectorAll(".menu_item"),collapseIcon:document.querySelector(".collapse svg"),themeBtn:document.querySelector(".themeToggle_wrapper"),profile:document.querySelector(".profile"),profileInfo:document.querySelector(".profile div"),logo:document.querySelector(".logo svg"),sideNav:document.querySelector(".side_nav"),mainSvg:document.querySelectorAll(".mainsvg"),subSvg:document.querySelectorAll(".subsvg"),collapse:document.querySelector(".collapse")}}applyTransitions(e){let t=`all ${this.transitionDuration}ms ease`;e.logo&&(e.logo.style.transition=t),e.profile&&(e.profile.style.transition=t),e.profileInfo&&(e.profileInfo.style.transition=t),e.collapseIcon&&(e.collapseIcon.style.transition="transform 0.3s ease"),e.menuItems.forEach(e=>{e.style.transition=t})}updateElementStates(e,t){this.mediaQuery.matches&&(e.sideNav&&(e.sideNav.classList.toggle("slide_out",t),e.sideNav.classList.toggle("slide_in",!t)),e.mainSvg.forEach(e=>{e.style.display=t?"none":"block"}),e.subSvg.forEach(e=>{e.style.display=t?"block":"none"}),e.menuItems.forEach((e,a)=>{let s=e.querySelector("span");7!==a&&(e.style.width=t?"32px":"100%",e.classList.toggle("bug",t),s&&(s.style.display=t?"none":"block"))}),e.logo&&(e.logo.style.width=t?"60px":"100px"),e.themeBtn&&(e.themeBtn.style.display=t?"none":"flex"),e.profile&&(e.profile.style.width=t?"50px":"100%"),e.profileInfo&&(e.profileInfo.style.display=t?"none":"block"),e.collapseIcon&&(e.collapseIcon.style.transform=t?"rotateY(-180deg)":"none"),e.collapse&&(e.collapse.style.justifyContent=t?"center":"start"))}setActiveItem(e){if(7!==e||this.mediaQuery.matches){if(7!==e){this.activeIndex=e;document.querySelectorAll(".section").forEach(e=>{e.style.display="none"});let t;switch(e){case 0:case 4:t=document.querySelector(".dashboard.section");break;case 1:t=document.querySelector(".Events_board");break;case 2:t=document.querySelector(".speakers_board");break;case 3:t=document.querySelector(".Report_board");break;case 5:t=document.querySelector(".messages_board");break;case 6:t=document.querySelector(".settings_board");break;case 8:t=document.querySelector(".profile_board")}t&&(t.style.display="flex")}this.resetActiveStates(),7===e?(this.handleCollapse(),7!==this.activeIndex&&this.applyActiveState(this.activeIndex)):this.applyActiveState(e)}}applyActiveState(e){let t=this.menuItems[e];t&&(this.mediaQuery.matches?this.isCollapsed?t.classList.add("sub_active"):t.classList.add("activeNav","active_list"):this.isMobileMenuOpen?t.classList.add("active_list"):t.classList.add("activeNav"))}handleResize(){let e=this.mediaQuery.matches;if(e!==this.lastScreenSize){window.location.reload();return}let t=this.getElements();e?(t.sideNav&&(t.sideNav.classList.remove("active_side_nav"),t.sideNav.style="",this.isCollapsed?t.sideNav.classList.add("slide_out"):t.sideNav.classList.add("slide_in")),this.isMobileMenuOpen=!1,this.hamburgerBtn&&(this.hamburgerBtn.innerHTML=`<svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1H4M17 1H8M17 11H14M1 11H10M1 6H17" stroke="#64748B" stroke-width="1.5" stroke-linecap="round"/>
</svg>`),t.collapse&&(t.collapse.style.display=""),this.updateElementStates(t,this.isCollapsed)):(t.sideNav&&t.sideNav.classList.remove("slide_in","slide_out"),t.mainSvg.forEach(e=>e.style.display="block"),t.subSvg.forEach(e=>e.style.display="none"),t.collapse&&(t.collapse.style.display="none")),this.resetActiveStates(),this.applyActiveState(this.activeIndex)}init(){document.querySelectorAll(".section").forEach(e=>{e.style.display="none"});let e=document.querySelector(".dashboard.section");e&&(e.style.display="flex"),this.handleResize(),this.setActiveItem(0)}}document.addEventListener("DOMContentLoaded",()=>{window.navController=new NavigationController,window.navController.init()});const getPreferredTheme=()=>localStorage.getItem("theme")||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),setTheme=e=>{document.documentElement.setAttribute("data-theme",e),localStorage.setItem("theme",e),document.querySelector(".theme-toggle").setAttribute("data-theme",e)};setTheme(getPreferredTheme());const themeToggle=document.querySelector(".theme-toggle");async function fetchData(e){try{let t=await fetch(e);if(!t.ok)throw Error(`HTTP error! Status: ${t.status}`);let a=await t.json();summarySection(a),registrationStat(a),latestNews(a.latestNews)}catch(s){console.error("Error fetching data:",s)}}function summarySection(e){let t=document.querySelector(".summary"),a=e.summary,s=document.createElement("div");s.classList.add("summary_wrapper"),t.appendChild(s),a.forEach(e=>{let t=document.createElement("div");t.classList.add("card");let a="-5.0%"!==e.percentage,i=a?`<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.5 7.16667V1.5H2.83333M8.33333 1.66667L1.5 8.5" stroke="#65DDB5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`:`<svg class="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5 5.83333V11.5H5.83333M11.3333 11.3333L4.5 4.5" stroke="#F43F5E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;t.innerHTML=`
<div>
<h3>${e.title}</h3>
<svg class='info' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 8.66666V9.99999" stroke="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8.33329 5.99999C8.33329 6.18409 8.18405 6.33332 7.99996 6.33332C7.81586 6.33332 7.66663 6.18409 7.66663 5.99999C7.66663 5.81589 7.81586 5.66666 7.99996 5.66666C8.18405 5.66666 8.33329 5.81589 8.33329 5.99999Z" stroke="white"/>
    <path d="M12.8333 7.99999C12.8333 10.6694 10.6693 12.8333 7.99996 12.8333C5.33058 12.8333 3.16663 10.6694 3.16663 7.99999C3.16663 5.33061 5.33058 3.16666 7.99996 3.16666C10.6693 3.16666 12.8333 5.33061 12.8333 7.99999Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</div>
<div>
<p>${e.rate}</p>
${i}
<span style="color: ${a?"#65DDB5":"#F43F5E"}">${e.percentage}</span>
</div>
`,s.appendChild(t)})}function registrationStat(e){let t=e.registration,a=document.getElementById("y_axis"),s=document.getElementById("stat"),i="";for(let n=10;n>=0;n--)n%2==0&&(i+=`<span>${100*n}</span>`);a.innerHTML=i;let r=e=>e/1e3*100;t.forEach(e=>{let t=document.createElement("div");t.classList.add("stat_wrapper"),t.innerHTML=`
<div class="stat_bars"><span  style="height: ${r(e.height)}%;"></span></div>
<span class="stat_month_lg">${e.monthLg}</span> <span class="stat_month_sm">${e.monthSm}</span>
`,s.appendChild(t)})}function latestNews(e){let t=document.querySelector(".slide_wrapper"),a=document.querySelector(".latest_news"),s=document.createElement("div");s.classList.add("controller");let i=document.createElement("div");i.classList.add("pagination_wrapper"),s.innerHTML=`
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
`,a.appendChild(s),a.appendChild(i),e.forEach((e,a)=>{let s=document.createElement("div");s.classList.add("slide"),0===a&&s.classList.add("active"),s.innerHTML=`
<img class="news_image" src="${e.newsImg}" alt="News Image ${a+1}">
<h3>${e.newsHeadline}</h3>
<p class="news_note">${e.newsNote}</p>
`;let n=document.createElement("span");n.classList.add("carousel_pagination"),i.appendChild(n),t.appendChild(s)});let n=0,r=t.querySelectorAll(".slide"),o=a.querySelectorAll(".carousel_pagination");function l(){r.forEach((e,t)=>{e.classList.toggle("active",t===n)}),o.forEach((e,t)=>{e.style.opacity=t===n?"1":"0.3"});let e=t.offsetWidth;t.style.transform=`translateX(-${e*n}px)`}document.querySelector("#next").addEventListener("click",function t(){n=(n+1)%e.length,l()}),document.querySelector("#prev").addEventListener("click",function t(){n=(n-1+e.length)%e.length,l()}),l()}themeToggle.addEventListener("click",()=>{setTheme("dark"===document.documentElement.getAttribute("data-theme")?"light":"dark")}),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",e=>{setTheme(e.matches?"dark":"light")}),fetchData("http://localhost:3000");let events=[],filteredEvents=[],eventsPerPage=10,currentPage=1;async function fetchEvents(){try{filteredEvents=[...events=await (await fetch("http://localhost:3000/event")).json()],applyFilters()}catch(e){console.error("Error fetching events:",e)}}function applyFilters(){let e=document.getElementById("searchInput").value.toLowerCase(),t=document.getElementById("dateFilter").value,a=document.getElementById("statusFilter").value,s=document.getElementById("sortOrder").value;filteredEvents=events.filter(s=>{let i=s.name.toLowerCase().includes(e),n=filterByDate(s.date,t),r=new Date(s.date),o=new Date,l=!1;switch(a){case"all":l=!0;break;case"upcoming":l=r>o&&"Completed"!==s.status&&"In Progress"!==s.status;break;case"Completed":l="Completed"===s.status;break;case"In Progress":l="In Progress"===s.status;break;default:l=s.status===a}return i&&l&&n}),sortEvents(s),updateResultsInfo(),currentPage=1,renderEvents(),renderPagination()}function filterByDate(e,t){if("all"===t)return!0;let a=new Date(e),s=new Date;switch(t){case"week":let i=new Date(s.getTime()-6048e5);return a>=i;case"month":let n=new Date(s.getTime()-2592e6);return a>=n;case"year":let r=new Date(s.getTime()-31536e6);return a>=r;default:return!0}}function updateResultsInfo(){document.getElementById("resultsInfo").textContent=`Displaying ${filteredEvents.length} results`}function sortEvents(e){filteredEvents.sort((t,a)=>{switch(e){case"recent":return new Date(a.date)-new Date(t.date);case"asc":return t.name.localeCompare(a.name);case"desc":return a.name.localeCompare(t.name);default:return 0}})}function renderEvents(){let e=document.getElementById("eventsTableBody");e.innerHTML="";let t=(currentPage-1)*eventsPerPage,a=Math.min(t+eventsPerPage,filteredEvents.length);filteredEvents.slice(t,a).forEach((t,a)=>{let s=new Date(t.date),i=new Date,n=t.status;s>i&&"Completed"!==n&&"In Progress"!==n&&(n="upcoming");let r=document.createElement("tr");r.setAttribute("data-id",a),r.classList.add("modalParent"),r.innerHTML=`
<td>${t.name}</td>
<td>${formatDate(t.date)}</td>
<td>${Array.isArray(t.speaker)?t.speaker.join(", "):t.speaker}</td>
<td><span class="status-badge status-${n.toLowerCase().replace(" ","")}">
<svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="3" cy="3" r="3"/>
</svg>
${n}</span></td>
`,e.appendChild(r)})}function formatDate(e){return new Date(e).toISOString().split("T")[0]}function renderPagination(){let e=document.getElementById("pagination"),t=Math.ceil(filteredEvents.length/eventsPerPage);e.innerHTML="";let a=document.createElement("button");a.innerHTML="&lt;",a.disabled=1===currentPage,a.addEventListener("click",()=>{currentPage>1&&(currentPage--,renderEvents(),renderPagination())}),e.appendChild(a);let s=[];(s=t<=4?Array.from({length:t},(e,t)=>t+1):currentPage<=2?[1,2,3,4]:currentPage>=t-1?[t-3,t-2,t-1,t]:[currentPage-1,currentPage,currentPage+1,currentPage+2]).forEach(t=>{let a=document.createElement("button");a.innerText=t,a.classList.toggle("active",t===currentPage),a.addEventListener("click",()=>{currentPage=t,renderEvents(),renderPagination()}),e.appendChild(a)});let i=document.createElement("button");i.innerHTML="&gt;",i.disabled=currentPage===t,i.addEventListener("click",()=>{currentPage<t&&(currentPage++,renderEvents(),renderPagination())}),e.appendChild(i)}function exportToPDF(){let{jsPDF:e}=window.jspdf,t=new e,a=filteredEvents.map(e=>{let t=new Date(e.date),a=new Date,s=e.status;return t>a&&"Completed"!==s&&"In Progress"!==s&&(s="upcoming"),{name:e.name,date:formatDate(e.date),speaker:Array.isArray(e.speaker)?e.speaker.join(", "):e.speaker,status:s}});t.setFontSize(16),t.text("Events History",14,15),t.setFontSize(10),t.text(`Generated on ${new Date().toLocaleDateString()}`,14,22),t.autoTable({columns:[{header:"Event Name",dataKey:"name"},{header:"Date",dataKey:"date"},{header:"Speaker",dataKey:"speaker"},{header:"Status",dataKey:"status"}],body:a,startY:25,styles:{fontSize:9},headStyles:{fillColor:[58,58,58]},alternateRowStyles:{fillColor:[250,250,250]},rowPageBreak:"avoid",theme:"grid",columnStyles:{name:{cellWidth:50},date:{cellWidth:30},speaker:{cellWidth:60},status:{cellWidth:30}},didDrawPage:function(e){t.setFontSize(8),t.text(`Page ${t.internal.getCurrentPageInfo().pageNumber}`,e.settings.margin.left,t.internal.pageSize.height-10)}}),t.save("events_history.pdf")}function createModal(e){let t=document.createElement("div");t.className="event-modal",t.innerHTML=`
<div class="modal-content">
<span class="close-modal">&times;</span>
<h2>${e.name}</h2>
<p class="event-date">${formatDate(e.date)}</p>
<p class="event-description">${e.description}</p>

<div class="speakers-attendees">
<div class="avatars">
    ${Array.isArray(e.speaker)?e.speaker.map(()=>`
            <div class="avatar-circle"></div>
        `).join(""):'<div class="avatar-circle"></div>'}
</div>
<p>${Array.isArray(e.speaker)?e.speaker.length:1} Guest Speakers</p>
<p>${e.attendees||0} Attendees</p>
</div>

<div class="modal-actions">
<button class="close-btn">Close</button>
<button class="delete-btn">Delete</button>
<button class="mark-completed-btn">Mark as completed</button>
</div>
</div>
`,document.body.appendChild(t),t.querySelector(".close-modal");let a=t.querySelector(".delete-btn"),s=t.querySelector(".mark-completed-btn");a.onclick=async()=>{try{(await fetch(`http://localhost:3000/event/${e.name}`,{method:"DELETE"})).ok&&(updateNotificationBadge(),await fetchEvents(),t.remove())}catch(a){console.error("Error deleting event:",a)}},s.onclick=async()=>{try{(await fetch(`http://localhost:3000/event/${e.name}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:"Completed"})})).ok&&(await fetchEvents(),t.remove())}catch(a){console.error("Error updating event:",a)}}}document.addEventListener("DOMContentLoaded",()=>{document.getElementById("searchInput").addEventListener("input",applyFilters),document.getElementById("dateFilter").addEventListener("change",applyFilters),document.getElementById("statusFilter").addEventListener("change",applyFilters),document.getElementById("sortOrder").addEventListener("change",applyFilters),document.getElementById("exportBtn").addEventListener("click",exportToPDF),document.getElementById("rowsPerPage").addEventListener("change",e=>{eventsPerPage=parseInt(e.target.value),currentPage=1,renderEvents(),renderPagination()}),fetchEvents()});let notificationCount=0;function createNotificationBadge(e){let t=e.querySelector(".notification-badge");return t||((t=document.createElement("span")).className="notification-badge",e.appendChild(t)),t}async function updateNotificationBadge(){try{let e=await (await fetch("http://localhost:3000/notifications")).json();notificationCount=e.length;let t=document.querySelector(".notification"),a=createNotificationBadge(t);return a.textContent=notificationCount,a.style.display="inline-block",e}catch(s){return console.error("Error fetching notifications:",s),[]}}function createNotificationsPanel(){let e=document.querySelector(".notifications-panel");e&&e.remove();let t=document.createElement("div");async function a(){try{let e=await (await fetch("http://localhost:3000/notifications")).json();t.innerHTML=`
<div class="notifications-header">
    <h3>Notifications</h3>
    <button class="close-notifications" aria-label="Close notifications">&times;</button>
</div>
<div class="notifications-list">
    ${e.map(e=>`   
        <div class="notification-item" data-id="${e.id}">
            <p>${e.message}</p>
            <div class="time_delete">
                <span class="notification-time">${formatRelativeTime(e.timestamp)}</span>
                <button class="delete-notification-btn" title="Delete notification">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF3366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        </div>
    `).join("")}
</div>
`;let a=t.querySelector(".close-notifications");a&&a.addEventListener("click",e=>{e.stopPropagation(),t.remove(),window.navController&&window.navController.setActiveItem(0)},{once:!0}),t.addEventListener("click",async e=>{let a=e.target.closest(".delete-notification-btn");if(a){e.stopPropagation();let s=a.closest(".notification-item"),i=s.dataset.id;try{if((await fetch(`http://localhost:3000/notifications/${i}`,{method:"DELETE"})).ok){s.remove(),await updateNotificationBadge();let n=t.querySelectorAll(".notification-item");0===n.length&&t.remove()}}catch(r){console.error("Error deleting notification:",r)}}})}catch(s){console.error("Error loading notifications:",s)}}function s(e){t.contains(e.target)||e.target.closest(".notification")||(t.remove(),document.removeEventListener("click",s))}return t.className="notifications-panel",a(),document.body.appendChild(t),setTimeout(()=>{document.addEventListener("click",s)},100),t}function createOptionsMenu(){let e=document.querySelector(".optionalSetting"),t=document.createElement("div");t.className="options-menu",t.innerHTML=`
<ul>
<li class="default-option">Default</li>
<li class="trash-option">Trash</li>
</ul>
`;let a=!1;function s(){let a=e.getBoundingClientRect();t.style.position="fixed",t.style.top=`${a.top}px`,t.style.left=`${a.right-t.offsetWidth}px`;let s=t.getBoundingClientRect();s.right>window.innerWidth&&(t.style.left=`${window.innerWidth-s.width-5}px`),s.top<0&&(t.style.top="5px")}e.onclick=e=>{e.stopPropagation();let a=document.querySelector(".options-menu");a?a.remove():(document.body.appendChild(t),s())},t.querySelector(".default-option").onclick=()=>{a=!1,fetchEvents(),resetFilters(),t.remove()},t.querySelector(".trash-option").onclick=async()=>{a=!0;try{let e=await (await fetch("http://localhost:3000/trash")).json();renderTrashView(e),t.remove()}catch(s){console.error("Error fetching trash:",s)}},t.style.zIndex="1000",document.addEventListener("click",a=>{t.contains(a.target)||e.contains(a.target)||t.remove()}),window.addEventListener("resize",()=>{document.querySelector(".options-menu")&&s()})}function resetFilters(){document.getElementById("searchInput").value="",document.getElementById("dateFilter").value="all",document.getElementById("statusFilter").value="all",document.getElementById("sortOrder").value="original",applyFilters()}function renderTrashView(e){let t=document.getElementById("eventsTableBody");t.innerHTML="",e.forEach((e,a)=>{let s=document.createElement("tr");s.innerHTML=`
<td>${e.name}</td>
<td>${formatDate(e.date)}</td>
<td>${Array.isArray(e.speaker)?e.speaker.join(", "):e.speaker}</td>
<td>
<button class="restore-btn" data-name="${e.name}">Restore</button>
<button class="permanent-delete-btn" data-name="${e.name}">Delete</button>
</td>
`,t.appendChild(s)}),t.querySelectorAll(".restore-btn").forEach(e=>{e.onclick=async e=>{let t=e.target.dataset.name;try{(await fetch(`http://localhost:3000/trash/${t}`)).ok&&await fetchEvents()}catch(a){console.error("Error restoring event:",a)}}}),t.querySelectorAll(".permanent-delete-btn").forEach(e=>{e.onclick=async e=>{let t=e.target.dataset.name;if(confirm("Are you sure you want to permanently delete this event? This action cannot be undone."))try{(await fetch(`http://localhost:3000/trash/${t}`,{method:"DELETE"})).ok&&(await fetchEvents(),updateNotificationBadge())}catch(a){console.error("Error deleting event:",a)}}})}function formatRelativeTime(e){let t=new Date(e),a=Math.floor((new Date-t)/1e3);return a<60?"just now":a<3600?`${Math.floor(a/60)}m ago`:a<86400?`${Math.floor(a/3600)}h ago`:`${Math.floor(a/86400)}d ago`}function createModal(e){let t=document.createElement("div");t.className="event-modal",t.innerHTML=`
<div class="modal-content">
<span class="close-modal">&times;</span>
<div class="modal-view">
<h2>${e.name}</h2>
<p class="event-date">${formatDate(e.date)}</p>
<p class="event-description">${e.description}</p>

<div class="speakers-attendees">
    <div class="avatars">
        ${Array.isArray(e.speaker)?e.speaker.map(()=>`
                <div class="avatar-circle"></div>
            `).join(""):'<div class="avatar-circle"></div>'}
    </div>
    <p>${Array.isArray(e.speaker)?e.speaker.length:1} Guest Speakers</p>
    <p>${e.attendees||0} Attendees</p>
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
        <input type="text" id="editName" name="name" value="${e.name}" required>
    </div>
    <div class="form-group">
        <label for="editDate">Date</label>
        <input type="date" id="editDate" name="date" value="${formatDate(e.date)}" required>
    </div>
    <div class="form-group">
        <label for="editLocation">Location</label>
        <input type="text" id="editLocation" name="location" value="${e.location||""}" required>
    </div>
    <div class="form-group">
        <label for="editDescription">Description</label>
        <textarea id="editDescription" name="description" required>${e.description}</textarea>
    </div>
    <div class="form-group">
        <label for="editSpeakers">Speakers (comma-separated)</label>
        <input type="text" id="editSpeakers" name="speaker" 
               value="${Array.isArray(e.speaker)?e.speaker.join(", "):e.speaker||""}" 
               required>
    </div>
    <div class="form-group">
        <label for="editStatus">Status</label>
        <select id="editStatus" name="status">
            <option value="Upcoming" ${"Upcoming"===e.status?"selected":""}>Upcoming</option>
            <option value="In Progress" ${"In Progress"===e.status?"selected":""}>In Progress</option>
            <option value="Completed" ${"Completed"===e.status?"selected":""}>Completed</option>
        </select>
    </div>
    <div class="edit-form-actions">
        <button type="button" class="cancel-edit-btn">Cancel</button>
        <button type="submit" class="save-edit-btn">Save Changes</button>
    </div>
</form>
</div>
</div>
`,document.body.appendChild(t);let a=t.querySelector(".close-modal"),s=t.querySelector(".delete-btn"),i=t.querySelector(".mark-completed-btn"),n=t.querySelector(".edit-btn"),r=t.querySelector(".cancel-edit-btn"),o=t.querySelector(".modal-view"),l=t.querySelector(".modal-edit-form"),d=t.querySelector("#editEventForm"),c=()=>{t.remove()};a.onclick=c,s.onclick=async()=>{try{(await fetch(`http://localhost:3000/event/${e.name}`,{method:"DELETE"})).ok&&(updateNotificationBadge(),await fetchEvents(),t.remove())}catch(a){console.error("Error deleting event:",a)}},i.onclick=async()=>{try{(await fetch(`http://localhost:3000/event/${e.name}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:"Completed"})})).ok&&(await fetchEvents(),t.remove())}catch(a){console.error("Error updating event:",a)}},n.onclick=()=>{o.style.display="none",l.style.display="block"},r.onclick=()=>{o.style.display="block",l.style.display="none"},d.onsubmit=async a=>{a.preventDefault();let s={name:d.name.value,date:d.date.value,location:d.location.value,description:d.description.value,speaker:d.speaker.value.split(",").map(e=>e.trim()),status:d.status.value};try{let i=await fetch(`http://localhost:3000/event/${e.name}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});if(i.ok)await fetchEvents(),t.remove();else{let n=await i.json();alert(`Error: ${n.error||"Failed to update event"}`)}}catch(r){console.error("Error updating event:",r),alert("Failed to update event. Please try again.")}}}document.addEventListener("DOMContentLoaded",()=>{let e=document.querySelector(".notification");e&&(e.addEventListener("click",e=>{e.stopPropagation();let t=document.querySelector(".notifications-panel");t?t.remove():createNotificationsPanel()}),updateNotificationBadge())}),document.addEventListener("DOMContentLoaded",()=>{document.getElementById("eventsTableBody").addEventListener("click",e=>{let t=e.target.closest("tr");if(t){let a=t.dataset.id;void 0!==a&&createModal(filteredEvents[a])}});document.querySelector(".notification").addEventListener("click",()=>{createNotificationsPanel()}),updateNotificationBadge(),createOptionsMenu()});