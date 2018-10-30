# from django.shortcuts import render
# from book.models import Book, BookForm

# def home(request):
# 	if request.method == "POST":
# 		form = BookForm(request.POST)
# 		books = Book.objects.all()
# 		if form.is_valid():
# 			form.save()
# 	else: 
# 		form = BookForm()
# 		books = Book.objects.all()

# 	return render(request, "home.html", {"books": books, "form": form})
