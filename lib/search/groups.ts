// lib/search/groups.ts
//
// What patients say, set against what the pages say: sets of words that mean the same thing for
// search, across English, Hindi and Punjabi, and across the three ways a Hindi or Punjabi word
// gets typed (Devanagari, Gurmukhi, and English letters).
//
// FORMAT. One string per group. Words are separated by "|". An optional ";" splits the group in two:
// on the left, English words (matched as typed, after spelling folding and stemming); on the right,
// Hindi and Punjabi words in any of the three scripts (matched as typed AND by sound, so "bukhar",
// "bukhaar" and "बुखार" are all the same word; see phoneticKey in text.ts). A phrase is several
// words in one entry ("sir dard"); it matches when those words are typed next to each other.
//
//   'stomach|abdomen|belly|tummy ; pet|pait|ढिड|पेट|ਪੇਟ|ਢਿੱਡ'
//
// RULES FOR EDITING.
//  - A group is a SYNONYM set, not a symptom checker. "stomach" and "pet" are the same word;
//    "stomach" and "gastroenterology" are not, and the second is reached by the department's own
//    topic words (topics.ts), not by claiming one means the other.
//  - Words of two letters or fewer that could be someone else's word (a name, an English word) are
//    left out. Short Hindi words are listed in their usual spellings ("dant", "daant", "dand"),
//    because a sound key is too coarse for them.
//  - Hindi and Punjabi spellings here are an unreviewed draft, like the pages themselves. A Hindi-
//    and Punjabi-speaking person at LIMS should read them with the department pages.

