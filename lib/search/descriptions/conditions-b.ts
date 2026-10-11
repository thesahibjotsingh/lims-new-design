// lib/search/descriptions/conditions-b.ts
//
// Overviews of ear, nose, throat, nerve, bone, spine, eye and dental conditions. DRAFT: not yet reviewed by a LIMS
// doctor (see types.ts). Hindi and Punjabi are drafts of the English. No medicine, dose, home remedy or cure.

import type { DescriptionEntry } from '@/lib/search/descriptions/types'

export const CONDITIONS_B: DescriptionEntry[] = [
  {
    id: 'sinusitis',
    kind: 'condition',
    phrases: ['sinus', 'sinusitis', 'sinus infection', 'sinus problem', 'sinus pain', 'sinus headache', 'sinuses', 'sinus trouble', 'sinusits'],
    en: {
      about: "Sinusitis is inflammation of the sinuses, the air-filled spaces in the bones around the nose and eyes. It often follows a cold.",
      points: [
        "Common signs: a blocked or runny nose, pressure or pain around the cheeks, eyes or forehead, and reduced smell",
        "Most acute cases are from a virus and settle in a week or two",
        "Allergies and a bend in the nasal wall can make it come back",
        "Fever, swelling around the eyes or symptoms lasting more than a few weeks need a doctor",
      ],
    },
    hi: {
      about: "साइनसाइटिस साइनस की सूजन है, जो नाक और आंखों के आसपास की हड्डियों में हवा से भरी जगहें हैं। यह अक्सर सर्दी के बाद होती है।",
      points: [
        "आम संकेत: बंद या बहती नाक, गालों, आंखों या माथे के आसपास दबाव या दर्द, और सूंघने की क्षमता कम होना",
        "ज़्यादातर तीव्र मामले वायरस से होते हैं और एक-दो हफ्ते में ठीक हो जाते हैं",
        "एलर्जी और नाक की दीवार का टेढ़ापन इसे बार-बार ला सकते हैं",
        "बुखार, आंखों के आसपास सूजन या कुछ हफ्तों से ज़्यादा चलने वाले लक्षणों के लिए डॉक्टर को दिखाना चाहिए",
      ],
    },
    pa: {
      about: "ਸਾਈਨਸਾਈਟਿਸ ਸਾਈਨਸ ਦੀ ਸੋਜ ਹੈ, ਜੋ ਨੱਕ ਅਤੇ ਅੱਖਾਂ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਦੀਆਂ ਹੱਡੀਆਂ ਵਿੱਚ ਹਵਾ ਨਾਲ ਭਰੀਆਂ ਥਾਵਾਂ ਹਨ। ਇਹ ਅਕਸਰ ਜ਼ੁਕਾਮ ਤੋਂ ਬਾਅਦ ਹੁੰਦੀ ਹੈ।",
      points: [
        "ਆਮ ਸੰਕੇਤ: ਬੰਦ ਜਾਂ ਵਗਦਾ ਨੱਕ, ਗੱਲ੍ਹਾਂ, ਅੱਖਾਂ ਜਾਂ ਮੱਥੇ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਦਬਾਅ ਜਾਂ ਦਰਦ, ਅਤੇ ਸੁੰਘਣ ਦੀ ਸਮਰੱਥਾ ਘਟਣਾ",
        "ਜ਼ਿਆਦਾਤਰ ਤੀਬਰ ਮਾਮਲੇ ਵਾਇਰਸ ਤੋਂ ਹੁੰਦੇ ਹਨ ਅਤੇ ਇੱਕ-ਦੋ ਹਫ਼ਤਿਆਂ ਵਿੱਚ ਠੀਕ ਹੋ ਜਾਂਦੇ ਹਨ",
        "ਐਲਰਜੀ ਅਤੇ ਨੱਕ ਦੀ ਕੰਧ ਦਾ ਟੇਢਾਪਣ ਇਸ ਨੂੰ ਵਾਰ-ਵਾਰ ਲਿਆ ਸਕਦੇ ਹਨ",
        "ਬੁਖ਼ਾਰ, ਅੱਖਾਂ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਸੋਜ ਜਾਂ ਕੁਝ ਹਫ਼ਤਿਆਂ ਤੋਂ ਵੱਧ ਚੱਲਣ ਵਾਲੇ ਲੱਛਣਾਂ ਲਈ ਡਾਕਟਰ ਨੂੰ ਦਿਖਾਉਣਾ ਚਾਹੀਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'ear-infection',
    kind: 'condition',
    phrases: ['ear infection', 'infection in ear', 'middle ear infection', 'ear infections', 'otitis', 'kaan ka infection'],
    en: {
      about: "An ear infection is an infection of the middle ear (behind the eardrum) or of the outer ear canal. It is especially common in children.",
      points: [
        "Common signs: ear pain, reduced hearing, a feeling of fullness and sometimes fever",
        "Often follows a cold, when the small tube from the ear to the throat gets blocked",
        "A burst eardrum can let fluid or pus drain, and the pain may ease",
        "A doctor looks into the ear with a small light to see the eardrum",
      ],
    },
    hi: {
      about: "कान का संक्रमण बीच के कान (कान के पर्दे के पीछे) या बाहरी कान की नली का संक्रमण है। यह बच्चों में खासतौर पर आम है।",
      points: [
        "आम संकेत: कान में दर्द, सुनने में कमी, भरा-भरा लगना और कभी-कभी बुखार",
        "अक्सर सर्दी के बाद होता है, जब कान से गले तक की छोटी नली बंद हो जाती है",
        "कान का पर्दा फटने पर तरल या मवाद निकल सकता है, और दर्द कम हो सकता है",
        "डॉक्टर छोटी रोशनी से कान के अंदर देखकर पर्दे की जांच करते हैं",
      ],
    },
    pa: {
      about: "ਕੰਨ ਦੀ ਲਾਗ ਵਿਚਕਾਰਲੇ ਕੰਨ (ਕੰਨ ਦੇ ਪਰਦੇ ਪਿੱਛੇ) ਜਾਂ ਬਾਹਰੀ ਕੰਨ ਦੀ ਨਲੀ ਦੀ ਲਾਗ ਹੈ। ਇਹ ਬੱਚਿਆਂ ਵਿੱਚ ਖ਼ਾਸ ਤੌਰ ’ਤੇ ਆਮ ਹੈ।",
      points: [
        "ਆਮ ਸੰਕੇਤ: ਕੰਨ ਵਿੱਚ ਦਰਦ, ਸੁਣਨ ਵਿੱਚ ਕਮੀ, ਭਰਿਆ-ਭਰਿਆ ਲੱਗਣਾ ਅਤੇ ਕਈ ਵਾਰ ਬੁਖ਼ਾਰ",
        "ਅਕਸਰ ਜ਼ੁਕਾਮ ਤੋਂ ਬਾਅਦ ਹੁੰਦੀ ਹੈ, ਜਦੋਂ ਕੰਨ ਤੋਂ ਗਲੇ ਤੱਕ ਦੀ ਛੋਟੀ ਨਲੀ ਬੰਦ ਹੋ ਜਾਂਦੀ ਹੈ",
        "ਕੰਨ ਦਾ ਪਰਦਾ ਫਟਣ ’ਤੇ ਤਰਲ ਜਾਂ ਪੀਕ ਨਿਕਲ ਸਕਦੀ ਹੈ, ਅਤੇ ਦਰਦ ਘਟ ਸਕਦਾ ਹੈ",
        "ਡਾਕਟਰ ਛੋਟੀ ਰੌਸ਼ਨੀ ਨਾਲ ਕੰਨ ਦੇ ਅੰਦਰ ਦੇਖ ਕੇ ਪਰਦੇ ਦੀ ਜਾਂਚ ਕਰਦੇ ਹਨ",
      ],
    },
  },
  {
    id: 'tonsillitis',
    kind: 'condition',
    phrases: ['tonsils', 'tonsillitis', 'swollen tonsils', 'tonsil infection', 'tonsils pain', 'tonsil pain', 'tonsil problem', 'tonsilitis'],
    en: {
      about: "Tonsillitis is inflammation of the tonsils, the two small glands at the back of the throat. It causes a sore throat and painful swallowing.",
      points: [
        "Often from a virus, sometimes from bacteria such as strep",
        "Common signs: red, swollen tonsils, sometimes with white spots, fever and tender glands in the neck",
        "It is most common in children and young people",
        "Tonsils that keep getting infected, or that cause breathing trouble in sleep, may need surgery to remove them",
      ],
    },
    hi: {
      about: "टॉन्सिलाइटिस टॉन्सिल की सूजन है, जो गले के पीछे दो छोटी ग्रंथियां हैं। इससे गले में खराश और निगलने में दर्द होता है।",
      points: [
        "अक्सर वायरस से, कभी-कभी स्ट्रेप जैसे बैक्टीरिया से",
        "आम संकेत: लाल, सूजे हुए टॉन्सिल, कभी-कभी सफ़ेद धब्बों, बुखार और गर्दन की दर्द वाली गांठों के साथ",
        "यह बच्चों और युवाओं में सबसे आम है",
        "जो टॉन्सिल बार-बार संक्रमित हों, या नींद में सांस की दिक्कत करें, उन्हें निकालने के लिए ऑपरेशन की ज़रूरत पड़ सकती है",
      ],
    },
    pa: {
      about: "ਟੌਨਸਿਲਾਈਟਿਸ ਟੌਨਸਿਲ ਦੀ ਸੋਜ ਹੈ, ਜੋ ਗਲੇ ਦੇ ਪਿੱਛੇ ਦੋ ਛੋਟੀਆਂ ਗ੍ਰੰਥੀਆਂ ਹਨ। ਇਸ ਨਾਲ ਗਲੇ ਵਿੱਚ ਖ਼ਰਾਸ਼ ਅਤੇ ਨਿਗਲਣ ਵਿੱਚ ਦਰਦ ਹੁੰਦਾ ਹੈ।",
      points: [
        "ਅਕਸਰ ਵਾਇਰਸ ਤੋਂ, ਕਈ ਵਾਰ ਸਟ੍ਰੈਪ ਵਰਗੇ ਬੈਕਟੀਰੀਆ ਤੋਂ",
        "ਆਮ ਸੰਕੇਤ: ਲਾਲ, ਸੁੱਜੇ ਹੋਏ ਟੌਨਸਿਲ, ਕਈ ਵਾਰ ਚਿੱਟੇ ਧੱਬਿਆਂ, ਬੁਖ਼ਾਰ ਅਤੇ ਗਰਦਨ ਦੀਆਂ ਦਰਦ ਵਾਲੀਆਂ ਗੰਢਾਂ ਨਾਲ",
        "ਇਹ ਬੱਚਿਆਂ ਅਤੇ ਨੌਜਵਾਨਾਂ ਵਿੱਚ ਸਭ ਤੋਂ ਆਮ ਹੈ",
        "ਜੋ ਟੌਨਸਿਲ ਵਾਰ-ਵਾਰ ਲਾਗ ਵਾਲੇ ਹੋਣ, ਜਾਂ ਨੀਂਦ ਵਿੱਚ ਸਾਹ ਦੀ ਦਿੱਕਤ ਕਰਨ, ਉਨ੍ਹਾਂ ਨੂੰ ਕੱਢਣ ਲਈ ਆਪ੍ਰੇਸ਼ਨ ਦੀ ਲੋੜ ਪੈ ਸਕਦੀ ਹੈ",
      ],
    },
  },
  {
    id: 'epilepsy',
    kind: 'condition',
    phrases: ['epilepsy', 'epileptic', 'daura padna', 'mirgi', 'mirgi ke daure', 'दौरा पड़ना', 'मिर्गी', 'ਦੌਰਾ ਪੈਣਾ', 'ਮਿਰਗੀ'],
    en: {
      about: "Epilepsy is a long-term condition of the brain that causes repeated seizures (fits). A seizure is a sudden burst of unusual electrical activity in the brain.",
      points: [
        "Seizures can look different: shaking of the body, staring, or a short loss of awareness",
        "It can start at any age and sometimes runs in families, or follows a brain injury or infection",
        "A doctor asks about what happened, and may order a brain wave test (EEG) and a scan",
        "A seizure that lasts more than five minutes, or one after another, is an emergency",
      ],
    },
    hi: {
      about: "मिर्गी दिमाग की एक लंबी चलने वाली बीमारी है जिसमें बार-बार दौरे पड़ते हैं। दौरा दिमाग में असामान्य बिजली की गतिविधि का अचानक उभार है।",
      points: [
        "दौरे अलग-अलग दिख सकते हैं: शरीर का कांपना, एकटक देखना, या थोड़ी देर के लिए होश खोना",
        "यह किसी भी उम्र में शुरू हो सकती है और कभी-कभी परिवार में चलती है, या दिमाग की चोट या संक्रमण के बाद होती है",
        "डॉक्टर पूछते हैं कि क्या हुआ, और दिमाग की तरंगों की जांच (ईईजी) और स्कैन करवा सकते हैं",
        "जो दौरा पांच मिनट से ज़्यादा चले, या एक के बाद एक आए, वह आपातकाल है",
      ],
    },
    pa: {
      about: "ਮਿਰਗੀ ਦਿਮਾਗ ਦੀ ਇੱਕ ਲੰਮੇ ਸਮੇਂ ਦੀ ਬਿਮਾਰੀ ਹੈ ਜਿਸ ਵਿੱਚ ਵਾਰ-ਵਾਰ ਦੌਰੇ ਪੈਂਦੇ ਹਨ। ਦੌਰਾ ਦਿਮਾਗ ਵਿੱਚ ਅਸਧਾਰਨ ਬਿਜਲੀ ਗਤੀਵਿਧੀ ਦਾ ਅਚਾਨਕ ਉਭਾਰ ਹੈ।",
      points: [
        "ਦੌਰੇ ਵੱਖ-ਵੱਖ ਦਿਖ ਸਕਦੇ ਹਨ: ਸਰੀਰ ਦਾ ਕੰਬਣਾ, ਇਕਟੱਕ ਦੇਖਣਾ, ਜਾਂ ਥੋੜ੍ਹੀ ਦੇਰ ਲਈ ਹੋਸ਼ ਗੁਆਉਣਾ",
        "ਇਹ ਕਿਸੇ ਵੀ ਉਮਰ ਵਿੱਚ ਸ਼ੁਰੂ ਹੋ ਸਕਦੀ ਹੈ ਅਤੇ ਕਈ ਵਾਰ ਪਰਿਵਾਰ ਵਿੱਚ ਚੱਲਦੀ ਹੈ, ਜਾਂ ਦਿਮਾਗ ਦੀ ਸੱਟ ਜਾਂ ਲਾਗ ਤੋਂ ਬਾਅਦ ਹੁੰਦੀ ਹੈ",
        "ਡਾਕਟਰ ਪੁੱਛਦੇ ਹਨ ਕਿ ਕੀ ਹੋਇਆ, ਅਤੇ ਦਿਮਾਗ ਦੀਆਂ ਤਰੰਗਾਂ ਦੀ ਜਾਂਚ (ਈਈਜੀ) ਅਤੇ ਸਕੈਨ ਕਰਵਾ ਸਕਦੇ ਹਨ",
        "ਜੋ ਦੌਰਾ ਪੰਜ ਮਿੰਟ ਤੋਂ ਵੱਧ ਚੱਲੇ, ਜਾਂ ਇੱਕ ਤੋਂ ਬਾਅਦ ਇੱਕ ਆਵੇ, ਉਹ ਐਮਰਜੈਂਸੀ ਹੈ",
      ],
    },
  },
  {
    id: 'memory-loss',
    kind: 'symptom',
    phrases: ['memory loss', 'forgetfulness', 'poor memory', 'forgetting things', 'memory problem', 'memory problems', 'weak memory', 'losing memory', 'dementia', 'yaddasht kam hona'],
    en: {
      about: "Everyone forgets things sometimes. Memory loss that keeps getting worse, or that affects daily life, is worth a check.",
      points: [
        "Stress, poor sleep, low mood and tiredness, which make it harder to remember",
        "Low levels of vitamin B12, or thyroid problems",
        "Side effects of some treatments",
        "Conditions of the brain that become more common with age, such as dementia",
        "A past head injury or stroke",
      ],
    },
    hi: {
      about: "हर कोई कभी-कभी चीज़ें भूल जाता है। याददाश्त की कमी जो बढ़ती ही जाए, या रोज़मर्रा की ज़िंदगी पर असर डाले, उसे जांच के लायक समझना चाहिए।",
      points: [
        "तनाव, कम नींद, उदास मन और थकान, जिनसे याद रखना मुश्किल हो जाता है",
        "विटामिन B12 की कमी, या थायराइड की समस्याएं",
        "कुछ इलाजों के दुष्प्रभाव",
        "दिमाग की बीमारियां जो उम्र के साथ ज़्यादा आम होती हैं, जैसे डिमेंशिया",
        "पहले हुई सिर की चोट या स्ट्रोक",
      ],
    },
    pa: {
      about: "ਹਰ ਕੋਈ ਕਦੇ-ਕਦੇ ਚੀਜ਼ਾਂ ਭੁੱਲ ਜਾਂਦਾ ਹੈ। ਯਾਦਾਸ਼ਤ ਦੀ ਕਮੀ ਜੋ ਵਧਦੀ ਹੀ ਜਾਵੇ, ਜਾਂ ਰੋਜ਼ਾਨਾ ਜ਼ਿੰਦਗੀ ’ਤੇ ਅਸਰ ਪਾਵੇ, ਉਸ ਨੂੰ ਜਾਂਚ ਦੇ ਲਾਇਕ ਸਮਝਣਾ ਚਾਹੀਦਾ ਹੈ।",
      points: [
        "ਤਣਾਅ, ਘੱਟ ਨੀਂਦ, ਉਦਾਸ ਮਨ ਅਤੇ ਥਕਾਵਟ, ਜਿਨ੍ਹਾਂ ਨਾਲ ਯਾਦ ਰੱਖਣਾ ਔਖਾ ਹੋ ਜਾਂਦਾ ਹੈ",
        "ਵਿਟਾਮਿਨ B12 ਦੀ ਕਮੀ, ਜਾਂ ਥਾਇਰਾਇਡ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ",
        "ਕੁਝ ਇਲਾਜਾਂ ਦੇ ਮਾੜੇ ਪ੍ਰਭਾਵ",
        "ਦਿਮਾਗ ਦੀਆਂ ਬਿਮਾਰੀਆਂ ਜੋ ਉਮਰ ਨਾਲ ਵੱਧ ਆਮ ਹੁੰਦੀਆਂ ਹਨ, ਜਿਵੇਂ ਡਿਮੈਂਸ਼ੀਆ",
        "ਪਹਿਲਾਂ ਹੋਈ ਸਿਰ ਦੀ ਸੱਟ ਜਾਂ ਸਟ੍ਰੋਕ",
      ],
    },
  },
  {
    id: 'slipped-disc',
    kind: 'condition',
    phrases: ['slip disc', 'slipped disc', 'herniated disc', 'disc prolapse', 'disc bulge', 'bulging disc', 'prolapsed disc', 'disc problem', 'disc herniation', 'slipdisc', 'स्लिप डिस्क', 'ਸਲਿਪ ਡਿਸਕ'],
    en: {
      about: "The bones of the spine are cushioned by soft discs. A slipped (herniated) disc is when a disc bulges out and may press on a nearby nerve.",
      points: [
        "Common signs: back or neck pain, and pain, numbness or tingling going down a leg or an arm",
        "It can follow lifting, a twist or an injury, or come with age-related wear",
        "Many improve over weeks with the right care",
        "Weakness in a limb, or trouble with bladder or bowel control, needs urgent attention",
        "An MRI scan shows the disc and the nerve",
      ],
    },
    hi: {
      about: "रीढ़ की हड्डियों के बीच नरम डिस्क गद्दी का काम करती हैं। स्लिप (हर्नियेटेड) डिस्क में कोई डिस्क बाहर उभर आती है और पास की किसी नस पर दबाव डाल सकती है।",
      points: [
        "आम संकेत: कमर या गर्दन का दर्द, और पैर या हाथ में नीचे तक जाने वाला दर्द, सुन्नपन या झनझनाहट",
        "यह भारी उठाने, मुड़ने या चोट के बाद हो सकती है, या उम्र की घिसावट के साथ आती है",
        "कई मामले सही देखभाल से हफ्तों में बेहतर हो जाते हैं",
        "हाथ-पैर में कमज़ोरी, या पेशाब-शौच पर नियंत्रण में दिक्कत पर तुरंत ध्यान चाहिए",
        "एमआरआई स्कैन में डिस्क और नस दिखती है",
      ],
    },
    pa: {
      about: "ਰੀੜ੍ਹ ਦੀਆਂ ਹੱਡੀਆਂ ਵਿਚਕਾਰ ਨਰਮ ਡਿਸਕ ਗੱਦੀ ਦਾ ਕੰਮ ਕਰਦੀਆਂ ਹਨ। ਸਲਿੱਪ (ਹਰਨੀਏਟਿਡ) ਡਿਸਕ ਵਿੱਚ ਕੋਈ ਡਿਸਕ ਬਾਹਰ ਉੱਭਰ ਆਉਂਦੀ ਹੈ ਅਤੇ ਨੇੜੇ ਦੀ ਕਿਸੇ ਨਾੜੀ ’ਤੇ ਦਬਾਅ ਪਾ ਸਕਦੀ ਹੈ।",
      points: [
        "ਆਮ ਸੰਕੇਤ: ਕਮਰ ਜਾਂ ਗਰਦਨ ਦਾ ਦਰਦ, ਅਤੇ ਲੱਤ ਜਾਂ ਬਾਂਹ ਵਿੱਚ ਹੇਠਾਂ ਤੱਕ ਜਾਣ ਵਾਲਾ ਦਰਦ, ਸੁੰਨਪਣ ਜਾਂ ਝਰਨਾਹਟ",
        "ਇਹ ਭਾਰੀ ਚੁੱਕਣ, ਮੁੜਨ ਜਾਂ ਸੱਟ ਤੋਂ ਬਾਅਦ ਹੋ ਸਕਦੀ ਹੈ, ਜਾਂ ਉਮਰ ਦੀ ਘਸਾਈ ਨਾਲ ਆਉਂਦੀ ਹੈ",
        "ਕਈ ਮਾਮਲੇ ਸਹੀ ਦੇਖਭਾਲ ਨਾਲ ਹਫ਼ਤਿਆਂ ਵਿੱਚ ਬਿਹਤਰ ਹੋ ਜਾਂਦੇ ਹਨ",
        "ਹੱਥ-ਪੈਰ ਵਿੱਚ ਕਮਜ਼ੋਰੀ, ਜਾਂ ਪਿਸ਼ਾਬ-ਟੱਟੀ ’ਤੇ ਕੰਟਰੋਲ ਵਿੱਚ ਦਿੱਕਤ ’ਤੇ ਤੁਰੰਤ ਧਿਆਨ ਚਾਹੀਦਾ ਹੈ",
        "ਐਮਆਰਆਈ ਸਕੈਨ ਵਿੱਚ ਡਿਸਕ ਅਤੇ ਨਾੜੀ ਦਿਖਦੀ ਹੈ",
      ],
    },
  },
  {
    id: 'sciatica',
    kind: 'condition',
    phrases: ['sciatica', 'sciatic pain', 'sciatic nerve pain', 'pain going down the leg from back', 'sciatica pain', 'साइटिका', 'ਸਾਇਟਿਕਾ'],
    en: {
      about: "Sciatica is pain that runs along the sciatic nerve, from the lower back through the buttock and down the leg, usually on one side.",
      points: [
        "Often from a slipped disc or narrowing of the spinal canal pressing on a nerve root",
        "Pain may be sharp, burning or like an electric shock, sometimes with tingling or numbness",
        "It is often worse with sitting, coughing or sneezing",
        "Most cases improve over weeks, but weakness in the leg or trouble with bladder or bowel control needs urgent care",
      ],
    },
    hi: {
      about: "साइटिका वह दर्द है जो साइटिक नस के साथ-साथ चलता है, कमर के निचले हिस्से से नितंब होते हुए पैर में नीचे तक, आमतौर पर एक तरफ़।",
      points: [
        "अक्सर स्लिप डिस्क या रीढ़ की नली के संकरे होने से नस की जड़ पर दबाव के कारण",
        "दर्द तीखा, जलन वाला या बिजली के झटके जैसा हो सकता है, कभी-कभी झनझनाहट या सुन्नपन के साथ",
        "यह अक्सर बैठने, खांसने या छींकने से बढ़ता है",
        "ज़्यादातर मामले हफ्तों में बेहतर होते हैं, लेकिन पैर में कमज़ोरी या पेशाब-शौच पर नियंत्रण में दिक्कत पर तुरंत इलाज चाहिए",
      ],
    },
    pa: {
      about: "ਸਾਇਟਿਕਾ ਉਹ ਦਰਦ ਹੈ ਜੋ ਸਾਇਟਿਕ ਨਾੜੀ ਦੇ ਨਾਲ-ਨਾਲ ਚੱਲਦਾ ਹੈ, ਕਮਰ ਦੇ ਹੇਠਲੇ ਹਿੱਸੇ ਤੋਂ ਚੂਲੇ ਰਾਹੀਂ ਲੱਤ ਵਿੱਚ ਹੇਠਾਂ ਤੱਕ, ਆਮ ਤੌਰ ’ਤੇ ਇੱਕ ਪਾਸੇ।",
      points: [
        "ਅਕਸਰ ਸਲਿੱਪ ਡਿਸਕ ਜਾਂ ਰੀੜ੍ਹ ਦੀ ਨਲੀ ਦੇ ਤੰਗ ਹੋਣ ਨਾਲ ਨਾੜੀ ਦੀ ਜੜ੍ਹ ’ਤੇ ਦਬਾਅ ਕਾਰਨ",
        "ਦਰਦ ਤਿੱਖਾ, ਜਲਨ ਵਾਲਾ ਜਾਂ ਬਿਜਲੀ ਦੇ ਝਟਕੇ ਵਰਗਾ ਹੋ ਸਕਦਾ ਹੈ, ਕਈ ਵਾਰ ਝਰਨਾਹਟ ਜਾਂ ਸੁੰਨਪਣ ਨਾਲ",
        "ਇਹ ਅਕਸਰ ਬੈਠਣ, ਖੰਘਣ ਜਾਂ ਛਿੱਕਣ ਨਾਲ ਵਧਦਾ ਹੈ",
        "ਜ਼ਿਆਦਾਤਰ ਮਾਮਲੇ ਹਫ਼ਤਿਆਂ ਵਿੱਚ ਬਿਹਤਰ ਹੁੰਦੇ ਹਨ, ਪਰ ਲੱਤ ਵਿੱਚ ਕਮਜ਼ੋਰੀ ਜਾਂ ਪਿਸ਼ਾਬ-ਟੱਟੀ ’ਤੇ ਕੰਟਰੋਲ ਵਿੱਚ ਦਿੱਕਤ ’ਤੇ ਤੁਰੰਤ ਇਲਾਜ ਚਾਹੀਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'scoliosis',
    kind: 'condition',
    phrases: ['scoliosis', 'curved spine', 'spine curvature', 'crooked spine', 'bent spine', 'sideways curve of spine'],
    en: {
      about: "Scoliosis is a sideways curve of the spine, often in the shape of an S or a C. It is most often found in children and teenagers during growth.",
      points: [
        "In most young people the cause is not known",
        "Signs can include uneven shoulders or hips, or one shoulder blade standing out",
        "An X-ray shows the curve and how large it is",
        "Mild curves are watched over time, and larger ones may need a brace or surgery",
      ],
    },
    hi: {
      about: "स्कोलियोसिस रीढ़ का बगल की ओर मुड़ाव है, अक्सर S या C के आकार का। यह ज़्यादातर बच्चों और किशोरों में बढ़ने के दौरान पाया जाता है।",
      points: [
        "ज़्यादातर युवाओं में इसका कारण पता नहीं होता",
        "संकेतों में असमान कंधे या कूल्हे, या एक कंधे की हड्डी का उभरा होना शामिल हो सकता है",
        "एक्स-रे से मुड़ाव और उसका आकार पता चलता है",
        "हल्के मुड़ाव पर समय के साथ नज़र रखी जाती है, और बड़े मुड़ाव में ब्रेस या ऑपरेशन की ज़रूरत पड़ सकती है",
      ],
    },
    pa: {
      about: "ਸਕੋਲੀਓਸਿਸ ਰੀੜ੍ਹ ਦਾ ਪਾਸੇ ਵੱਲ ਮੁੜਾਅ ਹੈ, ਅਕਸਰ S ਜਾਂ C ਦੇ ਆਕਾਰ ਦਾ। ਇਹ ਜ਼ਿਆਦਾਤਰ ਬੱਚਿਆਂ ਅਤੇ ਕਿਸ਼ੋਰਾਂ ਵਿੱਚ ਵਧਣ ਦੌਰਾਨ ਪਾਇਆ ਜਾਂਦਾ ਹੈ।",
      points: [
        "ਜ਼ਿਆਦਾਤਰ ਨੌਜਵਾਨਾਂ ਵਿੱਚ ਇਸ ਦਾ ਕਾਰਨ ਪਤਾ ਨਹੀਂ ਹੁੰਦਾ",
        "ਸੰਕੇਤਾਂ ਵਿੱਚ ਅਸਮਾਨ ਮੋਢੇ ਜਾਂ ਕੁੱਲ੍ਹੇ, ਜਾਂ ਇੱਕ ਮੋਢੇ ਦੀ ਹੱਡੀ ਦਾ ਉੱਭਰਿਆ ਹੋਣਾ ਸ਼ਾਮਲ ਹੋ ਸਕਦਾ ਹੈ",
        "ਐਕਸ-ਰੇ ਨਾਲ ਮੁੜਾਅ ਅਤੇ ਉਸ ਦਾ ਆਕਾਰ ਪਤਾ ਲੱਗਦਾ ਹੈ",
        "ਹਲਕੇ ਮੁੜਾਅ ’ਤੇ ਸਮੇਂ ਨਾਲ ਨਜ਼ਰ ਰੱਖੀ ਜਾਂਦੀ ਹੈ, ਅਤੇ ਵੱਡੇ ਮੁੜਾਅ ਵਿੱਚ ਬ੍ਰੇਸ ਜਾਂ ਆਪ੍ਰੇਸ਼ਨ ਦੀ ਲੋੜ ਪੈ ਸਕਦੀ ਹੈ",
      ],
    },
  },
  {
    id: 'frozen-shoulder',
    kind: 'condition',
    phrases: ['frozen shoulder', 'stiff shoulder', 'adhesive capsulitis', 'shoulder freeze', 'shoulder stuck', 'shoulder cannot lift'],
    en: {
      about: "A frozen shoulder is a painful, stiff shoulder that slowly loses its range of movement. It tends to go through painful, stiff and then recovering stages over a long time.",
      points: [
        "It is more common between 40 and 60 years of age, and in people with diabetes",
        "It can follow an injury or a period when the shoulder was not used",
        "Night pain and trouble reaching up or behind the back are typical",
        "It usually improves over months to a couple of years, and guided exercises help",
      ],
    },
    hi: {
      about: "फ्रोज़न शोल्डर में कंधा दर्द भरा और जकड़ा हुआ हो जाता है और धीरे-धीरे उसकी हिलने की क्षमता कम होती जाती है। यह लंबे समय में दर्द, जकड़न और फिर सुधार के चरणों से गुज़रता है।",
      points: [
        "यह 40 से 60 साल की उम्र के बीच और डायबिटीज़ वाले लोगों में ज़्यादा आम है",
        "यह चोट के बाद, या कंधे का इस्तेमाल न होने के दौर के बाद हो सकता है",
        "रात में दर्द और ऊपर या पीठ के पीछे हाथ ले जाने में दिक्कत इसके आम लक्षण हैं",
        "यह आमतौर पर महीनों से लेकर कुछ सालों में ठीक होता है, और निर्देशित कसरतें मदद करती हैं",
      ],
    },
    pa: {
      about: "ਫ੍ਰੋਜ਼ਨ ਸ਼ੋਲਡਰ ਵਿੱਚ ਮੋਢਾ ਦਰਦ ਭਰਿਆ ਅਤੇ ਜਕੜਿਆ ਹੋਇਆ ਹੋ ਜਾਂਦਾ ਹੈ ਅਤੇ ਹੌਲੀ-ਹੌਲੀ ਉਸ ਦੇ ਹਿੱਲਣ ਦੀ ਸਮਰੱਥਾ ਘਟਦੀ ਜਾਂਦੀ ਹੈ। ਇਹ ਲੰਮੇ ਸਮੇਂ ਵਿੱਚ ਦਰਦ, ਜਕੜਨ ਅਤੇ ਫਿਰ ਸੁਧਾਰ ਦੇ ਪੜਾਵਾਂ ਵਿੱਚੋਂ ਲੰਘਦਾ ਹੈ।",
      points: [
        "ਇਹ 40 ਤੋਂ 60 ਸਾਲ ਦੀ ਉਮਰ ਦੇ ਵਿਚਕਾਰ ਅਤੇ ਸ਼ੂਗਰ ਵਾਲੇ ਲੋਕਾਂ ਵਿੱਚ ਵੱਧ ਆਮ ਹੈ",
        "ਇਹ ਸੱਟ ਤੋਂ ਬਾਅਦ, ਜਾਂ ਮੋਢੇ ਦੀ ਵਰਤੋਂ ਨਾ ਹੋਣ ਦੇ ਦੌਰ ਤੋਂ ਬਾਅਦ ਹੋ ਸਕਦਾ ਹੈ",
        "ਰਾਤ ਨੂੰ ਦਰਦ ਅਤੇ ਉੱਪਰ ਜਾਂ ਪਿੱਠ ਪਿੱਛੇ ਹੱਥ ਲਿਜਾਣ ਵਿੱਚ ਦਿੱਕਤ ਇਸ ਦੇ ਆਮ ਲੱਛਣ ਹਨ",
        "ਇਹ ਆਮ ਤੌਰ ’ਤੇ ਮਹੀਨਿਆਂ ਤੋਂ ਲੈ ਕੇ ਕੁਝ ਸਾਲਾਂ ਵਿੱਚ ਠੀਕ ਹੁੰਦਾ ਹੈ, ਅਤੇ ਨਿਰਦੇਸ਼ਿਤ ਕਸਰਤਾਂ ਮਦਦ ਕਰਦੀਆਂ ਹਨ",
      ],
    },
  },
  {
    id: 'tennis-elbow',
    kind: 'condition',
    phrases: ['tennis elbow', 'golfers elbow', 'golfer elbow', 'lateral epicondylitis', 'elbow tendon pain', 'tendon pain elbow'],
    en: {
      about: "Tennis elbow is pain on the outer side of the elbow from strain of the tendons of the forearm. It is not only for tennis players: any repeated gripping or twisting can bring it on.",
      points: [
        "Pain on the outside of the elbow, worse when gripping, lifting or turning the wrist",
        "Golfer's elbow is the same kind of problem on the inner side",
        "It is usually from repeated use of the forearm",
        "Rest from the strain, and exercises guided by a physiotherapist, help most people",
      ],
    },
    hi: {
      about: "टेनिस एल्बो कोहनी के बाहरी हिस्से में होने वाला दर्द है, जो भुजा के नीचे के टेंडन में खिंचाव से होता है। यह सिर्फ़ टेनिस खिलाड़ियों को नहीं होता: कोई भी बार-बार पकड़ने या घुमाने वाला काम इसे ला सकता है।",
      points: [
        "कोहनी के बाहर दर्द, जो पकड़ने, उठाने या कलाई घुमाने पर बढ़ता है",
        "गोल्फर्स एल्बो इसी तरह की समस्या है, लेकिन अंदर की तरफ़",
        "यह आमतौर पर भुजा के बार-बार इस्तेमाल से होता है",
        "खिंचाव से आराम, और फ़िज़ियोथेरेपिस्ट की बताई कसरतें ज़्यादातर लोगों की मदद करती हैं",
      ],
    },
    pa: {
      about: "ਟੈਨਿਸ ਐਲਬੋ ਕੂਹਣੀ ਦੇ ਬਾਹਰੀ ਹਿੱਸੇ ਵਿੱਚ ਹੋਣ ਵਾਲਾ ਦਰਦ ਹੈ, ਜੋ ਬਾਂਹ ਦੇ ਹੇਠਲੇ ਟੈਂਡਨ ਵਿੱਚ ਖਿਚਾਅ ਤੋਂ ਹੁੰਦਾ ਹੈ। ਇਹ ਸਿਰਫ਼ ਟੈਨਿਸ ਖਿਡਾਰੀਆਂ ਨੂੰ ਨਹੀਂ ਹੁੰਦਾ: ਕੋਈ ਵੀ ਵਾਰ-ਵਾਰ ਫੜਨ ਜਾਂ ਘੁਮਾਉਣ ਵਾਲਾ ਕੰਮ ਇਸ ਨੂੰ ਲਿਆ ਸਕਦਾ ਹੈ।",
      points: [
        "ਕੂਹਣੀ ਦੇ ਬਾਹਰ ਦਰਦ, ਜੋ ਫੜਨ, ਚੁੱਕਣ ਜਾਂ ਗੁੱਟ ਘੁਮਾਉਣ ’ਤੇ ਵਧਦਾ ਹੈ",
        "ਗੋਲਫ਼ਰਜ਼ ਐਲਬੋ ਇਸੇ ਤਰ੍ਹਾਂ ਦੀ ਸਮੱਸਿਆ ਹੈ, ਪਰ ਅੰਦਰ ਵਾਲੇ ਪਾਸੇ",
        "ਇਹ ਆਮ ਤੌਰ ’ਤੇ ਬਾਂਹ ਦੀ ਵਾਰ-ਵਾਰ ਵਰਤੋਂ ਤੋਂ ਹੁੰਦਾ ਹੈ",
        "ਖਿਚਾਅ ਤੋਂ ਆਰਾਮ, ਅਤੇ ਫਿਜ਼ੀਓਥੈਰੇਪਿਸਟ ਦੀਆਂ ਦੱਸੀਆਂ ਕਸਰਤਾਂ ਜ਼ਿਆਦਾਤਰ ਲੋਕਾਂ ਦੀ ਮਦਦ ਕਰਦੀਆਂ ਹਨ",
      ],
    },
  },
  {
    id: 'sprain',
    kind: 'condition',
    phrases: ['sprain', 'ankle sprain', 'sprained ankle', 'twisted ankle', 'muscle sprain', 'sprains', 'mochh', 'sprained wrist', 'twisted foot', 'मोच', 'ਮੋਚ'],
    en: {
      about: "A sprain is a stretch or tear of a ligament, the strong band that joins two bones at a joint. The ankle is the most common place.",
      points: [
        "Pain, swelling and bruising around the joint after a twist or fall",
        "A strain is a similar injury to a muscle or tendon rather than a ligament",
        "A severe sprain can be hard to tell from a broken bone, so an X-ray may be needed",
        "Most mild and moderate sprains heal over a few weeks",
      ],
    },
    hi: {
      about: "मोच किसी लिगामेंट का खिंचना या फटना है, जो जोड़ पर दो हड्डियों को जोड़ने वाली मज़बूत पट्टी है। टखना इसकी सबसे आम जगह है।",
      points: [
        "मुड़ने या गिरने के बाद जोड़ के आसपास दर्द, सूजन और नीला पड़ना",
        "स्ट्रेन भी ऐसी ही चोट है, लेकिन लिगामेंट की जगह मांसपेशी या टेंडन में",
        "गंभीर मोच को टूटी हड्डी से अलग करना मुश्किल हो सकता है, इसलिए एक्स-रे की ज़रूरत पड़ सकती है",
        "ज़्यादातर हल्की और मध्यम मोच कुछ हफ्तों में ठीक हो जाती हैं",
      ],
    },
    pa: {
      about: "ਮੋਚ ਕਿਸੇ ਲਿਗਾਮੈਂਟ ਦਾ ਖਿੱਚਣਾ ਜਾਂ ਫਟਣਾ ਹੈ, ਜੋ ਜੋੜ ’ਤੇ ਦੋ ਹੱਡੀਆਂ ਨੂੰ ਜੋੜਨ ਵਾਲੀ ਮਜ਼ਬੂਤ ਪੱਟੀ ਹੈ। ਗਿੱਟਾ ਇਸ ਦੀ ਸਭ ਤੋਂ ਆਮ ਥਾਂ ਹੈ।",
      points: [
        "ਮੁੜਨ ਜਾਂ ਡਿੱਗਣ ਤੋਂ ਬਾਅਦ ਜੋੜ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਦਰਦ, ਸੋਜ ਅਤੇ ਨੀਲਾ ਪੈਣਾ",
        "ਸਟ੍ਰੇਨ ਵੀ ਇਸੇ ਤਰ੍ਹਾਂ ਦੀ ਸੱਟ ਹੈ, ਪਰ ਲਿਗਾਮੈਂਟ ਦੀ ਥਾਂ ਮਾਸਪੇਸ਼ੀ ਜਾਂ ਟੈਂਡਨ ਵਿੱਚ",
        "ਗੰਭੀਰ ਮੋਚ ਨੂੰ ਟੁੱਟੀ ਹੱਡੀ ਤੋਂ ਵੱਖ ਕਰਨਾ ਔਖਾ ਹੋ ਸਕਦਾ ਹੈ, ਇਸ ਲਈ ਐਕਸ-ਰੇ ਦੀ ਲੋੜ ਪੈ ਸਕਦੀ ਹੈ",
        "ਜ਼ਿਆਦਾਤਰ ਹਲਕੀਆਂ ਅਤੇ ਦਰਮਿਆਨੀਆਂ ਮੋਚਾਂ ਕੁਝ ਹਫ਼ਤਿਆਂ ਵਿੱਚ ਠੀਕ ਹੋ ਜਾਂਦੀਆਂ ਹਨ",
      ],
    },
  },
  {
    id: 'fracture',
    kind: 'condition',
    phrases: ['fracture', 'broken bone', 'broken arm', 'broken leg', 'bone fracture', 'cast on leg', 'cast on arm', 'broken wrist', 'broken ankle', 'fractures', 'bone broken', 'haddi tootna', 'haath toot gaya', 'pair toot gaya', 'haddi toot gayi', 'फ्रैक्चर', 'हड्डी टूटना', 'ਫ੍ਰੈਕਚਰ', 'ਹੱਡੀ ਟੁੱਟਣਾ', 'plaster'],
    en: {
      about: "A fracture is a break or crack in a bone. It usually follows a fall, a blow or an accident, but bones that have become weak can break more easily.",
      points: [
        "Signs: pain, swelling, bruising, and not being able to use or put weight on the limb",
        "An X-ray shows the break and how the bone has moved",
        "Treatment depends on the bone and the break: a cast or splint, or sometimes surgery to hold the bone in place",
        "A bone sticking out through the skin, or a limb that looks bent out of shape, needs emergency care",
      ],
    },
    hi: {
      about: "फ्रैक्चर हड्डी का टूटना या उसमें दरार आना है। यह आमतौर पर गिरने, चोट लगने या दुर्घटना के बाद होता है, लेकिन कमज़ोर हो चुकी हड्डियां ज़्यादा आसानी से टूट सकती हैं।",
      points: [
        "संकेत: दर्द, सूजन, नीला पड़ना, और हाथ-पैर का इस्तेमाल न कर पाना या उस पर वज़न न डाल पाना",
        "एक्स-रे से टूटन और हड्डी के खिसकने का पता चलता है",
        "इलाज हड्डी और टूटन पर निर्भर करता है: प्लास्टर या स्प्लिंट, या कभी-कभी हड्डी को जगह पर रखने के लिए ऑपरेशन",
        "त्वचा से हड्डी बाहर निकलना, या टेढ़ा दिखता हाथ-पैर, आपातकालीन इलाज मांगता है",
      ],
    },
    pa: {
      about: "ਫ੍ਰੈਕਚਰ ਹੱਡੀ ਦਾ ਟੁੱਟਣਾ ਜਾਂ ਉਸ ਵਿੱਚ ਤਰੇੜ ਆਉਣਾ ਹੈ। ਇਹ ਆਮ ਤੌਰ ’ਤੇ ਡਿੱਗਣ, ਸੱਟ ਲੱਗਣ ਜਾਂ ਹਾਦਸੇ ਤੋਂ ਬਾਅਦ ਹੁੰਦਾ ਹੈ, ਪਰ ਕਮਜ਼ੋਰ ਹੋ ਚੁੱਕੀਆਂ ਹੱਡੀਆਂ ਵੱਧ ਆਸਾਨੀ ਨਾਲ ਟੁੱਟ ਸਕਦੀਆਂ ਹਨ।",
      points: [
        "ਸੰਕੇਤ: ਦਰਦ, ਸੋਜ, ਨੀਲਾ ਪੈਣਾ, ਅਤੇ ਹੱਥ-ਪੈਰ ਦੀ ਵਰਤੋਂ ਨਾ ਕਰ ਸਕਣਾ ਜਾਂ ਉਸ ’ਤੇ ਭਾਰ ਨਾ ਪਾ ਸਕਣਾ",
        "ਐਕਸ-ਰੇ ਨਾਲ ਟੁੱਟਣ ਅਤੇ ਹੱਡੀ ਦੇ ਖਿਸਕਣ ਦਾ ਪਤਾ ਲੱਗਦਾ ਹੈ",
        "ਇਲਾਜ ਹੱਡੀ ਅਤੇ ਟੁੱਟਣ ’ਤੇ ਨਿਰਭਰ ਕਰਦਾ ਹੈ: ਪਲੱਸਤਰ ਜਾਂ ਸਪਲਿੰਟ, ਜਾਂ ਕਈ ਵਾਰ ਹੱਡੀ ਨੂੰ ਥਾਂ ’ਤੇ ਰੱਖਣ ਲਈ ਆਪ੍ਰੇਸ਼ਨ",
        "ਚਮੜੀ ਵਿੱਚੋਂ ਹੱਡੀ ਦਾ ਬਾਹਰ ਨਿਕਲਣਾ, ਜਾਂ ਟੇਢਾ ਦਿਖਦਾ ਹੱਥ-ਪੈਰ, ਐਮਰਜੈਂਸੀ ਇਲਾਜ ਮੰਗਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'bone-pain',
    kind: 'symptom',
    phrases: ['bone pain', 'pain in bones', 'bones pain', 'bone ache', 'aching bones', 'haddi me dard', 'haddiyon me dard'],
    en: {
      about: "Bone pain is a deep, aching pain felt in the bones, rather than in the muscles or joints.",
      points: [
        "An injury or a crack in the bone, including a small stress fracture",
        "Weak, thin bones (osteoporosis) or low vitamin D and calcium",
        "Infection of the bone",
        "Growing pains in children, usually in the legs at night",
        "Less often, conditions that affect the bone itself, which a doctor can rule out",
      ],
    },
    hi: {
      about: "हड्डी का दर्द हड्डियों में महसूस होने वाला गहरा, दुखता दर्द है, मांसपेशियों या जोड़ों के बजाय।",
      points: [
        "हड्डी में चोट या दरार, जिसमें छोटा स्ट्रेस फ्रैक्चर भी शामिल है",
        "कमज़ोर, पतली हड्डियां (ऑस्टियोपोरोसिस) या विटामिन D और कैल्शियम की कमी",
        "हड्डी का संक्रमण",
        "बच्चों में बढ़ने का दर्द, आमतौर पर रात में पैरों में",
        "कम मामलों में, ऐसी बीमारियां जो हड्डी को ही प्रभावित करती हैं, जिन्हें डॉक्टर अलग कर सकते हैं",
      ],
    },
    pa: {
      about: "ਹੱਡੀ ਦਾ ਦਰਦ ਹੱਡੀਆਂ ਵਿੱਚ ਮਹਿਸੂਸ ਹੋਣ ਵਾਲਾ ਡੂੰਘਾ, ਦੁਖਦਾ ਦਰਦ ਹੈ, ਮਾਸਪੇਸ਼ੀਆਂ ਜਾਂ ਜੋੜਾਂ ਦੀ ਥਾਂ।",
      points: [
        "ਹੱਡੀ ਵਿੱਚ ਸੱਟ ਜਾਂ ਤਰੇੜ, ਜਿਸ ਵਿੱਚ ਛੋਟਾ ਸਟ੍ਰੈੱਸ ਫ੍ਰੈਕਚਰ ਵੀ ਸ਼ਾਮਲ ਹੈ",
        "ਕਮਜ਼ੋਰ, ਪਤਲੀਆਂ ਹੱਡੀਆਂ (ਓਸਟੀਓਪੋਰੋਸਿਸ) ਜਾਂ ਵਿਟਾਮਿਨ D ਅਤੇ ਕੈਲਸ਼ੀਅਮ ਦੀ ਕਮੀ",
        "ਹੱਡੀ ਦੀ ਲਾਗ",
        "ਬੱਚਿਆਂ ਵਿੱਚ ਵਧਣ ਦਾ ਦਰਦ, ਆਮ ਤੌਰ ’ਤੇ ਰਾਤ ਨੂੰ ਲੱਤਾਂ ਵਿੱਚ",
        "ਘੱਟ ਮਾਮਲਿਆਂ ਵਿੱਚ, ਅਜਿਹੀਆਂ ਬਿਮਾਰੀਆਂ ਜੋ ਹੱਡੀ ਨੂੰ ਹੀ ਪ੍ਰਭਾਵਿਤ ਕਰਦੀਆਂ ਹਨ, ਜਿਨ੍ਹਾਂ ਨੂੰ ਡਾਕਟਰ ਵੱਖ ਕਰ ਸਕਦੇ ਹਨ",
      ],
    },
  },
  {
    id: 'osteoporosis',
    kind: 'condition',
    phrases: ['osteoporosis', 'weak bones', 'brittle bones', 'thin bones', 'bone weakness', 'low bone density', 'bone loss', 'osteoporsis'],
    en: {
      about: "Osteoporosis is a condition in which the bones become thin and weak, so they break more easily, even from a minor fall.",
      points: [
        "It is more common in older people, especially women after menopause",
        "It usually causes no symptoms until a bone breaks, often the wrist, hip or spine",
        "Low calcium and vitamin D, little activity, smoking and some long-term conditions add to the risk",
        "A bone density scan (DEXA) measures how strong the bones are",
        "Steps to protect the bones, and to prevent falls, matter at any age",
      ],
    },
    hi: {
      about: "ऑस्टियोपोरोसिस वह स्थिति है जिसमें हड्डियां पतली और कमज़ोर हो जाती हैं, इसलिए वे मामूली गिरने से भी ज़्यादा आसानी से टूट सकती हैं।",
      points: [
        "यह बुज़ुर्गों में ज़्यादा आम है, खासकर रजोनिवृत्ति के बाद महिलाओं में",
        "इसमें आमतौर पर हड्डी टूटने तक कोई लक्षण नहीं होता, अक्सर कलाई, कूल्हा या रीढ़",
        "कैल्शियम और विटामिन D की कमी, कम गतिविधि, धूम्रपान और कुछ लंबी बीमारियां खतरा बढ़ाती हैं",
        "बोन डेंसिटी स्कैन (डेक्सा) से पता चलता है कि हड्डियां कितनी मज़बूत हैं",
        "हड्डियों की रक्षा के और गिरने से बचाव के कदम किसी भी उम्र में मायने रखते हैं",
      ],
    },
    pa: {
      about: "ਓਸਟੀਓਪੋਰੋਸਿਸ ਉਹ ਸਥਿਤੀ ਹੈ ਜਿਸ ਵਿੱਚ ਹੱਡੀਆਂ ਪਤਲੀਆਂ ਅਤੇ ਕਮਜ਼ੋਰ ਹੋ ਜਾਂਦੀਆਂ ਹਨ, ਇਸ ਲਈ ਉਹ ਮਾਮੂਲੀ ਡਿੱਗਣ ਨਾਲ ਵੀ ਵੱਧ ਆਸਾਨੀ ਨਾਲ ਟੁੱਟ ਸਕਦੀਆਂ ਹਨ।",
      points: [
        "ਇਹ ਬਜ਼ੁਰਗਾਂ ਵਿੱਚ ਵੱਧ ਆਮ ਹੈ, ਖ਼ਾਸ ਕਰਕੇ ਮਾਹਵਾਰੀ ਬੰਦ ਹੋਣ ਤੋਂ ਬਾਅਦ ਔਰਤਾਂ ਵਿੱਚ",
        "ਇਸ ਵਿੱਚ ਆਮ ਤੌਰ ’ਤੇ ਹੱਡੀ ਟੁੱਟਣ ਤੱਕ ਕੋਈ ਲੱਛਣ ਨਹੀਂ ਹੁੰਦਾ, ਅਕਸਰ ਗੁੱਟ, ਕੁੱਲ੍ਹਾ ਜਾਂ ਰੀੜ੍ਹ",
        "ਕੈਲਸ਼ੀਅਮ ਅਤੇ ਵਿਟਾਮਿਨ D ਦੀ ਕਮੀ, ਘੱਟ ਗਤੀਵਿਧੀ, ਸਿਗਰਟਨੋਸ਼ੀ ਅਤੇ ਕੁਝ ਲੰਮੀਆਂ ਬਿਮਾਰੀਆਂ ਖ਼ਤਰਾ ਵਧਾਉਂਦੀਆਂ ਹਨ",
        "ਬੋਨ ਡੈਂਸਿਟੀ ਸਕੈਨ (ਡੈਕਸਾ) ਨਾਲ ਪਤਾ ਲੱਗਦਾ ਹੈ ਕਿ ਹੱਡੀਆਂ ਕਿੰਨੀਆਂ ਮਜ਼ਬੂਤ ਹਨ",
        "ਹੱਡੀਆਂ ਦੀ ਰੱਖਿਆ ਦੇ ਅਤੇ ਡਿੱਗਣ ਤੋਂ ਬਚਾਅ ਦੇ ਕਦਮ ਕਿਸੇ ਵੀ ਉਮਰ ਵਿੱਚ ਮਾਇਨੇ ਰੱਖਦੇ ਹਨ",
      ],
    },
  },
  {
    id: 'sports-injury',
    kind: 'condition',
    phrases: ['sports injury', 'sports injuries', 'injury while playing', 'ligament injury', 'acl injury', 'acl tear', 'meniscus tear', 'torn ligament', 'knee ligament injury', 'sports medicine', 'chot lag gayi', 'chot'],
    en: {
      about: "Sports injuries are injuries to muscles, tendons, ligaments, joints or bones from playing sport or exercising. They can be sudden, like a twisted knee, or build up from overuse.",
      points: [
        "Sudden injuries include sprains, strains, torn ligaments (such as the ACL in the knee) and fractures",
        "Overuse injuries include tendon inflammation and stress fractures",
        "A doctor examines the joint and may order an X-ray or MRI scan",
        "Treatment ranges from rest and guided exercise to surgery, depending on the injury",
      ],
    },
    hi: {
      about: "खेल की चोटें खेलने या कसरत करने से मांसपेशियों, टेंडन, लिगामेंट, जोड़ों या हड्डियों में लगने वाली चोटें हैं। ये अचानक हो सकती हैं, जैसे घुटना मुड़ना, या ज़्यादा इस्तेमाल से धीरे-धीरे बन सकती हैं।",
      points: [
        "अचानक लगने वाली चोटों में मोच, खिंचाव, फटे लिगामेंट (जैसे घुटने का एसीएल) और फ्रैक्चर शामिल हैं",
        "ज़्यादा इस्तेमाल की चोटों में टेंडन की सूजन और स्ट्रेस फ्रैक्चर शामिल हैं",
        "डॉक्टर जोड़ की जांच करते हैं और एक्स-रे या एमआरआई स्कैन करवा सकते हैं",
        "चोट के अनुसार इलाज आराम और निर्देशित कसरत से लेकर ऑपरेशन तक होता है",
      ],
    },
    pa: {
      about: "ਖੇਡਾਂ ਦੀਆਂ ਸੱਟਾਂ ਖੇਡਣ ਜਾਂ ਕਸਰਤ ਕਰਨ ਨਾਲ ਮਾਸਪੇਸ਼ੀਆਂ, ਟੈਂਡਨ, ਲਿਗਾਮੈਂਟ, ਜੋੜਾਂ ਜਾਂ ਹੱਡੀਆਂ ਵਿੱਚ ਲੱਗਣ ਵਾਲੀਆਂ ਸੱਟਾਂ ਹਨ। ਇਹ ਅਚਾਨਕ ਹੋ ਸਕਦੀਆਂ ਹਨ, ਜਿਵੇਂ ਗੋਡਾ ਮੁੜਨਾ, ਜਾਂ ਜ਼ਿਆਦਾ ਵਰਤੋਂ ਨਾਲ ਹੌਲੀ-ਹੌਲੀ ਬਣ ਸਕਦੀਆਂ ਹਨ।",
      points: [
        "ਅਚਾਨਕ ਲੱਗਣ ਵਾਲੀਆਂ ਸੱਟਾਂ ਵਿੱਚ ਮੋਚ, ਖਿਚਾਅ, ਫਟੇ ਲਿਗਾਮੈਂਟ (ਜਿਵੇਂ ਗੋਡੇ ਦਾ ਏਸੀਐਲ) ਅਤੇ ਫ੍ਰੈਕਚਰ ਸ਼ਾਮਲ ਹਨ",
        "ਜ਼ਿਆਦਾ ਵਰਤੋਂ ਦੀਆਂ ਸੱਟਾਂ ਵਿੱਚ ਟੈਂਡਨ ਦੀ ਸੋਜ ਅਤੇ ਸਟ੍ਰੈੱਸ ਫ੍ਰੈਕਚਰ ਸ਼ਾਮਲ ਹਨ",
        "ਡਾਕਟਰ ਜੋੜ ਦੀ ਜਾਂਚ ਕਰਦੇ ਹਨ ਅਤੇ ਐਕਸ-ਰੇ ਜਾਂ ਐਮਆਰਆਈ ਸਕੈਨ ਕਰਵਾ ਸਕਦੇ ਹਨ",
        "ਸੱਟ ਅਨੁਸਾਰ ਇਲਾਜ ਆਰਾਮ ਅਤੇ ਨਿਰਦੇਸ਼ਿਤ ਕਸਰਤ ਤੋਂ ਲੈ ਕੇ ਆਪ੍ਰੇਸ਼ਨ ਤੱਕ ਹੁੰਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'tooth-decay',
    kind: 'condition',
    phrases: ['tooth decay', 'cavity', 'cavities', 'teeth decay', 'dental caries', 'tooth cavity', 'dant me keede', 'worms in teeth', 'rotten tooth', 'decayed tooth', 'dant sadna', 'दांत में कीड़े', 'ਦੰਦ ਵਿੱਚ ਕੀੜੇ', 'caries'],
    en: {
      about: "Tooth decay is damage to a tooth caused by acids made by bacteria in plaque, which slowly dissolve the hard outer layer of the tooth and can leave a hole, called a cavity.",
      points: [
        "Early decay causes no pain, which is why regular dental check-ups matter",
        "Sugary food and drink, and not cleaning the teeth well, make it more likely",
        "Later it can cause sensitivity, toothache and infection at the root",
        "A dentist can see it and, if needed, X-rays show how deep it goes",
      ],
    },
    hi: {
      about: "दांत का सड़ना प्लाक में मौजूद बैक्टीरिया के बनाए अम्लों से दांत को होने वाला नुकसान है, जो दांत की बाहरी सख्त परत को धीरे-धीरे घोल देते हैं और एक छेद छोड़ सकते हैं, जिसे कैविटी कहते हैं।",
      points: [
        "शुरुआती सड़न में दर्द नहीं होता, इसीलिए दांतों की नियमित जांच ज़रूरी है",
        "मीठा खाना-पीना, और दांतों की ठीक से सफ़ाई न करना इसकी संभावना बढ़ाते हैं",
        "आगे चलकर यह संवेदनशीलता, दांत दर्द और जड़ में संक्रमण कर सकती है",
        "दंत चिकित्सक इसे देख सकते हैं और ज़रूरत पड़ने पर एक्स-रे से पता चलता है कि यह कितनी गहरी है",
      ],
    },
    pa: {
      about: "ਦੰਦ ਦਾ ਸੜਨਾ ਪਲੇਕ ਵਿੱਚ ਮੌਜੂਦ ਬੈਕਟੀਰੀਆ ਦੇ ਬਣਾਏ ਤੇਜ਼ਾਬਾਂ ਨਾਲ ਦੰਦ ਨੂੰ ਹੋਣ ਵਾਲਾ ਨੁਕਸਾਨ ਹੈ, ਜੋ ਦੰਦ ਦੀ ਬਾਹਰੀ ਸਖ਼ਤ ਪਰਤ ਨੂੰ ਹੌਲੀ-ਹੌਲੀ ਘੋਲ ਦਿੰਦੇ ਹਨ ਅਤੇ ਇੱਕ ਛੇਕ ਛੱਡ ਸਕਦੇ ਹਨ, ਜਿਸ ਨੂੰ ਕੈਵਿਟੀ ਕਹਿੰਦੇ ਹਨ।",
      points: [
        "ਸ਼ੁਰੂਆਤੀ ਸੜਨ ਵਿੱਚ ਦਰਦ ਨਹੀਂ ਹੁੰਦਾ, ਇਸੇ ਲਈ ਦੰਦਾਂ ਦੀ ਨਿਯਮਿਤ ਜਾਂਚ ਜ਼ਰੂਰੀ ਹੈ",
        "ਮਿੱਠਾ ਖਾਣਾ-ਪੀਣਾ, ਅਤੇ ਦੰਦਾਂ ਦੀ ਠੀਕ ਤਰ੍ਹਾਂ ਸਫ਼ਾਈ ਨਾ ਕਰਨਾ ਇਸ ਦੀ ਸੰਭਾਵਨਾ ਵਧਾਉਂਦੇ ਹਨ",
        "ਅੱਗੇ ਚੱਲ ਕੇ ਇਹ ਸੰਵੇਦਨਸ਼ੀਲਤਾ, ਦੰਦ ਦਰਦ ਅਤੇ ਜੜ੍ਹ ਵਿੱਚ ਲਾਗ ਕਰ ਸਕਦੀ ਹੈ",
        "ਦੰਦਾਂ ਦਾ ਡਾਕਟਰ ਇਸ ਨੂੰ ਦੇਖ ਸਕਦਾ ਹੈ ਅਤੇ ਲੋੜ ਪੈਣ ’ਤੇ ਐਕਸ-ਰੇ ਨਾਲ ਪਤਾ ਲੱਗਦਾ ਹੈ ਕਿ ਇਹ ਕਿੰਨੀ ਡੂੰਘੀ ਹੈ",
      ],
    },
  },
  {
    id: 'gum-disease',
    kind: 'condition',
    phrases: ['swollen gums', 'gum disease', 'gingivitis', 'periodontitis', 'gum swelling', 'gum infection', 'gums swelling', 'red gums', 'gum problem', 'pyorrhoea', 'masoode sujan', 'gingivits'],
    en: {
      about: "Gum disease starts as inflammation of the gums (gingivitis), usually from plaque left on the teeth, and can spread deeper to the bone that holds the teeth (periodontitis).",
      points: [
        "Signs: red, swollen or bleeding gums, bad breath, and gums pulling back from the teeth",
        "Gingivitis can usually be reversed with good cleaning and a dental clean-up",
        "If it goes deeper, teeth can become loose",
        "Smoking, tobacco and diabetes make it worse",
      ],
    },
    hi: {
      about: "मसूड़ों की बीमारी मसूड़ों की सूजन (जिंजिवाइटिस) से शुरू होती है, जो आमतौर पर दांतों पर छूटे प्लाक से होती है, और दांतों को थामने वाली हड्डी तक गहराई में फैल सकती है (पीरियोडोंटाइटिस)।",
      points: [
        "संकेत: लाल, सूजे या खून वाले मसूड़े, मुंह की बदबू, और मसूड़ों का दांतों से पीछे हटना",
        "जिंजिवाइटिस आमतौर पर अच्छी सफ़ाई और दांतों की सफ़ाई करवाने से पलट सकती है",
        "अगर यह और गहराई में चली जाए, तो दांत ढीले हो सकते हैं",
        "धूम्रपान, तंबाकू और डायबिटीज़ इसे और बिगाड़ते हैं",
      ],
    },
    pa: {
      about: "ਮਸੂੜਿਆਂ ਦੀ ਬਿਮਾਰੀ ਮਸੂੜਿਆਂ ਦੀ ਸੋਜ (ਜਿੰਜੀਵਾਈਟਿਸ) ਤੋਂ ਸ਼ੁਰੂ ਹੁੰਦੀ ਹੈ, ਜੋ ਆਮ ਤੌਰ ’ਤੇ ਦੰਦਾਂ ’ਤੇ ਛੁੱਟੇ ਪਲੇਕ ਤੋਂ ਹੁੰਦੀ ਹੈ, ਅਤੇ ਦੰਦਾਂ ਨੂੰ ਫੜਨ ਵਾਲੀ ਹੱਡੀ ਤੱਕ ਡੂੰਘਾਈ ਵਿੱਚ ਫੈਲ ਸਕਦੀ ਹੈ (ਪੀਰੀਓਡੌਂਟਾਈਟਿਸ)।",
      points: [
        "ਸੰਕੇਤ: ਲਾਲ, ਸੁੱਜੇ ਜਾਂ ਖੂਨ ਵਾਲੇ ਮਸੂੜੇ, ਮੂੰਹ ਦੀ ਬਦਬੂ, ਅਤੇ ਮਸੂੜਿਆਂ ਦਾ ਦੰਦਾਂ ਤੋਂ ਪਿੱਛੇ ਹਟਣਾ",
        "ਜਿੰਜੀਵਾਈਟਿਸ ਆਮ ਤੌਰ ’ਤੇ ਚੰਗੀ ਸਫ਼ਾਈ ਅਤੇ ਦੰਦਾਂ ਦੀ ਸਫ਼ਾਈ ਕਰਵਾਉਣ ਨਾਲ ਪਲਟ ਸਕਦੀ ਹੈ",
        "ਜੇ ਇਹ ਹੋਰ ਡੂੰਘਾਈ ਵਿੱਚ ਚਲੀ ਜਾਵੇ, ਤਾਂ ਦੰਦ ਢਿੱਲੇ ਹੋ ਸਕਦੇ ਹਨ",
        "ਸਿਗਰਟਨੋਸ਼ੀ, ਤੰਬਾਕੂ ਅਤੇ ਸ਼ੂਗਰ ਇਸ ਨੂੰ ਹੋਰ ਵਿਗਾੜਦੇ ਹਨ",
      ],
    },
  },
  {
    id: 'wisdom-tooth',
    kind: 'condition',
    phrases: ['wisdom tooth', 'wisdom teeth', 'wisdom tooth pain', 'impacted wisdom tooth', 'wisdom tooth removal', 'akal daadh', 'akal dadh', 'अक्ल दाढ़', 'ਅਕਲ ਦਾੜ੍ਹ'],
    en: {
      about: "Wisdom teeth are the last four teeth to come through, usually between the ages of 17 and 25. When there is not enough room, they can come through crooked or stay stuck under the gum.",
      points: [
        "A wisdom tooth that is stuck (impacted) can cause pain, swelling and infection of the gum around it",
        "It can push on the tooth in front, or trap food and cause decay",
        "Not every wisdom tooth needs to come out: a dentist decides, often with an X-ray",
        "Removal is a common minor surgery under local anaesthesia",
      ],
    },
    hi: {
      about: "अक्ल दाढ़ सबसे आख़िर में निकलने वाले चार दांत हैं, आमतौर पर 17 से 25 साल की उम्र के बीच। जब जगह कम हो, तो वे टेढ़े निकल सकते हैं या मसूड़े के नीचे फंसे रह सकते हैं।",
      points: [
        "फंसी हुई (इम्पैक्टेड) अक्ल दाढ़ दर्द, सूजन और उसके आसपास के मसूड़े में संक्रमण कर सकती है",
        "यह आगे वाले दांत को धकेल सकती है, या खाना फंसाकर सड़न कर सकती है",
        "हर अक्ल दाढ़ निकलवानी ज़रूरी नहीं: दंत चिकित्सक तय करते हैं, अक्सर एक्स-रे के साथ",
        "इसे निकालना एक आम छोटा ऑपरेशन है जो लोकल एनेस्थीसिया में होता है",
      ],
    },
    pa: {
      about: "ਅਕਲ ਦਾੜ੍ਹ ਸਭ ਤੋਂ ਅਖ਼ੀਰ ਵਿੱਚ ਨਿਕਲਣ ਵਾਲੇ ਚਾਰ ਦੰਦ ਹਨ, ਆਮ ਤੌਰ ’ਤੇ 17 ਤੋਂ 25 ਸਾਲ ਦੀ ਉਮਰ ਦੇ ਵਿਚਕਾਰ। ਜਦੋਂ ਥਾਂ ਘੱਟ ਹੋਵੇ, ਤਾਂ ਉਹ ਟੇਢੇ ਨਿਕਲ ਸਕਦੇ ਹਨ ਜਾਂ ਮਸੂੜੇ ਹੇਠਾਂ ਫਸੇ ਰਹਿ ਸਕਦੇ ਹਨ।",
      points: [
        "ਫਸੀ ਹੋਈ (ਇਮਪੈਕਟਿਡ) ਅਕਲ ਦਾੜ੍ਹ ਦਰਦ, ਸੋਜ ਅਤੇ ਉਸ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਦੇ ਮਸੂੜੇ ਵਿੱਚ ਲਾਗ ਕਰ ਸਕਦੀ ਹੈ",
        "ਇਹ ਅੱਗੇ ਵਾਲੇ ਦੰਦ ਨੂੰ ਧੱਕ ਸਕਦੀ ਹੈ, ਜਾਂ ਖਾਣਾ ਫਸਾ ਕੇ ਸੜਨ ਕਰ ਸਕਦੀ ਹੈ",
        "ਹਰ ਅਕਲ ਦਾੜ੍ਹ ਕਢਵਾਉਣੀ ਜ਼ਰੂਰੀ ਨਹੀਂ: ਦੰਦਾਂ ਦਾ ਡਾਕਟਰ ਤੈਅ ਕਰਦਾ ਹੈ, ਅਕਸਰ ਐਕਸ-ਰੇ ਨਾਲ",
        "ਇਸ ਨੂੰ ਕੱਢਣਾ ਇੱਕ ਆਮ ਛੋਟਾ ਆਪ੍ਰੇਸ਼ਨ ਹੈ ਜੋ ਲੋਕਲ ਐਨੇਸਥੀਸੀਆ ਵਿੱਚ ਹੁੰਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'cataract',
    kind: 'condition',
    phrases: ['cataract', 'cataracts', 'cloudy lens', 'cataract problem', 'motiyabind', 'motia', 'cataract eye', 'catarct', 'मोतियाबिंद', 'ਮੋਤੀਆਬਿੰਦ'],
    en: {
      about: "A cataract is a clouding of the lens inside the eye, which makes vision blurred or dim. It usually develops slowly with age and can affect one or both eyes.",
      points: [
        "Signs: cloudy or misty vision, glare from lights, colours looking faded, and frequent changes of glasses",
        "The usual cause is ageing; diabetes, injury, some long-term treatments and smoking can bring it on earlier",
        "An eye examination confirms it",
        "When it affects daily life, the cloudy lens is replaced with a clear artificial one in a short operation",
      ],
    },
    hi: {
      about: "मोतियाबिंद आंख के अंदर के लेंस का धुंधला हो जाना है, जिससे दिखना धुंधला या कम हो जाता है। यह आमतौर पर उम्र के साथ धीरे-धीरे बनता है और एक या दोनों आंखों को प्रभावित कर सकता है।",
      points: [
        "संकेत: धुंधला या धुंध जैसा दिखना, रोशनी की चौंध, रंगों का फीका दिखना, और चश्मे का बार-बार बदलना",
        "आम कारण उम्र बढ़ना है; डायबिटीज़, चोट, कुछ लंबे इलाज और धूम्रपान इसे जल्दी ला सकते हैं",
        "आंख की जांच से इसकी पुष्टि होती है",
        "जब यह रोज़मर्रा की ज़िंदगी पर असर डालने लगे, तो एक छोटे ऑपरेशन में धुंधले लेंस की जगह साफ़ कृत्रिम लेंस लगाया जाता है",
      ],
    },
    pa: {
      about: "ਮੋਤੀਆਬਿੰਦ ਅੱਖ ਦੇ ਅੰਦਰ ਦੇ ਲੈਂਜ਼ ਦਾ ਧੁੰਦਲਾ ਹੋ ਜਾਣਾ ਹੈ, ਜਿਸ ਨਾਲ ਦਿਖਣਾ ਧੁੰਦਲਾ ਜਾਂ ਘੱਟ ਹੋ ਜਾਂਦਾ ਹੈ। ਇਹ ਆਮ ਤੌਰ ’ਤੇ ਉਮਰ ਨਾਲ ਹੌਲੀ-ਹੌਲੀ ਬਣਦਾ ਹੈ ਅਤੇ ਇੱਕ ਜਾਂ ਦੋਵਾਂ ਅੱਖਾਂ ਨੂੰ ਪ੍ਰਭਾਵਿਤ ਕਰ ਸਕਦਾ ਹੈ।",
      points: [
        "ਸੰਕੇਤ: ਧੁੰਦਲਾ ਜਾਂ ਧੁੰਦ ਵਰਗਾ ਦਿਖਣਾ, ਰੌਸ਼ਨੀ ਦੀ ਚਮਕ, ਰੰਗਾਂ ਦਾ ਫਿੱਕਾ ਦਿਖਣਾ, ਅਤੇ ਐਨਕ ਦਾ ਵਾਰ-ਵਾਰ ਬਦਲਣਾ",
        "ਆਮ ਕਾਰਨ ਉਮਰ ਵਧਣਾ ਹੈ; ਸ਼ੂਗਰ, ਸੱਟ, ਕੁਝ ਲੰਮੇ ਇਲਾਜ ਅਤੇ ਸਿਗਰਟਨੋਸ਼ੀ ਇਸ ਨੂੰ ਜਲਦੀ ਲਿਆ ਸਕਦੇ ਹਨ",
        "ਅੱਖ ਦੀ ਜਾਂਚ ਨਾਲ ਇਸ ਦੀ ਪੁਸ਼ਟੀ ਹੁੰਦੀ ਹੈ",
        "ਜਦੋਂ ਇਹ ਰੋਜ਼ਾਨਾ ਜ਼ਿੰਦਗੀ ’ਤੇ ਅਸਰ ਪਾਉਣ ਲੱਗੇ, ਤਾਂ ਇੱਕ ਛੋਟੇ ਆਪ੍ਰੇਸ਼ਨ ਵਿੱਚ ਧੁੰਦਲੇ ਲੈਂਜ਼ ਦੀ ਥਾਂ ਸਾਫ਼ ਨਕਲੀ ਲੈਂਜ਼ ਲਗਾਇਆ ਜਾਂਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'conjunctivitis',
    kind: 'condition',
    phrases: ['conjunctivitis', 'pink eye', 'eye infection', 'eye flu', 'aankh aana', 'red eye infection', 'eye allergy', 'conjuctivitis', 'आंख आना', 'आँख आना', 'ਅੱਖ ਆਉਣਾ'],
    en: {
      about: "Conjunctivitis, or pink eye, is inflammation of the thin clear layer over the white of the eye. It makes the eye red, watery or sticky.",
      points: [
        "Viral and bacterial types spread easily by touch, so washing hands and not sharing towels matters",
        "Allergic conjunctivitis causes itching and watering in both eyes, often with sneezing",
        "Most mild cases settle in a week or two",
        "Pain, trouble seeing, light hurting the eyes or a baby with a sticky eye need an eye doctor",
      ],
    },
    hi: {
      about: "कंजंक्टिवाइटिस, यानी आंख आना, आंख के सफ़ेद हिस्से के ऊपर की पतली साफ़ परत की सूजन है। इससे आंख लाल, पानी वाली या चिपचिपी हो जाती है।",
      points: [
        "वायरल और बैक्टीरियल प्रकार छूने से आसानी से फैलते हैं, इसलिए हाथ धोना और तौलिया साझा न करना ज़रूरी है",
        "एलर्जिक कंजंक्टिवाइटिस में दोनों आंखों में खुजली और पानी आता है, अक्सर छींकों के साथ",
        "ज़्यादातर हल्के मामले एक-दो हफ्ते में ठीक हो जाते हैं",
        "दर्द, देखने में दिक्कत, रोशनी से आंखों में चुभन, या चिपचिपी आंख वाले शिशु के लिए आंखों के डॉक्टर को दिखाना चाहिए",
      ],
    },
    pa: {
      about: "ਕੰਜਕਟਿਵਾਈਟਿਸ, ਯਾਨੀ ਅੱਖ ਆਉਣਾ, ਅੱਖ ਦੇ ਚਿੱਟੇ ਹਿੱਸੇ ਉੱਪਰਲੀ ਪਤਲੀ ਸਾਫ਼ ਪਰਤ ਦੀ ਸੋਜ ਹੈ। ਇਸ ਨਾਲ ਅੱਖ ਲਾਲ, ਪਾਣੀ ਵਾਲੀ ਜਾਂ ਚਿਪਚਿਪੀ ਹੋ ਜਾਂਦੀ ਹੈ।",
      points: [
        "ਵਾਇਰਲ ਅਤੇ ਬੈਕਟੀਰੀਆ ਵਾਲੀਆਂ ਕਿਸਮਾਂ ਛੂਹਣ ਨਾਲ ਆਸਾਨੀ ਨਾਲ ਫੈਲਦੀਆਂ ਹਨ, ਇਸ ਲਈ ਹੱਥ ਧੋਣਾ ਅਤੇ ਤੌਲੀਆ ਸਾਂਝਾ ਨਾ ਕਰਨਾ ਜ਼ਰੂਰੀ ਹੈ",
        "ਐਲਰਜਿਕ ਕੰਜਕਟਿਵਾਈਟਿਸ ਵਿੱਚ ਦੋਵਾਂ ਅੱਖਾਂ ਵਿੱਚ ਖੁਜਲੀ ਅਤੇ ਪਾਣੀ ਆਉਂਦਾ ਹੈ, ਅਕਸਰ ਛਿੱਕਾਂ ਨਾਲ",
        "ਜ਼ਿਆਦਾਤਰ ਹਲਕੇ ਮਾਮਲੇ ਇੱਕ-ਦੋ ਹਫ਼ਤਿਆਂ ਵਿੱਚ ਠੀਕ ਹੋ ਜਾਂਦੇ ਹਨ",
        "ਦਰਦ, ਦੇਖਣ ਵਿੱਚ ਦਿੱਕਤ, ਰੌਸ਼ਨੀ ਨਾਲ ਅੱਖਾਂ ਵਿੱਚ ਚੁਭਣ, ਜਾਂ ਚਿਪਚਿਪੀ ਅੱਖ ਵਾਲੇ ਨਿਆਣੇ ਲਈ ਅੱਖਾਂ ਦੇ ਡਾਕਟਰ ਨੂੰ ਦਿਖਾਉਣਾ ਚਾਹੀਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'dry-eyes',
    kind: 'condition',
    phrases: ['dry eyes', 'dry eye', 'dry eye disease', 'eyes feel dry', 'burning eyes', 'eye burning', 'aankh me jalan', 'आंख में जलन', 'ਅੱਖ ਵਿੱਚ ਜਲਨ', 'irritated eyes'],
    en: {
      about: "Dry eyes happen when the eyes do not make enough tears, or the tears dry up too fast. The eyes feel gritty, burning or tired, and may also water.",
      points: [
        "Long screen time, because we blink less",
        "Dry or air-conditioned air, wind, smoke and dust",
        "Wearing contact lenses for long, and ageing",
        "Some long-term conditions and some treatments",
      ],
    },
    hi: {
      about: "सूखी आंखें तब होती हैं जब आंखें पर्याप्त आंसू नहीं बनातीं, या आंसू बहुत जल्दी सूख जाते हैं। आंखें किरकिरी, जलती या थकी लगती हैं, और उनसे पानी भी आ सकता है।",
      points: [
        "स्क्रीन पर लंबा समय, क्योंकि हम पलकें कम झपकाते हैं",
        "सूखी या एसी की हवा, हवा के झोंके, धुआं और धूल",
        "कॉन्टैक्ट लेंस ज़्यादा देर पहनना, और उम्र बढ़ना",
        "कुछ लंबी बीमारियां और कुछ इलाज",
      ],
    },
    pa: {
      about: "ਸੁੱਕੀਆਂ ਅੱਖਾਂ ਉਦੋਂ ਹੁੰਦੀਆਂ ਹਨ ਜਦੋਂ ਅੱਖਾਂ ਲੋੜੀਂਦੇ ਅੰਝੂ ਨਹੀਂ ਬਣਾਉਂਦੀਆਂ, ਜਾਂ ਅੰਝੂ ਬਹੁਤ ਜਲਦੀ ਸੁੱਕ ਜਾਂਦੇ ਹਨ। ਅੱਖਾਂ ਕਿਰਕਿਰੀਆਂ, ਜਲਦੀਆਂ ਜਾਂ ਥੱਕੀਆਂ ਲੱਗਦੀਆਂ ਹਨ, ਅਤੇ ਉਨ੍ਹਾਂ ਵਿੱਚੋਂ ਪਾਣੀ ਵੀ ਆ ਸਕਦਾ ਹੈ।",
      points: [
        "ਸਕ੍ਰੀਨ ’ਤੇ ਲੰਮਾ ਸਮਾਂ, ਕਿਉਂਕਿ ਅਸੀਂ ਪਲਕਾਂ ਘੱਟ ਝਪਕਦੇ ਹਾਂ",
        "ਸੁੱਕੀ ਜਾਂ ਏਸੀ ਦੀ ਹਵਾ, ਹਵਾ ਦੇ ਝੋਂਕੇ, ਧੂੰਆਂ ਅਤੇ ਧੂੜ",
        "ਕੌਂਟੈਕਟ ਲੈਂਜ਼ ਜ਼ਿਆਦਾ ਦੇਰ ਪਾਉਣਾ, ਅਤੇ ਉਮਰ ਵਧਣਾ",
        "ਕੁਝ ਲੰਮੀਆਂ ਬਿਮਾਰੀਆਂ ਅਤੇ ਕੁਝ ਇਲਾਜ",
      ],
    },
  },
  {
    id: 'squint',
    kind: 'condition',
    phrases: ['squint', 'crossed eyes', 'lazy eye', 'eyes not aligned', 'strabismus', 'bhengapan', 'squint eye', 'child squint', 'भेंगापन', 'ਭੇਂਗਾਪਣ'],
    en: {
      about: "A squint (strabismus) is when the two eyes do not point in the same direction. It is common in children and can also start in adults.",
      points: [
        "One eye may turn in, out, up or down, all the time or only sometimes",
        "In young children it needs to be seen early, because the brain can start to ignore the weaker eye",
        "An eye doctor tests the vision and how the eyes move together",
        "Treatment can include glasses, exercises, covering one eye or surgery on the eye muscles",
      ],
    },
    hi: {
      about: "भेंगापन (स्क्विंट) तब होता है जब दोनों आंखें एक ही दिशा में नहीं देखतीं। यह बच्चों में आम है और बड़ों में भी शुरू हो सकता है।",
      points: [
        "एक आंख अंदर, बाहर, ऊपर या नीचे मुड़ सकती है, हमेशा या सिर्फ़ कभी-कभी",
        "छोटे बच्चों में इसे जल्दी दिखाना ज़रूरी है, क्योंकि दिमाग कमज़ोर आंख को नज़रअंदाज़ करना शुरू कर सकता है",
        "आंखों के डॉक्टर नज़र और दोनों आंखों के साथ हिलने की जांच करते हैं",
        "इलाज में चश्मा, कसरतें, एक आंख को ढकना या आंख की मांसपेशियों का ऑपरेशन शामिल हो सकता है",
      ],
    },
    pa: {
      about: "ਭੇਂਗਾਪਣ (ਸਕਵਿੰਟ) ਉਦੋਂ ਹੁੰਦਾ ਹੈ ਜਦੋਂ ਦੋਵੇਂ ਅੱਖਾਂ ਇੱਕੋ ਦਿਸ਼ਾ ਵਿੱਚ ਨਹੀਂ ਦੇਖਦੀਆਂ। ਇਹ ਬੱਚਿਆਂ ਵਿੱਚ ਆਮ ਹੈ ਅਤੇ ਵੱਡਿਆਂ ਵਿੱਚ ਵੀ ਸ਼ੁਰੂ ਹੋ ਸਕਦਾ ਹੈ।",
      points: [
        "ਇੱਕ ਅੱਖ ਅੰਦਰ, ਬਾਹਰ, ਉੱਪਰ ਜਾਂ ਹੇਠਾਂ ਮੁੜ ਸਕਦੀ ਹੈ, ਹਮੇਸ਼ਾ ਜਾਂ ਸਿਰਫ਼ ਕਦੇ-ਕਦੇ",
        "ਛੋਟੇ ਬੱਚਿਆਂ ਵਿੱਚ ਇਸ ਨੂੰ ਜਲਦੀ ਦਿਖਾਉਣਾ ਜ਼ਰੂਰੀ ਹੈ, ਕਿਉਂਕਿ ਦਿਮਾਗ ਕਮਜ਼ੋਰ ਅੱਖ ਨੂੰ ਨਜ਼ਰਅੰਦਾਜ਼ ਕਰਨਾ ਸ਼ੁਰੂ ਕਰ ਸਕਦਾ ਹੈ",
        "ਅੱਖਾਂ ਦੇ ਡਾਕਟਰ ਨਜ਼ਰ ਅਤੇ ਦੋਵਾਂ ਅੱਖਾਂ ਦੇ ਇਕੱਠੇ ਹਿੱਲਣ ਦੀ ਜਾਂਚ ਕਰਦੇ ਹਨ",
        "ਇਲਾਜ ਵਿੱਚ ਐਨਕ, ਕਸਰਤਾਂ, ਇੱਕ ਅੱਖ ਨੂੰ ਢਕਣਾ ਜਾਂ ਅੱਖ ਦੀਆਂ ਮਾਸਪੇਸ਼ੀਆਂ ਦਾ ਆਪ੍ਰੇਸ਼ਨ ਸ਼ਾਮਲ ਹੋ ਸਕਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'glasses-eye-test',
    kind: 'condition',
    phrases: ['glasses', 'eye test', 'eye checkup', 'eye check up', 'spectacles', 'short sight', 'long sight', 'refractive error', 'eye power', 'myopia', 'hypermetropia', 'astigmatism', 'chasma', 'eye examination', 'vision test', 'चश्मा', 'ਐਨਕ'],
    en: {
      about: "Glasses correct a refractive error, which is when the eye does not focus light properly. The common kinds are short sight, long sight and astigmatism.",
      points: [
        "Short sight (myopia): near things are clear and distant things are blurred",
        "Long sight (hypermetropia): the opposite, often with eye strain on close work",
        "Astigmatism: blur at all distances because of the shape of the front of the eye",
        "After about 40, near vision gets harder (presbyopia), and reading glasses are common",
        "An eye test measures the vision and the glasses number, and checks the health of the eye",
      ],
    },
    hi: {
      about: "चश्मा अपवर्तन दोष को ठीक करता है, यानी जब आंख रोशनी को ठीक से फ़ोकस नहीं करती। आम प्रकार हैं निकट दृष्टि दोष, दूर दृष्टि दोष और अबिंदुकता (एस्टिग्मैटिज़्म)।",
      points: [
        "निकट दृष्टि दोष (मायोपिया): पास की चीज़ें साफ़ और दूर की धुंधली दिखती हैं",
        "दूर दृष्टि दोष (हाइपरमेट्रोपिया): इसका उलटा, अक्सर पास के काम में आंखों पर ज़ोर के साथ",
        "एस्टिग्मैटिज़्म: आंख के अगले हिस्से के आकार के कारण हर दूरी पर धुंधलापन",
        "40 के बाद पास का देखना मुश्किल होने लगता है (प्रेस्बायोपिया), और पढ़ने का चश्मा आम है",
        "आंखों की जांच से नज़र और चश्मे का नंबर नापा जाता है, और आंख की सेहत देखी जाती है",
      ],
    },
    pa: {
      about: "ਐਨਕ ਅਪਵਰਤਨ ਨੁਕਸ ਨੂੰ ਠੀਕ ਕਰਦੀ ਹੈ, ਯਾਨੀ ਜਦੋਂ ਅੱਖ ਰੌਸ਼ਨੀ ਨੂੰ ਠੀਕ ਤਰ੍ਹਾਂ ਫੋਕਸ ਨਹੀਂ ਕਰਦੀ। ਆਮ ਕਿਸਮਾਂ ਹਨ ਨੇੜੇ ਦੀ ਨਜ਼ਰ ਦਾ ਨੁਕਸ, ਦੂਰ ਦੀ ਨਜ਼ਰ ਦਾ ਨੁਕਸ ਅਤੇ ਐਸਟਿਗਮੈਟਿਜ਼ਮ।",
      points: [
        "ਨੇੜੇ ਦੀ ਨਜ਼ਰ ਦਾ ਨੁਕਸ (ਮਾਇਓਪੀਆ): ਨੇੜੇ ਦੀਆਂ ਚੀਜ਼ਾਂ ਸਾਫ਼ ਅਤੇ ਦੂਰ ਦੀਆਂ ਧੁੰਦਲੀਆਂ ਦਿਖਦੀਆਂ ਹਨ",
        "ਦੂਰ ਦੀ ਨਜ਼ਰ ਦਾ ਨੁਕਸ (ਹਾਈਪਰਮੈਟ੍ਰੋਪੀਆ): ਇਸ ਦਾ ਉਲਟ, ਅਕਸਰ ਨੇੜੇ ਦੇ ਕੰਮ ਵਿੱਚ ਅੱਖਾਂ ’ਤੇ ਜ਼ੋਰ ਨਾਲ",
        "ਐਸਟਿਗਮੈਟਿਜ਼ਮ: ਅੱਖ ਦੇ ਅਗਲੇ ਹਿੱਸੇ ਦੇ ਆਕਾਰ ਕਾਰਨ ਹਰ ਦੂਰੀ ’ਤੇ ਧੁੰਦਲਾਪਣ",
        "40 ਤੋਂ ਬਾਅਦ ਨੇੜੇ ਦਾ ਦੇਖਣਾ ਔਖਾ ਹੋਣ ਲੱਗਦਾ ਹੈ (ਪ੍ਰੈਸਬਾਇਓਪੀਆ), ਅਤੇ ਪੜ੍ਹਨ ਦੀ ਐਨਕ ਆਮ ਹੈ",
        "ਅੱਖਾਂ ਦੀ ਜਾਂਚ ਨਾਲ ਨਜ਼ਰ ਅਤੇ ਐਨਕ ਦਾ ਨੰਬਰ ਮਾਪਿਆ ਜਾਂਦਾ ਹੈ, ਅਤੇ ਅੱਖ ਦੀ ਸਿਹਤ ਦੇਖੀ ਜਾਂਦੀ ਹੈ",
      ],
    },
  },
  {
    id: 'night-blindness',
    kind: 'condition',
    phrases: ['night blindness', 'cannot see at night', 'difficulty seeing at night', 'poor night vision', 'raat ko nahi dikhta', 'raat me nahi dikhta', 'रतौंधी', 'ਰਾਤ ਦਾ ਅੰਨ੍ਹਾਪਣ'],
    en: {
      about: "Night blindness is trouble seeing in dim light or at night, even when vision in daylight seems fine.",
      points: [
        "Short sight that is not fully corrected by glasses",
        "Cataract, which scatters light",
        "Low vitamin A, in people whose food gives too little of it",
        "Inherited conditions of the back of the eye",
        "An eye examination is needed to find the reason",
      ],
    },
    hi: {
      about: "रतौंधी में कम रोशनी में या रात में देखने में दिक्कत होती है, भले ही दिन में नज़र ठीक लगे।",
      points: [
        "निकट दृष्टि दोष जो चश्मे से पूरी तरह ठीक न हो",
        "मोतियाबिंद, जो रोशनी को बिखेर देता है",
        "विटामिन A की कमी, उन लोगों में जिनके खाने में यह बहुत कम होता है",
        "आंख के पिछले हिस्से की वंशानुगत बीमारियां",
        "कारण पता करने के लिए आंखों की जांच ज़रूरी है",
      ],
    },
    pa: {
      about: "ਰਾਤ ਦੇ ਅੰਨ੍ਹੇਪਣ ਵਿੱਚ ਘੱਟ ਰੌਸ਼ਨੀ ਵਿੱਚ ਜਾਂ ਰਾਤ ਨੂੰ ਦੇਖਣ ਵਿੱਚ ਦਿੱਕਤ ਹੁੰਦੀ ਹੈ, ਭਾਵੇਂ ਦਿਨ ਵਿੱਚ ਨਜ਼ਰ ਠੀਕ ਲੱਗੇ।",
      points: [
        "ਨੇੜੇ ਦੀ ਨਜ਼ਰ ਦਾ ਨੁਕਸ ਜੋ ਐਨਕ ਨਾਲ ਪੂਰੀ ਤਰ੍ਹਾਂ ਠੀਕ ਨਾ ਹੋਵੇ",
        "ਮੋਤੀਆਬਿੰਦ, ਜੋ ਰੌਸ਼ਨੀ ਨੂੰ ਖਿਲਾਰ ਦਿੰਦਾ ਹੈ",
        "ਵਿਟਾਮਿਨ A ਦੀ ਕਮੀ, ਉਨ੍ਹਾਂ ਲੋਕਾਂ ਵਿੱਚ ਜਿਨ੍ਹਾਂ ਦੇ ਖਾਣੇ ਵਿੱਚ ਇਹ ਬਹੁਤ ਘੱਟ ਹੁੰਦਾ ਹੈ",
        "ਅੱਖ ਦੇ ਪਿਛਲੇ ਹਿੱਸੇ ਦੀਆਂ ਵਿਰਾਸਤੀ ਬਿਮਾਰੀਆਂ",
        "ਕਾਰਨ ਪਤਾ ਕਰਨ ਲਈ ਅੱਖਾਂ ਦੀ ਜਾਂਚ ਜ਼ਰੂਰੀ ਹੈ",
      ],
    },
  },
  {
    id: 'varicose-veins',
    kind: 'condition',
    phrases: ['varicose veins', 'varicose vein', 'swollen veins', 'bulging veins', 'veins in legs', 'varicose', 'नसें फूलना', 'ਨਾੜਾਂ ਫੁੱਲਣਾ'],
    en: {
      about: "Varicose veins are swollen, twisted veins that show under the skin, most often in the legs. They happen when the small valves inside the veins stop working well, so blood pools.",
      points: [
        "Signs: visible blue or purple veins, aching or heavy legs, and swelling of the ankles by the evening",
        "More likely with age, standing for long hours, pregnancy and family history",
        "Many cause only a cosmetic worry, but some cause pain, skin changes or sores",
        "A scan (Doppler) shows how the blood is flowing in the veins",
        "Procedures that close or remove the affected veins are available when needed",
      ],
    },
    hi: {
      about: "वैरिकोज़ वेन्स सूजी हुई, टेढ़ी-मेढ़ी नसें हैं जो त्वचा के नीचे दिखती हैं, ज़्यादातर पैरों में। ये तब होती हैं जब नसों के अंदर के छोटे वाल्व ठीक से काम नहीं करते और खून जमा होने लगता है।",
      points: [
        "संकेत: दिखाई देने वाली नीली या बैंगनी नसें, पैरों में दर्द या भारीपन, और शाम तक टखनों की सूजन",
        "उम्र, लंबे घंटों तक खड़े रहने, गर्भावस्था और परिवार के इतिहास के साथ संभावना बढ़ती है",
        "कई में सिर्फ़ दिखावट की चिंता होती है, लेकिन कुछ में दर्द, त्वचा में बदलाव या घाव हो जाते हैं",
        "स्कैन (डॉप्लर) से पता चलता है कि नसों में खून कैसे बह रहा है",
        "ज़रूरत पड़ने पर प्रभावित नसों को बंद करने या निकालने की प्रक्रियाएं उपलब्ध हैं",
      ],
    },
    pa: {
      about: "ਵੈਰੀਕੋਜ਼ ਵੇਨਜ਼ ਸੁੱਜੀਆਂ, ਟੇਢੀਆਂ-ਮੇਢੀਆਂ ਨਾੜਾਂ ਹਨ ਜੋ ਚਮੜੀ ਹੇਠਾਂ ਦਿਖਦੀਆਂ ਹਨ, ਜ਼ਿਆਦਾਤਰ ਲੱਤਾਂ ਵਿੱਚ। ਇਹ ਉਦੋਂ ਹੁੰਦੀਆਂ ਹਨ ਜਦੋਂ ਨਾੜਾਂ ਦੇ ਅੰਦਰ ਦੇ ਛੋਟੇ ਵਾਲਵ ਠੀਕ ਤਰ੍ਹਾਂ ਕੰਮ ਨਹੀਂ ਕਰਦੇ ਅਤੇ ਖੂਨ ਜਮ੍ਹਾ ਹੋਣ ਲੱਗਦਾ ਹੈ।",
      points: [
        "ਸੰਕੇਤ: ਦਿਖਾਈ ਦੇਣ ਵਾਲੀਆਂ ਨੀਲੀਆਂ ਜਾਂ ਬੈਂਗਣੀ ਨਾੜਾਂ, ਲੱਤਾਂ ਵਿੱਚ ਦਰਦ ਜਾਂ ਭਾਰੀਪਨ, ਅਤੇ ਸ਼ਾਮ ਤੱਕ ਗਿੱਟਿਆਂ ਦੀ ਸੋਜ",
        "ਉਮਰ, ਲੰਮੇ ਘੰਟੇ ਖੜ੍ਹੇ ਰਹਿਣ, ਗਰਭ ਅਵਸਥਾ ਅਤੇ ਪਰਿਵਾਰ ਦੇ ਇਤਿਹਾਸ ਨਾਲ ਸੰਭਾਵਨਾ ਵਧਦੀ ਹੈ",
        "ਕਈਆਂ ਵਿੱਚ ਸਿਰਫ਼ ਦਿੱਖ ਦੀ ਚਿੰਤਾ ਹੁੰਦੀ ਹੈ, ਪਰ ਕੁਝ ਵਿੱਚ ਦਰਦ, ਚਮੜੀ ਵਿੱਚ ਬਦਲਾਅ ਜਾਂ ਜ਼ਖ਼ਮ ਹੋ ਜਾਂਦੇ ਹਨ",
        "ਸਕੈਨ (ਡੌਪਲਰ) ਨਾਲ ਪਤਾ ਲੱਗਦਾ ਹੈ ਕਿ ਨਾੜਾਂ ਵਿੱਚ ਖੂਨ ਕਿਵੇਂ ਵਹਿ ਰਿਹਾ ਹੈ",
        "ਲੋੜ ਪੈਣ ’ਤੇ ਪ੍ਰਭਾਵਿਤ ਨਾੜਾਂ ਨੂੰ ਬੰਦ ਕਰਨ ਜਾਂ ਕੱਢਣ ਦੀਆਂ ਪ੍ਰਕਿਰਿਆਵਾਂ ਉਪਲਬਧ ਹਨ",
      ],
    },
  },
  {
    id: 'liver-problems',
    kind: 'condition',
    phrases: ['liver problem', 'liver problems', 'liver pain', 'pain in liver', 'liver trouble', 'jigar ki bimari', 'liver issue', 'liver swelling', 'enlarged liver', 'जिगर की बीमारी', 'ਜਿਗਰ ਦੀ ਬਿਮਾਰੀ'],
    en: {
      about: "The liver is a large organ on the upper right of the belly. It cleans the blood, makes bile for digestion and stores energy. Many liver problems cause no symptoms early on.",
      points: [
        "Common causes: infections such as hepatitis, fatty liver, and alcohol",
        "Signs can include yellow eyes or skin, dark urine, tiredness, swelling of the belly or legs, and pain or heaviness in the upper right belly",
        "Some treatments and long-term illnesses can also affect the liver",
        "Blood tests and an ultrasound show how the liver is working",
      ],
    },
    hi: {
      about: "लिवर पेट के ऊपरी दाएं हिस्से में एक बड़ा अंग है। यह खून को साफ़ करता है, पाचन के लिए पित्त बनाता है और ऊर्जा जमा रखता है। कई लिवर की समस्याओं में शुरुआत में कोई लक्षण नहीं होता।",
      points: [
        "आम कारण: हेपेटाइटिस जैसे संक्रमण, फैटी लिवर और शराब",
        "संकेतों में पीली आंखें या त्वचा, गहरे रंग का पेशाब, थकान, पेट या पैरों में सूजन, और पेट के ऊपरी दाएं हिस्से में दर्द या भारीपन शामिल हो सकते हैं",
        "कुछ इलाज और लंबी बीमारियां भी लिवर को प्रभावित कर सकती हैं",
        "खून की जांच और अल्ट्रासाउंड से पता चलता है कि लिवर कैसे काम कर रहा है",
      ],
    },
    pa: {
      about: "ਜਿਗਰ ਪੇਟ ਦੇ ਉੱਪਰਲੇ ਸੱਜੇ ਹਿੱਸੇ ਵਿੱਚ ਇੱਕ ਵੱਡਾ ਅੰਗ ਹੈ। ਇਹ ਖੂਨ ਨੂੰ ਸਾਫ਼ ਕਰਦਾ ਹੈ, ਪਾਚਨ ਲਈ ਪਿੱਤ ਬਣਾਉਂਦਾ ਹੈ ਅਤੇ ਊਰਜਾ ਜਮ੍ਹਾ ਰੱਖਦਾ ਹੈ। ਕਈ ਜਿਗਰ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ ਵਿੱਚ ਸ਼ੁਰੂ ਵਿੱਚ ਕੋਈ ਲੱਛਣ ਨਹੀਂ ਹੁੰਦਾ।",
      points: [
        "ਆਮ ਕਾਰਨ: ਹੈਪੇਟਾਈਟਿਸ ਵਰਗੀਆਂ ਲਾਗਾਂ, ਫੈਟੀ ਲਿਵਰ ਅਤੇ ਸ਼ਰਾਬ",
        "ਸੰਕੇਤਾਂ ਵਿੱਚ ਪੀਲੀਆਂ ਅੱਖਾਂ ਜਾਂ ਚਮੜੀ, ਗੂੜ੍ਹੇ ਰੰਗ ਦਾ ਪਿਸ਼ਾਬ, ਥਕਾਵਟ, ਪੇਟ ਜਾਂ ਲੱਤਾਂ ਵਿੱਚ ਸੋਜ, ਅਤੇ ਪੇਟ ਦੇ ਉੱਪਰਲੇ ਸੱਜੇ ਹਿੱਸੇ ਵਿੱਚ ਦਰਦ ਜਾਂ ਭਾਰੀਪਨ ਸ਼ਾਮਲ ਹੋ ਸਕਦੇ ਹਨ",
        "ਕੁਝ ਇਲਾਜ ਅਤੇ ਲੰਮੀਆਂ ਬਿਮਾਰੀਆਂ ਵੀ ਜਿਗਰ ਨੂੰ ਪ੍ਰਭਾਵਿਤ ਕਰ ਸਕਦੀਆਂ ਹਨ",
        "ਖੂਨ ਦੀ ਜਾਂਚ ਅਤੇ ਅਲਟਰਾਸਾਊਂਡ ਨਾਲ ਪਤਾ ਲੱਗਦਾ ਹੈ ਕਿ ਜਿਗਰ ਕਿਵੇਂ ਕੰਮ ਕਰ ਰਿਹਾ ਹੈ",
      ],
    },
  },
  {
    id: 'lump-in-neck',
    kind: 'symptom',
    phrases: ['lump in neck', 'neck lump', 'swelling in neck', 'neck swelling', 'swollen glands', 'swollen lymph nodes', 'gland in neck', 'lymph node swelling', 'lump on neck', 'swollen neck', 'gardan me gaanth', 'गर्दन में गांठ', 'ਗਰਦਨ ਵਿੱਚ ਗੰਢ'],
    en: {
      about: "A lump or swelling in the neck is often a swollen lymph node, which is part of the body's defence and swells when there is an infection nearby. Other causes include the thyroid and the glands that make saliva.",
      points: [
        "Infections of the throat, mouth, ear or teeth, which usually make tender nodes that go down again",
        "A swelling of the thyroid gland in the front of the neck",
        "Infected or blocked saliva glands, often with pain on eating",
        "Cysts and other lumps that a doctor can examine",
        "A lump that is hard, painless, growing or lasting more than two to three weeks should be checked",
      ],
    },
    hi: {
      about: "गर्दन में गांठ या सूजन अक्सर सूजी हुई लसीका ग्रंथि होती है, जो शरीर की रक्षा का हिस्सा है और पास में संक्रमण होने पर सूज जाती है। दूसरे कारणों में थायराइड और लार बनाने वाली ग्रंथियां शामिल हैं।",
      points: [
        "गले, मुंह, कान या दांतों के संक्रमण, जो आमतौर पर दर्द वाली गांठें बनाते हैं जो फिर घट जाती हैं",
        "गर्दन के आगे थायराइड ग्रंथि की सूजन",
        "लार की ग्रंथियों में संक्रमण या रुकावट, अक्सर खाते समय दर्द के साथ",
        "सिस्ट और दूसरी गांठें जिन्हें डॉक्टर जांच सकते हैं",
        "जो गांठ सख्त हो, दर्द न करे, बढ़ रही हो या दो-तीन हफ्ते से ज़्यादा रहे, उसकी जांच करानी चाहिए",
      ],
    },
    pa: {
      about: "ਗਰਦਨ ਵਿੱਚ ਗੰਢ ਜਾਂ ਸੋਜ ਅਕਸਰ ਸੁੱਜੀ ਹੋਈ ਲਸਿਕਾ ਗ੍ਰੰਥੀ ਹੁੰਦੀ ਹੈ, ਜੋ ਸਰੀਰ ਦੀ ਰੱਖਿਆ ਦਾ ਹਿੱਸਾ ਹੈ ਅਤੇ ਨੇੜੇ ਲਾਗ ਹੋਣ ’ਤੇ ਸੁੱਜ ਜਾਂਦੀ ਹੈ। ਹੋਰ ਕਾਰਨਾਂ ਵਿੱਚ ਥਾਇਰਾਇਡ ਅਤੇ ਥੁੱਕ ਬਣਾਉਣ ਵਾਲੀਆਂ ਗ੍ਰੰਥੀਆਂ ਸ਼ਾਮਲ ਹਨ।",
      points: [
        "ਗਲੇ, ਮੂੰਹ, ਕੰਨ ਜਾਂ ਦੰਦਾਂ ਦੀਆਂ ਲਾਗਾਂ, ਜੋ ਆਮ ਤੌਰ ’ਤੇ ਦਰਦ ਵਾਲੀਆਂ ਗੰਢਾਂ ਬਣਾਉਂਦੀਆਂ ਹਨ ਜੋ ਫਿਰ ਘਟ ਜਾਂਦੀਆਂ ਹਨ",
        "ਗਰਦਨ ਦੇ ਅਗਲੇ ਪਾਸੇ ਥਾਇਰਾਇਡ ਗ੍ਰੰਥੀ ਦੀ ਸੋਜ",
        "ਥੁੱਕ ਦੀਆਂ ਗ੍ਰੰਥੀਆਂ ਵਿੱਚ ਲਾਗ ਜਾਂ ਰੁਕਾਵਟ, ਅਕਸਰ ਖਾਣ ਵੇਲੇ ਦਰਦ ਨਾਲ",
        "ਸਿਸਟ ਅਤੇ ਹੋਰ ਗੰਢਾਂ ਜਿਨ੍ਹਾਂ ਦੀ ਡਾਕਟਰ ਜਾਂਚ ਕਰ ਸਕਦੇ ਹਨ",
        "ਜੋ ਗੰਢ ਸਖ਼ਤ ਹੋਵੇ, ਦਰਦ ਨਾ ਕਰੇ, ਵਧ ਰਹੀ ਹੋਵੇ ਜਾਂ ਦੋ-ਤਿੰਨ ਹਫ਼ਤਿਆਂ ਤੋਂ ਵੱਧ ਰਹੇ, ਉਸ ਦੀ ਜਾਂਚ ਕਰਵਾਉਣੀ ਚਾਹੀਦੀ ਹੈ",
      ],
    },
  },
  {
    id: 'lump-in-breast',
    kind: 'symptom',
    phrases: ['lump in breast', 'breast lump', 'breast pain', 'pain in breast', 'lump in the breast', 'breast swelling', 'breast gaanth', 'स्तन में गांठ', 'ਛਾਤੀ ਵਿੱਚ ਗੰਢ'],
    en: {
      about: "Most breast lumps are not cancer, and breast pain is common and usually linked to the monthly cycle. Any new lump, or a change in the breast, should still be looked at by a doctor.",
      points: [
        "Cysts, fluid-filled sacs that are common and harmless",
        "Fibroadenomas, smooth, firm lumps in younger women",
        "Infection of the breast, often with redness, warmth and fever, especially while breastfeeding",
        "Hormonal changes before periods, which can make the breasts lumpy and tender",
        "A scan or other tests help tell the kinds of lump apart",
      ],
    },
    hi: {
      about: "ज़्यादातर स्तन की गांठें कैंसर नहीं होतीं, और स्तन का दर्द आम है और आमतौर पर माहवारी के चक्र से जुड़ा होता है। फिर भी कोई भी नई गांठ, या स्तन में बदलाव, डॉक्टर को दिखाना चाहिए।",
      points: [
        "सिस्ट, तरल से भरी थैलियां जो आम हैं और हानिरहित हैं",
        "फाइब्रोएडेनोमा, कम उम्र की महिलाओं में चिकनी, ठोस गांठें",
        "स्तन का संक्रमण, अक्सर लालिमा, गर्माहट और बुखार के साथ, खासकर स्तनपान के दौरान",
        "माहवारी से पहले हार्मोन में बदलाव, जिनसे स्तन गांठदार और नाज़ुक हो सकते हैं",
        "स्कैन या दूसरी जांचें गांठों के प्रकार अलग करने में मदद करती हैं",
      ],
    },
    pa: {
      about: "ਜ਼ਿਆਦਾਤਰ ਛਾਤੀ ਦੀਆਂ ਗੰਢਾਂ ਕੈਂਸਰ ਨਹੀਂ ਹੁੰਦੀਆਂ, ਅਤੇ ਛਾਤੀ ਦਾ ਦਰਦ ਆਮ ਹੈ ਅਤੇ ਆਮ ਤੌਰ ’ਤੇ ਮਾਹਵਾਰੀ ਦੇ ਚੱਕਰ ਨਾਲ ਜੁੜਿਆ ਹੁੰਦਾ ਹੈ। ਫਿਰ ਵੀ ਕੋਈ ਵੀ ਨਵੀਂ ਗੰਢ, ਜਾਂ ਛਾਤੀ ਵਿੱਚ ਬਦਲਾਅ, ਡਾਕਟਰ ਨੂੰ ਦਿਖਾਉਣਾ ਚਾਹੀਦਾ ਹੈ।",
      points: [
        "ਸਿਸਟ, ਤਰਲ ਨਾਲ ਭਰੀਆਂ ਥੈਲੀਆਂ ਜੋ ਆਮ ਹਨ ਅਤੇ ਨੁਕਸਾਨ ਰਹਿਤ ਹਨ",
        "ਫਾਈਬ੍ਰੋਐਡੀਨੋਮਾ, ਘੱਟ ਉਮਰ ਦੀਆਂ ਔਰਤਾਂ ਵਿੱਚ ਚਿਕਨੀਆਂ, ਠੋਸ ਗੰਢਾਂ",
        "ਛਾਤੀ ਦੀ ਲਾਗ, ਅਕਸਰ ਲਾਲੀ, ਗਰਮਾਹਟ ਅਤੇ ਬੁਖ਼ਾਰ ਨਾਲ, ਖ਼ਾਸ ਕਰਕੇ ਦੁੱਧ ਪਿਲਾਉਣ ਦੌਰਾਨ",
        "ਮਾਹਵਾਰੀ ਤੋਂ ਪਹਿਲਾਂ ਹਾਰਮੋਨ ਵਿੱਚ ਬਦਲਾਅ, ਜਿਨ੍ਹਾਂ ਨਾਲ ਛਾਤੀਆਂ ਗੰਢਦਾਰ ਅਤੇ ਨਾਜ਼ੁਕ ਹੋ ਸਕਦੀਆਂ ਹਨ",
        "ਸਕੈਨ ਜਾਂ ਹੋਰ ਜਾਂਚਾਂ ਗੰਢਾਂ ਦੀਆਂ ਕਿਸਮਾਂ ਵੱਖ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦੀਆਂ ਹਨ",
      ],
    },
  },
]
