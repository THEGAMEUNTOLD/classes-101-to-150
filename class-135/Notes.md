# **Why We Need TypeScript**

### Notes:

1. **JavaScript type coercion can be unpredictable:**

   * `console.log("5" + 1)`     // -> output = 51       // string + number = string
   * `console.log("5" - 1)`     // -> output =  4       // string - number = number
   * `console.log("5" * 1)`     // -> output = 50       // string * number = number
   * `console.log(true + true)` // -> output = 2        // boolean + boolean = number
   * `console.log(5 + true)`    // -> output = 6        // number + boolean = number
   * `console.log("5" + true)`  // -> output = "5true"  // string + boolean = string

2. **Array and object operations can behave unexpectedly:**

* `console.log([] + [])`    // -> output = ""                // array + array = string
* `console.log([1] + 1)`    // -> output = "11"              // array + number = string
* `console.log([1,2] + 1)`  // -> output = "1,21"            // array + number = string
* `console.log({} + [])`    // -> output = "[object Object]" // object + array = string

3. **Comparison pitfalls:**

   * `console.log([] == false)`  // -> output = true    // loose equality converts types

---

### **Why TypeScript Helps**

* **Static Typing:** Prevents unexpected type coercion errors at compile time.
* **Predictable Behavior:** Errors like `"5" - 1` or `[] == false` can be caught before runtime.
* **Better Code Maintenance:** Type definitions make your code easier to read and understand.
* **IDE Support:** Autocomplete, type hints, and early error detection.


---


##  Step-by-Step Working Commands for TypeScript Setup in PowerShell

1. **Initialize a new Node.js project**

   ```powershell
   npm init -y
   ```

   *Creates a `package.json` file with default values.*

2. **Install TypeScript as a development dependency**

   ```powershell
   npm i typescript --save-dev
   ```

   *Adds TypeScript to your project locally.*

3. **Create a `tsconfig.json` file**

   ```powershell
   npx tsc --init
   ```

   *Generates the TypeScript configuration file for your project.*

4. **Create a new TypeScript file**

   ```powershell
   New-Item index.ts -ItemType File
   ```

   *Creates an empty `index.ts` file in your project directory.*

5. **Compile the TypeScript file**

   ```powershell
   npx tsc index.ts --ignoreConfig
   ```

   *Compiles `index.ts` to `index.js` without using the tsconfig settings.*

6. **Run the compiled JavaScript file**

   ```powershell
   node index.js
   ```

   *Executes the compiled JavaScript file.*

7. **Shortcut in PowerShell (compile and run in one line)**

   ```powershell
   npx tsc index.ts --ignoreConfig ; node index.js
   ```

   *Use `;` in PowerShell instead of `&&` to chain commands.*


---


##  TypeScript Notes: String and Arithmetic Operations

### 1. Simple Console Output

```ts
console.log("Bharat");
```

* Prints a string to the console.
*  Output:

```
Bharat
```

* Explanation: `"Bharat"` is a string literal, so `console.log()` just prints it.

---

### 2. String + Number Operations

```ts
const a = "world";
const b = "5";
```

* `a` is a **string**
* `b` is a **string**, not a number

#### a) String concatenation

```ts
console.log(a + b);
```

*  Output: `world5`
* Explanation: `+` operator with **strings** concatenates them.
* `"world" + "5"` → `"world5"`

#### b) Subtraction or Multiplication

```ts
console.log(a - b); //  Error
console.log(a * b); //  Error
```

*  TypeScript Error:

```
The right-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
```

* Explanation:

  * `-` and `*` are **arithmetic operators**. They **only work with numbers, bigints, or enums** in TypeScript.
  * Both `a` and `b` are **strings**, so TypeScript **does not allow** the operation.
  * In plain JavaScript, `"world" - "5"` would return `NaN`, but TypeScript adds **type safety** and prevents it at compile time.

---

###  Key Takeaways

1. `+` can **concatenate strings** or **add numbers**.
2. `-`, `*`, `/` only work with **numbers**, **bigints**, or **enums** in TypeScript.
3. TypeScript enforces **type safety** to prevent runtime errors.

---


Absolutely! Let’s make **professional notes** on **TypeScript primitive and common data types**, with **definitions in Hinglish**, **examples**, and **rules**. I’ll also include the ones you missed.

---

#  TypeScript Data Types – Professional Notes


## 1. **String**

* **Definition :**
  Ek sequence of characters. Text ko represent karta hai.
* **Syntax / Example:**

```ts
let name: string = "Bharat";
```

* **Rules:**

  * Sirf double quotes `"..."` ya single quotes `'...'` use karo.
  * Numbers ko string me directly assign nahi kar sakte without conversion.

---

## 2. **Number**

* **Definition :**
  Numerical values (integer ya floating-point) ko represent karta hai.
