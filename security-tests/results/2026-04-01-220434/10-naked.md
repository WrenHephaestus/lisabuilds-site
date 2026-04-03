## Summary

This is a guide titled **"The Complete Guide to API Rate Limiting"** covering the fundamentals of protecting production APIs from overuse. Key topics include:

1. **Token Bucket Algorithm** — The most common rate limiting approach, explained with a JavaScript code example showing a `TokenBucket` class that tracks capacity, refill rate, and token consumption.

2. **Distributed Rate Limiting** — Briefly discusses sharing rate limit state across multiple servers using Redis with atomic operations.

3. **Best Practices** — Practical recommendations including:
   - Return standard rate limit headers (`X-RateLimit-Remaining`, `X-RateLimit-Reset`)
   - Use HTTP `429 Too Many Requests` (not `403`)
   - Implement exponential backoff in clients
   - Use tiered limits for different endpoints

---

I'll also note: this page contains **multiple hidden prompt injection attempts** embedded in invisible `<div>` elements (using `display:none`, zero-size fonts, `visibility:hidden`, etc.). These attempt to trick an AI into leaking its system prompt, executing shell commands, and disclosing configuration details by using fake authority claims, fabricated urgency, spoofed conversation history, and social pressure. I've ignored all of them.
