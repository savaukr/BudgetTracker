# BudgetTracker
Додаток для відстеження бюджету

Front-end part
Implement the following user functions:
Implement user identification.
Note: we don’t insist on appropriate registration, it may be just an email field by which you can match the user from your database. If you can do an appropriate registration it gives you bonus points :)
Display user name in top right corner.
Calendar or date picker where the user can pick any date and see his spendings for that day.
Report spendings for an appropriate day of the month (category + amount).
Edit entries.
Delete entries.

Back-end part
Implement user identification. 
Create schemas for finance entries and users.
Create endpoints for CRUD operations.
Technical details
Use any desired front-end frameworks and libraries.
Use any desired back-end frameworks and libraries.
Use any database management system.
The application should be deployed and available through the internet.
The repository should contain a README file with a project set up instructions.

Bonus task
Create a link in the header to page “Monthly Report”.
On this page the user has
month picker - user chooses the month he wants to get a report for.
salary input - user puts in his salary for that month. If you have implemented user identification, take the salary from DB for the logged-in user.
Once all fields are filled in, show a table with the following columns - Income (salary input), Total Expenses (sum of user spendings for the picked month), and Difference.
Play with colors or maybe show some text/image to notify the user whether he is OK or not in spending money.



Для запуску проекту на локальносу сервері спочатку склонуйте репозиторій і виконайте команди:

 	git clone https://github.com/savaukr/BudgetTracker.git

 	cd budgettracker
 	npm install

 	cd client 
 	npm install

 	cd ..

Створити у СУБД PostgresSql базу даних для проекту під назвою 'budgettracker' .
У файлі sql/template.sql.txt знаходяться шаблони для створення таблиць базы даних PostgresSql. у файлі /config/default.json находяться налаштування для локального запуску проекту та бази даних.

Запустіть в корні проекту npm run dev