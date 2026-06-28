const fs = require('fs');

const en = JSON.parse(fs.readFileSync('src/locales/en.json', 'utf8'));
const zh = JSON.parse(fs.readFileSync('src/locales/zh.json', 'utf8'));

en.chapterVictorian = {
  chapter_title: 'Chapter 03 — Victorian Heritage',
  title: 'Victorian London',
  description: 'Stately Victorian townhouses wrapped in elaborate, dark wrought iron railings line the peaceful residential streets of Chelsea and Kensington. Wet asphalt after a sudden heavy rain shower glistens in the twilight, glowing with the rich, ambient amber reflections of heritage streetlamps. The deep crimson pop of an iconic K6 telephone kiosk or a passing double-decker bus creates a striking, unforgettable contrast against the moody, slate-gray skies. This delicate interplay of texture, color, and vintage atmosphere forms the eternal visual pulse of historical London, inviting you to wander through paths carved by time.',
  scroll: 'Scroll Stabilized for Reading',
  img1_title: 'Westminster crossing',
  img1_desc: '03.A — Dynamic Contrast',
  img2_title: 'Rain Reflections',
  img2_desc: 'London W1 • England',
  img3_title: 'Wrought Iron Facades',
  img3_desc: '03.C — W11 Townhouses'
};

zh.chapterVictorian = {
  chapter_title: '第三章 — 维多利亚遗产',
  title: '维多利亚时代的伦敦',
  description: '切尔西与肯辛顿宁静的住宅街道旁，宏伟的维多利亚式联排别墅被精美的深色锻铁栏杆环绕。阵雨过后，湿润的柏油路面在暮色中闪烁，映出传统街灯浓郁琥珀色的光芒。标志性的K6电话亭与驶过的双层巴士那一抹深红，在阴郁的石板灰天空映衬下，形成令人难忘的强烈对比。纹理、色彩与复古氛围的精妙交织，构成了历史悠久的伦敦永恒的视觉脉动，邀请你漫步于时光雕刻的轨迹中。',
  scroll: '阅读滚动稳定',
  img1_title: '威斯敏斯特路口',
  img1_desc: '03.A — 动态对比',
  img2_title: '雨中倒影',
  img2_desc: '英格兰 • 伦敦 W1',
  img3_title: '锻铁外墙',
  img3_desc: '03.C — W11 联排别墅'
};

en.chapterNightfall = {
  chapter_title: 'Chapter 07 — Nightfall',
  title_part1: 'The River of',
  title_part2: 'Shadows',
  description: 'As the twilight of the blue hour deepens, the city’s sharp concrete edges dissolve into soft, artistic shadows. Under an endless, shimmering starlit dome, the historic River Thames flows like a dark velvet ribbon, mirroring centuries of legendary stories illuminated by the vibrant, golden glows of modern skyscrapers. The hectic metropolitan pace slows to a gentle murmur. The glowing skyline reflects beautifully off the calm ripples of the water, and a peaceful, majestic silence settles over the ancient city once more, bridging its rich, storied past with an enduring, brilliant future.',
  scroll: 'Scroll Stabilized for Reading',
  status_label: 'Metropolis Status',
  status_value: 'Lulled to Sleep',
  time_label: 'Local Time',
  time_value: '23:00 GMT'
};

zh.chapterNightfall = {
  chapter_title: '第七章 — 夜幕降临',
  title_part1: '暗影之',
  title_part2: '河',
  description: '随着蓝调时刻的暮色渐深，城市锐利的混凝土边缘消融在柔和而充满艺术感的阴影中。在无尽闪烁的星空穹顶下，历史悠久的泰晤士河宛如一条深色天鹅绒丝带般流淌，倒映着现代摩天大楼那充满活力的金色光辉照耀下的数个世纪传奇故事。繁忙的大都市节奏放缓为轻柔的低语。发光的天际线美丽地倒映在平静的水波涟漪上，宁静而庄严的沉寂再次降临这座古城，将其丰富、充满故事的过去与持久、灿烂的未来连接起来。',
  scroll: '阅读滚动稳定',
  status_label: '大都会状态',
  status_value: '安然入睡',
  time_label: '当地时间',
  time_value: '格林威治标准时间 23:00'
};

fs.writeFileSync('src/locales/en.json', JSON.stringify(en, null, 2));
fs.writeFileSync('src/locales/zh.json', JSON.stringify(zh, null, 2));
