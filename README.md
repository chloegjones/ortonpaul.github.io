# MESC-Website
[Visit the site](https://ortonpaul.github.io)

## Upkeep
### Meet the Committee Section
By editing [committee.json](/committee.json), you can easily update who holds what position and the website will automatically rewrite the code for you! Never worked with JSON before? No worries! See the examples below to help get your grips.

#### Changing an Officer's Name or Major
If you need to change an officer's name or major, you can easily change it to go from this:
```
...
"exec": {
  "President": {
    "name": "Madame President",
    "major": "Civil Engineering"
  },
...
```
to this:
```
...
"exec": {
  "President": {
    "name": "Mister Presient",
    "major": "Biomedical Engineering & Information Technology"
  },
...
```
and let the code take care of the rest!

#### Adding Members to a Committee
To add new members to a committee, simply add more elements in the members array to go from this:
```
...
"members": [
  {
    "name": "Tom Pewter",
    "major": "Computer Science"
  }
]
...
```
to this:
```
...
"members": [
  {
    "name": "Tom Pewter",
    "major": "Computer Science"
  },
  {
    "name": "Kim Ickle",
    "major": "Cheimcal Engineering"
  }
]
...
```
Notice the added comma after the closing curly brace after Tom's major. The process can be undone to remove members!

#### Co-Committee Heads
Better implementation pending

### Adding Pictures for Officers
Whenever you need to add an officer's picture, simply add the file to [committeeHeadshots](/committeeHeadshots) with the format 

"**FirstName LastName.jpeg**" 

The spelling/format must match *exactly* what is in [committee.json](/committee.json)! In other words, in the above example with Madame President, "Madame President.jpeg" would work, but "MadamePresident.jpeg", "Madame President.png", "madame president.jpeg", or anything else would not!

### Google Calendar Events
In order to make sure all information is accessible and displayed correctly on the website, make sure you fill out all the fields highlighted below and attach meeting minutes when appropriate.

![Google Calendar Event Requirements](/misc/GoogleCalendar.png)
