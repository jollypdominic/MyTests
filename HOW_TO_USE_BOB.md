# How to Use Bob

## Overview

Bob is an AI software engineering assistant that helps you understand codebases, plan work, modify code, review changes, and automate common development tasks. You can use Bob for both simple requests and complex multi-step tasks.

This tutorial explains how to work effectively with Bob, what kinds of requests it handles well, and how to get the best results.

## What Bob Can Help With

Bob is most useful for technical work such as:

- Explaining an existing codebase
- Finding bugs and proposing fixes
- Editing or creating source files
- Writing documentation
- Refactoring code
- Reviewing implementation quality
- Running commands and checking outputs
- Creating structured plans for larger changes
- Testing interfaces and workflows when browser-based validation is needed

Typical examples include:

- "Explain how authentication works in this project"
- "Add pagination to the employee list"
- "Fix the validation bug in project allocation logic"
- "Write a setup guide for this repository"
- "Review my local changes and identify issues"

## How to Start

The simplest way to use Bob is to give a direct task in plain English.

Examples:

```text
Explain the purpose of this repository
```

```text
Find where employee allocation validation is implemented
```

```text
Create a tutorial for onboarding new developers
```

```text
Fix the login form validation and update the tests
```

You do not need to use special syntax for most requests. A clear sentence is usually enough.

## How Bob Typically Works

Bob usually works in short, tool-assisted steps:

1. Understands your request
2. Inspects relevant files or project structure
3. Reads the important code or documentation
4. Makes targeted changes when needed
5. Verifies results where possible
6. Reports the final outcome

For larger tasks, Bob may keep track of progress using a checklist-style todo list.

## Writing Effective Requests

The best prompts are specific, outcome-focused, and grounded in the repository.

### Good Request Patterns

- State the goal clearly
- Mention files or folders if you know them
- Mention constraints if they matter
- Ask for implementation, explanation, review, or documentation explicitly

Examples:

- "Explain how `backend/src/server.ts` is wired together"
- "Add a new API route for project summaries"
- "Refactor the dashboard page to separate data loading from presentation"
- "Review my changes for bugs and edge cases"
- "Document how to run the frontend locally"

### Weaker Request Patterns

These are harder to act on because they are vague:

- "Help me"
- "Fix this"
- "Make it better"
- "Something is wrong in the backend"

A better version would be:

- "The backend login route is failing with a 500 error. Find the cause and fix it."

## Common Ways to Use Bob

## 1. Ask Bob to Explain Code

Use Bob when you want to understand architecture, flow, or implementation details.

Examples:

- "Explain the frontend folder structure"
- "How does authentication work end to end?"
- "Trace how an employee record is fetched from API to UI"
- "Summarize the purpose of the files under `backend/src/routes`"

This is useful for onboarding, debugging, and code reviews.

## 2. Ask Bob to Implement a Change

Bob can add features, fix defects, and refactor code.

Examples:

- "Add search to the employee list page"
- "Create a reusable API error handler"
- "Fix inconsistent port references in the documentation"
- "Add a README for the automation scripts"

For best results, include any expected behavior, constraints, or preferred file locations.

## 3. Ask Bob to Generate Documentation

Bob is effective at writing technical guides, setup instructions, and usage docs.

Examples:

- "Create a deployment guide for this app"
- "Write a troubleshooting section for database connection issues"
- "Generate a contributor guide for this repository"
- "Create a tutorial for how to use Bob"

If documentation style matters, mention whether you want quick-start, reference, tutorial, or troubleshooting format.

## 4. Ask Bob to Review Changes

Bob can inspect local diffs and identify issues such as:

- Logic bugs
- Missing edge-case handling
- Weak validation
- Security concerns
- Maintainability problems

Example requests:

- "Review my changes"
- "Check whether my implementation matches the intended issue"
- "Look for bugs in the recent allocation changes"

## 5. Ask Bob to Run Commands

Bob can execute project commands where appropriate, such as install, test, build, or lint commands.

Examples:

- "Run the frontend tests and fix failures"
- "Start the backend and check for runtime errors"
- "Build the project and resolve any TypeScript errors"

This is especially helpful when debugging setup or CI-related issues.

## 6. Ask Bob to Validate UI Changes

