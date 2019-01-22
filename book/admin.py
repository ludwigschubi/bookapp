from django.contrib import admin
from .models import Book, BookAuthor, BookCategory, BookCopies, BookLanguage, BookPublisher, BookTopic , Loan

admin.site.register(BookAuthor)
admin.site.register(BookCategory)
admin.site.register(BookCopies)
admin.site.register(BookLanguage)
admin.site.register(BookPublisher)
admin.site.register(BookTopic)
admin.site.register(Book)
admin.site.register(Loan)