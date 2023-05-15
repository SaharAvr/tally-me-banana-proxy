# 🍌 Tally Me Banana Proxy 🍌

![Banana Proxy](https://raw.githubusercontent.com/SaharAvr/tally-me-banana-proxy/main/assets/tally-me-banana-proxy.png)

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

Tally Me Banana Proxy is a powerful, lightweight and easy-to-configure proxy server supporting both HTTP and TCP protocols. Designed with simplicity in mind, it provides a seamless way to proxy your incoming requests, with support for ngrok integration and examples on how to use it with popular tools such as curl and Puppeteer.

## Table of Contents
- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
  - [Creating the Proxy Server](#-creating-the-proxy-server)
  - [Exposing the Proxy Server to the Internet](#-exposing-the-proxy-server-to-the-internet)
  - [Examples](#-examples)
    - [Curl](#-curl)
    - [Puppeteer](#-puppeteer)
- [API](#-api)
- [Additional Usage](#-additional-usage)
- [Contributing](#-contributing)
- [License](#-license)

## 🌟 Features

Tally Me Banana Proxy boasts a range of features that make it a powerful and versatile tool for your proxy server needs:

- 🔥 **Supports HTTP and TCP protocols**: Easily switch between protocols to accommodate various use cases and requirements.

- ⚡ **Easy to set up and configure**: Simple installation and a user-friendly API make it a breeze to get your proxy server up and running.

- 🌐 **Integrated with ngrok**: Seamlessly expose your proxy server to the internet using ngrok, enabling remote access and collaboration.

- 📚 **Examples with curl and Puppeteer**: Comprehensive examples demonstrate how to use Tally Me Banana Proxy with popular tools, showcasing its adaptability.

- 🚀 **High performance and lightweight**: Designed for efficiency, the lightweight proxy server provides excellent performance without consuming excessive resources.

With these features at your disposal, Tally Me Banana Proxy is the perfect choice for a wide range of proxy server scenarios!

## 📦 Installation

Installing Tally Me Banana Proxy is a breeze! Follow these simple steps to get started:

1. **Install Node.js**: Before installing Tally Me Banana Proxy, make sure you have [Node.js](https://nodejs.org/en/download/) installed on your machine. We recommend using the LTS version for optimal compatibility.

2. **Install the package globally**: To install Tally Me Banana Proxy globally, open your terminal or command prompt and run the following command:

```bash
npm i -g tally-me-banana-proxy
```

This command installs the `tally-me-banana-proxy` package globally, making it accessible from anywhere on your machine.

3. **Verify the installation**: To ensure that Tally Me Banana Proxy has been installed correctly, run:

```bash
tally --version
```

And that's it! Tally Me Banana Proxy is now installed and ready to use. Head over to the [Usage](#usage) section to learn how to create and configure your proxy server.

## 🚀 Usage

### 🏗️ Creating the Proxy Server

To kickstart your own proxy server, simply use the `tally` command followed by the desired protocol and port number. Tally Me Banana Proxy supports both `http` and `tcp` protocols, providing you with versatility and flexibility.

For example, to create an HTTP proxy server on port 3000, run:

```bash
tally http 3000
```

To create a TCP proxy server on port 5050, run:

```bash
tally tcp 5050
```

After executing the command, your proxy server will be up and running, ready to proxy incoming requests!

### 🌐 Exposing the Proxy Server to the Internet

To make your proxy server accessible from the internet, you can use the powerful tool [ngrok](https://ngrok.com/download). Before proceeding, ensure that ngrok is installed and properly configured on your machine.

For an HTTP proxy server, expose it to the internet with the following command:

```bash
ngrok http 5050
```

For example, for a TCP proxy server, use the command:

```bash
ngrok tcp 5050
```

Once ngrok is running, it will provide you with a unique URL that can be used to access your proxy server from anywhere on the internet. This makes it incredibly easy to share and collaborate using your proxy server!

### 📚 Examples

In this section, we'll provide examples of how to use your Tally Me Banana Proxy server with popular tools such as curl and Puppeteer. These examples demonstrate the power and simplicity of using your proxy server in diverse scenarios.

#### 🌀 Curl

To harness your proxy server with curl, simply include the `-x` or `--proxy` flag followed by our http proxy URL.

```bash
tally http 3000
```
```bash
curl -x http://localhost:3000 https://wtfismyip.com/json
```

This command fetches the requested URL via your proxy server, allowing you to understand how your proxy server works in conjunction with curl.

#### 🎭 Puppeteer

To utilize your proxy server with the popular headless browser library Puppeteer, supply the `--proxy-server` flag with the ngrok URL when launching the browser.

```bash
tally tcp 5050
```
```bash
ngrok tcp 5050
```
```javascript
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: [`--proxy-server=socks5://<your-ngrok-url>`],
  });

  const page = await browser.newPage();
  await page.goto('https://wtfismyip.com/json', { waitUntil: 'networkidle2' });
  const content = await page.content();
  console.log(content);

  await browser.close();
})();
```

This script demonstrates how to use your proxy server with Puppeteer to fetch content from a webpage, showcasing the seamless integration of Tally Me Banana Proxy with headless browser automation.

## 📚 API

Tally Me Banana Proxy offers a simple and easy-to-use API, allowing you to integrate it into your projects seamlessly. The API consists of a single `listen` function that starts the proxy server, accepting the protocol, port, and a callback function as parameters.

### `listen(protocol: string, port: number, callback: (err?: Error) => void)`

- **protocol**: The protocol of the proxy server, either `'http'` or `'tcp'`.
- **port**: The port number on which the proxy server will listen.
- **callback**: A callback function that is called once the server starts listening or encounters an error.

#### Example:

```javascript
import tally from 'tally-me-banana-proxy';

const protocol = 'http';
const port = 3000;

tally.listen(protocol, port, (err) => {
  if (err) {
    console.log('[Tally Me Banana Proxy]:', err.message);
    process.exit(1);
  }
  console.log(`[Tally Me Banana Proxy]: ⚡⚡⚡ proxying ${protocol} requests on port ${port} ⚡⚡⚡`);
});
```

This example demonstrates how to use the `listen` function to start an HTTP proxy server on port 5050. Simply replace `protocol` and `port` with your desired values and enjoy the power of Tally Me Banana Proxy in your projects!

## 🌟 Additional Usage

Tally Me Banana Proxy is a versatile tool that can be adapted to a wide range of use cases. Here are some additional scenarios where it can be particularly helpful:

1. **🕵️ Web scraping with different IP addresses**: When scraping websites, it's essential to avoid being detected and blocked. By using Tally Me Banana Proxy, you can route your requests through different IP addresses, making it harder for websites to identify and block your scraper.

2. **🌍 Bypassing content restrictions**: Some websites enforce geo-restrictions or network limitations. With Tally Me Banana Proxy, you can route your requests through different proxy servers, granting access to otherwise restricted content.

3. **⚖️ Load balancing and traffic management**: Tally Me Banana Proxy can be used to balance the load among multiple servers, distributing incoming requests evenly and ensuring optimal server performance.

4. **🔒 Enhancing privacy and security**: By using Tally Me Banana Proxy, you can add an extra layer of privacy and security to your browsing experience. Your requests are routed through the proxy server, masking your IP address and making it more difficult for third parties to track your online activity.

5. **🎛️ API gateway**: Tally Me Banana Proxy can serve as a lightweight API gateway, consolidating multiple API endpoints behind a single domain and enabling you to route requests based on specific rules.

6. **🔧 Debugging and testing**: Tally Me Banana Proxy can be used as a debugging tool, allowing you to inspect and modify incoming and outgoing requests during development or testing.

Feel free to explore and adapt Tally Me Banana Proxy to your specific needs, and don't hesitate to share your unique use cases with the community!

## 💡 Contributing

We appreciate contributions to Tally Me Banana Proxy! To get started:

- Fork the [repository](https://github.com/SaharAvr/tally-me-banana-proxy) on GitHub.
- Clone your fork, create a new branch, and make your changes.
- Test your changes and ensure they don't introduce new issues.
- Commit and push your changes, then submit a pull request.

Thank you for helping us improve Tally Me Banana Proxy! 🎉

## 📄 License

Tally Me Banana Proxy is proudly released under the [MIT License](https://opensource.org/licenses/MIT). This permissive license allows you the freedom to use, modify, and distribute the software, making it an ideal choice for both personal and commercial projects.

By utilizing Tally Me Banana Proxy, you can confidently build and share your creations while respecting the open-source spirit of the software. Enjoy the benefits of this powerful proxy server with the assurance of a flexible and widely-accepted license!