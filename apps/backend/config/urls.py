from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from apps.accounts.views import UserViewSet
from apps.core.views import DepartmentViewSet, EmployeeViewSet

from apps.recruitment.views import JobPostingViewSet, CandidateViewSet, InterviewScheduleViewSet
from apps.attendance.views import AttendanceRecordViewSet
from apps.leave.views import LeaveRequestViewSet, LeaveBalanceViewSet
from apps.payroll.views import PayrollRecordViewSet
from apps.performance.views import PerformanceReviewViewSet
from apps.documents.views import DocumentViewSet
from apps.events.views import EventViewSet
from apps.schedules.views import ScheduleViewSet
from apps.analytics.views import DashboardViewSet, AnalyticsViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'departments', DepartmentViewSet)
router.register(r'employees', EmployeeViewSet)
router.register(r'jobs', JobPostingViewSet)
router.register(r'candidates', CandidateViewSet)
router.register(r'interviews', InterviewScheduleViewSet)
router.register(r'attendance', AttendanceRecordViewSet)
router.register(r'leaves', LeaveRequestViewSet)
router.register(r'leave-balances', LeaveBalanceViewSet)
router.register(r'payroll', PayrollRecordViewSet)
router.register(r'performance', PerformanceReviewViewSet)
router.register(r'documents', DocumentViewSet)
router.register(r'events', EventViewSet)
router.register(r'schedules', ScheduleViewSet)
router.register(r'dashboard', DashboardViewSet, basename='dashboard')
router.register(r'analytics', AnalyticsViewSet, basename='analytics')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    
    # Auth
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/verify/', TokenVerifyView.as_view(), name='token_verify'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
