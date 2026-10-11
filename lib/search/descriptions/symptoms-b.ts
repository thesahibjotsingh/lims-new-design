// lib/search/descriptions/symptoms-b.ts
//
// Overviews of pain, ear, nose, eye and dental complaints. DRAFT: not yet reviewed by a LIMS doctor (see types.ts).
// Hindi and Punjabi are drafts of the English. No medicine, dose, home remedy or cure appears in any of them.

import type { DescriptionEntry } from '@/lib/search/descriptions/types'

export const SYMPTOMS_B: DescriptionEntry[] = [
  {
    id: 'back-pain',
    kind: 'symptom',
    phrases: ['back pain', 'backache', 'lower back pain', 'pain in lower back', 'low back pain', 'back ache', 'pain in back', 'lumbago'],
    en: {
      about: "Back pain is very common and is often felt in the lower back. Most episodes are linked to the muscles and joints of the spine and ease over time, but pain that keeps coming back needs a proper look.",
      points: [
        "Muscle strain from lifting, sitting for long hours or poor posture",
        "Wear and tear of the spine, including the discs and joints",
        "A slipped (bulging) disc pressing on a nerve, which can send pain down the leg",
        "Kidney or urinary problems, which can also be felt in the back",
        "Extra weight and weak back muscles",
      ],
    },
    hi: {
      about: "कमर दर्द बहुत आम है और अक्सर पीठ के निचले हिस्से में होता है। ज़्यादातर बार इसका संबंध रीढ़ की मांसपेशियों और जोड़ों से होता है और यह समय के साथ ठीक हो जाता है, लेकिन जो दर्द बार-बार लौटे उसे ठीक से दिखवाना चाहिए।",
      points: [
        "भारी सामान उठाने, लंबे समय तक बैठने या गलत मुद्रा से मांसपेशियों में खिंचाव",
        "रीढ़ की घिसावट, जिसमें डिस्क और जोड़ भी शामिल हैं",
        "स्लिप (उभरी हुई) डिस्क का नस पर दबाव, जिससे दर्द पैर तक जा सकता है",
        "गुर्दे या पेशाब की समस्याएं, जिनका दर्द पीठ में भी महसूस हो सकता है",
        "बढ़ा हुआ वज़न और कमज़ोर पीठ की मांसपेशियां",
      ],
    },
    pa: {
      about: "ਕਮਰ ਦਰਦ ਬਹੁਤ ਆਮ ਹੈ ਅਤੇ ਅਕਸਰ ਪਿੱਠ ਦੇ ਹੇਠਲੇ ਹਿੱਸੇ ਵਿੱਚ ਹੁੰਦਾ ਹੈ। ਜ਼ਿਆਦਾਤਰ ਵਾਰ ਇਸ ਦਾ ਸੰਬੰਧ ਰੀੜ੍ਹ ਦੀਆਂ ਮਾਸਪੇਸ਼ੀਆਂ ਅਤੇ ਜੋੜਾਂ ਨਾਲ ਹੁੰਦਾ ਹੈ ਅਤੇ ਇਹ ਸਮੇਂ ਨਾਲ ਠੀਕ ਹੋ ਜਾਂਦਾ ਹੈ, ਪਰ ਜੋ ਦਰਦ ਵਾਰ-ਵਾਰ ਮੁੜ ਆਵੇ ਉਸ ਨੂੰ ਠੀਕ ਤਰ੍ਹਾਂ ਦਿਖਾਉਣਾ ਚਾਹੀਦਾ ਹੈ।",
      points: [
        "ਭਾਰੀ ਸਮਾਨ ਚੁੱਕਣ, ਲੰਮੇ ਸਮੇਂ ਤੱਕ ਬੈਠਣ ਜਾਂ ਗ਼ਲਤ ਬੈਠਣ-ਉੱਠਣ ਦੇ ਢੰਗ ਨਾਲ ਮਾਸਪੇਸ਼ੀਆਂ ਵਿੱਚ ਖਿਚਾਅ",
        "ਰੀੜ੍ਹ ਦੀ ਘਸਾਈ, ਜਿਸ ਵਿੱਚ ਡਿਸਕ ਅਤੇ ਜੋੜ ਵੀ ਸ਼ਾਮਲ ਹਨ",
        "ਸਲਿੱਪ (ਉੱਭਰੀ ਹੋਈ) ਡਿਸਕ ਦਾ ਨਾੜੀ ’ਤੇ ਦਬਾਅ, ਜਿਸ ਨਾਲ ਦਰਦ ਲੱਤ ਤੱਕ ਜਾ ਸਕਦਾ ਹੈ",
        "ਗੁਰਦੇ ਜਾਂ ਪਿਸ਼ਾਬ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ, ਜਿਨ੍ਹਾਂ ਦਾ ਦਰਦ ਪਿੱਠ ਵਿੱਚ ਵੀ ਮਹਿਸੂਸ ਹੋ ਸਕਦਾ ਹੈ",
        "ਵਧਿਆ ਹੋਇਆ ਭਾਰ ਅਤੇ ਕਮਜ਼ੋਰ ਪਿੱਠ ਦੀਆਂ ਮਾਸਪੇਸ਼ੀਆਂ",
      ],
    },
  },
  {
    id: 'neck-pain',
    kind: 'symptom',
    phrases: ['neck pain', 'stiff neck', 'neck stiffness', 'pain in neck', 'neck ache', 'cervical pain'],
    en: {
      about: "Neck pain and stiffness are usually from the muscles and joints of the neck, and often follow the way we sit, sleep or look at screens.",
      points: [
        "Muscle strain from poor posture, long hours at a desk or phone",
        "Sleeping in an awkward position",
        "Wear and tear of the neck bones (cervical spondylosis)",
        "A nerve being pressed, which can send pain or tingling into the arm",
        "Injury, including a sudden jerk",
      ],
    },
    hi: {
      about: "गर्दन का दर्द और अकड़न आम तौर पर गर्दन की मांसपेशियों और जोड़ों से होती है, और अक्सर हमारे बैठने, सोने या स्क्रीन देखने के तरीके से जुड़ी होती है।",
      points: [
        "गलत मुद्रा, डेस्क या फ़ोन पर लंबे घंटों से मांसपेशियों में खिंचाव",
        "सोते समय गर्दन का बेढंगी स्थिति में रहना",
        "गर्दन की हड्डियों की घिसावट (सर्वाइकल स्पॉन्डिलोसिस)",
        "किसी नस पर दबाव, जिससे हाथ में दर्द या झनझनाहट हो सकती है",
        "चोट, जिसमें अचानक लगा झटका भी शामिल है",
      ],
    },
    pa: {
      about: "ਗਰਦਨ ਦਾ ਦਰਦ ਅਤੇ ਅਕੜਾਅ ਆਮ ਤੌਰ ’ਤੇ ਗਰਦਨ ਦੀਆਂ ਮਾਸਪੇਸ਼ੀਆਂ ਅਤੇ ਜੋੜਾਂ ਤੋਂ ਹੁੰਦਾ ਹੈ, ਅਤੇ ਅਕਸਰ ਸਾਡੇ ਬੈਠਣ, ਸੌਣ ਜਾਂ ਸਕ੍ਰੀਨ ਦੇਖਣ ਦੇ ਢੰਗ ਨਾਲ ਜੁੜਿਆ ਹੁੰਦਾ ਹੈ।",
      points: [
        "ਗ਼ਲਤ ਬੈਠਣ-ਉੱਠਣ ਦੇ ਢੰਗ, ਡੈਸਕ ਜਾਂ ਫ਼ੋਨ ’ਤੇ ਲੰਮੇ ਘੰਟਿਆਂ ਨਾਲ ਮਾਸਪੇਸ਼ੀਆਂ ਵਿੱਚ ਖਿਚਾਅ",
        "ਸੌਂਦੇ ਸਮੇਂ ਗਰਦਨ ਦਾ ਬੇਢੰਗੀ ਸਥਿਤੀ ਵਿੱਚ ਰਹਿਣਾ",
        "ਗਰਦਨ ਦੀਆਂ ਹੱਡੀਆਂ ਦੀ ਘਸਾਈ (ਸਰਵਾਈਕਲ ਸਪੌਂਡੀਲੋਸਿਸ)",
        "ਕਿਸੇ ਨਾੜੀ ’ਤੇ ਦਬਾਅ, ਜਿਸ ਨਾਲ ਬਾਂਹ ਵਿੱਚ ਦਰਦ ਜਾਂ ਝਰਨਾਹਟ ਹੋ ਸਕਦੀ ਹੈ",
        "ਸੱਟ, ਜਿਸ ਵਿੱਚ ਅਚਾਨਕ ਲੱਗਾ ਝਟਕਾ ਵੀ ਸ਼ਾਮਲ ਹੈ",
      ],
    },
  },
  {
    id: 'shoulder-pain',
    kind: 'symptom',
    phrases: ['shoulder pain', 'pain in shoulder', 'shoulder ache', 'shoulder stiffness'],
    en: {
      about: "Shoulder pain can come from the joint itself, the tendons and muscles around it, or from the neck.",
      points: [
        "Strain or inflammation of the tendons around the shoulder",
        "A stiff, painful shoulder that slowly loses movement (frozen shoulder)",
        "Arthritis or an old injury",
        "Pain travelling from the neck",
        "Sleeping on the shoulder, or repeated overhead work",
      ],
    },
    hi: {
      about: "कंधे का दर्द खुद जोड़ से, उसके आसपास की नसों-मांसपेशियों (टेंडन) से, या गर्दन से आ सकता है।",
      points: [
        "कंधे के आसपास के टेंडन में खिंचाव या सूजन",
        "कंधे का जकड़ जाना जिसमें हिलना धीरे-धीरे कम हो जाता है (फ्रोज़न शोल्डर)",
        "गठिया या पुरानी चोट",
        "गर्दन से आने वाला दर्द",
        "कंधे पर दबाकर सोना, या बार-बार सिर के ऊपर हाथ उठाकर काम करना",
      ],
    },
    pa: {
      about: "ਮੋਢੇ ਦਾ ਦਰਦ ਜੋੜ ਤੋਂ, ਉਸ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਦੀਆਂ ਨਾੜਾਂ-ਮਾਸਪੇਸ਼ੀਆਂ (ਟੈਂਡਨ) ਤੋਂ, ਜਾਂ ਗਰਦਨ ਤੋਂ ਆ ਸਕਦਾ ਹੈ।",
      points: [
        "ਮੋਢੇ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਦੇ ਟੈਂਡਨ ਵਿੱਚ ਖਿਚਾਅ ਜਾਂ ਸੋਜ",
        "ਮੋਢੇ ਦਾ ਜਕੜ ਜਾਣਾ ਜਿਸ ਵਿੱਚ ਹਿਲਣਾ ਹੌਲੀ-ਹੌਲੀ ਘਟ ਜਾਂਦਾ ਹੈ (ਫ੍ਰੋਜ਼ਨ ਸ਼ੋਲਡਰ)",
        "ਗਠੀਆ ਜਾਂ ਪੁਰਾਣੀ ਸੱਟ",
        "ਗਰਦਨ ਤੋਂ ਆਉਣ ਵਾਲਾ ਦਰਦ",
        "ਮੋਢੇ ’ਤੇ ਦਬਾ ਕੇ ਸੌਣਾ, ਜਾਂ ਵਾਰ-ਵਾਰ ਸਿਰ ਤੋਂ ਉੱਪਰ ਹੱਥ ਚੁੱਕ ਕੇ ਕੰਮ ਕਰਨਾ",
      ],
    },
  },
  {
    id: 'knee-pain',
    kind: 'symptom',
    phrases: ['knee pain', 'pain in knee', 'knee ache', 'knee pain while walking', 'knee swelling', 'swollen knee', 'knees hurt'],
    en: {
      about: "Knee pain is common, especially with age, extra weight or sport. Where in the knee it hurts, and whether it swells or locks, helps find the cause.",
      points: [
        "Wear and tear of the knee joint (osteoarthritis)",
        "Injury to a ligament or the cartilage cushion (meniscus)",
        "Strain from sport, running or climbing stairs",
        "Inflammation of the joint, including other kinds of arthritis",
        "Extra body weight putting more load on the knees",
      ],
    },
    hi: {
      about: "घुटने का दर्द आम है, खासकर उम्र बढ़ने, ज़्यादा वज़न या खेलकूद के साथ। घुटने में दर्द कहां है, और क्या वह सूजता या अटकता है, इससे कारण पहचानने में मदद मिलती है।",
      points: [
        "घुटने के जोड़ की घिसावट (ऑस्टियोआर्थराइटिस)",
        "लिगामेंट या कार्टिलेज की गद्दी (मेनिस्कस) में चोट",
        "खेल, दौड़ने या सीढ़ियां चढ़ने से होने वाला खिंचाव",
        "जोड़ में सूजन, जिसमें गठिया के दूसरे प्रकार भी शामिल हैं",
        "शरीर का ज़्यादा वज़न, जिससे घुटनों पर ज़्यादा बोझ पड़ता है",
      ],
    },
    pa: {
      about: "ਗੋਡੇ ਦਾ ਦਰਦ ਆਮ ਹੈ, ਖ਼ਾਸ ਕਰਕੇ ਉਮਰ ਵਧਣ, ਜ਼ਿਆਦਾ ਭਾਰ ਜਾਂ ਖੇਡਾਂ ਨਾਲ। ਗੋਡੇ ਵਿੱਚ ਦਰਦ ਕਿੱਥੇ ਹੈ, ਅਤੇ ਕੀ ਉਹ ਸੁੱਜਦਾ ਜਾਂ ਅੜਦਾ ਹੈ, ਇਸ ਤੋਂ ਕਾਰਨ ਪਛਾਣਨ ਵਿੱਚ ਮਦਦ ਮਿਲਦੀ ਹੈ।",
      points: [
        "ਗੋਡੇ ਦੇ ਜੋੜ ਦੀ ਘਸਾਈ (ਓਸਟੀਓਆਰਥਰਾਈਟਿਸ)",
        "ਲਿਗਾਮੈਂਟ ਜਾਂ ਕਾਰਟੀਲੇਜ ਦੀ ਗੱਦੀ (ਮੇਨਿਸਕਸ) ਵਿੱਚ ਸੱਟ",
        "ਖੇਡ, ਦੌੜਨ ਜਾਂ ਪੌੜੀਆਂ ਚੜ੍ਹਨ ਨਾਲ ਹੋਣ ਵਾਲਾ ਖਿਚਾਅ",
        "ਜੋੜ ਵਿੱਚ ਸੋਜ, ਜਿਸ ਵਿੱਚ ਗਠੀਏ ਦੀਆਂ ਹੋਰ ਕਿਸਮਾਂ ਵੀ ਸ਼ਾਮਲ ਹਨ",
        "ਸਰੀਰ ਦਾ ਜ਼ਿਆਦਾ ਭਾਰ, ਜਿਸ ਨਾਲ ਗੋਡਿਆਂ ’ਤੇ ਵੱਧ ਬੋਝ ਪੈਂਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'hip-pain',
    kind: 'symptom',
    phrases: ['hip pain', 'pain in hip', 'hip ache', 'hip joint pain'],
    en: {
      about: "Hip pain can be felt in the groin, the outer hip, the buttock or even the thigh and knee, depending on its cause.",
      points: [
        "Wear and tear of the hip joint (osteoarthritis)",
        "Inflammation of the tendons or fluid sacs around the hip",
        "A pinched nerve in the lower back, felt in the hip and leg",
        "Injury or a fracture, especially after a fall in older people",
        "Reduced blood supply to the bone of the hip joint",
      ],
    },
    hi: {
      about: "कूल्हे का दर्द कारण के अनुसार जांघ के जोड़, कूल्हे के बाहरी हिस्से, नितंब, या यहां तक कि जांघ और घुटने में भी महसूस हो सकता है।",
      points: [
        "कूल्हे के जोड़ की घिसावट (ऑस्टियोआर्थराइटिस)",
        "कूल्हे के आसपास के टेंडन या तरल की थैलियों में सूजन",
        "कमर में दबी हुई नस, जिसका दर्द कूल्हे और पैर में महसूस होता है",
        "चोट या फ्रैक्चर, खासकर बुज़ुर्गों में गिरने के बाद",
        "कूल्हे के जोड़ की हड्डी में खून की आपूर्ति कम होना",
      ],
    },
    pa: {
      about: "ਕੁੱਲ੍ਹੇ ਦਾ ਦਰਦ ਕਾਰਨ ਅਨੁਸਾਰ ਪੱਟ ਦੇ ਜੋੜ, ਕੁੱਲ੍ਹੇ ਦੇ ਬਾਹਰੀ ਹਿੱਸੇ, ਚੂਲੇ, ਜਾਂ ਇੱਥੋਂ ਤੱਕ ਕਿ ਪੱਟ ਅਤੇ ਗੋਡੇ ਵਿੱਚ ਵੀ ਮਹਿਸੂਸ ਹੋ ਸਕਦਾ ਹੈ।",
      points: [
        "ਕੁੱਲ੍ਹੇ ਦੇ ਜੋੜ ਦੀ ਘਸਾਈ (ਓਸਟੀਓਆਰਥਰਾਈਟਿਸ)",
        "ਕੁੱਲ੍ਹੇ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਦੇ ਟੈਂਡਨ ਜਾਂ ਤਰਲ ਦੀਆਂ ਥੈਲੀਆਂ ਵਿੱਚ ਸੋਜ",
        "ਕਮਰ ਵਿੱਚ ਦੱਬੀ ਹੋਈ ਨਾੜੀ, ਜਿਸ ਦਾ ਦਰਦ ਕੁੱਲ੍ਹੇ ਅਤੇ ਲੱਤ ਵਿੱਚ ਮਹਿਸੂਸ ਹੁੰਦਾ ਹੈ",
        "ਸੱਟ ਜਾਂ ਫ੍ਰੈਕਚਰ, ਖ਼ਾਸ ਕਰਕੇ ਬਜ਼ੁਰਗਾਂ ਵਿੱਚ ਡਿੱਗਣ ਤੋਂ ਬਾਅਦ",
        "ਕੁੱਲ੍ਹੇ ਦੇ ਜੋੜ ਦੀ ਹੱਡੀ ਵਿੱਚ ਖੂਨ ਦੀ ਸਪਲਾਈ ਘਟਣਾ",
      ],
    },
  },
  {
    id: 'joint-pain',
    kind: 'symptom',
    phrases: ['joint pain', 'pain in joints', 'joints pain', 'joint ache', 'aching joints', 'joint stiffness'],
    en: {
      about: "Joint pain is pain, stiffness or swelling where bones meet. It can be in one joint or in many.",
      points: [
        "Wear and tear of the joints (osteoarthritis), more common with age",
        "Inflammation of the joints, such as rheumatoid arthritis",
        "Injury or overuse",
        "Gout, when uric acid crystals build up in a joint",
        "Infections, which are usually painful and come with fever",
      ],
    },
    hi: {
      about: "जोड़ों का दर्द वहां का दर्द, अकड़न या सूजन है जहां हड्डियां मिलती हैं। यह एक जोड़ में हो सकता है या कई जोड़ों में।",
      points: [
        "जोड़ों की घिसावट (ऑस्टियोआर्थराइटिस), जो उम्र के साथ ज़्यादा आम है",
        "जोड़ों की सूजन, जैसे रूमेटॉइड आर्थराइटिस",
        "चोट या ज़्यादा इस्तेमाल",
        "गाउट, जब यूरिक एसिड के कण किसी जोड़ में जमा हो जाते हैं",
        "संक्रमण, जो आमतौर पर दर्दनाक होते हैं और बुखार के साथ आते हैं",
      ],
    },
    pa: {
      about: "ਜੋੜਾਂ ਦਾ ਦਰਦ ਉੱਥੇ ਦਾ ਦਰਦ, ਅਕੜਾਅ ਜਾਂ ਸੋਜ ਹੈ ਜਿੱਥੇ ਹੱਡੀਆਂ ਮਿਲਦੀਆਂ ਹਨ। ਇਹ ਇੱਕ ਜੋੜ ਵਿੱਚ ਹੋ ਸਕਦਾ ਹੈ ਜਾਂ ਕਈ ਜੋੜਾਂ ਵਿੱਚ।",
      points: [
        "ਜੋੜਾਂ ਦੀ ਘਸਾਈ (ਓਸਟੀਓਆਰਥਰਾਈਟਿਸ), ਜੋ ਉਮਰ ਨਾਲ ਵੱਧ ਆਮ ਹੈ",
        "ਜੋੜਾਂ ਦੀ ਸੋਜ, ਜਿਵੇਂ ਰਿਊਮੈਟਾਇਡ ਆਰਥਰਾਈਟਿਸ",
        "ਸੱਟ ਜਾਂ ਜ਼ਿਆਦਾ ਵਰਤੋਂ",
        "ਗਾਊਟ, ਜਦੋਂ ਯੂਰਿਕ ਐਸਿਡ ਦੇ ਕਣ ਕਿਸੇ ਜੋੜ ਵਿੱਚ ਜਮ੍ਹਾ ਹੋ ਜਾਂਦੇ ਹਨ",
        "ਲਾਗਾਂ, ਜੋ ਆਮ ਤੌਰ ’ਤੇ ਦਰਦਨਾਕ ਹੁੰਦੀਆਂ ਹਨ ਅਤੇ ਬੁਖ਼ਾਰ ਨਾਲ ਆਉਂਦੀਆਂ ਹਨ",
      ],
    },
  },
  {
    id: 'muscle-pain',
    kind: 'symptom',
    phrases: ['muscle pain', 'body ache', 'body pain', 'muscle ache', 'body aches', 'myalgia', 'aching muscles', 'muscle cramps', 'whole body pain', 'pain all over body', 'pain in whole body', 'pain all over the body'],
    en: {
      about: "Muscle or body aches are a common complaint. They are usually from overuse or an infection and settle with rest, but long-lasting aches need a check.",
      points: [
        "Overuse, a new kind of exercise or heavy work",
        "Viral infections such as flu, often with fever",
        "Poor sleep or stress",
        "Low levels of some vitamins and minerals, or low thyroid",
        "Some long-term treatments",
      ],
    },
    hi: {
      about: "मांसपेशियों या शरीर में दर्द एक आम शिकायत है। यह आमतौर पर ज़्यादा इस्तेमाल या किसी संक्रमण से होता है और आराम से ठीक हो जाता है, लेकिन लंबे समय तक रहने वाले दर्द की जांच करानी चाहिए।",
      points: [
        "ज़्यादा इस्तेमाल, नई तरह की कसरत या भारी काम",
        "फ्लू जैसे वायरल संक्रमण, जो अक्सर बुखार के साथ होते हैं",
        "कम नींद या तनाव",
        "कुछ विटामिनों और खनिजों की कमी, या थायराइड का कम होना",
        "कुछ लंबे इलाज",
      ],
    },
    pa: {
      about: "ਮਾਸਪੇਸ਼ੀਆਂ ਜਾਂ ਸਰੀਰ ਵਿੱਚ ਦਰਦ ਇੱਕ ਆਮ ਸ਼ਿਕਾਇਤ ਹੈ। ਇਹ ਆਮ ਤੌਰ ’ਤੇ ਜ਼ਿਆਦਾ ਵਰਤੋਂ ਜਾਂ ਕਿਸੇ ਲਾਗ ਤੋਂ ਹੁੰਦਾ ਹੈ ਅਤੇ ਆਰਾਮ ਨਾਲ ਠੀਕ ਹੋ ਜਾਂਦਾ ਹੈ, ਪਰ ਲੰਮੇ ਸਮੇਂ ਤੱਕ ਰਹਿਣ ਵਾਲੇ ਦਰਦ ਦੀ ਜਾਂਚ ਕਰਵਾਉਣੀ ਚਾਹੀਦੀ ਹੈ।",
      points: [
        "ਜ਼ਿਆਦਾ ਵਰਤੋਂ, ਨਵੀਂ ਤਰ੍ਹਾਂ ਦੀ ਕਸਰਤ ਜਾਂ ਭਾਰੀ ਕੰਮ",
        "ਫਲੂ ਵਰਗੀਆਂ ਵਾਇਰਲ ਲਾਗਾਂ, ਜੋ ਅਕਸਰ ਬੁਖ਼ਾਰ ਨਾਲ ਹੁੰਦੀਆਂ ਹਨ",
        "ਘੱਟ ਨੀਂਦ ਜਾਂ ਤਣਾਅ",
        "ਕੁਝ ਵਿਟਾਮਿਨਾਂ ਅਤੇ ਖਣਿਜਾਂ ਦੀ ਕਮੀ, ਜਾਂ ਥਾਇਰਾਇਡ ਦਾ ਘੱਟ ਹੋਣਾ",
        "ਕੁਝ ਲੰਮੇ ਇਲਾਜ",
      ],
    },
  },
  {
    id: 'foot-heel-pain',
    kind: 'symptom',
    phrases: ['heel pain', 'pain in heel', 'foot pain', 'pain in foot', 'ankle pain', 'pain in ankle', 'sole pain', 'heel ache'],
    en: {
      about: "Pain in the heel, foot or ankle is often from strain, footwear or standing for long hours. Heel pain that is worst with the first steps in the morning is common.",
      points: [
        "Inflammation of the band of tissue under the foot (plantar fasciitis)",
        "A sprained ankle or an old injury",
        "Shoes that do not fit or support well, or hard floors",
        "Arthritis in the foot or ankle",
        "Extra body weight",
      ],
    },
    hi: {
      about: "एड़ी, पैर या टखने का दर्द अक्सर खिंचाव, जूते-चप्पल या लंबे समय तक खड़े रहने से होता है। एड़ी का दर्द जो सुबह के पहले कदमों पर सबसे ज़्यादा हो, आम है।",
      points: [
        "पैर के तलवे के नीचे की ऊतक की पट्टी में सूजन (प्लांटर फैसाइटिस)",
        "टखने में मोच या पुरानी चोट",
        "जूते जो ठीक से फिट या सहारा न दें, या सख्त फ़र्श",
        "पैर या टखने में गठिया",
        "शरीर का ज़्यादा वज़न",
      ],
    },
    pa: {
      about: "ਅੱਡੀ, ਪੈਰ ਜਾਂ ਗਿੱਟੇ ਦਾ ਦਰਦ ਅਕਸਰ ਖਿਚਾਅ, ਜੁੱਤੀਆਂ ਜਾਂ ਲੰਮੇ ਸਮੇਂ ਤੱਕ ਖੜ੍ਹੇ ਰਹਿਣ ਨਾਲ ਹੁੰਦਾ ਹੈ। ਅੱਡੀ ਦਾ ਦਰਦ ਜੋ ਸਵੇਰ ਦੇ ਪਹਿਲੇ ਕਦਮਾਂ ’ਤੇ ਸਭ ਤੋਂ ਵੱਧ ਹੋਵੇ, ਆਮ ਹੈ।",
      points: [
        "ਪੈਰ ਦੇ ਤਲੇ ਹੇਠਲੀ ਟਿਸ਼ੂ ਦੀ ਪੱਟੀ ਵਿੱਚ ਸੋਜ (ਪਲਾਂਟਰ ਫੈਸ਼ਾਈਟਿਸ)",
        "ਗਿੱਟੇ ਵਿੱਚ ਮੋਚ ਜਾਂ ਪੁਰਾਣੀ ਸੱਟ",
        "ਜੁੱਤੀਆਂ ਜੋ ਠੀਕ ਤਰ੍ਹਾਂ ਫਿੱਟ ਨਾ ਹੋਣ ਜਾਂ ਸਹਾਰਾ ਨਾ ਦੇਣ, ਜਾਂ ਸਖ਼ਤ ਫ਼ਰਸ਼",
        "ਪੈਰ ਜਾਂ ਗਿੱਟੇ ਵਿੱਚ ਗਠੀਆ",
        "ਸਰੀਰ ਦਾ ਜ਼ਿਆਦਾ ਭਾਰ",
      ],
    },
  },
  {
    id: 'wrist-hand-pain',
    kind: 'symptom',
    phrases: ['wrist pain', 'pain in wrist', 'hand pain', 'pain in hand', 'hand ache', 'pain in hands', 'wrist ache'],
    en: {
      about: "Wrist and hand pain is often from repeated movements, such as typing, using a phone or gripping tools.",
      points: [
        "Pressure on a nerve at the wrist (carpal tunnel syndrome), often with tingling in the fingers",
        "Strain of the tendons from repeated use",
        "Arthritis of the small joints of the hand",
        "A sprain or a small break after a fall",
      ],
    },
    hi: {
      about: "कलाई और हाथ का दर्द अक्सर बार-बार एक जैसी हरकतों से होता है, जैसे टाइपिंग, फ़ोन चलाना या औज़ार पकड़ना।",
      points: [
        "कलाई पर नस का दबाव (कार्पल टनल सिंड्रोम), जिसमें अक्सर उंगलियों में झनझनाहट होती है",
        "बार-बार इस्तेमाल से टेंडन में खिंचाव",
        "हाथ के छोटे जोड़ों में गठिया",
        "गिरने के बाद मोच या छोटा फ्रैक्चर",
      ],
    },
    pa: {
      about: "ਗੁੱਟ ਅਤੇ ਹੱਥ ਦਾ ਦਰਦ ਅਕਸਰ ਵਾਰ-ਵਾਰ ਇੱਕੋ ਜਿਹੀਆਂ ਹਰਕਤਾਂ ਨਾਲ ਹੁੰਦਾ ਹੈ, ਜਿਵੇਂ ਟਾਈਪਿੰਗ, ਫ਼ੋਨ ਚਲਾਉਣਾ ਜਾਂ ਔਜ਼ਾਰ ਫੜਨਾ।",
      points: [
        "ਗੁੱਟ ’ਤੇ ਨਾੜੀ ਦਾ ਦਬਾਅ (ਕਾਰਪਲ ਟਨਲ ਸਿੰਡਰੋਮ), ਜਿਸ ਵਿੱਚ ਅਕਸਰ ਉਂਗਲਾਂ ਵਿੱਚ ਝਰਨਾਹਟ ਹੁੰਦੀ ਹੈ",
        "ਵਾਰ-ਵਾਰ ਵਰਤੋਂ ਨਾਲ ਟੈਂਡਨ ਵਿੱਚ ਖਿਚਾਅ",
        "ਹੱਥ ਦੇ ਛੋਟੇ ਜੋੜਾਂ ਵਿੱਚ ਗਠੀਆ",
        "ਡਿੱਗਣ ਤੋਂ ਬਾਅਦ ਮੋਚ ਜਾਂ ਛੋਟਾ ਫ੍ਰੈਕਚਰ",
      ],
    },
  },
  {
    id: 'elbow-pain',
    kind: 'symptom',
    phrases: ['elbow pain', 'pain in elbow', 'elbow ache', 'pain in the elbow'],
    en: {
      about: "Elbow pain is often from the tendons on the outside or inside of the elbow, usually after repeated use of the forearm.",
      points: [
        "Tennis elbow, on the outer side of the elbow",
        "Golfer's elbow, on the inner side",
        "Arthritis or an old injury of the joint",
        "A nerve being pressed at the elbow, often with tingling in the little finger",
      ],
    },
    hi: {
      about: "कोहनी का दर्द अक्सर कोहनी के बाहर या अंदर के टेंडन से होता है, आमतौर पर कलाई-भुजा के बार-बार इस्तेमाल के बाद।",
      points: [
        "टेनिस एल्बो, कोहनी के बाहरी हिस्से में",
        "गोल्फर्स एल्बो, कोहनी के अंदरूनी हिस्से में",
        "जोड़ में गठिया या पुरानी चोट",
        "कोहनी पर किसी नस का दबना, जिसमें अक्सर छोटी उंगली में झनझनाहट होती है",
      ],
    },
    pa: {
      about: "ਕੂਹਣੀ ਦਾ ਦਰਦ ਅਕਸਰ ਕੂਹਣੀ ਦੇ ਬਾਹਰ ਜਾਂ ਅੰਦਰ ਦੇ ਟੈਂਡਨ ਤੋਂ ਹੁੰਦਾ ਹੈ, ਆਮ ਤੌਰ ’ਤੇ ਕਲਾਈ-ਬਾਂਹ ਦੀ ਵਾਰ-ਵਾਰ ਵਰਤੋਂ ਤੋਂ ਬਾਅਦ।",
      points: [
        "ਟੈਨਿਸ ਐਲਬੋ, ਕੂਹਣੀ ਦੇ ਬਾਹਰੀ ਹਿੱਸੇ ਵਿੱਚ",
        "ਗੋਲਫ਼ਰਜ਼ ਐਲਬੋ, ਕੂਹਣੀ ਦੇ ਅੰਦਰਲੇ ਹਿੱਸੇ ਵਿੱਚ",
        "ਜੋੜ ਵਿੱਚ ਗਠੀਆ ਜਾਂ ਪੁਰਾਣੀ ਸੱਟ",
        "ਕੂਹਣੀ ’ਤੇ ਕਿਸੇ ਨਾੜੀ ਦਾ ਦਬਣਾ, ਜਿਸ ਵਿੱਚ ਅਕਸਰ ਛੋਟੀ ਉਂਗਲ ਵਿੱਚ ਝਰਨਾਹਟ ਹੁੰਦੀ ਹੈ",
      ],
    },
  },
  {
    id: 'leg-pain',
    kind: 'symptom',
    phrases: ['leg pain', 'pain in leg', 'pain in legs', 'legs pain', 'calf pain', 'thigh pain', 'pain going down the leg', 'leg ache', 'legs hurt'],
    en: {
      about: "Leg pain can come from the muscles, the bones, the blood vessels or the nerves. How it feels, and whether it starts in the back, helps find the cause.",
      points: [
        "Muscle strain or cramps after exertion or long standing",
        "A nerve pressed in the lower back (sciatica), with pain running down the leg",
        "Problems with the blood supply or with veins in the leg",
        "Arthritis of the hip, knee or ankle",
        "Injury, including a stress fracture",
      ],
    },
    hi: {
      about: "पैर का दर्द मांसपेशियों, हड्डियों, खून की नलियों या नसों से आ सकता है। दर्द कैसा है, और क्या वह कमर से शुरू होता है, इससे कारण पहचानने में मदद मिलती है।",
      points: [
        "मेहनत या लंबे समय तक खड़े रहने के बाद मांसपेशियों में खिंचाव या ऐंठन",
        "कमर में नस का दबना (साइटिका), जिसमें दर्द पैर तक जाता है",
        "पैर में खून की आपूर्ति या नसों की समस्या",
        "कूल्हे, घुटने या टखने का गठिया",
        "चोट, जिसमें स्ट्रेस फ्रैक्चर भी शामिल है",
      ],
    },
    pa: {
      about: "ਲੱਤ ਦਾ ਦਰਦ ਮਾਸਪੇਸ਼ੀਆਂ, ਹੱਡੀਆਂ, ਖੂਨ ਦੀਆਂ ਨਾੜੀਆਂ ਜਾਂ ਨਸਾਂ ਤੋਂ ਆ ਸਕਦਾ ਹੈ। ਦਰਦ ਕਿਹੋ ਜਿਹਾ ਹੈ, ਅਤੇ ਕੀ ਉਹ ਕਮਰ ਤੋਂ ਸ਼ੁਰੂ ਹੁੰਦਾ ਹੈ, ਇਸ ਤੋਂ ਕਾਰਨ ਪਛਾਣਨ ਵਿੱਚ ਮਦਦ ਮਿਲਦੀ ਹੈ।",
      points: [
        "ਮਿਹਨਤ ਜਾਂ ਲੰਮੇ ਸਮੇਂ ਤੱਕ ਖੜ੍ਹੇ ਰਹਿਣ ਤੋਂ ਬਾਅਦ ਮਾਸਪੇਸ਼ੀਆਂ ਵਿੱਚ ਖਿਚਾਅ ਜਾਂ ਕੜਵੱਲ",
        "ਕਮਰ ਵਿੱਚ ਨਾੜੀ ਦਾ ਦਬਣਾ (ਸਾਇਟਿਕਾ), ਜਿਸ ਵਿੱਚ ਦਰਦ ਲੱਤ ਤੱਕ ਜਾਂਦਾ ਹੈ",
        "ਲੱਤ ਵਿੱਚ ਖੂਨ ਦੀ ਸਪਲਾਈ ਜਾਂ ਨਾੜਾਂ ਦੀ ਸਮੱਸਿਆ",
        "ਕੁੱਲ੍ਹੇ, ਗੋਡੇ ਜਾਂ ਗਿੱਟੇ ਦਾ ਗਠੀਆ",
        "ਸੱਟ, ਜਿਸ ਵਿੱਚ ਸਟ੍ਰੈੱਸ ਫ੍ਰੈਕਚਰ ਵੀ ਸ਼ਾਮਲ ਹੈ",
      ],
    },
  },
  {
    id: 'numbness-tingling',
    kind: 'symptom',
    phrases: ['numbness', 'tingling', 'numbness and tingling', 'pins and needles', 'tingling in feet', 'tingling in hands', 'numbness in hands', 'numbness in feet', 'tingling in legs', 'numbness in legs', 'tingling in fingers', 'numb hands', 'numb feet'],
    en: {
      about: "Numbness or tingling is a loss of feeling, or a pins-and-needles feeling, usually in the hands or feet. It happens when a nerve is pressed, irritated or not working well.",
      points: [
        "A nerve pressed in the neck, back, wrist or elbow",
        "Nerve damage linked to diabetes or low vitamin levels",
        "Sitting or lying in one position for long",
        "Reduced blood flow to the area",
        "Conditions of the brain or spinal cord, which a doctor can rule out",
      ],
    },
    hi: {
      about: "सुन्नपन या झनझनाहट में छूने का एहसास कम हो जाता है, या सुइयां चुभने जैसा लगता है, आमतौर पर हाथों या पैरों में। यह तब होता है जब कोई नस दबी हो, उसमें जलन हो या वह ठीक से काम न कर रही हो।",
      points: [
        "गर्दन, कमर, कलाई या कोहनी पर नस का दबना",
        "डायबिटीज़ या विटामिन की कमी से जुड़ी नसों की क्षति",
        "लंबे समय तक एक ही स्थिति में बैठे या लेटे रहना",
        "उस हिस्से में खून का बहाव कम होना",
        "दिमाग या रीढ़ की हड्डी की समस्याएं, जिन्हें डॉक्टर जांचकर अलग कर सकते हैं",
      ],
    },
    pa: {
      about: "ਸੁੰਨ ਹੋਣਾ ਜਾਂ ਝਰਨਾਹਟ ਵਿੱਚ ਛੂਹਣ ਦਾ ਅਹਿਸਾਸ ਘਟ ਜਾਂਦਾ ਹੈ, ਜਾਂ ਸੂਈਆਂ ਚੁਭਣ ਵਰਗਾ ਲੱਗਦਾ ਹੈ, ਆਮ ਤੌਰ ’ਤੇ ਹੱਥਾਂ ਜਾਂ ਪੈਰਾਂ ਵਿੱਚ। ਇਹ ਉਦੋਂ ਹੁੰਦਾ ਹੈ ਜਦੋਂ ਕੋਈ ਨਾੜੀ ਦੱਬੀ ਹੋਵੇ, ਉਸ ਵਿੱਚ ਜਲਨ ਹੋਵੇ ਜਾਂ ਉਹ ਠੀਕ ਤਰ੍ਹਾਂ ਕੰਮ ਨਾ ਕਰ ਰਹੀ ਹੋਵੇ।",
      points: [
        "ਗਰਦਨ, ਕਮਰ, ਗੁੱਟ ਜਾਂ ਕੂਹਣੀ ’ਤੇ ਨਾੜੀ ਦਾ ਦਬਣਾ",
        "ਸ਼ੂਗਰ ਜਾਂ ਵਿਟਾਮਿਨ ਦੀ ਕਮੀ ਨਾਲ ਜੁੜਿਆ ਨਾੜੀਆਂ ਦਾ ਨੁਕਸਾਨ",
        "ਲੰਮੇ ਸਮੇਂ ਤੱਕ ਇੱਕੋ ਸਥਿਤੀ ਵਿੱਚ ਬੈਠੇ ਜਾਂ ਲੇਟੇ ਰਹਿਣਾ",
        "ਉਸ ਹਿੱਸੇ ਵਿੱਚ ਖੂਨ ਦਾ ਵਹਾਅ ਘਟਣਾ",
        "ਦਿਮਾਗ ਜਾਂ ਰੀੜ੍ਹ ਦੀ ਹੱਡੀ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ, ਜਿਨ੍ਹਾਂ ਨੂੰ ਡਾਕਟਰ ਜਾਂਚ ਕੇ ਵੱਖ ਕਰ ਸਕਦੇ ਹਨ",
      ],
    },
  },
  {
    id: 'swelling-feet',
    kind: 'symptom',
    phrases: ['swelling in feet', 'swollen feet', 'foot swelling', 'swelling in legs', 'swollen legs', 'ankle swelling', 'swollen ankles', 'swelling of feet', 'swelling', 'swelling in body'],
    en: {
      about: "Swelling of the feet and ankles is a build-up of fluid. It is common after long standing or sitting, but swelling that keeps coming back or comes with other changes needs a check.",
      points: [
        "Standing or sitting for long hours, or hot weather",
        "Pregnancy",
        "Problems with the veins of the legs",
        "Heart, kidney or liver conditions, which can cause the body to hold fluid",
        "An injury, sprain or infection in the foot",
      ],
    },
    hi: {
      about: "पैरों और टखनों की सूजन तरल के जमा होने से होती है। लंबे समय तक खड़े या बैठे रहने के बाद यह आम है, लेकिन जो सूजन बार-बार लौटे या दूसरे बदलावों के साथ आए उसकी जांच करानी चाहिए।",
      points: [
        "लंबे घंटों तक खड़े या बैठे रहना, या गर्म मौसम",
        "गर्भावस्था",
        "पैरों की नसों की समस्याएं",
        "हृदय, गुर्दे या लिवर की बीमारियां, जिनमें शरीर तरल रोक लेता है",
        "पैर में चोट, मोच या संक्रमण",
      ],
    },
    pa: {
      about: "ਪੈਰਾਂ ਅਤੇ ਗਿੱਟਿਆਂ ਦੀ ਸੋਜ ਤਰਲ ਦੇ ਜਮ੍ਹਾ ਹੋਣ ਨਾਲ ਹੁੰਦੀ ਹੈ। ਲੰਮੇ ਸਮੇਂ ਤੱਕ ਖੜ੍ਹੇ ਜਾਂ ਬੈਠੇ ਰਹਿਣ ਤੋਂ ਬਾਅਦ ਇਹ ਆਮ ਹੈ, ਪਰ ਜੋ ਸੋਜ ਵਾਰ-ਵਾਰ ਮੁੜ ਆਵੇ ਜਾਂ ਹੋਰ ਬਦਲਾਵਾਂ ਨਾਲ ਆਵੇ ਉਸ ਦੀ ਜਾਂਚ ਕਰਵਾਉਣੀ ਚਾਹੀਦੀ ਹੈ।",
      points: [
        "ਲੰਮੇ ਘੰਟਿਆਂ ਤੱਕ ਖੜ੍ਹੇ ਜਾਂ ਬੈਠੇ ਰਹਿਣਾ, ਜਾਂ ਗਰਮ ਮੌਸਮ",
        "ਗਰਭ ਅਵਸਥਾ",
        "ਪੈਰਾਂ ਦੀਆਂ ਨਾੜਾਂ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ",
        "ਦਿਲ, ਗੁਰਦੇ ਜਾਂ ਜਿਗਰ ਦੀਆਂ ਬਿਮਾਰੀਆਂ, ਜਿਨ੍ਹਾਂ ਵਿੱਚ ਸਰੀਰ ਤਰਲ ਰੋਕ ਲੈਂਦਾ ਹੈ",
        "ਪੈਰ ਵਿੱਚ ਸੱਟ, ਮੋਚ ਜਾਂ ਲਾਗ",
      ],
    },
  },
  {
    id: 'tooth-pain',
    kind: 'symptom',
    phrases: ['tooth pain', 'toothache', 'tooth ache', 'dental pain', 'pain in tooth', 'teeth pain', 'pain in teeth', 'teeth ache'],
    en: {
      about: "Toothache is pain in or around a tooth. It usually means something is wrong with the tooth or the gum, and it tends to get worse if left alone.",
      points: [
        "A cavity (tooth decay) reaching the sensitive part of the tooth",
        "An infection at the root of the tooth, sometimes with swelling",
        "Gum disease",
        "A cracked or worn tooth",
        "A wisdom tooth coming through",
      ],
    },
    hi: {
      about: "दांत दर्द किसी दांत में या उसके आसपास का दर्द है। इसका मतलब आमतौर पर यह होता है कि दांत या मसूड़े में कुछ गड़बड़ है, और अनदेखा करने पर यह बढ़ता जाता है।",
      points: [
        "कैविटी (दांत का सड़ना) जो दांत के संवेदनशील हिस्से तक पहुंच जाए",
        "दांत की जड़ में संक्रमण, कभी-कभी सूजन के साथ",
        "मसूड़ों की बीमारी",
        "टूटा हुआ या घिसा हुआ दांत",
        "अक्ल दाढ़ का निकलना",
      ],
    },
    pa: {
      about: "ਦੰਦ ਦਰਦ ਕਿਸੇ ਦੰਦ ਵਿੱਚ ਜਾਂ ਉਸ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਦਾ ਦਰਦ ਹੈ। ਇਸ ਦਾ ਮਤਲਬ ਆਮ ਤੌਰ ’ਤੇ ਇਹ ਹੁੰਦਾ ਹੈ ਕਿ ਦੰਦ ਜਾਂ ਮਸੂੜੇ ਵਿੱਚ ਕੁਝ ਗੜਬੜ ਹੈ, ਅਤੇ ਅਣਗੌਲਿਆਂ ਕਰਨ ’ਤੇ ਇਹ ਵਧਦਾ ਜਾਂਦਾ ਹੈ।",
      points: [
        "ਕੈਵਿਟੀ (ਦੰਦ ਦਾ ਸੜਨਾ) ਜੋ ਦੰਦ ਦੇ ਸੰਵੇਦਨਸ਼ੀਲ ਹਿੱਸੇ ਤੱਕ ਪਹੁੰਚ ਜਾਵੇ",
        "ਦੰਦ ਦੀ ਜੜ੍ਹ ਵਿੱਚ ਲਾਗ, ਕਈ ਵਾਰ ਸੋਜ ਦੇ ਨਾਲ",
        "ਮਸੂੜਿਆਂ ਦੀ ਬਿਮਾਰੀ",
        "ਟੁੱਟਿਆ ਹੋਇਆ ਜਾਂ ਘਸਿਆ ਹੋਇਆ ਦੰਦ",
        "ਅਕਲ ਦਾੜ੍ਹ ਦਾ ਨਿਕਲਣਾ",
      ],
    },
  },
  {
    id: 'tooth-sensitivity',
    kind: 'symptom',
    phrases: ['sensitive teeth', 'tooth sensitivity', 'teeth sensitivity', 'sensitivity in teeth', 'cold sensitivity teeth', 'sensitive tooth'],
    en: {
      about: "Sensitive teeth give a short, sharp pain with hot, cold, sweet or sour things, or with brushing.",
      points: [
        "Enamel worn thin, or gums that have pulled back and exposed the root",
        "Early tooth decay or a small crack",
        "Brushing too hard",
        "Teeth grinding",
      ],
    },
    hi: {
      about: "संवेदनशील दांतों में गर्म, ठंडी, मीठी या खट्टी चीज़ों से, या ब्रश करने पर थोड़ी देर का तेज़ दर्द होता है।",
      points: [
        "इनेमल का पतला हो जाना, या मसूड़ों का पीछे हटकर जड़ खुल जाना",
        "दांत सड़ने की शुरुआत या छोटी दरार",
        "बहुत ज़ोर से ब्रश करना",
        "नींद में दांत पीसना",
      ],
    },
    pa: {
      about: "ਸੰਵੇਦਨਸ਼ੀਲ ਦੰਦਾਂ ਵਿੱਚ ਗਰਮ, ਠੰਢੀਆਂ, ਮਿੱਠੀਆਂ ਜਾਂ ਖੱਟੀਆਂ ਚੀਜ਼ਾਂ ਨਾਲ, ਜਾਂ ਬੁਰਸ਼ ਕਰਨ ’ਤੇ ਥੋੜ੍ਹੀ ਦੇਰ ਦਾ ਤੇਜ਼ ਦਰਦ ਹੁੰਦਾ ਹੈ।",
      points: [
        "ਇਨੈਮਲ ਦਾ ਪਤਲਾ ਹੋ ਜਾਣਾ, ਜਾਂ ਮਸੂੜਿਆਂ ਦਾ ਪਿੱਛੇ ਹਟ ਕੇ ਜੜ੍ਹ ਦਾ ਖੁੱਲ੍ਹ ਜਾਣਾ",
        "ਦੰਦ ਸੜਨ ਦੀ ਸ਼ੁਰੂਆਤ ਜਾਂ ਛੋਟੀ ਤਰੇੜ",
        "ਬਹੁਤ ਜ਼ੋਰ ਨਾਲ ਬੁਰਸ਼ ਕਰਨਾ",
        "ਨੀਂਦ ਵਿੱਚ ਦੰਦ ਪੀਸਣਾ",
      ],
    },
  },
  {
    id: 'bleeding-gums',
    kind: 'symptom',
    phrases: ['bleeding gums', 'gum bleeding', 'gums bleeding', 'bleeding from gums', 'blood from gums', 'gums bleed'],
    en: {
      about: "Gums that bleed when brushing or flossing are a common sign of gum inflammation, usually from plaque building up along the gum line.",
      points: [
        "Plaque and tartar on the teeth (gingivitis)",
        "A more advanced gum disease (periodontitis)",
        "Brushing too hard, or a new toothbrush",
        "Hormonal changes, including pregnancy",
        "Some blood conditions, which a doctor can check",
      ],
    },
    hi: {
      about: "ब्रश या फ्लॉस करते समय मसूड़ों से खून आना मसूड़ों की सूजन का एक आम संकेत है, जो आमतौर पर मसूड़ों की रेखा पर प्लाक जमने से होती है।",
      points: [
        "दांतों पर प्लाक और टार्टर जमना (जिंजिवाइटिस)",
        "मसूड़ों की ज़्यादा बढ़ी हुई बीमारी (पीरियोडोंटाइटिस)",
        "बहुत ज़ोर से ब्रश करना, या नया टूथब्रश",
        "हार्मोन में बदलाव, जिसमें गर्भावस्था भी शामिल है",
        "खून की कुछ बीमारियां, जिन्हें डॉक्टर जांच सकते हैं",
      ],
    },
    pa: {
      about: "ਬੁਰਸ਼ ਜਾਂ ਫਲਾਸ ਕਰਦੇ ਸਮੇਂ ਮਸੂੜਿਆਂ ਵਿੱਚੋਂ ਖੂਨ ਆਉਣਾ ਮਸੂੜਿਆਂ ਦੀ ਸੋਜ ਦਾ ਇੱਕ ਆਮ ਸੰਕੇਤ ਹੈ, ਜੋ ਆਮ ਤੌਰ ’ਤੇ ਮਸੂੜਿਆਂ ਦੀ ਰੇਖਾ ’ਤੇ ਪਲੇਕ ਜੰਮਣ ਨਾਲ ਹੁੰਦੀ ਹੈ।",
      points: [
        "ਦੰਦਾਂ ’ਤੇ ਪਲੇਕ ਅਤੇ ਟਾਰਟਰ ਜੰਮਣਾ (ਜਿੰਜੀਵਾਈਟਿਸ)",
        "ਮਸੂੜਿਆਂ ਦੀ ਵੱਧ ਵਧੀ ਹੋਈ ਬਿਮਾਰੀ (ਪੀਰੀਓਡੌਂਟਾਈਟਿਸ)",
        "ਬਹੁਤ ਜ਼ੋਰ ਨਾਲ ਬੁਰਸ਼ ਕਰਨਾ, ਜਾਂ ਨਵਾਂ ਟੂਥਬ੍ਰਸ਼",
        "ਹਾਰਮੋਨ ਵਿੱਚ ਬਦਲਾਅ, ਜਿਸ ਵਿੱਚ ਗਰਭ ਅਵਸਥਾ ਵੀ ਸ਼ਾਮਲ ਹੈ",
        "ਖੂਨ ਦੀਆਂ ਕੁਝ ਬਿਮਾਰੀਆਂ, ਜਿਨ੍ਹਾਂ ਦੀ ਡਾਕਟਰ ਜਾਂਚ ਕਰ ਸਕਦੇ ਹਨ",
      ],
    },
  },
  {
    id: 'bad-breath',
    kind: 'symptom',
    phrases: ['bad breath', 'mouth odour', 'mouth odor', 'mouth smell', 'halitosis', 'smelly breath', 'breath smell'],
    en: {
      about: "Bad breath usually starts in the mouth, from bacteria on the teeth, gums and tongue.",
      points: [
        "Plaque, gum disease or cavities",
        "A coated tongue, or a dry mouth",
        "Smoking or chewing tobacco",
        "Sinus, throat or tonsil infections",
        "Less often, stomach or other conditions",
      ],
    },
    hi: {
      about: "मुंह की बदबू आमतौर पर मुंह से ही शुरू होती है, दांतों, मसूड़ों और जीभ पर मौजूद बैक्टीरिया से।",
      points: [
        "प्लाक, मसूड़ों की बीमारी या कैविटी",
        "जीभ पर परत जमना, या मुंह का सूखना",
        "धूम्रपान या तंबाकू चबाना",
        "साइनस, गले या टॉन्सिल के संक्रमण",
        "कम मामलों में, पेट या दूसरी बीमारियां",
      ],
    },
    pa: {
      about: "ਮੂੰਹ ਦੀ ਬਦਬੂ ਆਮ ਤੌਰ ’ਤੇ ਮੂੰਹ ਤੋਂ ਹੀ ਸ਼ੁਰੂ ਹੁੰਦੀ ਹੈ, ਦੰਦਾਂ, ਮਸੂੜਿਆਂ ਅਤੇ ਜੀਭ ’ਤੇ ਮੌਜੂਦ ਬੈਕਟੀਰੀਆ ਤੋਂ।",
      points: [
        "ਪਲੇਕ, ਮਸੂੜਿਆਂ ਦੀ ਬਿਮਾਰੀ ਜਾਂ ਕੈਵਿਟੀ",
        "ਜੀਭ ’ਤੇ ਪਰਤ ਜੰਮਣਾ, ਜਾਂ ਮੂੰਹ ਦਾ ਸੁੱਕਣਾ",
        "ਸਿਗਰਟਨੋਸ਼ੀ ਜਾਂ ਤੰਬਾਕੂ ਚਬਾਉਣਾ",
        "ਸਾਈਨਸ, ਗਲੇ ਜਾਂ ਟੌਨਸਿਲ ਦੀਆਂ ਲਾਗਾਂ",
        "ਘੱਟ ਮਾਮਲਿਆਂ ਵਿੱਚ, ਪੇਟ ਜਾਂ ਹੋਰ ਬਿਮਾਰੀਆਂ",
      ],
    },
  },
  {
    id: 'mouth-ulcer',
    kind: 'symptom',
    phrases: ['mouth ulcer', 'mouth ulcers', 'ulcer in mouth', 'mouth sores', 'canker sore', 'ulcers in mouth', 'sores in mouth', 'mouth blisters'],
    en: {
      about: "Mouth ulcers are small, painful sores inside the mouth. Most heal by themselves within a couple of weeks.",
      points: [
        "A bite or injury inside the mouth, or a sharp tooth edge",
        "Stress, tiredness or some foods",
        "Low levels of some vitamins or iron",
        "Viral infections",
        "Ulcers that do not heal in two weeks need to be seen",
      ],
    },
    hi: {
      about: "मुंह के छाले मुंह के अंदर के छोटे, दर्दनाक घाव होते हैं। ज़्यादातर छाले एक-दो हफ्ते में अपने आप ठीक हो जाते हैं।",
      points: [
        "मुंह के अंदर कटना या चोट लगना, या दांत का नुकीला किनारा",
        "तनाव, थकान या कुछ खाने की चीज़ें",
        "कुछ विटामिनों या आयरन की कमी",
        "वायरल संक्रमण",
        "जो छाले दो हफ्ते में ठीक न हों, उन्हें दिखवाना चाहिए",
      ],
    },
    pa: {
      about: "ਮੂੰਹ ਦੇ ਛਾਲੇ ਮੂੰਹ ਦੇ ਅੰਦਰ ਦੇ ਛੋਟੇ, ਦਰਦਨਾਕ ਜ਼ਖ਼ਮ ਹੁੰਦੇ ਹਨ। ਜ਼ਿਆਦਾਤਰ ਛਾਲੇ ਇੱਕ-ਦੋ ਹਫ਼ਤਿਆਂ ਵਿੱਚ ਆਪਣੇ ਆਪ ਠੀਕ ਹੋ ਜਾਂਦੇ ਹਨ।",
      points: [
        "ਮੂੰਹ ਦੇ ਅੰਦਰ ਕੱਟ ਜਾਂ ਸੱਟ ਲੱਗਣਾ, ਜਾਂ ਦੰਦ ਦਾ ਨੁਕੀਲਾ ਕਿਨਾਰਾ",
        "ਤਣਾਅ, ਥਕਾਵਟ ਜਾਂ ਕੁਝ ਖਾਣ ਦੀਆਂ ਚੀਜ਼ਾਂ",
        "ਕੁਝ ਵਿਟਾਮਿਨਾਂ ਜਾਂ ਆਇਰਨ ਦੀ ਕਮੀ",
        "ਵਾਇਰਲ ਲਾਗਾਂ",
        "ਜੋ ਛਾਲੇ ਦੋ ਹਫ਼ਤਿਆਂ ਵਿੱਚ ਠੀਕ ਨਾ ਹੋਣ, ਉਨ੍ਹਾਂ ਨੂੰ ਦਿਖਾਉਣਾ ਚਾਹੀਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'jaw-pain',
    kind: 'symptom',
    phrases: ['jaw pain', 'pain in jaw', 'jaw ache', 'jaw clicking', 'jaw pain while chewing', 'jaw stiffness'],
    en: {
      about: "Jaw pain is often from the jaw joint or the muscles used for chewing, or from a problem with the teeth.",
      points: [
        "Strain of the jaw joint (temporomandibular joint), with clicking or difficulty opening the mouth",
        "Teeth grinding or clenching, often during sleep",
        "A tooth or gum infection",
        "Sinus problems or an ear infection",
        "Injury to the face",
      ],
    },
    hi: {
      about: "जबड़े का दर्द अक्सर जबड़े के जोड़ या चबाने की मांसपेशियों से, या दांतों की किसी समस्या से होता है।",
      points: [
        "जबड़े के जोड़ (टेम्पोरोमैंडिबुलर जॉइंट) में खिंचाव, जिसमें खट-खट की आवाज़ या मुंह खोलने में दिक्कत होती है",
        "दांत पीसना या भींचना, अक्सर नींद में",
        "दांत या मसूड़े का संक्रमण",
        "साइनस की समस्या या कान का संक्रमण",
        "चेहरे पर चोट",
      ],
    },
    pa: {
      about: "ਜਬਾੜੇ ਦਾ ਦਰਦ ਅਕਸਰ ਜਬਾੜੇ ਦੇ ਜੋੜ ਜਾਂ ਚਬਾਉਣ ਦੀਆਂ ਮਾਸਪੇਸ਼ੀਆਂ ਤੋਂ, ਜਾਂ ਦੰਦਾਂ ਦੀ ਕਿਸੇ ਸਮੱਸਿਆ ਤੋਂ ਹੁੰਦਾ ਹੈ।",
      points: [
        "ਜਬਾੜੇ ਦੇ ਜੋੜ (ਟੈਂਪੋਰੋਮੈਂਡੀਬੁਲਰ ਜੁਆਇੰਟ) ਵਿੱਚ ਖਿਚਾਅ, ਜਿਸ ਵਿੱਚ ਖਟ-ਖਟ ਦੀ ਆਵਾਜ਼ ਜਾਂ ਮੂੰਹ ਖੋਲ੍ਹਣ ਵਿੱਚ ਦਿੱਕਤ ਹੁੰਦੀ ਹੈ",
        "ਦੰਦ ਪੀਸਣਾ ਜਾਂ ਭੀਂਚਣਾ, ਅਕਸਰ ਨੀਂਦ ਵਿੱਚ",
        "ਦੰਦ ਜਾਂ ਮਸੂੜੇ ਦੀ ਲਾਗ",
        "ਸਾਈਨਸ ਦੀ ਸਮੱਸਿਆ ਜਾਂ ਕੰਨ ਦੀ ਲਾਗ",
        "ਚਿਹਰੇ ’ਤੇ ਸੱਟ",
      ],
    },
  },
  {
    id: 'ear-pain',
    kind: 'symptom',
    phrases: ['ear pain', 'earache', 'ear ache', 'pain in ear', 'pain in ears', 'ear hurts', 'ears pain'],
    en: {
      about: "Ear pain can start in the ear itself, or come from nearby areas such as the jaw, teeth or throat.",
      points: [
        "An ear infection, in the outer or the middle ear",
        "Wax building up and blocking the ear",
        "Pressure changes, such as flying, or a blocked ear during a cold",
        "A tooth or jaw problem, or a sore throat",
        "Water trapped in the ear after swimming or bathing",
      ],
    },
    hi: {
      about: "कान का दर्द कान में ही शुरू हो सकता है, या आसपास के हिस्सों जैसे जबड़े, दांतों या गले से आ सकता है।",
      points: [
        "कान का संक्रमण, बाहरी या बीच के कान में",
        "मैल (वैक्स) जमकर कान को बंद कर देना",
        "दबाव में बदलाव, जैसे हवाई सफ़र, या सर्दी के दौरान कान बंद होना",
        "दांत या जबड़े की समस्या, या गले की खराश",
        "तैरने या नहाने के बाद कान में पानी फंस जाना",
      ],
    },
    pa: {
      about: "ਕੰਨ ਦਾ ਦਰਦ ਕੰਨ ਵਿੱਚ ਹੀ ਸ਼ੁਰੂ ਹੋ ਸਕਦਾ ਹੈ, ਜਾਂ ਆਲੇ-ਦੁਆਲੇ ਦੇ ਹਿੱਸਿਆਂ ਜਿਵੇਂ ਜਬਾੜੇ, ਦੰਦਾਂ ਜਾਂ ਗਲੇ ਤੋਂ ਆ ਸਕਦਾ ਹੈ।",
      points: [
        "ਕੰਨ ਦੀ ਲਾਗ, ਬਾਹਰੀ ਜਾਂ ਵਿਚਕਾਰਲੇ ਕੰਨ ਵਿੱਚ",
        "ਮੈਲ (ਵੈਕਸ) ਜੰਮ ਕੇ ਕੰਨ ਨੂੰ ਬੰਦ ਕਰ ਦੇਣਾ",
        "ਦਬਾਅ ਵਿੱਚ ਬਦਲਾਅ, ਜਿਵੇਂ ਹਵਾਈ ਸਫ਼ਰ, ਜਾਂ ਜ਼ੁਕਾਮ ਦੌਰਾਨ ਕੰਨ ਬੰਦ ਹੋਣਾ",
        "ਦੰਦ ਜਾਂ ਜਬਾੜੇ ਦੀ ਸਮੱਸਿਆ, ਜਾਂ ਗਲੇ ਦੀ ਖ਼ਰਾਸ਼",
        "ਤੈਰਨ ਜਾਂ ਨਹਾਉਣ ਤੋਂ ਬਾਅਦ ਕੰਨ ਵਿੱਚ ਪਾਣੀ ਫਸ ਜਾਣਾ",
      ],
    },
  },
  {
    id: 'ear-discharge',
    kind: 'symptom',
    phrases: ['ear discharge', 'discharge from ear', 'pus in ear', 'ear leaking', 'ear pus', 'fluid from ear', 'water from ear', 'kaan se pani'],
    en: {
      about: "Fluid coming out of the ear can be clear, yellow, bloody or have pus. It means something is irritating, infected or has injured the ear.",
      points: [
        "An infection of the outer ear canal",
        "A middle-ear infection with a hole in the eardrum",
        "A scratch or injury, including from cleaning the ear with sticks",
        "Water in the ear",
        "Wax, or something stuck in the ear",
      ],
    },
    hi: {
      about: "कान से निकलने वाला तरल साफ़, पीला, खूनी या मवाद वाला हो सकता है। इसका मतलब है कि कान में कुछ जलन, संक्रमण या चोट है।",
      points: [
        "बाहरी कान की नली का संक्रमण",
        "बीच के कान का संक्रमण, जिसमें कान के पर्दे में छेद हो जाता है",
        "खरोंच या चोट, जिसमें तीली से कान साफ़ करना भी शामिल है",
        "कान में पानी",
        "मैल, या कान में कुछ फंस जाना",
      ],
    },
    pa: {
      about: "ਕੰਨ ਵਿੱਚੋਂ ਨਿਕਲਣ ਵਾਲਾ ਤਰਲ ਸਾਫ਼, ਪੀਲਾ, ਖੂਨੀ ਜਾਂ ਪੀਕ ਵਾਲਾ ਹੋ ਸਕਦਾ ਹੈ। ਇਸ ਦਾ ਮਤਲਬ ਹੈ ਕਿ ਕੰਨ ਵਿੱਚ ਕੁਝ ਜਲਨ, ਲਾਗ ਜਾਂ ਸੱਟ ਹੈ।",
      points: [
        "ਬਾਹਰੀ ਕੰਨ ਦੀ ਨਲੀ ਦੀ ਲਾਗ",
        "ਵਿਚਕਾਰਲੇ ਕੰਨ ਦੀ ਲਾਗ, ਜਿਸ ਵਿੱਚ ਕੰਨ ਦੇ ਪਰਦੇ ਵਿੱਚ ਛੇਕ ਹੋ ਜਾਂਦਾ ਹੈ",
        "ਖਰੋਚ ਜਾਂ ਸੱਟ, ਜਿਸ ਵਿੱਚ ਤੀਲੀ ਨਾਲ ਕੰਨ ਸਾਫ਼ ਕਰਨਾ ਵੀ ਸ਼ਾਮਲ ਹੈ",
        "ਕੰਨ ਵਿੱਚ ਪਾਣੀ",
        "ਮੈਲ, ਜਾਂ ਕੰਨ ਵਿੱਚ ਕੁਝ ਫਸ ਜਾਣਾ",
      ],
    },
  },
  {
    id: 'hearing-loss',
    kind: 'symptom',
    phrases: ['hearing loss', 'cannot hear properly', 'difficulty hearing', 'hard of hearing', 'deafness', 'poor hearing', 'reduced hearing', 'less hearing', 'cant hear', 'not hearing well', 'kam sunai dena'],
    en: {
      about: "Hearing loss is trouble hearing sounds or following speech. It can come on slowly or suddenly, in one ear or both.",
      points: [
        "Wax blocking the ear canal",
        "Ear infection or fluid behind the eardrum",
        "Ageing of the inner ear, or long exposure to loud noise",
        "Injury to the ear or the eardrum",
        "Problems with the nerve of hearing, which need testing",
      ],
    },
    hi: {
      about: "सुनने में कमी का मतलब है आवाज़ें सुनने या बात समझने में परेशानी। यह धीरे-धीरे या अचानक हो सकती है, एक कान में या दोनों में।",
      points: [
        "मैल का कान की नली को बंद कर देना",
        "कान का संक्रमण या कान के पर्दे के पीछे तरल जमा होना",
        "अंदरूनी कान की उम्र बढ़ना, या तेज़ आवाज़ के लंबे संपर्क में रहना",
        "कान या कान के पर्दे में चोट",
        "सुनने की नस की समस्याएं, जिनकी जांच ज़रूरी है",
      ],
    },
    pa: {
      about: "ਸੁਣਨ ਵਿੱਚ ਕਮੀ ਦਾ ਮਤਲਬ ਹੈ ਆਵਾਜ਼ਾਂ ਸੁਣਨ ਜਾਂ ਗੱਲ ਸਮਝਣ ਵਿੱਚ ਪਰੇਸ਼ਾਨੀ। ਇਹ ਹੌਲੀ-ਹੌਲੀ ਜਾਂ ਅਚਾਨਕ ਹੋ ਸਕਦੀ ਹੈ, ਇੱਕ ਕੰਨ ਵਿੱਚ ਜਾਂ ਦੋਵਾਂ ਵਿੱਚ।",
      points: [
        "ਮੈਲ ਦਾ ਕੰਨ ਦੀ ਨਲੀ ਨੂੰ ਬੰਦ ਕਰ ਦੇਣਾ",
        "ਕੰਨ ਦੀ ਲਾਗ ਜਾਂ ਕੰਨ ਦੇ ਪਰਦੇ ਪਿੱਛੇ ਤਰਲ ਜਮ੍ਹਾ ਹੋਣਾ",
        "ਅੰਦਰਲੇ ਕੰਨ ਦੀ ਉਮਰ ਵਧਣਾ, ਜਾਂ ਤੇਜ਼ ਆਵਾਜ਼ ਦੇ ਲੰਮੇ ਸੰਪਰਕ ਵਿੱਚ ਰਹਿਣਾ",
        "ਕੰਨ ਜਾਂ ਕੰਨ ਦੇ ਪਰਦੇ ਵਿੱਚ ਸੱਟ",
        "ਸੁਣਨ ਦੀ ਨਾੜੀ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ, ਜਿਨ੍ਹਾਂ ਦੀ ਜਾਂਚ ਜ਼ਰੂਰੀ ਹੈ",
      ],
    },
  },
  {
    id: 'ringing-in-ears',
    kind: 'symptom',
    phrases: ['ringing in ears', 'tinnitus', 'buzzing in ears', 'ear ringing', 'ringing in the ears', 'noise in ears', 'ears ringing'],
    en: {
      about: "Ringing, buzzing or hissing in the ears (tinnitus) is hearing a sound that no one else can hear. It is common and is often linked to the hearing system.",
      points: [
        "Exposure to loud noise",
        "Hearing loss, including with age",
        "Wax or an ear infection",
        "Stress and poor sleep, which can make it more noticeable",
        "Some conditions of the ear, neck or blood vessels, which a doctor can check",
      ],
    },
    hi: {
      about: "कानों में घंटी बजना, भनभनाहट या सीटी जैसी आवाज़ (टिनिटस) का मतलब है ऐसी आवाज़ सुनना जो और कोई नहीं सुन सकता। यह आम है और अक्सर सुनने की प्रणाली से जुड़ी होती है।",
      points: [
        "तेज़ आवाज़ के संपर्क में आना",
        "सुनने में कमी, जिसमें उम्र के साथ होने वाली कमी भी शामिल है",
        "मैल या कान का संक्रमण",
        "तनाव और कम नींद, जिनसे यह ज़्यादा महसूस हो सकती है",
        "कान, गर्दन या खून की नलियों की कुछ समस्याएं, जिन्हें डॉक्टर जांच सकते हैं",
      ],
    },
    pa: {
      about: "ਕੰਨਾਂ ਵਿੱਚ ਘੰਟੀ ਵੱਜਣਾ, ਭਿਣਭਿਣਾਹਟ ਜਾਂ ਸੀਟੀ ਵਰਗੀ ਆਵਾਜ਼ (ਟਿਨਾਈਟਸ) ਦਾ ਮਤਲਬ ਹੈ ਅਜਿਹੀ ਆਵਾਜ਼ ਸੁਣਨਾ ਜੋ ਹੋਰ ਕੋਈ ਨਹੀਂ ਸੁਣ ਸਕਦਾ। ਇਹ ਆਮ ਹੈ ਅਤੇ ਅਕਸਰ ਸੁਣਨ ਦੀ ਪ੍ਰਣਾਲੀ ਨਾਲ ਜੁੜੀ ਹੁੰਦੀ ਹੈ।",
      points: [
        "ਤੇਜ਼ ਆਵਾਜ਼ ਦੇ ਸੰਪਰਕ ਵਿੱਚ ਆਉਣਾ",
        "ਸੁਣਨ ਵਿੱਚ ਕਮੀ, ਜਿਸ ਵਿੱਚ ਉਮਰ ਨਾਲ ਹੋਣ ਵਾਲੀ ਕਮੀ ਵੀ ਸ਼ਾਮਲ ਹੈ",
        "ਮੈਲ ਜਾਂ ਕੰਨ ਦੀ ਲਾਗ",
        "ਤਣਾਅ ਅਤੇ ਘੱਟ ਨੀਂਦ, ਜਿਨ੍ਹਾਂ ਨਾਲ ਇਹ ਵੱਧ ਮਹਿਸੂਸ ਹੋ ਸਕਦੀ ਹੈ",
        "ਕੰਨ, ਗਰਦਨ ਜਾਂ ਖੂਨ ਦੀਆਂ ਨਾੜੀਆਂ ਦੀਆਂ ਕੁਝ ਸਮੱਸਿਆਵਾਂ, ਜਿਨ੍ਹਾਂ ਦੀ ਡਾਕਟਰ ਜਾਂਚ ਕਰ ਸਕਦੇ ਹਨ",
      ],
    },
  },
  {
    id: 'nosebleed',
    kind: 'symptom',
    phrases: ['nosebleed', 'nose bleed', 'bleeding from nose', 'nose bleeding', 'blood from nose', 'bleeding nose', 'nose bleeds'],
    en: {
      about: "A nosebleed is bleeding from the lining of the nose. It looks frightening but is usually from small blood vessels near the surface that break easily.",
      points: [
        "Dry air, or picking or blowing the nose hard",
        "A cold, allergy or sinus infection",
        "An injury to the nose",
        "High blood pressure in some people",
        "Conditions that make bleeding more likely",
      ],
    },
    hi: {
      about: "नाक से खून आना नाक की परत से खून निकलना है। यह डरावना लगता है, लेकिन आमतौर पर सतह के पास की छोटी खून की नलियां आसानी से टूटने के कारण होता है।",
      points: [
        "सूखी हवा, या नाक कुरेदना या ज़ोर से नाक छिनकना",
        "सर्दी, एलर्जी या साइनस का संक्रमण",
        "नाक में चोट",
        "कुछ लोगों में हाई ब्लड प्रेशर",
        "ऐसी स्थितियां जिनमें खून बहने की संभावना ज़्यादा होती है",
      ],
    },
    pa: {
      about: "ਨੱਕ ਵਿੱਚੋਂ ਖੂਨ ਆਉਣਾ ਨੱਕ ਦੀ ਪਰਤ ਵਿੱਚੋਂ ਖੂਨ ਨਿਕਲਣਾ ਹੈ। ਇਹ ਡਰਾਉਣਾ ਲੱਗਦਾ ਹੈ, ਪਰ ਆਮ ਤੌਰ ’ਤੇ ਸਤ੍ਹਾ ਦੇ ਨੇੜੇ ਦੀਆਂ ਛੋਟੀਆਂ ਖੂਨ ਦੀਆਂ ਨਾੜੀਆਂ ਦੇ ਆਸਾਨੀ ਨਾਲ ਟੁੱਟਣ ਕਰਕੇ ਹੁੰਦਾ ਹੈ।",
      points: [
        "ਸੁੱਕੀ ਹਵਾ, ਜਾਂ ਨੱਕ ਕੁਰੇਦਣਾ ਜਾਂ ਜ਼ੋਰ ਨਾਲ ਨੱਕ ਸਾਫ਼ ਕਰਨਾ",
        "ਜ਼ੁਕਾਮ, ਐਲਰਜੀ ਜਾਂ ਸਾਈਨਸ ਦੀ ਲਾਗ",
        "ਨੱਕ ਵਿੱਚ ਸੱਟ",
        "ਕੁਝ ਲੋਕਾਂ ਵਿੱਚ ਹਾਈ ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ",
        "ਅਜਿਹੀਆਂ ਸਥਿਤੀਆਂ ਜਿਨ੍ਹਾਂ ਵਿੱਚ ਖੂਨ ਵਗਣ ਦੀ ਸੰਭਾਵਨਾ ਵੱਧ ਹੁੰਦੀ ਹੈ",
      ],
    },
  },
  {
    id: 'eye-pain',
    kind: 'symptom',
    phrases: ['eye pain', 'pain in eye', 'pain in eyes', 'eyes pain', 'eye ache', 'eyes hurt', 'eye hurts', 'aankh dard', 'aankh me dard', 'आंख दर्द', 'आंख में दर्द', 'आँख दर्द', 'ਅੱਖ ਦਰਦ', 'ਅੱਖ ਦਾ ਦਰਦ'],
    en: {
      about: "Eye pain can mean a problem on the surface of the eye, or deeper inside the eye or behind it. It is worth taking seriously, especially with changes in vision.",
      points: [
        "A scratch or something in the eye",
        "Infection or inflammation, such as pink eye",
        "Dry or strained eyes from long screen time",
        "Raised pressure inside the eye (glaucoma)",
        "Headache or sinus problems felt around the eye",
      ],
    },
    hi: {
      about: "आंख के दर्द का मतलब आंख की सतह पर कोई समस्या हो सकता है, या आंख के अंदर गहराई में या उसके पीछे। इसे गंभीरता से लेना चाहिए, खासकर जब देखने में बदलाव हो।",
      points: [
        "आंख में खरोंच या कुछ पड़ जाना",
        "संक्रमण या सूजन, जैसे आंख आना",
        "लंबे समय तक स्क्रीन देखने से आंखों का सूखना या थकना",
        "आंख के अंदर दबाव का बढ़ना (ग्लूकोमा)",
        "सिरदर्द या साइनस की समस्या जो आंख के आसपास महसूस हो",
      ],
    },
    pa: {
      about: "ਅੱਖ ਦੇ ਦਰਦ ਦਾ ਮਤਲਬ ਅੱਖ ਦੀ ਸਤ੍ਹਾ ’ਤੇ ਕੋਈ ਸਮੱਸਿਆ ਹੋ ਸਕਦਾ ਹੈ, ਜਾਂ ਅੱਖ ਦੇ ਅੰਦਰ ਡੂੰਘਾਈ ਵਿੱਚ ਜਾਂ ਉਸ ਦੇ ਪਿੱਛੇ। ਇਸ ਨੂੰ ਗੰਭੀਰਤਾ ਨਾਲ ਲੈਣਾ ਚਾਹੀਦਾ ਹੈ, ਖ਼ਾਸ ਕਰਕੇ ਜਦੋਂ ਦੇਖਣ ਵਿੱਚ ਬਦਲਾਅ ਹੋਵੇ।",
      points: [
        "ਅੱਖ ਵਿੱਚ ਖਰੋਚ ਜਾਂ ਕੁਝ ਪੈ ਜਾਣਾ",
        "ਲਾਗ ਜਾਂ ਸੋਜ, ਜਿਵੇਂ ਅੱਖ ਆਉਣਾ",
        "ਲੰਮੇ ਸਮੇਂ ਤੱਕ ਸਕ੍ਰੀਨ ਦੇਖਣ ਨਾਲ ਅੱਖਾਂ ਦਾ ਸੁੱਕਣਾ ਜਾਂ ਥੱਕਣਾ",
        "ਅੱਖ ਦੇ ਅੰਦਰ ਦਬਾਅ ਦਾ ਵਧਣਾ (ਗਲੂਕੋਮਾ)",
        "ਸਿਰ ਦਰਦ ਜਾਂ ਸਾਈਨਸ ਦੀ ਸਮੱਸਿਆ ਜੋ ਅੱਖ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਮਹਿਸੂਸ ਹੋਵੇ",
      ],
    },
  },
  {
    id: 'red-eyes',
    kind: 'symptom',
    phrases: ['red eyes', 'red eye', 'eye redness', 'bloodshot eyes', 'eyes red', 'redness in eyes', 'aankh lal', 'aankhen lal', 'आंखें लाल', 'आँखें लाल', 'आंख लाल', 'ਅੱਖਾਂ ਲਾਲ'],
    en: {
      about: "Red eyes happen when the small blood vessels on the surface of the eye widen. It is often harmless, but it can also be a sign of infection or inflammation.",
      points: [
        "Infection of the eye lining (conjunctivitis, or pink eye)",
        "Allergies, dust or smoke",
        "Dry or tired eyes, or wearing contact lenses for long",
        "Lack of sleep",
        "A scratch or something in the eye",
      ],
    },
    hi: {
      about: "आंखें लाल तब होती हैं जब आंख की सतह की छोटी खून की नलियां फैल जाती हैं। यह अक्सर नुकसानदेह नहीं होता, लेकिन यह संक्रमण या सूजन का संकेत भी हो सकता है।",
      points: [
        "आंख की परत का संक्रमण (कंजंक्टिवाइटिस, यानी आंख आना)",
        "एलर्जी, धूल या धुआं",
        "आंखों का सूखना या थकना, या कॉन्टैक्ट लेंस ज़्यादा देर पहनना",
        "नींद की कमी",
        "आंख में खरोंच या कुछ पड़ जाना",
      ],
    },
    pa: {
      about: "ਅੱਖਾਂ ਲਾਲ ਉਦੋਂ ਹੁੰਦੀਆਂ ਹਨ ਜਦੋਂ ਅੱਖ ਦੀ ਸਤ੍ਹਾ ਦੀਆਂ ਛੋਟੀਆਂ ਖੂਨ ਦੀਆਂ ਨਾੜੀਆਂ ਫੈਲ ਜਾਂਦੀਆਂ ਹਨ। ਇਹ ਅਕਸਰ ਨੁਕਸਾਨਦੇਹ ਨਹੀਂ ਹੁੰਦਾ, ਪਰ ਇਹ ਲਾਗ ਜਾਂ ਸੋਜ ਦਾ ਸੰਕੇਤ ਵੀ ਹੋ ਸਕਦਾ ਹੈ।",
      points: [
        "ਅੱਖ ਦੀ ਪਰਤ ਦੀ ਲਾਗ (ਕੰਜਕਟਿਵਾਈਟਿਸ, ਯਾਨੀ ਅੱਖ ਆਉਣਾ)",
        "ਐਲਰਜੀ, ਧੂੜ ਜਾਂ ਧੂੰਆਂ",
        "ਅੱਖਾਂ ਦਾ ਸੁੱਕਣਾ ਜਾਂ ਥੱਕਣਾ, ਜਾਂ ਕੌਂਟੈਕਟ ਲੈਂਜ਼ ਜ਼ਿਆਦਾ ਦੇਰ ਪਾਉਣਾ",
        "ਨੀਂਦ ਦੀ ਕਮੀ",
        "ਅੱਖ ਵਿੱਚ ਖਰੋਚ ਜਾਂ ਕੁਝ ਪੈ ਜਾਣਾ",
      ],
    },
  },
  {
    id: 'watery-eyes',
    kind: 'symptom',
    phrases: ['watery eyes', 'eye watering', 'tearing eyes', 'eyes watering', 'watering eyes', 'water from eyes', 'excessive tearing'],
    en: {
      about: "Watery eyes mean tears are being made too much, or are not draining away properly.",
      points: [
        "Allergies, dust, wind or smoke irritating the eyes",
        "A cold or an eye infection",
        "A blocked tear duct, which can happen in babies and adults",
        "Dry eyes, which can make the eyes water in response",
        "An eyelash turning in, or something in the eye",
      ],
    },
    hi: {
      about: "आंखों से पानी आने का मतलब है कि आंसू ज़्यादा बन रहे हैं, या ठीक से बाहर नहीं निकल रहे।",
      points: [
        "एलर्जी, धूल, हवा या धुआं जो आंखों में जलन करे",
        "सर्दी या आंख का संक्रमण",
        "आंसू की नली का बंद होना, जो बच्चों और बड़ों दोनों में हो सकता है",
        "आंखों का सूखना, जिसके जवाब में आंखों से पानी आ सकता है",
        "पलक के बाल का अंदर मुड़ना, या आंख में कुछ पड़ना",
      ],
    },
    pa: {
      about: "ਅੱਖਾਂ ਵਿੱਚੋਂ ਪਾਣੀ ਆਉਣ ਦਾ ਮਤਲਬ ਹੈ ਕਿ ਅੰਝੂ ਜ਼ਿਆਦਾ ਬਣ ਰਹੇ ਹਨ, ਜਾਂ ਠੀਕ ਤਰ੍ਹਾਂ ਬਾਹਰ ਨਹੀਂ ਨਿਕਲ ਰਹੇ।",
      points: [
        "ਐਲਰਜੀ, ਧੂੜ, ਹਵਾ ਜਾਂ ਧੂੰਆਂ ਜੋ ਅੱਖਾਂ ਵਿੱਚ ਜਲਨ ਕਰੇ",
        "ਜ਼ੁਕਾਮ ਜਾਂ ਅੱਖ ਦੀ ਲਾਗ",
        "ਅੰਝੂ ਦੀ ਨਲੀ ਦਾ ਬੰਦ ਹੋਣਾ, ਜੋ ਬੱਚਿਆਂ ਅਤੇ ਵੱਡਿਆਂ ਦੋਵਾਂ ਵਿੱਚ ਹੋ ਸਕਦਾ ਹੈ",
        "ਅੱਖਾਂ ਦਾ ਸੁੱਕਣਾ, ਜਿਸ ਦੇ ਜਵਾਬ ਵਿੱਚ ਅੱਖਾਂ ਵਿੱਚੋਂ ਪਾਣੀ ਆ ਸਕਦਾ ਹੈ",
        "ਪਲਕ ਦੇ ਵਾਲ ਦਾ ਅੰਦਰ ਮੁੜਨਾ, ਜਾਂ ਅੱਖ ਵਿੱਚ ਕੁਝ ਪੈਣਾ",
      ],
    },
  },
  {
    id: 'blurred-vision',
    kind: 'symptom',
    phrases: ['blurred vision', 'blurry vision', 'cannot see clearly', 'poor vision', 'vision problem', 'dim vision', 'weak eyesight', 'reduced vision', 'blurry eyes', 'difficulty seeing', 'cant see clearly', 'low vision', 'kam dikhai deta hai'],
    en: {
      about: "Blurred vision is when things look out of focus, hazy or unclear. It can come on slowly or suddenly.",
      points: [
        "A need for glasses, or a change in the glasses number",
        "Cataract, which clouds the lens of the eye",
        "Dry or tired eyes from long screen time",
        "Diabetes or high blood pressure affecting the eyes",
        "Raised pressure in the eye, or problems with the back of the eye, which need an eye check",
      ],
    },
    hi: {
      about: "धुंधला दिखना तब होता है जब चीज़ें फ़ोकस से बाहर, धुंधली या अस्पष्ट दिखती हैं। यह धीरे-धीरे या अचानक हो सकता है।",
      points: [
        "चश्मे की ज़रूरत, या चश्मे के नंबर में बदलाव",
        "मोतियाबिंद, जिसमें आंख का लेंस धुंधला हो जाता है",
        "लंबे समय तक स्क्रीन देखने से आंखों का सूखना या थकना",
        "डायबिटीज़ या हाई ब्लड प्रेशर का आंखों पर असर",
        "आंख में दबाव का बढ़ना, या आंख के पिछले हिस्से की समस्याएं, जिनके लिए आंखों की जांच ज़रूरी है",
      ],
    },
    pa: {
      about: "ਧੁੰਦਲਾ ਦਿਖਣਾ ਉਦੋਂ ਹੁੰਦਾ ਹੈ ਜਦੋਂ ਚੀਜ਼ਾਂ ਫੋਕਸ ਤੋਂ ਬਾਹਰ, ਧੁੰਦਲੀਆਂ ਜਾਂ ਅਸਪਸ਼ਟ ਦਿਖਦੀਆਂ ਹਨ। ਇਹ ਹੌਲੀ-ਹੌਲੀ ਜਾਂ ਅਚਾਨਕ ਹੋ ਸਕਦਾ ਹੈ।",
      points: [
        "ਐਨਕ ਦੀ ਲੋੜ, ਜਾਂ ਐਨਕ ਦੇ ਨੰਬਰ ਵਿੱਚ ਬਦਲਾਅ",
        "ਮੋਤੀਆਬਿੰਦ, ਜਿਸ ਵਿੱਚ ਅੱਖ ਦਾ ਲੈਂਜ਼ ਧੁੰਦਲਾ ਹੋ ਜਾਂਦਾ ਹੈ",
        "ਲੰਮੇ ਸਮੇਂ ਤੱਕ ਸਕ੍ਰੀਨ ਦੇਖਣ ਨਾਲ ਅੱਖਾਂ ਦਾ ਸੁੱਕਣਾ ਜਾਂ ਥੱਕਣਾ",
        "ਸ਼ੂਗਰ ਜਾਂ ਹਾਈ ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ ਦਾ ਅੱਖਾਂ ’ਤੇ ਅਸਰ",
        "ਅੱਖ ਵਿੱਚ ਦਬਾਅ ਦਾ ਵਧਣਾ, ਜਾਂ ਅੱਖ ਦੇ ਪਿਛਲੇ ਹਿੱਸੇ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ, ਜਿਨ੍ਹਾਂ ਲਈ ਅੱਖਾਂ ਦੀ ਜਾਂਚ ਜ਼ਰੂਰੀ ਹੈ",
      ],
    },
  },
]
