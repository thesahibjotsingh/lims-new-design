// lib/search/descriptions/symptoms-c.ts
//
// Overviews of urinary, bowel, women's, sleep and children's complaints. DRAFT: not yet reviewed by a LIMS doctor
// (see types.ts). Hindi and Punjabi are drafts of the English. No medicine, dose, home remedy or cure appears in any.

import type { DescriptionEntry } from '@/lib/search/descriptions/types'

export const SYMPTOMS_C: DescriptionEntry[] = [
  {
    id: 'burning-urination',
    kind: 'symptom',
    phrases: ['burning urination', 'burning while urinating', 'burning in urine', 'painful urination', 'pain while passing urine', 'burning micturition', 'burning during urination', 'urine burning', 'burning when passing urine', 'burning while passing urine'],
    en: {
      about: "A burning or stinging feeling when passing urine is a common complaint. It usually points to irritation or infection somewhere in the urinary tract.",
      points: [
        "A urinary tract infection (UTI), which is more common in women",
        "Not drinking enough water, so the urine is concentrated",
        "Kidney or bladder stones",
        "Infections spread through sex",
        "In men, a problem with the prostate",
      ],
    },
    hi: {
      about: "पेशाब करते समय जलन या चुभन होना एक आम शिकायत है। यह आमतौर पर मूत्र नली में कहीं जलन या संक्रमण की ओर इशारा करती है।",
      points: [
        "मूत्र मार्ग का संक्रमण (यूटीआई), जो महिलाओं में ज़्यादा आम है",
        "पर्याप्त पानी न पीना, जिससे पेशाब गाढ़ा हो जाता है",
        "गुर्दे या मूत्राशय की पथरी",
        "यौन संपर्क से फैलने वाले संक्रमण",
        "पुरुषों में, प्रोस्टेट की समस्या",
      ],
    },
    pa: {
      about: "ਪਿਸ਼ਾਬ ਕਰਦੇ ਸਮੇਂ ਜਲਨ ਜਾਂ ਚੁਭਣ ਹੋਣਾ ਇੱਕ ਆਮ ਸ਼ਿਕਾਇਤ ਹੈ। ਇਹ ਆਮ ਤੌਰ ’ਤੇ ਪਿਸ਼ਾਬ ਦੀ ਨਲੀ ਵਿੱਚ ਕਿਤੇ ਜਲਨ ਜਾਂ ਲਾਗ ਵੱਲ ਇਸ਼ਾਰਾ ਕਰਦੀ ਹੈ।",
      points: [
        "ਪਿਸ਼ਾਬ ਮਾਰਗ ਦੀ ਲਾਗ (ਯੂਟੀਆਈ), ਜੋ ਔਰਤਾਂ ਵਿੱਚ ਵੱਧ ਆਮ ਹੈ",
        "ਲੋੜ ਜਿੰਨਾ ਪਾਣੀ ਨਾ ਪੀਣਾ, ਜਿਸ ਨਾਲ ਪਿਸ਼ਾਬ ਗਾੜ੍ਹਾ ਹੋ ਜਾਂਦਾ ਹੈ",
        "ਗੁਰਦੇ ਜਾਂ ਮਸਾਨੇ ਦੀ ਪੱਥਰੀ",
        "ਯੌਨ ਸੰਪਰਕ ਨਾਲ ਫੈਲਣ ਵਾਲੀਆਂ ਲਾਗਾਂ",
        "ਮਰਦਾਂ ਵਿੱਚ, ਪ੍ਰੋਸਟੇਟ ਦੀ ਸਮੱਸਿਆ",
      ],
    },
  },
  {
    id: 'frequent-urination',
    kind: 'symptom',
    phrases: ['frequent urination', 'passing urine often', 'urinating frequently', 'increased urination', 'urine frequency', 'frequent urine', 'urinating too often', 'going to toilet often to pass urine', 'baar baar peshab'],
    en: {
      about: "Passing urine more often than usual, in the day or at night, is a common reason to see a doctor.",
      points: [
        "Drinking more fluids, or a lot of tea, coffee or cold drinks",
        "A urinary tract infection",
        "High blood sugar from diabetes",
        "In men, an enlarged prostate",
        "A bladder that is overactive, or pregnancy",
      ],
    },
    hi: {
      about: "सामान्य से ज़्यादा बार पेशाब आना, दिन में या रात में, डॉक्टर को दिखाने का एक आम कारण है।",
      points: [
        "ज़्यादा तरल पदार्थ पीना, या बहुत ज़्यादा चाय, कॉफ़ी या ठंडे पेय",
        "मूत्र मार्ग का संक्रमण",
        "डायबिटीज़ में खून में शुगर का बढ़ना",
        "पुरुषों में प्रोस्टेट का बढ़ना",
        "मूत्राशय का ज़्यादा सक्रिय होना, या गर्भावस्था",
      ],
    },
    pa: {
      about: "ਆਮ ਨਾਲੋਂ ਵੱਧ ਵਾਰ ਪਿਸ਼ਾਬ ਆਉਣਾ, ਦਿਨ ਵਿੱਚ ਜਾਂ ਰਾਤ ਨੂੰ, ਡਾਕਟਰ ਨੂੰ ਦਿਖਾਉਣ ਦਾ ਇੱਕ ਆਮ ਕਾਰਨ ਹੈ।",
      points: [
        "ਵੱਧ ਤਰਲ ਪਦਾਰਥ ਪੀਣਾ, ਜਾਂ ਬਹੁਤ ਜ਼ਿਆਦਾ ਚਾਹ, ਕੌਫ਼ੀ ਜਾਂ ਠੰਢੇ ਪੀਣ ਵਾਲੇ ਪਦਾਰਥ",
        "ਪਿਸ਼ਾਬ ਮਾਰਗ ਦੀ ਲਾਗ",
        "ਸ਼ੂਗਰ ਵਿੱਚ ਖੂਨ ਵਿੱਚ ਸ਼ੂਗਰ ਦਾ ਵਧਣਾ",
        "ਮਰਦਾਂ ਵਿੱਚ ਪ੍ਰੋਸਟੇਟ ਦਾ ਵਧਣਾ",
        "ਮਸਾਨੇ ਦਾ ਵੱਧ ਸਰਗਰਮ ਹੋਣਾ, ਜਾਂ ਗਰਭ ਅਵਸਥਾ",
      ],
    },
  },
  {
    id: 'blood-in-urine',
    kind: 'symptom',
    phrases: ['blood in urine', 'red urine', 'haematuria', 'hematuria', 'urine with blood', 'bloody urine', 'peshab me khoon', 'blood in the urine'],
    en: {
      about: "Blood in the urine can turn it pink, red or brown, or it may only be seen on a test. It should always be looked into, even if it happens only once.",
      points: [
        "A urinary tract infection",
        "Kidney or bladder stones",
        "An enlarged prostate in men",
        "Injury to the kidney or bladder",
        "Less often, growths or conditions of the kidneys, which a doctor can rule out",
      ],
    },
    hi: {
      about: "पेशाब में खून से वह गुलाबी, लाल या भूरा दिख सकता है, या यह सिर्फ़ जांच में दिख सकता है। इसकी हमेशा जांच करानी चाहिए, भले ही यह सिर्फ़ एक बार हुआ हो।",
      points: [
        "मूत्र मार्ग का संक्रमण",
        "गुर्दे या मूत्राशय की पथरी",
        "पुरुषों में प्रोस्टेट का बढ़ना",
        "गुर्दे या मूत्राशय में चोट",
        "कम मामलों में, गुर्दों की गांठें या दूसरी बीमारियां, जिन्हें डॉक्टर जांचकर अलग कर सकते हैं",
      ],
    },
    pa: {
      about: "ਪਿਸ਼ਾਬ ਵਿੱਚ ਖੂਨ ਨਾਲ ਉਹ ਗੁਲਾਬੀ, ਲਾਲ ਜਾਂ ਭੂਰਾ ਦਿਖ ਸਕਦਾ ਹੈ, ਜਾਂ ਇਹ ਸਿਰਫ਼ ਜਾਂਚ ਵਿੱਚ ਦਿਖ ਸਕਦਾ ਹੈ। ਇਸ ਦੀ ਹਮੇਸ਼ਾ ਜਾਂਚ ਕਰਵਾਉਣੀ ਚਾਹੀਦੀ ਹੈ, ਭਾਵੇਂ ਇਹ ਸਿਰਫ਼ ਇੱਕ ਵਾਰ ਹੋਇਆ ਹੋਵੇ।",
      points: [
        "ਪਿਸ਼ਾਬ ਮਾਰਗ ਦੀ ਲਾਗ",
        "ਗੁਰਦੇ ਜਾਂ ਮਸਾਨੇ ਦੀ ਪੱਥਰੀ",
        "ਮਰਦਾਂ ਵਿੱਚ ਪ੍ਰੋਸਟੇਟ ਦਾ ਵਧਣਾ",
        "ਗੁਰਦੇ ਜਾਂ ਮਸਾਨੇ ਵਿੱਚ ਸੱਟ",
        "ਘੱਟ ਮਾਮਲਿਆਂ ਵਿੱਚ, ਗੁਰਦਿਆਂ ਦੀਆਂ ਗੰਢਾਂ ਜਾਂ ਹੋਰ ਬਿਮਾਰੀਆਂ, ਜਿਨ੍ਹਾਂ ਨੂੰ ਡਾਕਟਰ ਜਾਂਚ ਕੇ ਵੱਖ ਕਰ ਸਕਦੇ ਹਨ",
      ],
    },
  },
  {
    id: 'blood-in-stool',
    kind: 'symptom',
    phrases: ['blood in stool', 'blood in stools', 'bleeding while passing stool', 'rectal bleeding', 'stool with blood', 'bloody stool', 'bleeding from anus', 'blood while passing motion'],
    en: {
      about: "Blood in the stool can be bright red, or dark and tarry. It should always be looked into. The colour and the way it appears help show where it is coming from.",
      points: [
        "Piles (haemorrhoids), often with bright red blood after passing stool",
        "A small tear near the anus (anal fissure), often with pain",
        "Infections or inflammation of the bowel",
        "Ulcers or inflammation of the stomach, which can make stool dark",
        "Less often, growths in the bowel, which is why it must be checked",
      ],
    },
    hi: {
      about: "मल में खून चमकीला लाल, या गहरा और तारकोल जैसा हो सकता है। इसकी हमेशा जांच करानी चाहिए। खून का रंग और उसके आने का तरीका यह बताने में मदद करता है कि वह कहां से आ रहा है।",
      points: [
        "बवासीर, जिसमें अक्सर शौच के बाद चमकीला लाल खून आता है",
        "गुदा के पास छोटी दरार (एनल फिशर), जिसमें अक्सर दर्द भी होता है",
        "आंतों का संक्रमण या सूजन",
        "पेट के अल्सर या सूजन, जिनसे मल गहरे रंग का हो सकता है",
        "कम मामलों में, आंत में गांठें, इसीलिए जांच ज़रूरी है",
      ],
    },
    pa: {
      about: "ਮਲ ਵਿੱਚ ਖੂਨ ਚਮਕਦਾਰ ਲਾਲ, ਜਾਂ ਗੂੜ੍ਹਾ ਅਤੇ ਕੋਲਤਾਰ ਵਰਗਾ ਹੋ ਸਕਦਾ ਹੈ। ਇਸ ਦੀ ਹਮੇਸ਼ਾ ਜਾਂਚ ਕਰਵਾਉਣੀ ਚਾਹੀਦੀ ਹੈ। ਖੂਨ ਦਾ ਰੰਗ ਅਤੇ ਉਸ ਦੇ ਆਉਣ ਦਾ ਢੰਗ ਇਹ ਦੱਸਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ ਕਿ ਉਹ ਕਿੱਥੋਂ ਆ ਰਿਹਾ ਹੈ।",
      points: [
        "ਬਵਾਸੀਰ, ਜਿਸ ਵਿੱਚ ਅਕਸਰ ਟੱਟੀ ਤੋਂ ਬਾਅਦ ਚਮਕਦਾਰ ਲਾਲ ਖੂਨ ਆਉਂਦਾ ਹੈ",
        "ਗੁਦਾ ਦੇ ਨੇੜੇ ਛੋਟੀ ਦਰਾੜ (ਐਨਲ ਫਿਸ਼ਰ), ਜਿਸ ਵਿੱਚ ਅਕਸਰ ਦਰਦ ਵੀ ਹੁੰਦਾ ਹੈ",
        "ਆਂਦਰਾਂ ਦੀ ਲਾਗ ਜਾਂ ਸੋਜ",
        "ਪੇਟ ਦੇ ਅਲਸਰ ਜਾਂ ਸੋਜ, ਜਿਨ੍ਹਾਂ ਨਾਲ ਮਲ ਗੂੜ੍ਹੇ ਰੰਗ ਦਾ ਹੋ ਸਕਦਾ ਹੈ",
        "ਘੱਟ ਮਾਮਲਿਆਂ ਵਿੱਚ, ਆਂਦਰ ਵਿੱਚ ਗੰਢਾਂ, ਇਸੇ ਲਈ ਜਾਂਚ ਜ਼ਰੂਰੀ ਹੈ",
      ],
    },
  },
  {
    id: 'black-stool',
    kind: 'symptom',
    phrases: ['black stool', 'black stools', 'dark stool', 'dark stools', 'tarry stool', 'black motion'],
    en: {
      about: "Black or very dark stool can come from bleeding higher up in the digestive tract, but also from some foods and supplements. If it is black and sticky, or you feel unwell, it should be checked.",
      points: [
        "Bleeding from an ulcer or inflammation in the stomach or upper gut",
        "Blood swallowed from a nosebleed or from the throat",
        "Some foods and supplements, such as iron",
        "Less often, other conditions of the food pipe or stomach",
      ],
    },
    hi: {
      about: "काला या बहुत गहरे रंग का मल पाचन तंत्र के ऊपरी हिस्से में खून बहने से हो सकता है, लेकिन कुछ खाने की चीज़ों और सप्लीमेंट से भी हो सकता है। अगर वह काला और चिपचिपा हो, या आप बीमार महसूस करें, तो जांच करानी चाहिए।",
      points: [
        "पेट या आंत के ऊपरी हिस्से में अल्सर या सूजन से खून बहना",
        "नाक से खून आने या गले से निगला गया खून",
        "कुछ खाने की चीज़ें और सप्लीमेंट, जैसे आयरन",
        "कम मामलों में, खाने की नली या पेट की दूसरी बीमारियां",
      ],
    },
    pa: {
      about: "ਕਾਲਾ ਜਾਂ ਬਹੁਤ ਗੂੜ੍ਹੇ ਰੰਗ ਦਾ ਮਲ ਪਾਚਨ ਤੰਤਰ ਦੇ ਉੱਪਰਲੇ ਹਿੱਸੇ ਵਿੱਚ ਖੂਨ ਵਗਣ ਤੋਂ ਹੋ ਸਕਦਾ ਹੈ, ਪਰ ਕੁਝ ਖਾਣ ਦੀਆਂ ਚੀਜ਼ਾਂ ਅਤੇ ਸਪਲੀਮੈਂਟਾਂ ਤੋਂ ਵੀ ਹੋ ਸਕਦਾ ਹੈ। ਜੇ ਉਹ ਕਾਲਾ ਅਤੇ ਚਿਪਚਿਪਾ ਹੋਵੇ, ਜਾਂ ਤੁਸੀਂ ਬੀਮਾਰ ਮਹਿਸੂਸ ਕਰੋ, ਤਾਂ ਜਾਂਚ ਕਰਵਾਉਣੀ ਚਾਹੀਦੀ ਹੈ।",
      points: [
        "ਪੇਟ ਜਾਂ ਆਂਦਰ ਦੇ ਉੱਪਰਲੇ ਹਿੱਸੇ ਵਿੱਚ ਅਲਸਰ ਜਾਂ ਸੋਜ ਤੋਂ ਖੂਨ ਵਗਣਾ",
        "ਨੱਕ ਤੋਂ ਖੂਨ ਆਉਣ ਜਾਂ ਗਲੇ ਤੋਂ ਨਿਗਲਿਆ ਗਿਆ ਖੂਨ",
        "ਕੁਝ ਖਾਣ ਦੀਆਂ ਚੀਜ਼ਾਂ ਅਤੇ ਸਪਲੀਮੈਂਟ, ਜਿਵੇਂ ਆਇਰਨ",
        "ਘੱਟ ਮਾਮਲਿਆਂ ਵਿੱਚ, ਖਾਣੇ ਦੀ ਨਲੀ ਜਾਂ ਪੇਟ ਦੀਆਂ ਹੋਰ ਬਿਮਾਰੀਆਂ",
      ],
    },
  },
  {
    id: 'irregular-periods',
    kind: 'symptom',
    phrases: ['irregular periods', 'irregular period', 'irregular menstruation', 'periods not regular', 'irregular cycle', 'irregular menstrual cycle', 'irregular menses'],
    en: {
      about: "Periods are called irregular when the gap between them keeps changing, or they come much sooner or later than usual.",
      points: [
        "Hormonal changes, including polycystic ovary syndrome (PCOS)",
        "Thyroid problems",
        "Stress, big changes in weight or too much exercise",
        "The years before menopause, or after childbirth and breastfeeding",
        "Pregnancy, which can also stop periods",
      ],
    },
    hi: {
      about: "माहवारी तब अनियमित कहलाती है जब उसके बीच का अंतराल बदलता रहे, या वह सामान्य से बहुत पहले या बहुत देर से आए।",
      points: [
        "हार्मोन में बदलाव, जिसमें पीसीओएस (PCOS) भी शामिल है",
        "थायराइड की समस्याएं",
        "तनाव, वज़न में बड़ा बदलाव या बहुत ज़्यादा कसरत",
        "रजोनिवृत्ति से पहले के साल, या प्रसव और स्तनपान के बाद",
        "गर्भावस्था, जिसमें भी माहवारी रुक जाती है",
      ],
    },
    pa: {
      about: "ਮਾਹਵਾਰੀ ਉਦੋਂ ਬੇਨਿਯਮੀ ਕਹਾਉਂਦੀ ਹੈ ਜਦੋਂ ਉਸ ਦੇ ਵਿਚਕਾਰਲਾ ਸਮਾਂ ਬਦਲਦਾ ਰਹੇ, ਜਾਂ ਉਹ ਆਮ ਨਾਲੋਂ ਬਹੁਤ ਪਹਿਲਾਂ ਜਾਂ ਬਹੁਤ ਦੇਰ ਨਾਲ ਆਵੇ।",
      points: [
        "ਹਾਰਮੋਨ ਵਿੱਚ ਬਦਲਾਅ, ਜਿਸ ਵਿੱਚ ਪੀਸੀਓਐਸ (PCOS) ਵੀ ਸ਼ਾਮਲ ਹੈ",
        "ਥਾਇਰਾਇਡ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ",
        "ਤਣਾਅ, ਭਾਰ ਵਿੱਚ ਵੱਡਾ ਬਦਲਾਅ ਜਾਂ ਬਹੁਤ ਜ਼ਿਆਦਾ ਕਸਰਤ",
        "ਮਾਹਵਾਰੀ ਬੰਦ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ ਦੇ ਸਾਲ, ਜਾਂ ਜਣੇਪੇ ਅਤੇ ਦੁੱਧ ਪਿਲਾਉਣ ਤੋਂ ਬਾਅਦ",
        "ਗਰਭ ਅਵਸਥਾ, ਜਿਸ ਵਿੱਚ ਵੀ ਮਾਹਵਾਰੀ ਰੁਕ ਜਾਂਦੀ ਹੈ",
      ],
    },
  },
  {
    id: 'missed-period',
    kind: 'symptom',
    phrases: ['missed period', 'period delayed', 'delayed periods', 'periods not coming', 'late periods', 'mahwari nahi aayi', 'menses delayed', 'period late', 'missed periods', 'period not coming', 'delayed period'],
    en: {
      about: "A missed or late period is most often linked to pregnancy, but there are other common reasons.",
      points: [
        "Pregnancy, which a simple test can check",
        "Stress, travel or a change in routine",
        "Hormonal conditions such as PCOS, or thyroid problems",
        "Big changes in weight, or too much exercise",
        "Breastfeeding, or the years around menopause",
      ],
    },
    hi: {
      about: "माहवारी का छूटना या देर से आना सबसे ज़्यादा गर्भावस्था से जुड़ा होता है, लेकिन दूसरे आम कारण भी हैं।",
      points: [
        "गर्भावस्था, जिसे एक आसान जांच से देखा जा सकता है",
        "तनाव, यात्रा या दिनचर्या में बदलाव",
        "हार्मोन की स्थितियां जैसे पीसीओएस, या थायराइड की समस्याएं",
        "वज़न में बड़ा बदलाव, या बहुत ज़्यादा कसरत",
        "स्तनपान, या रजोनिवृत्ति के आसपास के साल",
      ],
    },
    pa: {
      about: "ਮਾਹਵਾਰੀ ਦਾ ਛੁੱਟਣਾ ਜਾਂ ਦੇਰ ਨਾਲ ਆਉਣਾ ਸਭ ਤੋਂ ਵੱਧ ਗਰਭ ਅਵਸਥਾ ਨਾਲ ਜੁੜਿਆ ਹੁੰਦਾ ਹੈ, ਪਰ ਹੋਰ ਆਮ ਕਾਰਨ ਵੀ ਹਨ।",
      points: [
        "ਗਰਭ ਅਵਸਥਾ, ਜਿਸ ਨੂੰ ਇੱਕ ਆਸਾਨ ਜਾਂਚ ਨਾਲ ਦੇਖਿਆ ਜਾ ਸਕਦਾ ਹੈ",
        "ਤਣਾਅ, ਸਫ਼ਰ ਜਾਂ ਰੋਜ਼ਾਨਾ ਰੁਟੀਨ ਵਿੱਚ ਬਦਲਾਅ",
        "ਹਾਰਮੋਨ ਦੀਆਂ ਸਥਿਤੀਆਂ ਜਿਵੇਂ ਪੀਸੀਓਐਸ, ਜਾਂ ਥਾਇਰਾਇਡ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ",
        "ਭਾਰ ਵਿੱਚ ਵੱਡਾ ਬਦਲਾਅ, ਜਾਂ ਬਹੁਤ ਜ਼ਿਆਦਾ ਕਸਰਤ",
        "ਦੁੱਧ ਪਿਲਾਉਣਾ, ਜਾਂ ਮਾਹਵਾਰੀ ਬੰਦ ਹੋਣ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਦੇ ਸਾਲ",
      ],
    },
  },
  {
    id: 'painful-periods',
    kind: 'symptom',
    phrases: ['painful periods', 'period pain', 'menstrual cramps', 'period cramps', 'dysmenorrhea', 'dysmenorrhoea', 'painful period', 'pain during periods', 'cramps during periods'],
    en: {
      about: "Some cramping in the lower belly during periods is common. Pain that is severe, stops daily life or keeps getting worse is not something to put up with.",
      points: [
        "Natural cramping of the womb as it sheds its lining",
        "Endometriosis, where tissue like the womb lining grows outside the womb",
        "Fibroids, which are growths in the womb",
        "Pelvic infection",
        "Pain that starts a few days before the period and is deep or lasting",
      ],
    },
    hi: {
      about: "माहवारी के दौरान पेट के निचले हिस्से में कुछ ऐंठन आम है। जो दर्द तेज़ हो, रोज़मर्रा के काम रोक दे या बढ़ता जाए, उसे सहते रहना ठीक नहीं।",
      points: [
        "गर्भाशय की परत झड़ते समय उसकी स्वाभाविक ऐंठन",
        "एंडोमेट्रियोसिस, जिसमें गर्भाशय की परत जैसा ऊतक गर्भाशय के बाहर बढ़ता है",
        "फाइब्रॉइड, यानी गर्भाशय में गांठें",
        "पेल्विक (श्रोणि) का संक्रमण",
        "माहवारी से कुछ दिन पहले शुरू होने वाला गहरा या लंबा चलने वाला दर्द",
      ],
    },
    pa: {
      about: "ਮਾਹਵਾਰੀ ਦੌਰਾਨ ਪੇਟ ਦੇ ਹੇਠਲੇ ਹਿੱਸੇ ਵਿੱਚ ਕੁਝ ਕੜਵੱਲ ਆਮ ਹੈ। ਜੋ ਦਰਦ ਤੇਜ਼ ਹੋਵੇ, ਰੋਜ਼ਾਨਾ ਦੇ ਕੰਮ ਰੋਕ ਦੇਵੇ ਜਾਂ ਵਧਦਾ ਜਾਵੇ, ਉਸ ਨੂੰ ਸਹਿੰਦੇ ਰਹਿਣਾ ਠੀਕ ਨਹੀਂ।",
      points: [
        "ਬੱਚੇਦਾਨੀ ਦੀ ਪਰਤ ਝੜਨ ਵੇਲੇ ਉਸ ਦੀ ਕੁਦਰਤੀ ਕੜਵੱਲ",
        "ਐਂਡੋਮੈਟਰੀਓਸਿਸ, ਜਿਸ ਵਿੱਚ ਬੱਚੇਦਾਨੀ ਦੀ ਪਰਤ ਵਰਗਾ ਟਿਸ਼ੂ ਬੱਚੇਦਾਨੀ ਤੋਂ ਬਾਹਰ ਵਧਦਾ ਹੈ",
        "ਫਾਈਬ੍ਰੌਇਡ, ਯਾਨੀ ਬੱਚੇਦਾਨੀ ਵਿੱਚ ਗੰਢਾਂ",
        "ਪੇਡੂ ਦੀ ਲਾਗ",
        "ਮਾਹਵਾਰੀ ਤੋਂ ਕੁਝ ਦਿਨ ਪਹਿਲਾਂ ਸ਼ੁਰੂ ਹੋਣ ਵਾਲਾ ਡੂੰਘਾ ਜਾਂ ਲੰਮਾ ਚੱਲਣ ਵਾਲਾ ਦਰਦ",
      ],
    },
  },
  {
    id: 'heavy-periods',
    kind: 'symptom',
    phrases: ['heavy periods', 'excessive bleeding periods', 'too much bleeding in periods', 'heavy period', 'excessive menstrual bleeding'],
    en: {
      about: "Periods are called heavy when the bleeding is much more than usual, lasts longer, or needs frequent changes of pads and may cause tiredness.",
      points: [
        "Hormonal imbalance, including around puberty and menopause",
        "Fibroids or polyps in the womb",
        "Conditions of the womb lining or the ovaries",
        "Some blood or thyroid conditions",
        "A copper coil or some other treatments",
      ],
    },
    hi: {
      about: "माहवारी तब भारी कहलाती है जब खून सामान्य से बहुत ज़्यादा आए, ज़्यादा दिन चले, या पैड बार-बार बदलने पड़ें और थकान हो।",
      points: [
        "हार्मोन का असंतुलन, जिसमें किशोरावस्था और रजोनिवृत्ति के आसपास का समय भी शामिल है",
        "गर्भाशय में फाइब्रॉइड या पॉलिप",
        "गर्भाशय की परत या अंडाशय की बीमारियां",
        "खून या थायराइड की कुछ बीमारियां",
        "कॉपर कॉइल या कुछ दूसरे इलाज",
      ],
    },
    pa: {
      about: "ਮਾਹਵਾਰੀ ਉਦੋਂ ਭਾਰੀ ਕਹਾਉਂਦੀ ਹੈ ਜਦੋਂ ਖੂਨ ਆਮ ਨਾਲੋਂ ਬਹੁਤ ਵੱਧ ਆਵੇ, ਵੱਧ ਦਿਨ ਚੱਲੇ, ਜਾਂ ਪੈਡ ਵਾਰ-ਵਾਰ ਬਦਲਣੇ ਪੈਣ ਅਤੇ ਥਕਾਵਟ ਹੋਵੇ।",
      points: [
        "ਹਾਰਮੋਨ ਦਾ ਅਸੰਤੁਲਨ, ਜਿਸ ਵਿੱਚ ਕਿਸ਼ੋਰ ਅਵਸਥਾ ਅਤੇ ਮਾਹਵਾਰੀ ਬੰਦ ਹੋਣ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਦਾ ਸਮਾਂ ਵੀ ਸ਼ਾਮਲ ਹੈ",
        "ਬੱਚੇਦਾਨੀ ਵਿੱਚ ਫਾਈਬ੍ਰੌਇਡ ਜਾਂ ਪੌਲਿਪ",
        "ਬੱਚੇਦਾਨੀ ਦੀ ਪਰਤ ਜਾਂ ਅੰਡਕੋਸ਼ ਦੀਆਂ ਬਿਮਾਰੀਆਂ",
        "ਖੂਨ ਜਾਂ ਥਾਇਰਾਇਡ ਦੀਆਂ ਕੁਝ ਬਿਮਾਰੀਆਂ",
        "ਕਾਪਰ ਕੁਆਇਲ ਜਾਂ ਕੁਝ ਹੋਰ ਇਲਾਜ",
      ],
    },
  },
  {
    id: 'white-discharge',
    kind: 'symptom',
    phrases: ['white discharge', 'vaginal discharge', 'discharge in women', 'leucorrhoea', 'leucorrhea', 'safed pani', 'safed pani ki shikayat', 'whitish discharge', 'discharge from vagina'],
    en: {
      about: "Some clear or white vaginal discharge is normal and changes through the month. A change in colour, smell or amount, or itching or burning, is worth checking.",
      points: [
        "The normal changes of the monthly cycle, pregnancy or breastfeeding",
        "Yeast (fungal) infection, often with itching",
        "Bacterial or other infections",
        "Infections spread through sex",
        "Poor hygiene, or irritation from soaps and products",
      ],
    },
    hi: {
      about: "कुछ साफ़ या सफ़ेद योनि स्राव सामान्य है और महीने के दौरान बदलता रहता है। रंग, गंध या मात्रा में बदलाव, या खुजली या जलन, जांच कराने लायक है।",
      points: [
        "मासिक चक्र, गर्भावस्था या स्तनपान के सामान्य बदलाव",
        "फंगल (यीस्ट) संक्रमण, जिसमें अक्सर खुजली होती है",
        "बैक्टीरियल या दूसरे संक्रमण",
        "यौन संपर्क से फैलने वाले संक्रमण",
        "साफ़-सफ़ाई की कमी, या साबुन और दूसरी चीज़ों से जलन",
      ],
    },
    pa: {
      about: "ਕੁਝ ਸਾਫ਼ ਜਾਂ ਚਿੱਟਾ ਯੋਨੀ ਸਰਾਵ ਆਮ ਹੈ ਅਤੇ ਮਹੀਨੇ ਦੌਰਾਨ ਬਦਲਦਾ ਰਹਿੰਦਾ ਹੈ। ਰੰਗ, ਬਦਬੂ ਜਾਂ ਮਾਤਰਾ ਵਿੱਚ ਬਦਲਾਅ, ਜਾਂ ਖੁਜਲੀ ਜਾਂ ਜਲਨ, ਜਾਂਚ ਕਰਵਾਉਣ ਵਾਲੀ ਹੈ।",
      points: [
        "ਮਾਸਿਕ ਚੱਕਰ, ਗਰਭ ਅਵਸਥਾ ਜਾਂ ਦੁੱਧ ਪਿਲਾਉਣ ਦੇ ਆਮ ਬਦਲਾਅ",
        "ਫੰਗਲ (ਖ਼ਮੀਰ) ਦੀ ਲਾਗ, ਜਿਸ ਵਿੱਚ ਅਕਸਰ ਖੁਜਲੀ ਹੁੰਦੀ ਹੈ",
        "ਬੈਕਟੀਰੀਆ ਵਾਲੀਆਂ ਜਾਂ ਹੋਰ ਲਾਗਾਂ",
        "ਯੌਨ ਸੰਪਰਕ ਨਾਲ ਫੈਲਣ ਵਾਲੀਆਂ ਲਾਗਾਂ",
        "ਸਾਫ਼-ਸਫ਼ਾਈ ਦੀ ਕਮੀ, ਜਾਂ ਸਾਬਣ ਅਤੇ ਹੋਰ ਚੀਜ਼ਾਂ ਤੋਂ ਜਲਨ",
      ],
    },
  },
  {
    id: 'pregnancy',
    kind: 'condition',
    phrases: ['pregnancy', 'pregnant', 'pregnancy care', 'antenatal care', 'expecting a baby', 'pregnancy check up', 'pregnancy checkup', 'being pregnant', 'garbhavastha'],
    en: {
      about: "Pregnancy lasts about nine months, split into three stages called trimesters. Regular check-ups through these months help look after the mother and the baby.",
      points: [
        "A first visit early on, to confirm the pregnancy and plan the check-ups",
        "Regular check-ups and tests through the months, including a scan",
        "Healthy food, rest and the vaccinations and supplements a doctor advises",
        "A plan for delivery, made together with the doctor",
        "Bleeding, severe pain or the baby moving less need prompt medical attention",
      ],
    },
    hi: {
      about: "गर्भावस्था लगभग नौ महीने चलती है और तीन चरणों में बंटी होती है, जिन्हें तिमाही कहते हैं। इन महीनों में नियमित जांच मां और बच्चे दोनों की देखभाल में मदद करती है।",
      points: [
        "शुरुआत में पहली मुलाक़ात, गर्भावस्था की पुष्टि करने और जांचों की योजना बनाने के लिए",
        "पूरे महीनों में नियमित जांच और टेस्ट, जिनमें स्कैन भी शामिल है",
        "पौष्टिक खाना, आराम, और डॉक्टर की सलाह के अनुसार टीके और पूरक",
        "डॉक्टर के साथ मिलकर तय की गई प्रसव की योजना",
        "खून आना, तेज़ दर्द या बच्चे का कम हिलना तुरंत चिकित्सा ध्यान मांगता है",
      ],
    },
    pa: {
      about: "ਗਰਭ ਅਵਸਥਾ ਲਗਭਗ ਨੌਂ ਮਹੀਨੇ ਚੱਲਦੀ ਹੈ ਅਤੇ ਤਿੰਨ ਪੜਾਵਾਂ ਵਿੱਚ ਵੰਡੀ ਹੁੰਦੀ ਹੈ, ਜਿਨ੍ਹਾਂ ਨੂੰ ਤਿਮਾਹੀ ਕਹਿੰਦੇ ਹਨ। ਇਨ੍ਹਾਂ ਮਹੀਨਿਆਂ ਵਿੱਚ ਨਿਯਮਿਤ ਜਾਂਚ ਮਾਂ ਅਤੇ ਬੱਚੇ ਦੋਵਾਂ ਦੀ ਦੇਖਭਾਲ ਵਿੱਚ ਮਦਦ ਕਰਦੀ ਹੈ।",
      points: [
        "ਸ਼ੁਰੂ ਵਿੱਚ ਪਹਿਲੀ ਮੁਲਾਕਾਤ, ਗਰਭ ਅਵਸਥਾ ਦੀ ਪੁਸ਼ਟੀ ਕਰਨ ਅਤੇ ਜਾਂਚਾਂ ਦੀ ਯੋਜਨਾ ਬਣਾਉਣ ਲਈ",
        "ਮਹੀਨਿਆਂ ਦੌਰਾਨ ਨਿਯਮਿਤ ਜਾਂਚ ਅਤੇ ਟੈਸਟ, ਜਿਨ੍ਹਾਂ ਵਿੱਚ ਸਕੈਨ ਵੀ ਸ਼ਾਮਲ ਹੈ",
        "ਪੌਸ਼ਟਿਕ ਖਾਣਾ, ਆਰਾਮ, ਅਤੇ ਡਾਕਟਰ ਦੀ ਸਲਾਹ ਅਨੁਸਾਰ ਟੀਕੇ ਅਤੇ ਪੂਰਕ",
        "ਡਾਕਟਰ ਨਾਲ ਮਿਲ ਕੇ ਤੈਅ ਕੀਤੀ ਗਈ ਜਣੇਪੇ ਦੀ ਯੋਜਨਾ",
        "ਖੂਨ ਆਉਣਾ, ਤੇਜ਼ ਦਰਦ ਜਾਂ ਬੱਚੇ ਦਾ ਘੱਟ ਹਿੱਲਣਾ ਤੁਰੰਤ ਡਾਕਟਰੀ ਧਿਆਨ ਮੰਗਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'insomnia',
    kind: 'symptom',
    phrases: ['insomnia', 'cannot sleep', 'not able to sleep', 'sleeplessness', 'sleep problem', 'trouble sleeping', 'difficulty sleeping', 'poor sleep', 'bad sleep', 'sleep problems', 'unable to sleep', 'no sleep', 'sleep'],
    en: {
      about: "Insomnia is trouble falling asleep, staying asleep or waking too early, so that you feel tired the next day.",
      points: [
        "Stress, worry or low mood",
        "Irregular sleep times, late screen use or a noisy room",
        "Too much tea or coffee late in the day",
        "Pain, breathing problems or other health conditions",
        "Some treatments, which a doctor can review",
      ],
    },
    hi: {
      about: "अनिद्रा का मतलब है नींद आने में, नींद बनी रहने में या बहुत जल्दी जाग जाने में दिक्कत, जिससे अगले दिन थकान महसूस हो।",
      points: [
        "तनाव, चिंता या उदास मन",
        "सोने के अनियमित समय, देर तक स्क्रीन या शोर वाला कमरा",
        "दिन के आखिर में बहुत ज़्यादा चाय या कॉफ़ी",
        "दर्द, सांस की समस्याएं या दूसरी बीमारियां",
        "कुछ इलाज, जिन्हें डॉक्टर देख सकते हैं",
      ],
    },
    pa: {
      about: "ਇਨਸੌਮਨੀਆ ਦਾ ਮਤਲਬ ਹੈ ਨੀਂਦ ਆਉਣ ਵਿੱਚ, ਨੀਂਦ ਬਣੀ ਰਹਿਣ ਵਿੱਚ ਜਾਂ ਬਹੁਤ ਜਲਦੀ ਜਾਗ ਜਾਣ ਵਿੱਚ ਦਿੱਕਤ, ਜਿਸ ਨਾਲ ਅਗਲੇ ਦਿਨ ਥਕਾਵਟ ਮਹਿਸੂਸ ਹੋਵੇ।",
      points: [
        "ਤਣਾਅ, ਚਿੰਤਾ ਜਾਂ ਉਦਾਸ ਮਨ",
        "ਸੌਣ ਦੇ ਬੇਨਿਯਮੀ ਸਮੇਂ, ਦੇਰ ਤੱਕ ਸਕ੍ਰੀਨ ਜਾਂ ਸ਼ੋਰ ਵਾਲਾ ਕਮਰਾ",
        "ਦਿਨ ਦੇ ਅਖੀਰ ਵਿੱਚ ਬਹੁਤ ਜ਼ਿਆਦਾ ਚਾਹ ਜਾਂ ਕੌਫ਼ੀ",
        "ਦਰਦ, ਸਾਹ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ ਜਾਂ ਹੋਰ ਬਿਮਾਰੀਆਂ",
        "ਕੁਝ ਇਲਾਜ, ਜਿਨ੍ਹਾਂ ਨੂੰ ਡਾਕਟਰ ਦੇਖ ਸਕਦੇ ਹਨ",
      ],
    },
  },
  {
    id: 'snoring',
    kind: 'symptom',
    phrases: ['snoring', 'loud snoring', 'snore', 'snores', 'heavy snoring', 'snoring problem'],
    en: {
      about: "Snoring is a noise made when the airway at the back of the throat narrows during sleep. It is common, but loud snoring with pauses in breathing and daytime tiredness needs a check.",
      points: [
        "Extra weight around the neck",
        "A blocked nose, allergies or a bend in the nasal wall",
        "Enlarged tonsils or adenoids, especially in children",
        "Sleeping on the back",
        "Sleep apnoea, where breathing stops for short spells in sleep",
      ],
    },
    hi: {
      about: "खर्राटे तब आते हैं जब नींद में गले के पीछे की सांस की नली संकरी हो जाती है। यह आम है, लेकिन तेज़ खर्राटे, जिनके साथ सांस रुकती हो और दिन में थकान रहे, की जांच करानी चाहिए।",
      points: [
        "गर्दन के आसपास ज़्यादा चर्बी",
        "बंद नाक, एलर्जी या नाक की दीवार का टेढ़ापन",
        "बढ़े हुए टॉन्सिल या एडेनॉइड, खासकर बच्चों में",
        "पीठ के बल सोना",
        "स्लीप एपनिया, जिसमें नींद में कुछ पल के लिए सांस रुक जाती है",
      ],
    },
    pa: {
      about: "ਘੁਰਾੜੇ ਉਦੋਂ ਆਉਂਦੇ ਹਨ ਜਦੋਂ ਨੀਂਦ ਵਿੱਚ ਗਲੇ ਦੇ ਪਿੱਛੇ ਦੀ ਸਾਹ ਦੀ ਨਲੀ ਤੰਗ ਹੋ ਜਾਂਦੀ ਹੈ। ਇਹ ਆਮ ਹੈ, ਪਰ ਤੇਜ਼ ਘੁਰਾੜੇ, ਜਿਨ੍ਹਾਂ ਦੇ ਨਾਲ ਸਾਹ ਰੁਕਦਾ ਹੋਵੇ ਅਤੇ ਦਿਨ ਵਿੱਚ ਥਕਾਵਟ ਰਹੇ, ਦੀ ਜਾਂਚ ਕਰਵਾਉਣੀ ਚਾਹੀਦੀ ਹੈ।",
      points: [
        "ਗਰਦਨ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਵਾਧੂ ਚਰਬੀ",
        "ਬੰਦ ਨੱਕ, ਐਲਰਜੀ ਜਾਂ ਨੱਕ ਦੀ ਕੰਧ ਦਾ ਟੇਢਾਪਣ",
        "ਵਧੇ ਹੋਏ ਟੌਨਸਿਲ ਜਾਂ ਐਡੀਨੌਇਡ, ਖ਼ਾਸ ਕਰਕੇ ਬੱਚਿਆਂ ਵਿੱਚ",
        "ਪਿੱਠ ਦੇ ਭਾਰ ਸੌਣਾ",
        "ਸਲੀਪ ਐਪਨੀਆ, ਜਿਸ ਵਿੱਚ ਨੀਂਦ ਵਿੱਚ ਕੁਝ ਪਲ ਲਈ ਸਾਹ ਰੁਕ ਜਾਂਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'child-fever',
    kind: 'symptom',
    phrases: ['child fever', 'baby fever', 'fever in child', 'fever in baby', 'fever in children', 'kids fever', 'toddler fever', 'infant fever', 'child has fever', 'my child has fever', 'my son has fever', 'my daughter has fever', 'son has fever', 'daughter has fever', 'bachche ko bukhar', 'bacche ko bukhar'],
    en: {
      about: "Fever is common in children and is usually the body fighting an infection. Babies and young children can become unwell more quickly, so a fever in a baby is checked sooner.",
      points: [
        "Viral infections such as colds, flu or childhood viral illnesses",
        "Throat, ear, chest or urine infections",
        "Stomach infections",
        "Infections spread by mosquitoes",
        "Teething can make a child a little warm, but a high fever needs another explanation",
      ],
    },
    hi: {
      about: "बच्चों में बुखार आम है और आमतौर पर शरीर संक्रमण से लड़ रहा होता है। शिशु और छोटे बच्चे जल्दी बीमार पड़ सकते हैं, इसलिए शिशु के बुखार को जल्दी दिखाया जाता है।",
      points: [
        "सर्दी, फ्लू या बचपन की वायरल बीमारियों जैसे वायरल संक्रमण",
        "गले, कान, छाती या पेशाब के संक्रमण",
        "पेट के संक्रमण",
        "मच्छरों से फैलने वाले संक्रमण",
        "दांत निकलने पर बच्चा थोड़ा गर्म हो सकता है, लेकिन तेज़ बुखार का कोई और कारण होता है",
      ],
    },
    pa: {
      about: "ਬੱਚਿਆਂ ਵਿੱਚ ਬੁਖ਼ਾਰ ਆਮ ਹੈ ਅਤੇ ਆਮ ਤੌਰ ’ਤੇ ਸਰੀਰ ਲਾਗ ਨਾਲ ਲੜ ਰਿਹਾ ਹੁੰਦਾ ਹੈ। ਨਿਆਣੇ ਅਤੇ ਛੋਟੇ ਬੱਚੇ ਜਲਦੀ ਬੀਮਾਰ ਹੋ ਸਕਦੇ ਹਨ, ਇਸ ਲਈ ਨਿਆਣੇ ਦੇ ਬੁਖ਼ਾਰ ਨੂੰ ਜਲਦੀ ਦਿਖਾਇਆ ਜਾਂਦਾ ਹੈ।",
      points: [
        "ਜ਼ੁਕਾਮ, ਫਲੂ ਜਾਂ ਬਚਪਨ ਦੀਆਂ ਵਾਇਰਲ ਬਿਮਾਰੀਆਂ ਵਰਗੀਆਂ ਵਾਇਰਲ ਲਾਗਾਂ",
        "ਗਲੇ, ਕੰਨ, ਛਾਤੀ ਜਾਂ ਪਿਸ਼ਾਬ ਦੀਆਂ ਲਾਗਾਂ",
        "ਪੇਟ ਦੀਆਂ ਲਾਗਾਂ",
        "ਮੱਛਰਾਂ ਨਾਲ ਫੈਲਣ ਵਾਲੀਆਂ ਲਾਗਾਂ",
        "ਦੰਦ ਨਿਕਲਣ ’ਤੇ ਬੱਚਾ ਥੋੜ੍ਹਾ ਗਰਮ ਹੋ ਸਕਦਾ ਹੈ, ਪਰ ਤੇਜ਼ ਬੁਖ਼ਾਰ ਦਾ ਕੋਈ ਹੋਰ ਕਾਰਨ ਹੁੰਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'child-cough',
    kind: 'symptom',
    phrases: ['child cough', 'baby cough', 'cough in child', 'cough in children', 'kids cough', 'cough in baby', 'toddler cough', 'child coughing', 'bachche ko khansi'],
    en: {
      about: "Cough is very common in children, especially with colds. Most are from viral infections and settle, but a cough with fast or noisy breathing needs a doctor.",
      points: [
        "Colds and other viral infections",
        "Allergies or asthma, often with a night-time or exercise cough",
        "A chest infection",
        "Dust, smoke or cold air",
        "Something small stuck in the airway, which comes on suddenly",
      ],
    },
    hi: {
      about: "बच्चों में खांसी बहुत आम है, खासकर सर्दी के साथ। ज़्यादातर वायरल संक्रमण से होती है और ठीक हो जाती है, लेकिन जिस खांसी के साथ सांस तेज़ या आवाज़ वाली हो, उसके लिए डॉक्टर के पास जाना चाहिए।",
      points: [
        "सर्दी और दूसरे वायरल संक्रमण",
        "एलर्जी या अस्थमा, जिनमें अक्सर रात में या कसरत के समय खांसी होती है",
        "छाती का संक्रमण",
        "धूल, धुआं या ठंडी हवा",
        "सांस की नली में कोई छोटी चीज़ अटक जाना, जो अचानक शुरू होता है",
      ],
    },
    pa: {
      about: "ਬੱਚਿਆਂ ਵਿੱਚ ਖੰਘ ਬਹੁਤ ਆਮ ਹੈ, ਖ਼ਾਸ ਕਰਕੇ ਜ਼ੁਕਾਮ ਦੇ ਨਾਲ। ਜ਼ਿਆਦਾਤਰ ਵਾਇਰਲ ਲਾਗ ਤੋਂ ਹੁੰਦੀ ਹੈ ਅਤੇ ਠੀਕ ਹੋ ਜਾਂਦੀ ਹੈ, ਪਰ ਜਿਸ ਖੰਘ ਦੇ ਨਾਲ ਸਾਹ ਤੇਜ਼ ਜਾਂ ਆਵਾਜ਼ ਵਾਲਾ ਹੋਵੇ, ਉਸ ਲਈ ਡਾਕਟਰ ਕੋਲ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ।",
      points: [
        "ਜ਼ੁਕਾਮ ਅਤੇ ਹੋਰ ਵਾਇਰਲ ਲਾਗਾਂ",
        "ਐਲਰਜੀ ਜਾਂ ਦਮਾ, ਜਿਨ੍ਹਾਂ ਵਿੱਚ ਅਕਸਰ ਰਾਤ ਨੂੰ ਜਾਂ ਕਸਰਤ ਵੇਲੇ ਖੰਘ ਹੁੰਦੀ ਹੈ",
        "ਛਾਤੀ ਦੀ ਲਾਗ",
        "ਧੂੜ, ਧੂੰਆਂ ਜਾਂ ਠੰਢੀ ਹਵਾ",
        "ਸਾਹ ਦੀ ਨਲੀ ਵਿੱਚ ਕੋਈ ਛੋਟੀ ਚੀਜ਼ ਅੜ ਜਾਣਾ, ਜੋ ਅਚਾਨਕ ਸ਼ੁਰੂ ਹੁੰਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'child-vomiting',
    kind: 'symptom',
    phrases: ['child vomiting', 'baby vomiting', 'vomiting in child', 'vomiting in baby', 'kids vomiting', 'toddler vomiting', 'child vomits', 'vomiting in children', 'bachche ko ulti'],
    en: {
      about: "Vomiting is common in children and is often from a stomach bug. The main worry is losing too much fluid, which can happen faster in small children.",
      points: [
        "A stomach infection, often with loose motions",
        "Food that did not agree with the child",
        "Other infections, such as in the throat, ear or urine",
        "Coughing hard, which can lead to vomiting",
        "Less often, a blockage or another problem in the stomach or gut",
      ],
    },
    hi: {
      about: "बच्चों में उल्टी आम है और अक्सर पेट के संक्रमण से होती है। मुख्य चिंता शरीर से बहुत ज़्यादा पानी निकल जाने की है, जो छोटे बच्चों में जल्दी हो सकता है।",
      points: [
        "पेट का संक्रमण, अक्सर दस्त के साथ",
        "ऐसा खाना जो बच्चे को पचा नहीं",
        "दूसरे संक्रमण, जैसे गले, कान या पेशाब में",
        "ज़ोर से खांसने से उल्टी हो जाना",
        "कम मामलों में, पेट या आंत में रुकावट या दूसरी समस्या",
      ],
    },
    pa: {
      about: "ਬੱਚਿਆਂ ਵਿੱਚ ਉਲਟੀ ਆਮ ਹੈ ਅਤੇ ਅਕਸਰ ਪੇਟ ਦੀ ਲਾਗ ਤੋਂ ਹੁੰਦੀ ਹੈ। ਮੁੱਖ ਚਿੰਤਾ ਸਰੀਰ ਵਿੱਚੋਂ ਬਹੁਤ ਜ਼ਿਆਦਾ ਪਾਣੀ ਨਿਕਲ ਜਾਣ ਦੀ ਹੈ, ਜੋ ਛੋਟੇ ਬੱਚਿਆਂ ਵਿੱਚ ਜਲਦੀ ਹੋ ਸਕਦਾ ਹੈ।",
      points: [
        "ਪੇਟ ਦੀ ਲਾਗ, ਅਕਸਰ ਦਸਤ ਦੇ ਨਾਲ",
        "ਅਜਿਹਾ ਖਾਣਾ ਜੋ ਬੱਚੇ ਨੂੰ ਹਜ਼ਮ ਨਹੀਂ ਹੋਇਆ",
        "ਹੋਰ ਲਾਗਾਂ, ਜਿਵੇਂ ਗਲੇ, ਕੰਨ ਜਾਂ ਪਿਸ਼ਾਬ ਵਿੱਚ",
        "ਜ਼ੋਰ ਨਾਲ ਖੰਘਣ ਨਾਲ ਉਲਟੀ ਹੋ ਜਾਣਾ",
        "ਘੱਟ ਮਾਮਲਿਆਂ ਵਿੱਚ, ਪੇਟ ਜਾਂ ਆਂਦਰ ਵਿੱਚ ਰੁਕਾਵਟ ਜਾਂ ਹੋਰ ਸਮੱਸਿਆ",
      ],
    },
  },
  {
    id: 'child-diarrhea',
    kind: 'symptom',
    phrases: ['child diarrhea', 'child diarrhoea', 'baby loose motions', 'diarrhea in child', 'diarrhoea in baby', 'kids loose motion', 'loose motions in child', 'loose motion in baby', 'diarrhoea in children', 'baby diarrhoea', 'bachche ko dast'],
    en: {
      about: "Loose, watery stools are common in children, often from a stomach infection. In babies and small children the main danger is losing too much water and salts.",
      points: [
        "Infections from contaminated food or water, or a viral stomach bug",
        "Food that did not agree with the child",
        "Infections elsewhere in the body",
        "Dirty hands, bottles or utensils",
        "Longer-lasting diarrhoea needs the doctor to look for a cause",
      ],
    },
    hi: {
      about: "बच्चों में पतले, पानी जैसे दस्त आम हैं, अक्सर पेट के संक्रमण से। शिशुओं और छोटे बच्चों में मुख्य खतरा शरीर से बहुत ज़्यादा पानी और नमक निकल जाने का है।",
      points: [
        "दूषित खाने या पानी से संक्रमण, या पेट का वायरल संक्रमण",
        "ऐसा खाना जो बच्चे को पचा नहीं",
        "शरीर में कहीं और का संक्रमण",
        "गंदे हाथ, बोतलें या बर्तन",
        "जो दस्त लंबे चलें, उनके कारण की खोज के लिए डॉक्टर को दिखाना होता है",
      ],
    },
    pa: {
      about: "ਬੱਚਿਆਂ ਵਿੱਚ ਪਤਲੇ, ਪਾਣੀ ਵਰਗੇ ਦਸਤ ਆਮ ਹਨ, ਅਕਸਰ ਪੇਟ ਦੀ ਲਾਗ ਤੋਂ। ਨਿਆਣਿਆਂ ਅਤੇ ਛੋਟੇ ਬੱਚਿਆਂ ਵਿੱਚ ਮੁੱਖ ਖ਼ਤਰਾ ਸਰੀਰ ਵਿੱਚੋਂ ਬਹੁਤ ਜ਼ਿਆਦਾ ਪਾਣੀ ਅਤੇ ਲੂਣ ਨਿਕਲ ਜਾਣ ਦਾ ਹੈ।",
      points: [
        "ਦੂਸ਼ਿਤ ਖਾਣੇ ਜਾਂ ਪਾਣੀ ਤੋਂ ਲਾਗ, ਜਾਂ ਪੇਟ ਦੀ ਵਾਇਰਲ ਲਾਗ",
        "ਅਜਿਹਾ ਖਾਣਾ ਜੋ ਬੱਚੇ ਨੂੰ ਹਜ਼ਮ ਨਹੀਂ ਹੋਇਆ",
        "ਸਰੀਰ ਵਿੱਚ ਕਿਤੇ ਹੋਰ ਦੀ ਲਾਗ",
        "ਗੰਦੇ ਹੱਥ, ਬੋਤਲਾਂ ਜਾਂ ਭਾਂਡੇ",
        "ਜੋ ਦਸਤ ਲੰਮੇ ਚੱਲਣ, ਉਨ੍ਹਾਂ ਦੇ ਕਾਰਨ ਦੀ ਖੋਜ ਲਈ ਡਾਕਟਰ ਨੂੰ ਦਿਖਾਉਣਾ ਪੈਂਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'baby-not-feeding',
    kind: 'symptom',
    phrases: ['baby not feeding', 'baby not eating', 'child not eating', 'baby not drinking milk', 'poor feeding in baby', 'child not eating food', 'baby refusing feed', 'toddler not eating', 'baby not feeding properly', 'child not eating properly', 'bachcha nahi kha raha', 'bachcha khana nahi kha raha', 'baby not taking feed'],
    en: {
      about: "A baby or child who feeds poorly or refuses food is a common worry for parents. How long it has gone on, and whether the child is also unwell, helps show how urgent it is.",
      points: [
        "A cold, blocked nose, sore throat or another infection",
        "Teething, or a sore mouth",
        "Tummy troubles such as constipation or acid coming back up",
        "Tiredness, a change in routine or fussy phases in toddlers",
        "In very young babies, feeding problems can be a sign of illness and should be checked quickly",
      ],
    },
    hi: {
      about: "शिशु या बच्चे का ठीक से दूध-खाना न लेना या मना कर देना माता-पिता की आम चिंता है। यह कब से चल रहा है, और क्या बच्चा बीमार भी है, इससे पता चलता है कि यह कितना ज़रूरी है।",
      points: [
        "सर्दी, बंद नाक, गले की खराश या कोई और संक्रमण",
        "दांत निकलना, या मुंह में दर्द",
        "पेट की तकलीफ़ें जैसे कब्ज़ या अम्ल का वापस ऊपर आना",
        "थकान, दिनचर्या में बदलाव या छोटे बच्चों में नखरे वाले दौर",
        "बहुत छोटे शिशुओं में दूध न पीना बीमारी का संकेत हो सकता है और जल्दी दिखाना चाहिए",
      ],
    },
    pa: {
      about: "ਨਿਆਣੇ ਜਾਂ ਬੱਚੇ ਦਾ ਠੀਕ ਤਰ੍ਹਾਂ ਦੁੱਧ-ਖਾਣਾ ਨਾ ਲੈਣਾ ਜਾਂ ਮਨ੍ਹਾ ਕਰ ਦੇਣਾ ਮਾਪਿਆਂ ਦੀ ਆਮ ਚਿੰਤਾ ਹੈ। ਇਹ ਕਦੋਂ ਤੋਂ ਚੱਲ ਰਿਹਾ ਹੈ, ਅਤੇ ਕੀ ਬੱਚਾ ਬੀਮਾਰ ਵੀ ਹੈ, ਇਸ ਤੋਂ ਪਤਾ ਲੱਗਦਾ ਹੈ ਕਿ ਇਹ ਕਿੰਨਾ ਜ਼ਰੂਰੀ ਹੈ।",
      points: [
        "ਜ਼ੁਕਾਮ, ਬੰਦ ਨੱਕ, ਗਲੇ ਦੀ ਖ਼ਰਾਸ਼ ਜਾਂ ਕੋਈ ਹੋਰ ਲਾਗ",
        "ਦੰਦ ਨਿਕਲਣਾ, ਜਾਂ ਮੂੰਹ ਵਿੱਚ ਦਰਦ",
        "ਪੇਟ ਦੀਆਂ ਤਕਲੀਫ਼ਾਂ ਜਿਵੇਂ ਕਬਜ਼ ਜਾਂ ਤੇਜ਼ਾਬ ਦਾ ਵਾਪਸ ਉੱਪਰ ਆਉਣਾ",
        "ਥਕਾਵਟ, ਰੁਟੀਨ ਵਿੱਚ ਬਦਲਾਅ ਜਾਂ ਛੋਟੇ ਬੱਚਿਆਂ ਵਿੱਚ ਨਖ਼ਰੇ ਵਾਲੇ ਦੌਰ",
        "ਬਹੁਤ ਛੋਟੇ ਨਿਆਣਿਆਂ ਵਿੱਚ ਦੁੱਧ ਨਾ ਪੀਣਾ ਬਿਮਾਰੀ ਦਾ ਸੰਕੇਤ ਹੋ ਸਕਦਾ ਹੈ ਅਤੇ ਜਲਦੀ ਦਿਖਾਉਣਾ ਚਾਹੀਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'child-growth',
    kind: 'symptom',
    phrases: ['child growth', 'baby growth', 'slow growth in child', 'child not gaining weight', 'child height', 'child weight', 'poor weight gain in baby', 'growth delay', 'child not growing', 'child growth problem', 'short height child', 'child underweight', 'baby weight gain'],
    en: {
      about: "Children grow at their own pace, and doctors follow height and weight over time rather than at a single visit. A child who is clearly falling behind, or has stopped gaining weight, should be checked.",
      points: [
        "Not enough food, or not enough of the right foods",
        "Frequent infections or long-lasting illness",
        "Problems with feeding or with absorbing food",
        "Family build: tall or short parents often have tall or short children",
        "Hormone conditions, which a doctor can look for",
      ],
    },
    hi: {
      about: "बच्चे अपनी गति से बढ़ते हैं, और डॉक्टर एक ही बार में नहीं बल्कि समय के साथ लंबाई और वज़न देखते हैं। जो बच्चा साफ़ तौर पर पिछड़ रहा हो, या जिसका वज़न बढ़ना बंद हो गया हो, उसकी जांच करानी चाहिए।",
      points: [
        "पर्याप्त खाना न मिलना, या सही तरह का खाना न मिलना",
        "बार-बार संक्रमण या लंबी बीमारी",
        "खाने या खाना सोखने में दिक्कतें",
        "परिवार की बनावट: लंबे या छोटे माता-पिता के बच्चे अक्सर लंबे या छोटे होते हैं",
        "हार्मोन की बीमारियां, जिन्हें डॉक्टर खोज सकते हैं",
      ],
    },
    pa: {
      about: "ਬੱਚੇ ਆਪਣੀ ਗਤੀ ਨਾਲ ਵਧਦੇ ਹਨ, ਅਤੇ ਡਾਕਟਰ ਇੱਕੋ ਵਾਰ ਵਿੱਚ ਨਹੀਂ ਸਗੋਂ ਸਮੇਂ ਨਾਲ ਕੱਦ ਅਤੇ ਭਾਰ ਦੇਖਦੇ ਹਨ। ਜੋ ਬੱਚਾ ਸਾਫ਼ ਤੌਰ ’ਤੇ ਪਿੱਛੇ ਰਹਿ ਰਿਹਾ ਹੋਵੇ, ਜਾਂ ਜਿਸ ਦਾ ਭਾਰ ਵਧਣਾ ਬੰਦ ਹੋ ਗਿਆ ਹੋਵੇ, ਉਸ ਦੀ ਜਾਂਚ ਕਰਵਾਉਣੀ ਚਾਹੀਦੀ ਹੈ।",
      points: [
        "ਲੋੜੀਂਦਾ ਖਾਣਾ ਨਾ ਮਿਲਣਾ, ਜਾਂ ਸਹੀ ਤਰ੍ਹਾਂ ਦਾ ਖਾਣਾ ਨਾ ਮਿਲਣਾ",
        "ਵਾਰ-ਵਾਰ ਲਾਗਾਂ ਜਾਂ ਲੰਮੀ ਬਿਮਾਰੀ",
        "ਖਾਣ ਜਾਂ ਖਾਣਾ ਸੋਖਣ ਵਿੱਚ ਦਿੱਕਤਾਂ",
        "ਪਰਿਵਾਰ ਦੀ ਬਣਤਰ: ਲੰਮੇ ਜਾਂ ਛੋਟੇ ਮਾਪਿਆਂ ਦੇ ਬੱਚੇ ਅਕਸਰ ਲੰਮੇ ਜਾਂ ਛੋਟੇ ਹੁੰਦੇ ਹਨ",
        "ਹਾਰਮੋਨ ਦੀਆਂ ਬਿਮਾਰੀਆਂ, ਜਿਨ੍ਹਾਂ ਨੂੰ ਡਾਕਟਰ ਲੱਭ ਸਕਦੇ ਹਨ",
      ],
    },
  },
]
