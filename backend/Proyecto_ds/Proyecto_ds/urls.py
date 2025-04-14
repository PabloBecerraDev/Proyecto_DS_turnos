
from django.contrib import admin
from django.urls import include, re_path, get_resolver
from django.http import HttpResponse

def home(request):
    url_patterns = get_resolver().url_patterns

    links = ["<h2>Bienvenido a la página de inicio</h2><ul>"]
    for pattern in url_patterns:
        if hasattr(pattern, "pattern"):  # Evitar patrones no string
            url = pattern.pattern.regex.pattern.strip("^$")
            if url:  # Evitar la raíz "/"
                links.append(f'<li><a href="/{url}">{url}</a></li>')

    links.append("</ul>")
    return HttpResponse("".join(links))  # Retorna la lista de enlaces en HTML

urlpatterns = [
    re_path(r'^$', home, name='home'),  # Usamos `^$` para la raíz "/"
    re_path(r'^admin/', admin.site.urls),
    re_path(r'^puntoacceso/', include('apps.puntoAcceso.urls')),
    re_path(r'^ticket/', include('apps.ticket.urls')),
    re_path(r'^usuario/', include('apps.usuario.urls')),
    re_path(r'^usuariopuntoacceso/', include('apps.usuarioPuntoAcceso.urls'))
]
