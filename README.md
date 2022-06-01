# Teltonika Device Element I/O Data Sending Parameters ID Scraper

This simple scripts helps to scrape data sending parameters ID for Teltonika gps devices from Teltonika's official website.

## Instructions

In this project directory, you can run:

### `npm install`

To intall dependencies.

### `npm start`

To run the script.

Remember to specify name of the device that you want to scrape in `index.ts` file.

```javascript
import jsdom from "jsdom";
import axios from "axios";
const { JSDOM } = jsdom;

// specify device name here
const deviceName: string = "FMB920";

let dom: jsdom.JSDOM;
// ...
```

Scrapped data can be found inside the `output` directory.
