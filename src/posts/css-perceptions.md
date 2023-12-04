---
title: Writing | Some perceptions of learning and practising CSS
date: 2023-12-04 13:10:02
language: English
tags:
- CSS
- Front-end
- Programming
---

I have been learning and focusing on CSS (kind of) since I got this job and joined the front-end team. Although there is still a long way to go since CSS is unique and time-consuming, I would like to share some perceptions of learning and practising CSS.

## There is no correct answer
This is probably the most significant and unique point about CSS. Compared to other programming languages, which are more about functionality, calculation, and algorithms, CSS is more about comprehensiveness and responsiveness than some accurate answers since no designers would say yes to designing for all screen sizes of the iPhone series.
Therefore, how to let the designs hit the ground depends mostly on how the developers perceive the designs. For example, search *how to centralise an element* and you will get tons of answers, each of which makes sense and, more importantly, is practical.
The other day at work, one of my members asked me if there is a best practice for CSS. I told him I did not think so because, unlike other programming languages, there are many paths to a single destination writing CSS.
However, this does not mean we can write code however we want as long as we achieve our goals and lay the elements as the design shows. There are still other aspects for us to consider, like performance, responsiveness, defensiveness, and understandability, since no UI designers or product designers would like to see their users complaining about freezing displays and broken-down layouts.
Despite what I said above, writing CSS with an open mind is vital: hitting the ground running and getting down to making attempts. To move back to reflect is what we do afterwards.

## Most are about daily accumulation
Most of the time, you can not get the elements laid as you wish simply because you lack knowledge of some fancy properties. We are not able, nor is it possible for us, to remember all of the properties. 
Sometimes, we look through the property list, try to have impressions of them and even try to predict under what circumstances they would be utilised. 
However, we could never understand a novel written in some foreign language after a quick dictionary flipping through. Like language learning, we could never learn a word without using it first.
The other day, a team member was trying to figure out some layout where a massive paragraph of text follows a checkbox. Trying to implement this as a variant of the existing common checkbox component, he made many efforts to attempt what he could do to revert the original default flexbox layout and let the overflowing text manage to come right under the checkbox icon. He used the pseudo-element to add content - several spaces - to make pseudo-indents, forcing him to consider how to avoid text underlines coming out of those spaces while the mouse hovers.
At that time, nobody knew the right solution. Usually, there are shortcuts when you think things are done super complicatedly, especially in the context of CSS development.
> Are there no better and briefer solutions for just text indents?
Questions like this are always the start of ways to some fascinating properties. In the case above, of course, there is a property called exactly `text-indent` in CSS!
And this is accumulating.

## Do I need systematic learning?
Honestly speaking, I would not put much weight on systematic learning because CSS has some natural-language-alike mechanisms, as the more you accumulate and practise, the more fluent you get.
But also, similar to any natural language learning, you have to get hold of the nature of this language, some fundamental knowledge of grammar and daily vocabulary, after which you get to think about how to express effectively and pay attention to more natural ways of expressions, and finally, you may want to try to sound like a native speaker.
Some essential knowledge learning is enough for your systematic CSS learning part as CSS is so case-by-case, and you can hardly see the connections between cases in different design systems, or, sometimes, you see them connected, but another method shall be taken just because of some slight differences of parent/children styles.

## Finally
It has nothing to do with all I have written above, but I want to say CSS is difficult and complicated, but it is really fun 🤩!
