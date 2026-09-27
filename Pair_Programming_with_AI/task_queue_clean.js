/**
 * QueueNotifier handles logging and alert notifications for queue events.
 * Responsibility: Observability and notifications only.
 */
class QueueNotifier {
  notifyQueueStarted(queueName) {
    console.log(`Starting queue ${queueName}.`);
  }

  notifyHighPriorityTask(queueName, priority) {
    if (priority > 9) {
      console.warn(`High priority task added to ${queueName}.`);
    }
  }

  logError(message) {
    console.error(message);
  }
}

/**
 * TaskQueue handles task storage and queue state.
 * Responsibility: Enqueuing tasks and managing queue items.
 */
class TaskQueue {
  constructor(name, notifier = new QueueNotifier()) {
    this.queueName = name;
    this.tasks = [];
    this.isProcessing = false;
    this.notifier = notifier;
  }

  /**
   * Adds a valid task to the queue.
   * Pure responsibility: Validation and array insertion.
   *
   * @param {Function} taskFn - The task callback.
   * @param {number} priority - The task priority level.
   * @returns {boolean} True if successfully enqueued, false otherwise.
   */
  addTask(taskFn, priority = 0) {
    if (typeof taskFn !== 'function') {
      this.notifier.logError('Task must be a function.');
      return false;
    }

    const taskItem = {
      taskFn,
      priority,
      timestamp: Date.now()
    };

    this.tasks.push(taskItem);

    if (priority > 9) {
      this.notifier.notifyHighPriorityTask(this.queueName, priority);
    }

    return true;
  }

  /**
   * Starts processing the queue.
   * Decoupled from addTask so callers control execution lifecycle.
   */
  startProcessing() {
    if (this.isProcessing || this.tasks.length === 0) {
      return;
    }

    this.isProcessing = true;
    this.notifier.notifyQueueStarted(this.queueName);

    // Process tasks in order or priority
    while (this.tasks.length > 0) {
      const current = this.tasks.shift();
      try {
        current.taskFn();
      } catch (err) {
        this.notifier.logError(`Error executing task: ${err.message}`);
      }
    }

    this.isProcessing = false;
  }
}

module.exports = { TaskQueue, QueueNotifier };
