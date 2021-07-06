# Overlook Hotel: A Hotel Booking Application

## Front-End Project by: [Beth Meeker](https://github.com/Meekb)

## Overview
  Overlook Hotel is a Turing School project allowing students to build a hotel booking application that tracks a customer's booking history and calculates the total cost of all bookings in the users history. New bookings are posted via fetch API, reducing the available rooms for a given book date.

## Construction
  
  * 4 Classes, each accompanied by a test file: Hotel, Room, Booking, Customer
  * Login page requires valid username and password (username: customer < 1 thru 50 > password: overlook2021)
  * Availability of room type changes with each booking POSTed
  * Aria labels for full accessibility 
  * Employed breakpoint at 1200px for responsive design enjoyable on desktop, or tablet
  * Deployment to GitHub Pages coming Soon!

Providing Incorrect Username or Password will throw an error!
![recording (15)](https://user-images.githubusercontent.com/76264735/124529565-1a566780-ddc8-11eb-8070-172d7fb96a70.gif)

Login and View Booking History. Trying to Book invalid checkin/checkout dates will throw an err!
![recording (16)](https://user-images.githubusercontent.com/76264735/124529760-74efc380-ddc8-11eb-9195-d99672f683a3.gif)

Going through the booking process with a valid room selection will generate a Confirmation number and a new Booking Card to review
![recording (17)](https://user-images.githubusercontent.com/76264735/124529971-d9128780-ddc8-11eb-95e2-dd03295d0248.gif)

Availability changes with every booking. If a room type is unavailable on the selected date, the user will receive an apology and be 
prompted to select a different room type, or adjust their dates
![recording (18)](https://user-images.githubusercontent.com/76264735/124530880-8fc33780-ddca-11eb-9f05-2e435b721851.gif)


## Tech Stack

<table>
  <tr>
    <td>JavaScript ES6</td>
    <td>Sassy CSS</td>
    <td>HTML</td>
    <td>Webpack</td>
    <td>Mocha & Chai</td>
  </tr>
  <tr>
    <td><img width="55" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/javascript.svg"/></td>
    <td><img width="55" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/sass.svg"/></td>
    <td><img width="55" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/html-5.svg"/></td>
    <td><img width="55" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/webpack.svg"/></td>
    <td><img width="55" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/mocha.svg"/><img width="55" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/chai.svg"/></td>
  </tr>
</table>


## Contributors

  Beth Meeker https://github.com/Meekb
  
  Project Manager:  
  Nik Seif https://github.com/niksseif
  
  Code Reviews:  
  Erica Spitz https://github.com/e-spitz  
  Taryn Martin https://github.com/tarynmartin
  
  Turing School of Software & Design https://frontend.turing.edu/projects/overlook.html

## Resources
  1. [MDN](https://developer.mozilla.org/en-US/)
  2. [CSS-tricks](https://css-tricks.com/)
  3. [gifcap](https://gifcap.dev/)
  4. [Turing School of Software & Design](https://turing.edu/)
