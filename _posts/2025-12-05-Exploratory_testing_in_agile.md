---
layout: post
title: "Exploratory tesing in agile"
date: 2025-12-05
---

### Why exploratory testing is important in an agile framework

When we deliver software using an agile methodology such as Scrum, we typically develop (and of course test) functionality in small, discrete packages.

When a ticket is being worked upon QA will take the acceptance criteria as the starting point for designing our test cases which we then usually write scripts for in a test tool - either to be executed manually or automated. (As an aside I've recently been experimenting with using AI to help write test cases. I hate to admit it but I've been pleasantly surprised by the results. Give it a go if you haven't yet.)

We'll then execute the test scripts and, assuming no defects are discovered, move the ticket on to the next stage of the board (generally PO acceptance but can vary depending on flavour of agile / organisation etc).

That's all well and good but it doesn't quite feel satisfactory to me - which is where exploratory testing comes in.

### What is exploratory testing?

Simply put, unscripted tests. While a well designed and written suite of test cases will cover the functionality being developed it generally isn't the full story. It is usually very valuable to supplement this with exploratory testing. This is where QA goes "off piste" and tries to think outside of the box with the ways we interact with the system under test. We will explore unpredictable user behaviour, provoke extreme edge cases and generally try to break things.

When I say exploratory testing is largely unscripted that's not to say there are no techniques / strategies we can employ whilst engaged in this test approach:

- Session based testing. We time box a session, set out some general goals (such as thoroughly test the login journey of a mobile banking app) and explore.
- Mind mapping. Mind maps are effective tools for visualising journeys through a system. This is particularly useful for complex systems where e.g. there may be a number of interconnected APIs.
- Risk based testing. One of the basic principles of testing is that comprehensive testing, where test *everything* is simply not possible. There is only a finite amount of time and effort available to us. As such we can choose to target areas of the system under test which pose the largest risk. This may be at our discretion or a business lead decision.
- Pair or mob testing. Like pair or mob developing this is when we work with other testers in the spirit of "two heads are better than one" in terms of generating test ideas and having different perspectives on the matter at hand.
- Subject matter expertise. When we work on a piece of software and grow to be knowledgeable about it, this is a boon to exploratory testing.  To go back to the example of the login journey, I may have previously tested this journey and from this experience I know that the password reset journey is potentially vulnerable to inadvertent defects and know to thoroughly test this area, even if the changes being tested lie somewhere slightly different.
- A/ B testing. Comparing behaviours across environments / OSes / builds / versions can be extremely informative. In my current role I work on both mobile apps (Android and iOS). When testing a new feature I will often compare the two OSes. In addition, we have to support older versions of both OS so we can't just test on the latest version. 

To give a real world example of a defect discovered by exploratory testing that scripted, formal testing wouldn't have picked up on, we recently discovered an issue caused by race conditions in our mobile app. If a user repeatedly, quickly spammed a button in the app which triggered an API call, the sequence of calls could be corrupted and a 404 error was thrown. This 100% falls into the "extreme edge case" category but we knew from user reviews of the app that it had happened in production.

### Tools to support exploratory testing

For most testers exploratory testing will not be a major departure from their normal workflow so the tools they usually employ will most likely suffice. A few things to consider though might be:

- A lightweight note taking app. I usually use a plain text editor or something that supports Markdown. On Linux I use Typora and on my work Mac I use the OS included TextEdit app. A nice simple note taking tool is absolutely fine, we don't need to go down the formatting rabbit hole of a Word document.
- Screen recording and screenshot tools. Again I use the built in Screenshot app in MacOS - or sometimes QuickTime which has the added benefit of integrating with Xcode.
- Bug reporting: again this will most likely be the same tool you use in your normal testing. The key difference for me is that for defects found outwith formal testing I raise them directly in Jira, whereas when executing scripted tests I initially raise them in the test tool qTest which is itself integrated with Jira and a corresponding Jira ticket is created by the tool.
- An inspector / recorder tool. What I mean here is we may discover flows while exploratory testing that we want to automate to return to later. Various tools exist that can do this - in my current role as a mobile app tester I have used Appium Inspector and Maestro Studio for this purpose.

### Benefits of exploratory testing

- Early testing, quick feedback. We can test a new feature as soon as it is developed without needing to script and execute formal test cases. "Kick the tyres" of the system under test. Unscripted interaction with the product often exposes high-impact issues earlier than structured test cycles.
- Better placed to uncover edge cases. Of course a well designed test suite will include edge cases and negative scenarios but further exploratory testing can really delve into this aspect of the system. This can tie into our knowledge and expertise of the system.
- Enhanced collaboration and knowledge transfer. Working together on exploratory testing is the ideal opportunity for e.g. an experienced tester to share with a new starter: quirks of the system they are working on etc.
- Increases productivity in downtime. When development of tickets take longer than anticipated it can result in a delay in work reaching Ready for Test. When this happens the QA team can engage in exploratory testing so that value is still added to the process even when e.g. waiting for build issues to be resolved.

### It's not either or

Exploratory testing absolutely shouldn't replace scripted formal testing but it is the perfect complement to it. Well designed test case, when accurately executed *will* uncover defects but we know that it can and does miss some. That's where exploratory testing comes in to support our testing process.

Situations such as race conditions, extreme edge cases and cross OS discrepancies may well be covered by regular testing *to an extent* but exploratory testing affords us the opportunity to get stuck in even deeper.

I'm sure your team does engage in exploratory testing to some extent but I would absolutely encourage you to ensure it features as a regular component of your testing approach in an agile methodology.

 
