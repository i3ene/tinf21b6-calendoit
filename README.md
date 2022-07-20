# Calendoit

As a group of computer science students at the "DHBW Karlsruhe" it is our goal to make a calendar, which is able to plan your whole day.
We also want to make it as easily accessible as possible, that's why you don't need to download anything or register anywhere, you can just clickon this link to check out our [live site](https://dhbw-ka-pm.github.io/tinf21b6-calendoit/)!

### Product Idea
Since we as dual students (half time studying, half time working) know how hard it is to have a lot of appointments while simultaneously trying to keep up with the good habits, we decided to create something simple enought to be available in seconds, yet powerful enough to handle your everyday schedule with ease.
In this application, there are 2 different kinds of objects:

**Events** are mandatory meetings or appointments that may be either unique or repeating weekly on specific days of the week.
Events have a title, a start time and end time as well as a description.
If you set them to repeat themselves, you can choose on which days of the week they are meant to repeat and when they should stop repeating.

**Habits** are dynamic reaccuring events, which will completely get planned by our sophisticated algorithm to perfectly fit into your day.
They also have a title and a description, but the start end end time declare the time frame, in which this habit is supposed to take place.
You also set an ideal time and a duration so we can plan your perfect day.
Additionally, you are able to declare on when you want to stop that habit of yours.


The key idea is it, that our algorithm plans all your habits around the static events like meetings and appointments, even if you plan new events spontaniously or move another event. With a click onto the dashboard, you can see everything that is relevant for you for the current day such as the static events for today as well as the planned execution of habits.


### Product Vision
As Calendoit, we want to help bussy and stressed people by providing a simple yet powerful tool which which they can schedule their meetings for work and simultaneously keep track of their habits. 

We beliefe that this adds a significant value to peoples lifes, especially to those, who have problems getting things done.
In those cases we provide the someone or something which tells you exactly when to do what.

We want people to not break their habits because they "were to bussy latley" or because "they just didn't have any time".
Things like that don't exist. There is enough time in a day, you're just wasting most of it.

We are here to give you someting what's already yours, something extremely valuable:

**Your time**


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
- The framework is based on components and services which can be seen like Lego blocks. Once you understood how to use them, you will get a lot faster and more consistent.
- There are many other advantages like easy testing, code reduction and high compability.

### Calender with JSON
JSON is the representation of an JavaScript object. Despite being able to have different attributes, it can also contain functions. Those JSON objects are very important for the calender in order to provide dynamic calculations for the dates as static data could not examine dependencies from each other. This should prevent cyclic calls.

### Material Framework
The Material Framework is an interactive UI framework with predefined styles for different elements and many different useful functionalities like drag and drop, functions for tables etc.

## Feautures
### Allgemein
- Die Naviagationsleiste kann mit einem Klick auf der linken Seite der Oberen Leiste eingeklappt werden
- Das Color-Theme kann mit einem Klick auf der rechten Seite der Oberen Leiste zwische Dark- und Lightmode getoggelt werden
- In der Navigationsleiste kann zwischen den verschiedenen Elementen der Seite durch klicken gewechselt werden

### Dashboard
- Das Dashboard zeigt die Anstehenden Termine und Gewohnheiten des aktuellen Tages mit Uhrzeit und Beschreibung, so wie die aktiven Gewohnheiten mit ihrer Idealzeit, Zeiträumen und Wiederholungsrate als Übersicht an.
    - Zwischen Repeating und Deadline Gewohnheit und Termin wird hierbei mit XSLT dynamisch unteschieden
- Über den Button "Anzeigen" bei den aktuellen Terminen wird man auf das Kalender Element am aktuellen Tag verwiesen
- Über den Button "Anzeigen" bei den aktiven Gewohnheiten wird man auf das Planner Element verwiesen

### Kalender
- Termine können über den "+" Button angelegt werden
- Durch Klicken auf einen Tag öffnet sich im Kalender eine Übersicht über die Termine
- Durch Klicken auf einen Termin kann man diesen bearbeiten und auch löschen 
- Es können 3 Arten von Terminen angelegt werden
    -  Einmalige Termine
        - Kann per Drag&Drop in Größe angepasst werden und verschoben werden 
    -  Termine die sich bis zu einer Deadline an bestimmten Tagen wiederholen
          - Kann per Drag&Drop in größe Angepasst werden
    -  Termine die sich x-mal an bestimmten Tagen wiederholen
          - Kann per Drag&Drop in größe Angepasst werden
-  Die Hintergrundfarbe des Termins kann ausgewählt werden
-  Terminen kann ein Titel, eine Beschreibung und Zeiten gegeben werden
- Es kann zwischen Tages, Monats und Wochen Ansicht über das entsprechende Menü gewechselt werden
- Man kann über das Menü zu den vorherigen und nachfolgenden Zeitpunkten im Kalender navigieren

### Planner
- Im Planner Element können Gewohnheiten angelegt werden
- Hierbei kann man zwischen Wiederholenden und Deladline Events wählen
    - Deadlinegewohnheiten wiederholen sich bis zur Deadline an den ausgewählten Tagen
    - Wiederholungsgewohnheiten werden so viele Wochen wie im Feld angegeben wird wiederholt
- Die Gewohnheiten werden unter der Formular zum erstellen der Gewohnheiten in einer Tabelle angezeigt
     - Die Tage können auch in der Tabelle bearbeitet werden
     - Für weitere Bearbeitung kann man auf den Stift klicken und dann die entsprechende Gewohnheit im Formular bearbeiten
## Information

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.1.
> Run `npm install --force` after checkout to install missing modules.
