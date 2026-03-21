# Frontend Architecture – 4-Layer Model (React)

Ye note explain karta hai ek **simple aur scalable tarika** jisme React frontend ko **4 strict layers** me organize kiya jata hai.

```
UI (Presentation)
  ↓
Hooks (Orchestration)
  ↓
State (Memory)
  ↓
API (Backend Communication)
```

Matlab data aur logic ek direction me flow karta hai:

**UI → Hooks → State → API**

Har layer ka **sirf ek hi kaam hota hai**.
Agar layers ek dusre ka kaam karne lagti hain to **technical debt aur complexity badh jati hai**.

---

# Quick Overview (Read This First)

### What each layer is for (with example + real-life use case)

| Layer     | Simple Hinglish explanation                          |
| --------- | ---------------------------------------------------- |
| **UI**    | Screen show karta hai aur user input leta hai        |
| **Hooks** | Pure flow manage karta hai (API call + state update) |
| **State** | App ka data memory me store karta hai                |
| **API**   | Backend se baat karta hai (HTTP requests)            |

---

## UI Layer

Example:

```
onSubmit={() => login(email, pass)}
```

Real life:

* Login page
* Profile page
* Feed UI

Explanation:

UI ka kaam sirf:

* Screen render karna
* User input lena
* Hooks ko call karna
* Loading ya error show karna

---

## Folder Convention

Example structure:

```
features/
  auth/
    pages/
    components/
    hooks/
    store/
    services/
```

Explanation:

React project ko **feature-based folders** me divide karte hain.

Auth feature ke andar:

* pages → screens
* components → small UI pieces
* hooks → logic manager
* store → state
* services → API calls

---

# 1) UI Layer (Presentation Layer)

Location:

```
features/*/pages/
features/*/components/
```

Explanation:

Yaha **React components hote hain** jo UI show karte hain.

---

### Responsibility

UI ka kaam:

* UI render karna
* Form input handle karna
* Buttons click events handle karna
* Loading aur error show karna
* Page navigation

---

### UI must NOT

UI ko ye kaam **kabhi nahi karne chahiye**:

* API call
* cookies/localStorage access
* token parsing
* global state management
* business logic
* backend response samajhna

Matlab UI **dumb hona chahiye**.

---

### UI Example

```jsx
const LoginPage = () => {
  const { login } = useAuth();

  const handleSubmit = async () => {
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      ...
    </form>
  );
};
```

Explanation:

LoginPage:

1 user email password enter karta hai
2 form submit hota hai
3 `useAuth()` hook ka `login()` call hota hai

UI ko pata bhi nahi ki backend kaha hai.

---

### Real-life example

Login page:

* email input
* password input
* login button
* spinner

Bas.

---

### Why keep UI dumb?

Agar UI me logic bhar diya to:

* refactoring mushkil
* duplicate code
* testing difficult

Isliye UI **sirf presentation layer hona chahiye**.

---

# 2) Hooks Layer (Orchestration Layer)

Location

```
features/*/hooks/
```

Example:

```
useAuth.js
usePosts.js
```

---

## Orchestration ka matlab

Restaurant analogy:

| Part  | Real world  |
| ----- | ----------- |
| UI    | waiter      |
| API   | kitchen     |
| State | order board |
| Hook  | manager     |

Waiter order leta hai.

Manager:

* kitchen ko bolta hai
* order board update karta hai
* waiter ko inform karta hai

Manager khud:

* cook nahi karta
* serve nahi karta

Bas **coordinate karta hai**.

---

### Hooks Responsibility

Hook ka kaam:

* UI se action lena
* API call karna
* response ko state me save karna
* loading/error manage karna
* UI ko simple interface dena

Example return:

```
{ handleLogin, loading, error }
```

---

### Login Flow Step by Step

```
1 UI calls handleLogin(username, password)

2 Hook sets loading = true
3 Hook calls loginApi()

4 API returns response

5 Hook sets user = response.user

6 Hook sets loading = false

7 UI re-render automatically
```

---

### Full Hook Example

```js
export function useAuth() {
    const { setUser, setLoading, setError, ...state } = useContext(AuthContext);

    const handleLogin = useCallback(async (username, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await login(username, password);
            setUser(response.user);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [setError, setLoading, setUser]);

    return { ...state, handleLogin };
}
```

Explanation:

Hook:

