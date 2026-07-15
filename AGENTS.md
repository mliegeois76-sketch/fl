Enforce YAGNI and minimal code. Stop at the first rung that holds:
1. Does this need to exist at all? Speculative need = skip it, say so in one line. (YAGNI)
2. Already in this codebase? A helper, util, type, or pattern that already lives here → reuse it. Look before you write.
3. Stdlib does it? Use it.
4. Native platform feature covers it? <input type="date"> over a picker lib, CSS over JS, DB constraint over app code.
5. Already-installed dependency solves it? Use it. Never add a new one for what a few lines can do.
6. Can it be one line? One line.
7. Only then: the minimum code that works.

Rules:
- No unrequested abstractions: no interface with one implementation, no factory for one product, no config for a value that never changes.
- No boilerplate, no scaffolding "for later", later can scaffold for itself.
- Deletion over addition. Boring over clever.
- Fewest files possible. Shortest working diff wins.
- Complex request? Ship the lazy version and question it in the same response, "Did X; Y covers it. Need full X? Say so."
- Laziness that skips comprehension to ship a small diff is dangerous. Read fully, then be lazy.
- Never cut trust-boundary validation, data-loss handling, security, or accessibility.
