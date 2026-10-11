// lib/search/descriptions/conditions-c.ts
//
// Overviews of women's health, childbirth, newborn and children's care, kidney and urinary conditions. DRAFT: not yet
// reviewed by a LIMS doctor (see types.ts). Hindi and Punjabi are drafts of the English. No medicine, dose, home
// remedy or cure appears in any of them.

import type { DescriptionEntry } from '@/lib/search/descriptions/types'

export const CONDITIONS_C: DescriptionEntry[] = [
  {
    id: 'pcos',
    kind: 'condition',
    phrases: ['pcos', 'pcod', 'polycystic ovary syndrome', 'polycystic ovaries', 'polycystic ovary disease', 'pcos problem', 'पीसीओएस', 'ਪੀਸੀਓਐਸ'],
    en: {
      about: "PCOS (polycystic ovary syndrome) is a common hormone condition in women. It can make periods irregular, and the ovaries may show many small follicles on a scan.",
      points: [
        "Common signs: irregular or missed periods, extra hair on the face or body, acne and weight gain",
        "It can make it harder to get pregnant, but many women with PCOS conceive with care",
        "It is linked to insulin resistance and a higher risk of diabetes later",
        "A doctor decides using the history, an examination, blood tests and an ultrasound",
      ],
    },
    hi: {
      about: "पीसीओएस (पॉलिसिस्टिक ओवरी सिंड्रोम) महिलाओं में एक आम हार्मोन की स्थिति है। इससे माहवारी अनियमित हो सकती है, और स्कैन में अंडाशय में कई छोटे फॉलिकल दिख सकते हैं।",
      points: [
        "आम संकेत: अनियमित या छूटती माहवारी, चेहरे या शरीर पर ज़्यादा बाल, मुंहासे और वज़न बढ़ना",
        "इससे गर्भ ठहरना मुश्किल हो सकता है, लेकिन पीसीओएस वाली कई महिलाएं देखभाल से गर्भवती होती हैं",
        "यह इंसुलिन प्रतिरोध और आगे चलकर डायबिटीज़ के ज़्यादा खतरे से जुड़ा है",
        "डॉक्टर इतिहास, जांच, खून की जांच और अल्ट्रासाउंड से तय करते हैं",
      ],
    },
    pa: {
      about: "ਪੀਸੀਓਐਸ (ਪੌਲੀਸਿਸਟਿਕ ਓਵਰੀ ਸਿੰਡਰੋਮ) ਔਰਤਾਂ ਵਿੱਚ ਇੱਕ ਆਮ ਹਾਰਮੋਨ ਦੀ ਸਥਿਤੀ ਹੈ। ਇਸ ਨਾਲ ਮਾਹਵਾਰੀ ਬੇਨਿਯਮੀ ਹੋ ਸਕਦੀ ਹੈ, ਅਤੇ ਸਕੈਨ ਵਿੱਚ ਅੰਡਕੋਸ਼ ਵਿੱਚ ਕਈ ਛੋਟੇ ਫੌਲਿਕਲ ਦਿਖ ਸਕਦੇ ਹਨ।",
      points: [
        "ਆਮ ਸੰਕੇਤ: ਬੇਨਿਯਮੀ ਜਾਂ ਛੁੱਟਦੀ ਮਾਹਵਾਰੀ, ਚਿਹਰੇ ਜਾਂ ਸਰੀਰ ’ਤੇ ਵੱਧ ਵਾਲ, ਮੁਹਾਸੇ ਅਤੇ ਭਾਰ ਵਧਣਾ",
        "ਇਸ ਨਾਲ ਗਰਭ ਠਹਿਰਨਾ ਔਖਾ ਹੋ ਸਕਦਾ ਹੈ, ਪਰ ਪੀਸੀਓਐਸ ਵਾਲੀਆਂ ਕਈ ਔਰਤਾਂ ਦੇਖਭਾਲ ਨਾਲ ਗਰਭਵਤੀ ਹੁੰਦੀਆਂ ਹਨ",
        "ਇਹ ਇਨਸੁਲਿਨ ਪ੍ਰਤੀਰੋਧ ਅਤੇ ਅੱਗੇ ਚੱਲ ਕੇ ਸ਼ੂਗਰ ਦੇ ਵੱਧ ਖ਼ਤਰੇ ਨਾਲ ਜੁੜਿਆ ਹੈ",
        "ਡਾਕਟਰ ਇਤਿਹਾਸ, ਜਾਂਚ, ਖੂਨ ਦੀ ਜਾਂਚ ਅਤੇ ਅਲਟਰਾਸਾਊਂਡ ਨਾਲ ਤੈਅ ਕਰਦੇ ਹਨ",
      ],
    },
  },
  {
    id: 'menopause',
    kind: 'condition',
    phrases: ['menopause', 'menopausal', 'hot flushes', 'hot flashes', 'change of life', 'periods stopped', 'perimenopause', 'मेनोपॉज', 'ਮੀਨੋਪੌਜ਼'],
    en: {
      about: "Menopause is when periods stop for good, usually between the ages of 45 and 55. It is a natural stage of life, not an illness.",
      points: [
        "The years before it (perimenopause) can bring irregular periods, hot flushes, night sweats and mood changes",
        "Sleep trouble, a dry vagina and aching joints are also common",
        "Bones become thinner after menopause, so bone health matters",
        "A doctor can help with symptoms that affect daily life",
      ],
    },
    hi: {
      about: "मेनोपॉज़ वह समय है जब माहवारी हमेशा के लिए बंद हो जाती है, आमतौर पर 45 से 55 साल की उम्र के बीच। यह जीवन का एक स्वाभाविक चरण है, बीमारी नहीं।",
      points: [
        "इससे पहले के साल (पेरीमेनोपॉज़) में अनियमित माहवारी, गर्मी की लहरें, रात में पसीना और मूड में बदलाव हो सकते हैं",
        "नींद की दिक्कत, योनि का सूखापन और जोड़ों का दर्द भी आम हैं",
        "मेनोपॉज़ के बाद हड्डियां पतली होती हैं, इसलिए हड्डियों की सेहत मायने रखती है",
        "रोज़मर्रा की ज़िंदगी पर असर डालने वाले लक्षणों में डॉक्टर मदद कर सकते हैं",
      ],
    },
    pa: {
      about: "ਮੀਨੋਪੌਜ਼ ਉਹ ਸਮਾਂ ਹੈ ਜਦੋਂ ਮਾਹਵਾਰੀ ਹਮੇਸ਼ਾ ਲਈ ਬੰਦ ਹੋ ਜਾਂਦੀ ਹੈ, ਆਮ ਤੌਰ ’ਤੇ 45 ਤੋਂ 55 ਸਾਲ ਦੀ ਉਮਰ ਵਿਚਕਾਰ। ਇਹ ਜ਼ਿੰਦਗੀ ਦਾ ਇੱਕ ਕੁਦਰਤੀ ਪੜਾਅ ਹੈ, ਬਿਮਾਰੀ ਨਹੀਂ।",
      points: [
        "ਇਸ ਤੋਂ ਪਹਿਲਾਂ ਦੇ ਸਾਲਾਂ (ਪੈਰੀਮੀਨੋਪੌਜ਼) ਵਿੱਚ ਬੇਨਿਯਮੀ ਮਾਹਵਾਰੀ, ਗਰਮੀ ਦੀਆਂ ਲਹਿਰਾਂ, ਰਾਤ ਨੂੰ ਪਸੀਨਾ ਅਤੇ ਮੂਡ ਵਿੱਚ ਬਦਲਾਅ ਹੋ ਸਕਦੇ ਹਨ",
        "ਨੀਂਦ ਦੀ ਦਿੱਕਤ, ਯੋਨੀ ਦਾ ਸੁੱਕਾਪਣ ਅਤੇ ਜੋੜਾਂ ਦਾ ਦਰਦ ਵੀ ਆਮ ਹਨ",
        "ਮੀਨੋਪੌਜ਼ ਤੋਂ ਬਾਅਦ ਹੱਡੀਆਂ ਪਤਲੀਆਂ ਹੁੰਦੀਆਂ ਹਨ, ਇਸ ਲਈ ਹੱਡੀਆਂ ਦੀ ਸਿਹਤ ਮਾਇਨੇ ਰੱਖਦੀ ਹੈ",
        "ਰੋਜ਼ਾਨਾ ਜ਼ਿੰਦਗੀ ’ਤੇ ਅਸਰ ਪਾਉਣ ਵਾਲੇ ਲੱਛਣਾਂ ਵਿੱਚ ਡਾਕਟਰ ਮਦਦ ਕਰ ਸਕਦੇ ਹਨ",
      ],
    },
  },
  {
    id: 'infertility',
    kind: 'condition',
    phrases: ['infertility', 'cannot conceive', 'cant conceive', 'trouble conceiving', 'not getting pregnant', 'unable to conceive', 'difficulty getting pregnant', 'fertility problem', 'infertile', 'conceive', 'ivf', 'baby nahi ho raha', 'बांझपन', 'ਬਾਂਝਪਣ'],
    en: {
      about: "Infertility means not being able to get pregnant after a year of trying, or after six months if the woman is over 35. It is common, and the cause can be in the woman, the man or both.",
      points: [
        "In women: problems with ovulation such as PCOS, blocked tubes, or conditions of the womb",
        "In men: a low sperm count or poorly moving sperm",
        "Both partners should be checked together, with blood tests, a semen test and scans",
        "Treatment depends on the cause and ranges from timing and care to assisted methods such as IVF",
      ],
    },
    hi: {
      about: "बांझपन का मतलब है एक साल कोशिश के बाद गर्भ न ठहरना, या महिला की उम्र 35 से ऊपर हो तो छह महीने बाद। यह आम है, और कारण महिला, पुरुष या दोनों में हो सकता है।",
      points: [
        "महिलाओं में: अंडा बनने की समस्याएं जैसे पीसीओएस, बंद नलियां, या गर्भाशय की बीमारियां",
        "पुरुषों में: शुक्राणुओं की कम संख्या या धीमी चाल",
        "दोनों साथियों की जांच साथ में होनी चाहिए, खून की जांच, वीर्य की जांच और स्कैन के साथ",
        "इलाज कारण पर निर्भर करता है और सही समय व देखभाल से लेकर आईवीएफ जैसी सहायक विधियों तक होता है",
      ],
    },
    pa: {
      about: "ਬਾਂਝਪਣ ਦਾ ਮਤਲਬ ਹੈ ਇੱਕ ਸਾਲ ਕੋਸ਼ਿਸ਼ ਤੋਂ ਬਾਅਦ ਗਰਭ ਨਾ ਠਹਿਰਨਾ, ਜਾਂ ਔਰਤ ਦੀ ਉਮਰ 35 ਤੋਂ ਉੱਪਰ ਹੋਵੇ ਤਾਂ ਛੇ ਮਹੀਨੇ ਬਾਅਦ। ਇਹ ਆਮ ਹੈ, ਅਤੇ ਕਾਰਨ ਔਰਤ, ਮਰਦ ਜਾਂ ਦੋਵਾਂ ਵਿੱਚ ਹੋ ਸਕਦਾ ਹੈ।",
      points: [
        "ਔਰਤਾਂ ਵਿੱਚ: ਅੰਡਾ ਬਣਨ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ ਜਿਵੇਂ ਪੀਸੀਓਐਸ, ਬੰਦ ਨਲੀਆਂ, ਜਾਂ ਬੱਚੇਦਾਨੀ ਦੀਆਂ ਬਿਮਾਰੀਆਂ",
        "ਮਰਦਾਂ ਵਿੱਚ: ਸ਼ੁਕਰਾਣੂਆਂ ਦੀ ਘੱਟ ਗਿਣਤੀ ਜਾਂ ਹੌਲੀ ਚਾਲ",
        "ਦੋਵਾਂ ਸਾਥੀਆਂ ਦੀ ਜਾਂਚ ਇਕੱਠੀ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ, ਖੂਨ ਦੀ ਜਾਂਚ, ਵੀਰਜ ਦੀ ਜਾਂਚ ਅਤੇ ਸਕੈਨ ਨਾਲ",
        "ਇਲਾਜ ਕਾਰਨ ’ਤੇ ਨਿਰਭਰ ਕਰਦਾ ਹੈ ਅਤੇ ਸਹੀ ਸਮੇਂ ਅਤੇ ਦੇਖਭਾਲ ਤੋਂ ਲੈ ਕੇ ਆਈਵੀਐਫ ਵਰਗੀਆਂ ਸਹਾਇਕ ਵਿਧੀਆਂ ਤੱਕ ਹੁੰਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'male-infertility',
    kind: 'condition',
    phrases: ['male infertility', 'low sperm count', 'sperm problem', 'male fertility problem', 'sperm count', 'weak sperm', 'पुरुष बांझपन', 'ਮਰਦ ਬਾਂਝਪਣ'],
    en: {
      about: "Male infertility is when a man's semen has too few sperm, or sperm that do not move or form well enough to cause a pregnancy. It is behind about one in three cases of infertility.",
      points: [
        "Often found only by a semen test, since there may be no symptoms",
        "Causes include infections, enlarged veins around the testicle (varicocele), hormone problems and some long-term illnesses",
        "Smoking, alcohol, heat and obesity can lower sperm quality",
        "A doctor, often a urologist, examines and orders tests to find the cause",
      ],
    },
    hi: {
      about: "पुरुष बांझपन तब होता है जब वीर्य में शुक्राणु बहुत कम हों, या शुक्राणु इतनी अच्छी तरह चलते या बने न हों कि गर्भ ठहर सके। यह बांझपन के लगभग हर तीन में से एक मामले के पीछे है।",
      points: [
        "अक्सर सिर्फ़ वीर्य की जांच से पता चलता है, क्योंकि कोई लक्षण नहीं हो सकता",
        "कारणों में संक्रमण, अंडकोष के आसपास की फैली नसें (वैरिकोसील), हार्मोन की समस्याएं और कुछ लंबी बीमारियां शामिल हैं",
        "धूम्रपान, शराब, गर्मी और मोटापा शुक्राणुओं की गुणवत्ता घटा सकते हैं",
        "डॉक्टर, अक्सर यूरोलॉजिस्ट, जांच करते हैं और कारण पता करने के लिए टेस्ट करवाते हैं",
      ],
    },
    pa: {
      about: "ਮਰਦ ਬਾਂਝਪਣ ਉਦੋਂ ਹੁੰਦਾ ਹੈ ਜਦੋਂ ਵੀਰਜ ਵਿੱਚ ਸ਼ੁਕਰਾਣੂ ਬਹੁਤ ਘੱਟ ਹੋਣ, ਜਾਂ ਸ਼ੁਕਰਾਣੂ ਇੰਨੇ ਚੰਗੀ ਤਰ੍ਹਾਂ ਚੱਲਦੇ ਜਾਂ ਬਣੇ ਨਾ ਹੋਣ ਕਿ ਗਰਭ ਠਹਿਰ ਸਕੇ। ਇਹ ਬਾਂਝਪਣ ਦੇ ਲਗਭਗ ਹਰ ਤਿੰਨ ਵਿੱਚੋਂ ਇੱਕ ਮਾਮਲੇ ਪਿੱਛੇ ਹੈ।",
      points: [
        "ਅਕਸਰ ਸਿਰਫ਼ ਵੀਰਜ ਦੀ ਜਾਂਚ ਨਾਲ ਪਤਾ ਲੱਗਦਾ ਹੈ, ਕਿਉਂਕਿ ਕੋਈ ਲੱਛਣ ਨਹੀਂ ਹੋ ਸਕਦਾ",
        "ਕਾਰਨਾਂ ਵਿੱਚ ਲਾਗਾਂ, ਅੰਡਕੋਸ਼ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਦੀਆਂ ਫੈਲੀਆਂ ਨਾੜਾਂ (ਵੈਰੀਕੋਸੀਲ), ਹਾਰਮੋਨ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ ਅਤੇ ਕੁਝ ਲੰਮੀਆਂ ਬਿਮਾਰੀਆਂ ਸ਼ਾਮਲ ਹਨ",
        "ਸਿਗਰਟਨੋਸ਼ੀ, ਸ਼ਰਾਬ, ਗਰਮੀ ਅਤੇ ਮੋਟਾਪਾ ਸ਼ੁਕਰਾਣੂਆਂ ਦੀ ਗੁਣਵੱਤਾ ਘਟਾ ਸਕਦੇ ਹਨ",
        "ਡਾਕਟਰ, ਅਕਸਰ ਯੂਰੋਲੋਜਿਸਟ, ਜਾਂਚ ਕਰਦੇ ਹਨ ਅਤੇ ਕਾਰਨ ਪਤਾ ਕਰਨ ਲਈ ਟੈਸਟ ਕਰਵਾਉਂਦੇ ਹਨ",
      ],
    },
  },
  {
    id: 'fibroids',
    kind: 'condition',
    phrases: ['fibroid', 'fibroids', 'uterine fibroids', 'fibroid in uterus', 'womb fibroid', 'uterus fibroid', 'fibroid problem', 'फाइब्रॉइड', 'ਫਾਈਬ੍ਰੌਇਡ'],
    en: {
      about: "Fibroids are non-cancerous growths in the muscle wall of the womb. They are very common, especially between 30 and 50, and many cause no trouble.",
      points: [
        "When they cause symptoms: heavy or long periods, pelvic pain or pressure, and needing to pass urine often",
        "They can sometimes make it harder to get pregnant or carry a pregnancy",
        "An ultrasound shows their number, size and place",
        "Small ones without symptoms are usually just watched; troublesome ones can be treated, sometimes with surgery",
      ],
    },
    hi: {
      about: "फाइब्रॉइड गर्भाशय की मांसपेशी की दीवार में गैर-कैंसरकारी गांठें हैं। ये बहुत आम हैं, खासकर 30 से 50 साल के बीच, और कई में कोई तकलीफ़ नहीं होती।",
      points: [
        "जब ये तकलीफ़ देती हैं: भारी या लंबी माहवारी, पेडू में दर्द या दबाव, और बार-बार पेशाब आना",
        "ये कभी-कभी गर्भ ठहरना या गर्भावस्था को संभालना मुश्किल कर सकती हैं",
        "अल्ट्रासाउंड से इनकी संख्या, आकार और जगह पता चलती है",
        "छोटी गांठें जिनमें लक्षण नहीं हैं, उन पर आमतौर पर बस नज़र रखी जाती है; तकलीफ़ देने वाली का इलाज हो सकता है, कभी-कभी ऑपरेशन से",
      ],
    },
    pa: {
      about: "ਫਾਈਬ੍ਰੌਇਡ ਬੱਚੇਦਾਨੀ ਦੀ ਮਾਸਪੇਸ਼ੀ ਦੀ ਕੰਧ ਵਿੱਚ ਗ਼ੈਰ-ਕੈਂਸਰ ਗੰਢਾਂ ਹਨ। ਇਹ ਬਹੁਤ ਆਮ ਹਨ, ਖ਼ਾਸ ਕਰਕੇ 30 ਤੋਂ 50 ਸਾਲ ਵਿਚਕਾਰ, ਅਤੇ ਕਈਆਂ ਵਿੱਚ ਕੋਈ ਤਕਲੀਫ਼ ਨਹੀਂ ਹੁੰਦੀ।",
      points: [
        "ਜਦੋਂ ਇਹ ਤਕਲੀਫ਼ ਦਿੰਦੀਆਂ ਹਨ: ਭਾਰੀ ਜਾਂ ਲੰਮੀ ਮਾਹਵਾਰੀ, ਪੇਡੂ ਵਿੱਚ ਦਰਦ ਜਾਂ ਦਬਾਅ, ਅਤੇ ਵਾਰ-ਵਾਰ ਪਿਸ਼ਾਬ ਆਉਣਾ",
        "ਇਹ ਕਈ ਵਾਰ ਗਰਭ ਠਹਿਰਨਾ ਜਾਂ ਗਰਭ ਅਵਸਥਾ ਨੂੰ ਸੰਭਾਲਣਾ ਔਖਾ ਕਰ ਸਕਦੀਆਂ ਹਨ",
        "ਅਲਟਰਾਸਾਊਂਡ ਨਾਲ ਇਨ੍ਹਾਂ ਦੀ ਗਿਣਤੀ, ਆਕਾਰ ਅਤੇ ਥਾਂ ਪਤਾ ਲੱਗਦੀ ਹੈ",
        "ਛੋਟੀਆਂ ਗੰਢਾਂ ਜਿਨ੍ਹਾਂ ਵਿੱਚ ਲੱਛਣ ਨਹੀਂ ਹਨ, ਉਨ੍ਹਾਂ ’ਤੇ ਆਮ ਤੌਰ ’ਤੇ ਬੱਸ ਨਜ਼ਰ ਰੱਖੀ ਜਾਂਦੀ ਹੈ; ਤਕਲੀਫ਼ ਦੇਣ ਵਾਲੀ ਦਾ ਇਲਾਜ ਹੋ ਸਕਦਾ ਹੈ, ਕਈ ਵਾਰ ਆਪ੍ਰੇਸ਼ਨ ਨਾਲ",
      ],
    },
  },
  {
    id: 'ovarian-cyst',
    kind: 'condition',
    phrases: ['ovarian cyst', 'ovarian cysts', 'cyst in ovary', 'cyst on ovary', 'ovary cyst', 'ovary problem', 'ovarian problem', 'ovarian pain', 'अंडाशय में सिस्ट', 'ਅੰਡਕੋਸ਼ ਵਿੱਚ ਸਿਸਟ'],
    en: {
      about: "An ovarian cyst is a fluid-filled sac on or inside an ovary. Most are harmless, form as part of the monthly cycle and go away by themselves.",
      points: [
        "Many cause no symptoms and are found on a scan done for another reason",
        "Larger ones can cause a dull ache in the lower belly, bloating or a feeling of fullness",
        "Sudden, severe pain can mean the cyst has burst or twisted and needs urgent care",
        "An ultrasound shows the cyst, and a doctor decides whether to watch it or treat it",
      ],
    },
    hi: {
      about: "अंडाशय का सिस्ट अंडाशय पर या उसके अंदर तरल से भरी थैली है। ज़्यादातर हानिरहित होते हैं, माहवारी चक्र के हिस्से के रूप में बनते हैं और अपने आप चले जाते हैं।",
      points: [
        "कई में कोई लक्षण नहीं होता और ये किसी दूसरे कारण से हुए स्कैन में पता चलते हैं",
        "बड़े सिस्ट पेट के निचले हिस्से में हल्का दर्द, फूलना या भरा-भरा लगना कर सकते हैं",
        "अचानक तेज़ दर्द का मतलब हो सकता है कि सिस्ट फट गया है या मुड़ गया है और तुरंत इलाज चाहिए",
        "अल्ट्रासाउंड से सिस्ट दिखता है, और डॉक्टर तय करते हैं कि उस पर नज़र रखनी है या इलाज करना है",
      ],
    },
    pa: {
      about: "ਅੰਡਕੋਸ਼ ਦਾ ਸਿਸਟ ਅੰਡਕੋਸ਼ ’ਤੇ ਜਾਂ ਉਸ ਦੇ ਅੰਦਰ ਤਰਲ ਨਾਲ ਭਰੀ ਥੈਲੀ ਹੈ। ਜ਼ਿਆਦਾਤਰ ਨੁਕਸਾਨ ਰਹਿਤ ਹੁੰਦੇ ਹਨ, ਮਾਹਵਾਰੀ ਚੱਕਰ ਦੇ ਹਿੱਸੇ ਵਜੋਂ ਬਣਦੇ ਹਨ ਅਤੇ ਆਪਣੇ ਆਪ ਚਲੇ ਜਾਂਦੇ ਹਨ।",
      points: [
        "ਕਈਆਂ ਵਿੱਚ ਕੋਈ ਲੱਛਣ ਨਹੀਂ ਹੁੰਦਾ ਅਤੇ ਇਹ ਕਿਸੇ ਹੋਰ ਕਾਰਨ ਕੀਤੇ ਸਕੈਨ ਵਿੱਚ ਪਤਾ ਲੱਗਦੇ ਹਨ",
        "ਵੱਡੇ ਸਿਸਟ ਪੇਟ ਦੇ ਹੇਠਲੇ ਹਿੱਸੇ ਵਿੱਚ ਹਲਕਾ ਦਰਦ, ਫੁੱਲਣਾ ਜਾਂ ਭਰਿਆ-ਭਰਿਆ ਲੱਗਣਾ ਕਰ ਸਕਦੇ ਹਨ",
        "ਅਚਾਨਕ ਤੇਜ਼ ਦਰਦ ਦਾ ਮਤਲਬ ਹੋ ਸਕਦਾ ਹੈ ਕਿ ਸਿਸਟ ਫਟ ਗਿਆ ਹੈ ਜਾਂ ਮੁੜ ਗਿਆ ਹੈ ਅਤੇ ਤੁਰੰਤ ਇਲਾਜ ਚਾਹੀਦਾ ਹੈ",
        "ਅਲਟਰਾਸਾਊਂਡ ਨਾਲ ਸਿਸਟ ਦਿਖਦਾ ਹੈ, ਅਤੇ ਡਾਕਟਰ ਤੈਅ ਕਰਦੇ ਹਨ ਕਿ ਉਸ ’ਤੇ ਨਜ਼ਰ ਰੱਖਣੀ ਹੈ ਜਾਂ ਇਲਾਜ ਕਰਨਾ ਹੈ",
      ],
    },
  },
  {
    id: 'hysterectomy',
    kind: 'test',
    phrases: ['hysterectomy', 'uterus removal', 'womb removal', 'removal of uterus', 'removal of womb', 'bachedani nikalna', 'बच्चेदानी निकालना', 'ਬੱਚੇਦਾਨੀ ਕੱਢਣਾ'],
    en: {
      about: "A hysterectomy is an operation to remove the womb (uterus). Sometimes the cervix, the ovaries and the tubes are removed too.",
      points: [
        "It is done for conditions such as fibroids, heavy bleeding that has not settled, or problems of the womb",
        "After it there are no more periods and pregnancy is no longer possible",
        "It can be done through a cut in the belly, through the vagina or by keyhole surgery",
        "It is planned carefully with the doctor, since other options may exist",
      ],
    },
    hi: {
      about: "हिस्टेरेक्टॉमी गर्भाशय (बच्चेदानी) को निकालने का ऑपरेशन है। कभी-कभी गर्भाशय की ग्रीवा, अंडाशय और नलियां भी निकाली जाती हैं।",
      points: [
        "यह फाइब्रॉइड, ठीक न होने वाले भारी रक्तस्राव, या गर्भाशय की समस्याओं जैसी स्थितियों में की जाती है",
        "इसके बाद माहवारी नहीं होती और गर्भ ठहरना संभव नहीं रहता",
        "यह पेट में चीरे से, योनि के रास्ते या दूरबीन से हो सकती है",
        "इसे डॉक्टर के साथ सावधानी से तय किया जाता है, क्योंकि दूसरे विकल्प भी हो सकते हैं",
      ],
    },
    pa: {
      about: "ਹਿਸਟਰੈਕਟੋਮੀ ਬੱਚੇਦਾਨੀ ਨੂੰ ਕੱਢਣ ਦਾ ਆਪ੍ਰੇਸ਼ਨ ਹੈ। ਕਈ ਵਾਰ ਬੱਚੇਦਾਨੀ ਦਾ ਮੂੰਹ, ਅੰਡਕੋਸ਼ ਅਤੇ ਨਲੀਆਂ ਵੀ ਕੱਢੀਆਂ ਜਾਂਦੀਆਂ ਹਨ।",
      points: [
        "ਇਹ ਫਾਈਬ੍ਰੌਇਡ, ਠੀਕ ਨਾ ਹੋਣ ਵਾਲੇ ਭਾਰੀ ਖੂਨ ਵਗਣ, ਜਾਂ ਬੱਚੇਦਾਨੀ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ ਵਰਗੀਆਂ ਸਥਿਤੀਆਂ ਵਿੱਚ ਕੀਤੀ ਜਾਂਦੀ ਹੈ",
        "ਇਸ ਤੋਂ ਬਾਅਦ ਮਾਹਵਾਰੀ ਨਹੀਂ ਹੁੰਦੀ ਅਤੇ ਗਰਭ ਠਹਿਰਨਾ ਸੰਭਵ ਨਹੀਂ ਰਹਿੰਦਾ",
        "ਇਹ ਪੇਟ ਵਿੱਚ ਚੀਰੇ ਨਾਲ, ਯੋਨੀ ਦੇ ਰਸਤੇ ਜਾਂ ਦੂਰਬੀਨ ਨਾਲ ਹੋ ਸਕਦੀ ਹੈ",
        "ਇਸ ਨੂੰ ਡਾਕਟਰ ਨਾਲ ਸਾਵਧਾਨੀ ਨਾਲ ਤੈਅ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਕਿਉਂਕਿ ਹੋਰ ਵਿਕਲਪ ਵੀ ਹੋ ਸਕਦੇ ਹਨ",
      ],
    },
  },
  {
    id: 'childbirth',
    kind: 'condition',
    phrases: ['delivery', 'childbirth', 'normal delivery', 'labour', 'labour pain', 'giving birth', 'vaginal delivery', 'labor', 'labor pain', 'delivery pain', 'prasav', 'प्रसव', 'ਜਣੇਪਾ'],
    en: {
      about: "Childbirth is the process by which a baby is born, usually around nine months into a pregnancy. Most babies are born through the vagina (a normal delivery); some need a caesarean section.",
      points: [
        "Labour has stages: the womb contracts and the cervix opens, then the baby is born, then the afterbirth",
        "The first signs are regular, stronger contractions, the waters breaking or a show of mucus",
        "Pain relief options can be discussed with the doctor beforehand",
        "Heavy bleeding, reduced baby movements or waters breaking early need to be seen urgently",
      ],
    },
    hi: {
      about: "प्रसव वह प्रक्रिया है जिससे बच्चे का जन्म होता है, आमतौर पर गर्भावस्था के लगभग नौ महीने बाद। ज़्यादातर बच्चे योनि के रास्ते (सामान्य प्रसव) पैदा होते हैं; कुछ को सिज़ेरियन की ज़रूरत होती है।",
      points: [
        "प्रसव के चरण होते हैं: गर्भाशय सिकुड़ता है और ग्रीवा खुलती है, फिर बच्चा पैदा होता है, फिर नाल",
        "पहले संकेत हैं नियमित, तेज़ होते संकुचन, पानी की थैली का फटना या बलगम जैसा स्राव",
        "दर्द कम करने के विकल्पों पर डॉक्टर से पहले ही बात की जा सकती है",
        "भारी रक्तस्राव, बच्चे का कम हिलना या पानी की थैली का जल्दी फटना तुरंत दिखाना चाहिए",
      ],
    },
    pa: {
      about: "ਜਣੇਪਾ ਉਹ ਪ੍ਰਕਿਰਿਆ ਹੈ ਜਿਸ ਨਾਲ ਬੱਚੇ ਦਾ ਜਨਮ ਹੁੰਦਾ ਹੈ, ਆਮ ਤੌਰ ’ਤੇ ਗਰਭ ਅਵਸਥਾ ਦੇ ਲਗਭਗ ਨੌਂ ਮਹੀਨੇ ਬਾਅਦ। ਜ਼ਿਆਦਾਤਰ ਬੱਚੇ ਯੋਨੀ ਦੇ ਰਸਤੇ (ਸਧਾਰਨ ਜਣੇਪਾ) ਪੈਦਾ ਹੁੰਦੇ ਹਨ; ਕੁਝ ਨੂੰ ਸੀਜ਼ੇਰੀਅਨ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ।",
      points: [
        "ਜਣੇਪੇ ਦੇ ਪੜਾਅ ਹੁੰਦੇ ਹਨ: ਬੱਚੇਦਾਨੀ ਸੁੰਗੜਦੀ ਹੈ ਅਤੇ ਮੂੰਹ ਖੁੱਲ੍ਹਦਾ ਹੈ, ਫਿਰ ਬੱਚਾ ਪੈਦਾ ਹੁੰਦਾ ਹੈ, ਫਿਰ ਨਾਲ",
        "ਪਹਿਲੇ ਸੰਕੇਤ ਹਨ ਨਿਯਮਿਤ, ਤੇਜ਼ ਹੁੰਦੇ ਸੁੰਗੜਨ, ਪਾਣੀ ਦੀ ਥੈਲੀ ਦਾ ਫਟਣਾ ਜਾਂ ਬਲਗਮ ਵਰਗਾ ਸਰਾਵ",
        "ਦਰਦ ਘਟਾਉਣ ਦੇ ਵਿਕਲਪਾਂ ’ਤੇ ਡਾਕਟਰ ਨਾਲ ਪਹਿਲਾਂ ਹੀ ਗੱਲ ਕੀਤੀ ਜਾ ਸਕਦੀ ਹੈ",
        "ਭਾਰੀ ਖੂਨ ਵਗਣਾ, ਬੱਚੇ ਦਾ ਘੱਟ ਹਿੱਲਣਾ ਜਾਂ ਪਾਣੀ ਦੀ ਥੈਲੀ ਦਾ ਜਲਦੀ ਫਟਣਾ ਤੁਰੰਤ ਦਿਖਾਉਣਾ ਚਾਹੀਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'c-section',
    kind: 'test',
    phrases: ['c section', 'c-section', 'caesarean', 'cesarean', 'caesarean section', 'cesarean section', 'section delivery', 'cesarean delivery', 'operation delivery', 'सिजेरियन', 'ਸੀਜ਼ੇਰੀਅਨ'],
    en: {
      about: "A caesarean section (C-section) is an operation to deliver a baby through a cut in the lower belly and the womb.",
      points: [
        "It may be planned, for example when the baby is lying feet first or the placenta is low",
        "It may also be decided during labour if the baby or mother needs a quicker delivery",
        "It is done with anaesthesia, so the mother feels no pain, and most mothers stay awake",
        "Recovery takes longer than after a normal delivery, and the stitches need care",
      ],
    },
    hi: {
      about: "सिज़ेरियन सेक्शन (सी-सेक्शन) पेट के निचले हिस्से और गर्भाशय में चीरे से बच्चे को पैदा करने का ऑपरेशन है।",
      points: [
        "यह पहले से तय हो सकता है, जैसे जब बच्चा पैरों की तरफ़ से लेटा हो या प्लेसेंटा नीचे हो",
        "यह प्रसव के दौरान भी तय हो सकता है, अगर बच्चे या मां को जल्दी प्रसव की ज़रूरत हो",
        "यह एनेस्थीसिया में होता है, इसलिए मां को दर्द नहीं होता, और ज़्यादातर माएं जागी रहती हैं",
        "सामान्य प्रसव की तुलना में रिकवरी में ज़्यादा समय लगता है, और टांकों की देखभाल ज़रूरी है",
      ],
    },
    pa: {
      about: "ਸੀਜ਼ੇਰੀਅਨ ਸੈਕਸ਼ਨ (ਸੀ-ਸੈਕਸ਼ਨ) ਪੇਟ ਦੇ ਹੇਠਲੇ ਹਿੱਸੇ ਅਤੇ ਬੱਚੇਦਾਨੀ ਵਿੱਚ ਚੀਰੇ ਨਾਲ ਬੱਚੇ ਨੂੰ ਪੈਦਾ ਕਰਨ ਦਾ ਆਪ੍ਰੇਸ਼ਨ ਹੈ।",
      points: [
        "ਇਹ ਪਹਿਲਾਂ ਤੋਂ ਤੈਅ ਹੋ ਸਕਦਾ ਹੈ, ਜਿਵੇਂ ਜਦੋਂ ਬੱਚਾ ਪੈਰਾਂ ਵੱਲੋਂ ਲੇਟਿਆ ਹੋਵੇ ਜਾਂ ਪਲੇਸੈਂਟਾ ਹੇਠਾਂ ਹੋਵੇ",
        "ਇਹ ਜਣੇਪੇ ਦੌਰਾਨ ਵੀ ਤੈਅ ਹੋ ਸਕਦਾ ਹੈ, ਜੇ ਬੱਚੇ ਜਾਂ ਮਾਂ ਨੂੰ ਜਲਦੀ ਜਣੇਪੇ ਦੀ ਲੋੜ ਹੋਵੇ",
        "ਇਹ ਐਨੇਸਥੀਸੀਆ ਵਿੱਚ ਹੁੰਦਾ ਹੈ, ਇਸ ਲਈ ਮਾਂ ਨੂੰ ਦਰਦ ਨਹੀਂ ਹੁੰਦਾ, ਅਤੇ ਜ਼ਿਆਦਾਤਰ ਮਾਵਾਂ ਜਾਗਦੀਆਂ ਰਹਿੰਦੀਆਂ ਹਨ",
        "ਸਧਾਰਨ ਜਣੇਪੇ ਦੇ ਮੁਕਾਬਲੇ ਰਿਕਵਰੀ ਵਿੱਚ ਵੱਧ ਸਮਾਂ ਲੱਗਦਾ ਹੈ, ਅਤੇ ਟਾਂਕਿਆਂ ਦੀ ਦੇਖਭਾਲ ਜ਼ਰੂਰੀ ਹੈ",
      ],
    },
  },
  {
    id: 'pregnancy-scan',
    kind: 'test',
    phrases: ['pregnancy scan', 'baby scan', 'ultrasound in pregnancy', 'scan during pregnancy', 'pregnancy ultrasound', 'anomaly scan', 'growth scan', 'obstetric ultrasound', 'sonography in pregnancy', 'pregnancy sonography', 'प्रेगनेंसी स्कैन', 'ਪ੍ਰੈਗਨੈਂਸੀ ਸਕੈਨ'],
    en: {
      about: "A pregnancy scan is an ultrasound that uses sound waves to make a picture of the baby in the womb. It does not use radiation.",
      points: [
        "An early scan confirms the pregnancy, the baby's heartbeat and the due date",
        "A detailed scan around the middle of pregnancy checks the baby's body and organs",
        "Later scans can check growth, the position of the baby and the amount of fluid",
        "Scans are done as the doctor advises, and the baby's sex is not told in India, as the law requires",
      ],
    },
    hi: {
      about: "प्रेगनेंसी स्कैन एक अल्ट्रासाउंड है जो ध्वनि तरंगों से गर्भ में बच्चे की तस्वीर बनाता है। इसमें विकिरण का इस्तेमाल नहीं होता।",
      points: [
        "शुरुआती स्कैन गर्भावस्था, बच्चे की धड़कन और संभावित तारीख की पुष्टि करता है",
        "गर्भावस्था के बीच के आसपास का विस्तृत स्कैन बच्चे के शरीर और अंगों की जांच करता है",
        "बाद के स्कैन बढ़त, बच्चे की स्थिति और तरल की मात्रा देख सकते हैं",
        "स्कैन डॉक्टर की सलाह के अनुसार किए जाते हैं, और कानून के अनुसार भारत में बच्चे का लिंग नहीं बताया जाता",
      ],
    },
    pa: {
      about: "ਪ੍ਰੈਗਨੈਂਸੀ ਸਕੈਨ ਇੱਕ ਅਲਟਰਾਸਾਊਂਡ ਹੈ ਜੋ ਧੁਨੀ ਤਰੰਗਾਂ ਨਾਲ ਗਰਭ ਵਿੱਚ ਬੱਚੇ ਦੀ ਤਸਵੀਰ ਬਣਾਉਂਦਾ ਹੈ। ਇਸ ਵਿੱਚ ਵਿਕਿਰਣ ਦੀ ਵਰਤੋਂ ਨਹੀਂ ਹੁੰਦੀ।",
      points: [
        "ਸ਼ੁਰੂਆਤੀ ਸਕੈਨ ਗਰਭ ਅਵਸਥਾ, ਬੱਚੇ ਦੀ ਧੜਕਣ ਅਤੇ ਸੰਭਾਵਿਤ ਤਾਰੀਖ਼ ਦੀ ਪੁਸ਼ਟੀ ਕਰਦਾ ਹੈ",
        "ਗਰਭ ਅਵਸਥਾ ਦੇ ਵਿਚਕਾਰ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਦਾ ਵਿਸਤ੍ਰਿਤ ਸਕੈਨ ਬੱਚੇ ਦੇ ਸਰੀਰ ਅਤੇ ਅੰਗਾਂ ਦੀ ਜਾਂਚ ਕਰਦਾ ਹੈ",
        "ਬਾਅਦ ਦੇ ਸਕੈਨ ਵਾਧਾ, ਬੱਚੇ ਦੀ ਸਥਿਤੀ ਅਤੇ ਤਰਲ ਦੀ ਮਾਤਰਾ ਦੇਖ ਸਕਦੇ ਹਨ",
        "ਸਕੈਨ ਡਾਕਟਰ ਦੀ ਸਲਾਹ ਅਨੁਸਾਰ ਕੀਤੇ ਜਾਂਦੇ ਹਨ, ਅਤੇ ਕਾਨੂੰਨ ਅਨੁਸਾਰ ਭਾਰਤ ਵਿੱਚ ਬੱਚੇ ਦਾ ਲਿੰਗ ਨਹੀਂ ਦੱਸਿਆ ਜਾਂਦਾ",
      ],
    },
  },
  {
    id: 'baby-kicks',
    kind: 'symptom',
    phrases: ['baby kicks', 'baby movements', 'fetal movements', 'foetal movements', 'baby movement in womb', 'baby not moving', 'reduced baby movements', 'baby kicking', 'baby movement', 'baby not moving in womb', 'bachche ka hilna', 'बच्चे का हिलना', 'ਬੱਚੇ ਦਾ ਹਿੱਲਣਾ'],
    en: {
      about: "Feeling the baby move is a reassuring part of pregnancy. Most women first feel movements between about 16 and 24 weeks, and they become stronger and more regular later on.",
      points: [
        "Every baby has its own pattern, with active and quiet times",
        "Movements are felt as kicks, rolls, flutters or jabs",
        "Knowing your baby's usual pattern in the later months helps notice a change",
        "If the baby moves clearly less than usual, or you are worried, see a doctor the same day",
      ],
    },
    hi: {
      about: "बच्चे का हिलना महसूस करना गर्भावस्था का एक तसल्ली देने वाला हिस्सा है। ज़्यादातर महिलाएं लगभग 16 से 24 हफ्ते के बीच पहली बार हलचल महसूस करती हैं, और बाद में यह मज़बूत और नियमित हो जाती है।",
      points: [
        "हर बच्चे का अपना तरीका होता है, सक्रिय और शांत समय के साथ",
        "हलचल लात, पलटने, फड़कने या धक्के जैसी महसूस होती है",
        "बाद के महीनों में अपने बच्चे का सामान्य तरीका जानना बदलाव को पहचानने में मदद करता है",
        "अगर बच्चा सामान्य से साफ़ तौर पर कम हिले, या आप चिंतित हों, तो उसी दिन डॉक्टर को दिखाएं",
      ],
    },
    pa: {
      about: "ਬੱਚੇ ਦਾ ਹਿੱਲਣਾ ਮਹਿਸੂਸ ਕਰਨਾ ਗਰਭ ਅਵਸਥਾ ਦਾ ਇੱਕ ਤਸੱਲੀ ਦੇਣ ਵਾਲਾ ਹਿੱਸਾ ਹੈ। ਜ਼ਿਆਦਾਤਰ ਔਰਤਾਂ ਲਗਭਗ 16 ਤੋਂ 24 ਹਫ਼ਤਿਆਂ ਵਿਚਕਾਰ ਪਹਿਲੀ ਵਾਰ ਹਲਚਲ ਮਹਿਸੂਸ ਕਰਦੀਆਂ ਹਨ, ਅਤੇ ਬਾਅਦ ਵਿੱਚ ਇਹ ਮਜ਼ਬੂਤ ਅਤੇ ਨਿਯਮਿਤ ਹੋ ਜਾਂਦੀ ਹੈ।",
      points: [
        "ਹਰ ਬੱਚੇ ਦਾ ਆਪਣਾ ਤਰੀਕਾ ਹੁੰਦਾ ਹੈ, ਸਰਗਰਮ ਅਤੇ ਸ਼ਾਂਤ ਸਮੇਂ ਦੇ ਨਾਲ",
        "ਹਲਚਲ ਲੱਤ, ਪਲਟਣ, ਫੜਕਣ ਜਾਂ ਧੱਕੇ ਵਰਗੀ ਮਹਿਸੂਸ ਹੁੰਦੀ ਹੈ",
        "ਬਾਅਦ ਦੇ ਮਹੀਨਿਆਂ ਵਿੱਚ ਆਪਣੇ ਬੱਚੇ ਦਾ ਆਮ ਤਰੀਕਾ ਜਾਣਨਾ ਬਦਲਾਅ ਪਛਾਣਨ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ",
        "ਜੇ ਬੱਚਾ ਆਮ ਨਾਲੋਂ ਸਾਫ਼ ਤੌਰ ’ਤੇ ਘੱਟ ਹਿੱਲੇ, ਜਾਂ ਤੁਸੀਂ ਚਿੰਤਤ ਹੋਵੋ, ਤਾਂ ਉਸੇ ਦਿਨ ਡਾਕਟਰ ਨੂੰ ਦਿਖਾਓ",
      ],
    },
  },
  {
    id: 'breastfeeding-problems',
    kind: 'condition',
    phrases: ['breastfeeding problem', 'breastfeeding problems', 'breast feeding problem', 'not enough milk', 'low milk supply', 'breast engorgement', 'sore nipples', 'baby not latching', 'breastfeeding pain', 'breastfeeding', 'doodh nahi aa raha', 'दूध कम आना', 'ਦੁੱਧ ਘੱਟ ਆਉਣਾ'],
    en: {
      about: "Breastfeeding is natural, but it often takes practice and patience for both mother and baby. Sore nipples, a full or painful breast and worry about milk are common in the first weeks.",
      points: [
        "A good latch and position are the first thing to check, because they affect both pain and milk flow",
        "Feeding often and letting the baby feed fully helps the supply",
        "A hot, red, painful area of the breast with fever can be an infection (mastitis) and needs a doctor",
        "A midwife, nurse or doctor can help with feeding if there are problems",
      ],
    },
    hi: {
      about: "स्तनपान स्वाभाविक है, लेकिन मां और बच्चे दोनों के लिए अक्सर अभ्यास और धैर्य लगता है। पहले हफ्तों में निपल में दर्द, भरे या दर्द वाले स्तन और दूध की चिंता आम हैं।",
      points: [
        "अच्छी पकड़ और स्थिति सबसे पहले देखने की चीज़ है, क्योंकि ये दर्द और दूध के बहाव दोनों को प्रभावित करती हैं",
        "बार-बार पिलाना और बच्चे को पूरा पीने देना दूध की मात्रा बढ़ाने में मदद करता है",
        "स्तन का गर्म, लाल, दर्द वाला हिस्सा बुखार के साथ संक्रमण (मास्टाइटिस) हो सकता है और डॉक्टर चाहिए",
        "अगर दिक्कत हो तो नर्स, दाई या डॉक्टर पिलाने में मदद कर सकते हैं",
      ],
    },
    pa: {
      about: "ਦੁੱਧ ਪਿਲਾਉਣਾ ਕੁਦਰਤੀ ਹੈ, ਪਰ ਮਾਂ ਅਤੇ ਬੱਚੇ ਦੋਵਾਂ ਲਈ ਅਕਸਰ ਅਭਿਆਸ ਅਤੇ ਸਬਰ ਲੱਗਦਾ ਹੈ। ਪਹਿਲੇ ਹਫ਼ਤਿਆਂ ਵਿੱਚ ਨਿੱਪਲ ਵਿੱਚ ਦਰਦ, ਭਰੀਆਂ ਜਾਂ ਦਰਦ ਵਾਲੀਆਂ ਛਾਤੀਆਂ ਅਤੇ ਦੁੱਧ ਦੀ ਚਿੰਤਾ ਆਮ ਹਨ।",
      points: [
        "ਚੰਗੀ ਪਕੜ ਅਤੇ ਸਥਿਤੀ ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਦੇਖਣ ਵਾਲੀ ਚੀਜ਼ ਹੈ, ਕਿਉਂਕਿ ਇਹ ਦਰਦ ਅਤੇ ਦੁੱਧ ਦੇ ਵਹਾਅ ਦੋਵਾਂ ਨੂੰ ਪ੍ਰਭਾਵਿਤ ਕਰਦੀਆਂ ਹਨ",
        "ਵਾਰ-ਵਾਰ ਪਿਲਾਉਣਾ ਅਤੇ ਬੱਚੇ ਨੂੰ ਪੂਰਾ ਪੀਣ ਦੇਣਾ ਦੁੱਧ ਦੀ ਮਾਤਰਾ ਵਧਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ",
        "ਛਾਤੀ ਦਾ ਗਰਮ, ਲਾਲ, ਦਰਦ ਵਾਲਾ ਹਿੱਸਾ ਬੁਖ਼ਾਰ ਦੇ ਨਾਲ ਲਾਗ (ਮਾਸਟਾਈਟਿਸ) ਹੋ ਸਕਦਾ ਹੈ ਅਤੇ ਡਾਕਟਰ ਚਾਹੀਦਾ ਹੈ",
        "ਜੇ ਦਿੱਕਤ ਹੋਵੇ ਤਾਂ ਨਰਸ, ਦਾਈ ਜਾਂ ਡਾਕਟਰ ਪਿਲਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦੇ ਹਨ",
      ],
    },
  },
  {
    id: 'newborn-care',
    kind: 'condition',
    phrases: ['newborn', 'new born', 'newborn baby', 'newborn care', 'new born baby', 'neonate', 'neonatal care', 'baby care', 'newborn baby care', 'nicu', 'naya janma bachcha', 'नवजात', 'ਨਵਜੰਮਿਆ'],
    en: {
      about: "A newborn is a baby in the first four weeks of life. Newborns feed often, sleep most of the day and need careful watching, because they can become unwell quickly.",
      points: [
        "Feeding every two to three hours, mostly breast milk, and plenty of wet nappies are signs of good feeding",
        "A check-up soon after birth, and the first vaccines, are part of newborn care",
        "Yellow skin in the first week is common and is checked",
        "Fever, poor feeding, fast breathing, unusual sleepiness or a baby who is hard to wake need a doctor at once",
      ],
    },
    hi: {
      about: "नवजात जीवन के पहले चार हफ्तों का शिशु है। नवजात बार-बार दूध पीते हैं, दिन का ज़्यादातर हिस्सा सोते हैं और उन पर ध्यान रखना ज़रूरी है, क्योंकि वे जल्दी बीमार पड़ सकते हैं।",
      points: [
        "हर दो-तीन घंटे में दूध पिलाना, ज़्यादातर मां का दूध, और खूब गीले डायपर अच्छे दूध पीने के संकेत हैं",
        "जन्म के जल्द बाद जांच, और पहले टीके, नवजात की देखभाल का हिस्सा हैं",
        "पहले हफ्ते में पीली त्वचा आम है और उसकी जांच की जाती है",
        "बुखार, ठीक से दूध न पीना, तेज़ सांस, असामान्य सुस्ती, या ऐसा शिशु जिसे जगाना मुश्किल हो, तुरंत डॉक्टर मांगता है",
      ],
    },
    pa: {
      about: "ਨਵਜੰਮਿਆ ਜ਼ਿੰਦਗੀ ਦੇ ਪਹਿਲੇ ਚਾਰ ਹਫ਼ਤਿਆਂ ਦਾ ਨਿਆਣਾ ਹੈ। ਨਵਜੰਮੇ ਵਾਰ-ਵਾਰ ਦੁੱਧ ਪੀਂਦੇ ਹਨ, ਦਿਨ ਦਾ ਜ਼ਿਆਦਾਤਰ ਹਿੱਸਾ ਸੌਂਦੇ ਹਨ ਅਤੇ ਉਨ੍ਹਾਂ ’ਤੇ ਧਿਆਨ ਰੱਖਣਾ ਜ਼ਰੂਰੀ ਹੈ, ਕਿਉਂਕਿ ਉਹ ਜਲਦੀ ਬੀਮਾਰ ਹੋ ਸਕਦੇ ਹਨ।",
      points: [
        "ਹਰ ਦੋ-ਤਿੰਨ ਘੰਟਿਆਂ ਵਿੱਚ ਦੁੱਧ ਪਿਲਾਉਣਾ, ਜ਼ਿਆਦਾਤਰ ਮਾਂ ਦਾ ਦੁੱਧ, ਅਤੇ ਖੂਬ ਗਿੱਲੇ ਡਾਇਪਰ ਚੰਗੇ ਦੁੱਧ ਪੀਣ ਦੇ ਸੰਕੇਤ ਹਨ",
        "ਜਨਮ ਤੋਂ ਜਲਦੀ ਬਾਅਦ ਜਾਂਚ, ਅਤੇ ਪਹਿਲੇ ਟੀਕੇ, ਨਵਜੰਮੇ ਦੀ ਦੇਖਭਾਲ ਦਾ ਹਿੱਸਾ ਹਨ",
        "ਪਹਿਲੇ ਹਫ਼ਤੇ ਵਿੱਚ ਪੀਲੀ ਚਮੜੀ ਆਮ ਹੈ ਅਤੇ ਉਸ ਦੀ ਜਾਂਚ ਕੀਤੀ ਜਾਂਦੀ ਹੈ",
        "ਬੁਖ਼ਾਰ, ਠੀਕ ਤਰ੍ਹਾਂ ਦੁੱਧ ਨਾ ਪੀਣਾ, ਤੇਜ਼ ਸਾਹ, ਅਸਧਾਰਨ ਸੁਸਤੀ, ਜਾਂ ਅਜਿਹਾ ਨਿਆਣਾ ਜਿਸ ਨੂੰ ਜਗਾਉਣਾ ਔਖਾ ਹੋਵੇ, ਤੁਰੰਤ ਡਾਕਟਰ ਮੰਗਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'newborn-jaundice',
    kind: 'condition',
    phrases: ['newborn jaundice', 'newborn baby jaundice', 'baby jaundice', 'jaundice in newborn', 'jaundice in baby', 'yellow baby', 'neonatal jaundice', 'baby turning yellow', 'baby yellow skin', 'नवजात पीलिया', 'ਨਵਜੰਮੇ ਦਾ ਪੀਲੀਆ'],
    en: {
      about: "Jaundice is common in newborn babies. The skin and the whites of the eyes look yellow because the baby's liver is still learning to clear a substance called bilirubin.",
      points: [
        "It usually shows on the second or third day and settles within one to two weeks",
        "Feeding well and often helps the body clear it",
        "Jaundice that starts in the first day, is deep, or lasts longer than two weeks needs checking",
        "A blood test measures the level, and light treatment (phototherapy) is used when it is high",
      ],
    },
    hi: {
      about: "नवजात शिशुओं में पीलिया आम है। त्वचा और आंखों का सफ़ेद हिस्सा पीला दिखता है क्योंकि शिशु का लिवर अभी बिलीरुबिन नाम के पदार्थ को साफ़ करना सीख रहा होता है।",
      points: [
        "यह आमतौर पर दूसरे या तीसरे दिन दिखता है और एक से दो हफ्ते में ठीक हो जाता है",
        "ठीक से और बार-बार दूध पिलाना शरीर को इसे साफ़ करने में मदद करता है",
        "जो पीलिया पहले दिन शुरू हो, गहरा हो, या दो हफ्ते से ज़्यादा चले, उसकी जांच ज़रूरी है",
        "खून की जांच से स्तर नापा जाता है, और ज़्यादा होने पर रोशनी का इलाज (फोटोथेरेपी) किया जाता है",
      ],
    },
    pa: {
      about: "ਨਵਜੰਮੇ ਨਿਆਣਿਆਂ ਵਿੱਚ ਪੀਲੀਆ ਆਮ ਹੈ। ਚਮੜੀ ਅਤੇ ਅੱਖਾਂ ਦਾ ਚਿੱਟਾ ਹਿੱਸਾ ਪੀਲਾ ਦਿਖਦਾ ਹੈ ਕਿਉਂਕਿ ਨਿਆਣੇ ਦਾ ਜਿਗਰ ਅਜੇ ਬਿਲੀਰੂਬਿਨ ਨਾਮ ਦੇ ਪਦਾਰਥ ਨੂੰ ਸਾਫ਼ ਕਰਨਾ ਸਿੱਖ ਰਿਹਾ ਹੁੰਦਾ ਹੈ।",
      points: [
        "ਇਹ ਆਮ ਤੌਰ ’ਤੇ ਦੂਜੇ ਜਾਂ ਤੀਜੇ ਦਿਨ ਦਿਖਦਾ ਹੈ ਅਤੇ ਇੱਕ ਤੋਂ ਦੋ ਹਫ਼ਤਿਆਂ ਵਿੱਚ ਠੀਕ ਹੋ ਜਾਂਦਾ ਹੈ",
        "ਚੰਗੀ ਤਰ੍ਹਾਂ ਅਤੇ ਵਾਰ-ਵਾਰ ਦੁੱਧ ਪਿਲਾਉਣਾ ਸਰੀਰ ਨੂੰ ਇਸ ਨੂੰ ਸਾਫ਼ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ",
        "ਜੋ ਪੀਲੀਆ ਪਹਿਲੇ ਦਿਨ ਸ਼ੁਰੂ ਹੋਵੇ, ਗੂੜ੍ਹਾ ਹੋਵੇ, ਜਾਂ ਦੋ ਹਫ਼ਤਿਆਂ ਤੋਂ ਵੱਧ ਚੱਲੇ, ਉਸ ਦੀ ਜਾਂਚ ਜ਼ਰੂਰੀ ਹੈ",
        "ਖੂਨ ਦੀ ਜਾਂਚ ਨਾਲ ਪੱਧਰ ਮਾਪਿਆ ਜਾਂਦਾ ਹੈ, ਅਤੇ ਵੱਧ ਹੋਣ ’ਤੇ ਰੌਸ਼ਨੀ ਦਾ ਇਲਾਜ (ਫੋਟੋਥੈਰੇਪੀ) ਕੀਤਾ ਜਾਂਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'baby-crying',
    kind: 'symptom',
    phrases: ['baby crying', 'baby crying a lot', 'baby cries a lot', 'baby crying too much', 'baby colic', 'colic', 'baby crying at night', 'infant crying', 'bachcha bahut rota hai', 'बच्चा बहुत रोता है', 'ਬੱਚਾ ਬਹੁਤ ਰੋਂਦਾ ਹੈ'],
    en: {
      about: "Crying is how a baby talks. Many babies cry more in the early weeks, and a baby who cries a lot but is otherwise well, feeding and growing may have colic.",
      points: [
        "Hunger, a wet or dirty nappy, tiredness, or wanting to be held",
        "Wind or tummy discomfort after feeds",
        "Colic: long crying spells, often in the evening, in a healthy baby, which usually ease by about three to four months",
        "A baby who cries in a new, high-pitched way, has a fever, is not feeding or is unusually sleepy needs a doctor",
      ],
    },
    hi: {
      about: "रोना शिशु के बोलने का तरीका है। कई बच्चे शुरुआती हफ्तों में ज़्यादा रोते हैं, और जो बच्चा बहुत रोता है लेकिन बाकी तरह ठीक है, दूध पी रहा है और बढ़ रहा है, उसे कॉलिक हो सकता है।",
      points: [
        "भूख, गीला या गंदा डायपर, थकान, या गोद में लिए जाने की चाह",
        "दूध पीने के बाद गैस या पेट की बेचैनी",
        "कॉलिक: स्वस्थ शिशु में लंबे समय तक रोना, अक्सर शाम को, जो आमतौर पर तीन-चार महीने तक कम हो जाता है",
        "जो शिशु नए, ऊंचे सुर में रोए, बुखार हो, दूध न पी रहा हो या असामान्य रूप से सुस्त हो, उसे डॉक्टर चाहिए",
      ],
    },
    pa: {
      about: "ਰੋਣਾ ਨਿਆਣੇ ਦੇ ਬੋਲਣ ਦਾ ਤਰੀਕਾ ਹੈ। ਕਈ ਬੱਚੇ ਸ਼ੁਰੂਆਤੀ ਹਫ਼ਤਿਆਂ ਵਿੱਚ ਵੱਧ ਰੋਂਦੇ ਹਨ, ਅਤੇ ਜੋ ਬੱਚਾ ਬਹੁਤ ਰੋਂਦਾ ਹੈ ਪਰ ਬਾਕੀ ਠੀਕ ਹੈ, ਦੁੱਧ ਪੀ ਰਿਹਾ ਹੈ ਅਤੇ ਵਧ ਰਿਹਾ ਹੈ, ਉਸ ਨੂੰ ਕੌਲਿਕ ਹੋ ਸਕਦਾ ਹੈ।",
      points: [
        "ਭੁੱਖ, ਗਿੱਲਾ ਜਾਂ ਗੰਦਾ ਡਾਇਪਰ, ਥਕਾਵਟ, ਜਾਂ ਗੋਦ ਵਿੱਚ ਲਏ ਜਾਣ ਦੀ ਚਾਹ",
        "ਦੁੱਧ ਪੀਣ ਤੋਂ ਬਾਅਦ ਗੈਸ ਜਾਂ ਪੇਟ ਦੀ ਬੇਚੈਨੀ",
        "ਕੌਲਿਕ: ਸਿਹਤਮੰਦ ਨਿਆਣੇ ਵਿੱਚ ਲੰਮੇ ਸਮੇਂ ਤੱਕ ਰੋਣਾ, ਅਕਸਰ ਸ਼ਾਮ ਨੂੰ, ਜੋ ਆਮ ਤੌਰ ’ਤੇ ਤਿੰਨ-ਚਾਰ ਮਹੀਨਿਆਂ ਤੱਕ ਘਟ ਜਾਂਦਾ ਹੈ",
        "ਜੋ ਨਿਆਣਾ ਨਵੇਂ, ਉੱਚੇ ਸੁਰ ਵਿੱਚ ਰੋਵੇ, ਬੁਖ਼ਾਰ ਹੋਵੇ, ਦੁੱਧ ਨਾ ਪੀ ਰਿਹਾ ਹੋਵੇ ਜਾਂ ਅਸਧਾਰਨ ਤੌਰ ’ਤੇ ਸੁਸਤ ਹੋਵੇ, ਉਸ ਨੂੰ ਡਾਕਟਰ ਚਾਹੀਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'child-vaccination',
    kind: 'test',
    phrases: ['baby vaccination', 'vaccines for child', 'child vaccination', 'vaccination for child', 'baby vaccine', 'immunisation', 'immunization', 'child immunisation', 'vaccination schedule', 'baby injections', 'bachon ke teeke', 'teeke', 'tika', 'बच्चों के टीके', 'ਬੱਚਿਆਂ ਦੇ ਟੀਕੇ', 'vaccination', 'vaccine', 'vaccines'],
    en: {
      about: "Vaccines protect children from serious infections by helping the body learn to fight them. In India children follow a schedule of vaccines from birth through the early years.",
      points: [
        "The first vaccines are given at or soon after birth, and others at set ages through infancy and childhood",
        "Mild fever or a sore arm or leg for a day or two after a vaccine is common",
        "A paediatrician or the child's health card shows which vaccines are due",
        "A child who is unwell, or has had a reaction before, should be seen by the doctor first",
      ],
    },
    hi: {
      about: "टीके शरीर को संक्रमणों से लड़ना सिखाकर बच्चों को गंभीर बीमारियों से बचाते हैं। भारत में बच्चे जन्म से लेकर शुरुआती सालों तक टीकों की एक तय सारणी का पालन करते हैं।",
      points: [
        "पहली खुराकें जन्म के समय या जल्द बाद दी जाती हैं, और बाकी शैशव और बचपन में तय उम्र पर",
        "टीके के बाद एक-दो दिन हल्का बुखार या हाथ-पैर में दर्द आम है",
        "बाल रोग विशेषज्ञ या बच्चे का स्वास्थ्य कार्ड बताता है कि कौन-से टीके बाकी हैं",
        "जो बच्चा बीमार हो, या पहले किसी टीके से प्रतिक्रिया हुई हो, उसे पहले डॉक्टर को दिखाना चाहिए",
      ],
    },
    pa: {
      about: "ਟੀਕੇ ਸਰੀਰ ਨੂੰ ਲਾਗਾਂ ਨਾਲ ਲੜਨਾ ਸਿਖਾ ਕੇ ਬੱਚਿਆਂ ਨੂੰ ਗੰਭੀਰ ਬਿਮਾਰੀਆਂ ਤੋਂ ਬਚਾਉਂਦੇ ਹਨ। ਭਾਰਤ ਵਿੱਚ ਬੱਚੇ ਜਨਮ ਤੋਂ ਲੈ ਕੇ ਸ਼ੁਰੂਆਤੀ ਸਾਲਾਂ ਤੱਕ ਟੀਕਿਆਂ ਦੀ ਇੱਕ ਤੈਅ ਸਾਰਣੀ ਦੀ ਪਾਲਣਾ ਕਰਦੇ ਹਨ।",
      points: [
        "ਪਹਿਲੀਆਂ ਖੁਰਾਕਾਂ ਜਨਮ ਵੇਲੇ ਜਾਂ ਜਲਦੀ ਬਾਅਦ ਦਿੱਤੀਆਂ ਜਾਂਦੀਆਂ ਹਨ, ਅਤੇ ਬਾਕੀ ਸ਼ੈਸ਼ਵ ਅਤੇ ਬਚਪਨ ਵਿੱਚ ਤੈਅ ਉਮਰ ’ਤੇ",
        "ਟੀਕੇ ਤੋਂ ਬਾਅਦ ਇੱਕ-ਦੋ ਦਿਨ ਹਲਕਾ ਬੁਖ਼ਾਰ ਜਾਂ ਬਾਂਹ-ਲੱਤ ਵਿੱਚ ਦਰਦ ਆਮ ਹੈ",
        "ਬਾਲ ਰੋਗਾਂ ਦਾ ਮਾਹਰ ਜਾਂ ਬੱਚੇ ਦਾ ਸਿਹਤ ਕਾਰਡ ਦੱਸਦਾ ਹੈ ਕਿ ਕਿਹੜੇ ਟੀਕੇ ਬਾਕੀ ਹਨ",
        "ਜੋ ਬੱਚਾ ਬੀਮਾਰ ਹੋਵੇ, ਜਾਂ ਪਹਿਲਾਂ ਕਿਸੇ ਟੀਕੇ ਤੋਂ ਪ੍ਰਤੀਕਰਮ ਹੋਇਆ ਹੋਵੇ, ਉਸ ਨੂੰ ਪਹਿਲਾਂ ਡਾਕਟਰ ਨੂੰ ਦਿਖਾਉਣਾ ਚਾਹੀਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'kidney-disease',
    kind: 'condition',
    phrases: ['kidney failure', 'kidney disease', 'kidney problem', 'kidney problems', 'renal failure', 'chronic kidney disease', 'ckd', 'kidney damage', 'kidney issue', 'gurde ki bimari', 'किडनी फेल', 'गुर्दे की बीमारी', 'ਗੁਰਦੇ ਦੀ ਬਿਮਾਰੀ'],
    en: {
      about: "The kidneys clean the blood and make urine. In kidney disease they slowly lose this ability, and kidney failure is when they can no longer do the job well enough.",
      points: [
        "Diabetes and high blood pressure are the two most common causes",
        "Early on there may be no symptoms; later there can be swelling, tiredness, less or foamy urine and nausea",
        "Blood and urine tests, and an ultrasound, show how well the kidneys are working",
        "Looking after blood sugar and blood pressure slows the damage, and advanced failure may need dialysis or a transplant",
      ],
    },
    hi: {
      about: "गुर्दे खून को साफ़ करते हैं और पेशाब बनाते हैं। गुर्दे की बीमारी में वे धीरे-धीरे यह क्षमता खो देते हैं, और गुर्दा फेल होना तब है जब वे यह काम ठीक से नहीं कर पाते।",
      points: [
        "डायबिटीज़ और हाई ब्लड प्रेशर सबसे आम दो कारण हैं",
        "शुरुआत में कोई लक्षण नहीं हो सकता; बाद में सूजन, थकान, कम या झागदार पेशाब और मतली हो सकती है",
        "खून और पेशाब की जांच, और अल्ट्रासाउंड बताते हैं कि गुर्दे कितना अच्छा काम कर रहे हैं",
        "ब्लड शुगर और ब्लड प्रेशर की देखभाल नुकसान को धीमा करती है, और बढ़े हुए फेल होने में डायलिसिस या प्रत्यारोपण की ज़रूरत पड़ सकती है",
      ],
    },
    pa: {
      about: "ਗੁਰਦੇ ਖੂਨ ਨੂੰ ਸਾਫ਼ ਕਰਦੇ ਹਨ ਅਤੇ ਪਿਸ਼ਾਬ ਬਣਾਉਂਦੇ ਹਨ। ਗੁਰਦੇ ਦੀ ਬਿਮਾਰੀ ਵਿੱਚ ਉਹ ਹੌਲੀ-ਹੌਲੀ ਇਹ ਸਮਰੱਥਾ ਗੁਆ ਦਿੰਦੇ ਹਨ, ਅਤੇ ਗੁਰਦਾ ਫੇਲ੍ਹ ਹੋਣਾ ਉਦੋਂ ਹੈ ਜਦੋਂ ਉਹ ਇਹ ਕੰਮ ਠੀਕ ਤਰ੍ਹਾਂ ਨਹੀਂ ਕਰ ਪਾਉਂਦੇ।",
      points: [
        "ਸ਼ੂਗਰ ਅਤੇ ਹਾਈ ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ ਸਭ ਤੋਂ ਆਮ ਦੋ ਕਾਰਨ ਹਨ",
        "ਸ਼ੁਰੂ ਵਿੱਚ ਕੋਈ ਲੱਛਣ ਨਹੀਂ ਹੋ ਸਕਦਾ; ਬਾਅਦ ਵਿੱਚ ਸੋਜ, ਥਕਾਵਟ, ਘੱਟ ਜਾਂ ਝੱਗ ਵਾਲਾ ਪਿਸ਼ਾਬ ਅਤੇ ਜੀ ਕੱਚਾ ਹੋ ਸਕਦਾ ਹੈ",
        "ਖੂਨ ਅਤੇ ਪਿਸ਼ਾਬ ਦੀ ਜਾਂਚ, ਅਤੇ ਅਲਟਰਾਸਾਊਂਡ ਦੱਸਦੇ ਹਨ ਕਿ ਗੁਰਦੇ ਕਿੰਨਾ ਚੰਗਾ ਕੰਮ ਕਰ ਰਹੇ ਹਨ",
        "ਬਲੱਡ ਸ਼ੂਗਰ ਅਤੇ ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ ਦੀ ਦੇਖਭਾਲ ਨੁਕਸਾਨ ਨੂੰ ਹੌਲੀ ਕਰਦੀ ਹੈ, ਅਤੇ ਵਧੇ ਹੋਏ ਫੇਲ੍ਹ ਹੋਣ ਵਿੱਚ ਡਾਇਲਸਿਸ ਜਾਂ ਟ੍ਰਾਂਸਪਲਾਂਟ ਦੀ ਲੋੜ ਪੈ ਸਕਦੀ ਹੈ",
      ],
    },
  },
  {
    id: 'dialysis',
    kind: 'test',
    phrases: ['dialysis', 'kidney dialysis', 'haemodialysis', 'hemodialysis', 'dialysis centre', 'dialysis center', 'डायलिसिस', 'ਡਾਇਲਸਿਸ'],
    en: {
      about: "Dialysis is a treatment that does part of the kidneys' work when they have failed. It cleans the blood of waste and extra water.",
      points: [
        "Haemodialysis cleans the blood through a machine, usually three times a week for a few hours",
        "Peritoneal dialysis uses the lining of the belly and can be done at home",
        "It is used for advanced kidney failure, and sometimes for a short time after a sudden kidney injury",
        "A kidney specialist decides when and what kind is needed",
      ],
    },
    hi: {
      about: "डायलिसिस एक इलाज है जो गुर्दे फेल होने पर उनका कुछ काम करता है। यह खून को अपशिष्ट और अतिरिक्त पानी से साफ़ करता है।",
      points: [
        "हीमोडायलिसिस मशीन से खून साफ़ करता है, आमतौर पर हफ्ते में तीन बार कुछ घंटों के लिए",
        "पेरिटोनियल डायलिसिस पेट की परत का इस्तेमाल करता है और घर पर किया जा सकता है",
        "इसका इस्तेमाल गुर्दे के बढ़े हुए फेल होने में होता है, और कभी-कभी अचानक गुर्दे की चोट के बाद थोड़े समय के लिए",
        "गुर्दे के विशेषज्ञ तय करते हैं कि कब और किस तरह की ज़रूरत है",
      ],
    },
    pa: {
      about: "ਡਾਇਲਸਿਸ ਇੱਕ ਇਲਾਜ ਹੈ ਜੋ ਗੁਰਦੇ ਫੇਲ੍ਹ ਹੋਣ ’ਤੇ ਉਨ੍ਹਾਂ ਦਾ ਕੁਝ ਕੰਮ ਕਰਦਾ ਹੈ। ਇਹ ਖੂਨ ਨੂੰ ਗੰਦਗੀ ਅਤੇ ਵਾਧੂ ਪਾਣੀ ਤੋਂ ਸਾਫ਼ ਕਰਦਾ ਹੈ।",
      points: [
        "ਹੀਮੋਡਾਇਲਸਿਸ ਮਸ਼ੀਨ ਨਾਲ ਖੂਨ ਸਾਫ਼ ਕਰਦਾ ਹੈ, ਆਮ ਤੌਰ ’ਤੇ ਹਫ਼ਤੇ ਵਿੱਚ ਤਿੰਨ ਵਾਰ ਕੁਝ ਘੰਟਿਆਂ ਲਈ",
        "ਪੈਰੀਟੋਨੀਅਲ ਡਾਇਲਸਿਸ ਪੇਟ ਦੀ ਪਰਤ ਦੀ ਵਰਤੋਂ ਕਰਦਾ ਹੈ ਅਤੇ ਘਰ ਵਿੱਚ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ",
        "ਇਸ ਦੀ ਵਰਤੋਂ ਗੁਰਦੇ ਦੇ ਵਧੇ ਹੋਏ ਫੇਲ੍ਹ ਹੋਣ ਵਿੱਚ ਹੁੰਦੀ ਹੈ, ਅਤੇ ਕਈ ਵਾਰ ਅਚਾਨਕ ਗੁਰਦੇ ਦੀ ਸੱਟ ਤੋਂ ਬਾਅਦ ਥੋੜ੍ਹੇ ਸਮੇਂ ਲਈ",
        "ਗੁਰਦੇ ਦੇ ਮਾਹਰ ਤੈਅ ਕਰਦੇ ਹਨ ਕਿ ਕਦੋਂ ਅਤੇ ਕਿਸ ਤਰ੍ਹਾਂ ਦੀ ਲੋੜ ਹੈ",
      ],
    },
  },
  {
    id: 'kidney-pain',
    kind: 'symptom',
    phrases: ['kidney pain', 'pain in kidney', 'kidney ache', 'flank pain', 'loin pain', 'pain in kidneys', 'side pain', 'gurde me dard', 'गुर्दे में दर्द', 'ਗੁਰਦੇ ਵਿੱਚ ਦਰਦ'],
    en: {
      about: "Kidney pain is felt in the flank: the area on one or both sides of the back, just below the ribs. It is often a deep ache or a sharp, coming-and-going pain.",
      points: [
        "Kidney stones, with pain in waves that may reach the groin",
        "A kidney or urinary infection, often with fever and burning urine",
        "Muscle or spine problems, which are more common causes of back pain than the kidney",
        "A swelling of the kidney because urine cannot drain",
      ],
    },
    hi: {
      about: "गुर्दे का दर्द बगल (फ्लैंक) में महसूस होता है: पसलियों के ठीक नीचे पीठ के एक या दोनों तरफ़ का हिस्सा। यह अक्सर गहरा दर्द या तेज़, आता-जाता दर्द होता है।",
      points: [
        "गुर्दे की पथरी, जिसमें लहरों में दर्द होता है जो जांघ के जोड़ तक पहुंच सकता है",
        "गुर्दे या मूत्र मार्ग का संक्रमण, अक्सर बुखार और पेशाब में जलन के साथ",
        "मांसपेशियों या रीढ़ की समस्याएं, जो पीठ दर्द के गुर्दे से ज़्यादा आम कारण हैं",
        "पेशाब के न निकल पाने से गुर्दे की सूजन",
      ],
    },
    pa: {
      about: "ਗੁਰਦੇ ਦਾ ਦਰਦ ਪਾਸੇ (ਫਲੈਂਕ) ਵਿੱਚ ਮਹਿਸੂਸ ਹੁੰਦਾ ਹੈ: ਪਸਲੀਆਂ ਦੇ ਠੀਕ ਹੇਠਾਂ ਪਿੱਠ ਦੇ ਇੱਕ ਜਾਂ ਦੋਵਾਂ ਪਾਸਿਆਂ ਦਾ ਹਿੱਸਾ। ਇਹ ਅਕਸਰ ਡੂੰਘਾ ਦਰਦ ਜਾਂ ਤੇਜ਼, ਆਉਂਦਾ-ਜਾਂਦਾ ਦਰਦ ਹੁੰਦਾ ਹੈ।",
      points: [
        "ਗੁਰਦੇ ਦੀ ਪੱਥਰੀ, ਜਿਸ ਵਿੱਚ ਲਹਿਰਾਂ ਵਿੱਚ ਦਰਦ ਹੁੰਦਾ ਹੈ ਜੋ ਪੱਟ ਦੇ ਜੋੜ ਤੱਕ ਪਹੁੰਚ ਸਕਦਾ ਹੈ",
        "ਗੁਰਦੇ ਜਾਂ ਪਿਸ਼ਾਬ ਮਾਰਗ ਦੀ ਲਾਗ, ਅਕਸਰ ਬੁਖ਼ਾਰ ਅਤੇ ਪਿਸ਼ਾਬ ਵਿੱਚ ਜਲਨ ਨਾਲ",
        "ਮਾਸਪੇਸ਼ੀਆਂ ਜਾਂ ਰੀੜ੍ਹ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ, ਜੋ ਪਿੱਠ ਦਰਦ ਦੇ ਗੁਰਦੇ ਨਾਲੋਂ ਵੱਧ ਆਮ ਕਾਰਨ ਹਨ",
        "ਪਿਸ਼ਾਬ ਦੇ ਨਾ ਨਿਕਲ ਸਕਣ ਨਾਲ ਗੁਰਦੇ ਦੀ ਸੋਜ",
      ],
    },
  },
  {
    id: 'bladder-problems',
    kind: 'condition',
    phrases: ['bladder problem', 'bladder problems', 'bladder trouble', 'weak bladder', 'overactive bladder', 'urine leakage', 'leaking urine', 'urine incontinence', 'cannot hold urine', 'bladder issue', 'मूत्राशय की समस्या', 'ਮਸਾਨੇ ਦੀ ਸਮੱਸਿਆ'],
    en: {
      about: "Bladder problems cover passing urine too often, too suddenly, leaking, or not being able to empty the bladder well.",
      points: [
        "A urinary tract infection, with burning and a strong urge to pass urine",
        "An overactive bladder, with sudden urges that are hard to hold",
        "Weak pelvic muscles, often after childbirth, causing leaks when coughing or laughing",
        "In men, an enlarged prostate that makes it hard to empty the bladder",
      ],
    },
    hi: {
      about: "मूत्राशय की समस्याओं में बहुत बार पेशाब आना, अचानक आना, रिसना, या मूत्राशय का ठीक से खाली न हो पाना शामिल है।",
      points: [
        "मूत्र मार्ग का संक्रमण, जिसमें जलन और पेशाब की तेज़ इच्छा होती है",
        "मूत्राशय का ज़्यादा सक्रिय होना, जिसमें अचानक की इच्छा रोकना मुश्किल होता है",
        "कमज़ोर पेल्विक मांसपेशियां, अक्सर प्रसव के बाद, जिनसे खांसने या हंसने पर पेशाब रिसता है",
        "पुरुषों में बढ़ा हुआ प्रोस्टेट, जिससे मूत्राशय खाली करना मुश्किल होता है",
      ],
    },
    pa: {
      about: "ਮਸਾਨੇ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ ਵਿੱਚ ਬਹੁਤ ਵਾਰ ਪਿਸ਼ਾਬ ਆਉਣਾ, ਅਚਾਨਕ ਆਉਣਾ, ਰਿਸਣਾ, ਜਾਂ ਮਸਾਨੇ ਦਾ ਠੀਕ ਤਰ੍ਹਾਂ ਖਾਲੀ ਨਾ ਹੋ ਸਕਣਾ ਸ਼ਾਮਲ ਹੈ।",
      points: [
        "ਪਿਸ਼ਾਬ ਮਾਰਗ ਦੀ ਲਾਗ, ਜਿਸ ਵਿੱਚ ਜਲਨ ਅਤੇ ਪਿਸ਼ਾਬ ਦੀ ਤੇਜ਼ ਇੱਛਾ ਹੁੰਦੀ ਹੈ",
        "ਮਸਾਨੇ ਦਾ ਵੱਧ ਸਰਗਰਮ ਹੋਣਾ, ਜਿਸ ਵਿੱਚ ਅਚਾਨਕ ਦੀ ਇੱਛਾ ਰੋਕਣਾ ਔਖਾ ਹੁੰਦਾ ਹੈ",
        "ਕਮਜ਼ੋਰ ਪੇਡੂ ਦੀਆਂ ਮਾਸਪੇਸ਼ੀਆਂ, ਅਕਸਰ ਜਣੇਪੇ ਤੋਂ ਬਾਅਦ, ਜਿਨ੍ਹਾਂ ਨਾਲ ਖੰਘਣ ਜਾਂ ਹੱਸਣ ’ਤੇ ਪਿਸ਼ਾਬ ਰਿਸਦਾ ਹੈ",
        "ਮਰਦਾਂ ਵਿੱਚ ਵਧਿਆ ਹੋਇਆ ਪ੍ਰੋਸਟੇਟ, ਜਿਸ ਨਾਲ ਮਸਾਨਾ ਖਾਲੀ ਕਰਨਾ ਔਖਾ ਹੁੰਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'retention-of-urine',
    kind: 'symptom',
    phrases: ['cannot pass urine', 'cant pass urine', 'unable to pass urine', 'not able to pass urine', 'urinary retention', 'difficulty passing urine', 'urine not coming', 'urine blocked', 'peshab nahi aa raha', 'पेशाब नहीं आ रहा', 'ਪਿਸ਼ਾਬ ਨਹੀਂ ਆ ਰਿਹਾ'],
    en: {
      about: "Not being able to pass urine, or only a little with effort, is called urinary retention. It can be painful and should be seen quickly, because a full bladder can harm the kidneys.",
      points: [
        "In men, an enlarged prostate is the commonest cause",
        "A kidney or bladder stone, or an infection with swelling",
        "Problems with the nerves of the bladder, including from diabetes or spine problems",
        "Some treatments, and constipation, can make it worse",
      ],
    },
    hi: {
      about: "पेशाब बिल्कुल न कर पाना, या ज़ोर लगाने पर थोड़ा सा आना, मूत्र रुकावट (यूरिनरी रिटेंशन) कहलाता है। यह दर्दनाक हो सकता है और जल्दी दिखाना चाहिए, क्योंकि भरा मूत्राशय गुर्दों को नुकसान पहुंचा सकता है।",
      points: [
        "पुरुषों में बढ़ा हुआ प्रोस्टेट सबसे आम कारण है",
        "गुर्दे या मूत्राशय की पथरी, या सूजन के साथ संक्रमण",
        "मूत्राशय की नसों की समस्याएं, जिनमें डायबिटीज़ या रीढ़ की समस्याएं शामिल हैं",
        "कुछ इलाज और कब्ज़ इसे बिगाड़ सकते हैं",
      ],
    },
    pa: {
      about: "ਪਿਸ਼ਾਬ ਬਿਲਕੁਲ ਨਾ ਕਰ ਸਕਣਾ, ਜਾਂ ਜ਼ੋਰ ਲਾਉਣ ’ਤੇ ਥੋੜ੍ਹਾ ਜਿਹਾ ਆਉਣਾ, ਪਿਸ਼ਾਬ ਰੁਕਾਵਟ (ਯੂਰਿਨਰੀ ਰਿਟੈਂਸ਼ਨ) ਕਹਾਉਂਦਾ ਹੈ। ਇਹ ਦਰਦਨਾਕ ਹੋ ਸਕਦਾ ਹੈ ਅਤੇ ਜਲਦੀ ਦਿਖਾਉਣਾ ਚਾਹੀਦਾ ਹੈ, ਕਿਉਂਕਿ ਭਰਿਆ ਮਸਾਨਾ ਗੁਰਦਿਆਂ ਨੂੰ ਨੁਕਸਾਨ ਪਹੁੰਚਾ ਸਕਦਾ ਹੈ।",
      points: [
        "ਮਰਦਾਂ ਵਿੱਚ ਵਧਿਆ ਹੋਇਆ ਪ੍ਰੋਸਟੇਟ ਸਭ ਤੋਂ ਆਮ ਕਾਰਨ ਹੈ",
        "ਗੁਰਦੇ ਜਾਂ ਮਸਾਨੇ ਦੀ ਪੱਥਰੀ, ਜਾਂ ਸੋਜ ਦੇ ਨਾਲ ਲਾਗ",
        "ਮਸਾਨੇ ਦੀਆਂ ਨਾੜੀਆਂ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ, ਜਿਨ੍ਹਾਂ ਵਿੱਚ ਸ਼ੂਗਰ ਜਾਂ ਰੀੜ੍ਹ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ ਸ਼ਾਮਲ ਹਨ",
        "ਕੁਝ ਇਲਾਜ ਅਤੇ ਕਬਜ਼ ਇਸ ਨੂੰ ਵਿਗਾੜ ਸਕਦੇ ਹਨ",
      ],
    },
  },
  {
    id: 'circumcision',
    kind: 'test',
    phrases: ['circumcision', 'circumcision surgery', 'circumcision for adults', 'circumcision for child', 'khatna', 'सुन्नत', 'ਸੁੰਨਤ', 'phimosis', 'tight foreskin'],
    en: {
      about: "Circumcision is a small operation that removes the foreskin, the skin over the tip of the penis. It is done for medical reasons, such as a very tight foreskin, or for cultural and religious ones.",
      points: [
        "It is a short operation, usually done with local or general anaesthesia",
        "A tight foreskin that cannot be pulled back and causes pain or infection is a common medical reason",
        "Healing takes a week or two, with simple care of the wound",
        "A doctor can say whether it is needed, and the right age for it",
      ],
    },
    hi: {
      about: "ख़तना एक छोटा ऑपरेशन है जिसमें लिंग के सिरे को ढकने वाली त्वचा (अग्रचर्म) हटाई जाती है। यह चिकित्सा कारणों से किया जाता है, जैसे बहुत कसी त्वचा (फाइमोसिस) या बार-बार संक्रमण, और सांस्कृतिक या धार्मिक कारणों से भी।",
      points: [
        "यह एक छोटा ऑपरेशन है, जो आमतौर पर लोकल या जनरल एनेस्थीसिया में होता है",
        "कसी हुई त्वचा जो पीछे न खिंचे और दर्द या संक्रमण करे, एक आम चिकित्सा कारण है",
        "ठीक होने में एक-दो हफ्ते लगते हैं, घाव की सामान्य देखभाल के साथ",
        "डॉक्टर बता सकते हैं कि यह ज़रूरी है या नहीं, और इसके लिए सही उम्र क्या है",
      ],
    },
    pa: {
      about: "ਸੁੰਨਤ ਇੱਕ ਛੋਟਾ ਆਪ੍ਰੇਸ਼ਨ ਹੈ ਜਿਸ ਵਿੱਚ ਲਿੰਗ ਦੇ ਸਿਰੇ ਨੂੰ ਢਕਣ ਵਾਲੀ ਚਮੜੀ ਹਟਾਈ ਜਾਂਦੀ ਹੈ। ਇਹ ਡਾਕਟਰੀ ਕਾਰਨਾਂ ਕਰਕੇ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਜਿਵੇਂ ਬਹੁਤ ਕਸੀ ਚਮੜੀ (ਫਾਈਮੋਸਿਸ) ਜਾਂ ਵਾਰ-ਵਾਰ ਲਾਗ, ਅਤੇ ਸੱਭਿਆਚਾਰਕ ਜਾਂ ਧਾਰਮਿਕ ਕਾਰਨਾਂ ਕਰਕੇ ਵੀ।",
      points: [
        "ਇਹ ਇੱਕ ਛੋਟਾ ਆਪ੍ਰੇਸ਼ਨ ਹੈ, ਜੋ ਆਮ ਤੌਰ ’ਤੇ ਲੋਕਲ ਜਾਂ ਜਨਰਲ ਐਨੇਸਥੀਸੀਆ ਵਿੱਚ ਹੁੰਦਾ ਹੈ",
        "ਕਸੀ ਹੋਈ ਚਮੜੀ ਜੋ ਪਿੱਛੇ ਨਾ ਖਿੱਚੀ ਜਾਵੇ ਅਤੇ ਦਰਦ ਜਾਂ ਲਾਗ ਕਰੇ, ਇੱਕ ਆਮ ਡਾਕਟਰੀ ਕਾਰਨ ਹੈ",
        "ਠੀਕ ਹੋਣ ਵਿੱਚ ਇੱਕ-ਦੋ ਹਫ਼ਤੇ ਲੱਗਦੇ ਹਨ, ਜ਼ਖ਼ਮ ਦੀ ਸਧਾਰਨ ਦੇਖਭਾਲ ਨਾਲ",
        "ਡਾਕਟਰ ਦੱਸ ਸਕਦੇ ਹਨ ਕਿ ਇਹ ਜ਼ਰੂਰੀ ਹੈ ਜਾਂ ਨਹੀਂ, ਅਤੇ ਇਸ ਲਈ ਸਹੀ ਉਮਰ ਕੀ ਹੈ",
      ],
    },
  },
]
