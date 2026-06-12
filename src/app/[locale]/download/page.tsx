import type { Metadata } from 'next';
import Image from 'next/image';
import { CheckCircle2, ChevronRight, Download, ExternalLink, Settings, ShieldCheck, Smartphone } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { locales, type Locale } from '@/i18n';
import { siteConfig } from '@/data/site-config';
import { androidApkFileName, androidApkUrl, androidInstallSteps } from '@/lib/mobile-app-download';

type DownloadCopy = {
  badge: string;
  title: string;
  subtitle: string;
  cta: string;
  fileLabel: string;
  benefitsTitle: string;
  installTitle: string;
  installIntro: string;
  installSteps: string[];
  safetyTitle: string;
  safetyText: string;
  supportTitle: string;
  supportText: string;
  supportCta: string;
};

const copy: Record<Locale, DownloadCopy> = {
  en: {
    badge: 'Android App',
    title: 'Download the Silk Beauty Android app',
    subtitle: 'Book appointments, browse treatments, and keep salon details close while you are in Batumi.',
    cta: 'Download APK',
    fileLabel: 'Release APK',
    benefitsTitle: 'Built for salon visits',
    installTitle: 'How to install',
    installIntro:
      'Because this app is distributed directly from Silk Beauty Salon, Android may ask you to allow installation from your browser or file manager.',
    installSteps: androidInstallSteps,
    safetyTitle: 'Direct download',
    safetyText:
      'The APK is signed through EAS Build and provided by Silk Beauty Salon. It is not published through Google Play.',
    supportTitle: 'Need help installing?',
    supportText: 'Message the salon team and we will guide you through the Android prompt.',
    supportCta: 'Contact us',
  },
  ka: {
    badge: 'Android აპი',
    title: 'ჩამოტვირთეთ Silk Beauty Android აპი',
    subtitle: 'დაჯავშნეთ ვიზიტი, დაათვალიერეთ მომსახურებები და შეინახეთ სალონის ინფორმაცია ბათუმში ყოფნისას.',
    cta: 'APK-ის ჩამოტვირთვა',
    fileLabel: 'Release APK',
    benefitsTitle: 'შექმნილია სალონში ვიზიტებისთვის',
    installTitle: 'როგორ დააყენოთ',
    installIntro:
      'აპი პირდაპირ Silk Beauty Salon-იდან ვრცელდება, ამიტომ Android-მა შეიძლება მოგთხოვოთ ბრაუზერის ან ფაილების მენეჯერისთვის ინსტალაციის ნებართვა.',
    installSteps: [
      'ჩამოტვირთეთ APK თქვენს Android ტელეფონზე.',
      'Android-ის მოთხოვნისას ნება დართეთ ბრაუზერს ან ფაილების მენეჯერს unknown apps-ის ინსტალაციაზე.',
      'გახსენით ჩამოტვირთული ფაილი და დააჭირეთ Install-ს.',
    ],
    safetyTitle: 'პირდაპირი ჩამოტვირთვა',
    safetyText: 'APK ხელმოწერილია EAS Build-ით და მოწოდებულია Silk Beauty Salon-ის მიერ. ის Google Play-ში არ ქვეყნდება.',
    supportTitle: 'ინსტალაციაში დახმარება გჭირდებათ?',
    supportText: 'მოგვწერეთ და Android-ის მოთხოვნის გავლაში დაგეხმარებით.',
    supportCta: 'კონტაქტი',
  },
  ru: {
    badge: 'Android приложение',
    title: 'Скачайте Android-приложение Silk Beauty',
    subtitle: 'Записывайтесь, просматривайте процедуры и держите информацию салона под рукой в Батуми.',
    cta: 'Скачать APK',
    fileLabel: 'Release APK',
    benefitsTitle: 'Для удобных визитов в салон',
    installTitle: 'Как установить',
    installIntro:
      'Так как приложение распространяется напрямую от Silk Beauty Salon, Android может попросить разрешить установку из браузера или файлового менеджера.',
    installSteps: [
      'Скачайте APK на Android-телефон.',
      'Когда Android попросит, разрешите браузеру или файловому менеджеру устанавливать unknown apps.',
      'Откройте загруженный файл и нажмите Install.',
    ],
    safetyTitle: 'Прямая загрузка',
    safetyText: 'APK подписан через EAS Build и предоставлен Silk Beauty Salon. Он не опубликован в Google Play.',
    supportTitle: 'Нужна помощь с установкой?',
    supportText: 'Напишите команде салона, и мы подскажем, как пройти Android-подтверждение.',
    supportCta: 'Связаться',
  },
  tr: {
    badge: 'Android Uygulamasi',
    title: 'Silk Beauty Android uygulamasini indirin',
    subtitle: 'Randevu alin, tedavilere bakin ve Batumdayken salon bilgilerini elinizin altinda tutun.',
    cta: 'APK indir',
    fileLabel: 'Release APK',
    benefitsTitle: 'Salon ziyaretleri icin tasarlandi',
    installTitle: 'Nasil kurulur',
    installIntro:
      'Bu uygulama dogrudan Silk Beauty Salon tarafindan dagitildigi icin Android, tarayiciniz veya dosya yoneticiniz icin yukleme izni isteyebilir.',
    installSteps: [
      'APK dosyasini Android telefonunuza indirin.',
      'Android sordugunda tarayiciya veya dosya yoneticisine unknown apps yukleme izni verin.',
      'Indirilen dosyayi acin ve Install secenegine dokunun.',
    ],
    safetyTitle: 'Dogrudan indirme',
    safetyText: 'APK, EAS Build ile imzalanir ve Silk Beauty Salon tarafindan saglanir. Google Play uzerinden yayinlanmaz.',
    supportTitle: 'Kurulum yardimi mi gerekiyor?',
    supportText: 'Salon ekibine yazin, Android uyarisi boyunca size yardim edelim.',
    supportCta: 'Bize ulasin',
  },
  ar: {
    badge: 'تطبيق Android',
    title: 'حمّلي تطبيق Silk Beauty لنظام Android',
    subtitle: 'احجزي المواعيد، تصفحي العلاجات، واحتفظي بتفاصيل الصالون قريبة أثناء وجودك في باتومي.',
    cta: 'تحميل APK',
    fileLabel: 'Release APK',
    benefitsTitle: 'مصمم لزيارات الصالون',
    installTitle: 'طريقة التثبيت',
    installIntro:
      'لأن التطبيق موزع مباشرة من Silk Beauty Salon، قد يطلب Android السماح بالتثبيت من المتصفح أو مدير الملفات.',
    installSteps: [
      'حمّلي ملف APK على هاتف Android.',
      'عندما يطلب Android ذلك، اسمحي للمتصفح أو مدير الملفات بتثبيت unknown apps.',
      'افتحي الملف الذي تم تنزيله واضغطي Install.',
    ],
    safetyTitle: 'تحميل مباشر',
    safetyText: 'تم توقيع ملف APK عبر EAS Build ويتم توفيره من Silk Beauty Salon. التطبيق غير منشور على Google Play.',
    supportTitle: 'هل تحتاجين مساعدة في التثبيت؟',
    supportText: 'راسلي فريق الصالون وسنرشدك خلال رسالة Android.',
    supportCta: 'اتصلي بنا',
  },
  he: {
    badge: 'אפליקציית Android',
    title: 'הורידו את אפליקציית Android של Silk Beauty',
    subtitle: 'הזמינו תורים, עיינו בטיפולים ושמרו את פרטי הסלון קרובים בזמן שאתם בבאטומי.',
    cta: 'הורדת APK',
    fileLabel: 'Release APK',
    benefitsTitle: 'נבנתה לביקורים בסלון',
    installTitle: 'איך מתקינים',
    installIntro:
      'מכיוון שהאפליקציה מופצת ישירות מ-Silk Beauty Salon, Android עשוי לבקש לאפשר התקנה מהדפדפן או ממנהל הקבצים.',
    installSteps: [
      'הורידו את קובץ ה-APK לטלפון Android.',
      'כאשר Android מבקש, אפשרו לדפדפן או למנהל הקבצים להתקין unknown apps.',
      'פתחו את הקובץ שהורד ולחצו Install.',
    ],
    safetyTitle: 'הורדה ישירה',
    safetyText: 'ה-APK חתום דרך EAS Build ומסופק על ידי Silk Beauty Salon. הוא אינו מפורסם ב-Google Play.',
    supportTitle: 'צריכים עזרה בהתקנה?',
    supportText: 'שלחו הודעה לצוות הסלון ונדריך אתכם בתהליך Android.',
    supportCta: 'יצירת קשר',
  },
};

