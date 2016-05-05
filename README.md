
# Project Four: Capstone: Full-Stack Application:

## _melody_
##### an app that allows users to search for other musicans
![Caspian](http://s32.postimg.org/oevv7tn0l/Screen_Shot_2016_05_05_at_5_06_38_PM.png)
----------------

**Author:** Alex Kim

**Node.js, Express.js, and MongoDB** are the core technologies used in this project. HTML and LESS were implemented in styling the pages.

This project is a **full-stack** application.

----------
**Project Requirements**
 The app must:
 - Build a full-stack application by making your own backend and your own front-end
 - Have an API of your design
 - Have an interactive front-end, preferably using a modern front-end framework
 - Be a complete product, which most likely means multiple relationships and CRUD functionality for at least a couple models
 - Use a database, whether that's one we've covered in class or one you want to learn
 - Implement thoughtful user stories that are significant enough to help you know which features to build and which to scrap
 Have a visually impressive design to kick your portfolio up a notch and have something to wow future clients & employers
 - Be deployed online so it's publicly accessible

**How Requirements Were Met**
- The app has a fully developed backend with CRUD functionality
- The front-end provides several functional options for the user
  - While not all wireframes were completed, all information is visible
  - A modern framework was not used due to time & completion constraints
- **MongoDB** and Mongoose were used to store user data and profile information
- You may register and log in.
  - Authorization flow: You can only login after you register.
  - Passwords are hashed using BCrypt.
- Clean code was used. Thus, it was happy code.
- [Available online here](melody-app.herokuapp.com)

The App
------------
Synopsis:
Melody is a place for musicians to find each other.

Musicians often enjoy being part of the music scene around them, but it can often be difficult to find other musicians when not playing regularly, or being away from school or the professional scene.

Melody allows its users to browse through an archive of musicians' profiles and save others as favorites for possible contact.
br No longer should you need to worry about finding other musicians in your area!

Wishlist
-------
![original wish list](http://s32.postimg.org/owrm5nv0l/featurewishlist.jpg)

Wireframe
--------
original wireframes:
![Wireframe](http://s32.postimg.org/jvf676h8l/wireframe.jpg)

original profile wireframe:
![wireframe2](http://s32.postimg.org/quu59af2d/profilewireframe1.jpg)

CRUD
------------
![Crud](http://s32.postimg.org/mfehc9wat/crud.png)

controllers
-----------
![cont](http://s32.postimg.org/b2qee4w5h/userroutes.jpg)
![cont2](http://s32.postimg.org/3v1qlk2bp/routelist.jpg)

Design Assets
--------
I built a simple UI that is very clean for quick reading. After several different trials, I selected Bootstrap to style pages, with heavy customization. Additionally, I used [Unsplash](unsplash.com) as a resource for royalty-free stock imagery and [Google Fonts](https://www.google.com/fonts) for typefaces.

Technologies Used
----------
- **Node.js, Express.js, & MongoDB** are the core technologies used in this project.

- Profile Picture Upload: Using file type input in HTML and 'onchange' event in JS. Simply put, this feature allows a user to upload an image for their profile pic. The image is then converted into *Base64*.

- Another feature borrowed was 'typed.js' [Available here](http://www.mattboldt.com/demos/typed-js/). This is used on the index page to mimic a human typing text for visual effects.


User Stories
-------------

High Priority: (required project scope)
- I need to be able to log in and create a profile
- I need to be able to browse other profiles that have been created

Medium Priority:
- I need to be able to change/update the information that I input.
- I want to be able to allow other users to view my information.
- I want to upload a picture of myself as a profile avatar.
- I want to be able to use this on different devices.
- I want to be able to save other musicians as favorites.

Low Priority
- I want the ability to message other users.
- I want to be able to search through users via keywords and other parameters.



### Unsolved Problems
- I did not finish building out the wireframes for the profile and browse pages
- Though the app is responsive, it is minimally responsive.
- This is more of a showcase of users, without opportunity to contact each other
- There is a large security flaw that I would prefer not to mention! Message me for it.























-------