When browser interaction is available, Bob can inspect pages, click through flows, and help verify UI behavior.

Examples:

- "Launch the app and verify the login screen"
- "Check whether the dashboard renders correctly on load"
- "Test the create-project form in the browser"

## Recommended Prompt Templates

Use these as starting points.

### Explain Something

```text
Explain how [feature/module/file] works in this repository.
Focus on [architecture/data flow/dependencies/errors].
```

### Implement Something

```text
Add [feature/change] to [file/page/module].
Requirements:
- [requirement 1]
- [requirement 2]
- [requirement 3]
```

### Fix a Bug

```text
Investigate and fix [bug description].
Expected behavior: [expected result]
Actual behavior: [current result]
Relevant area: [file/folder/feature]
```

### Write Documentation

```text
Create a [tutorial/setup guide/reference doc] for [topic].
Audience: [developers/admins/end users]
Include: [sections or details]
```

### Review Changes

```text
Review the current changes for bugs, edge cases, and maintainability issues.
Prioritize functional problems.
```

## Best Practices for Working with Bob

### 1. Be Specific About the Outcome

Instead of:

```text
Improve the docs
```

Use:

```text
Add a beginner-friendly setup guide for the backend, including environment variables and migration steps
```

### 2. Mention Relevant Paths

If you already know the likely area, share it.

Example:

```text
Update the API client in frontend/src/lib/api.ts to handle 401 responses globally
```

### 3. Describe Expected Behavior

If asking for a fix, say what should happen.

Example:

```text
Fix allocation validation so overlapping allocations are rejected when total active allocation exceeds 100%
```

### 4. Break Large Goals into Smaller Requests

Bob can handle large tasks, but a phased approach often produces clearer results.

For example:

1. "Explain the current reporting flow"
2. "Propose a cleaner design"
3. "Implement the backend changes"
4. "Update the frontend to match"
5. "Write release notes"

### 5. Ask for the Right Type of Output

You can explicitly request:

- A plan
- A code change
- A tutorial
- A review
- A summary
- A root-cause analysis

This helps Bob optimize the response.

## Example Session

### Example 1: Understanding a Project

User request:

```text
Explain how the frontend and backend connect in this repository
```

What Bob will usually do:

- Inspect the project structure
- Read key configuration and entry files
- Trace API usage from frontend to backend
- Summarize the integration points

### Example 2: Fixing a Bug

User request:

```text
The employee list does not load after login. Find the issue and fix it.
```

What Bob will usually do:

- Inspect relevant frontend and backend files
- Search for employee list data loading logic
- Identify request, auth, or API issues
- Apply a fix
- Report what changed

### Example 3: Creating Documentation

User request:

```text
Write a quick start guide for running this project locally
```

What Bob will usually do:

- Read existing docs and package configuration
- Identify actual startup commands
- Draft a concise guide
- Add the guide to the repository

## What to Expect During Multi-Step Tasks

For non-trivial tasks, Bob may:

- Inspect multiple files before editing
- Update a todo list as work progresses
- Ask for clarification only when necessary
- Apply changes incrementally
- Report concise completion results at the end

This stepwise approach helps reduce mistakes and keeps work traceable.

## Tips for Better Results

- Start with one clear objective
- Include technical context when available
- Mention exact errors if you have them
- Share expected behavior for bugs
- Prefer concrete requests over broad ones
- For documentation tasks, mention the target audience
- For reviews, mention what kind of issues you care about most

## Things Bob Is Especially Good At

Bob works particularly well for:

- Repository exploration
- Source code explanation
- Targeted edits
- Structured documentation
- Technical troubleshooting
- Change review
- Step-by-step implementation support

## Simple Starter Prompts

If you are not sure where to begin, try one of these:

```text
Explain this repository to me like I am a new developer joining the project
```

```text
Show me where the main backend routes are defined
```

```text
Write a setup guide for running this application locally
```

```text
Review the current code changes and identify any bugs
```

```text
Find the files involved in user login and explain the flow
```

## Final Advice

Treat Bob like a technical collaborator: give a clear goal, enough context to act, and the outcome you want. The more concrete the request, the more precise and useful the result will be.

For most tasks, plain English is enough. Start simple, then refine the request if you want a narrower explanation, a more detailed implementation, or a different output format.