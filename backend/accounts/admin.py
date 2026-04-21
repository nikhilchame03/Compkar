from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
	ordering = ("email",)
	list_display = ("email", "full_name", "is_admin", "is_staff", "is_active")
	list_filter = ("is_admin", "is_staff", "is_active")
	search_fields = ("email", "full_name")

	fieldsets = (
		(None, {"fields": ("email", "password")}),
		("Personal Info", {"fields": ("full_name",)}),
		("Permissions", {
			"fields": ("is_active", "is_admin", "is_staff", "is_superuser", "groups", "user_permissions")
		}),
		("Important Dates", {"fields": ("last_login",)}),
	)

	add_fieldsets = (
		(None, {
			"classes": ("wide",),
			"fields": ("email", "full_name", "password1", "password2", "is_admin", "is_staff", "is_active"),
		}),
	)
