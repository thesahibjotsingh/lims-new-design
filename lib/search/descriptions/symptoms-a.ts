// lib/search/descriptions/symptoms-a.ts
//
// Overviews of general and stomach complaints. DRAFT: not yet reviewed by a LIMS doctor (see types.ts). Hindi and
// Punjabi are drafts of the English. No medicine, dose, home remedy or cure appears in any of them.

import type { DescriptionEntry } from '@/lib/search/descriptions/types'

export const SYMPTOMS_A: DescriptionEntry[] = [
  {
    id: 'fever',
    kind: 'symptom',
    phrases: ['fever', 'high fever', 'temperature', 'viral fever', 'body temperature'],
    en: {
      about: "Fever is a rise in body temperature above normal. It is most often a sign that the body is fighting an infection.",
      points: [
        "Viral infections such as flu or a common cold",
        "Bacterial infections of the throat, chest, urine or stomach",
        "Infections spread by mosquitoes, or by contaminated food and water",
        "Inflammation from other causes, which a doctor can help to find",
      ],
    },
    hi: {
      about: "बुखार में शरीर का तापमान सामान्य से ऊपर चला जाता है। यह अक्सर इस बात का संकेत होता है कि शरीर किसी संक्रमण से लड़ रहा है।",
      points: [
        "फ्लू या सामान्य सर्दी-ज़ुकाम जैसे वायरल संक्रमण",
        "गले, छाती, पेशाब या पेट के बैक्टीरियल संक्रमण",
        "मच्छरों से, या दूषित खाने-पानी से फैलने वाले संक्रमण",
        "संक्रमण के अलावा सूजन जैसे दूसरे कारण, जिन्हें डॉक्टर पहचानने में मदद कर सकते हैं",
      ],
    },
    pa: {
      about: "ਬੁਖ਼ਾਰ ਵਿੱਚ ਸਰੀਰ ਦਾ ਤਾਪਮਾਨ ਆਮ ਨਾਲੋਂ ਵੱਧ ਜਾਂਦਾ ਹੈ। ਇਹ ਅਕਸਰ ਇਸ ਗੱਲ ਦਾ ਸੰਕੇਤ ਹੁੰਦਾ ਹੈ ਕਿ ਸਰੀਰ ਕਿਸੇ ਲਾਗ ਨਾਲ ਲੜ ਰਿਹਾ ਹੈ।",
      points: [
        "ਫਲੂ ਜਾਂ ਆਮ ਜ਼ੁਕਾਮ ਵਰਗੀਆਂ ਵਾਇਰਲ ਲਾਗਾਂ",
        "ਗਲੇ, ਛਾਤੀ, ਪਿਸ਼ਾਬ ਜਾਂ ਪੇਟ ਦੀਆਂ ਬੈਕਟੀਰੀਆ ਵਾਲੀਆਂ ਲਾਗਾਂ",
        "ਮੱਛਰਾਂ ਜਾਂ ਦੂਸ਼ਿਤ ਖਾਣੇ-ਪਾਣੀ ਨਾਲ ਫੈਲਣ ਵਾਲੀਆਂ ਲਾਗਾਂ",
        "ਲਾਗ ਤੋਂ ਇਲਾਵਾ ਸੋਜ ਵਰਗੇ ਹੋਰ ਕਾਰਨ, ਜਿਨ੍ਹਾਂ ਨੂੰ ਡਾਕਟਰ ਪਛਾਣਨ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦੇ ਹਨ",
      ],
    },
  },
  {
    id: 'cough',
    kind: 'symptom',
    phrases: ['cough', 'dry cough', 'cough with phlegm', 'wet cough', 'persistent cough', 'coughing'],
    en: {
      about: "A cough is the body's way of clearing the airways of mucus, irritants or germs. It can be dry or bring up phlegm.",
      points: [
        "A cold or other viral infection of the nose and throat",
        "Allergies, dust or smoke irritating the airways",
        "Asthma or a chest infection",
        "Acid coming back up from the stomach",
      ],
    },
    hi: {
      about: "खांसी शरीर का सांस की नलियों से बलगम, धूल या कीटाणुओं को बाहर निकालने का तरीका है। यह सूखी हो सकती है या बलगम के साथ आ सकती है।",
      points: [
        "सर्दी-ज़ुकाम या नाक-गले का कोई और वायरल संक्रमण",
        "एलर्जी, धूल या धुआं जो सांस की नलियों में जलन करे",
        "अस्थमा या छाती का संक्रमण",
        "पेट का अम्ल वापस ऊपर आना",
      ],
    },
    pa: {
      about: "ਖੰਘ ਸਰੀਰ ਦਾ ਸਾਹ ਦੀਆਂ ਨਲੀਆਂ ਵਿੱਚੋਂ ਬਲਗਮ, ਧੂੜ ਜਾਂ ਕੀਟਾਣੂਆਂ ਨੂੰ ਬਾਹਰ ਕੱਢਣ ਦਾ ਤਰੀਕਾ ਹੈ। ਇਹ ਸੁੱਕੀ ਹੋ ਸਕਦੀ ਹੈ ਜਾਂ ਬਲਗਮ ਨਾਲ ਆ ਸਕਦੀ ਹੈ।",
      points: [
        "ਜ਼ੁਕਾਮ ਜਾਂ ਨੱਕ-ਗਲੇ ਦੀ ਕੋਈ ਹੋਰ ਵਾਇਰਲ ਲਾਗ",
        "ਐਲਰਜੀ, ਧੂੜ ਜਾਂ ਧੂੰਆਂ ਜੋ ਸਾਹ ਦੀਆਂ ਨਲੀਆਂ ਵਿੱਚ ਜਲਨ ਕਰੇ",
        "ਦਮਾ ਜਾਂ ਛਾਤੀ ਦੀ ਲਾਗ",
        "ਪੇਟ ਦਾ ਤੇਜ਼ਾਬ ਵਾਪਸ ਉੱਪਰ ਆਉਣਾ",
      ],
    },
  },
  {
    id: 'cold-and-cough',
    kind: 'symptom',
    phrases: ['cold and cough', 'cough and cold', 'cold cough', 'common cold', 'cold'],
    en: {
      about: "A common cold is a mild viral infection of the nose and throat. It usually brings a runny or blocked nose, sneezing and a cough.",
      points: [
        "Spread by droplets in the air and by touching shared surfaces",
        "Often settles within a week or so",
        "Allergies can look like a cold and last longer",
        "Colds in babies, older people and people with chest problems need more care",
      ],
    },
    hi: {
      about: "सर्दी-ज़ुकाम नाक और गले का एक हल्का वायरल संक्रमण है। इसमें आम तौर पर नाक बहना या बंद होना, छींकें और खांसी होती है।",
      points: [
        "हवा में मौजूद बूंदों से और साझा चीज़ों को छूने से फैलता है",
        "अक्सर एक हफ्ते के आसपास ठीक हो जाता है",
        "एलर्जी भी सर्दी जैसी लग सकती है और ज़्यादा समय तक रह सकती है",
        "छोटे बच्चों, बुज़ुर्गों और छाती की समस्या वाले लोगों में ज़्यादा ध्यान की ज़रूरत होती है",
      ],
    },
    pa: {
      about: "ਜ਼ੁਕਾਮ ਨੱਕ ਅਤੇ ਗਲੇ ਦੀ ਇੱਕ ਹਲਕੀ ਵਾਇਰਲ ਲਾਗ ਹੈ। ਇਸ ਵਿੱਚ ਆਮ ਤੌਰ ’ਤੇ ਨੱਕ ਵਗਣਾ ਜਾਂ ਬੰਦ ਹੋਣਾ, ਛਿੱਕਾਂ ਅਤੇ ਖੰਘ ਹੁੰਦੀ ਹੈ।",
      points: [
        "ਹਵਾ ਵਿੱਚ ਮੌਜੂਦ ਬੂੰਦਾਂ ਨਾਲ ਅਤੇ ਸਾਂਝੀਆਂ ਚੀਜ਼ਾਂ ਨੂੰ ਛੂਹਣ ਨਾਲ ਫੈਲਦਾ ਹੈ",
        "ਅਕਸਰ ਇੱਕ ਹਫ਼ਤੇ ਦੇ ਲਗਭਗ ਠੀਕ ਹੋ ਜਾਂਦਾ ਹੈ",
        "ਐਲਰਜੀ ਵੀ ਜ਼ੁਕਾਮ ਵਰਗੀ ਲੱਗ ਸਕਦੀ ਹੈ ਅਤੇ ਜ਼ਿਆਦਾ ਸਮਾਂ ਰਹਿ ਸਕਦੀ ਹੈ",
        "ਛੋਟੇ ਬੱਚਿਆਂ, ਬਜ਼ੁਰਗਾਂ ਅਤੇ ਛਾਤੀ ਦੀ ਸਮੱਸਿਆ ਵਾਲੇ ਲੋਕਾਂ ਵਿੱਚ ਵੱਧ ਧਿਆਨ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ",
      ],
    },
  },
  {
    id: 'sore-throat',
    kind: 'symptom',
    phrases: ['sore throat', 'throat pain', 'throat infection', 'pain in throat', 'itchy throat', 'dry throat'],
    en: {
      about: "A sore throat is pain, scratchiness or irritation of the throat, often worse when swallowing.",
      points: [
        "Viral infections, including the common cold and flu",
        "Bacterial infections such as strep throat or infected tonsils",
        "Allergies, dry air or smoke",
        "Acid coming back up from the stomach",
      ],
    },
    hi: {
      about: "गले में खराश का मतलब है गले में दर्द, खरोंच या जलन, जो निगलते समय अक्सर ज़्यादा महसूस होती है।",
      points: [
        "सामान्य सर्दी और फ्लू सहित वायरल संक्रमण",
        "बैक्टीरियल संक्रमण, जैसे स्ट्रेप थ्रोट या टॉन्सिल का संक्रमण",
        "एलर्जी, सूखी हवा या धुआं",
        "पेट का अम्ल वापस ऊपर आना",
      ],
    },
    pa: {
      about: "ਗਲੇ ਦੀ ਖ਼ਰਾਸ਼ ਦਾ ਮਤਲਬ ਹੈ ਗਲੇ ਵਿੱਚ ਦਰਦ, ਖਰੋਚ ਜਾਂ ਜਲਨ, ਜੋ ਨਿਗਲਣ ਵੇਲੇ ਅਕਸਰ ਵੱਧ ਮਹਿਸੂਸ ਹੁੰਦੀ ਹੈ।",
      points: [
        "ਆਮ ਜ਼ੁਕਾਮ ਅਤੇ ਫਲੂ ਸਮੇਤ ਵਾਇਰਲ ਲਾਗਾਂ",
        "ਬੈਕਟੀਰੀਆ ਵਾਲੀਆਂ ਲਾਗਾਂ, ਜਿਵੇਂ ਸਟ੍ਰੈਪ ਥ੍ਰੋਟ ਜਾਂ ਟੌਨਸਿਲ ਦੀ ਲਾਗ",
        "ਐਲਰਜੀ, ਸੁੱਕੀ ਹਵਾ ਜਾਂ ਧੂੰਆਂ",
        "ਪੇਟ ਦਾ ਤੇਜ਼ਾਬ ਵਾਪਸ ਉੱਪਰ ਆਉਣਾ",
      ],
    },
  },
  {
    id: 'runny-nose',
    kind: 'symptom',
    phrases: ['runny nose', 'running nose', 'nose running', 'watery nose', 'sneezing'],
    en: {
      about: "A runny nose is extra mucus or watery fluid coming from the nose. It is often with sneezing.",
      points: [
        "A cold or flu",
        "Allergies to dust, pollen or animals",
        "Sinus infection",
        "Changes in weather or dry, cold air",
      ],
    },
    hi: {
      about: "नाक बहने में नाक से ज़्यादा बलगम या पानी जैसा तरल निकलता है। इसके साथ अक्सर छींकें भी आती हैं।",
      points: [
        "सर्दी या फ्लू",
        "धूल, पराग या जानवरों से एलर्जी",
        "साइनस का संक्रमण",
        "मौसम में बदलाव या सूखी, ठंडी हवा",
      ],
    },
    pa: {
      about: "ਨੱਕ ਵਗਣ ਵਿੱਚ ਨੱਕ ਵਿੱਚੋਂ ਵਾਧੂ ਬਲਗਮ ਜਾਂ ਪਾਣੀ ਵਰਗਾ ਤਰਲ ਨਿਕਲਦਾ ਹੈ। ਇਸ ਦੇ ਨਾਲ ਅਕਸਰ ਛਿੱਕਾਂ ਵੀ ਆਉਂਦੀਆਂ ਹਨ।",
      points: [
        "ਜ਼ੁਕਾਮ ਜਾਂ ਫਲੂ",
        "ਧੂੜ, ਪਰਾਗ ਜਾਂ ਜਾਨਵਰਾਂ ਤੋਂ ਐਲਰਜੀ",
        "ਸਾਈਨਸ ਦੀ ਲਾਗ",
        "ਮੌਸਮ ਵਿੱਚ ਬਦਲਾਅ ਜਾਂ ਸੁੱਕੀ, ਠੰਢੀ ਹਵਾ",
      ],
    },
  },
  {
    id: 'blocked-nose',
    kind: 'symptom',
    phrases: ['blocked nose', 'stuffy nose', 'nasal congestion', 'nose block', 'nose blocked', 'congestion', 'nasal blockage'],
    en: {
      about: "A blocked nose means swelling or mucus is making it hard to breathe through the nose.",
      points: [
        "A cold, flu or sinus infection",
        "Allergies",
        "A bend in the wall between the nostrils, or growths inside the nose",
        "Dry or polluted air",
      ],
    },
    hi: {
      about: "नाक बंद होने का मतलब है कि सूजन या बलगम के कारण नाक से सांस लेना मुश्किल हो रहा है।",
      points: [
        "सर्दी, फ्लू या साइनस का संक्रमण",
        "एलर्जी",
        "दोनों नथुनों के बीच की दीवार का टेढ़ा होना, या नाक के अंदर गांठें",
        "सूखी या प्रदूषित हवा",
      ],
    },
    pa: {
      about: "ਨੱਕ ਬੰਦ ਹੋਣ ਦਾ ਮਤਲਬ ਹੈ ਕਿ ਸੋਜ ਜਾਂ ਬਲਗਮ ਕਾਰਨ ਨੱਕ ਰਾਹੀਂ ਸਾਹ ਲੈਣਾ ਔਖਾ ਹੋ ਰਿਹਾ ਹੈ।",
      points: [
        "ਜ਼ੁਕਾਮ, ਫਲੂ ਜਾਂ ਸਾਈਨਸ ਦੀ ਲਾਗ",
        "ਐਲਰਜੀ",
        "ਦੋਵਾਂ ਨਾਸਾਂ ਵਿਚਕਾਰਲੀ ਕੰਧ ਦਾ ਟੇਢਾ ਹੋਣਾ, ਜਾਂ ਨੱਕ ਦੇ ਅੰਦਰ ਗੰਢਾਂ",
        "ਸੁੱਕੀ ਜਾਂ ਪ੍ਰਦੂਸ਼ਿਤ ਹਵਾ",
      ],
    },
  },
  {
    id: 'headache',
    kind: 'symptom',
    phrases: ['headache', 'head pain', 'pain in head', 'head ache', 'severe headache', 'one sided headache'],
    en: {
      about: "A headache is pain in the head or face. Most are not caused by a serious illness, but how they feel and how often they come can say a lot.",
      points: [
        "Tension from stress, poor sleep, long screen time or skipped meals",
        "Migraine, often one-sided and with nausea or sensitivity to light",
        "Sinus problems, eye strain or neck stiffness",
        "Fever and infections",
      ],
    },
    hi: {
      about: "सिरदर्द सिर या चेहरे में होने वाला दर्द है। ज़्यादातर सिरदर्द किसी गंभीर बीमारी की वजह से नहीं होते, लेकिन दर्द कैसा है और कितनी बार होता है, इससे काफ़ी कुछ पता चलता है।",
      points: [
        "तनाव, कम नींद, लंबे समय तक स्क्रीन या खाना छोड़ने से होने वाला दर्द",
        "माइग्रेन, जो अक्सर एक तरफ़ होता है और उल्टी जैसा मन या रोशनी से परेशानी के साथ आता है",
        "साइनस की समस्या, आंखों पर ज़ोर या गर्दन की अकड़न",
        "बुखार और संक्रमण",
      ],
    },
    pa: {
      about: "ਸਿਰ ਦਰਦ ਸਿਰ ਜਾਂ ਚਿਹਰੇ ਵਿੱਚ ਹੋਣ ਵਾਲਾ ਦਰਦ ਹੈ। ਜ਼ਿਆਦਾਤਰ ਸਿਰ ਦਰਦ ਕਿਸੇ ਗੰਭੀਰ ਬਿਮਾਰੀ ਕਰਕੇ ਨਹੀਂ ਹੁੰਦੇ, ਪਰ ਦਰਦ ਕਿਹੋ ਜਿਹਾ ਹੈ ਅਤੇ ਕਿੰਨੀ ਵਾਰ ਹੁੰਦਾ ਹੈ, ਇਸ ਤੋਂ ਕਾਫ਼ੀ ਕੁਝ ਪਤਾ ਲੱਗਦਾ ਹੈ।",
      points: [
        "ਤਣਾਅ, ਘੱਟ ਨੀਂਦ, ਲੰਮੇ ਸਮੇਂ ਤੱਕ ਸਕ੍ਰੀਨ ਜਾਂ ਖਾਣਾ ਛੱਡਣ ਨਾਲ ਹੋਣ ਵਾਲਾ ਦਰਦ",
        "ਮਾਈਗ੍ਰੇਨ, ਜੋ ਅਕਸਰ ਇੱਕ ਪਾਸੇ ਹੁੰਦਾ ਹੈ ਅਤੇ ਜੀ ਕੱਚਾ ਹੋਣ ਜਾਂ ਰੌਸ਼ਨੀ ਤੋਂ ਪਰੇਸ਼ਾਨੀ ਨਾਲ ਆਉਂਦਾ ਹੈ",
        "ਸਾਈਨਸ ਦੀ ਸਮੱਸਿਆ, ਅੱਖਾਂ ’ਤੇ ਜ਼ੋਰ ਜਾਂ ਗਰਦਨ ਦੀ ਅਕੜਾਅ",
        "ਬੁਖ਼ਾਰ ਅਤੇ ਲਾਗਾਂ",
      ],
    },
  },
  {
    id: 'dizziness',
    kind: 'symptom',
    phrases: ['dizziness', 'giddiness', 'dizzy', 'light headed', 'lightheaded', 'feeling dizzy', 'spinning'],
    en: {
      about: "Dizziness is a feeling of being light-headed, unsteady or as if the room is spinning.",
      points: [
        "Low blood pressure, dehydration or not eating enough",
        "Inner-ear problems that affect balance",
        "Anaemia",
        "Standing up too quickly, or side effects of some treatments",
      ],
    },
    hi: {
      about: "चक्कर आने का मतलब है सिर हल्का लगना, संतुलन बिगड़ना या ऐसा लगना जैसे कमरा घूम रहा हो।",
      points: [
        "कम ब्लड प्रेशर, पानी की कमी या कम खाना",
        "कान के अंदर की समस्याएं जो संतुलन को प्रभावित करती हैं",
        "खून की कमी (एनीमिया)",
        "बहुत जल्दी खड़े होना, या कुछ इलाज के दुष्प्रभाव",
      ],
    },
    pa: {
      about: "ਚੱਕਰ ਆਉਣ ਦਾ ਮਤਲਬ ਹੈ ਸਿਰ ਹਲਕਾ ਲੱਗਣਾ, ਸੰਤੁਲਨ ਵਿਗੜਨਾ ਜਾਂ ਇਹ ਮਹਿਸੂਸ ਹੋਣਾ ਕਿ ਕਮਰਾ ਘੁੰਮ ਰਿਹਾ ਹੈ।",
      points: [
        "ਘੱਟ ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ, ਪਾਣੀ ਦੀ ਕਮੀ ਜਾਂ ਘੱਟ ਖਾਣਾ",
        "ਕੰਨ ਦੇ ਅੰਦਰ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ ਜੋ ਸੰਤੁਲਨ ਨੂੰ ਪ੍ਰਭਾਵਿਤ ਕਰਦੀਆਂ ਹਨ",
        "ਖੂਨ ਦੀ ਕਮੀ (ਅਨੀਮੀਆ)",
        "ਬਹੁਤ ਜਲਦੀ ਖੜ੍ਹੇ ਹੋਣਾ, ਜਾਂ ਕੁਝ ਇਲਾਜਾਂ ਦੇ ਮਾੜੇ ਪ੍ਰਭਾਵ",
      ],
    },
  },
  {
    id: 'tiredness',
    kind: 'symptom',
    phrases: ['tiredness', 'fatigue', 'weakness', 'tired', 'feeling weak', 'always tired', 'low energy', 'body weakness', 'lethargy'],
    en: {
      about: "Tiredness or weakness is a lack of energy that rest does not fully fix. It is a common complaint with many possible reasons.",
      points: [
        "Poor sleep, stress or long working hours",
        "Anaemia or low iron",
        "Thyroid problems or diabetes",
        "Infections, including a recent illness",
        "Not eating or drinking enough",
      ],
    },
    hi: {
      about: "थकान या कमज़ोरी का मतलब है ऐसी ऊर्जा की कमी जो आराम करने से पूरी तरह ठीक नहीं होती। यह एक आम शिकायत है जिसके कई कारण हो सकते हैं।",
      points: [
        "कम नींद, तनाव या लंबे काम के घंटे",
        "खून की कमी या आयरन की कमी",
        "थायराइड की समस्या या डायबिटीज़",
        "संक्रमण, जिसमें हाल की कोई बीमारी भी शामिल है",
        "कम खाना या कम पानी पीना",
      ],
    },
    pa: {
      about: "ਥਕਾਵਟ ਜਾਂ ਕਮਜ਼ੋਰੀ ਦਾ ਮਤਲਬ ਹੈ ਊਰਜਾ ਦੀ ਅਜਿਹੀ ਕਮੀ ਜੋ ਆਰਾਮ ਕਰਨ ਨਾਲ ਪੂਰੀ ਤਰ੍ਹਾਂ ਠੀਕ ਨਹੀਂ ਹੁੰਦੀ। ਇਹ ਇੱਕ ਆਮ ਸ਼ਿਕਾਇਤ ਹੈ ਜਿਸ ਦੇ ਕਈ ਕਾਰਨ ਹੋ ਸਕਦੇ ਹਨ।",
      points: [
        "ਘੱਟ ਨੀਂਦ, ਤਣਾਅ ਜਾਂ ਲੰਮੇ ਕੰਮ ਦੇ ਘੰਟੇ",
        "ਖੂਨ ਦੀ ਕਮੀ ਜਾਂ ਆਇਰਨ ਦੀ ਕਮੀ",
        "ਥਾਇਰਾਇਡ ਦੀ ਸਮੱਸਿਆ ਜਾਂ ਸ਼ੂਗਰ",
        "ਲਾਗ, ਜਿਸ ਵਿੱਚ ਹਾਲ ਦੀ ਕੋਈ ਬਿਮਾਰੀ ਵੀ ਸ਼ਾਮਲ ਹੈ",
        "ਘੱਟ ਖਾਣਾ ਜਾਂ ਘੱਟ ਪਾਣੀ ਪੀਣਾ",
      ],
    },
  },
  {
    id: 'nausea',
    kind: 'symptom',
    phrases: ['nausea', 'feeling sick', 'feeling nauseous', 'nauseous', 'queasy', 'ji machlana', 'jee machlana', 'जी मिचलाना', 'ਜੀ ਕੱਚਾ ਹੋਣਾ', 'mitli'],
    en: {
      about: "Nausea is the uneasy feeling in the stomach that comes before wanting to vomit.",
      points: [
        "Stomach infections or food that did not agree with you",
        "Acid reflux or gastritis",
        "Migraine, motion sickness or inner-ear problems",
        "Pregnancy, especially in the early months",
        "Strong smells, stress or an empty stomach",
      ],
    },
    hi: {
      about: "मतली पेट में होने वाली वह बेचैनी है जो उल्टी से पहले महसूस होती है।",
      points: [
        "पेट का संक्रमण या ऐसा खाना जो पच न पाए",
        "एसिड रिफ्लक्स या गैस्ट्राइटिस",
        "माइग्रेन, सफ़र में जी मिचलाना या कान के अंदर की समस्या",
        "गर्भावस्था, खासकर शुरुआती महीनों में",
        "तेज़ गंध, तनाव या खाली पेट",
      ],
    },
    pa: {
      about: "ਜੀ ਕੱਚਾ ਹੋਣਾ ਪੇਟ ਵਿੱਚ ਹੋਣ ਵਾਲੀ ਉਹ ਬੇਚੈਨੀ ਹੈ ਜੋ ਉਲਟੀ ਤੋਂ ਪਹਿਲਾਂ ਮਹਿਸੂਸ ਹੁੰਦੀ ਹੈ।",
      points: [
        "ਪੇਟ ਦੀ ਲਾਗ ਜਾਂ ਅਜਿਹਾ ਖਾਣਾ ਜੋ ਹਜ਼ਮ ਨਾ ਹੋਵੇ",
        "ਐਸਿਡ ਰਿਫਲਕਸ ਜਾਂ ਗੈਸਟ੍ਰਾਈਟਿਸ",
        "ਮਾਈਗ੍ਰੇਨ, ਸਫ਼ਰ ਵਿੱਚ ਜੀ ਕੱਚਾ ਹੋਣਾ ਜਾਂ ਕੰਨ ਦੇ ਅੰਦਰ ਦੀ ਸਮੱਸਿਆ",
        "ਗਰਭ ਅਵਸਥਾ, ਖ਼ਾਸ ਕਰਕੇ ਸ਼ੁਰੂ ਦੇ ਮਹੀਨਿਆਂ ਵਿੱਚ",
        "ਤੇਜ਼ ਬਦਬੂ, ਤਣਾਅ ਜਾਂ ਖਾਲੀ ਪੇਟ",
      ],
    },
  },
  {
    id: 'vomiting',
    kind: 'symptom',
    phrases: ['vomiting', 'vomit', 'throwing up', 'puking', 'repeated vomiting', 'ulti', 'ulti aana', 'उल्टी', 'ਉਲਟੀ', 'ulti hona'],
    en: {
      about: "Vomiting is the forceful emptying of the stomach through the mouth. The main concern, especially in children, is losing too much fluid.",
      points: [
        "Stomach infections or food poisoning",
        "Acid reflux, gastritis or an ulcer",
        "Migraine or motion sickness",
        "Pregnancy, or a blockage in the digestive tract",
      ],
    },
    hi: {
      about: "उल्टी में पेट की चीज़ें ज़ोर से मुंह के रास्ते बाहर आती हैं। मुख्य चिंता, खासकर बच्चों में, शरीर से बहुत ज़्यादा पानी निकल जाने की होती है।",
      points: [
        "पेट का संक्रमण या फ़ूड पॉइज़निंग",
        "एसिड रिफ्लक्स, गैस्ट्राइटिस या अल्सर",
        "माइग्रेन या सफ़र में जी मिचलाना",
        "गर्भावस्था, या पाचन नली में रुकावट",
      ],
    },
    pa: {
      about: "ਉਲਟੀ ਵਿੱਚ ਪੇਟ ਦੀਆਂ ਚੀਜ਼ਾਂ ਜ਼ੋਰ ਨਾਲ ਮੂੰਹ ਰਾਹੀਂ ਬਾਹਰ ਆਉਂਦੀਆਂ ਹਨ। ਮੁੱਖ ਚਿੰਤਾ, ਖ਼ਾਸ ਕਰਕੇ ਬੱਚਿਆਂ ਵਿੱਚ, ਸਰੀਰ ਵਿੱਚੋਂ ਬਹੁਤ ਜ਼ਿਆਦਾ ਪਾਣੀ ਨਿਕਲ ਜਾਣ ਦੀ ਹੁੰਦੀ ਹੈ।",
      points: [
        "ਪੇਟ ਦੀ ਲਾਗ ਜਾਂ ਫੂਡ ਪੌਇਜ਼ਨਿੰਗ",
        "ਐਸਿਡ ਰਿਫਲਕਸ, ਗੈਸਟ੍ਰਾਈਟਿਸ ਜਾਂ ਅਲਸਰ",
        "ਮਾਈਗ੍ਰੇਨ ਜਾਂ ਸਫ਼ਰ ਵਿੱਚ ਜੀ ਕੱਚਾ ਹੋਣਾ",
        "ਗਰਭ ਅਵਸਥਾ, ਜਾਂ ਪਾਚਨ ਨਲੀ ਵਿੱਚ ਰੁਕਾਵਟ",
      ],
    },
  },
  {
    id: 'diarrhea',
    kind: 'symptom',
    phrases: ['diarrhea', 'diarrhoea', 'loose motions', 'loose stools', 'watery stools', 'loose motion', 'dysentery'],
    en: {
      about: "Diarrhoea means passing loose or watery stools more often than usual. The main concern is losing too much water and salts from the body.",
      points: [
        "Infections from contaminated food or water",
        "A viral stomach bug",
        "Food that did not agree with you",
        "Long-term bowel conditions, if it keeps coming back",
      ],
    },
    hi: {
      about: "दस्त में सामान्य से ज़्यादा बार पतला या पानी जैसा मल आता है। मुख्य चिंता शरीर से बहुत ज़्यादा पानी और नमक निकल जाने की होती है।",
      points: [
        "दूषित खाने या पानी से होने वाले संक्रमण",
        "पेट का वायरल संक्रमण",
        "ऐसा खाना जो पच न पाए",
        "आंतों की लंबी बीमारियां, अगर यह बार-बार लौटे",
      ],
    },
    pa: {
      about: "ਦਸਤ ਵਿੱਚ ਆਮ ਨਾਲੋਂ ਵੱਧ ਵਾਰ ਪਤਲਾ ਜਾਂ ਪਾਣੀ ਵਰਗਾ ਮਲ ਆਉਂਦਾ ਹੈ। ਮੁੱਖ ਚਿੰਤਾ ਸਰੀਰ ਵਿੱਚੋਂ ਬਹੁਤ ਜ਼ਿਆਦਾ ਪਾਣੀ ਅਤੇ ਲੂਣ ਨਿਕਲ ਜਾਣ ਦੀ ਹੁੰਦੀ ਹੈ।",
      points: [
        "ਦੂਸ਼ਿਤ ਖਾਣੇ ਜਾਂ ਪਾਣੀ ਤੋਂ ਹੋਣ ਵਾਲੀਆਂ ਲਾਗਾਂ",
        "ਪੇਟ ਦੀ ਵਾਇਰਲ ਲਾਗ",
        "ਅਜਿਹਾ ਖਾਣਾ ਜੋ ਹਜ਼ਮ ਨਾ ਹੋਵੇ",
        "ਆਂਦਰਾਂ ਦੀਆਂ ਲੰਮੇ ਸਮੇਂ ਦੀਆਂ ਬਿਮਾਰੀਆਂ, ਜੇ ਇਹ ਵਾਰ-ਵਾਰ ਮੁੜ ਆਵੇ",
      ],
    },
  },
  {
    id: 'constipation',
    kind: 'symptom',
    phrases: ['constipation', 'hard stools', 'difficulty passing stool', 'not passing stool', 'cannot pass stool'],
    en: {
      about: "Constipation means passing stool less often than usual, or stool that is hard and difficult to pass.",
      points: [
        "Too little fibre or too little water in the diet",
        "Little physical activity",
        "Ignoring the urge to go",
        "Piles or a small tear near the anus that makes passing stool painful",
        "Some long-term conditions and some treatments",
      ],
    },
    hi: {
      about: "कब्ज़ का मतलब है सामान्य से कम बार मल आना, या मल का सख्त होना और मुश्किल से निकलना।",
      points: [
        "खाने में रेशे (फाइबर) या पानी की कमी",
        "शारीरिक गतिविधि कम होना",
        "शौच की इच्छा को टालना",
        "बवासीर या गुदा के पास छोटी दरार जिससे मल त्यागना दर्दनाक हो जाए",
        "कुछ लंबी बीमारियां और कुछ इलाज",
      ],
    },
    pa: {
      about: "ਕਬਜ਼ ਦਾ ਮਤਲਬ ਹੈ ਆਮ ਨਾਲੋਂ ਘੱਟ ਵਾਰ ਮਲ ਆਉਣਾ, ਜਾਂ ਮਲ ਦਾ ਸਖ਼ਤ ਹੋਣਾ ਅਤੇ ਮੁਸ਼ਕਿਲ ਨਾਲ ਨਿਕਲਣਾ।",
      points: [
        "ਖਾਣੇ ਵਿੱਚ ਰੇਸ਼ੇ (ਫਾਈਬਰ) ਜਾਂ ਪਾਣੀ ਦੀ ਕਮੀ",
        "ਸਰੀਰਕ ਗਤੀਵਿਧੀ ਘੱਟ ਹੋਣਾ",
        "ਟੱਟੀ ਦੀ ਇੱਛਾ ਨੂੰ ਟਾਲਣਾ",
        "ਬਵਾਸੀਰ ਜਾਂ ਗੁਦਾ ਦੇ ਨੇੜੇ ਛੋਟੀ ਦਰਾੜ ਜਿਸ ਨਾਲ ਮਲ ਤਿਆਗਣਾ ਦਰਦਨਾਕ ਹੋ ਜਾਵੇ",
        "ਕੁਝ ਲੰਮੇ ਸਮੇਂ ਦੀਆਂ ਬਿਮਾਰੀਆਂ ਅਤੇ ਕੁਝ ਇਲਾਜ",
      ],
    },
  },
  {
    id: 'acidity',
    kind: 'symptom',
    phrases: ['acidity', 'acid reflux', 'heartburn', 'gerd', 'burning in chest after eating', 'sour belching'],
    en: {
      about: "Acidity, or acid reflux, is stomach acid coming back up towards the food pipe. It causes a burning feeling behind the breastbone and a sour taste.",
      points: [
        "Large or late meals, and lying down soon after eating",
        "Spicy, oily or fried food, and some drinks",
        "Smoking and extra weight",
        "Gastritis or an ulcer",
      ],
    },
    hi: {
      about: "एसिडिटी या एसिड रिफ्लक्स में पेट का अम्ल खाने की नली की तरफ़ वापस ऊपर आता है। इससे छाती की हड्डी के पीछे जलन और मुंह में खट्टा स्वाद आता है।",
      points: [
        "बहुत ज़्यादा या देर से खाना, और खाने के तुरंत बाद लेट जाना",
        "मसालेदार, तैलीय या तला हुआ खाना, और कुछ पेय",
        "धूम्रपान और बढ़ा हुआ वज़न",
        "गैस्ट्राइटिस या अल्सर",
      ],
    },
    pa: {
      about: "ਐਸਿਡਿਟੀ ਜਾਂ ਐਸਿਡ ਰਿਫਲਕਸ ਵਿੱਚ ਪੇਟ ਦਾ ਤੇਜ਼ਾਬ ਖਾਣੇ ਦੀ ਨਲੀ ਵੱਲ ਵਾਪਸ ਉੱਪਰ ਆਉਂਦਾ ਹੈ। ਇਸ ਨਾਲ ਛਾਤੀ ਦੀ ਹੱਡੀ ਪਿੱਛੇ ਜਲਨ ਅਤੇ ਮੂੰਹ ਵਿੱਚ ਖੱਟਾ ਸੁਆਦ ਆਉਂਦਾ ਹੈ।",
      points: [
        "ਬਹੁਤ ਜ਼ਿਆਦਾ ਜਾਂ ਦੇਰ ਨਾਲ ਖਾਣਾ, ਅਤੇ ਖਾਣ ਤੋਂ ਤੁਰੰਤ ਬਾਅਦ ਲੇਟ ਜਾਣਾ",
        "ਮਸਾਲੇਦਾਰ, ਤੇਲ ਵਾਲਾ ਜਾਂ ਤਲਿਆ ਹੋਇਆ ਖਾਣਾ, ਅਤੇ ਕੁਝ ਪੀਣ ਵਾਲੀਆਂ ਚੀਜ਼ਾਂ",
        "ਸਿਗਰਟਨੋਸ਼ੀ ਅਤੇ ਵਧਿਆ ਹੋਇਆ ਭਾਰ",
        "ਗੈਸਟ੍ਰਾਈਟਿਸ ਜਾਂ ਅਲਸਰ",
      ],
    },
  },
  {
    id: 'bloating',
    kind: 'symptom',
    phrases: ['bloating', 'gas', 'gas in stomach', 'gas trouble', 'flatulence', 'stomach gas', 'belching', 'full stomach feeling'],
    en: {
      about: "Bloating is a feeling of fullness or tightness in the belly, often with gas.",
      points: [
        "Swallowing air while eating or drinking quickly",
        "Foods that produce gas, or food the body finds hard to digest",
        "Constipation",
        "Gastritis, irritable bowel or other digestive conditions",
      ],
    },
    hi: {
      about: "पेट फूलना पेट में भरेपन या कसाव का एहसास है, जो अक्सर गैस के साथ होता है।",
      points: [
        "जल्दी-जल्दी खाने या पीने में हवा निगल लेना",
        "गैस बनाने वाला खाना, या ऐसा खाना जिसे पचाना शरीर के लिए मुश्किल हो",
        "कब्ज़",
        "गैस्ट्राइटिस, इरिटेबल बाउल या पाचन की दूसरी बीमारियां",
      ],
    },
    pa: {
      about: "ਪੇਟ ਫੁੱਲਣਾ ਪੇਟ ਵਿੱਚ ਭਰੇਪਣ ਜਾਂ ਕਸਾਅ ਦਾ ਅਹਿਸਾਸ ਹੈ, ਜੋ ਅਕਸਰ ਗੈਸ ਦੇ ਨਾਲ ਹੁੰਦਾ ਹੈ।",
      points: [
        "ਜਲਦੀ-ਜਲਦੀ ਖਾਣ ਜਾਂ ਪੀਣ ਵਿੱਚ ਹਵਾ ਨਿਗਲ ਲੈਣਾ",
        "ਗੈਸ ਬਣਾਉਣ ਵਾਲਾ ਖਾਣਾ, ਜਾਂ ਅਜਿਹਾ ਖਾਣਾ ਜਿਸ ਨੂੰ ਪਚਾਉਣਾ ਸਰੀਰ ਲਈ ਔਖਾ ਹੋਵੇ",
        "ਕਬਜ਼",
        "ਗੈਸਟ੍ਰਾਈਟਿਸ, ਇਰੀਟੇਬਲ ਬਾਊਲ ਜਾਂ ਪਾਚਨ ਦੀਆਂ ਹੋਰ ਬਿਮਾਰੀਆਂ",
      ],
    },
  },
  {
    id: 'stomach-pain',
    kind: 'symptom',
    phrases: ['stomach pain', 'abdominal pain', 'belly pain', 'tummy pain', 'pain in stomach', 'stomach ache', 'stomachache', 'upper abdominal pain', 'lower abdominal pain', 'pain in abdomen', 'my stomach hurts'],
    en: {
      about: "Stomach pain is pain anywhere between the chest and the groin. Where it is, how it feels and what goes with it help a doctor find the cause.",
      points: [
        "Indigestion, gas, acidity or gastritis",
        "Stomach infections and food that did not agree with you",
        "Constipation",
        "Gallstones, kidney stones or an inflamed appendix",
        "In women, period pain or conditions of the womb and ovaries",
      ],
    },
    hi: {
      about: "पेट दर्द छाती और जांघ के जोड़ के बीच कहीं भी होने वाला दर्द है। दर्द कहां है, कैसा है और उसके साथ क्या हो रहा है, इससे डॉक्टर को कारण पता करने में मदद मिलती है।",
      points: [
        "अपच, गैस, एसिडिटी या गैस्ट्राइटिस",
        "पेट के संक्रमण और ऐसा खाना जो पच न पाए",
        "कब्ज़",
        "पित्त की पथरी, गुर्दे की पथरी या अपेंडिक्स में सूजन",
        "महिलाओं में माहवारी का दर्द या गर्भाशय और अंडाशय की समस्याएं",
      ],
    },
    pa: {
      about: "ਪੇਟ ਦਰਦ ਛਾਤੀ ਅਤੇ ਪੱਟ ਦੇ ਜੋੜ ਵਿਚਕਾਰ ਕਿਤੇ ਵੀ ਹੋਣ ਵਾਲਾ ਦਰਦ ਹੈ। ਦਰਦ ਕਿੱਥੇ ਹੈ, ਕਿਹੋ ਜਿਹਾ ਹੈ ਅਤੇ ਉਸ ਦੇ ਨਾਲ ਕੀ ਹੋ ਰਿਹਾ ਹੈ, ਇਸ ਤੋਂ ਡਾਕਟਰ ਨੂੰ ਕਾਰਨ ਲੱਭਣ ਵਿੱਚ ਮਦਦ ਮਿਲਦੀ ਹੈ।",
      points: [
        "ਬਦਹਜ਼ਮੀ, ਗੈਸ, ਐਸਿਡਿਟੀ ਜਾਂ ਗੈਸਟ੍ਰਾਈਟਿਸ",
        "ਪੇਟ ਦੀਆਂ ਲਾਗਾਂ ਅਤੇ ਅਜਿਹਾ ਖਾਣਾ ਜੋ ਹਜ਼ਮ ਨਾ ਹੋਵੇ",
        "ਕਬਜ਼",
        "ਪਿੱਤੇ ਦੀ ਪੱਥਰੀ, ਗੁਰਦੇ ਦੀ ਪੱਥਰੀ ਜਾਂ ਅਪੈਂਡਿਕਸ ਵਿੱਚ ਸੋਜ",
        "ਔਰਤਾਂ ਵਿੱਚ ਮਾਹਵਾਰੀ ਦਾ ਦਰਦ ਜਾਂ ਬੱਚੇਦਾਨੀ ਅਤੇ ਅੰਡਕੋਸ਼ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ",
      ],
    },
  },
  {
    id: 'indigestion',
    kind: 'symptom',
    phrases: ['indigestion', 'bad digestion', 'poor digestion', 'digestion problem', 'dyspepsia', 'food not digesting'],
    en: {
      about: "Indigestion is discomfort in the upper belly after eating, such as fullness, bloating, burning or nausea.",
      points: [
        "Eating too much or too fast",
        "Oily, spicy or heavy food",
        "Acid reflux or gastritis",
        "Stress and irregular meal times",
      ],
    },
    hi: {
      about: "अपच खाने के बाद पेट के ऊपरी हिस्से में होने वाली बेचैनी है, जैसे भारीपन, फूलना, जलन या मतली।",
      points: [
        "बहुत ज़्यादा या बहुत जल्दी खाना",
        "तैलीय, मसालेदार या भारी खाना",
        "एसिड रिफ्लक्स या गैस्ट्राइटिस",
        "तनाव और खाने के अनियमित समय",
      ],
    },
    pa: {
      about: "ਬਦਹਜ਼ਮੀ ਖਾਣ ਤੋਂ ਬਾਅਦ ਪੇਟ ਦੇ ਉੱਪਰਲੇ ਹਿੱਸੇ ਵਿੱਚ ਹੋਣ ਵਾਲੀ ਬੇਚੈਨੀ ਹੈ, ਜਿਵੇਂ ਭਾਰੀਪਨ, ਫੁੱਲਣਾ, ਜਲਨ ਜਾਂ ਜੀ ਕੱਚਾ ਹੋਣਾ।",
      points: [
        "ਬਹੁਤ ਜ਼ਿਆਦਾ ਜਾਂ ਬਹੁਤ ਜਲਦੀ ਖਾਣਾ",
        "ਤੇਲ ਵਾਲਾ, ਮਸਾਲੇਦਾਰ ਜਾਂ ਭਾਰੀ ਖਾਣਾ",
        "ਐਸਿਡ ਰਿਫਲਕਸ ਜਾਂ ਗੈਸਟ੍ਰਾਈਟਿਸ",
        "ਤਣਾਅ ਅਤੇ ਖਾਣੇ ਦੇ ਬੇਨਿਯਮੀ ਸਮੇਂ",
      ],
    },
  },
  {
    id: 'loss-of-appetite',
    kind: 'symptom',
    phrases: ['loss of appetite', 'no appetite', 'not feeling hungry', 'poor appetite', 'low appetite', 'not eating', 'appetite loss', 'decreased appetite'],
    en: {
      about: "Loss of appetite means not feeling like eating, or eating much less than usual.",
      points: [
        "Infections and fever",
        "Gastritis, acidity or constipation",
        "Stress, low mood or poor sleep",
        "Long-term conditions such as thyroid, liver or kidney problems",
      ],
    },
    hi: {
      about: "भूख न लगने का मतलब है खाने का मन न करना, या सामान्य से बहुत कम खाना।",
      points: [
        "संक्रमण और बुखार",
        "गैस्ट्राइटिस, एसिडिटी या कब्ज़",
        "तनाव, उदास मन या कम नींद",
        "थायराइड, लिवर या गुर्दे की समस्या जैसी लंबी बीमारियां",
      ],
    },
    pa: {
      about: "ਭੁੱਖ ਨਾ ਲੱਗਣ ਦਾ ਮਤਲਬ ਹੈ ਖਾਣ ਦਾ ਮਨ ਨਾ ਕਰਨਾ, ਜਾਂ ਆਮ ਨਾਲੋਂ ਬਹੁਤ ਘੱਟ ਖਾਣਾ।",
      points: [
        "ਲਾਗਾਂ ਅਤੇ ਬੁਖ਼ਾਰ",
        "ਗੈਸਟ੍ਰਾਈਟਿਸ, ਐਸਿਡਿਟੀ ਜਾਂ ਕਬਜ਼",
        "ਤਣਾਅ, ਉਦਾਸ ਮਨ ਜਾਂ ਘੱਟ ਨੀਂਦ",
        "ਥਾਇਰਾਇਡ, ਜਿਗਰ ਜਾਂ ਗੁਰਦੇ ਦੀ ਸਮੱਸਿਆ ਵਰਗੀਆਂ ਲੰਮੇ ਸਮੇਂ ਦੀਆਂ ਬਿਮਾਰੀਆਂ",
      ],
    },
  },
  {
    id: 'weight-loss',
    kind: 'symptom',
    phrases: ['weight loss', 'losing weight', 'unexplained weight loss', 'sudden weight loss', 'weight loss without trying'],
    en: {
      about: "Losing weight without trying is worth a check, especially if it is steady or comes with tiredness or loss of appetite.",
      points: [
        "An overactive thyroid or diabetes",
        "Long-lasting infections",
        "Digestive problems that stop food being absorbed well",
        "Stress, low mood or eating much less",
      ],
    },
    hi: {
      about: "बिना कोशिश के वज़न घटना जांच कराने लायक बात है, खासकर तब जब यह लगातार हो या थकान और भूख की कमी के साथ आए।",
      points: [
        "थायराइड का ज़्यादा सक्रिय होना या डायबिटीज़",
        "लंबे समय तक चलने वाले संक्रमण",
        "पाचन की ऐसी समस्याएं जिनमें खाना ठीक से सोखा नहीं जाता",
        "तनाव, उदास मन या बहुत कम खाना",
      ],
    },
    pa: {
      about: "ਬਿਨਾਂ ਕੋਸ਼ਿਸ਼ ਦੇ ਭਾਰ ਘਟਣਾ ਜਾਂਚ ਕਰਵਾਉਣ ਵਾਲੀ ਗੱਲ ਹੈ, ਖ਼ਾਸ ਕਰਕੇ ਜੇ ਇਹ ਲਗਾਤਾਰ ਹੋਵੇ ਜਾਂ ਥਕਾਵਟ ਅਤੇ ਭੁੱਖ ਦੀ ਕਮੀ ਦੇ ਨਾਲ ਆਵੇ।",
      points: [
        "ਥਾਇਰਾਇਡ ਦਾ ਵੱਧ ਸਰਗਰਮ ਹੋਣਾ ਜਾਂ ਸ਼ੂਗਰ",
        "ਲੰਮੇ ਸਮੇਂ ਤੱਕ ਚੱਲਣ ਵਾਲੀਆਂ ਲਾਗਾਂ",
        "ਪਾਚਨ ਦੀਆਂ ਅਜਿਹੀਆਂ ਸਮੱਸਿਆਵਾਂ ਜਿਨ੍ਹਾਂ ਵਿੱਚ ਖਾਣਾ ਠੀਕ ਤਰ੍ਹਾਂ ਸੋਖਿਆ ਨਹੀਂ ਜਾਂਦਾ",
        "ਤਣਾਅ, ਉਦਾਸ ਮਨ ਜਾਂ ਬਹੁਤ ਘੱਟ ਖਾਣਾ",
      ],
    },
  },
  {
    id: 'weight-gain',
    kind: 'symptom',
    phrases: ['weight gain', 'gaining weight', 'putting on weight', 'overweight', 'obesity', 'unexplained weight gain', 'increased weight'],
    en: {
      about: "Weight gain happens when the body takes in more energy than it uses. Sometimes a health condition or a treatment is behind it.",
      points: [
        "Eating more than the body needs, and little physical activity",
        "An underactive thyroid",
        "Hormonal changes, including polycystic ovary syndrome (PCOS)",
        "Poor sleep and stress",
        "Fluid building up in the body, which can look like weight gain",
      ],
    },
    hi: {
      about: "वज़न तब बढ़ता है जब शरीर जितनी ऊर्जा इस्तेमाल करता है उससे ज़्यादा लेता है। कभी-कभी इसके पीछे कोई बीमारी या इलाज भी होता है।",
      points: [
        "शरीर की ज़रूरत से ज़्यादा खाना और कम शारीरिक गतिविधि",
        "थायराइड का कम सक्रिय होना",
        "हार्मोन में बदलाव, जिसमें पीसीओएस (PCOS) भी शामिल है",
        "कम नींद और तनाव",
        "शरीर में पानी जमा होना, जो वज़न बढ़ने जैसा दिख सकता है",
      ],
    },
    pa: {
      about: "ਭਾਰ ਉਦੋਂ ਵਧਦਾ ਹੈ ਜਦੋਂ ਸਰੀਰ ਜਿੰਨੀ ਊਰਜਾ ਵਰਤਦਾ ਹੈ ਉਸ ਤੋਂ ਵੱਧ ਲੈਂਦਾ ਹੈ। ਕਈ ਵਾਰ ਇਸ ਦੇ ਪਿੱਛੇ ਕੋਈ ਬਿਮਾਰੀ ਜਾਂ ਇਲਾਜ ਵੀ ਹੁੰਦਾ ਹੈ।",
      points: [
        "ਸਰੀਰ ਦੀ ਲੋੜ ਤੋਂ ਵੱਧ ਖਾਣਾ ਅਤੇ ਘੱਟ ਸਰੀਰਕ ਗਤੀਵਿਧੀ",
        "ਥਾਇਰਾਇਡ ਦਾ ਘੱਟ ਸਰਗਰਮ ਹੋਣਾ",
        "ਹਾਰਮੋਨ ਵਿੱਚ ਬਦਲਾਅ, ਜਿਸ ਵਿੱਚ ਪੀਸੀਓਐਸ (PCOS) ਵੀ ਸ਼ਾਮਲ ਹੈ",
        "ਘੱਟ ਨੀਂਦ ਅਤੇ ਤਣਾਅ",
        "ਸਰੀਰ ਵਿੱਚ ਪਾਣੀ ਜਮ੍ਹਾ ਹੋਣਾ, ਜੋ ਭਾਰ ਵਧਣ ਵਰਗਾ ਦਿਖ ਸਕਦਾ ਹੈ",
      ],
    },
  },
]
