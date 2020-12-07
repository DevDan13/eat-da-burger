# eat-da-burger

[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [test](#test)
* [Questions](#Questions)

## Description

eat-da-burger is a full stack web application that lets the user type and create a burger of their choice. Once they have their burger the user can devour it by clicking the devour button. Once  enjoyed th user can delete it and enjoy another burger if they so choose.

### Video Demo

<br>

![Video Demo](public/assets/gif/devour-hour.gif)

<br>


## Installation

```bash
npm install mysql express
```

## Usage 

The burger is inserted into the remote database and placed onto the devour section. This section contains the id of the burger, the burger name, and a devour button. Once clicked the burger has been devoured and moves to the delete section. here it looks almost the same as burgers in the devour section, however the devour button is replaced by the red delete button. Once clicked the burger is deleted on the page, as well as the remote database.

## License

This project's code is allowed to be "set free" using [The Unlicense](https://unlicense.org/).  This link provides all the details for the license.

## Contributing

No contributors worked along side me for this project. however I am always looking for contributors to make my code faster and stroger. Please visit my email and ask me any questions or concerns you may have.

## Test

To test and see if it works enter a burger and click submit. Then click the devour button that pops up. Clicking submit posts the data into the database. Its then using a GET request to display it into the proper section.  Clicking the devour button calls the PUT request to update the burger by making the devoured boolean field in the database to true.  The delete button is a DELETE request that deletes the burger from the database.
## Questions 

Please checkout my GitHub profile [DevDan13](https://github.com/DevDan13) for more of my work.

You can reach me at dan1397732@gmail.com.