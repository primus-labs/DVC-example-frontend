# Demo Workflow & Guidelines

This demo verifies if a user’s **“BNB Spot Trade History Volume”** on Binance over the last 30 days is **"greater than 100 USD"**.

**Demo Link:** link to be added.

### Prerequisites

•	You must install the appropriate test version of the browser extension. Two versions are available for this demo: **Kaito Edition** and **Buidlpad Edition**.

•	⚠️ **Important:** Only one extension can be enabled at a time. Whether it’s the Kaito Edition, Buidlpad Edition, or the native Primus extension, please ensure only one is active in your Chrome Extension Management settings. Enabling multiple versions simultaneously may cause conflicts and lead to incorrect verification results.

### Demo Workflow

After installing and enabling only the required extension in the Chrome browser, click the **[Start]** button on the demo page. The following steps will be executed automatically:

- **Step 1:**	The demo will open a Binance page and trigger the extension to verify the user’s BNB spot trade history over the last 30 days. Once the verification is complete, the Binance tab will close automatically, and you will be returned to the demo page.

- **Step 2:**	The encrypted verification result will be sent to the zkVM for privacy-preserving computation. The zkVM will calculate the total trading volume and compare it against 100 USD to determine whether the condition “greater than 100 USD” is met. The result will then be returned to the demo page.

### Additional Notes

•	After each step is completed, the corresponding result will be displayed under the **“Verified Result”** section.

•	For Step 1, the verified trade history can be viewed by clicking the “Spot 30-day BNB Trade History” card. By default, the verification data is encrypted. A **[Reveal Content]** button is provided to decrypt and display the plaintext data. This feature is included for demonstration purposes to clearly show the data being verified.

•	For Step 2, the zkVM computation result is available as a downloadable file. Click the "Computation Result" card to download the file and view the outcome locally.