export const GROUPS: readonly string[] = [
  /* ---------------------------------------------------------------------- the body */
  'stomach|abdomen|abdominal|belly|tummy|stomachs|gut ; pet|pait|peth|dhid|ढिड|पेट|ਪੇਟ|ਢਿੱਡ|ਢਿਡ',
  'liver|hepatic ; jigar|jigr|yakrit|जिगर|यकृत|ਜਿਗਰ',
  'kidney|kidneys|renal ; gurda|gurde|gurdey|kidni|किडनी|गुर्दा|गुर्दे|ਗੁਰਦਾ|ਗੁਰਦੇ|ਕਿਡਨੀ',
  'bladder ; mutrashay|मूत्राशय|ਬਲੈਡਰ',
  'prostate|prostrate|prostatic ; prostet|प्रोस्टेट|ਪ੍ਰੋਸਟੇਟ',
  'heart|cardiac|cardio|cardiology|cardiologist ; dil|dill|hriday|दिल|हृदय|हार्ट|ਦਿਲ|ਹਾਰਟ',
  'chest|thorax ; chhati|chati|chaati|seena|sina|छाती|सीना|सीने|ਛਾਤੀ|ਸੀਨਾ',
  'lung|lungs|pulmonary ; phephde|fefde|फेफड़े|फेफड़ा|ਫੇਫੜੇ|ਫੇਫੜਾ',
  'breath|breathing|breathless|breathlessness|dyspnea|dyspnoea|wheeze|wheezing ; saans|sans|sas|सांस|साँस|ਸਾਹ',
  'brain|neuro|neurological|neurology ; dimag|dimaag|dimagh|दिमाग|ਦਿਮਾਗ',
  'nerve|nerves ; nas|nus|नस|नसें|ਨਸ|ਨਾੜੀ',
  'eye|eyes|ocular|eyesight|vision|sight ; aankh|aankhen|ankh|ankhein|akh|aankhon|आंख|आँख|आंखें|आँखें|आंखों|आँखों|नज़र|नजर|nazar|ਅੱਖ|ਅੱਖਾਂ|ਨਜ਼ਰ',
  'ear|ears|aural ; kaan|kan|kaano|कान|ਕੰਨ|ਕੰਨਾਂ',
  'nose|nasal|nostril ; naak|nak|नाक|ਨੱਕ',
  'throat ; gala|gale|गला|गले|ਗਲਾ|ਗਲੇ',
  'tooth|teeth|dental|dentist|dentistry ; dant|daant|dand|danth|दांत|दाँत|ਦੰਦ|ਦੰਦਾਂ',
  'gum|gums ; masude|masoode|मसूड़े|मसूड़ा|ਮਸੂੜੇ|ਮਸੂੜਾ',
  'mouth|oral ; munh|muh|mooh|मुंह|मुँह|ਮੂੰਹ',
  'skin ; twacha|tvacha|chamdi|त्वचा|चमड़ी|ਚਮੜੀ|ਚਮੜਾ',
  'bone|bones|skeletal|osseous ; haddi|haddiyan|hadi|हड्डी|हड्डियाँ|हड्डियां|ਹੱਡੀ|ਹੱਡੀਆਂ',
  'joint|joints ; jod|jor|jodon|जोड़|जोड़ों|ਜੋੜ|ਜੋੜਾਂ',
  'knee|knees ; ghutna|ghutne|ghutana|gode|घुटना|घुटने|ਗੋਡਾ|ਗੋਡੇ|ਗੋਡਿਆਂ',
  'hip|hips ; kulha|kolha|kulhe|कूल्हा|कूल्हे|ਕੁੱਲ੍ਹਾ|ਕੁੱਲ੍ਹੇ',
  'shoulder|shoulders ; kandha|kandhe|modha|कंधा|कंधे|ਮੋਢਾ|ਮੋਢੇ',
  'elbow ; kohni|kuhni|कोहनी|ਕੂਹਣੀ',
  'wrist ; kalai|कलाई|ਕਲਾਈ',
  'ankle|heel|foot|feet ; takhna|edi|pair|paon|पैर|पाँव|एड़ी|टखना|ਪੈਰ|ਅੱਡੀ|ਗਿੱਟਾ',
  'hand|hands|palm ; haath|hath|hathon|हाथ|हथेली|ਹੱਥ|ਹੱਥਾਂ',
  'back|backbone|spine|spinal|vertebra|vertebral ; kamar|peeth|pith|reedh|reed|ridh|कमर|पीठ|रीढ़|रीढ|ਕਮਰ|ਪਿੱਠ|ਰੀੜ੍ਹ|ਰੀੜ੍ਹ ਦੀ ਹੱਡੀ',
  'neck|cervical ; gardan|garden|गर्दन|ਗਰਦਨ',
  'head ; sar|सिर|ਸਿਰ',
  'blood ; khoon|khun|rakt|raktt|खून|रक्त|ਖੂਨ|ਰਕਤ',
  'urine|urinary|urination ; peshab|peshaab|pishab|pesab|mutra|पेशाब|मूत्र|ਪਿਸ਼ਾਬ',
  'stool|stools|motion|motions|faeces|feces ; potty|pakhana|latrine|शौच|पाखाना|पॉटी|ਪਖਾਨਾ|ਟੱਟੀ|ਸ਼ੌਚ',
  'uterus|womb ; bachhedani|bacchedani|garbhashay|बच्चेदानी|गर्भाशय|ਬੱਚੇਦਾਨੀ|ਗਰਭਾਸ਼ਯ',
  'ovary|ovaries|ovarian ; andashay|अंडाशय|ਅੰਡਾਸ਼ਯ',
  'breast|breasts ; stan|स्तन|ਛਾਤੀ ਦਾ|ਸਤਨ',
  'thyroid|goitre|goiter ; thyroid|ghegha|थायराइड|थायरॉइड|घेंघा|ਥਾਇਰਾਇਡ|ਘੇਂਘਾ',

  /* ----------------------------------------------------------- complaints and symptoms */
  'pain|ache|aching|painful|hurt|hurts|soreness ; dard|dardh|dukh|pida|peeda|दर्द|पीड़ा|ਦਰਦ|ਪੀੜ',
  'burning|burn sensation ; jalan|jalna|जलन|ਜਲਨ|ਸੜਨ',
  'swelling|swollen|edema|oedema ; sujan|soojan|suj|सूजन|ਸੋਜ|ਸੂਜਨ',
  'itching|itch|itchy ; khujli|khujali|खुजली|ਖੁਜਲੀ',
  'weakness|fatigue|tiredness|tired|lethargy|exhaustion ; kamzori|kamjori|thakan|thakawat|कमज़ोरी|कमजोरी|थकान|थकावट|ਕਮਜ਼ੋਰੀ|ਥਕਾਵਟ|ਥਕਾਨ',
  'dizziness|dizzy|giddiness|vertigo|giddy ; chakkar|chakar|चक्कर|ਚੱਕਰ',
  'vomiting|vomit|nausea|nauseous|puking ; ulti|ulti aana|mitli|उल्टी|मितली|जी मिचलाना|ਉਲਟੀ|ਮਤਲੀ|ਜੀ ਕੱਚਾ',
  'loose motion|loose motions|diarrhea|diarrhoea|loose stools|watery stools|dysentery ; dast|dasth|patle dast|दस्त|पतले दस्त|ਦਸਤ|ਪਤਲੇ ਦਸਤ|ਪੇਚਿਸ਼',
  'constipation|hard stool|hard stools ; kabz|kabj|कब्ज|कब्ज़|ਕਬਜ਼|ਕਬਜ',
  'acidity|acid|acid reflux|reflux|heartburn|gerd|gastritis|gastric ; esidity|acidity|khatti dakar|एसिडिटी|खट्टी डकार|अम्लता|ਐਸੀਡਿਟੀ|ਖੱਟੇ ਡਕਾਰ',
  'gas|bloating|bloated|flatulence|indigestion|dyspepsia ; gais|afara|apach|गैस|अफारा|अपच|ਗੈਸ|ਅਫਾਰਾ|ਬਦਹਜ਼ਮੀ',
  'fever|temperature|pyrexia|feverish ; bukhar|bukhaar|bukhaar|taap|tap|बुखार|ताप|ਬੁਖ਼ਾਰ|ਬੁਖਾਰ|ਤਾਪ',
  'cough|coughing ; khansi|khasi|khaansi|खांसी|खाँसी|खासी|ਖੰਘ|ਖਾਂਸੀ',
  'cold|common cold|runny nose|sneezing|flu|influenza ; zukam|zukaam|jukam|sardi|ज़ुकाम|जुकाम|सर्दी|छींक|ਜ਼ੁਕਾਮ|ਜੁਕਾਮ|ਸਰਦੀ',
  'sore throat|throat pain|throat infection ; gale mein dard|gale me dard|गले में दर्द|गले का दर्द|ਗਲੇ ਵਿੱਚ ਦਰਦ|ਗਲੇ ਦਾ ਦਰਦ',
  'headache|head pain|migraine ; sir dard|sar dard|sirdard|sardard|सिरदर्द|सिर दर्द|सरदर्द|आधासीसी|ਸਿਰ ਦਰਦ|ਸਿਰਦਰਦ',
  'stomach pain|stomachache|abdominal pain|belly pain|tummy ache|tummy pain|stomach ache ; pet dard|pet me dard|pait dard|पेट दर्द|पेट में दर्द|ਪੇਟ ਦਰਦ|ਪੇਟ ਵਿੱਚ ਦਰਦ|ਢਿੱਡ ਦਰਦ',
  'chest pain|chest tightness|chest discomfort ; seene mein dard|chhati mein dard|chati dard|seene me dard|सीने में दर्द|छाती में दर्द|छाती दर्द|ਛਾਤੀ ਵਿੱਚ ਦਰਦ|ਛਾਤੀ ਦਰਦ|ਸੀਨੇ ਵਿੱਚ ਦਰਦ',
  'back pain|backache|lower back pain|lumbago ; kamar dard|kamar me dard|peeth dard|कमर दर्द|कमर में दर्द|पीठ दर्द|पीठ में दर्द|ਕਮਰ ਦਰਦ|ਕਮਰ ਦਰਦ|ਪਿੱਠ ਦਰਦ',
  'neck pain|stiff neck ; gardan dard|gardan me dard|गर्दन दर्द|गर्दन में दर्द|ਗਰਦਨ ਦਰਦ|ਗਰਦਨ ਦਾ ਦਰਦ',
  'joint pain|arthritis|rheumatism|rheumatoid|osteoarthritis|gout ; jodon ka dard|jodo ka dard|gathiya|gathia|जोड़ों का दर्द|जोड़ो का दर्द|गठिया|ਜੋੜਾਂ ਦਾ ਦਰਦ|ਗਠੀਆ',
  'knee pain ; ghutne mein dard|ghutne me dard|ghutne ka dard|घुटने में दर्द|घुटने का दर्द|ਗੋਡੇ ਦਾ ਦਰਦ|ਗੋਡਿਆਂ ਦਾ ਦਰਦ',
  'toothache|tooth pain|dental pain|teeth pain ; dant dard|dant me dard|daant dard|दांत दर्द|दाँत दर्द|दांत में दर्द|ਦੰਦ ਦਰਦ|ਦੰਦ ਦਾ ਦਰਦ|ਦੰਦਾਂ ਦਾ ਦਰਦ',
  'ear pain|earache|ear ache ; kaan dard|kaan me dard|kan dard|कान दर्द|कान में दर्द|ਕੰਨ ਦਰਦ|ਕੰਨ ਦਾ ਦਰਦ',
  'eye pain|red eye|eye infection|conjunctivitis|pink eye ; aankh dard|aankh me dard|aankh aana|आंख दर्द|आँख दर्द|आंख में दर्द|आँख आना|ਅੱਖ ਦਰਦ|ਅੱਖ ਦਾ ਦਰਦ',
  'nosebleed|nose bleed|epistaxis ; nakseer|naksir|nak se khoon|नकसीर|नाक से खून|ਨੱਕ ਵਗਣਾ|ਨੱਕ ਵਿੱਚੋਂ ਖੂਨ',
  'hearing loss|deaf|deafness|hard of hearing|tinnitus ; baharapan|bahra|कम सुनना|बहरापन|बहरा|ਬੋਲ਼ਾਪਣ|ਘੱਟ ਸੁਣਨਾ',
  'snoring|sleep apnea|sleep apnoea ; kharate|kharrate|खर्राटे|ਘੁਰਾੜੇ',
  'fainting|faint|unconscious|blackout|passed out|collapse|collapsed ; behoshi|behosh|बेहोशी|बेहोश|ਬੇਹੋਸ਼ੀ|ਬੇਹੋਸ਼',
  'seizure|seizures|fits|fit|epilepsy|convulsion|convulsions ; mirgi|daura|dauron|मिर्गी|दौरा|दौरे|ਮਿਰਗੀ|ਦੌਰਾ|ਦੌਰੇ',
  'stroke|paralysis|paralyzed|paralysed|palsy|hemiplegia ; lakwa|lakva|laqwa|लकवा|पक्षाघात|ਲਕਵਾ|ਅਧਰੰਗ',
  'numbness|tingling|pins and needles ; sunn|sunnpan|sunpan|सुन्न|सुन्नपन|झनझनाहट|ਸੁੰਨ|ਸੁੰਨਪਨ',
  'jaundice|yellow eyes|yellow skin ; pilia|peelia|piliya|पीलिया|ਪੀਲੀਆ',
  'anemia|anaemia|low hemoglobin|low haemoglobin|low hb ; khoon ki kami|anemia|खून की कमी|एनीमिया|ਖੂਨ ਦੀ ਕਮੀ|ਅਨੀਮੀਆ',
  'weight loss|losing weight|reduce weight|lose weight|slim|slimming ; vajan kam|wajan kam|वज़न कम|वजन कम|वजन घटाना|ਭਾਰ ਘਟਾਉਣਾ|ਵਜ਼ਨ ਘਟਾਉਣਾ',
  'obesity|obese|overweight|weight gain ; motapa|motapaa|मोटापा|वज़न बढ़ना|वजन बढ़ना|ਮੋਟਾਪਾ|ਭਾਰ ਵਧਣਾ',
  'bleeding|bleed|bleeds ; khoon bahna|khoon aana|खून बहना|खून आना|ਖੂਨ ਵਗਣਾ|ਖੂਨ ਆਉਣਾ',
  'rash|rashes|allergy|allergies|allergic|hives|urticaria ; allergy|elerji|एलर्जी|ददोरे|ਐਲਰਜੀ',
  'infection|infections|infected ; sankraman|infection|संक्रमण|इन्फेक्शन|ਇਨਫੈਕਸ਼ਨ|ਲਾਗ',
  'wound|wounds|cut|cuts|laceration ; ghav|zakhm|zakham|घाव|ज़ख्म|जख्म|ਜ਼ਖ਼ਮ|ਜ਼ਖਮ|ਘਾਉ',
  'injury|injured|injuries|trauma|hurt ; chot|chhot|choat|चोट|ਸੱਟ|ਚੋਟ',
  'lump|lumps|growth|mass|nodule|swelling lump ; gaanth|gath|gand|गांठ|गाँठ|ग्रंथि|ਗੰਢ|ਗੱਠ',
  'stone|stones|calculus|calculi|lithiasis ; pathri|pathari|पथरी|ਪਥਰੀ|ਪੱਥਰੀ',

  /* ------------------------------------------------------------------ named conditions */
  'diabetes|diabetic|sugar|blood sugar|glucose|hba1c|insulin|diabetes mellitus ; sugar ki bimari|madhumeh|shugar|शुगर|मधुमेह|डायबिटीज|डायबिटीज़|ਸ਼ੂਗਰ|ਸ਼ੂਗਰ ਦੀ ਬਿਮਾਰੀ|ਡਾਇਬਟੀਜ਼|ਸ਼ੂਗਰ ਦੀ ਬੀਮਾਰੀ',
  'blood pressure|bp|hypertension|hypotension|high bp|low bp|high blood pressure|low blood pressure ; raktchap|ब्लड प्रेशर|रक्तचाप|उच्च रक्तचाप|बीपी|ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ|ਬੀਪੀ|ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ',
  'cholesterol|lipid|lipids|lipid profile ; kolesterol|कोलेस्ट्रॉल|ਕੋਲੈਸਟ੍ਰੋਲ',
  'heart attack|myocardial infarction|cardiac arrest|heart failure|coronary ; dil ka daura|heart attack|दिल का दौरा|हार्ट अटैक|ਦਿਲ ਦਾ ਦੌਰਾ|ਹਾਰਟ ਅਟੈਕ',
  'asthma|bronchitis|copd|wheezing|breathing problem ; dama|dumma|दमा|अस्थमा|सांस फूलना|साँस फूलना|ਦਮਾ|ਅਸਥਮਾ|ਸਾਹ ਫੁੱਲਣਾ',
  'tuberculosis|tb|koch ; tibi|kshay|tapedik|टीबी|क्षय रोग|तपेदिक|ਟੀਬੀ|ਤਪਦਿਕ',
  'typhoid|enteric fever|malaria|dengue|chikungunya|viral fever|viral|swine flu ; typhoid|malaria|dengue|टाइफाइड|मलेरिया|डेंगू|ਟਾਈਫਾਈਡ|ਮਲੇਰੀਆ|ਡੇਂਗੂ',
  'piles|haemorrhoids|hemorrhoids|fissure|fistula|anal ; bawasir|bawaseer|bavasir|bhagandar|बवासीर|भगंदर|ਬਵਾਸੀਰ|ਭਗੰਦਰ',
  'hernia|rupture|inguinal hernia ; hernia|hargnia|हर्निया|ਹਰਨੀਆ|ਹਰਨੀਆਂ',
  'appendix|appendicitis ; appendix|apendix|अपेंडिक्स|ਅਪੈਂਡਿਕਸ',
  'gallstone|gallstones|gall stone|gall stones|gallbladder|gall bladder ; pitt ki pathri|pitte ki pathri|पित्त की पथरी|पित्ताशय|ਪਿੱਤੇ ਦੀ ਪੱਥਰੀ|ਪਿੱਤਾ',
  'kidney stone|kidney stones|renal stone|renal calculus|renal colic ; gurde ki pathri|gurde me pathri|गुर्दे की पथरी|किडनी स्टोन|ਗੁਰਦੇ ਦੀ ਪੱਥਰੀ|ਕਿਡਨੀ ਸਟੋਨ',
  'uti|urinary infection|urine infection|burning urination|cystitis ; peshab me jalan|peshab mein jalan|पेशाब में जलन|ਪਿਸ਼ਾਬ ਵਿੱਚ ਜਲਨ',
  'hepatitis|fatty liver|cirrhosis|liver disease ; hepatitis|फैटी लिवर|हेपेटाइटिस|ਹੈਪੇਟਾਈਟਿਸ|ਫੈਟੀ ਲਿਵਰ',
  'ulcer|ulcers|peptic ulcer|stomach ulcer ; chhale|छाले|अल्सर|ਛਾਲੇ|ਅਲਸਰ',
  'slip disc|slipped disc|herniated disc|disc prolapse|disc bulge|sciatica|sciatic ; slip disc|sciatica|स्लिप डिस्क|साइटिका|ਸਲਿਪ ਡਿਸਕ|ਸਾਇਟਿਕਾ',
  'spondylosis|spondylitis|cervical spondylosis|lumbar spondylosis ; spondylosis|स्पॉन्डिलाइटिस|स्पोंडिलोसिस|ਸਪਾਂਡਿਲੋਸਿਸ',
  'fracture|fractured|broken bone|broken|dislocation|dislocated|sprain|crack ; haddi tootna|haddi toot gayi|हड्डी टूटना|हड्डी टूट गई|फ्रैक्चर|मोच|ਹੱਡੀ ਟੁੱਟਣਾ|ਫ੍ਰੈਕਚਰ|ਮੋਚ',
  'cataract|cataracts|cloudy lens ; motiyabind|motia|motiabind|मोतियाबिंद|मोतिया|ਮੋਤੀਆਬਿੰਦ|ਮੋਤੀਆ',
  'glasses|spectacles|specs|eyeglasses|lens|lenses|refractive|myopia|short sight|long sight ; chashma|chasma|enak|चश्मा|ਐਨਕ|ਐਨਕਾਂ|ਚਸ਼ਮਾ',
  'glaucoma ; kala motia|काला मोतिया|ग्लूकोमा|ਗਲੂਕੋਮਾ|ਕਾਲਾ ਮੋਤੀਆ',
  'sinus|sinusitis ; sinus|साइनस|ਸਾਈਨਸ',
  'tonsil|tonsils|tonsillitis|adenoid|adenoids ; tonsil|टॉन्सिल|टांसिल|ਟੌਂਸਿਲ',
  'cavity|cavities|tooth decay|decay|caries|root canal|filling|extraction|wisdom tooth ; dant ka keeda|दांत में कीड़ा|दांत का कीड़ा|ਦੰਦ ਦਾ ਕੀੜਾ|ਦੰਦ ਸੜਨਾ',
  'braces|aligners|crown|bridge|denture|dentures|implant|scaling|whitening ; braces|dentures|ब्रेसेस|ਬਰੇਸ',
  'tumor|tumour|tumors|tumours|cancer|malignancy|oncology ; cancer|kainsar|कैंसर|ਕੈਂਸਰ|ਕੈਂਸਰ',
  'head injury|head trauma|concussion ; sir mein chot|sir me chot|सिर में चोट|ਸਿਰ ਵਿੱਚ ਸੱਟ',
  'accident|road accident|crash|collision|accidents ; durghatna|accident|दुर्घटना|एक्सीडेंट|ਹਾਦਸਾ|ਐਕਸੀਡੈਂਟ',
  'burn|burns|burnt|scald ; jalna|jal gaya|जल गया|जलना|ਸੜ ਗਿਆ|ਸੜਨਾ',
  'snake bite|snakebite|dog bite|animal bite ; saanp|sanp|kutta kata|सांप|साँप|कुत्ते का काटना|ਸੱਪ|ਕੁੱਤੇ ਦਾ ਕੱਟਣਾ',
  'poison|poisoning|overdose|poisonous|swallowed ; zeher|jahar|ज़हर|जहर|ਜ਼ਹਿਰ',
  'choking|choke ; dam ghutna|दम घुटना|ਦਮ ਘੁੱਟਣਾ',
  'varicose|varicose veins|dvt|blood clot|clot ; nason ki sujan|वैरिकोज़|वेरिकोज|ਵੈਰੀਕੋਜ਼',
  'hydrocele|testicle|testis|scrotum|male genital ; hydrocele|हाइड्रोसील|ਹਾਈਡਰੋਸੀਲ',
  'circumcision|phimosis ; khatna|खतना|ਖਤਨਾ',
  'worms|worm|roundworm ; keede|kide|पेट के कीड़े|कीड़े|ਪੇਟ ਦੇ ਕੀੜੇ|ਕੀੜੇ',

  /* ---------------------------------------------------------- women, pregnancy, children */
  'pregnancy|pregnant|expecting|antenatal|prenatal|maternity|expectant ; garbh|garbhavastha|garbhwati|garbhvati|pregnancy|गर्भ|गर्भावस्था|गर्भवती|प्रेग्नेंसी|ਗਰਭ|ਗਰਭਵਤੀ|ਗਰਭ ਅਵਸਥਾ|ਪ੍ਰੈਗਨੈਂਸੀ',
  'delivery|childbirth|child birth|labor|labour|labour pain|normal delivery|c section|c-section|csection|caesarean|cesarean|baby delivery ; prasav|janepa|delivery|प्रसव|डिलीवरी|सिज़ेरियन|ਜਣੇਪਾ|ਡਿਲੀਵਰੀ|ਸੀਜ਼ੇਰੀਅਨ',
  'periods|period|menstruation|menses|menstrual|irregular periods|heavy periods ; mahwari|mahavari|mahawari|masik dharm|माहवारी|महावारी|मासिक धर्म|पीरियड|पीरियड्स|ਮਾਹਵਾਰੀ|ਪੀਰੀਅਡ',
  'pcos|pcod|polycystic|ovarian cyst|cyst|fibroid|fibroids ; pcod|पीसीओडी|पीसीओएस|ਪੀਸੀਓਡੀ',
  'infertility|fertility|conceive|conception|ivf|sterility|not getting pregnant|trying to conceive ; banjhpan|bachcha nahi ho raha|बांझपन|बाँझपन|आईवीएफ|ਬਾਂਝਪਨ',
  'menopause|menopausal|hot flushes|hot flashes ; menopause|रजोनिवृत्ति|मेनोपॉज़|ਮੈਨੋਪੌਜ਼',
  'miscarriage|abortion|mtp|termination ; garbhpat|गर्भपात|ਗਰਭਪਾਤ',
  'white discharge|vaginal discharge|leucorrhea|leukorrhea ; safed pani|sufed pani|सफेद पानी|ਚਿੱਟਾ ਪਾਣੀ',
  'family planning|contraception|contraceptive|iud|copper t ; parivar niyojan|परिवार नियोजन|ਪਰਿਵਾਰ ਨਿਯੋਜਨ',
  'women|woman|female|ladies|lady|gynae|gyne|gynec|gynecology|gynecologist|gynaecology|gynaecologist|obstetrics|obstetrician|obs|ob gyn|obgyn|lady doctor|ladies doctor|women doctor|female doctor ; mahila|aurat|auraton|stri|stree|महिला|महिलाओं|औरत|औरतों|स्त्री|स्त्री रोग|ਔਰਤ|ਔਰਤਾਂ|ਇਸਤਰੀ|ਇਸਤਰੀ ਰੋਗ|ਮਹਿਲਾ',
  'child|children|kid|kids|baby|babies|infant|infants|toddler|paediatric|pediatric|paediatrics|pediatrics|pediatrician|paediatrician|child specialist|child doctor|children doctor|baby doctor ; bachcha|bacha|bachche|bacche|bachhe|bachchon|bacchon|bachon|baal rog|बच्चा|बच्चे|बच्चों|बाल रोग|ਬੱਚਾ|ਬੱਚੇ|ਬੱਚਿਆਂ|ਬਾਲ ਰੋਗ',
  'newborn|new born|neonate|neonatal|neonatology|nicu|premature|preterm|incubator|low birth weight ; shishu|navjaat|nawjaat|शिशु|नवजात|ਨਵਜੰਮੇ|ਨਵਜਾਤ|ਸ਼ਿਸ਼ੂ',
  'vaccine|vaccines|vaccination|vaccinations|immunization|immunisation ; teeka|tika|teekakaran|टीका|टीकाकरण|ਟੀਕਾ|ਟੀਕਾਕਰਨ',
  'injection|injections|inj|syringe|needle|shot ; injection|इंजेक्शन|ਇੰਜੈਕਸ਼ਨ|ਟੀਕਾ',
  'growth|development|milestones|height|short height|stunted ; vikas|kad|विकास|कद|ਵਿਕਾਸ|ਕੱਦ',
  'breastfeeding|feeding|lactation|milk ; doodh pilana|dudh|दूध पिलाना|ਦੁੱਧ ਪਿਲਾਉਣਾ',

  /* ----------------------------------------------------------------------------- people */
  'doctor|doctors|dr|doc|physician|consultant|consultants|specialist|specialists|medic|vaid ; daktar|doctar|dactar|dr sahab|chikitsak|डॉक्टर|डाक्टर|चिकित्सक|वैद्य|ਡਾਕਟਰ|ਡਾਕਟਰਾਂ',
  'surgeon|surgery|surgical|operation|operate|operated|surgeries|operations ; operation|ops|sarjari|ऑपरेशन|सर्जरी|शल्य चिकित्सा|ਅਪਰੇਸ਼ਨ|ਆਪਰੇਸ਼ਨ|ਸਰਜਰੀ',
  'laparoscopic|laparoscopy|keyhole|laproscopic|laproscopy|laparoscope|minimally invasive|keyhole surgery ; doorbeen|durbeen|दूरबीन|दूरबीन से|ਦੂਰਬੀਨ',
  'orthopedic|orthopaedic|orthopedics|orthopaedics|ortho|orthopedist|bone doctor|bone specialist|bone surgeon|joint doctor ; haddi ka doctor|haddi doctor|हड्डी का डॉक्टर|हड्डी रोग|ਹੱਡੀਆਂ ਦਾ ਡਾਕਟਰ|ਹੱਡੀ ਦਾ ਡਾਕਟਰ',
  'neurosurgeon|neurosurgery|brain surgeon|brain doctor|neurologist|neurology ; dimag ka doctor|दिमाग का डॉक्टर|न्यूरो|ਦਿਮਾਗ ਦਾ ਡਾਕਟਰ',
  'gastroenterologist|gastroenterology|gastro|stomach doctor|liver doctor|digestive|digestion ; pet ka doctor|pet doctor|पेट का डॉक्टर|ਪੇਟ ਦਾ ਡਾਕਟਰ',
  'urologist|urology|kidney doctor ; gurde ka doctor|गुर्दे का डॉक्टर|ਗੁਰਦੇ ਦਾ ਡਾਕਟਰ',
  'ophthalmologist|ophthalmology|eye doctor|eye specialist|eye surgeon|optician|opthalmology|opthalmologist ; aankh ka doctor|आंख का डॉक्टर|आँख का डॉक्टर|ਅੱਖਾਂ ਦਾ ਡਾਕਟਰ',
  'ent|ent doctor|ent specialist|otolaryngologist|ear nose throat|ear nose and throat ; kaan naak gala|कान नाक गला|ਕੰਨ ਨੱਕ ਗਲਾ',
  'dentist|dental surgeon|dentistry|oral surgeon|tooth doctor|teeth doctor ; dant ka doctor|दांत का डॉक्टर|दाँत का डॉक्टर|ਦੰਦਾਂ ਦਾ ਡਾਕਟਰ',
  'anaesthetist|anesthetist|anaesthesiologist|anesthesiologist|anaesthesia|anesthesia|numbing|sedation|epidural|spinal anaesthesia|nerve block|pain management|pain clinic|pain relief ; bayhoshi ki dawai|बेहोशी की दवा|एनेस्थीसिया|ਐਨੇਸਥੀਸੀਆ|ਬੇਹੋਸ਼ੀ ਦੀ ਦਵਾਈ',
  'general surgeon|general surgery|gen surgery|gen. surgery ; sarjan|सर्जन|ਸਰਜਨ',
  'dietitian|dietician|nutritionist|nutrition|diet|dieting|diet plan|diet chart|healthy eating|meal plan ; aahar|ahar|khana|khurak|आहार|खाना|खुराक|पोषण|डाइट|ਆਹਾਰ|ਖੁਰਾਕ|ਖਾਣਾ|ਡਾਇਟ',
  'physiotherapy|physio|physiotherapist|physical therapy|rehab|rehabilitation|exercise|exercises|therapy|massage|traction|mobility ; vyayam|vyayaam|kasrat|व्यायाम|फिजियोथेरेपी|फिज़ियो|ਕਸਰਤ|ਫਿਜ਼ਿਓਥੈਰੇਪੀ|ਫਿਜ਼ਿਓ',

  /* ------------------------------------------------------------------------ tests and scans */
  'test|tests|testing|investigation|investigations|lab|laboratory|pathology|microbiology|screening ; jaanch|janch|jaach|jaanchein|जांच|जाँच|टेस्ट|लैब|ਜਾਂਚ|ਟੈਸਟ|ਲੈਬ',
  'report|reports|result|results|lab report|test report ; report|reports|रिपोर्ट|ਰਿਪੋਰਟ',
  'blood test|cbc|blood count|complete blood count|hemoglobin|haemoglobin|platelet|platelets|esr ; khoon ki jaanch|khoon ka test|खून की जांच|खून की जाँच|ब्लड टेस्ट|ਖੂਨ ਦੀ ਜਾਂਚ|ਬਲੱਡ ਟੈਸਟ',
  'urine test|urine culture|stool test|sputum|culture ; peshab ki jaanch|पेशाब की जांच|ਪਿਸ਼ਾਬ ਦੀ ਜਾਂਚ',
  'biopsy|histopathology|pap smear|fnac ; biopsy|बायोप्सी|ਬਾਇਓਪਸੀ',
  'xray|x ray|x-ray|x rays|radiograph|radiography|chest xray|chest x ray ; xray|x ray|एक्सरे|एक्स रे|एक्स-रे|ਐਕਸਰੇ|ਐਕਸ ਰੇ',
  'ct|ct scan|cat scan|computed tomography|ct head|ct chest ; ct scan|city scan|सीटी स्कैन|सीटी|ਸੀਟੀ ਸਕੈਨ|ਸੀਟੀ',
  'mri|mri scan|magnetic resonance ; mri|एमआरआई|ਐਮਆਰਆਈ',
  'scan|scans|scanning|imaging|radiology|radiologist|radiologic ; scan|स्कैन|ਸਕੈਨ',
  'ultrasound|ultrasonography|usg|sonography|sonogram|ultra sound|pregnancy scan|baby scan|anomaly scan|abdomen scan ; sonography|sonografi|अल्ट्रासाउंड|सोनोग्राफी|ਅਲਟਰਾਸਾਊਂਡ|ਸੋਨੋਗ੍ਰਾਫੀ',
  'doppler|colour doppler|color doppler|duplex|vascular scan|blood flow ; doppler|डॉपलर|ਡੌਪਲਰ',
  'echo|echocardiogram|echocardiography|2d echo|tmt|treadmill|treadmill test|stress test|ecg|ekg ; eco|इको|ईको|इकोकार्डियोग्राम|टीएमटी|इसीजी|ਈਕੋ|ਈਸੀਜੀ|ਟੀਐਮਟੀ',
  'endoscopy|gastroscopy|colonoscopy|upper gi endoscopy|scope|scopy ; endoscopy|एंडोस्कोपी|ਐਂਡੋਸਕੋਪੀ',
  'checkup|check up|check-up|health check|health checkup|full body checkup|master health check|health package|health packages|package|packages|medical checkup|body checkup ; swasthya jaanch|स्वास्थ्य जांच|हेल्थ चेकअप|चेकअप|ਸਿਹਤ ਜਾਂਚ|ਚੈਕਅੱਪ',

  /* --------------------------------------------------------------------- hospital and pages */
  'emergency|casualty|urgent|critical|icu|iccu|24x7|24 7|24 hours|critical care|intensive care|ventilator|trauma center|trauma centre ; aapatkal|emergency|apatkal|hangami|आपातकाल|आपातकालीन|इमरजेंसी|ਐਮਰਜੈਂਸੀ|ਹੰਗਾਮੀ|ਆਪਾਤਕਾਲ',
  'ambulance|ambulence|ambulans|108|102|patient transport|stretcher|pickup|pick up ; ambulance|एम्बुलेंस|एंबुलेंस|ਐਂਬੂਲੈਂਸ|ਐਮਬੂਲੈਂਸ',
  'pharmacy|chemist|medical store|medical shop|medicine shop|drug store|medicines|medicine|drug|drugs|tablets|tablet|syrup|prescription ; dawai|dawa|dawaai|davai|दवा|दवाई|दवाइयां|दवाइयाँ|दवाखाना|ਦਵਾਈ|ਦਵਾਈਆਂ|ਦਵਾਖਾਨਾ',
  'book|booking|appointment|appointments|apointment|appoinment|slot|schedule|opd|consultation|consult|register|registration|token|visit doctor ; appointment|booking|parchi|time lena|अपॉइंटमेंट|अपॉइन्टमेंट|बुकिंग|बुक|पर्ची|ओपीडी|ਅਪਾਇੰਟਮੈਂਟ|ਬੁਕਿੰਗ|ਪਰਚੀ|ਓਪੀਡੀ',
  'phone|phone number|number|contact|contact number|call|helpline|mobile|mobile number|telephone|landline|reception|enquiry|inquiry ; phone|fon|sampark|poochtach|फोन|फ़ोन|नंबर|नम्बर|संपर्क|पूछताछ|ਫ਼ੋਨ|ਫੋਨ|ਨੰਬਰ|ਸੰਪਰਕ|ਪੁੱਛਗਿੱਛ',
  'address|location|map|directions|direction|route|how to reach|how to come|reach|navigate|google map|google maps|jindal chowk|where is ; pata|raasta|rasta|kahan|dishanirdesh|पता|रास्ता|कहाँ|कहां|दिशा-निर्देश|ਪਤਾ|ਰਸਤਾ|ਕਿੱਥੇ|ਕਿਥੇ',
  'timing|timings|hours|opening hours|open|closed|visiting hours|visit time ; samay|time|kab|समय|टाइमिंग|कब|ਸਮਾਂ|ਟਾਈਮਿੰਗ|ਕਦੋਂ',
  'visitor|visitors|visiting|attendant|attendants|visiting pass|ward|room|bed|admission|admit|admitted|discharge ; mulakat|milne|bharti|मुलाकात|मिलने|भर्ती|वार्ड|ਮੁਲਾਕਾਤ|ਮਿਲਣ|ਭਰਤੀ|ਵਾਰਡ',
  'insurance|mediclaim|cashless|tpa|cghs|ayushman|ayushman bharat|pmjay|pm-jay|health card|esi|esic|policy|claim|reimbursement ; bima|बीमा|कैशलेस|आयुष्मान|ਬੀਮਾ|ਕੈਸ਼ਲੈੱਸ|ਆਯੁਸ਼ਮਾਨ',
  'price|prices|cost|charges|charge|fee|fees|rate|rates|how much|billing|bill|payment|pay|discount|concession|free ; kitna|paisa|paise|muft|kharcha|कितना|पैसा|पैसे|मुफ्त|खर्चा|फीस|ਕਿੰਨਾ|ਪੈਸੇ|ਮੁਫ਼ਤ|ਖਰਚਾ|ਫੀਸ',
  'abha|abha id|abha card|abha number|health id|health account|abdm|digital health id|ayushman bharat health account ; abha|aabha|आभा|आभा कार्ड|आभा आईडी|ਆਭਾ|ਆਭਾ ਕਾਰਡ',
  'whatsapp|whatsap|whats app|watsapp|chat|message|msg|text ; whatsapp|व्हाट्सएप|व्हाट्सऐप|वॉट्सऐप|चैट|ਵਟਸਐਪ|ਵਟਸਅੱਪ|ਚੈਟ',
  'article|articles|library|health library|information|tips|advice|guide|blog|learn ; jaankari|jankari|जानकारी|लेख|ਜਾਣਕਾਰੀ|ਲੇਖ',
  'about|hospital|lims|lifeline|institute|about us|clinic|nursing home|who we are ; aspatal|hospital|अस्पताल|हॉस्पिटल|ਹਸਪਤਾਲ|ਹਾਸਪਿਟਲ',
  'complaint|grievance|feedback|suggestion ; shikayat|शिकायत|ਸ਼ਿਕਾਇਤ',
  'parking ; parking|पार्किंग|ਪਾਰਕਿੰਗ',
  'specialities|specialties|speciality|specialty|departments|department|services|service ; vibhag|vibhaag|विभाग|सेवाएं|ਵਿਭਾਗ|ਸੇਵਾਵਾਂ',
]

