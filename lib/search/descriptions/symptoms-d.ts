// lib/search/descriptions/symptoms-d.ts
//
// Overviews of breathing, heart-check, skin and wound complaints. DRAFT: not yet reviewed by a LIMS doctor (see
// types.ts). Hindi and Punjabi are drafts of the English. No medicine, dose, home remedy or cure appears in any.

import type { DescriptionEntry } from '@/lib/search/descriptions/types'

export const SYMPTOMS_D: DescriptionEntry[] = [
  {
    id: 'breathlessness',
    kind: 'symptom',
    phrases: ['breathlessness', 'shortness of breath', 'out of breath', 'breathless', 'short of breath', 'saans phoolna', 'saans lene me takleef', 'सांस फूलना', 'ਸਾਹ ਫੁੱਲਣਾ'],
    en: {
      about: "Breathlessness is a feeling of not getting enough air. It is normal after hard exercise, but breathlessness that comes on suddenly, is severe, or happens at rest needs prompt medical care.",
      points: [
        "Asthma, or an infection of the chest",
        "Anaemia, or being very unfit",
        "Heart problems, which can also cause swelling of the feet and tiredness",
        "Anxiety and panic, though a doctor should rule out other causes first",
        "Sudden breathlessness, with chest pain or blue lips, is an emergency",
      ],
    },
    hi: {
      about: "सांस फूलना ऐसा एहसास है कि पर्याप्त हवा नहीं मिल रही। यह कड़ी कसरत के बाद सामान्य है, लेकिन जो सांस फूलना अचानक आए, तेज़ हो, या आराम में हो, उसे तुरंत चिकित्सा देखभाल चाहिए।",
      points: [
        "अस्थमा, या छाती का संक्रमण",
        "खून की कमी, या शारीरिक रूप से बहुत अयोग्य होना",
        "दिल की समस्याएं, जिनसे पैरों में सूजन और थकान भी हो सकती है",
        "घबराहट और पैनिक, हालांकि डॉक्टर को पहले दूसरे कारण खारिज करने चाहिए",
        "अचानक सांस फूलना, छाती में दर्द या नीले होंठों के साथ, आपातकाल है",
      ],
    },
    pa: {
      about: "ਸਾਹ ਫੁੱਲਣਾ ਅਜਿਹਾ ਅਹਿਸਾਸ ਹੈ ਕਿ ਲੋੜੀਂਦੀ ਹਵਾ ਨਹੀਂ ਮਿਲ ਰਹੀ। ਇਹ ਸਖ਼ਤ ਕਸਰਤ ਤੋਂ ਬਾਅਦ ਸਧਾਰਨ ਹੈ, ਪਰ ਜੋ ਸਾਹ ਫੁੱਲਣਾ ਅਚਾਨਕ ਆਵੇ, ਤੇਜ਼ ਹੋਵੇ, ਜਾਂ ਆਰਾਮ ਵਿੱਚ ਹੋਵੇ, ਉਸ ਨੂੰ ਤੁਰੰਤ ਡਾਕਟਰੀ ਦੇਖਭਾਲ ਚਾਹੀਦੀ ਹੈ।",
      points: [
        "ਦਮਾ, ਜਾਂ ਛਾਤੀ ਦੀ ਲਾਗ",
        "ਖੂਨ ਦੀ ਕਮੀ, ਜਾਂ ਸਰੀਰਕ ਤੌਰ ’ਤੇ ਬਹੁਤ ਅਯੋਗ ਹੋਣਾ",
        "ਦਿਲ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ, ਜਿਨ੍ਹਾਂ ਨਾਲ ਪੈਰਾਂ ਵਿੱਚ ਸੋਜ ਅਤੇ ਥਕਾਵਟ ਵੀ ਹੋ ਸਕਦੀ ਹੈ",
        "ਘਬਰਾਹਟ ਅਤੇ ਪੈਨਿਕ, ਹਾਲਾਂਕਿ ਡਾਕਟਰ ਨੂੰ ਪਹਿਲਾਂ ਹੋਰ ਕਾਰਨ ਖ਼ਾਰਜ ਕਰਨੇ ਚਾਹੀਦੇ ਹਨ",
        "ਅਚਾਨਕ ਸਾਹ ਫੁੱਲਣਾ, ਛਾਤੀ ਵਿੱਚ ਦਰਦ ਜਾਂ ਨੀਲੇ ਬੁੱਲ੍ਹਾਂ ਨਾਲ, ਐਮਰਜੈਂਸੀ ਹੈ",
      ],
    },
  },
  {
    id: 'palpitations',
    kind: 'symptom',
    phrases: ['palpitations', 'palpitation', 'heart racing', 'fast heartbeat', 'irregular heartbeat', 'heart beating fast', 'heart pounding', 'dil ki dhadkan tez', 'दिल की धड़कन तेज', 'ਦਿਲ ਦੀ ਧੜਕਣ ਤੇਜ਼'],
    en: {
      about: "Palpitations are the feeling that your heart is pounding, racing, fluttering or skipping a beat. They are common and often harmless, but they should be checked.",
      points: [
        "Stress, anxiety, tiredness, too much tea or coffee, smoking or alcohol",
        "Fever, anaemia or an overactive thyroid",
        "Some heart rhythm problems, found with an ECG",
        "Palpitations with chest pain, fainting or breathlessness need urgent care",
      ],
    },
    hi: {
      about: "धड़कन का तेज़ होना (पैल्पिटेशन) ऐसा एहसास है कि दिल धक-धक कर रहा है, दौड़ रहा है, फड़फड़ा रहा है या एक धड़कन छोड़ रहा है। ये आम हैं और अक्सर हानिरहित होते हैं, लेकिन इनकी जांच करानी चाहिए।",
      points: [
        "तनाव, घबराहट, थकान, बहुत ज़्यादा चाय या कॉफ़ी, धूम्रपान या शराब",
        "बुखार, खून की कमी या थायराइड का ज़्यादा सक्रिय होना",
        "दिल की लय की कुछ समस्याएं, जो ईसीजी से पता चलती हैं",
        "छाती में दर्द, बेहोशी या सांस फूलने के साथ धड़कन तेज़ होने पर तुरंत इलाज चाहिए",
      ],
    },
    pa: {
      about: "ਧੜਕਣ ਤੇਜ਼ ਹੋਣਾ (ਪੈਲਪੀਟੇਸ਼ਨ) ਅਜਿਹਾ ਅਹਿਸਾਸ ਹੈ ਕਿ ਦਿਲ ਧਕ-ਧਕ ਕਰ ਰਿਹਾ ਹੈ, ਦੌੜ ਰਿਹਾ ਹੈ, ਫੜਫੜਾ ਰਿਹਾ ਹੈ ਜਾਂ ਇੱਕ ਧੜਕਣ ਛੱਡ ਰਿਹਾ ਹੈ। ਇਹ ਆਮ ਹਨ ਅਤੇ ਅਕਸਰ ਨੁਕਸਾਨ ਰਹਿਤ ਹੁੰਦੇ ਹਨ, ਪਰ ਇਨ੍ਹਾਂ ਦੀ ਜਾਂਚ ਕਰਵਾਉਣੀ ਚਾਹੀਦੀ ਹੈ।",
      points: [
        "ਤਣਾਅ, ਘਬਰਾਹਟ, ਥਕਾਵਟ, ਬਹੁਤ ਜ਼ਿਆਦਾ ਚਾਹ ਜਾਂ ਕੌਫ਼ੀ, ਸਿਗਰਟਨੋਸ਼ੀ ਜਾਂ ਸ਼ਰਾਬ",
        "ਬੁਖ਼ਾਰ, ਖੂਨ ਦੀ ਕਮੀ ਜਾਂ ਥਾਇਰਾਇਡ ਦਾ ਵੱਧ ਸਰਗਰਮ ਹੋਣਾ",
        "ਦਿਲ ਦੀ ਲੈਅ ਦੀਆਂ ਕੁਝ ਸਮੱਸਿਆਵਾਂ, ਜੋ ਈਸੀਜੀ ਨਾਲ ਪਤਾ ਲੱਗਦੀਆਂ ਹਨ",
        "ਛਾਤੀ ਵਿੱਚ ਦਰਦ, ਬੇਹੋਸ਼ੀ ਜਾਂ ਸਾਹ ਫੁੱਲਣ ਨਾਲ ਧੜਕਣ ਤੇਜ਼ ਹੋਣ ’ਤੇ ਤੁਰੰਤ ਇਲਾਜ ਚਾਹੀਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'heart-checkup',
    kind: 'test',
    phrases: ['heart checkup', 'heart check up', 'heart check', 'cardiac checkup', 'heart screening', 'heart test', 'heart health check', 'dil ki jaanch', 'दिल की जांच', 'ਦਿਲ ਦੀ ਜਾਂਚ'],
    en: {
      about: "A heart check-up looks at how healthy the heart and blood vessels are, and at the risk of heart disease. It is usually a mix of an examination and a few simple tests.",
      points: [
        "Blood pressure, pulse, weight and a doctor's examination",
        "An ECG, and sometimes an echo or a treadmill test",
        "Blood tests for sugar and cholesterol",
        "The doctor also asks about family history, smoking and symptoms such as chest pain or breathlessness",
      ],
    },
    hi: {
      about: "दिल की जांच देखती है कि दिल और खून की नलियां कितने स्वस्थ हैं, और दिल की बीमारी का खतरा कितना है। यह आमतौर पर जांच और कुछ आसान टेस्ट का मेल होती है।",
      points: [
        "ब्लड प्रेशर, नाड़ी, वज़न और डॉक्टर की जांच",
        "एक ईसीजी, और कभी-कभी इको या ट्रेडमिल टेस्ट",
        "शुगर और कोलेस्ट्रॉल की खून की जांचें",
        "डॉक्टर परिवार के इतिहास, धूम्रपान और छाती में दर्द या सांस फूलने जैसे लक्षणों के बारे में भी पूछते हैं",
      ],
    },
    pa: {
      about: "ਦਿਲ ਦੀ ਜਾਂਚ ਦੇਖਦੀ ਹੈ ਕਿ ਦਿਲ ਅਤੇ ਖੂਨ ਦੀਆਂ ਨਾੜੀਆਂ ਕਿੰਨੇ ਸਿਹਤਮੰਦ ਹਨ, ਅਤੇ ਦਿਲ ਦੀ ਬਿਮਾਰੀ ਦਾ ਖ਼ਤਰਾ ਕਿੰਨਾ ਹੈ। ਇਹ ਆਮ ਤੌਰ ’ਤੇ ਜਾਂਚ ਅਤੇ ਕੁਝ ਆਸਾਨ ਟੈਸਟਾਂ ਦਾ ਮੇਲ ਹੁੰਦੀ ਹੈ।",
      points: [
        "ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ, ਨਬਜ਼, ਭਾਰ ਅਤੇ ਡਾਕਟਰ ਦੀ ਜਾਂਚ",
        "ਇੱਕ ਈਸੀਜੀ, ਅਤੇ ਕਈ ਵਾਰ ਈਕੋ ਜਾਂ ਟ੍ਰੈਡਮਿਲ ਟੈਸਟ",
        "ਸ਼ੂਗਰ ਅਤੇ ਕੋਲੈਸਟ੍ਰੋਲ ਦੀਆਂ ਖੂਨ ਦੀਆਂ ਜਾਂਚਾਂ",
        "ਡਾਕਟਰ ਪਰਿਵਾਰ ਦੇ ਇਤਿਹਾਸ, ਸਿਗਰਟਨੋਸ਼ੀ ਅਤੇ ਛਾਤੀ ਵਿੱਚ ਦਰਦ ਜਾਂ ਸਾਹ ਫੁੱਲਣ ਵਰਗੇ ਲੱਛਣਾਂ ਬਾਰੇ ਵੀ ਪੁੱਛਦੇ ਹਨ",
      ],
    },
  },
  {
    id: 'allergy',
    kind: 'condition',
    phrases: ['allergy', 'allergies', 'allergic', 'allergic reaction', 'allergy symptoms', 'skin allergy', 'food allergy', 'dust allergy', 'एलर्जी', 'ਐਲਰਜੀ'],
    en: {
      about: "An allergy is when the body's defence system reacts strongly to something that is normally harmless, such as dust, pollen, certain foods or animal hair.",
      points: [
        "Signs can include sneezing, a runny nose, itchy eyes, a rash, itching or hives",
        "Allergies often run in families and can start at any age",
        "Finding and avoiding the trigger is the main step, and a doctor can help to find it",
        "A severe reaction, with swelling of the face or throat or trouble breathing, is an emergency",
      ],
    },
    hi: {
      about: "एलर्जी तब होती है जब शरीर की रक्षा प्रणाली किसी ऐसी चीज़ पर तेज़ प्रतिक्रिया करती है जो सामान्यतः हानिरहित है, जैसे धूल, पराग, कुछ खाने की चीज़ें या जानवरों के बाल।",
      points: [
        "संकेतों में छींकें, बहती नाक, खुजली वाली आंखें, चकत्ते, खुजली या पित्ती शामिल हो सकते हैं",
        "एलर्जी अक्सर परिवार में चलती है और किसी भी उम्र में शुरू हो सकती है",
        "कारण ढूंढना और उससे बचना मुख्य कदम है, और डॉक्टर उसे ढूंढने में मदद कर सकते हैं",
        "गंभीर प्रतिक्रिया, जिसमें चेहरे या गले में सूजन या सांस लेने में दिक्कत हो, आपातकाल है",
      ],
    },
    pa: {
      about: "ਐਲਰਜੀ ਉਦੋਂ ਹੁੰਦੀ ਹੈ ਜਦੋਂ ਸਰੀਰ ਦੀ ਰੱਖਿਆ ਪ੍ਰਣਾਲੀ ਕਿਸੇ ਅਜਿਹੀ ਚੀਜ਼ ’ਤੇ ਤੇਜ਼ ਪ੍ਰਤੀਕਰਮ ਕਰਦੀ ਹੈ ਜੋ ਆਮ ਤੌਰ ’ਤੇ ਨੁਕਸਾਨ ਰਹਿਤ ਹੈ, ਜਿਵੇਂ ਧੂੜ, ਪਰਾਗ, ਕੁਝ ਖਾਣ ਦੀਆਂ ਚੀਜ਼ਾਂ ਜਾਂ ਜਾਨਵਰਾਂ ਦੇ ਵਾਲ।",
      points: [
        "ਸੰਕੇਤਾਂ ਵਿੱਚ ਛਿੱਕਾਂ, ਵਗਦਾ ਨੱਕ, ਖੁਜਲੀ ਵਾਲੀਆਂ ਅੱਖਾਂ, ਧੱਫੜ, ਖੁਜਲੀ ਜਾਂ ਛਪਾਕੀ ਸ਼ਾਮਲ ਹੋ ਸਕਦੇ ਹਨ",
        "ਐਲਰਜੀ ਅਕਸਰ ਪਰਿਵਾਰ ਵਿੱਚ ਚੱਲਦੀ ਹੈ ਅਤੇ ਕਿਸੇ ਵੀ ਉਮਰ ਵਿੱਚ ਸ਼ੁਰੂ ਹੋ ਸਕਦੀ ਹੈ",
        "ਕਾਰਨ ਲੱਭਣਾ ਅਤੇ ਉਸ ਤੋਂ ਬਚਣਾ ਮੁੱਖ ਕਦਮ ਹੈ, ਅਤੇ ਡਾਕਟਰ ਉਸ ਨੂੰ ਲੱਭਣ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦੇ ਹਨ",
        "ਗੰਭੀਰ ਪ੍ਰਤੀਕਰਮ, ਜਿਸ ਵਿੱਚ ਚਿਹਰੇ ਜਾਂ ਗਲੇ ਵਿੱਚ ਸੋਜ ਜਾਂ ਸਾਹ ਲੈਣ ਵਿੱਚ ਦਿੱਕਤ ਹੋਵੇ, ਐਮਰਜੈਂਸੀ ਹੈ",
      ],
    },
  },
  {
    id: 'itching',
    kind: 'symptom',
    phrases: ['itching', 'itchy skin', 'itch', 'skin itching', 'itching all over', 'itchy body', 'khujli', 'खुजली', 'ਖੁਜਲੀ'],
    en: {
      about: "Itching is an unpleasant feeling that makes you want to scratch. It can come from the skin itself or from a condition elsewhere in the body.",
      points: [
        "Dry skin, insect bites or contact with something that irritates the skin",
        "Allergies and skin conditions such as eczema",
        "Fungal infections and scabies, which can spread to others",
        "Less often, liver, kidney or thyroid conditions, especially when itching is all over and there is no rash",
      ],
    },
    hi: {
      about: "खुजली एक अप्रिय एहसास है जिससे खुजलाने का मन करता है। यह त्वचा से ही या शरीर में कहीं और की किसी बीमारी से आ सकती है।",
      points: [
        "सूखी त्वचा, कीड़ों के काटने या त्वचा में जलन करने वाली किसी चीज़ से संपर्क",
        "एलर्जी और त्वचा की बीमारियां जैसे एक्ज़िमा",
        "फंगल संक्रमण और खुजली (स्कैबीज़), जो दूसरों में फैल सकते हैं",
        "कम मामलों में, लिवर, गुर्दे या थायराइड की बीमारियां, खासकर जब खुजली पूरे शरीर में हो और चकत्ते न हों",
      ],
    },
    pa: {
      about: "ਖੁਜਲੀ ਇੱਕ ਅਣਸੁਖਾਵਾਂ ਅਹਿਸਾਸ ਹੈ ਜਿਸ ਨਾਲ ਖੁਰਕਣ ਨੂੰ ਮਨ ਕਰਦਾ ਹੈ। ਇਹ ਚਮੜੀ ਤੋਂ ਹੀ ਜਾਂ ਸਰੀਰ ਵਿੱਚ ਕਿਤੇ ਹੋਰ ਦੀ ਕਿਸੇ ਬਿਮਾਰੀ ਤੋਂ ਆ ਸਕਦੀ ਹੈ।",
      points: [
        "ਸੁੱਕੀ ਚਮੜੀ, ਕੀੜਿਆਂ ਦੇ ਕੱਟਣ ਜਾਂ ਚਮੜੀ ਵਿੱਚ ਜਲਨ ਕਰਨ ਵਾਲੀ ਕਿਸੇ ਚੀਜ਼ ਨਾਲ ਸੰਪਰਕ",
        "ਐਲਰਜੀ ਅਤੇ ਚਮੜੀ ਦੀਆਂ ਬਿਮਾਰੀਆਂ ਜਿਵੇਂ ਐਕਜ਼ੀਮਾ",
        "ਫੰਗਲ ਲਾਗਾਂ ਅਤੇ ਖੁਰਕ (ਸਕੈਬੀਜ਼), ਜੋ ਦੂਜਿਆਂ ਵਿੱਚ ਫੈਲ ਸਕਦੀਆਂ ਹਨ",
        "ਘੱਟ ਮਾਮਲਿਆਂ ਵਿੱਚ, ਜਿਗਰ, ਗੁਰਦੇ ਜਾਂ ਥਾਇਰਾਇਡ ਦੀਆਂ ਬਿਮਾਰੀਆਂ, ਖ਼ਾਸ ਕਰਕੇ ਜਦੋਂ ਖੁਜਲੀ ਪੂਰੇ ਸਰੀਰ ਵਿੱਚ ਹੋਵੇ ਅਤੇ ਧੱਫੜ ਨਾ ਹੋਣ",
      ],
    },
  },
  {
    id: 'skin-rash',
    kind: 'symptom',
    phrases: ['skin rash', 'rash', 'rashes', 'rash on skin', 'skin problem', 'skin rashes', 'red spots on skin', 'skin allergy rash', 'chakatte', 'त्वचा पर चकत्ते', 'चकत्ते', 'ਚਮੜੀ ’ਤੇ ਧੱਫੜ', 'ਧੱਫੜ'],
    en: {
      about: "A rash is a change in the colour or texture of the skin, such as redness, bumps, blisters or scaling. It is a sign, not a diagnosis, and there are many possible causes.",
      points: [
        "Allergies or contact with something that irritates the skin",
        "Infections: viral, bacterial or fungal",
        "Skin conditions such as eczema or psoriasis",
        "Heat and sweating, especially in children and in the summer",
        "A rash with fever, spreading fast, or with trouble breathing needs a doctor promptly",
      ],
    },
    hi: {
      about: "चकत्ता त्वचा के रंग या बनावट में बदलाव है, जैसे लालिमा, उभार, फफोले या पपड़ी। यह एक संकेत है, निदान नहीं, और इसके कई संभावित कारण हैं।",
      points: [
        "एलर्जी या त्वचा में जलन करने वाली चीज़ से संपर्क",
        "संक्रमण: वायरल, बैक्टीरियल या फंगल",
        "त्वचा की बीमारियां जैसे एक्ज़िमा या सोरायसिस",
        "गर्मी और पसीना, खासकर बच्चों में और गर्मियों में",
        "बुखार के साथ, तेज़ी से फैलता, या सांस की दिक्कत के साथ चकत्ते पर तुरंत डॉक्टर चाहिए",
      ],
    },
    pa: {
      about: "ਧੱਫੜ ਚਮੜੀ ਦੇ ਰੰਗ ਜਾਂ ਬਣਤਰ ਵਿੱਚ ਬਦਲਾਅ ਹੈ, ਜਿਵੇਂ ਲਾਲੀ, ਉਭਾਰ, ਛਾਲੇ ਜਾਂ ਪੇਪੜੀ। ਇਹ ਇੱਕ ਸੰਕੇਤ ਹੈ, ਨਿਦਾਨ ਨਹੀਂ, ਅਤੇ ਇਸ ਦੇ ਕਈ ਸੰਭਾਵਿਤ ਕਾਰਨ ਹਨ।",
      points: [
        "ਐਲਰਜੀ ਜਾਂ ਚਮੜੀ ਵਿੱਚ ਜਲਨ ਕਰਨ ਵਾਲੀ ਚੀਜ਼ ਨਾਲ ਸੰਪਰਕ",
        "ਲਾਗਾਂ: ਵਾਇਰਲ, ਬੈਕਟੀਰੀਆ ਵਾਲੀਆਂ ਜਾਂ ਫੰਗਲ",
        "ਚਮੜੀ ਦੀਆਂ ਬਿਮਾਰੀਆਂ ਜਿਵੇਂ ਐਕਜ਼ੀਮਾ ਜਾਂ ਸੋਰਾਇਸਿਸ",
        "ਗਰਮੀ ਅਤੇ ਪਸੀਨਾ, ਖ਼ਾਸ ਕਰਕੇ ਬੱਚਿਆਂ ਵਿੱਚ ਅਤੇ ਗਰਮੀਆਂ ਵਿੱਚ",
        "ਬੁਖ਼ਾਰ ਦੇ ਨਾਲ, ਤੇਜ਼ੀ ਨਾਲ ਫੈਲਦੇ, ਜਾਂ ਸਾਹ ਦੀ ਦਿੱਕਤ ਦੇ ਨਾਲ ਧੱਫੜ ’ਤੇ ਤੁਰੰਤ ਡਾਕਟਰ ਚਾਹੀਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'pimples',
    kind: 'condition',
    phrases: ['pimples', 'pimple', 'acne', 'acne problem', 'face pimples', 'breakouts', 'muhase', 'मुंहासे', 'ਮੁਹਾਸੇ'],
    en: {
      about: "Acne causes pimples, blackheads and sometimes deeper, painful lumps, mostly on the face, chest and back. It is very common in teenagers and can continue into adult life.",
      points: [
        "It happens when oil glands and hair openings get blocked and sometimes inflamed",
        "Hormonal changes, including at puberty, periods and with PCOS, play a part",
        "Squeezing or picking can leave marks and scars",
        "Acne that is painful, deep, leaves scars or affects confidence is worth showing a doctor",
      ],
    },
    hi: {
      about: "मुंहासे पिंपल, ब्लैकहेड और कभी-कभी गहरी, दर्द भरी गांठें करते हैं, ज़्यादातर चेहरे, छाती और पीठ पर। यह किशोरों में बहुत आम है और वयस्क जीवन में भी जारी रह सकते हैं।",
      points: [
        "यह तब होता है जब तेल ग्रंथियां और बालों के छिद्र बंद हो जाते हैं और कभी-कभी सूज जाते हैं",
        "हार्मोन में बदलाव, जिनमें किशोरावस्था, माहवारी और पीसीओएस के समय के बदलाव शामिल हैं, इसमें भूमिका निभाते हैं",
        "दबाने या नोचने से निशान और दाग रह सकते हैं",
        "जो मुंहासे दर्द भरे, गहरे हों, निशान छोड़ें या आत्मविश्वास को प्रभावित करें, उन्हें डॉक्टर को दिखाना चाहिए",
      ],
    },
    pa: {
      about: "ਮੁਹਾਸੇ ਪਿੰਪਲ, ਬਲੈਕਹੈੱਡ ਅਤੇ ਕਈ ਵਾਰ ਡੂੰਘੀਆਂ, ਦਰਦ ਭਰੀਆਂ ਗੰਢਾਂ ਕਰਦੇ ਹਨ, ਜ਼ਿਆਦਾਤਰ ਚਿਹਰੇ, ਛਾਤੀ ਅਤੇ ਪਿੱਠ ’ਤੇ। ਇਹ ਕਿਸ਼ੋਰਾਂ ਵਿੱਚ ਬਹੁਤ ਆਮ ਹੈ ਅਤੇ ਬਾਲਗ ਜ਼ਿੰਦਗੀ ਵਿੱਚ ਵੀ ਜਾਰੀ ਰਹਿ ਸਕਦਾ ਹੈ।",
      points: [
        "ਇਹ ਉਦੋਂ ਹੁੰਦਾ ਹੈ ਜਦੋਂ ਤੇਲ ਗ੍ਰੰਥੀਆਂ ਅਤੇ ਵਾਲਾਂ ਦੇ ਛੇਕ ਬੰਦ ਹੋ ਜਾਂਦੇ ਹਨ ਅਤੇ ਕਈ ਵਾਰ ਸੁੱਜ ਜਾਂਦੇ ਹਨ",
        "ਹਾਰਮੋਨ ਵਿੱਚ ਬਦਲਾਅ, ਜਿਨ੍ਹਾਂ ਵਿੱਚ ਕਿਸ਼ੋਰ ਅਵਸਥਾ, ਮਾਹਵਾਰੀ ਅਤੇ ਪੀਸੀਓਐਸ ਵੇਲੇ ਦੇ ਬਦਲਾਅ ਸ਼ਾਮਲ ਹਨ, ਇਸ ਵਿੱਚ ਭੂਮਿਕਾ ਨਿਭਾਉਂਦੇ ਹਨ",
        "ਦਬਾਉਣ ਜਾਂ ਨੋਚਣ ਨਾਲ ਨਿਸ਼ਾਨ ਅਤੇ ਦਾਗ਼ ਰਹਿ ਸਕਦੇ ਹਨ",
        "ਜੋ ਮੁਹਾਸੇ ਦਰਦ ਭਰੇ, ਡੂੰਘੇ ਹੋਣ, ਨਿਸ਼ਾਨ ਛੱਡਣ ਜਾਂ ਆਤਮ-ਵਿਸ਼ਵਾਸ ਨੂੰ ਪ੍ਰਭਾਵਿਤ ਕਰਨ, ਉਨ੍ਹਾਂ ਨੂੰ ਡਾਕਟਰ ਨੂੰ ਦਿਖਾਉਣਾ ਚਾਹੀਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'hair-fall',
    kind: 'symptom',
    phrases: ['hair fall', 'hair loss', 'hairfall', 'falling hair', 'losing hair', 'thinning hair', 'baldness', 'hair thinning', 'baal jhadna', 'बाल झड़ना', 'ਵਾਲ ਝੜਨਾ'],
    en: {
      about: "Losing some hair every day is normal. Hair fall is a concern when it is much more than usual, comes in patches or leaves the scalp showing.",
      points: [
        "Stress, a recent illness, fever or major surgery, which can cause a temporary shedding months later",
        "Low iron, low protein or other shortages in food, and thyroid problems",
        "Hormonal changes, including after childbirth and with PCOS",
        "Inherited thinning, which is the commonest long-term cause",
        "Scalp infections and conditions that cause patchy loss need a doctor",
      ],
    },
    hi: {
      about: "रोज़ कुछ बाल झड़ना सामान्य है। बाल झड़ना तब चिंता की बात है जब यह सामान्य से बहुत ज़्यादा हो, धब्बों में आए या सिर की त्वचा दिखने लगे।",
      points: [
        "तनाव, हाल की बीमारी, बुखार या बड़ा ऑपरेशन, जो कुछ महीनों बाद अस्थायी झड़ना कर सकते हैं",
        "आयरन की कमी, प्रोटीन की कमी या खाने की दूसरी कमियां, और थायराइड की समस्याएं",
        "हार्मोन में बदलाव, जिनमें प्रसव के बाद और पीसीओएस शामिल हैं",
        "वंशानुगत पतलापन, जो सबसे आम लंबे समय का कारण है",
        "सिर की त्वचा के संक्रमण और धब्बों में बाल झड़ने की बीमारियों के लिए डॉक्टर चाहिए",
      ],
    },
    pa: {
      about: "ਰੋਜ਼ ਕੁਝ ਵਾਲ ਝੜਨਾ ਸਧਾਰਨ ਹੈ। ਵਾਲ ਝੜਨਾ ਉਦੋਂ ਚਿੰਤਾ ਦੀ ਗੱਲ ਹੈ ਜਦੋਂ ਇਹ ਆਮ ਨਾਲੋਂ ਬਹੁਤ ਜ਼ਿਆਦਾ ਹੋਵੇ, ਧੱਬਿਆਂ ਵਿੱਚ ਆਵੇ ਜਾਂ ਸਿਰ ਦੀ ਚਮੜੀ ਦਿਖਣ ਲੱਗੇ।",
      points: [
        "ਤਣਾਅ, ਹਾਲ ਦੀ ਬਿਮਾਰੀ, ਬੁਖ਼ਾਰ ਜਾਂ ਵੱਡਾ ਆਪ੍ਰੇਸ਼ਨ, ਜੋ ਕੁਝ ਮਹੀਨਿਆਂ ਬਾਅਦ ਅਸਥਾਈ ਝੜਨਾ ਕਰ ਸਕਦੇ ਹਨ",
        "ਆਇਰਨ ਦੀ ਕਮੀ, ਪ੍ਰੋਟੀਨ ਦੀ ਕਮੀ ਜਾਂ ਖਾਣੇ ਦੀਆਂ ਹੋਰ ਕਮੀਆਂ, ਅਤੇ ਥਾਇਰਾਇਡ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ",
        "ਹਾਰਮੋਨ ਵਿੱਚ ਬਦਲਾਅ, ਜਿਨ੍ਹਾਂ ਵਿੱਚ ਜਣੇਪੇ ਤੋਂ ਬਾਅਦ ਅਤੇ ਪੀਸੀਓਐਸ ਸ਼ਾਮਲ ਹਨ",
        "ਵਿਰਾਸਤੀ ਪਤਲਾਪਣ, ਜੋ ਸਭ ਤੋਂ ਆਮ ਲੰਮੇ ਸਮੇਂ ਦਾ ਕਾਰਨ ਹੈ",
        "ਸਿਰ ਦੀ ਚਮੜੀ ਦੀਆਂ ਲਾਗਾਂ ਅਤੇ ਧੱਬਿਆਂ ਵਿੱਚ ਵਾਲ ਝੜਨ ਦੀਆਂ ਬਿਮਾਰੀਆਂ ਲਈ ਡਾਕਟਰ ਚਾਹੀਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'dandruff',
    kind: 'condition',
    phrases: ['dandruff', 'flaky scalp', 'scalp flakes', 'itchy scalp', 'dry scalp', 'scalp problem', 'sikri', 'रूसी', 'ਸਿਕਰੀ'],
    en: {
      about: "Dandruff is flaking of the skin of the scalp, often with itching. It is common, harmless and not catching, though it can be annoying.",
      points: [
        "A natural yeast that lives on the scalp can irritate it in some people",
        "Oily or very dry scalp, and infrequent hair washing, can add to it",
        "It is often worse in cold, dry weather and with stress",
        "Heavy flaking, redness or sore patches may be another scalp condition and worth showing a doctor",
      ],
    },
    hi: {
      about: "रूसी सिर की त्वचा का झड़ना है, अक्सर खुजली के साथ। यह आम है, हानिरहित है और फैलती नहीं, हालांकि परेशान कर सकती है।",
      points: [
        "सिर पर रहने वाला एक प्राकृतिक यीस्ट कुछ लोगों में उसे परेशान कर सकता है",
        "तैलीय या बहुत सूखी सिर की त्वचा, और बाल कम धोना, इसे बढ़ा सकते हैं",
        "यह अक्सर ठंडे, सूखे मौसम और तनाव में बढ़ती है",
        "ज़्यादा परतें, लालिमा या दर्द भरे धब्बे सिर की त्वचा की कोई और बीमारी हो सकते हैं और डॉक्टर को दिखाने लायक हैं",
      ],
    },
    pa: {
      about: "ਸਿਕਰੀ ਸਿਰ ਦੀ ਚਮੜੀ ਦਾ ਝੜਨਾ ਹੈ, ਅਕਸਰ ਖੁਜਲੀ ਦੇ ਨਾਲ। ਇਹ ਆਮ ਹੈ, ਨੁਕਸਾਨ ਰਹਿਤ ਹੈ ਅਤੇ ਫੈਲਦੀ ਨਹੀਂ, ਹਾਲਾਂਕਿ ਪਰੇਸ਼ਾਨ ਕਰ ਸਕਦੀ ਹੈ।",
      points: [
        "ਸਿਰ ’ਤੇ ਰਹਿਣ ਵਾਲਾ ਇੱਕ ਕੁਦਰਤੀ ਖ਼ਮੀਰ ਕੁਝ ਲੋਕਾਂ ਵਿੱਚ ਉਸ ਨੂੰ ਪਰੇਸ਼ਾਨ ਕਰ ਸਕਦਾ ਹੈ",
        "ਤੇਲ ਵਾਲੀ ਜਾਂ ਬਹੁਤ ਸੁੱਕੀ ਸਿਰ ਦੀ ਚਮੜੀ, ਅਤੇ ਵਾਲ ਘੱਟ ਧੋਣਾ, ਇਸ ਨੂੰ ਵਧਾ ਸਕਦੇ ਹਨ",
        "ਇਹ ਅਕਸਰ ਠੰਢੇ, ਸੁੱਕੇ ਮੌਸਮ ਅਤੇ ਤਣਾਅ ਵਿੱਚ ਵਧਦੀ ਹੈ",
        "ਵੱਧ ਪਰਤਾਂ, ਲਾਲੀ ਜਾਂ ਦਰਦ ਭਰੇ ਧੱਬੇ ਸਿਰ ਦੀ ਚਮੜੀ ਦੀ ਕੋਈ ਹੋਰ ਬਿਮਾਰੀ ਹੋ ਸਕਦੇ ਹਨ ਅਤੇ ਡਾਕਟਰ ਨੂੰ ਦਿਖਾਉਣ ਲਾਇਕ ਹਨ",
      ],
    },
  },
  {
    id: 'fungal-infection',
    kind: 'condition',
    phrases: ['fungal infection', 'ringworm', 'fungus', 'skin fungus', 'fungal infection skin', 'tinea', 'athletes foot', 'daad', 'दाद', 'फंगल इन्फेक्शन', 'ਦਾਦ', 'ਫੰਗਲ ਇਨਫੈਕਸ਼ਨ'],
    en: {
      about: "A fungal infection of the skin, such as ringworm (tinea), is caused by a fungus that grows in warm, damp places. It usually shows as a red, itchy, ring-shaped patch with a clear centre.",
      points: [
        "Common places are the groin, the folds of the skin, between the toes and the scalp",
        "It spreads by touch, and through shared towels, clothes and combs",
        "Sweating, tight clothing and damp skin make it worse and let it come back",
        "A doctor can tell it from other rashes, and decide the right treatment",
      ],
    },
    hi: {
      about: "त्वचा का फंगल संक्रमण, जैसे दाद (टिनिया), एक फफूंद से होता है जो गर्म, नम जगहों पर बढ़ती है। यह आमतौर पर लाल, खुजली वाला, गोल छल्ले जैसा धब्बा होता है जिसका बीच का हिस्सा साफ़ होता है।",
      points: [
        "आम जगहें हैं जांघ का जोड़, त्वचा की तहें, पैर की उंगलियों के बीच और सिर की त्वचा",
        "यह छूने से, और साझा तौलिए, कपड़ों और कंघी से फैलता है",
        "पसीना, तंग कपड़े और नम त्वचा इसे बढ़ाते हैं और लौटने देते हैं",
        "डॉक्टर इसे दूसरे चकत्तों से अलग पहचान सकते हैं, और सही इलाज तय कर सकते हैं",
      ],
    },
    pa: {
      about: "ਚਮੜੀ ਦੀ ਫੰਗਲ ਲਾਗ, ਜਿਵੇਂ ਦਾਦ (ਟੀਨੀਆ), ਇੱਕ ਫੰਗਸ ਤੋਂ ਹੁੰਦੀ ਹੈ ਜੋ ਗਰਮ, ਨਮ ਥਾਵਾਂ ’ਤੇ ਵਧਦੀ ਹੈ। ਇਹ ਆਮ ਤੌਰ ’ਤੇ ਲਾਲ, ਖੁਜਲੀ ਵਾਲਾ, ਗੋਲ ਛੱਲੇ ਵਰਗਾ ਧੱਬਾ ਹੁੰਦਾ ਹੈ ਜਿਸ ਦਾ ਵਿਚਕਾਰਲਾ ਹਿੱਸਾ ਸਾਫ਼ ਹੁੰਦਾ ਹੈ।",
      points: [
        "ਆਮ ਥਾਵਾਂ ਹਨ ਪੱਟ ਦਾ ਜੋੜ, ਚਮੜੀ ਦੀਆਂ ਤਹਿਆਂ, ਪੈਰ ਦੀਆਂ ਉਂਗਲਾਂ ਵਿਚਕਾਰ ਅਤੇ ਸਿਰ ਦੀ ਚਮੜੀ",
        "ਇਹ ਛੂਹਣ ਨਾਲ, ਅਤੇ ਸਾਂਝੇ ਤੌਲੀਏ, ਕੱਪੜਿਆਂ ਅਤੇ ਕੰਘੀ ਨਾਲ ਫੈਲਦਾ ਹੈ",
        "ਪਸੀਨਾ, ਤੰਗ ਕੱਪੜੇ ਅਤੇ ਨਮ ਚਮੜੀ ਇਸ ਨੂੰ ਵਧਾਉਂਦੇ ਹਨ ਅਤੇ ਮੁੜਨ ਦਿੰਦੇ ਹਨ",
        "ਡਾਕਟਰ ਇਸ ਨੂੰ ਹੋਰ ਧੱਫੜਾਂ ਤੋਂ ਵੱਖ ਪਛਾਣ ਸਕਦੇ ਹਨ, ਅਤੇ ਸਹੀ ਇਲਾਜ ਤੈਅ ਕਰ ਸਕਦੇ ਹਨ",
      ],
    },
  },
  {
    id: 'wound-not-healing',
    kind: 'symptom',
    phrases: ['wound not healing', 'slow healing wound', 'non healing wound', 'wound healing', 'ulcer not healing', 'sore not healing', 'cut not healing', 'ghav nahi bhar raha', 'घाव नहीं भर रहा', 'ਜ਼ਖ਼ਮ ਨਹੀਂ ਭਰ ਰਿਹਾ'],
    en: {
      about: "A wound that has not started to heal in a couple of weeks, or keeps opening, is worth showing to a doctor. Healing needs good blood flow, clean skin and a body that is well enough to repair itself.",
      points: [
        "Diabetes, which slows healing and raises the risk of infection, especially in the feet",
        "Poor blood flow in the legs, or swollen leg veins",
        "Infection, with more pain, redness, warmth, swelling or pus",
        "Pressure on the same spot for long periods, as in people who cannot move much",
        "A wound that was not cleaned and closed properly, or that has something left in it",
      ],
    },
    hi: {
      about: "जो घाव दो हफ्ते में भरना शुरू न हो, या बार-बार खुलता रहे, उसे डॉक्टर को दिखाना चाहिए। भरने के लिए अच्छा खून का बहाव, साफ़ त्वचा और खुद की मरम्मत कर पाने लायक शरीर चाहिए।",
      points: [
        "डायबिटीज़, जो भरने को धीमा करती है और संक्रमण का खतरा बढ़ाती है, खासकर पैरों में",
        "पैरों में खून का कम बहाव, या पैरों की सूजी नसें",
        "संक्रमण, जिसमें ज़्यादा दर्द, लालिमा, गर्माहट, सूजन या मवाद होता है",
        "लंबे समय तक एक ही जगह पर दबाव, जैसे उन लोगों में जो ज़्यादा हिल-डुल नहीं सकते",
        "ऐसा घाव जिसे ठीक से साफ़ करके बंद नहीं किया गया, या जिसमें कुछ रह गया है",
      ],
    },
    pa: {
      about: "ਜੋ ਜ਼ਖ਼ਮ ਦੋ ਹਫ਼ਤਿਆਂ ਵਿੱਚ ਭਰਨਾ ਸ਼ੁਰੂ ਨਾ ਹੋਵੇ, ਜਾਂ ਵਾਰ-ਵਾਰ ਖੁੱਲ੍ਹਦਾ ਰਹੇ, ਉਸ ਨੂੰ ਡਾਕਟਰ ਨੂੰ ਦਿਖਾਉਣਾ ਚਾਹੀਦਾ ਹੈ। ਭਰਨ ਲਈ ਚੰਗਾ ਖੂਨ ਦਾ ਵਹਾਅ, ਸਾਫ਼ ਚਮੜੀ ਅਤੇ ਆਪਣੀ ਮੁਰੰਮਤ ਕਰ ਸਕਣ ਲਾਇਕ ਸਰੀਰ ਚਾਹੀਦਾ ਹੈ।",
      points: [
        "ਸ਼ੂਗਰ, ਜੋ ਭਰਨ ਨੂੰ ਹੌਲੀ ਕਰਦੀ ਹੈ ਅਤੇ ਲਾਗ ਦਾ ਖ਼ਤਰਾ ਵਧਾਉਂਦੀ ਹੈ, ਖ਼ਾਸ ਕਰਕੇ ਪੈਰਾਂ ਵਿੱਚ",
        "ਲੱਤਾਂ ਵਿੱਚ ਖੂਨ ਦਾ ਘੱਟ ਵਹਾਅ, ਜਾਂ ਲੱਤਾਂ ਦੀਆਂ ਸੁੱਜੀਆਂ ਨਾੜਾਂ",
        "ਲਾਗ, ਜਿਸ ਵਿੱਚ ਵੱਧ ਦਰਦ, ਲਾਲੀ, ਗਰਮਾਹਟ, ਸੋਜ ਜਾਂ ਪੀਕ ਹੁੰਦੀ ਹੈ",
        "ਲੰਮੇ ਸਮੇਂ ਤੱਕ ਇੱਕੋ ਥਾਂ ’ਤੇ ਦਬਾਅ, ਜਿਵੇਂ ਉਨ੍ਹਾਂ ਲੋਕਾਂ ਵਿੱਚ ਜੋ ਵੱਧ ਹਿੱਲ-ਡੁਲ ਨਹੀਂ ਸਕਦੇ",
        "ਅਜਿਹਾ ਜ਼ਖ਼ਮ ਜਿਸ ਨੂੰ ਠੀਕ ਤਰ੍ਹਾਂ ਸਾਫ਼ ਕਰਕੇ ਬੰਦ ਨਹੀਂ ਕੀਤਾ ਗਿਆ, ਜਾਂ ਜਿਸ ਵਿੱਚ ਕੁਝ ਰਹਿ ਗਿਆ ਹੈ",
      ],
    },
  },
]
