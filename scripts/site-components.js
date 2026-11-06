// Shared navigation and heading for the main site. No build step required.
(() => {
    const links = [
        { page: 'about', label: 'ABOUT', href: 'index.html' },
        { page: 'projects', label: 'PROJECTS', href: 'projects.html' },
        {
            label: 'RESUME',
            href: 'https://drive.google.com/file/d/16Oulcq2B3p4C7GNfCu2MSObtMD3qfXMj/view?usp=sharing',
        },
    ];
    const siteRoot = new URL('../', document.currentScript.src);

    class SiteNav extends HTMLElement {
        connectedCallback() {
            const wrapper = document.createElement('div');
            wrapper.className = 'site-nav';
            const nav = document.createElement('nav');
            nav.setAttribute('aria-label', 'Main navigation');
            const list = document.createElement('ul');

            for (const { page, label, href } of links) {
                const item = document.createElement('li');
                const link = document.createElement('a');
                link.href = new URL(href, siteRoot).href;
                link.textContent = label;
                if (page && page === this.getAttribute('current-page')) {
                    link.setAttribute('aria-current', 'page');
                }
                item.append(link);
                list.append(item);
            }

            nav.append(list);
            wrapper.append(nav);
            this.replaceChildren(wrapper);
        }
    }

    class SiteHeader extends HTMLElement {
        connectedCallback() {
            const header = document.createElement('header');
            header.className = 'site-header';
            const heading = document.createElement('h1');
            heading.textContent = this.getAttribute('heading') || '';
            header.append(heading);
            this.replaceChildren(header);
        }
    }

    customElements.define('site-nav', SiteNav);
    customElements.define('site-header', SiteHeader);
})();
