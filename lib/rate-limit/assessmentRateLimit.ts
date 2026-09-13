// In-memory rate limiter / submission lock for hackathon prototypes

interface LockEntry {
  timestamp: number;
  isProcessing: boolean;
}

const submissionLocks = new Map<string, LockEntry>();
const LOCK_TIMEOUT_MS = 15000; // 15 seconds

export const assessmentRateLimiter = {
  tryAcquireLock: (assessmentId: string): boolean => {
    const now = Date.now();
    const entry = submissionLocks.get(assessmentId);

    if (entry && entry.isProcessing) {
      if (now - entry.timestamp < LOCK_TIMEOUT_MS) {
        return false; // Already locked & actively processing
      }
    }

    submissionLocks.set(assessmentId, {
      timestamp: now,
      isProcessing: true
    });
    return true;
  },

  releaseLock: (assessmentId: string) => {
    submissionLocks.delete(assessmentId);
  }
};
