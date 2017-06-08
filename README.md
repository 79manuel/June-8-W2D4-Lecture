# Authentication

Authentication really encompasses three different areas:

* Authentication (making sure that your credentials are authentic)
* Identity (creating a personalized experience)
* Authorization (once we know who you are, should you be able to do what you're trying to do?)

## Cookies

Cookies add statefulness to HTTP.  Since every request happens without consideration for its history, cookies give us some persistence.  Remember:

* The browser sends all of the current cookies with each request
* The server only sends changes to cookies.

We can use express's `cookie(name, val)` and `clearCookie(name)` to set cookies, and the `cookie-parser` middleware to read cookies on the request.

The downside is that all the information is being transmitted and could be intercepted, and any information here needs to be transmitted every time.

## Sessions

Sessions are a different strategy closely linked to cookies.  Rather than passing user information on the cookie, the server creates a session on some form of memory.  This could be databases, local memory, or even cookies, but the main idea is that the cookie that is sent is a session ID, which means that the same cookie won't work different days.  We even use a secret for verification.

In this example, we use `cookie-session`, which uses cookies as its store.

## Password Hashing

One of the biggest vulnerabilities in a data-driven web app is the database.  Databases are frequently leaked for big web apps, and that means that the user credentials can be leaked.  *Hashing* is a form of encryption that can't be decrypted, just compared against a given string.  If we hash our passwords, then even if our database is stolen, it will still be difficult to crack.