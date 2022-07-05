# Calendoit

Check out or live [site](https://dhbw-ka-pm.github.io/tinf21b6-calendoit/)!

## Technologies
In the following we will describe different technologies we are using and why we chose them / which advantages they offer.

### SCSS
There are a lot of advantages of SCSS over CSS. 
- Easier to read the code as recurring lines are replaced with variables.
- Similar styles are put in groups which provides a better organisation.
- There are already variables for color, size etc. so you dont have to specify them all over again.
- The biggest advantage is the clarity which is provided through variables and mixins. They downsize the amount of code and make management easier.

### Angular
Angular is an open-source framework in which you can easily develop web applications with TypeScript due to its hierarchical architekture.
- Create your own reusable components which can also be combined like in a toolkit system. 
- As a user you can see your TypeScript code on the website and let it react on user input without writing code manually. Because of that you can easily import foreign librarys.
- The framework is based on components and services which can be seen like Lego blocks. Once you understood how to usw them, you will get a lot faster and more consistent.
- There are many other advantages like easy testing, code reduction and high compability.

### Calender with JSON
JSON is the representation of an JavaScript object. Despite being able to have different attributes, it can also contain functions. Those JSON objects are very important for the calender in order to provide dynamic calculations for the dates as static data could not examine dependencies from each other. This should prevent cyclic calls.

### Material Framework
The Material Framework is an interactive UI framework with predefined styles for different elements and many different useful functionalities like drag and drop, functions for tables etc.

## Information

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.1.
> Run `npm install --force` after checkout to install missing modules.
