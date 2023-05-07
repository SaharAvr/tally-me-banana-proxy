# 🍌 Tally Me Banana Proxy 🍌

![Banana Proxy](https://raw.githubusercontent.com/SaharAvr/tally-me-banana-proxy/main/assets/tally-me-banana-proxy-logo.png)

Tally Me Banana Proxy is a simple, lightweight, and powerful proxy server built with Node.js, Express, and Axios. It's designed to route HTTP requests through the proxy server, allowing you to bypass CORS and other issues that may arise. Perfect for web scraping or simply handling requests through a single point.

## 🚀 Features

- Easy to set up and use
- Supports all HTTP methods
- Handles both JSON and string data
- Lightweight and efficient

## 📦 Installation

To set up Tally Me Banana Proxy, simply clone the repository and install the required dependencies.

```bash
$ git clone https://github.com/your-username/tally-me-banana-proxy.git
$ cd tally-me-banana-proxy
$ npm install
```

## 🏃‍♂️ Running the server

To run the Tally Me Banana Proxy server, execute the following command:

```bash
$ npm start
```

The server will start listening on port `3001`. You can change this by modifying the `app.listen()` call at the bottom of the `index.js` file.

## 📚 Usage

To send requests through the Tally Me Banana Proxy server, make a POST request to the `/proxy` endpoint with the following JSON payload:

```json
{
  "url": "https://example.com",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json"
  },
  "data": {
    "key": "value"
  }
}
```

Replace the `url`, `method`, `headers`, and `data` properties with your desired values.

The server will respond with the following JSON payload:

```json
{
  "status": 200,
  "headers": {
    "Content-Type": "application/json"
  },
  "body": "{ \"key\": \"value\" }"
}
```

## 🔒 Security

Tally Me Banana Proxy should be used for development purposes only. It is not suitable for production use, as it may expose your server to security vulnerabilities. Always use a secure and trusted proxy solution for production environments.

## 📖 License

Tally Me Banana Proxy is released under the [MIT License](LICENSE).