/**
 * Words and phrases that mean someone may need emergency care now. A match pins the Emergency
 * Services card, with the emergency number, above every other result. This is not a diagnosis and
 * it is deliberately cautious: "chest pain" pins it however the sentence continues.
 *
 * Each entry is a phrase; every word of it must appear in the query, in any order. The same
 * "English ; Hindi/Punjabi" split as GROUPS, with alternatives separated by "|".
 */
export const EMERGENCY_PHRASES: readonly string[] = [
  'chest pain|chest tightness|heart attack|cardiac arrest|stroke|paralysis|cannot breathe|cant breathe|can not breathe|not breathing|difficulty breathing|breathing difficulty|severe breathlessness|unconscious|fainted|seizure|seizures|fits|convulsion|convulsions|severe bleeding|heavy bleeding|bleeding heavily|road accident|accident|head injury|snake bite|snakebite|poisoning|poison|overdose|dog bite|animal bite|monkey bite|electric shock|drowning|choking|severe burn|severe burns|serious injury|emergency ; seene mein dard|seene me dard|chhati dard|chati me dard|dil ka daura|lakwa|behosh|behoshi|saans nahi|sans nahi|accident|durghatna|saanp ne kata|kutte ne kata|kutta kata|zeher|सीने में दर्द|छाती में दर्द|दिल का दौरा|लकवा|बेहोश|बेहोशी|सांस नहीं|साँस नहीं|दुर्घटना|सांप ने काटा|कुत्ते ने काटा|ज़हर|जहर|ਛਾਤੀ ਵਿੱਚ ਦਰਦ|ਦਿਲ ਦਾ ਦੌਰਾ|ਲਕਵਾ|ਬੇਹੋਸ਼|ਸਾਹ ਨਹੀਂ|ਹਾਦਸਾ|ਸੱਪ ਨੇ ਡੰਗਿਆ|ਜ਼ਹਿਰ',
]
