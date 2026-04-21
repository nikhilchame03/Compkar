from django.views.decorators.csrf import csrf_exempt
from django.contrib import admin
from django.urls import path
from graphene_django.views import GraphQLView

class AuthGraphQLView(GraphQLView):
    def get_context(self, request):
        return request

urlpatterns = [
    path('admin/', admin.site.urls),
    path('graphql/', csrf_exempt(AuthGraphQLView.as_view(graphiql=True))),
]
