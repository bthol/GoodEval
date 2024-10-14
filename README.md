# GoodEval

**Developer:** Blake Thollaug

**Description:** GoodEval is a calulator application that makes use of string evaluation to perform its calculations. It evaluates arithmetic expressions and can calculate a multitude of special trigonomic and statistical functions by making use of keys in the problem string.

**Evaluator Operation:** Different from calculation of numeral data types in real-time, string evaluation calculates with string data by way of data type conversion from string data to numeral data after the string has been created in its entirety. Numeral data types are limited to only numeral characters, and thus cannot accomodate special functions accessed by non-numeral characters, which may be convenient shorthand for longer or more complex expressions. The evaluator takes a problem string, the string is analyzed and structured, the structure is manipulated for distribution and special functions, and then parenthetically sectioned and solved.

## The GoodEval API
The GoodEval API can be used to remotely access evaluation. The API takes a JSON format object containing a formatted problem string and a boolean value to toggle logs and returns a JSON format object with the received problem string, an answer numeral, and the logs if they were toggled on by a boolean value of true. Logs reveal the steps taken to calulate the answer from the problem. The user may pass the "info" key to get information on available keys and their associated functions, as well as a reference for what entities the evaluator recognizes in problem string syntax.

## Developer Resources

### Commands
 - start server     : $python manage.py runserver 3000
 - stop server      : ctrl + c
 - new project      : $django-admin startproject project-name
 - new app          : $python manage.py startapp app_name
 - django version   : $python -m django --version

*NOTE: Virtual environement must be deactivated before pushing to git.*

*NOTE: Virtual environment will be ignored in git commit by .gitignore, so it does not need to be deleted and recreated for every push to git.*

### Procedures

**Setup virtual environment**
1) Navigate to Boilerplate_Django_copy directory
2) run command: $python -m venv venv
3) run command: $venv/Scripts/activate
4) run command: $python -m pip install --upgrade pip
5) run command: $pip install -r requirements.txt
6) run command: $python manage.py runserver 3000

**Breakdown virtual environment**
1) run command (stop Django server if running): $ctrl+c
2) run command: $python -m pip freeze > requirements.txt
3) run command: $deactivate
4) delete virtual environment folder (venv)

add to Procfile once database is setup
release: python manage.py migrate