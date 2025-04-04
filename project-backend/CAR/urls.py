#API endpoints
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import(
    CarListCreateAPIView,
    CarDetailAPIView,
    CarImageAPIView,
    WishlistAPIView,
    CarComparisonAPIView,
    ReviewAPIView,
    MessageAPIView,
    SearchHistoryAPIView,
    TransactionAPIView,
    RegisterUserAPIView,
    LoginView,
    LogoutView,
    CarSalesReportPDF,
    ChatHistoryAPIView
    )
from .views import InitiatePaymentAPIView, PaymentSuccessAPIView, PaymentFailureAPIView
from .views import ContactAPIView
from .views import ReviewList, ReviewDetail

urlpatterns = [
    path('contact/', ContactAPIView.as_view(), name='contact_api'),  # Define the API endpoint
]

urlpatterns = [
    path('scs/register/', RegisterUserAPIView.as_view(), name='register'),
    path('scs/login/', LoginView.as_view(), name='login'),
    path('scs/logout/', LogoutView.as_view(), name='logout'),
    path('scs/cars/', CarListCreateAPIView.as_view(), name='car-list-create'),
    path('scs/cars/<str:pk>/',CarDetailAPIView.as_view(), name='car-detail'),
    path('scs/car-images/',CarImageAPIView.as_view(), name='car-image'),
    path('scs/wishlist/',WishlistAPIView.as_view(), name='wishlist'),
    path('scs/wishlist/<int:pk>/',WishlistAPIView.as_view(), name='wishlist-delete'),
    path('scs/car-comparison/',CarComparisonAPIView.as_view(), name='car-comparison'),
    path('scs/reviews/', ReviewList.as_view(), name='reviews'),
    path('scs/messages/', MessageAPIView.as_view(), name='messages'),
    path('scs/search-history/',SearchHistoryAPIView.as_view(), name='search-history'),
    path('scs/transactions/',TransactionAPIView.as_view(), name='transactions'),
    path('scs/chat-history/',ChatHistoryAPIView.as_view(), name='chat-history'),
    path('scs/reports/', CarSalesReportPDF.as_view(), name='car-sales-report'),

    # Paypal Paymeny
    path("payment/paypal/", InitiatePaymentAPIView.as_view(), name="paypal-payment"),
    path("payment/success/", PaymentSuccessAPIView.as_view(), name="payment-success"),
    path("payment/failure/", PaymentFailureAPIView.as_view(), name="payment-cancel"),

    # Send Message
    path('scs/contact/', ContactAPIView.as_view(), name='contact_api'),  # Define the API endpoint

]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)