function getCopy(locale: string) {
  return copy[(locale as Locale) in copy ? (locale as Locale) : 'en'];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const pageCopy = getCopy(locale);

  return {
    title: `${pageCopy.title} | ${siteConfig.name}`,
    description: pageCopy.subtitle,
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const pageCopy = getCopy(locale);
  const isHostedFile = androidApkUrl.startsWith('/');

  return (
    <>
      <section className="bg-[#f7f2eb] pt-[170px] md:pt-[188px]">
        <div className="container-custom py-16 md:py-20">
          <nav className="mb-8 flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-stone-500">
            <Link href="/" className="hover:text-[#241f1b]">
              {siteConfig.name}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#241f1b]">{pageCopy.badge}</span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-[48%_52%]">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d9cec1] bg-white/70 px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.24em] text-[#8d6f58]">
                <Smartphone className="h-4 w-4" />
                {pageCopy.badge}
              </div>
              <h1 className="mb-6 font-sans text-[clamp(2.9rem,5.6vw,5.8rem)] font-light leading-[1.02] text-[#241f1b]">
                {pageCopy.title}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-stone-700">{pageCopy.subtitle}</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href={androidApkUrl}
                  download={isHostedFile ? androidApkFileName : undefined}
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-md bg-[#241f1b] px-7 py-4 text-sm font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#8d6f58]"
                >
                  <Download className="h-5 w-5" />
                  {pageCopy.cta}
                </a>
                <Link
                  href="/contact-us"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-md border border-[#d9cec1] bg-white px-7 py-4 text-sm font-medium uppercase tracking-[0.18em] text-[#241f1b] transition-colors hover:bg-[#f3ece3]"
                >
                  {pageCopy.supportCta}
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[8px] border border-[#e8e4df] bg-white shadow-[0_24px_80px_rgba(36,31,27,0.10)]">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/hero-poster.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 52vw"
                />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.24em] text-stone-500">{pageCopy.fileLabel}</p>
                    <p className="mt-2 break-words text-xl font-light text-[#241f1b]">{androidApkFileName}</p>
                  </div>
                  <ShieldCheck className="h-9 w-9 shrink-0 text-[#8d6f58]" />
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[pageCopy.benefitsTitle, pageCopy.safetyTitle, pageCopy.installTitle].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-stone-700">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#8d6f58]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="container-custom grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="mb-5 font-sans text-3xl font-light text-[#241f1b] md:text-4xl">{pageCopy.installTitle}</h2>
            <p className="text-base leading-8 text-stone-700">{pageCopy.installIntro}</p>
          </div>
          <div className="space-y-4">
            {pageCopy.installSteps.map((step, index) => (
              <div key={step} className="flex gap-4 rounded-[8px] border border-[#e8e4df] bg-[#fbf8f4] p-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-medium text-[#241f1b]">
                  {index + 1}
                </div>
                <p className="text-sm leading-6 text-stone-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-[#f7f4f0]">
        <div className="container-custom grid gap-6 lg:grid-cols-2">
          <div className="rounded-[8px] border border-[#e8e4df] bg-white p-6 md:p-8">
            <ShieldCheck className="mb-5 h-7 w-7 text-[#8d6f58]" />
            <h2 className="font-sans text-2xl font-light text-[#241f1b]">{pageCopy.safetyTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-stone-700">{pageCopy.safetyText}</p>
          </div>
          <div className="rounded-[8px] border border-[#e8e4df] bg-white p-6 md:p-8">
            <Settings className="mb-5 h-7 w-7 text-[#8d6f58]" />
            <h2 className="font-sans text-2xl font-light text-[#241f1b]">{pageCopy.supportTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-stone-700">{pageCopy.supportText}</p>
          </div>
        </div>
      </section>
    </>
  );
}