* **Syntax / Example:**

```ts
let age: number = 25;
let pi: number = 3.14;
```

* **Rules:**

  * Binary, octal aur hexadecimal numbers bhi allowed hai.
  * Arithmetic operations `+ - * /` allowed.

---

## 3. **Boolean**

* **Definition :**
  True ya False values ko represent karta hai.
* **Syntax / Example:**

```ts
let isLoggedIn: boolean = true;
```

* **Rules:**

  * Sirf `true` ya `false` assign kar sakte ho.
  * TypeScript me number `1/0` ko boolean me automatically convert nahi karta.

---

## 4. **Array**

* **Definition :**
  Ek collection of values, jo same type ke hone chahiye.
* **Syntax / Example:**

```ts
let fruits: string[] = ["apple", "banana", "mango"];
let numbers: number[] = [1, 2, 3];
```

* **Rules:**

  * Mixed types ke liye `any[]` ya tuple use karo.

---

## 5. **Tuple**

* **Definition :**
  Fixed size ka array jisme **alag-alag type ke elements** ho sakte hain.
* **Syntax / Example:**

```ts
let person: [string, number] = ["Bharat", 25];
```

* **Rules:**

  * Order and type fix hoti hai.
  * Extra element ya wrong type allowed nahi.

---

## 6. **Void**

* **Definition :**
  Jab function **kuch return nahi karta**, use `void` type lagate hain.
* **Syntax / Example:**

```ts
function greet(): void {
  console.log("Hello");
}
```

* **Rules:**

  * Variables rarely use hote hain, mostly functions ke liye.

---

## 7. **Never**

* **Definition :**
  Jab function **kabhi return nahi karega** (ya error throw karega), use `never` lagate hain.
* **Syntax / Example:**

```ts
function throwError(): never {
  throw new Error("Something went wrong");
}
```

* **Rules:**

  * Function ya expression kabhi complete nahi hota.
  * `never` variable me value assign nahi hoti.

---

## 8. **Any**

* **Definition :**
  TypeScript ki type checking ko bypass karne ke liye use hota hai. Koi bhi value assign ki ja sakti hai.
* **Syntax / Example:**

```ts
let data: any = 5;
data = "Hello";
data = true;
```

* **Rules:**

  * Type safety lose ho jati hai.
  * Avoid karo jab tak zarurat ho.

---

## 9. **Unknown**

* **Definition :**
  TypeScript me safe version of `any`. Value ka type **pehle unknown hai**, use check karne ke baad assign karte hain.
* **Syntax / Example:**

```ts
let value: unknown = 30;
if (typeof value === "number") {
  let double = value * 2; // safe
}
```

* **Rules:**

  * Direct operations nahi kar sakte jab tak type check nahi karte.

---

## 10. **BigInt**

* **Definition :**
  Very large integers ko represent karne ke liye. Normal `number` se zyada precision deta hai.
* **Syntax / Example:**

```ts
let bigNumber: bigint = 9007199254740991n;
```

* **Rules:**

  * Number ke saath directly arithmetic allowed nahi.

---

## 11. **Symbol**

* **Definition (Hinglish):**
  Unique identifiers create karne ke liye.
* **Syntax / Example:**

```ts
let sym1: symbol = Symbol("id");
```

* **Rules:**

  * Mostly object keys ke liye use hota hai.
  * Unique and immutable.


---


## 1. **Type**

```ts
type User = {
    name: string;
    age: number;
    isMale: boolean;
}
```

* `User` is a **custom type** (like a blueprint for an object).
* It defines what **properties** an object should have and their **types**:

  * `name` → string
  * `age` → number
  * `isMale` → boolean
*  Helps TypeScript **check the shape** of objects at compile time.

---

## 2. **Creating an Object**

```ts
const user = {
    name: "bharat",
    age: 20,
    isMale: true
}
```

* `user` is an **object** that matches the `User` type.
* Properties and types **must match** the `User` type.

---

## 3. **Function with Type Annotation**

```ts
function greet(data: User){
    console.log("hello " + data.name + " your age is " + data.age);
}
```

* `greet` is a function that **accepts one argument `data` of type `User`**.
* Inside, it uses the object properties to print a message.
* TypeScript ensures **only objects matching `User` type** can be passed.

---

## 4. **Calling the Function**

```ts
greet(user);
```

* Calls `greet` with the `user` object.
*  Output:

```
hello bharat your age is 20
```

* If you try to pass an object **missing any property** or with wrong type, TypeScript will throw an **error**.

---

### Rules

1. `type` defines a **structure for objects**.
2. TypeScript **checks types at compile time** for safety.
3. Functions can **accept typed objects** for reliable code.
4. Helps avoid runtime errors like `undefined property`.

---
