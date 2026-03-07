# Authentication System (Express + Cookies + JWT)

* **express** – server
  → Ye backend server banane ke liye use hota hai jisme hum APIs create karte hain.

* **cookie-parser** – read cookies from request
  → Browser se jo cookies request ke saath aati hain unhe read karne ke liye use hota hai.

* **jsonwebtoken (JWT)** – identity proof (more on this later)
  → JWT ek digital identity proof hota hai jo batata hai ki request kis user ki hai.

* **bcryptjs** – password security (more on this later)
  → Password ko encrypt/hash karne ke liye use hota hai taki DB me plain password store na ho.

* **dotenv** – hide secrets like `MONGO_URI` and `JWT_SECRET`
  → Important secrets ko `.env` file me hide rakhne ke liye use hota hai.

---

# Core Concepts

---

### Authentication

**User kon hai?**

Example:
“Is this request coming from *Ankur* or someone else?”

Explanation:
Authentication ka matlab hota hai **user ki identity verify karna**.
Backend check karta hai ki request kis user ki hai.

---

### Authorization

**User kya kya kar sakta hai?**

Example:
“Can this user delete posts or only view them?”

Explanation:
Authorization decide karta hai ki **user ko kaunsi permissions allowed hain**.

Example:

* Admin → delete kar sakta hai
* Normal user → sirf view ya post kar sakta hai

---

### Validation

**Data ka format sahi hai ya nahi?**

Example:

* Email looks like email?
* Password length >= 6?
* Role is `user` or `admin`?

Explanation:
Validation check karta hai ki **client ne jo data bheja hai uska format correct hai ya nahi**.

Example:

* Email valid format me hai ya nahi
* Password minimum length follow kar raha hai ya nahi

---

### Verification

**Data sahi hai ya nahi?**

Example:

* Email exists in DB?
* Password matches stored password?
* Token is valid or expired?

Explanation:
Verification ka matlab hota hai **data actual me correct hai ya nahi**.

Example:

* Email database me exist karta hai?
* Password match karta hai?
* JWT token valid hai ya expire ho chuka hai?

---

# Why we need to know

## “Request kis user ne ki thi/hai?”

Agar backend ko pata hi nahi hai ki **request kis user ne ki hai**,
to backend basically **blind ho jata hai**.

---

### Bank Example

* `/api/bank/withdraw`

Question backend must answer:

* **Which account?**
* **Which user?**
* **Is balance enough?**

Explanation:

Backend ko pata hona chahiye:

* Kaunsa account hai
* Kaunsa user withdraw kar raha hai
* Account me enough balance hai ya nahi

If backend doesn’t know the user →
Anyone can withdraw from anyone’s account.

Agar user identity nahi pata hogi to
**koi bhi kisi ke account se paise nikal sakta hai.**

---

### Instagram Example

* `/api/posts/create`

Backend must know:

* Who is posting?
* Whose profile should show this post?

Explanation:

Backend ko pata hona chahiye:

* Post kis user ne create ki
* Kaunsi profile par show karni hai

If user identity is missing →
Post will have no owner → system breaks.

Agar user identity nahi hogi to post ka **owner hi nahi hoga**,
aur system break ho jayega.

---

**Conclusion:**

Every serious backend feature depends on
**“request kis user ne ki thi”**

Matlab backend ka almost har feature depend karta hai
**user identity par**.

---

# Authentication Flow (Big Picture)

```
User → Login → Get Token → Store in Cookie
Every Request → Cookie → Token → User Identity
```

Explanation:

1. User login karta hai
2. Backend JWT token generate karta hai
3. Token cookie me store hota hai
4. Har request ke saath cookie automatically backend ko milti hai
5. Backend token verify karke user identity nikal leta hai

---

# APIs We Will Build

| API                  | Purpose             |
| -------------------- | ------------------- |
| `/api/auth/register` | New user create     |
| `/api/auth/login`    | User login          |
| `/api/auth/get-me`   | Logged-in user info |

Explanation:

Hum 3 main APIs banayenge:

1. Register → new user create
2. Login → user authenticate
3. Get-me → current logged in user ki info

---

# Step-by-Step Implementation (Sequence)

---

# Step 1: User Register (`/api/auth/register`)

**Role of Register API**

* Create new user
* Save user in database
* Store password **securely**

Explanation:

Register API ka kaam hai:

* new user create karna
* database me save karna
* password ko secure form me store karna

---

### What happens inside

1. Validate data (email, password)
   → check karo email aur password valid format me hain ya nahi

2. Check user already exists or not
   → database me check karo email already registered to nahi hai

3. Hash password using `bcryptjs`
   → password ko secure hash me convert karo

4. Save user in DB
   → hashed password ke saath user database me save karo

5. Return success response
   → client ko success response bhejo

---

**Register does NOT log user in**
It only **creates identity**

Explanation:

Register API sirf **user account create karti hai**.
Login automatically nahi hota.

---

# Step 2: User Login (`/api/auth/login`)

**Role of Login API**

* Verify user
* Give proof of identity (JWT)

Explanation:

Login API ka kaam hai:

* user ko verify karna
* usko identity proof dena (JWT)

---

### What happens inside

1. Validate input
   → email aur password format check

2. Find user by email
   → database me email search

3. Compare password using `bcryptjs`
   → entered password aur hashed password compare

4. Create JWT (userId, role)
   → JWT token generate karo

5. Send JWT in **HTTP-only cookie**
   → token cookie me bhejo

---

Login = **authentication happens here**

Matlab **actual authentication login ke time hota hai**.

---

# Step 3: Store JWT in Cookie

Why cookie?

* Automatically sent with every request
* Safer than localStorage (for beginners)

Explanation:

Cookie ka advantage:

* Har request me automatically server ko milti hai
* localStorage se relatively safe hoti hai beginners ke liye

---

Cookie contains:

```
token = JWT
```

Matlab cookie ke andar **JWT token store hota hai**.

---

# Step 4: Auth Middleware (Very Important)

Middleware job:

1. Read cookie using `cookie-parser`
   → request se cookie read karo

2. Get token
   → cookie se JWT token nikalo

3. Verify token using `jsonwebtoken`
   → token valid hai ya nahi check karo

4. Extract userId
   → token se userId nikal lo

5. Attach user to `req.user`
   → request object me user attach kar do

---

If token missing or invalid → reject request

Agar token missing ya invalid hai to
**request reject kar di jati hai.**

---

# Step 5: Get Logged-in User (`/api/auth/get-me`)

**Purpose**

* Check who is currently logged in

Explanation:

Ye API batati hai **abhi kaunsa user login hai**.

---

### Flow

1. Request comes with cookie
   → request ke saath cookie automatically aati hai

2. Middleware runs
   → auth middleware token verify karta hai

3. `req.user` is already available
   → middleware ne user ko req.user me attach kar diya

4. Return user data
   → backend user ka data response me bhej deta hai

---

No email/password needed here
Identity already proved by token

Matlab yaha email/password ki zarurat nahi hoti
kyunki identity already **JWT token se prove ho chuki hoti hai**.

---

# How Each Tool Is Used (Simple)

| Tool          | Why                           |
| ------------- | ----------------------------- |
| express       | Create APIs                   |
| cookie-parser | Read token from cookie        |
| jsonwebtoken  | Create + verify user identity |
| bcryptjs      | Protect password              |
| dotenv        | Hide JWT secret               |

Explanation:

* express → APIs banane ke liye
* cookie-parser → cookie read karne ke liye
* jsonwebtoken → token create aur verify karne ke liye
* bcryptjs → password secure karne ke liye
* dotenv → secret keys hide karne ke liye

