const CURRICULUM_DATA = [
  // ================= WEEK 1: SURVIVAL PHRASES & THINKING IN ENGLISH =================
  {
    day: 1,
    week: 1,
    title: "Natural Self-Introduction",
    goal: "Introduce yourself confidently in 60 seconds without translating in your head.",
    tip: "Don't just state facts like a robot. Add one brief detail about WHY you do what you do or what you enjoy.",
    phrases: [
      {
        phrase: "Hi, I'm [Name], and I currently work as...",
        example: "Hi, I'm Rahul, and I currently work as a software developer.",
        context: "Use 'currently' to sound natural and professional when introducing your role."
      },
      {
        phrase: "What I really enjoy about my work is...",
        example: "What I really enjoy about my work is solving practical problems for people.",
        context: "Great for transitioning from your job title to an engaging conversation."
      },
      {
        phrase: "Originally, I'm from..., but now I'm based in...",
        example: "Originally, I'm from Chennai, but now I'm based in Bangalore.",
        context: "Native speakers often say 'I'm based in' instead of 'I am living in'."
      },
      {
        phrase: "Outside of work, I'm really into...",
        example: "Outside of work, I'm really into photography and fitness.",
        context: "'I'm really into' is a warm, conversational way to say 'My hobby is'."
      },
      {
        phrase: "Right now, I'm focusing on...",
        example: "Right now, I'm focusing on improving my spoken English communication.",
        context: "Shows ambition and shares your current goal naturally."
      }
    ],
    dialogue: [
      { speaker: "Partner", text: "Hi there! I don't think we've met yet. How's it going?" },
      { speaker: "You", text: "Hi! It's going great, thanks. I'm Alex. Nice to meet you!" },
      { speaker: "Partner", text: "Nice to meet you too, Alex. What do you do?" },
      { speaker: "You", text: "I currently work in marketing. What I really enjoy about it is working on creative campaigns. How about you?" }
    ],
    prompt: {
      question: "Introduce yourself as if you just met a friendly colleague at a coffee shop.",
      prep: {
        point: "State your name, where you are based, and what you do.",
        reason: "Share why you like your current field or study.",
        example: "Mention one hobby you enjoy outside of work.",
        wrap: "End with what you are excited to learn or do this month."
      }
    }
  },
  {
    day: 2,
    week: 1,
    title: "Narrating Your Daily Routine",
    goal: "Master the Simple Present tense to describe habits and daily actions.",
    tip: "Throughout today, narrate 10 actions in your head as you do them ('I'm pouring water', 'I'm checking my phone').",
    phrases: [
      {
        phrase: "The first thing I do in the morning is...",
        example: "The first thing I do in the morning is drink a glass of warm water.",
        context: "Strong opener when talking about your daily schedule."
      },
      {
        phrase: "I usually kick off my workday by...",
        example: "I usually kick off my workday by checking my top three priorities.",
        context: "'Kick off' means to start something with energy."
      },
      {
        phrase: "It takes me about [time] to get to...",
        example: "It takes me about thirty minutes to get to the office.",
        context: "Essential structure for talking about travel or task duration."
      },
      {
        phrase: "In the evening, I like to wind down by...",
        example: "In the evening, I like to wind down by going for a short walk.",
        context: "'Wind down' means to relax after a busy day."
      },
      {
        phrase: "Most days, I try to make time for...",
        example: "Most days, I try to make time for forty-five minutes of English practice.",
        context: "Shows intentional habits."
      }
    ],
    dialogue: [
      { speaker: "Partner", text: "Are you more of a morning person or a night owl?" },
      { speaker: "You", text: "I'm definitely a morning person. The first thing I do in the morning is go for a quick run." },
      { speaker: "Partner", text: "That's impressive! How do you relax after work?" },
      { speaker: "You", text: "In the evening, I like to wind down by listening to music and cooking dinner." }
    ],
    prompt: {
      question: "Walk me through your typical weekday from morning to night.",
      prep: {
        point: "Summarize whether your days are usually busy, structured, or relaxed.",
        reason: "Explain what takes up most of your time during the day.",
        example: "Describe your favorite part of the morning or evening routine.",
        wrap: "Mention one habit you want to add to your routine."
      }
    }
  },
  {
    day: 3,
    week: 1,
    title: "Talking About Yesterday (Simple Past)",
    goal: "Speak smoothly about past events without mixing up present and past verbs.",
    tip: "Focus on common irregular past verbs: went, saw, made, took, had, spoke, thought, bought.",
    phrases: [
      {
        phrase: "Yesterday, I spent most of my time...",
        example: "Yesterday, I spent most of my time finishing a client project.",
        context: "Always follow 'spent time' with an -ing verb."
      },
      {
        phrase: "Everything went smoothly until...",
        example: "Everything went smoothly until my internet connection dropped.",
        context: "Great for adding contrast when telling a story about your day."
      },
      {
        phrase: "I ended up [verb-ing]...",
        example: "I ended up staying at the office an hour later than planned.",
        context: "'Ended up' describes an unplanned result."
      },
      {
        phrase: "One highlight of my day was...",
        example: "One highlight of my day was catching up with an old friend over phone.",
        context: "'Highlight' means the best or most memorable moment."
      },
      {
        phrase: "Looking back, I’m glad I...",
        example: "Looking back, I'm glad I started the task early in the morning.",
        context: "Useful for reflecting on a past decision."
      }
    ],
    dialogue: [
      { speaker: "Partner", text: "Hey! How was your day yesterday?" },
      { speaker: "You", text: "It was pretty productive! Yesterday, I spent most of my time preparing for a presentation." },
      { speaker: "Partner", text: "Nice! Did you do anything fun in the evening?" },
      { speaker: "You", text: "Yes, I ended up trying a new restaurant near my house with my family." }
    ],
    prompt: {
      question: "What did you do yesterday, and what was the best part of your day?",
      prep: {
        point: "Give a one-sentence summary of how yesterday went.",
        reason: "Explain the main tasks or events that happened.",
        example: "Share one specific moment (the highlight) in detail.",
        wrap: "Conclude with how you felt at the end of the day."
      }
    }
  },
  {
    day: 4,
    week: 1,
    title: "Future Plans & Intentions",
    goal: "Use 'going to', 'planning to', and 'looking forward to' naturally.",
    tip: "Use 'I'm going to' for decided plans, and 'I'll probably' for spontaneous or uncertain ideas.",
    phrases: [
      {
        phrase: "This weekend, I'm planning to...",
        example: "This weekend, I'm planning to visit my parents and relax.",
        context: "More natural in casual speech than 'I will visit'."
      },
      {
        phrase: "I'm really looking forward to [verb-ing]...",
        example: "I'm really looking forward to watching the new movie on Friday.",
        context: "Remember: use a noun or '-ing' verb after 'looking forward to'."
      },
      {
        phrase: "Over the next few months, I'd like to...",
        example: "Over the next few months, I'd like to become much more confident in meetings.",
        context: "Polite and clear way to express medium-term goals."
      },
      {
        phrase: "If everything goes according to plan, I'll...",
        example: "If everything goes according to plan, I'll finish this course by next month.",
        context: "Great conditional phrase for future goals."
      },
      {
        phrase: "I haven't decided yet, but I might...",
        example: "I haven't decided yet, but I might take a short trip next month.",
        context: "Perfect when you aren't 100% sure about your plans."
      }
    ],
    dialogue: [
      { speaker: "Partner", text: "Do you have any plans for the upcoming weekend?" },
      { speaker: "You", text: "This weekend, I'm planning to catch up on some reading and meet a friend." },
      { speaker: "Partner", text: "Sounds relaxing! Anything special you're excited about?" },
      { speaker: "You", text: "I'm really looking forward to trying a new coffee shop that just opened." }
    ],
    prompt: {
      question: "What are your plans for this weekend and your main goals for the next month?",
      prep: {
        point: "State your main plan for the upcoming weekend.",
        reason: "Explain why you chose that plan (to rest, learn, or socialize).",
        example: "Share one bigger goal you want to achieve in the next 30 days.",
        wrap: "Say how you will feel once you accomplish it."
      }
    }
  },
  {
    day: 5,
    week: 1,
    title: "Polite Requests & Asking for Help",
    goal: "Sound polite and natural instead of overly direct when asking for things.",
    tip: "Instead of 'Send me the file', soften it with 'Could you please...' or 'Would you mind...'",
    phrases: [
      {
        phrase: "Could you do me a quick favor and...?",
        example: "Could you do me a quick favor and share the meeting link?",
        context: "Warm, friendly way to ask a colleague or friend for small help."
      },
      {
        phrase: "Would you mind [verb-ing]...?",
        example: "Would you mind speaking a little slower, please?",
        context: "Always follow 'Would you mind' with an -ing verb."
      },
      {
        phrase: "I was wondering if you could help me with...",
        example: "I was wondering if you could help me with this report when you have a moment.",
        context: "Very polite and respectful for bigger requests."
      },
      {
        phrase: "Whenever you get a chance, could you...?",
        example: "Whenever you get a chance, could you review my message?",
        context: "Removes pressure while still making a clear request."
      },
      {
        phrase: "Let me know if you need any more details.",
        example: "I've sent the summary—let me know if you need any more details.",
        context: "Great closing line in spoken or written workplace communication."
      }
    ],
    dialogue: [
      { speaker: "Partner", text: "Hi! Do you need something before the meeting starts?" },
      { speaker: "You", text: "Yes, could you do me a quick favor and check if my audio is clear?" },
      { speaker: "Partner", text: "Sure, I can hear you well! Anything else?" },
      { speaker: "You", text: "Whenever you get a chance, could you also send me the slide deck? Thanks so much!" }
    ],
    prompt: {
      question: "Practice asking a colleague or friend for help on a busy project.",
      prep: {
        point: "Politely ask if they have two minutes to help you.",
        reason: "Explain why you need their input or assistance.",
        example: "Specify the exact small action you need them to take.",
        wrap: "Thank them and offer to return the favor anytime."
      }
    }
  },
  {
    day: 6,
    week: 1,
    title: "Out & About: Ordering, Shopping & Directions",
    goal: "Handle real-world daily interactions smoothly without hesitation.",
    tip: "Use 'Can I get...' or 'I'd like...' instead of 'Give me...' at cafes, shops, and counters.",
    phrases: [
      {
        phrase: "Hi, could I get a..., please?",
        example: "Hi, could I get a medium iced coffee with oat milk, please?",
        context: "The most natural way to order food or drinks in English."
      },
      {
        phrase: "Excuse me, do you happen to know where... is?",
        example: "Excuse me, do you happen to know where the nearest metro station is?",
        context: "'Do you happen to know' sounds much politer than 'Where is'."
      },
      {
        phrase: "I'm just browsing for now, thank you.",
        example: "I'm just browsing for now, thank you, but I'll let you know if I need help.",
        context: "Use this when a shop assistant asks if you need assistance."
      },
      {
        phrase: "Does this come in a different size or color?",
        example: "I really like this jacket—does this come in a medium?",
        context: "Handy phrase whenever shopping for clothes or products."
      },
      {
        phrase: "Could I pay by card, or is it cash only?",
        example: "Could I pay by card, or do you prefer digital payment?",
        context: "Practical checkout question anywhere."
      }
    ],
    dialogue: [
      { speaker: "Partner", text: "Welcome! What can I get started for you today?" },
      { speaker: "You", text: "Hi! Could I get a cappuccino and a toasted sandwich, please?" },
      { speaker: "Partner", text: "Of course! Would you like that for here or to go?" },
      { speaker: "You", text: "To go, please. Could I pay by card?" }
    ],
    prompt: {
      question: "Roleplay ordering a meal at a café and asking the staff for a local recommendation.",
      prep: {
        point: "Greet the server and place your food/drink order politely.",
        reason: "Mention a preference (e.g., less sugar, spicy, or takeaway).",
        example: "Ask them what their most popular dish or dessert is.",
        wrap: "Thank them and complete the payment."
      }
    }
  },
  {
    day: 7,
    week: 1,
    title: "Week 1 Milestone: 2-Minute Non-Stop Talk",
    goal: "Combine Present, Past, and Future tenses in one continuous 2-minute talk.",
    tip: "Do not stop the timer even if you make a grammar slip. Keep the flow moving!",
    phrases: [
      {
        phrase: "To give you a quick background about me...",
        example: "To give you a quick background about me, I've been working in tech for three years.",
        context: "Smooth bridge into your personal story."
      },
      {
        phrase: "Over the past week, I've been practicing...",
        example: "Over the past week, I've been practicing speaking English out loud every day.",
        context: "Connects the past 7 days to the present moment."
      },
      {
        phrase: "At first, it felt a bit challenging, but now...",
        example: "At first, it felt a bit challenging, but now I feel much more comfortable.",
        context: "Shows progress and growth."
      },
      {
        phrase: "One thing I noticed this week is that...",
        example: "One thing I noticed this week is that speaking slowly helps me think clearly.",
        context: "Great for sharing an insight or lesson learned."
      },
      {
        phrase: "Going into next week, my main focus is...",
        example: "Going into next week, my main focus is keeping conversations flowing naturally.",
        context: "Transitions smoothly to the future."
      }
    ],
    dialogue: [
      { speaker: "Partner", text: "Congrats on finishing Week 1! How are you feeling about your English so far?" },
      { speaker: "You", text: "At first, it felt a bit challenging, but now I'm starting to think directly in English." },
      { speaker: "Partner", text: "That's huge progress! What helped you the most?" },
      { speaker: "You", text: "One thing I noticed this week is that learning full phrases is much easier than memorizing single words." }
    ],
    prompt: {
      question: "Record a 2-minute reflection covering who you are, how your first week went, and what you plan to do next week.",
      prep: {
        point: "Introduce yourself and state that you just completed Week 1.",
        reason: "Explain why you decided to commit to this 30-day challenge.",
        example: "Share your favorite phrase or moment from the past 7 days.",
        wrap: "State your goal for Week 2."
      }
    }
  },

  // ================= WEEK 2: EVERYDAY CONVERSATIONS & QUESTIONS =================
  {
    day: 8,
    week: 2,
    title: "Keeping Small Talk Alive",
    goal: "Turn short one-word answers into friendly back-and-forth conversations.",
    tip: "Use the 'Answer + Add a Detail + Ask Back' formula so the conversation never dies.",
    phrases: [
      {
        phrase: "It's been a busy week so far, mainly because...",
        example: "It's been a busy week so far, mainly because we're launching a new project.",
        context: "Much better than just replying 'Good' or 'Fine' to 'How's your week going?'"
      },
      {
        phrase: "How about you? What have you been up to lately?",
        example: "I had a quiet weekend. How about you? What have you been up to lately?",
        context: "'What have you been up to?' is the most natural way to ask 'What have you been doing?'"
      },
      {
        phrase: "That sounds really interesting! How did you get into that?",
        example: "You run marathons? That sounds really interesting! How did you get into that?",
        context: "People love talking about how they started a hobby or career."
      },
      {
        phrase: "Tell me more about...",
        example: "Tell me more about the trip you took last month!",
        context: "Keeps the spotlight on the other person when you want to listen."
      },
      {
        phrase: "I totally know what you mean.",
        example: "Traffic was terrible today—I totally know what you mean.",
        context: "Builds instant rapport and empathy."
      }
    ],
    dialogue: [
      { speaker: "Partner", text: "Hey! How's your week going so far?" },
      { speaker: "You", text: "It's been a busy week so far, mainly because of some tight deadlines, but it's going well! How about you? What have you been up to lately?" },
      { speaker: "Partner", text: "I've been learning how to bake sourdough bread in the evenings." },
      { speaker: "You", text: "That sounds really interesting! How did you get into that?" }
    ],
    prompt: {
      question: "Imagine someone asks you 'How has your week been?' Give a 3-sentence response and ask a follow-up question.",
      prep: {
        point: "Answer directly with positive energy.",
        reason: "Add one specific reason why your week has been busy, calm, or exciting.",
        example: "Share one small detail from the last two days.",
        wrap: "Toss the ball back with an open-ended question."
      }
    }
  },
  {
    day: 9,
    week: 2,
    title: "Natural Conversation Fillers (Never Freeze Again)",
    goal: "Buy yourself 3–5 seconds to think of words without awkward silence or 'ummm'.",
    tip: "Native speakers use fillers constantly while organizing their thoughts. Use them slowly and calmly!",
    phrases: [
      {
        phrase: "That's a great question—let me think for a second.",
        example: "That's a great question—let me think for a second about the best example.",
        context: "Gives you time to breathe and plan your sentence."
      },
      {
        phrase: "Well, the way I see it is...",
        example: "Well, the way I see it is that consistency matters more than speed.",
        context: "Smooth starter when someone asks for your view."
      },
      {
        phrase: "How should I put it...",
        example: "The movie wasn't bad, it was just—how should I put it—a bit too slow for me.",
        context: "Use this when searching for the exact right word."
      },
      {
        phrase: "Actually, now that I think about it...",
        example: "Actually, now that I think about it, Tuesday works better than Monday.",
        context: "Great when you change your mind or remember a detail mid-sentence."
      },
      {
        phrase: "What I'm trying to say is...",
        example: "What I'm trying to say is that we should test the idea on a small scale first.",
        context: "Helps you clarify your point if your first sentence got messy."
      }
    ],
    dialogue: [
      { speaker: "Partner", text: "What's the biggest lesson you've learned in your career so far?" },
      { speaker: "You", text: "That's a great question—let me think for a second. Well, the way I see it is that clear communication solves half of all problems." },
      { speaker: "Partner", text: "Can you think of a time that happened?" },
      { speaker: "You", text: "Actually, now that I think about it, last month a quick five-minute call saved us days of confusion." }
    ],
    prompt: {
      question: "Answer this surprise question using at least two fillers: 'If you could master any skill overnight, what would it be and why?'",
      prep: {
        point: "Use a filler ('That's a great question...') then name the skill.",
        reason: "Explain why this skill matters to your life right now.",
        example: "Describe the first thing you would do with that skill tomorrow.",
        wrap: "Summarize with 'What I'm trying to say is...'"
      }
    }
  },
  {
    day: 10,
    week: 2,
    title: "Asking Great Follow-Up Questions",
    goal: "Form questions effortlessly without getting stuck on word order.",
    tip: "Remember the rhythm: Question Word + Helping Verb (do/did/are/have/would) + Subject + Main Verb.",
    phrases: [
      {
        phrase: "What made you decide to...?",
        example: "What made you decide to move to this city?",
        context: "Much more engaging than just asking 'Why did you...?'"
      },
      {
        phrase: "How long have you been [verb-ing]...?",
        example: "How long have you been working with this team?",
        context: "Use Present Perfect Continuous for actions that started in the past and continue now."
      },
      {
        phrase: "What was the most challenging part about...?",
        example: "What was the most challenging part about starting your own project?",
        context: "Shows deep interest in someone's experience."
      },
      {
        phrase: "If you don't mind me asking, how did you...?",
        example: "If you don't mind me asking, how did you prepare for the interview?",
        context: "Polite softener before asking a slightly personal or detailed question."
      },
      {
        phrase: "What do you usually do when...?",
        example: "What do you usually do when you feel stuck on a difficult task?",
        context: "Great for learning about someone's habits and strategies."
      }
    ],
    dialogue: [
      { speaker: "Partner", text: "I recently switched from finance to product design." },
      { speaker: "You", text: "Wow, that's a big change! What made you decide to make that switch?" },
      { speaker: "Partner", text: "I always loved building user-friendly apps. I've been doing it full-time now." },
      { speaker: "You", text: "How long have you been working as a designer, and what was the most challenging part about the transition?" }
    ],
    prompt: {
      question: "Imagine you are interviewing someone you admire. Ask them 4 thoughtful questions and explain why you want to know.",
      prep: {
        point: "Introduce who you would love to talk to.",
        reason: "Explain why their journey inspires you.",
        example: "Ask 3–4 natural questions using today's sentence patterns.",
        wrap: "Share what you hope to learn from their answers."
      }
    }
  },
  {
    day: 11,
    week: 2,
    title: "Agreeing & Disagreeing Politely",
    goal: "Share your honest opinion in discussions without sounding rude or blunt.",
    tip: "Never just say 'You are wrong' or 'I disagree.' Agree partially first, then add 'however' or 'on the other hand'.",
    phrases: [
      {
        phrase: "I completely agree with you on that, especially...",
        example: "I completely agree with you on that, especially the point about customer support.",
        context: "Strong, supportive agreement that adds value."
      },
      {
        phrase: "I see where you're coming from, but...",
        example: "I see where you're coming from, but we also need to consider the budget.",
        context: "The gold standard for polite disagreement in English."
      },
      {
        phrase: "That's a valid point. At the same time...",
        example: "That's a valid point. At the same time, rushing might hurt quality.",
        context: "Acknowledges the other person's intelligence before offering an alternative view."
      },
      {
        phrase: "Have we considered looking at it from this angle?",
        example: "Have we considered looking at it from the user's perspective?",
        context: "Introduces a different opinion as a helpful question."
      },
      {
        phrase: "I'm on the same page when it comes to...",
        example: "I'm on the same page when it comes to our main timeline.",
        context: "'On the same page' means sharing the same understanding."
      }
    ],
    dialogue: [
      { speaker: "Partner", text: "I think we should cancel all weekly meetings to save time." },
      { speaker: "You", text: "I see where you're coming from, but having no meetings at all might hurt team communication." },
      { speaker: "Partner", text: "True, long meetings just feel exhausting." },
      { speaker: "You", text: "I completely agree with you on that! Have we considered shortening it to a 15-minute standup instead?" }
    ],
    prompt: {
      question: "Respond to the statement: 'Working from home is always better than working in an office.'",
      prep: {
        point: "Acknowledge the strong points of the statement ('I see where people are coming from...').",
        reason: "Offer a balanced counterpoint using 'At the same time...'",
        example: "Give a real-life example of when office or remote work works best.",
        wrap: "Conclude with your balanced view."
      }
    }
  },
  {
    day: 12,
    week: 2,
    title: "Phone Calls & Video Meetings",
    goal: "Handle online calls, audio glitches, and meeting transitions like a pro.",
    tip: "Have 3 go-to phrases ready for technical issues so you never panic on Zoom, Teams, or phone calls.",
    phrases: [
      {
        phrase: "Hi everyone, thanks for joining—can you hear me okay?",
        example: "Hi everyone, thanks for joining—can you hear me okay and see my screen?",
        context: "Confident, friendly way to open any virtual call."
      },
      {
        phrase: "Sorry, you broke up for a second. Could you repeat that last part?",
        example: "Sorry, you broke up for a second. Could you repeat what you said about the deadline?",
        context: "'Broke up' is the natural phrasal verb when someone's audio cuts out."
      },
      {
        phrase: "Just to make sure I understood correctly, you mean...?",
        example: "Just to make sure I understood correctly, we're launching on Wednesday, right?",
        context: "Prevents miscommunication and confirms action items."
      },
      {
        phrase: "Sorry to jump in, but I'd love to add a quick point here.",
        example: "Sorry to jump in, but I'd love to add a quick point before we move on.",
        context: "Polite way to speak up in a busy group call."
      },
      {
        phrase: "Before we wrap up, let's quickly recap the next steps.",
        example: "Before we wrap up, let's quickly recap who is handling each task.",
        context: "'Wrap up' means to finish a meeting or task."
      }
    ],
    dialogue: [
      { speaker: "Partner", text: "So we need to finalize the... [static] ...by Friday afternoon." },
      { speaker: "You", text: "Sorry, you broke up for a second. Could you repeat that last part?" },
      { speaker: "Partner", text: "Oh, sorry! I said we need to finalize the client proposal by Friday afternoon." },
      { speaker: "You", text: "Got it! Just to make sure I understood correctly, I'll draft the first section by Thursday morning." }
    ],
    prompt: {
      question: "Simulate leading a short 2-minute project update call with your team.",
      prep: {
        point: "Welcome everyone and state the purpose of the quick call.",
        reason: "Share what has been completed so far.",
        example: "Mention one item that needs attention this week.",
        wrap: "Close with 'Before we wrap up, let's recap the next steps.'"
      }
    }
  },
  {
    day: 13,
    week: 2,
    title: "Talking About Movies, Books & Interests",
    goal: "Describe things you enjoy with vivid, conversational expressions.",
    tip: "Instead of just saying 'It was very good', explain how it made you feel or what stood out.",
    phrases: [
      {
        phrase: "Recently, I came across a really interesting...",
        example: "Recently, I came across a really interesting podcast about psychology.",
        context: "'Came across' means found by chance."
      },
      {
        phrase: "What really stood out to me was...",
        example: "What really stood out to me was how practical the advice was.",
        context: "Great for highlighting the best feature of a book, show, or experience."
      },
      {
        phrase: "I couldn't put it down / I was hooked from the start.",
        example: "I started watching the series last weekend and I was hooked from the start.",
        context: "'Hooked' means completely captivated and wanting more."
      },
      {
        phrase: "It really made me think about...",
        example: "It really made me think about how we use our time every day.",
        context: "Adds depth when discussing books, films, or articles."
      },
      {
        phrase: "If you're into [topic], I highly recommend checking it out.",
        example: "If you're into thrillers, I highly recommend checking it out.",
        context: "Natural way to recommend something to a friend."
      }
    ],
    dialogue: [
      { speaker: "Partner", text: "Have you watched or read anything good lately?" },
      { speaker: "You", text: "Yes! Recently, I came across a great book on building habits, and I couldn't put it down." },
      { speaker: "Partner", text: "Oh nice! What did you like most about it?" },
      { speaker: "You", text: "What really stood out to me was how tiny daily changes lead to huge results." }
    ],
    prompt: {
      question: "Recommend a favorite movie, show, book, or YouTube channel to a friend.",
      prep: {
        point: "Name the movie, book, or channel you want to recommend.",
        reason: "Explain what it is about in one or two simple sentences.",
        example: "Share what really stood out to you or a favorite moment.",
        wrap: "Say who would enjoy it using 'If you're into..., I highly recommend...'"
      }
    }
  },
  {
    day: 14,
    week: 2,
    title: "Week 2 Milestone: Two-Way Conversation Challenge",
    goal: "Handle an unpredictable conversation using fillers, questions, and polite transitions.",
    tip: "Imagine you are at a networking event or casual dinner. Keep your tone warm and curious!",
    phrases: [
      {
        phrase: "Speaking of which, that reminds me of...",
        example: "Speaking of travel, that reminds me of a trip I took last year.",
        context: "Smoothly connects your story to what the other person just said."
      },
      {
        phrase: "Wait, really? How did that happen?",
        example: "Wait, really? How did you end up meeting the CEO in an elevator?",
        context: "Shows genuine enthusiasm and keeps the speaker engaged."
      },
      {
        phrase: "To be honest with you, I used to think..., but now...",
        example: "To be honest with you, I used to think English grammar was everything, but now I focus on speaking.",
        context: "Honest, relatable way to share how your perspective changed."
      },
      {
        phrase: "Let's definitely stay in touch!",
        example: "I really enjoyed chatting with you—let's definitely stay in touch!",
        context: "Warm, natural way to end a great conversation."
      },
      {
        phrase: "It was great catching up with you.",
        example: "I have to head to my next meeting, but it was great catching up with you!",
        context: "Polite exit phrase when you need to leave a conversation."
      }
    ],
    dialogue: [
      { speaker: "Partner", text: "I'm thinking about learning a new language this year, maybe Spanish or Japanese." },
      { speaker: "You", text: "That's awesome! Speaking of which, I'm currently doing a 30-day spoken English challenge." },
      { speaker: "Partner", text: "Wait, really? How is that going for you?" },
      { speaker: "You", text: "To be honest with you, I used to feel nervous speaking out loud, but practicing daily has made a huge difference!" }
    ],
    prompt: {
      question: "Simulate both sides of a lively 2-minute conversation with someone you meet at an event, or talk about a great conversation you had recently.",
      prep: {
        point: "Start with a warm opener and how the conversation began.",
        reason: "Share the main topic you discussed and why it was interesting.",
        example: "Use at least two phrases from Week 2 (fillers, agreement, or transitions).",
        wrap: "End with a polite wrap-up phrase."
      }
    }
  },

  // ================= WEEK 3: EXPRESSING OPINIONS & STORYTELLING =================
  {
    day: 15,
    week: 3,
    title: "The PREP Formula for Clear Opinions",
    goal: "Speak in structured paragraphs (Point, Reason, Example, Point) instead of short fragments.",
    tip: "Whenever someone asks 'What do you think about...?', mentally follow P -> R -> E -> P.",
    phrases: [
      {
        phrase: "In my experience, the most effective way to... is...",
        example: "In my experience, the most effective way to learn a skill is daily practice.",
        context: "Strong 'Point' starter grounded in your real life."
      },
      {
        phrase: "The main reason I feel this way is that...",
        example: "The main reason I feel this way is that short daily sessions prevent burnout.",
        context: "Clear transition into your 'Reason'."
      },
      {
        phrase: "For instance, just last month...",
        example: "For instance, just last month I started practicing for 20 minutes every morning.",
        context: "Natural way to introduce a concrete 'Example'."
      },
      {
        phrase: "As a result, I was able to...",
        example: "As a result, I was able to speak much more smoothly in my team meeting.",
        context: "Shows the outcome of your example."
      },
      {
        phrase: "So all in all, I truly believe that...",
        example: "So all in all, I truly believe that consistency beats intensity every time.",
        context: "Wraps up your final 'Point' cleanly."
      }
    ],
    dialogue: [
      { speaker: "Partner", text: "Do you think it's better to learn from books or through hands-on practice?" },
      { speaker: "You", text: "In my experience, the most effective way to learn is through hands-on practice. The main reason I feel this way is that you remember things better when you actually use them." },
      { speaker: "Partner", text: "Can you give an example?" },
      { speaker: "You", text: "For instance, I read English grammar books for years, but my speaking only improved when I started recording my voice daily. So all in all, action is key!" }
    ],
    prompt: {
      question: "Use the PREP formula to answer: 'What is the most important habit for a successful day?'",
      prep: {
        point: "In my experience, the most important habit is...",
        reason: "The main reason I feel this way is that...",
        example: "For instance, whenever I do this...",
        wrap: "So all in all, I truly believe that..."
      }
    }
  },
  {
    day: 16,
    week: 3,
    title: "Telling Engaging Stories (Sequencing)",
    goal: "Tell a memorable story with a clear beginning, middle, climax, and ending.",
    tip: "Use time connectors (At first, Out of nowhere, Eventually) to keep your listener hooked.",
    phrases: [
      {
        phrase: "This happened a few months ago when I was...",
        example: "This happened a few months ago when I was traveling to a new city.",
        context: "Sets the scene (time + place) immediately."
      },
      {
        phrase: "At first, everything seemed completely normal, but then...",
        example: "At first, everything seemed completely normal, but then I realized I was on the wrong train.",
        context: "Builds suspense before introducing the main twist."
      },
      {
        phrase: "Out of nowhere / All of a sudden...",
        example: "All of a sudden, a friendly local noticed my confusion and offered to help.",
        context: "Adds energy and drama to the turning point of your story."
      },
      {
        phrase: "Thankfully, in the end...",
        example: "Thankfully, in the end, I caught the right connection just in time.",
        context: "Signals relief and resolution."
      },
      {
        phrase: "What that experience taught me was...",
        example: "What that experience taught me was to always double-check the platform number!",
        context: "Ends the story with a memorable takeaway."
      }
    ],
    dialogue: [
      { speaker: "Partner", text: "Did anything unexpected happen on your trip?" },
      { speaker: "You", text: "Oh, definitely! At first, everything seemed completely normal, but then my phone battery died right before I reached the hotel." },
      { speaker: "Partner", text: "Oh no! What did you do?" },
      { speaker: "You", text: "Thankfully, in the end, a café owner let me charge my phone for ten minutes and gave me directions." }
    ],
    prompt: {
      question: "Tell a 2-minute story about a time something unexpected or funny happened to you.",
      prep: {
        point: "Set the scene: Where were you and who was with you?",
        reason: "Explain what went wrong or what surprised you ('At first... but then...').",
        example: "Describe how you handled the situation in the moment.",
        wrap: "Share how it ended ('Thankfully, in the end...') and what you learned."
      }
    }
  },
  {
    day: 17,
    week: 3,
    title: "Explaining a Problem & Proposing Solutions",
    goal: "Describe challenges calmly and constructively at work or in daily life.",
    tip: "Don't just complain about a problem—always pair the issue with a suggested next step.",
    phrases: [
      {
        phrase: "We've run into a slight issue with...",
        example: "We've run into a slight issue with the delivery schedule.",
        context: "Calm, professional way to report a problem."
      },
      {
        phrase: "It seems like the root cause is...",
        example: "It seems like the root cause is a delay from our supplier.",
        context: "Shows analytical thinking."
      },
      {
        phrase: "To fix this, I suggest we...",
        example: "To fix this, I suggest we prioritize the most urgent items first.",
        context: "Pivots immediately from problem to solution."
      },
      {
        phrase: "Another option we could explore is...",
        example: "Another option we could explore is using a local backup vendor.",
        context: "Giving two options makes you sound proactive and collaborative."
      },
      {
        phrase: "How does that sound to you?",
        example: "We can ship part one today and part two Friday—how does that sound to you?",
        context: "Invites agreement and feedback."
      }
    ],
    dialogue: [
      { speaker: "Partner", text: "How is the event preparation coming along?" },
      { speaker: "You", text: "Overall good, though we've run into a slight issue with the main projector in the hall." },
      { speaker: "Partner", text: "Uh oh, can we get it fixed in time?" },
      { speaker: "You", text: "To fix this, I suggest we use the backup display from Conference Room B. How does that sound to you?" }
    ],
    prompt: {
      question: "Describe a recent problem you faced (technical, work, or daily life) and how you solved it.",
      prep: {
        point: "State the problem clearly using 'We ran into a slight issue with...'",
        reason: "Explain why it happened ('It seems like the root cause was...').",
        example: "Describe the solution you implemented.",
        wrap: "Share the positive result after fixing it."
      }
    }
  },
  {
    day: 18,
    week: 3,
    title: "Giving Advice & Helpful Suggestions",
    goal: "Offer recommendations warmly without sounding bossy.",
    tip: "Avoid saying 'You must...' or 'You have to...' Use 'If I were you...' or 'You might want to...'",
    phrases: [
      {
        phrase: "If I were in your shoes, I would...",
        example: "If I were in your shoes, I would talk to the manager directly.",
        context: "'In your shoes' means in your situation—very empathetic and natural."
      },
      {
        phrase: "You might want to consider [verb-ing]...",
        example: "You might want to consider breaking the project into smaller steps.",
        context: "Gentle, respectful way to give advice."
      },
      {
        phrase: "One thing that really worked for me was...",
        example: "One thing that really worked for me was setting a 15-minute timer every morning.",
        context: "People accept advice much better when framed as personal experience."
      },
      {
        phrase: "Whatever you do, try not to...",
        example: "Whatever you do, try not to wait until the last minute to practice.",
        context: "Friendly warning about a common mistake."
      },
      {
        phrase: "It's definitely worth a shot!",
        example: "Practicing with voice recordings is free and easy—it's definitely worth a shot!",
        context: "'Worth a shot' means worth trying."
      }
    ],
    dialogue: [
      { speaker: "Partner", text: "I have a big presentation next week and I'm feeling super nervous." },
      { speaker: "You", text: "I totally understand! One thing that really worked for me was practicing the first two minutes out loud ten times." },
      { speaker: "Partner", text: "Just the first two minutes?" },
      { speaker: "You", text: "Yes! Once you nail the opening, your confidence kicks in. It's definitely worth a shot!" }
    ],
    prompt: {
      question: "A friend tells you they want to improve their confidence in English but feel shy. Give them 2 minutes of encouraging advice.",
      prep: {
        point: "Validate their feelings so they feel understood.",
        reason: "Explain why feeling shy is normal at the beginning.",
        example: "Share 2 practical tips using 'One thing that worked for me...' and 'If I were in your shoes...'",
        wrap: "Encourage them with 'It's definitely worth a shot!'"
      }
    }
  },
  {
    day: 19,
    week: 3,
    title: "Comparing Options & Making Decisions",
    goal: "Weigh pros and cons out loud clearly when choosing between options.",
    tip: "Use 'On one hand... On the other hand...' to structure comparisons effortlessly.",
    phrases: [
      {
        phrase: "When you compare the two options...",
        example: "When you compare the two options, the first plan is much faster.",
        context: "Clean opener when evaluating choices."
      },
      {
        phrase: "The biggest advantage of [X] is that...",
        example: "The biggest advantage of learning online is the flexibility.",
        context: "Highlights the main benefit clearly."
      },
      {
        phrase: "On the flip side, the downside is...",
        example: "On the flip side, the downside is that you have to stay self-disciplined.",
        context: "'On the flip side' is a natural conversational way to say 'However'."
      },
      {
        phrase: "Taking everything into account, I'd go with...",
        example: "Taking everything into account, I'd go with the second option.",
        context: "'I'd go with' is how native speakers say 'I would choose'."
      },
      {
        phrase: "It gives us the best of both worlds.",
        example: "A hybrid schedule gives us the best of both worlds.",
        context: "Great idiom when a choice combines two benefits."
      }
    ],
    dialogue: [
      { speaker: "Partner", text: "Are you planning to buy a laptop or a desktop for your home setup?" },
      { speaker: "You", text: "When you compare the two options, a desktop has more power. On the flip side, I travel a lot." },
      { speaker: "Partner", text: "So which one are you leaning toward?" },
      { speaker: "You", text: "Taking everything into account, I'd go with a lightweight laptop plus an external monitor—it gives me the best of both worlds." }
    ],
    prompt: {
      question: "Compare two options (e.g., living in a big city vs. a quiet town, or studying alone vs. in a group) and state which you prefer.",
      prep: {
        point: "Introduce the two options you are comparing.",
        reason: "Explain the biggest advantage of Option A.",
        example: "Use 'On the flip side...' to explain the advantage of Option B.",
        wrap: "Conclude with 'Taking everything into account, I'd go with...'"
      }
    }
  },
  {
    day: 20,
    week: 3,
    title: "Clarifying & Handling Misunderstandings",
    goal: "Clear up confusion gracefully when someone misunderstands you—or you don't understand them.",
    tip: "Never pretend you understood when you didn't! Asking for clarification shows confidence.",
    phrases: [
      {
        phrase: "Sorry, I don't think I explained that clearly—what I meant was...",
        example: "Sorry, I don't think I explained that clearly—what I meant was next Tuesday, not tomorrow.",
        context: "Takes ownership politely and clarifies your point without blame."
      },
      {
        phrase: "Could you clarify what you mean by...?",
        example: "Could you clarify what you mean by 'urgent priority'?",
        context: "Professional way to ask for specifics."
      },
      {
        phrase: "I think there might have been a slight mix-up.",
        example: "I think there might have been a slight mix-up with the reservation time.",
        context: "'Mix-up' is a soft, friendly word for a mistake or confusion."
      },
      {
        phrase: "Let me rephrase that in a simpler way.",
        example: "Let me rephrase that in a simpler way so we're all aligned.",
        context: "Great when you feel your sentence got too complicated."
      },
      {
        phrase: "Does that make sense, or should I go over it again?",
        example: "That's the new workflow—does that make sense, or should I go over it again?",
        context: "Better than asking 'Do you understand?' which can sound patronizing."
      }
    ],
    dialogue: [
      { speaker: "Partner", text: "Wait, so you're saying we need to rewrite the entire report from scratch?" },
      { speaker: "You", text: "Oh, sorry, I don't think I explained that clearly—what I meant was just updating the summary page." },
      { speaker: "Partner", text: "Phew! That's much easier." },
      { speaker: "You", text: "Yes! We only need three new bullet points. Does that make sense?" }
    ],
    prompt: {
      question: "Explain a concept or process from your work or daily life, then rephrase it simply as if explaining to a beginner.",
      prep: {
        point: "State the topic or process you are explaining.",
        reason: "Explain why people sometimes find it confusing.",
        example: "Use 'Let me rephrase that in a simpler way...' and give an everyday analogy.",
        wrap: "Close with 'Does that make sense?'"
      }
    }
  },
  {
    day: 21,
    week: 3,
    title: "Week 3 Milestone: 2-Minute TED-Style Mini Talk",
    goal: "Deliver a passionate, structured 2-minute talk on a topic you care about.",
    tip: "Use vocal variety—emphasize key words and pause for 1 full second after important points.",
    phrases: [
      {
        phrase: "Have you ever wondered why...?",
        example: "Have you ever wondered why some people stay calm under pressure?",
        context: "Classic hook to grab anyone's attention in the first 5 seconds."
      },
      {
        phrase: "Most people assume that..., but in reality...",
        example: "Most people assume that fluency requires talent, but in reality it's a daily habit.",
        context: "Challenges a common belief to make your talk interesting."
      },
      {
        phrase: "Let me share a quick story to illustrate this.",
        example: "Let me share a quick story to illustrate how small steps work.",
        context: "Seamless bridge from an idea to a personal story."
      },
      {
        phrase: "The key takeaway here is simple:",
        example: "The key takeaway here is simple: progress always beats perfection.",
        context: "Signals to your listener that your most important point is coming."
      },
      {
        phrase: "So the next time you..., remember to...",
        example: "So the next time you hesitate to speak English, remember that your voice matters.",
        context: "Inspiring call-to-action to end a speech."
      }
    ],
    dialogue: [
      { speaker: "Partner", text: "We'd love to hear a two-minute thought from you at today's team huddle!" },
      { speaker: "You", text: "Sure! Have you ever wondered why we remember stories ten times better than bullet points?" },
      { speaker: "Partner", text: "Why is that?" },
      { speaker: "You", text: "Most people assume facts persuade people, but in reality emotion and examples connect us. The key takeaway here is simple: always pair data with a human story." }
    ],
    prompt: {
      question: "Give a 2-minute mini-talk on a life lesson or topic you care deeply about.",
      prep: {
        point: "Open with 'Have you ever wondered why...?'",
        reason: "Use 'Most people assume..., but in reality...'",
        example: "Share a brief personal example ('Let me share a quick story...').",
        wrap: "End with 'The key takeaway here is simple...'"
      }
    }
  },

  // ================= WEEK 4: REAL-WORLD FLUENCY & CONFIDENCE =================
  {
    day: 22,
    week: 4,
    title: "The Art of Paraphrasing (Never Get Stuck on a Missing Word)",
    goal: "Describe any object, concept, or feeling when you forget the exact English word.",
    tip: "Fluent speakers forget words too! Instead of stopping, describe what it looks like, what it does, or its opposite.",
    phrases: [
      {
        phrase: "I can't think of the exact word right now, but it's similar to...",
        example: "I can't think of the exact word right now, but it's similar to being excited and nervous at the same time.",
        context: "Keeps your sentence moving smoothly when a vocabulary word slips your mind."
      },
      {
        phrase: "It's the thing you use when you want to...",
        example: "It's the kitchen tool you use when you want to peel potatoes.",
        context: "Describe function whenever you forget the noun!"
      },
      {
        phrase: "What's the word for someone who...?",
        example: "What's the word for someone who designs buildings—an architect, right?",
        context: "Invites your listener to help you naturally."
      },
      {
        phrase: "In other words, it basically means...",
        example: "In other words, it basically means we're ahead of schedule.",
        context: "Great for simplifying complex ideas."
      },
      {
        phrase: "It's the opposite of...",
        example: "The room wasn't cramped—it was the opposite, very open and spacious.",
        context: "Using opposites is the fastest shortcut when a word escapes you."
      }
    ],
    dialogue: [
      { speaker: "Partner", text: "What else do we need to buy for the office kitchen?" },
      { speaker: "You", text: "I can't think of the exact word right now, but it's the thing you use when you want to boil water quickly." },
      { speaker: "Partner", text: "Oh, an electric kettle!" },
      { speaker: "You", text: "Yes, an electric kettle! That's the word I was looking for." }
    ],
    prompt: {
      question: "Game: Describe 3 everyday objects in your room WITHOUT saying their names—explain what they do and how you use them!",
      prep: {
        point: "Object 1: 'It's the thing you use when...'",
        reason: "Object 2: Describe where it is and why it's useful.",
        example: "Object 3: Describe an emotion using 'It's similar to...'",
        wrap: "Reflect on how easy it is to keep talking without needing perfection."
      }
    }
  },
  {
    day: 23,
    week: 4,
    title: "Professional Impact & Job Interview Fluency",
    goal: "Talk about your strengths, achievements, and career goals with poise.",
    tip: "Use action verbs: built, improved, led, collaborated, streamlined, resolved.",
    phrases: [
      {
        phrase: "One of my core strengths is my ability to...",
        example: "One of my core strengths is my ability to stay calm and organized under tight deadlines.",
        context: "Confident, professional way to answer 'What are your strengths?'"
      },
      {
        phrase: "In my previous role, I was responsible for...",
        example: "In my previous role, I was responsible for managing client onboarding.",
        context: "Clear structure for describing work experience."
      },
      {
        phrase: "What excites me most about this opportunity is...",
        example: "What excites me most about this opportunity is the chance to work on global products.",
        context: "Shows genuine enthusiasm in interviews or project pitches."
      },
      {
        phrase: "I pride myself on being someone who...",
        example: "I pride myself on being someone who follows through on commitments.",
        context: "Highlights your work ethic and reliability."
      },
      {
        phrase: "Even when faced with a challenge, I always try to...",
        example: "Even when faced with a challenge, I always try to focus on what we can control.",
        context: "Demonstrates resilience and a growth mindset."
      }
    ],
    dialogue: [
      { speaker: "Partner", text: "Can you tell me a little about your greatest strength at work?" },
      { speaker: "You", text: "One of my core strengths is my ability to break complex problems into simple action steps." },
      { speaker: "Partner", text: "How has that helped your team?" },
      { speaker: "You", text: "In my previous role, I was responsible for coordinating three departments, and clear checklists helped us deliver two weeks early." }
    ],
    prompt: {
      question: "Answer the classic interview question: 'Why should we work with you, and what are you most proud of accomplishing?'",
      prep: {
        point: "State one of your core strengths clearly.",
        reason: "Explain why this strength matters in your field.",
        example: "Share one specific achievement or proud moment.",
        wrap: "Close with what excites you most about the future."
      }
    }
  },
  {
    day: 24,
    week: 4,
    title: "Negotiating, Persuading & Setting Boundaries",
    goal: "Say 'no' politely, negotiate timelines, and advocate for yourself respectfully.",
    tip: "A polite 'No' in English usually starts with appreciation ('I'd love to help, however...') and offers an alternative.",
    phrases: [
      {
        phrase: "I'd love to help with that, but my plate is quite full right now.",
        example: "I'd love to help with that, but my plate is quite full right now—could we look at it on Thursday?",
        context: "'My plate is full' is a very natural idiom meaning 'I have too many tasks'."
      },
      {
        phrase: "To make sure we deliver high quality, could we extend the deadline to...?",
        example: "To make sure we deliver high quality, could we extend the deadline to Wednesday morning?",
        context: "Frames a deadline negotiation around quality, which everyone respects."
      },
      {
        phrase: "What if we meet halfway and...?",
        example: "What if we meet halfway and launch the core features this week, then add the rest next week?",
        context: "'Meet halfway' means compromise."
      },
      {
        phrase: "From my perspective, the biggest benefit for everyone is...",
        example: "From my perspective, the biggest benefit for everyone is saving time next quarter.",
        context: "Persuades others by focusing on shared win-win outcomes."
      },
      {
        phrase: "Let me check my schedule and get back to you by...",
        example: "Let me check my schedule and get back to you by this afternoon.",
        context: "Prevents you from saying 'yes' too quickly when you need time to think."
      }
    ],
    dialogue: [
      { speaker: "Partner", text: "Can you take on this extra report and finish it by tonight?" },
      { speaker: "You", text: "I'd love to help with that, but my plate is quite full right now with the client launch." },
      { speaker: "Partner", text: "When would you be able to get to it?" },
      { speaker: "You", text: "What if we meet halfway and I send you the key numbers today, then the full report tomorrow afternoon?" }
    ],
    prompt: {
      question: "Roleplay politely pushing back on an unrealistic deadline while still sounding helpful and collaborative.",
      prep: {
        point: "Express willingness to help ('I'd love to help, but...').",
        reason: "Explain your current workload ('my plate is quite full with...').",
        example: "Propose a compromise ('What if we meet halfway and...').",
        wrap: "Confirm agreement warmly."
      }
    }
  },
  {
    day: 25,
    week: 4,
    title: "Expressing Emotions, Empathy & Gratitude",
    goal: "Connect deeply with people by expressing encouragement, sympathy, and appreciation.",
    tip: "Warmth in your voice matters more than fancy vocabulary. Speak from the heart!",
    phrases: [
      {
        phrase: "I really appreciate you taking the time to...",
        example: "I really appreciate you taking the time to walk me through this.",
        context: "More specific and heartfelt than just saying 'Thanks'."
      },
      {
        phrase: "That must have been really tough—I'm here if you need anything.",
        example: "I heard about the delay; that must have been really tough—I'm here if you need anything.",
        context: "Shows genuine empathy when someone is going through a hard time."
      },
      {
        phrase: "I'm so thrilled to hear that! You really deserve it.",
        example: "You got the promotion? I'm so thrilled to hear that! You really deserve it.",
        context: "Celebrates someone else's good news with enthusiasm."
      },
      {
        phrase: "It means a lot to me that you...",
        example: "It means a lot to me that you remembered my presentation today.",
        context: "Deepens friendships and professional trust."
      },
      {
        phrase: "Don't be too hard on yourself—you've made great progress.",
        example: "Don't be too hard on yourself—learning a language takes patience.",
        context: "Encouraging phrase for both others and yourself!"
      }
    ],
    dialogue: [
      { speaker: "Partner", text: "Thanks for helping me prepare for my interview yesterday—I just got the job offer!" },
      { speaker: "You", text: "I'm so thrilled to hear that! You worked so hard and you really deserve it." },
      { speaker: "Partner", text: "Your practice tips really calmed my nerves." },
      { speaker: "You", text: "It means a lot to me that you shared the good news! Let's celebrate soon." }
    ],
    prompt: {
      question: "Speak for 2 minutes thanking someone who has helped or supported you in your life or career.",
      prep: {
        point: "Name the person and say 'I really appreciate...'",
        reason: "Explain how they supported or encouraged you.",
        example: "Share one specific moment when their help made a difference.",
        wrap: "End with 'It means a lot to me that...'"
      }
    }
  },
  {
    day: 26,
    week: 4,
    title: "Everyday Idioms Native Speakers Use Daily",
    goal: "Understand and use 5 high-frequency idioms that make your speech sound natural and lively.",
    tip: "Only use idioms you feel comfortable with—1 or 2 per conversation is plenty!",
    phrases: [
      {
        phrase: "Let's play it by ear.",
        example: "We're not sure if it will rain tomorrow, so let's play it by ear.",
        context: "Means deciding what to do as the situation develops rather than planning strictly."
      },
      {
        phrase: "It's a piece of cake / It's not rocket science.",
        example: "Once you practice the formula a few times, it's a piece of cake.",
        context: "Means something is very easy and straightforward."
      },
      {
        phrase: "Let's call it a day.",
        example: "We've finished all the main tasks—let's call it a day and start fresh tomorrow.",
        context: "Means to stop working for the rest of the day."
      },
      {
        phrase: "To be honest, I'm on the fence about...",
        example: "To be honest, I'm on the fence about upgrading my phone this year.",
        context: "'On the fence' means undecided between two choices."
      },
      {
        phrase: "Long story short...",
        example: "Long story short, we missed the bus but ended up finding an even better route.",
        context: "Used to skip boring details and get straight to the conclusion."
      }
    ],
    dialogue: [
      { speaker: "Partner", text: "Have you decided whether you're joining the weekend trip?" },
      { speaker: "You", text: "To be honest, I'm on the fence about it because I have some family plans on Sunday." },
      { speaker: "Partner", text: "No worries! We can decide on Friday evening." },
      { speaker: "You", text: "Sounds good—let's play it by ear! Right now, I'm going to finish this email and call it a day." }
    ],
    prompt: {
      question: "Tell a quick story about your week and weave in at least 3 idioms from today's list.",
      prep: {
        point: "Talk about a decision you were 'on the fence' about.",
        reason: "Explain why you decided to 'play it by ear'.",
        example: "Use 'Long story short...' to tell what happened.",
        wrap: "Finish with how you felt when you finally 'called it a day'."
      }
    }
  },
  {
    day: 27,
    week: 4,
    title: "Impromptu Speaking: Think on Your Feet",
    goal: "Respond immediately to unexpected questions with poise and structure.",
    tip: "Take one deep breath before speaking. A 2-second pause looks confident, not hesitant!",
    phrases: [
      {
        phrase: "Off the top of my head, I'd say...",
        example: "Off the top of my head, I'd say there are two main things to consider.",
        context: "'Off the top of my head' means without preparation or checking notes."
      },
      {
        phrase: "There are two sides to this: first..., and second...",
        example: "There are two sides to this: first, the cost, and second, the time saved.",
        context: "Instant structure that organizes your thoughts on the spot."
      },
      {
        phrase: "If we look at the bigger picture...",
        example: "If we look at the bigger picture, small daily improvements matter most.",
        context: "Elevates your answer from minor details to a thoughtful perspective."
      },
      {
        phrase: "What it really boils down to is...",
        example: "What it really boils down to is building trust with our customers.",
        context: "'Boils down to' means the core essence or most important factor."
      },
      {
        phrase: "That's my initial thought, though I'm open to other ideas.",
        example: "That's my initial thought, though I'm open to hearing what everyone else thinks.",
        context: "Humble, confident way to wrap up an impromptu answer."
      }
    ],
    dialogue: [
      { speaker: "Partner", text: "Quick question: What do you think is the biggest trend shaping our industry right now?" },
      { speaker: "You", text: "Off the top of my head, I'd say AI tools helping people work faster. There are two sides to this: automation and human creativity." },
      { speaker: "Partner", text: "Which side do you think is more important?" },
      { speaker: "You", text: "If we look at the bigger picture, what it really boils down to is how well humans communicate and solve real problems." }
    ],
    prompt: {
      question: "Impromptu Challenge: Without writing notes, speak for 2 minutes on 'How technology has changed the way we communicate.'",
      prep: {
        point: "Start with 'Off the top of my head, I'd say...'",
        reason: "Use 'There are two sides to this: first..., and second...'",
        example: "Zoom out with 'If we look at the bigger picture...'",
        wrap: "Conclude with 'What it really boils down to is...'"
      }
    }
  },
  {
    day: 28,
    week: 4,
    title: "Rhythm, Stress & Natural Intonation",
    goal: "Sound natural and clear by stressing content words and linking sounds.",
    tip: "English is a stress-timed language: stress the IMPORTANT words (nouns, main verbs, adjectives) and glide softly over small words (to, for, of, and).",
    phrases: [
      {
        phrase: "I'd LOVE to grab a coffee SOMETIME this WEEK.",
        example: "Notice how 'LOVE', 'SOMETIME', and 'WEEK' carry the beat while 'to' and 'a' are quick.",
        context: "Practice emphasizing the capitalized words to hear natural English rhythm."
      },
      {
        phrase: "What are you GOING to DO about the NEW PROJECT?",
        example: "In natural speech, 'going to' sounds like 'gonna' in casual conversation.",
        context: "Helps you both speak smoothly and understand fast native speakers."
      },
      {
        phrase: "Could you LET me KNOW as SOON as POSSIBLE?",
        example: "Link 'Could you' smoothly and stress 'LET', 'KNOW', 'SOON', 'POSSIBLE'.",
        context: "Clear stress makes you easy to understand even in noisy environments."
      },
      {
        phrase: "It's NOT about BEING PERFECT; it's about BEING CLEAR.",
        example: "Pause slightly after 'PERFECT' and stress 'CLEAR' for powerful contrast.",
        context: "Using contrast stress makes your speaking sound engaging and expressive."
      },
      {
        phrase: "I've BEEN WORKING on this ALL MORNING.",
        example: "Stress 'WORKING' and 'ALL MORNING' to convey effort naturally.",
        context: "Present Perfect Continuous with natural emphasis."
      }
    ],
    dialogue: [
      { speaker: "Partner", text: "Sometimes I feel like I sound robotic when I speak English." },
      { speaker: "You", text: "I used to feel that way too! The secret is stressing the key words and pausing between ideas." },
      { speaker: "Partner", text: "Does speaking fast make you sound more fluent?" },
      { speaker: "You", text: "Not at all! It's NOT about BEING FAST; it's about BEING CLEAR and expressive." }
    ],
    prompt: {
      question: "Read today's 5 phrases out loud with dramatic expression, then speak for 90 seconds about your favorite place using deliberate pauses and word stress.",
      prep: {
        point: "Name your favorite place slowly and clearly.",
        reason: "Emphasize the adjectives that describe why it's special.",
        example: "Pause for 1 second before sharing your favorite memory there.",
        wrap: "Listen back to your recording and notice your vocal tone!"
      }
    }
  },
  {
    day: 29,
    week: 4,
    title: "Fast-Thinking Q&A Marathon",
    goal: "Answer 4 different types of questions back-to-back in a single 2-minute recording.",
    tip: "Treat this as your dress rehearsal! Transition smoothly from one question to the next.",
    phrases: [
      {
        phrase: "First off, regarding my daily routine...",
        example: "First off, regarding my daily routine, I've built a solid habit of practicing English every day.",
        context: "Clean way to tackle Question 1 in a multi-part response."
      },
      {
        phrase: "Moving on to the second question about...",
        example: "Moving on to the second question about my career goals, I'm aiming to lead more projects.",
        context: "Keeps your listener oriented as you switch topics."
      },
      {
        phrase: "As for how I handle stress...",
        example: "As for how I handle stress, stepping outside for a ten-minute walk always resets my mind.",
        context: "'As for [topic]' is a sleek, native transition."
      },
      {
        phrase: "Finally, if I had to pick one piece of advice...",
        example: "Finally, if I had to pick one piece of advice, it would be to speak out loud from Day 1.",
        context: "Signals your final point clearly."
      },
      {
        phrase: "Overall, these past four weeks have shown me that...",
        example: "Overall, these past four weeks have shown me that confidence comes from action.",
        context: "Strong summary sentence."
      }
    ],
    dialogue: [
      { speaker: "Partner", text: "Ready for a rapid-fire round? Tell me about your routine, your career goal, and your top stress-relief tip!" },
      { speaker: "You", text: "Let's do it! First off, regarding my routine, I start my morning with 15 minutes of English shadowing." },
      { speaker: "Partner", text: "Nice! And your career goal and stress tip?" },
      { speaker: "You", text: "Moving on to my career goal, I want to communicate effortlessly with global clients. As for how I handle stress, a good workout always helps!" }
    ],
    prompt: {
      question: "Answer all 4 questions in one continuous 2-minute voice recording: 1) Your morning routine, 2) A recent challenge, 3) A book/movie you love, 4) Your top tip for learners.",
      prep: {
        point: "1) 'First off, regarding my routine...'",
        reason: "2) 'Moving on to a recent challenge...'",
        example: "3) 'As for something I watched or read recently...'",
        wrap: "4) 'Finally, if I had to pick one piece of advice...'"
      }
    }
  },
  {
    day: 30,
    week: 4,
    title: "Day 30 Graduation: Your Fluency Showcase!",
    goal: "Record your Day 30 benchmark speech and celebrate how far your spoken English has come!",
    tip: "Compare today's 2-minute recording with Day 1. Notice how much faster thoughts form in English now!",
    phrases: [
      {
        phrase: "Looking back at where I started thirty days ago...",
        example: "Looking back at where I started thirty days ago, I'm proud of my consistency.",
        context: "Reflective opener for your graduation talk."
      },
      {
        phrase: "The biggest shift I've experienced is...",
        example: "The biggest shift I've experienced is that I no longer translate every word in my head.",
        context: "Highlights your transformation."
      },
      {
        phrase: "Whenever I'm in a conversation now, I feel...",
        example: "Whenever I'm in a conversation now, I feel equipped with natural phrases and fillers.",
        context: "Describes your new confidence level."
      },
      {
        phrase: "Of course, learning is a lifelong journey, so I plan to keep...",
        example: "Of course, learning is a lifelong journey, so I plan to keep speaking and shadowing daily.",
        context: "Commits to maintaining your momentum."
      },
      {
        phrase: "Here's to speaking with confidence and clarity every single day!",
        example: "Here's to speaking with confidence and clarity every single day!",
        context: "Celebratory closing toast!"
      }
    ],
    dialogue: [
      { speaker: "Partner", text: "Congratulations on completing all 30 days! How do you feel right now?" },
      { speaker: "You", text: "Thank you! Looking back at where I started thirty days ago, the biggest shift I've experienced is speaking without fear of small mistakes." },
      { speaker: "Partner", text: "What's your plan going forward?" },
      { speaker: "You", text: "Of course, learning is a lifelong journey, so I plan to keep using these phrases in real conversations every day!" }
    ],
    prompt: {
      question: "Deliver your 2-Minute Graduation Speech: Who you are, how your English communication has transformed over 30 days, and where you are headed next!",
      prep: {
        point: "Start with 'Looking back at where I started thirty days ago...'",
        reason: "Share the biggest shift in your mindset and fluency.",
        example: "Mention 2 or 3 favorite phrases or techniques that helped you most.",
        wrap: "Close with your future goals and celebrate your achievement!"
      }
    }
  }
];

