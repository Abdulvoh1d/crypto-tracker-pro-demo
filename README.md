# Crypto Tracker Pro

Crypto Tracker Pro — namunaviy kriptoaktivlar watchlist’i va sintetik narx grafigini ko‘rsatadigan, brauzerda ishlovchi yengil demo ilova.

## Havolalar

- [Jonli demo](https://crypto-tracker-pro-demo.netlify.app)
- [GitHub repository](https://github.com/Abdulvoh1d/crypto-tracker-pro-demo)

## Loyiha nimani ko‘rsatadi?

Ilova kripto bozorini kuzatish paneli ko‘rinishidagi interfeysni namoyish etadi: kuzatuv ro‘yxati, tanlangan aktiv uchun narx va foiz o‘zgarishi, qisqacha namunaviy ko‘rsatkichlar hamda SVG narx grafigi. Ekrandagi qiymatlar va grafik yo‘li faqat demo uchun yaratilgan; ular joriy yoki tarixiy bozor ma’lumoti emas.

## Tasdiqlangan funksiyalar

- BTC, ETH, SOL va ADA’dan iborat boshlang‘ich watchlist; namunaviy katalogda jami sakkizta aktiv bor.
- Watchlist’ni aktiv nomi yoki belgisi bo‘yicha qidirish; `/` tugmasi qidiruv maydoniga fokus beradi.
- Aktivni tanlab, uning namunaviy narxi, 24 soatlik foiz o‘zgarishi va grafigini ko‘rish.
- Sintetik SVG grafik ko‘rinishini `1D`, `7D` va `1M` oraliqlariga almashtirish.
- Katalogdan mavjud namunaviy aktivni qo‘shish yoki watchlist’dan olib tashlash; aktivlar soni va ro‘yxatdagi eng yuqori namunaviy 24 soatlik o‘zgarishni qayta hisoblash.
- Qidiruv natijasi bo‘lmaganda bo‘sh holat xabari; turli ekran o‘lchamlariga moslashadigan, klaviatura orqali boshqariladigan interfeys.

## Texnologiyalar

- **HTML5** — sahifa tuzilishi va semantik elementlar.
- **CSS3** — dizayn va moslashuvchan joylashuv.
- **Vanilla JavaScript** — interfeys, qidiruv, watchlist boshqaruvi va grafikni yangilash.
- **Brauzer DOM va hodisalari**, **SVG** — interfeys bilan ishlash va grafik chizish.

Framework, server, ma’lumotlar bazasi, tashqi API, to‘lov xizmati yoki WebSocket ishlatilmaydi. `localStorage` ham ishlatilmaydi.

## Talablar va mahalliy ishga tushirish

Git, Python 3 va zamonaviy veb-brauzer kerak. Node.js yoki paket o‘rnatish talab qilinmaydi.

```bash
git clone https://github.com/Abdulvoh1d/crypto-tracker-pro-demo.git
cd crypto-tracker-pro-demo
python3 -m http.server 8765
```

Brauzerda <http://localhost:8765> manzilini oching. Server ishlayotgan terminal oynasini ochiq qoldiring. `npm install` yoki build buyrug‘i kerak emas.

## Fayl tuzilishi

```text
crypto-tracker-pro-demo/
├── index.html   # Sahifa tuzilishi va interfeys elementlari
├── app.js       # Demo ma’lumotlari va brauzer ichidagi xatti-harakatlar
├── styles.css   # Uslublar va moslashuvchan dizayn
└── README.md    # Loyiha haqida ma’lumot va ishga tushirish yo‘riqnomasi
```

## Ma’lumotlar, maxfiylik va demo-chegaralari

Narxlar, foizlar va grafik yo‘llari JavaScript ichida saqlanadigan sintetik misollardir. Ilova birjaga yoki jonli bozor oqimiga ulanmaydi; haqiqiy kotirovkalarni, tarixiy ko‘rsatkichlarni yoki moliyaviy maslahatni bermaydi. Ma’lumotlar faqat ko‘rgazmali maqsadda — savdo yoki investitsiya qarorlarida foydalanish uchun emas.

Watchlist’ga qo‘shish va olib tashlash kabi o‘zgarishlar joriy sahifa sessiyasida xotirada saqlanadi; sahifani qayta yuklasangiz, boshlang‘ich ro‘yxat tiklanadi. Brauzerda `localStorage` orqali saqlash yo‘q. Ilova funksiyalari uchun akkaunt, server yoki tashqi xizmat ulanishi talab qilinmaydi.

## Litsenziya

Repozitoriy ildizida `LICENSE` fayli mavjud emas. Ommaviy repozitoriy bo‘lishi loyihaga avtomatik ravishda ochiq litsenziya bermaydi; qayta foydalanish shartlarini aniqlash uchun muallifdan ruxsat yoki litsenziya oling.
