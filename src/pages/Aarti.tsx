
import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import { Bell, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample Aarti data
const aartis = [
  {
    id: 1,
    title: "श्री गणेश आरती",
    titleEn: "Shri Ganesh Aarti",
    deity: "Lord Ganesh",
    content: `जय गणेश, जय गणेश, जय गणेश देवा।
माता जाकी पार्वती, पिता महादेवा॥

एक दंत दयावंत, चार भुजा धारी।
माथे पर तिलक सोहे, मूसे की सवारी॥

जय गणेश, जय गणेश, जय गणेश देवा।
माता जाकी पार्वती, पिता महादेवा॥

अंधन को आंख देत, कोढ़िन को काया।
बांझन को पुत्र देत, निर्धन को माया॥

जय गणेश, जय गणेश, जय गणेश देवा।
माता जाकी पार्वती, पिता महादेवा॥

हार चढ़े, फूल चढ़े और चढ़े मेवा।
लड्डुअन का भोग लगे, संत करें सेवा॥

जय गणेश, जय गणेश, जय गणेश देवा।
माता जाकी पार्वती, पिता महादेवा॥

दीनन की लाज रखो, शंकर सुतवंता।
कृपा करो, कृपा करो, कृपा करो भगवंता॥

जय गणेश, जय गणेश, जय गणेश देवा।
माता जाकी पार्वती, पिता महादेवा॥`
  },
  {
    id: 2,
    title: "ॐ जय लक्ष्मी माता",
    titleEn: "Om Jai Lakshmi Mata",
    deity: "Goddess Lakshmi",
    content: `ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता।
तुमको निशदिन सेवत, हरि विष्णु विधाता॥
ॐ जय लक्ष्मी माता॥

उमा, रमा, ब्रह्माणी, तुम ही जग-माता।
सूर्य-चंद्रमा ध्यावत, नारद ऋषि गाता॥
ॐ जय लक्ष्मी माता॥

दुर्गा रूप निरंजनी, सुख सम्पत्ति दाता।
जो कोई तुमको ध्यावत, ऋद्धि-सिद्धि धन पाता॥
ॐ जय लक्ष्मी माता॥

तुम पाताल-निवासिनी, तुम ही शुभदाता।
कर्म-प्रभाव-प्रकाशिनी, भवनिधि की त्राता॥
ॐ जय लक्ष्मी माता॥

जिस घर में तुम रहतीं, सब सद्गुण आता।
सब सम्भव हो जाता, मन नहीं घबराता॥
ॐ जय लक्ष्मी माता॥

तुम बिन यज्ञ न होते, वस्त्र न कोई पाता।
खान-पान का वैभव, सब तुमसे आता॥
ॐ जय लक्ष्मी माता॥

शुभ-गुण मन्दिर सुन्दर, क्षीरोदधि-जाता।
रत्न चतुर्दश तुम बिन, कोई नहीं पाता॥
ॐ जय लक्ष्मी माता॥

महालक्ष्मीजी की आरती, जो कोई जन गाता।
उर आनन्द समाता, पाप उतर जाता॥
ॐ जय लक्ष्मी माता॥`
  },
  {
    id: 3,
    title: "कृष्ण आरती",
    titleEn: "Krishna Aarti",
    deity: "Lord Krishna",
    content: `श्री कृष्ण गोविन्द हरे मुरारि हे नाथ नारायण वासुदेवा।
श्री कृष्ण गोविन्द हरे मुरारि॥

पीताम्बर धर राजीव लोचन, चन्द्र वदन मुख सार।
चरन-कंज मृदु मंजु पदायुत, शेष सेव्य झुंकार॥
श्री कृष्ण गोविन्द हरे मुरारि॥

सौरभ पुष्प हार, राज मकुट बेसर सन्हाते।
अंग-अंग रुचिराभरन, वनमाला त्रियबांते॥
श्री कृष्ण गोविन्द हरे मुरारि॥

कोमलता विरचित सुखदायक, हिय विहार मनहारी।
नन्द यशोदा सुख फलदायक, ब्रज अवतार बिहारी॥
श्री कृष्ण गोविन्द हरे मुरारि॥

जरा मरन भय हरन धरा भार, दुख अपहारी भारी।
भक्त वत्सल गुन ग्राहक सब विधि, नितहि कल्यानकारी॥
श्री कृष्ण गोविन्द हरे मुरारि॥

तुम्ही एक अनन्य भरोसो, तुम्ही एक आधारा।
तुम बिन दूसर कोउ नहीं दाता, जग के पालन हारा॥
श्री कृष्ण गोविन्द हरे मुरारि॥`
  },
  {
    id: 4,
    title: "शिव आरती",
    titleEn: "Shiv Aarti",
    deity: "Lord Shiva",
    content: `ॐ जय शिव ओंकारा, स्वामी जय शिव ओंकारा।
ब्रह्मा, विष्णु, सदाशिव, अर्द्धांगी धारा॥
ॐ जय शिव ओंकारा॥

एकानन, चतुरानन, पंचानन राजे।
हंसासन, गरूड़ासन, वृषवाहन साजे॥
ॐ जय शिव ओंकारा॥

दो भुज, चार चतुर्भुज, दशभुज ते सोहे।
तीनों रूप निरखता, त्रिभुवन जन मोहे॥
ॐ जय शिव ओंकारा॥

अक्षमाला वनमाला, मुण्डमाला धारी।
त्रिपुरारी कंसारी, कर माला धारी॥
ॐ जय शिव ओंकारा॥

श्वेताम्बर, पीताम्बर, बाघम्बर अंगे।
सनकादिक, गरुणादिक, भूतादिक संगे॥
ॐ जय शिव ओंकारा॥

कर के मध्य कमण्डल, चक्र त्रिशूल धारता।
जगकर्ता, जगभर्ता, जगसंहार करता॥
ॐ जय शिव ओंकारा॥

ब्रह्मा, विष्णु, सदाशिव, जानत अविवेका।
प्रणवाक्षर के मध्ये, ये तीनों एका॥
ॐ जय शिव ओंकारा॥

त्रिगुण स्वामी जी की आरती जो कोई गावे।
कहत शिवानन्द स्वामी, मनवांछित फल पावे॥
ॐ जय शिव ओंकारा॥`
  },
  {
    id: 5,
    title: "हनुमान आरती",
    titleEn: "Hanuman Aarti",
    deity: "Lord Hanuman",
    content: `आरती कीजै हनुमान लला की।
दुष्ट दलन रघुनाथ कला की॥
आरती कीजै हनुमान लला की॥

जाके बल से गिरिवर काँपे।
रोग दोष जाके निकट न झाँके॥
आरती कीजै हनुमान लला की॥

अंजनि पुत्र महा बलदाई।
संतन के प्रभु सदा सहाई॥
आरती कीजै हनुमान लला की॥

दे बीरा रघुनाथ पठाए।
लंका जारि सीता सुधि लाए॥
आरती कीजै हनुमान लला की॥

लंका सो कोट समुद्र सी खाई।
जात पवनसुत बार न लाई॥
आरती कीजै हनुमान लला की॥

लंका जारि असुर संहारे।
सियारामजी के काज सँवारे॥
आरती कीजै हनुमान लला की॥

लक्ष्मण मूर्छित पड़े सकारे।
आनि संजीवन प्राण उबारे॥
आरती कीजै हनुमान लला की॥

पैठि पाताल तोरि जम कारे।
अहिरावण की भुजा उखारे॥
आरती कीजै हनुमान लला की॥

बाएँ भुजा असुरदल मारे।
दाहिने भुजा संतजन तारे॥
आरती कीजै हनुमान लला की॥`
  }
];

const Aarti = () => {
  const [expandedAarti, setExpandedAarti] = useState<number | null>(null);

  const toggleAarti = (id: number) => {
    if (expandedAarti === id) {
      setExpandedAarti(null);
    } else {
      setExpandedAarti(id);
    }
  };

  return (
    <Layout>
      <div className="bg-devotional-cream py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-devotional-maroon text-center">आरती संग्रह</h1>
          <p className="text-center text-devotional-maroon/70 mt-2">Collection of Sacred Aartis</p>
          <div className="flex justify-center mt-4">
            <div className="w-20 h-1 bg-devotional-orange rounded-full"></div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 flex flex-col items-center">
            <Bell className="h-10 w-10 text-devotional-red animate-slow-spin mb-4" />
            <p className="text-lg text-devotional-maroon/80">
              आरती भगवान को समर्पित प्रेम, श्रद्धा और भक्ति का प्रतीक है। यह दीप के प्रकाश से अंधकार को दूर करने का प्रतीक है, जैसे भगवान हमारे जीवन से अज्ञान के अंधकार को दूर करते हैं।
            </p>
          </div>
          
          <div className="space-y-6">
            {aartis.map((aarti) => (
              <div key={aarti.id} className="card-devotional overflow-hidden">
                <Button
                  variant="ghost"
                  onClick={() => toggleAarti(aarti.id)}
                  className="w-full flex justify-between items-center p-4 text-left hover:bg-devotional-lightOrange/20"
                >
                  <div>
                    <h3 className="text-xl font-bold text-devotional-maroon">
                      {aarti.title}
                    </h3>
                    <p className="text-devotional-maroon/70 text-sm">
                      {aarti.titleEn} - {aarti.deity}
                    </p>
                  </div>
                  {expandedAarti === aarti.id ? (
                    <ChevronUp className="h-5 w-5 text-devotional-orange" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-devotional-orange" />
                  )}
                </Button>
                
                {expandedAarti === aarti.id && (
                  <div className="p-6 bg-devotional-cream/50 border-t border-devotional-orange/10 animate-devotional-fade">
                    <pre className="whitespace-pre-wrap font-hindi text-devotional-maroon/90 leading-relaxed">
                      {aarti.content}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-6 bg-devotional-lightOrange/30 rounded-lg text-center">
            <h3 className="text-xl font-bold text-devotional-maroon mb-3">
              आरती महत्व
            </h3>
            <p className="text-devotional-maroon/80 mb-4">
              आरती के समय मन को शांत रखें और पूरी श्रद्धा से भगवान को समर्पित करें। आरती का उद्देश्य केवल गाना ही नहीं है, बल्कि भगवान से एक गहरा संबंध स्थापित करना है।
            </p>
            <p className="text-devotional-maroon/90 font-medium">
              "भक्ति में शुद्धता, आरती में दिव्यता"
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Aarti;
