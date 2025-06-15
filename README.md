# GoodEval

**Developer:** Blake Thollaug

**Stack:** Django stack (Django, Python, Pip, HTML, CSS, JavaScript)

## Introduction
GoodEval is a multi-page web app computational package composed of the GoodEval Calulator, its more advanced counterpart the GoodEval Evaluator powered by the Eval API, as well as a variety of form interfaces making use of the Eval API or dedicated scripts. The GoodEval Calculator is, as the name suggests, a calculator, offering calculation of arithmetic expressions by conventional operators and a compact selection of special functions via a skeuomorphic and themable graphical user interface. On the other hand, the Goodeval Evaluator offers a much more flexible and comprehensive functionality from a much more minimalistic interface. While both programs depend on string data, the GoodEval Evaluator takes this to its ultimate extent by beginning from a single string and performing string evaluation, whereas the Calculator uses buttons to create a problem structure that is solved when the equal button is pressed. The form interfaces offer a simplified and intuitive approach to utilizing the computational functionality of the Eval API, which also powers the string evaluation for the GoodEval Evaluator.

## The GoodEval Calculator: Feature Overview
Being a scientific grade calculator, the GoodEval Calulator is a computational software that can perform a wide array of mathematical problems by the inclusion of trigonomic, logarithmic, and summation special functions, as well as a few stochastic and rounding functions just for good measure. The calculator interface comes in 4 distinctive themes that may be switched between at any time using the top panel, where a history of previous calculations and a link to its about page can also be found. The calculator page element will scale to the dimenions of available screen space, such that the original dimensions of the element fill as much available space as possible without dimensional warping, so that the interface should be identical on all devices.

## The GoodEval Calculator: Modes
A shift button is available on the bottom row of the top buttons, which will cycle through each of the 4 shift modes and display the current shift mode on the mode indicator section in the top right corner of the calculator screen. In each shift mode, a different set of 6 special functions will be available on the top row of the top buttons. If the user wishes to edit the problem instead of re-entering the whole problem, they have several options. The first and simplest option is to use the backspace button to delete from the end to where the modification is to be made, make the modification, and re-enter everything after the modificaton. A second and most precise option is to toggle on the cursor mode. When cursor mode is active, the word cursor will appear in the mode indicator section. After toggling on cursor mode, navigate with the cursor arrows to just before where the modification is to be made, delete backward from the cursor position what need be removed, enter forward from the cursor position what need be added, and hit the equal button. The equal button will deactivate cusor mode on solve, so toggling off, while harmless, is unecessary unless the user wishes to continue to enter the problem in default mode after modification. A third and final option is to enter a temporary cursor mode using the cursor navigation arrows without toggling on the cursor mode, which will auto-magically handle the cursor mode activation and deactivation, while offering full functionality of the cursor mode.

## The GoodEval Calculator: Validation
Performing a wide array of mathematical problems--in systems terms, a dynamical system--comes with the problem of a subtantial number of invalid inputs. To correct for this, there are two stages of validation: pre-validation and post-validation. Pre-validation serves a context-relevant error to the user when they attempt to enter an invalid problem, whereas post-validation tests the problem only on equal button press to ensure that any modifications made during cursor mode won't prohibit the calculation process or else, as in pre-validation, serve a context-relevant error. The automatic formatting for superscript and subscript in the calculator screen can be broken in cursor mode, though, this should not affect the calculation process, as formatting is merely a way to provide user feedback for clarity about how that problem will be interpretted if it were properly entered.

## The GoodEval Evaluator: Feature Overview
Free from the graphical user interface constraints of the GoodEval Calculator, the GoodEval Evaluator offers a more comprehensive assortment of functionality powered by the Eval API. In order that the functionality remain extensible without over-processing, Eval API has a comprehensive system of modular bypasses that prevent running of functionality irrelevant to the expression that the Evaluator is tasked with solving. While advanced calculators are capable of complex calculation, same as the Evaluator, the user is required to endure the tedium of memorizing how to input such complex expressions in an arbitrary textual equivilent to mathematical notation. In contrast, the Evaluator maintains a convenient shorthand for longer or more complex expressions by involving keywords that access a multitude of built-in special functions.

