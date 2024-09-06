# Semantic Scholar Paper Saver and Navigator

## Description
This userscript automates the process of saving papers and navigating through search result pages on Semantic Scholar. It's designed to work with Tampermonkey, a popular userscript manager for web browsers.

## Features
- Automatically saves papers to your Semantic Scholar library
- Navigates through multiple pages of search results
- Provides debug logging for easy troubleshooting

## Installation
1. Install Tampermonkey for your browser:
   - [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
   - [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)
   - [Safari](https://apps.apple.com/us/app/tampermonkey/id1482490089)

2. Click on the Tampermonkey icon in your browser and select "Create a new script"

3. Copy the entire script from the `semantic-scholar-saver.js` file in this repository and paste it into the Tampermonkey editor

4. Save the script (File > Save or Ctrl+S)

## Usage
1. Go to [Semantic Scholar](https://www.semanticscholar.org/) and perform a search
2. The script will automatically start saving papers and navigating through pages
3. Monitor the browser console for debug information

## Configuration
You can adjust the waiting times in the script to fit your needs:
- Modify the `setTimeout` values to increase or decrease waiting times between actions

## Troubleshooting
If you encounter issues:
1. Check the browser console for debug messages
2. Ensure you're logged into Semantic Scholar
3. Verify that the page structure hasn't changed (which might require script updates)

## Contributing
Contributions, issues, and feature requests are welcome.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Disclaimer
This script is for educational purposes only. Use it responsibly and in accordance with Semantic Scholar's terms of service.
