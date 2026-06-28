const fs = require('fs');
const en = JSON.parse(fs.readFileSync('src/locales/en.json', 'utf8'));
const zh = JSON.parse(fs.readFileSync('src/locales/zh.json', 'utf8'));

const newIconsEn = [
  {
    name: 'Big Ben',
    sub: 'Elizabeth Tower',
    description: "The iconic clock tower and the gothic majesty of the Houses of Parliament, symbols of British resilience and democracy standing tall on the banks of the River Thames.",
    location: 'Westminster, London'
  },
  {
    name: 'Buckingham',
    sub: 'Buckingham Palace',
    description: "The London residence and administrative headquarters of the monarch of the United Kingdom, renowned for its neoclassical architecture and the Changing of the Guard.",
    location: 'Westminster, London'
  },
  {
    name: 'Edinburgh',
    sub: 'Edinburgh Castle',
    description: "A historic fortress dominating the skyline of Scotland's capital from its position on Castle Rock. It has played a pivotal role in Scottish history for over a millennium.",
    location: 'Edinburgh, Scotland'
  },
  {
    name: 'British Museum',
    sub: 'The British Museum',
    description: "A public museum dedicated to human history, art and culture, housing a permanent collection of some eight million works, among the largest and most comprehensive in existence.",
    location: 'Bloomsbury, London'
  }
];

const newIconsZh = [
  {
    name: '大本钟',
    sub: '伊丽莎白塔',
    description: '标志性的钟楼与威严的哥特式议会大厦，作为英国坚韧与民主的象征，傲然矗立在泰晤士河畔。',
    location: '伦敦，威斯敏斯特'
  },
  {
    name: '白金汉宫',
    sub: '皇家官邸',
    description: '英国君主在伦敦的寝宫及办公处，以其宏伟的新古典主义建筑风格和著名的皇家卫队换岗仪式闻名于世。',
    location: '伦敦，威斯敏斯特'
  },
  {
    name: '爱丁堡城堡',
    sub: '苏格兰历史堡垒',
    description: '一座俯瞰苏格兰首府天际线的历史堡垒，雄踞于城堡岩之上，在过去的一千多年里在苏格兰历史中扮演了极其关键的角色。',
    location: '苏格兰，爱丁堡'
  },
  {
    name: '大英博物馆',
    sub: 'The British Museum',
    description: '世界上规模最大、最著名的博物馆之一，致力于人类历史、艺术与文化，馆藏高达800万件，是人类文明的宏大宝库。',
    location: '伦敦，布卢姆茨伯里'
  }
];

// Note: Big Ben already existed in the original array as index 0! 
// Let's filter out duplicates just in case.
en.chapterIcons.landmarks = en.chapterIcons.landmarks.filter(l => l.name !== 'Big Ben');
zh.chapterIcons.landmarks = zh.chapterIcons.landmarks.filter(l => l.name !== '大本钟');

en.chapterIcons.landmarks = [...en.chapterIcons.landmarks, ...newIconsEn];
zh.chapterIcons.landmarks = [...zh.chapterIcons.landmarks, ...newIconsZh];

fs.writeFileSync('src/locales/en.json', JSON.stringify(en, null, 2));
fs.writeFileSync('src/locales/zh.json', JSON.stringify(zh, null, 2));
console.log('Locales updated successfully');
