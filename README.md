# GoodEval

**Developer:** Blake Thollaug

**Description:** GoodEval is a calulator web application that makes use of string evaluation to perform its calculations. It evaluates arithmetic expressions to produce a single value.

## Evaluator Operation
Different from calculation of numeral data types in real-time, string evaluation calculates with string data by way of data type conversion from string data to numeral data after the string has been created in its entirety. Numeral data types are limited to only numeral characters, and thus cannot accomodate special functions accessed by non-numeral characters. While advanced calculators are capable of complex calculation, same as the string evaluator, the user is required to endure the tedium of memorizing how to input such complex expressions. In contrast, GoodEval maintains a convenient shorthand for longer or more complex arithemetic expressions by involving keywords that access a multitude of built-in special functions. The evaluator takes a problem string, the string is analyzed and structured, the structure is further analyzed and manipulated for factoring, distribution and special functions, and then parenthetically sectioned and solved. In order that the functionality of the program remain extensible without over-processing, the program has a comprehensive system of modular bypasses that prevent running of functionality irrelevant to the expression the evaluator is tasked with solving.

## The GoodEval API
The GoodEval API can be used to remotely access string evaluation. The API takes a JSON format object containing a formatted problem string and a 1 to toggle logs on or a 0 to toggle logs off, and returns a JSON format object with the received problem string, an answer numeral, and the logs if they were toggled on. Logs reveal the steps taken to calulate the answer from the problem. The user may pass the "info" key to get information on available keys and their associated functionality, as well as a reference for what entities the evaluator recognizes in problem string syntax.

## Developer Resources

### Commands
 - start server             : $python manage.py runserver 8000
 - stop server              : ctrl + c
 - new project              : $django-admin startproject project-name
 - new app                  : $python manage.py startapp app_name
 - django version           : $python -m django --version
 - activate virtualenv      : $pipenv shell
 - deactivate virtualenv    : $exit
 - run in virtualenv        : $pipenv run
 - update Pipfile.lock      : $pipenv lock
 - update static files      : $python manage.py collectstatic --noinput
 - heroku no static         : $heroku config:set DISABLE_COLLECTSTATIC=1
 - heroku yes static        : $heroku config:unset DISABLE_COLLECTSTATIC
 - heroku debug static      : $heroku config:set DEBUG_COLLECTSTATIC=1
 - heroku no debug          : $heroku config:unset DEBUG_COLLECTSTATIC

*REMINDER: add to Procfile once database is setup*
$release: python manage.py migrate$

*NOTE: Pipenv will automatically handle virtualenv enviroment activation. Virtual environement must be deactivated before pushing to git if running manually using venv/Scripts/activate.*

*NOTE: Virtual environment will be ignored in git commit by .gitignore, so it does not need to be deleted and recreated for every push to git.*

### Procedures

**Setup virtual environment (with venv)**
1) Navigate to root directory
2) run command: $python -m venv venv
3) run command: $venv/Scripts/activate
4) run command: $python -m pip install --upgrade pip
5) run command: $pipenv install -r requirements.txt
6) run command: $python manage.py runserver 3000

**Breakdown virtual environment**
1) run command (stop Django server if running): $ctrl+c
2) run command: $python -m pip freeze > requirements.txt
3) run command: $deactivate
4) delete virtual environment folder (venv)
