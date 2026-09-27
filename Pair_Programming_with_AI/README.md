# AI Lab: Pair Programming with AI - Part 2

## Project Overview
This repository contains the deliverables for **SE 300: High Level Programming II — AI Lab: Pair Programming with AI (Part 2)**. 

The goal of this project is to apply structured prompt engineering to critically audit a legacy JavaScript class (`TaskQueue`) for violations of the **Single Responsibility Principle (SRP)** and **variable scope/closure antipatterns**, followed by implementing a clean, modular, and maintainable refactored version.

---

## Files in this Repository
- [`task_queue_legacy.js`](./task_queue_legacy.js): Legacy implementation demonstrating scope traps and SRP violations.
- [`task_queue_clean.js`](./task_queue_clean.js): Modular, refactored implementation resolving all scope issues and separating concerns.
- [`screenshots/screenshot_scope_closures.png`](./screenshots/screenshot_scope_closures.png): Evidence of AI audit on scope and closures.
- [`screenshots/screenshot_srp_refactoring.png`](./screenshots/screenshot_srp_refactoring.png): Evidence of AI refactoring addressing SRP violations.

---

## 1. Prompts Used

### Prompt 1: AI-Assisted Audit (Scope and Closures)
```text
Act as a senior JavaScript engineer and code reviewer.
Analyze the following addTask method from our TaskQueue class with a focus on variable scope and closures:

class TaskQueue {
  constructor(name) {
    this.queueName = name;
    this.tasks = [];
    this.isProcessing = false;
  }

  addTask(taskFn, priority) {
    if (!taskFn || typeof taskFn !== 'function') {
      console.error('Task must be a function.');
      return;
    }
    this.tasks.push({ taskFn, priority, timestamp: Date.now() });
    if (this.tasks.length === 1) {
      console.log(`Starting queue ${this.queueName}.`);
      this._startProcessing();
    }
    function notify() { 
      if (priority > 9) {
        console.warn(`High priority task added to ${name}.`);
      }
    }
    notify(); 
  }

  _startProcessing() {
    this.isProcessing = true;
  }
}

Please explain:
1. What is the scope of the inner notify function, and what variables does it "close over"?
2. What happens when notify references "name"? Why is this problematic in terms of lexical scope vs object state?
3. Are there variables that should be block-scoped (using let or const) and why this matters for predictable code?
4. How closures are created in this specific context, and whether declaring notify inside addTask is an antipattern.
```

### Prompt 2: AI-Assisted Refactoring (SRP and Modularity)
```text
Review the addTask method in TaskQueue against the Single Responsibility Principle (SRP):
1. Identify all SRP violations inside addTask (specifically focusing on task validation/storage, state checks, scheduling, and logging/notifications).
2. Refactor the TaskQueue class by extracting the logging, alerting, and queue-processing lifecycle out of addTask into a separate notifier/logging concern (such as a QueueNotifier class).
3. Ensure addTask is purely responsible for validating the task callback and storing the task item in the internal collection.
4. Explain how this refactored structure improves unit testability and long-term maintainability.
```

### Prompt 3: Critique and Verification Prompt
```text
Please review our refactored implementation in task_queue_clean.js:
- Does addTask now maintain a single responsibility?
- Has the lexical scope trap with the unbound "name" reference been completely resolved?
- How does dependency injection of QueueNotifier improve testability and mockability?
```

---

## 2. Key Audit Findings & Refactoring Summary

### Scope & Closure Traps in Legacy Code
1. **Unbound Variable (`name`)**: The `notify` function references `name`. However, `name` was only a parameter of `constructor(name)` and is not in the lexical scope of `addTask`. In Node.js or strict mode, this triggers an immediate `ReferenceError: name is not defined`. In non-strict browser environments, it falls back to `window.name`, leading to silent bugs. The refactored code correctly accesses `this.queueName`.
2. **Unnecessary Closure Creation**: Declaring `notify()` inside `addTask()` creates a new closure allocation on every function call. Moving notifications to a dedicated method or class avoids redundant memory allocations and garbage collection overhead.
3. **Block-scoping with `const`/`let`**: Encapsulating variables cleanly inside blocks prevents accidental state leaking across async execution steps.

### Single Responsibility Principle (SRP) Violations
In the legacy version, `addTask` was handling four distinct responsibilities:
- Input validation and collection insertion.
- State-checking (`this.tasks.length === 1`).
- Execution scheduling (`this._startProcessing()`).
- Console logging and warning alerts.

### Refactored Architecture (`task_queue_clean.js`)
- **`QueueNotifier` Class**: Dedicated solely to observability, logging, and alerts.
- **`TaskQueue` Class**: Focuses strictly on queue state and collection management. `addTask` only validates and pushes items into the array.
- **Explicit Lifecycle (`startProcessing`)**: Execution is initiated explicitly or through a scheduler, making execution predictable and side-effect free.
- **Dependency Injection**: `QueueNotifier` can be replaced with a mock or custom logging sink during unit tests without altering core queue behavior.

---

## 3. Reflection
> **"LLMs are pattern-matching engines, not code executors."**
> 
> Because large language models match structural code patterns rather than executing runtime code in a VM, asking the AI specifically to audit for Single Responsibility and scope traps forced it to evaluate architectural boundaries and lexical scope chains rather than just producing a quick patch. Simply asking the AI to "fix the code" often yields a superficial syntactic tweak that hides structural flaws. In contrast, guiding the AI with targeted engineering principles taught me how to critically inspect closure lifecycles and separation of concerns—insights that remain applicable across any programming language.
