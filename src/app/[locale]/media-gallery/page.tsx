import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { VideoGallery } from '@/components/media/VideoGallery';
import { VideoSection } from '@/components/media/VideoBackground';
import { treatmentVideos, testimonialVideos, behindTheScenesVideos, imageGalleries, additionalImages } from '@/data/media';
import { GalleryGrid } from '@/components/media/GalleryGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, ImageIcon, Film, Heart } from 'lucide-react';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'mediaGallery' });
  
  return {
    title: t('metadata.title', { defaultValue: 'Media Gallery | Silk Beauty Salon' }),
    description: t('metadata.description', { 
      defaultValue: 'Explore our video library, treatment galleries, and behind-the-scenes content from Silk Beauty Salon in Batumi.' 
    }),
  };
}

export default async function MediaGalleryPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'mediaGallery' });

  // Combine all videos
  const allVideos = [
    ...treatmentVideos,
    ...testimonialVideos,
    ...behindTheScenesVideos,
  ];

  return (
    <>
      {/* Hero Video Section */}
      <VideoSection
        videoSrc="https://videos.pexels.com/video-files/4125028/4125028-uhd_2560_1440_25fps.mp4"
        poster={additionalImages.spaAmbiance}
        title={t('hero.title', { defaultValue: 'Experience Silk Beauty' })}
        subtitle={t('hero.subtitle', { 
          defaultValue: 'Immerse yourself in our world of luxury aesthetics and transformative treatments' 
        })}
        align="center"
        minHeight="70vh"
      />

      {/* Main Gallery Content */}
      <section className="section-spacing bg-[#f7f4f0]">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="section-label inline-block mb-4">
              {t('sectionLabel', { defaultValue: 'Gallery' })}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-stone-800 mb-4">
              {t('pageTitle', { defaultValue: 'Videos & Images' })}
            </h1>
            <p className="text-stone-600 max-w-2xl mx-auto">
              {t('pageDescription', { 
                defaultValue: 'Browse our collection of treatment videos, client testimonials, and gallery images showcasing the Silk Beauty experience.' 
              })}
            </p>
          </div>

          {/* Tabs for different media types */}
          <Tabs defaultValue="all-videos" className="w-full">
            <TabsList className="w-full justify-center mb-12 bg-transparent flex-wrap h-auto gap-2">
              <TabsTrigger 
                value="all-videos" 
                className="data-[state=active]:bg-[#b5453a] data-[state=active]:text-white px-6 py-3 rounded-none"
              >
                <Film className="w-4 h-4 mr-2" />
                {t('tabs.allVideos', { defaultValue: 'All Videos' })}
              </TabsTrigger>
              <TabsTrigger 
                value="treatments"
                className="data-[state=active]:bg-[#b5453a] data-[state=active]:text-white px-6 py-3 rounded-none"
              >
                <Play className="w-4 h-4 mr-2" />
                {t('tabs.treatments', { defaultValue: 'Treatments' })}
              </TabsTrigger>
              <TabsTrigger 
                value="testimonials"
                className="data-[state=active]:bg-[#b5453a] data-[state=active]:text-white px-6 py-3 rounded-none"
              >
                <Heart className="w-4 h-4 mr-2" />
                {t('tabs.testimonials', { defaultValue: 'Testimonials' })}
              </TabsTrigger>
              <TabsTrigger 
                value="gallery"
                className="data-[state=active]:bg-[#b5453a] data-[state=active]:text-white px-6 py-3 rounded-none"
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                {t('tabs.gallery', { defaultValue: 'Photo Gallery' })}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all-videos" className="mt-0">
              <div className="mb-8">
                <h2 className="font-serif text-2xl text-stone-800 mb-4">
                  {t('allVideos.title', { defaultValue: 'Complete Video Collection' })}
                </h2>
                <p className="text-stone-600">
                  {t('allVideos.description', { 
                    defaultValue: 'Browse all our videos including treatments, testimonials, and behind-the-scenes content.' 
                  })}
                </p>
              </div>
              <VideoGallery videos={allVideos} columns={3} />
            </TabsContent>

            <TabsContent value="treatments" className="mt-0">
              <div className="mb-8">
                <h2 className="font-serif text-2xl text-stone-800 mb-4">
                  {t('treatments.title', { defaultValue: 'Treatment Videos' })}
                </h2>
                <p className="text-stone-600">
                  {t('treatments.description', { 
                    defaultValue: 'See our treatments in action and learn more about what to expect during your visit.' 
                  })}
                </p>
              </div>
              <VideoGallery videos={treatmentVideos} columns={3} />
            </TabsContent>

            <TabsContent value="testimonials" className="mt-0">
              <div className="mb-8">
                <h2 className="font-serif text-2xl text-stone-800 mb-4">
                  {t('testimonials.title', { defaultValue: 'Client Testimonials' })}
                </h2>
                <p className="text-stone-600">
                  {t('testimonials.description', { 
                    defaultValue: 'Hear from our satisfied clients about their experiences and transformations.' 
                  })}
                </p>
              </div>
              <VideoGallery videos={testimonialVideos} columns={3} showCategory={false} />
            </TabsContent>

            <TabsContent value="gallery" className="mt-0">
              <div className="mb-8">
                <h2 className="font-serif text-2xl text-stone-800 mb-4">
                  {t('gallery.title', { defaultValue: 'Photo Gallery' })}
                </h2>
                <p className="text-stone-600">
                  {t('gallery.description', { 
                    defaultValue: 'Explore our facilities, treatment rooms, and stunning results in our photo gallery.' 
                  })}
                </p>
              </div>
              {imageGalleries.map((gallery) => (
                <div key={gallery.id} className="mb-16">
                  <div className="mb-6">
                    <h3 className="font-serif text-xl text-stone-800">{gallery.title}</h3>
                    <p className="text-stone-500 text-sm">{gallery.description}</p>
                  </div>
                  <GalleryGrid images={gallery.images} category={gallery.category} />
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Featured Video Section */}
      <section className="py-20 bg-[#1c1c1c]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[0.625rem] tracking-[0.3em] uppercase text-[#b5453a] mb-4 block">
                {t('featured.label', { defaultValue: 'Featured' })}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                {t('featured.title', { defaultValue: 'Virtual Salon Tour' })}
              </h2>
              <p className="text-white/70 leading-relaxed mb-8">
                {t('featured.description', { 
                  defaultValue: 'Take a virtual walk through our luxurious facilities in Batumi. From our welcoming reception to our state-of-the-art treatment rooms, experience the Silk Beauty difference before you even step through our doors.' 
                })}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-white/50">
                <span>{t('featured.duration', { defaultValue: 'Duration: 2:00' })}</span>
                <span>•</span>
                <span>4K UHD</span>
              </div>
            </div>
            <div className="relative aspect-video rounded-sm overflow-hidden">
              <video
                src="https://videos.pexels.com/video-files/4125019/4125019-uhd_2560_1440_25fps.mp4"
                poster="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&q=80"
                controls
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
