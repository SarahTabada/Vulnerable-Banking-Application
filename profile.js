# Frontend Guide
### Quick Guide to the interworkings of the frontend

This is a simple HTML, JS, CSS frontend with Vite.
Also front end people you can change it if want. (Minus /src/backend - leave this alone)

### Terminology
Components - stuff in <> in HTML <br>
DOM - the tree of all the <> <br>
PS don't be scared by number of folders
This is to keep things small and organized not to be a burden



## Innerworkings Important Folders

This is a simple guide to understand the interworkings of the frontend <br>
Note you can pretty much change all of this.

### **/src/backend**
NOTE: DON'T CHANGE keep this stuff in a seperate folder the rest is changeable if you want <br>
Backend people look here for the connection stuff. <br>
Here is an example of stuff you could do <br>
```js
// src/data/api.js
export async function fetchUsers() {
  const res = await fetch("http://localhost:5000/api/users");
  return res.json();
}

// src/data/schemas.js
export const UserSchema = {
  name: "string",
  email: "string",
};

// src/data/store.js
export const store = {
  users: [],
  setUsers(data) {
    this.users = data;
  }
};
```

### **public/** - provided by vite
Static assets that don’t get bundled — served directly at the root. Recommend doing this for repeated images 
not used within specific components (including reusable ones), or ones that need the fixed path <br> 
For example:  <br>
`public/logo.png` → `http://localhost:80/logo.png` <br>


### **src/assets/**
Contains **CSS**, **fonts**, and **utility JS scripts** that are shared across components. <br>
Aka many page stuff like if a toolbar exist across things. <br>
Also things like time you need to keep consistent. <br>

Example:
```js
// src/assets/scripts/utils.js
export function formatDate(date) {
  return new Date(date).toLocaleDateString();
}
```

### **src/pages/**
Each file represents a major route or screen. <br>
These files import data and components to render full pages. <br> <br>

Example of complex combining:
```js
// src/pages/home.js
import { fetchUsers } from "../data/api.js";
import { userCard } from "../components/userCard.js";

export async function renderHome() {
  const users = await fetchUsers();
  document.querySelector("#app").innerHTML = users.map(userCard).join("");
}
```

### **src/tests**
Contains simple unit or DOM tests for your frontend logic. <br>
Aka test if something in the html. Example with vitest <br>
```js
// src/tests/userCard.test.js
import { describe, it, expect } from "vitest";
import { userCard } from "../components/userCard.js";

describe("userCard component", () => {
  it("renders user info correctly", () => {
    const mockUser = { name: "Alice", email: "alice@example.com" };
    const html = userCard(mockUser);

    expect(html).toContain("Alice");
    expect(html).toContain("alice@example.com");
  });
});
```

### /src/composables
Not already in there because not 100% necessary, but you could but global variables, functions, etc
all in one place. <br>
Example: 
```js
// A simple reactive counter for multiple components
export function useCounter(initial = 0) {
  let count = initial;

  return {
    getCount: () => count,
    increment: () => { count += 1 },
    decrement: () => { count -= 1 },
    reset: () => { count = initial }
  };
}
```



## Innerworkings Other Stuff

### **src/main.js**
Your app’s entry point — initializes the first page, imports styles, and sets up logic. <br>
First thing you see. I have already made this render the first page based on stuff <br>
Ex:
```js
import { renderHome } from "./pages/home.js";
import "./assets/styles/main.css";

document.addEventListener("DOMContentLoaded", () => {
  renderHome();
});
```

### **index.html**
This is the apps main entry point. Just kinda looks at /scr/main.js

### package.json & package-lock.json
These work together to contain all of your dependencies nice and neatly <br>

To add more simply run while inside the directory <br>
```
npm install [dependency]
``` 

