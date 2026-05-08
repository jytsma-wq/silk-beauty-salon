# Hero Video

Place hero-bg.mp4 here (max 10MB, 1920x1080, h.264).

Free sources:
- https://www.pexels.com/videos (search: spa treatment, beauty clinic)  
- https://coverr.co (search: facial, skincare, wellness)

Optimize with HandBrake or ffmpeg:
```bash
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -b:v 2M -maxrate 2M \
  -bufsize 4M -movflags +faststart public/videos/hero-bg.mp4
```

After adding the video, uncomment the video element in HeroSection.tsx.
