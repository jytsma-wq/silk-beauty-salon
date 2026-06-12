import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Download, ExternalLink, Settings, ShieldCheck, Smartphone } from 'lucide-react';
import { androidApkFileName, androidApkUrl, androidInstallSteps } from '@/lib/mobile-app-download';
import { SALON_INFO } from '@/lib/constants';

type Locale = 'en' | 'ka' | 'ru' | 'he' | 'ar' | 'tr';

const copy: Record<Locale, {
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
}> = {
  en: {
    badge: 'Android App',
    title: 'Download the Silk Beauty Android app',
    subtitle: 'Book appointments, browse treatments, and keep salon details close while you are in Batumi.',
    cta: 'Download APK',
    fileLabel: 'Release APK',
    benefitsTitle: 'Built for salon visits',
    installTitle: 'How to install',
    installIntro: 'Because this app is distributed directly from Silk Beauty Salon, Android may ask you to allow installation from your browser or file manager.',
    installSteps: androidInstallSteps,
    safetyTitle: 'Direct download',
    safetyText: 'The APK is signed through EAS Build and provided by Silk Beauty Salon. It is not published through Google Play.',
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
    installIntro: 'აპი პირდაპირ Silk Beauty Salon-იდან ვრცელდება, ამიტომ Android-მა შეიძლება მოგთხოვოთ ბრაუზერის ან ფაილების მენეჯერისთვის ინსტალაციის ნებართვა.',
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
    installIntro: 'Так как приложение распространяется напрямую от Silk Beauty Salon, Android может попросить разрешить установку из браузера или файлового менеджера.',
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
  he: {
    badge: 'אפליקציית Android',
    title: 'הורידו את אפליקציית Android של Silk Beauty',
    subtitle: 'הזמינו תורים, עיינו בטיפולים ושמרו את פרטי הסלון קרובים בזמן שאתם בבאטומי.',
    cta: 'הורדת APK',
    fileLabel: 'Release APK',
    benefitsTitle: 'נבנתה לביקורים בסלון',
    installTitle: 'איך מתקינים',
    installIntro: 'מכיוון שהאפליקציה מופצת ישירות מ-Silk Beauty Salon, Android עשוי לבקש לאפשר התקנה מהדפדפן או ממנהל הקבצים.',
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
  ar: {
    badge: 'تطبيق Android',
    title: 'حمّلي تطبيق Silk Beauty لنظام Android',
    subtitle: 'احجزي المواعيد، تصفحي العلاجات، واحتفظي بتفاصيل الصالون قريبة أثناء وجودك في باتومي.',
    cta: 'تحميل APK',
    fileLabel: 'Release APK',
    benefitsTitle: 'مصمم لزيارات الصالون',
    installTitle: 'طريقة التثبيت',
    installIntro: 'لأن التطبيق موزع مباشرة من Silk Beauty Salon، قد يطلب Android السماح بالتثبيت من المتصفح أو مدير الملفات.',
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
  tr: {
    badge: 'Android Uygulamasi',
    title: 'Silk Beauty Android uygulamasini indirin',
    subtitle: 'Randevu alin, tedavilere bakin ve Batumdayken salon bilgilerini elinizin altinda tutun.',
    cta: 'APK indir',
    fileLabel: 'Release APK',
    benefitsTitle: 'Salon ziyaretleri icin tasarlandi',
    installTitle: 'Nasil kurulur',
    installIntro: 'Bu uygulama dogrudan Silk Beauty Salon tarafindan dagitildigi icin Android, tarayiciniz veya dosya yoneticiniz icin yukleme izni isteyebilir.',
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
    title: `${pageCopy.title} | ${SALON_INFO.name}`,
    description: pageCopy.subtitle,
  };
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
    <div className="min-h-screen bg-parchment-50">
      <section className="relative overflow-hidden border-b border-umber-100/20 bg-white pt-36 pb-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1fr_420px] lg:px-8">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blush-300 bg-blush-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-umber-600">
              <Smartphone className="h-4 w-4 text-blush-600" />
              {pageCopy.badge}
            </div>
            <h1 className="font-display text-4xl font-semibold leading-tight text-umber-700 sm:text-5xl lg:text-6xl">
              {pageCopy.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-umber-500">
              {pageCopy.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={androidApkUrl}
                download={isHostedFile ? androidApkFileName : undefined}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-umber-700 px-7 py-4 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-umber-600"
              >
                <Download className="h-5 w-5" />
                {pageCopy.cta}
              </a>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-umber-200 px-7 py-4 text-sm font-semibold uppercase tracking-[0.08em] text-umber-700 transition-colors hover:border-blush-400 hover:text-blush-600"
              >
                {pageCopy.supportCta}
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="rounded-[2rem] border border-umber-200 bg-umber-700 p-4 shadow-[0_24px_80px_rgba(60,42,30,0.22)]">
              <div className="rounded-[1.5rem] bg-parchment-50 p-6">
                <div className="flex items-center justify-between border-b border-umber-100 pb-5">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-umber-400">{pageCopy.fileLabel}</p>
                    <p className="mt-1 text-lg font-semibold text-umber-700">{androidApkFileName}</p>
                  </div>
                  <ShieldCheck className="h-9 w-9 text-teal-600" />
                </div>
                <div className="mt-6 space-y-4">
                  {[
                    pageCopy.benefitsTitle,
                    pageCopy.safetyTitle,
                    pageCopy.installTitle,
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-teal-600" />
                      <span className="text-sm font-medium text-umber-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-parchment-100 py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 lg:grid-cols-3 lg:px-8">
          <div>
            <h2 className="font-display text-3xl font-semibold text-umber-700">{pageCopy.installTitle}</h2>
            <p className="mt-4 text-sm leading-6 text-umber-500">{pageCopy.installIntro}</p>
          </div>
          <div className="space-y-4 lg:col-span-2">
            {pageCopy.installSteps.map((step, index) => (
              <div key={step} className="flex gap-4 rounded-lg border border-umber-100 bg-white p-5">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blush-100 text-sm font-bold text-umber-700">
                  {index + 1}
                </div>
                <p className="text-sm leading-6 text-umber-600">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-lg border border-umber-100 p-6">
            <ShieldCheck className="mb-4 h-7 w-7 text-teal-600" />
            <h2 className="font-display text-2xl font-semibold text-umber-700">{pageCopy.safetyTitle}</h2>
            <p className="mt-3 text-sm leading-6 text-umber-500">{pageCopy.safetyText}</p>
          </div>
          <div className="rounded-lg border border-umber-100 p-6">
            <Settings className="mb-4 h-7 w-7 text-blush-600" />
            <h2 className="font-display text-2xl font-semibold text-umber-700">{pageCopy.supportTitle}</h2>
            <p className="mt-3 text-sm leading-6 text-umber-500">{pageCopy.supportText}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
