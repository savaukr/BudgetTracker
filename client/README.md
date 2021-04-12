Budgettracker - це застосунок для ведення власних витрат по даті.

Для запуску проекту на локальносу сервері спочатку склонуйте репозиторій і виконайте команди:

 	git clone https://github.com/savaukr/BudgetTracker.git

 	cd budgettracker
 	npm install

 	cd client 
 	npm install

 	cd ..

Створити у СУБД PostgresSql базу даних для проекту під назвою 'budgettracker' . У файлі sql/template.sql.txt знаходяться шаблони для створення таблиць базы даних PostgresSql.

У файлі config/default.js  пропишіть дані відповідно до створеної бази даних.

Запустіть в корні проекту npm run dev