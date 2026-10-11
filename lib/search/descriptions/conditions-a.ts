// lib/search/descriptions/conditions-a.ts
//
// Overviews of common conditions: long-term, lung, stomach, liver, bowel and urinary. DRAFT: not yet reviewed by a
// LIMS doctor (see types.ts). Hindi and Punjabi are drafts of the English. No medicine, dose, home remedy or cure.

import type { DescriptionEntry } from '@/lib/search/descriptions/types'

export const CONDITIONS_A: DescriptionEntry[] = [
  {
    id: 'diabetes',
    kind: 'condition',
    phrases: ['diabetes', 'diabetic', 'sugar disease', 'high sugar', 'blood sugar', 'sugar problem', 'sugar ki bimari', 'type 2 diabetes', 'type 1 diabetes', 'high blood sugar', 'sugar', 'डायबिटीज', 'मधुमेह', 'शुगर', 'शुगर की बीमारी', 'ਸ਼ੂਗਰ', 'ਡਾਇਬੀਟੀਜ਼', 'ਮਧੁਮੇਹ', 'madhumeh', 'shugar'],
    en: {
      about: "Diabetes is a long-term condition in which the body cannot keep the sugar (glucose) in the blood at a healthy level. It is common, and with regular care people live well with it.",
      points: [
        "Type 2 diabetes is the most common kind, linked to weight, little activity and family history",
        "Type 1 diabetes usually starts in childhood or youth",
        "Common signs are thirst, passing urine often, tiredness and wounds that heal slowly",
        "A blood test confirms it, and regular check-ups protect the eyes, kidneys, heart and feet",
        "Healthy food, activity and regular follow-up are central to looking after it",
      ],
    },
    hi: {
      about: "डायबिटीज़ एक लंबी चलने वाली बीमारी है जिसमें शरीर खून में शुगर (ग्लूकोज़) को सही स्तर पर नहीं रख पाता। यह आम है, और नियमित देखभाल के साथ लोग इसके साथ अच्छी तरह जीते हैं।",
      points: [
        "टाइप 2 डायबिटीज़ सबसे आम है, जो वज़न, कम गतिविधि और परिवार के इतिहास से जुड़ी है",
        "टाइप 1 डायबिटीज़ आमतौर पर बचपन या जवानी में शुरू होती है",
        "आम संकेत हैं प्यास लगना, बार-बार पेशाब आना, थकान और धीरे भरने वाले घाव",
        "खून की जांच से इसकी पुष्टि होती है, और नियमित जांच आंखों, गुर्दों, दिल और पैरों की रक्षा करती है",
        "पौष्टिक खाना, गतिविधि और नियमित फ़ॉलो-अप इसकी देखभाल में अहम हैं",
      ],
    },
    pa: {
      about: "ਸ਼ੂਗਰ ਇੱਕ ਲੰਮੇ ਸਮੇਂ ਦੀ ਬਿਮਾਰੀ ਹੈ ਜਿਸ ਵਿੱਚ ਸਰੀਰ ਖੂਨ ਵਿੱਚ ਸ਼ੂਗਰ (ਗਲੂਕੋਜ਼) ਨੂੰ ਸਹੀ ਪੱਧਰ ’ਤੇ ਨਹੀਂ ਰੱਖ ਪਾਉਂਦਾ। ਇਹ ਆਮ ਹੈ, ਅਤੇ ਨਿਯਮਿਤ ਦੇਖਭਾਲ ਨਾਲ ਲੋਕ ਇਸ ਦੇ ਨਾਲ ਚੰਗੀ ਤਰ੍ਹਾਂ ਜਿਊਂਦੇ ਹਨ।",
      points: [
        "ਟਾਈਪ 2 ਸ਼ੂਗਰ ਸਭ ਤੋਂ ਆਮ ਹੈ, ਜੋ ਭਾਰ, ਘੱਟ ਗਤੀਵਿਧੀ ਅਤੇ ਪਰਿਵਾਰ ਦੇ ਇਤਿਹਾਸ ਨਾਲ ਜੁੜੀ ਹੈ",
        "ਟਾਈਪ 1 ਸ਼ੂਗਰ ਆਮ ਤੌਰ ’ਤੇ ਬਚਪਨ ਜਾਂ ਜਵਾਨੀ ਵਿੱਚ ਸ਼ੁਰੂ ਹੁੰਦੀ ਹੈ",
        "ਆਮ ਸੰਕੇਤ ਹਨ ਪਿਆਸ ਲੱਗਣਾ, ਵਾਰ-ਵਾਰ ਪਿਸ਼ਾਬ ਆਉਣਾ, ਥਕਾਵਟ ਅਤੇ ਹੌਲੀ ਭਰਨ ਵਾਲੇ ਜ਼ਖ਼ਮ",
        "ਖੂਨ ਦੀ ਜਾਂਚ ਨਾਲ ਇਸ ਦੀ ਪੁਸ਼ਟੀ ਹੁੰਦੀ ਹੈ, ਅਤੇ ਨਿਯਮਿਤ ਜਾਂਚ ਅੱਖਾਂ, ਗੁਰਦਿਆਂ, ਦਿਲ ਅਤੇ ਪੈਰਾਂ ਦੀ ਰੱਖਿਆ ਕਰਦੀ ਹੈ",
        "ਪੌਸ਼ਟਿਕ ਖਾਣਾ, ਗਤੀਵਿਧੀ ਅਤੇ ਨਿਯਮਿਤ ਫ਼ਾਲੋ-ਅੱਪ ਇਸ ਦੀ ਦੇਖਭਾਲ ਵਿੱਚ ਅਹਿਮ ਹਨ",
      ],
    },
  },
  {
    id: 'high-blood-pressure',
    kind: 'condition',
    phrases: ['high blood pressure', 'hypertension', 'blood pressure', 'bp', 'high bp', 'raised blood pressure', 'blood pressure high', 'bp high', 'bp badh gaya'],
    en: {
      about: "High blood pressure (hypertension) means the force of blood against the artery walls stays higher than it should. It often has no symptoms, which is why it is checked.",
      points: [
        "Often called a silent condition, because many people feel perfectly well",
        "Linked to age, family history, extra weight, too much salt, little activity and stress",
        "Over the years it can harm the heart, brain, kidneys and eyes",
        "It is found by measuring, and needs to be checked regularly",
        "Healthy habits and regular follow-up with a doctor help keep it in check",
      ],
    },
    hi: {
      about: "हाई ब्लड प्रेशर (उच्च रक्तचाप) का मतलब है कि धमनियों की दीवारों पर खून का दबाव जितना होना चाहिए उससे ज़्यादा बना रहता है। इसमें अक्सर कोई लक्षण नहीं होता, इसीलिए इसकी जांच की जाती है।",
      points: [
        "इसे अक्सर खामोश बीमारी कहा जाता है, क्योंकि कई लोग बिल्कुल ठीक महसूस करते हैं",
        "उम्र, परिवार के इतिहास, ज़्यादा वज़न, बहुत नमक, कम गतिविधि और तनाव से जुड़ा",
        "सालों में यह दिल, दिमाग, गुर्दों और आंखों को नुकसान पहुंचा सकता है",
        "यह नापने से पता चलता है, और इसकी नियमित जांच ज़रूरी है",
        "अच्छी आदतें और डॉक्टर के साथ नियमित फ़ॉलो-अप इसे काबू में रखने में मदद करते हैं",
      ],
    },
    pa: {
      about: "ਹਾਈ ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ (ਉੱਚ ਖੂਨ ਦਬਾਅ) ਦਾ ਮਤਲਬ ਹੈ ਕਿ ਧਮਣੀਆਂ ਦੀਆਂ ਕੰਧਾਂ ’ਤੇ ਖੂਨ ਦਾ ਦਬਾਅ ਜਿੰਨਾ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ ਉਸ ਤੋਂ ਵੱਧ ਬਣਿਆ ਰਹਿੰਦਾ ਹੈ। ਇਸ ਵਿੱਚ ਅਕਸਰ ਕੋਈ ਲੱਛਣ ਨਹੀਂ ਹੁੰਦਾ, ਇਸੇ ਲਈ ਇਸ ਦੀ ਜਾਂਚ ਕੀਤੀ ਜਾਂਦੀ ਹੈ।",
      points: [
        "ਇਸ ਨੂੰ ਅਕਸਰ ਚੁੱਪ ਬਿਮਾਰੀ ਕਿਹਾ ਜਾਂਦਾ ਹੈ, ਕਿਉਂਕਿ ਕਈ ਲੋਕ ਬਿਲਕੁਲ ਠੀਕ ਮਹਿਸੂਸ ਕਰਦੇ ਹਨ",
        "ਉਮਰ, ਪਰਿਵਾਰ ਦੇ ਇਤਿਹਾਸ, ਵੱਧ ਭਾਰ, ਬਹੁਤ ਨਮਕ, ਘੱਟ ਗਤੀਵਿਧੀ ਅਤੇ ਤਣਾਅ ਨਾਲ ਜੁੜਿਆ",
        "ਸਾਲਾਂ ਵਿੱਚ ਇਹ ਦਿਲ, ਦਿਮਾਗ, ਗੁਰਦਿਆਂ ਅਤੇ ਅੱਖਾਂ ਨੂੰ ਨੁਕਸਾਨ ਪਹੁੰਚਾ ਸਕਦਾ ਹੈ",
        "ਇਹ ਮਾਪਣ ਨਾਲ ਪਤਾ ਲੱਗਦਾ ਹੈ, ਅਤੇ ਇਸ ਦੀ ਨਿਯਮਿਤ ਜਾਂਚ ਜ਼ਰੂਰੀ ਹੈ",
        "ਚੰਗੀਆਂ ਆਦਤਾਂ ਅਤੇ ਡਾਕਟਰ ਨਾਲ ਨਿਯਮਿਤ ਫ਼ਾਲੋ-ਅੱਪ ਇਸ ਨੂੰ ਕਾਬੂ ਵਿੱਚ ਰੱਖਣ ਵਿੱਚ ਮਦਦ ਕਰਦੇ ਹਨ",
      ],
    },
  },
  {
    id: 'thyroid-problems',
    kind: 'condition',
    phrases: ['thyroid', 'thyroid problem', 'thyroid problems', 'underactive thyroid', 'hypothyroidism', 'overactive thyroid', 'hyperthyroidism', 'thyroid swelling', 'goitre', 'goiter', 'thyroid disease', 'thyroid issue'],
    en: {
      about: "The thyroid is a small gland in the neck that helps control the body's energy use. It can become underactive or overactive, or it can swell.",
      points: [
        "An underactive thyroid can cause tiredness, weight gain, feeling cold and constipation",
        "An overactive thyroid can cause weight loss, a fast heartbeat, sweating and shaking",
        "A swelling in the front of the neck (goitre) can come with either, or with neither",
        "A simple blood test shows how the thyroid is working",
        "Thyroid conditions are common and can be looked after with regular follow-up",
      ],
    },
    hi: {
      about: "थायराइड गर्दन में एक छोटी ग्रंथि है जो शरीर की ऊर्जा के इस्तेमाल को नियंत्रित करने में मदद करती है। यह कम सक्रिय या ज़्यादा सक्रिय हो सकती है, या सूज सकती है।",
      points: [
        "थायराइड कम सक्रिय हो तो थकान, वज़न बढ़ना, ठंड लगना और कब्ज़ हो सकते हैं",
        "थायराइड ज़्यादा सक्रिय हो तो वज़न घटना, दिल की तेज़ धड़कन, पसीना और कंपकंपी हो सकती है",
        "गर्दन के आगे की सूजन (घेंघा) दोनों में हो सकती है, या किसी में नहीं",
        "एक आसान खून की जांच से पता चलता है कि थायराइड कैसे काम कर रही है",
        "थायराइड की बीमारियां आम हैं और नियमित फ़ॉलो-अप से इनकी देखभाल हो सकती है",
      ],
    },
    pa: {
      about: "ਥਾਇਰਾਇਡ ਗਰਦਨ ਵਿੱਚ ਇੱਕ ਛੋਟੀ ਗ੍ਰੰਥੀ ਹੈ ਜੋ ਸਰੀਰ ਦੀ ਊਰਜਾ ਦੀ ਵਰਤੋਂ ਨੂੰ ਕਾਬੂ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦੀ ਹੈ। ਇਹ ਘੱਟ ਸਰਗਰਮ ਜਾਂ ਵੱਧ ਸਰਗਰਮ ਹੋ ਸਕਦੀ ਹੈ, ਜਾਂ ਸੁੱਜ ਸਕਦੀ ਹੈ।",
      points: [
        "ਥਾਇਰਾਇਡ ਘੱਟ ਸਰਗਰਮ ਹੋਵੇ ਤਾਂ ਥਕਾਵਟ, ਭਾਰ ਵਧਣਾ, ਠੰਢ ਲੱਗਣਾ ਅਤੇ ਕਬਜ਼ ਹੋ ਸਕਦੇ ਹਨ",
        "ਥਾਇਰਾਇਡ ਵੱਧ ਸਰਗਰਮ ਹੋਵੇ ਤਾਂ ਭਾਰ ਘਟਣਾ, ਦਿਲ ਦੀ ਤੇਜ਼ ਧੜਕਣ, ਪਸੀਨਾ ਅਤੇ ਕੰਬਣੀ ਹੋ ਸਕਦੀ ਹੈ",
        "ਗਰਦਨ ਦੇ ਅਗਲੇ ਪਾਸੇ ਦੀ ਸੋਜ (ਘੇਂਘਾ) ਦੋਵਾਂ ਵਿੱਚ ਹੋ ਸਕਦੀ ਹੈ, ਜਾਂ ਕਿਸੇ ਵਿੱਚ ਨਹੀਂ",
        "ਇੱਕ ਆਸਾਨ ਖੂਨ ਦੀ ਜਾਂਚ ਨਾਲ ਪਤਾ ਲੱਗਦਾ ਹੈ ਕਿ ਥਾਇਰਾਇਡ ਕਿਵੇਂ ਕੰਮ ਕਰ ਰਹੀ ਹੈ",
        "ਥਾਇਰਾਇਡ ਦੀਆਂ ਬਿਮਾਰੀਆਂ ਆਮ ਹਨ ਅਤੇ ਨਿਯਮਿਤ ਫ਼ਾਲੋ-ਅੱਪ ਨਾਲ ਇਨ੍ਹਾਂ ਦੀ ਦੇਖਭਾਲ ਹੋ ਸਕਦੀ ਹੈ",
      ],
    },
  },
  {
    id: 'anaemia',
    kind: 'condition',
    phrases: ['anaemia', 'anemia', 'low hemoglobin', 'low haemoglobin', 'low blood', 'iron deficiency', 'blood deficiency', 'low hb', 'khoon ki kami', 'weak blood'],
    en: {
      about: "Anaemia means the blood has too few red blood cells, or too little haemoglobin, to carry oxygen well. It is common, especially in women and children.",
      points: [
        "Common signs are tiredness, looking pale, breathlessness on effort and dizziness",
        "Often from too little iron, or too little vitamin B12 or folate",
        "Heavy periods, pregnancy and a poor diet are common reasons",
        "Some long-term conditions and bleeding in the gut can also cause it",
        "A blood test confirms it, and finding the cause matters as much as correcting it",
      ],
    },
    hi: {
      about: "एनीमिया (खून की कमी) का मतलब है कि खून में लाल रक्त कोशिकाएं, या हीमोग्लोबिन, इतना कम है कि वह ऑक्सीजन ठीक से नहीं पहुंचा पाता। यह आम है, खासकर महिलाओं और बच्चों में।",
      points: [
        "आम संकेत हैं थकान, पीला दिखना, मेहनत पर सांस फूलना और चक्कर",
        "अक्सर आयरन की कमी, या विटामिन B12 या फ़ोलेट की कमी से",
        "भारी माहवारी, गर्भावस्था और कमज़ोर खान-पान आम कारण हैं",
        "कुछ लंबी बीमारियां और आंत में खून बहना भी इसका कारण हो सकते हैं",
        "खून की जांच से पुष्टि होती है, और कारण पता करना उसे ठीक करने जितना ही ज़रूरी है",
      ],
    },
    pa: {
      about: "ਅਨੀਮੀਆ (ਖੂਨ ਦੀ ਕਮੀ) ਦਾ ਮਤਲਬ ਹੈ ਕਿ ਖੂਨ ਵਿੱਚ ਲਾਲ ਰਕਤ ਕੋਸ਼ਿਕਾਵਾਂ, ਜਾਂ ਹੀਮੋਗਲੋਬਿਨ, ਇੰਨਾ ਘੱਟ ਹੈ ਕਿ ਉਹ ਆਕਸੀਜਨ ਠੀਕ ਤਰ੍ਹਾਂ ਨਹੀਂ ਪਹੁੰਚਾ ਪਾਉਂਦਾ। ਇਹ ਆਮ ਹੈ, ਖ਼ਾਸ ਕਰਕੇ ਔਰਤਾਂ ਅਤੇ ਬੱਚਿਆਂ ਵਿੱਚ।",
      points: [
        "ਆਮ ਸੰਕੇਤ ਹਨ ਥਕਾਵਟ, ਪੀਲਾ ਦਿਖਣਾ, ਮਿਹਨਤ ’ਤੇ ਸਾਹ ਫੁੱਲਣਾ ਅਤੇ ਚੱਕਰ",
        "ਅਕਸਰ ਆਇਰਨ ਦੀ ਕਮੀ, ਜਾਂ ਵਿਟਾਮਿਨ B12 ਜਾਂ ਫ਼ੋਲੇਟ ਦੀ ਕਮੀ ਤੋਂ",
        "ਭਾਰੀ ਮਾਹਵਾਰੀ, ਗਰਭ ਅਵਸਥਾ ਅਤੇ ਕਮਜ਼ੋਰ ਖਾਣ-ਪੀਣ ਆਮ ਕਾਰਨ ਹਨ",
        "ਕੁਝ ਲੰਮੀਆਂ ਬਿਮਾਰੀਆਂ ਅਤੇ ਆਂਦਰ ਵਿੱਚ ਖੂਨ ਵਗਣਾ ਵੀ ਇਸ ਦਾ ਕਾਰਨ ਹੋ ਸਕਦੇ ਹਨ",
        "ਖੂਨ ਦੀ ਜਾਂਚ ਨਾਲ ਪੁਸ਼ਟੀ ਹੁੰਦੀ ਹੈ, ਅਤੇ ਕਾਰਨ ਲੱਭਣਾ ਉਸ ਨੂੰ ਠੀਕ ਕਰਨ ਜਿੰਨਾ ਹੀ ਜ਼ਰੂਰੀ ਹੈ",
      ],
    },
  },
  {
    id: 'high-cholesterol',
    kind: 'condition',
    phrases: ['cholesterol', 'high cholesterol', 'raised cholesterol', 'bad cholesterol', 'cholesterol problem'],
    en: {
      about: "Cholesterol is a fat in the blood that the body needs, but too much of some kinds can build up in the arteries over time.",
      points: [
        "It usually has no symptoms and is found by a blood test",
        "Linked to food high in saturated fat, little activity, extra weight, smoking and family history",
        "Over time it raises the risk of heart attack and stroke",
        "Eating well, being active and regular checks help keep it healthy",
      ],
    },
    hi: {
      about: "कोलेस्ट्रॉल खून में एक वसा है जिसकी शरीर को ज़रूरत होती है, लेकिन कुछ प्रकार का ज़्यादा हिस्सा समय के साथ धमनियों में जमा हो सकता है।",
      points: [
        "इसमें आमतौर पर कोई लक्षण नहीं होता और यह खून की जांच से पता चलता है",
        "ज़्यादा संतृप्त वसा वाले खाने, कम गतिविधि, ज़्यादा वज़न, धूम्रपान और परिवार के इतिहास से जुड़ा",
        "समय के साथ यह हार्ट अटैक और स्ट्रोक का खतरा बढ़ाता है",
        "अच्छा खान-पान, सक्रिय रहना और नियमित जांच इसे सही रखने में मदद करते हैं",
      ],
    },
    pa: {
      about: "ਕੋਲੈਸਟ੍ਰੋਲ ਖੂਨ ਵਿੱਚ ਇੱਕ ਚਰਬੀ ਹੈ ਜਿਸ ਦੀ ਸਰੀਰ ਨੂੰ ਲੋੜ ਹੁੰਦੀ ਹੈ, ਪਰ ਕੁਝ ਕਿਸਮਾਂ ਦਾ ਵੱਧ ਹਿੱਸਾ ਸਮੇਂ ਨਾਲ ਧਮਣੀਆਂ ਵਿੱਚ ਜਮ੍ਹਾ ਹੋ ਸਕਦਾ ਹੈ।",
      points: [
        "ਇਸ ਵਿੱਚ ਆਮ ਤੌਰ ’ਤੇ ਕੋਈ ਲੱਛਣ ਨਹੀਂ ਹੁੰਦਾ ਅਤੇ ਇਹ ਖੂਨ ਦੀ ਜਾਂਚ ਨਾਲ ਪਤਾ ਲੱਗਦਾ ਹੈ",
        "ਵੱਧ ਸੈਚੁਰੇਟਿਡ ਚਰਬੀ ਵਾਲੇ ਖਾਣੇ, ਘੱਟ ਗਤੀਵਿਧੀ, ਵੱਧ ਭਾਰ, ਸਿਗਰਟਨੋਸ਼ੀ ਅਤੇ ਪਰਿਵਾਰ ਦੇ ਇਤਿਹਾਸ ਨਾਲ ਜੁੜਿਆ",
        "ਸਮੇਂ ਨਾਲ ਇਹ ਹਾਰਟ ਅਟੈਕ ਅਤੇ ਸਟ੍ਰੋਕ ਦਾ ਖ਼ਤਰਾ ਵਧਾਉਂਦਾ ਹੈ",
        "ਚੰਗਾ ਖਾਣ-ਪੀਣ, ਸਰਗਰਮ ਰਹਿਣਾ ਅਤੇ ਨਿਯਮਿਤ ਜਾਂਚ ਇਸ ਨੂੰ ਸਹੀ ਰੱਖਣ ਵਿੱਚ ਮਦਦ ਕਰਦੇ ਹਨ",
      ],
    },
  },
  {
    id: 'asthma',
    kind: 'condition',
    phrases: ['asthma', 'asthma attack', 'wheezing', 'wheeze', 'asthmatic', 'dama'],
    en: {
      about: "Asthma is a long-term condition in which the breathing tubes become inflamed and narrow, causing wheezing, cough, chest tightness and breathlessness.",
      points: [
        "Symptoms often come in episodes and are worse at night or early in the morning",
        "Triggers include dust, smoke, cold air, pollen, infections and exercise",
        "It often runs in families and goes with allergies",
        "A doctor can confirm it with a breathing test and plan regular care",
        "A severe attack with great difficulty breathing is an emergency",
      ],
    },
    hi: {
      about: "अस्थमा (दमा) एक लंबी चलने वाली बीमारी है जिसमें सांस की नलियां सूज जाती हैं और संकरी हो जाती हैं, जिससे घरघराहट, खांसी, छाती में जकड़न और सांस फूलना होता है।",
      points: [
        "लक्षण अक्सर दौरों में आते हैं और रात में या सुबह जल्दी ज़्यादा होते हैं",
        "धूल, धुआं, ठंडी हवा, पराग, संक्रमण और कसरत इसके कारण बन सकते हैं",
        "यह अक्सर परिवार में चलता है और एलर्जी के साथ होता है",
        "डॉक्टर सांस की जांच से इसकी पुष्टि करके नियमित देखभाल की योजना बना सकते हैं",
        "सांस लेने में बहुत मुश्किल वाला गंभीर दौरा आपातकाल है",
      ],
    },
    pa: {
      about: "ਦਮਾ ਇੱਕ ਲੰਮੇ ਸਮੇਂ ਦੀ ਬਿਮਾਰੀ ਹੈ ਜਿਸ ਵਿੱਚ ਸਾਹ ਦੀਆਂ ਨਲੀਆਂ ਸੁੱਜ ਜਾਂਦੀਆਂ ਹਨ ਅਤੇ ਤੰਗ ਹੋ ਜਾਂਦੀਆਂ ਹਨ, ਜਿਸ ਨਾਲ ਘਰਘਰਾਹਟ, ਖੰਘ, ਛਾਤੀ ਵਿੱਚ ਜਕੜਨ ਅਤੇ ਸਾਹ ਫੁੱਲਣਾ ਹੁੰਦਾ ਹੈ।",
      points: [
        "ਲੱਛਣ ਅਕਸਰ ਦੌਰਿਆਂ ਵਿੱਚ ਆਉਂਦੇ ਹਨ ਅਤੇ ਰਾਤ ਨੂੰ ਜਾਂ ਸਵੇਰੇ ਜਲਦੀ ਵੱਧ ਹੁੰਦੇ ਹਨ",
        "ਧੂੜ, ਧੂੰਆਂ, ਠੰਢੀ ਹਵਾ, ਪਰਾਗ, ਲਾਗਾਂ ਅਤੇ ਕਸਰਤ ਇਸ ਦੇ ਕਾਰਨ ਬਣ ਸਕਦੇ ਹਨ",
        "ਇਹ ਅਕਸਰ ਪਰਿਵਾਰ ਵਿੱਚ ਚੱਲਦਾ ਹੈ ਅਤੇ ਐਲਰਜੀ ਦੇ ਨਾਲ ਹੁੰਦਾ ਹੈ",
        "ਡਾਕਟਰ ਸਾਹ ਦੀ ਜਾਂਚ ਨਾਲ ਇਸ ਦੀ ਪੁਸ਼ਟੀ ਕਰਕੇ ਨਿਯਮਿਤ ਦੇਖਭਾਲ ਦੀ ਯੋਜਨਾ ਬਣਾ ਸਕਦੇ ਹਨ",
        "ਸਾਹ ਲੈਣ ਵਿੱਚ ਬਹੁਤ ਮੁਸ਼ਕਿਲ ਵਾਲਾ ਗੰਭੀਰ ਦੌਰਾ ਐਮਰਜੈਂਸੀ ਹੈ",
      ],
    },
  },
  {
    id: 'bronchitis',
    kind: 'condition',
    phrases: ['bronchitis', 'chest infection', 'chest congestion', 'chest cold'],
    en: {
      about: "Bronchitis is inflammation of the breathing tubes, usually after a cold or flu, with a cough that may bring up phlegm.",
      points: [
        "Acute bronchitis is usually from a virus and settles within a few weeks",
        "Smoking and polluted air make it more likely and slower to clear",
        "A long-lasting cough with phlegm on most days can mean a long-term lung condition",
        "Breathlessness, fever or a cough that lasts for weeks should be checked",
      ],
    },
    hi: {
      about: "ब्रोंकाइटिस सांस की नलियों की सूजन है, जो आमतौर पर सर्दी या फ्लू के बाद होती है, और इसमें खांसी के साथ बलगम आ सकता है।",
      points: [
        "तीव्र ब्रोंकाइटिस आमतौर पर वायरस से होती है और कुछ हफ्तों में ठीक हो जाती है",
        "धूम्रपान और प्रदूषित हवा इसकी संभावना बढ़ाते हैं और इसे ठीक होने में देर लगाते हैं",
        "ज़्यादातर दिनों में बलगम के साथ लंबी खांसी फेफड़ों की किसी लंबी बीमारी का संकेत हो सकती है",
        "सांस फूलना, बुखार या हफ्तों चलने वाली खांसी की जांच करानी चाहिए",
      ],
    },
    pa: {
      about: "ਬ੍ਰੌਂਕਾਈਟਿਸ ਸਾਹ ਦੀਆਂ ਨਲੀਆਂ ਦੀ ਸੋਜ ਹੈ, ਜੋ ਆਮ ਤੌਰ ’ਤੇ ਜ਼ੁਕਾਮ ਜਾਂ ਫਲੂ ਤੋਂ ਬਾਅਦ ਹੁੰਦੀ ਹੈ, ਅਤੇ ਇਸ ਵਿੱਚ ਖੰਘ ਦੇ ਨਾਲ ਬਲਗਮ ਆ ਸਕਦਾ ਹੈ।",
      points: [
        "ਤੀਬਰ ਬ੍ਰੌਂਕਾਈਟਿਸ ਆਮ ਤੌਰ ’ਤੇ ਵਾਇਰਸ ਤੋਂ ਹੁੰਦੀ ਹੈ ਅਤੇ ਕੁਝ ਹਫ਼ਤਿਆਂ ਵਿੱਚ ਠੀਕ ਹੋ ਜਾਂਦੀ ਹੈ",
        "ਸਿਗਰਟਨੋਸ਼ੀ ਅਤੇ ਪ੍ਰਦੂਸ਼ਿਤ ਹਵਾ ਇਸ ਦੀ ਸੰਭਾਵਨਾ ਵਧਾਉਂਦੇ ਹਨ ਅਤੇ ਇਸ ਨੂੰ ਠੀਕ ਹੋਣ ਵਿੱਚ ਦੇਰ ਲਾਉਂਦੇ ਹਨ",
        "ਜ਼ਿਆਦਾਤਰ ਦਿਨਾਂ ਵਿੱਚ ਬਲਗਮ ਨਾਲ ਲੰਮੀ ਖੰਘ ਫੇਫੜਿਆਂ ਦੀ ਕਿਸੇ ਲੰਮੀ ਬਿਮਾਰੀ ਦਾ ਸੰਕੇਤ ਹੋ ਸਕਦੀ ਹੈ",
        "ਸਾਹ ਫੁੱਲਣਾ, ਬੁਖ਼ਾਰ ਜਾਂ ਹਫ਼ਤਿਆਂ ਤੱਕ ਚੱਲਣ ਵਾਲੀ ਖੰਘ ਦੀ ਜਾਂਚ ਕਰਵਾਉਣੀ ਚਾਹੀਦੀ ਹੈ",
      ],
    },
  },
  {
    id: 'pneumonia',
    kind: 'condition',
    phrases: ['pneumonia', 'lung infection', 'infection in lungs', 'pnumonia'],
    en: {
      about: "Pneumonia is an infection of the lungs that fills the small air sacs with fluid or pus. It can range from mild to severe.",
      points: [
        "Common signs are cough, fever, chest pain on breathing and breathlessness",
        "Caused by bacteria, viruses or, less often, other germs",
        "Older people, young children and people with other illnesses are at higher risk",
        "A chest X-ray and an examination help confirm it",
        "It needs a doctor's assessment, and severe breathlessness needs urgent care",
      ],
    },
    hi: {
      about: "निमोनिया फेफड़ों का एक संक्रमण है जिसमें छोटी हवा की थैलियां तरल या मवाद से भर जाती हैं। यह हल्का या गंभीर हो सकता है।",
      points: [
        "आम संकेत हैं खांसी, बुखार, सांस लेते समय छाती में दर्द और सांस फूलना",
        "बैक्टीरिया, वायरस या कम मामलों में दूसरे कीटाणुओं से होता है",
        "बुज़ुर्गों, छोटे बच्चों और दूसरी बीमारियों वाले लोगों में खतरा ज़्यादा है",
        "छाती का एक्स-रे और जांच इसकी पुष्टि में मदद करते हैं",
        "इसके लिए डॉक्टर से जांच ज़रूरी है, और बहुत ज़्यादा सांस फूलने पर तुरंत इलाज चाहिए",
      ],
    },
    pa: {
      about: "ਨਮੂਨੀਆ ਫੇਫੜਿਆਂ ਦੀ ਇੱਕ ਲਾਗ ਹੈ ਜਿਸ ਵਿੱਚ ਛੋਟੀਆਂ ਹਵਾ ਦੀਆਂ ਥੈਲੀਆਂ ਤਰਲ ਜਾਂ ਪੀਕ ਨਾਲ ਭਰ ਜਾਂਦੀਆਂ ਹਨ। ਇਹ ਹਲਕਾ ਜਾਂ ਗੰਭੀਰ ਹੋ ਸਕਦਾ ਹੈ।",
      points: [
        "ਆਮ ਸੰਕੇਤ ਹਨ ਖੰਘ, ਬੁਖ਼ਾਰ, ਸਾਹ ਲੈਂਦੇ ਸਮੇਂ ਛਾਤੀ ਵਿੱਚ ਦਰਦ ਅਤੇ ਸਾਹ ਫੁੱਲਣਾ",
        "ਬੈਕਟੀਰੀਆ, ਵਾਇਰਸ ਜਾਂ ਘੱਟ ਮਾਮਲਿਆਂ ਵਿੱਚ ਹੋਰ ਕੀਟਾਣੂਆਂ ਤੋਂ ਹੁੰਦਾ ਹੈ",
        "ਬਜ਼ੁਰਗਾਂ, ਛੋਟੇ ਬੱਚਿਆਂ ਅਤੇ ਹੋਰ ਬਿਮਾਰੀਆਂ ਵਾਲੇ ਲੋਕਾਂ ਵਿੱਚ ਖ਼ਤਰਾ ਵੱਧ ਹੈ",
        "ਛਾਤੀ ਦਾ ਐਕਸ-ਰੇ ਅਤੇ ਜਾਂਚ ਇਸ ਦੀ ਪੁਸ਼ਟੀ ਵਿੱਚ ਮਦਦ ਕਰਦੇ ਹਨ",
        "ਇਸ ਲਈ ਡਾਕਟਰ ਤੋਂ ਜਾਂਚ ਜ਼ਰੂਰੀ ਹੈ, ਅਤੇ ਬਹੁਤ ਜ਼ਿਆਦਾ ਸਾਹ ਫੁੱਲਣ ’ਤੇ ਤੁਰੰਤ ਇਲਾਜ ਚਾਹੀਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'gastritis',
    kind: 'condition',
    phrases: ['gastritis', 'stomach inflammation', 'inflammation of stomach lining', 'gastric problem', 'gastric trouble', 'gastric', 'stomach lining inflammation'],
    en: {
      about: "Gastritis is inflammation of the stomach lining. It causes burning or aching in the upper belly, nausea, bloating and a feeling of fullness.",
      points: [
        "A common cause is infection with a germ called H. pylori",
        "Some pain-relieving treatments, alcohol and smoking can irritate the lining",
        "Spicy, oily food and irregular meals can make symptoms worse",
        "Black stool or vomiting blood needs urgent attention",
        "A test called an endoscopy can look directly at the lining",
      ],
    },
    hi: {
      about: "गैस्ट्राइटिस पेट की परत की सूजन है। इससे पेट के ऊपरी हिस्से में जलन या दर्द, मतली, फूलना और पेट भरा-भरा लगना होता है।",
      points: [
        "एक आम कारण एच. पाइलोरी नाम के कीटाणु का संक्रमण है",
        "दर्द दूर करने वाले कुछ इलाज, शराब और धूम्रपान परत में जलन कर सकते हैं",
        "मसालेदार, तैलीय खाना और खाने के अनियमित समय लक्षण बढ़ा सकते हैं",
        "काला मल या खून की उल्टी पर तुरंत ध्यान देना चाहिए",
        "एंडोस्कोपी नाम की जांच से परत को सीधे देखा जा सकता है",
      ],
    },
    pa: {
      about: "ਗੈਸਟ੍ਰਾਈਟਿਸ ਪੇਟ ਦੀ ਪਰਤ ਦੀ ਸੋਜ ਹੈ। ਇਸ ਨਾਲ ਪੇਟ ਦੇ ਉੱਪਰਲੇ ਹਿੱਸੇ ਵਿੱਚ ਜਲਨ ਜਾਂ ਦਰਦ, ਜੀ ਕੱਚਾ ਹੋਣਾ, ਫੁੱਲਣਾ ਅਤੇ ਪੇਟ ਭਰਿਆ-ਭਰਿਆ ਲੱਗਣਾ ਹੁੰਦਾ ਹੈ।",
      points: [
        "ਇੱਕ ਆਮ ਕਾਰਨ ਐੱਚ. ਪਾਇਲੋਰੀ ਨਾਮ ਦੇ ਕੀਟਾਣੂ ਦੀ ਲਾਗ ਹੈ",
        "ਦਰਦ ਦੂਰ ਕਰਨ ਵਾਲੇ ਕੁਝ ਇਲਾਜ, ਸ਼ਰਾਬ ਅਤੇ ਸਿਗਰਟਨੋਸ਼ੀ ਪਰਤ ਵਿੱਚ ਜਲਨ ਕਰ ਸਕਦੇ ਹਨ",
        "ਮਸਾਲੇਦਾਰ, ਤੇਲ ਵਾਲਾ ਖਾਣਾ ਅਤੇ ਖਾਣੇ ਦੇ ਬੇਨਿਯਮੀ ਸਮੇਂ ਲੱਛਣ ਵਧਾ ਸਕਦੇ ਹਨ",
        "ਕਾਲਾ ਮਲ ਜਾਂ ਖੂਨ ਦੀ ਉਲਟੀ ’ਤੇ ਤੁਰੰਤ ਧਿਆਨ ਦੇਣਾ ਚਾਹੀਦਾ ਹੈ",
        "ਐਂਡੋਸਕੋਪੀ ਨਾਮ ਦੀ ਜਾਂਚ ਨਾਲ ਪਰਤ ਨੂੰ ਸਿੱਧਾ ਦੇਖਿਆ ਜਾ ਸਕਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'peptic-ulcer',
    kind: 'condition',
    phrases: ['peptic ulcer', 'stomach ulcer', 'ulcer in stomach', 'gastric ulcer', 'duodenal ulcer', 'stomach ulcers', 'ulcers in stomach', 'ulcer stomach'],
    en: {
      about: "A peptic ulcer is an open sore in the lining of the stomach or of the first part of the small intestine.",
      points: [
        "Burning pain in the upper belly, often related to meals, is typical",
        "Most are caused by the H. pylori germ or by some pain-relieving treatments",
        "Smoking and alcohol make them worse",
        "Bleeding from an ulcer shows as black stool or vomiting blood and needs urgent care",
        "An endoscopy can see an ulcer, and ulcers can be treated once the cause is found",
      ],
    },
    hi: {
      about: "पेप्टिक अल्सर पेट की परत में, या छोटी आंत के पहले हिस्से में, एक खुला घाव है।",
      points: [
        "ऊपरी पेट में जलन वाला दर्द, जो अक्सर खाने से जुड़ा होता है, इसका आम लक्षण है",
        "ज़्यादातर अल्सर एच. पाइलोरी कीटाणु या दर्द दूर करने वाले कुछ इलाजों से होते हैं",
        "धूम्रपान और शराब इन्हें बढ़ाते हैं",
        "अल्सर से खून बहना काले मल या खून की उल्टी के रूप में दिखता है और तुरंत इलाज चाहिए",
        "एंडोस्कोपी से अल्सर देखा जा सकता है, और कारण पता चलने पर इसका इलाज हो सकता है",
      ],
    },
    pa: {
      about: "ਪੈਪਟਿਕ ਅਲਸਰ ਪੇਟ ਦੀ ਪਰਤ ਵਿੱਚ, ਜਾਂ ਛੋਟੀ ਆਂਦਰ ਦੇ ਪਹਿਲੇ ਹਿੱਸੇ ਵਿੱਚ, ਇੱਕ ਖੁੱਲ੍ਹਾ ਜ਼ਖ਼ਮ ਹੈ।",
      points: [
        "ਉੱਪਰਲੇ ਪੇਟ ਵਿੱਚ ਜਲਨ ਵਾਲਾ ਦਰਦ, ਜੋ ਅਕਸਰ ਖਾਣੇ ਨਾਲ ਜੁੜਿਆ ਹੁੰਦਾ ਹੈ, ਇਸ ਦਾ ਆਮ ਲੱਛਣ ਹੈ",
        "ਜ਼ਿਆਦਾਤਰ ਅਲਸਰ ਐੱਚ. ਪਾਇਲੋਰੀ ਕੀਟਾਣੂ ਜਾਂ ਦਰਦ ਦੂਰ ਕਰਨ ਵਾਲੇ ਕੁਝ ਇਲਾਜਾਂ ਤੋਂ ਹੁੰਦੇ ਹਨ",
        "ਸਿਗਰਟਨੋਸ਼ੀ ਅਤੇ ਸ਼ਰਾਬ ਇਨ੍ਹਾਂ ਨੂੰ ਵਧਾਉਂਦੇ ਹਨ",
        "ਅਲਸਰ ਤੋਂ ਖੂਨ ਵਗਣਾ ਕਾਲੇ ਮਲ ਜਾਂ ਖੂਨ ਦੀ ਉਲਟੀ ਦੇ ਰੂਪ ਵਿੱਚ ਦਿਖਦਾ ਹੈ ਅਤੇ ਤੁਰੰਤ ਇਲਾਜ ਚਾਹੀਦਾ ਹੈ",
        "ਐਂਡੋਸਕੋਪੀ ਨਾਲ ਅਲਸਰ ਦੇਖਿਆ ਜਾ ਸਕਦਾ ਹੈ, ਅਤੇ ਕਾਰਨ ਪਤਾ ਲੱਗਣ ’ਤੇ ਇਸ ਦਾ ਇਲਾਜ ਹੋ ਸਕਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'fatty-liver',
    kind: 'condition',
    phrases: ['fatty liver', 'fatty liver disease', 'liver fat', 'grade 1 fatty liver', 'nafld', 'liver fatty', 'fat in liver', 'grade 2 fatty liver'],
    en: {
      about: "Fatty liver means extra fat has built up in the liver. It is common, often has no symptoms and is often found on an ultrasound.",
      points: [
        "Linked to extra weight, diabetes, high cholesterol and little activity",
        "Alcohol can also cause it",
        "Early on it can often improve when weight, food and activity improve",
        "Left alone for years, it can slowly harm the liver, so follow-up matters",
        "Blood tests and an ultrasound show how the liver is doing",
      ],
    },
    hi: {
      about: "फैटी लिवर का मतलब है कि लिवर में ज़्यादा वसा जमा हो गई है। यह आम है, अक्सर इसमें कोई लक्षण नहीं होता और यह अक्सर अल्ट्रासाउंड में पता चलता है।",
      points: [
        "ज़्यादा वज़न, डायबिटीज़, ज़्यादा कोलेस्ट्रॉल और कम गतिविधि से जुड़ा",
        "शराब से भी हो सकता है",
        "शुरुआत में वज़न, खान-पान और गतिविधि सुधरने पर यह अक्सर बेहतर हो सकता है",
        "सालों तक अनदेखा करने पर यह धीरे-धीरे लिवर को नुकसान पहुंचा सकता है, इसलिए फ़ॉलो-अप ज़रूरी है",
        "खून की जांच और अल्ट्रासाउंड से पता चलता है कि लिवर कैसा है",
      ],
    },
    pa: {
      about: "ਫੈਟੀ ਲਿਵਰ ਦਾ ਮਤਲਬ ਹੈ ਕਿ ਜਿਗਰ ਵਿੱਚ ਵਾਧੂ ਚਰਬੀ ਜਮ੍ਹਾ ਹੋ ਗਈ ਹੈ। ਇਹ ਆਮ ਹੈ, ਅਕਸਰ ਇਸ ਵਿੱਚ ਕੋਈ ਲੱਛਣ ਨਹੀਂ ਹੁੰਦਾ ਅਤੇ ਇਹ ਅਕਸਰ ਅਲਟਰਾਸਾਊਂਡ ਵਿੱਚ ਪਤਾ ਲੱਗਦਾ ਹੈ।",
      points: [
        "ਵੱਧ ਭਾਰ, ਸ਼ੂਗਰ, ਵੱਧ ਕੋਲੈਸਟ੍ਰੋਲ ਅਤੇ ਘੱਟ ਗਤੀਵਿਧੀ ਨਾਲ ਜੁੜਿਆ",
        "ਸ਼ਰਾਬ ਤੋਂ ਵੀ ਹੋ ਸਕਦਾ ਹੈ",
        "ਸ਼ੁਰੂ ਵਿੱਚ ਭਾਰ, ਖਾਣ-ਪੀਣ ਅਤੇ ਗਤੀਵਿਧੀ ਸੁਧਰਨ ’ਤੇ ਇਹ ਅਕਸਰ ਬਿਹਤਰ ਹੋ ਸਕਦਾ ਹੈ",
        "ਸਾਲਾਂ ਤੱਕ ਅਣਗੌਲਿਆ ਕਰਨ ’ਤੇ ਇਹ ਹੌਲੀ-ਹੌਲੀ ਜਿਗਰ ਨੂੰ ਨੁਕਸਾਨ ਪਹੁੰਚਾ ਸਕਦਾ ਹੈ, ਇਸ ਲਈ ਫ਼ਾਲੋ-ਅੱਪ ਜ਼ਰੂਰੀ ਹੈ",
        "ਖੂਨ ਦੀ ਜਾਂਚ ਅਤੇ ਅਲਟਰਾਸਾਊਂਡ ਨਾਲ ਪਤਾ ਲੱਗਦਾ ਹੈ ਕਿ ਜਿਗਰ ਕਿਵੇਂ ਹੈ",
      ],
    },
  },
  {
    id: 'hepatitis',
    kind: 'condition',
    phrases: ['hepatitis', 'hepatitis a', 'hepatitis b', 'hepatitis c', 'hepatitis e', 'liver infection', 'liver inflammation', 'liver disease'],
    en: {
      about: "Hepatitis means inflammation of the liver. It can be from a virus, alcohol, some treatments or the body's own defence system.",
      points: [
        "Hepatitis A and E usually spread through contaminated food and water",
        "Hepatitis B and C spread through blood and body fluids; vaccination protects against A and B",
        "Signs can include tiredness, nausea, dark urine and yellow eyes, though some people have none",
        "Blood tests show which kind it is",
        "Some forms are short-lived and others long-term, so follow-up matters",
      ],
    },
    hi: {
      about: "हेपेटाइटिस का मतलब है लिवर की सूजन। यह वायरस, शराब, कुछ इलाजों या शरीर की अपनी रक्षा प्रणाली से हो सकती है।",
      points: [
        "हेपेटाइटिस A और E आमतौर पर दूषित खाने-पानी से फैलते हैं",
        "हेपेटाइटिस B और C खून और शरीर के तरल से फैलते हैं; टीकाकरण A और B से बचाता है",
        "संकेतों में थकान, मतली, गहरे रंग का पेशाब और पीली आंखें शामिल हो सकती हैं, हालांकि कुछ लोगों में कोई लक्षण नहीं होता",
        "खून की जांच से पता चलता है कि यह किस प्रकार का है",
        "कुछ प्रकार थोड़े समय के होते हैं और कुछ लंबे समय के, इसलिए फ़ॉलो-अप ज़रूरी है",
      ],
    },
    pa: {
      about: "ਹੈਪੇਟਾਈਟਿਸ ਦਾ ਮਤਲਬ ਹੈ ਜਿਗਰ ਦੀ ਸੋਜ। ਇਹ ਵਾਇਰਸ, ਸ਼ਰਾਬ, ਕੁਝ ਇਲਾਜਾਂ ਜਾਂ ਸਰੀਰ ਦੀ ਆਪਣੀ ਰੱਖਿਆ ਪ੍ਰਣਾਲੀ ਤੋਂ ਹੋ ਸਕਦੀ ਹੈ।",
      points: [
        "ਹੈਪੇਟਾਈਟਿਸ A ਅਤੇ E ਆਮ ਤੌਰ ’ਤੇ ਦੂਸ਼ਿਤ ਖਾਣੇ-ਪਾਣੀ ਨਾਲ ਫੈਲਦੇ ਹਨ",
        "ਹੈਪੇਟਾਈਟਿਸ B ਅਤੇ C ਖੂਨ ਅਤੇ ਸਰੀਰ ਦੇ ਤਰਲ ਨਾਲ ਫੈਲਦੇ ਹਨ; ਟੀਕਾਕਰਨ A ਅਤੇ B ਤੋਂ ਬਚਾਉਂਦਾ ਹੈ",
        "ਸੰਕੇਤਾਂ ਵਿੱਚ ਥਕਾਵਟ, ਜੀ ਕੱਚਾ ਹੋਣਾ, ਗੂੜ੍ਹੇ ਰੰਗ ਦਾ ਪਿਸ਼ਾਬ ਅਤੇ ਪੀਲੀਆਂ ਅੱਖਾਂ ਸ਼ਾਮਲ ਹੋ ਸਕਦੀਆਂ ਹਨ, ਹਾਲਾਂਕਿ ਕੁਝ ਲੋਕਾਂ ਵਿੱਚ ਕੋਈ ਲੱਛਣ ਨਹੀਂ ਹੁੰਦਾ",
        "ਖੂਨ ਦੀ ਜਾਂਚ ਨਾਲ ਪਤਾ ਲੱਗਦਾ ਹੈ ਕਿ ਇਹ ਕਿਸ ਕਿਸਮ ਦਾ ਹੈ",
        "ਕੁਝ ਕਿਸਮਾਂ ਥੋੜ੍ਹੇ ਸਮੇਂ ਦੀਆਂ ਹੁੰਦੀਆਂ ਹਨ ਅਤੇ ਕੁਝ ਲੰਮੇ ਸਮੇਂ ਦੀਆਂ, ਇਸ ਲਈ ਫ਼ਾਲੋ-ਅੱਪ ਜ਼ਰੂਰੀ ਹੈ",
      ],
    },
  },
  {
    id: 'jaundice',
    kind: 'condition',
    phrases: ['jaundice', 'yellow eyes', 'yellow skin', 'yellowing of eyes', 'yellow eyes and skin', 'peelia', 'piliya'],
    en: {
      about: "Jaundice is a yellow colour of the skin and the whites of the eyes, caused by too much bilirubin in the blood.",
      points: [
        "It is a sign of a problem, not a disease on its own",
        "Common causes are liver infections such as hepatitis, gallstones blocking the bile duct, and breakdown of blood cells",
        "Dark urine and pale stool can go with it",
        "In newborn babies it is common and often settles, but it is still checked",
        "A blood test and an ultrasound help find the cause",
      ],
    },
    hi: {
      about: "पीलिया में त्वचा और आंखों का सफ़ेद हिस्सा पीला हो जाता है, जो खून में बिलीरुबिन के ज़्यादा होने से होता है।",
      points: [
        "यह किसी समस्या का संकेत है, अपने आप में कोई बीमारी नहीं",
        "आम कारण हैं हेपेटाइटिस जैसे लिवर के संक्रमण, पित्त की नली को रोकती पथरी, और खून की कोशिकाओं का टूटना",
        "इसके साथ गहरे रंग का पेशाब और हल्के रंग का मल हो सकता है",
        "नवजात शिशुओं में यह आम है और अक्सर ठीक हो जाता है, फिर भी इसकी जांच की जाती है",
        "खून की जांच और अल्ट्रासाउंड कारण पता करने में मदद करते हैं",
      ],
    },
    pa: {
      about: "ਪੀਲੀਆ ਵਿੱਚ ਚਮੜੀ ਅਤੇ ਅੱਖਾਂ ਦਾ ਚਿੱਟਾ ਹਿੱਸਾ ਪੀਲਾ ਹੋ ਜਾਂਦਾ ਹੈ, ਜੋ ਖੂਨ ਵਿੱਚ ਬਿਲੀਰੂਬਿਨ ਦੇ ਵੱਧ ਹੋਣ ਨਾਲ ਹੁੰਦਾ ਹੈ।",
      points: [
        "ਇਹ ਕਿਸੇ ਸਮੱਸਿਆ ਦਾ ਸੰਕੇਤ ਹੈ, ਆਪਣੇ ਆਪ ਵਿੱਚ ਕੋਈ ਬਿਮਾਰੀ ਨਹੀਂ",
        "ਆਮ ਕਾਰਨ ਹਨ ਹੈਪੇਟਾਈਟਿਸ ਵਰਗੀਆਂ ਜਿਗਰ ਦੀਆਂ ਲਾਗਾਂ, ਪਿੱਤ ਦੀ ਨਲੀ ਨੂੰ ਰੋਕਦੀ ਪੱਥਰੀ, ਅਤੇ ਖੂਨ ਦੀਆਂ ਕੋਸ਼ਿਕਾਵਾਂ ਦਾ ਟੁੱਟਣਾ",
        "ਇਸ ਦੇ ਨਾਲ ਗੂੜ੍ਹੇ ਰੰਗ ਦਾ ਪਿਸ਼ਾਬ ਅਤੇ ਹਲਕੇ ਰੰਗ ਦਾ ਮਲ ਹੋ ਸਕਦਾ ਹੈ",
        "ਨਵਜੰਮੇ ਬੱਚਿਆਂ ਵਿੱਚ ਇਹ ਆਮ ਹੈ ਅਤੇ ਅਕਸਰ ਠੀਕ ਹੋ ਜਾਂਦਾ ਹੈ, ਫਿਰ ਵੀ ਇਸ ਦੀ ਜਾਂਚ ਕੀਤੀ ਜਾਂਦੀ ਹੈ",
        "ਖੂਨ ਦੀ ਜਾਂਚ ਅਤੇ ਅਲਟਰਾਸਾਊਂਡ ਕਾਰਨ ਲੱਭਣ ਵਿੱਚ ਮਦਦ ਕਰਦੇ ਹਨ",
      ],
    },
  },
  {
    id: 'gallstones',
    kind: 'condition',
    phrases: ['gallstones', 'gall stones', 'gallbladder stones', 'stone in gallbladder', 'gallbladder stone', 'stones in gallbladder', 'pittashay ki pathri', 'gallstone', 'gall bladder stone', 'gall bladder stones', 'gallbladder problem'],
    en: {
      about: "Gallstones are hard lumps that form in the gallbladder, a small pouch under the liver that stores bile. Many cause no trouble, but some cause pain.",
      points: [
        "Pain in the upper right or middle of the belly, often after a meal, is typical",
        "More likely with extra weight, rapid weight loss, family history and in women",
        "A stone can block the bile duct and cause jaundice or infection",
        "An ultrasound shows gallstones",
        "Stones that cause trouble are usually dealt with by removing the gallbladder, often by keyhole surgery",
      ],
    },
    hi: {
      about: "पित्त की पथरी सख्त गांठें होती हैं जो पित्ताशय में बनती हैं, जो लिवर के नीचे एक छोटी थैली है जिसमें पित्त जमा रहता है। कई में कोई तकलीफ़ नहीं होती, लेकिन कुछ में दर्द होता है।",
      points: [
        "पेट के ऊपरी दाएं हिस्से या बीच में दर्द, अक्सर खाने के बाद, इसका आम लक्षण है",
        "ज़्यादा वज़न, तेज़ी से वज़न घटाने, परिवार के इतिहास और महिलाओं में संभावना ज़्यादा है",
        "पथरी पित्त की नली को रोक सकती है और पीलिया या संक्रमण हो सकता है",
        "अल्ट्रासाउंड में पित्त की पथरी दिखती है",
        "जो पथरी तकलीफ़ दे, उसे आमतौर पर पित्ताशय निकालकर, अक्सर दूरबीन से ऑपरेशन करके संभाला जाता है",
      ],
    },
    pa: {
      about: "ਪਿੱਤੇ ਦੀ ਪੱਥਰੀ ਸਖ਼ਤ ਗੰਢਾਂ ਹੁੰਦੀਆਂ ਹਨ ਜੋ ਪਿੱਤੇ ਵਿੱਚ ਬਣਦੀਆਂ ਹਨ, ਜੋ ਜਿਗਰ ਹੇਠਾਂ ਇੱਕ ਛੋਟੀ ਥੈਲੀ ਹੈ ਜਿਸ ਵਿੱਚ ਪਿੱਤ ਜਮ੍ਹਾ ਰਹਿੰਦਾ ਹੈ। ਕਈਆਂ ਵਿੱਚ ਕੋਈ ਤਕਲੀਫ਼ ਨਹੀਂ ਹੁੰਦੀ, ਪਰ ਕੁਝ ਵਿੱਚ ਦਰਦ ਹੁੰਦਾ ਹੈ।",
      points: [
        "ਪੇਟ ਦੇ ਉੱਪਰਲੇ ਸੱਜੇ ਹਿੱਸੇ ਜਾਂ ਵਿਚਕਾਰ ਵਿੱਚ ਦਰਦ, ਅਕਸਰ ਖਾਣ ਤੋਂ ਬਾਅਦ, ਇਸ ਦਾ ਆਮ ਲੱਛਣ ਹੈ",
        "ਵੱਧ ਭਾਰ, ਤੇਜ਼ੀ ਨਾਲ ਭਾਰ ਘਟਾਉਣ, ਪਰਿਵਾਰ ਦੇ ਇਤਿਹਾਸ ਅਤੇ ਔਰਤਾਂ ਵਿੱਚ ਸੰਭਾਵਨਾ ਵੱਧ ਹੈ",
        "ਪੱਥਰੀ ਪਿੱਤ ਦੀ ਨਲੀ ਨੂੰ ਰੋਕ ਸਕਦੀ ਹੈ ਅਤੇ ਪੀਲੀਆ ਜਾਂ ਲਾਗ ਹੋ ਸਕਦੀ ਹੈ",
        "ਅਲਟਰਾਸਾਊਂਡ ਵਿੱਚ ਪਿੱਤੇ ਦੀ ਪੱਥਰੀ ਦਿਖਦੀ ਹੈ",
        "ਜੋ ਪੱਥਰੀ ਤਕਲੀਫ਼ ਦੇਵੇ, ਉਸ ਨੂੰ ਆਮ ਤੌਰ ’ਤੇ ਪਿੱਤਾ ਕੱਢ ਕੇ, ਅਕਸਰ ਦੂਰਬੀਨ ਨਾਲ ਆਪ੍ਰੇਸ਼ਨ ਕਰਕੇ ਸੰਭਾਲਿਆ ਜਾਂਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'appendicitis',
    kind: 'condition',
    phrases: ['appendicitis', 'appendix', 'appendix pain', 'pain in appendix', 'inflamed appendix', 'appendix problem'],
    en: {
      about: "Appendicitis is inflammation of the appendix, a small pouch attached to the large intestine. It usually causes pain that starts around the navel and moves to the lower right of the belly.",
      points: [
        "The pain often gets steadily worse over hours, with loss of appetite and nausea",
        "Fever and vomiting can follow",
        "It can look like other causes of belly pain, so a doctor must examine",
        "An ultrasound or a CT scan can help confirm it",
        "It needs prompt medical attention, and is usually treated with an operation",
      ],
    },
    hi: {
      about: "अपेंडिसाइटिस अपेंडिक्स की सूजन है, जो बड़ी आंत से जुड़ी एक छोटी थैली है। इसमें आमतौर पर दर्द नाभि के आसपास शुरू होकर पेट के निचले दाएं हिस्से में चला जाता है।",
      points: [
        "दर्द अक्सर घंटों में लगातार बढ़ता जाता है, भूख कम हो जाती है और मतली होती है",
        "इसके बाद बुखार और उल्टी हो सकती है",
        "यह पेट दर्द के दूसरे कारणों जैसा लग सकता है, इसलिए डॉक्टर को जांच करनी होती है",
        "अल्ट्रासाउंड या सीटी स्कैन इसकी पुष्टि में मदद कर सकता है",
        "इसमें जल्द चिकित्सा ध्यान चाहिए, और आमतौर पर ऑपरेशन से इसका इलाज होता है",
      ],
    },
    pa: {
      about: "ਅਪੈਂਡਿਸਾਈਟਿਸ ਅਪੈਂਡਿਕਸ ਦੀ ਸੋਜ ਹੈ, ਜੋ ਵੱਡੀ ਆਂਦਰ ਨਾਲ ਜੁੜੀ ਇੱਕ ਛੋਟੀ ਥੈਲੀ ਹੈ। ਇਸ ਵਿੱਚ ਆਮ ਤੌਰ ’ਤੇ ਦਰਦ ਧੁੰਨੀ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਸ਼ੁਰੂ ਹੋ ਕੇ ਪੇਟ ਦੇ ਹੇਠਲੇ ਸੱਜੇ ਹਿੱਸੇ ਵਿੱਚ ਚਲਾ ਜਾਂਦਾ ਹੈ।",
      points: [
        "ਦਰਦ ਅਕਸਰ ਘੰਟਿਆਂ ਵਿੱਚ ਲਗਾਤਾਰ ਵਧਦਾ ਜਾਂਦਾ ਹੈ, ਭੁੱਖ ਘਟ ਜਾਂਦੀ ਹੈ ਅਤੇ ਜੀ ਕੱਚਾ ਹੁੰਦਾ ਹੈ",
        "ਇਸ ਤੋਂ ਬਾਅਦ ਬੁਖ਼ਾਰ ਅਤੇ ਉਲਟੀ ਹੋ ਸਕਦੀ ਹੈ",
        "ਇਹ ਪੇਟ ਦਰਦ ਦੇ ਹੋਰ ਕਾਰਨਾਂ ਵਰਗਾ ਲੱਗ ਸਕਦਾ ਹੈ, ਇਸ ਲਈ ਡਾਕਟਰ ਨੂੰ ਜਾਂਚ ਕਰਨੀ ਪੈਂਦੀ ਹੈ",
        "ਅਲਟਰਾਸਾਊਂਡ ਜਾਂ ਸੀਟੀ ਸਕੈਨ ਇਸ ਦੀ ਪੁਸ਼ਟੀ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦਾ ਹੈ",
        "ਇਸ ਵਿੱਚ ਜਲਦੀ ਡਾਕਟਰੀ ਧਿਆਨ ਚਾਹੀਦਾ ਹੈ, ਅਤੇ ਆਮ ਤੌਰ ’ਤੇ ਆਪ੍ਰੇਸ਼ਨ ਨਾਲ ਇਸ ਦਾ ਇਲਾਜ ਹੁੰਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'piles',
    kind: 'condition',
    phrases: ['piles', 'haemorrhoids', 'hemorrhoids', 'bawaseer', 'bavasir', 'pile', 'piles problem', 'hemorrhoid', 'haemorrhoid', 'बवासीर', 'ਬਵਾਸੀਰ', 'मस्से'],
    en: {
      about: "Piles (haemorrhoids) are swollen cushions of veins in or around the back passage. They are common and can cause bleeding, itching or a lump.",
      points: [
        "Bright red blood after passing stool is the most typical sign",
        "Linked to constipation, straining, long sitting and pregnancy",
        "Often painless, unless a clot forms or a lump is outside the anus",
        "Other causes of blood in the stool must be ruled out, so it should be checked",
        "Piles are common and usually treatable, from simple measures to a procedure or surgery when needed",
      ],
    },
    hi: {
      about: "बवासीर (पाइल्स) गुदा के अंदर या आसपास की नसों के सूजे हुए गुच्छे हैं। ये आम हैं और इनसे खून आना, खुजली या गांठ हो सकती है।",
      points: [
        "शौच के बाद चमकीला लाल खून आना इसका सबसे आम संकेत है",
        "कब्ज़, ज़ोर लगाने, देर तक बैठने और गर्भावस्था से जुड़ा",
        "अक्सर दर्द नहीं होता, जब तक खून का थक्का न जमे या गांठ गुदा के बाहर न हो",
        "मल में खून के दूसरे कारणों को अलग करना ज़रूरी है, इसलिए जांच करानी चाहिए",
        "बवासीर आम है और आमतौर पर इसका इलाज हो सकता है, आसान उपायों से लेकर ज़रूरत पर प्रक्रिया या ऑपरेशन तक",
      ],
    },
    pa: {
      about: "ਬਵਾਸੀਰ (ਪਾਈਲਜ਼) ਗੁਦਾ ਦੇ ਅੰਦਰ ਜਾਂ ਆਲੇ-ਦੁਆਲੇ ਦੀਆਂ ਨਾੜਾਂ ਦੇ ਸੁੱਜੇ ਹੋਏ ਗੁੱਛੇ ਹਨ। ਇਹ ਆਮ ਹਨ ਅਤੇ ਇਨ੍ਹਾਂ ਨਾਲ ਖੂਨ ਆਉਣਾ, ਖੁਜਲੀ ਜਾਂ ਗੰਢ ਹੋ ਸਕਦੀ ਹੈ।",
      points: [
        "ਟੱਟੀ ਤੋਂ ਬਾਅਦ ਚਮਕਦਾਰ ਲਾਲ ਖੂਨ ਆਉਣਾ ਇਸ ਦਾ ਸਭ ਤੋਂ ਆਮ ਸੰਕੇਤ ਹੈ",
        "ਕਬਜ਼, ਜ਼ੋਰ ਲਾਉਣ, ਦੇਰ ਤੱਕ ਬੈਠਣ ਅਤੇ ਗਰਭ ਅਵਸਥਾ ਨਾਲ ਜੁੜਿਆ",
        "ਅਕਸਰ ਦਰਦ ਨਹੀਂ ਹੁੰਦਾ, ਜਦੋਂ ਤੱਕ ਖੂਨ ਦਾ ਥੱਕਾ ਨਾ ਜੰਮੇ ਜਾਂ ਗੰਢ ਗੁਦਾ ਤੋਂ ਬਾਹਰ ਨਾ ਹੋਵੇ",
        "ਮਲ ਵਿੱਚ ਖੂਨ ਦੇ ਹੋਰ ਕਾਰਨਾਂ ਨੂੰ ਵੱਖ ਕਰਨਾ ਜ਼ਰੂਰੀ ਹੈ, ਇਸ ਲਈ ਜਾਂਚ ਕਰਵਾਉਣੀ ਚਾਹੀਦੀ ਹੈ",
        "ਬਵਾਸੀਰ ਆਮ ਹੈ ਅਤੇ ਆਮ ਤੌਰ ’ਤੇ ਇਸ ਦਾ ਇਲਾਜ ਹੋ ਸਕਦਾ ਹੈ, ਆਸਾਨ ਉਪਾਵਾਂ ਤੋਂ ਲੈ ਕੇ ਲੋੜ ਪੈਣ ’ਤੇ ਪ੍ਰਕਿਰਿਆ ਜਾਂ ਆਪ੍ਰੇਸ਼ਨ ਤੱਕ",
      ],
    },
  },
  {
    id: 'anal-fissure',
    kind: 'condition',
    phrases: ['anal fissure', 'fissure', 'fissure in ano', 'tear in anus', 'fissure anus', 'fisure', 'fissures'],
    en: {
      about: "An anal fissure is a small tear in the lining of the anus. It causes sharp pain when passing stool, and sometimes a little bright red blood.",
      points: [
        "Usually caused by passing hard stool or straining",
        "The pain can last for hours after passing stool",
        "Often linked to constipation or, less often, diarrhoea",
        "A doctor can see it on a gentle examination",
        "Most heal, but some become long-lasting and need more treatment",
      ],
    },
    hi: {
      about: "एनल फिशर गुदा की परत में एक छोटी दरार है। इससे शौच के समय तेज़ दर्द होता है, और कभी-कभी थोड़ा चमकीला लाल खून भी आता है।",
      points: [
        "आमतौर पर सख्त मल निकलने या ज़ोर लगाने से होता है",
        "शौच के बाद दर्द घंटों तक रह सकता है",
        "अक्सर कब्ज़ से, या कम मामलों में दस्त से जुड़ा",
        "डॉक्टर इसे आराम से जांच करके देख सकते हैं",
        "ज़्यादातर ठीक हो जाते हैं, लेकिन कुछ लंबे चलते हैं और उन्हें और इलाज चाहिए",
      ],
    },
    pa: {
      about: "ਐਨਲ ਫਿਸ਼ਰ ਗੁਦਾ ਦੀ ਪਰਤ ਵਿੱਚ ਇੱਕ ਛੋਟੀ ਦਰਾੜ ਹੈ। ਇਸ ਨਾਲ ਟੱਟੀ ਵੇਲੇ ਤੇਜ਼ ਦਰਦ ਹੁੰਦਾ ਹੈ, ਅਤੇ ਕਈ ਵਾਰ ਥੋੜ੍ਹਾ ਚਮਕਦਾਰ ਲਾਲ ਖੂਨ ਵੀ ਆਉਂਦਾ ਹੈ।",
      points: [
        "ਆਮ ਤੌਰ ’ਤੇ ਸਖ਼ਤ ਮਲ ਨਿਕਲਣ ਜਾਂ ਜ਼ੋਰ ਲਾਉਣ ਨਾਲ ਹੁੰਦਾ ਹੈ",
        "ਟੱਟੀ ਤੋਂ ਬਾਅਦ ਦਰਦ ਘੰਟਿਆਂ ਤੱਕ ਰਹਿ ਸਕਦਾ ਹੈ",
        "ਅਕਸਰ ਕਬਜ਼ ਨਾਲ, ਜਾਂ ਘੱਟ ਮਾਮਲਿਆਂ ਵਿੱਚ ਦਸਤ ਨਾਲ ਜੁੜਿਆ",
        "ਡਾਕਟਰ ਇਸ ਨੂੰ ਆਰਾਮ ਨਾਲ ਜਾਂਚ ਕਰਕੇ ਦੇਖ ਸਕਦੇ ਹਨ",
        "ਜ਼ਿਆਦਾਤਰ ਠੀਕ ਹੋ ਜਾਂਦੇ ਹਨ, ਪਰ ਕੁਝ ਲੰਮੇ ਚੱਲਦੇ ਹਨ ਅਤੇ ਉਨ੍ਹਾਂ ਨੂੰ ਹੋਰ ਇਲਾਜ ਚਾਹੀਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'fistula',
    kind: 'condition',
    phrases: ['fistula', 'anal fistula', 'fistula in ano', 'fistula anus', 'fistula problem', 'fistulas'],
    en: {
      about: "An anal fistula is a small tunnel between the end of the bowel and the skin near the anus. It often follows an abscess and causes repeated discharge or pain.",
      points: [
        "Common signs are a painful swelling, discharge of pus or blood, and an opening near the anus",
        "It usually starts with an infected gland in the anus (an abscess)",
        "It does not usually heal by itself",
        "A doctor examines it, and sometimes an MRI scan shows its path",
        "Treatment is usually a surgical procedure, planned by a surgeon",
      ],
    },
    hi: {
      about: "एनल फिस्टुला आंत के आख़िरी हिस्से और गुदा के पास की त्वचा के बीच एक छोटी सुरंग है। यह अक्सर फोड़े के बाद होती है और बार-बार स्राव या दर्द करती है।",
      points: [
        "आम संकेत हैं दर्द वाली सूजन, मवाद या खून का रिसाव, और गुदा के पास एक छेद",
        "यह आमतौर पर गुदा की किसी संक्रमित ग्रंथि (फोड़े) से शुरू होती है",
        "यह आमतौर पर अपने आप ठीक नहीं होती",
        "डॉक्टर जांच करते हैं, और कभी-कभी एमआरआई स्कैन से उसका रास्ता दिखता है",
        "इलाज आमतौर पर एक सर्जिकल प्रक्रिया है, जिसकी योजना सर्जन बनाते हैं",
      ],
    },
    pa: {
      about: "ਐਨਲ ਫਿਸਟੁਲਾ ਆਂਦਰ ਦੇ ਆਖ਼ਰੀ ਹਿੱਸੇ ਅਤੇ ਗੁਦਾ ਦੇ ਨੇੜੇ ਦੀ ਚਮੜੀ ਵਿਚਕਾਰ ਇੱਕ ਛੋਟੀ ਸੁਰੰਗ ਹੈ। ਇਹ ਅਕਸਰ ਫੋੜੇ ਤੋਂ ਬਾਅਦ ਹੁੰਦੀ ਹੈ ਅਤੇ ਵਾਰ-ਵਾਰ ਰਿਸਾਅ ਜਾਂ ਦਰਦ ਕਰਦੀ ਹੈ।",
      points: [
        "ਆਮ ਸੰਕੇਤ ਹਨ ਦਰਦ ਵਾਲੀ ਸੋਜ, ਪੀਕ ਜਾਂ ਖੂਨ ਦਾ ਰਿਸਾਅ, ਅਤੇ ਗੁਦਾ ਦੇ ਨੇੜੇ ਇੱਕ ਛੇਕ",
        "ਇਹ ਆਮ ਤੌਰ ’ਤੇ ਗੁਦਾ ਦੀ ਕਿਸੇ ਲਾਗ ਵਾਲੀ ਗ੍ਰੰਥੀ (ਫੋੜੇ) ਤੋਂ ਸ਼ੁਰੂ ਹੁੰਦੀ ਹੈ",
        "ਇਹ ਆਮ ਤੌਰ ’ਤੇ ਆਪਣੇ ਆਪ ਠੀਕ ਨਹੀਂ ਹੁੰਦੀ",
        "ਡਾਕਟਰ ਜਾਂਚ ਕਰਦੇ ਹਨ, ਅਤੇ ਕਈ ਵਾਰ ਐਮਆਰਆਈ ਸਕੈਨ ਨਾਲ ਉਸ ਦਾ ਰਸਤਾ ਦਿਖਦਾ ਹੈ",
        "ਇਲਾਜ ਆਮ ਤੌਰ ’ਤੇ ਇੱਕ ਸਰਜੀਕਲ ਪ੍ਰਕਿਰਿਆ ਹੈ, ਜਿਸ ਦੀ ਯੋਜਨਾ ਸਰਜਨ ਬਣਾਉਂਦੇ ਹਨ",
      ],
    },
  },
  {
    id: 'hernia',
    kind: 'condition',
    phrases: ['hernia', 'inguinal hernia', 'umbilical hernia', 'hernia in groin', 'hernia pain', 'abdominal hernia', 'hernia swelling', 'hernea', 'hernias', 'incisional hernia'],
    en: {
      about: "A hernia is when part of the gut or fatty tissue pushes through a weak spot in the muscle wall of the belly. It shows as a bulge, often in the groin or near the navel.",
      points: [
        "The bulge may be more noticeable when standing, coughing or lifting",
        "It can cause an ache or a dragging feeling",
        "Hernias do not heal by themselves, and tend to grow slowly",
        "A hernia that becomes hard and very painful and cannot be pushed back needs urgent care",
        "Repair is by surgery, often by keyhole",
      ],
    },
    hi: {
      about: "हर्निया तब होता है जब आंत या चर्बी का एक हिस्सा पेट की मांसपेशियों की दीवार के किसी कमज़ोर हिस्से से बाहर की ओर धकेलता है। यह एक उभार के रूप में दिखता है, अक्सर जांघ के जोड़ में या नाभि के पास।",
      points: [
        "खड़े होने, खांसने या वज़न उठाने पर उभार ज़्यादा दिख सकता है",
        "इससे दर्द या खिंचाव का एहसास हो सकता है",
        "हर्निया अपने आप ठीक नहीं होता, और धीरे-धीरे बढ़ने लगता है",
        "जो हर्निया सख्त और बहुत दर्दनाक हो जाए और वापस अंदर न जाए, उसे तुरंत इलाज चाहिए",
        "मरम्मत ऑपरेशन से होती है, अक्सर दूरबीन से",
      ],
    },
    pa: {
      about: "ਹਰਨੀਆ ਉਦੋਂ ਹੁੰਦਾ ਹੈ ਜਦੋਂ ਆਂਦਰ ਜਾਂ ਚਰਬੀ ਦਾ ਇੱਕ ਹਿੱਸਾ ਪੇਟ ਦੀਆਂ ਮਾਸਪੇਸ਼ੀਆਂ ਦੀ ਕੰਧ ਦੇ ਕਿਸੇ ਕਮਜ਼ੋਰ ਹਿੱਸੇ ਵਿੱਚੋਂ ਬਾਹਰ ਵੱਲ ਧੱਕਦਾ ਹੈ। ਇਹ ਇੱਕ ਉਭਾਰ ਦੇ ਰੂਪ ਵਿੱਚ ਦਿਖਦਾ ਹੈ, ਅਕਸਰ ਪੱਟ ਦੇ ਜੋੜ ਵਿੱਚ ਜਾਂ ਧੁੰਨੀ ਦੇ ਨੇੜੇ।",
      points: [
        "ਖੜ੍ਹੇ ਹੋਣ, ਖੰਘਣ ਜਾਂ ਭਾਰ ਚੁੱਕਣ ’ਤੇ ਉਭਾਰ ਵੱਧ ਦਿਖ ਸਕਦਾ ਹੈ",
        "ਇਸ ਨਾਲ ਦਰਦ ਜਾਂ ਖਿਚਾਅ ਦਾ ਅਹਿਸਾਸ ਹੋ ਸਕਦਾ ਹੈ",
        "ਹਰਨੀਆ ਆਪਣੇ ਆਪ ਠੀਕ ਨਹੀਂ ਹੁੰਦਾ, ਅਤੇ ਹੌਲੀ-ਹੌਲੀ ਵਧਣ ਲੱਗਦਾ ਹੈ",
        "ਜੋ ਹਰਨੀਆ ਸਖ਼ਤ ਅਤੇ ਬਹੁਤ ਦਰਦਨਾਕ ਹੋ ਜਾਵੇ ਅਤੇ ਵਾਪਸ ਅੰਦਰ ਨਾ ਜਾਵੇ, ਉਸ ਨੂੰ ਤੁਰੰਤ ਇਲਾਜ ਚਾਹੀਦਾ ਹੈ",
        "ਮੁਰੰਮਤ ਆਪ੍ਰੇਸ਼ਨ ਨਾਲ ਹੁੰਦੀ ਹੈ, ਅਕਸਰ ਦੂਰਬੀਨ ਨਾਲ",
      ],
    },
  },
  {
    id: 'kidney-stone',
    kind: 'condition',
    phrases: ['kidney stone', 'kidney stones', 'stone in kidney', 'renal stone', 'renal colic', 'pathri', 'ureteric stone', 'stones in kidney', 'urinary stone', 'kidney stone pain', 'stone in urine', 'renal calculus'],
    en: {
      about: "Kidney stones are hard lumps made of minerals that form in the kidney. A stone can travel down and cause sudden, severe pain in the side or back.",
      points: [
        "Pain comes in waves from the loin towards the groin, often with nausea",
        "Blood in the urine is common",
        "Small stones may pass by themselves",
        "Larger stones, or ones that block the flow of urine or cause infection, need treatment",
        "An ultrasound or a scan shows the stone",
      ],
    },
    hi: {
      about: "गुर्दे की पथरी खनिजों से बनी सख्त गांठें हैं जो गुर्दे में बनती हैं। पथरी नीचे की ओर खिसककर बगल या पीठ में अचानक तेज़ दर्द कर सकती है।",
      points: [
        "दर्द लहरों में कमर के बगल से जांघ के जोड़ की ओर आता है, अक्सर मतली के साथ",
        "पेशाब में खून आना आम है",
        "छोटी पथरी अपने आप निकल सकती है",
        "बड़ी पथरी, या ऐसी जो पेशाब का बहाव रोके या संक्रमण करे, उसके इलाज की ज़रूरत होती है",
        "अल्ट्रासाउंड या स्कैन से पथरी दिखती है",
      ],
    },
    pa: {
      about: "ਗੁਰਦੇ ਦੀ ਪੱਥਰੀ ਖਣਿਜਾਂ ਤੋਂ ਬਣੀਆਂ ਸਖ਼ਤ ਗੰਢਾਂ ਹਨ ਜੋ ਗੁਰਦੇ ਵਿੱਚ ਬਣਦੀਆਂ ਹਨ। ਪੱਥਰੀ ਹੇਠਾਂ ਵੱਲ ਖਿਸਕ ਕੇ ਪਾਸੇ ਜਾਂ ਪਿੱਠ ਵਿੱਚ ਅਚਾਨਕ ਤੇਜ਼ ਦਰਦ ਕਰ ਸਕਦੀ ਹੈ।",
      points: [
        "ਦਰਦ ਲਹਿਰਾਂ ਵਿੱਚ ਕਮਰ ਦੇ ਪਾਸੇ ਤੋਂ ਪੱਟ ਦੇ ਜੋੜ ਵੱਲ ਆਉਂਦਾ ਹੈ, ਅਕਸਰ ਜੀ ਕੱਚਾ ਹੋਣ ਨਾਲ",
        "ਪਿਸ਼ਾਬ ਵਿੱਚ ਖੂਨ ਆਉਣਾ ਆਮ ਹੈ",
        "ਛੋਟੀ ਪੱਥਰੀ ਆਪਣੇ ਆਪ ਨਿਕਲ ਸਕਦੀ ਹੈ",
        "ਵੱਡੀ ਪੱਥਰੀ, ਜਾਂ ਅਜਿਹੀ ਜੋ ਪਿਸ਼ਾਬ ਦਾ ਵਹਾਅ ਰੋਕੇ ਜਾਂ ਲਾਗ ਕਰੇ, ਦੇ ਇਲਾਜ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ",
        "ਅਲਟਰਾਸਾਊਂਡ ਜਾਂ ਸਕੈਨ ਨਾਲ ਪੱਥਰੀ ਦਿਖਦੀ ਹੈ",
      ],
    },
  },
  {
    id: 'urinary-infection',
    kind: 'condition',
    phrases: ['urinary tract infection', 'uti', 'urine infection', 'bladder infection', 'urinary infection', 'urine infection in women', 'infection in urine', 'cystitis', 'urinary tract infections', 'utis'],
    en: {
      about: "A urinary tract infection (UTI) is an infection of the bladder or, sometimes, the kidneys. It is more common in women.",
      points: [
        "Common signs: burning when passing urine, passing urine often, and a strong urge to go",
        "Cloudy or smelly urine, and discomfort in the lower belly",
        "Fever, back pain or vomiting can mean the infection has reached the kidneys",
        "A urine test confirms it",
        "It needs a doctor's assessment and the right treatment",
      ],
    },
    hi: {
      about: "मूत्र मार्ग का संक्रमण (यूटीआई) मूत्राशय का, या कभी-कभी गुर्दों का संक्रमण है। यह महिलाओं में ज़्यादा आम है।",
      points: [
        "आम संकेत: पेशाब करते समय जलन, बार-बार पेशाब आना और तेज़ इच्छा होना",
        "धुंधला या बदबूदार पेशाब, और पेट के निचले हिस्से में बेचैनी",
        "बुखार, पीठ दर्द या उल्टी का मतलब हो सकता है कि संक्रमण गुर्दों तक पहुंच गया है",
        "पेशाब की जांच से पुष्टि होती है",
        "इसके लिए डॉक्टर की जांच और सही इलाज चाहिए",
      ],
    },
    pa: {
      about: "ਪਿਸ਼ਾਬ ਮਾਰਗ ਦੀ ਲਾਗ (ਯੂਟੀਆਈ) ਮਸਾਨੇ ਦੀ, ਜਾਂ ਕਈ ਵਾਰ ਗੁਰਦਿਆਂ ਦੀ ਲਾਗ ਹੈ। ਇਹ ਔਰਤਾਂ ਵਿੱਚ ਵੱਧ ਆਮ ਹੈ।",
      points: [
        "ਆਮ ਸੰਕੇਤ: ਪਿਸ਼ਾਬ ਕਰਦੇ ਸਮੇਂ ਜਲਨ, ਵਾਰ-ਵਾਰ ਪਿਸ਼ਾਬ ਆਉਣਾ ਅਤੇ ਤੇਜ਼ ਇੱਛਾ ਹੋਣਾ",
        "ਧੁੰਦਲਾ ਜਾਂ ਬਦਬੂਦਾਰ ਪਿਸ਼ਾਬ, ਅਤੇ ਪੇਟ ਦੇ ਹੇਠਲੇ ਹਿੱਸੇ ਵਿੱਚ ਬੇਚੈਨੀ",
        "ਬੁਖ਼ਾਰ, ਪਿੱਠ ਦਰਦ ਜਾਂ ਉਲਟੀ ਦਾ ਮਤਲਬ ਹੋ ਸਕਦਾ ਹੈ ਕਿ ਲਾਗ ਗੁਰਦਿਆਂ ਤੱਕ ਪਹੁੰਚ ਗਈ ਹੈ",
        "ਪਿਸ਼ਾਬ ਦੀ ਜਾਂਚ ਨਾਲ ਪੁਸ਼ਟੀ ਹੁੰਦੀ ਹੈ",
        "ਇਸ ਲਈ ਡਾਕਟਰ ਦੀ ਜਾਂਚ ਅਤੇ ਸਹੀ ਇਲਾਜ ਚਾਹੀਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'enlarged-prostate',
    kind: 'condition',
    phrases: ['enlarged prostate', 'prostate', 'prostate problem', 'prostate enlargement', 'bph', 'prostate swelling', 'prostate problems', 'benign prostatic hyperplasia', 'prostrate', 'prostate gland'],
    en: {
      about: "The prostate is a small gland below the bladder in men. It often grows larger with age (benign prostatic enlargement) and can make passing urine harder.",
      points: [
        "Common signs: a weak stream, getting up at night to pass urine, passing urine often and feeling the bladder is not empty",
        "It is common in men over fifty",
        "A doctor examines and may ask for a urine test, an ultrasound and a blood test, to check it is nothing else",
        "If ignored it can lead to infections or to not being able to pass urine at all",
        "Treatment ranges from watching and simple measures to surgery",
      ],
    },
    hi: {
      about: "प्रोस्टेट पुरुषों में मूत्राशय के नीचे एक छोटी ग्रंथि है। उम्र के साथ यह अक्सर बढ़ जाती है (सौम्य प्रोस्टेट वृद्धि) और पेशाब करना मुश्किल कर सकती है।",
      points: [
        "आम संकेत: पेशाब की धार कमज़ोर होना, रात में पेशाब के लिए उठना, बार-बार पेशाब आना और मूत्राशय खाली न लगना",
        "पचास से ऊपर के पुरुषों में यह आम है",
        "डॉक्टर जांच करते हैं और पेशाब की जांच, अल्ट्रासाउंड और खून की जांच करवा सकते हैं, यह देखने के लिए कि यह कुछ और तो नहीं",
        "अनदेखा करने पर संक्रमण हो सकता है, या पेशाब बिल्कुल न आना",
        "इलाज निगरानी और आसान उपायों से लेकर ऑपरेशन तक होता है",
      ],
    },
    pa: {
      about: "ਪ੍ਰੋਸਟੇਟ ਮਰਦਾਂ ਵਿੱਚ ਮਸਾਨੇ ਦੇ ਹੇਠਾਂ ਇੱਕ ਛੋਟੀ ਗ੍ਰੰਥੀ ਹੈ। ਉਮਰ ਨਾਲ ਇਹ ਅਕਸਰ ਵਧ ਜਾਂਦੀ ਹੈ (ਸੌਮਯ ਪ੍ਰੋਸਟੇਟ ਵਾਧਾ) ਅਤੇ ਪਿਸ਼ਾਬ ਕਰਨਾ ਔਖਾ ਕਰ ਸਕਦੀ ਹੈ।",
      points: [
        "ਆਮ ਸੰਕੇਤ: ਪਿਸ਼ਾਬ ਦੀ ਧਾਰ ਕਮਜ਼ੋਰ ਹੋਣਾ, ਰਾਤ ਨੂੰ ਪਿਸ਼ਾਬ ਲਈ ਉੱਠਣਾ, ਵਾਰ-ਵਾਰ ਪਿਸ਼ਾਬ ਆਉਣਾ ਅਤੇ ਮਸਾਨਾ ਖਾਲੀ ਨਾ ਲੱਗਣਾ",
        "ਪੰਜਾਹ ਤੋਂ ਉੱਪਰ ਦੇ ਮਰਦਾਂ ਵਿੱਚ ਇਹ ਆਮ ਹੈ",
        "ਡਾਕਟਰ ਜਾਂਚ ਕਰਦੇ ਹਨ ਅਤੇ ਪਿਸ਼ਾਬ ਦੀ ਜਾਂਚ, ਅਲਟਰਾਸਾਊਂਡ ਅਤੇ ਖੂਨ ਦੀ ਜਾਂਚ ਕਰਵਾ ਸਕਦੇ ਹਨ, ਇਹ ਦੇਖਣ ਲਈ ਕਿ ਇਹ ਕੁਝ ਹੋਰ ਤਾਂ ਨਹੀਂ",
        "ਅਣਗੌਲਿਆ ਕਰਨ ’ਤੇ ਲਾਗ ਹੋ ਸਕਦੀ ਹੈ, ਜਾਂ ਪਿਸ਼ਾਬ ਬਿਲਕੁਲ ਨਾ ਆਉਣਾ",
        "ਇਲਾਜ ਨਿਗਰਾਨੀ ਅਤੇ ਆਸਾਨ ਉਪਾਵਾਂ ਤੋਂ ਲੈ ਕੇ ਆਪ੍ਰੇਸ਼ਨ ਤੱਕ ਹੁੰਦਾ ਹੈ",
      ],
    },
  },
]
