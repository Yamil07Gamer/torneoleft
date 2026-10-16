// Cargar la página por defecto cuando abra el sitio
document.addEventListener('DOMContentLoaded', () => {
    cargarPagina('paginas/default/index_D.html');
});

// Carga index_X.html dentro de <main>, y también su style_X.css y script_X.js
// (se deducen del nombre: index_F.html -> style_F.css / script_F.js)
function cargarPagina(url) {
    const mainContainer = document.getElementById('contenido_main');

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar la página: ' + response.statusText);
            }
            return response.text();
        })
        .then(html => {
            // Inyecta el contenido del otro archivo en el <main>
            mainContainer.innerHTML = html;
            cargarRecursos(url);
            marcarActivo(url);
            cerrarMenuMovil();
            window.scrollTo({ top: 0 });
        })
        .catch(error => {
            console.error('Error:', error);
            mainContainer.innerHTML = '<p class="alert alert-danger m-3">Error al cargar el contenido.</p>';
        });
}

// Reemplaza el css y js de la página anterior por los de la página actual
function cargarRecursos(url) {
    const cssUrl = url.replace('index_', 'style_').replace('.html', '.css');
    const jsUrl = url.replace('index_', 'script_').replace('.html', '.js');

    document.getElementById('css_pagina')?.remove();
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssUrl;
    link.id = 'css_pagina';
    document.head.appendChild(link);

    document.getElementById('js_pagina')?.remove();
    const script = document.createElement('script');
    script.src = jsUrl;
    script.id = 'js_pagina';
    document.body.appendChild(script);
}

// Resalta en el navbar la página que se está viendo
function marcarActivo(url) {
    document.querySelectorAll('#navbar_right .nav-link').forEach(a => {
        const activo = a.getAttribute('onclick')?.includes(url);
        a.classList.toggle('active', !!activo);
    });
}

// En móvil, cierra el menú desplegable después de elegir una sección
function cerrarMenuMovil() {
    const menu = document.getElementById('navbar_menu');
    if (menu.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
}

