import type { BlogPost } from './blog';

export const additionalBlogPosts: BlogPost[] = [
  {
    slug: 'before-you-build-that-saas-delta-4-ai-substitution-test',
    title: 'Before You Build That SaaS: The Delta 4 Test and the AI Substitution Test',
    description:
      "Before building a SaaS or web app, run Kunal Shah's Delta 4 test and an AI substitution test against ChatGPT, Claude, Gemini, and existing alternatives.",
    publishDate: '2026-09-07',
    dateModified: '2026-09-07',
    keywords: [
      'before building a SaaS',
      'Delta 4 framework',
      'AI substitution test',
      'SaaS idea validation',
      'should I build this SaaS',
      'ChatGPT SaaS competition',
      'Claude SaaS competition',
      'validate startup idea before coding',
    ],
    content: [
      {
        type: 'paragraph',
        text: 'AI coding tools have made it dramatically easier to build software. That is useful, but it also creates a new founder trap: because you can build something quickly, it starts to feel as if you should build it. Those are two different questions. The cost of producing software has fallen. The difficulty of creating something people will switch to, pay for, and keep using has not disappeared.',
      },
      {
        type: 'paragraph',
        text: 'Before opening your editor, paying for another coding-agent subscription, or spending another month polishing a product, compare your idea against the strongest behaviour that already exists. Today that comparison must include not only competing SaaS products, but also general-purpose AI assistants such as ChatGPT, Claude, Gemini, and whatever users already do manually.',
      },
      {
        type: 'heading',
        text: 'Start with the Delta 4 test',
      },
      {
        type: 'paragraph',
        text: "Delta 4 is a product framework associated with Kunal Shah, founder of CRED and FreeCharge. The idea is deliberately simple: identify the user's current behaviour, score its efficiency from 1 to 10, score the proposed new behaviour from 1 to 10, and calculate the difference. A gap of four points or more is the important threshold in the framework.",
      },
      {
        type: 'list',
        items: [
          'Old behaviour: What does the customer actually do today?',
          'Old score: How efficient does that behaviour feel from 1 to 10?',
          'New behaviour: What will the customer do with your product instead?',
          'New score: How efficient does that new behaviour feel from 1 to 10?',
          'Delta: New score minus old score.',
        ],
      },
      {
        type: 'paragraph',
        text: "Shah has described Delta 4 products as creating three useful signals: people are reluctant to return to the old behaviour, they tolerate some imperfections because the new way is still much better, and they are more likely to talk about the product. Treat this as a diagnostic lens, not a scientific law. The scores are subjective, and founders are usually the least neutral people to assign them.",
      },
      {
        type: 'heading',
        text: 'Your real competitor may be ChatGPT, Claude, or Gemini',
      },
      {
        type: 'paragraph',
        text: 'A few years ago, a founder might compare a new product mainly with another website, spreadsheet, agency, or manual workflow. Now there is another default behaviour: ask a general-purpose AI assistant. For many writing, analysis, research, planning, summarisation, coding, brainstorming, and transformation tasks, that is already a very capable baseline.',
      },
      {
        type: 'paragraph',
        text: 'That means your Delta 4 comparison should not use a deliberately weak old behaviour. If the customer would realistically open ChatGPT before visiting your product, then ChatGPT is part of the incumbent behaviour. The same is true for Claude, Gemini, spreadsheets, search engines, existing software, or a human service provider.',
      },
      {
        type: 'heading',
        text: 'Add an AI substitution test',
      },
      {
        type: 'paragraph',
        text: "The AI substitution test is a companion lens for the current software market. It is not part of Kunal Shah's Delta 4 framework. Its purpose is to ask a harder question: if a capable general-purpose AI can already deliver most of the outcome, what exactly is left for your product to own?",
      },
      {
        type: 'list',
        items: [
          'Would you personally use this product as a customer, or would you first open ChatGPT, Claude, Gemini, or another existing tool?',
          'Can a user get 80 to 90 percent of the desired outcome from one good prompt?',
          'If the AI answer is imperfect, is fixing it manually still easier than learning and paying for your product?',
          'Does your product remember useful state, history, preferences, or business context that a one-off prompt does not?',
          'Does it connect to systems, move data, trigger actions, or complete a workflow rather than merely generate an answer?',
          'Does it create collaboration, approvals, shared records, permissions, auditability, or other organisational value?',
          'Does it own proprietary data, a network, a marketplace, distribution, trust, or infrastructure that a general-purpose model does not?',
          'If OpenAI, Anthropic, Google, or another major AI provider ships your headline feature tomorrow, what remains valuable?',
        ],
      },
      {
        type: 'heading',
        text: 'Score against the best alternative, not the weakest one',
      },
      {
        type: 'paragraph',
        text: 'Founders often make their product look stronger by choosing an outdated comparison. That defeats the purpose of the test. If the user has three realistic alternatives, score all three and compare your product with the strongest one.',
      },
      {
        type: 'list',
        items: [
          'Current manual behaviour: 5/10',
          'Existing SaaS competitor: 7/10',
          'General-purpose AI assistant: 8/10',
          'Your proposed product: 9/10',
        ],
      },
      {
        type: 'paragraph',
        text: 'Against the manual process, the product appears to have a Delta of 4. Against the behaviour the customer is actually most likely to choose, the Delta is only 1. That is a very different business. The question is not whether your product is good. The question is whether it is sufficiently better than what the customer can already do.',
      },
      {
        type: 'heading',
        text: 'Before you open Claude Code, Codex, Cursor, or another coding agent',
      },
      {
        type: 'paragraph',
        text: 'Ask these questions before you turn an idea into a repository. You do not need perfect answers, but weak answers are useful information.',
      },
      {
        type: 'list',
        items: [
          'Who exactly has this problem?',
          'What do they do today when your product does not exist?',
          'How painful, frequent, expensive, or risky is that current behaviour?',
          'Would I personally pay for this product instead of using an AI assistant or existing tool?',
          'What is the old behaviour score from 1 to 10?',
          'What is the new behaviour score from 1 to 10?',
          'Is the difference genuinely four points or more when judged by the customer?',
          'Can the main outcome be reproduced with a prompt and a few minutes of manual work?',
          'Why would a user create another account, learn another interface, and possibly pay another subscription?',
          'Does the product save enough time, money, effort, or risk to justify switching?',
          'Does its value improve as the user adds history, data, integrations, collaborators, or workflow state?',
          'Can I reach customers without depending entirely on Google search or paid ads?',
          'What makes this harder to copy than the code itself?',
          'What happens if a major AI platform adds this feature?',
          'Would users notice if this product disappeared tomorrow?',
        ],
      },
      {
        type: 'heading',
        text: 'What can still be strong in an AI-heavy market?',
      },
      {
        type: 'paragraph',
        text: 'A product does not need to avoid AI to be defensible. In many cases AI should be part of the product. The stronger question is whether the product owns something beyond model output.',
      },
      {
        type: 'list',
        items: [
          'Workflow: the product completes a repeatable job from start to finish.',
          'Actions: it changes records, sends messages, moves money, publishes, schedules, files, or executes something useful.',
          'Persistent context: it becomes more valuable because it understands the customer over time.',
          'Integrations: it sits inside systems the customer already depends on.',
          'Collaboration: teams coordinate, approve, comment, share, or maintain a common source of truth.',
          'Proprietary data: the product has access to information or feedback loops that a generic model does not.',
          'Network effects: additional users, suppliers, creators, buyers, or participants improve the product for others.',
          'Trust and accountability: customers rely on the product for records, controls, compliance, security, or a specialised reputation.',
          'Distribution: the company has a repeatable way to reach the right customers that cannot be copied by duplicating the interface.',
        ],
      },
      {
        type: 'heading',
        text: 'A prompt wrapper is not automatically a bad business',
      },
      {
        type: 'paragraph',
        text: 'Calling something a prompt wrapper is often too simplistic. A thin interface around a model can still become valuable if it removes meaningful work, produces a much better workflow, owns customer context, or performs actions the underlying chat product does not. But if the only advantage is a pre-written prompt behind a different textbox, the AI substitution risk is unusually high.',
      },
      {
        type: 'heading',
        text: 'Do not confuse ease of building with evidence of demand',
      },
      {
        type: 'paragraph',
        text: 'This is the uncomfortable change AI coding creates for founders. The feedback loop from idea to working software is now so fast that building can become a form of procrastination. You can spend weeks improving onboarding, pricing pages, animations, databases, and infrastructure before proving that the behaviour is meaningfully better for anyone.',
      },
      {
        type: 'paragraph',
        text: 'The better sequence is to identify the current behaviour, identify the strongest substitute, test whether the new behaviour is dramatically better, and then build the smallest thing needed to test that belief with real users. Code should follow evidence, not substitute for it.',
      },
      {
        type: 'heading',
        text: 'One final test: would you still build it if coding were difficult?',
      },
      {
        type: 'paragraph',
        text: 'Imagine the product would take six months to build instead of six days. Would the customer problem still look important enough? Would the advantage over existing behaviour still look large enough? Would you still believe someone would pay? If the idea only feels attractive because AI made the implementation cheap, that is worth noticing before you invest more time.',
      },
      {
        type: 'paragraph',
        text: 'Delta 4 cannot guarantee that a company will work, and the AI substitution test cannot prove that one will fail. Together, though, they force a useful discipline: compare your idea with the behaviour people already prefer, not with the world you wish existed. Before you build another SaaS, make the new behaviour earn the right to exist.',
      },
    ],
  },
];
