---
layout: post
title: "QA - it’s more than just bug hunting and button pushing"
date: 2025-12-02
---

# Let's talk QA

When the term QA or test is mentioned in the context of developing software a common perception is of the tester just squirrelling away at an application, raising bugs as they encounter them. While, yes, this is part of our jobs, it is only part of the story. Good software testing requires a lot more than bug hunting.

### The misconception:

This probably largely stems from the interactions of the QA members with the wider development team. When I ping a developer to chat about something, the "something" is more often than not an issue with their code.

The other preconception is the "button pusher", just robotically following acceptance criteria and testing by rote. Again, this goes with the territory of testing but again, it does not tell the whole story.

### The real life situation

My first proper job was working for a large UK bank on their business banking on-boarding process - essentially a suite of related web apps, including the customer facing website. This was a few years ago and the bank still very much operated a traditional waterfall development model. We had large releases a few times a year, each containing a lot of functionality.

It was the test team's responsibility to thoroughly test all the new functions and ensure it all matched what was specified in the Business Requirements Document. While the business analysts were based in the same building, the developers were offshore in India and we had zero interaction with them. Whenever we hit issues we would routinely raise defects in Quality Centre and patiently wait for a fix to come back from the dev team.

After a few years there I moved onto a new company working on a public facing, large volume governmental website. This organisation operated a scrum agile methodology and released far more frequently. As the new functions would reach test more quickly and the changes were far more atomic, detailed in individual Jira tickets rather than one massive requirements document, I found myself raising fewer defects.

As a still relatively new test analyst this bothered me and I shared my feelings with my scrum master. She was delighted!

This threw me off!

We had a long discussion about the responsibilities and input of QA in the development process and she was absolutely correct. Instead of chucking large chunks of broken software at QA and then triaging and fixing a long list of defects, test was getting involved earlier in the process and *preventing* bugs arising in the first place.

### The wider impact of QA

Testing tickets and raising bugs is our bread and butter but QA has a much wider impact than that.

- Usability and user journey implications:
  - Whenever we work with an application or web page etc, we put ourselves in the place of a user. Ultimately our software products will be in the hands of punters - we need to think like them as far as possible. If a journey isn't broken or a feature is functional, they still might not the best experience for our users. QA feedback can inform improvement of these experiences.
- Finding issues early before they become bugs.
  - The 3 Amigos meeting is a very powerful tool for this purpose. Getting the three disciplines (business, dev, test) early on in the development process can be really valuable. We ascertain the requirements are clear and that we share a common understanding of what we are building - or we clarify any ambiguity.
  - An example of this would be years ago when I joined a 3 Amigos to discuss a new API endpoint we were going to develop. I noticed some inconsistencies in the schema being used which could well have led to defects after the code had been written. We were able to address this before development had properly begun.
- Accessibility issues:
  - Screen reader and other accessibility tools are important to allow access to our software by users with impairments. It is easily overlooked but as testers we can again remind and illustrate to the business its importance. As non genuine users it can be challenging to put ourselves in the place of e.g. a user with little vision but it is an important part of testing not routinely covered in functional tickets themselves.
- Security focus:
  - Penetration testing is of course an entire (specialised) discipline in its own right but we can 100% test with a secure mindset. Weak validation, vague error messages, poor session handling are all security related aspects we can be vigilant for.
- Process improvement:
  - Typically QA will have a large input on the lifecycle of defects. Of the bigger, overall software development lifecycle perhaps not so much but we still have some influence. CI pipelines can be improved by increasing test automation coverage, fixing or removing flaky tests. Even the release process (which varies wildly by organisation) can often be tweaked for the better.

### Quality ownership across the lifecycle

- Requirements analysis:
  - We frequently work closely with business analysts to ensure requirements for new features are accurate, meaningful and comprehensive. The acceptance criteria are our starting point when we come to design test cases after all.
- Test planning and strategy:
  - This can vary depending on the nature of the organisation but a couple of examples of this are my current company - again a bank. As an audited organisation we need a paper trail of controls and test plans are an important part of that. In a previous company, QA and the major stakeholders worked together to establish an agreed upon defect life cycle.
- Automation and CI/CD integration:
  - Automation has been a buzz word for years and companies frequently view it is a sliver bullet to cure all their quality woes. I don't subscribe to this notion but that's probably a topic for another blog post. Nevertheless, test automation is an important role. As we don't usually have the same level of coding expertise as actual developers, this is usually another responsibility shouldered by both dev and test.

## The Bigger Picture of Quality

To go back to my previous experience of moving from waterfall to agile: I initially found the relative lower volume of defects I and other testers were raising a little concerning. But, it formed a turning point when I started to grasp the wider context of quality assurance in the software development process. The term *shift left* is often used to describe this concept in action and it is a good way to think about it.

The left hand side of a project board shows work yet to be done. Analysts will need to write the initial tickets to get them on the board but QA can absolutely interrogate work before it any code has been written for inconsistencies, ambiguity, indeed even outright errors and we will naturally see fewer defects encountered.

This early involvement of the QA team *bakes in* quality from the very start and along with all the other influences QA has on the development cycle, it is clear that QA has a very important role in building high quality software. And running test execution and raising bugs!
