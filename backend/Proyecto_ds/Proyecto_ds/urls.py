"""
URL configuration for Proyecto_ds project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path, get_resolver
from django.http import HttpResponse

def home(request):
    url_patterns = get_resolver().url_patterns

    links = []
    for pattern in url_patterns:
        if hasattr(pattern, "pattern"):
            url = str(pattern.pattern).strip("/")
            if url:  # evitar la raíz "/"
                links.append(f'<li><a href="/{url}">{url}</a></li>')

    html = f"""
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Inicio del Backend</title>
        <style>
            body {{
                background: #f5f7fa;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                height: 100vh;
                margin: 0;
                padding: 20px;
            }}
            h1 {{
                color: #333;
                margin-bottom: 10px;
            }}
            p {{
                color: #666;
                margin-bottom: 20px;
            }}
            ul {{
                list-style-type: none;
                padding: 0;
                width: 100%;
                max-width: 600px;
            }}
            li {{
                background: #fff;
                margin: 10px 0;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                transition: transform 0.2s, box-shadow 0.2s;
            }}
            li:hover {{
                transform: translateY(-3px);
                box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
            }}
            a {{
                text-decoration: none;
                color: #007bff;
                font-weight: bold;
                font-size: 18px;
            }}
            a:hover {{
                color: #0056b3;
            }}
        </style>
    </head>
    <body>
        <h1>🎯 Bienvenido al Backend</h1>
        <p>Accesos rápidos a las rutas disponibles:</p>
        <ul>
            {''.join(links)}
        </ul>
    </body>
    </html>
    """

    return HttpResponse(html)

urlpatterns = [
    path('', home, name='home'),  
    path('admin/', admin.site.urls),
    path('users/', include('apps.users.urls')),
    path('tickets/', include('apps.tickets.urls')),
    path('puntosacceso/', include('apps.puntosAcceso.urls')),
]