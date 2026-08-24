# Contributing to OrbitBoard

First off — thank you! 💚 OrbitBoard is built by people like you, and every
contribution (code, docs, bug reports, ideas) makes it better.

## 🧭 Before you start
- Read [`SETUP.md`](./SETUP.md) and get the project running locally.
- Read our [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md).
- Browse the **Issues** tab for something to work on. Look for the
  `good first issue` label if it's your first time.

## 🌱 Workflow

1. **Fork** the repo and clone your fork.
2. **Create a branch** off `main` using our naming convention:
   ```
   feat/<short-description>     # new feature
   fix/<short-description>      # bug fix
   docs/<short-description>     # documentation
   chore/<short-description>    # tooling / housekeeping
   ```
   Example: `fix/delete-card-crash`
3. **Make your change** with clear, small commits.
4. **Test locally** — `npm run dev` should still boot and render the board.
5. **Push** and open a Pull Request against `OrbitLabs/orbit-board:main`.

## ✅ Pull Request checklist
Before requesting review, confirm:

- [ ] Branch is named per the convention above.
- [ ] `npm run dev` boots without new errors.
- [ ] `npm run lint` passes (if configured).
- [ ] I updated docs (`README.md` / `docs/`) if behaviour changed.
- [ ] The PR description explains **what** and **why**, and links any issue.
- [ ] I kept the change focused (one logical change per PR).

## 💬 Commit style
Short, imperative present tense:
```
fix: prevent crash when deleting a card
feat: add card creation endpoint
docs: clarify .env setup steps
```

## 🤔 Questions?
Open a [Discussion](https://github.com/OrbitLabs/orbit-board/discussions) or ask
in an issue. No question is too small.

Happy hacking! — the OrbitLabs team