const EMERGENCY_PHRASES = [
  {
    category: "When You Need Time to Think (Fillers)",
    items: [
      { phrase: "That's a really good question—let me think for a second.", note: "Buys 4 seconds calmly" },
      { phrase: "Well, the way I see it is...", note: "Smooth starter for opinions" },
      { phrase: "How should I put it...", note: "When searching for the right word" },
      { phrase: "Actually, now that I think about it...", note: "When adding or changing a thought" }
    ]
  },
  {
    category: "When You Forget a Word (Paraphrasing)",
    items: [
      { phrase: "I can't think of the exact word, but it's similar to...", note: "Use a synonym" },
      { phrase: "It's the thing you use when you want to...", note: "Describe what it does" },
      { phrase: "It's the opposite of...", note: "Use an antonym" },
      { phrase: "What I'm trying to say is...", note: "Restart your sentence simply" }
    ]
  },
  {
    category: "When You Didn't Catch What Someone Said",
    items: [
      { phrase: "Sorry, could you say that again a little more slowly?", note: "Polite & natural" },
      { phrase: "Sorry, you broke up for a second—could you repeat the last part?", note: "Great for phone/video calls" },
      { phrase: "Just to make sure I'm following, do you mean...?", note: "Confirms understanding" },
      { phrase: "Could you give me an example of what you mean?", note: "Helps clarify abstract topics" }
    ]
  },
  {
    category: "High-Impact Connectors (Speak in Paragraphs)",
    items: [
      { phrase: "The main reason is that...", note: "Connects Point -> Reason" },
      { phrase: "For instance, just recently...", note: "Connects Reason -> Example" },
      { phrase: "On the flip side...", note: "Introduces a contrasting view" },
      { phrase: "So all in all...", note: "Wraps up your thought cleanly" }
    ]
  }
];
