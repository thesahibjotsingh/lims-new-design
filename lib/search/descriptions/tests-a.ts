// lib/search/descriptions/tests-a.ts
//
// Overviews of common tests, scans and procedures. DRAFT: not yet reviewed by a LIMS doctor (see types.ts). Hindi and
// Punjabi are drafts of the English. They say what a test is and what it involves, never what a result means for a
// person. No medicine, dose, home remedy or cure appears in any of them.

import type { DescriptionEntry } from '@/lib/search/descriptions/types'

export const TESTS_A: DescriptionEntry[] = [
  {
    id: 'ultrasound',
    kind: 'test',
    phrases: ['ultrasound', 'ultrasonography', 'sonography', 'usg', 'ultra sound', 'abdomen ultrasound', 'ultrasound scan', 'sonography test', 'अल्ट्रासाउंड', 'ਅਲਟਰਾਸਾਊਂਡ'],
    en: {
      about: "An ultrasound scan uses sound waves to make a picture of the inside of the body. It does not use radiation, so it is considered safe, including in pregnancy.",
      points: [
        "A small probe with gel is moved over the skin, and the picture appears on a screen",
        "It is used to look at the belly (liver, gallbladder, kidneys, womb), the neck, the heart and unborn babies",
        "For some scans you may be asked to come with a full bladder or without eating beforehand",
        "It is painless and usually takes 15 to 30 minutes",
      ],
    },
    hi: {
      about: "अल्ट्रासाउंड स्कैन ध्वनि तरंगों से शरीर के अंदर की तस्वीर बनाता है। इसमें विकिरण नहीं होता, इसलिए इसे सुरक्षित माना जाता है, गर्भावस्था में भी।",
      points: [
        "त्वचा पर जेल के साथ एक छोटी प्रोब घुमाई जाती है, और तस्वीर स्क्रीन पर दिखती है",
        "इससे पेट (लिवर, पित्ताशय, गुर्दे, गर्भाशय), गर्दन, दिल और गर्भ में बच्चे को देखा जाता है",
        "कुछ स्कैन के लिए आपसे भरे मूत्राशय के साथ, या पहले कुछ खाए बिना आने को कहा जा सकता है",
        "यह दर्द रहित है और आमतौर पर 15 से 30 मिनट लगते हैं",
      ],
    },
    pa: {
      about: "ਅਲਟਰਾਸਾਊਂਡ ਸਕੈਨ ਧੁਨੀ ਤਰੰਗਾਂ ਨਾਲ ਸਰੀਰ ਦੇ ਅੰਦਰ ਦੀ ਤਸਵੀਰ ਬਣਾਉਂਦਾ ਹੈ। ਇਸ ਵਿੱਚ ਵਿਕਿਰਣ ਨਹੀਂ ਹੁੰਦਾ, ਇਸ ਲਈ ਇਸ ਨੂੰ ਸੁਰੱਖਿਅਤ ਮੰਨਿਆ ਜਾਂਦਾ ਹੈ, ਗਰਭ ਅਵਸਥਾ ਵਿੱਚ ਵੀ।",
      points: [
        "ਚਮੜੀ ’ਤੇ ਜੈੱਲ ਨਾਲ ਇੱਕ ਛੋਟੀ ਪ੍ਰੋਬ ਘੁੰਮਾਈ ਜਾਂਦੀ ਹੈ, ਅਤੇ ਤਸਵੀਰ ਸਕ੍ਰੀਨ ’ਤੇ ਦਿਖਦੀ ਹੈ",
        "ਇਸ ਨਾਲ ਪੇਟ (ਜਿਗਰ, ਪਿੱਤਾ, ਗੁਰਦੇ, ਬੱਚੇਦਾਨੀ), ਗਰਦਨ, ਦਿਲ ਅਤੇ ਗਰਭ ਵਿੱਚ ਬੱਚੇ ਨੂੰ ਦੇਖਿਆ ਜਾਂਦਾ ਹੈ",
        "ਕੁਝ ਸਕੈਨ ਲਈ ਤੁਹਾਨੂੰ ਭਰੇ ਮਸਾਨੇ ਨਾਲ, ਜਾਂ ਪਹਿਲਾਂ ਕੁਝ ਖਾਧੇ ਬਿਨਾਂ ਆਉਣ ਲਈ ਕਿਹਾ ਜਾ ਸਕਦਾ ਹੈ",
        "ਇਹ ਦਰਦ ਰਹਿਤ ਹੈ ਅਤੇ ਆਮ ਤੌਰ ’ਤੇ 15 ਤੋਂ 30 ਮਿੰਟ ਲੱਗਦੇ ਹਨ",
      ],
    },
  },
  {
    id: 'x-ray',
    kind: 'test',
    phrases: ['x ray', 'xray', 'x-ray', 'chest x ray', 'chest xray', 'bone x ray', 'digital x ray', 'एक्स-रे', 'ਐਕਸ-ਰੇ'],
    en: {
      about: "An X-ray uses a very small amount of radiation to make a picture of the bones and some other parts of the body, such as the chest.",
      points: [
        "It is quick, painless and usually takes a few minutes",
        "It is commonly used to look for broken bones, joint problems, and lung or chest conditions",
        "You may be asked to remove metal items such as jewellery from the area",
        "Pregnant women should tell the staff before an X-ray, so that the doctor can decide if it is needed",
      ],
    },
    hi: {
      about: "एक्स-रे बहुत कम मात्रा के विकिरण से हड्डियों और शरीर के कुछ दूसरे हिस्सों, जैसे छाती, की तस्वीर बनाता है।",
      points: [
        "यह तेज़, दर्द रहित है और आमतौर पर कुछ मिनट लगते हैं",
        "इसका आम इस्तेमाल टूटी हड्डियों, जोड़ों की समस्याओं और फेफड़ों या छाती की बीमारियों को देखने में होता है",
        "आपसे उस जगह से गहने जैसी धातु की चीज़ें हटाने को कहा जा सकता है",
        "गर्भवती महिलाओं को एक्स-रे से पहले स्टाफ़ को बताना चाहिए, ताकि डॉक्टर तय कर सकें कि यह ज़रूरी है या नहीं",
      ],
    },
    pa: {
      about: "ਐਕਸ-ਰੇ ਬਹੁਤ ਘੱਟ ਮਾਤਰਾ ਦੇ ਵਿਕਿਰਣ ਨਾਲ ਹੱਡੀਆਂ ਅਤੇ ਸਰੀਰ ਦੇ ਕੁਝ ਹੋਰ ਹਿੱਸਿਆਂ, ਜਿਵੇਂ ਛਾਤੀ, ਦੀ ਤਸਵੀਰ ਬਣਾਉਂਦਾ ਹੈ।",
      points: [
        "ਇਹ ਤੇਜ਼, ਦਰਦ ਰਹਿਤ ਹੈ ਅਤੇ ਆਮ ਤੌਰ ’ਤੇ ਕੁਝ ਮਿੰਟ ਲੱਗਦੇ ਹਨ",
        "ਇਸ ਦੀ ਆਮ ਵਰਤੋਂ ਟੁੱਟੀਆਂ ਹੱਡੀਆਂ, ਜੋੜਾਂ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ ਅਤੇ ਫੇਫੜਿਆਂ ਜਾਂ ਛਾਤੀ ਦੀਆਂ ਬਿਮਾਰੀਆਂ ਨੂੰ ਦੇਖਣ ਵਿੱਚ ਹੁੰਦੀ ਹੈ",
        "ਤੁਹਾਨੂੰ ਉਸ ਥਾਂ ਤੋਂ ਗਹਿਣੇ ਵਰਗੀਆਂ ਧਾਤ ਦੀਆਂ ਚੀਜ਼ਾਂ ਹਟਾਉਣ ਲਈ ਕਿਹਾ ਜਾ ਸਕਦਾ ਹੈ",
        "ਗਰਭਵਤੀ ਔਰਤਾਂ ਨੂੰ ਐਕਸ-ਰੇ ਤੋਂ ਪਹਿਲਾਂ ਸਟਾਫ਼ ਨੂੰ ਦੱਸਣਾ ਚਾਹੀਦਾ ਹੈ, ਤਾਂ ਜੋ ਡਾਕਟਰ ਤੈਅ ਕਰ ਸਕਣ ਕਿ ਇਹ ਜ਼ਰੂਰੀ ਹੈ ਜਾਂ ਨਹੀਂ",
      ],
    },
  },
  {
    id: 'ct-scan',
    kind: 'test',
    phrases: ['ct scan', 'ct', 'cat scan', 'computed tomography', 'ct head', 'ct chest', 'ct abdomen', 'सीटी स्कैन', 'ਸੀਟੀ ਸਕੈਨ'],
    en: {
      about: "A CT scan takes many X-ray pictures from different angles and joins them by computer into detailed slices of the inside of the body.",
      points: [
        "It shows bones, organs and blood vessels in more detail than a plain X-ray",
        "It is often used for the head after an injury, the chest, the belly and in emergencies",
        "A dye may be given through a vein for some scans, and the staff will ask about allergies and kidney problems first",
        "It uses more radiation than a plain X-ray, so it is done when the doctor judges it is needed",
      ],
    },
    hi: {
      about: "सीटी स्कैन अलग-अलग कोणों से कई एक्स-रे तस्वीरें लेता है और उन्हें कंप्यूटर से जोड़कर शरीर के अंदर के विस्तृत टुकड़े बनाता है।",
      points: [
        "यह हड्डियों, अंगों और खून की नलियों को साधारण एक्स-रे से ज़्यादा विस्तार में दिखाता है",
        "इसका अक्सर इस्तेमाल चोट के बाद सिर, छाती, पेट और आपातकाल में होता है",
        "कुछ स्कैन के लिए नस के ज़रिए रंग दिया जा सकता है, और स्टाफ़ पहले एलर्जी और गुर्दे की समस्याओं के बारे में पूछेगा",
        "इसमें साधारण एक्स-रे से ज़्यादा विकिरण होता है, इसलिए यह तब किया जाता है जब डॉक्टर इसे ज़रूरी समझें",
      ],
    },
    pa: {
      about: "ਸੀਟੀ ਸਕੈਨ ਵੱਖ-ਵੱਖ ਕੋਣਾਂ ਤੋਂ ਕਈ ਐਕਸ-ਰੇ ਤਸਵੀਰਾਂ ਲੈਂਦਾ ਹੈ ਅਤੇ ਉਨ੍ਹਾਂ ਨੂੰ ਕੰਪਿਊਟਰ ਨਾਲ ਜੋੜ ਕੇ ਸਰੀਰ ਦੇ ਅੰਦਰ ਦੇ ਵਿਸਤ੍ਰਿਤ ਟੁਕੜੇ ਬਣਾਉਂਦਾ ਹੈ।",
      points: [
        "ਇਹ ਹੱਡੀਆਂ, ਅੰਗਾਂ ਅਤੇ ਖੂਨ ਦੀਆਂ ਨਾੜੀਆਂ ਨੂੰ ਸਾਧਾਰਨ ਐਕਸ-ਰੇ ਨਾਲੋਂ ਵੱਧ ਵਿਸਤਾਰ ਵਿੱਚ ਦਿਖਾਉਂਦਾ ਹੈ",
        "ਇਸ ਦੀ ਅਕਸਰ ਵਰਤੋਂ ਸੱਟ ਤੋਂ ਬਾਅਦ ਸਿਰ, ਛਾਤੀ, ਪੇਟ ਅਤੇ ਐਮਰਜੈਂਸੀ ਵਿੱਚ ਹੁੰਦੀ ਹੈ",
        "ਕੁਝ ਸਕੈਨ ਲਈ ਨਾੜੀ ਰਾਹੀਂ ਰੰਗ ਦਿੱਤਾ ਜਾ ਸਕਦਾ ਹੈ, ਅਤੇ ਸਟਾਫ਼ ਪਹਿਲਾਂ ਐਲਰਜੀ ਅਤੇ ਗੁਰਦੇ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ ਬਾਰੇ ਪੁੱਛੇਗਾ",
        "ਇਸ ਵਿੱਚ ਸਾਧਾਰਨ ਐਕਸ-ਰੇ ਨਾਲੋਂ ਵੱਧ ਵਿਕਿਰਣ ਹੁੰਦਾ ਹੈ, ਇਸ ਲਈ ਇਹ ਉਦੋਂ ਕੀਤਾ ਜਾਂਦਾ ਹੈ ਜਦੋਂ ਡਾਕਟਰ ਇਸ ਨੂੰ ਜ਼ਰੂਰੀ ਸਮਝਣ",
      ],
    },
  },
  {
    id: 'mri-scan',
    kind: 'test',
    phrases: ['mri', 'mri scan', 'magnetic resonance imaging', 'mri brain', 'mri spine', 'mri knee', 'एमआरआई', 'ਐਮਆਰਆਈ'],
    en: {
      about: "An MRI scan uses a strong magnet and radio waves, not radiation, to make very detailed pictures of soft parts of the body such as the brain, spine, joints and muscles.",
      points: [
        "You lie on a table that slides into a tube, and the machine is noisy, so ear protection is given",
        "You need to stay still, and a scan can take 20 to 60 minutes",
        "Metal can be unsafe near the magnet, so tell the staff about a pacemaker, implants or metal in the body",
        "It is often used for the spine, joints, brain and nerves",
      ],
    },
    hi: {
      about: "एमआरआई स्कैन विकिरण नहीं, बल्कि एक मज़बूत चुंबक और रेडियो तरंगों से शरीर के नरम हिस्सों, जैसे दिमाग, रीढ़, जोड़ों और मांसपेशियों, की बहुत विस्तृत तस्वीरें बनाता है।",
      points: [
        "आप एक मेज़ पर लेटते हैं जो एक नली में जाती है, और मशीन शोर करती है, इसलिए कान की सुरक्षा दी जाती है",
        "आपको स्थिर रहना होता है, और स्कैन में 20 से 60 मिनट लग सकते हैं",
        "चुंबक के पास धातु असुरक्षित हो सकती है, इसलिए पेसमेकर, इम्प्लांट या शरीर में धातु के बारे में स्टाफ़ को बताएं",
        "इसका अक्सर इस्तेमाल रीढ़, जोड़ों, दिमाग और नसों के लिए होता है",
      ],
    },
    pa: {
      about: "ਐਮਆਰਆਈ ਸਕੈਨ ਵਿਕਿਰਣ ਨਹੀਂ, ਸਗੋਂ ਇੱਕ ਮਜ਼ਬੂਤ ਚੁੰਬਕ ਅਤੇ ਰੇਡੀਓ ਤਰੰਗਾਂ ਨਾਲ ਸਰੀਰ ਦੇ ਨਰਮ ਹਿੱਸਿਆਂ, ਜਿਵੇਂ ਦਿਮਾਗ, ਰੀੜ੍ਹ, ਜੋੜਾਂ ਅਤੇ ਮਾਸਪੇਸ਼ੀਆਂ, ਦੀਆਂ ਬਹੁਤ ਵਿਸਤ੍ਰਿਤ ਤਸਵੀਰਾਂ ਬਣਾਉਂਦਾ ਹੈ।",
      points: [
        "ਤੁਸੀਂ ਇੱਕ ਮੇਜ਼ ’ਤੇ ਲੇਟਦੇ ਹੋ ਜੋ ਇੱਕ ਨਲੀ ਵਿੱਚ ਜਾਂਦੀ ਹੈ, ਅਤੇ ਮਸ਼ੀਨ ਸ਼ੋਰ ਕਰਦੀ ਹੈ, ਇਸ ਲਈ ਕੰਨਾਂ ਦੀ ਸੁਰੱਖਿਆ ਦਿੱਤੀ ਜਾਂਦੀ ਹੈ",
        "ਤੁਹਾਨੂੰ ਸਥਿਰ ਰਹਿਣਾ ਹੁੰਦਾ ਹੈ, ਅਤੇ ਸਕੈਨ ਵਿੱਚ 20 ਤੋਂ 60 ਮਿੰਟ ਲੱਗ ਸਕਦੇ ਹਨ",
        "ਚੁੰਬਕ ਦੇ ਨੇੜੇ ਧਾਤ ਅਸੁਰੱਖਿਅਤ ਹੋ ਸਕਦੀ ਹੈ, ਇਸ ਲਈ ਪੇਸਮੇਕਰ, ਇੰਪਲਾਂਟ ਜਾਂ ਸਰੀਰ ਵਿੱਚ ਧਾਤ ਬਾਰੇ ਸਟਾਫ਼ ਨੂੰ ਦੱਸੋ",
        "ਇਸ ਦੀ ਅਕਸਰ ਵਰਤੋਂ ਰੀੜ੍ਹ, ਜੋੜਾਂ, ਦਿਮਾਗ ਅਤੇ ਨਾੜੀਆਂ ਲਈ ਹੁੰਦੀ ਹੈ",
      ],
    },
  },
  {
    id: 'colour-doppler',
    kind: 'test',
    phrases: ['colour doppler', 'color doppler', 'doppler', 'doppler scan', 'doppler ultrasound', 'doppler test', 'कलर डॉप्लर', 'ਕਲਰ ਡੌਪਲਰ'],
    en: {
      about: "A colour Doppler is an ultrasound that also shows the flow of blood through vessels. It is a way to see how well blood is moving.",
      points: [
        "It is used for the veins and arteries of the legs and arms, the neck and the belly",
        "In pregnancy it can check blood flow to the baby",
        "It is painless, uses no radiation and is done like a normal ultrasound",
        "The doctor who asked for it explains what the result means",
      ],
    },
    hi: {
      about: "कलर डॉप्लर एक अल्ट्रासाउंड है जो नलियों में खून का बहाव भी दिखाता है। यह देखने का तरीका है कि खून कितनी अच्छी तरह बह रहा है।",
      points: [
        "इसका इस्तेमाल पैरों और हाथों, गर्दन और पेट की नसों और धमनियों के लिए होता है",
        "गर्भावस्था में यह बच्चे तक खून के बहाव की जांच कर सकता है",
        "यह दर्द रहित है, इसमें विकिरण नहीं होता और यह सामान्य अल्ट्रासाउंड की तरह किया जाता है",
        "जिस डॉक्टर ने यह कराया है, वे बताते हैं कि नतीजे का क्या मतलब है",
      ],
    },
    pa: {
      about: "ਕਲਰ ਡੌਪਲਰ ਇੱਕ ਅਲਟਰਾਸਾਊਂਡ ਹੈ ਜੋ ਨਾੜੀਆਂ ਵਿੱਚ ਖੂਨ ਦਾ ਵਹਾਅ ਵੀ ਦਿਖਾਉਂਦਾ ਹੈ। ਇਹ ਦੇਖਣ ਦਾ ਤਰੀਕਾ ਹੈ ਕਿ ਖੂਨ ਕਿੰਨੀ ਚੰਗੀ ਤਰ੍ਹਾਂ ਵਹਿ ਰਿਹਾ ਹੈ।",
      points: [
        "ਇਸ ਦੀ ਵਰਤੋਂ ਲੱਤਾਂ ਅਤੇ ਬਾਹਾਂ, ਗਰਦਨ ਅਤੇ ਪੇਟ ਦੀਆਂ ਨਾੜਾਂ ਅਤੇ ਧਮਣੀਆਂ ਲਈ ਹੁੰਦੀ ਹੈ",
        "ਗਰਭ ਅਵਸਥਾ ਵਿੱਚ ਇਹ ਬੱਚੇ ਤੱਕ ਖੂਨ ਦੇ ਵਹਾਅ ਦੀ ਜਾਂਚ ਕਰ ਸਕਦਾ ਹੈ",
        "ਇਹ ਦਰਦ ਰਹਿਤ ਹੈ, ਇਸ ਵਿੱਚ ਵਿਕਿਰਣ ਨਹੀਂ ਹੁੰਦਾ ਅਤੇ ਇਹ ਸਧਾਰਨ ਅਲਟਰਾਸਾਊਂਡ ਵਾਂਗ ਕੀਤਾ ਜਾਂਦਾ ਹੈ",
        "ਜਿਸ ਡਾਕਟਰ ਨੇ ਇਹ ਕਰਵਾਇਆ ਹੈ, ਉਹ ਦੱਸਦੇ ਹਨ ਕਿ ਨਤੀਜੇ ਦਾ ਕੀ ਮਤਲਬ ਹੈ",
      ],
    },
  },
  {
    id: 'ecg',
    kind: 'test',
    phrases: ['ecg', 'ekg', 'electrocardiogram', 'heart tracing', 'ecg test', 'ईसीजी', 'ਈਸੀਜੀ'],
    en: {
      about: "An ECG (electrocardiogram) records the electrical activity of the heart. It is a quick, painless test.",
      points: [
        "Small sticky patches are put on the chest, arms and legs and connected to the machine by wires",
        "It takes only a few minutes, and you need to lie still",
        "It can show the heart rhythm and some signs of heart strain",
        "A normal ECG does not rule out every heart problem, so the doctor looks at it with the story and examination",
      ],
    },
    hi: {
      about: "ईसीजी (इलेक्ट्रोकार्डियोग्राम) दिल की बिजली की गतिविधि दर्ज करता है। यह एक तेज़, दर्द रहित जांच है।",
      points: [
        "छाती, हाथों और पैरों पर छोटे चिपकने वाले पैच लगाकर तारों से मशीन से जोड़े जाते हैं",
        "इसमें सिर्फ़ कुछ मिनट लगते हैं, और आपको स्थिर लेटना होता है",
        "यह दिल की लय और दिल पर ज़ोर के कुछ संकेत दिखा सकता है",
        "सामान्य ईसीजी हर दिल की समस्या को खारिज नहीं करता, इसलिए डॉक्टर इसे इतिहास और जांच के साथ देखते हैं",
      ],
    },
    pa: {
      about: "ਈਸੀਜੀ (ਇਲੈਕਟ੍ਰੋਕਾਰਡੀਓਗ੍ਰਾਮ) ਦਿਲ ਦੀ ਬਿਜਲੀ ਦੀ ਗਤੀਵਿਧੀ ਦਰਜ ਕਰਦਾ ਹੈ। ਇਹ ਇੱਕ ਤੇਜ਼, ਦਰਦ ਰਹਿਤ ਜਾਂਚ ਹੈ।",
      points: [
        "ਛਾਤੀ, ਬਾਹਾਂ ਅਤੇ ਲੱਤਾਂ ’ਤੇ ਛੋਟੇ ਚਿਪਕਣ ਵਾਲੇ ਪੈਚ ਲਾ ਕੇ ਤਾਰਾਂ ਨਾਲ ਮਸ਼ੀਨ ਨਾਲ ਜੋੜੇ ਜਾਂਦੇ ਹਨ",
        "ਇਸ ਵਿੱਚ ਸਿਰਫ਼ ਕੁਝ ਮਿੰਟ ਲੱਗਦੇ ਹਨ, ਅਤੇ ਤੁਹਾਨੂੰ ਸਥਿਰ ਲੇਟਣਾ ਹੁੰਦਾ ਹੈ",
        "ਇਹ ਦਿਲ ਦੀ ਲੈਅ ਅਤੇ ਦਿਲ ’ਤੇ ਜ਼ੋਰ ਦੇ ਕੁਝ ਸੰਕੇਤ ਦਿਖਾ ਸਕਦਾ ਹੈ",
        "ਸਧਾਰਨ ਈਸੀਜੀ ਹਰ ਦਿਲ ਦੀ ਸਮੱਸਿਆ ਨੂੰ ਖ਼ਾਰਜ ਨਹੀਂ ਕਰਦਾ, ਇਸ ਲਈ ਡਾਕਟਰ ਇਸ ਨੂੰ ਇਤਿਹਾਸ ਅਤੇ ਜਾਂਚ ਨਾਲ ਦੇਖਦੇ ਹਨ",
      ],
    },
  },
  {
    id: 'echocardiogram',
    kind: 'test',
    phrases: ['echo', 'echocardiogram', '2d echo', 'echo test', 'heart echo', 'echocardiography', 'ecocardiogram', 'ईको', 'ਈਕੋ'],
    en: {
      about: "An echocardiogram, or echo, is an ultrasound of the heart. It shows the heart's size, how well it pumps and how the valves work.",
      points: [
        "A probe with gel is moved over the chest while you lie on your side",
        "It is painless, uses no radiation and takes about 20 to 30 minutes",
        "It can show the pumping strength of the heart and problems with the valves",
        "It is asked for by a doctor, who explains the result",
      ],
    },
    hi: {
      about: "इकोकार्डियोग्राम, या इको, दिल का अल्ट्रासाउंड है। यह दिल का आकार, उसके पंप करने की क्षमता और वाल्व के काम करने का तरीका दिखाता है।",
      points: [
        "आपके करवट लेटने पर छाती पर जेल के साथ एक प्रोब घुमाई जाती है",
        "यह दर्द रहित है, इसमें विकिरण नहीं होता और लगभग 20 से 30 मिनट लगते हैं",
        "यह दिल की पंप करने की ताकत और वाल्व की समस्याएं दिखा सकता है",
        "इसे डॉक्टर कहते हैं, जो नतीजा समझाते हैं",
      ],
    },
    pa: {
      about: "ਈਕੋਕਾਰਡੀਓਗ੍ਰਾਮ, ਜਾਂ ਈਕੋ, ਦਿਲ ਦਾ ਅਲਟਰਾਸਾਊਂਡ ਹੈ। ਇਹ ਦਿਲ ਦਾ ਆਕਾਰ, ਉਸ ਦੇ ਪੰਪ ਕਰਨ ਦੀ ਸਮਰੱਥਾ ਅਤੇ ਵਾਲਵ ਦੇ ਕੰਮ ਕਰਨ ਦਾ ਤਰੀਕਾ ਦਿਖਾਉਂਦਾ ਹੈ।",
      points: [
        "ਤੁਹਾਡੇ ਕਰਵਟ ਲੇਟਣ ’ਤੇ ਛਾਤੀ ’ਤੇ ਜੈੱਲ ਨਾਲ ਇੱਕ ਪ੍ਰੋਬ ਘੁੰਮਾਈ ਜਾਂਦੀ ਹੈ",
        "ਇਹ ਦਰਦ ਰਹਿਤ ਹੈ, ਇਸ ਵਿੱਚ ਵਿਕਿਰਣ ਨਹੀਂ ਹੁੰਦਾ ਅਤੇ ਲਗਭਗ 20 ਤੋਂ 30 ਮਿੰਟ ਲੱਗਦੇ ਹਨ",
        "ਇਹ ਦਿਲ ਦੀ ਪੰਪ ਕਰਨ ਦੀ ਤਾਕਤ ਅਤੇ ਵਾਲਵ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ ਦਿਖਾ ਸਕਦਾ ਹੈ",
        "ਇਸ ਨੂੰ ਡਾਕਟਰ ਕਹਿੰਦੇ ਹਨ, ਜੋ ਨਤੀਜਾ ਸਮਝਾਉਂਦੇ ਹਨ",
      ],
    },
  },
  {
    id: 'tmt',
    kind: 'test',
    phrases: ['tmt', 'treadmill test', 'stress test', 'tmt test', 'treadmill stress test', 'exercise stress test', 'टीएमटी', 'ਟੀਐਮਟੀ'],
    en: {
      about: "A TMT (treadmill test), also called a stress test, records the heart with an ECG while you walk on a treadmill that gradually gets faster and steeper.",
      points: [
        "It shows how the heart behaves when it has to work harder",
        "The staff watch you, the ECG and your blood pressure throughout, and stop the test if there is any problem",
        "Wear comfortable clothes and shoes, and ask the doctor whether to eat beforehand",
        "It takes about half an hour, and a doctor explains the result",
      ],
    },
    hi: {
      about: "टीएमटी (ट्रेडमिल टेस्ट), जिसे स्ट्रेस टेस्ट भी कहते हैं, आपके ट्रेडमिल पर चलने के दौरान ईसीजी से दिल को दर्ज करता है, जो धीरे-धीरे तेज़ और ढलानदार होता जाता है।",
      points: [
        "यह दिखाता है कि जब दिल को ज़्यादा काम करना पड़ता है तो वह कैसा व्यवहार करता है",
        "स्टाफ़ पूरे समय आपको, ईसीजी और आपके ब्लड प्रेशर को देखता है, और कोई समस्या होने पर जांच रोक देता है",
        "आरामदायक कपड़े और जूते पहनें, और डॉक्टर से पूछें कि पहले खाना है या नहीं",
        "इसमें लगभग आधा घंटा लगता है, और डॉक्टर नतीजा समझाते हैं",
      ],
    },
    pa: {
      about: "ਟੀਐਮਟੀ (ਟ੍ਰੈਡਮਿਲ ਟੈਸਟ), ਜਿਸ ਨੂੰ ਸਟ੍ਰੈੱਸ ਟੈਸਟ ਵੀ ਕਹਿੰਦੇ ਹਨ, ਤੁਹਾਡੇ ਟ੍ਰੈਡਮਿਲ ’ਤੇ ਚੱਲਣ ਦੌਰਾਨ ਈਸੀਜੀ ਨਾਲ ਦਿਲ ਨੂੰ ਦਰਜ ਕਰਦਾ ਹੈ, ਜੋ ਹੌਲੀ-ਹੌਲੀ ਤੇਜ਼ ਅਤੇ ਢਲਾਨਦਾਰ ਹੁੰਦਾ ਜਾਂਦਾ ਹੈ।",
      points: [
        "ਇਹ ਦਿਖਾਉਂਦਾ ਹੈ ਕਿ ਜਦੋਂ ਦਿਲ ਨੂੰ ਵੱਧ ਕੰਮ ਕਰਨਾ ਪੈਂਦਾ ਹੈ ਤਾਂ ਉਹ ਕਿਵੇਂ ਵਿਹਾਰ ਕਰਦਾ ਹੈ",
        "ਸਟਾਫ਼ ਪੂਰੇ ਸਮੇਂ ਤੁਹਾਨੂੰ, ਈਸੀਜੀ ਅਤੇ ਤੁਹਾਡੇ ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ ਨੂੰ ਦੇਖਦਾ ਹੈ, ਅਤੇ ਕੋਈ ਸਮੱਸਿਆ ਹੋਣ ’ਤੇ ਜਾਂਚ ਰੋਕ ਦਿੰਦਾ ਹੈ",
        "ਆਰਾਮਦਾਇਕ ਕੱਪੜੇ ਅਤੇ ਜੁੱਤੇ ਪਾਓ, ਅਤੇ ਡਾਕਟਰ ਤੋਂ ਪੁੱਛੋ ਕਿ ਪਹਿਲਾਂ ਖਾਣਾ ਹੈ ਜਾਂ ਨਹੀਂ",
        "ਇਸ ਵਿੱਚ ਲਗਭਗ ਅੱਧਾ ਘੰਟਾ ਲੱਗਦਾ ਹੈ, ਅਤੇ ਡਾਕਟਰ ਨਤੀਜਾ ਸਮਝਾਉਂਦੇ ਹਨ",
      ],
    },
  },
  {
    id: 'endoscopy',
    kind: 'test',
    phrases: ['endoscopy', 'upper gi endoscopy', 'gastroscopy', 'upper endoscopy', 'endoscopy test', 'gi endoscopy', 'endoscpy', 'एंडोस्कोपी', 'ਐਂਡੋਸਕੋਪੀ'],
    en: {
      about: "An endoscopy is a test in which a thin, flexible tube with a tiny camera is passed through the mouth to look at the food pipe, the stomach and the first part of the small intestine.",
      points: [
        "It is used to look for the cause of stomach pain, acidity, vomiting, black stool or trouble swallowing",
        "You are usually asked not to eat or drink for several hours beforehand",
        "The throat is numbed or you are given sedation, so it is not painful, and it takes about 10 to 20 minutes",
        "A small piece of tissue (biopsy) can be taken during the test if needed",
      ],
    },
    hi: {
      about: "एंडोस्कोपी एक जांच है जिसमें मुंह के रास्ते एक पतली, लचीली नली, जिसमें छोटा कैमरा होता है, डाली जाती है, ताकि खाने की नली, पेट और छोटी आंत के पहले हिस्से को देखा जा सके।",
      points: [
        "इसका इस्तेमाल पेट दर्द, एसिडिटी, उल्टी, काले मल या निगलने में दिक्कत का कारण ढूंढने के लिए होता है",
        "आमतौर पर पहले कई घंटे कुछ खाने-पीने से मना किया जाता है",
        "गला सुन्न किया जाता है या बेहोशी दी जाती है, इसलिए दर्द नहीं होता, और इसमें लगभग 10 से 20 मिनट लगते हैं",
        "ज़रूरत पड़ने पर जांच के दौरान ऊतक का एक छोटा टुकड़ा (बायोप्सी) लिया जा सकता है",
      ],
    },
    pa: {
      about: "ਐਂਡੋਸਕੋਪੀ ਇੱਕ ਜਾਂਚ ਹੈ ਜਿਸ ਵਿੱਚ ਮੂੰਹ ਦੇ ਰਸਤੇ ਇੱਕ ਪਤਲੀ, ਲਚਕਦਾਰ ਨਲੀ, ਜਿਸ ਵਿੱਚ ਛੋਟਾ ਕੈਮਰਾ ਹੁੰਦਾ ਹੈ, ਪਾਈ ਜਾਂਦੀ ਹੈ, ਤਾਂ ਜੋ ਖਾਣੇ ਦੀ ਨਲੀ, ਪੇਟ ਅਤੇ ਛੋਟੀ ਆਂਦਰ ਦੇ ਪਹਿਲੇ ਹਿੱਸੇ ਨੂੰ ਦੇਖਿਆ ਜਾ ਸਕੇ।",
      points: [
        "ਇਸ ਦੀ ਵਰਤੋਂ ਪੇਟ ਦਰਦ, ਐਸਿਡਿਟੀ, ਉਲਟੀ, ਕਾਲੇ ਮਲ ਜਾਂ ਨਿਗਲਣ ਵਿੱਚ ਦਿੱਕਤ ਦਾ ਕਾਰਨ ਲੱਭਣ ਲਈ ਹੁੰਦੀ ਹੈ",
        "ਆਮ ਤੌਰ ’ਤੇ ਪਹਿਲਾਂ ਕਈ ਘੰਟੇ ਕੁਝ ਖਾਣ-ਪੀਣ ਤੋਂ ਮਨ੍ਹਾ ਕੀਤਾ ਜਾਂਦਾ ਹੈ",
        "ਗਲਾ ਸੁੰਨ ਕੀਤਾ ਜਾਂਦਾ ਹੈ ਜਾਂ ਬੇਹੋਸ਼ੀ ਦਿੱਤੀ ਜਾਂਦੀ ਹੈ, ਇਸ ਲਈ ਦਰਦ ਨਹੀਂ ਹੁੰਦਾ, ਅਤੇ ਇਸ ਵਿੱਚ ਲਗਭਗ 10 ਤੋਂ 20 ਮਿੰਟ ਲੱਗਦੇ ਹਨ",
        "ਲੋੜ ਪੈਣ ’ਤੇ ਜਾਂਚ ਦੌਰਾਨ ਟਿਸ਼ੂ ਦਾ ਇੱਕ ਛੋਟਾ ਟੁਕੜਾ (ਬਾਇਓਪਸੀ) ਲਿਆ ਜਾ ਸਕਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'colonoscopy',
    kind: 'test',
    phrases: ['colonoscopy', 'colonoscopy test', 'lower gi endoscopy', 'colonoscope', 'colonoscopi', 'कोलोनोस्कोपी', 'ਕੋਲੋਨੋਸਕੋਪੀ'],
    en: {
      about: "A colonoscopy is a test in which a thin, flexible tube with a camera is passed through the back passage to look at the large bowel (colon).",
      points: [
        "It is used to look for the cause of bleeding from the back passage, long-lasting diarrhoea or constipation, or belly pain",
        "The bowel must be emptied beforehand, and the staff give clear instructions for this",
        "Sedation is usually given, and the test takes about 20 to 45 minutes",
        "Small growths (polyps) can be removed, or tissue taken, during the test",
      ],
    },
    hi: {
      about: "कोलोनोस्कोपी एक जांच है जिसमें गुदा के रास्ते एक पतली, लचीली नली, जिसमें कैमरा होता है, डाली जाती है, ताकि बड़ी आंत (कोलन) को देखा जा सके।",
      points: [
        "इसका इस्तेमाल गुदा से खून आने, लंबे समय के दस्त या कब्ज़, या पेट दर्द का कारण ढूंढने के लिए होता है",
        "पहले आंत को खाली करना होता है, और स्टाफ़ इसके लिए साफ़ निर्देश देता है",
        "आमतौर पर बेहोशी दी जाती है, और जांच में लगभग 20 से 45 मिनट लगते हैं",
        "जांच के दौरान छोटी गांठें (पॉलिप) निकाली जा सकती हैं, या ऊतक लिया जा सकता है",
      ],
    },
    pa: {
      about: "ਕੋਲੋਨੋਸਕੋਪੀ ਇੱਕ ਜਾਂਚ ਹੈ ਜਿਸ ਵਿੱਚ ਗੁਦਾ ਦੇ ਰਸਤੇ ਇੱਕ ਪਤਲੀ, ਲਚਕਦਾਰ ਨਲੀ, ਜਿਸ ਵਿੱਚ ਕੈਮਰਾ ਹੁੰਦਾ ਹੈ, ਪਾਈ ਜਾਂਦੀ ਹੈ, ਤਾਂ ਜੋ ਵੱਡੀ ਆਂਦਰ (ਕੋਲਨ) ਨੂੰ ਦੇਖਿਆ ਜਾ ਸਕੇ।",
      points: [
        "ਇਸ ਦੀ ਵਰਤੋਂ ਗੁਦਾ ਤੋਂ ਖੂਨ ਆਉਣ, ਲੰਮੇ ਸਮੇਂ ਦੇ ਦਸਤ ਜਾਂ ਕਬਜ਼, ਜਾਂ ਪੇਟ ਦਰਦ ਦਾ ਕਾਰਨ ਲੱਭਣ ਲਈ ਹੁੰਦੀ ਹੈ",
        "ਪਹਿਲਾਂ ਆਂਦਰ ਨੂੰ ਖਾਲੀ ਕਰਨਾ ਹੁੰਦਾ ਹੈ, ਅਤੇ ਸਟਾਫ਼ ਇਸ ਲਈ ਸਾਫ਼ ਨਿਰਦੇਸ਼ ਦਿੰਦਾ ਹੈ",
        "ਆਮ ਤੌਰ ’ਤੇ ਬੇਹੋਸ਼ੀ ਦਿੱਤੀ ਜਾਂਦੀ ਹੈ, ਅਤੇ ਜਾਂਚ ਵਿੱਚ ਲਗਭਗ 20 ਤੋਂ 45 ਮਿੰਟ ਲੱਗਦੇ ਹਨ",
        "ਜਾਂਚ ਦੌਰਾਨ ਛੋਟੀਆਂ ਗੰਢਾਂ (ਪੌਲਿਪ) ਕੱਢੀਆਂ ਜਾ ਸਕਦੀਆਂ ਹਨ, ਜਾਂ ਟਿਸ਼ੂ ਲਿਆ ਜਾ ਸਕਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'laparoscopy',
    kind: 'test',
    phrases: ['laparoscopy', 'laparoscopic surgery', 'keyhole surgery', 'laproscopy', 'laproscopic', 'laparoscopic', 'minimally invasive surgery', 'doorbeen se operation', 'दूरबीन से ऑपरेशन', 'ਦੂਰਬੀਨ ਨਾਲ ਆਪ੍ਰੇਸ਼ਨ'],
    en: {
      about: "Laparoscopic, or keyhole, surgery is an operation done through a few small cuts, using a thin camera and fine instruments, instead of one large cut.",
      points: [
        "It is used for operations such as removing the gallbladder or the appendix, hernia repair and some operations of the womb",
        "Small cuts usually mean less pain, smaller scars and a shorter stay in hospital",
        "It is done under general anaesthesia",
        "Not every operation or person is suitable, and sometimes the surgeon has to change to an open operation",
      ],
    },
    hi: {
      about: "लैप्रोस्कोपिक, यानी दूरबीन से ऑपरेशन, एक बड़े चीरे की जगह कुछ छोटे चीरों से, पतले कैमरे और बारीक औज़ारों से किया जाने वाला ऑपरेशन है।",
      points: [
        "इसका इस्तेमाल पित्ताशय या अपेंडिक्स निकालने, हर्निया की मरम्मत और गर्भाशय के कुछ ऑपरेशनों में होता है",
        "छोटे चीरों का मतलब आमतौर पर कम दर्द, छोटे निशान और अस्पताल में कम रुकना होता है",
        "यह जनरल एनेस्थीसिया में किया जाता है",
        "हर ऑपरेशन या हर व्यक्ति के लिए यह उपयुक्त नहीं होता, और कभी-कभी सर्जन को खुले ऑपरेशन पर जाना पड़ता है",
      ],
    },
    pa: {
      about: "ਲੈਪਰੋਸਕੋਪਿਕ, ਯਾਨੀ ਦੂਰਬੀਨ ਨਾਲ ਆਪ੍ਰੇਸ਼ਨ, ਇੱਕ ਵੱਡੇ ਚੀਰੇ ਦੀ ਥਾਂ ਕੁਝ ਛੋਟੇ ਚੀਰਿਆਂ ਨਾਲ, ਪਤਲੇ ਕੈਮਰੇ ਅਤੇ ਬਾਰੀਕ ਔਜ਼ਾਰਾਂ ਨਾਲ ਕੀਤਾ ਜਾਣ ਵਾਲਾ ਆਪ੍ਰੇਸ਼ਨ ਹੈ।",
      points: [
        "ਇਸ ਦੀ ਵਰਤੋਂ ਪਿੱਤਾ ਜਾਂ ਅਪੈਂਡਿਕਸ ਕੱਢਣ, ਹਰਨੀਆ ਦੀ ਮੁਰੰਮਤ ਅਤੇ ਬੱਚੇਦਾਨੀ ਦੇ ਕੁਝ ਆਪ੍ਰੇਸ਼ਨਾਂ ਵਿੱਚ ਹੁੰਦੀ ਹੈ",
        "ਛੋਟੇ ਚੀਰਿਆਂ ਦਾ ਮਤਲਬ ਆਮ ਤੌਰ ’ਤੇ ਘੱਟ ਦਰਦ, ਛੋਟੇ ਨਿਸ਼ਾਨ ਅਤੇ ਹਸਪਤਾਲ ਵਿੱਚ ਘੱਟ ਰੁਕਣਾ ਹੁੰਦਾ ਹੈ",
        "ਇਹ ਜਨਰਲ ਐਨੇਸਥੀਸੀਆ ਵਿੱਚ ਕੀਤਾ ਜਾਂਦਾ ਹੈ",
        "ਹਰ ਆਪ੍ਰੇਸ਼ਨ ਜਾਂ ਹਰ ਵਿਅਕਤੀ ਲਈ ਇਹ ਢੁਕਵਾਂ ਨਹੀਂ ਹੁੰਦਾ, ਅਤੇ ਕਈ ਵਾਰ ਸਰਜਨ ਨੂੰ ਖੁੱਲ੍ਹੇ ਆਪ੍ਰੇਸ਼ਨ ਵੱਲ ਜਾਣਾ ਪੈਂਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'blood-test',
    kind: 'test',
    phrases: ['blood test', 'blood tests', 'cbc', 'complete blood count', 'blood count', 'blood report', 'full blood count', 'blood examination', 'blood investigation', 'khoon ki jaanch', 'खून की जांच', 'ਖੂਨ ਦੀ ਜਾਂਚ'],
    en: {
      about: "A blood test checks a sample of blood, taken with a small needle from a vein in the arm. A complete blood count (CBC) is one of the commonest, and counts the different kinds of blood cells.",
      points: [
        "It can show anaemia, infection, and conditions that affect the blood cells",
        "Other blood tests measure sugar, cholesterol, thyroid hormones and how the liver and kidneys are working",
        "For some tests you are asked not to eat for several hours beforehand",
        "The doctor who asked for the test explains what the numbers mean for you",
      ],
    },
    hi: {
      about: "खून की जांच में बांह की नस से एक छोटी सुई से लिए गए खून के नमूने की जांच होती है। कम्प्लीट ब्लड काउंट (सीबीसी) सबसे आम जांचों में से एक है, जो खून की अलग-अलग कोशिकाएं गिनती है।",
      points: [
        "यह खून की कमी, संक्रमण और खून की कोशिकाओं को प्रभावित करने वाली बीमारियां दिखा सकती है",
        "दूसरी खून की जांचें शुगर, कोलेस्ट्रॉल, थायराइड हार्मोन और लिवर व गुर्दों के काम को नापती हैं",
        "कुछ जांचों के लिए आपसे पहले कई घंटे कुछ न खाने को कहा जाता है",
        "जिस डॉक्टर ने जांच कराई है, वे बताते हैं कि संख्याओं का आपके लिए क्या मतलब है",
      ],
    },
    pa: {
      about: "ਖੂਨ ਦੀ ਜਾਂਚ ਵਿੱਚ ਬਾਂਹ ਦੀ ਨਾੜੀ ਤੋਂ ਇੱਕ ਛੋਟੀ ਸੂਈ ਨਾਲ ਲਏ ਖੂਨ ਦੇ ਨਮੂਨੇ ਦੀ ਜਾਂਚ ਹੁੰਦੀ ਹੈ। ਕੰਪਲੀਟ ਬਲੱਡ ਕਾਊਂਟ (ਸੀਬੀਸੀ) ਸਭ ਤੋਂ ਆਮ ਜਾਂਚਾਂ ਵਿੱਚੋਂ ਇੱਕ ਹੈ, ਜੋ ਖੂਨ ਦੀਆਂ ਵੱਖ-ਵੱਖ ਕੋਸ਼ਿਕਾਵਾਂ ਗਿਣਦੀ ਹੈ।",
      points: [
        "ਇਹ ਖੂਨ ਦੀ ਕਮੀ, ਲਾਗ ਅਤੇ ਖੂਨ ਦੀਆਂ ਕੋਸ਼ਿਕਾਵਾਂ ਨੂੰ ਪ੍ਰਭਾਵਿਤ ਕਰਨ ਵਾਲੀਆਂ ਬਿਮਾਰੀਆਂ ਦਿਖਾ ਸਕਦੀ ਹੈ",
        "ਹੋਰ ਖੂਨ ਦੀਆਂ ਜਾਂਚਾਂ ਸ਼ੂਗਰ, ਕੋਲੈਸਟ੍ਰੋਲ, ਥਾਇਰਾਇਡ ਹਾਰਮੋਨ ਅਤੇ ਜਿਗਰ ਤੇ ਗੁਰਦਿਆਂ ਦੇ ਕੰਮ ਨੂੰ ਮਾਪਦੀਆਂ ਹਨ",
        "ਕੁਝ ਜਾਂਚਾਂ ਲਈ ਤੁਹਾਨੂੰ ਪਹਿਲਾਂ ਕਈ ਘੰਟੇ ਕੁਝ ਨਾ ਖਾਣ ਲਈ ਕਿਹਾ ਜਾਂਦਾ ਹੈ",
        "ਜਿਸ ਡਾਕਟਰ ਨੇ ਜਾਂਚ ਕਰਵਾਈ ਹੈ, ਉਹ ਦੱਸਦੇ ਹਨ ਕਿ ਅੰਕੜਿਆਂ ਦਾ ਤੁਹਾਡੇ ਲਈ ਕੀ ਮਤਲਬ ਹੈ",
      ],
    },
  },
  {
    id: 'hba1c',
    kind: 'test',
    phrases: ['hba1c', 'hb a1c', 'glycated haemoglobin', 'glycosylated haemoglobin', 'a1c test', 'average sugar test', 'three month sugar test', 'एचबीए1सी', 'ਐਚਬੀਏ1ਸੀ'],
    en: {
      about: "HbA1c is a blood test that shows the average blood sugar over the last two to three months. It is used to diagnose diabetes and to see how well it is controlled.",
      points: [
        "It does not need fasting, and can be done at any time of day",
        "It is taken like any other blood sample, from a vein in the arm",
        "People with diabetes often have it checked every three to six months",
        "The doctor explains what the result means for you and your target",
      ],
    },
    hi: {
      about: "एचबीए1सी खून की एक जांच है जो पिछले दो से तीन महीनों में खून में शुगर का औसत दिखाती है। इसका इस्तेमाल डायबिटीज़ पहचानने और यह देखने में होता है कि वह कितनी काबू में है।",
      points: [
        "इसके लिए खाली पेट रहने की ज़रूरत नहीं है, और यह दिन में किसी भी समय हो सकती है",
        "यह किसी भी दूसरे खून के नमूने की तरह, बांह की नस से लिया जाता है",
        "डायबिटीज़ वाले लोग अक्सर इसे हर तीन से छह महीने में करवाते हैं",
        "डॉक्टर बताते हैं कि नतीजे का आपके लिए और आपके लक्ष्य के लिए क्या मतलब है",
      ],
    },
    pa: {
      about: "ਐਚਬੀਏ1ਸੀ ਖੂਨ ਦੀ ਇੱਕ ਜਾਂਚ ਹੈ ਜੋ ਪਿਛਲੇ ਦੋ ਤੋਂ ਤਿੰਨ ਮਹੀਨਿਆਂ ਵਿੱਚ ਖੂਨ ਵਿੱਚ ਸ਼ੂਗਰ ਦਾ ਔਸਤ ਦਿਖਾਉਂਦੀ ਹੈ। ਇਸ ਦੀ ਵਰਤੋਂ ਸ਼ੂਗਰ ਪਛਾਣਨ ਅਤੇ ਇਹ ਦੇਖਣ ਵਿੱਚ ਹੁੰਦੀ ਹੈ ਕਿ ਉਹ ਕਿੰਨੀ ਕਾਬੂ ਵਿੱਚ ਹੈ।",
      points: [
        "ਇਸ ਲਈ ਖਾਲੀ ਪੇਟ ਰਹਿਣ ਦੀ ਲੋੜ ਨਹੀਂ ਹੈ, ਅਤੇ ਇਹ ਦਿਨ ਵਿੱਚ ਕਿਸੇ ਵੀ ਸਮੇਂ ਹੋ ਸਕਦੀ ਹੈ",
        "ਇਹ ਕਿਸੇ ਵੀ ਹੋਰ ਖੂਨ ਦੇ ਨਮੂਨੇ ਵਾਂਗ, ਬਾਂਹ ਦੀ ਨਾੜੀ ਤੋਂ ਲਿਆ ਜਾਂਦਾ ਹੈ",
        "ਸ਼ੂਗਰ ਵਾਲੇ ਲੋਕ ਅਕਸਰ ਇਸ ਨੂੰ ਹਰ ਤਿੰਨ ਤੋਂ ਛੇ ਮਹੀਨਿਆਂ ਵਿੱਚ ਕਰਵਾਉਂਦੇ ਹਨ",
        "ਡਾਕਟਰ ਦੱਸਦੇ ਹਨ ਕਿ ਨਤੀਜੇ ਦਾ ਤੁਹਾਡੇ ਲਈ ਅਤੇ ਤੁਹਾਡੇ ਟੀਚੇ ਲਈ ਕੀ ਮਤਲਬ ਹੈ",
      ],
    },
  },
  {
    id: 'thyroid-test',
    kind: 'test',
    phrases: ['thyroid test', 'thyroid profile', 'tsh', 'tsh test', 'thyroid function test', 'tft', 'thyroid blood test', 'थायराइड टेस्ट', 'ਥਾਇਰਾਇਡ ਟੈਸਟ'],
    en: {
      about: "A thyroid test is a blood test that shows how the thyroid gland is working. The main one is TSH, often with the thyroid hormones T3 and T4.",
      points: [
        "It is used when there are signs of an underactive or overactive thyroid, or a swelling in the neck",
        "It is taken from a vein in the arm like other blood tests",
        "Your doctor tells you whether you need to take it at a particular time of day",
        "The doctor who asked for it explains the result",
      ],
    },
    hi: {
      about: "थायराइड टेस्ट खून की एक जांच है जो दिखाती है कि थायराइड ग्रंथि कैसे काम कर रही है। मुख्य जांच टीएसएच है, जो अक्सर थायराइड हार्मोन टी3 और टी4 के साथ की जाती है।",
      points: [
        "इसका इस्तेमाल तब होता है जब थायराइड के कम या ज़्यादा सक्रिय होने के संकेत हों, या गर्दन में सूजन हो",
        "यह दूसरी खून की जांचों की तरह बांह की नस से लिया जाता है",
        "आपके डॉक्टर बताते हैं कि क्या इसे दिन के किसी खास समय पर करवाना है",
        "जिस डॉक्टर ने यह कराया है, वे नतीजा समझाते हैं",
      ],
    },
    pa: {
      about: "ਥਾਇਰਾਇਡ ਟੈਸਟ ਖੂਨ ਦੀ ਇੱਕ ਜਾਂਚ ਹੈ ਜੋ ਦਿਖਾਉਂਦੀ ਹੈ ਕਿ ਥਾਇਰਾਇਡ ਗ੍ਰੰਥੀ ਕਿਵੇਂ ਕੰਮ ਕਰ ਰਹੀ ਹੈ। ਮੁੱਖ ਜਾਂਚ ਟੀਐਸਐਚ ਹੈ, ਜੋ ਅਕਸਰ ਥਾਇਰਾਇਡ ਹਾਰਮੋਨ ਟੀ3 ਅਤੇ ਟੀ4 ਨਾਲ ਕੀਤੀ ਜਾਂਦੀ ਹੈ।",
      points: [
        "ਇਸ ਦੀ ਵਰਤੋਂ ਉਦੋਂ ਹੁੰਦੀ ਹੈ ਜਦੋਂ ਥਾਇਰਾਇਡ ਦੇ ਘੱਟ ਜਾਂ ਵੱਧ ਸਰਗਰਮ ਹੋਣ ਦੇ ਸੰਕੇਤ ਹੋਣ, ਜਾਂ ਗਰਦਨ ਵਿੱਚ ਸੋਜ ਹੋਵੇ",
        "ਇਹ ਹੋਰ ਖੂਨ ਦੀਆਂ ਜਾਂਚਾਂ ਵਾਂਗ ਬਾਂਹ ਦੀ ਨਾੜੀ ਤੋਂ ਲਿਆ ਜਾਂਦਾ ਹੈ",
        "ਤੁਹਾਡੇ ਡਾਕਟਰ ਦੱਸਦੇ ਹਨ ਕਿ ਕੀ ਇਸ ਨੂੰ ਦਿਨ ਦੇ ਕਿਸੇ ਖ਼ਾਸ ਸਮੇਂ ’ਤੇ ਕਰਵਾਉਣਾ ਹੈ",
        "ਜਿਸ ਡਾਕਟਰ ਨੇ ਇਹ ਕਰਵਾਇਆ ਹੈ, ਉਹ ਨਤੀਜਾ ਸਮਝਾਉਂਦੇ ਹਨ",
      ],
    },
  },
  {
    id: 'lipid-profile',
    kind: 'test',
    phrases: ['lipid profile', 'cholesterol test', 'lipid test', 'lipid panel', 'cholesterol blood test', 'लिपिड प्रोफाइल', 'ਲਿਪਿਡ ਪ੍ਰੋਫਾਈਲ'],
    en: {
      about: "A lipid profile is a blood test that measures the fats in the blood: total cholesterol, LDL (the \"bad\" kind), HDL (the \"good\" kind) and triglycerides.",
      points: [
        "It helps to judge the risk of heart disease and stroke",
        "You are often asked not to eat for nine to twelve hours beforehand, and the staff tell you",
        "It is taken from a vein in the arm like other blood tests",
        "The doctor reads the numbers together with your age, blood pressure, sugar and family history",
      ],
    },
    hi: {
      about: "लिपिड प्रोफाइल खून की एक जांच है जो खून में वसा को नापती है: कुल कोलेस्ट्रॉल, एलडीएल (\"खराब\" प्रकार), एचडीएल (\"अच्छा\" प्रकार) और ट्राइग्लिसराइड।",
      points: [
        "यह दिल की बीमारी और स्ट्रोक के खतरे का अंदाज़ा लगाने में मदद करती है",
        "अक्सर आपसे पहले नौ से बारह घंटे कुछ न खाने को कहा जाता है, और स्टाफ़ आपको बताता है",
        "यह दूसरी खून की जांचों की तरह बांह की नस से लिया जाता है",
        "डॉक्टर संख्याओं को आपकी उम्र, ब्लड प्रेशर, शुगर और परिवार के इतिहास के साथ पढ़ते हैं",
      ],
    },
    pa: {
      about: "ਲਿਪਿਡ ਪ੍ਰੋਫਾਈਲ ਖੂਨ ਦੀ ਇੱਕ ਜਾਂਚ ਹੈ ਜੋ ਖੂਨ ਵਿੱਚ ਚਰਬੀ ਨੂੰ ਮਾਪਦੀ ਹੈ: ਕੁੱਲ ਕੋਲੈਸਟ੍ਰੋਲ, ਐਲਡੀਐਲ (\"ਮਾੜੀ\" ਕਿਸਮ), ਐਚਡੀਐਲ (\"ਚੰਗੀ\" ਕਿਸਮ) ਅਤੇ ਟ੍ਰਾਈਗਲਿਸਰਾਈਡ।",
      points: [
        "ਇਹ ਦਿਲ ਦੀ ਬਿਮਾਰੀ ਅਤੇ ਸਟ੍ਰੋਕ ਦੇ ਖ਼ਤਰੇ ਦਾ ਅੰਦਾਜ਼ਾ ਲਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰਦੀ ਹੈ",
        "ਅਕਸਰ ਤੁਹਾਨੂੰ ਪਹਿਲਾਂ ਨੌਂ ਤੋਂ ਬਾਰਾਂ ਘੰਟੇ ਕੁਝ ਨਾ ਖਾਣ ਲਈ ਕਿਹਾ ਜਾਂਦਾ ਹੈ, ਅਤੇ ਸਟਾਫ਼ ਤੁਹਾਨੂੰ ਦੱਸਦਾ ਹੈ",
        "ਇਹ ਹੋਰ ਖੂਨ ਦੀਆਂ ਜਾਂਚਾਂ ਵਾਂਗ ਬਾਂਹ ਦੀ ਨਾੜੀ ਤੋਂ ਲਿਆ ਜਾਂਦਾ ਹੈ",
        "ਡਾਕਟਰ ਅੰਕੜਿਆਂ ਨੂੰ ਤੁਹਾਡੀ ਉਮਰ, ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ, ਸ਼ੂਗਰ ਅਤੇ ਪਰਿਵਾਰ ਦੇ ਇਤਿਹਾਸ ਨਾਲ ਪੜ੍ਹਦੇ ਹਨ",
      ],
    },
  },
  {
    id: 'liver-kidney-tests',
    kind: 'test',
    phrases: ['lft', 'liver function test', 'liver function tests', 'kft', 'kidney function test', 'kidney function tests', 'rft', 'renal function test', 'creatinine test', 'liver test', 'kidney test', 'लीवर फंक्शन टेस्ट', 'किडनी फंक्शन टेस्ट', 'ਲਿਵਰ ਫੰਕਸ਼ਨ ਟੈਸਟ', 'ਕਿਡਨੀ ਫੰਕਸ਼ਨ ਟੈਸਟ'],
    en: {
      about: "Liver function tests (LFT) and kidney function tests (KFT) are blood tests that show how well these organs are working.",
      points: [
        "LFT measures substances such as bilirubin and enzymes that the liver releases and makes",
        "KFT measures creatinine and urea, which build up in the blood when the kidneys are not clearing them well",
        "They are taken from a vein in the arm, and sometimes need an empty stomach",
        "The doctor reads the results with your symptoms and examination",
      ],
    },
    hi: {
      about: "लिवर फंक्शन टेस्ट (एलएफटी) और किडनी फंक्शन टेस्ट (केएफटी) खून की जांचें हैं जो दिखाती हैं कि ये अंग कितना अच्छा काम कर रहे हैं।",
      points: [
        "एलएफटी बिलीरुबिन और लिवर द्वारा छोड़े और बनाए जाने वाले एंज़ाइम जैसे पदार्थ नापता है",
        "केएफटी क्रिएटिनिन और यूरिया नापता है, जो गुर्दे के ठीक से साफ़ न करने पर खून में जमा होते हैं",
        "ये बांह की नस से लिए जाते हैं, और कभी-कभी खाली पेट की ज़रूरत होती है",
        "डॉक्टर नतीजों को आपके लक्षणों और जांच के साथ पढ़ते हैं",
      ],
    },
    pa: {
      about: "ਲਿਵਰ ਫੰਕਸ਼ਨ ਟੈਸਟ (ਐਲਐਫਟੀ) ਅਤੇ ਕਿਡਨੀ ਫੰਕਸ਼ਨ ਟੈਸਟ (ਕੇਐਫਟੀ) ਖੂਨ ਦੀਆਂ ਜਾਂਚਾਂ ਹਨ ਜੋ ਦਿਖਾਉਂਦੀਆਂ ਹਨ ਕਿ ਇਹ ਅੰਗ ਕਿੰਨਾ ਚੰਗਾ ਕੰਮ ਕਰ ਰਹੇ ਹਨ।",
      points: [
        "ਐਲਐਫਟੀ ਬਿਲੀਰੂਬਿਨ ਅਤੇ ਜਿਗਰ ਦੁਆਰਾ ਛੱਡੇ ਅਤੇ ਬਣਾਏ ਜਾਣ ਵਾਲੇ ਐਂਜ਼ਾਈਮ ਵਰਗੇ ਪਦਾਰਥ ਮਾਪਦਾ ਹੈ",
        "ਕੇਐਫਟੀ ਕ੍ਰਿਏਟਿਨਿਨ ਅਤੇ ਯੂਰੀਆ ਮਾਪਦਾ ਹੈ, ਜੋ ਗੁਰਦਿਆਂ ਦੇ ਠੀਕ ਤਰ੍ਹਾਂ ਸਾਫ਼ ਨਾ ਕਰਨ ’ਤੇ ਖੂਨ ਵਿੱਚ ਜਮ੍ਹਾ ਹੁੰਦੇ ਹਨ",
        "ਇਹ ਬਾਂਹ ਦੀ ਨਾੜੀ ਤੋਂ ਲਏ ਜਾਂਦੇ ਹਨ, ਅਤੇ ਕਈ ਵਾਰ ਖਾਲੀ ਪੇਟ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ",
        "ਡਾਕਟਰ ਨਤੀਜਿਆਂ ਨੂੰ ਤੁਹਾਡੇ ਲੱਛਣਾਂ ਅਤੇ ਜਾਂਚ ਨਾਲ ਪੜ੍ਹਦੇ ਹਨ",
      ],
    },
  },
  {
    id: 'urine-test',
    kind: 'test',
    phrases: ['urine test', 'urine examination', 'urine routine', 'urine routine test', 'urine culture', 'urine analysis', 'urinalysis', 'urine sample', 'urine report', 'peshab ki jaanch', 'पेशाब की जांच', 'ਪਿਸ਼ਾਬ ਦੀ ਜਾਂਚ'],
    en: {
      about: "A urine test checks a sample of urine for signs of infection, sugar, protein, blood and other changes. A urine culture also grows any germs to find which one is causing an infection.",
      points: [
        "You pass urine into a clean container, usually from the middle of the stream",
        "A morning sample is often asked for, and the staff tell you how to collect it cleanly",
        "A culture takes a day or two, because the germs need time to grow",
        "The doctor who asked for the test explains the result",
      ],
    },
    hi: {
      about: "पेशाब की जांच में पेशाब के नमूने में संक्रमण, शुगर, प्रोटीन, खून और दूसरे बदलावों के संकेत देखे जाते हैं। यूरिन कल्चर में कीटाणुओं को उगाकर भी देखा जाता है कि संक्रमण कौन-सा कीटाणु कर रहा है।",
      points: [
        "आप साफ़ डिब्बे में पेशाब करते हैं, आमतौर पर धार के बीच का हिस्सा",
        "अक्सर सुबह का नमूना मांगा जाता है, और स्टाफ़ बताता है कि उसे साफ़-सुथरे तरीके से कैसे लें",
        "कल्चर में एक-दो दिन लगते हैं, क्योंकि कीटाणुओं को बढ़ने का समय चाहिए",
        "जिस डॉक्टर ने जांच कराई है, वे नतीजा समझाते हैं",
      ],
    },
    pa: {
      about: "ਪਿਸ਼ਾਬ ਦੀ ਜਾਂਚ ਵਿੱਚ ਪਿਸ਼ਾਬ ਦੇ ਨਮੂਨੇ ਵਿੱਚ ਲਾਗ, ਸ਼ੂਗਰ, ਪ੍ਰੋਟੀਨ, ਖੂਨ ਅਤੇ ਹੋਰ ਬਦਲਾਵਾਂ ਦੇ ਸੰਕੇਤ ਦੇਖੇ ਜਾਂਦੇ ਹਨ। ਯੂਰਿਨ ਕਲਚਰ ਵਿੱਚ ਕੀਟਾਣੂਆਂ ਨੂੰ ਉਗਾ ਕੇ ਵੀ ਦੇਖਿਆ ਜਾਂਦਾ ਹੈ ਕਿ ਲਾਗ ਕਿਹੜਾ ਕੀਟਾਣੂ ਕਰ ਰਿਹਾ ਹੈ।",
      points: [
        "ਤੁਸੀਂ ਸਾਫ਼ ਡੱਬੇ ਵਿੱਚ ਪਿਸ਼ਾਬ ਕਰਦੇ ਹੋ, ਆਮ ਤੌਰ ’ਤੇ ਧਾਰ ਦਾ ਵਿਚਕਾਰਲਾ ਹਿੱਸਾ",
        "ਅਕਸਰ ਸਵੇਰ ਦਾ ਨਮੂਨਾ ਮੰਗਿਆ ਜਾਂਦਾ ਹੈ, ਅਤੇ ਸਟਾਫ਼ ਦੱਸਦਾ ਹੈ ਕਿ ਉਸ ਨੂੰ ਸਾਫ਼-ਸੁਥਰੇ ਤਰੀਕੇ ਨਾਲ ਕਿਵੇਂ ਲੈਣਾ ਹੈ",
        "ਕਲਚਰ ਵਿੱਚ ਇੱਕ-ਦੋ ਦਿਨ ਲੱਗਦੇ ਹਨ, ਕਿਉਂਕਿ ਕੀਟਾਣੂਆਂ ਨੂੰ ਵਧਣ ਦਾ ਸਮਾਂ ਚਾਹੀਦਾ ਹੈ",
        "ਜਿਸ ਡਾਕਟਰ ਨੇ ਜਾਂਚ ਕਰਵਾਈ ਹੈ, ਉਹ ਨਤੀਜਾ ਸਮਝਾਉਂਦੇ ਹਨ",
      ],
    },
  },
  {
    id: 'knee-replacement',
    kind: 'test',
    phrases: ['knee replacement', 'knee replacement surgery', 'total knee replacement', 'tkr', 'knee joint replacement', 'artificial knee', 'knee operation', 'घुटना बदलना', 'ਗੋਡਾ ਬਦਲਣਾ'],
    en: {
      about: "Knee replacement is an operation in which the worn parts of the knee joint are replaced with an artificial joint made of metal and plastic.",
      points: [
        "It is considered when arthritis has damaged the knee so much that pain and stiffness limit daily life, and other care no longer helps enough",
        "It is done under anaesthesia, and may replace the whole knee or only the worn part",
        "Walking is started within a day or two, and physiotherapy is an important part of recovery",
        "Most people have much less pain and move better afterwards, and the new joint lasts many years",
      ],
    },
    hi: {
      about: "घुटना बदलना एक ऑपरेशन है जिसमें घुटने के जोड़ के घिसे हुए हिस्सों की जगह धातु और प्लास्टिक से बना कृत्रिम जोड़ लगाया जाता है।",
      points: [
        "इस पर तब विचार किया जाता है जब गठिया ने घुटने को इतना नुकसान पहुंचाया हो कि दर्द और जकड़न रोज़मर्रा की ज़िंदगी सीमित कर दें, और दूसरी देखभाल काफ़ी न रहे",
        "यह एनेस्थीसिया में किया जाता है, और पूरा घुटना या सिर्फ़ घिसा हुआ हिस्सा बदला जा सकता है",
        "एक-दो दिन में चलना शुरू करा दिया जाता है, और फ़िज़ियोथेरेपी रिकवरी का अहम हिस्सा है",
        "ज़्यादातर लोगों को बाद में बहुत कम दर्द होता है और वे बेहतर हिल-डुल पाते हैं, और नया जोड़ कई साल चलता है",
      ],
    },
    pa: {
      about: "ਗੋਡਾ ਬਦਲਣਾ ਇੱਕ ਆਪ੍ਰੇਸ਼ਨ ਹੈ ਜਿਸ ਵਿੱਚ ਗੋਡੇ ਦੇ ਜੋੜ ਦੇ ਘਸੇ ਹੋਏ ਹਿੱਸਿਆਂ ਦੀ ਥਾਂ ਧਾਤ ਅਤੇ ਪਲਾਸਟਿਕ ਦਾ ਬਣਿਆ ਨਕਲੀ ਜੋੜ ਲਗਾਇਆ ਜਾਂਦਾ ਹੈ।",
      points: [
        "ਇਸ ’ਤੇ ਉਦੋਂ ਵਿਚਾਰ ਕੀਤਾ ਜਾਂਦਾ ਹੈ ਜਦੋਂ ਗਠੀਏ ਨੇ ਗੋਡੇ ਨੂੰ ਇੰਨਾ ਨੁਕਸਾਨ ਪਹੁੰਚਾਇਆ ਹੋਵੇ ਕਿ ਦਰਦ ਅਤੇ ਜਕੜਨ ਰੋਜ਼ਾਨਾ ਜ਼ਿੰਦਗੀ ਸੀਮਤ ਕਰ ਦੇਣ, ਅਤੇ ਹੋਰ ਦੇਖਭਾਲ ਕਾਫ਼ੀ ਨਾ ਰਹੇ",
        "ਇਹ ਐਨੇਸਥੀਸੀਆ ਵਿੱਚ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਅਤੇ ਪੂਰਾ ਗੋਡਾ ਜਾਂ ਸਿਰਫ਼ ਘਸਿਆ ਹੋਇਆ ਹਿੱਸਾ ਬਦਲਿਆ ਜਾ ਸਕਦਾ ਹੈ",
        "ਇੱਕ-ਦੋ ਦਿਨਾਂ ਵਿੱਚ ਚੱਲਣਾ ਸ਼ੁਰੂ ਕਰਵਾ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ, ਅਤੇ ਫਿਜ਼ੀਓਥੈਰੇਪੀ ਰਿਕਵਰੀ ਦਾ ਅਹਿਮ ਹਿੱਸਾ ਹੈ",
        "ਜ਼ਿਆਦਾਤਰ ਲੋਕਾਂ ਨੂੰ ਬਾਅਦ ਵਿੱਚ ਬਹੁਤ ਘੱਟ ਦਰਦ ਹੁੰਦਾ ਹੈ ਅਤੇ ਉਹ ਬਿਹਤਰ ਹਿੱਲ-ਡੁਲ ਪਾਉਂਦੇ ਹਨ, ਅਤੇ ਨਵਾਂ ਜੋੜ ਕਈ ਸਾਲ ਚੱਲਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'hip-replacement',
    kind: 'test',
    phrases: ['hip replacement', 'hip replacement surgery', 'total hip replacement', 'thr', 'hip joint replacement', 'artificial hip', 'hip operation', 'कूल्हा बदलना', 'ਕੁੱਲ੍ਹਾ ਬਦਲਣਾ'],
    en: {
      about: "Hip replacement is an operation in which a damaged hip joint is replaced with an artificial one. It can be done for the whole joint or for part of it.",
      points: [
        "It is done for severe arthritis, or after a fracture of the top of the thigh bone",
        "It is done under anaesthesia, and most people start walking with support within a day or two",
        "Physiotherapy helps strength and movement to return",
        "After it, most people have much less pain and can do more, and the new joint lasts many years",
      ],
    },
    hi: {
      about: "कूल्हा बदलना एक ऑपरेशन है जिसमें क्षतिग्रस्त कूल्हे के जोड़ की जगह कृत्रिम जोड़ लगाया जाता है। यह पूरे जोड़ के लिए या उसके एक हिस्से के लिए किया जा सकता है।",
      points: [
        "यह गंभीर गठिया में, या जांघ की हड्डी के ऊपरी हिस्से के फ्रैक्चर के बाद किया जाता है",
        "यह एनेस्थीसिया में किया जाता है, और ज़्यादातर लोग एक-दो दिन में सहारे से चलना शुरू कर देते हैं",
        "फ़िज़ियोथेरेपी ताकत और हिलने-डुलने को लौटाने में मदद करती है",
        "इसके बाद ज़्यादातर लोगों को बहुत कम दर्द होता है और वे ज़्यादा काम कर पाते हैं, और नया जोड़ कई साल चलता है",
      ],
    },
    pa: {
      about: "ਕੁੱਲ੍ਹਾ ਬਦਲਣਾ ਇੱਕ ਆਪ੍ਰੇਸ਼ਨ ਹੈ ਜਿਸ ਵਿੱਚ ਨੁਕਸਾਨੇ ਕੁੱਲ੍ਹੇ ਦੇ ਜੋੜ ਦੀ ਥਾਂ ਨਕਲੀ ਜੋੜ ਲਗਾਇਆ ਜਾਂਦਾ ਹੈ। ਇਹ ਪੂਰੇ ਜੋੜ ਲਈ ਜਾਂ ਉਸ ਦੇ ਇੱਕ ਹਿੱਸੇ ਲਈ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ।",
      points: [
        "ਇਹ ਗੰਭੀਰ ਗਠੀਏ ਵਿੱਚ, ਜਾਂ ਪੱਟ ਦੀ ਹੱਡੀ ਦੇ ਉੱਪਰਲੇ ਹਿੱਸੇ ਦੇ ਫ੍ਰੈਕਚਰ ਤੋਂ ਬਾਅਦ ਕੀਤਾ ਜਾਂਦਾ ਹੈ",
        "ਇਹ ਐਨੇਸਥੀਸੀਆ ਵਿੱਚ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਅਤੇ ਜ਼ਿਆਦਾਤਰ ਲੋਕ ਇੱਕ-ਦੋ ਦਿਨਾਂ ਵਿੱਚ ਸਹਾਰੇ ਨਾਲ ਚੱਲਣਾ ਸ਼ੁਰੂ ਕਰ ਦਿੰਦੇ ਹਨ",
        "ਫਿਜ਼ੀਓਥੈਰੇਪੀ ਤਾਕਤ ਅਤੇ ਹਿੱਲਣ-ਜੁਲਣ ਨੂੰ ਵਾਪਸ ਲਿਆਉਣ ਵਿੱਚ ਮਦਦ ਕਰਦੀ ਹੈ",
        "ਇਸ ਤੋਂ ਬਾਅਦ ਜ਼ਿਆਦਾਤਰ ਲੋਕਾਂ ਨੂੰ ਬਹੁਤ ਘੱਟ ਦਰਦ ਹੁੰਦਾ ਹੈ ਅਤੇ ਉਹ ਵੱਧ ਕੰਮ ਕਰ ਪਾਉਂਦੇ ਹਨ, ਅਤੇ ਨਵਾਂ ਜੋੜ ਕਈ ਸਾਲ ਚੱਲਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'root-canal',
    kind: 'test',
    phrases: ['root canal', 'root canal treatment', 'rct', 'root canal therapy', 'tooth root treatment', 'रूट कैनाल', 'ਰੂਟ ਕੈਨਾਲ'],
    en: {
      about: "A root canal treatment is a dental procedure that cleans out an infected or badly damaged nerve from inside a tooth, so that the tooth can be kept instead of removed.",
      points: [
        "It is needed when decay or an injury has reached the nerve and caused pain or infection",
        "The area is numbed, so it should not hurt, and it may take one or more visits",
        "After cleaning, the inside of the tooth is filled, and the tooth is usually covered with a crown to protect it",
        "A treated tooth can last many years with good care",
      ],
    },
    hi: {
      about: "रूट कैनाल ट्रीटमेंट दांत की एक प्रक्रिया है जिसमें दांत के अंदर से संक्रमित या बुरी तरह क्षतिग्रस्त नस साफ़ की जाती है, ताकि दांत को निकालने की जगह बचाए रखा जा सके।",
      points: [
        "यह तब ज़रूरी होता है जब सड़न या चोट नस तक पहुंच गई हो और दर्द या संक्रमण कर रही हो",
        "वह जगह सुन्न की जाती है, इसलिए दर्द नहीं होना चाहिए, और इसमें एक या ज़्यादा बार जाना पड़ सकता है",
        "सफ़ाई के बाद दांत के अंदर भराई की जाती है, और दांत को आमतौर पर बचाने के लिए क्राउन से ढका जाता है",
        "इलाज किया हुआ दांत अच्छी देखभाल से कई साल चल सकता है",
      ],
    },
    pa: {
      about: "ਰੂਟ ਕੈਨਾਲ ਟ੍ਰੀਟਮੈਂਟ ਦੰਦ ਦੀ ਇੱਕ ਪ੍ਰਕਿਰਿਆ ਹੈ ਜਿਸ ਵਿੱਚ ਦੰਦ ਦੇ ਅੰਦਰੋਂ ਲਾਗ ਵਾਲੀ ਜਾਂ ਬੁਰੀ ਤਰ੍ਹਾਂ ਨੁਕਸਾਨੀ ਨਾੜੀ ਸਾਫ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ, ਤਾਂ ਜੋ ਦੰਦ ਨੂੰ ਕੱਢਣ ਦੀ ਥਾਂ ਬਚਾਇਆ ਜਾ ਸਕੇ।",
      points: [
        "ਇਹ ਉਦੋਂ ਜ਼ਰੂਰੀ ਹੁੰਦਾ ਹੈ ਜਦੋਂ ਸੜਨ ਜਾਂ ਸੱਟ ਨਾੜੀ ਤੱਕ ਪਹੁੰਚ ਗਈ ਹੋਵੇ ਅਤੇ ਦਰਦ ਜਾਂ ਲਾਗ ਕਰ ਰਹੀ ਹੋਵੇ",
        "ਉਹ ਥਾਂ ਸੁੰਨ ਕੀਤੀ ਜਾਂਦੀ ਹੈ, ਇਸ ਲਈ ਦਰਦ ਨਹੀਂ ਹੋਣਾ ਚਾਹੀਦਾ, ਅਤੇ ਇਸ ਵਿੱਚ ਇੱਕ ਜਾਂ ਵੱਧ ਵਾਰ ਜਾਣਾ ਪੈ ਸਕਦਾ ਹੈ",
        "ਸਫ਼ਾਈ ਤੋਂ ਬਾਅਦ ਦੰਦ ਦੇ ਅੰਦਰ ਭਰਾਈ ਕੀਤੀ ਜਾਂਦੀ ਹੈ, ਅਤੇ ਦੰਦ ਨੂੰ ਆਮ ਤੌਰ ’ਤੇ ਬਚਾਉਣ ਲਈ ਕ੍ਰਾਊਨ ਨਾਲ ਢਕਿਆ ਜਾਂਦਾ ਹੈ",
        "ਇਲਾਜ ਕੀਤਾ ਦੰਦ ਚੰਗੀ ਦੇਖਭਾਲ ਨਾਲ ਕਈ ਸਾਲ ਚੱਲ ਸਕਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'dental-implant',
    kind: 'test',
    phrases: ['dental implant', 'dental implants', 'tooth implant', 'implant tooth', 'teeth implant', 'artificial tooth', 'missing tooth', 'replace missing tooth', 'दांत का इम्प्लांट', 'ਦੰਦ ਦਾ ਇੰਪਲਾਂਟ'],
    en: {
      about: "A dental implant is a small post, usually of titanium, that is placed in the jawbone to hold an artificial tooth. It replaces a missing tooth, including its root.",
      points: [
        "The post is placed under local anaesthesia, and the bone grows around it over a few months",
        "A crown is then fixed on top, so that it looks and works like a natural tooth",
        "It needs enough healthy bone and gums, which the dentist checks with an X-ray or scan",
        "Alternatives include a bridge or dentures, and the dentist helps to choose",
      ],
    },
    hi: {
      about: "डेंटल इम्प्लांट एक छोटी कील है, आमतौर पर टाइटेनियम की, जो जबड़े की हड्डी में लगाई जाती है ताकि वह कृत्रिम दांत को थाम सके। यह जड़ सहित गायब दांत की जगह लेता है।",
      points: [
        "कील लोकल एनेस्थीसिया में लगाई जाती है, और कुछ महीनों में हड्डी उसके चारों ओर बढ़ती है",
        "फिर उसके ऊपर क्राउन लगाया जाता है, ताकि वह प्राकृतिक दांत की तरह दिखे और काम करे",
        "इसके लिए पर्याप्त स्वस्थ हड्डी और मसूड़े चाहिए, जिन्हें दंत चिकित्सक एक्स-रे या स्कैन से देखते हैं",
        "विकल्पों में ब्रिज या नकली दांतों का सेट शामिल है, और दंत चिकित्सक चुनने में मदद करते हैं",
      ],
    },
    pa: {
      about: "ਡੈਂਟਲ ਇੰਪਲਾਂਟ ਇੱਕ ਛੋਟੀ ਕਿੱਲ ਹੈ, ਆਮ ਤੌਰ ’ਤੇ ਟਾਇਟੇਨੀਅਮ ਦੀ, ਜੋ ਜਬਾੜੇ ਦੀ ਹੱਡੀ ਵਿੱਚ ਲਗਾਈ ਜਾਂਦੀ ਹੈ ਤਾਂ ਜੋ ਉਹ ਨਕਲੀ ਦੰਦ ਨੂੰ ਥਾਮ ਸਕੇ। ਇਹ ਜੜ੍ਹ ਸਮੇਤ ਗੁੰਮ ਦੰਦ ਦੀ ਥਾਂ ਲੈਂਦਾ ਹੈ।",
      points: [
        "ਕਿੱਲ ਲੋਕਲ ਐਨੇਸਥੀਸੀਆ ਵਿੱਚ ਲਗਾਈ ਜਾਂਦੀ ਹੈ, ਅਤੇ ਕੁਝ ਮਹੀਨਿਆਂ ਵਿੱਚ ਹੱਡੀ ਉਸ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਵਧਦੀ ਹੈ",
        "ਫਿਰ ਉਸ ਦੇ ਉੱਪਰ ਕ੍ਰਾਊਨ ਲਗਾਇਆ ਜਾਂਦਾ ਹੈ, ਤਾਂ ਜੋ ਉਹ ਕੁਦਰਤੀ ਦੰਦ ਵਾਂਗ ਦਿਖੇ ਅਤੇ ਕੰਮ ਕਰੇ",
        "ਇਸ ਲਈ ਲੋੜੀਂਦੀ ਸਿਹਤਮੰਦ ਹੱਡੀ ਅਤੇ ਮਸੂੜੇ ਚਾਹੀਦੇ ਹਨ, ਜਿਨ੍ਹਾਂ ਨੂੰ ਦੰਦਾਂ ਦਾ ਡਾਕਟਰ ਐਕਸ-ਰੇ ਜਾਂ ਸਕੈਨ ਨਾਲ ਦੇਖਦਾ ਹੈ",
        "ਵਿਕਲਪਾਂ ਵਿੱਚ ਬ੍ਰਿਜ ਜਾਂ ਨਕਲੀ ਦੰਦਾਂ ਦਾ ਸੈੱਟ ਸ਼ਾਮਲ ਹੈ, ਅਤੇ ਦੰਦਾਂ ਦਾ ਡਾਕਟਰ ਚੁਣਨ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ",
      ],
    },
  },
  {
    id: 'tooth-extraction',
    kind: 'test',
    phrases: ['tooth extraction', 'tooth removal', 'teeth removal', 'extraction of tooth', 'removing a tooth', 'pulling a tooth', 'tooth pulled', 'dant nikalwana', 'दांत निकलवाना', 'ਦੰਦ ਕਢਵਾਉਣਾ'],
    en: {
      about: "A tooth extraction is the removal of a tooth from its socket in the jaw. It is done when a tooth is too damaged to save, is loose from gum disease, or is crowding or stuck.",
      points: [
        "The area is numbed with local anaesthesia, so you feel pressure but no pain",
        "Afterwards a little bleeding and soreness for a day or two is expected",
        "The dentist explains how to look after the area, and what to avoid in the first days",
        "A missing tooth can be replaced later with an implant, a bridge or dentures",
      ],
    },
    hi: {
      about: "दांत निकालना जबड़े में उसके खाँचे से दांत को हटाना है। यह तब किया जाता है जब दांत इतना खराब हो कि बचाया न जा सके, मसूड़ों की बीमारी से ढीला हो, या भीड़ कर रहा हो या फंसा हो।",
      points: [
        "वह जगह लोकल एनेस्थीसिया से सुन्न की जाती है, इसलिए दबाव महसूस होता है लेकिन दर्द नहीं",
        "बाद में एक-दो दिन थोड़ा खून आना और दर्द की उम्मीद की जाती है",
        "दंत चिकित्सक बताते हैं कि उस जगह की देखभाल कैसे करनी है, और पहले दिनों में किससे बचना है",
        "गायब दांत की जगह बाद में इम्प्लांट, ब्रिज या नकली दांतों के सेट से भरी जा सकती है",
      ],
    },
    pa: {
      about: "ਦੰਦ ਕੱਢਣਾ ਜਬਾੜੇ ਵਿੱਚ ਉਸ ਦੇ ਖਾਂਚੇ ਤੋਂ ਦੰਦ ਨੂੰ ਹਟਾਉਣਾ ਹੈ। ਇਹ ਉਦੋਂ ਕੀਤਾ ਜਾਂਦਾ ਹੈ ਜਦੋਂ ਦੰਦ ਇੰਨਾ ਖ਼ਰਾਬ ਹੋਵੇ ਕਿ ਬਚਾਇਆ ਨਾ ਜਾ ਸਕੇ, ਮਸੂੜਿਆਂ ਦੀ ਬਿਮਾਰੀ ਨਾਲ ਢਿੱਲਾ ਹੋਵੇ, ਜਾਂ ਭੀੜ ਕਰ ਰਿਹਾ ਹੋਵੇ ਜਾਂ ਫਸਿਆ ਹੋਵੇ।",
      points: [
        "ਉਹ ਥਾਂ ਲੋਕਲ ਐਨੇਸਥੀਸੀਆ ਨਾਲ ਸੁੰਨ ਕੀਤੀ ਜਾਂਦੀ ਹੈ, ਇਸ ਲਈ ਦਬਾਅ ਮਹਿਸੂਸ ਹੁੰਦਾ ਹੈ ਪਰ ਦਰਦ ਨਹੀਂ",
        "ਬਾਅਦ ਵਿੱਚ ਇੱਕ-ਦੋ ਦਿਨ ਥੋੜ੍ਹਾ ਖੂਨ ਆਉਣਾ ਅਤੇ ਦਰਦ ਦੀ ਉਮੀਦ ਕੀਤੀ ਜਾਂਦੀ ਹੈ",
        "ਦੰਦਾਂ ਦਾ ਡਾਕਟਰ ਦੱਸਦਾ ਹੈ ਕਿ ਉਸ ਥਾਂ ਦੀ ਦੇਖਭਾਲ ਕਿਵੇਂ ਕਰਨੀ ਹੈ, ਅਤੇ ਪਹਿਲੇ ਦਿਨਾਂ ਵਿੱਚ ਕਿਸ ਤੋਂ ਬਚਣਾ ਹੈ",
        "ਗੁੰਮ ਦੰਦ ਦੀ ਥਾਂ ਬਾਅਦ ਵਿੱਚ ਇੰਪਲਾਂਟ, ਬ੍ਰਿਜ ਜਾਂ ਨਕਲੀ ਦੰਦਾਂ ਦੇ ਸੈੱਟ ਨਾਲ ਭਰੀ ਜਾ ਸਕਦੀ ਹੈ",
      ],
    },
  },
  {
    id: 'teeth-cleaning',
    kind: 'test',
    phrases: ['teeth cleaning', 'dental cleaning', 'scaling', 'teeth scaling', 'dental scaling', 'scaling and polishing', 'teeth polishing', 'tooth cleaning', 'cleaning of teeth', 'दांतों की सफाई', 'ਦੰਦਾਂ ਦੀ ਸਫ਼ਾਈ'],
    en: {
      about: "Teeth cleaning, or scaling and polishing, is a professional clean by a dentist or hygienist that removes plaque and hard tartar that brushing cannot reach.",
      points: [
        "Tartar builds up along the gum line and can cause bleeding gums and bad breath",
        "A special instrument removes it, and the teeth are then polished smooth",
        "It is not painful, though gums that are inflamed can feel tender, and some bleeding is common",
        "Many people have it done once or twice a year, as the dentist advises",
      ],
    },
    hi: {
      about: "दांतों की सफ़ाई, या स्केलिंग और पॉलिशिंग, दंत चिकित्सक या हाइजीनिस्ट द्वारा की जाने वाली पेशेवर सफ़ाई है जो प्लाक और सख्त टार्टर हटाती है जहां ब्रश नहीं पहुंच पाता।",
      points: [
        "टार्टर मसूड़ों की रेखा पर जमता है और मसूड़ों से खून और मुंह की बदबू का कारण बन सकता है",
        "एक खास औज़ार से इसे हटाया जाता है, और फिर दांतों को चिकना पॉलिश किया जाता है",
        "यह दर्दनाक नहीं है, हालांकि सूजे मसूड़े नाज़ुक लग सकते हैं, और थोड़ा खून आना आम है",
        "कई लोग इसे साल में एक या दो बार करवाते हैं, जैसा दंत चिकित्सक सलाह दें",
      ],
    },
    pa: {
      about: "ਦੰਦਾਂ ਦੀ ਸਫ਼ਾਈ, ਜਾਂ ਸਕੇਲਿੰਗ ਅਤੇ ਪਾਲਿਸ਼ਿੰਗ, ਦੰਦਾਂ ਦੇ ਡਾਕਟਰ ਜਾਂ ਹਾਈਜੀਨਿਸਟ ਦੁਆਰਾ ਕੀਤੀ ਜਾਣ ਵਾਲੀ ਪੇਸ਼ੇਵਰ ਸਫ਼ਾਈ ਹੈ ਜੋ ਪਲੇਕ ਅਤੇ ਸਖ਼ਤ ਟਾਰਟਰ ਹਟਾਉਂਦੀ ਹੈ ਜਿੱਥੇ ਬੁਰਸ਼ ਨਹੀਂ ਪਹੁੰਚ ਪਾਉਂਦਾ।",
      points: [
        "ਟਾਰਟਰ ਮਸੂੜਿਆਂ ਦੀ ਰੇਖਾ ’ਤੇ ਜੰਮਦਾ ਹੈ ਅਤੇ ਮਸੂੜਿਆਂ ਤੋਂ ਖੂਨ ਅਤੇ ਮੂੰਹ ਦੀ ਬਦਬੂ ਦਾ ਕਾਰਨ ਬਣ ਸਕਦਾ ਹੈ",
        "ਇੱਕ ਖ਼ਾਸ ਔਜ਼ਾਰ ਨਾਲ ਇਸ ਨੂੰ ਹਟਾਇਆ ਜਾਂਦਾ ਹੈ, ਅਤੇ ਫਿਰ ਦੰਦਾਂ ਨੂੰ ਚਿਕਨਾ ਪਾਲਿਸ਼ ਕੀਤਾ ਜਾਂਦਾ ਹੈ",
        "ਇਹ ਦਰਦਨਾਕ ਨਹੀਂ ਹੈ, ਹਾਲਾਂਕਿ ਸੁੱਜੇ ਮਸੂੜੇ ਨਾਜ਼ੁਕ ਲੱਗ ਸਕਦੇ ਹਨ, ਅਤੇ ਥੋੜ੍ਹਾ ਖੂਨ ਆਉਣਾ ਆਮ ਹੈ",
        "ਕਈ ਲੋਕ ਇਸ ਨੂੰ ਸਾਲ ਵਿੱਚ ਇੱਕ ਜਾਂ ਦੋ ਵਾਰ ਕਰਵਾਉਂਦੇ ਹਨ, ਜਿਵੇਂ ਦੰਦਾਂ ਦਾ ਡਾਕਟਰ ਸਲਾਹ ਦੇਵੇ",
      ],
    },
  },
]
