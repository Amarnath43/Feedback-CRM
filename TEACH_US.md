# TEACH_US.md

## Use AI for Ideas, Not Decisions

One practice that has improved my productivity is treating AI as a brainstorming partner rather than an authority.

AI is excellent at generating implementation options, identifying edge cases, and accelerating development. However, the final decision should always come from understanding the application's requirements and user experience goals.

A good example from this project was the feedback status update workflow.

When a feedback status changed, AI suggested refetching the entire dashboard data after every update. While this approach worked, it caused unnecessary network requests and introduced a visible UI refresh.

Instead, I updated the affected feedback item in local state immediately and only refreshed the analytics summary. This provided a smoother user experience while reducing unnecessary data fetching.

This experience reinforced an important lesson:

**The best use of AI is not accepting the first solution it provides. The best use of AI is using it to explore options and then applying engineering judgment to choose the most appropriate one.**

My workflow is usually:

1. Ask AI for multiple approaches.
2. Evaluate trade-offs.
3. Implement the solution that best fits the requirements.
4. Use AI again for review and validation.

AI can significantly increase development speed, but ownership of the solution should always remain with the engineer.

In my experience, developers gain the most value from AI when they treat it as a collaborator that helps them think, rather than as a tool that makes decisions for them.