## The Eval API: Evaluator Operation
Different from calculation of numeral data in real-time, string evaluation calculates with string data by way of data type conversion from string data to numeral data after the problem string has been created in its entirety. Numeral data types are limited to only numeral characters, and thus cannot accomodate special functions accessed by means of non-numeral characters. The Evaluator takes a problem string, the string is analyzed and structured, the structure is further analyzed and manipulated, and then parenthetically sectioned and solved.

## The GoodEval Operator: Feature Overview
The GoodEval Operator is a computational software for demonstrating the properties of mathematical operators over a variety of operands, e.g. quantities, sets, and domains or groups. It can be used to explore and compare operations either for pleasure or study or both.

## The GoodEval Operator: Operators
Mathematical operators are the generalization or abstraction of an arithemetic operation, such as addition or multiplication, and are important to understanding properties of operation by which operators may be compared and contrasted, then applied to respective domains of application. The arity of an operator is the number of quantities or mathematical objects involved in that operator's operation, and includes binary operators, which have two inputs, trinary operators, which have three inputs, and so on so forth. Operators with an arity of one either don't operate at all or operate at a higher arity with that same input, so that the operation doesn't truly have an arity of one. Binary operators are special in that they serve as foundation for more complex operators that may combine or extend their operation, so it is sufficient to create a computational technology for operators that only requires two inputs.

## Developer Resources

### Commands
 - start server                             : `$python manage.py runserver 8000`
 - stop server                              : `ctrl + c`
 - new project                              : `$django-admin startproject project-name`
 - new app                                  : `$python manage.py startapp app_name`
 - django version                           : `$python -m django --version`
 - activate venv                            : `$venv/Scripts/activate`
 - deactivate venv                          : `$deactivate`
 - activate virtualenv                      : `$pipenv shell`
 - deactivate virtualenv                    : `$exit`
 - run in virtualenv                        : `$pipenv run`
 - list pipenv installments                 : `$pipenv graph`
 - update static files                      : `$python manage.py collectstatic --noinput`
 - update Pipfile.lock                      : `$pipenv lock`
 - update requirements.txt                  : `$pip freeze > requirements.txt`
 - import pipfile from requirements.txt     : `$pipenv install -r path/to/requirements.txt`
 - heroku no static                         : `$heroku config:set DISABLE_COLLECTSTATIC=1`
 - heroku yes static                        : `$heroku config:unset DISABLE_COLLECTSTATIC`
 - heroku debug static                      : `$heroku config:set DEBUG_COLLECTSTATIC=1`
 - heroku no debug                          : `$heroku config:unset DEBUG_COLLECTSTATIC`
 - heroku push update                       : `$git push heroku main`

*REMINDER: add to Procfile once database is setup*
$release: python manage.py migrate$

*NOTE: Pipenv will automatically handle virtualenv enviroment activation. Virtual environement must be deactivated before pushing to git if running manually using venv/Scripts/activate.*

*NOTE: Virtual environment will be ignored in git commit by .gitignore, so it does not need to be deleted and recreated for every push to git.*

### Procedures

**Setup virtual environment (with venv)**
1) Navigate to root directory
2) run command: `$python -m venv venv`
3) run command: `$venv/Scripts/activate`
4) run command: `$python -m pip install --upgrade pip`
5) run command: `$pipenv install -r requirements.txt`
6) run command: `$python manage.py runserver 3000`

**Breakdown virtual environment**
1) run command (stop Django server if running): `$ctrl+c`
2) run command: `$python -m pip freeze > requirements.txt`
3) run command: `$deactivate`
4) delete virtual environment folder (venv)
