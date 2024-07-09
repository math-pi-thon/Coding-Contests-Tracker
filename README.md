# Coding Contest Tracker

## Overview

The **Coding Contest Tracker** is a browser extension designed for competitive programmers. It helps you stay updated with upcoming and ongoing coding contests from popular platforms such as Codeforces, CodeChef, AtCoder, and LeetCode. With this extension, you can easily filter contests by type and platform, and even add them to your Google Calendar.

## Features

- **Upcoming and Ongoing Contests:** Quickly switch between viewing upcoming and ongoing contests.
- **Platform Filters:** Filter contests by your favorite platforms: Codeforces, CodeChef, AtCoder, and LeetCode.
- **Contest Details:** View contest names, start dates, durations, and direct links to contest pages.
- **Add to Calendar:** Easily add contests to your Google Calendar to ensure you never miss a challenge.

## Demo

Check out the video demo of the Coding Contest Tracker extension:

[![Coding Contest Tracker Demo](https://img.youtube.com/vi/0bMK_ahhXn4/0.jpg)](https://www.youtube.com/watch?v=0bMK_ahhXn4)

## Installation

1. Download the repository from GitHub:
   - Go to the [GitHub repository](https://github.com/math-pi-thon/Coding-Contests-Tracker).
   - Click on the green "Code" button and select "Download ZIP".
   - Extract the downloaded ZIP file to a location on your computer.

2. Load the extension in your browser:
   - Open Chrome and go to `chrome://extensions/`.
   - Enable "Developer mode" (top right corner).
   - Click "Load unpacked" and select the extracted folder.

## Usage

1. Click on the extension icon in the browser toolbar.
2. The popup will display upcoming contests by default.
3. Use the buttons to switch between "Upcoming" and "Ongoing" contests.
4. Use the filter buttons to view contests from specific platforms.
5. Click on a contest name to visit the contest page.
6. Use the "Add to Calendar" button to add the contest to your Google Calendar.

## Files

- **manifest.json**: Contains the extension metadata.
- **popup.html**: The HTML structure for the extension's popup.
- **popup.js**: The JavaScript code for fetching and displaying contests.
- **styles.css**: The CSS styles for the extension.
- **images/**: Folder containing the icons for the extension and platform logos.

## API Key

To fetch contest data, this extension uses the CLIST API. You need to obtain an API key from [CLIST](https://clist.by/) and add it to the `popup.js` file:

1. Sign up or log in to [CLIST](https://clist.by/).
2. Go to your profile and find your API key.
3. In `popup.js`, replace `your_api_key` with your actual API key:

```javascript
let apiUrl = `https://clist.by/api/v4/json/contest/?username=yourusername&api_key=your_api_key`;
```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