1 state setters leta hai
2 API call karta hai
3 response ko state me save karta hai

Hook khud data store nahi karta.

---

### UI kya dekhta hai vs Hook kya hide karta hai

UI ko simple cheeze dikhai deti hain:

```
handleLogin()
loading
error
user
```

Hook internally handle karta hai:

* axios
* try catch
* API endpoint
* state update

---

### Hooks must NOT

Hook ko ye nahi karna chahiye:

* UI render
* JSX return
* DOM manipulate
* axios instance create
* persistent data store

---

### Real-life Example

```
usePosts()
```

return karega:

```
posts
isLoading
error
createPost
refresh
```

UI ko pata hi nahi API kaha hai.

---

### Why Hooks Important

Agar UI direct API call kare:

```
UI → API
```

Problems:

* har component me duplicate logic
* backend change = multiple files change

Better:

```
UI → Hook → API
```

---

# 3) State Layer (Global State)

Location:

```
features/*/*.context.jsx
```

ya

```
features/*/store/
```

---

## State kya hota hai

State ek **shared whiteboard** ki tarah hota hai.

Sab dekh sakte hain.

Hooks likh sakte hain.

Whiteboard khud decide nahi karta kya likhna hai.

---

### State Responsibility

State ka kaam:

* data store karna
* derived values dena
* setters expose karna
* re-render trigger karna

Bas.

---

### Example

```jsx
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const value = useMemo(
        () => ({
            user,
            isAuthenticated: !!user,
            loading,
            error,
            setUser,
            setLoading,
            setError,
        }),
        [user, loading, error]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
```

Explanation:

Yaha sirf **data store ho raha hai**.

---

### Notice kya missing hai

Yaha nahi hai:

* axios
* async
* try catch
* API

State sirf memory hai.

---

### Loading state yaha kyu?

Hook decide karta hai:

```
loading kab true hoga
loading kab false hoga
```

State sirf value store karta hai.

---

### State vs Hook

| State           | Hook         |
| --------------- | ------------ |
| data store      | logic manage |
| setters provide | API call     |
| derived values  | async flow   |
| passive         | active       |

---

### State must NOT

State ko ye nahi karna chahiye:

* API call
* route navigation
* UI render
* alerts
* cookies access
* async functions

---

### Real-life use case

AuthContext store karta hai:

```
user
loading
error
isAuthenticated
```

Is data ko use kar sakte hain:

* Login page
* Navbar
* Protected routes

---

### Why separate state and hooks

Agar context me API daal diya to:

* state unpredictable ho jayega
* testing difficult
* multiple async flows

Isliye rule:

```
Hooks orchestrate
State stores
```

---

# 4) API Layer (Backend Communication)

Location

```
features/*/services/
```

Example:

```
auth.api.ts
posts.api.ts
```

---

### Responsibility

API layer ka kaam:

* HTTP request bhejna
* backend se data lena
* response normalize karna
* errors normalize karna

---

### Example

```ts
export const loginApi = async (email, password) => {
  const response = await axios.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};
```

Explanation:

Ye file sirf backend se baat karti hai.

React ka koi relation nahi.

---

### API layer must NOT

API ko ye nahi karna chahiye:

* state update
* navigation
* UI error show
* React hooks use
* rendering

---

### Why API layer important

Agar UI direct axios call kare:

* har component backend structure jaanta hoga
* changes multiple files me karne padenge

API layer hone se:

sirf **ek file change karni padti hai**.

---

# Full Request Flow Example

Login flow:

```
User clicks Login button
↓
UI calls login() from useAuth
↓
Hook calls loginApi()
↓
API sends request to backend
↓
Response returned to Hook
↓
Hook updates State
↓
UI re-renders automatically
```

---

# Strict Layer Rules

### UI can talk to

```
Hooks
```

### Hooks can talk to

```
State
API
```

### State can talk to

```
Nothing
```

### API can talk to

```
Backend only
```

Layer skip karna allowed nahi hai.

---

# Common Architecture Mistakes

Common galtiyan:

* UI se API call
* API se state update
* State se navigation
* Hooks se cookies manipulate
* Components me business logic

---

# Conclusion

4-layer architecture:

1 UI layer → screen
2 Hooks layer → logic
3 State layer → memory
4 API layer → backend communication

Agar har layer apni boundary follow kare to:

React app **clean, scalable aur maintainable** ban jata hai.

